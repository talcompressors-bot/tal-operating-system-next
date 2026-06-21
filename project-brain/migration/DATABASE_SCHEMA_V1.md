# DATABASE SCHEMA V1

Created: 2026-06-21  
Status: Draft for review  
Target database: PostgreSQL  
Source system: AppSheet / Google Sheets / Apps Script / Maven sync  
Generation rule: Do not generate Prisma yet.

## Purpose

Define the first PostgreSQL schema for migrating the AppSheet service system to Next.js while preserving existing production behavior.

This schema is based on:

- `project-brain/migration/GAP_REPORT.md`
- `project-brain/migration/MASTER_MIGRATION_SOURCE_OF_TRUTH.md`
- `project-brain/migration/PRISMA_SCHEMA_PLAN.md`

## Core Principles

- Use UUID primary keys for new platform records.
- Preserve AppSheet source IDs as unique external identifiers.
- Keep AppSheet, Apps Script, Maven, Drive, and Google Sheets production flows untouched during migration.
- Build read-only parity first.
- Add write paths only after explicit approval and idempotency design.
- Keep Maven and external integrations behind server-side API/worker boundaries.

---

# 1. Enums

## `source_system`

Values:

- `APPSHEET`
- `GOOGLE_SHEETS`
- `APPS_SCRIPT`
- `MAVEN`
- `NEXTJS`
- `AI`
- `MANUAL`
- `UNKNOWN`

## `service_report_status`

Values:

- `DRAFT`
- `OPEN`
- `SIGNED`
- `SENT`
- `CLOSED`
- `CANCELLED`
- `UNKNOWN`

Mapping note:

- AppSheet Hebrew status values from `ServiceReports` must be mapped during migration.

## `business_document_type`

Values:

- `QUOTE`
- `INVOICE`
- `RECEIPT`
- `SERVICE_DOCUMENT`
- `CREDIT_NOTE`
- `OTHER`
- `UNKNOWN`

## `business_document_status`

Values:

- `DRAFT_RECOMMENDED`
- `WAITING_USER_APPROVAL`
- `APPROVED`
- `DRAFT_REQUEST_RECEIVED`
- `MAVEN_DRAFT_REQUESTED`
- `MAVEN_DRAFT_CREATED`
- `READY_TO_SEND`
- `SENT_TO_CUSTOMER`
- `CANCELLED`
- `ERROR`
- `UNKNOWN`

Mapping note:

- Current Apps Script sets `DraftRequestReceived`.

## `approval_status`

Values:

- `NOT_REQUIRED`
- `PENDING`
- `APPROVED`
- `REJECTED`
- `NEEDS_MORE_INFO`
- `UNKNOWN`

## `automation_command_status`

Values:

- `PENDING`
- `RUNNING`
- `COMPLETED`
- `ERROR`
- `CANCELLED`
- `SKIPPED`

## `automation_command_type`

Values:

- `CREATE_MAVEN_DRAFT`
- `SYNC_MAVEN_DOCUMENTS`
- `SAVE_SERVICE_REPORT_TO_DRIVE`
- `SEND_REPORT_EMAIL`
- `DEDUCT_INVENTORY`
- `CREATE_RECEIPT_DRAFT`
- `UNKNOWN`

## `ai_confidence_level`

Values:

- `HIGH`
- `MEDIUM`
- `LOW`
- `UNKNOWN`

## `match_source`

Values:

- `PRODUCTS_CATALOG`
- `MAVEN_HISTORY`
- `SAME_CUSTOMER_HISTORY`
- `SAME_EQUIPMENT_HISTORY`
- `SIMILAR_SERVICE_HISTORY`
- `AI_ESTIMATE`
- `FIXED_RULE`
- `MANUAL`
- `UNKNOWN`

## `inventory_transaction_type`

Values:

- `RESERVE`
- `DEDUCT`
- `RELEASE`
- `ADJUST`
- `RECOUNT`

## `maven_sync_status`

Values:

- `IMPORTED`
- `SKIPPED`
- `SYNCED`
- `ERROR`
- `STALE`
- `UNKNOWN`

## `payment_method`

Values:

- `BANK_TRANSFER`
- `CREDIT_CARD`
- `CHECK`
- `CASH`
- `OTHER`
- `UNKNOWN`

## `receipt_status`

Values:

- `DETECTED`
- `MATCHED`
- `WAITING_USER_APPROVAL`
- `APPROVED`
- `MAVEN_RECEIPT_CREATED`
- `DUPLICATE_BLOCKED`
- `ERROR`
- `UNKNOWN`

---

# 2. Tables

## 2.1 `customers`

AppSheet source table: `Customers_Final`

Purpose:

Customer master table for service reports, business documents, Maven matching, and receipts.

Columns:

| Column | Type | Constraints | Source |
|---|---|---|---|
| `id` | UUID | PK | Next.js |
| `appsheet_customer_id` | TEXT | UNIQUE, NOT NULL | `Customers_Final.CustomerID` |
| `name` | TEXT | NOT NULL | Hebrew customer name column |
| `contact_name` | TEXT | NULL | `Customers_Final` |
| `phone_primary` | TEXT | NULL | `Customers_Final` |
| `email_primary` | TEXT | NULL | `Customers_Final` |
| `address` | TEXT | NULL | `Customers_Final` |
| `business_id` | TEXT | NULL | tax/business ID column |
| `is_active` | BOOLEAN | DEFAULT true | active flag |
| `raw_source` | JSONB | NULL | full imported row |
| `source_system` | `source_system` | DEFAULT `APPSHEET` | migration |
| `created_at` | TIMESTAMPTZ | NOT NULL DEFAULT now() | platform |
| `updated_at` | TIMESTAMPTZ | NOT NULL DEFAULT now() | platform |

Indexes:

- PK: `customers(id)`
- UNIQUE: `customers(appsheet_customer_id)`
- INDEX: `customers(name)`
- INDEX: `customers(business_id)`
- INDEX: `customers(email_primary)`

---

## 2.2 `service_reports`

AppSheet source table: `ServiceReports`

Purpose:

Main technician service report table and Phase 1 AI document trigger.

Columns:

| Column | Type | Constraints | Source |
|---|---|---|---|
| `id` | UUID | PK | Next.js |
| `appsheet_report_id` | TEXT | UNIQUE, NOT NULL | `ServiceReports.ReportID` |
| `report_counter` | INTEGER | UNIQUE NULL | `ServiceReports.ReportCounter` |
| `report_number_text` | TEXT | NULL | Hebrew report number |
| `customer_id` | UUID | FK -> `customers(id)` NULL | `ServiceReports.CustomerID` |
| `service_date` | DATE | NULL | service date |
| `service_time` | TIME | NULL | service time |
| `technician_name` | TEXT | NULL | technician |
| `report_type` | TEXT | NULL | report type |
| `equipment_type` | TEXT | NULL | equipment type |
| `service_type` | TEXT | NULL | service type |
| `service_description` | TEXT | NULL | service description |
| `work_performed` | TEXT | NULL | work performed |
| `technician_summary` | TEXT | NULL | technician summary |
| `recommendations` | TEXT | NULL | customer recommendations |
| `technician_work_hours` | NUMERIC(10,2) | NULL | work time |
| `status` | `service_report_status` | DEFAULT `UNKNOWN` | mapped status |
| `client_signature_data` | TEXT | NULL | `ClientSign` |
| `technician_signature_data` | TEXT | NULL | technician signature |
| `signed_html_file_url` | TEXT | NULL | `SignedHtmlFileUrl` |
| `customer_folder_id` | TEXT | NULL | `CustomerFolderId` |
| `report_drive_file_id` | TEXT | NULL | `ReportDriveFileId` |
| `business_draft_created` | BOOLEAN | DEFAULT false | `BusinessDraftCreated` |
| `draft_document_type` | TEXT | NULL | `DraftDocumentType` |
| `maven_document_created` | BOOLEAN | DEFAULT false | `MavenDocumentCreated` |
| `maven_sent_to_customer` | BOOLEAN | DEFAULT false | `MavenSentToCustomer` |
| `raw_source` | JSONB | NULL | full imported row |
| `created_at` | TIMESTAMPTZ | NOT NULL DEFAULT now() | platform |
| `updated_at` | TIMESTAMPTZ | NOT NULL DEFAULT now() | platform |

Foreign keys:

- `service_reports.customer_id` -> `customers.id`

Indexes:

- PK: `service_reports(id)`
- UNIQUE: `service_reports(appsheet_report_id)`
- UNIQUE: `service_reports(report_counter)` where not null
- INDEX: `service_reports(customer_id)`
- INDEX: `service_reports(service_date)`
- INDEX: `service_reports(status)`
- INDEX: `service_reports(business_draft_created)`

---

## 2.3 `report_equipment_items`

AppSheet source table: `ReportEquipmentItems`

Purpose:

Equipment/service rows linked to a service report.

Columns:

| Column | Type | Constraints | Source |
|---|---|---|---|
| `id` | UUID | PK | Next.js |
| `appsheet_item_id` | TEXT | UNIQUE, NOT NULL | `ReportEquipmentItems.ItemID` |
| `service_report_id` | UUID | FK -> `service_reports(id)` NOT NULL | `ReportEquipmentItems.ReportID` |
| `equipment_number` | TEXT | NULL | equipment number |
| `equipment_type` | TEXT | NULL | equipment type |
| `equipment_subtype` | TEXT | NULL | equipment subtype |
| `equipment_model` | TEXT | NULL | model |
| `serial_number` | TEXT | NULL | serial |
| `compressor_category` | TEXT | NULL | compressor category |
| `service_description` | TEXT | NULL | service description |
| `current_hours` | NUMERIC(12,2) | NULL | current hours |
| `next_service` | TEXT | NULL | next service |
| `system_status` | TEXT | NULL | system state |
| `technician_recommendations` | TEXT | NULL | summary/recommendations |
| `raw_source` | JSONB | NULL | full imported row |
| `created_at` | TIMESTAMPTZ | NOT NULL DEFAULT now() | platform |
| `updated_at` | TIMESTAMPTZ | NOT NULL DEFAULT now() | platform |

Foreign keys:

- `report_equipment_items.service_report_id` -> `service_reports.id`

Indexes:

- PK: `report_equipment_items(id)`
- UNIQUE: `report_equipment_items(appsheet_item_id)`
- INDEX: `report_equipment_items(service_report_id)`
- INDEX: `report_equipment_items(equipment_model)`
- INDEX: `report_equipment_items(serial_number)`
- INDEX: `report_equipment_items(compressor_category)`

---

## 2.4 `parts_used`

AppSheet source table: `PartsUsed`

Purpose:

Parts replaced/used during service. Used for SKU matching, AI draft generation, and future inventory deduction.

Schema caution:

`SHEETS_REGISTRY.md` says row-1 schema appears incomplete. This table must be verified before write-path migration.

Columns:

| Column | Type | Constraints | Source |
|---|---|---|---|
| `id` | UUID | PK | Next.js |
| `appsheet_part_id` | TEXT | UNIQUE NULL | `PartsUsed` UNKNOWN |
| `service_report_id` | UUID | FK -> `service_reports(id)` NULL | expected report reference |
| `product_id` | UUID | FK -> `products(id)` NULL | matched product |
| `part_name` | TEXT | NULL | expected part name |
| `part_sku` | TEXT | NULL | expected SKU |
| `quantity` | NUMERIC(12,3) | NULL | expected quantity |
| `equipment_reference` | TEXT | NULL | expected equipment link |
| `match_source` | `match_source` | DEFAULT `UNKNOWN` | AI/SKU matching |
| `match_confidence` | INTEGER | NULL CHECK 0-100 | AI/SKU matching |
| `needs_user_approval` | BOOLEAN | DEFAULT true | AI/SKU matching |
| `raw_source` | JSONB | NULL | full imported row |
| `created_at` | TIMESTAMPTZ | NOT NULL DEFAULT now() | platform |
| `updated_at` | TIMESTAMPTZ | NOT NULL DEFAULT now() | platform |

Foreign keys:

- `parts_used.service_report_id` -> `service_reports.id`
- `parts_used.product_id` -> `products.id`

Indexes:

- PK: `parts_used(id)`
- UNIQUE: `parts_used(appsheet_part_id)` where not null
- INDEX: `parts_used(service_report_id)`
- INDEX: `parts_used(product_id)`
- INDEX: `parts_used(part_sku)`
- INDEX: `parts_used(match_source, match_confidence)`

---

## 2.5 `products`

AppSheet source table: `ProductsCatalog`

Purpose:

Master product/SKU catalog for AI Draft pricing, SKU matching, Maven item mapping, and inventory.

Columns:

| Column | Type | Constraints | Source |
|---|---|---|---|
| `id` | UUID | PK | Next.js |
| `appsheet_product_id` | TEXT | UNIQUE, NOT NULL | `ProductsCatalog.ProductID` |
| `sku` | TEXT | UNIQUE NULL | `ProductsCatalog.SKU` |
| `name` | TEXT | NOT NULL | `ProductName` |
| `description` | TEXT | NULL | `ProductDescription` |
| `category` | TEXT | NULL | `Category` |
| `subcategory` | TEXT | NULL | `SubCategory` |
| `brand` | TEXT | NULL | `Brand` |
| `supplier` | TEXT | NULL | `Supplier` |
| `purchase_price` | NUMERIC(12,2) | NULL | `PurchasePrice` |
| `selling_price` | NUMERIC(12,2) | NULL | `SellingPrice` |
| `currency` | TEXT | DEFAULT `ILS` | `Currency` |
| `compatible_equipment` | TEXT | NULL | `CompatibleEquipment` |
| `status` | TEXT | NULL | `Status` |
| `source_system` | `source_system` | DEFAULT `APPSHEET` | `SourceSystem` |
| `raw_source` | JSONB | NULL | full imported row |
| `created_at` | TIMESTAMPTZ | NOT NULL DEFAULT now() | platform |
| `updated_at` | TIMESTAMPTZ | NOT NULL DEFAULT now() | platform |

Indexes:

- PK: `products(id)`
- UNIQUE: `products(appsheet_product_id)`
- UNIQUE: `products(sku)` where not null
- INDEX: `products(name)`
- INDEX: `products(category, subcategory)`
- INDEX: `products(status)`

---

## 2.6 `inventory_stocks`

AppSheet source table: `InventoryStock`

Purpose:

Current stock state per product.

Columns:

| Column | Type | Constraints | Source |
|---|---|---|---|
| `id` | UUID | PK | Next.js |
| `appsheet_stock_id` | TEXT | UNIQUE, NOT NULL | `InventoryStock.StockID` |
| `product_id` | UUID | FK -> `products(id)` NOT NULL | ProductID/SKU |
| `sku` | TEXT | NULL | denormalized SKU |
| `current_quantity` | NUMERIC(12,3) | DEFAULT 0 | `CurrentQuantity` |
| `minimum_quantity` | NUMERIC(12,3) | DEFAULT 0 | `MinimumQuantity` |
| `reserved_quantity` | NUMERIC(12,3) | DEFAULT 0 | `ReservedQuantity` |
| `available_quantity` | NUMERIC(12,3) | DEFAULT 0 | `AvailableQuantity` |
| `warehouse_location` | TEXT | NULL | `WarehouseLocation` |
| `status` | TEXT | NULL | `Status` |
| `last_source_update_at` | TIMESTAMPTZ | NULL | `LastUpdate` |
| `raw_source` | JSONB | NULL | full imported row |
| `created_at` | TIMESTAMPTZ | NOT NULL DEFAULT now() | platform |
| `updated_at` | TIMESTAMPTZ | NOT NULL DEFAULT now() | platform |

Foreign keys:

- `inventory_stocks.product_id` -> `products.id`

Indexes:

- PK: `inventory_stocks(id)`
- UNIQUE: `inventory_stocks(appsheet_stock_id)`
- INDEX: `inventory_stocks(product_id)`
- INDEX: `inventory_stocks(sku)`
- INDEX: `inventory_stocks(status)`

---

## 2.7 `inventory_transactions`

AppSheet source table: none confirmed

Purpose:

Audit-safe inventory movement table for future deduction/reservation logic.

Columns:

| Column | Type | Constraints | Source |
|---|---|---|---|
| `id` | UUID | PK | Next.js |
| `inventory_stock_id` | UUID | FK -> `inventory_stocks(id)` NOT NULL | platform |
| `product_id` | UUID | FK -> `products(id)` NOT NULL | platform |
| `business_document_id` | UUID | FK -> `business_documents(id)` NULL | approved doc |
| `business_document_item_id` | UUID | FK -> `business_document_items(id)` NULL | approved line |
| `type` | `inventory_transaction_type` | NOT NULL | platform |
| `quantity` | NUMERIC(12,3) | NOT NULL | platform |
| `reason` | TEXT | NULL | platform |
| `idempotency_key` | TEXT | UNIQUE NOT NULL | duplicate prevention |
| `approved_by` | TEXT | NULL | approval |
| `approved_at` | TIMESTAMPTZ | NULL | approval |
| `created_at` | TIMESTAMPTZ | NOT NULL DEFAULT now() | platform |

Foreign keys:

- `inventory_transactions.inventory_stock_id` -> `inventory_stocks.id`
- `inventory_transactions.product_id` -> `products.id`
- `inventory_transactions.business_document_id` -> `business_documents.id`
- `inventory_transactions.business_document_item_id` -> `business_document_items.id`

Indexes:

- PK: `inventory_transactions(id)`
- UNIQUE: `inventory_transactions(idempotency_key)`
- INDEX: `inventory_transactions(product_id)`
- INDEX: `inventory_transactions(business_document_id)`
- INDEX: `inventory_transactions(type, created_at)`

---

## 2.8 `ai_draft_suggestions`

AppSheet source table: `AIDraftSuggestions`

Purpose:

Stores AI recommendations before user approval and conversion to BusinessDocuments.

Columns:

| Column | Type | Constraints | Source |
|---|---|---|---|
| `id` | UUID | PK | Next.js |
| `appsheet_suggestion_id` | TEXT | UNIQUE NULL | `SuggestionID` |
| `customer_id` | UUID | FK -> `customers(id)` NULL | `CustomerID` |
| `service_report_id` | UUID | FK -> `service_reports(id)` NULL | `SourceReportID` |
| `related_business_document_id` | UUID | FK -> `business_documents(id)` NULL | `RelatedBusinessDocumentID` |
| `source_type` | TEXT | NULL | `SourceType` |
| `suggested_document_type` | `business_document_type` | DEFAULT `UNKNOWN` | `SuggestedDocumentType` |
| `suggested_title` | TEXT | NULL | `SuggestedTitle` |
| `suggested_items` | JSONB | NULL | `SuggestedItems` |
| `suggested_notes` | TEXT | NULL | `SuggestedNotes` |
| `source_summary` | TEXT | NULL | `SourceSummary` |
| `confidence_level` | `ai_confidence_level` | DEFAULT `UNKNOWN` | `ConfidenceLevel` |
| `requires_approval` | BOOLEAN | DEFAULT true | `RequiresApproval` |
| `approval_status` | `approval_status` | DEFAULT `PENDING` | `ApprovalStatus` |
| `approved_by` | TEXT | NULL | `ApprovedBy` |
| `approved_at` | TIMESTAMPTZ | NULL | derived |
| `ai_reasoning` | TEXT | NULL | `AIReasoning` |
| `suggested_total_amount` | NUMERIC(12,2) | NULL | `SuggestedTotalAmount` |
| `suggested_priority` | TEXT | NULL | `SuggestedPriority` |
| `status` | TEXT | NULL | `Status` |
| `raw_source` | JSONB | NULL | full imported row |
| `created_at` | TIMESTAMPTZ | NOT NULL DEFAULT now() | `CreatedDate` / platform |
| `updated_at` | TIMESTAMPTZ | NOT NULL DEFAULT now() | platform |

Foreign keys:

- `ai_draft_suggestions.customer_id` -> `customers.id`
- `ai_draft_suggestions.service_report_id` -> `service_reports.id`
- `ai_draft_suggestions.related_business_document_id` -> `business_documents.id`

Indexes:

- PK: `ai_draft_suggestions(id)`
- UNIQUE: `ai_draft_suggestions(appsheet_suggestion_id)` where not null
- INDEX: `ai_draft_suggestions(customer_id)`
- INDEX: `ai_draft_suggestions(service_report_id)`
- INDEX: `ai_draft_suggestions(approval_status)`
- INDEX: `ai_draft_suggestions(confidence_level)`

---

## 2.9 `business_documents`

AppSheet source table: `BusinessDocuments`

Purpose:

Main commercial document staging table for quotes, invoices, receipts, service documents, and Maven drafts.

Columns:

| Column | Type | Constraints | Source |
|---|---|---|---|
| `id` | UUID | PK | Next.js |
| `appsheet_business_document_id` | TEXT | UNIQUE, NOT NULL | `BusinessDocumentId` |
| `customer_id` | UUID | FK -> `customers(id)` NULL | `CustomerId` |
| `service_report_id` | UUID | FK -> `service_reports(id)` NULL | `SourceReportId` |
| `ai_draft_suggestion_id` | UUID | FK -> `ai_draft_suggestions(id)` NULL | derived |
| `source_report_counter` | INTEGER | NULL | `SourceReportCounter` |
| `source_document_id` | TEXT | NULL | `SourceDocumentId` |
| `document_type_suggested` | `business_document_type` | DEFAULT `UNKNOWN` | `DocumentTypeSuggested` |
| `document_type_selected` | `business_document_type` | DEFAULT `UNKNOWN` | `DocumentTypeSelected` |
| `ai_reasoning` | TEXT | NULL | `AIReasoning` |
| `status` | `business_document_status` | DEFAULT `UNKNOWN` | `DocumentStatus` |
| `draft_title` | TEXT | NULL | `DraftTitle` |
| `description` | TEXT | NULL | `DocumentDescription` |
| `items_json` | JSONB | NULL | `ItemsJson` |
| `subtotal_amount` | NUMERIC(12,2) | NULL | `SubtotalAmount` |
| `vat_amount` | NUMERIC(12,2) | NULL | `VATAmount` |
| `total_amount` | NUMERIC(12,2) | NULL | `TotalAmount` |
| `currency` | TEXT | DEFAULT `ILS` | `Currency` |
| `approval_status` | `approval_status` | DEFAULT `PENDING` | `ApprovalStatus` |
| `approved_by` | TEXT | NULL | `ApprovedBy` |
| `approved_at` | TIMESTAMPTZ | NULL | `ApprovedAt` |
| `maven_document_id` | UUID | FK -> `maven_documents(id)` NULL | mapped from MavenDocumentId |
| `maven_document_number` | TEXT | NULL | `MavenDocumentNumber` |
| `maven_pdf_link` | TEXT | NULL | `MavenPdfLink` |
| `send_by_email` | BOOLEAN | DEFAULT false | `SendByEmail` |
| `send_by_whatsapp` | BOOLEAN | DEFAULT false | `SendByWhatsApp` |
| `selected_emails` | TEXT | NULL | `SelectedEmails` |
| `selected_phones` | TEXT | NULL | `SelectedPhones` |
| `send_status` | TEXT | NULL | `SendStatus` |
| `send_approved_by` | TEXT | NULL | `SendApprovedBy` |
| `send_approved_at` | TIMESTAMPTZ | NULL | `SendApprovedAt` |
| `processing_command_id` | UUID | FK -> `automation_commands(id)` NULL | `ProcessingCommandId` |
| `processing_started_at` | TIMESTAMPTZ | NULL | `ProcessingStartedAt` |
| `source_system` | `source_system` | DEFAULT `APPSHEET` | `SourceSystem` |
| `notes` | TEXT | NULL | `Notes` |
| `raw_source` | JSONB | NULL | full imported row |
| `created_at` | TIMESTAMPTZ | NOT NULL DEFAULT now() | `CreatedAt` |
| `updated_at` | TIMESTAMPTZ | NOT NULL DEFAULT now() | `UpdatedAt` |

Foreign keys:

- `business_documents.customer_id` -> `customers.id`
- `business_documents.service_report_id` -> `service_reports.id`
- `business_documents.ai_draft_suggestion_id` -> `ai_draft_suggestions.id`
- `business_documents.maven_document_id` -> `maven_documents.id`
- `business_documents.processing_command_id` -> `automation_commands.id`

Indexes:

- PK: `business_documents(id)`
- UNIQUE: `business_documents(appsheet_business_document_id)`
- INDEX: `business_documents(customer_id)`
- INDEX: `business_documents(service_report_id)`
- INDEX: `business_documents(status)`
- INDEX: `business_documents(approval_status)`
- INDEX: `business_documents(processing_command_id)`
- INDEX: `business_documents(maven_document_number)`

Cycle note:

- `business_documents.processing_command_id` and `automation_commands.business_document_id` form a useful operational relationship but may require nullable FKs or deferred relation handling in Prisma.

---

## 2.10 `business_document_items`

AppSheet source table: `BusinessDocumentItems`

Purpose:

Line items for BusinessDocuments.

Columns:

| Column | Type | Constraints | Source |
|---|---|---|---|
| `id` | UUID | PK | Next.js |
| `appsheet_item_id` | TEXT | UNIQUE, NOT NULL | `ItemID` |
| `business_document_id` | UUID | FK -> `business_documents(id)` NOT NULL | `DocumentID` |
| `product_id` | UUID | FK -> `products(id)` NULL | `ItemId` / matched product |
| `item_name` | TEXT | NOT NULL | `ItemName` |
| `description` | TEXT | NULL | `Description` |
| `quantity` | NUMERIC(12,3) | NOT NULL DEFAULT 1 | `Quantity` |
| `unit_price` | NUMERIC(12,2) | NULL | `UnitPrice` |
| `total_price` | NUMERIC(12,2) | NULL | `TotalPrice` |
| `source` | `match_source` | DEFAULT `UNKNOWN` | `Source` |
| `item_type` | TEXT | NULL | `ItemType` |
| `needs_price_approval` | BOOLEAN | DEFAULT true | `NeedsPriceApproval` |
| `match_confidence` | INTEGER | NULL CHECK 0-100 | AI matching |
| `raw_source` | JSONB | NULL | full imported row |
| `created_at` | TIMESTAMPTZ | NOT NULL DEFAULT now() | platform |
| `updated_at` | TIMESTAMPTZ | NOT NULL DEFAULT now() | platform |

Foreign keys:

- `business_document_items.business_document_id` -> `business_documents.id`
- `business_document_items.product_id` -> `products.id`

Indexes:

- PK: `business_document_items(id)`
- UNIQUE: `business_document_items(appsheet_item_id)`
- INDEX: `business_document_items(business_document_id)`
- INDEX: `business_document_items(product_id)`
- INDEX: `business_document_items(needs_price_approval)`

---

## 2.11 `business_document_logs`

AppSheet source table: `BusinessDocumentLog`

Purpose:

Audit log for business document actions and migration traceability.

Columns:

| Column | Type | Constraints | Source |
|---|---|---|---|
| `id` | UUID | PK | Next.js |
| `appsheet_log_id` | TEXT | UNIQUE NULL | `LogID` |
| `business_document_id` | UUID | FK -> `business_documents(id)` NULL | `DocumentID` |
| `action` | TEXT | NOT NULL | `Action` |
| `performed_by` | TEXT | NULL | `PerformedBy` |
| `result` | TEXT | NULL | `Result` |
| `notes` | TEXT | NULL | `Notes` |
| `raw_data` | JSONB | NULL | `RawData` |
| `created_at` | TIMESTAMPTZ | NOT NULL DEFAULT now() | `DateTime` |

Foreign keys:

- `business_document_logs.business_document_id` -> `business_documents.id`

Indexes:

- PK: `business_document_logs(id)`
- UNIQUE: `business_document_logs(appsheet_log_id)` where not null
- INDEX: `business_document_logs(business_document_id)`
- INDEX: `business_document_logs(action)`
- INDEX: `business_document_logs(created_at)`

---

## 2.12 `automation_commands`

AppSheet source table: `AutomationCommands`

Purpose:

Database-backed command queue replacing AppSheet Bot + Apps Script queue.

Columns:

| Column | Type | Constraints | Source |
|---|---|---|---|
| `id` | UUID | PK | Next.js |
| `appsheet_command_id` | TEXT | UNIQUE NULL | `CommandID` |
| `business_document_id` | UUID | FK -> `business_documents(id)` NULL | `BusinessDocumentId` |
| `command_name` | TEXT | NULL | `CommandName` |
| `command_type` | `automation_command_type` | NOT NULL | `Command` / `CommandType` |
| `status` | `automation_command_status` | DEFAULT `PENDING` | `Status` |
| `requested_by` | TEXT | NULL | `RequestedBy` |
| `requested_at` | TIMESTAMPTZ | NULL | `RequestedAt` |
| `result` | TEXT | NULL | `Result` |
| `completed_at` | TIMESTAMPTZ | NULL | `CompletedAt` |
| `processed_at` | TIMESTAMPTZ | NULL | `ProcessedAt` |
| `error_message` | TEXT | NULL | `ErrorMessage` |
| `notes` | TEXT | NULL | `Notes` |
| `idempotency_key` | TEXT | UNIQUE NULL | platform duplicate prevention |
| `payload` | JSONB | NULL | webhook/request payload |
| `raw_source` | JSONB | NULL | full imported row |
| `created_at` | TIMESTAMPTZ | NOT NULL DEFAULT now() | platform |
| `updated_at` | TIMESTAMPTZ | NOT NULL DEFAULT now() | platform |

Foreign keys:

- `automation_commands.business_document_id` -> `business_documents.id`

Indexes:

- PK: `automation_commands(id)`
- UNIQUE: `automation_commands(appsheet_command_id)` where not null
- UNIQUE: `automation_commands(idempotency_key)` where not null
- INDEX: `automation_commands(status)`
- INDEX: `automation_commands(command_type)`
- INDEX: `automation_commands(business_document_id)`
- INDEX: `automation_commands(requested_at)`

---

## 2.13 `maven_customers`

AppSheet source table: `InvoiceMavenCustomers`

Purpose:

Synced Maven customer reference data.

Columns:

| Column | Type | Constraints | Source |
|---|---|---|---|
| `id` | UUID | PK | Next.js |
| `maven_customer_id` | TEXT | UNIQUE, NOT NULL | `InvoiceMavenCustomerId` |
| `customer_id` | UUID | FK -> `customers(id)` NULL | matched local customer |
| `name` | TEXT | NULL | `CustomerName` |
| `business_id` | TEXT | NULL | `BusinessID` |
| `phone` | TEXT | NULL | `Phone` |
| `email` | TEXT | NULL | `Email` |
| `address` | TEXT | NULL | `Address` |
| `city` | TEXT | NULL | `City` |
| `sync_status` | `maven_sync_status` | DEFAULT `UNKNOWN` | `SyncStatus` |
| `raw_json` | JSONB | NULL | `RawJson` |
| `last_sync_at` | TIMESTAMPTZ | NULL | `LastSyncDate` |
| `notes` | TEXT | NULL | `Notes` |
| `created_at` | TIMESTAMPTZ | NOT NULL DEFAULT now() | platform |
| `updated_at` | TIMESTAMPTZ | NOT NULL DEFAULT now() | platform |

Foreign keys:

- `maven_customers.customer_id` -> `customers.id`

Indexes:

- PK: `maven_customers(id)`
- UNIQUE: `maven_customers(maven_customer_id)`
- INDEX: `maven_customers(customer_id)`
- INDEX: `maven_customers(name)`
- INDEX: `maven_customers(business_id)`

---

## 2.14 `maven_documents`

AppSheet source table: `InvoiceMavenDocuments`

Purpose:

Synced Maven document headers and future created Maven draft/receipt references.

Columns:

| Column | Type | Constraints | Source |
|---|---|---|---|
| `id` | UUID | PK | Next.js |
| `maven_document_id` | TEXT | UNIQUE, NOT NULL | `InvoiceMavenDocumentId` / Maven id |
| `business_document_id` | UUID | FK -> `business_documents(id)` NULL | `LinkedBusinessDocumentID` |
| `customer_id` | UUID | FK -> `customers(id)` NULL | matched customer |
| `maven_customer_id` | UUID | FK -> `maven_customers(id)` NULL | Maven customer |
| `document_number` | TEXT | NULL | `DocumentNumber` |
| `document_type` | `business_document_type` | DEFAULT `UNKNOWN` | `DocumentType` |
| `document_type_text` | TEXT | NULL | `DocumentTypeText` |
| `document_date` | DATE | NULL | `DocumentDate` |
| `total_amount` | NUMERIC(12,2) | NULL | `TotalAmount` |
| `vat_amount` | NUMERIC(12,2) | NULL | `VAT` |
| `status` | TEXT | NULL | `Status` |
| `payment_status` | TEXT | NULL | `PaymentStatus` |
| `payment_method` | `payment_method` | DEFAULT `UNKNOWN` | `PaymentMethod` |
| `paid_date` | DATE | NULL | `PaidDate` |
| `pdf_link` | TEXT | NULL | `PdfLink` |
| `document_year` | INTEGER | NULL | `DocumentYear` |
| `document_month` | INTEGER | NULL | `DocumentMonth` |
| `customer_name_clean` | TEXT | NULL | `CustomerNameClean` |
| `sync_status` | `maven_sync_status` | DEFAULT `UNKNOWN` | `SyncStatus` |
| `raw_json` | JSONB | NULL | `RawJson` |
| `last_sync_at` | TIMESTAMPTZ | NULL | `LastSyncDate` |
| `notes` | TEXT | NULL | `Notes` |
| `created_at` | TIMESTAMPTZ | NOT NULL DEFAULT now() | platform |
| `updated_at` | TIMESTAMPTZ | NOT NULL DEFAULT now() | platform |

Foreign keys:

- `maven_documents.business_document_id` -> `business_documents.id`
- `maven_documents.customer_id` -> `customers.id`
- `maven_documents.maven_customer_id` -> `maven_customers.id`

Indexes:

- PK: `maven_documents(id)`
- UNIQUE: `maven_documents(maven_document_id)`
- INDEX: `maven_documents(document_number)`
- INDEX: `maven_documents(customer_id)`
- INDEX: `maven_documents(document_date)`
- INDEX: `maven_documents(document_type)`
- INDEX: `maven_documents(payment_status)`
- INDEX: `maven_documents(business_document_id)`

---

## 2.15 `maven_document_items`

AppSheet source table: `InvoiceMavenDocumentItems`

Purpose:

Synced Maven document line items used for historical pricing and document traceability.

Columns:

| Column | Type | Constraints | Source |
|---|---|---|---|
| `id` | UUID | PK | Next.js |
| `maven_item_row_id` | TEXT | UNIQUE, NOT NULL | `ItemRowId` |
| `maven_document_id` | UUID | FK -> `maven_documents(id)` NOT NULL | `MavenDocumentId` |
| `customer_id` | UUID | FK -> `customers(id)` NULL | matched customer |
| `document_number` | TEXT | NULL | `DocumentNumber` |
| `document_date` | DATE | NULL | `DocumentDate` |
| `document_type` | `business_document_type` | DEFAULT `UNKNOWN` | `DocumentType` |
| `item_description` | TEXT | NULL | `ItemDescription` |
| `quantity` | NUMERIC(12,3) | NULL | `Quantity` |
| `unit_price` | NUMERIC(12,2) | NULL | `UnitPrice` |
| `line_total` | NUMERIC(12,2) | NULL | `LineTotal` |
| `currency` | TEXT | DEFAULT `ILS` | `Currency` |
| `raw_item` | JSONB | NULL | `RawItem` |
| `imported_at` | TIMESTAMPTZ | NULL | `ImportedAt` |
| `created_at` | TIMESTAMPTZ | NOT NULL DEFAULT now() | platform |
| `updated_at` | TIMESTAMPTZ | NOT NULL DEFAULT now() | platform |

Foreign keys:

- `maven_document_items.maven_document_id` -> `maven_documents.id`
- `maven_document_items.customer_id` -> `customers.id`

Indexes:

- PK: `maven_document_items(id)`
- UNIQUE: `maven_document_items(maven_item_row_id)`
- INDEX: `maven_document_items(maven_document_id)`
- INDEX: `maven_document_items(customer_id)`
- INDEX: `maven_document_items(item_description)`
- INDEX: `maven_document_items(document_date)`

---

## 2.16 `maven_items`

AppSheet source table: `InvoiceMavenItems`

Purpose:

Synced Maven item/product catalog reference.

Columns:

| Column | Type | Constraints | Source |
|---|---|---|---|
| `id` | UUID | PK | Next.js |
| `maven_item_id` | TEXT | UNIQUE, NOT NULL | `InvoiceMavenItemId` |
| `product_id` | UUID | FK -> `products(id)` NULL | `LinkedProductID` |
| `sku` | TEXT | NULL | `SKU` |
| `external_item_number` | TEXT | NULL | `ExternalItemNumber` |
| `item_name` | TEXT | NULL | `ItemName` |
| `item_description` | TEXT | NULL | `ItemDescription` |
| `unit_price` | NUMERIC(12,2) | NULL | `UnitPrice` |
| `purchase_price` | NUMERIC(12,2) | NULL | `PurchasePrice` |
| `currency` | TEXT | DEFAULT `ILS` | `Currency` |
| `stock_quantity` | NUMERIC(12,3) | NULL | `StockQuantity` |
| `sync_status` | `maven_sync_status` | DEFAULT `UNKNOWN` | `SyncStatus` |
| `raw_json` | JSONB | NULL | `RawJson` |
| `last_sync_at` | TIMESTAMPTZ | NULL | `LastSyncDate` |
| `notes` | TEXT | NULL | `Notes` |
| `created_at` | TIMESTAMPTZ | NOT NULL DEFAULT now() | platform |
| `updated_at` | TIMESTAMPTZ | NOT NULL DEFAULT now() | platform |

Foreign keys:

- `maven_items.product_id` -> `products.id`

Indexes:

- PK: `maven_items(id)`
- UNIQUE: `maven_items(maven_item_id)`
- INDEX: `maven_items(product_id)`
- INDEX: `maven_items(sku)`
- INDEX: `maven_items(item_name)`

---

## 2.17 `approvals`

AppSheet source table: `ApprovalsLog`

Purpose:

Generic approval audit trail for AI drafts, business documents, Maven creation, sends, receipts, and inventory deductions.

Columns:

| Column | Type | Constraints | Source |
|---|---|---|---|
| `id` | UUID | PK | Next.js |
| `appsheet_approval_id` | TEXT | UNIQUE NULL | `ApprovalID` |
| `action_type` | TEXT | NOT NULL | `ActionType` |
| `related_table` | TEXT | NULL | platform |
| `related_id` | UUID | NULL | platform |
| `status` | `approval_status` | DEFAULT `PENDING` | `Status` |
| `approved_by` | TEXT | NULL | `ApprovedBy` |
| `notes` | TEXT | NULL | `Notes` |
| `created_at` | TIMESTAMPTZ | NOT NULL DEFAULT now() | `DateTime` |

Indexes:

- PK: `approvals(id)`
- UNIQUE: `approvals(appsheet_approval_id)` where not null
- INDEX: `approvals(action_type)`
- INDEX: `approvals(related_table, related_id)`
- INDEX: `approvals(status)`
- INDEX: `approvals(created_at)`

---

## 2.18 `email_logs`

AppSheet source table: `EmailLog`

Purpose:

Email delivery audit log.

Schema caution:

`SHEETS_REGISTRY.md` says row-1 schema appears incomplete.

Columns:

| Column | Type | Constraints | Source |
|---|---|---|---|
| `id` | UUID | PK | Next.js |
| `service_report_id` | UUID | FK -> `service_reports(id)` NULL | derived |
| `business_document_id` | UUID | FK -> `business_documents(id)` NULL | derived |
| `recipient_emails` | TEXT | NULL | email payload |
| `subject` | TEXT | NULL | email payload |
| `status` | TEXT | NULL | delivery status |
| `error_message` | TEXT | NULL | failure |
| `raw_source` | JSONB | NULL | full imported row |
| `sent_at` | TIMESTAMPTZ | NULL | delivery timestamp |
| `created_at` | TIMESTAMPTZ | NOT NULL DEFAULT now() | platform |

Foreign keys:

- `email_logs.service_report_id` -> `service_reports.id`
- `email_logs.business_document_id` -> `business_documents.id`

Indexes:

- PK: `email_logs(id)`
- INDEX: `email_logs(service_report_id)`
- INDEX: `email_logs(business_document_id)`
- INDEX: `email_logs(sent_at)`
- INDEX: `email_logs(status)`

---

## 2.19 `sync_states`

AppSheet source table: `SyncState`

Purpose:

Stores sync checkpoints such as Maven pagination state.

Columns:

| Column | Type | Constraints | Source |
|---|---|---|---|
| `id` | UUID | PK | Next.js |
| `source` | TEXT | NOT NULL | `Source` |
| `key` | TEXT | NOT NULL | `Key` |
| `value` | TEXT | NULL | `Value` |
| `updated_at` | TIMESTAMPTZ | NOT NULL DEFAULT now() | `UpdatedAt` |

Indexes:

- PK: `sync_states(id)`
- UNIQUE: `sync_states(source, key)`
- INDEX: `sync_states(updated_at)`

---

## 2.20 `sync_logs`

AppSheet source table: `SyncLog`

Purpose:

Sync execution history.

Columns:

| Column | Type | Constraints | Source |
|---|---|---|---|
| `id` | UUID | PK | Next.js |
| `source` | TEXT | NOT NULL | `Source` |
| `added_count` | INTEGER | DEFAULT 0 | `Added` |
| `skipped_count` | INTEGER | DEFAULT 0 | `Skipped` |
| `status` | `maven_sync_status` | DEFAULT `UNKNOWN` | `Status` |
| `notes` | TEXT | NULL | `Notes` |
| `created_at` | TIMESTAMPTZ | NOT NULL DEFAULT now() | first column/date |

Indexes:

- PK: `sync_logs(id)`
- INDEX: `sync_logs(source)`
- INDEX: `sync_logs(status)`
- INDEX: `sync_logs(created_at)`

---

## 2.21 `error_logs`

AppSheet source table: `ErrorLog`

Purpose:

Error logging for Maven, automation, and future Next.js jobs.

Columns:

| Column | Type | Constraints | Source |
|---|---|---|---|
| `id` | UUID | PK | Next.js |
| `source` | TEXT | NOT NULL | `Source` |
| `function_name` | TEXT | NULL | `FunctionName` |
| `error_message` | TEXT | NOT NULL | `ErrorMessage` |
| `raw_error` | JSONB | NULL | `RawError` |
| `status` | TEXT | NULL | `Status` |
| `created_at` | TIMESTAMPTZ | NOT NULL DEFAULT now() | `DateTime` |

Indexes:

- PK: `error_logs(id)`
- INDEX: `error_logs(source)`
- INDEX: `error_logs(function_name)`
- INDEX: `error_logs(status)`
- INDEX: `error_logs(created_at)`

---

## 2.22 `payments`

AppSheet source table: none found / Phase 2 target

Purpose:

Payment evidence/input table for automatic receipt generation.

Columns:

| Column | Type | Constraints | Source |
|---|---|---|---|
| `id` | UUID | PK | Next.js |
| `customer_id` | UUID | FK -> `customers(id)` NULL | matched customer |
| `maven_document_id` | UUID | FK -> `maven_documents(id)` NULL | matched open document |
| `amount` | NUMERIC(12,2) | NOT NULL | payment evidence |
| `currency` | TEXT | DEFAULT `ILS` | payment evidence |
| `payment_method` | `payment_method` | DEFAULT `UNKNOWN` | payment evidence |
| `payment_date` | DATE | NULL | payment evidence |
| `reference_number` | TEXT | NULL | bank/check/card ref |
| `evidence_url` | TEXT | NULL | optional Drive/file link |
| `match_confidence` | INTEGER | NULL CHECK 0-100 | matching |
| `requires_review` | BOOLEAN | DEFAULT true | matching |
| `raw_evidence` | JSONB | NULL | imported evidence |
| `created_at` | TIMESTAMPTZ | NOT NULL DEFAULT now() | platform |
| `updated_at` | TIMESTAMPTZ | NOT NULL DEFAULT now() | platform |

Foreign keys:

- `payments.customer_id` -> `customers.id`
- `payments.maven_document_id` -> `maven_documents.id`

Indexes:

- PK: `payments(id)`
- INDEX: `payments(customer_id)`
- INDEX: `payments(maven_document_id)`
- INDEX: `payments(payment_date)`
- INDEX: `payments(payment_method)`
- INDEX: `payments(reference_number)`

---

## 2.23 `receipts`

AppSheet source table: none found / Phase 2 target

Purpose:

Receipt draft and Maven receipt tracking.

Columns:

| Column | Type | Constraints | Source |
|---|---|---|---|
| `id` | UUID | PK | Next.js |
| `payment_id` | UUID | FK -> `payments(id)` NOT NULL | payment |
| `customer_id` | UUID | FK -> `customers(id)` NULL | matched customer |
| `business_document_id` | UUID | FK -> `business_documents(id)` NULL | receipt business doc |
| `maven_receipt_document_id` | UUID | FK -> `maven_documents(id)` NULL | Maven receipt |
| `status` | `receipt_status` | DEFAULT `DETECTED` | platform |
| `amount` | NUMERIC(12,2) | NOT NULL | payment/receipt amount |
| `currency` | TEXT | DEFAULT `ILS` | platform |
| `duplicate_key` | TEXT | UNIQUE NOT NULL | duplicate prevention |
| `approval_status` | `approval_status` | DEFAULT `PENDING` | approval |
| `approved_by` | TEXT | NULL | approval |
| `approved_at` | TIMESTAMPTZ | NULL | approval |
| `notes` | TEXT | NULL | platform |
| `created_at` | TIMESTAMPTZ | NOT NULL DEFAULT now() | platform |
| `updated_at` | TIMESTAMPTZ | NOT NULL DEFAULT now() | platform |

Foreign keys:

- `receipts.payment_id` -> `payments.id`
- `receipts.customer_id` -> `customers.id`
- `receipts.business_document_id` -> `business_documents.id`
- `receipts.maven_receipt_document_id` -> `maven_documents.id`

Indexes:

- PK: `receipts(id)`
- UNIQUE: `receipts(duplicate_key)`
- INDEX: `receipts(payment_id)`
- INDEX: `receipts(customer_id)`
- INDEX: `receipts(status)`
- INDEX: `receipts(approval_status)`

---

# 3. AppSheet Source Mapping Summary

| PostgreSQL Table | AppSheet / Sheet Source | Migration Status |
|---|---|---|
| `customers` | `Customers_Final` | Required V1 |
| `service_reports` | `ServiceReports` | Required V1 |
| `report_equipment_items` | `ReportEquipmentItems` | Required V1 |
| `parts_used` | `PartsUsed` | Required but schema needs verification |
| `products` | `ProductsCatalog` | Required V1 |
| `inventory_stocks` | `InventoryStock` | Required for inventory phase |
| `inventory_transactions` | none confirmed | New V1 platform table |
| `ai_draft_suggestions` | `AIDraftSuggestions` | Required V1 |
| `business_documents` | `BusinessDocuments` | Required V1 |
| `business_document_items` | `BusinessDocumentItems` | Required V1 |
| `business_document_logs` | `BusinessDocumentLog` | Required V1 |
| `automation_commands` | `AutomationCommands` | Required V1 |
| `maven_customers` | `InvoiceMavenCustomers` | Required Maven sync |
| `maven_documents` | `InvoiceMavenDocuments` | Required Maven sync |
| `maven_document_items` | `InvoiceMavenDocumentItems` | Required Maven sync / pricing |
| `maven_items` | `InvoiceMavenItems` | Required product matching |
| `approvals` | `ApprovalsLog` | Required governance |
| `email_logs` | `EmailLog` | Optional/read-only until schema verified |
| `sync_states` | `SyncState` | Required Maven sync |
| `sync_logs` | `SyncLog` | Required observability |
| `error_logs` | `ErrorLog` | Required observability |
| `payments` | none found | Phase 2 new table |
| `receipts` | none found | Phase 2 new table |

---

# 4. Relationship Summary

```text
customers
-> service_reports
-> report_equipment_items
-> parts_used

customers
-> ai_draft_suggestions
-> business_documents
-> business_document_items
-> automation_commands

products
-> parts_used
products
-> business_document_items
products
-> inventory_stocks
products
-> maven_items

business_documents
-> maven_documents
-> maven_document_items

payments
-> receipts
-> maven_documents
```

---

# 5. Index Strategy Summary

Required index groups:

- Source ID uniqueness:
  - `appsheet_*_id`
  - `maven_*_id`
- Workflow lookup:
  - service report by customer/date/status
  - business document by status/approval/customer/service report
  - automation command by status/type/business document
- Matching:
  - product SKU/name
  - equipment model/serial/category
  - Maven item description/document date/customer
- Safety:
  - automation idempotency key
  - inventory transaction idempotency key
  - receipt duplicate key

---

# 6. Open Decisions Before Prisma

Do not generate Prisma until these are reviewed:

1. Should `business_documents.processing_command_id` be a real FK to `automation_commands.id`, or stored as source ID text to avoid relation cycles?
2. Should `parts_used` be included in V1 despite incomplete source schema?
3. Should `payments` and `receipts` be included in initial Prisma schema or deferred to Phase 2?
4. Should Maven documents use separate text `maven_document_external_id` naming to avoid collision with internal UUID `id`?
5. Which Hebrew enum/status values map to each English enum?
6. Should Drive file/folder IDs remain on `service_reports`, or move to a separate `document_files` table later?
7. Should `EmailLog` be modeled now or kept as raw imported logs until schema is verified?

## Next Step

Review this file, then update `PRISMA_SCHEMA_PLAN.md` with final model names and relation decisions. Only after review should `schema.prisma` be generated.

