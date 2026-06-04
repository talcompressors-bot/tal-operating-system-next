# APPSHEET MAP

## Core Application

App Name:
Editing דוחות שירות

Production Sheet:
ServiceApp_FIX

---

## Main Tables

### ServiceReports

Purpose:
Main service report header table.

Key:
ReportID

Important Fields:
- ReportCounter
- CustomerID
- CustomerName
- Status
- Technician
- ServiceType

---

### ReportEquipmentItems

Purpose:
Equipment linked to service report.

Key:
ReportEquipmentItemID

---

### PartsUsed

Purpose:
Parts used during service.

---

### Customers_Final

Purpose:
Customer master table.

---

### BusinessDocuments

Purpose:
AI and business document staging table.

---

### BusinessDocumentItems

Purpose:
Items belonging to BusinessDocuments.

---

### AutomationCommands

Purpose:
Queue architecture table.

Status Flow:

Pending
↓
Running
↓
Completed

---

### InvoiceMavenDocuments

Purpose:
Imported Maven documents.

---

### InvoiceMavenDocumentItems

Purpose:
Imported Maven document items.

---

### SyncState

Purpose:
Store sync checkpoints.

---

### SyncLog

Purpose:
Sync history.

---

### ErrorLog

Purpose:
Error tracking.

---

## Critical Architecture

BusinessDocuments
↓
AutomationCommands
↓
Bot
↓
Apps Script
↓
Maven Draft

---

## Golden Rule

Never allow:

AppSheet Bot
and
Apps Script

to update the same row simultaneously.
