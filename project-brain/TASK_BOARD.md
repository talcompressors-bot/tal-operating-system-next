# TASK BOARD

Last updated: 2026-06-22
Mode: Supabase staging import dry-run validation planning, no data writes

## NOW

| Task | Goal | Test / Done | Approval Needed |
|---|---|---|---|
| Import dry-run validation planning | Prepare first staging import validation without writing data | Minimal first dry-run is `Customers_Final`, `ServiceReports`, `ReportEquipmentItems`; second-stage discovery includes every Maven-origin Sheets tab and link/classification checks before import | Yes before dry-run execution or script work |

## NEXT

| Task | Goal | Test / Done | Approval Needed |
|---|---|---|---|
| Staging import dry-run validation | Validate source counts, uniqueness, parent links, enum/status mappings, and excluded legacy/test rows without writing data | Dry-run report shows pass/fail, blockers, warnings, and excluded `ReportEquipmentItems` counts | Yes |
| Second-stage Maven dry-run discovery | Confirm all Maven-origin Sheets and their links before import | Known `InvoiceMaven*` tabs plus any other Sheets tabs storing Maven imported/synced/created data are documented with purpose, target table, Customer/BusinessDocument/Product links, and active V1/later V1/future-historical classification | Yes before Maven history import |
| Supabase production shadow setup | Create `talcompressors-next-prod` only after staging validation passes | Production shadow project exists; no production cutover and no AppSheet/Sheets/Maven changes | Yes after staging validation |
| Real staging import | Import validated V1 data into Supabase staging | Requires approved dry-run report; legacy/test `ReportEquipmentItems` rows remain excluded by design | Yes before running import |
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
| Two-commit Reality Check model implemented | Commit `315b8cc Fix reality check commit model`; governance tracks Last Implementation Commit separately from Last Closeout Commit to prevent closeout metadata loops |
| Project Brain commit model state synced | Commit `8114210 Sync project brain commit model state`; classified as closeout metadata/state sync only |
| Closeout commit loop prevention documented | Closeout-only metadata commits do not require another Project Brain sync just to record their own hash |
| Master map and agent routing added | Commit `2963977 Add master map and agent routing`; classified as governance implementation because it changed project routing behavior |
| Supabase staging-first shadow plan approved | Commit `d1d6f88 Document Supabase staging-first shadow plan`; use `talcompressors-next-staging` first and `talcompressors-next-prod` production shadow only after staging validation; local PostgreSQL is not first target |
| Staging env placeholder and secret ignore prepared | Commit `fc1dfa8 Prepare Supabase staging env placeholders`; `.env.staging.example` contains required env names only; `.gitignore` blocks real `.env` files while allowing examples; Supabase project creation remains pending authenticated access |
| Prisma schema reconciled for Supabase staging | Commit `9a81290 Reconcile Prisma schema for Supabase staging`; added `DIRECT_URL`, `ReportEquipmentItem.reportCounter`, and `@@index([reportCounter])`; validation passed with process-only placeholders |
| Supabase staging project and secrets prepared | `talcompressors-next-staging` exists; real `DATABASE_URL`, `DIRECT_URL`, and `NEXT_PUBLIC_APP_ENV` values are stored outside git in ignored local env storage |
| Prisma generate completed for staging | Prisma Client generated with local staging env values after explicit approval; no DB write was performed by generate |
| Supabase staging schema pushed | Staging-only `prisma db push` completed after explicit approval; no migration, seed, import, production action, AppSheet/Sheets/Maven action, or code change occurred |
| Staging schema verification completed | Read-only verification found 21 public V1 tables, no missing/extra V1 tables, and approved indexes/relations/enums present |
| ReportEquipmentItems exclusion terminology updated | Commit `b6b709b Reclassify ReportEquipmentItems exclusions`; 9 rows missing `ReportID` and 25 unmatched `ReportID` rows are classified as historical test data, not business data, no recovery required, excluded by design |

## BLOCKED / NOT STARTED

| Task | Blocker | Next Unblock Step |
|---|---|---|
| Database migration | Migrations are not part of current staging shadow path | Separate approval required before any Prisma migrate workflow |
| Additional schema push | Staging schema is already applied; further schema changes need separate approval | Approve any schema change separately before another db push |
| Import execution | Import dry-run validation is not complete | Approve and run dry-run validation first |
| Production integration | Shadow app is not approved for production | Keep AppSheet/Sheets production until explicit cutover approval |
| Maven write flow | Not part of current work | Requires separate design and approval |
| New planning/control files | Existing-file audit is required first | Search existing files and prove no owner file already exists |

## Rules

- No production writes.
- Documentation/planning only for the current update.
- No code implementation.
- No Prisma commands.
- No database creation or migration.
- No schema push.
- No import.
- No production cutover.
- No Google Sheets.
- No AppSheet.
- No Maven.
- No VPS provisioning or remote infrastructure setup.
- Every task must have an owner agent or explicit `manual/Liad approval` owner before work starts.
