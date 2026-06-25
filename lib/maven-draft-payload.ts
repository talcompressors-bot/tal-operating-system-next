import {
  AutomationCommandType,
  BusinessDocumentStatus,
  BusinessDocumentType,
  Prisma,
} from "@prisma/client";

export type MavenDraftBlockersAndWarnings = {
  blockers: string[];
  warnings: string[];
};

type MavenDraftPayloadCommand = {
  id: string;
  appsheetCommandId: string | null;
  commandType: AutomationCommandType;
  idempotencyKey: string | null;
  payload: Prisma.JsonValue | null;
  businessDocument: MavenDraftPayloadBusinessDocument | null;
};

type MavenDraftPayloadBusinessDocument = {
  id: string;
  appsheetBusinessDocumentId: string;
  status: BusinessDocumentStatus;
  documentTypeSelected: BusinessDocumentType | null;
  draftTitle: string | null;
  description: string | null;
  currency: string;
  subtotalAmount: Prisma.Decimal | null;
  vatAmount: Prisma.Decimal | null;
  totalAmount: Prisma.Decimal | null;
  mavenDocumentNumber: string | null;
  mavenPdfLink: string | null;
  customer: MavenDraftPayloadCustomer | null;
  serviceReport: MavenDraftPayloadServiceReport | null;
  items: MavenDraftPayloadItem[];
};

type MavenDraftPayloadCustomer = {
  appsheetCustomerId: string | null;
  name: string | null;
  businessId: string | null;
  emailPrimary: string | null;
  phonePrimary: string | null;
  address: string | null;
};

type MavenDraftPayloadServiceReport = {
  appsheetReportId: string;
  reportCounter: number | null;
  reportNumberText: string | null;
};

type MavenDraftPayloadItem = {
  id: string;
  appsheetItemId: string | null;
  itemName: string;
  description: string | null;
  quantity: Prisma.Decimal;
  unitPrice: Prisma.Decimal | null;
  totalPrice: Prisma.Decimal | null;
  needsPriceApproval: boolean;
  product: {
    sku: string | null;
    name: string | null;
  } | null;
};

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

export function validateMavenDraftPayload(
  command: MavenDraftPayloadCommand,
): MavenDraftBlockersAndWarnings {
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

export function buildMavenDraftPayload(command: MavenDraftPayloadCommand) {
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
