import {
  getBusinessCaseList,
  type BusinessCaseViewModel,
} from "../business-cases/business-case-runtime";

type OperationsQueueKey =
  | "myWorkToday"
  | "immediate"
  | "highPriority"
  | "technician"
  | "customer"
  | "approval"
  | "financial"
  | "parts"
  | "readyToClose";

export type OperationsCenterRow = {
  id: string;
  queueKeys: OperationsQueueKey[];
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

export type OperationsCenterQueue = {
  key: OperationsQueueKey;
  title: string;
  description: string;
  rows: OperationsCenterRow[];
};

export type OperationsCenterViewModel = {
  summary: {
    totalCases: number;
    immediateAction: number;
    highPriority: number;
    blocked: number;
    ready: number;
  };
  queues: OperationsCenterQueue[];
  boundary: string;
};

const QUEUES: Array<Omit<OperationsCenterQueue, "rows">> = [
  {
    key: "myWorkToday",
    title: "My Work Today",
    description: "Actionable BusinessCases that should be reviewed during the morning operating rhythm.",
  },
  {
    key: "immediate",
    title: "Immediate Attention",
    description: "Cases with open blockers or missing next-step ownership.",
  },
  {
    key: "highPriority",
    title: "High Priority",
    description: "Cases with high business risk, approval blockers, or unresolved automation blockers.",
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
    key: "approval",
    title: "Waiting For Approval",
    description: "Cases that need internal commercial or management review.",
  },
  {
    key: "financial",
    title: "Waiting For Financial Action",
    description: "Cases with payment evidence, receipt, or financial review work.",
  },
  {
    key: "parts",
    title: "Waiting For Parts",
    description: "Cases with read-only inventory impact or parts visibility that still requires human follow-up.",
  },
  {
    key: "readyToClose",
    title: "Ready To Close",
    description: "Cases with no current runtime blocker found.",
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

function hasInventoryImpact(businessCase: BusinessCaseViewModel) {
  return businessCase.inventory.status !== "Placeholder";
}

function needsFinancialAction(businessCase: BusinessCaseViewModel) {
  return (
    businessCase.financial.status !== "Not started" &&
    businessCase.financial.status !== "No payment required"
  );
}

function isWaitingForTechnician(businessCase: BusinessCaseViewModel) {
  return (
    businessCase.service.status === "Open" ||
    businessCase.service.status === "Pending Signature"
  );
}

function isWaitingForCustomer(businessCase: BusinessCaseViewModel) {
  return businessCase.commercial.status === "No document";
}

function getPriority(
  businessCase: BusinessCaseViewModel,
): OperationsCenterRow["priority"] {
  if (
    businessCase.blockers.length ||
    businessCase.approval.status === "Needs review" ||
    hasPendingAutomation(businessCase)
  ) {
    return "High";
  }

  if (needsFinancialAction(businessCase) || hasInventoryImpact(businessCase)) {
    return "Medium";
  }

  return "Low";
}

function getQueueKeys(businessCase: BusinessCaseViewModel): OperationsQueueKey[] {
  const queueKeys = new Set<OperationsQueueKey>();
  const priority = getPriority(businessCase);

  if (businessCase.service.status !== "Closed") {
    queueKeys.add("myWorkToday");
  }

  if (businessCase.blockers.length || hasPendingAutomation(businessCase)) {
    queueKeys.add("immediate");
  }

  if (priority === "High") {
    queueKeys.add("highPriority");
  }

  if (isWaitingForTechnician(businessCase)) {
    queueKeys.add("technician");
  }

  if (isWaitingForCustomer(businessCase)) {
    queueKeys.add("customer");
  }

  if (businessCase.approval.status === "Needs review") {
    queueKeys.add("approval");
  }

  if (needsFinancialAction(businessCase)) {
    queueKeys.add("financial");
  }

  if (hasInventoryImpact(businessCase)) {
    queueKeys.add("parts");
  }

  if (businessCase.closureReadiness.ready) {
    queueKeys.add("readyToClose");
  }

  if (!queueKeys.size) {
    queueKeys.add("myWorkToday");
  }

  return Array.from(queueKeys);
}

function getOwner(businessCase: BusinessCaseViewModel) {
  if (businessCase.approval.status === "Needs review") {
    return "Liad / Internal Approver";
  }

  if (needsFinancialAction(businessCase)) {
    return "Finance / Office";
  }

  if (hasPendingAutomation(businessCase)) {
    return "Automation Owner";
  }

  if (hasInventoryImpact(businessCase)) {
    return "Service Manager / Parts";
  }

  if (isWaitingForTechnician(businessCase)) {
    return "Service Manager / Technician";
  }

  if (isWaitingForCustomer(businessCase)) {
    return "Sales / Office";
  }

  if (businessCase.closureReadiness.ready) {
    return "Operations Manager";
  }

  return "Operations Manager";
}

function recommendNextAction(businessCase: BusinessCaseViewModel) {
  if (businessCase.blockers.length) {
    return `Review blocker: ${firstBlocker(businessCase)}`;
  }

  if (businessCase.approval.status === "Needs review") {
    return "Open the BusinessDocument and complete internal approval review.";
  }

  if (needsFinancialAction(businessCase)) {
    return "Review Financial Intake evidence and approve or correct receipt drafts.";
  }

  if (hasPendingAutomation(businessCase)) {
    return "Review the pending AutomationCommand before any approved external action.";
  }

  if (hasInventoryImpact(businessCase)) {
    return "Review parts impact and decide whether procurement or stock follow-up is needed.";
  }

  if (isWaitingForTechnician(businessCase)) {
    return "Review service status and collect missing technician confirmation.";
  }

  if (isWaitingForCustomer(businessCase)) {
    return "Review customer response need and prepare the next commercial step.";
  }

  if (businessCase.closureReadiness.ready) {
    return "Perform final human review and close the case when policy allows.";
  }

  return "Open the BusinessCase and assign the next owner.";
}

function getCurrentStage(businessCase: BusinessCaseViewModel) {
  if (businessCase.blockers.length) {
    return "Needs Review";
  }

  if (businessCase.approval.status === "Needs review") {
    return "Approval Review";
  }

  if (needsFinancialAction(businessCase)) {
    return "Financial Action";
  }

  if (hasPendingAutomation(businessCase)) {
    return "External Adapter Review";
  }

  if (businessCase.commercial.status !== "No document") {
    return businessCase.commercial.status;
  }

  return businessCase.service.status;
}

function mapOperationsRow(
  businessCase: BusinessCaseViewModel,
): OperationsCenterRow {
  const asset = firstAsset(businessCase);
  const priority = getPriority(businessCase);

  return {
    id: businessCase.id,
    queueKeys: getQueueKeys(businessCase),
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
    currentStage: getCurrentStage(businessCase),
    currentBlocker: firstBlocker(businessCase),
    nextRecommendedAction: recommendNextAction(businessCase),
    assignedOwner: getOwner(businessCase),
    priority,
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
      immediateAction: rows.filter((row) => row.queueKeys.includes("immediate")).length,
      highPriority: rows.filter((row) => row.queueKeys.includes("highPriority")).length,
      blocked,
      ready: rows.filter((row) => row.queueKeys.includes("readyToClose")).length,
    },
    queues: QUEUES.map((queue) => ({
      ...queue,
      rows: rows.filter((row) => row.queueKeys.includes(queue.key)),
    })),
    boundary:
      "Operations Command Center is an action-queue projection over existing BusinessCase, Commercial, Financial, Approval, Automation, and read-only Inventory-impact runtime. Queue rows are not separate tasks, are not persisted, and recommendations do not execute workflow steps.",
  };
}
