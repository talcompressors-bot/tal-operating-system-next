import type { Customer, Prisma, ServiceReport } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import {
  getBusinessCaseList,
  type BusinessCaseViewModel,
} from "../business-cases/business-case-runtime";

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

type Customer360Asset = {
  id: string;
  label: string;
  model: string;
  serialNumber: string;
  status: string;
  href: string;
  openCaseCount: number;
};

type Customer360BusinessCase = {
  id: string;
  title: string;
  href: string;
  serviceStatus: string;
  commercialStatus: string;
  financialStatus: string;
  approvalStatus: string;
  automationStatus: string;
  currentBlocker: string;
  nextAction: string;
};

type Customer360CommercialDocument = {
  id: string;
  title: string;
  href: string;
  stage: string;
  approvalStatus: string;
  financialStatus: string;
  totalAmount: string;
};

type Customer360TimelineEvent = {
  label: string;
  status: string;
  href: string;
};

export type Customer360Workspace = CustomerDetail & {
  boundary: string;
  summary: {
    activeBusinessCases: number;
    affectedAssets: number;
    openCommercialDocuments: number;
    blockerCount: number;
  };
  assets: Customer360Asset[];
  openBusinessCases: Customer360BusinessCase[];
  openCommercialDocuments: Customer360CommercialDocument[];
  financialStatus: {
    status: string;
    summary: string;
    openItems: Array<{
      label: string;
      amount: string;
      href: string;
    }>;
  };
  currentBlockers: Array<{
    domain: string;
    message: string;
    href: string;
  }>;
  recommendedNextAction: {
    label: string;
    reason: string;
    href: string;
  };
  recentTimeline: Customer360TimelineEvent[];
  futureOpportunities: Array<{
    label: string;
    reason: string;
    href: string;
  }>;
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

function caseHref(businessCase: BusinessCaseViewModel) {
  return `/business-cases/service-report/${businessCase.source.id}`;
}

function currentBlocker(businessCase: BusinessCaseViewModel) {
  const blocker = businessCase.blockers[0];

  return blocker ? `${blocker.domain}: ${blocker.message}` : "No blocker";
}

function isOpenBusinessCase(businessCase: BusinessCaseViewModel) {
  return (
    businessCase.service.status !== "Closed" ||
    businessCase.blockers.length > 0 ||
    businessCase.financial.status !== "Not started" ||
    businessCase.commercial.status !== "No document"
  );
}

function recommendedCaseAction(businessCase: BusinessCaseViewModel) {
  if (businessCase.blockers.length) {
    return `Review blocker: ${currentBlocker(businessCase)}`;
  }

  if (businessCase.approval.status === "Needs review") {
    return "Complete internal approval review.";
  }

  if (
    businessCase.financial.status !== "Not started" &&
    businessCase.financial.status !== "No payment required"
  ) {
    return "Review financial intake and draft receipt status.";
  }

  if (businessCase.automation.status !== "No command") {
    return "Review automation command before any external action.";
  }

  if (businessCase.commercial.status === "No document") {
    return "Prepare the next commercial step for this customer.";
  }

  if (businessCase.closureReadiness.ready) {
    return "Review closure readiness.";
  }

  return "Open the BusinessCase and decide the next owner.";
}

function mapCustomer360Assets(businessCases: BusinessCaseViewModel[]) {
  const assets = new Map<string, Customer360Asset>();

  businessCases.forEach((businessCase) => {
    businessCase.assets.forEach((asset) => {
      const existingAsset = assets.get(asset.id);

      assets.set(asset.id, {
        id: asset.id,
        label: asset.label,
        model: asset.model,
        serialNumber: asset.serialNumber,
        status: asset.status,
        href: asset.href,
        openCaseCount:
          (existingAsset?.openCaseCount ?? 0) +
          (isOpenBusinessCase(businessCase) ? 1 : 0),
      });
    });
  });

  return Array.from(assets.values());
}

function mapOpenBusinessCases(businessCases: BusinessCaseViewModel[]) {
  return businessCases.filter(isOpenBusinessCase).map((businessCase) => ({
    id: businessCase.id,
    title: businessCase.title,
    href: caseHref(businessCase),
    serviceStatus: businessCase.service.status,
    commercialStatus: businessCase.commercial.status,
    financialStatus: businessCase.financial.status,
    approvalStatus: businessCase.approval.status,
    automationStatus: businessCase.automation.status,
    currentBlocker: currentBlocker(businessCase),
    nextAction: recommendedCaseAction(businessCase),
  }));
}

function mapOpenCommercialDocuments(businessCases: BusinessCaseViewModel[]) {
  const documents = new Map<string, Customer360CommercialDocument>();

  businessCases.forEach((businessCase) => {
    businessCase.commercial.documents.forEach((document) => {
      documents.set(document.id, {
        id: document.id,
        title: document.title,
        href: `/business-documents/${document.id}`,
        stage: document.commercialLifecycle.currentStage.label,
        approvalStatus: document.approvalStatus,
        financialStatus: document.financialIntake.status,
        totalAmount: document.viewModel.totals.totalAmount,
      });
    });
  });

  return Array.from(documents.values()).filter(
    (document) => document.stage !== "Closed",
  );
}

function buildFinancialStatus(
  commercialDocuments: Customer360CommercialDocument[],
) {
  const openItems = commercialDocuments
    .filter((document) => document.financialStatus !== "No payment required")
    .map((document) => ({
      label: document.title,
      amount: document.totalAmount,
      href: document.href,
    }));

  if (!commercialDocuments.length) {
    return {
      status: "Not started",
      summary: "No commercial document is linked to this customer yet.",
      openItems,
    };
  }

  if (openItems.length) {
    return {
      status: "Open financial action",
      summary: `${openItems.length} document(s) have financial intake, draft receipt, or payment-review work visible.`,
      openItems,
    };
  }

  return {
    status: "No open financial action",
    summary: "No open financial action is visible from current internal runtime.",
    openItems,
  };
}

function mapCurrentBlockers(businessCases: BusinessCaseViewModel[]) {
  return businessCases.flatMap((businessCase) =>
    businessCase.blockers.map((blocker) => ({
      domain: blocker.domain,
      message: blocker.message,
      href: caseHref(businessCase),
    })),
  );
}

function buildRecommendedNextAction(
  businessCases: BusinessCaseViewModel[],
  blockers: Customer360Workspace["currentBlockers"],
  commercialDocuments: Customer360CommercialDocument[],
) {
  const firstBlockedCase = businessCases.find((businessCase) =>
    businessCase.blockers.length,
  );

  if (firstBlockedCase) {
    return {
      label: recommendedCaseAction(firstBlockedCase),
      reason: "A current blocker is preventing this customer journey from moving forward.",
      href: caseHref(firstBlockedCase),
    };
  }

  const firstFinancialCase = businessCases.find(
    (businessCase) =>
      businessCase.financial.status !== "Not started" &&
      businessCase.financial.status !== "No payment required",
  );

  if (firstFinancialCase) {
    return {
      label: recommendedCaseAction(firstFinancialCase),
      reason: "Financial intake or receipt draft work is visible for this customer.",
      href: caseHref(firstFinancialCase),
    };
  }

  const firstCommercialDocument = commercialDocuments[0];

  if (firstCommercialDocument) {
    return {
      label: "Open the commercial document and review the next lifecycle step.",
      reason: "A commercial document exists and may need approval, external-adapter review, or financial follow-up.",
      href: firstCommercialDocument.href,
    };
  }

  const firstOpenCase = businessCases.find(isOpenBusinessCase);

  if (firstOpenCase) {
    return {
      label: recommendedCaseAction(firstOpenCase),
      reason: "An open BusinessCase exists for this customer.",
      href: caseHref(firstOpenCase),
    };
  }

  return {
    label: "No immediate action found.",
    reason: blockers.length
      ? "Blocker data exists but no matching BusinessCase action was found."
      : "Current runtime does not show an active BusinessCase, financial action, or commercial document.",
    href: "",
  };
}

function buildRecentTimeline(businessCases: BusinessCaseViewModel[]) {
  return businessCases
    .flatMap((businessCase) => businessCase.timeline)
    .slice(0, 10);
}

function buildFutureOpportunities(businessCases: BusinessCaseViewModel[]) {
  return businessCases.flatMap((businessCase) => {
    const opportunities: Customer360Workspace["futureOpportunities"] = [];

    if (businessCase.aiRecommendation.status === "Available") {
      opportunities.push({
        label: "AI recommendation available",
        reason: businessCase.aiRecommendation.summary,
        href: businessCase.aiRecommendation.href,
      });
    }

    if (businessCase.inventory.status !== "Placeholder") {
      opportunities.push({
        label: "Parts follow-up opportunity",
        reason: businessCase.inventory.summary,
        href: businessCase.inventory.href,
      });
    }

    if (businessCase.commercial.status === "No document") {
      opportunities.push({
        label: "Commercial follow-up opportunity",
        reason: "This customer has a BusinessCase without a linked BusinessDocument.",
        href: caseHref(businessCase),
      });
    }

    return opportunities;
  });
}

function buildCustomer360Workspace(
  customer: CustomerDetail,
  allBusinessCases: BusinessCaseViewModel[],
): Customer360Workspace {
  const businessCases = allBusinessCases.filter(
    (businessCase) => businessCase.party.id === customer.id,
  );
  const assets = mapCustomer360Assets(businessCases);
  const openBusinessCases = mapOpenBusinessCases(businessCases);
  const openCommercialDocuments = mapOpenCommercialDocuments(businessCases);
  const currentBlockers = mapCurrentBlockers(businessCases);

  return {
    ...customer,
    boundary:
      "Customer 360 is a read-only projection over existing Party, Asset, BusinessCase, Service Operations, Commercial, Financial, Approval, Automation, and Timeline runtime. It does not create a CRM engine, duplicate BusinessCase, or execute workflow actions.",
    summary: {
      activeBusinessCases: openBusinessCases.length,
      affectedAssets: assets.length,
      openCommercialDocuments: openCommercialDocuments.length,
      blockerCount: currentBlockers.length,
    },
    assets,
    openBusinessCases,
    openCommercialDocuments,
    financialStatus: buildFinancialStatus(openCommercialDocuments),
    currentBlockers,
    recommendedNextAction: buildRecommendedNextAction(
      businessCases,
      currentBlockers,
      openCommercialDocuments,
    ),
    recentTimeline: buildRecentTimeline(businessCases),
    futureOpportunities: buildFutureOpportunities(businessCases),
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

export async function getCustomer360ById(id: string) {
  const [customer, businessCases] = await Promise.all([
    getCustomerById(id),
    getBusinessCaseList(),
  ]);

  if (!customer) {
    return undefined;
  }

  return buildCustomer360Workspace(customer, businessCases);
}
