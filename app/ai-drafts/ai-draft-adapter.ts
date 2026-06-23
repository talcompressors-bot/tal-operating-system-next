import type { AiDraftSuggestion, Customer, Prisma, ServiceReport } from "@prisma/client";
import { prisma } from "../../lib/prisma";

type AiDraftServiceReport = Pick<
  ServiceReport,
  "appsheetReportId" | "reportCounter" | "reportNumberText"
>;

type AiDraftCustomer = Pick<Customer, "appsheetCustomerId" | "name">;

type AiDraftRecord = Pick<
  AiDraftSuggestion,
  | "id"
  | "appsheetSuggestionId"
  | "suggestedDocumentType"
  | "suggestedTitle"
  | "suggestedItems"
  | "suggestedNotes"
  | "sourceSummary"
  | "confidenceLevel"
  | "requiresApproval"
  | "approvalStatus"
  | "suggestedTotalAmount"
  | "suggestedPriority"
  | "status"
  | "sourceStatusText"
  | "createdAt"
> & {
  customer: AiDraftCustomer | null;
  serviceReport: AiDraftServiceReport | null;
};

export type AiDraftListItem = {
  id: string;
  title: string;
  draftStatus: string;
  suggestedDocumentType: string;
  approvalStatus: string;
  customerId: string;
  customerName: string;
  serviceReportId: string;
  serviceReportNumber: string;
  suggestedTotalAmount: string;
  createdAt: string;
};

export type AiDraftDetail = AiDraftListItem & {
  internalId: string;
  confidenceLevel: string;
  suggestedPriority: string;
  suggestedParts: string;
  suggestedLabor: string;
  suggestedNotes: string;
  sourceSummary: string;
  approvalPlaceholder: string;
  mavenLifecyclePlaceholder: string;
};

const aiDraftSelect = {
  id: true,
  appsheetSuggestionId: true,
  suggestedDocumentType: true,
  suggestedTitle: true,
  suggestedItems: true,
  suggestedNotes: true,
  sourceSummary: true,
  confidenceLevel: true,
  requiresApproval: true,
  approvalStatus: true,
  suggestedTotalAmount: true,
  suggestedPriority: true,
  status: true,
  sourceStatusText: true,
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
} satisfies Prisma.AiDraftSuggestionSelect;

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

function formatMoney(value: Prisma.Decimal | null) {
  if (!value) {
    return "No amount suggested";
  }

  return `${value.toFixed(2)} ILS`;
}

function formatDate(value: Date) {
  return value.toISOString().slice(0, 10);
}

function formatReportNumber(report: AiDraftServiceReport | null) {
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
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{12}$/i.test(
    value,
  );
}

function getSuggestedItemText(item: unknown) {
  if (!item || typeof item !== "object" || Array.isArray(item)) {
    return readText(item);
  }

  const record = item as Record<string, unknown>;
  const name =
    readText(record.name) ||
    readText(record.item) ||
    readText(record.description) ||
    readText(record.title) ||
    "Suggested item";
  const quantity = readText(record.quantity) || readText(record.qty);
  const total =
    readText(record.total) ||
    readText(record.totalAmount) ||
    readText(record.amount);

  return [name, quantity ? `qty ${quantity}` : "", total ? `total ${total}` : ""]
    .filter(Boolean)
    .join(" - ");
}

function itemLooksLikeLabor(item: unknown) {
  const text = JSON.stringify(item ?? "").toLowerCase();
  return (
    text.includes("labor") ||
    text.includes("work") ||
    text.includes("technician") ||
    text.includes("hour")
  );
}

function summarizeSuggestedItems(
  suggestedItems: Prisma.JsonValue,
  mode: "parts" | "labor",
) {
  if (!suggestedItems) {
    return mode === "parts" ? "No suggested parts" : "No suggested labor";
  }

  const items = Array.isArray(suggestedItems) ? suggestedItems : [suggestedItems];
  const matchingItems = items.filter((item) =>
    mode === "labor" ? itemLooksLikeLabor(item) : !itemLooksLikeLabor(item),
  );
  const summary = matchingItems.map(getSuggestedItemText).filter(Boolean);

  if (!summary.length) {
    return mode === "parts" ? "No suggested parts" : "No suggested labor";
  }

  return summary.join("; ");
}

function mapAiDraftListItem(draft: AiDraftRecord): AiDraftListItem {
  return {
    id: readText(draft.appsheetSuggestionId) || draft.id,
    title: readText(draft.suggestedTitle, "Untitled AI draft"),
    draftStatus:
      readText(draft.status) ||
      readText(draft.sourceStatusText) ||
      formatEnum(draft.approvalStatus),
    suggestedDocumentType: formatEnum(draft.suggestedDocumentType),
    approvalStatus: draft.requiresApproval
      ? formatEnum(draft.approvalStatus)
      : "Approval not required",
    customerId: readText(draft.customer?.appsheetCustomerId),
    customerName: readText(draft.customer?.name, "No linked customer"),
    serviceReportId: readText(draft.serviceReport?.appsheetReportId),
    serviceReportNumber: formatReportNumber(draft.serviceReport),
    suggestedTotalAmount: formatMoney(draft.suggestedTotalAmount),
    createdAt: formatDate(draft.createdAt),
  };
}

function mapAiDraftDetail(draft: AiDraftRecord): AiDraftDetail {
  return {
    ...mapAiDraftListItem(draft),
    internalId: draft.id,
    confidenceLevel: formatEnum(draft.confidenceLevel),
    suggestedPriority: readText(draft.suggestedPriority, "No priority"),
    suggestedParts: summarizeSuggestedItems(draft.suggestedItems, "parts"),
    suggestedLabor: summarizeSuggestedItems(draft.suggestedItems, "labor"),
    suggestedNotes: readText(draft.suggestedNotes, "No suggested notes"),
    sourceSummary: readText(draft.sourceSummary, "No source summary"),
    approvalPlaceholder: draft.requiresApproval
      ? "Waiting for approval workflow"
      : "Approval not required",
    mavenLifecyclePlaceholder: "Maven draft not created",
  };
}

export async function getAiDraftList() {
  const drafts = await prisma.aiDraftSuggestion.findMany({
    select: aiDraftSelect,
    orderBy: [{ createdAt: "desc" }, { id: "asc" }],
  });

  return drafts.map(mapAiDraftListItem);
}

export async function getAiDraftById(id: string) {
  const draft = await prisma.aiDraftSuggestion.findFirst({
    where: {
      OR: [
        { appsheetSuggestionId: id },
        ...(isUuid(id) ? [{ id }] : []),
      ],
    },
    select: aiDraftSelect,
  });

  return draft ? mapAiDraftDetail(draft) : undefined;
}
