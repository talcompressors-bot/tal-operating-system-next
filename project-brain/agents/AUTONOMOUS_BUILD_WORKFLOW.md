# AUTONOMOUS BUILD WORKFLOW

Status: Active Project Brain workflow.

## Purpose

Define the default autonomous build loop for safe work in this repository.

This workflow extends `PROJECT_OPERATING_PROTOCOL.md` and `PROJECT_INDEX.md`. If they conflict, `PROJECT_OPERATING_PROTOCOL.md` wins.

## Workflow

| Step | Owner | Action | Stop Condition |
|---|---|---|---|
| 1 | Codex Orchestrator | Run startup checks, read Project Brain, confirm current task | Dirty worktree or source conflict |
| 2 | Map Guard | Check source map, ownership, reuse, protected systems, approval gates | APPROVAL_REQUIRED action |
| 3 | Builder | Implement approved/AUTO_ALLOWED scoped work | Need env/schema/DB/source-system/production action |
| 4 | QA | Run risk-scaled validation and protected-system check | Validation fail that affects scope |
| 5 | Reviewer | Review diff, scope, approval gates, blocker language, Project Brain sync readiness | Missing evidence or approval |
| 6 | Git | Commit feature/change with requested message when applicable | Unrelated files staged |
| 7 | Project Brain | Sync current state, commit hash, validation, blocker, next task, approval gates, completion percentage | Missing required closeout field |
| 8 | Git | Commit and push Project Brain sync | Push failure |
| 9 | Codex | Final report with concise evidence and next startup point | None |

## Automatic Actions

Codex may automatically:

- read files
- inspect Git
- create/update documentation
- run local checks
- run read-only validation
- implement safe read-only app/UI work when approved or AUTO_ALLOWED
- commit and push safe scoped work
- update, commit, and push Project Brain closeout sync

## Human Approval Required

Codex must ask before:

- env changes
- schema changes
- migrations
- Prisma `db push`
- DB writes/imports/seeds
- Google Sheets changes
- AppSheet changes
- Maven actions
- Apps Script changes
- Drive writes
- email/customer-facing actions
- production deployment/cutover
- deletes/moves
- git remote changes
- new runtime agent architecture

## Final Report Requirements

Final report must include:

1. Executive summary
2. Project wave map
3. Subtask completion table per wave
4. Percent complete per subtask
5. Overall completion estimate
6. Completed today
7. Blockers
8. Next 3 tasks
9. Approval gates
10. Exact next `hey codex` startup instruction

Use tables where possible. Keep it concise but complete.
