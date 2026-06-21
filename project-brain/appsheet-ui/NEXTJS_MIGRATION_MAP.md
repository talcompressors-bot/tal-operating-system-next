# NEXTJS MIGRATION MAP

Last updated: 2026-06-21
Strategy: metadata-first AppSheet migration

## Migration Blocker

Full runtime crawling is blocked by AppSheet licensing:

- Invalid subscription plan
- User Signin not allowed with FREE plan
- Document Process task not allowed with FREE plan

Therefore, Next.js migration mapping must be built from AppSheet metadata exports and repo evidence, not from runtime UI crawling.

## Route Map

| Priority | AppSheet Area | Current Source | Next.js Route | Component | Data Source | Initial Mode | Migration Notes |
|---|---|---|---|---|---|---|---|
| P0 | Service Reports | ServiceReports | `/service-reports` | `ServiceReportsPage` | Google Sheets / future API | Read/write after approval | Preserve ReportCounter, signature, Drive links |
| P0 | Service Report Detail | ServiceReports + ReportEquipmentItems | `/service-reports/[id]` | `ServiceReportDetailPage` | Google Sheets / future API | Read-first | Child equipment rows required |
| P0 | Business Documents | BusinessDocuments | `/business-documents` | `BusinessDocumentsPage` | Google Sheets / future API | Approval-gated | Separate draft status from queue status |
| P0 | Business Document Detail | BusinessDocuments + BusinessDocumentItems | `/business-documents/[id]` | `BusinessDocumentDetailPage` | Google Sheets / future API | Read-first | Maven payload later |
| P0 | Automation Queue | AutomationCommands | `/automation-commands` | `AutomationCommandsPage` | Google Sheets / future API | Read-only first | Do not expose unsafe retries initially |
| P1 | Customers | Customers_Final | `/customers` | `CustomersPage` | Google Sheets / future API | Read-first | Avoid duplicate folder side effects |
| P1 | Product Catalog | ProductsCatalog | `/catalog` | `CatalogPage` | Google Sheets / future API | Read-first | Pricing source for AI Draft |
| P1 | Maven Documents | InvoiceMavenDocuments | `/maven/documents` | `MavenDocumentsPage` | Google Sheets / future API | Read-only | Maven sync bug exists |
| P1 | Maven Items | InvoiceMavenDocumentItems | `/maven/document-items` | `MavenDocumentItemsPage` | Google Sheets / future API | Read-only | Historical pricing source |
| P2 | Inventory | InventoryStock | `/inventory` | `InventoryPage` | Google Sheets / future API | Read-first | Future inventory update flow |
| P2 | Suppliers Products | SuppliersProducts | `/suppliers/products` | `SupplierProductsPage` | Google Sheets / future API | Read-first | Procurement support |
| P2 | AI Draft Suggestions | AIDraftSuggestions | `/ai-draft/suggestions` | `AIDraftSuggestionsPage` | Google Sheets / future API | Read-only first | May overlap BusinessDocuments |
| P2 | Sync Logs | SyncLog / ErrorLog / SyncState | `/sync` | `SyncDashboardPage` | Google Sheets / future API | Read-only | Admin only |
| P2 | System Health | AutomationRegistry / HealthCheckRegistry / SystemHealthLog | `/admin/health` | `SystemHealthPage` | Google Sheets / future API | Read-only | Admin only |
| P3 | Receipts | UNKNOWN | `/receipts` | `ReceiptsPage` | UNKNOWN | Planning | Phase 2 missing implementation |

## Metadata Needed Before Build

| Metadata Type | Needed For | Status |
|---|---|---|
| AppSheet table settings | Column behavior, keys, refs, forms | MISSING_EXPORT |
| AppSheet views | Route/component parity | MISSING_EXPORT |
| AppSheet actions | Buttons, workflows, safety gating | MISSING_EXPORT |
| AppSheet bots/processes/tasks | Backend workflow migration | MISSING_EXPORT |
| Slices | Filtered views and permissions | MISSING_EXPORT |
| Security filters | Authorization model | MISSING_EXPORT |
| UX/navigation config | Sidebar/tabs/menu design | MISSING_EXPORT |

## Build Rule

Do not implement production Next.js write flows until:

1. AppSheet metadata is exported or manually documented.
2. Each action is classified as read-only, write, customer-facing, financial, Drive-write, or backend execution.
3. Each write path has explicit approval, test, rollback, and idempotency design.

