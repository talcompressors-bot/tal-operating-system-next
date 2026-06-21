# CURRENT TASK

Last updated: 2026-06-21
Mode: project brain sync

## Current Phase

PostgreSQL V1 shadow migration preparation.

## Real Current State

- Next.js shadow app exists.
- Hebrew RTL UI exists.
- ServiceReports list and detail screens exist.
- Adapter reads local snapshot JSON.
- Commit `108b756 Add full PostgreSQL V1 Prisma schema` exists and was pushed to `origin/main`.
- Production AppSheet and Google Sheets were untouched.
- Live read-only validation completed:
  - `Customers_Final = 763`
  - `ServiceReports = 62`
  - `ReportEquipmentItems = 108`
- The earlier Phase 1 Prisma subset was rejected as too narrow and documented.
- `project-brain/migration/POSTGRESQL_V1_SCOPE.md` is approved as the PostgreSQL V1 scope boundary.
- Full `prisma/schema.prisma` exists.
- Prisma has not been installed.
- No PostgreSQL database has been created.
- No migration has been run.

## Next Active Goal

Prisma validation -> PostgreSQL environment setup -> first shadow import.

Purpose:

- Validate the generated full PostgreSQL V1 Prisma schema.
- Prepare a shadow PostgreSQL environment only after validation and approval.
- Run the first shadow import with row counts and import issue reporting.
- Keep AppSheet and Google Sheets as production until explicit cutover approval.

## Required Reading For Next Session

- `project-brain/PROJECT_DASHBOARD.md`
- `project-brain/TASK_BOARD.md`
- `project-brain/migration/CURRENT_MIGRATION_TASK.md`
- `project-brain/migration/BUILD_STRATEGY.md`
- `project-brain/migration/REAL_DATA_READ_PLAN.md`
- `project-brain/migration/DATABASE_SCHEMA_V1.md`
- `project-brain/migration/PRISMA_SCHEMA_V1.md`
- `project-brain/migration/DATA_MIGRATION_PLAN.md`
- `project-brain/migration/ARCHITECTURE_DECISIONS.md`
- `project-brain/migration/POSTGRESQL_V1_SCOPE.md`
- `prisma/schema.prisma`

## Rules

- No production writes.
- No Prisma install unless explicitly approved.
- No DB creation or migration unless explicitly approved.
- No Google Sheets.
- No AppSheet.
- No Maven.

## Done When

The next task is done when Prisma validation results are recorded, the shadow PostgreSQL setup path is approved, and the first shadow import plan can proceed without touching production.
