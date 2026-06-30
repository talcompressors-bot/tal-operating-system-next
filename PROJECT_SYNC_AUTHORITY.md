# PROJECT SYNC AUTHORITY

Purpose
(single authority matrix separating Agent from Authority)

## Core Rule
(how to separate worker roles from truth sources)

Agent
(the role/tool that performs work)
An agent executes, reviews, validates, advises, or records.

Authority
(the source allowed to define truth)
An authority is the canonical source for a class of facts.

Rule
(how to avoid confusion)
Do not treat an agent as truth unless it cites the authority source.

## Authority Matrix
(which source defines each category of truth)

| Information Type | Authority / Source Of Truth | Short Explanation | When To Read | Related Agent |
|---|---|---|---|---|
| Commit hash, branch state, pushed/unpushed status | Git | Repository history and remote tracking define what is committed/pushed | Before/after commit, push, closeout, or status report | GIT_AGENT |
| Current project state | `project-brain/CURRENT_TASK.md` | Single source for current phase, task, blocker, and next task | Startup, task selection, closeout | PROJECT_BRAIN_AGENT |
| Task board | `project-brain/TASK_BOARD.md` | NOW/NEXT/DONE/BLOCKED task truth | Before selecting or explaining tasks | PROJECT_BRAIN_AGENT |
| Decisions and approvals | `project-brain/DECISION_LOG.md` plus explicit Liad approval | Why rules changed and what was approved | Before behavior/governance/protected action changes | Reviewer, Orchestrator |
| Startup/project tree protocol | `PROJECT_INDEX.md` | Reality Check, project tree, completion model, current position | Every startup/closeout/approval report | Orchestrator |
| Operating rules and risk classes | `PROJECT_OPERATING_PROTOCOL.md` | TDOS risk model and protected action gates | Before any task or approval decision | PRE_MISSION_REVIEW_SYSTEM |
| Runtime behavior | Local validation results and runtime source files | Actual app behavior is proven by tests/routes/readbacks | Before claiming a feature works | QA_AGENT_WORKFLOW_ROLE |
| Persisted business data | Database readback | Supabase/PostgreSQL rows define persisted Customers/Reports/Documents/etc. | Before reporting counts or row state | QA, domain agents |
| Schema shape | `prisma/schema.prisma` | Prisma models/enums/relations define current schema | Any model/field/schema question | INFRASTRUCTURE_MANAGER_AGENT |
| Agent inventory | `agents/AGENT_REGISTRY.md` | Active/planned agent status and allowed/forbidden actions | Before routing or creating/upgrading agents | ORCHESTRATOR_AGENT |
| Workflow-role behavior | `project-brain/agents/*.md` | Map Guard/Builder/QA/Reviewer workflow definitions | During governed autonomous work | Orchestrator |
| Repo skill behavior | `.agents/skills/*/SKILL.md` | Skill-specific instructions and boundaries | Before using startup/closeout/AI draft skills | Codex |
| Business priority and acceptance | Human owner (Liad) | Business value, acceptance, protected approvals | When choosing priorities or accepting recommendations | Orchestrator |
| ChatGPT Project Sources summary | `PROJECT_SYNC_*.md` | Compact mirror/index for ChatGPT; not deeper authority than Project Brain | Start of any ChatGPT Project session | ChatGPT, Codex |

## File-Level Authority Index
(who owns truth for important source categories)

| Path / Pattern | Authority | Short Explanation | When To Read | Related Capability / Agent |
|---|---|---|---|---|
| `PROJECT_SYNC_*.md` | Mirrors Project Brain/Git/runtime truth | Compact sync layer for ChatGPT Project Sources | First-pass source loading | ChatGPT, Codex |
| `PROJECT_INDEX.md` | Project Brain / Git | Living project map and Reality Check rules | Startup, closeout, approval gates | Project Brain Agent |
| `PROJECT_OPERATING_PROTOCOL.md` | Human-approved governance protocol | Risk classes, allowed/forbidden actions, approval reports | Before every task | Orchestrator |
| `project-brain/CURRENT_TASK.md` | Project Brain | Current state/task/blocker/next action | Startup, task selection, closeout | Project Brain Agent |
| `project-brain/TASK_BOARD.md` | Project Brain | Task board truth | Planning and closeout | Project Brain Agent |
| `project-brain/DECISION_LOG.md` | Project Brain / human approvals | Decision history and rationale | Before changing rules/behavior | Reviewer |
| `project-brain/current/LIVE_OBJECTS.md` | Project Brain plus database/runtime validation | Active IDs and object references | Before using live IDs | QA |
| `agents/AGENT_REGISTRY.md` | Agent registry | Agent status, ownership, reuse-before-create | Before routing/agent changes | Orchestrator |
| `agents/*.md` | Agent registry plus each agent source | Specialist role instructions | Before agent-domain work | Specialist agents |
| `project-brain/agents/*.md` | Project Brain workflow | Map Guard/Builder/QA/Reviewer workflow | During autonomous work | Workflow roles |
| `.agents/skills/*/SKILL.md` | Skill source files | Skill behavior and required reads | Before invoking repo skills | Codex |
| `APPLICATION_ROUTE_MAP.md` | Runtime route evidence / Project Brain | Route inventory and module status | UI/route tasks | QA |
| `DATA_COVERAGE_AUDIT.md` | Runtime/database validation | Data availability and readiness | Data/source availability checks | QA |
| `project-brain/maps/*.md` | Project Brain maps | System, AppSheet, Apps Script, field maps | Source-system and mapping tasks | Infrastructure/APPS_SCRIPT/AI Draft |
| `project-brain/migration/*.md` | Project Brain / human-approved migration plan | Schema/import/staging/migration truth | DB/schema/import tasks | Infrastructure Manager |
| `project-brain/appsheet-ui/*.md` | AppSheet discovery evidence | Legacy UI/action/view inventory | AppSheet parity/migration tasks | APPS_SCRIPT_AGENT |
| `project-brain/apps-script/*` | Source evidence snapshot | Legacy Apps Script/Maven/email behavior | Apps Script/Maven/email analysis | APPS_SCRIPT_AGENT, MAVEN_AGENT |
| `project-brain/archive/research/*.md` | Archived evidence packets | Historical source evidence for SKU/service/Maven decisions | Niche evidence checks | AI Draft/Maven |
| `app/**` | Git/runtime validation | Next.js routes, pages, actions | Runtime feature/review work | Builder, QA |
| `lib/**` | Git/runtime validation | Shared runtime engines and domain boundaries | Business logic work | Domain agents |
| `data-sources/**` | Source files/generators | Manufacturer/source data fixtures and extracts | SKU/parts/source evidence | AI Draft/Infrastructure |
| `prisma/schema.prisma` | Schema authority | Prisma schema shape | Schema/model questions | Infrastructure Manager |

## Conflict Rules
(what wins when sources disagree)

Git vs Sync Files
(commit truth conflict)
Git wins for commits and pushed/unpushed status; update sync files after verifying.

Project Brain vs Sync Files
(project-state conflict)
Project Brain wins for current state/task/blocker/next action; update sync files after verifying.

Runtime Validation vs Project Brain
(behavior conflict)
Runtime/database evidence wins for what actually happens; report drift and update Project Brain/sync files after validation.

Database vs Memory
(data conflict)
Database readback wins for persisted rows and counts; memory or docs must not invent row state.

Human Owner vs Agent
(business decision conflict)
Human owner approval/priority wins over agent recommendation.

ChatGPT vs Canonical Sources
(advice conflict)
ChatGPT may advise, but must cite canonical sources and cannot override Git, Project Brain, database, runtime validation, or human approval.

## Update Permissions
(which worker may update which information after authority is checked)

| Worker | May Update | Must Not Update | Approval Level |
|---|---|---|---|
| Codex | Approved/AUTO_ALLOWED repo files, sync docs, safe scoped code, validation reports, scoped Git commits | Protected systems, unrelated files, secrets, unapproved schema/DB/external actions | AUTO_ALLOWED for safe scope; explicit approval for protected systems |
| Project Brain Agent | Project Brain state files after completed safe work | Runtime code, DB/schema/business data | AUTO_ALLOWED for state sync; approval for governance redesign |
| Git Agent | Git index/commit/push for scoped validated work | Destructive Git, unrelated files, secrets, remote config changes | Safe scoped commit/push when requested/allowed |
| QA / Reviewer | Validation/review findings | Runtime mutations or protected approvals | No approval for review; protected validation writes forbidden |
| Human Owner | Business priority, protected approvals, acceptance | N/A | Final business authority |
