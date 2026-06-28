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
    approval: buildApprovalState(documents),
    automation,
    financial: buildFinancialState(documents),
    inventory: buildInventoryState(report, documents),
    blockers,
    closureReadiness: buildClosureReadiness(blockers),
    timeline: buildTimeline(report, documents, commands),
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
