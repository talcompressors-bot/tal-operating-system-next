# AGENT REGISTRY

Status date: 2026-06-24

This registry is the canonical inventory of existing specialist agents,
Project Brain workflow roles, governance/control systems, and planned agent
placeholders.

No new agent may be created until both files are checked:

- `project-brain/AGENT_GOVERNANCE_MAP.md`
- `agents/AGENT_REGISTRY.md`

If an existing specialist agent, workflow role, or governance system can cover
the need, reuse and upgrade that existing owner instead of creating a duplicate.

## Agent / Role Types

| Type | Meaning | Source Location | Execution Status |
|---|---|---|---|
| Specialist Agent | Domain owner agent for a product, integration, governance, data, or operational area. | `agents/` | Active, Development, or Planned according to this registry. |
| Project Brain Workflow Role | Codex workflow role used inside the governed delivery loop. It supports mapping, building, QA, review, and handoff discipline. | `project-brain/agents/` | Active workflow role, not a standalone specialist agent. |
| Governance / Control System | Protocol, gate, audit, registry, or control-center definition used to govern work. | `agents/`, `project-brain/`, root governance docs | Active if referenced by current protocol. |
| Future / Planned Agent | Placeholder for possible future specialist ownership. | Registry or plan file only | Not executable until approved, specified, and backed by a source file. |

## Registry

| Agent / Role Name | Type | Status | Trust / Maturity | Purpose | Source File | Allowed Actions | Forbidden Actions | Reuse Before Create Notes |
|---|---|---|---|---|---|---|---|---|
| `ORCHESTRATOR_AGENT` | Specialist Agent / Governance coordinator | Active | Operational; high trust for routing and coordination | Coordinates agent order, task routing, approval boundaries, and final execution sequencing. | `agents/ORCHESTRATOR_AGENT.md` | Route work, enforce gates, coordinate Project Brain workflow roles, identify required specialist owners. | Bypassing approval gates, changing protected systems without approved task, replacing specialist ownership. | Acts as today's PM coordination layer together with Project Brain governance files. Upgrade before creating a separate PM agent. |
| `PROJECT_BRAIN_AGENT` | Specialist Agent / Governance memory | Active | Operational; high trust for project state | Maintains Project Brain continuity, current task state, decision memory, board state, and closeout discipline. | `agents/PROJECT_BRAIN_AGENT.md` | Update and validate governance memory when required, preserve current state, surface blockers and next tasks. | Inventing task approval, changing runtime behavior, modifying DB/schema/business logic. | Reuse for memory/state responsibilities before creating another planning-memory agent. |
| `INFRASTRUCTURE_MANAGER_AGENT` | Specialist Agent / Architect governance | Active | Operational; high trust for architecture review | Owns architecture, schema, source-of-truth, protected-system review, and technical governance. | `agents/INFRASTRUCTURE_MANAGER_AGENT.md` | Review architecture, data boundaries, source ownership, migration risk, and reuse decisions. | Applying schema/DB changes without explicit approval, bypassing source-of-truth checks. | Acts as today's Architect. Upgrade this file before creating an Architect Agent. |
| `PRE_MISSION_REVIEW_SYSTEM` | Governance / Control System | Active | Operational; high trust as a pre-work gate | Performs pre-mission risk review and approval-gate classification. | `agents/PRE_MISSION_REVIEW_SYSTEM.md` | Classify work risk, require approvals, identify blocked/protected areas. | Executing implementation, approving work that requires user approval, replacing task board approval. | Reuse for pre-work gating before adding new approval systems. |
| `FACTORY_CONTROL_CENTER_AGENT` | Governance / Control System | Active | Draft/operational hybrid; medium-high trust for audit framing | Provides audit/control-center review for factory-style governance and monitoring. | `agents/FACTORY_CONTROL_CENTER_AGENT.md` | Audit governance coverage, identify control gaps, recommend monitoring structure. | Runtime automation, DB writes, production integrations, replacing existing Project Brain workflow. | Reuse as a control/audit concept before creating a separate control-center agent. |
| `GIT_AGENT` | Specialist Agent | Active | Basic definition; needs fuller SOP for autonomous use | Handles Git work, commits, checkpoints, and repository state review. | `agents/GIT_AGENT.md` | Inspect status/log/diff, prepare scoped commit recommendations, support approved commits/checkpoints. | Destructive Git actions, remote changes, commits outside approved scope, discarding user changes. | Reuse for Git governance; strengthen SOP before creating another Git/checkpoint role. |
| `APPS_SCRIPT_AGENT` | Specialist Agent | Active | Basic definition; high-risk integration domain | Supports Apps Script analysis and approved Apps Script work. | `agents/APPS_SCRIPT_AGENT.md` | Analyze Apps Script safely, identify integration boundaries, support approved changes. | Unapproved deployment, env/auth changes, production integration changes, data mutation. | Reuse for Apps Script work; upgrade this specialist before adding integration duplicates. |
| `MAVEN_AGENT` | Specialist Agent | Active | Basic definition; high-risk business workflow domain | Supports Maven sync, Invoice Maven review, and draft workflow governance. | `agents/MAVEN_AGENT.md` | Analyze Maven flows, review draft workflow boundaries, support approved Maven work. | Unapproved Maven writes, invoice/draft production changes, DB/schema changes. | Reuse for Maven/draft responsibilities before creating another Maven or invoice-draft agent. |
| `AI_DRAFT_AGENT` | Specialist Agent | Development | Development maturity; medium trust with approval gates | Supports AI Draft recommendations and business-document draft planning. | `agents/AI_DRAFT_AGENT.md` | Plan and evaluate draft recommendations, perform approved dry-run analysis, respect approval gates. | Auto-issuing invoices, writing production drafts without approval, modifying pricing logic without approved task. | Reuse for AI Draft responsibilities before creating a new recommendation agent. |
| `EMAIL_DOCUMENT_INTAKE_AGENT` | Future / Planned Agent | Planned; not executable | Specification created; no runtime maturity | Future specialist for classifying incoming customer emails and producing evidence packets for PO/RFQ/customer reply/service request intake. Must work under `ORCHESTRATOR_AGENT`. | `project-brain/EMAIL_DOCUMENT_INTAKE_AGENT_SPEC.md` | Documentation-only planning; future read-only email metadata/content analysis after approved access; create evidence packets; recommend Liad review. | Sending emails, creating invoices, creating BusinessDocuments, deducting inventory, DB writes, Gmail implementation, automation runtime, treating email as approval. | Reuse `ORCHESTRATOR_AGENT`, `MAVEN_AGENT`, `AI_DRAFT_AGENT`, `PRICING_EVIDENCE_ENGINE_SPEC.md`, and `SERVICE_REPORT_MAVEN_LINK_REGISTRY_SPEC.md` before implementation. |
| `MAP_GUARD_AGENT` | Project Brain Workflow Role | Active workflow role | Operational workflow role | Checks source ownership, reuse requirements, protected systems, and approval gates before work proceeds. | `project-brain/agents/MAP_GUARD_AGENT.md` | Map impacted files/systems, identify reuse paths, classify protected boundaries. | Implementing changes, approving protected-system work alone, replacing specialist agents. | Use this role for source/reuse mapping before adding new ownership roles. |
| `BUILDER_AGENT` | Project Brain Workflow Role | Active workflow role | Operational workflow role | Performs approved or AUTO_ALLOWED scoped work inside the governed workflow. | `project-brain/agents/BUILDER_AGENT.md` | Execute scoped approved work, follow handoff packets, preserve boundaries. | Starting unapproved work, modifying protected systems, expanding scope without approval. | Use as the implementation role; do not create a duplicate builder agent. |
| `QA_AGENT_WORKFLOW_ROLE` | Project Brain Workflow Role | Active workflow role | Operational workflow role | Validates completed work, evidence, and protected-system boundaries. | `project-brain/agents/QA_AGENT.md` | Run or document validation checks, review changed files, confirm protected systems stayed untouched, report PASS/PASS_WITH_EXISTING_GAP/FAIL. | Approving production-impacting work, mutating DB/schema/runtime workflows, replacing final reviewer or user approval. | This is the active QA function today. Do not duplicate it with the planned specialist `QA_AGENT_SPECIALIST`. |
| `REVIEWER_AGENT` | Project Brain Workflow Role | Active workflow role | Operational workflow role | Reviews scope, evidence, Project Brain sync, and final-report readiness. | `project-brain/agents/REVIEWER_AGENT.md` | Review final scope, validation evidence, governance sync, and handoff quality. | Implementing changes, bypassing QA, approving protected-system changes alone. | Reuse for final review before creating another reviewer/checker role. |
| `AGENT_COMMUNICATION_PROTOCOL` | Project Brain Workflow Protocol | Active workflow protocol | Operational protocol | Defines handoff packets and communication shape between workflow roles. | `project-brain/agents/AGENT_COMMUNICATION_PROTOCOL.md` | Standardize role handoffs, required evidence, and scope transfer. | Acting as an executable agent, replacing source-of-truth files. | Reuse as communication protocol for all future agent upgrades. |
| `AUTONOMOUS_BUILD_WORKFLOW` | Project Brain Workflow Protocol | Active workflow protocol | Operational protocol | Defines the end-to-end governed loop for autonomous scoped work. | `project-brain/agents/AUTONOMOUS_BUILD_WORKFLOW.md` | Define workflow order, gates, and validation/review steps. | Executing work directly, bypassing approval gates, overriding specialist ownership. | Reuse as the workflow frame before creating any new autonomous agent. |
| `QA_AGENT_SPECIALIST` | Future / Planned Agent | Planned; not executable | Not mature; no specialist source file yet | Potential future specialist QA owner for broader test strategy beyond the current workflow role. | Not created | None until approved and specified. | Being treated as active QA, duplicating `project-brain/agents/QA_AGENT.md`, approving production-impacting work. | Current QA is `QA_AGENT_WORKFLOW_ROLE`. Only create/activate a specialist QA agent after a documented gap and explicit approval. |
| `INVOICE4U_AGENT` | Future / Planned Agent | Planned; not executable | Not mature; no source file yet | Future Invoice4u integration owner. | Not created | None until approved and specified. | Production integration work, credential/env changes, invoice writes, replacing Maven/AppScript ownership. | Reuse `MAVEN_AGENT`, `APPS_SCRIPT_AGENT`, and `INFRASTRUCTURE_MANAGER_AGENT` for current Invoice4u-related planning. |
| `EXPENSE_AGENT` | Future / Planned Agent | Planned; not executable | Not mature; no source file yet | Future supplier expense invoice automation owner. | Not created | None until approved and specified. | Expense automation, vendor invoice writes, DB/schema changes, payment/accounting integrations. | Reuse existing governance and data/source-of-truth review before creating this specialist. |
| `SYSTEM_HEALTH_AGENT` | Future / Planned Agent | Planned; not executable | Planned only; no active agent source file | Future daily health monitoring and status dashboard support. | `project-brain/SYSTEM_HEALTH_AGENT_PLAN.md` | Read-only planning and gap analysis through the existing plan. | Runtime monitoring setup, scheduled automation, DB writes, repair actions, production alerts without approval. | Reuse the plan and existing Project Brain status files before creating an active health agent. |

## QA Status Alignment

The active QA capability today is the Project Brain workflow role:

- Name in this registry: `QA_AGENT_WORKFLOW_ROLE`
- Source file: `project-brain/agents/QA_AGENT.md`
- Status: Active workflow role

The former planned `QA_AGENT` entry is reclassified as:

- Name in this registry: `QA_AGENT_SPECIALIST`
- Status: Planned; not executable
- Source file: Not created

This avoids duplicating QA responsibility. Current task validation should use
`project-brain/agents/QA_AGENT.md` plus the existing reviewer and specialist
owners. A future specialist QA agent may be created only after a documented gap,
Infrastructure Manager review, and explicit approval.

## Current Governance Coverage

| Responsibility | Current Owner |
|---|---|
| PM / delivery coordination | `ORCHESTRATOR_AGENT`, `PROJECT_BRAIN_AGENT`, `CURRENT_TASK.md`, `TASK_BOARD.md` |
| Architect / source-of-truth governance | `INFRASTRUCTURE_MANAGER_AGENT` |
| QA validation | `QA_AGENT_WORKFLOW_ROLE` |
| Final review | `REVIEWER_AGENT` |
| Git discipline | `GIT_AGENT` |
| Apps Script ownership | `APPS_SCRIPT_AGENT` |
| Maven / draft workflow ownership | `MAVEN_AGENT` |
| AI draft recommendation planning | `AI_DRAFT_AGENT` |
| Email document intake planning | `EMAIL_DOCUMENT_INTAKE_AGENT` planned under `ORCHESTRATOR_AGENT`; not executable |
| Control-center audit framing | `FACTORY_CONTROL_CENTER_AGENT` |

## Creation / Upgrade Rule

Before creating a new agent:

1. Check `project-brain/AGENT_GOVERNANCE_MAP.md`.
2. Check this registry.
3. Identify the closest existing specialist agent, Project Brain workflow role,
   or governance/control system.
4. Prefer upgrading the existing owner when the gap is a responsibility,
   maturity, or SOP gap.
5. Create a new agent only when the need is not covered, the source-of-truth
   boundary is clear, and explicit approval exists.

## Planned Agents Are Not Active

Planned agents have no execution authority. They must not be referenced as
active owners until all of the following exist:

1. Approved purpose and boundaries.
2. Source file with responsibilities, allowed actions, forbidden actions,
   inputs, outputs, dependencies, and decision authority.
3. Reuse review against this registry and `AGENT_GOVERNANCE_MAP.md`.
4. Approval gate recorded in Project Brain governance files.
