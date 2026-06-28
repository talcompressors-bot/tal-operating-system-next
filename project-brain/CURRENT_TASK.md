# CURRENT TASK

Last updated: 2026-06-28
Mode: CAPABILITY_BUILDING; governance frozen; TDOS frozen in Maintenance Mode; domain-driven roadmap realigned; Operations Center Sprint 4 implemented; Financial Capability Sprint 3 implemented; Commercial Lifecycle Hardening Sprint 2 implemented; BusinessCase Runtime Sprint 1 implemented; Financial Intake Engine design documented; Universal Business Document Engine foundation implemented; TDOS risk-based operating model integrated; Wave 2 complete; architecture audit complete; Commercial, Financial, and operational workspace runtime work started; Maven remains an External Adapter gate only; no real Maven execution approved yet

## Canonical Role

This is the single source for current phase, current task, and next task.

Do not use `project-brain/current/CURRENT_TASK.md` for active state. That path is retired.

## Current Phase

Project Brain Consolidation Phase 1-3 completed. Supabase staging schema is applied and verified. Wave 1 staging import passed closed-loop validation. Wave 1 Next.js PostgreSQL read/display validation passed after display mapping fixes. Wave 2 connector-based read-only dry-run validation is completed. Real Supabase Prisma connectivity passed outside the network sandbox, confirming earlier `P1001` failures were sandbox/runtime network limitations rather than Supabase/project/env issues. Supabase staging connectivity blocker is resolved. The Customers read-only module is implemented and pushed. Automatic Project Brain closeout sync is required after every completed task. Multi-agent operating workflow docs are implemented and pushed. The ReportEquipmentItems / Equipment read-only module is implemented and pushed. The PartsUsed read-only module is implemented and committed. Data coverage audit is completed. Service Report detail is enhanced as the central read-only work screen. Bidirectional navigation between Customers, Equipment, and the Service Report work screen is implemented. Service Reports list search/filter and context cues are implemented. AI Draft Suggestions read-only empty-state shell is implemented. BusinessDocuments read-only draft shell is implemented. Inventory stock route alias is fixed. AutomationCommands read-only empty-state shell is implemented and pushed. SCR matching preview panel is implemented on the Service Report detail work screen. AI Draft Recommendation Preview runtime for Service Report `5806` is implemented, its Maven Knowledge / Pricing Evidence Layer shows only trusted pricing evidence from ProductCatalog/aliases, historical BusinessDocumentItems, and Maven item history, the protected approval Server Action can convert the approved preview into one internal BusinessDocument draft plus BusinessDocumentItems after explicit approval and pricing override when required, the BusinessDocument Review and Approval Page supports read-only internal draft review before external action, the BusinessDocument approval workflow now supports protected approve and return-to-review Server Actions with audit logs, pricing/quantity blocker checks, exact approval phrase enforcement, and no external side effects, the BusinessDocument Line Resolution Layer now allows protected internal correction of quantity, unit price, pricing evidence, and approval-required state with audit logs, the protected Maven document-generation AutomationCommand gate can create only one internal pending legacy `CREATE_MAVEN_DRAFT` command after exact approval phrase for an approved/ready BusinessDocument, AutomationCommand Detail and Queue Review exposes pending command inspection before execution, and the Maven Execution Adapter Dry Run validates legacy `CREATE_MAVEN_DRAFT` commands in Next.js dry-run mode only while storing the would-send Maven document payload and blockers on the internal AutomationCommand. Pricing Evidence Engine and Parts / SKU Intelligence are documented as read-only evidence layers; SKU matching is gated by exact model, approved alias, service pattern, parts table evidence, and historical invoice evidence, and inventory deduction requires a separate approved transaction gate. The completion model mismatch found in `project-brain/FULL_PROJECT_DISCOVERY_AUDIT.md` is corrected: listed capability contributions total 56%, not 60%, the validated AI Draft Preview runtime added one Wave 2 capability point for 57%, the validated pricing-evidence preview layer added one point for 58%, the approval-to-internal-draft Server Action added one point for 59%, the BusinessDocument Review and Approval Page added one point for 60%, the protected Maven document-generation AutomationCommand gate added one point for 61%, AutomationCommand Detail and Queue Review added one point for 62%, BusinessDocument Approval Workflow added one point for 63%, Maven Execution Adapter Dry Run added one point for 64%, and BusinessDocument Line Resolution Layer adds the final Wave 2 capability point for a current total of 65%. Global business document line rules are documented for compressor service documents, including one `Labor + Service` line and one `Technician Visit / Travel` line across AI Draft, BusinessDocument, Maven output document, and future customer-facing document flows. AI Draft compressor service business rules are approved for approval-based draft readiness: SCR Small Service kit includes Air Filter, Oil Filter, and 3L SKR oil top-up; Labor + Service is separate by default; Technician Visit / Travel is one line with default suggested price 300 ILS; Large Service replaces full oil content; partial serial remains `NEEDS_MANUAL_CONFIRMATION`. `EMAIL_DOCUMENT_INTAKE_AGENT` is specified as a planned/non-executable evidence-packet-first agent under `ORCHESTRATOR_AGENT`; no Gmail runtime or email/customer-facing action is approved. The existing `ORCHESTRATOR_AGENT` is upgraded into the Executive Decision Engine for all future task intake, with mandatory Understand/Discover/Consult/Score/Decide/Execute/Validate/Learn/Improve cycle, specialist consultation summaries, executive scoring, duplicate-proof gates, self-improvement evidence packets, Reality Check KPIs, and capability-over-document gates. Foundational governance is now mature and frozen. Current project mode is `CAPABILITY_BUILDING`: future work should prioritize working runtime capabilities and working UI over documentation expansion. No next implementation task is approved yet. DB writes outside approved protected Server Actions, Maven/Invoice4U execution, email/customer-facing sends, inventory actions, imports, source-system changes, and production work remain gated and require explicit human approval. Wave 2 import is not approved.

## Current Milestone

Startup remote sync, shutdown path, Reality Check commit comparison, Supabase staging-first shadow plan, staging schema push, read-only schema verification, Wave 1 staging import execution, Wave 1 read/display mapping fixes, Wave 2 planning/discovery gate approval, Wave 2 connector dry-run validation, real Prisma staging connectivity validation, Customers read-only module implementation, automatic Project Brain closeout sync governance, multi-agent operating workflow docs, ReportEquipmentItems / Equipment read-only module implementation, PartsUsed read-only module implementation, data coverage audit, Service Report central work-screen enhancement, bidirectional module navigation, Service Reports list context enhancement, AI Draft Suggestions shell, BusinessDocuments shell, AutomationCommands shell, SCR matching preview panel, AI Draft Recommendation Preview runtime for Service Report `5806`, Maven Knowledge / Pricing Evidence Layer for the AI Draft Preview, AI Draft Approval to BusinessDocument Draft runtime, BusinessDocument Review and Approval Page, protected Maven document-generation AutomationCommand gate, AutomationCommand Detail and Queue Review, BusinessDocument Approval Workflow, BusinessDocument Approval Workflow POST Smoke Test, Maven Execution Adapter Dry Run, BusinessDocument Line Resolution Layer, Wave 2 Line Resolution POST Smoke Test, Wave 2 closeout and Maven execution readiness checklist, completion model update to 65%, AI Draft/parts/pricing/equipment intelligence documentation, global business document line governance, AI Draft recommendation readiness business-rule approval, Universal Business Document Engine foundation, Financial Intake Engine design, BusinessCase Runtime Sprint 1, Commercial Lifecycle Hardening Sprint 2, Financial Capability Sprint 3, Operations Center Sprint 4, Action Server Knowledge Layer roadmap planning, Email Document Intake Agent planning, active-ID startup/closeout preservation rules, Orchestrator Decision Engine governance, Executive Orchestrator Phase 2 governance, and Project Execution Mode transition to `CAPABILITY_BUILDING` are complete.

## Last Implementation Commit

`c860365 Add operations center workspace`

## Last Closeout Commit

`8114210 Sync project brain commit model state`

## Real Current State

- Next.js shadow app exists.
- Hebrew RTL UI exists.
- ServiceReports list and detail screens exist.
- Adapter reads local snapshot JSON.
- PostgreSQL V1 scope is approved in `project-brain/migration/POSTGRESQL_V1_SCOPE.md`.
- Full `prisma/schema.prisma` exists.
- Prisma tooling was added and committed in `00e2067 Add Prisma validation tooling`.
- Prisma schema validation completed successfully with Prisma v6.19.3 using a process-only placeholder `DATABASE_URL`.
- Supabase staging project `talcompressors-next-staging` exists and real staging secrets were placed outside git in ignored local env storage.
- No Prisma migration has been run.
- Supabase staging schema push completed with `prisma db push` after explicit staging-only approval.
- Read-only staging schema verification passed: 21 public tables found, no missing/extra V1 tables, indexes and relations matched the approved V1 design.
- Production AppSheet and Google Sheets remain untouched.
- Maven remains untouched.
- Project Brain Consolidation Phase 1-3 completed.
- Startup path is enforced through `PROJECT_INDEX.md`.
- Retired current task references were cleaned in `9433855 Clean retired current task references`.
- Official startup command `hey codex` and shutdown command `by codex` were implemented in `e36c35e Implement hey codex and by codex workflow`.
- Reality Check now compares live Git against Project Brain recorded commits, and `hey codex` now fast-forwards from `origin/main` before reading Project Brain when the working tree is clean.
- `2963977 Add master map and agent routing` is classified as the latest governance implementation commit because it changed project governance/routing behavior.
- `8114210 Sync project brain commit model state` is classified as the latest closeout metadata/state-sync commit.
- `d1d6f88 Document Supabase staging-first shadow plan` is classified as the latest governance implementation commit because it changed the approved Supabase shadow environment sequence.
- `fc1dfa8 Prepare Supabase staging env placeholders` is classified as the latest implementation/setup commit because it added staging env placeholders and secret ignore rules.
- `9a81290 Reconcile Prisma schema for Supabase staging` is classified as the latest implementation/schema commit because it added `DIRECT_URL`, `ReportEquipmentItem.reportCounter`, and the report counter index.
- `b6b709b Reclassify ReportEquipmentItems exclusions` is classified as the latest implementation/planning commit because it changed approved migration planning language and import classification for excluded `ReportEquipmentItems` rows.
- `c11c460 Document import waves plan` is classified as an implementation/planning commit because it changed approved migration planning by defining Waves 1-4 and the Wave 1 gate for service-report replacement readiness.
- `9efa017 Refactor import planning and update Wave 1 baseline` is classified as the latest implementation/planning commit because it refactored Import Waves into agent-readable structured blocks, recorded Wave ownership/blockers/success criteria, and updated Wave 1 baseline counts after read-only source validation found legitimate new business data.
- `3abf7d3 Record Wave 1 staging import pass` is classified as the latest implementation/import commit because it added the Wave 1 staging import script, recorded validation PASS, and documented PostgreSQL staging counts and excluded legacy/test rows.
- `29331fb Read Wave 1 service reports from PostgreSQL` is classified as the latest implementation commit because it switched the Next.js service report list/detail screens from snapshot JSON to read-only PostgreSQL staging reads for Wave 1 data.
- `a28da7b Create autonomous agent orchestration governance` is classified as the latest implementation/governance commit because it made Codex the main Orchestrator for safe work, routed tasks to existing agent owners, and defined the stop-only-at-approval-gates loop.
- `fd76610 Fix Wave 1 service report display mapping` is classified as the latest implementation/read-display commit because it fixed Wave 1 service-report date fallback, pending-signature status display, missing-status fallback, and sparse equipment display without adding writes.
- `7f63193 Require project tree reporting` is classified as the latest implementation/governance commit because it made Project Tree Position mandatory for Reality Checks, Approval Gates, Autonomous Completion Reports, and `by codex` closeout.
- Prisma validation passed after reconciliation with process-only placeholder `DATABASE_URL` and `DIRECT_URL`.
- Prisma generate completed against local staging env values after explicit approval.
- Supabase staging-first shadow plan is approved: use `talcompressors-next-staging` first, then `talcompressors-next-prod` as production shadow only after staging validation passes.
- Local PostgreSQL is not the first target.
- Staging env placeholder file `.env.staging.example` was prepared with names only: `NEXT_PUBLIC_APP_ENV`, `DATABASE_URL`, and `DIRECT_URL`.
- `.gitignore` blocks real `.env` files while allowing env example files.
- Known excluded `ReportEquipmentItems` rows are classified as historical test data, not business data, no recovery required, excluded by design: 9 rows missing `ReportID` and 25 rows with unmatched `ReportID`.
- Import Waves are documented as structured `WAVE_ID` blocks: Wave 1 service-report core; Wave 2 service workflow; Wave 3 Maven data; Wave 4 extended operations.
- Wave 1 staging import ran on 2026-06-22T12:54:25.974Z / 2026-06-22 15:54 IDT against Supabase staging only.
- Wave 1 source CSV files were read from `data-sources/exports/`: `Customers_Final.csv`, `ServiceReports.csv`, and `ReportEquipmentItems.csv`.
- Wave 1 source counts were `Customers_Final = 763`, `ServiceReports = 63`, and `ReportEquipmentItems = 109`.
- Wave 1 DB counts read back through Prisma Client were `customers = 763`, `service_reports = 63`, and `report_equipment_items = 75`.
- Wave 1 excluded legacy/test `ReportEquipmentItems` counts were `9` missing `ReportID` and `25` unmatched `ReportID`; total excluded by design was `34`.
- Wave 1 validation result was `PASS`; validation report and import manifest were generated under ignored local path `data-sources/exports/import-runs/`.
- No Google Sheets writes, AppSheet changes, Maven changes, Apps Script changes, production actions, migrations, schema changes, Prisma db push, seed, or Wave 2/3/4 import occurred during Wave 1 import execution.
- Post-import Wave 1 Next.js review passed: `/service-reports` returned HTTP 200, `/service-reports/acd1133d` returned HTTP 200, 63 service report links rendered, and Prisma readback counts were `customers = 763`, `service_reports = 63`, and `report_equipment_items = 75`.
- Post-import Wave 1 display issues found: `service_date` is null for all 63 reports so dates are missing in UI; status mapping is incomplete because source status `ממתין חתימה` displays as `UNKNOWN`; some equipment fields are sparse, but sample report `acd1133d` renders equipment correctly.
- Wave 1 read/display mapping fixes completed and validated: service dates fall back to `raw_source` service date without DB writes; pending-signature source status maps to `Pending Signature`; missing source status displays as `Status Missing` instead of `UNKNOWN`; sparse equipment rows render safe fallbacks; sample report `acd1133d` renders with equipment details.
- Read-only staging validation after mapping fixes: `service_reports = 63`, `report_equipment_items = 75`, unknown dates `0`, pending-signature statuses `29`, signed statuses `32`, status-missing rows `2`, unknown statuses `0`, sparse fallback failures `0`.
- Read-only HTTP validation after mapping fixes: `/service-reports` HTTP 200, `/service-reports/acd1133d` HTTP 200, 63 service report links rendered, pending-signature display present, no `UNKNOWN DATE`, no `UNKNOWN` status display, sample detail date fallback present, and sample equipment subtitle present.
- Wave 2 connector dry-run validation completed on 2026-06-22 19:13 IDT without local Wave 2 CSV export files after Liad approved connector-only validation.
- Wave 2 read validation result: PASS. All eight approved tabs were readable through the Google Sheets connector: `ProductsCatalog`, `PartsUsed`, `AIDraftSuggestions`, `BusinessDocuments`, `BusinessDocumentItems`, `BusinessDocumentLog`, `ApprovalsLog`, and `EmailLog`.
- Wave 2 import readiness result: FAIL/BLOCKED. Blockers: duplicate SKU `SCR-20EPM`; `PartsUsed` contains one example row `P-EX-1` linked to unresolved `R-EXAMPLE`; `AIDraftSuggestions.CustomerID` contains customer name `רפת יזרעאל מעוז` instead of source ID in one row; `BusinessDocumentLog` rows appear shifted against the header; enum/status mappings require approval.
- Wave 2 observed row counts: `ProductsCatalog = 113`, `PartsUsed = 1`, `AIDraftSuggestions = 2`, `BusinessDocuments = 1`, `BusinessDocumentItems = 0`, `BusinessDocumentLog = 2`, `ApprovalsLog = 0`, `EmailLog = 0`.
- Wave 2 parent-link evidence: `AIDraftSuggestions.SourceReportID = 715fc06e` resolves to Wave 1 service report `5808`; `BusinessDocuments.SourceReportId = 890331ff` resolves to Wave 1 service report `5834`; `BusinessDocuments.CustomerId = 18803` resolves to an existing Wave 1 customer.
- No Google Sheets writes, AppSheet changes, Maven changes, Apps Script changes, DB writes, Supabase writes, imports, Prisma commands, or production actions occurred during Wave 2 connector validation.
- Staging PostgreSQL connectivity diagnostics after `.env.staging` update still failed on 2026-06-22: Prisma cannot reach `aws-1-eu-central-1.pooler.supabase.com:6543`; Next.js home page returns HTTP 200, but `/service-reports` and `/service-reports/acd1133d` return HTTP 500 because Prisma cannot connect.
- Correction: Supabase Project Settings > General verifies staging project id `mdlvxklufrchiabonafm`; earlier Project Brain references to a different staging ref were incorrect.
- Diagnostics found `.env.staging` contains `NEXT_PUBLIC_APP_ENV=staging`, `DATABASE_URL`, and `DIRECT_URL`; the connection user/project reference is `mdlvxklufrchiabonafm`, matching the verified staging project id. Prisma CLI loads `.env` by default, not `.env.staging`; for local Prisma validation, `.env` must be created temporarily from `.env.staging` or env must be loaded explicitly.
- After `.env` was temporarily created from `.env.staging`, `npx.cmd prisma validate` passed and `npx.cmd prisma db pull --print` moved to `P1001` connectivity against `aws-1-eu-central-1.pooler.supabase.com:5432`.
- Actual DB counts could not be read during the latest diagnostics because Prisma cannot connect. No DB writes, imports, migrations, Prisma schema commands, Google Sheets writes, AppSheet changes, Maven changes, Apps Script changes, or production actions occurred.
- Final staging connectivity diagnosis completed after a real read-only Prisma test outside the network sandbox: `customer.count() = 763`, `npx.cmd prisma db pull --print` exit code `0`, and no DB writes or migrations were run. Earlier `P1001` failures were sandbox/runtime network limitations, not a Supabase/project/env issue.
- Customers read-only module implemented in commit `45da4d0 Implement customers read-only module`: `app/customers/page.tsx`, `app/customers/[id]/page.tsx`, and `app/customers/customer-adapter.ts` were added; `app/page.tsx` now links the active Customers card to `/customers`. It uses existing Prisma `Customer` data, Server Component reads, relation counts, and service-report links only. No schema changes, migrations, env changes, DB writes, AppSheet changes, Maven changes, Apps Script changes, or production actions occurred.
- Customers module validation: scoped TypeScript check passed; `/`, `/customers`, `/customers/186DD`, `/service-reports`, and `/service-reports/acd1133d` returned HTTP 200. Full `npm.cmd run build` remains blocked by an existing unrelated missing `playwright` dependency in `scripts/playwright/appsheet-discovery-auth.ts`; `npm.cmd run lint` prompts for initial ESLint setup.
- Automatic Project Brain closeout sync governance implemented in commit `4ed6ca2 Require automatic project brain closeout sync`: `AGENTS.md`, `PROJECT_OPERATING_PROTOCOL.md`, and `PROJECT_INDEX.md` now require Project Brain updates before every final report after a completed task; required closeout fields are completed work, commit hash, validation results, current blocker or `none`, exact next task, approval gates, and project completion percentage; resolved blockers must be removed from current blocker state; final responses must not call a validated resolved issue blocked. Validation: `git diff --check` passed with CRLF warnings only. Project completion percentage remains 50%. No env changes, schema changes, migrations, DB writes/imports, deletes/moves, git remote changes, source-system changes, or production integrations occurred.
- Multi-agent operating workflow implemented in commit `28f9bf2 Add multi-agent operating workflow`: created `project-brain/agents/BUILDER_AGENT.md`, `project-brain/agents/MAP_GUARD_AGENT.md`, `project-brain/agents/QA_AGENT.md`, `project-brain/agents/REVIEWER_AGENT.md`, `project-brain/agents/AGENT_COMMUNICATION_PROTOCOL.md`, and `project-brain/agents/AUTONOMOUS_BUILD_WORKFLOW.md`; updated `AGENTS.md`, `PROJECT_OPERATING_PROTOCOL.md`, and `PROJECT_INDEX.md`. Validation: `git diff --check` passed with CRLF warnings only. Project completion percentage remains 50%. Import approval remained a later gate. No app code, schema, migrations, env files, DB writes/imports, source-system changes, deletes/moves, git remote changes, or production integrations occurred.
- ReportEquipmentItems / Equipment read-only module implemented in commit `3f1761f Add equipment read-only module`: added `/equipment` list, `/equipment/[id]` detail, read-only `ReportEquipmentItem` Prisma adapter, search/filter fields, service-report links, and active dashboard card. Validation: scoped TypeScript check passed; `git diff --check` passed with CRLF warnings only; read-only Prisma lookup found known equipment `3002f879`; local HTTP validation returned 200 for `/`, `/equipment`, `/equipment/3002f879`, `/service-reports`, `/service-reports/5e0eaae3`, and `/customers`. No schema changes, migrations, env changes, DB writes, imports, AppSheet changes, Maven changes, Apps Script changes, source-system changes, or production actions occurred. Project completion percentage is now 52%.
- PartsUsed read-only module implemented in commit `14542b5 Add PartsUsed read-only module`: added `/parts-used` list, `/parts-used/[id]` detail, read-only `PartUsed` Prisma adapter, search/filter fields, service-report/product context links, invalid enum filter hardening, and active dashboard card. Validation: scoped TypeScript check passed; `git diff --check` passed with CRLF warnings only; read-only Prisma validation found `parts_used = 0`; local HTTP validation returned 200 for `/`, `/parts-used`, `/parts-used?matchSource=BAD_VALUE`, `/service-reports`, `/equipment`, and `/customers`, and 404 for `/parts-used/not-a-real-part`. No schema changes, migrations, env changes, DB writes, imports, AppSheet changes, Maven changes, Apps Script changes, source-system changes, or production actions occurred. Current blocker is `none` for this read-only module. Project completion percentage is now 53%.
- Application route map documented in commit `7a8ce9b Add application route map`: created `APPLICATION_ROUTE_MAP.md` listing all implemented Next.js routes, module names, status, data source, record count, and AppSheet equivalent. Validation: actual `app/**/page.tsx` route files were enumerated; read-only Prisma count query verified `customers = 763`, `serviceReports = 63`, `reportEquipmentItems = 75`, `partsUsed = 0`, and `products = 0`; `git diff --check` passed. No app code, schema changes, migrations, env changes, DB writes, imports, source-system changes, or production actions occurred.
- Data coverage audit completed in commit `5a682ec Add data coverage audit`: created `DATA_COVERAGE_AUDIT.md` with read-only Prisma counts and readiness classifications for 19 requested models. Populated models are `Customer = 763`, `ServiceReport = 63`, and `ReportEquipmentItem = 75`. `PartUsed = 0` and `Product = 0` are empty. Inventory, AI draft, business document, automation, Maven, approval, email, sync, and error-log tables are not ready for useful read-only module validation because they have no staging rows. Validation: read-only Prisma counts succeeded; `git diff --check` passed. No app code, schema changes, migrations, env changes, DB writes, imports, source-system changes, or production actions occurred.
- Service Report central work screen enhanced in commit `71a5435 Enhance service report work screen`: `/service-reports/[id]` now shows a customer summary card, equipment summary section, disabled future action buttons for Create AI Draft, Create Business Draft, and Send to Maven, lifecycle placeholders for Draft not created, Maven not sent, and Customer not viewed, plus links to customer and equipment detail pages. Validation: scoped TypeScript passed; `git diff --check` passed with CRLF warnings only; local HTTP validation returned 200 for `/`, `/service-reports`, `/service-reports/acd1133d`, `/customers`, `/equipment`, and `/equipment/3002f879`; detail HTML contained all requested new work-screen labels/placeholders. No schema changes, migrations, env changes, DB writes, imports, AppSheet changes, Maven changes, Apps Script changes, source-system changes, or production actions occurred. Current blocker is `none` for this read-only enhancement. Project completion percentage is now 54%.
- Bidirectional module navigation implemented in commit `8e3fae9 Add bidirectional module navigation`: Customer detail labels linked service reports as Service Report work screens; Equipment detail links explicitly target the Service Report work screen; Service Report work screen continues linking back to Customer and Equipment detail pages; dashboard route map remains unchanged because no routes were added. Validation: scoped TypeScript passed; `git diff --check` passed with CRLF warnings only; sandbox HTTP validation confirmed `/` returned 200 while Prisma-backed routes were blocked by sandbox networking; outside the sandbox, `/`, `/customers`, `/customers/186DD`, `/equipment`, `/equipment/3002f879`, `/service-reports`, and `/service-reports/acd1133d` all returned HTTP 200, with Customer-to-ServiceReport, Equipment-to-ServiceReport, ServiceReport-to-Customer, and ServiceReport-to-Equipment link checks passing. No schema changes, migrations, env changes, DB writes, imports, AppSheet changes, Maven changes, Apps Script changes, source-system changes, production actions, or dashboard route changes occurred. Current blocker is `none` for this read-only enhancement. Project completion percentage is now 55%.
- Service Reports list context enhancement implemented in commit `9bd6435 Enhance service report list filters`: `/service-reports` now supports read-only search by report id/number, customer, technician, equipment, model, and serial; filters by status, customer, and has-equipment state; shows customer and equipment/model cues; preserves links to the Service Report work screen; and renders an empty state when no rows match. Validation: scoped TypeScript passed; `git diff --check` passed with CRLF warnings only; outside-sandbox route validation returned HTTP 200 for `/`, `/service-reports`, `/service-reports?q=acd1133d`, `/service-reports?status=Signed`, `/service-reports?q=no-such-report-filter-value`, `/service-reports/acd1133d`, `/customers`, and `/equipment`; controls, cue columns, work-screen links, search-result rendering, status filtering, and empty state checks passed. No schema changes, migrations, env changes, DB writes, imports, AppSheet changes, Maven changes, Apps Script changes, source-system changes, production actions, or route-map changes occurred. Current blocker is `none` for this read-only enhancement. Project completion percentage is now 56%.
- AI Draft Suggestions shell implemented in commit `f8f271e Add AI draft suggestions shell`: added `/ai-drafts`, `/ai-drafts/[id]`, and a read-only `AiDraftSuggestion` adapter; dashboard now links the active AI Drafts card; `APPLICATION_ROUTE_MAP.md` records the new routes with `AiDraftSuggestion` count `0`. The shell is empty-state-first and maps draft status, suggested parts, suggested labor, suggested document type, approval placeholder, and future Maven lifecycle placeholder for future rows. Validation: read-only Prisma count confirmed `AiDraftSuggestion count = 0`; scoped TypeScript passed; `git diff --check` passed with CRLF warnings only; outside-sandbox route validation returned HTTP 200 for `/`, `/ai-drafts`, `/service-reports`, `/customers`, and `/equipment`; `/ai-drafts/not-a-real-draft` returned 404; dashboard AI Draft link, empty state, document type column, and approval column checks passed. No schema changes, migrations, env changes, DB writes, imports, AppSheet changes, Maven changes, Apps Script changes, source-system changes, or production actions occurred. Current blocker is `none` for this read-only shell. Project completion percentage is now 57%.
- AI Draft runtime error investigation completed: `/ai-drafts` returned HTTP 500 only inside the network sandbox because Prisma could not reach `aws-1-eu-central-1.pooler.supabase.com:6543`; `/ai-drafts` returned HTTP 200 outside the sandbox. Root cause is the known sandbox Prisma connectivity limitation, not an AI Draft code/schema issue. No code fix is required. Build remains blocked by the unrelated existing missing `playwright` dependency/type declarations in `scripts/playwright/appsheet-discovery-auth.ts`.
- BusinessDocuments shell implemented in commit `5fb5e20 Add business documents shell`: added `/business-documents`, `/business-documents/[id]`, and a read-only `BusinessDocument` adapter using existing `BusinessDocument`, `BusinessDocumentItem`, and `BusinessDocumentLog` relations; dashboard now links the active Business Documents card; `APPLICATION_ROUTE_MAP.md` records the new routes with `BusinessDocument` count `0`. The shell is empty-state-first and maps lifecycle placeholders for Draft, Approved, Sent to Maven, Maven Created, Email Sent, and Customer Viewed, plus link placeholders to AI Draft, Service Report, Customer, and Maven Document. Validation: read-only Prisma counts confirmed `BusinessDocument = 0`, `BusinessDocumentItem = 0`, and `BusinessDocumentLog = 0`; scoped TypeScript passed; `git diff --check` passed with CRLF warnings only; outside-sandbox route validation returned HTTP 200 for `/`, `/business-documents`, `/ai-drafts`, `/service-reports`, and `/customers`; `/business-documents/not-a-real-document` returned 404; dashboard Business Documents link, empty state, Maven document column, AI draft column, and approval column checks passed. No schema changes, migrations, env changes, DB writes, imports, Maven/Invoice4U actions, AppSheet changes, Apps Script changes, source-system changes, or production actions occurred. Current blocker is `none` for this read-only shell. Project completion percentage is now 58%.
- Inventory stock route alias fixed in commit `bd2bf19 Fix inventory stock route`: `/inventory-stock` now redirects to the existing `/equipment` read-only module instead of returning 404. Investigation found the equipment/stock dashboard card points to `/equipment`, `app/equipment/page.tsx` exists, and `/equipment` returns HTTP 200; the broken route was the missing `/inventory-stock` path. Validation: scoped TypeScript passed; `git diff --check` passed; outside-sandbox route validation returned HTTP 200 for `/`, `/inventory-stock` after redirect to `/equipment`, `/equipment`, `/service-reports`, and `/customers`. No new data module, schema change, migration, env change, DB write/import, source-system action, or production integration occurred. Current blocker is `none` for this navigation fix. Project completion percentage remains 58%.
- AutomationCommands shell implemented in commit `1d5906c Add automation commands read-only shell`: added `/automation-commands`, `/automation-commands/[id]`, read-only `AutomationCommand` adapter, active dashboard card, and route-map entries. The staging table count is `AutomationCommand = 0`, so the list is empty-state-first while detail mapping is ready for future command rows. Validation: scoped TypeScript passed; `git diff --check` passed with CRLF warnings only; read-only Prisma count confirmed `AutomationCommand count = 0`; local route checks returned HTTP 200 for `/`, `/automation-commands`, `/service-reports`, and `/business-documents`; `/automation-commands/not-a-real-command` returned 404; dashboard link and empty-state checks passed. No DB writes, command execution, Maven/Invoice4U/email action, schema change, migration, env change, import, source-system change, or production action occurred. Current blocker is `none` for this read-only shell. Project completion percentage is now 59%.
- SCR matching preview panel implemented in commit `0decfa2 Add SCR matching preview panel`: `/service-reports/[id]` now shows a read-only SCR matching preview panel derived from existing ServiceReport/ReportEquipmentItem data and prior SCR analysis reports. For documented report `1e25bbb1` / report `5806`, the panel detects `SCR-40PM`, shows suggested SKU lines `25200007-005` and `25100043-071`, quantities, confidence scores, price sources, `needsPriceApproval`, fixed visit rule `300 NIS`, and labor rule placeholder `275 NIS/hour`. Non-SCR or unsupported SCR reports render an unavailable state. Validation: `git diff --check` passed with CRLF warnings only; outside-sandbox route validation returned HTTP 200 for `/`, `/service-reports`, `/service-reports/1e25bbb1`, `/customers`, and `/equipment`; the detail HTML contained `SCR matching preview`, `SCR-40PM`, both suggested SKUs, `Fixed rule: 300 NIS`, and `Fixed rule: 275 NIS/hour`; `npm.cmd run build` compiled app code successfully and then failed on the existing unrelated missing `playwright` dependency/type declarations in `scripts/playwright/appsheet-discovery-auth.ts`. No AI Draft creation, BusinessDocument creation, DB write/import, schema change, migration, env change, Maven/Invoice4U action, source-system change, or production action occurred. Current blocker is `none` for this read-only panel. Project completion percentage was previously overstated as 60% and is corrected to 56% by the capability formula.
- Completion model correction completed on 2026-06-24: `project-brain/FULL_PROJECT_DISCOVERY_AUDIT.md` found that the canonical 60% claim did not match the listed capability contributions. The current formula is Governance 15 + Supabase/Prisma 15 + Import/Wave 1 10 + Wave 1 UI 10 + Wave 2 6 + remaining pending capabilities 0 = 56. No evidence-based formula currently justifies increasing Wave 2 from 6% to 10%, so canonical completion is corrected to 56%. No code, Prisma, DB, agents, planning systems, business logic, workflows, source systems, or production systems were changed.
- AI Draft readiness and email intake schema documentation completed in commit `be89380 Document AI draft readiness rules`: approved SCR Small Service, Labor + Service, Technician Visit / Travel, Large Service oil, and partial-serial rules were documented; AI Draft readiness was rechecked as `READY_FOR_APPROVAL_BASED_DRAFTS`; `project-brain/EMAIL_INTAKE_EVIDENCE_PACKET_SCHEMA.md` was added. Validation: `git diff --check` passed with CRLF warnings only. No code, Prisma, DB, imports, Maven/Invoice4U, inventory, email runtime, source-system, customer-facing, or production workflow changes occurred.
- Executive Orchestrator governance completed in commit `76a9ba6 Upgrade orchestrator executive decision engine`: startup/closeout active-ID preservation rules were hardened; `ORCHESTRATOR_AGENT` was upgraded into the Executive Decision Engine with mandatory Executive Cycle, consultation summaries, scoring, duplicate-proof gates, self-improvement evidence packets, and Reality Check KPIs; Project Brain governance files were synchronized. Validation: `git diff --check` passed with CRLF warnings only before commit. No code, runtime, DB, Prisma, Maven, Inventory, email, source-system, customer-facing, or production changes occurred.
- Project execution mode transition completed in commit `c205dfb Transition project to capability building`: project mode is now `CAPABILITY_BUILDING`, governance status is `FROZEN`, and future task intake prioritizes working runtime capabilities over documentation expansion. Validation: `git diff --check` passed with CRLF warnings only before commit. No code, runtime, DB, Prisma, Maven, Inventory, email, source-system, customer-facing, or production changes occurred.
- AI Draft Recommendation Preview runtime implemented in commit `3a488e6 Add AI draft preview runtime`: added `/ai-drafts/preview/5806`, read-only recommendation assembly from existing `ServiceReport`, `ReportEquipmentItem`, `PartsUsed`, `Product`, `MavenDocumentItem`, `BusinessDocument`, `BusinessDocumentItem`, and `AiDraftSuggestion` reads, and a `Preview AI Draft` entry point from Service Report `1e25bbb1` / report `5806`. The preview shows Air Filter, Oil Filter, 3L SKR oil top-up, Labor + Service, and Technician Visit / Travel lines with approval flags, data coverage, historical match gaps, risks, and no-write/user-approval language. Validation: focused TypeScript passed; `git diff --check` passed with CRLF warnings only; `npm.cmd run build` compiled app code and then failed on the existing unrelated missing `playwright` dependency/type declarations; outside-sandbox route validation returned HTTP 200 for `/ai-drafts/preview/5806`, `/service-reports/1e25bbb1`, and `/ai-drafts`, with expected preview content and link checks passing. No DB writes, Prisma changes, schema changes, migrations, env changes, imports, BusinessDocument creation, Maven/Invoice4U action, inventory action, email/customer-facing action, source-system change, or production action occurred. Current blocker is `none` for this read-only runtime. Project completion percentage is now 57%.
- Maven Knowledge / Pricing Evidence Layer for AI Draft Preview implemented in commit `5bd445d Add pricing evidence to AI draft preview`: `/ai-drafts/preview/5806` now selects line pricing only from trusted read-only evidence, prioritized as ProductCatalog direct SKU or alias, then historical BusinessDocumentItems, then Maven item history. Each preview line shows pricing evidence or a safe empty evidence state. Missing or conflicting trusted prices keep approval required and do not invent a price. Validation: focused TypeScript passed; `git diff --check` passed with CRLF warnings only; outside-sandbox route validation returned HTTP 200 for `/ai-drafts/preview/5806`, `/service-reports/1e25bbb1`, and `/ai-drafts`, and the HTML contained `Pricing evidence`, `ProductCatalog`, `BusinessDocumentItems`, `Maven item history`, `No trusted pricing evidence`, Air Filter, Oil Filter, Labor + Service, Technician Visit / Travel, and the Service Report preview link. No DB writes, Prisma changes, schema changes, migrations, env changes, imports, BusinessDocument creation, Maven/Invoice4U action, inventory action, email/customer-facing action, source-system change, or production action occurred. Current blocker is `none` for this read-only runtime layer. Project completion percentage is now 58%.
- AI Draft Approval to BusinessDocument Draft runtime implemented in commit `d3f40a1 Add AI draft approval draft creation`: `/ai-drafts/preview/5806` now shows a protected draft creation panel and posts to a Server Action that rechecks the preview, requires the exact `APPROVE DRAFT` phrase, requires explicit pricing override when trusted price evidence is missing, blocks duplicate drafts for the same ServiceReport, and creates only one internal `BusinessDocument`, its `BusinessDocumentItems`, and a `BusinessDocumentLog` audit row. BusinessDocument is the internal draft; Maven is not the draft owner. BusinessDocument detail now displays item price-approval state and preserved pricing evidence from each item raw source. Validation: focused TypeScript passed; `git diff --check` passed with CRLF warnings only; GET route validation returned HTTP 200 for `/ai-drafts/preview/5806`, `/business-documents`, and `/service-reports/1e25bbb1`, and the preview HTML contained `Protected draft creation`, `Create internal BusinessDocument draft`, `pricing override`, no-Maven boundary text, and `Pricing evidence`. No validation POST was submitted, so no DB rows were created during validation. The implemented runtime itself has no Maven/Invoice4U action, no AutomationCommand creation, no email/customer-facing action, and no inventory deduction. Current blocker is `none` for this approved internal draft-creation gate. Project completion percentage is now 59%.
- BusinessDocument Review and Approval Page implemented in commit `3d4a667 Enhance business document review page`: `/business-documents/[id]` now presents an internal draft review screen with explicit `Internal Draft`, `Not sent`, `No Maven action`, `No email/customer-facing action`, and `No inventory deduction` states, a source ServiceReport link, all BusinessDocumentItems, preserved pricing evidence per item, and approval-required warnings for missing items/evidence or price approval. Validation: focused TypeScript passed; `git diff --check` passed with CRLF warnings only; read-only route validation returned HTTP 200 for `/business-documents` and `/ai-drafts/preview/5806`; the expected draft URL `/business-documents/NEXT-AI-DRAFT-5806` returned HTTP 404 because no BusinessDocument rows exist in staging and no protected POST was submitted. No DB writes, Maven/Invoice4U action, AutomationCommand creation, email/customer-facing action, inventory deduction, schema/env/migration change, import, source-system change, or production action occurred. Current blocker is `none` for this read-only review capability. Project completion percentage is now 60%.
- Maven document-generation AutomationCommand gate implemented in commit `5fafc36 Add Maven draft command gate`: `/business-documents/[id]` now shows a Maven document-output command gate and command-status panel. The protected Server Action requires the exact `CREATE MAVEN COMMAND` phrase, only allows BusinessDocument status `APPROVED` or `READY_TO_SEND`, blocks duplicate legacy `CREATE_MAVEN_DRAFT` AutomationCommands by BusinessDocument, blocks missing items and unresolved price approval, and creates only a pending internal `AutomationCommand` with idempotency metadata. `CREATE_MAVEN_DRAFT` is a Wave 2 legacy/internal compatibility name; future naming should be `CREATE_MAVEN_DOCUMENT`. Validation: focused TypeScript passed; `git diff --check` passed with CRLF warnings only; GET-only route validation outside the sandbox returned HTTP 200 for `/business-documents`, `/ai-drafts/preview/5806`, and `/automation-commands`, and `/business-documents/NEXT-AI-DRAFT-5806` returned expected HTTP 404 because no draft row exists and no protected POST was submitted. No validation POST was submitted, so no AutomationCommand row was created during validation. The implemented runtime performs no Maven/Invoice4U call, no email/customer-facing action, no inventory deduction, no BusinessDocument mutation, no schema/env/migration change, no import, no source-system change, and no production action. Current blocker is `none` for this protected internal command gate. Project completion percentage is now 61%.
- AutomationCommand Detail and Queue Review implemented in commit `e4bdfbc Enhance automation command review`: `/automation-commands` and `/automation-commands/[id]` now provide read-only queue review for pending legacy `CREATE_MAVEN_DRAFT` commands before execution. The list and detail views show command type, status, source BusinessDocument, source ServiceReport when linked, external target, payload summary, raw source summary, idempotency/duplicate-protection evidence, and explicit boundaries for Not executed, No Maven/Invoice4U call, No email/customer-facing action, and No inventory action. Validation: focused TypeScript passed; `git diff --check` passed with CRLF warnings only; GET-only route validation outside the sandbox returned HTTP 200 for `/automation-commands`, `/business-documents`, and `/ai-drafts/preview/5806`, and `/automation-commands/not-a-real-command` returned expected HTTP 404; content validation confirmed the rendered list contains read-only queue review and no-run-command boundary text. No command execution, DB write, Maven/Invoice4U action, customer-facing action, inventory action, schema/env/migration change, import, source-system change, or production action occurred. Current blocker is `none` for this read-only queue review capability. Project completion percentage is now 62%.
- Wave 2 end-to-end staging smoke test completed in commit `3d269fb Handle missing AI draft quantities`: ServiceReport `5806` / `1e25bbb1` was run through AI Draft Preview, protected internal BusinessDocument draft creation, BusinessDocument review, protected Maven document-generation AutomationCommand creation, AutomationCommand list/detail review, and duplicate checks. Initial protected draft submission exposed a runtime bug: the `Labor + Service` line used quantity `Missing hours`, causing `draftStatus=invalid-quantity`. The fix maps missing quantity to a zero-quantity approval-required BusinessDocument item, preserving safe review state. Observed created IDs: BusinessDocument internal `1d7f8500-1cb7-4d81-ad3a-b7d5d8b453eb`, AppSheet-style ID `NEXT-AI-DRAFT-5806`; AutomationCommand internal `db12ee97-0960-4f85-bdd5-f9fa30780885`, AppSheet-style ID `NEXT-MAVEN-CMD-NEXT-AI-DRAFT-5806`; command idempotency key `maven-draft:1d7f8500-1cb7-4d81-ad3a-b7d5d8b453eb` is legacy/internal compatibility wording. Duplicate draft attempt was blocked by the preview existing-draft/no-form state with only one BusinessDocument row present. Duplicate command attempt was blocked by the BusinessDocument existing-command/no-form state with only one legacy `CREATE_MAVEN_DRAFT` command row present. A staging-only eligibility update set the smoke-test BusinessDocument status to `APPROVED`, approval status to `APPROVED`, and five item `needsPriceApproval` flags to `false` only so the command gate could be exercised; this did not call Maven/Invoice4U, generate an external Maven document, send email, deduct inventory, touch source systems, or production. Route validation after writes returned HTTP 200 for `/ai-drafts/preview/5806`, `/business-documents/NEXT-AI-DRAFT-5806`, `/automation-commands`, `/automation-commands/NEXT-MAVEN-CMD-NEXT-AI-DRAFT-5806`, and `/service-reports/1e25bbb1`. Focused TypeScript passed; `git diff --check` passed with CRLF warnings only. Current blocker is `none` for the staging smoke test. Project completion remains 62% because this was validation plus a bug fix, not a new capability point.
- BusinessDocument Approval Workflow implemented in commit `b475f13 Add business document approval workflow`: `/business-documents/[id]` now has protected approve and return-to-review Server Actions. Approval requires the exact `APPROVE BUSINESS DOCUMENT` phrase, blocks missing/zero quantities and missing pricing unless the explicit override checkbox is selected, updates only internal BusinessDocument status/approval fields, and writes a `BusinessDocumentLog` audit row. Return-to-review requires a reason, updates the internal document back to review, and writes a `BusinessDocumentLog` audit row. The review page shows approval blockers, the exact approval phrase prompt, return reason form, and status history. Validation: focused TypeScript passed; `git diff --check` passed with CRLF warnings only; GET-only route validation returned HTTP 200 for `/business-documents/NEXT-AI-DRAFT-5806`, `/business-documents`, `/automation-commands/NEXT-MAVEN-CMD-NEXT-AI-DRAFT-5806`, and `/ai-drafts/preview/5806`, and confirmed the approval workflow, phrase, return-to-review, status history, and no-external-action boundary text. No validation POST was submitted, so no DB rows were written during validation. No Maven/Invoice4U call, automatic AutomationCommand creation, email/customer-facing action, inventory deduction, schema/env/migration change, import, source-system action, or production action occurred. Current blocker is `none`; project completion is now 63%.
- Wave 2 Approval Workflow POST Smoke Test completed on 2026-06-25 against BusinessDocument `NEXT-AI-DRAFT-5806` / `1d7f8500-1cb7-4d81-ad3a-b7d5d8b453eb`: exact-phrase approval without override redirected to `approvalStatus=override-required` and created no log; return-to-review with reason succeeded and created log `e4e1ce1a-f327-4e26-b7ff-6ec9af844835`; exact-phrase approval without override remained blocked from the returned state and created no log; explicit override approval succeeded and created log `006dd5bf-e832-42b5-91a4-01ba7d4386e5`. Final BusinessDocument state is `status=APPROVED`, `approvalStatus=APPROVED`, `approvedBy=Liad Approval Smoke - override`, `sourceStatusText=Approved with explicit review override`, `BusinessDocumentLog count=3`, and legacy `CREATE_MAVEN_DRAFT` AutomationCommand count `1`. The approval log raw data preserved blockers for 5 missing-price lines and 1 zero-quantity line and records `noMavenCall=true`, `noAutomationCommandCreated=true`, `noEmail=true`, and `noInventory=true`. Validation: focused TypeScript passed; `git diff --check` passed; route validation returned HTTP 200 for `/business-documents/NEXT-AI-DRAFT-5806?approvalStatus=approved`, `/business-documents/NEXT-AI-DRAFT-5806`, `/automation-commands/NEXT-MAVEN-CMD-NEXT-AI-DRAFT-5806`, `/business-documents`, and `/ai-drafts/preview/5806`, with expected status-history and no-external-action text. No Maven/Invoice4U call, automatic AutomationCommand creation, email/customer-facing action, inventory deduction, schema/env/migration change, import, source-system action, or production action occurred. Current blocker is `none`; project completion remains 63% because this was validation of an existing capability, not a new capability point.
- Maven Execution Adapter Dry Run implemented in commit `1ff28a3 Add Maven draft dry-run adapter`: `/automation-commands/[id]` now includes a protected legacy `CREATE_MAVEN_DRAFT` dry-run Server Action requiring exact phrase `DRY RUN MAVEN COMMAND`. The action reads the AutomationCommand payload, validates the linked BusinessDocument internal draft is `APPROVED`, checks customer/document/line item readiness, builds a dry-run Maven document-generation payload, stores the result under `AutomationCommand.rawSource.mavenDryRun`, and leaves external execution state uncompleted. Staging dry-run on `NEXT-MAVEN-CMD-NEXT-AI-DRAFT-5806` produced `DRY_RUN_BLOCKED` because five lines are missing trusted prices and `Labor + Service` has zero quantity. Command status remained `PENDING`, `processedAt=null`, `completedAt=null`, Maven fields stayed null, and `externalStateChanged=false`. Validation: focused TypeScript passed; `git diff --check` passed with CRLF warnings only; route validation returned HTTP 200 for `/automation-commands/NEXT-MAVEN-CMD-NEXT-AI-DRAFT-5806?dryRunStatus=dry-run-blocked`, `/automation-commands/NEXT-MAVEN-CMD-NEXT-AI-DRAFT-5806`, `/automation-commands`, and `/business-documents/NEXT-AI-DRAFT-5806`, with expected dry-run result, blockers, would-send summary, and no-external-action text. No Maven/Invoice4U call, external document generation, email/customer-facing action, inventory action, schema/env/migration change, import, source-system action, or production action occurred. Current blocker is `none` for the dry-run adapter; project completion is now 64%.
- BusinessDocument Line Resolution Layer implemented in commit `8538455 Add business document line resolution layer`: `/business-documents/[id]` now includes protected internal line-correction forms and a Server Action that updates only `BusinessDocumentItem` quantity, unit price, total price, approval-required flag, and pricing evidence in `rawSource`, while writing `BusinessDocumentLog` audit history for every correction. Validation: focused TypeScript passed; `git diff --check` passed with CRLF warnings only; GET route validation returned HTTP 200 for `/business-documents/NEXT-AI-DRAFT-5806`, `/business-documents/NEXT-AI-DRAFT-5806?lineStatus=line-saved`, and `/automation-commands/NEXT-MAVEN-CMD-NEXT-AI-DRAFT-5806`, with expected line-resolution UI, status messaging, pricing evidence fields, and no-external-action text. No correction POST was submitted during validation, so no DB rows were changed by validation. No Maven/Invoice4U call, AutomationCommand execution, email/customer-facing action, inventory deduction, schema/env/migration change, import, source-system action, or production action occurred. Current blocker is `none` for the layer; Maven dry-run remains a separate explicit action after actual corrections; project completion is now 65%.
- Internal Business Document and Payment Engine implemented in commit `4b87e1b Add internal business document payment engine`: `lib/business-document-engine.ts` now calculates internal BusinessDocument VAT, totals, payment amount, balance due, receipt-payment requirements, export blockers, warnings, supported document types, supported payment sources, and future check/bank-proof attachment readiness. `/business-documents/[id]` renders the engine review panel and keeps external export blocked until explicit approval. Validation: focused TypeScript passed for touched files; repo-wide TypeScript still fails on pre-existing unrelated AI Draft pricing-evidence typing and missing Playwright dependency/type issues; `git diff --check` passed with CRLF warnings only; route validation returned HTTP 200 for `/business-documents` and `/business-documents/NEXT-AI-DRAFT-5806`, with expected engine panel, document types, payment sources, balance due, and blocked-export boundary. No DB write, schema change, Maven/Invoice4U call, real export implementation, email/customer action, inventory deduction, source-system action, production action, or attachment upload/storage implementation occurred. Current blocker is `none`; next task is Maven customer/document/item matching analysis, Maven document-generation API contract evidence, Maven API secret placement planning, payment attachment readiness planning, or read-only Maven source row-count/schema validation; project completion is now 66%.
- Internal BusinessDocument HTML Preview implemented in commit `368cd1b Add business document HTML preview`: `/business-documents/[id]/preview` renders a read-only Hebrew RTL HTML document preview based on the Maven sample PDF structure, including company/logo area, customer block, document date/due-date placeholder, document title/type/number, line table, subtotal/VAT/total/payment/balance, notes, footer, and digital-signature area. It reuses the existing BusinessDocument adapter and internal engine output and links from the BusinessDocument review page. Validation: focused TypeScript passed for touched files; `git diff --check` passed with CRLF warnings only; route validation returned HTTP 200 for `/business-documents/NEXT-AI-DRAFT-5806` and `/business-documents/NEXT-AI-DRAFT-5806/preview`, with expected `טל קומפרסורים`, `Tal Compressors`, document number, source ServiceReport, Air Filter line, Subtotal, VAT, Balance due, Digital signature area, and no-Maven boundary content. No PDF generation, DB write, schema change, Maven/Invoice4U call, real export implementation, email/customer action, inventory deduction, source-system action, or production action occurred. Current blocker is `none`; next task is Maven customer/document/item matching analysis, Maven document-generation API contract evidence, Maven API secret placement planning, payment attachment readiness planning, or read-only Maven source row-count/schema validation; project completion is now 67%.
- Wave 2 Line Resolution POST Smoke Test completed on 2026-06-25 against BusinessDocument `NEXT-AI-DRAFT-5806` / `1d7f8500-1cb7-4d81-ad3a-b7d5d8b453eb`: internal staging DB writes were used only to validate line correction and dry-run revalidation. Five line corrections were saved with test/manual pricing evidence and `BusinessDocumentLog` audit rows: `a3c0f56b-bb70-4c85-999d-30b26075ac67`, `7a8a2933-a591-441b-ab11-fafbf0bae1db`, `534763b1-29b5-4258-9214-0121d51e32da`, `66ecc9ec-e2cd-4d0c-bb7e-7ff26313ad9c`, and `1f76221b-0f9c-4039-a096-699b7da314a9`. Final line values are Air Filter `qty=3`, `unit=120`, `total=360`; Technician Visit / Travel `qty=1`, `unit=300`, `total=300`; Oil Filter `qty=3`, `unit=90`, `total=270`; 3L SKR oil top-up `qty=9`, `unit=45`, `total=405`; Labor + Service `qty=2`, `unit=275`, `total=550`; all have `needsPriceApproval=false`. Recalculated BusinessDocument blocker count is `0`. Maven dry-run was rerun only after fixes and produced `DRY_RUN_VALIDATED` with blocker count `0`, warnings `0`, `externalStateChanged=false`, AutomationCommand status still `PENDING`, `processedAt=null`, and `completedAt=null`. Validation: focused TypeScript passed; `git diff --check` passed; route validation outside the sandbox returned HTTP 200 for `/business-documents/NEXT-AI-DRAFT-5806`, `/automation-commands/NEXT-MAVEN-CMD-NEXT-AI-DRAFT-5806`, and `/automation-commands/NEXT-MAVEN-CMD-NEXT-AI-DRAFT-5806?dryRunStatus=dry-run-validated`. No Maven/Invoice4U call, command execution, external document creation, email/customer-facing action, inventory deduction, schema/env/migration change, import, source-system action, or production action occurred. Current blocker is `none`; project completion remains 65% because this was validation of an existing capability, not a new capability point.

## Current Task

Manufacturer Parts Registry Import + Service Kit Intelligence Planning/MVP is complete as a safe no-DB-write foundation. The PM Series SCR COMP workbook was parsed from its OOXML contents and converted into generated registry fixtures under `data-sources/vendor-spare-parts/generated/`: 9 PM models, 250 manufacturer part rows, 8 service interval kit candidates per PM model, and 69 shared manufacturer SKU overlaps. Runtime now reads the generated registry fixture through `lib/manufacturer-parts-registry.ts` instead of the prior hard-coded 40PM seed; Excel files are not read at runtime. The matcher remains generic: ServiceReport -> equipment model evidence -> Manufacturer Parts Registry fixture -> part category match -> BusinessDocumentItem enrichment. Manufacturer SKU remains internal-only. Customer preview/PDF still uses only linked Tal/internal sales SKU and hides SKU when sales SKU mapping is missing. EPM Series remains partial-only because it is a legacy binary `.xls`; exact sheet/row extraction requires approved parser/conversion tooling or a different environment. No schema changes, DB writes, imports, Maven/Invoice4U calls, customer/email actions, inventory actions, source-system changes, production actions, or package installs occurred.

Current blocker: none for the PM fixture/import MVP and service-kit intelligence planning. Remaining gates: EPM exact extraction tooling approval, future schema/import approval before a real Manufacturer Parts Registry table, explicit DB-write approval before any import, explicit real Maven execution approval, separate customer-facing/email approval, and separate inventory approval.

## Manufacturer Registry Alias and Conflict Validation

Completed as documentation/validation only:

- Verified generated PM registry fixture models are `10PM2`, `15PM2`, `20PM2`, `30PM`, `40PM`, `50PM`, `60PM`, `75PM`, and `100PM`.
- Verified `20APM` does not exist as an exact model in the generated PM fixture.
- Verified `20PM2` oil separator evidence from the generated PM fixture: manufacturer `SCR COMP`, series `PM2`, model `20PM2`, part category `OIL_SEPARATOR`, SKU `25350030-021`, source file `data-sources/vendor-spare-parts/Spare Parts Service List(PM Series) rev3 (1).xls`, source sheet `20PM2`, source row `8`, review status `REVIEWED_SAMPLE_CATEGORY`.
- Verified existing canonical rules in `MANUFACTURER_KNOWLEDGE_BASE.md` and `PART_COMPATIBILITY_REGISTRY.md`: `20APM = 20PM2` is an identity alias only; `20APM Oil Separator = 30PM Oil Separator` is an approved compatibility exception; `20APM Oil Separator != 20PM2 Oil Separator` is an approved non-compatibility rule.
- Updated `SKU_MATCHING_RULES.md` and `MANUFACTURER_SERVICE_KITS.md` so alias/model normalization conflicts must be marked needs-review and shared SKU overlap must not create shared service kits.

No runtime behavior changed. Customer PDF behavior was not changed. No DB write, schema change, package install, Maven/Invoice4U call, email/customer action, inventory action, source-system action, or production action occurred.

## EPM/APM Excel Parser Strategy

Completed as planning/strategy only:

- Verified the source files remain local: PM workbook is OOXML-in-`.xls`; EPM workbook is legacy binary `.xls`.
- Verified current local tooling: `soffice`/LibreOffice is not installed; Node is available; `python` is only the Windows Store shim and `py` is unavailable.
- Recommended path: after explicit approval, use LibreOffice conversion from legacy `.xls` to `.xlsx`, then reuse the existing read-only OOXML extraction path to produce generated fixtures. This avoids adding a runtime parser dependency and keeps Excel parsing out of the app runtime.
- Rejected `openpyxl` for this source because it does not parse binary `.xls`.
- Kept Node parser packages as a fallback only after explicit package-by-package approval.
- Kept manual Excel export as a fallback if tool install is not approved, with row-preservation and operator/date/hash audit requirements.
- Defined 20APM validation checks: exact source sheet/row, oil separator SKU, comparison against `20PM2` SKU `25350030-021` from PM sheet `20PM2` row 8, conflict handling, and no shared-kit inference from overlap.

No package install, DB write, schema change, runtime behavior change, Maven/Invoice4U call, email/customer action, inventory action, source-system action, or production action occurred.

## Wave 3 Legacy Excel Parser Strategy

Completed as planning only:

- Evaluated LibreOffice conversion, Node legacy `.xls` parser packages, manual conversion/export, Python/openpyxl, Python legacy parser packages, and Windows Excel COM automation.
- Recommended one preferred solution: approved LibreOffice headless conversion from legacy `.xls` to `.xlsx`, then reuse the existing read-only OOXML extractor.
- Reasoning: best balance of source-row accuracy, automation, maintainability, performance for vendor workbook size, and future scalability across manufacturer files without adding Excel parsing to the app runtime.
- Defined the future manufacturer Excel import workflow: intake, file classification, approved conversion, extraction, validation, fixture versioning, review, runtime fixture use, separately approved DB promotion, and update/diff workflow.
- Reconfirmed mandatory business rules: do not guess manufacturer data; every SKU must trace to source file/sheet/row; PM/APM alias normalization cannot override source evidence; conflicts become `REVIEW_REQUIRED`.
- Reconfirmed 20APM future validation: exact `20APM` source sheet/row is required; oil separator SKU must be extracted from source evidence; compare against `20PM2` SKU `25350030-021` from PM sheet `20PM2` row 8; if exact evidence is missing, remain blocked and do not infer.

No package install, parser implementation, DB write, schema change, runtime behavior change, Maven/Invoice4U call, external API call, email/customer action, inventory action, source-system action, or production action occurred.

## Wave 3 PDF Export Smoke Test and Governance Lock

Completed:

- Opened `/business-documents/NEXT-AI-DRAFT-5806/pdf` through Chrome/Playwright. The route correctly starts an attachment download named `NEXT-AI-DRAFT-5806-internal-preview.pdf`.
- Rendered the temporary downloaded PDF in Chrome's PDF viewer for manual inspection.
- Confirmed the PDF opens correctly and has two pages.
- Confirmed Hebrew/RTL customer and document layout is readable.
- Confirmed after a read/display bug fix that totals match the expected smoke values: subtotal `1885.00 ILS`, VAT `320.45 ILS` at 17%, total `2205.45 ILS`, and balance due `2205.45 ILS`.
- Confirmed a read-only DB check shows no sent/exported state changed: `status=APPROVED`, `sendStatus=null`, `mavenPdfLink=null`, and `mavenDocumentNumber=null`.
- Confirmed the app route performs no file persistence; temporary local smoke-test download/screenshot files were removed after inspection.
- Documented npm audit findings without running `npm audit fix`.
- Added governance lock in `PROJECT_OPERATING_PROTOCOL.md`: Codex must not install new npm packages without explicit approval per package.

Smoke-test bug fix:

- The first PDF render showed `ILS 0.00` totals because stored BusinessDocument header totals are stale while corrected line items total `1885`.
- `lib/business-document-engine.ts` now uses current line totals as the effective review/PDF subtotal when stored header totals are missing or stale, calculates 17% VAT when stored VAT/total are missing, and records warnings for missing/stale stored totals.
- This is read/display logic only. It does not write corrected totals back to the database.

npm audit findings:

- `next` direct dependency has a critical aggregate finding under the installed `15.3.4`; npm reports fix available at `next@15.5.19` without a semver-major upgrade.
- `postcss` transitive dependency has a moderate finding via `next`; npm reports the same `next@15.5.19` fix path.
- No automatic fix was run.

Known visual gap:

- Chrome's PDF viewer shows a minor horizontal overlap line crossing the subtotal row on page 2. Totals are readable and correct, but print layout polish remains before customer-facing export.

Boundaries:

- No Maven/Invoice4U call.
- No external API call.
- No email/customer-facing action.
- No inventory action.
- No DB write.
- No schema/Prisma change.
- No saved PDF/file persistence by the app.
- No sent/exported status mutation.
- No source-system or production action.

Current blocker:

- None for internal PDF smoke validation.
- Customer-facing PDF/export remains blocked by the real external execution/customer delivery gates and by remaining layout polish.

Project completion:

- Remains `68%`; this was smoke validation plus a bug fix/governance lock for an existing Wave 3 capability, not a new capability point.

## Wave 3 PDF Visual Polish Bugfix

Completed:

- Fixed the minor horizontal line crossing the subtotal row in the internal PDF export.
- Change is CSS/print-layout only in `app/globals.css`.
- Added print-safe `break-inside` / `page-break-inside` rules for line rows and totals blocks, gave the totals box a white background, and added print spacing between the line table and totals section.

Validation:

- Focused TypeScript check passed for the BusinessDocument preview/PDF route and adapter/engine files.
- Preview route `/business-documents/NEXT-AI-DRAFT-5806/preview` returned HTTP 200.
- PDF route `/business-documents/NEXT-AI-DRAFT-5806/pdf` returned HTTP 200.
- PDF response `Content-Type` remained `application/pdf`.
- Totals still rendered in the preview as `1885.00 ILS`, `320.45 ILS`, and `2205.45 ILS`.
- Temporary Chrome PDF viewer render of page 2 confirmed the subtotal row is no longer crossed by the horizontal line.
- Temporary validation PDF/screenshot files were removed.

Boundaries:

- CSS/preview/PDF visual bugfix only.
- No DB write.
- No Maven/Invoice4U call.
- No email/customer action.
- No inventory action.
- No schema change.
- No totals logic change.
- No source-system or production action.

Current blocker:

- None for internal PDF visual polish.
- Customer-facing export remains gated by explicit external/customer delivery approval.

Project completion:

- Remains `68%`; this was a visual bugfix for an existing capability, not a new capability point.

## Wave 3 Hebrew Customer-Facing PDF Layout Fix

Completed:

- Converted visible document labels on `/business-documents/[id]/preview` and the generated PDF to Hebrew RTL.
- Changed table headers to `מספר`, `תיאור`, `כמות`, `מחיר`, and `סה"כ`.
- Changed totals labels to `סה"כ`, `מע"מ 17%`, `סה"כ לתשלום`, `שולם`, and `יתרה לתשלום`.
- Removed internal staging notes, pricing evidence, source/debug fields, boundary text, unsupported/legacy type text, and Maven references from the preview/PDF surface.
- Kept internal warnings and governance context on the BusinessDocument review page only.
- Replaced the PDF attachment filename with `NEXT-AI-DRAFT-5806.pdf`.
- Tightened CSS/print layout so the PDF renders as one readable A4 page without cutting.

Validation:

- Focused TypeScript check passed for the BusinessDocument preview/PDF route, adapter, and engine files.
- Preview route `/business-documents/NEXT-AI-DRAFT-5806/preview` returned HTTP 200.
- PDF route `/business-documents/NEXT-AI-DRAFT-5806/pdf` returned HTTP 200.
- PDF response `Content-Type` remained `application/pdf`.
- PDF response signature remained `%PDF-`.
- PDF response attachment filename is `NEXT-AI-DRAFT-5806.pdf`.
- Preview content confirms totals `1885.00 ILS`, `320.45 ILS`, and `2205.45 ILS`.
- Preview content checks confirmed no `Internal`, no `pricing evidence`, no `Unsupported`, and no `Maven` text on the customer-facing preview surface.
- Temporary Chrome PDF viewer render confirmed one page (`1 / 1`), Hebrew RTL readability, visible totals, notes, and footer without cutting.
- Temporary validation PDF/screenshot files were removed.

Boundaries:

- Preview/PDF visual/layout bugfix only.
- No DB write.
- No Maven/Invoice4U call.
- No email/customer action.
- No inventory action.
- No schema change.
- No totals logic change.
- No source-system or production action.

Current blocker:

- None for internal Hebrew customer-facing preview/PDF rendering.
- Real Maven/Invoice4U execution, saved file persistence, and customer delivery remain separate approval gates.

Project completion:

- Remains `68%`; this was a visual/layout hardening pass on the existing Wave 3 PDF capability, not a new capability point.

## Wave 3 Manufacturer SKU Excel Source Planning

Completed:

- Inventoried existing spreadsheet SKU/source files in the repo.
- Extended reusable Knowledge Bases: `project-brain/MANUFACTURER_PARTS_REGISTRY.md`, `project-brain/MANUFACTURER_SERVICE_KITS.md`, and `project-brain/SKU_MATCHING_RULES.md`.
- No new planning file was created because existing Project Brain owner specs already existed.

Observed source files:

| File | Evidence status | Notes |
|---|---|---|
| `data-sources/vendor-spare-parts/Spare Parts Service List(PM Series) rev3 (1).xls` | Inspected through Office Open XML extraction | `.xls` extension but zipped workbook structure; sheets `10PM2`, `15PM2`, `20PM2`, `30PM`, `40PM`, `50PM`, `60PM`, `75PM`, `100PM` |
| `data-sources/vendor-spare-parts/Spare Parts Service List(EPM Series) rev2 (1).xls` | Partial binary-string evidence only | Legacy binary `.xls`; strings confirm EPM model coverage and part categories, but exact sheet/row extraction requires approved parser/conversion |
| `data-sources/exports/*.csv` | Existing Wave 1 exports | Service/equipment/customer evidence only; not manufacturer SKU authority |

Observed PM workbook structure:

- Row 1 contains title such as `Recommendatory Spare parts of SCR40PM series`.
- Row 2 contains columns: `Item`, `Model`, `Code`, `spare parts name`, `specification`, `Unit`, `Rated qty for each`, quotation/cost, service interval columns, exchange time, and remark.
- Rows 4+ contain manufacturer part rows.
- `Code` is the manufacturer SKU / part number.
- `Model` is the source model.
- `spare parts name` is the part description.
- For `40PM`, observed examples include `25100043-071` air filter core, `25200007-005` Oil Filter, `25300045-023` oil separator, and `80000175-039` Coolant.

Planning decisions:

- Manufacturer Excel files are trusted technical SKU/model compatibility sources.
- Manufacturer workbook prices/costs are not customer selling prices.
- ServiceReport equipment model should map to a compatible SKU list only through exact/approved model normalization and reviewed workbook rows.
- AI suggested items should map to manufacturer SKU only when model, part category, and source row evidence are high confidence.
- If no confident match exists, set SKU review required and do not show SKU on customer-facing PDF.
- Customer-facing PDF may show SKU only when trusted and approved for display.
- Internal review should show matched SKU, manufacturer, confidence, source Excel file/sheet/row, compatible models, and needs-review flag.
- Future inventory and purchase orders must consume the same SKU registry and internal SKU mapping layer.

Future schema plan:

- Do not migrate yet.
- Later approved schema should separate `ManufacturerSkuSourceFile`, `ManufacturerSkuSourceSheet`, `ManufacturerSku`, `ManufacturerSkuCompatibility`, `InternalSkuMapping`, and `SkuMatchAuditEvidence`.
- Required audit fields include source file hash/name, sheet, row, raw/normalized model, manufacturer part number, description, part category, compatible models, interval quantity evidence, parser version, review flag, approver, and manual override reason.

Matching rules recorded:

1. Exact model match.
2. Approved normalized model match.
3. Part keyword/category match.
4. Manufacturer SKU row match.
5. Manual override with source evidence and reason.

Unknowns / missing evidence:

- EPM workbook exact sheets/columns/rows are not fully extracted yet because the file is legacy binary `.xls` and no approved parser/conversion is available in this session.
- Manufacturer name is inferred from source context but should be explicitly recorded during import review.
- Internal Tal SKU mapping is still separate from manufacturer part number and remains unapproved unless Liad approves the mapping.
- Customer-facing SKU display policy needs a future UI/runtime task before any PDF SKU rendering.

Boundaries:

- Planning/read-only only.
- No schema changes.
- No DB writes.
- No import.
- No Maven/Invoice4U call.
- No email/customer action.
- No inventory action.
- No production/source-system action.

Project completion:

- Remains `68%`; this is planning/enrichment of existing SKU governance, not a new runtime capability.

## Wave 2 Closeout Summary

ServiceReport `5806` / `1e25bbb1` complete chain:

1. AI Draft Preview route `/ai-drafts/preview/5806` produced internal suggested lines.
2. Pricing evidence layer displayed trusted evidence or approval-required empty state without inventing prices.
3. Protected approval created BusinessDocument `NEXT-AI-DRAFT-5806` / `1d7f8500-1cb7-4d81-ad3a-b7d5d8b453eb`.
4. BusinessDocument review displayed source ServiceReport link, items, pricing evidence, warnings, and no-external-action boundaries.
5. BusinessDocument approval workflow approved the internal draft with explicit override history.
6. Protected Maven command gate created one AutomationCommand `NEXT-MAVEN-CMD-NEXT-AI-DRAFT-5806` / `db12ee97-0960-4f85-bdd5-f9fa30780885` with idempotency key `maven-draft:1d7f8500-1cb7-4d81-ad3a-b7d5d8b453eb`.
7. AutomationCommand review showed command payload, source BusinessDocument, source ServiceReport, and not-executed boundaries.
8. Maven dry-run initially blocked on missing prices and zero labor quantity.
9. Line Resolution POST smoke test corrected five draft lines with internal test/manual evidence and one audit log per line.
10. Final Maven dry-run result is `DRY_RUN_VALIDATED`, blocker count `0`, warnings `0`, command status `PENDING`, `processedAt=null`, `completedAt=null`, and `externalStateChanged=false`.

Final line values:

- Air Filter: quantity `3`, unit price `120`, total `360`, `needsPriceApproval=false`.
- Technician Visit / Travel: quantity `1`, unit price `300`, total `300`, `needsPriceApproval=false`.
- Oil Filter: quantity `3`, unit price `90`, total `270`, `needsPriceApproval=false`.
- 3L SKR oil top-up: quantity `9`, unit price `45`, total `405`, `needsPriceApproval=false`.
- Labor + Service: quantity `2`, unit price `275`, total `550`, `needsPriceApproval=false`.

Boundaries confirmed:

- No Maven/Invoice4U call.
- No AutomationCommand execution.
- No external document creation.
- No email/customer-facing action.
- No inventory deduction.
- No production/source-system touch.
- No schema/env/migration/import change.
- No customer-facing send or payment update.

Wave 2 completion decision:

- Mark Wave 2 Service Workflow Layer complete because all approved Wave 2 workflow criteria are satisfied: read-only workflow surfaces exist; protected internal write gates are idempotent and audited; BusinessDocument approval and line resolution are validated; AutomationCommand queue/detail review is visible before execution; Maven dry-run validates the would-send payload; ServiceReport `5806` chain has reached `DRY_RUN_VALIDATED`; all forbidden external actions remained untouched.
- Project completion remains `65%`: Wave 2 contributes its full `15% / 15%`; no Wave 3, Wave 4, real automation runtime, or production-readiness percentage is claimed.

## Maven Execution Readiness Checklist

Real Maven execution is `APPROVAL_REQUIRED` and may not proceed until all items below are confirmed:

1. Liad explicitly approves real Maven execution for AutomationCommand `NEXT-MAVEN-CMD-NEXT-AI-DRAFT-5806`.
2. Confirm the exact execution path and owner: Next.js Server Action executor, legacy AppSheet Bot / Apps Script executor, or another approved single owner. Do not allow two executors for the same command.
3. Re-read the live AutomationCommand and confirm `status=PENDING`, `result=DRY_RUN_VALIDATED`, `processedAt=null`, `completedAt=null`, and idempotency key `maven-draft:1d7f8500-1cb7-4d81-ad3a-b7d5d8b453eb`.
4. Re-read the linked BusinessDocument and confirm `status=APPROVED`, `approvalStatus=APPROVED`, no Maven document number/PDF link exists, and all five line values still match the final values listed above.
5. Re-run dry-run immediately before execution and require `DRY_RUN_VALIDATED`, blocker count `0`, warnings reviewed, and `externalStateChanged=false`.
6. Review the dry-run `wouldSendToMaven` payload line by line with Liad, including customer, source ServiceReport, item names, quantities, unit prices, totals, currency, and document type.
7. Confirm manual/test pricing evidence is acceptable for real Maven document generation or replace it with trusted production pricing evidence before execution.
8. Confirm target environment and credentials are correct for Maven; do not use production/customer-facing systems accidentally.
9. Confirm duplicate protection: no existing Maven document fields on the BusinessDocument and no completed Maven command for the same idempotency key.
10. Define the exact post-execution internal updates allowed after a successful Maven response, including command status/result, Maven document id/number/PDF link fields, and audit log.
11. Define the exact failure handling: command remains inspectable, error is recorded, no retry loop without explicit approval, and no customer-facing action.
12. Confirm email/customer send remains separately gated after Maven document generation.
13. Confirm inventory deduction remains separately gated and is not part of Maven execution.
14. Confirm rollback/containment plan: if a Maven output document is generated incorrectly, handle it through Maven’s allowed manual correction/cancellation path and preserve internal audit history.
15. Record the final approval phrase and operator identity before implementation or execution. No phrase is active in runtime yet for real execution.

## Wave 2 Architecture Audit

Audit scope:

- Documentation-only architecture review before Wave 3.
- No runtime behavior changed.
- No DB writes performed.
- No Maven/Invoice4U, email/customer-facing, inventory, source-system, schema, migration, import, or production action performed.

Original migration-plan comparison:

- The original `WAVE_2_SERVICE_WORKFLOW` migration plan was import-oriented: ProductsCatalog, PartsUsed, AIDraftSuggestions, BusinessDocuments, BusinessDocumentItems, BusinessDocumentLog, ApprovalsLog, and EmailLog were to be prepared for staging import after blocker resolution and approval.
- The completed Wave 2 runtime work deliberately did not perform that import. It instead delivered a protected internal workflow chain for ServiceReport `5806`.
- Runtime Wave 2 satisfies the approved workflow-continuity objective for one audited report, but it does not satisfy the original Wave 2 import success criteria. Wave 2 import remains unapproved/deferred.
- Original forbidden boundaries held: no production import, no Maven write, no business-document automation execution, no email sending, and no AppSheet/Google Sheets mutation.

Runtime review:

| Runtime | Owner / route | Audit result | Debt |
|---|---|---|---|
| AI Draft Preview | `app/ai-drafts/ai-draft-adapter.ts`, `/ai-drafts/preview/[reportCounter]` | PASS for ServiceReport `5806`; safe empty state for unsupported reports | Report `5806` / SCR Small Service logic is hard-coded and must be generalized before broader use |
| Pricing Evidence Layer | AI draft adapter plus ProductCatalog, BusinessDocumentItem, and Maven item reads | PASS; prices are selected only from trusted evidence and missing evidence stays approval-required | Evidence gathering, confidence, and price selection are embedded in the preview adapter instead of a reusable pricing-evidence service |
| AI Draft approval to BusinessDocument | `app/ai-drafts/preview/[reportCounter]/actions.ts` | PASS; Server Action creates only internal BusinessDocument, items, and log after exact phrase and override gate | Draft IDs, operator default, phrase, and line mapping are inline |
| BusinessDocument review and approval | `app/business-documents/[id]/page.tsx`, `app/business-documents/[id]/actions.ts` | PASS; read-first page, exact approval phrase, return-to-review, audit logs, no external side effects | Approval blockers are duplicated between adapter display mapping and action validation |
| BusinessDocument line resolution | `app/business-documents/[id]/actions.ts` | PASS; protected Server Action edits only approved internal line fields and logs every change | `rawSource.pricingEvidence` shape is implicit JSON and should become a typed internal contract |
| Maven AutomationCommand gate | `app/business-documents/[id]/actions.ts` | PASS; creates only one internal legacy `CREATE_MAVEN_DRAFT` command after approved/ready status and exact phrase | `CREATE_MAVEN_DRAFT` is a Wave 2 compatibility name; future naming should be `CREATE_MAVEN_DOCUMENT`; command payload/idempotency contract is inline with the page action |
| AutomationCommand review and dry-run | `app/automation-commands/[id]`, `app/automation-commands/[id]/actions.ts` | PASS; queue/detail review is read-only before dry-run, and dry-run stores would-send payload without external completion | Dry-run validator and Maven payload builder are inline and should be extracted before real execution |

Duplicated logic found:

- UUID lookup helpers are repeated across AI Draft, BusinessDocument, AutomationCommand, and PartsUsed adapters/actions.
- JSON record readers are repeated as `readObject`, `readRecord`, and `readJsonObject`.
- Decimal parsing/formatting and positive-quantity validation are repeated across BusinessDocument and AutomationCommand flows.
- BusinessDocument approval blockers and Maven dry-run line blockers overlap.
- Redirect builders, approval phrase constants, and no-external-action boundary copy are split across pages/actions/adapters.

Temporary or hard-coded debt:

- ServiceReport `5806` and SCR40PM Small Service rule are currently special-cased.
- `NEXT-AI-DRAFT-*` and `NEXT-MAVEN-CMD-*` generated IDs are acceptable for staging but should be centralized before broad use.
- Default operator value `Liad` is hard-coded in protected forms/actions.
- Approval phrases are hard-coded per action.
- Manual/test pricing evidence from the smoke test is valid for staging validation but must be reviewed or replaced before real Maven execution.
- Fixed service/travel/labor values such as `300` and `275` are in runtime logic and need evidence-backed configuration before broad use.

Server Actions and adapter boundary audit:

- PASS: internal writes are implemented through Server Actions in `app/ai-drafts/preview/[reportCounter]/actions.ts`, `app/business-documents/[id]/actions.ts`, and `app/automation-commands/[id]/actions.ts`.
- PASS: no API route was added for internal write flows.
- PASS: adapters are mostly read/display mapping layers.
- Debt: AI Draft adapter mixes recommendation assembly, pricing evidence, report-specific service rules, and existing BusinessDocument lookup.
- Debt: BusinessDocument adapter mixes display mapping, readiness/blocker calculation, command-gate copy, and lifecycle labels.
- Debt: AutomationCommand dry-run action mixes validation, Maven payload construction, and persistence.

Responsibility audit:

- AI Draft is responsible for recommendation preview and pricing evidence. Current implementation is safe but too report-specific.
- BusinessDocument is responsible for internal draft review, approval state, line resolution, and audit history. This boundary is mostly clean.
- AutomationCommand is responsible for queue/detail review and dry-run validation. It does not execute Maven, but the dry-run service should be extracted before real execution work.

Wave 2 Technical Debt Report:

- HIGH: Generalize report `5806` AI Draft logic into a service-pattern/recommendation registry before using the preview broadly.
- HIGH: Extract Maven command validation and would-send payload building before any real Maven execution adapter is implemented.
- MEDIUM: Centralize UUID, JSON, decimal, redirect, phrase, and boundary-copy helpers.
- MEDIUM: Define a typed internal shape for `pricingEvidence`, line resolution metadata, and `mavenDryRun`.
- MEDIUM: Move approval/readiness blockers into one shared BusinessDocument readiness module.
- MEDIUM: Replace hard-coded staging/default operator and fixed price values with approved evidence/config paths.
- LOW: Review feature-specific CSS organization after runtime scope stabilizes.

Refactoring candidates:

1. Add shared `isUuid` and canonical ID lookup utilities.
2. Add shared JSON record readers for Prisma JSON values.
3. Add shared decimal parse/format/positive validation utilities.
4. Extract BusinessDocument approval/readiness/blocker calculation.
5. Extract Maven document-generation command validation and dry-run payload construction.
6. Extract pricing evidence gathering and trusted price selection from the AI Draft adapter.
7. Centralize approval phrases and no-external-action boundary labels.
8. Generalize ServiceReport `5806` line-definition logic into an approved service-pattern rule source.

Safe to start Wave 3 checklist:

- PASS for read-only Maven data discovery and import planning only.
- PASS if Wave 3 starts by mapping Maven-origin tabs, Maven item history, document links, customer links, product links, and duplicate/idempotency requirements.
- PASS if existing Wave 2 runtime behavior remains frozen while Wave 3 reads/discovers.
- REQUIRED: no real Maven execution, no AutomationCommand execution, no external document creation, no email/customer-facing action, no inventory action, no source-system mutation, no schema/env/migration/import, and no production action without separate explicit approval.
- REQUIRED before broad runtime use: address or accept the high-priority generalization/refactoring debt above.
- REQUIRED before real Maven execution: satisfy the Maven Execution Readiness Checklist and receive explicit Liad approval.

Architecture audit decision:

- Safe to start Wave 3 only as read-only Maven Knowledge Layer discovery/import planning.
- Not safe to start real Maven execution from this audit alone.
- Project completion remains `65%`; the audit added no runtime capability percentage.

## Wave 3 Start: Maven Knowledge Layer Read-Only Discovery

Scope:

- Wave 3 starts as read-only Maven knowledge mapping only.
- Wave 2 runtime is frozen except bug fixes.
- No real Maven/Invoice4U execution.
- No AutomationCommand execution.
- No DB writes except Project Brain documentation.
- No email/customer-facing action.
- No inventory action.
- No production/source-system changes.

Wave 3 plan:

1. Preserve Wave 2 `5806` chain as the reference internal draft/command case.
2. Map current `BusinessDocument` + `BusinessDocumentItems` + `Customer` + `ServiceReport` fields into the dry-run Maven payload.
3. Compare the dry-run payload with legacy Apps Script `CreateMavenDraft` command expectations.
4. Discover the actual Maven document-create API endpoint and required field names before implementing any real executor.
5. Confirm Maven-origin source tabs and target models: `InvoiceMavenCustomers`, `InvoiceMavenDocuments`, `InvoiceMavenDocumentItems`, `InvoiceMavenItems`, `SyncState`, `SyncLog`, `ErrorLog`, and any other Maven-origin tab.
6. Define a reusable Maven payload-builder extraction plan from `app/automation-commands/[id]/actions.ts`.
7. Define validation gates for customer identity, document type, line items, pricing, totals, duplicate protection, and external-state containment.
8. Stop before any real Maven call, command execution, source mutation, schema change, import, email, or inventory action.

BusinessDocument internal draft -> Maven document-generation payload mapping:

| Current internal field | Current dry-run key | Maven / legacy expectation | Readiness |
|---|---|---|---|
| `AutomationCommand.appsheetCommandId` | `commandId` | Legacy `CommandID` in Apps Script webhook | READY for idempotent command identity |
| `AutomationCommand.idempotencyKey` | `idempotencyKey` | Internal duplicate guard, not proven Maven API field | READY internally; external mapping unknown |
| `BusinessDocument.appsheetBusinessDocumentId` | `businessDocumentId` | Legacy `BusinessDocumentId` | READY |
| `BusinessDocument.id` | `internalBusinessDocumentId` | Internal trace only | READY internally |
| `BusinessDocument.documentTypeSelected` | `documentType` | Maven document type field | GAP: exact accepted Maven values unknown |
| `BusinessDocument.draftTitle` | `title` | Human title/description; exact Maven field unknown | GAP |
| `BusinessDocument.description` | `description` | Human description; exact Maven field unknown | GAP |
| `BusinessDocument.currency` | `currency` | Maven item/document currency, observed as `ILS` / `currency_code` in history | READY with validation |
| `subtotalAmount`, `vatAmount`, `totalAmount` | amount fields | Maven totals may be calculated by Maven from lines | GAP: decide whether to send totals or validate only |
| `Customer.appsheetCustomerId` | `customer.customerId` | Internal/AppSheet customer ID | GAP: real Maven likely needs Maven customer ID or matched customer object |
| `Customer.businessId` | `customer.businessId` | Possible customer matching key | NEEDS validation against Maven customer history |
| `Customer.name` | `customer.name` | Customer display/name match | READY as evidence, not enough as sole key |
| `Customer.emailPrimary`, `phonePrimary`, `address` | customer contact fields | Optional/customer metadata depending on Maven API | GAP: exact requiredness unknown |
| `ServiceReport.appsheetReportId`, `reportCounter`, `reportNumberText` | `sourceServiceReport` | Internal trace only | READY internally; not necessarily Maven field |
| `BusinessDocumentItem` line order | `items[].lineNumber` | Maven item sequence | READY |
| `BusinessDocumentItem.appsheetItemId` / `id` | `items[].itemId` | Internal trace only | READY internally |
| linked `Product.sku` | `items[].sku` | Product/Maven item matching candidate | GAP: Maven item ID/SKU requirement unknown |
| `itemName`, `description` | `items[].name`, `items[].description` | Maven line description/name | READY pending exact API field names |
| `quantity`, `unitPrice`, `totalPrice` | line quantity/price/total | Required commercial line values | READY after dry-run validation; totals must be reconciled |
| `needsPriceApproval` | line blocker flag | Internal approval gate only | READY internally; must be false before execution |

Required Maven fields identified so far:

- Definite internal/legacy command fields: `CommandID`, `Command=CreateMavenDraft`, `BusinessDocumentId`, idempotency key, requested operator, requested timestamp.
- Definite document fields from current dry-run: document type, title/description, currency, subtotal/VAT/total evidence, customer identity, source ServiceReport trace, and line items.
- Definite line fields from current dry-run: line number, internal item ID, SKU when available, name, description, quantity, unit price, total price, and approval-required flag.
- Definite Maven history fields already observed in sync code: Maven document ID, document number, document type, Maven customer ID/name, document date, total, VAT amount, status description, PDF link, raw JSON, line item description/name, quantity, price, total, and currency.
- Unknown before real execution: actual Maven document-generation endpoint, auth payload, required customer identifier, allowed document type values, whether line item SKU/Maven item ID is required, whether Maven calculates totals, output status flag, PDF generation behavior, and response fields.

Missing data gaps:

1. Real Maven document-generation API endpoint and request/response contract are not present in the checked Apps Script source.
2. Current legacy `createMavenDraft(data)` updates Google Sheet `BusinessDocuments` status to `DraftRequestReceived`; it does not prove an external Maven document is generated.
3. Maven customer matching for `NEXT-AI-DRAFT-5806` must be validated against `MavenCustomer` / `InvoiceMavenCustomers` before real execution.
4. Exact Maven document type mapping for `SERVICE_DOCUMENT` is unknown.
5. Exact item identity rule is unknown: free-text lines may be accepted, or Maven may require Maven item IDs/SKUs.
6. VAT/tax behavior is unknown: determine whether to send VAT, let Maven calculate VAT, or send tax-exempt/including-VAT flags.
7. Manual/test pricing evidence is not automatically acceptable for real external document generation.
8. Existing Maven duplicate search criteria must be defined: by BusinessDocument ID, ServiceReport ID/counter, customer/date/amount, and idempotency key.

Maven payload-builder extraction plan:

- Extract `validateCommand` and `buildMavenDraftPayload` from `app/automation-commands/[id]/actions.ts` into a shared internal service before real execution work. The current function name is a compatibility name; future public command naming should use Maven document-generation terminology.
- Proposed module: `lib/maven-draft-payload.ts` or `lib/maven/maven-draft-payload.ts`.
- Service responsibilities: read/accept a fully selected command/document shape, validate command type/status/document readiness, validate customer and line items, normalize decimal fields, build a typed internal payload, return blockers/warnings/payload without persistence.
- Server Action responsibilities after extraction: enforce phrase, load command, call the shared service, store dry-run result, revalidate routes, redirect.
- Real executor, if later approved, must reuse the same shared validator/payload builder and add only an approved transport adapter plus approved post-execution internal updates.

Readiness checklist before real Maven execution:

1. Explicit Liad approval for real Maven execution remains required.
2. Select exactly one executor owner: Next.js Server Action executor, legacy Apps Script executor, or another approved owner.
3. Prove the real Maven document-generation endpoint, auth method, request schema, response schema, error schema, and rate limits from primary Maven/API evidence.
4. Validate Maven customer mapping for the target BusinessDocument.
5. Validate document type mapping from internal `SERVICE_DOCUMENT` to accepted Maven value.
6. Validate every line item field: description/name, quantity, unit price, total, currency, SKU/Maven item ID if required, and line ordering.
7. Decide VAT/tax handling and total reconciliation rules.
8. Replace or explicitly accept manual/test pricing evidence before external document generation.
9. Re-run dry-run and require `DRY_RUN_VALIDATED`, blockers `0`, warnings reviewed, and `externalStateChanged=false`.
10. Confirm duplicate protection: no Maven fields on the BusinessDocument, no completed Maven command for the idempotency key, and no matching Maven document already exists.
11. Define exactly which internal fields may be updated after success: AutomationCommand status/result/processed/completed timestamps, BusinessDocument Maven document ID/number/PDF/status fields, and audit log.
12. Define failure handling: no retry loop without approval, error recorded, command inspectable, no customer-facing action.
13. Keep email/customer send and inventory deduction as separate gates.

Wave 3 start decision:

- Wave 3 read-only discovery is active.
- The first Wave 3 implementation candidate is extracting the dry-run payload builder into a shared internal service, but only if explicitly selected; this task did not change runtime behavior.
- Real Maven execution is not approved.
- Project completion remains `65%`; Wave 3 has started but no Wave 3 runtime/import capability point is claimed yet.

## Wave 3 Maven Payload Builder Extraction

Implementation:

- `lib/maven-draft-payload.ts` now owns `buildMavenDraftPayload`, `validateMavenDraftPayload`, and the `MavenDraftBlockersAndWarnings` type.
- `app/automation-commands/[id]/actions.ts` still owns the protected dry-run Server Action, exact phrase gate, command lookup, internal AutomationCommand update, route revalidation, and redirect behavior.
- `scripts/validate-maven-draft-payload.ts` is a focused compile-time validation fixture for the extracted builder/validator using a safe in-memory command shape.

Behavior decision:

- No dry-run behavior changed intentionally.
- Existing blocker strings and warning strings were preserved.
- Existing `wouldSendToMaven` payload shape was preserved.
- Existing dry-run persistence remains limited to `AutomationCommand.rawSource.mavenDryRun`.

Boundaries:

- No real Maven/Invoice4U call.
- No external execution.
- No DB writes during implementation or validation.
- No email/customer-facing action.
- No inventory action.
- No source-system or production change.

Validation:

- Focused TypeScript passed for the extracted module, validation fixture, and AutomationCommand dry-run action.
- Focused TypeScript passed for the Wave 2 AI Draft, BusinessDocument, AutomationCommand pages/actions/adapters plus the new module and validation fixture.
- `git diff --check` passed with CRLF warnings only.
- Route validation returned HTTP 200 for `/ai-drafts/preview/5806`, `/business-documents/NEXT-AI-DRAFT-5806`, `/automation-commands/NEXT-MAVEN-CMD-NEXT-AI-DRAFT-5806?dryRunStatus=dry-run-validated`, and `/automation-commands`, with expected dry-run, line, pricing, and no-external-action content.

Result:

- Wave 3 now has a reusable internal Maven document-generation payload/validation foundation.
- Real Maven execution remains blocked until API-contract evidence, executor ownership, target environment, final payload approval, idempotency checks, allowed post-execution writes, and failure handling are explicitly approved.
- Project completion remains `65%`; this was a behavior-preserving internal refactor, not a new external runtime/import capability point.

## Wave 3 Maven Terminology Correction

Correction:

- Maven does not create the internal draft.
- `BusinessDocument` is the internal draft and review object.
- `BusinessDocumentItems` are the internal draft lines.
- Maven/Invoice4U is document generation/output only.
- `CREATE_MAVEN_DRAFT` is a legacy/internal Wave 2 command type name retained for compatibility with existing code, staging rows, route links, idempotency evidence, and smoke-test records.
- Future naming should use `CREATE_MAVEN_DOCUMENT` for new command types, UI language, docs, and executor planning when it can be introduced safely.
- Existing staging IDs such as `NEXT-MAVEN-CMD-NEXT-AI-DRAFT-5806` must not be renamed now because it risks breaking current references and validation evidence.

Boundary:

- Documentation-only Project Brain correction.
- No runtime behavior change.
- No code rename.
- No staging ID rename.
- No DB write, schema change, import, Maven/Invoice4U action, Apps Script/AppSheet/Google Sheets/source-system/production change, email/customer-facing action, or inventory action.

Result:

- Future Wave 3 work should say Maven document generation/output, not Maven draft creation.
- Historical records may still contain the exact legacy token `CREATE_MAVEN_DRAFT`, but must identify it as legacy/internal compatibility terminology.

## Wave 3 Read-Only Maven Source Inventory

Scope:

- Wave 3 Maven source inventory was completed as documentation-only discovery.
- No runtime behavior changed.
- No DB write, schema change, import, Maven/Invoice4U execution, Apps Script deployment, AppSheet change, Google Sheets write, email/customer-facing action, inventory action, source-system change, or production action occurred.

Artifact:

- Canonical inventory file: `project-brain/migration/MAVEN_SOURCE_INVENTORY.md`.
- Inventory commit: `5b6c44b Document Maven source inventory`.

Objects inventoried:

- Maven imported history/reference data: `InvoiceMavenDocuments`, `InvoiceMavenDocumentItems`, `InvoiceMavenCustomers`, and `InvoiceMavenItems`.
- Sync/observability state: `SyncState`, `SyncLog`, and `ErrorLog`.
- Business workflow bridge objects: `BusinessDocuments`, `BusinessDocumentItems`, `BusinessDocumentLog`, `AutomationCommands`, and selected `ServiceReports` Maven flags.
- Supporting config/governance: `Lists`, `AutomationRegistry`, `AppMenu`, Apps Script properties, and Maven-related Apps Script functions.

Produced:

1. Maven Object Inventory with purpose, primary key, relationships, read/write direction, fields, required/optional fields, current usage, dependencies, and migration recommendation.
2. Maven Relationship Diagram.
3. Maven Data Flow for historical sync, command/draft bridge, and current Next.js dry-run.
4. Migration Recommendation for every Maven-related object.
5. Unknowns / Missing Evidence list.

Key findings:

- The confirmed real Maven API call in checked local source is document search/import: `POST https://app.invoice-maven.co.il/api/documents/searchDocuments`.
- Checked local source does not prove the real Maven document-generation endpoint, request schema, response schema, error schema, or rate limits.
- Legacy `createMavenDraft(data)` in checked Apps Script source logs/updates internal workflow state and is potentially misleading by name; no external Maven document-generation call was found in that function.
- Root `apps-script/MavenAPI.js` and Project Brain snapshot `project-brain/apps-script/MavenAPI.gs` differ; production-current source must be reconciled before any real executor work.
- `InvoiceMavenDocumentItems` remains the strongest current Maven line-level pricing evidence source; `InvoiceMavenItems` requires reconciliation with `ProductsCatalog` before it can safely support execution.

Migration recommendations:

- Keep in Next.js/PostgreSQL: Maven documents, document items, customers, items, sync state/logs/errors, BusinessDocuments, BusinessDocumentItems, BusinessDocumentLog, and AutomationCommands.
- Retire AppSheet/UI support tables only after native Next.js replacements exist and AppSheet retirement is approved.
- Do not migrate Apps Script backfill functions as runtime; convert only to one-off approved repair/import utilities if needed.
- Keep exactly one command executor owner for real Maven work; never allow legacy Apps Script and Next.js to execute the same command path in parallel.

Current blocker:

- None for read-only source inventory.
- Real Maven execution remains blocked by missing primary Maven document-generation API contract evidence and lack of explicit Liad approval.

Validation:

- Evidence source reads were local/repository-only.
- `git diff --check` passed with CRLF warnings only.
- TypeScript and route validation are not required for this docs-only Project Brain inventory because no runtime files changed.

Project completion:

- Remains `65%`.
- Wave 3 Maven Knowledge Layer is still `0% / 15% STARTED READ-ONLY`; this inventory improves readiness but does not add a runtime/import capability point.

## Wave 3 Maven API Environment Placeholders

Scope:

- Prepared Maven API environment placeholders for future configuration.
- Documented the required Maven API values and pre-execution checklist.
- No real Maven secrets were added to git.
- No Maven API call occurred.
- No real Maven execution adapter was implemented.

Files:

- `.env.staging.example`
- `project-brain/migration/MAVEN_SOURCE_INVENTORY.md`

Placeholder names added:

- `MAVEN_API_BASE_URL`
- `MAVEN_API_KEY`
- `MAVEN_API_AUTH_MODE`
- `MAVEN_API_DOCUMENT_SEARCH_ENDPOINT`
- `MAVEN_API_DOCUMENT_GENERATION_ENDPOINT`
- `MAVEN_API_CUSTOMER_LOOKUP_ENDPOINT`
- `MAVEN_API_ITEM_LOOKUP_ENDPOINT`
- `MAVEN_API_TARGET_ENVIRONMENT`
- `MAVEN_API_TIMEOUT_MS`
- `MAVEN_EXECUTION_ENABLED=false`

Checklist documented:

- Confirm target environment.
- Confirm base URL, endpoints, and auth mode from primary Maven/API evidence.
- Confirm document generation endpoint, response fields, error schema, rate limits, timeout, retry, idempotency, duplicate protection, VAT/tax behavior, customer matching, item identity, no-auto-email behavior, rollback/correction path, and allowed internal post-success writes.
- Keep `MAVEN_EXECUTION_ENABLED=false` until explicit Liad approval.

Boundary:

- Documentation/placeholders only.
- No code reads these variables yet.
- No runtime behavior changed.
- No real secret committed.
- No DB write, schema change, import, Maven/Invoice4U action, Apps Script/AppSheet/Google Sheets/source-system/production change, email/customer-facing action, or inventory action.

Current blocker:

- None for placeholder preparation.
- Real Maven execution remains blocked by missing primary Maven document-generation API contract evidence, target-environment approval, secret placement approval, executor implementation approval, and explicit Liad approval for any real Maven call.

Project completion:

- Remains `65%`.
- This improves Wave 3 readiness but does not add a runtime/import capability point.

## Wave 3 Internal Business Document and Payment Engine

Implementation:

- Added `lib/business-document-engine.ts` as the internal validation/review engine for business document and payment readiness.
- Wired the engine into `app/business-documents/business-document-adapter.ts`.
- Added a review panel to `app/business-documents/[id]/page.tsx` showing internal document type, VAT, totals, payment amount, balance due, payment readiness, export blockers, warnings, supported document types, and supported payment sources.
- Added scoped layout CSS in `app/globals.css`.
- Updated BusinessDocument Maven command wording in `app/business-documents/[id]/actions.ts` and related UI text to Maven document-generation terminology while preserving existing enum/function names for compatibility.

Supported internal document types:

- `QUOTE` / `הצעת מחיר`
- `PROFORMA_INVOICE` / `חשבון עסקה`
- `TAX_INVOICE` / `חשבונית מס`
- `RECEIPT` / `קבלה`
- `TAX_INVOICE_RECEIPT` / `חשבונית מס קבלה`
- `PURCHASE_ORDER` / `הזמנת רכש`
- `DELIVERY_NOTE` / `תעודת משלוח`
- `CREDIT_NOTE` / `זיכוי`

Supported internal payment sources:

- Bank transfer
- Check
- Credit card
- Cash
- Other
- Future uploaded check image
- Future bank proof attachment

Engine behavior:

- `BusinessDocument` remains the source of truth.
- Uses existing `BusinessDocument`, `BusinessDocumentItems`, and raw source JSON only; no schema change.
- Calculates line subtotal, document subtotal, VAT, total, payment amount, and balance due for review.
- Blocks external export readiness when document type is unsupported, items are missing, pricing is unresolved, quantity is invalid, total is missing, or receipt-based documents lack payment amount.
- Shows warnings when line subtotal and document subtotal differ, when payment exceeds total, or when no internal payment source is recorded.
- Payment evidence and future attachments are planning/review signals only; they do not create receipts, upload files, contact customers, call Maven/Invoice4U, or affect inventory.
- Financial intake design is documented in `project-brain/DOCUMENT_ENGINE.md`: future Financial Intake Engine must support `FinancialEvidence`, extraction drafts, matching engine, payment suggestions, user approval, and later Receipt or Tax Invoice / Receipt creation. `PaymentEvidence` is only a subtype/legacy wording when needed. Evidence sources include check image, bank transfer proof, bank export, bank screenshot, PDF proof, email proof, manual entry, and future bank API. Extracted data is suggestion-only and not trusted final data.

Boundary:

- No external API call.
- No Maven/Invoice4U call.
- No real export implementation.
- No email/customer-facing action.
- No inventory deduction.
- No DB write during implementation or validation.
- No schema or Prisma change.
- No real payment attachment upload/storage implementation.
- No OCR implementation.
- No FinancialEvidence or PaymentEvidence Prisma model or schema change.

Validation:

- Focused TypeScript passed for `lib/business-document-engine.ts`, `app/business-documents/business-document-adapter.ts`, `app/business-documents/[id]/page.tsx`, and `app/business-documents/[id]/actions.ts`.
- Repo-wide TypeScript still fails on pre-existing unrelated AI Draft pricing evidence typing and missing Playwright dependency/type issues.
- `git diff --check` passed with CRLF warnings only.
- Route validation on the existing local Next server returned HTTP 200 for `/business-documents` and `/business-documents/NEXT-AI-DRAFT-5806`.
- Content validation confirmed the BusinessDocument route renders `Internal document and payment engine`, supported document/payment types, `QUOTE / הצעת מחיר`, `TAX_INVOICE_RECEIPT / חשבונית מס קבלה`, `Bank transfer`, `Future bank proof attachment`, `Balance due`, and `Blocked until explicit approval`.

Current blocker:

- None for the internal read/review engine.
- External export remains blocked until explicit approval, Maven/Invoice4U API contract evidence, target environment, secret placement, post-success write rules, and rollback/failure handling are approved.
- Payment attachments remain planning-only until storage, privacy, evidence review, and retention rules are approved.

Project completion:

- Moves to `66%` by adding one Wave 3 internal review/validation capability point.
- This does not approve external execution.

## Wave 3 Internal BusinessDocument HTML Preview

Implemented:

- New route `/business-documents/[id]/preview`.
- Read-only Maven-sample-inspired HTML layout with logo/company area, customer block, document date/due-date placeholder, title/type/number, item table, subtotal/VAT/total/payment/balance, notes, footer, and digital-signature area.
- Uses the existing BusinessDocument adapter and `engineReview` output.
- Supports generic BusinessDocument document types through the engine label/code.
- Review page now links to the preview.

Validation:

- Focused TypeScript check passed for `app/business-documents/business-document-adapter.ts`, `app/business-documents/[id]/page.tsx`, `app/business-documents/[id]/preview/page.tsx`, and `lib/business-document-engine.ts`.
- `git diff --check` passed with CRLF warnings only.
- Route validation returned HTTP 200 for `/business-documents/NEXT-AI-DRAFT-5806` and `/business-documents/NEXT-AI-DRAFT-5806/preview`.
- Preview content validation confirmed `טל קומפרסורים`, `Tal Compressors`, `Document number`, `NEXT-AI-DRAFT-5806`, `Source ServiceReport`, `Air Filter`, `Subtotal`, `VAT`, `Balance due`, `Digital signature area`, and `No Maven/Invoice4U action`.

Boundaries:

- HTML preview only.
- No PDF generation.
- No Maven/Invoice4U call.
- No email/customer-facing action.
- No inventory deduction.
- No DB write.
- No schema/Prisma change.
- No source-system or production action.

Current blocker:

- None for the HTML preview.

Next task:

- Candidate tasks are Maven customer/document/item matching analysis for `NEXT-AI-DRAFT-5806`, real Maven document-generation API contract evidence packet, Maven API secret placement plan, payment attachment readiness plan, or read-only Maven source row-count/schema validation.

Project completion:

- Moves to `67%` by adding one Wave 3 internal HTML preview capability point.
- Wave 3 is now `2% / 15% STARTED INTERNAL`.
- No production-readiness, real Maven execution, PDF generation, email, inventory, or cutover points are claimed.

## Wave 3 Preview Accuracy Pass Against Maven Sample

Implemented:

- Improved `/business-documents/[id]/preview` spacing and print-document proportions.
- Added a visible internal-only boundary strip.
- Tightened company/header and document identity layout.
- Reworked metadata into a Maven-style document-number/type/source strip.
- Added fixed table column classes, stronger header styling, alternating line backgrounds, and tighter RTL alignment.
- Reworked totals block spacing and total emphasis.
- Added a signature line and stronger footer boundary.
- Added explicit A4 `@page` print CSS.
- Kept due date empty because no trusted field exists.
- Kept logo placeholder because no approved Tal logo asset exists in the repo.

Evidence gaps:

- `document_102488.pdf` was not found in the repository during local search, so direct PDF rendering comparison was not possible in this pass.
- Existing image assets found were dependency icons and an AppSheet screenshot, not a safe Tal logo asset.

Validation:

- Focused TypeScript check passed for `app/business-documents/[id]/preview/page.tsx`, `app/business-documents/business-document-adapter.ts`, and `lib/business-document-engine.ts`.
- Repo-wide TypeScript still fails on pre-existing unrelated AI Draft pricing-evidence typing and missing Playwright dependency/type issues.
- `git diff --check` passed with CRLF warnings only.
- Route validation returned HTTP 200 for `/business-documents/NEXT-AI-DRAFT-5806/preview` and `/business-documents/NEXT-AI-DRAFT-5806`.
- Preview content validation confirmed `Internal HTML preview only - not a tax document`, `Logo asset gap`, `Document type`, `Source`, `Air Filter`, `Subtotal`, `VAT`, `Balance due`, `Digital signature area`, and `No Maven/Invoice4U action`.

Boundaries:

- HTML/CSS only.
- No PDF generation.
- No Maven/Invoice4U call.
- No external API call.
- No email/customer-facing action.
- No inventory deduction.
- No DB write.
- No schema/Prisma change.
- No source-system or production action.

Current blocker:

- None for the preview accuracy pass.
- Direct visual parity remains limited until `document_102488.pdf` or a rendered sample screenshot is available in the workspace.

Project completion:

- Remains `67%`; this is an accuracy/refinement pass on an existing Wave 3 preview capability, not a new capability point.

## Maven Sample Asset Import

Imported reference:

- `project-brain/reference/maven-samples/document_102488.pdf`
- Size observed locally: `61973` bytes.
- Purpose: reference artifact only for BusinessDocument preview accuracy work.

Comparison rerun:

- The preview route `/business-documents/NEXT-AI-DRAFT-5806/preview` was revalidated after import and returned HTTP 200.
- Content checks confirmed `Internal HTML preview only - not a tax document`, `Document type`, `Source`, `Subtotal`, `VAT`, `Digital signature area`, and `No Maven/Invoice4U action`.
- Local renderer limitation: `pdfinfo` and `pdftoppm` are not installed, `sharp` cannot rasterize the PDF, Python is unavailable as a working runtime, and headless Chrome did not emit screenshot files. Direct visual screenshot comparison could not be completed in this environment.

Boundaries:

- Reference asset only.
- No runtime behavior change.
- No PDF generation.
- No Maven/Invoice4U call.
- No external API call.
- No email/customer-facing action.
- No inventory deduction.
- No DB write.
- No schema/Prisma change.

Project completion:

- Remains `67%`; this imported evidence for an existing preview capability and did not add a new runtime capability point.

## Wave 3 Internal PDF Export Planning

Manual structure comparison against Maven sample fields:

- Maven sample reference: `project-brain/reference/maven-samples/document_102488.pdf`.
- Current preview route: `/business-documents/NEXT-AI-DRAFT-5806/preview`.
- Covered by current preview: logo/company area, customer block, document date, due-date empty state, document type/title/number metadata, line-item table, subtotal/VAT/total/payment/balance block, notes, footer, digital-signature area, no-external-action boundary.
- Known gaps before real PDF export: no approved Tal logo asset, due date has no trusted field, direct raster comparison remains blocked by local renderer/tooling limits, final fonts and Hebrew/RTL pagination must be verified in generated PDF.

Recommended implementation path:

1. Use server-side Playwright/Chromium `page.pdf()` against the existing internal preview URL.
2. Prefer a protected GET route `/business-documents/[id]/pdf` that streams `application/pdf` as an internal temporary download.
3. Keep the existing HTML preview as the single layout source; do not build a separate PDF template unless Playwright output proves insufficient.
4. Add an explicit internal-only boundary in the PDF response filename/content until external export is approved.
5. Do not save a PDF file, create a `BusinessDocumentLog`, mutate `BusinessDocument`, or create `AutomationCommand` in the first implementation.
6. Later, after explicit approval, add saved-file persistence and audit rows as a separate protected write capability.

Dependencies needed:

- Add `playwright` or `playwright-core` plus a known Chromium executable strategy.
- Current repo-wide TypeScript already reports missing Playwright types in existing scripts, so dependency/build hygiene should be resolved before relying on Playwright for PDF generation.
- If bundled Chromium install is not allowed, use an approved server Chromium path configured outside git.
- Keep Poppler/Ghostscript/ImageMagick optional for validation only, not for generation.

Route/action design:

- Recommended first route: `GET /business-documents/[id]/pdf`.
- Route behavior: fetch/validate BusinessDocument by id, build absolute internal preview URL, launch Chromium, load `/business-documents/[id]/preview`, wait for network idle, call `page.pdf({ format: "A4", printBackground: true, preferCSSPageSize: true })`, return bytes with `Content-Disposition: attachment; filename="business-document-{id}-internal-preview.pdf"`.
- Access: internal-only route; if auth is added later, require authenticated internal user and explicit UI confirmation.
- Alternative: protected Server Action button "Generate internal PDF" that redirects/downloads. This is useful when auth/approval tracking exists, but route streaming is simpler for first temporary-download implementation.

Storage strategy:

- Phase 1: temporary download only. No DB write, no file storage, no Drive storage, no Maven/Invoice4U field update.
- Phase 2, later approval: save generated PDF to approved internal storage, create audit log row, optionally attach to BusinessDocument. This requires explicit approval because it is a DB/file write workflow.
- Customer-facing delivery remains a separate email/send approval gate.

Risks:

- Hebrew/RTL rendering can shift if Chromium font fallback differs between local/dev/server.
- Missing Hebrew-capable fonts can cause tofu boxes or spacing changes.
- A4 margins and table pagination may split rows badly unless CSS uses page-break controls.
- `position: fixed` headers/footers can behave differently in Chromium print mode.
- Long notes or many lines may overflow one page; multi-page header/footer behavior must be defined.
- Dependency size and deployment constraints for Playwright/Chromium may affect hosting.
- Internal-only boundary text must not appear on future customer-facing PDFs unless intentionally retained.

Validation plan:

1. Install/approve PDF generation dependency in a separate implementation task.
2. Generate PDF for `NEXT-AI-DRAFT-5806` only.
3. Validate HTTP status, content type, content disposition, nonzero PDF byte size, and no DB row changes.
4. Render generated PDF and `document_102488.pdf` to images using approved renderer tooling.
5. Compare visually for header, customer block, metadata, line table, totals, notes, footer, signature area, A4 page size, margins, Hebrew/RTL alignment, and page breaks.
6. Run focused TypeScript and route validation.
7. Confirm no Maven/Invoice4U call, no email/customer action, no inventory action, no AutomationCommand execution, and no source-system action.

Boundaries for this planning task:

- Planning only.
- No runtime behavior changed.
- No PDF generation.
- No Maven/Invoice4U call.
- No external API call.
- No email/customer-facing action.
- No inventory deduction.
- No DB write.
- No schema/Prisma change.

Project completion:

- Remains `67%`; this is planning for a future internal PDF export capability, not implementation.

## Wave 3 Internal PDF Export MVP

Implemented:

- New route `GET /business-documents/[id]/pdf`.
- The route validates the internal BusinessDocument with the existing adapter, loads `/business-documents/[id]/preview` through Playwright/Chromium, prints A4 with print CSS and Hebrew RTL preview layout, and streams the result as an attachment.
- Review page `/business-documents/[id]` and preview page `/business-documents/[id]/preview` now link to the internal PDF download route.
- PDF response is temporary-download only: no DB write, no file persistence, no saved PDF record, and no sent/exported status mutation.

Validation:

- Focused TypeScript check passed for `app/business-documents/[id]/pdf/route.ts`, `app/business-documents/[id]/page.tsx`, `app/business-documents/[id]/preview/page.tsx`, `app/business-documents/business-document-adapter.ts`, and `lib/business-document-engine.ts`.
- Route validation returned HTTP 200 for `/business-documents/NEXT-AI-DRAFT-5806` and `/business-documents/NEXT-AI-DRAFT-5806/preview`; both pages contain the PDF link.
- PDF route validation returned HTTP 200 for `/business-documents/NEXT-AI-DRAFT-5806/pdf`, `Content-Type: application/pdf`, `Content-Disposition: attachment; filename="NEXT-AI-DRAFT-5806-internal-preview.pdf"`, `%PDF-` signature, and `82096` bytes.
- `git diff --check` passed with CRLF warnings only.

Boundaries:

- No Maven/Invoice4U call.
- No external API call.
- No email/customer-facing action.
- No inventory action.
- No DB write.
- No schema/Prisma change.
- No file persistence or saved PDF record.
- BusinessDocument is not marked sent, exported, or externally completed.

Current blocker:

- None for the internal temporary PDF download.
- Remaining PDF parity gaps: no approved Tal logo asset, due date has no trusted field, and direct raster comparison against `project-brain/reference/maven-samples/document_102488.pdf` still needs approved renderer tooling.

Project completion:

- Moves to `68%` by adding one Wave 3 internal PDF export capability point.
- This does not approve real Maven/Invoice4U execution, customer-facing document delivery, saved-file persistence, or audit-log writes.

## Known Active IDs

## Wave 3 SKU Matching Runtime MVP for ServiceReport 5806

Implemented:

- Added read/runtime manufacturer SKU matching for BusinessDocument lines tied to ServiceReport `5806`.
- Matching is limited to linked equipment model evidence supporting `40PM` / `SCR-40PM`.
- Trusted evidence source is only `data-sources/vendor-spare-parts/Spare Parts Service List(PM Series) rev3 (1).xls`.
- Trusted 40PM matches exposed:
  - Air Filter -> `25100043-071`, sheet `40PM`, row `6`.
  - Oil Filter -> `25200007-005`, sheet `40PM`, row `7`.
  - Oil separator -> `25300045-023`, sheet `40PM`, row `8`, available when a matching line exists.
  - Coolant / oil -> `80000175-039`, sheet `40PM`, row `9`.
- Internal BusinessDocument review now shows SKU match status, manufacturer, confidence, part category, source Excel file/sheet/row, compatible models, reason, and needs-review flag.
- Customer-facing preview/PDF now shows Hebrew SKU column `מק"ט` only when a trusted SKU match exists; unmatched lines stay blank and internal SKU evidence remains hidden from the customer-facing surface.
- Prices and totals are unchanged.

Validation:

- Focused TypeScript check passed for `lib/manufacturer-sku-matching.ts`, `app/business-documents/business-document-adapter.ts`, `app/business-documents/[id]/page.tsx`, `app/business-documents/[id]/preview/page.tsx`, `app/business-documents/[id]/pdf/route.ts`, and `lib/business-document-engine.ts`.
- Review route `/business-documents/NEXT-AI-DRAFT-5806` returned HTTP `200`.
- Review content confirmed trusted SKUs `25100043-071`, `25200007-005`, and `80000175-039`, PM Series source file evidence, and SKU review-required state for unmatched lines.
- Preview route `/business-documents/NEXT-AI-DRAFT-5806/preview` returned HTTP `200`.
- Preview content confirmed Hebrew SKU header `מק"ט`, trusted SKUs, no `Internal`, no `Maven`, and totals still `1885.00 ILS`, `320.45 ILS`, and `2205.45 ILS`.
- PDF route `/business-documents/NEXT-AI-DRAFT-5806/pdf` returned HTTP `200`, `Content-Type: application/pdf`, `%PDF-` signature, and `59920` bytes.
- `git diff --check` passed with CRLF warnings only.

Boundaries:

- No schema change.
- No SKU import.
- No DB write.
- No Maven/Invoice4U call.
- No email/customer action.
- No inventory deduction.
- No source-system or production action.
- No price change.

Current blocker:

- None for the ServiceReport `5806` SKU Matching Runtime MVP.

Project completion:

- Manufacturer Parts Registry Import + Service Kit Intelligence MVP moves completion to `70%` by adding one Wave 3 generated-registry/service-kit foundation capability point.
- Wave 3 is now `5% / 15% STARTED INTERNAL`.
- No real Maven execution, customer delivery, inventory action, broad SKU registry, import, or production readiness point is claimed.

Historical next-task note at that closeout:

- At the time of this closeout, continued Wave 3 read-only/internal Maven Knowledge Layer work was listed as the next candidate path. Current navigation has since been realigned: Maven is an External Adapter readiness task only when explicitly selected, and active next-task selection is domain-driven from BusinessCase, Commercial, Financial, Inventory and Procurement, then Automation and Integration.

Source:
`project-brain/CURRENT_TASK.md`, `project-brain/AI_DRAFT_READINESS_RECHECK.md`, `project-brain/AI_DRAFT_RECOMMENDATION_READINESS_DECISION_PACKET.md`, and `project-brain/current/LIVE_OBJECTS.md`.

- ReportCounter: `5806`
- ReportId: `1e25bbb1`
- BusinessDocumentId: `NEXT-AI-DRAFT-5806` / `1d7f8500-1cb7-4d81-ad3a-b7d5d8b453eb`
- AutomationCommandId: `NEXT-MAVEN-CMD-NEXT-AI-DRAFT-5806` / `db12ee97-0960-4f85-bdd5-f9fa30780885`
- AutomationCommandDryRunResult: `DRY_RUN_VALIDATED`
- AutomationCommandStatus: `PENDING`
- MavenDocumentId: `102451`, `102452`, `102453`

Closeout rule:
If no new work occurred, preserve these IDs and report the source. Do not downgrade them to `UNKNOWN`. If another canonical file reports different active IDs, report the conflict and source files instead of overwriting.

## Wave 3 Domain Boundary Refactoring

Implemented as `SAFE_LOCAL_IMPLEMENTATION` in commit `231da50 Refactor business document domain boundaries` with no schema, DB, package, source-system, external, customer-facing, inventory, Maven/Invoice4U, cloud, or production action.

Scope:

- Commercial runtime boundary was tightened without changing routes or visible behavior.
- Financial payment/evidence parsing moved out of `lib/business-document-engine.ts` into `lib/financial-intake-boundary.ts`.
- BusinessDocument approval blocker/phrase logic moved out of the Commercial adapter/action layer into `lib/business-document-approval-boundary.ts`.
- Maven command eligibility and approval phrase logic moved out of the Commercial adapter/action layer into `lib/business-document-automation-boundary.ts`.
- BusinessDocument cross-domain review status, lifecycle, and warning mapping moved out of the Commercial adapter into `lib/business-document-review-boundary.ts`.
- `app/business-documents/business-document-adapter.ts` now delegates Approval/Governance and Automation/Integration decisions to those boundaries while preserving the existing detail-view contract.
- `app/business-documents/[id]/actions.ts` now reuses the same approval and command-gate boundaries while preserving existing redirect statuses and internal-only writes.

Validation:

- Focused TypeScript passed for touched BusinessDocument and boundary files.
- Repo-wide TypeScript still fails on pre-existing unrelated `app/ai-drafts/ai-draft-adapter.ts` pricing-evidence typing issues.
- `git diff --check` passed with CRLF warnings only.
- Local route validation required unsandboxed read-only DB access because sandboxed Prisma could not reach `aws-1-eu-central-1.pooler.supabase.com:6543`.
- Unsandboxed read-only route validation passed:
  - `/business-documents/NEXT-AI-DRAFT-5806` HTTP `200`.
  - `/business-documents/NEXT-AI-DRAFT-5806/preview` HTTP `200`.
  - `/business-documents/NEXT-AI-DRAFT-5806/pdf` HTTP `200`, `Content-Type: application/pdf`, `%PDF-`, `59807` bytes.
- Totals remained present on review and preview: `1885.00 ILS`, `320.45 ILS`, and `2205.45 ILS`.
- Manufacturer SKU `901165` was not exposed in the checked review/preview HTML.

Boundaries:

- No new business capability.
- No schema change.
- No DB write.
- No package install.
- No Maven/Invoice4U call.
- No email/customer-facing action.
- No inventory action.
- No source-system, cloud, or production action.
- No route change.

Project completion:

- Remains `70%`; this is a domain-boundary hardening refactor, not a new capability point.

## Domain Ownership Gate

Integrated into `PROJECT_OPERATING_PROTOCOL.md` section `18B. TDOS Risk-Based Operating Model` as a permanent pre-implementation rule. Before any new feature, runtime change, workflow change, or architecture change, future agents must identify the owning Domain, owner/responsible agent, allowed interacting Domains, Domains that must not own or mutate the object/workflow, supporting source of truth, and validation proving the boundary is preserved. If those answers are missing or unclear, implementation must stop and request clarification.

Boundary:

- Governance/documentation only.
- No new governance file.
- No Domain Registry.
- No runtime behavior change.
- No schema change.
- No DB write.
- No package install.
- No Maven/Invoice4U call.
- No email/customer action.
- No inventory action.
- No cloud or production action.

## Next Approved Task

## BusinessCase Runtime Sprint 1

Implemented as `SAFE_LOCAL_IMPLEMENTATION` in commit `f420701 Add BusinessCase runtime`.

Capability:

- BusinessCase Runtime is now the first ERP operational spine.
- It is an application/runtime concept derived from existing ServiceReport context.
- It is not a Prisma model, database table, migration, or source of truth.

Runtime:

- Added `app/business-cases/business-case-runtime.ts`.
- Added `/business-cases/service-report/[id]`.
- Added a ServiceReport detail link to the derived BusinessCase context.
- Updated `APPLICATION_ROUTE_MAP.md`.
- The runtime orchestrates existing ServiceReport, BusinessDocument, Approval, AutomationCommand, Financial Intake placeholder, and Inventory Impact placeholder runtime.
- BusinessCase does not own documents, payments, inventory, approvals, automation, or external adapters.

Validation:

- Project TypeScript still fails only on pre-existing unrelated `app/ai-drafts/ai-draft-adapter.ts` pricing-evidence typing issues; no BusinessCase or touched-file TypeScript errors appeared under project-config TypeScript.
- Sandboxed route validation could not reach Supabase staging, matching the known sandbox network limitation.
- Unsandboxed read-only route validation passed:
  - `/service-reports/1e25bbb1` HTTP `200`.
  - `/business-documents/NEXT-AI-DRAFT-5806` HTTP `200`.
  - `/business-documents/NEXT-AI-DRAFT-5806/preview` HTTP `200`.
  - `/business-documents/NEXT-AI-DRAFT-5806/pdf` HTTP `200`, `application/pdf`, `59807` bytes.
  - `/automation-commands/NEXT-MAVEN-CMD-NEXT-AI-DRAFT-5806` HTTP `200`.
  - `/business-cases/service-report/1e25bbb1` HTTP `200`.
- BusinessCase content validation confirmed Party/Customer, Assets, Service Operations, Commercial, Approval, Automation, Financial Intake, Inventory Impact, and Closure readiness are present.
- ServiceReport content validation confirmed the BusinessCase link is present.
- Review and preview totals remained `1885.00 ILS`, `320.45 ILS`, and `2205.45 ILS`.
- Manufacturer SKU `901165` was not exposed in checked review/preview HTML.
- Boundary stress check found no Prisma write calls, schema changes, external adapter calls, email/customer action, inventory mutation, cloud action, or production behavior.

Project completion:

- Moves to `71%` by adding one Wave 3 Commercial Runtime and Document Engine capability point for the first reusable BusinessCase operational spine.
- No schema, DB, external adapter, production readiness, FinancialEvidence runtime, inventory mutation, or real Maven/Invoice4U execution point is claimed.

## Commercial Lifecycle Hardening Sprint 2

Implemented as `SAFE_LOCAL_IMPLEMENTATION` in commit `c8d8c6c Harden commercial document lifecycle`.

Capability:

- Commercial Runtime now exposes a complete internal lifecycle for BusinessDocument without introducing a new document engine.
- The lifecycle is derived from existing BusinessDocument, Approval, Automation, and Financial-readiness signals.
- Stages are: Draft, Internal Review, Needs Changes, Approved, Ready For External Adapter, Externally Processed, Financial Pending, Financial Completed, and Closed.

Runtime:

- Added `lib/business-document-commercial-lifecycle.ts` as a small Commercial lifecycle boundary.
- Extended `BusinessDocumentDetail` with `commercialLifecycle`.
- Replaced the old placeholder lifecycle display on `/business-documents/[id]` with the target Commercial lifecycle stage list, current stage, next transition, blockers, and boundary text.
- Updated BusinessCase Commercial summary to use the derived Commercial lifecycle stage instead of raw document status.
- Existing BusinessDocument Runtime, ViewModel, preview, PDF, Approval Boundary, Automation Boundary, Financial Boundary, Review Boundary, approval forms, AutomationCommand gate, and line resolution remain in place.

Validation:

- Project TypeScript still fails only on pre-existing unrelated `app/ai-drafts/ai-draft-adapter.ts` pricing-evidence typing issues; no Commercial lifecycle or touched-file errors appeared under project-config TypeScript.
- `git diff --check` passed with CRLF warnings only.
- Unsandboxed read-only route validation passed:
  - `/service-reports/1e25bbb1` HTTP `200`.
  - `/business-cases/service-report/1e25bbb1` HTTP `200`.
  - `/business-documents/NEXT-AI-DRAFT-5806` HTTP `200`.
  - `/business-documents/NEXT-AI-DRAFT-5806/preview` HTTP `200`.
  - `/business-documents/NEXT-AI-DRAFT-5806/pdf` HTTP `200`, `application/pdf`, `59807` bytes.
  - `/automation-commands/NEXT-MAVEN-CMD-NEXT-AI-DRAFT-5806` HTTP `200`.
- Review content confirmed Commercial lifecycle, `Ready For External Adapter`, and explicit external-adapter blocker are visible.
- Existing approval workflow controls, return-to-review control, Maven command gate, automation command status, and line resolution controls remained visible.
- Review and preview totals remained `1885.00 ILS`, `320.45 ILS`, and `2205.45 ILS`.
- Manufacturer SKU `901165` was not exposed in checked review/preview HTML.
- Boundary stress check found no new Prisma writes, schema changes, external adapter calls, email/customer action, inventory mutation, cloud action, or production behavior.

Exit review:

- Commercial Runtime is internally complete enough for Financial Runtime to start without redesigning Commercial.
- Commercial still must not own FinancialEvidence, settlement, receipts, tax invoice/receipt issuing, inventory reservation/deduction, external adapter execution, customer approval, or email/customer delivery.
- Recommended Sprint 3: Financial Intake and Settlement readiness, starting from the Commercial lifecycle handoff states and staying read-only/safe-local unless a later approval explicitly permits schema, DB writes, attachments, OCR, bank API, receipt issuing, or external action.

Project completion:

- Moves to `72%` by adding one Wave 3 Commercial Runtime and Document Engine capability point for the complete derived Commercial lifecycle.
- No schema, DB, external adapter, production readiness, FinancialEvidence runtime, inventory mutation, or real Maven/Invoice4U execution point is claimed.

## Financial Capability Sprint 3

Implemented as `SAFE_LOCAL_IMPLEMENTATION` in commit `069f34c Add financial intake capability`.

Capability:

- Financial Runtime now has the first complete internal business capability flow: Payment Evidence -> Matching -> Review -> Receipt Draft -> Tax Invoice / Receipt Draft -> BusinessCase financial status.
- The capability reuses existing Commercial Runtime, Financial Intake design, Approval/Governance boundaries, and BusinessCase Runtime.
- The runtime is internal and suggestion-only; it does not issue receipts, create tax invoices, write financial state, or call external systems.

Runtime:

- Extended `lib/financial-intake-boundary.ts` into an internal Financial Intake capability boundary.
- Added generic FinancialEvidence source types: check image, bank transfer proof, bank export, bank screenshot, PDF proof, email proof, manual entry, and future bank API.
- Added evidence drafts with extraction fields, confidence, attachment ID, matching state, approval review, receipt draft, and tax invoice / receipt draft.
- Extended BusinessDocument detail mapping with `financialIntake`.
- Added a read-only Financial intake and settlement panel to `/business-documents/[id]`.
- Updated BusinessCase financial status to summarize Financial Intake evidence/matching instead of the older placeholder.

Validation:

- Project TypeScript still fails only on pre-existing unrelated `app/ai-drafts/ai-draft-adapter.ts` pricing-evidence typing issues; no Financial, BusinessCase, or touched-file TypeScript errors appeared.
- `git diff --check` passed with CRLF warnings only.
- Unsandboxed read-only route validation passed:
  - `/service-reports/1e25bbb1` HTTP `200`.
  - `/business-cases/service-report/1e25bbb1` HTTP `200`.
  - `/business-documents/NEXT-AI-DRAFT-5806` HTTP `200`.
  - `/business-documents/NEXT-AI-DRAFT-5806/preview` HTTP `200`.
  - `/business-documents/NEXT-AI-DRAFT-5806/pdf` HTTP `200`, `application/pdf`, `59807` bytes.
  - `/automation-commands/NEXT-MAVEN-CMD-NEXT-AI-DRAFT-5806` HTTP `200`.
- Review content confirmed Payment evidence, Matching, Financial approval boundary, Receipt draft, Tax Invoice / Receipt draft, manual-entry evidence draft, draft-ready state, and issuing-blocked state.
- BusinessCase content confirmed Financial status is updated from Financial Intake evidence/matching.
- Review and preview totals remained `1885.00 ILS`, `320.45 ILS`, and `2205.45 ILS`.
- Manufacturer SKU `901165` was not exposed in checked review/preview HTML.
- Existing ServiceReport, BusinessDocument, preview, PDF, approval workflow, AutomationCommand gate, and Commercial lifecycle behavior remained visible.
- Boundary stress check found no new Prisma writes, schema changes, external adapter calls, OCR, bank API, receipt issuing, external accounting, email/customer action, inventory mutation, cloud action, or production behavior.

Exit review:

- The capability can support future check image, bank transfer, OCR, and bank API intake without redesign because evidence source type, extraction draft, matching, approval, and draft output are separated from adapters.
- The smallest remaining Financial gap is persisted FinancialEvidence/attachment storage, duplicate registry, and approved write workflow for receipt/tax-invoice-receipt issuing. Those require explicit future approval for schema/DB writes, storage/privacy/retention, and external/accounting gates.
- Recommended Sprint 4: Inventory and Procurement boundary/readiness, unless Liad explicitly chooses to continue Financial persistence first.

Project completion:

- Moves to `73%` by adding one Wave 4 Financial Runtime and Settlement capability point for internal Financial Intake, matching, approval review, receipt draft, tax invoice / receipt draft, and BusinessCase financial status.
- No schema, DB, external adapter, OCR, bank API, receipt issuing, external accounting, inventory mutation, customer action, cloud action, production readiness, or real Maven/Invoice4U execution point is claimed.

## Operations Center Sprint 4

Implemented as `SAFE_LOCAL_IMPLEMENTATION` in commit `c860365 Add operations center workspace`.

Capability:

- `/operations` is now the daily TAL Operations Center working screen.
- It is an orchestration view over existing BusinessCase, Commercial, Financial, Approval, and Automation runtime.
- It does not create another business engine and does not own documents, payments, approvals, automation, inventory, or external adapters.

Runtime:

- Extended `app/business-cases/business-case-runtime.ts` with `getBusinessCaseList()` so list-level operations can reuse the existing BusinessCase builders.
- Added `app/operations/operations-center-runtime.ts` to classify BusinessCases into Requires Immediate Action, Waiting For Technician, Waiting For Customer, Waiting For Internal Approval, Waiting For Financial Action, Waiting For External Adapter, Ready To Close, and Closed Recently.
- Added `app/operations/page.tsx` as the daily workspace with customer, asset, BusinessCase, current stage, blocker, next recommended action, assigned owner, priority, last activity, financial status, and commercial status.
- Added dashboard and header navigation to `/operations`.
- Updated `APPLICATION_ROUTE_MAP.md`.

Validation:

- Project TypeScript still fails only on pre-existing unrelated `app/ai-drafts/ai-draft-adapter.ts` pricing-evidence typing issues; no Operations Center, BusinessCase, or touched-file TypeScript errors appeared.
- `git diff --check` passed with CRLF warnings only.
- Sandboxed route validation reached the local server but Prisma-backed routes returned HTTP `500`, matching the known sandbox Supabase network limitation.
- Unsandboxed read-only route validation passed:
  - `/operations` HTTP `200`.
  - `/business-cases/service-report/1e25bbb1` HTTP `200`.
  - `/business-documents/NEXT-AI-DRAFT-5806` HTTP `200`.
  - `/business-documents/NEXT-AI-DRAFT-5806/preview` HTTP `200`.
  - `/business-documents/NEXT-AI-DRAFT-5806/pdf` HTTP `200`, `application/pdf`, `59730` bytes.
- Content validation confirmed all required Operations Center buckets, `Next Recommended Action`, link to `/business-cases/service-report/1e25bbb1`, Financial status `Receipt draft ready for approval`, Commercial status `Ready For External Adapter`, and no-execute boundary text.
- Review and preview totals remained `2205.45 ILS`; checked review/preview HTML did not expose manufacturer SKU `901165`.
- Boundary stress check found no new Prisma writes, schema changes, external adapter calls, OCR, bank API, receipt issuing, external accounting, email/customer action, inventory mutation, cloud action, or production behavior.

Exit review:

- TAL can realistically use this screen as a morning operations cockpit for read-only awareness, blockers, ownership, and next recommended action.
- What is still missing before it can manage the company end-to-end: persistent owner assignment, human-updatable status changes, SLA/due dates, customer-level workspace/history, asset-level timeline, and real close/resolve actions. Those require future approved runtime/write work.
- Recommended Sprint 5: Customer Workspace / Customer Timeline because the Operations Center now shows daily work and the next highest business value is customer-level context across cases, assets, documents, and financial status. Inventory remains a valid alternative if parts availability is the immediate business pain.

Project completion:

- Moves to `74%` by adding one current workflow/orchestration point for the daily Operations Center.
- No schema, DB, external adapter, OCR, bank API, receipt issuing, external accounting, inventory mutation, customer action, cloud action, production readiness, or real Maven/Invoice4U execution point is claimed.

Domain-driven next task selection is active.

TDOS work is frozen for now. Future TDOS changes are allowed only if ERP implementation is blocked by a missing TDOS capability, real Project Brain/runtime drift is detected, or a Knowledge Release / Project Sources Publishing Pipeline becomes required for an active ChatGPT Project Sources workflow. The Project Sources Publishing Pipeline remains a future conditional improvement only: do not create publisher runtime, scripts, manifests, new files, or a synchronization framework now.

Next candidate tasks, pending explicit selection/approval:

1. Customer Workspace / Customer Timeline: expose customer-level open cases, assets, BusinessDocuments, financial status, blockers, and history using existing runtime.
2. Asset Workspace / Asset Timeline: expose compressor-level service, commercial, financial, and recommendation history.
3. Inventory and Procurement boundary/readiness: define how parts, procurement, supplier, stock, reservations, and future delivery-note work interact with Service Operations, Commercial documents, Financial status, and BusinessCase without inventory mutation.
4. FinancialEvidence persistence and attachment storage, if explicitly selected: design and implement persisted evidence, duplicate registry, storage/privacy/retention, and approved issuing workflow only after schema/DB/storage approval.
5. Automation and Integration adapter readiness: prepare adapter evidence packets and command boundaries for Maven/Invoice4U, email, bank, OCR, and other external systems. Maven customer/document/item matching, Maven API contract evidence, Maven secret placement, and Maven source validation belong here and are valid only when explicitly selected.
6. BusinessCase runtime generalization, if a future capability proves ServiceReport-derived cases are too narrow.
7. Build hygiene for the existing missing Playwright dependency/type gap, if explicitly selected.
8. Optional Wave 2 import approval package, only if explicitly approved.

Project completion should not be overstated: current evidence-based completion is 74% by the transitional capability formula. Infrastructure readiness is high for the staging/Prisma/Wave 1 path; read-only UI coverage is progressing through shells, central work screens, preview intelligence, the AI Draft Recommendation Preview runtime, the pricing-evidence preview layer, protected internal BusinessDocument draft creation, internal BusinessDocument review, the BusinessDocument Approval Workflow, the protected internal Maven document-generation AutomationCommand gate, AutomationCommand Detail and Queue Review, Maven Execution Adapter Dry Run, BusinessDocument Line Resolution Layer, BusinessCase Runtime Sprint 1, Commercial Lifecycle Hardening Sprint 2, Financial Capability Sprint 3, Operations Center Sprint 4, and Wave 3/4 internal runtime surfaces. Maven is an External Adapter concern under Automation and Integration, not the architectural center. Production automation readiness remains gated because no Maven/Invoice4U execution, customer-facing send, inventory deduction, DB import, inventory action, receipt issuing, external accounting, or production integration is approved.

Do not continue to Wave 2 import, ProductsCatalog import, BusinessDocuments import, production shadow setup, DB writes outside approved protected Server Actions, schema changes, migrations, env changes, Maven/Invoice4U execution, email/customer-facing sends, inventory actions, or source-system actions until Liad explicitly approves that later gate.

## Approved Architecture Decisions In Force

- `PROJECT_INDEX.md` is the mandatory startup entrypoint.
- `hey codex` is the official startup command.
- `by codex` is the official shutdown command.
- TDOS is integrated into `PROJECT_OPERATING_PROTOCOL.md` as a risk-based operating model, not a standalone constitution or duplicate governance layer. Each task must be classified as `READ_ONLY_DISCOVERY`, `DOC_SYNC`, `SAFE_LOCAL_IMPLEMENTATION`, `SCHEMA_OR_DATA_CHANGE`, `EXTERNAL_SYSTEM_CHANGE`, `PRODUCTION_CHANGE`, or `ARCHITECTURE_CHANGE`; no required control for the task's risk class may be skipped.
- Codex is the main Orchestrator for safe scoped work and should work, validate, collect proof, update Project Brain, and commit/push safe validated changes without routine ping-pong.
- `hey codex` must fetch and fast-forward from `origin/main` before reading Project Brain when the working tree is clean.
- Project Reality Check must compare live Git latest commit against Last Implementation Commit and Last Closeout Commit recorded in `PROJECT_INDEX.md` and `project-brain/CURRENT_TASK.md`.
- If live Git latest commit equals Last Closeout Commit, Project Brain is synchronized even when Last Implementation Commit is older.
- If live Git latest commit is a closeout/state-sync metadata commit newer than Last Closeout Commit, it does not require another sync just to record its own hash.
- Last Implementation Commit changes only when actual implementation changed; Last Closeout Commit is an optional marker for the last meaningful closeout/state-sync milestone, not every closeout commit.
- `PROJECT_OPERATING_PROTOCOL.md` is the highest authority/governor.
- `project-brain/CURRENT_TASK.md` is the canonical current task/current phase/next task source.
- `project-brain/TASK_BOARD.md` is the canonical task board/progress map.
- Project Brain files win over ChatGPT/Codex memory.
- No new planning file, map, dashboard, control center, protocol, agent, or roadmap may be created before searching existing files and proving no existing file already serves that purpose.
- Manual artifacts must have owner, source, and lifecycle. Generated artifacts must declare generator, trusted sources, and validation. Repeated artifacts must be deleted, generated, or reduced to pointers.
- Import only `ReportEquipmentItems` linked to real `ServiceReports`; exclude legacy/test equipment rows; do not modify Google Sheets/AppSheet; keep the internal FK nullable.
- Derive nullable `ReportEquipmentItem.reportCounter` during PostgreSQL import by joining through `ServiceReports.ReportCounter`; never use it as a primary relationship key.
- Use Supabase Staging first, then Supabase Production Shadow only after staging validation passes; do not use local PostgreSQL as first target.
- Required env variable names are `DATABASE_URL`, `DIRECT_URL`, and `NEXT_PUBLIC_APP_ENV`.
- Optional future Supabase env names are `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY`; do not add them until Supabase client features require them.
- Prisma is reconciled for `DIRECT_URL` and `ReportEquipmentItem.reportCounter`; any DB push still requires separate approval.
- Staging validation must confirm `Customers_Final = 763`, `ServiceReports = 63`, and `ReportEquipmentItems = 109`; the Wave 1 baseline was updated after read-only export validation found legitimate business data added after the original baseline. `ReportEquipmentItems` imports only rows linked to real `ServiceReports`; legacy/test rows intentionally excluded from import must be reported as historical test data, not business data, no recovery required, excluded by design.
- Wave 1 import execution is successful only when closed-loop sync passes: approved source CSVs are read from `data-sources/exports/`, staging receives only approved Wave 1 data, DB counts are read back by Prisma Client, excluded counts are reported, validation report and manifest are generated, Project Brain records import date/time and counts, git status is reviewed, only approved files are committed/pushed, no source systems are modified, and no production systems are touched. If any item fails, stop and do not continue to Wave 2.
- Use Server Actions by default for internal Next.js write flows.
- Design field workflows offline-first with conflict review.

## Required Reading For Next Session

- `PROJECT_INDEX.md`
- `PROJECT_OPERATING_PROTOCOL.md`
- `project-brain/CURRENT_TASK.md`
- `project-brain/TASK_BOARD.md`
- `project-brain/DECISION_LOG.md`
- `project-brain/maps/SYSTEM_MAP.md`
- `project-brain/migration/POSTGRESQL_V1_SCOPE.md`
- `project-brain/migration/DATABASE_SCHEMA_V1.md`
- `project-brain/migration/PRISMA_SCHEMA_V1.md`
- `project-brain/migration/DATA_MIGRATION_PLAN.md`
- `prisma/schema.prisma`

## Blocked / Forbidden Actions

- No additional code implementation beyond validated AUTO_ALLOWED read-only UI/display work unless explicitly approved.
- No Prisma migration.
- No additional DB creation.
- No additional `prisma db push`.
- No Supabase production setup.
- No additional schema push.
- No additional import.
- No production cutover.
- No PostgreSQL/Supabase environment implementation during planning.
- No Google Sheets writes.
- No AppSheet changes.
- No Maven actions.
- No production Apps Script changes.
- No new agents.
- No new planning/control files unless existing files are searched first and proven insufficient.
- No Wave 2/3/4 import work until Liad explicitly approves that later gate.

## Done When

- A next candidate task is explicitly selected/approved before implementation begins.
- Project Brain records the implementation commit hash, validation result, current blocker or `none`, exact next task or next candidate list, approval gates, and project completion percentage.
- No write path, import, migration, schema push, source-system change, or production action is added.
