import { Prisma } from "@prisma/client";

export const BUSINESS_DOCUMENT_TYPES = [
  { code: "QUOTE", label: "הצעת מחיר", requiresPayment: false },
  { code: "PROFORMA_INVOICE", label: "חשבון עסקה", requiresPayment: false },
  { code: "TAX_INVOICE", label: "חשבונית מס", requiresPayment: false },
  { code: "RECEIPT", label: "קבלה", requiresPayment: true },
  {
    code: "TAX_INVOICE_RECEIPT",
    label: "חשבונית מס קבלה",
    requiresPayment: true,
  },
  { code: "PURCHASE_ORDER", label: "הזמנת רכש", requiresPayment: false },
  { code: "DELIVERY_NOTE", label: "תעודת משלוח", requiresPayment: false },
  { code: "CREDIT_NOTE", label: "זיכוי", requiresPayment: false },
] as const;

export const PAYMENT_SOURCES = [
  "Bank transfer",
  "Check",
  "Credit card",
  "Cash",
  "Other",
  "Future uploaded check image",
  "Future bank proof attachment",
] as const;

type EngineLine = {
  itemName: string;
  quantity: Prisma.Decimal;
  unitPrice: Prisma.Decimal | null;
  totalPrice: Prisma.Decimal | null;
  needsPriceApproval: boolean;
};

export type BusinessDocumentEngineInput = {
  documentTypeSelected: string | null;
  subtotalAmount: Prisma.Decimal | null;
  vatAmount: Prisma.Decimal | null;
  totalAmount: Prisma.Decimal | null;
  currency: string;
  approvalStatus: string | null;
  rawSource: Prisma.JsonValue | null;
  items: EngineLine[];
};

export type BusinessDocumentEngineReview = {
  documentType: {
    code: string;
    label: string;
    supported: boolean;
    requiresPayment: boolean;
    note: string;
  };
  supportedDocumentTypes: string[];
  supportedPaymentSources: string[];
  totals: {
    currency: string;
    lineSubtotal: string;
    documentSubtotal: string;
    vatAmount: string;
    totalAmount: string;
    paymentAmount: string;
    balanceDue: string;
  };
  payment: {
    required: boolean;
    detectedSources: string[];
    attachmentReadiness: string;
    note: string;
  };
  exportReadiness: {
    approvalRequired: boolean;
    externalExportAllowed: boolean;
    blockers: string[];
    warnings: string[];
    boundary: string;
  };
};

function normalizeDocumentType(value: string | null) {
  const text = (value || "UNKNOWN").toUpperCase();

  if (text === "INVOICE") {
    return "TAX_INVOICE";
  }

  if (text === "SERVICE_DOCUMENT" || text === "OTHER" || text === "UNKNOWN") {
    return text;
  }

  return text;
}

function decimalToNumber(value: Prisma.Decimal | null) {
  return value ? value.toNumber() : 0;
}

function formatAmount(value: number, currency: string) {
  return `${value.toFixed(2)} ${currency}`;
}

function roundMoney(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function readJsonObject(value: Prisma.JsonValue | null) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return value as Record<string, unknown>;
}

function collectPaymentEntries(rawSource: Prisma.JsonValue | null) {
  const record = readJsonObject(rawSource);
  const paymentPlan = record.paymentPlan;
  const paymentEvidence = record.paymentEvidence;
  const candidates: unknown[][] = [paymentPlan, paymentEvidence].filter(
    (candidate): candidate is unknown[] => Array.isArray(candidate),
  );

  return candidates.flatMap((candidate) => candidate);
}

function readPaymentAmount(rawSource: Prisma.JsonValue | null) {
  return collectPaymentEntries(rawSource).reduce<number>((sum, entry) => {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
      return sum;
    }

    const amount = Number((entry as Record<string, unknown>).amount);
    return Number.isFinite(amount) && amount > 0 ? sum + amount : sum;
  }, 0);
}

function readPaymentSources(rawSource: Prisma.JsonValue | null) {
  const sources = collectPaymentEntries(rawSource)
    .map((entry) => {
      if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
        return "";
      }

      return String((entry as Record<string, unknown>).source || "").trim();
    })
    .filter(Boolean);

  return Array.from(new Set(sources));
}

export function buildBusinessDocumentEngineReview(
  input: BusinessDocumentEngineInput,
): BusinessDocumentEngineReview {
  const normalizedType = normalizeDocumentType(input.documentTypeSelected);
  const typeDefinition = BUSINESS_DOCUMENT_TYPES.find(
    (type) => type.code === normalizedType,
  );
  const supported = Boolean(typeDefinition);
  const lineSubtotal = input.items.reduce(
    (sum, item) => sum + decimalToNumber(item.totalPrice),
    0,
  );
  const storedSubtotal = decimalToNumber(input.subtotalAmount);
  const storedVatAmount = decimalToNumber(input.vatAmount);
  const storedTotalAmount = decimalToNumber(input.totalAmount);
  const hasLineSubtotal = lineSubtotal > 0;
  const hasStoredSubtotal = storedSubtotal > 0;
  const documentSubtotal =
    hasLineSubtotal && (!hasStoredSubtotal || Math.abs(lineSubtotal - storedSubtotal) > 0.01)
      ? lineSubtotal
      : storedSubtotal;
  const vatAmount =
    documentSubtotal > 0 && (!storedVatAmount || !storedTotalAmount)
      ? roundMoney(documentSubtotal * 0.17)
      : storedVatAmount;
  const totalAmount =
    storedTotalAmount && Math.abs(storedTotalAmount - (documentSubtotal + vatAmount)) <= 0.01
      ? storedTotalAmount
      : roundMoney(documentSubtotal + vatAmount);
  const paymentAmount = readPaymentAmount(input.rawSource);
  const balanceDue = totalAmount - paymentAmount;
  const detectedSources = readPaymentSources(input.rawSource);
  const blockers: string[] = [];
  const warnings: string[] = [];

  if (!supported) {
    blockers.push(
      `Document type ${normalizedType} is not ready for the internal business document engine.`,
    );
  }

  if (!input.items.length) {
    blockers.push("At least one BusinessDocumentItem is required.");
  }

  if (input.items.some((item) => item.needsPriceApproval || !item.unitPrice)) {
    blockers.push("All lines require trusted pricing before external export.");
  }

  if (input.items.some((item) => item.quantity.lte(0))) {
    blockers.push("All lines require a positive quantity.");
  }

  if (totalAmount <= 0) {
    blockers.push("Total amount is required before approval/export readiness.");
  }

  if (hasLineSubtotal && hasStoredSubtotal && Math.abs(lineSubtotal - storedSubtotal) > 0.01) {
    warnings.push("Line subtotal and stored BusinessDocument subtotal do not match; review display uses current line totals.");
  }

  if (hasLineSubtotal && !hasStoredSubtotal) {
    warnings.push("Stored BusinessDocument subtotal is missing; review display uses current line totals.");
  }

  if (typeDefinition?.requiresPayment && paymentAmount <= 0) {
    blockers.push("Payment amount is required for receipt-based document types.");
  }

  if (balanceDue < -0.01) {
    warnings.push("Payment amount is greater than the document total.");
  }

  if (detectedSources.length === 0) {
    warnings.push("No internal payment source is recorded yet.");
  }

  return {
    documentType: {
      code: normalizedType,
      label: typeDefinition?.label || "Unsupported / legacy type",
      supported,
      requiresPayment: Boolean(typeDefinition?.requiresPayment),
      note: supported
        ? "Supported by the internal BusinessDocument engine."
        : "Legacy/current schema value; keep review-only until mapped.",
    },
    supportedDocumentTypes: BUSINESS_DOCUMENT_TYPES.map(
      (type) => `${type.code} / ${type.label}`,
    ),
    supportedPaymentSources: [...PAYMENT_SOURCES],
    totals: {
      currency: input.currency,
      lineSubtotal: formatAmount(lineSubtotal, input.currency),
      documentSubtotal: formatAmount(documentSubtotal, input.currency),
      vatAmount: formatAmount(vatAmount, input.currency),
      totalAmount: formatAmount(totalAmount, input.currency),
      paymentAmount: formatAmount(paymentAmount, input.currency),
      balanceDue: formatAmount(balanceDue, input.currency),
    },
    payment: {
      required: Boolean(typeDefinition?.requiresPayment),
      detectedSources,
      attachmentReadiness:
        "Future-ready only: uploaded check images and bank proof attachments require a separate approved storage and review flow.",
      note:
        "Payment evidence is internal review data only and does not create receipts, contact customers, call Maven/Invoice4U, or update inventory.",
    },
    exportReadiness: {
      approvalRequired: true,
      externalExportAllowed: false,
      blockers,
      warnings,
      boundary:
        "BusinessDocument remains the source of truth. External export requires separate explicit approval and must not call Maven/Invoice4U, email customers, or deduct inventory from this review.",
    },
  };
}
