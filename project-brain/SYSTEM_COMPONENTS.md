# SYSTEM COMPONENTS

## AppSheet Tables

### ServiceReports
Main service report table.
Critical fields:
- ReportID
- ReportCounter
- סטטוס דוח
- CustomerID
- שם לקוח
- ClientSign
- SignedHtmlFileUrl
- BusinessDraftCreated
- MavenDocumentCreated
- MavenSentToCustomer

### ReportEquipmentItems
Equipment/items inside service reports.

### Customers
Customer master data and folder matching source.

### AIDraftSuggestions
AI suggestions before business document creation.

### BusinessDocuments
Internal business document draft table.

### BusinessDocumentItems
Line items for business documents.

### AutomationCommands
Queue table for safe automation execution.

### BusinessDocumentLog
Execution and audit log.

### InvoiceMavenDocuments
Historical Maven documents.

### InvoiceMavenDocumentItems
Historical Maven document line items.

---

## Apps Script Modules

### Service Report Flow
- assignReportCounter
- saveSignedHtmlFile
- servePublicReport
- getReportData
- saveClientSignature

### Business Document Flow
- createMavenDraft
- doPost
- processAutomationCommand

### Maven Sync
- syncMavenDocuments
- syncMavenDocumentItems

---

## Google Drive

### Customer folders
Each customer should have one folder only.

### HTML reports
Each ReportID should have one active HTML file.

---

## AppSheet Bots / Automations

Critical bots:
- Service report creation / update
- Signature save flow
- AutomationCommands webhook bot
- BusinessDocuments draft request flow

---

## External Systems

### Maven
Document engine for draft creation and historical documents.

### Git
Source of truth for project code and project brain.

### Codex
Development agent inside VS Code.