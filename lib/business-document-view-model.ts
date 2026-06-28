import type { BusinessDocumentEngineReview } from "./business-document-engine";

export type DocumentTypeConfig = {
  code: string;
  family: string;
  displayName: string;
  direction: "outbound" | "inbound" | "internal";
  requiresPayment: boolean;
  requiresTax: boolean;
  defaultTaxRate: number;
  supportsNegativeTotals: boolean;
  allowedLineKinds: string[];
  approvalPolicy: "commercial_document" | "service_summary" | "internal_only";
  exportAdapters: string[];
};

export const DOCUMENT_TYPE_CONFIGS: DocumentTypeConfig[] = [
  {
    code: "QUOTE",
    family: "Quote",
    displayName: "Quote",
    direction: "outbound",
    requiresPayment: false,
    requiresTax: true,
    defaultTaxRate: 0.17,
    supportsNegativeTotals: false,
    allowedLineKinds: ["product", "service", "labor", "travel", "discount"],
    approvalPolicy: "commercial_document",
    exportAdapters: ["pdf"],
  },
  {
    code: "SALES_ORDER",
    family: "Sales Order",
    displayName: "Sales Order",
    direction: "outbound",
    requiresPayment: false,
    requiresTax: true,
    defaultTaxRate: 0.17,
    supportsNegativeTotals: false,
    allowedLineKinds: ["product", "service", "labor", "travel", "discount"],
    approvalPolicy: "commercial_document",
    exportAdapters: ["pdf"],
  },
  {
    code: "PURCHASE_ORDER",
    family: "Purchase Order",
    displayName: "Purchase Order",
    direction: "inbound",
    requiresPayment: false,
    requiresTax: true,
    defaultTaxRate: 0.17,
    supportsNegativeTotals: false,
    allowedLineKinds: ["product", "service", "delivery", "discount"],
    approvalPolicy: "commercial_document",
    exportAdapters: ["pdf"],
  },
  {
    code: "DELIVERY_NOTE",
    family: "Delivery Note",
    displayName: "Delivery Note",
    direction: "outbound",
    requiresPayment: false,
    requiresTax: false,
    defaultTaxRate: 0.17,
    supportsNegativeTotals: false,
    allowedLineKinds: ["product", "service", "delivery"],
    approvalPolicy: "commercial_document",
    exportAdapters: ["pdf"],
  },
  {
    code: "PROFORMA_INVOICE",
    family: "Proforma Invoice",
    displayName: "Proforma Invoice",
    direction: "outbound",
    requiresPayment: false,
    requiresTax: true,
    defaultTaxRate: 0.17,
    supportsNegativeTotals: false,
    allowedLineKinds: ["product", "service", "labor", "travel", "discount"],
    approvalPolicy: "commercial_document",
    exportAdapters: ["pdf"],
  },
  {
    code: "TAX_INVOICE",
    family: "Tax Invoice",
    displayName: "Tax Invoice",
    direction: "outbound",
    requiresPayment: false,
    requiresTax: true,
    defaultTaxRate: 0.17,
    supportsNegativeTotals: false,
    allowedLineKinds: ["product", "service", "labor", "travel", "discount"],
    approvalPolicy: "commercial_document",
    exportAdapters: ["pdf"],
  },
  {
    code: "RECEIPT",
    family: "Receipt",
    displayName: "Receipt",
    direction: "outbound",
    requiresPayment: true,
    requiresTax: false,
    defaultTaxRate: 0.17,
    supportsNegativeTotals: false,
    allowedLineKinds: ["payment", "service", "product"],
    approvalPolicy: "commercial_document",
    exportAdapters: ["pdf"],
  },
  {
    code: "TAX_INVOICE_RECEIPT",
    family: "Tax Invoice / Receipt",
    displayName: "Tax Invoice / Receipt",
    direction: "outbound",
    requiresPayment: true,
    requiresTax: true,
    defaultTaxRate: 0.17,
    supportsNegativeTotals: false,
    allowedLineKinds: ["product", "service", "labor", "travel", "payment"],
    approvalPolicy: "commercial_document",
    exportAdapters: ["pdf"],
  },
  {
    code: "CREDIT_NOTE",
    family: "Credit Note",
    displayName: "Credit Note",
    direction: "outbound",
    requiresPayment: false,
    requiresTax: true,
    defaultTaxRate: 0.17,
    supportsNegativeTotals: true,
    allowedLineKinds: ["product", "service", "labor", "travel", "correction"],
    approvalPolicy: "commercial_document",
    exportAdapters: ["pdf"],
  },
  {
    code: "DEBIT_NOTE",
    family: "Debit Note",
    displayName: "Debit Note",
    direction: "outbound",
    requiresPayment: false,
    requiresTax: true,
    defaultTaxRate: 0.17,
    supportsNegativeTotals: false,
    allowedLineKinds: ["product", "service", "labor", "travel", "correction"],
    approvalPolicy: "commercial_document",
    exportAdapters: ["pdf"],
  },
  {
    code: "SERVICE_DOCUMENT",
    family: "Service Summary",
    displayName: "Service Document",
    direction: "outbound",
    requiresPayment: false,
    requiresTax: true,
    defaultTaxRate: 0.17,
    supportsNegativeTotals: false,
    allowedLineKinds: ["product", "service", "labor", "travel"],
    approvalPolicy: "service_summary",
    exportAdapters: ["pdf"],
  },
  {
    code: "SERVICE_SUMMARY",
    family: "Service Summary",
    displayName: "Service Summary",
    direction: "outbound",
    requiresPayment: false,
    requiresTax: true,
    defaultTaxRate: 0.17,
    supportsNegativeTotals: false,
    allowedLineKinds: ["product", "service", "labor", "travel"],
    approvalPolicy: "service_summary",
    exportAdapters: ["pdf"],
  },
  {
    code: "CUSTOM",
    family: "Future Custom Document",
    displayName: "Custom Document",
    direction: "internal",
    requiresPayment: false,
    requiresTax: false,
    defaultTaxRate: 0.17,
    supportsNegativeTotals: false,
    allowedLineKinds: ["product", "service", "labor", "travel", "custom"],
    approvalPolicy: "internal_only",
    exportAdapters: ["pdf"],
  },
];

export type BusinessDocumentViewModelLine = {
  id: string;
  index: number;
  name: string;
  displayName: string;
  quantity: string;
  unitPrice: string;
  totalPrice: string;
  salesSku: string;
};

export type BusinessDocumentViewModelInput = {
  documentId: string;
  documentTypeSelected: string | null;
  issueDate: string;
  dueDate?: string;
  currency: string;
  primaryParty: {
    id: string;
    name: string;
    role: string;
  };
  source: {
    type: string;
    reference: string;
    label: string;
    href: string;
  };
  lines: BusinessDocumentViewModelLine[];
  totals: BusinessDocumentEngineReview["totals"];
};

export type BusinessDocumentViewModel = {
  documentType: DocumentTypeConfig;
  header: {
    documentId: string;
    issueDate: string;
    dueDate: string;
    currency: string;
  };
  parties: {
    primaryParty: {
      id: string;
      name: string;
      role: string;
    };
  };
  source: {
    type: string;
    reference: string;
    label: string;
    href: string;
  };
  tax: {
    label: string;
    rate: number;
    amountLabel: string;
  };
  lines: BusinessDocumentViewModelLine[];
  totals: BusinessDocumentEngineReview["totals"];
  preview: {
    showSalesSkuColumn: boolean;
  };
};

function normalizeDocumentType(value: string | null) {
  const text = (value || "UNKNOWN").toUpperCase();

  if (text === "INVOICE") {
    return "TAX_INVOICE";
  }

  if (text === "OTHER" || text === "UNKNOWN") {
    return "CUSTOM";
  }

  return text;
}

export function getDocumentTypeConfig(value: string | null) {
  const normalized = normalizeDocumentType(value);

  return (
    DOCUMENT_TYPE_CONFIGS.find((config) => config.code === normalized) ||
    DOCUMENT_TYPE_CONFIGS.find((config) => config.code === "CUSTOM") ||
    DOCUMENT_TYPE_CONFIGS[0]
  );
}

export function buildBusinessDocumentViewModel(
  input: BusinessDocumentViewModelInput,
): BusinessDocumentViewModel {
  const documentType = getDocumentTypeConfig(input.documentTypeSelected);

  return {
    documentType,
    header: {
      documentId: input.documentId,
      issueDate: input.issueDate,
      dueDate: input.dueDate || "Not specified",
      currency: input.currency,
    },
    parties: {
      primaryParty: input.primaryParty,
    },
    source: input.source,
    tax: {
      label: "VAT",
      rate: documentType.defaultTaxRate,
      amountLabel: `${(documentType.defaultTaxRate * 100).toFixed(0)}%`,
    },
    lines: input.lines,
    totals: input.totals,
    preview: {
      showSalesSkuColumn: input.lines.some((line) => Boolean(line.salesSku)),
    },
  };
}
