# BUILD STRATEGY

Created: 2026-06-21  
Status: Draft for approval  
Scope: Documentation only  
First module: Read-only Service Reports  
Rule: No code yet.

## Critical Safety Rule: Next.js Shadow Development

The current Next.js work must remain isolated and shadow/development only.

AppSheet remains production until Liad explicitly approves official migration.

Do not modify:

- `apps-script/*`
- AppSheet logic
- Google Sheets structure
- Maven integration
- existing report templates
- existing webhooks
- existing production workflows

Allowed Next.js shadow-development areas:

- `app/*`
- `prisma/*`
- `package.json`
- Next.js UI mock pages
- `project-brain/migration/*`

Forbidden unless Liad explicitly approves official migration work:

- changing existing Apps Script files
- changing existing report generation
- changing existing Maven sync
- changing live Google Sheets
- triggering AppSheet actions
- running Maven write actions
- replacing existing workflows

Goal: build the new Next.js system side-by-side while the existing AppSheet system remains production.

## Goal

Define the first working Next.js module as a narrow, read-only Service Reports module.

This module should prove the migration path with the lowest production risk:

- Import/read customers.
- Import/read service reports.
- Import/read service report equipment rows.
- Display report list and report detail screens.
- Do not create, edit, approve, send, sync, or write anything.

---

# 1. Build Order

## Step 1: Confirm Readiness Inputs

Required before implementation:

1. Approve the V1 Prisma subset for Service Reports.
2. Run or complete the live read-only audit for:
   - `Customers_Final`
   - `ServiceReports`
   - `ReportEquipmentItems`
3. Confirm source primary keys are usable:
   - `Customers_Final.CustomerID`
   - `ServiceReports.ReportID`
   - `ReportEquipmentItems.ItemID`
4. Confirm parent-child integrity:
   - `ServiceReports.CustomerID` -> `Customers_Final.CustomerID`
   - `ReportEquipmentItems.ReportID` -> `ServiceReports.ReportID`

## Step 2: Generate Minimal Prisma Schema

Use only the required V1 models:

1. `Customer`
2. `ServiceReport`
3. `ReportEquipmentItem`
4. `ServiceReportStatus`
5. `SourceSystem`

Do not include AI drafts, BusinessDocuments, Maven, inventory, automation commands, payments, or receipts in the first build unless needed by the approved implementation plan.

## Step 3: Create Read-Only Data Import Path

First import should be a safe shadow import into PostgreSQL:

1. Import `Customer` rows.
2. Import `ServiceReport` rows and link to customers.
3. Import `ReportEquipmentItem` rows and link to service reports.
4. Store full source row in `rawSource` for traceability.
5. Report invalid rows and legacy/test rows intentionally excluded from import instead of failing silently.

No source sheet writes.

## Step 4: Build Service Reports List Page

Create a read-only list page that supports:

1. Recent service reports.
2. Search by report number, customer name, technician, equipment type.
3. Filters for status/date/customer where data is available.
4. Clear empty/error/loading states.
5. Links to detail page.

## Step 5: Build Service Report Detail Page

Create a read-only detail page that shows:

1. Report identity and status.
2. Customer summary.
3. Service date/time and technician.
4. Service description, work performed, recommendations, technician summary.
5. Drive/PDF links where present.
6. Equipment items table.
7. Migration/source metadata panel.

## Step 6: Verify Against Source

Manual verification:

1. Pick 5-10 known service reports from source data.
2. Compare customer name, report number, date, status, and equipment rows.
3. Confirm no write actions exist in UI.
4. Confirm no Maven/AppSheet/Apps Script write path is reachable.

---

# 2. Required Tables

| Source Sheet | Purpose | Required For First Module | Notes |
|---|---|---|---|
| `Customers_Final` | Active customer master table | Yes | Root table for report customer display and filtering. |
| `ServiceReports` | Main service report table | Yes | Primary module table. |
| `ReportEquipmentItems` | Service report child equipment/items | Yes | Required for useful report detail screen. |
| `PartsUsed` | Parts used during service | No for first module | Keep out of first build until real schema is verified. |
| `EmailLog` | Email audit log | No for first module | Can be added later as read-only activity history. |
| `Lists` | Dropdown/reference values | Optional audit source only | Useful for status mapping, not required for first UI. |

---

# 3. Required Prisma Models

## Active First-Module Models

| Prisma Model | Source Sheet | Required Relations | Why Needed |
|---|---|---|---|
| `Customer` | `Customers_Final` | `Customer.serviceReports` | Shows customer name/contact context for each report. |
| `ServiceReport` | `ServiceReports` | `ServiceReport.customer`, `ServiceReport.equipmentItems` | Core list/detail record. |
| `ReportEquipmentItem` | `ReportEquipmentItems` | `ReportEquipmentItem.serviceReport` | Shows equipment/service rows for each report. |

## Required Enums

| Enum | Required For | Notes |
|---|---|---|
| `ServiceReportStatus` | `ServiceReport.status` | Source Hebrew values must map to canonical status or `UNKNOWN`. |
| `SourceSystem` | `Customer.sourceSystem` if included | Can default to `APPSHEET`. |

## Explicitly Excluded From First Module

| Model | Reason Excluded |
|---|---|
| `PartUsed` | Source schema is incomplete and marked flexible/import-tolerant. |
| `AiDraftSuggestion` | Not needed for read-only service report browsing. |
| `BusinessDocument` | Draft creation is not part of the first module. |
| `BusinessDocumentItem` | Not needed until draft/business-document screens. |
| `AutomationCommand` | No command queue execution in read-only module. |
| `MavenDocument` and Maven models | No Maven sync or document creation in first module. |
| `InventoryStock` and inventory models | No inventory workflow in first module. |
| `EmailLog` | Useful later, but not required for first working module. |
| `Payment`, `Receipt` | V2 only. |

---

# 4. Required Pages

## `/service-reports`

Purpose:

Read-only service report index.

Minimum fields:

- Report counter / report number
- Service date
- Customer name
- Technician
- Report type
- Equipment type
- Service type
- Status
- Business draft created flag

Required controls:

- Search input
- Status filter
- Date range filter
- Customer filter or customer search
- Pagination
- Link to detail page

Forbidden controls:

- Create report
- Edit report
- Delete report
- Send email
- Generate PDF
- Create AI draft
- Create Maven draft
- Approve document

## `/service-reports/[id]`

Purpose:

Read-only service report detail.

Sections:

1. Header: report number, status, service date, technician.
2. Customer: customer name, contact, phone, email, address where available.
3. Service details: report type, equipment type, service type, description, work performed.
4. Technician notes: summary, recommendations, work hours.
5. Files: signed HTML URL, Drive file ID/link fields where available.
6. Equipment items: child rows from `ReportEquipmentItem`.
7. Source metadata: AppSheet report ID, raw source availability, created/updated timestamps.

Forbidden controls:

- Edit report
- Save report
- Send report
- Sign report
- Create draft document
- Trigger Maven
- Trigger Apps Script

## Optional Later Page: `/customers/[id]/service-reports`

Purpose:

Customer-specific report history.

Status:

Backlog. Not required for first working module.

---

# 5. Success Criteria

The first module is successful when all criteria below are true:

## Data Criteria

1. `Customer`, `ServiceReport`, and `ReportEquipmentItem` models exist in generated Prisma only after approval.
2. Imported row counts match approved live audit counts or differences are documented.
3. `ServiceReport.CustomerID` links to `Customer` where possible.
4. `ReportEquipmentItems.ReportID` links to `ServiceReport` where possible.
5. Orphan rows are visible in an audit report or quarantine result.
6. Hebrew/source status values are preserved in `sourceStatusText` or `rawSource`.

## UI Criteria

1. `/service-reports` loads without errors.
2. The list shows real imported service reports.
3. Search and filters work on imported data.
4. `/service-reports/[id]` opens from the list.
5. Detail page shows customer and equipment rows.
6. Empty/loading/error states are present.
7. Mobile and desktop layouts are usable.

## Safety Criteria

1. No UI control can write to AppSheet, Google Sheets, Apps Script, Maven, Gmail, or Drive.
2. No create/edit/delete/send/approve buttons exist in the first module.
3. No production Apps Script logic is modified.
4. No Maven API write call is introduced.
5. No AppSheet action is triggered.

## Verification Criteria

1. Compare 5-10 known source service reports against Next.js detail pages.
2. Confirm report number, customer, date, technician, status, and equipment rows match.
3. Confirm browser console has no runtime errors.
4. Confirm server logs show read-only database queries only.
5. Confirm no network calls go to AppSheet/Maven write endpoints.

---

# First Implementation Task After Approval

Create the minimal `schema.prisma` subset for:

- `Customer`
- `ServiceReport`
- `ReportEquipmentItem`
- `ServiceReportStatus`
- `SourceSystem`

Then create a read-only seed/import plan for those three source sheets only.
