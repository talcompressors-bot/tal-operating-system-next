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
Use `PROJECT_SYNC_AUTHORITY.md` to decide whether truth must come from Git, Project Brain, runtime validation, database, human owner, source files, or sync summaries.

Step 6
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
Use the source indexes to read only task-relevant specialized files, such as AI draft rules, Maven source inventory, migration plans, route maps, or Apps Script maps.

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

## Closeout Rule
(what must be updated after successful work)

Project Brain Update
(canonical state sync)
After completed safe work, update Project Brain with what completed, validation, blocker or `none`, exact next task, approval gates, completion percentage, and commit hash when available unless the user explicitly constrains the task to sync files only.

Sync Files Update
(ChatGPT Project Sources sync)
After successful `by codex` or meaningful completed work, update relevant `PROJECT_SYNC_*` files when current state, delta, agents/tools/skills, tasks, authority, source indexes, or operating rules became stale.

Commit Record
(Git truth)
Record latest commit in final report and Project Brain/sync files when appropriate after commit/push.

Changed Files
(scope transparency)
Report all changed files and separate unrelated pre-existing changes.

Next Action
(handoff clarity)
Name the exact next task and approval gate.

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
