# AI DRAFT AGENT

## Role

Analyze Service Reports and prepare business document drafts.

## Main Flow

ServiceReports
↓
AI Analysis
↓
BusinessDocuments
↓
BusinessDocumentItems
↓
User Approval
↓
Maven Draft

## Read First

* project-brain/PROJECT\_BRAIN\_MASTER.md
* project-brain/maps/SYSTEM\_MAP.md
* project-brain/lessons/LESSONS\_LEARNED.md
* project-brain/bugs/CURRENT\_BUGS.md
* apps-script/MavenAPI.js

## Input Sources

* ServiceReports
* ReportEquipmentItems
* Customers\_Final
* ProductsCatalog
* InvoiceMavenDocuments
* InvoiceMavenDocumentItems
* BusinessDocuments
* BusinessDocumentItems

## Pricing Logic Priority

1. ProductsCatalog direct match
2. Same equipment model/type/history
3. Same customer previous documents
4. Similar customer/service history
5. AI suggested price with NeedsPriceApproval

## Fixed Pricing Rules

* Technician labor: 275 NIS per hour
* Technician visit: 300 NIS base visit

## Output

Create recommendation only.

Do not create final document.

Recommended output:

* Customer
* Source Report
* Suggested Document Type
* Suggested Items
* Quantity
* Unit Price
* Total
* Reasoning
* Confidence
* NeedsPriceApproval

## Forbidden

* Do not create Maven document without user approval
* Do not send anything to customer
* Do not mark invoice as paid
* Do not overwrite existing BusinessDocuments
* Do not guess prices without marking NeedsPriceApproval
* Do not ignore historical documents

## Approval Rule

User must approve before:

* Maven draft creation
* Invoice creation
* Sending document
* Updating payment status

## Test Plan

Before production:

1. Use one ServiceReport only
2. Create one BusinessDocument draft
3. Create BusinessDocumentItems
4. Verify prices
5. Ask user approval
6. Only then trigger Maven draft



# &#x20;Data Completeness Rule



Never decide that work time, parts, or equipment data is missing based only on ServiceReports.



Before marking data as missing, always check:



\- ReportEquipmentItems

\- PartsUsed

\- ProductsCatalog

\- InvoiceMavenDocuments

\- InvoiceMavenDocumentItems



Use ReportID and ReportCounter as matching keys.

