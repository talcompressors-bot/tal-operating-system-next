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
  itemName: string;
  description: string;
  quantity: number;
  itemType: string;
  reason: string;
  evidenceSource: string;
  defaultUnitPrice: number | null;
  defaultPriceNote: string;
  quantityNeedsApproval: boolean;
};

export type ProductionDraftLineRecommendation = {
  itemName: string;
  quantity: string;
  unitPrice: string;
  totalPrice: string;
  confidence: ConfidenceLabel;
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

function readText(value: unknown, fallback = "") {
  if (value === undefined || value === null) {
    return fallback;
  }

  const text = String(value).trim();
  return text || fallback;
}

function money(value: number | null) {
  return value === null ? "Needs approval" : value.toFixed(2);
}

function normalizeText(value: string) {
  return value.toUpperCase().replace(/[^A-Z0-9א-ת]/g, "");
}

function normalizeModel(value: string) {
  return normalizeText(value).replace(/^SCR/, "");
}

function formatModelList(models: string[]) {
  return models.length ? models.join(", ") : "No model evidence";
}

function extractModelFamily(model: string) {
  const normalized = normalizeModel(model);
  const letters = normalized.replace(/[0-9]/g, "");

  return letters || normalized;
}

function detectServiceInterval(report: ServiceReportForDraft) {
  const text = [
    report.serviceType,
    report.serviceDescription,
    report.workPerformed,
    report.technicianSummary,
    report.recommendations,
    ...report.equipmentItems.flatMap((item) => [
      item.serviceDescription,
      item.technicianRecommendations,
      item.nextService,
    ]),
  ]
    .map((value) => readText(value).toLowerCase())
    .join(" ");

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
  serviceInterval: string,
): DraftLineCandidate[] {
  const equipmentCount = Math.max(report.equipmentItems.length, 1);
  const models = report.equipmentItems
    .map((item) => readText(item.equipmentModel))
    .filter(Boolean);
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
      itemName: "Air Filter",
      itemType: "PART",
      quantity: equipmentCount,
      reason: "Service-kit knowledge indicates an air filter for this model/service interval.",
    },
    {
      category: "OIL_FILTER",
      itemName: "Oil Filter",
      itemType: "PART",
      quantity: equipmentCount,
      reason: "Service-kit knowledge indicates an oil filter for this model/service interval.",
    },
    {
      category: "OIL_SEPARATOR",
      itemName: "Oil Separator",
      itemType: "PART",
      quantity: equipmentCount,
      reason: "Large-service knowledge indicates an oil separator for this model/service interval.",
    },
    {
      category: "OIL_COOLANT",
      itemName:
        serviceInterval === "Large Service"
          ? "SCR oil replacement / coolant"
          : "3L SKR oil top-up",
      itemType: "PART",
      quantity:
        serviceInterval === "Large Service" ? equipmentCount : equipmentCount * 3,
      reason:
        serviceInterval === "Large Service"
          ? "Large-service oil/coolant handling exists, but final oil action remains review-required."
          : "Small-service rule uses 3L SKR oil top-up per compressor when SCR model/service evidence exists.",
    },
  ];

  partDefinitions.forEach((definition) => {
    const row = rowsByCategory.get(definition.category);

    if (!row) {
      return;
    }

    candidates.push({
      itemName: definition.itemName,
      description: [
        definition.reason,
        `Internal manufacturer evidence: ${row.manufacturer} ${row.model}, ${row.partCategory}, source ${row.sourceSheet} row ${row.sourceRow}.`,
        "Manufacturer SKU is internal evidence only and is not customer-facing unless a trusted Tal sales SKU exists.",
      ].join(" "),
      quantity: definition.quantity,
      itemType: definition.itemType,
      reason: definition.reason,
      evidenceSource: `ManufacturerServiceKit:${row.model}:${row.partCategory}`,
      defaultUnitPrice: null,
      defaultPriceNote:
        "Manufacturer evidence supports the part identity, not the customer selling price.",
      quantityNeedsApproval: true,
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
      itemName: "Technician Visit / Travel",
      description:
        "Technician Visit and Travel are represented as one commercial line according to Service Commercial Rules.",
      quantity: 1,
      itemType: "VISIT",
      reason: "Every field service report requires travel/visit review before commercial approval.",
      evidenceSource: "ServiceCommercialRules:TechnicianVisitTravel",
      defaultUnitPrice: 300,
      defaultPriceNote:
        "Fixed default rule from Service Commercial Rules; still review-required when customer/service history conflicts or is missing.",
      quantityNeedsApproval: false,
    },
    {
      itemName: "Labor + Service",
      description:
        "Labor and service are one commercial line unless explicitly approved otherwise.",
      quantity: Number(report.technicianWorkHours ?? 0) || equipmentCount,
      itemType: "SERVICE",
      reason:
        report.technicianWorkHours !== null
          ? "Technician work hours are available on the ServiceReport."
          : "Technician work hours are missing; quantity is inferred from asset count.",
      evidenceSource: "ServiceCommercialRules:LaborService",
      defaultUnitPrice: 275,
      defaultPriceNote:
        "Default labor/service rule from historical operating knowledge; final hours and price remain review-required.",
      quantityNeedsApproval: report.technicianWorkHours === null,
    },
  ];
}

function matchesLineName(candidateName: string, historyName: string) {
  const candidate = normalizeText(candidateName);
  const history = normalizeText(historyName);

  return candidate === history || candidate.includes(history) || history.includes(candidate);
}

function scoreHistoricalLine(
  candidate: DraftLineCandidate,
  history: HistoricalLine,
  report: ServiceReportForDraft,
  currentModels: string[],
) {
  if (!matchesLineName(candidate.itemName, history.itemName)) {
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
            `Approved ${best.line.sourceDocumentType} line "${best.line.itemName}" from report ${best.line.sourceReportCounter ?? "unknown"}.`,
            `Historical customer: ${best.line.customerName}.`,
            `Historical compressor evidence: ${formatModelList(best.line.equipmentModels)}.`,
          ].join(" "),
        },
      ],
      missingEvidence: [] as string[],
    };
  }

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
        `No approved historical selling-price evidence was found for ${candidate.itemName}.`,
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
        unitPrice: "Needs approval",
        total: "Needs approval",
        confidence: "Low" as ConfidenceLabel,
        note: candidate.defaultPriceNote,
      },
    ],
    missingEvidence: [
      `No approved historical selling-price evidence was found for ${candidate.itemName}.`,
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
  candidates: DraftLineCandidate[],
) {
  const currentModels = report.equipmentItems
    .map((item) => readText(item.equipmentModel))
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
      source: "Same customer history",
      status: sameCustomerHistory.length ? "Used" : "Missing",
      explanation: sameCustomerHistory.length
        ? `${sameCustomerHistory.length} approved historical line(s) exist for this customer.`
        : "No approved customer-specific BusinessDocumentItem pricing history exists yet.",
    },
    {
      source: "Same compressor model",
      status: sameModelHistory.length ? "Used" : "Missing",
      explanation: sameModelHistory.length
        ? `${sameModelHistory.length} approved line(s) match the same compressor model.`
        : `No approved historical line matched ${formatModelList(currentModels)} exactly.`,
    },
    {
      source: "Same compressor family",
      status: sameFamilyHistory.length ? "Used" : "Missing",
      explanation: sameFamilyHistory.length
        ? `${sameFamilyHistory.length} approved line(s) matched the same compressor family.`
        : "No approved compressor-family pricing evidence exists yet.",
    },
    {
      source: "Same manufacturer",
      status: currentModels.some((model) => normalizeText(model).includes("SCR"))
        ? "Used"
        : "Missing",
      explanation: currentModels.some((model) => normalizeText(model).includes("SCR"))
        ? "SCR manufacturer/model evidence exists on the ServiceReport."
        : "No manufacturer evidence could be safely inferred from the ServiceReport.",
    },
    {
      source: "Same maintenance interval",
      status: serviceInterval === "Unknown Service Interval" ? "Missing" : "Used",
      explanation:
        serviceInterval === "Unknown Service Interval"
          ? "No 2000/2500/4000/5000 or small/large service evidence was detected."
          : `${serviceInterval} was detected from ServiceReport/equipment text.`,
    },
    {
      source: "Same BusinessCase type",
      status: "Used",
      explanation:
        "The source is a ServiceReport BusinessCase, so field-service commercial rules apply.",
    },
    {
      source: "Same service kit",
      status: kitEvidenceCount ? "Used" : "Missing",
      explanation: kitEvidenceCount
        ? `${kitEvidenceCount} service-kit line candidate(s) were found from reviewed manufacturer registry rows.`
        : "No exact reviewed service-kit row matched the current model/interval.",
    },
    {
      source: "Same spare parts",
      status: kitEvidenceCount ? "Used" : "Missing",
      explanation: kitEvidenceCount
        ? "Spare-part candidates came from exact model + part-category registry rows."
        : "No spare-part candidate was safe enough to include.",
    },
    {
      source: "Approved historical BusinessDocuments",
      status: history.length ? "Used" : "Missing",
      explanation: history.length
        ? `${history.length} approved historical priced line(s) are available.`
        : "No approved priced BusinessDocumentItem history exists.",
    },
    {
      source: "Approved historical user corrections",
      status: history.length ? "Used" : "Missing",
      explanation: history.length
        ? "Approved BusinessDocumentItem values are treated as append-only learning evidence."
        : "No approved user correction evidence exists yet.",
    },
  ] satisfies KnowledgeEvidence[];
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
    candidates,
  );

  const lines = candidates.map((candidate): ProductionDraftLineRecommendation => {
    const price = choosePriceEvidence(candidate, history, report, currentModels);
    const unitPrice = money(price.unitPrice);
    const totalPrice = money(price.totalPrice);

    return {
      itemName: candidate.itemName,
      quantity: candidate.quantity.toString(),
      unitPrice,
      totalPrice,
      confidence: price.confidence,
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
      explanation: `${candidate.itemName}: ${candidate.reason} Price confidence is ${price.confidence}.`,
      missingEvidence: price.missingEvidence,
    };
  });

  if (!lines.length) {
    lines.push({
      itemName: `Service Report ${report.reportCounter ?? report.appsheetReportId}`,
      quantity: "1",
      unitPrice: "Needs approval",
      totalPrice: "Needs approval",
      confidence: "Low",
      needsApproval: true,
      itemType: "SERVICE",
      source: "BusinessCase",
      description:
        "The generator exhausted current customer, equipment, service-kit, and approved document knowledge but could not safely derive specific commercial lines.",
      pricingEvidence: [
        {
          source: "BusinessCase",
          unitPrice: "Needs approval",
          total: "Needs approval",
          confidence: "Low",
          note: "Fallback review line after exhausting existing knowledge.",
        },
      ],
      explanation:
        "Fallback review line created because existing knowledge was insufficient for specific line generation.",
      missingEvidence: [
        "No safe service-kit, spare-part, product-catalog, or approved BusinessDocumentItem evidence produced a specific line.",
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
      .map((line) => `${line.itemName} remains review-required before approval or external action.`),
  ]);
  const high = lines.filter((line) => line.confidence === "High").length;
  const medium = lines.filter((line) => line.confidence === "Medium").length;
  const low = lines.filter((line) => line.confidence === "Low").length;
  const priced = lines.filter((line) => line.unitPrice !== "Needs approval").length;

  return {
    serviceReportId: report.appsheetReportId,
    documentType,
    title: `${documentType} Draft - Service Report ${
      report.reportCounter ?? report.appsheetReportId
    }`,
    description: `Internal ${documentType} draft generated from existing ServiceReport, service-kit, customer history, and approved BusinessDocument evidence. No external action was executed.`,
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
        explanation: line.explanation,
        missingEvidence: line.missingEvidence,
        noMavenAction: true,
        noInvoice4UAction: true,
        noEmailAction: true,
        noInventoryAction: true,
      },
    })),
    knowledgeUsed,
    missingEvidence,
    confidenceSummary: `${lines.length} generated line(s): ${high} high confidence, ${medium} medium confidence, ${low} low confidence; ${priced} line(s) include a proposed price.`,
    explainabilitySummary: lines.map((line) => line.explanation).join(" "),
    qualitySummary: `Generated ${lines.length} reviewable line(s) from existing knowledge. ${priced} line(s) have proposed prices; ${lines.length - priced} line(s) need pricing review.`,
    estimatedManualWorkReduction: `The user starts from ${lines.length} generated line(s) instead of a blank draft; ${priced} line(s) avoid manual first-pass pricing lookup.`,
  };
}
