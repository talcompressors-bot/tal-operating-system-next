import { ApprovalStatus, BusinessDocumentStatus, Prisma } from "@prisma/client";

type LearningBoundaryItem = {
  itemName: string;
  quantity: Prisma.Decimal;
  unitPrice: Prisma.Decimal | null;
  totalPrice: Prisma.Decimal | null;
  source: string;
  needsPriceApproval: boolean;
  matchConfidence: number | null;
  rawSource: Prisma.JsonValue | null;
};

type LearningBoundaryLog = {
  action: string;
  rawData: Prisma.JsonValue | null;
};

type LearningBoundaryInput = {
  appsheetBusinessDocumentId: string;
  draftTitle: string | null;
  sourceDocumentId: string | null;
  status: BusinessDocumentStatus;
  approvalStatus: ApprovalStatus;
  rawSource: Prisma.JsonValue | null;
  items: LearningBoundaryItem[];
  logs: LearningBoundaryLog[];
};

export type BusinessDocumentLearningReview = {
  isProductionDraft: boolean;
  titleQuality: {
    status: "Good" | "Needs correction" | "Not applicable";
    summary: string;
  };
  lineQuality: Array<{
    itemName: string;
    status: "Good" | "Needs correction";
    summary: string;
  }>;
  priceConfidence: {
    summary: string;
    high: number;
    medium: number;
    low: number;
    missing: number;
  };
  missingEvidence: string[];
  recommendedCorrections: string[];
  correctionWorkflow: {
    status: "Available" | "Blocked";
    summary: string;
  };
  learningEvidence: {
    status: "Ready for future reuse" | "Not eligible" | "Rejected";
    summary: string;
    approvedEvidence: string[];
    futureReuse: string[];
    blockedReasons: string[];
  };
  policy: string;
};

function readRecord(value: Prisma.JsonValue | null | undefined) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return value as Record<string, unknown>;
}

function readText(value: unknown, fallback = "") {
  if (value === undefined || value === null) {
    return fallback;
  }

  const text = String(value).trim();
  return text || fallback;
}

function readStringArray(value: unknown) {
  return Array.isArray(value)
    ? value.map((item) => readText(item)).filter(Boolean)
    : [];
}

function unique(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

function isProductionDraft(input: LearningBoundaryInput) {
  const rawSource = readRecord(input.rawSource);
  const nestedRawSource = readRecord(rawSource.rawSource as Prisma.JsonValue);

  return (
    rawSource.source === "PRODUCTION_DRAFT_GENERATION" ||
    nestedRawSource.businessIntent !== undefined ||
    nestedRawSource.productionDraftRecommendation !== undefined
  );
}

function pricingEvidenceCount(item: LearningBoundaryItem) {
  const rawSource = readRecord(item.rawSource);
  const pricingEvidence = rawSource.pricingEvidence;

  return Array.isArray(pricingEvidence) ? pricingEvidence.length : 0;
}

function confidenceBand(matchConfidence: number | null) {
  if (matchConfidence === null) {
    return "missing";
  }

  if (matchConfidence >= 85) {
    return "high";
  }

  if (matchConfidence >= 50) {
    return "medium";
  }

  return "low";
}

function extractMissingEvidence(input: LearningBoundaryInput) {
  const rawSource = readRecord(input.rawSource);
  const nestedRawSource = readRecord(rawSource.rawSource as Prisma.JsonValue);
  const missing = [
    ...readStringArray(rawSource.missingEvidence),
    ...input.items.flatMap((item) => {
      const itemRawSource = readRecord(item.rawSource);
      const line = readRecord(itemRawSource.line as Prisma.JsonValue);
      return readStringArray(line.missingEvidence);
    }),
  ];
  const productionRecommendation = readRecord(
    nestedRawSource.productionDraftRecommendation as Prisma.JsonValue,
  );
  const qualitySummary = readText(productionRecommendation.qualitySummary);

  if (qualitySummary) {
    missing.push(`Quality summary: ${qualitySummary}`);
  }

  return unique(missing);
}

function buildRecommendedCorrections(input: LearningBoundaryInput) {
  const corrections = input.items.flatMap((item) => {
    const itemCorrections = [];
    const quantity = Number(item.quantity);

    if (!Number.isFinite(quantity) || quantity <= 0) {
      itemCorrections.push(`${item.itemName}: confirm a positive quantity.`);
    }

    if (!item.unitPrice || !item.totalPrice) {
      itemCorrections.push(`${item.itemName}: add a reviewed selling price.`);
    }

    if (item.needsPriceApproval) {
      itemCorrections.push(`${item.itemName}: resolve price approval before learning can be trusted.`);
    }

    if (!pricingEvidenceCount(item)) {
      itemCorrections.push(`${item.itemName}: add pricing evidence source and note.`);
    }

    return itemCorrections;
  });

  if (!input.sourceDocumentId) {
    corrections.push("Link the draft to a source ServiceReport before relying on it as learning evidence.");
  }

  return unique(corrections);
}

function buildApprovedEvidence(input: LearningBoundaryInput) {
  return input.items
    .filter((item) => item.unitPrice && item.totalPrice && !item.needsPriceApproval)
    .map((item) => {
      const evidenceCount = pricingEvidenceCount(item);
      return [
        item.itemName,
        `qty ${item.quantity.toString()}`,
        `unit ${item.unitPrice?.toFixed(2)}`,
        `total ${item.totalPrice?.toFixed(2)}`,
        `source ${item.source}`,
        `${evidenceCount} pricing evidence entr${evidenceCount === 1 ? "y" : "ies"}`,
      ].join(" / ");
    });
}

function hasReturnToReviewLog(input: LearningBoundaryInput) {
  return input.logs.some((log) => log.action === "BUSINESS_DOCUMENT_RETURNED_TO_REVIEW");
}

export function buildBusinessDocumentLearningReview(
  input: LearningBoundaryInput,
): BusinessDocumentLearningReview {
  const productionDraft = isProductionDraft(input);
  const title = readText(input.draftTitle);
  const titleQuality = productionDraft
    ? {
        status: (title && input.sourceDocumentId ? "Good" : "Needs correction") as
          | "Good"
          | "Needs correction",
        summary:
          title && input.sourceDocumentId
            ? "Title is tied to the generated draft and source ServiceReport."
            : "Title or source ServiceReport reference is missing.",
      }
    : {
        status: "Not applicable" as const,
        summary: "This BusinessDocument was not created by production draft generation.",
      };
  const lineQuality = input.items.map((item) => {
    const issues = [];
    const quantity = Number(item.quantity);

    if (!Number.isFinite(quantity) || quantity <= 0) {
      issues.push("quantity needs review");
    }

    if (!item.unitPrice || !item.totalPrice) {
      issues.push("price is missing");
    }

    if (item.needsPriceApproval) {
      issues.push("price approval is still required");
    }

    if (!pricingEvidenceCount(item)) {
      issues.push("pricing evidence is missing");
    }

    return {
      itemName: item.itemName,
      status: (issues.length ? "Needs correction" : "Good") as
        | "Good"
        | "Needs correction",
      summary: issues.length
        ? issues.join("; ")
        : "Line has quantity, pricing, and preserved pricing evidence.",
    };
  });
  const bands = input.items.reduce(
    (counts, item) => {
      counts[confidenceBand(item.matchConfidence)] += 1;
      return counts;
    },
    { high: 0, medium: 0, low: 0, missing: 0 },
  );
  const recommendedCorrections = buildRecommendedCorrections(input);
  const approvedEvidence = buildApprovedEvidence(input);
  const blockedReasons = [];

  if (input.approvalStatus === ApprovalStatus.REJECTED) {
    blockedReasons.push("Rejected drafts are never used for learning.");
  }

  if (input.approvalStatus !== ApprovalStatus.APPROVED) {
    blockedReasons.push("BusinessDocument is not internally approved yet.");
  }

  if (recommendedCorrections.length) {
    blockedReasons.push("One or more line, price, or evidence corrections remain.");
  }

  if (!approvedEvidence.length) {
    blockedReasons.push("No approved priced lines are available as learning evidence.");
  }

  const approved =
    input.status === BusinessDocumentStatus.APPROVED &&
    input.approvalStatus === ApprovalStatus.APPROVED;
  const learningReady = approved && !recommendedCorrections.length && approvedEvidence.length > 0;

  return {
    isProductionDraft: productionDraft,
    titleQuality,
    lineQuality,
    priceConfidence: {
      summary: `${bands.high} high, ${bands.medium} medium, ${bands.low} low, ${bands.missing} missing confidence line(s).`,
      high: bands.high,
      medium: bands.medium,
      low: bands.low,
      missing: bands.missing,
    },
    missingEvidence: extractMissingEvidence(input),
    recommendedCorrections,
    correctionWorkflow: {
      status: input.items.length ? "Available" : "Blocked",
      summary: input.items.length
        ? "Use the existing line-resolution forms, then approve internally when review is complete."
        : "No line items exist to correct.",
    },
    learningEvidence: {
      status:
        input.approvalStatus === ApprovalStatus.REJECTED
          ? "Rejected"
          : learningReady
            ? "Ready for future reuse"
            : "Not eligible",
      summary: learningReady
        ? "Approved corrected lines are available to future production draft generation as historical BusinessDocumentItem evidence."
        : hasReturnToReviewLog(input)
          ? "Returned or corrected drafts must be approved before they become learning evidence."
          : "Learning remains blocked until the draft is approved with resolved pricing evidence.",
      approvedEvidence,
      futureReuse: learningReady
        ? [
            "Future draft generation loads only approved BusinessDocuments with approved priced BusinessDocumentItems.",
            "Rejected drafts and pending review drafts are ignored by the production draft generator.",
          ]
        : [
            "Approve the corrected draft before it can influence future draft generation.",
          ],
      blockedReasons: unique(blockedReasons),
    },
    policy:
      "Learning uses approved user corrections only. Rejected drafts are ignored. Evidence is append-only in BusinessDocumentItem rawSource and BusinessDocumentLog rawData.",
  };
}

export function buildApprovedProductionDraftLearningEvidence(
  input: LearningBoundaryInput,
) {
  if (!isProductionDraft(input)) {
    return null;
  }

  const approvedEvidence = buildApprovedEvidence(input);

  return {
    source: "PRODUCTION_DRAFT_GENERATION",
    policy:
      "Approved user corrections only; rejected drafts ignored; append-only evidence.",
    sourceDocumentId: input.sourceDocumentId,
    approvedBusinessDocumentId: input.appsheetBusinessDocumentId,
    approvedLineCount: approvedEvidence.length,
    approvedEvidence,
    reusableByFutureDraftGeneration: approvedEvidence.length > 0,
  } satisfies Prisma.InputJsonValue;
}
