# PROJECT BRAIN MASTER

Status: Durable project memory  
Active-state sources: `PROJECT_INDEX.md` and `project-brain/CURRENT_TASK.md`

This file is durable project memory. It must not duplicate the active current task, current phase, next task, or task board.

For live project reality, start with:

1. `PROJECT_INDEX.md`
2. `project-brain/CURRENT_TASK.md`
3. `project-brain/TASK_BOARD.md`

## Official Current State

Active current state is intentionally not repeated here.

Use:

- `PROJECT_INDEX.md` for the living project map and Project Reality Check.
- `project-brain/CURRENT_TASK.md` for current phase, current task, and next task.
- `project-brain/TASK_BOARD.md` for NOW/NEXT/DONE/BLOCKED status.
- `project-brain/DECISION_LOG.md` for approved decisions.
- `project-brain/maps/SYSTEM_MAP.md` for canonical system map.
- `project-brain/migration/POSTGRESQL_V1_SCOPE.md` for PostgreSQL V1 migration scope.

## Governance Foundation

Current status:

- `PROJECT_OPERATING_PROTOCOL.md` is the official governance and execution protocol.
- `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md` is the future-state comparison guide.
- `project-brain/roadmap/ROADMAP.md` is the official master roadmap.
- `data-sources/tools/SHEETS_REGISTRY.md` is populated from live `ServiceApp_FIX` Google Sheet headers.
- `agents/INFRASTRUCTURE_MANAGER_AGENT.md` is active.
- `agents/INFRASTRUCTURE_REVIEW_TEMPLATE.md` exists.
- `agents/AGENT_REGISTRY.md` includes Infrastructure Manager as an active governance agent.

Rule:

Infrastructure Manager must review architecture, schema, new table, new agent, registry, migration, source-of-truth conflict, and future-platform requests before implementation.

## Project Overview

The project supports service reports, business automation, AI assistance, AppSheet, Apps Script, Google Drive, Maven, and future Invoice4u integration.

Goal:

Create a governed operating platform for:

- Service reports
- Quotes
- Invoices
- Expenses
- Automations
- Documents
- AI recommendations

## Current Architecture

```text
AppSheet
-> Google Sheets
-> Apps Script
-> Business Logic
-> Maven API
-> Invoice4u API (future)
```

Current legacy production layer:

- Google Sheets
- AppSheet
- Apps Script
- Drive
- Maven

Future platform work must not destabilize the current production layer.

## Service Report System

Current known status:

- HTML Report System active
- Web App active
- Signature System active
- Report Data Loading active
- Multi Equipment Support active

Known open tasks:

- A4 Print Layout
- Page Break Logic
- PDF Export Improvements
- Signature Storage Improvements
- Drive Save Improvements

## AppSheet Structure

Main tables:

- ServiceReports
- ReportEquipmentItems
- Customers_Final
- Lists
- InspectionItems
- PartsUsed
- EmailLog
- BusinessDocuments
- BusinessDocumentItems
- BusinessDocumentLog
- AutomationCommands
- ProductsCatalog
- InvoiceMavenDocuments
- InvoiceMavenDocumentItems
- SyncState
- SyncLog

Detailed mapping belongs in:

- `project-brain/maps/APPSHEET_MAP.md`
- `data-sources/tools/SHEETS_REGISTRY.md`

## Apps Script Structure

Main function areas:

- `getReportData()`
- service report rendering and signature handling
- Drive save logic
- email sending
- `createMavenDraft()`
- Maven sync
- AutomationCommands webhook processing

Detailed mapping belongs in:

- `project-brain/maps/APPS_SCRIPT_MAP.md`
- `apps-script/*`

## BusinessDocuments Workflow

Stable queue flow:

```text
BusinessDocuments
-> AutomationCommands
-> AppSheet Bot
-> Apps Script
-> Maven Draft
```

Important distinction:

- `AutomationCommands.Status` uses queue execution states such as Pending, Running, Completed, and Error.
- `BusinessDocuments.DocumentStatus` should be documented separately from queue status.

## AutomationCommands Queue Architecture

Purpose:

Prevent duplicate Bot executions and preserve one safe execution path.

Current status:

Stable working checkpoint.

Rule:

Never allow AppSheet Bot and Apps Script to update the same row simultaneously.

## Maven Integration

Current status:

Maven integration exists and must remain approval-gated.

Known rule:

Never create Maven documents without user approval.

## Invoice4u Future Integration

Planned:

- Quotes
- Invoices
- Credit Notes
- Expense Documents

Approval is required before creation or finalization.

## Expense Invoice Automation

Planned flow:

```text
PDF/Image
-> OCR
-> AI Extraction
-> User Approval
-> Invoice4u
```

Required fields:

- SupplierName
- InvoiceNumber
- InvoiceDate
- DueDate
- TotalAmount
- VAT
- PaymentStatus

## Drive Save Logic

Known issues:

1. Duplicate customer folders.
2. Duplicate report files.
3. Save report not always updating existing file.

Needs investigation.

## Customer Folder Logic

Goal:

One customer folder only.

Never create duplicate folders.

## Report Counter Logic

Current target:

Stable unique numbering.

Known issue:

Duplicate numbering risk around report 5835.

## AI Draft Generation Logic

Status:

Future/pilot work, not the current phase.

Pricing priority:

1. ProductsCatalog
2. Same Equipment History
3. Same Customer History
4. Similar Customers
5. AI Recommendation

Fixed pricing:

- Technician Hour = 275 NIS
- Visit = 300 NIS

AI Draft pilot and implementation planning belong in:

- `project-brain/roadmap/AI_DRAFT_PILOT_DESIGN.md`
- `AI_DRAFT_FLOW_MAP.md`
- `project-brain/roadmap/ROADMAP.md`

## Digital Twin Foundation

Status:

Historical completed/transitioned phase context. Not the active current phase source.

Purpose:

Map the current legacy production system before migration or rebuild.

Initial assets:

- `project-brain/maps/SYSTEM_MAP.md`
- `project-brain/maps/APPSHEET_MAP.md`
- `project-brain/maps/APPS_SCRIPT_MAP.md`
- `data-sources/tools/SHEETS_REGISTRY.md`

Protected systems:

- Apps Script
- Google Sheets live data
- AppSheet production
- Maven
- Drive
- AutomationCommands

## Stable Checkpoints

### Checkpoint 2026-05-25

AutomationCommands Queue Architecture working.

```text
BusinessDocuments
-> AutomationCommands
-> Bot
-> Apps Script
-> Maven
```

Result:

No duplicate executions.

### Checkpoint 2026-06-15

Governance Foundation complete.

Infrastructure Manager V1 active.

Digital Twin Foundation recommended as the next read-only mapping phase.

## Protected Systems

Do not modify without explicit approval.

Service Reports:

- Report Counter Logic
- Signature Logic
- Drive Save Logic
- Customer Folder Logic

Business Documents:

- Queue Architecture
- AutomationCommands
- Maven Draft Flow

Maven Sync:

- Documents Sync
- Items Sync
- Sync State Logic

Any modification requires:

1. Impact Analysis
2. User Approval
3. Rollback Plan

## Known Bugs

### Bug 1

Drive save creates duplicate customer folders.

### Bug 2

Drive save creates duplicate report files.

### Bug 3

Report counter synchronization issue.

## Lessons Learned

### AppSheet

Never allow Bot and Apps Script to update same row simultaneously.

### Apps Script

Prefer queue architecture.

### Debugging

Always isolate logic before changing architecture.

## Roadmap

Official roadmap:

- `project-brain/roadmap/ROADMAP.md`

Current roadmap state:

Do not read current phase from this section.

Read current phase from `PROJECT_INDEX.md` and `project-brain/CURRENT_TASK.md`.

Long-term target architecture:

- `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`

## Project Rules

1. Understand before changing.
2. Prefer modifying existing logic before creating new logic.
3. One change at a time.
4. Use `PROJECT_INDEX.md` as the mandatory startup entrypoint.
5. Use `project-brain/CURRENT_TASK.md` for current phase, current task, and next task.
6. Use `project-brain/TASK_BOARD.md` for task board and progress state.
7. Use `project-brain/roadmap/ROADMAP.md` for roadmap state.
8. Update Project Brain only with approval.
9. Create or propose a checkpoint before risky modifications.
10. AI recommends. Apps Script executes. User approves.

## Change Log

### 2026-06-15

Governance Foundation completed and pushed.

Infrastructure Manager V1 activated.

Master Roadmap established as the official roadmap.

Current phase moved to PHASE 1 - Digital Twin Foundation.

### 2026-06-08

Commit:
585ef51a02ae8709cb1c4ccd0e39967d39a9bd29

Added BusinessDocument-level idempotency guard to Maven queue flow.

Added BusinessDocuments columns:

- ProcessingCommandId
- ProcessingStartedAt

Purpose:

Prevent duplicate AutomationCommands from processing the same BusinessDocumentId.

Recovery rule:

ProcessingCommandId is not auto-cleared when AutomationCommands becomes Error.

If a command fails after claiming a BusinessDocumentId, manual recovery is required before retrying with a different CommandID.

### 2026-05-29

Created Project Brain Master.
GitHub repository connected.
Project Brain initialized.
