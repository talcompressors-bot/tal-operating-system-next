# START CODEX

Activation:
hey codex

`hey codex` is the official startup command for this repository.

When activated:

1. Locate the active Git repository root.
2. Run:

- `git status --short --branch`

3. If the working tree is clean, run:

- `git fetch origin`
- `git pull --ff-only origin main`

4. If the working tree is not clean:

- STOP.
- Report uncommitted changes.
- Do not pull until the user approves a stash, commit, or discard plan.

5. After a successful pull, run:

- `git log -1 --oneline`

6. Only then read:

- PROJECT_INDEX.md
- PROJECT_OPERATING_PROTOCOL.md
- project-brain/CURRENT_TASK.md
- project-brain/TASK_BOARD.md
- relevant task-specific docs

Do not read Project Brain files until the repository has been checked and fast-forwarded from `origin/main` when the working tree is clean.

When the user says `hey codex`:

1. Locate the active Git repository root.
2. Run `git status --short --branch`.
3. If the working tree is clean, run `git fetch origin` and `git pull --ff-only origin main`.
4. If the working tree is not clean, STOP, report uncommitted changes, and do not pull until the user approves a stash, commit, or discard plan.
5. After a successful pull, run `git log -1 --oneline`.
6. Only then read `PROJECT_INDEX.md`, `PROJECT_OPERATING_PROTOCOL.md`, `project-brain/CURRENT_TASK.md`, and `project-brain/TASK_BOARD.md`.
7. Produce Project Reality Check using the live Git commit as the latest commit source.
8. Show live Git latest commit, Last Implementation Commit, and Last Closeout Commit.
9. Continue if live Git latest commit is recorded as Last Implementation Commit or Last Closeout Commit, or if live Git latest commit is only a closeout/state-sync metadata commit newer than Last Closeout Commit. If live Git contains unclassified implementation, code, schema, or governance behavior changes, report mismatch and recommend state sync before implementation.
10. Continue from next approved task only.
11. Do not invent new tasks.

If the task conflicts with `PROJECT_INDEX.md` or `PROJECT_OPERATING_PROTOCOL.md`, STOP and report the conflict.

Autonomous Work Loop:

- After Reality Check, load `PROJECT_INDEX.md` and `project-brain/TASK_BOARD.md`.
- Pick the next approved task.
- Route work to the correct existing agent owner.
- Execute AUTO_ALLOWED work without stopping for routine confirmation.
- Run validation.
- Check that no protected system was affected.
- Update Project Brain.
- Commit/push if the change is safe, scoped, validated, and limited to documentation or read-only app behavior.
- Stop only when APPROVAL_REQUIRED work is reached.
- Present proof, risks, and the exact approval request at that gate.

Codex is the main Orchestrator. It must work, validate, collect proof, update Project Brain, and ask Liad only at meaningful approval gates.

AUTO_ALLOWED:

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

APPROVAL_REQUIRED:

- `prisma/schema.prisma` changes
- Prisma `db push` or migration
- DB writes/imports
- Supabase project/settings changes
- Google Sheets/AppSheet/Maven/Apps Script changes
- production deployment
- email/Drive/customer-facing actions
- deleting data/files
- new agent/control architecture

Approval gate output must include what was done, what was checked, proof of success, risks, what approval is requested, what will happen after approval, and what systems were confirmed untouched.

Proof Requirement:

Before closing any completed task, Codex must provide:

1. What was wrong before
2. What changed
3. Evidence
4. Validation result
5. User-visible impact

Preferred evidence includes screenshots, Playwright screenshots, HTML render samples, before/after comparisons, and counts.

A task is not considered complete with only HTTP 200, PASS, or compile success. Codex must demonstrate the visible outcome whenever possible.

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
- Last Implementation Commit
- Last Closeout Commit, if present
- Live Git latest commit
- Git working state
- Commit comparison between live Git, Last Implementation Commit, and Last Closeout Commit in `PROJECT_INDEX.md` and `project-brain/CURRENT_TASK.md`
- Blocked or forbidden actions
- Canonical files relevant to the requested work

Project Reality Check must always run:

- `git status --short --branch`
- `git fetch origin` and `git pull --ff-only origin main` when the working tree is clean and this is a new `hey codex` session
- `git log -1 --oneline`

If live Git latest commit equals Last Closeout Commit, Project Brain is synchronized. If live Git latest commit is a closeout/state-sync metadata commit newer than Last Closeout Commit, do not request another sync just to record that newest closeout hash. Only report a blocking mismatch when live Git has unclassified implementation, code, schema, or governance behavior changes not reflected in Project Brain.

No implementation task may start until the Project Reality Check is shown.

If the Project Reality Check cannot be produced, STOP.

3. Rules:

- Do not change production code or APPROVAL_REQUIRED areas without approval.
- AUTO_ALLOWED documentation and read-only app mapping work may proceed autonomously when it is the next approved task.
- Do not rewrite stable flows.
- Use queue architecture.
- Update Project Brain after completed safe AUTO_ALLOWED work.

Closing:
by codex
