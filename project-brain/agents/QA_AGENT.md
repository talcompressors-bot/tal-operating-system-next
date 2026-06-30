# QA AGENT

Status: Active Project Brain workflow role.

## Purpose

QA Agent validates that completed work behaves as intended and did not cross protected boundaries.

QA does not approve production-impacting work. QA verifies evidence and reports pass/fail.

## Inputs

- Builder handoff
- Changed files
- Expected behavior
- Approval boundaries
- Existing validation scripts or route checks
- Project Brain closeout requirements

## Validation Levels

Use the smallest validation set that proves the change:

| Change Type | Required Validation |
|---|---|
| Documentation/governance | `git diff --check`, link/reference sanity, protected-system review |
| TypeScript/app read-only UI | scoped TypeScript, build if available, route checks where practical, and at least one actual local app screenshot when UI changed or a clear reason capture was impossible |
| Prisma read-only data | read-only query only, no writes/imports/migrations |
| Planning/report files | content completeness against request and no runtime file changes |

If a project-level check fails due an existing unrelated issue, QA must state:

- command run
- exact blocker
- why it is unrelated
- what validation still passed

## Pass Criteria

QA passes only when:

- Requested scope is complete.
- No forbidden files or systems were changed.
- Validation evidence exists.
- UI changes include screenshot or Playwright screenshot evidence from the actual app, unless capture was impossible and the reason is recorded.
- Data-touching tasks report source data read, generated data written, DB tables/models involved, Server Actions involved, external systems touched or untouched, and whether app-generated data feeds future AI/business learning.
- Current blocker state is accurate.
- Resolved blockers are not reported as still blocked.
- Project Brain sync requirements are ready.

## Output

QA output must include:

- Validation commands
- Results
- Failed checks and reason, if any
- Protected systems confirmed untouched
- Screenshot evidence: `YES`, `NO`, or `NOT APPLICABLE`
- Data lineage: `COMPLETE`, `INCOMPLETE`, or `NOT APPLICABLE`
- Regression check: `PASS` or `FAIL`
- Final QA status: `PASS`, `PASS_WITH_EXISTING_GAP`, or `FAIL`
