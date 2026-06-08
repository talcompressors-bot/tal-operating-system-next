# CURRENT TASK

## Date

2026-06-05

## Active Area

AI Draft Generation

## Active Report

ReportCounter: 5824

ReportId: Unknown  
BusinessDocumentId: Unknown  
AutomationCommandId: Unknown  

---

## Current Flow Under Investigation

ServiceReports  
→ BusinessDocuments  
→ AutomationCommands  
→ Apps Script  
→ Maven Draft  

---

## Current Status

Investigation Active

---

## Known Stable Systems

- AutomationCommands Queue Architecture is stable.
- BusinessDocuments → AutomationCommands → Bot → Apps Script → Maven flow previously worked.
- Queue architecture prevents duplicate Bot executions.
- BusinessDocument-level idempotency guard added in commit 585ef51a02ae8709cb1c4ccd0e39967d39a9bd29.
- Added ProcessingCommandId and ProcessingStartedAt columns.
- Duplicate AutomationCommands for the same BusinessDocumentId are skipped.
- ProcessingCommandId is not auto-cleared on Error; manual recovery is required if a command fails after claim.

---

## Current Issue

We were investigating creation of a draft business document from Service Report 5824.

Exact failure point is not fully recovered yet.

---

## Tested / Known So Far

- Queue architecture is the preferred safe flow.
- Bot and Apps Script must not update the same BusinessDocuments row at the same time.
- User identified ReportCounter 5824 as the active report for this investigation.
- Maven queue flow now has BusinessDocument-level idempotency in addition to CommandID-level claim protection.

---

## Unknown / Need To Recover

- Related BusinessDocumentId
- Related AutomationCommandId
- Last command status
- Last Apps Script log
- Maven response
- Whether createMavenDraft was called successfully

---

## Current Hypothesis

The next step should be to locate the BusinessDocuments and AutomationCommands rows related to ReportCounter 5824, then continue debugging from the exact status/logs.

---

## Next Step

1. Locate BusinessDocuments row for ReportCounter 5824.
2. Locate related AutomationCommands row.
3. Check command status: Pending / Running / Completed / Error.
4. Check Apps Script execution log.
5. Verify createMavenDraft payload and Maven response.
6. If an Error occurred after ProcessingCommandId was written, manually verify side effects before clearing ProcessingCommandId or retrying with a different CommandID.

---

## Session Handoff Notes

When user says "שלום קודקס", read this file first before general checkpoints.

When user says "ביי קודקס", update this file before updating checkpoints, bugs, lessons, or roadmap.
