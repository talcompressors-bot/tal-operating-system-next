---
name: project-brain-session-close
description: Close a TalCompressors-ServiceReports-AI Codex session with a Project Brain handoff. Use when the user says "by codex" or asks to close a session, end a Codex session, write a session checkpoint, prepare a handoff, update Project Brain after completed work, summarize changed files before stopping, commit approved closeout files, push approved closeout files, or suggest a commit message.
---

# Project Brain Session Close

Use this skill to close a TalCompressors-ServiceReports-AI work session cleanly and preserve enough state for the next session to resume without screenshots or repeated explanations.

This skill prepares a closeout and updates Project Brain for approved or completed AUTO_ALLOWED work. `by codex` is the official shutdown command. It may commit and push approved files or safe/scoped/validated AUTO_ALLOWED documentation and read-only app changes. It must not deploy, create Maven documents, send email, or modify production systems unless the user separately approves that exact action.

## Required Reads

Read these files when they exist:

1. `PROJECT_INDEX.md`
2. `PROJECT_OPERATING_PROTOCOL.md`
3. `START_CODEX.md`
4. `END_CODEX.md`
5. `.agents/skills/project-brain-session-close/SKILL.md`
6. `project-brain/CURRENT_TASK.md`
7. `project-brain/TASK_BOARD.md`
8. `project-brain/DECISION_LOG.md`

Also inspect:

- `git status --short --branch`
- `git log -1 --oneline`
- Relevant diffs for files changed in the current session
- Any task-specific agent or skill files used during the session

If a required file is missing or empty, report it as a documentation gap. Do not invent missing state.

## Preserve Important IDs

Always preserve and report:

- `ReportCounter`
- `ReportId`
- `BusinessDocumentId`
- `AutomationCommandId`
- `MavenDocumentId`

If a value is unknown, write `UNKNOWN`. Never invent IDs.

## Stable Systems To Protect

Before recommending closeout updates, identify whether the session affected or could affect:

- AutomationCommands queue architecture
- BusinessDocuments workflow
- Maven draft creation
- Report counter logic
- Drive folder logic
- Signed report / HTML file save logic
- AppSheet Bot and Apps Script row update boundaries

## by codex Closeout Workflow

Follow this order:

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

## Project Brain Update Targets

When the user approves closeout file updates, update only the files that are relevant:

- `PROJECT_INDEX.md` for Project Reality Check and navigation state
- `project-brain/CURRENT_TASK.md` for active task status and next step
- `project-brain/TASK_BOARD.md` for task board and progress map
- `project-brain/current/LIVE_OBJECTS.md` for known active IDs
- `project-brain/checkpoints/` for a dated handoff checkpoint
- `project-brain/lessons/LESSONS_LEARNED.md` for durable lessons
- `project-brain/bugs/CURRENT_BUGS.md` for new or changed bugs
- `project-brain/roadmap/ROADMAP.md` if priorities changed
- `project-brain/PROJECT_BRAIN_MASTER.md` only for durable architecture or status changes
- `project-brain/DECISION_LOG.md` only for approved decisions

Do not update Project Brain files just because the session is ending. Update them only when there is meaningful state to preserve.

## Autonomous Work Loop Closeout

AUTO_ALLOWED work may be closed without extra ping-pong:

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

APPROVAL_REQUIRED work must stop and request explicit approval:

- `prisma/schema.prisma` changes
- Prisma `db push` or migration
- DB writes/imports
- Supabase project/settings changes
- Google Sheets/AppSheet/Maven/Apps Script changes
- production deployment
- email/Drive/customer-facing actions
- deleting data/files
- new agent/control architecture

Closeout loop:

1. Verify validation results.
2. Check that no protected system was affected.
3. Update Project Brain with evidence, risks, and next task.
4. Commit/push if safe and scoped.
5. Stop only when APPROVAL_REQUIRED is reached.
6. Present proof, risks, and exact approval request.

Codex is the main Orchestrator at closeout. It should complete safe closeout autonomously and ask Liad only at meaningful gates.

Approval-gate output must include what was done, what was checked, proof of success, risks, requested approval, what will happen after approval, and systems confirmed untouched.

Proof Requirement:

Before closing any completed task, Codex must provide:

1. What was wrong before
2. What changed
3. Evidence
4. Validation result
5. User-visible impact

Preferred evidence includes screenshots, Playwright screenshots, HTML render samples, before/after comparisons, and counts.

A task is not considered complete with only HTTP 200, PASS, or compile success. Codex must demonstrate the visible outcome whenever possible.

## Git Rules

Before suggesting a commit message:

1. Run `git status --short --branch`.
2. Run `git log -1 --oneline`.
3. Compare live Git latest commit against Last Implementation Commit and Last Closeout Commit.
4. Review relevant diffs.
5. Separate files changed by this session from unrelated existing changes when possible.
6. Report untracked files.
7. Stage, commit, and push only approved files, or safe/scoped/validated AUTO_ALLOWED documentation and read-only app changes.

If the user asks for a commit later, keep the commit scoped to the approved session changes.

## Forbidden

- Do not deploy.
- Do not create Maven documents.
- Do not send customer email.
- Do not update payment status.
- Do not rewrite stable flows during closeout.
- Do not let AppSheet Bot and Apps Script update the same row.
- Do not update Project Brain except for approved work or completed AUTO_ALLOWED work.
- Do not commit or push unapproved files except safe/scoped/validated AUTO_ALLOWED documentation and read-only app changes.
- Do not erase or overwrite historical checkpoints.

## Output Format

Use this structure:

```text
Session Close Summary

Current Task
- ...

Completed
- ...

Changed Files
- ...

Verification
- ...
- Live Git latest commit:
- Last Implementation Commit:
- Last Closeout Commit, if present:
- Commit mismatch status:

Known Active IDs
- ReportCounter:
- ReportId:
- BusinessDocumentId:
- AutomationCommandId:
- MavenDocumentId:

Stable Systems
- ...

Open Bugs / Risks
- ...

Documentation Gaps
- ...

Recommended Project Brain Updates
- ...

Recommended Next Step
- ...

Suggested Commit Message
- ...
```

If no files changed, state that clearly and do not suggest a commit unless the user asks for one.
