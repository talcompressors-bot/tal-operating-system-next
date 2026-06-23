# CURRENT TASK

Last updated: 2026-06-23
Mode: Service Report central work screen enhanced; next task is populated-module enhancement

## Canonical Role

This is the single source for current phase, current task, and next task.

Do not use `project-brain/current/CURRENT_TASK.md` for active state. That path is retired.

## Current Phase

Project Brain Consolidation Phase 1-3 completed. Supabase staging schema is applied and verified. Wave 1 staging import passed closed-loop validation. Wave 1 Next.js PostgreSQL read/display validation passed after display mapping fixes. Wave 2 connector-based read-only dry-run validation is completed. Real Supabase Prisma connectivity passed outside the network sandbox, confirming earlier `P1001` failures were sandbox/runtime network limitations rather than Supabase/project/env issues. Supabase staging connectivity blocker is resolved. The Customers read-only module is implemented and pushed. Automatic Project Brain closeout sync is required after every completed task. Multi-agent operating workflow docs are implemented and pushed. The ReportEquipmentItems / Equipment read-only module is implemented and pushed. The PartsUsed read-only module is implemented and committed. Data coverage audit is completed. Service Report detail is enhanced as the central read-only work screen. Wave 2 import is not approved.

## Current Milestone

Startup remote sync, shutdown path, Reality Check commit comparison, Supabase staging-first shadow plan, staging schema push, read-only schema verification, Wave 1 staging import execution, Wave 1 read/display mapping fixes, Wave 2 planning/discovery gate approval, Wave 2 connector dry-run validation, real Prisma staging connectivity validation, Customers read-only module implementation, automatic Project Brain closeout sync governance, multi-agent operating workflow docs, ReportEquipmentItems / Equipment read-only module implementation, PartsUsed read-only module implementation, data coverage audit, and Service Report central work-screen enhancement are complete.

## Last Implementation Commit

`71a5435 Enhance service report work screen`

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
- `c11c460 Document import waves plan` is classified as an implementation/planning commit because it changed approved migration planning by defining Waves 1-4 and the Wave 1 gate for service-report replacement readiness.
- `9efa017 Refactor import planning and update Wave 1 baseline` is classified as the latest implementation/planning commit because it refactored Import Waves into agent-readable structured blocks, recorded Wave ownership/blockers/success criteria, and updated Wave 1 baseline counts after read-only source validation found legitimate new business data.
- `3abf7d3 Record Wave 1 staging import pass` is classified as the latest implementation/import commit because it added the Wave 1 staging import script, recorded validation PASS, and documented PostgreSQL staging counts and excluded legacy/test rows.
- `29331fb Read Wave 1 service reports from PostgreSQL` is classified as the latest implementation commit because it switched the Next.js service report list/detail screens from snapshot JSON to read-only PostgreSQL staging reads for Wave 1 data.
- `a28da7b Create autonomous agent orchestration governance` is classified as the latest implementation/governance commit because it made Codex the main Orchestrator for safe work, routed tasks to existing agent owners, and defined the stop-only-at-approval-gates loop.
- `fd76610 Fix Wave 1 service report display mapping` is classified as the latest implementation/read-display commit because it fixed Wave 1 service-report date fallback, pending-signature status display, missing-status fallback, and sparse equipment display without adding writes.
- `7f63193 Require project tree reporting` is classified as the latest implementation/governance commit because it made Project Tree Position mandatory for Reality Checks, Approval Gates, Autonomous Completion Reports, and `by codex` closeout.
- Prisma validation passed after reconciliation with process-only placeholder `DATABASE_URL` and `DIRECT_URL`.
- Prisma generate completed against local staging env values after explicit approval.
- Supabase staging-first shadow plan is approved: use `talcompressors-next-staging` first, then `talcompressors-next-prod` as production shadow only after staging validation passes.
- Local PostgreSQL is not the first target.
- Staging env placeholder file `.env.staging.example` was prepared with names only: `NEXT_PUBLIC_APP_ENV`, `DATABASE_URL`, and `DIRECT_URL`.
- `.gitignore` blocks real `.env` files while allowing env example files.
- Known excluded `ReportEquipmentItems` rows are classified as historical test data, not business data, no recovery required, excluded by design: 9 rows missing `ReportID` and 25 rows with unmatched `ReportID`.
- Import Waves are documented as structured `WAVE_ID` blocks: Wave 1 service-report core; Wave 2 service workflow; Wave 3 Maven data; Wave 4 extended operations.
- Wave 1 staging import ran on 2026-06-22T12:54:25.974Z / 2026-06-22 15:54 IDT against Supabase staging only.
- Wave 1 source CSV files were read from `data-sources/exports/`: `Customers_Final.csv`, `ServiceReports.csv`, and `ReportEquipmentItems.csv`.
- Wave 1 source counts were `Customers_Final = 763`, `ServiceReports = 63`, and `ReportEquipmentItems = 109`.
- Wave 1 DB counts read back through Prisma Client were `customers = 763`, `service_reports = 63`, and `report_equipment_items = 75`.
- Wave 1 excluded legacy/test `ReportEquipmentItems` counts were `9` missing `ReportID` and `25` unmatched `ReportID`; total excluded by design was `34`.
- Wave 1 validation result was `PASS`; validation report and import manifest were generated under ignored local path `data-sources/exports/import-runs/`.
- No Google Sheets writes, AppSheet changes, Maven changes, Apps Script changes, production actions, migrations, schema changes, Prisma db push, seed, or Wave 2/3/4 import occurred during Wave 1 import execution.
- Post-import Wave 1 Next.js review passed: `/service-reports` returned HTTP 200, `/service-reports/acd1133d` returned HTTP 200, 63 service report links rendered, and Prisma readback counts were `customers = 763`, `service_reports = 63`, and `report_equipment_items = 75`.
- Post-import Wave 1 display issues found: `service_date` is null for all 63 reports so dates are missing in UI; status mapping is incomplete because source status `ממתין חתימה` displays as `UNKNOWN`; some equipment fields are sparse, but sample report `acd1133d` renders equipment correctly.
- Wave 1 read/display mapping fixes completed and validated: service dates fall back to `raw_source` service date without DB writes; pending-signature source status maps to `Pending Signature`; missing source status displays as `Status Missing` instead of `UNKNOWN`; sparse equipment rows render safe fallbacks; sample report `acd1133d` renders with equipment details.
- Read-only staging validation after mapping fixes: `service_reports = 63`, `report_equipment_items = 75`, unknown dates `0`, pending-signature statuses `29`, signed statuses `32`, status-missing rows `2`, unknown statuses `0`, sparse fallback failures `0`.
- Read-only HTTP validation after mapping fixes: `/service-reports` HTTP 200, `/service-reports/acd1133d` HTTP 200, 63 service report links rendered, pending-signature display present, no `UNKNOWN DATE`, no `UNKNOWN` status display, sample detail date fallback present, and sample equipment subtitle present.
- Wave 2 connector dry-run validation completed on 2026-06-22 19:13 IDT without local Wave 2 CSV export files after Liad approved connector-only validation.
- Wave 2 read validation result: PASS. All eight approved tabs were readable through the Google Sheets connector: `ProductsCatalog`, `PartsUsed`, `AIDraftSuggestions`, `BusinessDocuments`, `BusinessDocumentItems`, `BusinessDocumentLog`, `ApprovalsLog`, and `EmailLog`.
- Wave 2 import readiness result: FAIL/BLOCKED. Blockers: duplicate SKU `SCR-20EPM`; `PartsUsed` contains one example row `P-EX-1` linked to unresolved `R-EXAMPLE`; `AIDraftSuggestions.CustomerID` contains customer name `רפת יזרעאל מעוז` instead of source ID in one row; `BusinessDocumentLog` rows appear shifted against the header; enum/status mappings require approval.
- Wave 2 observed row counts: `ProductsCatalog = 113`, `PartsUsed = 1`, `AIDraftSuggestions = 2`, `BusinessDocuments = 1`, `BusinessDocumentItems = 0`, `BusinessDocumentLog = 2`, `ApprovalsLog = 0`, `EmailLog = 0`.
- Wave 2 parent-link evidence: `AIDraftSuggestions.SourceReportID = 715fc06e` resolves to Wave 1 service report `5808`; `BusinessDocuments.SourceReportId = 890331ff` resolves to Wave 1 service report `5834`; `BusinessDocuments.CustomerId = 18803` resolves to an existing Wave 1 customer.
- No Google Sheets writes, AppSheet changes, Maven changes, Apps Script changes, DB writes, Supabase writes, imports, Prisma commands, or production actions occurred during Wave 2 connector validation.
- Staging PostgreSQL connectivity diagnostics after `.env.staging` update still failed on 2026-06-22: Prisma cannot reach `aws-1-eu-central-1.pooler.supabase.com:6543`; Next.js home page returns HTTP 200, but `/service-reports` and `/service-reports/acd1133d` return HTTP 500 because Prisma cannot connect.
- Correction: Supabase Project Settings > General verifies staging project id `mdlvxklufrchiabonafm`; earlier Project Brain references to a different staging ref were incorrect.
- Diagnostics found `.env.staging` contains `NEXT_PUBLIC_APP_ENV=staging`, `DATABASE_URL`, and `DIRECT_URL`; the connection user/project reference is `mdlvxklufrchiabonafm`, matching the verified staging project id. Prisma CLI loads `.env` by default, not `.env.staging`; for local Prisma validation, `.env` must be created temporarily from `.env.staging` or env must be loaded explicitly.
- After `.env` was temporarily created from `.env.staging`, `npx.cmd prisma validate` passed and `npx.cmd prisma db pull --print` moved to `P1001` connectivity against `aws-1-eu-central-1.pooler.supabase.com:5432`.
- Actual DB counts could not be read during the latest diagnostics because Prisma cannot connect. No DB writes, imports, migrations, Prisma schema commands, Google Sheets writes, AppSheet changes, Maven changes, Apps Script changes, or production actions occurred.
- Final staging connectivity diagnosis completed after a real read-only Prisma test outside the network sandbox: `customer.count() = 763`, `npx.cmd prisma db pull --print` exit code `0`, and no DB writes or migrations were run. Earlier `P1001` failures were sandbox/runtime network limitations, not a Supabase/project/env issue.
- Customers read-only module implemented in commit `45da4d0 Implement customers read-only module`: `app/customers/page.tsx`, `app/customers/[id]/page.tsx`, and `app/customers/customer-adapter.ts` were added; `app/page.tsx` now links the active Customers card to `/customers`. It uses existing Prisma `Customer` data, Server Component reads, relation counts, and service-report links only. No schema changes, migrations, env changes, DB writes, AppSheet changes, Maven changes, Apps Script changes, or production actions occurred.
- Customers module validation: scoped TypeScript check passed; `/`, `/customers`, `/customers/186DD`, `/service-reports`, and `/service-reports/acd1133d` returned HTTP 200. Full `npm.cmd run build` remains blocked by an existing unrelated missing `playwright` dependency in `scripts/playwright/appsheet-discovery-auth.ts`; `npm.cmd run lint` prompts for initial ESLint setup.
- Automatic Project Brain closeout sync governance implemented in commit `4ed6ca2 Require automatic project brain closeout sync`: `AGENTS.md`, `PROJECT_OPERATING_PROTOCOL.md`, and `PROJECT_INDEX.md` now require Project Brain updates before every final report after a completed task; required closeout fields are completed work, commit hash, validation results, current blocker or `none`, exact next task, approval gates, and project completion percentage; resolved blockers must be removed from current blocker state; final responses must not call a validated resolved issue blocked. Validation: `git diff --check` passed with CRLF warnings only. Project completion percentage remains 50%. No env changes, schema changes, migrations, DB writes/imports, deletes/moves, git remote changes, source-system changes, or production integrations occurred.
- Multi-agent operating workflow implemented in commit `28f9bf2 Add multi-agent operating workflow`: created `project-brain/agents/BUILDER_AGENT.md`, `project-brain/agents/MAP_GUARD_AGENT.md`, `project-brain/agents/QA_AGENT.md`, `project-brain/agents/REVIEWER_AGENT.md`, `project-brain/agents/AGENT_COMMUNICATION_PROTOCOL.md`, and `project-brain/agents/AUTONOMOUS_BUILD_WORKFLOW.md`; updated `AGENTS.md`, `PROJECT_OPERATING_PROTOCOL.md`, and `PROJECT_INDEX.md`. Validation: `git diff --check` passed with CRLF warnings only. Project completion percentage remains 50%. Import approval remained a later gate. No app code, schema, migrations, env files, DB writes/imports, source-system changes, deletes/moves, git remote changes, or production integrations occurred.
- ReportEquipmentItems / Equipment read-only module implemented in commit `3f1761f Add equipment read-only module`: added `/equipment` list, `/equipment/[id]` detail, read-only `ReportEquipmentItem` Prisma adapter, search/filter fields, service-report links, and active dashboard card. Validation: scoped TypeScript check passed; `git diff --check` passed with CRLF warnings only; read-only Prisma lookup found known equipment `3002f879`; local HTTP validation returned 200 for `/`, `/equipment`, `/equipment/3002f879`, `/service-reports`, `/service-reports/5e0eaae3`, and `/customers`. No schema changes, migrations, env changes, DB writes, imports, AppSheet changes, Maven changes, Apps Script changes, source-system changes, or production actions occurred. Project completion percentage is now 52%.
- PartsUsed read-only module implemented in commit `14542b5 Add PartsUsed read-only module`: added `/parts-used` list, `/parts-used/[id]` detail, read-only `PartUsed` Prisma adapter, search/filter fields, service-report/product context links, invalid enum filter hardening, and active dashboard card. Validation: scoped TypeScript check passed; `git diff --check` passed with CRLF warnings only; read-only Prisma validation found `parts_used = 0`; local HTTP validation returned 200 for `/`, `/parts-used`, `/parts-used?matchSource=BAD_VALUE`, `/service-reports`, `/equipment`, and `/customers`, and 404 for `/parts-used/not-a-real-part`. No schema changes, migrations, env changes, DB writes, imports, AppSheet changes, Maven changes, Apps Script changes, source-system changes, or production actions occurred. Current blocker is `none` for this read-only module. Project completion percentage is now 53%.
- Application route map documented in commit `7a8ce9b Add application route map`: created `APPLICATION_ROUTE_MAP.md` listing all implemented Next.js routes, module names, status, data source, record count, and AppSheet equivalent. Validation: actual `app/**/page.tsx` route files were enumerated; read-only Prisma count query verified `customers = 763`, `serviceReports = 63`, `reportEquipmentItems = 75`, `partsUsed = 0`, and `products = 0`; `git diff --check` passed. No app code, schema changes, migrations, env changes, DB writes, imports, source-system changes, or production actions occurred.
- Data coverage audit completed in commit `5a682ec Add data coverage audit`: created `DATA_COVERAGE_AUDIT.md` with read-only Prisma counts and readiness classifications for 19 requested models. Populated models are `Customer = 763`, `ServiceReport = 63`, and `ReportEquipmentItem = 75`. `PartUsed = 0` and `Product = 0` are empty. Inventory, AI draft, business document, automation, Maven, approval, email, sync, and error-log tables are not ready for useful read-only module validation because they have no staging rows. Validation: read-only Prisma counts succeeded; `git diff --check` passed. No app code, schema changes, migrations, env changes, DB writes, imports, source-system changes, or production actions occurred.
- Service Report central work screen enhanced in commit `71a5435 Enhance service report work screen`: `/service-reports/[id]` now shows a customer summary card, equipment summary section, disabled future action buttons for Create AI Draft, Create Business Draft, and Send to Maven, lifecycle placeholders for Draft not created, Maven not sent, and Customer not viewed, plus links to customer and equipment detail pages. Validation: scoped TypeScript passed; `git diff --check` passed with CRLF warnings only; local HTTP validation returned 200 for `/`, `/service-reports`, `/service-reports/acd1133d`, `/customers`, `/equipment`, and `/equipment/3002f879`; detail HTML contained all requested new work-screen labels/placeholders. No schema changes, migrations, env changes, DB writes, imports, AppSheet changes, Maven changes, Apps Script changes, source-system changes, or production actions occurred. Current blocker is `none` for this read-only enhancement. Project completion percentage is now 54%.

## Current Task

Service Report detail is enhanced as the central read-only work screen. Current blocker: none for this read-only enhancement.

## Next Approved Task

Continue enhancing already populated read-only modules, such as adding bidirectional context from Customer and Equipment detail pages back to the central Service Report work screen. Do not build ProductsCatalog as the next data-backed module until `Product` rows are populated in staging.

Do not continue to Wave 2 import, Maven discovery/import, ProductsCatalog import, BusinessDocuments import, production shadow setup, DB writes, schema changes, migrations, env changes, or source-system actions until Liad explicitly approves that later gate.

## Approved Architecture Decisions In Force

- `PROJECT_INDEX.md` is the mandatory startup entrypoint.
- `hey codex` is the official startup command.
- `by codex` is the official shutdown command.
- Codex is the main Orchestrator for safe scoped work and should work, validate, collect proof, update Project Brain, and commit/push safe validated changes without routine ping-pong.
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
- Staging validation must confirm `Customers_Final = 763`, `ServiceReports = 63`, and `ReportEquipmentItems = 109`; the Wave 1 baseline was updated after read-only export validation found legitimate business data added after the original baseline. `ReportEquipmentItems` imports only rows linked to real `ServiceReports`; legacy/test rows intentionally excluded from import must be reported as historical test data, not business data, no recovery required, excluded by design.
- Wave 1 import execution is successful only when closed-loop sync passes: approved source CSVs are read from `data-sources/exports/`, staging receives only approved Wave 1 data, DB counts are read back by Prisma Client, excluded counts are reported, validation report and manifest are generated, Project Brain records import date/time and counts, git status is reviewed, only approved files are committed/pushed, no source systems are modified, and no production systems are touched. If any item fails, stop and do not continue to Wave 2.
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

- No additional code implementation beyond validated AUTO_ALLOWED read-only UI/display work unless explicitly approved.
- No Prisma migration.
- No additional DB creation.
- No additional `prisma db push`.
- No Supabase production setup.
- No additional schema push.
- No additional import.
- No production cutover.
- No PostgreSQL/Supabase environment implementation during planning.
- No Google Sheets writes.
- No AppSheet changes.
- No Maven actions.
- No production Apps Script changes.
- No new agents.
- No new planning/control files unless existing files are searched first and proven insufficient.
- No Wave 2/3/4 import work until Liad explicitly approves that later gate.

## Done When

- The next populated-module enhancement is implemented, validated, committed, and pushed, or Product rows are populated after explicit import approval before ProductsCatalog module work resumes.
- Project Brain records the implementation commit hash, validation result, current blocker `none` for the read-only module, exact next task, approval gates, and project completion percentage.
- No write path, import, migration, schema push, source-system change, or production action is added.
