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
- `project-brain/current/CURRENT_TASK.md`
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

Brain Updates: Update/propose `project-brain/PROJECT_BRAIN_MASTER.md`, `project-brain/current/CURRENT_TASK.md`, roadmap, maps, and checkpoint.

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
