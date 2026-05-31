# Current Bugs

This file tracks current open bugs before Cursor/Codex changes any code.

Rule:
Do not fix bugs before reading project-brain and identifying affected files.

# Current Bugs

This file tracks current open bugs before Cursor/Codex changes any code.

Rule:
Do not fix bugs before reading project-brain and identifying affected files.
Do not rewrite stable working flows.
One bug at a time.
Sandbox first, production only after approval.

---

## Bug 1 — New service report does not auto-save to customer Drive folder

Status: Open  
Area: AppSheet Automation / Apps Script / Google Drive  
Production affected: Yes  

### What happens
After creating a new service report, the report is not automatically saved into the customer folder in Drive.

### Expected behavior
After a new service report is created and has a valid ReportID and ReportCounter, the system should automatically create or update the report file in the correct customer Drive folder.

### Related systems
- ServiceReports
- AppSheet Bot: Save Service Report To Drive
- Apps Script createReportFile / saveSignedHtmlFile
- Google Drive customer folders
- CustomerFolderId
- ReportDriveFileId
- SignedHtmlFileUrl

### Suspected cause
Possible issue in one or more of:
- AppSheet Bot condition
- Webhook URL
- Missing ReportCounter timing
- CustomerFolderId lookup
- Drive save function
- Duplicate protection stopping the save
- Existing manual save flow works but auto flow is not enabled or not triggered correctly

### Do not break
- Manual Save to Drive
- Existing customer folder links
- Existing report file links
- ReportCounter assignment
- Report HTML rendering

### Cursor instruction
Analyze only first.
Do not modify code until a safe fix plan is approved.

---

## Bug 2 — Maven sync stuck at InvoiceMavenDocumentItems

Status: Open  
Area: Maven API / Apps Script / Google Sheets Sync  
Production affected: Yes  

### What happens
The Maven sync does not load all documents/items into the Google Sheet.
The process appears stuck around InvoiceMavenDocumentItems.
ErrorLog shows repeated Maven API errors from syncMavenDocuments.

### Expected behavior
The Maven sync should load all relevant Maven documents and document items into:
- InvoiceMavenDocuments
- InvoiceMavenDocumentItems
- InvoiceMavenItems
without stopping silently or looping on repeated API errors.

### Evidence
ErrorLog contains repeated rows:
- Source: Maven
- FunctionName: syncMavenDocuments
- ErrorMessage: Maven API error
- Status: Error

Latest visible error includes:
- Address unavailable / Exception error text

### Related systems
- MavenAPI.gs
- syncMavenDocuments
- InvoiceMavenDocuments
- InvoiceMavenDocumentItems
- InvoiceMavenItems
- ErrorLog
- SyncState
- SyncLog

### Suspected cause
Possible issue in one or more of:
- Maven API pagination
- API rate limit / timeout
- unexpected response structure
- one bad document/item blocking the loop
- missing retry handling
- missing checkpoint continuation
- sync state not advancing correctly
- item parsing error

### Do not break
- Existing documents already imported
- Existing item rows already imported
- SyncState
- ErrorLog
- Any working Maven draft creation flow

### Cursor instruction
Analyze only first.
Do not rewrite Maven sync from scratch.
Suggest the safest incremental fix plan.