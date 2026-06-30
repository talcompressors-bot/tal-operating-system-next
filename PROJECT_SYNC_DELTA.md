# PROJECT SYNC DELTA

Purpose
(compact last-change summary for ChatGPT Project Sources and future closeouts)

## Delta 2026-06-30 End-Of-Task Protocol
(latest documentation-sync rule change in this commit)

What Changed
(what was actually changed)
Updated the existing sync layer to make the end-of-task protocol mandatory: update relevant `PROJECT_SYNC_*` files, validate, commit and push, copy sync files to the approved Google Drive mirror, and report commit hash, git status, validation, and sync result.

Why
(why it was changed)
The sync layer needed an explicit repeatable closeout rule so ChatGPT Project Sources and the Google Drive mirror stay current after every Codex task.

Business Value
(what TAL gains)
Future work has a reliable handoff path: Project Sources stay synchronized, Git truth is visible, and missing Drive mirror sync cannot be silently ignored.

Affected Domains
(business areas impacted)
Project governance, ChatGPT Project Sources onboarding, Codex closeout, Google Drive sync mirror.

Affected Runtime
(ERP engines impacted)
None; documentation-only protocol update.

Affected Files
(files changed)
`PROJECT_SYNC_STATE.md`, `PROJECT_SYNC_DELTA.md`, `PROJECT_SYNC_TASKS.md`, `PROJECT_SYNC_AUTHORITY.md`, and `PROJECT_SYNC_OPERATING_GUIDE.md`.

Validation
(how it was proven)
Validation must confirm the mandatory five-step protocol appears in `PROJECT_SYNC_OPERATING_GUIDE.md`, closeout routing appears in `PROJECT_SYNC_TASKS.md`, Google Drive mirror authority appears in `PROJECT_SYNC_AUTHORITY.md`, current state/delta reflect the protocol update, every changed sync heading has a parenthetical explanation line, and only `PROJECT_SYNC_*` files are staged.

Risks
(what may still break)
The Google Drive mirror copy can be blocked if the approved mirror folder or connector access is unavailable.

Open Issues
(what is not solved yet)
`PROJECT_SYNC_RULES.md` and `PROJECT_SYNC_CHECKLIST.md` do not exist in the repository; this task did not create them because the user instructed not to create new sync files.

Next Required Action
(what should happen next)
Use the mandatory end-of-task protocol on every future Codex task and report Google Drive mirror copy results explicitly.

Authority
(who/what is allowed to define this truth)
Git defines committed/pushed file truth; Project Brain defines current project/task truth; approved Drive readback defines mirror truth; Liad defines priorities and protected-action approval.

External Side Effects
(whether any external system changed)
None from this documentation update until the explicit Drive mirror copy step is executed.

Current Commit State
(whether this delta is committed)
Committed and pushed in the latest end-of-task protocol sync commit; Git and the final report are authority for the exact hash.

## Delta 2026-06-30 Sync Verification
(latest documentation-sync verification change in this commit)

What Changed
(what was actually changed)
Verified the six existing `PROJECT_SYNC_*` files for completeness, consistency, and ChatGPT Project Sources suitability, then updated this sync layer to record the verification as the latest sync event.

Why
(why it was changed)
The Project Sources layer must clearly tell a new ChatGPT/Codex session what each sync file covers, where deeper knowledge lives, how to route tasks, which agents/tools/skills exist, who owns truth, and what changed most recently.

Business Value
(what TAL gains)
Future sessions can rely on the six upload files as the practical Project Sources entrypoint without creating duplicate sync systems or loading noisy Project Brain files unnecessarily.

Affected Domains
(business areas impacted)
Project governance, ChatGPT Project Sources onboarding, agent routing, task selection, source-of-truth discipline.

Affected Runtime
(ERP engines impacted)
None; documentation-only verification.

Affected Files
(files changed)
`PROJECT_SYNC_STATE.md`, `PROJECT_SYNC_DELTA.md`, and `PROJECT_SYNC_TASKS.md`.

Validation
(how it was proven)
Verification checked that `PROJECT_SYNC_STATE.md` explains current state, `PROJECT_SYNC_DELTA.md` explains recent changes, `PROJECT_SYNC_AGENTS.md` explains agents/tools/skills, `PROJECT_SYNC_TASKS.md` explains current/next tasks, `PROJECT_SYNC_AUTHORITY.md` explains source-of-truth priority, and `PROJECT_SYNC_OPERATING_GUIDE.md` explains how ChatGPT/Codex should use the files.

Risks
(what may still break)
Sync files can still become stale if future runtime or Project Brain changes are not reflected during closeout.

Open Issues
(what is not solved yet)
The separate runtime maintenance-quality fix remains local and uncommitted; it should not be mixed into sync documentation commits.

Next Required Action
(what should happen next)
Upload the six `PROJECT_SYNC_*` files to ChatGPT Project Sources and continue no feature work from this verification task.

Authority
(who/what is allowed to define this truth)
Git defines committed/pushed file truth; Project Brain defines current project/task truth; runtime validation defines behavior; Liad defines priorities and protected-action approval.

External Side Effects
(whether any external system changed)
None. No runtime feature work, schema change, DB write/import, package install, external action, Maven/Invoice4U, email/customer action, inventory mutation, source-system action, or production action.

Current Commit State
(whether this delta is committed)
Committed and pushed in the latest sync verification commit; Git and the final report are authority for the exact hash.

## Delta 2026-06-30 Sync Expansion
(latest documentation-sync change in this commit)

What Changed
(what was actually changed)
Expanded the existing six `PROJECT_SYNC_*` files into a practical ChatGPT Project Sources layer with smart indexes, specialized-source pointers, agent/tool/skill coverage, authority routing, task-specific source routing, and before-task operating rules.

Why
(why it was changed)
The initial sync files covered current state, delta, agents, tasks, authority, and operating rules, but they did not yet route a new ChatGPT Project to deeper task-specific files, specialized knowledge files, migration evidence, generated reports, or future sync candidates.

Business Value
(what TAL gains)
Future ChatGPT/Codex sessions can start faster, avoid duplicate planning systems, find the right authority/source for each task, and continue safely without loading the entire Project Brain by default.

Affected Domains
(business areas impacted)
Project governance, Project Sources onboarding, agent routing, task selection, source-of-truth discipline.

Affected Runtime
(ERP engines impacted)
None; documentation-only sync expansion.

Affected Files
(files changed)
`PROJECT_SYNC_STATE.md`, `PROJECT_SYNC_DELTA.md`, `PROJECT_SYNC_AGENTS.md`, `PROJECT_SYNC_TASKS.md`, `PROJECT_SYNC_AUTHORITY.md`, `PROJECT_SYNC_OPERATING_GUIDE.md`.

Validation
(how it was proven)
Validation must confirm all six sync files exist, no duplicate `PROJECT_SYNC_INDEX.md` was created, required source-index coverage exists, required agent/tool/skill coverage exists, every `##` and `###` sync-file heading has a parenthetical explanation line, and only `PROJECT_SYNC_*.md` files are staged/committed.

Risks
(what may still break)
Sync files can become stale if future closeout updates Project Brain but does not update the sync layer; pointer summaries may omit a niche source that a specialized task later needs.

Open Issues
(what is not solved yet)
No generator exists to automatically refresh sync files from Project Brain; the separate runtime maintenance-quality fix remains local and uncommitted pending a line-classification fix/recommendation.

Next Required Action
(what should happen next)
After this sync expansion is committed and pushed, continue no feature work; next safe project task remains Asset Workspace / Asset Timeline unless Liad selects the runtime draft-quality fix cleanup first.

Authority
(who/what is allowed to define this truth)
Git defines committed/pushed file truth; Project Brain defines current project/task truth; runtime validation defines behavior; Liad defines priorities and protected-action approval.

External Side Effects
(whether any external system changed)
None. No runtime feature work, schema change, DB write/import, package install, external action, Maven/Invoice4U, email/customer action, inventory mutation, source-system action, or production action.

Current Commit State
(whether this delta is committed)
Committed and pushed in the latest sync expansion commit; Git and the final report are authority for the exact hash.

## Delta 2026-06-30 Runtime Quality Review
(uncommitted runtime-quality change that future sessions must understand but not confuse with this docs commit)

What Changed
(what was actually changed)
Production Draft Generation maintenance-quality files remain locally modified and uncommitted after review; recommendation was `fix first`, not commit yet.

Why
(why it was changed)
The change improves maintenance/service-kit line generation, but the review found that performed vs recommended vs inferred standard maintenance lines are not explicitly labeled clearly enough for internal review.

Business Value
(what TAL gains)
Committing only after the classification gap is fixed reduces risk that office reviewers confuse performed work with recommended/inferred maintenance items.

Affected Domains
(business areas impacted)
Commercial Runtime, AI Draft Recommendation, BusinessDocument Draft Review, Service Operations.

Affected Runtime
(ERP engines impacted)
Internal production draft recommendation layer and BusinessCase recommendation display only.

Affected Files
(files changed by the local runtime implementation)
- `lib/business-document-production-draft.ts`
- `app/business-cases/service-report/[id]/actions.ts`
- `app/business-cases/service-report/[id]/page.tsx`

Validation
(how it was proven)
Review confirmed gateway idempotency preserves existing drafts unless explicitly regenerated, preview/PDF remains simple, evidence/confidence stays internal, and project `tsc` still fails only on the known unrelated `app/ai-drafts/ai-draft-adapter.ts` pricing-evidence typing issue.

Risks
(what may still break)
Internal line classification is not explicit enough; reviewers may not clearly see whether a line was performed, recommended, or inferred from standard maintenance rules.

Open Issues
(what is not solved yet)
Add explicit internal line classification before committing the runtime quality fix.

Next Required Action
(what should happen next)
Fix the classification gap first, then consider a separate scoped runtime-quality commit.

Authority
(who/what is allowed to define this truth)
Runtime validation and code review define behavior risk; Project Brain defines task state; Liad defines whether the quality fix is acceptable.

External Side Effects
(whether any external system changed)
None from the review. No schema/DB/external/inventory/email/Maven/package/source-system action occurred.

Current Commit State
(whether this delta is committed)
Runtime files are uncommitted and must remain separate from the sync expansion commit.

## Delta 2026-06-30 Project Sync Layer
(initial Project Sources synchronization files created by the prior DOC_SYNC task)

What Changed
(what was actually changed)
Added six concise `PROJECT_SYNC_*.md` files for ChatGPT Project Sources: state, delta, agents, tasks, authority, and operating guide.

Why
(why it was changed)
Project Brain is authoritative but too detailed/noisy for fast ChatGPT Project Sources loading; future sessions need a compact synchronized knowledge layer.

Business Value
(what TAL gains)
Faster continuation, fewer repeated context questions, clearer approval gates, and safer autonomous agent handoffs.

Affected Domains
(business areas impacted)
Governance, Project Brain synchronization, ChatGPT/Codex operating workflow.

Affected Runtime
(ERP engines impacted)
None; documentation-only sync layer.

Affected Files
(files changed)
`PROJECT_SYNC_STATE.md`, `PROJECT_SYNC_DELTA.md`, `PROJECT_SYNC_AGENTS.md`, `PROJECT_SYNC_TASKS.md`, `PROJECT_SYNC_AUTHORITY.md`, `PROJECT_SYNC_OPERATING_GUIDE.md`.

Validation
(how it was proven)
Files were checked for required scope coverage, source-of-truth separation, agent/tool inventory, task meaning, authority matrix, and operating guide coverage.

Risks
(what may still break)
Sync files can become stale if closeout does not update them after meaningful future work.

Open Issues
(what is not solved yet)
Manual maintenance only; no automatic generator exists yet.

Next Required Action
(what should happen next)
Update these sync files during every successful closeout when current state, delta, agents, tasks, authority, or source routing changes.

Authority
(who/what is allowed to define this truth)
Project Brain remains authority; sync files are compact mirrors for ChatGPT Project Sources.

Current Commit State
(whether this delta is committed)
Committed and pushed in `85fc703 Add project sync source files`.
