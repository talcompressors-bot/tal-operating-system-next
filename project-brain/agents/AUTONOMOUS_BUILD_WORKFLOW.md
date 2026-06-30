# AUTONOMOUS BUILD WORKFLOW

Status: Active Project Brain workflow.

## Purpose

Define the default autonomous build loop for safe work in this repository.

This workflow extends `PROJECT_OPERATING_PROTOCOL.md` and `PROJECT_INDEX.md`. If they conflict, `PROJECT_OPERATING_PROTOCOL.md` wins.

## Workflow

| Step | Owner | Action | Stop Condition |
|---|---|---|---|
| 1 | Codex Orchestrator | Run startup checks, read Project Brain, confirm current task | Dirty worktree or source conflict |
| 2 | Codex Orchestrator | Convert Liad/ChatGPT intent into a Task Packet with business value, reuse plan, data lineage, approval gates, validation plan, and screenshot plan when UI changes | Missing business value, current-goal alignment, data lineage, or reuse proof |
| 3 | Infrastructure Manager / Architect | Run Architect Mediation Gate on the Task Packet: architecture, source-of-truth, reuse, duplicate prevention, protected boundaries, data lineage, learning path, simplification | Architect Mediation is not `PASS` |
| 4 | Map Guard | Check source map, ownership, reuse, protected systems, approval gates | APPROVAL_REQUIRED action |
| 5 | Builder | Implement approved/AUTO_ALLOWED scoped work | Need env/schema/DB/source-system/production action |
| 6 | QA | Run risk-scaled validation, visual proof requirements, data-lineage checks, and protected-system check | Validation fail that affects scope |
| 7 | Reviewer | Review diff, scope, approval gates, blocker language, evidence, Project Brain/sync readiness, and ChatGPT Review Packet readiness | Missing evidence, ChatGPT Review Packet, or approval |
| 8 | Infrastructure Manager / Architect | Validate architecture, boundaries, integration consistency, source of truth, simplification, and duplicate prevention before closeout | Architect closeout validation is not `PASS` |
| 9 | Git | Commit feature/change with requested message when applicable | Unrelated files staged |
| 10 | Project Brain | Sync current state, commit hash, validation, blocker, next task, approval gates, completion percentage | Missing required closeout field |
| 11 | Git | Commit and push Project Brain sync | Push failure |
| 12 | Codex | Final report with ChatGPT Review Packet, concise evidence, sync status, and next startup point | None |

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

1. Architect Mediation: `PASS` / `FAIL`
2. QA: `PASS` / `FAIL`
3. Reviewer: `PASS` / `FAIL`
4. ChatGPT Review Packet: `READY` / `NOT READY`
5. Screenshot evidence: `YES` / `NO` / `NOT APPLICABLE`
6. Data lineage: `COMPLETE` / `INCOMPLETE`
7. Regression check: `PASS` / `FAIL`
8. Sync Status: `GREEN` / `YELLOW` / `RED`
9. Executive summary
10. Project wave map
11. Subtask completion table per wave
12. Percent complete per subtask
13. Overall completion estimate
14. Completed today
15. Blockers
16. Next 3 tasks
17. Approval gates
18. Exact next `hey codex` startup instruction

Use tables where possible. Keep it concise but complete.

## ChatGPT Review Packet

Before closeout, Codex must prepare a ChatGPT Review Packet with:

- What was requested
- What was built
- What changed in the app
- Screenshot path or Playwright screenshot evidence from the actual app when UI changed, or why screenshot capture was impossible
- Which route/page was tested
- What user-visible improvement exists
- What became simpler
- What duplication was prevented
- Which existing files/components/agents were reused
- Which alternatives were rejected and why
- What data is pulled into the app and source for each item
- What data is created inside the app and where it is stored
- Whether created data is used for analysis/learning
- Whether the learning path is active, planned, or blocked
- What was validated
- What was not validated and why
- Protected systems confirmed untouched
- Regression risk
- Rollback path
- Final recommendation: `APPROVE`, `NEEDS_FIX`, or `BLOCKED`

HTTP 200 alone is not enough for UI changes; actual local app screenshot evidence is required unless capture is impossible and the reason is reported.
