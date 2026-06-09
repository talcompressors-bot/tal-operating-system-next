---
name: ai-draft-recommendation
description: Create or evaluate AI draft business document recommendations from Tal Compressors ServiceReports. Use for AI Draft tests, one-report dry runs, pricing recommendation analysis, BusinessDocuments/BusinessDocumentItems recommendation planning, and workflows involving ServiceReports, ReportEquipmentItems, PartsUsed, ProductsCatalog, InvoiceMavenDocuments, InvoiceMavenDocumentItems, or Maven draft approval gates.
---

# AI Draft Recommendation

Use this skill to analyze one service report and produce a business document draft recommendation.

This skill creates recommendations only. It must not create Maven documents, send email, finalize invoices, update payment status, or modify production status unless the user explicitly approves a later implementation step.

## Required Reads

Before running an AI Draft recommendation, read:

1. `project-brain/PROJECT_BRAIN_MASTER.md`
2. `project-brain/current/CURRENT_TASK.md`
3. `project-brain/maps/SYSTEM_MAP.md`
4. `project-brain/maps/AI_DRAFT_FIELD_MAPPING.md`
5. `project-brain/lessons/LESSONS_LEARNED.md`
6. `project-brain/bugs/CURRENT_BUGS.md`
7. `agents/AI_DRAFT_AGENT.md`
8. `agents/AI_DRAFT_EXECUTION_CHECKLIST.md`
9. `agents/AI_DRAFT_OUTPUT_TEMPLATE.md`

If Maven behavior is involved, also read:

- `agents/MAVEN_AGENT.md`
- `project-brain/apps-script/MavenAPI.gs`
- `project-brain/maps/APPS_SCRIPT_MAP.md`

## Input Scope

Use one existing `ServiceReport` only unless the user explicitly requests a broader batch.

Required identifier:

- `ReportID` or `ReportCounter`

If the identifier is missing, ask for it or report that the run cannot start.

## Required Data Sources

Before marking work time, equipment, parts, or pricing data as missing, check all available relevant sources:

- `ServiceReports`
- `ReportEquipmentItems`
- `PartsUsed`
- `Customers_Final`
- `ProductsCatalog`
- `InvoiceMavenDocuments`
- `InvoiceMavenDocumentItems`
- `BusinessDocuments`
- `BusinessDocumentItems`

Use `ReportID` and `ReportCounter` as matching keys.

If any required table is unavailable, stop and report the missing source.

## Main Flow

Follow this flow:

1. Identify the source service report.
2. Identify customer.
3. Identify equipment.
4. Identify service type and technician notes.
5. Identify work time, visit requirement, and used parts.
6. Check catalog and historical pricing.
7. Build suggested document type.
8. Build suggested line items.
9. Mark confidence and approval flags.
10. Present recommendation for user review.

Target business flow:

```text
ServiceReports
-> AI Analysis
-> BusinessDocuments
-> BusinessDocumentItems
-> User Approval
-> Maven Draft
```

The skill itself should stop at recommendation unless the user explicitly approves creating internal draft rows.

## Pricing Priority

Use this pricing priority:

1. ProductsCatalog direct match
2. Same customer + same equipment model
3. Same customer + same equipment type
4. Same equipment model across all customers
5. Same equipment type and HP/kW range
6. Similar service type
7. AI estimate with approval required

Never invent prices when historical data exists.

## Fixed Pricing Rules

Use these fixed prices when applicable:

- Technician labor: 275 NIS per hour
- Technician visit: 300 NIS base visit

## Approval Flags

Set `NeedsPriceApproval = Yes` when:

- No catalog match exists
- No reliable historical match exists
- Price came from AI estimation
- Historical prices conflict
- Quantity is missing
- Confidence is low

Set `NeedsUserApproval = Yes` for every recommendation before any automation continues.

## Recommended Document Logic

If service was already performed but payment is not confirmed, suggest a business/tax document draft for user approval.

If payment or tax invoice creation is approved by the user, the next-stage recommendation may target a tax invoice.

Allowed internal recommendation statuses, if the user explicitly approves writing internal draft rows:

- `DraftRecommended`
- `WaitingUserApproval`

## Forbidden

- Do not create a Maven document without user approval.
- Do not create a final invoice automatically.
- Do not send anything to the customer.
- Do not update payment status.
- Do not deploy.
- Do not overwrite existing `BusinessDocuments`.
- Do not ignore historical documents.
- Do not mark data missing based only on `ServiceReports`.

## Validation Checklist

Before presenting the recommendation, verify:

- Customer identified
- Equipment identified
- Service type identified
- Labor calculated or marked missing with reason
- Visit line considered
- Parts identified or marked missing with reason
- Historical pricing checked
- `NeedsPriceApproval` set where required
- User approval required before next step

## Output Format

Use this structure:

```text
Source Report
- ReportID:
- ReportCounter:
- Service Date:
- Technician:

Customer
- CustomerID:
- Customer Name:

Equipment
- Equipment Type:
- Model:
- Serial:
- HP:
- Service Type:

Work Summary
- Technician Work Time:
- Visit Required:
- Parts Replaced:
- Technician Notes:

Suggested Document
- Document Type:
- Reason:

Suggested Items
| Item | Qty | Unit Price | Total | Source | Confidence | Needs Approval |
|---|---:|---:|---:|---|---|---|

Pricing Reasoning
- Explain why each item and price was selected.

Historical Matches
- Same equipment:
- Same customer:
- Similar service:

Risks
- Missing price:
- Missing part match:
- Needs user approval:

Final Rule
This is a recommendation only. Do not create Maven document before user approval.
```

## Session Close For AI Draft Tests

When closing an AI Draft test session, summarize:

- Which `ReportID` or `ReportCounter` was tested
- Customer identified
- Equipment identified
- Items suggested
- Prices from fixed rules
- Prices from history
- Prices needing approval
- Bugs or documentation gaps found
- Recommended next step

Do not update Project Brain or Git unless the user explicitly approves that follow-up action.
