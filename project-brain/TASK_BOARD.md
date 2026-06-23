# TASK BOARD

Last updated: 2026-06-23
Mode: Service Report central work screen enhanced; next task is populated-module enhancement

## NOW

| Task | Goal | Test / Done | Approval Needed |
|---|---|---|---|
| Populated-module enhancement | Continue improving the existing read-only modules that have staging data: ServiceReports, Customers, and Equipment | Customer and Equipment detail pages link back into the central Service Report work screen; no schema/env changes, imports, DB writes, or source-system actions; existing routes still pass validation | No for read-only enhancement; yes before any import, DB write, schema change, env change, or source-system action |

## NEXT

| Task | Goal | Test / Done | Approval Needed |
|---|---|---|---|
| Wave 2 staging import approval | Import approved Wave 2 data into Supabase staging only after blocker resolution and explicit approval | Dry-run blockers are resolved or explicitly accepted; source mappings are approved; no production, source-system, Prisma migration, schema push, or Wave 3 action occurs | Yes before any Wave 2 import |
| Second-stage Maven dry-run discovery | Confirm all Maven-origin Sheets and their links before import | Known `InvoiceMaven*` tabs plus any other Sheets tabs storing Maven imported/synced/created data are documented with purpose, target table, Customer/BusinessDocument/Product links, and active V1/later V1/future-historical classification | Yes before Maven history import |
| Import Waves execution planning | Sequence source imports by dependency wave | Agent-readable blocks define `WAVE_1_CORE`, `WAVE_2_SERVICE_WORKFLOW`, `WAVE_3_MAVEN_DATA`, and `WAVE_4_EXTENDED_OPERATIONS` with owners, dependencies, blockers, forbidden actions, and success criteria | Yes before real import |
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
| Live read-only validation completed | Original baseline was `Customers_Final = 763`, `ServiceReports = 62`, `ReportEquipmentItems = 108`; Wave 1 baseline updated to `Customers_Final = 763`, `ServiceReports = 63`, `ReportEquipmentItems = 109` after read-only export validation found legitimate new business data |
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
| Import Waves plan documented | Commit `9efa017 Refactor import planning and update Wave 1 baseline`; structured `WAVE_ID` blocks for Codex, AI agents, automation, and Project Brain indexing are recorded; Wave 1 baseline is `Customers_Final = 763`, `ServiceReports = 63`, `ReportEquipmentItems = 109` |
| Wave 1 staging import executed | 2026-06-22T12:54:25.974Z / 2026-06-22 15:54 IDT; source CSVs from `data-sources/exports/`; DB counts read back by Prisma Client: `customers = 763`, `service_reports = 63`, `report_equipment_items = 75`; excluded legacy/test rows: `9` missing `ReportID`, `25` unmatched `ReportID`; validation `PASS`; manifest/report generated under ignored local `data-sources/exports/import-runs/`; no source-system or production changes |
| Wave 1 import commit classified | Commit `3abf7d3 Record Wave 1 staging import pass`; classified as latest implementation/import commit |
| Wave 1 PostgreSQL read implemented | Commit `29331fb Read Wave 1 service reports from PostgreSQL`; Next.js service report list/detail screens read Wave 1 PostgreSQL staging data |
| Post-import Wave 1 review completed | `/service-reports` HTTP 200; `/service-reports/acd1133d` HTTP 200; 63 service report links rendered; counts `customers = 763`, `service_reports = 63`, `report_equipment_items = 75`; validation PASS; issues recorded for date, status, and sparse equipment display |
| Autonomous agent orchestration governance created | Commit `a28da7b Create autonomous agent orchestration governance`; Codex is the main Orchestrator for AUTO_ALLOWED work, routes tasks to existing agent owners, validates, updates Project Brain, commits/pushes safe scoped work, and stops only at APPROVAL_REQUIRED gates |
| Wave 1 read/display mapping fixes validated | Commit `fd76610 Fix Wave 1 service report display mapping`; service dates fall back to `raw_source` service date without DB writes; pending-signature source status maps to `Pending Signature`; missing source status displays as `Status Missing`; sparse equipment rows render safe fallbacks; read-only staging validation found 63 reports, 75 equipment rows, 0 unknown dates, 29 pending-signature statuses, 32 signed statuses, 2 status-missing rows, 0 unknown statuses, and 0 sparse fallback failures; read-only HTTP validation returned 200 for `/service-reports` and `/service-reports/acd1133d` with 63 links |
| Project tree reporting required | Commit `7f63193 Require project tree reporting`; every Reality Check, Approval Gate, Autonomous Completion Report, and `by codex` closeout must include Project Tree Position from `PROJECT_INDEX.md` |
| Wave 2 planning/discovery gate approved | Liad approved Wave 2 planning/discovery only; scope is documentation/source-readiness planning and excludes Wave 2 import, DB writes, schema changes, Maven actions, production shadow, and source-system changes |
| Wave 2 connector dry-run validation completed | 2026-06-22 19:13 IDT; connector-only read validation approved after blocked CSV export paths; all eight Wave 2 tabs were readable; observed rows: `ProductsCatalog = 113`, `PartsUsed = 1`, `AIDraftSuggestions = 2`, `BusinessDocuments = 1`, `BusinessDocumentItems = 0`, `BusinessDocumentLog = 2`, `ApprovalsLog = 0`, `EmailLog = 0`; read validation PASS, import readiness FAIL/BLOCKED; no Google Sheets writes, AppSheet changes, Maven changes, Apps Script changes, DB writes, Supabase writes, imports, Prisma commands, or production actions |
| Staging connectivity diagnostics completed | 2026-06-22; Next.js starts and home page returns HTTP 200, but Prisma cannot reach the Supabase pooler; `/service-reports` and `/service-reports/acd1133d` return HTTP 500; `.env.staging` matches verified Supabase Project ID `mdlvxklufrchiabonafm`; correction source: verified visually from Supabase Project Settings; after temporary `.env` creation, Prisma validation passed and `db pull --print` moved to `P1001` connectivity against `aws-1-eu-central-1.pooler.supabase.com:5432`; no DB writes/imports/migrations/source-system/production actions |
| Staging connectivity diagnosis resolved | Real read-only Prisma connectivity passed outside the network sandbox: `customer.count() = 763`; `npx.cmd prisma db pull --print` exit code `0`; earlier `P1001` was sandbox/runtime network limitation, not Supabase/project/env issue; no DB writes or migrations were run |
| Customers read-only module implemented | Commit `45da4d0 Implement customers read-only module`; added `/customers` list, `/customers/[id]` detail, customer adapter, active dashboard card, search/filter fields, service-report links, and future link counts for BusinessDocuments, AI Drafts, and Maven documents; validation: scoped TypeScript passed and `/`, `/customers`, `/customers/186DD`, `/service-reports`, `/service-reports/acd1133d` returned HTTP 200; no schema/env/migration/DB write/source-system/production changes |
| Automatic Project Brain closeout sync required | Commit `4ed6ca2 Require automatic project brain closeout sync`; `AGENTS.md`, `PROJECT_OPERATING_PROTOCOL.md`, and `PROJECT_INDEX.md` require Project Brain updates before every final report after a completed task; required fields are completed work, commit hash, validation, current blocker or `none`, exact next task, approval gates, and project completion percentage; validation `git diff --check` passed with CRLF warnings only; completion remains 50%; resolved blockers must be removed from current blocker state; no env/schema/migration/DB write/delete/move/remote/source-system/production changes |
| Multi-agent operating workflow added | Commit `28f9bf2 Add multi-agent operating workflow`; created Builder, Map Guard, QA, Reviewer, Agent Communication Protocol, and Autonomous Build Workflow under `project-brain/agents/`; updated `AGENTS.md`, `PROJECT_OPERATING_PROTOCOL.md`, and `PROJECT_INDEX.md`; validation `git diff --check` passed with CRLF warnings only; completion remains 50%; no app/schema/migration/env/DB write/source-system/delete/move/remote/production changes |
| ReportEquipmentItems / Equipment read-only module implemented | Commit `3f1761f Add equipment read-only module`; added `/equipment`, `/equipment/[id]`, read-only `ReportEquipmentItem` adapter, dashboard activation, search/filter fields, and service-report links; validation: scoped TypeScript passed, `git diff --check` passed with CRLF warnings only, read-only Prisma lookup found equipment `3002f879`, and local HTTP checks returned 200 for `/`, `/equipment`, `/equipment/3002f879`, `/service-reports`, `/service-reports/5e0eaae3`, and `/customers`; no schema/env/migration/DB write/import/source-system/production changes; completion is 52% |
| PartsUsed read-only module implemented | Commit `14542b5 Add PartsUsed read-only module`; added `/parts-used`, `/parts-used/[id]`, read-only `PartUsed` adapter, dashboard activation, search/filter fields, service-report/product context links, and invalid enum filter hardening; validation: scoped TypeScript passed, `git diff --check` passed with CRLF warnings only, read-only Prisma validation found `parts_used = 0`, local HTTP checks returned 200 for `/`, `/parts-used`, `/parts-used?matchSource=BAD_VALUE`, `/service-reports`, `/equipment`, and `/customers`, and 404 for `/parts-used/not-a-real-part`; no schema/env/migration/DB write/import/source-system/production changes; completion is 53% |
| Application route map documented | Commit `7a8ce9b Add application route map`; created `APPLICATION_ROUTE_MAP.md` with every implemented route, module, status, data source, record count, and AppSheet equivalent; validation: actual `app/**/page.tsx` files enumerated, read-only Prisma counts verified, and `git diff --check` passed; no app/schema/env/migration/DB write/import/source-system/production changes |
| Data coverage audit completed | Commit `5a682ec Add data coverage audit`; created `DATA_COVERAGE_AUDIT.md` with read-only Prisma counts and classifications for 19 requested models; populated models are `Customer = 763`, `ServiceReport = 63`, and `ReportEquipmentItem = 75`; `PartUsed = 0` and `Product = 0` are empty; remaining workflow/runtime/Maven/sync/log tables are not ready for useful read-only module validation; no app/schema/env/migration/DB write/import/source-system/production changes |
| Service Report central work screen enhanced | Commit `71a5435 Enhance service report work screen`; `/service-reports/[id]` now includes customer summary, equipment summary, disabled future actions, lifecycle placeholders, and links to customer/equipment detail pages; validation: scoped TypeScript passed, `git diff --check` passed with CRLF warnings only, local route checks returned 200 for `/`, `/service-reports`, `/service-reports/acd1133d`, `/customers`, `/equipment`, and `/equipment/3002f879`, and detail HTML contained all requested labels/placeholders; no schema/env/migration/DB write/import/source-system/production changes; completion is 54% |

## BLOCKED / NOT STARTED

| Task | Blocker | Next Unblock Step |
|---|---|---|
| Database migration | Migrations are not part of current staging shadow path | Separate approval required before any Prisma migrate workflow |
| Additional schema push | Staging schema is already applied; further schema changes need separate approval | Approve any schema change separately before another db push |
| Wave 2 import | Wave 2 import is not approved and dry-run import readiness is FAIL/BLOCKED | Request explicit import approval only after blockers are resolved or explicitly accepted |
| Production integration | Shadow app is not approved for production | Keep AppSheet/Sheets production until explicit cutover approval |
| Maven write flow | Not part of current work | Requires separate design and approval |
| New planning/control files | Existing-file audit is required first | Search existing files and prove no owner file already exists |

## Rules

- No production writes.
- Autonomous Work Loop is active for safe tasks.
- Codex is the main Orchestrator and must route work to existing agent owners by role.
- Codex must not ask Liad for every small step; it must work, validate, collect proof, update Project Brain, and stop only at meaningful APPROVAL_REQUIRED gates.
- AUTO_ALLOWED work may proceed without routine confirmation when it is the next approved task: repo inspection, local tests/type checks, read-only DB queries, read-only UI validation, documentation updates, read-only UI/display mapping fixes, local validation reports, Project Brain updates after completed safe work, and safe/scoped commit-push after validation.
- AUTO_APPROVED actions must run without asking Liad for approval:
  - Git: `git fetch`, `git pull --ff-only`, `git status`, `git log`, `git branch -vv`.
  - Read-only validation: read-only validation, read-only database queries, read-only DB query, Prisma read-only queries, staging read-only verification, count validation, relationship validation.
  - Local development: local tests, TypeScript compile checks, Next.js build checks, Next.js local dev startup, local HTTP validation, Playwright read-only validation, screenshot generation for proof, HTML render validation, route validation.
  - Project Brain: update Project Brain after completed safe work, update `project-brain/CURRENT_TASK.md`, update `project-brain/TASK_BOARD.md`, update `project-brain/DECISION_LOG.md`, update `PROJECT_INDEX.md` references, update migration plans, update wave progress.
  - Safe commits: documentation-only commits, Project Brain commits, governance commits, read-only validation report commits, safe implementation commits after validation, `git push` of approved safe-scope work.
- Do not ask Liad for approval when executing AUTO_APPROVED actions; only stop for APPROVAL_REQUIRED gates.
- APPROVAL_REQUIRED work must stop for explicit Liad approval: `schema.prisma` changes, Prisma `db push`, Prisma `migrate`, DB writes, imports, seeds, Supabase project/settings changes, Google Sheets changes, AppSheet changes, Maven changes, Apps Script changes, Drive writes, email/customer-facing actions, production deployment, production cutover, deleting business data, deleting source files, new agent architecture, and new governance architecture.
- Before stopping for approval, Codex must verify whether the action is AUTO_APPROVED. If AUTO_APPROVED, continue working. If APPROVAL_REQUIRED, stop and present an Executive Approval Report.
- Executive Approval Reports must start with `EXECUTIVE APPROVAL REQUEST` and include PROJECT POSITION, REQUEST, WHY, EVIDENCE, FILES TO CHANGE, SYSTEMS TOUCHED, SYSTEMS CONFIRMED UNTOUCHED, RISK, ROLLBACK, AFTER APPROVAL, and DECISION REQUIRED.
- Executive Approval Reports must fit the executive summary within about 15 lines before detailed evidence, must not present raw logs first, must include Project Tree Position and PROJECT COMPLETION MODEL, must include Risk, Rollback, and Systems Confirmed Untouched, and must stop for Liad to Approve, Reject, or Modify.
- Executive Approval Reports must include IMPACT ANALYSIS. No approval request is valid without Impact Analysis.
- IMPACT ANALYSIS must report systems affected, systems verified unaffected, Regression Review, Dependency Review, Approval Confidence, and the mandatory statement.
- Systems affected must list exact files, modules, routes, tables, and agents.
- Systems verified unaffected must cover Project Brain, Governance, Wave 1, existing imports, existing Prisma schema, existing Supabase data, existing AppSheet logic, existing Maven integrations, existing automation flows, and existing inventory logic.
- Approval Confidence must be LOW, MEDIUM, or HIGH.
- IMPACT ANALYSIS must explicitly state: "I checked for impact on existing project logic and future approved project roadmap."
- Approval-gate reports must include what was done, what was checked, proof, risks, requested approval, what happens after approval, and systems confirmed untouched.
- Proof Requirement: before closing any completed task, Codex must provide what was wrong before, what changed, evidence, validation result, and user-visible impact.
- Preferred evidence includes screenshots, Playwright screenshots, HTML render samples, before/after comparisons, and counts.
- A task is not complete with only HTTP 200, PASS, or compile success; Codex must demonstrate the visible outcome whenever possible.
- Mandatory Project Tree Reporting: every Reality Check, Approval Gate, Autonomous Completion Report, and `by codex` closeout must include PROJECT TREE, CURRENT POSITION, PROJECT COMPLETION MODEL, CRITICAL PATH, and NEXT APPROVAL GATE using the canonical project tree from `PROJECT_INDEX.md`.
- PROJECT COMPLETION MODEL must be evidence-based and capability-weighted, not completed waves divided by total waves. Required capability weights: Governance / Project Brain / Git workflow 15%; Supabase + Prisma Data Layer 15%; Import Framework + Wave 1 Import 10%; Wave 1 Service Reports UI 10%; Wave 2 Workflow Layer 15%; Wave 3 Maven Knowledge Layer 15%; Wave 4 Inventory Layer 10%; Wave 5 Offline First 5%; Wave 6 Automation Runtime 3%; Wave 7-9 Production Shadow / Cutover / AppSheet Retirement 2%.
- A task is not considered complete unless Project Tree Position is reported.
- Proof Requirement and Project Tree Position are both mandatory.
- Documentation/state sync only for current Project Brain update unless Liad explicitly approves script changes.
- No additional code implementation.
- No Prisma commands.
- No database creation or migration.
- No schema push.
- No additional import.
- No production cutover.
- No Google Sheets.
- No AppSheet.
- No Maven.
- No VPS provisioning or remote infrastructure setup.
- No Wave 2/3/4 import work until Liad explicitly approves that later gate.
- Every task must have an owner agent or explicit `manual/Liad approval` owner before work starts.
