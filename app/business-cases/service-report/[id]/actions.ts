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
import { buildProductionDraftRecommendation } from "../../../../lib/business-document-production-draft";
import {
  buildBusinessSuggestionPolicy,
  buildDraftReviewPolicy,
  buildExternalActionPolicy,
  buildLearningEvidencePolicy,
  buildServiceReportDraftPolicy,
} from "../../../../lib/business-action-policy";
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
  const approvedBy =
    String(formData.get("approvedBy") || "Policy Automation").trim() ||
    "Policy Automation";
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
    const productionDraftRecommendation =
      await buildProductionDraftRecommendation(
        businessCase.source.id,
        intentDecision.selectedDocumentType ?? undefined,
      );

    if (!productionDraftRecommendation) {
      gatewayRedirect(serviceReportId, "not-found");
    }

    const hasMissingEvidence = productionDraftRecommendation.missingEvidence.length > 0;
    const hasLowConfidence = productionDraftRecommendation.lines.some(
      (line) => line.confidence === "Low",
    );
    const hasReviewRequiredLines = productionDraftRecommendation.lines.some(
      (line) =>
        line.needsApproval ||
        line.unitPrice === "Needs approval" ||
        line.unitPrice === "Needs Price Review",
    );
    const draftPolicy = buildServiceReportDraftPolicy({
      hasServiceReport: Boolean(businessCase.source.id),
      hasCustomer: Boolean(businessCase.party.id),
      businessIntentAllowed: intentDecision.canCreateBusinessDocumentDraftNow,
      selectedDocumentType: intentDecision.selectedDocumentType,
      allowedDocumentTypes: intentDecision.allowedDocumentTypes,
      idempotencyProtected: true,
      externalSideEffectsBlocked: true,
      hasMissingEvidence,
      hasLowConfidence,
      hasReviewRequiredLines,
    });

    if (draftPolicy.state === "BLOCKED" || draftPolicy.state === "APPROVAL_REQUIRED") {
      gatewayRedirect(serviceReportId, "policy-blocked");
    }

    const suggestionPolicy = buildBusinessSuggestionPolicy();
    const reviewPolicy = buildDraftReviewPolicy(hasReviewRequiredLines);
    const learningPolicy = buildLearningEvidencePolicy();
    const externalActionPolicy = buildExternalActionPolicy();

    const result = await createBusinessDocumentDraftFromGateway({
      serviceReportId: businessCase.source.id,
      documentType,
      approvedBy,
      approvalText,
      policyState: draftPolicy.state,
      intelligenceComplete,
      pricingReviewed: pricingReviewed || draftPolicy.automatic,
      confidenceReviewed: confidenceReviewed || draftPolicy.automatic,
      missingEvidenceReviewed:
        missingEvidenceReviewed || draftPolicy.automatic,
      overrideMissingPricing:
        overrideMissingPricing || draftPolicy.state === "REVIEW_REQUIRED",
      title: productionDraftRecommendation.title,
      description: `${productionDraftRecommendation.description} כוונת משתמש שנבחרה: ${intentDecision.label}.`,
      aiReasoning: businessCase.serviceFlow.intelligence
        .map((item) => `${item.label}: ${item.value}`)
        .concat([
          `Production draft: ${productionDraftRecommendation.explainabilitySummary}`,
          `Knowledge quality: ${productionDraftRecommendation.qualitySummary}`,
        ])
        .join("\n"),
      lines: productionDraftRecommendation.gatewayLines,
      missingEvidence: [
        ...(missingEvidence ? [missingEvidence] : []),
        ...productionDraftRecommendation.missingEvidence,
      ],
      confidenceSummary: [
        confidenceSummary,
        productionDraftRecommendation.confidenceSummary,
      ]
        .filter(Boolean)
        .join("; "),
      source: "PRODUCTION_DRAFT_GENERATION",
      rawSource: {
        businessIntent,
        intentDecision,
        actionPolicy: {
          draftGeneration: draftPolicy,
          businessSuggestions: suggestionPolicy,
          draftReview: reviewPolicy,
          learningEvidence: learningPolicy,
          externalActions: externalActionPolicy,
        },
        businessCaseId: businessCase.id,
        serviceFlowBoundary: businessCase.serviceFlow.boundary,
        intelligence: businessCase.serviceFlow.intelligence,
        suggestions: businessCase.serviceFlow.suggestions,
        productionDraftRecommendation: {
          detectedMaintenanceType:
            productionDraftRecommendation.detectedMaintenanceType,
          knowledgeUsed: productionDraftRecommendation.knowledgeUsed,
          qualitySummary: productionDraftRecommendation.qualitySummary,
          estimatedManualWorkReduction:
            productionDraftRecommendation.estimatedManualWorkReduction,
        },
        learningPolicy:
          "Learning uses approved user decisions only. Rejected drafts must not update trusted knowledge. Historical evidence is append-only.",
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
