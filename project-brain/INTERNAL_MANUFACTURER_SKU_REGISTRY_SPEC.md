# Internal Manufacturer SKU Registry Spec

Date: 2026-06-24

Mode: documentation only.

Runtime impact: none. This spec does not implement code, write to the DB, change Prisma, import data, deduct inventory, create BusinessDocuments, or trigger Maven/Invoice4U.

## Goal

Define how an internal manufacturer SKU registry should represent manufacturer part numbers, model compatibility, and AI Draft evidence before any implementation.

Manufacturer spare-parts workbooks are the primary source of truth for SKU-to-model relationships. Historical service data is secondary evidence.

## Approved Manufacturer Parts Governance Rules

These rules govern how manufacturer spare-parts workbooks may be used inside Tal Operating System.

1. Manufacturer spare-parts workbook data is technical SKU/model evidence.
2. Manufacturer workbook cost is internal cost evidence only, not customer selling price.
3. Maven/Invoice history is customer price evidence.
4. `ServiceReports` and `ReportEquipmentItems` are operational service evidence.
5. One manufacturer SKU may fit multiple compressor models.
6. Shared SKU compatibility is not a duplicate or conflict.
7. PM/APM alias family requires approved alias governance, not automatic merge.
8. If model identity is generic or low-confidence, do not auto-assign a SKU.
9. `SCR20EPM` cannot infer an EPM workbook SKU if the workbook starts at `25EPM`.
10. Belt recommendations remain historical-only unless another approved manufacturer source exists.
11. No inventory deduction is allowed from AI Draft, pricing evidence, service report, or recommendation.
12. Inventory deduction is allowed only after approved BusinessDocument/invoice workflow, confirmed SKU, confirmed quantity, audit evidence, and a separate inventory transaction gate.
13. `MODEL_ALIAS` is not the same as `PART_COMPATIBILITY`.
14. Approved model alias does not automatically imply identical service kits or identical spare parts.
15. Approved aliases `10APM = 10PM2` and `20APM = 20PM2` are identity mappings only.
16. Known non-compatibility: `20APM Oil Separator != 20PM2 Oil Separator`.
17. Approved part compatibility exception: `20APM Oil Separator = 30PM Oil Separator`.
18. Parts compatibility must be stored separately from alias mappings.

These rules do not approve implementation or data writes.

## Model Alias vs Part Compatibility

Approved Liad rule:

```text
MODEL_ALIAS != PART_COMPATIBILITY
```

Equipment Identity and Parts Compatibility are separate layers.

Approved identity aliases:

| Alias relationship | Meaning | Parts compatibility effect |
|---|---|---|
| `10APM = 10PM2` | Approved model identity alias | Does not automatically prove identical service kits or parts |
| `20APM = 20PM2` | Approved model identity alias | Does not automatically prove identical service kits or parts |

Approved compatibility exception:

| Model | Part category | Compatible source model / part family | Status |
|---|---|---|---|
| `20APM` | Oil Separator | `30PM` Oil Separator | Approved exception |

Known non-compatibility:

| Model | Part category | Not compatible with | Status |
|---|---|---|---|
| `20APM` | Oil Separator | `20PM2` Oil Separator | Must not auto-match |

Storage rule:

- Store model alias mappings in the Equipment Identity / Alias layer.
- Store part compatibility rules in the Manufacturer SKU / Parts Compatibility layer.
- Do not derive part compatibility from alias mappings.
- Do not derive service-kit equality from alias mappings.

## Core Rule: Shared Manufacturer SKUs Are Valid

A manufacturer part number may belong to multiple compressor models.

If the same manufacturer SKU fits multiple models, this is allowed and should be stored as shared-model evidence. It must not be treated as a duplicate or conflict by itself.

Examples from current SCR PM/EPM evidence:

- `80000175-039` fits every extracted PM/EPM model as coolant evidence.
- `25200007-005` fits multiple small/mid PM and EPM models as oil-filter evidence.
- `25200018-005` fits multiple mid/large PM and EPM models as oil-filter evidence.
- `25100043-071` and `25100075-071` fit multiple model groups as air-filter evidence.
- `25300045-023` and `25300065-031` fit multiple model groups as oil-separator evidence.

The registry should preserve all compatible models as evidence for the part number.

## AI Draft Assignment Order

AI Draft must assign parts using this order:

1. Exact equipment model.
2. Approved model alias.
3. Service type.
4. Part category.
5. Manufacturer SKU registry evidence.

Interpretation:

- Exact equipment model means a specific observed or approved model identity, not a generic compressor description.
- Approved model alias means Liad-approved alias evidence or a future approved AliasRegistry entry.
- Service type means a supported service pattern such as small service, large service, 2000h, 2500h, 4000h, 5000h, or another approved interval.
- Part category means air filter, oil filter, oil separator, oil/coolant, belt, sensor, valve, cooler, airend part, or another approved category.
- Manufacturer SKU registry evidence means the part number and compatible model list from the manufacturer workbook-derived registry.

## Required Registry Fields

Future registry rows should be evidence-first and reviewable.

| Field | Purpose |
|---|---|
| `manufacturerPartNumber` | Manufacturer SKU / part number |
| `partDescription` | Manufacturer part description |
| `partCategory` | Filter, separator, oil/coolant, belt, valve, sensor, cooler, airend, or other |
| `series` | PM/APM, EPM, or another approved series |
| `compatibleModels` | All manufacturer-listed compatible models |
| `sourceFile` | Manufacturer workbook source |
| `sourceModel` | Workbook model value |
| `sourceIntervalColumns` | Service interval quantity evidence, if available |
| `isSharedAcrossModels` | True when the SKU belongs to more than one model |
| `evidenceType` | `MANUFACTURER_EXACT`, `HISTORICAL_SECONDARY`, or `APPROVED_ALIAS` |
| `costEvidence` | Vendor purchase/cost value, if present |
| `sellingPriceApproved` | False unless a separate pricing rule approves selling price |
| `needsSkuApproval` | True when model identity or alias evidence is weak |
| `compatibilityRuleType` | `MANUFACTURER_ROW`, `APPROVED_EXCEPTION`, `HISTORICAL_SECONDARY`, or `UNKNOWN` |
| `compatibilityExceptionNote` | Required when compatibility differs from model alias expectations |

## Observed Manufacturer Excel Source Inventory

Read-only inspection on 2026-06-25 found the current manufacturer spare-parts files under `data-sources/vendor-spare-parts/`:

| File | Format observed | Current evidence status | Notes |
|---|---|---|---|
| `Spare Parts Service List(PM Series) rev3 (1).xls` | Office Open XML workbook stored with `.xls` extension | Inspectable by workbook XML extraction | Contains one sheet per PM/APM-compatible model family: `10PM2`, `15PM2`, `20PM2`, `30PM`, `40PM`, `50PM`, `60PM`, `75PM`, `100PM` |
| `Spare Parts Service List(EPM Series) rev2 (1).xls` | Legacy binary `.xls` | Partially inspectable by binary strings only in the current environment | Strings confirm EPM model coverage including `25EPM`, `30EPM`, `40EPM`, `50EPM`, `60EPM`, `75EPM`, `90EPM`, `100EPM`, `125EPM`, `150EPM`, plus part names such as air filter, oil filter, oil separator, valves, coolers, motor, airend, and oil quantities |

Parser/tooling evidence:

- No repo-local `xlsx` or `exceljs` package is installed, and new npm packages require explicit package-by-package approval.
- Excel COM could not open workbooks in the current session.
- PM workbook XML was inspected without adding packages by expanding the zipped workbook structure.
- EPM workbook requires an approved `.xls` parser, LibreOffice conversion, Excel session, or a converted `.xlsx/.csv` copy before exact sheet/row extraction can be trusted.

## Observed PM Workbook Structure

The PM workbook uses consistent model sheets. Each inspected sheet has this structure:

| Row / columns | Meaning |
|---|---|
| Row 1 | Title such as `Recommendatory Spare parts of SCR40PM series` |
| Row 2 | Header row: `Item`, `Model`, `Code`, `spare parts name`, `specification`, `Unit`, `Rated qty for each`, `Quotation (US$) Per Each`, service interval columns such as `2000H`, `4000H`, `8000H`, through `30000H`, `the first exchange time`, `the second exchange time`, `Remark` |
| Row 3 | Interval quantity labels |
| Rows 4+ | Part rows where `Model` is the model key, `Code` is the manufacturer SKU/part number, and `spare parts name` is the part description |

Observed PM examples:

| Sheet | Model | Example part category | Manufacturer code | Description | Row evidence |
|---|---|---|---|---|---|
| `40PM` | `40PM` | Air filter | `25100043-071` | `air filter core` | Row 6 |
| `40PM` | `40PM` | Oil filter | `25200007-005` | `Oil Filter` | Row 7 |
| `40PM` | `40PM` | Oil separator | `25300045-023` | `oil separator` | Row 8 |
| `40PM` | `40PM` | Oil/coolant | `80000175-039` | `Coolant`; remark includes required oil quantity | Row 9 |

## Future SKU Registry Schema Plan

Do not migrate yet. A later approved schema should separate manufacturer technical identity from Tal internal inventory identity.

Recommended future tables or equivalent model areas:

| Future object | Purpose | Key fields |
|---|---|---|
| `ManufacturerSkuSourceFile` | One row per vendor workbook/import batch | `id`, `manufacturer`, `fileName`, `fileHash`, `sourcePath`, `uploadedAt/importedAt`, `parserVersion`, `reviewStatus` |
| `ManufacturerSkuSourceSheet` | One row per workbook sheet/model section | `id`, `sourceFileId`, `sheetName`, `sourceSeries`, `sourceModel`, `title`, `rowCount`, `columnMap`, `reviewStatus` |
| `ManufacturerSku` | Canonical manufacturer part number | `id`, `manufacturer`, `manufacturerPartNumber`, `normalizedPartNumber`, `partDescription`, `partCategory`, `unit`, `costEvidence`, `currency`, `status` |
| `ManufacturerSkuCompatibility` | Many-to-many model compatibility evidence | `id`, `manufacturerSkuId`, `sourceSheetId`, `sourceRowNumber`, `sourceModel`, `normalizedModel`, `compatibleModel`, `partCategory`, `serviceIntervals`, `ratedQty`, `exchangeTime`, `remark`, `confidence`, `needsReview` |
| `InternalSkuMapping` | Tal internal SKU mapping to manufacturer part/equivalent | `id`, `internalSku`, `manufacturerSkuId`, `mappingType`, `approvedBy`, `approvedAt`, `status`, `notes` |
| `SkuMatchAuditEvidence` | Evidence for AI Draft / BusinessDocument / inventory decisions | `id`, `sourceFileId`, `sourceSheetId`, `sourceRowNumber`, `serviceReportId`, `businessDocumentItemId`, `matchedModel`, `matchedPartType`, `confidence`, `needsReview`, `decision` |

Required audit/source fields:

- `manufacturer`
- `sourceFileName`
- `sourceFileHash`
- `sourceSheetName`
- `sourceRowNumber`
- `sourceColumnMap`
- `rawModel`
- `normalizedModel`
- `manufacturerPartNumber`
- `partDescription`
- `partCategory`
- `compatibleModels`
- `serviceIntervalColumns`
- `ratedQuantity`
- `exchangeTime`
- `remark`
- `parserVersion`
- `importBatchId`
- `reviewedBy`
- `reviewedAt`
- `needsReview`
- `manualOverrideReason`

## Gradual Import And Enrichment Plan

1. Inventory source workbooks and compute file hashes without writing DB rows.
2. Convert or parse PM/EPM files into reviewed intermediate rows.
3. Normalize model names into canonical tokens such as `SCR40PM`, `40PM`, and approved aliases without merging part compatibility.
4. Normalize part descriptions into part categories such as `AIR_FILTER`, `OIL_FILTER`, `OIL_SEPARATOR`, `OIL_COOLANT`, `VALVE`, `SENSOR`, `COOLER`, `AIREND`, and `OTHER`.
5. Load reviewed rows into the future registry only after explicit schema/import approval.
6. Enrich with Liad-approved internal SKU mappings over time.
7. Let AI Draft, BusinessDocument review, inventory, and purchase orders consume the same registry after approval.
8. Keep every enrichment row auditable back to file/sheet/row or manual override evidence.

Customer-facing output rule:

- Customer-facing PDFs may show SKU only when the SKU is trusted and approved for display.
- If the match is manufacturer-only but internal SKU mapping is not approved, hide SKU from customer-facing PDF and show the evidence only on internal review.
- If no confident match exists, show no SKU on customer-facing PDF and set SKU review required internally.

## AI Draft Behavior

AI Draft may use the manufacturer SKU registry to select the correct internal part candidate only as evidence for a draft recommendation.

Required behavior:

- Use manufacturer SKU registry evidence to select candidate parts.
- Show all compatible models as evidence.
- Do not treat shared SKU compatibility as an error.
- Do not treat shared SKU compatibility as a duplicate conflict.
- Do not use manufacturer SKU cost as selling price.
- Do not deduct inventory.
- Do not create a BusinessDocument automatically.
- If model identity is generic or low confidence, set `NeedsSkuApproval = true`.
- Do not infer `SCR20EPM` compatibility from EPM workbook rows when the manufacturer workbook coverage starts at `25EPM`.
- Keep belt recommendations historical-only unless a separate approved manufacturer/catalog source provides belt SKU evidence.
- Do not assume identical service kits from a model alias.
- Do not assume identical spare parts from a model alias.
- For `20APM` oil separator, use the approved `30PM` oil separator compatibility exception, not `20PM2`.

## Generic Or Low-Confidence Model Rule

Generic equipment descriptions, horsepower-only descriptions, and low-confidence model identities must not automatically select a manufacturer SKU.

When model identity is generic or low confidence:

- keep model as `UNKNOWN_MODEL` / `GENERIC_HP_CLASS`
- do not assign an automatic SKU
- set `NeedsSkuApproval = true`
- show possible evidence only if it is clearly marked review-only

## Shared SKU Handling

Shared SKU compatibility is normal manufacturer evidence.

Allowed:

- one part number linked to many models
- one model linked to many part numbers
- one part category with different SKUs depending on model and service type
- one SKU shown as candidate evidence for more than one compatible model

Forbidden:

- collapsing compatible models into one model
- marking shared SKU as duplicate solely because it appears for multiple models
- using shared SKU evidence to override model identity
- using shared SKU cost as customer selling price
- deducting stock from shared SKU evidence alone
- inferring a missing manufacturer model from nearby family coverage
- treating PM/APM as merged without approved alias governance
- deriving part compatibility from model alias alone
- assigning `20PM2` oil separator to `20APM`

## Relationship To Parts / SKU Intelligence Spec

This spec defines the manufacturer SKU registry evidence layer.

`project-brain/PARTS_SKU_INTELLIGENCE_SPEC.md` defines the broader AI Draft parts/SKU recommendation behavior, including service pattern evidence, confidence levels, approval gates, inventory restrictions, and forbidden actions.

The Parts / SKU Intelligence Layer should consume this registry only after model identity, alias, service type, and part category checks are satisfied.

## Protected Boundaries

This spec does not approve:

- DB writes
- imports
- Prisma changes
- schema changes
- code changes
- AI Draft writes
- BusinessDocument creation
- BusinessDocumentItem creation
- Maven/Invoice4U action
- inventory deduction
- source-system writes
- automatic SKU matching from generic equipment descriptions

## Risk Notes

- Shared manufacturer SKUs are expected; treating them as duplicates would damage SKU intelligence.
- A shared SKU can still be wrong for a specific draft if the model identity, alias, service type, or part category is wrong.
- Vendor cost is purchase evidence only and must not become selling price.
- Historical usage can support confidence but cannot override manufacturer compatibility.
- Generic equipment descriptions must remain approval-gated.
