"use server";

import {
  ApprovalStatus,
  AutomationCommandStatus,
  AutomationCommandType,
  BusinessDocumentStatus,
  Prisma,
} from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  BUSINESS_DOCUMENT_APPROVAL_PHRASE,
  getBusinessDocumentApprovalBlockers,
} from "../../../lib/business-document-approval-boundary";
import {
  CREATE_MAVEN_COMMAND_PHRASE,
  getMavenDraftCommandCreationStatus,
} from "../../../lib/business-document-automation-boundary";
import { prisma } from "../../../lib/prisma";

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
}

function buildRedirect(documentId: string, status: string) {
  return `/business-documents/${documentId}?commandStatus=${status}`;
}

function buildApprovalRedirect(documentId: string, status: string) {
  return `/business-documents/${documentId}?approvalStatus=${status}`;
}

function buildLineResolutionRedirect(documentId: string, status: string) {
  return `/business-documents/${documentId}?lineStatus=${status}`;
}

function readPositiveDecimal(value: FormDataEntryValue | null) {
  const text = String(value || "").trim();
  const numberValue = Number(text);

  if (!text || !Number.isFinite(numberValue) || numberValue < 0) {
    return null;
  }

  return new Prisma.Decimal(text);
}

function readJsonObject(value: Prisma.JsonValue | null) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return value as Record<string, Prisma.JsonValue>;
}

async function findBusinessDocumentForApproval(businessDocumentId: string) {
  return prisma.businessDocument.findFirst({
    where: {
      OR: [
        { appsheetBusinessDocumentId: businessDocumentId },
        ...(isUuid(businessDocumentId) ? [{ id: businessDocumentId }] : []),
      ],
    },
    select: {
      id: true,
      appsheetBusinessDocumentId: true,
      status: true,
      approvalStatus: true,
      items: {
        select: {
          id: true,
          itemName: true,
          quantity: true,
          unitPrice: true,
          totalPrice: true,
          needsPriceApproval: true,
        },
      },
    },
  });
}

export async function approveBusinessDocument(formData: FormData) {
  const businessDocumentId = String(
    formData.get("businessDocumentId") || "",
  ).trim();
  const approvalText = String(formData.get("approvalText") || "").trim();
  const approvedBy = String(formData.get("approvedBy") || "Liad").trim() || "Liad";
  const overrideReviewBlockers = formData.get("overrideReviewBlockers") === "on";

  if (!businessDocumentId) {
    redirect("/business-documents?approvalStatus=missing-document");
  }

  if (approvalText !== BUSINESS_DOCUMENT_APPROVAL_PHRASE) {
    redirect(buildApprovalRedirect(businessDocumentId, "approval-required"));
  }

  const document = await findBusinessDocumentForApproval(businessDocumentId);

  if (!document) {
    redirect("/business-documents?approvalStatus=not-found");
  }

  const canonicalDocumentId = document.appsheetBusinessDocumentId;
  const blockers = getBusinessDocumentApprovalBlockers(document, "action");

  if (blockers.length && !overrideReviewBlockers) {
    redirect(buildApprovalRedirect(canonicalDocumentId, "override-required"));
  }

  const now = new Date();

  await prisma.$transaction(async (tx) => {
    await tx.businessDocument.update({
      where: { id: document.id },
      data: {
        status: BusinessDocumentStatus.APPROVED,
        approvalStatus: ApprovalStatus.APPROVED,
        approvedBy,
        approvedAt: now,
        sourceStatusText: blockers.length
          ? "Approved with explicit review override"
          : "Approved for internal next-step review",
      },
    });

    await tx.businessDocumentLog.create({
      data: {
        businessDocumentId: document.id,
        action: "BUSINESS_DOCUMENT_APPROVED",
        performedBy: approvedBy,
        result: blockers.length
          ? "Approved with explicit pricing or quantity override"
          : "Approved BusinessDocument for internal next-step review",
        notes:
          "No Maven/Invoice4U action, no AutomationCommand creation, no email/customer-facing action, and no inventory deduction occurred.",
        rawData: {
          approvalPhrase: BUSINESS_DOCUMENT_APPROVAL_PHRASE,
          overrideReviewBlockers,
          blockers,
          noMavenCall: true,
          noAutomationCommandCreated: true,
          noEmail: true,
          noInventory: true,
        } satisfies Prisma.InputJsonValue,
      },
    });
  });

  revalidatePath("/business-documents");
  revalidatePath(`/business-documents/${canonicalDocumentId}`);

  redirect(buildApprovalRedirect(canonicalDocumentId, "approved"));
}

export async function returnBusinessDocumentToReview(formData: FormData) {
  const businessDocumentId = String(
    formData.get("businessDocumentId") || "",
  ).trim();
  const reviewedBy = String(formData.get("reviewedBy") || "Liad").trim() || "Liad";
  const reason = String(formData.get("reason") || "").trim();

  if (!businessDocumentId) {
    redirect("/business-documents?approvalStatus=missing-document");
  }

  if (reason.length < 5) {
    redirect(buildApprovalRedirect(businessDocumentId, "reason-required"));
  }

  const document = await findBusinessDocumentForApproval(businessDocumentId);

  if (!document) {
    redirect("/business-documents?approvalStatus=not-found");
  }

  const canonicalDocumentId = document.appsheetBusinessDocumentId;

  await prisma.$transaction(async (tx) => {
    await tx.businessDocument.update({
      where: { id: document.id },
      data: {
        status: BusinessDocumentStatus.WAITING_USER_APPROVAL,
        approvalStatus: ApprovalStatus.NEEDS_MORE_INFO,
        sourceStatusText: "Returned to review",
      },
    });

    await tx.businessDocumentLog.create({
      data: {
        businessDocumentId: document.id,
        action: "BUSINESS_DOCUMENT_RETURNED_TO_REVIEW",
        performedBy: reviewedBy,
        result: "Returned to review with reason",
        notes: reason,
        rawData: {
          reason,
          noMavenCall: true,
          noAutomationCommandCreated: true,
          noEmail: true,
          noInventory: true,
        } satisfies Prisma.InputJsonValue,
      },
    });
  });

  revalidatePath("/business-documents");
  revalidatePath(`/business-documents/${canonicalDocumentId}`);

  redirect(buildApprovalRedirect(canonicalDocumentId, "returned"));
}

export async function resolveBusinessDocumentLine(formData: FormData) {
  const businessDocumentId = String(
    formData.get("businessDocumentId") || "",
  ).trim();
  const itemId = String(formData.get("itemId") || "").trim();
  const resolvedBy = String(formData.get("resolvedBy") || "Liad").trim() || "Liad";
  const quantity = readPositiveDecimal(formData.get("quantity"));
  const unitPrice = readPositiveDecimal(formData.get("unitPrice"));
  const pricingEvidenceSource = String(
    formData.get("pricingEvidenceSource") || "",
  ).trim();
  const pricingEvidenceNote = String(formData.get("pricingEvidenceNote") || "").trim();
  const needsPriceApproval = formData.get("needsPriceApproval") === "on";

  if (!businessDocumentId) {
    redirect("/business-documents?lineStatus=missing-document");
  }

  if (!itemId) {
    redirect(buildLineResolutionRedirect(businessDocumentId, "missing-item"));
  }

  if (!quantity || quantity.lte(0)) {
    redirect(buildLineResolutionRedirect(businessDocumentId, "invalid-quantity"));
  }

  if (!unitPrice) {
    redirect(buildLineResolutionRedirect(businessDocumentId, "invalid-price"));
  }

  if (!pricingEvidenceSource || !pricingEvidenceNote) {
    redirect(buildLineResolutionRedirect(businessDocumentId, "missing-evidence"));
  }

  const document = await prisma.businessDocument.findFirst({
    where: {
      OR: [
        { appsheetBusinessDocumentId: businessDocumentId },
        ...(isUuid(businessDocumentId) ? [{ id: businessDocumentId }] : []),
      ],
    },
    select: {
      id: true,
      appsheetBusinessDocumentId: true,
      items: {
        where: {
          OR: [
            { appsheetItemId: itemId },
            ...(isUuid(itemId) ? [{ id: itemId }] : []),
          ],
        },
        select: {
          id: true,
          appsheetItemId: true,
          itemName: true,
          quantity: true,
          unitPrice: true,
          totalPrice: true,
          needsPriceApproval: true,
          rawSource: true,
        },
        take: 1,
      },
    },
  });

  if (!document) {
    redirect("/business-documents?lineStatus=not-found");
  }

  const item = document.items[0];

  if (!item) {
    redirect(buildLineResolutionRedirect(document.appsheetBusinessDocumentId, "item-not-found"));
  }

  const previousValues = {
    quantity: item.quantity.toString(),
    unitPrice: item.unitPrice?.toString() || null,
    totalPrice: item.totalPrice?.toString() || null,
    needsPriceApproval: item.needsPriceApproval,
  };
  const totalPrice = quantity.mul(unitPrice);
  const evidenceEntry = {
    source: pricingEvidenceSource,
    unitPrice: unitPrice.toString(),
    note: pricingEvidenceNote,
    resolvedBy,
    resolvedAt: new Date().toISOString(),
  };
  const rawSource = readJsonObject(item.rawSource);
  const existingEvidence = Array.isArray(rawSource.pricingEvidence)
    ? rawSource.pricingEvidence
    : [];
  const nextRawSource = {
    ...rawSource,
    pricingEvidence: [...existingEvidence, evidenceEntry],
    lineResolution: {
      lastResolvedBy: resolvedBy,
      lastResolvedAt: evidenceEntry.resolvedAt,
      noMavenCall: true,
      noAutomationCommandExecution: true,
      noEmail: true,
      noInventory: true,
    },
  };

  await prisma.$transaction(async (tx) => {
    await tx.businessDocumentItem.update({
      where: { id: item.id },
      data: {
        quantity,
        unitPrice,
        totalPrice,
        needsPriceApproval,
        rawSource: nextRawSource satisfies Prisma.InputJsonValue,
      },
    });

    await tx.businessDocumentLog.create({
      data: {
        businessDocumentId: document.id,
        action: "BUSINESS_DOCUMENT_LINE_RESOLVED",
        performedBy: resolvedBy,
        result: `Updated line ${item.itemName}`,
        notes:
          "Internal line correction only. No Maven/Invoice4U call, no AutomationCommand execution, no email/customer-facing action, and no inventory deduction occurred.",
        rawData: {
          itemId: item.id,
          appsheetItemId: item.appsheetItemId,
          itemName: item.itemName,
          previousValues,
          nextValues: {
            quantity: quantity.toString(),
            unitPrice: unitPrice.toString(),
            totalPrice: totalPrice.toString(),
            needsPriceApproval,
          },
          pricingEvidence: evidenceEntry,
          noMavenCall: true,
          noAutomationCommandExecution: true,
          noEmail: true,
          noInventory: true,
        } satisfies Prisma.InputJsonValue,
      },
    });
  });

  revalidatePath("/business-documents");
  revalidatePath(`/business-documents/${document.appsheetBusinessDocumentId}`);

  redirect(buildLineResolutionRedirect(document.appsheetBusinessDocumentId, "line-saved"));
}

export async function createMavenDraftAutomationCommand(formData: FormData) {
  const businessDocumentId = String(
    formData.get("businessDocumentId") || "",
  ).trim();
  const approvalText = String(formData.get("approvalText") || "").trim();
  const requestedBy = String(formData.get("requestedBy") || "Liad").trim() || "Liad";

  if (!businessDocumentId) {
    redirect("/business-documents?commandStatus=missing-document");
  }

  if (approvalText !== CREATE_MAVEN_COMMAND_PHRASE) {
    redirect(buildRedirect(businessDocumentId, "approval-required"));
  }

  const document = await prisma.businessDocument.findFirst({
    where: {
      OR: [
        { appsheetBusinessDocumentId: businessDocumentId },
        ...(isUuid(businessDocumentId) ? [{ id: businessDocumentId }] : []),
      ],
    },
    select: {
      id: true,
      appsheetBusinessDocumentId: true,
      status: true,
      mavenDocumentNumber: true,
      mavenPdfLink: true,
      items: {
        select: {
          id: true,
          needsPriceApproval: true,
        },
      },
      automationCommands: {
        where: {
          commandType: AutomationCommandType.CREATE_MAVEN_DRAFT,
        },
        select: {
          id: true,
        },
        take: 1,
      },
    },
  });

  if (!document) {
    redirect("/business-documents?commandStatus=not-found");
  }

  const canonicalDocumentId = document.appsheetBusinessDocumentId;
  const commandCreationStatus = getMavenDraftCommandCreationStatus(document);

  if (commandCreationStatus !== "ready") {
    redirect(buildRedirect(canonicalDocumentId, commandCreationStatus));
  }

  const idempotencyKey = `maven-draft:${document.id}`;
  const commandId = `NEXT-MAVEN-CMD-${document.appsheetBusinessDocumentId}`;
  const now = new Date();
  let redirectStatus = "created";

  try {
    await prisma.automationCommand.create({
      data: {
        appsheetCommandId: commandId,
        businessDocumentId: document.id,
        commandName: "Create Maven document from approved BusinessDocument",
        commandType: AutomationCommandType.CREATE_MAVEN_DRAFT,
        status: AutomationCommandStatus.PENDING,
        requestedBy,
        requestedAt: now,
        idempotencyKey,
        notes:
          "Internal queue command only. This Server Action did not call Maven/Invoice4U, send email, or deduct inventory.",
        payload: {
          source: "BUSINESS_DOCUMENT_REVIEW_PAGE",
          businessDocumentId: document.id,
          appsheetBusinessDocumentId: document.appsheetBusinessDocumentId,
          itemCount: document.items.length,
          requestedBy,
          requestedAt: now.toISOString(),
          noMavenCall: true,
          noInvoice4UCall: true,
          noEmail: true,
          noInventory: true,
        } satisfies Prisma.InputJsonValue,
        rawSource: {
          approvalPhrase: CREATE_MAVEN_COMMAND_PHRASE,
          userFacingBoundary:
            "Create AutomationCommand only; downstream Maven document generation remains separately gated.",
        } satisfies Prisma.InputJsonValue,
      },
    });
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2002"
    ) {
      redirectStatus = "existing-command";
    } else {
      throw error;
    }
  }

  revalidatePath("/automation-commands");
  revalidatePath("/business-documents");
  revalidatePath(`/business-documents/${canonicalDocumentId}`);

  redirect(buildRedirect(canonicalDocumentId, redirectStatus));
}
