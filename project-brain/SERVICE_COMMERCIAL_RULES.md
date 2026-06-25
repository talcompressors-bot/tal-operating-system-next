# Service Commercial Rules

Status: Reusable Knowledge Base
Scope: service-report commercial evidence, pricing boundaries, line rules, approval flags
Runtime impact: none

This knowledge base consolidates durable commercial rules from report-specific evidence packets. Historical report-specific proof remains archived.

## Business Document Line Rules

Applies to quotes, invoices, proforma invoices, delivery notes when relevant, service draft documents, `BusinessDocuments`, `BusinessDocumentItems`, AI Draft outputs, Maven document output, and future customer-facing documents.

| Rule | Required behavior |
|---|---|
| Compressor service title/header | Must clearly show equipment model when model evidence exists |
| Parts lines | Use model/service/manufacturer evidence; show approval state |
| Oil handling line | Include when service/model evidence requires it; action/quantity may require approval |
| Labor + Service | One commercial line; do not split unless explicitly approved |
| Technician Visit / Travel | One commercial line; do not generate separate visit and travel lines |
| Line state | Every generated/suggested line must be included, excluded, or approval-required |
| Bundled history | Must state whether bundle includes parts only, parts + labor/service, or parts + labor/service + travel |

## Pricing Evidence Rules

- Customer selling price must come from approved pricing evidence sources, not manufacturer cost.
- Manufacturer workbook costs are vendor/internal cost evidence only.
- Historical Maven rows are selling-price evidence only after link confidence and document status/type are reviewed.
- Bundled Maven kit prices must not be split into individual part prices without an approved allocation rule.
- Conflicting historical/current-rule evidence must keep approval-required state.

## Commercial Evidence Source Priority

1. ProductCatalog / aliases.
2. Historical BusinessDocumentItems.
3. Maven/Invoice item history when linked with sufficient confidence.
4. Manual approval/override with audit evidence.

Manufacturer SKU evidence can identify the part, but it does not approve selling price.

## Reusable Report 5806 Commercial Facts

Archived source: `project-brain/archive/research/SERVICE_REPORT_5806_COMMERCIAL_EVIDENCE_PACKET.md`.

Reusable facts extracted:

- Report `5806` / `1e25bbb1` has strong Maven commercial linkage through document descriptions/raw JSON.
- Maven docs `102451` and `102452` directly reference report `5806`, customer, `40PM`, and small-service compressor kit context.
- Maven doc `102453` directly references report `5806`, but it is dryer/filter-element work rather than SCR-40PM compressor-kit evidence.
- Direct SCR-40PM compressor-kit price evidence: `1213.38 ILS` per kit in docs `102451` and `102452`.
- Same-customer SCR/40PM kit history shows `1134.00` to `1213.38 ILS` kit evidence.
- Air Filter and Oil Filter are usually bundled inside the small-service kit in the observed Maven evidence; separate selling prices are not proven by that packet.
- Labor/service historical evidence exists around `225.00` to `250.00 ILS`, with current/manual rule conflicts requiring approval.
- Travel evidence conflicts: direct compressor docs show `0.00`, while same-customer history shows paid travel around `225.00` to `250.00 ILS`, and the current default suggestion may be `300 ILS`; keep approval-required.

## Approval Flags

| Flag | Use when |
|---|---|
| `NeedsPriceApproval` | Price missing, stale, conflicting, bundled without allocation, customer-specific, or manually overridden |
| `NeedsQuantityApproval` | Quantity missing, inferred from equipment count, oil quantity/action unresolved, or interval semantics unclear |
| `NeedsSkuApproval` | Internal SKU missing, model generic, source row missing, or compatibility requires review |
| `NeedsManualConfirmation` | Partial serial, customer mismatch, ambiguous document link, or human correction needed |

## Forbidden Uses

This knowledge base does not approve:

- Automatic AI Draft writes.
- BusinessDocument creation without protected approval.
- Maven/Invoice4U calls.
- Customer emails or delivery.
- Inventory actions.
- DB writes, schema changes, imports, or migrations.
