import {
  getBusinessCaseList,
  type BusinessCaseViewModel,
} from "../business-cases/business-case-runtime";

type OperationsBucketKey =
  | "immediate"
  | "technician"
  | "customer"
  | "internalApproval"
  | "financial"
  | "externalAdapter"
  | "readyToClose"
  | "closedRecently";

export type OperationsCenterRow = {
  id: string;
  bucket: OperationsBucketKey;
  customer: {
    name: string;
    href: string;
  };
  asset: {
    label: string;
    href: string;
  };
  businessCase: {
    title: string;
    href: string;
  };
  currentStage: string;
  currentBlocker: string;
  nextRecommendedAction: string;
  assignedOwner: string;
  priority: "High" | "Medium" | "Low";
  lastActivity: string;
  financialStatus: string;
  commercialStatus: string;
};

export type OperationsCenterBucket = {
  key: OperationsBucketKey;
  title: string;
  description: string;
  rows: OperationsCenterRow[];
};

export type OperationsCenterViewModel = {
  summary: {
    totalCases: number;
    immediateAction: number;
    blocked: number;
    ready: number;
  };
  buckets: OperationsCenterBucket[];
  boundary: string;
};

const BUCKETS: Array<Omit<OperationsCenterBucket, "rows">> = [
  {
    key: "immediate",
    title: "Requires Immediate Action",
    description: "Cases with open blockers or missing next-step ownership.",
  },
  {
    key: "technician",
    title: "Waiting For Technician",
    description: "Service cases that still depend on field or technician work.",
  },
  {
    key: "customer",
    title: "Waiting For Customer",
    description: "Cases where TAL is waiting for customer response or approval.",
  },
  {
    key: "internalApproval",
    title: "Waiting For Internal Approval",
    description: "Cases that need internal commercial or management review.",
  },
  {
    key: "financial",
    title: "Waiting For Financial Action",
    description: "Cases with payment evidence, receipt, or financial review work.",
  },
  {
    key: "externalAdapter",
    title: "Waiting For External Adapter",
    description: "Cases ready for future Maven, Invoice4U, email, or bank adapters.",
  },
  {
    key: "readyToClose",
    title: "Ready To Close",
    description: "Cases with no current runtime blocker found.",
  },
  {
    key: "closedRecently",
    title: "Closed Recently",
    description: "Recently closed cases when closed-state evidence exists.",
  },
];

function firstAsset(businessCase: BusinessCaseViewModel) {
  return (
    businessCase.assets[0] ?? {
      label: "No asset linked",
      href: "",
    }
  );
}

function firstBlocker(businessCase: BusinessCaseViewModel) {
  const blocker = businessCase.blockers[0];

  return blocker ? `${blocker.domain}: ${blocker.message}` : "No blocker";
}

function latestActivity(businessCase: BusinessCaseViewModel) {
  const latest = businessCase.timeline[businessCase.timeline.length - 1];

  if (!latest) {
    return businessCase.source.label;
  }

  return `${latest.label} - ${latest.status}`;
}

function hasPendingAutomation(businessCase: BusinessCaseViewModel) {
  return businessCase.automation.commands.some(
    (command) => command.status !== "Completed",
  );
}

function getBucket(businessCase: BusinessCaseViewModel): OperationsBucketKey {
  if (businessCase.service.status === "Closed") {
    return "closedRecently";
  }

  if (businessCase.approval.status === "Needs review") {
    return "internalApproval";
  }

  if (
    businessCase.financial.status !== "Not started" &&
    businessCase.financial.status !== "No payment required"
  ) {
    return "financial";
  }

  if (hasPendingAutomation(businessCase)) {
    return "externalAdapter";
  }

  if (businessCase.blockers.length) {
    return "immediate";
  }

  if (
    businessCase.service.status === "Open" ||
    businessCase.service.status === "Pending Signature"
  ) {
    return "technician";
  }

  if (businessCase.commercial.status === "No document") {
    return "customer";
  }

  if (businessCase.closureReadiness.ready) {
    return "readyToClose";
  }

  return "immediate";
}

function getOwner(bucket: OperationsBucketKey) {
  switch (bucket) {
    case "technician":
      return "Service Manager / Technician";
    case "customer":
      return "Sales / Office";
    case "internalApproval":
      return "Liad / Internal Approver";
    case "financial":
      return "Finance / Office";
    case "externalAdapter":
      return "Automation Owner";
    case "readyToClose":
    case "closedRecently":
      return "Operations Manager";
    case "immediate":
    default:
      return "Operations Manager";
  }
}

function getPriority(bucket: OperationsBucketKey): OperationsCenterRow["priority"] {
  if (bucket === "immediate" || bucket === "internalApproval") {
    return "High";
  }

  if (bucket === "financial" || bucket === "externalAdapter") {
    return "Medium";
  }

  return "Low";
}

function recommendNextAction(
  businessCase: BusinessCaseViewModel,
  bucket: OperationsBucketKey,
) {
  if (businessCase.blockers.length) {
    return `Review blocker: ${firstBlocker(businessCase)}`;
  }

  switch (bucket) {
    case "technician":
      return "Review service status and collect missing technician confirmation.";
    case "customer":
      return "Review customer response need and prepare the next commercial step.";
    case "internalApproval":
      return "Open the BusinessDocument and complete internal approval review.";
    case "financial":
      return "Review Financial Intake evidence and approve or correct receipt drafts.";
    case "externalAdapter":
      return "Review the pending AutomationCommand before any approved external action.";
    case "readyToClose":
      return "Perform final human review and close the case when policy allows.";
    case "closedRecently":
      return "No action recommended; keep available for recent-history review.";
    case "immediate":
    default:
      return "Open the BusinessCase and assign the next owner.";
  }
}

function mapOperationsRow(
  businessCase: BusinessCaseViewModel,
): OperationsCenterRow {
  const bucket = getBucket(businessCase);
  const asset = firstAsset(businessCase);

  return {
    id: businessCase.id,
    bucket,
    customer: {
      name: businessCase.party.name,
      href: businessCase.party.href,
    },
    asset: {
      label: asset.label,
      href: asset.href,
    },
    businessCase: {
      title: businessCase.title,
      href: `/business-cases/service-report/${businessCase.source.id}`,
    },
    currentStage: businessCase.service.status,
    currentBlocker: firstBlocker(businessCase),
    nextRecommendedAction: recommendNextAction(businessCase, bucket),
    assignedOwner: getOwner(bucket),
    priority: getPriority(bucket),
    lastActivity: latestActivity(businessCase),
    financialStatus: businessCase.financial.status,
    commercialStatus: businessCase.commercial.status,
  };
}

export async function getOperationsCenter(): Promise<OperationsCenterViewModel> {
  const businessCases = await getBusinessCaseList();
  const rows = businessCases.map(mapOperationsRow);
  const blocked = rows.filter((row) => row.currentBlocker !== "No blocker").length;

  return {
    summary: {
      totalCases: rows.length,
      immediateAction: rows.filter((row) => row.bucket === "immediate").length,
      blocked,
      ready: rows.filter((row) => row.bucket === "readyToClose").length,
    },
    buckets: BUCKETS.map((bucket) => ({
      ...bucket,
      rows: rows.filter((row) => row.bucket === bucket.key),
    })),
    boundary:
      "Operations Center is an orchestration view over existing BusinessCase, Commercial, Financial, Approval, and Automation runtime. It recommends next actions only and does not execute them.",
  };
}
