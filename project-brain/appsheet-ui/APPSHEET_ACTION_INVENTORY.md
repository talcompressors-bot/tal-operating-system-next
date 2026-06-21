# APPSHEET ACTION INVENTORY

Last updated: 2026-06-21
Discovery mode: metadata-first, runtime crawling blocked by AppSheet licensing

| Action | Related Table | Purpose | Source Evidence | Status | Safety Classification | Next.js Equivalent | Notes |
|---|---|---|---|---|---|---|---|
| Create New Report | ServiceReports | Create a new service report | `SYSTEM_MAP.md` | METADATA_NEEDED | WRITE_ACTION | `/service-reports/new` | Must preserve ReportID/ReportCounter rules |
| Save Report To Drive | ServiceReports | Save/update report file in Drive | `SYSTEM_MAP.md`, `CURRENT_BUGS.md` | ACTIVE_WITH_BUG | DRIVE_WRITE | Explicit approval before rebuilding |
| Generate PDF | ServiceReports | Generate report PDF/output | `SYSTEM_MAP.md` | METADATA_NEEDED | OUTPUT_WRITE | Future output verification needed |
| Send Report Email | ServiceReports | Send report email | `SYSTEM_MAP.md`, `EmailSender.js` | ACTIVE_CONFIRMED | CUSTOMER_FACING_SEND | Must remain approval-gated |
| Create Draft Request | BusinessDocuments | Create business document draft request | `SYSTEM_MAP.md` | METADATA_NEEDED | WRITE_ACTION | `/business-documents/new` | Exact AppSheet action unknown |
| Create AutomationCommand | AutomationCommands | Queue backend execution | `SYSTEM_MAP.md`, `MavenAPI.js` | ACTIVE_CRITICAL | QUEUE_WRITE | Internal API route after approval | Do not bypass queue architecture |
| Approve Draft | BusinessDocuments | User approval for draft | `SYSTEM_MAP.md`, `AI_DRAFT_FLOW_MAP.md` | METADATA_NEEDED | APPROVAL_ACTION | `/business-documents/[id]/approve` | Must log approval evidence |
| Send Draft | BusinessDocuments | Send approved document | `SYSTEM_MAP.md` | METADATA_NEEDED | CUSTOMER_FACING_SEND | Future route/action | Do not implement before approval |
| Queue Processing | AutomationCommands | Process queued command | `SYSTEM_MAP.md`, `MavenAPI.js` | ACTIVE_CONFIRMED | BACKEND_EXECUTION | Worker/API handler | Existing Apps Script owner |
| Status Updates | AutomationCommands | Update command status | `SYSTEM_MAP.md`, `MavenAPI.js` | ACTIVE_CONFIRMED | STATUS_WRITE | Backend status handler | Keep idempotent |
| UNKNOWN AppSheet actions | UNKNOWN | Full action export unavailable | Runtime blocked | UNKNOWN | UNKNOWN | UNKNOWN | Export AppSheet metadata next |

