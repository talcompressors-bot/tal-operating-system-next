import { BusinessDocumentType } from "@prisma/client";

export const INTERNAL_ACTION_POLICY_STATES = [
  "AUTO_ALLOWED",
  "REVIEW_REQUIRED",
  "APPROVAL_REQUIRED",
  "BLOCKED",
] as const;

export type InternalActionPolicyState =
  (typeof INTERNAL_ACTION_POLICY_STATES)[number];

export type InternalActionPolicyDecision = {
  action: string;
  state: InternalActionPolicyState;
  ownerDomain: string;
  summary: string;
  automatic: boolean;
  blockers: string[];
  reviewReasons: string[];
  approvalReasons: string[];
};

type ServiceReportDraftPolicyInput = {
  hasServiceReport: boolean;
  hasCustomer: boolean;
  businessIntentAllowed: boolean;
  selectedDocumentType: BusinessDocumentType | null;
  allowedDocumentTypes: BusinessDocumentType[];
  idempotencyProtected: boolean;
  externalSideEffectsBlocked: boolean;
  hasMissingEvidence: boolean;
  hasLowConfidence: boolean;
  hasReviewRequiredLines: boolean;
};

function buildDecision(input: InternalActionPolicyDecision) {
  return input;
}

export function buildServiceReportDraftPolicy(
  input: ServiceReportDraftPolicyInput,
): InternalActionPolicyDecision {
  const blockers = [];

  if (!input.hasServiceReport) {
    blockers.push("ServiceReport evidence is missing.");
  }

  if (!input.hasCustomer) {
    blockers.push("Customer evidence is missing.");
  }

  if (!input.businessIntentAllowed) {
    blockers.push("Business Intent policy does not allow this draft.");
  }

  if (
    !input.selectedDocumentType ||
    !input.allowedDocumentTypes.includes(input.selectedDocumentType)
  ) {
    blockers.push("Selected document type is not allowed by policy.");
  }

  if (!input.idempotencyProtected) {
    blockers.push("ServiceReport + DocumentType idempotency is missing.");
  }

  if (!input.externalSideEffectsBlocked) {
    blockers.push("External side effects are not blocked.");
  }

  if (blockers.length) {
    return buildDecision({
      action: "ServiceReport -> BusinessDocument draft generation",
      state: "BLOCKED",
      ownerDomain: "Commercial",
      summary: "Internal draft generation is blocked by policy.",
      automatic: false,
      blockers,
      reviewReasons: [],
      approvalReasons: [],
    });
  }

  const reviewReasons = [];

  if (input.hasMissingEvidence) {
    reviewReasons.push("Missing evidence is visible and must be reviewed before external action.");
  }

  if (input.hasLowConfidence) {
    reviewReasons.push("Low-confidence recommendations require human review.");
  }

  if (input.hasReviewRequiredLines) {
    reviewReasons.push("One or more lines require price, quantity, or evidence review.");
  }

  if (reviewReasons.length) {
    return buildDecision({
      action: "ServiceReport -> BusinessDocument draft generation",
      state: "REVIEW_REQUIRED",
      ownerDomain: "Commercial",
      summary:
        "Internal draft creation is automatic/idempotent, but the draft remains review-required.",
      automatic: true,
      blockers: [],
      reviewReasons,
      approvalReasons: [
        "Human approval is required before learning from corrections or performing any external action.",
      ],
    });
  }

  return buildDecision({
    action: "ServiceReport -> BusinessDocument draft generation",
    state: "AUTO_ALLOWED",
    ownerDomain: "Commercial",
    summary:
      "Internal draft creation is automatic because source, customer, intent, document type, idempotency, and no-external-action checks passed.",
    automatic: true,
    blockers: [],
    reviewReasons: [],
    approvalReasons: [],
  });
}

export function buildBusinessSuggestionPolicy(): InternalActionPolicyDecision {
  return buildDecision({
    action: "Business suggestions",
    state: "AUTO_ALLOWED",
    ownerDomain: "BusinessCase / Commercial",
    summary:
      "Internal suggestions are generated from existing runtime evidence and do not mutate external systems.",
    automatic: true,
    blockers: [],
    reviewReasons: [],
    approvalReasons: [],
  });
}

export function buildDraftReviewPolicy(
  hasReviewRequiredLines: boolean,
): InternalActionPolicyDecision {
  return buildDecision({
    action: "Draft review",
    state: hasReviewRequiredLines ? "REVIEW_REQUIRED" : "AUTO_ALLOWED",
    ownerDomain: "Commercial / Approval",
    summary: hasReviewRequiredLines
      ? "Draft exists internally, but line, price, confidence, or evidence review remains."
      : "Draft has no detected review blockers; external actions still require a separate gate.",
    automatic: !hasReviewRequiredLines,
    blockers: [],
    reviewReasons: hasReviewRequiredLines
      ? ["Review-required lines must be corrected before approval or external action."]
      : [],
    approvalReasons: [
      "Human approval is required before learning from corrections or external action.",
    ],
  });
}

export function buildLearningEvidencePolicy(): InternalActionPolicyDecision {
  return buildDecision({
    action: "Learning evidence",
    state: "APPROVAL_REQUIRED",
    ownerDomain: "Commercial / Approval",
    summary:
      "Approved corrections may become future evidence only after explicit internal approval.",
    automatic: false,
    blockers: [],
    reviewReasons: [],
    approvalReasons: [
      "Learning from approved corrections changes future recommendations and requires human approval.",
    ],
  });
}

export function buildExternalActionPolicy(): InternalActionPolicyDecision {
  return buildDecision({
    action: "External actions",
    state: "BLOCKED",
    ownerDomain: "Automation & Integration / Financial / Inventory",
    summary:
      "Maven/Invoice4U, customer email/send, receipt issuing, and inventory mutation remain blocked.",
    automatic: false,
    blockers: [
      "Maven/Invoice4U execution requires separate approval.",
      "Customer-facing email/send requires separate approval.",
      "Official invoice/receipt issuing requires separate approval.",
      "Inventory mutation requires separate approval.",
    ],
    reviewReasons: [],
    approvalReasons: [],
  });
}
