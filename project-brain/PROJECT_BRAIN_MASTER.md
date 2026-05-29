# PROJECT BRAIN MASTER

## Project Overview

## Current Architecture

## AppSheet Structure

## Apps Script Structure

## Service Report System

## BusinessDocuments Workflow

## AutomationCommands Queue Architecture

## Maven Integration

## InvoiceMaven Future Integration

## Expense Invoice Automation

## Drive Save Logic

## Customer Folder Logic

## Report Counter Logic

## AI Draft Generation Logic

## Stable Checkpoints

## Known Bugs

## Lessons Learned

## Future Roadmap

## Change Log
# PROJECT BRAIN MASTER

## Project Overview

מערכת ניהול דוחות שירות, אוטומציות עסקיות, AI, AppSheet, Apps Script, Google Drive, Maven ו-Invoice4u.

מטרה:
לייצר מערכת אחת מרכזית המנהלת:
- דוחות שירות
- הצעות מחיר
- חשבוניות
- הוצאות
- אוטומציות
- מסמכים
- AI Recommendations

---

## Current Architecture

AppSheet
↓
Google Sheets
↓
Apps Script
↓
Business Logic
↓
Maven API
↓
Invoice4u API (Future)

---

## Service Report System

### Current Status

- HTML Report System פעיל
- Web App פעיל
- Signature System פעיל
- Report Data Loading פעיל
- Multi Equipment Support פעיל

### Known Open Tasks

- A4 Print Layout
- Page Break Logic
- PDF Export Improvements
- Signature Storage Improvements
- Drive Save Improvements

---

## AppSheet Structure

### Main Tables

- ServiceReports
- ReportEquipmentItems
- Customers_Final
- Lists
- InspectionItems
- PartsUsed
- EmailLog

---

## Apps Script Structure

### Main Functions

- getReportData()
- saveReportToDrive()
- sendReportEmail()
- createMavenDraft()

---

## BusinessDocuments Workflow

Current Working Flow:

BusinessDocuments
↓
AutomationCommands
↓
Bot
↓
Apps Script
↓
Maven Draft

Status:

Pending
↓
Running
↓
Completed

---

## AutomationCommands Queue Architecture

Purpose:

Prevent duplicate Bot executions.

Current Status:

Stable Working Checkpoint

---

## Maven Integration

Current Status:

Working

Known Rule:

Never create Maven documents without user approval.

---

## Invoice4u Future Integration

Planned:

- Quotes
- Invoices
- Credit Notes
- Expense Documents

Approval Required Before Creation.

---

## Expense Invoice Automation

Planned Flow:

PDF/Image
↓
OCR
↓
AI Extraction
↓
User Approval
↓
Invoice4u

Required Fields:

- SupplierName
- InvoiceNumber
- InvoiceDate
- DueDate
- TotalAmount
- VAT
- PaymentStatus

---

## Drive Save Logic

Known Issues:

1. Duplicate customer folders
2. Duplicate report files
3. Save report not always updating existing file

Needs investigation.

---

## Customer Folder Logic

Goal:

One customer folder only.

Never create duplicate folders.

---

## Report Counter Logic

Current Target:

Stable unique numbering.

Known Issue:

Duplicate numbering around report 5835.

---

## AI Draft Generation Logic

Priority:

1. ProductsCatalog
2. Same Equipment History
3. Same Customer History
4. Similar Customers
5. AI Recommendation

Fixed Pricing:

- Technician Hour = 275 NIS
- Visit = 300 NIS

---

## Stable Checkpoints

### Checkpoint 2026-05-25

AutomationCommands Queue Architecture Working.

BusinessDocuments
→ AutomationCommands
→ Bot
→ Apps Script
→ Maven

No duplicate executions.

---

## Known Bugs

### Bug 1

Drive save creates duplicate customer folders.

### Bug 2

Drive save creates duplicate report files.

### Bug 3

Report counter synchronization issue.

---

## Lessons Learned

### AppSheet

Never allow Bot and Apps Script to update same row simultaneously.

### Apps Script

Prefer queue architecture.

### Debugging

Always isolate logic before changing architecture.

---

## Future Roadmap

Phase 1

Stabilize Service Report System

Phase 2

AI Draft Generation

Phase 3

Invoice4u Integration

Phase 4

Expense Automation

Phase 5

Business AI Assistant

---

## Change Log

### 2026-05-29

Created Project Brain Master.
GitHub repository connected.
Project Brain initialized.