# PROJECT DASHBOARD

Last updated: 2026-06-21
Mode: shutdown state, documentation only

## Current Project Status

The repository now contains a Next.js shadow app for the Tal Compressors service-report migration. Production remains the legacy stack: AppSheet, Google Sheets, Apps Script, Google Drive, Maven, and email flows.

The Next.js app is not production. It is a shadow/development implementation used to validate UI shape, routing, and data access without touching production systems.

## Current Verified State

- Next.js shadow app exists.
- Hebrew RTL UI exists.
- ServiceReports list and detail screens exist.
- Adapter reads local snapshot JSON.
- GitHub push completed.
- Production AppSheet and Google Sheets were untouched.
- No Maven, AppSheet, Google Sheets, Prisma, or database writes were performed as part of shutdown documentation.

## Live Read-Only Validation Completed

Read-only validation confirmed live source row counts:

| Source | Rows |
|---|---:|
| `Customers_Final` | 763 |
| `ServiceReports` | 62 |
| `ReportEquipmentItems` | 108 |

## Migration Decision State

The earlier Phase 1 Prisma subset was rejected as too narrow and documented. The next schema review must cover the full Tal Operating System scope before Prisma generation or database implementation.

## Current Active Goal

Create and review:

- `project-brain/migration/POSTGRESQL_V1_SCOPE.md`

Goal:

- Define the full PostgreSQL V1 scope for the Tal Operating System.
- Review the complete schema boundary before creating Prisma files.
- Keep AppSheet and Google Sheets as production until explicit cutover approval.

## Phase Status

| Area | Status | Notes |
|---|---|---|
| Production AppSheet/Sheets | ACTIVE / UNTOUCHED | Remains the live production system. |
| Next.js shadow app | EXISTS / SHADOW ONLY | Hebrew RTL UI with ServiceReports list/detail. |
| Snapshot adapter | EXISTS | Reads local snapshot JSON for safe development. |
| Live read-only validation | COMPLETED | Counts verified for Customers, ServiceReports, and ReportEquipmentItems. |
| Phase 1 Prisma subset | REJECTED | Too narrow for the real Tal Operating System schema. |
| PostgreSQL V1 | NEXT REVIEW | Needs full scope document before Prisma or DB work. |

## Hard Rules For Next Session

- Documentation only until the next active goal is approved.
- No Prisma generation.
- No database creation or migration.
- No Google Sheets writes.
- No AppSheet changes.
- No Maven calls.
- No production Apps Script changes.

## Highest-Value Next Task

Draft `project-brain/migration/POSTGRESQL_V1_SCOPE.md` as the full Tal Operating System schema review, using today's findings and the existing migration documents as inputs.
