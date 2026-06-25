# Parts / SKU Intelligence Spec

Date: 2026-06-24
Mode: Specification only
Runtime impact: none

## Goal

Define a read-only Parts / SKU Intelligence Layer that can explain which SKUs may fit a service recommendation before any AI Draft write, BusinessDocument creation, inventory deduction, Maven/Invoice4U action, import, DB write, or Prisma change.

This layer is evidence-only. It must not merge equipment identities, normalize generic descriptions into specific models, create documents, change stock, or approve quantities by itself.

## 1. Data Sources

Primary evidence sources:

- SCR PM/EPM spare-parts workbooks under `data-sources/vendor-spare-parts/`.
- `project-brain/INTERNAL_MANUFACTURER_SKU_REGISTRY_SPEC.md`.
- `PM_EPM_SPARE_PARTS_SOURCE_OF_TRUTH_REPORT.md`.
- `SCR_SKU_TO_DOCUMENT_DRAFT_ANALYSIS.md`.
- `SCR_MATCHING_PREVIEW.md`.
- `ProductsCatalog`.
- `PartsUsed`.
- `InvoiceMavenDocumentItems`.
- `InvoiceMavenDocuments`.
- `ServiceReports`.
- `ReportEquipmentItems`.
- `project-brain/INVENTORY_LEARNING_LOOP_SPEC.md`.

Rules:

- SCR parts tables/workbooks are a key SKU compatibility source.
- Vendor workbook prices are purchase/cost evidence only, not approved selling prices.
- Historical invoice rows are business-memory evidence but may contain free-text item descriptions.
- Maven/Invoice history is customer price evidence and belongs to pricing confidence, not manufacturer compatibility.
- `ServiceReports` and `ReportEquipmentItems` are operational service evidence, not manufacturer SKU authority.
- `PartsUsed` can support actual usage evidence only when linked to a real service report and approved mapping.
- Empty staging tables do not mean the source does not exist; connector/source evidence must be distinguished from staging evidence.
- For compressor service drafts, AI Draft must identify the compressor model clearly in the draft title/header before assigning part candidates.

## 2. Core Relationship Rules

The layer must support many-to-many SKU logic:

- One SKU may fit multiple compressor models.
- One compressor model may require multiple SKUs depending on service type.
- One service interval may require a different SKU set than another interval for the same model.
- One historical item description may map to multiple possible SKU candidates unless exact SKU evidence exists.
- A shared manufacturer SKU is valid shared-model evidence, not a duplicate or conflict by itself.
- PM/APM alias family requires approved alias governance, not automatic merge.
- `SCR20EPM` cannot infer an EPM workbook SKU if the manufacturer workbook starts at `25EPM`.
- Belt recommendations remain historical-only unless another approved manufacturer source exists.
- `MODEL_ALIAS` is not the same as `PART_COMPATIBILITY`.
- Approved model alias does not automatically imply identical service kits or identical spare parts.
- Approved model aliases `10APM = 10PM2` and `20APM = 20PM2` are identity evidence only.
- Approved compatibility exception: `20APM Oil Separator = 30PM Oil Separator`.
- Known non-compatibility: `20APM Oil Separator != 20PM2 Oil Separator`.

Examples:

- A 2000 hour service may require air filter and oil filter candidates.
- A 4000 hour service may require air filter, oil filter, oil separator, oil, or additional parts depending on model evidence.
- A generic compressor description may describe equipment class but must not trigger automatic SKU matching.
- Standard compressor service draft lines may include Oil Filter, Air Filter, Oil Separator + gaskets, Oil / oil replacement / oil top-up according to model and oil evidence, Labor + service, and Technician visit / travel.

## 3. SKU Matching Evidence Order

SKU matching must use this evidence order:

1. Exact model.
2. Approved alias.
3. Service pattern.
4. Parts table evidence.
5. Historical invoice evidence.

Manufacturer Excel files are the trusted technical source for SKU-to-model compatibility when a reviewed workbook row is available. `ProductsCatalog`, Maven history, BusinessDocument history, and PartsUsed may support internal SKU mapping or usage/pricing confidence, but they must not override manufacturer compatibility without an approved manual override.

When using the internal manufacturer SKU registry, AI Draft must assign parts by exact equipment model, approved model alias, service type, part category, and manufacturer SKU registry evidence. If model identity is generic or low confidence, set `NeedsSkuApproval = true`.

Interpretation:

- Exact model means a raw equipment model record or approved customer equipment record, not a generic description.
- Approved alias means a governed alias approved by Liad or a future approved AliasRegistry, not an inferred merge.
- Approved alias does not prove part compatibility; part compatibility must be checked in the manufacturer SKU registry or approved compatibility exception registry.
- Service pattern means observed interval and work pattern such as 2000 hour, 4000 hour, initial service, large service, or small service.
- Parts table evidence means SCR workbook row, ProductsCatalog row, or approved PartsUsed evidence.
- Historical invoice evidence means customer/business history from Maven document items or BusinessDocument item history after it is imported or otherwise available.
- Manufacturer workbook cost is internal cost evidence only and must not become customer selling price.
- Future internal SKU mapping may replace or extend manufacturer part numbers; manufacturer part numbers remain internal technical evidence.
- Inventory learning must keep manufacturer part number as technical identity and internal SKU as Tal inventory identity.
- One internal SKU may represent one manufacturer part number or an approved equivalent.
- Compatible models and internal SKU mappings must be evidence-backed and approval-aware.

## 4. Equipment Identity Rule

Generic compressor descriptions must not trigger automatic SKU matching.

Generic examples:

- `20 HP compressor`
- `generic 20 HP screw compressor`
- `air compressor`
- `screw compressor`

These must stay separate from specific model records unless additional approved evidence exists.

Additional evidence can include:

- exact model name
- serial number
- customer equipment registry match
- repeated service history match
- manufacturer/model pair
- approved Liad mapping

Horsepower can be used as an attribute for filtering or review, but not as model identity.

## 5. Service Pattern Inputs

The layer may use service pattern evidence from:

- `ReportEquipmentItems.serviceDescription`
- current-hours and next-service text
- replaced-part flags such as air filter, oil filter, oil separator, oil, belts, coupling, and additional parts
- technician recommendations
- same customer/service history
- historical invoice/service item descriptions

Observed service pattern examples:

- 2000 hour service
- 2500 hour service
- 4000 hour service
- 5000 hour service
- 8000 hour service
- initial service
- small service
- large service
- fault repair
- installation

Service pattern evidence can raise or lower confidence, but it cannot override missing model identity.

### Liad-Approved Service Pattern Rules

These are service pattern rules only. They help AI Draft recommend expected service lines, but they do not approve pricing, inventory deduction, BusinessDocument creation, Maven/Invoice4U action, or any write workflow.

#### Large Service Rule

`4000h` / `5000h` service = `Large Service`.

Large Service always includes:

- Air Filter
- Oil Filter
- Oil Separator
- Oil

#### Small Service Rule

`2000h` / `2500h` service = `Small Service`.

Small Service always includes:

- Air Filter
- Oil Filter
- Oil handling

#### Oil Handling Note

For SCR compressors, oil handling is often oil top-up / added oil.

For ALUP or other compressor models, oil handling may be oil replacement.

Do not assume the oil action type automatically without model/service evidence.

Any generated draft must still show source evidence and `NeedsApproval` where required.

## 6. Output Fields

The Parts / SKU Intelligence Layer should output evidence-first candidate rows:

| Field | Meaning |
|---|---|
| `candidateSku` | Suggested SKU or `null` when no safe candidate exists |
| `candidatePartName` | Raw or source part name |
| `draftTitleModel` | Compressor model that must appear in the draft title/header |
| `sourceModel` | Raw source model text used as evidence |
| `matchedEvidenceType` | `EXACT_MODEL`, `APPROVED_ALIAS`, `SERVICE_PATTERN`, `PARTS_TABLE`, `HISTORICAL_INVOICE`, or `NONE` |
| `servicePattern` | Observed interval/type pattern |
| `compatibleModels` | Models listed by the parts source, without merging them |
| `quantityEvidence` | Quantity source and confidence |
| `priceEvidenceStatus` | Link to Pricing Evidence Engine result or `NOT_EVALUATED` |
| `confidence` | `HIGH`, `MEDIUM`, `LOW`, or `NEEDS_APPROVAL` |
| `needsSkuApproval` | Boolean; true unless exact/approved evidence is strong |
| `needsQuantityApproval` | Boolean; true unless quantity is approved |
| `evidenceRows` | Source rows/files used to justify the candidate |
| `manufacturer` | Manufacturer name when known |
| `sourceExcelFile` | Manufacturer workbook file name |
| `sourceExcelSheet` | Workbook sheet used for the match |
| `sourceExcelRow` | Source row number used for the match |
| `manualOverrideReason` | Required when a human override approves or rejects a match |

## 7. Confidence Rules

### `HIGH`

Use only when evidence includes:

- exact model or approved alias
- exact manufacturer SKU from a reviewed manufacturer Excel row or approved internal SKU mapping
- explicit part compatibility for the model and part category
- service pattern compatible with the SKU set
- quantity evidence is approved or directly supported
- no duplicate SKU or source conflict

For a manufacturer Excel match, `HIGH` also requires source file, sheet, and row evidence.

### `MEDIUM`

Use when:

- exact model exists but service pattern or quantity requires review
- approved alias exists but historical usage is limited
- approved alias exists but part compatibility still requires review
- parts table supports compatibility but quantity semantics are not fully approved
- invoice history supports item text but exact SKU is missing

### `LOW`

Use when:

- service pattern exists but model identity is weak
- item description is text-only
- parts table compatibility is indirect
- history exists but customer/model linkage is weak

### `NEEDS_APPROVAL`

Use when:

- generic equipment class only
- horsepower-only identity
- duplicate SKU conflict
- quantity missing or ambiguous
- service interval semantics are not approved
- historical invoice item text cannot prove SKU
- model alias exists but part compatibility is not approved
- manufacturer workbook row has not been parsed/reviewed yet
- only binary-string evidence exists without file/sheet/row extraction

## 7A. Matching Rules For Manufacturer Excel Sources

The matching engine should use these rules after a reviewed manufacturer SKU registry exists:

1. Exact model match: normalize `ServiceReport` equipment model and compare against manufacturer sheet/model values. Example: `SCR-40PM`, `SCR40PM`, and `40PM` may resolve to the same exact manufacturer model only when that normalization is approved.
2. Normalized model match: remove separators/case noise but do not infer nearby models. `40PM` can match `SCR40PM`; `20EPM` cannot match `25EPM`.
3. Part keyword match: map AI suggested item text to a part category. Examples: `Air Filter` -> `AIR_FILTER`; `Oil Filter` -> `OIL_FILTER`; `Oil Separator` -> `OIL_SEPARATOR`; `3L SKR oil top-up` -> `OIL_COOLANT` with quantity/action review.
4. Manufacturer SKU match: select the manufacturer part number from the reviewed row for the exact model and part category.
5. Manual override: allow Liad-approved overrides only with reason, approver, date, and source evidence. Override must not hide original manufacturer evidence.

No confident match behavior:

- Set `needsSkuApproval = true`.
- Keep `candidateSku = null` or mark the candidate as review-only.
- Internal review must show the attempted model, part category, confidence, and missing evidence reason.
- Customer-facing PDF must not show SKU.

Internal review fields:

- matched SKU
- manufacturer
- confidence
- source Excel file
- source sheet
- source row
- compatible models
- needs-review flag
- manual override reason when applicable

Future shared consumer rule:

- AI Draft, BusinessDocument review, inventory, and purchase orders must use the same manufacturer SKU registry and internal SKU mapping layer.
- Purchase orders must not create new SKU identities from free text; they should reference an approved internal SKU or approved manufacturer part/equivalent mapping.

## 8. Inventory Deduction Rule

No inventory deduction is allowed from:

- AI Draft.
- pricing evidence.
- service report alone.
- recommendation alone.
- manufacturer SKU registry evidence alone.
- inventory learning evidence alone.
- foreign purchase order alone without received-stock evidence.

Inventory deduction is allowed only after all of these are true:

- approved BusinessDocument / invoice workflow
- confirmed SKU mapping
- confirmed manufacturer part number or approved equivalent
- approved quantity
- audit evidence
- separate inventory transaction gate

The inventory gate must be separate from AI Draft, Pricing Evidence, and SKU recommendation logic.

## 8A. Inventory Learning Loop Boundary

The inventory learning loop is defined in `project-brain/INVENTORY_LEARNING_LOOP_SPEC.md`.

It may enrich future inventory evidence with:

- manufacturer part number
- internal SKU
- compatible compressor models
- part category
- service type relevance
- quantity in stock
- source/order evidence
- approval status

Learning sources:

1. SCR spare-parts workbooks.
2. Foreign purchase orders.
3. Received stock.
4. Invoice history.
5. Liad corrections.
6. Approved service-kit evidence.

Rules:

- Manufacturer part number is technical identity.
- Internal SKU is Tal inventory identity.
- Quantity in stock can only come from approved stock movement, purchase receipt, or inventory transaction.
- Liad corrections must be stored as approved learning.
- AI Draft may suggest a part/SKU with evidence and approval flags, but cannot deduct stock.

## 9. Forbidden Actions

This spec does not approve:

- DB writes
- imports
- Prisma changes
- schema changes
- inventory deductions
- stock transactions
- AI Draft writes
- BusinessDocument creation
- BusinessDocumentItem creation
- Maven/Invoice4U action
- source-system writes
- automatic SKU matching from generic equipment descriptions
- AI Draft part assignment when the compressor model is missing from the title/header

## 10. Relationship To Pricing Evidence Engine

The Parts / SKU Intelligence Layer answers:

- Which SKU candidates are possible?
- Why are they possible?
- What model/service/parts evidence supports them?
- What quantity evidence exists?

The Pricing Evidence Engine answers:

- What price evidence exists for the candidate item/SKU?
- Is the price customer-specific, catalog-based, historical, vendor-cost, or AI-estimated?
- Does price require approval?

SKU confidence and price confidence are separate. A candidate can have strong SKU evidence and weak price evidence, or weak SKU evidence and strong generic price history.

## 11. Recommended Next Gate

Create a read-only Parts / SKU Intelligence prototype for one service report only after explicit task selection.

The prototype should emit evidence rows and approval flags only. It must stop before writes, imports, inventory deduction, BusinessDocument creation, Maven/Invoice4U action, or Prisma changes.
