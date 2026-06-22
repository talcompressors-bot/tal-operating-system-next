# PROJECT OPERATING PROTOCOL

Status: Official v1  
Scope: TalCompressors-ServiceReports-AI repository and related project governance  
Purpose: Governance and execution rules for safe work in this project

## Critical Safety Rule: Next.js Shadow Development

The current Next.js work must remain isolated and shadow/development only.

AppSheet remains production until Liad explicitly approves official migration.

Do not modify:

- `apps-script/*`
- AppSheet logic
- Google Sheets structure
- Maven integration
- existing report templates
- existing webhooks
- existing production workflows

Allowed Next.js shadow-development areas:

- `app/*`
- `prisma/*`
- `package.json`
- Next.js UI mock pages
- `project-brain/migration/*`

Forbidden unless Liad explicitly approves official migration work:

- changing existing Apps Script files
- changing existing report generation
- changing existing Maven sync
- changing live Google Sheets
- triggering AppSheet actions
- running Maven write actions
- replacing existing workflows

Goal: build the new Next.js system side-by-side while the existing AppSheet system remains production.

## Critical Architecture Rule: Server Actions First

All internal Next.js write flows must use Server Actions by default.

This applies to:

- approvals
- AI draft approval
- `BusinessDocument` creation
- `ServiceReport` shadow updates
- import review actions
- user-triggered queue commands
- PostgreSQL mutations
- offline sync actions

API routes are allowed only for:

- external webhooks
- Maven callbacks
- public endpoints
- third-party integrations

Server Actions do not grant permission to write production AppSheet, Google Sheets, Maven, Drive, email, or Apps Script state. Production-impacting actions still require explicit approval.

## Critical Architecture Rule: Offline First

The app must support field work without internet.

Rules:

- Local devices store pending actions in an offline queue.
- When internet returns, the queue syncs automatically.
- Server Actions are the default sync target for internal app mutations.
- PostgreSQL is the source of truth after successful sync.
- Conflicts must be logged and require review.
- Conflicts must not be silently overwritten.
- AppSheet and Google Sheets production remain untouched during the shadow phase.

## Future Infrastructure Rule: Open Remote Development Environment

The upcoming VPS/Remote Development track must be based on an open full development environment, not a limited control UI.

Required capabilities:

- full terminal access
- full repository access
- Git/GitHub operations
- Codex CLI access
- VS Code Server or browser IDE access
- ability to run Next.js dev/build
- ability to run Prisma/PostgreSQL tools
- ability to add future AI agents
- secure SSH access
- mobile/tablet access
- secrets management
- backups and rollback

Avoid:

- closed low-code control panels
- mobile-only restricted interfaces
- tools that prevent direct terminal or Git access
- systems that lock the project into one provider

This is a future infrastructure track, not permission to provision a VPS, install tools, move secrets, deploy, or change production hosting now.

## 1. Purpose

This protocol defines how work starts, how current state is verified, how priorities are chosen, how changes are approved, how implementation is performed, how results are verified, and how project memory is updated.

This is an operational document. It is not the future-state vision document.

- Future architecture vision belongs in `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`.
- Durable project memory belongs in `project-brain/PROJECT_BRAIN_MASTER.md`.
- Governance and execution rules belong in this file.

## 2. Core Operating Principles

1. Understand first. Modify second. Verify third. Document fourth.
2. Current state must be verified before future architecture is discussed or built.
3. Evidence must come before assumptions.
4. Reuse existing files, tables, agents, workflows, scripts, and registries before creating anything new.
5. Target architecture is a comparison guide, not permission to build every future component now.
6. Human approval is required before production-impacting, customer-facing, financial, schema, deployment, or external-write actions.
7. Stable production flows must be protected.
8. Unknown IDs must remain `UNKNOWN`; never invent identifiers.
9. Project Brain wins over ChatGPT memory, Codex memory, previous chat summaries, and assumptions.
10. Every Codex task or session must begin by reading `PROJECT_INDEX.md`; if `PROJECT_INDEX.md` has not been read first, STOP.
11. If the task conflicts with `PROJECT_INDEX.md` or `PROJECT_OPERATING_PROTOCOL.md`, STOP and report the conflict.
12. Before proposing or creating any new planning file, agent, map, dashboard, protocol, roadmap, or control system:
   - Read `PROJECT_INDEX.md`.
   - Identify whether an existing canonical owner already exists.
   - Reuse the existing owner if available.
   - If no owner exists, report the gap and ask approval before creating anything new.

## 3. Project Purpose Summary

The project exists to turn Tal Compressors' service-report and business-document workflow into a reliable, governed, AI-assisted enterprise platform.

Primary business goal:
- Convert service work into accurate, traceable, approved business documents and customer outcomes.

Primary operational goal:
- Stabilize the current Google Sheets / AppSheet / Apps Script / Maven workflow before migration or expansion.

Primary AI goal:
- Use AI for analysis, recommendations, validation, and draft preparation while keeping human approval in control of production actions.

## 4. Business Value Governance

Every task must identify its expected business value before implementation.

Allowed business value categories:
- Revenue protection or revenue growth
- Customer service reliability
- Operational time savings
- Risk reduction
- Production stability
- Data quality
- Future platform foundation
- Auditability and traceability

Tasks with unclear business value should be deferred, narrowed, or converted into a discovery task.

## 5. Priority Governance

Classify work before implementation:

- `Critical Now`: required to prevent unsafe work, stale state, production risk, or blocked progress.
- `High Value`: creates strong business or technical leverage soon.
- `Medium Value`: useful but not urgent.
- `Future Only`: belongs to the target architecture but should not be built now.

Immediate priority order:

1. Mandatory startup entrypoint: `PROJECT_INDEX.md`
2. Governor: `PROJECT_OPERATING_PROTOCOL.md`
3. Current state and next task: `project-brain/CURRENT_TASK.md`
4. Task board and progress map: `project-brain/TASK_BOARD.md`
5. Durable decisions: `project-brain/DECISION_LOG.md`
6. Canonical system map: `project-brain/maps/SYSTEM_MAP.md`
7. Migration scope: `project-brain/migration/POSTGRESQL_V1_SCOPE.md`

## 6. Project Maturity Model

Use maturity levels instead of fake numeric precision.

Levels:

- `Not Started`
- `Mapped`
- `Partial`
- `Operational`
- `Stable`
- `Automated`

Apply maturity levels per area:
- Project Brain
- Source of Truth
- Service Reports
- Maven
- AI Draft
- System Health
- Digital Twin
- Infrastructure Manager
- Future platform

## 7. Source Of Truth Hierarchy

When files disagree, use this hierarchy:

1. `PROJECT_OPERATING_PROTOCOL.md`
2. `PROJECT_INDEX.md`
3. `project-brain/CURRENT_TASK.md`
4. `project-brain/TASK_BOARD.md`
5. `project-brain/DECISION_LOG.md`
6. `project-brain/maps/SYSTEM_MAP.md`
7. `project-brain/migration/POSTGRESQL_V1_SCOPE.md`
8. `project-brain/PROJECT_BRAIN_MASTER.md`
9. `project-brain/roadmap/ROADMAP.md`
10. `project-brain/current/LIVE_OBJECTS.md`
11. `data-sources/tools/SHEETS_REGISTRY.md`
12. `project-brain/maps/*`
13. `project-brain/bugs/CURRENT_BUGS.md`
14. `project-brain/lessons/LESSONS_LEARNED.md`
15. Latest relevant checkpoint under `project-brain/checkpoints/`
16. Live runtime source under `apps-script/*`
17. Git history

Rules:
- Deprecated files cannot override active files.
- Stale files must be reported as stale, not silently trusted.
- Archived files are historical context only.
- Live Apps Script source is `apps-script/*` unless explicitly documented otherwise.

## 8. Startup Sequence

Before analysis, planning, code changes, schema work, deployment, or production action:

1. Read `PROJECT_INDEX.md`.
2. Read `PROJECT_OPERATING_PROTOCOL.md`.
3. Read `project-brain/CURRENT_TASK.md`.
4. Read `project-brain/TASK_BOARD.md`.
5. Read relevant task-specific docs.
6. Run `git status --short`.
7. Produce a short Project Reality Check.

If `PROJECT_INDEX.md` has not been read first, STOP.

If the task conflicts with `PROJECT_INDEX.md` or `PROJECT_OPERATING_PROTOCOL.md`, STOP and report the conflict.

Project Reality Check must include:

- current phase
- current task
- next approved task
- last verified commit
- blocked or forbidden actions
- canonical files relevant to the requested work

No implementation task may start until the Project Reality Check is shown.

If the Project Reality Check cannot be produced, STOP.

## 9. Shutdown Sequence

At session close or handoff:

1. Summarize what was completed.
2. List changed files.
3. List tests or checks run.
4. Preserve known IDs.
5. Report risks and open issues.
6. Recommend Project Brain updates.
7. Create or propose a checkpoint if meaningful state changed.
8. Suggest a commit message only after reviewing the diff.
9. Do not commit, push, deploy, or update Project Brain unless explicitly approved.

## 10. Reuse Before Create Rule

Before creating a file, table, registry, workflow, agent, script, or platform component, check whether an existing asset can solve the need.

Before proposing or creating any new planning file, agent, map, dashboard, protocol, roadmap, or control system:

1. Read `PROJECT_INDEX.md`.
2. Identify whether an existing canonical owner already exists.
3. Reuse the existing owner if available.
4. If no owner exists, report the gap and ask approval before creating anything new.

Required classification:

- `Reuse Existing`
- `Extend Existing`
- `Replace Existing`
- `Create New`

Default decision:
- Reuse or extend existing assets.

Creating new components requires a clear reason and approval.

## 11. Current State Before Future State Rule

Before recommending future architecture work, verify the current system:

- current files
- current Project Brain state
- current runtime source
- current known bugs
- current workflow boundaries
- current IDs
- current risks

Do not build future-state components while source-of-truth files are stale.

## 12. Evidence Before Assumption Rule

Use repository evidence, Project Brain evidence, git evidence, Apps Script evidence, or approved user-provided evidence before making claims.

If evidence is missing:
- say it is missing
- mark values as `UNKNOWN`
- recommend a read-only discovery step

Never invent:
- IDs
- sheet schemas
- AppSheet behavior
- Maven state
- deployment status
- approval status

## 13. Multi-Company Rule

The future platform should support multiple companies or tenants.

Rules:
- Tal Compressors is the first company/tenant, not the full platform identity.
- Future schemas and architecture should avoid unnecessary hardcoding to one company.
- Do not migrate current production prematurely for multi-company goals.
- Multi-company design must not destabilize the current legacy production layer.

## 14. Safe Sandbox Rule

Prefer read-only analysis, dry runs, previews, test data, and sandbox workflows.

Production writes require explicit approval.

High-risk actions must first be tested or simulated when feasible:
- Apps Script changes
- schema changes
- Maven actions
- Drive file/folder changes
- email sending
- queue recovery
- deployment

## 15. AI Factory Principle

Use `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md` for comparison, gap analysis, roadmap planning, and prioritization.

Rules:
- The target architecture is not a build-now checklist.
- AI recommends, verifies, compares, drafts, and explains.
- Humans approve production, financial, customer-facing, schema, and deployment actions.
- Future factories must wait until the foundations are stable.

## 16. Future Architecture Governance

Before proposing a new architecture component:

1. Compare the need against `TARGET_ARCHITECTURE_VISION.md`.
2. Check existing files, tables, agents, workflows, registries, and scripts.
3. Assign one of these status values:
   - `EXISTS`
   - `PARTIAL`
   - `MISSING`
   - `DUPLICATE`
   - `EXISTS_UNDER_DIFFERENT_NAME`
   - `NOT_NEEDED_NOW`
   - `FUTURE_ONLY`
   - `SHOULD_EXTEND_EXISTING`
   - `SHOULD_NOT_CREATE_NEW`
4. Prefer reuse or extension.
5. Defer future-only work.
6. Record approved durable decisions in `project-brain/DECISION_LOG.md`.

## 17. Governance Model

Governance layers:

1. Human Owner
2. Operating Protocol
3. Source of Truth hierarchy
4. Project Brain
5. Infrastructure Manager
6. Orchestrator Agent
7. Specialist agents
8. Tools and scripts

No layer may bypass explicit human approval for production-impacting work.

## 18. Approval Process

Approval is required before:

- Apps Script code changes
- Google Sheets schema changes
- creating sheets
- running setup functions
- deploying
- running `clasp push`
- Maven document creation
- invoice creation or finalization
- sending customer emails or documents
- payment status updates
- data cleanup, deletion, or repair
- Drive permission changes
- queue retry or recovery
- migration work

Approval requests must include:

- what changes
- why it changes
- expected business value
- affected files, tables, functions, and workflows
- risk level
- test plan
- rollback plan
- whether production is affected

## 19. Change Management Process

Follow this process:

1. Intake
2. Source check
3. Existing asset reuse check
4. Impact analysis
5. Plan
6. Approval
7. Implementation
8. Verification
9. Documentation
10. Commit or push only if explicitly requested

Before implementation:
- identify stable flows affected
- identify live source files
- run `git status --short`
- separate unrelated changes
- avoid broad refactors

## 20. Architecture Decision Process

Use this process for new tables, workflows, agents, platforms, registries, integrations, or major design changes.

Required steps:

1. State the business problem.
2. State the current system evidence.
3. Compare against existing assets.
4. Compare against target architecture.
5. Classify reuse or creation decision.
6. Identify risk and migration impact.
7. Ask for approval.
8. Record approved decisions in `project-brain/DECISION_LOG.md`.

## 21. Infrastructure Manager Responsibilities

Initial role: architecture and governance support without production writes.

Responsibilities:

- enforce Source of Truth hierarchy
- detect stale or duplicate files
- identify existing assets before new creation
- route tasks to the correct agent
- maintain architecture comparison recommendations
- protect Apps Script, Google Sheets, Maven, Drive, and queue boundaries
- recommend safe next steps
- block premature future-platform work

Infrastructure Manager v1 must not:
- deploy
- create sheets
- run setup functions
- modify production data
- create Maven documents
- send emails

## 22. AI Chairman Responsibilities

Current role: strategic advisory concept, not runtime authority.

Responsibilities:

- review business value
- review priorities
- prevent overbuilding
- compare work against target architecture
- recommend what matters now versus later
- protect long-term platform direction

The AI Chairman cannot approve production actions. Human approval remains required.

## 23. Agent Hierarchy

Recommended hierarchy:

1. Human Owner
2. AI Chairman
3. Infrastructure Manager
4. Orchestrator Agent
5. Specialist agents:
   - Project Brain Agent
   - Apps Script Agent
   - Maven Agent
   - AI Draft Agent
   - Git Agent
   - future System Health Agent
   - future Digital Twin Agent
   - future Output Verification Agent
6. Worker tools and scripts

Specialist agents do not bypass this protocol.

## 24. Digital Twin Responsibilities

Purpose:
Map the current legacy production system before migration or rebuild.

Responsibilities:

- map AppSheet tables
- map columns and keys
- map actions and bots
- map Apps Script functions
- map Google Sheet schemas
- map Drive, Maven, and email side effects
- identify duplicate or unsafe flows
- support migration blueprint planning

Initial assets:
- `project-brain/maps/SYSTEM_MAP.md`
- `project-brain/maps/APPSHEET_MAP.md`
- `project-brain/maps/APPS_SCRIPT_MAP.md`
- `data-sources/tools/SHEETS_REGISTRY.md`

## 25. System Health Responsibilities

Purpose:
Detect regressions and unsafe states before they cause production damage.

Responsibilities:

- validate schema contracts
- detect missing report links
- detect duplicate counters and IDs
- detect stuck AutomationCommands
- detect Maven sync errors
- detect Drive link, file, and folder issues
- detect BusinessDocuments status problems
- report health without automatic production repair

Initial assets:
- `project-brain/SYSTEM_HEALTH_AGENT_PLAN.md`
- `project-brain/SYSTEM_HEALTH_RULES.md`
- `apps-script/SystemHealthSetup.js`
- `apps-script/SystemHealthRegistryValidation.js`
- `apps-script/SystemHealthLogValidation.js`

## 26. Project Lifecycle

Lifecycle stages:

1. Discovery
2. Mapping
3. Design
4. Approval
5. Implementation
6. Verification
7. Documentation
8. Commit
9. Deploy only if approved
10. Monitor
11. Learn

Do not skip from discovery to implementation.

## 27. Definition Of Done

A task is done only when:

- requested scope is complete
- existing assets were considered
- business value is stated
- stable systems were checked
- tests or checks were run, or not run with reason
- risks are reported
- changed files are listed
- Project Brain updates are proposed or completed with approval
- git status is understood
- next step is clear

Documentation-only work is done only when:
- the requested document change is complete
- no runtime files were changed
- the diff was reviewed
- no commit or push occurred unless requested

## 28. Escalation Rules

Escalate to the human owner before:

- production writes
- external API writes
- Maven actions
- customer emails or document sending
- schema changes
- deployment or push
- data deletion
- queue retry or recovery
- Drive permission changes
- unverified IDs are required
- source-of-truth files conflict
- remote/local Apps Script mismatch exists
- business decision is ambiguous

If blocked:
- state the blocker
- state the required decision
- recommend the safest next step

## 29. Safe Implementation Rules

- One change at a time.
- Read before editing.
- Keep changes scoped.
- Do not include unrelated refactors.
- Do not touch Apps Script during documentation cleanup unless explicitly requested.
- Do not modify Google Sheets without approval.
- Do not run setup functions without approval.
- Preserve AutomationCommands queue architecture.
- Preserve ReportCounter logic.
- Preserve the `ReportEquipmentItems` import rule: import only rows linked to real `ServiceReports`; exclude legacy/test equipment rows; do not modify Google Sheets; keep the internal FK nullable as a safety rule.
- Derive `ReportEquipmentItem.reportCounter` only during PostgreSQL import by joining through `ServiceReports.ReportCounter`; never use it as a primary relationship key.
- Preserve Drive folder and report file logic.
- Preserve Maven idempotency protections.
- Use Server Actions by default for internal Next.js write flows.
- Design field workflows as offline-first with explicit conflict review.
- Keep rollback possible.

## 30. Forbidden Actions

Forbidden without explicit approval:

- creating Maven documents
- creating invoices
- sending customer emails
- updating payment status
- deploying Apps Script
- running `clasp push`
- creating Google Sheets
- running setup functions
- editing production schema
- deleting data
- changing Drive permissions
- retrying or cancelling AutomationCommands
- rewriting stable flows from scratch
- creating duplicate agents, tables, workflows, or registries when existing ones can be extended
- inventing IDs

## 31. File Ownership Matrix

| File / Area | Purpose | Update Rule |
|---|---|---|
| `PROJECT_OPERATING_PROTOCOL.md` | governance and execution rules | update only for approved protocol changes |
| `PROJECT_INDEX.md` | source order and navigation | update when hierarchy changes |
| `PROJECT_COMMANDS.md` | command vocabulary | update when commands change |
| `START_CODEX.md` | startup entry | keep minimal and aligned with protocol |
| `project-brain/PROJECT_BRAIN_MASTER.md` | durable project memory | update for durable architecture/status changes |
| `project-brain/CURRENT_TASK.md` | active task, current phase, next task | update at meaningful handoff |
| `project-brain/TASK_BOARD.md` | task board and progress map | update when task status changes |
| `project-brain/current/CURRENT_TASK.md` | retired compatibility path | redirect only; do not update with state |
| `project-brain/current/LIVE_OBJECTS.md` | verified active IDs | update only with verified IDs or `UNKNOWN` |
| `project-brain/DECISION_LOG.md` | approved decisions | append approved decisions only |
| `project-brain/maps/*` | system maps | update when architecture or workflow maps change |
| `project-brain/bugs/CURRENT_BUGS.md` | open bug register | update when bug state changes |
| `project-brain/lessons/LESSONS_LEARNED.md` | durable lessons | update only for durable lessons |
| `project-brain/checkpoints/*` | session history | append new checkpoints; do not rewrite history |
| `project-brain/roadmap/*` | future planning | update when priorities change |
| `apps-script/*` | live Apps Script source | modify only with explicit approval |
| `data-sources/tools/SHEETS_REGISTRY.md` | sheet/schema registry | update after approved schema mapping |

## 32. Task Checklist Template

Every task should answer:

- What is the goal?
- What is the business value?
- What is the current evidence?
- What files, tables, workflows, or systems are affected?
- What existing assets can be reused?
- What stable systems must be protected?
- Is approval required?
- What is the risk?
- What is the rollback path?
- What verification is required?
- What Project Brain update is needed?
- What should happen next?
