# DECISION LOG

## 2026-06-23

Decision:
`71a5435 Enhance service report work screen` is classified as the Last Implementation Commit.

Reason:
The commit enhanced the existing populated `/service-reports/[id]` read-only route as the central work screen. It reused `Customer`, `ServiceReport`, and `ReportEquipmentItem` data only, added customer summary, equipment summary, disabled future action buttons, lifecycle placeholders, and links to customer/equipment details. Validation used scoped TypeScript, `git diff --check`, local route checks, and HTML content checks for the requested labels/placeholders. No schema changes, migrations, env changes, DB writes, imports, source-system changes, or production actions occurred.

Status:
Approved.

---

## 2026-06-23

Decision:
After the Service Reports list context enhancement, the next safe task is a Wave 2 import blocker-resolution approval package.

Reason:
The populated read-only Customer, Equipment, and Service Report navigation/work-screen/list surfaces are now implemented. The next meaningful progress point is to convert existing Wave 2 dry-run blockers into explicit decisions before any staging import can be approved. This remains documentation/read-only analysis until Liad explicitly approves imports or DB writes.

Status:
Approved.

---

## 2026-06-23

Decision:
Dashboard route map remains unchanged for bidirectional module navigation.

Reason:
The task added and clarified links among existing populated read-only routes only. No new Next.js route, AppSheet equivalent, data source, or record count changed, so `APPLICATION_ROUTE_MAP.md` and dashboard route inventory do not require a content change.

Status:
Approved.

---

## 2026-06-23

Decision:
After the data coverage audit, ProductsCatalog should not be the next data-backed read-only module until `Product` rows exist in staging.

Reason:
Read-only Prisma counts in `DATA_COVERAGE_AUDIT.md` show the only populated audited models are `Customer = 763`, `ServiceReport = 63`, and `ReportEquipmentItem = 75`; all three already have read-only modules. `Product = 0` and `PartUsed = 0`; other workflow, Maven, automation, sync, and log tables are empty/not ready. The safest next implementation is an enhancement to already populated read-only modules, or explicit approval for an import/population step before building data-heavy modules around empty tables.

Status:
Approved.

---

## 2026-06-23

Decision:
`14542b5 Add PartsUsed read-only module` is classified as the Last Implementation Commit.

Reason:
The commit added a read-only PartsUsed module using the existing Prisma `PartUsed` model and existing Next.js Server Component architecture. It created `/parts-used`, `/parts-used/[id]`, a read-only adapter, search/filter handling, service-report links, product context, invalid enum filter hardening, and an active dashboard card. Validation used scoped TypeScript, `git diff --check`, read-only Prisma count validation showing `parts_used = 0`, and local HTTP checks for `/`, `/parts-used`, `/parts-used?matchSource=BAD_VALUE`, `/parts-used/not-a-real-part`, `/service-reports`, `/equipment`, and `/customers`. No schema changes, migrations, env changes, DB writes, imports, source-system changes, or production actions occurred.

Status:
Approved.

---

## 2026-06-23

Decision:
Supabase staging connectivity blocker is resolved, and the current task is now the PartsUsed read-only module.

Reason:
Real read-only Prisma connectivity has already passed outside the network sandbox, including `customer.count() = 763`, and `npx.cmd prisma db pull --print` exited `0`. The earlier `P1001` condition is classified as a sandbox/runtime network limitation rather than a Supabase, project, or env issue. The approved next safe implementation task is a read-only PartsUsed module. This does not approve imports, DB writes, schema changes, migrations, env changes, source-system changes, Maven actions, AppSheet changes, or production actions.

Status:
Approved.

---

## 2026-06-23

Decision:
`3f1761f Add equipment read-only module` is classified as the Last Implementation Commit.

Reason:
The commit added a read-only ReportEquipmentItems / Equipment module using the existing Prisma `ReportEquipmentItem` model and existing Next.js Server Component architecture. It created `/equipment`, `/equipment/[id]`, a read-only adapter, search/filter handling, service-report links, and an active dashboard card. Validation used scoped TypeScript, `git diff --check`, a read-only Prisma lookup for known equipment `3002f879`, and local HTTP checks for `/`, `/equipment`, `/equipment/3002f879`, `/service-reports`, `/service-reports/5e0eaae3`, and `/customers`. No schema changes, migrations, env changes, DB writes, imports, source-system changes, or production actions occurred.

Status:
Approved.

---

## 2026-06-23

Decision:
`28f9bf2 Add multi-agent operating workflow` is classified as the Last Implementation Commit. The Project Brain multi-agent operating workflow is approved as a governance/documentation workflow.

Reason:
The commit created the requested Project Brain workflow roles: Builder, Map Guard, QA, Reviewer, Agent Communication Protocol, and Autonomous Build Workflow. It also updated `AGENTS.md`, `PROJECT_OPERATING_PROTOCOL.md`, and `PROJECT_INDEX.md` so Codex uses the workflow while preserving the existing active specialist agents under `agents/AGENT_REGISTRY.md`. Validation used `git diff --check`, which passed with CRLF warnings only. No app code, schema, migrations, env files, DB writes/imports, source-system changes, deletes/moves, git remote changes, or production integrations occurred.

Status:
Approved.

---

## 2026-06-23

Decision:
`4ed6ca2 Require automatic project brain closeout sync` is classified as the Last Implementation Commit. Codex must automatically sync Project Brain before the final report after every completed task.

Reason:
Session closeout must not leave completed work only in chat. The mandatory sync records what was completed, commit hash, validation results, current blocker or `none`, exact next task, approval gates, and project completion percentage in `project-brain/CURRENT_TASK.md`, `project-brain/TASK_BOARD.md`, `project-brain/DECISION_LOG.md` when decisions changed, and `PROJECT_INDEX.md` when status or structure changed. If validation proves a blocker resolved, it must be removed from current blocker state and final responses must not call it blocked.

Status:
Approved.

---

## 2026-06-23

Decision:
`45da4d0 Implement customers read-only module` is classified as the Last Implementation Commit.

Reason:
The commit added read-only Next.js Customers list/detail pages, a Customer Prisma adapter, search/filter handling, service-report links, future relation counts, and an active dashboard card. Validation used scoped TypeScript and read-only local HTTP route checks. It changed read-only app behavior only and did not change schema, migrations, env files, DB data, AppSheet, Maven, Apps Script, or production systems.

Status:
Approved.

---

## 2026-06-23

Decision:
Staging Prisma connectivity is resolved for diagnosis purposes; earlier `P1001` was a sandbox/runtime network limitation.

Reason:
A real read-only Prisma test outside the network sandbox succeeded with `customer.count() = 763`, and `npx.cmd prisma db pull --print` exited `0`. No DB writes or migrations were run.

Status:
Approved.

---

## 2026-06-23

Decision:
Staging Supabase Project ID is `mdlvxklufrchiabonafm`; local `.env.staging` matches that verified project id, and remaining Prisma failure is `P1001` connectivity, not wrong project id.

Reason:
The Supabase Project ID was verified visually from Supabase Project Settings. Earlier Project Brain references to a different staging ref were stale. Prisma CLI loads `.env` by default, not `.env.staging`; local Prisma validation must either create a temporary `.env` from `.env.staging` or explicitly load the staging env. After temporary `.env` creation, Prisma schema validation passed and Prisma moved to `P1001` connectivity against the Supabase pooler.

Status:
Approved.

---

## 2026-06-23

Decision:
The nested Git repository is the only active source of truth for this project.

Reason:
The parent folder `C:\Users\משתמש\Desktop\TalCompressors-ServiceReports-AI` contains stale duplicate Next.js files outside Git. VS Code and Codex must open the nested repository root only: `C:\Users\משתמש\Desktop\TalCompressors-ServiceReports-AI\TalCompressors-ServiceReports-AI`. No cleanup or deletion is approved yet. The parent duplicate should be quarantined later only after explicit approval.

Status:
Approved.

---

## 2026-06-22

Decision:
Wave 2 service workflow planning/discovery is approved.

Reason:
Wave 1 staging import, PostgreSQL read switch, and read/display mapping validation have passed. The next safe step is planning/discovery for Wave 2 service workflow data only: source export list, schema blockers, parent-link checks, enum/status mapping needs, dry-run report format, and next approval gate. This approval does not permit Wave 2 source export, dry-run execution, import, DB writes, schema changes, Maven actions, AppSheet changes, Google Sheets mutations, Apps Script changes, production shadow setup, or production cutover.

Status:
Approved for planning/discovery only.

---

## 2026-06-22

Decision:
`7f63193 Require project tree reporting` is classified as the Last Implementation Commit.

Reason:
The commit changed governance behavior by making Project Tree Position mandatory for every Reality Check, Approval Gate, Autonomous Completion Report, and `by codex` closeout. It also made Proof Requirement and Project Tree Position jointly mandatory for task completion. It is an implementation/governance commit, not closeout metadata. Last Closeout Commit remains `8114210 Sync project brain commit model state`.

Status:
Approved.

---

## 2026-06-22

Decision:
`fd76610 Fix Wave 1 service report display mapping` is classified as the Last Implementation Commit.

Reason:
The commit changed read-only Next.js Wave 1 service-report display behavior by deriving service dates from `raw_source` when `service_date` is null, mapping pending-signature source status to `Pending Signature`, replacing UI `UNKNOWN` status with `Status Missing` for missing source statuses, and adding sparse equipment display fallbacks. Validation used read-only staging queries and temporary read-only HTTP checks. It is an implementation/read-display commit, not closeout metadata. Last Closeout Commit remains `8114210 Sync project brain commit model state`.

Status:
Approved.

---

## 2026-06-22

Decision:
`a28da7b Create autonomous agent orchestration governance` is classified as the Last Implementation Commit.

Reason:
The commit changed project governance behavior by making Codex the main Orchestrator for safe scoped work, requiring task routing to existing agent owners, allowing AUTO_ALLOWED work to continue through validation and Project Brain update, and stopping only at APPROVAL_REQUIRED gates. It is an implementation/governance commit, not closeout metadata. Last Closeout Commit remains `8114210 Sync project brain commit model state`.

Status:
Approved.

---

## 2026-06-22

Decision:
`29331fb Read Wave 1 service reports from PostgreSQL` is classified as the Last Implementation Commit.

Reason:
The commit changed Next.js service report list/detail behavior from local snapshot JSON to read-only PostgreSQL staging reads for Wave 1 data. Post-import review passed with `/service-reports` HTTP 200, `/service-reports/acd1133d` HTTP 200, 63 service report links rendered, and counts `customers = 763`, `service_reports = 63`, `report_equipment_items = 75`. Display issues remain: all 63 `service_date` values are null so dates are missing, source status `ממתין חתימה` displays as `UNKNOWN`, and some equipment fields are sparse. It is an implementation commit, not closeout metadata. Last Closeout Commit remains `8114210 Sync project brain commit model state`.

Status:
Approved.

---

## 2026-06-22

Decision:
`3abf7d3 Record Wave 1 staging import pass` is classified as the Last Implementation Commit.

Reason:
The commit added the approved Wave 1 staging import script and recorded Wave 1 PostgreSQL staging validation PASS with `customers = 763`, `service_reports = 63`, `report_equipment_items = 75`, and 34 excluded legacy/test `ReportEquipmentItems` rows. It is an implementation/import commit, not closeout metadata. Last Closeout Commit remains `8114210 Sync project brain commit model state`.

Status:
Approved.

---

## 2026-06-22

Decision:
`9efa017 Refactor import planning and update Wave 1 baseline` is classified as the Last Implementation Commit.

Reason:
The commit changed approved migration planning by converting Import Waves into structured agent-readable `WAVE_ID` blocks, adding owner/blocker/success criteria fields for future automation, and updating Wave 1 baseline counts to `Customers_Final = 763`, `ServiceReports = 63`, and `ReportEquipmentItems = 109` after read-only export validation found legitimate new business data. It is an implementation/planning commit, not closeout metadata. Last Closeout Commit remains `8114210 Sync project brain commit model state`.

Status:
Approved.

---

## 2026-06-22

Decision:
`c11c460 Document import waves plan` is classified as the Last Implementation Commit.

Reason:
The commit changed approved migration planning by defining Import Waves 1-4, preserving Wave 1 as the service-report core gate, and recording that Wave 1 is required before Next.js can replace AppSheet for service reports. It is an implementation/planning commit, not closeout metadata. Last Closeout Commit remains `8114210 Sync project brain commit model state`.

Status:
Approved.

---

## 2026-06-22

Decision:
`b6b709b Reclassify ReportEquipmentItems exclusions` is classified as the Last Implementation Commit.

Reason:
The commit changed approved migration planning language and import classification for known excluded `ReportEquipmentItems` rows. The 9 rows missing `ReportID` and 25 rows with unmatched `ReportID` are historical test data, not business data, require no recovery, and are excluded by design. It is an implementation/planning commit, not closeout metadata. Last Closeout Commit remains `8114210 Sync project brain commit model state`.

Status:
Approved.

---

## 2026-06-22

Decision:
`9a81290 Reconcile Prisma schema for Supabase staging` is classified as the Last Implementation Commit.

Reason:
The commit changed executable Prisma schema by adding Supabase staging `DIRECT_URL` support and the approved `ReportEquipmentItem.reportCounter` field/index. It is an implementation/schema commit, not closeout metadata. Last Closeout Commit remains `8114210 Sync project brain commit model state`.

Status:
Approved.

---

## 2026-06-22

Decision:
`fc1dfa8 Prepare Supabase staging env placeholders` is classified as the Last Implementation Commit.

Reason:
The commit changed repository setup by adding staging env placeholders and secret ignore rules. It is an implementation/setup commit, not closeout metadata. Last Closeout Commit remains `8114210 Sync project brain commit model state`.

Status:
Approved.

---

## 2026-06-22

Decision:
Real Supabase staging secret values must remain outside git; repository may contain env example placeholders with names only.

Reason:
The staging gate needs `DATABASE_URL`, `DIRECT_URL`, and `NEXT_PUBLIC_APP_ENV`, but secret values must not be committed. `.env.staging.example` may document names only, and `.gitignore` must block real `.env` files while allowing example files.

Status:
Approved.

---

## 2026-06-22

Decision:
`d1d6f88 Document Supabase staging-first shadow plan` is classified as the Last Implementation Commit.

Reason:
The commit changed approved project governance and migration planning by making Supabase Staging the first shadow target and Supabase Production Shadow the second target after staging validation. It is an implementation/governance commit, not closeout metadata. Last Closeout Commit remains `8114210 Sync project brain commit model state`.

Status:
Approved.

---

## 2026-06-22

Decision:
Use Supabase Staging first, then Supabase Production Shadow. Do not use local PostgreSQL as the first target.

Reason:
The approved shadow environment path should validate the real hosted deployment target before production shadow setup. Staging project `talcompressors-next-staging` is first; production shadow project `talcompressors-next-prod` follows only after staging validation passes. Required env variable names are `DATABASE_URL`, `DIRECT_URL`, and `NEXT_PUBLIC_APP_ENV`; optional future Supabase env names are `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY`. Before any DB push, Prisma must reconcile `DIRECT_URL` and `ReportEquipmentItem.reportCounter`.

Status:
Approved.

---

## 2026-06-22

Decision:
`2963977 Add master map and agent routing` is classified as the Last Implementation Commit.

Reason:
The commit changed project governance/routing behavior by adding the master project map and routing future work to existing owner agents. It is an implementation/governance commit, not closeout metadata. Last Closeout Commit remains `8114210 Sync project brain commit model state`.

Status:
Approved.

---

## 2026-05-25

Decision:
Use AutomationCommands queue architecture.

Reason:
Avoid duplicate AppSheet Bot runs and row update conflicts.

Status:
Approved.

---

## 2026-06-08

Decision:
Apps Script is the main execution and validation layer.

Reason:
AppSheet should be UI/approval layer, not complex backend logic.

Status:
Approved.

---

## 2026-06-08

Decision:
Git + VS Code + Codex CLI are the primary development workflow.

Reason:
Need source control, rollback, traceability, and repeatable project memory.

Status:
Approved.

---

## 2026-06-09

Decision:
Create PROJECT_OPERATING_PROTOCOL.

Reason:
Codex must not start coding before reading project state, rules, flowchart, changelog, and git status.

Status:
Approved.

---

## 2026-06-09

Decision:
Create System Health Check concept.

Reason:
Regression discovered: report 5852 was signed and numbered but SignedHtmlFileUrl was not created automatically.

Status:
Approved for planning.

---

## 2026-06-22

Decision:
`PROJECT_INDEX.md` is the mandatory startup entrypoint for every Codex/ChatGPT project session.

Reason:
The project already has multiple startup, status, and Project Brain files. A single enforced entrypoint prevents future sessions from starting from stale state.

Status:
Approved.

---

## 2026-06-22

Decision:
`315b8cc Fix reality check commit model` is classified as the Last Implementation Commit.

Reason:
The commit changed governance behavior by introducing the two-commit Reality Check model. It is an implementation/governance commit, not closeout metadata. Last Closeout Commit remains `653f370 Sync project brain after reality check hardening`.

Status:
Approved.

---

## 2026-06-22

Decision:
`hey codex` must sync from GitHub before reading Project Brain when the working tree is clean, and Project Reality Check must compare live Git against Project Brain recorded commits.

Reason:
New sessions must start from the latest GitHub state instead of stale local Project Brain files. Commit mismatches must be visible before implementation, and closeout must sync canonical Project Brain state.

Status:
Approved.

---

## 2026-06-22

Decision:
`hey codex` is the official startup command and `by codex` is the official shutdown command.

Reason:
Startup and closeout need repeatable automation. Startup must begin from `PROJECT_INDEX.md`, and shutdown must run Project Reality Check, Git review, canonical state updates when needed, approved-file commit, push to `origin/main`, clean status confirmation, and the next startup point.

Status:
Approved.

---

## 2026-06-22

Decision:
Project Brain files win over ChatGPT/Codex memory when they conflict.

Reason:
Model memory can be stale, incomplete, or from a different phase. Project Brain files are the repository-owned source of project reality.

Status:
Approved.

---

## 2026-06-22

Decision:
Before creating any new planning file, map, dashboard, control center, protocol, agent, or roadmap, Codex must search existing files and prove no existing file already serves that purpose.

Reason:
The repo already contains governance, startup, status, roadmap, map, migration, and agent files. New planning/control files increase fragmentation unless an existing owner cannot serve the need.

Status:
Approved.

---

## 2026-06-22

Decision:
`project-brain/CURRENT_TASK.md` is the canonical current task, current phase, and next task file.

Reason:
The older `project-brain/current/CURRENT_TASK.md` is stale and has been retired as a compatibility stub.

Status:
Approved.

---

## 2026-06-22

Decision:
`PROJECT_INDEX.md` is the navigation and status map, not a giant source file.

Reason:
The index should show Project Reality Check and link to canonical owner files without duplicating full content from current task, task board, decisions, maps, migration scope, Prisma schema, or protocol.

Status:
Approved.
