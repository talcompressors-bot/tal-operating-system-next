# DOCUMENTATION CLEANUP PLAN

## Scope

Audit date: 2026-06-09

Audited:

- agents/*
- project-brain/*
- root *.md files

No cleanup has been performed yet. This file is only a plan.

Current consolidation note:

- This file is historical planning context, not an active source of truth.
- Canonical current task/current phase/next task source is `project-brain/CURRENT_TASK.md`.
- `project-brain/current/CURRENT_TASK.md` is retired/historical compatibility only and must not be used as active project state.

---

## 1. Duplicate Documentation

### Project Brain Master duplication

Files:

- project-brain/PROJECT_BRAIN_MASTER.md

Issue:

- The file starts with a skeleton set of headings and then repeats `# PROJECT BRAIN MASTER` with the real content.

Plan:

- Keep one `# PROJECT BRAIN MASTER` heading.
- Preserve the filled content.
- Remove or merge the empty skeleton headings.

### Current task duplication

Files:

- project-brain/CURRENT_TASK.md
- project-brain/current/CURRENT_TASK.md

Issue:

- Historical note: this section originally treated `project-brain/current/CURRENT_TASK.md` as active.
- Current rule: `project-brain/CURRENT_TASK.md` is the canonical current task/current phase/next task source.
- `project-brain/current/CURRENT_TASK.md` is retired/historical compatibility only.

Plan:

- Keep `project-brain/CURRENT_TASK.md` as the active source.
- Keep `project-brain/current/CURRENT_TASK.md` only as a retired compatibility stub; do not update it with active state.

### AI Draft instructions duplicated across files

Files:

- agents/AI_DRAFT_AGENT.md
- agents/AI_DRAFT_AGENT_TEST.md
- agents/AI_DRAFT_EXECUTION_CHECKLIST.md
- agents/AI_DRAFT_OUTPUT_TEMPLATE.md
- agents/AI_DRAFT_SESSION_CLOSE.md
- RUN_AI_DRAFT_AGENT.md
- project-brain/roadmap/AI_DRAFT_PILOT_DESIGN.md
- project-brain/roadmap/AI_DRAFT_MINIMAL_IMPLEMENTATION_PLAN.md
- project-brain/maps/AI_DRAFT_FIELD_MAPPING.md

Issue:

- The same rules appear in several places: one-report pilot, no Maven creation, no email sending, no payment updates, pricing priority, fixed labor/visit pricing, and user approval requirements.

Plan:

- Keep `agents/AI_DRAFT_AGENT.md` as the agent behavior contract.
- Keep `project-brain/maps/AI_DRAFT_FIELD_MAPPING.md` as the data mapping contract.
- Keep `agents/AI_DRAFT_OUTPUT_TEMPLATE.md` as the output format.
- Merge checklist/test/run instructions into one operational file, probably `RUN_AI_DRAFT_AGENT.md`.
- Move roadmap-only planning into `project-brain/roadmap/AI_DRAFT_PILOT_DESIGN.md`.

### System map overlap

Files:

- project-brain/maps/SYSTEM_MAP.md
- project-brain/maps/APPSHEET_MAP.md
- project-brain/maps/APPS_SCRIPT_MAP.md
- project-brain/SYSTEM_COMPONENTS.md
- project-brain/PROJECT_BRAIN_MASTER.md

Issue:

- Tables, Apps Script functions, queue architecture, and stable systems are described in multiple places.

Plan:

- Keep `SYSTEM_MAP.md` as the high-level architecture overview.
- Keep `APPSHEET_MAP.md` as table/action/bot-specific documentation.
- Keep `APPS_SCRIPT_MAP.md` as script module/function-specific documentation.
- Convert `SYSTEM_COMPONENTS.md` into an index or deprecate it after its unique details are moved into maps.
- Keep only summaries in `PROJECT_BRAIN_MASTER.md`, pointing to detailed maps.

### Startup/read-order duplication

Files:

- START_CODEX.md
- PROJECT_INDEX.md
- project-brain/STARTUP_PROTOCOL.md
- agents/PROJECT_BRAIN_AGENT.md
- PROJECT_COMMANDS.md

Issue:

- Multiple files define startup behavior and read order, with different file lists.

Plan:

- Make `PROJECT_INDEX.md` the single root read-order index.
- Make `START_CODEX.md` the short activation command wrapper.
- Make `project-brain/STARTUP_PROTOCOL.md` the detailed startup procedure.
- Update all three to reference the same current files.

---

## 2. Conflicting Documentation

### Current task source conflict

Conflict:

- `PROJECT_INDEX.md` prioritizes `project-brain/checkpoints/ACTIVE_SESSION_STATE.md`.
- Historical note: this section predates consolidation and contains retired-path references.
- `project-brain/CURRENT_TASK.md` is now the canonical current task/current phase/next task source.
- `START_CODEX.md` should point to `PROJECT_INDEX.md` first, then `project-brain/CURRENT_TASK.md`.
- `project-brain/STARTUP_PROTOCOL.md` says to read `CURRENT_TASK.md` without the correct path.

Resolution plan:

- Define `project-brain/CURRENT_TASK.md` as the active current-task source of truth.
- Treat `ACTIVE_SESSION_STATE.md` as session/runtime state, not task truth.
- Update startup/read-order docs accordingly.

### Apps Script filename conflict

Conflict:

- Some docs refer to `MavenAPI.gs`.
- Some docs refer to `MavenAPI.js`.
- Repository snapshot under `project-brain/apps-script/` uses `MavenAPI.gs`.
- `RUN_AI_DRAFT_AGENT.md` and several agent docs reference `apps-script/MavenAPI.js`, but root `apps-script/` exists separately and should be verified before relying on that path.

Resolution plan:

- Standardize documented Apps Script filenames to the actual repo filenames.
- If both `.gs` and `.js` exist in different mirrors, document which one is canonical.

### Source-of-truth priority conflict

Conflict:

- `PROJECT_INDEX.md` says priority is Active Session State, Project Brain, Google Sheets, Apps Script, GitHub History.
- `PROJECT_SOURCES.md` says external Google Sheet/Docs Project Brain sources are source of truth and GitHub is a digital twin.
- `AI_RULES.md` says use Project Brain first.

Resolution plan:

- Define a single source-of-truth model:
  - Operational data: Google Sheets/AppSheet.
  - Development memory: Project Brain in this repository.
  - Code snapshot: Apps Script files in Git.
  - External docs: upstream references until migrated.
- Update `PROJECT_INDEX.md` and `PROJECT_SOURCES.md` to use the same wording.

### AI Draft creation timing conflict

Conflict:

- Some docs say AI may create internal recommendations in `BusinessDocuments` / `BusinessDocumentItems`.
- `AI_DRAFT_PILOT_DESIGN.md` says only after approval may `BusinessDocuments` / `BusinessDocumentItems` be created.
- Test docs say recommendation only and no production status updates.

Resolution plan:

- Split into stages:
  - Stage 1: return recommendation JSON only.
  - Stage 2: after approval, write internal draft rows.
  - Stage 3: after separate approval, create Maven draft.
- Update all AI Draft docs to use this staged model.

### BusinessDocuments status wording conflict

Conflict:

- `PROJECT_BRAIN_MASTER.md` lists `Pending -> Running -> Completed` under BusinessDocuments workflow, but that status flow belongs more clearly to `AutomationCommands`.
- Other docs describe `CreateDraftRequested`, `DraftRequestReceived`, and Maven-related document statuses.

Resolution plan:

- Document separate status flows:
  - `AutomationCommands.Status`: Pending, Running, Completed, Error/Cancelled.
  - `BusinessDocuments.DocumentStatus`: Draft/recommendation/request statuses.

---

## 3. Empty Documentation

Empty files found:

- PROJECT_OPERATING_PROTOCOL.md
- project-brain/TEST_SCENARIOS.md
- project-brain/roadmap/ROADMAP.md

Plan:

- Fill `PROJECT_OPERATING_PROTOCOL.md` from `project-brain/STARTUP_PROTOCOL.md`, `AI_RULES.md`, and `PROJECT_INDEX.md`.
- Fill `TEST_SCENARIOS.md` with read-only health checks, AI Draft dry-run tests, queue tests, Drive save tests, and Maven sync tests.
- Fill `ROADMAP.md` with the phased roadmap already described in `PROJECT_BRAIN_MASTER.md`.

---

## 4. Missing Referenced Files

Referenced but not found as standalone files:

- PROJECT_RULES.md
- FLOWCHART.md
- CHANGELOG.md

Referenced with ambiguous or incorrect path:

- CURRENT_TASK.md
- DECISION_LOG.md
- SYSTEM_COMPONENTS.md
- SYSTEM_HEALTH_RULES.md
- TEST_SCENARIOS.md
- ROADMAP.md
- SYSTEM_MAP.md
- LESSONS_LEARNED.md
- CURRENT_BUGS.md
- ACTIVE_SESSION_STATE.md

Issue:

- These exist under `project-brain/` or subfolders, but several references omit the path.

Plan:

- Either create the missing files intentionally or remove them from `project-brain/STARTUP_PROTOCOL.md`.
- Update all path references to full repo-relative paths.

Escaped Markdown path issue:

- Some files use escaped underscores in paths, for example `PROJECT\_BRAIN\_MASTER.md`.
- These read as text but confuse path scanning.

Plan:

- Normalize file references to unescaped repo-relative paths.

---

## 5. Files That Should Be Merged

Recommended merges:

### Merge startup instructions

Merge into:

- PROJECT_OPERATING_PROTOCOL.md

From:

- START_CODEX.md
- PROJECT_INDEX.md read order
- project-brain/STARTUP_PROTOCOL.md
- agents/PROJECT_BRAIN_AGENT.md startup rules

Keep:

- START_CODEX.md as a short command wrapper.
- PROJECT_INDEX.md as the navigation index.

### Merge AI Draft operational docs

Merge into:

- RUN_AI_DRAFT_AGENT.md

From:

- agents/AI_DRAFT_AGENT_TEST.md
- agents/AI_DRAFT_EXECUTION_CHECKLIST.md
- agents/AI_DRAFT_SESSION_CLOSE.md

Keep:

- agents/AI_DRAFT_AGENT.md for role/rules.
- agents/AI_DRAFT_OUTPUT_TEMPLATE.md for output.
- project-brain/maps/AI_DRAFT_FIELD_MAPPING.md for schema mapping.

### Merge component overview into maps

Move unique content from:

- project-brain/SYSTEM_COMPONENTS.md

Into:

- project-brain/maps/SYSTEM_MAP.md
- project-brain/maps/APPSHEET_MAP.md
- project-brain/maps/APPS_SCRIPT_MAP.md

Then deprecate `SYSTEM_COMPONENTS.md` or convert it into an index.

### Merge roadmap content

Move roadmap content from:

- project-brain/PROJECT_BRAIN_MASTER.md
- project-brain/SYSTEM_HEALTH_AGENT_PLAN.md
- project-brain/roadmap/AI_DRAFT_PILOT_DESIGN.md

Into:

- project-brain/roadmap/ROADMAP.md

Keep detailed plans as subdocuments only if they remain actively used.

---

## 6. Files That Should Be Deprecated

Recommended deprecations:

### project-brain/CURRENT_TASK.md

Reason:

- Canonical current task/current phase/next task source.

Replacement:

- No replacement. Do not deprecate.

### project-brain/current/CURRENT_TASK.md

Reason:

- Retired compatibility path. Historical references only.

Replacement:

- project-brain/CURRENT_TASK.md

### project-brain/SYSTEM_COMPONENTS.md

Reason:

- Overlaps heavily with maps.

Replacement:

- project-brain/maps/SYSTEM_MAP.md
- project-brain/maps/APPSHEET_MAP.md
- project-brain/maps/APPS_SCRIPT_MAP.md

### agents/AI_DRAFT_AGENT_TEST.md

Reason:

- Small test rules duplicate `RUN_AI_DRAFT_AGENT.md` and checklist.

Replacement:

- RUN_AI_DRAFT_AGENT.md
- agents/AI_DRAFT_EXECUTION_CHECKLIST.md, if retained

### agents/AI_DRAFT_SESSION_CLOSE.md

Reason:

- Closing process overlaps with `END_CODEX.md`.

Replacement:

- END_CODEX.md with an AI Draft-specific subsection.

### project-brain/archive/SYSTEM_STATE_2026-05-31.md

Reason:

- Historical archive only.

Action:

- Keep archived, but mark clearly as non-current and do not include in default startup reads.

---

## Recommended Cleanup Order

1. Fill `PROJECT_OPERATING_PROTOCOL.md` as the canonical operating protocol.
2. Fix all startup/read-order references to use repo-relative paths.
3. Confirm `project-brain/CURRENT_TASK.md` as current-task source of truth.
4. Clean `PROJECT_BRAIN_MASTER.md` duplication and make it an index/summary.
5. Consolidate AI Draft run/test/checklist docs.
6. Fill empty `ROADMAP.md` and `TEST_SCENARIOS.md`.
7. Decide whether to create or remove references to `PROJECT_RULES.md`, `FLOWCHART.md`, and `CHANGELOG.md`.
8. Normalize `.gs` / `.js` Apps Script filename references.
9. Fix Hebrew encoding/mojibake in affected docs after content structure is stable.

---

## Do Not Do Yet

- Do not delete files.
- Do not rewrite stable Project Brain history.
- Do not change Apps Script code.
- Do not change production AppSheet, Google Sheets, Drive, Maven, or Invoice4u.
- Do not update checkpoints until the cleanup itself is approved and performed.
