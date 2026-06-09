---
name: project-brain-session-close
description: Close a TalCompressors-ServiceReports-AI Codex session with a Project Brain handoff. Use when the user asks to close a session, end a Codex session, write a session checkpoint, prepare a handoff, update Project Brain after completed work, summarize changed files before stopping, or suggest a commit message without committing.
---

# Project Brain Session Close

Use this skill to close a TalCompressors-ServiceReports-AI work session cleanly and preserve enough state for the next session to resume without screenshots or repeated explanations.

This skill prepares a closeout and, only with explicit user approval, updates Project Brain files. It must not commit, push, deploy, create Maven documents, send email, or modify production systems unless the user separately approves that action.

## Required Reads

Read these files when they exist:

1. `PROJECT_INDEX.md`
2. `AI_RULES.md`
3. `agents/PROJECT_BRAIN_AGENT.md`
4. `project-brain/current/CURRENT_TASK.md`
5. `project-brain/current/LIVE_OBJECTS.md`
6. `project-brain/checkpoints/ACTIVE_SESSION_STATE.md`
7. Latest relevant checkpoint under `project-brain/checkpoints/`
8. `project-brain/PROJECT_BRAIN_MASTER.md`
9. `project-brain/maps/SYSTEM_MAP.md`
10. `project-brain/bugs/CURRENT_BUGS.md`
11. `project-brain/lessons/LESSONS_LEARNED.md`
12. `project-brain/DECISION_LOG.md`

Also inspect:

- `git status --short`
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

## Closeout Workflow

Follow this order:

1. Load Project Brain state from the required reads.
2. Inspect git status.
3. Review changed files before proposing any Project Brain updates.
4. Summarize what was completed, what was verified, and what remains open.
5. Preserve active IDs and stable-system risks.
6. Identify documentation gaps, new bugs, lessons, or roadmap changes.
7. Propose exact Project Brain file updates, if any.
8. Ask for approval before editing Project Brain files.
9. Suggest a commit message only after reviewing changed files.
10. Do not commit or push unless the user explicitly asks.

## Project Brain Update Targets

When the user approves closeout file updates, update only the files that are relevant:

- `project-brain/current/CURRENT_TASK.md` for active task status and next step
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

1. Run `git status --short`.
2. Review relevant diffs.
3. Separate files changed by this session from unrelated existing changes when possible.
4. Report untracked files.
5. Do not stage, commit, or push unless explicitly requested.

If the user asks for a commit later, keep the commit scoped to the approved session changes.

## Forbidden

- Do not commit.
- Do not push.
- Do not deploy.
- Do not create Maven documents.
- Do not send customer email.
- Do not update payment status.
- Do not rewrite stable flows during closeout.
- Do not let AppSheet Bot and Apps Script update the same row.
- Do not update Project Brain without approval.
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
