# MASTER HANDOFF - 2026-06-16

Status: Current session handoff  
Scope: Future Codex sessions for `TalCompressors-ServiceReports-AI`  
Mode: Documentation only

## 1. Project Vision

Tal Compressors is building a governed, AI-assisted enterprise operating platform around the current service-report and business-document workflow.

Primary goals:

- Convert service work into accurate, traceable, approved business documents and customer outcomes.
- Stabilize the current Google Sheets / AppSheet / Apps Script / Maven production workflow before migration or expansion.
- Use AI for analysis, recommendations, validation, draft preparation, and governance while keeping human approval in control of production, customer-facing, financial, schema, and deployment actions.

Long-term target architecture is documented in:

- `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`

The target architecture is a comparison guide, not permission to build every future component now.

## 2. Current Architecture

Current legacy production layer:

```text
AppSheet
-> Google Sheets
-> Apps Script
-> Business Logic
-> Maven API
-> Invoice4u API (future)
```

Current source-of-truth and governance layer:

```text
PROJECT_OPERATING_PROTOCOL.md
-> PROJECT_INDEX.md
-> project-brain/*
-> agents/*
-> data-sources/tools/SHEETS_REGISTRY.md
-> project-brain/maps/*
-> apps-script/* read-only unless explicitly approved
```

Important current workflow:

```text
BusinessDocuments
-> AutomationCommands
-> AppSheet Bot
-> Apps Script
-> Maven Draft
```

Critical rule:

Never allow AppSheet Bot and Apps Script to update the same row simultaneously. Use `AutomationCommands` queue architecture.

## 3. Completed Phases

### PHASE 0 - Governance Foundation

Status: COMPLETE

Completed:

- `PROJECT_OPERATING_PROTOCOL.md` created and active.
- `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md` created.
- `project-brain/roadmap/ROADMAP.md` established as master roadmap.
- `data-sources/tools/SHEETS_REGISTRY.md` populated from live `ServiceApp_FIX` headers.
- `agents/INFRASTRUCTURE_MANAGER_AGENT.md` created and active.
- `agents/INFRASTRUCTURE_REVIEW_TEMPLATE.md` created.
- `agents/AGENT_REGISTRY.md` updated for Infrastructure Manager.
- Governance foundation pushed to GitHub.

Latest governance additions:

- `agents/PRE_MISSION_REVIEW_SYSTEM.md` created.
- `project-brain/roadmap/PHASE_EXECUTION_BLUEPRINT.md` created.
- `agents/AGENT_REGISTRY.md` updated with `PRE_MISSION_REVIEW_SYSTEM`.

## 4. Current Phase

### PHASE 1 - Digital Twin Foundation

Status: CURRENT

Current task:

Start Digital Twin Foundation as a read-only mapping phase.

Next step from current task:

Run Infrastructure Manager review for Digital Twin Foundation before creating or modifying anything.

Purpose:

Map the current legacy production system before migration or rebuild.

Initial assets:

- `project-brain/maps/SYSTEM_MAP.md`
- `project-brain/maps/APPSHEET_MAP.md`
- `project-brain/maps/APPS_SCRIPT_MAP.md`
- `data-sources/tools/SHEETS_REGISTRY.md`

## 5. Active Missions

Active or recently completed governance missions:

- PMR-1: Created Pre-Mission Review System.
- PMR-2: Upgraded Pre-Mission Review System into an operating mechanism.
- PEB-1: Created Phase Execution Blueprint.
- HANDOFF-1: Create this master handoff checkpoint.

Current project mission:

- Start Digital Twin Foundation as a read-only mapping phase.

Recommended next execution mission:

- Run Pre-Mission Review for Phase 1 Digital Twin Foundation.

## 6. Active Agents

Source: `agents/AGENT_REGISTRY.md`

Active:

- `ORCHESTRATOR_AGENT`
- `PROJECT_BRAIN_AGENT`
- `INFRASTRUCTURE_MANAGER_AGENT`
- `PRE_MISSION_REVIEW_SYSTEM`
- `GIT_AGENT`
- `APPS_SCRIPT_AGENT`
- `MAVEN_AGENT`

Development:

- `AI_DRAFT_AGENT`

Planned:

- `QA_AGENT`
- `INVOICE4U_AGENT`
- `EXPENSE_AGENT`

## 7. Protected Systems

Do not modify without explicit approval:

- Apps Script
- Google Sheets live data
- AppSheet production
- Maven
- Drive
- `AutomationCommands`
- ReportCounter logic
- Drive folder logic
- signed report / HTML save logic
- `BusinessDocuments`
- `BusinessDocumentItems`
- Maven draft creation
- Maven sync
- AppSheet Bot and Apps Script row update boundaries
- System Health registries/logs

Forbidden without explicit approval:

- Apps Script code changes
- Google Sheets schema changes
- creating sheets
- running setup functions
- deploying
- running `clasp push`
- Maven document creation
- invoice creation or finalization
- sending customer emails or documents
- payment status updates
- data cleanup, deletion, or repair
- Drive permission changes
- queue retry or recovery
- migration work

## 8. Known Gaps

Current documented gaps:

- `project-brain/PROJECT_BRAIN_MASTER.md` still contains older duplicated structure and stale AI Draft task content.
- `project-brain/current/LIVE_OBJECTS.md` still needs review/refresh with verified IDs or `UNKNOWN`.
- `PROJECT_INDEX.md` and `START_CODEX.md` may need full alignment with `PROJECT_OPERATING_PROTOCOL.md`.
- `SHEETS_REGISTRY.md` contains live tab/header data but not full AppSheet column settings, formulas, validation rules, or row-level usage.
- No full AppSheet Digital Twin exists yet.
- No Migration Blueprint exists yet.
- AI Draft docs are duplicated across several files and should be consolidated according to `DOCUMENTATION_CLEANUP_PLAN.md`.
- AppSheet production metadata is incomplete unless manual/exported evidence is available.
- `WorkflowRegistry` is not documented as an existing current asset; current closest governance asset is `AutomationRegistry`.

## 9. Open Decisions

Open decisions for future sessions:

- Whether to update Project Brain files to reference the new Pre-Mission Review System and Phase Execution Blueprint.
- Whether to align `PROJECT_INDEX.md` and `START_CODEX.md` fully with the current startup sequence in `PROJECT_OPERATING_PROTOCOL.md`.
- Whether to perform a documentation cleanup of stale or duplicated AI Draft files.
- Whether to create or defer a full AppSheet Digital Twin artifact.
- Whether to define a formal Digital Twin Agent or keep routing through Infrastructure Manager and Project Brain Agent.
- Whether to create a Mission Review Registry as a documentation file or future table. Do not create a Google Sheet without approval.
- Whether to update roadmap/current task after this handoff checkpoint.

## 10. Lessons Learned

Durable lessons currently documented:

- Understand before changing.
- Prefer modifying existing logic before creating new logic.
- Evidence must come before assumptions.
- Unknown IDs or missing facts must remain `UNKNOWN`.
- Reuse existing files, tables, agents, workflows, scripts, and registries before creating anything new.
- Never allow AppSheet Bot and Apps Script to update the same row simultaneously.
- Prefer queue architecture.
- Never create Maven documents without user approval.
- Always isolate logic before changing architecture.
- Documentation-only work is done only when the document change is complete, no runtime files changed, diff was reviewed, and no commit/push occurred unless requested.

## 11. Roadmap Status

Master roadmap:

- `project-brain/roadmap/ROADMAP.md`

Current roadmap state:

- PHASE 0 - Governance Foundation: COMPLETE
- PHASE 1 - Digital Twin Foundation: CURRENT

Future near-term roadmap items:

- System Health Platform
- Output Verification Platform
- AppSheet Digital Twin
- Migration Blueprint
- AI Draft Pilot
- Documentation Cleanup

Long-term roadmap:

- Target architecture phases 0 through 54 are listed in `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`.
- Phase execution mechanics are defined in `project-brain/roadmap/PHASE_EXECUTION_BLUEPRINT.md`.

## 12. Phase Execution Blueprint Status

File:

- `project-brain/roadmap/PHASE_EXECUTION_BLUEPRINT.md`

Status:

- Created and pushed in commit `a1eae5e`.
- Covers target phases 0 through 54, including 9.5.
- Defines each phase with objective, deliverables, required tables, required agents, practical actions, execution algorithm, validation tests, practical verification, completion criteria, brain updates, dependencies, next phase trigger, and mission breakdown.
- Mission breakdowns now use `Mission -> Sub-Mission -> Action -> Validation -> Output`.

Important rule:

The blueprint does not authorize production changes. Each mission still requires Pre-Mission Review and explicit approval where required.

## 13. Pre-Mission Review System Status

File:

- `agents/PRE_MISSION_REVIEW_SYSTEM.md`

Status:

- Active.
- Created and pushed in commit `a1eae5e`.
- Registered in `agents/AGENT_REGISTRY.md`.

Purpose:

Mandatory review gate before every mission.

Flow:

```text
User Request
-> Infrastructure Manager
-> Builder Agent Analysis
-> Auditor Agent Review
-> Discovery Agent if unknowns exist
-> Infrastructure Manager Decision
-> Mission Approved / Rejected / Needs More Evidence
```

Key outputs:

- Discovery Workflow
- Builder Workflow
- Auditor Workflow
- Infrastructure Decision Workflow
- Mission Review Registry design
- Evidence Sources
- Pre-Mission Review KPI
- Output Generation Model
- Practical Verification Framework
- System Integration

## 14. Infrastructure Manager Status

File:

- `agents/INFRASTRUCTURE_MANAGER_AGENT.md`

Status:

- Active.

Role:

Protects project architecture before new components, workflows, registries, agents, tables, platforms, or production-impacting changes are proposed.

Current responsibilities:

- Enforce source-of-truth hierarchy.
- Detect stale or duplicate files.
- Identify existing assets before new creation.
- Route tasks to the correct agent.
- Maintain architecture comparison recommendations.
- Protect Apps Script, Google Sheets, Maven, Drive, and queue boundaries.
- Recommend safe next steps.
- Block premature future-platform work.

Infrastructure Manager does not deploy, create sheets, run setup functions, modify production data, create Maven documents, or send emails.

## 15. Latest Important Commits

Latest commits at handoff:

```text
a1eae5e Add pre-mission review system and phase execution blueprint
08a7a04 Align roadmap and project brain current state
254827d Update current task for Digital Twin Foundation
b446d81 Add project file tree map
1baeeaa Governance Foundation complete - Infrastructure Manager V1 activated
```

Important older commit:

```text
585ef51 Added BusinessDocument-level idempotency guard to Maven queue flow
```

## 16. Recommended Next Mission

Recommended next mission:

Run Pre-Mission Review for Phase 1 Digital Twin Foundation.

Suggested mission name:

`DTF-PMR-1 - Pre-Mission Review for Digital Twin Foundation`

Recommended scope:

- Confirm objective: read-only mapping of current legacy production system.
- Check existing assets: `SYSTEM_MAP.md`, `APPSHEET_MAP.md`, `APPS_SCRIPT_MAP.md`, `SHEETS_REGISTRY.md`, `PROJECT_BRAIN_MASTER.md`, `ROADMAP.md`.
- Identify affected systems: AppSheet, Google Sheets metadata, Apps Script source, Drive, Maven, AutomationCommands.
- Confirm no production writes.
- Decide whether the next safe execution mission should map AppSheet tables, Apps Script functions, or workflow dependencies first.

Recommended decision target:

- `APPROVED` for read-only discovery/mapping only, or `NEEDS_MORE_EVIDENCE` if AppSheet manual/exported evidence is required.

## 17. Exact Startup Sequence For A New Codex Session

Follow this exact sequence before any analysis, planning, file edits, schema work, deployment, or production action:

1. Open repository root.
2. Run `git status --short`.
3. Read `PROJECT_OPERATING_PROTOCOL.md`.
4. Read `PROJECT_INDEX.md`.
5. Read `PROJECT_COMMANDS.md`.
6. Read `START_CODEX.md` if starting a new session.
7. Read `project-brain/PROJECT_BRAIN_MASTER.md`.
8. Read `project-brain/current/CURRENT_TASK.md`.
9. Read `project-brain/current/LIVE_OBJECTS.md`.
10. Read latest relevant checkpoint under `project-brain/checkpoints/`, including this file if present.
11. Read `project-brain/roadmap/ROADMAP.md`.
12. Read `project-brain/roadmap/PHASE_EXECUTION_BLUEPRINT.md` when phase execution is relevant.
13. Read `agents/PRE_MISSION_REVIEW_SYSTEM.md`.
14. Read `agents/INFRASTRUCTURE_MANAGER_AGENT.md`.
15. Read `agents/AGENT_REGISTRY.md`.
16. Read `data-sources/tools/SHEETS_REGISTRY.md`.
17. Read relevant maps:
    - `project-brain/maps/SYSTEM_MAP.md`
    - `project-brain/maps/APPSHEET_MAP.md`
    - `project-brain/maps/APPS_SCRIPT_MAP.md`
    - `project-brain/maps/AI_DRAFT_FIELD_MAPPING.md` when AI Draft is relevant
18. Read `project-brain/bugs/CURRENT_BUGS.md`.
19. Read `project-brain/lessons/LESSONS_LEARNED.md`.
20. Run or produce a Pre-Mission Review before executing any mission.
21. Summarize current phase, current task, protected systems, existing assets, risks, approval needs, and next safe step.

Do not start coding immediately after opening the repository.

Do not touch Apps Script, Google Sheets, AppSheet, Maven, Drive, setup functions, deployments, customer emails, invoices, or production data unless the user explicitly approves the specific action.
