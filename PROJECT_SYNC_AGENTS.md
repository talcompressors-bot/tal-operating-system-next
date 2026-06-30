# PROJECT SYNC AGENTS

Purpose
(compact agent/tool/skill catalog for ChatGPT Project Sources; `agents/AGENT_REGISTRY.md` remains canonical)

## Agent Source Rule
(how to read this file without confusing summaries with authority)

Canonical Agent Registry
(the source of truth for active/planned agent status)
`agents/AGENT_REGISTRY.md`

Project Brain Workflow Roles
(the source of truth for the governed Codex delivery loop)
`project-brain/agents/*.md`

Skill Definitions
(the source of truth for repo-specific Codex skill behavior)
`.agents/skills/*/SKILL.md`

Use Rule
(how to route work)
Use this file to pick the likely owner quickly, then read the listed source file before acting on that agent's domain.

## Active Executors And Advisors
(top-level tools and roles used to perform or advise work)

| Agent / Tool Name | Purpose | When To Use | May Read | May Update | Must Not Touch | Required Approval Level | Example Task | Source / Authority |
|---|---|---|---|---|---|---|---|---|
| Codex | Local executor and orchestrator (implements safe scoped repo work) | Repository inspection, edits, validation, commits, and closeout | Repo files, Project Brain, sync files, runtime validation output, approved read-only DB queries | Approved/AUTO_ALLOWED files, scoped docs/code, Project Brain/sync files, Git commits/pushes | Unapproved schema, DB writes/imports, Maven/Invoice4U, email, inventory, Apps Script/AppSheet/Sheets/Drive/production, deletes/moves | AUTO_ALLOWED for safe scoped work; explicit approval for protected systems | Expand sync files, validate, commit, push | `PROJECT_OPERATING_PROTOCOL.md`, `PROJECT_INDEX.md` |
| ChatGPT | Advisor and Project Sources consumer (reasons over uploaded files) | Business review, planning, source navigation, task discussion | Uploaded `PROJECT_SYNC_*` and user-provided context | Nothing directly in repo | Must not override Git, Project Brain, database, runtime validation, or human approval | Human decides if advice becomes work | Decide whether Asset Workspace is the right next task | Human owner / uploaded sources |
| Project Brain | Canonical project memory and state system (durable state authority) | Startup, task selection, blocker review, closeout, decisions | Project Brain files, Project Index, live IDs, maps, decisions | `CURRENT_TASK.md`, `TASK_BOARD.md`, `DECISION_LOG.md`, `PROJECT_INDEX.md`, live IDs/checkpoints when meaningful | Runtime behavior, schema, DB values, approvals not backed by evidence | AUTO_ALLOWED after completed safe work; explicit approval for governance architecture changes | Record blocker `none`, validation, next task, completion % | `project-brain/PROJECT_BRAIN_MASTER.md` |
| Git | Repository history and commit tool (commit/branch truth) | Status, diff, log, staged scope, commit, push | Git status/log/diff/tree | Git index, commits, push of approved scoped work | Destructive Git, unrelated files, secrets, remote changes without approval | Safe scoped commit/push allowed when requested/validated; destructive/remote config approval required | Commit only `PROJECT_SYNC_*.md` | Git repository |

## Active Specialist Agents
(registered domain/governance owners from `agents/AGENT_REGISTRY.md`)

| Agent / Tool Name | Purpose | When To Use | May Read | May Update | Must Not Touch | Required Approval Level | Example Task | Source / Authority |
|---|---|---|---|---|---|---|---|---|
| ORCHESTRATOR_AGENT | Task routing and executive decision owner (selects smallest safe path) | Every task, bug, feature, investigation, proposal, or approval gate | Project Index, protocol, task board, decisions, agent registry, relevant files | Usually nothing directly; Codex executes selected path | Approval bypass, protected-system changes, duplicate owner creation | No approval for routing; protected work requires Liad approval | Classify DOC_SYNC and route to Map Guard/Builder/QA/Reviewer | `agents/ORCHESTRATOR_AGENT.md` |
| PROJECT_BRAIN_AGENT | Project memory and closeout-state owner (keeps durable continuity) | State sync, blockers, task board, decisions, closeout | Project Brain, checkpoints, live IDs, decisions, task board | Project Brain state files when allowed | Runtime code, schema, DB, production systems | AUTO_ALLOWED for safe sync; approval for governance redesign | Update current task and task board after a safe commit | `agents/PROJECT_BRAIN_AGENT.md` |
| INFRASTRUCTURE_MANAGER_AGENT | Architecture and source-of-truth reviewer (guards schema/source boundaries) | Schema, migration, source-of-truth, new component, registry, platform work | Protocol, Project Brain, schema, maps, architecture docs, source inventories | Architecture review docs or approved docs only | DB/schema writes, Apps Script deploy, Sheets/AppSheet/Maven/Drive/email/production actions | Explicit approval before protected architecture/schema actions | Review whether a new sync artifact duplicates Project Brain | `agents/INFRASTRUCTURE_MANAGER_AGENT.md` |
| PRE_MISSION_REVIEW_SYSTEM | Pre-work risk and approval gate (classifies mission risk) | Before high-risk or unclear work | Protocol, request, impacted systems | No direct updates | Implementation, approval bypass | No approval for review; protected action approval still required | Decide if a request is DOC_SYNC or SCHEMA_OR_DATA_CHANGE | `agents/PRE_MISSION_REVIEW_SYSTEM.md` |
| FACTORY_CONTROL_CENTER_AGENT | Governance/control audit concept (control-center framing) | Governance coverage, monitoring/control gap analysis | Governance docs, Project Brain, audits | Audit/recommendation docs only | Runtime automation, DB writes, production integrations | Approval before implementing monitoring/control systems | Audit whether Project Sources sync has holes | `agents/FACTORY_CONTROL_CENTER_AGENT.md` |
| GIT_AGENT | Repository state and commit discipline owner (scoped Git hygiene) | Before staging, committing, pushing, reporting Git state | Git status/log/diff/staged files | Git index and commits only for scoped approved files | Secrets, destructive Git, unrelated files, remote changes | Safe scoped commit/push when requested/validated; destructive approval required | Stage only six `PROJECT_SYNC_*` files | `agents/GIT_AGENT.md` |
| APPS_SCRIPT_AGENT | Apps Script analysis owner (legacy automation source reviewer) | Apps Script functions, webhooks, Drive save, MavenAPI.gs, EmailSender, report rendering | `project-brain/apps-script/*`, maps, bugs, lessons | Apps Script only after explicit approval | Deployment, production workflow changes, data mutation | Explicit approval for any Apps Script change/deploy | Analyze `MavenAPI.gs` without deploying | `agents/APPS_SCRIPT_AGENT.md` |
| MAVEN_AGENT | Maven sync and draft workflow owner (external adapter readiness) | Maven sync, Maven document readiness, Maven payload/API evidence | MavenAPI source, Maven source inventory, InvoiceMaven tables, BusinessDocuments, AutomationCommands | Docs or approved code only; real Maven actions require approval | Maven/Invoice4U writes, draft creation, invoice action, sync rewrite, imported data deletion | Explicit Liad approval before Maven/Invoice4U action | Prepare Maven execution evidence packet | `agents/MAVEN_AGENT.md` |
| AI_DRAFT_AGENT | AI draft recommendation owner (ServiceReport to draft intelligence) | ServiceReport draft recommendations, pricing evidence, maintenance/service-kit rules | ServiceReports, ReportEquipmentItems, PartsUsed, ProductsCatalog, BusinessDocuments, Maven history, AI Draft docs | Recommendation code/docs when safe; internal drafts only through protected gateway | Auto invoices, Maven docs, emails, payment status, inventory mutation, unapproved DB writes | Read-only/safe recommendation fixes AUTO_ALLOWED; writes/external actions require approval | Improve maintenance draft line generation with review flags | `agents/AI_DRAFT_AGENT.md` |
| EMAIL_DOCUMENT_INTAKE_AGENT | Planned email evidence-packet agent (not executable) | Future email intake planning only | Email intake spec, evidence packet schema, relevant Project Brain docs | Documentation planning only | Sending email, Gmail runtime, BusinessDocument creation, DB writes, customer action | Explicit future approval before implementation/access | Design an RFQ evidence packet, not send email | `project-brain/EMAIL_DOCUMENT_INTAKE_AGENT_SPEC.md` |

## Project Brain Workflow Roles
(operating roles used by Codex during safe work)

| Agent / Tool Name | Purpose | When To Use | May Read | May Update | Must Not Touch | Required Approval Level | Example Task | Source / Authority |
|---|---|---|---|---|---|---|---|---|
| MAP_GUARD_AGENT | Source ownership and approval-gate checker (prevents wrong files/systems) | Before Builder changes files | Project Brain, maps, migration docs, agent registry, relevant files | No direct updates; produces constraints | Implementation or protected-system action | No approval for review; protected follow-up approval required | Confirm `PROJECT_SYNC_STATE.md` can serve as index | `project-brain/agents/MAP_GUARD_AGENT.md` |
| BUILDER_AGENT | Scoped implementation role (applies smallest approved change) | After Map Guard confirms scope | Task sources, relevant files, Map Guard constraints | Approved docs or safe local implementation files | Protected systems or scope expansion | AUTO_ALLOWED or explicit approval by risk class | Expand existing sync files only | `project-brain/agents/BUILDER_AGENT.md` |
| QA_AGENT_WORKFLOW_ROLE | Validation and protected-system checker (reports pass/gaps/fail) | After Builder completes changes | Diffs, changed files, validation commands/results | No direct updates; reports validation | Production approval or mutation | No approval for local validation; protected writes forbidden | Verify sync files cover required source categories | `project-brain/agents/QA_AGENT.md` |
| REVIEWER_AGENT | Final scope/evidence reviewer (readiness before final report) | Before commit/final report | Diff, status, validation, Project Brain/sync files | No direct updates; reports readiness | Implementation or approval bypass | No approval for review | Confirm only `PROJECT_SYNC_*` files are committed | `project-brain/agents/REVIEWER_AGENT.md` |
| AGENT_COMMUNICATION_PROTOCOL | Workflow communication protocol (handoff packet shape) | When coordinating workflow roles | Workflow role files and task packets | No direct updates | Acting as executable agent | No approval for reading | Shape Map Guard -> Builder -> QA handoff | `project-brain/agents/AGENT_COMMUNICATION_PROTOCOL.md` |
| AUTONOMOUS_BUILD_WORKFLOW | End-to-end governed work loop (autonomous build sequence) | Any autonomous safe task | Project Brain workflow docs | No direct updates | Bypassing approvals or specialist ownership | No approval for reading | Run Map Guard -> Builder -> QA -> Reviewer -> sync -> Git | `project-brain/agents/AUTONOMOUS_BUILD_WORKFLOW.md` |

## Repo Skills
(repo-local Codex skills discovered under `.agents/skills`)

| Agent / Tool Name | Purpose | When To Use | May Read | May Update | Must Not Touch | Required Approval Level | Example Task | Source / Authority |
|---|---|---|---|---|---|---|---|---|
| project-brain-startup | Startup and Project Reality Check skill (official startup loading) | `hey codex`, session recovery, before code/Project Brain work | Git status/log, startup files, Project Brain, live IDs | None during startup except clean fast-forward pull | Implementation before Reality Check; pulling with dirty tree | AUTO_APPROVED status/fetch/pull when clean; stop if dirty | Produce Project Reality Check | `.agents/skills/project-brain-startup/SKILL.md` |
| project-brain-session-close | Closeout and Project Brain handoff skill (safe session close) | `by codex`, closeout, handoff, state sync | Git status/log/diff, Project Brain, live IDs, changed files | Project Brain closeout files and safe scoped commits | Deploy, Maven, email, protected writes, unapproved files | AUTO_ALLOWED for safe closeout; protected systems require approval | Record completed work and push safe docs | `.agents/skills/project-brain-session-close/SKILL.md` |
| ai-draft-recommendation | One-report AI draft recommendation skill (recommendation only by default) | AI Draft tests, pricing analysis, ServiceReport recommendation planning | ServiceReports, ReportEquipmentItems, PartsUsed, ProductsCatalog, Maven history, BusinessDocuments, BusinessDocumentItems | No writes by default; internal draft rows only after explicit approval | Maven documents, final invoices, email, payment status, external actions | Read-only recommendation allowed; writes/external actions require approval | Evaluate ServiceReport `5807` draft lines | `.agents/skills/ai-draft-recommendation/SKILL.md` |

## Codex Tool Surfaces
(tool categories available in this environment; use only within approval gates)

| Agent / Tool Name | Purpose | When To Use | May Read | May Update | Must Not Touch | Required Approval Level | Example Task | Source / Authority |
|---|---|---|---|---|---|---|---|---|
| shell_command | Local command execution (read files, run validation, Git) | Repo inspection, validation, status, local tests | Workspace files and command output | Workspace files only through safe commands; Git when scoped | Destructive commands, protected writes, installs, external actions without approval | AUTO_ALLOWED for read/validation; approval for protected/escalated actions | Run `git status --short --branch` | Codex tool policy / repository protocol |
| apply_patch | File edit tool (manual scoped edits) | Updating docs/code in workspace | Target files to patch | Workspace files in approved scope | Unrelated files, generated destructive rewrites | AUTO_ALLOWED for safe scoped edits | Update `PROJECT_SYNC_DELTA.md` | Codex tool policy |
| multi_tool_use.parallel | Parallel local tool wrapper (faster independent reads/checks) | Reading independent files or running independent checks | Same as wrapped tools | Same as wrapped tools | Dependent/destructive commands in parallel | Same as wrapped tools | Read sync files and status in parallel | Codex tool policy |
| web | Internet lookup tool (current external information) | Only when explicit/current external info is needed | Public web sources | Nothing local | Do not use for repo truth when local source exists | Browse only when required by policy/user | Verify current vendor docs if needed | System browsing policy |
| image_gen | Image generation/editing tool (bitmap assets) | Only visual asset generation/editing tasks | Prompt/context | Generated image output | Runtime/source changes unless separately edited | Use only when task asks for image/visual asset | Generate a bitmap mockup asset | System tool policy |
| browser/chrome/computer-use skills | UI/browser control skills (local/Chrome/browser inspection) | Visual route validation or browser tasks when selected | Localhost/browser pages | Browser state; files only through explicit tasks | External/customer actions, production changes | Read-only validation usually allowed; authenticated/external writes need approval | Inspect `localhost:3000` preview if server is running | Plugin skill files |

## Future Recommended Agents
(planned or recommended agents that are not executable today)

| Agent / Tool Name | Purpose | When To Use | May Read | May Update | Must Not Touch | Required Approval Level | Example Task | Source / Authority |
|---|---|---|---|---|---|---|---|---|
| QA_AGENT_SPECIALIST | Possible future broader QA owner (not active today) | Only after documented QA workflow gap | None until created | None | Must not replace active QA workflow role | Explicit approval before creation | Future test strategy owner | `agents/AGENT_REGISTRY.md` |
| INVOICE4U_AGENT | Future Invoice4U integration owner (not created) | Future Invoice4U integration planning after approval | None until created | None | Invoice writes, credentials, production integration | Explicit approval before creation/implementation | Plan Invoice4U adapter | `agents/AGENT_REGISTRY.md` |
| EXPENSE_AGENT | Future supplier expense automation owner (not created) | Future expense invoice automation after approval | None until created | None | Expense automation, vendor invoice writes, payment integrations | Explicit approval before creation/implementation | Plan supplier invoice intake | `agents/AGENT_REGISTRY.md` |
| SYSTEM_HEALTH_AGENT | Future health monitoring owner (planned only) | Read-only health planning only | `project-brain/SYSTEM_HEALTH_AGENT_PLAN.md`, `project-brain/SYSTEM_HEALTH_RULES.md` | Planning docs only after approval | Scheduled monitoring, DB writes, repair actions, production alerts | Explicit approval before active monitoring | Design read-only health dashboard | `project-brain/SYSTEM_HEALTH_AGENT_PLAN.md` |

## Agent Support And Test Sources
(discovered agent-adjacent files that support agents but are not separate active agents)

| Agent / Tool Name | Purpose | When To Use | May Read | May Update | Must Not Touch | Required Approval Level | Example Task | Source / Authority |
|---|---|---|---|---|---|---|---|---|
| AGENT_FACTORY_OPERATING_SYSTEM | Agent factory governance reference (rules for creating/upgrading agents) | Only when an agent creation/upgrade is explicitly approved or a gap is proven | Agent registry, governance map, factory file | Docs only after approval | Creating duplicate agents or bypassing registry | Explicit approval for new agent architecture | Check whether a new agent is justified | `agents/AGENT_FACTORY_OPERATING_SYSTEM.md` |
| AI_DRAFT_EXECUTION_CHECKLIST | AI Draft execution checklist (step-by-step AI draft QA/run support) | Before AI draft test/recommendation work | AI draft docs and relevant data sources | No direct updates unless checklist changes are approved | External actions or draft writes without approval | Read-only use allowed; edits require scoped docs approval | Validate a ServiceReport recommendation | `agents/AI_DRAFT_EXECUTION_CHECKLIST.md` |
| AI_DRAFT_OUTPUT_TEMPLATE | AI Draft output template (standard recommendation report shape) | When presenting an AI draft recommendation | Source report and recommendation evidence | No direct updates unless template changes are approved | Maven/email/invoice actions | Read-only use allowed | Format AI draft recommendation output | `agents/AI_DRAFT_OUTPUT_TEMPLATE.md` |
| AI_DRAFT_AGENT_TEST | AI Draft agent test reference (test guidance for draft agent) | AI Draft test planning or regression review | AI draft runtime/source docs | No direct updates unless test docs are being changed | Production or external actions | Read-only use allowed | Review AI draft test expectations | `agents/AI_DRAFT_AGENT_TEST.md` |
| AI_DRAFT_SESSION_CLOSE | AI Draft session close template (AI-draft-specific closeout guidance) | Closing an AI draft test/review session | AI draft validation output | No direct updates unless closeout docs are being changed | Project Brain changes unless explicitly requested by skill/task | Read-only use allowed | Summarize one-report draft test | `agents/AI_DRAFT_SESSION_CLOSE.md` |
| INFRASTRUCTURE_REVIEW_TEMPLATE | Infrastructure review template (architecture/source-of-truth review shape) | Architecture/schema/source boundary review | Architecture, schema, maps, source docs | No direct updates unless template changes are approved | Schema/DB/protected systems | Read-only use allowed | Write an infrastructure impact review | `agents/INFRASTRUCTURE_REVIEW_TEMPLATE.md` |
