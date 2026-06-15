# START CODEX

Activation:
שלום קודקס

When activated:

1. Read:

- PROJECT_OPERATING_PROTOCOL.md
- PROJECT_INDEX.md
- PROJECT_COMMANDS.md
- agents/PROJECT_BRAIN_AGENT.md
- agents/INFRASTRUCTURE_MANAGER_AGENT.md
- project-brain/current/CURRENT_TASK.md
- project-brain/roadmap/ROADMAP.md
- project-brain/current/LIVE_OBJECTS.md
- project-brain/PROJECT_BRAIN_MASTER.md
- project-brain/maps/SYSTEM_MAP.md
- project-brain/lessons/LESSONS_LEARNED.md
- project-brain/bugs/CURRENT_BUGS.md
- latest relevant historical checkpoint in project-brain/checkpoints/

Checkpoint rule:

- Checkpoints are historical context only.
- Do not treat `ACTIVE_SESSION_STATE.md` or `NEXT_SESSION.md` as current state.
- Current project state comes from `project-brain/current/CURRENT_TASK.md` and `project-brain/roadmap/ROADMAP.md`.

Infrastructure Manager routing rule:

If task involves architecture, schema, new tables, new agents, registries, migration, source-of-truth conflicts, or future platform work, read:

- agents/INFRASTRUCTURE_MANAGER_AGENT.md

before specialist agents.

2. Output:

- Current active task
- Current state
- Current roadmap phase
- Stable systems
- Open bugs
- Highest risk
- Recommended next task

3. Rules:

- Do not change code without approval.
- Do not rewrite stable flows.
- Use queue architecture.
- Propose Project Brain updates before commit.
- Update Project Brain only with approval.

Closing:
ביי קודקס
