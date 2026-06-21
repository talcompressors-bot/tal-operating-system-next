# REAL DATA READ PLAN

Created: 2026-06-21  
Status: Draft for approval  
Scope: Replace mock ServiceReports data with real read-only data  
Rule: Documentation only. Do not write code yet.

## Goal

Replace the current mock Service Reports UI data with real read-only data from:

- `Customers_Final`
- `ServiceReports`
- `ReportEquipmentItems`

This must keep the existing AppSheet production system untouched.

---

# Safety Rules

- Read only.
- Do not modify AppSheet.
- Do not modify Apps Script.
- Do not modify Google Sheets.
- Do not modify Maven.
- Do not trigger AppSheet actions.
- Do not write to any source system.
- Do not create, update, delete, approve, send, sync, or issue anything.

AppSheet remains production. Next.js remains shadow/development only until Liad explicitly approves migration.

---

# 1. Recommended Read-Only Architecture

Recommended first architecture:

```text
Google Sheets source tables
-> read-only data access layer
-> temporary service report adapter
-> Server Components
-> /service-reports
-> /service-reports/[id]
```

## Principles

1. Keep source-system access server-side only.
2. Keep UI components unaware of Google Sheets column names.
3. Convert source rows into a stable internal view model.
4. Preserve current mock UI shape as much as possible.
5. Add no API routes unless a later requirement needs client-side interactivity.
6. Cache cautiously to reduce repeated reads.
7. Never expose credentials to the browser.

## Target View Models

The UI should consume normalized read-only objects:

```text
ServiceReportListItem
ServiceReportDetail
EquipmentRow
CustomerSummary
```

These are not database models. They are temporary read adapters for the shadow UI.

---

# 2. Data Access Options Ranked By Safety

## Option 1: Static Export Snapshot

Safety rank: 1, safest.

Flow:

```text
Manual read-only export from Google Sheets
-> local CSV/JSON files
-> Next.js reads local snapshot
-> UI renders real but static data
```

Pros:

- Zero live source-system connection from Next.js.
- No risk of accidental Google Sheets writes.
- Easy rollback to mock data.
- Good for first visual validation.

Cons:

- Data becomes stale.
- Requires manual refresh.
- Not ideal for daily operations.

Recommended use:

First real-data prototype.

## Option 2: Google Sheets API Read-Only Service Account

Safety rank: 2.

Flow:

```text
Next.js server-side Google Sheets API client
-> read-only ranges
-> temporary adapter
-> Server Components
```

Requirements:

- Service account or OAuth credential with read-only access only.
- Google Sheets API scope limited to read.
- Server-only environment variables.

Pros:

- Live data without AppSheet interaction.
- No database needed.
- Keeps Next.js shadow app current.

Cons:

- Requires credential handling.
- Must prevent accidental write scopes.
- Need caching/rate-limit discipline.

Recommended use:

After static snapshot proves UI shape.

## Option 3: Scheduled Read-Only Snapshot Job

Safety rank: 3.

Flow:

```text
Scheduled read-only pull
-> local/server JSON snapshot or read-only cache
-> Next.js UI reads snapshot
```

Pros:

- Reduces live read pressure.
- Better freshness than manual export.
- Still avoids database migration.

Cons:

- Introduces scheduled job complexity.
- Needs clear failure and stale-data indicators.

Recommended use:

After service reports UI is stable.

## Option 4: PostgreSQL Shadow Import

Safety rank: 4.

Flow:

```text
Read-only source pull
-> local/staging PostgreSQL
-> Prisma read-only queries
-> Next.js UI
```

Pros:

- Closest to final migration architecture.
- Enables search, pagination, and relations cleanly.

Cons:

- Introduces database operations.
- Requires import code and schema management.
- Higher implementation surface.

Recommended use:

Later Phase 1 implementation, not the first real-data read.

## Option 5: AppSheet Runtime/API Access

Safety rank: 5, not recommended now.

Reason:

- AppSheet is production.
- Runtime access risks triggering actions or auth/licensing blockers.
- Previous AppSheet runtime discovery was blocked by licensing.

Recommended use:

Avoid for this stage.

---

# 3. Temporary Adapter Design

## Adapter Goal

Create a temporary read-only boundary between source data and UI.

The UI should not know about:

- Hebrew Google Sheets headers
- source row structure
- customer/report/equipment join logic
- raw date formats
- status mapping

## Adapter Responsibilities

1. Load customers from `Customers_Final`.
2. Load reports from `ServiceReports`.
3. Load equipment rows from `ReportEquipmentItems`.
4. Join reports to customers by source `CustomerID`.
5. Join equipment to reports by source `ReportID`.
6. Map rows into stable UI objects.
7. Preserve raw source data for debugging only on the server side.
8. Mark missing relations clearly.

## Recommended Adapter Functions

```text
getServiceReportList()
getServiceReportById(id)
getCustomerSummaryBySourceId(customerId)
getEquipmentRowsByReportId(reportId)
```

## Stable UI Shape

List item:

```text
id
reportNumber
customer
serviceDate
technician
status
```

Detail:

```text
id
reportNumber
customer
serviceDate
technician
status
description
recommendations
equipment[]
```

Equipment row:

```text
id
equipmentNumber
type
model
serialNumber
status
notes
```

## Status Mapping

Use a conservative mapping:

- Known source status -> matching display status.
- Unknown source status -> display `UNKNOWN`.
- Always preserve original source status as `sourceStatusText`.

Do not block the UI because of unknown statuses.

---

# 4. How The Existing UI Will Consume Real Data

Current UI uses:

```text
app/service-reports/mock-data.ts
```

Recommended transition:

## Step 1: Keep UI Components Stable

Do not redesign pages first.

Keep:

- `/`
- `/service-reports`
- `/service-reports/[id]`

## Step 2: Replace Data Source Behind Same Shape

Replace mock array usage with adapter functions that return the same shape.

Current:

```text
serviceReports
getServiceReport(id)
```

Target:

```text
getServiceReportList()
getServiceReportById(id)
```

## Step 3: Keep Server Components

Pages should remain Server Components by default:

- no client-side fetch
- no API routes
- no browser credentials
- no source-system credentials exposed

## Step 4: Add Loading/Error Only If Needed

For Server Components, simple page-level error handling is enough initially:

- show empty state if no rows
- show missing report page if ID not found
- show stale snapshot timestamp if using snapshot data

## Step 5: Visual Verification

Use 5-10 known source reports:

- report number
- customer
- service date
- technician
- status
- equipment rows

---

# 5. Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Accidental write scope in Google credentials | Could modify live Sheets | Use static export first, then read-only API scope only. |
| AppSheet production actions triggered | Could affect customers/workflows | Do not use AppSheet runtime/API for this stage. |
| Hebrew headers are unstable or encoded badly | Incorrect field mapping | Centralize mapping in adapter and preserve raw source. |
| Blank headers in `ServiceReports` | Parser confusion | Use explicit column names/indexes from verified registry. |
| Missing customer references | Report list shows incomplete customer data | Display source customer ID and mark relation missing. |
| Missing equipment parent report | Equipment rows disappear or attach incorrectly | Quarantine orphan equipment rows in read report. |
| Large sheet size affects page speed | Slow UI | Cache reads or use snapshot files. |
| Stale snapshot data | UI not current | Show snapshot timestamp clearly. |
| Credentials leak to browser | Security issue | Keep all data access in Server Components/server-only modules. |
| UI appears production-ready too early | Operational confusion | Label as shadow/development until official migration approval. |

---

# 6. Rollback Strategy

## Immediate Rollback

Return UI to mock data:

```text
app/service-reports/mock-data.ts
```

Because the UI shape stays stable, rollback should only require switching the data source back to the mock module.

## Source-System Rollback

No source-system rollback should be needed because this plan performs no writes.

If an unexpected source access issue occurs:

1. Remove/disable credentials.
2. Stop live read path.
3. Restore mock data path.
4. Document the issue in migration notes.

## UI Rollback

If real data mapping breaks visual pages:

1. Revert adapter usage.
2. Keep existing pages.
3. Re-enable mock data.
4. Fix mapping offline.

## Operational Rollback

If anyone is confused about whether Next.js is production:

1. Add stronger banner: `Shadow Development Only`.
2. Remove external sharing.
3. Keep AppSheet as official production source.

---

# Recommended Next Step

Start with Option 1: static read-only export snapshot.

Reason:

- safest real-data path
- no live connection
- no write scopes
- easy rollback
- enough to validate UI against real customer/report/equipment data

Do not implement until Liad approves the chosen option.

