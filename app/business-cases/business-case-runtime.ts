import {
  getAutomationCommandList,
  type AutomationCommandListItem,
} from "../automation-commands/automation-command-adapter";
import {
  getBusinessDocumentById,
  getBusinessDocumentList,
  type BusinessDocumentDetail,
} from "../business-documents/business-document-adapter";
import {
  getServiceReportList,
  getServiceReportById,
  type ServiceReportView,
} from "../service-reports/service-report-adapter";

type BusinessCaseStatus = "Open" | "Ready for closure" | "Needs review";

type BusinessCaseDomainState = {
  status: string;
  summary: string;
  href: string;
};

type BusinessCaseBlocker = {
  domain: string;
  message: string;
};

type BusinessCaseTimelineEvent = {
  label: string;
  status: string;
  href: string;
};

type BusinessCaseServiceFlowStep = {
  label: string;
  status: "Ready" | "Waiting" | "Blocked" | "Review";
  summary: string;
  href: string;
};

type BusinessCaseIntelligenceItem = {
  label: string;
  value: string;
  explanation: string;
};

type BusinessCaseSuggestion = {
  label: string;
  status: "Ready for review" | "Waiting for evidence" | "Blocked";
  ownerDomain: string;
  href: string;
  explanation: string;
};

type BusinessCaseServiceFlow = {
  boundary: string;
  steps: BusinessCaseServiceFlowStep[];
  intelligence: BusinessCaseIntelligenceItem[];
  suggestions: BusinessCaseSuggestion[];
  approvalReadiness: {
    status: string;
    summary: string;
    href: string;
  };
};

export type BusinessCaseViewModel = {
  id: string;
  title: string;
  status: BusinessCaseStatus;
  source: {
    type: "service_report";
    id: string;
    label: string;
    href: string;
  };
  party: {
    id: string;
    name: string;
    contactName: string;
    phone: string;
    email: string;
    href: string;
  };
  assets: Array<{
    id: string;
    label: string;
    model: string;
    serialNumber: string;
    status: string;
    href: string;
  }>;
  service: BusinessCaseDomainState;
  aiRecommendation: BusinessCaseDomainState;
  commercial: BusinessCaseDomainState & {
    documents: BusinessDocumentDetail[];
  };
  approval: BusinessCaseDomainState;
  automation: BusinessCaseDomainState & {
    commands: AutomationCommandListItem[];
  };
  financial: BusinessCaseDomainState;
  inventory: BusinessCaseDomainState;
  blockers: BusinessCaseBlocker[];
  closureReadiness: {
    ready: boolean;
    summary: string;
  };
  timeline: BusinessCaseTimelineEvent[];
  serviceFlow: BusinessCaseServiceFlow;
};

function buildCaseId(serviceReportId: string) {
  return `service-report:${serviceReportId}`;
}

function buildCaseTitle(report: ServiceReportView) {
  return `Business case for Service Report ${report.reportNumber}`;
}

function buildServiceState(report: ServiceReportView): BusinessCaseDomainState {
  return {
    status: report.status,
    summary: report.description,
    href: `/service-reports/${report.id}`,
  };
}

function buildAiRecommendationState(
  report: ServiceReportView,
): BusinessCaseDomainState {
  if (report.aiDraftPreviewHref) {
    return {
      status: "Available",
      summary: report.scrMatchingPreview.status,
      href: report.aiDraftPreviewHref,
    };
  }

  return {
    status: "Not available",
    summary: "No AI recommendation preview is available for this case yet.",
    href: "",
  };
}

function buildCommercialState(
  documents: BusinessDocumentDetail[],
): BusinessCaseViewModel["commercial"] {
  if (!documents.length) {
    return {
      status: "No document",
      summary: "No BusinessDocument is linked to this case yet.",
      href: "",
      documents,
    };
  }

  const latestDocument = documents[0];

  return {
    status: latestDocument.commercialLifecycle.currentStage.label,
    summary: `${documents.length} linked BusinessDocument(s). Latest total: ${latestDocument.totalAmount}. Next: ${latestDocument.commercialLifecycle.nextTransition}`,
    href: `/business-documents/${latestDocument.id}`,
    documents,
  };
}

function buildApprovalState(
  documents: BusinessDocumentDetail[],
): BusinessCaseDomainState {
  const blockers = documents.flatMap((document) => [
    ...document.approvalReview.blockers,
    ...document.reviewWarnings,
  ]);

  if (!documents.length) {
    return {
      status: "Not started",
      summary: "No commercial document is waiting for approval.",
      href: "",
    };
  }

  if (blockers.length) {
    return {
      status: "Needs review",
      summary: `${blockers.length} approval blocker(s) or warning(s) remain.`,
      href: `/business-documents/${documents[0].id}`,
    };
  }

  return {
    status: "Clear",
    summary: "Linked commercial documents have no current approval blockers.",
    href: `/business-documents/${documents[0].id}`,
  };
}

function buildAutomationState(
  commands: AutomationCommandListItem[],
): BusinessCaseViewModel["automation"] {
  if (!commands.length) {
    return {
      status: "No command",
      summary: "No AutomationCommand is linked to this case.",
      href: "",
      commands,
    };
  }

  const latestCommand = commands[0];

  return {
    status: latestCommand.status,
    summary: `${commands.length} linked AutomationCommand(s). Latest target: ${latestCommand.externalTarget}.`,
    href: `/automation-commands/${latestCommand.id}`,
    commands,
  };
}

function buildFinancialState(
  documents: BusinessDocumentDetail[],
): BusinessCaseDomainState {
  if (!documents.length) {
    return {
      status: "Not started",
      summary: "Financial intake is waiting for a commercial document.",
      href: "",
    };
  }

  const latestDocument = documents[0];
  const paymentRequired = documents.some(
    (document) => document.engineReview.payment.required,
  );
  const evidenceCount = documents.reduce(
    (count, document) => count + document.financialIntake.evidence.length,
    0,
  );

  return {
    status: latestDocument.financialIntake.status,
    summary: `${evidenceCount} financial evidence draft(s). ${latestDocument.financialIntake.matching.status}. ${paymentRequired ? "Payment is required for at least one linked document." : "No receipt has been issued; drafts are internal review only."}`,
    href: `/business-documents/${latestDocument.id}`,
  };
}

function buildInventoryState(
  report: ServiceReportView,
  documents: BusinessDocumentDetail[],
): BusinessCaseDomainState {
  const matchedSkuCount = documents.reduce(
    (count, document) =>
      count +
      document.items.filter((item) => item.manufacturerSkuMatch.salesSku).length,
    0,
  );

  if (matchedSkuCount) {
    return {
      status: "Read-only impact",
      summary: `${matchedSkuCount} line(s) have trusted Tal sales SKU visibility. No inventory reservation or deduction is performed.`,
      href: `/service-reports/${report.id}`,
    };
  }

  return {
    status: "Placeholder",
    summary: "Inventory impact is not calculated for this case yet.",
    href: `/service-reports/${report.id}`,
  };
}

function buildBlockers(
  documents: BusinessDocumentDetail[],
  commands: AutomationCommandListItem[],
): BusinessCaseBlocker[] {
  const commercialBlockers = documents.flatMap((document) =>
    document.reviewWarnings.map((message) => ({
      domain: "Commercial",
      message,
    })),
  );
  const approvalBlockers = documents.flatMap((document) =>
    document.approvalReview.blockers.map((message) => ({
      domain: "Approval",
      message,
    })),
  );
  const automationBlockers = commands
    .filter((command) => command.status !== "Completed")
    .map((command) => ({
      domain: "Automation",
      message: `${command.title}: ${command.executionBoundary}`,
    }));

  return [...commercialBlockers, ...approvalBlockers, ...automationBlockers];
}

function buildClosureReadiness(
  blockers: BusinessCaseBlocker[],
): BusinessCaseViewModel["closureReadiness"] {
  if (blockers.length) {
    return {
      ready: false,
      summary: `${blockers.length} open blocker(s) remain before this case can be closed.`,
    };
  }

  return {
    ready: true,
    summary:
      "No current blockers were found. Closure still requires human review because this runtime is read-only.",
  };
}

function buildTimeline(
  report: ServiceReportView,
  documents: BusinessDocumentDetail[],
  commands: AutomationCommandListItem[],
): BusinessCaseTimelineEvent[] {
  return [
    {
      label: `Service Report ${report.reportNumber}`,
      status: report.status,
      href: `/service-reports/${report.id}`,
    },
    ...documents.map((document) => ({
      label: document.title,
      status: document.status,
      href: `/business-documents/${document.id}`,
    })),
    ...commands.map((command) => ({
      label: command.title,
      status: command.status,
      href: `/automation-commands/${command.id}`,
    })),
  ];
}

function isCompletedServiceReport(report: ServiceReportView) {
  return (
    report.status === "Sent" ||
    report.status === "Pending Signature"
  );
}

function latestDocument(documents: BusinessDocumentDetail[]) {
  return documents[0];
}

function selectedDocumentType(documents: BusinessDocumentDetail[]) {
  return latestDocument(documents)?.selectedDocumentType ?? "Quote draft";
}

function buildEvidenceExists(
  report: ServiceReportView,
  documents: BusinessDocumentDetail[],
  commands: AutomationCommandListItem[],
) {
  const evidence = [
    `Service Report ${report.reportNumber} exists with status ${report.status}.`,
  ];

  if (report.equipment.length) {
    evidence.push(`${report.equipment.length} asset(s) are linked to the case.`);
  }

  if (report.aiDraftPreviewHref) {
    evidence.push("AI recommendation preview is available for internal review.");
  }

  if (documents.length) {
    evidence.push(`${documents.length} BusinessDocument draft(s) are linked.`);
  }

  const financialEvidenceCount = documents.reduce(
    (count, document) => count + document.financialIntake.evidence.length,
    0,
  );

  if (financialEvidenceCount) {
    evidence.push(
      `${financialEvidenceCount} financial evidence draft(s) are visible.`,
    );
  }

  if (commands.length) {
    evidence.push(`${commands.length} AutomationCommand record(s) are linked.`);
  }

  return evidence.join(" ");
}

function buildEvidenceMissing(
  report: ServiceReportView,
  documents: BusinessDocumentDetail[],
  blockers: BusinessCaseBlocker[],
) {
  const missing = [];

  if (!report.aiDraftPreviewHref) {
    missing.push("AI recommendation preview is not available.");
  }

  if (!documents.length) {
    missing.push("No BusinessDocument draft is linked yet.");
  }

  if (blockers.length) {
    missing.push(`${blockers.length} blocker(s) still require human review.`);
  }

  if (
    documents.length &&
    documents.every((document) => !document.financialIntake.evidence.length)
  ) {
    missing.push("No approved financial evidence is attached yet.");
  }

  return missing.length
    ? missing.join(" ")
    : "No missing evidence was identified by the current read-only runtime.";
}

function buildRecommendedBusinessAction(
  report: ServiceReportView,
  documents: BusinessDocumentDetail[],
  blockers: BusinessCaseBlocker[],
) {
  if (blockers.length) {
    return "Resolve current blockers before moving the case forward.";
  }

  if (!documents.length && report.aiDraftPreviewHref) {
    return "Review the AI recommendation and prepare an internal BusinessDocument draft.";
  }

  if (documents.length) {
    return "Review the linked BusinessDocument draft and complete internal approval readiness.";
  }

  return "Review the completed service evidence and decide the next commercial action.";
}

function buildServiceFlowSuggestions(
  report: ServiceReportView,
  documents: BusinessDocumentDetail[],
  blockers: BusinessCaseBlocker[],
): BusinessCaseSuggestion[] {
  const suggestions: BusinessCaseSuggestion[] = [];
  const document = latestDocument(documents);

  if (!documents.length && report.aiDraftPreviewHref) {
    suggestions.push({
      label: "Create Quote Draft",
      status: "Ready for review",
      ownerDomain: "Commercial",
      href: report.aiDraftPreviewHref,
      explanation:
        "Service evidence and AI recommendation preview exist, but no linked BusinessDocument draft exists yet. User approval is still required before any draft creation.",
    });
  }

  if (document) {
    suggestions.push({
      label: `Review ${document.selectedDocumentType}`,
      status: blockers.length ? "Blocked" : "Ready for review",
      ownerDomain: "Commercial / Approval",
      href: `/business-documents/${document.id}`,
      explanation:
        "A BusinessDocument draft already exists, so the next internal step is review and approval readiness. No external processing is executed by this suggestion.",
    });
  }

  if (documents.some((item) => item.engineReview.payment.required)) {
    suggestions.push({
      label: "Prepare financial follow-up",
      status: "Ready for review",
      ownerDomain: "Financial",
      href: document ? `/business-documents/${document.id}` : "",
      explanation:
        "At least one linked document requires payment handling. Financial intake remains internal and cannot issue receipts without approval.",
    });
  }

  if (
    documents.some((item) =>
      item.items.some((line) => line.manufacturerSkuMatch.salesSku),
    )
  ) {
    suggestions.push({
      label: "Review parts impact",
      status: "Ready for review",
      ownerDomain: "Inventory & Procurement",
      href: `/service-reports/${report.id}`,
      explanation:
        "Trusted Tal sales SKU visibility exists on linked document lines. The current runtime exposes read-only impact only and does not reserve, deduct, or purchase stock.",
    });
  }

  if (blockers.length) {
    suggestions.push({
      label: "Resolve approval blockers",
      status: "Blocked",
      ownerDomain: "Approval & Governance",
      href: document ? `/business-documents/${document.id}` : "",
      explanation:
        "Current blockers prevent approval readiness. The user must review the blocker list before advancing the commercial lifecycle.",
    });
  }

  if (!suggestions.length) {
    suggestions.push({
      label: "Schedule follow-up",
      status: "Waiting for evidence",
      ownerDomain: "Service Operations",
      href: `/service-reports/${report.id}`,
      explanation:
        "The runtime does not have enough linked commercial or recommendation evidence to propose a specific document action.",
    });
  }

  return suggestions;
}

function buildServiceFlow(
  report: ServiceReportView,
  documents: BusinessDocumentDetail[],
  commands: AutomationCommandListItem[],
  blockers: BusinessCaseBlocker[],
  commercial: BusinessCaseViewModel["commercial"],
  approval: BusinessCaseDomainState,
  financial: BusinessCaseDomainState,
  inventory: BusinessCaseDomainState,
): BusinessCaseServiceFlow {
  const document = latestDocument(documents);
  const completedService = isCompletedServiceReport(report);
  const hasBusinessDocument = Boolean(document);
  const hasBlockers = Boolean(blockers.length);
  const approvalHref = document ? `/business-documents/${document.id}` : "";

  return {
    boundary:
      "End-to-end Service Flow is an internal projection over BusinessCase, Commercial, Financial, Approval, Automation, and read-only Inventory-impact runtime. It explains what can be reviewed next and never creates documents, issues receipts, calls external adapters, sends email, or mutates inventory.",
    steps: [
      {
        label: "Completed Service Report",
        status: completedService ? "Ready" : "Waiting",
        summary: `Service status is ${report.status}.`,
        href: `/service-reports/${report.id}`,
      },
      {
        label: "BusinessCase",
        status: "Ready",
        summary: "BusinessCase gathers the existing domain runtime context.",
        href: `/business-cases/service-report/${report.id}`,
      },
      {
        label: "Business Intelligence Analysis",
        status: "Ready",
        summary: "Analysis is generated from existing evidence only.",
        href: `/business-cases/service-report/${report.id}`,
      },
      {
        label: "Business Suggestions",
        status: hasBlockers ? "Review" : "Ready",
        summary: hasBlockers
          ? "Suggestions exist, but blockers must be reviewed first."
          : "Internal next-step suggestions are available.",
        href: `/business-cases/service-report/${report.id}`,
      },
      {
        label: "Commercial Runtime",
        status: hasBusinessDocument ? "Ready" : "Waiting",
        summary: commercial.summary,
        href: commercial.href,
      },
      {
        label: "BusinessDocument Draft",
        status: hasBusinessDocument ? "Ready" : "Waiting",
        summary: hasBusinessDocument
          ? `${document?.title} is linked for internal review.`
          : "No BusinessDocument draft is linked yet.",
        href: approvalHref,
      },
      {
        label: "Operations Command Center",
        status: "Ready",
        summary: "Operations queues can surface this BusinessCase as work.",
        href: "/operations",
      },
      {
        label: "Customer 360",
        status: report.customerSummary.id ? "Ready" : "Waiting",
        summary: report.customerSummary.id
          ? "Customer journey projection can show this case."
          : "Customer identity is missing.",
        href: report.customerSummary.id ? `/customers/${report.customerSummary.id}` : "",
      },
      {
        label: "Approval Ready",
        status:
          approval.status === "Clear"
            ? "Ready"
            : approval.status === "Needs review"
              ? "Blocked"
              : "Waiting",
        summary: approval.summary,
        href: approval.href,
      },
    ],
    intelligence: [
      {
        label: "What happened?",
        value: `Service Report ${report.reportNumber} is the source event.`,
        explanation: report.description,
      },
      {
        label: "What evidence exists?",
        value: buildEvidenceExists(report, documents, commands),
        explanation:
          "The evidence list is derived from linked service, asset, AI recommendation, document, financial intake, and automation records.",
      },
      {
        label: "What evidence is missing?",
        value: buildEvidenceMissing(report, documents, blockers),
        explanation:
          "Missing evidence is limited to gaps visible from current runtime; the system does not infer unavailable facts.",
      },
      {
        label: "Business action recommended",
        value: buildRecommendedBusinessAction(report, documents, blockers),
        explanation:
          "Recommendation priority is blocker resolution first, then document review or draft preparation based on existing linked records.",
      },
      {
        label: "Recommended BusinessDocument type",
        value: selectedDocumentType(documents),
        explanation: hasBusinessDocument
          ? "The recommendation uses the selected type from the linked BusinessDocument."
          : "No document is linked yet, so Quote draft is the safest internal commercial starting point.",
      },
      {
        label: "Approvals required",
        value: approval.summary,
        explanation:
          "Approval readiness comes from the existing Approval/Governance boundary and BusinessDocument review warnings.",
      },
      {
        label: "Financial implications",
        value: financial.summary,
        explanation:
          "Financial implications come from Financial Intake status and linked document payment requirements only.",
      },
      {
        label: "Inventory implications",
        value: inventory.summary,
        explanation:
          "Inventory is read-only in this flow. No reservation, deduction, purchase order, or stock mutation is performed.",
      },
    ],
    suggestions: buildServiceFlowSuggestions(report, documents, blockers),
    approvalReadiness: {
      status: approval.status,
      summary: approval.summary,
      href: approval.href,
    },
  };
}

function buildBusinessCaseViewModel(
  report: ServiceReportView,
  allDocuments: BusinessDocumentDetail[],
  allCommands: AutomationCommandListItem[],
): BusinessCaseViewModel {
  const documents = allDocuments.filter(
    (document) => document.serviceReportId === report.id,
  );
  const documentIds = new Set(documents.map((document) => document.id));
  const commands = allCommands.filter(
    (command) =>
      command.sourceServiceReportId === report.id ||
      documentIds.has(command.sourceObjectId),
  );
  const blockers = buildBlockers(documents, commands);
  const commercial = buildCommercialState(documents);
  const automation = buildAutomationState(commands);
  const approval = buildApprovalState(documents);
  const financial = buildFinancialState(documents);
  const inventory = buildInventoryState(report, documents);

  return {
    id: buildCaseId(report.id),
    title: buildCaseTitle(report),
    status: blockers.length ? "Needs review" : "Open",
    source: {
      type: "service_report",
      id: report.id,
      label: `Service Report ${report.reportNumber}`,
      href: `/service-reports/${report.id}`,
    },
    party: {
      id: report.customerSummary.id,
      name: report.customerSummary.name,
      contactName: report.customerSummary.contactName,
      phone: report.customerSummary.phonePrimary,
      email: report.customerSummary.emailPrimary,
      href: report.customerSummary.id
        ? `/customers/${report.customerSummary.id}`
        : "",
    },
    assets: report.equipment.map((item) => ({
      id: item.id,
      label: `${item.equipmentNumber} - ${item.type}`,
      model: item.model,
      serialNumber: item.serialNumber,
      status: item.status,
      href: `/equipment/${item.id}`,
    })),
    service: buildServiceState(report),
    aiRecommendation: buildAiRecommendationState(report),
    commercial,
    approval,
    automation,
    financial,
    inventory,
    blockers,
    closureReadiness: buildClosureReadiness(blockers),
    timeline: buildTimeline(report, documents, commands),
    serviceFlow: buildServiceFlow(
      report,
      documents,
      commands,
      blockers,
      commercial,
      approval,
      financial,
      inventory,
    ),
  };
}

async function getDetailedBusinessDocuments() {
  const documentList = await getBusinessDocumentList();

  return (
    await Promise.all(
      documentList.map((document) => getBusinessDocumentById(document.id)),
    )
  ).filter((document): document is BusinessDocumentDetail => Boolean(document));
}

export async function getBusinessCaseList(): Promise<BusinessCaseViewModel[]> {
  const [{ serviceReports }, documents, commandList] = await Promise.all([
    getServiceReportList(),
    getDetailedBusinessDocuments(),
    getAutomationCommandList(),
  ]);

  return serviceReports.map((report) =>
    buildBusinessCaseViewModel(report, documents, commandList),
  );
}

export async function getBusinessCaseByServiceReportId(
  serviceReportId: string,
): Promise<BusinessCaseViewModel | undefined> {
  const report = await getServiceReportById(serviceReportId);

  if (!report) {
    return undefined;
  }

  const [documents, commandList] = await Promise.all([
    getDetailedBusinessDocuments(),
    getAutomationCommandList(),
  ]);

  return buildBusinessCaseViewModel(report, documents, commandList);
}
