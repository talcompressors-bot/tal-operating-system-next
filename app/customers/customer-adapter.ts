import type { Customer, Prisma, ServiceReport } from "@prisma/client";
import { prisma } from "../../lib/prisma";

type CustomerStatus = "Active" | "Inactive";

type CustomerServiceReportRow = {
  id: string;
  reportNumber: string;
  serviceDate: string;
  technician: string;
  status: string;
  statusClassName: string;
};

export type CustomerListFilters = {
  query?: string;
  active?: boolean;
  hasReports?: boolean;
};

export type CustomerListItem = {
  id: string;
  name: string;
  contactName: string;
  phonePrimary: string;
  emailPrimary: string;
  businessId: string;
  status: CustomerStatus;
  statusClassName: string;
  serviceReportCount: number;
};

export type CustomerDetail = CustomerListItem & {
  address: string;
  serviceReports: CustomerServiceReportRow[];
  futureLinks: {
    businessDocuments: number;
    aiDrafts: number;
    mavenDocuments: number;
  };
};

type CustomerListRecord = Pick<
  Customer,
  | "appsheetCustomerId"
  | "name"
  | "contactName"
  | "phonePrimary"
  | "emailPrimary"
  | "businessId"
  | "isActive"
> & {
  _count: {
    serviceReports: number;
  };
};

type CustomerDetailRecord = CustomerListRecord &
  Pick<Customer, "address"> & {
    _count: CustomerListRecord["_count"] & {
      businessDocuments: number;
      aiDraftSuggestions: number;
      mavenDocuments: number;
    };
    serviceReports: Pick<
      ServiceReport,
      | "appsheetReportId"
      | "reportCounter"
      | "reportNumberText"
      | "serviceDate"
      | "technicianName"
      | "status"
      | "sourceStatusText"
      | "rawSource"
    >[];
  };

const SOURCE_STATUS_SIGNED = "\u05d7\u05ea\u05d5\u05dd";
const SOURCE_STATUS_PENDING_SIGNATURE =
  "\u05de\u05de\u05ea\u05d9\u05df \u05d7\u05ea\u05d9\u05de\u05d4";
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

function statusClassName(status: string) {
  return status.toLowerCase().replaceAll(" ", "-");
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

function formatDate(date: Date | null, rawSource: Prisma.JsonValue) {
  if (!date) {
    return formatAppSheetDate(readRawText(rawSource, SOURCE_SERVICE_DATE_KEY));
  }

  return date.toISOString().slice(0, 10);
}

function normalizeServiceReportStatus(
  status: ServiceReport["status"],
  sourceStatusText: string | null,
) {
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

function mapCustomerListItem(customer: CustomerListRecord): CustomerListItem {
  const status = customer.isActive ? "Active" : "Inactive";

  return {
    id: customer.appsheetCustomerId,
    name: readText(customer.name, "UNKNOWN CUSTOMER"),
    contactName: readText(customer.contactName, "No contact"),
    phonePrimary: readText(customer.phonePrimary, "No phone"),
    emailPrimary: readText(customer.emailPrimary, "No email"),
    businessId: readText(customer.businessId, "No business ID"),
    status,
    statusClassName: customer.isActive ? "signed" : "closed",
    serviceReportCount: customer._count.serviceReports,
  };
}

function mapServiceReportRow(
  report: CustomerDetailRecord["serviceReports"][number],
): CustomerServiceReportRow {
  const status = normalizeServiceReportStatus(
    report.status,
    report.sourceStatusText,
  );

  return {
    id: report.appsheetReportId,
    reportNumber:
      readText(report.reportCounter) ||
      readText(report.reportNumberText) ||
      report.appsheetReportId,
    serviceDate: formatDate(report.serviceDate, report.rawSource),
    technician: readText(report.technicianName, "UNKNOWN TECHNICIAN"),
    status,
    statusClassName: statusClassName(status),
  };
}

function mapCustomerDetail(customer: CustomerDetailRecord): CustomerDetail {
  return {
    ...mapCustomerListItem(customer),
    address: readText(customer.address, "No address"),
    serviceReports: customer.serviceReports.map(mapServiceReportRow),
    futureLinks: {
      businessDocuments: customer._count.businessDocuments,
      aiDrafts: customer._count.aiDraftSuggestions,
      mavenDocuments: customer._count.mavenDocuments,
    },
  };
}

function buildCustomerWhere(filters: CustomerListFilters) {
  const andFilters: Prisma.CustomerWhereInput[] = [];

  if (filters.query) {
    const query = filters.query;

    andFilters.push({
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { contactName: { contains: query, mode: "insensitive" } },
        { phonePrimary: { contains: query, mode: "insensitive" } },
        { emailPrimary: { contains: query, mode: "insensitive" } },
        { businessId: { contains: query, mode: "insensitive" } },
        { appsheetCustomerId: { contains: query, mode: "insensitive" } },
      ],
    });
  }

  if (filters.active !== undefined) {
    andFilters.push({ isActive: filters.active });
  }

  if (filters.hasReports === true) {
    andFilters.push({ serviceReports: { some: {} } });
  }

  if (filters.hasReports === false) {
    andFilters.push({ serviceReports: { none: {} } });
  }

  return andFilters.length ? { AND: andFilters } : undefined;
}

export async function getCustomerList(filters: CustomerListFilters = {}) {
  const customers = await prisma.customer.findMany({
    where: buildCustomerWhere(filters),
    select: {
      appsheetCustomerId: true,
      name: true,
      contactName: true,
      phonePrimary: true,
      emailPrimary: true,
      businessId: true,
      isActive: true,
      _count: {
        select: {
          serviceReports: true,
        },
      },
    },
    orderBy: [{ name: "asc" }, { appsheetCustomerId: "asc" }],
  });

  return customers.map(mapCustomerListItem);
}

export async function getCustomerById(id: string) {
  const customer = await prisma.customer.findUnique({
    where: { appsheetCustomerId: id },
    select: {
      appsheetCustomerId: true,
      name: true,
      contactName: true,
      phonePrimary: true,
      emailPrimary: true,
      address: true,
      businessId: true,
      isActive: true,
      _count: {
        select: {
          serviceReports: true,
          businessDocuments: true,
          aiDraftSuggestions: true,
          mavenDocuments: true,
        },
      },
      serviceReports: {
        select: {
          appsheetReportId: true,
          reportCounter: true,
          reportNumberText: true,
          serviceDate: true,
          technicianName: true,
          status: true,
          sourceStatusText: true,
          rawSource: true,
        },
        orderBy: [{ serviceDate: "desc" }, { reportCounter: "desc" }],
      },
    },
  });

  return customer ? mapCustomerDetail(customer) : undefined;
}
