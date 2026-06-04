# SYSTEM MAP

## AppSheet

Tables

- ServiceReports
- ReportEquipmentItems
- Customers_Final
- InspectionItems
- PartsUsed
- EmailLog
- BusinessDocuments
- BusinessDocumentItems
- BusinessDocumentLog
- AutomationCommands
- ProductsCatalog
- InvoiceMavenDocuments
- InvoiceMavenDocumentItems
- SyncState
- SyncLog

---

## Automation Flow

Service Report

↓

BusinessDocuments

↓

AutomationCommands

↓

AppSheet Bot

↓

Apps Script Webhook

↓

Maven Draft

---

## Apps Script Files

ServiceReports.gs

Purpose:
Service report handling.

---

MavenAPI.gs

Purpose:
Maven synchronization and draft creation.

---

EmailSender.gs

Purpose:
Email sending.

---

Report.html

Purpose:
Service report rendering and PDF generation.

---

## Google Drive Structure

Customer Folder

└── Service Reports

└── PDFs

└── Signatures

---

## Critical Rule

Never allow:

AppSheet Bot
and
Apps Script

to update the same record simultaneously.

Always use:

AutomationCommands Queue.
