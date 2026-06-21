# APPSHEET OBJECT INVENTORY

Last updated: 2026-06-21
Discovery mode: metadata-first, runtime crawling blocked by AppSheet licensing

| Object | Object Type | Purpose | Related Table/Data | Source Evidence | Status | Next.js Target | Notes |
|---|---|---|---|---|---|---|---|
| ServiceReports | Table | Main service report header | `ServiceReports` | `SHEETS_REGISTRY.md`, `APPSHEET_MAP.md` | ACTIVE_CONFIRMED | `/service-reports` | Core operational object |
| ReportEquipmentItems | Table | Equipment rows linked to service reports | `ReportEquipmentItems` | `SHEETS_REGISTRY.md`, `APPSHEET_MAP.md` | ACTIVE_CONFIRMED | `/service-reports/[id]/equipment` | Child of ServiceReports |
| Customers_Final | Table | Active customer master | `Customers_Final` | `SHEETS_REGISTRY.md` | ACTIVE_CONFIRMED | `/customers` | Used by reports and Drive folder logic |
| PartsUsed | Table | Parts used during service | `PartsUsed` | `SHEETS_REGISTRY.md`, `AI_DRAFT_FLOW_MAP.md` | SCHEMA_UNCLEAR | `/service-reports/[id]/parts` | Row-1 schema incomplete in registry |
| InspectionItems | Table | Inspection item support | `InspectionItems` | `SHEETS_REGISTRY.md` | UNKNOWN | `/inspection-items` | Row-1 schema incomplete |
| EmailLog | Table | Email event log | `EmailLog` | `SHEETS_REGISTRY.md` | UNKNOWN | `/email-log` | Schema incomplete |
| Lists | Table | AppSheet dropdown/reference values | `Lists` | `SHEETS_REGISTRY.md` | ACTIVE_CONFIRMED | Admin/settings route | Reference data |
| BusinessDocuments | Table | Business document draft/staging header | `BusinessDocuments` | `SHEETS_REGISTRY.md`, `AI_DRAFT_FLOW_MAP.md` | ACTIVE_CONFIRMED | `/business-documents` | Approval-gated |
| BusinessDocumentItems | Table | Business document line items | `BusinessDocumentItems` | `SHEETS_REGISTRY.md`, `AI_DRAFT_FLOW_MAP.md` | ACTIVE_CONFIRMED | `/business-documents/[id]/items` | Required for Maven payload |
| BusinessDocumentLog | Table | Business document audit log | `BusinessDocumentLog` | `SHEETS_REGISTRY.md`, `MavenAPI.js` | ACTIVE_CONFIRMED | `/business-documents/logs` | Audit/read-only first |
| AutomationCommands | Table | Safe queue architecture | `AutomationCommands` | `SHEETS_REGISTRY.md`, `MavenAPI.js` | ACTIVE_CRITICAL | `/automation-commands` | Do not bypass |
| ApprovalsLog | Table | Approval events | `ApprovalsLog` | `SHEETS_REGISTRY.md` | ACTIVE_CONFIRMED | `/approvals` | Governance |
| SecretAccessLog | Table | Secret access audit | `SecretAccessLog` | `SHEETS_REGISTRY.md` | ACTIVE_CONFIRMED | Admin/security route | Sensitive |
| ProductsCatalog | Table | Product catalog/pricing | `ProductsCatalog` | `SHEETS_REGISTRY.md`, `AIDraftHistory.js` | ACTIVE_CONFIRMED | `/catalog` | AI Draft pricing source |
| InventoryStock | Table | Inventory quantities | `InventoryStock` | `SHEETS_REGISTRY.md` | ACTIVE_CONFIRMED | `/inventory` | Future inventory update target |
| SuppliersProducts | Table | Supplier product pricing | `SuppliersProducts` | `SHEETS_REGISTRY.md` | ACTIVE_CONFIRMED | `/suppliers/products` | Procurement support |
| AIDraftSuggestions | Table | AI suggestion staging | `AIDraftSuggestions` | `SHEETS_REGISTRY.md` | ACTIVE_CONFIRMED | `/ai-draft/suggestions` | May overlap BusinessDocuments |
| InvoiceMavenDocuments | Table | Imported Maven document headers | `InvoiceMavenDocuments` | `SHEETS_REGISTRY.md`, `MavenAPI.js` | ACTIVE_CRITICAL | `/maven/documents` | Read-only first |
| InvoiceMavenDocumentItems | Table | Imported Maven line items | `InvoiceMavenDocumentItems` | `SHEETS_REGISTRY.md`, `MavenAPI.js` | ACTIVE_WITH_BUG | `/maven/document-items` | Open sync bug |
| InvoiceMavenCustomers | Table | Imported Maven customers | `InvoiceMavenCustomers` | `SHEETS_REGISTRY.md` | ACTIVE_CONFIRMED | `/maven/customers` | Identity matching risk |
| InvoiceMavenItems | Table | Imported Maven item catalog | `InvoiceMavenItems` | `SHEETS_REGISTRY.md` | ACTIVE_CONFIRMED | `/maven/items` | May overlap ProductsCatalog |
| SyncState | Table | Maven sync checkpoints | `SyncState` | `SHEETS_REGISTRY.md`, `MavenAPI.js` | ACTIVE_CRITICAL | `/sync/state` | Read-only/admin |
| SyncLog | Table | Sync execution log | `SyncLog` | `SHEETS_REGISTRY.md`, `MavenAPI.js` | ACTIVE_CONFIRMED | `/sync/logs` | Header cleanup needed later |
| ErrorLog | Table | Error log | `ErrorLog` | `SHEETS_REGISTRY.md`, `MavenAPI.js` | ACTIVE_CONFIRMED | `/errors` | Read-only |
| AppMenu | Table | App menu/navigation config | `AppMenu` | `SHEETS_REGISTRY.md` | ACTIVE_CONFIRMED | Navigation config | UX metadata source |
| AutomationRegistry | Table | Automation governance registry | `AutomationRegistry` | `SHEETS_REGISTRY.md` | ACTIVE_CONFIRMED | `/admin/automation-registry` | System Health |
| HealthCheckRegistry | Table | Health check registry | `HealthCheckRegistry` | `SHEETS_REGISTRY.md` | ACTIVE_CONFIRMED | `/admin/health-checks` | System Health |
| SystemHealthLog | Table | Health check log | `SystemHealthLog` | `SHEETS_REGISTRY.md` | ACTIVE_CONFIRMED | `/admin/health-log` | System Health |

