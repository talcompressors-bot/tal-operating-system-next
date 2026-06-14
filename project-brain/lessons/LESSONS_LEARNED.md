# LESSONS LEARNED

## Queue Architecture

Problem:

BusinessDocuments and Apps Script updated the same records.

Result:

Multiple executions.
Duplicate Maven drafts.
Status conflicts.

Solution:

Use AutomationCommands queue table.

Rule:

Never allow Bot and Apps Script to update the same row simultaneously.

---

## Debugging Strategy

Problem:

Too many architectural changes before understanding the root cause.

Solution:

Analyze first.
Isolate the problem.
Change one thing at a time.

Rule:

Never rewrite a working flow before proving the root cause.

---

## Service Reports

Problem:

Drive save flow created duplicate folders and files.

Solution:

Use stable identifiers.

Rule:

Always identify customer folder and report file before creating new ones.

---

## Service Report Equipment Matching

Problem:

Report 5840 rendered wrong equipment in `פתח דוח`.

Root cause:

The incident involved a combination of unsafe fallback equipment matching logic in `getReportData()` and incorrect backend data in `ReportEquipmentItems` row 83.

Solution:

Code was fixed in commit `52f8472`, and the backend data was corrected manually.

Rule:

Equipment matching in `getReportData()` must use exact `ReportID` only, never `ReportCounter` / `מספר דוח` fallbacks.

---

## AppSheet vs WebApp Data Mismatch

Problem:

AppSheet UI did not show the same equipment values that appeared when clicking `פתח דוח`.

Root cause:

The WebApp `פתח דוח` reads raw `ReportEquipmentItems` backend rows directly, while AppSheet UI may not expose all backend values.

Solution:

Compare each data surface separately before deciding which layer is wrong.

Rule:

When mismatch appears, compare AppSheet UI, Google Sheet raw rows, and WebApp output separately.

---

## Maven Sync

Problem:

Sync got stuck around document item import.

Solution:

Investigate incrementally.

Rule:

Do not rewrite sync from scratch.

---

## GitHub

Problem:

Project knowledge was spread across many chats.

Solution:

Project Brain repository.

Rule:

Every major decision must be documented.

---

## Deployment

Rule:

No production deployment without checkpoint and backup.
