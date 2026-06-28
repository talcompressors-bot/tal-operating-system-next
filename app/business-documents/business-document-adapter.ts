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
  buildBusinessDocumentCommercialLifecycle,
  type CommercialLifecycleView,
} from "../../lib/business-document-commercial-lifecycle";
import {
  buildBusinessDocumentViewModel,
  type BusinessDocumentViewModel,
} from "../../lib/business-document-view-model";
import { buildBusinessDocumentApprovalReview } from "../../lib/business-document-approval-boundary";
import { buildMavenDraftCommandReview } from "../../lib/business-document-automation-boundary";
import {
  buildBusinessDocumentReviewWarnings,
  mapBusinessDocumentReviewLifecycle,
  mapBusinessDocumentReviewStatus,
} from "../../lib/business-document-review-boundary";
import {
  buildFinancialIntakeCapability,
  type FinancialIntakeCapability,
} from "../../lib/financial-intake-boundary";
import {
  matchManufacturerSku,
  type ManufacturerSkuMatch,
} from "../../lib/manufacturer-sku-matching";
import {
  buildBusinessDocumentLearningReview,
  type BusinessDocumentLearningReview,
} from "../../lib/business-document-learning-boundary";

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
  commercialLifecycle: CommercialLifecycleView;
  financialIntake: FinancialIntakeCapability;
  engineReview: BusinessDocumentEngineReview;
  learningReview: BusinessDocumentLearningReview;
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
  const reviewWarnings = buildBusinessDocumentReviewWarnings(document);
  const approvalReview = buildBusinessDocumentApprovalReview(document);
  const commandReview = buildMavenDraftCommandReview(document);
  const commercialLifecycle = buildBusinessDocumentCommercialLifecycle({
    status: document.status,
    approvalStatus: document.approvalStatus,
    approvedAt: document.approvedAt,
    mavenDocumentNumber: document.mavenDocumentNumber,
    mavenPdfLink: document.mavenPdfLink,
    sendStatus: document.sendStatus,
    reviewWarnings,
    approvalBlockers: approvalReview.blockers,
    externalAdapter: {
      canCreateCommand: commandReview.canCreateMavenCommand,
      latestCommandId: commandReview.latestCommandId,
      latestCommandStatus: commandReview.latestCommandStatus,
    },
    financial: {
      paymentRequired: engineReview.payment.required,
      detectedSources: engineReview.payment.detectedSources,
    },
  });
  const financialIntake = buildFinancialIntakeCapability({
    businessDocumentId: listItem.id,
    businessDocumentTitle: listItem.title,
    customerId: listItem.customerId,
    customerName: listItem.customerName,
    documentType: document.documentTypeSelected,
    currency: document.currency,
    totalAmount: document.totalAmount,
    approvalStatus: document.approvalStatus,
    commercialStage: commercialLifecycle.currentStage.code,
    rawSource: document.rawSource,
  });
  const learningReview = buildBusinessDocumentLearningReview({
    appsheetBusinessDocumentId: document.appsheetBusinessDocumentId,
    draftTitle: document.draftTitle,
    sourceDocumentId: document.sourceDocumentId,
    status: document.status,
    approvalStatus: document.approvalStatus,
    rawSource: document.rawSource,
    items: document.items.map((item) => ({
      itemName: item.itemName,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      totalPrice: item.totalPrice,
      source: item.source,
      needsPriceApproval: item.needsPriceApproval,
      matchConfidence: item.matchConfidence,
      rawSource: item.rawSource,
    })),
    logs: document.logs.map((log) => ({
      action: log.action,
      rawData: log.rawData,
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
    reviewStatus: mapBusinessDocumentReviewStatus(document),
    reviewWarnings,
    approvalReview,
    commandReview,
    commercialLifecycle,
    financialIntake,
    engineReview,
    learningReview,
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
    lifecycle: mapBusinessDocumentReviewLifecycle(document),
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
