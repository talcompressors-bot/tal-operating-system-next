# AI DRAFT PILOT DESIGN

## Goal

Create one safe AI-generated business document recommendation from one ServiceReport.

No Maven document creation in pilot.

---

## Pilot Scope

Input:
One ReportID or ReportCounter.

Output:
One draft recommendation.

Allowed output:
- BusinessDocument recommendation
- BusinessDocumentItems recommendation
- Pricing reasoning
- Approval flags

Forbidden:
- No Maven document creation
- No sending to customer
- No invoice finalization
- No payment status change

---

## Step 1 - Load Data

Read:

- ServiceReports
- ReportEquipmentItems
- PartsUsed
- Customers_Final
- ProductsCatalog
- InvoiceMavenDocuments
- InvoiceMavenDocumentItems

Use:

- ReportID
- ReportCounter
- CustomerID

---

## Step 2 - Analyze Context

Identify:

- Customer
- Equipment
- Service type
- Technician work time
- Replaced parts
- Technician recommendations
- Similar historical documents

---

## Step 3 - Build Recommendation

Create suggested:

- Document type
- Description
- Labor line
- Visit line
- Parts lines
- Optional recommendations

---

## Step 4 - Pricing

Apply priority:

1. ProductsCatalog
2. Same equipment history
3. Same customer history
4. Similar service history
5. AI estimate with approval flag

---

## Step 5 - Approval

Mark:

- NeedsPriceApproval
- NeedsUserApproval
- MissingData
- RiskNotes

---

## Step 6 - Human Review

User reviews before any automation continues.

Only after approval:
BusinessDocuments / BusinessDocumentItems may be created.

Maven draft remains separate approval step.
