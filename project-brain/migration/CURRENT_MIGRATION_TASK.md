# CURRENT MIGRATION TASK

Last updated: 2026-06-21
Mode: project brain sync

## Current Phase

PostgreSQL V1 shadow migration preparation.

The migration is no longer at Phase 0 project audit. A Next.js shadow app exists, PostgreSQL V1 scope is approved, and the full Prisma schema file has been generated.

## Current Verified State

- Next.js shadow app exists.
- Hebrew RTL UI exists.
- ServiceReports list and detail screens exist.
- Adapter reads local snapshot JSON.
- Commit `108b756 Add full PostgreSQL V1 Prisma schema` exists and was pushed to `origin/main`.
- Production AppSheet and Google Sheets were untouched.
- Live read-only validation completed:
  - `Customers_Final = 763`
  - `ServiceReports = 63`
  - `ReportEquipmentItems = 109`
  - Reason: read-only Wave 1 export validation found legitimate business data added after the original baseline.
- `project-brain/migration/POSTGRESQL_V1_SCOPE.md` is approved.
- Full `prisma/schema.prisma` exists.
- Prisma has not been installed.
- No PostgreSQL database has been created.
- No migration has been run.

## Important Decision

The Phase 1 Prisma subset was rejected as too narrow and documented. The approved PostgreSQL V1 scope replaces it as the schema boundary for the Tal Operating System V1 shadow migration.

## Next Active Goal

Prisma validation -> PostgreSQL environment setup -> first shadow import.

Goal:

- Validate `prisma/schema.prisma` before DB work.
- Set up PostgreSQL for shadow migration only after approval.
- Run the first shadow import and report row counts plus import issues.
- Keep production AppSheet, Google Sheets, Apps Script, Maven, Drive, and email flows untouched.

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

Prisma validation is completed and documented, the PostgreSQL shadow environment setup is approved, and the first shadow import can run without touching production.
