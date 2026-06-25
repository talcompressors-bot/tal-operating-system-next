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
