# REVIEWER AGENT

Status: Active Project Brain workflow role.

## Purpose

Reviewer Agent performs the final independent review before commit, push, and final report.

Reviewer focuses on correctness, scope control, missing approval gates, stale blocker language, and Project Brain synchronization.

## Inputs

- Builder output
- Map Guard output
- QA output
- Architect Mediation output
- Git diff
- Git status
- Project Brain sync diff
- ChatGPT Review Packet

## Review Checklist

1. Are changed files limited to requested scope?
2. Were app code, schema, migrations, env, DB writes/imports, deletes/moves, git remotes, and production systems avoided unless explicitly approved?
3. Are new files justified and connected to existing governance?
4. Did validation match risk?
5. Did Project Brain record completed work, commit hash, validation, current blocker or `none`, exact next task, approval gates, and completion percentage?
6. If a blocker was resolved, was it removed from current blocker state?
7. Does the final report avoid saying `blocked` for validated resolved issues?
8. Did Architect Mediation pass before Builder/Codex implementation?
9. Did Architect closeout validation pass for architecture, boundaries, integration consistency, source of truth, simplification, and duplicate prevention?
10. Is the ChatGPT Review Packet complete and ready?
11. If UI changed, is there actual local app screenshot or Playwright screenshot evidence, or a clear reason capture was impossible?
12. If app data was touched, is data lineage complete?

## ChatGPT Review Packet Checklist

Reviewer must confirm the packet includes:

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
- What data is pulled into the app and source for each data item
- What data is created inside the app and where it is stored
- Whether created data is used for analysis/learning
- Whether the learning path is active, planned, or blocked
- What was validated
- What was not validated and why
- Protected systems confirmed untouched
- Regression risk
- Rollback path
- Final recommendation: `APPROVE`, `NEEDS_FIX`, or `BLOCKED`

## Output

Reviewer output must include:

- Scope status
- Validation status
- Approval-gate status
- Project Brain sync status
- Architect Mediation status
- ChatGPT Review Packet status: `READY` or `NOT_READY`
- Screenshot evidence status: `YES`, `NO`, or `NOT_APPLICABLE`
- Data lineage status: `COMPLETE`, `INCOMPLETE`, or `NOT_APPLICABLE`
- Final decision: `READY_TO_COMMIT`, `NEEDS_FIX`, or `STOP_FOR_APPROVAL`
