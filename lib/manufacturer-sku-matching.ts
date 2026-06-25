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

function inferPartCategory(itemName: string) {
  const normalizedItemName = normalizeText(itemName);

  if (normalizedItemName.includes("air filter")) {
    return "AIR_FILTER";
  }

  if (
    normalizedItemName.includes("oil separator") ||
    normalizedItemName.includes("separator")
  ) {
    return "OIL_SEPARATOR";
  }

  if (normalizedItemName.includes("oil filter")) {
    return "OIL_FILTER";
  }

  if (
    normalizedItemName.includes("coolant") ||
    normalizedItemName.includes("oil top up") ||
    normalizedItemName.includes("oil top-up") ||
    normalizedItemName.includes("skr oil")
  ) {
    return "OIL_COOLANT";
  }

  return "UNMATCHED";
}

function modelMatchesEvidence(
  modelEvidence: string[],
  evidence: ManufacturerPartRegistryRow,
) {
  const normalizedEvidenceModels = [evidence.model, evidence.normalizedModel].map(
    normalizeModel,
  );

  return modelEvidence.some((value) => {
    const normalizedValue = normalizeModel(value);

    return normalizedEvidenceModels.some(
      (normalizedEvidenceModel) =>
        normalizedValue === normalizedEvidenceModel ||
        normalizedValue.endsWith(normalizedEvidenceModel),
    );
  });
}

function findTrustedEvidence(input: { itemName: string; modelEvidence: string[] }) {
  const partCategory = inferPartCategory(input.itemName);

  if (partCategory === "UNMATCHED") {
    return null;
  }

  return manufacturerPartRegistryRows.find(
    (evidence) =>
      evidence.active &&
      modelMatchesEvidence(input.modelEvidence, evidence) &&
      evidence.partCategory === partCategory,
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
    sourceDescription: evidence.manufacturerPartName,
    compatibleModels: [evidence.model],
  };
}
