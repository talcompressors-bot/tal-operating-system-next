# SYSTEM HEALTH AGENT PLAN

## Purpose

Build a safe System Health Agent for ServiceApp_FIX.

The agent must detect regressions, broken flows, missing files, stuck automations, duplicate records, and system drift.

Initial version must be read-only.

No production data should be changed by the first version.

---

## Operating Rule

The agent runs in three modes:

1. Manual Check
2. Scheduled Read-Only Check
3. Future TEST Simulation Check

Production repair actions are not allowed without Liad approval.

---

## Schedule Goal

Future scheduled runs:

- Morning check: 08:00
- Night check: 00:00

Timezone:

- Asia/Jerusalem

---

# Phase 1 — Read-Only Health Check

## Scope

Phase 1 only reads:

- Google Sheets
- Drive metadata
- Apps Script logs if available
- Project Brain files
- Git status if run locally

It does not:

- create reports
- edit reports
- create Maven documents
- run AppSheet bots
- send emails
- modify customer folders
- modify existing Drive files

---

# Health Checks

## HC-001 Signed Reports Missing HTML URL

Table:
ServiceReports

Condition:
סטטוס דוח = חתום
AND SignedHtmlFileUrl is empty

Severity:
CRITICAL

Example regression:
ReportID 242d75e8
ReportCounter 5852

Expected:
Signed reports must always have SignedHtmlFileUrl.

---

## HC-002 Signed Reports Missing Signature

Table:
ServiceReports

Condition:
סטטוס דוח = חתום
AND ClientSign is empty

Severity:
CRITICAL

Expected:
Signed status requires customer signature.

---

## HC-003 Signature Exists But Status Not Signed

Table:
ServiceReports

Condition:
ClientSign is not empty
AND סטטוס דוח is not חתום

Severity:
WARNING

Expected:
Customer signature should update report status to חתום.

---

## HC-004 Missing ReportCounter

Table:
ServiceReports

Condition:
ReportCounter is empty

Severity:
CRITICAL

Expected:
Every real report must have a ReportCounter.

---

## HC-005 Duplicate ReportCounter

Table:
ServiceReports

Condition:
Same ReportCounter appears in more than one active report

Severity:
CRITICAL

Expected:
ReportCounter must be unique.

---

## HC-006 Duplicate ReportID

Table:
ServiceReports

Condition:
Same ReportID appears more than once

Severity:
CRITICAL

Expected:
ReportID must be unique.

---

## HC-007 Broken SignedHtmlFileUrl

Table:
ServiceReports

Condition:
SignedHtmlFileUrl exists
BUT Drive file cannot be opened or found

Severity:
CRITICAL

Expected:
Every SignedHtmlFileUrl must point to an existing Drive file.

---

## HC-008 Duplicate HTML Files For Same ReportID

Source:
Google Drive

Condition:
More than one active HTML file exists for same ReportID

Severity:
CRITICAL

Expected:
Each ReportID should have one active HTML file.

---

## HC-009 Duplicate Customer Folders

Source:
Google Drive / Customers

Condition:
More than one folder exists for same customer name or customer ID

Severity:
WARNING / CRITICAL

Expected:
Each customer should have one active customer folder.

---

## HC-010 Service Report Link Field Drift

Table:
ServiceReports

Condition:
Expected file link columns missing or renamed

Fields to verify:
- SignedHtmlFileUrl
- קישור PDF
- ClientSign
- סטטוס דוח
- ReportID
- ReportCounter

Severity:
CRITICAL

Expected:
Critical columns must exist exactly as expected.

---

## HC-011 AutomationCommands Stuck Pending

Table:
AutomationCommands

Condition:
Status = Pending longer than 30 minutes

Severity:
CRITICAL

Expected:
Pending commands should be processed or cancelled.

---

## HC-012 AutomationCommands Stuck Running

Table:
AutomationCommands

Condition:
Status = Running longer than 30 minutes

Severity:
CRITICAL

Expected:
Running commands should complete, fail, or cancel.

---

## HC-013 Duplicate Command Processing

Table:
AutomationCommands / BusinessDocumentLog

Condition:
Same AutomationCommandId processed more than once without idempotency marker

Severity:
CRITICAL

Expected:
Each command is processed once.

---

## HC-014 BusinessDocuments Stuck Draft Request

Table:
BusinessDocuments

Condition:
DocumentStatus in:
- CreateDraftRequested
- DraftRequestReceived
for longer than 30 minutes

Severity:
CRITICAL

Expected:
Draft requests should continue to queue/process.

---

## HC-015 Duplicate Maven Draft

Table:
BusinessDocuments

Condition:
Same BusinessDocumentId has more than one MavenDocumentId or duplicate Maven draft evidence

Severity:
CRITICAL

Expected:
One business document creates one Maven draft only.

---

## HC-016 Missing BusinessDocumentItems

Table:
BusinessDocuments / BusinessDocumentItems

Condition:
BusinessDocuments requiring items have zero BusinessDocumentItems

Severity:
WARNING

Expected:
Business documents should have line items unless explicitly marked as text-only or known gap.

---

## HC-017 BusinessDocumentLog Errors

Table:
BusinessDocumentLog

Condition:
Log entries from last 24 hours contain:
- ERROR
- FAILED
- EXCEPTION

Severity:
CRITICAL

Expected:
No new critical errors.

---

## HC-018 Maven Sync Rate Limit State

Tables:
SyncState / InvoiceMavenDocuments / InvoiceMavenDocumentItems

Condition:
DocumentsLastPage changes unexpectedly
OR sync continues while blocked
OR known Maven API status_code=27 repeats

Severity:
CRITICAL

Expected:
Maven sync should not hammer API when rate-limited.

---

## HC-019 Maven Historical Data Completeness

Tables:
InvoiceMavenDocuments
InvoiceMavenDocumentItems

Condition:
Large unexpected increase in documents without items

Severity:
WARNING

Expected:
Documents/items ratio should not suddenly drift.

---

## HC-020 AppSheet Bot Indirect Health

Source:
Tables affected by bots

Condition:
Expected result of a bot does not appear after source action.

Examples:
- New AutomationCommands row not created after draft request
- ServiceReports not updated after draft creation
- SignedHtmlFileUrl not populated after signature

Severity:
CRITICAL

Expected:
Bot outputs must be visible in tables.

---

# Required Output

Every run must produce a Health Check Summary.

## Summary format

- Run timestamp
- Total checks
- Passed checks
- Warning count
- Critical count
- Failed checks
- Related IDs
- Recommended action

---

# SystemHealthLog Table

Create later in Google Sheet.

Do not create before approval.

## Columns

- HealthCheckId
- RunTimestamp
- CheckName
- Status
- Severity
- RelatedTable
- RelatedId
- Details
- RecommendedAction
- Resolved
- ResolvedAt
- ResolvedBy

---

# Apps Script File Plan

Future file:

SystemHealthAgent.gs

## Planned functions

- runSystemHealthCheck()
- checkSignedReportsMissingHtmlUrl()
- checkSignedReportsMissingSignature()
- checkDuplicateReportCounters()
- checkDuplicateReportIds()
- checkBrokenDriveLinks()
- checkDuplicateCustomerFolders()
- checkDuplicateReportHtmlFiles()
- checkAutomationCommandsStuck()
- checkBusinessDocumentsStuck()
- checkBusinessDocumentLogErrors()
- checkMavenSyncHealth()
- writeSystemHealthLog()
- sendHealthAlertIfNeeded()

---

# Alert Rules

Send alert only if:

- at least one CRITICAL issue exists
- or more than 5 WARNING issues exist

Alert channels to decide later:

- Email
- AppSheet dashboard
- Google Sheet log
- WhatsApp later, only if approved

---

# Phase 2 — Scheduled Read-Only Agent

After Phase 1 manual run is approved:

Create Apps Script time triggers:

- 08:00 Asia/Jerusalem
- 00:00 Asia/Jerusalem

The scheduled agent must remain read-only except writing to SystemHealthLog.

---

# Phase 3 — TEST Simulation Agent

Only after approval.

Use TEST data only.

Potential test:

1. Create test service report
2. Add test signature
3. Verify status becomes חתום
4. Verify SignedHtmlFileUrl is created
5. Verify Drive file exists
6. Verify no duplicate file/folder
7. Delete or archive test data if approved

Production customer data must not be changed.

---

# Phase 4 — Repair Suggestions

The agent may suggest repairs.

It must not perform repairs automatically.

Examples:

- Re-run saveSignedHtmlFile(reportId)
- Cancel stuck AutomationCommand
- mark known duplicate folder for review
- reprocess BusinessDocument queue item

All repairs require Liad approval.

---

# Success Criteria

Version 1 succeeds if it can detect:

- signed report without SignedHtmlFileUrl
- duplicate ReportCounter
- stuck AutomationCommand
- broken Drive file link
- duplicate customer folder
- BusinessDocument stuck in draft request
- new BusinessDocumentLog errors

Version 1 must not modify production data except SystemHealthLog after approval.