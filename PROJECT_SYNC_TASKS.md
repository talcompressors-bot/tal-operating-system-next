# PROJECT SYNC TASKS

Purpose
(compact task board for ChatGPT Project Sources; `project-brain/TASK_BOARD.md` remains canonical)

## Current Task
(the latest task that changed project behavior or sync state)

Task Name
(short name of the active local task)
Production Draft Generation maintenance quality fix.

Meaning
(what the task means)
Improve internal draft recommendations so maintenance reports produce expected reviewable maintenance parts instead of only labor/travel.

Owner
(agent/tool that performs the work)
Codex with AI_DRAFT_AGENT ownership, Project Brain Agent sync, QA/Reviewer workflow review.

Authority
(source allowed to define task truth)
Project Brain defines task state; runtime validation proves behavior; Liad defines business acceptance.

Status
(current completion state)
Implemented locally and uncommitted.

Validation Status
(how proven)
Focused TypeScript passed; read-only recommendation validation passed for ServiceReports `5807` and `5864`; side-effect counts unchanged.

Blocked
(current blocker)
None for this quality fix.

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

## Other Valid Candidate Tasks
(approved candidate tasks that may be selected instead)

Correction Persistence Type Expansion
(meaning)
Review whether approved draft learning needs structured persistence beyond existing logs/rawSource.

Status
(current state)
Candidate only; schema/DB approval required if implementation needs new persistence.

BusinessDocument Type Expansion Design
(meaning)
Plan true Tax Invoice / Receipt, Purchase Order, Delivery Note, and Debit Note support.

Status
(current state)
Candidate only; enum/schema changes require explicit approval.

Inventory And Procurement Boundary
(meaning)
Define parts/procurement/supplier/stock boundaries before inventory mutation exists.

Status
(current state)
Candidate only; no inventory action approved.

FinancialEvidence Persistence
(meaning)
Persist payment/financial evidence and attachments after privacy/storage/schema approval.

Status
(current state)
Candidate only; explicit approval required.

Automation And Integration Adapter Readiness
(meaning)
Prepare Maven/Invoice4U/email/bank/OCR adapter evidence and command boundaries.

Status
(current state)
Candidate only; external actions remain approval-gated.

Build Hygiene For AI Draft Adapter Typing
(meaning)
Fix known unrelated TypeScript pricing-evidence typing issue in `app/ai-drafts/ai-draft-adapter.ts`.

Status
(current state)
Candidate only; not part of latest maintenance fix.

## Forbidden / Gated Tasks
(tasks that require explicit approval or are currently not allowed)

Real Maven Execution
(meaning)
Execute `NEXT-MAVEN-CMD-NEXT-AI-DRAFT-5806` or create any real Maven/Invoice4U document.

Status
(current state)
APPROVAL_REQUIRED.

Wave 2/3/4 Import
(meaning)
Import additional source-system data into Supabase.

Status
(current state)
APPROVAL_REQUIRED and currently blocked by Wave 2 readiness issues.

Production Cutover
(meaning)
Move from AppSheet/Sheets production to the Next.js/Supabase system.

Status
(current state)
Not approved.

Customer-Facing Actions
(meaning)
Send email, WhatsApp, final invoice, receipt, external PDF delivery, or customer document.

Status
(current state)
Not approved.

Inventory Mutation
(meaning)
Deduct, reserve, import, or change stock/procurement data.

Status
(current state)
Not approved.
