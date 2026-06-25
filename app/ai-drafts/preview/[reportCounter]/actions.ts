"use server";

import {
  ApprovalStatus,
  BusinessDocumentStatus,
  BusinessDocumentType,
  MatchSource,
  Prisma,
  SourceSystem,
} from "@prisma/client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "../../../../lib/prisma";
import { getAiDraftPreviewByReportCounter } from "../../ai-draft-adapter";

function parseMoney(value: string) {
  if (value === "Needs approval" || value === "No amount") {
    return null;
  }

  const numericValue = Number(value.replace(" ILS", ""));
  return Number.isFinite(numericValue) ? numericValue : null;
}

function parseQuantity(value: string) {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : null;
}

function mapMatchSource(source: string) {
  if (source.startsWith("ProductCatalog")) {
    return MatchSource.PRODUCTS_CATALOG;
  }

  if (source.startsWith("BusinessDocumentItems")) {
    return MatchSource.SAME_CUSTOMER_HISTORY;
  }

  if (source.startsWith("Maven")) {
    return MatchSource.MAVEN_HISTORY;
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

function buildDraftId(reportCounter: string) {
  return `NEXT-AI-DRAFT-${reportCounter}`;
}

export async function approveAiDraftPreviewToBusinessDocument(
  formData: FormData,
) {
  const reportCounter = String(formData.get("reportCounter") || "").trim();
  const approvalText = String(formData.get("approvalText") || "").trim();
  const approvedBy = String(formData.get("approvedBy") || "Liad").trim() || "Liad";
  const overrideMissingPricing =
    formData.get("overrideMissingPricing") === "on";

  if (approvalText !== "APPROVE DRAFT") {
    redirect(`/ai-drafts/preview/${reportCounter}?draftStatus=approval-required`);
  }

  const preview = await getAiDraftPreviewByReportCounter(reportCounter);

  if (!preview) {
    redirect(`/ai-drafts/preview/${reportCounter}?draftStatus=not-found`);
  }

  if (preview.creation.existingBusinessDocumentId) {
    redirect(
      `/business-documents/${preview.creation.existingBusinessDocumentId}?draftStatus=existing`,
    );
  }

  if (preview.creation.requiresPricingOverride && !overrideMissingPricing) {
    redirect(
      `/ai-drafts/preview/${reportCounter}?draftStatus=pricing-override-required`,
    );
  }

  const itemDrafts = preview.lines.map((line) => {
    const quantity = parseQuantity(line.quantity);

    if (quantity === null) {
      return null;
    }

    const unitPrice = parseMoney(line.unitPrice);
    const totalPrice = parseMoney(line.total);

    return {
      line,
      quantity,
      unitPrice,
      totalPrice,
      needsPriceApproval:
        line.needsApproval === "Required" ||
        unitPrice === null ||
        totalPrice === null,
    };
  });

  if (itemDrafts.some((item) => item === null)) {
    redirect(`/ai-drafts/preview/${reportCounter}?draftStatus=invalid-quantity`);
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
  const draftId = buildDraftId(reportCounter);
  const now = new Date();

  const createdDocument = await prisma.$transaction(async (tx) => {
    const sourceReport = await tx.serviceReport.findUnique({
      where: { appsheetReportId: preview.reportId },
      select: {
        id: true,
        customerId: true,
        appsheetReportId: true,
        reportCounter: true,
      },
    });

    if (!sourceReport) {
      throw new Error("Source ServiceReport is missing.");
    }

    const existingByReport = await tx.businessDocument.findFirst({
      where: { serviceReportId: sourceReport.id },
      select: { appsheetBusinessDocumentId: true },
    });

    if (existingByReport) {
      return existingByReport;
    }

    const document = await tx.businessDocument.create({
      data: {
        appsheetBusinessDocumentId: draftId,
        customerId: sourceReport.customerId,
        serviceReportId: sourceReport.id,
        sourceReportCounter: sourceReport.reportCounter,
        sourceDocumentId: sourceReport.appsheetReportId,
        documentTypeSuggested: BusinessDocumentType.SERVICE_DOCUMENT,
        documentTypeSelected: BusinessDocumentType.SERVICE_DOCUMENT,
        aiReasoning: preview.documentReason,
        status: BusinessDocumentStatus.WAITING_USER_APPROVAL,
        sourceStatusText: hasApprovalRequiredLines
          ? "Draft created with pricing override required"
          : "Draft created from approved AI preview",
        draftTitle: `AI Draft Preview ${preview.reportCounter}`,
        description: `Internal BusinessDocument draft created from AI Draft Preview for Service Report ${preview.reportCounter}.`,
        itemsJson: preview.lines as unknown as Prisma.InputJsonValue,
        subtotalAmount: new Prisma.Decimal(knownSubtotal.toFixed(2)),
        vatAmount: null,
        totalAmount: hasApprovalRequiredLines
          ? null
          : new Prisma.Decimal(knownSubtotal.toFixed(2)),
        currency: "ILS",
        approvalStatus: ApprovalStatus.PENDING,
        approvedBy,
        approvedAt: now,
        sendByEmail: false,
        sendByWhatsapp: false,
        sourceSystem: SourceSystem.NEXTJS,
        notes: hasApprovalRequiredLines
          ? "User explicitly approved draft creation with missing pricing evidence. Lines still require price approval before Maven/customer action."
          : "User approved internal BusinessDocument draft creation from AI Draft Preview.",
        rawSource: {
          source: "AI_DRAFT_PREVIEW",
          reportCounter: preview.reportCounter,
          approvedBy,
          approvedAt: now.toISOString(),
          overrideMissingPricing,
          missingPricingLines: preview.creation.missingPricingLines,
          noMavenAction: true,
          noEmailAction: true,
          noInventoryAction: true,
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
        itemName: item.line.item,
        description: item.line.reason,
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
        itemType: item.line.item.toLowerCase().includes("filter")
          ? "PART"
          : "SERVICE",
        needsPriceApproval: item.needsPriceApproval,
        matchConfidence: mapConfidence(item.line.confidence),
        rawSource: {
          source: "AI_DRAFT_PREVIEW_LINE",
          reportCounter: preview.reportCounter,
          line: item.line,
          pricingEvidence: item.line.pricingEvidence,
          overrideMissingPricing,
        },
      })),
    });

    await tx.businessDocumentLog.create({
      data: {
        businessDocumentId: document.id,
        action: "AI_DRAFT_PREVIEW_APPROVED_TO_BUSINESS_DOCUMENT",
        performedBy: approvedBy,
        result: "Created internal BusinessDocument draft only",
        notes:
          "No Maven/Invoice4U action, no email/customer-facing action, and no inventory deduction occurred.",
        rawData: {
          reportCounter: preview.reportCounter,
          overrideMissingPricing,
          missingPricingLines: preview.creation.missingPricingLines,
        },
      },
    });

    return document;
  });

  revalidatePath(`/ai-drafts/preview/${reportCounter}`);
  revalidatePath("/business-documents");
  revalidatePath(`/business-documents/${createdDocument.appsheetBusinessDocumentId}`);

  redirect(
    `/business-documents/${createdDocument.appsheetBusinessDocumentId}?draftStatus=created`,
  );
}
