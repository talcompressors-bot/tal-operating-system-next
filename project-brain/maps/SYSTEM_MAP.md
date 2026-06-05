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

##AppSheet Actions

Service Reports

- Create New Report
- Save Report To Drive
- Generate PDF
- Send Report Email

Business Documents

- Create Draft Request
- Create AutomationCommand
- Approve Draft
- Send Draft

Automation Commands

- Queue Processing
- Status Updates
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

AppSheet Bots

AutomationCommands Bot

Trigger:

New AutomationCommands row

Action:

Call Apps Script Webhook

Purpose:

Process queue safely and avoid duplicate execution.

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
## Apps Script Flow

AppSheet Bot
↓
Apps Script Webhook
↓
Command Validation
↓
Business Logic
↓
Maven API
↓
Status Update
↓
Queue Completion


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

##Current Stable Checkpoint

Version:

Editing דוחות שירות 1.000260

Verified Working:

BusinessDocuments
→ AutomationCommands
→ Bot
→ Apps Script
→ Maven Draft

Result:

Single execution.

No duplicate draft creation.

## Current Investigation

ReportCounter:

5824

Topic:

AI Draft Agent Workflow

Goal:

Service Report
→ AI Recommendation
→ BusinessDocuments
→ BusinessDocumentItems
→ User Approval
→ Maven Draft

Status:

In Progress

## AI Agent Flow

ServiceReports
↓
AI Draft Agent
↓
BusinessDocuments
↓
BusinessDocumentItems
↓
User Approval
↓
AutomationCommands
↓
Maven Draft
