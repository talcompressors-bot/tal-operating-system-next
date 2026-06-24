# Agent Capability Intelligence Audit

Date: 2026-06-24
Mode: Audit only
Scope: Existing agent ecosystem and governance capability

## Executive Summary

The current project already has a working agent governance ecosystem. It is not a blank slate.

Core reality:

- PM capability partially exists through `ORCHESTRATOR_AGENT`, `PROJECT_BRAIN_AGENT`, `CURRENT_TASK.md`, `TASK_BOARD.md`, and `PROJECT_INDEX.md`.
- Architect capability exists through `INFRASTRUCTURE_MANAGER_AGENT` and the protocol/source-of-truth hierarchy.
- QA capability exists as an active Project Brain workflow role at `project-brain/agents/QA_AGENT.md`.
- Control Center capability exists as `FACTORY_CONTROL_CENTER_AGENT`, but it is audit-only and does not replace Infrastructure Manager.
- Shared learning partially exists through Project Brain, `LESSONS_LEARNED.md`, `DECISION_LOG.md`, checkpoints, bugs, and current-task state.
- Agent discovery and registry partially exist through `AGENT_REGISTRY.md`, `AGENT_GOVERNANCE_MAP.md`, and `AGENT_FACTORY_OPERATING_SYSTEM.md`.

The most important finding: the project should upgrade existing agents and workflow roles before creating anything new. The highest-leverage upgrades are not new agents; they are better SOPs, trust scoring, question matrices, evidence packets, and risk/decision engines embedded into the existing Orchestrator, Infrastructure Manager, Project Brain Agent, QA workflow role, and Factory Control Center.

## Sources Inspected

- `git status --short --branch`
- `git log -1 --oneline`
- `PROJECT_INDEX.md`
- `PROJECT_OPERATING_PROTOCOL.md`
- `project-brain/CURRENT_TASK.md`
- `project-brain/TASK_BOARD.md`
- `project-brain/DECISION_LOG.md`
- `project-brain/PROJECT_BRAIN_MASTER.md`
- `project-brain/AGENT_GOVERNANCE_MAP.md`
- `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`
- `project-brain/SYSTEM_HEALTH_AGENT_PLAN.md`
- `project-brain/lessons/LESSONS_LEARNED.md`
- `project-brain/bugs/CURRENT_BUGS.md`
- `project-brain/maps/SYSTEM_MAP.md`
- `project-brain/current/LIVE_OBJECTS.md`
- `agents/AGENT_REGISTRY.md`
- `agents/AGENT_FACTORY_OPERATING_SYSTEM.md`
- `agents/PRE_MISSION_REVIEW_SYSTEM.md`
- `agents/ORCHESTRATOR_AGENT.md`
- `agents/INFRASTRUCTURE_MANAGER_AGENT.md`
- `agents/PROJECT_BRAIN_AGENT.md`
- `agents/PROJECT_BRAIN_AGENT_SOP.md`
- `agents/FACTORY_CONTROL_CENTER_AGENT.md`
- `project-brain/agents/QA_AGENT.md`

Git evidence:

- Live latest commit: `58230e4 Sync project brain after SCR matching preview`
- Working tree at audit start was not clean. Existing uncommitted governance work was present from prior tasks, including `PROJECT_INDEX.md`, `agents/AGENT_REGISTRY.md`, `project-brain/CURRENT_TASK.md`, `project-brain/DECISION_LOG.md`, `project-brain/TASK_BOARD.md`, `project-brain/AGENT_GOVERNANCE_MAP.md`, and `project-brain/FULL_PROJECT_DISCOVERY_AUDIT.md`.
- No pull was run because the working tree was not clean.

## Current Project Position

PROJECT TREE

```text
PROJECT
|- Wave 1 Service Report Core
|  STATUS: COMPLETE
|- Wave 2 Service Workflow Layer
|  STATUS: CURRENT
|- Wave 3 Maven Knowledge Layer
|  STATUS: PENDING
|- Wave 4 Inventory Layer
|  STATUS: PENDING
|- Wave 5 Offline First
|  STATUS: PENDING
|- Wave 6 Automation Runtime
|  STATUS: PENDING
|- Wave 7 Production Shadow
|  STATUS: PENDING
|- Wave 8 Production Cutover
|  STATUS: PENDING
`- Wave 9 AppSheet Retirement
   STATUS: PENDING
```

CURRENT POSITION

- Current Wave: Wave 2 Service Workflow Layer
- Current Task: SCR matching preview panel is implemented and validated; no next implementation task is approved yet
- Last Completed Task: SCR matching preview panel and governance completion-model correction
- Next Task: None approved

PROJECT COMPLETION MODEL

| Capability | Weight | Status | Contribution |
|---|---:|---|---:|
| Governance / Project Brain / Git workflow | 15% | Complete | 15% |
| Supabase + Prisma Data Layer | 15% | Complete | 15% |
| Import Framework + Wave 1 Import | 10% | Complete | 10% |
| Wave 1 Service Reports UI | 10% | Complete | 10% |
| Wave 2 Workflow Layer | 15% | Current | 6% |
| Wave 3 Maven Knowledge Layer | 15% | Pending | 0% |
| Wave 4 Inventory Layer | 10% | Pending | 0% |
| Wave 5 Offline First | 5% | Pending | 0% |
| Wave 6 Automation Runtime | 3% | Pending | 0% |
| Wave 7-9 Production Shadow / Cutover / AppSheet Retirement | 2% | Pending | 0% |

Formula: `15 + 15 + 10 + 10 + 6 + 0 + 0 + 0 + 0 + 0 = 56`.

CRITICAL PATH

Wave 2 Service Workflow Layer -> Wave 3 Maven Knowledge Layer -> Wave 4 Inventory Layer -> Wave 5 Offline First -> Wave 6 Automation Runtime -> Wave 7 Production Shadow -> Wave 8 Production Cutover -> Wave 9 AppSheet Retirement.

NEXT APPROVAL GATE

Explicitly select the next candidate task before implementation. Separate explicit approval remains required before DB import/write, schema change, migration, env change, Maven/Invoice4U action, source-system action, or production integration.

## Capability Profiles

### ORCHESTRATOR_AGENT

#### Identity

| Field | Value |
|---|---|
| Agent Name | `ORCHESTRATOR_AGENT` |
| Purpose | Select agents, tools, sources, execution order, risks, and approval requirements. |
| Status | Active |
| Type | Specialist Agent / Governance coordinator / current PM-like delivery coordinator |

#### Knowledge

Knows task routing, source selection, approval gates, AUTO_ALLOWED versus APPROVAL_REQUIRED work, and the current agent registry. It reads `PROJECT_INDEX.md`, `project-brain/TASK_BOARD.md`, `agents/AGENT_REGISTRY.md`, and relevant task files. It understands project-state work, code analysis, Apps Script, Maven, AI Draft, Git/checkpoint work, and expense automation categories. It has business knowledge at routing level: service reports, BusinessDocuments, Maven drafts, expenses, AI Draft generation, and protected production flows. It has architecture knowledge through the protocol, Project Brain, registry, and Infrastructure Manager, but it lacks a full mission SOP and explicit PM metrics.

Missing knowledge:

- No full PM execution SOP.
- No formal prioritization scoring beyond task board/protocol.
- No agent trust score or confidence model.
- No durable question matrix embedded in the agent file.

#### Inputs

Can consume user requests, current task, task board, registry, Project Brain state, maps, specialist agent files, git status, validation outputs, and approval boundaries.

#### Outputs

Can produce agent selection, tool selection, source list, execution order, risk list, approval needs, routing packet, and final report structure.

#### Permissions

Allowed: read files, inspect repo, route tasks, execute AUTO_ALLOWED work, run approved/read-only checks, update Project Brain after safe completed work when rules allow.

Forbidden: production writes, schema changes, DB writes/imports, Maven actions, Apps Script/AppSheet/Sheets/Drive/email changes, deletes/moves, git remote changes, and new agent architecture without approval.

Approval required: any APPROVAL_REQUIRED action listed in protocol.

#### Tools

Available: Git status/log/diff, Project Brain docs, code/docs reports, local validation tools, read-only route/DB checks when scoped and approved by rules.

#### Decision Authority

Can decide routing, safe execution order, and whether work is AUTO_ALLOWED versus APPROVAL_REQUIRED. Requires escalation for architecture conflicts. Requires Liad approval for production, financial, customer-facing, schema, DB write/import, external-write, deployment, delete/move, or new architecture actions.

#### Risk Authority

Can identify scope, approval, routing, source-of-truth, protected-system, and dirty-worktree risks. Cannot independently evaluate deep domain risks without routing to the relevant specialist or Infrastructure Manager.

#### Learning

Can update Project Brain when mission scope authorizes it. Can store durable lessons only through Project Brain files. It can improve workflows by proposing updates, but durable protocol changes need approval.

#### Reuse Potential

Reuse as the PM/delivery coordinator. Do not duplicate as a new PM Agent unless a later Infrastructure Manager review proves a real gap that cannot be solved by upgrading this agent.

#### Capability Gaps

- Needs full PM mission SOP.
- Needs question matrix for task triage.
- Needs decision confidence/risk score.
- Needs stronger handoff integration with QA and Factory Control Center.

#### Recommended Upgrades

1. Add PM mission SOP to `ORCHESTRATOR_AGENT`.
   - Business value: less Liad coordination overhead.
   - Risk reduction: fewer unsafe starts and fewer ambiguous next steps.
   - Effort: Medium.
   - Path: extend existing agent file or add SOP only after registry review.
2. Add task triage question matrix.
   - Business value: faster routing and fewer clarifying loops.
   - Risk reduction: ensures protected systems and approval gates are checked.
   - Effort: Low-medium.
   - Path: reuse Pre-Mission Review questions and Task Board categories.
3. Add PM-style evidence packet.
   - Business value: clearer final decisions.
   - Risk reduction: stops unsupported task completion claims.
   - Effort: Low.
   - Path: connect Orchestrator output to QA and Reviewer packet format.

### INFRASTRUCTURE_MANAGER_AGENT

#### Identity

| Field | Value |
|---|---|
| Agent Name | `INFRASTRUCTURE_MANAGER_AGENT` |
| Purpose | Protect architecture, enforce source-of-truth, reuse-before-create, approval gates, and stable system boundaries. |
| Status | Active |
| Type | Specialist Agent / Architect governance |

#### Knowledge

Knows source hierarchy, current-state-before-future-state, evidence-before-assumption, target architecture comparison, reuse decisions, protected production flows, migration risk, stable systems, and registry awareness. It reads the protocol, index, Project Brain master, current task, live objects, decision log, target architecture, sheets registry, agent registry, system maps, bugs, lessons, and relevant source files. It understands business workflows around ServiceReports, Customers, ReportEquipmentItems, BusinessDocuments, AutomationCommands, Maven drafts, Drive save logic, report counters, and AppSheet/Apps Script row-update boundaries.

Missing knowledge:

- No complete mission-by-mission SOP in its own file.
- No formal risk scoring model.
- No structured architecture decision ledger beyond `DECISION_LOG.md`.
- No explicit agent trust/maturity assessment process.

#### Inputs

User request, project protocol, project index, Project Brain files, current task, live object tracking, decision log, target architecture, registry, maps, bugs, lessons, sheets registry, and read-only source when relevant.

#### Outputs

Infrastructure Review with goal, current evidence, source of truth used, existing assets, reuse decision, target architecture status, affected systems, stable systems to protect, approval requirement, risk, recommended next step, and deferred items.

#### Permissions

Allowed: read/search files, compare maps/registries, classify reuse decisions, identify protected systems, produce governance reviews, route work.

Forbidden: runtime code creation, automations, Google Sheets creation/modification, Apps Script deployment/push, Maven document creation, email sending, payment updates, Drive permission changes, data deletion/cleanup/repair, bypassing AutomationCommands, inventing IDs, duplicate components when extension is possible.

Approval required: production-impacting, schema, migration, external-write, financial, customer-facing, source-system, new component, and architecture changes.

#### Tools

Available: Project Brain, docs, maps, registry, Git status/diff, read-only source review, Infrastructure Review template.

#### Decision Authority

Can decide architecture readiness, reuse/extend/create recommendation, target architecture status, and whether mission should stop for approval. Cannot approve production actions for Liad.

#### Risk Authority

Can identify architecture risk, duplication risk, migration risk, source-of-truth risk, protected-system risk, and approval-boundary risk. Cannot verify live production runtime state unless read-only evidence is available.

#### Learning

Can propose durable decisions and Project Brain updates. Can improve workflows through governance docs. Learning must be recorded in Project Brain, lessons, decisions, or maps.

#### Reuse Potential

Reuse as Architect Agent. Never duplicate with a new Architect Agent until this role has been upgraded and still proven insufficient.

#### Capability Gaps

- Needs full mission SOP.
- Needs risk engine.
- Needs architecture decision matrix.
- Needs explicit trust/maturity scoring for agents and systems.

#### Recommended Upgrades

1. Add Infrastructure Manager mission SOP.
   - Business value: faster safe decisions on architecture and production gates.
   - Risk reduction: prevents duplicate components and premature future-platform work.
   - Effort: Medium.
   - Path: extend existing file and align with Infrastructure Review Template.
2. Add risk classification engine.
   - Business value: clearer approval gates.
   - Risk reduction: catches schema/DB/Maven/AppSheet risks early.
   - Effort: Medium.
   - Path: codify risk categories from protocol and protected systems.
3. Add reuse decision checklist.
   - Business value: prevents agent/file/system sprawl.
   - Risk reduction: lowers duplication and conflicting ownership.
   - Effort: Low.
   - Path: reuse `AGENT_GOVERNANCE_MAP.md` and registry rules.

### PROJECT_BRAIN_AGENT

#### Identity

| Field | Value |
|---|---|
| Agent Name | `PROJECT_BRAIN_AGENT` |
| Purpose | Load, protect, validate, update, checkpoint, and hand off durable project memory. |
| Status | Active |
| Type | Specialist Agent / Governance memory |

#### Knowledge

Knows Project Brain state, current task, task board, decisions, lessons, bugs, maps, checkpoints, stable IDs, and durable memory rules. It has the strongest learning/storage capability because it owns memory and handoff discipline. It understands business workflows through Project Brain: service reports, report counters, Drive files, customer folders, BusinessDocuments, AutomationCommands, Maven, AI Draft, and known bugs.

Missing knowledge:

- Some files are stale or historical, such as `project-brain/current/LIVE_OBJECTS.md` still showing older phase context.
- It depends on current source hierarchy to avoid stale memory.
- It does not have automatic conflict resolution beyond source hierarchy.

#### Inputs

Protocol, index, Project Brain master, current task, live objects, roadmap, decision log, maps, bugs, lessons, checkpoints, agent registry, Pre-Mission Review, Infrastructure Manager, sheets registry, and git status.

#### Outputs

Current-state summary, stable systems summary, known IDs, unknown values, findings, validation, brain updates completed/proposed, checkpoint, risks, approval needs, next safe step.

#### Permissions

Allowed: read Project Brain, validate consistency, propose or apply documentation updates when authorized, create/propose checkpoints, prepare handoffs.

Forbidden: Apps Script writes, Google Sheets writes, AppSheet edits, Maven actions, customer email, unapproved commits/pushes, rewriting stable Project Brain history, inventing IDs.

Approval required: durable decisions in `DECISION_LOG.md`, production actions, commits/pushes unless explicitly requested or covered by autonomous-safe rules, and any source-system change.

#### Tools

Available: Project Brain docs, Git status/diff, checkpoints, lessons, bugs, maps, registry, documentation edits when authorized.

#### Decision Authority

Can decide source-backed memory state and identify stale/conflicting docs. Can propose or perform scoped Project Brain updates when mission authorizes. Cannot approve production or business decisions.

#### Risk Authority

Can identify stale memory risk, source conflict risk, unknown ID risk, missing checkpoint risk, and handoff risk. Cannot deeply evaluate code/runtime behavior without specialist validation.

#### Learning

Yes. This is the primary learning agent. It can store lessons, update Project Brain, propose checkpoints, and improve workflows through documentation when authorized.

#### Reuse Potential

Reuse for shared learning, session handoff, current-state recovery, and memory. Never create a separate memory agent before upgrading this one.

#### Capability Gaps

- Needs tighter integration with Orchestrator and QA.
- Needs stale-file detection matrix.
- Needs structured learning intake from QA and Factory Control Center findings.

#### Recommended Upgrades

1. Add shared learning intake workflow.
   - Business value: converts every task into reusable knowledge.
   - Risk reduction: prevents repeated mistakes and stale handoffs.
   - Effort: Low-medium.
   - Path: extend Project Brain Agent SOP with QA/FCC learning intake.
2. Add stale-source detector.
   - Business value: prevents work from old context.
   - Risk reduction: avoids wrong phase/task/action.
   - Effort: Medium.
   - Path: compare source hierarchy fields across current task, task board, roadmap, live objects, and master.
3. Add checkpoint criteria score.
   - Business value: better recovery after interruption.
   - Risk reduction: fewer lost decisions.
   - Effort: Low.
   - Path: reuse checkpoint procedure.

### FACTORY_CONTROL_CENTER_AGENT

#### Identity

| Field | Value |
|---|---|
| Agent Name | `FACTORY_CONTROL_CENTER_AGENT` |
| Purpose | Master auditor for phases, missions, outputs, agents, SOPs, roadmap progress, and completion claims. |
| Status | Active draft |
| Type | Governance / Control System |

#### Knowledge

Knows audit missions, source requirements, phase audit, output audit, agent audit, SOP coverage, completion classifications, reality-vs-documentation validation, recovery rules, and factory status reporting. It reads protocol, index, Pre-Mission Review, Infrastructure Manager, registry, Agent Factory OS, Project Brain, current task, live objects, roadmap, maps, checkpoints, bugs, lessons, sheets registry, agent files, read-only source when needed, and git status/diff.

Missing knowledge:

- It is not yet connected as a routine automated step in every task.
- It has many templates, but trust/maturity scoring is not fully operational.
- It audits broad reality but does not itself own implementation decisions.

#### Inputs

Audit request, governance sources, roadmap/phase evidence, agent registry and SOP evidence, output evidence, git state, changed files, Project Brain state, maps, bugs, lessons, checkpoints.

#### Outputs

Factory status reports, phase audit reports, mission audit reports, output audits, agent audits, SOP coverage reports, completion audits, escalation packages, recovery plans, and next safe recommendations.

#### Permissions

Allowed: read sources, compare documentation to reality, classify findings, issue audit decisions, propose recovery.

Forbidden: build, deploy, mutate production, approve production actions, replace Infrastructure Manager, modify Apps Script/Sheets/AppSheet/Maven/Drive/email/payment, commit/push unless explicitly requested.

Approval required: any production, source-system, external-write, commit/push, or new/extended agent/workflow/component action.

#### Tools

Available: Project Brain, docs, reports, registry, maps, git status/diff, read-only source evidence.

#### Decision Authority

Can decide audit status such as `AUDIT_PASS`, `NEEDS_DISCOVERY`, `NEEDS_RECOVERY`, or `ESCALATE_TO_INFRASTRUCTURE_MANAGER`. Cannot approve production actions.

#### Risk Authority

Can identify documentation-vs-reality conflicts, completion overclaims, missing SOPs, missing evidence, roadmap mismatch, output gaps, production safety failures, and duplicate-agent risk. Cannot evaluate runtime state not present in evidence.

#### Learning

Can recommend brain updates and checkpoint requirements. Does not directly own learning storage; routes durable learning to Project Brain.

#### Reuse Potential

Reuse as AI Control Center audit layer. Never create a second Control Center.

#### Capability Gaps

- Needs integration trigger points.
- Needs concise audit mode for daily work.
- Needs trust score and evidence score output.

#### Recommended Upgrades

1. Add lightweight FCC task audit mode.
   - Business value: fast quality control without heavy reports.
   - Risk reduction: catches output and evidence gaps before final reports.
   - Effort: Medium.
   - Path: add short audit profile based on existing templates.
2. Add Agent Trust Score model.
   - Business value: clarifies which agents can be used autonomously.
   - Risk reduction: prevents relying on immature/planned agents.
   - Effort: Medium.
   - Path: reuse SOP coverage, validation history, and registry maturity.
3. Add completion-claim checker.
   - Business value: prevents false progress percentages.
   - Risk reduction: catches future 60% vs 56% style mismatches.
   - Effort: Low-medium.
   - Path: reuse completion algorithm and Project Index completion model.

### QA_AGENT_WORKFLOW_ROLE

#### Identity

| Field | Value |
|---|---|
| Agent Name | `QA_AGENT_WORKFLOW_ROLE` |
| Purpose | Validate completed work and protected-system boundaries. |
| Status | Active workflow role |
| Type | Project Brain Workflow Role |

#### Knowledge

Knows validation levels by change type, protected boundary checks, pass criteria, unrelated blocker reporting, and closeout readiness. It reads Builder handoff, changed files, expected behavior, approval boundaries, validation scripts/checks, and Project Brain closeout requirements.

Missing knowledge:

- It is not yet a full specialist QA agent under `agents/`.
- It lacks explicit test matrix for every app module.
- It has no trust score, historical pass/fail log, or automated evidence engine.

#### Inputs

Builder handoff, changed files, expected behavior, approval boundaries, scripts/checks, route checks, read-only query results, Project Brain closeout requirements.

#### Outputs

Validation commands, results, failed checks and reasons, protected systems confirmed untouched, final QA status: `PASS`, `PASS_WITH_EXISTING_GAP`, or `FAIL`.

#### Permissions

Allowed: documentation checks, scoped TypeScript/build/route checks, read-only Prisma queries, protected-system review.

Forbidden: production-impacting approval, production mutation, DB/schema/runtime workflow mutation, replacing Reviewer or Liad approval.

Approval required: any write, production, schema, migration, import, Maven, AppSheet, Sheets, Apps Script, Drive, email, or customer-facing action.

#### Tools

Available: Git diff/status, local validation commands, route checks, read-only Prisma queries, documentation review.

#### Decision Authority

Can pass/fail validation. Cannot approve production or business-risk actions.

#### Risk Authority

Can identify validation gaps, forbidden file/system changes, unrelated blockers, unresolved blocker language, and insufficient evidence. Cannot independently certify production runtime behavior without evidence.

#### Learning

Can provide findings for Project Brain. It does not itself persist lessons unless closeout updates Project Brain/lessons/decision files.

#### Reuse Potential

Reuse as current QA. Do not create duplicate QA until this role is upgraded and a real specialist QA gap remains.

#### Capability Gaps

- Needs module-level validation matrix.
- Needs evidence packet standard.
- Needs QA history/trust log.

#### Recommended Upgrades

1. Add QA evidence packet template.
   - Business value: faster approval confidence.
   - Risk reduction: fewer incomplete validations.
   - Effort: Low.
   - Path: extend `project-brain/agents/QA_AGENT.md`.
2. Add module validation matrix.
   - Business value: predictable checks for each app/data area.
   - Risk reduction: catches route/data regressions.
   - Effort: Medium.
   - Path: derive from `APPLICATION_ROUTE_MAP.md` and `DATA_COVERAGE_AUDIT.md`.
3. Add QA-to-Project-Brain learning loop.
   - Business value: validation knowledge compounds.
   - Risk reduction: repeated blockers become visible.
   - Effort: Low-medium.
   - Path: hand off durable findings to Project Brain Agent.

## Extended Ecosystem Capability Table

| Agent / Role | Status | Type | Current Capability | Main Gap | Reuse Rule |
|---|---|---|---|---|---|
| `PRE_MISSION_REVIEW_SYSTEM` | Active | Governance gate | Defines mission questions, evidence, reuse/create decision, affected systems, validation, brain updates. | Needs alignment with Map Guard to avoid duplicated review language. | Reuse for intake gates. |
| `MAP_GUARD_AGENT` | Active workflow role | Project Brain workflow | Checks source ownership, reuse, protected systems, and approval gates. | Needs tighter connection to Pre-Mission Review. | Reuse before new guard roles. |
| `BUILDER_AGENT` | Active workflow role | Project Brain workflow | Performs approved/AUTO_ALLOWED scoped work and hands to QA. | Not a standalone specialist; depends on Orchestrator and domain owners. | Reuse as implementation role. |
| `REVIEWER_AGENT` | Active workflow role | Project Brain workflow | Reviews scope, validation, approval gates, Project Brain sync, and final readiness. | Needs clearer integration with FCC for larger audits. | Reuse as task-level final review. |
| `AGENT_COMMUNICATION_PROTOCOL` | Active protocol | Workflow protocol | Defines handoff packets and escalation shape. | Needs consistent use in every task. | Reuse for all handoffs. |
| `AUTONOMOUS_BUILD_WORKFLOW` | Active protocol | Workflow protocol | Defines safe build loop. | Some language overlaps protocol and Orchestrator. | Reuse for safe task flow. |
| `GIT_AGENT` | Active | Specialist | Git status, diff, staging, commit/push under approved/safe scope. | Full SOP missing. | Reuse for git safety; upgrade before new git role. |
| `APPS_SCRIPT_AGENT` | Active | Specialist | Read-only Apps Script analysis and approved change planning. | Full executable SOP missing. | Reuse for Apps Script. |
| `MAVEN_AGENT` | Active | Specialist | Maven sync/draft analysis and safe plan. | Full diagnostic SOP missing. | Reuse for Maven/Invoice workflow. |
| `AI_DRAFT_AGENT` | Development | Specialist | Draft recommendation logic, pricing rules, evidence flags. | Full SOP and real imported historical data gaps. | Reuse for AI recommendation work. |
| `SYSTEM_HEALTH_AGENT` | Planned only | Future/planned | Read-only health plan exists. | No active agent file; no runtime. | Reuse plan before creating agent. |
| `QA_AGENT_SPECIALIST` | Planned only | Future/planned | Potential broader QA specialist. | Not executable; current QA is workflow role. | Do not create unless gap remains after workflow QA upgrade. |
| `INVOICE4U_AGENT` | Planned only | Future/planned | Future finance integration placeholder. | No source file/SOP. | Reuse Maven/AppScript/Infrastructure first. |
| `EXPENSE_AGENT` | Planned only | Future/planned | Future expense automation placeholder. | No source file/SOP. | Do not create before read-only discovery. |

## Global Analysis

### Agent vs Agent Comparison

| Capability | Orchestrator | Infrastructure Manager | Project Brain | Factory Control Center | QA Workflow |
|---|---|---|---|---|---|
| PM coordination | Strong | Partial | Partial | Audit only | None |
| Architecture governance | Partial | Strong | Partial | Audit only | Boundary validation |
| Current state memory | Partial | Uses | Strong | Uses | Uses |
| Validation | Coordinates | Defines risk | Records | Audits | Strong |
| Completion audit | Partial | Risk review | Records | Strong | Checks evidence |
| Production approval | No | No | No | No | No |
| Reuse-before-create | Coordinates | Strong | Records | Audits | Checks scope |
| Learning storage | Routes | Proposes | Strong | Recommends | Feeds findings |
| Risk detection | Medium | Strong | Medium | Strong | Medium |
| Execution | Coordinates AUTO_ALLOWED | No runtime execution | Docs only | Audit only | Validation only |

### Overlaps

| Overlap | Agents Involved | Reality | Recommendation |
|---|---|---|---|
| PM-like coordination | Orchestrator, Project Brain, Task Board | Distributed PM exists. | Upgrade Orchestrator + Project Brain integration, do not create PM Agent. |
| Architecture review | Infrastructure Manager, FCC, Target Architecture | Infrastructure gates; FCC audits. | Keep Infrastructure as decision gate and FCC as auditor. |
| Pre-work review | Pre-Mission Review, Map Guard, Infrastructure Manager | Similar checks exist in multiple places. | Consolidate language; keep roles distinct. |
| QA/output audit | QA Workflow, Reviewer, FCC | QA validates task, Reviewer checks final scope, FCC audits broader reality. | Keep layered review; define trigger thresholds. |
| Learning | Project Brain, Lessons, Decisions, FCC findings | Learning exists but is manual. | Add QA/FCC learning handoff to Project Brain Agent. |

### Missing Coverage

| Missing Coverage | Current Evidence | Impact |
|---|---|---|
| Agent trust score | Registry has maturity text but no score model. | Hard to know autonomy level per agent. |
| Risk engine | Protocol has risk categories but no scoring workflow. | Approval gates depend on manual judgment. |
| Decision engine | Decision log exists but no decision matrix. | Repeated decisions require manual reconstruction. |
| Evidence engine | QA/FCC require evidence but no shared packet index. | Final reports can be inconsistent. |
| Question matrix | Pre-Mission questions exist but not embedded in Orchestrator as reusable triage. | Liad may still get repeated clarifying questions. |
| Agent skills matrix | Some skills/files exist but no consolidated capabilities by tool/source/output. | Routing can miss existing capability. |
| Daily Control Center | FCC exists but no routine lightweight cadence. | Control function is available but underused. |

### Conflicts

| Conflict | Evidence | Current Resolution |
|---|---|---|
| QA planned vs active | Registry was updated to distinguish `QA_AGENT_WORKFLOW_ROLE` from planned `QA_AGENT_SPECIALIST`. | Active QA is workflow role; specialist QA is planned only. |
| Completion 60% vs 56% | Full discovery audit found formula mismatch. | Canonical correction is 56%. |
| Live objects phase stale | `LIVE_OBJECTS.md` still says Phase 1 while current task/index say Wave 2. | Use current task/index for current phase; live objects only for IDs. |
| Agent Factory OS older QA row | Factory OS still describes planned `QA_AGENT` as missing in `agents/`. | Interpret as specialist QA only; workflow QA already exists. |

### Blind Spots

- No live AppSheet/App Script/Maven runtime verification was performed in this audit.
- No DB queries were run.
- No code, Prisma, or business logic was inspected beyond governance context.
- Agent performance history is not recorded in a structured metric table.
- Planned future finance agents have no executable source files.

### Duplication

| Proposed New Thing | Existing Asset To Reuse |
|---|---|
| PM Agent | `ORCHESTRATOR_AGENT`, `PROJECT_BRAIN_AGENT`, `CURRENT_TASK.md`, `TASK_BOARD.md`, `PROJECT_INDEX.md` |
| Architect Agent | `INFRASTRUCTURE_MANAGER_AGENT`, `INFRASTRUCTURE_REVIEW_TEMPLATE.md`, target architecture docs |
| QA workflow | `project-brain/agents/QA_AGENT.md` |
| Control Center | `FACTORY_CONTROL_CENTER_AGENT.md` |
| Shared learning agent | `PROJECT_BRAIN_AGENT`, lessons, decisions, checkpoints |
| Agent discovery | `AGENT_REGISTRY.md`, `AGENT_GOVERNANCE_MAP.md`, `AGENT_FACTORY_OPERATING_SYSTEM.md` |
| Risk review | `PROJECT_OPERATING_PROTOCOL.md`, `INFRASTRUCTURE_MANAGER_AGENT`, Pre-Mission Review |

## Future Vision Analysis

| Future Capability | Status | Current Asset | Gap / Recommended Direction |
|---|---|---|---|
| PM Agent | Partially Exists | Orchestrator + Project Brain + Task Board | Upgrade Orchestrator as PM/delivery SOP; do not create new. |
| Architect Agent | Already Exists | Infrastructure Manager | Add full mission SOP and risk engine. |
| QA Agent | Partially Exists | QA workflow role | Upgrade workflow QA first; keep specialist QA planned only. |
| Shared Learning | Partially Exists | Project Brain, lessons, decisions, checkpoints | Add intake loop from QA/FCC findings. |
| Question Matrix | Partially Exists | Pre-Mission Review questions | Embed reusable matrix into Orchestrator and Infrastructure reviews. |
| Agent Discovery | Partially Exists | Governance map, registry, Agent Factory OS | Add search checklist and capability index. |
| Agent Registry | Already Exists | `agents/AGENT_REGISTRY.md` | Keep updated; add trust history later. |
| Agent Skills | Partially Exists | Agent files, SOPs, AI Draft skill | Consolidate tool/source/output capabilities. |
| Agent Trust Score | Missing | Maturity notes only | Add scoring model based on SOP, validation, risk, and history. |
| Risk Engine | Partially Exists | Protocol, Infrastructure Manager, Pre-Mission Review | Convert rules into score/matrix. |
| Decision Engine | Partially Exists | Decision log, Infrastructure Review | Add decision template and status taxonomy. |
| Evidence Engine | Partially Exists | QA/FCC templates, Project Brain closeout | Create standard evidence packet. |
| Hello Codex / Bye Codex | Already Exists | `PROJECT_INDEX.md`, protocol, AGENTS.md | Continue using; align closeout with audit artifacts. |
| AI Control Center | Partially Exists | Factory Control Center Agent | Add lightweight dashboard/report cadence before runtime automation. |

## Most Important Answers

### 1. What can the current system already do that we are underestimating?

It can already act like a governed AI delivery organization:

- Route work through existing owners instead of ad hoc execution.
- Protect production systems through explicit approval gates.
- Validate documentation/code/read-only UI changes with QA workflow.
- Audit completion claims through Factory Control Center logic.
- Preserve durable memory through Project Brain.
- Prevent duplicate agents through registry and governance map.
- Compare future-state ideas against target architecture without building them prematurely.

The hidden strength is that PM, Architect, QA, memory, and audit are already present as distributed governance roles. They need sharpening, not replacement.

### 2. What should be upgraded first?

Upgrade priority:

1. Orchestrator PM/delivery SOP.
2. Infrastructure Manager Architect/risk SOP.
3. QA evidence packet and module validation matrix.
4. Project Brain shared learning intake loop.
5. Factory Control Center lightweight audit mode and trust score.

This order reduces Liad's coordination load fastest while lowering architecture and validation risk.

### 3. What should never be rebuilt?

Never rebuild these from scratch:

- Project Brain memory model.
- Infrastructure Manager as Architect.
- Orchestrator as PM/delivery coordinator.
- QA workflow role.
- Factory Control Center audit concept.
- AutomationCommands queue architecture.
- BusinessDocuments -> AutomationCommands -> AppSheet Bot -> Apps Script -> Maven draft flow.
- Reuse-before-create governance.
- `hey codex` / `by codex` startup-closeout model.

### 4. What creates the highest leverage for Liad?

The highest leverage is a better decision and evidence layer on top of existing agents:

- Orchestrator asks fewer questions because it has a question matrix.
- Infrastructure Manager classifies risk and approval gates clearly.
- QA produces a predictable evidence packet.
- Project Brain records lessons and next gates automatically.
- FCC audits completion and trust without requiring Liad to manually inspect every claim.

This converts Liad from task router into approval owner.

### 5. What would reduce Liad's workload the most?

The biggest workload reduction comes from upgrading the existing Orchestrator and Project Brain integration:

1. Orchestrator determines the next safe action from registry/current task.
2. Infrastructure Manager classifies risk and approval needs.
3. QA validates and prepares evidence.
4. Project Brain records durable state and next task.
5. FCC catches overclaims and missing evidence.

Liad should only need to approve meaningful gates, not repeatedly restate context, remind agents not to duplicate, or reconcile inconsistent completion claims.

## Recommended Upgrade Backlog

| Priority | Upgrade | Business Value | Risk Reduction | Effort | Recommended Implementation Path |
|---:|---|---|---|---|---|
| 1 | Orchestrator PM/delivery SOP | Reduces Liad routing and clarification burden. | Prevents unsafe starts and unclear ownership. | Medium | Extend `agents/ORCHESTRATOR_AGENT.md` using existing Pre-Mission questions and Autonomous Build Workflow. |
| 2 | Infrastructure risk engine | Makes approval gates predictable. | Prevents schema/DB/Maven/AppSheet/production mistakes. | Medium | Extend `agents/INFRASTRUCTURE_MANAGER_AGENT.md` and review template with risk categories/scores. |
| 3 | QA evidence packet | Improves proof quality and closeout confidence. | Prevents incomplete validation and false blocker language. | Low | Extend `project-brain/agents/QA_AGENT.md`. |
| 4 | Shared learning intake | Converts every task into memory. | Prevents repeated errors and stale handoffs. | Low-medium | Extend `agents/PROJECT_BRAIN_AGENT_SOP.md` with QA/FCC intake. |
| 5 | Agent trust score | Clarifies autonomy level per agent. | Prevents planned/immature agents from being treated as active. | Medium | Extend registry and FCC audit output; do not create new agent. |
| 6 | FCC lightweight audit mode | Gives fast control-center review without full audit overhead. | Catches completion/evidence gaps early. | Medium | Extend `FACTORY_CONTROL_CENTER_AGENT.md`. |
| 7 | Agent capability index | Makes routing faster and safer. | Reduces duplicate work and missing specialist reuse. | Medium | Extend `AGENT_GOVERNANCE_MAP.md` or registry after approval. |

## Final Audit Decision

Audit status: `AUDIT_PASS_WITH_GAPS`

Reason:

The existing ecosystem is real, usable, and stronger than it first appears. The main gaps are maturity and integration gaps, not missing-agent gaps.

Next safe decision gate:

Choose which existing governance owner to upgrade first. Recommended gate: approve an Orchestrator PM/delivery SOP upgrade, or approve Infrastructure Manager risk-engine upgrade. Do not create new agents.

Protected systems confirmed untouched by this audit:

- No code changed.
- No Prisma changed.
- No DB changed.
- No business logic changed.
- No Apps Script, Google Sheets, AppSheet, Maven, Drive, email, or production action occurred.
