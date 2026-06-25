import type {
  AiDraftSuggestion,
  Customer,
  Prisma,
  ReportEquipmentItem,
  ServiceReport,
} from "@prisma/client";
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

type AiDraftPreviewServiceReport = ServiceReport & {
  customer: AiDraftCustomer | null;
  equipmentItems: ReportEquipmentItem[];
};

type AiDraftPreviewLine = {
  item: string;
  quantity: string;
  unitPrice: string;
  total: string;
  source: string;
  confidence: string;
  needsApproval: string;
  reason: string;
  pricingEvidence: Array<{
    source: string;
    unitPrice: string;
    total: string;
    confidence: string;
    note: string;
  }>;
};

export type AiDraftRecommendationPreview = {
  id: string;
  reportId: string;
  reportCounter: string;
  serviceDate: string;
  technician: string;
  customerId: string;
  customerName: string;
  equipmentType: string;
  model: string;
  serial: string;
  hp: string;
  serviceType: string;
  technicianWorkTime: string;
  visitRequired: string;
  technicianNotes: string;
  documentType: string;
  documentReason: string;
  subtotal: string;
  approvalStatus: string;
  dataCoverage: Array<{ source: string; status: string }>;
  lines: AiDraftPreviewLine[];
  historicalMatches: {
    sameEquipment: string;
    sameCustomer: string;
    similarService: string;
  };
  risks: string[];
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

function formatOptionalDate(value: Date | null) {
  if (!value) {
    return "No service date";
  }

  return value.toISOString().slice(0, 10);
}

function formatDecimal(value: Prisma.Decimal | null, suffix = "") {
  if (!value) {
    return "";
  }

  return `${value.toFixed(2)}${suffix}`;
}

function formatPrice(value: number | Prisma.Decimal | null) {
  if (value === null || value === undefined) {
    return "Needs approval";
  }

  const numericValue =
    typeof value === "number" ? value : Number(value.toString());

  if (!Number.isFinite(numericValue)) {
    return "Needs approval";
  }

  return `${numericValue.toFixed(2)} ILS`;
}

function normalizeModel(model: string) {
  return model.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function formatEquipmentValue(
  equipment: ReportEquipmentItem[],
  picker: (item: ReportEquipmentItem) => string | null,
  fallback: string,
) {
  const values = equipment.map(picker).map((value) => readText(value)).filter(Boolean);

  return values.length ? values.join(", ") : fallback;
}

function isReport5806SmallScrService(report: AiDraftPreviewServiceReport) {
  if (report.reportCounter !== 5806) {
    return false;
  }

  const hasScr40pm = report.equipmentItems.some((item) =>
    normalizeModel(readText(item.equipmentModel)).includes("SCR40PM"),
  );
  const serviceText = [
    report.serviceType,
    report.serviceDescription,
    report.workPerformed,
    report.technicianSummary,
    report.recommendations,
    ...report.equipmentItems.flatMap((item) => [
      item.serviceDescription,
      item.technicianRecommendations,
    ]),
  ]
    .map((value) => readText(value).toLowerCase())
    .join(" ");

  return hasScr40pm && (serviceText.includes("2000") || serviceText.includes("small"));
}

function parsePrice(value: Prisma.Decimal | null | undefined) {
  if (!value) {
    return null;
  }

  const numericValue = Number(value.toString());
  return Number.isFinite(numericValue) ? numericValue : null;
}

function uniquePrices(evidence: PricingEvidence[]) {
  return Array.from(
    new Set(
      evidence
        .map((item) => item.unitPrice)
        .filter((value): value is number => value !== null)
        .map((value) => value.toFixed(2)),
    ),
  );
}

function calculateTotal(unitPrice: number | null, quantity: string) {
  const numericQuantity = Number(quantity);

  if (unitPrice === null || !Number.isFinite(numericQuantity)) {
    return "Needs approval";
  }

  return `${(unitPrice * numericQuantity).toFixed(2)} ILS`;
}

type PricingEvidence = {
  priority: number;
  source: string;
  unitPrice: number | null;
  total: number | null;
  confidence: string;
  note: string;
};

type SuggestedLineDefinition = {
  item: string;
  quantity: string;
  skuCandidates: string[];
  searchTerms: string[];
  reason: string;
};

function summarizeEvidence(evidence: PricingEvidence[]) {
  if (!evidence.length) {
    return [];
  }

  return evidence.slice(0, 5).map((item) => ({
    source: item.source,
    unitPrice: formatPrice(item.unitPrice),
    total: item.total === null ? "No total" : formatPrice(item.total),
    confidence: item.confidence,
    note: item.note,
  }));
}

function selectTrustedPrice(evidence: PricingEvidence[]) {
  const tiers = [1, 2, 3, 4];

  for (const tier of tiers) {
    const tierEvidence = evidence.filter((item) => item.priority === tier);
    const prices = uniquePrices(tierEvidence);

    if (prices.length === 1) {
      const unitPrice = Number(prices[0]);
      return {
        unitPrice,
        source: tierEvidence[0].source,
        confidence: tierEvidence[0].confidence,
        needsApproval: false,
        note: tierEvidence[0].note,
      };
    }

    if (prices.length > 1) {
      return {
        unitPrice: null,
        source: `${tierEvidence[0].source} conflict`,
        confidence: "Low",
        needsApproval: true,
        note: "Conflicting trusted prices found; manual approval required.",
      };
    }
  }

  return {
    unitPrice: null,
    source: "No trusted pricing evidence",
    confidence: "Low",
    needsApproval: true,
    note: "No ProductCatalog selling price, BusinessDocumentItem price, or Maven item price was found.",
  };
}

function makeLine(
  definition: SuggestedLineDefinition,
  evidence: PricingEvidence[],
): AiDraftPreviewLine {
  const selectedPrice = selectTrustedPrice(evidence);
  const total = calculateTotal(selectedPrice.unitPrice, definition.quantity);

  return {
    item: definition.item,
    quantity: definition.quantity,
    unitPrice: formatPrice(selectedPrice.unitPrice),
    total,
    source: selectedPrice.source,
    confidence: selectedPrice.confidence,
    needsApproval: selectedPrice.needsApproval
      ? "Required"
      : "User approval still required",
    reason: `${definition.reason} ${selectedPrice.note}`,
    pricingEvidence: summarizeEvidence(evidence),
  };
}

function buildLineDefinitions(report: AiDraftPreviewServiceReport) {
  const equipmentCount = Math.max(report.equipmentItems.length, 1);
  const workHours = report.technicianWorkHours
    ? Number(report.technicianWorkHours.toString())
    : null;

  return [
    {
      item: "Air Filter",
      quantity: String(equipmentCount),
      skuCandidates: ["25100043-071"],
      searchTerms: ["Air Filter", "air filter", "מסנן אויר", "25100043-071"],
      reason: "Small Service kit includes Air Filter.",
    },
    {
      item: "Oil Filter",
      quantity: String(equipmentCount),
      skuCandidates: ["25200007-005"],
      searchTerms: ["Oil Filter", "oil filter", "מסנן שמן", "25200007-005"],
      reason: "Small Service kit includes Oil Filter.",
    },
    {
      item: "3L SKR oil top-up",
      quantity: String(equipmentCount * 3),
      skuCandidates: [],
      searchTerms: ["SKR oil", "שמן", "oil", "3L"],
      reason:
        "Small Service rule includes 3L SKR oil top-up per compressor unless review changes oil handling.",
    },
    {
      item: "Labor + Service",
      quantity: workHours === null ? "Missing hours" : workHours.toFixed(2),
      skuCandidates: [],
      searchTerms: ["Labor + Service", "labor", "service", "עבודה", "שירות"],
      reason:
        workHours === null
          ? "Technician work time is missing, so labor total needs manual approval."
          : "Labor + Service stays one commercial line by approved business-document rules.",
    },
    {
      item: "Technician Visit / Travel",
      quantity: "1",
      skuCandidates: [],
      searchTerms: ["Technician Visit", "Travel", "visit", "נסיעה", "ביקור"],
      reason:
        "Technician Visit and Travel are one commercial line; final user approval is still required.",
    },
  ];
}

async function getPricingEvidenceForLine(definition: SuggestedLineDefinition) {
  const productTermFilters = definition.searchTerms.flatMap((term) => [
    { name: { contains: term, mode: "insensitive" as const } },
    { description: { contains: term, mode: "insensitive" as const } },
    { compatibleEquipment: { contains: term, mode: "insensitive" as const } },
  ]);
  const productSkuFilters = definition.skuCandidates.map((sku) => ({ sku }));
  const productOrFilters = [...productSkuFilters, ...productTermFilters];

  const businessDocumentItemFilters = [
    ...definition.skuCandidates,
    ...definition.searchTerms,
  ].flatMap((term) => [
    { itemName: { contains: term, mode: "insensitive" as const } },
    { description: { contains: term, mode: "insensitive" as const } },
  ]);
  const mavenItemFilters = [
    ...definition.skuCandidates,
    ...definition.searchTerms,
  ].map((term) => ({
    itemDescription: { contains: term, mode: "insensitive" as const },
  }));

  const [products, businessDocumentItems, mavenItems] = await Promise.all([
    productOrFilters.length
      ? prisma.product.findMany({
          where: { OR: productOrFilters },
          select: {
            sku: true,
            name: true,
            sellingPrice: true,
            currency: true,
          },
          orderBy: [{ sku: "asc" }, { name: "asc" }],
          take: 5,
        })
      : Promise.resolve([]),
    businessDocumentItemFilters.length
      ? prisma.businessDocumentItem.findMany({
          where: { OR: businessDocumentItemFilters },
          select: {
            itemName: true,
            unitPrice: true,
            totalPrice: true,
            source: true,
            matchConfidence: true,
            businessDocument: {
              select: {
                appsheetBusinessDocumentId: true,
                sourceReportCounter: true,
                mavenDocumentNumber: true,
              },
            },
          },
          orderBy: [{ createdAt: "desc" }, { id: "asc" }],
          take: 5,
        })
      : Promise.resolve([]),
    mavenItemFilters.length
      ? prisma.mavenDocumentItem.findMany({
          where: { OR: mavenItemFilters },
          select: {
            itemDescription: true,
            unitPrice: true,
            lineTotal: true,
            documentNumber: true,
            documentDate: true,
          },
          orderBy: [{ documentDate: "desc" }, { id: "asc" }],
          take: 5,
        })
      : Promise.resolve([]),
  ]);

  const exactSkuSet = new Set(definition.skuCandidates);

  const productEvidence: PricingEvidence[] = products
    .map((product) => {
      const unitPrice = parsePrice(product.sellingPrice);

      if (unitPrice === null) {
        return null;
      }

      const isDirectSku = product.sku ? exactSkuSet.has(product.sku) : false;

      return {
        priority: isDirectSku ? 1 : 2,
        source: isDirectSku ? "ProductCatalog direct SKU" : "ProductCatalog alias",
        unitPrice,
        total: null,
        confidence: isDirectSku ? "High" : "Medium",
        note: `${product.sku || "No SKU"} - ${product.name} (${product.currency})`,
      };
    })
    .filter((item): item is PricingEvidence => item !== null);

  const businessEvidence: PricingEvidence[] = businessDocumentItems
    .map((item) => {
      const unitPrice = parsePrice(item.unitPrice);

      if (unitPrice === null) {
        return null;
      }

      const sourceDocument =
        item.businessDocument.appsheetBusinessDocumentId ||
        item.businessDocument.mavenDocumentNumber ||
        "BusinessDocument";

      return {
        priority: 3,
        source: "BusinessDocumentItems history",
        unitPrice,
        total: parsePrice(item.totalPrice),
        confidence: item.matchConfidence ? String(item.matchConfidence) : "Medium",
        note: `${sourceDocument} - ${item.itemName} (${formatEnum(item.source)})`,
      };
    })
    .filter((item): item is PricingEvidence => item !== null);

  const mavenEvidence: PricingEvidence[] = mavenItems
    .map((item) => {
      const unitPrice = parsePrice(item.unitPrice);

      if (unitPrice === null) {
        return null;
      }

      return {
        priority: 4,
        source: "Maven item history",
        unitPrice,
        total: parsePrice(item.lineTotal),
        confidence: "Medium",
        note: `${item.documentNumber || "No document number"} - ${
          item.itemDescription || "No item description"
        }`,
      };
    })
    .filter((item): item is PricingEvidence => item !== null);

  return [...productEvidence, ...businessEvidence, ...mavenEvidence].sort(
    (left, right) => left.priority - right.priority,
  );
}

function buildDataCoverage(
  counts: {
    partsUsed: number;
    products: number;
    mavenItems: number;
    businessDocuments: number;
    businessDocumentItems: number;
    aiDraftSuggestions: number;
  },
) {
  return [
    { source: "ServiceReports", status: "Loaded source report" },
    { source: "ReportEquipmentItems", status: "Loaded linked equipment" },
    {
      source: "PartsUsed",
      status: counts.partsUsed ? `${counts.partsUsed} linked rows` : "No linked rows",
    },
    {
      source: "ProductsCatalog",
      status: counts.products ? `${counts.products} candidate rows` : "No candidate rows",
    },
    {
      source: "InvoiceMavenDocumentItems",
      status: counts.mavenItems
        ? `${counts.mavenItems} possible history rows`
        : "No Maven item history rows",
    },
    {
      source: "BusinessDocuments",
      status: counts.businessDocuments
        ? `${counts.businessDocuments} linked rows`
        : "No linked rows",
    },
    {
      source: "BusinessDocumentItems",
      status: counts.businessDocumentItems
        ? `${counts.businessDocumentItems} linked rows`
        : "No linked rows",
    },
    {
      source: "AIDraftSuggestions",
      status: counts.aiDraftSuggestions
        ? `${counts.aiDraftSuggestions} linked rows`
        : "No saved draft rows",
    },
  ];
}

function sumKnownTotals(lines: AiDraftPreviewLine[]) {
  const total = lines.reduce((sum, line) => {
    const amount = Number(line.total.replace(" ILS", ""));
    return Number.isFinite(amount) ? sum + amount : sum;
  }, 0);

  return total > 0 ? `${total.toFixed(2)} ILS known + approval-required lines` : "All price lines need approval";
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

export async function getAiDraftPreviewByReportCounter(reportCounter: string) {
  const numericReportCounter = Number(reportCounter);

  if (!Number.isInteger(numericReportCounter)) {
    return undefined;
  }

  const report = await prisma.serviceReport.findUnique({
    where: { reportCounter: numericReportCounter },
    include: {
      customer: {
        select: {
          appsheetCustomerId: true,
          name: true,
        },
      },
      equipmentItems: {
        orderBy: [{ equipmentNumber: "asc" }, { appsheetItemId: "asc" }],
      },
    },
  });

  if (!report) {
    return undefined;
  }

  const skuCandidates = ["25200007-005", "25100043-071"];
  const [
    partsUsed,
    products,
    mavenItems,
    businessDocuments,
    businessDocumentItems,
    aiDraftSuggestions,
  ] = await Promise.all([
    prisma.partUsed.count({ where: { serviceReportId: report.id } }),
    prisma.product.count({ where: { sku: { in: skuCandidates } } }),
    prisma.mavenDocumentItem.count({
      where: {
        OR: skuCandidates.map((sku) => ({
          itemDescription: { contains: sku, mode: "insensitive" },
        })),
      },
    }),
    prisma.businessDocument.count({ where: { serviceReportId: report.id } }),
    prisma.businessDocumentItem.count({
      where: {
        OR: skuCandidates.map((sku) => ({
          itemName: { contains: sku, mode: "insensitive" },
        })),
      },
    }),
    prisma.aiDraftSuggestion.count({ where: { serviceReportId: report.id } }),
  ]);

  const lineDefinitions = isReport5806SmallScrService(report)
    ? buildLineDefinitions(report)
    : [];
  const lineEvidence = await Promise.all(
    lineDefinitions.map((definition) => getPricingEvidenceForLine(definition)),
  );
  const lines = lineDefinitions.map((definition, index) =>
    makeLine(definition, lineEvidence[index] ?? []),
  );
  const equipmentModel = formatEquipmentValue(
    report.equipmentItems,
    (item) => item.equipmentModel,
    "No model",
  );
  const equipmentType = formatEquipmentValue(
    report.equipmentItems,
    (item) => item.equipmentType,
    "No equipment type",
  );

  return {
    id: `preview-${reportCounter}`,
    reportId: report.appsheetReportId,
    reportCounter: readText(report.reportCounter, reportCounter),
    serviceDate: formatOptionalDate(report.serviceDate),
    technician: readText(report.technicianName, "UNKNOWN TECHNICIAN"),
    customerId: readText(report.customer?.appsheetCustomerId),
    customerName: readText(report.customer?.name, "UNKNOWN CUSTOMER"),
    equipmentType,
    model: equipmentModel,
    serial: formatEquipmentValue(
      report.equipmentItems,
      (item) => item.serialNumber,
      "No serial",
    ),
    hp: "No HP field in staging",
    serviceType: isReport5806SmallScrService(report)
      ? "SCR Small Service / 2000h"
      : readText(report.serviceType, "Needs manual review"),
    technicianWorkTime: formatDecimal(report.technicianWorkHours, " hours") || "Missing hours",
    visitRequired: "Yes - fixed visit line included for review",
    technicianNotes:
      readText(report.workPerformed) ||
      readText(report.technicianSummary) ||
      readText(report.recommendations, "No technician notes"),
    documentType: "Service document / quote recommendation",
    documentReason:
      "Service was performed; this preview prepares approval-based commercial lines without creating any draft rows.",
    subtotal: sumKnownTotals(lines),
    approvalStatus: "User approval required before any BusinessDocument, Maven, inventory, email, or customer-facing action",
    dataCoverage: buildDataCoverage({
      partsUsed,
      products,
      mavenItems,
      businessDocuments,
      businessDocumentItems,
      aiDraftSuggestions,
    }),
    lines,
    historicalMatches: {
      sameEquipment: mavenItems
        ? `${mavenItems} possible Maven item history rows`
        : "No same-equipment Maven selling-price history available in staging",
      sameCustomer: businessDocuments
        ? `${businessDocuments} linked business document rows`
        : "No linked customer business document history available in staging",
      similarService: products
        ? `${products} product catalog candidates found`
        : "No ProductsCatalog candidate selling prices available in staging",
    },
    risks: lines.length
      ? [
          "Any line without ProductCatalog, BusinessDocumentItem, or Maven item price evidence remains approval-required.",
          "Conflicting prices are not auto-selected and require manual approval.",
          "Labor total depends on technician work hours and trusted history; missing evidence remains manual approval.",
          "This preview is not a saved AI draft and does not create BusinessDocuments or Maven drafts.",
        ]
      : [
          "No safe recommendation lines were generated for this report.",
          "Use manual review until model, service type, and evidence match approved rules.",
        ],
  } satisfies AiDraftRecommendationPreview;
}
