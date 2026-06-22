# AGENT FACTORY OPERATING SYSTEM

Status: Active draft  
Mission: AGENT-FACTORY-1  
Purpose: Define how every registered agent must execute practical work without relying on chat memory or undocumented assumptions.

This file is an execution manual. It is not a role description.

## Operating Rule

Every agent must follow the same execution flow before producing work:

```text
Request
-> Pre-Mission Review
-> Load Sources
-> Select Mission
-> Execute Practical Steps
-> Produce Output
-> Validate Output
-> Auditor Review
-> Infrastructure Manager Approval
-> Brain Update
-> Checkpoint / Handoff
-> Next Mission Recommendation
```

No agent may modify Apps Script, Google Sheets, AppSheet, Maven production state, Drive permissions, customer-facing documents, customer emails, setup functions, deployments, or production data unless the user explicitly approves that exact action after Infrastructure Manager review.

## Required Source Load

Every agent starts by loading these sources in order when relevant to the mission:

1. `PROJECT_OPERATING_PROTOCOL.md`
2. `PROJECT_INDEX.md`
3. `agents/PRE_MISSION_REVIEW_SYSTEM.md`
4. `agents/INFRASTRUCTURE_MANAGER_AGENT.md`
5. `agents/AGENT_REGISTRY.md`
6. `project-brain/PROJECT_BRAIN_MASTER.md`
7. `project-brain/CURRENT_TASK.md`
8. `project-brain/current/LIVE_OBJECTS.md`
9. `project-brain/roadmap/ROADMAP.md`
10. `project-brain/roadmap/PHASE_EXECUTION_BLUEPRINT.md`
11. `project-brain/maps/*`
12. `project-brain/bugs/CURRENT_BUGS.md`
13. `project-brain/lessons/LESSONS_LEARNED.md`
14. `data-sources/tools/SHEETS_REGISTRY.md`
15. relevant `agents/*.md`
16. relevant `apps-script/*` as read-only source only when needed
17. `git status --short`

Missing sources must be recorded as `UNKNOWN`.

## Global Mission Template

Every agent mission output must include:

```md
# Agent Mission Output

Agent:
SOP Status:
Mission:
Mission Objective:
Pre-Mission Review Decision:
Required Inputs:
Sources Loaded:
Tables Used:
Tools Used:
Forbidden Tools Confirmed:
Practical Steps Completed:
Exact Output:
Output Format:
Validation Steps:
Evidence Required:
Evidence Provided:
Failure Conditions Checked:
Recovery Procedure:
Brain Updates Completed:
Brain Updates Proposed:
Checkpoint:
Completion Criteria:
Handoff Output:
Auditor:
Approver:
Next Mission Recommendation:
```

## Agent SOP Coverage Matrix

| Agent | Registry Status | SOP Status | Existing SOP/Doc | Primary Gap |
|---|---|---|---|---|
| `ORCHESTRATOR_AGENT` | Active | MISSING | `agents/ORCHESTRATOR_AGENT.md` | Has routing process, but no full mission SOP. |
| `PROJECT_BRAIN_AGENT` | Active | EXISTS | `agents/PROJECT_BRAIN_AGENT_SOP.md` | Needs future integration with every specialist SOP after they exist. |
| `INFRASTRUCTURE_MANAGER_AGENT` | Active | MISSING | `agents/INFRASTRUCTURE_MANAGER_AGENT.md` | Strong governance doc, but no full mission-by-mission SOP. |
| `PRE_MISSION_REVIEW_SYSTEM` | Active | EXISTS | `agents/PRE_MISSION_REVIEW_SYSTEM.md` | System SOP exists as operating gate, not an agent-specific implementation SOP. |
| `GIT_AGENT` | Active | MISSING | `agents/GIT_AGENT.md` | Has workflow, but no validation, recovery, checkpoint, or handoff SOP. |
| `APPS_SCRIPT_AGENT` | Active | MISSING | `agents/APPS_SCRIPT_AGENT.md` | Has rules, but no executable SOP for analysis/change/test paths. |
| `MAVEN_AGENT` | Active | MISSING | `agents/MAVEN_AGENT.md` | Has Maven boundaries, but no detailed SOP for sync and draft diagnostics. |
| `AI_DRAFT_AGENT` | Development | MISSING | `agents/AI_DRAFT_AGENT.md` | Has business logic, but no complete execution SOP. |
| `QA_AGENT` | Planned | MISSING | UNKNOWN | No agent file found in `agents/`. |
| `INVOICE4U_AGENT` | Planned | MISSING | UNKNOWN | No agent file found in `agents/`. |
| `EXPENSE_AGENT` | Planned | MISSING | UNKNOWN | No agent file found in `agents/`. |

## Agent Output Matrix

| Agent | Required Output | Output Consumer |
|---|---|---|
| `ORCHESTRATOR_AGENT` | Agent selection, tool selection, source list, execution order, risks, approval needs. | Infrastructure Manager, selected builder agent. |
| `PROJECT_BRAIN_AGENT` | Current-state summary, consistency audit, brain update proposal, checkpoint or handoff. | Infrastructure Manager, Git Agent, future sessions. |
| `INFRASTRUCTURE_MANAGER_AGENT` | Infrastructure Review with reuse decision, affected systems, risks, approvals, next safe step. | User, builder agent, auditor agent. |
| `PRE_MISSION_REVIEW_SYSTEM` | Pre-Mission Review Output and decision status. | All agents. |
| `GIT_AGENT` | Git status, changed-file verification, checkpoint/changelog update recommendation, commit/push result when approved. | User, Project Brain Agent. |
| `APPS_SCRIPT_AGENT` | Relevant files, functions involved, risk level, proposed change, test plan. | Infrastructure Manager, QA Agent, Git Agent. |
| `MAVEN_AGENT` | Current Maven state, suspected root cause, safe fix plan, required tests, approval request before code changes. | Infrastructure Manager, Apps Script Agent, QA Agent. |
| `AI_DRAFT_AGENT` | Business document recommendation only, including pricing rationale, confidence, and approval flags. | User, Maven Agent after approval. |
| `QA_AGENT` | UNKNOWN until SOP exists. | Infrastructure Manager. |
| `INVOICE4U_AGENT` | UNKNOWN until SOP exists. | Infrastructure Manager. |
| `EXPENSE_AGENT` | UNKNOWN until SOP exists. | Infrastructure Manager. |

## Agent Tool Matrix

| Agent | Allowed Tools | Forbidden Tools |
|---|---|---|
| `ORCHESTRATOR_AGENT` | Read files, search files, inspect registries/maps, build routing plan. | Production writes, deployment, setup functions, unapproved commits. |
| `PROJECT_BRAIN_AGENT` | Read/write documentation when mission authorizes it, `git status --short`, `git diff`, checkpoints. | Apps Script writes, Google Sheets writes, AppSheet edits, Maven actions, customer email, unapproved commits. |
| `INFRASTRUCTURE_MANAGER_AGENT` | Read files, search registries/maps, compare existing assets, produce Infrastructure Review. | Runtime code creation, Google Sheets creation, Apps Script deployment, Maven document creation, production changes. |
| `PRE_MISSION_REVIEW_SYSTEM` | Read sources, collect evidence, route discovery, produce review output. | Any implementation or production mutation. |
| `GIT_AGENT` | `git status`, `git diff`, `git add`, `git commit`, `git push` only when requested/approved. | Secrets commits, temporary test files, unreviewed production changes, unrelated staging. |
| `APPS_SCRIPT_AGENT` | Read `apps-script/*`, analyze functions, propose incremental fixes, run approved tests only when safe. | Duplicate functions, stable-flow changes without reason, deployment, setup functions, unapproved writes. |
| `MAVEN_AGENT` | Read Maven maps/code/log documentation, analyze sync/draft logic, propose safe fixes. | Rewrite sync from scratch, change draft creation without approval, delete imported docs/items, create Maven docs without approval. |
| `AI_DRAFT_AGENT` | Analyze documented business tables, produce recommendation, mark `NeedsPriceApproval`. | Create final Maven document, send customer documents, mark paid, overwrite BusinessDocuments, guess prices without approval flag. |
| `QA_AGENT` | UNKNOWN. | Production writes unless future SOP explicitly approves under governance. |
| `INVOICE4U_AGENT` | UNKNOWN. | Invoice/payment production actions without explicit approval. |
| `EXPENSE_AGENT` | UNKNOWN. | Expense/payment production actions without explicit approval. |

## Agent Validation Matrix

| Agent | Validation Responsibility |
|---|---|
| `ORCHESTRATOR_AGENT` | Verify selected agents match task type, sources are listed, and approval needs are explicit. |
| `PROJECT_BRAIN_AGENT` | Verify current state is source-backed, unknowns stay `UNKNOWN`, and Project Brain updates match ownership rules. |
| `INFRASTRUCTURE_MANAGER_AGENT` | Verify reuse-before-create, affected systems, protected systems, risks, and approvals. |
| `PRE_MISSION_REVIEW_SYSTEM` | Verify every mandatory pre-mission question has evidence or `UNKNOWN`. |
| `GIT_AGENT` | Verify changed files, staged files, checkpoint need, commit scope, and final status. |
| `APPS_SCRIPT_AGENT` | Verify relevant files/functions, duplicate-function risk, stable-flow impact, and test plan. |
| `MAVEN_AGENT` | Verify sync/draft boundaries, affected Maven tables, existing imported document safety, and approval gates. |
| `AI_DRAFT_AGENT` | Verify source report, customer, equipment/items, historical pricing, recommendation confidence, and approval flags. |
| `QA_AGENT` | UNKNOWN until SOP exists. |
| `INVOICE4U_AGENT` | UNKNOWN until SOP exists. |
| `EXPENSE_AGENT` | UNKNOWN until SOP exists. |

## Agent Handoff Matrix

| Agent | Handoff Output |
|---|---|
| `ORCHESTRATOR_AGENT` | Selected agents, execution order, risks, approvals, next agent. |
| `PROJECT_BRAIN_AGENT` | Current state, changes, checks, unknowns, brain updates, checkpoint, next safe step. |
| `INFRASTRUCTURE_MANAGER_AGENT` | Decision, reuse path, protected systems, approval requirements, next safe step. |
| `PRE_MISSION_REVIEW_SYSTEM` | Review output, decision status, discovery needs, evidence list. |
| `GIT_AGENT` | Status before/after, commit hash when committed, pushed branch when pushed, unstaged/untracked files. |
| `APPS_SCRIPT_AGENT` | Analysis summary, affected functions, risk, proposed patch/test plan, approval need. |
| `MAVEN_AGENT` | Maven state, root cause hypothesis, affected tables/files, safe fix plan, tests. |
| `AI_DRAFT_AGENT` | Draft recommendation, pricing evidence, confidence, approval requirement, Maven handoff conditions. |
| `QA_AGENT` | UNKNOWN until SOP exists. |
| `INVOICE4U_AGENT` | UNKNOWN until SOP exists. |
| `EXPENSE_AGENT` | UNKNOWN until SOP exists. |

---

# ORCHESTRATOR_AGENT

## Agent Name

`ORCHESTRATOR_AGENT`

## Agent Purpose

Select the correct agent, sources, tools, execution order, risks, and approval requirements for a user request.

## SOP Status

MISSING. Existing file defines role, process, routing, and output, but not a full executable SOP.

## Mission Catalog

| Mission | Objective |
|---|---|
| Mission 1 - Route Request | Classify the request and select the smallest safe agent/tool set. |
| Mission 2 - Build Execution Order | Define safe sequence, auditor, approver, and handoff. |

## Mission 1 - Route Request

Mission Objective: Convert a user request into an agent routing decision.  
Required Inputs: User request, `agents/AGENT_REGISTRY.md`, `agents/ORCHESTRATOR_AGENT.md`, `agents/PRE_MISSION_REVIEW_SYSTEM.md`, `agents/INFRASTRUCTURE_MANAGER_AGENT.md`, current task, roadmap, relevant maps.  
Allowed Tools: File read, file search, registry/map review, `git status --short`.  
Forbidden Tools: Production writes, Apps Script edits, Google Sheets edits, AppSheet edits, deployment, setup functions, commits unless separately requested.  
Source Files: Required Source Load plus relevant agent files.  
Tables Used: Registry evidence only from `data-sources/tools/SHEETS_REGISTRY.md`; live table access is UNKNOWN and not required.  
Practical Steps:
1. Read the user request and identify task type.
2. Run Pre-Mission Review questions at routing level.
3. Compare task type to documented routing categories.
4. Select builder agent and auditor agent.
5. Identify protected systems and approval requirements.
Exact Output: Routing decision.  
Output Format:
```md
Agent Routing:
Task Type:
Builder Agent:
Auditor Agent:
Required Sources:
Allowed Tools:
Forbidden Tools:
Approval Required:
Next Safe Step:
```
Validation Steps: Confirm selected agent exists in registry or mark `UNKNOWN`; confirm production boundaries are listed.  
Evidence Required: Registry role, orchestrator routing rule, relevant map/source path.  
Failure Conditions: Task type cannot be classified; required agent is missing; production impact is unclear.  
Recovery Procedure: Mark unknowns, route to Infrastructure Manager, request discovery.  
Brain Updates: Propose only if routing reveals stale registry or missing agent.  
Checkpoint Rules: Create/propose checkpoint only when routing establishes a durable project decision.  
Completion Criteria: Builder, auditor, sources, tools, risks, approvals, and next safe step are named.  
Handoff Output: Routing package to builder agent.  
Who audits this agent: `INFRASTRUCTURE_MANAGER_AGENT`.  
Who approves this agent: Infrastructure Manager; human approval for production-impacting routes.

## Mission 2 - Build Execution Order

Mission Objective: Turn selected agents into a safe sequence.  
Required Inputs: Routing decision, Pre-Mission Review output, Infrastructure Manager rules.  
Allowed Tools: File read/search and documentation output.  
Forbidden Tools: Production writes, code changes, deployment, setup functions, commits unless approved.  
Source Files: `agents/ORCHESTRATOR_AGENT.md`, `agents/PRE_MISSION_REVIEW_SYSTEM.md`, `agents/INFRASTRUCTURE_MANAGER_AGENT.md`.  
Tables Used: UNKNOWN unless the mission touches a documented table.  
Practical Steps:
1. List required agents in execution order.
2. Identify where auditor review occurs.
3. Identify where Infrastructure Manager approval occurs.
4. Add checkpoint/handoff requirement if durable state changes.
Exact Output: Execution order.  
Output Format: Ordered list with agent, task, input, output, auditor, approval.  
Validation Steps: Verify order includes review before production action.  
Evidence Required: Pre-Mission Review flow and Infrastructure Manager approval rules.  
Failure Conditions: Sequence bypasses review or approval.  
Recovery Procedure: Stop and rebuild sequence from Pre-Mission Review flow.  
Brain Updates: Registry or Project Brain update proposal only if the sequence exposes missing governance.  
Checkpoint Rules: Propose checkpoint when the sequence becomes durable execution policy.  
Completion Criteria: Sequence is actionable and approval-gated.  
Handoff Output: Ordered execution package.  
Who audits this agent: `INFRASTRUCTURE_MANAGER_AGENT`.  
Who approves this agent: Infrastructure Manager.

---

# PROJECT_BRAIN_AGENT

## Agent Name

`PROJECT_BRAIN_AGENT`

## Agent Purpose

Load, protect, validate, update, checkpoint, and hand off durable project memory.

## SOP Status

EXISTS: `agents/PROJECT_BRAIN_AGENT_SOP.md`.

## Mission Catalog

| Mission | Objective |
|---|---|
| Mission 1 - Load Project Brain State | Establish current state from official sources. |
| Mission 2 - Validate Project Brain Consistency | Detect stale, duplicated, missing, or conflicting memory. |
| Mission 3 - Propose Brain Updates | Prepare evidence-backed brain update proposals. |
| Mission 4 - Create Or Propose Checkpoint | Preserve milestone or handoff state. |
| Mission 5 - Session Handoff | Produce future-session handoff. |
| Mission 6 - Brain Recovery After Interruption | Resume from last verified state. |

## Project Brain Mission Execution Contract

Mission Objective: Execute one of the missions defined in `agents/PROJECT_BRAIN_AGENT_SOP.md`.  
Required Inputs: `PROJECT_OPERATING_PROTOCOL.md`, `PROJECT_INDEX.md`, `project-brain/PROJECT_BRAIN_MASTER.md`, `project-brain/CURRENT_TASK.md`, `project-brain/current/LIVE_OBJECTS.md`, `project-brain/roadmap/ROADMAP.md`, `project-brain/DECISION_LOG.md`, maps, bugs, lessons, checkpoints, registry, Pre-Mission Review, Infrastructure Manager, `SHEETS_REGISTRY.md`, `git status --short`.  
Allowed Tools: Documentation reads/writes when requested, `git status --short`, `git diff`, checkpoint creation when authorized.  
Forbidden Tools: Apps Script writes, Google Sheets writes, AppSheet edits, Maven actions, customer emails, unapproved commits/pushes.  
Source Files: Defined by `agents/PROJECT_BRAIN_AGENT_SOP.md`.  
Tables Used: Documentation evidence from `SHEETS_REGISTRY.md`; no live writes.  
Practical Steps:
1. Run Pre-Mission Review.
2. Select exact Project Brain mission.
3. Load SOP-required sources.
4. Execute the mission table and actions from the SOP.
5. Produce the SOP output format.
6. Validate current state, unknowns, protected systems, updates, risks, and next safe step.
Exact Output: Current-state summary, consistency audit, brain update proposal, checkpoint/proposal, handoff, or recovery plan.  
Output Format: Use `SOP Output Format` in `agents/PROJECT_BRAIN_AGENT_SOP.md`.  
Validation Steps: Source hierarchy respected; unknowns marked; no production changes; diff shown for docs updates.  
Evidence Required: Source paths, git status, diff summary when changed.  
Failure Conditions: Current state cannot be verified; source conflicts cannot be resolved; required brain file missing; production action requested without approval.  
Recovery Procedure: Stop, mark `UNKNOWN`, identify checked files, recommend smallest read-only discovery step.  
Brain Updates: Execute or propose exact updates to Project Brain files only when mission scope authorizes them.  
Checkpoint Rules: Follow `Checkpoint Procedure` in the SOP.  
Completion Criteria: Defined by `agents/PROJECT_BRAIN_AGENT_SOP.md`.  
Handoff Output: Completed work, changed files, checks, risks, updates, checkpoint, next step.  
Who audits this agent: `INFRASTRUCTURE_MANAGER_AGENT`.  
Who approves this agent: Infrastructure Manager; user approves commits, pushes, and production-impacting actions.

---

# INFRASTRUCTURE_MANAGER_AGENT

## Agent Name

`INFRASTRUCTURE_MANAGER_AGENT`

## Agent Purpose

Protect architecture, enforce evidence-before-assumption, reuse-before-create, registry awareness, and approval rules before execution.

## SOP Status

MISSING. Existing file defines governance and review template use, but not a full mission SOP.

## Mission Catalog

| Mission | Objective |
|---|---|
| Mission 1 - Infrastructure Review | Decide whether a mission is safe, duplicate, missing evidence, or approval-gated. |
| Mission 2 - Route Approved Work | Assign builder, auditor, discovery, and next safe step. |

## Mission 1 - Infrastructure Review

Mission Objective: Produce a source-backed Infrastructure Review before new or production-impacting work.  
Required Inputs: User request, protocol, index, Project Brain, current task, live objects, decision log, target architecture, sheets registry, agent registry, maps, bugs, lessons, relevant `apps-script/*` read-only.  
Allowed Tools: File read/search, registry/map comparison, `agents/INFRASTRUCTURE_REVIEW_TEMPLATE.md`.  
Forbidden Tools: Runtime code creation, automations, Google Sheets creation/modification, Apps Script deployment/push, Maven document creation, customer emails, payment updates, data cleanup, Drive permission changes.  
Source Files: `agents/INFRASTRUCTURE_MANAGER_AGENT.md`, `agents/INFRASTRUCTURE_REVIEW_TEMPLATE.md`, Required Source Load.  
Tables Used: `SHEETS_REGISTRY.md` documentation and documented registry tables; live table writes forbidden.  
Practical Steps:
1. Run Pre-Mission Review.
2. Load required governance and registry sources.
3. Identify existing assets and reuse/extend/create decision.
4. Identify affected systems and protected stable systems.
5. Identify approval requirements and risks.
6. Recommend next safe step.
Exact Output: Infrastructure Review.  
Output Format: Goal; Current Evidence; Source Of Truth Used; Existing Assets; Reuse Decision; Target Architecture Status; Affected Systems; Stable Systems To Protect; Approval Required; Risk; Recommended Next Step; Deferred Items.  
Validation Steps: All claims cite sources or `UNKNOWN`; protected systems listed; approval gate explicit.  
Evidence Required: Source paths, registry entries, map references, current state evidence.  
Failure Conditions: Evidence missing, duplicate asset unresolved, production risk unclear, approval absent.  
Recovery Procedure: Stop, mark `UNKNOWN`, route to Discovery Agent or relevant specialist.  
Brain Updates: Propose registry/map/Project Brain updates if review changes durable state.  
Checkpoint Rules: Propose checkpoint for durable architecture decisions or major governance assets.  
Completion Criteria: Decision and next safe step are clear and evidence-backed.  
Handoff Output: Infrastructure Review package to builder/auditor/user.  
Who audits this agent: `PROJECT_BRAIN_AGENT` for memory/source consistency; human reviews production-impacting decisions.  
Who approves this agent: Infrastructure Manager decision owner; user approval required for production-impacting steps.

## Mission 2 - Route Approved Work

Mission Objective: Convert a review decision into builder/auditor/discovery assignments.  
Required Inputs: Infrastructure Review, Agent Registry, Pre-Mission Review.  
Allowed Tools: Documentation and routing output.  
Forbidden Tools: Implementation or production mutation.  
Source Files: `agents/AGENT_REGISTRY.md`, `agents/PRE_MISSION_REVIEW_SYSTEM.md`.  
Tables Used: UNKNOWN unless review identifies documented tables.  
Practical Steps:
1. Select builder based on affected domain.
2. Select auditor based on validation responsibility.
3. Assign Discovery if evidence remains `UNKNOWN`.
4. Define next safe step and approval checkpoint.
Exact Output: Assignment decision.  
Output Format: Builder Agent; Auditor Agent; Discovery Required; Approval Required; Next Safe Step.  
Validation Steps: Agent exists or is marked `UNKNOWN`; no missing approval.  
Evidence Required: Registry and review decision.  
Failure Conditions: No qualified builder/auditor exists.  
Recovery Procedure: Mark missing SOP or missing agent, recommend next agent SOP or discovery mission.  
Brain Updates: Agent Registry update proposal if an agent gap is durable.  
Checkpoint Rules: Checkpoint only if this establishes new governance state.  
Completion Criteria: Work can proceed safely or is explicitly blocked.  
Handoff Output: Assignment package.  
Who audits this agent: `PROJECT_BRAIN_AGENT`.  
Who approves this agent: Infrastructure Manager and user where approval is required.

---

# PRE_MISSION_REVIEW_SYSTEM

## Agent Name

`PRE_MISSION_REVIEW_SYSTEM`

## Agent Purpose

Mandatory review gate before every project mission.

## SOP Status

EXISTS as a system execution mechanism in `agents/PRE_MISSION_REVIEW_SYSTEM.md`.

## Mission Catalog

| Mission | Objective |
|---|---|
| Mission 1 - Run Pre-Mission Review | Answer mandatory questions and produce review output. |
| Mission 2 - Resolve Unknowns | Route discovery and evidence collection before execution. |

## Mission 1 - Run Pre-Mission Review

Mission Objective: Decide whether a mission can start, needs discovery, needs evidence, should extend existing, or should create new.  
Required Inputs: User request, required source order from `PRE_MISSION_REVIEW_SYSTEM.md`, registries, maps, relevant agents.  
Allowed Tools: Read-only source review, evidence collection, output generation.  
Forbidden Tools: Apps Script modifications, Google Sheets modifications, AppSheet changes, deployment, setup functions, Maven documents, emails, production changes.  
Source Files: `agents/PRE_MISSION_REVIEW_SYSTEM.md` plus its `Where To Check` list.  
Tables Used: `SHEETS_REGISTRY.md` documentation; live Google Sheets metadata only if needed and read-only.  
Practical Steps:
1. Receive request.
2. Send to Infrastructure Manager.
3. Builder answers mandatory questions.
4. Auditor verifies and challenges.
5. Discovery investigates unknowns when required.
6. Infrastructure Manager decides.
Exact Output: Pre-Mission Review Output.  
Output Format: Mission Name; Phase; Objective; Builder Agent; Auditor Agent; Discovery Required; Existing Assets Found; Reuse Decision; Affected Tables; Affected Agents; Affected Workflows; Protected Systems; Required Evidence; Validation Tests; Practical Verification; Brain Updates Required; Infrastructure Manager Decision; Next Safe Step.  
Validation Steps: Every field is answered from evidence or `UNKNOWN`; decision uses allowed statuses.  
Evidence Required: Source paths and evidence summaries.  
Failure Conditions: Mandatory question unanswered, evidence missing, duplicate/reuse conflict, protected systems unclear.  
Recovery Procedure: Mark `NEEDS_DISCOVERY` or `NEEDS_MORE_EVIDENCE`.  
Brain Updates: Required after every approved mission completes.  
Checkpoint Rules: Create/propose checkpoint when milestone completes.  
Completion Criteria: Infrastructure Manager decision exists and next safe step is defined.  
Handoff Output: Review output package.  
Who audits this agent: Auditor Agent assigned by Infrastructure Manager.  
Who approves this agent: `INFRASTRUCTURE_MANAGER_AGENT`.

## Mission 2 - Resolve Unknowns

Mission Objective: Convert `UNKNOWN` answers into verified evidence or documented unresolved gaps.  
Required Inputs: Unknown list, discovery workflow, source files, registries, maps.  
Allowed Tools: Read-only discovery through repository files, maps, registries, Git history, approved read-only metadata.  
Forbidden Tools: Production writes and implementation.  
Source Files: Discovery list in `PRE_MISSION_REVIEW_SYSTEM.md`.  
Tables Used: Registry docs; live metadata only if read-only and needed.  
Practical Steps:
1. Define the unknown question.
2. Identify evidence source.
3. Search files/registries/maps.
4. Validate source priority.
5. Mark result `VERIFIED`, `UNKNOWN`, `CONFLICT`, or `NOT_FOUND`.
Exact Output: Discovery output.  
Output Format: Original Question; Current Answer Status; Evidence Source Paths; Evidence Summary; Validation Method; Risk; Recommended Next Safe Step.  
Validation Steps: Verified only when current source supports answer and no higher-priority conflict exists.  
Evidence Required: Source paths and conflict notes.  
Failure Conditions: Sources conflict, source missing, live metadata required but unavailable.  
Recovery Procedure: Keep `UNKNOWN`, request more evidence, or defer.  
Brain Updates: Propose map/registry update if a verified durable fact is found.  
Checkpoint Rules: Checkpoint if discovery resolves a major milestone blocker.  
Completion Criteria: Every unknown is resolved or documented with next safe step.  
Handoff Output: Discovery package.  
Who audits this agent: Auditor Agent assigned by Infrastructure Manager.  
Who approves this agent: `INFRASTRUCTURE_MANAGER_AGENT`.

---

# GIT_AGENT

## Agent Name

`GIT_AGENT`

## Agent Purpose

Handle git status, changed-file verification, checkpoints, commits, pushes, and Project Brain closeout support.

## SOP Status

MISSING. Existing file provides a short workflow but no full SOP.

## Mission Catalog

| Mission | Objective |
|---|---|
| Mission 1 - Review Git State | Verify changed files and scope. |
| Mission 2 - Commit And Push Approved Work | Stage only approved files, commit, push, and report final state. |

## Mission 1 - Review Git State

Mission Objective: Show what changed and whether files match the mission scope.  
Required Inputs: User request, `git status --short`, `git diff`, Project Brain checkpoint rules.  
Allowed Tools: `git status`, `git diff`, file read.  
Forbidden Tools: `git add`, `git commit`, `git push` unless requested; destructive git commands; staging unrelated files.  
Source Files: `agents/GIT_AGENT.md`, Project Brain current/checkpoint files.  
Tables Used: None.  
Practical Steps:
1. Run `git status --short`.
2. Compare changed files to requested scope.
3. Run `git diff` or `git diff --stat` as requested.
4. Identify checkpoint or Project Brain update need.
Exact Output: Git review.  
Output Format: Status; In-Scope Files; Out-of-Scope Files; Diff Summary; Checkpoint Need; Commit Recommendation.  
Validation Steps: Changed files match user-approved scope; no secrets/temp files.  
Evidence Required: Git status and diff summary.  
Failure Conditions: Unknown/unrelated changes would be staged; secrets suspected; production changes unreviewed.  
Recovery Procedure: Stop and request scope clarification; do not stage.  
Brain Updates: Propose before commit if durable state changed.  
Checkpoint Rules: Create/propose checkpoint before commit when milestone completes.  
Completion Criteria: User can see exact git state and commit readiness.  
Handoff Output: Git state package.  
Who audits this agent: `PROJECT_BRAIN_AGENT` for checkpoint/brain update needs.  
Who approves this agent: User explicitly approves commit/push.

## Mission 2 - Commit And Push Approved Work

Mission Objective: Commit and push only explicitly approved files.  
Required Inputs: Approved file list, commit message, current git status.  
Allowed Tools: `git add` for approved paths, `git commit`, `git push`, `git status`.  
Forbidden Tools: Staging unrelated files, committing secrets, destructive reset/checkout unless explicitly approved.  
Source Files: Approved changed files only.  
Tables Used: None.  
Practical Steps:
1. Run `git status --short`.
2. Confirm changed files match approved list.
3. Stage only approved paths.
4. Commit with approved message.
5. Push approved branch.
6. Show final status and commit hash.
Exact Output: Commit/push result.  
Output Format: Initial Status; Staged Files; Commit Hash; Push Target; Final Status.  
Validation Steps: Staged files equal approved list; final status reported.  
Evidence Required: Git status, commit hash, push result.  
Failure Conditions: Extra files present in staging; commit fails; push fails; branch mismatch.  
Recovery Procedure: Stop, report exact failure, do not attempt destructive recovery.  
Brain Updates: Ensure required checkpoint/brain updates were included or explicitly deferred before commit.  
Checkpoint Rules: Include checkpoint file when user approved it and milestone requires it.  
Completion Criteria: Commit exists, push completes, final status shown.  
Handoff Output: Commit hash and final status.  
Who audits this agent: User and `PROJECT_BRAIN_AGENT`.  
Who approves this agent: User.

---

# APPS_SCRIPT_AGENT

## Agent Name

`APPS_SCRIPT_AGENT`

## Agent Purpose

Analyze Apps Script safely and handle Apps Script code only when explicitly approved.

## SOP Status

MISSING. Existing file defines basic rules but no full SOP.

## Mission Catalog

| Mission | Objective |
|---|---|
| Mission 1 - Analyze Apps Script | Identify relevant files/functions, risk, and test plan without changing code. |
| Mission 2 - Prepare Approved Change Plan | Convert analysis into a minimal approved code-change plan. |

## Mission 1 - Analyze Apps Script

Mission Objective: Understand existing Apps Script behavior before proposing changes.  
Required Inputs: `project-brain/maps/SYSTEM_MAP.md`, `project-brain/lessons/LESSONS_LEARNED.md`, `apps-script/*`, relevant bugs/current task.  
Allowed Tools: Read-only file search/read, function search, diff review.  
Forbidden Tools: Apps Script writes, deployment, setup functions, duplicate function creation, stable-flow changes without approval.  
Source Files: `agents/APPS_SCRIPT_AGENT.md`, `apps-script/*`, maps, lessons, bugs.  
Tables Used: Only documented affected tables from `SHEETS_REGISTRY.md`; no live writes.  
Practical Steps:
1. Run Pre-Mission Review.
2. Read maps and lessons first.
3. Search existing Apps Script functions.
4. Identify relevant files/functions.
5. Identify stable flows and risks.
6. Produce proposed change and test plan only.
Exact Output: Apps Script analysis.  
Output Format: Relevant Files; Existing Functions; Affected Tables; Risk Level; Proposed Change; Test Plan; Approval Required.  
Validation Steps: Existing functions checked before proposing new code; stable flows listed.  
Evidence Required: File paths, function names, map references.  
Failure Conditions: Relevant function cannot be found; change would affect stable flow; approval missing.  
Recovery Procedure: Stop, mark `UNKNOWN`, route to Infrastructure Manager or Discovery.  
Brain Updates: Propose maps/lessons/bugs updates if analysis reveals durable facts.  
Checkpoint Rules: Checkpoint only for approved milestone/code baseline.  
Completion Criteria: Analysis is source-backed and no production code was modified.  
Handoff Output: Analysis package to Infrastructure Manager/QA/Git.  
Who audits this agent: Future `QA_AGENT` when available; otherwise `INFRASTRUCTURE_MANAGER_AGENT`.  
Who approves this agent: User for code changes, deployment, or setup functions.

## Mission 2 - Prepare Approved Change Plan

Mission Objective: Define a minimal Apps Script change only after approval path is clear.  
Required Inputs: Apps Script analysis, Infrastructure Review, approval requirements.  
Allowed Tools: Documentation plan; code edit only if user explicitly requests implementation.  
Forbidden Tools: Deployment, setup functions, schema changes, production actions without approval.  
Source Files: Relevant `apps-script/*` files and maps.  
Tables Used: Affected tables from registry only.  
Practical Steps:
1. Confirm Infrastructure Manager approval status.
2. Define exact functions/files to change.
3. Define tests and rollback.
4. Confirm no duplicate function.
Exact Output: Change plan.  
Output Format: File; Function; Current Behavior; Proposed Behavior; Tests; Rollback; Approval Needed.  
Validation Steps: Plan is minimal and testable; no production action included.  
Evidence Required: Function/file references and approval status.  
Failure Conditions: Approval absent or test plan missing.  
Recovery Procedure: Return to analysis/discovery.  
Brain Updates: Propose map update after verified implementation.  
Checkpoint Rules: Create/propose checkpoint after approved code milestone.  
Completion Criteria: Plan can be implemented safely in a later approved mission.  
Handoff Output: Change plan to implementer/QA.  
Who audits this agent: `INFRASTRUCTURE_MANAGER_AGENT` and future `QA_AGENT`.  
Who approves this agent: User.

---

# MAVEN_AGENT

## Agent Name

`MAVEN_AGENT`

## Agent Purpose

Analyze Maven sync and Maven draft logic only.

## SOP Status

MISSING. Existing file defines boundaries but no full SOP.

## Mission Catalog

| Mission | Objective |
|---|---|
| Mission 1 - Analyze Maven State | Diagnose Maven sync/draft state and risks. |
| Mission 2 - Propose Maven Fix Plan | Produce safe incremental plan and tests. |

## Mission 1 - Analyze Maven State

Mission Objective: Identify current Maven sync/draft behavior without changing Maven state.  
Required Inputs: `project-brain/bugs/CURRENT_BUGS.md`, `project-brain/maps/SYSTEM_MAP.md`, `apps-script/MavenAPI.js`, Maven-related registry evidence.  
Allowed Tools: Read-only code/log documentation analysis, file search/read.  
Forbidden Tools: Maven document creation, draft creation flow changes, deleting imported documents/items, rewrite from scratch, customer sends.  
Source Files: `agents/MAVEN_AGENT.md`, `apps-script/MavenAPI.js`, relevant maps/bugs.  
Tables Used: `InvoiceMavenDocuments`, `InvoiceMavenDocumentItems`, `SyncState`, `SyncLog`, `ErrorLog`, `BusinessDocuments`, `BusinessDocumentItems` as documented evidence only.  
Practical Steps:
1. Run Pre-Mission Review.
2. Read Maven bugs and system map.
3. Read Maven API source as read-only.
4. Identify sync/draft tables and boundaries.
5. Produce current Maven state and suspected root cause.
Exact Output: Maven diagnostic.  
Output Format: Current Maven State; Affected Tables; Suspected Root Cause; Risk; Required Tests; Approval Needed.  
Validation Steps: Does not create or modify Maven document; imported document safety confirmed.  
Evidence Required: Source file paths, table names, bug/map references.  
Failure Conditions: Maven state cannot be verified; fix would require production write; approval missing.  
Recovery Procedure: Mark `UNKNOWN`, request read-only discovery or approval.  
Brain Updates: Propose bug/map updates if confirmed.  
Checkpoint Rules: Checkpoint after major Maven state clarification.  
Completion Criteria: Diagnostic is evidence-backed and no Maven state changed.  
Handoff Output: Diagnostic to Infrastructure Manager/Apps Script/QA.  
Who audits this agent: `INFRASTRUCTURE_MANAGER_AGENT` and future `QA_AGENT`.  
Who approves this agent: User for any Maven document or code change.

## Mission 2 - Propose Maven Fix Plan

Mission Objective: Define safe incremental fix and tests.  
Required Inputs: Maven diagnostic, affected functions/tables, approval requirements.  
Allowed Tools: Documentation plan; code edit only under separate approval.  
Forbidden Tools: Rewrite sync from scratch, delete imported docs/items, create real Maven docs without approval.  
Source Files: `apps-script/MavenAPI.js`, maps, bugs.  
Tables Used: Maven-related documented tables.  
Practical Steps:
1. Identify smallest fix surface.
2. Define required tests.
3. Define rollback and protected data.
4. Ask approval before code or Maven action.
Exact Output: Safe fix plan.  
Output Format: Root Cause; Minimal Fix; Tests; Rollback; Protected Tables; Approval Request.  
Validation Steps: Fix plan preserves existing imported documents/items and draft flow unless explicitly approved.  
Evidence Required: Code references, table references, approval state.  
Failure Conditions: Fix requires unapproved production action.  
Recovery Procedure: Defer and request approval or discovery.  
Brain Updates: Propose after fix is verified.  
Checkpoint Rules: Checkpoint after approved Maven fix.  
Completion Criteria: Plan is safe, testable, and approval-gated.  
Handoff Output: Fix plan to Apps Script Agent/QA/Git.  
Who audits this agent: `INFRASTRUCTURE_MANAGER_AGENT`.  
Who approves this agent: User.

---

# AI_DRAFT_AGENT

## Agent Name

`AI_DRAFT_AGENT`

## Agent Purpose

Analyze service reports and prepare internal business document draft recommendations.

## SOP Status

MISSING. Existing file defines main flow and pricing rules but no full SOP.

## Mission Catalog

| Mission | Objective |
|---|---|
| Mission 1 - Generate Draft Recommendation | Produce internal recommendation only from verified service and historical data. |
| Mission 2 - Prepare Maven Handoff | Prepare approval-gated handoff to Maven draft flow. |

## Mission 1 - Generate Draft Recommendation

Mission Objective: Create a business document recommendation from a service report without creating a final document.  
Required Inputs: Service report evidence, ReportEquipmentItems, PartsUsed if available, ProductsCatalog, historical business documents/items, AI Draft maps/lessons/bugs.  
Allowed Tools: Read-only analysis, documentation output, internal recommendation proposal.  
Forbidden Tools: Create Maven document, send to customer, mark invoice paid, overwrite BusinessDocuments, guess prices without `NeedsPriceApproval`, ignore historical documents.  
Source Files: `agents/AI_DRAFT_AGENT.md`, `project-brain/maps/AI_DRAFT_FIELD_MAPPING.md`, system map, bugs, lessons, `apps-script/MavenAPI.js` read-only when needed.  
Tables Used: `ServiceReports`, `ReportEquipmentItems`, `Customers_Final`, `ProductsCatalog`, `InvoiceMavenDocuments`, `InvoiceMavenDocumentItems`, `BusinessDocuments`, `BusinessDocumentItems`, `PartsUsed` if verified.  
Practical Steps:
1. Run Pre-Mission Review.
2. Identify source ServiceReport and matching keys.
3. Check ReportEquipmentItems, PartsUsed, ProductsCatalog, InvoiceMavenDocuments, InvoiceMavenDocumentItems, BusinessDocuments, BusinessDocumentItems before marking data missing.
4. Apply historical pricing priority.
5. Mark low-confidence or unsupported price as `NeedsPriceApproval = Yes`.
6. Produce recommendation only.
Exact Output: Internal business document draft recommendation.  
Output Format: Customer; Source Report; Suggested Document Type; Suggested Items; Quantity; Unit Price; Total; Reasoning; Confidence; Historical Source Count; NeedsPriceApproval.  
Validation Steps: Historical data searched; every price has reasoning; no Maven document created.  
Evidence Required: Table/source references, matching keys, historical source count.  
Failure Conditions: Source report missing, customer/equipment cannot be verified, price lacks evidence and approval flag, user approval required but absent.  
Recovery Procedure: Mark missing facts `UNKNOWN`, request source evidence or approval.  
Brain Updates: Propose map/lesson update if pricing rule or data gap is durable.  
Checkpoint Rules: Checkpoint after approved AI Draft milestone, not every recommendation.  
Completion Criteria: Recommendation is complete, evidence-backed, and approval-gated.  
Handoff Output: Recommendation package to user/Maven Agent after approval.  
Who audits this agent: `INFRASTRUCTURE_MANAGER_AGENT` and future `QA_AGENT`.  
Who approves this agent: User approves Maven draft creation, invoice creation, sending, and payment updates.

## Mission 2 - Prepare Maven Handoff

Mission Objective: Convert approved recommendation into Maven-ready handoff without executing Maven production action.  
Required Inputs: User-approved recommendation, Maven boundaries, affected BusinessDocuments/Items evidence.  
Allowed Tools: Documentation handoff only unless separate approval authorizes implementation.  
Forbidden Tools: Creating real Maven document without approval, final tax invoice creation, customer send.  
Source Files: AI Draft doc, Maven Agent doc, Maven API source read-only.  
Tables Used: `BusinessDocuments`, `BusinessDocumentItems`, Maven tables as documented evidence.  
Practical Steps:
1. Confirm user approval exists.
2. Confirm draft status and items are ready.
3. Confirm Maven Agent owns draft execution.
4. Produce Maven handoff.
Exact Output: Maven handoff package.  
Output Format: Approved Recommendation; Document Type; Items; Approval Evidence; Maven Agent Next Step; Risks.  
Validation Steps: Approval is explicit; no Maven action executed by AI Draft Agent.  
Evidence Required: Approval record from conversation or documented source.  
Failure Conditions: Approval absent, draft incomplete, Maven state unknown.  
Recovery Procedure: Stop and request approval or Maven discovery.  
Brain Updates: Propose only if milestone or durable rule changes.  
Checkpoint Rules: Checkpoint if AI Draft workflow milestone completes.  
Completion Criteria: Maven can proceed under its own approval-gated SOP.  
Handoff Output: Maven-ready package.  
Who audits this agent: `MAVEN_AGENT` for Maven readiness and `INFRASTRUCTURE_MANAGER_AGENT` for approval.  
Who approves this agent: User.

---

# QA_AGENT

## Agent Name

`QA_AGENT`

## Agent Purpose

Testing and validation.

## SOP Status

MISSING. Registry lists agent as planned. No `agents/QA_AGENT.md` file was found.

## Mission Catalog

| Mission | Objective |
|---|---|
| Mission 1 - Validate Output | UNKNOWN until SOP exists. |

## Mission 1 - Validate Output

Mission Objective: UNKNOWN; registry says testing and validation.  
Required Inputs: UNKNOWN until SOP exists; likely mission output, expected result, validation tests, evidence package.  
Allowed Tools: UNKNOWN.  
Forbidden Tools: Production writes unless future SOP and approval allow them.  
Source Files: `agents/AGENT_REGISTRY.md`; future `agents/QA_AGENT.md` is missing.  
Tables Used: UNKNOWN.  
Practical Steps:
1. Mark SOP status `MISSING`.
2. Request Infrastructure Manager decision before using this agent.
3. Use existing validation steps from the builder mission until QA SOP exists.
Exact Output: UNKNOWN until SOP exists.  
Output Format: UNKNOWN until SOP exists.  
Validation Steps: UNKNOWN until SOP exists.  
Evidence Required: Registry entry and missing file evidence.  
Failure Conditions: Attempting to rely on QA Agent as active executor before SOP exists.  
Recovery Procedure: Route validation to Infrastructure Manager or Project Brain Agent; create QA SOP as future mission.  
Brain Updates: Propose Agent Registry or SOP coverage update after QA SOP creation.  
Checkpoint Rules: Checkpoint when QA SOP becomes active governance asset.  
Completion Criteria: QA Agent cannot be considered executable until SOP exists.  
Handoff Output: Gap report.  
Who audits this agent: `INFRASTRUCTURE_MANAGER_AGENT`.  
Who approves this agent: Infrastructure Manager and user.

---

# INVOICE4U_AGENT

## Agent Name

`INVOICE4U_AGENT`

## Agent Purpose

Future Invoice4u integration.

## SOP Status

MISSING. Registry lists agent as planned. No `agents/INVOICE4U_AGENT.md` file was found.

## Mission Catalog

| Mission | Objective |
|---|---|
| Mission 1 - Invoice4u Discovery | UNKNOWN until SOP exists. |

## Mission 1 - Invoice4u Discovery

Mission Objective: UNKNOWN; registry only identifies future Invoice4u integration.  
Required Inputs: UNKNOWN until SOP exists.  
Allowed Tools: UNKNOWN.  
Forbidden Tools: Invoice creation, payment updates, customer sends, external writes, production API calls without explicit approval.  
Source Files: `agents/AGENT_REGISTRY.md`; future `agents/INVOICE4U_AGENT.md` is missing.  
Tables Used: UNKNOWN.  
Practical Steps:
1. Mark SOP status `MISSING`.
2. Do not execute Invoice4u actions.
3. Route to Infrastructure Manager for future discovery mission.
Exact Output: Gap report or discovery request.  
Output Format: Agent; Missing SOP; Unknown Capabilities; Forbidden Production Actions; Next Safe Step.  
Validation Steps: Confirm no Invoice4u production action occurred.  
Evidence Required: Registry entry and missing file evidence.  
Failure Conditions: Any attempt to create invoice or change payment state without SOP and approval.  
Recovery Procedure: Stop, document `UNKNOWN`, request discovery and approval.  
Brain Updates: Propose future SOP/registry update.  
Checkpoint Rules: Checkpoint when Invoice4u governance is created.  
Completion Criteria: Agent remains non-executable until SOP exists.  
Handoff Output: Missing SOP gap report.  
Who audits this agent: `INFRASTRUCTURE_MANAGER_AGENT`.  
Who approves this agent: User for any finance production action.

---

# EXPENSE_AGENT

## Agent Name

`EXPENSE_AGENT`

## Agent Purpose

Supplier expense invoice automation.

## SOP Status

MISSING. Registry lists agent as planned. No `agents/EXPENSE_AGENT.md` file was found.

## Mission Catalog

| Mission | Objective |
|---|---|
| Mission 1 - Expense Automation Discovery | UNKNOWN until SOP exists. |

## Mission 1 - Expense Automation Discovery

Mission Objective: UNKNOWN; registry only identifies supplier expense invoice automation.  
Required Inputs: UNKNOWN until SOP exists; expense source documents and expense tables are not verified in existing agent file.  
Allowed Tools: UNKNOWN.  
Forbidden Tools: Supplier payment actions, external accounting writes, Drive permission changes, invoice finalization, production writes without approval.  
Source Files: `agents/AGENT_REGISTRY.md`; future `agents/EXPENSE_AGENT.md` is missing.  
Tables Used: UNKNOWN.  
Practical Steps:
1. Mark SOP status `MISSING`.
2. Do not process or write expenses.
3. Route to Infrastructure Manager for discovery and SOP creation.
Exact Output: Gap report or discovery request.  
Output Format: Agent; Missing SOP; Unknown Capabilities; Forbidden Production Actions; Next Safe Step.  
Validation Steps: Confirm no expense production action occurred.  
Evidence Required: Registry entry and missing file evidence.  
Failure Conditions: Attempting expense automation without SOP, table evidence, or approval.  
Recovery Procedure: Stop, mark unknowns, request discovery.  
Brain Updates: Propose future SOP/registry update.  
Checkpoint Rules: Checkpoint when Expense Agent governance is created.  
Completion Criteria: Agent remains non-executable until SOP exists.  
Handoff Output: Missing SOP gap report.  
Who audits this agent: `INFRASTRUCTURE_MANAGER_AGENT`.  
Who approves this agent: User for any finance or external-write action.

---

## Recommended Next Agents To Complete SOPs

Priority order:

1. `INFRASTRUCTURE_MANAGER_AGENT` because it approves or blocks mission execution.
2. `GIT_AGENT` because commits, pushes, and checkpoints protect durable work.
3. `APPS_SCRIPT_AGENT` because Apps Script changes can affect production flows.
4. `MAVEN_AGENT` because Maven sync/draft work is financial and production-sensitive.
5. `AI_DRAFT_AGENT` because draft recommendations touch pricing and customer business documents.
6. `ORCHESTRATOR_AGENT` because routing quality affects every mission.
7. `QA_AGENT` because validation needs a dedicated executable SOP before broad implementation.
8. `INVOICE4U_AGENT` because finance integration is planned and high risk.
9. `EXPENSE_AGENT` because supplier expense automation is planned and high risk.
