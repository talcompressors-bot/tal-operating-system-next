type CommercialLifecycleStageCode =
  | "DRAFT"
  | "INTERNAL_REVIEW"
  | "NEEDS_CHANGES"
  | "APPROVED"
  | "READY_FOR_EXTERNAL_ADAPTER"
  | "EXTERNALLY_PROCESSED"
  | "FINANCIAL_PENDING"
  | "FINANCIAL_COMPLETED"
  | "CLOSED";

type CommercialLifecycleStageState =
  | "complete"
  | "current"
  | "blocked"
  | "future";

type CommercialLifecycleInput = {
  status: string | null;
  approvalStatus: string | null;
  approvedAt: Date | null;
  mavenDocumentNumber: string | null;
  mavenPdfLink: string | null;
  sendStatus: string | null;
  reviewWarnings: string[];
  approvalBlockers: string[];
  externalAdapter: {
    canCreateCommand: boolean;
    latestCommandId: string;
    latestCommandStatus: string;
  };
  financial: {
    paymentRequired: boolean;
    detectedSources: string[];
  };
};

export type CommercialLifecycleView = {
  currentStage: {
    code: CommercialLifecycleStageCode;
    label: string;
    summary: string;
  };
  nextTransition: string;
  blockers: string[];
  stages: Array<{
    code: CommercialLifecycleStageCode;
    label: string;
    state: CommercialLifecycleStageState;
    summary: string;
  }>;
  boundary: string;
};

const COMMERCIAL_LIFECYCLE_ORDER: CommercialLifecycleStageCode[] = [
  "DRAFT",
  "INTERNAL_REVIEW",
  "NEEDS_CHANGES",
  "APPROVED",
  "READY_FOR_EXTERNAL_ADAPTER",
  "EXTERNALLY_PROCESSED",
  "FINANCIAL_PENDING",
  "FINANCIAL_COMPLETED",
  "CLOSED",
];

const COMMERCIAL_LIFECYCLE_LABELS: Record<CommercialLifecycleStageCode, string> = {
  DRAFT: "Draft",
  INTERNAL_REVIEW: "Internal Review",
  NEEDS_CHANGES: "Needs Changes",
  APPROVED: "Approved",
  READY_FOR_EXTERNAL_ADAPTER: "Ready For External Adapter",
  EXTERNALLY_PROCESSED: "Externally Processed",
  FINANCIAL_PENDING: "Financial Pending",
  FINANCIAL_COMPLETED: "Financial Completed",
  CLOSED: "Closed",
};

function normalizeStatus(value: string | null) {
  return String(value || "").trim().toUpperCase();
}

function hasExternalDocument(input: CommercialLifecycleInput) {
  return Boolean(input.mavenDocumentNumber || input.mavenPdfLink);
}

function isCompletedCommand(status: string) {
  return normalizeStatus(status).replace(/\s+/g, "_") === "COMPLETED";
}

function isClosedSendStatus(status: string | null) {
  const normalized = normalizeStatus(status);
  return normalized.includes("CLOSED") || normalized.includes("COMPLETE");
}

function getCurrentStage(input: CommercialLifecycleInput): CommercialLifecycleStageCode {
  const status = normalizeStatus(input.status);
  const approvalStatus = normalizeStatus(input.approvalStatus);
  const blockers = [...input.reviewWarnings, ...input.approvalBlockers];
  const externallyProcessed =
    hasExternalDocument(input) ||
    isCompletedCommand(input.externalAdapter.latestCommandStatus);

  if (isClosedSendStatus(input.sendStatus)) {
    return "CLOSED";
  }

  if (externallyProcessed && input.financial.paymentRequired) {
    return input.financial.detectedSources.length
      ? "FINANCIAL_COMPLETED"
      : "FINANCIAL_PENDING";
  }

  if (externallyProcessed) {
    return "EXTERNALLY_PROCESSED";
  }

  if (
    input.externalAdapter.canCreateCommand ||
    input.externalAdapter.latestCommandId !== "No command"
  ) {
    return "READY_FOR_EXTERNAL_ADAPTER";
  }

  if (status === "APPROVED" || approvalStatus === "APPROVED" || input.approvedAt) {
    return "APPROVED";
  }

  if (approvalStatus === "NEEDS_MORE_INFO" || blockers.length) {
    return "NEEDS_CHANGES";
  }

  if (status === "WAITING_USER_APPROVAL") {
    return "INTERNAL_REVIEW";
  }

  return "DRAFT";
}

function getStageSummary(
  code: CommercialLifecycleStageCode,
  input: CommercialLifecycleInput,
) {
  switch (code) {
    case "DRAFT":
      return "Commercial document exists as an internal draft.";
    case "INTERNAL_REVIEW":
      return "Document is waiting for internal commercial review.";
    case "NEEDS_CHANGES":
      return "Commercial, approval, or line-review blockers must be resolved.";
    case "APPROVED":
      return "Document is internally approved; no external adapter action is implied.";
    case "READY_FOR_EXTERNAL_ADAPTER":
      return input.externalAdapter.latestCommandId === "No command"
        ? "Document can be queued for an external adapter only after explicit approval."
        : `External adapter command is queued as ${input.externalAdapter.latestCommandStatus}.`;
    case "EXTERNALLY_PROCESSED":
      return "External document evidence exists or a command completed; downstream finance remains separate.";
    case "FINANCIAL_PENDING":
      return "Financial Runtime must confirm settlement before closure.";
    case "FINANCIAL_COMPLETED":
      return "Financial evidence exists; final closure still requires a separate closeout rule.";
    case "CLOSED":
      return "Commercial lifecycle is closed by current send/status evidence.";
  }
}

function getNextTransition(currentStage: CommercialLifecycleStageCode) {
  switch (currentStage) {
    case "DRAFT":
      return "Move to internal review after draft content and lines exist.";
    case "INTERNAL_REVIEW":
      return "Approve internally or return to Needs Changes.";
    case "NEEDS_CHANGES":
      return "Resolve blockers, then return to Internal Review.";
    case "APPROVED":
      return "Evaluate explicit external-adapter readiness.";
    case "READY_FOR_EXTERNAL_ADAPTER":
      return "External processing is future-gated and requires separate approval.";
    case "EXTERNALLY_PROCESSED":
      return "Hand off to Financial Runtime when settlement is required.";
    case "FINANCIAL_PENDING":
      return "Financial Runtime must complete approved settlement evidence.";
    case "FINANCIAL_COMPLETED":
      return "Close the commercial case after final human review.";
    case "CLOSED":
      return "No next transition.";
  }
}

function getLifecycleBlockers(
  input: CommercialLifecycleInput,
  currentStage: CommercialLifecycleStageCode,
) {
  const blockers = [...input.reviewWarnings, ...input.approvalBlockers];

  if (currentStage === "READY_FOR_EXTERNAL_ADAPTER") {
    blockers.push(
      "External adapter execution is not approved by the Commercial Runtime.",
    );
  }

  if (currentStage === "FINANCIAL_PENDING") {
    blockers.push("Financial settlement is not complete.");
  }

  return blockers;
}

export function buildBusinessDocumentCommercialLifecycle(
  input: CommercialLifecycleInput,
): CommercialLifecycleView {
  const currentStage = getCurrentStage(input);
  const currentIndex = COMMERCIAL_LIFECYCLE_ORDER.indexOf(currentStage);
  const blockers = getLifecycleBlockers(input, currentStage);

  return {
    currentStage: {
      code: currentStage,
      label: COMMERCIAL_LIFECYCLE_LABELS[currentStage],
      summary: getStageSummary(currentStage, input),
    },
    nextTransition: getNextTransition(currentStage),
    blockers,
    stages: COMMERCIAL_LIFECYCLE_ORDER.map((code, index) => ({
      code,
      label: COMMERCIAL_LIFECYCLE_LABELS[code],
      state:
        index < currentIndex
          ? "complete"
          : index === currentIndex
            ? blockers.length
              ? "blocked"
              : "current"
            : "future",
      summary: getStageSummary(code, input),
    })),
    boundary:
      "Commercial lifecycle is derived from existing BusinessDocument, Approval, Automation, and Financial-readiness signals. It does not call external adapters, issue receipts, send customer messages, mutate inventory, or change schema.",
  };
}
