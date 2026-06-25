# Manufacturer Parts Registry

Status: Reusable Knowledge Base
Scope: manufacturer spare-parts evidence, model compatibility, source file/sheet/row evidence
Runtime impact: none

This knowledge base replaces permanent use of model-specific manufacturer evidence packets. Case-specific research may still exist temporarily, but reusable manufacturer part facts must be consolidated here.

## Source Rules

- Manufacturer Excel files are the trusted technical SKU/model compatibility source when a reviewed workbook row exists.
- Manufacturer part number is technical identity.
- Internal SKU is Tal inventory identity.
- Manufacturer workbook costs are internal cost evidence only, not customer selling prices.
- Historical Maven/Product/BusinessDocument/PartsUsed records may support usage, pricing, or internal SKU mapping, but must not override manufacturer compatibility without an approved manual override.
- Source evidence must preserve file, sheet, row, raw description, and compatible model list when available.

## Current Source Inventory

| Source file | Status | Evidence use |
|---|---|---|
| `data-sources/vendor-spare-parts/Spare Parts Service List(PM Series) rev3 (1).xls` | Office Open XML workbook stored with `.xls` extension; inspectable | Trusted PM/APM manufacturer part evidence when sheet/row reviewed |
| `data-sources/vendor-spare-parts/Spare Parts Service List(EPM Series) rev2 (1).xls` | Legacy binary `.xls`; partially inspectable by strings only in current environment | Review-only until exact sheet/row extraction is approved |

## PM Series Workbook Structure

Known PM workbook sheets:

- `10PM2`
- `15PM2`
- `20PM2`
- `30PM`
- `40PM`
- `50PM`
- `60PM`
- `75PM`
- `100PM`

Known row/column structure:

- Row 1: title such as `Recommendatory Spare parts of SCR40PM series`.
- Row 2 headers include `Item`, `Model`, `Code`, `spare parts name`, `specification`, `Unit`, interval quantity columns, exchange-time fields, and remark.
- Rows 4+ contain part rows.

## Reviewed PM 40PM Rows

| Manufacturer model | Part category | Manufacturer part number | Source description | Source file | Sheet | Row | Compatible model evidence | Confidence |
|---|---|---|---|---|---|---:|---|---|
| `40PM` | Air filter | `25100043-071` | `air filter core` | PM Series workbook | `40PM` | 6 | `40PM`; shared with `25EPM`, `30EPM`, `30PM` in extracted evidence | HIGH |
| `40PM` | Oil filter | `25200007-005` | `Oil Filter` | PM Series workbook | `40PM` | 7 | `40PM`; shared with small/mid PM/EPM models in extracted evidence | HIGH |
| `40PM` | Oil separator | `25300045-023` | `oil separator` | PM Series workbook | `40PM` | 8 | `40PM`; shared with `25EPM`, `30EPM`, `30PM` in extracted evidence | HIGH |
| `40PM` | Oil/coolant | `80000175-039` | `Coolant` | PM Series workbook | `40PM` | 9 | all extracted PM/EPM models including `40PM` | HIGH for compatibility; quantity/action requires review |

## Shared Compatibility Rules

- One manufacturer part number may fit multiple compressor models.
- Shared manufacturer compatibility is valid evidence, not a duplicate or conflict.
- Model alias does not automatically imply part compatibility.
- Part compatibility must come from manufacturer row evidence or an approved compatibility exception.

Known approved exception from `MANUFACTURER_KNOWLEDGE_BASE.md`:

| Model | Part category | Compatible with | Status |
|---|---|---|---|
| `20APM` | Oil separator | `30PM` oil separator | Liad approved |

Known non-compatibility:

| Model | Part category | Not compatible with | Status |
|---|---|---|---|
| `20APM` | Oil separator | `20PM2` oil separator | Liad approved |

## Evidence Fields For Future Registry Rows

| Field | Meaning |
|---|---|
| `manufacturer` | Manufacturer name when known |
| `manufacturerPartNumber` | Technical part identity |
| `internalSku` | Tal internal SKU when approved; may be blank until mapped |
| `partCategory` | Air filter, oil filter, oil separator, oil/coolant, belt, sensor, valve, cooler, airend part, or other |
| `compatibleModels` | Evidence-backed model list |
| `sourceFile` | Exact workbook/file path |
| `sourceSheet` | Sheet/tab name |
| `sourceRow` | Row number |
| `sourceDescription` | Raw source part description |
| `confidence` | HIGH, MEDIUM, LOW, REVIEW_REQUIRED |
| `needsReview` | True when model, part category, row, internal SKU, quantity, or override is unresolved |
| `manualOverrideReason` | Required for human-approved overrides |

## Forbidden Uses

This knowledge base does not approve:

- DB writes, imports, schema changes, or migrations.
- Inventory quantity updates, reservations, or deductions.
- Maven/Invoice4U calls.
- Customer-facing delivery.
- Customer selling price.
- Automatic SKU assignment from generic equipment text.
- Treating manufacturer part number as internal SKU unless approved.
