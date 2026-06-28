export const CREATE_MAVEN_COMMAND_PHRASE = "CREATE MAVEN COMMAND";

type MavenCommandStatus = {
  appsheetCommandId?: string | null;
  id: string;
  status?: string;
};

type MavenCommandGateDocument = {
  status: string;
  mavenDocumentNumber: string | null;
  mavenPdfLink: string | null;
  items: Array<{
    needsPriceApproval: boolean;
  }>;
  automationCommands: MavenCommandStatus[];
};

export function getMavenDraftCommandCreationStatus(
  document: MavenCommandGateDocument,
) {
  const allowedStatus =
    document.status === "APPROVED" || document.status === "READY_TO_SEND";

  if (!allowedStatus) {
    return "status-not-ready";
  }

  if (document.mavenDocumentNumber || document.mavenPdfLink) {
    return "maven-exists";
  }

  if (!document.items.length) {
    return "missing-items";
  }

  if (document.items.some((item) => item.needsPriceApproval)) {
    return "price-approval-required";
  }

  if (document.automationCommands.length) {
    return "existing-command";
  }

  return "ready";
}

function formatEnum(value: unknown, fallback = "Unknown") {
  const text = String(value || fallback).trim() || fallback;

  return text
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function buildMavenDraftCommandReview(
  document: MavenCommandGateDocument,
) {
  const latestCommand = document.automationCommands[0];

  if (latestCommand) {
    return {
      canCreateMavenCommand: false,
      blockedReason:
        "A Maven document-generation AutomationCommand already exists for this BusinessDocument.",
      approvalPhrase: CREATE_MAVEN_COMMAND_PHRASE,
      latestCommandId: latestCommand.appsheetCommandId || latestCommand.id,
      latestCommandStatus: formatEnum(latestCommand.status),
    };
  }

  const status = getMavenDraftCommandCreationStatus(document);

  if (status === "status-not-ready") {
    return {
      canCreateMavenCommand: false,
      blockedReason:
        "BusinessDocument status must be Approved or Ready To Send before a Maven document-generation command can be queued.",
      approvalPhrase: CREATE_MAVEN_COMMAND_PHRASE,
      latestCommandId: "No command",
      latestCommandStatus: "No command",
    };
  }

  if (status === "maven-exists") {
    return {
      canCreateMavenCommand: false,
      blockedReason:
        "Maven fields are already populated; duplicate Maven document-generation commands are blocked.",
      approvalPhrase: CREATE_MAVEN_COMMAND_PHRASE,
      latestCommandId: "No command",
      latestCommandStatus: "No command",
    };
  }

  if (status === "missing-items") {
    return {
      canCreateMavenCommand: false,
      blockedReason:
        "BusinessDocumentItems are required before a Maven document-generation command can be queued.",
      approvalPhrase: CREATE_MAVEN_COMMAND_PHRASE,
      latestCommandId: "No command",
      latestCommandStatus: "No command",
    };
  }

  if (status === "price-approval-required") {
    return {
      canCreateMavenCommand: false,
      blockedReason:
        "Price approval must be resolved for every line before a Maven document-generation command can be queued.",
      approvalPhrase: CREATE_MAVEN_COMMAND_PHRASE,
      latestCommandId: "No command",
      latestCommandStatus: "No command",
    };
  }

  return {
    canCreateMavenCommand: true,
    blockedReason: "Ready for explicit Maven document-generation command approval.",
    approvalPhrase: CREATE_MAVEN_COMMAND_PHRASE,
    latestCommandId: "No command",
    latestCommandStatus: "No command",
  };
}
