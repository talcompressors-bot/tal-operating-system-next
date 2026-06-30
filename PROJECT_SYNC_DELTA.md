# PROJECT SYNC DELTA

Purpose
(compact last-change summary for ChatGPT Project Sources and future closeouts)

## Delta 2026-06-30
(latest runtime-quality change that future sessions must understand)

What Changed
(what was actually changed)
Production Draft Generation was hardened so maintenance-type ServiceReports generate standard maintenance lines instead of hiding obvious parts when exact part/price evidence is incomplete.

Why
(why it was changed)
Generated drafts were too conservative and failed to suggest obvious filters, oil, and service-kit items for periodic or major maintenance reports.

Business Value
(what TAL gains)
Office review starts from a fuller draft, reducing missed billable maintenance parts and manual quote-building work while preserving review gates.

Affected Domains
(business areas impacted)
Commercial Runtime, AI Draft Recommendation, BusinessDocument Draft Review, Service Operations.

Affected Runtime
(ERP engines impacted)
Internal production draft recommendation layer and BusinessCase recommendation display only.

Affected Files
(files changed by the latest local implementation)
- `lib/business-document-production-draft.ts`
- `app/business-cases/service-report/[id]/actions.ts`
- `app/business-cases/service-report/[id]/page.tsx`
- `PROJECT_INDEX.md`
- `project-brain/CURRENT_TASK.md`
- `project-brain/TASK_BOARD.md`
- `project-brain/DECISION_LOG.md`

Validation
(how it was proven)
Read-only recommendation execution on ServiceReport `5807` / `2bfc0748` detected `Small Service` and generated Air Filter, Oil Filter, 3L SKR oil top-up, Technician Visit / Travel, and Labor + Service.

Additional Validation
(secondary proof)
Read-only recommendation execution on ServiceReport `5864` / `acd1133d` detected `Large Service` and generated Air Filter, Oil Filter, Oil Separator, oil/coolant, Technician Visit / Travel, and Labor + Service.

Price Evidence Found
(which prices were found)
Air Filter `120.00`, Oil Filter `90.00`, oil/top-up `45.00`, Visit/Travel `300.00`, Labor/Service `275.00` from approved BusinessDocumentItem history where available.

Needs Review
(which lines still require human review)
All generated maintenance lines remain review-required when evidence is indirect, same-family, inferred quantity, or price confidence is not high. Oil Separator on `5864` remained `Needs Price Review`.

Risks
(what may still break)
Indirect approved-history prices may not fit every customer/model; ProductCatalog and PartsUsed are currently empty in staging; live route/PDF validation was not run because `localhost:3000` was not running.

Open Issues
(what is not solved yet)
ProductsCatalog and PartsUsed imports are not available; exact sales SKU mapping remains separate; full TypeScript still has a known unrelated AI Draft adapter typing gap.

Next Required Action
(what should happen next)
Review the generated maintenance lines in the internal BusinessDocument review flow, then continue to Asset Workspace / Asset Timeline unless Liad selects another draft-quality pass.

Authority
(who/what is allowed to define this truth)
Project Brain defines project state; Git defines committed history; runtime validation defines behavior; database defines persisted rows; Liad defines business acceptance.

External Side Effects
(whether any external system changed)
None. No Maven/Invoice4U, email, inventory, Google Sheets, AppSheet, Apps Script, Drive, production, schema, migration, package install, or DB import/write occurred.

Current Commit State
(whether this delta is committed)
Runtime maintenance-quality files remain local and uncommitted until a separate scoped implementation commit.

## Delta 2026-06-30 Project Sync Layer
(new Project Sources synchronization files created by this DOC_SYNC task)

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
Sync files can become stale if `by codex` does not update them after meaningful future work.

Open Issues
(what is not solved yet)
No automation exists yet to generate these files from Project Brain; they are manually maintained sync summaries.

Next Required Action
(what should happen next)
Update these sync files during every successful closeout when current state, delta, agents, tasks, or authority information changes.

Authority
(who/what is allowed to define this truth)
Project Brain remains authority; sync files are compact mirrors for ChatGPT Project Sources.

Current Commit State
(whether this delta is committed)
Project sync documentation is committed in the latest DOC_SYNC Git commit.
