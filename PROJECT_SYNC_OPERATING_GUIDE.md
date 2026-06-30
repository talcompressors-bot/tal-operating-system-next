# PROJECT SYNC OPERATING GUIDE

Purpose
(simple continuation guide for ChatGPT/Codex using Project Sources)

## How To Start
(startup sequence for a new ChatGPT/Codex session)

Step 1
(verify repository reality)
Run `git status --short --branch` and `git log -1 --oneline`.

Step 2
(load compact sync state)
Read `PROJECT_SYNC_STATE.md`, `PROJECT_SYNC_DELTA.md`, `PROJECT_SYNC_TASKS.md`, `PROJECT_SYNC_AUTHORITY.md`, and `PROJECT_SYNC_AGENTS.md`.

Step 3
(load canonical state when coding)
Read `PROJECT_INDEX.md`, `PROJECT_OPERATING_PROTOCOL.md`, `project-brain/CURRENT_TASK.md`, `project-brain/TASK_BOARD.md`, and `project-brain/DECISION_LOG.md`.

Step 4
(classify risk)
Use TDOS risk class from the user request or `PROJECT_OPERATING_PROTOCOL.md`.

Step 5
(protect boundaries)
Stop before schema, DB writes/imports, Maven/Invoice4U, email/customer actions, inventory mutation, source-system/cloud/production actions, package installs, deletes/moves, or git remote changes.

## How To Choose Work
(task selection rules)

Use Project Brain
(authority for current/next task)
Pick the current task or next approved task from Project Brain, not from memory.

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
After completed safe work, update Project Brain with what completed, validation, blocker or `none`, exact next task, approval gates, completion percentage, and commit hash when available.

Sync Files Update
(ChatGPT Project Sources sync)
After successful `by codex` or meaningful completed work, update `PROJECT_SYNC_STATE.md`, `PROJECT_SYNC_DELTA.md`, `PROJECT_SYNC_TASKS.md`, and related sync files if their summary became stale.

Commit Record
(Git truth)
Record latest commit in final report and Project Brain after commit/push.

Changed Files
(scope transparency)
Report all changed files and separate unrelated pre-existing changes.

Next Action
(handoff clarity)
Name the exact next task and approval gate.

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

## Validation For A New ChatGPT Session
(how to know the sync layer is sufficient)

A new session should understand
(minimum success criteria)
Current state, current business goal, latest delta, available agents/tools, authority sources, next task, and protected approval gates from these sync files alone.

If Sync Files Conflict With Project Brain
(source hierarchy)
Project Brain wins, then sync files should be updated.

If Runtime Evidence Conflicts With Project Brain
(reality check)
Runtime/database evidence should be reported and Project Brain should be corrected after validation.
