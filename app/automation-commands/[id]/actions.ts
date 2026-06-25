"use server";

import {
  AutomationCommandType,
  BusinessDocumentStatus,
  Prisma,
} from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "../../../lib/prisma";

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

function decimalToNumber(value: Prisma.Decimal | null) {
  if (!value) {
    return null;
  }

  const numberValue = Number(value.toString());
  return Number.isFinite(numberValue) ? numberValue : null;
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

function validateCommand(command: DryRunCommand) {
  const blockers: string[] = [];
  const warnings: string[] = [];
  const payload = readObject(command.payload);
  const document = command.businessDocument;

  if (command.commandType !== AutomationCommandType.CREATE_MAVEN_DRAFT) {
    blockers.push("AutomationCommand type is not CREATE_MAVEN_DRAFT.");
  }

  if (!document) {
    blockers.push("AutomationCommand is not linked to a BusinessDocument.");
    return { blockers, warnings };
  }

  if (document.status !== BusinessDocumentStatus.APPROVED) {
    blockers.push("BusinessDocument status is not APPROVED.");
  }

  if (document.mavenDocumentNumber || document.mavenPdfLink) {
    blockers.push("BusinessDocument already has Maven output fields populated.");
  }

  if (!document.customer) {
    blockers.push("BusinessDocument has no linked customer.");
  } else {
    if (!document.customer.name) {
      blockers.push("Linked customer is missing a name.");
    }

    if (!document.customer.appsheetCustomerId && !document.customer.businessId) {
      warnings.push("Customer has no AppSheet customer ID or business ID.");
    }
  }

  if (!document.items.length) {
    blockers.push("BusinessDocument has no line items.");
  }

  document.items.forEach((item) => {
    const quantity = decimalToNumber(item.quantity);

    if (!quantity || quantity <= 0) {
      blockers.push(`${item.itemName} has missing or zero quantity.`);
    }

    if (!item.unitPrice || !item.totalPrice) {
      blockers.push(`${item.itemName} is missing trusted unit or total price.`);
    }

    if (item.needsPriceApproval) {
      blockers.push(`${item.itemName} still requires price approval.`);
    }
  });

  if (payload.businessDocumentId && payload.businessDocumentId !== document.id) {
    blockers.push("Command payload BusinessDocument ID does not match the linked document.");
  }

  if (
    payload.appsheetBusinessDocumentId &&
    payload.appsheetBusinessDocumentId !== document.appsheetBusinessDocumentId
  ) {
    blockers.push("Command payload AppSheet BusinessDocument ID does not match.");
  }

  if (!command.idempotencyKey) {
    warnings.push("AutomationCommand has no idempotency key.");
  }

  return { blockers, warnings };
}

function buildMavenDraftPayload(command: DryRunCommand) {
  const document = command.businessDocument;

  if (!document) {
    return null;
  }

  return {
    dryRun: true,
    command: "CreateMavenDraft",
    commandId: command.appsheetCommandId || command.id,
    idempotencyKey: command.idempotencyKey,
    businessDocumentId: document.appsheetBusinessDocumentId,
    internalBusinessDocumentId: document.id,
    documentType: document.documentTypeSelected,
    title: document.draftTitle,
    description: document.description,
    currency: document.currency,
    subtotalAmount: decimalToNumber(document.subtotalAmount),
    vatAmount: decimalToNumber(document.vatAmount),
    totalAmount: decimalToNumber(document.totalAmount),
    customer: document.customer
      ? {
          customerId: document.customer.appsheetCustomerId,
          name: document.customer.name,
          businessId: document.customer.businessId,
          email: document.customer.emailPrimary,
          phone: document.customer.phonePrimary,
          address: document.customer.address,
        }
      : null,
    sourceServiceReport: document.serviceReport
      ? {
          reportId: document.serviceReport.appsheetReportId,
          reportCounter: document.serviceReport.reportCounter,
          reportNumberText: document.serviceReport.reportNumberText,
        }
      : null,
    items: document.items.map((item, index) => ({
      lineNumber: index + 1,
      itemId: item.appsheetItemId || item.id,
      sku: item.product?.sku || null,
      name: item.itemName,
      description: item.description,
      quantity: decimalToNumber(item.quantity),
      unitPrice: decimalToNumber(item.unitPrice),
      totalPrice: decimalToNumber(item.totalPrice),
      needsPriceApproval: item.needsPriceApproval,
    })),
    boundaries: {
      noMavenCall: true,
      noInvoice4UCall: true,
      noExternalDocumentCreated: true,
      noEmail: true,
      noInventory: true,
    },
  };
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
  const { blockers, warnings } = validateCommand(command);
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
