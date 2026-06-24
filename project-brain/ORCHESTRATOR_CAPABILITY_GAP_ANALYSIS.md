# Orchestrator Capability Gap Analysis

Date: 2026-06-24
Mode: Audit only
Scope: Compare existing `ORCHESTRATOR_AGENT` against desired future PM Agent capabilities

## Executive Summary

The existing `ORCHESTRATOR_AGENT` already performs the core PM-like function for the project: it reads the current state, classifies work, routes to existing agents, selects tools and sources, defines safe execution order, runs AUTO_ALLOWED work, and stops at APPROVAL_REQUIRED gates.

The gap is not that the project lacks a PM Agent. The gap is that the Orchestrator is still a routing-and-execution coordinator, not yet a mature PM operating system.

Minimum conclusion:

- Do not create a new PM Agent.
- Upgrade `ORCHESTRATOR_AGENT` into the PM Agent role.
- Reuse `PROJECT_INDEX.md`, `TASK_BOARD.md`, `PROJECT_BRAIN_AGENT`, `INFRASTRUCTURE_MANAGER_AGENT`, `QA_AGENT_WORKFLOW_ROLE`, `AGENT_REGISTRY.md`, `AGENT_GOVERNANCE_MAP.md`, and `AGENT_FACTORY_OPERATING_SYSTEM.md`.
- Add missing PM capabilities as sections/SOPs around the existing Orchestrator, not as a new agent.

## Sources Inspected

- `git status --short --branch`
- `git log -1 --oneline`
- `agents/ORCHESTRATOR_AGENT.md`
- `agents/AGENT_REGISTRY.md`
- `agents/AGENT_FACTORY_OPERATING_SYSTEM.md`
- `project-brain/AGENT_GOVERNANCE_MAP.md`
- `project-brain/AGENT_CAPABILITY_INTELLIGENCE_AUDIT.md`
- `PROJECT_OPERATING_PROTOCOL.md`
- `PROJECT_INDEX.md`

Git state at audit time:

- Live latest commit: `58230e4 Sync project brain after SCR matching preview`
- Working tree was already dirty from prior governance documentation tasks.
- No pull was run because the working tree was not clean.

## Current Orchestrator Capability

Current strengths:

- Reads `PROJECT_INDEX.md` and `project-brain/TASK_BOARD.md`.
- Understands user goal or project task.
- Classifies task type.
- Identifies required sources.
- Assigns tasks to existing owner agents from `PROJECT_INDEX.md` and `agents/AGENT_REGISTRY.md`.
- Selects tools.
- Defines safe execution order.
- Executes AUTO_ALLOWED work when it is the next approved task.
- Stops at APPROVAL_REQUIRED gates.
- Uses hello/bye workflow through the wider protocol and Project Index.
- Knows the Project Brain multi-agent loop through the protocol and registry.

Current limitations:

- It has no full PM mission SOP.
- It does not have a formal question matrix.
- It does not track Liad workload reduction.
- It does not score trust or maturity by agent before routing.
- It does not maintain a structured skill registry.
- It does not produce a standardized evidence packet before every decision.
- It does not have a formal decision engine.
- It relies on Project Brain and protocol for learning but has no explicit learning intake/output loop.

## Capability Comparison

| Desired PM Capability | Current Status | Current Evidence | Gap |
|---|---|---|---|
| Question Matrix | Partially Exists | Pre-Mission Review has mandatory questions; protocol has task checklist; Orchestrator classifies task type. | Not embedded as an Orchestrator triage matrix. |
| Agent Discovery | Partially Exists | Orchestrator reads registry; governance map and registry list existing agents. | No explicit search/discovery checklist inside Orchestrator. |
| Agent Reuse | Already Exists | Orchestrator assigns existing owners and forbids new agents unless no fit and approval exists. | Needs stronger reuse decision output. |
| Shared Learning | Partially Exists | Project Brain, lessons, decisions, checkpoints exist. | Orchestrator does not explicitly feed lessons/findings into Project Brain. |
| Skill Registry | Partially Exists | Agent files, Agent Factory OS, registry, and available Codex skills exist. | No single Orchestrator-facing skill/source/tool registry. |
| Trust Score | Missing | Registry has maturity notes; Agent Factory OS has SOP coverage. | No numeric or categorical trust score used for routing. |
| Risk Escalation | Partially Exists | Protocol and Orchestrator list APPROVAL_REQUIRED gates. | No scored risk escalation ladder or risk owner matrix. |
| Decision Engine | Partially Exists | Decision log, Infrastructure Manager, protocol approval rules exist. | No Orchestrator decision tree for choose/defer/escalate/execute. |
| Evidence Tracking | Partially Exists | Proof Requirement, QA, Reviewer, FCC audit templates exist. | No Orchestrator evidence packet required at routing time. |
| Hello Codex Workflow | Already Exists | `PROJECT_INDEX.md`, protocol, and AGENTS instructions define startup. | Orchestrator should reference it as its startup intake. |
| Bye Codex Workflow | Already Exists | `PROJECT_INDEX.md` and protocol define shutdown/closeout. | Orchestrator should reference it as its closeout handoff. |
| Agent Recommendation System | Partially Exists | Orchestrator routing table and registry map task types to agents. | No ranked recommendation with reasons, confidence, and alternatives. |
| Continuous Improvement | Partially Exists | Lessons, decisions, Project Brain updates, FCC audits exist. | No Orchestrator feedback loop from each task into upgraded workflow. |
| Liad Workload Reduction Tracking | Missing | Autonomous Work Loop says reduce ping-pong. | No metric tracks decisions avoided, questions avoided, or approval-only handoffs. |

## Missing Capability Estimates

### Trust Score

Status: Missing

| Field | Estimate |
|---|---|
| Difficulty | Medium |
| Risk | Low if documentation-only; medium if used to authorize autonomy without approval rules |
| Business Value | High |
| Recommended Order | 5 |

Recommended path:

1. Reuse `AGENT_REGISTRY.md` trust/maturity notes.
2. Reuse `AGENT_FACTORY_OPERATING_SYSTEM.md` SOP coverage matrix.
3. Add simple categories first: `Trusted`, `Operational`, `Draft`, `Planned`, `Blocked`.
4. Do not let trust score override protocol approvals.

### Liad Workload Reduction Tracking

Status: Missing

| Field | Estimate |
|---|---|
| Difficulty | Low-medium |
| Risk | Low |
| Business Value | Very high |
| Recommended Order | 6 |

Recommended path:

1. Track only practical metrics first:
   - questions avoided by using Project Brain
   - approvals requested only at real gates
   - duplicate-agent creations prevented
   - tasks completed without repeated context from Liad
2. Store metrics in Project Brain governance docs or future closeout summary, not a new agent.
3. Keep metrics qualitative until stable.

## Partially Existing Capability Estimates

### Question Matrix

Status: Partially Exists

| Field | Estimate |
|---|---|
| Difficulty | Low-medium |
| Risk | Low |
| Business Value | Very high |
| Recommended Order | 1 |

Recommended path:

1. Reuse `PRE_MISSION_REVIEW_SYSTEM.md` mandatory questions.
2. Reuse protocol task checklist.
3. Add Orchestrator-specific routing questions:
   - What is the goal?
   - Is there an approved task?
   - Is this AUTO_ALLOWED or APPROVAL_REQUIRED?
   - Which existing owner agent fits?
   - What evidence is required?
   - What can be done without asking Liad?
   - What exact approval gate remains?

### Agent Discovery

Status: Partially Exists

| Field | Estimate |
|---|---|
| Difficulty | Low |
| Risk | Low |
| Business Value | High |
| Recommended Order | 2 |

Recommended path:

1. Require Orchestrator to check `AGENT_REGISTRY.md`.
2. Require Orchestrator to check `AGENT_GOVERNANCE_MAP.md`.
3. Require Orchestrator to search existing agent definitions before proposing new roles.
4. Output closest matching agent, fallback agent, and missing coverage.

### Shared Learning

Status: Partially Exists

| Field | Estimate |
|---|---|
| Difficulty | Medium |
| Risk | Low |
| Business Value | High |
| Recommended Order | 7 |

Recommended path:

1. Reuse `PROJECT_BRAIN_AGENT` and SOP.
2. Add Orchestrator closeout field: `Learning Candidate`.
3. Route durable lessons to `LESSONS_LEARNED.md`, decisions to `DECISION_LOG.md`, and task state to `CURRENT_TASK.md` / `TASK_BOARD.md`.

### Skill Registry

Status: Partially Exists

| Field | Estimate |
|---|---|
| Difficulty | Medium |
| Risk | Medium if it mixes runtime tools with governance permissions |
| Business Value | Medium-high |
| Recommended Order | 8 |

Recommended path:

1. Start with an Orchestrator-facing capability index, not a new tool system.
2. Map agent -> source files -> tools -> allowed actions -> forbidden actions -> validation.
3. Keep runtime/tool permissions governed by protocol.

### Risk Escalation

Status: Partially Exists

| Field | Estimate |
|---|---|
| Difficulty | Medium |
| Risk | Low if it only clarifies gates |
| Business Value | Very high |
| Recommended Order | 3 |

Recommended path:

1. Reuse protocol APPROVAL_REQUIRED list.
2. Reuse Infrastructure Manager protected-system list.
3. Add Orchestrator risk levels:
   - `AUTO_ALLOWED`
   - `AUTO_ALLOWED_WITH_QA`
   - `DISCOVERY_ONLY`
   - `INFRASTRUCTURE_REVIEW_REQUIRED`
   - `LIAD_APPROVAL_REQUIRED`
   - `FORBIDDEN_UNTIL_APPROVED`
4. Never let risk level bypass Liad approvals.

### Decision Engine

Status: Partially Exists

| Field | Estimate |
|---|---|
| Difficulty | Medium |
| Risk | Medium if it becomes too automatic |
| Business Value | Very high |
| Recommended Order | 4 |

Recommended path:

1. Reuse `DECISION_LOG.md`, Infrastructure Review, and protocol approval rules.
2. Add a deterministic Orchestrator decision table:
   - execute
   - audit
   - ask approval
   - defer
   - route to Infrastructure Manager
   - route to Project Brain
   - reject duplicate creation
3. Require evidence for every decision.

### Evidence Tracking

Status: Partially Exists

| Field | Estimate |
|---|---|
| Difficulty | Low-medium |
| Risk | Low |
| Business Value | High |
| Recommended Order | 3 |

Recommended path:

1. Reuse Proof Requirement, QA output, Reviewer output, and FCC output audit.
2. Add Orchestrator evidence packet:
   - sources read
   - files changed
   - protected systems checked
   - validation run
   - open gaps
   - next gate

### Agent Recommendation System

Status: Partially Exists

| Field | Estimate |
|---|---|
| Difficulty | Low-medium |
| Risk | Low |
| Business Value | High |
| Recommended Order | 2 |

Recommended path:

1. Upgrade routing output from single owner to ranked recommendation:
   - primary owner
   - support agents
   - auditor
   - confidence
   - why not other agents
2. Use `AGENT_REGISTRY.md` and `AGENT_GOVERNANCE_MAP.md`.

### Continuous Improvement

Status: Partially Exists

| Field | Estimate |
|---|---|
| Difficulty | Medium |
| Risk | Low |
| Business Value | High |
| Recommended Order | 9 |

Recommended path:

1. After each completed task, Orchestrator should produce:
   - what routing worked
   - what question was missing
   - what evidence was missing
   - what should be added to Project Brain
2. Project Brain Agent stores the durable change if approved/allowed.

## Already Existing Capabilities

### Agent Reuse

Status: Already Exists

Evidence:

- Orchestrator assigns tasks to existing owner agents from Project Index and registry.
- Registry states no new agent may be created until `AGENT_GOVERNANCE_MAP.md` and `AGENT_REGISTRY.md` are checked.
- Governance map says PM Agent should not be created because Orchestrator + Project Brain already cover it.

Remaining upgrade:

- Make Orchestrator output a formal `Reuse Decision` for every task.

### Hello Codex Workflow

Status: Already Exists

Evidence:

- `PROJECT_INDEX.md` and protocol define startup.
- Orchestrator operates after current state is loaded.

Remaining upgrade:

- Add a short Orchestrator section stating that hello/startup is the PM intake stage.

### Bye Codex Workflow

Status: Already Exists

Evidence:

- `PROJECT_INDEX.md` and protocol define closeout.
- Project Brain Agent has session handoff and checkpoint procedures.

Remaining upgrade:

- Add Orchestrator closeout checklist that delegates memory to Project Brain and validation to QA/Reviewer.

## Recommended Implementation Order

| Order | Capability | Why First / Later |
|---:|---|---|
| 1 | Question Matrix | Biggest immediate reduction in repeated Liad context and clarification loops. |
| 2 | Agent Discovery + Agent Recommendation System | Prevents duplicate agents and makes routing explainable. |
| 3 | Risk Escalation + Evidence Tracking | Makes approval gates and proof consistent. |
| 4 | Decision Engine | Converts routing into repeatable PM decisions. |
| 5 | Trust Score | Helps decide autonomy level, but should not come before evidence/risk basics. |
| 6 | Liad Workload Reduction Tracking | Measures whether PM upgrade is working. |
| 7 | Shared Learning | Converts repeated findings into Project Brain memory. |
| 8 | Skill Registry | Useful after routing, risk, evidence, and trust are stable. |
| 9 | Continuous Improvement | Requires the earlier pieces to produce useful feedback. |

## Minimum Upgrade Required

### What is the minimum upgrade required to transform the current ORCHESTRATOR_AGENT into the future PM Agent without creating a new agent?

The minimum upgrade is a focused PM operating layer inside the existing `ORCHESTRATOR_AGENT`, not a new PM agent.

Minimum required additions:

1. **PM Intake / Question Matrix**
   - Convert Pre-Mission Review questions into an Orchestrator triage checklist.
   - The checklist must determine goal, business value, current evidence, existing owner, approval level, risk, validation, and next gate.

2. **Agent Discovery + Reuse Decision**
   - Require every task to check `AGENT_REGISTRY.md` and `AGENT_GOVERNANCE_MAP.md`.
   - Output primary owner, support agents, auditor, and why no new agent is needed.

3. **Risk + Approval Classifier**
   - Convert protocol gates into Orchestrator decision statuses:
     - `AUTO_ALLOWED`
     - `AUTO_ALLOWED_WITH_QA`
     - `DISCOVERY_ONLY`
     - `INFRASTRUCTURE_REVIEW_REQUIRED`
     - `LIAD_APPROVAL_REQUIRED`
     - `FORBIDDEN_UNTIL_APPROVED`

4. **Decision Engine**
   - Add a simple decision table:
     - execute safe work
     - run discovery
     - route to Infrastructure Manager
     - route to Project Brain
     - ask Liad approval
     - defer future-only work
     - reject duplicate creation

5. **Evidence Packet**
   - Before final output, Orchestrator must produce:
     - files read
     - current task status
     - agent selected
     - risk level
     - approval need
     - validation required/run
     - protected systems checked
     - next gate

6. **Liad Workload Metric**
   - Track whether the Orchestrator reduced Liad's work:
     - approvals requested only at meaningful gates
     - repeated context avoided
     - duplicate agent/file creation prevented
     - next action made explicit

This minimum upgrade is enough to make the current Orchestrator function as the future PM Agent because it turns the role from "route and execute" into "intake, decide, route, prove, learn, and reduce owner workload."

## What Should Not Be Built

Do not build:

- a new PM Agent
- a second Orchestrator
- a new agent registry
- a new planning system
- a duplicate Control Center
- a separate learning agent

Reuse and upgrade:

- `agents/ORCHESTRATOR_AGENT.md`
- `agents/AGENT_REGISTRY.md`
- `project-brain/AGENT_GOVERNANCE_MAP.md`
- `agents/PROJECT_BRAIN_AGENT.md`
- `agents/PROJECT_BRAIN_AGENT_SOP.md`
- `agents/INFRASTRUCTURE_MANAGER_AGENT.md`
- `project-brain/agents/QA_AGENT.md`
- `agents/FACTORY_CONTROL_CENTER_AGENT.md`

## Final Audit Decision

Audit status: `AUDIT_PASS_WITH_GAPS`

The current Orchestrator is the correct foundation for the future PM Agent. The missing pieces are structured PM capabilities, not a missing agent identity.

Next recommended decision gate:

Approve a documentation-only Orchestrator PM SOP upgrade that adds the minimum six sections above to the existing `agents/ORCHESTRATOR_AGENT.md`.

Protected systems confirmed untouched by this audit:

- No code changed.
- No Prisma changed.
- No DB changed.
- No business logic changed.
- No runtime workflow changed.
- No new agent created.
- No Apps Script, Google Sheets, AppSheet, Maven, Drive, email, customer-facing, or production action occurred.
