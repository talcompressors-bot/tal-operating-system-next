# PM/EPM SPARE PARTS SOURCE OF TRUTH REPORT

Status: Proposed source-of-truth analysis
Mission: PM_EPM_SPARE_PARTS_SOURCE_OF_TRUTH_ANALYSIS
Date: 2026-06-17
Mode: Read-only analysis; documentation output only
Production impact: None

## Runtime Boundary

This report analyzes two local vendor spare-parts Excel files as candidate source-of-truth inputs for AI Draft, EquipmentRegistry, AliasRegistry, ServiceKitRegistry, ProductsCatalog, and future PricingRegistry. It does not write Google Sheets data, modify AppSheet, modify Apps Script, call Maven, deploy, create bots, or commit.

Source files verified in `data-sources/vendor-spare-parts/`:

- `Spare Parts Service List(PM Series) rev3 (1).xls`
- `Spare Parts Service List(EPM Series) rev2 (1).xls`

Extraction notes:

- PM file has a ZIP/OpenXML signature despite the `.xls` extension; it was read as an OpenXML workbook through a temporary read-only `.xlsx` copy.
- EPM file is a legacy OLE Excel workbook and was read through the installed ACE OLE DB provider in read-only mode.
- Only the business columns `Item`, `Model`, `Code`, `spare parts name`, `specification`, `Unit`, `Rated qty for each`, `Quotation (US$) Per Each`, service-hour quantities, exchange-time text, and `Remark` were extracted.

## Executive Summary

- Total spare-part rows extracted: `569`.
- Unique compressor models: `19`.
- PM models: `100PM, 10PM2, 15PM2, 20PM2, 30PM, 40PM, 50PM, 60PM, 75PM`.
- EPM models: `100EPM, 125EPM, 150EPM, 25EPM, 30EPM, 40EPM, 50EPM, 60EPM, 75EPM, 90EPM`.
- Unique spare part numbers: `213`.
- Rows with purchase price present: `569` of `569`.
- Rows with at least one service interval quantity: `569` of `569`.
- The files are strong source-of-truth candidates for service-kit line items, model-to-kit compatibility, vendor purchase prices, and model aliases.
- They are not ready for direct automatic approval because PM/APM naming, PM2 naming, EPM sheet/title mismatch, duplicate rows, currency handling, and selling-price markup rules require human review.

## Important Business Rule: PM = APM

PM and APM must be treated as equivalent for compressor spare-parts lookup. If `ServiceReports` or `ReportEquipmentItems` contains an APM model, AI Draft should normalize it to the PM spare-parts family before looking up service kits.

Required lookup behavior:

```text
SCR20APM -> SCR20PM -> 20PM spare-parts rules
SCR50APM -> SCR50PM -> 50PM spare-parts rules
```

Implementation-safe normalization rule:

```text
Normalize raw model by uppercasing, trimming, removing spaces/hyphens, and preserving numeric model size.
If normalized model matches ^SCR([0-9]+)APM$, map to SCR{size}PM and {size}PM candidate aliases.
If normalized model matches ^([0-9]+)APM$, map to {size}PM candidate alias.
Then resolve to an approved PM EquipmentRegistry row or ServiceKitRegistry row.
```

Important PM2 caveat: the PM workbook uses `10PM2`, `15PM2`, and `20PM2`, not plain `10PM`, `15PM`, and `20PM`. Therefore `SCR20APM -> SCR20PM / 20PM` is the business alias rule, but `20PM2` must be added as a review-required vendor-source alias before automatic matching can use it.

## Compressor Models

| Series | Model | Source sheet | Spare-part rows | Unique part numbers | EquipmentRegistry candidate | Notes |
|---|---|---|---:|---:|---|---|
| EPM | `100EPM` | `100EPM` | 39 | 39 | `EQ-SCR100EPM` | Use for EPM lookup after approval. |
| EPM | `125EPM` | `125EPM` | 39 | 39 | `EQ-SCR125EPM` | Use for EPM lookup after approval. |
| EPM | `150EPM` | `150EPM` | 40 | 39 | `EQ-SCR150EPM` | Use for EPM lookup after approval. |
| EPM | `25EPM` | `25EPM` | 26 | 26 | `EQ-SCR25EPM` | Use for EPM lookup after approval. |
| EPM | `30EPM` | `30EPM` | 26 | 26 | `EQ-SCR30EPM` | Use for EPM lookup after approval. |
| EPM | `40EPM` | `40EPM` | 27 | 27 | `EQ-SCR40EPM` | Use for EPM lookup after approval. |
| EPM | `50EPM` | `50EPM` | 27 | 27 | `EQ-SCR50EPM` | Use for EPM lookup after approval. |
| EPM | `60EPM` | `60EPM` | 27 | 27 | `EQ-SCR60EPM` | Use for EPM lookup after approval. |
| EPM | `75EPM` | `75EPM` | 33 | 33 | `EQ-SCR75EPM` | Use for EPM lookup after approval. |
| EPM | `90EPM` | `90EPM` | 35 | 35 | `EQ-SCR90EPM` | Use for EPM lookup after approval. |
| PM | `100PM` | `100PM` | 31 | 31 | `EQ-SCR100PM` | Use for PM and APM lookup after approval. |
| PM | `10PM2` | `10PM2, 15PM2, 20PM2` | 26 | 24 | `EQ-SCR10PM` | Vendor model uses PM2; link plain PM/APM aliases after review. |
| PM | `15PM2` | `15PM2` | 19 | 19 | `EQ-SCR15PM` | Vendor model uses PM2; link plain PM/APM aliases after review. |
| PM | `20PM2` | `20PM2` | 21 | 21 | `EQ-SCR20PM` | Vendor model uses PM2; link plain PM/APM aliases after review. |
| PM | `30PM` | `30PM` | 30 | 30 | `EQ-SCR30PM` | Use for PM and APM lookup after approval. |
| PM | `40PM` | `40PM` | 30 | 30 | `EQ-SCR40PM` | Use for PM and APM lookup after approval. |
| PM | `50PM` | `50PM, 60PM` | 32 | 31 | `EQ-SCR50PM` | Use for PM and APM lookup after approval. |
| PM | `60PM` | `60PM` | 30 | 30 | `EQ-SCR60PM` | Use for PM and APM lookup after approval. |
| PM | `75PM` | `75PM` | 31 | 31 | `EQ-SCR75PM` | Use for PM and APM lookup after approval. |

## Service Intervals

The vendor files use service-hour quantity columns: `2000H`, `4000H`, `8000H`, `12000H`, `16000H`, `20000H`, `24000H`, and `30000H`. Quantities are cumulative or interval-specific according to the vendor table structure and must be verified before using them as invoice line quantities.

| Interval | Rows with nonzero quantity | Candidate use |
|---|---:|---|
| `2000H` | 42 | ServiceKitRegistry line quantity candidate |
| `4000H` | 80 | ServiceKitRegistry line quantity candidate |
| `8000H` | 147 | ServiceKitRegistry line quantity candidate |
| `12000H` | 147 | ServiceKitRegistry line quantity candidate |
| `16000H` | 262 | ServiceKitRegistry line quantity candidate |
| `20000H` | 379 | ServiceKitRegistry line quantity candidate |
| `24000H` | 379 | ServiceKitRegistry line quantity candidate |
| `30000H` | 569 | ServiceKitRegistry line quantity candidate |

### Model / Interval Candidate Matrix

| Model | 2000H | 4000H | 8000H | 12000H | 16000H | 20000H | 24000H | 30000H |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| `100EPM` | 3 | 5 | 10 | 10 | 18 | 21 | 21 | 39 |
| `100PM` | 2 | 4 | 7 | 7 | 14 | 23 | 23 | 31 |
| `10PM2` | 2 | 4 | 7 | 7 | 14 | 20 | 20 | 26 |
| `125EPM` | 3 | 5 | 10 | 10 | 18 | 21 | 21 | 39 |
| `150EPM` | 4 | 6 | 11 | 11 | 19 | 22 | 22 | 40 |
| `15PM2` | 2 | 4 | 7 | 7 | 11 | 15 | 15 | 19 |
| `20PM2` | 2 | 4 | 7 | 7 | 11 | 16 | 16 | 21 |
| `25EPM` | 2 | 4 | 7 | 7 | 11 | 18 | 18 | 26 |
| `30EPM` | 2 | 4 | 7 | 7 | 11 | 18 | 18 | 26 |
| `30PM` | 2 | 4 | 7 | 7 | 14 | 22 | 22 | 30 |
| `40EPM` | 2 | 4 | 7 | 7 | 11 | 19 | 19 | 27 |
| `40PM` | 2 | 4 | 7 | 7 | 14 | 22 | 22 | 30 |
| `50EPM` | 2 | 4 | 7 | 7 | 11 | 19 | 19 | 27 |
| `50PM` | 2 | 4 | 7 | 7 | 15 | 24 | 24 | 32 |
| `60EPM` | 2 | 4 | 8 | 8 | 12 | 19 | 19 | 27 |
| `60PM` | 2 | 4 | 7 | 7 | 13 | 22 | 22 | 30 |
| `75EPM` | 2 | 4 | 8 | 8 | 15 | 17 | 17 | 33 |
| `75PM` | 2 | 4 | 7 | 7 | 14 | 23 | 23 | 31 |
| `90EPM` | 2 | 4 | 9 | 9 | 16 | 18 | 18 | 35 |

## Registry Candidate Mapping

### EquipmentRegistry Candidates

- Candidate count: `19` model-level compressor rows.
- Equipment family: `COMPRESSOR`.
- Equipment type: `SCREW_COMPRESSOR` unless a human owner chooses a more precise approved enum.
- Canonical model should preserve the vendor model and optionally add `SCR` as the display prefix, for example `SCR50PM` / `50PM`.
- Manufacturer is not explicitly reliable from the extracted columns and should be `UNKNOWN` until vendor/manufacturer ownership is approved.
- PM2 models must remain review-gated because customer-facing examples use `20PM`, while the vendor file uses `20PM2`.

### AliasRegistry Candidates

Candidate aliases should be generated disabled and review-only first. Recommended alias patterns:

| Source pattern | Canonical target | Rule |
|---|---|---|
| `SCR100APM`, `100APM`, `SCR100PM`, `100PM` | `100PM` | PM = APM; vendor target `100PM` requires approval. |
| `SCR10APM`, `10APM`, `SCR10PM`, `10PM` | `10PM` | PM = APM; vendor target `10PM2` requires approval. |
| `SCR15APM`, `15APM`, `SCR15PM`, `15PM` | `15PM` | PM = APM; vendor target `15PM2` requires approval. |
| `SCR20APM`, `20APM`, `SCR20PM`, `20PM` | `20PM` | PM = APM; vendor target `20PM2` requires approval. |
| `SCR30APM`, `30APM`, `SCR30PM`, `30PM` | `30PM` | PM = APM; vendor target `30PM` requires approval. |
| `SCR40APM`, `40APM`, `SCR40PM`, `40PM` | `40PM` | PM = APM; vendor target `40PM` requires approval. |
| `SCR50APM`, `50APM`, `SCR50PM`, `50PM` | `50PM` | PM = APM; vendor target `50PM` requires approval. |
| `SCR60APM`, `60APM`, `SCR60PM`, `60PM` | `60PM` | PM = APM; vendor target `60PM` requires approval. |
| `SCR75APM`, `75APM`, `SCR75PM`, `75PM` | `75PM` | PM = APM; vendor target `75PM` requires approval. |
| `SCR100EPM`, `100EPM` | `100EPM` | EPM exact-family alias. |
| `SCR125EPM`, `125EPM` | `125EPM` | EPM exact-family alias. |
| `SCR150EPM`, `150EPM` | `150EPM` | EPM exact-family alias. |
| `SCR25EPM`, `25EPM` | `25EPM` | EPM exact-family alias. |
| `SCR30EPM`, `30EPM` | `30EPM` | EPM exact-family alias. |
| `SCR40EPM`, `40EPM` | `40EPM` | EPM exact-family alias. |
| `SCR50EPM`, `50EPM` | `50EPM` | EPM exact-family alias. |
| `SCR60EPM`, `60EPM` | `60EPM` | EPM exact-family alias. |
| `SCR75EPM`, `75EPM` | `75EPM` | EPM exact-family alias. |
| `SCR90EPM`, `90EPM` | `90EPM` | EPM exact-family alias. |

### ServiceKitRegistry Candidates

- Candidate grain: one service kit per approved `Model + ServiceIntervalHours` combination, with child kit lines from the vendor part rows that have nonzero quantity for that interval.
- Candidate count: `152` model/interval combinations have at least one nonzero part quantity.
- Kit line fields should include model, interval, part code, part description, unit, vendor purchase price, quantity, first exchange text, second exchange text, and remark.
- First rollout should import only disabled `NEEDS_REVIEW` candidates and should avoid using 30000H kits automatically because every row has a 30000H quantity and that may represent a cumulative overhaul list rather than a normal recurring service.

### ProductsCatalog Candidates

- Candidate part catalog entries: `213` unique part numbers.
- `Code` can map to `SKU` or supplier part number after ownership approval.
- `PartName` can map to `ProductName`.
- `Specification`, `Unit`, and `Remark` can enrich product description/notes.
- `CompatibleEquipment` can be derived from the model list that uses each part code.
- Do not overwrite existing `ProductsCatalog` prices; import as candidate reconciliation only until catalog ownership approves source priority.

### PricingRegistry Candidates

- Vendor `Quotation (US$) Per Each` is purchase-price evidence, not a customer selling price.
- All extracted rows have purchase price values.
- Future PricingRegistry can store source price, currency `USD`, source file, source model, and effective date from file revision/date metadata.
- AI Draft must not use these values as final customer prices until markup, currency conversion, VAT, and selling-price policy are approved.

## Risks

- PM/APM equivalence is a business rule and not explicit in the vendor PM workbook; it must be represented as governed AliasRegistry rows.
- PM workbook uses `10PM2`, `15PM2`, and `20PM2`; automatic matching from `SCR20APM` to `20PM2` requires human approval.
- PM workbook has several rows where the row-level `Model` value does not match the sheet name: `15PM2` sheet contains `10PM2` rows, `20PM2` sheet contains a `10PM2` row, and `60PM` sheet contains a `50PM` row. Treat row-level model as evidence but require owner review before import.
- EPM workbook sheet `125EPM` has a title row that appears to say `SCR150EPM` while rows use `125EPM`; use row model as extracted but flag for review.
- Duplicate model-code rows exist and should not become duplicate active service-kit lines without review.
- 30000H quantities are populated for every row and may describe a major overhaul or cumulative list; avoid automatic normal-service use until validated.
- Purchase prices are USD supplier prices; they are not selling prices in NIS.
- Existing `ProductsCatalog` may already contain overlapping products and prices; reconciliation should be review-only.
- Service interval quantities may be cumulative rather than incremental by interval; ServiceKitRegistry needs an explicit quantity interpretation rule.

## Unknowns

- Vendor/manufacturer identity and whether `SCR` should be stored as part of the canonical model or only as an alias.
- Whether PM2 means a distinct generation from PM or only the vendor workbook naming convention.
- Whether the service-hour quantity columns are cumulative lifecycle quantities or per-service recommended quantities.
- Effective date and validity period for purchase prices.
- Currency conversion, markup, VAT, and approved selling-price policy.
- Whether existing AppSheet model/service labels match vendor model notation.
- Whether EPM title-row mismatch is a workbook typo or a source-data problem.

## Recommended Import Strategy

Phase 1 - Read-only candidate review:

- Keep this report as evidence.
- Generate candidate CSV/preview only; do not import registry data yet.
- Human owner confirms PM/APM alias rule, PM2 mapping, and EPM title mismatch handling.

Phase 2 - EquipmentRegistry candidate import after explicit approval:

- Import 19 model candidates as `NEEDS_REVIEW`, `Enabled=FALSE`, `VersionStatus=DRAFT`.
- Use `EvidenceSource=PM/EPM vendor spare-parts files` and cite source filename/sheet.
- Keep manufacturer and unresolved technical attributes as `UNKNOWN`.

Phase 3 - AliasRegistry candidate import after explicit approval:

- Import PM/APM and SCR/non-SCR aliases as disabled review rows.
- For PM2 models, include `10PM`, `15PM`, and `20PM` aliases only as review-required mappings to `10PM2`, `15PM2`, and `20PM2`.
- Approve aliases only after matching against real `ServiceReports` / `ReportEquipmentItems` values.

Phase 4 - ProductsCatalog and PricingRegistry candidate reconciliation:

- Match vendor part codes to existing `ProductsCatalog.SKU` and `ProductID` read-only first.
- Treat vendor USD quotation as purchase-price evidence only.
- Do not change selling prices until pricing policy is approved.

Phase 5 - ServiceKitRegistry candidate import after explicit approval:

- Build one review-only service kit per approved model and service interval.
- Include line items only where interval quantity is nonzero.
- Block automatic use of 30000H kits until the owner confirms interpretation.
- AI Draft may use only approved active service kits and must keep price approval when pricing is unresolved.

## Duplicate / Conflict Findings

| Finding | Detail | Required action |
|---|---|---|
| Duplicate model-code row | `EPM 150EPM 22150023-011P2` appears 2 times; names: `Safety Filter Core; safety filter core` | Review before ServiceKitRegistry import. |
| Duplicate model-code row | `PM 10PM2 50728016-002` appears 3 times; names: `Pressure Gauge` | Review before ServiceKitRegistry import. |
| Duplicate model-code row | `PM 50PM 45018010-050` appears 2 times; names: `Transformer` | Review before ServiceKitRegistry import. |
| Row model / sheet mismatch | PM sheet `15PM2` contains 3 rows with model `10PM2`; sheet `20PM2` contains 1 row with model `10PM2`; sheet `60PM` contains 1 row with model `50PM`. | Review source workbook before import; do not infer compatibility from sheet alone. |
| Workbook title mismatch | EPM sheet `125EPM` title row appeared to reference `SCR150EPM`, while extracted row model is `125EPM`. | Trust row model only after owner review. |

## Full Unique Spare Part Number Appendix

| Part number | Descriptions | Price range USD | Series | Models |
|---|---|---:|---|---|
| `00060002-002` | Airend 8BAR | 356.28 | PM | `10PM2` |
| `00075001-009` | Airend 8BAR | 502.83 | PM | `15PM2, 20PM2` |
| `00080002-003` | Airend 8BAR | 858.30 | PM | `30PM, 40PM` |
| `00080003-412` | Shaft Seal of Airend | 64.58 | PM | `30PM, 40PM` |
| `00090002-013` | Airend 8BAR | 2,329.91 | PM | `100PM` |
| `00090002-016` | Airend 8BAR | 2,329.91 | EPM | `60EPM` |
| `00105001-004` | Airend 8BAR | 1,123.89 | PM | `50PM` |
| `00105001-006` | Airend 8BAR | 1,123.89 | EPM | `25EPM, 30EPM` |
| `00105001-412` | Shaft Seal of Airend | 70.08-77.87 | PM | `50PM, 60PM` |
| `00118001-005` | Airend 8BAR | 1,381.38 | PM | `60PM` |
| `00128001-009` | Airend 8BAR | 2,059.92 | PM | `75PM` |
| `00128001-014` | Airend 8BAR | 2,059.92 | EPM | `40EPM, 50EPM` |
| `00128001A412` | Shaft Seal of Airend | 93.07-104.70 | PM | `100PM, 75PM` |
| `00160001-018` | Airend 8BAR | 6,032.39 | EPM | `90EPM` |
| `00160001-018P1` | Bearing of Airend 8BAR | 1,494.00 | EPM | `90EPM` |
| `00160001-018P2` | Shaft Seal of Airend 8BAR | 206.60 | EPM | `90EPM` |
| `00160001-020` | Airend 8BAR | 3,974.09 | EPM | `75EPM` |
| `00160001-020P1` | Bearing of Airend 8BAR | 1,195.60 | EPM | `75EPM` |
| `00160001-421` | Shaft Seal of Airend 8BAR | 198.50 | EPM | `75EPM` |
| `00270002-001` | Airend 8BAR | 6,801.62 | EPM | `100EPM` |
| `00270002-419` | Bearing of Airend 8BAR | 1,997.20 | EPM | `100EPM` |
| `00270002-421` | Shaft Seal of Airend 8BAR | 226.56 | EPM | `100EPM` |
| `00280002-002` | Airend 8BAR | 6,801.62 | EPM | `125EPM, 150EPM` |
| `00280002-412` | Shaft Seal of Airend 8BAR | 257.49 | EPM | `125EPM, 150EPM` |
| `00280002-413` | Bearing of Airend 8BAR | 1,997.20 | EPM | `125EPM, 150EPM` |
| `00750001-412` | Shaft Seal of Airend | 42.74 | PM | `10PM2` |
| `00750001-419` | Bearing of Airend | 91.58 | PM | `10PM2` |
| `00750003A412` | Shaft Seal of Airend | 49.15 | PM | `15PM2, 20PM2` |
| `01500001-419` | Bearing of Airend | 129.43 | PM | `15PM2, 20PM2` |
| `02450001-419` | Bearing of Airend | 189.93 | PM | `30PM, 40PM` |
| `04150001-419` | Bearing of Airend | 267.81 | EPM, PM | `25EPM, 30EPM, 50PM` |
| `04150001-421` | Shaft Seal of Airend | 77.87 | EPM | `25EPM, 30EPM` |
| `05000001-419` | Bearing of Airend | 292.50 | PM | `60PM` |
| `06000001-419` | Bearing of Airend | 409.88 | EPM, PM | `40EPM, 50EPM, 75PM` |
| `06000001-421` | Shaft Seal of Airend | 93.07 | EPM | `40EPM, 50EPM` |
| `08000001-419` | Bearing of Airend | 526.98 | EPM, PM | `100PM, 60EPM` |
| `08000001-421` | Shaft Seal of Airend | 104.70 | EPM | `60EPM` |
| `10101245-001` | PM Motor(380V/50HZ/3P) | 2,099.15 | PM | `60PM` |
| `10101245-004` | PM Motor(380V/50HZ/3P) | 2,099.15 | EPM | `60EPM` |
| `10101255-001` | PM Motor(380V/50HZ/3P) | 2,222.22 | PM | `75PM` |
| `10101275-001` | PM Motor(380V/50HZ/3P) | 2,564.10 | PM | `100PM` |
| `10108008-009` | PM Motor (380V/50HZ/3P) | 432.48 | PM | `10PM2` |
| `10108011-009` | PM Motor (380V/50HZ/3P) | 477.60 | PM | `10PM2` |
| `10108015-007` | PM Motor (380V/50HZ/3P) | 622.22 | PM | `20PM2` |
| `10108018-003` | PM Motor(380V/50HZ/3P) | 1,105.13 | EPM | `25EPM` |
| `10108022-005` | PM Motor(380V/50HZ/3P) | 1,160.68 | EPM | `30EPM` |
| `10108090B231` | PM Main Motor | 5,111.11 | EPM | `125EPM` |
| `10108110B231` | PM Main Motor | 5,307.69 | EPM | `150EPM` |
| `10112022-001` | PM Motor (380V/50HZ/3P) | 1,061.54 | PM | `30PM` |
| `10112030-001` | PM Motor(380V/50HZ/3P) | 1,254.70 | PM | `40PM` |
| `10112030-005` | PM Motor(380V/50HZ/3P) | 1,541.88 | EPM | `40EPM` |
| `10112037-001` | PM Motor(380V/50HZ/3P) | 1,358.97 | PM | `50PM` |
| `10112037-010` | PM Motor(380V/50HZ/3P) | 2,034.19 | EPM | `50EPM` |
| `10112055C231` | PM Main Motor | 3,883.76 | EPM | `75EPM` |
| `10112063A231` | PM Main Motor | 3,883.76 | EPM | `90EPM` |
| `10112075-635` | PM Main Motor | 4,141.81 | EPM | `100EPM` |
| `15030008-407` | Cooler | 90.69 | PM | `10PM2` |
| `15030011-410` | Cooler | 90.69 | PM | `15PM2` |
| `15030015-409` | Cooler | 143.32 | PM | `20PM2` |
| `15030020-103` | After Cooler | 330.36 | EPM | `100EPM, 125EPM, 150EPM` |
| `15030022-304` | After  Cooler & Oil Cooler | 263.97 | EPM, PM | `25EPM, 30EPM, 30PM` |
| `15030030-304` | After  Cooler & Oil Cooler | 302.83 | PM | `40PM` |
| `15030030-306` | After  Cooler & Oil Cooler | 638.06 | EPM | `40EPM` |
| `15030037-305` | After  Cooler & Oil Cooler | 466.40 | PM | `50PM` |
| `15030045-307` | After  Cooler & Oil Cooler | 550.61 | EPM, PM | `50EPM, 60PM` |
| `15030045-309` | After  Cooler & Oil Cooler | 528.74 | EPM | `60EPM` |
| `15030055-405` | Oil Cooler & After Cooler | 806.48 | EPM | `75EPM` |
| `15030055-411` | After  Cooler & Oil Cooler | 846.96 | PM | `75PM` |
| `15030075-408` | Oil Cooler & After Cooler | 944.13 | EPM | `90EPM` |
| `15030075-411` | After  Cooler & Oil Cooler | 997.57 | PM | `100PM` |
| `15030095-303` | Oil Cooler | 911.74 | EPM | `100EPM, 125EPM, 150EPM` |
| `22150023-011P1` | air filter core | 34.18 | EPM | `100EPM, 125EPM, 150EPM` |
| `22150023-011P2` | Safety Filter Core; safety filter core | 8.55 | EPM | `100EPM, 125EPM, 150EPM` |
| `25100015-002P1` | air filter core | 21.97-21.98 | EPM, PM | `100PM, 60EPM, 75EPM, 75PM, 90EPM` |
| `25100020-001` | air filter core | 5.13 | PM | `10PM2, 15PM2, 20PM2` |
| `25100043-071` | air filter core | 8.55 | EPM, PM | `25EPM, 30EPM, 30PM, 40PM` |
| `25100075-071` | air filter core | 17.09 | EPM, PM | `40EPM, 50EPM, 50PM, 60PM` |
| `25200007-005` | Oil Filter | 7.69 | EPM, PM | `10PM2, 15PM2, 20PM2, 25EPM, 30EPM, 30PM, 40PM, 50PM` |
| `25200018-005` | Oil Filter | 37.50 | EPM, PM | `100EPM, 100PM, 125EPM, 150EPM, 40EPM, 50EPM, 60EPM, 60PM, 75EPM, 75PM, 90EPM` |
| `25300045-023` | oil separator | 25.00 | EPM, PM | `25EPM, 30EPM, 30PM, 40PM` |
| `25300065-031` | oil separator | 36.54 | EPM, PM | `40EPM, 50EPM, 50PM, 60PM` |
| `25300065-036` | oil separator | 73.08 | EPM | `60EPM` |
| `25300160-121` | oil separator | 119.12 | EPM, PM | `100PM, 75EPM, 75PM, 90EPM` |
| `25300220-022` | oil separator | 155.77 | EPM | `100EPM, 125EPM, 150EPM` |
| `25350020-021` | oil separator | 27.88 | PM | `10PM2` |
| `25350030-021` | oil separator | 34.63 | PM | `15PM2, 20PM2` |
| `25750020-051` | Water Cup | 41.88 | EPM | `100EPM, 125EPM, 150EPM` |
| `26005003-000` | Vibration Reductor | 17.30 | EPM | `100EPM` |
| `26005004-000` | Vibration Reductor | 18.27 | EPM | `150EPM` |
| `26005010-003` | Vibration Reductor | 8.65 | EPM | `75EPM, 90EPM` |
| `26015001-000` | Oil Level Sightglass | 11.69 | EPM | `100EPM, 125EPM, 150EPM, 75EPM, 90EPM` |
| `26015001-010` | Oil Level Sightglass | 9.23 | EPM, PM | `100PM, 25EPM, 30EPM, 30PM, 40EPM, 40PM, 50EPM, 50PM, 60EPM, 60PM, 75PM` |
| `35350065-002` | Oil Level Sightglass | 3.38 | PM | `10PM2, 15PM2, 20PM2` |
| `37150001-004` | Vibration Reductor | 16.35 | EPM | `125EPM` |
| `40159023-301` | Airend oil inlet pipe | 32.31 | EPM | `90EPM` |
| `40159023-303` | Airend oil inlet pipe | 29.15 | EPM | `75EPM` |
| `40159032-306` | Discharge pipe for airend | 68.02 | PM | `30PM, 40PM` |
| `40159032-307` | Discharge pipe for airend | 68.02 | EPM | `25EPM, 30EPM` |
| `40159032-367` | Airend oil inlet pipe | 78.46-180.00 | EPM | `100EPM, 125EPM, 150EPM` |
| `40159048-339` | Discharge pipe for airend | 77.87 | PM | `50PM` |
| `40159048-341` | Pipe from tank to after cooler | 39.68 | PM | `50PM` |
| `40159048-342` | Discharge pipe for airend | 83.08 | PM | `60PM` |
| `40159048-343` | Pipe from tank to after cooler | 36.15 | EPM, PM | `40EPM, 50EPM, 60PM` |
| `40159048-349` | Discharge pipe for airend | 109.31 | EPM | `40EPM, 50EPM` |
| `40159048-350` | Discharge pipe for airend | 80.97 | EPM | `60EPM` |
| `40159048-351` | Pipe from tank to after cooler | 36.15 | EPM | `60EPM` |
| `40159050-417` | Discharge pipe for airend | 131.17 | PM | `100PM` |
| `40159050-418` | Pipe from tank to after cooler | 48.58 | PM | `100PM, 75PM` |
| `40159050-420` | Discharge pipe for airend | 123.08 | PM | `75PM` |
| `40159065-413` | Oil tank inlet pipe | 68.02 | EPM | `75EPM, 90EPM` |
| `40159100-641` | Airend discharge pipe | 137.65 | EPM | `75EPM, 90EPM` |
| `40249060-009` | Air Inlet Pipe | 17.95 | PM | `30PM, 40PM` |
| `40249060-014` | Air Inlet Pipe | 20.51 | EPM | `25EPM, 30EPM` |
| `40249080-067` | Air Inlet Pipe | 18.80 | PM | `50PM, 60PM` |
| `40249080-068` | Air Inlet Pipe | 20.51 | EPM | `40EPM, 50EPM` |
| `40249100-014` | Air Inlet Pipe | 20.51 | EPM | `60EPM` |
| `40249100-107` | Air inlet guide 1; Air Inlet Pipe | 25.64 | EPM, PM | `100PM, 75EPM, 75PM, 90EPM` |
| `40249150-017` | Air inlet guide 1 | 30.77 | EPM | `125EPM, 150EPM` |
| `40249150-021` | Air inlet guide 1 | 30.77 | EPM | `100EPM` |
| `40249150-049` | Air inlet guide 2 | 51.28 | EPM | `100EPM, 125EPM, 150EPM` |
| `40359080-332` | Oil tank inlet pipe | 95.54 | EPM | `100EPM, 125EPM, 150EPM` |
| `40359090-382` | Airend discharge pipe | 157.08 | EPM | `100EPM` |
| `40359100-390` | Airend discharge pipe | 255.87 | EPM | `150EPM` |
| `40359100-490` | Airend discharge pipe | 157.08 | EPM | `125EPM` |
| `45018010-050` | Transformer | 16.24-16.29 | EPM, PM | `100PM, 30PM, 40PM, 50PM, 75EPM, 75PM, 90EPM` |
| `45018016-050` | Transformer | 19.66 | EPM | `100EPM, 125EPM, 150EPM` |
| `45056004-103` | Fan Motor Inverter | 176.07 | EPM, PM | `25EPM, 30EPM, 30PM, 40PM` |
| `45056008-103` | Inverter | 570.08 | PM | `10PM2` |
| `45056011-103` | Inverter | 724.79 | PM | `15PM2` |
| `45056015-103` | Inverter | 905.98 | PM | `20PM2` |
| `45056150-103` | Fan Motor Inverter | 208.55 | EPM, PM | `40EPM, 50EPM, 50PM, 60EPM, 60PM` |
| `45056220-103` | Fan Motor Inverter | 275.80 | PM | `100PM, 75PM` |
| `45056370-103` | Fan Motor Inverter | 295.90 | EPM | `75EPM, 90EPM` |
| `45058022-301` | PM Motor Inverter | 912.82 | EPM, PM | `25EPM, 30PM` |
| `45058030-301` | PM Motor Inverter | 1,229.06 | EPM, PM | `30EPM, 40PM` |
| `45058037-301` | PM Motor Inverter | 1,365.81 | EPM, PM | `40EPM, 50PM` |
| `45058045-301` | PM Motor Inverter | 1,538.46 | EPM, PM | `50EPM, 60PM` |
| `45058055-301` | PM Motor Inverter | 1,699.15 | EPM | `60EPM` |
| `45058075-301` | Main Motor Inverter; PM Motor Inverter | 2,464.96 | EPM, PM | `75EPM, 75PM` |
| `45058090-301` | Inverter; Main Motor Inverter; PM Motor Inverter | 3,162.39 | EPM, PM | `100EPM, 100PM, 90EPM` |
| `45058110-101` | Inverter | 4,270.08 | EPM | `125EPM` |
| `45058132-101` | Inverter | 4,847.86 | EPM | `150EPM` |
| `45064020-006` | Keypad | 25.50 | PM | `10PM2, 15PM2, 20PM2` |
| `45264100-006` | PLC | 153.85 | EPM, PM | `25EPM, 30EPM, 30PM, 40PM` |
| `45264200-006` | PLC | 153.85 | EPM, PM | `100PM, 40EPM, 50EPM, 50PM, 60EPM, 60PM, 75EPM, 75PM, 90EPM` |
| `45264400-006` | PLC | 153.85 | EPM | `100EPM, 125EPM, 150EPM` |
| `50710000-004` | Solenoid Valve Module | 53.00 | PM | `30PM, 40PM, 50PM, 60PM` |
| `50715002-453` | Solenoid Valve | 80.00 | EPM | `100EPM, 125EPM, 150EPM` |
| `50715253-004` | Solenoid Valve; Solenoid Valve Module | 35.00 | PM | `10PM2, 15PM2, 20PM2` |
| `50715253-005` | Solenoid Valve; Solenoid Valve Module | 53.00-65.00 | EPM, PM | `100PM, 25EPM, 30EPM, 40EPM, 50EPM, 60EPM, 75EPM, 75PM, 90EPM` |
| `50720200-002` | Temp. Sensor | 16.48 | PM | `30PM, 40PM` |
| `50720200-003` | Temp. Sensor | 16.48 | EPM | `125EPM, 150EPM` |
| `50720200-016` | Temp. Sensor | 16.48 | EPM | `25EPM, 30EPM, 75EPM, 90EPM` |
| `50720200-025` | Temp. Sensor | 16.48 | PM | `10PM2, 15PM2, 20PM2` |
| `50720200-026` | Temp. Sensor | 16.48 | PM | `100PM, 75PM` |
| `50720200-027` | Temp. Sensor | 16.48 | EPM | `100EPM` |
| `50720200-031` | Temp. Sensor | 16.48 | EPM, PM | `40EPM, 50EPM, 50PM, 60EPM, 60PM` |
| `50725016-006` | Pressure Sensor | 43.90-65.93 | EPM, PM | `100EPM, 100PM, 10PM2, 125EPM, 150EPM, 15PM2, 20PM2, 25EPM, 30EPM, 30PM, 40EPM, 40PM, 50EPM, 50PM, 60EPM, 60PM, 75EPM, 75PM, 90EPM` |
| `50728016-002` | Pressure Gauge | 7.69 | PM | `10PM2` |
| `50730012-314` | Vent Valve | 35.00 | PM | `100PM, 30PM, 40PM, 50PM, 60PM, 75PM` |
| `50740008-314` | Oil Return Check Valve | 7.69 | EPM, PM | `100EPM, 100PM, 10PM2, 125EPM, 150EPM, 15PM2, 20PM2, 25EPM, 30EPM, 30PM, 40EPM, 40PM, 50EPM, 50PM, 60EPM, 60PM, 75EPM, 75PM, 90EPM` |
| `50766075-101` | Air Filter Pressure Difference Indicator | 5.13 | EPM | `100EPM, 125EPM, 150EPM, 75EPM, 90EPM` |
| `50766150-201` | Oil Filter Pressure Difference Indicator | 19.66 | EPM | `100EPM, 125EPM, 150EPM` |
| `50770000-002` | MPV Kit | 13.46 | EPM, PM | `25EPM, 30EPM, 30PM, 40PM` |
| `50770000-003` | MPV Kit | 60.74 | EPM, PM | `100PM, 75EPM, 75PM, 90EPM` |
| `50770000-004` | MPV Kit | 20.20 | EPM, PM | `40EPM, 50EPM, 50PM, 60PM` |
| `50770000-005` | MPV Kit | 98.78 | EPM | `100EPM, 125EPM, 150EPM` |
| `50770025-306` | Minimum Pressure Valve | 19.23 | EPM, PM | `25EPM, 30EPM, 30PM, 40PM` |
| `50770032-306` | Minimum Pressure Valve | 28.85 | EPM, PM | `40EPM, 50EPM, 50PM, 60PM` |
| `50770040-002` | Minimum Pressure Valve | 96.15 | EPM | `60EPM` |
| `50770040-002P1` | MPV Kit | 57.69 | EPM | `60EPM` |
| `50770050-306` | Minimum Pressure Valve | 114.42 | EPM, PM | `100PM, 75EPM, 75PM, 90EPM` |
| `50770065-102` | Minimum Pressure Valve | 184.62 | EPM | `100EPM, 125EPM, 150EPM` |
| `50775161-216` | Thermostatic Valve | 114.53 | EPM | `90EPM` |
| `50775441-215` | Thermostatic Valve | 186.32 | EPM | `100EPM, 125EPM, 150EPM` |
| `50775441-215P1` | Thermostatic Valve Kit | 130.42 | EPM | `100EPM, 125EPM, 150EPM` |
| `50775441-216P1` | Thermostatic Valve Kit | 80.17 | EPM | `90EPM` |
| `50780000-013` | Inlet Valve Kit | 26.00 | PM | `10PM2, 15PM2, 20PM2` |
| `50780000-015` | Inlet Valve Kit | 92.21 | EPM, PM | `100PM, 60EPM, 75EPM, 75PM, 90EPM` |
| `50780000-018` | Inlet Valve Kit | 32.14 | EPM, PM | `25EPM, 30EPM, 30PM, 40EPM, 40PM, 50EPM, 50PM, 60PM` |
| `50780000-022` | Inlet Valve Kit | 178.59 | EPM | `100EPM, 125EPM, 150EPM` |
| `50780000-032` | Inlet Valve Kit | 32.14 | PM | `30PM, 40PM, 50PM, 60PM` |
| `50780000-033` | Inlet Valve Kit | 63.40 | PM | `100PM, 75PM` |
| `50780040-106` | Inlet Valve | 64.62 | PM | `10PM2, 15PM2, 20PM2` |
| `50780065-121` | Inlet Valve | 107.69 | EPM, PM | `25EPM, 30EPM, 30PM, 40EPM, 40PM, 50EPM, 50PM, 60PM` |
| `50780065-501` | Inlet Valve | 73.50 | PM | `30PM, 40PM, 50PM, 60PM` |
| `50780085-108` | Inlet Valve | 158.97 | EPM, PM | `100PM, 60EPM, 75EPM, 75PM, 90EPM` |
| `50780090-502` | Inlet Valve | 141.03 | PM | `100PM, 75PM` |
| `50780120-117` | Inlet Valve | 393.16 | EPM | `100EPM, 125EPM, 150EPM` |
| `50800010-255` | Safety Valve | 3.42 | PM | `10PM2, 15PM2, 20PM2` |
| `50800015-254` | Safety Valve 8BAR | 10.26 | EPM, PM | `25EPM, 30EPM, 30PM, 40PM` |
| `50800020-254` | Safety Valve 8BAR | 15.38 | EPM, PM | `40EPM, 50EPM, 50PM, 60PM` |
| `50800025-253` | Safety Valve; Safety Valve 8BAR | 32.48 | EPM, PM | `100PM, 60EPM, 75EPM, 75PM, 90EPM` |
| `50800032-262` | Safety Valve | 58.12 | EPM | `100EPM, 125EPM, 150EPM` |
| `50801160-016` | Pressure Gauge | 9.23 | EPM | `100EPM, 125EPM, 150EPM` |
| `50801160-017` | Pressure Gauge; Pressure Gauge for oil tank | 9.23 | EPM, PM | `100PM, 25EPM, 30EPM, 30PM, 40EPM, 40PM, 50EPM, 50PM, 60EPM, 60PM, 75EPM, 75PM, 90EPM` |
| `50809280-203` | Combination Valve | 51.28 | PM | `10PM2` |
| `50809360-501` | Combination Valve | 73.50 | PM | `15PM2, 20PM2` |
| `55310001-013` | Coupling | 222.22 | EPM | `125EPM` |
| `55310005-007` | Coupling | 222.22 | EPM | `100EPM, 75EPM, 90EPM` |
| `55310005-015` | Coupling | 228.21 | EPM | `150EPM` |
| `55415001-103` | Elastic Element | 129.91 | EPM | `125EPM` |
| `55415005-007` | Elastic Element | 129.61-129.91 | EPM | `100EPM, 75EPM, 90EPM` |
| `55415005-015` | Elastic Element | 129.91 | EPM | `150EPM` |
| `70015005-501` | Impeller | 171.66 | EPM | `100EPM, 125EPM, 150EPM` |
| `70025001-100` | Fan | 315.79 | EPM | `75EPM, 90EPM` |
| `70025018-183` | Fan(380V/50HZ/3P) | 69.23 | EPM, PM | `25EPM, 30EPM, 30PM, 40PM` |
| `70025018-192` | Fan (380V/50HZ/3P) | 45.30 | PM | `10PM2` |
| `70025018-193` | Fan (380V/50HZ/3P) | 54.70 | PM | `10PM2, 20PM2` |
| `70025018-284` | Fan(380V/50HZ/3P) | 176.07 | EPM, PM | `40EPM, 50EPM, 50PM` |
| `70025018-305` | Fan(380V/50HZ/3P) | 222.22 | EPM, PM | `60EPM, 60PM` |
| `70025020-106` | Fan(380V/50HZ/3P) | 259.83 | PM | `100PM, 75PM` |
| `80000175-039` | Coolant | 83.00 | EPM, PM | `100EPM, 100PM, 10PM2, 125EPM, 150EPM, 15PM2, 20PM2, 25EPM, 30EPM, 30PM, 40EPM, 40PM, 50EPM, 50PM, 60EPM, 60PM, 75EPM, 75PM, 90EPM` |

## Definition Of Done For This Analysis

- Both vendor files were verified locally.
- PM/APM matching rule was documented.
- Compressor models, spare part numbers, descriptions, purchase prices, and service intervals were extracted into this report.
- Registry candidate usage was mapped without writing registry data.
- No Google Sheets, AppSheet, Apps Script, Maven, deploy, bot, `BusinessDocuments`, or `AutomationCommands` changes were made.
