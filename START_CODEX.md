# START CODEX

Activation:
hey codex

`hey codex` is the official startup command for this repository.

When activated:

1. Locate the active Git repository root.
2. Run:

- `git status --short --branch`

3. If the working tree is clean, run:

- `git fetch origin`
- `git pull --ff-only origin main`

4. If the working tree is not clean:

- STOP.
- Report uncommitted changes.
- Do not pull until the user approves a stash, commit, or discard plan.

5. After a successful pull, run:

- `git log -1 --oneline`

6. Only then read:

- START_CODEX.md
- PROJECT_INDEX.md
- PROJECT_OPERATING_PROTOCOL.md
- project-brain/CURRENT_TASK.md
- project-brain/TASK_BOARD.md
- project-brain/DECISION_LOG.md
- project-brain/current/LIVE_OBJECTS.md for active IDs, when present
- relevant task-specific docs

Do not read Project Brain files until the repository has been checked and fast-forwarded from `origin/main` when the working tree is clean.

When the user says `hey codex`:

1. Locate the active Git repository root.
2. Run `git status --short --branch`.
3. If the working tree is clean, run `git fetch origin` and `git pull --ff-only origin main`.
4. If the working tree is not clean, STOP, report uncommitted changes, and do not pull until the user approves a stash, commit, or discard plan.
5. After a successful pull, run `git log -1 --oneline`.
6. Only then read `START_CODEX.md`, `PROJECT_INDEX.md`, `PROJECT_OPERATING_PROTOCOL.md`, `project-brain/CURRENT_TASK.md`, `project-brain/TASK_BOARD.md`, and `project-brain/DECISION_LOG.md`.
7. Produce Project Reality Check using the live Git commit as the latest commit source.
8. Show live Git latest commit, Last Implementation Commit, and Last Closeout Commit.
9. Continue if live Git latest commit is recorded as Last Implementation Commit or Last Closeout Commit, or if live Git latest commit is only a closeout/state-sync metadata commit newer than Last Closeout Commit. If live Git contains unclassified implementation, code, schema, or governance behavior changes, report mismatch and recommend state sync before implementation.
10. Continue from next approved task only.
11. Do not invent new tasks.

Active ID startup rule:

- Load known active IDs from canonical Project Brain state before reporting Reality Check or closeout.
- Canonical lookup order is `project-brain/CURRENT_TASK.md`, then task-specific evidence docs referenced by the current task, then `project-brain/current/LIVE_OBJECTS.md`.
- Report the source file for each known active ID.
- If no new work occurred, preserve the last known active IDs from canonical Project Brain state.
- Use `UNKNOWN` only when the canonical files truly do not contain the ID.
- If canonical files contain conflicting active IDs, report the conflict and sources instead of choosing one silently or downgrading to `UNKNOWN`.

If the task conflicts with `PROJECT_INDEX.md` or `PROJECT_OPERATING_PROTOCOL.md`, STOP and report the conflict.

TDOS risk classification:

- Before implementation, classify the task using `PROJECT_OPERATING_PROTOCOL.md` section `18B. TDOS Risk-Based Operating Model`.
- No required control for the task's risk class may be skipped.
- Read canonical startup sources and all sources relevant to the task's affected business objects, workflows, agents, routes, schema, and approval gates.

Autonomous Work Loop:

- After Reality Check, load `PROJECT_INDEX.md` and `project-brain/TASK_BOARD.md`.
- Pick the next approved task.
- Route work to the correct existing agent owner.
- Execute AUTO_ALLOWED work without stopping for routine confirmation.
- Run validation.
- Check that no protected system was affected.
- Update Project Brain.
- Commit/push if the change is safe, scoped, validated, and limited to documentation or read-only app behavior.
- Stop only when APPROVAL_REQUIRED work is reached.
- Present proof, risks, and the exact approval request at that gate.

Codex is the main Orchestrator. It must work, validate, collect proof, update Project Brain, and ask Liad only at meaningful approval gates.

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

Approval gate output must use the Executive Approval Report format and include what was done, what was checked, proof of success, risks, what approval is requested, what will happen after approval, and what systems were confirmed untouched.

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

Checkpoint rule:

- Checkpoints are historical context only.
- Do not treat `ACTIVE_SESSION_STATE.md` or `NEXT_SESSION.md` as current state.
- Current project state, current phase, and next task come from `project-brain/CURRENT_TASK.md`.
- Task progress comes from `project-brain/TASK_BOARD.md`.

Memory rule:

- Project Brain wins over ChatGPT memory, Codex memory, previous chat summaries, and assumptions.
- Before proposing or creating any new planning file, agent, map, dashboard, protocol, roadmap, or control system:
  1. Read `PROJECT_INDEX.md`.
  2. Identify whether an existing canonical owner already exists.
  3. Reuse the existing owner if available.
  4. If no owner exists, report the gap and ask approval before creating anything new.

Infrastructure Manager routing rule:

If task involves architecture, schema, new tables, new agents, registries, migration, source-of-truth conflicts, or future platform work, read:

- agents/INFRASTRUCTURE_MANAGER_AGENT.md

before specialist agents.

2. Output:

Project Reality Check:

- Current phase
- Current task
- Next approved task
- Last Implementation Commit
- Last Closeout Commit, if present
- Live Git latest commit
- Git working state
- Commit comparison between live Git, Last Implementation Commit, and Last Closeout Commit in `PROJECT_INDEX.md` and `project-brain/CURRENT_TASK.md`
- Blocked or forbidden actions
- Canonical files relevant to the requested work

Project Reality Check must always run:

- `git status --short --branch`
- `git fetch origin` and `git pull --ff-only origin main` when the working tree is clean and this is a new `hey codex` session
- `git log -1 --oneline`

If live Git latest commit equals Last Closeout Commit, Project Brain is synchronized. If live Git latest commit is a closeout/state-sync metadata commit newer than Last Closeout Commit, do not request another sync just to record that newest closeout hash. Only report a blocking mismatch when live Git has unclassified implementation, code, schema, or governance behavior changes not reflected in Project Brain.

No implementation task may start until the Project Reality Check is shown.

If the Project Reality Check cannot be produced, STOP.

3. Rules:

- Do not change production code or APPROVAL_REQUIRED areas without approval.
- AUTO_ALLOWED documentation and read-only app mapping work may proceed autonomously when it is the next approved task.
- Do not rewrite stable flows.
- Use queue architecture.
- Update Project Brain after completed safe AUTO_ALLOWED work.

Closing:
by codex
