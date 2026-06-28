import {
  ApprovalStatus,
  BusinessDocumentStatus,
  BusinessDocumentType,
  MatchSource,
  Prisma,
  SourceSystem,
} from "@prisma/client";
import { prisma } from "./prisma";
import type { InternalActionPolicyState } from "./business-action-policy";

export const BUSINESS_DOCUMENT_DRAFT_GATEWAY_APPROVAL_PHRASE =
  "CREATE BUSINESS DOCUMENT DRAFT";

export const SUPPORTED_DRAFT_DOCUMENT_TYPES = [
  BusinessDocumentType.QUOTE,
  BusinessDocumentType.INVOICE,
  BusinessDocumentType.RECEIPT,
  BusinessDocumentType.SERVICE_DOCUMENT,
  BusinessDocumentType.CREDIT_NOTE,
  BusinessDocumentType.OTHER,
] as const;

type SupportedDraftDocumentType = (typeof SUPPORTED_DRAFT_DOCUMENT_TYPES)[number];

export type BusinessDocumentDraftGatewayLineInput = {
  itemName: string;
  description: string;
  quantity: string;
  unitPrice: string;
  totalPrice: string;
  source: string;
  itemType: string;
  confidence: string;
  needsApproval: boolean;
  pricingEvidence: Prisma.InputJsonValue;
  rawSource: Prisma.InputJsonValue;
};

export type BusinessDocumentDraftGatewayInput = {
  // Accepts the current app route/source id (`appsheetReportId`) or the Prisma UUID.
  serviceReportId: string;
  documentType: string;
  approvedBy: string;
  approvalText: string;
  policyState?: InternalActionPolicyState;
  intelligenceComplete: boolean;
  pricingReviewed: boolean;
  confidenceReviewed: boolean;
  missingEvidenceReviewed: boolean;
  overrideMissingPricing: boolean;
  title: string;
  description: string;
  aiReasoning: string;
  lines: BusinessDocumentDraftGatewayLineInput[];
  missingEvidence: string[];
  confidenceSummary: string;
  source: string;
  rawSource: Prisma.InputJsonValue;
};

export type BusinessDocumentDraftGatewayResult = {
  appsheetBusinessDocumentId: string;
  created: boolean;
};

export class BusinessDocumentDraftGatewayError extends Error {
  constructor(
    public code:
      | "approval-required"
      | "document-type-required"
      | "unsupported-document-type"
      | "intelligence-incomplete"
      | "pricing-review-required"
      | "confidence-review-required"
      | "missing-evidence-review-required"
      | "pricing-override-required"
      | "invalid-lines"
      | "source-report-missing",
    message: string,
  ) {
    super(message);
  }
}

function normalizeDocumentType(value: string): SupportedDraftDocumentType | null {
  const normalized = value.trim().toUpperCase();

  return (
    SUPPORTED_DRAFT_DOCUMENT_TYPES.find((documentType) => documentType === normalized) ??
    null
  );
}

function parseMoney(value: string) {
  if (value === "Needs approval" || value === "No amount" || !value.trim()) {
    return null;
  }

  const numericValue = Number(value.replace(" ILS", ""));

  return Number.isFinite(numericValue) ? numericValue : null;
}

function parseQuantity(value: string) {
  const numericValue = Number(value);

  if (Number.isFinite(numericValue)) {
    return {
      quantity: numericValue,
      requiresApproval: numericValue <= 0,
    };
  }

  if (value.toLowerCase().includes("missing")) {
    return {
      quantity: 0,
      requiresApproval: true,
    };
  }

  return null;
}

function mapMatchSource(source: string) {
  if (source.startsWith("ProductCatalog")) {
    return MatchSource.PRODUCTS_CATALOG;
  }

  if (source.startsWith("BusinessDocumentItems:SameCustomer")) {
    return MatchSource.SAME_CUSTOMER_HISTORY;
  }

  if (source.startsWith("BusinessDocumentItems:SameEquipment")) {
    return MatchSource.SAME_EQUIPMENT_HISTORY;
  }

  if (source.startsWith("BusinessDocumentItems")) {
    return MatchSource.SIMILAR_SERVICE_HISTORY;
  }

  if (source.startsWith("Maven")) {
    return MatchSource.MAVEN_HISTORY;
  }

  if (source === "BusinessCase") {
    return MatchSource.MANUAL;
  }

  return MatchSource.UNKNOWN;
}

function mapConfidence(confidence: string) {
  const numericConfidence = Number(confidence);

  if (Number.isFinite(numericConfidence)) {
    return numericConfidence;
  }

  if (confidence === "High") {
    return 90;
  }

  if (confidence === "Medium") {
    return 60;
  }

  if (confidence === "Low") {
    return 20;
  }

  return null;
}

function buildDraftId(sourceReportId: string, documentType: BusinessDocumentType) {
  return `NEXT-BD-DRAFT-${sourceReportId}-${documentType}`;
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
}

function validateGatewayInput(
  input: BusinessDocumentDraftGatewayInput,
): SupportedDraftDocumentType {
  const policyState = input.policyState ?? "APPROVAL_REQUIRED";
  const requiresApprovalPhrase = policyState === "APPROVAL_REQUIRED";
  const requiresReviewConfirmation = policyState === "APPROVAL_REQUIRED";

  if (
    requiresApprovalPhrase &&
    input.approvalText !== BUSINESS_DOCUMENT_DRAFT_GATEWAY_APPROVAL_PHRASE
  ) {
    throw new BusinessDocumentDraftGatewayError(
      "approval-required",
      "The exact approval phrase is required before draft creation.",
    );
  }

  const documentType = normalizeDocumentType(input.documentType);

  if (!input.documentType.trim()) {
    throw new BusinessDocumentDraftGatewayError(
      "document-type-required",
      "A selected document type is required.",
    );
  }

  if (!documentType) {
    throw new BusinessDocumentDraftGatewayError(
      "unsupported-document-type",
      "The selected document type is not supported by the current schema.",
    );
  }

  if (!input.intelligenceComplete) {
    throw new BusinessDocumentDraftGatewayError(
      "intelligence-incomplete",
      "Complete Business Intelligence must be visible before draft creation.",
    );
  }

  if (requiresReviewConfirmation && !input.pricingReviewed) {
    throw new BusinessDocumentDraftGatewayError(
      "pricing-review-required",
      "Pricing review confirmation is required.",
    );
  }

  if (requiresReviewConfirmation && !input.confidenceReviewed) {
    throw new BusinessDocumentDraftGatewayError(
      "confidence-review-required",
      "Confidence visibility confirmation is required.",
    );
  }

  if (requiresReviewConfirmation && !input.missingEvidenceReviewed) {
    throw new BusinessDocumentDraftGatewayError(
      "missing-evidence-review-required",
      "Missing evidence visibility confirmation is required.",
    );
  }

  if (
    requiresReviewConfirmation &&
    input.lines.some((line) => line.needsApproval || parseMoney(line.unitPrice) === null) &&
    !input.overrideMissingPricing
  ) {
    throw new BusinessDocumentDraftGatewayError(
      "pricing-override-required",
      "A pricing override is required for approval-required or missing-price lines.",
    );
  }

  if (!input.lines.length) {
    throw new BusinessDocumentDraftGatewayError(
      "invalid-lines",
      "At least one draft line is required.",
    );
  }

  return documentType;
}

export async function createBusinessDocumentDraftFromGateway(
  input: BusinessDocumentDraftGatewayInput,
): Promise<BusinessDocumentDraftGatewayResult> {
  const policyState = input.policyState ?? "APPROVAL_REQUIRED";
  const documentType = validateGatewayInput(input);
  const itemDrafts = input.lines.map((line) => {
    const parsedQuantity = parseQuantity(line.quantity);

    if (parsedQuantity === null) {
      return null;
    }

    const unitPrice = parseMoney(line.unitPrice);
    const totalPrice = parseMoney(line.totalPrice);

    return {
      line,
      quantity: parsedQuantity.quantity,
      unitPrice,
      totalPrice,
      needsPriceApproval:
        parsedQuantity.requiresApproval ||
        line.needsApproval ||
        unitPrice === null ||
        totalPrice === null,
    };
  });

  if (itemDrafts.some((item) => item === null)) {
    throw new BusinessDocumentDraftGatewayError(
      "invalid-lines",
      "At least one line has an invalid quantity.",
    );
  }

  const validItems = itemDrafts.filter(
    (item): item is NonNullable<(typeof itemDrafts)[number]> => item !== null,
  );
  const knownSubtotal = validItems.reduce(
    (sum, item) => sum + (item.totalPrice ?? 0),
    0,
  );
  const hasApprovalRequiredLines = validItems.some(
    (item) => item.needsPriceApproval,
  );
  const now = new Date();

  return prisma.$transaction(async (tx) => {
    const sourceReport = await tx.serviceReport.findFirst({
      where: isUuid(input.serviceReportId)
        ? { id: input.serviceReportId }
        : { appsheetReportId: input.serviceReportId },
      select: {
        id: true,
        customerId: true,
        appsheetReportId: true,
        reportCounter: true,
      },
    });

    if (!sourceReport) {
      throw new BusinessDocumentDraftGatewayError(
        "source-report-missing",
        "Source ServiceReport is missing.",
      );
    }

    const draftId = buildDraftId(sourceReport.appsheetReportId, documentType);
    const existingById = await tx.businessDocument.findUnique({
      where: { appsheetBusinessDocumentId: draftId },
      select: { appsheetBusinessDocumentId: true },
    });

    if (existingById) {
      return {
        appsheetBusinessDocumentId: existingById.appsheetBusinessDocumentId,
        created: false,
      };
    }

    const existingByReportAndType = await tx.businessDocument.findFirst({
      where: {
        serviceReportId: sourceReport.id,
        documentTypeSelected: documentType,
      },
      select: { appsheetBusinessDocumentId: true },
      orderBy: [{ createdAt: "asc" }, { id: "asc" }],
    });

    if (existingByReportAndType) {
      return {
        appsheetBusinessDocumentId: existingByReportAndType.appsheetBusinessDocumentId,
        created: false,
      };
    }

    const document = await tx.businessDocument.create({
      data: {
        appsheetBusinessDocumentId: draftId,
        customerId: sourceReport.customerId,
        serviceReportId: sourceReport.id,
        sourceReportCounter: sourceReport.reportCounter,
        sourceDocumentId: sourceReport.appsheetReportId,
        documentTypeSuggested: documentType,
        documentTypeSelected: documentType,
        aiReasoning: input.aiReasoning,
        status: BusinessDocumentStatus.WAITING_USER_APPROVAL,
        sourceStatusText: hasApprovalRequiredLines
          ? "Draft created with review-required pricing or evidence"
          : "Draft created from approved Business Suggestion",
        draftTitle: input.title,
        description: input.description,
        itemsJson: input.lines as unknown as Prisma.InputJsonValue,
        subtotalAmount: new Prisma.Decimal(knownSubtotal.toFixed(2)),
        vatAmount: null,
        totalAmount: hasApprovalRequiredLines
          ? null
          : new Prisma.Decimal(knownSubtotal.toFixed(2)),
        currency: "ILS",
        approvalStatus: ApprovalStatus.PENDING,
        approvedBy: input.approvedBy,
        approvedAt: now,
        sendByEmail: false,
        sendByWhatsapp: false,
        sourceSystem: SourceSystem.NEXTJS,
        notes: hasApprovalRequiredLines
          ? "User approved internal BusinessDocument draft creation with review-required pricing or evidence. Lines must be reviewed before any external action."
          : "User approved internal BusinessDocument draft creation from Business Suggestions.",
        rawSource: {
          source: input.source,
          approvedBy: input.approvedBy,
          approvedAt: now.toISOString(),
          documentType,
          gatewayIdempotencyKey: draftId,
          intelligenceComplete: input.intelligenceComplete,
          pricingReviewed: input.pricingReviewed,
          confidenceReviewed: input.confidenceReviewed,
          missingEvidenceReviewed: input.missingEvidenceReviewed,
          overrideMissingPricing: input.overrideMissingPricing,
          policyState,
          missingEvidence: input.missingEvidence,
          confidenceSummary: input.confidenceSummary,
          noMavenAction: true,
          noInvoice4UAction: true,
          noEmailAction: true,
          noInventoryAction: true,
          noReceiptIssuing: true,
          rawSource: input.rawSource,
        },
      },
      select: {
        id: true,
        appsheetBusinessDocumentId: true,
      },
    });

    await tx.businessDocumentItem.createMany({
      data: validItems.map((item, index) => ({
        appsheetItemId: `${draftId}-ITEM-${index + 1}`,
        businessDocumentId: document.id,
        itemName: item.line.itemName,
        description: item.line.description,
        quantity: new Prisma.Decimal(item.quantity.toFixed(3)),
        unitPrice:
          item.unitPrice === null
            ? null
            : new Prisma.Decimal(item.unitPrice.toFixed(2)),
        totalPrice:
          item.totalPrice === null
            ? null
            : new Prisma.Decimal(item.totalPrice.toFixed(2)),
        source: mapMatchSource(item.line.source),
        itemType: item.line.itemType,
        needsPriceApproval: item.needsPriceApproval,
        matchConfidence: mapConfidence(item.line.confidence),
        rawSource: {
          source: input.source,
          line: item.line.rawSource,
          pricingEvidence: item.line.pricingEvidence,
          overrideMissingPricing: input.overrideMissingPricing,
        },
      })),
    });

    await tx.businessDocumentLog.create({
      data: {
        businessDocumentId: document.id,
        action: "BUSINESS_DOCUMENT_DRAFT_GATEWAY_CREATED",
        performedBy: input.approvedBy,
        result: "Created internal BusinessDocument draft only",
        notes:
          "No Maven/Invoice4U action, no email/customer-facing action, no receipt issuing, and no inventory mutation occurred.",
        rawData: {
          source: input.source,
          documentType,
          gatewayIdempotencyKey: draftId,
          policyState,
          missingEvidence: input.missingEvidence,
          confidenceSummary: input.confidenceSummary,
        },
      },
    });

    return {
      appsheetBusinessDocumentId: document.appsheetBusinessDocumentId,
      created: true,
    };
  });
}
