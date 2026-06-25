"use server";

import {
  AutomationCommandType,
  Prisma,
} from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "../../../lib/prisma";
import {
  buildMavenDraftPayload,
  validateMavenDraftPayload,
} from "../../../lib/maven-draft-payload";

const MAVEN_DRY_RUN_PHRASE = "DRY RUN MAVEN COMMAND";

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
}

function buildRedirect(commandId: string, status: string) {
  return `/automation-commands/${commandId}?dryRunStatus=${status}`;
}

function readObject(value: Prisma.JsonValue | null) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return value as Record<string, Prisma.JsonValue>;
}

type DryRunCommand = NonNullable<Awaited<ReturnType<typeof findCommand>>>;

async function findCommand(commandId: string) {
  return prisma.automationCommand.findFirst({
    where: {
      OR: [
        { appsheetCommandId: commandId },
        ...(isUuid(commandId) ? [{ id: commandId }] : []),
      ],
    },
    select: {
      id: true,
      appsheetCommandId: true,
      commandType: true,
      status: true,
      requestedBy: true,
      idempotencyKey: true,
      payload: true,
      rawSource: true,
      businessDocument: {
        select: {
          id: true,
          appsheetBusinessDocumentId: true,
          status: true,
          approvalStatus: true,
          documentTypeSelected: true,
          draftTitle: true,
          description: true,
          currency: true,
          subtotalAmount: true,
          vatAmount: true,
          totalAmount: true,
          mavenDocumentNumber: true,
          mavenPdfLink: true,
          customer: {
            select: {
              appsheetCustomerId: true,
              name: true,
              businessId: true,
              emailPrimary: true,
              phonePrimary: true,
              address: true,
            },
          },
          serviceReport: {
            select: {
              appsheetReportId: true,
              reportCounter: true,
              reportNumberText: true,
            },
          },
          items: {
            orderBy: [{ createdAt: "asc" }, { id: "asc" }],
            select: {
              id: true,
              appsheetItemId: true,
              itemName: true,
              description: true,
              quantity: true,
              unitPrice: true,
              totalPrice: true,
              needsPriceApproval: true,
              product: {
                select: {
                  sku: true,
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });
}

export async function runMavenDraftDryRun(formData: FormData) {
  const commandId = String(formData.get("commandId") || "").trim();
  const requestedBy = String(formData.get("requestedBy") || "Liad").trim() || "Liad";
  const approvalText = String(formData.get("approvalText") || "").trim();

  if (!commandId) {
    redirect("/automation-commands?dryRunStatus=missing-command");
  }

  if (approvalText !== MAVEN_DRY_RUN_PHRASE) {
    redirect(buildRedirect(commandId, "approval-required"));
  }

  const command = await findCommand(commandId);

  if (!command) {
    redirect("/automation-commands?dryRunStatus=not-found");
  }

  const canonicalCommandId = command.appsheetCommandId || command.id;
  const { blockers, warnings } = validateMavenDraftPayload(command);
  const wouldSendToMaven = buildMavenDraftPayload(command);
  const dryRunStatus = blockers.length ? "DRY_RUN_BLOCKED" : "DRY_RUN_VALIDATED";
  const now = new Date();
  const rawSource = readObject(command.rawSource);

  await prisma.automationCommand.update({
    where: { id: command.id },
    data: {
      result: dryRunStatus,
      errorMessage: blockers.length
        ? `Dry-run validation blocked: ${blockers.join(" ")}`
        : null,
      notes:
        "Maven draft dry-run only. No Maven/Invoice4U call, no external document creation, no email, and no inventory action occurred.",
      rawSource: {
        ...rawSource,
        mavenDryRun: {
          dryRunKey: `dry-run:${command.id}:${command.idempotencyKey || canonicalCommandId}`,
          status: dryRunStatus,
          validatedAt: now.toISOString(),
          requestedBy,
          blockers,
          warnings,
          wouldSendToMaven,
          externalStateChanged: false,
          noMavenCall: true,
          noInvoice4UCall: true,
          noExternalDocumentCreated: true,
          noEmail: true,
          noInventory: true,
        },
      } satisfies Prisma.InputJsonValue,
    },
  });

  revalidatePath("/automation-commands");
  revalidatePath(`/automation-commands/${canonicalCommandId}`);

  redirect(
    buildRedirect(
      canonicalCommandId,
      blockers.length ? "dry-run-blocked" : "dry-run-validated",
    ),
  );
}
