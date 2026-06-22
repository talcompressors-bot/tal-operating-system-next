# TASK BOARD

Last updated: 2026-06-22
Mode: PostgreSQL/Supabase shadow environment planning, documentation only

## NOW

| Task | Goal | Test / Done | Approval Needed |
|---|---|---|---|
| PostgreSQL/Supabase shadow environment planning | Define the planning scope for the next shadow environment step without implementation | Planning boundaries are clear; no DB creation, migration, Prisma command, or Supabase setup has run | Yes before implementation |

## NEXT

| Task | Goal | Test / Done | Approval Needed |
|---|---|---|---|
| PostgreSQL/Supabase shadow environment implementation | Create the shadow PostgreSQL environment only after planning and explicit approval | Shadow DB environment exists; no production cutover; no migration until separately approved | Yes |
| Import mapping and import validation | Map source rows to PostgreSQL and validate exclusions before import | `ReportEquipmentItems` imports only rows linked to real `ServiceReports`; legacy/test exclusions are reported | Yes before running import |
| Server Actions architecture | Make internal Next.js write flows use Server Actions by default | Approvals, AI draft approval, BusinessDocument creation, ServiceReport shadow updates, import review, queue commands, PostgreSQL mutations, and offline sync actions have Server Action paths | Yes before write implementation |
| Offline queue/PWA sync | Support field work without internet | Local pending actions sync automatically; conflicts are logged for review and not silently overwritten | Yes before sync implementation |
| VPS/Remote Development planning | Select an open full development environment for remote work | Candidate supports terminal, full repo, Git/GitHub, Codex CLI, VS Code Server/browser IDE, Next.js, Prisma/PostgreSQL, future agents, SSH, mobile/tablet access, secrets, backups, and rollback | Yes before provisioning |

## DONE

| Task | Evidence |
|---|---|
| Governance foundation completed | `PROJECT_OPERATING_PROTOCOL.md` exists and remains highest authority/governor |
| Project Brain startup alignment Phase 1 | Startup now begins with `PROJECT_INDEX.md`; retired current-task path is a stub |
| Next.js shadow app created | App exists as shadow/development implementation only |
| Hebrew RTL UI created | Next.js UI supports Hebrew RTL direction |
| ServiceReports list/detail created | Shadow app includes ServiceReports list and detail screens |
| Snapshot JSON adapter created | Adapter reads local snapshot JSON instead of production sources |
| Live read-only validation completed | `Customers_Final = 763`, `ServiceReports = 62`, `ReportEquipmentItems = 108` |
| Narrow Phase 1 Prisma subset rejected | Documented as too narrow for Tal Operating System V1 |
| PostgreSQL V1 scope approved | `project-brain/migration/POSTGRESQL_V1_SCOPE.md` approved as final V1 scope before Prisma generation |
| Full Prisma schema created | `prisma/schema.prisma` created from the approved full V1 scope |
| Prisma schema committed and pushed | Commit `108b756 Add full PostgreSQL V1 Prisma schema` exists on `origin/main` |
| Prisma validation tooling added | Commit `00e2067 Add Prisma validation tooling` |
| Prisma schema validated | Prisma v6.19.3 validation passed with process-only placeholder `DATABASE_URL`; no DB connection or migration |
| Liad architecture decisions documented | Equipment-row exclusion, derived report counter, Server Actions-first, offline-first, and next implementation order recorded in Project Brain docs |
| Remote infrastructure requirement recorded | Future VPS/Remote Development track must use an open full dev environment and avoid restricted control panels/provider lock-in |
| Project Brain Consolidation Phase 1-3 completed | Startup path enforced through `PROJECT_INDEX.md`; retired current task references cleaned |
| Retired current task references cleaned | Commit `9433855 Clean retired current task references` |
| Startup and shutdown workflow enforcement implemented | Commit `e36c35e Implement hey codex and by codex workflow`; `hey codex` starts from `PROJECT_INDEX.md`; `by codex` runs closeout, approved commit, push, and next startup point |
| Reality Check Git sync hardening implemented | Commit `670f4c8 Harden codex startup and reality check sync`; `hey codex` fast-forwards from `origin/main` before Project Brain reads when clean; Reality Check compares live Git with Project Brain recorded commits |

## BLOCKED / NOT STARTED

| Task | Blocker | Next Unblock Step |
|---|---|---|
| PostgreSQL/Supabase environment implementation | Environment setup requires explicit approval after planning | Approve shadow PostgreSQL setup after planning |
| Database migration | No PostgreSQL environment has been created; no migration approval | Approve environment first, then migration plan |
| Import execution | Shadow environment and import validation are not complete | Prepare environment and validate import mapping first |
| Production integration | Shadow app is not approved for production | Keep AppSheet/Sheets production until explicit cutover approval |
| Maven write flow | Not part of current work | Requires separate design and approval |
| New planning/control files | Existing-file audit is required first | Search existing files and prove no owner file already exists |

## Rules

- No production writes.
- Documentation/planning only for the current update.
- No code implementation.
- No Prisma commands.
- No database creation or migration.
- No Google Sheets.
- No AppSheet.
- No Maven.
- No VPS provisioning or remote infrastructure setup.
