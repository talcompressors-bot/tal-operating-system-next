# DATA MIGRATION PLAN

Created: 2026-06-21  
Status: Draft for review  
Scope: Documentation only  
Rule: No migration code. No production data changes.

## Sources Read

- `project-brain/migration/DATABASE_SCHEMA_V1.md`
- `project-brain/migration/PRISMA_SCHEMA_V1.md`
- `TalCompressors-ServiceReports-AI/data-sources/tools/SHEETS_REGISTRY.md`

## Evidence Limits

`SHEETS_REGISTRY.md` was created from read-only metadata/header inspection. It does not include live row counts. Therefore estimated row counts are marked `UNKNOWN` unless the table is platform-created and expected to start empty.

---

# Migration Order

Recommended import order:

1. Reference/master data: `Customer`, `Product`, `MavenCustomer`, `MavenItem`
2. Service records: `ServiceReport`, `ReportEquipmentItem`, `PartUsed`
3. Maven history: `MavenDocument`, `MavenDocumentItem`
4. Draft/workflow data: `AiDraftSuggestion`, `BusinessDocument`, `BusinessDocumentItem`
5. Operational logs/commands: `AutomationCommand`, `BusinessDocumentLog`, `Approval`, `EmailLog`
6. Inventory state: `InventoryStock`
7. Platform-created audit tables: `InventoryTransaction`
8. Observability: `SyncState`, `SyncLog`, `ErrorLog`
9. V2 only: `Payment`, `Receipt`

---

# Table Migration Plan

| Target Table | Source Sheet | Estimated Row Count | Source Primary Key | Target Prisma Model | Migration Strategy | Required Data Cleanup | Risk Level |
|---|---|---:|---|---|---|---|---|
| `customers` | `Customers_Final` | UNKNOWN | `CustomerID` | `Customer` | Import first. Preserve `CustomerID` as `appsheetCustomerId`; generate UUID `id`; map Hebrew name/contact/email/phone/address fields; keep full row in `rawSource`. | Normalize phone/email fields; handle multiple email/phone columns; confirm active flag mapping; preserve Hebrew source labels. | Critical |
| `service_reports` | `ServiceReports` | UNKNOWN | `ReportID`; also `ReportCounter` human sequence | `ServiceReport` | Import after `Customer`. Resolve `CustomerID` to `Customer.id`; preserve report ID and counter; map Drive fields on the model; store source status text. | Map Hebrew status values to `ServiceReportStatus`; handle two blank headers; validate `ReportCounter` uniqueness; parse dates/times safely. | Critical |
| `report_equipment_items` | `ReportEquipmentItems` | UNKNOWN | `ItemID`; parent `ReportID` | `ReportEquipmentItem` | Import after `ServiceReport`. Resolve `ReportID` to `ServiceReport.id`; preserve all equipment/service fields and `rawSource`. | Reject or quarantine rows with missing/unmatched `ReportID`; normalize numeric current-hours fields; preserve Hebrew equipment labels. | Critical |
| `parts_used` | `PartsUsed` | UNKNOWN | UNKNOWN | `PartUsed` | Flexible/import-tolerant V1 import only. Import raw rows if usable columns are found; relations to `ServiceReport` and `Product` are nullable. | Verify real sheet schema first; identify report reference and part key; map SKU/name/quantity; retain raw data for unmapped fields. | High |
| `products` | `ProductsCatalog` | UNKNOWN | `ProductID`; match key `SKU` | `Product` | Import before inventory and SKU matching. Preserve `ProductID`; keep SKU unique where present; store catalog status text. | Normalize SKU casing/spacing; detect duplicate SKUs; parse price/currency fields; map product status values. | High |
| `inventory_stocks` | `InventoryStock` | UNKNOWN | `StockID`; references `ProductID`/`SKU` | `InventoryStock` | Import after `Product`. Resolve product by `ProductID` first, SKU second only if needed; preserve quantities as decimals. | Reconcile rows whose `ProductID` and `SKU` disagree; parse quantities; confirm available quantity formula vs imported value. | Medium |
| `inventory_transactions` | none confirmed | 0 initially | platform `idempotencyKey` | `InventoryTransaction` | Do not import from sheet. Create only from approved future inventory workflows after V1 read-only migration. | None for initial migration; future workflow must define idempotency and approval rules. | Medium |
| `ai_draft_suggestions` | `AIDraftSuggestions` | UNKNOWN | `SuggestionID` | `AiDraftSuggestion` | Import after `Customer`, `ServiceReport`, and optionally `BusinessDocument`. Preserve JSON suggestion items; resolve related IDs when possible. | Validate `SuggestedItems` JSON; map confidence and approval statuses; preserve unmapped statuses in `sourceStatusText`/`rawSource`. | High |
| `business_documents` | `BusinessDocuments` | UNKNOWN | `BusinessDocumentId` | `BusinessDocument` | Import after `Customer`, `ServiceReport`, and `AiDraftSuggestion` where possible. Preserve workflow status, Maven references, send fields, and scalar `processingCommandId`. | Map `DocumentStatus`, `ApprovalStatus`, document type values; validate `ItemsJson`; do not enforce reverse command FK in V1. | Critical |
| `business_document_items` | `BusinessDocumentItems` | UNKNOWN | `ItemID`; parent `DocumentID` | `BusinessDocumentItem` | Import after `BusinessDocument` and `Product`. Resolve `DocumentID`; match products by explicit product ID/SKU only if present. | Parse quantity/prices; normalize source/match values; quarantine rows with missing parent document. | High |
| `business_document_logs` | `BusinessDocumentLog` | UNKNOWN | `LogID` | `BusinessDocumentLog` | Import after `BusinessDocument`. Resolve `DocumentID` when available; preserve `RawData` as JSON/text-derived JSON where possible. | Parse timestamps; tolerate missing document links; normalize action/result values only for reporting. | High |
| `automation_commands` | `AutomationCommands` | UNKNOWN | `CommandID` | `AutomationCommand` | Import after `BusinessDocument`. Resolve `BusinessDocumentId`; preserve both `CommandType` and `Command` evidence; keep historical command states read-only. | Map command/status enums; detect duplicate command IDs; preserve error messages and processed/completed timestamps. | Critical |
| `maven_customers` | `InvoiceMavenCustomers` | UNKNOWN | `InvoiceMavenCustomerId` | `MavenCustomer` | Import before `MavenDocument`. Preserve Maven external ID as `mavenCustomerExternalId`; optionally match to local `Customer` by business ID/name. | Normalize business IDs and names; avoid aggressive customer merging; preserve full Maven `RawJson`. | Medium |
| `maven_documents` | `InvoiceMavenDocuments` | UNKNOWN | `InvoiceMavenDocumentId` | `MavenDocument` | Import after `MavenCustomer` and `Customer` where matching is possible. Preserve Maven external ID, document number, payment status, PDF link, and raw JSON. | Rename external ID semantics to `mavenDocumentExternalId`; map document/payment values; parse dates and totals; resolve linked business document if present. | Critical |
| `maven_document_items` | `InvoiceMavenDocumentItems` | UNKNOWN | `ItemRowId`; parent `MavenDocumentId` | `MavenDocumentItem` | Import after `MavenDocument`. Resolve parent by Maven external document ID; keep item description/history for pricing. | Parse quantities/prices; quarantine rows with missing parent Maven document; preserve raw item JSON. | Critical |
| `maven_items` | `InvoiceMavenItems` | UNKNOWN | `InvoiceMavenItemId` | `MavenItem` | Import after `Product` where possible. Preserve Maven external item ID; link to `Product` by `LinkedProductID` or SKU only when reliable. | Normalize SKU; detect overlap with `ProductsCatalog`; preserve raw JSON; avoid overwriting catalog data. | Medium |
| `approvals` | `ApprovalsLog` | UNKNOWN | `ApprovalID` | `Approval` | Import as audit log. Store generic `relatedTable`/`relatedId` where resolvable; keep source action/status values. | Map approval status; parse timestamps; tolerate unresolved related IDs because source is generic. | High |
| `email_logs` | `EmailLog` | UNKNOWN | UNKNOWN | `EmailLog` | Read-only/flexible V1 import only after schema verification. Relations to `ServiceReport` and `BusinessDocument` are nullable. | Verify real sheet schema; identify timestamp, recipient, subject, status, and related IDs; preserve raw rows. | Medium |
| `sync_states` | `SyncState` | UNKNOWN | composite `Source` + `Key` | `SyncState` | Import carefully after Maven data. Preserve exact source/key/value pairs because Maven pagination depends on them. | Trim source/key only if proven safe; do not alter production values; validate composite uniqueness. | Critical |
| `sync_logs` | `SyncLog` | UNKNOWN | none | `SyncLog` | Import as append-only history. Generate UUIDs; preserve source, added/skipped counts, status, notes. | First header cell is blank/space; identify date column if present; parse counts/status defensively. | High |
| `error_logs` | `ErrorLog` | UNKNOWN | none | `ErrorLog` | Import as append-only history. Generate UUIDs; preserve source/function/error/raw/status. | Parse `RawError` as JSON when valid; otherwise store as text inside JSON; parse timestamps. | High |
| `payments` | none found / Phase 2 target | 0 initially | none | excluded from active V1; future `Payment` | Do not migrate in V1. Keep as documented V2 concept only. | Phase 2 must define source, evidence format, matching rules, and duplicate detection. | High |
| `receipts` | none found / Phase 2 target | 0 initially | none | excluded from active V1; future `Receipt` | Do not migrate in V1. Keep as documented V2 concept only. | Phase 2 must define receipt approval flow, Maven creation rules, and duplicate key generation. | High |

---

# Supporting Sheets Not In Active Prisma V1

These sheets exist in the registry but are not mapped to active Prisma V1 models.

| Source Sheet | Status In Registry | Reason Not Active V1 | Recommended Handling |
|---|---|---|---|
| `Customers2` | `DUPLICATE_CANDIDATE` | Overlaps `Customers_Final`. | Do not import until duplicate review is complete. |
| `InspectionItems` | `UNKNOWN` | Row-1 schema appears incomplete. | Reinspect only if service-report inspection UI requires it. |
| `Lists` | `ACTIVE` | Reference/dropdown data, not modeled in V1 schema. | Keep as source for future enum/status mapping task. |
| `SetupGuide` | `LEGACY` | Documentation/config sheet, not data. | Archive/reference only. |
| `PDF_Template` | `LEGACY` | Template-like sheet, not normalized data. | Keep out of V1 DB migration. |
| `AppSheet_Formulas` | `LEGACY` | Formula documentation. | Use for AppSheet migration reference only. |
| `ServiceReport_Form_View` | `LEGACY` | Mock/view guide. | Use for UI migration reference only. |
| `SecretAccessLog` | `ACTIVE` | Sensitive governance table, no V1 Prisma model yet. | Do not import until security/audit model is designed. |
| `SuppliersProducts` | `ACTIVE` | Procurement future scope, no V1 Prisma model. | Defer to procurement/catalog V2. |
| `AppMenu` | `ACTIVE` | UI/navigation support, no V1 Prisma model. | Use for Next.js route/menu planning if needed. |
| `AutomationRegistry` | `ACTIVE` | Governance/system-health registry, outside V1 business data schema. | Consider separate governance schema later. |
| `HealthCheckRegistry` | `ACTIVE` | Governance/system-health registry. | Consider separate governance schema later. |
| `SystemHealthLog` | `ACTIVE` | Health log, no V1 Prisma model. | Consider observability schema later. |

---

# Required Cleanup Tasks Before Migration Code

1. Capture actual row counts from live sheets in read-only mode.
2. Verify `PartsUsed` real schema and primary key strategy.
3. Verify `EmailLog` real schema and relationship fields.
4. Build Hebrew/source status mapping from `ServiceReports`, `BusinessDocuments`, `AIDraftSuggestions`, Maven tables, and `Lists`.
5. Detect duplicate customer records between `Customers_Final` and `Customers2`.
6. Validate uniqueness of all source primary keys before import.
7. Validate parent-child integrity:
   - `ReportEquipmentItems.ReportID` -> `ServiceReports.ReportID`
   - `BusinessDocumentItems.DocumentID` -> `BusinessDocuments.BusinessDocumentId`
   - `AutomationCommands.BusinessDocumentId` -> `BusinessDocuments.BusinessDocumentId`
   - `InvoiceMavenDocumentItems.MavenDocumentId` -> `InvoiceMavenDocuments.InvoiceMavenDocumentId`
8. Decide whether V1 imports should be full reload, incremental, or staged shadow import.

