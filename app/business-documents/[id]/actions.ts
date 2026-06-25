"use server";

import {
  AutomationCommandStatus,
  AutomationCommandType,
  BusinessDocumentStatus,
  Prisma,
} from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "../../../lib/prisma";

const APPROVAL_PHRASE = "CREATE MAVEN COMMAND";

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
}

function buildRedirect(documentId: string, status: string) {
  return `/business-documents/${documentId}?commandStatus=${status}`;
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

  if (approvalText !== APPROVAL_PHRASE) {
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
  const allowedStatus =
    document.status === BusinessDocumentStatus.APPROVED ||
    document.status === BusinessDocumentStatus.READY_TO_SEND;

  if (!allowedStatus) {
    redirect(buildRedirect(canonicalDocumentId, "status-not-ready"));
  }

  if (document.mavenDocumentNumber || document.mavenPdfLink) {
    redirect(buildRedirect(canonicalDocumentId, "maven-exists"));
  }

  if (!document.items.length) {
    redirect(buildRedirect(canonicalDocumentId, "missing-items"));
  }

  if (document.items.some((item) => item.needsPriceApproval)) {
    redirect(buildRedirect(canonicalDocumentId, "price-approval-required"));
  }

  if (document.automationCommands.length) {
    redirect(buildRedirect(canonicalDocumentId, "existing-command"));
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
        commandName: "Create Maven draft from approved BusinessDocument",
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
          approvalPhrase: APPROVAL_PHRASE,
          userFacingBoundary:
            "Create AutomationCommand only; downstream Maven draft execution remains separately gated.",
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
