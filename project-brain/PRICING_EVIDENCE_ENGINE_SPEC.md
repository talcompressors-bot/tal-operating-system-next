# Pricing Evidence Engine Spec

Status: Legacy specification. Permanent commercial and pricing evidence rules now belong in `SERVICE_COMMERCIAL_RULES.md`. Do not extend this file as a permanent planning surface; migrate durable knowledge into the reusable Knowledge Base.

Date: 2026-06-24
Mode: Specification only
Runtime impact: none

## Goal

Design a read-only Pricing Evidence Engine that can explain price recommendations before any AI Draft pricing automation, BusinessDocument creation, Maven/Invoice4U action, import, DB write, or Prisma change.

The engine must answer:

- What price evidence exists?
- Which customer, equipment, item, and date produced that evidence?
- How strong is the evidence?
- Does the suggested price still require Liad approval?

## 1. Data Sources

### `InvoiceMavenDocumentItems`

Primary business-memory source for historical line-item pricing.

Use for:

- customer-specific item prices
- historical labor prices
- repeated item/service prices
- item descriptions
- quantities
- unit prices
- line totals
- currency
- document date through parent document link

Known caveat:

- Maven item history is rich but may contain inconsistent free-text item descriptions.
- Open sync/history quality issues must be checked before treating coverage as complete.

### `InvoiceMavenDocuments`

Primary document context source for Maven history.

Use for:

- customer identity
- document date
- document type
- document description
- document totals
- VAT context
- PDF/source traceability
- customer name normalization
- repeat-job detection by customer/date/description

### `ServiceReports`

Operational service context source.

Use for:

- source report ID
- customer link
- report date
- service type
- work performed
- technician summary
- recommendations
- technician work hours
- future AI Draft trigger context

### `ReportEquipmentItems`

Equipment and service-detail context source.

Use for:

- equipment model evidence
- serial number evidence
- equipment type/subtype
- compressor category
- current hours
- next service
- service description
- technician recommendations

### `ProductsCatalog`

Catalog price and SKU reference source.

Use for:

- SKU identity
- product name and description
- selling price
- currency
- compatible equipment evidence
- active/inactive product status

Known caveat:

- Duplicate SKU handling must be respected. `PM-0001` is canonical for `SCR-20EPM`; `PM-0049` is duplicate evidence only.

### Parts / SKU Intelligence Layer

Related specification:

- `project-brain/PARTS_SKU_INTELLIGENCE_SPEC.md`

Use for:

- SKU candidate evidence before pricing.
- SCR parts workbook/table compatibility evidence.
- service-pattern-to-SKU evidence.
- quantity evidence status.
- SKU approval flags.

Rules:

- One SKU may fit multiple compressor models.
- One compressor model may require multiple SKUs depending on service type.
- Generic compressor descriptions must not trigger automatic SKU matching.
- Service pattern rules such as Small Service and Large Service can suggest expected line categories, but cannot approve price.
- SKU confidence and price confidence are separate decisions.

## 2. Evidence Priority

The engine must rank pricing evidence in this order:

1. Same customer + same or highly similar item.
2. Same equipment/model/service history.
3. `ProductsCatalog` direct SKU price.
4. Similar customer/service history.
5. Vendor workbook cost evidence.
6. AI estimate only with `NeedsPriceApproval = true`.

Rules:

- Same-customer evidence beats generic catalog evidence when item similarity is strong and recent enough.
- Exact SKU evidence beats text-only item similarity.
- Equipment/model evidence is valid only after equipment identity rules pass.
- SKU candidate evidence must come from the Parts / SKU Intelligence Layer before a SKU-specific price is trusted.
- Vendor workbook evidence is cost evidence, not customer selling price.
- AI estimate is never approved price evidence by itself.
- For compressor service business documents, the compressor model must appear in the document title/header so pricing evidence can be tied to model, service type, expected parts, future internal SKUs, historical pricing evidence, and inventory matching.

## 3. Equipment Identity Rules

Exact model identity beats horsepower class.

Required rules:

- Exact model beats horsepower.
- Generic `20 HP` is not `SCR-20EPM`.
- Generic equipment descriptions stay `UNKNOWN_MODEL` / `GENERIC_HP_CLASS`.
- No automatic SKU matching from generic equipment.

Generic examples:

- `מדחס 20 כ"ס`
- `מדחס בורגי 20 כ"ס`
- `20HP compressor`

These must not be merged into `SCR-20EPM` or any other specific model unless additional evidence exists.

Additional evidence means at least one of:

- exact model name
- serial number
- customer equipment registry match
- repeated service history match
- manufacturer/model pair
- approved Liad mapping

Horsepower may be stored as an attribute for filtering or review, but not as model identity.

## 4. Price Confidence Levels

### `HIGH`

Use only when evidence is direct and strong.

Examples:

- same customer + exact item/SKU + recent historical price
- exact equipment model + exact item/SKU + repeated historical price
- approved catalog SKU price with no duplicate or identity conflict

Default approval:

- `needsPriceApproval = false` only if no conflict, no stale-price warning, and pricing policy allows reuse.

### `MEDIUM`

Use when evidence is relevant but not definitive.

Examples:

- same customer + similar item text
- same equipment model + similar service line
- catalog SKU exists but historical usage is limited
- repeated service history exists but item naming differs

Default approval:

- `needsPriceApproval = true` unless Liad approves the specific mapping or policy.

### `LOW`

Use when evidence is weak or indirect.

Examples:

- similar customer/service only
- item description text match without SKU
- equipment family match without exact model
- older history with unclear relevance

Default approval:

- `needsPriceApproval = true`.

### `NEEDS_APPROVAL`

Use when price should not be auto-applied.

Examples:

- AI estimate
- vendor workbook cost evidence only
- generic equipment class only
- conflicting prices
- duplicate SKU conflict
- missing quantity
- no matching historical or catalog price

Default approval:

- `needsPriceApproval = true`.

## 5. Output Fields

The engine output must be evidence-first and read-only.

Required fields:

| Field | Meaning |
|---|---|
| `recommendedPrice` | Suggested unit price or `null` when not safely recommendable |
| `priceSource` | `SAME_CUSTOMER_HISTORY`, `SAME_EQUIPMENT_HISTORY`, `PRODUCTS_CATALOG`, `SIMILAR_HISTORY`, `VENDOR_COST_EVIDENCE`, `AI_ESTIMATE`, or `NONE` |
| `customerMatch` | Customer match result, including exact/similar/none and source row IDs |
| `equipmentMatch` | Equipment match result, including exact model/generic class/unknown |
| `itemSimilarity` | Item/SKU similarity result and explanation |
| `lastUsedDate` | Most recent supporting business date, when available |
| `confidence` | `HIGH`, `MEDIUM`, `LOW`, or `NEEDS_APPROVAL` |
| `needsPriceApproval` | Boolean; true unless the evidence is strong and policy allows reuse |
| `evidenceRows` | Source rows used to justify the recommendation |

`evidenceRows` must include enough traceability to re-check the recommendation:

- source table
- source row ID
- customer ID/name
- document number/date when available
- item description
- quantity
- unit price
- currency
- raw source pointer or raw excerpt summary

## 6. Risk Rules

Hard rules:

- A repeated price is not a contract.
- Customer-specific price cannot override current pricing without evidence.
- No automatic `BusinessDocument` creation.
- No Maven/Invoice4U action.
- No DB writes.
- No Prisma changes.
- No imports.
- No source-system writes.

Pricing safety rules:

- Customer-specific evidence must cite the customer and historical document.
- Cross-customer reuse requires `needsPriceApproval = true`.
- Conflicting historical prices require `needsPriceApproval = true`.
- Service pattern rules can identify expected service lines, but they do not approve pricing.
- Generic horsepower class cannot drive automatic SKU or kit selection.
- Pricing evidence cannot authorize inventory deduction.
- AI Draft, pricing evidence, service report evidence, and recommendations cannot deduct inventory.
- Inventory deduction requires an approved BusinessDocument / invoice workflow, confirmed SKU mapping, approved quantity, audit evidence, and a separate inventory transaction gate.
- Vendor workbook cost can support margin review but cannot become customer-facing selling price by itself.
- Stale prices must be flagged when date policy is missing or exceeded.
- Missing or ambiguous currency requires `needsPriceApproval = true`.
- Manufacturer part numbers are internal technical evidence; customer price must come from Maven/history/pricing evidence, not spare-parts cost.

## 7. AI Draft Support

The Pricing Evidence Engine will support future AI Draft recommendations by providing a separate evidence packet before any draft write.

Future AI Draft flow:

```text
ServiceReport + ReportEquipmentItems
-> Parts / SKU Intelligence Layer
-> candidate item/service lines with SKU and quantity evidence
-> Pricing Evidence Engine
-> evidence-backed price recommendation
-> AI Draft recommendation preview
-> Liad/user approval
-> future approved internal draft write only after separate approval
```

The AI Draft should use engine output this way:

- `recommendedPrice` becomes a proposed unit price only when confidence and approval rules allow it.
- SKU-specific pricing requires confirmed or approval-flagged SKU candidate evidence from `PARTS_SKU_INTELLIGENCE_SPEC.md`.
- Compressor service document titles/headers must show the compressor model before price evidence is presented.
- Large Service / Small Service rules may explain expected line categories, but each generated price must still cite pricing evidence and approval status.
- The global compressor service document-line rule applies to quotes, invoices, proforma invoices, delivery notes if relevant, service draft documents, `BusinessDocuments`, `BusinessDocumentItems`, AI Draft outputs, Maven document drafts, and any future customer-facing document.
- Compressor service recommendations and generated document drafts must evaluate commercial service components in addition to technical parts:
  - Parts lines.
  - Oil handling line if needed.
  - Labor + Service.
  - Technician Visit / Travel.
- Every generated or suggested document line must show `INCLUDED`, `EXCLUDED`, or `NEEDS_APPROVAL`.
- The system must explain why each standard line is included, excluded, or approval-required.
- Labor + Service is one commercial line. It must not be split into separate Labor and Service lines unless Liad explicitly approves an exception.
- Technician Visit / Travel is one commercial line. It must not be split into separate Technician Visit and Travel lines.
- SCR compressor 2000h / 2500h Small Service kit includes Air Filter, Oil Filter, and 3L SKR oil top-up.
- Labor + Service is a separate commercial line. It is not included in the small service kit unless explicit historical evidence says otherwise.
- Technician Visit / Travel has a default suggested price of `300` ILS. It may be waived for nearby customers, so keep `NeedsApproval = true` when evidence conflicts or customer-specific history exists.
- For 4000h / 5000h Large Service, oil means full oil replacement. Do not price or describe Large Service oil as top-up.
- Partial serial evidence remains `NEEDS_MANUAL_CONFIRMATION`; do not classify it as `HIGH_WITH_REVIEW`.
- Historical bundled kit price must explain whether it covers parts only, parts + labor/service, or parts + labor/service + technician visit/travel.
- Do not double-charge travel.
- Do not double-charge technician visit.
- Do not double-charge service/labor.
- Labor/service and technician visit/travel are not optional just because they are not manufacturer parts; they must be evaluated as commercial service lines.
- `priceSource` and `evidenceRows` must be shown in reasoning.
- `needsPriceApproval = true` must block automatic pricing.
- `UNKNOWN_MODEL` / `GENERIC_HP_CLASS` must block automatic SKU matching.
- `needsSkuApproval = true` or `needsQuantityApproval = true` must block automatic item approval.
- AI may explain likely price, but AI estimate alone must remain approval-required.

## 8. Validation Requirements For Future Implementation

Before implementation, validate:

- exact source tables and headers
- document-item to document parent links
- customer identity links
- item description normalization rules
- equipment identity rules
- duplicate SKU policy
- currency handling
- stale-price policy
- confidence threshold policy

Implementation must remain read-only until Liad separately approves writes or AI Draft automation.

## 9. Decision Status

This specification does not approve:

- import
- DB writes
- Prisma changes
- BusinessDocument creation
- BusinessDocumentItem creation
- Maven/Invoice4U action
- customer sending
- production workflow changes

Recommended next gate:

Approve a read-only Pricing Evidence Engine discovery/prototype that reads source evidence and emits an evidence packet for one known service report, with no writes.
