# Manufacturer Parts Registry

Status: Reusable Knowledge Base
Scope: manufacturer spare-parts evidence, model compatibility, source file/sheet/row evidence
Runtime impact: none

Latest import MVP: `data-sources/vendor-spare-parts/generated/manufacturer-parts-registry.sample.json`

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

## Import MVP Fixture

Generated fixture files:

- `data-sources/vendor-spare-parts/generated/manufacturer-parts-registry.sample.json`
- `data-sources/vendor-spare-parts/generated/service-kit-intelligence.sample.json`
- `data-sources/vendor-spare-parts/generated/shared-sku-overlap.sample.json`
- `data-sources/vendor-spare-parts/generated/manufacturer-registry-import-summary.sample.json`

Current fixture status:

| Source | Parse status | Evidence captured |
|---|---|---|
| PM Series rev3 | Full current-environment parse from OOXML workbook contents | 9 sheets/models, 250 registry rows, source file/sheet/row, manufacturer SKU, part name, unit, interval quantities, exchange times, remarks, extra columns |
| EPM Series rev2 | Partial only | Binary strings confirm EPM model and common part-name evidence, but exact rows/sheets require approved parser or conversion tooling |

PM models captured in the fixture:

| Model | Registry row count |
|---|---:|
| `10PM2` | 26 |
| `15PM2` | 19 |
| `20PM2` | 21 |
| `30PM` | 30 |
| `40PM` | 30 |
| `50PM` | 32 |
| `60PM` | 30 |
| `75PM` | 31 |
| `100PM` | 31 |

Fixture field structure:

| Field | Meaning |
|---|---|
| `manufacturer` | Manufacturer name; current PM fixture uses `SCR COMP` |
| `series` | Source series, such as `PM` |
| `model` / `normalizedModel` | Sheet model and normalized lookup key |
| `partCategory` | Derived internal category such as `AIR_FILTER`, `OIL_FILTER`, `OIL_SEPARATOR`, `OIL_COOLANT`, `VALVE`, `SENSOR`, `AIREND`, or `OTHER` |
| `manufacturerSku` | Manufacturer part number; internal technical evidence only |
| `manufacturerPartName` | Raw manufacturer part name |
| `hebrewDescription` | Blank for current PM source; not inferred |
| `englishDescription` | Same source description normalized for English display/search |
| `unit` | Source unit |
| `serviceIntervals` | Interval quantity evidence from 2000H through 30000H when present |
| `exchangeTimes` | First/second exchange time fields when present |
| `remarks` | Source remarks |
| `extraColumns` | Used columns without trusted headers, preserved for review |
| `sourceFile`, `sourceSheet`, `sourceRow` | Audit/source evidence |
| `active`, `reviewStatus` | Runtime/filtering and review state |

Import plan:

1. Use generated JSON/TS fixture as the safe no-DB-write import MVP.
2. Keep runtime reads on the generated registry fixture, not directly on Excel workbooks.
3. Promote to database tables only after a separately approved schema/import task.
4. Preserve manufacturer SKU as internal-only evidence and map to Tal/internal sales SKU separately.
5. Treat manufacturer quotation/cost fields as internal cost evidence only, never customer selling price.
6. Keep EPM out of trusted row-level matching until exact sheet/row extraction is available.

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

## MVP Example Rows

| Model | Part category | Manufacturer SKU | Source row | Interval evidence | Review status |
|---|---|---|---:|---|---|
| `10PM2` | `AIR_FILTER` | `25100020-001` | 6 | 2000H through 30000H | `REVIEWED_SAMPLE_CATEGORY` |
| `10PM2` | `OIL_FILTER` | `25200007-005` | 7 | 2000H through 30000H | `REVIEWED_SAMPLE_CATEGORY` |
| `10PM2` | `OIL_SEPARATOR` | `25350020-021` | 8 | 4000H through 30000H | `REVIEWED_SAMPLE_CATEGORY` |
| `40PM` | `AIR_FILTER` | `25100043-071` | 6 | 2000H through 30000H | `REVIEWED_SAMPLE_CATEGORY` |
| `40PM` | `OIL_FILTER` | `25200007-005` | 7 | 2000H through 30000H | `REVIEWED_SAMPLE_CATEGORY` |
| `40PM` | `OIL_SEPARATOR` | `25300045-023` | 8 | 4000H through 30000H | `REVIEWED_SAMPLE_CATEGORY` |
| `100PM` | `AIR_FILTER` | `25100015-002P1` | 6 | 2000H through 30000H | `REVIEWED_SAMPLE_CATEGORY` |
| `100PM` | `OIL_FILTER` | `25200018-005` | 7 | 2000H through 30000H | `REVIEWED_SAMPLE_CATEGORY` |
| `100PM` | `OIL_SEPARATOR` | `25300160-121` | 8 | 4000H through 30000H | `REVIEWED_SAMPLE_CATEGORY` |

## Unknowns / Needs Review

- EPM workbook exact sheet/row extraction requires an approved parser/conversion path.
- PM sheets `50PM`, `60PM`, `75PM`, and `100PM` contain used extra columns 20-27 without visible trusted headers; values are preserved under `extraColumns`.
- Hebrew descriptions are not present in the manufacturer PM source and were not inferred.
- Oil/coolant rows prove manufacturer compatibility, but service action and exact oil quantity still require service-rule review.
- Tal sales SKU mapping remains separate and is not inferred from manufacturer SKU.

## EPM/APM Legacy `.xls` Parser Strategy

Current tooling evidence:

| Option | Current availability | Assessment |
|---|---|---|
| LibreOffice conversion to `.xlsx` | Not installed in current environment | Recommended after explicit approval; converts legacy binary `.xls` to OOXML `.xlsx` and lets the existing XML extractor preserve workbook sheets and source row numbers |
| Node parser package | Not installed; package install requires explicit approval per package | Possible fallback, but adds repo/tooling dependency risk and should be package-reviewed before approval |
| Python/openpyxl | Not suitable for legacy `.xls`; current `python` is only the Windows Store shim in this environment | Not recommended for `.xls`; `openpyxl` reads `.xlsx`, not binary `.xls` |
| Manual Excel export | Available only if a human opens and saves/export the workbook | Safe fallback when tool install is not approved; must record operator, date, source file hash, and row-preservation checks |

Recommended path:

1. Stop before installing anything.
2. Request explicit approval for a local LibreOffice conversion tool if exact EPM/APM extraction is selected.
3. Convert `data-sources/vendor-spare-parts/Spare Parts Service List(EPM Series) rev2 (1).xls` to a generated `.xlsx` artifact under an ignored/generated source-processing area.
4. Parse the converted `.xlsx` with the same read-only OOXML extraction approach used for PM.
5. Produce generated JSON fixtures only; do not import into the database without separate approval.

Validation checks after conversion:

| Check | Required evidence |
|---|---|
| Workbook integrity | Sheet names, used range counts, and row counts match the known EPM discovery baseline where available |
| Exact source sheet | `20APM` must have an exact sheet or approved source row; if no exact sheet exists, remain blocked and do not infer |
| Oil separator SKU | Extract exact `20APM` oil separator SKU with source file, sheet, row, raw description, and model evidence |
| Compare to `20PM2` | Compare extracted `20APM` oil separator against PM fixture `20PM2` oil separator `25350030-021`, sheet `20PM2`, row 8 |
| Conflict behavior | If `20APM` extraction conflicts with PM/APM alias normalization, mark needs-review and preserve the explicit exception rule |
| Shared SKU handling | Confirm shared overlap does not create shared service-kit membership |

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
