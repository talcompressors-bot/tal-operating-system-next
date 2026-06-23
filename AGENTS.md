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

## Multi-Agent Operating Workflow

Codex remains the main Orchestrator. For safe work, Codex should use the Project Brain workflow roles in `project-brain/agents/`:

1. `MAP_GUARD_AGENT.md` checks source ownership, reuse, protected systems, and approval gates.
2. `BUILDER_AGENT.md` performs approved/AUTO_ALLOWED scoped work.
3. `QA_AGENT.md` validates behavior and protected-system boundaries.
4. `REVIEWER_AGENT.md` reviews scope, evidence, Project Brain sync, and final report readiness.
5. `AGENT_COMMUNICATION_PROTOCOL.md` defines handoff packets.
6. `AUTONOMOUS_BUILD_WORKFLOW.md` defines the end-to-end autonomous loop.

These Project Brain workflow roles do not replace active agents under `agents/AGENT_REGISTRY.md`. Specialist work still routes to the existing active owner agents listed there.

## Automatic Project Brain Closeout Sync

After every completed task, Codex must update Project Brain before the final report.

Required updates:

1. Update `project-brain/CURRENT_TASK.md`.
2. Update `project-brain/TASK_BOARD.md`.
3. Update `project-brain/DECISION_LOG.md` when decisions changed.
4. Update `PROJECT_INDEX.md` when structure, status, navigation, current task, next task, or completion state changed.

The closeout sync must record:

- what was completed
- commit hash
- validation results
- current blocker, or `none`
- exact next task
- approval gates
- project completion percentage

If validation proves a blocker is resolved, remove it from the current blocker state. The final response must not say `blocked` for an item that validation proved resolved.

After a successful feature commit, Codex may automatically edit Project Brain docs and run `git add`, `git commit`, and `git push` for the Project Brain sync.

Codex must still ask approval before:

- env changes
- schema changes
- migrations
- DB writes/imports
- deletes/moves
- git remote changes
- production integrations
