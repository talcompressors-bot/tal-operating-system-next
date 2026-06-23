import type { Customer, Prisma, ReportEquipmentItem, ServiceReport } from "@prisma/client";
import { prisma } from "../../lib/prisma";

export type EquipmentListFilters = {
  query?: string;
  type?: string;
  status?: string;
  linked?: boolean;
};

export type EquipmentListItem = {
  id: string;
  equipmentNumber: string;
  type: string;
  subtype: string;
  model: string;
  serialNumber: string;
  compressorCategory: string;
  status: string;
  currentHours: string;
  serviceReportId: string;
  serviceReportNumber: string;
  customer: string;
};

export type EquipmentDetail = EquipmentListItem & {
  sourceReportId: string;
  reportCounter: string;
  nextService: string;
  serviceDescription: string;
  technicianRecommendations: string;
  serviceReportDate: string;
  serviceReportTechnician: string;
};

type EquipmentServiceReport = Pick<
  ServiceReport,
  | "appsheetReportId"
  | "reportCounter"
  | "reportNumberText"
  | "serviceDate"
  | "technicianName"
  | "rawSource"
> & {
  customer: Pick<Customer, "name"> | null;
};

type EquipmentRecord = Pick<
  ReportEquipmentItem,
  | "appsheetItemId"
  | "sourceReportId"
  | "reportCounter"
  | "equipmentNumber"
  | "equipmentType"
  | "equipmentSubtype"
  | "equipmentModel"
  | "serialNumber"
  | "compressorCategory"
  | "serviceDescription"
  | "currentHours"
  | "nextService"
  | "systemStatus"
  | "technicianRecommendations"
> & {
  serviceReport: EquipmentServiceReport | null;
};

const SOURCE_SERVICE_DATE_KEY =
  "\u05ea\u05d0\u05e8\u05d9\u05da \u05e9\u05d9\u05e8\u05d5\u05ea";

function readText(value: unknown, fallback = "") {
  if (value === undefined || value === null) {
    return fallback;
  }

  const text = String(value).trim();
  return text || fallback;
}

function readRawText(rawSource: Prisma.JsonValue, key: string, fallback = "") {
  if (!rawSource || typeof rawSource !== "object" || Array.isArray(rawSource)) {
    return fallback;
  }

  return readText((rawSource as Record<string, unknown>)[key], fallback);
}

function formatAppSheetDate(value: string) {
  if (!value) {
    return "UNKNOWN DATE";
  }

  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return value;
  }

  const wholeDays = Math.floor(numericValue);
  const utcTime = Date.UTC(1899, 11, 30) + wholeDays * 24 * 60 * 60 * 1000;

  return new Date(utcTime).toISOString().slice(0, 10);
}

function formatDate(date: Date | null | undefined, rawSource: Prisma.JsonValue) {
  if (!date) {
    return formatAppSheetDate(readRawText(rawSource, SOURCE_SERVICE_DATE_KEY));
  }

  return date.toISOString().slice(0, 10);
}

function formatReportNumber(report: EquipmentServiceReport | null) {
  if (!report) {
    return "No linked report";
  }

  return (
    readText(report.reportCounter) ||
    readText(report.reportNumberText) ||
    report.appsheetReportId
  );
}

function mapEquipmentListItem(item: EquipmentRecord): EquipmentListItem {
  return {
    id: item.appsheetItemId,
    equipmentNumber: readText(item.equipmentNumber, "No equipment number"),
    type: readText(item.equipmentType, "No type"),
    subtype: readText(item.equipmentSubtype, "No subtype"),
    model: readText(item.equipmentModel, "No model"),
    serialNumber: readText(item.serialNumber, "No serial number"),
    compressorCategory: readText(item.compressorCategory, "No category"),
    status: readText(item.systemStatus, "No status"),
    currentHours: readText(item.currentHours, "No hours"),
    serviceReportId: readText(item.serviceReport?.appsheetReportId),
    serviceReportNumber: formatReportNumber(item.serviceReport),
    customer: readText(item.serviceReport?.customer?.name, "No customer"),
  };
}

function mapEquipmentDetail(item: EquipmentRecord): EquipmentDetail {
  return {
    ...mapEquipmentListItem(item),
    sourceReportId: readText(item.sourceReportId, "No source report ID"),
    reportCounter: readText(item.reportCounter, "No report counter"),
    nextService: readText(item.nextService, "No next service"),
    serviceDescription: readText(
      item.serviceDescription,
      "No service description recorded",
    ),
    technicianRecommendations: readText(
      item.technicianRecommendations,
      "No technician recommendations recorded",
    ),
    serviceReportDate: item.serviceReport
      ? formatDate(item.serviceReport.serviceDate, item.serviceReport.rawSource)
      : "No linked report",
    serviceReportTechnician: readText(
      item.serviceReport?.technicianName,
      "No technician",
    ),
  };
}

function buildEquipmentWhere(filters: EquipmentListFilters) {
  const andFilters: Prisma.ReportEquipmentItemWhereInput[] = [];

  if (filters.query) {
    const query = filters.query;

    andFilters.push({
      OR: [
        { appsheetItemId: { contains: query, mode: "insensitive" } },
        { equipmentNumber: { contains: query, mode: "insensitive" } },
        { equipmentType: { contains: query, mode: "insensitive" } },
        { equipmentSubtype: { contains: query, mode: "insensitive" } },
        { equipmentModel: { contains: query, mode: "insensitive" } },
        { serialNumber: { contains: query, mode: "insensitive" } },
        { compressorCategory: { contains: query, mode: "insensitive" } },
        { systemStatus: { contains: query, mode: "insensitive" } },
        { sourceReportId: { contains: query, mode: "insensitive" } },
        { reportCounter: { contains: query, mode: "insensitive" } },
      ],
    });
  }

  if (filters.type) {
    andFilters.push({
      equipmentType: { contains: filters.type, mode: "insensitive" },
    });
  }

  if (filters.status) {
    andFilters.push({
      systemStatus: { contains: filters.status, mode: "insensitive" },
    });
  }

  if (filters.linked === true) {
    andFilters.push({ serviceReportId: { not: null } });
  }

  if (filters.linked === false) {
    andFilters.push({ serviceReportId: null });
  }

  return andFilters.length ? { AND: andFilters } : undefined;
}

const equipmentSelect = {
  appsheetItemId: true,
  sourceReportId: true,
  reportCounter: true,
  equipmentNumber: true,
  equipmentType: true,
  equipmentSubtype: true,
  equipmentModel: true,
  serialNumber: true,
  compressorCategory: true,
  serviceDescription: true,
  currentHours: true,
  nextService: true,
  systemStatus: true,
  technicianRecommendations: true,
  serviceReport: {
    select: {
      appsheetReportId: true,
      reportCounter: true,
      reportNumberText: true,
      serviceDate: true,
      technicianName: true,
      rawSource: true,
      customer: { select: { name: true } },
    },
  },
} satisfies Prisma.ReportEquipmentItemSelect;

export async function getEquipmentList(filters: EquipmentListFilters = {}) {
  const equipment = await prisma.reportEquipmentItem.findMany({
    where: buildEquipmentWhere(filters),
    select: equipmentSelect,
    orderBy: [
      { equipmentNumber: "asc" },
      { equipmentModel: "asc" },
      { appsheetItemId: "asc" },
    ],
  });

  return equipment.map(mapEquipmentListItem);
}

export async function getEquipmentById(id: string) {
  const item = await prisma.reportEquipmentItem.findUnique({
    where: { appsheetItemId: id },
    select: equipmentSelect,
  });

  return item ? mapEquipmentDetail(item) : undefined;
}
