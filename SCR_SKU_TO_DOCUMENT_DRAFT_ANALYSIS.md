# SCR SKU To Document Draft Analysis

Last updated: 2026-06-23

Scope: read-only repository analysis for future AI Draft and BusinessDocument item suggestions.

Safety: no app code edits, schema changes, migrations, DB writes/imports, document creation, Maven/Invoice4U calls, email actions, or AutomationCommand execution were performed.

## Executive Summary

The repo already contains two SCR vendor spare-parts Excel workbooks and a detailed read-only source-of-truth report for PM/EPM spare parts. These sources are strong candidates for future draft item suggestions, but they should not be used for automatic BusinessDocument creation yet.

Current staging data supports model context from `ServiceReport` and `ReportEquipmentItem`, but product, parts-used, Maven item, Maven document item, and business document item tables are empty. Therefore the safe next step is a read-only matching prototype/report, not import or write automation.

## Source Files Found

| Source | Path | Evidence / Use |
|---|---|---|
| PM spare parts workbook | `data-sources/vendor-spare-parts/Spare Parts Service List(PM Series) rev3 (1).xls` | Vendor PM/APM spare-parts source. File exists locally; size 55,794 bytes. |
| EPM spare parts workbook | `data-sources/vendor-spare-parts/Spare Parts Service List(EPM Series) rev2 (1).xls` | Vendor EPM spare-parts source. File exists locally; size 122,368 bytes. |
| Existing analysis report | `PM_EPM_SPARE_PARTS_SOURCE_OF_TRUTH_REPORT.md` | Prior read-only extraction found 569 spare-part rows, 19 compressor models, 213 unique part numbers, and purchase price values for all rows. |
| AI Draft field mapping | `project-brain/maps/AI_DRAFT_FIELD_MAPPING.md` | Defines ServiceReports, ReportEquipmentItems, PartsUsed, ProductsCatalog, InvoiceMavenDocuments, and InvoiceMavenDocumentItems as AI Draft inputs. |
| Legacy AI Draft preview logic | `apps-script/AIDraftHistory.js` | Existing preview-only logic for catalog matching, historical Maven matching, fixed visit/labor pricing, and `NeedsPriceApproval`. |
| Prisma schema | `prisma/schema.prisma` | Defines future target fields for `Product`, `PartUsed`, `AiDraftSuggestion`, `BusinessDocumentItem`, `MavenDocumentItem`, and `MavenItem`. |

## Relevant Columns

Vendor PM/EPM spare-parts workbooks expose these useful columns according to the existing source-of-truth report:

| Column | Proposed meaning |
|---|---|
| `Item` | Vendor row number / line ordering evidence. |
| `Model` | Compressor model compatibility, for example `40PM`, `20PM2`, `50EPM`. |
| `Code` | Candidate SKU / supplier part number. |
| `spare parts name` | Candidate item name. |
| `specification` | Product description/specification. |
| `Unit` | Quantity unit for draft line. |
| `Rated qty for each` | Per-machine rated quantity evidence. |
| `Quotation (US$) Per Each` | Vendor purchase price evidence only, not approved selling price. |
| `2000H`, `4000H`, `8000H`, `12000H`, `16000H`, `20000H`, `24000H`, `30000H` | Service interval quantity candidates. |
| `First exchange time`, `Second exchange time`, `Remark` | Maintenance interval notes and review evidence. |

Existing Prisma target fields:

| Model | Fields relevant to draft item suggestions |
|---|---|
| `ReportEquipmentItem` | `serviceReportId`, `sourceReportId`, `reportCounter`, `equipmentModel`, `equipmentType`, `compressorCategory`, `serviceDescription`, `currentHours`, `nextService`, `technicianRecommendations`. |
| `PartUsed` | `serviceReportId`, `productId`, `partName`, `partSku`, `quantity`, `equipmentReference`, `matchSource`, `matchConfidence`, `needsUserApproval`. |
| `Product` | `sku`, `name`, `description`, `category`, `subcategory`, `brand`, `supplier`, `purchasePrice`, `sellingPrice`, `currency`, `compatibleEquipment`. |
| `BusinessDocumentItem` | `businessDocumentId`, `productId`, `itemName`, `description`, `quantity`, `unitPrice`, `totalPrice`, `source`, `itemType`, `needsPriceApproval`, `matchConfidence`. |
| `MavenDocumentItem` | `itemDescription`, `quantity`, `unitPrice`, `lineTotal`, `currency`, `documentDate`, `customerId`. |
| `MavenItem` | `sku`, `externalItemNumber`, `itemName`, `itemDescription`, `unitPrice`, `purchasePrice`, `currency`, `stockQuantity`. |

## Product / SKU Columns

Primary SKU source:

1. Vendor workbook `Code`.
2. Future `Product.sku`.
3. Existing legacy `ProductsCatalog.SKU` in Apps Script preview logic.
4. Future `MavenItem.sku` or `MavenItem.externalItemNumber`.

Product display fields:

1. Vendor `spare parts name`.
2. Vendor `specification`.
3. Future `Product.name` and `Product.description`.
4. Historical `MavenDocumentItem.itemDescription`.

## Compressor Model Columns

Model matching should read:

1. `ReportEquipmentItem.equipmentModel`.
2. `ReportEquipmentItem.compressorCategory`.
3. `ReportEquipmentItem.equipmentType`.
4. `ReportEquipmentItem.serviceDescription`.
5. Vendor workbook `Model`.
6. Future `Product.compatibleEquipment`.

Read-only staging evidence shows real equipment values such as:

| ReportCounter | Equipment model | Service description |
|---|---|---|
| `5802` | `100APM-8` | Installation by quote. |
| `5804` | `10APM` | New screw compressor installation. |
| `5806` | `SCR-40PM` | 2000-hour small service. |
| `5807` | `SCR20APM` | Initial service. |
| `5809` | `SCR20EPM` | 2000-hour service. |
| `5838` | `SCR50EPM` | Small service. |
| `5861` | `SCR100APM` | Initial service. |

## Oil / Filter / Belt / Part Descriptions

Relevant part-description terms already appear in source logic and reports:

| Term family | Evidence source | Matching use |
|---|---|---|
| Oil filter | Vendor `spare parts name`; legacy ReportEquipmentItems fields; `apps-script/AIDraftHistory.js` search terms. | Match `Oil Filter`, oil-filter Hebrew labels, and SKU codes such as `25200007-005` / `25200018-005`. |
| Oil separator | Vendor `spare parts name`; service report equipment fields. | Match `oil separator`, separator Hebrew labels, and SKU codes such as `25300045-023`, `25300065-031`, `25300220-022`. |
| Air filter | Vendor `spare parts name`; service report equipment fields. | Match `air filter core`, `Safety Filter Core`, and Hebrew air-filter labels. |
| Coolant / oil | Vendor part `80000175-039` appears as `Coolant`; service reports contain oil-related fields. | Suggest as lubricant/coolant line only when service interval and model match. |
| Belts | Service descriptions mention belt replacement in current data; vendor PM/EPM report does not make belts a primary highlighted source. | Treat belt suggestions as lower confidence unless SKU evidence exists in Product/Maven history. |
| Service kit items | Vendor service-hour columns. | Generate candidate items for model + interval only after interval logic is approved. |

## Model To SKU Matching Logic

Recommended algorithm for future read-only prototype:

1. Normalize the equipment model:
   - uppercase
   - remove whitespace and hyphens
   - strip leading text around `SCR`
   - preserve model size and family suffix
2. Apply the Model Identity Rule before extracting model family candidates:
   - Generic equipment descriptions must stay separate from specific model records.
   - `מדחס 20 כ"ס`, `מדחס בורגי 20 כ"ס`, and `20HP compressor` must not be merged into `SCR-20EPM` or any other specific model by horsepower alone.
   - Classify generic rows as `UNKNOWN_MODEL` / `GENERIC_HP_CLASS`.
   - Use horsepower only as an attribute, not as model identity.
   - Do not use generic equipment names for automatic SKU matching.
   - Upgrade a generic row to a specific model only when additional evidence exists: exact model name, serial number, customer equipment registry match, repeated service history match, manufacturer/model pair, or approved Liad mapping.
3. Extract model family candidates:
   - `SCR20APM` -> `20APM`, `20PM`, review alias `20PM2`
   - `100APM-8` -> `100APM`, `100PM`
   - `SCR-40PM` -> `40PM`
   - `SCR50EPM` -> `50EPM`
4. Apply governed aliases:
   - PM = APM is documented in `PM_EPM_SPARE_PARTS_SOURCE_OF_TRUTH_REPORT.md`.
   - PM2 mappings for `10PM2`, `15PM2`, `20PM2` require human review before automatic use.
5. Match vendor rows where normalized vendor `Model` equals an approved model candidate.
6. Infer service interval from:
   - `ReportEquipmentItem.serviceDescription`
   - `ReportEquipmentItem.nextService`
   - `ReportEquipmentItem.currentHours`
   - report notes, only if later exposed in the adapter
7. Choose rows with nonzero quantity for the matched interval column.
8. Output candidate lines with confidence and source evidence, not approved invoice lines.

Confidence proposal:

| Match evidence | Confidence |
|---|---:|
| Exact model + exact SKU/product catalog match + approved selling price | 95 |
| Exact model + vendor SKU + historical Maven price match | 85 |
| Exact model + vendor SKU + vendor purchase price only | 70, price approval required |
| Alias model, such as APM -> PM, with approved alias | 75-85 depending on price source |
| PM2 alias not approved | 50, manual review required |
| Generic horsepower class only, such as `20HP compressor` | 0 for automatic SKU matching; classify as `UNKNOWN_MODEL` / `GENERIC_HP_CLASS` |
| Text-only part description match | 40-65, manual review required |

## Part Description To SKU Matching Logic

Recommended order:

1. Exact `PartUsed.partSku` to `Product.sku`.
2. Exact `PartUsed.partSku` to vendor workbook `Code`.
3. Exact normalized `PartUsed.partName` to `Product.name`.
4. Exact normalized `PartUsed.partName` to vendor `spare parts name`.
5. Description contains match against `Product.description`, `Product.compatibleEquipment`, or vendor `specification`.
6. Historical text match against `MavenDocumentItem.itemDescription`.
7. Service description keyword match, for example oil filter / oil separator / air filter / coolant / belt.

Every non-exact match should set `needsPriceApproval = true` unless it has a strong historical/catalog price match.

## Historical Price Lookup Logic

Existing price-priority rules are already documented in `project-brain/maps/AI_DRAFT_FIELD_MAPPING.md`:

1. ProductsCatalog direct match.
2. Same equipment/model/service history.
3. Same customer previous documents.
4. Similar customers/services.
5. AI suggested price.

Existing preview implementation in `apps-script/AIDraftHistory.js` uses:

- `ProductsCatalog.SKU`, `ProductName`, `ProductDescription`, `CompatibleEquipment`, `SellingPrice`.
- `InvoiceMavenDocumentItems` description, quantity, price, total, and document ID.
- Fixed pricing: technician visit `300` NIS, technician labor `275` NIS/hour.
- `NeedsPriceApproval = true` when quantity is missing, price is missing, or confidence is below threshold.

Current staging counts are important:

| Model | Current staging count |
|---|---:|
| `Product` | 0 |
| `PartUsed` | 0 |
| `MavenDocumentItem` | 0 |
| `MavenItem` | 0 |
| `BusinessDocumentItem` | 0 |
| `ReportEquipmentItem` | 75 |
| `ServiceReport` | 63 |

Because product and historical Maven item tables are currently empty in staging, future pricing should be preview-only until Product/Maven data is imported or otherwise populated after approval.

## Links To ServiceReports And ReportEquipmentItems

The safe link path for future suggestions is:

```text
ServiceReport.id
-> ReportEquipmentItem.serviceReportId
-> ReportEquipmentItem.equipmentModel / serviceDescription / currentHours
-> normalized SCR model + inferred service interval
-> vendor model rows + service-hour columns
-> candidate BusinessDocumentItem lines
```

For legacy/AppSheet traceability:

```text
ServiceReport.appsheetReportId / reportCounter / reportNumberText
-> ReportEquipmentItem.sourceReportId / reportCounter
-> vendor source evidence
-> AI Draft suggestedItems JSON
-> BusinessDocumentItem after explicit approval/write workflow
```

## Proposed Draft Item Structure

Future AI Draft `suggestedItems` JSON should use an evidence-rich structure:

```json
{
  "lineType": "part",
  "sourceType": "SCR_VENDOR_SPARE_PARTS",
  "sourceFile": "Spare Parts Service List(PM Series) rev3 (1).xls",
  "sourceModel": "40PM",
  "matchedEquipmentModel": "SCR-40PM",
  "serviceIntervalHours": 2000,
  "sku": "25200007-005",
  "itemName": "Oil Filter",
  "description": "Oil Filter for SCR-40PM 2000H service",
  "quantity": 1,
  "unit": "pcs",
  "purchasePriceEvidence": {
    "amount": 7.69,
    "currency": "USD",
    "source": "Vendor quotation"
  },
  "recommendedUnitPrice": null,
  "recommendedCurrency": "ILS",
  "priceSource": "APPROVAL_REQUIRED",
  "matchConfidence": 70,
  "needsPriceApproval": true,
  "needsUserApproval": true,
  "reasoning": "Exact model and vendor SKU match; selling price policy is not approved."
}
```

Future `BusinessDocumentItem` mapping after explicit approval:

| Draft field | BusinessDocumentItem field |
|---|---|
| `sku` with Product match | `productId` |
| `itemName` | `itemName` |
| `description` | `description` |
| `quantity` | `quantity` |
| approved selling price | `unitPrice` |
| `quantity * unitPrice` | `totalPrice` |
| match source | `source` |
| `lineType` | `itemType` |
| approval flag | `needsPriceApproval` |
| confidence | `matchConfidence` |
| full evidence package | `rawSource` |

## Missing Data

| Missing / incomplete item | Impact |
|---|---|
| `Product` table has 0 rows in staging. | No approved SKU catalog match or selling price source currently exists in Next.js staging. |
| `PartUsed` table has 0 rows in staging. | Cannot yet confirm actual parts used per report from staging. |
| `MavenDocumentItem` and `MavenItem` have 0 rows in staging. | No historical Maven price evidence is available in staging. |
| Vendor prices are USD purchase prices. | Cannot become customer-facing line prices without exchange-rate, markup, VAT, and approval policy. |
| PM2 alias approval is missing. | `SCR20APM -> 20PM2` cannot be automatic yet. |
| Service interval semantics are not approved. | 2000H/4000H/etc quantities may be cumulative or interval-specific. |
| Belt SKU evidence is weak in the PM/EPM source report. | Belt lines should use historical/Product evidence or remain approval-required. |
| ProductsCatalog duplicate SKU blocker exists from Wave 2 dry run. | Product import/reconciliation must resolve duplicate SKU `SCR-20EPM` before catalog use. |

## Risks

| Risk | Mitigation |
|---|---|
| Wrong model alias causes wrong parts. | Use governed AliasRegistry rules and mark PM2 mappings review-required. |
| Vendor purchase price used as selling price. | Keep vendor price as purchase evidence only; require pricing approval. |
| Text matches create false positives. | Prefer exact SKU/model/interval matches and cap confidence for text-only matches. |
| Service interval incorrectly inferred. | Require explicit interval evidence from service description/current hours; otherwise suggest review-only. |
| Duplicate source rows become duplicate document lines. | De-duplicate by model + interval + SKU and keep duplicate evidence in `rawSource`. |
| Empty staging tables make validation thin. | Build read-only prototype first; import Product/Maven/Parts data only after approval. |
| BusinessDocument write path is premature. | Keep suggestions in preview/AI Draft only until approval workflow is implemented. |

## Next Implementation Recommendation

Recommended next safe task:

1. Create a read-only SCR matching preview script/report that accepts one known `ServiceReport` or `ReportEquipmentItem` ID and prints proposed lines from vendor PM/EPM evidence.
2. Do not write `AiDraftSuggestion`, `BusinessDocument`, or `BusinessDocumentItem` rows.
3. Include confidence, source file/sheet/model/SKU evidence, price-source classification, and `needsPriceApproval`.
4. Validate against known populated report equipment examples:
   - `SCR-40PM` at report `5806`
   - `SCR20APM` at report `5807`
   - `SCR20EPM` at report `5809`
   - `SCR50EPM` at report `5838`
5. Stop for explicit approval before Product/Maven/Parts imports, schema changes, or any write workflow.

Not recommended yet:

- Creating BusinessDocuments from this logic.
- Executing AutomationCommands.
- Calling Maven or Invoice4U.
- Importing ProductsCatalog or Maven item history without resolving Wave 2 blockers.
- Treating vendor USD quotation as approved customer price.

## Agent Workflow Result

| Agent | Result |
|---|---|
| Map Guard | `Create New` report is justified; protected systems remain untouched. |
| Builder | Repository evidence was inspected and this report was created. |
| QA | Report is documentation-only and should be validated with `git diff --check`, scope review, and staged-file review. |
| Reviewer | Commit should include only `SCR_SKU_TO_DOCUMENT_DRAFT_ANALYSIS.md`. |
