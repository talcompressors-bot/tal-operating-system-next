import type { AutomationCommand, BusinessDocument, Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";

type AutomationCommandBusinessDocument = Pick<
  BusinessDocument,
  "appsheetBusinessDocumentId" | "draftTitle"
>;

type AutomationCommandRecord = Pick<
  AutomationCommand,
  | "id"
  | "appsheetCommandId"
  | "businessDocumentId"
  | "commandName"
  | "commandType"
  | "status"
  | "requestedBy"
  | "requestedAt"
  | "result"
  | "completedAt"
  | "processedAt"
  | "errorMessage"
  | "notes"
  | "idempotencyKey"
  | "createdAt"
> & {
  businessDocument: AutomationCommandBusinessDocument | null;
};

export type AutomationCommandListItem = {
  id: string;
  title: string;
  status: string;
  commandType: string;
  sourceObjectId: string;
  sourceObjectLabel: string;
  externalTarget: string;
  requestedBy: string;
  requestedAt: string;
};

export type AutomationCommandDetail = AutomationCommandListItem & {
  internalId: string;
  processedAt: string;
  completedAt: string;
  result: string;
  retryErrorPlaceholder: string;
  notes: string;
  idempotencyKey: string;
  lifecycle: {
    pending: string;
    running: string;
    completed: string;
    failed: string;
  };
};

const automationCommandSelect = {
  id: true,
  appsheetCommandId: true,
  businessDocumentId: true,
  commandName: true,
  commandType: true,
  status: true,
  requestedBy: true,
  requestedAt: true,
  result: true,
  completedAt: true,
  processedAt: true,
  errorMessage: true,
  notes: true,
  idempotencyKey: true,
  createdAt: true,
  businessDocument: {
    select: {
      appsheetBusinessDocumentId: true,
      draftTitle: true,
    },
  },
} satisfies Prisma.AutomationCommandSelect;

function readText(value: unknown, fallback = "") {
  if (value === undefined || value === null) {
    return fallback;
  }

  const text = String(value).trim();
  return text || fallback;
}

function formatEnum(value: unknown, fallback = "Unknown") {
  const text = readText(value, fallback);

  return text
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatDate(value: Date | null) {
  if (!value) {
    return "Not recorded";
  }

  return value.toISOString().slice(0, 10);
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
}

function mapStatus(status: AutomationCommand["status"]) {
  return status === "ERROR" ? "Failed" : formatEnum(status);
}

function getExternalTarget(commandType: AutomationCommand["commandType"]) {
  switch (commandType) {
    case "CREATE_MAVEN_DRAFT":
    case "SYNC_MAVEN_DOCUMENTS":
      return "Maven placeholder";
    case "CREATE_RECEIPT_DRAFT":
      return "Invoice4U placeholder";
    case "SEND_REPORT_EMAIL":
      return "Email placeholder";
    default:
      return "No external target configured";
  }
}

function getSourceObject(command: AutomationCommandRecord) {
  if (!command.businessDocument) {
    return {
      id: "",
      label: "No source object linked",
    };
  }

  const id =
    readText(command.businessDocument.appsheetBusinessDocumentId) ||
    readText(command.businessDocumentId);

  return {
    id,
    label: readText(command.businessDocument.draftTitle, "Business document"),
  };
}

function getLifecycle(command: AutomationCommandRecord) {
  const status = command.status;

  return {
    pending: status === "PENDING" ? "Pending" : "Pending placeholder",
    running: status === "RUNNING" ? "Running" : "Running placeholder",
    completed: status === "COMPLETED" ? "Completed" : "Completed placeholder",
    failed: status === "ERROR" ? "Failed" : "Failed placeholder",
  };
}

function getRetryErrorPlaceholder(command: AutomationCommandRecord) {
  const errorMessage = readText(command.errorMessage);

  if (errorMessage) {
    return `Error recorded: ${errorMessage}`;
  }

  if (command.status === "ERROR") {
    return "Failed command; retry state not recorded";
  }

  return "No retry or error recorded";
}

function mapAutomationCommandListItem(
  command: AutomationCommandRecord,
): AutomationCommandListItem {
  const sourceObject = getSourceObject(command);

  return {
    id: readText(command.appsheetCommandId) || command.id,
    title: readText(command.commandName, "Untitled automation command"),
    status: mapStatus(command.status),
    commandType: formatEnum(command.commandType),
    sourceObjectId: sourceObject.id,
    sourceObjectLabel: sourceObject.label,
    externalTarget: getExternalTarget(command.commandType),
    requestedBy: readText(command.requestedBy, "No requester"),
    requestedAt: formatDate(command.requestedAt ?? command.createdAt),
  };
}

function mapAutomationCommandDetail(
  command: AutomationCommandRecord,
): AutomationCommandDetail {
  return {
    ...mapAutomationCommandListItem(command),
    internalId: command.id,
    processedAt: formatDate(command.processedAt),
    completedAt: formatDate(command.completedAt),
    result: readText(command.result, "No result recorded"),
    retryErrorPlaceholder: getRetryErrorPlaceholder(command),
    notes: readText(command.notes, "No notes"),
    idempotencyKey: readText(command.idempotencyKey, "No idempotency key"),
    lifecycle: getLifecycle(command),
  };
}

export async function getAutomationCommandList() {
  const commands = await prisma.automationCommand.findMany({
    select: automationCommandSelect,
    orderBy: [{ requestedAt: "desc" }, { createdAt: "desc" }, { id: "asc" }],
  });

  return commands.map(mapAutomationCommandListItem);
}

export async function getAutomationCommandById(id: string) {
  const command = await prisma.automationCommand.findFirst({
    where: {
      OR: [{ appsheetCommandId: id }, ...(isUuid(id) ? [{ id }] : [])],
    },
    select: automationCommandSelect,
  });

  return command ? mapAutomationCommandDetail(command) : undefined;
}
