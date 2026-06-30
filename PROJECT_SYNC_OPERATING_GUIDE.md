# PROJECT SYNC OPERATING GUIDE

Purpose
(simple continuation guide for ChatGPT/Codex using Project Sources)

## Before Any Task
(mandatory source-selection protocol before analysis or implementation)

Step 1
(load compact Project Sources layer)
Read `PROJECT_SYNC_STATE.md`, `PROJECT_SYNC_DELTA.md`, `PROJECT_SYNC_TASKS.md`, `PROJECT_SYNC_AUTHORITY.md`, `PROJECT_SYNC_AGENTS.md`, and this file.

Step 2
(select deeper sources from the index)
Use the source indexes in `PROJECT_SYNC_STATE.md` and `PROJECT_SYNC_TASKS.md` to identify task-specific files before opening Project Brain broadly.

Step 3
(read canonical state when coding or committing)
Read `PROJECT_INDEX.md`, `PROJECT_OPERATING_PROTOCOL.md`, `project-brain/CURRENT_TASK.md`, `project-brain/TASK_BOARD.md`, and `project-brain/DECISION_LOG.md`.

Step 4
(route to an existing owner)
Use `PROJECT_SYNC_AGENTS.md` first, then read `agents/AGENT_REGISTRY.md` and the relevant agent/skill file; do not invent a new agent.

Step 5
(classify authority)
Use `PROJECT_SYNC_AUTHORITY.md` to decide whether truth must come from Git, Project Brain, runtime validation, database, human owner, source files, or sync summaries. Also check its Knowledge Dependency Map for owner/updater, readers/consumers, update trigger, sync policy, and stale-risk.

Step 6
(select sync policy)
Use `Drive mirror`, `ChatGPT Project Sources default`, or `task-only upload` from `PROJECT_SYNC_STATE.md` and `PROJECT_SYNC_AUTHORITY.md` before deciding what to mirror, upload, or leave as a pointer.

Step 7
(protect boundaries)
Stop before schema, DB writes/imports, Maven/Invoice4U, email/customer actions, inventory mutation, source-system/cloud/production actions, package installs, deletes/moves, or git remote changes.

## How To Start
(startup sequence for a new ChatGPT/Codex session)

Step 1
(verify repository reality)
Run `git status --short --branch` and `git log -1 --oneline`.

Step 2
(load compact sync state)
Read all existing `PROJECT_SYNC_*.md` files.

Step 3
(load relevant specialized sources)
Use the source indexes and the Knowledge Dependency Map to read only task-relevant specialized files, such as AI draft rules, Maven source inventory, migration plans, route maps, or Apps Script maps.

Step 4
(load canonical state when needed)
For coding, commit, closeout, or state claims, read `PROJECT_INDEX.md`, `PROJECT_OPERATING_PROTOCOL.md`, `project-brain/CURRENT_TASK.md`, `project-brain/TASK_BOARD.md`, and `project-brain/DECISION_LOG.md`.

Step 5
(produce Project Reality Check when required)
Use `PROJECT_INDEX.md` rules for official `hey codex`, startup, approval, and closeout Reality Checks.

## How To Choose Work
(task selection rules)

Use Project Brain
(authority for current/next task)
Pick the current task or next approved task from Project Brain, not from memory.

Use Sync Task Index
(fast source routing)
Use `PROJECT_SYNC_TASKS.md` to find the right task-specific sources before opening or editing files.

Use Orchestrator
(routing role)
Route each task to existing agent owners before implementation.

Use Reuse Before Create
(duplicate prevention rule)
Extend existing files/agents/runtime when possible; create new artifacts only when justified or explicitly requested.

Use Business Value
(why work should happen)
Prefer work that reduces TAL manual work, protects revenue, improves reliability, or reduces risk.

## How To Execute Safe Work
(safe execution workflow)

Map Guard
(pre-change review)
Identify source owners, affected files, protected systems, and approval gates.

Builder
(implementation role)
Apply the smallest scoped change only.

QA
(validation role)
Run risk-scaled validation and record known unrelated gaps separately.

Reviewer
(final review role)
Check scope, approval gates, validation, blocker language, and Project Brain/sync readiness.

Git
(commit discipline)
Stage only scoped files; never include secrets, unrelated changes, temporary files, or protected-system changes.

## Mandatory End-Of-Task Protocol
(required sequence at the end of every Codex task)

Step 1
(update relevant sync files)
Update relevant `PROJECT_SYNC_*` files whenever current state, latest delta, agents/tools/skills, tasks, authority, operating rules, source indexes, upload instructions, dependency-map fields, update triggers, sync policies, or stale-risk changed.

Step 2
(validate)
Validate the task result and the sync layer. At minimum, check scoped diff, required file coverage, protected-system boundaries, heading/format expectations for changed `PROJECT_SYNC_*` files, and whether every changed knowledge category has a source of truth, owner/updater, readers/consumers, update trigger, sync policy, and stale-risk.

Step 3
(commit and push)
Commit only scoped validated files, push to `origin/main`, and verify local/remote Git status.

Step 4
(copy sync files to Google Drive mirror)
Run `powershell -ExecutionPolicy Bypass -File scripts/sync-project-mirror.ps1` to copy the approved sync/knowledge files to the approved local Google Drive mirror. If the mirror target or Drive write access is unavailable, report the sync as blocked and do not claim the mirror is current.

Step 5
(verify full sync)
Verify full sync after the mirror copy: Git is clean and pushed to `origin/main`; Project Brain closeout files are updated when required; relevant `PROJECT_SYNC_*` files are updated; the Drive mirror refreshed successfully; `01_Project_Sources` contains the expected `PROJECT_SYNC*.md` files and root governance docs copied by `scripts/sync-project-mirror.ps1`; and broad runtime folders `app`, `lib`, and `prisma` are not present under the Drive mirror unless a task-specific policy explicitly approved them.

Step 5A
(verify sync fingerprint)
Read `SYNC_FINGERPRINT.txt` from the Drive mirror root after running `scripts/sync-project-mirror.ps1`. Compare its `Git Commit`, `Project Brain Version`, `PROJECT_SYNC Version`, and `Drive Mirror Version` to the current `git rev-parse HEAD`. Confirm the `Sync Token` format is `SYNC-YYYYMMDD-HHMM-<shortCommit>`. Keep `Project Sources Version` as `MANUAL_CONFIRM_REQUIRED` unless Liad explicitly confirms the ChatGPT Project Sources files were uploaded/refreshed.

Step 6
(report final proof)
Report commit hash, clean or non-clean `git status`, validation result, Google Drive mirror sync result, changed files, untouched protected systems, exact next task, and Final Sync Status as `GREEN`, `YELLOW`, or `RED`.

Full Sync Status
(how to classify the final sync result)
`GREEN` means Git is clean and pushed, Project Brain and relevant `PROJECT_SYNC_*` files are current, the Drive mirror script ran successfully, `01_Project_Sources` contains the expected Project Sources bundle, and broad runtime folders `app`, `lib`, and `prisma` were not mirrored. `YELLOW` means the task result is committed/pushed but a non-runtime sync verification is incomplete or could not be read back; report the exact gap. `RED` means Git is not pushed/clean, Project Brain or sync files are stale, the mirror failed, or protected/runtime folders were mirrored without explicit approval.

Sync Fingerprint Status
(how the shared fingerprint affects GREEN / YELLOW / RED)
`GREEN` requires `Git Commit`, `Project Brain Version`, `PROJECT_SYNC Version`, `Drive Mirror Version`, and confirmed `Project Sources Version` to match the same `HEAD`. `YELLOW` is allowed only when Git, Project Brain, PROJECT_SYNC, and Drive Mirror match but `Project Sources Version` is still `MANUAL_CONFIRM_REQUIRED` or Google Drive cloud completion cannot be read directly. `RED` means any Git/Project Brain/PROJECT_SYNC/Drive Mirror version disagrees, the fingerprint file is missing, or its token format is invalid.

Approved Local Drive Mirror
(where Codex should copy the project sync mirror on this machine)
`G:\האחסון שלי\Tal Operating System Sync`

Mirror Command
(the repo command to refresh the approved local Drive mirror)
`powershell -ExecutionPolicy Bypass -File scripts/sync-project-mirror.ps1`

Mirror Fingerprint
(the marker written by the mirror command)
The mirror command writes `SYNC_FINGERPRINT.txt` in the mirror root. The marker contains `Sync Token`, `Git Commit`, `Project Brain Version`, `PROJECT_SYNC Version`, `Drive Mirror Version`, `Project Sources Version`, `Last Verified`, and `Sync Status`. ChatGPT Project Sources still require manual upload/refresh confirmation from Liad; Codex must not mark Project Sources confirmed on its own.

## Project Brain Closeout Rule
(what canonical state must be updated after successful work)

Project Brain Update
(canonical state sync)
After completed safe work, update Project Brain with what completed, validation, blocker or `none`, exact next task, approval gates, completion percentage, and commit hash when available unless the user explicitly constrains the task to sync files only.

Sync Files Update
(ChatGPT Project Sources sync)
After successful `by codex` or meaningful completed work, update relevant `PROJECT_SYNC_*` files when current state, delta, agents/tools/skills, tasks, authority, source indexes, operating rules, dependency-map fields, sync policy, stale-risk, or end-of-task protocol became stale.

## Knowledge Dependency Map Use
(how to maintain the project knowledge system without duplicating Project Brain)

Read The Map
(before using or updating knowledge)
Use the Knowledge Dependency Map in `PROJECT_SYNC_AUTHORITY.md` to identify source of truth, owner/updater, readers/consumers, update trigger, sync policy, and risk if stale for the document/category being used.

Keep Details In Canonical Sources
(noise prevention)
Do not copy full Project Brain, runtime, evidence, or source-system files into sync files. Sync files should record the dependency, authority, and pointer needed to find the deeper source.

Update The Right Layer
(authority routing)
If a canonical source changes, update the canonical file first when allowed, then refresh only the relevant `PROJECT_SYNC_*` summaries. If only routing/sync policy changes, update the sync files only.

Use Task-Only Sources Carefully
(large or specialized files)
Task-only sources should be opened or uploaded only for the task that needs them. Do not make generated reports, historical audits, runtime files, or source-system snapshots default Project Sources unless Liad explicitly asks.

Check Stale Risk
(closeout review)
Before final report, verify whether stale sync knowledge could misroute agents, hide protected gates, misstate current runtime behavior, or confuse ChatGPT Project Sources.

## Source Selection Recipes
(which indexed sources to open for common work)

AI Draft / Maintenance Draft
(recommendation and service-kit work)
Read `PROJECT_SYNC_TASKS.md`, `.agents/skills/ai-draft-recommendation/SKILL.md`, `agents/AI_DRAFT_AGENT.md`, `project-brain/maps/AI_DRAFT_FIELD_MAPPING.md`, `project-brain/SERVICE_COMMERCIAL_RULES.md`, `project-brain/PRICING_EVIDENCE_ENGINE_SPEC.md`, `project-brain/MANUFACTURER_SERVICE_KITS.md`, and relevant `lib/`/`app/` files.

BusinessDocument Preview / PDF
(customer-facing document work)
Read `PROJECT_SYNC_TASKS.md`, `project-brain/DOCUMENT_ENGINE.md`, `APPLICATION_ROUTE_MAP.md`, `app/business-documents/`, and `lib/business-document-engine.ts`.

Maven / Invoice4U
(external adapter readiness)
Read `agents/MAVEN_AGENT.md`, `project-brain/migration/MAVEN_SOURCE_INVENTORY.md`, `project-brain/SERVICE_MAVEN_MAPPING.md`, `project-brain/apps-script/MavenAPI.gs`, and stop before any real external action.

Schema / Migration / Import
(database structure or import work)
Read `PROJECT_SYNC_AUTHORITY.md`, `prisma/schema.prisma`, `project-brain/migration/POSTGRESQL_V1_SCOPE.md`, `project-brain/migration/DATA_MIGRATION_PLAN.md`, and stop for explicit approval before schema/DB writes.

Apps Script / AppSheet
(legacy production source work)
Read `agents/APPS_SCRIPT_AGENT.md`, `project-brain/maps/APPS_SCRIPT_MAP.md`, `project-brain/maps/APPSHEET_MAP.md`, `project-brain/appsheet-ui/*.md`, and stop before edits/deployments.

Agent / Workflow Changes
(agent routing or governance updates)
Read `PROJECT_SYNC_AGENTS.md`, `agents/AGENT_REGISTRY.md`, `project-brain/AGENT_GOVERNANCE_MAP.md`, and `project-brain/agents/*.md`; prefer upgrading existing owners over creating new agents.

## What Not To Do
(protected actions and common mistakes)

Do Not Invent IDs
(data integrity rule)
Use `UNKNOWN` when canonical sources do not contain ReportCounter, ReportId, BusinessDocumentId, AutomationCommandId, or MavenDocumentId.

Do Not Treat ChatGPT As Authority
(authority rule)
ChatGPT can advise, but Project Brain/Git/runtime/database/human approval define truth.

Do Not Mutate Production
(safety rule)
No Google Sheets, AppSheet, Apps Script, Maven, Invoice4U, Drive, email, inventory, or production action without explicit approval.

Do Not Change Schema
(migration safety rule)
No `prisma/schema.prisma`, migration, `db push`, import, seed, or DB write without explicit approval.

Do Not Start Dev Server By Default
(local workflow rule)
Assume Liad owns the persistent Next.js dev server; validate against `localhost:3000` only if it is already running or Liad asks Codex to start it.

Do Not Copy Project Brain Into Sync Files
(noise prevention rule)
Sync files should summarize and point to canonical sources; detailed knowledge stays in Project Brain and task-specific files.

## Validation For A New ChatGPT Session
(how to know the sync layer is sufficient)

A new session should understand
(minimum success criteria)
Current state, what exists, where deeper knowledge lives, which files to read for each task, what agents/tools/skills exist, who owns truth, what changed recently, what to do next, and what not to touch without approval.

If Sync Files Conflict With Project Brain
(source hierarchy)
Project Brain wins, then sync files should be updated.

If Runtime Evidence Conflicts With Project Brain
(reality check)
Runtime/database evidence should be reported and Project Brain should be corrected after validation.

If A Needed Source Is Not Indexed
(future sync candidate rule)
Read the source directly, finish the task safely, then add a concise pointer to the relevant `PROJECT_SYNC_*` file during closeout.
