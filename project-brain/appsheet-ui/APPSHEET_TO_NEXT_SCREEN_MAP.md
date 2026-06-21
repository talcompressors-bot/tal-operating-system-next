# APPSHEET TO NEXT SCREEN MAP

Last updated: 2026-06-21

Current status: `PROPOSED_FROM_REPO_TABLES_ONLY`

This map is not based on a completed live AppSheet UI scan yet. It uses repo evidence from `SHEETS_REGISTRY.md` and `APPSHEET_MAP.md` as a placeholder. Replace `UNKNOWN` view names after Playwright discovery.

| AppSheet View | Purpose | Next.js Route | Component | Data Source | Priority | Migration Notes |
|---|---|---|---|---|---|---|
| UNKNOWN ServiceReports view | Create/view service reports | `/service-reports` | `ServiceReportsPage` | `ServiceReports`, `ReportEquipmentItems`, `Customers_Final` | High | Core operational screen; must preserve report status, counter, signature, Drive links |
| UNKNOWN BusinessDocuments view | Review and approve business documents | `/business-documents` | `BusinessDocumentsPage` | `BusinessDocuments`, `BusinessDocumentItems`, `BusinessDocumentLog` | High | Approval gates must be explicit |
| UNKNOWN AutomationCommands view | Monitor queue commands | `/automation-commands` | `AutomationCommandsPage` | `AutomationCommands` | High | Read-only/admin first; do not expose unsafe retries initially |
| UNKNOWN Customers view | Customer master | `/customers` | `CustomersPage` | `Customers_Final` | Medium | Must avoid duplicate customer folder logic coupling |
| UNKNOWN Catalog view | Product/catalog pricing | `/catalog` | `CatalogPage` | `ProductsCatalog`, `InventoryStock`, `SuppliersProducts` | Medium | Needed for AI Draft pricing confidence |
| UNKNOWN Maven documents view | Maven history | `/maven/documents` | `MavenDocumentsPage` | `InvoiceMavenDocuments`, `InvoiceMavenDocumentItems` | Medium | Start read-only because sync bug exists |
| UNKNOWN Receipts view | Receipt workflow | `/receipts` | `ReceiptsPage` | UNKNOWN | Future | Phase 2 requirements missing |

