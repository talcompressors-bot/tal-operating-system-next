# Commercial Intelligence Source Audit

Task type: source audit only
Pricing analysis: not performed
Implementation: none
Imports: none
DB writes: none
Maven actions: none

## 1. Executive Summary

The commercial intelligence datasets are real system datasets, but they are not currently available as local export files and they are not populated in Supabase staging.

The current source-of-truth split is:

| Dataset | Real Source Today | Data Exists? | Local Export? | Supabase Staging? | Best Read-Only Access Path |
|---|---|---:|---:|---:|---|
| `InvoiceMavenDocuments` | Google Sheets `ServiceApp_FIX` populated/synced from Maven API | Table verified; row count not locally verified | No | Schema exists, 0 rows | Google Sheets read-only connector/export |
| `InvoiceMavenDocumentItems` | Google Sheets `ServiceApp_FIX`, populated from Maven document `RawJson` / Maven API item arrays | Table verified; row count not locally verified | No | Schema exists, 0 rows | Google Sheets read-only connector/export |
| `BusinessDocuments` | Google Sheets `ServiceApp_FIX` / AppSheet workflow table | Yes, 1 row observed in Wave 2 connector validation | No | Schema exists, 0 rows | Google Sheets read-only connector/export |
| `BusinessDocumentItems` | Google Sheets `ServiceApp_FIX` / BusinessDocument line table | Table exists, 0 rows observed in Wave 2 connector validation | No | Schema exists, 0 rows | Google Sheets read-only connector/export |

Most important conclusion:

- The data is not locally exported.
- The data is not currently populated in Supabase staging.
- `BusinessDocuments` exists and has at least 1 source row in Google Sheets.
- `BusinessDocumentItems` exists but appears genuinely empty in the source sheet as of Wave 2 validation.
- `InvoiceMavenDocuments` and `InvoiceMavenDocumentItems` are active Google Sheets/Maven sync datasets. They appear to already exist in the source spreadsheet/Maven sync path, but the current local repository does not contain a fresh row-count proof. A live read-only Google Sheets check is required to confirm current row counts.

## 2. Evidence Inspected

| Evidence | What It Proves |
|---|---|
| `data-sources/tools/SHEETS_REGISTRY.md` | Source spreadsheet `ServiceApp_FIX`, spreadsheet ID, active tab names, headers, purpose, and related Apps Script functions. |
| `data-sources/exports/` file listing | Only Wave 1 local CSV exports are present: `Customers_Final.csv`, `ServiceReports.csv`, `ReportEquipmentItems.csv`; no commercial source exports. |
| `scripts/import-dry-run.ts` | Maps all four datasets from Google Sheets source names into Prisma/Supabase target tables. |
| `apps-script/MavenAPI.js` and `project-brain/apps-script/MavenAPI.gs` | Maven sync reads Maven API and writes `InvoiceMavenDocuments` plus `InvoiceMavenDocumentItems`; BusinessDocument workflow reads/writes `BusinessDocuments` and logs. |
| `apps-script/AIDraftHistory.js` | Reads `InvoiceMavenDocumentItems` for historical pricing search and AI Draft preview context. |
| `prisma/schema.prisma` | Supabase target schema has `BusinessDocument`, `BusinessDocumentItem`, `MavenDocument`, and `MavenDocumentItem`. |
| `DATA_COVERAGE_AUDIT.md` | Supabase staging counts for all four target models are currently `0`. |
| `project-brain/CURRENT_TASK.md` | Wave 2 connector validation saw `BusinessDocuments = 1`, `BusinessDocumentItems = 0`; Maven tables were not part of that approved Wave 2 connector validation set. |
| `SCR_PRICING_INTELLIGENCE_AUDIT.md` | Confirms Maven/BusinessDocument pricing sources exist in design, but staging price-bearing tables are empty. |

## 3. Dataset Source Matrix

### `InvoiceMavenDocuments`

| Question | Answer |
|---|---|
| Where does it live today? | Google Sheet tab `InvoiceMavenDocuments` in source spreadsheet `ServiceApp_FIX` (`1q6cCUJTNhhrUSok9rrZyFTN9BlrT6-4d7s9CUqrVHh4`), populated by Maven API sync logic. |
| Is it available locally? | No. No local CSV/export file for `InvoiceMavenDocuments` was found under `data-sources`. |
| Is it available through exports? | Not currently in the repo. It could be made available by a read-only Google Sheets export, but no such export exists locally. |
| Is it available through Google Sheets? | Yes as an active tab in `SHEETS_REGISTRY.md`. Current row count was not verified in this audit because no live connector read was performed. |
| Is it available through Apps Script? | Yes. `MavenAPI.js` / `MavenAPI.gs` opens the source spreadsheet, gets `InvoiceMavenDocuments`, and appends synced Maven document headers. |
| Is it available through Supabase? | Schema exists as Prisma `MavenDocument` mapped to `maven_documents`, but staging count is `0`; not populated for useful reads. |
| Is it available through Maven integrations? | Yes. Apps Script calls `https://app.invoice-maven.co.il/api/documents/searchDocuments` with `MAVEN_API_KEY` and writes response documents to the sheet. |
| What is required to access read-only? | Use Google Sheets connector/export for the `InvoiceMavenDocuments` tab, or run a strictly read-only Apps Script/reporting function that reads the tab without syncing, backfilling, or calling Maven write endpoints. |

Status:

- Source table: exists.
- Source rows: likely exist based on active Maven sync design and registry notes, but current row count is not locally verified.
- Local availability: missing.
- Supabase availability: not populated.

### `InvoiceMavenDocumentItems`

| Question | Answer |
|---|---|
| Where does it live today? | Google Sheet tab `InvoiceMavenDocumentItems` in `ServiceApp_FIX`, populated directly during Maven sync when documents include item arrays and by item backfill functions reading document `RawJson`. |
| Is it available locally? | No. No local CSV/export file for `InvoiceMavenDocumentItems` was found under `data-sources`. |
| Is it available through exports? | Not currently in the repo. It requires a read-only Google Sheets export or connector read. |
| Is it available through Google Sheets? | Yes as an active tab in `SHEETS_REGISTRY.md`. Current row count was not verified in this audit. |
| Is it available through Apps Script? | Yes. `MavenAPI.js` / `MavenAPI.gs` writes item rows from `doc.items`; backfill functions populate the tab from `InvoiceMavenDocuments.RawJson`; `AIDraftHistory.js` reads it for historical price search. |
| Is it available through Supabase? | Schema exists as Prisma `MavenDocumentItem` mapped to `maven_document_items`, but staging count is `0`. |
| Is it available through Maven integrations? | Indirectly yes. Maven `searchDocuments` response includes item arrays; Apps Script expands those into `InvoiceMavenDocumentItems`. |
| What is required to access read-only? | Use Google Sheets connector/export for `InvoiceMavenDocumentItems`; do not run backfill/apply/sync functions unless separately approved. |

Status:

- Source table: exists.
- Source rows: unverified in the current local audit.
- Local availability: missing.
- Supabase availability: not populated.

### `BusinessDocuments`

| Question | Answer |
|---|---|
| Where does it live today? | Google Sheet tab `BusinessDocuments` in `ServiceApp_FIX`, used by AppSheet/BusinessDocuments workflow as internal business document/draft staging. |
| Is it available locally? | No. No local CSV/export file for `BusinessDocuments` was found under `data-sources`. |
| Is it available through exports? | Not currently in the repo. It can be exported/read from Google Sheets. |
| Is it available through Google Sheets? | Yes. Wave 2 connector validation observed `BusinessDocuments = 1`. |
| Is it available through Apps Script? | Yes. `MavenAPI.js` / `MavenAPI.gs` reads `BusinessDocuments`, claims/updates status fields, and uses it in the CreateMavenDraft command flow. |
| Is it available through Supabase? | Schema exists as Prisma `BusinessDocument` mapped to `business_documents`, but staging count is `0`. |
| Is it available through Maven integrations? | It is not sourced from Maven. It is an internal staging/input table that can trigger Maven draft creation after approval. |
| What is required to access read-only? | Use Google Sheets connector/export for `BusinessDocuments`; no AppSheet writes, Apps Script workflow execution, or Maven draft creation. |

Status:

- Source table: exists.
- Source rows: verified, 1 row observed in Wave 2 connector validation.
- Local availability: missing.
- Supabase availability: not populated.

### `BusinessDocumentItems`

| Question | Answer |
|---|---|
| Where does it live today? | Google Sheet tab `BusinessDocumentItems` in `ServiceApp_FIX`, intended as line items for `BusinessDocuments`. |
| Is it available locally? | No. No local CSV/export file for `BusinessDocumentItems` was found under `data-sources`. |
| Is it available through exports? | Not currently in the repo. It can be exported/read from Google Sheets. |
| Is it available through Google Sheets? | Yes as a tab, but Wave 2 connector validation observed `BusinessDocumentItems = 0`. |
| Is it available through Apps Script? | Yes as a referenced workflow/input table. `SystemHealthSetup.js` documents `BusinessDocumentItems` as an input to CreateMavenDraft and as an approval-gated write target; `AIDraftHistory.js` has preview-only generation logic for future items. |
| Is it available through Supabase? | Schema exists as Prisma `BusinessDocumentItem` mapped to `business_document_items`, but staging count is `0`. |
| Is it available through Maven integrations? | It is not sourced from Maven. It is intended to feed approved Maven draft creation after BusinessDocument approval. |
| What is required to access read-only? | Use Google Sheets connector/export for `BusinessDocumentItems`; expect empty result unless new rows were added since Wave 2 validation. |

Status:

- Source table: exists.
- Source rows: verified empty as of Wave 2 connector validation.
- Local availability: missing.
- Supabase availability: not populated.

## 4. Local Availability

Current local export files under `data-sources/exports`:

- `Customers_Final.csv`
- `ServiceReports.csv`
- `ReportEquipmentItems.csv`
- Wave 1 import-run reports/manifests

Not found locally:

- `InvoiceMavenDocuments.csv`
- `InvoiceMavenDocumentItems.csv`
- `BusinessDocuments.csv`
- `BusinessDocumentItems.csv`
- any equivalent local commercial export file

Conclusion:

The commercial intelligence data is not locally available today.

## 5. Google Sheets Availability

Source spreadsheet:

- Name: `ServiceApp_FIX`
- Spreadsheet ID: `1q6cCUJTNhhrUSok9rrZyFTN9BlrT6-4d7s9CUqrVHh4`
- Registry last live read: 2026-06-15

All four requested datasets are registered as active Google Sheets tabs.

Verified row evidence:

| Dataset | Google Sheets Table Exists | Row Evidence |
|---|---:|---|
| `InvoiceMavenDocuments` | Yes | Row count requires live read-only verification |
| `InvoiceMavenDocumentItems` | Yes | Row count requires live read-only verification |
| `BusinessDocuments` | Yes | 1 row observed in Wave 2 connector validation |
| `BusinessDocumentItems` | Yes | 0 rows observed in Wave 2 connector validation |

## 6. Apps Script Availability

Apps Script has direct access to the source spreadsheet and relevant tabs.

Key functions / files:

| Dataset | Apps Script Evidence |
|---|---|
| `InvoiceMavenDocuments` | `syncMavenDocuments()` opens the source spreadsheet, calls Maven `searchDocuments`, and appends document rows. |
| `InvoiceMavenDocumentItems` | `syncMavenDocuments()` writes `doc.items`; `backfillMavenDocumentItems()` and later backfill functions expand item rows from `RawJson`; `AIDraftHistory.js` reads the table for historical pricing search. |
| `BusinessDocuments` | `createMavenDraft(data)` / command flow reads and updates `BusinessDocuments` status by `BusinessDocumentId`. |
| `BusinessDocumentItems` | Referenced as BusinessDocument line items and approval-gated write target; preview-generation exists, but no source rows were observed in Wave 2. |

Read-only access requirement:

- Use Apps Script only through a read-only inspection function or connector read.
- Do not call `syncMavenDocuments`, `backfill...Apply`, `createMavenDraft`, `doPost`, or any function that appends/updates rows unless separately approved.

## 7. Supabase Availability

Prisma/Supabase target models exist:

| Source Dataset | Prisma Model | Supabase Table | Current Staging Count |
|---|---|---|---:|
| `InvoiceMavenDocuments` | `MavenDocument` | `maven_documents` | 0 |
| `InvoiceMavenDocumentItems` | `MavenDocumentItem` | `maven_document_items` | 0 |
| `BusinessDocuments` | `BusinessDocument` | `business_documents` | 0 |
| `BusinessDocumentItems` | `BusinessDocumentItem` | `business_document_items` | 0 |

Conclusion:

Supabase staging has schema support but is not the current source of truth for these datasets. It is an empty target/read model until an approved import/sync populates it.

## 8. Maven Integration Availability

Maven integration evidence:

- `MavenAPI.js` uses `MAVEN_API_KEY`.
- It calls `https://app.invoice-maven.co.il/api/documents/searchDocuments`.
- It writes Maven document headers to `InvoiceMavenDocuments`.
- It writes Maven document item rows to `InvoiceMavenDocumentItems` when `doc.items` exists.

Dataset-specific Maven relationship:

| Dataset | Maven Relationship |
|---|---|
| `InvoiceMavenDocuments` | Directly sourced from Maven API document search. |
| `InvoiceMavenDocumentItems` | Sourced from Maven API document item arrays / document `RawJson`. |
| `BusinessDocuments` | Not sourced from Maven; internal table used to request/track approved Maven draft creation. |
| `BusinessDocumentItems` | Not sourced from Maven; internal line table intended to feed approved Maven draft creation. |

Read-only requirement:

- Prefer Google Sheets read-only access over Maven API calls for audit/discovery.
- Maven API calls should be avoided unless explicitly approved because they can interact with rate limits and sync state.

## 9. Is the Data Merely Not Exported or Genuinely Unavailable?

| Dataset | Determination | Reason |
|---|---|---|
| `InvoiceMavenDocuments` | Exists in source path, not exported locally; current row count unverified | Active Google Sheet tab and Maven sync code exist, but no local export or Supabase rows. |
| `InvoiceMavenDocumentItems` | Exists in source path, not exported locally; current row count unverified | Active Google Sheet tab and Apps Script item-write/backfill/read code exist, but no local export or Supabase rows. |
| `BusinessDocuments` | Exists and is not exported locally | Wave 2 connector validation saw 1 source row; Supabase/local export missing. |
| `BusinessDocumentItems` | Table exists but appears genuinely empty as of Wave 2 | Wave 2 connector validation saw 0 source rows; local/Supabase also empty. |

Most likely current reality:

1. `BusinessDocuments`: data exists in Google Sheets and is simply not exported/imported locally.
2. `BusinessDocumentItems`: table exists, but useful item data is genuinely unavailable/empty.
3. `InvoiceMavenDocuments`: data likely exists in Google Sheets/Maven sync history but must be confirmed by read-only live row count.
4. `InvoiceMavenDocumentItems`: data may exist if sync/backfill populated it; must be confirmed by read-only live row count.

## 10. Required Read-Only Access Plan

Recommended safe sequence:

1. Google Sheets read-only connector check:
   - `InvoiceMavenDocuments`: row count, headers, first/last 5 rows, date range only.
   - `InvoiceMavenDocumentItems`: row count, headers, first/last 5 rows, parent-link coverage only.
   - `BusinessDocuments`: row count, headers, first/last rows, status distribution only.
   - `BusinessDocumentItems`: row count and headers; confirm whether still empty.

2. Export-only option:
   - Create read-only CSV exports from Google Sheets tabs for local audit.
   - Store under an approved export location only after Liad approves export handling.

3. Do not use during source audit:
   - DB imports.
   - Prisma writes.
   - Maven sync execution.
   - Apps Script backfill/apply functions.
   - BusinessDocument workflow execution.
   - Maven draft creation.

## 11. Open Questions

1. What is the current live row count for `InvoiceMavenDocuments`?
2. What is the current live row count for `InvoiceMavenDocumentItems`?
3. Was `InvoiceMavenDocumentItems` fully backfilled from historical `RawJson`, partially backfilled, or only populated for newer sync runs?
4. Should read-only commercial intelligence discovery use Google Sheets connector directly or local CSV exports?
5. Should `BusinessDocuments = 1` be treated as real production history or a workflow/example row until inspected?

## 12. Final Recommendation

Do not analyze commercial pricing yet.

First run a read-only source availability verification against Google Sheets for the four tabs. The key deliverable should be row counts, headers, date range, parent-link coverage, and sample anonymized/non-sensitive rows if approved.

Only after that should customer pricing intelligence be rerun.
