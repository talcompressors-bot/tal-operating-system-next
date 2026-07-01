import type { Prisma } from "@prisma/client";
import {
  getBusinessKnowledgeEngine,
  type EquipmentKnowledgeFilters,
  type EquipmentKnowledgeRecord,
} from "../../lib/business-knowledge-engine";

export type EquipmentListFilters = EquipmentKnowledgeFilters;

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

type EquipmentRecord = EquipmentKnowledgeRecord;

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
    partsUsedRecords: number;
    recurringSignals: number;
    reasoningConclusions: number;
    dataQualityGaps: number;
  };
  relationshipEvidence: string[];
  recurringSignals: Array<{
    label: string;
    count: number;
    evidence: string;
  }>;
  reasoningConclusions: AssetReasoningConclusion[];
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
      lineSummary: string;
    }>;
    partsUsed: string[];
  }>;
  dataQualityGaps: string[];
  nextBestAction: {
    label: string;
    reason: string;
    href: string;
  };
};

export type AssetReasoningConclusion = {
  category:
    | "Recurring failure"
    | "Abnormal repair pattern"
    | "Likely root cause"
    | "Preventive maintenance"
    | "Missing technical information"
    | "Commercial opportunity";
  title: string;
  severity: "High" | "Medium" | "Low";
  confidence: number;
  conclusion: string;
  evidence: string[];
  rejectedAlternatives: string[];
  recommendedAction: string;
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

function formatReportNumber(report: EquipmentRecord["serviceReport"]) {
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
    likelyRootCause:
      "Cooling, ventilation, oil condition, oil separator, or temperature sensor issue should be checked before replacing parts.",
    preventiveAction:
      "Schedule cooling path inspection, radiator cleaning, oil condition check, and temperature sensor verification.",
  },
  {
    label: "Oil separator / oil system signal",
    terms: ["oil separator", "separator", "\u05de\u05e4\u05e8\u05d9\u05d3", "\u05e9\u05de\u05df"],
    likelyRootCause:
      "Oil separation, oil quality, oil carryover, or overdue oil-system maintenance is the strongest explanation in current evidence.",
    preventiveAction:
      "Review oil separator age, oil filter condition, oil level, and maintenance interval before the next service visit.",
  },
  {
    label: "Filter service signal",
    terms: ["filter", "\u05de\u05e1\u05e0\u05df", "\u05e4\u05d9\u05dc\u05d8\u05e8"],
    likelyRootCause:
      "Air/oil filtration restriction or routine maintenance interval is the most likely service pattern.",
    preventiveAction:
      "Prepare preventive filter service evidence and verify exact official parts only through the model parts catalog if parts are requested.",
  },
  {
    label: "Intake / valve signal",
    terms: ["intake", "valve", "\u05e9\u05e1\u05ea\u05d5\u05dd", "\u05d9\u05e0\u05d9\u05e7\u05d4"],
    likelyRootCause:
      "Intake valve control, air demand response, or valve wear is a likely mechanical-control path.",
    preventiveAction:
      "Inspect intake valve operation, unloaded/loaded behavior, and air leaks during the next technician visit.",
  },
  {
    label: "Controller / electrical signal",
    terms: ["controller", "electric", "\u05d1\u05e7\u05e8", "\u05d7\u05e9\u05de\u05dc"],
    likelyRootCause:
      "Controller, sensor wiring, electrical supply, or parameter issue should be checked before mechanical replacement.",
    preventiveAction:
      "Verify controller revision, alarms, wiring, and sensor continuity before quoting replacement parts.",
  },
  {
    label: "Dryer / air treatment signal",
    terms: ["dryer", "\u05de\u05d9\u05d9\u05d1\u05e9", "\u05dc\u05d7\u05d5\u05ea"],
    likelyRootCause:
      "Air-treatment load, dryer performance, drainage, or downstream moisture issue is suggested by current evidence.",
    preventiveAction:
      "Review dryer pairing, condensate drain, filters, and humidity complaints with the compressor service.",
  },
  {
    label: "Maintenance interval signal",
    terms: ["2000", "2500", "4000", "5000"],
    likelyRootCause:
      "Current evidence points to scheduled maintenance interval rather than an isolated unexpected failure.",
    preventiveAction:
      "Plan preventive service by hours and confirm required parts through the official model parts catalog before quotation.",
  },
];

function equipmentEvidenceText(item: EquipmentRecord) {
  return [
    item.serviceDescription,
    item.technicianRecommendations,
    item.nextService,
    item.systemStatus,
    item.serviceReport?.reportType,
    item.serviceReport?.serviceType,
    item.serviceReport?.serviceDescription,
    item.serviceReport?.workPerformed,
    item.serviceReport?.technicianSummary,
    item.serviceReport?.recommendations,
    ...(item.serviceReport?.partsUsed.map((part) =>
      [
        part.partName,
        part.partSku,
        part.equipmentReference,
        part.product?.name,
        part.product?.category,
        part.product?.subcategory,
      ].join(" "),
    ) ?? []),
    ...(item.serviceReport?.businessDocuments.flatMap((document) => [
      document.draftTitle,
      document.description,
      ...document.items.map((line) =>
        [line.itemName, line.description].filter(Boolean).join(" "),
      ),
    ]) ?? []),
  ]
    .map((value) => readText(value))
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function evidenceLabel(item: EquipmentRecord) {
  const report = formatReportNumber(item.serviceReport);
  const model = readText(item.equipmentModel, "model missing");
  const relationship = readText(item.appsheetItemId);

  return `${report} (${model}, row ${relationship})`;
}

function collectUniqueEvidence(evidence: string[], limit = 5) {
  return Array.from(new Set(evidence.filter(Boolean))).slice(0, limit);
}

function countPartsUsed(relatedItems: EquipmentRecord[]) {
  return relatedItems.reduce(
    (count, item) => count + (item.serviceReport?.partsUsed.length ?? 0),
    0,
  );
}

function countLinkedBusinessDocuments(relatedItems: EquipmentRecord[]) {
  return relatedItems.reduce(
    (count, item) => count + (item.serviceReport?.businessDocuments.length ?? 0),
    0,
  );
}

function countBusinessDocumentLines(relatedItems: EquipmentRecord[]) {
  return relatedItems.reduce(
    (count, item) =>
      count +
      (item.serviceReport?.businessDocuments.reduce(
        (lineCount, document) => lineCount + document.items.length,
        0,
      ) ?? 0),
    0,
  );
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
        .map(evidenceLabel)
        .join(", "),
    };
  }).filter((signal) => signal.count > 0);
}

function matchingItemsForSignal(
  relatedItems: EquipmentRecord[],
  definition: (typeof SIGNAL_DEFINITIONS)[number],
) {
  return relatedItems.filter((item) => {
    const evidence = equipmentEvidenceText(item);

    return definition.terms.some((term) => evidence.includes(term.toLowerCase()));
  });
}

function conclusionConfidence(
  item: EquipmentRecord,
  evidenceCount: number,
  linkedBusinessDocumentCount: number,
) {
  let score = hasBusinessValue(item.serialNumber) ? 45 : 30;

  score += Math.min(evidenceCount, 4) * 10;

  if (hasBusinessValue(item.equipmentModel)) {
    score += 10;
  }

  if (linkedBusinessDocumentCount > 0) {
    score += 5;
  }

  return Math.min(score, 90);
}

function formatPartsUsedEvidence(relatedItems: EquipmentRecord[]) {
  return collectUniqueEvidence(
    relatedItems.flatMap((item) =>
      item.serviceReport?.partsUsed.map((part) => {
        const partName =
          readText(part.partName) ||
          readText(part.product?.name) ||
          readText(part.partSku, "unnamed part");
        const quantity =
          part.quantity === null ? "" : `, quantity ${part.quantity.toString()}`;
        const confidence =
          part.matchConfidence === null ? "" : `, match ${part.matchConfidence}%`;

        return `${formatReportNumber(item.serviceReport)} used ${partName}${quantity}${confidence}`;
      }) ?? [],
    ),
  );
}

function formatBusinessDocumentEvidence(relatedItems: EquipmentRecord[]) {
  return collectUniqueEvidence(
    relatedItems.flatMap((item) =>
      item.serviceReport?.businessDocuments.map((document) => {
        const lineCount = document.items.length;

        return `${formatReportNumber(item.serviceReport)} linked ${formatEnum(
          document.documentTypeSelected,
        )} ${document.appsheetBusinessDocumentId} (${formatEnum(
          document.status,
        )}, ${formatEnum(document.approvalStatus)}, ${formatMoney(
          document.totalAmount,
          document.currency,
        )}, ${lineCount} line(s))`;
      }) ?? [],
    ),
  );
}

function buildRecurringFailureConclusions(
  item: EquipmentRecord,
  relatedItems: EquipmentRecord[],
  linkedBusinessDocumentCount: number,
): AssetReasoningConclusion[] {
  return SIGNAL_DEFINITIONS.flatMap((definition) => {
    const matchingItems = matchingItemsForSignal(relatedItems, definition);

    if (matchingItems.length < 2) {
      return [];
    }

    return [
      {
        category: "Recurring failure" as const,
        title: definition.label,
        severity: matchingItems.length >= 3 ? "High" as const : "Medium" as const,
        confidence: conclusionConfidence(
          item,
          matchingItems.length,
          linkedBusinessDocumentCount,
        ),
        conclusion: `${matchingItems.length} related service report(s) contain evidence for ${definition.label.toLowerCase()}. Treat this as a recurring asset pattern, not an isolated note.`,
        evidence: collectUniqueEvidence(matchingItems.map(evidenceLabel)),
        rejectedAlternatives: [
          "Rejected isolated one-off interpretation because the signal appears in multiple related equipment records.",
          "Rejected SKU-level conclusion because this engine does not select parts or SKUs.",
        ],
        recommendedAction:
          "Review the latest report together with earlier matching reports before deciding repair scope.",
      },
    ];
  });
}

function buildRootCauseConclusions(
  item: EquipmentRecord,
  relatedItems: EquipmentRecord[],
  linkedBusinessDocumentCount: number,
): AssetReasoningConclusion[] {
  return SIGNAL_DEFINITIONS.flatMap((definition) => {
    const matchingItems = matchingItemsForSignal(relatedItems, definition);

    if (!matchingItems.length) {
      return [];
    }

    const evidence = collectUniqueEvidence([
      ...matchingItems.map(evidenceLabel),
      ...formatPartsUsedEvidence(matchingItems),
    ]);

    return [
      {
        category: "Likely root cause" as const,
        title: `Likely cause path: ${definition.label}`,
        severity: matchingItems.length >= 2 ? "Medium" as const : "Low" as const,
        confidence: conclusionConfidence(
          item,
          matchingItems.length,
          linkedBusinessDocumentCount,
        ),
        conclusion: definition.likelyRootCause,
        evidence,
        rejectedAlternatives: [
          "Rejected definitive root-cause claim because no diagnostic measurements are stored in current structured evidence.",
          "Rejected immediate parts replacement as a conclusion because official SKU selection was not requested and must come only from the model parts catalog.",
        ],
        recommendedAction:
          "Ask the technician to confirm this path with live measurements, controller alarms, and visual inspection before quotation.",
      },
    ];
  }).slice(0, 4);
}

function buildPreventiveMaintenanceConclusions(
  item: EquipmentRecord,
  relatedItems: EquipmentRecord[],
  linkedBusinessDocumentCount: number,
): AssetReasoningConclusion[] {
  const conclusions: AssetReasoningConclusion[] = [];
  const maintenanceEvidence = SIGNAL_DEFINITIONS.find(
    (definition) => definition.label === "Maintenance interval signal",
  );
  const maintenanceMatches = maintenanceEvidence
    ? matchingItemsForSignal(relatedItems, maintenanceEvidence)
    : [];
  const currentHours = item.currentHours === null ? null : Number(item.currentHours);
  const recurringCount = buildRecurringSignals(relatedItems).filter(
    (signal) => signal.count >= 2,
  ).length;

  if (
    maintenanceMatches.length ||
    (currentHours !== null && Number.isFinite(currentHours) && currentHours >= 2000)
  ) {
    conclusions.push({
      category: "Preventive maintenance",
      title: "Preventive service planning is justified",
      severity: currentHours !== null && currentHours >= 4000 ? "High" : "Medium",
      confidence: conclusionConfidence(
        item,
        maintenanceMatches.length || 1,
        linkedBusinessDocumentCount,
      ),
      conclusion:
        "Current hours or maintenance-interval text supports planning preventive maintenance before the next reactive visit.",
      evidence: collectUniqueEvidence([
        currentHours !== null ? `Current hours: ${currentHours}` : "",
        readText(item.nextService) ? `Next service: ${readText(item.nextService)}` : "",
        ...maintenanceMatches.map(evidenceLabel),
      ]),
      rejectedAlternatives: [
        "Rejected waiting for failure because current evidence already contains maintenance timing or hour evidence.",
        "Rejected automatic parts list because SKU selection requires the official model parts catalog.",
      ],
      recommendedAction:
        "Prepare a preventive-service review and use the official model parts catalog if a parts quotation is requested.",
    });
  }

  if (recurringCount > 0) {
    conclusions.push({
      category: "Preventive maintenance",
      title: "Recurring issues justify proactive inspection",
      severity: "Medium",
      confidence: conclusionConfidence(item, recurringCount, linkedBusinessDocumentCount),
      conclusion:
        "Recurring service signals suggest a proactive inspection may reduce repeat visits and customer downtime.",
      evidence: buildRecurringSignals(relatedItems)
        .filter((signal) => signal.count >= 2)
        .map((signal) => `${signal.label}: ${signal.evidence}`),
      rejectedAlternatives: [
        "Rejected no-action outcome because repeat evidence exists across related service history.",
      ],
      recommendedAction:
        "Plan the next visit around the repeated signal instead of treating only the latest complaint.",
    });
  }

  return conclusions;
}

function buildAbnormalRepairConclusions(
  item: EquipmentRecord,
  relatedItems: EquipmentRecord[],
  linkedBusinessDocumentCount: number,
): AssetReasoningConclusion[] {
  const conclusions: AssetReasoningConclusion[] = [];
  const reportCount = relatedItems.filter((related) => related.serviceReport).length;
  const partsUsedCount = countPartsUsed(relatedItems);
  const businessDocumentLineCount = countBusinessDocumentLines(relatedItems);
  const repeatedSignals = buildRecurringSignals(relatedItems).filter(
    (signal) => signal.count >= 3,
  );

  repeatedSignals.forEach((signal) => {
    conclusions.push({
      category: "Abnormal repair pattern",
      title: `Repeated ${signal.label.toLowerCase()}`,
      severity: "High",
      confidence: conclusionConfidence(item, signal.count, linkedBusinessDocumentCount),
      conclusion:
        "The same service signal appears three or more times. That is abnormal enough to review root cause, not only the immediate symptom.",
      evidence: [signal.evidence],
      rejectedAlternatives: [
        "Rejected normal maintenance-only interpretation because the same signal repeats across several related records.",
      ],
      recommendedAction:
        "Escalate the next diagnosis to root-cause review and compare technician notes across all matching reports.",
    });
  });

  if (reportCount >= 2 && linkedBusinessDocumentCount === 0) {
    conclusions.push({
      category: "Abnormal repair pattern",
      title: "Service history exists without linked commercial follow-through",
      severity: "Medium",
      confidence: conclusionConfidence(item, reportCount, linkedBusinessDocumentCount),
      conclusion:
        "Multiple service events were found, but none has linked BusinessDocument evidence. This may indicate missing commercial linkage or unquoted follow-up work.",
      evidence: relatedItems
        .filter((related) => related.serviceReport)
        .slice(0, 5)
        .map(evidenceLabel),
      rejectedAlternatives: [
        "Rejected conclusion that no commercial opportunity exists because service evidence exists without linked documents.",
      ],
      recommendedAction:
        "Review whether quotation or follow-up documentation is missing for this asset.",
    });
  }

  if (partsUsedCount > 0 && businessDocumentLineCount === 0) {
    conclusions.push({
      category: "Abnormal repair pattern",
      title: "Parts usage has no linked priced document lines",
      severity: "Medium",
      confidence: conclusionConfidence(item, partsUsedCount, linkedBusinessDocumentCount),
      conclusion:
        "PartsUsed evidence exists, but linked BusinessDocumentItem pricing evidence was not found in the matched asset history.",
      evidence: formatPartsUsedEvidence(relatedItems),
      rejectedAlternatives: [
        "Rejected price recommendation because no approved linked priced line was found for this asset view.",
      ],
      recommendedAction:
        "Review whether parts usage should have a linked quote, invoice, or approved internal draft line.",
    });
  }

  return conclusions;
}

function buildMissingTechnicalInfoConclusions(
  item: EquipmentRecord,
  dataQualityGaps: string[],
): AssetReasoningConclusion[] {
  if (!dataQualityGaps.length) {
    return [];
  }

  return [
    {
      category: "Missing technical information",
      title: "Technical evidence is incomplete",
      severity: dataQualityGaps.some((gap) => gap.includes("serial number"))
        ? "High"
        : "Medium",
      confidence: 90,
      conclusion:
        "The reasoning engine found missing or weak technical fields that reduce diagnostic certainty and future matching quality.",
      evidence: dataQualityGaps,
      rejectedAlternatives: [
        "Rejected high-confidence equipment identity when required technical identifiers are missing.",
      ],
      recommendedAction: item.serviceReport?.appsheetReportId
        ? `Complete missing fields from ServiceReport ${formatReportNumber(item.serviceReport)} before relying on automated recommendations.`
        : "Complete missing equipment identity fields before relying on automated recommendations.",
    },
  ];
}

function buildCommercialOpportunityConclusions(
  item: EquipmentRecord,
  relatedItems: EquipmentRecord[],
  linkedBusinessDocumentCount: number,
): AssetReasoningConclusion[] {
  const conclusions: AssetReasoningConclusion[] = [];
  const recurringSignals = buildRecurringSignals(relatedItems).filter(
    (signal) => signal.count >= 2,
  );
  const commercialEvidence = formatBusinessDocumentEvidence(relatedItems);
  const reportCount = relatedItems.filter((related) => related.serviceReport).length;
  const priceReviewLines = relatedItems.flatMap(
    (related) =>
      related.serviceReport?.businessDocuments.flatMap((document) =>
        document.items
          .filter((line) => line.needsPriceApproval)
          .map(
            (line) =>
              `${document.appsheetBusinessDocumentId}: ${line.itemName} needs price approval`,
          ),
      ) ?? [],
  );

  if (recurringSignals.length && linkedBusinessDocumentCount === 0) {
    conclusions.push({
      category: "Commercial opportunity",
      title: "Recurring service pattern has no linked quotation evidence",
      severity: "Medium",
      confidence: conclusionConfidence(item, recurringSignals.length, 0),
      conclusion:
        "The asset has recurring service evidence but no linked BusinessDocument. This is a candidate for follow-up quotation or preventive-service discussion.",
      evidence: recurringSignals.map((signal) => `${signal.label}: ${signal.evidence}`),
      rejectedAlternatives: [
        "Rejected automatic draft creation because this engine is read-only and customer-facing/commercial writes remain gated.",
      ],
      recommendedAction:
        "Open the latest service report and decide whether a quotation should be created through the approved BusinessDocument flow.",
    });
  }

  if (priceReviewLines.length) {
    conclusions.push({
      category: "Commercial opportunity",
      title: "Linked commercial evidence needs pricing review",
      severity: "Low",
      confidence: conclusionConfidence(
        item,
        priceReviewLines.length,
        linkedBusinessDocumentCount,
      ),
      conclusion:
        "At least one linked document line still requires price review. This can delay approval or external document readiness.",
      evidence: collectUniqueEvidence(priceReviewLines),
      rejectedAlternatives: [
        "Rejected automatic price selection because prices must come from approved evidence, not inference.",
      ],
      recommendedAction:
        "Resolve price-review lines in the BusinessDocument review flow before external action.",
    });
  }

  if (reportCount > 0 && linkedBusinessDocumentCount > 0) {
    conclusions.push({
      category: "Commercial opportunity",
      title: "Commercial history is available for consistency review",
      severity: "Low",
      confidence: conclusionConfidence(
        item,
        linkedBusinessDocumentCount,
        linkedBusinessDocumentCount,
      ),
      conclusion:
        "Linked BusinessDocuments can be used as consistency evidence for future quotations or approved repair history.",
      evidence: commercialEvidence,
      rejectedAlternatives: [
        "Rejected treating historical documents as official technical compatibility evidence; they are commercial evidence only.",
      ],
      recommendedAction:
        "Use approved historical document lines as supporting evidence, while keeping SKU selection catalog-only.",
    });
  }

  return conclusions;
}

function buildReasoningConclusions(
  item: EquipmentRecord,
  relatedItems: EquipmentRecord[],
  linkedBusinessDocumentCount: number,
  dataQualityGaps: string[],
): AssetReasoningConclusion[] {
  return [
    ...buildRecurringFailureConclusions(
      item,
      relatedItems,
      linkedBusinessDocumentCount,
    ),
    ...buildAbnormalRepairConclusions(
      item,
      relatedItems,
      linkedBusinessDocumentCount,
    ),
    ...buildRootCauseConclusions(item, relatedItems, linkedBusinessDocumentCount),
    ...buildPreventiveMaintenanceConclusions(
      item,
      relatedItems,
      linkedBusinessDocumentCount,
    ),
    ...buildMissingTechnicalInfoConclusions(item, dataQualityGaps),
    ...buildCommercialOpportunityConclusions(
      item,
      relatedItems,
      linkedBusinessDocumentCount,
    ),
  ];
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
        lineSummary: document.items.length
          ? document.items
              .slice(0, 3)
              .map((line) => {
                const price =
                  line.unitPrice === null ? "no unit price" : `${line.unitPrice.toFixed(2)} ILS`;

                return `${line.itemName} (${line.quantity.toString()} x ${price})`;
              })
              .join("; ")
          : "No document lines",
      })) ?? [],
    partsUsed:
      serviceReport?.partsUsed.map((part) => {
        const name =
          readText(part.partName) ||
          readText(part.product?.name) ||
          readText(part.partSku, "Unnamed part");
        const quantity =
          part.quantity === null ? "" : `, quantity ${part.quantity.toString()}`;
        const approval = part.needsUserApproval ? ", needs approval" : "";

        return `${name}${quantity}${approval}`;
      }) ?? [],
  };
}

function buildSourcesSearched(
  relatedItems: EquipmentRecord[],
  linkedBusinessDocumentCount: number,
  linkedPartsUsedCount: number,
  linkedBusinessDocumentLineCount: number,
): AssetIntelligence["sourcesSearched"] {
  return [
    {
      source: "Business Knowledge Engine",
      status: "Used",
      explanation:
        "Used unified evidence returned by the Business Knowledge Engine instead of querying a source directly from Tal Intelligence Core.",
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
      source: "BusinessDocumentItems",
      status: `${linkedBusinessDocumentLineCount} linked line(s)`,
      explanation:
        "Used linked line items as commercial and pricing-readiness evidence only, not as official SKU compatibility evidence.",
    },
    {
      source: "PartsUsed",
      status: `${linkedPartsUsedCount} linked part usage row(s)`,
      explanation:
        "Used linked parts usage as repair-pattern evidence. This engine does not turn PartsUsed history into SKU recommendations.",
    },
    {
      source: "Products Catalog",
      status: linkedPartsUsedCount ? "Used through PartsUsed links" : "No linked product evidence",
      explanation:
        "Used product names/categories only when already linked to PartsUsed rows. Official SKU selection remains outside this reasoning pass.",
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
  const linkedBusinessDocumentCount = countLinkedBusinessDocuments(relatedItems);
  const linkedPartsUsedCount = countPartsUsed(relatedItems);
  const linkedBusinessDocumentLineCount = countBusinessDocumentLines(relatedItems);
  const timeline = relatedItems.map((related) => mapTimelineItem(item, related));
  const recurringSignals = buildRecurringSignals(relatedItems);
  const dataQualityGaps = buildDataQualityGaps(
    item,
    relatedItems,
    linkedBusinessDocumentCount,
  );
  const reasoningConclusions = buildReasoningConclusions(
    item,
    relatedItems,
    linkedBusinessDocumentCount,
    dataQualityGaps,
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
      linkedPartsUsedCount,
      linkedBusinessDocumentLineCount,
    ),
    summary: {
      relatedServiceReports: timeline.filter((event) => event.serviceReportId).length,
      linkedBusinessDocuments: linkedBusinessDocumentCount,
      partsUsedRecords: linkedPartsUsedCount,
      recurringSignals: recurringSignals.length,
      reasoningConclusions: reasoningConclusions.length,
      dataQualityGaps: dataQualityGaps.length,
    },
    relationshipEvidence: buildRelationshipEvidence(item, relatedItems),
    recurringSignals,
    reasoningConclusions,
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

export async function getEquipmentList(filters: EquipmentListFilters = {}) {
  const equipment =
    await getBusinessKnowledgeEngine().searchEquipmentList(filters);

  return equipment.map(mapEquipmentListItem);
}

export async function getEquipmentById(id: string) {
  const assetKnowledge =
    await getBusinessKnowledgeEngine().getAssetKnowledgeContext(id);

  if (!assetKnowledge) {
    return undefined;
  }

  const item = assetKnowledge.current;
  const relatedItems = assetKnowledge.related;
  const detail = mapEquipmentDetail(item);

  return {
    ...detail,
    assetIntelligence: buildAssetIntelligence(item, relatedItems),
  };
}
