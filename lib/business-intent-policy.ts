import { BusinessDocumentType } from "@prisma/client";

export const BUSINESS_INTENTS = [
  "PROPOSE_WORK",
  "BILL_CUSTOMER",
  "COLLECT_PAYMENT",
  "CREDIT_CUSTOMER",
  "PURCHASE_PARTS",
  "DELIVER_GOODS",
  "WARRANTY_REVIEW",
  "SCHEDULE_FOLLOW_UP",
] as const;

export type BusinessIntent = (typeof BUSINESS_INTENTS)[number];

type BusinessIntentPolicy = {
  intent: BusinessIntent;
  label: string;
  ownerDomain: string;
  requiredEvidence: string[];
  allowedDocumentTypes: BusinessDocumentType[];
  blockedConditions: string[];
  approvalRequirements: string[];
  canCreateBusinessDocumentDraftNow: boolean;
};

export type BusinessIntentPolicyContext = {
  intent: string;
  selectedDocumentType: string;
  hasBusinessIntelligence: boolean;
  hasCustomer: boolean;
  hasServiceEvidence: boolean;
  hasPaymentEvidence: boolean;
  hasSourceBusinessDocument: boolean;
  hasInventoryRuntime: boolean;
  billableWorkConfirmed: boolean;
  internalOverrideConfirmed: boolean;
};

export type BusinessIntentPolicyDecision = {
  intent: BusinessIntent | null;
  label: string;
  ownerDomain: string;
  allowedDocumentTypes: BusinessDocumentType[];
  selectedDocumentType: BusinessDocumentType | null;
  canCreateBusinessDocumentDraftNow: boolean;
  requiredEvidence: string[];
  approvalRequirements: string[];
  blockers: string[];
};

export class BusinessIntentPolicyError extends Error {
  constructor(
    public code:
      | "intent-required"
      | "unsupported-intent"
      | "document-type-not-allowed"
      | "intent-blocked",
    message: string,
    public decision?: BusinessIntentPolicyDecision,
  ) {
    super(message);
  }
}

export const BUSINESS_INTENT_POLICIES: BusinessIntentPolicy[] = [
  {
    intent: "PROPOSE_WORK",
    label: "Propose Work",
    ownerDomain: "Commercial",
    requiredEvidence: ["Business Intelligence", "Service evidence", "Customer"],
    allowedDocumentTypes: [BusinessDocumentType.QUOTE],
    blockedConditions: [],
    approvalRequirements: [
      "Selected document type",
      "Pricing review",
      "Confidence visibility",
      "Missing evidence visibility",
    ],
    canCreateBusinessDocumentDraftNow: true,
  },
  {
    intent: "BILL_CUSTOMER",
    label: "Bill Customer",
    ownerDomain: "Commercial / Financial",
    requiredEvidence: [
      "Business Intelligence",
      "Customer",
      "Completed billable service evidence",
      "Pricing review",
    ],
    allowedDocumentTypes: [BusinessDocumentType.INVOICE],
    blockedConditions: [],
    approvalRequirements: [
      "Completed billable work confirmation",
      "Pricing review",
      "Confidence visibility",
      "Missing evidence visibility",
      "Internal override if service evidence is incomplete",
    ],
    canCreateBusinessDocumentDraftNow: true,
  },
  {
    intent: "COLLECT_PAYMENT",
    label: "Collect Payment",
    ownerDomain: "Financial",
    requiredEvidence: ["FinancialEvidence", "Payment evidence", "Customer"],
    allowedDocumentTypes: [BusinessDocumentType.RECEIPT],
    blockedConditions: ["Requires FinancialEvidence/payment evidence"],
    approvalRequirements: ["Payment evidence review"],
    canCreateBusinessDocumentDraftNow: false,
  },
  {
    intent: "CREDIT_CUSTOMER",
    label: "Credit Customer",
    ownerDomain: "Commercial / Financial",
    requiredEvidence: ["Source BusinessDocument", "Credit reason"],
    allowedDocumentTypes: [BusinessDocumentType.CREDIT_NOTE],
    blockedConditions: ["Requires source BusinessDocument"],
    approvalRequirements: ["Source document review", "Credit reason"],
    canCreateBusinessDocumentDraftNow: false,
  },
  {
    intent: "PURCHASE_PARTS",
    label: "Purchase Parts",
    ownerDomain: "Inventory & Procurement",
    requiredEvidence: ["Parts requirement", "Supplier/procurement policy"],
    allowedDocumentTypes: [],
    blockedConditions: ["Future Inventory/Procurement runtime"],
    approvalRequirements: ["Procurement approval"],
    canCreateBusinessDocumentDraftNow: false,
  },
  {
    intent: "DELIVER_GOODS",
    label: "Deliver Goods",
    ownerDomain: "Inventory & Procurement",
    requiredEvidence: ["Delivery/fulfillment evidence"],
    allowedDocumentTypes: [],
    blockedConditions: ["Future Delivery Note/schema support"],
    approvalRequirements: ["Fulfillment approval"],
    canCreateBusinessDocumentDraftNow: false,
  },
  {
    intent: "WARRANTY_REVIEW",
    label: "Warranty Review",
    ownerDomain: "Service Operations",
    requiredEvidence: ["Warranty terms", "Asset/service evidence"],
    allowedDocumentTypes: [],
    blockedConditions: ["No document draft by default"],
    approvalRequirements: ["Warranty owner review"],
    canCreateBusinessDocumentDraftNow: false,
  },
  {
    intent: "SCHEDULE_FOLLOW_UP",
    label: "Schedule Follow-up",
    ownerDomain: "Service Operations",
    requiredEvidence: ["Follow-up reason", "Owner/date decision"],
    allowedDocumentTypes: [],
    blockedConditions: ["No document draft by default"],
    approvalRequirements: ["Service owner review"],
    canCreateBusinessDocumentDraftNow: false,
  },
];

function normalizeIntent(value: string): BusinessIntent | null {
  const normalized = value.trim().toUpperCase();

  return BUSINESS_INTENTS.find((intent) => intent === normalized) ?? null;
}

function normalizeDocumentType(value: string): BusinessDocumentType | null {
  const normalized = value.trim().toUpperCase();

  return (
    Object.values(BusinessDocumentType).find(
      (documentType) => documentType === normalized,
    ) ?? null
  );
}

export function getBusinessIntentPolicy(intent: BusinessIntent) {
  return BUSINESS_INTENT_POLICIES.find((policy) => policy.intent === intent);
}

export function evaluateBusinessIntentPolicy(
  context: BusinessIntentPolicyContext,
): BusinessIntentPolicyDecision {
  const intent = normalizeIntent(context.intent);
  const selectedDocumentType = normalizeDocumentType(context.selectedDocumentType);

  if (!intent) {
    return {
      intent: null,
      label: "Unsupported intent",
      ownerDomain: "Unknown",
      allowedDocumentTypes: [],
      selectedDocumentType,
      canCreateBusinessDocumentDraftNow: false,
      requiredEvidence: [],
      approvalRequirements: [],
      blockers: [context.intent ? "Unsupported business intent." : "Business intent is required."],
    };
  }

  const policy = getBusinessIntentPolicy(intent);

  if (!policy) {
    return {
      intent,
      label: intent,
      ownerDomain: "Unknown",
      allowedDocumentTypes: [],
      selectedDocumentType,
      canCreateBusinessDocumentDraftNow: false,
      requiredEvidence: [],
      approvalRequirements: [],
      blockers: ["Business intent policy is missing."],
    };
  }

  const blockers = [...policy.blockedConditions];

  if (!context.hasBusinessIntelligence) {
    blockers.push("Complete Business Intelligence is required.");
  }

  if (!context.hasCustomer) {
    blockers.push("Customer evidence is required.");
  }

  if (!context.hasServiceEvidence) {
    blockers.push("Service evidence is required.");
  }

  if (
    selectedDocumentType &&
    !policy.allowedDocumentTypes.includes(selectedDocumentType)
  ) {
    blockers.push(
      `Document type ${selectedDocumentType} is not allowed for ${policy.label}.`,
    );
  }

  if (intent === "BILL_CUSTOMER" && !context.billableWorkConfirmed) {
    blockers.push("Completed billable work confirmation is required.");
  }

  if (
    intent === "BILL_CUSTOMER" &&
    !context.hasServiceEvidence &&
    !context.internalOverrideConfirmed
  ) {
    blockers.push("Internal override is required when service evidence is incomplete.");
  }

  if (intent === "COLLECT_PAYMENT" && !context.hasPaymentEvidence) {
    blockers.push("FinancialEvidence/payment evidence is required.");
  }

  if (intent === "CREDIT_CUSTOMER" && !context.hasSourceBusinessDocument) {
    blockers.push("A source BusinessDocument is required before crediting a customer.");
  }

  if (intent === "PURCHASE_PARTS" && !context.hasInventoryRuntime) {
    blockers.push("Inventory & Procurement runtime is not ready for purchase drafts.");
  }

  return {
    intent,
    label: policy.label,
    ownerDomain: policy.ownerDomain,
    allowedDocumentTypes: policy.allowedDocumentTypes,
    selectedDocumentType,
    canCreateBusinessDocumentDraftNow:
      policy.canCreateBusinessDocumentDraftNow && blockers.length === 0,
    requiredEvidence: policy.requiredEvidence,
    approvalRequirements: policy.approvalRequirements,
    blockers,
  };
}

export function assertBusinessIntentPolicyAllowsDraft(
  context: BusinessIntentPolicyContext,
) {
  const decision = evaluateBusinessIntentPolicy(context);

  if (!decision.intent) {
    throw new BusinessIntentPolicyError(
      context.intent ? "unsupported-intent" : "intent-required",
      decision.blockers[0],
      decision,
    );
  }

  if (!decision.allowedDocumentTypes.length) {
    throw new BusinessIntentPolicyError(
      "intent-blocked",
      decision.blockers[0] ?? "This business intent cannot create a draft now.",
      decision,
    );
  }

  if (
    decision.selectedDocumentType &&
    !decision.allowedDocumentTypes.includes(decision.selectedDocumentType)
  ) {
    throw new BusinessIntentPolicyError(
      "document-type-not-allowed",
      decision.blockers.find((blocker) =>
        blocker.includes("is not allowed"),
      ) ?? "The selected document type is not allowed for this intent.",
      decision,
    );
  }

  if (!decision.canCreateBusinessDocumentDraftNow) {
    throw new BusinessIntentPolicyError(
      "intent-blocked",
      decision.blockers[0] ?? "This business intent cannot create a draft now.",
      decision,
    );
  }

  return decision;
}
