# Document Engine Knowledge Base

Status: Reusable Knowledge Base
Scope: internal BusinessDocument, payment, preview/PDF, and external-output boundaries
Runtime impact: none

This file consolidates durable document-engine rules so future work does not create per-case document planning files.

## Source Of Truth

`BusinessDocument` is the internal draft and review source of truth.

Maven is document generation/output only. Maven does not create internal drafts. The legacy command name `CREATE_MAVEN_DRAFT` remains a Wave 2 internal compatibility name; future naming should prefer `CREATE_MAVEN_DOCUMENT`.

## Supported Document Types

- `QUOTE` / הצעת מחיר
- `PROFORMA_INVOICE` / חשבון עסקה
- `TAX_INVOICE` / חשבונית מס
- `RECEIPT` / קבלה
- `TAX_INVOICE_RECEIPT` / חשבונית מס קבלה
- `PURCHASE_ORDER` / הזמנת רכש
- `DELIVERY_NOTE` / תעודת משלוח
- `CREDIT_NOTE` / זיכוי

## Payment Sources

- Bank transfer
- Check
- Credit card
- Cash
- Other
- Future uploaded check image / bank proof attachment

Future attachment work requires separately approved storage, access-control, retention, and review policy.

## Financial Intake Engine

Payment handling must support financial evidence intake, not only manual payment entry. The durable architecture is a universal Financial Intake Engine that can receive many evidence sources, extract an untrusted draft, match it to business context, produce a payment suggestion, and wait for user approval before any receipt action.

Architecture flow:

`Financial Intake Engine -> FinancialEvidence -> Extraction Draft -> Matching Engine -> Payment Suggestion -> User Approval -> Receipt / Tax Invoice Receipt creation later`

`FinancialEvidence` is the generic future evidence object/concept. `PaymentEvidence` may remain as subtype or legacy wording for evidence specifically used to support payment/receipt decisions, but it must not become the top-level architecture name.

`FinancialEvidence` is not approved as a Prisma model yet. It is a design concept only until schema, storage, privacy, retention, attachment handling, matching workflow, and approval workflow are explicitly approved.

Evidence source types:

- `CHECK_IMAGE`
- `BANK_TRANSFER_PROOF`
- `BANK_EXPORT`
- `BANK_SCREENSHOT`
- `PDF_PROOF`
- `EMAIL_PROOF`
- `MANUAL_ENTRY`
- `FUTURE_BANK_API`

Future source examples:

- Technician check photo.
- Bank transfer proof.
- Bank screenshot.
- PDF confirmation.
- Bank export file.
- CSV / Excel file.
- Email proof.
- WhatsApp attachment later.
- Future bank API.

Common FinancialEvidence fields:

- evidence ID
- source type
- source channel
- payment method, when known
- amount
- currency
- date
- payer name
- bank
- branch/account when available
- check number when relevant
- transfer reference / asmachta
- attachment ID
- raw extracted text
- extraction confidence
- matching confidence
- duplicate risk
- review state
- matched customer ID, when suggested or approved
- matched BusinessDocument ID, when suggested or approved
- reviewer / approved by / approved at
- original attachment retention pointer
- raw source payload

Extraction Draft rules:

- Extraction output is a draft only.
- OCR/AI parsing, file parsing, email parsing, and future bank API normalization are suggestion sources only.
- Extracted data must never become trusted final payment data by itself.
- Low confidence on amount, date, payer, bank, branch/account, reference, check number, or recipient forces `NEEDS_REVIEW`.
- Missing attachment proof forces `NEEDS_REVIEW` for uploaded proof flows.

Extraction fields:

- amount
- currency
- date
- payer name
- bank
- branch/account when available
- check number when relevant
- transfer reference / asmachta
- raw extracted text
- confidence
- attachment ID

Review states:

- `INTAKE_DRAFT`: evidence captured but not reviewed.
- `EXTRACTION_DRAFT`: fields were extracted but remain untrusted.
- `NEEDS_REVIEW`: extraction, customer match, document match, duplicate risk, or amount/date/reference confidence is insufficient.
- `MATCHED_SUGGESTION`: matching engine produced a Customer/BusinessDocument/payment suggestion.
- `REVIEWED`: human reviewed but did not approve receipt creation yet.
- `APPROVED_FOR_PAYMENT_SUGGESTION`: human approved using this evidence as a payment suggestion.
- `APPROVED_FOR_RECEIPT`: human approved using this evidence to create a Receipt or Tax Invoice / Receipt.
- `REJECTED`: evidence is not usable.
- `DUPLICATE_SUSPECTED`: evidence may duplicate an existing financial evidence item, payment, receipt, check, transfer, or Maven/BusinessDocument state.

Matching Engine rules:

- Customer matching may use payer name, customer business ID, known bank details, document customer, historical Maven customer, email sender, phone/source channel, and manual selection.
- BusinessDocument matching may use amount, currency, customer, open balance, document date, due date, service report, document number, and reference text.
- Open balance matching must compare suggested amount against unpaid BusinessDocument totals and known payment state.
- Partial payment matching must allow an evidence item to suggest a partial payment against an open BusinessDocument without forcing full settlement.
- The system may suggest matches, but a user must approve the customer/document link before receipt creation.
- One FinancialEvidence item may link to one primary BusinessDocument by default; split/multi-document allocation requires a separate approved allocation design.

Duplicate detection rules:

- Check duplicates use check number, bank, branch, account, payer, amount, and date.
- Bank transfer duplicates use amount, transfer date, reference / asmachta, payer, bank/account, and matched customer.
- Export/API duplicates use source account, transaction ID if available, reference, amount, date, payer, and import batch identity.
- Attachment duplicates use file hash or storage identity when available.
- Cross-source duplicates compare evidence against existing FinancialEvidence, payment suggestions, receipts, BusinessDocuments, Maven documents, and known payment/status fields when available.
- Duplicate detection can block or warn, but it must not delete, merge, auto-approve, or auto-issue anything.

Payment Suggestion rules:

- A Payment Suggestion is the proposed business interpretation of FinancialEvidence after extraction and matching.
- It may suggest amount, date, customer, BusinessDocument, payment method, partial/full payment state, duplicate risk, and receipt candidate type.
- It is not a payment record, not a receipt, and not an accounting write.
- User approval is required before a Payment Suggestion can drive Receipt or Tax Invoice / Receipt creation.

Approval and output gates:

- Extracted data is suggestion only.
- No Receipt or Tax Invoice / Receipt may be issued without user approval.
- FinancialEvidence approval may prepare a Receipt or Tax Invoice / Receipt draft only after explicit workflow approval.
- No automatic receipt issuing is allowed from evidence intake.
- No Maven/Invoice4U receipt creation, customer delivery, payment status update, bank API action, DB schema change, or external write is approved by this design.
- The original evidence attachment must remain attached or linked as internal proof according to the future retention/access policy.

## Review And Approval Boundaries

- Review pages show internal evidence, blockers, status history, pricing evidence, SKU evidence, and source links.
- Customer-facing preview/PDF hides internal staging notes, pricing evidence text, SKU evidence text, Maven/debug/source fields, and boundary warnings.
- Approval requires protected Server Actions where writes are involved.
- Approval does not create AutomationCommands automatically.
- Maven/Invoice4U action requires separate explicit approval.
- Email/customer delivery requires separate explicit approval.
- Inventory action requires separate explicit approval.

## Totals And VAT

- Review/PDF display may use line-derived effective totals when stored header totals are missing or stale.
- Current validated ServiceReport 5806 totals: subtotal `1885.00 ILS`, VAT `320.45 ILS`, total `2205.45 ILS`.
- Display calculations do not write database totals.

## PDF / Preview Rules

- `/business-documents/[id]/preview` is the customer-facing Hebrew RTL HTML preview.
- `/business-documents/[id]/pdf` is an internal temporary download route.
- PDF export does not persist a file, update sent/exported status, create Maven records, send email, or affect inventory.
- Customer-facing preview/PDF may show a SKU column only when a trusted Tal sales SKU exists. Manufacturer part numbers are internal technical evidence and must not appear as customer-facing SKU values.

## External Export Gate

Before real Maven/Invoice4U execution:

1. BusinessDocument must be approved/ready.
2. Line items must have valid quantity and price state.
3. Pricing/SKU/quantity blockers must be resolved or explicitly overridden where policy allows.
4. Maven API contract and target environment must be proven.
5. Idempotency and duplicate protection must be confirmed.
6. Allowed post-execution writes must be separately approved.
7. Email and inventory actions remain separate gates.
