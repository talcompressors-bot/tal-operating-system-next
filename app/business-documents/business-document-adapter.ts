import type {
  AiDraftSuggestion,
  BusinessDocument,
  BusinessDocumentItem,
  BusinessDocumentLog,
  Customer,
  MavenDocument,
  Prisma,
  ServiceReport,
} from "@prisma/client";
import { prisma } from "../../lib/prisma";

type BusinessDocumentCustomer = Pick<Customer, "appsheetCustomerId" | "name">;

type BusinessDocumentServiceReport = Pick<
  ServiceReport,
  "appsheetReportId" | "reportCounter" | "reportNumberText"
>;

type BusinessDocumentAiDraft = Pick<
  AiDraftSuggestion,
  "appsheetSuggestionId" | "suggestedTitle"
>;

type BusinessDocumentMavenDocument = Pick<
  MavenDocument,
  "mavenDocumentExternalId" | "documentNumber"
>;

type BusinessDocumentRecord = Pick<
  BusinessDocument,
  | "id"
  | "appsheetBusinessDocumentId"
  | "sourceDocumentId"
  | "documentTypeSuggested"
  | "documentTypeSelected"
  | "status"
  | "sourceStatusText"
  | "draftTitle"
  | "description"
  | "subtotalAmount"
  | "vatAmount"
  | "totalAmount"
  | "currency"
  | "approvalStatus"
  | "approvedBy"
  | "approvedAt"
  | "mavenDocumentNumber"
  | "mavenPdfLink"
  | "sendStatus"
  | "notes"
  | "createdAt"
> & {
  customer: BusinessDocumentCustomer | null;
  serviceReport: BusinessDocumentServiceReport | null;
  aiDraftSuggestion: BusinessDocumentAiDraft | null;
  mavenDocument: BusinessDocumentMavenDocument | null;
  items: BusinessDocumentItem[];
  logs: BusinessDocumentLog[];
};

export type BusinessDocumentListItem = {
  id: string;
  title: string;
  status: string;
  selectedDocumentType: string;
  approvalStatus: string;
  customerId: string;
  customerName: string;
  serviceReportId: string;
  serviceReportNumber: string;
  aiDraftId: string;
  aiDraftTitle: string;
  mavenDocumentId: string;
  mavenDocumentNumber: string;
  totalAmount: string;
};

export type BusinessDocumentDetail = BusinessDocumentListItem & {
  internalId: string;
  sourceDocumentId: string;
  suggestedDocumentType: string;
  description: string;
  subtotalAmount: string;
  vatAmount: string;
  approvedBy: string;
  approvedAt: string;
  mavenPdfLink: string;
  sendStatus: string;
  notes: string;
  lifecycle: {
    draft: string;
    approved: string;
    sentToMaven: string;
    mavenCreated: string;
    emailSent: string;
    customerViewed: string;
  };
  items: Array<{
    id: string;
    name: string;
    quantity: string;
    unitPrice: string;
    totalPrice: string;
    source: string;
  }>;
  logs: Array<{
    id: string;
    action: string;
    result: string;
    performedBy: string;
    createdAt: string;
  }>;
};

const businessDocumentSelect = {
  id: true,
  appsheetBusinessDocumentId: true,
  sourceDocumentId: true,
  documentTypeSuggested: true,
  documentTypeSelected: true,
  status: true,
  sourceStatusText: true,
  draftTitle: true,
  description: true,
  subtotalAmount: true,
  vatAmount: true,
  totalAmount: true,
  currency: true,
  approvalStatus: true,
  approvedBy: true,
  approvedAt: true,
  mavenDocumentNumber: true,
  mavenPdfLink: true,
  sendStatus: true,
  notes: true,
  createdAt: true,
  customer: {
    select: {
      appsheetCustomerId: true,
      name: true,
    },
  },
  serviceReport: {
    select: {
      appsheetReportId: true,
      reportCounter: true,
      reportNumberText: true,
    },
  },
  aiDraftSuggestion: {
    select: {
      appsheetSuggestionId: true,
      suggestedTitle: true,
    },
  },
  mavenDocument: {
    select: {
      mavenDocumentExternalId: true,
      documentNumber: true,
    },
  },
  items: {
    orderBy: [{ createdAt: "asc" }, { id: "asc" }],
  },
  logs: {
    orderBy: [{ createdAt: "desc" }, { id: "asc" }],
  },
} satisfies Prisma.BusinessDocumentSelect;

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

function formatMoney(value: Prisma.Decimal | null, currency = "ILS") {
  if (!value) {
    return "No amount";
  }

  return `${value.toFixed(2)} ${currency}`;
}

function formatDate(value: Date | null) {
  if (!value) {
    return "Not recorded";
  }

  return value.toISOString().slice(0, 10);
}

function formatReportNumber(report: BusinessDocumentServiceReport | null) {
  if (!report) {
    return "No linked report";
  }

  return (
    readText(report.reportCounter) ||
    readText(report.reportNumberText) ||
    report.appsheetReportId
  );
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
}

function mapLifecycle(document: BusinessDocumentRecord) {
  const status = readText(document.status).toUpperCase();
  const sendStatus = readText(document.sendStatus).toLowerCase();

  return {
    draft:
      status === "DRAFT_RECOMMENDED" || status === "WAITING_USER_APPROVAL"
        ? "Draft"
        : "Draft placeholder",
    approved: document.approvedAt ? "Approved" : "Approved placeholder",
    sentToMaven:
      status === "MAVEN_DRAFT_REQUESTED" || Boolean(document.mavenDocumentNumber)
        ? "Sent to Maven"
        : "Sent to Maven placeholder",
    mavenCreated: document.mavenDocumentNumber
      ? "Maven Created"
      : "Maven Created placeholder",
    emailSent:
      sendStatus.includes("sent") || Boolean(document.mavenPdfLink)
        ? "Email Sent"
        : "Email Sent placeholder",
    customerViewed: "Customer Viewed placeholder",
  };
}

function mapBusinessDocumentListItem(
  document: BusinessDocumentRecord,
): BusinessDocumentListItem {
  return {
    id: document.appsheetBusinessDocumentId,
    title: readText(document.draftTitle, "Untitled business document"),
    status:
      readText(document.sourceStatusText) ||
      formatEnum(document.status, "Unknown status"),
    selectedDocumentType: formatEnum(document.documentTypeSelected),
    approvalStatus: formatEnum(document.approvalStatus),
    customerId: readText(document.customer?.appsheetCustomerId),
    customerName: readText(document.customer?.name, "No linked customer"),
    serviceReportId: readText(document.serviceReport?.appsheetReportId),
    serviceReportNumber: formatReportNumber(document.serviceReport),
    aiDraftId: readText(document.aiDraftSuggestion?.appsheetSuggestionId),
    aiDraftTitle: readText(
      document.aiDraftSuggestion?.suggestedTitle,
      "No linked AI draft",
    ),
    mavenDocumentId: readText(document.mavenDocument?.mavenDocumentExternalId),
    mavenDocumentNumber:
      readText(document.mavenDocumentNumber) ||
      readText(document.mavenDocument?.documentNumber, "No Maven document"),
    totalAmount: formatMoney(document.totalAmount, document.currency),
  };
}

function mapBusinessDocumentDetail(
  document: BusinessDocumentRecord,
): BusinessDocumentDetail {
  return {
    ...mapBusinessDocumentListItem(document),
    internalId: document.id,
    sourceDocumentId: readText(document.sourceDocumentId, "No source document"),
    suggestedDocumentType: formatEnum(document.documentTypeSuggested),
    description: readText(document.description, "No description"),
    subtotalAmount: formatMoney(document.subtotalAmount, document.currency),
    vatAmount: formatMoney(document.vatAmount, document.currency),
    approvedBy: readText(document.approvedBy, "Not approved"),
    approvedAt: formatDate(document.approvedAt),
    mavenPdfLink: readText(document.mavenPdfLink, "No Maven PDF"),
    sendStatus: readText(document.sendStatus, "No send status"),
    notes: readText(document.notes, "No notes"),
    lifecycle: mapLifecycle(document),
    items: document.items.map((item) => ({
      id: readText(item.appsheetItemId) || item.id,
      name: item.itemName,
      quantity: item.quantity.toFixed(3),
      unitPrice: formatMoney(item.unitPrice, document.currency),
      totalPrice: formatMoney(item.totalPrice, document.currency),
      source: formatEnum(item.source),
    })),
    logs: document.logs.map((log) => ({
      id: readText(log.appsheetLogId) || log.id,
      action: log.action,
      result: readText(log.result, "No result"),
      performedBy: readText(log.performedBy, "No user"),
      createdAt: formatDate(log.createdAt),
    })),
  };
}

export async function getBusinessDocumentList() {
  const documents = await prisma.businessDocument.findMany({
    select: businessDocumentSelect,
    orderBy: [{ createdAt: "desc" }, { appsheetBusinessDocumentId: "asc" }],
  });

  return documents.map(mapBusinessDocumentListItem);
}

export async function getBusinessDocumentById(id: string) {
  const document = await prisma.businessDocument.findFirst({
    where: {
      OR: [
        { appsheetBusinessDocumentId: id },
        ...(isUuid(id) ? [{ id }] : []),
      ],
    },
    select: businessDocumentSelect,
  });

  return document ? mapBusinessDocumentDetail(document) : undefined;
}
