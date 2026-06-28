import { Prisma } from "@prisma/client";

export const BUSINESS_DOCUMENT_APPROVAL_PHRASE = "APPROVE BUSINESS DOCUMENT";

type BusinessDocumentApprovalLine = {
  quantity: Prisma.Decimal;
  unitPrice: Prisma.Decimal | null;
  totalPrice: Prisma.Decimal | null;
  needsPriceApproval: boolean;
};

type BusinessDocumentApprovalInput = {
  items: BusinessDocumentApprovalLine[];
};

export function getBusinessDocumentApprovalBlockers(
  document: BusinessDocumentApprovalInput,
  wording: "review" | "action" = "review",
) {
  const blockers: string[] = [];

  if (!document.items.length) {
    blockers.push("No BusinessDocumentItems are linked.");
  }

  const priceApprovalItems = document.items.filter(
    (item) => item.needsPriceApproval || !item.unitPrice || !item.totalPrice,
  );
  const quantityIssueItems = document.items.filter((item) => {
    const quantity = Number(item.quantity.toString());
    return !Number.isFinite(quantity) || quantity <= 0;
  });

  if (priceApprovalItems.length) {
    blockers.push(
      wording === "action"
        ? `${priceApprovalItems.length} line item(s) still have required pricing review.`
        : `${priceApprovalItems.length} line item(s) still require pricing review or an explicit approval override.`,
    );
  }

  if (quantityIssueItems.length) {
    blockers.push(
      wording === "action"
        ? `${quantityIssueItems.length} line item(s) have missing or zero quantity.`
        : `${quantityIssueItems.length} line item(s) have missing or zero quantity and require an explicit approval override.`,
    );
  }

  return blockers;
}

export function buildBusinessDocumentApprovalReview(
  document: BusinessDocumentApprovalInput,
) {
  const blockers = getBusinessDocumentApprovalBlockers(document);

  return {
    canApproveWithoutOverride: blockers.length === 0,
    blockers,
    approvalPhrase: BUSINESS_DOCUMENT_APPROVAL_PHRASE,
    boundary:
      "Approval updates only the internal BusinessDocument and audit log. It does not call Maven/Invoice4U, create AutomationCommands, send email, or deduct inventory.",
  };
}
