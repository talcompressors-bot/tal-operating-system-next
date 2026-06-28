"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  BUSINESS_DOCUMENT_DRAFT_GATEWAY_APPROVAL_PHRASE,
  BusinessDocumentDraftGatewayError,
  createBusinessDocumentDraftFromGateway,
} from "../../../../lib/business-document-draft-gateway";
import {
  BusinessIntentPolicyError,
  assertBusinessIntentPolicyAllowsDraft,
} from "../../../../lib/business-intent-policy";
import { getBusinessCaseByServiceReportId } from "../../business-case-runtime";

function gatewayRedirect(serviceReportId: string, status: string): never {
  redirect(`/business-cases/service-report/${serviceReportId}?draftGatewayStatus=${status}`);
}

function getIntelligenceValue(
  businessCase: NonNullable<Awaited<ReturnType<typeof getBusinessCaseByServiceReportId>>>,
  label: string,
) {
  return (
    businessCase.serviceFlow.intelligence.find((item) => item.label === label)
      ?.value ?? ""
  );
}

export async function createBusinessDocumentDraftFromBusinessCase(
  formData: FormData,
) {
  const serviceReportId = String(formData.get("serviceReportId") || "").trim();
  const businessIntent = String(formData.get("businessIntent") || "").trim();
  const documentType = String(formData.get("documentType") || "").trim();
  const approvedBy = String(formData.get("approvedBy") || "Liad").trim() || "Liad";
  const approvalText = String(formData.get("approvalText") || "").trim();
  const overrideMissingPricing =
    formData.get("overrideMissingPricing") === "on";
  const pricingReviewed = formData.get("pricingReviewed") === "on";
  const confidenceReviewed = formData.get("confidenceReviewed") === "on";
  const missingEvidenceReviewed =
    formData.get("missingEvidenceReviewed") === "on";
  const billableWorkConfirmed =
    formData.get("billableWorkConfirmed") === "on";
  const internalOverrideConfirmed =
    formData.get("internalOverrideConfirmed") === "on";

  const businessCase = await getBusinessCaseByServiceReportId(serviceReportId);

  if (!businessCase) {
    gatewayRedirect(serviceReportId, "not-found");
  }

  const intelligenceComplete = businessCase.serviceFlow.intelligence.length >= 8;
  const missingEvidence = getIntelligenceValue(
    businessCase,
    "What evidence is missing?",
  );
  const confidenceSummary = businessCase.serviceFlow.suggestions
    .map((suggestion) => `${suggestion.label}: ${suggestion.status}`)
    .join("; ");
  const firstAsset = businessCase.assets[0];
  const lineName = firstAsset
    ? `${businessCase.source.label} - ${firstAsset.label}`
    : businessCase.source.label;

  try {
    const intentDecision = assertBusinessIntentPolicyAllowsDraft({
      intent: businessIntent,
      selectedDocumentType: documentType,
      hasBusinessIntelligence: intelligenceComplete,
      hasCustomer: Boolean(businessCase.party.id),
      hasServiceEvidence: Boolean(businessCase.service.summary),
      hasPaymentEvidence: businessCase.financial.status !== "Not started",
      hasSourceBusinessDocument: Boolean(
        businessCase.commercial.documents.length,
      ),
      hasInventoryRuntime: businessCase.inventory.status !== "Placeholder",
      billableWorkConfirmed,
      internalOverrideConfirmed,
    });
    const result = await createBusinessDocumentDraftFromGateway({
      serviceReportId: businessCase.source.id,
      documentType,
      approvedBy,
      approvalText,
      intelligenceComplete,
      pricingReviewed,
      confidenceReviewed,
      missingEvidenceReviewed,
      overrideMissingPricing,
      title: `${documentType} Draft - ${businessCase.source.label}`,
      description: `Internal ${documentType} BusinessDocument draft created for ${intentDecision.label} from BusinessCase Business Intelligence and Business Suggestions. No external action was executed.`,
      aiReasoning: businessCase.serviceFlow.intelligence
        .map((item) => `${item.label}: ${item.value}`)
        .join("\n"),
      lines: [
        {
          itemName: lineName,
          description: [
            businessCase.service.summary,
            getIntelligenceValue(businessCase, "Business action recommended"),
            `Missing evidence: ${missingEvidence}`,
          ]
            .filter(Boolean)
            .join("\n"),
          quantity: "1",
          unitPrice: "Needs approval",
          totalPrice: "Needs approval",
          source: "BusinessCase",
          itemType: "SERVICE",
          confidence: "Low",
          needsApproval: true,
          pricingEvidence: [
            {
              source: "BusinessCase Business Intelligence",
              unitPrice: "Needs approval",
              total: "Needs approval",
              confidence: "Low",
              note: "Generic gateway draft uses visible Business Intelligence only. Pricing must be reviewed before approval or external action.",
            },
          ],
          rawSource: {
            businessCaseId: businessCase.id,
            source: businessCase.source,
            party: businessCase.party,
            assets: businessCase.assets,
            suggestions: businessCase.serviceFlow.suggestions,
          },
        },
      ],
      missingEvidence: missingEvidence ? [missingEvidence] : [],
      confidenceSummary,
      source: "BUSINESS_CASE_DRAFT_GATEWAY",
      rawSource: {
        businessIntent,
        intentDecision,
        businessCaseId: businessCase.id,
        serviceFlowBoundary: businessCase.serviceFlow.boundary,
        intelligence: businessCase.serviceFlow.intelligence,
        suggestions: businessCase.serviceFlow.suggestions,
      },
    });

    revalidatePath(`/business-cases/service-report/${serviceReportId}`);
    revalidatePath("/operations");
    revalidatePath(businessCase.party.href || "/customers");
    revalidatePath("/business-documents");
    revalidatePath(`/business-documents/${result.appsheetBusinessDocumentId}`);

    redirect(
      `/business-documents/${result.appsheetBusinessDocumentId}?draftStatus=${
        result.created ? "created" : "existing"
      }`,
    );
  } catch (error) {
    if (error instanceof BusinessIntentPolicyError) {
      gatewayRedirect(serviceReportId, error.code);
    }

    if (error instanceof BusinessDocumentDraftGatewayError) {
      gatewayRedirect(serviceReportId, error.code);
    }

    throw error;
  }
}
