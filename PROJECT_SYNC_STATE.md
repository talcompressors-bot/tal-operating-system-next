# PROJECT SYNC STATE

Purpose
(compact current-state and source-index entrypoint for ChatGPT Project Sources; Project Brain remains canonical)

## Sync File Index
(which existing sync file to read first for each question)

| Path | Short Explanation | When To Read | Owner / Authority | Related Capability / Domain / Agent |
|---|---|---|---|---|
| `PROJECT_SYNC_STATE.md` | Current state plus source index (the fastest overview of where the project is now and where deeper knowledge lives) | Start of every ChatGPT/Codex session and before choosing files | Project Brain for state; Git for committed file truth | Project Brain, Orchestrator, ChatGPT Project Sources |
| `PROJECT_SYNC_DELTA.md` | Latest changes and why they matter (recent sprint/change log for Project Sources) | Before reviewing recent behavior or explaining what changed | Git for commit truth; Project Brain for task truth; runtime validation for behavior | Git Agent, Project Brain Agent, QA |
| `PROJECT_SYNC_AGENTS.md` | Agent/tool/skill catalog (who does what and what each may read/update) | Before routing work or using a specialist workflow | `agents/AGENT_REGISTRY.md` and skill files | Orchestrator, specialist agents, workflow roles |
| `PROJECT_SYNC_TASKS.md` | Current, next, candidate, and gated tasks (what each task means and where to read deeper) | Before selecting or continuing work | Project Brain task board and human owner priority | Project Brain Agent, Orchestrator |
| `PROJECT_SYNC_AUTHORITY.md` | Source-of-truth matrix (who defines truth for each information type) | Whenever facts conflict or a source is unclear | Project operating protocol and canonical source files | Infrastructure Manager, Reviewer |
| `PROJECT_SYNC_OPERATING_GUIDE.md` | Continuation guide (how ChatGPT/Codex should proceed safely, including mandatory end-of-task protocol) | Before any task and during closeout | `PROJECT_OPERATING_PROTOCOL.md`, `PROJECT_INDEX.md`, Project Brain | Codex, ChatGPT, Map Guard, QA |

## Current Project State
(where the project is now and what work is active)

Current Mode
(the operating mode that controls what work should happen now)
`CAPABILITY_BUILDING`

Governance Status
(whether governance can be expanded freely)
`FROZEN`

TDOS Status
(whether the operating protocol can be redesigned freely)
`FROZEN / Maintenance Mode`

Current Wave
(the active capability area)
Wave 3 Commercial Runtime and Document Engine, with Wave 4 Financial Runtime started internally.

Current Task
(the task most recently completed in this sync layer)
Known TypeScript pricing-evidence typing issue in `app/ai-drafts/ai-draft-adapter.ts` is fixed.

Current Business Goal
(what TAL gains from the active work)
A new ChatGPT Project can understand current state, recent changes, source locations, agents, authorities, next tasks, and protected boundaries using only `PROJECT_SYNC_*` files, then follow pointers for deeper work.

Current Runtime Capability
(what works now inside the shadow ERP)
Internal ServiceReport -> BusinessCase -> BusinessDocument draft generation exists through the protected Draft Gateway; existing internal drafts can now be explicitly refreshed from the current ServiceReport recommendation while preserving the same BusinessDocument ID; customer preview/PDF remains simple and external actions remain gated.

Latest Committed Git Baseline
(the latest pushed sync-layer baseline before this expansion)
`97264ab Reconcile sync truth after runtime quality commit`

Latest Local Delta
(what changed after the pushed baseline)
Replaced nullable pricing-evidence `.map(...).filter(...)` chains with non-null `flatMap` evidence construction in `app/ai-drafts/ai-draft-adapter.ts`; business logic is unchanged and `npx.cmd tsc --noEmit --pretty false --incremental false` now passes.

Last Recorded Implementation Commit
(the last meaningful implementation commit recorded in Project Brain)
`5313aec Improve autonomous business draft generation`

Last Recorded Closeout Commit
(the last meaningful closeout/state-sync commit recorded in Project Brain)
`b5c5418 Sync project brain after operations command center`

Project Completion
(capability-weighted estimate from Project Brain, not wave-count math)
81%.

## Source Coverage Audit
(what each sync file covered before expansion and what was missing)

| Existing Sync File | Already Covered | Missing Before This Expansion | Expansion Action |
|---|---|---|---|
| `PROJECT_SYNC_STATE.md` | Current mode, wave, task, evidence, project tree, next action | Index of sync files, specialized sources, task-specific source map, generated/evidence files, future sync candidates | Added source index sections and deeper-source routing |
| `PROJECT_SYNC_DELTA.md` | Maintenance-quality delta and initial sync-layer delta | Latest sync-expansion delta and source-index coverage evidence | Added sync expansion as latest delta |
| `PROJECT_SYNC_AGENTS.md` | Core agents, workflow roles, three repo skills | Full registry coverage, root/project-brain governance systems, Codex tool categories, future/planned agents with boundaries | Expanded to all discovered active/planned agents, workflow roles, governance systems, and skills |
| `PROJECT_SYNC_TASKS.md` | Current maintenance fix, Asset Workspace next task, candidates and gated tasks | Task-specific file pointers and source routing by task type | Added task-to-source index and current next-task authority |
| `PROJECT_SYNC_AUTHORITY.md` | Core authority matrix | File-level authority for project state, migration, evidence, agents, specialized knowledge, generated reports | Added source-owner matrix and conflict rules |
| `PROJECT_SYNC_OPERATING_GUIDE.md` | Startup, work selection, safe execution, closeout, protected boundaries | Mandatory sync-file/source-index check before any task and specialized-source routing | Added before-task source-selection protocol |

## Canonical State Sources
(source files that define live project truth)

| Path | Short Explanation | When To Read | Owner / Authority | Related Capability / Domain / Agent |
|---|---|---|---|---|
| `PROJECT_INDEX.md` | Living project map and Reality Check rules (canonical startup/project tree entry) | Every startup, closeout, approval gate, and Project Reality Check | Project Brain / Git-backed docs | Project Brain Agent, Orchestrator |
| `PROJECT_OPERATING_PROTOCOL.md` | Official operating protocol and TDOS risk model (controls what may proceed) | Before risk classification, protected action review, or approval request | Human owner approved protocol | Orchestrator, Infrastructure Manager |
| `project-brain/CURRENT_TASK.md` | Current phase, task, blocker, next task, active state (single source for current state) | Before implementation, closeout, or task selection | Project Brain | Project Brain Agent |
| `project-brain/TASK_BOARD.md` | NOW/NEXT/DONE/BLOCKED board (canonical task list) | Before selecting work or explaining task meaning | Project Brain | Project Brain Agent, Orchestrator |
| `project-brain/DECISION_LOG.md` | Approved decisions and rationale (why rules changed) | Before changing behavior, governance, or business rules | Project Brain / human owner decisions | Reviewer, Infrastructure Manager |
| `project-brain/current/LIVE_OBJECTS.md` | Active IDs and important live object references (IDs must not be invented) | Before using ServiceReport, BusinessDocument, AutomationCommand, or Maven IDs | Project Brain plus database/runtime validation | QA, AI Draft Agent, Maven Agent |
| `PROJECT_SYNC_*.md` | Compact ChatGPT Project Sources layer (summary and routing layer, not deeper authority) | In every new ChatGPT Project session before opening deeper sources | Mirrors Project Brain/Git/runtime truth | ChatGPT, Codex |

## Knowledge Dependency Map Location
(where to find source-of-truth, owner, consumer, trigger, sync-policy, and stale-risk rules)

| Path | Short Explanation | When To Read | Owner / Authority | Related Capability / Domain / Agent |
|---|---|---|---|---|
| `PROJECT_SYNC_AUTHORITY.md` | Full knowledge dependency map (document/category source of truth, updater, readers, update trigger, sync policy, stale-risk) | Before deciding what is authoritative, what must be uploaded, or what becomes stale after a task | Project Brain/Git/runtime/database/human approvals, summarized by Codex | ChatGPT, Codex, Reviewer, Google Drive mirror |
| `PROJECT_SYNC_STATE.md` | Entry pointer to dependency and source indexes (where deeper knowledge lives) | Start of every new session and before source selection | Project Brain for state; sync layer for routing | ChatGPT, Codex, Orchestrator |
| `PROJECT_SYNC_OPERATING_GUIDE.md` | Procedure for applying the dependency map (how to read, update, validate, mirror, and report sync state) | Before any task and at closeout | Operating protocol and sync authority rules | Codex, ChatGPT, Map Guard, QA |

## Sync Policy Definitions
(how document/category knowledge should be mirrored or uploaded)

| Sync Policy | Meaning | Default Use | Risk If Misused |
|---|---|---|---|
| Drive mirror | Current `PROJECT_SYNC_*` files should be copied to the approved Google Drive mirror after completed tasks when available | Mandatory closeout mirror for compact sync files | Drive copy may lag behind Git and Project Sources |
| ChatGPT Project Sources default | Upload the compact `PROJECT_SYNC_*` files by default for new ChatGPT Projects | Main Project Sources layer | Too much or too little context can create noise or holes |
| Task-only upload | Open or upload the deeper source only when the task needs it | Project Brain details, runtime files, evidence, reports, source-system docs | Large historical files can confuse new sessions if treated as current truth |

## Task-Specific Source Index
(where to go for deeper knowledge by task type)

| Path | Short Explanation | When To Read | Owner / Authority | Related Capability / Domain / Agent |
|---|---|---|---|---|
| `APPLICATION_ROUTE_MAP.md` | Implemented route inventory (routes, modules, statuses, data sources) | UI/runtime route work, read-only page validation, navigation changes | Runtime files plus Project Brain | Builder, QA |
| `DATA_COVERAGE_AUDIT.md` | Data coverage and module readiness audit (what tables/data are available) | Before assuming source data exists or marking data missing | Runtime validation / database readback | QA, AI Draft Agent |
| `project-brain/maps/SYSTEM_MAP.md` | Canonical system map (legacy and target system navigation) | Before architecture, source-system, or ownership work | Project Brain | Infrastructure Manager |
| `project-brain/maps/AI_DRAFT_FIELD_MAPPING.md` | AI draft field mapping (how source fields map into recommendations) | AI draft recommendation, pricing evidence, draft generation tasks | Project Brain / AI Draft Agent | AI_DRAFT_AGENT |
| `project-brain/maps/APPS_SCRIPT_MAP.md` | Apps Script map (legacy script functions and boundaries) | Apps Script, Maven webhook, Drive/email/report-render tasks | Project Brain / Apps Script evidence | APPS_SCRIPT_AGENT |
| `project-brain/maps/APPSHEET_MAP.md` | AppSheet map (legacy tables/views/actions context) | AppSheet parity, source-system, and migration tasks | Project Brain / legacy source evidence | Infrastructure Manager |
| `prisma/schema.prisma` | Prisma schema (models, enums, relations) | Any model/field/schema question; never edit without approval | Schema authority | Infrastructure Manager |
| `app/` | Next.js runtime routes and Server Actions (actual UI/app behavior) | Runtime implementation/review tasks | Git/runtime validation | Builder, QA |
| `lib/` | Shared runtime engines and boundaries (business logic source) | Engine, recommendation, gateway, document, financial, approval work | Git/runtime validation | Domain agents |
| `data-sources/` | Local generated/reference data sources (manufacturer fixtures and source extracts) | SKU/parts/service-kit/source-data evidence tasks | Source files plus generator docs | AI_DRAFT_AGENT, Infrastructure Manager |

## Specialized Knowledge Index
(deeper files to read only when relevant)

| Path | Short Explanation | When To Read | Owner / Authority | Related Capability / Domain / Agent |
|---|---|---|---|---|
| `project-brain/SERVICE_COMMERCIAL_RULES.md` | Commercial service line rules (labor, travel, service item rules) | BusinessDocument/draft line generation and review | Project Brain / human-approved business rules | AI_DRAFT_AGENT, Commercial Runtime |
| `project-brain/PRICING_EVIDENCE_ENGINE_SPEC.md` | Pricing evidence rules (trusted pricing hierarchy and review flags) | Pricing, confidence, price review, learning-loop tasks | Project Brain / runtime validation | AI_DRAFT_AGENT |
| `project-brain/PARTS_SKU_INTELLIGENCE_SPEC.md` | SKU and parts intelligence spec (part matching rules and safety gates) | SKU matching, manufacturer part, customer-facing SKU decisions | Project Brain | AI_DRAFT_AGENT |
| `project-brain/SKU_MATCHING_RULES.md` | SKU matching rules (when SKU evidence can be trusted) | Manufacturer SKU matching and preview/PDF SKU display | Project Brain / runtime validation | AI_DRAFT_AGENT, QA |
| `project-brain/MANUFACTURER_PARTS_REGISTRY.md` | Manufacturer parts registry knowledge (part registry rules) | Manufacturer part evidence and registry changes | Project Brain / source evidence | AI_DRAFT_AGENT |
| `project-brain/MANUFACTURER_SERVICE_KITS.md` | Manufacturer service kit knowledge (service-kit expectations) | Maintenance/service-kit draft generation | Project Brain / source evidence | AI_DRAFT_AGENT |
| `project-brain/MANUFACTURER_KNOWLEDGE_BASE.md` | Manufacturer knowledge base (compressor/manufacturer context) | Compressor-family/manufacturer evidence work | Project Brain | AI_DRAFT_AGENT |
| `project-brain/PART_COMPATIBILITY_REGISTRY.md` | Part compatibility registry (compatibility assumptions) | Parts compatibility or substitutions | Project Brain | AI_DRAFT_AGENT, Inventory future |
| `project-brain/SERVICE_PATTERN_INTELLIGENCE_REGISTRY.md` | Service pattern rules (service-type and interval patterns) | Maintenance interval and service pattern decisions | Project Brain | AI_DRAFT_AGENT |
| `project-brain/DOCUMENT_ENGINE.md` | Document engine knowledge (BusinessDocument rendering/output rules) | BusinessDocument preview/PDF/review work | Project Brain / runtime validation | Commercial Runtime |
| `project-brain/SERVICE_MAVEN_MAPPING.md` | Service-to-Maven mapping (adapter mapping context) | Maven adapter readiness or payload review | Project Brain / Maven evidence | MAVEN_AGENT |
| `project-brain/migration/MAVEN_SOURCE_INVENTORY.md` | Maven source inventory (Maven-origin tabs/API evidence and gaps) | Maven readiness, Maven import, API contract work | Project Brain / source evidence | MAVEN_AGENT |
| `project-brain/EMAIL_DOCUMENT_INTAKE_AGENT_SPEC.md` | Planned email intake agent spec (non-executable evidence-packet plan) | Email intake planning only; never for sending email | Project Brain / human approval | EMAIL_DOCUMENT_INTAKE_AGENT planned |
| `project-brain/EMAIL_INTAKE_EVIDENCE_PACKET_SCHEMA.md` | Email evidence packet schema (future packet shape) | Future email intake evidence design | Project Brain | EMAIL_DOCUMENT_INTAKE_AGENT planned |

## Migration And Source-System Index
(files that explain imports, staging, schema, and source-system boundaries)

| Path | Short Explanation | When To Read | Owner / Authority | Related Capability / Domain / Agent |
|---|---|---|---|---|
| `project-brain/migration/POSTGRESQL_V1_SCOPE.md` | Approved PostgreSQL V1 scope (what belongs in staging schema) | Any DB/schema/import planning | Project Brain / human approval | Infrastructure Manager |
| `project-brain/migration/DATA_MIGRATION_PLAN.md` | Import waves and migration plan (dependency/order and blockers) | Import readiness, source mapping, staged migration tasks | Project Brain | Infrastructure Manager |
| `project-brain/migration/DATABASE_SCHEMA_V1.md` | Database schema design reference (V1 schema intent) | Schema comparison or migration review | Project Brain | Infrastructure Manager |
| `project-brain/migration/PRISMA_SCHEMA_V1.md` | Prisma schema planning reference (expected Prisma shape) | Prisma/schema validation or drift investigation | Project Brain | Infrastructure Manager |
| `project-brain/migration/REAL_DATA_READ_PLAN.md` | Read-only real data validation plan (how to prove data without writes) | Read-only DB validation tasks | Runtime/database validation | QA |
| `project-brain/migration/BUILD_STRATEGY.md` | Build/migration strategy (how to sequence platform work) | Build strategy or migration-roadmap questions | Project Brain | Orchestrator |
| `project-brain/appsheet-ui/*.md` | AppSheet UI inventories and migration maps (legacy UI behavior) | AppSheet parity, screen migration, UI route planning | Project Brain / AppSheet discovery | APPS_SCRIPT_AGENT, Infrastructure Manager |
| `project-brain/apps-script/*.gs` | Apps Script source snapshots (legacy automation code evidence) | Apps Script, Maven, email, report rendering analysis | Source evidence; protected from unapproved edits | APPS_SCRIPT_AGENT, MAVEN_AGENT |

## Implementation And Runtime Docs Index
(implementation plans, runtime blueprints, and task planning sources that should be opened only when relevant)

| Path | Short Explanation | When To Read | Owner / Authority | Related Capability / Domain / Agent |
|---|---|---|---|---|
| `AI_DRAFT_RUNTIME_BLUEPRINT.md` | AI Draft runtime blueprint (root-level implementation context for draft runtime) | AI Draft runtime architecture or regression work | Project Brain / runtime source evidence | AI_DRAFT_AGENT |
| `AI_DRAFT_FLOW_MAP.md` | AI Draft flow map (how AI draft recommendation pieces connect) | AI Draft flow explanation or route/source tracing | Project Brain / runtime source evidence | AI_DRAFT_AGENT |
| `AI_RULES.md` | AI behavior/rules summary (project AI rules reference) | Before AI recommendation behavior changes | Project Brain / human-approved rules | AI_DRAFT_AGENT |
| `RUN_AI_DRAFT_AGENT.md` | AI draft agent run instructions (manual execution guidance) | Manual AI draft test/run preparation | AI Draft Agent docs | AI_DRAFT_AGENT |
| `CUSTOMERS_MODULE_IMPLEMENTATION_PLAN.md` | Customers module plan (historical implementation plan) | Customer module context or regression review | Project Brain / Git history | Builder, QA |
| `project-brain/implementation/ALIAS_REGISTRY_IMPLEMENTATION_PLAN.md` | Alias registry implementation plan (matching/alias roadmap) | Alias matching or SKU/name normalization work | Project Brain | AI_DRAFT_AGENT |
| `project-brain/implementation/EQUIPMENT_REGISTRY_IMPLEMENTATION_PLAN.md` | Equipment registry plan (asset identity planning) | Asset Workspace / equipment identity work | Project Brain | Infrastructure Manager |
| `project-brain/implementation/SERVICE_KIT_REGISTRY_IMPLEMENTATION_PLAN.md` | Service kit registry plan (maintenance kit data structure planning) | Service-kit/maintenance draft work | Project Brain | AI_DRAFT_AGENT |
| `project-brain/EQUIPMENT_IDENTITY_REGISTRY_DISCOVERY.md` | Equipment identity discovery (compressor identity evidence) | Asset Workspace / equipment matching tasks | Project Brain / source evidence | Infrastructure Manager |
| `project-brain/registries/FACTORY_ASSET_REGISTRY.md` | Factory asset registry (asset registry reference) | Asset Timeline / asset workspace context | Project Brain | Asset/Operations domain |
| `project-brain/engines/OUTPUT_VERIFICATION_ENGINE.md` | Output verification engine (rules for verifying produced documents/output) | PDF/preview/document output QA | Project Brain / QA evidence | QA_AGENT_WORKFLOW_ROLE |
| `project-brain/TEST_SCENARIOS.md` | Test scenarios (known validation scenarios) | Regression planning or QA coverage review | Project Brain / QA | QA_AGENT_WORKFLOW_ROLE |

## Evidence And Generated Reports Index
(files that preserve proof, audits, generated reports, and reference assets)

| Path | Short Explanation | When To Read | Owner / Authority | Related Capability / Domain / Agent |
|---|---|---|---|---|
| `Commercial_Intelligence_Source_Audit.md` | Commercial intelligence source audit (root evidence for commercial data sources) | Commercial intelligence or pricing/source review | Runtime/source audit evidence | AI_DRAFT_AGENT, Commercial Runtime |
| `Commercial_Intelligence_Verification.md` | Commercial intelligence verification (root validation evidence) | Commercial intelligence validation/regression review | Runtime validation evidence | QA, Commercial Runtime |
| `Customer_Pricing_Intelligence_Discovery.md` | Customer pricing discovery (pricing evidence source analysis) | Customer-specific pricing evidence work | Source evidence / Project Brain | AI_DRAFT_AGENT |
| `Equipment_Commercial_Link_Discovery.md` | Equipment-commercial link discovery (asset to commercial evidence) | Asset Workspace / commercial history by compressor | Source evidence / Project Brain | Asset/Commercial domain |
| `SCR_PRICING_INTELLIGENCE_AUDIT.md` | SCR pricing audit (pricing evidence for SCR context) | SCR draft/pricing decisions | Runtime/source audit evidence | AI_DRAFT_AGENT |
| `SCR_SKU_TO_DOCUMENT_DRAFT_ANALYSIS.md` | SCR SKU-to-document analysis (how SKU evidence maps into drafts) | SKU display or document line SKU review | Source evidence / Project Brain | AI_DRAFT_AGENT |
| `project-brain/FULL_PROJECT_DISCOVERY_AUDIT.md` | Full discovery audit and completion-model correction evidence | Completion-model or historical audit questions | Project Brain / audit evidence | Reviewer |
| `project-brain/KNOWLEDGE_BASE_CONSOLIDATION_REPORT.md` | Knowledge base consolidation report (what knowledge was merged/organized) | Before adding/expanding knowledge docs | Project Brain | Infrastructure Manager |
| `project-brain/KNOWLEDGE_GRAPH_VALIDATION.md` | Knowledge graph validation (relationship/evidence checks) | Knowledge-source trust or graph validation work | Project Brain / validation evidence | QA |
| `project-brain/AGENT_CAPABILITY_INTELLIGENCE_AUDIT.md` | Agent capability audit (agent coverage and gaps) | Agent/tool expansion or routing questions | Agent registry / Project Brain | Orchestrator |
| `project-brain/ACTION_SERVER_KNOWLEDGE_ACCESS_AUDIT.md` | Action-server knowledge access audit (what runtime can access) | Server Action or knowledge-access work | Project Brain / runtime evidence | Infrastructure Manager |
| `project-brain/archive/research/*.md` | Archived evidence packets (SCR 40PM, service kit, commercial evidence, Maven link registry) | Historical evidence for SKU/service-kit/Maven decisions | Archived Project Brain evidence | AI_DRAFT_AGENT, MAVEN_AGENT |
| `AI_DRAFT_RECOMMENDATION_PREVIEW_5806.md` | AI Draft preview evidence for ServiceReport 5806 (known test chain) | AI draft regression or 5806 context | Runtime validation / Project Brain | AI_DRAFT_AGENT |
| `AI_DRAFT_EVIDENCE_PACKET.md` | AI draft evidence packet (supporting recommendation evidence) | AI draft readiness/review tasks | Project Brain / runtime evidence | AI_DRAFT_AGENT |
| `SCR_MATCHING_PREVIEW.md` | SCR matching preview evidence (SKU/part matching context) | SCR SKU matching work | Runtime validation / source evidence | AI_DRAFT_AGENT |
| `PM_EPM_SPARE_PARTS_SOURCE_OF_TRUTH_REPORT.md` | PM/EPM spare-parts source report (manufacturer-source context) | Manufacturer parts registry or SKU source work | Source evidence | AI_DRAFT_AGENT |
| `project-brain/reference/maven-samples/document_102488.pdf` | Maven sample PDF reference (layout/reference asset) | PDF/preview layout comparison and Maven document shape | Reference asset / Maven evidence | MAVEN_AGENT, QA |

## Future Sync Candidates
(sources that may need summaries later, but should not be copied now)

| Path | Short Explanation | When To Read | Owner / Authority | Related Capability / Domain / Agent |
|---|---|---|---|---|
| `project-brain/PROJECT_FILE_INVENTORY.md` | Broad project file inventory (large navigation source) | If a file cannot be found through this sync index | Project Brain | Project Brain Agent |
| `project-brain/PROJECT_DASHBOARD.md` | Dashboard/status artifact (possible future source summary) | Status/dashboard questions if current state is insufficient | Project Brain | Project Brain Agent |
| `project-brain/NEXT_10_TASKS.md` | Possible next-task list (future planning context) | Only after current task board is read | Project Brain / human priority | Orchestrator |
| `project-brain/PROJECT_GAPS.md` | Gap list (unresolved capability/data/process gaps) | Gap review or capability selection | Project Brain | Orchestrator |
| `project-brain/PROJECT_GOAL_TRACEABILITY.md` | Goal-to-work traceability (why tasks exist) | Business-value or scope justification | Project Brain / human goals | Reviewer |
| `project-brain/SYSTEM_HEALTH_RULES.md` | Future health rules (monitoring/readiness planning) | System health planning only | Project Brain | SYSTEM_HEALTH_AGENT planned |
| `project-brain/SYSTEM_HEALTH_AGENT_PLAN.md` | Future health agent plan (not executable) | Health-agent planning, not runtime monitoring | Project Brain | SYSTEM_HEALTH_AGENT planned |
| `PROJECT_SOURCES.md` | Older project sources guide (possible overlap/reference) | Only when validating Project Sources upload contents | Project Brain / docs | ChatGPT Project Sources |
| `PROJECT_MASTER_CONTEXT.md` | Broad master context file (large context reference) | Only if sync files and Project Brain entrypoints are insufficient | Project Brain / docs | ChatGPT Project Sources |
| `NEXT_PHASE_STATUS.md` | Next phase status note (historical status context) | Historical phase/status questions only | Project Brain / docs | Project Brain Agent |
| `ROOT_CAUSE_SUMMARY.md` | Root-cause summary (historical problem explanation) | Debugging a previously documented root cause | Project Brain / evidence | QA |
| `DOCUMENTATION_CLEANUP_PLAN.md` | Documentation cleanup plan (doc-noise management reference) | Before deleting/merging docs or reducing noise | Project Brain / human-approved cleanup intent | Reviewer |

## Project Tree
(capability map from the canonical Project Index)

Wave 1 Party, Asset, and Service Operations Core
(service-report/customer/equipment read foundation)
Complete.

Wave 2 BusinessCase and Service Workflow Layer
(internal workflow from service context to draft/approval/queue dry-run)
Complete.

Wave 3 Commercial Runtime and Document Engine
(business-document generation, review, preview, PDF, commercial runtime)
Started internal; active.

Wave 4 Financial Runtime and Settlement
(financial intake, payment/receipt/tax-invoice runtime)
Started internal at 1%.

Waves 5-9
(inventory/procurement, automation adapters, offline field runtime, production shadow, cutover)
Pending.

## Next Action
(what should happen after the current sync task)

Current Next Task
(the next safe/context capability unless Liad selects another path)
Asset Workspace / Asset Timeline.

Immediate Local Decision
(what is pending locally)
None. The runtime maintenance quality fix was committed in `77cf9cd`, the Drive mirror setup was committed in `7310ddf`, the current working tree is clean, and no uncommitted runtime maintenance files remain.

Next Approval Gate
(what must stop for explicit human approval)
Schema changes, DB writes/imports outside existing protected flows, Maven/Invoice4U, email/customer actions, inventory mutation, source-system/cloud/production actions, package installs, deletes/moves, or git remote changes.

Do Not Touch Without Approval
(protected systems)
Google Sheets, AppSheet, Apps Script, Maven, Invoice4U, Drive writes, email/customer sends, inventory state, Prisma schema/migrations, Supabase settings/data writes, production deployment/cutover.
