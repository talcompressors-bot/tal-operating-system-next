# Email Intake Evidence Packet Schema

Date: 2026-06-24

Status: Planned schema; documentation only

Owner: `EMAIL_DOCUMENT_INTAKE_AGENT` under `ORCHESTRATOR_AGENT`

Runtime impact: None. This file does not approve Gmail access, DB writes, Maven/Invoice4U actions, BusinessDocument creation, inventory actions, or email sending.

## 1. Purpose

This schema defines the standard evidence packets that the planned `EMAIL_DOCUMENT_INTAKE_AGENT` must produce before any business action can be considered.

Source governance:

- `project-brain/EMAIL_DOCUMENT_INTAKE_AGENT_SPEC.md`
- `agents/AGENT_REGISTRY.md`
- `project-brain/roadmap/ROADMAP.md`
- `AI_DRAFT_RUNTIME_BLUEPRINT.md`
- `project-brain/SERVICE_MAVEN_MAPPING.md`

Google Sheets, Maven, Gmail, and customer emails remain source/reference systems. The email intake packet is evidence only, not action approval.

## 2. Universal Safety Rules

- Email is evidence, not approval by itself.
- PO evidence must not auto-create an invoice.
- RFQ evidence must not auto-create a quote.
- Customer reply evidence must not auto-change a quote, invoice, draft, or `BusinessDocument`.
- Attachment content requires review before use.
- No emails may be sent automatically.
- No DB writes are allowed from these packets.
- No Prisma change is allowed from these packets.
- No Maven/Invoice4U action is allowed from these packets.
- No inventory deduction is allowed from these packets.
- No production workflow action is allowed from these packets.
- If confidence is not `HIGH`, Liad review is required.
- If any mismatch exists, Liad review is required.

## 3. Common Packet Envelope

Every packet type must include this envelope.

| Field | Required | Meaning |
|---|---:|---|
| `packetType` | Yes | One of the approved packet types in this schema |
| `schemaVersion` | Yes | Schema version, starting with `1.0` |
| `createdAt` | Yes | Packet creation timestamp |
| `createdByAgent` | Yes | Expected value: `EMAIL_DOCUMENT_INTAKE_AGENT` |
| `reviewStatus` | Yes | `DRAFT`, `READY_FOR_LIAD_REVIEW`, `APPROVED_FOR_NEXT_STEP`, or `REJECTED` |
| `emailId` | Yes | Email provider message ID, or `UNKNOWN` before runtime access exists |
| `threadId` | Yes | Email provider thread ID, or `UNKNOWN` |
| `rawMessageId` | No | RFC/message header ID if available |
| `senderName` | Yes | Sender display name from email metadata |
| `senderEmail` | Yes | Sender email address |
| `senderDomain` | Yes | Domain extracted from sender email |
| `receivedDate` | Yes | Email received date/time |
| `subject` | Yes | Email subject |
| `detectedCustomer` | Yes | Customer name detected from email body, metadata, attachment, or match |
| `detectedIntent` | Yes | `PURCHASE_ORDER`, `REQUEST_FOR_QUOTE`, `CUSTOMER_APPROVAL`, `CUSTOMER_REJECTION_OR_CORRECTION`, `EXISTING_QUOTE_REPLY`, `SERVICE_REQUEST`, or `GENERAL_MESSAGE` |
| `confidence` | Yes | `HIGH`, `MEDIUM`, `LOW`, or `NEEDS_LIAD_REVIEW` |
| `extractedReferences` | Yes | Structured reference object defined below |
| `attachmentsSummary` | Yes | Attachment metadata and review state |
| `matchedCustomerRecord` | Yes | Customer match object or `UNKNOWN` |
| `matchedQuoteOrBusinessDocument` | Yes | Quote/BusinessDocument match object or `UNKNOWN` |
| `matchedServiceReport` | Yes | Service report match object or `UNKNOWN` |
| `matchedMavenDocument` | Yes | Maven document match object or `UNKNOWN` |
| `matchedAIDraft` | No | AI Draft match object if available |
| `documentChainMatch` | Yes | Document-chain match object or `UNKNOWN`; use `UNKNOWN` if `DocumentChainId` is unavailable |
| `mismatchWarnings` | Yes | List of customer, amount, item, date, quote, service report, Maven, attachment, or chain conflicts |
| `requiredLiadAction` | Yes | Exact decision or review needed from Liad |
| `allowedNextAction` | Yes | Evidence-only next step allowed after packet creation |
| `forbiddenNextAction` | Yes | Explicit list of blocked actions |
| `evidenceSources` | Yes | Files/tables/systems used as evidence |
| `rawEvidencePointers` | Yes | Row IDs, document IDs, snippets, attachment names, or other traceable references |
| `notes` | No | Human-readable review notes |

## 4. Shared Nested Schemas

### 4.1 `extractedReferences`

| Field | Required | Meaning |
|---|---:|---|
| `poNumber` | Yes | Extracted PO number or `UNKNOWN` |
| `quoteNumber` | Yes | Extracted quote number or `UNKNOWN` |
| `invoiceNumber` | Yes | Extracted invoice number or `UNKNOWN` |
| `serviceReportNumber` | Yes | Extracted service report number or `UNKNOWN` |
| `documentAmount` | Yes | Amount object or `UNKNOWN` |
| `itemLines` | Yes | Array of extracted item/service lines |
| `dueDate` | Yes | Due date or `UNKNOWN` |
| `requestedDeliveryDate` | Yes | Requested delivery date or `UNKNOWN` |
| `rawReferenceText` | Yes | Raw text snippets supporting extracted references |

### 4.2 `documentAmount`

| Field | Required | Meaning |
|---|---:|---|
| `amount` | Yes | Numeric amount if available, otherwise `UNKNOWN` |
| `currency` | Yes | Currency if available, otherwise `UNKNOWN` |
| `includesVat` | Yes | `YES`, `NO`, or `UNKNOWN` |
| `source` | Yes | `EMAIL_BODY`, `SUBJECT`, `ATTACHMENT`, `MATCHED_DOCUMENT`, or `UNKNOWN` |

### 4.3 `itemLines`

| Field | Required | Meaning |
|---|---:|---|
| `lineIndex` | Yes | Source line index |
| `description` | Yes | Raw item/service description |
| `quantity` | Yes | Quantity or `UNKNOWN` |
| `unitPrice` | Yes | Unit price or `UNKNOWN` |
| `lineTotal` | Yes | Line total or `UNKNOWN` |
| `partNumberOrSku` | Yes | Manufacturer part number, internal SKU, or `UNKNOWN` |
| `serviceType` | No | Service pattern if detected |
| `source` | Yes | `EMAIL_BODY`, `SUBJECT`, `ATTACHMENT`, `MATCHED_DOCUMENT`, or `UNKNOWN` |
| `confidence` | Yes | Line-level confidence |
| `needsReview` | Yes | Boolean |

### 4.4 `attachmentsSummary`

| Field | Required | Meaning |
|---|---:|---|
| `attachmentCount` | Yes | Number of attachments |
| `attachments` | Yes | Array of attachment metadata |
| `attachmentContentReviewed` | Yes | Boolean; must be `false` until approved review exists |
| `attachmentOnlyEvidence` | Yes | Boolean; if `true`, packet confidence becomes `NEEDS_LIAD_REVIEW` |
| `unsafeOrUnknownAttachment` | Yes | Boolean |

Attachment metadata must include name, file type if known, size if known, declared content type if known, and whether it has been reviewed.

### 4.5 Match Objects

All match objects must include:

| Field | Required | Meaning |
|---|---:|---|
| `matchStatus` | Yes | `MATCHED`, `PARTIAL_MATCH`, `NO_MATCH`, or `UNKNOWN` |
| `matchedId` | Yes | Source ID or `UNKNOWN` |
| `matchedNameOrNumber` | Yes | Human-readable match value |
| `matchEvidence` | Yes | Evidence list: customer, date, amount, item, report, model, serial, document number, thread, or text |
| `confidence` | Yes | Match confidence |
| `mismatchWarnings` | Yes | Match-specific conflicts |

## 5. `EMAIL_INTAKE_EVIDENCE_PACKET`

Purpose: General classification and extraction packet for any incoming customer email.

Required intent coverage:

- Purchase order
- Request for quote
- Customer approval
- Customer rejection or correction
- Reply related to existing quote
- Service request
- General customer message

Additional fields:

| Field | Required | Meaning |
|---|---:|---|
| `classificationReason` | Yes | Why the detected intent was selected |
| `alternativeIntents` | Yes | Other possible intents and confidence |
| `customerIdentityEvidence` | Yes | Sender, domain, signature, text, document, or historical match evidence |
| `triageBucket` | Yes | `PO`, `RFQ`, `REPLY`, `SERVICE`, `GENERAL`, or `NEEDS_LIAD_REVIEW` |

Allowed next action:

- Create a more specific evidence packet.
- Ask Liad for review.
- Mark as general customer message evidence.

Forbidden next action:

- Send a reply.
- Create or change a business document.
- Create an invoice.
- Write to DB.
- Trigger Maven/Invoice4U.

## 6. `PO_MATCH_EVIDENCE_PACKET`

Purpose: Match a customer purchase order to an existing quote, BusinessDocument, service report, Maven document, AI Draft, or document chain.

Additional fields:

| Field | Required | Meaning |
|---|---:|---|
| `poNumberEvidence` | Yes | PO number source and raw text |
| `poAmountEvidence` | Yes | PO amount compared with matched document amount |
| `poItemMatch` | Yes | Item-level comparison to matched quote/document |
| `matchedQuoteStatus` | Yes | Known quote/document status or `UNKNOWN` |
| `amountMatchStatus` | Yes | `MATCHED`, `PARTIAL_MATCH`, `CONFLICT`, or `UNKNOWN` |
| `itemMatchStatus` | Yes | `MATCHED`, `PARTIAL_MATCH`, `CONFLICT`, or `UNKNOWN` |
| `customerApprovalEvidence` | Yes | Text or attachment evidence, if any |

Allowed next action:

- Present PO match evidence to Liad.
- Request missing amount/item/quote review from Liad.

Forbidden next action:

- Auto-create invoice.
- Auto-approve quote.
- Auto-close quote.
- Auto-create BusinessDocument.
- Trigger Maven/Invoice4U.

## 7. `RFQ_INTAKE_EVIDENCE_PACKET`

Purpose: Capture evidence for a customer request for quote before any quote or AI Draft is created.

Additional fields:

| Field | Required | Meaning |
|---|---:|---|
| `requestedProductsOrServices` | Yes | Requested products, service, equipment, or issue text |
| `equipmentEvidence` | Yes | Model, serial, generic equipment text, or `UNKNOWN` |
| `siteOrDeliveryEvidence` | Yes | Site, delivery address, requested date, or `UNKNOWN` |
| `pricingEvidenceAvailable` | Yes | Whether pricing evidence exists from Maven/history/specs |
| `aiDraftReadiness` | Yes | `READY_FOR_EVIDENCE_REVIEW`, `PARTIAL`, `NOT_READY`, or `UNKNOWN` |

Allowed next action:

- Create RFQ evidence for Liad review.
- Route to AI Draft readiness analysis if applicable.
- Ask for missing equipment/customer/service details.

Forbidden next action:

- Auto-create quote.
- Auto-create AI Draft.
- Send customer response.
- Write to DB.
- Trigger Maven/Invoice4U.

## 8. `CUSTOMER_REPLY_EVIDENCE_PACKET`

Purpose: Classify customer replies related to quote approval, rejection, correction, general reply, or service follow-up.

Additional fields:

| Field | Required | Meaning |
|---|---:|---|
| `replyType` | Yes | `APPROVAL`, `REJECTION`, `CORRECTION`, `QUESTION`, `SERVICE_UPDATE`, or `GENERAL` |
| `matchedOriginalDocument` | Yes | Quote/BusinessDocument/Maven/AI Draft match |
| `requestedChanges` | Yes | Requested changes or `NONE_DETECTED` |
| `approvalLanguageEvidence` | Yes | Raw approval/rejection/correction text |
| `amountOrItemChangeEvidence` | Yes | Any changed amount/item/delivery/date evidence |

Allowed next action:

- Present reply evidence to Liad.
- Create a document-chain match packet if linked history exists.
- Ask Liad whether to update, reject, or continue.

Forbidden next action:

- Treat customer reply as system approval.
- Auto-change quote, BusinessDocument, Maven document, or AI Draft.
- Send response.
- Create invoice.

## 9. `DOCUMENT_CHAIN_MATCH_PACKET`

Purpose: Link an email to an existing customer document chain across quote, service report, BusinessDocument, Maven document, AI Draft, and future `DocumentChainId`.

Additional fields:

| Field | Required | Meaning |
|---|---:|---|
| `documentChainId` | Yes | Existing chain ID or `UNKNOWN` |
| `chainAvailability` | Yes | `EXISTS`, `PARTIAL`, `NOT_AVAILABLE`, or `UNKNOWN` |
| `chainMembers` | Yes | Matched quote, invoice, service report, Maven document, AI Draft, PO, and thread records |
| `chainEvidence` | Yes | Customer, report, quote, invoice, PO, date, amount, item, model, serial, thread, and attachment evidence |
| `chainConflicts` | Yes | Duplicate, customer mismatch, amount mismatch, item mismatch, date mismatch, or ambiguous chain warnings |
| `recommendedChainAction` | Yes | Evidence-only recommendation |

Allowed next action:

- Present chain evidence to Liad.
- Record that a chain is missing or ambiguous.
- Recommend future link-learning after explicit approval.

Forbidden next action:

- Auto-merge chains.
- Auto-create `DocumentChainId`.
- Auto-update source systems.
- Auto-create or modify BusinessDocuments, Maven documents, invoices, or inventory transactions.

## 10. Confidence Rules

| Confidence | Required Evidence |
|---|---|
| `HIGH` | Clear customer plus clear document reference plus amount/item match |
| `MEDIUM` | Customer plus partial reference, date, or item match |
| `LOW` | Customer only or weak text similarity only |
| `NEEDS_LIAD_REVIEW` | Any mismatch, attachment-only evidence, amount conflict, unclear intent, or unknown sender |

Confidence downgrade rules:

- Unknown sender domain downgrades to `NEEDS_LIAD_REVIEW`.
- Amount conflict downgrades to `NEEDS_LIAD_REVIEW`.
- Customer mismatch downgrades to `NEEDS_LIAD_REVIEW`.
- Quote, invoice, service report, or Maven document mismatch downgrades to `NEEDS_LIAD_REVIEW`.
- Attachment-only evidence downgrades to `NEEDS_LIAD_REVIEW`.
- Urgent email language does not bypass review; it requires Liad review if any action is requested.

## 11. Mismatch Warning Types

Packets must explicitly list mismatch warnings.

- `UNKNOWN_SENDER`
- `CUSTOMER_MISMATCH`
- `SENDER_DOMAIN_MISMATCH`
- `AMOUNT_CONFLICT`
- `ITEM_CONFLICT`
- `QUOTE_NUMBER_CONFLICT`
- `INVOICE_NUMBER_CONFLICT`
- `SERVICE_REPORT_CONFLICT`
- `MAVEN_DOCUMENT_CONFLICT`
- `DOCUMENT_CHAIN_CONFLICT`
- `ATTACHMENT_ONLY_EVIDENCE`
- `UNCLEAR_INTENT`
- `DUPLICATE_CHAIN_RISK`
- `URGENT_ACTION_REQUESTED`

## 12. Required Liad Action Values

Use one or more:

- `REVIEW_EMAIL_CLASSIFICATION`
- `CONFIRM_CUSTOMER_MATCH`
- `CONFIRM_DOCUMENT_MATCH`
- `CONFIRM_PO_MATCH`
- `CONFIRM_RFQ_INTAKE`
- `CONFIRM_REPLY_INTENT`
- `REVIEW_ATTACHMENT_CONTENT`
- `RESOLVE_AMOUNT_CONFLICT`
- `RESOLVE_ITEM_CONFLICT`
- `RESOLVE_DOCUMENT_CHAIN`
- `APPROVE_NEXT_BUSINESS_ACTION`
- `NO_ACTION_REQUIRED`

`APPROVE_NEXT_BUSINESS_ACTION` is only a request for Liad decision. It is not approval by itself.

## 13. Allowed Next Actions

Allowed actions are evidence-only unless Liad separately approves business action.

- Create another evidence packet.
- Ask Liad for a decision.
- Mark missing evidence.
- Recommend manual customer follow-up.
- Recommend AI Draft readiness review.
- Recommend document-chain investigation.

## 14. Forbidden Next Actions

Every packet must include these forbidden actions:

- Send customer email automatically.
- Create invoice automatically.
- Create quote automatically.
- Create, update, or approve `BusinessDocuments`.
- Create, update, or approve `BusinessDocumentItems`.
- Create, update, or approve Maven/Invoice4U documents.
- Modify customer, service report, AI Draft, inventory, or pricing records.
- Deduct inventory.
- Write to DB.
- Modify Prisma.
- Trigger production workflow.

## 15. Review Checklist

Before any packet can be used for planning a business action:

- Customer match is shown.
- Intent is shown.
- Confidence is shown.
- Extracted references are shown.
- Attachments are summarized and marked reviewed or not reviewed.
- Matched quote/BusinessDocument is shown or explicitly `UNKNOWN`.
- Matched service report is shown or explicitly `UNKNOWN`.
- Matched Maven document is shown or explicitly `UNKNOWN`.
- Document-chain state is shown or explicitly `UNKNOWN`.
- Mismatches are listed.
- Required Liad action is explicit.
- Allowed and forbidden next actions are explicit.

## 16. Next Recommended Governance Task

Create a read-only `EMAIL_INTAKE_SAMPLE_PACKET_TEMPLATE.md` with one blank example for each packet type. This should remain documentation-only and must not connect to Gmail or source systems.
