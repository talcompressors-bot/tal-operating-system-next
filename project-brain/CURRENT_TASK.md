# CURRENT TASK

Last updated: 2026-06-22
Mode: Supabase staging import dry-run validation planning, no data writes

## Canonical Role

This is the single source for current phase, current task, and next task.

Do not use `project-brain/current/CURRENT_TASK.md` for active state. That path is retired.

## Current Phase

Project Brain Consolidation Phase 1-3 completed. Supabase staging schema is applied and verified. Import dry-run validation is next.

## Current Milestone

Startup remote sync, shutdown path, Reality Check commit comparison, Supabase staging-first shadow plan, staging schema push, and read-only schema verification are complete.

## Last Implementation Commit

`b6b709b Reclassify ReportEquipmentItems exclusions`

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
- Supabase staging project `talcompressors-next-staging` exists and real staging secrets were placed outside git in ignored local env storage.
- No Prisma migration has been run.
- Supabase staging schema push completed with `prisma db push` after explicit staging-only approval.
- Read-only staging schema verification passed: 21 public tables found, no missing/extra V1 tables, indexes and relations matched the approved V1 design.
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
- `fc1dfa8 Prepare Supabase staging env placeholders` is classified as the latest implementation/setup commit because it added staging env placeholders and secret ignore rules.
- `9a81290 Reconcile Prisma schema for Supabase staging` is classified as the latest implementation/schema commit because it added `DIRECT_URL`, `ReportEquipmentItem.reportCounter`, and the report counter index.
- `b6b709b Reclassify ReportEquipmentItems exclusions` is classified as the latest implementation/planning commit because it changed approved migration planning language and import classification for excluded `ReportEquipmentItems` rows.
- Prisma validation passed after reconciliation with process-only placeholder `DATABASE_URL` and `DIRECT_URL`.
- Prisma generate completed against local staging env values after explicit approval.
- Supabase staging-first shadow plan is approved: use `talcompressors-next-staging` first, then `talcompressors-next-prod` as production shadow only after staging validation passes.
- Local PostgreSQL is not the first target.
- Staging env placeholder file `.env.staging.example` was prepared with names only: `NEXT_PUBLIC_APP_ENV`, `DATABASE_URL`, and `DIRECT_URL`.
- `.gitignore` blocks real `.env` files while allowing env example files.
- Known excluded `ReportEquipmentItems` rows are classified as historical test data, not business data, no recovery required, excluded by design: 9 rows missing `ReportID` and 25 rows with unmatched `ReportID`.

## Current Task

Prepare staging import dry-run validation without writing data.

## Next Approved Task

Staging import dry-run validation only after explicit approval.

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
- Prisma is reconciled for `DIRECT_URL` and `ReportEquipmentItem.reportCounter`; any DB push still requires separate approval.
- Staging validation must confirm `Customers_Final = 763`, `ServiceReports = 62`, and `ReportEquipmentItems` imports only rows linked to real `ServiceReports`; legacy/test rows intentionally excluded from import must be reported as historical test data, not business data, no recovery required, excluded by design.
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

- No code implementation unless explicitly approved for dry-run validation.
- No Prisma migration.
- No additional DB creation.
- No additional `prisma db push`.
- No Supabase production setup.
- No additional schema push.
- No real import.
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
