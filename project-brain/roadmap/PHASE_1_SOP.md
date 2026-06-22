# PHASE 1 SOP - DIGITAL TWIN FOUNDATION

Status: Draft SOP  
Phase: PHASE 1 - Digital Twin Foundation  
Mode: Documentation only; read-only execution procedures  
Authority: `PROJECT_OPERATING_PROTOCOL.md`, `agents/PRE_MISSION_REVIEW_SYSTEM.md`, `agents/INFRASTRUCTURE_MANAGER_AGENT.md`

## Operating Rule

This SOP converts `project-brain/roadmap/PHASE_1_PLAYBOOK.md` into practical execution procedures.

Every mission must be executable as:

```text
Mission
-> Sub-Mission
-> Action
-> Validation
-> Output
```

No mission in this SOP authorizes production changes. Do not modify Apps Script, Google Sheets, AppSheet, Maven, Drive, setup state, deployment state, `AutomationCommands`, customer emails, invoices, or production data.

## Final Project Objective

Every Phase 1 mission advances the final Tal AI Operating System vision by creating a verified digital twin of the current legacy system. The future operating system cannot safely automate, migrate, observe, or optimize Tal Compressors until current tables, workflows, agents, files, and side effects are mapped from evidence.

## Shared Status Values

- `ACTIVE`: documented as used by known AppSheet, Apps Script, Maven, AI Draft, or System Health flows.
- `LEGACY`: appears to be older/reference/config documentation rather than active transactional data.
- `UNKNOWN`: exists or is referenced, but current use is not fully confirmed.
- `DUPLICATE_CANDIDATE`: overlaps another active table and must be reviewed before use.

## Shared Agent Responsibilities

### `INFRASTRUCTURE_MANAGER_AGENT`

- Responsibility: Owns architecture review, reuse-before-create checks, protected-system review, and final mission decision.
- Inputs: User request, current task, roadmap, Project Brain, maps, agent registry, sheet registry, PMR output.
- Outputs: Infrastructure decision, risk review, next safe step.
- Validation responsibility: Confirm evidence is source-prioritized, protected systems are listed, and no production action is hidden in the mission.

### `PROJECT_BRAIN_AGENT`

- Responsibility: Loads and protects durable project memory.
- Inputs: `project-brain/PROJECT_BRAIN_MASTER.md`, `project-brain/CURRENT_TASK.md`, `project-brain/roadmap/ROADMAP.md`, maps, checkpoints.
- Outputs: Current-state summary, Project Brain update proposal.
- Validation responsibility: Confirm roadmap/current task/Project Brain alignment and mark stale or conflicting memory.

### `PRE_MISSION_REVIEW_SYSTEM`

- Responsibility: Mandatory review gate before every mission.
- Inputs: Mission request, source hierarchy, Builder answers, Auditor findings, Discovery findings when needed.
- Outputs: Pre-Mission Review Output.
- Validation responsibility: Ensure objective, phase, evidence, affected systems, validation tests, practical verification, and brain updates are documented.

### `APPS_SCRIPT_AGENT`

- Responsibility: Read-only Apps Script analysis and boundary mapping.
- Inputs: `project-brain/maps/APPS_SCRIPT_MAP.md`, `apps-script/*` read-only.
- Outputs: Function inventory, side-effect map, protected function list.
- Validation responsibility: Confirm no Apps Script file, deployment, setup function, or runtime function is modified or run.

### `MAVEN_AGENT`

- Responsibility: Read-only Maven workflow and draft/sync boundary review.
- Inputs: Maven-related maps, `SHEETS_REGISTRY`, `MavenAPI.js` read-only if needed.
- Outputs: Maven boundary notes and approval-gated action list.
- Validation responsibility: Confirm no Maven document is created, synced manually, retried, or sent.

### `GIT_AGENT`

- Responsibility: Git status, history, diffs, checkpoints, and commit support only when requested.
- Inputs: `git status --short`, `git log`, `git diff`, checkpoint files.
- Outputs: Git state summary, checkpoint proposal, commit proposal when requested.
- Validation responsibility: Confirm changed files are understood and unrelated changes are not touched.

## Shared Table Reference

Use `data-sources/tools/SHEETS_REGISTRY.md` as the source for table status, purpose, known workflows, known agents/functions, and risk notes.

Do not infer AppSheet settings, formulas, security filters, slices, UX views, or bot internals unless current docs or manual/exported evidence prove them.

---

# Mission 1 - Pre-Mission Review For Digital Twin Foundation

## Purpose

Approve or block Phase 1 execution scope before any mapping starts.

## Project Impact

Supports the final Tal AI Operating System by ensuring every Digital Twin mission begins with evidence, reuse review, protected-system awareness, and a safe decision gate.

## Inputs

- `PROJECT_OPERATING_PROTOCOL.md`
- `PROJECT_INDEX.md`
- `agents/PRE_MISSION_REVIEW_SYSTEM.md`
- `agents/INFRASTRUCTURE_MANAGER_AGENT.md`
- `agents/AGENT_REGISTRY.md`
- `project-brain/CURRENT_TASK.md`
- `project-brain/roadmap/ROADMAP.md`
- `project-brain/roadmap/PHASE_EXECUTION_BLUEPRINT.md`
- `project-brain/roadmap/PHASE_1_PLAYBOOK.md`
- `project-brain/PROJECT_BRAIN_MASTER.md`
- `data-sources/tools/SHEETS_REGISTRY.md`
- `project-brain/maps/SYSTEM_MAP.md`
- `project-brain/maps/APPSHEET_MAP.md`
- `project-brain/maps/APPS_SCRIPT_MAP.md`

## Tools

- `git status --short`
- `rg`
- file read tools
- no production tools

## Tables

Read-only table evidence comes from `SHEETS_REGISTRY`; no table is written.

| Table | Purpose | Why It Exists | Workflows Use It | Agents Use It | Status |
|---|---|---|---|---|---|
| `AutomationRegistry` | Automation/workflow governance registry | Tracks automation risk, inputs, outputs, approvals, and health mapping | Automation governance, future health checks | Infrastructure Manager, Project Brain | ACTIVE |
| `HealthCheckRegistry` | Health check registry | Defines System Health checks | System Health planning | Infrastructure Manager, Project Brain | ACTIVE |
| `SystemHealthLog` | Health result log | Stores health validation/log results | System Health reporting | Infrastructure Manager, future QA/System Health | ACTIVE |
| All verified `SHEETS_REGISTRY` tables | Evidence list for affected systems | Prevents invented table names | Digital Twin discovery | Infrastructure Manager, Project Brain | Use registry status |

## Agents

| Agent | Responsibility | Inputs | Outputs | Validation Responsibility |
|---|---|---|---|---|
| `PRE_MISSION_REVIEW_SYSTEM` | Drive review format | Required PMR sources | PMR output | Required fields complete |
| `INFRASTRUCTURE_MANAGER_AGENT` | Decide approval/rejection/discovery | Builder/auditor evidence | Decision and next safe step | Protected systems and reuse checked |
| `PROJECT_BRAIN_AGENT` | Verify current state | Project Brain/current task/roadmap | Current-state summary | Phase and task cite sources |
| `APPS_SCRIPT_AGENT` | Later code boundary review only | Apps Script map/source read-only | Boundary recommendation | No runtime/code action |

## Practical Actions

Step 1  
Action: Run `git status --short`.  
Expected Result: Current working tree state is known before review.  
Validation: Output is recorded in the review notes.

Step 2  
Action: Read all input files listed above.  
Expected Result: Current phase, current task, existing maps, agents, tables, and protected systems are known.  
Validation: Every claim cites one or more input files.

Step 3  
Action: Fill the Pre-Mission Review Output template from `agents/PRE_MISSION_REVIEW_SYSTEM.md`.  
Expected Result: Objective, phase, agents, affected systems, evidence, validation, practical verification, brain updates, and next safe step are documented.  
Validation: No required field is blank unless marked `UNKNOWN`.

Step 4  
Action: Identify existing assets before proposing new artifacts.  
Expected Result: Existing maps, registries, and agent files are listed.  
Validation: Reuse decision is `Reuse Existing`, `Extend Existing`, or `Create New` with evidence.

Step 5  
Action: Identify all protected systems.  
Expected Result: Apps Script, Google Sheets, AppSheet, Maven, Drive, `AutomationCommands`, and stable flows are listed.  
Validation: No production action is authorized by the review.

Step 6  
Action: Produce Infrastructure Manager decision.  
Expected Result: Decision is `APPROVED`, `REJECTED`, `NEEDS_DISCOVERY`, `NEEDS_MORE_EVIDENCE`, `DEFERRED`, `EXTEND_EXISTING`, or `CREATE_NEW`.  
Validation: Decision includes next safe step.

## Execution Algorithm

```text
START
-> Run git status
-> Read PMR required sources
-> Confirm Phase 1 objective
-> Identify existing assets
-> Identify protected systems
-> Mark missing facts UNKNOWN
-> Produce Pre-Mission Review Output
-> Infrastructure Manager decides
-> END
```

## Deliverables

- Pre-Mission Review Output
- Evidence source list
- Reuse decision
- Protected systems list
- Next safe mission recommendation

## Output Structure

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

## Validation Tests

- Current phase is sourced from current task, roadmap, or Project Brain.
- Existing maps and registries were checked.
- Protected systems are listed.
- Missing facts are `UNKNOWN`.
- No production action is authorized.

## Failure Conditions

- Current phase cannot be verified.
- Source files conflict and cannot be resolved by hierarchy.
- Required evidence is missing for a decision.
- Mission implies production write, deployment, setup function, email, Maven action, Drive change, or AppSheet edit.

## Recovery Procedure

1. Stop execution.
2. Mark decision `NEEDS_DISCOVERY` or `NEEDS_MORE_EVIDENCE`.
3. List missing evidence.
4. Recommend read-only discovery only.

## Brain Updates

- Propose update to `project-brain/CURRENT_TASK.md` if the active mission changes.
- Propose update to `project-brain/PROJECT_BRAIN_MASTER.md` if new durable governance state is established.
- Propose checkpoint if Phase 1 execution sequence is approved.

## Checkpoint Rules

Create or propose a checkpoint when the review approves a multi-mission Phase 1 sequence or changes durable project state.

## Completion Criteria

- PMR output is complete.
- Infrastructure Manager decision is recorded.
- Next safe mission is explicit.
- No production system changed.

## Evidence Requirements

- File paths for every source read.
- Cited evidence for phase, objective, assets, protected systems, and decision.

## Next Mission Trigger

Mission 2 can start only when the decision allows read-only source and asset inventory.

---

# Mission 2 - Source And Asset Inventory

## Purpose

Build a verified inventory of current Digital Twin source files, maps, registries, agents, and missing evidence.

## Project Impact

Supports the Tal AI Operating System by making future execution independent of chat memory and dependent on a verified file/asset inventory.

## Inputs

- Approved Mission 1 PMR output
- `PROJECT_INDEX.md`
- `project-brain/roadmap/ROADMAP.md`
- `project-brain/PROJECT_BRAIN_MASTER.md`
- `agents/AGENT_REGISTRY.md`
- `data-sources/tools/SHEETS_REGISTRY.md`
- `project-brain/maps/SYSTEM_MAP.md`
- `project-brain/maps/APPSHEET_MAP.md`
- `project-brain/maps/APPS_SCRIPT_MAP.md`
- `project-brain/maps/AI_DRAFT_FIELD_MAPPING.md`
- `apps-script/*` read-only when needed

## Tools

- `rg --files`
- `rg`
- `git status --short`
- `git log --oneline`
- file read tools

## Tables

| Table | Purpose | Why It Exists | Workflows Use It | Agents Use It | Status |
|---|---|---|---|---|---|
| All tables in `SHEETS_REGISTRY` | Provides verified table inventory | Prevents invented tables | Digital Twin source discovery | Infrastructure Manager, Project Brain | Use registry status |
| `AutomationRegistry` | Automation registry | Existing workflow/automation governance table | Automation and health mapping | Infrastructure Manager | ACTIVE |
| `HealthCheckRegistry` | Health check registry | Existing health-check planning table | System Health | Infrastructure Manager, future QA | ACTIVE |
| `SystemHealthLog` | Health log | Existing health result table | System Health reporting | Infrastructure Manager, future QA | ACTIVE |

## Agents

| Agent | Responsibility | Inputs | Outputs | Validation Responsibility |
|---|---|---|---|---|
| `PROJECT_BRAIN_AGENT` | Current memory inventory | Project Brain files | Brain source inventory | Current/stale state separated |
| `INFRASTRUCTURE_MANAGER_AGENT` | Reuse/protected-system review | All inventory findings | Existing asset decision | No duplicate asset creation |
| `GIT_AGENT` | Git/file context | Git status/log/diff | Git context notes | Unrelated changes not touched |

## Practical Actions

Step 1  
Action: Run `git status --short`.  
Expected Result: Working tree state is known.  
Validation: Only documentation changes are allowed for this SOP-driven mission.

Step 2  
Action: Run `rg --files`.  
Expected Result: Repository file list is available.  
Validation: Output includes expected governance, brain, maps, agents, and apps-script paths or gaps are marked.

Step 3  
Action: Read `agents/AGENT_REGISTRY.md` and list active/development/planned agents.  
Expected Result: Agent inventory is produced.  
Validation: Every agent status matches registry.

Step 4  
Action: Read `project-brain/maps/*` and list map files.  
Expected Result: Existing map inventory is produced.  
Validation: No new map is proposed until existing maps are classified.

Step 5  
Action: Read `data-sources/tools/SHEETS_REGISTRY.md` and list tables with status.  
Expected Result: Table inventory is produced.  
Validation: Every table entry comes from registry.

Step 6  
Action: Identify stale, missing, duplicate, or conflicting sources.  
Expected Result: Gap register is started.  
Validation: Each gap cites source or is marked `UNKNOWN`.

## Execution Algorithm

```text
START
-> Confirm PMR approval
-> Run git status
-> Run rg --files
-> Inventory agents
-> Inventory maps
-> Inventory table registry
-> Inventory Apps Script files read-only if needed
-> Classify assets and gaps
-> Produce source inventory
-> END
```

## Deliverables

- Source file inventory
- Agent inventory
- Map inventory
- Table inventory
- Missing/stale/duplicate/conflict register

## Output Structure

```md
# Source And Asset Inventory
Git Status:
Files Reviewed:
Agents:
Maps:
Registries:
Apps Script Files Read-Only:
Tables From SHEETS_REGISTRY:
Existing Assets:
Missing Assets:
Duplicate Candidates:
Stale Sources:
UNKNOWN Items:
Next Safe Mission:
```

## Validation Tests

- Each listed file exists or is marked missing.
- Each table comes from `SHEETS_REGISTRY`.
- AppSheet facts are not invented.
- Apps Script files are not edited.

## Failure Conditions

- Repository file discovery fails.
- Required source files are missing.
- Existing map/registry conflicts cannot be resolved.
- Inventory requires live production access not approved.

## Recovery Procedure

1. Stop mission.
2. Record missing file/source.
3. Mark affected output `UNKNOWN`.
4. Ask Infrastructure Manager whether discovery is required.

## Brain Updates

- Propose update to `project-brain/maps/SYSTEM_MAP.md` if source inventory changes map state.
- Propose update to `project-brain/PROJECT_BRAIN_MASTER.md` if durable source-of-truth state changes.

## Checkpoint Rules

Create or propose a checkpoint if source inventory becomes the accepted Phase 1 baseline.

## Completion Criteria

- Inventory is complete enough to select a mapping target.
- Unknowns are explicit.
- No protected system changed.

## Evidence Requirements

- `rg --files` output or summary.
- File paths reviewed.
- Registry/table source citations.

## Next Mission Trigger

Mission 3 can start when table inventory is source-backed and no blocking source conflicts remain.

---

# Mission 3 - Google Sheets Table Map

## Purpose

Convert `SHEETS_REGISTRY` into a practical table map for Digital Twin, health, output verification, and migration planning.

## Project Impact

Supports Tal AI Operating System by identifying current data structures before any future Supabase, Next.js, n8n, AI, or migration work.

## Inputs

- Approved Mission 1 PMR output
- Mission 2 inventory output
- `data-sources/tools/SHEETS_REGISTRY.md`
- `project-brain/maps/SYSTEM_MAP.md`
- `project-brain/maps/APPSHEET_MAP.md`
- `project-brain/PROJECT_BRAIN_MASTER.md`

## Tools

- file read/search
- optional read-only Google Sheets metadata only if approved/available
- no write tools

## Tables

| Table | Purpose | Why It Exists | Workflows Use It | Agents Use It | Status |
|---|---|---|---|---|---|
| `Customers_Final` | Active customer master | Customer reference for reports and Drive naming | Service reports, Drive save | Apps Script Agent, Project Brain | ACTIVE |
| `ServiceReports` | Main service report table | Stores service report header/status/data | Service report, Drive, email, AI Draft | Apps Script Agent, AI Draft Agent | ACTIVE |
| `ReportEquipmentItems` | Service report equipment child table | Stores equipment linked to reports | Service reports, AI Draft | Apps Script Agent, AI Draft Agent | ACTIVE |
| `InspectionItems` | Inspection support table | Likely inspection support; schema incomplete | AppSheet/service support UNKNOWN | Project Brain | UNKNOWN |
| `PartsUsed` | Parts used in service | Supports parts and AI Draft history; schema incomplete | Service/AI Draft | AI Draft Agent | UNKNOWN |
| `EmailLog` | Email event log | Email observability; schema incomplete | Communication/email | Apps Script Agent | UNKNOWN |
| `Lists` | Reference lists | Dropdown/reference values | AppSheet forms | Project Brain | ACTIVE |
| `BusinessDocuments` | Business document staging | Core draft/approval/Maven staging | BusinessDocuments -> AutomationCommands -> Maven | Maven Agent, AI Draft Agent | ACTIVE |
| `BusinessDocumentItems` | Business document line items | Holds document item rows | Business document drafting | Maven Agent, AI Draft Agent | ACTIVE |
| `BusinessDocumentLog` | Business document audit log | Traceability for Maven/business-document flow | Maven/business docs | Maven Agent | ACTIVE |
| `AutomationCommands` | Queue table | Safe automation execution and idempotency | AppSheet Bot -> Apps Script -> Maven | Infrastructure Manager, Maven Agent | ACTIVE |
| `ProductsCatalog` | Product/part catalog | Pricing/source catalog | AI Draft, inventory | AI Draft Agent | ACTIVE |
| `InvoiceMavenDocuments` | Maven document history | Maven imported document headers/history | Maven sync, pricing history | Maven Agent, AI Draft Agent | ACTIVE |
| `InvoiceMavenDocumentItems` | Maven line item history | Imported Maven item history | Maven sync, pricing history | Maven Agent, AI Draft Agent | ACTIVE |
| `InvoiceMavenCustomers` | Maven customer reference | Imported Maven customers | Maven reference | Maven Agent | ACTIVE |
| `InvoiceMavenItems` | Maven item catalog | Imported Maven item/product data | Maven reference, catalog reconciliation | Maven Agent | ACTIVE |
| `SyncState` | Sync checkpoint state | Tracks Maven sync state | Maven sync | Maven Agent | ACTIVE |
| `SyncLog` | Sync execution log | Observability for sync | Maven sync, System Health | Maven Agent, future QA | ACTIVE |
| `ErrorLog` | Error log | Error observability | Maven sync, System Health | Maven Agent, future QA | ACTIVE |
| `AutomationRegistry` | Automation registry | Workflow governance | Automation and health mapping | Infrastructure Manager | ACTIVE |
| `HealthCheckRegistry` | Health check registry | Health check definitions | System Health | Infrastructure Manager, future QA | ACTIVE |
| `SystemHealthLog` | Health result log | Health check output | System Health | Infrastructure Manager, future QA | ACTIVE |
| Other `SHEETS_REGISTRY` tables | Additional documented sheets | May support legacy/config/future functions | Varies | Varies | Use registry status |

## Agents

| Agent | Responsibility | Inputs | Outputs | Validation Responsibility |
|---|---|---|---|---|
| `PROJECT_BRAIN_AGENT` | Turn registry facts into durable map proposal | Registry, maps, Project Brain | Table map proposal | No invented table facts |
| `INFRASTRUCTURE_MANAGER_AGENT` | Risk/reuse review | Table map proposal | Approved/deferred mapping scope | Protected systems remain untouched |

## Practical Actions

Step 1  
Action: Confirm Mission 1 and Mission 2 outputs exist or are provided.  
Expected Result: Table mapping starts from approved scope and inventory.  
Validation: Missing prior outputs are marked `UNKNOWN` or mission stops.

Step 2  
Action: Read `SHEETS_REGISTRY.md` and extract table names, status, key column, purpose, workflows, related files/functions, and risk notes.  
Expected Result: Raw table fact list.  
Validation: Every fact comes from registry.

Step 3  
Action: Group tables by system area: service reports, business documents, Maven, system health, inventory/procurement, communication, legacy/config, unknown.  
Expected Result: Grouped table map.  
Validation: Each group has source-backed rationale.

Step 4  
Action: Identify schema risks.  
Expected Result: List of incomplete headers, blank headers, suspicious sheets, and duplicate candidates.  
Validation: Risks match registry notes.

Step 5  
Action: Compare grouped tables to `SYSTEM_MAP.md` and `APPSHEET_MAP.md`.  
Expected Result: Map alignment and mismatch list.  
Validation: Any AppSheet-specific missing detail is `UNKNOWN`.

Step 6  
Action: Produce table map output.  
Expected Result: Table map supports Missions 4-8.  
Validation: No live Google Sheets write occurs.

## Execution Algorithm

```text
START
-> Confirm prior mission evidence
-> Read SHEETS_REGISTRY
-> Extract table facts
-> Group tables by system area
-> Identify schema risks
-> Compare with existing maps
-> Mark gaps UNKNOWN
-> Produce table map
-> END
```

## Deliverables

- Table map
- Table status matrix
- Schema risk list
- Duplicate candidate list
- Map update proposal

## Output Structure

```md
# Google Sheets Table Map
Source Registry:
Last Registry Read:
Table Groups:
Table Status Matrix:
Schema Risks:
Duplicate Candidates:
Map Alignment:
UNKNOWN Items:
Recommended Brain Updates:
Next Mission Input:
```

## Validation Tests

- Table status matches `SHEETS_REGISTRY`.
- Missing key columns remain `UNKNOWN`.
- No Google Sheets writes occur.
- No AppSheet column settings are invented.

## Failure Conditions

- `SHEETS_REGISTRY.md` is missing or unreadable.
- Registry table facts conflict with higher-priority current-state documents.
- Mission requires live metadata write access.

## Recovery Procedure

1. Stop mapping.
2. Record conflict or missing registry.
3. Mark affected tables `UNKNOWN`.
4. Request read-only discovery or registry refresh approval.

## Brain Updates

- Propose updates to `project-brain/maps/SYSTEM_MAP.md`.
- Propose updates to `project-brain/maps/APPSHEET_MAP.md` only where AppSheet evidence exists.
- Propose update to `project-brain/PROJECT_BRAIN_MASTER.md` if durable table understanding changes.

## Checkpoint Rules

Create/propose checkpoint if the table map becomes accepted baseline for Digital Twin.

## Completion Criteria

- Table map can be used by Mission 4.
- All table claims cite registry.
- Unknowns and risks are explicit.

## Evidence Requirements

- Registry source path.
- Table status evidence.
- Map comparison notes.

## Next Mission Trigger

Mission 4 can start when AppSheet-related table set and unknowns are clear.

---

# Mission 4 - AppSheet Object Map

## Purpose

Map AppSheet tables, known actions, known bots, and missing AppSheet metadata without inventing facts.

## Project Impact

Supports Tal AI Operating System by documenting the current no-code application layer before migration, automation expansion, or replacement.

## Inputs

- Approved Mission 1 PMR output
- Mission 2 source inventory
- Mission 3 table map
- `project-brain/maps/APPSHEET_MAP.md`
- `project-brain/maps/SYSTEM_MAP.md`
- `data-sources/tools/SHEETS_REGISTRY.md`
- AppSheet manual/exported evidence only if available

## Tools

- file read/search
- manual/exported AppSheet evidence review if provided
- no AppSheet production tools

## Tables

| Table | Purpose | Why It Exists | Workflows Use It | Agents Use It | Status |
|---|---|---|---|---|---|
| `ServiceReports` | Main service report header | AppSheet service report entry and report lifecycle | Service reports, Drive/email, AI Draft trigger context | Project Brain, Apps Script Agent | ACTIVE |
| `ReportEquipmentItems` | Equipment linked to reports | Multi-equipment service report detail | Service report child records | Project Brain, Apps Script Agent | ACTIVE |
| `Customers_Final` | Customer master | Customer references for reports | Service reports, Drive naming | Project Brain, Apps Script Agent | ACTIVE |
| `BusinessDocuments` | Business document staging | Approval and Maven draft staging | Business document workflow | Maven Agent, AI Draft Agent | ACTIVE |
| `BusinessDocumentItems` | Business document line items | Document item details | Business document workflow | Maven Agent, AI Draft Agent | ACTIVE |
| `BusinessDocumentLog` | Audit log | Business document traceability | Maven/business docs | Maven Agent | ACTIVE |
| `AutomationCommands` | Queue table | Safe AppSheet Bot/App Script automation boundary | Queue processing | Infrastructure Manager, Maven Agent | ACTIVE |
| `ProductsCatalog` | Product/pricing catalog | Product and price references | AI Draft, inventory | AI Draft Agent | ACTIVE |
| `InvoiceMavenDocuments` | Maven history | Historical document reference | Maven sync, pricing | Maven Agent | ACTIVE |
| `InvoiceMavenDocumentItems` | Maven item history | Historical line-item reference | Maven sync, pricing | Maven Agent | ACTIVE |
| `SyncState` | Sync state | Maven sync checkpoint | Maven sync | Maven Agent | ACTIVE |
| `SyncLog` | Sync log | Sync observability | Maven sync | Maven Agent | ACTIVE |
| `ErrorLog` | Error log | Error observability | Maven sync | Maven Agent | ACTIVE |
| `AppMenu` | App menu/navigation config | App UI support | AppSheet UI/navigation UNKNOWN | Project Brain | ACTIVE |

## Agents

| Agent | Responsibility | Inputs | Outputs | Validation Responsibility |
|---|---|---|---|---|
| `INFRASTRUCTURE_MANAGER_AGENT` | Protect AppSheet production and decide evidence needs | Maps, registry, manual evidence | Safe AppSheet mapping decision | No AppSheet edit |
| `PROJECT_BRAIN_AGENT` | Preserve current AppSheet map state | AppSheet map, Project Brain | AppSheet map proposal | Unknowns remain UNKNOWN |
| future Digital Twin Agent | `UNKNOWN` | `UNKNOWN` | `UNKNOWN` | `UNKNOWN` |

## Practical Actions

Step 1  
Action: Read `APPSHEET_MAP.md`.  
Expected Result: Current documented AppSheet tables, keys, status flow, and golden rule are known.  
Validation: Claims cite `APPSHEET_MAP.md`.

Step 2  
Action: Read `SYSTEM_MAP.md`.  
Expected Result: Known AppSheet actions, bot, and automation flow are known.  
Validation: Claims cite `SYSTEM_MAP.md`.

Step 3  
Action: Compare mapped tables to Mission 3 table map.  
Expected Result: AppSheet table coverage list and missing/extra table list.  
Validation: Each table source is registry or map.

Step 4  
Action: Extract known AppSheet actions and bot descriptions.  
Expected Result: Known action/bot list.  
Validation: Missing Bot conditions, slices, UX, filters, formulas, and column settings are `UNKNOWN`.

Step 5  
Action: Review manual/exported evidence if supplied.  
Expected Result: Additional AppSheet details are added only when evidenced.  
Validation: No evidence means no claim.

Step 6  
Action: Produce AppSheet Object Map output.  
Expected Result: Output can feed workflow mapping and migration planning.  
Validation: No AppSheet production edit occurs.

## Execution Algorithm

```text
START
-> Confirm prior mission outputs
-> Read APPSHEET_MAP
-> Read SYSTEM_MAP
-> Compare AppSheet tables to registry
-> Extract known actions and bots
-> Check manual/exported evidence if available
-> Mark missing metadata UNKNOWN
-> Produce AppSheet object map
-> END
```

## Deliverables

- AppSheet object map
- AppSheet action list
- AppSheet bot list
- AppSheet unknowns list
- Evidence-needed list

## Output Structure

```md
# AppSheet Object Map
Sources:
Known App:
Production Sheet:
Known Tables:
Known Keys:
Known Actions:
Known Bots:
Known Status Flows:
UNKNOWN AppSheet Metadata:
Evidence Needed:
Protected Boundaries:
Next Mission Input:
```

## Validation Tests

- Every AppSheet claim cites map/registry/manual evidence.
- Missing details are `UNKNOWN`.
- No AppSheet production changes occur.
- `AutomationCommands` queue boundary is protected.

## Failure Conditions

- Required maps are missing.
- AppSheet details are requested but no evidence exists.
- User asks to inspect/edit live AppSheet without approval.

## Recovery Procedure

1. Stop the mission.
2. Mark missing AppSheet evidence `UNKNOWN`.
3. Request manual/exported evidence or approve read-only discovery.

## Brain Updates

- Propose updates to `project-brain/maps/APPSHEET_MAP.md`.
- Propose updates to `project-brain/maps/SYSTEM_MAP.md` if action/bot map changes.
- Propose Project Brain update if durable current-state understanding changes.

## Checkpoint Rules

Create/propose checkpoint if AppSheet object map becomes accepted Digital Twin baseline.

## Completion Criteria

- Known AppSheet objects are mapped.
- Unknown AppSheet metadata is listed.
- Output supports Mission 6 workflow mapping.

## Evidence Requirements

- `APPSHEET_MAP.md`
- `SYSTEM_MAP.md`
- `SHEETS_REGISTRY.md`
- Manual/exported AppSheet evidence if used

## Next Mission Trigger

Mission 5 or 6 can start when AppSheet knowns/unknowns are clear.

---

# Mission 5 - Apps Script Boundary Map

## Purpose

Map Apps Script files, functions, side effects, and protected boundaries without modifying runtime code.

## Project Impact

Supports Tal AI Operating System by documenting the current code execution layer and preventing unsafe migration or automation changes.

## Inputs

- Approved Mission 1 PMR output
- Mission 2 source inventory
- Mission 3 table map
- `project-brain/maps/APPS_SCRIPT_MAP.md`
- `project-brain/maps/SYSTEM_MAP.md`
- `project-brain/PROJECT_BRAIN_MASTER.md`
- `apps-script/*` read-only

## Tools

- `rg`
- file read/search
- no `clasp push`
- no setup function
- no deploy
- no runtime function execution

## Tables

| Table | Purpose | Why It Exists | Workflows Use It | Agents Use It | Status |
|---|---|---|---|---|---|
| `ServiceReports` | Main report data | Apps Script loads, updates report-related fields | Report rendering, signature, Drive/email, AI Draft flags | Apps Script Agent | ACTIVE |
| `ReportEquipmentItems` | Report equipment data | Apps Script loads child equipment rows | Report rendering | Apps Script Agent | ACTIVE |
| `Customers_Final` | Customer data | Customer lookup and Drive folder naming | Report rendering, Drive | Apps Script Agent | ACTIVE |
| `BusinessDocuments` | Business document staging | Maven draft and status updates | Business document workflow | Maven Agent, Apps Script Agent | ACTIVE |
| `BusinessDocumentItems` | Document item rows | Business document lines | Maven/AI Draft | Maven Agent | ACTIVE |
| `BusinessDocumentLog` | Audit log | Logs business document actions | Maven/business docs | Maven Agent | ACTIVE |
| `AutomationCommands` | Queue commands | Apps Script webhook command processing | Queue processing | Maven Agent, Apps Script Agent | ACTIVE |
| `InvoiceMavenDocuments` | Maven documents | Maven sync/import | Maven sync | Maven Agent | ACTIVE |
| `InvoiceMavenDocumentItems` | Maven document items | Maven line item sync | Maven sync | Maven Agent | ACTIVE |
| `SyncState` | Sync checkpoints | Maven pagination/checkpoint | Maven sync | Maven Agent | ACTIVE |
| `SyncLog` | Sync log | Sync observability | Maven sync | Maven Agent | ACTIVE |
| `ErrorLog` | Error log | Sync/runtime error logging | Maven sync | Maven Agent | ACTIVE |

## Agents

| Agent | Responsibility | Inputs | Outputs | Validation Responsibility |
|---|---|---|---|---|
| `APPS_SCRIPT_AGENT` | Read-only source and function analysis | Apps Script map/source | Function and side-effect map | No code/runtime action |
| `INFRASTRUCTURE_MANAGER_AGENT` | Protect runtime boundaries | Function map | Risk and approval boundary | Protected flows listed |
| `PROJECT_BRAIN_AGENT` | Durable memory proposal | Maps and function findings | Brain/map update proposal | No stale memory promoted |
| `MAVEN_AGENT` | Maven boundary review | Maven functions/source map | Maven boundary notes | No Maven action |

## Practical Actions

Step 1  
Action: Read `APPS_SCRIPT_MAP.md`.  
Expected Result: Known files and functions are listed.  
Validation: Function list cites map.

Step 2  
Action: Read relevant `apps-script/*` files only as text.  
Expected Result: Function names and side effects are confirmed.  
Validation: No file edit, deployment, setup, or function run occurs.

Step 3  
Action: Search for report, Drive, email, Maven, queue, status, and sync function names.  
Expected Result: Function-to-workflow list.  
Validation: Search output or file references support each entry.

Step 4  
Action: Map table reads/writes and external side effects.  
Expected Result: Side-effect map.  
Validation: Unknown side effects remain `UNKNOWN`.

Step 5  
Action: Identify protected functions and high-risk areas.  
Expected Result: Protected function list.  
Validation: Includes ReportCounter, Drive save, signature, queue, Maven draft, Maven sync boundaries.

Step 6  
Action: Produce Apps Script Boundary Map output.  
Expected Result: Output feeds workflow and side-effect mapping missions.  
Validation: No runtime code changed.

## Execution Algorithm

```text
START
-> Confirm PMR and inventory outputs
-> Read APPS_SCRIPT_MAP
-> Read apps-script files as text only
-> Search function names and side effects
-> Map functions to tables/workflows
-> Identify protected functions
-> Mark unknowns UNKNOWN
-> Produce boundary map
-> END
```

## Deliverables

- Apps Script boundary map
- Function inventory
- Function-to-table map
- Side-effect map
- Protected function list

## Output Structure

```md
# Apps Script Boundary Map
Sources:
Files Reviewed:
Functions:
Function To Table Map:
External Side Effects:
Protected Functions:
Approval-Gated Functions:
UNKNOWN Items:
Risks:
Next Mission Input:
```

## Validation Tests

- No Apps Script file changed.
- No deploy/setup/runtime function executed.
- Every function/side-effect claim cites source.
- Protected flows are listed.

## Failure Conditions

- Apps Script source cannot be read.
- Function behavior cannot be confirmed from text.
- Mapping requires running code.

## Recovery Procedure

1. Stop mapping.
2. Mark unverified functions or side effects `UNKNOWN`.
3. Recommend read-only source export or manual evidence.

## Brain Updates

- Propose updates to `project-brain/maps/APPS_SCRIPT_MAP.md`.
- Propose updates to `project-brain/maps/SYSTEM_MAP.md`.
- Propose Project Brain update if durable workflow boundaries change.

## Checkpoint Rules

Create/propose checkpoint if Apps Script boundary map becomes accepted baseline.

## Completion Criteria

- Code boundary is mapped from evidence.
- Stable functions are identified.
- No code/runtime action occurred.

## Evidence Requirements

- Source file paths.
- Function references.
- Side-effect evidence.

## Next Mission Trigger

Mission 6 can start when workflow-relevant functions and boundaries are known or marked `UNKNOWN`.

---

# Mission 6 - Workflow And Queue Map

## Purpose

Map current workflows and queue boundaries, especially `BusinessDocuments -> AutomationCommands -> AppSheet Bot -> Apps Script -> Maven Draft`.

## Project Impact

Supports Tal AI Operating System by preserving safe automation architecture and idempotency before future orchestration or migration.

## Inputs

- Approved Mission 1 PMR output
- Mission 3 table map
- Mission 4 AppSheet object map
- Mission 5 Apps Script boundary map
- `project-brain/maps/SYSTEM_MAP.md`
- `project-brain/maps/APPSHEET_MAP.md`
- `project-brain/maps/APPS_SCRIPT_MAP.md`
- `project-brain/PROJECT_BRAIN_MASTER.md`
- `data-sources/tools/SHEETS_REGISTRY.md`

## Tools

- file read/search
- `rg`
- no production tools

## Tables

| Table | Purpose | Why It Exists | Workflows Use It | Agents Use It | Status |
|---|---|---|---|---|---|
| `BusinessDocuments` | Draft/approval staging | Holds business document state and Maven references | Business document workflow | Maven Agent, AI Draft Agent | ACTIVE |
| `BusinessDocumentItems` | Line items | Holds document item rows | Business document workflow | Maven Agent, AI Draft Agent | ACTIVE |
| `BusinessDocumentLog` | Audit log | Records document actions/results | Maven/business docs | Maven Agent | ACTIVE |
| `AutomationCommands` | Queue | Prevents duplicate automation and controls command execution | AppSheet Bot -> Apps Script | Infrastructure Manager, Maven Agent | ACTIVE |
| `ServiceReports` | Source report | Can feed AI/business draft workflows | Service report to business draft | Apps Script Agent, AI Draft Agent | ACTIVE |
| `InvoiceMavenDocuments` | Maven documents | Stores imported Maven document history | Maven sync/pricing | Maven Agent | ACTIVE |
| `InvoiceMavenDocumentItems` | Maven items | Stores imported line-item history | Maven sync/pricing | Maven Agent | ACTIVE |
| `SyncState` | Sync checkpoint | Controls Maven sync pagination/state | Maven sync | Maven Agent | ACTIVE |
| `SyncLog` | Sync log | Observability for sync runs | Maven sync | Maven Agent | ACTIVE |
| `ErrorLog` | Error log | Error observability | Maven sync | Maven Agent | ACTIVE |

## Agents

| Agent | Responsibility | Inputs | Outputs | Validation Responsibility |
|---|---|---|---|---|
| `INFRASTRUCTURE_MANAGER_AGENT` | Protect queue architecture | Maps and workflow evidence | Workflow approval boundary | No double-update risk |
| `PROJECT_BRAIN_AGENT` | Preserve stable workflow memory | Project Brain/maps | Workflow map proposal | Durable rules cite sources |
| `APPS_SCRIPT_AGENT` | Map webhook/function side | Apps Script boundary map | Apps Script workflow steps | No code action |
| `MAVEN_AGENT` | Map Maven draft/sync side | Maven-related evidence | Maven boundary notes | No Maven action |

## Practical Actions

Step 1  
Action: Read workflow evidence from maps and prior outputs.  
Expected Result: Known workflow steps are visible.  
Validation: Each step cites source or prior mission output.

Step 2  
Action: Trace `BusinessDocuments -> AutomationCommands -> AppSheet Bot -> Apps Script -> Maven Draft`.  
Expected Result: Queue workflow map.  
Validation: Unknown Bot internals are `UNKNOWN`.

Step 3  
Action: Map status fields and transitions where documented.  
Expected Result: Status transition notes.  
Validation: Undocumented states are not invented.

Step 4  
Action: Identify row ownership and no-double-update boundaries.  
Expected Result: Boundary map.  
Validation: AppSheet Bot and Apps Script must not update same row simultaneously.

Step 5  
Action: Identify risks: duplicate execution, stuck commands, manual recovery, Maven draft approval.  
Expected Result: Workflow risk register.  
Validation: No queue command is retried, repaired, or created.

Step 6  
Action: Produce Workflow And Queue Map output.  
Expected Result: Output supports health checks, output verification, and migration.  
Validation: No production action occurs.

## Execution Algorithm

```text
START
-> Confirm prior maps
-> Read workflow sources
-> Trace queue flow
-> Map statuses where documented
-> Map row ownership boundaries
-> Identify risks and unknowns
-> Produce workflow map
-> END
```

## Deliverables

- Workflow map
- Queue boundary map
- Status transition notes
- Workflow risk register
- Unknown AppSheet automation details list

## Output Structure

```md
# Workflow And Queue Map
Sources:
Workflow Name:
Start Event:
Tables:
Steps:
Status Transitions:
Row Ownership:
Approval Gates:
Risks:
UNKNOWN Items:
Next Mission Input:
```

## Validation Tests

- `AutomationCommands` architecture is preserved.
- Row ownership boundaries are explicit.
- Maven draft creation remains approval-gated.
- No command retry/recovery/write occurs.

## Failure Conditions

- Workflow cannot be traced from evidence.
- Bot/action internals are required but unavailable.
- Mission requires production queue access.

## Recovery Procedure

1. Stop mission.
2. Mark missing workflow details `UNKNOWN`.
3. Request manual/exported AppSheet evidence or read-only discovery.

## Brain Updates

- Propose updates to `project-brain/maps/SYSTEM_MAP.md`.
- Propose updates to `project-brain/PROJECT_BRAIN_MASTER.md` if stable workflow rules are refined.

## Checkpoint Rules

Create/propose checkpoint if workflow map confirms a stable production baseline.

## Completion Criteria

- Workflow is traceable.
- Queue boundary is explicit.
- Risks and unknowns are listed.

## Evidence Requirements

- Map citations.
- Table registry citations.
- Prior mission output citations.

## Next Mission Trigger

Mission 7 can start when workflow side effects and approval-gated external actions are ready to map.

---

# Mission 7 - Drive, Email, Maven, And External Side-Effect Map

## Purpose

Map external side effects that must be protected before future automation, AI execution, or migration.

## Project Impact

Supports Tal AI Operating System by identifying all external write boundaries that require human approval and safe orchestration.

## Inputs

- Approved Mission 1 PMR output
- Mission 5 Apps Script boundary map
- Mission 6 workflow map
- `project-brain/maps/APPS_SCRIPT_MAP.md`
- `project-brain/maps/SYSTEM_MAP.md`
- `project-brain/PROJECT_BRAIN_MASTER.md`
- `data-sources/tools/SHEETS_REGISTRY.md`
- `apps-script/*` read-only if needed

## Tools

- file read/search
- `rg`
- no Drive tools
- no email tools
- no Maven write tools
- no Invoice4u tools
- no deployment/setup tools

## Tables

| Table | Purpose | Why It Exists | Workflows Use It | Agents Use It | Status |
|---|---|---|---|---|---|
| `ServiceReports` | Report source | Contains report fields, links, Drive IDs, email fields | Drive save, email, report workflow | Apps Script Agent | ACTIVE |
| `Customers_Final` | Customer source | Customer names/contact/folder naming | Drive and report rendering | Apps Script Agent | ACTIVE |
| `EmailLog` | Email log | Email event trace; schema incomplete | Email workflow | Apps Script Agent | UNKNOWN |
| `BusinessDocuments` | Business doc staging | Maven draft state and approvals | Maven draft workflow | Maven Agent | ACTIVE |
| `BusinessDocumentLog` | Audit log | Business document traceability | Maven/business docs | Maven Agent | ACTIVE |
| `AutomationCommands` | Queue | AppSheet -> Apps Script command boundary | Queue workflow | Infrastructure Manager, Maven Agent | ACTIVE |
| `InvoiceMavenDocuments` | Maven docs | Maven sync history | Maven sync/pricing | Maven Agent | ACTIVE |
| `InvoiceMavenDocumentItems` | Maven lines | Maven line history | Maven sync/pricing | Maven Agent | ACTIVE |
| `SyncState` | Sync state | Maven sync state | Maven sync | Maven Agent | ACTIVE |
| `SyncLog` | Sync log | Maven sync observability | Maven sync | Maven Agent | ACTIVE |
| `ErrorLog` | Error log | Maven sync errors | Maven sync | Maven Agent | ACTIVE |

## Agents

| Agent | Responsibility | Inputs | Outputs | Validation Responsibility |
|---|---|---|---|---|
| `APPS_SCRIPT_AGENT` | Map Drive/email/source side effects | Apps Script map/source | Side-effect list | No runtime action |
| `MAVEN_AGENT` | Map Maven draft/sync boundaries | Maven maps/source | Maven side-effect list | No Maven write |
| `INFRASTRUCTURE_MANAGER_AGENT` | Approval boundary review | Side-effect list | Protected action list | Approval gates explicit |
| `PROJECT_BRAIN_AGENT` | Durable memory proposal | Findings | Brain/map update proposal | No stale assumptions |

## Practical Actions

Step 1  
Action: Read side-effect evidence from maps and Mission 5/6 outputs.  
Expected Result: Known Drive/email/Maven side effects are identified.  
Validation: Every side effect cites source.

Step 2  
Action: Map Drive folder and report file effects.  
Expected Result: Drive side-effect map.  
Validation: No Drive action performed.

Step 3  
Action: Map email sending effects.  
Expected Result: Email side-effect map.  
Validation: No email sent.

Step 4  
Action: Map Maven draft creation and sync effects.  
Expected Result: Maven side-effect map.  
Validation: No Maven document created or sync action run.

Step 5  
Action: Map future Invoice4u boundary as planned/approval-gated.  
Expected Result: Invoice4u remains future/approval-gated.  
Validation: No Invoice4u action occurs.

Step 6  
Action: Produce approval-gated action list.  
Expected Result: List of external writes requiring explicit approval.  
Validation: Matches protocol approval rules.

## Execution Algorithm

```text
START
-> Confirm workflow and Apps Script boundary maps
-> Identify Drive effects
-> Identify email effects
-> Identify Maven effects
-> Identify future Invoice4u boundary
-> Classify approval gates
-> Mark unknown endpoints/payloads UNKNOWN
-> Produce side-effect map
-> END
```

## Deliverables

- External side-effect map
- Drive side-effect map
- Email side-effect map
- Maven side-effect map
- Approval-gated action list
- Unknown endpoint/payload list

## Output Structure

```md
# External Side-Effect Map
Sources:
Drive Effects:
Email Effects:
Maven Effects:
Invoice4u Future Boundary:
Approval-Gated Actions:
Known Bugs/Risks:
UNKNOWN Endpoints/Payloads:
Next Mission Input:
```

## Validation Tests

- No Drive file/folder action.
- No email send.
- No Maven action.
- No Invoice4u action.
- No setup/deploy command.

## Failure Conditions

- Side effect cannot be mapped from evidence.
- Mapping requires production write or external API call.
- Approval boundary is unclear.

## Recovery Procedure

1. Stop mission.
2. Mark endpoint/payload/action `UNKNOWN`.
3. Request read-only source evidence or human decision.

## Brain Updates

- Propose updates to `project-brain/maps/SYSTEM_MAP.md`.
- Propose updates to `project-brain/maps/APPS_SCRIPT_MAP.md`.
- Propose updates to bug register if Drive/Maven/email risks are refined.

## Checkpoint Rules

Create/propose checkpoint if external side-effect map becomes migration/health planning baseline.

## Completion Criteria

- External side effects are mapped.
- Approval gates are explicit.
- No external action occurred.

## Evidence Requirements

- Source citations for each side effect.
- Approval rule citations.
- Unknown endpoint/payload list.

## Next Mission Trigger

Mission 8 can start when all known side effects and unknowns are consolidated.

---

# Mission 8 - Digital Twin Gap Register And Next Mission Plan

## Purpose

Consolidate Phase 1 findings into a gap register and define the next safe mission.

## Project Impact

Supports Tal AI Operating System by converting discovery into an actionable, evidence-backed plan for System Health, Output Verification, AppSheet Digital Twin, and Migration Blueprint readiness.

## Inputs

- Mission 1 PMR output
- Mission 2 source inventory
- Mission 3 table map
- Mission 4 AppSheet object map
- Mission 5 Apps Script boundary map
- Mission 6 workflow and queue map
- Mission 7 side-effect map
- `project-brain/roadmap/ROADMAP.md`
- `project-brain/roadmap/PHASE_EXECUTION_BLUEPRINT.md`
- `project-brain/PROJECT_BRAIN_MASTER.md`
- `project-brain/maps/*`

## Tools

- file read/search
- `git status --short`
- `git diff`
- no production tools

## Tables

| Table | Purpose | Why It Exists | Workflows Use It | Agents Use It | Status |
|---|---|---|---|---|---|
| All tables referenced in Missions 1-7 | Consolidated gap evidence | Connects discovered facts and unknowns | Digital Twin, Health, Output Verification, Migration planning | Infrastructure Manager, Project Brain | Use mission/source status |
| `AutomationRegistry` | Automation governance | May receive future documentation proposals only | Automation governance | Infrastructure Manager | ACTIVE |
| `HealthCheckRegistry` | Health checks | Future health mapping input | System Health | Infrastructure Manager/future QA | ACTIVE |
| `SystemHealthLog` | Health logs | Future health output table | System Health | future QA | ACTIVE |

## Agents

| Agent | Responsibility | Inputs | Outputs | Validation Responsibility |
|---|---|---|---|---|
| `INFRASTRUCTURE_MANAGER_AGENT` | Decide next safe mission | All mission outputs | Next mission recommendation | No unsafe next step |
| `PROJECT_BRAIN_AGENT` | Propose durable memory updates | Gap register | Brain update proposal | Updates cite evidence |
| `GIT_AGENT` | Report diff/status/checkpoint context | Git status/diff | Git context and checkpoint proposal | No commit unless requested |

## Practical Actions

Step 1  
Action: Collect all outputs from Missions 1-7.  
Expected Result: Complete Phase 1 evidence package.  
Validation: Missing mission output is marked `UNKNOWN` or mission stops.

Step 2  
Action: Extract all `UNKNOWN`, `CONFLICT`, `MISSING`, `DUPLICATE_CANDIDATE`, and `NEEDS_MORE_EVIDENCE` items.  
Expected Result: Raw gap list.  
Validation: Every gap cites mission output or source file.

Step 3  
Action: Classify gaps by blocker type.  
Expected Result: Gap categories for migration, health, output verification, AppSheet twin, Apps Script boundary, side effects, or docs cleanup.  
Validation: Category rationale cites evidence.

Step 4  
Action: Identify gaps that block the next phase or mission.  
Expected Result: Blocker list.  
Validation: Blocking condition is practical and evidence-backed.

Step 5  
Action: Recommend the next safe mission.  
Expected Result: One next mission with required evidence and protected-system boundaries.  
Validation: Next mission is read-only unless approval is explicitly required.

Step 6  
Action: Produce brain update and checkpoint proposal.  
Expected Result: Exact files to update are listed.  
Validation: No brain file is changed unless mission scope includes updates.

## Execution Algorithm

```text
START
-> Collect mission outputs
-> Extract gaps and unknowns
-> Classify gaps
-> Identify blockers
-> Determine next safe mission
-> Propose brain updates
-> Propose checkpoint if milestone
-> Produce gap register
-> END
```

## Deliverables

- Phase 1 gap register
- Blocker list
- Read-only discovery list
- Next mission recommendation
- Brain update proposal
- Checkpoint proposal

## Output Structure

```md
# Digital Twin Gap Register
Sources:
Completed Missions:
Known Facts:
UNKNOWN Items:
CONFLICT Items:
MISSING Items:
DUPLICATE_CANDIDATES:
NEEDS_MORE_EVIDENCE:
Migration Blockers:
Health Check Blockers:
Output Verification Blockers:
AppSheet Twin Blockers:
Recommended Next Mission:
Required Evidence:
Protected Systems:
Brain Updates Proposed:
Checkpoint Proposed: Yes/No
```

## Validation Tests

- Every gap cites source or mission output.
- No unknown is promoted to fact.
- Next mission is practical and bounded.
- No production system changed.

## Failure Conditions

- Required prior mission outputs are missing.
- Gaps cannot be traced to evidence.
- Next mission would require production write without approval.

## Recovery Procedure

1. Stop mission.
2. Mark missing prior outputs.
3. Recommend the earliest incomplete mission as next safe step.
4. If production access is required, request explicit approval before proceeding.

## Brain Updates

Propose updates to:

- `project-brain/CURRENT_TASK.md`
- `project-brain/roadmap/ROADMAP.md`
- `project-brain/PROJECT_BRAIN_MASTER.md`
- relevant files under `project-brain/maps/*`
- `project-brain/bugs/CURRENT_BUGS.md` if bug evidence changes
- checkpoint under `project-brain/checkpoints/` if milestone completed

## Checkpoint Rules

Create/propose checkpoint when:

- Phase 1 baseline inventory is complete.
- AppSheet object map is accepted.
- Apps Script boundary map is accepted.
- Workflow and side-effect maps are accepted.
- Phase 1 next mission plan is accepted.

## Completion Criteria

- Gap register is complete.
- Next mission is specific.
- Brain updates are exact.
- Checkpoint rule is evaluated.
- No production system changed.

## Evidence Requirements

- Mission output references.
- Source file paths.
- Git status.
- Unknown/conflict/blocker evidence.

## Next Mission Trigger

The next mission may start only when Infrastructure Manager accepts the gap register and confirms the next step is safe, read-only, and evidence-backed.

---

## SOP Completion Validation

This SOP is ready for agent execution when:

- Each mission has Purpose, Project Impact, Inputs, Tools, Tables, Agents, Practical Actions, Execution Algorithm, Deliverables, Output Structure, Validation Tests, Failure Conditions, Recovery Procedure, Brain Updates, Checkpoint Rules, Completion Criteria, Evidence Requirements, and Next Mission Trigger.
- Every mission output supports a later mission.
- Every mission has measurable deliverables.
- Missing evidence is handled as `UNKNOWN`.
- No production system is modified by the SOP.
