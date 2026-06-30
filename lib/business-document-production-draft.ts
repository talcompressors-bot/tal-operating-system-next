import {
  ApprovalStatus,
  BusinessDocumentStatus,
  BusinessDocumentType,
  Prisma,
} from "@prisma/client";
import { manufacturerPartRegistryRows } from "./manufacturer-parts-registry";
import { prisma } from "./prisma";
import type { BusinessDocumentDraftGatewayLineInput } from "./business-document-draft-gateway";

type ConfidenceLabel = "High" | "Medium" | "Low";
type ServiceInterval = "Small Service" | "Large Service" | "Unknown Service Interval";

type ServiceReportForDraft = NonNullable<
  Awaited<ReturnType<typeof loadServiceReportForDraft>>
>;

type HistoricalLine = {
  itemName: string;
  unitPrice: number;
  totalPrice: number;
  quantity: number;
  sourceDocumentId: string;
  sourceDocumentType: BusinessDocumentType;
  sourceReportCounter: number | null;
  customerId: string;
  customerName: string;
  equipmentModels: string[];
  approvalStatus: ApprovalStatus;
  status: BusinessDocumentStatus;
};

type CatalogEvidence = {
  itemName: string;
  sku: string | null;
  sellingPrice: number | null;
  sourceProductId: string;
  compatibleEquipment: string | null;
};

type PartsHistoryEvidence = {
  partName: string;
  partSku: string | null;
  quantity: number | null;
  reportCounter: number | null;
  equipmentModels: string[];
};

type PriceEvidence = {
  source: string;
  unitPrice: string;
  total: string;
  confidence: ConfidenceLabel;
  note: string;
};

type KnowledgeEvidence = {
  source: string;
  status: "Used" | "Missing" | "Blocked";
  explanation: string;
};

type DraftLineCandidate = {
  canonicalItemName: string;
  itemName: string;
  aliases: string[];
  description: string;
  quantity: number;
  itemType: string;
  reason: string;
  evidenceSource: string;
  defaultUnitPrice: number | null;
  defaultPriceNote: string;
  quantityNeedsApproval: boolean;
  sourceCertainty: ConfidenceLabel;
};

export type ProductionDraftLineRecommendation = {
  itemName: string;
  quantity: string;
  unitPrice: string;
  totalPrice: string;
  confidence: ConfidenceLabel;
  confidenceLabel: string;
  needsApproval: boolean;
  itemType: string;
  source: string;
  description: string;
  pricingEvidence: PriceEvidence[];
  explanation: string;
  missingEvidence: string[];
};

export type ProductionDraftRecommendation = {
  serviceReportId: string;
  documentType: BusinessDocumentType;
  detectedMaintenanceType: ServiceInterval;
  title: string;
  description: string;
  lines: ProductionDraftLineRecommendation[];
  gatewayLines: BusinessDocumentDraftGatewayLineInput[];
  knowledgeUsed: KnowledgeEvidence[];
  missingEvidence: string[];
  confidenceSummary: string;
  explainabilitySummary: string;
  qualitySummary: string;
  estimatedManualWorkReduction: string;
};

const DOCUMENT_TYPE_HEBREW_LABELS: Record<BusinessDocumentType, string> = {
  QUOTE: "הצעת מחיר",
  SERVICE_DOCUMENT: "מסמך שירות",
  INVOICE: "חשבונית מס",
  RECEIPT: "קבלה",
  CREDIT_NOTE: "זיכוי",
  OTHER: "מסמך עסקי",
  UNKNOWN: "מסמך עסקי",
};

const CONFIDENCE_HEBREW_LABELS: Record<ConfidenceLabel, string> = {
  High: "גבוהה",
  Medium: "בינונית",
  Low: "נמוכה",
};

function readText(value: unknown, fallback = "") {
  if (value === undefined || value === null) {
    return fallback;
  }

  const text = String(value).trim();
  return text || fallback;
}

function money(value: number | null) {
  return value === null ? "Needs Price Review" : value.toFixed(2);
}

function normalizeText(value: string) {
  return value.toUpperCase().replace(/[^A-Z0-9א-ת]/g, "");
}

function normalizeModel(value: string) {
  return normalizeText(value).replace(/^SCR/, "");
}

function formatModelList(models: string[]) {
  return models.length ? models.join(", ") : "אין עדות לדגם";
}

function formatServiceIntervalHebrew(serviceInterval: string) {
  if (serviceInterval === "Large Service") {
    return "טיפול גדול";
  }

  if (serviceInterval === "Small Service") {
    return "טיפול קטן";
  }

  return "מרווח טיפול לא מזוהה";
}

function extractModelFamily(model: string) {
  const normalized = normalizeModel(model);
  const letters = normalized.replace(/[0-9]/g, "");

  return letters || normalized;
}

function collectReportEvidenceText(report: ServiceReportForDraft) {
  return [
    report.serviceType,
    report.serviceDescription,
    report.workPerformed,
    report.technicianSummary,
    report.recommendations,
    ...report.equipmentItems.flatMap((item) => [
      item.equipmentType,
      item.equipmentSubtype,
      item.equipmentModel,
      item.compressorCategory,
      item.serviceDescription,
      item.technicianRecommendations,
      item.nextService,
    ]),
  ]
    .map((value) => readText(value).toLowerCase())
    .join(" ");
}

function detectServiceInterval(report: ServiceReportForDraft): ServiceInterval {
  const text = collectReportEvidenceText(report);

  if (
    text.includes("4000") ||
    text.includes("5000") ||
    text.includes("large") ||
    text.includes("גדול")
  ) {
    return "Large Service";
  }

  if (
    text.includes("2000") ||
    text.includes("2500") ||
    text.includes("small") ||
    text.includes("קטן")
  ) {
    return "Small Service";
  }

  return "Unknown Service Interval";
}

function hasMaintenanceEvidence(serviceInterval: ServiceInterval) {
  return serviceInterval !== "Unknown Service Interval";
}

function hasBeltEvidence(report: ServiceReportForDraft) {
  const text = collectReportEvidenceText(report);

  return (
    text.includes("belt") ||
    text.includes("belts") ||
    text.includes("רצוע") ||
    text.includes("רצועות")
  );
}

function hasStrongModelOrManufacturerEvidence(report: ServiceReportForDraft) {
  return report.equipmentItems.some((item) => {
    const model = readText(item.equipmentModel);
    const category = readText(item.compressorCategory);
    const type = readText(item.equipmentType);
    const subtype = readText(item.equipmentSubtype);
    const combined = normalizeText([model, category, type, subtype].join(" "));

    return Boolean(model) || combined.includes("SCR") || combined.includes("COMPRESSOR");
  });
}

async function loadServiceReportForDraft(serviceReportId: string) {
  const isUuid =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{12}$/i.test(
      serviceReportId,
    );

  return prisma.serviceReport.findFirst({
    where: isUuid ? { id: serviceReportId } : { appsheetReportId: serviceReportId },
    include: {
      customer: {
        select: {
          id: true,
          appsheetCustomerId: true,
          name: true,
        },
      },
      equipmentItems: {
        orderBy: [{ equipmentNumber: "asc" }, { appsheetItemId: "asc" }],
        select: {
          appsheetItemId: true,
          equipmentNumber: true,
          equipmentType: true,
          equipmentSubtype: true,
          equipmentModel: true,
          serialNumber: true,
          compressorCategory: true,
          serviceDescription: true,
          technicianRecommendations: true,
          nextService: true,
        },
      },
    },
  });
}

async function loadHistoricalLines(report: ServiceReportForDraft) {
  const documents = await prisma.businessDocument.findMany({
    where: {
      approvalStatus: ApprovalStatus.APPROVED,
      status: BusinessDocumentStatus.APPROVED,
      items: {
        some: {
          unitPrice: { not: null },
          totalPrice: { not: null },
        },
      },
    },
    orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
    select: {
      appsheetBusinessDocumentId: true,
      documentTypeSelected: true,
      approvalStatus: true,
      status: true,
      customerId: true,
      customer: {
        select: {
          name: true,
        },
      },
      serviceReport: {
        select: {
          reportCounter: true,
          equipmentItems: {
            select: {
              equipmentModel: true,
            },
          },
        },
      },
      items: {
        where: {
          unitPrice: { not: null },
          totalPrice: { not: null },
        },
        select: {
          itemName: true,
          quantity: true,
          unitPrice: true,
          totalPrice: true,
        },
      },
    },
  });

  return documents.flatMap((document) =>
    document.items.map((item): HistoricalLine => ({
      itemName: item.itemName,
      unitPrice: Number(item.unitPrice),
      totalPrice: Number(item.totalPrice),
      quantity: Number(item.quantity),
      sourceDocumentId: document.appsheetBusinessDocumentId,
      sourceDocumentType: document.documentTypeSelected,
      sourceReportCounter: document.serviceReport?.reportCounter ?? null,
      customerId: document.customerId ?? "",
      customerName: readText(document.customer?.name, "Unknown customer"),
      equipmentModels:
        document.serviceReport?.equipmentItems
          .map((equipment) => readText(equipment.equipmentModel))
          .filter(Boolean) ?? [],
      approvalStatus: document.approvalStatus,
      status: document.status,
    })),
  );
}

async function loadCatalogEvidence() {
  const products = await prisma.product.findMany({
    where: {
      sellingPrice: { not: null },
    },
    select: {
      appsheetProductId: true,
      sku: true,
      name: true,
      description: true,
      compatibleEquipment: true,
      sellingPrice: true,
    },
  });

  return products.map((product): CatalogEvidence => ({
    itemName: [product.name, product.description].filter(Boolean).join(" "),
    sku: product.sku,
    sellingPrice:
      product.sellingPrice === null ? null : Number(product.sellingPrice),
    sourceProductId: product.appsheetProductId,
    compatibleEquipment: product.compatibleEquipment,
  }));
}

async function loadPartsHistoryEvidence(report: ServiceReportForDraft) {
  const models = report.equipmentItems
    .map((item) => readText(item.equipmentModel))
    .filter(Boolean);
  const parts = await prisma.partUsed.findMany({
    where: {
      OR: [
        { serviceReportId: report.id },
        ...(models.length
          ? [
              {
                serviceReport: {
                  equipmentItems: {
                    some: {
                      equipmentModel: { in: models },
                    },
                  },
                },
              },
            ]
          : []),
      ],
    },
    select: {
      partName: true,
      partSku: true,
      quantity: true,
      serviceReport: {
        select: {
          reportCounter: true,
          equipmentItems: {
            select: {
              equipmentModel: true,
            },
          },
        },
      },
    },
  });

  return parts.map((part): PartsHistoryEvidence => ({
    partName: readText(part.partName),
    partSku: part.partSku,
    quantity: part.quantity === null ? null : Number(part.quantity),
    reportCounter: part.serviceReport?.reportCounter ?? null,
    equipmentModels:
      part.serviceReport?.equipmentItems
        .map((item) => readText(item.equipmentModel))
        .filter(Boolean) ?? [],
  }));
}

function findRegistryRowsForModel(model: string, serviceInterval: string) {
  const normalized = normalizeModel(model);
  const isLargeService = serviceInterval === "Large Service";
  const includedCategories = isLargeService
    ? ["AIR_FILTER", "OIL_FILTER", "OIL_SEPARATOR", "OIL_COOLANT"]
    : ["AIR_FILTER", "OIL_FILTER", "OIL_COOLANT"];

  return manufacturerPartRegistryRows.filter((row) => {
    if (!row.active || row.reviewStatus !== "REVIEWED") {
      return false;
    }

    return (
      row.normalizedModel === normalized &&
      includedCategories.includes(row.partCategory)
    );
  });
}

function buildServiceKitCandidates(
  report: ServiceReportForDraft,
  serviceInterval: ServiceInterval,
): DraftLineCandidate[] {
  if (!hasMaintenanceEvidence(serviceInterval)) {
    return [];
  }

  const equipmentCount = Math.max(report.equipmentItems.length, 1);
  const models = report.equipmentItems
    .map((item) => readText(item.equipmentModel))
    .filter(Boolean);
  const strongMaintenanceEvidence =
    hasStrongModelOrManufacturerEvidence(report) || models.length > 0;
  const beltRelevant = hasBeltEvidence(report);

  if (!strongMaintenanceEvidence) {
    return [];
  }

  const rowsByCategory = new Map<string, ReturnType<typeof findRegistryRowsForModel>[number]>();

  models.forEach((model) => {
    findRegistryRowsForModel(model, serviceInterval).forEach((row) => {
      if (!rowsByCategory.has(row.partCategory)) {
        rowsByCategory.set(row.partCategory, row);
      }
    });
  });

  const candidates: DraftLineCandidate[] = [];

  const partDefinitions = [
    {
      category: "AIR_FILTER",
      canonicalItemName: "Air Filter",
      itemName: "מסנן אוויר",
      aliases: ["Air Filter", "מסנן אוויר"],
      itemType: "PART",
      quantity: equipmentCount,
      reason: "ידע ערכת השירות מצביע על צורך במסנן אוויר עבור הדגם ומרווח הטיפול.",
    },
    {
      category: "OIL_FILTER",
      canonicalItemName: "Oil Filter",
      itemName: "מסנן שמן",
      aliases: ["Oil Filter", "מסנן שמן"],
      itemType: "PART",
      quantity: equipmentCount,
      reason: "ידע ערכת השירות מצביע על צורך במסנן שמן עבור הדגם ומרווח הטיפול.",
    },
    {
      category: "OIL_SEPARATOR",
      canonicalItemName: "Oil Separator",
      itemName: "מפריד שמן",
      aliases: ["Oil Separator", "מפריד שמן"],
      itemType: "PART",
      quantity: equipmentCount,
      reason: "ידע טיפול גדול מצביע על צורך במפריד שמן עבור הדגם ומרווח הטיפול.",
    },
    {
      category: "OIL_COOLANT",
      canonicalItemName:
        serviceInterval === "Large Service"
          ? "SCR oil replacement / coolant"
          : "3L SKR oil top-up",
      itemName:
        serviceInterval === "Large Service"
          ? "שמן / נוזל קירור למדחס SCR"
          : "תוספת שמן SKR 3 ליטר",
      aliases: [
        "SCR oil replacement / coolant",
        "3L SKR oil top-up",
        "Oil Coolant",
        "שמן / נוזל קירור למדחס SCR",
        "תוספת שמן SKR 3 ליטר",
      ],
      itemType: "PART",
      quantity:
        serviceInterval === "Large Service"
          ? equipmentCount
          : models.some((model) => normalizeText(model).includes("SCR"))
            ? equipmentCount * 3
            : equipmentCount,
      reason:
        serviceInterval === "Large Service"
          ? "ידע טיפול גדול כולל טיפול בשמן או נוזל קירור; הפעולה הסופית דורשת בדיקת משתמש."
          : "כלל טיפול קטן מציע תוספת 3 ליטר שמן SKR לכל מדחס כאשר קיימת עדות לדגם SCR.",
    },
    {
      category: "BELT",
      canonicalItemName: "Belts",
      itemName: "רצועות",
      aliases: ["Belts", "Belt", "רצועות", "רצועה"],
      itemType: "PART",
      quantity: equipmentCount,
      reason:
        "Service report evidence mentions belts, so a belt line is suggested for internal review.",
    },
  ];

  partDefinitions.forEach((definition) => {
    const row = rowsByCategory.get(definition.category);
    const includeWithoutRegistryRow =
      definition.category === "AIR_FILTER" ||
      definition.category === "OIL_FILTER" ||
      definition.category === "OIL_COOLANT" ||
      (definition.category === "OIL_SEPARATOR" && serviceInterval === "Large Service") ||
      (definition.category === "BELT" && beltRelevant);

    if (!row && !includeWithoutRegistryRow) {
      return;
    }
    const rowEvidence = row
      ? `עדות יצרן פנימית: ${row.manufacturer} ${row.model}, קטגוריה ${row.partCategory}, מקור ${row.sourceSheet} שורה ${row.sourceRow}.`
      : `שורת תחזוקה סטנדרטית נוספה בגלל זיהוי ${serviceInterval}; מק"ט/מחיר מדויק לא נמצאו ודורשים בדיקה.`;

    candidates.push({
      itemName: definition.itemName,
      description: [
        definition.reason,
        rowEvidence,
        "מק\"ט יצרן נשאר עדות פנימית בלבד ואינו מוצג ללקוח ללא מק\"ט מכירה מאושר של טל.",
      ].join(" "),
      canonicalItemName: definition.canonicalItemName,
      aliases: definition.aliases,
      quantity: definition.quantity,
      itemType: definition.itemType,
      reason: definition.reason,
      evidenceSource: row
        ? `ManufacturerServiceKit:${row.model}:${row.partCategory}`
        : `StandardMaintenanceRule:${serviceInterval}:${definition.category}`,
      defaultUnitPrice: null,
      defaultPriceNote:
        row
          ? "עדות היצרן תומכת בזיהוי הפריט, אך לא קובעת מחיר מכירה ללקוח."
          : "השורה נוספה מציפיית תחזוקה סטנדרטית; מחיר מדויק חסר ודורש בדיקת מחיר.",
      quantityNeedsApproval: true,
      sourceCertainty: row ? "Medium" : "Low",
    });
  });

  return candidates;
}

function buildBaseServiceCandidates(
  report: ServiceReportForDraft,
): DraftLineCandidate[] {
  const equipmentCount = Math.max(report.equipmentItems.length, 1);

  return [
    {
      canonicalItemName: "Technician Visit / Travel",
      itemName: "ביקור טכנאי ונסיעה",
      aliases: ["Technician Visit / Travel", "Technician Visit", "Travel", "ביקור טכנאי ונסיעה"],
      description:
        "ביקור הטכנאי והנסיעה מוצגים כשורת שירות אחת לפי כללי המסחור הקיימים לשירות שטח.",
      quantity: 1,
      itemType: "VISIT",
      reason: "כל דוח שירות שטח דורש בדיקת ביקור ונסיעה לפני אישור מסחרי.",
      evidenceSource: "ServiceCommercialRules:TechnicianVisitTravel",
      defaultUnitPrice: 300,
      defaultPriceNote:
        "כלל ברירת מחדל מכללי השירות המסחריים; עדיין נדרשת בדיקה אם חסרה היסטוריית לקוח או שיש סתירה.",
      quantityNeedsApproval: false,
      sourceCertainty: "Medium",
    },
    {
      canonicalItemName: "Labor + Service",
      itemName: "עבודת טכנאי ושירות",
      aliases: ["Labor + Service", "Labor", "Service", "עבודת טכנאי ושירות"],
      description:
        "עבודת הטכנאי מוצגת כשורת שירות נפרדת. פירוט נוסף יתווסף רק כאשר קיימת עדות שירות מספקת.",
      quantity: Number(report.technicianWorkHours ?? 0) || equipmentCount,
      itemType: "SERVICE",
      reason:
        report.technicianWorkHours !== null
          ? "קיימות שעות עבודה בדוח השירות."
          : "שעות העבודה חסרות; הכמות הוסקה ממספר הנכסים ולכן דורשת בדיקה.",
      evidenceSource: "ServiceCommercialRules:LaborService",
      defaultUnitPrice: 275,
      defaultPriceNote:
        "כלל ברירת מחדל לעבודה ושירות מתוך ידע תפעולי היסטורי; שעות ומחיר סופיים דורשים בדיקה.",
      quantityNeedsApproval: report.technicianWorkHours === null,
      sourceCertainty: "Medium",
    },
  ];
}

function matchesLineName(candidate: DraftLineCandidate, historyName: string) {
  const candidateNames = [
    candidate.canonicalItemName,
    candidate.itemName,
    ...candidate.aliases,
  ].map(normalizeText);
  const history = normalizeText(historyName);

  return candidateNames.some(
    (name) => name === history || name.includes(history) || history.includes(name),
  );
}

function scoreHistoricalLine(
  candidate: DraftLineCandidate,
  history: HistoricalLine,
  report: ServiceReportForDraft,
  currentModels: string[],
) {
  if (!matchesLineName(candidate, history.itemName)) {
    return 0;
  }

  let score = 10;

  if (history.customerId && history.customerId === report.customerId) {
    score += 100;
  }

  const historicalModels = history.equipmentModels.map(normalizeModel);
  const normalizedCurrentModels = currentModels.map(normalizeModel);

  if (
    historicalModels.some((model) => normalizedCurrentModels.includes(model))
  ) {
    score += 70;
  }

  const currentFamilies = currentModels.map(extractModelFamily);
  const historicalFamilies = history.equipmentModels.map(extractModelFamily);

  if (historicalFamilies.some((family) => currentFamilies.includes(family))) {
    score += 30;
  }

  if (history.approvalStatus === ApprovalStatus.APPROVED) {
    score += 20;
  }

  return score;
}

function choosePriceEvidence(
  candidate: DraftLineCandidate,
  history: HistoricalLine[],
  catalog: CatalogEvidence[],
  partsHistory: PartsHistoryEvidence[],
  report: ServiceReportForDraft,
  currentModels: string[],
) {
  const rankedHistory = history
    .map((line) => ({
      line,
      score: scoreHistoricalLine(candidate, line, report, currentModels),
    }))
    .filter((item) => item.score > 0)
    .sort((left, right) => right.score - left.score);

  const best = rankedHistory[0];

  if (best) {
    const sameCustomer = best.line.customerId === report.customerId;
    const exactModel = best.line.equipmentModels
      .map(normalizeModel)
      .some((model) => currentModels.map(normalizeModel).includes(model));
    const confidence: ConfidenceLabel =
      sameCustomer || exactModel ? "High" : "Medium";
    const source = sameCustomer
      ? "BusinessDocumentItems:SameCustomer"
      : exactModel
        ? "BusinessDocumentItems:SameEquipment"
        : "BusinessDocumentItems:ApprovedHistory";

    return {
      unitPrice: best.line.unitPrice,
      totalPrice: best.line.unitPrice * candidate.quantity,
      source,
      confidence,
      needsApproval: confidence !== "High" || candidate.quantityNeedsApproval,
      pricingEvidence: [
        {
          source: `BusinessDocumentItems:${best.line.sourceDocumentId}`,
          unitPrice: best.line.unitPrice.toFixed(2),
          total: (best.line.unitPrice * candidate.quantity).toFixed(2),
          confidence,
          note: [
            `נמצאה שורת ${best.line.sourceDocumentType} מאושרת "${best.line.itemName}" מדוח ${best.line.sourceReportCounter ?? "לא ידוע"}.`,
            `לקוח היסטורי: ${best.line.customerName}.`,
            `עדות מדחס היסטורית: ${formatModelList(best.line.equipmentModels)}.`,
          ].join(" "),
        },
      ],
      missingEvidence: [] as string[],
    };
  }

  const catalogMatch = catalog.find((product) => {
    const productText = normalizeText(
      [product.itemName, product.sku ?? "", product.compatibleEquipment ?? ""].join(" "),
    );
    const candidateNames = [
      candidate.canonicalItemName,
      candidate.itemName,
      ...candidate.aliases,
    ].map(normalizeText);

    return candidateNames.some(
      (name) => name && (productText.includes(name) || name.includes(productText)),
    );
  });

  if (catalogMatch?.sellingPrice !== null && catalogMatch?.sellingPrice !== undefined) {
    return {
      unitPrice: catalogMatch.sellingPrice,
      totalPrice: catalogMatch.sellingPrice * candidate.quantity,
      source: "ProductCatalog",
      confidence: "High" as ConfidenceLabel,
      needsApproval: candidate.quantityNeedsApproval,
      pricingEvidence: [
        {
          source: `ProductsCatalog:${catalogMatch.sourceProductId}`,
          unitPrice: catalogMatch.sellingPrice.toFixed(2),
          total: (catalogMatch.sellingPrice * candidate.quantity).toFixed(2),
          confidence: "High" as ConfidenceLabel,
          note: [
            `Catalog match for ${candidate.canonicalItemName}.`,
            catalogMatch.sku ? `SKU ${catalogMatch.sku}.` : "",
            catalogMatch.compatibleEquipment
              ? `Compatible equipment: ${catalogMatch.compatibleEquipment}.`
              : "",
          ]
            .filter(Boolean)
            .join(" "),
        },
      ],
      missingEvidence: [] as string[],
    };
  }

  const partsMatch = partsHistory.find((part) => {
    const partText = normalizeText([part.partName, part.partSku ?? ""].join(" "));
    const candidateNames = [
      candidate.canonicalItemName,
      candidate.itemName,
      ...candidate.aliases,
    ].map(normalizeText);

    return candidateNames.some(
      (name) => name && (partText.includes(name) || name.includes(partText)),
    );
  });

  if (candidate.defaultUnitPrice !== null) {
    return {
      unitPrice: candidate.defaultUnitPrice,
      totalPrice: candidate.defaultUnitPrice * candidate.quantity,
      source: "BusinessCase",
      confidence: "Medium" as ConfidenceLabel,
      needsApproval: true,
      pricingEvidence: [
        {
          source: candidate.evidenceSource,
          unitPrice: candidate.defaultUnitPrice.toFixed(2),
          total: (candidate.defaultUnitPrice * candidate.quantity).toFixed(2),
          confidence: "Medium" as ConfidenceLabel,
          note: candidate.defaultPriceNote,
        },
      ],
      missingEvidence: [
        `לא נמצאה עדות מחיר מכירה היסטורית מאושרת עבור ${candidate.itemName}.`,
        catalogMatch
          ? `ProductsCatalog matched ${catalogMatch.sourceProductId}, but no usable selling price was available.`
          : "ProductsCatalog was checked but no direct priced match was available.",
        partsMatch
          ? `PartsUsed history matched ${partsMatch.partName || partsMatch.partSku} on report ${
              partsMatch.reportCounter ?? "unknown"
            }, but it does not provide a selling price.`
          : "PartsUsed history was checked but no matching priced usage was available.",
      ],
    };
  }

  return {
    unitPrice: null,
    totalPrice: null,
    source: candidate.evidenceSource,
    confidence: "Low" as ConfidenceLabel,
    needsApproval: true,
    pricingEvidence: [
      {
        source: candidate.evidenceSource,
        unitPrice: "Needs Price Review",
        total: "Needs Price Review",
        confidence: "Low" as ConfidenceLabel,
        note: candidate.defaultPriceNote,
      },
      ...(partsMatch
        ? [
            {
              source: "PartsUsed",
              unitPrice: "Needs Price Review",
              total: "Needs Price Review",
              confidence: "Low" as ConfidenceLabel,
              note: `Parts history evidence found ${
                partsMatch.partName || partsMatch.partSku
              } on report ${partsMatch.reportCounter ?? "unknown"}; quantity ${
                partsMatch.quantity ?? "unknown"
              }; selling price still missing.`,
            },
          ]
        : []),
    ],
    missingEvidence: [
      `לא נמצאה עדות מחיר מכירה היסטורית מאושרת עבור ${candidate.itemName}.`,
      catalogMatch
        ? `ProductsCatalog matched ${catalogMatch.sourceProductId}, but no usable selling price was available.`
        : "ProductsCatalog was checked but no direct priced match was available.",
      partsMatch
        ? `PartsUsed history matched ${partsMatch.partName || partsMatch.partSku}, but no selling price was available.`
        : "PartsUsed history was checked but no matching usage was available.",
    ],
  };
}

function uniqueStrings(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

function buildKnowledgeEvidence(
  report: ServiceReportForDraft,
  serviceInterval: string,
  history: HistoricalLine[],
  catalog: CatalogEvidence[],
  partsHistory: PartsHistoryEvidence[],
  candidates: DraftLineCandidate[],
) {
  const currentModels = report.equipmentItems
    .map((item) => readText(item.equipmentModel))
    .filter(Boolean);
  const currentSerials = report.equipmentItems
    .map((item) => readText(item.serialNumber))
    .filter(Boolean);
  const currentFamilies = uniqueStrings(currentModels.map(extractModelFamily));
  const sameCustomerHistory = history.filter(
    (line) => line.customerId === report.customerId,
  );
  const sameModelHistory = history.filter((line) =>
    line.equipmentModels
      .map(normalizeModel)
      .some((model) => currentModels.map(normalizeModel).includes(model)),
  );
  const sameFamilyHistory = history.filter((line) =>
    line.equipmentModels
      .map(extractModelFamily)
      .some((family) => currentFamilies.includes(family)),
  );
  const kitEvidenceCount = candidates.filter((candidate) =>
    candidate.evidenceSource.startsWith("ManufacturerServiceKit"),
  ).length;

  return [
    {
      source: "היסטוריית אותו לקוח",
      status: sameCustomerHistory.length ? "Used" : "Missing",
      explanation: sameCustomerHistory.length
        ? `נמצאו ${sameCustomerHistory.length} שורות היסטוריות מאושרות עבור לקוח זה.`
        : "עדיין אין היסטוריית מחירי BusinessDocumentItem מאושרת עבור לקוח זה.",
    },
    {
      source: "אותו מספר סידורי",
      status: currentSerials.length ? "Used" : "Missing",
      explanation: currentSerials.length
        ? `נמצאו מספרים סידוריים בדוח השירות: ${currentSerials.join(", ")}.`
        : "לא נמצא מספר סידורי בדוח השירות ולכן לא ניתן לבצע התאמה לפי מדחס ספציפי.",
    },
    {
      source: "אותו דגם מדחס",
      status: sameModelHistory.length ? "Used" : "Missing",
      explanation: sameModelHistory.length
        ? `${sameModelHistory.length} שורות מאושרות התאימו לאותו דגם מדחס.`
        : `לא נמצאה שורה היסטורית מאושרת שתואמת בדיוק את ${formatModelList(currentModels)}.`,
    },
    {
      source: "אותה משפחת מדחס",
      status: sameFamilyHistory.length ? "Used" : "Missing",
      explanation: sameFamilyHistory.length
        ? `${sameFamilyHistory.length} שורות מאושרות התאימו למשפחת המדחס.`
        : "עדיין אין עדות מחיר מאושרת לפי משפחת מדחס.",
    },
    {
      source: "אותו יצרן",
      status: currentModels.some((model) => normalizeText(model).includes("SCR"))
        ? "Used"
        : "Missing",
      explanation: currentModels.some((model) => normalizeText(model).includes("SCR"))
        ? "קיימת עדות יצרן/דגם SCR בדוח השירות."
        : "לא ניתן להסיק בבטחה עדות יצרן מדוח השירות.",
    },
    {
      source: "אותו מרווח טיפול",
      status: serviceInterval === "Unknown Service Interval" ? "Missing" : "Used",
      explanation:
        serviceInterval === "Unknown Service Interval"
          ? "לא זוהתה עדות ל-2000/2500/4000/5000 שעות או לטיפול קטן/גדול."
          : `זוהה ${formatServiceIntervalHebrew(serviceInterval)} מתוך דוח השירות או פרטי הציוד.`,
    },
    {
      source: "אותו סוג BusinessCase",
      status: "Used",
      explanation:
        "המקור הוא BusinessCase מסוג ServiceReport ולכן חלים כללי מסחור של שירות שטח.",
    },
    {
      source: "אותה ערכת שירות",
      status: kitEvidenceCount ? "Used" : "Missing",
      explanation: kitEvidenceCount
        ? `נמצאו ${kitEvidenceCount} מועמדי שורות מערכת שירות מתוך שורות יצרן שעברו בדיקה.`
        : "לא נמצאה שורת ערכת שירות מאושרת שתואמת בדיוק לדגם ולמרווח הטיפול.",
    },
    {
      source: "אותם חלקי חילוף",
      status: kitEvidenceCount ? "Used" : "Missing",
      explanation: kitEvidenceCount
        ? "מועמדי חלקי החילוף הגיעו מהתאמה של דגם מדויק וקטגוריית חלק ברישום היצרן."
        : "לא נמצא מועמד חלק חילוף בטוח מספיק להוספה.",
    },
    {
      source: "ProductsCatalog",
      status: catalog.length ? "Used" : "Missing",
      explanation: catalog.length
        ? `${catalog.length} שורות קטלוג עם מחיר מכירה היו זמינות לבדיקת מחיר.`
        : "ProductsCatalog נבדק; אין כרגע שורות מוצר מתומחרות בנתוני ה-staging המיובאים.",
    },
    {
      source: "PartsUsed",
      status: partsHistory.length ? "Used" : "Missing",
      explanation: partsHistory.length
        ? `${partsHistory.length} שורות PartsUsed היו זמינות כעדות שימוש.`
        : "PartsUsed נבדק; אין כרגע היסטוריית חלקים מיובאת שתואמת לריצה זו.",
    },
    {
      source: "BusinessDocuments היסטוריים מאושרים",
      status: history.length ? "Used" : "Missing",
      explanation: history.length
        ? `זמינות ${history.length} שורות היסטוריות מאושרות עם מחיר.`
        : "אין היסטוריית BusinessDocumentItem מאושרת עם מחיר.",
    },
    {
      source: "תיקוני משתמש מאושרים",
      status: history.length ? "Used" : "Missing",
      explanation: history.length
        ? "ערכי BusinessDocumentItem מאושרים משמשים כעדות למידה מצטברת בלבד."
        : "עדיין אין עדות תיקון משתמש מאושרת.",
    },
    {
      source: "היסטוריית אחריות",
      status: "Missing",
      explanation:
        "אין כרגע מקור אחריות מאושר בריצה זו, לכן לא הוסקה החלטת אחריות.",
    },
    {
      source: "היסטוריה מסחרית של הלקוח",
      status: sameCustomerHistory.length ? "Used" : "Missing",
      explanation: sameCustomerHistory.length
        ? "היסטוריה מסחרית של הלקוח שימשה לבדיקת מחירים קודמים."
        : "לא נמצאה היסטוריה מסחרית מאושרת של הלקוח.",
    },
  ] satisfies KnowledgeEvidence[];
}

function buildHebrewDraftTitle(
  report: ServiceReportForDraft,
  documentType: BusinessDocumentType,
  serviceInterval: string,
) {
  const customerName = readText(report.customer?.name);
  const models = uniqueStrings(
    report.equipmentItems
      .map((item) => readText(item.equipmentModel))
      .filter(Boolean),
  );
  const serials = uniqueStrings(
    report.equipmentItems
      .map((item) => readText(item.serialNumber))
      .filter(Boolean),
  );
  const reportNumber = report.reportCounter ?? report.reportNumberText ?? report.appsheetReportId;
  const titleParts = [
    DOCUMENT_TYPE_HEBREW_LABELS[documentType],
    `${formatServiceIntervalHebrew(serviceInterval)}`,
    `דוח שירות ${reportNumber}`,
    customerName,
    models[0],
    serials[0] ? `S/N ${serials[0]}` : "",
  ].filter(Boolean);

  return titleParts.join(" - ");
}

function buildHebrewBusinessSummary(
  report: ServiceReportForDraft,
  documentType: BusinessDocumentType,
  serviceInterval: string,
) {
  const reportNumber = report.reportCounter ?? report.reportNumberText ?? report.appsheetReportId;
  const customerName = readText(report.customer?.name, "הלקוח");
  const workPerformed = readText(report.workPerformed);
  const technicianSummary = readText(report.technicianSummary);
  const recommendations = readText(report.recommendations);
  const equipmentEvidence = report.equipmentItems
    .map((item) =>
      [
        readText(item.equipmentModel),
        readText(item.serialNumber) ? `S/N ${readText(item.serialNumber)}` : "",
      ]
        .filter(Boolean)
        .join(" "),
    )
    .filter(Boolean)
    .join(", ");

  return [
    `טיוטת ${DOCUMENT_TYPE_HEBREW_LABELS[documentType]} פנימית הוכנה מדוח שירות ${reportNumber} עבור ${customerName}.`,
    `סוג טיפול מזוהה: ${formatServiceIntervalHebrew(serviceInterval)}.`,
    equipmentEvidence ? `ציוד רלוונטי: ${equipmentEvidence}.` : "לא נמצאה עדות ציוד מלאה.",
    workPerformed ? `עבודה שבוצעה: ${workPerformed}.` : "",
    technicianSummary ? `סיכום טכנאי: ${technicianSummary}.` : "",
    recommendations ? `המלצות להמשך: ${recommendations}.` : "",
    "לא בוצעה שליחה ללקוח, הפקת חשבונית, הפקת קבלה, Maven, Invoice4U, שינוי מלאי או פעולה חיצונית.",
  ]
    .filter(Boolean)
    .join(" ");
}

function decideBusinessIntentHebrew(
  report: ServiceReportForDraft,
  documentType: BusinessDocumentType,
) {
  const recommendationText = [
    report.recommendations,
    ...report.equipmentItems.map((item) => item.technicianRecommendations),
  ]
    .map((value) => readText(value).toLowerCase())
    .join(" ");

  if (documentType === BusinessDocumentType.INVOICE) {
    return "חיוב לקוח";
  }

  if (recommendationText) {
    return "הצעת עבודה נוספת";
  }

  return "הצעת עבודה";
}

export async function buildProductionDraftRecommendation(
  serviceReportId: string,
  documentType: BusinessDocumentType = BusinessDocumentType.QUOTE,
): Promise<ProductionDraftRecommendation | null> {
  const report = await loadServiceReportForDraft(serviceReportId);

  if (!report) {
    return null;
  }

  const serviceInterval = detectServiceInterval(report);
  const history = await loadHistoricalLines(report);
  const catalog = await loadCatalogEvidence();
  const partsHistory = await loadPartsHistoryEvidence(report);
  const currentModels = report.equipmentItems
    .map((item) => readText(item.equipmentModel))
    .filter(Boolean);
  const candidates = [
    ...buildServiceKitCandidates(report, serviceInterval),
    ...buildBaseServiceCandidates(report),
  ];
  const knowledgeUsed = buildKnowledgeEvidence(
    report,
    serviceInterval,
    history,
    catalog,
    partsHistory,
    candidates,
  );

  const lines = candidates.map((candidate): ProductionDraftLineRecommendation => {
    const price = choosePriceEvidence(
      candidate,
      history,
      catalog,
      partsHistory,
      report,
      currentModels,
    );
    const unitPrice = money(price.unitPrice);
    const totalPrice = money(price.totalPrice);
    const confidenceLabel = CONFIDENCE_HEBREW_LABELS[price.confidence];

    return {
      itemName: candidate.itemName,
      quantity: candidate.quantity.toString(),
      unitPrice,
      totalPrice,
      confidence: price.confidence,
      confidenceLabel,
      needsApproval: price.needsApproval || candidate.quantityNeedsApproval,
      itemType: candidate.itemType,
      source: price.source,
      description: [
        candidate.description,
        candidate.reason,
        price.missingEvidence.join(" "),
      ]
        .filter(Boolean)
        .join(" "),
      pricingEvidence: price.pricingEvidence,
      explanation: `${candidate.itemName}: ${candidate.reason} רמת ביטחון: ${confidenceLabel}.`,
      missingEvidence: price.missingEvidence,
    };
  });

  if (!lines.length) {
    lines.push({
      itemName: `בדיקת דוח שירות ${report.reportCounter ?? report.appsheetReportId}`,
      quantity: "1",
      unitPrice: "Needs Price Review",
      totalPrice: "Needs Price Review",
      confidence: "Low",
      confidenceLabel: CONFIDENCE_HEBREW_LABELS.Low,
      needsApproval: true,
      itemType: "SERVICE",
      source: "BusinessCase",
      description:
        "המערכת מיצתה את ידע הלקוח, הציוד, ערכות השירות והמסמכים המאושרים, אך לא הצליחה לגזור שורות מסחריות ספציפיות בבטחה.",
      pricingEvidence: [
        {
          source: "BusinessCase",
          unitPrice: "Needs Price Review",
          total: "Needs Price Review",
          confidence: "Low",
          note: "שורת בדיקה לאחר מיצוי ידע קיים.",
        },
      ],
      explanation:
        "נוצרה שורת בדיקה משום שהידע הקיים אינו מספיק ליצירת שורות ספציפיות.",
      missingEvidence: [
        "לא נמצאה עדות בטוחה מערכת שירות, חלקי חילוף, קטלוג מוצרים או BusinessDocumentItem מאושר ליצירת שורה ספציפית.",
      ],
    });
  }

  const missingEvidence = uniqueStrings([
    ...knowledgeUsed
      .filter((item) => item.status !== "Used")
      .map((item) => `${item.source}: ${item.explanation}`),
    ...lines.flatMap((line) => line.missingEvidence),
    ...lines
      .filter((line) => line.needsApproval)
      .map((line) => `${line.itemName} דורש בדיקה לפני אישור או פעולה חיצונית.`),
  ]);
  const high = lines.filter((line) => line.confidence === "High").length;
  const medium = lines.filter((line) => line.confidence === "Medium").length;
  const low = lines.filter((line) => line.confidence === "Low").length;
  const priced = lines.filter((line) => line.unitPrice !== "Needs Price Review").length;
  const businessIntent = decideBusinessIntentHebrew(report, documentType);

  return {
    serviceReportId: report.appsheetReportId,
    documentType,
    detectedMaintenanceType: serviceInterval,
    title: buildHebrewDraftTitle(report, documentType, serviceInterval),
    description: `${buildHebrewBusinessSummary(
      report,
      documentType,
      serviceInterval,
    )} כוונה עסקית מומלצת: ${businessIntent}.`,
    lines,
    gatewayLines: lines.map((line) => ({
      itemName: line.itemName,
      description: line.description,
      quantity: line.quantity,
      unitPrice: line.unitPrice,
      totalPrice: line.totalPrice,
      source: line.source,
      itemType: line.itemType,
      confidence: line.confidence,
      needsApproval: line.needsApproval,
      pricingEvidence: line.pricingEvidence as unknown as Prisma.InputJsonValue,
      rawSource: {
        source: "PRODUCTION_DRAFT_GENERATION",
        detectedMaintenanceType: serviceInterval,
        evidenceSource: line.source,
        explanation: line.explanation,
        missingEvidence: line.missingEvidence,
        confidenceLabel: line.confidenceLabel,
        noMavenAction: true,
        noInvoice4UAction: true,
        noEmailAction: true,
        noInventoryAction: true,
      },
    })),
    knowledgeUsed,
    missingEvidence,
    confidenceSummary: `${lines.length} שורות נוצרו: ${high} בביטחון גבוה, ${medium} בביטחון בינוני, ${low} בביטחון נמוך; ${priced} שורות כוללות מחיר מוצע.`,
    explainabilitySummary: lines.map((line) => line.explanation).join(" "),
    qualitySummary: `נוצרו ${lines.length} שורות ניתנות לבדיקה מתוך ידע קיים. ${priced} שורות כוללות מחיר מוצע; ${lines.length - priced} שורות דורשות בדיקת מחיר.`,
    estimatedManualWorkReduction: `המשתמש מתחיל מ-${lines.length} שורות מוכנות במקום מטיוטה ריקה; ${priced} שורות חוסכות בדיקת מחיר ראשונית ידנית.`,
  };
}
