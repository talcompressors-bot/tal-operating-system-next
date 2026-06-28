import { Prisma } from "@prisma/client";

export const PAYMENT_SOURCES = [
  "Bank transfer",
  "Check",
  "Credit card",
  "Cash",
  "Other",
  "Future uploaded check image",
  "Future bank proof attachment",
] as const;

type FinancialEvidenceSourceType =
  | "CHECK_IMAGE"
  | "BANK_TRANSFER_PROOF"
  | "BANK_EXPORT"
  | "BANK_SCREENSHOT"
  | "PDF_PROOF"
  | "EMAIL_PROOF"
  | "MANUAL_ENTRY"
  | "FUTURE_BANK_API";

type FinancialEvidenceReviewState =
  | "NEEDS_REVIEW"
  | "READY_FOR_APPROVAL"
  | "APPROVED"
  | "BLOCKED";

type FinancialDraftStatus =
  | "DRAFT_READY_FOR_REVIEW"
  | "BLOCKED_PENDING_APPROVAL"
  | "FUTURE_ISSUING_REQUIRED";

type FinancialIntakeInput = {
  businessDocumentId: string;
  businessDocumentTitle: string;
  customerId: string;
  customerName: string;
  documentType: string;
  currency: string;
  totalAmount: Prisma.Decimal | null;
  approvalStatus: string | null;
  commercialStage: string;
  rawSource: Prisma.JsonValue | null;
};

export type FinancialEvidenceDraft = {
  id: string;
  sourceType: FinancialEvidenceSourceType;
  status: FinancialEvidenceReviewState;
  amount: string;
  currency: string;
  date: string;
  payerName: string;
  bank: string;
  branchOrAccount: string;
  checkNumber: string;
  reference: string;
  rawExtractedText: string;
  confidence: string;
  attachmentId: string;
  note: string;
};

export type FinancialIntakeCapability = {
  status: string;
  summary: string;
  evidence: FinancialEvidenceDraft[];
  matching: {
    status: string;
    customerMatch: string;
    businessDocumentMatch: string;
    openBalanceMatch: string;
    partialPaymentMatch: string;
    duplicateDetection: string;
    confidence: string;
  };
  approval: {
    status: FinancialEvidenceReviewState;
    required: boolean;
    summary: string;
    boundary: string;
  };
  drafts: {
    receipt: FinancialDocumentDraft;
    taxInvoiceReceipt: FinancialDocumentDraft;
  };
  boundary: string;
};

type FinancialDocumentDraft = {
  type: "RECEIPT" | "TAX_INVOICE_RECEIPT";
  status: FinancialDraftStatus;
  title: string;
  amount: string;
  partyName: string;
  sourceBusinessDocumentId: string;
  sourceEvidenceId: string;
  issueAllowed: boolean;
  note: string;
};

function readJsonObject(value: Prisma.JsonValue | null) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return value as Record<string, unknown>;
}

function readText(value: unknown, fallback = "") {
  const text = String(value ?? "").trim();
  return text || fallback;
}

function formatAmount(value: number, currency: string) {
  return `${value.toFixed(2)} ${currency}`;
}

function decimalToNumber(value: Prisma.Decimal | null) {
  return value ? value.toNumber() : 0;
}

function collectPaymentEntries(rawSource: Prisma.JsonValue | null) {
  const record = readJsonObject(rawSource);
  const paymentPlan = record.paymentPlan;
  const paymentEvidence = record.paymentEvidence;
  const financialEvidence = record.financialEvidence;
  const candidates: unknown[][] = [paymentPlan, paymentEvidence].filter(
    (candidate): candidate is unknown[] => Array.isArray(candidate),
  );

  if (Array.isArray(financialEvidence)) {
    candidates.push(financialEvidence);
  }

  return candidates.flatMap((candidate) => candidate);
}

export function readFinancialPaymentAmount(rawSource: Prisma.JsonValue | null) {
  return collectPaymentEntries(rawSource).reduce<number>((sum, entry) => {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
      return sum;
    }

    const amount = Number((entry as Record<string, unknown>).amount);
    return Number.isFinite(amount) && amount > 0 ? sum + amount : sum;
  }, 0);
}

export function readFinancialPaymentSources(rawSource: Prisma.JsonValue | null) {
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

function normalizeSourceType(value: unknown): FinancialEvidenceSourceType {
  const text = readText(value, "MANUAL_ENTRY")
    .toUpperCase()
    .replace(/[\s-]+/g, "_");
  const allowed: FinancialEvidenceSourceType[] = [
    "CHECK_IMAGE",
    "BANK_TRANSFER_PROOF",
    "BANK_EXPORT",
    "BANK_SCREENSHOT",
    "PDF_PROOF",
    "EMAIL_PROOF",
    "MANUAL_ENTRY",
    "FUTURE_BANK_API",
  ];

  return allowed.includes(text as FinancialEvidenceSourceType)
    ? (text as FinancialEvidenceSourceType)
    : "MANUAL_ENTRY";
}

function buildEvidenceDrafts(input: FinancialIntakeInput) {
  const entries = collectPaymentEntries(input.rawSource);
  const totalAmount = decimalToNumber(input.totalAmount);

  if (!entries.length) {
    return [
      {
        id: `manual-entry:${input.businessDocumentId}`,
        sourceType: "MANUAL_ENTRY",
        status: "READY_FOR_APPROVAL",
        amount: formatAmount(totalAmount, input.currency),
        currency: input.currency,
        date: "Needs user confirmation",
        payerName: input.customerName,
        bank: "Not provided",
        branchOrAccount: "Not provided",
        checkNumber: "Not applicable",
        reference: input.businessDocumentId,
        rawExtractedText:
          "Manual financial evidence draft derived from the approved BusinessDocument total. User approval is required before issuing any receipt.",
        confidence: "medium",
        attachmentId: "No attachment",
        note:
          "Internal review draft only. Replace or confirm with real check, bank proof, export row, email proof, or manual payment evidence before issuing.",
      } satisfies FinancialEvidenceDraft,
    ];
  }

  return entries.map((entry, index) => {
    const record =
      entry && typeof entry === "object" && !Array.isArray(entry)
        ? (entry as Record<string, unknown>)
        : {};
    const amount = Number(record.amount);

    return {
      id: readText(record.id, `financial-evidence:${input.businessDocumentId}:${index + 1}`),
      sourceType: normalizeSourceType(record.sourceType || record.source),
      status: "READY_FOR_APPROVAL",
      amount: formatAmount(
        Number.isFinite(amount) && amount > 0 ? amount : totalAmount,
        readText(record.currency, input.currency),
      ),
      currency: readText(record.currency, input.currency),
      date: readText(record.date, "Needs user confirmation"),
      payerName: readText(record.payerName || record.payer, input.customerName),
      bank: readText(record.bank, "Not provided"),
      branchOrAccount: readText(
        record.branchOrAccount || record.account || record.branch,
        "Not provided",
      ),
      checkNumber: readText(record.checkNumber, "Not applicable"),
      reference: readText(record.reference || record.asmachta, input.businessDocumentId),
      rawExtractedText: readText(
        record.rawExtractedText || record.rawText,
        "No raw extracted text recorded.",
      ),
      confidence: readText(record.confidence, "medium"),
      attachmentId: readText(record.attachmentId, "No attachment"),
      note:
        "Extraction and matching are suggestions only. User approval is required before receipt or tax invoice / receipt issuing.",
    } satisfies FinancialEvidenceDraft;
  });
}

function parseAmountLabel(value: string) {
  const number = Number(value.split(" ")[0]);
  return Number.isFinite(number) ? number : 0;
}

function buildMatching(
  input: FinancialIntakeInput,
  evidence: FinancialEvidenceDraft[],
): FinancialIntakeCapability["matching"] {
  const totalAmount = decimalToNumber(input.totalAmount);
  const evidenceAmount = evidence.reduce(
    (sum, item) => sum + parseAmountLabel(item.amount),
    0,
  );
  const amountMatches = Math.abs(evidenceAmount - totalAmount) <= 0.01;
  const partialPayment =
    evidenceAmount > 0 && evidenceAmount < totalAmount - 0.01;

  return {
    status: amountMatches
      ? "Matched"
      : partialPayment
        ? "Partial payment match"
        : "Needs review",
    customerMatch: input.customerId
      ? `Matched current customer ${input.customerName}.`
      : "No customer ID is available for matching.",
    businessDocumentMatch: `Matched BusinessDocument ${input.businessDocumentId}.`,
    openBalanceMatch: amountMatches
      ? "Evidence amount matches the current document total."
      : `Evidence amount ${formatAmount(evidenceAmount, input.currency)} does not fully match document total ${formatAmount(totalAmount, input.currency)}.`,
    partialPaymentMatch: partialPayment
      ? "Evidence appears to be a partial payment."
      : "No partial payment split is required for this draft.",
    duplicateDetection:
      "No persisted FinancialEvidence registry exists yet; duplicate detection is limited to this in-memory evidence set by amount, reference, and document.",
    confidence: amountMatches ? "high" : partialPayment ? "medium" : "low",
  };
}

function buildApproval(
  matching: FinancialIntakeCapability["matching"],
): FinancialIntakeCapability["approval"] {
  return {
    status: matching.status === "Matched" ? "READY_FOR_APPROVAL" : "NEEDS_REVIEW",
    required: true,
    summary:
      matching.status === "Matched"
        ? "Financial evidence is matched and ready for user approval before draft issuing."
        : "Financial evidence needs review before any receipt draft can be approved.",
    boundary:
      "Financial approval is internal review only. It does not issue receipts, create tax invoices, call Maven/Invoice4U, send email, update inventory, or write DB state.",
  };
}

function buildFinancialDocumentDraft(
  type: FinancialDocumentDraft["type"],
  input: FinancialIntakeInput,
  evidence: FinancialEvidenceDraft[],
  approval: FinancialIntakeCapability["approval"],
): FinancialDocumentDraft {
  const evidenceId = evidence[0]?.id || "No evidence";
  const title =
    type === "RECEIPT"
      ? `Receipt draft for ${input.businessDocumentTitle}`
      : `Tax Invoice / Receipt draft for ${input.businessDocumentTitle}`;

  return {
    type,
    status:
      approval.status === "READY_FOR_APPROVAL"
        ? "DRAFT_READY_FOR_REVIEW"
        : "BLOCKED_PENDING_APPROVAL",
    title,
    amount: formatAmount(decimalToNumber(input.totalAmount), input.currency),
    partyName: input.customerName,
    sourceBusinessDocumentId: input.businessDocumentId,
    sourceEvidenceId: evidenceId,
    issueAllowed: false,
    note:
      "Draft is generated for internal review only. Issuing requires a future approved write workflow and external/accounting gate.",
  };
}

export function buildFinancialIntakeCapability(
  input: FinancialIntakeInput,
): FinancialIntakeCapability {
  const evidence = buildEvidenceDrafts(input);
  const matching = buildMatching(input, evidence);
  const approval = buildApproval(matching);
  const receipt = buildFinancialDocumentDraft("RECEIPT", input, evidence, approval);
  const taxInvoiceReceipt = buildFinancialDocumentDraft(
    "TAX_INVOICE_RECEIPT",
    input,
    evidence,
    approval,
  );

  return {
    status:
      approval.status === "READY_FOR_APPROVAL"
        ? "Receipt draft ready for approval"
        : "Financial evidence needs review",
    summary:
      "Payment evidence was converted into an internal evidence draft, matched to the BusinessDocument and customer, and used to prepare receipt drafts for review only.",
    evidence,
    matching,
    approval,
    drafts: {
      receipt,
      taxInvoiceReceipt,
    },
    boundary:
      "Financial Intake is suggestion and draft runtime only. It does not perform OCR, bank API calls, receipt issuing, external accounting, email, Maven/Invoice4U, inventory action, schema changes, or DB writes.",
  };
}
