# CURRENT TASK

## Date

2026-06-14

## Active Area

Service Report 5840 equipment mismatch

## Current Status

Resolved.

---

## Report 5840 Incident

- Report 5840 incident resolved.
- Manual data correction completed on `ReportEquipmentItems` row 83.
- Verified reports 5839, 5840, and 5841 are correct after the fix.
- Code fix committed as `52f8472`: `Fix report equipment matching by ReportID only`.

---

## Root Cause

The incident involved a combination of:

- Unsafe fallback equipment matching logic in `getReportData()`.
- Incorrect backend data found in `ReportEquipmentItems` row 83.

Both issues were addressed:

- Code fixed in commit `52f8472`.
- Data corrected manually.

`ReportEquipmentItems` must be matched to `ServiceReports` only by exact `ReportID`.

---

## Verified

- Report 5839 renders the correct equipment.
- Report 5840 renders the corrected equipment after manual row 83 data correction.
- Report 5841 renders its own equipment and is not mixed into report 5840.
- `פתח דוח` WebApp reads raw `ReportEquipmentItems` backend rows directly from Google Sheets.
- AppSheet UI may not expose every backend value visible to the WebApp.

---

## Stable Systems

- AutomationCommands Queue Architecture is stable.
- BusinessDocuments -> AutomationCommands -> Bot -> Apps Script -> Maven flow previously worked.
- Queue architecture prevents duplicate Bot executions.
- BusinessDocument-level idempotency guard added in commit `585ef51a02ae8709cb1c4ccd0e39967d39a9bd29`.
- ProcessingCommandId is not auto-cleared on Error; manual recovery is required if a command fails after claim.

---

## Next Step

1. Commit documentation update after review.
2. Push local commits to origin after approval.

---

## Session Handoff Notes

When a mismatch appears between AppSheet and `פתח דוח`, compare AppSheet UI, Google Sheet raw rows, and WebApp output separately.
