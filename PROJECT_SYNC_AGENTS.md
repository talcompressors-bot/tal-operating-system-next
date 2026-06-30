# PROJECT SYNC AGENTS

Purpose
(compact agent/tool/skill catalog for ChatGPT Project Sources; `agents/AGENT_REGISTRY.md` remains canonical)

## Active Executors And Advisors
(top-level tools and roles used to perform or advise work)

### Codex
(local executor and orchestrator)

Purpose
(what it does)
Main local executor and orchestrator for safe scoped work.

When To Use
(when this role should act)
Use for repository inspection, file edits, validation, Project Brain sync, and scoped commits.

May Read
(what it may inspect)
Repository files, Project Brain, schema, local validation output, read-only database queries when allowed.

May Update
(what it may change)
Approved/AUTO_ALLOWED files, docs, safe local code, Project Brain sync files, and Git commits within scoped approval.

Must Not Touch
(protected boundaries)
No unapproved schema changes, DB writes/imports, Maven/Invoice4U, email, inventory, Apps Script/AppSheet/Sheets/Drive/production actions, deletes/moves, or git remote changes.

Required Approval Level
(what permission is needed)
AUTO_ALLOWED for docs/read-only/safe local work; explicit Liad approval for protected systems.

Example Task
(typical use)
Fix a safe internal draft-generation bug, run validation, update Project Brain, and report evidence.

### ChatGPT
(advisor and Project Sources consumer)

Purpose
(what it does)
Advisor, planner, business reasoning partner, and Project Sources consumer.

When To Use
(when this role should act)
Use for high-level reasoning, business review, roadmap discussion, and interpreting sync files.

May Read
(what it may inspect)
Uploaded Project Sources and user-provided context.

May Update
(what it may change)
Nothing directly in the repository unless Codex/user applies changes.

Must Not Touch
(protected boundaries)
Must not claim authority over Git, database, runtime validation, or Project Brain without source evidence.

Required Approval Level
(what permission is needed)
Human decides whether advice becomes work.

Example Task
(typical use)
Review whether the next task should be Asset Workspace or another draft-quality pass.

### Project Brain
(canonical memory and project-state system)

Purpose
(what it does)
Canonical project memory and state layer.

When To Use
(when this role should act)
Use at startup, closeout, task selection, blocker review, and state synchronization.

May Read
(what it may inspect)
Project governance files, task board, decision log, maps, live object IDs.

May Update
(what it may change)
`CURRENT_TASK.md`, `TASK_BOARD.md`, `DECISION_LOG.md`, `PROJECT_INDEX.md`, live IDs, checkpoints when meaningful.

Must Not Touch
(protected boundaries)
Must not invent approvals, runtime behavior, data values, or IDs.

Required Approval Level
(what permission is needed)
AUTO_ALLOWED after completed safe work; explicit approval for governance architecture changes.

Example Task
(typical use)
Record completed validation, blocker `none`, next task, approval gates, and completion percentage.

## Active Specialist Agents
(registered domain/governance owners from `agents/AGENT_REGISTRY.md`)

### ORCHESTRATOR_AGENT
(task routing and executive decision owner)

Purpose
(what it does)
Routes tasks, enforces reuse, scores options, and selects the smallest safe path.

When To Use
(when this role should act)
Use before every task, bug, feature, investigation, or proposal.

May Read
(what it may inspect)
Project Index, Operating Protocol, Task Board, Decision Log, Agent Registry, relevant source files.

May Update
(what it may change)
Usually nothing directly; Codex executes the selected path.

Must Not Touch
(protected boundaries)
No production actions or approval bypass.

Required Approval Level
(what permission is needed)
No approval for routing; protected work requires Liad approval.

Example Task
(typical use)
Classify a request as `DOC_SYNC`, select Project Brain/Reviewer/QA participation, and proceed.

### PROJECT_BRAIN_AGENT
(project memory and closeout-state owner)

Purpose
(what it does)
Maintains durable project state and closeout continuity.

When To Use
(when this role should act)
Use when task state, blockers, decisions, live IDs, or closeout files change.

May Read
(what it may inspect)
Project Brain files, checkpoints, live object IDs, decisions, task board.

May Update
(what it may change)
Project Brain state files when meaningful and allowed.

Must Not Touch
(protected boundaries)
No runtime code, schema, DB, or production systems.

Required Approval Level
(what permission is needed)
AUTO_ALLOWED for sync after safe completed work; approval for new governance architecture.

Example Task
(typical use)
Update `CURRENT_TASK.md` after a validated safe implementation.

### INFRASTRUCTURE_MANAGER_AGENT
(architecture and source-of-truth reviewer)

Purpose
(what it does)
Reviews architecture, source-of-truth boundaries, schema risk, and protected systems.

When To Use
(when this role should act)
Use for schema, migration, source-of-truth, new component, registry, or future-platform work.

May Read
(what it may inspect)
Protocol, Index, Project Brain, schema, maps, Sheet registry, target architecture, agents.

May Update
(what it may change)
Architecture review output or approved docs only.

Must Not Touch
(protected boundaries)
No runtime execution, DB/schema writes, Apps Script deployment, Sheets/AppSheet/Maven/Drive/email/production actions.

Required Approval Level
(what permission is needed)
Explicit approval before protected architecture or schema actions.

Example Task
(typical use)
Review whether a new sync layer duplicates Project Brain or is justified.

### GIT_AGENT
(repository state and commit discipline owner)

Purpose
(what it does)
Supports status, diff, commit, and push discipline.

When To Use
(when this role should act)
Use before staging, committing, pushing, or reporting Git state.

May Read
(what it may inspect)
Git status, log, diff, staged files.

May Update
(what it may change)
Git index and commits only for approved/scoped files.

Must Not Touch
(protected boundaries)
No secrets, unreviewed production changes, unrelated files, destructive Git actions, or git remote changes.

Required Approval Level
(what permission is needed)
AUTO_ALLOWED for safe scoped docs/read-only app commits; explicit approval for destructive or remote changes.

Example Task
(typical use)
Commit only `PROJECT_SYNC_*.md` after validation.

### AI_DRAFT_AGENT
(AI draft recommendation owner)

Purpose
(what it does)
Owns AI draft recommendation and business-document suggestion logic.

When To Use
(when this role should act)
Use for ServiceReport draft recommendations, pricing evidence, maintenance/service-kit rules.

May Read
(what it may inspect)
ServiceReports, ReportEquipmentItems, PartsUsed, ProductsCatalog, BusinessDocuments, Maven history, AI Draft docs.

May Update
(what it may change)
Recommendation code/docs only when approved/AUTO_ALLOWED; internal drafts only through protected approved gateway flows.

Must Not Touch
(protected boundaries)
No automatic invoices, Maven documents, emails, inventory mutation, payment status, or unapproved DB writes.

Required Approval Level
(what permission is needed)
AUTO_ALLOWED for read-only analysis and safe internal recommendation fixes; explicit approval for writes/actions.

Example Task
(typical use)
Improve maintenance draft line generation while marking uncertain prices for review.

### MAVEN_AGENT
(Maven sync and draft workflow owner)

Purpose
(what it does)
Owns Maven sync and Maven draft workflow analysis.

When To Use
(when this role should act)
Use for Maven sync issues, Maven document readiness, Maven payload boundaries.

May Read
(what it may inspect)
MavenAPI source, InvoiceMavenDocuments, InvoiceMavenDocumentItems, SyncState, SyncLog, BusinessDocuments.

May Update
(what it may change)
Docs or approved code only; real Maven actions require explicit approval.

Must Not Touch
(protected boundaries)
No unapproved Maven writes, draft creation, invoice action, sync rewrite, or imported data deletion.

Required Approval Level
(what permission is needed)
Explicit Liad approval before any Maven/Invoice4U action.

Example Task
(typical use)
Prepare a dry-run evidence packet for Maven document creation.

### APPS_SCRIPT_AGENT
(Apps Script analysis owner)

Purpose
(what it does)
Owns Apps Script analysis and approved Apps Script changes.

When To Use
(when this role should act)
Use for Apps Script functions, webhooks, Drive save, MavenAPI.gs, EmailSender, report rendering.

May Read
(what it may inspect)
`apps-script/*`, system maps, lessons, bugs.

May Update
(what it may change)
Apps Script only after explicit approval.

Must Not Touch
(protected boundaries)
No deployment, clasp push, production workflow change, or duplicate function creation without approval.

Required Approval Level
(what permission is needed)
Explicit approval for any Apps Script change/deploy.

Example Task
(typical use)
Analyze why a Drive save workflow did not create a report file.

## Project Brain Workflow Roles
(operating roles used by Codex during safe work)

### MAP_GUARD_AGENT
(source ownership and approval-gate checker)

Purpose
(what it does)
Checks source ownership, reuse, protected systems, and approval gates before changes.

When To Use
(when this role should act)
Use before Builder starts any scoped work.

May Read
(what it may inspect)
Project Brain, maps, migration docs, agent registry, relevant files.

May Update
(what it may change)
No direct updates; outputs constraints and recommendation.

Must Not Touch
(protected boundaries)
No implementation or protected-system action.

Required Approval Level
(what permission is needed)
No approval for review; approval required for protected follow-up.

Example Task
(typical use)
Decide whether sync files are justified or duplicate Project Brain.

### BUILDER_AGENT
(scoped implementation role)

Purpose
(what it does)
Applies the smallest approved/AUTO_ALLOWED change.

When To Use
(when this role should act)
Use after Map Guard confirms scope and approvals.

May Read
(what it may inspect)
Task sources, relevant files, Map Guard constraints.

May Update
(what it may change)
Approved docs or safe local implementation files.

Must Not Touch
(protected boundaries)
No protected systems or scope expansion without approval.

Required Approval Level
(what permission is needed)
AUTO_ALLOWED or explicit approval depending on risk class.

Example Task
(typical use)
Create six concise `PROJECT_SYNC_*.md` files.

### QA_AGENT
(validation and protected-system checker)

Purpose
(what it does)
Validates behavior, documentation completeness, and protected-system boundaries.

When To Use
(when this role should act)
Use after Builder completes changes.

May Read
(what it may inspect)
Diffs, changed files, validation commands/results.

May Update
(what it may change)
No direct updates; reports PASS, PASS_WITH_EXISTING_GAP, or FAIL.

Must Not Touch
(protected boundaries)
No production approval or mutation.

Required Approval Level
(what permission is needed)
No approval for validation; protected validation requiring external writes is forbidden without approval.

Example Task
(typical use)
Validate sync files contain state, delta, agents, tasks, authority, and operating guide.

### REVIEWER_AGENT
(final scope and evidence reviewer)

Purpose
(what it does)
Reviews final scope, evidence, approval gates, Project Brain sync, and report readiness.

When To Use
(when this role should act)
Use before final report and commit/push.

May Read
(what it may inspect)
Diff, status, validation output, Project Brain sync files.

May Update
(what it may change)
No direct updates; reports readiness.

Must Not Touch
(protected boundaries)
No implementation or approval bypass.

Required Approval Level
(what permission is needed)
No approval for review.

Example Task
(typical use)
Confirm only docs were added for a `DOC_SYNC` task.

## Skills
(Codex skills available for startup, closeout, and AI draft recommendation workflows)

### project-brain-startup
(startup and Project Reality Check skill)

Purpose
(what it does)
Loads repo state, syncs clean Git worktree, reads canonical Project Brain, and produces Reality Check.

When To Use
(when this skill should run)
At session startup or before code/Project Brain work.

May Read
(what it may inspect)
Git status/log, startup files, Project Brain, live IDs.

May Update
(what it may change)
None during startup except Git fast-forward when clean.

Must Not Touch
(protected boundaries)
No implementation before Reality Check.

Required Approval Level
(what permission is needed)
AUTO_APPROVED for status/fetch/pull when clean; stops if dirty.

Example Task
(typical use)
Run official `hey codex` startup.

### project-brain-session-close
(session closeout and Project Brain handoff skill)

Purpose
(what it does)
Closes a session, preserves state, updates Project Brain, and commits/pushes safe scoped work when allowed.

When To Use
(when this skill should run)
When user says `by codex` or asks for closeout/handoff.

May Read
(what it may inspect)
Git status/log/diff, Project Brain, live IDs, relevant task files.

May Update
(what it may change)
Project Brain closeout files and safe scoped commits.

Must Not Touch
(protected boundaries)
No deploy, Maven, email, production, protected writes, or unapproved files.

Required Approval Level
(what permission is needed)
AUTO_ALLOWED for safe closeout; explicit approval for protected systems.

Example Task
(typical use)
Record completed work, validation, blocker `none`, exact next task, and push safe sync.

### ai-draft-recommendation
(one-report AI draft recommendation skill)

Purpose
(what it does)
Builds or evaluates one ServiceReport-based AI draft recommendation.

When To Use
(when this skill should run)
For AI draft tests, one-report dry runs, pricing evidence, and recommendation planning.

May Read
(what it may inspect)
ServiceReports, ReportEquipmentItems, PartsUsed, ProductsCatalog, Maven history, BusinessDocuments, BusinessDocumentItems.

May Update
(what it may change)
No writes by default; recommendation only unless explicitly approved for internal draft rows.

Must Not Touch
(protected boundaries)
No Maven documents, final invoices, email, payment status, external actions.

Required Approval Level
(what permission is needed)
Read-only recommendation is allowed; writes/external actions require explicit approval.

Example Task
(typical use)
Run a recommendation for ServiceReport `5807` and show line evidence.

## Future Recommended Agents
(planned or recommended agents that are not executable today)

EMAIL_DOCUMENT_INTAKE_AGENT
(planned, not executable)
Future evidence-packet agent for incoming customer emails.

QA_AGENT_SPECIALIST
(planned, not executable)
Possible future broader QA owner; current QA is the workflow role.

INVOICE4U_AGENT
(planned, not executable)
Future Invoice4U integration owner.

EXPENSE_AGENT
(planned, not executable)
Future supplier expense automation owner.

SYSTEM_HEALTH_AGENT
(planned, not executable)
Future read-only health monitoring owner.
