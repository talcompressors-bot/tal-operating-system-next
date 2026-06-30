# PROJECT SYNC STATE

Purpose
(compact current-state summary for ChatGPT Project Sources and future agents; Project Brain remains the detailed authority)

## Current Project State
(where the project is now and what work is active)

Current Mode
(the operating mode that controls what work should happen now)
`CAPABILITY_BUILDING`

Governance Status
(whether governance can be expanded freely)
`FROZEN`

TDOS Status
(whether the operating protocol can be redesigned freely)
`FROZEN / Maintenance Mode`

Current Wave
(the active capability area)
Wave 3 Commercial Runtime and Document Engine.

Current Task
(the task most recently implemented or reviewed)
Project Sources synchronization layer is committed in the DOC_SYNC Git commit; Production Draft Generation maintenance quality fix remains implemented locally and uncommitted.

Current Business Goal
(what TAL gains from the active work)
Convert service reports into accurate, reviewable internal business-document drafts while keeping all external/customer/financial actions gated.

Current Runtime Capability
(what works now inside the shadow ERP)
Internal ServiceReport -> BusinessCase -> BusinessDocument draft generation exists through the protected Draft Gateway.

Latest Local Delta
(what changed since the last committed baseline)
Maintenance reports now detect Small Service and Large Service and keep standard maintenance parts visible as review-required lines when exact part/price evidence is incomplete.

Latest Committed Git Baseline
(the latest commit before these local sync/runtime changes)
`0c41155 Record dev server ownership rule`

Last Recorded Implementation Commit
(the last meaningful implementation commit recorded in Project Brain)
`5313aec Improve autonomous business draft generation`

Last Recorded Closeout Commit
(the last meaningful closeout/state-sync commit recorded in Project Brain)
`b5c5418 Sync project brain after operations command center`

Project Completion
(capability-weighted estimate from Project Brain, not wave-count math)
81%.

## Current Evidence
(the proof supporting the current state)

Validated ServiceReport
(the report used to prove the latest maintenance-draft behavior)
ReportCounter `5807`, ReportId `2bfc0748`.

Detected Maintenance Type
(the service classification produced by the generator)
`Small Service`.

Generated Maintenance Lines
(the lines now visible instead of hidden)
Air Filter, Oil Filter, 3L SKR oil top-up, Technician Visit / Travel, Labor + Service.

Major Maintenance Spot Check
(second report used to confirm 4000/5000 behavior)
ReportCounter `5864`, ReportId `acd1133d`, detected `Large Service`, added Oil Separator as `Needs Price Review`.

Side-Effect Check
(proof no external/internal forbidden mutation happened during validation)
BusinessDocuments `10`, BusinessDocumentItems `21`, AutomationCommands `1`, InventoryTransactions `0`, EmailLogs `0`.

Known Existing TypeScript Gap
(pre-existing blocker outside the latest touched files)
Full `tsc` still fails in `app/ai-drafts/ai-draft-adapter.ts` pricing-evidence typing; focused touched-file TypeScript passed.

## Project Tree
(capability map from the canonical Project Index)

Wave 1 Party, Asset, and Service Operations Core
(service-report/customer/equipment read foundation)
Complete.

Wave 2 BusinessCase and Service Workflow Layer
(internal workflow from service context to draft/approval/queue dry-run)
Complete.

Wave 3 Commercial Runtime and Document Engine
(business-document generation, review, preview, PDF, commercial runtime)
Started internal; active.

Wave 4 Financial Runtime and Settlement
(financial intake, payment/receipt/tax-invoice runtime)
Started internal at 1%.

Waves 5-9
(inventory/procurement, automation adapters, offline field runtime, production shadow, cutover)
Pending.

## Next Action
(what should happen after the current state)

Recommended Next Task
(the next safe/context capability unless Liad selects another draft-quality fix)
Asset Workspace / Asset Timeline.

Next Approval Gate
(what must stop for explicit human approval)
Schema changes, DB writes/imports outside existing protected flows, Maven/Invoice4U, email/customer actions, inventory mutation, source-system/cloud/production actions, package installs, deletes/moves, or git remote changes.

Do Not Touch Without Approval
(protected systems)
Google Sheets, AppSheet, Apps Script, Maven, Invoice4U, Drive writes, email/customer sends, inventory state, Prisma schema/migrations, Supabase settings/data writes, production deployment/cutover.
