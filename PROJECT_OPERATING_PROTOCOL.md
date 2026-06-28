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

## Critical Knowledge Base Rule: Reusable Permanent Knowledge

Case-specific documents may exist only temporarily during research. Permanent knowledge must be consolidated into reusable Knowledge Bases.

Future work must extend reusable Knowledge Bases instead of creating permanent `*_EVIDENCE_PACKET`, `*_DISCOVERY`, `*_SPEC`, per-model, or per-service-report Project Brain documents.

Allowed temporary case documents:

- short-lived research notes while evidence is being gathered
- archived research files under `project-brain/archive/research/`
- source-reference artifacts that preserve original evidence without becoming canonical planning surfaces

Permanent knowledge belongs in reusable documents such as:

- `project-brain/MANUFACTURER_PARTS_REGISTRY.md`
- `project-brain/MANUFACTURER_SERVICE_KITS.md`
- `project-brain/SERVICE_COMMERCIAL_RULES.md`
- `project-brain/SERVICE_MAVEN_MAPPING.md`
- `project-brain/DOCUMENT_ENGINE.md`
- `project-brain/SKU_MATCHING_RULES.md`

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

Official startup command:

- `hey codex`

When the user says `hey codex`, Codex must:

1. Locate the active Git repository root.
2. Run `git status --short --branch`.
3. If the working tree is clean, run `git fetch origin` and `git pull --ff-only origin main`.
4. If the working tree is not clean, STOP, report uncommitted changes, and do not pull until the user approves a stash, commit, or discard plan.
5. After a successful pull, run `git log -1 --oneline`.
6. Only then read `START_CODEX.md`, `PROJECT_INDEX.md`, `PROJECT_OPERATING_PROTOCOL.md`, `project-brain/CURRENT_TASK.md`, `project-brain/TASK_BOARD.md`, and `project-brain/DECISION_LOG.md`.
7. Produce Project Reality Check using the live Git commit as the source for latest commit.
8. Show live Git latest commit, Last Implementation Commit, and Last Closeout Commit.
9. Continue if live Git latest commit is recorded as Last Implementation Commit or Last Closeout Commit, or if live Git latest commit is only a closeout/state-sync metadata commit newer than Last Closeout Commit. If live Git contains unclassified implementation, code, schema, or governance behavior changes, report mismatch and recommend state sync before implementation.
10. Continue from next approved task only.
11. Do not invent new tasks.

Before analysis, planning, code changes, schema work, deployment, or production action in a new session:

1. Locate the active Git repository root.
2. Run `git status --short --branch`.
3. If the working tree is clean, run `git fetch origin` and `git pull --ff-only origin main`.
4. If the working tree is not clean, STOP, report uncommitted changes, and do not pull until the user approves a stash, commit, or discard plan.
5. After a successful pull, run `git log -1 --oneline`.
6. Read `START_CODEX.md`.
7. Read `PROJECT_INDEX.md`.
8. Read `PROJECT_OPERATING_PROTOCOL.md`.
9. Read `project-brain/CURRENT_TASK.md`.
10. Read `project-brain/TASK_BOARD.md`.
11. Read `project-brain/DECISION_LOG.md`.
12. Read `project-brain/current/LIVE_OBJECTS.md` for active IDs when present.
13. Read relevant task-specific docs.
14. Produce a short Project Reality Check.

If Project Brain files are read before the repository has been checked and fast-forwarded when clean, STOP and restart the startup sequence.

If the task conflicts with `PROJECT_INDEX.md` or `PROJECT_OPERATING_PROTOCOL.md`, STOP and report the conflict.

Project Reality Check must include:

- current phase
- current task
- next approved task
- Last Implementation Commit
- Last Closeout Commit, if present
- live Git latest commit
- Git working state
- commit comparison between live Git, Last Implementation Commit, and Last Closeout Commit in `PROJECT_INDEX.md` and `project-brain/CURRENT_TASK.md`
- blocked or forbidden actions
- canonical files relevant to the requested work
- known active IDs with source files, or active ID conflicts with source files

Project Reality Check must compare:

- latest Git commit from `git log -1 --oneline`
- Last Implementation Commit written in `PROJECT_INDEX.md`
- Last Closeout Commit written in `PROJECT_INDEX.md`
- Last Implementation Commit written in `project-brain/CURRENT_TASK.md`
- Last Closeout Commit written in `project-brain/CURRENT_TASK.md`

If live Git latest commit equals the recorded Last Closeout Commit, the repository and Project Brain are synchronized.

If live Git latest commit is newer than Last Closeout Commit but is only a closeout/state-sync metadata commit, do not block work and do not require another sync just to record that newest closeout hash.

Only block if live Git has unclassified implementation, product code, schema, or governance behavior changes not reflected in Project Brain:

- report the mismatch clearly
- recommend sync before implementation during `hey codex`
- update canonical state files during closeout / `by codex`
- do not continue implementation until the mismatch is acknowledged

No implementation task may start until the Project Reality Check is shown.

If the Project Reality Check cannot be produced, STOP.

## 9. Shutdown Sequence

Official shutdown command:

- `by codex`

When the user says `by codex`, Codex must:

1. Run Project Reality Check.
2. Run `git status --short --branch`.
3. Run `git log -1 --oneline`.
4. Compare live Git latest commit against Last Implementation Commit and Last Closeout Commit.
5. Identify changed files.
6. Summarize completed work.
7. Summarize uncommitted changes.
8. Load and preserve known active IDs from canonical Project Brain state; if no new work occurred, do not downgrade known IDs to `UNKNOWN`.
9. Update canonical state files when needed and either approved or allowed by the Autonomous Work Loop:
   - `PROJECT_INDEX.md`
   - `project-brain/CURRENT_TASK.md`
   - `project-brain/TASK_BOARD.md`
   - `project-brain/DECISION_LOG.md` if decisions changed
   - Last Closeout Commit only for meaningful closeout/state-sync milestones, not every closeout metadata commit
   - Last Implementation Commit only when actual implementation changed
10. Verify no forbidden systems were touched.
11. Verify next approved task is clear.
12. Commit only approved files, or safe/scoped Project Brain closeout sync files allowed by the Autonomous Work Loop.
13. Push to `origin/main`.
14. Confirm clean `git status --short --branch`.
15. Confirm whether follow-up sync is required. Closeout-only metadata commits do not require another sync just to record their own hash.
16. Print next `hey codex` startup point.

At session close or handoff:

1. Summarize what was completed.
2. List changed files.
3. List tests or checks run.
4. Preserve known IDs.
5. Report risks and open issues.
6. Update Project Brain before the final report when the task is complete.
7. Create or propose a checkpoint if meaningful state changed.
8. Suggest a commit message only after reviewing the diff.
9. Do not deploy. Do update Project Brain for completed safe work when allowed by the Autonomous Work Loop.

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

Never create a new agent, registry, spec, roadmap item, or knowledge base until all existing assets have been searched, verified, and rejected as insufficient. Search, verify, reuse, extend, and only then request approval to create.

## 10A. Orchestrator Decision Engine

Every new task, idea, bug, feature, investigation, proposal, or request must pass through `agents/ORCHESTRATOR_AGENT.md` before work begins.

Current Project Mode:
`CAPABILITY_BUILDING`

Governance Status:
`FROZEN`

Current Priority:
Working runtime capabilities, working UI, AI Draft Preview, Action Server, Email Runtime, and Inventory Runtime before documentation expansion.

Governance is mature. Creating new specs, registries, knowledge bases, governance documents, roadmap items, or decision systems is `FORBIDDEN` unless:

1. A governance bug is discovered.
2. A safety issue exists.
3. Liad explicitly approves.
4. A capability cannot be built safely without it.

Otherwise, reuse, merge, or extend existing assets.

The Orchestrator acts as the existing Project Executive. Do not create a separate PM Agent while the current Orchestrator, Project Brain, Task Board, and Project Index can be extended.

The Orchestrator must optimize for:

- least duplication
- maximum reuse
- shortest safe path
- highest business value
- highest project acceleration
- evidence-based decisions
- minimal token usage
- minimal user interruptions
- minimal unnecessary documentation, agents, and complexity

The project is measured by capabilities added, not by the number of documents added. The project no longer exists to document ideas; it exists to deliver working capabilities. If a task produces only a new document, the Orchestrator must stop and recommend merge, reuse, extend, or reject unless Liad explicitly approves the governance work or the documentation is required to build a capability safely.

Capability-first rule:
Every proposed task must answer: what new capability will exist after this task finishes? If the answer is `No new capability`, the Orchestrator must stop and recommend merge, reuse, extend, or reject.

Every task must run the Executive Cycle from `agents/ORCHESTRATOR_AGENT.md`:

1. Understand.
2. Discover.
3. Consult.
4. Score.
5. Decide.
6. Execute.
7. Validate.
8. Learn.
9. Improve.

Before execution, the Orchestrator must answer the seven-stage decision matrix from `agents/ORCHESTRATOR_AGENT.md`:

1. Should this task exist?
2. Reuse before create.
3. Agent discovery.
4. Business knowledge.
5. Architecture.
6. Execution.
7. Success and capability gained.

Every task must receive one authority level:

- `AUTO_EXECUTE`: safe, scoped, approved/current, and within AUTO_ALLOWED rules.
- `REPORT_ONLY`: read-only discovery, analysis, evidence packet, or recommendation without implementation.
- `APPROVAL_REQUIRED`: production, financial, customer-facing, schema, DB write/import, source-system, external action, dependency/env change, or business decision requiring Liad.
- `FORBIDDEN`: explicitly forbidden by current state, protocol, missing approval, duplicate creation, or protected-system boundary.

The Orchestrator must consult relevant specialist owners from `agents/AGENT_REGISTRY.md` and use Project Brain workflow roles for Map Guard, Builder, QA, and Reviewer. It may delegate execution, but it retains responsibility for routing quality, approval gates, evidence, and Project Brain closeout.

Each consulted agent or workflow role must contribute or be summarized with:

- recommendation
- risks
- evidence
- confidence
- better alternatives

The Orchestrator must summarize consulted opinions before deciding. Planned or non-executable agents may contribute only from their approved specification/status and must not be treated as active runtime owners.

Every candidate task or solution path must receive Executive Scores before selection:

- Business Value
- Technical Value
- Project Acceleration
- Reuse Score
- Duplicate Risk
- Runtime Impact
- Long-term Value
- Complexity
- Estimated Time

The highest-value safe task should normally be selected. If not, the Orchestrator must record why.

Before creating any Agent, Registry, Spec, Rule, Knowledge Base, or Roadmap Item, the Orchestrator must prove:

- already searched
- already verified
- already rejected as insufficient

If this proof is missing, creating the duplicate is `FORBIDDEN`; extend, merge, or reuse existing assets instead.

Continuous improvement rule:
If Codex discovers a better workflow, safer workflow, faster workflow, reusable solution, duplicate, unnecessary document, or missing question, it must create an Evidence Packet and present the recommendation to Liad. After approval, update Project Brain and teach the affected agents by extending existing files.

Executive self-improvement rule:
After every completed task, the Orchestrator must ask whether it could have been completed faster, with fewer files, fewer agents, fewer tokens, less duplication, or less user involvement. If yes, generate an Improvement Evidence Packet for Liad. After approval, update Project Brain and teach future agents by extending existing owner files.

Reality Check mode and KPI rule:
Every Reality Check must report Project Mode, Governance Status, Current Priority, capabilities added, capabilities waiting, capabilities blocked, documentation created, capability/documentation ratio, reuse percentage, duplicate work prevented, highest-value capability, and highest-value runtime task. Use `UNKNOWN` when evidence is insufficient.

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

Active ID evidence rule:
- Known active IDs must be loaded from canonical Project Brain state before startup or closeout reports.
- Canonical lookup order is `project-brain/CURRENT_TASK.md`, then task-specific evidence docs referenced by the current task, then `project-brain/current/LIVE_OBJECTS.md`.
- Closeout must report the source file for each known active ID.
- If no new work occurred, closeout must preserve the last known active IDs from canonical Project Brain state.
- `UNKNOWN` may be used only when the canonical files truly do not contain the active ID.
- If active IDs conflict across canonical files, report the conflict and source files instead of overwriting or silently downgrading to `UNKNOWN`.

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

## 18A. Autonomous Work Loop

Codex should reduce Liad ping-pong by working autonomously on safe tasks and stopping only at meaningful approval gates.

Codex is the main Orchestrator for normal repository work. Codex must not ask Liad for every small step. It must work, validate, collect proof, update Project Brain, and ask Liad only at meaningful APPROVAL_REQUIRED gates.

Codex must use the Project Brain multi-agent operating workflow for safe completed work:

1. Map Guard Agent checks source ownership, reuse, protected systems, and approval gates.
2. Builder Agent performs approved/AUTO_ALLOWED scoped work.
3. QA Agent validates the change and protected-system boundaries.
4. Reviewer Agent checks scope, evidence, blocker state, Project Brain sync readiness, and final report accuracy.
5. Project Brain sync records completion before the final report.

The workflow files live under `project-brain/agents/`:

- `BUILDER_AGENT.md`
- `MAP_GUARD_AGENT.md`
- `QA_AGENT.md`
- `REVIEWER_AGENT.md`
- `AGENT_COMMUNICATION_PROTOCOL.md`
- `AUTONOMOUS_BUILD_WORKFLOW.md`

These are Project Brain workflow roles. They do not replace the active specialist agents registered in `agents/AGENT_REGISTRY.md`.

After every completed task, Codex must update Project Brain before the final report. This is mandatory, not optional. The sync must happen after successful validation and, when there is a feature/code/governance commit, after that feature commit is created so the commit hash can be recorded.

Required Project Brain closeout updates:

- `project-brain/CURRENT_TASK.md`
- `project-brain/TASK_BOARD.md`
- `project-brain/DECISION_LOG.md` when decisions changed
- `PROJECT_INDEX.md` when structure, status, navigation, current task, next task, or completion state changed

The closeout sync must include:

- what was completed
- commit hash
- validation results
- current blocker, or `none`
- exact next task
- approval gates
- project completion percentage

If a blocker was resolved, remove it from the current blocker state. Final responses must not describe a resolved issue as `blocked` when validation proved it resolved.

After a successful feature commit, Codex is allowed to automatically edit Project Brain docs and run `git add`, `git commit`, and `git push` for the Project Brain sync.

Codex must still ask explicit approval before env changes, schema changes, migrations, DB writes/imports, deletes/moves, git remote changes, or production integrations.

AUTO_ALLOWED work may proceed without asking for another approval when it is the next approved task and stays inside the current safety boundaries:

- read files
- inspect the repository
- run `git status` and `git log`
- run local tests and type checks
- run read-only DB queries
- run read-only UI validation
- create or update documentation
- fix UI/read-only mapping bugs
- create local validation reports
- update Project Brain after completed safe work
- update Project Brain before every final report after a completed task
- commit and push safe documentation and read-only app changes after validation

AUTO_APPROVED actions do not require Liad approval:

Git:

- `git fetch`
- `git pull --ff-only`
- `git status`
- `git log`
- `git branch -vv`

Read-only validation:

- read-only validation
- read-only database queries
- read-only DB query
- Prisma read-only queries
- staging read-only verification
- count validation
- relationship validation

Local development:

- local tests
- TypeScript compile checks
- Next.js build checks
- Next.js local dev startup
- local HTTP validation
- Playwright read-only validation
- screenshot generation for proof
- HTML render validation
- route validation

Project Brain:

- update Project Brain after completed safe work
- update `project-brain/CURRENT_TASK.md`
- update `project-brain/TASK_BOARD.md`
- update `project-brain/DECISION_LOG.md`
- update `PROJECT_INDEX.md` references
- update migration plans
- update wave progress
- commit and push Project Brain closeout sync after a successful feature commit

Safe commits:

- documentation-only commits
- Project Brain commits
- governance commits
- read-only validation report commits
- safe implementation commits after validation
- `git push` of approved safe-scope work

Do not ask Liad for approval when executing AUTO_APPROVED actions. Only stop for APPROVAL_REQUIRED gates.

APPROVAL_REQUIRED work must stop and request explicit approval before proceeding:

- env changes
- installing any new npm package; approval must name each package explicitly
- `prisma/schema.prisma` changes
- Prisma `db push`
- Prisma `migrate`
- DB writes
- imports
- seeds
- Supabase project/settings changes
- Google Sheets changes
- AppSheet changes
- Maven changes
- Apps Script changes
- Drive writes
- email/customer-facing actions
- production deployment
- production cutover
- git remote changes
- deletes/moves
- deleting business data
- deleting source files
- new agent architecture
- new governance architecture

Before stopping for approval, Codex must first verify whether the action is AUTO_APPROVED.

If AUTO_APPROVED, continue working.

If APPROVAL_REQUIRED, stop and present:

Executive Approval Report:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EXECUTIVE APPROVAL REQUEST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROJECT POSITION

* Current Wave
* Current Task
* Project Completion %
* Next Wave

REQUEST

* What Codex wants to do

WHY

* Why this action is needed

EVIDENCE

* What was checked
* What proof exists
* Validation results
* Before/After summary

FILES TO CHANGE

* Exact files

SYSTEMS TOUCHED

* Exact systems affected

SYSTEMS CONFIRMED UNTOUCHED

* Google Sheets
* AppSheet
* Maven
* Apps Script
* Production

IMPACT ANALYSIS

Systems affected:

* exact files
* exact modules
* exact routes
* exact tables
* exact agents

Systems verified unaffected:

* Project Brain
* Governance
* Wave 1
* Existing imports
* Existing Prisma schema
* Existing Supabase data
* Existing AppSheet logic
* Existing Maven integrations
* Existing automation flows
* Existing inventory logic

Regression Review:

* What was checked
* How it was checked
* Evidence

Dependency Review:

* Which future waves depend on this area
* Whether the change can block future work
* Whether approved architecture changes

Approval Confidence:

* LOW
* MEDIUM
* HIGH

Mandatory statement:

* "I checked for impact on existing project logic and future approved project roadmap."

RISK

* Low / Medium / High
* Explanation

ROLLBACK

* How to undo the change

AFTER APPROVAL

* Exact next action
* Expected outcome

DECISION REQUIRED

* Approve
* Reject
* Modify

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Executive Approval Report rules:

- The executive summary must fit within about 15 lines before detailed evidence.
- Do not present raw logs first.
- Detailed evidence may appear below the summary.
- Include Project Tree Position and PROJECT COMPLETION MODEL.
- Include Risk, Rollback, and Systems Confirmed Untouched.
- Include IMPACT ANALYSIS. No approval request is valid without Impact Analysis.
- Stop and wait for Liad's decision.

Required autonomous loop:

1. Run `hey codex`.
2. Produce Project Reality Check.
3. Load `PROJECT_INDEX.md` and `project-brain/TASK_BOARD.md`.
4. Pick the next approved task.
5. Run Map Guard review.
6. Route work to Builder Agent and any existing specialist owner agent by role.
7. Execute AUTO_ALLOWED work without stopping for routine confirmation.
8. Run QA validation.
9. Run Reviewer scope/evidence check.
10. Check that no protected system was affected.
11. Commit and push if the change is safe, scoped, and validated.
12. Update, commit, and push Project Brain sync.
13. Stop only when APPROVAL_REQUIRED work is reached.
14. Present proof, risks, and the exact approval request.

If a task mixes AUTO_ALLOWED and APPROVAL_REQUIRED work, complete the AUTO_ALLOWED discovery, validation, or planning first, then stop before the approval gate.

## 18B. TDOS Risk-Based Operating Model

TDOS means Tal Development Operating System. It is not a separate constitution, command system, or governance layer. TDOS is a risk-based operating model inside this protocol. `PROJECT_OPERATING_PROTOCOL.md` remains the highest operating authority.

`hey codex` remains the mandatory bootstrap command. `by codex` remains the mandatory closeout command.

No required control for the task's risk class may be skipped.

Read canonical startup sources and all sources relevant to the task's affected business objects, workflows, agents, routes, schema, and approval gates. Do not read every repository file by default when a smaller evidence set fully covers the task.

Before implementation, Codex must classify the task into one primary risk class. If a task touches multiple classes, the highest-risk class controls approval and validation. Safe discovery or planning work may still proceed first when it does not cross the higher-risk gate.

### TDOS Risk Classes

| Risk Class | Required startup reads | Required review level | Allowed automatic actions | Approval requirements | Required validations | Closeout requirements |
|---|---|---|---|---|---|---|
| `READ_ONLY_DISCOVERY` | Canonical startup files; relevant Project Brain maps/docs; relevant source files; relevant read-only data sources when needed | Map Guard source/reuse/protected-system check; brief findings review | Repo inspection, document reads, code reads, read-only DB/query checks, route/schema inspection, evidence gathering | No extra approval when read-only and within current task; approval required before external/private/protected source access not already allowed | Source citation check; no-write confirmation; affected business object/workflow list; gaps marked `UNKNOWN` | Findings report; Project Brain update only if durable state changed; next recommended task/gate |
| `DOC_SYNC` | Canonical startup files; docs being updated; source evidence for every changed fact; relevant decision/task files | Map Guard plus Reviewer check for duplication, ownership, and stale-source risk | Documentation updates, Project Brain sync, index/status alignment, safe docs-only commit/push when validated | Allowed when requested or required by closeout; approval required for new governance architecture or new duplicate planning/control files | `git diff --check`; source evidence check; duplicate/reuse check; protected systems untouched | Update only affected canonical docs; record validation, blocker state, next task, approval gates, completion percentage when meaningful |
| `SAFE_LOCAL_IMPLEMENTATION` | Canonical startup files; affected business object docs/specs if present; relevant routes/modules/tests; relevant schema models read-only; owner agent files | Full Map Guard -> Builder -> QA -> Reviewer loop | Local code changes inside approved scope; read-only UI/display behavior; local tests/build/typecheck; read-only validation; safe scoped commit/push after validation | No extra approval only when task is approved/AUTO_ALLOWED and no protected gate is crossed | Typecheck/build/test as appropriate; route/UI validation when user-visible; read-only DB/count validation when data-backed; protected-system untouched check; rollback note | Feature commit when appropriate; Project Brain sync; changed files, validation, risks, active IDs, next task, and approval gates |
| `SCHEMA_OR_DATA_CHANGE` | Canonical startup files; Prisma schema; migration/import plans; affected models/tables; source-of-truth docs; relevant business object/workflow specs; DB relationship evidence | Architecture review plus Map Guard; explicit implementation plan; QA/Reviewer before and after allowed work | Read-only planning, schema diff analysis, migration/import proposal, relationship/idempotency design | Explicit approval required before schema edit, migration, `db push`, DB write/import/seed, or data repair | Primary key/foreign key analysis; idempotency/duplicate prevention; rollback/backout plan; staging/LAB validation plan; source/target count checks | Record approved action and evidence; update Project Brain and decisions; no promotion without validated LAB/staging evidence |
| `EXTERNAL_SYSTEM_CHANGE` | Canonical startup files; integration owner agent; external API/source docs; workflow maps; approval gates; idempotency and failure-handling evidence | Architecture review, specialist owner review, Map Guard, QA, Reviewer | Read-only API/source analysis, dry-run planning, payload preview, contract packet preparation | Explicit approval required before Maven, Apps Script, AppSheet, Google Sheets, Drive, email, payment, inventory, or other external writes/actions | Dry-run or mock validation when possible; payload review; idempotency key/duplicate prevention; failure and retry behavior; systems untouched list | Decision log entry when approved; exact external action/result evidence; Project Brain sync; next gate and rollback/recovery state |
| `PRODUCTION_CHANGE` | Canonical startup files; production runbook/approval packet; affected source, runtime, data, and integration maps; rollback plan | Highest review: architecture, owner agent, QA, Reviewer, explicit executive approval | Read-only production readiness review and evidence packet only | Explicit approval required before deployment, cutover, production config, production data, production integration, or customer-facing action | LAB/staging validation; deployment/cutover checklist; rollback plan; monitoring/health checks; data/customer impact review | Production evidence report; Project Brain and Decision Log update; post-change health state; incident/rollback notes if any |
| `ARCHITECTURE_CHANGE` | Canonical startup files; protocol/index/agent registry; relevant maps/specs; existing governance docs; affected business objects and workflows | Architecture Authority review; duplicate/governance impact review; Map Guard/Reviewer | Audit/proposal and approved docs-only protocol updates | Explicit approval required for new governance architecture, new agents, new registries, new specs system, or source-of-truth hierarchy changes | Existing-first proof; conflict analysis; ownership/lifecycle validation; source hierarchy update check; no duplicate system check | Update only existing canonical docs unless approved otherwise; Decision Log entry; Project Brain sync; next implementation gate |

### Source Ownership and Artifact Lifecycle

Every manual artifact must have an owner, source, and lifecycle. If a manual artifact has no clear owner, no source of truth, or no lifecycle, it must not become canonical.

Every generated artifact must declare its generator, trusted sources, and validation method. Generated artifacts must not become manually maintained truth.

If an artifact repeats another artifact, it must be deleted, generated, or reduced to a pointer. Repeated prose is allowed only when it is a short command wrapper or navigation summary that points back to the canonical owner.

### LAB-to-Primary Promotion Gate

Experimental work must be validated in LAB before promotion to the primary project. Promotion requires evidence, not assumptions.

Promotion evidence must include:

- risk class
- affected business objects and workflows
- files, routes, tables, external systems, and agents affected
- validations run and results
- source-of-truth impact
- rollback or recovery plan
- approval gate satisfied

### Generated State and Graph Policy

`PROJECT_STATE` and `PROJECT_GRAPH`, if created later, must be generated from trusted sources and must not be manually maintained as duplicate governance files.

Trusted graph/state sources include Git, `PROJECT_OPERATING_PROTOCOL.md`, `PROJECT_INDEX.md`, Project Brain current-state files, approved decision logs, route files, Prisma schema, existing maps/specs, agent registry, validation outputs, and read-only runtime evidence.

Generated state or graph output may summarize current truth, but it must not override canonical source files. When generated output disagrees with canonical sources, report drift and fix the source or generator instead of hand-editing generated output.

Codex approval-gate output must use the Executive Approval Report format and include:

- what was done
- what was checked
- proof of success
- risks
- what approval is requested
- what will happen after approval
- what systems were confirmed untouched

Proof Requirement:

Before closing any completed task, Codex must provide:

1. What was wrong before
2. What changed
3. Evidence
4. Validation result
5. User-visible impact

Preferred evidence includes screenshots, Playwright screenshots, HTML render samples, before/after comparisons, and counts.

A task is not considered complete with only HTTP 200, PASS, or compile success. Codex must demonstrate the visible outcome whenever possible.

Mandatory Project Tree Reporting:

Every Reality Check, Approval Gate, Autonomous Completion Report, and `by codex` closeout must include these headings using the canonical project tree from `PROJECT_INDEX.md`:

- PROJECT TREE
- CURRENT POSITION
- PROJECT COMPLETION MODEL
- CRITICAL PATH
- NEXT APPROVAL GATE

Required content:

- PROJECT TREE must show Waves 1-9 and their current statuses.
- CURRENT POSITION must show Current Wave, Current Task, Last Completed Task, and Next Task.
- PROJECT COMPLETION MODEL must show each capability, its weight, current status, and progress contribution.
- Progress percentage must be evidence-based and capability-weighted, not completed waves divided by total waves.
- CRITICAL PATH must show remaining waves required for project completion.
- NEXT APPROVAL GATE must show the exact gate, why approval is required, and what happens after approval.

Capability weights:

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

If all first four capabilities are complete, current estimated completion may be around 50%. If any are partial, estimate lower and explain why.

A task is not considered complete unless Project Tree Position is reported.

Proof Requirement and Project Tree Position are both mandatory.

Protected systems check must explicitly cover Google Sheets, AppSheet, Maven, Apps Script, production deployment/cutover, DB writes/imports, Prisma schema/migration/db push, Supabase project/settings, email, Drive, customer-facing actions, and file/data deletion.

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
10. Commit or push only when explicitly requested or when the Autonomous Work Loop classifies the completed, validated change as safe and scoped AUTO_ALLOWED work.

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

## 23A. Multi-Agent Operating Workflow

Project Brain workflow roles:

| Role | File | Responsibility |
|---|---|---|
| Builder | `project-brain/agents/BUILDER_AGENT.md` | Implement approved/AUTO_ALLOWED scoped work using existing patterns |
| Map Guard | `project-brain/agents/MAP_GUARD_AGENT.md` | Protect source map, ownership, reuse, and approval gates |
| QA | `project-brain/agents/QA_AGENT.md` | Validate behavior and protected-system boundaries |
| Reviewer | `project-brain/agents/REVIEWER_AGENT.md` | Review scope, evidence, blocker language, and Project Brain sync |
| Communication | `project-brain/agents/AGENT_COMMUNICATION_PROTOCOL.md` | Standardize handoff packets |
| Autonomous Build | `project-brain/agents/AUTONOMOUS_BUILD_WORKFLOW.md` | Define the end-to-end safe build loop |

These roles are not production automations and do not execute external actions by themselves. Codex uses them as the operating model for safe work and still routes domain-specific work to the active agents in `agents/AGENT_REGISTRY.md`.

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
- Project Brain has been updated with completed work, commit hash, validation, blocker state, next task, approval gates, and completion percentage
- Project Brain has been updated before the final report for every completed task
- git status is understood
- next step is clear

Documentation-only work is done only when:
- the requested document change is complete
- no runtime files were changed
- the diff was reviewed
- commit/push followed the Autonomous Work Loop or was explicitly requested

## 28. Escalation Rules

Escalate to the human owner before:

- env changes
- production writes
- external API writes
- Maven actions
- customer emails or document sending
- schema changes
- migrations
- production deployment or non-approved push outside the Autonomous Work Loop
- DB writes/imports
- data deletion
- deletes/moves
- git remote changes
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
