# Data Coverage Audit

Last updated: 2026-06-23

Scope: read-only Prisma count audit against the current Supabase staging database.

Safety: no database writes, imports, migrations, schema changes, env changes, or production actions were run.

## Classification Rule

- `populated`: table has one or more records.
- `empty`: table exists and is readable, but currently has zero records.
- `not ready`: table exists and is readable, but currently has zero records and depends on unapproved import/runtime/write workflow data before a useful module can be validated.

## Coverage Table

| Prisma Model | Count | Classification | Notes |
|---|---:|---|---|
| `Customer` | 763 | populated | Customer read-only module exists. |
| `ServiceReport` | 63 | populated | ServiceReports read-only module exists. |
| `ReportEquipmentItem` | 75 | populated | Equipment read-only module exists. |
| `PartUsed` | 0 | empty | PartsUsed read-only module exists, but staging has no rows. |
| `Product` | 0 | empty | ProductsCatalog route is not implemented and staging has no rows. |
| `InventoryStock` | 0 | not ready | Inventory data is not imported/populated. |
| `InventoryTransaction` | 0 | not ready | Inventory transaction data is not imported/populated. |
| `AiDraftSuggestion` | 0 | not ready | AI draft workflow data is not imported/populated. |
| `BusinessDocument` | 0 | not ready | Business document workflow data is not imported/populated. |
| `BusinessDocumentItem` | 0 | not ready | Business document item data is not imported/populated. |
| `AutomationCommand` | 0 | not ready | Runtime command queue data is not populated in staging. |
| `MavenCustomer` | 0 | not ready | Maven data is not imported/populated. |
| `MavenDocument` | 0 | not ready | Maven document data is not imported/populated. |
| `MavenDocumentItem` | 0 | not ready | Maven document item data is not imported/populated. |
| `Approval` | 0 | not ready | Approval workflow data is not populated. |
| `EmailLog` | 0 | not ready | Email log data is not populated. |
| `SyncState` | 0 | not ready | Sync runtime state is not populated. |
| `SyncLog` | 0 | not ready | Sync runtime logs are not populated. |
| `ErrorLog` | 0 | not ready | Error log data is not populated. |

## Recommendation

Based on actual populated data, there is no remaining unimplemented read-only module with records available in staging. The populated models already have implemented read-only routes:

| Populated Model | Implemented Route Coverage |
|---|---|
| `Customer` | `/customers`, `/customers/[id]` |
| `ServiceReport` | `/service-reports`, `/service-reports/[id]` |
| `ReportEquipmentItem` | `/equipment`, `/equipment/[id]` |

Recommended next module: do not build another data-heavy read-only module until its source table is populated. The next data-backed implementation should be `Product` / ProductsCatalog only after Product rows are imported or otherwise populated in staging.

If implementation must continue without imports, the next safe task should be an enhancement to an already populated module, such as improving cross-links between ServiceReports, Equipment, and Customers.

## Validation Evidence

Read-only Prisma count query results:

```json
{
  "Customer": 763,
  "ServiceReport": 63,
  "ReportEquipmentItem": 75,
  "PartUsed": 0,
  "Product": 0,
  "InventoryStock": 0,
  "InventoryTransaction": 0,
  "AiDraftSuggestion": 0,
  "BusinessDocument": 0,
  "BusinessDocumentItem": 0,
  "AutomationCommand": 0,
  "MavenCustomer": 0,
  "MavenDocument": 0,
  "MavenDocumentItem": 0,
  "Approval": 0,
  "EmailLog": 0,
  "SyncState": 0,
  "SyncLog": 0,
  "ErrorLog": 0
}
```
