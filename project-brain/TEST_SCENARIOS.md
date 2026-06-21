# TEST SCENARIOS

## TEST-001 Create New Service Report

Steps:
1. Create new service report in AppSheet.
2. Save report.
3. Check ServiceReports row.

Expected:
- ReportID exists
- ReportCounter assigned
- no duplicate ReportCounter
- no duplicate ReportID

---

## TEST-002 Sign Service Report

Steps:
1. Open report.
2. Add customer signature.
3. Save signature.

Expected:
- ClientSign saved
- status becomes חתום
- SignedHtmlFileUrl created automatically
- Drive file exists
- AppSheet shows document icon

---

## TEST-003 Manual HTML Save Isolation

Steps:
1. Run saveSignedHtmlFile(reportId) manually.

Expected:
- Function returns Drive URL
- SignedHtmlFileUrl updates
- file exists in customer folder

Used for debugging:
If manual works but automatic fails, problem is in trigger/calling flow.

---

## TEST-004 Edit Existing Report

Steps:
1. Edit existing signed report.
2. Save again.

Expected:
- same ReportID
- same customer folder
- existing HTML updated
- no duplicate file
- no duplicate folder

---

## TEST-005 Business Draft Creation

Steps:
1. Request draft from BusinessDocuments/AppSheet.
2. Check AutomationCommands.
3. Check Maven draft.

Expected:
- one AutomationCommand
- command processed once
- one Maven draft only
- ServiceReports updated back

---

## TEST-006 AI Draft Flow

Expected:
- AIDraftSuggestions creates BusinessDocuments
- BusinessDocumentItems created or marked as missing known gap
- user approval required before Maven

---

## TEST-007 Daily Health Check

Expected:
- no signed reports without SignedHtmlFileUrl
- no stuck AutomationCommands
- no duplicate folders
- no duplicate report files
- no new Apps Script execution errors