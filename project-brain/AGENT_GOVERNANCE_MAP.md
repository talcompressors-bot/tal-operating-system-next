# Agent Governance Map

Date: 2026-06-24
Mode: Reality map only
Scope: Existing governance and agent ecosystem

## Source Evidence

Files inspected:

- `PROJECT_INDEX.md`
- `PROJECT_OPERATING_PROTOCOL.md`
- `AGENTS.md`
- `agents/AGENT_REGISTRY.md`
- `agents/AGENT_FACTORY_OPERATING_SYSTEM.md`
- `agents/ORCHESTRATOR_AGENT.md`
- `agents/PROJECT_BRAIN_AGENT.md`
- `agents/PROJECT_BRAIN_AGENT_SOP.md`
- `agents/INFRASTRUCTURE_MANAGER_AGENT.md`
- `agents/INFRASTRUCTURE_REVIEW_TEMPLATE.md`
- `agents/PRE_MISSION_REVIEW_SYSTEM.md`
- `agents/FACTORY_CONTROL_CENTER_AGENT.md`
- `agents/GIT_AGENT.md`
- `agents/APPS_SCRIPT_AGENT.md`
- `agents/MAVEN_AGENT.md`
- `agents/AI_DRAFT_AGENT.md`
- `agents/AI_DRAFT_EXECUTION_CHECKLIST.md`
- `agents/AI_DRAFT_OUTPUT_TEMPLATE.md`
- `agents/AI_DRAFT_AGENT_TEST.md`
- `agents/AI_DRAFT_SESSION_CLOSE.md`
- `project-brain/agents/MAP_GUARD_AGENT.md`
- `project-brain/agents/BUILDER_AGENT.md`
- `project-brain/agents/QA_AGENT.md`
- `project-brain/agents/REVIEWER_AGENT.md`
- `project-brain/agents/AGENT_COMMUNICATION_PROTOCOL.md`
- `project-brain/agents/AUTONOMOUS_BUILD_WORKFLOW.md`
- `project-brain/PROJECT_BRAIN_MASTER.md`
- `project-brain/PROJECT_DASHBOARD.md`
- `project-brain/SYSTEM_HEALTH_AGENT_PLAN.md`
- `project-brain/roadmap/ROADMAP.md`
- `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`
- `project-brain/maps/SYSTEM_MAP.md`
- `project-brain/bugs/CURRENT_BUGS.md`
- `project-brain/lessons/LESSONS_LEARNED.md`

Git status at discovery start:

```text
## main...origin/main
 M PROJECT_INDEX.md
 M project-brain/CURRENT_TASK.md
 M project-brain/DECISION_LOG.md
 M project-brain/TASK_BOARD.md
?? project-brain/FULL_PROJECT_DISCOVERY_AUDIT.md
```

The modified files listed above were pre-existing work from the completion-model governance alignment. This map adds no runtime code and creates no new agent.

## Executive Finding

The project already has an agent ecosystem. Future AI Agent, PM Agent, Architect Agent, QA Agent, and Control Center work should upgrade or clarify existing files instead of creating new agents by default.

Current reality:

- PM function today is performed by `agents/ORCHESTRATOR_AGENT.md`, `project-brain/CURRENT_TASK.md`, `project-brain/TASK_BOARD.md`, and `agents/PROJECT_BRAIN_AGENT.md`.
- Architect function today is performed by `agents/INFRASTRUCTURE_MANAGER_AGENT.md`, governed by `PROJECT_OPERATING_PROTOCOL.md` and compared against `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`.
- QA function today is split: `project-brain/agents/QA_AGENT.md` is active as a Project Brain workflow role, while `agents/AGENT_REGISTRY.md` still lists a future/planned specialist `QA_AGENT`.
- Control Center exists as `agents/FACTORY_CONTROL_CENTER_AGENT.md`; it audits, but does not replace Infrastructure Manager and does not approve production actions.

Do not create these as new agents:

- PM Agent: already exists as Orchestrator + Project Brain + Task Board responsibilities.
- Architect Agent: already exists as Infrastructure Manager.
- QA workflow role: already exists under `project-brain/agents/QA_AGENT.md`.
- Control Center Agent: already exists as `agents/FACTORY_CONTROL_CENTER_AGENT.md`.
- AI Draft Agent: already exists as `agents/AI_DRAFT_AGENT.md`.

## Governance Hierarchy

```text
Liad / Human Owner
->
PROJECT_OPERATING_PROTOCOL.md
->
PROJECT_INDEX.md and source-of-truth hierarchy
->
Project Brain canonical state
  - project-brain/CURRENT_TASK.md
  - project-brain/TASK_BOARD.md
  - project-brain/DECISION_LOG.md
  - project-brain/maps/*
  - project-brain/migration/*
->
Infrastructure Manager
->
Codex / Orchestrator Agent
->
Pre-Mission Review + Map Guard
->
Builder Agent and relevant specialist owner agent
->
QA Agent workflow role
->
Reviewer Agent
->
Git Agent + Project Brain Agent closeout
->
Final report / next approval gate
```

Production-impacting authority remains with Liad. No agent may approve production writes, customer-facing sends, financial actions, schema changes, migrations, DB writes/imports, AppSheet changes, Google Sheets changes, Apps Script deployment, Maven document creation, Drive writes, or production cutover.

## Existing Agent Map

### ORCHESTRATOR_AGENT

Source files:

- `agents/ORCHESTRATOR_AGENT.md`
- `agents/AGENT_REGISTRY.md`
- `PROJECT_INDEX.md`

1. Purpose: Select the correct agent, tools, sources, execution order, risks, and approval requirements for a user request.
2. Responsibilities: Classify task type; route to existing owner agents; execute AUTO_ALLOWED work; stop at APPROVAL_REQUIRED gates; protect stable systems; update Project Brain after safe completed work.
3. Allowed actions: Read files; inspect repo; route tasks; run safe local/read-only validation; coordinate safe documentation/read-only app work under protocol.
4. Forbidden actions: Production writes, schema changes, DB writes/imports, Maven actions, Apps Script/AppSheet/Sheets/Drive/email changes, deletes/moves, git remote changes, and new runtime agent architecture without approval.
5. Inputs: User request, `PROJECT_INDEX.md`, `project-brain/TASK_BOARD.md`, `agents/AGENT_REGISTRY.md`, current task, relevant maps and specialist files.
6. Outputs: Agent selection, tool selection, source list, execution order, risks, approval needs, final routing package.
7. Dependencies: Infrastructure Manager for architecture/approval review; Project Brain for current state; specialist agents for domain work; QA/Reviewer workflow roles for validation.
8. Decision authority: Can decide routing and safe execution order; cannot approve production-impacting work.
9. Overlaps: PM-like responsibility overlaps with Project Brain Agent and Task Board; execution sequencing overlaps with Autonomous Build Workflow.
10. Suggested future role: Treat as the current PM/Delivery Orchestrator. Upgrade its SOP and metrics before considering any separate PM Agent.

### PROJECT_BRAIN_AGENT

Source files:

- `agents/PROJECT_BRAIN_AGENT.md`
- `agents/PROJECT_BRAIN_AGENT_SOP.md`
- `project-brain/PROJECT_BRAIN_MASTER.md`

1. Purpose: Load, protect, validate, update, checkpoint, and hand off durable project memory.
2. Responsibilities: Establish current state; detect stale/conflicting memory; propose Project Brain updates; create/propose checkpoints; prepare session handoffs; preserve known IDs or mark `UNKNOWN`.
3. Allowed actions: Read Project Brain; update documentation when mission scope authorizes it; create/propose checkpoints; inspect git status/diff.
4. Forbidden actions: Apps Script writes, Google Sheets writes, AppSheet edits, Maven actions, customer emails, Drive changes, unapproved commits/pushes, rewriting stable history, inventing IDs.
5. Inputs: Protocol, index, Project Brain master, current task, live objects, roadmap, decision log, maps, bugs, lessons, checkpoints, agent registry, sheets registry, git status.
6. Outputs: Current-state summary, consistency audit, brain update proposal, checkpoint/handoff, recovery plan.
7. Dependencies: Infrastructure Manager for conflicts/approval gates; Git Agent for commits; Orchestrator for mission routing.
8. Decision authority: Can identify source-of-truth hierarchy and propose/update documentation under scope; cannot approve production or commit/push without approval/rule.
9. Overlaps: PM-like current-state ownership overlaps with Orchestrator; closeout overlaps with Git Agent.
10. Suggested future role: Current project memory/PMO evidence owner. Upgrade integration with Orchestrator rather than create a PM Agent.

### INFRASTRUCTURE_MANAGER_AGENT

Source files:

- `agents/INFRASTRUCTURE_MANAGER_AGENT.md`
- `agents/INFRASTRUCTURE_REVIEW_TEMPLATE.md`
- `PROJECT_OPERATING_PROTOCOL.md`

1. Purpose: Protect architecture before new components, workflows, registries, agents, tables, platforms, or production-impacting changes.
2. Responsibilities: Enforce source hierarchy, evidence-before-assumption, current-state-before-future-state, reuse-before-create, target architecture comparison, registry awareness, approval rules, stable-flow protection.
3. Allowed actions: Read/search files; compare registries/maps; produce Infrastructure Review; route work; recommend smallest safe next step.
4. Forbidden actions: Runtime code creation, production automation, Google Sheets creation/modification, Apps Script deployment/push, Maven document creation, email sending, payment updates, Drive permission changes, bypassing AutomationCommands, inventing IDs, creating duplicate components.
5. Inputs: User request, protocol, index, Project Brain, current task, live objects, decision log, target architecture, sheets registry, agent registry, system maps, bugs, lessons, read-only source when relevant.
6. Outputs: Infrastructure Review with goal, evidence, reuse decision, target architecture status, affected systems, stable systems, approval need, risk, next step.
7. Dependencies: Pre-Mission Review for structured intake; Factory Control Center for audits; Orchestrator for execution routing.
8. Decision authority: Architecture and approval-gate reviewer. Can approve/deny safe mission readiness at governance level; cannot approve production actions on behalf of Liad.
9. Overlaps: Architect role overlaps with target architecture docs and Factory Control Center audit; routing overlaps with Orchestrator.
10. Suggested future role: This is the current Architect Agent. Upgrade its SOP before creating any new architect role.

### PRE_MISSION_REVIEW_SYSTEM

Source file:

- `agents/PRE_MISSION_REVIEW_SYSTEM.md`

1. Purpose: Mandatory review gate before every project mission.
2. Responsibilities: Clarify mission objective, existing assets, reuse/create decision, affected systems, builder, auditor, evidence, validation, and Project Brain updates.
3. Allowed actions: Documentation/governance review, source reading, duplicate search, discovery routing.
4. Forbidden actions: Implementation, Apps Script changes, Google Sheets changes, AppSheet changes, deployment, setup functions, Maven documents, emails, production changes.
5. Inputs: User request, protocol, index, current task, roadmap, Project Brain, Infrastructure Manager, agent registry, sheets registry, maps, apps-script read-only when needed.
6. Outputs: Pre-Mission Review Output with objective, phase, builder, auditor, discovery need, assets, reuse decision, protected systems, evidence, validation, brain updates, Infrastructure Manager decision.
7. Dependencies: Infrastructure Manager decides; Builder answers; Auditor challenges; Discovery resolves unknowns.
8. Decision authority: Review system provides decision framework; Infrastructure Manager makes the decision.
9. Overlaps: Map Guard performs similar pre-change guard checks for safe build loop.
10. Suggested future role: Keep as intake gate. Align with Map Guard to avoid duplicate review language.

### FACTORY_CONTROL_CENTER_AGENT

Source file:

- `agents/FACTORY_CONTROL_CENTER_AGENT.md`

1. Purpose: Master auditor for Tal AI Factory reality, phases, missions, outputs, agents, SOPs, roadmap progress, and completion claims.
2. Responsibilities: Audit phases, missions, outputs, agents, SOP coverage, project completion, roadmap progress, documentation-vs-reality, and produce factory status reports.
3. Allowed actions: Read sources; compare documentation to reality; produce audits, findings, status reports, escalations, recovery plans, and next safe recommendations.
4. Forbidden actions: Build, deploy, mutate production systems, approve production actions, replace Infrastructure Manager, modify Apps Script/Sheets/AppSheet/Maven/Drive/email/payment, commit/push unless explicitly requested.
5. Inputs: Protocol, index, Pre-Mission Review, Infrastructure Manager, registry, Agent Factory OS, Project Brain, current task, live objects, roadmap, maps, checkpoints, bugs, lessons, sheets registry, relevant agent files, read-only source, git status/diff.
6. Outputs: Factory status report, agent audit, SOP coverage report, completion audit, reality-vs-documentation report, escalation package.
7. Dependencies: Infrastructure Manager for approvals and recovery; Project Brain for durable evidence; Git for changed-file reality.
8. Decision authority: Can issue audit decisions only (`AUDIT_PASS`, `NEEDS_DISCOVERY`, etc.); cannot approve production work.
9. Overlaps: QA/Reviewer evidence checks overlap with Control Center output audit. Infrastructure Manager and Control Center both inspect governance, but Control Center audits while Infrastructure Manager gates architecture/execution.
10. Suggested future role: Current Control Center. Upgrade as audit/portfolio brain; do not create a second control center.

### GIT_AGENT

Source file:

- `agents/GIT_AGENT.md`

1. Purpose: Handle Git, GitHub, checkpoints, and Project Brain update workflow.
2. Responsibilities: Check status; verify changed files; suggest commit message; update Project Brain before commit; add/commit/push when approved/safe.
3. Allowed actions: `git status`, diff review, staging, commit, push under approval/autonomous-safe rules; checkpoint/changelog/lesson recommendations.
4. Forbidden actions: Commit API keys, secrets, temporary test files, unreviewed production changes, unrelated changes.
5. Inputs: Git status, changed files, Project Brain updates, approved commit scope/message.
6. Outputs: Status report, changed-file verification, commit hash, push result, final status.
7. Dependencies: Project Brain Agent for state sync; Orchestrator for scope; Reviewer for final scope review.
8. Decision authority: Can verify git scope and execute approved git actions; cannot decide business/production approvals.
9. Overlaps: Project Brain closeout and Git Agent both handle checkpoint/commit-adjacent steps.
10. Suggested future role: Keep as source-control safety owner. Upgrade SOP for staging safeguards and multi-file closeout flows.

### APPS_SCRIPT_AGENT

Source file:

- `agents/APPS_SCRIPT_AGENT.md`

1. Purpose: Handle Apps Script code only, with analysis first.
2. Responsibilities: Read maps/lessons/source; identify existing functions; avoid duplicate functions; propose incremental changes and tests.
3. Allowed actions: Read-only Apps Script analysis; propose safe changes and test plan.
4. Forbidden actions: Duplicate functions, stable-flow changes without reason, Apps Script writes/deployments/setup functions without explicit approval.
5. Inputs: System map, lessons, `apps-script/`, relevant bugs/current task.
6. Outputs: Relevant files, existing functions involved, risk level, proposed change, test plan.
7. Dependencies: Infrastructure Manager for approval gates; QA for validation; Git for commits; Maven Agent when Maven code is involved.
8. Decision authority: Can recommend code-level plan; cannot approve production Apps Script changes or deployment.
9. Overlaps: Maven Agent overlaps when Apps Script file is `MavenAPI`; System Health plan overlaps for future health scripts.
10. Suggested future role: Keep as Apps Script specialist. Upgrade SOP before any Apps Script modification.

### MAVEN_AGENT

Source file:

- `agents/MAVEN_AGENT.md`

1. Purpose: Handle Maven sync and Maven draft logic only.
2. Responsibilities: Analyze Maven sync, SyncState/SyncLog/ErrorLog, Maven API source, root causes, safe incremental fixes, approval needs.
3. Allowed actions: Read-only Maven sync/draft analysis; suggest safe incremental fixes.
4. Forbidden actions: Rewrite Maven sync from scratch, change draft creation flow without approval, delete imported docs/items, create Maven documents without approval.
5. Inputs: Current bugs, system map, `project-brain/apps-script/MavenAPI.gs`, `apps-script/MavenAPI.js`, Maven-related tables/logs.
6. Outputs: Current Maven state, suspected root cause, safe fix plan, required tests, approval request before code changes.
7. Dependencies: Apps Script Agent for source changes; AI Draft Agent for recommendation handoff; Infrastructure Manager for approval gates.
8. Decision authority: Can recommend Maven diagnostic/fix plan; cannot approve Maven writes or document creation.
9. Overlaps: AI Draft Agent hands off to Maven after user approval; Apps Script Agent owns code mechanics.
10. Suggested future role: Keep as Maven specialist. Upgrade SOP for read-only Maven diagnostics and draft-creation gates.

### AI_DRAFT_AGENT

Source files:

- `agents/AI_DRAFT_AGENT.md`
- `agents/AI_DRAFT_EXECUTION_CHECKLIST.md`
- `agents/AI_DRAFT_OUTPUT_TEMPLATE.md`
- `agents/AI_DRAFT_AGENT_TEST.md`
- `agents/AI_DRAFT_SESSION_CLOSE.md`

1. Purpose: Analyze service reports and prepare internal business-document draft recommendations.
2. Responsibilities: Use ServiceReports, equipment, parts, catalog, Maven history, and BusinessDocuments/Items to recommend document type, lines, quantities, pricing rationale, confidence, and approval flags.
3. Allowed actions: Read-only analysis and recommendation output; fixed price rules for labor/visit; mark `NeedsPriceApproval`.
4. Forbidden actions: Create Maven document without approval, send to customer, mark invoice paid, overwrite BusinessDocuments, ignore historical data, guess prices without approval flag.
5. Inputs: Project Brain master, system map, lessons, bugs, MavenAPI source, ServiceReports, ReportEquipmentItems, Customers_Final, ProductsCatalog, InvoiceMavenDocuments, InvoiceMavenDocumentItems, BusinessDocuments, BusinessDocumentItems, PartsUsed if available.
6. Outputs: Recommendation only: customer, source report, document type, items, quantity, unit price, total, reasoning, confidence, historical matches, approval flags.
7. Dependencies: Maven Agent after approval; Apps Script Agent for legacy source; Infrastructure Manager for approval boundaries; data imports for useful historical pricing.
8. Decision authority: Can recommend; cannot approve or execute Maven/invoice/customer-facing actions.
9. Overlaps: Maven Agent handles post-approval Maven flow; BusinessDocuments workflow is stable and must remain guarded.
10. Suggested future role: Keep as recommendation engine owner. Upgrade to use existing AI draft skill and templates; do not create a second AI Agent.

### MAP_GUARD_AGENT

Source file:

- `project-brain/agents/MAP_GUARD_AGENT.md`

1. Purpose: Protect project map, source hierarchy, ownership boundaries, and stable systems before Builder changes anything.
2. Responsibilities: Check current task alignment, existing ownership, reuse/create justification, protected systems, approval gates, untouched systems.
3. Allowed actions: Documentation/governance checks and reuse decision.
4. Forbidden actions: Production modification or implementation.
5. Inputs: Index, protocol, current task, task board, decision log, maps, migration docs, registry, relevant files.
6. Outputs: Reuse decision, affected systems, untouched systems, approval gates, blockers, recommendation.
7. Dependencies: Orchestrator invokes it; Builder consumes it; Reviewer checks scope later.
8. Decision authority: Can recommend proceed/stop/request approval; cannot approve production.
9. Overlaps: Pre-Mission Review and Infrastructure Manager share reuse/protected-system checks.
10. Suggested future role: Keep as build-loop guard. Merge language with Pre-Mission Review during governance cleanup if needed.

### BUILDER_AGENT

Source file:

- `project-brain/agents/BUILDER_AGENT.md`

1. Purpose: Turn approved tasks into smallest safe implementation plan/change.
2. Responsibilities: Restate scope, identify files, classify AUTO_ALLOWED/APPROVAL_REQUIRED, reuse patterns, produce/apply scoped change, hand off to QA.
3. Allowed actions: Read files; inspect repo; create/update documentation; safe read-only UI work when approved/AUTO_ALLOWED; local validation; prepare Project Brain closeout.
4. Forbidden actions: Env/schema/Prisma writes, DB writes/imports/seeds, source-system/production actions, deletes/moves, git remote changes, new runtime agent architecture without approval.
5. Inputs: User request, canonical files, relevant maps/schema/app files, existing agents, Map Guard constraints.
6. Outputs: Scope implemented, files changed, protected systems checked, validation requested, known risks, QA handoff.
7. Dependencies: Map Guard constraints; QA validation; Reviewer review; specialist owner agents for domain-specific work.
8. Decision authority: Can implement AUTO_ALLOWED scoped work after approval/alignment; cannot approve gated work.
9. Overlaps: Codex Orchestrator often performs Builder work directly.
10. Suggested future role: Keep as workflow role, not a separate runtime agent.

### QA_AGENT_WORKFLOW_ROLE

Source file:

- `project-brain/agents/QA_AGENT.md`

1. Purpose: Validate that completed work behaves as intended and did not cross protected boundaries.
2. Responsibilities: Run risk-scaled validation; state unrelated blockers; confirm protected systems untouched; report `PASS`, `PASS_WITH_EXISTING_GAP`, or `FAIL`.
3. Allowed actions: Documentation checks, scoped TypeScript/build/route checks, read-only Prisma queries, protected-system review.
4. Forbidden actions: Production-impacting approval or mutation.
5. Inputs: Builder handoff, changed files, expected behavior, approval boundaries, validation scripts/checks, Project Brain closeout requirements.
6. Outputs: Validation commands, results, failed checks/reasons, protected systems confirmed untouched, final QA status.
7. Dependencies: Builder handoff; Reviewer consumes QA result; existing scripts/checks availability.
8. Decision authority: Can pass/fail validation; cannot approve production.
9. Overlaps: `agents/AGENT_REGISTRY.md` still lists specialist `QA_AGENT` as planned. This file is active as Project Brain workflow role.
10. Suggested future role: Treat as current QA today. Upgrade registry wording before creating any separate QA agent.

### REVIEWER_AGENT

Source file:

- `project-brain/agents/REVIEWER_AGENT.md`

1. Purpose: Final independent review before commit, push, and final report.
2. Responsibilities: Review scope, forbidden systems, new-file justification, validation fit, Project Brain sync readiness, blocker language.
3. Allowed actions: Review git diff/status and Project Brain sync diff; issue final readiness decision.
4. Forbidden actions: Production mutation or bypassing approval gates.
5. Inputs: Builder output, Map Guard output, QA output, git diff, git status, Project Brain sync diff.
6. Outputs: Scope status, validation status, approval-gate status, Project Brain sync status, final decision.
7. Dependencies: QA and Builder outputs; Git status; Project Brain update requirements.
8. Decision authority: Can mark `READY_TO_COMMIT`, `NEEDS_FIX`, or `STOP_FOR_APPROVAL`; cannot approve production.
9. Overlaps: Factory Control Center also audits outputs, but Reviewer is task-level final review.
10. Suggested future role: Keep as task-level final reviewer.

### AGENT_COMMUNICATION_PROTOCOL

Source file:

- `project-brain/agents/AGENT_COMMUNICATION_PROTOCOL.md`

1. Purpose: Define handoff packets between Codex, workflow roles, and specialist agents.
2. Responsibilities: Standardize task, scope, out-of-scope, sources, findings, risks, approval gates, validation, next action.
3. Allowed actions: Communication structure only.
4. Forbidden actions: Runtime automation, production mutation, hidden approvals.
5. Inputs: Agent handoff context and source evidence.
6. Outputs: Message packet and escalation format.
7. Dependencies: Orchestrator, Map Guard, Builder, QA, Reviewer, Project Brain, Git.
8. Decision authority: None; protocol only.
9. Overlaps: Pre-Mission Review and Autonomous Build Workflow also define flow.
10. Suggested future role: Keep as evidence-preserving handoff protocol.

### AUTONOMOUS_BUILD_WORKFLOW

Source file:

- `project-brain/agents/AUTONOMOUS_BUILD_WORKFLOW.md`

1. Purpose: Define default autonomous loop for safe work.
2. Responsibilities: Sequence startup, Map Guard, Builder, QA, Reviewer, Git, Project Brain sync, push, final report.
3. Allowed actions: Read files, inspect Git, documentation updates, local checks, read-only validation, safe read-only app/UI work, safe scoped commit/push under rules.
4. Forbidden actions: Env/schema/migration/db push, DB writes/imports, Sheets/AppSheet/Maven/Apps Script/Drive/email/production actions, deletes/moves, git remote changes, new runtime agent architecture without approval.
5. Inputs: Protocol, index, current task, task board, workflow-role outputs.
6. Outputs: Safe build loop, stop conditions, final report requirements.
7. Dependencies: Orchestrator, Map Guard, Builder, QA, Reviewer, Git, Project Brain.
8. Decision authority: Defines process; does not approve production.
9. Overlaps: Orchestrator loop and protocol autonomous loop.
10. Suggested future role: Keep as build-loop process owner; consolidate language if governance cleanup is selected.

## Planned Or Partial Agent Areas

### Planned QA_AGENT in `agents/AGENT_REGISTRY.md`

Reality:

- Registry lists `QA_AGENT` as planned.
- Active QA workflow role exists at `project-brain/agents/QA_AGENT.md`.

Conclusion:

- Do not create a new QA agent yet.
- First decide whether to promote the Project Brain QA workflow role into registry wording or keep separate names: `QA_AGENT_WORKFLOW_ROLE` and future specialist `QA_AGENT`.

### Planned INVOICE4U_AGENT

Reality:

- Registry lists future Invoice4u integration.
- No `agents/INVOICE4U_AGENT.md` exists.
- Financial/customer-facing actions require explicit approval.

Conclusion:

- Do not create now.
- Future first step should be Infrastructure Manager discovery and approval-gated SOP, not implementation.

### Planned EXPENSE_AGENT

Reality:

- Registry lists supplier expense invoice automation.
- No `agents/EXPENSE_AGENT.md` exists.
- Expense/payment production actions are high-risk and approval-gated.

Conclusion:

- Do not create now.
- Future first step should be read-only discovery under Infrastructure Manager.

### System Health Agent

Reality:

- `project-brain/SYSTEM_HEALTH_AGENT_PLAN.md` exists as a plan.
- No `agents/SYSTEM_HEALTH_AGENT.md` exists.
- Plan says initial version must be read-only and production repair actions require Liad approval.

Conclusion:

- Do not create a new System Health runtime agent now.
- Reuse the existing plan when System Health becomes selected/approved.

## Governance Role Coverage

### Who Acts As PM Agent Today

Current PM function is distributed:

- `agents/ORCHESTRATOR_AGENT.md`: execution routing, agent/tool/source selection, safe sequencing.
- `project-brain/CURRENT_TASK.md`: active phase/current task/next task.
- `project-brain/TASK_BOARD.md`: NOW/NEXT/DONE/BLOCKED board.
- `agents/PROJECT_BRAIN_AGENT.md` and SOP: durable memory, state consistency, handoff.
- `PROJECT_INDEX.md`: living project map and completion model.

Recommendation:

- Do not create a PM Agent.
- Upgrade Orchestrator + Project Brain Agent + Task Board integration if PM function needs strengthening.

### Who Acts As Architect Today

Current Architect function:

- `agents/INFRASTRUCTURE_MANAGER_AGENT.md`
- `agents/INFRASTRUCTURE_REVIEW_TEMPLATE.md`
- `PROJECT_OPERATING_PROTOCOL.md`
- `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`
- `project-brain/migration/*`

Recommendation:

- Do not create an Architect Agent.
- Upgrade Infrastructure Manager SOP and architecture decision workflow if needed.

### Who Acts As QA Today

Current QA function:

- `project-brain/agents/QA_AGENT.md`: active workflow role for validation.
- `project-brain/agents/REVIEWER_AGENT.md`: final scope/evidence review.
- Existing task-specific validation in Project Brain closeouts.
- `agents/AGENT_FACTORY_OPERATING_SYSTEM.md`: notes registry specialist QA is still planned/missing.

Recommendation:

- Do not create a new QA agent immediately.
- First resolve naming/status mismatch between registry planned QA and active Project Brain QA workflow role.

## What Is Missing

- Full executable SOPs are missing for several specialist agents according to `agents/AGENT_FACTORY_OPERATING_SYSTEM.md`: Orchestrator, Infrastructure Manager, Git, Apps Script, Maven, AI Draft, and planned finance/expense agents.
- Registry does not clearly distinguish active Project Brain workflow-role QA from future specialist QA.
- No dedicated `agents/INVOICE4U_AGENT.md` or `agents/EXPENSE_AGENT.md`.
- No `agents/SYSTEM_HEALTH_AGENT.md`; only a plan exists.
- No single document previously mapped all existing agent responsibilities and overlaps before this file.

## What Should Be Upgraded

Priority upgrades should extend existing files:

1. `agents/AGENT_REGISTRY.md`: clarify distinction between specialist agents and Project Brain workflow roles.
2. `agents/ORCHESTRATOR_AGENT.md`: upgrade as PM/delivery orchestration SOP.
3. `agents/INFRASTRUCTURE_MANAGER_AGENT.md`: upgrade as Architect/governance SOP.
4. `project-brain/agents/QA_AGENT.md`: clarify it is current QA workflow role; decide if registry should point to it.
5. `agents/FACTORY_CONTROL_CENTER_AGENT.md`: keep as audit/control center and connect it to this map.
6. `agents/AI_DRAFT_AGENT.md`: upgrade with existing checklist/template/test/session-close files rather than create a new AI Agent.
7. `agents/GIT_AGENT.md`: add explicit staging/commit safety SOP if commit workflows become frequent.

## What Should Not Be Created Because It Already Exists

| Proposed New Thing | Existing Owner To Reuse |
|---|---|
| PM Agent | `ORCHESTRATOR_AGENT`, `PROJECT_BRAIN_AGENT`, `CURRENT_TASK.md`, `TASK_BOARD.md`, `PROJECT_INDEX.md` |
| Architect Agent | `INFRASTRUCTURE_MANAGER_AGENT`, `INFRASTRUCTURE_REVIEW_TEMPLATE.md`, `TARGET_ARCHITECTURE_VISION.md` |
| Control Center Agent | `FACTORY_CONTROL_CENTER_AGENT.md` |
| QA workflow role | `project-brain/agents/QA_AGENT.md` |
| AI Draft Agent | `agents/AI_DRAFT_AGENT.md` plus AI Draft checklist/template/test/session close files |
| Build workflow agent | `project-brain/agents/AUTONOMOUS_BUILD_WORKFLOW.md`, `BUILDER_AGENT.md`, `MAP_GUARD_AGENT.md`, `REVIEWER_AGENT.md` |
| Agent communication protocol | `project-brain/agents/AGENT_COMMUNICATION_PROTOCOL.md` |
| System Health concept | `project-brain/SYSTEM_HEALTH_AGENT_PLAN.md` |

## Current Decision Boundaries

- Liad approves production, financial, customer-facing, schema, deployment, external-write, DB write/import, and source-system actions.
- Infrastructure Manager reviews architecture, schema, new component, new agent, registry, migration, source-of-truth, and future-platform requests.
- Orchestrator routes and executes safe AUTO_ALLOWED work.
- Factory Control Center audits reality and completion claims.
- Project Brain records durable state.
- QA and Reviewer validate and check scope.
- Specialist agents advise or implement only inside their domains and approval boundaries.

## Recommended Next Safe Step

If the next task is governance refinement, update existing governance files in this order:

1. `agents/AGENT_REGISTRY.md`: add a section distinguishing specialist agents from Project Brain workflow roles.
2. `agents/ORCHESTRATOR_AGENT.md`: explicitly state it is the current PM/delivery coordinator.
3. `agents/INFRASTRUCTURE_MANAGER_AGENT.md`: explicitly state it is the current Architect/governance owner.
4. `project-brain/agents/QA_AGENT.md`: clarify current QA workflow role and registry relationship.

Do not create new agents unless a later Infrastructure Manager review proves no existing owner can be extended and Liad approves creation.
