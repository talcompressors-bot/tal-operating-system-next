import snapshot from "./snapshot/service-reports.snapshot.json";

type SnapshotRow = Record<string, unknown>;

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

type ServiceReport = {
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

const customers = snapshot.customers as SnapshotRow[];
const serviceReportRows = snapshot.serviceReports as SnapshotRow[];
const equipmentRows = snapshot.reportEquipmentItems as SnapshotRow[];

function readText(row: SnapshotRow | undefined, fields: string[]) {
  if (!row) {
    return "";
  }

  for (const field of fields) {
    const value = row[field];

    if (value !== undefined && value !== null) {
      const text = String(value).trim();

      if (text) {
        return text;
      }
    }
  }

  return "";
}

function normalizeStatus(status: string): ServiceReportStatus {
  const cleanStatus = status.trim().toLowerCase();

  if (cleanStatus === "open") return "Open";
  if (cleanStatus === "signed") return "Signed";
  if (cleanStatus === "sent") return "Sent";
  if (cleanStatus === "closed") return "Closed";

  return "UNKNOWN";
}

function findCustomer(customerId: string) {
  return customers.find(
    (customer) => readText(customer, ["CustomerID"]) === customerId,
  );
}

function findEquipmentRows(reportId: string) {
  return equipmentRows.filter(
    (item) => readText(item, ["ReportID"]) === reportId,
  );
}

function mapEquipmentRow(item: SnapshotRow): EquipmentRow {
  return {
    id: readText(item, ["ItemID"]) || "unknown-equipment",
    equipmentNumber:
      readText(item, ["מספר ציוד"]) || "UNKNOWN EQUIPMENT",
    type: readText(item, ["סוג ציוד"]),
    model: readText(item, ["דגם הציוד"]),
    serialNumber: readText(item, ["מס סידורי"]),
    status: readText(item, ["מצב מערכת"]) || "UNKNOWN",
    notes:
      readText(item, ["סיכום והמלצות טכנאי"]) ||
      readText(item, ["תיאור השירות"]),
  };
}

function mapServiceReport(row: SnapshotRow): ServiceReport {
  const reportId = readText(row, ["ReportID"]);
  const customerId = readText(row, ["CustomerID"]);
  const customer = findCustomer(customerId);

  return {
    id: reportId || "unknown-report",
    reportNumber:
      readText(row, ["ReportCounter"]) ||
      readText(row, ["מספר דוח"]) ||
      reportId ||
      "UNKNOWN",
    customer:
      readText(customer, ["שם לקוח"]) ||
      readText(row, ["שם לקוח"]) ||
      "UNKNOWN CUSTOMER",
    serviceDate: readText(row, ["תאריך שירות"]),
    technician: readText(row, ["טכנאי"]) || "UNKNOWN TECHNICIAN",
    status: normalizeStatus(readText(row, ["סטטוס דוח"])),
    description: readText(row, ["תיאור השירות"]),
    recommendations:
      readText(row, ["המלצות ללקוח"]) ||
      readText(row, ["סיכום טכנאי"]),
    equipment: findEquipmentRows(reportId).map(mapEquipmentRow),
  };
}

const serviceReports = serviceReportRows.map(mapServiceReport);

export function getServiceReportList() {
  return serviceReports;
}

export function getServiceReportById(id: string) {
  return serviceReports.find((report) => report.id === id);
}

export function getServiceReportStaticParams() {
  return serviceReports.map((report) => ({
    id: report.id,
  }));
}
