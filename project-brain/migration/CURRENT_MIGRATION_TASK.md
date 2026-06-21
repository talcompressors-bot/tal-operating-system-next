# CURRENT MIGRATION TASK

Last updated: 2026-06-21
Mode: shutdown state, documentation only

## Current Phase

PostgreSQL V1 scope review.

The migration is no longer at Phase 0 project audit. A Next.js shadow app exists, and the next decision is the full PostgreSQL V1 scope for the Tal Operating System.

## Current Verified State

- Next.js shadow app exists.
- Hebrew RTL UI exists.
- ServiceReports list and detail screens exist.
- Adapter reads local snapshot JSON.
- GitHub push completed.
- Production AppSheet and Google Sheets were untouched.
- Live read-only validation completed:
  - `Customers_Final = 763`
  - `ServiceReports = 62`
  - `ReportEquipmentItems = 108`

## Important Decision

The Phase 1 Prisma subset was rejected as too narrow and documented. It does not cover the full Tal Operating System scope needed before PostgreSQL/Prisma work starts.

## Next Active Goal

Create:

- `project-brain/migration/POSTGRESQL_V1_SCOPE.md`

Goal:

- Define the full Tal Operating System PostgreSQL V1 schema review boundary.
- Decide which domains are active V1, read-only V1, deferred to V2, or excluded.
- Use existing migration docs and live read-only validation as evidence.

## Required Reading

- `project-brain/CURRENT_TASK.md`
- `project-brain/PROJECT_DASHBOARD.md`
- `project-brain/TASK_BOARD.md`
- `project-brain/migration/BUILD_STRATEGY.md`
- `project-brain/migration/REAL_DATA_READ_PLAN.md`
- `project-brain/migration/DATABASE_SCHEMA_V1.md`
- `project-brain/migration/PRISMA_SCHEMA_V1.md`
- `project-brain/migration/DATA_MIGRATION_PLAN.md`
- `project-brain/migration/ARCHITECTURE_DECISIONS.md`

## Rules

- Documentation only.
- No code.
- No Prisma.
- No DB.
- No Google Sheets.
- No AppSheet.
- No Maven.

## Done When

`POSTGRESQL_V1_SCOPE.md` gives tomorrow's session a complete, reviewable Tal Operating System schema scope and prevents restarting from the rejected narrow Phase 1 Prisma subset.
