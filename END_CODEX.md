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
8. Update canonical state files when needed and either approved or allowed by the Autonomous Work Loop:
   - `PROJECT_INDEX.md`
   - `project-brain/CURRENT_TASK.md`
   - `project-brain/TASK_BOARD.md`
   - `project-brain/DECISION_LOG.md` if decisions changed
   - Last Closeout Commit only for meaningful closeout/state-sync milestones, not every closeout metadata commit
   - Last Implementation Commit only when actual implementation changed
9. Verify no forbidden systems were touched.
10. Verify next approved task is clear.
11. Commit only approved files, or safe/scoped/validated AUTO_ALLOWED documentation and read-only app changes.
12. Push to `origin/main`.
13. Confirm clean `git status --short --branch`.
14. Confirm whether follow-up sync is required. Closeout-only metadata commits do not require another sync just to record their own hash.
15. Print next `hey codex` startup point.

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

- `git fetch`
- `git pull --ff-only`
- `git status`
- `git log`
- read-only validation
- read-only database queries
- read-only DB query
- local tests
- local TypeScript compile checks
- local Next.js build checks
- Prisma read-only queries
- UI validation checks
- Project Brain updates after completed safe work
- safe documentation commits
- safe read-only implementation commits after validation

Do not ask Liad for approval when executing AUTO_APPROVED actions. Only stop for APPROVAL_REQUIRED gates.

APPROVAL_REQUIRED closeout must not proceed into:

- `prisma/schema.prisma` changes
- Prisma `db push` or migration
- DB writes/imports
- Supabase project/settings changes
- Google Sheets/AppSheet/Maven/Apps Script changes
- production deployment
- email/Drive/customer-facing actions
- deleting data/files
- new agent/control architecture

Approval gate output must include:

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
- PROJECT COMPLETION
- CRITICAL PATH
- NEXT APPROVAL GATE

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
