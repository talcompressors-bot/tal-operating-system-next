# Application Route Map

Last updated: 2026-06-25

Scope: currently implemented Next.js `app/**/page.tsx` routes only.

Record counts were verified with read-only Prisma count queries against the current Supabase staging database.

| Route | Module | Status | Data Source | Record Count | AppSheet Equivalent |
|---|---|---|---|---:|---|
| `/` | Dashboard | Implemented | Static Next.js module registry in `app/page.tsx` | N/A | AppSheet app home / navigation |
| `/service-reports` | Service Reports list | Implemented, read-only | Supabase PostgreSQL via Prisma `ServiceReport` | 63 | `ServiceReports` table list view |
| `/service-reports/[id]` | Service Report detail | Implemented, read-only | Supabase PostgreSQL via Prisma `ServiceReport` with linked customer/equipment context | 63 addressable reports | `ServiceReports` detail view |
| `/customers` | Customers list | Implemented, read-only | Supabase PostgreSQL via Prisma `Customer` | 763 | `Customers_Final` / Customers list view |
| `/customers/[id]` | Customer detail | Implemented, read-only | Supabase PostgreSQL via Prisma `Customer` with linked service-report counts/history | 763 addressable customers | Customer detail view |
| `/equipment` | Equipment list | Implemented, read-only | Supabase PostgreSQL via Prisma `ReportEquipmentItem` | 75 | `ReportEquipmentItems` / equipment inline or related view |
| `/equipment/[id]` | Equipment detail | Implemented, read-only | Supabase PostgreSQL via Prisma `ReportEquipmentItem` with linked service-report context | 75 addressable equipment rows | `ReportEquipmentItems` detail/related record view |
| `/inventory-stock` | Inventory / equipment stock redirect | Implemented route alias | Redirects to existing `/equipment` route; no separate data module | N/A | App navigation alias to equipment/stock area |
| `/parts-used` | Parts Used list | Implemented, read-only | Supabase PostgreSQL via Prisma `PartUsed` | 0 | `PartsUsed` table list view |
| `/parts-used/[id]` | Parts Used detail | Implemented, read-only | Supabase PostgreSQL via Prisma `PartUsed` with linked service-report/product context when present | 0 addressable parts-used rows | `PartsUsed` detail view |
| `/ai-drafts` | AI Draft Suggestions list | Implemented, read-only empty-state shell | Supabase PostgreSQL via Prisma `AiDraftSuggestion` | 0 | `AIDraftSuggestions` table list view |
| `/ai-drafts/[id]` | AI Draft Suggestion detail | Implemented, read-only empty-state shell | Supabase PostgreSQL via Prisma `AiDraftSuggestion` with linked customer/service-report context when present | 0 addressable AI draft rows | `AIDraftSuggestions` detail view |
| `/ai-drafts/preview/[reportCounter]` | AI Draft Recommendation Preview | Implemented, read-only runtime preview for Service Report `5806`; line pricing now shows trusted evidence only and keeps approval required when ProductCatalog/alias, BusinessDocumentItem history, or Maven item history has no single trusted price | Supabase PostgreSQL via Prisma `ServiceReport`, `ReportEquipmentItem`, `PartsUsed`, `Product`, `MavenDocumentItem`, `BusinessDocument`, `BusinessDocumentItem`, and `AiDraftSuggestion` read-only checks | 1 validated preview route | AI Draft recommendation review before draft creation |
| `/business-documents` | Business Documents list | Implemented, read-only empty-state shell | Supabase PostgreSQL via Prisma `BusinessDocument` | 0 | `BusinessDocuments` table list view |
| `/business-documents/[id]` | Business Document detail | Implemented, read-only empty-state shell | Supabase PostgreSQL via Prisma `BusinessDocument` with linked items/logs/customer/service-report/AI-draft/Maven context when present | 0 addressable business document rows | `BusinessDocuments` detail view |
| `/automation-commands` | Automation Commands list | Implemented, read-only empty-state shell | Supabase PostgreSQL via Prisma `AutomationCommand` | 0 | Automation command queue/list view |
| `/automation-commands/[id]` | Automation Command detail | Implemented, read-only empty-state shell | Supabase PostgreSQL via Prisma `AutomationCommand` with linked BusinessDocument context when present | 0 addressable automation command rows | Automation command detail/queue item view |
