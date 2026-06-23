# SCR Pricing Intelligence Audit

Last updated: 2026-06-23

Scope: read-only audit of every pricing source found in the repository for SCR spare parts and future AI Draft / BusinessDocument item suggestions.

Safety: no DB writes, imports, AI Draft creation, BusinessDocument creation, schema changes, migrations, Maven calls, Invoice4U calls, email actions, or AutomationCommand execution were performed.

## Executive Summary

No usable historical SCR spare-part selling prices are currently available in Supabase staging.

The repository does contain multiple possible future pricing sources:

- legacy `ProductsCatalog.SellingPrice`
- legacy Maven history via `InvoiceMavenDocumentItems`
- future Prisma `Product.sellingPrice`
- future Prisma `MavenDocumentItem.unitPrice`
- future Prisma `MavenItem.unitPrice`
- future Prisma `BusinessDocumentItem.unitPrice`
- vendor PM/EPM spare-parts workbooks with USD purchase-price evidence

However, current staging counts show all price-bearing tables are empty:

| Prisma model | Current staging count | Pricing impact |
|---|---:|---|
| `Product` | 0 | No catalog selling price available. |
| `PartUsed` | 0 | No actual used part rows available for SKU/quantity evidence. |
| `MavenDocumentItem` | 0 | No historical Maven selling price available. |
| `MavenItem` | 0 | No Maven item catalog price available. |
| `BusinessDocument` | 0 | No internal business document history available. |
| `BusinessDocumentItem` | 0 | No internal historical selling price available. |
| `ReportEquipmentItem` | 75 | Equipment/model context exists, but it is not a price source. |
| `ServiceReport` | 63 | Service context exists, but it is not a price source. |

## Pricing Sources Investigated

| Source area | File / model / table | Selling price fields found | Current result |
|---|---|---|---|
| ProductsCatalog history | `apps-script/AIDraftHistory.js`, `AI_DRAFT_RUNTIME_BLUEPRINT.md`, Wave 2 Project Brain findings, Prisma `Product` | `ProductsCatalog.SellingPrice`, `Product.sellingPrice` | Source exists in legacy design; staging `Product = 0`, so no usable selling prices. |
| Maven document history | `apps-script/MavenAPI.js`, `apps-script/AIDraftHistory.js`, `AI_DRAFT_FLOW_MAP.md`, Prisma `MavenDocumentItem` | `InvoiceMavenDocumentItems.Price`, `MavenDocumentItem.unitPrice`, `lineTotal` | Source exists in legacy/Maven sync design; staging `MavenDocumentItem = 0`, so no usable historical prices. |
| Invoice / Maven item catalog history | `scripts/import-dry-run.ts`, Prisma `MavenItem` | `InvoiceMavenItems.SKU`, `MavenItem.unitPrice`, `MavenItem.purchasePrice` | Source is mapped for future import; staging `MavenItem = 0`. |
| BusinessDocument history | Prisma `BusinessDocumentItem`, `app/business-documents/*` | `BusinessDocumentItem.unitPrice`, `totalPrice` | Future internal history source; staging `BusinessDocumentItem = 0`. |
| Existing AppSheet sources | `apps-script/AIDraftHistory.js`, `scripts/import-dry-run.ts`, Project Brain Wave 2 findings | `ProductsCatalog.SellingPrice`, `BusinessDocumentItems` price fields, `InvoiceMavenDocumentItems.Price` | Connector dry-run saw source tabs, but they are not imported into staging and cannot be used as committed pricing evidence yet. |
| Existing Excel sources | `data-sources/vendor-spare-parts/Spare Parts Service List(PM Series) rev3 (1).xls`, `data-sources/vendor-spare-parts/Spare Parts Service List(EPM Series) rev2 (1).xls`, `PM_EPM_SPARE_PARTS_SOURCE_OF_TRUTH_REPORT.md` | `Quotation (US$) Per Each` | Purchase-price evidence only, not historical selling price. |

## SKU Pricing Audit

The table below lists SCR-related SKUs found in the current SCR matching/PM-EPM evidence that matter for near-term draft suggestions. Historical selling price is intentionally `NOT FOUND` where no Product/Maven/BusinessDocument selling-price row exists in staging.

| SKU | Description | Historical selling price | Source system | Confidence | Last used date | Customer context if available |
|---|---|---:|---|---:|---|---|
| `25200007-005` | Oil Filter; compatible with `10PM2`, `15PM2`, `20PM2`, `25EPM`, `30EPM`, `30PM`, `40PM`, `50PM` | NOT FOUND | Vendor PM/EPM source has USD purchase evidence only; no staging Product/Maven/BusinessDocument price row | 20 | UNKNOWN | Suggested for ServiceReport `5806`, customer `18953` / `רמות מלונקס בע"מ`; no selling history found |
| `25100043-071` | Air filter core; compatible with `25EPM`, `30EPM`, `30PM`, `40PM` | NOT FOUND | Vendor PM/EPM source has USD purchase evidence only; no staging Product/Maven/BusinessDocument price row | 20 | UNKNOWN | Suggested for ServiceReport `5806`, customer `18953` / `רמות מלונקס בע"מ`; no selling history found |
| `25300045-023` | Oil separator; compatible with `25EPM`, `30EPM`, `30PM`, `40PM` | NOT FOUND | Vendor PM/EPM source has USD purchase evidence only; no staging Product/Maven/BusinessDocument price row | 20 | UNKNOWN | Compatible with ServiceReport `5806` model `SCR-40PM`; not selected for 2000H preview |
| `80000175-039` | Coolant; compatible with many PM/EPM models including `40PM` | NOT FOUND | Vendor PM/EPM source has USD purchase evidence only; no staging Product/Maven/BusinessDocument price row | 20 | UNKNOWN | Compatible with ServiceReport `5806` model `SCR-40PM`; not selected for conservative 2000H preview |
| `25200018-005` | Oil Filter; compatible with larger EPM/PM models such as `40EPM`, `50EPM`, `60EPM`, `75PM`, `100PM` | NOT FOUND | Vendor PM/EPM source has USD purchase evidence only; no staging Product/Maven/BusinessDocument price row | 20 | UNKNOWN | Potential future match for larger SCR/EPM reports; no selling history found |
| `25300065-031` | Oil separator; compatible with `40EPM`, `50EPM`, `50PM`, `60PM` | NOT FOUND | Vendor PM/EPM source has USD purchase evidence only; no staging Product/Maven/BusinessDocument price row | 20 | UNKNOWN | Potential future match for `SCR50EPM` reports; no selling history found |
| `25100075-071` | Air filter core; compatible with `40EPM`, `50EPM`, `50PM`, `60PM` | NOT FOUND | Vendor PM/EPM source has USD purchase evidence only; no staging Product/Maven/BusinessDocument price row | 20 | UNKNOWN | Potential future match for `SCR50EPM` reports; no selling history found |
| `SCR-20EPM` | ProductsCatalog duplicate SKU blocker from Wave 2 dry-run findings | NOT FOUND | Existing AppSheet `ProductsCatalog` dry-run evidence only; duplicate SKU blocker, no imported selling price in staging | 10 | UNKNOWN | Wave 2 blocker; cannot use for pricing until duplicate is resolved |

## Historical Selling Price Status

| Source priority | Status | Safe interpretation |
|---|---|---|
| ProductsCatalog direct match | Not available in staging | Do not claim catalog selling price. |
| Same equipment/model Maven history | Not available in staging | Do not claim historical Maven selling price. |
| Same customer Maven history | Not available in staging | Do not claim customer historical selling price. |
| BusinessDocumentItem history | Not available in staging | Do not claim internal historical selling price. |
| Vendor PM/EPM workbook quotation | Available as purchase-price evidence | May support cost reasoning only; must not be used as customer selling price. |
| Fixed visit rule | Available in existing AI Draft mapping | `300` NIS base visit; no part SKU. |
| Fixed labor rule | Available in existing AI Draft mapping | `275` NIS/hour; no part SKU and requires hours quantity. |

## Existing AppSheet / Legacy Evidence

Wave 2 connector dry-run proved these tabs are readable in the source system:

| Legacy source | Observed rows / issue | Pricing relevance |
|---|---|---|
| `ProductsCatalog` | `113` rows observed; duplicate SKU `SCR-20EPM` blocker | Potential selling-price source after approval/import/reconciliation. |
| `PartsUsed` | `1` example row linked to unresolved `R-EXAMPLE` | Not usable as real historical pricing evidence. |
| `BusinessDocuments` | `1` row observed | Header-level context only; item table had no rows. |
| `BusinessDocumentItems` | `0` rows observed | No internal item selling history. |
| `InvoiceMavenDocumentItems` | Mapped in scripts but not part of current populated staging | Potential Maven historical item price source after approved import/sync. |

No Google Sheets/AppSheet writes were performed during this audit.

## Missing Pricing Data

| Missing data | Why it matters |
|---|---|
| Imported `Product` / ProductsCatalog rows | Needed for exact SKU match and approved `sellingPrice`. |
| Resolved duplicate SKU `SCR-20EPM` | Required before trusting ProductsCatalog SKU uniqueness. |
| Imported `MavenDocumentItem` rows | Needed for actual historical invoice/document line prices. |
| Imported `MavenItem` rows | Needed for Maven item catalog SKU and price history. |
| Imported `BusinessDocumentItem` rows | Needed for internal draft/document selling price history. |
| Reliable `PartUsed` rows | Needed to connect actual used parts to report/SKU/quantity evidence. |
| Currency and markup policy | Needed before converting vendor USD purchase prices to customer ILS selling prices. |
| Effective dates for price validity | Needed for last-used date and stale-price detection. |
| Customer-specific price policy | Needed before reusing historical price from one customer for another. |

## Safe Fallback Pricing Rules

Until Product/Maven/BusinessDocument item history is populated and approved:

| Fallback rule | Allowed use |
|---|---|
| Do not auto-fill part selling price | Set `recommendedUnitPrice = null` or `0`, `priceSource = APPROVAL_REQUIRED`, `needsPriceApproval = true`. |
| Vendor quotation as cost evidence only | Store in preview evidence as `purchasePriceEvidence`, never as customer selling price. |
| Fixed visit line | Use `300` NIS when a visit line is included by approved preview logic; `needsPriceApproval = false` unless business rule changes. |
| Fixed labor line | Use `275` NIS/hour only when labor hours are known; if hours are missing, set `needsPriceApproval = true`. |
| Historical price reuse | Only after imported Maven/Product/BusinessDocument history exists; require same SKU or strong item-description match and cite source document/date/customer. |
| Conflicting prices | Require manual approval when catalog/history prices differ materially or source confidence is below threshold. |
| Cross-customer reuse | Require approval unless policy explicitly allows same-model/same-SKU reuse across customers. |

## Recommended Next Step

Build a read-only pricing intelligence preview after explicit task selection:

1. Read `ProductsCatalog`, `InvoiceMavenDocumentItems`, `InvoiceMavenItems`, and `BusinessDocumentItems` only after those sources are populated or connector-read access is explicitly selected.
2. Normalize SKU, item description, customer, equipment model, and document date.
3. Produce a price-evidence table per SKU with source, unit price, currency, date, customer, and confidence.
4. Keep all part lines `needsPriceApproval = true` until at least one approved selling-price source is available.
5. Stop before any DB write, import, AI Draft creation, BusinessDocument creation, Maven/Invoice4U action, email, or AutomationCommand execution.

## Agent Workflow Result

| Agent | Result |
|---|---|
| Builder | Created this report from repo docs, scripts, schema, prior SCR reports, and read-only Prisma counts. |
| Map Guard | Report-only change is justified; protected systems untouched. |
| QA | Validate with `git diff --check`, required-section scan, and staged-file review. |
| Reviewer | Commit should include only `SCR_PRICING_INTELLIGENCE_AUDIT.md`. |
