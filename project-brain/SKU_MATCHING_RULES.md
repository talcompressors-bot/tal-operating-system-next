# SKU Matching Rules

Status: Reusable Knowledge Base
Scope: runtime/review SKU matching behavior across AI Draft, BusinessDocument, PDF, inventory, and purchase orders
Runtime impact: none

This file consolidates durable SKU matching rules so future work extends one knowledge base rather than creating per-model/per-report evidence packets.

## Evidence Priority

1. Exact equipment model.
2. Approved model alias.
3. Service pattern.
4. Manufacturer parts registry row.
5. Historical usage/pricing evidence.
6. Manual override with audit evidence.

Manufacturer Excel row evidence is the primary technical compatibility source. Pricing history is not compatibility proof.

## Matching Rules

| Step | Rule |
|---|---|
| Exact model match | Use raw equipment model or approved equipment registry model |
| Normalized model match | Remove separators/case noise only; do not infer nearby models |
| Approved alias | Use only Liad-approved aliases or future approved alias registry |
| Part keyword match | Map item text to part category such as AIR_FILTER, OIL_FILTER, OIL_SEPARATOR, OIL_COOLANT |
| Manufacturer row match | Select manufacturer part number from reviewed file/sheet/row for model + part category |
| Manual override | Requires approver, date, reason, and preserved original evidence |

No confident match behavior:

- Set review-required state.
- Keep customer-facing SKU hidden.
- Show internal attempted model, part category, missing evidence reason, and source context.

## Confidence Rules

| Confidence | Required evidence |
|---|---|
| HIGH | Exact/approved model + reviewed manufacturer row + matching part category + source file/sheet/row |
| MEDIUM | Exact/approved model but quantity/action/service pattern requires review |
| LOW | Text-only or indirect evidence |
| REVIEW_REQUIRED | Missing source row, generic model, ambiguous category, unsupported alias, or manual review needed |

## Internal Review Fields

- Matched SKU / manufacturer part number.
- Manufacturer.
- Confidence.
- Part category.
- Compatible models.
- Source file.
- Source sheet.
- Source row.
- Source description.
- Needs-review flag.
- Reason / blocker.
- Manual override reason when applicable.

## Customer-Facing Display Rule

- Customer preview/PDF shows SKU only when trusted.
- If no trusted match exists, customer-facing SKU cell is blank or column is hidden.
- Internal evidence text must not appear on the customer-facing surface.

## Current Runtime Seed: ServiceReport 5806

Runtime implementation commit: `cac31e4 Add runtime SKU matching for report 5806`.

Scope:

- ServiceReport `5806` only.
- Linked equipment model evidence must support `40PM` / `SCR-40PM`.
- Evidence source must be PM Series workbook rows from `MANUFACTURER_PARTS_REGISTRY.md`.

Trusted seed matches:

| Part category | Item text example | Manufacturer SKU | Source |
|---|---|---|---|
| AIR_FILTER | Air Filter | `25100043-071` | PM Series `40PM`, row 6 |
| OIL_FILTER | Oil Filter | `25200007-005` | PM Series `40PM`, row 7 |
| OIL_SEPARATOR | Oil Separator | `25300045-023` | PM Series `40PM`, row 8 |
| OIL_COOLANT | Coolant / SKR oil top-up | `80000175-039` | PM Series `40PM`, row 9 |

## Future Shared Consumer Rule

AI Draft, BusinessDocument review, customer preview/PDF, inventory, and purchase orders must use the same SKU registry and matching rules.

Purchase orders must not create SKU identity from free text. They should reference an approved internal SKU or approved manufacturer part/equivalent mapping.

## Forbidden Uses

This knowledge base does not approve:

- DB writes, imports, schema changes, or migrations.
- Inventory deduction or stock movement.
- Maven/Invoice4U action.
- Customer email/delivery.
- Selling price approval.
- Free-text SKU creation.
