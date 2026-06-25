# Manufacturer Parts Registry Discovery

Status: Legacy discovery artifact. Permanent manufacturer parts knowledge now belongs in `MANUFACTURER_PARTS_REGISTRY.md`; matching policy belongs in `SKU_MATCHING_RULES.md`. Do not extend this file as a permanent planning surface; migrate durable knowledge into reusable Knowledge Bases.

Date: 2026-06-24

Mode: discovery only.

Runtime impact: none. No implementation, import, DB write, Prisma change, code change, inventory action, BusinessDocument creation, Maven/Invoice4U action, or runtime workflow change was performed.

## 1. Executive Summary

The available SCR manufacturer spare-parts evidence consists of two local vendor workbooks:

- `data-sources/vendor-spare-parts/Spare Parts Service List(PM Series) rev3 (1).xls`
- `data-sources/vendor-spare-parts/Spare Parts Service List(EPM Series) rev2 (1).xls`

The existing read-only extraction report `PM_EPM_SPARE_PARTS_SOURCE_OF_TRUTH_REPORT.md` verifies these workbooks as the strongest current source for SKU-to-model relationships:

- `569` extracted spare-part rows
- `19` compressor models
- `213` unique spare part numbers
- PM/APM family coverage through the PM workbook
- EPM family coverage through the EPM workbook
- service interval quantity columns: `2000H`, `4000H`, `8000H`, `12000H`, `16000H`, `20000H`, `24000H`, `30000H`

Manufacturer spare-parts workbooks are the primary source of truth for SKU-to-model compatibility. Historical service data is secondary evidence and must not override manufacturer compatibility.

## 2. Evidence Sources

### Exact Manufacturer Evidence

| Evidence source | Role | Status |
|---|---|---|
| `Spare Parts Service List(PM Series) rev3 (1).xls` | Primary manufacturer evidence for PM/APM family parts | Available locally |
| `Spare Parts Service List(EPM Series) rev2 (1).xls` | Primary manufacturer evidence for EPM family parts | Available locally |
| `PM_EPM_SPARE_PARTS_SOURCE_OF_TRUTH_REPORT.md` | Existing verified extraction of both workbooks | Current source-of-truth report |

### Historical Evidence

| Evidence source | Role | Status |
|---|---|---|
| `data-sources/exports/ReportEquipmentItems.csv` | Historical service/equipment observations | Secondary evidence |
| `data-sources/exports/ServiceReports.csv` | Customer/report context for service history | Secondary evidence |
| `project-brain/EQUIPMENT_IDENTITY_REGISTRY_DISCOVERY.md` | Raw equipment identity buckets and alias risks | Secondary governance evidence |
| `SCR_SKU_TO_DOCUMENT_DRAFT_ANALYSIS.md` | Read-only SKU-to-draft planning evidence | Secondary planning evidence |
| `project-brain/PARTS_SKU_INTELLIGENCE_SPEC.md` | Rules for future SKU intelligence | Governance specification |

## 3. Models Covered

### PM / APM Series

The PM workbook covers PM models. Existing governance says PM/APM is a review-gated business alias family, not an automatic merge.

| Series | Manufacturer model | APM lookup implication | Rows | Unique part numbers | Evidence classification |
|---|---|---|---:|---:|---|
| PM/APM | `10PM2` | Candidate for `SCR10APM` / `10APM` after approval | 26 | 24 | Exact manufacturer evidence, alias approval required |
| PM/APM | `15PM2` | Candidate for `SCR15APM` after approval | 19 | 19 | Exact manufacturer evidence, alias approval required |
| PM/APM | `20PM2` | Candidate for `SCR20APM` after approval | 21 | 21 | Exact manufacturer evidence, alias approval required |
| PM/APM | `30PM` | Candidate for `SCR30APM` / `SCR30PM` after approval | 30 | 30 | Exact manufacturer evidence |
| PM/APM | `40PM` | Candidate for `SCR-40PM` / `SCR40APM` after approval | 30 | 30 | Exact manufacturer evidence |
| PM/APM | `50PM` | Candidate for `SCR50APM` / `SCR50PM` after approval | 32 | 31 | Exact manufacturer evidence |
| PM/APM | `60PM` | Candidate for `SCR60APM` / `SCR60PM` after approval | 30 | 30 | Exact manufacturer evidence |
| PM/APM | `75PM` | Candidate for `SCR75APM` / `SCR75PM` after approval | 31 | 31 | Exact manufacturer evidence |
| PM/APM | `100PM` | Candidate for `SCR100APM` / `100APM` after approval | 31 | 31 | Exact manufacturer evidence |

### EPM Series

| Series | Manufacturer model | SCR lookup implication | Rows | Unique part numbers | Evidence classification |
|---|---|---|---:|---:|---|
| EPM | `25EPM` | Candidate for `SCR25EPM` after approval | 26 | 26 | Exact manufacturer evidence |
| EPM | `30EPM` | Candidate for `SCR30EPM` after approval | 26 | 26 | Exact manufacturer evidence |
| EPM | `40EPM` | Candidate for `SCR40EPM` after approval | 27 | 27 | Exact manufacturer evidence |
| EPM | `50EPM` | Candidate for `SCR50EPM` after approval | 27 | 27 | Exact manufacturer evidence |
| EPM | `60EPM` | Candidate for `SCR60EPM` after approval | 27 | 27 | Exact manufacturer evidence |
| EPM | `75EPM` | Candidate for `SCR75EPM` after approval | 33 | 33 | Exact manufacturer evidence |
| EPM | `90EPM` | Candidate for `SCR90EPM` after approval | 35 | 35 | Exact manufacturer evidence |
| EPM | `100EPM` | Candidate for `SCR100EPM` after approval | 39 | 39 | Exact manufacturer evidence |
| EPM | `125EPM` | Candidate for `SCR125EPM` after approval | 39 | 39 | Exact manufacturer evidence with title-row review risk |
| EPM | `150EPM` | Candidate for `SCR150EPM` after approval | 40 | 39 | Exact manufacturer evidence |

## 4. Manufacturer Parts Registry Discovery

This table focuses on the high-value service and compatibility parts needed for AI Draft, service-kit, and SKU intelligence. It does not approve import or SKU matching.

| Model / model group | Part number | Part description | Shared models | Series | Evidence classification |
|---|---|---|---|---|---|
| Large EPM | `22150023-011P1` | air filter core | `100EPM, 125EPM, 150EPM` | EPM | Exact manufacturer evidence |
| Large EPM | `22150023-011P2` | Safety Filter Core | `100EPM, 125EPM, 150EPM` | EPM | Exact manufacturer evidence |
| Mid/large PM/EPM | `25100015-002P1` | air filter core | `100PM, 60EPM, 75EPM, 75PM, 90EPM` | EPM, PM | Exact manufacturer evidence |
| Small PM | `25100020-001` | air filter core | `10PM2, 15PM2, 20PM2` | PM | Exact manufacturer evidence |
| Small/mid PM/EPM | `25100043-071` | air filter core | `25EPM, 30EPM, 30PM, 40PM` | EPM, PM | Exact manufacturer evidence |
| Mid PM/EPM | `25100075-071` | air filter core | `40EPM, 50EPM, 50PM, 60PM` | EPM, PM | Exact manufacturer evidence |
| Small/mid PM/EPM | `25200007-005` | Oil Filter | `10PM2, 15PM2, 20PM2, 25EPM, 30EPM, 30PM, 40PM, 50PM` | EPM, PM | Exact manufacturer evidence |
| Mid/large PM/EPM | `25200018-005` | Oil Filter | `100EPM, 100PM, 125EPM, 150EPM, 40EPM, 50EPM, 60EPM, 60PM, 75EPM, 75PM, 90EPM` | EPM, PM | Exact manufacturer evidence |
| Small/mid PM/EPM | `25300045-023` | oil separator | `25EPM, 30EPM, 30PM, 40PM` | EPM, PM | Exact manufacturer evidence |
| Mid PM/EPM | `25300065-031` | oil separator | `40EPM, 50EPM, 50PM, 60PM` | EPM, PM | Exact manufacturer evidence |
| `60EPM` | `25300065-036` | oil separator | `60EPM` | EPM | Exact manufacturer evidence, model-specific |
| Large PM/EPM | `25300160-121` | oil separator | `100PM, 75EPM, 75PM, 90EPM` | EPM, PM | Exact manufacturer evidence |
| Large EPM | `25300220-022` | oil separator | `100EPM, 125EPM, 150EPM` | EPM | Exact manufacturer evidence |
| `10PM2` | `25350020-021` | oil separator | `10PM2` | PM | Exact manufacturer evidence, model-specific |
| `15PM2, 20PM2` | `25350030-021` | oil separator | `15PM2, 20PM2` | PM | Exact manufacturer evidence |
| All PM/EPM models | `80000175-039` | Coolant | `100EPM, 100PM, 10PM2, 125EPM, 150EPM, 15PM2, 20PM2, 25EPM, 30EPM, 30PM, 40EPM, 40PM, 50EPM, 50PM, 60EPM, 60PM, 75EPM, 75PM, 90EPM` | EPM, PM | Exact manufacturer evidence |
| All PM/EPM models | `50725016-006` | Pressure Sensor | `100EPM, 100PM, 10PM2, 125EPM, 150EPM, 15PM2, 20PM2, 25EPM, 30EPM, 30PM, 40EPM, 40PM, 50EPM, 50PM, 60EPM, 60PM, 75EPM, 75PM, 90EPM` | EPM, PM | Exact manufacturer evidence |
| All PM/EPM models | `50740008-314` | Oil Return Check Valve | `100EPM, 100PM, 10PM2, 125EPM, 150EPM, 15PM2, 20PM2, 25EPM, 30EPM, 30PM, 40EPM, 40PM, 50EPM, 50PM, 60EPM, 60PM, 75EPM, 75PM, 90EPM` | EPM, PM | Exact manufacturer evidence |
| `10PM2, 15PM2, 20PM2` | `35350065-002` | Oil Level Sightglass | `10PM2, 15PM2, 20PM2` | PM | Exact manufacturer evidence |
| Large EPM | `26015001-000` | Oil Level Sightglass | `100EPM, 125EPM, 150EPM, 75EPM, 90EPM` | EPM | Exact manufacturer evidence |
| Mid PM/EPM | `26015001-010` | Oil Level Sightglass | `100PM, 25EPM, 30EPM, 30PM, 40EPM, 40PM, 50EPM, 50PM, 60EPM, 60PM, 75PM` | EPM, PM | Exact manufacturer evidence |
| Large EPM | `40159032-367` | Airend oil inlet pipe | `100EPM, 125EPM, 150EPM` | EPM | Exact manufacturer evidence |
| `75EPM, 90EPM` | `40159065-413` | Oil tank inlet pipe | `75EPM, 90EPM` | EPM | Exact manufacturer evidence |
| Large EPM | `40359080-332` | Oil tank inlet pipe | `100EPM, 125EPM, 150EPM` | EPM | Exact manufacturer evidence |
| Small/mid PM/EPM | `50801160-017` | Pressure Gauge; Pressure Gauge for oil tank | `100PM, 25EPM, 30EPM, 30PM, 40EPM, 40PM, 50EPM, 50PM, 60EPM, 60PM, 75EPM, 75PM, 90EPM` | EPM, PM | Exact manufacturer evidence |
| EPM large | `50766150-201` | Oil Filter Pressure Difference Indicator | `100EPM, 125EPM, 150EPM` | EPM | Exact manufacturer evidence |
| EPM large/high | `50766075-101` | Air Filter Pressure Difference Indicator | `100EPM, 125EPM, 150EPM, 75EPM, 90EPM` | EPM | Exact manufacturer evidence |

## 5. Service Kit Evidence

The manufacturer files expose service interval quantity columns. These are service-kit candidates, not approved invoice or inventory quantities.

| Interval | Rows with nonzero quantity | Current use |
|---|---:|---|
| `2000H` | 42 | Candidate small-service parts evidence |
| `4000H` | 80 | Candidate large-service parts evidence |
| `8000H` | 147 | Candidate deeper service parts evidence |
| `12000H` | 147 | Candidate deeper service parts evidence |
| `16000H` | 262 | Candidate deeper service parts evidence |
| `20000H` | 379 | Candidate lifecycle service parts evidence |
| `24000H` | 379 | Candidate lifecycle service parts evidence |
| `30000H` | 569 | Review-required; may represent cumulative/overhaul list |

Important: service interval quantities may be cumulative rather than per-service quantities. Do not use them as invoice quantities until Liad approves interpretation.

## 6. Shared Parts Between Models

High-leverage shared parts:

| Part number | Part description | Sharing pattern | Series |
|---|---|---|---|
| `80000175-039` | Coolant | Shared by every extracted PM/EPM model | EPM, PM |
| `50725016-006` | Pressure Sensor | Shared by every extracted PM/EPM model | EPM, PM |
| `50740008-314` | Oil Return Check Valve | Shared by every extracted PM/EPM model | EPM, PM |
| `25200007-005` | Oil Filter | Shared by small/mid PM and small/mid EPM models | EPM, PM |
| `25200018-005` | Oil Filter | Shared by mid/large PM and mid/large EPM models | EPM, PM |
| `25100043-071` | air filter core | Shared by `25EPM, 30EPM, 30PM, 40PM` | EPM, PM |
| `25100075-071` | air filter core | Shared by `40EPM, 50EPM, 50PM, 60PM` | EPM, PM |
| `25300045-023` | oil separator | Shared by `25EPM, 30EPM, 30PM, 40PM` | EPM, PM |
| `25300065-031` | oil separator | Shared by `40EPM, 50EPM, 50PM, 60PM` | EPM, PM |

One SKU may fit multiple compressor models. This is expected and should be represented as compatibility evidence, not duplicate SKU records.

## 7. Model-Specific Or Narrow Parts

Examples of model-specific or narrow compatibility evidence:

| Model / group | Part number | Part description | Series |
|---|---|---|---|
| `10PM2` | `25350020-021` | oil separator | PM |
| `15PM2, 20PM2` | `25350030-021` | oil separator | PM |
| `60EPM` | `25300065-036` | oil separator | EPM |
| `100EPM, 125EPM, 150EPM` | `25300220-022` | oil separator | EPM |
| `100EPM` | `00270002-001` | Airend 8BAR | EPM |
| `125EPM, 150EPM` | `00280002-002` | Airend 8BAR | EPM |
| `100PM` | `00090002-013` | Airend 8BAR | PM |
| `10PM2` | `00060002-002` | Airend 8BAR | PM |
| `15PM2, 20PM2` | `00075001-009` | Airend 8BAR | PM |

Model-specific parts must not be generalized across horsepower families or generic compressor descriptions.

## 8. Filters, Separators, Belts, And Oil-Related Parts

### Filters

Manufacturer evidence includes air filter cores and safety filter cores:

- `22150023-011P1`
- `22150023-011P2`
- `25100015-002P1`
- `25100020-001`
- `25100043-071`
- `25100075-071`

### Oil Filters

Manufacturer evidence includes:

- `25200007-005`
- `25200018-005`

### Oil Separators

Manufacturer evidence includes:

- `25300045-023`
- `25300065-031`
- `25300065-036`
- `25300160-121`
- `25300220-022`
- `25350020-021`
- `25350030-021`

### Belts

No belt SKU was found in the extracted PM/EPM manufacturer workbook evidence reviewed through `PM_EPM_SPARE_PARTS_SOURCE_OF_TRUTH_REPORT.md`.

Historical service evidence does mention belt work, especially around `SCR20XAמס2`, but this is secondary evidence only. Belt recommendations require another exact manufacturer/catalog source or approved historical SKU mapping.

### Oil-Related Parts

Manufacturer evidence includes:

- `80000175-039` - Coolant
- `26015001-000` - Oil Level Sightglass
- `26015001-010` - Oil Level Sightglass
- `35350065-002` - Oil Level Sightglass
- `40159023-301` - Airend oil inlet pipe
- `40159023-303` - Airend oil inlet pipe
- `40159032-367` - Airend oil inlet pipe
- `40159065-413` - Oil tank inlet pipe
- `40359080-332` - Oil tank inlet pipe
- `50740008-314` - Oil Return Check Valve
- `50766150-201` - Oil Filter Pressure Difference Indicator
- `50801160-017` - Pressure Gauge for oil tank

Oil/coolant evidence is not pricing approval and not inventory deduction approval.

## 9. Exact Manufacturer Evidence vs Historical Evidence

### Exact Manufacturer Evidence

Use as primary SKU-to-model compatibility evidence:

- part number / code
- spare part name
- manufacturer model
- series
- service interval quantity column
- workbook source file
- sheet/row extraction evidence where available

### Historical Evidence

Use only as secondary support:

- real customer service report
- observed equipment model
- serial number
- observed service type
- observed recurring parts
- historical invoice/item text after import or availability

Historical service data can show that a part was used or expected, but it cannot prove manufacturer compatibility when the manufacturer workbook says otherwise or when the equipment identity is generic.

## 10. Current Historical Cross-Checks

| Observed equipment model | Historical service signal | Manufacturer evidence relationship | Current decision |
|---|---|---|---|
| `SCR20APM` | Repeated small/periodic service; air filter, oil filter, oil handling recurring | Candidate PM/APM mapping to `20PM2` exists but requires approval | Do not auto-match until PM/APM and PM2 mapping approved |
| `SCR20EPM` | Small/2000h service observations | EPM workbook has `20EPM` absent; nearest EPM starts at `25EPM` | No automatic EPM SKU match from manufacturer workbook |
| `SCR-40PM` | Report 5806 has two `SCR-40PM` compressors with 2000h/small service text | PM workbook has `40PM` exact manufacturer bucket | Strong candidate after alias approval |
| `SCR50EPM` | Small/2000h service observations | EPM workbook has `50EPM` exact manufacturer bucket | Strong candidate after exact/alias approval |
| `SCR20XAמס2` | Belt and air-filter service observations; oil-free scroll subtype | PM/EPM workbook does not prove XA belt/SKU compatibility | Keep historical only; do not use PM/EPM compressor kits automatically |

## 11. Risks

- PM/APM equivalence is a governed business rule, not a raw workbook statement.
- `10PM2`, `15PM2`, and `20PM2` create PM2 mapping risk for APM models such as `SCR20APM`.
- `SCR20EPM` appears in service history, but the EPM workbook model list starts at `25EPM`; do not infer `20EPM` compatibility.
- Some workbook conflicts already exist: duplicate model-code rows, PM sheet/model mismatches, and one EPM title-row mismatch.
- Vendor prices are USD purchase/cost evidence, not customer selling prices.
- Service interval quantities may be cumulative rather than per-service quantities.
- Generic compressor descriptions and horsepower classes must not trigger SKU matching.
- Historical service evidence can create false confidence when no exact manufacturer SKU evidence exists.
- Belt evidence is weak in the PM/EPM manufacturer source set.

## 12. Recommended Next Gate

Before implementation or import, approve a manufacturer-parts governance rule:

1. Manufacturer workbook compatibility is primary evidence.
2. Historical service history is secondary evidence.
3. PM/APM aliases require explicit approval.
4. PM2 mappings require explicit approval.
5. `SCR20EPM` needs a separate source or manual decision because no `20EPM` manufacturer model was found in the EPM workbook coverage.
6. Belt SKU recommendations require a manufacturer/catalog source beyond the current PM/EPM extraction.
7. Vendor USD quotation is cost evidence only.
8. No inventory deduction is allowed from parts evidence alone.

Recommended next discovery task:

- Create a read-only `SCR40PM` and `SCR50EPM` service-kit evidence packet from manufacturer workbook rows plus historical service reports, without importing or writing anything.
