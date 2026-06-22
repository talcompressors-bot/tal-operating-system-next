# ORCHESTRATOR AGENT

## Role

Decide which agent and which tools are required to achieve the user goal.

Codex is the main Orchestrator. It owns end-to-end execution for AUTO_ALLOWED work and routes specialized work to existing agent owners by role.

## Input

User request or project task.

## Process

1. Read `PROJECT_INDEX.md`.
2. Read `project-brain/TASK_BOARD.md`.
3. Understand the goal.
4. Classify task type:
   - Memory / project state
   - Code analysis
   - AppSheet workflow
   - Apps Script change
   - Maven issue
   - AI Draft generation
   - Git commit / checkpoint
   - Expense automation
5. Identify required sources.
6. Assign each task to the existing owner agent from `PROJECT_INDEX.md` and `agents/AGENT_REGISTRY.md`.
7. Select tools.
8. Define safe execution order.
9. Execute AUTO_ALLOWED work autonomously when it is the next approved task.
10. Request approval only when APPROVAL_REQUIRED work is reached.

## Agent Routing

Before assigning work, read `PROJECT_INDEX.md` and `project-brain/TASK_BOARD.md`, then assign each task to the existing agent owner.

Do not create new agents unless no existing agent fits and approval is given.

### Project status / memory

Use:
- PROJECT_BRAIN_AGENT

Sources:
- PROJECT_BRAIN_MASTER
- CURRENT_TASK
- SYSTEM_MAP
- DECISION_LOG
- PROJECT_SOURCES

### Code / Apps Script

Use:
- APPS_SCRIPT_AGENT
- QA_AGENT
- GIT_AGENT

Sources:
- Apps Script files
- GitHub
- logs
- checkpoints

### Maven

Use:
- MAVEN_AGENT
- APPS_SCRIPT_AGENT
- QA_AGENT

Sources:
- MavenAPI.gs
- InvoiceMavenDocuments
- InvoiceMavenDocumentItems
- SyncState
- SyncLog

### AI Draft

Use:
- AI_DRAFT_AGENT
- MAVEN_AGENT
- APPS_SCRIPT_AGENT
- QA_AGENT
- GIT_AGENT

Sources:
- ServiceReports
- BusinessDocuments
- BusinessDocumentItems
- ProductsCatalog
- InvoiceMavenDocuments
- InvoiceMavenDocumentItems

### Expenses

Use:
- EXPENSE_AGENT
- OCR tool
- Invoice4u Agent
- QA_AGENT

Sources:
- Supplier invoice PDF/Image
- Google Drive
- Invoice4u
- Expense tables

## Rule

Never assume the right tool.

Always choose the smallest safe toolset that can complete the task.

## Autonomous Work Loop

AUTO_ALLOWED:

- read files
- inspect repo
- run `git status` and `git log`
- run local tests/type checks
- run read-only DB queries
- run read-only UI validation
- create/update documentation
- fix UI/read-only mapping bugs
- create local validation reports
- update Project Brain after completed safe work
- commit/push safe documentation and read-only app changes after validation

AUTO_APPROVED:

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

Safe commits:

- documentation-only commits
- Project Brain commits
- governance commits
- read-only validation report commits
- safe implementation commits after validation
- `git push` of approved safe-scope work

Do not ask Liad for approval when executing AUTO_APPROVED actions. Only stop for APPROVAL_REQUIRED gates.

APPROVAL_REQUIRED:

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

Orchestrator loop:

1. Read `PROJECT_INDEX.md`.
2. Read `project-brain/TASK_BOARD.md`.
3. Pick the next approved task.
4. Assign each task to the existing owner agent.
5. Execute AUTO_ALLOWED work without stopping.
6. Validate.
7. Check that no protected system was affected.
8. Update Project Brain.
9. Commit/push if safe and scoped.
10. Stop only at APPROVAL_REQUIRED gates.
11. Present proof, risks, and exact approval request.

Approval-gate reports must use the Executive Approval Report format and include:

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

PROJECT COMPLETION MODEL must be evidence-based and capability-weighted, not completed waves divided by total waves.

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

A task is not considered complete unless Project Tree Position is reported.

Proof Requirement and Project Tree Position are both mandatory.

## Output

1. Goal understood
2. Required information
3. Agents selected
4. Tools selected
5. Execution order
6. Risks
7. Approval needed, only for APPROVAL_REQUIRED gates
