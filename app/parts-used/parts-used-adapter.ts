import type { Customer, PartUsed, Prisma, Product, ServiceReport } from "@prisma/client";
import { prisma } from "../../lib/prisma";

export type PartsUsedListFilters = {
  query?: string;
  matchSource?: string;
  approval?: boolean;
  linked?: boolean;
};

export type PartsUsedListItem = {
  id: string;
  partName: string;
  partSku: string;
  quantity: string;
  equipmentReference: string;
  matchSource: string;
  matchConfidence: string;
  needsUserApproval: string;
  serviceReportId: string;
  serviceReportNumber: string;
  customer: string;
  productId: string;
  productName: string;
};

export type PartsUsedDetail = PartsUsedListItem & {
  internalId: string;
  serviceReportTechnician: string;
  productSku: string;
  productCategory: string;
};

type PartsUsedServiceReport = Pick<
  ServiceReport,
  "appsheetReportId" | "reportCounter" | "reportNumberText" | "technicianName"
> & {
  customer: Pick<Customer, "name"> | null;
};

type PartsUsedProduct = Pick<
  Product,
  "appsheetProductId" | "sku" | "name" | "category"
>;

type PartsUsedRecord = Pick<
  PartUsed,
  | "id"
  | "appsheetPartId"
  | "partName"
  | "partSku"
  | "quantity"
  | "equipmentReference"
  | "matchSource"
  | "matchConfidence"
  | "needsUserApproval"
> & {
  serviceReport: PartsUsedServiceReport | null;
  product: PartsUsedProduct | null;
};

const MATCH_SOURCE_VALUES = [
  "PRODUCTS_CATALOG",
  "MAVEN_HISTORY",
  "SAME_CUSTOMER_HISTORY",
  "SAME_EQUIPMENT_HISTORY",
  "SIMILAR_SERVICE_HISTORY",
  "AI_ESTIMATE",
  "FIXED_RULE",
  "MANUAL",
  "UNKNOWN",
] satisfies PartUsed["matchSource"][];

function readText(value: unknown, fallback = "") {
  if (value === undefined || value === null) {
    return fallback;
  }

  const text = String(value).trim();
  return text || fallback;
}

function formatReportNumber(report: PartsUsedServiceReport | null) {
  if (!report) {
    return "No linked report";
  }

  return (
    readText(report.reportCounter) ||
    readText(report.reportNumberText) ||
    report.appsheetReportId
  );
}

function formatMatchSource(value: PartUsed["matchSource"]) {
  return value
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatApproval(value: boolean) {
  return value ? "Needs approval" : "Approved";
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
}

function mapPartsUsedListItem(item: PartsUsedRecord): PartsUsedListItem {
  return {
    id: readText(item.appsheetPartId) || item.id,
    partName: readText(item.partName, "No part name"),
    partSku: readText(item.partSku, "No SKU"),
    quantity: readText(item.quantity, "No quantity"),
    equipmentReference: readText(item.equipmentReference, "No equipment"),
    matchSource: formatMatchSource(item.matchSource),
    matchConfidence: readText(item.matchConfidence, "No confidence"),
    needsUserApproval: formatApproval(item.needsUserApproval),
    serviceReportId: readText(item.serviceReport?.appsheetReportId),
    serviceReportNumber: formatReportNumber(item.serviceReport),
    customer: readText(item.serviceReport?.customer?.name, "No customer"),
    productId: readText(item.product?.appsheetProductId),
    productName: readText(item.product?.name, "No product link"),
  };
}

function mapPartsUsedDetail(item: PartsUsedRecord): PartsUsedDetail {
  return {
    ...mapPartsUsedListItem(item),
    internalId: item.id,
    serviceReportTechnician: readText(
      item.serviceReport?.technicianName,
      "No technician",
    ),
    productSku: readText(item.product?.sku, "No product SKU"),
    productCategory: readText(item.product?.category, "No product category"),
  };
}

function buildPartsUsedWhere(filters: PartsUsedListFilters) {
  const andFilters: Prisma.PartUsedWhereInput[] = [];

  if (filters.query) {
    const query = filters.query;
    const numericQuery = Number(query);
    const reportCounterFilter = Number.isInteger(numericQuery)
      ? [{ reportCounter: numericQuery }]
      : [];

    andFilters.push({
      OR: [
        { appsheetPartId: { contains: query, mode: "insensitive" } },
        { partName: { contains: query, mode: "insensitive" } },
        { partSku: { contains: query, mode: "insensitive" } },
        { equipmentReference: { contains: query, mode: "insensitive" } },
        {
          serviceReport: {
            OR: [
              { appsheetReportId: { contains: query, mode: "insensitive" } },
              { reportNumberText: { contains: query, mode: "insensitive" } },
              ...reportCounterFilter,
            ],
          },
        },
        {
          product: {
            OR: [
              { appsheetProductId: { contains: query, mode: "insensitive" } },
              { sku: { contains: query, mode: "insensitive" } },
              { name: { contains: query, mode: "insensitive" } },
            ],
          },
        },
      ],
    });
  }

  if (
    filters.matchSource &&
    MATCH_SOURCE_VALUES.includes(filters.matchSource as PartUsed["matchSource"])
  ) {
    const matchSource = filters.matchSource as PartUsed["matchSource"];
    andFilters.push({ matchSource });
  }

  if (filters.approval !== undefined) {
    andFilters.push({ needsUserApproval: filters.approval });
  }

  if (filters.linked === true) {
    andFilters.push({ serviceReportId: { not: null } });
  }

  if (filters.linked === false) {
    andFilters.push({ serviceReportId: null });
  }

  return andFilters.length ? { AND: andFilters } : undefined;
}

const partsUsedSelect = {
  id: true,
  appsheetPartId: true,
  partName: true,
  partSku: true,
  quantity: true,
  equipmentReference: true,
  matchSource: true,
  matchConfidence: true,
  needsUserApproval: true,
  serviceReport: {
    select: {
      appsheetReportId: true,
      reportCounter: true,
      reportNumberText: true,
      technicianName: true,
      customer: { select: { name: true } },
    },
  },
  product: {
    select: {
      appsheetProductId: true,
      sku: true,
      name: true,
      category: true,
    },
  },
} satisfies Prisma.PartUsedSelect;

export async function getPartsUsedList(filters: PartsUsedListFilters = {}) {
  const parts = await prisma.partUsed.findMany({
    where: buildPartsUsedWhere(filters),
    select: partsUsedSelect,
    orderBy: [
      { partSku: "asc" },
      { partName: "asc" },
      { appsheetPartId: "asc" },
      { id: "asc" },
    ],
  });

  return parts.map(mapPartsUsedListItem);
}

export async function getPartUsedById(id: string) {
  const item = await prisma.partUsed.findFirst({
    where: {
      OR: [{ appsheetPartId: id }, ...(isUuid(id) ? [{ id }] : [])],
    },
    select: partsUsedSelect,
  });

  return item ? mapPartsUsedDetail(item) : undefined;
}
