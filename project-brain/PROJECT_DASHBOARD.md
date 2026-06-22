# PROJECT DASHBOARD

Last updated: 2026-06-21
Mode: project brain sync

## Current Project Status

The repository now contains a Next.js shadow app for the Tal Compressors service-report migration. Production remains the legacy stack: AppSheet, Google Sheets, Apps Script, Google Drive, Maven, and email flows.

The Next.js app is not production. It is a shadow/development implementation used to validate UI shape, routing, and data access without touching production systems.

PostgreSQL V1 scope is approved, and the full V1 Prisma schema file exists at `prisma/schema.prisma`.

## Current Verified State

- Next.js shadow app exists.
- Hebrew RTL UI exists.
- ServiceReports list and detail screens exist.
- Adapter reads local snapshot JSON.
- Commit `108b756 Add full PostgreSQL V1 Prisma schema` exists and was pushed to `origin/main`.
- `project-brain/migration/POSTGRESQL_V1_SCOPE.md` is approved as the PostgreSQL V1 scope boundary.
- Full `prisma/schema.prisma` exists.
- Prisma has not been installed.
- No database has been created.
- No migration has been run.
- Production AppSheet and Google Sheets were untouched.
- No Maven, AppSheet, Google Sheets, Prisma runtime, or database writes were performed.

## Live Read-Only Validation Completed

Read-only validation confirmed live source row counts:

| Source | Rows |
|---|---:|
| `Customers_Final` | 763 |
| `ServiceReports` | 63 |
| `ReportEquipmentItems` | 109 |

## Migration Decision State

The earlier Phase 1 Prisma subset was rejected as too narrow and documented. The approved PostgreSQL V1 scope now covers the full Tal Operating System V1 boundary, and the full Prisma schema has been generated as a schema file only.

## Current Active Goal

Prisma validation -> PostgreSQL environment setup -> first shadow import.

This is still shadow migration work. AppSheet and Google Sheets remain production until explicit cutover approval.

## Phase Status

| Area | Status | Notes |
|---|---|---|
| Production AppSheet/Sheets | ACTIVE / UNTOUCHED | Remains the live production system. |
| Next.js shadow app | EXISTS / SHADOW ONLY | Hebrew RTL UI with ServiceReports list/detail. |
| Snapshot adapter | EXISTS | Reads local snapshot JSON for safe development. |
| Live read-only validation | COMPLETED | Counts verified for Customers, ServiceReports, and ReportEquipmentItems. |
| Phase 1 Prisma subset | REJECTED | Too narrow for the real Tal Operating System schema. |
| PostgreSQL V1 scope | APPROVED | `POSTGRESQL_V1_SCOPE.md` defines the full V1 boundary. |
| Prisma schema | EXISTS | `prisma/schema.prisma` created and committed in `108b756`; not validated yet. |
| Prisma install | NOT STARTED | No packages installed. |
| PostgreSQL database | NOT STARTED | No DB created and no migration run. |

## Hard Rules For Next Session

- Validate Prisma before any database work.
- No database creation or migration until validation and explicit approval.
- No Google Sheets writes.
- No AppSheet changes.
- No Maven calls.
- No production Apps Script changes.

## Highest-Value Next Task

Run Prisma validation when approved, then set up the PostgreSQL shadow environment, then perform the first shadow import.
