# POSTGRESQL V1 SCOPE

Created: 2026-06-21  
Status: Final scope for review before Prisma generation  
Project: Tal Operating System  
Mode: Documentation only

## Purpose

Define the approved PostgreSQL V1 boundary before generating Prisma, creating a database, importing data, or connecting any production workflow.

This document replaces the rejected narrow Phase 1 Prisma subset as the schema scope guide. The temporary Phase 1 subset was useful for a small read-only Service Reports import test, but it does not represent the full Tal Operating System V1.

## Hard Rules

- Do not generate Prisma from this document until this scope is approved.
- Do not create or migrate a database during this step.
- Do not access Google Sheets or AppSheet during this step.
- Do not run Maven or any external write flow.
- Keep AppSheet, Google Sheets, Apps Script, Drive, Maven, and email as production until explicit cutover approval.
- PostgreSQL V1 is a shadow/read-first foundation, not a production replacement.

## Live Validation Corrections

The latest read-only validation corrected the known source counts:

| Source | Confirmed Rows |
|---|---:|
| `Customers_Final` | 763 |
| `ServiceReports` | 63 |
| `ReportEquipmentItems` | 109 |

Reason: read-only Wave 1 export validation found legitimate business data added after the original baseline.

Required schema correction:

- `ReportEquipmentItems` to `ServiceReports` must be nullable/import-tolerant in V1.
- Reason: live validation found equipment rows with missing or unmatched `ReportID`, and Liad approved excluding those legacy/test rows from PostgreSQL import.
- Preserve the original source `ReportID` in `source_report_id`.
- Add nullable `report_counter` for display/search/audit, derived during import from `ReportEquipmentItems.ReportID` -> `ServiceReports.ReportID` -> `ServiceReports.ReportCounter`.
- Import behavior must import only equipment rows linked to real `ServiceReports`; legacy/test rows intentionally excluded from import are reported in validation output and not imported.
- Keep `service_report_id` nullable as a safety rule even though approved import excludes unlinked rows.

Detailed legacy/test exclusion findings:

- 9 `ReportEquipmentItems` rows are missing `ReportID`.
- 25 `ReportEquipmentItems` rows have `ReportID` values not found in `ServiceReports`.
- Classification: historical test data.
- Business classification: not business data.
- Recovery requirement: no recovery required.
- Import classification: excluded by design.
- No `ReportCounter` / source report number is required for these legacy/test rows intentionally excluded from import.
- Do not modify Google Sheets or AppSheet to clean these rows.

## Approved Architecture Decisions

- All internal Next.js write flows must use Server Actions by default.
- Server Actions apply to approvals, AI draft approval, `BusinessDocument` creation, `ServiceReport` shadow updates, import review actions, user-triggered queue commands, PostgreSQL mutations, and offline sync actions.
- API routes are allowed only for external webhooks, Maven callbacks, public endpoints, and third-party integrations.
- Field work must work without internet.
- Local devices must store pending actions in an offline queue.
- When internet returns, the queue syncs automatically.
- Server Actions are the default sync target for internal app mutations.
- PostgreSQL is the source of truth after successful sync.
- Conflicts must be logged and require review, not silently overwritten.
- AppSheet and Google Sheets production remain untouched during the shadow phase.

## 1. V1 Business Domains

PostgreSQL V1 must cover the operating system domains needed for service-report-to-business-document migration, AI draft staging, Maven traceability, inventory reference, and operational audit.

| Domain | V1 Scope | Business Value |
|---|---|---|
| Customer master | Active V1 | Required for reports, Maven matching, business documents, receipts later. |
| Service reports | Active V1 | Core operational workflow and current Next.js shadow UI. |
| Equipment/service items | Active V1, import-tolerant | Required for detailed service history and AI draft context. |
| Parts used | V1 read-only/flexible | Needed for AI draft context, but source schema is incomplete and must not drive writes yet. |
| Product catalog | Active V1 | Required for pricing, SKU matching, AI draft, and inventory. |
| Inventory stock | V1 read-only/reference | Required for visibility and future deduction design. |
| Inventory transactions | V1 platform table, no legacy import | Needed for future auditable deductions after approval. |
| AI draft suggestions | Active V1 | Required for recommendation and approval staging. |
| Business documents | Active V1 | Core quote/invoice/service-document staging workflow. |
| Business document items | Active V1 | Required line items for approvals and Maven drafts. |
| Automation commands | Active V1 read/trace | Preserves queue architecture and idempotency model. |
| Maven customers/documents/items | Active V1 read/reference | Required for pricing history, customer matching, and document traceability. |
| Approvals | Active V1 audit | Required for human-control governance. |
| Email logs | V1 read-only/flexible | Useful for traceability, but source schema is incomplete. |
| Sync state/logs/errors | Active V1 observability | Required to understand Maven sync state and failures. |
| Payments/receipts | Phase 2 only | Separate business workflow with no confirmed source table and higher financial risk. |
| Security/governance registries | Excluded from active V1 business schema | Existing live governance tables require separate security/audit design. |

## 2. Phase 1 Tables

Phase 1 means active PostgreSQL V1 schema coverage for read-first shadow migration and schema validation. It must be broad enough to represent the Tal Operating System V1, not just the current Next.js service report screen.

| Table | Source | V1 Handling |
|---|---|---|
| `customers` | `Customers_Final` | Active V1. Preserve `CustomerID`, import all 763 confirmed rows, retain full `raw_source`. |
| `service_reports` | `ServiceReports` | Active V1. Preserve `ReportID`, `ReportCounter`, Hebrew/source status text, Drive fields, and full `raw_source`. |
| `report_equipment_items` | `ReportEquipmentItems` | Active V1 with nullable/import-tolerant `service_report_id`. Import only rows linked to real `ServiceReports`; exclude legacy/test rows with missing/unmatched `ReportID`; preserve source `ReportID` in `source_report_id`; derive nullable `report_counter` for display/search/audit. |
| `parts_used` | `PartsUsed` | V1 read-only/flexible. Nullable source ID and nullable relations until the real schema is verified. |
| `products` | `ProductsCatalog` | Active V1. Preserve product source IDs, SKU, pricing, status text, and raw rows. |
| `inventory_stocks` | `InventoryStock` | V1 read-only/reference. Link to products when reliable; preserve source quantity state. |
| `inventory_transactions` | None confirmed | V1 platform/audit table only. Start empty; do not import legacy rows. |
| `ai_draft_suggestions` | `AIDraftSuggestions` | Active V1. Preserve suggested items JSON, confidence, approval status, and links when resolvable. |
| `business_documents` | `BusinessDocuments` | Active V1. Preserve workflow, approval, Maven, send, processing, and raw source fields. |
| `business_document_items` | `BusinessDocumentItems` | Active V1. Required child table for business document lines. |
| `business_document_logs` | `BusinessDocumentLog` | Active V1 audit. Tolerate unresolved document links. |
| `automation_commands` | `AutomationCommands` | Active V1 read/trace. Preserve queue state; do not execute commands from PostgreSQL V1. |
| `maven_customers` | `InvoiceMavenCustomers` | Active V1 reference. Match to customers conservatively. |
| `maven_documents` | `InvoiceMavenDocuments` | Active V1 reference/history. Preserve external Maven IDs and raw JSON. |
| `maven_document_items` | `InvoiceMavenDocumentItems` | Active V1 reference/history. Required for pricing history and document traceability. |
| `maven_items` | `InvoiceMavenItems` | Active V1 reference. Link to products only when reliable. |
| `approvals` | `ApprovalsLog` | Active V1 audit. Generic related IDs must remain tolerant. |
| `email_logs` | `EmailLog` | V1 read-only/flexible. Nullable relations and raw source until schema is verified. |
| `sync_states` | `SyncState` | Active V1 observability. Preserve exact source/key/value; Maven pagination depends on it. |
| `sync_logs` | `SyncLog` | Active V1 observability. Append-only history import. |
| `error_logs` | `ErrorLog` | Active V1 observability. Preserve raw errors. |

## 3. Phase 2 Tables

Phase 2 tables are documented but must not be generated into the first active Prisma schema unless separately approved.

| Table | Status | Reason |
|---|---|---|
| `payments` | Phase 2 | No confirmed AppSheet source table. Requires payment evidence format, matching rules, and review flow. |
| `receipts` | Phase 2 | Depends on payments and Maven receipt creation rules. Financial write path requires separate approval. |
| `receipt_status` enum | Phase 2 | Not needed while receipts are excluded from active V1. |
| Procurement/supplier tables | Phase 2 or later | `SuppliersProducts` exists but procurement is outside current service-report-to-document migration. |
| Security audit tables | Separate governance phase | `SecretAccessLog` is sensitive and should not be folded into the business schema without a security model. |
| System health registry tables | Separate observability/governance phase | `AutomationRegistry`, `HealthCheckRegistry`, and `SystemHealthLog` are live governance assets, not first-pass business data models. |

## 4. Excluded Tables

The following known sheets are excluded from active PostgreSQL V1 schema generation:

| Source Sheet | Reason |
|---|---|
| `Customers2` | Duplicate candidate overlapping `Customers_Final`; do not import until duplicate review. |
| `InspectionItems` | Row-1 schema appears incomplete; include only after confirmed service inspection requirements. |
| `Lists` | Reference/dropdown source for future enum/status mapping, not an active V1 model. |
| `SetupGuide` | Legacy/config documentation, not transactional data. |
| `PDF_Template` | Template-like sheet, not normalized data. |
| `AppSheet_Formulas` | AppSheet formula documentation. |
| `ServiceReport_Form_View` | UI/form guide, not normalized data. |
| `SecretAccessLog` | Sensitive governance log; requires separate security model. |
| `SuppliersProducts` | Future procurement scope. |
| `AppMenu` | UI/navigation config, not business data. |
| `AutomationRegistry` | Governance registry; separate system health/governance schema. |
| `HealthCheckRegistry` | Governance registry; separate system health/governance schema. |
| `SystemHealthLog` | Health log; separate observability/governance schema. |

## 5. Required Relationships

Relationships must be designed for legacy import tolerance. Source records should be preserved even when parent links are missing or stale.

Required relationships:

- `customers` -> `service_reports`
- `service_reports` -> `report_equipment_items`, nullable/import-tolerant on the child side as a safety rule; import only rows linked to real `ServiceReports`; preserve original source `ReportID` in `report_equipment_items.source_report_id`
- `service_reports` -> `parts_used`, nullable/import-tolerant
- `products` -> `parts_used`, nullable/import-tolerant
- `products` -> `inventory_stocks`
- `products` -> `inventory_transactions`
- `products` -> `business_document_items`, nullable/import-tolerant
- `products` -> `maven_items`, nullable/import-tolerant
- `customers` -> `ai_draft_suggestions`, nullable/import-tolerant
- `service_reports` -> `ai_draft_suggestions`, nullable/import-tolerant
- `customers` -> `business_documents`, nullable/import-tolerant
- `service_reports` -> `business_documents`, nullable/import-tolerant
- `ai_draft_suggestions` -> `business_documents`, nullable/import-tolerant
- `business_documents` -> `business_document_items`
- `business_documents` -> `business_document_logs`, nullable/import-tolerant
- `business_documents` -> `automation_commands`, nullable/import-tolerant
- `business_documents` -> `maven_documents`, nullable/import-tolerant
- `business_documents` -> `email_logs`, nullable/import-tolerant
- `service_reports` -> `email_logs`, nullable/import-tolerant
- `maven_customers` -> `maven_documents`, nullable/import-tolerant
- `customers` -> `maven_customers`, nullable/import-tolerant
- `customers` -> `maven_documents`, nullable/import-tolerant
- `maven_documents` -> `maven_document_items`
- `customers` -> `maven_document_items`, nullable/import-tolerant
- `inventory_stocks` -> `inventory_transactions`
- `business_document_items` -> `inventory_transactions`, nullable/import-tolerant

Special relationship decisions:

- `BusinessDocument.processingCommandId` remains scalar-only in V1 to avoid a relation cycle.
- `AutomationCommand.businessDocumentId` is the enforced command relationship.
- Maven external IDs must be named clearly as external IDs, not confused with internal UUID primary keys.
- All source rows must preserve raw JSON/source data for reconciliation.
- `report_equipment_items.report_counter` is derived display/search/audit metadata only and must never be used as a primary relationship key.
- `report_equipment_items.source_report_id` remains the true legacy source link; `report_equipment_items.service_report_id` remains the internal PostgreSQL FK.

## 6. Import Strategy

Import strategy must be staged, idempotent, and shadow-only.

Import waves are defined in AI-agent-readable form. `project-brain/migration/DATA_MIGRATION_PLAN.md` is the canonical detailed owner for full wave fields.

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

SUCCESS_CRITERIA:

* Row counts validated
* Parent links validated
* Legacy/test rows excluded
* Staging import completed

NEXT_WAVE:
WAVE_2_SERVICE_WORKFLOW

---

WAVE_ID: WAVE_2_SERVICE_WORKFLOW
STATUS: APPROVED
PRIORITY: HIGH
AGENT_OWNER:

* INFRASTRUCTURE_MANAGER_AGENT
* PROJECT_BRAIN_AGENT
* ORCHESTRATOR_AGENT

OBJECTIVE:
Import service workflow support data for product, parts, AI draft, business documents, approvals, and email traceability.

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

* WAVE_1_CORE

BLOCKERS:

* Wave 1 dry-run/import validation not approved
* PartsUsed schema unknown
* EmailLog schema unknown

FORBIDDEN:

* Production import
* Maven write actions
* Business document automation execution
* Email sending

SUCCESS_CRITERIA:

* Product and SKU uniqueness validated
* PartsUsed and EmailLog schemas classified
* Business document parent links validated
* Staging import completed

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
Discover, classify, and import Maven-origin history/reference data and sync observability.

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

* WAVE_1_CORE
* Maven-origin tab discovery
* Customer, BusinessDocument, and Product link review

BLOCKERS:

* Maven-origin source inventory incomplete
* Unknown Maven links

FORBIDDEN:

* Production import
* Maven document creation or modification
* Maven sync execution

SUCCESS_CRITERIA:

* Every Maven-origin tab discovered and classified
* Maven links validated
* Staging import completed

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
Classify extended/future operational, procurement, reference, UI, governance, and security data.

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

* WAVE_1_CORE
* WAVE_2_SERVICE_WORKFLOW completed or explicitly deferred
* WAVE_3_MAVEN_DATA completed or explicitly deferred

BLOCKERS:

* Extended target schema not approved
* Governance/security model not approved

FORBIDDEN:

* Production import
* Inventory mutation
* Procurement write workflow
* Governance/security import without security model

SUCCESS_CRITERIA:

* Extended source tabs classified
* Future target tables approved or deferred
* Staging import completed or sources explicitly deferred

NEXT_WAVE:
NONE

EXCLUDED_UNLESS_LATER_APPROVED:

* Customers2
* PDF_Template
* SetupGuide
* AppSheet_Formulas
* ServiceReport_Form_View

Recommended order:

1. Import reference/master data: `customers`, `products`, `maven_customers`, `maven_items`.
2. Import service data: `service_reports`, `report_equipment_items`, `parts_used`.
3. Import Maven history: `maven_documents`, `maven_document_items`.
4. Import workflow data: `ai_draft_suggestions`, `business_documents`, `business_document_items`.
5. Import command/audit data: `automation_commands`, `business_document_logs`, `approvals`, `email_logs`.
6. Import inventory state: `inventory_stocks`.
7. Initialize platform audit tables: `inventory_transactions` starts empty.
8. Import observability: `sync_states`, `sync_logs`, `error_logs`.

Required import behavior:

- Preserve source IDs as unique external identifiers.
- Generate new PostgreSQL UUID primary keys.
- Preserve full source rows in `raw_source`, `raw_json`, `raw_item`, or equivalent fields.
- Keep Hebrew/source status text alongside mapped enums.
- Use nullable relations where legacy data may be incomplete.
- Record import runs and import issues before any row is discarded.
- Do not mutate production AppSheet, Google Sheets, Maven, Drive, Apps Script, or email state.
- Do not execute imported `AutomationCommands`; import them as history/state only.
- Do not deduplicate or merge customers automatically.
- Import only `ReportEquipmentItems` rows whose source `ReportID` links to a real `ServiceReport`.
- Exclude legacy/test `ReportEquipmentItems` rows with missing/unmatched `ReportID` from PostgreSQL import and report them in import validation output.
- Preserve original source `ReportID` in `source_report_id`.
- Derive `report_counter` during import by joining through `ServiceReports.ReportCounter`.
- Do not add `ReportCounter` to Google Sheets or AppSheet.

Minimum validation required before import code:

- Verify source primary key uniqueness for every active table.
- Verify parent-child integrity for critical links.
- Verify `PartsUsed` and `EmailLog` usable schemas.
- Confirm Hebrew/source status mappings.
- Confirm import issue taxonomy and import run tracking.
- Keep minimal first dry-run limited to `Customers_Final`, `ServiceReports`, and `ReportEquipmentItems`.
- Include `InvoiceMavenCustomers`, `InvoiceMavenDocuments`, `InvoiceMavenDocumentItems`, and `InvoiceMavenItems` as known second-stage dry-run discovery sources.
- Maven Data Scope includes every Google Sheets tab that stores data imported, synced, or created from Maven; discovery must also find any other Maven-origin Sheets tabs before import.
- Second-stage Maven discovery must confirm where all Maven-origin Sheets exist and how they link to `Customers_Final`, `BusinessDocuments`, `InvoiceMavenDocuments`, and `ProductsCatalog` before import.
- For every Maven-origin tab, report sheet/tab name, source purpose, expected target table, Customer/BusinessDocument/Product link if any, and classification as active V1 import, later V1 import, or future/historical only.
- Maven discovery is read-only and must not create, modify, sync, or trigger Maven documents.

## 7. Shadow Database Strategy

PostgreSQL V1 must begin as a shadow database.

Approved environment sequence:

- Use Supabase Staging first: `talcompressors-next-staging`.
- Use Supabase Production Shadow second: `talcompressors-next-prod`, only after staging validation passes.
- Do not use local PostgreSQL as the first target.

Shadow rules:

- Production remains AppSheet, Google Sheets, Apps Script, Drive, Maven, and existing email workflows.
- The Next.js app reads only shadow data or local snapshots until cutover approval.
- PostgreSQL V1 may be rebuilt from source during validation.
- No PostgreSQL V1 write path may update production systems.
- No Maven draft, invoice, receipt, email, Drive file, or AppSheet action may be triggered from the shadow database.
- Imported automation commands are historical/trace records until a separate worker design is approved.
- Snapshot/local JSON development remains valid for UI work while PostgreSQL is not approved.
- Required env variable names are `DATABASE_URL`, `DIRECT_URL`, and `NEXT_PUBLIC_APP_ENV`.
- Optional future Supabase env names are `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY`; do not add them until Supabase client features require them.
- Prisma must reconcile `DIRECT_URL` and `ReportEquipmentItem.reportCounter` before any DB push.
- No schema push, migration, import, production cutover, or AppSheet/Sheets/Maven change is approved by this scope.

The first shadow database success criteria:

- Counts match confirmed live validation for `Customers_Final` = 763, `ServiceReports` = 63, and `ReportEquipmentItems` = 109; `ReportEquipmentItems` imported count equals only rows linked to real `ServiceReports`.
- Legacy/test `ReportEquipmentItems` rows excluded from import are reported in validation output.
- Service report list/detail screens can be validated against shadow data without production writes.
- Business document, AI draft, Maven, inventory, and audit tables exist in scope before Prisma is generated.

## 8. Migration Approval Gates

No gate implies permission for the next gate. Each gate requires explicit review and approval.

| Gate | Approval Required Before |
|---|---|
| Scope approval | Generating official `schema.prisma`. |
| Prisma approval | Creating migrations or applying database schema. |
| Database approval | Creating or connecting a PostgreSQL database. |
| Supabase staging approval | Creating `talcompressors-next-staging` and setting staging secrets. |
| Prisma reconciliation approval | Updating Prisma for `DIRECT_URL` and `ReportEquipmentItem.reportCounter` before any DB push. |
| Staging schema approval | Applying schema to Supabase staging. |
| Import design approval | Writing or running migration/import scripts. |
| Read-only import approval | Loading any live source data into shadow PostgreSQL. |
| Production shadow approval | Creating `talcompressors-next-prod` after staging validation passes. |
| UI shadow approval | Switching Next.js from local JSON snapshots to PostgreSQL reads. |
| Write-path design approval | Creating any PostgreSQL-backed workflow that writes business state. |
| Automation worker approval | Processing commands from PostgreSQL. |
| Maven approval | Creating or modifying Maven documents. |
| Email/Drive approval | Sending documents/emails or creating/updating Drive files. |
| Production cutover approval | Replacing AppSheet/Sheets as production source of record. |

## Final Scope Decision

Approved PostgreSQL V1 scope is the full Tal Operating System V1 business schema documented above:

- It includes customer, service, equipment, parts, product, inventory reference/audit, AI draft, business document, automation, Maven, approval, email log, sync state/log, and error log domains.
- It excludes payments and receipts from active V1 and keeps them in Phase 2.
- It excludes duplicate, legacy, UI-only, procurement, security, and governance registry sheets from the active first Prisma schema.
- It requires `ReportEquipmentItems.serviceReport` to be nullable/import-tolerant as a safety rule, imports only rows linked to real `ServiceReports`, excludes legacy/test equipment rows, preserves original source `ReportID` in `source_report_id`, and derives nullable `report_counter` for display/search/audit only.
- It uses Server Actions first for internal Next.js mutations and reserves API routes for external integration surfaces.
- It requires offline-first field work with local pending actions, automatic sync, and conflict review.
- It keeps all production systems untouched until separate explicit approvals.

Next active implementation order after this documentation update:

1. Prisma validate.
2. Supabase staging project creation and secret setup after approval.
3. Import mapping and import validation.
4. Server Actions architecture.
5. Offline queue/PWA sync.
