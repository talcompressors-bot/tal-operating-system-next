"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getAiDraftPreviewByReportCounter } from "../../ai-draft-adapter";
import {
  BUSINESS_DOCUMENT_DRAFT_GATEWAY_APPROVAL_PHRASE,
  BusinessDocumentDraftGatewayError,
  createBusinessDocumentDraftFromGateway,
} from "../../../../lib/business-document-draft-gateway";

export async function approveAiDraftPreviewToBusinessDocument(
  formData: FormData,
) {
  const reportCounter = String(formData.get("reportCounter") || "").trim();
  const approvalText = String(formData.get("approvalText") || "").trim();
  const approvedBy = String(formData.get("approvedBy") || "Liad").trim() || "Liad";
  const overrideMissingPricing =
    formData.get("overrideMissingPricing") === "on";

  if (
    approvalText !== "APPROVE DRAFT" &&
    approvalText !== BUSINESS_DOCUMENT_DRAFT_GATEWAY_APPROVAL_PHRASE
  ) {
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

  let createdDocument;

  try {
    createdDocument = await createBusinessDocumentDraftFromGateway({
      serviceReportId: preview.serviceReportInternalId,
      documentType: "SERVICE_DOCUMENT",
      approvedBy,
      approvalText: BUSINESS_DOCUMENT_DRAFT_GATEWAY_APPROVAL_PHRASE,
      intelligenceComplete: true,
      pricingReviewed: true,
      confidenceReviewed: true,
      missingEvidenceReviewed: true,
      overrideMissingPricing,
      title: `AI Draft Preview ${preview.reportCounter}`,
      description: `Internal BusinessDocument draft created from AI Draft Preview for Service Report ${preview.reportCounter}.`,
      aiReasoning: preview.documentReason,
      lines: preview.lines.map((line) => ({
        itemName: line.item,
        description: line.reason,
        quantity: line.quantity,
        unitPrice: line.unitPrice,
        totalPrice: line.total,
        source: line.source,
        itemType: line.item.toLowerCase().includes("filter") ? "PART" : "SERVICE",
        confidence: line.confidence,
        needsApproval: line.needsApproval === "Required",
        pricingEvidence: line.pricingEvidence,
        rawSource: {
          reportCounter: preview.reportCounter,
          line,
        },
      })),
      missingEvidence: preview.creation.missingPricingLines,
      confidenceSummary: preview.lines
        .map((line) => `${line.item}: ${line.confidence}`)
        .join("; "),
      source: "AI_DRAFT_PREVIEW",
      rawSource: {
        reportCounter: preview.reportCounter,
        previewId: preview.id,
      },
    });
  } catch (error) {
    if (error instanceof BusinessDocumentDraftGatewayError) {
      redirect(`/ai-drafts/preview/${reportCounter}?draftStatus=${error.code}`);
    }

    throw error;
  }

  revalidatePath(`/ai-drafts/preview/${reportCounter}`);
  revalidatePath("/business-documents");
  revalidatePath(`/business-documents/${createdDocument.appsheetBusinessDocumentId}`);

  redirect(
    `/business-documents/${createdDocument.appsheetBusinessDocumentId}?draftStatus=${
      createdDocument.created ? "created" : "existing"
    }`,
  );
}
