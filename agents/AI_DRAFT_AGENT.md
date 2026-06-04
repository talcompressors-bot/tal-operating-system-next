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







# \## Recommended Tax Document Draft



The agent may create an internal recommended draft for:



\- חשבונית עסקה

\- חשבונית מס



Default behavior:



\- If service was already performed but payment is not confirmed:

&#x20; suggest חשבונית עסקה.



\- If payment/tax invoice is approved by user:

&#x20; suggest חשבונית מס.



The agent must only create an internal recommendation in:



\- BusinessDocuments

\- BusinessDocumentItems



Status must be:



DraftRecommended / WaitingUserApproval



Forbidden:



\- Do not create real Maven document without user approval.

\- Do not create final tax invoice automatically.

\- Do not send to customer automatically.



# &#x20;Historical Pricing Logic



Before recommending any price, labor item, service item, or replacement part, the agent must search historical business data.



Priority order:



1\. Same customer + same equipment model.

2\. Same customer + same equipment type.

3\. Same equipment model across all customers.

4\. Same equipment type and HP/kW range.

5\. Similar service type.

6\. ProductsCatalog.

7\. User approval required.



The agent must analyze:



\* InvoiceMavenDocuments

\* InvoiceMavenDocumentItems

\* BusinessDocuments

\* BusinessDocumentItems

\* ProductsCatalog



The agent should identify:



\* Closed deals

\* Converted quotations

\* Repeated service patterns

\* Common labor charges

\* Common travel charges

\* Common replacement parts



The agent should calculate:



\* Recommended price

\* Confidence level

\* Historical source count



Example:



SCR30PM

Small Service 2000 Hours



Result:



\* Travel: 300 NIS

\* Oil Filter: based on 14 similar documents

\* Air Filter: based on 11 similar documents

\* Synthetic Oil: based on 9 similar documents



The agent must explain why every recommended price was selected.



Never invent prices when historical data exists.



If confidence is low:



NeedsPriceApproval = Yes



If confidence is high:



NeedsPriceApproval = No



The final recommendation must always be presented to the user before creating any Maven document.

