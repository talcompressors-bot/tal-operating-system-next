import type { Customer, Prisma, ReportEquipmentItem, ServiceReport } from "@prisma/client";
import { prisma } from "../../lib/prisma";

type ServiceReportStatus =
  | "Open"
  | "Pending Signature"
  | "Signed"
  | "Sent"
  | "Closed"
  | "Status Missing";

type EquipmentRow = {
  id: string;
  equipmentNumber: string;
  type: string;
  model: string;
  serialNumber: string;
  status: string;
  serviceDescription: string;
  notes: string;
  subtitle: string;
};

type CustomerSummary = {
  id: string;
  name: string;
  contactName: string;
  phonePrimary: string;
  emailPrimary: string;
  address: string;
};

type LifecycleState = {
  businessDraft: string;
  maven: string;
  customerViewed: string;
};

type ScrPreviewLine = {
  lineType: "Part" | "Labor" | "Visit";
  suggestedSku: string;
  description: string;
  quantity: string;
  confidence: number;
  priceSource: string;
  needsPriceApproval: boolean;
};

type ScrMatchingPreview = {
  available: boolean;
  detectedModel: string;
  serviceType: string;
  status: string;
  lines: ScrPreviewLine[];
};

export type ServiceReportView = {
  id: string;
  reportNumber: string;
  customer: string;
  customerSummary: CustomerSummary;
  serviceDate: string;
  technician: string;
  status: ServiceReportStatus;
  statusClassName: string;
  description: string;
  recommendations: string;
  equipment: EquipmentRow[];
  equipmentCue: string;
  lifecycle: LifecycleState;
  scrMatchingPreview: ScrMatchingPreview;
};

export type ServiceReportListFilters = {
  query?: string;
  status?: string;
  customer?: string;
  hasEquipment?: boolean;
};

type ServiceReportFilterOption = {
  value: string;
  label: string;
};

type ServiceReportWithWave1Relations = ServiceReport & {
  customer:
    | Pick<
        Customer,
        | "appsheetCustomerId"
        | "name"
        | "contactName"
        | "phonePrimary"
        | "emailPrimary"
        | "address"
      >
    | null;
  equipmentItems: ReportEquipmentItem[];
};

const SOURCE_STATUS_SIGNED = "\u05d7\u05ea\u05d5\u05dd";
const SOURCE_STATUS_PENDING_SIGNATURE =
  "\u05de\u05de\u05ea\u05d9\u05df \u05d7\u05ea\u05d9\u05de\u05d4";
const SOURCE_SERVICE_DATE_KEY =
  "\u05ea\u05d0\u05e8\u05d9\u05da \u05e9\u05d9\u05e8\u05d5\u05ea";
const SOURCE_EXTRA_PARTS_KEY =
  "\u05d7\u05dc\u05e4\u05d9\u05dd \u05e0\u05d5\u05e1\u05e4\u05d9\u05dd";

function normalizeStatus(
  status: ServiceReport["status"],
  sourceStatusText: string | null,
): ServiceReportStatus {
  const cleanStatus = status.trim().toLowerCase();
  const cleanSourceStatus = readText(sourceStatusText).toLowerCase();

  if (cleanStatus === "open") return "Open";
  if (cleanStatus === "signed") return "Signed";
  if (cleanStatus === "sent") return "Sent";
  if (cleanStatus === "closed") return "Closed";
  if (cleanSourceStatus === SOURCE_STATUS_SIGNED) return "Signed";
  if (cleanSourceStatus === SOURCE_STATUS_PENDING_SIGNATURE) {
    return "Pending Signature";
  }

  return "Status Missing";
}

function statusClassName(status: ServiceReportStatus) {
  return status.toLowerCase().replaceAll(" ", "-");
}

function formatDate(date: Date | null, rawSource: Prisma.JsonValue) {
  if (!date) {
    return formatAppSheetDate(readRawText(rawSource, SOURCE_SERVICE_DATE_KEY));
  }

  return date.toISOString().slice(0, 10);
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

function mapEquipmentRow(item: ReportEquipmentItem): EquipmentRow {
  const model = readText(item.equipmentModel, "No model");
  const serialNumber = readText(item.serialNumber, "No serial number");
  const serviceDescription = readText(item.serviceDescription);

  return {
    id: item.appsheetItemId,
    equipmentNumber: readText(item.equipmentNumber, "No equipment number"),
    type: readText(item.equipmentType, "No equipment type"),
    model,
    serialNumber,
    status: readText(item.systemStatus, "UNKNOWN STATUS"),
    serviceDescription,
    notes:
      readText(item.technicianRecommendations) ||
      serviceDescription ||
      readRawText(item.rawSource, SOURCE_EXTRA_PARTS_KEY) ||
      "No notes recorded",
    subtitle: `${model} - Serial ${serialNumber}`,
  };
}

function mapCustomerSummary(
  customer: ServiceReportWithWave1Relations["customer"],
): CustomerSummary {
  return {
    id: readText(customer?.appsheetCustomerId),
    name: readText(customer?.name, "UNKNOWN CUSTOMER"),
    contactName: readText(customer?.contactName, "No contact"),
    phonePrimary: readText(customer?.phonePrimary, "No phone"),
    emailPrimary: readText(customer?.emailPrimary, "No email"),
    address: readText(customer?.address, "No address"),
  };
}

function mapLifecycle(report: ServiceReportWithWave1Relations): LifecycleState {
  return {
    businessDraft: report.businessDraftCreated
      ? "Business draft created"
      : "Draft not created",
    maven: report.mavenSentToCustomer ? "Maven sent" : "Maven not sent",
    customerViewed: "Customer not viewed",
  };
}

function buildEquipmentCue(equipment: EquipmentRow[]) {
  if (!equipment.length) {
    return "No equipment linked";
  }

  const visibleEquipment = equipment
    .slice(0, 2)
    .map((item) => `${item.equipmentNumber} / ${item.model}`);
  const remainingCount = equipment.length - visibleEquipment.length;

  if (remainingCount > 0) {
    visibleEquipment.push(`+${remainingCount} more`);
  }

  return visibleEquipment.join(", ");
}

function normalizeScrModel(model: string) {
  const normalizedModel = model.toUpperCase().replace(/[^A-Z0-9]/g, "");

  if (!normalizedModel.includes("SCR")) {
    return "";
  }

  return normalizedModel.replace(/^SCR/, "");
}

function hasSmallServiceEvidence(item: EquipmentRow) {
  const evidence =
    `${item.serviceDescription} ${item.notes} ${item.subtitle}`.toLowerCase();

  return evidence.includes("2000") || evidence.includes("small");
}

function buildScrMatchingPreview(equipment: EquipmentRow[]): ScrMatchingPreview {
  const scrEquipment = equipment.filter((item) => normalizeScrModel(item.model));

  if (!scrEquipment.length) {
    return {
      available: false,
      detectedModel: "No SCR compressor detected",
      serviceType: "Unavailable",
      status: "No SCR PM/EPM matching source applies to this report.",
      lines: [],
    };
  }

  const modelCounts = new Map<string, EquipmentRow[]>();

  scrEquipment.forEach((item) => {
    const model = normalizeScrModel(item.model);
    const existingItems = modelCounts.get(model) ?? [];
    existingItems.push(item);
    modelCounts.set(model, existingItems);
  });

  const [detectedModel, matchingItems] =
    Array.from(modelCounts.entries()).find(
      ([model, items]) => model === "40PM" && items.some(hasSmallServiceEvidence),
    ) ?? Array.from(modelCounts.entries())[0];

  if (detectedModel !== "40PM" || !matchingItems.some(hasSmallServiceEvidence)) {
    return {
      available: false,
      detectedModel: detectedModel ? `SCR-${detectedModel}` : "SCR model detected",
      serviceType: "Needs review",
      status:
        "SCR equipment was detected, but this report does not match the documented 40PM 2000H preview evidence yet.",
      lines: [],
    };
  }

  const quantity = String(matchingItems.length);

  return {
    available: true,
    detectedModel: "SCR-40PM",
    serviceType: "2000-hour small periodic compressor service",
    status:
      "Read-only preview from SCR matching reports; parts remain price-approval required.",
    lines: [
      {
        lineType: "Part",
        suggestedSku: "25200007-005",
        description: "Oil Filter for SCR-40PM 2000H service",
        quantity,
        confidence: 78,
        priceSource:
          "Vendor purchase evidence only; Products/Maven historical selling price unavailable",
        needsPriceApproval: true,
      },
      {
        lineType: "Part",
        suggestedSku: "25100043-071",
        description: "Air filter core for SCR-40PM 2000H service",
        quantity,
        confidence: 78,
        priceSource:
          "Vendor purchase evidence only; Products/Maven historical selling price unavailable",
        needsPriceApproval: true,
      },
      {
        lineType: "Visit",
        suggestedSku: "N/A",
        description: "Technician visit",
        quantity: "1",
        confidence: 100,
        priceSource: "Fixed rule: 300 NIS",
        needsPriceApproval: false,
      },
      {
        lineType: "Labor",
        suggestedSku: "N/A",
        description: "Technician labor",
        quantity: "Missing hours",
        confidence: 50,
        priceSource: "Fixed rule: 275 NIS/hour, quantity missing",
        needsPriceApproval: true,
      },
    ],
  };
}

function mapServiceReport(
  report: ServiceReportWithWave1Relations,
): ServiceReportView {
  const status = normalizeStatus(report.status, report.sourceStatusText);
  const customerSummary = mapCustomerSummary(report.customer);
  const equipment = report.equipmentItems.map(mapEquipmentRow);

  return {
    id: report.appsheetReportId,
    reportNumber:
      readText(report.reportCounter) ||
      readText(report.reportNumberText) ||
      report.appsheetReportId,
    customer: customerSummary.name,
    customerSummary,
    serviceDate: formatDate(report.serviceDate, report.rawSource),
    technician: readText(report.technicianName, "UNKNOWN TECHNICIAN"),
    status,
    statusClassName: statusClassName(status),
    description: readText(
      report.serviceDescription,
      "No service description recorded",
    ),
    recommendations:
      readText(report.recommendations) ||
      readText(report.technicianSummary) ||
      "No recommendations recorded",
    equipment,
    equipmentCue: buildEquipmentCue(equipment),
    lifecycle: mapLifecycle(report),
    scrMatchingPreview: buildScrMatchingPreview(equipment),
  };
}

function includesSearchText(report: ServiceReportView, query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return true;
  }

  const searchText = [
    report.id,
    report.reportNumber,
    report.customer,
    report.technician,
    ...report.equipment.flatMap((item) => [
      item.equipmentNumber,
      item.type,
      item.model,
      item.serialNumber,
    ]),
  ]
    .join(" ")
    .toLowerCase();

  return searchText.includes(normalizedQuery);
}

function matchesFilters(
  report: ServiceReportView,
  filters: ServiceReportListFilters,
) {
  if (filters.query && !includesSearchText(report, filters.query)) {
    return false;
  }

  if (filters.status && report.status !== filters.status) {
    return false;
  }

  if (
    filters.customer &&
    report.customerSummary.id !== filters.customer &&
    report.customer !== filters.customer
  ) {
    return false;
  }

  if (
    filters.hasEquipment !== undefined &&
    (report.equipment.length > 0) !== filters.hasEquipment
  ) {
    return false;
  }

  return true;
}

function uniqueOptions(options: ServiceReportFilterOption[]) {
  const seenValues = new Set<string>();

  return options.filter((option) => {
    if (!option.value || seenValues.has(option.value)) {
      return false;
    }

    seenValues.add(option.value);
    return true;
  });
}

function buildFilterOptions(serviceReports: ServiceReportView[]) {
  return {
    statuses: uniqueOptions(
      serviceReports.map((report) => ({
        value: report.status,
        label: report.status,
      })),
    ),
    customers: uniqueOptions(
      serviceReports
        .map((report) => ({
          value: report.customerSummary.id || report.customer,
          label: report.customer,
        }))
        .sort((left, right) => left.label.localeCompare(right.label)),
    ),
  };
}

export async function getServiceReportList(
  filters: ServiceReportListFilters = {},
) {
  const serviceReports = await prisma.serviceReport.findMany({
    include: {
      customer: {
        select: {
          appsheetCustomerId: true,
          name: true,
          contactName: true,
          phonePrimary: true,
          emailPrimary: true,
          address: true,
        },
      },
      equipmentItems: {
        orderBy: [{ equipmentNumber: "asc" }, { appsheetItemId: "asc" }],
      },
    },
    orderBy: [{ reportCounter: "desc" }, { appsheetReportId: "asc" }],
  });

  const mappedServiceReports = serviceReports.map(mapServiceReport);

  return {
    filterOptions: buildFilterOptions(mappedServiceReports),
    serviceReports: mappedServiceReports.filter((report) =>
      matchesFilters(report, filters),
    ),
  };
}

export async function getServiceReportById(id: string) {
  const report = await prisma.serviceReport.findUnique({
    where: { appsheetReportId: id },
    include: {
      customer: {
        select: {
          appsheetCustomerId: true,
          name: true,
          contactName: true,
          phonePrimary: true,
          emailPrimary: true,
          address: true,
        },
      },
      equipmentItems: {
        orderBy: [{ equipmentNumber: "asc" }, { appsheetItemId: "asc" }],
      },
    },
  });

  return report ? mapServiceReport(report) : undefined;
}
