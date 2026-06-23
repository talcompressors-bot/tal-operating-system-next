# SCR Matching Preview

Last updated: 2026-06-23

Scope: read-only preview for one real ServiceReport using ServiceReport, Customer, ReportEquipmentItem, SCR PM/EPM spare-parts evidence, existing AI Draft mapping docs, and historical pricing source rules.

Safety: no AI Drafts created, no BusinessDocuments created, no DB writes/imports, no schema changes, no migrations, no Maven/Invoice4U calls, no email actions, and no AutomationCommands executed.

## Source Evidence

| Source | Evidence used |
|---|---|
| `ServiceReport` / Prisma read-only | Report `5806`, AppSheet report ID `1e25bbb1`, internal ID `87333eae-7779-4261-bd2d-8af19d162e24`. |
| `Customer` / Prisma read-only | Customer `18953`, `רמות מלונקס בע"מ`. |
| `ReportEquipmentItem` / Prisma read-only | Two matched `SCR-40PM` compressor rows with 2000-hour small-service descriptions. |
| `PM_EPM_SPARE_PARTS_SOURCE_OF_TRUTH_REPORT.md` | PM/EPM extraction: `40PM` exists; `40PM` has `2` candidate rows at `2000H`; compatible SKU evidence includes air filter `25100043-071`, oil filter `25200007-005`, oil separator `25300045-023`, and coolant `80000175-039`. |
| `SCR_SKU_TO_DOCUMENT_DRAFT_ANALYSIS.md` | Matching rules for model normalization, SKU matching, historical price priority, and approval flags. |
| `project-brain/maps/AI_DRAFT_FIELD_MAPPING.md` | Pricing priority and fixed rules: labor `275` NIS/hour, visit `300` NIS. |
| `apps-script/AIDraftHistory.js` | Existing preview-only pattern for ProductsCatalog match, Maven history match, fixed labor/visit lines, and `NeedsPriceApproval`. |

## Read-Only Data Snapshot

| Field | Value |
|---|---|
| Report ID | `1e25bbb1` |
| Internal report UUID | `87333eae-7779-4261-bd2d-8af19d162e24` |
| Report counter | `5806` |
| Customer | `רמות מלונקס בע"מ` |
| Customer ID | `18953` |
| Report service type | `טיפול תקופתי` |
| Technician work hours | Not recorded |
| Matching equipment rows | `2` |
| Matched equipment model | `SCR-40PM` |
| Normalized model | `40PM` |
| Detected service type | 2000-hour small periodic compressor service |
| Historical pricing availability | Not available in staging: `Product = 0`, `PartUsed = 0`, `MavenDocumentItem = 0`, `MavenItem = 0`, `BusinessDocumentItem = 0` |

Matched equipment evidence:

| Equipment item | Model | Service description | Current hours | Next service |
|---|---|---|---:|---|
| `6bb28e16` | `SCR-40PM` | `טיפול תקופתי קטן 2000` | `32327` | `34320-4000` |
| `e8c32b28` | `SCR-40PM` | `בוצע טיפול קטן-2000` | `23235` | `25230-4000` |

Unmatched equipment in the same report:

| Equipment item | Model | Reason |
|---|---|---|
| `ae5a3d2e` | `בתי אלמנט דגם אטלס-DD20+/DP20+` | Line-filter / Atlas element text does not match SCR PM/EPM compressor spare-parts source. |

## Preview Engine Logic

1. Read one ServiceReport by report counter `5806`.
2. Load related customer and equipment rows through Prisma read-only relations.
3. Filter equipment rows to oil-injected air compressors with model text containing `SCR`, `PM`, `APM`, or `EPM`.
4. Normalize model:
   - `SCR-40PM` -> `SCR40PM` -> `40PM`.
5. Detect service interval:
   - `טיפול תקופתי קטן 2000` and `בוצע טיפול קטן-2000` -> `2000H`.
6. Match spare-parts model:
   - `40PM` exists in the PM spare-parts source.
7. Determine base kit size:
   - PM/EPM source report states `40PM` has `2` nonzero candidate rows at `2000H`.
8. Select conservative 2000H candidate parts:
   - oil filter and air filter are the two safest small-service candidates for `40PM`.
9. Determine quantity:
   - base quantity `1` per matching compressor row.
   - matching compressor rows `2`.
   - suggested quantity per SKU: `2`.
10. Apply pricing:
   - ProductsCatalog/Maven historical pricing is unavailable in staging.
   - Vendor USD purchase evidence is present but is not approved selling price.
   - Parts therefore use `priceSource = VendorPurchaseEvidenceOnly` and `needsPriceApproval = true`.
11. Add fixed visit line:
   - `300` NIS, quantity `1`, no price approval needed.
12. Add fixed labor rule:
   - `275` NIS/hour, but report has no recorded labor hours, so quantity is missing and approval is required.

## Suggested Lines

| Line | Suggested SKU | Suggested description | Quantity | Confidence score | Price source | needsPriceApproval |
|---|---|---|---:|---:|---|---|
| Part | `25200007-005` | Oil Filter for SCR-40PM 2000H service | `2` | `78` | Vendor purchase evidence only; Products/Maven historical selling price unavailable | `true` |
| Part | `25100043-071` | Air filter core for SCR-40PM 2000H service | `2` | `78` | Vendor purchase evidence only; Products/Maven historical selling price unavailable | `true` |
| Visit | N/A | Technician visit for service report `5806` | `1` | `100` | Fixed rule: `300` NIS | `false` |
| Labor | N/A | Technician labor for service report `5806` | Missing hours | `50` | Fixed rule: `275` NIS/hour, quantity missing | `true` |

## Candidate Parts Not Selected

| SKU | Description | Why not selected |
|---|---|---|
| `25300045-023` | oil separator for `30PM, 40PM` | Compatible with `40PM`, but not selected for 2000H small-service preview because the source report says only `2` candidate rows exist for `40PM` at `2000H`. Keep for larger interval review. |
| `80000175-039` | Coolant | Compatible with many PM/EPM models, but quantity and selling price require approval; not selected in the conservative two-line 2000H kit. |
| Atlas `DD20+/DP20+` elements | Line-filter elements | Not in SCR PM/EPM compressor spare-parts source; requires separate Atlas/line-filter catalog evidence. |

## Historical Pricing Application

| Pricing source | Status in this preview | Result |
|---|---|---|
| ProductsCatalog / `Product` | Current staging count `0` | No catalog selling price can be applied. |
| `PartUsed` | Current staging count `0` | No actual used part rows can confirm quantities. |
| Maven document item history | `MavenDocumentItem = 0`, `MavenItem = 0` in staging | No historical customer/equipment selling price can be applied. |
| Vendor PM workbook quotation | Available as USD purchase evidence | May support cost reasoning only; not customer selling price. |
| Fixed visit rule | Available | Applied: `300` NIS. |
| Fixed labor rule | Available | Rate applied, but quantity missing because labor hours are not recorded. |

## Missing Data

| Missing data | Impact |
|---|---|
| Product catalog rows in staging | Cannot attach `productId` or approved selling price. |
| PartsUsed rows in staging | Cannot compare preview to actual reported parts used. |
| Maven historical item rows in staging | Cannot apply same-customer/equipment historical selling price. |
| Labor hours on report `5806` | Labor line quantity cannot be calculated. |
| Row-level interval quantities from the Excel workbook in machine-readable form | Preview uses the existing extracted summary and conservative SKU choice; direct workbook extraction should verify final interval quantities before implementation. |
| Approval for vendor purchase price policy | USD purchase quote cannot become ILS customer price. |
| Atlas line-filter catalog | The `DD20+/DP20+` equipment row remains unmatched. |

## Unmatched Parts / Equipment

| Item | Status |
|---|---|
| `בתי אלמנט דגם אטלס-DD20+/DP20+` | Unmatched by SCR PM/EPM source; likely line-filter element catalog needed. |
| Oil separator / coolant | Compatible with `40PM`, but not selected for 2000H small-service preview because the current extracted service interval summary indicates two `40PM` candidate rows at `2000H`. |
| Belt-related parts | No belt evidence in this report; no SKU suggested. |

## Risks

| Risk | Mitigation |
|---|---|
| Conservative SKU selection may miss the true 2000H row pair from the workbook. | Build a read-only parser that extracts row-level `2000H` quantities directly before any write workflow. |
| Vendor purchase price might be mistaken for customer selling price. | Keep all part lines `needsPriceApproval = true` until selling-price policy exists. |
| Same report has two matching compressors. | Quantity multiplication is explicit and evidence-based, but should be reviewed before creating a document. |
| Labor quantity missing. | Keep labor line approval-required until technician hours are recorded or manually entered. |
| Atlas line-filter element is outside SCR PM/EPM source. | Add separate line-filter/Atlas catalog source before matching that row. |
| No Product/Maven/Parts data in staging. | Do not create AI Draft or BusinessDocument lines from this preview yet. |

## Recommended Next Implementation Step

Build a read-only SCR matching preview utility that:

1. Accepts `reportCounter`, `ServiceReport.id`, or `ReportEquipmentItem.id`.
2. Reads ServiceReport, Customer, and ReportEquipmentItem via Prisma only.
3. Parses PM/EPM spare-parts workbooks into in-memory rows without importing or writing.
4. Normalizes model aliases such as `SCR-40PM -> 40PM` and `SCR20APM -> 20PM/20PM2 review`.
5. Extracts exact row-level interval quantities from `2000H`, `4000H`, etc.
6. Outputs preview JSON/Markdown with SKU, description, quantity, confidence, price source, and approval flags.
7. Stops before any AI Draft, BusinessDocument, DB write, Maven/Invoice4U call, or AutomationCommand execution.

## Agent Workflow Result

| Agent | Result |
|---|---|
| Builder | Created this read-only preview report for real ServiceReport `5806`. |
| Map Guard | Protected systems stayed untouched; report-only file is justified. |
| QA | Validate with `git diff --check`, required-section scan, and staged-file review. |
| Reviewer | Commit should include only `SCR_MATCHING_PREVIEW.md`. |
