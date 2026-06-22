# START CODEX

Activation:
hey codex

`hey codex` is the official startup command for this repository.

When activated:

1. Read:

- PROJECT_INDEX.md
- PROJECT_OPERATING_PROTOCOL.md
- project-brain/CURRENT_TASK.md
- project-brain/TASK_BOARD.md
- relevant task-specific docs

If `PROJECT_INDEX.md` has not been read first, STOP. Do not analyze, plan, propose, or implement until `PROJECT_INDEX.md` is read.

When the user says `hey codex`:

1. Read `PROJECT_INDEX.md` first.
2. Produce Project Reality Check.
3. Continue from next approved task only.
4. Do not invent new tasks.

If the task conflicts with `PROJECT_INDEX.md` or `PROJECT_OPERATING_PROTOCOL.md`, STOP and report the conflict.

Checkpoint rule:

- Checkpoints are historical context only.
- Do not treat `ACTIVE_SESSION_STATE.md` or `NEXT_SESSION.md` as current state.
- Current project state, current phase, and next task come from `project-brain/CURRENT_TASK.md`.
- Task progress comes from `project-brain/TASK_BOARD.md`.

Memory rule:

- Project Brain wins over ChatGPT memory, Codex memory, previous chat summaries, and assumptions.
- Before proposing or creating any new planning file, agent, map, dashboard, protocol, roadmap, or control system:
  1. Read `PROJECT_INDEX.md`.
  2. Identify whether an existing canonical owner already exists.
  3. Reuse the existing owner if available.
  4. If no owner exists, report the gap and ask approval before creating anything new.

Infrastructure Manager routing rule:

If task involves architecture, schema, new tables, new agents, registries, migration, source-of-truth conflicts, or future platform work, read:

- agents/INFRASTRUCTURE_MANAGER_AGENT.md

before specialist agents.

2. Output:

Project Reality Check:

- Current phase
- Current task
- Next approved task
- Last verified commit
- Blocked or forbidden actions
- Canonical files relevant to the requested work

No implementation task may start until the Project Reality Check is shown.

If the Project Reality Check cannot be produced, STOP.

3. Rules:

- Do not change code without approval.
- Do not rewrite stable flows.
- Use queue architecture.
- Propose Project Brain updates before commit.
- Update Project Brain only with approval.

Closing:
by codex
