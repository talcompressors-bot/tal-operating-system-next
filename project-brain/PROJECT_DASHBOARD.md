# PROJECT DASHBOARD

Last updated: 2026-06-21
Mode: documentation, discovery, read-only mapping

## Current Project Status

The repository is a Project Brain and Apps Script control repo for the Tal Compressors service-report automation system. Current production is the legacy stack: AppSheet, Google Sheets, Apps Script, Google Drive, Maven, and Gmail/email flows. Next.js is documented as a future target, but no Next.js application code was found in this repository.

Evidence:

- Current source of truth: `project-brain/current/CURRENT_TASK.md`
- Roadmap: `project-brain/roadmap/ROADMAP.md`
- System map: `project-brain/maps/SYSTEM_MAP.md`
- AppSheet map: `project-brain/maps/APPSHEET_MAP.md`
- Apps Script map: `project-brain/maps/APPS_SCRIPT_MAP.md`
- Live sheet registry snapshot: `data-sources/tools/SHEETS_REGISTRY.md`

## Current Active Phase

Documented active phase: `PHASE 1 - Digital Twin Foundation`.

Current task: start Digital Twin Foundation as a read-only mapping phase.

This mission adds a project control map and AppSheet UI discovery scaffolding. It does not authorize production logic changes, Apps Script deployment, AppSheet edits, Maven calls, Drive changes, or Google Sheets writes.

## Phase Status

| Phase | Status | Evidence | Notes |
|---|---|---|---|
| Phase 1: AI Service Reports -> Draft Documents | PARTIAL | `AI_DRAFT_FLOW_MAP.md`, `AI_DRAFT_RUNTIME_BLUEPRINT.md`, `apps-script/AIDraftHistory.js`, `apps-script/MavenAPI.js` | Read-only AI Draft preview exists. Queue claim/status flow exists. Full BusinessDocumentItems -> Maven payload -> real Maven draft creation is missing. |
| Phase 2: Automatic Receipts | PLANNING / MISSING | `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md` mentions receipts/payments in Finance Factory | No implemented receipt-specific flow, script, table contract, or AppSheet flow found. |
| Phase 3: AppSheet -> Next.js Migration | DISCOVERY / PLANNING | `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md`, `project-brain/roadmap/ROADMAP.md`, `project-brain/maps/APPSHEET_MAP.md` | AppSheet Digital Twin and Migration Blueprint are future phases. No Next.js app code found. Playwright discovery scaffolding added by this mission. |

## What Works Now

- AppSheet and Google Sheets are documented as the current UI/data layer.
- Service report tables and key columns are documented in `SHEETS_REGISTRY.md`.
- Service report rendering, signature, report counter, and Drive save logic exist in Apps Script.
- BusinessDocuments -> AutomationCommands -> AppSheet Bot -> Apps Script webhook -> internal draft-status update flow exists.
- Idempotent command claim and BusinessDocument claim logic exist in `apps-script/MavenAPI.js`.
- Maven historical document sync and item backfill functions exist.
- AI Draft read-only preview support exists in `apps-script/AIDraftHistory.js`.
- Governance docs, agents, roadmap, maps, bugs, lessons, and registries exist.

## What Is Missing

- Full AppSheet UX/view/action/bot export or verified UI inventory.
- Next.js application scaffold, routes, components, tests, or migration implementation.
- Real AI Draft write path from recommendation to approved BusinessDocuments/BusinessDocumentItems.
- Maven create-document payload builder and confirmed Maven create-draft API call.
- Maven result persistence back to BusinessDocuments and ServiceReports.
- Automatic receipts flow design and implementation.
- AppSheet -> Next.js screen-by-screen migration map based on live UI discovery.
- Complete cleanup of duplicate docs and obsolete historical files.

## Current Blockers

- Production systems are protected and require explicit approval before writes.
- AppSheet UI scan cannot run without `APPSHEET_APP_URL` and a valid logged-in browser/session.
- AppSheet-only actions, bots, slices, security filters, and UX views are not represented as code in this repo.
- Maven sync has an open bug around `InvoiceMavenDocumentItems`.
- Drive save auto-flow has an open production bug.
- Some docs contain mojibake/Hebrew encoding artifacts.
- Existing modified file not created by this mission: `project-brain/TEST_SCENARIOS.md`.

## Highest-Value Next Task

Run the read-only AppSheet UI discovery scanner with a valid `APPSHEET_APP_URL` and logged-in Playwright browser state, then update:

- `project-brain/appsheet-ui/playwright-discovery-report.json`
- `project-brain/appsheet-ui/APPSHEET_UI_INVENTORY.md`
- `project-brain/appsheet-ui/APPSHEET_TO_NEXT_SCREEN_MAP.md`

This unlocks the AppSheet -> Next.js migration map without touching production logic.

## Production-Critical Files

Do not change without explicit approval, impact analysis, rollback plan, and test plan:

- `apps-script/טופס HTML דוחות שירות.js`
- `apps-script/Report.html`
- `apps-script/MavenAPI.js`
- `apps-script/EmailSender.js`
- `apps-script/AIDraftHistory.js`
- `apps-script/SystemHealthSetup.js`
- `apps-script/SystemHealthRegistryValidation.js`
- `apps-script/SystemHealthLogValidation.js`
- `apps-script/appsscript.json`
- `data-sources/tools/SHEETS_REGISTRY.md`
- `project-brain/maps/APPSHEET_MAP.md`
- `project-brain/maps/APPS_SCRIPT_MAP.md`
- `project-brain/maps/SYSTEM_MAP.md`
- `project-brain/current/CURRENT_TASK.md`
- `project-brain/roadmap/ROADMAP.md`

