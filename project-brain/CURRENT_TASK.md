# CURRENT TASK

Last updated: 2026-06-22
Mode: Supabase staging-first shadow environment planning, documentation only

## Canonical Role

This is the single source for current phase, current task, and next task.

Do not use `project-brain/current/CURRENT_TASK.md` for active state. That path is retired.

## Current Phase

Project Brain Consolidation Phase 1-3 completed. Supabase staging-first shadow environment plan is approved.

## Current Milestone

Startup remote sync, shutdown path, Reality Check commit comparison, and Supabase staging-first shadow plan are enforced.

## Last Implementation Commit

`d1d6f88 Document Supabase staging-first shadow plan`

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
- `2963977 Add master map and agent routing` is classified as the latest governance implementation commit because it changed project governance/routing behavior.
- `8114210 Sync project brain commit model state` is classified as the latest closeout metadata/state-sync commit.
- `d1d6f88 Document Supabase staging-first shadow plan` is classified as the latest governance implementation commit because it changed the approved Supabase shadow environment sequence.
- Supabase staging-first shadow plan is approved: use `talcompressors-next-staging` first, then `talcompressors-next-prod` as production shadow only after staging validation passes.
- Local PostgreSQL is not the first target.
- Staging env placeholder file `.env.staging.example` was prepared with names only: `NEXT_PUBLIC_APP_ENV`, `DATABASE_URL`, and `DIRECT_URL`.
- `.gitignore` blocks real `.env` files while allowing env example files.
- Supabase staging project creation is not complete because no authenticated Supabase CLI/API/browser path is available in this environment.

## Current Task

Create Supabase staging project `talcompressors-next-staging` through an authenticated Supabase path and place real staging secret values outside git.

## Next Approved Task

Authenticated Supabase staging project creation and out-of-git secret value setup only.

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
- Use Supabase Staging first, then Supabase Production Shadow only after staging validation passes; do not use local PostgreSQL as first target.
- Required env variable names are `DATABASE_URL`, `DIRECT_URL`, and `NEXT_PUBLIC_APP_ENV`.
- Optional future Supabase env names are `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY`; do not add them until Supabase client features require them.
- Before any DB push, reconcile Prisma with `DIRECT_URL` and `ReportEquipmentItem.reportCounter`.
- Staging validation must confirm `Customers_Final = 763`, `ServiceReports = 62`, and `ReportEquipmentItems` imports only rows linked to real `ServiceReports`; excluded orphan equipment rows must be reported.
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
- No schema push.
- No import.
- No production cutover.
- No PostgreSQL/Supabase environment implementation during planning.
- No Google Sheets writes.
- No AppSheet changes.
- No Maven actions.
- No production Apps Script changes.
- No new agents.
- No new planning/control files unless existing files are searched first and proven insufficient.

## Done When

- Supabase staging-first shadow environment planning scope is clear.
- Env placeholder and secret ignore rules are prepared.
- Supabase project creation remains pending authenticated access.
- No migration, DB schema action, import, or Prisma command has run.
