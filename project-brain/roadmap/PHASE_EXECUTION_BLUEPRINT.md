# PHASE EXECUTION BLUEPRINT

Status: Draft execution blueprint  
Mission: PEB-1  
Scope: Target Architecture Phases 0-54 from `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`  
Mode: Documentation only; does not authorize production changes

## Purpose

This blueprint converts the target phase list into executable mission structure.

Every phase must be executed as:

```text
Mission
-> Sub-Mission
-> Action
-> Validation
-> Output
```

No phase may start until a Pre-Mission Review is completed under `agents/PRE_MISSION_REVIEW_SYSTEM.md`.

## Global Execution Rules

- Run Pre-Mission Review before every mission.
- Use existing assets before creating new assets.
- Keep unknown facts as `UNKNOWN`.
- Do not modify Apps Script, Google Sheets, AppSheet, Maven, Drive, production data, setup state, or deployments without explicit approval.
- Current legacy production systems remain protected until migration is approved.
- Each phase must produce evidence, validation tests, practical verification, and Project Brain update proposals.

## Verified Current Assets

### Current Governance Assets

- `PROJECT_OPERATING_PROTOCOL.md`
- `PROJECT_INDEX.md`
- `project-brain/PROJECT_BRAIN_MASTER.md`
- `project-brain/CURRENT_TASK.md`
- `project-brain/roadmap/ROADMAP.md`
- `agents/PRE_MISSION_REVIEW_SYSTEM.md`
- `agents/INFRASTRUCTURE_MANAGER_AGENT.md`
- `agents/AGENT_REGISTRY.md`
- `data-sources/tools/SHEETS_REGISTRY.md`

### Current Maps

- `project-brain/maps/SYSTEM_MAP.md`
- `project-brain/maps/APPSHEET_MAP.md`
- `project-brain/maps/APPS_SCRIPT_MAP.md`
- `project-brain/maps/AI_DRAFT_FIELD_MAPPING.md`

### Verified Existing Tables

Source: `data-sources/tools/SHEETS_REGISTRY.md`.

- `AutomationRegistry`
- `HealthCheckRegistry`
- `SystemHealthLog`
- `Customers_Final`
- `Customers2`
- `ServiceReports`
- `ReportEquipmentItems`
- `InspectionItems`
- `PartsUsed`
- `EmailLog`
- `Lists`
- `SetupGuide`
- `PDF_Template`
- `AppSheet_Formulas`
- `ServiceReport_Form_View`
- `BusinessDocuments`
- `BusinessDocumentItems`
- `BusinessDocumentLog`
- `ApprovalsLog`
- `SecretAccessLog`
- `InvoiceMavenDocuments`
- `InvoiceMavenCustomers`
- `ProductsCatalog`
- `InventoryStock`
- `SuppliersProducts`
- `AIDraftSuggestions`
- `InvoiceMavenItems`
- `InvoiceMavenDocumentItems`
- `SyncLog`
- `ErrorLog`
- `SyncState`
- `AutomationCommands`
- `AppMenu`

### Verified Active Agents

Source: `agents/AGENT_REGISTRY.md`.

- `ORCHESTRATOR_AGENT`
- `PROJECT_BRAIN_AGENT`
- `INFRASTRUCTURE_MANAGER_AGENT`
- `PRE_MISSION_REVIEW_SYSTEM`
- `GIT_AGENT`
- `APPS_SCRIPT_AGENT`
- `MAVEN_AGENT`

### Development Or Planned Agents

- `AI_DRAFT_AGENT`: Development
- `QA_AGENT`: Planned
- `INVOICE4U_AGENT`: Planned
- `EXPENSE_AGENT`: Planned

## Universal Phase Algorithm

Every phase uses this base algorithm unless the phase card narrows it:

1. Run Pre-Mission Review.
2. Confirm current phase and mission objective from roadmap/current task.
3. Identify existing files, tables, agents, workflows, maps, and registries.
4. Classify reuse decision: `Reuse Existing`, `Extend Existing`, `Replace Existing`, or `Create New`.
5. Identify protected systems and approval boundaries.
6. Break the mission into sub-missions, actions, validations, and outputs.
7. Execute documentation or approved implementation only within scope.
8. Validate evidence and practical behavior.
9. Propose Project Brain, registry, map, and checkpoint updates.
10. Trigger the next phase only when completion criteria pass.

## Phase 0 - Project Discovery & Recovery

Objective: Recover current project state and remove dependency on chat memory or undocumented assumptions.

Business Goal: Advance Tal AI Operating System readiness by using Project Discovery & Recovery to support this verified objective: Recover current project state and remove dependency on chat memory or undocumented assumptions.

Practical Goal: Execute these concrete phase actions: Read source-of-truth files; run repository file discovery; compare maps against current files; identify stale, duplicate, missing, and unknown sources.

Factory Component: Project Discovery & Recovery.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Repository access and readable governance files.; required table evidence: `SHEETS_REGISTRY` evidence only; no table writes. Read-only references: all verified existing tables.; required agent evidence: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, `GIT_AGENT`..

Required Outputs: Source inventory, file tree map, current-state summary, active/stale file list, protected-system list.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Read source-of-truth files; run repository file discovery; compare maps against current files; identify stale, duplicate, missing, and unknown sources. -> produce required outputs: Source inventory, file tree map, current-state summary, active/stale file list, protected-system list. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: Current phase can be cited; active source hierarchy can be cited; every listed table or agent has a source path. Practical verification: Ask "What is current?", "What is stale?", and "What is protected?" Answers must cite files. Completion evidence: Current-state sources are identified; no production writes occurred; unknowns are documented.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: Propose updates to current task, Project Brain master, maps, and checkpoint if recovery changes durable state.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: Source hierarchy and current-state inventory are reliable enough to build Project Brain foundation.

Next Phase Trigger: Source hierarchy and current-state inventory are reliable enough to build Project Brain foundation.

Deliverables: Source inventory, file tree map, current-state summary, active/stale file list, protected-system list.

Required Tables: `SHEETS_REGISTRY` evidence only; no table writes. Read-only references: all verified existing tables.

Required Agents: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, `GIT_AGENT`.

Practical Actions: Read source-of-truth files; run repository file discovery; compare maps against current files; identify stale, duplicate, missing, and unknown sources.

Execution Algorithm:
1. Run Pre-Mission Review.
2. Read `PROJECT_OPERATING_PROTOCOL.md`, `PROJECT_INDEX.md`, current task, roadmap, Project Brain, maps, and registries.
3. Generate current-state inventory.
4. Mark unverified systems as `UNKNOWN`.
5. Produce recovery findings and next safe step.

Validation Tests: Current phase can be cited; active source hierarchy can be cited; every listed table or agent has a source path.

Practical Verification: Ask "What is current?", "What is stale?", and "What is protected?" Answers must cite files.

Completion Criteria: Current-state sources are identified; no production writes occurred; unknowns are documented.

Brain Updates: Propose updates to current task, Project Brain master, maps, and checkpoint if recovery changes durable state.

Dependencies: Repository access and readable governance files.

Next Phase Trigger: Source hierarchy and current-state inventory are reliable enough to build Project Brain foundation.

Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| Recover project state | Source inventory | Read official files and maps | All claims cite paths | Current-state inventory |
| Recover project state | Unknown handling | Mark missing evidence `UNKNOWN` | No invented IDs | Unknowns list |
| Recover project state | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |

## Phase 1 - Project Brain Foundation

Objective: Establish durable project memory with current task, roadmap, decisions, maps, lessons, bugs, and checkpoints.

Business Goal: Advance Tal AI Operating System readiness by using Project Brain Foundation to support this verified objective: Establish durable project memory with current task, roadmap, decisions, maps, lessons, bugs, and checkpoints.

Practical Goal: Execute these concrete phase actions: Confirm Project Brain files exist; align source hierarchy; identify stale or duplicated project memory; define update rules.

Factory Component: Project Brain Foundation.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 0 current-state recovery.; required table evidence: None required for writes. Read-only table evidence from `SHEETS_REGISTRY`.; required agent evidence: `PROJECT_BRAIN_AGENT`, `INFRASTRUCTURE_MANAGER_AGENT`, `GIT_AGENT`..

Required Outputs: Updated/proposed Project Brain structure, current task source, roadmap source, decision log process, checkpoint process.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Confirm Project Brain files exist; align source hierarchy; identify stale or duplicated project memory; define update rules. -> produce required outputs: Updated/proposed Project Brain structure, current task source, roadmap source, decision log process, checkpoint process. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: Current task and roadmap agree on active phase; Project Brain points to official sources; stale files are not treated as current truth. Practical verification: Ask "What is the active task?" and "Where is durable memory stored?" Answers must cite Project Brain files. Completion evidence: Project Brain files define current state and update rules clearly.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: Update/propose `project-brain/PROJECT_BRAIN_MASTER.md`, `project-brain/CURRENT_TASK.md`, roadmap, maps, and checkpoint.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: Project memory can support validation rules and repeatable execution.

Next Phase Trigger: Project memory can support validation rules and repeatable execution.

Deliverables: Updated/proposed Project Brain structure, current task source, roadmap source, decision log process, checkpoint process.

Required Tables: None required for writes. Read-only table evidence from `SHEETS_REGISTRY`.

Required Agents: `PROJECT_BRAIN_AGENT`, `INFRASTRUCTURE_MANAGER_AGENT`, `GIT_AGENT`.

Practical Actions: Confirm Project Brain files exist; align source hierarchy; identify stale or duplicated project memory; define update rules.

Execution Algorithm:
1. Run Pre-Mission Review.
2. Load Project Brain master, current task, roadmap, maps, bugs, lessons, and checkpoints.
3. Compare conflicts against source hierarchy.
4. Propose focused updates.
5. Validate no runtime systems changed.

Validation Tests: Current task and roadmap agree on active phase; Project Brain points to official sources; stale files are not treated as current truth.

Practical Verification: Ask "What is the active task?" and "Where is durable memory stored?" Answers must cite Project Brain files.

Completion Criteria: Project Brain files define current state and update rules clearly.

Brain Updates: Update/propose `project-brain/PROJECT_BRAIN_MASTER.md`, `project-brain/CURRENT_TASK.md`, roadmap, maps, and checkpoint.

Dependencies: Phase 0 current-state recovery.

Next Phase Trigger: Project memory can support validation rules and repeatable execution.

Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| Build Project Brain | Align memory | Compare brain files | No source conflict unresolved | Brain alignment notes |
| Build Project Brain | Define update loop | Document update targets | Update rules cite protocol | Brain update protocol |
| Build Project Brain | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |

## Phase 2 - Validation Foundation

Objective: Create repeatable validation rules for files, schemas, active IDs, workflows, and documentation.

Business Goal: Advance Tal AI Operating System readiness by using Validation Foundation to support this verified objective: Create repeatable validation rules for files, schemas, active IDs, workflows, and documentation.

Practical Goal: Execute these concrete phase actions: Define validations for source hierarchy, sheet schema evidence, map completeness, workflow contracts, and protected-system boundaries.

Factory Component: Validation Foundation.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 1 Project Brain foundation.; required table evidence: `AutomationRegistry`, `HealthCheckRegistry`, `SystemHealthLog`, `SyncLog`, `ErrorLog`, `SyncState` as read-only evidence; writes require approval.; required agent evidence: `INFRASTRUCTURE_MANAGER_AGENT`, future `QA_AGENT`, `PROJECT_BRAIN_AGENT`, `APPS_SCRIPT_AGENT` for read-only code analysis..

Required Outputs: Validation checklist, evidence rules, schema validation plan, workflow contract validation plan.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools; dry-run/test documentation tools; no repair actions.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Define validations for source hierarchy, sheet schema evidence, map completeness, workflow contracts, and protected-system boundaries. -> produce required outputs: Validation checklist, evidence rules, schema validation plan, workflow contract validation plan. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: Validation rules can detect missing evidence, schema drift risk, duplicate assets, and unapproved production actions. Practical verification: Run a documentation-only validation against `ServiceReports`, `AutomationCommands`, and `BusinessDocuments`. Completion evidence: Repeatable validation checklist exists and can be applied before implementation work.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: Propose validation rules in Project Brain, roadmap, and relevant maps.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: Validation rules are ready to support read-only health checks.

Next Phase Trigger: Validation rules are ready to support read-only health checks.

Deliverables: Validation checklist, evidence rules, schema validation plan, workflow contract validation plan.

Required Tables: `AutomationRegistry`, `HealthCheckRegistry`, `SystemHealthLog`, `SyncLog`, `ErrorLog`, `SyncState` as read-only evidence; writes require approval.

Required Agents: `INFRASTRUCTURE_MANAGER_AGENT`, future `QA_AGENT`, `PROJECT_BRAIN_AGENT`, `APPS_SCRIPT_AGENT` for read-only code analysis.

Practical Actions: Define validations for source hierarchy, sheet schema evidence, map completeness, workflow contracts, and protected-system boundaries.

Execution Algorithm:
1. Run Pre-Mission Review.
2. List validation targets.
3. Match targets to existing registries/maps.
4. Define pass/fail checks.
5. Keep writes disabled unless explicitly approved.

Validation Tests: Validation rules can detect missing evidence, schema drift risk, duplicate assets, and unapproved production actions.

Practical Verification: Run a documentation-only validation against `ServiceReports`, `AutomationCommands`, and `BusinessDocuments`.

Completion Criteria: Repeatable validation checklist exists and can be applied before implementation work.

Brain Updates: Propose validation rules in Project Brain, roadmap, and relevant maps.

Dependencies: Phase 1 Project Brain foundation.

Next Phase Trigger: Validation rules are ready to support read-only health checks.

Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| Build validation foundation | Define checks | Map checks to sources | Each check has source | Validation checklist |
| Build validation foundation | Test checks | Apply to current tables | Findings cite registry | Validation findings |
| Build validation foundation | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |

## Phase 3 - System Health Platform

Objective: Build read-only health checks for service reports, Drive files, Maven sync, queue status, schema drift, duplicate records, and automation failures.

Business Goal: Advance Tal AI Operating System readiness by using System Health Platform to support this verified objective: Build read-only health checks for service reports, Drive files, Maven sync, queue status, schema drift, duplicate records, and automation failures.

Practical Goal: Execute these concrete phase actions: Map health checks; define query targets; identify read-only versus write-required checks; validate that no repair action runs automatically.

Factory Component: System Health Platform.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 2 validation foundation and Digital Twin mapping sufficient to know target tables.; required table evidence: `HealthCheckRegistry`, `SystemHealthLog`, `AutomationRegistry`, `ServiceReports`, `ReportEquipmentItems`, `BusinessDocuments`, `BusinessDocumentItems`, `AutomationCommands`, `SyncLog`, `ErrorLog`, `SyncState`, `InvoiceMavenDocuments`, `InvoiceMavenDocumentItems`.; required agent evidence: `INFRASTRUCTURE_MANAGER_AGENT`, future `QA_AGENT`, `APPS_SCRIPT_AGENT` for read-only analysis, `PROJECT_BRAIN_AGENT`..

Required Outputs: Health check definitions, read-only health report format, registry mapping, approval gates for any logging or repair.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools; sandbox/design tooling only after approval; no infrastructure creation unless separately approved.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Map health checks; define query targets; identify read-only versus write-required checks; validate that no repair action runs automatically. -> produce required outputs: Health check definitions, read-only health report format, registry mapping, approval gates for any logging or repair. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: Health checks identify missing `SignedHtmlFileUrl`, duplicate `ReportCounter`, stuck `AutomationCommands`, Maven sync errors, and schema drift risks in documentation mode. Practical verification: Produce a sample health report from documented evidence without modifying live tables. Completion evidence: Read-only checks are mapped and production repair remains approval-gated.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: Update/propose System Health plan, roadmap, Project Brain, registry/map files, checkpoint if milestone complete.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: Health signals can support output verification.

Next Phase Trigger: Health signals can support output verification.

Deliverables: Health check definitions, read-only health report format, registry mapping, approval gates for any logging or repair.

Required Tables: `HealthCheckRegistry`, `SystemHealthLog`, `AutomationRegistry`, `ServiceReports`, `ReportEquipmentItems`, `BusinessDocuments`, `BusinessDocumentItems`, `AutomationCommands`, `SyncLog`, `ErrorLog`, `SyncState`, `InvoiceMavenDocuments`, `InvoiceMavenDocumentItems`.

Required Agents: `INFRASTRUCTURE_MANAGER_AGENT`, future `QA_AGENT`, `APPS_SCRIPT_AGENT` for read-only analysis, `PROJECT_BRAIN_AGENT`.

Practical Actions: Map health checks; define query targets; identify read-only versus write-required checks; validate that no repair action runs automatically.

Execution Algorithm:
1. Run Pre-Mission Review.
2. Select one health area.
3. Find existing registry/map entries.
4. Define expected healthy state.
5. Define read-only failure detection.
6. Define approval gate for logs or repairs.

Validation Tests: Health checks identify missing `SignedHtmlFileUrl`, duplicate `ReportCounter`, stuck `AutomationCommands`, Maven sync errors, and schema drift risks in documentation mode.

Practical Verification: Produce a sample health report from documented evidence without modifying live tables.

Completion Criteria: Read-only checks are mapped and production repair remains approval-gated.

Brain Updates: Update/propose System Health plan, roadmap, Project Brain, registry/map files, checkpoint if milestone complete.

Dependencies: Phase 2 validation foundation and Digital Twin mapping sufficient to know target tables.

Next Phase Trigger: Health signals can support output verification.

Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| Build health platform | Define checks | Map check to table/workflow | Check is read-only | Health check spec |
| Build health platform | Validate report | Produce sample report | No production writes | Health report draft |
| Build health platform | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |

## Phase 4 - Output Verification Platform

Objective: Verify generated outputs before user delivery.

Business Goal: Advance Tal AI Operating System readiness by using Output Verification Platform to support this verified objective: Verify generated outputs before user delivery.

Practical Goal: Execute these concrete phase actions: Identify each output type; define required fields; define validation before sending, saving, or customer-facing action.

Factory Component: Output Verification Platform.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 3 health signals and mapped current workflows.; required table evidence: `ServiceReports`, `ReportEquipmentItems`, `Customers_Final`, `BusinessDocuments`, `BusinessDocumentItems`, `BusinessDocumentLog`, `EmailLog`, `ApprovalsLog`, `AIDraftSuggestions`.; required agent evidence: future `QA_AGENT`, `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, `AI_DRAFT_AGENT` when AI drafts are in scope, `MAVEN_AGENT` when Maven output is in scope..

Required Outputs: Output verification checklist, document/email/PDF/recommendation verification rules, approval boundaries.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools; sandbox/design tooling only after approval; no infrastructure creation unless separately approved.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Identify each output type; define required fields; define validation before sending, saving, or customer-facing action. -> produce required outputs: Output verification checklist, document/email/PDF/recommendation verification rules, approval boundaries. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: Missing customer, missing items, missing approval, missing file link, or unverified price blocks output. Practical verification: Verify one sample service report or business draft from evidence without sending or creating documents. Completion evidence: Output checks are documented and no customer-facing output is sent automatically.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: Update/propose verification map, roadmap, Project Brain, and checkpoint if milestone complete.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: AppSheet digital twin can map output behavior and approval UX.

Next Phase Trigger: AppSheet digital twin can map output behavior and approval UX.

Deliverables: Output verification checklist, document/email/PDF/recommendation verification rules, approval boundaries.

Required Tables: `ServiceReports`, `ReportEquipmentItems`, `Customers_Final`, `BusinessDocuments`, `BusinessDocumentItems`, `BusinessDocumentLog`, `EmailLog`, `ApprovalsLog`, `AIDraftSuggestions`.

Required Agents: future `QA_AGENT`, `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, `AI_DRAFT_AGENT` when AI drafts are in scope, `MAVEN_AGENT` when Maven output is in scope.

Practical Actions: Identify each output type; define required fields; define validation before sending, saving, or customer-facing action.

Execution Algorithm:
1. Run Pre-Mission Review.
2. Select output type.
3. Identify source tables and workflow.
4. Define required fields and approval conditions.
5. Validate output against source evidence.
6. Block delivery until approval conditions pass.

Validation Tests: Missing customer, missing items, missing approval, missing file link, or unverified price blocks output.

Practical Verification: Verify one sample service report or business draft from evidence without sending or creating documents.

Completion Criteria: Output checks are documented and no customer-facing output is sent automatically.

Brain Updates: Update/propose verification map, roadmap, Project Brain, and checkpoint if milestone complete.

Dependencies: Phase 3 health signals and mapped current workflows.

Next Phase Trigger: AppSheet digital twin can map output behavior and approval UX.

Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| Verify outputs | Define output contract | Map fields and approvals | Required fields listed | Output contract |
| Verify outputs | Test sample | Check one output path | Delivery blocked without approval | Verification result |
| Verify outputs | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |

## Phase 5 - AppSheet Digital Twin

Objective: Map AppSheet tables, columns, actions, bots, slices, UX views, security filters, automations, and dependencies.

Business Goal: Advance Tal AI Operating System readiness by using AppSheet Digital Twin to support this verified objective: Map AppSheet tables, columns, actions, bots, slices, UX views, security filters, automations, and dependencies.

Practical Goal: Execute these concrete phase actions: Compare current maps to sheet registry; collect manual/exported AppSheet evidence only if available; mark missing AppSheet settings `UNKNOWN`.

Factory Component: AppSheet Digital Twin.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 1 current Digital Twin Foundation, sheet registry, existing maps.; required table evidence: All AppSheet-related tables in `SHEETS_REGISTRY`, especially `ServiceReports`, `ReportEquipmentItems`, `Customers_Final`, `BusinessDocuments`, `BusinessDocumentItems`, `BusinessDocumentLog`, `AutomationCommands`, `ProductsCatalog`, `InvoiceMavenDocuments`, `InvoiceMavenDocumentItems`, `SyncState`, `SyncLog`, `ErrorLog`, `AppMenu`.; required agent evidence: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future Digital Twin Agent (`UNKNOWN` until created), `APPS_SCRIPT_AGENT` for boundary mapping..

Required Outputs: AppSheet table map, action map, bot map, UX map, security/filter map, dependency map, unknowns list.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools; read-only AppSheet manual/exported evidence if available; no AppSheet editor changes.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`; AppSheet manual/exported evidence only if available; otherwise `UNKNOWN`.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Compare current maps to sheet registry; collect manual/exported AppSheet evidence only if available; mark missing AppSheet settings `UNKNOWN`. -> produce required outputs: AppSheet table map, action map, bot map, UX map, security/filter map, dependency map, unknowns list. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`; AppSheet manual/exported evidence only if available; otherwise `UNKNOWN`. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: Every mapped AppSheet object cites source; every unknown is explicit; AutomationCommands boundary is preserved. Practical verification: Answer "Which bot processes AutomationCommands?" and "Which tables are part of BusinessDocuments flow?" from evidence. Completion evidence: AppSheet behavior is mapped enough to support migration and health planning.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: Update/propose `project-brain/maps/APPSHEET_MAP.md`, system map, roadmap, Project Brain, checkpoint.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: Current legacy behavior is mapped enough to design migration.

Next Phase Trigger: Current legacy behavior is mapped enough to design migration.

Deliverables: AppSheet table map, action map, bot map, UX map, security/filter map, dependency map, unknowns list.

Required Tables: All AppSheet-related tables in `SHEETS_REGISTRY`, especially `ServiceReports`, `ReportEquipmentItems`, `Customers_Final`, `BusinessDocuments`, `BusinessDocumentItems`, `BusinessDocumentLog`, `AutomationCommands`, `ProductsCatalog`, `InvoiceMavenDocuments`, `InvoiceMavenDocumentItems`, `SyncState`, `SyncLog`, `ErrorLog`, `AppMenu`.

Required Agents: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future Digital Twin Agent (`UNKNOWN` until created), `APPS_SCRIPT_AGENT` for boundary mapping.

Practical Actions: Compare current maps to sheet registry; collect manual/exported AppSheet evidence only if available; mark missing AppSheet settings `UNKNOWN`.

Execution Algorithm:
1. Run Pre-Mission Review.
2. Reuse existing maps first.
3. Map each table to columns, keys, actions, bots, and dependencies.
4. Mark unavailable AppSheet metadata `UNKNOWN`.
5. Validate no AppSheet production change occurred.

Validation Tests: Every mapped AppSheet object cites source; every unknown is explicit; AutomationCommands boundary is preserved.

Practical Verification: Answer "Which bot processes AutomationCommands?" and "Which tables are part of BusinessDocuments flow?" from evidence.

Completion Criteria: AppSheet behavior is mapped enough to support migration and health planning.

Brain Updates: Update/propose `project-brain/maps/APPSHEET_MAP.md`, system map, roadmap, Project Brain, checkpoint.

Dependencies: Phase 1 current Digital Twin Foundation, sheet registry, existing maps.

Next Phase Trigger: Current legacy behavior is mapped enough to design migration.

Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| Map AppSheet twin | Table mapping | Compare registry and map | Tables cite evidence | Table map |
| Map AppSheet twin | Automation mapping | Document bots/actions | Unknowns marked | Automation map |
| Map AppSheet twin | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |

## Phase 6 - Migration Blueprint

Objective: Define a safe migration path from Google Sheets/AppSheet/Apps Script to future platform without breaking production.

Business Goal: Advance Tal AI Operating System readiness by using Migration Blueprint to support this verified objective: Define a safe migration path from Google Sheets/AppSheet/Apps Script to future platform without breaking production.

Practical Goal: Execute these concrete phase actions: Identify legacy system of record; define no-write migration analysis; map stable flows; create cutover prerequisites.

Factory Component: Migration Blueprint.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 5 AppSheet Digital Twin and mapped Apps Script/Drive/Maven flows.; required table evidence: All current production tables; future Supabase schema tables are `UNKNOWN` until approved design.; required agent evidence: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, `GIT_AGENT`, future `QA_AGENT`, future migration agent `UNKNOWN`..

Required Outputs: Migration inventory, dependency graph, migration sequence, rollback plan, parallel-run plan, approval gates.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Identify legacy system of record; define no-write migration analysis; map stable flows; create cutover prerequisites. -> produce required outputs: Migration inventory, dependency graph, migration sequence, rollback plan, parallel-run plan, approval gates. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: Each migration step has source, owner, rollback, and production boundary. Practical verification: Walk one flow from `ServiceReports` to Maven draft and show how migration would preserve it. Completion evidence: Migration risks are documented and no migration work begins without approval.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: Update/propose roadmap, Project Brain, migration map, checkpoint.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: Supabase foundation can be designed from mapped source-of-record evidence.

Next Phase Trigger: Supabase foundation can be designed from mapped source-of-record evidence.

Deliverables: Migration inventory, dependency graph, migration sequence, rollback plan, parallel-run plan, approval gates.

Required Tables: All current production tables; future Supabase schema tables are `UNKNOWN` until approved design.

Required Agents: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, `GIT_AGENT`, future `QA_AGENT`, future migration agent `UNKNOWN`.

Practical Actions: Identify legacy system of record; define no-write migration analysis; map stable flows; create cutover prerequisites.

Execution Algorithm:
1. Run Pre-Mission Review.
2. Confirm Digital Twin evidence.
3. Identify systems of record and side effects.
4. Define migration candidates.
5. Define rollback and parallel-run conditions.
6. Block implementation until explicit approval.

Validation Tests: Each migration step has source, owner, rollback, and production boundary.

Practical Verification: Walk one flow from `ServiceReports` to Maven draft and show how migration would preserve it.

Completion Criteria: Migration risks are documented and no migration work begins without approval.

Brain Updates: Update/propose roadmap, Project Brain, migration map, checkpoint.

Dependencies: Phase 5 AppSheet Digital Twin and mapped Apps Script/Drive/Maven flows.

Next Phase Trigger: Supabase foundation can be designed from mapped source-of-record evidence.

Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| Build migration blueprint | Dependency map | Map current flows | Stable flows protected | Migration dependency map |
| Build migration blueprint | Cutover plan | Define sequence/rollback | No execution authorized | Migration plan |
| Build migration blueprint | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |

## Phase 7 - Supabase Foundation

Objective: Design and later implement the future relational data layer.

Business Goal: Advance Tal AI Operating System readiness by using Supabase Foundation to support this verified objective: Design and later implement the future relational data layer.

Practical Goal: Execute these concrete phase actions: Map current sheet tables to future relational entities; define IDs and relationships without creating database tables until approved.

Factory Component: Supabase Foundation.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 6 Migration Blueprint.; required table evidence: Current source tables from `SHEETS_REGISTRY`; future Supabase tables for tenants, companies, users, customers, service reports, documents, inventory, finance, audit logs, integrations are `UNKNOWN` until schema approval.; required agent evidence: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future `QA_AGENT`, future Supabase/data agent `UNKNOWN`..

Required Outputs: Supabase schema design, tenant/company model, migration mapping, audit model, permission model.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools; sandbox/design tooling only after approval; no infrastructure creation unless separately approved.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Map current sheet tables to future relational entities; define IDs and relationships without creating database tables until approved. -> produce required outputs: Supabase schema design, tenant/company model, migration mapping, audit model, permission model. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: Every future table maps to a current need or approved target need; no duplicate schema exists. Practical verification: Trace `Customer -> ServiceReport -> BusinessDocument -> MavenDocument` through proposed schema. Completion evidence: Schema design is reviewable and migration-safe.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: Update/propose architecture, roadmap, data model map, Project Brain.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: Approved data model supports application UI design.

Next Phase Trigger: Approved data model supports application UI design.

Deliverables: Supabase schema design, tenant/company model, migration mapping, audit model, permission model.

Required Tables: Current source tables from `SHEETS_REGISTRY`; future Supabase tables for tenants, companies, users, customers, service reports, documents, inventory, finance, audit logs, integrations are `UNKNOWN` until schema approval.

Required Agents: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future `QA_AGENT`, future Supabase/data agent `UNKNOWN`.

Practical Actions: Map current sheet tables to future relational entities; define IDs and relationships without creating database tables until approved.

Execution Algorithm:
1. Run Pre-Mission Review.
2. Use migration blueprint as input.
3. Map current tables to future entities.
4. Identify schema gaps and unknowns.
5. Produce design and validation plan.
6. Require approval before any database creation.

Validation Tests: Every future table maps to a current need or approved target need; no duplicate schema exists.

Practical Verification: Trace `Customer -> ServiceReport -> BusinessDocument -> MavenDocument` through proposed schema.

Completion Criteria: Schema design is reviewable and migration-safe.

Brain Updates: Update/propose architecture, roadmap, data model map, Project Brain.

Dependencies: Phase 6 Migration Blueprint.

Next Phase Trigger: Approved data model supports application UI design.

Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| Design data layer | Entity mapping | Map sheets to entities | Each entity has source | Schema draft |
| Design data layer | Governance mapping | Define audit/access needs | Approval gates documented | Data governance notes |
| Design data layer | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |

## Phase 8 - Next.js Platform

Objective: Build future application UI for operations, approvals, service reports, dashboards, customers, documents, workflows, and admin tools.

Business Goal: Advance Tal AI Operating System readiness by using Next.js Platform to support this verified objective: Build future application UI for operations, approvals, service reports, dashboards, customers, documents, workflows, and admin tools.

Practical Goal: Execute these concrete phase actions: Design screens from workflow evidence; define read/write boundaries; keep current AppSheet production untouched until migration approval.

Factory Component: Next.js Platform.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 7 Supabase Foundation.; required table evidence: Future Supabase tables from Phase 7; current sheet tables only as migration/source references.; required agent evidence: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future UI agent `UNKNOWN`, future `QA_AGENT`..

Required Outputs: UI route map, role map, approval screens, operational dashboards, admin surface, integration boundaries.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools; sandbox/design tooling only after approval; no infrastructure creation unless separately approved.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Design screens from workflow evidence; define read/write boundaries; keep current AppSheet production untouched until migration approval. -> produce required outputs: UI route map, role map, approval screens, operational dashboards, admin surface, integration boundaries. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: UI action cannot bypass approval, queue, or output verification rules. Practical verification: Walk an approval flow in a non-production environment. Completion evidence: UI supports approved workflows without destabilizing legacy production.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: Update/propose UI map, roadmap, Project Brain, checkpoint.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: Stable UI/data boundaries support workflow orchestration.

Next Phase Trigger: Stable UI/data boundaries support workflow orchestration.

Deliverables: UI route map, role map, approval screens, operational dashboards, admin surface, integration boundaries.

Required Tables: Future Supabase tables from Phase 7; current sheet tables only as migration/source references.

Required Agents: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future UI agent `UNKNOWN`, future `QA_AGENT`.

Practical Actions: Design screens from workflow evidence; define read/write boundaries; keep current AppSheet production untouched until migration approval.

Execution Algorithm:
1. Run Pre-Mission Review.
2. Select one workflow screen.
3. Map required data and approval state.
4. Define UI actions and validation.
5. Build only after data/API boundary approval.

Validation Tests: UI action cannot bypass approval, queue, or output verification rules.

Practical Verification: Walk an approval flow in a non-production environment.

Completion Criteria: UI supports approved workflows without destabilizing legacy production.

Brain Updates: Update/propose UI map, roadmap, Project Brain, checkpoint.

Dependencies: Phase 7 Supabase Foundation.

Next Phase Trigger: Stable UI/data boundaries support workflow orchestration.

Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| Build platform UI | Screen contract | Map screen to workflow | No approval bypass | UI spec |
| Build platform UI | Interaction test | Simulate user action | Safe environment only | UI validation result |
| Build platform UI | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |

## Phase 9 - n8n Orchestration Layer

Objective: Orchestrate scheduled processes, integration routing, approval workflows, event handling, and agent coordination.

Business Goal: Advance Tal AI Operating System readiness by using n8n Orchestration Layer to support this verified objective: Orchestrate scheduled processes, integration routing, approval workflows, event handling, and agent coordination.

Practical Goal: Execute these concrete phase actions: Map existing AutomationCommands queue before replacing or extending orchestration; design n8n as additive until migration approved.

Factory Component: n8n Orchestration Layer.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 8 Platform UI and current queue mapping.; required table evidence: `AutomationRegistry`, `AutomationCommands`, `BusinessDocuments`, `BusinessDocumentLog`, `SyncLog`, `ErrorLog`, future orchestration tables `UNKNOWN`.; required agent evidence: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future n8n agent `UNKNOWN`, future `QA_AGENT`..

Required Outputs: Workflow inventory, n8n workflow specs, trigger map, approval route map, retry/error policy.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools; sandbox/design tooling only after approval; no infrastructure creation unless separately approved.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Map existing AutomationCommands queue before replacing or extending orchestration; design n8n as additive until migration approved. -> produce required outputs: Workflow inventory, n8n workflow specs, trigger map, approval route map, retry/error policy. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: Workflow preserves idempotency and does not update same row from competing systems. Practical verification: Simulate BusinessDocuments approval-to-command flow without live production write. Completion evidence: Orchestration is mapped, testable, and approval-gated.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: Update/propose automation registry docs, system map, roadmap, checkpoint.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: Orchestration boundaries support AI runtime and tools.

Next Phase Trigger: Orchestration boundaries support AI runtime and tools.

Deliverables: Workflow inventory, n8n workflow specs, trigger map, approval route map, retry/error policy.

Required Tables: `AutomationRegistry`, `AutomationCommands`, `BusinessDocuments`, `BusinessDocumentLog`, `SyncLog`, `ErrorLog`, future orchestration tables `UNKNOWN`.

Required Agents: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future n8n agent `UNKNOWN`, future `QA_AGENT`.

Practical Actions: Map existing AutomationCommands queue before replacing or extending orchestration; design n8n as additive until migration approved.

Execution Algorithm:
1. Run Pre-Mission Review.
2. Select workflow candidate.
3. Compare against `AutomationCommands` and `AutomationRegistry`.
4. Define trigger, input, output, approval, retry, and rollback.
5. Test in sandbox before production approval.

Validation Tests: Workflow preserves idempotency and does not update same row from competing systems.

Practical Verification: Simulate BusinessDocuments approval-to-command flow without live production write.

Completion Criteria: Orchestration is mapped, testable, and approval-gated.

Brain Updates: Update/propose automation registry docs, system map, roadmap, checkpoint.

Dependencies: Phase 8 Platform UI and current queue mapping.

Next Phase Trigger: Orchestration boundaries support AI runtime and tools.

Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| Design orchestration | Workflow spec | Define trigger/input/output | Idempotency preserved | Workflow spec |
| Design orchestration | Sandbox test | Simulate workflow | No production write | Test result |
| Design orchestration | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |

## Phase 9.5 - AI Runtime Layer / CLI / MCP

Objective: Define runtime execution through CLI and MCP connectors with explicit permissions.

Business Goal: Advance Tal AI Operating System readiness by using AI Runtime Layer / CLI / MCP to support this verified objective: Define runtime execution through CLI and MCP connectors with explicit permissions.

Practical Goal: Execute these concrete phase actions: Identify allowed tools, forbidden tools, credential boundaries, approval-required operations, and audit evidence.

Factory Component: AI Runtime Layer / CLI / MCP.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 9 Orchestration Layer.; required table evidence: `SecretAccessLog`, `ApprovalsLog`, `AutomationRegistry`, future runtime audit tables `UNKNOWN`.; required agent evidence: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, `GIT_AGENT`, future MCP/runtime agent `UNKNOWN`..

Required Outputs: Tool permission model, connector inventory, runtime boundary map, audit requirements, approval policy.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools; sandbox/design tooling only after approval; no infrastructure creation unless separately approved.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Identify allowed tools, forbidden tools, credential boundaries, approval-required operations, and audit evidence. -> produce required outputs: Tool permission model, connector inventory, runtime boundary map, audit requirements, approval policy. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: Runtime cannot perform production writes without approval evidence. Practical verification: Demonstrate read-only inspection and blocked write action in sandbox or documentation mode. Completion evidence: Runtime boundaries are explicit and auditable.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: Update/propose runtime map, Project Brain, roadmap.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: Runtime boundaries support structured agents.

Next Phase Trigger: Runtime boundaries support structured agents.

Deliverables: Tool permission model, connector inventory, runtime boundary map, audit requirements, approval policy.

Required Tables: `SecretAccessLog`, `ApprovalsLog`, `AutomationRegistry`, future runtime audit tables `UNKNOWN`.

Required Agents: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, `GIT_AGENT`, future MCP/runtime agent `UNKNOWN`.

Practical Actions: Identify allowed tools, forbidden tools, credential boundaries, approval-required operations, and audit evidence.

Execution Algorithm:
1. Run Pre-Mission Review.
2. Inventory runtime tools and connectors.
3. Classify permissions and forbidden actions.
4. Define audit trail and approval checkpoints.
5. Test read-only connector behavior first.

Validation Tests: Runtime cannot perform production writes without approval evidence.

Practical Verification: Demonstrate read-only inspection and blocked write action in sandbox or documentation mode.

Completion Criteria: Runtime boundaries are explicit and auditable.

Brain Updates: Update/propose runtime map, Project Brain, roadmap.

Dependencies: Phase 9 Orchestration Layer.

Next Phase Trigger: Runtime boundaries support structured agents.

Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| Define AI runtime | Tool policy | Classify tools | Forbidden actions listed | Runtime policy |
| Define AI runtime | Read-only test | Inspect safe target | Write blocked | Runtime verification |
| Define AI runtime | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |

## Phase 10 - Agent Platform

Objective: Create structured agent layer for governance, departments, workers, verification, health, and infrastructure.

Business Goal: Advance Tal AI Operating System readiness by using Agent Platform to support this verified objective: Create structured agent layer for governance, departments, workers, verification, health, and infrastructure.

Practical Goal: Execute these concrete phase actions: Extend documentation registry before creating runtime agents; define who builds, audits, validates, and approves.

Factory Component: Agent Platform.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 9.5 AI Runtime Layer.; required table evidence: `AutomationRegistry`, `ApprovalsLog`, `SecretAccessLog`, future agent registry tables `UNKNOWN`; current source is `agents/AGENT_REGISTRY.md`.; required agent evidence: `ORCHESTRATOR_AGENT`, `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, `GIT_AGENT`, future department/worker agents `UNKNOWN`..

Required Outputs: Agent registry expansion, agent responsibilities, routing model, audit model, permission boundaries.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools; sandbox/design tooling only after approval; no infrastructure creation unless separately approved.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Extend documentation registry before creating runtime agents; define who builds, audits, validates, and approves. -> produce required outputs: Agent registry expansion, agent responsibilities, routing model, audit model, permission boundaries. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: No duplicate agent role; each agent has owner, scope, forbidden actions, evidence requirements. Practical verification: Route a sample mission from Orchestrator to Builder, Auditor, Discovery, and Infrastructure Manager. Completion evidence: Agent layer can route work without bypassing governance.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: Update/propose `agents/AGENT_REGISTRY.md`, Project Brain, roadmap, checkpoint.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: Agent platform can support department factories.

Next Phase Trigger: Agent platform can support department factories.

Deliverables: Agent registry expansion, agent responsibilities, routing model, audit model, permission boundaries.

Required Tables: `AutomationRegistry`, `ApprovalsLog`, `SecretAccessLog`, future agent registry tables `UNKNOWN`; current source is `agents/AGENT_REGISTRY.md`.

Required Agents: `ORCHESTRATOR_AGENT`, `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, `GIT_AGENT`, future department/worker agents `UNKNOWN`.

Practical Actions: Extend documentation registry before creating runtime agents; define who builds, audits, validates, and approves.

Execution Algorithm:
1. Run Pre-Mission Review.
2. Identify missing agent capability.
3. Check existing `agents/*` and registry.
4. Extend existing agent where possible.
5. Create new agent doc only when reuse is insufficient.

Validation Tests: No duplicate agent role; each agent has owner, scope, forbidden actions, evidence requirements.

Practical Verification: Route a sample mission from Orchestrator to Builder, Auditor, Discovery, and Infrastructure Manager.

Completion Criteria: Agent layer can route work without bypassing governance.

Brain Updates: Update/propose `agents/AGENT_REGISTRY.md`, Project Brain, roadmap, checkpoint.

Dependencies: Phase 9.5 AI Runtime Layer.

Next Phase Trigger: Agent platform can support department factories.

Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| Build agent platform | Agent gap review | Compare need to registry | Reuse considered | Agent gap report |
| Build agent platform | Agent spec | Define role/rules | Forbidden actions explicit | Agent definition |
| Build agent platform | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |

## Factory Phase Execution Cards

The following phases use the same required structure. Current required tables and agents are limited to verified project assets. Future tables or agents remain `UNKNOWN` until a Pre-Mission Review and approved design define them.

## Phase 11 - Office Automation Factory

Objective: Automate office documents, reminders, filing, customer follow-ups, and internal routing under approval control.

Business Goal: Advance Tal AI Operating System readiness by using Office Automation Factory to support this verified objective: Automate office documents, reminders, filing, customer follow-ups, and internal routing under approval control.

Practical Goal: Execute these concrete phase actions: Map office tasks; classify read/write/customer-facing actions; design approval-gated automations.

Factory Component: Office Automation Factory.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 10 Agent Platform.; required table evidence: `AutomationRegistry`, `ApprovalsLog`, `EmailLog`, `BusinessDocumentLog`, `AppMenu`; future office task tables `UNKNOWN`.; required agent evidence: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future Office Agent `UNKNOWN`..

Required Outputs: Office workflow inventory; document/email/reminder specs; approval and filing rules.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Map office tasks; classify read/write/customer-facing actions; design approval-gated automations. -> produce required outputs: Office workflow inventory; document/email/reminder specs; approval and filing rules. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: No email, document, Drive change, or external write can happen without approval. Practical verification: Simulate one follow-up task and show blocked send step. Completion evidence: Office tasks have safe workflow contracts and approval gates.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: Project Brain, roadmap, automation map, checkpoint if milestone.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: Office workflow controls are reusable by Service Factory.

Next Phase Trigger: Office workflow controls are reusable by Service Factory.
Deliverables: Office workflow inventory; document/email/reminder specs; approval and filing rules.
Required Tables: `AutomationRegistry`, `ApprovalsLog`, `EmailLog`, `BusinessDocumentLog`, `AppMenu`; future office task tables `UNKNOWN`.
Required Agents: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future Office Agent `UNKNOWN`.
Practical Actions: Map office tasks; classify read/write/customer-facing actions; design approval-gated automations.
Execution Algorithm: Review mission; map task; check existing automation; define input/output/approval; test with dry run; document update.
Validation Tests: No email, document, Drive change, or external write can happen without approval.
Practical Verification: Simulate one follow-up task and show blocked send step.
Completion Criteria: Office tasks have safe workflow contracts and approval gates.
Brain Updates: Project Brain, roadmap, automation map, checkpoint if milestone.
Dependencies: Phase 10 Agent Platform.
Next Phase Trigger: Office workflow controls are reusable by Service Factory.
Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| Office automation contract | one workflow | map trigger/input/output | approval gate exists | workflow spec |
| Office automation contract | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |
| Office automation contract | Validation package | Run validation tests and practical verification before completion | Tests pass or blockers are documented | Validated output package |

## Phase 12 - Service Factory

Objective: Automate service report lifecycle, technician workflows, equipment history, recommendations, and service quality checks.

Business Goal: Advance Tal AI Operating System readiness by using Service Factory to support this verified objective: Automate service report lifecycle, technician workflows, equipment history, recommendations, and service quality checks.

Practical Goal: Execute these concrete phase actions: Map service lifecycle; validate ReportCounter, Drive save, signature, email, and report-generation boundaries.

Factory Component: Service Factory.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 11 Office Automation Factory and Phase 5 Digital Twin.; required table evidence: `ServiceReports`, `ReportEquipmentItems`, `Customers_Final`, `InspectionItems`, `PartsUsed`, `Lists`, `PDF_Template`, `EmailLog`, `BusinessDocuments`, `AutomationCommands`.; required agent evidence: `INFRASTRUCTURE_MANAGER_AGENT`, `APPS_SCRIPT_AGENT`, `PROJECT_BRAIN_AGENT`, future Service Agent `UNKNOWN`, future `QA_AGENT`..

Required Outputs: Service workflow specs; equipment history map; recommendation rules; technician action contracts.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools; read-only pps-script/* inspection; no clasp push; no deploy; no setup functions.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`; `apps-script/*` read-only when source evidence is needed.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Map service lifecycle; validate ReportCounter, Drive save, signature, email, and report-generation boundaries. -> produce required outputs: Service workflow specs; equipment history map; recommendation rules; technician action contracts. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`; `apps-script/*` read-only when source evidence is needed. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: ReportCounter, Drive folder logic, signature logic, and queue boundaries remain protected. Practical verification: Trace one `ServiceReports.ReportID` path through equipment, HTML report, Drive, email, and business draft eligibility. Completion evidence: Service workflows are mapped and automations are approval-gated.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: Service maps, Project Brain, roadmap, checkpoint.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: Service outputs can safely feed Finance Factory.

Next Phase Trigger: Service outputs can safely feed Finance Factory.
Deliverables: Service workflow specs; equipment history map; recommendation rules; technician action contracts.
Required Tables: `ServiceReports`, `ReportEquipmentItems`, `Customers_Final`, `InspectionItems`, `PartsUsed`, `Lists`, `PDF_Template`, `EmailLog`, `BusinessDocuments`, `AutomationCommands`.
Required Agents: `INFRASTRUCTURE_MANAGER_AGENT`, `APPS_SCRIPT_AGENT`, `PROJECT_BRAIN_AGENT`, future Service Agent `UNKNOWN`, future `QA_AGENT`.
Practical Actions: Map service lifecycle; validate ReportCounter, Drive save, signature, email, and report-generation boundaries.
Execution Algorithm: Review mission; select service workflow; map tables/functions; identify protected logic; define validation; test read-only first.
Validation Tests: ReportCounter, Drive folder logic, signature logic, and queue boundaries remain protected.
Practical Verification: Trace one `ServiceReports.ReportID` path through equipment, HTML report, Drive, email, and business draft eligibility.
Completion Criteria: Service workflows are mapped and automations are approval-gated.
Brain Updates: Service maps, Project Brain, roadmap, checkpoint.
Dependencies: Phase 11 Office Automation Factory and Phase 5 Digital Twin.
Next Phase Trigger: Service outputs can safely feed Finance Factory.
Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| Service lifecycle automation | report flow | map table/function/action | protected logic not changed | service workflow contract |
| Service lifecycle automation | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |
| Service lifecycle automation | Validation package | Run validation tests and practical verification before completion | Tests pass or blockers are documented | Validated output package |

## Phase 13 - Finance Factory

Objective: Automate quotes, invoices, receipts, payments, expenses, collections, approvals, and audit trails.

Business Goal: Advance Tal AI Operating System readiness by using Finance Factory to support this verified objective: Automate quotes, invoices, receipts, payments, expenses, collections, approvals, and audit trails.

Practical Goal: Execute these concrete phase actions: Map existing Maven draft flow; define quote/invoice/expense approval gates; prohibit finalization without approval.

Factory Component: Finance Factory.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 12 Service Factory.; required table evidence: `BusinessDocuments`, `BusinessDocumentItems`, `BusinessDocumentLog`, `AutomationCommands`, `InvoiceMavenDocuments`, `InvoiceMavenDocumentItems`, `InvoiceMavenCustomers`, `InvoiceMavenItems`, `ApprovalsLog`, `SyncState`, `SyncLog`, `ErrorLog`.; required agent evidence: `MAVEN_AGENT`, `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, planned `INVOICE4U_AGENT`, planned `EXPENSE_AGENT`..

Required Outputs: Finance workflow contracts; Maven/Invoice4u boundary map; approval policies; audit requirements.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools; read-only Maven map/source review; no Maven document creation or sync writes.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`; `apps-script/*` read-only when source evidence is needed.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Map existing Maven draft flow; define quote/invoice/expense approval gates; prohibit finalization without approval. -> produce required outputs: Finance workflow contracts; Maven/Invoice4u boundary map; approval policies; audit requirements. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`; `apps-script/*` read-only when source evidence is needed. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: No Maven document, invoice, payment update, or customer send without explicit approval. Practical verification: Trace BusinessDocuments -> AutomationCommands -> Maven Draft with approval checkpoints. Completion evidence: Finance automations preserve queue idempotency and approval control.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: Finance map, Maven map, Project Brain, roadmap, checkpoint.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: Finance outputs can support sales pricing and customer history.

Next Phase Trigger: Finance outputs can support sales pricing and customer history.
Deliverables: Finance workflow contracts; Maven/Invoice4u boundary map; approval policies; audit requirements.
Required Tables: `BusinessDocuments`, `BusinessDocumentItems`, `BusinessDocumentLog`, `AutomationCommands`, `InvoiceMavenDocuments`, `InvoiceMavenDocumentItems`, `InvoiceMavenCustomers`, `InvoiceMavenItems`, `ApprovalsLog`, `SyncState`, `SyncLog`, `ErrorLog`.
Required Agents: `MAVEN_AGENT`, `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, planned `INVOICE4U_AGENT`, planned `EXPENSE_AGENT`.
Practical Actions: Map existing Maven draft flow; define quote/invoice/expense approval gates; prohibit finalization without approval.
Execution Algorithm: Review mission; identify finance document type; map source data; validate approval state; generate recommendation/draft only when approved.
Validation Tests: No Maven document, invoice, payment update, or customer send without explicit approval.
Practical Verification: Trace BusinessDocuments -> AutomationCommands -> Maven Draft with approval checkpoints.
Completion Criteria: Finance automations preserve queue idempotency and approval control.
Brain Updates: Finance map, Maven map, Project Brain, roadmap, checkpoint.
Dependencies: Phase 12 Service Factory.
Next Phase Trigger: Finance outputs can support sales pricing and customer history.
Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| Finance automation | document flow | map draft/approval/sync | approval gate exists | finance workflow contract |
| Finance automation | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |
| Finance automation | Validation package | Run validation tests and practical verification before completion | Tests pass or blockers are documented | Validated output package |

## Phase 14 - Sales Factory

Objective: Automate lead tracking, quote preparation, history analysis, follow-up, pricing recommendations, and pipeline visibility.

Business Goal: Advance Tal AI Operating System readiness by using Sales Factory to support this verified objective: Automate lead tracking, quote preparation, history analysis, follow-up, pricing recommendations, and pipeline visibility.

Practical Goal: Execute these concrete phase actions: Map quote inputs; validate pricing sources; design sales follow-up without automatic customer send.

Factory Component: Sales Factory.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 13 Finance Factory.; required table evidence: `Customers_Final`, `BusinessDocuments`, `BusinessDocumentItems`, `InvoiceMavenDocuments`, `InvoiceMavenDocumentItems`, `ProductsCatalog`, `AIDraftSuggestions`; future leads/pipeline tables `UNKNOWN`.; required agent evidence: `AI_DRAFT_AGENT`, `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future Sales Agent `UNKNOWN`..

Required Outputs: Sales workflow specs; quote recommendation rules; customer history inputs; pipeline data requirements.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Map quote inputs; validate pricing sources; design sales follow-up without automatic customer send. -> produce required outputs: Sales workflow specs; quote recommendation rules; customer history inputs; pipeline data requirements. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: Price recommendation cites source; missing price creates approval flag. Practical verification: Produce one quote recommendation from historical evidence without creating Maven document. Completion evidence: Sales recommendations are evidence-backed and approval-gated.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: Sales map, AI Draft docs, Project Brain, roadmap.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: Customer segments and sales outputs can feed marketing.

Next Phase Trigger: Customer segments and sales outputs can feed marketing.
Deliverables: Sales workflow specs; quote recommendation rules; customer history inputs; pipeline data requirements.
Required Tables: `Customers_Final`, `BusinessDocuments`, `BusinessDocumentItems`, `InvoiceMavenDocuments`, `InvoiceMavenDocumentItems`, `ProductsCatalog`, `AIDraftSuggestions`; future leads/pipeline tables `UNKNOWN`.
Required Agents: `AI_DRAFT_AGENT`, `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future Sales Agent `UNKNOWN`.
Practical Actions: Map quote inputs; validate pricing sources; design sales follow-up without automatic customer send.
Execution Algorithm: Review mission; select quote/sales workflow; collect customer/service/pricing evidence; generate recommendation; require human approval.
Validation Tests: Price recommendation cites source; missing price creates approval flag.
Practical Verification: Produce one quote recommendation from historical evidence without creating Maven document.
Completion Criteria: Sales recommendations are evidence-backed and approval-gated.
Brain Updates: Sales map, AI Draft docs, Project Brain, roadmap.
Dependencies: Phase 13 Finance Factory.
Next Phase Trigger: Customer segments and sales outputs can feed marketing.
Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| Sales recommendation | quote candidate | collect history/pricing | source-backed pricing | quote recommendation |
| Sales recommendation | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |
| Sales recommendation | Validation package | Run validation tests and practical verification before completion | Tests pass or blockers are documented | Validated output package |

## Phase 15 - Marketing Factory

Objective: Automate segmentation, campaigns, service reminders, renewal messaging, and performance feedback loops.

Business Goal: Advance Tal AI Operating System readiness by using Marketing Factory to support this verified objective: Automate segmentation, campaigns, service reminders, renewal messaging, and performance feedback loops.

Practical Goal: Execute these concrete phase actions: Map allowed customer communication; define segment evidence; prohibit sending without approval.

Factory Component: Marketing Factory.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 14 Sales Factory.; required table evidence: `Customers_Final`, `ServiceReports`, `InvoiceMavenDocuments`, `EmailLog`, `AppMenu`; future campaign/consent tables `UNKNOWN`.; required agent evidence: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future Marketing Agent `UNKNOWN`..

Required Outputs: Segment definitions; campaign approval rules; reminder workflow specs; opt-out/consent requirements.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Map allowed customer communication; define segment evidence; prohibit sending without approval. -> produce required outputs: Segment definitions; campaign approval rules; reminder workflow specs; opt-out/consent requirements. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: No customer message without approval and verified contact data. Practical verification: Generate a campaign candidate list in documentation/sandbox mode only. Completion evidence: Marketing workflows are permission-aware and non-production by default.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: Marketing map, communication rules, Project Brain, roadmap.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: Campaign/notification rules feed Communication Factory.

Next Phase Trigger: Campaign/notification rules feed Communication Factory.
Deliverables: Segment definitions; campaign approval rules; reminder workflow specs; opt-out/consent requirements.
Required Tables: `Customers_Final`, `ServiceReports`, `InvoiceMavenDocuments`, `EmailLog`, `AppMenu`; future campaign/consent tables `UNKNOWN`.
Required Agents: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future Marketing Agent `UNKNOWN`.
Practical Actions: Map allowed customer communication; define segment evidence; prohibit sending without approval.
Execution Algorithm: Review mission; define segment; validate customer/contact evidence; draft campaign; require approval before send.
Validation Tests: No customer message without approval and verified contact data.
Practical Verification: Generate a campaign candidate list in documentation/sandbox mode only.
Completion Criteria: Marketing workflows are permission-aware and non-production by default.
Brain Updates: Marketing map, communication rules, Project Brain, roadmap.
Dependencies: Phase 14 Sales Factory.
Next Phase Trigger: Campaign/notification rules feed Communication Factory.
Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| Marketing workflow | segment | define evidence and draft | no send | campaign spec |
| Marketing workflow | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |
| Marketing workflow | Validation package | Run validation tests and practical verification before completion | Tests pass or blockers are documented | Validated output package |

## Phase 16 - Communication Factory

Objective: Unify email, messaging, notifications, alerts, document delivery, and future omnichannel workflows.

Business Goal: Advance Tal AI Operating System readiness by using Communication Factory to support this verified objective: Unify email, messaging, notifications, alerts, document delivery, and future omnichannel workflows.

Practical Goal: Execute these concrete phase actions: Map current `EmailSender` behavior; define channel boundaries; require approval before sending.

Factory Component: Communication Factory.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 15 Marketing Factory.; required table evidence: `EmailLog`, `ServiceReports`, `BusinessDocuments`, `ApprovalsLog`, `AppMenu`; future message log tables `UNKNOWN`.; required agent evidence: `INFRASTRUCTURE_MANAGER_AGENT`, `APPS_SCRIPT_AGENT`, `PROJECT_BRAIN_AGENT`, future Communication Agent `UNKNOWN`..

Required Outputs: Communication channel map; delivery approval rules; message templates; audit requirements.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools; read-only pps-script/* inspection; no clasp push; no deploy; no setup functions.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`; `apps-script/*` read-only when source evidence is needed.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Map current `EmailSender` behavior; define channel boundaries; require approval before sending. -> produce required outputs: Communication channel map; delivery approval rules; message templates; audit requirements. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`; `apps-script/*` read-only when source evidence is needed. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: Recipient, content, source record, and approval are verified before send. Practical verification: Draft one message from a service report and block actual send. Completion evidence: Communication workflows are auditable and approval-gated.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: Communication map, Project Brain, roadmap.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: Communication events can support inventory/service/procurement flows.

Next Phase Trigger: Communication events can support inventory/service/procurement flows.
Deliverables: Communication channel map; delivery approval rules; message templates; audit requirements.
Required Tables: `EmailLog`, `ServiceReports`, `BusinessDocuments`, `ApprovalsLog`, `AppMenu`; future message log tables `UNKNOWN`.
Required Agents: `INFRASTRUCTURE_MANAGER_AGENT`, `APPS_SCRIPT_AGENT`, `PROJECT_BRAIN_AGENT`, future Communication Agent `UNKNOWN`.
Practical Actions: Map current `EmailSender` behavior; define channel boundaries; require approval before sending.
Execution Algorithm: Review mission; select channel; map trigger/content/recipient; validate approval; test dry run before delivery.
Validation Tests: Recipient, content, source record, and approval are verified before send.
Practical Verification: Draft one message from a service report and block actual send.
Completion Criteria: Communication workflows are auditable and approval-gated.
Brain Updates: Communication map, Project Brain, roadmap.
Dependencies: Phase 15 Marketing Factory.
Next Phase Trigger: Communication events can support inventory/service/procurement flows.
Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| Communication workflow | message type | map recipient/content | approval required | message contract |
| Communication workflow | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |
| Communication workflow | Validation package | Run validation tests and practical verification before completion | Tests pass or blockers are documented | Validated output package |

## Phase 17 - Inventory & Procurement Factory

Objective: Automate parts catalog, stock tracking, supplier orders, purchase recommendations, forecasts, and service-linked inventory updates.

Business Goal: Advance Tal AI Operating System readiness by using Inventory & Procurement Factory to support this verified objective: Automate parts catalog, stock tracking, supplier orders, purchase recommendations, forecasts, and service-linked inventory updates.

Practical Goal: Execute these concrete phase actions: Map catalog and stock fields; identify consumption sources; define purchase approval gates.

Factory Component: Inventory & Procurement Factory.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 16 Communication Factory and service/finance data.; required table evidence: `ProductsCatalog`, `InventoryStock`, `SuppliersProducts`, `InvoiceMavenItems`, `PartsUsed`, `ReportEquipmentItems`.; required agent evidence: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future Inventory Agent `UNKNOWN`..

Required Outputs: Inventory entity map; procurement workflow specs; supplier mapping; reorder rules.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Map catalog and stock fields; identify consumption sources; define purchase approval gates. -> produce required outputs: Inventory entity map; procurement workflow specs; supplier mapping; reorder rules. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: No supplier order or stock write without approval. Practical verification: Generate one reorder recommendation from stock/service evidence. Completion evidence: Inventory recommendations are source-backed and non-writing by default.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: Inventory map, Project Brain, roadmap.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: Role and assignment needs can feed HR Factory.

Next Phase Trigger: Role and assignment needs can feed HR Factory.
Deliverables: Inventory entity map; procurement workflow specs; supplier mapping; reorder rules.
Required Tables: `ProductsCatalog`, `InventoryStock`, `SuppliersProducts`, `InvoiceMavenItems`, `PartsUsed`, `ReportEquipmentItems`.
Required Agents: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future Inventory Agent `UNKNOWN`.
Practical Actions: Map catalog and stock fields; identify consumption sources; define purchase approval gates.
Execution Algorithm: Review mission; select part/procurement workflow; map source tables; validate stock and supplier evidence; recommend purchase only.
Validation Tests: No supplier order or stock write without approval.
Practical Verification: Generate one reorder recommendation from stock/service evidence.
Completion Criteria: Inventory recommendations are source-backed and non-writing by default.
Brain Updates: Inventory map, Project Brain, roadmap.
Dependencies: Phase 16 Communication Factory and service/finance data.
Next Phase Trigger: Role and assignment needs can feed HR Factory.
Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| Inventory recommendation | part candidate | check stock/supplier/use | no order created | reorder recommendation |
| Inventory recommendation | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |
| Inventory recommendation | Validation package | Run validation tests and practical verification before completion | Tests pass or blockers are documented | Validated output package |

## Phase 18 - HR Factory

Objective: Support employee records, technician assignments, onboarding, training, schedules, KPIs, and role-based access.

Business Goal: Advance Tal AI Operating System readiness by using HR Factory to support this verified objective: Support employee records, technician assignments, onboarding, training, schedules, KPIs, and role-based access.

Practical Goal: Execute these concrete phase actions: Map technician fields; define missing HR tables as `UNKNOWN`; design role/access requirements without creating production schema.

Factory Component: HR Factory.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 17 Inventory & Procurement Factory.; required table evidence: Current technician fields exist in `ServiceReports`; future employee/role/schedule tables `UNKNOWN`.; required agent evidence: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future HR Agent `UNKNOWN`..

Required Outputs: HR data requirements; technician assignment map; access role map; training workflow specs.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Map technician fields; define missing HR tables as `UNKNOWN`; design role/access requirements without creating production schema. -> produce required outputs: HR data requirements; technician assignment map; access role map; training workflow specs. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: No employee schema or permission change without approval. Practical verification: Trace technician assignment evidence from `ServiceReports`. Completion evidence: HR requirements are documented with current gaps explicit.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: HR map, Project Brain, roadmap.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: User/customer access needs feed Customer Portal.

Next Phase Trigger: User/customer access needs feed Customer Portal.
Deliverables: HR data requirements; technician assignment map; access role map; training workflow specs.
Required Tables: Current technician fields exist in `ServiceReports`; future employee/role/schedule tables `UNKNOWN`.
Required Agents: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future HR Agent `UNKNOWN`.
Practical Actions: Map technician fields; define missing HR tables as `UNKNOWN`; design role/access requirements without creating production schema.
Execution Algorithm: Review mission; select HR workflow; identify current evidence; document gaps; design approval-gated data model.
Validation Tests: No employee schema or permission change without approval.
Practical Verification: Trace technician assignment evidence from `ServiceReports`.
Completion Criteria: HR requirements are documented with current gaps explicit.
Brain Updates: HR map, Project Brain, roadmap.
Dependencies: Phase 17 Inventory & Procurement Factory.
Next Phase Trigger: User/customer access needs feed Customer Portal.
Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| HR workflow design | technician assignment | map current evidence | gaps marked `UNKNOWN` | HR requirements |
| HR workflow design | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |
| HR workflow design | Validation package | Run validation tests and practical verification before completion | Tests pass or blockers are documented | Validated output package |

## Phase 19 - Customer Portal

Objective: Provide customer access to service reports, quotes, invoices, approvals, equipment history, schedules, and support requests.

Business Goal: Advance Tal AI Operating System readiness by using Customer Portal to support this verified objective: Provide customer access to service reports, quotes, invoices, approvals, equipment history, schedules, and support requests.

Practical Goal: Execute these concrete phase actions: Define customer-visible data; protect private/internal fields; design read-only first.

Factory Component: Customer Portal.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 18 HR roles and Phase 8 UI platform.; required table evidence: `Customers_Final`, `ServiceReports`, `ReportEquipmentItems`, `BusinessDocuments`, `BusinessDocumentItems`, `InvoiceMavenDocuments`; future portal user/access tables `UNKNOWN`.; required agent evidence: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future Portal Agent `UNKNOWN`, future `QA_AGENT`..

Required Outputs: Portal role model; customer data contract; document access rules; approval UX rules.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`; AppSheet manual/exported evidence only if available; otherwise `UNKNOWN`.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Define customer-visible data; protect private/internal fields; design read-only first. -> produce required outputs: Portal role model; customer data contract; document access rules; approval UX rules. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`; AppSheet manual/exported evidence only if available; otherwise `UNKNOWN`. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: Customer can access only approved records and documents. Practical verification: Simulate customer view for one service report without exposing internal data. Completion evidence: Portal data boundaries are explicit and permission-gated.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: Portal map, Project Brain, roadmap.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: Portal access needs feed AI Governance.

Next Phase Trigger: Portal access needs feed AI Governance.
Deliverables: Portal role model; customer data contract; document access rules; approval UX rules.
Required Tables: `Customers_Final`, `ServiceReports`, `ReportEquipmentItems`, `BusinessDocuments`, `BusinessDocumentItems`, `InvoiceMavenDocuments`; future portal user/access tables `UNKNOWN`.
Required Agents: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future Portal Agent `UNKNOWN`, future `QA_AGENT`.
Practical Actions: Define customer-visible data; protect private/internal fields; design read-only first.
Execution Algorithm: Review mission; select portal feature; map data and permissions; define access checks; test in sandbox.
Validation Tests: Customer can access only approved records and documents.
Practical Verification: Simulate customer view for one service report without exposing internal data.
Completion Criteria: Portal data boundaries are explicit and permission-gated.
Brain Updates: Portal map, Project Brain, roadmap.
Dependencies: Phase 18 HR roles and Phase 8 UI platform.
Next Phase Trigger: Portal access needs feed AI Governance.
Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| Portal feature | customer view | map data/permission | no unauthorized fields | portal contract |
| Portal feature | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |
| Portal feature | Validation package | Run validation tests and practical verification before completion | Tests pass or blockers are documented | Validated output package |

## Phase 20 - AI Governance Factory

Objective: Define AI approval policies, permissions, audit logs, agent boundaries, risk scoring, escalation, and safe production controls.

Business Goal: Advance Tal AI Operating System readiness by using AI Governance Factory to support this verified objective: Define AI approval policies, permissions, audit logs, agent boundaries, risk scoring, escalation, and safe production controls.

Practical Goal: Execute these concrete phase actions: Map AI actions to risk levels; define blocked actions; require evidence before recommendations.

Factory Component: AI Governance Factory.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 19 Customer Portal.; required table evidence: `ApprovalsLog`, `SecretAccessLog`, `AutomationRegistry`, `SystemHealthLog`; future AI governance tables `UNKNOWN`.; required agent evidence: `INFRASTRUCTURE_MANAGER_AGENT`, `ORCHESTRATOR_AGENT`, `PROJECT_BRAIN_AGENT`, all active/future agents..

Required Outputs: AI policy registry; risk scoring rules; approval matrix; agent permission map.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Map AI actions to risk levels; define blocked actions; require evidence before recommendations. -> produce required outputs: AI policy registry; risk scoring rules; approval matrix; agent permission map. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: AI cannot approve its own production, financial, customer-facing, schema, or deployment actions. Practical verification: Attempt to classify a Maven draft action; result must require human approval. Completion evidence: AI authority boundaries are enforceable and documented.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: Governance map, agent registry, Project Brain, roadmap.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: AI governance supports AI Chairman.

Next Phase Trigger: AI governance supports AI Chairman.
Deliverables: AI policy registry; risk scoring rules; approval matrix; agent permission map.
Required Tables: `ApprovalsLog`, `SecretAccessLog`, `AutomationRegistry`, `SystemHealthLog`; future AI governance tables `UNKNOWN`.
Required Agents: `INFRASTRUCTURE_MANAGER_AGENT`, `ORCHESTRATOR_AGENT`, `PROJECT_BRAIN_AGENT`, all active/future agents.
Practical Actions: Map AI actions to risk levels; define blocked actions; require evidence before recommendations.
Execution Algorithm: Review mission; classify AI action; assign risk and approval; define audit output; validate blocked actions.
Validation Tests: AI cannot approve its own production, financial, customer-facing, schema, or deployment actions.
Practical Verification: Attempt to classify a Maven draft action; result must require human approval.
Completion Criteria: AI authority boundaries are enforceable and documented.
Brain Updates: Governance map, agent registry, Project Brain, roadmap.
Dependencies: Phase 19 Customer Portal.
Next Phase Trigger: AI governance supports AI Chairman.
Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| AI governance rule | action category | classify risk | approval boundary | policy rule |
| AI governance rule | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |
| AI governance rule | Validation package | Run validation tests and practical verification before completion | Tests pass or blockers are documented | Validated output package |

## Phase 21 - AI Chairman Factory

Objective: Create strategic AI governance for cross-company status, risks, performance, priorities, and decisions.

Business Goal: Advance Tal AI Operating System readiness by using AI Chairman Factory to support this verified objective: Create strategic AI governance for cross-company status, risks, performance, priorities, and decisions.

Practical Goal: Execute these concrete phase actions: Define advisory-only scope; block production authority; connect to roadmap and KPIs.

Factory Component: AI Chairman Factory.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 20 AI Governance Factory.; required table evidence: `AutomationRegistry`, `SystemHealthLog`, `ApprovalsLog`; future strategy/scorecard tables `UNKNOWN`.; required agent evidence: future AI Chairman Agent `UNKNOWN`, `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`..

Required Outputs: Chairman decision model; priority review process; escalation rules; advisory output template.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Define advisory-only scope; block production authority; connect to roadmap and KPIs. -> produce required outputs: Chairman decision model; priority review process; escalation rules; advisory output template. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: Chairman output is advisory and cites evidence. Practical verification: Review one proposed phase and produce approve/defer recommendation without execution. Completion evidence: Strategic advisory layer is evidence-based and non-executing.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: Governance docs, Project Brain, roadmap.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: Strategic review enables controlled improvement loops.

Next Phase Trigger: Strategic review enables controlled improvement loops.
Deliverables: Chairman decision model; priority review process; escalation rules; advisory output template.
Required Tables: `AutomationRegistry`, `SystemHealthLog`, `ApprovalsLog`; future strategy/scorecard tables `UNKNOWN`.
Required Agents: future AI Chairman Agent `UNKNOWN`, `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`.
Practical Actions: Define advisory-only scope; block production authority; connect to roadmap and KPIs.
Execution Algorithm: Review mission; gather evidence; evaluate business value/risk; produce recommendation; require human decision.
Validation Tests: Chairman output is advisory and cites evidence.
Practical Verification: Review one proposed phase and produce approve/defer recommendation without execution.
Completion Criteria: Strategic advisory layer is evidence-based and non-executing.
Brain Updates: Governance docs, Project Brain, roadmap.
Dependencies: Phase 20 AI Governance Factory.
Next Phase Trigger: Strategic review enables controlled improvement loops.
Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| Chairman review | priority decision | evaluate evidence | no execution authority | advisory recommendation |
| Chairman review | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |
| Chairman review | Validation package | Run validation tests and practical verification before completion | Tests pass or blockers are documented | Validated output package |

## Phase 22 - Self Evolving Enterprise

Objective: Enable agents to identify gaps, propose upgrades, validate impacts, and request approval before implementation.

Business Goal: Advance Tal AI Operating System readiness by using Self Evolving Enterprise to support this verified objective: Enable agents to identify gaps, propose upgrades, validate impacts, and request approval before implementation.

Practical Goal: Execute these concrete phase actions: Convert findings into proposals; prevent automatic self-modification.

Factory Component: Self Evolving Enterprise.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 21 AI Chairman Factory.; required table evidence: `AutomationRegistry`, `HealthCheckRegistry`, `SystemHealthLog`, `ApprovalsLog`; future improvement backlog tables `UNKNOWN`.; required agent evidence: `INFRASTRUCTURE_MANAGER_AGENT`, future AI Chairman Agent `UNKNOWN`, future discovery agents `UNKNOWN`..

Required Outputs: Improvement loop contract; proposal template; impact validation rules; approval gate.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Convert findings into proposals; prevent automatic self-modification. -> produce required outputs: Improvement loop contract; proposal template; impact validation rules; approval gate. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: No code/schema/workflow change occurs automatically. Practical verification: Turn one known gap into a proposal with no implementation. Completion evidence: Improvement loop is proposal-only until approval.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: Lessons, roadmap, Project Brain, checkpoint.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: Improvement proposals need durable knowledge/memory.

Next Phase Trigger: Improvement proposals need durable knowledge/memory.
Deliverables: Improvement loop contract; proposal template; impact validation rules; approval gate.
Required Tables: `AutomationRegistry`, `HealthCheckRegistry`, `SystemHealthLog`, `ApprovalsLog`; future improvement backlog tables `UNKNOWN`.
Required Agents: `INFRASTRUCTURE_MANAGER_AGENT`, future AI Chairman Agent `UNKNOWN`, future discovery agents `UNKNOWN`.
Practical Actions: Convert findings into proposals; prevent automatic self-modification.
Execution Algorithm: Review mission; detect gap; create proposal; validate impact; route for approval.
Validation Tests: No code/schema/workflow change occurs automatically.
Practical Verification: Turn one known gap into a proposal with no implementation.
Completion Criteria: Improvement loop is proposal-only until approval.
Brain Updates: Lessons, roadmap, Project Brain, checkpoint.
Dependencies: Phase 21 AI Chairman Factory.
Next Phase Trigger: Improvement proposals need durable knowledge/memory.
Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| Improvement loop | gap proposal | document impact | approval required | improvement proposal |
| Improvement loop | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |
| Improvement loop | Validation package | Run validation tests and practical verification before completion | Tests pass or blockers are documented | Validated output package |

## Phase 23 - Knowledge & Memory Factory

Objective: Build durable organizational memory across customers, equipment, decisions, documents, lessons, incidents, pricing, and workflows.

Business Goal: Advance Tal AI Operating System readiness by using Knowledge & Memory Factory to support this verified objective: Build durable organizational memory across customers, equipment, decisions, documents, lessons, incidents, pricing, and workflows.

Practical Goal: Execute these concrete phase actions: Map knowledge domains; define what belongs in Project Brain versus business data.

Factory Component: Knowledge & Memory Factory.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 22 Self Evolving Enterprise.; required table evidence: `Customers_Final`, `ReportEquipmentItems`, `ServiceReports`, `BusinessDocuments`, `InvoiceMavenDocuments`, `InvoiceMavenDocumentItems`; future knowledge tables `UNKNOWN`.; required agent evidence: `PROJECT_BRAIN_AGENT`, `INFRASTRUCTURE_MANAGER_AGENT`, future Knowledge Agent `UNKNOWN`..

Required Outputs: Knowledge model; memory update rules; retrieval rules; citation requirements.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Map knowledge domains; define what belongs in Project Brain versus business data. -> produce required outputs: Knowledge model; memory update rules; retrieval rules; citation requirements. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: Knowledge answer cites source and avoids stale memory. Practical verification: Answer one equipment/customer history question from documented data sources. Completion evidence: Knowledge storage and retrieval boundaries are defined.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: Project Brain, memory maps, roadmap.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: Knowledge model requires data governance.

Next Phase Trigger: Knowledge model requires data governance.
Deliverables: Knowledge model; memory update rules; retrieval rules; citation requirements.
Required Tables: `Customers_Final`, `ReportEquipmentItems`, `ServiceReports`, `BusinessDocuments`, `InvoiceMavenDocuments`, `InvoiceMavenDocumentItems`; future knowledge tables `UNKNOWN`.
Required Agents: `PROJECT_BRAIN_AGENT`, `INFRASTRUCTURE_MANAGER_AGENT`, future Knowledge Agent `UNKNOWN`.
Practical Actions: Map knowledge domains; define what belongs in Project Brain versus business data.
Execution Algorithm: Review mission; select memory domain; identify source; define update/retrieval rules; validate citations.
Validation Tests: Knowledge answer cites source and avoids stale memory.
Practical Verification: Answer one equipment/customer history question from documented data sources.
Completion Criteria: Knowledge storage and retrieval boundaries are defined.
Brain Updates: Project Brain, memory maps, roadmap.
Dependencies: Phase 22 Self Evolving Enterprise.
Next Phase Trigger: Knowledge model requires data governance.
Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| Knowledge domain | source mapping | define memory rule | citation required | memory spec |
| Knowledge domain | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |
| Knowledge domain | Validation package | Run validation tests and practical verification before completion | Tests pass or blockers are documented | Validated output package |

## Phase 24 - Data Governance Factory

Objective: Govern data models, ownership, schema changes, retention, privacy, access, lineage, backups, and migration rules.

Business Goal: Advance Tal AI Operating System readiness by using Data Governance Factory to support this verified objective: Govern data models, ownership, schema changes, retention, privacy, access, lineage, backups, and migration rules.

Practical Goal: Execute these concrete phase actions: Assign owner/consumer/update rule per data area; require approval before schema changes.

Factory Component: Data Governance Factory.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 23 Knowledge & Memory Factory.; required table evidence: All verified existing tables; future governance metadata tables `UNKNOWN`.; required agent evidence: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future Data Governance Agent `UNKNOWN`..

Required Outputs: Data ownership matrix; schema change process; retention/access policy; lineage map.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Assign owner/consumer/update rule per data area; require approval before schema changes. -> produce required outputs: Data ownership matrix; schema change process; retention/access policy; lineage map. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: Schema change request includes impact, rollback, approval, and affected workflows. Practical verification: Produce governance record for `ServiceReports` or `AutomationCommands`. Completion evidence: Data changes are governed and traceable.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: Data map, Project Brain, roadmap.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: Governed data supports Document Factory.

Next Phase Trigger: Governed data supports Document Factory.
Deliverables: Data ownership matrix; schema change process; retention/access policy; lineage map.
Required Tables: All verified existing tables; future governance metadata tables `UNKNOWN`.
Required Agents: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future Data Governance Agent `UNKNOWN`.
Practical Actions: Assign owner/consumer/update rule per data area; require approval before schema changes.
Execution Algorithm: Review mission; select table/domain; identify owner and consumers; define change control; validate protected fields.
Validation Tests: Schema change request includes impact, rollback, approval, and affected workflows.
Practical Verification: Produce governance record for `ServiceReports` or `AutomationCommands`.
Completion Criteria: Data changes are governed and traceable.
Brain Updates: Data map, Project Brain, roadmap.
Dependencies: Phase 23 Knowledge & Memory Factory.
Next Phase Trigger: Governed data supports Document Factory.
Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| Data governance | table policy | define owner/change rule | approval path | data policy |
| Data governance | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |
| Data governance | Validation package | Run validation tests and practical verification before completion | Tests pass or blockers are documented | Validated output package |

## Phase 25 - Document Factory

Objective: Generate, verify, store, retrieve, and route service reports, quotes, invoices, purchase orders, summaries, contracts, and internal reports.

Business Goal: Advance Tal AI Operating System readiness by using Document Factory to support this verified objective: Generate, verify, store, retrieve, and route service reports, quotes, invoices, purchase orders, summaries, contracts, and internal reports.

Practical Goal: Execute these concrete phase actions: Map document lifecycle; preserve Drive save and Maven approval gates.

Factory Component: Document Factory.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 24 Data Governance Factory.; required table evidence: `ServiceReports`, `BusinessDocuments`, `BusinessDocumentItems`, `InvoiceMavenDocuments`, `EmailLog`, `ApprovalsLog`; future document registry tables `UNKNOWN`.; required agent evidence: `MAVEN_AGENT`, `APPS_SCRIPT_AGENT`, `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`..

Required Outputs: Document type registry; generation contracts; storage rules; verification rules.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools; read-only pps-script/* inspection; no clasp push; no deploy; no setup functions.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`; `apps-script/*` read-only when source evidence is needed.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Map document lifecycle; preserve Drive save and Maven approval gates. -> produce required outputs: Document type registry; generation contracts; storage rules; verification rules. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`; `apps-script/*` read-only when source evidence is needed. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: No document creation or customer send without approval. Practical verification: Generate a document specification from one source record, not a production document. Completion evidence: Document lifecycle is verified and approval-gated.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: Document map, Project Brain, roadmap.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: Verified documents support AI training examples.

Next Phase Trigger: Verified documents support AI training examples.
Deliverables: Document type registry; generation contracts; storage rules; verification rules.
Required Tables: `ServiceReports`, `BusinessDocuments`, `BusinessDocumentItems`, `InvoiceMavenDocuments`, `EmailLog`, `ApprovalsLog`; future document registry tables `UNKNOWN`.
Required Agents: `MAVEN_AGENT`, `APPS_SCRIPT_AGENT`, `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`.
Practical Actions: Map document lifecycle; preserve Drive save and Maven approval gates.
Execution Algorithm: Review mission; select document type; map source fields; validate output; require approval before creation/send.
Validation Tests: No document creation or customer send without approval.
Practical Verification: Generate a document specification from one source record, not a production document.
Completion Criteria: Document lifecycle is verified and approval-gated.
Brain Updates: Document map, Project Brain, roadmap.
Dependencies: Phase 24 Data Governance Factory.
Next Phase Trigger: Verified documents support AI training examples.
Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| Document workflow | document type | map source/output | approval gate | document contract |
| Document workflow | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |
| Document workflow | Validation package | Run validation tests and practical verification before completion | Tests pass or blockers are documented | Validated output package |

## Phase 26 - AI Training Factory

Objective: Create safe training and feedback loops using approved data, examples, evaluations, review, and versioned behavior.

Business Goal: Advance Tal AI Operating System readiness by using AI Training Factory to support this verified objective: Create safe training and feedback loops using approved data, examples, evaluations, review, and versioned behavior.

Practical Goal: Execute these concrete phase actions: Define approved examples; exclude secrets/private data unless approved; create eval-only workflow.

Factory Component: AI Training Factory.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 25 Document Factory.; required table evidence: `AIDraftSuggestions`, `BusinessDocuments`, `BusinessDocumentItems`, `ApprovalsLog`; future eval/training tables `UNKNOWN`.; required agent evidence: `AI_DRAFT_AGENT`, `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future Evaluation Agent `UNKNOWN`..

Required Outputs: Training data policy; evaluation set; prompt/model version rules; feedback workflow.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Define approved examples; exclude secrets/private data unless approved; create eval-only workflow. -> produce required outputs: Training data policy; evaluation set; prompt/model version rules; feedback workflow. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: Training sample has approval and no sensitive leakage. Practical verification: Evaluate one AI draft recommendation against expected output. Completion evidence: Training/evaluation loop is governed and versioned.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: AI Draft docs, Project Brain, roadmap.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: Training tools require MCP connector standards.

Next Phase Trigger: Training tools require MCP connector standards.
Deliverables: Training data policy; evaluation set; prompt/model version rules; feedback workflow.
Required Tables: `AIDraftSuggestions`, `BusinessDocuments`, `BusinessDocumentItems`, `ApprovalsLog`; future eval/training tables `UNKNOWN`.
Required Agents: `AI_DRAFT_AGENT`, `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future Evaluation Agent `UNKNOWN`.
Practical Actions: Define approved examples; exclude secrets/private data unless approved; create eval-only workflow.
Execution Algorithm: Review mission; select training use case; verify data permission; define eval; run non-production test.
Validation Tests: Training sample has approval and no sensitive leakage.
Practical Verification: Evaluate one AI draft recommendation against expected output.
Completion Criteria: Training/evaluation loop is governed and versioned.
Brain Updates: AI Draft docs, Project Brain, roadmap.
Dependencies: Phase 25 Document Factory.
Next Phase Trigger: Training tools require MCP connector standards.
Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| AI eval loop | sample set | verify permission | approved data only | eval set/spec |
| AI eval loop | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |
| AI eval loop | Validation package | Run validation tests and practical verification before completion | Tests pass or blockers are documented | Validated output package |

## Phase 27 - MCP Ecosystem Factory

Objective: Standardize MCP connectors for GitHub, Google, Supabase, n8n, filesystem, browser, business APIs, observability, and future platforms.

Business Goal: Advance Tal AI Operating System readiness by using MCP Ecosystem Factory to support this verified objective: Standardize MCP connectors for GitHub, Google, Supabase, n8n, filesystem, browser, business APIs, observability, and future platforms.

Practical Goal: Execute these concrete phase actions: Inventory connectors; classify scopes; require approval for external writes.

Factory Component: MCP Ecosystem Factory.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 26 AI Training Factory.; required table evidence: `SecretAccessLog`, `ApprovalsLog`, `AutomationRegistry`; future connector registry tables `UNKNOWN`.; required agent evidence: `INFRASTRUCTURE_MANAGER_AGENT`, `GIT_AGENT`, `PROJECT_BRAIN_AGENT`, future MCP Agent `UNKNOWN`..

Required Outputs: Connector registry; permission model; read/write classification; audit rules.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools; sandbox/design tooling only after approval; no infrastructure creation unless separately approved.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Inventory connectors; classify scopes; require approval for external writes. -> produce required outputs: Connector registry; permission model; read/write classification; audit rules. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: Connector cannot access secrets or write externally without approval. Practical verification: Demonstrate connector read path and blocked write path. Completion evidence: MCP use is permissioned and auditable.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: Connector map, Project Brain, roadmap.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: Standard connectors support sandbox/testing.

Next Phase Trigger: Standard connectors support sandbox/testing.
Deliverables: Connector registry; permission model; read/write classification; audit rules.
Required Tables: `SecretAccessLog`, `ApprovalsLog`, `AutomationRegistry`; future connector registry tables `UNKNOWN`.
Required Agents: `INFRASTRUCTURE_MANAGER_AGENT`, `GIT_AGENT`, `PROJECT_BRAIN_AGENT`, future MCP Agent `UNKNOWN`.
Practical Actions: Inventory connectors; classify scopes; require approval for external writes.
Execution Algorithm: Review mission; select connector; define allowed operations; test read-only; gate writes.
Validation Tests: Connector cannot access secrets or write externally without approval.
Practical Verification: Demonstrate connector read path and blocked write path.
Completion Criteria: MCP use is permissioned and auditable.
Brain Updates: Connector map, Project Brain, roadmap.
Dependencies: Phase 26 AI Training Factory.
Next Phase Trigger: Standard connectors support sandbox/testing.
Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| Connector standard | one connector | classify operations | write gate | connector spec |
| Connector standard | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |
| Connector standard | Validation package | Run validation tests and practical verification before completion | Tests pass or blockers are documented | Validated output package |

## Phase 28 - Sandbox & Testing Factory

Objective: Provide safe test environments, test data, simulations, dry runs, regression checks, and approval gates.

Business Goal: Advance Tal AI Operating System readiness by using Sandbox & Testing Factory to support this verified objective: Provide safe test environments, test data, simulations, dry runs, regression checks, and approval gates.

Practical Goal: Execute these concrete phase actions: Define non-production targets; create dry-run expectations; prevent test from touching production.

Factory Component: Sandbox & Testing Factory.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 27 MCP Ecosystem Factory.; required table evidence: `SystemHealthLog`, `HealthCheckRegistry`, `AutomationRegistry`; future test case tables `UNKNOWN`.; required agent evidence: future `QA_AGENT`, `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`..

Required Outputs: Sandbox policy; test data rules; dry-run framework; regression checklist.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools; dry-run/test documentation tools; no repair actions.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Define non-production targets; create dry-run expectations; prevent test from touching production. -> produce required outputs: Sandbox policy; test data rules; dry-run framework; regression checklist. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: Test environment cannot mutate production systems. Practical verification: Simulate AutomationCommands flow without creating a command. Completion evidence: Safe testing is repeatable before production work.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: Test scenarios, Project Brain, roadmap, checkpoint.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: Testable data supports BI metrics.

Next Phase Trigger: Testable data supports BI metrics.
Deliverables: Sandbox policy; test data rules; dry-run framework; regression checklist.
Required Tables: `SystemHealthLog`, `HealthCheckRegistry`, `AutomationRegistry`; future test case tables `UNKNOWN`.
Required Agents: future `QA_AGENT`, `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`.
Practical Actions: Define non-production targets; create dry-run expectations; prevent test from touching production.
Execution Algorithm: Review mission; select workflow; create test case; run dry-run/simulation; record result.
Validation Tests: Test environment cannot mutate production systems.
Practical Verification: Simulate AutomationCommands flow without creating a command.
Completion Criteria: Safe testing is repeatable before production work.
Brain Updates: Test scenarios, Project Brain, roadmap, checkpoint.
Dependencies: Phase 27 MCP Ecosystem Factory.
Next Phase Trigger: Testable data supports BI metrics.
Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| Sandbox test | workflow test | simulate input | no production write | test report |
| Sandbox test | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |
| Sandbox test | Validation package | Run validation tests and practical verification before completion | Tests pass or blockers are documented | Validated output package |

## Phase 29 - Business Intelligence Factory

Objective: Create dashboards, metrics, forecasts, anomaly detection, service profitability, customer health, and executive summaries.

Business Goal: Advance Tal AI Operating System readiness by using Business Intelligence Factory to support this verified objective: Create dashboards, metrics, forecasts, anomaly detection, service profitability, customer health, and executive summaries.

Practical Goal: Execute these concrete phase actions: Define metrics from verified fields; separate read-only analytics from operational writes.

Factory Component: Business Intelligence Factory.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 28 Sandbox & Testing Factory.; required table evidence: `ServiceReports`, `BusinessDocuments`, `InvoiceMavenDocuments`, `InvoiceMavenDocumentItems`, `ProductsCatalog`, `SyncLog`, `SystemHealthLog`; future BI tables `UNKNOWN`.; required agent evidence: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future BI Agent `UNKNOWN`..

Required Outputs: KPI catalog; data mart design; dashboard specs; anomaly rules.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Define metrics from verified fields; separate read-only analytics from operational writes. -> produce required outputs: KPI catalog; data mart design; dashboard specs; anomaly rules. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: KPI formula cites source fields and handles missing data. Practical verification: Calculate one documented KPI from sample evidence. Completion evidence: BI metrics are traceable and non-invasive.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: KPI map, Project Brain, roadmap.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: BI signals feed Command Center.

Next Phase Trigger: BI signals feed Command Center.
Deliverables: KPI catalog; data mart design; dashboard specs; anomaly rules.
Required Tables: `ServiceReports`, `BusinessDocuments`, `InvoiceMavenDocuments`, `InvoiceMavenDocumentItems`, `ProductsCatalog`, `SyncLog`, `SystemHealthLog`; future BI tables `UNKNOWN`.
Required Agents: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future BI Agent `UNKNOWN`.
Practical Actions: Define metrics from verified fields; separate read-only analytics from operational writes.
Execution Algorithm: Review mission; select KPI; map source fields; define calculation; validate sample.
Validation Tests: KPI formula cites source fields and handles missing data.
Practical Verification: Calculate one documented KPI from sample evidence.
Completion Criteria: BI metrics are traceable and non-invasive.
Brain Updates: KPI map, Project Brain, roadmap.
Dependencies: Phase 28 Sandbox & Testing Factory.
Next Phase Trigger: BI signals feed Command Center.
Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| KPI definition | one metric | map formula | source fields exist | KPI spec |
| KPI definition | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |
| KPI definition | Validation package | Run validation tests and practical verification before completion | Tests pass or blockers are documented | Validated output package |

## Phase 30 - AI Enterprise Command Center

Objective: Create central command interface for system status, approvals, agents, workflows, incidents, metrics, and operations.

Business Goal: Advance Tal AI Operating System readiness by using AI Enterprise Command Center to support this verified objective: Create central command interface for system status, approvals, agents, workflows, incidents, metrics, and operations.

Practical Goal: Execute these concrete phase actions: Aggregate existing status sources; define read-only status first; gate command execution.

Factory Component: AI Enterprise Command Center.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 29 BI Factory.; required table evidence: `SystemHealthLog`, `AutomationRegistry`, `ApprovalsLog`, `BusinessDocumentLog`, `SyncLog`, `ErrorLog`; future command center tables `UNKNOWN`.; required agent evidence: `ORCHESTRATOR_AGENT`, `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future Command Center Agent `UNKNOWN`..

Required Outputs: Command center information architecture; approval queue spec; incident/status dashboard spec.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Aggregate existing status sources; define read-only status first; gate command execution. -> produce required outputs: Command center information architecture; approval queue spec; incident/status dashboard spec. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: Dashboard cannot execute production actions without approval. Practical verification: Show one status view and one blocked action path. Completion evidence: Command center is status-first and approval-gated.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: Command center map, Project Brain, roadmap.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: Command center state feeds Digital Twin Factory.

Next Phase Trigger: Command center state feeds Digital Twin Factory.
Deliverables: Command center information architecture; approval queue spec; incident/status dashboard spec.
Required Tables: `SystemHealthLog`, `AutomationRegistry`, `ApprovalsLog`, `BusinessDocumentLog`, `SyncLog`, `ErrorLog`; future command center tables `UNKNOWN`.
Required Agents: `ORCHESTRATOR_AGENT`, `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future Command Center Agent `UNKNOWN`.
Practical Actions: Aggregate existing status sources; define read-only status first; gate command execution.
Execution Algorithm: Review mission; select command center capability; map data; define action permissions; validate no bypass.
Validation Tests: Dashboard cannot execute production actions without approval.
Practical Verification: Show one status view and one blocked action path.
Completion Criteria: Command center is status-first and approval-gated.
Brain Updates: Command center map, Project Brain, roadmap.
Dependencies: Phase 29 BI Factory.
Next Phase Trigger: Command center state feeds Digital Twin Factory.
Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| Command capability | status/action | map source and permission | action gated | command spec |
| Command capability | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |
| Command capability | Validation package | Run validation tests and practical verification before completion | Tests pass or blockers are documented | Validated output package |

## Phase 31 - Digital Twin Factory

Objective: Model current and future systems as digital twins for AppSheet, Sheets, workflows, data models, automations, customers, equipment, and operations.

Business Goal: Advance Tal AI Operating System readiness by using Digital Twin Factory to support this verified objective: Model current and future systems as digital twins for AppSheet, Sheets, workflows, data models, automations, customers, equipment, and operations.

Practical Goal: Execute these concrete phase actions: Convert existing maps into structured twin models; mark unknowns; validate against live read-only metadata.

Factory Component: Digital Twin Factory.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 30 Command Center.; required table evidence: All verified current tables; future twin metadata tables `UNKNOWN`.; required agent evidence: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future Digital Twin Agent `UNKNOWN`..

Required Outputs: Digital twin model registry; entity maps; workflow simulations; dependency graph.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Convert existing maps into structured twin models; mark unknowns; validate against live read-only metadata. -> produce required outputs: Digital twin model registry; entity maps; workflow simulations; dependency graph. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: Twin object cites current source and conflict status. Practical verification: Simulate ServiceReports -> BusinessDocuments -> AutomationCommands path. Completion evidence: Twin accurately represents current and future comparison state.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: Maps, Project Brain, roadmap, checkpoint.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: Twin state feeds observability.

Next Phase Trigger: Twin state feeds observability.
Deliverables: Digital twin model registry; entity maps; workflow simulations; dependency graph.
Required Tables: All verified current tables; future twin metadata tables `UNKNOWN`.
Required Agents: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future Digital Twin Agent `UNKNOWN`.
Practical Actions: Convert existing maps into structured twin models; mark unknowns; validate against live read-only metadata.
Execution Algorithm: Review mission; select system; map entities/relations/actions; validate evidence; create twin artifact.
Validation Tests: Twin object cites current source and conflict status.
Practical Verification: Simulate ServiceReports -> BusinessDocuments -> AutomationCommands path.
Completion Criteria: Twin accurately represents current and future comparison state.
Brain Updates: Maps, Project Brain, roadmap, checkpoint.
Dependencies: Phase 30 Command Center.
Next Phase Trigger: Twin state feeds observability.
Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| Twin model | system slice | map objects/relations | source-backed | twin artifact |
| Twin model | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |
| Twin model | Validation package | Run validation tests and practical verification before completion | Tests pass or blockers are documented | Validated output package |

## Phase 32 - Enterprise Observability Factory

Objective: Track logs, traces, workflow outcomes, agent actions, schema changes, integration failures, incidents, and health signals.

Business Goal: Advance Tal AI Operating System readiness by using Enterprise Observability Factory to support this verified objective: Track logs, traces, workflow outcomes, agent actions, schema changes, integration failures, incidents, and health signals.

Practical Goal: Execute these concrete phase actions: Map existing logs; identify missing signals; define read-only incident reporting.

Factory Component: Enterprise Observability Factory.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 31 Digital Twin Factory.; required table evidence: `SystemHealthLog`, `SyncLog`, `ErrorLog`, `BusinessDocumentLog`, `AutomationRegistry`, `HealthCheckRegistry`; future observability tables `UNKNOWN`.; required agent evidence: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future Observability Agent `UNKNOWN`..

Required Outputs: Observability signal catalog; log routing design; incident taxonomy; alert rules.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools; dry-run/test documentation tools; no repair actions.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Map existing logs; identify missing signals; define read-only incident reporting. -> produce required outputs: Observability signal catalog; log routing design; incident taxonomy; alert rules. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: Signal has source, severity, owner, and no auto-repair unless approved. Practical verification: Classify one Maven sync error from `ErrorLog` contract. Completion evidence: Observability signals are actionable and safe.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: Observability map, Project Brain, roadmap.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: Observability supports autonomous discovery.

Next Phase Trigger: Observability supports autonomous discovery.
Deliverables: Observability signal catalog; log routing design; incident taxonomy; alert rules.
Required Tables: `SystemHealthLog`, `SyncLog`, `ErrorLog`, `BusinessDocumentLog`, `AutomationRegistry`, `HealthCheckRegistry`; future observability tables `UNKNOWN`.
Required Agents: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future Observability Agent `UNKNOWN`.
Practical Actions: Map existing logs; identify missing signals; define read-only incident reporting.
Execution Algorithm: Review mission; select signal; map source/log; define severity; validate alert policy.
Validation Tests: Signal has source, severity, owner, and no auto-repair unless approved.
Practical Verification: Classify one Maven sync error from `ErrorLog` contract.
Completion Criteria: Observability signals are actionable and safe.
Brain Updates: Observability map, Project Brain, roadmap.
Dependencies: Phase 31 Digital Twin Factory.
Next Phase Trigger: Observability supports autonomous discovery.
Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| Observability signal | log type | define severity/owner | no auto-repair | signal spec |
| Observability signal | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |
| Observability signal | Validation package | Run validation tests and practical verification before completion | Tests pass or blockers are documented | Validated output package |

## Phase 33 - Autonomous Discovery Factory

Objective: Allow approved agents to discover undocumented files, schemas, workflows, patterns, risks, and improvements.

Business Goal: Advance Tal AI Operating System readiness by using Autonomous Discovery Factory to support this verified objective: Allow approved agents to discover undocumented files, schemas, workflows, patterns, risks, and improvements.

Practical Goal: Execute these concrete phase actions: Define read-only discovery tasks; classify findings; route changes to approval.

Factory Component: Autonomous Discovery Factory.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 32 Observability Factory.; required table evidence: `AutomationRegistry`, `HealthCheckRegistry`, `SystemHealthLog`; future discovery registry tables `UNKNOWN`.; required agent evidence: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future Discovery Agent `UNKNOWN`..

Required Outputs: Discovery permission policy; discovery result template; source search protocol; unknown-resolution workflow.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Define read-only discovery tasks; classify findings; route changes to approval. -> produce required outputs: Discovery permission policy; discovery result template; source search protocol; unknown-resolution workflow. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: Discovery cannot write or execute production actions. Practical verification: Resolve one `UNKNOWN` field from repository sources or keep `UNKNOWN`. Completion evidence: Discovery turns unknowns into verified findings without side effects.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: Maps, Project Brain, roadmap, lessons.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: Discovery outputs feed revenue optimization.

Next Phase Trigger: Discovery outputs feed revenue optimization.
Deliverables: Discovery permission policy; discovery result template; source search protocol; unknown-resolution workflow.
Required Tables: `AutomationRegistry`, `HealthCheckRegistry`, `SystemHealthLog`; future discovery registry tables `UNKNOWN`.
Required Agents: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future Discovery Agent `UNKNOWN`.
Practical Actions: Define read-only discovery tasks; classify findings; route changes to approval.
Execution Algorithm: Review mission; define unknown; search sources; validate result; output finding/proposal.
Validation Tests: Discovery cannot write or execute production actions.
Practical Verification: Resolve one `UNKNOWN` field from repository sources or keep `UNKNOWN`.
Completion Criteria: Discovery turns unknowns into verified findings without side effects.
Brain Updates: Maps, Project Brain, roadmap, lessons.
Dependencies: Phase 32 Observability Factory.
Next Phase Trigger: Discovery outputs feed revenue optimization.
Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| Discovery task | unknown item | search evidence | verified or `UNKNOWN` | discovery finding |
| Discovery task | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |
| Discovery task | Validation package | Run validation tests and practical verification before completion | Tests pass or blockers are documented | Validated output package |

## Phase 34 - Revenue Optimization Factory

Objective: Analyze pricing, service history, conversion, customer segments, follow-up timing, and revenue leakage.

Business Goal: Advance Tal AI Operating System readiness by using Revenue Optimization Factory to support this verified objective: Analyze pricing, service history, conversion, customer segments, follow-up timing, and revenue leakage.

Practical Goal: Execute these concrete phase actions: Map price and service history; generate recommendations with source evidence and approval flags.

Factory Component: Revenue Optimization Factory.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 33 Discovery Factory.; required table evidence: `InvoiceMavenDocuments`, `InvoiceMavenDocumentItems`, `BusinessDocuments`, `ProductsCatalog`, `ServiceReports`, `Customers_Final`.; required agent evidence: `AI_DRAFT_AGENT`, `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future Revenue Agent `UNKNOWN`..

Required Outputs: Revenue KPI list; pricing analysis rules; leakage detection; recommendation workflow.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Map price and service history; generate recommendations with source evidence and approval flags. -> produce required outputs: Revenue KPI list; pricing analysis rules; leakage detection; recommendation workflow. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: Recommendation cites price/history source and marks uncertainty. Practical verification: Detect one possible pricing inconsistency without changing documents. Completion evidence: Revenue recommendations are evidence-backed and non-executing.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: Revenue map, Project Brain, roadmap.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: Recommendations can be assigned to AI office workers.

Next Phase Trigger: Recommendations can be assigned to AI office workers.
Deliverables: Revenue KPI list; pricing analysis rules; leakage detection; recommendation workflow.
Required Tables: `InvoiceMavenDocuments`, `InvoiceMavenDocumentItems`, `BusinessDocuments`, `ProductsCatalog`, `ServiceReports`, `Customers_Final`.
Required Agents: `AI_DRAFT_AGENT`, `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future Revenue Agent `UNKNOWN`.
Practical Actions: Map price and service history; generate recommendations with source evidence and approval flags.
Execution Algorithm: Review mission; select revenue question; collect historical evidence; calculate gap; recommend action.
Validation Tests: Recommendation cites price/history source and marks uncertainty.
Practical Verification: Detect one possible pricing inconsistency without changing documents.
Completion Criteria: Revenue recommendations are evidence-backed and non-executing.
Brain Updates: Revenue map, Project Brain, roadmap.
Dependencies: Phase 33 Discovery Factory.
Next Phase Trigger: Recommendations can be assigned to AI office workers.
Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| Revenue recommendation | pricing gap | compare history/catalog | source-backed | recommendation |
| Revenue recommendation | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |
| Revenue recommendation | Validation package | Run validation tests and practical verification before completion | Tests pass or blockers are documented | Validated output package |

## Phase 35 - AI Office Workers Factory

Objective: Create AI worker roles for admin operations, document handling, follow-up, finance preparation, scheduling, and coordination.

Business Goal: Advance Tal AI Operating System readiness by using AI Office Workers Factory to support this verified objective: Create AI worker roles for admin operations, document handling, follow-up, finance preparation, scheduling, and coordination.

Practical Goal: Execute these concrete phase actions: Define worker task specs and forbid unapproved external writes.

Factory Component: AI Office Workers Factory.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 34 Revenue Optimization Factory.; required table evidence: `AutomationRegistry`, `ApprovalsLog`, `EmailLog`, `BusinessDocuments`; future worker task tables `UNKNOWN`.; required agent evidence: `ORCHESTRATOR_AGENT`, `INFRASTRUCTURE_MANAGER_AGENT`, future AI Office Worker agents `UNKNOWN`..

Required Outputs: Worker role definitions; task boundaries; approval gates; escalation paths.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Define worker task specs and forbid unapproved external writes. -> produce required outputs: Worker role definitions; task boundaries; approval gates; escalation paths. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: Worker cannot send, create, deploy, or update production without approval. Practical verification: Worker drafts a follow-up task but does not send it. Completion evidence: Worker roles are bounded and auditable.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: Agent registry, Project Brain, roadmap.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: Worker patterns support technician-specific AI.

Next Phase Trigger: Worker patterns support technician-specific AI.
Deliverables: Worker role definitions; task boundaries; approval gates; escalation paths.
Required Tables: `AutomationRegistry`, `ApprovalsLog`, `EmailLog`, `BusinessDocuments`; future worker task tables `UNKNOWN`.
Required Agents: `ORCHESTRATOR_AGENT`, `INFRASTRUCTURE_MANAGER_AGENT`, future AI Office Worker agents `UNKNOWN`.
Practical Actions: Define worker task specs and forbid unapproved external writes.
Execution Algorithm: Review mission; define worker role; map allowed inputs/outputs; test with dry-run task.
Validation Tests: Worker cannot send, create, deploy, or update production without approval.
Practical Verification: Worker drafts a follow-up task but does not send it.
Completion Criteria: Worker roles are bounded and auditable.
Brain Updates: Agent registry, Project Brain, roadmap.
Dependencies: Phase 34 Revenue Optimization Factory.
Next Phase Trigger: Worker patterns support technician-specific AI.
Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| Worker role | task spec | define permissions | blocked writes | worker spec |
| Worker role | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |
| Worker role | Validation package | Run validation tests and practical verification before completion | Tests pass or blockers are documented | Validated output package |

## Phase 36 - AI Technician Factory

Objective: Support technicians with equipment knowledge, troubleshooting, service history, recommended parts, checklists, reports, and safety guidance.

Business Goal: Advance Tal AI Operating System readiness by using AI Technician Factory to support this verified objective: Support technicians with equipment knowledge, troubleshooting, service history, recommended parts, checklists, reports, and safety guidance.

Practical Goal: Execute these concrete phase actions: Map equipment/service history; produce recommendations with confidence and source notes.

Factory Component: AI Technician Factory.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 35 AI Office Workers Factory.; required table evidence: `ServiceReports`, `ReportEquipmentItems`, `PartsUsed`, `ProductsCatalog`, `InventoryStock`, `InspectionItems`.; required agent evidence: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future Technician Agent `UNKNOWN`..

Required Outputs: Technician assistant scope; equipment knowledge map; checklist rules; recommendation output format.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Map equipment/service history; produce recommendations with confidence and source notes. -> produce required outputs: Technician assistant scope; equipment knowledge map; checklist rules; recommendation output format. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: Recommendation cites service history and does not override technician judgment. Practical verification: Produce one equipment maintenance recommendation from mapped fields. Completion evidence: Technician guidance is evidence-backed and bounded.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: Service/equipment maps, Project Brain, roadmap.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: Technician and office workflows combine into Company OS.

Next Phase Trigger: Technician and office workflows combine into Company OS.
Deliverables: Technician assistant scope; equipment knowledge map; checklist rules; recommendation output format.
Required Tables: `ServiceReports`, `ReportEquipmentItems`, `PartsUsed`, `ProductsCatalog`, `InventoryStock`, `InspectionItems`.
Required Agents: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future Technician Agent `UNKNOWN`.
Practical Actions: Map equipment/service history; produce recommendations with confidence and source notes.
Execution Algorithm: Review mission; select equipment/service case; gather history; generate guidance; validate safety/approval.
Validation Tests: Recommendation cites service history and does not override technician judgment.
Practical Verification: Produce one equipment maintenance recommendation from mapped fields.
Completion Criteria: Technician guidance is evidence-backed and bounded.
Brain Updates: Service/equipment maps, Project Brain, roadmap.
Dependencies: Phase 35 AI Office Workers Factory.
Next Phase Trigger: Technician and office workflows combine into Company OS.
Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| Technician guidance | equipment case | collect history | cited evidence | guidance draft |
| Technician guidance | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |
| Technician guidance | Validation package | Run validation tests and practical verification before completion | Tests pass or blockers are documented | Validated output package |

## Phase 37 - Company Operating System

Objective: Unify operational modules into company OS with data, workflows, agents, dashboards, approvals, documents, and governance.

Business Goal: Advance Tal AI Operating System readiness by using Company Operating System to support this verified objective: Unify operational modules into company OS with data, workflows, agents, dashboards, approvals, documents, and governance.

Practical Goal: Execute these concrete phase actions: Map modules and dependencies; define system-of-record per domain; prevent premature migration.

Factory Component: Company Operating System.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 36 AI Technician Factory.; required table evidence: All verified business tables plus future OS tables `UNKNOWN`.; required agent evidence: All active governance agents plus future department agents `UNKNOWN`..

Required Outputs: Company OS module map; integration matrix; shared permission model; operating dashboard spec.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Map modules and dependencies; define system-of-record per domain; prevent premature migration. -> produce required outputs: Company OS module map; integration matrix; shared permission model; operating dashboard spec. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: Integration does not create duplicate system of record. Practical verification: Trace one customer-service-finance workflow across modules. Completion evidence: Modules integrate through governed interfaces.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: Architecture map, Project Brain, roadmap.

Agent Responsible: UNKNOWN

Review Agent: `INFRASTRUCTURE_MANAGER_AGENT`

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: Company OS patterns become reusable factories.

Next Phase Trigger: Company OS patterns become reusable factories.
Deliverables: Company OS module map; integration matrix; shared permission model; operating dashboard spec.
Required Tables: All verified business tables plus future OS tables `UNKNOWN`.
Required Agents: All active governance agents plus future department agents `UNKNOWN`.
Practical Actions: Map modules and dependencies; define system-of-record per domain; prevent premature migration.
Execution Algorithm: Review mission; select module integration; map data/workflow/agent; validate governance; document interface.
Validation Tests: Integration does not create duplicate system of record.
Practical Verification: Trace one customer-service-finance workflow across modules.
Completion Criteria: Modules integrate through governed interfaces.
Brain Updates: Architecture map, Project Brain, roadmap.
Dependencies: Phase 36 AI Technician Factory.
Next Phase Trigger: Company OS patterns become reusable factories.
Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| OS integration | module pair | map interface | no duplicate source | integration spec |
| OS integration | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |
| OS integration | Validation package | Run validation tests and practical verification before completion | Tests pass or blockers are documented | Validated output package |

## Phase 38 - AI Factory of Factories

Objective: Create reusable patterns, templates, agents, workflows, schemas, and deployment models for safe business factories.

Business Goal: Advance Tal AI Operating System readiness by using AI Factory of Factories to support this verified objective: Create reusable patterns, templates, agents, workflows, schemas, and deployment models for safe business factories.

Practical Goal: Execute these concrete phase actions: Extract reusable patterns from completed factories; validate before reuse.

Factory Component: AI Factory of Factories.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 37 Company OS.; required table evidence: `AutomationRegistry`, `HealthCheckRegistry`, `SystemHealthLog`; future template registry tables `UNKNOWN`.; required agent evidence: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future Factory Agent `UNKNOWN`..

Required Outputs: Factory template set; reuse rules; generation checklist; approval gates.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Extract reusable patterns from completed factories; validate before reuse. -> produce required outputs: Factory template set; reuse rules; generation checklist; approval gates. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: Template does not bypass source-of-truth or approval rules. Practical verification: Convert one workflow spec into a reusable template. Completion evidence: Templates are reusable with evidence and constraints.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: Template maps, Project Brain, roadmap.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: Reusable patterns support enterprise architecture factory.

Next Phase Trigger: Reusable patterns support enterprise architecture factory.
Deliverables: Factory template set; reuse rules; generation checklist; approval gates.
Required Tables: `AutomationRegistry`, `HealthCheckRegistry`, `SystemHealthLog`; future template registry tables `UNKNOWN`.
Required Agents: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future Factory Agent `UNKNOWN`.
Practical Actions: Extract reusable patterns from completed factories; validate before reuse.
Execution Algorithm: Review mission; select pattern; identify source factory; generalize safely; validate against target use.
Validation Tests: Template does not bypass source-of-truth or approval rules.
Practical Verification: Convert one workflow spec into a reusable template.
Completion Criteria: Templates are reusable with evidence and constraints.
Brain Updates: Template maps, Project Brain, roadmap.
Dependencies: Phase 37 Company OS.
Next Phase Trigger: Reusable patterns support enterprise architecture factory.
Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| Factory template | pattern extraction | generalize | constraints retained | template spec |
| Factory template | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |
| Factory template | Validation package | Run validation tests and practical verification before completion | Tests pass or blockers are documented | Validated output package |

## Phase 39 - Enterprise Architecture Factory

Objective: Maintain architecture maps, dependency graphs, source-of-truth rules, target comparisons, migration plans, and decision records.

Business Goal: Advance Tal AI Operating System readiness by using Enterprise Architecture Factory to support this verified objective: Maintain architecture maps, dependency graphs, source-of-truth rules, target comparisons, migration plans, and decision records.

Practical Goal: Execute these concrete phase actions: Keep architecture evidence current; require architecture review for new components.

Factory Component: Enterprise Architecture Factory.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 38 AI Factory of Factories.; required table evidence: `AutomationRegistry`; future architecture registry tables `UNKNOWN`.; required agent evidence: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, `GIT_AGENT`..

Required Outputs: Architecture registry; dependency graph; ADR process; target/current comparison process.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Keep architecture evidence current; require architecture review for new components. -> produce required outputs: Architecture registry; dependency graph; ADR process; target/current comparison process. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: Architecture claim cites source and reuse decision. Practical verification: Classify one target component as `EXISTS`, `PARTIAL`, or `MISSING`. Completion evidence: Architecture state is traceable and reviewable.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: Architecture docs, maps, decision log proposals, roadmap.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: Architecture maps feed business process factory.

Next Phase Trigger: Architecture maps feed business process factory.
Deliverables: Architecture registry; dependency graph; ADR process; target/current comparison process.
Required Tables: `AutomationRegistry`; future architecture registry tables `UNKNOWN`.
Required Agents: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, `GIT_AGENT`.
Practical Actions: Keep architecture evidence current; require architecture review for new components.
Execution Algorithm: Review mission; select architecture object; compare current/target; classify status; record decision proposal.
Validation Tests: Architecture claim cites source and reuse decision.
Practical Verification: Classify one target component as `EXISTS`, `PARTIAL`, or `MISSING`.
Completion Criteria: Architecture state is traceable and reviewable.
Brain Updates: Architecture docs, maps, decision log proposals, roadmap.
Dependencies: Phase 38 AI Factory of Factories.
Next Phase Trigger: Architecture maps feed business process factory.
Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| Architecture decision | target component | compare evidence | status allowed | architecture review |
| Architecture decision | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |
| Architecture decision | Validation package | Run validation tests and practical verification before completion | Tests pass or blockers are documented | Validated output package |

## Phase 40 - Business Process Factory

Objective: Map, optimize, automate, and monitor business processes across departments with versioned workflows and approval gates.

Business Goal: Advance Tal AI Operating System readiness by using Business Process Factory to support this verified objective: Map, optimize, automate, and monitor business processes across departments with versioned workflows and approval gates.

Practical Goal: Execute these concrete phase actions: Document process start/end, owner, inputs, outputs, approvals, risks, and metrics.

Factory Component: Business Process Factory.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 39 Enterprise Architecture Factory.; required table evidence: `AutomationRegistry`, `AutomationCommands`, `BusinessDocumentLog`, `SystemHealthLog`; future process tables `UNKNOWN`.; required agent evidence: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future Process Agent `UNKNOWN`..

Required Outputs: Process catalog; process versioning rules; automation candidates; monitoring rules.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Document process start/end, owner, inputs, outputs, approvals, risks, and metrics. -> produce required outputs: Process catalog; process versioning rules; automation candidates; monitoring rules. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: Process has owner, trigger, output, exception path, and metric. Practical verification: Map one end-to-end BusinessDocuments process. Completion evidence: Processes are versioned and automation-ready.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: Process map, Project Brain, roadmap.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: Process visibility supports customer success.

Next Phase Trigger: Process visibility supports customer success.
Deliverables: Process catalog; process versioning rules; automation candidates; monitoring rules.
Required Tables: `AutomationRegistry`, `AutomationCommands`, `BusinessDocumentLog`, `SystemHealthLog`; future process tables `UNKNOWN`.
Required Agents: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future Process Agent `UNKNOWN`.
Practical Actions: Document process start/end, owner, inputs, outputs, approvals, risks, and metrics.
Execution Algorithm: Review mission; select process; map steps; identify automation candidate; validate approval boundary.
Validation Tests: Process has owner, trigger, output, exception path, and metric.
Practical Verification: Map one end-to-end BusinessDocuments process.
Completion Criteria: Processes are versioned and automation-ready.
Brain Updates: Process map, Project Brain, roadmap.
Dependencies: Phase 39 Enterprise Architecture Factory.
Next Phase Trigger: Process visibility supports customer success.
Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| Process map | one workflow | map steps | owner/metric defined | process spec |
| Process map | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |
| Process map | Validation package | Run validation tests and practical verification before completion | Tests pass or blockers are documented | Validated output package |

## Phase 41 - Customer Success Factory

Objective: Track customer health, service quality, open issues, communication, follow-ups, retention, and maintenance opportunities.

Business Goal: Advance Tal AI Operating System readiness by using Customer Success Factory to support this verified objective: Track customer health, service quality, open issues, communication, follow-ups, retention, and maintenance opportunities.

Practical Goal: Execute these concrete phase actions: Define customer health from service and finance evidence; draft follow-ups only with approval.

Factory Component: Customer Success Factory.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 40 Business Process Factory.; required table evidence: `Customers_Final`, `ServiceReports`, `ReportEquipmentItems`, `BusinessDocuments`, `EmailLog`, `InvoiceMavenDocuments`.; required agent evidence: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future Customer Success Agent `UNKNOWN`..

Required Outputs: Customer health model; follow-up workflow; service quality metrics; retention alerts.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Define customer health from service and finance evidence; draft follow-ups only with approval. -> produce required outputs: Customer health model; follow-up workflow; service quality metrics; retention alerts. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: Customer recommendation cites evidence and does not send automatically. Practical verification: Produce one customer health summary from mapped sources. Completion evidence: Customer success actions are traceable and approval-gated.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: Customer success map, Project Brain, roadmap.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: Customer/supplier relationship model supports partner ecosystem.

Next Phase Trigger: Customer/supplier relationship model supports partner ecosystem.
Deliverables: Customer health model; follow-up workflow; service quality metrics; retention alerts.
Required Tables: `Customers_Final`, `ServiceReports`, `ReportEquipmentItems`, `BusinessDocuments`, `EmailLog`, `InvoiceMavenDocuments`.
Required Agents: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future Customer Success Agent `UNKNOWN`.
Practical Actions: Define customer health from service and finance evidence; draft follow-ups only with approval.
Execution Algorithm: Review mission; select customer health metric; map sources; calculate status; recommend action.
Validation Tests: Customer recommendation cites evidence and does not send automatically.
Practical Verification: Produce one customer health summary from mapped sources.
Completion Criteria: Customer success actions are traceable and approval-gated.
Brain Updates: Customer success map, Project Brain, roadmap.
Dependencies: Phase 40 Business Process Factory.
Next Phase Trigger: Customer/supplier relationship model supports partner ecosystem.
Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| Customer health | one customer | collect service/finance data | cited evidence | health summary |
| Customer health | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |
| Customer health | Validation package | Run validation tests and practical verification before completion | Tests pass or blockers are documented | Validated output package |

## Phase 42 - Partner Ecosystem Factory

Objective: Manage suppliers, contractors, partners, integrations, procurement relationships, and partner performance.

Business Goal: Advance Tal AI Operating System readiness by using Partner Ecosystem Factory to support this verified objective: Manage suppliers, contractors, partners, integrations, procurement relationships, and partner performance.

Practical Goal: Execute these concrete phase actions: Map suppliers and products; define partner performance evidence; approval-gate partner communications/orders.

Factory Component: Partner Ecosystem Factory.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 41 Customer Success Factory.; required table evidence: `SuppliersProducts`, `InvoiceMavenItems`, `ProductsCatalog`, `InventoryStock`; future partner tables `UNKNOWN`.; required agent evidence: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future Partner Agent `UNKNOWN`..

Required Outputs: Partner registry design; supplier performance metrics; integration rules; procurement relationship map.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Map suppliers and products; define partner performance evidence; approval-gate partner communications/orders. -> produce required outputs: Partner registry design; supplier performance metrics; integration rules; procurement relationship map. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: Partner action has source, approval, and no automatic order. Practical verification: Summarize one supplier/product relationship. Completion evidence: Partner workflows are governed and measurable.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: Partner map, Project Brain, roadmap.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: Supplier/product data feeds Product Factory.

Next Phase Trigger: Supplier/product data feeds Product Factory.
Deliverables: Partner registry design; supplier performance metrics; integration rules; procurement relationship map.
Required Tables: `SuppliersProducts`, `InvoiceMavenItems`, `ProductsCatalog`, `InventoryStock`; future partner tables `UNKNOWN`.
Required Agents: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future Partner Agent `UNKNOWN`.
Practical Actions: Map suppliers and products; define partner performance evidence; approval-gate partner communications/orders.
Execution Algorithm: Review mission; select partner workflow; map supplier/product/history; define metric; recommend action.
Validation Tests: Partner action has source, approval, and no automatic order.
Practical Verification: Summarize one supplier/product relationship.
Completion Criteria: Partner workflows are governed and measurable.
Brain Updates: Partner map, Project Brain, roadmap.
Dependencies: Phase 41 Customer Success Factory.
Next Phase Trigger: Supplier/product data feeds Product Factory.
Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| Partner workflow | supplier relation | map data | no order | partner summary |
| Partner workflow | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |
| Partner workflow | Validation package | Run validation tests and practical verification before completion | Tests pass or blockers are documented | Validated output package |

## Phase 43 - Product Factory

Objective: Manage products, service packages, parts, pricing, bundles, compatibility, lifecycle, and productized offerings.

Business Goal: Advance Tal AI Operating System readiness by using Product Factory to support this verified objective: Manage products, service packages, parts, pricing, bundles, compatibility, lifecycle, and productized offerings.

Practical Goal: Execute these concrete phase actions: Map catalog to Maven items and service usage; identify duplicates and price gaps.

Factory Component: Product Factory.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 42 Partner Ecosystem Factory.; required table evidence: `ProductsCatalog`, `InvoiceMavenItems`, `InvoiceMavenDocumentItems`, `SuppliersProducts`, `InventoryStock`, `PartsUsed`.; required agent evidence: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future Product Agent `UNKNOWN`..

Required Outputs: Product model; package rules; compatibility map; pricing governance.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Map catalog to Maven items and service usage; identify duplicates and price gaps. -> produce required outputs: Product model; package rules; compatibility map; pricing governance. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: Product recommendation cites catalog/history/supplier evidence. Practical verification: Reconcile one product across `ProductsCatalog` and `InvoiceMavenItems`. Completion evidence: Product data supports service, sales, and inventory safely.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: Product map, Project Brain, roadmap.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: Product/equipment knowledge supports Compressor Expert.

Next Phase Trigger: Product/equipment knowledge supports Compressor Expert.
Deliverables: Product model; package rules; compatibility map; pricing governance.
Required Tables: `ProductsCatalog`, `InvoiceMavenItems`, `InvoiceMavenDocumentItems`, `SuppliersProducts`, `InventoryStock`, `PartsUsed`.
Required Agents: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future Product Agent `UNKNOWN`.
Practical Actions: Map catalog to Maven items and service usage; identify duplicates and price gaps.
Execution Algorithm: Review mission; select product/part; compare catalog/history/supplier; define lifecycle/pricing recommendation.
Validation Tests: Product recommendation cites catalog/history/supplier evidence.
Practical Verification: Reconcile one product across `ProductsCatalog` and `InvoiceMavenItems`.
Completion Criteria: Product data supports service, sales, and inventory safely.
Brain Updates: Product map, Project Brain, roadmap.
Dependencies: Phase 42 Partner Ecosystem Factory.
Next Phase Trigger: Product/equipment knowledge supports Compressor Expert.
Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| Product mapping | one SKU/part | reconcile sources | source-backed | product record spec |
| Product mapping | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |
| Product mapping | Validation package | Run validation tests and practical verification before completion | Tests pass or blockers are documented | Validated output package |

## Phase 44 - Compressor Expert Factory

Objective: Build domain expert layer for compressor models, maintenance intervals, parts, service types, failure patterns, and technician guidance.

Business Goal: Advance Tal AI Operating System readiness by using Compressor Expert Factory to support this verified objective: Build domain expert layer for compressor models, maintenance intervals, parts, service types, failure patterns, and technician guidance.

Practical Goal: Execute these concrete phase actions: Extract equipment patterns from reports; define guidance with confidence and source evidence.

Factory Component: Compressor Expert Factory.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 43 Product Factory.; required table evidence: `ReportEquipmentItems`, `ServiceReports`, `PartsUsed`, `ProductsCatalog`, `InspectionItems`, `Lists`.; required agent evidence: future Compressor Expert Agent `UNKNOWN`, `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`..

Required Outputs: Compressor knowledge model; maintenance rules; parts compatibility; failure pattern catalog.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Extract equipment patterns from reports; define guidance with confidence and source evidence. -> produce required outputs: Compressor knowledge model; maintenance rules; parts compatibility; failure pattern catalog. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: Expert output separates evidence from recommendation. Practical verification: Produce one maintenance interval recommendation with source records. Completion evidence: Compressor knowledge is evidence-backed and technician-approved.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: Compressor knowledge map, Project Brain, roadmap.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: Domain knowledge feeds Tal AI Master Brain.

Next Phase Trigger: Domain knowledge feeds Tal AI Master Brain.
Deliverables: Compressor knowledge model; maintenance rules; parts compatibility; failure pattern catalog.
Required Tables: `ReportEquipmentItems`, `ServiceReports`, `PartsUsed`, `ProductsCatalog`, `InspectionItems`, `Lists`.
Required Agents: future Compressor Expert Agent `UNKNOWN`, `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`.
Practical Actions: Extract equipment patterns from reports; define guidance with confidence and source evidence.
Execution Algorithm: Review mission; select compressor/equipment class; collect history; infer pattern only with evidence; document unknowns.
Validation Tests: Expert output separates evidence from recommendation.
Practical Verification: Produce one maintenance interval recommendation with source records.
Completion Criteria: Compressor knowledge is evidence-backed and technician-approved.
Brain Updates: Compressor knowledge map, Project Brain, roadmap.
Dependencies: Phase 43 Product Factory.
Next Phase Trigger: Domain knowledge feeds Tal AI Master Brain.
Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| Compressor knowledge | model/part | collect evidence | separate evidence/recommendation | expert note |
| Compressor knowledge | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |
| Compressor knowledge | Validation package | Run validation tests and practical verification before completion | Tests pass or blockers are documented | Validated output package |

## Phase 45 - Tal AI Master Brain

Objective: Connect project memory, business memory, architecture, agents, workflows, data, and decisions.

Business Goal: Advance Tal AI Operating System readiness by using Tal AI Master Brain to support this verified objective: Connect project memory, business memory, architecture, agents, workflows, data, and decisions.

Practical Goal: Execute these concrete phase actions: Define what memory is authoritative; connect Project Brain to business facts without mixing stale and live sources.

Factory Component: Tal AI Master Brain.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 44 Compressor Expert Factory.; required table evidence: All verified operational and governance tables; future master brain tables `UNKNOWN`.; required agent evidence: `PROJECT_BRAIN_AGENT`, `INFRASTRUCTURE_MANAGER_AGENT`, future Master Brain Agent `UNKNOWN`..

Required Outputs: Master knowledge architecture; cross-domain retrieval rules; source citation rules; governance link map.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Define what memory is authoritative; connect Project Brain to business facts without mixing stale and live sources. -> produce required outputs: Master knowledge architecture; cross-domain retrieval rules; source citation rules; governance link map. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: Answer cites correct source and identifies stale/conflicting sources. Practical verification: Answer "what is current phase and protected systems?" from documented sources. Completion evidence: Master Brain can retrieve governed answers without assumption.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: Project Brain master, roadmap, maps, checkpoint.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: Master Brain supports platform capabilities.

Next Phase Trigger: Master Brain supports platform capabilities.
Deliverables: Master knowledge architecture; cross-domain retrieval rules; source citation rules; governance link map.
Required Tables: All verified operational and governance tables; future master brain tables `UNKNOWN`.
Required Agents: `PROJECT_BRAIN_AGENT`, `INFRASTRUCTURE_MANAGER_AGENT`, future Master Brain Agent `UNKNOWN`.
Practical Actions: Define what memory is authoritative; connect Project Brain to business facts without mixing stale and live sources.
Execution Algorithm: Review mission; select knowledge domain; map source hierarchy; define retrieval/update rules; validate citation.
Validation Tests: Answer cites correct source and identifies stale/conflicting sources.
Practical Verification: Answer "what is current phase and protected systems?" from documented sources.
Completion Criteria: Master Brain can retrieve governed answers without assumption.
Brain Updates: Project Brain master, roadmap, maps, checkpoint.
Dependencies: Phase 44 Compressor Expert Factory.
Next Phase Trigger: Master Brain supports platform capabilities.
Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| Master memory | domain link | map source authority | citation required | memory architecture |
| Master memory | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |
| Master memory | Validation package | Run validation tests and practical verification before completion | Tests pass or blockers are documented | Validated output package |

## Phase 46 - Platform Factory

Objective: Develop reusable platform capabilities for tenants, authentication, permissions, integrations, configuration, deployment, observability, and admin.

Business Goal: Advance Tal AI Operating System readiness by using Platform Factory to support this verified objective: Develop reusable platform capabilities for tenants, authentication, permissions, integrations, configuration, deployment, observability, and admin.

Practical Goal: Execute these concrete phase actions: Design platform services from approved requirements; do not deploy or create infrastructure without approval.

Factory Component: Platform Factory.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 45 Tal AI Master Brain.; required table evidence: Future platform tables `UNKNOWN`; current references: `SecretAccessLog`, `ApprovalsLog`, `AutomationRegistry`.; required agent evidence: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future Platform Agent `UNKNOWN`..

Required Outputs: Platform capability map; tenant/auth/permission design; integration and deployment policy.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools; sandbox/design tooling only after approval; no infrastructure creation unless separately approved.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Design platform services from approved requirements; do not deploy or create infrastructure without approval. -> produce required outputs: Platform capability map; tenant/auth/permission design; integration and deployment policy. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: Platform capability has tenant, permission, audit, rollback, and approval model. Practical verification: Walk one admin permission scenario. Completion evidence: Platform capabilities are designed before implementation.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: Platform architecture, Project Brain, roadmap.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: Platform services support Template Factory.

Next Phase Trigger: Platform services support Template Factory.
Deliverables: Platform capability map; tenant/auth/permission design; integration and deployment policy.
Required Tables: Future platform tables `UNKNOWN`; current references: `SecretAccessLog`, `ApprovalsLog`, `AutomationRegistry`.
Required Agents: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future Platform Agent `UNKNOWN`.
Practical Actions: Design platform services from approved requirements; do not deploy or create infrastructure without approval.
Execution Algorithm: Review mission; select platform capability; map required data/permission; design interface; validate security.
Validation Tests: Platform capability has tenant, permission, audit, rollback, and approval model.
Practical Verification: Walk one admin permission scenario.
Completion Criteria: Platform capabilities are designed before implementation.
Brain Updates: Platform architecture, Project Brain, roadmap.
Dependencies: Phase 45 Tal AI Master Brain.
Next Phase Trigger: Platform services support Template Factory.
Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| Platform capability | service design | define permissions/audit | no deployment | platform spec |
| Platform capability | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |
| Platform capability | Validation package | Run validation tests and practical verification before completion | Tests pass or blockers are documented | Validated output package |

## Phase 47 - Template Factory

Objective: Create reusable templates for documents, workflows, agents, tables, dashboards, prompts, tests, reports, and deployment patterns.

Business Goal: Advance Tal AI Operating System readiness by using Template Factory to support this verified objective: Create reusable templates for documents, workflows, agents, tables, dashboards, prompts, tests, reports, and deployment patterns.

Practical Goal: Execute these concrete phase actions: Convert proven specs into reusable templates; attach validation and forbidden actions.

Factory Component: Template Factory.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 46 Platform Factory.; required table evidence: Future template registry tables `UNKNOWN`; current docs and maps as source evidence.; required agent evidence: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future Template Agent `UNKNOWN`..

Required Outputs: Template registry design; template validation rules; reuse instructions.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Convert proven specs into reusable templates; attach validation and forbidden actions. -> produce required outputs: Template registry design; template validation rules; reuse instructions. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: Template includes required inputs, actions, validation, output, and approval gates. Practical verification: Instantiate one documentation template with sample values. Completion evidence: Templates are reusable and governed.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: Template docs, Project Brain, roadmap.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: Templates can be distributed through marketplace.

Next Phase Trigger: Templates can be distributed through marketplace.
Deliverables: Template registry design; template validation rules; reuse instructions.
Required Tables: Future template registry tables `UNKNOWN`; current docs and maps as source evidence.
Required Agents: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future Template Agent `UNKNOWN`.
Practical Actions: Convert proven specs into reusable templates; attach validation and forbidden actions.
Execution Algorithm: Review mission; select artifact; extract template; define parameters; validate with sample.
Validation Tests: Template includes required inputs, actions, validation, output, and approval gates.
Practical Verification: Instantiate one documentation template with sample values.
Completion Criteria: Templates are reusable and governed.
Brain Updates: Template docs, Project Brain, roadmap.
Dependencies: Phase 46 Platform Factory.
Next Phase Trigger: Templates can be distributed through marketplace.
Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| Template creation | artifact type | extract parameters | sample instantiation | template |
| Template creation | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |
| Template creation | Validation package | Run validation tests and practical verification before completion | Tests pass or blockers are documented | Validated output package |

## Phase 48 - Enterprise Marketplace

Objective: Enable reusable modules, agents, templates, integrations, workflows, and capabilities to be selected and deployed across companies.

Business Goal: Advance Tal AI Operating System readiness by using Enterprise Marketplace to support this verified objective: Enable reusable modules, agents, templates, integrations, workflows, and capabilities to be selected and deployed across companies.

Practical Goal: Execute these concrete phase actions: Define catalog item contract; require sandbox validation before deployment.

Factory Component: Enterprise Marketplace.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 47 Template Factory.; required table evidence: Future marketplace tables `UNKNOWN`; current references: `AutomationRegistry`, `ApprovalsLog`.; required agent evidence: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future Marketplace Agent `UNKNOWN`..

Required Outputs: Marketplace catalog design; module metadata; installation approval process; compatibility checks.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Define catalog item contract; require sandbox validation before deployment. -> produce required outputs: Marketplace catalog design; module metadata; installation approval process; compatibility checks. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: Marketplace item cannot deploy without approval and compatibility evidence. Practical verification: Evaluate one template as a marketplace candidate. Completion evidence: Marketplace distribution is controlled and auditable.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: Marketplace map, Project Brain, roadmap.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: Marketplace items can include AI research outputs.

Next Phase Trigger: Marketplace items can include AI research outputs.
Deliverables: Marketplace catalog design; module metadata; installation approval process; compatibility checks.
Required Tables: Future marketplace tables `UNKNOWN`; current references: `AutomationRegistry`, `ApprovalsLog`.
Required Agents: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future Marketplace Agent `UNKNOWN`.
Practical Actions: Define catalog item contract; require sandbox validation before deployment.
Execution Algorithm: Review mission; select module; verify compatibility; define install plan; require approval.
Validation Tests: Marketplace item cannot deploy without approval and compatibility evidence.
Practical Verification: Evaluate one template as a marketplace candidate.
Completion Criteria: Marketplace distribution is controlled and auditable.
Brain Updates: Marketplace map, Project Brain, roadmap.
Dependencies: Phase 47 Template Factory.
Next Phase Trigger: Marketplace items can include AI research outputs.
Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| Marketplace item | module contract | define metadata | compatibility check | catalog spec |
| Marketplace item | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |
| Marketplace item | Validation package | Run validation tests and practical verification before completion | Tests pass or blockers are documented | Validated output package |

## Phase 49 - AI Research Factory

Objective: Experiment with models, prompts, evaluations, automation patterns, agent workflows, and BI methods in a safe sandbox.

Business Goal: Advance Tal AI Operating System readiness by using AI Research Factory to support this verified objective: Experiment with models, prompts, evaluations, automation patterns, agent workflows, and BI methods in a safe sandbox.

Practical Goal: Execute these concrete phase actions: Run sandbox-only experiments; record results; never promote to production without approval.

Factory Component: AI Research Factory.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 48 Enterprise Marketplace.; required table evidence: Future experiment tables `UNKNOWN`; current references: `AIDraftSuggestions`, `ApprovalsLog`, Project Brain docs.; required agent evidence: `AI_DRAFT_AGENT`, `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future Research Agent `UNKNOWN`..

Required Outputs: Research protocol; experiment registry design; evaluation reports; promotion criteria.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Run sandbox-only experiments; record results; never promote to production without approval. -> produce required outputs: Research protocol; experiment registry design; evaluation reports; promotion criteria. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: Experiment uses approved data and cannot write production. Practical verification: Run/document one prompt evaluation with non-production output. Completion evidence: Research outputs are evaluated and promotion-gated.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: Research notes, lessons, Project Brain, roadmap.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: Validated research feeds autonomous business workflows.

Next Phase Trigger: Validated research feeds autonomous business workflows.
Deliverables: Research protocol; experiment registry design; evaluation reports; promotion criteria.
Required Tables: Future experiment tables `UNKNOWN`; current references: `AIDraftSuggestions`, `ApprovalsLog`, Project Brain docs.
Required Agents: `AI_DRAFT_AGENT`, `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future Research Agent `UNKNOWN`.
Practical Actions: Run sandbox-only experiments; record results; never promote to production without approval.
Execution Algorithm: Review mission; define hypothesis; select safe data; run experiment; evaluate; recommend next step.
Validation Tests: Experiment uses approved data and cannot write production.
Practical Verification: Run/document one prompt evaluation with non-production output.
Completion Criteria: Research outputs are evaluated and promotion-gated.
Brain Updates: Research notes, lessons, Project Brain, roadmap.
Dependencies: Phase 48 Enterprise Marketplace.
Next Phase Trigger: Validated research feeds autonomous business workflows.
Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| AI experiment | hypothesis | run safe eval | approved data | experiment report |
| AI experiment | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |
| AI experiment | Validation package | Run validation tests and practical verification before completion | Tests pass or blockers are documented | Validated output package |

## Phase 50 - Autonomous Business Factory

Objective: Move toward approved autonomous operations where agents recommend, simulate, validate, and execute bounded tasks under governance.

Business Goal: Advance Tal AI Operating System readiness by using Autonomous Business Factory to support this verified objective: Move toward approved autonomous operations where agents recommend, simulate, validate, and execute bounded tasks under governance.

Practical Goal: Execute these concrete phase actions: Define autonomy levels; keep high-risk actions approval-gated; validate with simulations first.

Factory Component: Autonomous Business Factory.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 49 AI Research Factory.; required table evidence: `AutomationRegistry`, `ApprovalsLog`, `SystemHealthLog`; future autonomy tables `UNKNOWN`.; required agent evidence: `ORCHESTRATOR_AGENT`, `INFRASTRUCTURE_MANAGER_AGENT`, future autonomous worker agents `UNKNOWN`..

Required Outputs: Autonomy level model; bounded execution rules; simulation requirements; escalation paths.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Define autonomy levels; keep high-risk actions approval-gated; validate with simulations first. -> produce required outputs: Autonomy level model; bounded execution rules; simulation requirements; escalation paths. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: Autonomous action is bounded, reversible, monitored, and approved. Practical verification: Simulate a low-risk internal task without production write. Completion evidence: Autonomy is controlled by policy and evidence.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: Autonomy policy, Project Brain, roadmap.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: Autonomous decisions need knowledge graph context.

Next Phase Trigger: Autonomous decisions need knowledge graph context.
Deliverables: Autonomy level model; bounded execution rules; simulation requirements; escalation paths.
Required Tables: `AutomationRegistry`, `ApprovalsLog`, `SystemHealthLog`; future autonomy tables `UNKNOWN`.
Required Agents: `ORCHESTRATOR_AGENT`, `INFRASTRUCTURE_MANAGER_AGENT`, future autonomous worker agents `UNKNOWN`.
Practical Actions: Define autonomy levels; keep high-risk actions approval-gated; validate with simulations first.
Execution Algorithm: Review mission; classify autonomy level; simulate; validate safety; require approval before execution.
Validation Tests: Autonomous action is bounded, reversible, monitored, and approved.
Practical Verification: Simulate a low-risk internal task without production write.
Completion Criteria: Autonomy is controlled by policy and evidence.
Brain Updates: Autonomy policy, Project Brain, roadmap.
Dependencies: Phase 49 AI Research Factory.
Next Phase Trigger: Autonomous decisions need knowledge graph context.
Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| Autonomous task | bounded action | simulate | policy pass | autonomy case file |
| Autonomous task | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |
| Autonomous task | Validation package | Run validation tests and practical verification before completion | Tests pass or blockers are documented | Validated output package |

## Phase 51 - Global Knowledge Graph

Objective: Connect companies, customers, equipment, documents, service events, products, workflows, decisions, and outcomes.

Business Goal: Advance Tal AI Operating System readiness by using Global Knowledge Graph to support this verified objective: Connect companies, customers, equipment, documents, service events, products, workflows, decisions, and outcomes.

Practical Goal: Execute these concrete phase actions: Map nodes and edges from verified sources; preserve source lineage.

Factory Component: Global Knowledge Graph.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 50 Autonomous Business Factory.; required table evidence: All verified business/governance tables; future graph tables `UNKNOWN`.; required agent evidence: `PROJECT_BRAIN_AGENT`, `INFRASTRUCTURE_MANAGER_AGENT`, future Knowledge Graph Agent `UNKNOWN`..

Required Outputs: Graph entity model; relationship map; source lineage rules; query examples.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Map nodes and edges from verified sources; preserve source lineage. -> produce required outputs: Graph entity model; relationship map; source lineage rules; query examples. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: Every graph edge has source table/file and confidence. Practical verification: Map customer -> equipment -> service report -> business document relationship. Completion evidence: Graph relationships are traceable and non-duplicative.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: Knowledge graph map, Project Brain, roadmap.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: Graph context supports Digital Board.

Next Phase Trigger: Graph context supports Digital Board.
Deliverables: Graph entity model; relationship map; source lineage rules; query examples.
Required Tables: All verified business/governance tables; future graph tables `UNKNOWN`.
Required Agents: `PROJECT_BRAIN_AGENT`, `INFRASTRUCTURE_MANAGER_AGENT`, future Knowledge Graph Agent `UNKNOWN`.
Practical Actions: Map nodes and edges from verified sources; preserve source lineage.
Execution Algorithm: Review mission; select relationship; map source fields; define edge; validate lineage.
Validation Tests: Every graph edge has source table/file and confidence.
Practical Verification: Map customer -> equipment -> service report -> business document relationship.
Completion Criteria: Graph relationships are traceable and non-duplicative.
Brain Updates: Knowledge graph map, Project Brain, roadmap.
Dependencies: Phase 50 Autonomous Business Factory.
Next Phase Trigger: Graph context supports Digital Board.
Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| Graph relationship | node/edge | map source | lineage present | graph spec |
| Graph relationship | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |
| Graph relationship | Validation package | Run validation tests and practical verification before completion | Tests pass or blockers are documented | Validated output package |

## Phase 52 - Digital Board of Directors

Objective: Create strategic advisory layer with AI board roles for finance, operations, risk, sales, customers, technology, and governance.

Business Goal: Advance Tal AI Operating System readiness by using Digital Board of Directors to support this verified objective: Create strategic advisory layer with AI board roles for finance, operations, risk, sales, customers, technology, and governance.

Practical Goal: Execute these concrete phase actions: Define board roles as advisory; require evidence from KPIs and maps.

Factory Component: Digital Board of Directors.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 51 Global Knowledge Graph.; required table evidence: BI, health, finance, customer, and operations sources; future board tables `UNKNOWN`.; required agent evidence: future board agents `UNKNOWN`, `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`..

Required Outputs: Board role definitions; advisory report templates; meeting cadence; decision escalation rules.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Define board roles as advisory; require evidence from KPIs and maps. -> produce required outputs: Board role definitions; advisory report templates; meeting cadence; decision escalation rules. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: Board cannot approve or execute production actions. Practical verification: Produce one risk advisory from health/roadmap evidence. Completion evidence: Board outputs are evidence-backed recommendations only.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: Board governance docs, Project Brain, roadmap.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: Board scenarios feed Enterprise Simulator.

Next Phase Trigger: Board scenarios feed Enterprise Simulator.
Deliverables: Board role definitions; advisory report templates; meeting cadence; decision escalation rules.
Required Tables: BI, health, finance, customer, and operations sources; future board tables `UNKNOWN`.
Required Agents: future board agents `UNKNOWN`, `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`.
Practical Actions: Define board roles as advisory; require evidence from KPIs and maps.
Execution Algorithm: Review mission; select board role; gather metrics; produce advisory; route human decision.
Validation Tests: Board cannot approve or execute production actions.
Practical Verification: Produce one risk advisory from health/roadmap evidence.
Completion Criteria: Board outputs are evidence-backed recommendations only.
Brain Updates: Board governance docs, Project Brain, roadmap.
Dependencies: Phase 51 Global Knowledge Graph.
Next Phase Trigger: Board scenarios feed Enterprise Simulator.
Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| Board advisory | role report | collect evidence | advisory only | board memo |
| Board advisory | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |
| Board advisory | Validation package | Run validation tests and practical verification before completion | Tests pass or blockers are documented | Validated output package |

## Phase 53 - Enterprise Simulator

Objective: Simulate business decisions, workflow changes, pricing, staffing, inventory, service load, and migration impact before execution.

Business Goal: Advance Tal AI Operating System readiness by using Enterprise Simulator to support this verified objective: Simulate business decisions, workflow changes, pricing, staffing, inventory, service load, and migration impact before execution.

Practical Goal: Execute these concrete phase actions: Build scenario models from verified data; keep simulation separate from production action.

Factory Component: Enterprise Simulator.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 52 Digital Board of Directors.; required table evidence: Relevant domain tables by scenario; future simulation tables `UNKNOWN`.; required agent evidence: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future Simulator Agent `UNKNOWN`..

Required Outputs: Simulation model catalog; scenario inputs; impact report format; approval-to-execute rules.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Build scenario models from verified data; keep simulation separate from production action. -> produce required outputs: Simulation model catalog; scenario inputs; impact report format; approval-to-execute rules. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: Simulation distinguishes assumptions from verified data. Practical verification: Simulate one migration or pricing scenario with documented assumptions. Completion evidence: Simulations support decisions without executing changes.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: Simulation map, Project Brain, roadmap.

Agent Responsible: `INFRASTRUCTURE_MANAGER_AGENT`

Review Agent: `PROJECT_BRAIN_AGENT` validates memory impact; human approval reviews production-impacting decisions.

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: Simulator supports Tal AI Operating System decisions.

Next Phase Trigger: Simulator supports Tal AI Operating System decisions.
Deliverables: Simulation model catalog; scenario inputs; impact report format; approval-to-execute rules.
Required Tables: Relevant domain tables by scenario; future simulation tables `UNKNOWN`.
Required Agents: `INFRASTRUCTURE_MANAGER_AGENT`, `PROJECT_BRAIN_AGENT`, future Simulator Agent `UNKNOWN`.
Practical Actions: Build scenario models from verified data; keep simulation separate from production action.
Execution Algorithm: Review mission; define scenario; collect inputs; simulate outcome; validate assumptions; recommend decision.
Validation Tests: Simulation distinguishes assumptions from verified data.
Practical Verification: Simulate one migration or pricing scenario with documented assumptions.
Completion Criteria: Simulations support decisions without executing changes.
Brain Updates: Simulation map, Project Brain, roadmap.
Dependencies: Phase 52 Digital Board of Directors.
Next Phase Trigger: Simulator supports Tal AI Operating System decisions.
Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| Simulation | scenario | model assumptions | assumptions explicit | impact report |
| Simulation | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |
| Simulation | Validation package | Run validation tests and practical verification before completion | Tests pass or blockers are documented | Validated output package |

## Phase 54 - Tal AI Operating System

Objective: Unify all factories into a full AI operating system for business management, automation, governance, knowledge, execution, and continuous improvement.

Business Goal: Advance Tal AI Operating System readiness by using Tal AI Operating System to support this verified objective: Unify all factories into a full AI operating system for business management, automation, governance, knowledge, execution, and continuous improvement.

Practical Goal: Execute these concrete phase actions: Integrate only approved modules; validate end-to-end governance; run staged release with rollback.

Factory Component: Tal AI Operating System.

Required Inputs: Pre-Mission Review output; current roadmap/current task evidence; dependencies: Phase 53 Enterprise Simulator and all required predecessor modules.; required table evidence: All approved platform/business/governance tables; current verified tables remain source references until migrated.; required agent evidence: All approved agents; future OS agents `UNKNOWN`..

Required Outputs: OS architecture; module integration map; governance model; operating procedures; release/rollback plan.

Tools Used: file read/search with `rg`; `git status --short`; `git diff`; Pre-Mission Review template; no production-write tools.

Source Files: `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`.

Execution Flow: START -> run Pre-Mission Review -> read source files -> verify existing assets and required inputs -> execute phase actions: Integrate only approved modules; validate end-to-end governance; run staged release with rollback. -> produce required outputs: OS architecture; module integration map; governance model; operating procedures; release/rollback plan. -> run validation procedure -> propose brain updates -> END.

Decision Logic: If existing assets cover the need, reuse or extend them. If required input evidence is missing, mark it UNKNOWN and stop for discovery. If the phase requires production, schema, customer-facing, financial, deployment, setup, Drive, Maven, AppSheet, Google Sheets, or Apps Script writes, stop and request explicit approval. If validation fails, use the recovery procedure before moving forward.

Evidence Required: Source citations for objective, dependencies, tables, agents, actions, validation, and outputs; evidence must include `PROJECT_OPERATING_PROTOCOL.md`; `PROJECT_INDEX.md`; `project-brain/roadmap/ROADMAP.md`; `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`; `agents/PRE_MISSION_REVIEW_SYSTEM.md`; `agents/INFRASTRUCTURE_MANAGER_AGENT.md`; `agents/AGENT_REGISTRY.md`; `data-sources/tools/SHEETS_REGISTRY.md`; `project-brain/PROJECT_BRAIN_MASTER.md`; `project-brain/CURRENT_TASK.md`; `project-brain/maps/*`. Missing or unverified evidence remains UNKNOWN.

Validation Procedure: Run these validation checks: End-to-end process has source-of-truth, approval, audit, rollback, health, and verification. Practical verification: Run one full sandbox workflow from intake to output verification and brain update proposal. Completion evidence: Operating system functions as governed, auditable, modular platform.

Approval Rules: Documentation-only work may proceed within mission scope. Any production-impacting action, external write, schema change, deployment, setup function, Maven document action, AppSheet production edit, Google Sheets write, Drive permission/file change, customer email, queue retry/repair, or migration execution requires explicit human approval before action.

Failure Conditions: Stop if required source files are missing, source hierarchy conflicts cannot be resolved, required input evidence is UNKNOWN and blocks output, validation fails, protected systems would be changed without approval, or the responsible/review agents cannot verify the output.

Recovery Procedure: Stop execution -> record failed validation or missing evidence -> mark unresolved facts UNKNOWN -> route to Discovery or Infrastructure Manager -> recommend the smallest read-only next step -> update or propose Project Brain notes only after evidence is verified.

Brain Updates: Master Brain, roadmap, architecture, maps, registries, checkpoint.

Agent Responsible: UNKNOWN

Review Agent: `INFRASTRUCTURE_MANAGER_AGENT`

Completion Test: The phase is complete only when outputs exist, validation passes, practical verification is evidence-backed, brain updates are completed or proposed, no protected system was modified without approval, and next phase trigger is satisfied: Continuous improvement loop, not a new phase, unless approved by roadmap.

Next Phase Trigger: Continuous improvement loop, not a new phase, unless approved by roadmap.
Deliverables: OS architecture; module integration map; governance model; operating procedures; release/rollback plan.
Required Tables: All approved platform/business/governance tables; current verified tables remain source references until migrated.
Required Agents: All approved agents; future OS agents `UNKNOWN`.
Practical Actions: Integrate only approved modules; validate end-to-end governance; run staged release with rollback.
Execution Algorithm: Review mission; select OS capability; verify dependencies; integrate in sandbox; validate; require approval for release.
Validation Tests: End-to-end process has source-of-truth, approval, audit, rollback, health, and verification.
Practical Verification: Run one full sandbox workflow from intake to output verification and brain update proposal.
Completion Criteria: Operating system functions as governed, auditable, modular platform.
Brain Updates: Master Brain, roadmap, architecture, maps, registries, checkpoint.
Dependencies: Phase 53 Enterprise Simulator and all required predecessor modules.
Next Phase Trigger: Continuous improvement loop, not a new phase, unless approved by roadmap.
Mission Breakdown:
| Mission | Sub-Mission | Action | Validation | Output |
|---|---|---|---|---|
| OS capability | end-to-end workflow | integrate sandbox path | governance gates pass | OS release candidate |
| OS capability | Evidence package | Check required tables, agents, maps, registries, protected systems, and UNKNOWN gaps before execution | Every claim cites evidence or is marked UNKNOWN | Evidence package |
| OS capability | Validation package | Run validation tests and practical verification before completion | Tests pass or blockers are documented | Validated output package |

## Completion Gate For Any Phase

A phase is complete only when:

- Pre-Mission Review was completed.
- Mission, sub-missions, actions, validations, and outputs are documented.
- Required tables and agents were checked against current registries.
- Existing assets were reused or extension was justified.
- Protected systems were identified.
- Validation tests passed or failures were documented.
- Practical verification passed using evidence, not assumptions.
- Project Brain updates were completed or proposed.
- Checkpoint was created or proposed if a milestone was reached.
- No forbidden production action occurred without explicit approval.
