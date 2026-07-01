# Data Coverage Audit

Last updated: 2026-07-01

Scope: project-wide business knowledge coverage audit plus read-only Prisma count audit against the current Supabase staging database.

Safety: no database writes, imports, migrations, schema changes, env changes, or production actions were run.

## Classification Rule

- `populated`: table has one or more records.
- `empty`: table exists and is readable, but currently has zero records.
- `not ready`: table exists and is readable, but currently has zero records and depends on unapproved import/runtime/write workflow data before a useful module can be validated.

## Business Knowledge Coverage Plan - P1 Sources

Purpose: complete enough Business Knowledge Coverage before any recommendation consumer becomes a production recommendation engine. This plan is limited to missing P1 business sources required for production-quality ServiceReport to internal quote recommendation evidence.

Coverage percent means current operational readiness through the Business Knowledge Engine and Evidence Graph, not total business truth completeness. It combines runtime availability, parsing, indexing, searchability, correlation, ranking, Evidence Graph use, and data quality. A high record count alone does not make a source production-ready if it is not searchable, correlated, ranked, and available through the Business Knowledge Engine.

P1 priority order:

1. Official Model Parts Catalog / manufacturer parts registry coverage.
2. PartsUsed / service parts history.
3. Product Catalog / ProductsCatalog.
4. Pricing history from BusinessDocumentItems, approved corrections, and Maven history.
5. Maven historical customers, documents, items, and line items.
6. Inventory and supplier knowledge.
7. Google Sheets / AppSheet source coverage for active transactional tables.
8. Technical Excel and PDF catalogs beyond current generated fixtures.

### P1 Coverage Matrix

| P1 Source | Current Coverage % | Runtime Availability | Parsed | Indexed | Searchable | Correlated | Ranked | Used by Evidence Graph | Remaining blockers |
|---|---:|---|---|---|---|---|---|---|---|
| Official Model Parts Catalog / Manufacturer Parts Registry | 55% | Partial: generated JSON fixture is available at runtime; original PM/EPM Excel workbooks exist in `data-sources/vendor-spare-parts` | Partial: generated registry rows are parsed; Excel runtime parser is not enabled | Partial: generated JSON is indexed; Excel files are metadata-only | Yes for generated registry rows through BKE | Partial: model, series, SKU, and official catalog nodes/edges are produced when evidence matches | Yes: authority level 1, score 95 | Yes, through `ManufacturerJsonKnowledgeProvider` | Original Excel workbooks are not parsed at runtime; full model coverage depends on generated fixture freshness; review-status rows still need human validation; no automatic SKU selection may use non-catalog sources |
| PartsUsed / Service Parts History | 10% | Runtime table exists, but current read-only count is `0`; Google Sheets registry says source exists but schema is suspicious/incomplete | No usable runtime rows | No | No practical search until rows/schema are available | Graph supports `parts-used` nodes if evidence exists, but none is available | No practical ranking | Supported by graph contract only, not current evidence | Requires approved source/schema clarification and import/population; PartsUsed sheet row-1 appears non-normalized; no production recommendation should infer parts-use patterns from absence of data |
| Product Catalog / ProductsCatalog | 15% | Runtime table exists, but current read-only `Product` count is `0`; related source appears in Google Sheets registry target architecture | No runtime rows | No | Not practically searchable | Graph supports product/catalog relationships when product evidence exists | No practical ranking | Supported by graph contract only, not current evidence | Requires approved product source selection/import or read-only provider; needs mapping to official catalog SKUs, Maven items, supplier records, and inventory before production quoting |
| Pricing History - BusinessDocumentItems and approved corrections | 45% | Runtime has `BusinessDocument=10`, `BusinessDocumentItem=25`, `BusinessDocumentLog=25` | Partial: existing Prisma data is readable; correction evidence is not normalized into a BKE provider | Partial: graph can use linked document/item evidence from asset context; no general pricing-history index | Partial: only reachable through existing contextual paths, not a unified pricing search provider | Partial: document/item/pricing nodes exist when asset-linked evidence is retrieved | Partial: evidence can carry authority/status, but pricing-specific ranking policy is incomplete | Partial: graph supports business document items and pricing-history nodes | Need BKE pricing-history provider over approved document lines/logs; customer/model price preference ranking; explicit approved-correction authority handling; rejected/overridden AI suggestions must not be treated as approved evidence |
| Maven History - customers, documents, document items, item catalog | 15% | Runtime Prisma tables exist, but current read-only counts are `0`; local Maven source inventory exists | No runtime Maven rows | No | No practical runtime search | Graph supports Maven/pricing/product relationship types, but no data is available | No practical ranking | Supported by graph contract only, not current evidence | Requires approved Maven history import/read-only connector or export; document-generation API contract remains unproven; no real Maven/Invoice4U action is approved |
| Inventory and Stock Transactions | 10% | Runtime tables exist, but current read-only counts are `InventoryStock=0`, `InventoryTransaction=0` | No runtime rows | No | No practical search | Graph supports inventory/SKU relationships when evidence exists | No practical ranking | Supported by graph contract only, not current evidence | Requires approved inventory data source/import/read-only provider; no reservations, deductions, supplier availability, or shortage prediction may run yet |
| Supplier Knowledge | 10% | No dedicated runtime supplier master is populated; supplier fields may exist only indirectly in product/catalog planning docs | No normalized runtime source | No | No practical search beyond Markdown/source metadata | Graph supports supplier nodes/relationships when evidence exists | No practical ranking | Supported by graph contract only, not current evidence | Need supplier source of truth, product-to-supplier mapping, supplier pricing/lead-time evidence, and authority rules before production use |
| Google Sheets / AppSheet Active Tables | 25% | Registry metadata exists in `data-sources/tools/SHEETS_REGISTRY.md`; local CSV snapshots exist for Customers, ServiceReports, and ReportEquipmentItems | Partial: registry and selected CSV exports are parsed; live rows are not parsed | No full runtime index | Partial: registry metadata and selected CSV snapshots are searchable | Partial: CSV customers/service reports/equipment can correlate as source evidence; live sheet rows cannot | Partial: authority level 3, generic source ranking only | Partial: CSV evidence can enter graph; registry metadata is mostly source-document evidence | Live Google Sheets/AppSheet rows require approved connector/export access; several active tables are metadata-only; schema drift and duplicate candidate tables must be resolved before production recommendations |
| Technical Excel Catalogs and Vendor Spare-Parts Tables | 30% | PM/EPM workbooks exist; generated manufacturer registry fixture exists | Partial: generated fixture parsed; original Excel metadata only at runtime | Partial: generated fixture indexed; workbooks are not indexed | Partial: generated rows searchable; workbook files searchable by path only | Partial: official catalog fixture can correlate; raw workbook rows cannot | Partial: fixture is authority level 1; raw workbook metadata is not enough for line-level evidence | Partial: fixture rows yes, raw workbook rows no | Runtime Excel parsing/conversion path is not approved; EPM/PM workbook row extraction must be refreshed and validated before broad production SKU recommendations |
| Technical PDFs / Historical PDFs | 10% | PDFs exist under `project-brain/reference` and are visible as file metadata | No text extraction/OCR | No | File-path metadata only | No content correlation | No content ranking | Only as source-document/file metadata, not technical evidence | Need approved PDF text extraction/OCR path and source classification; current PDF metadata cannot support production recommendations |

### P1 Coverage Sequence

1. Make official catalog evidence complete enough for target compressor models: refresh/generated manufacturer registry from PM/EPM workbooks, validate review rows, and keep SKU selection restricted to authority level 1 catalog evidence.
2. Close the `PartsUsed=0` gap through an approved read-only source clarification/import plan before relying on service parts patterns.
3. Add read-only BKE providers for ProductsCatalog, BusinessDocumentItems/pricing history, BusinessDocumentLog approved corrections, Maven history, inventory, and suppliers before recommendation migration.
4. Expand Evidence Graph validation gates so production recommendation consumers require official catalog, customer/equipment/service, pricing, parts-history, and data-quality coverage explicitly.
5. Only after P1 sources are parsed, searchable, correlated, ranked, and listed by the gate should ServiceReport to BusinessDocument draft generation migrate into a production recommendation engine.

### Recommendation Migration Blocker

ServiceReport to BusinessDocument draft generation must not be treated as production-grade until the recommendation gate can show:

- official catalog evidence for every SKU candidate;
- customer, equipment, model, and service-report evidence;
- historical approved price evidence or an explicit price blocker;
- PartsUsed or an explicit parts-history gap;
- Product Catalog or explicit product-catalog gap;
- Maven history or explicit Maven-history gap;
- inventory/supplier availability or explicit inventory/supplier gap;
- rejected alternatives and data-quality gaps in the final evidence packet.

Until then, draft generation may remain internal/review-only and must not become a production recommendation engine.

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
| `BusinessDocument` | 10 | populated | Internal BusinessDocument draft/approval workflow data exists and can support approved document/pricing evidence. |
| `BusinessDocumentItem` | 25 | populated | Internal BusinessDocument line data exists and can support approved line/pricing evidence when normalized through BKE. |
| `BusinessDocumentLog` | 25 | populated | Internal BusinessDocument review/approval/correction logs exist and can support learning evidence when normalized through BKE. |
| `AutomationCommand` | 0 | not ready | Runtime command queue data is not populated in staging. |
| `MavenCustomer` | 0 | not ready | Maven data is not imported/populated. |
| `MavenDocument` | 0 | not ready | Maven document data is not imported/populated. |
| `MavenDocumentItem` | 0 | not ready | Maven document item data is not imported/populated. |
| `MavenItem` | 0 | not ready | Maven item/product catalog data is not imported/populated. |
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
| `BusinessDocument` / `BusinessDocumentItem` | `/business-documents`, `/business-documents/[id]`, `/business-documents/[id]/preview`, `/business-documents/[id]/pdf` |

Recommended next module: do not build another isolated data-heavy read-only module until its source table is populated. The next safe runtime value is expanding Business Knowledge Engine provider depth for populated or file-backed P1 sources, starting with approved BusinessDocumentItem/pricing history and official manufacturer catalog evidence, while keeping source-system writes/imports gated.

If implementation must continue without imports, the next safe task should be a read-only BKE provider expansion over already populated or local sources, not recommendation migration.

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
  "BusinessDocument": 10,
  "BusinessDocumentItem": 25,
  "BusinessDocumentLog": 25,
  "AutomationCommand": 0,
  "MavenCustomer": 0,
  "MavenDocument": 0,
  "MavenDocumentItem": 0,
  "MavenItem": 0,
  "Approval": 0,
  "EmailLog": 0,
  "SyncState": 0,
  "SyncLog": 0,
  "ErrorLog": 0
}
```
