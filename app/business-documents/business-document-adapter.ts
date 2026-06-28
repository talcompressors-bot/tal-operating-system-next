import type {
  AiDraftSuggestion,
  AutomationCommand,
  BusinessDocument,
  BusinessDocumentItem,
  BusinessDocumentLog,
  Customer,
  MavenDocument,
  Prisma,
  Product,
  ReportEquipmentItem,
  ServiceReport,
} from "@prisma/client";
import { prisma } from "../../lib/prisma";
import {
  buildBusinessDocumentEngineReview,
  type BusinessDocumentEngineReview,
} from "../../lib/business-document-engine";
import {
  buildBusinessDocumentViewModel,
  type BusinessDocumentViewModel,
} from "../../lib/business-document-view-model";
import {
  matchManufacturerSku,
  type ManufacturerSkuMatch,
} from "../../lib/manufacturer-sku-matching";

type BusinessDocumentCustomer = Pick<Customer, "appsheetCustomerId" | "name">;

type BusinessDocumentServiceReport = Pick<
  ServiceReport,
  "appsheetReportId" | "reportCounter" | "reportNumberText"
> & {
  equipmentItems: Array<
    Pick<
      ReportEquipmentItem,
      | "equipmentNumber"
      | "equipmentType"
      | "equipmentSubtype"
      | "equipmentModel"
      | "compressorCategory"
    >
  >;
};

type BusinessDocumentAiDraft = Pick<
  AiDraftSuggestion,
  "appsheetSuggestionId" | "suggestedTitle"
>;

type BusinessDocumentMavenDocument = Pick<
  MavenDocument,
  "mavenDocumentExternalId" | "documentNumber"
>;

type BusinessDocumentAutomationCommand = Pick<
  AutomationCommand,
  | "id"
  | "appsheetCommandId"
  | "commandType"
  | "status"
  | "requestedBy"
  | "requestedAt"
  | "result"
  | "errorMessage"
  | "createdAt"
>;

type BusinessDocumentItemRecord = BusinessDocumentItem & {
  product: Pick<Product, "sku"> | null;
};

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
  | "sendByEmail"
  | "sendByWhatsapp"
  | "sendStatus"
  | "notes"
  | "rawSource"
  | "createdAt"
> & {
  customer: BusinessDocumentCustomer | null;
  serviceReport: BusinessDocumentServiceReport | null;
  aiDraftSuggestion: BusinessDocumentAiDraft | null;
  mavenDocument: BusinessDocumentMavenDocument | null;
  items: BusinessDocumentItemRecord[];
  logs: BusinessDocumentLog[];
  automationCommands: BusinessDocumentAutomationCommand[];
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
  createdAt: string;
  reviewStatus: {
    internalDraft: string;
    sentState: string;
    mavenState: string;
    emailState: string;
    inventoryState: string;
  };
  reviewWarnings: string[];
  approvalReview: {
    canApproveWithoutOverride: boolean;
    blockers: string[];
    approvalPhrase: string;
    boundary: string;
  };
  commandReview: {
    canCreateMavenCommand: boolean;
    blockedReason: string;
    approvalPhrase: string;
    latestCommandId: string;
    latestCommandStatus: string;
  };
  engineReview: BusinessDocumentEngineReview;
  viewModel: BusinessDocumentViewModel;
  automationCommands: Array<{
    id: string;
    commandType: string;
    status: string;
    requestedBy: string;
    requestedAt: string;
    result: string;
    errorMessage: string;
  }>;
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
    internalId: string;
    name: string;
    quantity: string;
    editableQuantity: string;
    unitPrice: string;
    editableUnitPrice: string;
    totalPrice: string;
    source: string;
    needsPriceApproval: string;
    needsPriceApprovalChecked: boolean;
    pricingEvidence: string[];
    manufacturerSkuMatch: ManufacturerSkuMatch;
  }>;
  logs: Array<{
    id: string;
    action: string;
    result: string;
    performedBy: string;
    createdAt: string;
    notes: string;
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
  sendByEmail: true,
  sendByWhatsapp: true,
  sendStatus: true,
  notes: true,
  rawSource: true,
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
      equipmentItems: {
        orderBy: [{ equipmentNumber: "asc" }, { appsheetItemId: "asc" }],
        select: {
          equipmentNumber: true,
          equipmentType: true,
          equipmentSubtype: true,
          equipmentModel: true,
          compressorCategory: true,
        },
      },
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
    include: {
      product: {
        select: {
          sku: true,
        },
      },
    },
  },
  logs: {
    orderBy: [{ createdAt: "desc" }, { id: "asc" }],
  },
  automationCommands: {
    where: {
      commandType: "CREATE_MAVEN_DRAFT",
    },
    orderBy: [{ createdAt: "desc" }, { id: "asc" }],
    select: {
      id: true,
      appsheetCommandId: true,
      commandType: true,
      status: true,
      requestedBy: true,
      requestedAt: true,
      result: true,
      errorMessage: true,
      createdAt: true,
    },
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

function summarizePricingEvidence(rawSource: Prisma.JsonValue) {
  if (!rawSource || typeof rawSource !== "object" || Array.isArray(rawSource)) {
    return [];
  }

  const record = rawSource as Record<string, unknown>;
  const evidence = record.pricingEvidence;

  if (!Array.isArray(evidence)) {
    return [];
  }

  return evidence
    .map((item) => {
      if (!item || typeof item !== "object" || Array.isArray(item)) {
        return "";
      }

      const evidenceRecord = item as Record<string, unknown>;
      return [
        readText(evidenceRecord.source),
        readText(evidenceRecord.unitPrice),
        readText(evidenceRecord.note),
      ]
        .filter(Boolean)
        .join(" - ");
    })
    .filter(Boolean);
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

function mapReviewStatus(document: BusinessDocumentRecord) {
  return {
    internalDraft:
      document.status === "DRAFT_RECOMMENDED" ||
      document.status === "WAITING_USER_APPROVAL"
        ? "Internal Draft"
        : formatEnum(document.status, "Internal Draft"),
    sentState:
      readText(document.sendStatus) ||
      (document.sendByEmail || document.sendByWhatsapp
        ? "Send pending review"
        : "Not sent"),
    mavenState:
      document.mavenDocumentNumber || document.mavenPdfLink
        ? "Maven document exists"
        : "No Maven action",
    emailState:
      document.sendStatus || document.sendByEmail || document.sendByWhatsapp
        ? "Delivery review required"
        : "No email/customer-facing action",
    inventoryState: "No inventory deduction",
  };
}

function buildReviewWarnings(document: BusinessDocumentRecord) {
  const warnings: string[] = [];
  const approvalRequiredItems = document.items.filter(
    (item) => item.needsPriceApproval,
  );
  const missingEvidenceItems = document.items.filter(
    (item) => !summarizePricingEvidence(item.rawSource).length,
  );

  if (!document.items.length) {
    warnings.push("No BusinessDocumentItems are linked to this draft.");
  }

  if (approvalRequiredItems.length) {
    warnings.push(
      `${approvalRequiredItems.length} line item(s) still require price approval before any Maven/Invoice4U action.`,
    );
  }

  if (missingEvidenceItems.length) {
    warnings.push(
      `${missingEvidenceItems.length} line item(s) have no preserved pricing evidence.`,
    );
  }

  if (!document.serviceReport) {
    warnings.push("No source ServiceReport is linked to this draft.");
  }

  if (document.mavenDocumentNumber || document.mavenPdfLink) {
    warnings.push("Maven fields are populated; verify no duplicate external action before proceeding.");
  }

  if (document.sendStatus || document.sendByEmail || document.sendByWhatsapp) {
    warnings.push("Send fields are populated; verify customer-facing delivery status before proceeding.");
  }

  return warnings.length
    ? warnings
    : ["Review-ready internal draft. User approval is still required before any external action."];
}

function buildApprovalReview(document: BusinessDocumentRecord) {
  const blockers: string[] = [];
  const priceApprovalItems = document.items.filter(
    (item) => item.needsPriceApproval || !item.unitPrice || !item.totalPrice,
  );
  const quantityIssueItems = document.items.filter((item) => {
    const quantity = Number(item.quantity.toString());
    return !Number.isFinite(quantity) || quantity <= 0;
  });

  if (!document.items.length) {
    blockers.push("No BusinessDocumentItems are linked.");
  }

  if (priceApprovalItems.length) {
    blockers.push(
      `${priceApprovalItems.length} line item(s) still require pricing review or an explicit approval override.`,
    );
  }

  if (quantityIssueItems.length) {
    blockers.push(
      `${quantityIssueItems.length} line item(s) have missing or zero quantity and require an explicit approval override.`,
    );
  }

  return {
    canApproveWithoutOverride: blockers.length === 0,
    blockers,
    approvalPhrase: "APPROVE BUSINESS DOCUMENT",
    boundary:
      "Approval updates only the internal BusinessDocument and audit log. It does not call Maven/Invoice4U, create AutomationCommands, send email, or deduct inventory.",
  };
}

function buildModelEvidence(report: BusinessDocumentServiceReport | null) {
  if (!report) {
    return [];
  }

  return report.equipmentItems.flatMap((item) => [
    readText(item.equipmentNumber),
    readText(item.equipmentType),
    readText(item.equipmentSubtype),
    readText(item.equipmentModel),
    readText(item.compressorCategory),
  ]).filter(Boolean);
}

function mapCommandReview(document: BusinessDocumentRecord) {
  const allowedStatus =
    document.status === "APPROVED" || document.status === "READY_TO_SEND";
  const latestCommand = document.automationCommands[0];
  const approvalRequiredItems = document.items.filter(
    (item) => item.needsPriceApproval,
  );

  if (latestCommand) {
    return {
      canCreateMavenCommand: false,
      blockedReason:
        "A Maven document-generation AutomationCommand already exists for this BusinessDocument.",
      approvalPhrase: "CREATE MAVEN COMMAND",
      latestCommandId: latestCommand.appsheetCommandId || latestCommand.id,
      latestCommandStatus: formatEnum(latestCommand.status),
    };
  }

  if (!allowedStatus) {
    return {
      canCreateMavenCommand: false,
      blockedReason:
        "BusinessDocument status must be Approved or Ready To Send before a Maven document-generation command can be queued.",
      approvalPhrase: "CREATE MAVEN COMMAND",
      latestCommandId: "No command",
      latestCommandStatus: "No command",
    };
  }

  if (document.mavenDocumentNumber || document.mavenPdfLink) {
    return {
      canCreateMavenCommand: false,
      blockedReason:
        "Maven fields are already populated; duplicate Maven document-generation commands are blocked.",
      approvalPhrase: "CREATE MAVEN COMMAND",
      latestCommandId: "No command",
      latestCommandStatus: "No command",
    };
  }

  if (!document.items.length) {
    return {
      canCreateMavenCommand: false,
      blockedReason:
        "BusinessDocumentItems are required before a Maven document-generation command can be queued.",
      approvalPhrase: "CREATE MAVEN COMMAND",
      latestCommandId: "No command",
      latestCommandStatus: "No command",
    };
  }

  if (approvalRequiredItems.length) {
    return {
      canCreateMavenCommand: false,
      blockedReason:
        "Price approval must be resolved for every line before a Maven document-generation command can be queued.",
      approvalPhrase: "CREATE MAVEN COMMAND",
      latestCommandId: "No command",
      latestCommandStatus: "No command",
    };
  }

  return {
    canCreateMavenCommand: true,
    blockedReason: "Ready for explicit Maven document-generation command approval.",
    approvalPhrase: "CREATE MAVEN COMMAND",
    latestCommandId: "No command",
    latestCommandStatus: "No command",
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
  const engineReview = buildBusinessDocumentEngineReview({
    documentTypeSelected: document.documentTypeSelected,
    subtotalAmount: document.subtotalAmount,
    vatAmount: document.vatAmount,
    totalAmount: document.totalAmount,
    currency: document.currency,
    approvalStatus: document.approvalStatus,
    rawSource: document.rawSource,
    items: document.items,
  });
  const modelEvidence = buildModelEvidence(document.serviceReport);
  const items = document.items.map((item) => {
    const manufacturerSkuMatch = matchManufacturerSku({
      modelEvidence,
      itemName: item.itemName,
      salesSku: item.product?.sku,
    });

    return {
      id: readText(item.appsheetItemId) || item.id,
      internalId: item.id,
      name: item.itemName,
      quantity: item.quantity.toFixed(3),
      editableQuantity: item.quantity.toString(),
      unitPrice: formatMoney(item.unitPrice, document.currency),
      editableUnitPrice: item.unitPrice ? item.unitPrice.toString() : "",
      totalPrice: formatMoney(item.totalPrice, document.currency),
      source: formatEnum(item.source),
      needsPriceApproval: item.needsPriceApproval ? "Required" : "No",
      needsPriceApprovalChecked: item.needsPriceApproval,
      pricingEvidence: summarizePricingEvidence(item.rawSource),
      manufacturerSkuMatch,
    };
  });
  const listItem = mapBusinessDocumentListItem(document);
  const viewModel = buildBusinessDocumentViewModel({
    documentId: listItem.id,
    documentTypeSelected: document.documentTypeSelected,
    issueDate: formatDate(document.createdAt),
    currency: document.currency,
    primaryParty: {
      id: listItem.customerId,
      name: listItem.customerName,
      role: "customer",
    },
    source: {
      type: document.serviceReport ? "service_report" : "none",
      reference: listItem.serviceReportNumber,
      label: document.serviceReport ? "Service report" : "No linked source",
      href: listItem.serviceReportId
        ? `/service-reports/${listItem.serviceReportId}`
        : "",
    },
    totals: engineReview.totals,
    lines: items.map((item, index) => ({
      id: item.id,
      index: index + 1,
      name: item.name,
      displayName: item.name,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      totalPrice: item.totalPrice,
      salesSku: item.manufacturerSkuMatch.salesSku,
    })),
  });

  return {
    ...listItem,
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
    createdAt: formatDate(document.createdAt),
    reviewStatus: mapReviewStatus(document),
    reviewWarnings: buildReviewWarnings(document),
    approvalReview: buildApprovalReview(document),
    commandReview: mapCommandReview(document),
    engineReview,
    viewModel,
    automationCommands: document.automationCommands.map((command) => ({
      id: command.appsheetCommandId || command.id,
      commandType: formatEnum(command.commandType),
      status: formatEnum(command.status),
      requestedBy: readText(command.requestedBy, "No user"),
      requestedAt: formatDate(command.requestedAt || command.createdAt),
      result: readText(command.result, "No result"),
      errorMessage: readText(command.errorMessage, "No error"),
    })),
    lifecycle: mapLifecycle(document),
    items,
    logs: document.logs.map((log) => ({
      id: readText(log.appsheetLogId) || log.id,
      action: log.action,
      result: readText(log.result, "No result"),
      performedBy: readText(log.performedBy, "No user"),
      createdAt: formatDate(log.createdAt),
      notes: readText(log.notes, "No notes"),
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
