import type { ReportEquipmentItem, ServiceReport } from "@prisma/client";
import { prisma } from "../../lib/prisma";

type ServiceReportStatus = "Open" | "Signed" | "Sent" | "Closed" | "UNKNOWN";

type EquipmentRow = {
  id: string;
  equipmentNumber: string;
  type: string;
  model: string;
  serialNumber: string;
  status: string;
  notes: string;
};

export type ServiceReportView = {
  id: string;
  reportNumber: string;
  customer: string;
  serviceDate: string;
  technician: string;
  status: ServiceReportStatus;
  description: string;
  recommendations: string;
  equipment: EquipmentRow[];
};

type ServiceReportWithWave1Relations = ServiceReport & {
  customer: { name: string } | null;
  equipmentItems: ReportEquipmentItem[];
};

function normalizeStatus(status: string): ServiceReportStatus {
  const cleanStatus = status.trim().toLowerCase();

  if (cleanStatus === "open") return "Open";
  if (cleanStatus === "signed") return "Signed";
  if (cleanStatus === "sent") return "Sent";
  if (cleanStatus === "closed") return "Closed";

  return "UNKNOWN";
}

function formatDate(date: Date | null) {
  if (!date) {
    return "";
  }

  return date.toISOString().slice(0, 10);
}

function readText(value: unknown, fallback = "") {
  if (value === undefined || value === null) {
    return fallback;
  }

  const text = String(value).trim();
  return text || fallback;
}

function mapEquipmentRow(item: ReportEquipmentItem): EquipmentRow {
  return {
    id: item.appsheetItemId,
    equipmentNumber: readText(item.equipmentNumber, "UNKNOWN EQUIPMENT"),
    type: readText(item.equipmentType),
    model: readText(item.equipmentModel),
    serialNumber: readText(item.serialNumber),
    status: readText(item.systemStatus, "UNKNOWN"),
    notes: readText(item.technicianRecommendations) || readText(item.serviceDescription),
  };
}

function mapServiceReport(report: ServiceReportWithWave1Relations): ServiceReportView {
  return {
    id: report.appsheetReportId,
    reportNumber:
      readText(report.reportCounter) ||
      readText(report.reportNumberText) ||
      report.appsheetReportId,
    customer: readText(report.customer?.name, "UNKNOWN CUSTOMER"),
    serviceDate: formatDate(report.serviceDate),
    technician: readText(report.technicianName, "UNKNOWN TECHNICIAN"),
    status: normalizeStatus(report.status),
    description: readText(report.serviceDescription),
    recommendations: readText(report.recommendations) || readText(report.technicianSummary),
    equipment: report.equipmentItems.map(mapEquipmentRow),
  };
}

export async function getServiceReportList() {
  const serviceReports = await prisma.serviceReport.findMany({
    include: {
      customer: { select: { name: true } },
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
      customer: { select: { name: true } },
      equipmentItems: {
        orderBy: [{ equipmentNumber: "asc" }, { appsheetItemId: "asc" }],
      },
    },
  });

  return report ? mapServiceReport(report) : undefined;
}
