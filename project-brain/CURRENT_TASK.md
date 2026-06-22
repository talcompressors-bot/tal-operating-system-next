# CURRENT TASK

Last updated: 2026-06-22
Mode: PostgreSQL/Supabase shadow environment planning, documentation only

## Canonical Role

This is the single source for current phase, current task, and next task.

Do not use `project-brain/current/CURRENT_TASK.md` for active state. That path is retired.

## Current Phase

Project Brain Consolidation Phase 1-3 completed. PostgreSQL/Supabase shadow environment planning is next.

## Current Milestone

Startup remote sync, shutdown path, and Reality Check commit comparison are enforced.

## Last Implementation Commit

`315b8cc Fix reality check commit model`

## Last Closeout Commit

`8114210 Sync project brain commit model state`

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
- Project Brain Consolidation Phase 1-3 completed.
- Startup path is enforced through `PROJECT_INDEX.md`.
- Retired current task references were cleaned in `9433855 Clean retired current task references`.
- Official startup command `hey codex` and shutdown command `by codex` were implemented in `e36c35e Implement hey codex and by codex workflow`.
- Reality Check now compares live Git against Project Brain recorded commits, and `hey codex` now fast-forwards from `origin/main` before reading Project Brain when the working tree is clean.
- `315b8cc Fix reality check commit model` is classified as the latest governance implementation commit because it changed Reality Check behavior.
- `8114210 Sync project brain commit model state` is classified as the latest closeout metadata/state-sync commit.

## Current Task

Prepare PostgreSQL/Supabase shadow environment planning after consolidation. This is planning only, not implementation.

## Next Approved Task

PostgreSQL/Supabase shadow environment planning, not implementation.

## Approved Architecture Decisions In Force

- `PROJECT_INDEX.md` is the mandatory startup entrypoint.
- `hey codex` is the official startup command.
- `by codex` is the official shutdown command.
- `hey codex` must fetch and fast-forward from `origin/main` before reading Project Brain when the working tree is clean.
- Project Reality Check must compare live Git latest commit against Last Implementation Commit and Last Closeout Commit recorded in `PROJECT_INDEX.md` and `project-brain/CURRENT_TASK.md`.
- If live Git latest commit equals Last Closeout Commit, Project Brain is synchronized even when Last Implementation Commit is older.
- If live Git latest commit is a closeout/state-sync metadata commit newer than Last Closeout Commit, it does not require another sync just to record its own hash.
- Last Implementation Commit changes only when actual implementation changed; Last Closeout Commit is an optional marker for the last meaningful closeout/state-sync milestone, not every closeout commit.
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
- No PostgreSQL/Supabase environment implementation during planning.
- No Google Sheets writes.
- No AppSheet changes.
- No Maven actions.
- No production Apps Script changes.
- No new agents.
- No new planning/control files unless existing files are searched first and proven insufficient.

## Done When

- PostgreSQL/Supabase shadow environment planning scope is clear.
- No implementation, migration, DB creation, or Prisma command has run.
- Approval requirements are explicit before any environment setup.
