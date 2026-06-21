# Phase 1 Prisma Subset Review

Created: 2026-06-21

## What Was Created

A temporary `prisma/schema.prisma` draft was created for a narrow Phase 1 PostgreSQL shadow import.

It included only:

- `Customer`
- `ServiceReport`
- `ReportEquipmentItem`
- `DataImportRun`
- `DataImportIssue`
- `SourceSystem`
- `ServiceReportStatus`
- `ImportIssueType`
- `ImportRunStatus`

The draft used PostgreSQL, preserved source IDs, preserved raw source JSON, and made `ReportEquipmentItem.reportId` optional based on the live validation result showing orphan equipment rows.

## Why It Was Not Committed

The draft was not committed because it was too narrow to represent the official V1 Prisma schema for Tal Operating System.

It supported only the first read-only Service Reports import test and did not include the broader V1 system areas already documented in:

- `project-brain/migration/PRISMA_SCHEMA_V1.md`
- `project-brain/migration/DATABASE_SCHEMA_V1.md`

No database connection, migration, import, or Prisma installation was performed.

## Why It Is Too Narrow

The temporary schema excluded major V1 capabilities required by the documented Tal Operating System migration:

- AI draft suggestions
- Business documents
- Business document items
- Automation commands
- Maven customers, documents, items, and document items
- Product catalog
- Inventory stock
- Inventory transactions
- Parts used
- Approvals
- Email logs
- Sync state
- Sync logs
- Error logs

It also did not fully match documented V1 naming and database mapping conventions, including:

- documented UUID primary keys
- documented AppSheet source ID field names
- documented `@map(...)` database column mappings
- documented indexes and source status fields

## Useful Parts

The draft still captured useful Phase 1 implementation decisions:

- `ServiceReport.customerId` can be required for the first import because validation found zero missing or orphan customer references.
- `ReportEquipmentItem.reportId` should be optional or import-tolerant because validation found:
  - 9 equipment rows missing `ReportID`
  - 25 equipment rows with `ReportID` not found in `ServiceReports`
- Raw source JSON should be preserved for every imported row.
- Import runs and import issues should be tracked explicitly.
- A small Phase 1 import can be useful before enabling the full V1 schema.

## Decision

The official Prisma schema must be generated from `PRISMA_SCHEMA_V1.md` only after a broader Tal Operating System schema review.

The next schema pass should reconcile:

- full V1 business scope
- live data validation findings
- AppSheet source table mappings
- PostgreSQL naming conventions
- nullable vs required relations
- import-tolerant handling for legacy/orphan data
- Phase 1 read-only needs versus full V1 platform needs

Until that review is approved, no `prisma/schema.prisma` should be committed as the official V1 schema.
