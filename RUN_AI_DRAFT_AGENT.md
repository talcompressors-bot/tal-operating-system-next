# RUN AI DRAFT AGENT

## Command

Run AI Draft Agent on one ServiceReport only.

## Required Input

- ReportID or ReportCounter

## Required Reads

- agents/AI_DRAFT_AGENT.md
- agents/AI_DRAFT_AGENT_TEST.md
- project-brain/maps/SYSTEM_MAP.md
- project-brain/lessons/LESSONS_LEARNED.md
- apps-script/MavenAPI.js

## Execution Rules

1. Load one ServiceReport.
2. Load related ReportEquipmentItems.
3. Load customer from Customers_Final.
4. Check ProductsCatalog.
5. Check InvoiceMavenDocuments and InvoiceMavenDocumentItems.
6. Suggest BusinessDocument draft only.
7. Do not create Maven document.
8. Do not send email.
9. Do not update production status.

## Output Format

- Report
- Customer
- Equipment
- Suggested Document Type
- Suggested Items
- Pricing Reasoning
- NeedsPriceApproval
- Risk Notes
- Approval Required
