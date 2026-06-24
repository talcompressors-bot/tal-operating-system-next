# MASTER ROADMAP

Status: Active consolidated roadmap  
Last updated: 2026-06-24
Scope: TalCompressors-ServiceReports-AI project planning

## Purpose

This file is the master roadmap for current and future project phases.

It consolidates approved planning from:

- `project-brain/CURRENT_TASK.md`
- `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`
- `project-brain/checkpoints/CHECKPOINT_2026-06-15_GOVERNANCE_FOUNDATION_COMPLETE.md`
- `project-brain/SYSTEM_HEALTH_AGENT_PLAN.md`
- `project-brain/roadmap/AI_DRAFT_PILOT_DESIGN.md`
- `AI_DRAFT_FLOW_MAP.md`
- `DOCUMENTATION_CLEANUP_PLAN.md`

This roadmap does not authorize production changes. Production-impacting work still requires explicit approval under `PROJECT_OPERATING_PROTOCOL.md`.

## Roadmap Rules

- Do not invent phases.
- Reuse existing approved phases and sub-plans.
- Compare future work against `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`.
- Run Infrastructure Manager review before creating or modifying architecture, schema, agents, registries, workflows, or migration assets.
- Keep Digital Twin Foundation read-only until explicitly approved otherwise.
- Do not modify Apps Script, Google Sheets live data, AppSheet production, Maven, Drive, or AutomationCommands unless explicitly approved.

## Completed Phases

### PHASE 0 - Governance Foundation

Status: COMPLETE

Source:

- `project-brain/checkpoints/CHECKPOINT_2026-06-15_GOVERNANCE_FOUNDATION_COMPLETE.md`
- `project-brain/CURRENT_TASK.md`

Completed milestone:

PHASE 0 - Governance Foundation complete and pushed to GitHub.

Completed work:

- Governance Foundation committed and pushed.
- Commit `1baeeaac39db51b1c733907c5d211c918ce8b652` pushed.
- Project file tree map committed.
- Commit `b446d81e0e837e6f2e9b38dfe4ef6176a95ac8f0` created.
- Infrastructure Manager V1 active.
- `SHEETS_REGISTRY` populated.
- `PROJECT_OPERATING_PROTOCOL` active.
- `PROJECT_OPERATING_PROTOCOL.md` created as the official governance and execution protocol.
- `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md` created as the future-state comparison guide.
- `data-sources/tools/SHEETS_REGISTRY.md` populated from live `ServiceApp_FIX` Google Sheet headers.
- `agents/INFRASTRUCTURE_MANAGER_AGENT.md` created.
- `agents/INFRASTRUCTURE_REVIEW_TEMPLATE.md` created.
- `agents/AGENT_REGISTRY.md` updated to include Infrastructure Manager.
- Infrastructure Manager V1 tested with a proposed `WorkflowRegistry` / `Workflow Agent` request.
- Infrastructure Manager integrated into `PROJECT_INDEX.md`, `START_CODEX.md`, `project-brain/PROJECT_BRAIN_MASTER.md`, and `project-brain/CURRENT_TASK.md`.

Exit criteria:

- Governance protocol exists and is active.
- Target architecture comparison guide exists.
- Sheets registry exists and is populated from live headers.
- Infrastructure Manager V1 exists and is active.
- Source-of-truth hierarchy is defined.
- Stable production systems were not modified.

Definition of Done:

- Documentation and governance assets created.
- No runtime code created.
- No Apps Script files modified.
- No Google Sheets structure changed.
- No setup functions run.
- No deployment performed.
- Governance documentation pushed to GitHub.

## Current Phase

### PHASE 1 - Digital Twin Foundation

Status: CURRENT

Source:

- `project-brain/CURRENT_TASK.md`
- `project-brain/checkpoints/CHECKPOINT_2026-06-15_GOVERNANCE_FOUNDATION_COMPLETE.md`
- `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`

Current task:

Start Digital Twin Foundation as a read-only mapping phase.

Next step:

Run Infrastructure Manager review for Digital Twin Foundation before creating or modifying anything.

Purpose:

Map the current legacy production system before migration or rebuild.

Scope:

- Map AppSheet tables.
- Map columns and keys.
- Map actions and bots.
- Map Apps Script functions.
- Map Google Sheet schemas.
- Map Drive, Maven, and email side effects.
- Identify duplicate or unsafe flows.
- Support migration blueprint planning.

Initial assets:

- `project-brain/maps/SYSTEM_MAP.md`
- `project-brain/maps/APPSHEET_MAP.md`
- `project-brain/maps/APPS_SCRIPT_MAP.md`
- `data-sources/tools/SHEETS_REGISTRY.md`

Protected systems:

- Apps Script
- Google Sheets live data
- AppSheet production
- Maven
- Drive
- AutomationCommands

Dependencies:

- PHASE 0 Governance Foundation complete.
- Infrastructure Manager V1 active.
- Source-of-truth hierarchy defined.
- `SHEETS_REGISTRY` populated.
- Current task source confirmed at `project-brain/CURRENT_TASK.md`.

Exit criteria:

- Infrastructure Manager review for Digital Twin Foundation completed.
- Existing maps reviewed before any new map or registry is proposed.
- AppSheet, Apps Script, Google Sheets, Drive, Maven, email, and queue boundaries are documented from existing sources.
- Duplicate, stale, missing, or conflicting map sources are identified.
- No production writes are performed.
- No runtime code is modified.

Definition of Done:

- Current system map gaps are documented.
- Existing assets are classified for reuse or extension.
- Stable production flows are identified and protected.
- Migration Blueprint prerequisites are identified.
- Next approved mapping task is clear.

## Future Phases

Future phases come from approved source documents. They are listed here for planning and sequencing only.

### System Health Platform

Source:

- `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`
- `project-brain/SYSTEM_HEALTH_AGENT_PLAN.md`

Target architecture phase:

Phase 3 - System Health Platform.

Purpose:

Build read-only health checks for service reports, Drive files, Maven sync, queue status, schema drift, duplicate records, and automation failures.

Approved sub-phases from `SYSTEM_HEALTH_AGENT_PLAN.md`:

1. Phase 1 - Read-Only Health Check
2. Phase 2 - Scheduled Read-Only Agent
3. Phase 3 - TEST Simulation Agent
4. Phase 4 - Repair Suggestions

Dependencies:

- Governance approval for any production-impacting work.
- Digital Twin mapping sufficient to know tables, fields, workflows, and side effects.
- Explicit approval before creating sheets, writing logs, running setup functions, scheduling triggers, or performing repair actions.

Exit criteria:

- Health check summary format defined.
- Critical checks can detect signed reports without `SignedHtmlFileUrl`, duplicate `ReportCounter`, stuck `AutomationCommands`, broken Drive links, duplicate customer folders, stuck `BusinessDocuments`, and new `BusinessDocumentLog` errors.
- Version 1 does not modify production data except `SystemHealthLog` after approval.

Definition of Done:

- Read-only checks are mapped.
- Production repair remains approval-gated.
- Scheduled checks and test simulations are deferred until approved.

### Output Verification Platform

Source:

- `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`

Target architecture phase:

Phase 4 - Output Verification Platform.

Purpose:

Verify generated outputs before user delivery, including service reports, business documents, emails, PDFs, recommendations, and future invoices.

Dependencies:

- Stable source-of-truth hierarchy.
- Current output workflows mapped.
- Digital Twin and System Health findings available.

Exit criteria:

- Outputs requiring verification are identified.
- Verification boundaries are separated from production writes.
- Human approval remains required for customer-facing, financial, and production actions.

Definition of Done:

- Verification scope and safe checks are documented.
- No customer-facing output is sent automatically.

### AppSheet Digital Twin

Source:

- `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`

Target architecture phase:

Phase 5 - AppSheet Digital Twin.

Purpose:

Map the current AppSheet application into a digital twin covering tables, columns, actions, bots, slices, UX views, security filters, automations, and dependencies.

Dependencies:

- PHASE 1 Digital Twin Foundation started as read-only mapping.
- Existing maps and `SHEETS_REGISTRY` reviewed.
- Infrastructure Manager review completed before new digital twin components are created.

Exit criteria:

- AppSheet production behavior is mapped from evidence.
- Unknown values remain `UNKNOWN`.
- No AppSheet production changes are made.

Definition of Done:

- AppSheet tables, actions, bots, views, and dependencies are documented enough to support migration and health planning.

### Migration Blueprint

Source:

- `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`
- `PROJECT_OPERATING_PROTOCOL.md`

Target architecture phase:

Phase 6 - Migration Blueprint.

Purpose:

Define a safe migration path from Google Sheets / AppSheet / Apps Script into the future platform without breaking production operations.

Dependencies:

- Digital Twin mapping complete enough to understand the legacy system.
- Stable production flows documented.
- Current schema, automation, Drive, Maven, and approval boundaries known.

Exit criteria:

- Migration risks are documented.
- Stable legacy production layer remains protected.
- No migration work begins without explicit approval.

Definition of Done:

- Migration path is described with rollback and approval gates.
- Future platform work remains separated from current production stabilization.

### AI Draft Pilot

Source:

- `project-brain/roadmap/AI_DRAFT_PILOT_DESIGN.md`
- `AI_DRAFT_FLOW_MAP.md`

Purpose:

Create one safe AI-generated business document recommendation from one `ServiceReport`.

Pilot scope:

- Input: one `ReportID` or `ReportCounter`.
- Output: one draft recommendation.
- Allowed output: `BusinessDocument` recommendation, `BusinessDocumentItems` recommendation, pricing reasoning, approval flags.
- Forbidden: Maven document creation, customer sending, invoice finalization, payment status change.

Approved AI Draft implementation phases from `AI_DRAFT_FLOW_MAP.md`:

1. Phase 1 - Document and Verify Existing State
2. Phase 2 - Complete Read-Only AI Draft Recommendation
3. Phase 3 - Write Internal Draft Rows Only
4. Phase 4 - Confirm User Approval and Queue Command
5. Phase 5 - Implement Maven Payload Builder
6. Phase 6 - Create Maven Draft After Approval
7. Phase 7 - Sync Back and Health Checks

Dependencies:

- Service report and business document fields verified.
- `BusinessDocuments`, `BusinessDocumentItems`, and `AutomationCommands` payloads verified.
- AppSheet approval action and Bot condition verified.
- Maven create-document API requirements verified before any Maven draft work.
- Parts / SKU Intelligence must remain read-only until explicitly approved. SKU candidate logic must use exact model, approved alias, service pattern, parts table evidence, and historical invoice evidence.
- Generic compressor descriptions must not trigger automatic SKU matching.
- Inventory deduction must remain outside AI Draft and Pricing Evidence. It requires approved BusinessDocument / invoice workflow, confirmed SKU mapping, approved quantity, audit evidence, and a separate inventory transaction gate.
- Explicit user approval before internal draft rows or Maven draft creation.

Exit criteria:

- Recommendation uses `ServiceReports`, `ReportEquipmentItems`, `PartsUsed`, `Customers_Final`, `ProductsCatalog`, `InvoiceMavenDocuments`, and `InvoiceMavenDocumentItems`.
- Recommendation can cite `project-brain/PARTS_SKU_INTELLIGENCE_SPEC.md` for SKU candidate evidence and `project-brain/PRICING_EVIDENCE_ENGINE_SPEC.md` for price evidence.
- Pricing priority follows: `ProductsCatalog`, same equipment history, same customer history, similar service history, AI estimate with approval flag.
- Output marks `NeedsPriceApproval`, `NeedsUserApproval`, `MissingData`, and `RiskNotes`.
- Output separates `NeedsSkuApproval`, `NeedsQuantityApproval`, and `NeedsPriceApproval`.
- Human review occurs before automation continues.

Definition of Done:

- Stage 1 returns recommendation JSON only.
- Stage 2 writes internal draft rows only after approval.
- Stage 3 creates Maven draft only after separate approval.
- Queue architecture remains protected.

### Action Server Knowledge Layer

Status:

PLANNED

Priority:

After AI Draft Recommendation Readiness.

Before large-scale automation runtime.

Purpose:

Provide AI-facing knowledge packets instead of repeated direct Google Sheets/Maven reads.

The Action Server Knowledge Layer is a planned AI-facing read layer. Google Sheets and Maven remain source/reference systems. The Action Server serves curated, evidence-backed knowledge packets to AI Draft and future agents so they do not repeatedly scan raw Sheets ranges, Maven raw JSON, or long discovery reports.

Future knowledge packets:

- Equipment Evidence.
- Service Pattern Evidence.
- Parts Compatibility Evidence.
- Manufacturer Evidence.
- Pricing Evidence.
- Customer Pricing Evidence.
- AI Draft Readiness Evidence.

Benefits:

- lower token usage
- lower API usage
- faster reasoning
- reusable knowledge packets
- offline readiness
- consistent evidence

Dependencies:

- AI Draft Recommendation Readiness decision rules approved.
- Service Report to Maven Link evidence model defined.
- Pricing Evidence Engine rules defined.
- Equipment Identity, Service Pattern, Parts Compatibility, and Manufacturer Knowledge registries stable enough for read-only packet generation.
- Infrastructure Manager review before any implementation, runtime, API, schema, or cache design.

Boundaries:

- Do not implement from this roadmap item alone.
- Do not create runtime.
- Do not create DB schema.
- Do not create APIs.
- Do not modify Prisma.
- Do not write/import DB data.
- Do not call Maven/Invoice4U.
- Do not modify Google Sheets, AppSheet, Apps Script, Drive, or production workflows.

Exit criteria:

- Action Server Knowledge Layer specification is approved before implementation.
- Knowledge packet shapes are defined.
- Source/reference boundaries are explicit.
- Cache/freshness rules are defined.
- Approval gates are documented.

Definition of Done:

- Roadmap position is clear: after AI Draft Recommendation Readiness and before large-scale automation runtime.
- The layer remains documentation/planning only until a separate implementation task is approved.

### Email Document Intake Agent

Status:

PLANNED

Priority:

After AI Draft Recommendation Readiness and governed document-chain/linkage rules.

Before automated customer-email processing, invoice automation, or Maven draft automation from email evidence.

Purpose:

Define a governed intake layer for incoming customer emails. The planned agent classifies emails as purchase orders, RFQs, approvals, rejections/corrections, replies to existing quotes, service requests, or general customer messages, then creates evidence packets before any business action.

Future evidence packets:

- `EMAIL_INTAKE_EVIDENCE_PACKET`.
- `PO_MATCH_EVIDENCE_PACKET`.
- `RFQ_INTAKE_EVIDENCE_PACKET`.
- `CUSTOMER_REPLY_EVIDENCE_PACKET`.
- `DOCUMENT_CHAIN_MATCH_PACKET`.

Dependencies:

- `project-brain/EMAIL_DOCUMENT_INTAKE_AGENT_SPEC.md` approved.
- `ORCHESTRATOR_AGENT` routing and approval gates.
- Customer, ServiceReport, BusinessDocument/Quote, Maven document, AI Draft, and future `DocumentChainId` matching rules.
- Attachment review workflow defined.
- Infrastructure Manager review before any Gmail/API/runtime/schema implementation.
- Liad approval workflow for all business actions.

Boundaries:

- Do not implement from this roadmap item alone.
- Do not create Gmail access runtime.
- Do not send emails automatically.
- Do not create invoices automatically.
- Do not create `BusinessDocuments` or `BusinessDocumentItems` automatically.
- Do not deduct inventory.
- Do not modify Prisma.
- Do not write/import DB data.
- Do not modify Maven/Invoice4U, Google Sheets, AppSheet, Apps Script, Drive, or production workflows.

Exit criteria:

- Email intake evidence-packet shapes are approved.
- Customer/document matching confidence rules are approved.
- Attachment safety rules are approved.
- Escalation and Liad approval gates are documented.
- No runtime implementation begins without a separate approved task.

Definition of Done:

- The agent remains planned/non-executable until implementation is explicitly approved.
- Email evidence remains evidence only and cannot approve business actions by itself.

### Documentation Cleanup

Source:

- `DOCUMENTATION_CLEANUP_PLAN.md`

Purpose:

Consolidate duplicate documentation, resolve source-of-truth conflicts, fill empty docs, normalize paths, and keep current-state documents aligned.

Approved cleanup order:

1. Fill `PROJECT_OPERATING_PROTOCOL.md` as the canonical operating protocol.
2. Fix startup/read-order references to use repo-relative paths.
3. Confirm `project-brain/CURRENT_TASK.md` as current-task source of truth.
4. Clean `PROJECT_BRAIN_MASTER.md` duplication and make it an index/summary.
5. Consolidate AI Draft run/test/checklist docs.
6. Fill empty `ROADMAP.md` and `TEST_SCENARIOS.md`.
7. Decide whether to create or remove references to `PROJECT_RULES.md`, `FLOWCHART.md`, and `CHANGELOG.md`.
8. Normalize `.gs` / `.js` Apps Script filename references.
9. Fix Hebrew encoding/mojibake after content structure is stable.

Dependencies:

- No deletion or rewrite of stable Project Brain history without approval.
- No runtime code changes.
- No production AppSheet, Google Sheets, Drive, Maven, or Invoice4u changes.

Exit criteria:

- Duplicates and conflicts are listed.
- Canonical files are identified.
- Stale files are marked or updated through approved documentation work.

Definition of Done:

- Documentation remains aligned with source-of-truth hierarchy.
- Current task and roadmap no longer conflict.

### Long-Term Target Architecture Phases

Source:

- `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`

These are future-state target architecture phases. They are not build-now authorization.

0. Project Discovery & Recovery
1. Project Brain Foundation
2. Validation Foundation
3. System Health Platform
4. Output Verification Platform
5. AppSheet Digital Twin
6. Migration Blueprint
7. Supabase Foundation
8. Next.js Platform
9. n8n Orchestration Layer
9.5. AI Runtime Layer / CLI / MCP
10. Agent Platform
11. Office Automation Factory
12. Service Factory
13. Finance Factory
14. Sales Factory
15. Marketing Factory
16. Communication Factory
17. Inventory & Procurement Factory
18. HR Factory
19. Customer Portal
20. AI Governance Factory
21. AI Chairman Factory
22. Self Evolving Enterprise
23. Knowledge & Memory Factory
24. Data Governance Factory
25. Document Factory
26. AI Training Factory
27. MCP Ecosystem Factory
28. Sandbox & Testing Factory
29. Business Intelligence Factory
30. AI Enterprise Command Center
31. Digital Twin Factory
32. Enterprise Observability Factory
33. Autonomous Discovery Factory
34. Revenue Optimization Factory
35. AI Office Workers Factory
36. AI Technician Factory
37. Company Operating System
38. AI Factory of Factories
39. Enterprise Architecture Factory
40. Business Process Factory
41. Customer Success Factory
42. Partner Ecosystem Factory
43. Product Factory
44. Compressor Expert Factory
45. Tal AI Master Brain
46. Platform Factory
47. Template Factory
48. Enterprise Marketplace
49. AI Research Factory
50. Autonomous Business Factory
51. Global Knowledge Graph
52. Digital Board of Directors
53. Enterprise Simulator
54. Tal AI Operating System

## Cross-Phase Dependencies

- Governance Foundation must remain active before future architecture work.
- Infrastructure Manager review is required before architecture, schema, new tables, new agents, registries, migration, source-of-truth conflicts, or future platform work.
- Current-state mapping must come before migration or rebuild.
- Existing assets must be reused or extended before creating new components.
- `SHEETS_REGISTRY` and existing maps must be checked before proposing new registries or maps.
- Stable production systems must be protected in every phase.
- Human approval is required before production, financial, customer-facing, schema, deployment, external-write, or data-repair actions.

## Global Exit Criteria

A phase can exit only when:

- Source documents were checked.
- Existing assets were considered.
- Stable systems affected by the phase were identified.
- Approval needs were identified.
- Risks and unknowns were documented.
- Next step is clear.
- Project Brain updates are proposed or completed only with approval.

## Global Definition Of Done

Roadmap work is done only when:

- Requested scope is complete.
- No runtime files were changed unless explicitly approved.
- No production systems were modified unless explicitly approved.
- Diffs were reviewed.
- Tests or checks were run, or not run with reason.
- Changed files are listed.
- Known gaps and next step are documented.

## Known Gaps

- `project-brain/PROJECT_BRAIN_MASTER.md` still contains older duplicated structure and stale AI Draft task content.
- `project-brain/current/LIVE_OBJECTS.md` still needs review/refresh with verified IDs or `UNKNOWN`.
- `PROJECT_INDEX.md` and `START_CODEX.md` may need full alignment with `PROJECT_OPERATING_PROTOCOL.md`.
- `SHEETS_REGISTRY.md` contains live tab/header data but not full AppSheet column settings, formulas, validation rules, or row-level usage.
- No full AppSheet Digital Twin exists yet.
- No Migration Blueprint exists yet.
- AI Draft docs are duplicated across several files and should be consolidated according to `DOCUMENTATION_CLEANUP_PLAN.md`.
