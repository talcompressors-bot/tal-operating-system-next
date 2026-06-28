import { Prisma } from "@prisma/client";

type BusinessDocumentReviewItem = {
  needsPriceApproval: boolean;
  rawSource: Prisma.JsonValue;
};

type BusinessDocumentReviewBoundaryInput = {
  status: string | null;
  sendStatus: string | null;
  sendByEmail: boolean;
  sendByWhatsapp: boolean;
  approvedAt: Date | null;
  mavenDocumentNumber: string | null;
  mavenPdfLink: string | null;
  serviceReport: unknown | null;
  items: BusinessDocumentReviewItem[];
};

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

function summarizePricingEvidence(rawSource: Prisma.JsonValue) {
  if (!rawSource || typeof rawSource !== "object" || Array.isArray(rawSource)) {
    return [];
  }

  const record = rawSource as Record<string, unknown>;
  const evidence = record.pricingEvidence;

  if (!Array.isArray(evidence)) {
    return [];
  }

  return evidence.filter(
    (item) => item && typeof item === "object" && !Array.isArray(item),
  );
}

export function mapBusinessDocumentReviewLifecycle(
  document: BusinessDocumentReviewBoundaryInput,
) {
  const status = readText(document.status).toUpperCase();
  const sendStatus = readText(document.sendStatus).toLowerCase();

  return {
    draft:
      status === "DRAFT_RECOMMENDED" || status === "WAITING_USER_APPROVAL"
        ? "Draft"
        : "Draft placeholder",
    approved: document.approvedAt ? "Approved" : "Approved placeholder",
    sentToMaven:
      status === "MAVEN_DRAFT_REQUESTED" || Boolean(document.mavenDocumentNumber)
        ? "Sent to Maven"
        : "Sent to Maven placeholder",
    mavenCreated: document.mavenDocumentNumber
      ? "Maven Created"
      : "Maven Created placeholder",
    emailSent:
      sendStatus.includes("sent") || Boolean(document.mavenPdfLink)
        ? "Email Sent"
        : "Email Sent placeholder",
    customerViewed: "Customer Viewed placeholder",
  };
}

export function mapBusinessDocumentReviewStatus(
  document: BusinessDocumentReviewBoundaryInput,
) {
  return {
    internalDraft:
      document.status === "DRAFT_RECOMMENDED" ||
      document.status === "WAITING_USER_APPROVAL"
        ? "Internal Draft"
        : formatEnum(document.status, "Internal Draft"),
    sentState:
      readText(document.sendStatus) ||
      (document.sendByEmail || document.sendByWhatsapp
        ? "Send pending review"
        : "Not sent"),
    mavenState:
      document.mavenDocumentNumber || document.mavenPdfLink
        ? "Maven document exists"
        : "No Maven action",
    emailState:
      document.sendStatus || document.sendByEmail || document.sendByWhatsapp
        ? "Delivery review required"
        : "No email/customer-facing action",
    inventoryState: "No inventory deduction",
  };
}

export function buildBusinessDocumentReviewWarnings(
  document: BusinessDocumentReviewBoundaryInput,
) {
  const warnings: string[] = [];
  const approvalRequiredItems = document.items.filter(
    (item) => item.needsPriceApproval,
  );
  const missingEvidenceItems = document.items.filter(
    (item) => !summarizePricingEvidence(item.rawSource).length,
  );

  if (!document.items.length) {
    warnings.push("No BusinessDocumentItems are linked to this draft.");
  }

  if (approvalRequiredItems.length) {
    warnings.push(
      `${approvalRequiredItems.length} line item(s) still require price approval before any Maven/Invoice4U action.`,
    );
  }

  if (missingEvidenceItems.length) {
    warnings.push(
      `${missingEvidenceItems.length} line item(s) have no preserved pricing evidence.`,
    );
  }

  if (!document.serviceReport) {
    warnings.push("No source ServiceReport is linked to this draft.");
  }

  if (document.mavenDocumentNumber || document.mavenPdfLink) {
    warnings.push("Maven fields are populated; verify no duplicate external action before proceeding.");
  }

  if (document.sendStatus || document.sendByEmail || document.sendByWhatsapp) {
    warnings.push("Send fields are populated; verify customer-facing delivery status before proceeding.");
  }

  return warnings.length
    ? warnings
    : ["Review-ready internal draft. User approval is still required before any external action."];
}
