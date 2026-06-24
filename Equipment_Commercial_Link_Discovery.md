# Equipment to Commercial Link Discovery

Date: 2026-06-24

Scope: read-only discovery. No imports, DB writes, Prisma changes, BusinessDocument actions, Maven actions, Apps Script changes, or AI Draft creation were performed.

## Executive Answer

Equipment identity can be linked to historical Maven pricing: **YES, with limits**.

For SCR-40PM and Service Report 5806 specifically: **YES for existing Maven commercial evidence; PARTIALLY for automation readiness**.

The existing data proves that Service Report 5806 produced Maven commercial documents for SCR/40PM equipment at `רמות מלונקס בע"מ`. It also proves historical Maven pricing for both serials observed in ReportEquipmentItems:

- `SW854751`
- `SW851838`

However, automatic AI Draft pricing is not yet safe because the link is embedded in free-text Maven `RawJson` descriptions and item descriptions, not stored as a normalized ServiceReport-to-Maven-document relationship.

## Sources Inspected

- Google Sheet: `ServiceApp_FIX`
- `ServiceReports`
- `ReportEquipmentItems`
- `InvoiceMavenDocuments`
- `InvoiceMavenDocumentItems`
- `BusinessDocuments`
- `BusinessDocumentItems`
- `AIDraftSuggestions`

## Target Operational Record

Service Report:

- Report number: `5806`
- ReportID: `1e25bbb1`
- CustomerID: `18953`
- Customer: `רמות מלונקס בע"מ`
- Service date: `10/05/2026`
- Service type: `טיפול תקופתי`
- Status: `חתום`

Observed equipment rows:

| ReportEquipmentItems row | ItemID | Model | Serial | Service description | Current hours | Next service |
| --- | --- | --- | --- | --- | --- | --- |
| 43 | `e8c32b28` | `SCR-40PM` | `SW854751` | `בוצע טיפול קטן-2000` | `23235` | `25230-4000` |
| 44 | `6bb28e16` | `SCR-40PM` | `SW851838` | `טיפול תקופתי קטן 2000` | `32327` | `34320-4000` |

Operational conclusion: Report 5806 contains two exact SCR-40PM equipment records with serial numbers and small-service evidence.

## 1. Direct Links

### ServiceReports to ReportEquipmentItems

Direct link exists.

- `ServiceReports.ReportID = 1e25bbb1`
- `ReportEquipmentItems.ReportID = 1e25bbb1`

This links Report 5806 to both SCR-40PM equipment rows.

### Service Report 5806 to Maven Documents

Direct human-readable document references exist in `InvoiceMavenDocuments.RawJson`.

Maven documents found by searching `InvoiceMavenDocuments.RawJson` for `5806`:

| Maven doc | Date | Customer | Description evidence | Items / prices |
| --- | --- | --- | --- | --- |
| `102452` | `18/05/2026` | `רמות מלונקס בע"מ` | `טיפול תקופתי קטן במדחס אוויר דגם 40PM תוצרת SCR COMP [מס מדחס SW85183] ... (דוח שירות 5806)` | Small-service kit `1213.3800`; travel `0.0000`; total `1874.00` |
| `102451` | `18/05/2026` | `רמות מלונקס בע"מ` | `טיפול תקופתי קטן במדחס אוויר דגם 40PM תוצרת SCR COMP [מס מדחס SW854751] ... (דוח שירות 5806)` | Small-service kit `1213.3800`; travel `0.0000`; total `1874.00` |
| `102453` | `18/05/2026` | `רמות מלונקס בע"מ` | `החלפת אלמנטים במייבש אוויר ... (דוח שירות 5806)` | Filter element `500.0000` x2; labor/service `250.0000` x1.5; travel `250.0000`; total `1918.00` |

Important limitation: the internal ReportID `1e25bbb1` was not found in `InvoiceMavenDocuments.RawJson`.

### BusinessDocuments and AI Draft

No direct link was found.

- `BusinessDocuments` search for `5806`: no matching target business document evidence from the available single source row.
- `BusinessDocuments` search for `1e25bbb1`: no match.
- `BusinessDocuments` search for customer ID `18953`: no match.
- `AIDraftSuggestions` search for `5806`: no match.
- `AIDraftSuggestions` search for `SCR-40PM`: no match.
- `BusinessDocumentItems`: no rows available.

Conclusion: the commercial proof is in Maven documents, not in BusinessDocuments or AI Draft data.

## 2. Indirect Links

Indirect links exist through:

- Customer name: `רמות מלונקס בע"מ`
- Equipment model text: `SCR-40PM`, `40PM`, `SCR40PM`, `PM 40`
- Serial numbers: `SW854751`, `SW851838`
- Report reference text: `דוח שירות 5806`
- Service type text: `טיפול תקופתי קטן`, `טיפול תקופתי גדול`, `קריאת שירות`
- Building/location hints: `בניין שלמה`

These links are strong for evidence discovery, but they are not normalized database relationships.

## 3. Customer and Date Correlations

Customer history is abundant:

- `InvoiceMavenDocuments.CustomerName` search for `רמות מלונקס`: 407 matching Maven documents.
- `InvoiceMavenDocumentItems.CustomerName` search for `רמות מלונקס`: 935 matching item rows.

Same-day and near-date check:

- Report 5806 service date: `10/05/2026`
- Maven documents found on `2026-05-10`, `2026-05-11`, and `2026-05-12` did not provide a direct `רמות מלונקס` match for the report.
- The Maven documents explicitly tied to Report 5806 are dated `18/05/2026`.

Conclusion: the proven commercial link is not same-day matching. It is document-text matching through `דוח שירות 5806`.

## 4. Service Report References

The phrase `דוח שירות 5806` appears in Maven document descriptions for `רמות מלונקס בע"מ`.

This is the strongest available link from operational service data to historical commercial data.

Known Maven references:

- `102451`: SCR/40PM small service for `SW854751`
- `102452`: SCR/40PM small service for serial text `SW85183` in Maven description. This appears likely related to `SW851838`, but the Maven text is missing the final digit. Treat as evidence requiring review, not automatic normalization.
- `102453`: dryer/filter element work tied to the same report number, but not SCR-40PM compressor service.

## 5. Document References

Maven commercial documents contain:

- `doc_no`
- `document_date`
- `doc_type`
- `closed` / `closed_by_doc_no` in some rows
- customer name and identification
- free-text service description
- embedded item rows with quantity and unit price

Examples of direct Report 5806 commercial rows:

| Doc | Type | Date | Model / serial evidence | Commercial evidence |
| --- | --- | --- | --- | --- |
| `102451` | `305` | `18/05/2026` | `40PM`, `SW854751`, `דוח שירות 5806` | Small service kit `1213.3800`; travel `0`; total `1874.00` |
| `102452` | `305` | `18/05/2026` | `40PM`, `SW85183`, `דוח שירות 5806` | Small service kit `1213.3800`; travel `0`; total `1874.00` |

Doc type interpretation still needs formal governance before automated use.

## 6. Equipment References Embedded in Descriptions

Maven descriptions contain equipment identity evidence in multiple forms:

- `SCR-40PM`
- `40PM`
- `SCR40PM`
- `PM 40`
- `SCR COMP`
- `S/N: SW851838`
- `מס מדחס SW854751`
- `מס מדחס SW851838`

These are strong evidence tokens, but they require a governed parser and alias rules before automated linking.

## 7. SCR-40PM Historical Pricing Evidence

### Serial `SW854751`

Strong historical Maven evidence exists for the same customer and serial.

Examples:

| Maven doc | Date | Service type | Evidence | Price evidence |
| --- | --- | --- | --- | --- |
| `102451` | `18/05/2026` | Small service, Report 5806 | `40PM`, `SW854751`, `דוח שירות 5806` | Small-service kit `1213.3800`; travel `0`; total `1874.00` |
| `101920` / `2463` | `2025-01-27` | Small service | `40PM`, `SW854751` | Small-service kit `1134.0000`; travel `225.0000`; total `2001.87` |
| `102132` | `2025-07-21` | Small service | `40PM`, `SW854751` | Small-service kit `1134.0000`; travel `225.0000`; extra piping `120.0000` |
| `101821` / `2263` | `2024-10-31` / `2024-10-09` | Large service | `40PM`, `SW854751` | Large-service kit `2808.0000`; labor/service `225.0000` x3; travel `225.0000` |
| `102036` | `2025-04-27` | Large service | `40PM`, `SW854751` | Large-service kit `2808.0000`; labor/service `225.0000` x3; travel `225.0000` |
| `2835` | `29/10/2025` | Future/2026 large service offer | `40PM`, `SW854751` | Large-service kit `3004.5600`; labor/service `250.0000` x3; travel `250.0000` |

### Serial `SW851838`

Strong historical Maven evidence exists for the same customer and serial.

Examples:

| Maven doc | Date | Service type | Evidence | Price evidence |
| --- | --- | --- | --- | --- |
| `102452` | `18/05/2026` | Small service, Report 5806 | `40PM`, `SW85183`, `דוח שירות 5806` | Small-service kit `1213.3800`; travel `0`; total `1874.00` |
| `102035` | `2025-04-27` | Small service | `40PM`, `SW851838` | Small-service kit `1134.0000`; travel `225.0000`; total `2001.87` |
| `102116` | `2025-07-08` | Large service | `40PM`, `SW851838` | Large-service kit `2808.0000`; labor/service `225.0000` x3; travel `225.0000` |
| `101887` / `2410` | `2024-12-31` | Large service | `40PM`, `SW851838` | Large-service kit `2808.0000`; labor/service `225.0000` x3; travel `225.0000`; tubing `50.0000` x2 |
| `101768` | `2024-09-05` | Service call | `SCR-40PM`, `SW851838` | Labor/service `225.0000`; urgent call `225.0000`; travel `225.0000` |
| `101611` / `1989` | `2024-03-27` | Service call | `SCR40PM`, `SW851838` | Oil dipstick `220.0000`; oil `80.0000` x8; labor/service `225.0000` x1.5; travel `225.0000` |
| `102338` / `2834` | `31/01/2026` / `29/10/2025` | Large service | `40PM`, `SW851838` | Large-service kit `3004.5600`; labor/service `250.0000` x3; travel `250.0000` |

### Shared customer/model pricing pattern

Observed pattern for `רמות מלונקס בע"מ` and SCR/40PM:

- 2024-2025 small-service kit: commonly `1134.0000`
- 2026 small-service kit: `1213.3800`
- 2024-2025 large-service kit: commonly `2808.0000`
- 2026 large-service kit/offers: `3004.5600`
- Labor/service: commonly `225.0000`, later examples `250.0000`
- Travel: commonly `225.0000`, later examples `250.0000`
- Report 5806 Maven docs show travel as `0.0000`, with one row noting travel was charged once.

This is pricing evidence, not a contract.

## 8. What Is Proven

Proven:

- Report 5806 exists in `ServiceReports`.
- Report 5806 has two SCR-40PM equipment rows in `ReportEquipmentItems`.
- Both equipment rows have serial numbers.
- Maven documents explicitly reference `דוח שירות 5806`.
- Maven documents explicitly reference `40PM` / SCR compressor context for Report 5806.
- Maven document `102451` explicitly references serial `SW854751`.
- Maven document `102452` likely references `SW851838`, but the visible Maven description shows `SW85183`, missing one digit.
- Historical Maven documents prove repeated customer-specific SCR/40PM pricing for both serials.
- Historical Maven documents prove small-service and large-service kit pricing patterns for this customer/model.

## 9. What Is Not Proven

Not proven:

- A normalized DB relationship from `ServiceReports.ReportID` to Maven document IDs.
- A normalized DB relationship from `ReportEquipmentItems.ItemID` to Maven item rows.
- That `SW85183` in Maven doc `102452` is automatically equal to `SW851838`; this needs review or matching rule approval.
- That historical repeated prices are contractual prices.
- That Maven doc type/status can be ignored. Credits, offers, receipts, invoices, closed status, and duplicates need governance before automation.
- That generic `40PM` text alone is enough for model identity when no serial/customer/report evidence exists.
- That BusinessDocuments or AI Draft currently preserve this link.

## 10. Automation Readiness

The current knowledge graph can support evidence retrieval for SCR-40PM historical pricing, but not fully automatic pricing approval.

Safe future AI Draft input:

- Customer: `רמות מלונקס בע"מ`
- Model: `SCR-40PM` / `40PM` with serial evidence
- Service type: small service / large service when text explicitly says it
- Historical kit price rows
- Historical labor and travel price rows
- Report number references in Maven descriptions

Unsafe automatic actions:

- Creating a BusinessDocument automatically
- Posting to Maven or Invoice4U
- Deducting inventory
- Assigning SKU solely from model text
- Treating historical repeated price as a contract
- Treating `SW85183` as `SW851838` without review
- Ignoring canceled/credit/receipt/offer document type distinctions

## 11. Final Decision

Can SCR-40PM historical pricing be proven from existing data?

**YES, with explicit evidence.**

Can it be used automatically for AI Draft pricing without additional governance?

**PARTIALLY.**

Reason:

The evidence exists and is strong, including Report 5806 references, customer match, model match, serial evidence, service type, item descriptions, and prices. The blocker is not data absence. The blocker is that the links are embedded in free text and Maven raw JSON rather than governed relationship fields.

## 12. Recommended Next Task

Create a read-only `ServiceReport-to-Maven Link Registry` specification.

Minimum requirements:

- Link source: exact report number in Maven document text.
- Link confidence levels:
  - HIGH: report number + customer + model + serial.
  - MEDIUM: report number + customer + model, serial missing or partial.
  - LOW: customer + date + generic model text only.
- Serial typo handling rule:
  - partial serials require review unless approved by Liad.
- Maven document type/status rule:
  - separate offers, invoices, receipts, credits, and canceled documents.
- Output fields:
  - serviceReportNumber
  - reportId if available
  - customerName
  - model
  - serial
  - mavenDocNo
  - mavenDocType
  - mavenDate
  - linkedItemRows
  - confidence
  - needsReview

This should remain documentation/specification before implementation.
