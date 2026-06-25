export type ManufacturerSkuMatchStatus = "TRUSTED_MATCH" | "REVIEW_REQUIRED";

export type ManufacturerSkuMatch = {
  status: ManufacturerSkuMatchStatus;
  trusted: boolean;
  manufacturer: string;
  manufacturerSku: string;
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

type SkuEvidence = {
  manufacturerSku: string;
  partCategory: string;
  sourceRow: number;
  sourceDescription: string;
  keywords: string[];
};

const PM_SERIES_SOURCE_FILE =
  "data-sources/vendor-spare-parts/Spare Parts Service List(PM Series) rev3 (1).xls";
const PM_40_SHEET = "40PM";
const MANUFACTURER = "SCR";
const COMPATIBLE_MODELS = ["40PM", "SCR-40PM", "SCR40PM"];

const TRUSTED_40PM_EVIDENCE: SkuEvidence[] = [
  {
    manufacturerSku: "25100043-071",
    partCategory: "AIR_FILTER",
    sourceRow: 6,
    sourceDescription: "air filter core",
    keywords: ["air filter", "airfilter", "מסנן אוויר", "מסנן אויר"],
  },
  {
    manufacturerSku: "25200007-005",
    partCategory: "OIL_FILTER",
    sourceRow: 7,
    sourceDescription: "Oil Filter",
    keywords: ["oil filter", "oilfilter", "מסנן שמן"],
  },
  {
    manufacturerSku: "25300045-023",
    partCategory: "OIL_SEPARATOR",
    sourceRow: 8,
    sourceDescription: "oil separator",
    keywords: ["oil separator", "separator", "מפריד שמן"],
  },
  {
    manufacturerSku: "80000175-039",
    partCategory: "OIL_COOLANT",
    sourceRow: 9,
    sourceDescription: "Coolant",
    keywords: ["coolant", "oil top-up", "oil top up", "skr oil", "3l skr", "שמן"],
  },
];

function normalizeModel(value: string) {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function normalizeText(value: string) {
  return value.toLowerCase().replace(/[-_/]+/g, " ").replace(/\s+/g, " ").trim();
}

function hasServiceReport5806Evidence(reportNumber: string) {
  return reportNumber.trim() === "5806";
}

function has40PmModelEvidence(modelEvidence: string[]) {
  return modelEvidence.some((value) => {
    const normalized = normalizeModel(value);
    return normalized === "40PM" || normalized.includes("SCR40PM");
  });
}

function findTrustedEvidence(itemName: string) {
  const normalized = normalizeText(itemName);

  return TRUSTED_40PM_EVIDENCE.find((evidence) =>
    evidence.keywords.some((keyword) => normalized.includes(normalizeText(keyword))),
  );
}

function buildReviewRequired(reason: string): ManufacturerSkuMatch {
  return {
    status: "REVIEW_REQUIRED",
    trusted: false,
    manufacturer: MANUFACTURER,
    manufacturerSku: "",
    partCategory: "UNMATCHED",
    confidence: "REVIEW_REQUIRED",
    needsReview: true,
    reason,
    sourceFile: PM_SERIES_SOURCE_FILE,
    sourceSheet: PM_40_SHEET,
    sourceRow: null,
    sourceDescription: "No trusted PM Series row matched this line.",
    compatibleModels: COMPATIBLE_MODELS,
  };
}

export function matchManufacturerSkuForServiceReport5806(input: {
  serviceReportNumber: string;
  modelEvidence: string[];
  itemName: string;
}): ManufacturerSkuMatch {
  if (!hasServiceReport5806Evidence(input.serviceReportNumber)) {
    return buildReviewRequired("Runtime SKU MVP is scoped to ServiceReport 5806 only.");
  }

  if (!has40PmModelEvidence(input.modelEvidence)) {
    return buildReviewRequired(
      "No trusted 40PM/SCR-40PM equipment model evidence is linked to the source ServiceReport.",
    );
  }

  const evidence = findTrustedEvidence(input.itemName);

  if (!evidence) {
    return buildReviewRequired(
      "No confident PM Series part-category match was found for this BusinessDocument line.",
    );
  }

  return {
    status: "TRUSTED_MATCH",
    trusted: true,
    manufacturer: MANUFACTURER,
    manufacturerSku: evidence.manufacturerSku,
    partCategory: evidence.partCategory,
    confidence: "HIGH",
    needsReview: false,
    reason: "Matched by ServiceReport 5806, linked 40PM equipment model evidence, and PM Series item category.",
    sourceFile: PM_SERIES_SOURCE_FILE,
    sourceSheet: PM_40_SHEET,
    sourceRow: evidence.sourceRow,
    sourceDescription: evidence.sourceDescription,
    compatibleModels: COMPATIBLE_MODELS,
  };
}
