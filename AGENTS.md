# Codex Repository Startup Binding

When the user says exactly `hey codex`, do not ask what to work on. Treat it as the official project-brain startup command for this repository.

Required action:

1. Locate the active Git repository root.
2. Run `git status --short --branch`.
3. If the working tree is clean, run `git fetch origin` and `git pull --ff-only origin main`.
4. If the working tree is not clean, stop, report uncommitted changes, and do not pull until the user approves a stash, commit, or discard plan.
5. Run `git log -1 --oneline`.
6. Read `START_CODEX.md`.
7. Read `PROJECT_INDEX.md`.
8. Read `PROJECT_OPERATING_PROTOCOL.md`.
9. Read `project-brain/CURRENT_TASK.md`.
10. Read `project-brain/TASK_BOARD.md`.
11. Read `project-brain/DECISION_LOG.md`.
12. Produce the Project Reality Check.
13. Continue from the recorded startup point only.

Project Reality Check must include the required project tree reporting from `PROJECT_INDEX.md`.

Do not start implementation before the Project Reality Check is shown.
