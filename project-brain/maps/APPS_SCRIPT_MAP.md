# APPS SCRIPT MAP

## Project

Apps Script Project:
דוחות שירות HTML

Connected Sheet:
ServiceApp_FIX

---

## Main Files

### MavenAPI.js

Purpose:
Maven sync, AutomationCommands webhook, BusinessDocuments status update.

Important Functions:
- syncMavenDocuments()
- doPost(e)
- createMavenDraft(data)
- claimAutomationCommand(commandId)
- updateAutomationCommandStatus(commandId, status, result, errorMessage)
- backfillMavenDocumentItems()

Risk:
High

Rule:
Do not rewrite Maven sync from scratch.

---

### EmailSender.js

Purpose:
Send service report email to selected recipients.

Important Functions:
- sendReportEmail(reportId)

Risk:
Medium

---

### Report.html

Purpose:
Render service report HTML, signature pad, print/PDF view.

Risk:
Medium

---

### ServiceReports / Main Script

Purpose:
Load report data, save signature, save report HTML to Drive.

Important Functions:
- doGet(e)
- getReportData(reportId)
- saveClientSignature(reportId, signatureData)
- saveSignedHtmlFile(reportId)
- assignReportCounter(reportId)
- getCustomerNameById(customerId)

Risk:
High

Rule:
Do not change Drive save or ReportCounter logic without checkpoint and test.

---

## Critical Rules

- One change at a time.
- Test with one ReportID first.
- No production deploy without approval.
- Backup before changing stable functions.
