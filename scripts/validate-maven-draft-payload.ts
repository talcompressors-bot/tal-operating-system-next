import {
  AutomationCommandType,
  BusinessDocumentStatus,
  BusinessDocumentType,
  Prisma,
} from "@prisma/client";
import {
  buildMavenDraftPayload,
  validateMavenDraftPayload,
} from "../lib/maven-draft-payload";

const command = {
  id: "command-internal-id",
  appsheetCommandId: "NEXT-MAVEN-CMD-TEST",
  commandType: AutomationCommandType.CREATE_MAVEN_DRAFT,
  idempotencyKey: "maven-draft:business-document-internal-id",
  payload: {
    businessDocumentId: "business-document-internal-id",
    appsheetBusinessDocumentId: "NEXT-AI-DRAFT-TEST",
  },
  businessDocument: {
    id: "business-document-internal-id",
    appsheetBusinessDocumentId: "NEXT-AI-DRAFT-TEST",
    status: BusinessDocumentStatus.APPROVED,
    documentTypeSelected: BusinessDocumentType.SERVICE_DOCUMENT,
    draftTitle: "AI Draft Preview Test",
    description: "Internal validation fixture",
    currency: "ILS",
    subtotalAmount: new Prisma.Decimal("360"),
    vatAmount: null,
    totalAmount: new Prisma.Decimal("360"),
    mavenDocumentNumber: null,
    mavenPdfLink: null,
    customer: {
      appsheetCustomerId: "C-1",
      name: "Test Customer",
      businessId: null,
      emailPrimary: null,
      phonePrimary: null,
      address: null,
    },
    serviceReport: {
      appsheetReportId: "R-1",
      reportCounter: 5806,
      reportNumberText: null,
    },
    items: [
      {
        id: "item-internal-id",
        appsheetItemId: "ITEM-1",
        itemName: "Air Filter",
        description: "Validation fixture line",
        quantity: new Prisma.Decimal("3"),
        unitPrice: new Prisma.Decimal("120"),
        totalPrice: new Prisma.Decimal("360"),
        needsPriceApproval: false,
        product: {
          sku: "25100043-071",
          name: "Air Filter",
        },
      },
    ],
  },
};

const result = validateMavenDraftPayload(command);

if (result.blockers.length || result.warnings.length) {
  throw new Error(`Expected clean fixture, got ${JSON.stringify(result)}`);
}

const payload = buildMavenDraftPayload(command);

if (
  !payload ||
  payload.command !== "CreateMavenDraft" ||
  payload.businessDocumentId !== "NEXT-AI-DRAFT-TEST" ||
  payload.items.length !== 1 ||
  payload.items[0].quantity !== 3 ||
  payload.boundaries.noMavenCall !== true
) {
  throw new Error(`Unexpected payload: ${JSON.stringify(payload)}`);
}
