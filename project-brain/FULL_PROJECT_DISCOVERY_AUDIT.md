# Full Project Discovery Audit

Date: 2026-06-24
Mode: Discovery only
Requested output: one audit file only
Runtime changes: none

## Evidence Summary

Files and areas inspected:

- Root inventory: repository root file/folder listing
- `PROJECT_INDEX.md`
- `PROJECT_OPERATING_PROTOCOL.md`
- `AGENTS.md`
- `project-brain/CURRENT_TASK.md`
- `project-brain/TASK_BOARD.md`
- `project-brain/DECISION_LOG.md`
- `project-brain/CHANGELOG.md` status
- `project-brain/lessons/LESSONS_LEARNED.md`
- `APPLICATION_ROUTE_MAP.md`
- `DATA_COVERAGE_AUDIT.md`
- `agents/AGENT_REGISTRY.md`
- `agents/ORCHESTRATOR_AGENT.md`
- `agents/INFRASTRUCTURE_MANAGER_AGENT.md`
- `agents/FACTORY_CONTROL_CENTER_AGENT.md`
- `agents/AI_DRAFT_AGENT.md`
- `project-brain/agents/MAP_GUARD_AGENT.md`
- `project-brain/agents/BUILDER_AGENT.md`
- `project-brain/agents/QA_AGENT.md`
- `project-brain/agents/REVIEWER_AGENT.md`
- `project-brain/migration/POSTGRESQL_V1_SCOPE.md`
- `app/` route/file inventory
- `prisma/` file inventory and Prisma model/enum inventory
- `scripts/` file inventory
- `package.json`
- Git status and latest commits

Git status:

```text
## main...origin/main
```

Latest commits:

```text
58230e4 Sync project brain after SCR matching preview
0decfa2 Add SCR matching preview panel
c02b650 Add SCR pricing intelligence audit
6c0f4b8 Add SCR matching preview report
3b5b060 Analyze SCR SKU draft item sources
```

Latest commit stat:

```text
58230e4 Sync project brain after SCR matching preview
PROJECT_INDEX.md              | 28 ++++++++++++++--------------
project-brain/CURRENT_TASK.md | 17 +++++++++--------
project-brain/DECISION_LOG.md | 13 +++++++++++++
project-brain/TASK_BOARD.md   |  9 +++++----
4 files changed, 41 insertions(+), 26 deletions(-)
```

Existing canonical files:

- `PROJECT_OPERATING_PROTOCOL.md`: highest governance authority.
- `PROJECT_INDEX.md`: startup/navigation/status map and project tree.
- `project-brain/CURRENT_TASK.md`: current phase, current task, next task source of truth.
- `project-brain/TASK_BOARD.md`: task board and progress map.
- `project-brain/DECISION_LOG.md`: approved decisions.
- `APPLICATION_ROUTE_MAP.md`: implemented Next.js route inventory.
- `DATA_COVERAGE_AUDIT.md`: read-only staging data coverage evidence.
- `project-brain/migration/POSTGRESQL_V1_SCOPE.md`: approved PostgreSQL V1 boundary.

Mismatch found:

- The live Git latest commit is `58230e4`, while `PROJECT_INDEX.md` and `project-brain/CURRENT_TASK.md` record Last Implementation Commit as `0decfa2` and Last Closeout Commit as `8114210`. This is not blocking because `58230e4` is a Project Brain closeout/state-sync commit after the SCR preview.
- The canonical completion estimate says 60%, but the listed capability contributions in `PROJECT_INDEX.md` add to 56%: 15 + 15 + 10 + 10 + 6 = 56. This audit does not invent a corrected project percentage; it records the mismatch for decision.

What is certain:

- The repository is on `main`, aligned with `origin/main`, and has a clean worktree before this audit file.
- No next implementation task is approved in the canonical current task.
- Wave 1 Service Report Core is complete.
- Wave 2 Service Workflow Layer is current.
- The app is a Next.js shadow/read-only system, not production.
- Production AppSheet, Google Sheets, Apps Script, Maven, Drive, email, and production cutover remain gated.
- Prisma V1 schema exists and Supabase staging schema/import/read-only validation have already occurred by recorded evidence.

What is uncertain:

- Whether the project completion number should remain 60% or be corrected to match the stated contribution formula.
- Which next candidate task Liad wants to approve.
- Whether future AI Agent / PM Agent / Architect Agent work should extend existing agent files, Project Brain workflow roles, or Factory Control Center governance rather than creating new agents.
- Whether `project-brain/CHANGELOG.md` should exist; it was requested for inspection but is missing.

## 1. Executive Summary

The project is a governed Next.js shadow replacement effort for Tal Compressors service-report and business-document workflows. The real current state is not a blank system and not a production system. It already has a Next.js app, Prisma schema, Supabase staging data layer, Wave 1 import/read validation, several read-only UI modules, and a Project Brain governance system.

Wave 1 Service Report Core is complete. Wave 2 Service Workflow Layer is current but not fully complete. The latest completed implementation is the SCR matching preview panel on the Service Report detail screen. There is no approved next implementation task.

The project already has agent and AI-management infrastructure in two forms:

- Active specialist agents under `agents/`.
- Project Brain workflow roles under `project-brain/agents/`.

Therefore, future AI Agent / PM Agent / Architect Agent work should start by reusing or extending existing governance and agent files. Creating new agent files would require a reuse-before-create review and explicit approval.

## 2. Existing Governance / Project Brain

| File / Area | Purpose | Current Status |
|---|---|---|
| `PROJECT_OPERATING_PROTOCOL.md` | Highest authority for safety, approvals, source hierarchy, autonomous loop, protected systems, Definition of Done | Current |
| `PROJECT_INDEX.md` | Mandatory startup entry, project reality check, canonical project tree, completion model, route to source files | Current, with completion arithmetic mismatch noted |
| `START_CODEX.md` | Official `hey codex` startup sequence | Current |
| `END_CODEX.md` | Closeout workflow support | Present |
| `AGENTS.md` | Repository startup binding and multi-agent workflow instructions | Current |
| `project-brain/CURRENT_TASK.md` | Current phase/current task/next task source of truth | Current |
| `project-brain/TASK_BOARD.md` | NOW/NEXT/DONE/BLOCKED board and rules | Current |
| `project-brain/DECISION_LOG.md` | Approved decisions and commit classifications | Current |
| `project-brain/CHANGELOG.md` | Requested source | Missing |
| `project-brain/lessons/LESSONS_LEARNED.md` | Durable operational lessons | Present/current enough for known production lessons |
| `project-brain/PROJECT_BRAIN_MASTER.md` | Durable project memory | Present, not fully re-audited in this pass |
| `project-brain/maps/*` | System, AppSheet, Apps Script, AI Draft and file maps | Present |
| `project-brain/migration/*` | PostgreSQL, Prisma, migration, data migration planning | Present |
| `project-brain/roadmap/*` | Roadmap and phase execution files | Present |
| `project-brain/checkpoints/*` | Historical checkpoint files | Present; historical only |
| `APPLICATION_ROUTE_MAP.md` | Current Next.js route inventory with data source and counts | Current |
| `DATA_COVERAGE_AUDIT.md` | Read-only Prisma counts and module readiness | Current |

Governance is extensive and active. The main risk is not lack of governance; it is duplication or future planning work bypassing existing governance owners.

## 3. Existing Agent / AI Management Infrastructure

Existing specialist agent infrastructure under `agents/`:

- `AGENT_REGISTRY.md`: registry of active, development, and planned agents.
- `ORCHESTRATOR_AGENT.md`: Codex orchestration, task routing, safe execution order.
- `PROJECT_BRAIN_AGENT.md` and `PROJECT_BRAIN_AGENT_SOP.md`: Project Brain state/memory updates.
- `INFRASTRUCTURE_MANAGER_AGENT.md` and `INFRASTRUCTURE_REVIEW_TEMPLATE.md`: architecture, schema, migration, new component, and source-of-truth review.
- `PRE_MISSION_REVIEW_SYSTEM.md`: pre-mission risk and approval review.
- `GIT_AGENT.md`: git work, commits, checkpoints.
- `APPS_SCRIPT_AGENT.md`: Apps Script analysis/change owner.
- `MAVEN_AGENT.md`: Maven sync and draft workflow owner.
- `AI_DRAFT_AGENT.md`: AI draft recommendation and business document recommendation owner.
- `FACTORY_CONTROL_CENTER_AGENT.md`: audit/control review.
- `AGENT_FACTORY_OPERATING_SYSTEM.md`: factory/agent operating system.
- AI Draft support files: `AI_DRAFT_AGENT_TEST.md`, `AI_DRAFT_EXECUTION_CHECKLIST.md`, `AI_DRAFT_OUTPUT_TEMPLATE.md`, `AI_DRAFT_SESSION_CLOSE.md`.

Existing Project Brain workflow roles under `project-brain/agents/`:

- `MAP_GUARD_AGENT.md`: source ownership, reuse, protected systems, approval gates.
- `BUILDER_AGENT.md`: approved/AUTO_ALLOWED scoped work.
- `QA_AGENT.md`: validation and protected-boundary checks.
- `REVIEWER_AGENT.md`: scope/evidence/Project Brain sync readiness.
- `AGENT_COMMUNICATION_PROTOCOL.md`: handoff protocol.
- `AUTONOMOUS_BUILD_WORKFLOW.md`: end-to-end autonomous loop.

What already exists:

- Orchestrator role.
- Infrastructure/architecture review role.
- Project Brain memory role.
- Pre-mission review role.
- Factory control/audit role.
- AI Draft recommendation role.
- Maven and Apps Script specialist roles.
- QA exists as a Project Brain workflow role, while the older registry still lists QA Agent as planned.

What is missing or unclear:

- A clearly current single "PM Agent" label does not exist, but PM-like responsibilities are split across Orchestrator, Project Brain, Infrastructure Manager, Factory Control Center, roadmap files, and task board.
- A clearly current single "Architect Agent" label does not exist, but architecture responsibility already belongs to `INFRASTRUCTURE_MANAGER_AGENT.md`.
- The registry says `QA_AGENT` is planned, while `project-brain/agents/QA_AGENT.md` exists as an active workflow role. This is a terminology/scope mismatch, not proof that QA is absent.
- `INVOICE4U_AGENT` and `EXPENSE_AGENT` are planned in the registry but no matching agent files were found in `agents/`.

What should be reused:

- Use `INFRASTRUCTURE_MANAGER_AGENT.md` for Architect Agent needs.
- Use `ORCHESTRATOR_AGENT.md`, `PROJECT_BRAIN_AGENT.md`, and `TASK_BOARD.md` for PM/project-management needs.
- Use `FACTORY_CONTROL_CENTER_AGENT.md` for audit/control/portfolio status needs.
- Use `AI_DRAFT_AGENT.md` and the `.agents/skills/ai-draft-recommendation` skill for AI draft business-document recommendation work.
- Use `project-brain/agents/*` workflow roles for safe implementation workflow instead of creating duplicate runtime agents.

## 4. Current Product / App State

The Next.js app is implemented as a shadow/read-only application.

Implemented route files found under `app/`:

- `/`: dashboard in `app/page.tsx`.
- `/service-reports`: read-only Service Reports list.
- `/service-reports/[id]`: read-only Service Report detail/work screen with SCR matching preview.
- `/customers`: read-only Customers list.
- `/customers/[id]`: read-only Customer detail.
- `/equipment`: read-only Equipment/ReportEquipmentItems list.
- `/equipment/[id]`: read-only Equipment detail.
- `/inventory-stock`: route alias redirecting to `/equipment`.
- `/parts-used`: read-only PartsUsed empty-state/list.
- `/parts-used/[id]`: read-only PartsUsed detail.
- `/ai-drafts`: read-only AI Draft Suggestions empty-state shell.
- `/ai-drafts/[id]`: read-only AI Draft detail shell.
- `/business-documents`: read-only BusinessDocuments empty-state shell.
- `/business-documents/[id]`: read-only BusinessDocument detail shell.
- `/automation-commands`: read-only AutomationCommands empty-state shell.
- `/automation-commands/[id]`: read-only AutomationCommand detail shell.

Supporting app files include adapters for service reports, customers, equipment, parts used, AI drafts, business documents, and automation commands. `app/service-reports/snapshot/` still exists as snapshot documentation/data, but canonical current UI reads for implemented populated modules are recorded as Prisma/Supabase staging reads.

Current app restrictions:

- Read-only only.
- No production cutover.
- No AppSheet/Google Sheets/Maven/Apps Script production mutation.
- Future internal writes must use Server Actions by default, but write paths are not approved.

Known app/build gap:

- Full `npm run build` is recorded as blocked by existing unrelated missing `playwright` dependency/type declarations in `scripts/playwright/appsheet-discovery-auth.ts`.
- `npm run lint` is recorded as prompting for initial ESLint setup.

## 5. Data Layer State

Prisma:

- `prisma/schema.prisma` exists.
- Enums found: `SourceSystem`, `ServiceReportStatus`, `BusinessDocumentType`, `BusinessDocumentStatus`, `ApprovalStatus`, `AutomationCommandStatus`, `AutomationCommandType`, `AiConfidenceLevel`, `MatchSource`, `InventoryTransactionType`, `MavenSyncStatus`, `PaymentMethod`.
- Models found: `Customer`, `ServiceReport`, `ReportEquipmentItem`, `PartUsed`, `Product`, `InventoryStock`, `InventoryTransaction`, `AiDraftSuggestion`, `BusinessDocument`, `BusinessDocumentItem`, `BusinessDocumentLog`, `AutomationCommand`, `MavenCustomer`, `MavenDocument`, `MavenDocumentItem`, `MavenItem`, `Approval`, `EmailLog`, `SyncState`, `SyncLog`, `ErrorLog`.

Supabase/PostgreSQL:

- Supabase staging exists by recorded evidence.
- Staging schema has been applied and verified by recorded evidence.
- Wave 1 import passed by recorded evidence.
- Real read-only Prisma connectivity outside the network sandbox has passed by recorded evidence.
- Production shadow is not approved.
- AppSheet/Google Sheets remain production until explicit cutover approval.

Data coverage from `DATA_COVERAGE_AUDIT.md`:

- Populated: `Customer = 763`, `ServiceReport = 63`, `ReportEquipmentItem = 75`.
- Empty: `PartUsed = 0`, `Product = 0`.
- Not ready: inventory, AI draft, business document, automation, Maven, approval, email, sync, and error-log tables are empty or dependent on unapproved import/runtime/write workflows.

Imports:

- Wave 1 core import is complete: Customers, ServiceReports, ReportEquipmentItems linked rows.
- Wave 2 import is not approved and is blocked by dry-run/readiness issues.
- Maven, inventory, extended operations, production shadow, and cutover remain future/gated.

Restrictions:

- No Prisma schema changes without approval.
- No Prisma `db push`, migrations, imports, seeds, DB writes, or production data changes without explicit approval.
- No source-system writes.

## 6. Current Wave / Phase Status

| Wave / Capability | Status | Evidence |
|---|---|---|
| Governance / Project Brain / Git workflow | Complete by canonical claim | `PROJECT_INDEX.md`, `PROJECT_OPERATING_PROTOCOL.md`, `AGENTS.md`, startup and closeout rules |
| Supabase + Prisma Data Layer | Complete for staging/read-first scope | `CURRENT_TASK.md`, `POSTGRESQL_V1_SCOPE.md`, `DATA_COVERAGE_AUDIT.md` |
| Import Framework + Wave 1 Import | Complete | Wave 1 import evidence in `CURRENT_TASK.md` and `TASK_BOARD.md` |
| Wave 1 Service Reports UI | Complete | Service Reports, Customers, Equipment, navigation, list/detail/work-screen evidence |
| Wave 2 Service Workflow Layer | Current/partial | PartsUsed, AI Drafts, BusinessDocuments, AutomationCommands shells and SCR preview exist; imports/write flows gated |
| Wave 3 Maven Knowledge Layer | Pending | Maven data not imported/populated; Maven actions gated |
| Wave 4 Inventory Layer | Pending | Inventory tables empty/not ready; `/inventory-stock` is alias only |
| Wave 5 Offline First | Pending | Architecture decision exists; implementation not started |
| Wave 6 Automation Runtime | Pending | AutomationCommands shell exists; runtime execution is not approved |
| Wave 7 Production Shadow | Pending | Production shadow not approved |
| Wave 8 Production Cutover | Pending | AppSheet remains production |
| Wave 9 AppSheet Retirement | Pending | Cutover/retirement not approved |

## 7. Current Approved Task

There is no approved implementation task.

The canonical current task says the SCR matching preview panel is implemented and validated, the current blocker is `none` for that read-only panel, and no next implementation task is approved.

Candidate tasks listed by Project Brain:

1. Maven/Invoice4U lifecycle tracking shell.
2. Build hygiene for the existing missing Playwright dependency/type gap.
3. Optional Wave 2 import approval package.

Each candidate requires explicit selection/approval before implementation. Any DB import/write/schema/env/source-system/Maven/Invoice4U/production action requires separate explicit approval.

## 8. Completion Model

The project uses a capability-weighted completion model, not completed waves divided by total waves.

Canonical weights:

- Governance / Project Brain / Git workflow: 15%
- Supabase + Prisma Data Layer: 15%
- Import Framework + Wave 1 Import: 10%
- Wave 1 Service Reports UI: 10%
- Wave 2 Workflow Layer: 15%
- Wave 3 Maven Knowledge Layer: 15%
- Wave 4 Inventory Layer: 10%
- Wave 5 Offline First: 5%
- Wave 6 Automation Runtime: 3%
- Wave 7-9 Production Shadow / Cutover / AppSheet Retirement: 2%

Canonical contribution list in `PROJECT_INDEX.md`:

- Governance / Project Brain / Git workflow: 15% / 15% complete
- Supabase + Prisma Data Layer: 15% / 15% complete
- Import Framework + Wave 1 Import: 10% / 10% complete
- Wave 1 Service Reports UI: 10% / 10% complete
- Wave 2 Workflow Layer: 6% / 15% current
- Wave 3 Maven Knowledge Layer: 0% / 15% pending
- Wave 4 Inventory Layer: 0% / 10% pending
- Wave 5 Offline First: 0% / 5% pending
- Wave 6 Automation Runtime: 0% / 3% pending
- Wave 7-9 Production Shadow / Cutover / AppSheet Retirement: 0% / 2% pending

Formula:

```text
completion = sum(current contribution for each weighted capability)
```

Arithmetic from the listed contributions:

```text
15 + 15 + 10 + 10 + 6 + 0 + 0 + 0 + 0 + 0 = 56
```

Canonical stated estimate:

```text
60%
```

Audit finding:

- The stated estimate and formula contribution list do not match.
- This audit does not invent a replacement percentage.
- A decision is needed: either update the Wave 2 contribution evidence to total 60%, or correct the current estimated completion to 56%.

## 9. Critical Path

Safe critical path from current reality:

1. Resolve the completion-model mismatch in Project Brain before using percentage claims for planning.
2. Select one next candidate task explicitly.
3. If choosing AI/PM/Architect agent work, perform reuse-before-create through Infrastructure Manager and Factory Control Center instead of creating new agent files by default.
4. If choosing product progress without DB writes, continue with a read-only shell/enhancement or build hygiene task.
5. If choosing data progress, prepare an approval package first; do not import/write until blockers are resolved or explicitly accepted.
6. Preserve production boundary: AppSheet/Sheets/Apps Script/Maven remain production until explicit cutover approval.

## 10. Risks

Data risks:

- Wave 2 import readiness is failed/blocked by known source issues.
- Product, business document, AI draft, Maven, automation, and inventory staging tables are empty, so data-heavy modules around them may be low-value until import/population is approved.
- ReportEquipmentItems import has intentional exclusions; those rules must not be weakened.

Logic risks:

- BusinessDocuments, AutomationCommands, Maven draft creation, and AppSheet/Apps Script update boundaries are stable systems and must not be rewritten.
- Server Actions-first and offline-first are approved future architecture constraints but not permission to build write flows now.

Architecture risks:

- Creating "AI Agent", "PM Agent", or "Architect Agent" files may duplicate existing Orchestrator, Infrastructure Manager, Project Brain, Factory Control Center, and workflow-role agents.
- Registry/workflow terminology mismatch around QA could cause duplicate QA planning unless clarified.

Duplication risks:

- There are many Project Brain roadmap, map, dashboard, and planning files. New planning/control files should be avoided unless a reuse audit proves no existing owner fits.
- `project-brain/CHANGELOG.md` is missing, but equivalent history appears distributed across `TASK_BOARD.md`, `DECISION_LOG.md`, checkpoints, and Git history.

Agent risks:

- Planned agents in `AGENT_REGISTRY.md` do not all have files.
- Active workflow-role agents under `project-brain/agents/` are not the same as active specialist agents under `agents/`.
- Future "agent" work must define whether it is documentation governance, Codex workflow role, runtime automation, or external production actor.

Operational risks:

- Full build is known to have an unrelated Playwright dependency/type blocker.
- Real Prisma/Supabase connectivity may fail inside sandboxed runtimes even when it works outside the network sandbox.

## 11. Reuse Before Create

Reuse these before creating new AI/PM/Architect structures:

- Architect role: `agents/INFRASTRUCTURE_MANAGER_AGENT.md`
- Project manager / task control: `PROJECT_INDEX.md`, `project-brain/CURRENT_TASK.md`, `project-brain/TASK_BOARD.md`, `agents/ORCHESTRATOR_AGENT.md`, `agents/PROJECT_BRAIN_AGENT.md`
- Audit/control center: `agents/FACTORY_CONTROL_CENTER_AGENT.md`
- Agent registry: `agents/AGENT_REGISTRY.md`
- Safe work loop: `project-brain/agents/AUTONOMOUS_BUILD_WORKFLOW.md`
- Map/source/protected-system guard: `project-brain/agents/MAP_GUARD_AGENT.md`
- Builder/QA/Reviewer workflow roles: `project-brain/agents/BUILDER_AGENT.md`, `project-brain/agents/QA_AGENT.md`, `project-brain/agents/REVIEWER_AGENT.md`
- AI draft recommendation: `agents/AI_DRAFT_AGENT.md`, AI draft templates/checklists, and existing AI draft skill
- Architecture vision: `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`
- Migration scope: `project-brain/migration/POSTGRESQL_V1_SCOPE.md`
- Data readiness: `DATA_COVERAGE_AUDIT.md`
- Route/product reality: `APPLICATION_ROUTE_MAP.md`

Recommended default classification for future agent/PM/architect planning:

- Reuse Existing or Extend Existing.
- Create New only after explicit Infrastructure Manager review and user approval.

## 12. Recommended Next Planning Decision

Direction 1: Governance cleanup and alignment decision

Pros:

- Fixes the completion-model mismatch before more planning depends on it.
- Clarifies QA workflow-role versus registry planned-agent mismatch.
- Reduces risk of duplicate PM/Architect/AI agent files.

Cons:

- Does not advance product UI or data import directly.
- Requires careful Project Brain edits if approved.

Direction 2: Build hygiene for Playwright dependency/type gap

Pros:

- Removes known full-build blocker.
- Improves validation confidence for future app work.
- Scoped technical cleanup.

Cons:

- May require dependency/package changes.
- Does not add business capability directly.

Direction 3: Wave 2 import approval package

Pros:

- Moves toward populating ProductsCatalog, PartsUsed, AI Draft, BusinessDocuments, approvals, and email data.
- Converts known blockers into explicit decisions.
- Enables future data-backed modules and AI draft recommendations.

Cons:

- Must remain no-write/no-import until approval.
- May expose source-data cleanup or mapping decisions.
- Any actual import/write remains a separate approval gate.

Recommended decision gate:

- Decide whether the next planning step is governance alignment, build hygiene, or Wave 2 approval preparation.
- Do not approve new AI Agent / PM Agent / Architect Agent files until the user decides whether existing Infrastructure Manager, Orchestrator, Project Brain, and Factory Control Center files should be extended instead.
