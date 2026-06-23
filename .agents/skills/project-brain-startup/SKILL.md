---
name: project-brain-startup
description: Load TalCompressors-ServiceReports-AI project memory before analysis or code work. Use when the user says `hey codex`, starting a session, recovering context, checking current project state, responding to project-status requests, or before modifying code, Apps Script, Maven workflows, AppSheet automation, or Project Brain files.
---

# Project Brain Startup

Use this skill to establish the current project state before analysis, planning, or changes in the TalCompressors-ServiceReports-AI repository.

## First Rule

Every new Codex task or session must begin by locating the active Git repository root and synchronizing from GitHub before reading Project Brain files.

Required `hey codex` order:

1. Locate the active Git repository root.
2. Run `git status --short --branch`.
3. If the working tree is clean, run `git fetch origin` and `git pull --ff-only origin main`.
4. If the working tree is not clean, STOP, report uncommitted changes, and do not pull until the user approves a stash, commit, or discard plan.
5. After a successful pull, run `git log -1 --oneline`.
6. Only then read `START_CODEX.md`, `PROJECT_INDEX.md`, `PROJECT_OPERATING_PROTOCOL.md`, `project-brain/CURRENT_TASK.md`, `project-brain/TASK_BOARD.md`, and `project-brain/DECISION_LOG.md`.

If Project Brain files are read before the repository has been checked and fast-forwarded when clean, STOP and restart the startup sequence.

If the task conflicts with `PROJECT_INDEX.md` or `PROJECT_OPERATING_PROTOCOL.md`, STOP and report the conflict.

Do not write or change code before reading Project Brain context.

Do not assume project structure, current task, stable systems, or active IDs from memory. Read the repository files first.

## Required Reads

Read these files in order when they exist:

1. Locate and sync the active Git repository using the required `hey codex` order.
2. `START_CODEX.md`
3. `PROJECT_INDEX.md`
4. `PROJECT_OPERATING_PROTOCOL.md`
5. `project-brain/CURRENT_TASK.md`
6. `project-brain/TASK_BOARD.md`
7. `project-brain/DECISION_LOG.md`
8. Relevant task-specific docs

If a file is missing or empty, report that as a documentation gap instead of inventing content.

## Required Git Check

Project Reality Check must always run:

1. `git status --short --branch`
2. `git fetch origin` and `git pull --ff-only origin main` when this is a new `hey codex` session and the working tree is clean
3. `git log -1 --oneline`

Then compare:

- latest Git commit
- Last Implementation Commit written in `PROJECT_INDEX.md`
- Last Closeout Commit written in `PROJECT_INDEX.md`, if present
- Last Implementation Commit written in `project-brain/CURRENT_TASK.md`
- Last Closeout Commit written in `project-brain/CURRENT_TASK.md`, if present

For `hey codex`, produce Project Reality Check using the live Git commit as the source for latest commit. Show live Git latest commit, Last Implementation Commit, and Last Closeout Commit.

If live Git latest commit equals Last Closeout Commit, Project Brain is synchronized.

If live Git latest commit is a closeout/state-sync metadata commit newer than Last Closeout Commit, do not request another sync just to record that newest closeout hash.

Only block if live Git has unclassified implementation, product code, schema, or governance behavior changes not reflected in Project Brain. In that case, report the mismatch clearly, recommend state sync before implementation, and do not continue implementation until the mismatch is acknowledged.

For architecture, schema, migration, source-of-truth, or future-platform work, relevant task-specific docs include:

- `project-brain/DECISION_LOG.md`
- `project-brain/maps/SYSTEM_MAP.md`
- `project-brain/migration/POSTGRESQL_V1_SCOPE.md`
- the relevant agent file under `agents/`

## Current Task Source

Use `project-brain/CURRENT_TASK.md` as the active current-task, current phase, and next task source of truth.

Treat `project-brain/current/CURRENT_TASK.md` as a retired compatibility path only.

Project Brain wins over ChatGPT memory, Codex memory, previous chat summaries, and assumptions.

Before proposing or creating any new planning file, agent, map, dashboard, protocol, roadmap, or control system:

1. Read `PROJECT_INDEX.md`.
2. Identify whether an existing canonical owner already exists.
3. Reuse the existing owner if available.
4. If no owner exists, report the gap and ask approval before creating anything new.

## Preserve Important IDs

Always preserve and report known values for:

- `ReportCounter`
- `ReportId`
- `BusinessDocumentId`
- `AutomationCommandId`
- `MavenDocumentId`

If a value is not known, write `UNKNOWN`. Never invent IDs.

## Stable Systems To Protect

Before recommending or making any change, identify whether it can affect:

- AutomationCommands queue architecture
- BusinessDocuments workflow
- Maven draft creation
- Report counter logic
- Drive folder logic
- Signed report / HTML file save logic
- AppSheet Bot and Apps Script row update boundaries

## Safety Check Before Changes

Before any modification, answer:

1. What is changing?
2. Why is it changing?
3. What stable flow could be affected?
4. How will it be tested?
5. Is rollback possible?
6. Is the change AUTO_ALLOWED, or has the user approved it?

Do not modify production systems or deploy without explicit approval.

## Autonomous Work Loop

After Project Reality Check, Codex should reduce Liad ping-pong:

1. Load `PROJECT_INDEX.md` and `project-brain/TASK_BOARD.md`.
2. Pick the next approved task.
3. Route work to the correct existing agent owner.
4. Execute AUTO_ALLOWED work without stopping.
5. Run validation.
6. Check that no protected system was affected.
7. Update Project Brain.
8. Commit/push if safe and scoped.
9. Stop only when APPROVAL_REQUIRED is reached.
10. Present proof, risks, and the exact approval request.

Codex is the main Orchestrator. It should not ask Liad for every small step; it should work, validate, collect proof, update Project Brain, and ask only at meaningful gates.

AUTO_ALLOWED:

- read files
- inspect repo
- run `git status` and `git log`
- run local tests/type checks
- run read-only DB queries
- run read-only UI validation
- create/update documentation
- fix UI/read-only mapping bugs
- create local validation reports
- update Project Brain after completed safe work
- commit/push safe documentation and read-only app changes after validation

AUTO_APPROVED:

Git:

- `git fetch`
- `git pull --ff-only`
- `git status`
- `git log`
- `git branch -vv`

Read-only validation:

- read-only validation
- read-only database queries
- read-only DB query
- Prisma read-only queries
- staging read-only verification
- count validation
- relationship validation

Local development:

- local tests
- TypeScript compile checks
- Next.js build checks
- Next.js local dev startup
- local HTTP validation
- Playwright read-only validation
- screenshot generation for proof
- HTML render validation
- route validation

Project Brain:

- update Project Brain after completed safe work
- update `project-brain/CURRENT_TASK.md`
- update `project-brain/TASK_BOARD.md`
- update `project-brain/DECISION_LOG.md`
- update `PROJECT_INDEX.md` references
- update migration plans
- update wave progress

Safe commits:

- documentation-only commits
- Project Brain commits
- governance commits
- read-only validation report commits
- safe implementation commits after validation
- `git push` of approved safe-scope work

Do not ask Liad for approval when executing AUTO_APPROVED actions. Only stop for APPROVAL_REQUIRED gates.

APPROVAL_REQUIRED:

- `prisma/schema.prisma` changes
- Prisma `db push`
- Prisma `migrate`
- DB writes
- imports
- seeds
- Supabase project/settings changes
- Google Sheets changes
- AppSheet changes
- Maven changes
- Apps Script changes
- Drive writes
- email/customer-facing actions
- production deployment
- production cutover
- deleting business data
- deleting source files
- new agent architecture
- new governance architecture

Before stopping for approval, Codex must first verify whether the action is AUTO_APPROVED.

If AUTO_APPROVED, continue working.

If APPROVAL_REQUIRED, stop and present:

Executive Approval Report:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EXECUTIVE APPROVAL REQUEST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROJECT POSITION

* Current Wave
* Current Task
* Project Completion %
* Next Wave

REQUEST

* What Codex wants to do

WHY

* Why this action is needed

EVIDENCE

* What was checked
* What proof exists
* Validation results
* Before/After summary

FILES TO CHANGE

* Exact files

SYSTEMS TOUCHED

* Exact systems affected

SYSTEMS CONFIRMED UNTOUCHED

* Google Sheets
* AppSheet
* Maven
* Apps Script
* Production

IMPACT ANALYSIS

Systems affected:

* exact files
* exact modules
* exact routes
* exact tables
* exact agents

Systems verified unaffected:

* Project Brain
* Governance
* Wave 1
* Existing imports
* Existing Prisma schema
* Existing Supabase data
* Existing AppSheet logic
* Existing Maven integrations
* Existing automation flows
* Existing inventory logic

Regression Review:

* What was checked
* How it was checked
* Evidence

Dependency Review:

* Which future waves depend on this area
* Whether the change can block future work
* Whether approved architecture changes

Approval Confidence:

* LOW
* MEDIUM
* HIGH

Mandatory statement:

* "I checked for impact on existing project logic and future approved project roadmap."

RISK

* Low / Medium / High
* Explanation

ROLLBACK

* How to undo the change

AFTER APPROVAL

* Exact next action
* Expected outcome

DECISION REQUIRED

* Approve
* Reject
* Modify

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Executive Approval Report rules:

- The executive summary must fit within about 15 lines before detailed evidence.
- Do not present raw logs first.
- Detailed evidence may appear below the summary.
- Include Project Tree Position and PROJECT COMPLETION MODEL.
- Include Risk, Rollback, and Systems Confirmed Untouched.
- Include IMPACT ANALYSIS. No approval request is valid without Impact Analysis.
- Stop and wait for Liad's decision.

Approval-gate output must use the Executive Approval Report format and include what was done, what was checked, proof of success, risks, requested approval, what will happen after approval, and systems confirmed untouched.

Proof Requirement:

Before closing any completed task, Codex must provide:

1. What was wrong before
2. What changed
3. Evidence
4. Validation result
5. User-visible impact

Preferred evidence includes screenshots, Playwright screenshots, HTML render samples, before/after comparisons, and counts.

A task is not considered complete with only HTTP 200, PASS, or compile success. Codex must demonstrate the visible outcome whenever possible.

Mandatory Project Tree Reporting:

Every Reality Check, Approval Gate, Autonomous Completion Report, and `by codex` closeout must include these headings using the canonical project tree from `PROJECT_INDEX.md`:

- PROJECT TREE
- CURRENT POSITION
- PROJECT COMPLETION MODEL
- CRITICAL PATH
- NEXT APPROVAL GATE

PROJECT COMPLETION MODEL must be evidence-based and capability-weighted, not completed waves divided by total waves.

Capability weights:

- Governance / Project Brain / Git workflow: 15%
- Supabase + Prisma Data Layer: 15%
- Import Framework + Wave 1 Import: 10%
- Wave 1 Service Reports UI: 10%
- Wave 2 Workflow Layer: 15%
- Wave 3 Maven Knowledge Layer: 15%
- Wave 4 Inventory Layer: 10%
- Wave 5 Offline First: 5%
- Wave 6 Automation Runtime: 3%
- Wave 7-9 Production Shadow / Cutover / AppSheet Retirement: 2%

A task is not considered complete unless Project Tree Position is reported.

Proof Requirement and Project Tree Position are both mandatory.

## Forbidden

- Do not rewrite stable flows.
- Do not change multiple areas together unless the user explicitly approves the scope.
- Do not deploy without approval.
- Do not let AppSheet Bot and Apps Script update the same row simultaneously.
- Do not create new functions before understanding existing functions.
- Do not update Project Brain files except for approved work or completed AUTO_ALLOWED work.

## Output Format

When this skill is used for startup or project-state recovery, respond with:

Project Reality Check:

1. Current phase
2. Current task
3. Next approved task
4. Live Git latest commit
5. Last Implementation Commit recorded in `PROJECT_INDEX.md`
6. Last Closeout Commit recorded in `PROJECT_INDEX.md`, if present
7. Last Implementation Commit recorded in `project-brain/CURRENT_TASK.md`
8. Last Closeout Commit recorded in `project-brain/CURRENT_TASK.md`, if present
9. Commit comparison result
10. Git working state
11. Blocked or forbidden actions
12. Canonical files relevant to the requested work
13. Approval needed, if any

No implementation task may start until the Project Reality Check is shown.

If the Project Reality Check cannot be produced, STOP.
