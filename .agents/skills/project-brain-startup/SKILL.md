---
name: project-brain-startup
description: Load TalCompressors-ServiceReports-AI project memory before analysis or code work. Use when starting a session, recovering context, checking current project state, responding to project-status requests, or before modifying code, Apps Script, Maven workflows, AppSheet automation, or Project Brain files.
---

# Project Brain Startup

Use this skill to establish the current project state before analysis, planning, or changes in the TalCompressors-ServiceReports-AI repository.

## First Rule

Every Codex task or session must begin by reading `PROJECT_INDEX.md`.

If `PROJECT_INDEX.md` has not been read first, STOP. Do not analyze, plan, propose, or implement until `PROJECT_INDEX.md` is read.

If the task conflicts with `PROJECT_INDEX.md` or `PROJECT_OPERATING_PROTOCOL.md`, STOP and report the conflict.

Do not write or change code before reading Project Brain context.

Do not assume project structure, current task, stable systems, or active IDs from memory. Read the repository files first.

## Required Reads

Read these files in order when they exist:

1. `PROJECT_INDEX.md`
2. `PROJECT_OPERATING_PROTOCOL.md`
3. `project-brain/CURRENT_TASK.md`
4. `project-brain/TASK_BOARD.md`
5. Relevant task-specific docs

If a file is missing or empty, report that as a documentation gap instead of inventing content.

For architecture, schema, migration, source-of-truth, or future-platform work, relevant task-specific docs include:

- `project-brain/DECISION_LOG.md`
- `project-brain/maps/SYSTEM_MAP.md`
- `project-brain/migration/POSTGRESQL_V1_SCOPE.md`
- the relevant agent file under `agents/`

## Current Task Source

Use `project-brain/CURRENT_TASK.md` as the active current-task, current phase, and next task source of truth.

Treat `project-brain/current/CURRENT_TASK.md` as a retired compatibility path only.

Project Brain wins over ChatGPT memory, Codex memory, previous chat summaries, and assumptions.

Before proposing or creating any new planning file, agent, map, dashboard, protocol, roadmap, or control system:

1. Read `PROJECT_INDEX.md`.
2. Identify whether an existing canonical owner already exists.
3. Reuse the existing owner if available.
4. If no owner exists, report the gap and ask approval before creating anything new.

## Preserve Important IDs

Always preserve and report known values for:

- `ReportCounter`
- `ReportId`
- `BusinessDocumentId`
- `AutomationCommandId`
- `MavenDocumentId`

If a value is not known, write `UNKNOWN`. Never invent IDs.

## Stable Systems To Protect

Before recommending or making any change, identify whether it can affect:

- AutomationCommands queue architecture
- BusinessDocuments workflow
- Maven draft creation
- Report counter logic
- Drive folder logic
- Signed report / HTML file save logic
- AppSheet Bot and Apps Script row update boundaries

## Safety Check Before Changes

Before any modification, answer:

1. What is changing?
2. Why is it changing?
3. What stable flow could be affected?
4. How will it be tested?
5. Is rollback possible?
6. Has the user approved the change?

Do not modify production systems or deploy without explicit approval.

## Forbidden

- Do not rewrite stable flows.
- Do not change multiple areas together unless the user explicitly approves the scope.
- Do not deploy without approval.
- Do not let AppSheet Bot and Apps Script update the same row simultaneously.
- Do not create new functions before understanding existing functions.
- Do not update Project Brain files without user approval.

## Output Format

When this skill is used for startup or project-state recovery, respond with:

Project Reality Check:

1. Current phase
2. Current task
3. Next approved task
4. Last verified commit
5. Blocked or forbidden actions
6. Canonical files relevant to the requested work
7. Approval needed, if any

No implementation task may start until the Project Reality Check is shown.

If the Project Reality Check cannot be produced, STOP.
