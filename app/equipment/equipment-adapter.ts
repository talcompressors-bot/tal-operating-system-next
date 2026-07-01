import type {
  BusinessDocument,
  Customer,
  Prisma,
  ReportEquipmentItem,
  ServiceReport,
} from "@prisma/client";
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
  assetIntelligence: AssetIntelligence;
};

type EquipmentDetailBase = Omit<EquipmentDetail, "assetIntelligence">;

type EquipmentServiceReport = Pick<
  ServiceReport,
  | "appsheetReportId"
  | "reportCounter"
  | "reportNumberText"
  | "serviceDate"
  | "technicianName"
  | "serviceDescription"
  | "recommendations"
  | "status"
  | "sourceStatusText"
  | "rawSource"
> & {
  customer: Pick<Customer, "appsheetCustomerId" | "name"> | null;
  businessDocuments: Array<
    Pick<
      BusinessDocument,
      | "appsheetBusinessDocumentId"
      | "draftTitle"
      | "documentTypeSelected"
      | "status"
      | "approvalStatus"
      | "totalAmount"
      | "currency"
    >
  >;
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

export type AssetIntelligence = {
  boundary: string;
  businessObjective: string;
  identityConfidence: {
    score: number;
    label: "High" | "Medium" | "Low";
    reason: string;
  };
  sourcesSearched: Array<{
    source: string;
    status: string;
    explanation: string;
  }>;
  summary: {
    relatedServiceReports: number;
    linkedBusinessDocuments: number;
    recurringSignals: number;
    dataQualityGaps: number;
  };
  relationshipEvidence: string[];
  recurringSignals: Array<{
    label: string;
    count: number;
    evidence: string;
  }>;
  serviceTimeline: Array<{
    serviceReportId: string;
    serviceReportNumber: string;
    serviceDate: string;
    customerId: string;
    customerName: string;
    technician: string;
    status: string;
    relationship: string;
    serviceSummary: string;
    recommendation: string;
    businessDocuments: Array<{
      id: string;
      title: string;
      type: string;
      status: string;
      approvalStatus: string;
      totalAmount: string;
    }>;
  }>;
  dataQualityGaps: string[];
  nextBestAction: {
    label: string;
    reason: string;
    href: string;
  };
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

function hasBusinessValue(value: unknown) {
  const text = readText(value).toLowerCase();

  return Boolean(text) && !text.startsWith("no ");
}

function normalizeIdentity(value: unknown) {
  return readText(value).toLowerCase().replace(/[^a-z0-9\u0590-\u05ff]/g, "");
}

function buildRelatedEquipmentWhere(
  item: EquipmentRecord,
): Prisma.ReportEquipmentItemWhereInput | undefined {
  const orFilters: Prisma.ReportEquipmentItemWhereInput[] = [];

  if (hasBusinessValue(item.serialNumber)) {
    orFilters.push({ serialNumber: item.serialNumber });
  }

  if (hasBusinessValue(item.equipmentNumber)) {
    orFilters.push({ equipmentNumber: item.equipmentNumber });
  }

  if (hasBusinessValue(item.equipmentModel)) {
    orFilters.push({ equipmentModel: item.equipmentModel });
  }

  return orFilters.length ? { OR: orFilters } : undefined;
}

function relationshipLabel(current: EquipmentRecord, related: EquipmentRecord) {
  const currentSerial = normalizeIdentity(current.serialNumber);
  const relatedSerial = normalizeIdentity(related.serialNumber);
  const currentNumber = normalizeIdentity(current.equipmentNumber);
  const relatedNumber = normalizeIdentity(related.equipmentNumber);
  const currentModel = normalizeIdentity(current.equipmentModel);
  const relatedModel = normalizeIdentity(related.equipmentModel);

  if (current.appsheetItemId === related.appsheetItemId) {
    return "Current equipment record";
  }

  if (currentSerial && currentSerial === relatedSerial) {
    return "Same serial number";
  }

  if (currentNumber && currentNumber === relatedNumber) {
    return "Same equipment number";
  }

  if (currentModel && currentModel === relatedModel) {
    return "Same equipment model";
  }

  return "Related equipment evidence";
}

function buildIdentityConfidence(
  item: EquipmentRecord,
  relatedItems: EquipmentRecord[],
  linkedBusinessDocumentCount: number,
): AssetIntelligence["identityConfidence"] {
  const serialNumberKnown = hasBusinessValue(item.serialNumber);
  const equipmentNumberKnown = hasBusinessValue(item.equipmentNumber);
  const modelKnown = hasBusinessValue(item.equipmentModel);
  let score = 25;
  const reasons = [];

  if (serialNumberKnown) {
    score += 30;
    reasons.push("serial number is present");
  }

  if (equipmentNumberKnown) {
    score += 20;
    reasons.push("equipment number is present");
  }

  if (modelKnown) {
    score += 10;
    reasons.push("model is present");
  }

  if (relatedItems.length > 1) {
    score += 10;
    reasons.push(`${relatedItems.length} related equipment history row(s) were found`);
  }

  if (linkedBusinessDocumentCount > 0) {
    score += 5;
    reasons.push(`${linkedBusinessDocumentCount} linked business document(s) were found`);
  }

  const cappedScore = Math.min(score, 95);

  return {
    score: cappedScore,
    label: cappedScore >= 75 ? "High" : cappedScore >= 50 ? "Medium" : "Low",
    reason: reasons.length
      ? reasons.join("; ")
      : "asset identity has limited structured evidence",
  };
}

const SIGNAL_DEFINITIONS = [
  {
    label: "Temperature / overheating signal",
    terms: ["temperature", "overheat", "heat", "\u05d7\u05d5\u05dd", "\u05d8\u05de\u05e4"],
  },
  {
    label: "Oil separator / oil system signal",
    terms: ["oil separator", "separator", "\u05de\u05e4\u05e8\u05d9\u05d3", "\u05e9\u05de\u05df"],
  },
  {
    label: "Filter service signal",
    terms: ["filter", "\u05de\u05e1\u05e0\u05df", "\u05e4\u05d9\u05dc\u05d8\u05e8"],
  },
  {
    label: "Intake / valve signal",
    terms: ["intake", "valve", "\u05e9\u05e1\u05ea\u05d5\u05dd", "\u05d9\u05e0\u05d9\u05e7\u05d4"],
  },
  {
    label: "Controller / electrical signal",
    terms: ["controller", "electric", "\u05d1\u05e7\u05e8", "\u05d7\u05e9\u05de\u05dc"],
  },
  {
    label: "Dryer / air treatment signal",
    terms: ["dryer", "\u05de\u05d9\u05d9\u05d1\u05e9", "\u05dc\u05d7\u05d5\u05ea"],
  },
  {
    label: "Maintenance interval signal",
    terms: ["2000", "2500", "4000", "5000"],
  },
];

function equipmentEvidenceText(item: EquipmentRecord) {
  return [
    item.serviceDescription,
    item.technicianRecommendations,
    item.nextService,
    item.systemStatus,
    item.serviceReport?.serviceDescription,
    item.serviceReport?.recommendations,
  ]
    .map((value) => readText(value))
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function buildRecurringSignals(
  relatedItems: EquipmentRecord[],
): AssetIntelligence["recurringSignals"] {
  return SIGNAL_DEFINITIONS.map((definition) => {
    const matchingItems = relatedItems.filter((item) => {
      const evidence = equipmentEvidenceText(item);

      return definition.terms.some((term) => evidence.includes(term.toLowerCase()));
    });

    return {
      label: definition.label,
      count: matchingItems.length,
      evidence: matchingItems
        .slice(0, 3)
        .map((item) => formatReportNumber(item.serviceReport))
        .join(", "),
    };
  }).filter((signal) => signal.count > 0);
}

function buildDataQualityGaps(
  item: EquipmentRecord,
  relatedItems: EquipmentRecord[],
  linkedBusinessDocumentCount: number,
) {
  const gaps = [];

  if (!hasBusinessValue(item.serialNumber)) {
    gaps.push("Missing serial number prevents exact equipment identity matching.");
  }

  if (!hasBusinessValue(item.equipmentNumber)) {
    gaps.push("Missing equipment number weakens same-equipment history matching.");
  }

  if (!hasBusinessValue(item.equipmentModel)) {
    gaps.push("Missing model prevents model and series intelligence.");
  }

  if (!hasBusinessValue(item.currentHours)) {
    gaps.push("Missing current hours limits preventive-maintenance timing.");
  }

  if (!hasBusinessValue(item.nextService)) {
    gaps.push("Missing next service limits follow-up planning.");
  }

  if (relatedItems.length <= 1) {
    gaps.push("No additional historical equipment row matched this asset identity.");
  }

  if (!linkedBusinessDocumentCount) {
    gaps.push("No linked BusinessDocument evidence was found for this asset history.");
  }

  return gaps;
}

function mapTimelineItem(
  current: EquipmentRecord,
  item: EquipmentRecord,
): AssetIntelligence["serviceTimeline"][number] {
  const serviceReport = item.serviceReport;

  return {
    serviceReportId: readText(serviceReport?.appsheetReportId),
    serviceReportNumber: formatReportNumber(serviceReport),
    serviceDate: serviceReport
      ? formatDate(serviceReport.serviceDate, serviceReport.rawSource)
      : "No linked report",
    customerId: readText(serviceReport?.customer?.appsheetCustomerId),
    customerName: readText(serviceReport?.customer?.name, "No customer"),
    technician: readText(serviceReport?.technicianName, "No technician"),
    status:
      readText(serviceReport?.sourceStatusText) ||
      formatEnum(serviceReport?.status, "No status"),
    relationship: relationshipLabel(current, item),
    serviceSummary:
      readText(item.serviceDescription) ||
      readText(serviceReport?.serviceDescription, "No service summary"),
    recommendation:
      readText(item.technicianRecommendations) ||
      readText(serviceReport?.recommendations, "No recommendation"),
    businessDocuments:
      serviceReport?.businessDocuments.map((document) => ({
        id: document.appsheetBusinessDocumentId,
        title: readText(document.draftTitle, "Untitled document"),
        type: formatEnum(document.documentTypeSelected),
        status: formatEnum(document.status),
        approvalStatus: formatEnum(document.approvalStatus),
        totalAmount: formatMoney(document.totalAmount, document.currency),
      })) ?? [],
  };
}

function buildSourcesSearched(
  relatedItems: EquipmentRecord[],
  linkedBusinessDocumentCount: number,
): AssetIntelligence["sourcesSearched"] {
  return [
    {
      source: "Business Knowledge Base",
      status: "Used",
      explanation:
        "Used structured PostgreSQL relationships between equipment, service reports, customers, and business documents.",
    },
    {
      source: "Equipment History",
      status: `${relatedItems.length} matched row(s)`,
      explanation:
        "Matched by serial number, equipment number, or model from ReportEquipmentItems.",
    },
    {
      source: "Service Reports",
      status: `${relatedItems.filter((item) => item.serviceReport).length} linked report(s)`,
      explanation:
        "Used linked service report date, technician, status, service description, and recommendations.",
    },
    {
      source: "Business Documents",
      status: `${linkedBusinessDocumentCount} linked document(s)`,
      explanation:
        "Used only documents linked through matched service reports.",
    },
    {
      source: "Official Model Parts Catalog",
      status: "Not used",
      explanation:
        "This Asset Intelligence slice does not select SKUs. SKU selection remains catalog-only when a parts recommendation is requested.",
    },
    {
      source: "Inventory",
      status: "Not used",
      explanation:
        "No inventory recommendation or mutation is performed in this read-only asset view.",
    },
  ];
}

function buildRelationshipEvidence(
  item: EquipmentRecord,
  relatedItems: EquipmentRecord[],
) {
  const evidence = [
    `Current equipment row: ${readText(item.appsheetItemId)}.`,
    `Equipment number: ${readText(item.equipmentNumber, "missing")}.`,
    `Serial number: ${readText(item.serialNumber, "missing")}.`,
    `Model: ${readText(item.equipmentModel, "missing")}.`,
  ];

  const relationCounts = relatedItems.reduce<Record<string, number>>((counts, related) => {
    const label = relationshipLabel(item, related);
    counts[label] = (counts[label] ?? 0) + 1;
    return counts;
  }, {});

  Object.entries(relationCounts).forEach(([label, count]) => {
    evidence.push(`${label}: ${count} row(s).`);
  });

  return evidence;
}

function buildNextBestAction(
  item: EquipmentRecord,
  timeline: AssetIntelligence["serviceTimeline"],
  recurringSignals: AssetIntelligence["recurringSignals"],
  dataQualityGaps: string[],
): AssetIntelligence["nextBestAction"] {
  const criticalIdentityGap = dataQualityGaps.find((gap) =>
    gap.includes("serial number"),
  );

  if (criticalIdentityGap) {
    return {
      label: "Complete asset identity",
      reason: criticalIdentityGap,
      href: item.serviceReport?.appsheetReportId
        ? `/service-reports/${item.serviceReport.appsheetReportId}`
        : "",
    };
  }

  const repeatedSignal = recurringSignals.find((signal) => signal.count >= 2);

  if (repeatedSignal) {
    return {
      label: `Review recurring pattern: ${repeatedSignal.label}`,
      reason: `${repeatedSignal.count} related service report(s) contain this signal.`,
      href: timeline[0]?.serviceReportId
        ? `/service-reports/${timeline[0].serviceReportId}`
        : "",
    };
  }

  const documentTimeline = timeline.find((event) => event.businessDocuments.length);

  if (documentTimeline) {
    return {
      label: "Review linked commercial history",
      reason:
        "At least one related service event has linked BusinessDocument evidence.",
      href: `/business-documents/${documentTimeline.businessDocuments[0].id}`,
    };
  }

  return {
    label: "Use as baseline asset record",
    reason:
      "Current runtime found service evidence but no stronger recurring pattern or linked commercial action.",
    href: item.serviceReport?.appsheetReportId
      ? `/service-reports/${item.serviceReport.appsheetReportId}`
      : "",
  };
}

function buildAssetIntelligence(
  item: EquipmentRecord,
  relatedItems: EquipmentRecord[],
): AssetIntelligence {
  const linkedBusinessDocumentCount = relatedItems.reduce(
    (count, related) => count + (related.serviceReport?.businessDocuments.length ?? 0),
    0,
  );
  const timeline = relatedItems.map((related) => mapTimelineItem(item, related));
  const recurringSignals = buildRecurringSignals(relatedItems);
  const dataQualityGaps = buildDataQualityGaps(
    item,
    relatedItems,
    linkedBusinessDocumentCount,
  );

  return {
    boundary:
      "Asset Intelligence is a read-only Tal Intelligence Core projection over existing equipment, service, customer, and BusinessDocument evidence. It does not mutate data, select SKUs, reserve inventory, create documents, or call external systems.",
    businessObjective:
      "Preserve asset history, detect recurring service patterns, reduce repeat diagnosis work, and improve first-time repair decisions.",
    identityConfidence: buildIdentityConfidence(
      item,
      relatedItems,
      linkedBusinessDocumentCount,
    ),
    sourcesSearched: buildSourcesSearched(
      relatedItems,
      linkedBusinessDocumentCount,
    ),
    summary: {
      relatedServiceReports: timeline.filter((event) => event.serviceReportId).length,
      linkedBusinessDocuments: linkedBusinessDocumentCount,
      recurringSignals: recurringSignals.length,
      dataQualityGaps: dataQualityGaps.length,
    },
    relationshipEvidence: buildRelationshipEvidence(item, relatedItems),
    recurringSignals,
    serviceTimeline: timeline,
    dataQualityGaps,
    nextBestAction: buildNextBestAction(
      item,
      timeline,
      recurringSignals,
      dataQualityGaps,
    ),
  };
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

function mapEquipmentDetail(item: EquipmentRecord): EquipmentDetailBase {
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
      serviceDescription: true,
      recommendations: true,
      status: true,
      sourceStatusText: true,
      rawSource: true,
      customer: { select: { appsheetCustomerId: true, name: true } },
      businessDocuments: {
        orderBy: [{ createdAt: "desc" }, { appsheetBusinessDocumentId: "asc" }],
        select: {
          appsheetBusinessDocumentId: true,
          draftTitle: true,
          documentTypeSelected: true,
          status: true,
          approvalStatus: true,
          totalAmount: true,
          currency: true,
        },
      },
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

  if (!item) {
    return undefined;
  }

  const relatedWhere = buildRelatedEquipmentWhere(item);
  const relatedItems = relatedWhere
    ? await prisma.reportEquipmentItem.findMany({
        where: relatedWhere,
        select: equipmentSelect,
        orderBy: [
          { serviceReport: { serviceDate: "desc" } },
          { reportCounter: "desc" },
          { appsheetItemId: "asc" },
        ],
      })
    : [item];
  const detail = mapEquipmentDetail(item);

  return {
    ...detail,
    assetIntelligence: buildAssetIntelligence(item, relatedItems),
  };
}
