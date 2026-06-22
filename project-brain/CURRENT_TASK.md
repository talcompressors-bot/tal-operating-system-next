# CURRENT TASK

Last updated: 2026-06-22
Mode: Project Brain consolidation, documentation only

## Canonical Role

This is the single source for current phase, current task, and next task.

Do not use `project-brain/current/CURRENT_TASK.md` for active state. That path is retired.

## Current Phase

Project Brain Consolidation before PostgreSQL Environment.

## Current Milestone

Make `PROJECT_INDEX.md` the living project map and enforced navigation screen connected to existing canonical files.

## Last Verified Commit

`00e2067 Add Prisma validation tooling`

## Real Current State

- Next.js shadow app exists.
- Hebrew RTL UI exists.
- ServiceReports list and detail screens exist.
- Adapter reads local snapshot JSON.
- PostgreSQL V1 scope is approved in `project-brain/migration/POSTGRESQL_V1_SCOPE.md`.
- Full `prisma/schema.prisma` exists.
- Prisma tooling was added and committed in `00e2067 Add Prisma validation tooling`.
- Prisma schema validation completed successfully with Prisma v6.19.3 using a process-only placeholder `DATABASE_URL`.
- No PostgreSQL database has been created.
- No migration has been run.
- No DB push has been run.
- Production AppSheet and Google Sheets remain untouched.
- Maven remains untouched.
- Project Brain Phase 1 startup alignment updated the startup path to begin with `PROJECT_INDEX.md`.

## Current Task

Finish Project Brain consolidation cleanup so future Codex/ChatGPT sessions start from one enforced truth path.

## Next Approved Task

After consolidation cleanup, prepare the PostgreSQL/Supabase shadow environment.

PostgreSQL environment work is NEXT, not NOW.

## Approved Architecture Decisions In Force

- `PROJECT_INDEX.md` is the mandatory startup entrypoint.
- `PROJECT_OPERATING_PROTOCOL.md` is the highest authority/governor.
- `project-brain/CURRENT_TASK.md` is the canonical current task/current phase/next task source.
- `project-brain/TASK_BOARD.md` is the canonical task board/progress map.
- Project Brain files win over ChatGPT/Codex memory.
- No new planning file, map, dashboard, control center, protocol, agent, or roadmap may be created before searching existing files and proving no existing file already serves that purpose.
- Import only `ReportEquipmentItems` linked to real `ServiceReports`; exclude legacy/test equipment rows; do not modify Google Sheets/AppSheet; keep the internal FK nullable.
- Derive nullable `ReportEquipmentItem.reportCounter` during PostgreSQL import by joining through `ServiceReports.ReportCounter`; never use it as a primary relationship key.
- Use Server Actions by default for internal Next.js write flows.
- Design field workflows offline-first with conflict review.

## Required Reading For Next Session

- `PROJECT_INDEX.md`
- `PROJECT_OPERATING_PROTOCOL.md`
- `project-brain/CURRENT_TASK.md`
- `project-brain/TASK_BOARD.md`
- `project-brain/DECISION_LOG.md`
- `project-brain/maps/SYSTEM_MAP.md`
- `project-brain/migration/POSTGRESQL_V1_SCOPE.md`
- `project-brain/migration/DATABASE_SCHEMA_V1.md`
- `project-brain/migration/PRISMA_SCHEMA_V1.md`
- `project-brain/migration/DATA_MIGRATION_PLAN.md`
- `prisma/schema.prisma`

## Blocked / Forbidden Actions

- No code implementation during consolidation cleanup.
- No Prisma migration.
- No DB creation.
- No `prisma db push`.
- No Supabase setup until explicitly approved.
- No Google Sheets writes.
- No AppSheet changes.
- No Maven actions.
- No production Apps Script changes.
- No new agents.
- No new planning/control files unless existing files are searched first and proven insufficient.

## Done When

- `PROJECT_INDEX.md` is a living project map with canonical links.
- `project-brain/CURRENT_TASK.md` is the single active current-state source.
- `project-brain/TASK_BOARD.md` shows Project Brain Consolidation as NOW and PostgreSQL Environment as NEXT.
- `project-brain/DECISION_LOG.md` records the consolidation decisions.
- `project-brain/PROJECT_BRAIN_MASTER.md` points active state to `PROJECT_INDEX.md` and this file without duplicating current task details.
