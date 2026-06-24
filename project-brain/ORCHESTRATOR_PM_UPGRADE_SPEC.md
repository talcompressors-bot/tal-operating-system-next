# Orchestrator PM Upgrade Specification

Date: 2026-06-24
Mode: Specification only
Scope: Minimum upgrade path for `ORCHESTRATOR_AGENT` before modifying its definition

## Executive Summary

The existing `ORCHESTRATOR_AGENT` is already the correct owner for the future PM Agent role. It should be upgraded, not replaced.

This specification defines the minimum PM layer to add later to `agents/ORCHESTRATOR_AGENT.md`. It does not modify the Orchestrator file.

Core upgrade principle:

- Keep Orchestrator focused on intake, routing, sequencing, evidence, risk classification, and owner workload reduction.
- Keep architecture decisions with `INFRASTRUCTURE_MANAGER_AGENT`.
- Keep memory and learning storage with `PROJECT_BRAIN_AGENT`.
- Keep validation with `QA_AGENT_WORKFLOW_ROLE` and `REVIEWER_AGENT`.
- Keep audit/control review with `FACTORY_CONTROL_CENTER_AGENT`.
- Keep production, financial, customer-facing, schema, migration, DB write/import, source-system, deployment, and external-write approval with Liad.

## 1. Current ORCHESTRATOR Responsibilities

Current responsibilities from `agents/ORCHESTRATOR_AGENT.md`:

1. Decide which agent and tools are required to achieve the user goal.
2. Own end-to-end execution for AUTO_ALLOWED work.
3. Route specialized work to existing agent owners by role.
4. Read `PROJECT_INDEX.md`.
5. Read `project-brain/TASK_BOARD.md`.
6. Understand the goal.
7. Classify task type.
8. Identify required sources.
9. Assign each task to an existing owner agent from `PROJECT_INDEX.md` and `agents/AGENT_REGISTRY.md`.
10. Select tools.
11. Define safe execution order.
12. Execute AUTO_ALLOWED work autonomously when it is the next approved task.
13. Request approval only when APPROVAL_REQUIRED work is reached.
14. Stop at approval gates.
15. Present proof, risks, and exact approval request.

Current role summary:

The Orchestrator already functions as the project delivery coordinator. Its current weakness is that it does not yet have a formal PM operating layer for questions, discovery, reuse, risk classification, decision logic, evidence tracking, trust, and workload reduction.

## 2. Proposed PM Layer Additions

### Agent Question Matrix Layer

Purpose:

Give the Orchestrator a reusable question layer that selects the right question set by task type, agent owner, risk class, and missing evidence.

Business value:

- Reduces repeated manual clarification from Liad.
- Makes routing consistent across governance, code, data, Maven, Apps Script, QA, and closeout tasks.
- Prevents the Orchestrator from asking broad questions when a targeted agent-specific question would resolve the task.

Interaction with existing responsibilities:

- Extends the current Orchestrator task classification step.
- Reuses the Question Matrix below, Pre-Mission Review questions, and specialist agent boundaries.
- Feeds the Decision Engine, Risk Classifier, Agent Recommendation workflow, and Evidence Packet.

Risks:

- Too many agent-specific questions could slow execution.
- Questions must not become a substitute for reading Project Brain and source files first.

Dependencies:

- `agents/AGENT_REGISTRY.md`
- `project-brain/AGENT_GOVERNANCE_MAP.md`
- `agents/PRE_MISSION_REVIEW_SYSTEM.md`
- relevant specialist agent files

Minimum behavior:

1. Select the relevant question set based on task type.
2. Answer from existing files before asking Liad.
3. Ask Liad only when the answer cannot be found and the missing answer blocks a safe decision.
4. Preserve unanswered facts as `UNKNOWN`.
5. Record question gaps as shared-learning candidates.

### Question Matrix

Purpose:

Turn every user request into a structured PM intake without asking Liad for context that already exists in Project Brain.

Business value:

- Reduces repeated clarification.
- Speeds task routing.
- Prevents unsafe starts.
- Makes every task explainable.

Interaction with existing responsibilities:

- Extends current goal understanding and task classification.
- Reuses `PRE_MISSION_REVIEW_SYSTEM.md` mandatory questions and protocol task checklist.
- Does not replace Infrastructure Manager review.

Risks:

- Too many questions could slow down simple tasks.
- If treated rigidly, it may add bureaucracy.

Dependencies:

- `PROJECT_INDEX.md`
- `PROJECT_OPERATING_PROTOCOL.md`
- `project-brain/CURRENT_TASK.md`
- `project-brain/TASK_BOARD.md`
- `agents/PRE_MISSION_REVIEW_SYSTEM.md`

Minimum questions:

1. What is the user goal?
2. Is there an approved current task?
3. Is this discovery, planning, implementation, validation, closeout, or approval?
4. What business value category applies?
5. Which existing owner agent fits?
6. What existing file/system should be reused?
7. Is the work AUTO_ALLOWED, DISCOVERY_ONLY, or APPROVAL_REQUIRED?
8. What protected systems could be affected?
9. What evidence is required?
10. What is the next decision gate?

### Agent Discovery

Purpose:

Find existing agent owners before proposing or routing work.

Business value:

- Prevents duplicate agents.
- Improves routing accuracy.
- Reduces Liad's need to remember which agent owns what.

Interaction with existing responsibilities:

- Strengthens the current assignment step.
- Reuses `AGENT_REGISTRY.md` and `AGENT_GOVERNANCE_MAP.md`.

Risks:

- Discovery can become repetitive if not summarized.
- Stale registry entries could mislead routing if not checked against source files.

Dependencies:

- `agents/AGENT_REGISTRY.md`
- `project-brain/AGENT_GOVERNANCE_MAP.md`
- relevant `agents/*.md`
- `project-brain/agents/*.md`

Minimum output:

- Primary owner
- Support owner
- Auditor/reviewer
- Existing file evidence
- Missing owner, if any

### Agent Reuse

Purpose:

Require explicit reuse-before-create reasoning for every task that mentions new agents, planning systems, dashboards, registries, workflows, or control systems.

Business value:

- Prevents governance sprawl.
- Keeps ownership clear.
- Preserves accumulated project knowledge.

Interaction with existing responsibilities:

- Extends current rule: do not create new agents unless no existing agent fits and approval exists.
- Connects Orchestrator routing to Infrastructure Manager's reuse decision.

Risks:

- Over-reuse can overload an agent if responsibilities are unrelated.
- Requires clear escalation when no existing owner fits.

Dependencies:

- `AGENT_REGISTRY.md`
- `AGENT_GOVERNANCE_MAP.md`
- `PROJECT_OPERATING_PROTOCOL.md`
- `INFRASTRUCTURE_MANAGER_AGENT.md`

Minimum output:

- `Reuse Existing`
- `Extend Existing`
- `Create New Requires Approval`
- `Defer / Future Only`

### Risk Classifier

Purpose:

Classify each task before action so Orchestrator knows whether to execute, discover, route, or stop for approval.

Business value:

- Prevents accidental production or schema risk.
- Makes approval gates predictable.
- Reduces Liad interruptions to only meaningful gates.

Interaction with existing responsibilities:

- Extends current AUTO_ALLOWED and APPROVAL_REQUIRED logic.
- Does not override protocol or Liad approval.

Risks:

- Risk labels could be misused as permission if not explicit.
- Needs conservative default when evidence is missing.

Dependencies:

- `PROJECT_OPERATING_PROTOCOL.md`
- `PROJECT_INDEX.md`
- `INFRASTRUCTURE_MANAGER_AGENT.md`
- `project-brain/CURRENT_TASK.md`

Risk levels:

| Risk Class | Meaning | Orchestrator Action |
|---|---|---|
| `AUTO_ALLOWED` | Safe scoped work under current rules. | Continue and validate. |
| `AUTO_ALLOWED_WITH_QA` | Safe but needs validation evidence. | Continue, then QA/Reviewer. |
| `DISCOVERY_ONLY` | Facts are missing; read-only discovery allowed. | Discover, then decide. |
| `INFRASTRUCTURE_REVIEW_REQUIRED` | Architecture, source-of-truth, duplicate, or future-platform risk. | Route to Infrastructure Manager. |
| `LIAD_APPROVAL_REQUIRED` | Production, financial, customer-facing, schema, DB write/import, source-system, or external action. | Stop and request approval. |
| `FORBIDDEN_UNTIL_APPROVED` | Explicitly forbidden by current state/protocol. | Stop; do not proceed. |

### Decision Engine

Purpose:

Turn intake, discovery, reuse, and risk into a repeatable action decision.

Business value:

- Makes PM behavior predictable.
- Avoids ad hoc routing.
- Reduces decision fatigue for Liad.

Interaction with existing responsibilities:

- Formalizes current safe execution order.
- Routes architecture decisions to Infrastructure Manager and durable state to Project Brain.

Risks:

- A decision engine must not become an approval engine.
- It must never approve production actions.

Dependencies:

- `PROJECT_OPERATING_PROTOCOL.md`
- `project-brain/DECISION_LOG.md`
- `INFRASTRUCTURE_MANAGER_AGENT.md`
- `PROJECT_BRAIN_AGENT`
- `QA_AGENT_WORKFLOW_ROLE`

Decision outputs:

- `EXECUTE_AUTO_ALLOWED`
- `RUN_DISCOVERY`
- `ROUTE_TO_INFRASTRUCTURE_MANAGER`
- `ROUTE_TO_PROJECT_BRAIN_AGENT`
- `ROUTE_TO_SPECIALIST_AGENT`
- `RUN_QA_REVIEW`
- `REQUEST_LIAD_APPROVAL`
- `DEFER_FUTURE_ONLY`
- `REJECT_DUPLICATE_CREATION`

### Evidence Packet

Purpose:

Create a small evidence record for every task so final reports and approval gates are source-backed.

Business value:

- Improves trust.
- Makes future sessions faster.
- Prevents completion overclaims.

Interaction with existing responsibilities:

- Supports Proof Requirement and Project Tree reporting.
- Feeds QA, Reviewer, Project Brain, and Factory Control Center.

Risks:

- Can become too large if not kept concise.
- Should not duplicate full source files.

Dependencies:

- `QA_AGENT_WORKFLOW_ROLE`
- `REVIEWER_AGENT`
- `FACTORY_CONTROL_CENTER_AGENT`
- `PROJECT_BRAIN_AGENT`

Minimum fields:

- Goal
- Current task status
- Sources read
- Existing owner selected
- Reuse decision
- Risk class
- Decision output
- Validation required
- Validation run
- Protected systems checked
- Next gate

### Liad Workload Metric

Purpose:

Track whether Orchestrator is reducing Liad's operational burden.

Business value:

- Measures the PM upgrade's real value.
- Encourages Orchestrator to use Project Brain before asking questions.
- Makes governance upgrades accountable.

Interaction with existing responsibilities:

- Extends the Autonomous Work Loop goal to reduce ping-pong.
- Can be included in final reports or Project Brain closeout summaries.

Risks:

- Metrics can become fake precision if over-numeric.
- Should start qualitative.

Dependencies:

- `PROJECT_BRAIN_AGENT`
- `TASK_BOARD.md`
- final report / closeout workflow

Initial qualitative metrics:

- Context questions avoided by reading Project Brain.
- Duplicate agents/files prevented.
- Approval requests limited to meaningful gates.
- Next task/gate made explicit.
- Liad decision required: yes/no and exact reason.

### Shared Learning Intake Rule

Purpose:

Ensure every task can make the project smarter by capturing reusable findings, missing questions, routing mistakes, evidence gaps, and approval lessons.

Business value:

- Reduces repeated mistakes.
- Improves future Orchestrator decisions.
- Turns QA, Reviewer, and Factory Control Center findings into reusable Project Brain knowledge.

Interaction with existing responsibilities:

- Extends the Evidence Packet and closeout behavior.
- Does not make Orchestrator the memory owner.
- Routes durable memory to `PROJECT_BRAIN_AGENT`.

Risks:

- Over-recording minor observations could create documentation noise.
- Durable lessons must not be invented or recorded without evidence.

Dependencies:

- `PROJECT_BRAIN_AGENT`
- `project-brain/lessons/LESSONS_LEARNED.md`
- `project-brain/DECISION_LOG.md`
- `project-brain/CURRENT_TASK.md`
- `project-brain/TASK_BOARD.md`

Minimum intake rule:

After each task, Orchestrator should identify whether there is:

1. A reusable lesson.
2. A missing question that should be added to the Agent Question Matrix.
3. A routing or ownership correction.
4. A recurring validation or evidence gap.
5. A risk pattern that should be escalated to Infrastructure Manager.

If yes, Orchestrator marks it as `Learning Candidate` and routes it to Project Brain Agent for the correct storage decision.

### Suspicion Engine

Purpose:

Give Orchestrator a conservative trigger layer for cases where the request looks safe but hidden risk may exist.

Business value:

- Catches silent risk before implementation.
- Protects stable systems from indirect impact.
- Reduces Liad's need to manually detect subtle danger signals.

Interaction with existing responsibilities:

- Feeds the Risk Classifier and Decision Engine.
- Escalates to Infrastructure Manager when suspicion is architecture/source-of-truth related.
- Escalates to QA/Reviewer when suspicion is validation/evidence related.

Risks:

- Too much suspicion can slow safe work.
- Suspicion must trigger focused checks, not broad redesign.

Dependencies:

- `PROJECT_OPERATING_PROTOCOL.md`
- `INFRASTRUCTURE_MANAGER_AGENT`
- `QA_AGENT_WORKFLOW_ROLE`
- `FACTORY_CONTROL_CENTER_AGENT`

Suspicion triggers:

| Trigger | Meaning | Required Orchestrator Action |
|---|---|---|
| User asks to create a new agent/system/file | Possible duplication | Check registry/map first. |
| Task mentions DB, Prisma, import, migration, env, Maven, Apps Script, AppSheet, Sheets, Drive, email, customer, invoice, or production | Possible protected-system impact | Stop or escalate unless explicitly approved. |
| Current task says no approved implementation task | Possible unapproved work | Treat as discovery/planning only or request selection. |
| Existing evidence conflicts | Source-of-truth risk | Route to Infrastructure Manager or Project Brain Agent. |
| Validation cannot prove visible/user-facing result | Evidence gap | Route to QA/Reviewer or mark gap. |
| Planned/future agent is selected as active owner | Maturity risk | Use existing active owner or escalate. |
| Completion percentage or status does not match formula/evidence | Completion overclaim risk | Trigger Factory Control Center or Project Brain correction. |

### Project Gets Smarter Rule

Purpose:

Make every completed task improve future project execution without creating new governance systems.

Business value:

- Compounds knowledge.
- Reduces Liad workload over time.
- Improves future routing, risk detection, validation, and closeout.

Interaction with existing responsibilities:

- Uses Orchestrator to identify improvement opportunities.
- Uses Project Brain Agent to store approved durable learning.
- Uses Factory Control Center to audit whether intelligence is improving.

Risks:

- Can create documentation churn if every small observation is stored.
- Must not update durable decisions without approval.

Dependencies:

- Shared Learning Intake Rule
- Evidence Packet
- Project Brain Agent SOP
- Factory Control Center audit model

Rule:

At the end of each task, Orchestrator should answer:

1. What did this task teach the project?
2. Which future question can now be answered faster?
3. Which repeated Liad instruction can be converted into a rule?
4. Which agent, file, or workflow should be reused next time?
5. Did the task reveal a risk pattern or evidence gap?

If the answer is meaningful and source-backed, route it as a `Learning Candidate`. If not, record no learning update.

## 3. Hello Codex Workflow

Purpose:

Treat `hey codex` as Orchestrator PM intake.

Current sources:

- `PROJECT_INDEX.md`
- `PROJECT_OPERATING_PROTOCOL.md`
- `AGENTS.md`

Proposed Orchestrator behavior:

1. Confirm repository state.
2. If working tree is clean, sync from GitHub according to protocol.
3. If working tree is dirty, do not pull; report dirty state.
4. Load mandatory Project Brain files.
5. Produce Project Reality Check.
6. Identify current task and next approved task.
7. Classify whether user request is audit, planning, implementation, validation, closeout, or approval.
8. Run PM Question Matrix only after current state is known.

What Orchestrator must not do:

- Start implementation before Reality Check.
- Invent a task when none is approved.
- Pull with dirty worktree.
- Create new governance or agent architecture without approval.

## 4. Bye Codex Workflow

Purpose:

Treat `by codex` as Orchestrator PM closeout.

Current sources:

- `PROJECT_INDEX.md`
- `PROJECT_OPERATING_PROTOCOL.md`
- `PROJECT_BRAIN_AGENT_SOP.md`

Proposed Orchestrator behavior:

1. Run Project Reality Check.
2. Review git status and latest commit.
3. Identify changed files and scope.
4. Confirm protected systems untouched.
5. Route memory updates to Project Brain Agent.
6. Route validation summary to QA/Reviewer if needed.
7. Record exact next task or next approval gate.
8. Preserve known IDs or mark `UNKNOWN`.
9. Commit/push only if allowed by protocol and scoped approval.

What Orchestrator must not do:

- Commit unrelated changes.
- Rewrite historical checkpoints.
- Push unapproved production/source-system changes.
- Claim completion without evidence.

## 5. Shared Learning Workflow

Purpose:

Convert task findings into durable project memory without putting memory ownership inside Orchestrator.

Workflow:

```text
Task execution or audit
-> Orchestrator Evidence Packet
-> QA / Reviewer / FCC finding
-> Orchestrator marks Learning Candidate
-> Project Brain Agent decides correct storage location
-> Lessons / Decisions / Current Task / Task Board / Map updated only when authorized
```

Learning destinations:

| Finding Type | Destination |
|---|---|
| Durable rule | `project-brain/DECISION_LOG.md` if approved |
| Operational lesson | `project-brain/lessons/LESSONS_LEARNED.md` |
| Current state | `project-brain/CURRENT_TASK.md` |
| Task progress | `project-brain/TASK_BOARD.md` |
| Architecture/source map | `project-brain/maps/*` |
| Agent ownership | `agents/AGENT_REGISTRY.md` or `project-brain/AGENT_GOVERNANCE_MAP.md` |

Boundary:

Orchestrator identifies learning candidates. Project Brain Agent stores durable learning under existing rules.

## 6. Agent Recommendation Workflow

Purpose:

Make routing explainable and reusable.

Workflow:

1. Identify task type.
2. Search registry and governance map.
3. Identify primary owner.
4. Identify support agents.
5. Identify validation/audit role.
6. Identify approval owner.
7. Assign confidence.
8. Explain why no new agent is needed.

Recommendation format:

```md
Primary Owner:
Support Agents:
QA / Reviewer:
Architecture Gate:
Approval Owner:
Confidence:
Why These Agents:
Why Not Create New:
Missing Coverage:
```

Confidence levels:

- `HIGH`: owner is active, source file exists, responsibility matches.
- `MEDIUM`: owner exists but SOP/maturity gap remains.
- `LOW`: owner unclear, planned-only, or source evidence incomplete.

## 7. Trust Score Workflow

Purpose:

Help Orchestrator decide how much autonomy a routed agent/workflow can safely receive.

Trust score must not approve actions. It only informs routing and validation intensity.

Inputs:

- Registry status.
- Trust/maturity notes.
- SOP coverage.
- Source file exists or missing.
- Risk domain.
- Prior validation evidence, when available.

Initial trust categories:

| Trust Category | Meaning | Routing Effect |
|---|---|---|
| `Operational` | Active, source-backed, used in current workflow. | Can be routed normal AUTO_ALLOWED work. |
| `Operational With Review` | Active but high-risk or SOP-light. | Route with Infrastructure/QA review. |
| `Draft` | Exists but incomplete or audit-only. | Use for audit/planning only. |
| `Development` | In progress, bounded domain. | Use only inside explicit scope. |
| `Planned` | Not executable. | Do not route active work. |
| `Blocked / Unknown` | Evidence missing or conflicting. | Run discovery or escalate. |

Boundary:

Trust score cannot override:

- Liad approval.
- Protocol forbidden actions.
- Infrastructure Manager gates.
- QA validation.

## 8. Upgrade Sequence

### Phase 1 - Minimum PM Layer

Goal:

Deliver the highest value with the lowest risk.

Add later to `ORCHESTRATOR_AGENT`:

1. Agent Question Matrix Layer.
2. Question Matrix.
3. Agent Discovery.
4. Agent Reuse output.
5. Risk Classifier.
6. Decision Engine.
7. Evidence Packet.
8. Suspicion Engine.
9. Shared Learning Intake Rule.
10. Project Gets Smarter Rule.
11. Liad Workload Metric.

Validation:

- Documentation-only diff.
- `git diff --check`.
- Confirm no runtime files changed.
- Confirm no new agent created.

### Phase 2 - PM Integration Layer

Goal:

Connect Orchestrator cleanly to existing workflow roles.

Add later:

1. Hello Codex as PM intake.
2. Bye Codex as PM closeout.
3. Agent Recommendation workflow.
4. Shared Learning workflow.
5. QA/Reviewer/FCC handoff points.

Validation:

- Registry and governance map remain consistent.
- No duplicate responsibilities.
- Workflow uses existing Project Brain roles.

### Phase 3 - PM Intelligence Layer

Goal:

Improve routing quality over time without adding a new PM Agent.

Add later:

1. Trust Score workflow.
2. Skill/source/tool capability index.
3. Continuous improvement loop.
4. Liad workload trend summary.

Validation:

- Trust score does not grant approval.
- Metrics remain qualitative until evidence supports structure.
- Infrastructure Manager remains architecture gate.

## 9. What Should Remain Outside ORCHESTRATOR

| Responsibility | Owner |
|---|---|
| Production approval | Liad |
| Architecture and source-of-truth decisions | `INFRASTRUCTURE_MANAGER_AGENT` |
| Durable memory storage | `PROJECT_BRAIN_AGENT` |
| Current task source of truth | `project-brain/CURRENT_TASK.md` |
| Task board/progress map | `project-brain/TASK_BOARD.md` |
| Decisions | `project-brain/DECISION_LOG.md` |
| QA validation | `project-brain/agents/QA_AGENT.md` |
| Final task review | `project-brain/agents/REVIEWER_AGENT.md` |
| Factory/control audit | `FACTORY_CONTROL_CENTER_AGENT` |
| Git execution safeguards | `GIT_AGENT` |
| Apps Script domain logic | `APPS_SCRIPT_AGENT` |
| Maven domain logic | `MAVEN_AGENT` |
| AI Draft recommendation logic | `AI_DRAFT_AGENT` |
| Prisma/schema/data model authority | Infrastructure Manager plus explicit Liad approval |
| DB writes/imports | Explicit Liad approval only |

## 10. What Should Never Be Added To ORCHESTRATOR

Never add:

- Production write authority.
- Customer-facing send authority.
- Financial/invoice approval authority.
- DB write/import permission.
- Prisma migration or schema-change authority.
- Apps Script deployment authority.
- Google Sheets/AppSheet modification authority.
- Maven document creation authority.
- Drive write or permission-change authority.
- Ability to override Infrastructure Manager.
- Ability to override Project Brain source hierarchy.
- Ability to approve new agents or governance architecture alone.
- Separate long-term memory store.
- Duplicate QA/audit responsibilities.
- Autonomous repair or recovery of production data.

## Smallest Possible Upgrade

### Smallest possible upgrade that delivers the highest value with the lowest risk

The smallest high-value upgrade is Phase 1 only:

1. Add an **Agent Question Matrix Layer** and **PM Question Matrix**.
2. Add **Agent Discovery + Reuse Decision**.
3. Add a **Risk Classifier** and **Suspicion Engine**.
4. Add a **Decision Engine**.
5. Add an **Evidence Packet**.
6. Add a **Shared Learning Intake Rule** and **Project Gets Smarter Rule**.
7. Add a lightweight **Liad Workload Metric**.

Why this is enough:

- It transforms Orchestrator from "route and execute" into "intake, classify, decide, route, prove, and reduce owner workload."
- It reuses existing governance instead of creating new systems.
- It does not change code, DB, Prisma, runtime workflows, Apps Script, Maven, AppSheet, Google Sheets, or production.
- It preserves Liad approval authority.
- It gives immediate practical value by reducing repeated questions, making decisions traceable, detecting hidden risk, and turning useful findings into reusable Project Brain knowledge.

Lowest-risk implementation path after approval:

1. Modify only `agents/ORCHESTRATOR_AGENT.md`.
2. Add Phase 1 sections as documentation/SOP text.
3. Do not alter protocols, registry, runtime code, Prisma, DB, or Project Brain state in the same step.
4. Validate with `git diff --check`.
5. Confirm no new agent files were created.

Expected result:

The existing Orchestrator becomes the functional PM Agent without introducing a new PM Agent, new registry, new planning system, or new governance architecture.

## Final Specification Decision

Status: Ready for approval decision.

Recommended next gate:

Approve Phase 1 documentation-only upgrade to `agents/ORCHESTRATOR_AGENT.md`.

Approval boundary:

This specification does not approve implementation. It only defines the minimum safe upgrade path.

Protected systems confirmed untouched by this specification:

- No Orchestrator definition modified.
- No code modified.
- No Prisma modified.
- No DB modified.
- No business logic modified.
- No runtime workflow modified.
- No new agent created.
- No Apps Script, Google Sheets, AppSheet, Maven, Drive, email, customer-facing, or production action occurred.
