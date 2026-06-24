# Commercial Intelligence Verification

Task type: read-only verification
Source: Google Sheets `ServiceApp_FIX`
Spreadsheet ID: `1q6cCUJTNhhrUSok9rrZyFTN9BlrT6-4d7s9CUqrVHh4`
Runtime impact: none
Imports: none
DB writes: none
Maven actions: none
Apps Script changes: none

## 1. Executive Answer

Can Customer Pricing Intelligence be built from the existing data?

**PARTIALLY.**

The existing Google Sheets data is sufficient to build customer-level historical pricing intelligence from Maven document line items:

- customer
- document date
- document number
- item description
- quantity
- unit price
- currency
- labor/service lines
- travel lines
- service/maintenance wording in item descriptions

It is not yet sufficient for fully safe equipment-model-specific pricing intelligence because `InvoiceMavenDocumentItems` does not directly contain `ServiceReportID`, `ReportEquipmentItemID`, serial number, or approved equipment model identity. Compressor model pricing can only be built after a separate evidence join/mapping layer connects Maven line history to ServiceReports / ReportEquipmentItems / Equipment Identity.

## 2. Verified Row Counts

| Dataset | Sheet Exists | Verified Data Rows | Evidence |
|---|---:|---:|---|
| `InvoiceMavenDocuments` | Yes | 8,358 | Sheet grid has 8,359 rows including header; row 8,359 is populated. |
| `InvoiceMavenDocumentItems` | Yes | 20,678 | Sheet grid has 20,679 rows including header; row 20,679 is populated. |
| `BusinessDocuments` | Yes | 1 | Direct range read returned header + one row. |
| `BusinessDocumentItems` | Yes | 0 | Direct range read returned header only. |

## 3. Verified Columns

### `InvoiceMavenDocuments`

Columns verified:

`InvoiceMavenDocumentId`, `DocumentNumber`, `DocumentType`, `CustomerID`, `CustomerName`, `DocumentDate`, `TotalAmount`, `VAT`, `Status`, `PaymentStatus`, `PaymentMethod`, `PaidDate`, `PdfLink`, `RawJson`, `LastSyncDate`, `SyncStatus`, `Notes`, `LinkedBusinessDocumentID`, `DocumentYear`, `DocumentMonth`, `DocumentTypeText`, `CustomerNameClean`

### `InvoiceMavenDocumentItems`

Columns verified:

`ItemRowId`, `MavenDocumentId`, `DocumentNumber`, `DocumentDate`, `CustomerId`, `CustomerName`, `DocumentType`, `ItemDescription`, `Quantity`, `UnitPrice`, `LineTotal`, `Currency`, `RawItem`, `ImportedAt`

### `BusinessDocuments`

Columns verified:

`BusinessDocumentId`, `CustomerId`, `CustomerName`, `SourceReportId`, `SourceReportCounter`, `SourceDocumentId`, `DocumentTypeSuggested`, `DocumentTypeSelected`, `AIReasoning`, `DocumentStatus`, `DraftTitle`, `DocumentDescription`, `ItemsJson`, `SubtotalAmount`, `VATAmount`, `TotalAmount`, `Currency`, `ApprovalStatus`, `ApprovedBy`, `ApprovedAt`, `MavenDocumentId`, `MavenDocumentNumber`, `MavenPdfLink`, `SendByEmail`, `SendByWhatsApp`, `SelectedEmails`, `SelectedPhones`, `SendStatus`, `SendApprovedBy`, `SendApprovedAt`, `LastActionBy`, `LastActionAt`, `CreatedAt`, `UpdatedAt`, `SourceSystem`, `Notes`, `ProcessingCommandId`, `ProcessingStartedAt`

### `BusinessDocumentItems`

Columns verified:

`ItemID`, `DocumentID`, `ItemName`, `Description`, `Quantity`, `UnitPrice`, `TotalPrice`, `Source`, `ItemType`, `NeedsPriceApproval`

## 4. Date Coverage

| Dataset | Earliest Verified Date | Latest Verified Date | Notes |
|---|---|---|---|
| `InvoiceMavenDocuments` | `2018-10-14` | `2026-06-23` | Header rows verified and last rows inspected. |
| `InvoiceMavenDocumentItems` | `2018-10-14` | `2026-06-22` | First and last item rows inspected. Last document row on 2026-06-23 may not yet have item rows in the inspected tail. |
| `BusinessDocuments` | UNKNOWN | UNKNOWN | One row exists, but date fields were blank in the verified row. |
| `BusinessDocumentItems` | N/A | N/A | No rows. |

## 5. Customer Coverage

`InvoiceMavenDocuments` and `InvoiceMavenDocumentItems` both carry customer identity fields:

- `CustomerID` / `CustomerId`
- `CustomerName`

Verified examples include multiple customers in both early and late rows, including:

- טימרת אגודה שיתופית בע"מ
- אסולין קומפרסורים בע"מ
- רמות מלונקס בע"מ
- אתנה בע"מ
- נעימות
- איי אס טי אנד סיינס ישראל בע"מ

Customer-level grouping is feasible from existing Maven data.

Limitation:

- Exact unique customer count was not materialized into this file because the task was read-only verification, not a full local export/import or analytics run.
- The data structure is sufficient to compute unique customer counts in the next analytics step.

## 6. Pricing Coverage

`InvoiceMavenDocumentItems` includes price-bearing row-level fields:

- `Quantity`
- `UnitPrice`
- `LineTotal`
- `Currency`
- `RawItem`

Verified examples:

| Document | Customer | Item | Quantity | Unit Price | Currency |
|---|---|---|---:|---:|---|
| `669` | טימרת אגודה שיתופית בע"מ | עבודה + נסיעות | 1 | 700 | ILS |
| `1000` | אסולין קומפרסורים בע"מ | נסיעה | 2 | 200 | ILS |
| `1000` | אסולין קומפרסורים בע"מ | עבודה | 1 | 100 | ILS |
| `1002` | רמות מלונקס בע"מ | מסנן אוויר | 1 | 300 | ILS |
| `3133` | אתנה בע"מ | עבודה/ביקור טכנאי ונסיעה | 2 | 275 | ILS |
| `60484` | נעימות | מסנן שמן | 1 | 190 | ILS |
| `60484` | נעימות | מפריד שמן | 1 | 950 | ILS |
| `60484` | נעימות | נסיעה | 1 | 250 | ILS |

Pricing coverage is sufficient for customer/item historical price analysis.

Important limitation:

- Some rows have blank `LineTotal`; `UnitPrice` and `Quantity` are the reliable primary fields for pricing intelligence.
- Some rows are blank/empty item rows with `{}` in `RawItem`; these must be filtered out.
- Negative rows exist, such as discounts/benefits; these must be classified separately.

## 7. Labor / Service Line Coverage

Searches against `InvoiceMavenDocumentItems.ItemDescription` verified strong labor/service coverage:

| Search Term | Matched Rows | Interpretation |
|---|---:|---|
| `עבודה` | 3,033 | Labor/work/service labor lines exist. |
| `שירות` | 2,747 | Service lines exist. |
| `טיפול` | 935 | Maintenance/service interval wording exists, including 2000h/4000h examples. |

Verified examples:

- `עבודה`
- `עבודה + שירות`
- `עבודה + נסיעות`
- `טיפול קטן: 2000 ש"ע-עבודה + שירות`
- `טיפול גדול:4000ש"ע-עבודה + שירות`
- `עבודה/ביקור טכנאי ונסיעה`

Conclusion:

Labor/service pricing intelligence can be built from existing data, but line classification rules are required because some item descriptions combine labor, service, and travel in one line.

## 8. Travel Line Coverage

Search against `InvoiceMavenDocumentItems.ItemDescription`:

| Search Term | Matched Rows | Interpretation |
|---|---:|---|
| `נסיעה` | 1,894 | Travel/visit lines exist. |

Verified examples:

- `נסיעה`
- `עבודה + נסיעות`
- `עבודה/ביקור טכנאי ונסיעה`

Conclusion:

Travel pricing intelligence can be built, but line classification must handle combined labor/travel rows separately from pure travel rows.

## 9. Parts / Service Item Coverage

Searches against `InvoiceMavenDocumentItems.ItemDescription` verified recurring compressor-related item coverage:

| Search Term | Matched Rows | Interpretation |
|---|---:|---|
| `מסנן` | 3,539 | Filter lines exist, including air/oil filters. |
| `שמן` | 5,474 | Oil, oil filter, and oil separator lines exist. |
| `טיפול` | 935 | Service interval lines exist. |

Verified examples:

- `מסנן אוויר`
- `מסנן שמן`
- `מפריד שמן`
- `שמן מינרלי`
- `שמן סינטטי SCR-SKR`
- `טיפול קטן: 2000 ש"ע-מסנן אויר`
- `טיפול גדול:4000ש"ע-מפריד שמן`

Conclusion:

Maven line history has enough item description and price evidence to support customer/item pricing intelligence and recurring service-line analysis.

## 10. BusinessDocument Coverage

`BusinessDocuments`:

Verified row:

| BusinessDocumentId | CustomerId | SourceReportId | DocumentStatus | ApprovalStatus |
|---|---|---|---|---|
| `f57ee720` | `18803` | `890331ff` | `DraftRequestReceived` | `Waiting` |

`BusinessDocumentItems`:

- No rows verified.

Conclusion:

BusinessDocuments currently provide workflow/status context only. They do not provide meaningful historical pricing or line-item intelligence yet.

## 11. Sufficiency For Customer Pricing Intelligence

| Capability | Sufficiency | Reason |
|---|---|---|
| Customer-specific repeated item pricing | YES | `InvoiceMavenDocumentItems` has customer, item, quantity, unit price, date, document number. |
| Customer-specific labor pricing | YES | 3,033 `עבודה` matches plus unit prices. |
| Customer-specific travel pricing | YES | 1,894 `נסיעה` matches plus unit prices. |
| Customer price ranges | YES | Customer, item, date, unit price fields exist. |
| Price ranges by service type | PARTIALLY | Service terms exist in item descriptions, but need classification rules. |
| Price ranges by compressor model | PARTIALLY / NOT SAFE YET | Maven items do not directly include equipment model, serial number, or ServiceReport link. |
| BusinessDocument historical pricing | NO | `BusinessDocumentItems` has 0 rows. |
| AI Draft pricing evidence | PARTIALLY | Maven history can provide price evidence; model/equipment matching and approval flags still required. |

## 12. Why The Answer Is PARTIALLY

Customer Pricing Intelligence can be built for:

- customer + item price history
- customer + labor price history
- customer + travel price history
- customer + service wording price history
- customer price ranges over time

It cannot yet be safely built for:

- exact compressor model pricing
- exact service report to Maven invoice matching
- serial-number-specific pricing
- approved AI Draft automatic pricing
- contract inference

The blocker is not missing price data. The blocker is missing identity linkage between Maven commercial history and operational service/equipment records.

## 13. Required Next Step

Build a read-only `Customer Pricing Intelligence` report from `InvoiceMavenDocumentItems` with these gates:

1. Filter blank item rows.
2. Classify line type:
   - part
   - labor
   - travel
   - service package
   - discount/credit
   - other
3. Group by exact `CustomerId`.
4. Preserve original `ItemDescription`.
5. Calculate occurrences, min, max, average, and last used date.
6. Mark service/model linkage as `UNKNOWN` unless exact evidence links Maven row to ServiceReport / ReportEquipmentItems.
7. Do not infer contracts.

## 14. Final Decision

**PARTIALLY.**

The existing data is enough for a real customer/item/labor/travel pricing intelligence layer.

It is not enough for fully safe equipment-model-specific AI Draft pricing without an additional read-only linkage layer between Maven document history and ServiceReports / ReportEquipmentItems / Equipment Identity.
