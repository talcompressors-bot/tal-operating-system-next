---
name: project-brain-startup
description: Load TalCompressors-ServiceReports-AI project memory before analysis or code work. Use when starting a session, recovering context, checking current project state, responding to project-status requests, or before modifying code, Apps Script, Maven workflows, AppSheet automation, or Project Brain files.
---

# Project Brain Startup

Use this skill to establish the current project state before analysis, planning, or changes in the TalCompressors-ServiceReports-AI repository.

## First Rule

Do not write or change code before reading Project Brain context.

Do not assume project structure, current task, stable systems, or active IDs from memory. Read the repository files first.

## Required Reads

Read these files in order when they exist:

1. `PROJECT_OPERATING_PROTOCOL.md`
2. `PROJECT_INDEX.md`
3. `AI_RULES.md`
4. `agents/AGENT_REGISTRY.md`
5. `agents/PROJECT_BRAIN_AGENT.md`
6. `project-brain/current/CURRENT_TASK.md`
7. `project-brain/current/LIVE_OBJECTS.md`
8. `project-brain/checkpoints/ACTIVE_SESSION_STATE.md`
9. Latest relevant checkpoint under `project-brain/checkpoints/`
10. `project-brain/PROJECT_BRAIN_MASTER.md`
11. `project-brain/maps/SYSTEM_MAP.md`
12. `project-brain/bugs/CURRENT_BUGS.md`
13. `project-brain/lessons/LESSONS_LEARNED.md`
14. `project-brain/DECISION_LOG.md`

If a file is missing or empty, report that as a documentation gap instead of inventing content.

## Current Task Source

Use `project-brain/current/CURRENT_TASK.md` as the active current-task source of truth.

Treat `project-brain/CURRENT_TASK.md` as deprecated if it points to the current-task file.

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

1. Current active task
2. Current state
3. Known active IDs
4. Stable systems
5. Open bugs
6. Highest risks
7. Files that must not be broken
8. Recommended next step
9. Approval needed, if any
