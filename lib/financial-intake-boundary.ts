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
