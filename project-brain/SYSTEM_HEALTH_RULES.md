# SYSTEM HEALTH RULES

## Critical Rule

No change is complete until Health Check passes.

---

## ServiceReports

CRITICAL FAIL if:
- Signed report has empty SignedHtmlFileUrl
- ReportCounter is missing
- ReportID is missing
- Duplicate ReportID exists
- Duplicate ReportCounter exists
- Status is חתום but ClientSign is empty
- ClientSign exists but status is not חתום
- HTML file link exists but Drive file cannot be opened

WARNING if:
- CustomerID missing
- Customer name missing
- Technician missing
- Service date missing

PASS if:
- ReportID exists
- ReportCounter exists
- status is correct
- signature exists when signed
- SignedHtmlFileUrl exists when signed
- Drive file opens

---

## Drive

CRITICAL FAIL if:
- More than one customer folder exists for same customer
- More than one active HTML file exists for same ReportID
- SignedHtmlFileUrl points to missing file

PASS if:
- Customer folder exists
- HTML file exists
- no duplicate folder
- no duplicate report file

---

## AutomationCommands

CRITICAL FAIL if:
- Status Running longer than 30 minutes
- Status Pending longer than 30 minutes
- Same command creates duplicate Maven document

PASS if:
- Pending becomes Running
- Running becomes Completed or Cancelled
- each command processed once

---

## BusinessDocuments

CRITICAL FAIL if:
- CreateDraftRequested stays unchanged
- DraftRequestReceived does not continue
- MavenDocumentId duplicated
- Maven draft created twice

WARNING if:
- BusinessDocumentItems missing when document should have items

---

## Maven Sync

CRITICAL FAIL if:
- SyncState changed without approval
- DocumentsLastPage changed without approval
- sync runs uncontrolled after Maven rate-limit

---

## Apps Script

CRITICAL FAIL if:
- New failed executions in last 24 hours
- doPost errors
- saveSignedHtmlFile errors
- createMavenDraft errors