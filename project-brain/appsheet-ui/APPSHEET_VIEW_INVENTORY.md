# APPSHEET VIEW INVENTORY

Last updated: 2026-06-21
Discovery mode: metadata-first, runtime crawling blocked by AppSheet licensing

Runtime crawling discovered only:

| View | Type | Visible Fields | Actions | Source | Status | Notes |
|---|---|---|---|---|---|---|
| AppSheet test-mode / plan-upgrade interstitial | Runtime status page | AppSheet licensing/deployment message | None discovered | Playwright CDP report | DISCOVERED | Not an app business view |

Expected business views from repo evidence:

| Expected View | Related Table | Purpose | Source Evidence | Status | Proposed Next.js Route | Notes |
|---|---|---|---|---|---|---|
| ServiceReports view | ServiceReports | Create/view service reports | `APPSHEET_MAP.md`, `SYSTEM_MAP.md` | METADATA_NEEDED | `/service-reports` | Exact view name/type unknown |
| ReportEquipmentItems child view | ReportEquipmentItems | Equipment rows per report | `APPSHEET_MAP.md`, `SHEETS_REGISTRY.md` | METADATA_NEEDED | `/service-reports/[id]/equipment` | Exact UX unknown |
| Customers view | Customers_Final | Customer master | `APPSHEET_MAP.md`, `SHEETS_REGISTRY.md` | METADATA_NEEDED | `/customers` | Exact UX unknown |
| BusinessDocuments view | BusinessDocuments | Draft/approval workflow | `APPSHEET_MAP.md`, `SYSTEM_MAP.md` | METADATA_NEEDED | `/business-documents` | Approval UI unknown |
| BusinessDocumentItems view | BusinessDocumentItems | Draft line items | `SHEETS_REGISTRY.md` | METADATA_NEEDED | `/business-documents/[id]/items` | Exact UX unknown |
| AutomationCommands view | AutomationCommands | Queue monitor | `SYSTEM_MAP.md`, `SHEETS_REGISTRY.md` | METADATA_NEEDED | `/automation-commands` | Read-only/admin first |
| ProductsCatalog view | ProductsCatalog | Catalog/pricing | `SHEETS_REGISTRY.md` | METADATA_NEEDED | `/catalog` | Needed for AI Draft pricing |
| Maven Documents view | InvoiceMavenDocuments | Maven history | `SHEETS_REGISTRY.md` | METADATA_NEEDED | `/maven/documents` | Read-only first |
| Maven Document Items view | InvoiceMavenDocumentItems | Maven item history | `SHEETS_REGISTRY.md` | METADATA_NEEDED | `/maven/document-items` | Open sync bug |
| System Health views | AutomationRegistry / HealthCheckRegistry / SystemHealthLog | Governance/health | `SHEETS_REGISTRY.md` | METADATA_NEEDED | `/admin/health` | Admin only |
| Receipts view | UNKNOWN | Automatic receipts | Target requirement | MISSING | `/receipts` | No current implementation found |

