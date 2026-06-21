# APPSHEET BOT INVENTORY

Last updated: 2026-06-21
Discovery mode: metadata-first, runtime crawling blocked by AppSheet licensing

| Bot / Process / Task | Trigger | Related Table | Purpose | Source Evidence | Status | Next.js / Backend Equivalent | Notes |
|---|---|---|---|---|---|---|---|
| AutomationCommands Bot | New AutomationCommands row | AutomationCommands | Calls Apps Script webhook to process queue | `SYSTEM_MAP.md`, `PROJECT_BRAIN_MASTER.md`, `AI_DRAFT_FLOW_MAP.md` | ACTIVE_CONFIRMED | Queue worker/API handler | Critical stable flow |
| Save Service Report To Drive Bot | New/updated ServiceReports row | ServiceReports | Auto-save report to customer Drive folder | `CURRENT_BUGS.md` | ACTIVE_WITH_BUG / METADATA_NEEDED | Background job after explicit design | Open bug: new reports do not auto-save |
| Document Process task | UNKNOWN | UNKNOWN | AppSheet document process task | User-provided blocker | BLOCKED_BY_FREE_PLAN | UNKNOWN | Not allowed with FREE plan |
| UNKNOWN Bots | UNKNOWN | UNKNOWN | Full bot export unavailable | Runtime blocked | UNKNOWN | UNKNOWN | Need AppSheet metadata export |

## Required Metadata To Complete This File

- Bot names
- Events/triggers
- Processes
- Tasks
- Webhook URLs or task types
- Conditions
- Target tables
- Payload templates
- Enabled/deployed status
- Error handling behavior

