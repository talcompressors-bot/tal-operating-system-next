---
name: project-brain-session-close
description: Close a TalCompressors-ServiceReports-AI Codex session with a Project Brain handoff. Use when the user says "by codex" or asks to close a session, end a Codex session, write a session checkpoint, prepare a handoff, update Project Brain after completed work, summarize changed files before stopping, commit approved closeout files, push approved closeout files, or suggest a commit message.
---

# Project Brain Session Close

Use this skill to close a TalCompressors-ServiceReports-AI work session cleanly and preserve enough state for the next session to resume without screenshots or repeated explanations.

This skill prepares a closeout and, only with explicit user approval, updates Project Brain files. `by codex` is the official shutdown command. It may commit and push only approved closeout files as part of that command. It must not deploy, create Maven documents, send email, or modify production systems unless the user separately approves that exact action.

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
3. Identify changed files.
4. Summarize completed work.
5. Summarize uncommitted changes.
6. Update canonical state files when needed and approved:
   - `PROJECT_INDEX.md`
   - `project-brain/CURRENT_TASK.md`
   - `project-brain/TASK_BOARD.md`
   - `project-brain/DECISION_LOG.md` if decisions changed
7. Verify no forbidden systems were touched.
8. Verify next approved task is clear.
9. Commit only approved files.
10. Push to `origin/main`.
11. Confirm clean `git status --short --branch`.
12. Print next `hey codex` startup point.

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

## Git Rules

Before suggesting a commit message:

1. Run `git status --short --branch`.
2. Review relevant diffs.
3. Separate files changed by this session from unrelated existing changes when possible.
4. Report untracked files.
5. Stage, commit, and push only approved files when `by codex` or a separate explicit user request authorizes it.

If the user asks for a commit later, keep the commit scoped to the approved session changes.

## Forbidden

- Do not deploy.
- Do not create Maven documents.
- Do not send customer email.
- Do not update payment status.
- Do not rewrite stable flows during closeout.
- Do not let AppSheet Bot and Apps Script update the same row.
- Do not update Project Brain without approval.
- Do not commit or push unapproved files.
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
