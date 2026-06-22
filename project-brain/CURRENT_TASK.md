# CURRENT TASK

Last updated: 2026-06-22
Mode: documentation sync, no implementation

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
- Liad approved the `ReportEquipmentItems` import rule:
  - legacy/test rows created during equipment-add testing must not be imported to PostgreSQL
  - import only rows linked to real `ServiceReports`
  - do not modify Google Sheets or AppSheet
  - keep `serviceReportId` nullable as a safety rule
  - derive nullable `reportCounter` during PostgreSQL import by joining `ReportEquipmentItems.ReportID` -> `ServiceReports.ReportID` -> `ServiceReports.ReportCounter`
  - `reportCounter` is display/search/audit only and must never be used as the primary relationship key
- Liad approved Server Actions first for internal Next.js write flows.
- Liad approved offline-first field work with local pending actions, automatic sync, PostgreSQL as source of truth after sync, and conflict review.
- Liad defined a future VPS/Remote Development track:
  - must use an open full development environment, not a limited control UI
  - must provide terminal, full repo, Git/GitHub, Codex CLI, VS Code Server/browser IDE, Next.js dev/build, Prisma/PostgreSQL tools, future AI agent support, secure SSH, mobile/tablet access, secrets management, backups, and rollback
  - must avoid closed low-code panels, mobile-only restricted interfaces, blocked terminal/Git access, and provider lock-in
  - not immediate implementation

## Next Active Goal

Continue implementation in this order:

1. Prisma validate.
2. PostgreSQL/Supabase environment.
3. Import mapping and import validation.
4. Server Actions architecture.
5. Offline queue/PWA sync.
6. Future VPS/Remote Development planning, after the current shadow migration foundations are stable.

Purpose:

- Validate the existing full PostgreSQL V1 Prisma schema without editing it in this documentation update.
- Prepare the PostgreSQL/Supabase shadow environment only after approval.
- Build import mapping and validation around the approved equipment-row exclusion rule.
- Move internal app mutations toward Server Actions by default.
- Add offline queue/PWA sync design after the server mutation architecture is clear.
- Keep remote infrastructure planning as a later track; do not provision or install anything now.
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
- Documentation update only for the current task.
- Do not modify `prisma/schema.prisma` yet.
- No Prisma install unless explicitly approved.
- No DB creation or migration unless explicitly approved.
- No Google Sheets.
- No AppSheet.
- No Maven.
- No VPS provisioning or remote infrastructure setup.

## Done When

This documentation update is done when the approved Liad decisions are recorded in migration docs and project protocol, `git status --short` is reported, and no commit is made.
