import {
  manufacturerPartRegistryRows,
  type ManufacturerPartRegistryRow,
} from "./manufacturer-parts-registry";

export type ManufacturerSkuMatchStatus = "TRUSTED_MATCH" | "REVIEW_REQUIRED";

export type ManufacturerSkuMatch = {
  status: ManufacturerSkuMatchStatus;
  trusted: boolean;
  manufacturer: string;
  manufacturerSku: string;
  salesSku: string;
  needsSalesSkuMapping: boolean;
  partCategory: string;
  confidence: "HIGH" | "REVIEW_REQUIRED";
  needsReview: boolean;
  reason: string;
  sourceFile: string;
  sourceSheet: string;
  sourceRow: number | null;
  sourceDescription: string;
  compatibleModels: string[];
};

function normalizeModel(value: string) {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function normalizeText(value: string) {
  return value.toLowerCase().replace(/[-_/]+/g, " ").replace(/\s+/g, " ").trim();
}

function normalizeSalesSku(value?: string | null) {
  return value?.trim() || "";
}

function modelMatchesEvidence(
  modelEvidence: string[],
  evidence: ManufacturerPartRegistryRow,
) {
  const normalizedEvidenceModels = evidence.compatibleModels.map(normalizeModel);

  return modelEvidence.some((value) =>
    normalizedEvidenceModels.includes(normalizeModel(value)),
  );
}

function findTrustedEvidence(input: { itemName: string; modelEvidence: string[] }) {
  const normalizedItemName = normalizeText(input.itemName);

  return manufacturerPartRegistryRows.find(
    (evidence) =>
      modelMatchesEvidence(input.modelEvidence, evidence) &&
      evidence.keywords.some((keyword) =>
        normalizedItemName.includes(normalizeText(keyword)),
      ),
  );
}

function buildReviewRequired(input: {
  reason: string;
  salesSku?: string | null;
}): ManufacturerSkuMatch {
  const salesSku = normalizeSalesSku(input.salesSku);

  return {
    status: "REVIEW_REQUIRED",
    trusted: false,
    manufacturer: "UNKNOWN",
    manufacturerSku: "",
    salesSku,
    needsSalesSkuMapping: !salesSku,
    partCategory: "UNMATCHED",
    confidence: "REVIEW_REQUIRED",
    needsReview: true,
    reason: input.reason,
    sourceFile: "",
    sourceSheet: "",
    sourceRow: null,
    sourceDescription: "No trusted manufacturer registry row matched this line.",
    compatibleModels: [],
  };
}

export function matchManufacturerSku(input: {
  modelEvidence: string[];
  itemName: string;
  salesSku?: string | null;
}): ManufacturerSkuMatch {
  const salesSku = normalizeSalesSku(input.salesSku);

  if (!input.modelEvidence.length) {
    return buildReviewRequired({
      reason: "No trusted equipment model evidence is linked to the source ServiceReport.",
      salesSku,
    });
  }

  const evidence = findTrustedEvidence(input);

  if (!evidence) {
    return buildReviewRequired({
      reason:
        "No confident manufacturer registry part-category match was found for this BusinessDocument line.",
      salesSku,
    });
  }

  return {
    status: "TRUSTED_MATCH",
    trusted: true,
    manufacturer: evidence.manufacturer,
    manufacturerSku: evidence.manufacturerSku,
    salesSku,
    needsSalesSkuMapping: !salesSku,
    partCategory: evidence.partCategory,
    confidence: "HIGH",
    needsReview: !salesSku,
    reason: salesSku
      ? "Matched by equipment model evidence, manufacturer registry row, part category, and linked sales SKU."
      : "Matched by equipment model evidence, manufacturer registry row, and part category; needs sales SKU mapping before customer-facing SKU display.",
    sourceFile: evidence.sourceFile,
    sourceSheet: evidence.sourceSheet,
    sourceRow: evidence.sourceRow,
    sourceDescription: evidence.sourceDescription,
    compatibleModels: evidence.compatibleModels,
  };
}
