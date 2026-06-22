# PRE-MISSION REVIEW SYSTEM

## Role

Pre-Mission Review is mandatory before every project mission.

Its role is to stop execution until the project has a clear, evidence-based answer to:

- what the mission is trying to achieve
- whether the project already has a similar file, table, agent, workflow, or production system
- whether existing assets should be reused, extended, replaced, or left untouched
- which systems may be affected
- which agent builds
- which agent audits
- what evidence and validation are required
- what Project Brain updates are required after completion

Pre-Mission Review is a documentation and governance gate only. It does not modify production systems or execute implementation work.

## Flow

```text
User Request
-> Infrastructure Manager
-> Builder Agent Analysis
-> Auditor Agent Review
-> Discovery Agent if unknowns exist
-> Infrastructure Manager Decision
-> Mission Approved / Rejected / Needs More Evidence
```

## Mandatory Questions

Every Pre-Mission Review must answer:

- What is the mission objective?
- Which phase does it belong to?
- Which project goal does it advance?
- Does an existing file/table/agent/workflow already solve part of it?
- Should we reuse, extend, replace, or create new?
- Which tables are affected?
- Which agents are affected?
- Which workflows are affected?
- Which production systems are protected?
- What evidence is required?
- What validation test proves the output is correct?
- What practical test proves the mission achieved its objective?
- What Project Brain updates are required?

## Who Answers

- Builder Agent answers first.
- Auditor Agent challenges and verifies.
- Discovery Agent investigates UNKNOWN items.
- Infrastructure Manager decides.

## Where To Check

Use this order:

1. `PROJECT_OPERATING_PROTOCOL.md`
2. `PROJECT_INDEX.md`
3. `project-brain/CURRENT_TASK.md`
4. `project-brain/roadmap/ROADMAP.md`
5. `project-brain/PROJECT_BRAIN_MASTER.md`
6. `agents/INFRASTRUCTURE_MANAGER_AGENT.md`
7. `agents/AGENT_REGISTRY.md`
8. `data-sources/tools/SHEETS_REGISTRY.md`
9. `project-brain/maps/*`
10. `apps-script/*`
11. Git history
12. Google Sheets live metadata only if needed and read-only
13. AppSheet manual/exported evidence only if available

## Decision Statuses

Allowed decision statuses:

- `APPROVED`
- `REJECTED`
- `NEEDS_DISCOVERY`
- `NEEDS_MORE_EVIDENCE`
- `DEFERRED`
- `EXTEND_EXISTING`
- `CREATE_NEW`

## Discovery Workflow

Discovery converts unknown answers into verified answers or documented `UNKNOWN` results.

```text
Question
-> Evidence Source
-> Validation Method
-> Result
```

For every `UNKNOWN` answer:

| Item | Requirement |
|---|---|
| Who investigates | Discovery Agent, routed by Infrastructure Manager. If no specialist exists, Infrastructure Manager assigns the closest active specialist from `agents/AGENT_REGISTRY.md`. |
| Where they investigate | Source-of-truth files first, then registries, maps, read-only runtime source, Git history, and only then read-only live metadata if approved or already available. |
| Files searched | `PROJECT_OPERATING_PROTOCOL.md`, `PROJECT_INDEX.md`, `project-brain/CURRENT_TASK.md`, `project-brain/roadmap/ROADMAP.md`, `project-brain/PROJECT_BRAIN_MASTER.md`, `project-brain/current/LIVE_OBJECTS.md`, `project-brain/DECISION_LOG.md`, `project-brain/maps/*`, `data-sources/tools/SHEETS_REGISTRY.md`, relevant `agents/*`, relevant `apps-script/*`. |
| Registries checked | `agents/AGENT_REGISTRY.md`, `data-sources/tools/SHEETS_REGISTRY.md`, documented live registry tables `AutomationRegistry`, `HealthCheckRegistry`, and `SystemHealthLog` when read-only metadata is available. |
| Maps checked | `project-brain/maps/SYSTEM_MAP.md`, `project-brain/maps/APPSHEET_MAP.md`, `project-brain/maps/APPS_SCRIPT_MAP.md`, `project-brain/maps/AI_DRAFT_FIELD_MAPPING.md`, and any relevant future map under `project-brain/maps/*`. |
| When result becomes VERIFIED | A result is `VERIFIED` only when the answer is supported by at least one current source-of-truth file and is not contradicted by a higher-priority source. If sources conflict, the result stays `UNKNOWN` or becomes `NEEDS_MORE_EVIDENCE`. |

Discovery output must include:

- original question
- current answer status: `VERIFIED`, `UNKNOWN`, `CONFLICT`, or `NOT_FOUND`
- evidence source paths
- exact evidence summary
- validation method used
- risk if the answer remains unresolved
- recommended next safe step

Discovery must not modify Apps Script, Google Sheets, AppSheet, Maven, Drive, production data, or setup state.

## Builder Workflow

```text
Read Sources
-> Collect Evidence
-> Answer Questions
-> Generate Proposal
-> Submit To Auditor
```

| Step | Inputs | Actions | Outputs | Evidence Produced |
|---|---|---|---|---|
| Read Sources | User request; required read-order files; relevant agent files; registries; maps. | Read the current governance, roadmap, current task, Project Brain, registry, maps, and relevant source files before proposing work. | Source list and current-state summary. | File paths read, source priority used, current phase, current task, protected systems. |
| Collect Evidence | Source list; mandatory questions; affected area. | Extract table, agent, workflow, phase, goal, protected-system, and reuse evidence. Mark missing facts `UNKNOWN`. | Evidence inventory. | Path-specific evidence, registry entries, map references, Apps Script file references if read-only source was checked. |
| Answer Questions | Mandatory questions; evidence inventory. | Answer every mandatory question from evidence. Do not infer IDs, schema, AppSheet behavior, deployment status, or approvals without evidence. | Completed Builder answers. | Each answer cites source file or says `UNKNOWN`. |
| Generate Proposal | Builder answers; reuse rule; protected-system list. | Propose `Reuse Existing`, `Extend Existing`, `Replace Existing`, or `Create New`; identify builder agent, auditor agent, validation, practical verification, and brain updates. | Builder proposal. | Reuse rationale, affected systems, required evidence, validation test, practical test. |
| Submit To Auditor | Builder proposal; evidence inventory. | Send full proposal and cited evidence to Auditor Agent for challenge. | Audit-ready package. | Traceable source list and unanswered unknowns. |

Builder Agent must prefer reuse or extension. Creating new assets requires a clear reason, a protected-system review, and Infrastructure Manager decision.

## Auditor Workflow

```text
Read Proposal
-> Verify Evidence
-> Challenge Assumptions
-> Search For Duplicates
-> Search For Contradictions
-> Generate Findings
```

| Step | Inputs | Actions | Outputs | Evidence Produced |
|---|---|---|---|---|
| Read Proposal | Builder proposal; mandatory question answers; cited evidence. | Confirm every required field is present and every claim has a source or `UNKNOWN`. | Completeness check. | Missing-field list, uncited-claim list. |
| Verify Evidence | Builder citations; source-of-truth hierarchy. | Re-read cited files and confirm the Builder represented them accurately. | Evidence verification result. | Verified citations, misread citations, stale-source flags. |
| Challenge Assumptions | Builder conclusions; current governance rules. | Identify inferred IDs, unapproved production assumptions, hidden write actions, missing approval gates, and future-only work. | Assumption challenge list. | Unsupported claims, approval requirements, risk notes. |
| Search For Duplicates | Proposed asset names; registries; maps; Project Brain; Git history when needed. | Check whether existing files, tables, agents, workflows, scripts, registries, or maps already solve the need. | Duplicate/reuse findings. | Existing asset list, reuse or extension recommendation. |
| Search For Contradictions | Proposal; source hierarchy; maps; current task; roadmap. | Compare Builder answer against higher-priority sources and stable-system rules. | Contradiction findings. | Conflicting source paths, higher-priority source used, unresolved conflicts. |
| Generate Findings | Verification results; challenge list; duplicate findings; contradictions. | Produce audit decision recommendation for Infrastructure Manager. | Auditor findings. | Pass/fail status, blockers, required discovery, required evidence, recommended decision. |

Auditor Agent does not approve the mission. Auditor Agent only verifies, challenges, and recommends.

## Infrastructure Decision Workflow

```text
Read Builder Output
-> Read Auditor Output
-> Review Evidence
-> Review Risks
-> Decision
```

| Step | Inputs | Actions | Outputs |
|---|---|---|---|
| Read Builder Output | Builder proposal and evidence inventory. | Confirm objective, phase, project goal, affected systems, reuse decision, validation, practical verification, and brain updates. | Builder readiness status. |
| Read Auditor Output | Auditor findings and evidence challenges. | Identify blockers, unsupported assumptions, duplicate assets, conflicts, and missing approvals. | Audit readiness status. |
| Review Evidence | Source paths, registries, maps, Git history if used, live metadata if used read-only. | Confirm evidence is current, source-prioritized, and enough to make a decision. | Evidence sufficiency status. |
| Review Risks | Protected systems, stable flows, production systems, approval rules, rollback needs. | Classify risk and determine whether mission can proceed safely. | Risk status and required safeguards. |
| Decision | Builder status, Auditor status, evidence status, risk status. | Select one or more allowed decisions and define the next safe step. | Infrastructure Manager decision. |

Possible decisions:

- `APPROVED`: Evidence is sufficient, risks are understood, protected systems are safe, and execution can start.
- `REJECTED`: Mission conflicts with governance, duplicates existing assets without justification, or creates unacceptable risk.
- `NEEDS_DISCOVERY`: Required facts are `UNKNOWN` and can be investigated safely.
- `NEEDS_MORE_EVIDENCE`: Evidence exists but is incomplete, stale, conflicted, or not source-prioritized.
- `DEFERRED`: Mission may be valid but does not match current phase, priority, or approval state.
- `EXTEND_EXISTING`: Mission should proceed only by extending an existing asset.
- `CREATE_NEW`: Mission may create a new asset only after evidence proves no existing asset should be reused or extended.

Infrastructure Manager must define the next safe step and must not perform implementation work as part of the decision.

## Mission Review Registry

The Mission Review Registry is a documentation design for tracking Pre-Mission Reviews. Do not create a Google Sheet unless separately approved.

| Field | Purpose | Owner | Consumers |
|---|---|---|---|
| `ReviewId` | Unique identifier for the review record. Use `UNKNOWN` until an approved registry location and ID pattern exist. | Infrastructure Manager | Infrastructure Manager, Project Brain Agent, Git Agent |
| `Date` | Date the review was performed. | Infrastructure Manager | Project Brain Agent, roadmap/checkpoint readers |
| `MissionName` | Human-readable name of the requested mission. | Builder Agent | Auditor Agent, Infrastructure Manager, Project Brain Agent |
| `Phase` | Current or target project phase, sourced from roadmap/current task. | Builder Agent | Auditor Agent, Infrastructure Manager |
| `BuilderAgent` | Agent responsible for producing the implementation proposal. | Infrastructure Manager | Builder Agent, Auditor Agent |
| `AuditorAgent` | Agent responsible for independent review. | Infrastructure Manager | Auditor Agent, Infrastructure Manager |
| `DiscoveryRequired` | Whether unknowns require read-only investigation before decision. | Auditor Agent | Discovery Agent, Infrastructure Manager |
| `EvidenceCount` | Count of distinct evidence items cited in the review. | Builder Agent, verified by Auditor Agent | Infrastructure Manager, KPI reporting |
| `Decision` | Final Infrastructure Manager decision status. | Infrastructure Manager | All agents, Project Brain Agent |
| `Status` | Review lifecycle state, such as `DRAFT`, `IN_AUDIT`, `DISCOVERY`, `DECIDED`, or `CLOSED`. | Infrastructure Manager | Builder Agent, Auditor Agent, Git Agent |
| `ApprovedBy` | Human approver when human approval is required. Use `UNKNOWN` until explicit approval exists. | Infrastructure Manager | Git Agent, Project Brain Agent, implementation agents |
| `CheckpointReference` | Related checkpoint file or `UNKNOWN` if no checkpoint exists. | Git Agent or Project Brain Agent | Infrastructure Manager, future audits |

Usage is measured from this registry design by counting reviews, decisions, evidence items, discovery loops, duplicate prevention cases, and mission outcomes.

## Evidence Sources

Every answer must identify the question, evidence source, and validation method.

| Question Type | Evidence Source | Validation Method |
|---|---|---|
| What is the current phase? | `PROJECT_INDEX.md`, `project-brain/CURRENT_TASK.md`, `project-brain/roadmap/ROADMAP.md`, `project-brain/PROJECT_BRAIN_MASTER.md`. | Confirm the same phase appears in current-task and roadmap sources. If conflict exists, follow source-of-truth hierarchy and report the conflict. Current documented phase is `PHASE 1 - Digital Twin Foundation`. |
| What project goal does the mission advance? | `PROJECT_OPERATING_PROTOCOL.md`, `project-brain/roadmap/ROADMAP.md`, `project-brain/PROJECT_BRAIN_MASTER.md`. | Match mission to documented business, operational, AI, roadmap, or phase goals. If no match exists, mark `UNKNOWN` or `DEFERRED`. |
| What tables exist? | `data-sources/tools/SHEETS_REGISTRY.md`, `project-brain/PROJECT_BRAIN_MASTER.md`, `project-brain/maps/APPSHEET_MAP.md`, `project-brain/maps/SYSTEM_MAP.md`. | Prefer `SHEETS_REGISTRY.md` for live header metadata. Cross-check against maps and Project Brain. Unknown AppSheet-only behavior remains `UNKNOWN`. |
| What workflows exist? | `project-brain/maps/SYSTEM_MAP.md`, `project-brain/maps/APPSHEET_MAP.md`, `project-brain/maps/APPS_SCRIPT_MAP.md`, `project-brain/PROJECT_BRAIN_MASTER.md`, `data-sources/tools/SHEETS_REGISTRY.md` for `AutomationRegistry`. | Confirm workflow is documented in maps or registry. If only inferred from names, mark `UNKNOWN`. |
| What agents exist? | `agents/AGENT_REGISTRY.md`, relevant `agents/*.md`. | Agent exists only if listed in the registry or represented by an agent file. Planned agents cannot be treated as active. |
| What dependencies exist? | `PROJECT_INDEX.md`, `project-brain/roadmap/ROADMAP.md`, `project-brain/PROJECT_BRAIN_MASTER.md`, maps, `apps-script/*` read-only source when relevant. | Trace upstream and downstream files, tables, workflows, and production systems. Unknown external dependencies remain `UNKNOWN`. |
| What systems are protected? | `PROJECT_OPERATING_PROTOCOL.md`, `PROJECT_INDEX.md`, `agents/INFRASTRUCTURE_MANAGER_AGENT.md`, `project-brain/CURRENT_TASK.md`, `project-brain/PROJECT_BRAIN_MASTER.md`. | Use the union of documented protected systems and stable systems. Current protected systems include Apps Script, Google Sheets live data, AppSheet production, Maven, Drive, AutomationCommands, report counter logic, Drive folder logic, and BusinessDocuments workflow. |
| Which registry owns workflow information? | `data-sources/tools/SHEETS_REGISTRY.md`, `agents/INFRASTRUCTURE_MANAGER_AGENT.md`, maps. | `AutomationRegistry` is documented as the central automation/workflow governance table. `WorkflowRegistry` is not documented in current sources; owner is `UNKNOWN` unless later approved. |
| What mission is active? | `project-brain/CURRENT_TASK.md`, `project-brain/roadmap/ROADMAP.md`, latest relevant checkpoint. | Current documented task is the active mission source. If user request overrides current work, treat it as the requested mission and state the current-task mismatch. |
| What production systems are affected? | Mandatory question answers, maps, `agents/INFRASTRUCTURE_MANAGER_AGENT.md`, `PROJECT_OPERATING_PROTOCOL.md`, `project-brain/CURRENT_TASK.md`. | Identify direct and indirect affected systems. If any write, deployment, Maven, Drive, email, schema, or setup action is implied, require explicit approval. |

If evidence cannot be found in documented project sources, write `UNKNOWN`. Do not invent.

## Pre-Mission Review KPI

| Metric | Formula | Purpose | Target |
|---|---|---|---|
| Review Coverage | `missions with completed Pre-Mission Review / total missions started` | Measures whether the review gate is used before execution. | 100% |
| Duplicate Prevention | `missions redirected to reuse or extension / missions proposing new assets` | Measures whether reuse-before-create is preventing duplicate files, tables, agents, workflows, or registries. | Increase over time; any duplicate prevented is valuable. |
| Discovery Success | `UNKNOWN items resolved to VERIFIED or documented NOT_FOUND / total UNKNOWN items investigated` | Measures whether discovery turns uncertainty into usable evidence. | 90% or documented reason for unresolved unknowns. |
| Approval Accuracy | `approved missions completed without approval-boundary violation / total approved missions` | Measures whether approvals match actual risk and execution boundaries. | 100% |
| Mission Success Rate | `approved missions that pass validation and practical verification / total approved missions completed` | Measures whether approved work achieves the mission objective. | 95% or documented corrective action. |

## Output Generation Model

Correct output is generated through this model:

```text
Input
-> Actions
-> Checks
-> Evidence
-> Output
-> Validation
-> Practical Verification
```

| Stage | Requirement |
|---|---|
| Input | Start from the user request, source-of-truth files, current phase, current task, registries, maps, and relevant agent files. |
| Actions | Read sources, identify affected assets, classify reuse decision, identify protected systems, assign builder/auditor/discovery responsibilities, and define evidence requirements. |
| Checks | Confirm source hierarchy, no duplicate asset creation, no unsupported assumptions, no production write hidden inside review, no conflict with current phase unless explicitly handled. |
| Evidence | Cite source paths and summarize what each source proves. Keep missing facts as `UNKNOWN`. |
| Output | Produce the Pre-Mission Review Output template with every field completed or marked `UNKNOWN`. |
| Validation | Auditor verifies cited evidence, challenges assumptions, searches duplicates, searches contradictions, and reports findings. |
| Practical Verification | Ask concrete project-state questions and confirm answers come from documented evidence, not memory or assumptions. |

An output is correct only when it is complete, evidence-backed, audited, and connected to a next safe step.

## Practical Verification Framework

Practical verification proves the review system works in real project conditions.

Verification questions must be answered from documented evidence:

| Test Question | Expected Evidence-Based Answer |
|---|---|
| What is the current phase? | `PHASE 1 - Digital Twin Foundation`, sourced from `PROJECT_INDEX.md`, `project-brain/CURRENT_TASK.md`, `project-brain/roadmap/ROADMAP.md`, and `project-brain/PROJECT_BRAIN_MASTER.md`. |
| What systems are protected? | Apps Script, Google Sheets live data, AppSheet production, Maven, Drive, AutomationCommands, and stable flows such as ReportCounter, Drive folder logic, BusinessDocuments workflow, and Maven draft flow, sourced from protocol, current task, Project Brain, and Infrastructure Manager. |
| Which agent owns WorkflowRegistry? | `UNKNOWN`. Current sources document `AutomationRegistry` as a central automation/workflow governance table, but do not document `WorkflowRegistry` or an owner for it. |
| What mission is active? | Current documented task: start Digital Twin Foundation as a read-only mapping phase. A new user mission can be reviewed as the requested mission, but must be distinguished from the current task. |
| Can the review modify Apps Script or Google Sheets? | No. Pre-Mission Review is documentation/governance only and must not modify Apps Script, Google Sheets, AppSheet, Maven, Drive, setup state, deployments, or production data. |

Pass condition:

- Every answer cites a project source.
- Missing information is marked `UNKNOWN`.
- No production action is performed.
- The next safe step is explicit.

Fail condition:

- An answer relies on memory or assumption.
- A missing fact is invented.
- The review proposes a new asset without checking reuse.
- The review performs implementation or production change.

## System Integration

Pre-Mission Review connects to the project operating system as follows:

| System | Integration |
|---|---|
| Infrastructure Manager | Owns the review gate, routes Builder/Auditor/Discovery work, reviews evidence and risk, and issues the final decision. |
| Roadmap | Provides current phase, future phase context, dependencies, exit criteria, and whether the mission is current or future-only. |
| Current Task | Provides the active work state and protected-system constraints for the current session. |
| Project Brain | Stores durable project memory, stable workflow rules, current architecture summaries, known bugs, and completed milestones. |
| Registries | `agents/AGENT_REGISTRY.md` identifies active/planned agents. `data-sources/tools/SHEETS_REGISTRY.md` identifies existing tables and live header evidence. Existing live registry tables are referenced read-only unless separately approved. |
| Checkpoints | Provide historical state and milestone evidence. A checkpoint update is proposed when a completed mission changes meaningful project state. |
| Future Phase Execution Blueprint | Pre-Mission Review is the gate before future phase execution. It prevents target architecture items from becoming build-now work without current-state evidence, reuse review, risk review, and approval. |

## Pre-Mission Review Output

Use this template for every Pre-Mission Review:

```md
# Pre-Mission Review Output

Mission Name:

Phase:

Objective:

Builder Agent:

Auditor Agent:

Discovery Required: Yes/No

Existing Assets Found:

Reuse Decision:

Affected Tables:

Affected Agents:

Affected Workflows:

Protected Systems:

Required Evidence:

Validation Tests:

Practical Verification:

Brain Updates Required:

Infrastructure Manager Decision:

Next Safe Step:
```

## Mandatory Brain Update Rule

After every approved mission is completed, update or propose updates to:

- `project-brain/CURRENT_TASK.md`
- `project-brain/roadmap/ROADMAP.md`
- `project-brain/PROJECT_BRAIN_MASTER.md`
- relevant registry/map files
- checkpoint file if milestone is completed

The mission is not complete until required Project Brain updates are made or explicitly proposed for review.

## Forbidden

Pre-Mission Review must not:

- modify Apps Script
- modify Google Sheets
- modify AppSheet
- deploy
- run setup functions
- create Maven documents
- send emails
- create production changes
