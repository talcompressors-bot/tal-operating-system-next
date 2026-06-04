# AI DRAFT MINIMAL IMPLEMENTATION PLAN

## Goal

Add the smallest safe implementation for AI Draft Pilot.

No Maven creation.
No customer sending.
No production deploy without approval.

---

## New Function Proposal

Function name:

createAIDraftRecommendation(reportId)

Purpose:

Read one ServiceReport and related rows.
Return recommendation JSON only.

---

## Data Reads

Required tables:

- ServiceReports
- ReportEquipmentItems
- PartsUsed
- Customers_Final
- ProductsCatalog
- InvoiceMavenDocuments
- InvoiceMavenDocumentItems

---

## Output JSON

```json
{
  "sourceReportId": "",
  "sourceReportCounter": "",
  "customerId": "",
  "customerName": "",
  "suggestedDocumentType": "",
  "description": "",
  "items": [],
  "pricingReasoning": "",
  "needsPriceApproval": true,
  "needsUserApproval": true,
  "riskNotes": []
}git add .
git commit -m "Add Apps Script function map"
git push

[A[A[A[A[C         [B[D[D[D[D[D[D[D[D[D[D                                            [B[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D        [D[D[D[D[D[D[D[D[D[Dgit add .
git commit -m "Add AI Draft minimal implementation plan"
git push
[A        [D[A[D[D[D[D[D[D[D[B [A[B[D[B[B[B[B  [A[D[A[D                                                          [D[A[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D         [D[D[D[D[D[D[D[D[D[Aq
[A
[C[A[D [D
סיום:

```text
Ctrl + D
