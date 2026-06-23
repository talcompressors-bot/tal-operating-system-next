# NEXT PHASE STATUS

Date: 2026-06-23  
Scope: read-only project status audit  
Instruction constraints: no code edits, no commit

## Project Reality Check

- Live Git latest commit: `b082d1a Correct staging project facts`
- Git working state before report: clean, `main...origin/main`; `git fetch origin` and `git pull --ff-only origin main` completed and reported already up to date.
- Last Implementation Commit in `PROJECT_INDEX.md`: `143d791 Record Wave 2 connector dry-run validation`
- Last Closeout Commit in `PROJECT_INDEX.md`: `8114210 Sync project brain commit model state`
- Last Implementation Commit in `project-brain/CURRENT_TASK.md`: `143d791 Record Wave 2 connector dry-run validation`
- Last Closeout Commit in `project-brain/CURRENT_TASK.md`: `8114210 Sync project brain commit model state`
- Commit comparison result: live Git is newer than recorded closeout/implementation state. Current Project Brain classifies the present task as staging connectivity blocked, and `DECISION_LOG.md` records the staging project-id correction. No implementation was started in this audit.
- Current phase: Wave 2 Service Workflow Layer; staging PostgreSQL connectivity is blocked by `P1001` to the Supabase pooler.
- Current task: resolve local/network/runtime connectivity to Supabase staging, then rerun read-only Prisma and Next.js route validation.
- Blocked or forbidden actions: no Wave 2 import, DB writes, Prisma schema change, migration, db push, Google Sheets write, AppSheet change, Maven action, Apps Script change, production shadow setup, production cutover, or commit.

## PROJECT TREE

PROJECT
|-- Wave 1 Service Report Core
|   STATUS: COMPLETE
|-- Wave 2 Service Workflow Layer
|   STATUS: CURRENT
|-- Wave 3 Maven Knowledge Layer
|   STATUS: PENDING
|-- Wave 4 Inventory Layer
|   STATUS: PENDING
|-- Wave 5 Offline First
|   STATUS: PENDING
|-- Wave 6 Automation Runtime
|   STATUS: PENDING
|-- Wave 7 Production Shadow
|   STATUS: PENDING
|-- Wave 8 Production Cutover
|   STATUS: PENDING
`-- Wave 9 AppSheet Retirement
    STATUS: PENDING

## CURRENT POSITION

- Current Wave: Wave 2 Service Workflow Layer
- Current Task: staging PostgreSQL connectivity diagnostics blocked by `P1001` to the Supabase pooler; Wave 2 import remains blocked.
- Last Completed Task: Wave 1 service-report core import, PostgreSQL read switch, Wave 1 read/display mapping validation, and Wave 2 connector dry-run validation.
- Next Task: fix Supabase staging connectivity, then rerun read-only Prisma count validation and Next.js route validation.

## PROJECT COMPLETION MODEL

| Capability | Weight | Status | Progress contribution |
|---|---:|---|---:|
| Governance / Project Brain / Git workflow | 15% | Complete | 15% |
| Supabase + Prisma Data Layer | 15% | Complete for V1 schema/staging schema; current connectivity blocked | 15% |
| Import Framework + Wave 1 Import | 10% | Complete | 10% |
| Wave 1 Service Reports UI | 10% | Complete for read-only list/detail | 10% |
| Wave 2 Workflow Layer | 15% | Current, blocked before import | 0% |
| Wave 3 Maven Knowledge Layer | 15% | Pending | 0% |
| Wave 4 Inventory Layer | 10% | Pending | 0% |
| Wave 5 Offline First | 5% | Pending | 0% |
| Wave 6 Automation Runtime | 3% | Pending | 0% |
| Wave 7-9 Production Shadow / Cutover / AppSheet Retirement | 2% | Pending | 0% |

Current migration percentage: 50%.

Basis: capability-weighted evidence from `PROJECT_INDEX.md`, `project-brain/CURRENT_TASK.md`, and `project-brain/TASK_BOARD.md`, not wave-count averaging.

## CRITICAL PATH

Wave 2 Service Workflow Layer -> Wave 3 Maven Knowledge Layer -> Wave 4 Inventory Layer -> Wave 5 Offline First -> Wave 6 Automation Runtime -> Wave 7 Production Shadow -> Wave 8 Production Cutover -> Wave 9 AppSheet Retirement.

## NEXT APPROVAL GATE

- Exact gate: Wave 2 source mapping/blocker resolution approval before any Wave 2 staging import.
- Why approval is required: Wave 2 import would write to Supabase staging and depends on resolving duplicate SKU, example/test rows, shifted log rows, customer-name fallback mapping, title-row skip rules, and enum/status mappings.
- What happens after approval: only then run the approved Wave 2 staging import path. Until then, only read-only validation and planning are approved.

## 1. Current Prisma Models

Current `prisma/schema.prisma` contains 21 models:

1. `Customer`
2. `ServiceReport`
3. `ReportEquipmentItem`
4. `PartUsed`
5. `Product`
6. `InventoryStock`
7. `InventoryTransaction`
8. `AiDraftSuggestion`
9. `BusinessDocument`
10. `BusinessDocumentItem`
11. `BusinessDocumentLog`
12. `AutomationCommand`
13. `MavenCustomer`
14. `MavenDocument`
15. `MavenDocumentItem`
16. `MavenItem`
17. `Approval`
18. `EmailLog`
19. `SyncState`
20. `SyncLog`
21. `ErrorLog`

Current enums:

- `SourceSystem`
- `ServiceReportStatus`
- `BusinessDocumentType`
- `BusinessDocumentStatus`
- `ApprovalStatus`
- `AutomationCommandStatus`
- `AutomationCommandType`
- `AiConfidenceLevel`
- `MatchSource`
- `InventoryTransactionType`
- `MavenSyncStatus`
- `PaymentMethod`

Schema status:

- Full V1 Prisma schema exists.
- Supabase staging schema was already pushed and verified with 21 public V1 tables.
- No Prisma migration has been run.
- Current local read validation is blocked by Supabase pooler connectivity, not by schema mismatch.

## 2. Current Implemented Next.js Pages

Current implemented Next.js route pages under `app/`:

| Route | File | Status |
|---|---|---|
| `/` | `app/page.tsx` | Implemented dashboard/module launcher. Only Service Reports is active; Business Documents, Customers, Equipment/Inventory, and AI Draft cards are disabled/coming soon. |
| `/service-reports` | `app/service-reports/page.tsx` | Implemented read-only service report list. Uses `getServiceReportList()` from `service-report-adapter.ts`. |
| `/service-reports/[id]` | `app/service-reports/[id]/page.tsx` | Implemented read-only service report detail. Uses `getServiceReportById()` and renders report details, recommendations, and equipment items. |

Supporting implementation:

- `app/service-reports/service-report-adapter.ts`
- `app/service-reports/mock-data.ts`
- `app/service-reports/snapshot/service-reports.snapshot.json`
- `app/service-reports/snapshot/SNAPSHOT_DATA_SPEC.md`

Implemented capability summary:

- Wave 1 service report list/detail UI exists.
- Current UI is read-only.
- No Next.js write pages, approval pages, Maven pages, inventory pages, customer detail pages, queue pages, or AppSheet parity pages exist yet.

## 3. Current Missing AppSheet Pages

Evidence basis: `project-brain/maps/SYSTEM_MAP.md` lists current AppSheet tables/actions; `data-sources/tools/SHEETS_REGISTRY.md` lists AppSheet-related sheets; `app/` currently contains only home and service-report routes.

Missing Next.js pages/screens for AppSheet table parity:

| AppSheet / source surface | Current Next.js status | Migration status |
|---|---|---|
| `Customers_Final` customer list/detail | Missing | Required for customer master parity and service history navigation. |
| `ReportEquipmentItems` standalone equipment/child item management | Partially shown inside service report detail only | Missing standalone list/detail/edit surfaces. |
| `InspectionItems` | Missing | Source schema unclear; discovery needed. |
| `PartsUsed` | Missing | Wave 2 blocker; schema/row handling unresolved. |
| `EmailLog` | Missing | Wave 2 blocker; schema incomplete/unclear. |
| `Lists` reference/dropdown values | Missing | Needed later for enum/status mapping and UI choices. |
| `BusinessDocuments` | Missing | Wave 2 core workflow page not implemented. |
| `BusinessDocumentItems` | Missing | Required for document line-item review/approval. |
| `BusinessDocumentLog` | Missing | Required for workflow traceability; current source has shifted-row blocker. |
| `ApprovalsLog` / approval review | Missing | Required for human approval workflow. |
| `AutomationCommands` queue | Missing | Required before replacing AppSheet Bot visibility/queue operations. |
| `ProductsCatalog` | Missing | Required for pricing, SKU resolution, and AI draft support. |
| `AIDraftSuggestions` | Missing | Required for AI recommendation staging/review. |
| `InventoryStock` | Missing | Wave 4 inventory visibility not implemented. |
| `SuppliersProducts` | Missing | Future procurement scope. |
| `InvoiceMavenCustomers` | Missing | Wave 3 Maven reference/history scope. |
| `InvoiceMavenDocuments` | Missing | Wave 3 Maven document history scope. |
| `InvoiceMavenDocumentItems` | Missing | Wave 3 Maven line-item history/pricing scope. |
| `InvoiceMavenItems` | Missing | Wave 3 Maven item/catalog reference scope. |
| `SyncState`, `SyncLog`, `ErrorLog` | Missing | Required for Maven/sync observability, not implemented in Next.js. |
| `AutomationRegistry`, `HealthCheckRegistry`, `SystemHealthLog` | Missing | Governance/system-health UI not implemented. |
| `AppMenu` | Missing | App navigation/config parity not implemented. |
| `SecretAccessLog` | Missing | Sensitive governance table; separate security model required before UI. |

Missing AppSheet action/workflow parity:

- Create New Report.
- Save Report To Drive.
- Generate PDF.
- Send Report Email.
- Create Draft Request.
- Create AutomationCommand.
- Approve Draft.
- Send Draft.
- Queue Processing / Status Updates.

Current conclusion:

- AppSheet retirement is not close. Next.js currently covers only read-only Wave 1 ServiceReports list/detail.
- Most AppSheet operational surfaces remain missing by design because Wave 2-9 are still pending or blocked.

## 4. Current Migration Percentage

Current migration percentage: 50%.

Evidence:

- Governance / Project Brain / Git workflow: complete.
- Supabase + Prisma Data Layer: complete for schema and staging setup, but current connectivity validation is blocked.
- Import Framework + Wave 1 Import: complete.
- Wave 1 Service Reports UI: complete for read-only list/detail.
- Wave 2 Service Workflow Layer: not migrated; connector dry-run passed readability but import readiness is blocked.
- Wave 3 Maven, Wave 4 Inventory, Wave 5 Offline First, Wave 6 Automation Runtime, and Wave 7-9 production shadow/cutover/AppSheet retirement are pending.

Important qualification:

- 50% is a platform capability estimate, not AppSheet feature parity. AppSheet page/workflow parity is much lower because only the ServiceReports read-only module exists in Next.js.

## 5. Recommended Next Implementation Task

Recommended next implementation task:

Resolve Supabase staging connectivity and rerun read-only validation.

Exact task:

1. Load staging env explicitly or temporarily copy ignored `.env.staging` to `.env` for local Prisma commands.
2. Resolve `P1001` connectivity to the Supabase pooler.
3. Run read-only Prisma count validation for Wave 1 tables.
4. Start/validate Next.js routes read-only:
   - `/`
   - `/service-reports`
   - `/service-reports/acd1133d`
5. Confirm no DB writes, imports, schema changes, Google Sheets writes, AppSheet changes, Maven actions, Apps Script changes, or production actions occurred.

Reason:

- It is the current approved unblocker in `project-brain/CURRENT_TASK.md` and `project-brain/TASK_BOARD.md`.
- Wave 2 import planning depends on trusted staging connectivity.
- It does not require production changes or AppSheet changes when kept read-only.

After connectivity is restored:

- Prepare a Wave 2 source mapping/blocker resolution plan covering duplicate SKU `SCR-20EPM`, `PartsUsed` example/test classification, `AIDraftSuggestions.CustomerID` fallback mapping, `BusinessDocumentLog` shifted rows, enum/status mappings, and title-row skip rules.
- Stop before Wave 2 import until explicit approval is granted.

## Systems Confirmed Untouched During This Audit

- No code edited.
- No Prisma schema change.
- No Prisma db push, migrate, import, seed, or DB write.
- No Google Sheets write.
- No AppSheet change.
- No Maven action.
- No Apps Script change.
- No Drive, email, production deployment, or production cutover action.
- No commit.

