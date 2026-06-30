# PROJECT SYNC TASKS

Purpose
(compact task board and task-to-source index for ChatGPT Project Sources; `project-brain/TASK_BOARD.md` remains canonical)

## Current Task
(the latest task that changed project sync state)

Task Name
(short name of the active local task)
Architect Mediation Phase 2.

Meaning
(what the task means)
Make the already-committed Architect Mediation Phase 1 workflow discoverable and enforceable from Reviewer and sync/bootstrap files without creating a new agent.

Owner
(agent/tool that performs the work)
Codex with Orchestrator, Infrastructure Manager / Architect, QA, and Reviewer workflow review.

Authority
(source allowed to define task truth)
Project Brain defines task state; Git defines committed/pushed truth; user request defines task scope; sync files are compact mirrors.

Status
(current completion state)
Implemented in existing Reviewer and `PROJECT_SYNC_*` files only; committed/pushed state is defined by Git and final closeout report.

Validation Status
(how proven)
Validated with `git diff --check`; changed files are limited to `project-brain/agents/REVIEWER_AGENT.md`, `PROJECT_SYNC_STATE.md`, `PROJECT_SYNC_TASKS.md`, and `PROJECT_SYNC_OPERATING_GUIDE.md`; no `app/**`, `lib/**`, or `prisma/**` files changed.

Blocked
(current blocker)
None for Architect Mediation Phase 2 coverage.

## Latest Runtime Quality Commit
(separate runtime quality work that is now committed and must not be treated as local-only)

Task Name
(short name of the local runtime task)
Production Draft Generation maintenance quality fix.

Meaning
(what the task means)
Improve internal draft recommendations so maintenance reports produce expected reviewable maintenance parts instead of only labor/travel.

Owner
(agent/tool that performs the work)
Codex with AI_DRAFT_AGENT ownership and QA/Reviewer workflow review.

Authority
(source allowed to define task truth)
Runtime validation proves behavior; Project Brain defines task state; Liad defines business acceptance.

Status
(current completion state)
Committed in `77cf9cd Finalize service report draft runtime quality updates`; no uncommitted runtime maintenance files remain.

Validation Status
(how proven)
Code review confirmed scope and protected boundaries; the previously known unrelated AI Draft adapter typing issue is now fixed.

Blocked
(current blocker)
None for commit state. Future classification refinement would be a new selected quality-hardening task.

## Next Recommended Task
(the next safe capability recommended by Project Brain)

Task Name
(short name of next safe/context capability)
Asset Workspace / Asset Timeline.

Meaning
(what the task means)
Expose compressor-level service, commercial, financial, recommendation, blocker, and customer history using existing runtime.

Owner
(agent/tool that should perform the work)
Codex Orchestrator, Map Guard, Builder, QA, Reviewer; domain support from Project Brain and existing runtime owners.

Authority
(source allowed to define task truth)
Project Brain and Liad priority selection.

Status
(current completion state)
Recommended next; not started in this turn.

Approval Needed
(what must stop before proceeding)
No approval for read-only UI/context work; explicit approval before schema, DB writes, inventory action, package install, external action, or production work.

## Task-To-Source Index
(which files to read for each common task type)

| Task Type | Read These Sources | Short Explanation | Owner / Authority | Related Agent |
|---|---|---|---|---|
| Startup / Reality Check | `PROJECT_SYNC_STATE.md`, `PROJECT_INDEX.md`, `PROJECT_OPERATING_PROTOCOL.md`, `project-brain/CURRENT_TASK.md`, `project-brain/TASK_BOARD.md`, `project-brain/DECISION_LOG.md` | Load current state, protocol, task board, and decisions | Project Brain / Git | project-brain-startup, Orchestrator |
| Architect Mediation / Task Packet | `PROJECT_SYNC_OPERATING_GUIDE.md`, `agents/ORCHESTRATOR_AGENT.md`, `agents/INFRASTRUCTURE_MANAGER_AGENT.md`, `project-brain/agents/AUTONOMOUS_BUILD_WORKFLOW.md`, `project-brain/agents/REVIEWER_AGENT.md` | Convert intent to a Task Packet, run Architect review before implementation, and verify architecture/source-of-truth/simplification before closeout | Orchestrator / Infrastructure Manager / Project Brain workflow | Orchestrator, Infrastructure Manager / Architect, Reviewer |
| Closeout / Handoff | `PROJECT_SYNC_DELTA.md`, `PROJECT_SYNC_TASKS.md`, `PROJECT_SYNC_OPERATING_GUIDE.md`, `project-brain/CURRENT_TASK.md`, `project-brain/TASK_BOARD.md`, `project-brain/DECISION_LOG.md`, `PROJECT_INDEX.md` | Record completed work, validation, blocker, next task, commit hash, Google Drive mirror result, `01_Project_Sources` readback, runtime-folder mirror exclusion, clean/non-clean git status, and Final Sync Status `GREEN` / `YELLOW` / `RED` | Project Brain / Git / approved Drive mirror | project-brain-session-close, Git Agent |
| Agent Routing | `PROJECT_SYNC_AGENTS.md`, `agents/AGENT_REGISTRY.md`, `project-brain/AGENT_GOVERNANCE_MAP.md`, relevant agent source file | Pick existing owner and avoid duplicate agents | Agent registry | Orchestrator |
| AI Draft / Production Draft | `.agents/skills/ai-draft-recommendation/SKILL.md`, `agents/AI_DRAFT_AGENT.md`, `project-brain/maps/AI_DRAFT_FIELD_MAPPING.md`, `project-brain/SERVICE_COMMERCIAL_RULES.md`, `project-brain/PRICING_EVIDENCE_ENGINE_SPEC.md`, `project-brain/MANUFACTURER_SERVICE_KITS.md`, `project-brain/SKU_MATCHING_RULES.md` | Draft recommendation, pricing evidence, service-kit rules, review flags | AI Draft Agent / Project Brain / runtime validation | AI_DRAFT_AGENT |
| BusinessDocument Runtime | `project-brain/DOCUMENT_ENGINE.md`, `app/business-documents/`, `lib/business-document-engine.ts`, `lib/business-document-draft-gateway.ts`, `APPLICATION_ROUTE_MAP.md` | Document review, preview, PDF, gateway and document engine behavior | Runtime validation / Git | Commercial Runtime, QA |
| Financial Runtime | `project-brain/CURRENT_TASK.md`, `lib/financial-intake-boundary.ts`, `lib/business-document-engine.ts`, relevant BusinessDocument routes | Financial intake/status and receipt/tax-invoice draft readiness | Project Brain / runtime validation | Financial domain owner through Orchestrator |
| Asset Workspace / Timeline | `APPLICATION_ROUTE_MAP.md`, `DATA_COVERAGE_AUDIT.md`, `app/equipment/`, `app/customers/`, `app/service-reports/`, `app/business-cases/`, `project-brain/TASK_BOARD.md` | Existing asset/customer/service data and route context | Runtime validation / Project Brain | Builder, QA |
| Maven / Invoice4U Readiness | `agents/MAVEN_AGENT.md`, `project-brain/migration/MAVEN_SOURCE_INVENTORY.md`, `project-brain/SERVICE_MAVEN_MAPPING.md`, `project-brain/apps-script/MavenAPI.gs`, `project-brain/reference/maven-samples/document_102488.pdf` | Maven source evidence, mapping, API gaps, sample output | Maven Agent / source evidence / human approval | MAVEN_AGENT |
| Apps Script / AppSheet | `agents/APPS_SCRIPT_AGENT.md`, `project-brain/apps-script/*.gs`, `project-brain/maps/APPS_SCRIPT_MAP.md`, `project-brain/appsheet-ui/*.md`, `project-brain/maps/APPSHEET_MAP.md` | Legacy production source behavior and migration context | Source evidence / protected systems | APPS_SCRIPT_AGENT |
| Schema / Migration / Import | `prisma/schema.prisma`, `project-brain/migration/POSTGRESQL_V1_SCOPE.md`, `project-brain/migration/DATA_MIGRATION_PLAN.md`, `project-brain/migration/DATABASE_SCHEMA_V1.md`, `project-brain/migration/REAL_DATA_READ_PLAN.md` | Schema shape, approved V1 scope, import waves, read-only validation | Prisma schema / Project Brain / database | Infrastructure Manager |
| Inventory / Procurement | `project-brain/INVENTORY_LEARNING_LOOP_SPEC.md`, `project-brain/PART_COMPATIBILITY_REGISTRY.md`, `project-brain/PARTS_SKU_INTELLIGENCE_SPEC.md`, `DATA_COVERAGE_AUDIT.md` | Future inventory and parts boundaries without stock mutation | Project Brain / human approval | Future inventory owner via Orchestrator |
| Email Intake | `project-brain/EMAIL_DOCUMENT_INTAKE_AGENT_SPEC.md`, `project-brain/EMAIL_INTAKE_EVIDENCE_PACKET_SCHEMA.md`, `agents/ORCHESTRATOR_AGENT.md` | Planned evidence-packet-first email intake; not executable | Project Brain / human approval | EMAIL_DOCUMENT_INTAKE_AGENT planned |
| Build / Type Hygiene | `package.json`, `tsconfig.json`, known error files, `project-brain/bugs/CURRENT_BUGS.md`, `project-brain/TASK_BOARD.md` | Build/type errors and known unrelated blockers | Runtime validation / Project Brain | QA_AGENT_WORKFLOW_ROLE |

## Other Valid Candidate Tasks
(approved candidate tasks that may be selected instead)

| Task | Meaning | Status | Source To Read | Approval Needed |
|---|---|---|---|---|
| Correction Persistence Type Expansion | Review whether approved draft learning needs structured persistence beyond existing logs/rawSource | Candidate only | `project-brain/TASK_BOARD.md`, `lib/business-document-learning-boundary.ts` | Schema/DB approval if new persistence is needed |
| BusinessDocument Type Expansion Design | Plan true Tax Invoice / Receipt, Purchase Order, Delivery Note, and Debit Note support | Candidate only | `project-brain/TASK_BOARD.md`, `prisma/schema.prisma`, `project-brain/DOCUMENT_ENGINE.md` | Enum/schema approval required |
| Inventory And Procurement Boundary | Define parts/procurement/supplier/stock boundaries before inventory mutation exists | Candidate only | `project-brain/INVENTORY_LEARNING_LOOP_SPEC.md`, `project-brain/PART_COMPATIBILITY_REGISTRY.md` | Inventory/schema/write approval required |
| FinancialEvidence Persistence | Persist payment/financial evidence and attachments after storage/privacy/schema approval | Candidate only | `project-brain/TASK_BOARD.md`, financial runtime files | Schema/storage/DB approval required |
| Automation And Integration Adapter Readiness | Prepare Maven/Invoice4U/email/bank/OCR adapter evidence and command boundaries | Candidate only | Maven/AppScript/email source files listed above | External action/secret/write approval required |
| Build Hygiene For AI Draft Adapter Typing | Fixed known unrelated TypeScript pricing-evidence typing issue | Completed by current task | `app/ai-drafts/ai-draft-adapter.ts`, `project-brain/bugs/CURRENT_BUGS.md` | No protected approval was needed; no package changes |

## Forbidden / Gated Tasks
(tasks that require explicit approval or are currently not allowed)

| Task | Meaning | Status | Source To Read | Approval Needed |
|---|---|---|---|---|
| Real Maven Execution | Execute `NEXT-MAVEN-CMD-NEXT-AI-DRAFT-5806` or create any real Maven/Invoice4U document | APPROVAL_REQUIRED | `agents/MAVEN_AGENT.md`, `project-brain/migration/MAVEN_SOURCE_INVENTORY.md`, readiness checklist in `project-brain/CURRENT_TASK.md` | Explicit Liad approval |
| Wave 2/3/4 Import | Import additional source-system data into Supabase | APPROVAL_REQUIRED | `project-brain/migration/DATA_MIGRATION_PLAN.md`, `project-brain/TASK_BOARD.md` | Explicit import/DB approval |
| Production Cutover | Move from AppSheet/Sheets production to Next.js/Supabase system | Not approved | `PROJECT_OPERATING_PROTOCOL.md`, `project-brain/roadmap/ROADMAP.md` | Explicit production approval |
| Customer-Facing Actions | Send email, WhatsApp, final invoice, receipt, external PDF delivery, or customer document | Not approved | `PROJECT_OPERATING_PROTOCOL.md`, relevant domain docs | Explicit customer-action approval |
| Inventory Mutation | Deduct, reserve, import, or change stock/procurement data | Not approved | Inventory/parts source files | Explicit inventory approval |
