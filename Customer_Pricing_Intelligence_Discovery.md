# Customer Pricing Intelligence Discovery

Task type: Read-only discovery
Runtime impact: none
DB impact: none
Import impact: none
Implementation impact: none

## 1. Executive Summary

The current local repository can support customer service-history discovery, but it cannot yet support customer-specific pricing behavior discovery.

Confirmed local evidence:

- `data-sources/exports/ServiceReports.csv` exists and contains 63 service reports.
- `data-sources/exports/ReportEquipmentItems.csv` exists and contains 109 equipment rows.
- 10 customers have repeated service report history in the local export.
- 2 customer/model repeated equipment-service patterns were found in the local export.

Missing local evidence:

- No local `InvoiceMavenDocuments` export file was found.
- No local `InvoiceMavenDocumentItems` export file was found.
- No local `BusinessDocuments` export file was found.
- No local `BusinessDocumentItems` export file was found.
- No local price-bearing Maven or BusinessDocument item rows were available for this discovery.

Conclusion:

Customer-specific price consistency, price variation, repeated part pricing, repeated labor pricing, repeated travel pricing, and price ranges by customer/service/model cannot be evaluated from current local evidence. No contract behavior is inferred.

## 2. Evidence Sources Inspected

| Source | Availability | Use in This Discovery | Result |
|---|---:|---|---|
| `ServiceReports.csv` | Available | Customer repeat service history | Usable |
| `ReportEquipmentItems.csv` | Available | Customer/model repeated equipment-service patterns | Usable |
| `InvoiceMavenDocuments` | Not available as local export | Customer invoice header history | Blocked |
| `InvoiceMavenDocumentItems` | Not available as local export | Price-bearing item history | Blocked |
| `BusinessDocuments` | Not available as local export | Internal draft/document header history | Blocked |
| `BusinessDocumentItems` | Not available as local export | Internal price-bearing line history | Blocked |
| `data-sources/tools/SHEETS_REGISTRY.md` | Available | Confirms these source tabs exist conceptually | Metadata only |
| `SCR_PRICING_INTELLIGENCE_AUDIT.md` | Available | Prior pricing availability evidence | Confirms no usable staging price history |
| `SCR_MATCHING_PREVIEW.md` | Available | Prior Maven/Product/BusinessDocument item availability evidence | Confirms no usable staging price history |

## 3. Customers With Repeated Service History

Evidence source: `ServiceReports.csv`

Confidence meaning:

- `HIGH`: repeated customer service reports are directly present in the local export.
- This is service-history confidence only, not pricing confidence.

| CustomerID | Customer | Service Report Occurrences | Reports | Service Types | Confidence |
|---|---|---:|---|---|---|
| `187A5` | המדפיס הממשלתי | 3 | `5803`, `5822`, `5836` | אחר; טיפול תקופתי | HIGH |
| `18813` | ליאת אלקטרוניקה בע"מ | 3 | `5826`, `5828`, `5835` | התקנת ציוד | HIGH |
| `1898D` | תויות איכות בע"מ | 2 | `5850`, `5862` | איתור תקלה; תיקון תקלה | HIGH |
| `1894B` | רזונטיקס ישראל בע"מ | 2 | `5827`, `5839` | אחר; איתור תקלה | HIGH |
| `18992` | תעבורה ימית חיפה בע"מ | 2 | `5843`, `5844` | התקנת ציוד | HIGH |
| `18892` | משק חלב ברונובסקי בע"מ | 2 | `5817`, `5821` | אחר; איתור תקלה | HIGH |
| `18953` | רמות מלונקס בע"מ | 2 | `5806`, `5820` | טיפול תקופתי | HIGH |
| `18779` | די.איי.אן.די תעשיות מתכת צפון בע"מ | 2 | `5802`, `5861` | התקנת ציוד; טיפול תקופתי | HIGH |
| `1889D` | מתכת רמת דוד אגש"ח בע"מ | 2 | `5814`, `5848` | אחר; טיפול תקופתי | HIGH |
| `18932` | קונסטנטין את אטש בע"מ | 2 | `5812`, `5832` | טיפול תקופתי | HIGH |

## 4. Repeated Customer / Compressor Model Service Patterns

Evidence sources: `ServiceReports.csv`, `ReportEquipmentItems.csv`

Important limitation: these are service/equipment patterns only. They do not include prices.

| CustomerID | Customer | Compressor Model | Equipment Row Occurrences | Reports | Observed Service Text | Confidence |
|---|---|---|---:|---|---|---|
| `18932` | קונסטנטין את אטש בע"מ | `SCR20XAמס2` | 2 | `5812`, `5832` | Belt/filter service and periodic service evidence | MEDIUM |
| `18953` | רמות מלונקס בע"מ | `SCR-40PM` | 2 | `5806` | Small 2000h service evidence on two equipment rows | MEDIUM |

Confidence note:

- `18932` has repeated reports for the same customer/model.
- `18953` has two `SCR-40PM` equipment rows inside report `5806`; the customer also has repeated service report history, but this specific model repeat is row-level within one report.

## 5. Customer-Specific Pricing Behavior

Required price-bearing sources were not available locally, so the pricing table cannot be populated with real prices.

| Customer | Item | Occurrences | Min Price | Max Price | Average | Confidence |
|---|---|---:|---:|---:|---:|---|
| Not evaluated | Repeated part pricing | 0 usable price rows | UNKNOWN | UNKNOWN | UNKNOWN | BLOCKED: `InvoiceMavenDocumentItems` unavailable |
| Not evaluated | Repeated labor pricing | 0 usable price rows | UNKNOWN | UNKNOWN | UNKNOWN | BLOCKED: `InvoiceMavenDocumentItems` / `BusinessDocumentItems` unavailable |
| Not evaluated | Repeated travel pricing | 0 usable price rows | UNKNOWN | UNKNOWN | UNKNOWN | BLOCKED: `InvoiceMavenDocumentItems` / `BusinessDocumentItems` unavailable |
| Not evaluated | Price ranges by customer | 0 usable price rows | UNKNOWN | UNKNOWN | UNKNOWN | BLOCKED: no local Maven/BusinessDocument item export |
| Not evaluated | Price ranges by service type | 0 usable price rows | UNKNOWN | UNKNOWN | UNKNOWN | BLOCKED: no local price-bearing item rows |
| Not evaluated | Price ranges by compressor model | 0 usable price rows | UNKNOWN | UNKNOWN | UNKNOWN | BLOCKED: no local price-bearing item rows linked to model evidence |

## 6. Strong Pricing Consistency vs Large Variation

No customer can be classified as strong pricing consistency from current local evidence.

No customer can be classified as large pricing variation from current local evidence.

Reason:

- Repeated service history exists.
- Repeated equipment/service patterns exist.
- Actual historical customer item prices are not available in local export files.
- Prior pricing documents also indicate no usable populated staging price history for Maven/Product/BusinessDocument item prices.

Candidate customers for future pricing consistency analysis, once Maven item history is available:

| Priority | CustomerID | Customer | Why Candidate |
|---:|---|---|---|
| 1 | `187A5` | המדפיס הממשלתי | Highest repeated service count in current export |
| 2 | `18813` | ליאת אלקטרוניקה בע"מ | Highest repeated service count in current export |
| 3 | `18932` | קונסטנטין את אטש בע"מ | Repeated customer/model service pattern |
| 4 | `18953` | רמות מלונקס בע"מ | Repeated service history plus `SCR-40PM` evidence packet context |
| 5 | `1889D` | מתכת רמת דוד אגש"ח בע"מ | Repeated service history with periodic service context |

## 7. Required Data to Complete Pricing Discovery

Minimum required read-only inputs:

1. `InvoiceMavenDocumentItems`
   - `CustomerId`
   - `CustomerName`
   - `DocumentDate`
   - `ItemDescription`
   - `Quantity`
   - `UnitPrice`
   - `LineTotal`
   - `DocumentNumber`
   - `MavenDocumentId`

2. `InvoiceMavenDocuments`
   - `MavenDocumentId`
   - `DocumentNumber`
   - `DocumentDate`
   - `CustomerId`
   - `CustomerName`
   - `DocumentType`
   - status/lifecycle fields if available

3. `BusinessDocumentItems`, if available
   - document id
   - item description
   - quantity
   - unit price
   - total price
   - source report id if linked

4. `BusinessDocuments`, if available
   - document id
   - source report id
   - customer id
   - document type
   - lifecycle status

5. Optional but high-value joins
   - `ServiceReports.ReportID`
   - `ServiceReports.CustomerID`
   - `ReportEquipmentItems.ReportID`
   - `ReportEquipmentItems.דגם הציוד`
   - source line references tying Maven/BusinessDocument items to service reports or equipment models

## 8. Risks

| Risk | Level | Reason |
|---|---|---|
| Inferring pricing behavior from service frequency | High | Repeat service does not prove repeat pricing or contract pricing. |
| Treating Maven history as technical model truth | Medium | Maven item text can support pricing evidence but not equipment identity by itself. |
| Treating BusinessDocument drafts as final pricing | Medium | Drafts may not be customer-approved or invoice-final. |
| Mixing labor, travel, and parts lines without item classification | Medium | Requires line-type classification before averages are meaningful. |
| Ignoring quantity when comparing unit prices | Medium | Bulk/kit lines can distort averages. |
| Inferring contracts | High | No contract table or approval evidence was inspected. |

## 9. Safe Future Analysis Method

When price-bearing rows are available, calculate pricing evidence as follows:

1. Group by exact `CustomerId`.
2. Classify item line type: part, labor, travel, service kit, oil, other.
3. Normalize only for analysis display; preserve original item descriptions.
4. Calculate occurrence count, min unit price, max unit price, average unit price, and date range.
5. Link to service type only when source report linkage exists.
6. Link to compressor model only when exact model, approved alias, or validated equipment registry match exists.
7. Flag all inferred matches as `NeedsApproval`.
8. Do not infer contracts from repeat prices.

## 10. Conclusion

Current local evidence supports identifying repeated service customers and candidate customers for future pricing analysis.

Current local evidence does not support customer-specific pricing conclusions.

The next safe step is a read-only export or connector read of `InvoiceMavenDocumentItems` and `InvoiceMavenDocuments`, followed by a no-write customer price range analysis.
