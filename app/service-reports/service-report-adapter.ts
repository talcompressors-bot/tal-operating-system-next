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
  lifecycle: LifecycleState;
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

  return {
    id: item.appsheetItemId,
    equipmentNumber: readText(item.equipmentNumber, "No equipment number"),
    type: readText(item.equipmentType, "No equipment type"),
    model,
    serialNumber,
    status: readText(item.systemStatus, "UNKNOWN STATUS"),
    notes:
      readText(item.technicianRecommendations) ||
      readText(item.serviceDescription) ||
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

function mapServiceReport(
  report: ServiceReportWithWave1Relations,
): ServiceReportView {
  const status = normalizeStatus(report.status, report.sourceStatusText);
  const customerSummary = mapCustomerSummary(report.customer);

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
    equipment: report.equipmentItems.map(mapEquipmentRow),
    lifecycle: mapLifecycle(report),
  };
}

export async function getServiceReportList() {
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

  return serviceReports.map(mapServiceReport);
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
