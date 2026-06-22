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

# Import Waves Plan

Import waves are dependency gates for dry-run validation and later approved import execution. They do not approve import by themselves. This section is structured for Codex, AI agents, future automation, and Project Brain indexing.

WAVE_ID: WAVE_1_CORE
STATUS: APPROVED
PRIORITY: HIGH
AGENT_OWNER:

* INFRASTRUCTURE_MANAGER_AGENT
* PROJECT_BRAIN_AGENT
* ORCHESTRATOR_AGENT

OBJECTIVE:
Import core service-report data required for Next.js service-report replacement.

SOURCES:

* Customers_Final
* ServiceReports
* ReportEquipmentItems

TARGET_TABLES:

* customers
* service_reports
* report_equipment_items

DEPENDENCIES:

* None

BLOCKERS:

* Dry-run report approval

FORBIDDEN:

* Production import
* Maven import
* Inventory import
* AppSheet or Google Sheets mutation

SUCCESS_CRITERIA:

* Row counts validated: Customers_Final = 763, ServiceReports = 63, ReportEquipmentItems = 109
* Parent links validated
* Legacy/test rows excluded
* Staging import completed after explicit approval
* Closed-loop sync completed before Wave 2: source CSVs read from `data-sources/exports/`; Supabase staging received only approved Wave 1 data; Prisma Client read back DB counts; validation report generated; import manifest generated; Project Brain updated with import date/time, source counts, DB counts, excluded counts, PASS/FAIL result, and next task; git status reviewed; only approved files committed/pushed; no Google Sheets, AppSheet, Maven, Apps Script, or production systems touched

BASELINE_REASON:
Read-only Wave 1 export validation found legitimate business data added after the original baseline.

CLOSED_LOOP_RESULT:
Wave 1 staging import ran on 2026-06-22T12:54:25.974Z / 2026-06-22 15:54 IDT. Source counts: Customers_Final = 763, ServiceReports = 63, ReportEquipmentItems = 109. DB counts read back by Prisma Client: customers = 763, service_reports = 63, report_equipment_items = 75. Excluded legacy/test ReportEquipmentItems: 9 missing ReportID, 25 unmatched ReportID. Validation result: PASS. Manifest/report generated under ignored local `data-sources/exports/import-runs/`. No source systems or production systems were touched.

NEXT_WAVE:
WAVE_1_NEXTJS_READ_VALIDATION

---

WAVE_ID: WAVE_2_SERVICE_WORKFLOW
STATUS: APPROVED
PRIORITY: HIGH
AGENT_OWNER:

* INFRASTRUCTURE_MANAGER_AGENT
* PROJECT_BRAIN_AGENT
* ORCHESTRATOR_AGENT

OBJECTIVE:
Import product, parts, AI draft, business-document, approval, and communication support data required for service workflow continuity.

SOURCES:

* ProductsCatalog
* PartsUsed
* AIDraftSuggestions
* BusinessDocuments
* BusinessDocumentItems
* BusinessDocumentLog
* ApprovalsLog
* EmailLog

TARGET_TABLES:

* products
* parts_used
* ai_draft_suggestions
* business_documents
* business_document_items
* business_document_logs
* approvals
* email_logs

DEPENDENCIES:

* WAVE_1_CORE completed and validated
* PartsUsed real schema verified
* EmailLog real schema verified
* Status and enum mappings reviewed

BLOCKERS:

* Wave 1 dry-run/import validation not approved
* PartsUsed schema unknown
* EmailLog schema unknown

FORBIDDEN:

* Production import
* Maven write actions
* Business document automation execution
* Email sending
* AppSheet or Google Sheets mutation

SUCCESS_CRITERIA:

* Product and SKU uniqueness validated
* PartsUsed and EmailLog schemas classified
* Business document parent links validated
* AI draft and approval status values mapped
* Staging import completed after explicit approval

NEXT_WAVE:
WAVE_3_MAVEN_DATA

---

WAVE_ID: WAVE_3_MAVEN_DATA
STATUS: APPROVED
PRIORITY: MEDIUM
AGENT_OWNER:

* INFRASTRUCTURE_MANAGER_AGENT
* MAVEN_AGENT
* PROJECT_BRAIN_AGENT
* ORCHESTRATOR_AGENT

OBJECTIVE:
Discover, classify, and import Maven-origin history/reference data and sync observability after service workflow dependencies are understood.

SOURCES:

* InvoiceMavenCustomers
* InvoiceMavenDocuments
* InvoiceMavenDocumentItems
* InvoiceMavenItems
* Any other Maven-origin Google Sheets tab
* SyncState
* SyncLog
* ErrorLog

TARGET_TABLES:

* maven_customers
* maven_documents
* maven_document_items
* maven_items
* to-classify Maven-origin targets
* sync_states
* sync_logs
* error_logs

DEPENDENCIES:

* WAVE_1_CORE completed and validated
* Maven-origin tab discovery completed
* Customer matching rules reviewed
* BusinessDocument link fields reviewed
* Product and SKU link rules reviewed

BLOCKERS:

* Maven-origin source inventory incomplete
* Unknown Maven-to-customer links
* Unknown Maven-to-business-document links
* Unknown Maven-to-product links

FORBIDDEN:

* Production import
* Maven document creation or modification
* Maven sync execution
* Receipt or payment workflow changes
* AppSheet or Google Sheets mutation

SUCCESS_CRITERIA:

* Every Maven-origin tab discovered
* Every Maven-origin tab classified as active V1 import, later V1 import, or future/historical only
* Maven customer, document, item, and sync links validated
* Staging import completed after explicit approval

NEXT_WAVE:
WAVE_4_EXTENDED_OPERATIONS

---

WAVE_ID: WAVE_4_EXTENDED_OPERATIONS
STATUS: APPROVED
PRIORITY: LOW
AGENT_OWNER:

* INFRASTRUCTURE_MANAGER_AGENT
* PROJECT_BRAIN_AGENT
* ORCHESTRATOR_AGENT

OBJECTIVE:
Classify and plan extended/future operational, procurement, reference, UI, governance, and security data after core service and Maven data are validated.

SOURCES:

* InventoryStock
* SuppliersProducts
* InspectionItems
* Lists
* AppMenu
* Governance/security sheets

TARGET_TABLES:

* inventory_stocks
* future procurement targets
* future inspection targets
* future reference targets
* future UI/navigation targets
* future governance/security targets

DEPENDENCIES:

* WAVE_1_CORE completed and validated
* WAVE_2_SERVICE_WORKFLOW completed or explicitly deferred
* WAVE_3_MAVEN_DATA completed or explicitly deferred
* Extended target schema approved

BLOCKERS:

* Procurement scope not approved
* Inspection schema unknown
* Governance/security model not approved
* UI/config import rules not approved

FORBIDDEN:

* Production import
* Inventory mutation
* Procurement write workflow
* Governance/security table import without security model
* AppSheet or Google Sheets mutation

SUCCESS_CRITERIA:

* Extended source tabs classified
* Future target tables approved or deferred
* Security/governance handling approved where needed
* Staging import completed after explicit approval, or sources explicitly deferred

NEXT_WAVE:
NONE

---

EXCLUDED_UNLESS_LATER_APPROVED:

* Customers2
* PDF_Template
* SetupGuide
* AppSheet_Formulas
* ServiceReport_Form_View

---

# Table Migration Plan

| Target Table | Source Sheet | Estimated Row Count | Source Primary Key | Target Prisma Model | Migration Strategy | Required Data Cleanup | Risk Level |
|---|---|---:|---|---|---|---|---|
| `customers` | `Customers_Final` | UNKNOWN | `CustomerID` | `Customer` | Import first. Preserve `CustomerID` as `appsheetCustomerId`; generate UUID `id`; map Hebrew name/contact/email/phone/address fields; keep full row in `rawSource`. | Normalize phone/email fields; handle multiple email/phone columns; confirm active flag mapping; preserve Hebrew source labels. | Critical |
| `service_reports` | `ServiceReports` | UNKNOWN | `ReportID`; also `ReportCounter` human sequence | `ServiceReport` | Import after `Customer`. Resolve `CustomerID` to `Customer.id`; preserve report ID and counter; map Drive fields on the model; store source status text. | Map Hebrew status values to `ServiceReportStatus`; handle two blank headers; validate `ReportCounter` uniqueness; parse dates/times safely. | Critical |
| `report_equipment_items` | `ReportEquipmentItems` | UNKNOWN | `ItemID`; parent `ReportID` | `ReportEquipmentItem` | Import after `ServiceReport`. Import only rows whose `ReportID` resolves to a real `ServiceReports.ReportID`; preserve source `ReportID` as `sourceReportId`; derive `reportCounter` by joining through `ServiceReports.ReportCounter`; preserve equipment/service fields and `rawSource`. | Exclude legacy/test rows with missing/unmatched `ReportID` from PostgreSQL import; do not clean Google Sheets; keep `serviceReportId` nullable as a safety rule; normalize numeric current-hours fields; preserve Hebrew equipment labels. | Critical |
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
8. Confirm `ReportEquipmentItems` exclusion report format for legacy/test rows that are not linked to real `ServiceReports`.
9. Decide whether V1 imports should be full reload, incremental, or staged shadow import.

---

# First Dry-Run Source Discovery

The first dry-run must stay focused on the service-core source set:

| Stage | Source Sheet | Purpose | Required For First Dry-Run |
|---|---|---|---|
| Minimal first dry-run | `Customers_Final` | Customer parent records for service reports | Yes |
| Minimal first dry-run | `ServiceReports` | Service report parent records and `ReportCounter` source | Yes |
| Minimal first dry-run | `ReportEquipmentItems` | Equipment/service child rows and approved legacy/test exclusion validation | Yes |

Second-stage dry-run source discovery must confirm the existing Maven Sheets and how they link to customers and business documents before any import.

Maven Data Scope rule: every Google Sheets tab that stores data imported, synced, or created from Maven is part of the project Maven Data Scope and must be discovered, mapped, and classified before import. Discovery must not stop at the four currently known `InvoiceMaven*` tabs.

| Stage | Source Sheet | Target Model | Discovery Goal |
|---|---|---|---|
| Second-stage Maven discovery | `InvoiceMavenCustomers` | `MavenCustomer` | Confirm Maven customer identifiers, business IDs/names, and conservative link options to `Customers_Final`. |
| Second-stage Maven discovery | `InvoiceMavenDocuments` | `MavenDocument` | Confirm Maven document identifiers, customer links, document numbers, payment/status fields, and any link fields to `BusinessDocuments`. |
| Second-stage Maven discovery | `InvoiceMavenDocumentItems` | `MavenDocumentItem` | Confirm item-row identifiers and parent link to `InvoiceMavenDocuments.InvoiceMavenDocumentId`. |
| Second-stage Maven discovery | `InvoiceMavenItems` | `MavenItem` | Confirm Maven item identifiers, SKU/product references, and safe link options to `ProductsCatalog`. |
| Second-stage Maven discovery | Any other Maven-origin Google Sheets tab | To classify | Discover tab name, purpose, expected target table, links to `Customers_Final` / `BusinessDocuments` / `ProductsCatalog`, and classify as active V1 import, later V1 import, or future/historical only. |

Maven discovery is read-only. It must not create, modify, sync, or trigger Maven documents.

For every Maven-origin tab, the discovery report must include:

1. Sheet/tab name.
2. Source purpose.
3. Expected target table.
4. Link to Customer, BusinessDocument, or Product if any.
5. Import classification: active V1 import, later V1 import, or future/historical only.

---

# Approved Import Decisions

## `ReportEquipmentItems`

- Legacy/test `ReportEquipmentItems` rows created during equipment-add testing must not be imported to PostgreSQL.
- Import only `ReportEquipmentItems` linked to real `ServiceReports`.
- Known excluded rows: 9 rows missing `ReportID`; 25 rows with unmatched `ReportID`.
- Classification: historical test data, not business data, no recovery required, excluded by design.
- Do not modify Google Sheets or AppSheet to clean those rows.
- Keep `ReportEquipmentItem.serviceReportId` nullable as a safety rule.
- Preserve `ReportEquipmentItems.ReportID` as `sourceReportId`.
- Derive `reportCounter` during import by joining `ReportEquipmentItems.ReportID` -> `ServiceReports.ReportID` -> `ServiceReports.ReportCounter`.
- Do not add a `ReportCounter` column to Google Sheets or AppSheet.
- `reportCounter` is display/search/audit metadata only.
- `sourceReportId` remains the true source link.
- `serviceReportId` remains the internal PostgreSQL FK.
- Never use `reportCounter` as a primary relationship key.

## Server Actions And Offline Sync

- Internal Next.js write flows must use Server Actions by default.
- Server Actions are the default sync target for offline queued app mutations.
- PostgreSQL is the source of truth after successful sync.
- Conflicts must be logged and require review; they must not be silently overwritten.
- AppSheet and Google Sheets production remain untouched during the shadow phase.
