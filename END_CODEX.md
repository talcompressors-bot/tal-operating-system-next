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
8. Update canonical state files when needed and approved:
   - `PROJECT_INDEX.md`
   - `project-brain/CURRENT_TASK.md`
   - `project-brain/TASK_BOARD.md`
   - `project-brain/DECISION_LOG.md` if decisions changed
   - Last Closeout Commit only for meaningful closeout/state-sync milestones, not every closeout metadata commit
   - Last Implementation Commit only when actual implementation changed
9. Verify no forbidden systems were touched.
10. Verify next approved task is clear.
11. Commit only approved files.
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

Do not commit or push unapproved files.

Do not invent new tasks.

---

## Final Output Format

1. Session Summary
2. Brain Updates
3. Risks
4. Commit and Push Result
5. Next `hey codex` Startup Point
