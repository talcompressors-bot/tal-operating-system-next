# END CODEX

Activation:
by codex

## Mission

Close the current work session.

Do not leave important knowledge only in chat.

`by codex` is the official shutdown command for this repository.

---

## Read First

- PROJECT_INDEX.md
- PROJECT_OPERATING_PROTOCOL.md
- START_CODEX.md
- END_CODEX.md
- .agents/skills/project-brain-session-close/SKILL.md
- project-brain/CURRENT_TASK.md
- project-brain/TASK_BOARD.md
- project-brain/DECISION_LOG.md
- project-brain/current/LIVE_OBJECTS.md for active IDs, when present

If `PROJECT_INDEX.md` has not been read first, STOP.

---

## Required by codex Workflow

When the user says `by codex`, run this workflow:

1. Run Project Reality Check.
2. Run `git status --short --branch`.
3. Run `git log -1 --oneline`.
4. Compare live Git latest commit against Last Implementation Commit and Last Closeout Commit in `PROJECT_INDEX.md` and `project-brain/CURRENT_TASK.md`.
5. Identify changed files.
6. Summarize completed work.
7. Summarize uncommitted changes.
8. Load and preserve known active IDs from canonical Project Brain state. Report the source file for each ID. If no new work occurred, do not downgrade known IDs to `UNKNOWN`.
9. Update canonical state files when needed and either approved or allowed by the Autonomous Work Loop:
   - `PROJECT_INDEX.md`
   - `project-brain/CURRENT_TASK.md`
   - `project-brain/TASK_BOARD.md`
   - `project-brain/DECISION_LOG.md` if decisions changed
   - Last Closeout Commit only for meaningful closeout/state-sync milestones, not every closeout metadata commit
   - Last Implementation Commit only when actual implementation changed
10. Verify no forbidden systems were touched.
11. Verify next approved task is clear.
12. Commit only approved files, or safe/scoped/validated AUTO_ALLOWED documentation and read-only app changes.
13. Push to `origin/main`.
14. Confirm clean `git status --short --branch`.
15. Confirm whether follow-up sync is required. Closeout-only metadata commits do not require another sync just to record their own hash.
16. Print next `hey codex` startup point.

Active ID closeout rule:

- Canonical lookup order is `project-brain/CURRENT_TASK.md`, then task-specific evidence docs referenced by the current task, then `project-brain/current/LIVE_OBJECTS.md`.
- Report `ReportCounter`, `ReportId`, `BusinessDocumentId`, `AutomationCommandId`, and `MavenDocumentId` with a source for each value.
- If no new work occurred, preserve the last known active IDs from canonical Project Brain state.
- Use `UNKNOWN` only when the canonical files truly do not contain the ID.
- If canonical files contain conflicting active IDs, report the conflict and sources instead of overwriting either value or silently reporting `UNKNOWN`.

TDOS closeout rule:

- Closeout must satisfy the controls required by the task risk class in `PROJECT_OPERATING_PROTOCOL.md` section `18B. TDOS Risk-Based Operating Model`.
- No required control for the task's risk class may be skipped.

---

## Required Output

### Session Summary

What was completed?

What was changed?

What remains open?

---

## Autonomous Work Loop Closeout

For completed AUTO_ALLOWED work, `by codex` should close the loop without extra ping-pong:

1. Verify validation results.
2. Check that no protected system was affected.
3. Update Project Brain with completed safe work, evidence, risks, and next task.
4. Commit and push safe/scoped documentation and read-only app changes.
5. Stop only if the next step is APPROVAL_REQUIRED.
6. Present proof, risks, and the exact approval request.

Codex is the main Orchestrator at closeout. It should not ask Liad for routine safe closeout steps; it should complete validation, Project Brain sync, and safe scoped commit/push, then stop at the next meaningful approval gate.

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

APPROVAL_REQUIRED closeout must not proceed into:

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

Approval gate output must use the Executive Approval Report format and include:

- what was done
- what was checked
- proof of success
- risks
- what approval is requested
- what will happen after approval
- what systems were confirmed untouched

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
- Wave 1 Party, Asset, and Service Operations Core: 10%
- Wave 2 BusinessCase and Service Workflow Layer: 15%
- Wave 3 Commercial Runtime and Document Engine: 15%
- Wave 4 Financial Runtime and Settlement: 10%
- Wave 5 Inventory and Procurement: 5%
- Wave 6 Automation and Integration Adapters: 3%
- Wave 7-9 Offline Field Runtime / Production Shadow / Cutover / AppSheet Retirement: 2%

A task is not considered complete unless Project Tree Position is reported.

Proof Requirement and Project Tree Position are both mandatory.

---

### Project Brain Update

Update or confirm:

- Project Reality Check
- Live Git latest commit
- Last Implementation Commit
- Last Closeout Commit, if present
- Commit mismatch status
- Current Task
- Task Board
- Decision Log, if decisions changed
- Next approved task
- Known Active IDs and source files

---

### Current Task Update

Update or confirm:

- Current phase
- Current task
- Next approved task
- Last Implementation Commit
- Last Closeout Commit
- Latest Git commit
- Whether Git and Project Brain are synchronized
- What was tested
- Results
- Session handoff notes
- Known Active IDs preserved or conflicts reported with sources

---

### Risk Review

Verify whether any change affected:

- ServiceApp_FIX
- Maven Sync
- Queue Architecture
- BusinessDocuments
- Apps Script
- Google Sheets
- AppSheet
- Prisma / DB / migrations

---

### Git Review

Run:

- `git status --short --branch`
- `git log -1 --oneline`
- changed files
- new files
- relevant diffs

---

### Commit and Push

Commit only approved files.

Push only the approved commit to `origin/main`.

Confirm clean `git status --short --branch`.

Final output must say: closeout commit created; no follow-up sync required unless implementation or governance state changed.

---

### Next Session Startup

Print the next `hey codex` startup point:

- next approved task
- files to read
- blockers or approvals needed

---

## Forbidden

Do not deploy.

Do not modify production code.

Do not touch Prisma, DB, migrations, Google Sheets, AppSheet, Maven, or production Apps Script during closeout unless explicitly approved for that exact action.

Do not commit or push unapproved files except safe/scoped/validated AUTO_ALLOWED documentation and read-only app changes.

Do not invent new tasks.

---

## Final Output Format

1. Session Summary
2. Brain Updates
3. Risks
4. Commit and Push Result
5. Next `hey codex` Startup Point
