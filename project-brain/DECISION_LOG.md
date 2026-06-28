# DECISION LOG

## 2026-06-28

Decision:
Operations Command Center Sprint 5 is implemented as the action-driven daily work queue.

Reason:
Operations Center Sprint 4 exposed awareness, but the next business-value challenge was whether the screen could drive the office manager and service manager's morning work. The minimum safe implementation was to keep BusinessCase as the source projection and convert the view into action queues without introducing a generic task manager, schema, persistence, or workflow execution.

Boundary:
Implemented as `SAFE_LOCAL_IMPLEMENTATION` only. The Command Center reuses existing BusinessCase, Commercial, Financial, Approval, Automation, and read-only Inventory-impact runtime. Queue rows are projections of existing BusinessCases, not persisted tasks. The screen recommends and links internally only; it does not execute actions. No schema change, Prisma migration, DB write, package install, OCR, bank API, receipt issuing, tax invoice issuing, external accounting, Maven/Invoice4U call, email/customer-facing action, inventory mutation, cloud/source-system action, production behavior, or writable task manager was introduced.

Status:
Implemented in commit `be1fada Add operations command center`. Validation: project TypeScript only fails on pre-existing unrelated AI Draft pricing-evidence typing issues; `git diff --check` passed with CRLF warnings only; unsandboxed read-only route validation passed for `/operations`, `/business-cases/service-report/1e25bbb1`, `/business-documents/NEXT-AI-DRAFT-5806`, `/business-documents/NEXT-AI-DRAFT-5806/preview`, and `/business-documents/NEXT-AI-DRAFT-5806/pdf`; content checks confirmed all required queues, row fields, Open Action, Financial status, Commercial status, and queue/no-execute boundary text; review/preview totals stayed `1885.00 ILS`, `320.45 ILS`, and `2205.45 ILS`; manufacturer SKU `901165` was not exposed in checked review/preview HTML. Completion moves to `75%`. Recommended Sprint 6 is Customer Workspace / Customer Timeline if staying safe/read-only; writable Command Center queue-state persistence is a valid alternative only after explicit schema/DB-write approval.

---

## 2026-06-28

Decision:
Operations Center Sprint 4 is implemented as the primary daily operational workspace.

Reason:
After BusinessCase, Commercial, and Financial runtime foundations, the highest business value was not another engine but one screen the company can open every morning to see attention, blockers, waiting states, readiness, ownership, and next recommended action. This turns existing runtime into daily operational value without introducing new source-of-truth objects.

Boundary:
Implemented as `SAFE_LOCAL_IMPLEMENTATION` only. Operations Center is an orchestration view over existing BusinessCase, Commercial, Financial, Approval, and Automation runtime. It recommends next actions but does not execute them. No schema change, Prisma migration, DB write, package install, OCR, bank API, receipt issuing, tax invoice issuing, external accounting, Maven/Invoice4U call, email/customer-facing action, inventory mutation, cloud/source-system action, or production behavior was introduced.

Status:
Implemented in commit `c860365 Add operations center workspace`. Validation: project TypeScript only fails on pre-existing unrelated AI Draft pricing-evidence typing issues; unsandboxed read-only route validation passed for `/operations`, `/business-cases/service-report/1e25bbb1`, `/business-documents/NEXT-AI-DRAFT-5806`, `/business-documents/NEXT-AI-DRAFT-5806/preview`, and `/business-documents/NEXT-AI-DRAFT-5806/pdf`; content checks confirmed all required Operations Center buckets, next recommended action, BusinessCase link, Financial status, Commercial status, and no-execute boundary text; review/preview totals stayed `2205.45 ILS`; manufacturer SKU `901165` was not exposed in checked review/preview HTML. Completion moves to `74%`. Recommended Sprint 5 is Customer Workspace / Customer Timeline unless Liad selects Inventory because parts availability is the immediate business pain.

---

## 2026-06-28

Decision:
Financial Capability Sprint 3 is implemented as the first internal Financial business capability.

Reason:
Commercial Runtime can now hand off Financial Pending / Financial Completed states, and BusinessCase Runtime needs a concrete Financial status instead of a placeholder. The minimum safe capability is not receipt issuing or external accounting; it is internal evidence intake, matching, review, and draft outputs that future check image, bank transfer, OCR, and bank API adapters can feed without redesign.

Boundary:
Implemented as `SAFE_LOCAL_IMPLEMENTATION` only. No schema change, Prisma migration, DB write, package install, OCR, bank API, check parser, receipt issuing, tax invoice issuing, external accounting, Maven/Invoice4U call, email/customer-facing action, inventory mutation, cloud/source-system action, or production behavior was introduced. Financial evidence extraction remains suggestion-only and every receipt/tax-invoice-receipt draft is blocked from issuing.

Status:
Implemented in commit `069f34c Add financial intake capability`. Validation: project TypeScript only fails on pre-existing unrelated AI Draft pricing-evidence typing issues; unsandboxed read-only route validation passed for `/service-reports/1e25bbb1`, `/business-cases/service-report/1e25bbb1`, `/business-documents/NEXT-AI-DRAFT-5806`, `/business-documents/NEXT-AI-DRAFT-5806/preview`, `/business-documents/NEXT-AI-DRAFT-5806/pdf`, and `/automation-commands/NEXT-MAVEN-CMD-NEXT-AI-DRAFT-5806`; PDF stayed `59807` bytes; review content showed Payment evidence, Matching, Financial approval boundary, Receipt draft, Tax Invoice / Receipt draft, manual-entry evidence draft, draft-ready state, and issuing-blocked state; BusinessCase financial status updated; totals stayed `1885.00 ILS`, `320.45 ILS`, and `2205.45 ILS`; manufacturer SKU `901165` was not exposed in checked review/preview HTML. Completion moves to `73%`. Smallest remaining Financial gap is persisted FinancialEvidence/attachment storage, duplicate registry, and approved issuing write workflow, all separately gated. Recommended Sprint 4 is Inventory and Procurement boundary/readiness unless Liad explicitly chooses Financial persistence first.

---

## 2026-06-28

Decision:
Commercial Lifecycle Hardening Sprint 2 is implemented as the internal Commercial Runtime lifecycle boundary.

Reason:
BusinessCase Runtime can now act as an ERP spine, but Commercial needed one explicit derived lifecycle before Financial Intake and Settlement work could start cleanly. Existing BusinessDocument fields, Approval review, Automation command readiness, and Financial-readiness signals already supported most of the lifecycle; the missing piece was a reusable lifecycle view that names current stage, next transition, blockers, and boundaries without creating a new document engine or changing persisted data.

Boundary:
Implemented as `SAFE_LOCAL_IMPLEMENTATION` only. No schema change, Prisma migration, DB write, package install, Maven/Invoice4U call, external adapter execution, email/customer action, inventory mutation, cloud/source-system action, production behavior, FinancialEvidence runtime, settlement runtime, receipt issuing, or customer approval workflow was introduced.

Status:
Implemented in commit `c8d8c6c Harden commercial document lifecycle`. Validation: project TypeScript only fails on pre-existing unrelated AI Draft pricing-evidence typing issues; unsandboxed read-only route validation passed for `/service-reports/1e25bbb1`, `/business-cases/service-report/1e25bbb1`, `/business-documents/NEXT-AI-DRAFT-5806`, `/business-documents/NEXT-AI-DRAFT-5806/preview`, `/business-documents/NEXT-AI-DRAFT-5806/pdf`, and `/automation-commands/NEXT-MAVEN-CMD-NEXT-AI-DRAFT-5806`; PDF stayed `59807` bytes; review content showed Commercial lifecycle and `Ready For External Adapter`; approval, return-to-review, Maven command gate, automation status, and line-resolution controls remained visible; totals stayed `1885.00 ILS`, `320.45 ILS`, and `2205.45 ILS`; manufacturer SKU `901165` was not exposed in checked review/preview HTML. Completion moves to `72%`. Recommended Sprint 3 is Financial Intake and Settlement readiness.

---

## 2026-06-28

Decision:
BusinessCase Runtime Sprint 1 is implemented as the first ERP operational spine.

Reason:
ERP implementation now needs a reusable operational lifecycle container that connects Party, Asset, Service Operations, Commercial, Approval, Automation, Financial placeholders, and Inventory placeholders without introducing a schema object. BusinessCase must orchestrate existing domains and must not own their runtime.

Boundary:
Implemented as `SAFE_LOCAL_IMPLEMENTATION` only. No Prisma model, table, migration, DB write, schema change, package install, Maven/Invoice4U call, email/customer action, inventory mutation, cloud/source-system action, production behavior, FinancialEvidence runtime, or inventory runtime was introduced.

Status:
Implemented in commit `f420701 Add BusinessCase runtime`. Validation: project TypeScript only fails on pre-existing unrelated AI Draft pricing-evidence typing issues; unsandboxed read-only route validation passed for `/service-reports/1e25bbb1`, `/business-documents/NEXT-AI-DRAFT-5806`, `/business-documents/NEXT-AI-DRAFT-5806/preview`, `/business-documents/NEXT-AI-DRAFT-5806/pdf`, `/automation-commands/NEXT-MAVEN-CMD-NEXT-AI-DRAFT-5806`, and `/business-cases/service-report/1e25bbb1`; BusinessCase content showed Party/Customer, Assets, Service Operations, Commercial, Approval, Automation, Financial Intake, Inventory Impact, and Closure readiness; PDF stayed `59807` bytes; totals stayed `1885.00 ILS`, `320.45 ILS`, and `2205.45 ILS`; manufacturer SKU `901165` was not exposed in checked review/preview HTML. Completion moves to `71%`.

---

## 2026-06-28

Decision:
Freeze TDOS in Maintenance Mode and return project focus to ERP capability implementation.

Reason:
TDOS now has the required operating foundations: `hey codex` / `by codex`, Project Brain, risk classes, Domain Ownership Gate, Capability Review Gate, existing-first rules, approval gates, and domain-driven roadmap alignment. Continuing to evolve TDOS would delay ERP implementation unless a real ERP blocker proves another operating capability is missing.

Boundary:
This is documentation/state closeout only. No runtime code, schema, DB write, migration, package install, Maven/Invoice4U call, email/customer action, inventory action, cloud/source-system action, production action, new governance layer, new file, publisher runtime, script, manifest, or synchronization framework is approved.

Status:
Approved. Reopen TDOS only if ERP work is blocked by a missing TDOS capability, real Project Brain/runtime drift is detected, or Knowledge Release becomes required for active ChatGPT Project Sources workflow. Project Sources Publishing Pipeline / Knowledge Release is recorded as a future conditional TDOS improvement only, not implemented now and not a source of truth. Next work should be ERP capability implementation.

---

## 2026-06-28

Decision:
Realign current Project Brain navigation to the approved domain-driven architecture without creating new documents, governance, registries, or waves.

Reason:
The previous current-state wording made Maven appear to be the project critical path because Wave 3 was still titled `Maven Knowledge Layer` and the next task list started with Maven matching/API evidence. That was correct historical sequencing after Wave 2, but the later Domain Boundary Refactoring and Domain Ownership Gate establish that Maven is an External Adapter under Automation and Integration, not the center of the business architecture. Current roadmap language must therefore start from BusinessCase context, Commercial Runtime, Financial Runtime/Settlement, Inventory and Procurement, then Automation and Integration adapters.

Boundary:
This is documentation/state realignment only. Historical decisions remain preserved. Maven execution remains gated. No runtime code, schema, DB write, migration, package install, Maven/Invoice4U call, email/customer action, inventory action, cloud/source-system action, production action, new governance file, new registry, or new wave was created.

Status:
Approved as `DOC_SYNC`. Current Project Brain and startup wording should present Maven as an explicitly selected External Adapter readiness task only. The current 70% completion estimate remains a transitional capability-weighted score; a future approved pass should replace legacy wave-weight labels with a domain capability scorecard rather than changing percentages ad hoc.

---

## 2026-06-28

Decision:
Add the Domain Ownership Gate to the existing TDOS risk-based operating model.

Reason:
The Domain Boundary Refactoring moved BusinessDocument runtime toward domain-driven implementation. Future work must preserve that direction before code changes begin, without creating a duplicate Domain Registry, standalone constitution, or new governance file.

Rule:
Before any new feature, runtime change, workflow change, or architecture change, the agent must answer which Domain owns the work, who the owner/responsible agent is, which Domains may interact with it, which Domains must not own or mutate it, what source of truth supports the ownership, and what validation proves the boundary is preserved. If answers are missing or unclear, implementation must stop and request clarification.

Boundary:
Governance/documentation only in `PROJECT_OPERATING_PROTOCOL.md`. No new governance file, new registry, runtime behavior change, schema change, DB write, package install, Maven/Invoice4U call, email/customer-facing action, inventory action, cloud action, source-system action, or production action occurred.

Status:
Approved by user request and integrated into `PROJECT_OPERATING_PROTOCOL.md` section `18B. TDOS Risk-Based Operating Model`.

---

## 2026-06-28

Decision:
BusinessDocument runtime domain-boundary helpers are the approved internal separation point for the current Commercial runtime.

Reason:
The BusinessDocument adapter and Server Actions were carrying Commercial display, Financial payment/evidence parsing, Approval blocker logic, and Automation/Maven command-gate logic in the same runtime layer. The project approved domain-driven implementation without creating new registries, schema, or business capabilities. The minimum safe implementation is to keep routes and behavior unchanged while extracting cross-domain rule ownership into small internal helpers.

Implemented scope:

1. `lib/financial-intake-boundary.ts` owns current internal payment/evidence parsing used by the BusinessDocument engine.
2. `lib/business-document-approval-boundary.ts` owns BusinessDocument approval phrase and blocker review logic.
3. `lib/business-document-automation-boundary.ts` owns Maven AutomationCommand creation eligibility and phrase logic.
4. `lib/business-document-review-boundary.ts` owns cross-domain review status, lifecycle, and warning mapping.
5. `app/business-documents/business-document-adapter.ts` delegates financial, approval, automation, and cross-domain review decisions to those boundaries.
6. `app/business-documents/[id]/actions.ts` reuses the same boundaries for write-side checks while preserving existing redirect statuses and internal-only behavior.

Boundary:
SAFE_LOCAL_IMPLEMENTATION only. No new business capability, route change, schema change, DB write, package install, Maven/Invoice4U call, email/customer-facing action, inventory action, source-system action, cloud action, or production action occurred. BusinessDocument `NEXT-AI-DRAFT-5806` remains the regression fixture only, not architecture.

Validation:
Focused TypeScript passed for touched files. Repo-wide TypeScript still fails on pre-existing unrelated AI Draft pricing-evidence typing issues. Unsandboxed read-only route validation passed for `/business-documents/NEXT-AI-DRAFT-5806`, `/business-documents/NEXT-AI-DRAFT-5806/preview`, and `/business-documents/NEXT-AI-DRAFT-5806/pdf`; totals remained `1885.00 ILS`, `320.45 ILS`, and `2205.45 ILS`; checked review/preview HTML did not expose manufacturer SKU `901165`; PDF returned `%PDF-` and `59807` bytes.

Status:
Implemented as a domain-boundary hardening refactor. Project completion remains `70%`.

---

## 2026-06-25

Decision:
Wave 3 legacy manufacturer `.xls` parsing should standardize on approved LibreOffice conversion to `.xlsx` plus the existing OOXML extractor.

Reason:
Manufacturer registry and service-kit evidence requires exact source file, sheet, and row. The PM workbook already works through OOXML extraction, while EPM/APM is blocked because the workbook is true legacy binary `.xls`. Compared with Node legacy parser packages, manual conversion, Python tooling, and Excel COM automation, LibreOffice conversion best preserves a scalable, automatable, reviewable, non-runtime parsing path without adding Excel parsing logic to the Next.js app.

Strategy comparison outcome:

- LibreOffice conversion: preferred for accuracy, automation, maintainability, and future scalability once explicitly approved.
- Node parser package: fallback only after package-by-package approval; adds dependency and parser-behavior maintenance risk.
- Manual conversion/export: safe fallback when no tool install is approved, but weak for repeatable imports and requires operator/date/hash/row-preservation audit.
- Python/openpyxl: rejected for binary `.xls`; reads `.xlsx`, not legacy BIFF `.xls`.
- Python legacy parser packages: backup fallback only after Python runtime and package approval.
- Excel COM automation: avoid except emergency local inspection; brittle/headless-unfriendly and already failed in this environment.

Future import workflow:

1. Preserve original workbook.
2. Classify file format before parsing.
3. Convert legacy `.xls` only after approval.
4. Extract generated JSON fixtures with source file/sheet/row evidence.
5. Validate sheets, row counts, required columns, sample rows, duplicates, blanks, and model/title mismatches.
6. Version fixtures with source hash, converter/parser version, extraction date, row counts, and warnings.
7. Human-review conflicts before runtime or DB promotion.
8. Runtime may read generated fixtures only; Excel files are not runtime dependencies.
9. DB import/schema promotion remains a separate approval gate.
10. New vendor workbook versions require diff review before replacing trusted evidence.

20APM validation:
Exact source evidence is mandatory. If parser support does not expose an exact `20APM` source sheet/row and oil separator SKU, `20APM` remains blocked. Compare any extracted `20APM` separator against `20PM2` SKU `25350030-021`; alias normalization must not override source evidence and conflicts remain `REVIEW_REQUIRED`.

Boundary:
Planning only. No package installation, parser implementation, conversion artifact, DB write, schema change, runtime behavior change, Maven/Invoice4U call, external API call, email/customer action, inventory action, source-system action, or production action occurred.

Status:
Completed. Stop before implementation; next step requires explicit approval for LibreOffice or another parser path.

---

## 2026-06-25

Decision:
Use LibreOffice conversion as the preferred strategy for legacy EPM/APM `.xls` extraction, but only after explicit approval.

Reason:
The EPM source workbook is a legacy binary `.xls`, while the current PM extraction succeeded because that file is actually OOXML content stored with a `.xls` extension. Current local tooling does not include LibreOffice, no parser package is installed, Python is not a usable local runtime for this task, and `openpyxl` does not parse binary `.xls`. Converting to `.xlsx` with LibreOffice keeps parsing out of the Next.js runtime and lets the existing read-only OOXML extraction path be reused.

Recommended order:

1. LibreOffice conversion to `.xlsx` after explicit approval.
2. Node parser package only as a fallback after explicit package-by-package approval.
3. Do not use Python/openpyxl for binary `.xls`.
4. Manual Excel export fallback only when tool install is not approved, with operator/date/hash/row-preservation audit evidence.

20APM validation gates:

- Confirm exact source sheet or exact source row for `20APM`; if missing, remain blocked and do not infer.
- Extract exact oil separator SKU with source file, sheet, row, and raw description.
- Compare against `20PM2` oil separator SKU `25350030-021` from PM sheet `20PM2`, row 8.
- Preserve the existing rule that alias/model normalization conflicts become needs-review.
- Confirm shared SKU overlap does not create shared service-kit membership.

Boundary:
Planning/strategy only. No package install, conversion artifact, DB write, schema change, runtime behavior change, Maven/Invoice4U call, email/customer action, inventory action, source-system action, or production action occurred.

Status:
Completed. Next step requires explicit approval before installing LibreOffice or any parser package.

---

## 2026-06-25

Decision:
PM/APM aliases must not merge SKU compatibility when a part-specific conflict exists.

Reason:
The generated PM registry fixture contains exact `20PM2` oil separator evidence, but no exact `20APM` row. Existing canonical knowledge says `20APM = 20PM2` is an identity alias only, while `20APM` oil separator uses the `30PM` oil separator by approved exception and must not use the `20PM2` separator. Allowing alias normalization to merge those rows would produce a wrong SKU for real service kits or inventory.

Evidence:

- Generated PM fixture includes `20PM2` oil separator SKU `25350030-021`, source sheet `20PM2`, source row `8`.
- Generated PM fixture has `0` exact `20APM` rows.
- `MANUFACTURER_KNOWLEDGE_BASE.md` records `20APM = 20PM2` as an alias that does not approve oil separator matching.
- `PART_COMPATIBILITY_REGISTRY.md` records `20APM Oil Separator = 30PM Oil Separator` and `20APM Oil Separator != 20PM2 Oil Separator`.

Rule:
If alias/model normalization causes a SKU conflict for a part category, mark the line or kit membership as needs-review. Shared SKU overlap does not create a shared service kit.

Boundary:
Documentation validation only. No runtime behavior change, customer PDF change, DB write, schema change, package install, Maven/Invoice4U call, email/customer action, inventory action, source-system action, or production action occurred.

Status:
Completed. Future service-kit and inventory work must preserve model-specific and exception-specific compatibility instead of merging by family name.

---

## 2026-06-25

Decision:
Use generated Manufacturer Parts Registry and service-kit intelligence fixtures as the safe import MVP before any database import.

Reason:
The project needs one reusable registry foundation for many models without relying on Excel files at runtime or creating one-off per-model evidence. The PM Series workbook is parseable in the current environment as OOXML despite the `.xls` extension, while the EPM workbook is legacy binary `.xls` and cannot provide exact sheet/row evidence without approved parser/conversion tooling.

Implemented scope:

1. Generated `data-sources/vendor-spare-parts/generated/manufacturer-parts-registry.sample.json` with 250 PM registry rows across 9 PM models.
2. Generated `service-kit-intelligence.sample.json` with 8 interval kit candidates per PM model.
3. Generated `shared-sku-overlap.sample.json` with 69 shared manufacturer SKU overlaps.
4. Generated `manufacturer-registry-import-summary.sample.json` recording PM coverage and EPM partial-only status.
5. Updated runtime registry loading to use the generated fixture instead of hard-coded 40PM rows.
6. Updated reusable Project Brain knowledge bases to record the import plan, service-kit plan, model-to-kit matrix, shared overlap report, and unknowns.

Boundary:
Safe fixture/read-runtime work only. No DB write, schema change, production import, parser package install, Maven/Invoice4U call, email/customer action, inventory action, source-system action, or production action occurred. Manufacturer SKU remains internal-only; customer-facing documents continue to use only Tal/internal sales SKU.

Status:
Completed for PM Series MVP. EPM exact extraction, schema promotion, DB import, sales SKU mapping, inventory use, and external export remain separate approval gates.

---

## 2026-06-25

Decision:
SKU matching runtime must be generic and must not use ServiceReport `5806`, `NEXT-AI-DRAFT-5806`, or `40PM` as architecture gates.

Reason:
Knowledge Base Consolidation made the 5806/40PM evidence a validation sample. Keeping report/model gates in runtime would block reuse across future ServiceReports and risk printing manufacturer part numbers as customer-facing SKUs.

Implemented scope:

1. Extracted the reviewed PM 40PM rows into one generic manufacturer parts registry seed module.
2. Refactored the SKU matcher to use model evidence, manufacturer registry rows, item category keywords, and optional linked Tal sales SKU.
3. Removed ServiceReport-number gating from the matcher.
4. Updated BusinessDocument enrichment to pass linked `Product.sku` as the customer-facing sales SKU source.
5. Updated the internal review page to show manufacturer part numbers internally and show `Needs sales SKU mapping` when no Tal sales SKU exists.
6. Updated the customer preview/PDF to show SKU only from Tal sales SKU and hide manufacturer part numbers.

Boundary:
Read/runtime refactor only. No DB write, schema change, Prisma change, import, Maven/Invoice4U call, email/customer action, inventory action, source-system action, or production action occurred.

Status:
Completed. ServiceReport `5806` and PM `40PM` remain validation samples only.

---

## 2026-06-25

Decision:
Project Brain permanent knowledge must be consolidated into reusable Knowledge Bases; case-specific documents may exist only temporarily during research.

Reason:
Wave 2 and Wave 3 created durable evidence in files tied to one compressor model, one ServiceReport, one registry spec, or one-time research packet. That pattern does not scale to thousands of ServiceReports, hundreds of compressor models, and dozens of manufacturers. Permanent knowledge must be reusable and expandable.

Implemented scope:

1. Created reusable Knowledge Bases for manufacturer parts, manufacturer service kits, service commercial rules, ServiceReport-to-Maven mapping, document engine behavior, and SKU matching rules.
2. Moved the SCR 40PM inventory/service-kit packets, ServiceReport 5806 commercial packet, and ServiceReport Maven link registry spec to `project-brain/archive/research/`.
3. Updated active Project Brain references to point at reusable Knowledge Bases or archived research evidence.
4. Added a governance rule to `PROJECT_OPERATING_PROTOCOL.md`: case-specific documents may exist only temporarily during research; permanent knowledge must be consolidated into reusable Knowledge Bases.
5. Marked older generic spec/discovery documents as legacy planning surfaces that should not be extended as permanent knowledge.

Boundary:
Documentation refactor only. No runtime behavior changed, no DB write, no schema change, no Maven/Invoice4U call, no email/customer action, no inventory action, no source-system action, and no production action occurred.

Status:
Completed. Future work should expand reusable Knowledge Bases instead of creating permanent `*_EVIDENCE_PACKET`, `*_DISCOVERY`, `*_SPEC`, per-model, or per-service-report Project Brain files.

---

## 2026-06-25

Decision:
ServiceReport `5806` may use a read/runtime manufacturer SKU matching layer from trusted PM Series 40PM evidence without schema changes or imports.

Reason:
The PM Series workbook has already been inspected and contains exact source row evidence for the 40PM service parts needed by the `NEXT-AI-DRAFT-5806` BusinessDocument. The immediate runtime need is to display trusted SKU evidence on internal review and show customer-facing SKUs only when confidence is high, while keeping the future SKU registry/import separately gated.

Implemented scope:

1. Added a small internal matcher for ServiceReport `5806` only.
2. Required linked equipment model evidence supporting `40PM` / `SCR-40PM`.
3. Used only `data-sources/vendor-spare-parts/Spare Parts Service List(PM Series) rev3 (1).xls` evidence.
4. Matched trusted 40PM rows for air filter `25100043-071`, oil filter `25200007-005`, oil separator `25300045-023` when a matching line exists, and coolant/oil `80000175-039`.
5. Exposed SKU source evidence internally on `/business-documents/[id]`.
6. Exposed a Hebrew `מק"ט` customer-facing column on preview/PDF only when a trusted SKU match exists.

Boundary:
Read/runtime enrichment only. No schema change, SKU import, DB write, price change, Maven/Invoice4U call, email/customer action, inventory action, source-system action, or production action occurred.

Status:
Approved by user request and implemented as a Wave 3 internal runtime capability. Broad SKU registry/import and inventory/purchase-order use remain separate approval gates.

---

## 2026-06-25

Decision:
Manufacturer Excel spare-parts files are the trusted technical SKU/model compatibility source for future SKU registry planning.

Reason:
The repo already contains manufacturer spare-parts workbooks under `data-sources/vendor-spare-parts/`. The PM workbook has clear model-specific sheets with manufacturer codes and part descriptions. Historical service/invoice/catalog sources can support pricing, usage, or internal SKU mapping, but they must not override manufacturer compatibility without an approved manual override.

Observed evidence:

- `Spare Parts Service List(PM Series) rev3 (1).xls` is inspectable as Office Open XML despite the `.xls` extension. It contains model sheets including `10PM2`, `15PM2`, `20PM2`, `30PM`, `40PM`, `50PM`, `60PM`, `75PM`, and `100PM`.
- PM columns include `Item`, `Model`, `Code`, `spare parts name`, `specification`, `Unit`, interval quantity columns, exchange-time fields, and remarks.
- `40PM` examples include air filter `25100043-071`, oil filter `25200007-005`, oil separator `25300045-023`, and coolant `80000175-039`.
- `Spare Parts Service List(EPM Series) rev2 (1).xls` is legacy binary `.xls`; binary strings confirm EPM model and part-name coverage, but exact sheet/row evidence requires approved conversion/parser tooling.

Rules:

1. Map ServiceReport equipment model to compatible SKU list only through exact/approved model normalization and reviewed workbook rows.
2. Map AI suggested item to manufacturer SKU only when model, part category, and source row evidence are high confidence.
3. If no confident match exists, set SKU review required.
4. Customer-facing PDF shows SKU only when trusted and approved for display.
5. Internal review shows matched SKU, manufacturer, confidence, source Excel file/sheet/row, compatible models, and needs-review flag.
6. Future inventory and purchase orders must use the same SKU registry and internal SKU mapping layer.

Boundary:
Planning/read-only only. No schema change, DB write, import, parser package install, Maven/Invoice4U call, email/customer action, inventory action, source-system action, or production action occurred.

Status:
Approved by user request as planning. Future import/schema/runtime SKU matching requires separate explicit approval.

---

## 2026-06-25

Decision:
The BusinessDocument preview/PDF surface should be Hebrew RTL and customer-facing, while internal warnings and evidence remain only on the review page.

Reason:
The internal PDF route is still not approved for customer delivery, but the visual output should be clean enough for customer-facing review and future export readiness. Internal staging notes, evidence/debug fields, boundary warnings, and source-system terminology create confusion and must not appear in the preview/PDF surface.

Implemented fix:
Converted visible preview/PDF document labels to Hebrew, simplified the document metadata, translated known service lines, removed pricing evidence/source/debug/internal boundary text from the preview/PDF, renamed the attachment to `NEXT-AI-DRAFT-5806.pdf`, and compacted print CSS so the PDF renders as one A4 page.

Validation:
Preview route returned HTTP 200, PDF route returned HTTP 200 with `application/pdf`, totals remained `1885.00 ILS`, `320.45 ILS`, and `2205.45 ILS`, preview content no longer contains `Internal`, `pricing evidence`, `Unsupported`, or `Maven`, and Chrome PDF viewer rendered one readable Hebrew page without cutting.

Boundary:
Preview/PDF layout change only. No DB write, Maven/Invoice4U call, email/customer action, inventory action, schema change, totals logic change, file persistence, source-system action, or production action occurred.

Status:
Completed as customer-facing layout hardening for the existing internal PDF capability. Actual customer delivery remains gated.

---

## 2026-06-25

Decision:
The internal PDF subtotal-row visual defect is fixed with print CSS only.

Reason:
The PDF smoke test found a minor horizontal line crossing the subtotal row on page 2. This was a print layout collision between the line table and totals block, not a data/totals issue.

Implemented fix:
`app/globals.css` adds print-safe break avoidance for line rows and totals blocks, keeps the totals box on a white background, and adds print spacing between the line table and totals section.

Validation:
Preview route returned HTTP 200, PDF route returned HTTP 200 with `application/pdf`, totals remained `1885.00 ILS`, `320.45 ILS`, and `2205.45 ILS`, and temporary Chrome PDF viewer rendering confirmed the subtotal row is no longer crossed by the line.

Boundary:
CSS/preview/PDF visual bugfix only. No DB write, Maven/Invoice4U call, email/customer action, inventory action, schema change, totals logic change, file persistence, source-system action, or production action occurred.

Status:
Completed as a visual polish bugfix for the existing internal PDF export capability.

---

## 2026-06-25

Decision:
Codex must not install new npm packages without explicit approval per package.

Reason:
The internal PDF export MVP required Playwright and exposed that dependency changes can alter runtime surface, package metadata, audit posture, and deployment assumptions. Future dependency additions must therefore be treated as explicit package-level approval gates, even when the surrounding task is otherwise approved.

Rule:
Before running an npm install that adds a new package, Codex must stop and obtain approval naming the exact package or packages to add. Existing validation commands and installs that do not add packages remain governed by the normal task scope and sandbox rules.

Status:
Governance lock added to `PROJECT_OPERATING_PROTOCOL.md` after the PDF export smoke test. No automatic audit fix was run.

---

## 2026-06-25

Decision:
BusinessDocument review/PDF totals must display effective line-derived totals when stored BusinessDocument header totals are missing or stale.

Reason:
The PDF smoke test for `NEXT-AI-DRAFT-5806` found that the generated PDF opened correctly and RTL content was readable, but the totals block showed `ILS 0.00` because the staging BusinessDocument header totals were stale while line corrections had valid item totals. The internal preview/PDF review surface must not show stale zero totals when trusted line totals exist.

Implemented fix:
`lib/business-document-engine.ts` now uses current line totals as the effective subtotal when stored header subtotal is missing or mismatched, calculates 17% VAT when stored VAT/total are missing, and records warnings that stored totals are missing/stale. This is a read/display calculation only and does not write database totals.

Validation:
Preview content now contains `1885.00 ILS`, `320.45 ILS`, and `2205.45 ILS`. PDF route returned HTTP 200, `application/pdf`, `%PDF-`, and 82704 bytes. Chrome PDF viewer rendered the generated PDF and page 2 showed subtotal `ILS 1885.00`, VAT `ILS 320.45`, total `ILS 2205.45`, and balance due `ILS 2205.45`.

Boundary:
No DB write, no file persistence by the app, no saved PDF record, no sent/exported status mutation, no Maven/Invoice4U call, no external API call, no email/customer-facing action, no inventory action, no schema/Prisma change, and no production/source-system action occurred.

Status:
Implemented as a smoke-test bug fix and governance lock. A minor visual overlap line crosses the subtotal row in the PDF viewer and remains a layout polish gap.

---

## 2026-06-25

Decision:
Internal BusinessDocument PDF export is implemented first as a temporary-download-only route, not as an external export or saved document workflow.

Reason:
The existing `/business-documents/[id]/preview` route is already the internal Maven-style source layout. Rendering that route through Playwright/Chromium keeps one HTML/CSS source for review output while avoiding a duplicate PDF template.

Implemented scope:

1. Add `GET /business-documents/[id]/pdf`.
2. Validate the BusinessDocument by existing adapter before rendering.
3. Load `/business-documents/[id]/preview` and call Playwright/Chromium `page.pdf()` with A4, print CSS, and background printing.
4. Stream `application/pdf` as an attachment.
5. Add internal PDF links from BusinessDocument review and preview pages.

Boundary:
Temporary download only. No DB write, no file persistence, no saved PDF record, no BusinessDocument sent/exported status mutation, no Maven/Invoice4U call, no external API call, no email/customer-facing action, no inventory action, no schema/Prisma change, and no production/source-system action occurred.

Validation:
Focused TypeScript passed. Route validation for `NEXT-AI-DRAFT-5806` returned HTTP 200 for review and preview pages with PDF links. PDF route returned HTTP 200, `Content-Type: application/pdf`, attachment filename `NEXT-AI-DRAFT-5806-internal-preview.pdf`, `%PDF-` signature, and `82096` bytes.

Status:
Approved by user request and implemented as an internal Wave 3 review capability. Real Maven/Invoice4U execution, customer-facing delivery, saved PDF persistence, and audit-log writes remain separate approval gates.

---

## 2026-06-25

Decision:
Internal PDF export should be implemented first as a temporary-download-only Playwright/Chromium print-to-PDF route from the existing BusinessDocument HTML preview.

Reason:
The existing `/business-documents/[id]/preview` route is already the internal source for the Maven-style document layout and uses the BusinessDocument engine output. Reusing that HTML/CSS as the print source avoids a duplicate PDF template and keeps BusinessDocument as the source of truth.

Recommended path:

1. Add `GET /business-documents/[id]/pdf` in a future approved implementation task.
2. Use Playwright/Chromium server-side `page.pdf()` with `format: "A4"`, `printBackground: true`, and `preferCSSPageSize: true`.
3. Load the existing preview route and stream the PDF as `application/pdf`.
4. Start with temporary download only; do not write DB rows, save files, update Maven fields, create AutomationCommands, or send anything.
5. Add saved-file storage and audit logging only as a later explicitly approved protected write capability.

Dependency and validation requirements:

- Resolve Playwright dependency/types before implementation.
- Confirm Chromium availability in the target server environment.
- Validate generated PDF against `project-brain/reference/maven-samples/document_102488.pdf` using approved renderer tooling.
- Check Hebrew/RTL rendering, fonts, A4 size, margins, row/page breaks, totals block, footer, and signature area.

Boundary:
Planning only. No runtime behavior changed, no PDF generation occurred, no dependency was installed, no Maven/Invoice4U call occurred, no external API call occurred, no email/customer-facing action occurred, no inventory action occurred, no DB write occurred, no schema/Prisma change occurred, and no production/source-system action occurred.

Status:
Approved by user request as planning. Implementation remains `APPROVAL_REQUIRED` because it adds PDF generation dependencies/runtime behavior and may later lead to file/DB writes.

---

## 2026-06-25

Decision:
Maven sample PDF may be stored as a Project Brain reference artifact for preview accuracy work.

Reason:
The internal BusinessDocument HTML preview needs an evidence-backed Maven visual reference. Storing the uploaded sample in Project Brain allows future preview/PDF work to compare against a stable artifact without calling Maven or changing runtime behavior.

Approved scope:

1. Store the uploaded PDF at `project-brain/reference/maven-samples/document_102488.pdf`.
2. Treat it as reference-only project evidence.
3. Point Project Brain to the sample.
4. Revalidate the preview route using the sample as the intended visual reference.

Observed:
The file was copied from `C:\Users\משתמש\Downloads\document_102488.pdf` and observed at `61973` bytes after import. Local direct rendering was blocked because Poppler/Ghostscript/ImageMagick are unavailable, `sharp` cannot rasterize the PDF, Python is unavailable as a working runtime, and headless Chrome did not emit screenshot files.

Boundary:
Reference asset only. No runtime behavior changed, no PDF generation occurred, no Maven/Invoice4U call occurred, no external API call occurred, no email/customer-facing action occurred, no inventory action occurred, no DB write occurred, no schema/Prisma change occurred, and no production/source-system action occurred.

Status:
Approved by user request and imported. Direct visual parity should be rerun when a working PDF renderer or sample screenshot is available.

---

## 2026-06-25

Decision:
BusinessDocument HTML preview accuracy pass remains HTML/CSS-only and does not create PDF or external output.

Reason:
Wave 3 needs the internal preview to more closely resemble Maven-style output before any real Maven/Invoice4U execution is approved, while preserving `BusinessDocument` as the source of truth and avoiding external side effects.

Approved implementation scope:

1. Improve `/business-documents/[id]/preview` spacing, metadata layout, RTL table alignment, totals block, footer/signature area, and print CSS.
2. Keep the preview generic for all BusinessDocument engine document types.
3. Keep due date as a safe empty state when no trusted field exists.
4. Replace the placeholder logo only if a safe existing Tal logo asset exists in the repo.

Evidence:
Local search did not find `document_102488.pdf` in the repository and did not find an approved Tal logo asset. Existing image assets were dependency icons and an AppSheet screenshot, so the logo placeholder remains and the gap is visible in the preview.

Boundary:
HTML/CSS-only refinement. No PDF generation, no Maven/Invoice4U call, no external API call, no email/customer-facing action, no inventory deduction, no DB write, no schema/Prisma change, no source-system change, and no production action occurred.

Status:
Approved by user request and implemented as a read-only preview accuracy pass. Direct visual parity remains limited until the Maven sample PDF or a rendered sample screenshot is available in the workspace.

---

## 2026-06-25

Decision:
BusinessDocument internal HTML preview is implemented as a read-only Next.js preview, not PDF generation or external export.

Reason:
Wave 3 needs an internal visual review surface that resembles the Maven output document before any Maven/Invoice4U execution is approved. The preview must keep `BusinessDocument` as the source of truth, use the internal engine output for totals/payment/balance, and support generic document types rather than invoice-only rendering.

Approved implementation scope:

1. Add `/business-documents/[id]/preview` as a GET-only HTML preview route.
2. Reuse the existing BusinessDocument adapter and internal engine review output.
3. Render a Hebrew RTL document layout with company/logo area, customer block, document date/due-date placeholder, document title/type/number, item table, subtotal/VAT/total/payment/balance, notes, footer, and digital-signature area.
4. Link the preview from the BusinessDocument review page.
5. Update route map and Project Brain only.

Boundary:
HTML preview only. No PDF generation, no Maven/Invoice4U call, no external API call, no email/customer-facing action, no inventory deduction, no DB write, no schema/Prisma change, no source-system change, and no production action occurred.

Status:
Approved by user request and implemented as a read-only internal review capability. PDF generation and real external output remain `APPROVAL_REQUIRED`.

---

## 2026-06-25

Decision:
Internal BusinessDocument and Payment Engine is implemented as a review/validation layer only.

Reason:
Wave 3 needs one internal source-of-truth engine for business documents before any external Maven/Invoice4U output is approved. The engine must support quotes, proformas, tax invoices, receipts, tax-invoice receipts, purchase orders, delivery notes, and credit notes, plus internal payment evidence and future attachment readiness, while preserving `BusinessDocument` as the internal draft/source of truth.

Approved implementation scope:

1. `BusinessDocument` remains the source of truth.
2. The engine validates/reviews document type support, VAT, totals, payment amount, balance due, receipt-payment requirements, export blockers, warnings, supported payment sources, and future uploaded check/bank-proof attachment readiness.
3. Supported document types are `QUOTE`, `PROFORMA_INVOICE`, `TAX_INVOICE`, `RECEIPT`, `TAX_INVOICE_RECEIPT`, `PURCHASE_ORDER`, `DELIVERY_NOTE`, and `CREDIT_NOTE`.
4. Supported internal payment sources are bank transfer, check, credit card, cash, other, future uploaded check image, and future bank proof attachment.
5. Existing legacy enum/code names are not renamed in this step.
6. External export always remains blocked until separate explicit approval.

Boundary:
No external API call, no Maven/Invoice4U call, no email/customer-facing action, no inventory deduction, no DB write during implementation/validation, no schema/Prisma change, no real export implementation, no payment attachment upload/storage implementation, no source-system change, and no production action occurred.

Status:
Approved by user request and implemented as an internal review/validation capability. Real external export and payment attachment handling remain `APPROVAL_REQUIRED`.

---

## 2026-06-25

Decision:
Maven API environment placeholders may be added to tracked env examples, but real Maven secrets must not be committed.

Reason:
Wave 3 needs a safe way to name required Maven API configuration before any real execution work. Placeholder names help define the future contract without exposing credentials or enabling external calls.

Approved placeholder scope:

1. `.env.staging.example` may contain blank Maven API variable names.
2. `MAVEN_EXECUTION_ENABLED=false` is the safe default.
3. `project-brain/migration/MAVEN_SOURCE_INVENTORY.md` documents required Maven API values and the pre-execution checklist.
4. No code should read or require these variables until a real executor task is separately approved.

Required future evidence before real execution:

1. Target Maven environment.
2. Base URL and endpoint paths.
3. Authentication mode.
4. Document-generation request/response/error schema.
5. Customer matching and item identity rules.
6. VAT/tax and total calculation behavior.
7. Idempotency, duplicate protection, retry, timeout, and rate-limit rules.
8. Confirmation that document generation does not email customers automatically.
9. Approved secret placement outside git.

Boundary:
Documentation/placeholders only. No real secret was added to git, no runtime behavior changed, no code was implemented, no DB write occurred, no schema change occurred, no import occurred, no Maven/Invoice4U action occurred, no Apps Script/AppSheet/Google Sheets/source-system/production change occurred, no email/customer-facing action occurred, and no inventory action occurred.

Status:
Approved by user request and completed as placeholders/checklist only. Real Maven execution remains `APPROVAL_REQUIRED`.

---

## 2026-06-25

Decision:
Correct Wave 3 Maven terminology: Maven does not create internal drafts.

Reason:
The project wording from Wave 2 used "Maven draft" as a shorthand, but the actual internal draft object is `BusinessDocument`. Maven is the external document generation/output system only. Keeping the distinction explicit prevents future executor work from treating Maven as the owner of draft state.

Approved terminology:

1. `BusinessDocument` is the internal draft and review object.
2. `BusinessDocumentItems` are the internal draft lines.
3. Maven/Invoice4U is document generation/output only.
4. `CREATE_MAVEN_DRAFT` is a legacy/internal command type name introduced during Wave 2 and must be treated as compatibility terminology.
5. Future command naming should use `CREATE_MAVEN_DOCUMENT`.
6. Existing staging IDs, command types, and code paths are not renamed now because renaming could break idempotency, route links, smoke-test evidence, and existing staging rows.

Boundary:
Documentation-only correction in Project Brain and Decision Log. No runtime behavior changed, no code was renamed, no staging IDs changed, no DB write occurred, no schema change occurred, no import occurred, no Maven/Invoice4U action occurred, no Apps Script/AppSheet/Google Sheets/source-system/production change occurred, no email/customer-facing action occurred, and no inventory action occurred.

Status:
Approved by user request. Future Wave 3 naming should say Maven document generation/output, not Maven draft creation.

---

## 2026-06-25

Decision:
Wave 3 Maven Source Inventory is the canonical read-only inventory for current Maven-related source objects.

Reason:
Wave 3 cannot proceed toward real Maven execution until the project has an evidence-backed inventory of Maven-related data sources, sync/control objects, Apps Script functions, supporting configuration, relationships, data flow, and migration recommendations. The inventory consolidates existing local repository evidence without touching Maven, AppSheet, Google Sheets, Apps Script deployments, Prisma schema, or the database.

Findings:
The confirmed real Maven API call in checked local source is document search/import via `searchDocuments`. Checked local source does not prove a real Maven document-generation endpoint, request schema, response schema, error schema, or rate limits. Legacy `createMavenDraft(data)` in checked Apps Script source updates internal workflow state and does not show an external Maven document-generation call. Root `apps-script/MavenAPI.js` and Project Brain snapshot `project-brain/apps-script/MavenAPI.gs` differ and must be reconciled before execution work.

Boundary:
Documentation-only Project Brain update. No runtime behavior changed, no DB write occurred, no schema change occurred, no import occurred, no Maven/Invoice4U action occurred, no Apps Script/AppSheet/Google Sheets/source-system/production change occurred, no email/customer-facing action occurred, and no inventory action occurred.

Status:
Completed as read-only Wave 3 discovery. Real Maven execution remains `APPROVAL_REQUIRED`.

---

## 2026-06-25

Decision:
Wave 2 end-to-end staging smoke test was approved for internal DB writes only on ServiceReport `5806`.

Reason:
Liad explicitly requested validation of the full internal read/protected-write chain: AI Draft Preview, protected internal BusinessDocument draft creation, BusinessDocument review, protected Maven document-generation AutomationCommand creation only, AutomationCommand review, and duplicate blocking.

Observed result:
The smoke test created BusinessDocument `NEXT-AI-DRAFT-5806` / `1d7f8500-1cb7-4d81-ad3a-b7d5d8b453eb` and AutomationCommand `NEXT-MAVEN-CMD-NEXT-AI-DRAFT-5806` / `db12ee97-0960-4f85-bdd5-f9fa30780885` with idempotency key `maven-draft:1d7f8500-1cb7-4d81-ad3a-b7d5d8b453eb`. Duplicate draft and command attempts were blocked by existing-record/no-form states.

Boundary:
This approval allowed internal staging DB writes for the smoke test only. It did not allow Maven/Invoice4U calls, command execution, customer-facing email/send, inventory deduction, Google Sheets/AppSheet/Apps Script/source-system changes, schema changes, imports, production integration, or production action.

Status:
Approved by user request and completed. Runtime bug fixed in commit `3d269fb Handle missing AI draft quantities`.

---

## 2026-06-25

Decision:
Protected Maven document-generation AutomationCommand creation is approved only for the internal Next.js Server Action path on `/business-documents/[id]`.

Reason:
Liad explicitly approved creating an internal AutomationCommand for Maven document generation/output from an approved internal `BusinessDocument` draft. The approved scope requires an exact approval phrase, BusinessDocument status `APPROVED` or `READY_TO_SEND`, idempotency by BusinessDocument, command-status visibility on the review page, and no customer-facing or external-system action.

Boundaries:
This approval allows creating only one internal pending `AutomationCommand` of type `CREATE_MAVEN_DRAFT` for an eligible BusinessDocument. `CREATE_MAVEN_DRAFT` is a legacy/internal Wave 2 compatibility name; the intended future name is `CREATE_MAVEN_DOCUMENT`. This approval does not allow Maven/Invoice4U API calls, email/customer-facing action, inventory deduction, BusinessDocument mutation, schema changes, Prisma changes, imports, source-system changes, production integration, or duplicate commands for the same BusinessDocument.

Status:
Approved and implemented in commit `5fafc36 Add Maven draft command gate`; terminology corrected after implementation without renaming existing code or staging IDs.

---

## 2026-06-25

Decision:
AI Draft Approval to BusinessDocument Draft runtime is approved only for the protected Next.js Server Action path on `/ai-drafts/preview/[reportCounter]`.

Reason:
Liad explicitly approved converting an approved AI Draft Preview into an internal BusinessDocument draft and BusinessDocumentItems. The approved scope requires explicit user approval before creation, idempotency by ServiceReport, preserved item pricing evidence, and a block or explicit override when required pricing evidence is missing.

Boundaries:
This approval does not allow Maven/Invoice4U action, AutomationCommand creation, customer-facing email/send action, inventory deduction, schema changes, Prisma changes, imports, source-system changes, production integration, or duplicate BusinessDocument drafts for the same ServiceReport.

Status:
Approved.

---

## 2026-06-25

Decision:
Transition project execution mode from governance building to `CAPABILITY_BUILDING`.

Purpose:
Move the project out of foundational governance construction and into working capability delivery.

Approved rules:

1. Current Project Mode is `CAPABILITY_BUILDING`.
2. Governance Status is `FROZEN`.
3. Current Priority is working runtime capabilities instead of documentation expansion.
4. The project is measured by capabilities added, not documents added.
5. Every proposed task must answer what new capability will exist after completion.
6. If no new capability will exist, the Orchestrator must stop and recommend merge, reuse, extend, or reject.
7. Creating new specs, registries, knowledge bases, governance documents, roadmap items, or decision systems is `FORBIDDEN` unless a governance bug is discovered, a safety issue exists, Liad explicitly approves, or a capability cannot be built safely without it.
8. Next implementation work should prioritize runtime, working UI, AI Draft Preview, Action Server, Email Runtime, and Inventory Runtime.

Boundary:
Existing governance extended only. No new governance files, runtime implementation, DB, Prisma, Maven, Inventory, Google Sheets, AppSheet, Apps Script, Drive, email, customer-facing action, or production action occurred.

Status:
Approved by user request; implemented by updating existing governance files only.

---

Decision:
Upgrade `ORCHESTRATOR_AGENT` Phase 2 into the Executive Decision Engine.

Purpose:
Make the existing Orchestrator maximize project value, reduce duplicate work, consult the right specialist agents, score alternatives, and improve the project after each completed task without creating a new Executive Agent or duplicate governance.

Approved rules:

1. Do not create a new Executive Agent. Extend `agents/ORCHESTRATOR_AGENT.md` and existing Project Brain governance only.
2. Every task must execute the Executive Cycle: Understand, Discover, Consult, Score, Decide, Execute, Validate, Learn, Improve.
3. Before choosing a solution, the Orchestrator must consult all relevant existing agents, governance systems, and Project Brain workflow roles. Each consultation must include recommendation, risks, evidence, confidence, and better alternatives.
4. Every candidate task or solution path must be scored for Business Value, Technical Value, Project Acceleration, Reuse Score, Duplicate Risk, Runtime Impact, Long-term Value, Complexity, and Estimated Time.
5. Before creating any Agent, Registry, Spec, Rule, Knowledge Base, or Roadmap Item, the Orchestrator must prove existing assets were already searched, already verified, and already rejected. Without that proof, creation is `FORBIDDEN`.
6. After every completed task, the Orchestrator must check whether it could have been completed faster, with fewer files, fewer agents, fewer tokens, less duplication, or less user involvement. If yes, produce an Improvement Evidence Packet for Liad.
7. Every Reality Check should report duplicate work prevented, reuse percentage, capabilities added, documentation created, capability/documentation ratio, project acceleration score, outstanding executive decisions, and highest-value next task.
8. The Orchestrator's purpose is to maximize project value while minimizing duplication, token usage, user interruptions, unnecessary documentation, unnecessary agents, and unnecessary complexity.

Boundary:
Documentation/governance only. No runtime implementation, DB, Prisma, Maven, Inventory, Google Sheets, AppSheet, Apps Script, Drive, email, customer-facing action, production action, or new agent occurred.

Status:
Approved by user request; implemented by extending existing governance.

---

Decision:
Upgrade `ORCHESTRATOR_AGENT` into the Project Executive Decision Engine.

Purpose:
Make every new task, idea, bug, feature, investigation, proposal, or request pass through one evidence-based routing and reuse decision before work begins.

Approved rules:

1. Do not create a new PM Agent. Extend `agents/ORCHESTRATOR_AGENT.md` and existing Project Brain governance.
2. The Orchestrator must optimize for least duplication, maximum reuse, shortest safe path, highest business value, highest project acceleration, and evidence-based decisions.
3. Every task must be classified through the Orchestrator Question Matrix: task existence, reuse-before-create, agent discovery, business knowledge, architecture, execution, and success/capability gained.
4. Every task receives one authority level: `AUTO_EXECUTE`, `REPORT_ONLY`, `APPROVAL_REQUIRED`, or `FORBIDDEN`.
5. The project is measured by new capabilities, not the number of new documents. If a task only creates a document, the Orchestrator must check whether it can be merged, extend an existing document, or unlock a real capability.
6. New agents, registries, specs, roadmap items, or knowledge bases remain forbidden until existing assets are searched, verified, and rejected as insufficient.
7. Continuous-improvement findings require an Evidence Packet and Liad approval before Project Brain or agent instructions are updated.

Boundary:
Documentation/governance only. No runtime implementation, DB, Prisma, Maven, Inventory, Google Sheets, AppSheet, Apps Script, Drive, email, customer-facing action, or production action occurred.

Status:
Approved by user request; implemented as existing-governance extension.

---

## 2026-06-24

Decision:
Approve AI Draft compressor service business rules for readiness.

Purpose:
Resolve the remaining AI Draft recommendation readiness decision blockers for approval-based draft previews.

Approved rules:

1. SCR Small Service Kit: for SCR compressor 2000h / 2500h small service, default kit includes Air Filter, Oil Filter, and 3L SKR oil top-up.
2. Labor + Service: separate commercial line; not included in the small service kit unless explicit historical evidence says otherwise.
3. Technician Visit / Travel: one commercial line; default suggested price is 300 ILS; keep `NeedsApproval = true` when evidence conflicts or customer-specific history exists because nearby customers may be waived.
4. Large Service Oil Rule: 4000h / 5000h Large Service replaces the full oil content; do not treat Large Service oil as top-up.
5. Partial Serial: partial serial remains `NEEDS_MANUAL_CONFIRMATION`; do not classify partial serial as `HIGH_WITH_REVIEW`.

Readiness effect:
AI Draft recommendation readiness moves to `READY_FOR_APPROVAL_BASED_DRAFTS`. This allows approval-based recommendation previews with evidence, flags, and manual confirmation where required. It does not approve automatic BusinessDocument creation, BusinessDocumentItem creation, Maven/Invoice4U action, inventory deduction, DB writes, Prisma changes, customer sending, or production workflow changes.

Status:
Approved by Liad. Documentation only.

---

## 2026-06-24

Decision:
Define planned `EMAIL_DOCUMENT_INTAKE_AGENT`.

Purpose:
Create a governed future specialist agent for incoming customer email classification and evidence-packet creation. The agent works under `ORCHESTRATOR_AGENT` and must create an Evidence Packet before any business action.

Email classifications:

1. Purchase Order.
2. Request for Quote.
3. Customer approval.
4. Customer rejection / correction.
5. Reply related to existing quote.
6. Service request.
7. General customer message.

Required evidence packets:

- `EMAIL_INTAKE_EVIDENCE_PACKET`.
- `PO_MATCH_EVIDENCE_PACKET`.
- `RFQ_INTAKE_EVIDENCE_PACKET`.
- `CUSTOMER_REPLY_EVIDENCE_PACKET`.
- `DOCUMENT_CHAIN_MATCH_PACKET`.

Critical rules:
Email evidence is not approval by itself. PO match must not auto-create invoice. Customer reply must not auto-change quote. Attachments must be reviewed before use. If confidence is not `HIGH`, ask Liad. If amount/customer/quote mismatch exists, escalate. Urgent requests still follow approval gates.

Boundaries:
Documentation only. No code, Gmail access implementation, DB write, Prisma change, automation runtime, email send, invoice creation, BusinessDocument creation, BusinessDocumentItem creation, Maven/Invoice4U action, inventory action, Google Sheets/AppSheet/Apps Script/Drive change, or production workflow change.

Status:
Planned; not executable.

---

## 2026-06-24

Decision:
Promote compressor service commercial-line rule to all business documents.

Correction:
The prior commercial-line rule is global. It applies to all business documents, not only quotes or AI Draft previews.

Applies to:

- Quotes.
- Invoices.
- Proforma invoices.
- Delivery notes if relevant.
- Service draft documents.
- `BusinessDocuments`.
- `BusinessDocumentItems`.
- AI Draft outputs.
- Maven document drafts.
- Any future customer-facing document.

Approved rules:

1. `Technician Visit / Travel` is one commercial line. Do not generate both `Technician Visit` and `Travel` as separate lines.
2. `Labor + Service` is one commercial line. Do not split into `Labor` and `Service` unless Liad explicitly approves an exception.
3. Standard compressor service document structure is: Parts lines, Oil handling line if needed, Labor + Service, Technician Visit / Travel.
4. Do not double-charge travel, technician visit, labor, or service.
5. Every generated or suggested document line must show `INCLUDED`, `EXCLUDED`, or `NEEDS_APPROVAL`.
6. Historical bundled prices must explain whether they include parts only, parts + labor/service, or parts + labor/service + technician visit/travel.

Stored in:

- `project-brain/MANUFACTURER_KNOWLEDGE_BASE.md` as approved Liad knowledge.
- `AI_DRAFT_RUNTIME_BLUEPRINT.md` as the global runtime document-line rule.
- AI Draft, Service Pattern, Pricing Evidence, Maven Link, and Maven Agent docs as downstream constraints.

Boundary:
Documentation only. No code, DB, Prisma, Maven action, inventory action, import, BusinessDocument creation, BusinessDocumentItem creation, Apps Script change, Google Sheets change, or runtime workflow change.

Status:
Approved documentation rule.

---

## 2026-06-24

Decision:
Correct AI Draft commercial line structure for compressor service drafts.

Correction:
Technician Visit and Travel are the same commercial line. AI Draft must use one line only: `Technician Visit / Travel`. It must not generate separate `Technician Visit` and `Travel` lines.

Labor + Service is also one commercial line. AI Draft must use one line only: `Labor + Service`. It must not split this into separate `Labor` and `Service` lines unless Liad explicitly approves an exception.

Approved standard compressor service draft structure:

1. Parts lines.
2. Oil handling line if needed.
3. Labor + Service.
4. Technician Visit / Travel.

Required behavior:
Every line must be marked `INCLUDED`, `EXCLUDED`, or `NEEDS_APPROVAL`. Historical bundled kit price must explain whether it includes parts only, parts + labor/service, or parts + labor/service + technician visit/travel.

Safety rule:
Do not double-charge travel. Do not double-charge service/labor.

Boundary:
This is a documentation/reasoning-model correction only. It does not approve implementation, runtime creation, DB schema, APIs, Prisma changes, DB writes/imports, BusinessDocument creation, Maven/Invoice4U action, inventory action, Google Sheets/AppSheet/Apps Script changes, or production workflow changes.

Status:
Documentation correction.

---

## 2026-06-24

Decision:
Correct AI Draft recommendation reasoning model for compressor service work.

Bug:
The AI Draft recommendation preview included technical service parts but did not fully model the commercial service components.

Rule:
For compressor service work, AI Draft must evaluate commercial service lines. This decision is superseded by the later correction that `Technician Visit / Travel` is one line and `Labor + Service` is one line.

Required behavior:
Each component must be marked included, excluded, or approval-required. The recommendation must explain why each line is included or excluded, cite evidence, and keep approval flags visible. Commercial service lines must not be omitted just because they are not manufacturer parts. The superseding correction requires `Labor + Service` as one line and `Technician Visit / Travel` as one line.

Boundary:
This is a documentation/reasoning-model correction only. It does not approve implementation, runtime creation, DB schema, APIs, Prisma changes, DB writes/imports, BusinessDocument creation, Maven/Invoice4U action, inventory action, Google Sheets/AppSheet/Apps Script changes, or production workflow changes.

Status:
Documentation correction.

---

## 2026-06-24

Decision:
Add Action Server Knowledge Layer as a planned future roadmap item.

Priority:
After AI Draft Recommendation Readiness and before large-scale automation runtime.

Purpose:
Provide AI-facing knowledge packets instead of repeated direct Google Sheets/Maven reads. Google Sheets and Maven remain source/reference systems; the Action Server Knowledge Layer is planned as the AI-facing knowledge access layer.

Future packets:
Equipment Evidence, Service Pattern Evidence, Parts Compatibility Evidence, Manufacturer Evidence, Pricing Evidence, Customer Pricing Evidence, and AI Draft Readiness Evidence.

Benefits:
Lower token usage, lower API usage, faster reasoning, reusable knowledge packets, offline readiness, and consistent evidence.

Boundaries:
This decision does not approve implementation, runtime creation, DB schema, APIs, Prisma changes, DB writes/imports, Maven/Invoice4U action, Google Sheets/AppSheet/Apps Script changes, or production workflow changes.

Status:
Planned.

---

## 2026-06-24

Decision:
Approve Inventory Learning Loop documentation rules.

Rule:
Manufacturer part number is technical identity. Internal SKU is Tal inventory identity. One manufacturer part number may match multiple compressor models. One internal SKU may represent one manufacturer part number or an approved equivalent. Compatible models must be stored as evidence-backed mappings.

Learning sources:
The system may learn gradually from SCR spare-parts workbooks, foreign purchase orders, received stock, invoice history, Liad corrections, and approved service-kit evidence.

Inventory boundary:
Inventory quantity may only be updated from approved stock movement, approved purchase receipt, or approved inventory transaction. AI Draft, pricing evidence, service reports, recommendations, compatibility evidence, manufacturer SKU evidence, invoice history, and purchase orders alone must not update quantity or deduct stock.

AI Draft boundary:
AI Draft may suggest a part/SKU with evidence and approval flags, but cannot deduct stock. Stock deduction requires approved BusinessDocument/invoice workflow, confirmed SKU, confirmed quantity, audit evidence, and a separate inventory transaction gate.

Learning boundary:
Liad corrections must be stored as approved learning, not AI inference or historical guess.

Status:
Approved.

---

## 2026-06-24

Decision:
Approve AI Draft compressor service-line structure rule.

Rule:
For compressor service drafts, the equipment model must appear clearly in the draft title/header.

Reason:
The compressor model is the key that allows the system to connect service type, expected parts, manufacturer part numbers, future internal SKUs, historical pricing evidence, and inventory matching.

Standard service draft lines may include:
Oil Filter; Air Filter; Oil Separator + gaskets; Oil / oil replacement / oil top-up according to oil type and model evidence; Labor + service; Technician visit / travel.

Boundaries:
Always identify the compressor model first. Do not treat generic horsepower as model identity. Do not assign SKU without model evidence. Do not use manufacturer cost as customer price. Do not deduct inventory from AI Draft. Future internal SKU mapping will replace or extend manufacturer part numbers. Manufacturer part numbers are internal technical evidence. Customer price comes from Maven/history/pricing evidence, not spare-parts cost.

Status:
Approved.

---

## 2026-06-24

Decision:
Approve separation of model alias and parts compatibility for APM/PM2 manufacturer matching.

Rule:
`MODEL_ALIAS != PART_COMPATIBILITY`.

Approved identity aliases:
`10APM = 10PM2`.
`20APM = 20PM2`.

Boundary:
Alias model identity does not guarantee identical service kits or identical spare parts. Equipment Identity and Parts Compatibility are separate layers. Compatibility must be stored separately from alias mappings.

Known non-compatibility:
`20APM Oil Separator != 20PM2 Oil Separator`.

Approved compatibility exception:
`20APM Oil Separator = 30PM Oil Separator`.

AI Draft impact:
Approved alias `20APM <-> 20PM2` does not allow automatic oil separator matching. AI Draft must check explicit part compatibility evidence and set approval flags when compatibility is missing or exception-based.

Status:
Approved.

---

## 2026-06-24

Decision:
Approve manufacturer parts governance rules for using SCR spare-parts workbooks inside Tal Operating System.

Rules:
Manufacturer spare-parts workbooks are technical SKU/model evidence. Manufacturer workbook cost is internal cost evidence only, not customer selling price. Maven/Invoice history is customer price evidence. `ServiceReports` and `ReportEquipmentItems` are operational service evidence.

Shared SKU rule:
One manufacturer SKU may fit multiple compressor models. Shared SKU compatibility is valid shared-model evidence and is not a duplicate or conflict by itself.

Alias/model boundaries:
PM/APM alias family requires approved alias governance, not automatic merge. If model identity is generic or low-confidence, AI Draft must not auto-assign a SKU and must set `NeedsSkuApproval = true`. `SCR20EPM` cannot infer EPM workbook SKU compatibility if the manufacturer workbook coverage starts at `25EPM`. Belt recommendations remain historical-only unless another approved manufacturer source exists.

Inventory boundary:
No inventory deduction is allowed from AI Draft, pricing evidence, service report, manufacturer SKU registry evidence, or recommendation. Inventory deduction is allowed only after approved BusinessDocument/invoice workflow, confirmed SKU, confirmed quantity, audit evidence, and a separate inventory transaction gate.

Status:
Approved.

---

## 2026-06-24

Decision:
Approve service pattern rules for AI Draft evidence.

Rule:
Large Service Rule: `4000h` / `5000h` service = Large Service. Large Service always includes Air Filter, Oil Filter, Oil Separator, and Oil.

Small Service Rule: `2000h` / `2500h` service = Small Service. Small Service always includes Air Filter, Oil Filter, and Oil handling.

Oil handling note:
For SCR compressors this is often oil top-up / added oil. For ALUP or other compressor models it may be oil replacement. Do not assume the oil action type automatically without model/service evidence.

Boundaries:
These are service pattern rules only. They help AI Draft recommend expected service lines. They do not approve pricing, inventory deduction, BusinessDocument creation, Maven/Invoice4U action, or any write workflow. Any generated draft must still show evidence and `NeedsApproval` where required.

Status:
Approved.

---

## 2026-06-24

Decision:
Correct the canonical project completion estimate from 60% to 56%.

Reason:
`project-brain/FULL_PROJECT_DISCOVERY_AUDIT.md` found that the recorded capability contributions add to 56%, not 60%. The current formula is Governance / Project Brain / Git workflow 15%, Supabase + Prisma Data Layer 15%, Import Framework + Wave 1 Import 10%, Wave 1 Service Reports UI 10%, Wave 2 Workflow Layer 6%, and all remaining pending capabilities 0%, totaling 56%. No evidence-based formula currently justifies raising Wave 2 from 6% to 10%, so the conservative correction is 56%.

Status:
Approved.

---

## 2026-06-23

Decision:
SCR matching intelligence may be surfaced as a read-only preview panel on the Service Report detail work screen.

Reason:
The preview uses existing ServiceReport and ReportEquipmentItem reads plus prior SCR analysis reports only. It does not create AI Drafts, create BusinessDocuments, write/import database rows, change schema, run migrations, touch env files, or call Maven/Invoice4U. Price-bearing part lines remain `needsPriceApproval = true` because staging Product/Maven/BusinessDocument item history has no usable selling prices.

Status:
Approved.

---

## 2026-06-23

Decision:
AutomationCommands may have a read-only empty-state shell before DB import/write approval.

Reason:
The `AutomationCommand` Prisma model already exists and the staging table currently has zero rows. A shell that reads only existing command rows, shows command status/type, source-object and external-target placeholders, retry/error placeholders, and lifecycle states does not execute commands, write to the database, change schema, run migrations, or touch Maven, Invoice4U, email, source systems, or production.

Status:
Approved.

---

## 2026-06-23

Decision:
No next implementation task is currently approved after the read-only shell progress.

Reason:
The previous closeout incorrectly made the Wave 2 import blocker-resolution approval package read as the approved next task. Current state is corrected: read-only shells are progressing, DB import/write work remains gated and requires explicit human approval, and the next candidate tasks are AutomationCommands read-only shell, Maven/Invoice4U lifecycle tracking shell, and optional Wave 2 import approval package only if explicitly approved.

Status:
Approved.

---

## 2026-06-23

Decision:
`71a5435 Enhance service report work screen` is classified as the Last Implementation Commit.

Reason:
The commit enhanced the existing populated `/service-reports/[id]` read-only route as the central work screen. It reused `Customer`, `ServiceReport`, and `ReportEquipmentItem` data only, added customer summary, equipment summary, disabled future action buttons, lifecycle placeholders, and links to customer/equipment details. Validation used scoped TypeScript, `git diff --check`, local route checks, and HTML content checks for the requested labels/placeholders. No schema changes, migrations, env changes, DB writes, imports, source-system changes, or production actions occurred.

Status:
Approved.

---

## 2026-06-23

Decision:
BusinessDocuments may have a read-only empty-state draft shell before Wave 2 import approval.

Reason:
The `BusinessDocument`, `BusinessDocumentItem`, and `BusinessDocumentLog` Prisma models already exist and the staging tables currently have zero rows. A shell that reads only existing rows, shows an empty state, and prepares approval/Maven/customer lifecycle placeholders does not import data, write to the database, change schema, or touch Maven/Invoice4U/source systems.

Status:
Approved.

---

## 2026-06-23

Decision:
No code fix is required for the AI Draft runtime error observed in the sandbox.

Reason:
The runtime failure was reproduced only inside the network sandbox, where Prisma cannot reach the Supabase pooler at `aws-1-eu-central-1.pooler.supabase.com:6543`. The same `/ai-drafts` route returned HTTP 200 outside the sandbox, so the root cause is the known sandbox Prisma connectivity limitation rather than an AI Draft module code or schema issue. The full build remains separately blocked by the existing missing `playwright` dependency/type declarations in `scripts/playwright/appsheet-discovery-auth.ts`.

Status:
Approved.

---

## 2026-06-23

Decision:
AI Draft Suggestions may have a read-only empty-state shell before Wave 2 import approval.

Reason:
The `AiDraftSuggestion` Prisma model already exists and the staging table currently has zero rows. A shell that reads only existing rows, shows an empty state, and prepares approval/Maven lifecycle placeholders does not import data, write to the database, change schema, or touch source systems.

Status:
Approved.

---

## 2026-06-23

Decision:
After the Service Reports list context enhancement, the next safe task is a Wave 2 import blocker-resolution approval package.

Reason:
The populated read-only Customer, Equipment, and Service Report navigation/work-screen/list surfaces are now implemented. The next meaningful progress point is to convert existing Wave 2 dry-run blockers into explicit decisions before any staging import can be approved. This remains documentation/read-only analysis until Liad explicitly approves imports or DB writes.

Status:
Approved.

---

## 2026-06-23

Decision:
Dashboard route map remains unchanged for bidirectional module navigation.

Reason:
The task added and clarified links among existing populated read-only routes only. No new Next.js route, AppSheet equivalent, data source, or record count changed, so `APPLICATION_ROUTE_MAP.md` and dashboard route inventory do not require a content change.

Status:
Approved.

---

## 2026-06-23

Decision:
After the data coverage audit, ProductsCatalog should not be the next data-backed read-only module until `Product` rows exist in staging.

Reason:
Read-only Prisma counts in `DATA_COVERAGE_AUDIT.md` show the only populated audited models are `Customer = 763`, `ServiceReport = 63`, and `ReportEquipmentItem = 75`; all three already have read-only modules. `Product = 0` and `PartUsed = 0`; other workflow, Maven, automation, sync, and log tables are empty/not ready. The safest next implementation is an enhancement to already populated read-only modules, or explicit approval for an import/population step before building data-heavy modules around empty tables.

Status:
Approved.

---

## 2026-06-23

Decision:
`14542b5 Add PartsUsed read-only module` is classified as the Last Implementation Commit.

Reason:
The commit added a read-only PartsUsed module using the existing Prisma `PartUsed` model and existing Next.js Server Component architecture. It created `/parts-used`, `/parts-used/[id]`, a read-only adapter, search/filter handling, service-report links, product context, invalid enum filter hardening, and an active dashboard card. Validation used scoped TypeScript, `git diff --check`, read-only Prisma count validation showing `parts_used = 0`, and local HTTP checks for `/`, `/parts-used`, `/parts-used?matchSource=BAD_VALUE`, `/parts-used/not-a-real-part`, `/service-reports`, `/equipment`, and `/customers`. No schema changes, migrations, env changes, DB writes, imports, source-system changes, or production actions occurred.

Status:
Approved.

---

## 2026-06-23

Decision:
Supabase staging connectivity blocker is resolved, and the current task is now the PartsUsed read-only module.

Reason:
Real read-only Prisma connectivity has already passed outside the network sandbox, including `customer.count() = 763`, and `npx.cmd prisma db pull --print` exited `0`. The earlier `P1001` condition is classified as a sandbox/runtime network limitation rather than a Supabase, project, or env issue. The approved next safe implementation task is a read-only PartsUsed module. This does not approve imports, DB writes, schema changes, migrations, env changes, source-system changes, Maven actions, AppSheet changes, or production actions.

Status:
Approved.

---

## 2026-06-23

Decision:
`3f1761f Add equipment read-only module` is classified as the Last Implementation Commit.

Reason:
The commit added a read-only ReportEquipmentItems / Equipment module using the existing Prisma `ReportEquipmentItem` model and existing Next.js Server Component architecture. It created `/equipment`, `/equipment/[id]`, a read-only adapter, search/filter handling, service-report links, and an active dashboard card. Validation used scoped TypeScript, `git diff --check`, a read-only Prisma lookup for known equipment `3002f879`, and local HTTP checks for `/`, `/equipment`, `/equipment/3002f879`, `/service-reports`, `/service-reports/5e0eaae3`, and `/customers`. No schema changes, migrations, env changes, DB writes, imports, source-system changes, or production actions occurred.

Status:
Approved.

---

## 2026-06-23

Decision:
`28f9bf2 Add multi-agent operating workflow` is classified as the Last Implementation Commit. The Project Brain multi-agent operating workflow is approved as a governance/documentation workflow.

Reason:
The commit created the requested Project Brain workflow roles: Builder, Map Guard, QA, Reviewer, Agent Communication Protocol, and Autonomous Build Workflow. It also updated `AGENTS.md`, `PROJECT_OPERATING_PROTOCOL.md`, and `PROJECT_INDEX.md` so Codex uses the workflow while preserving the existing active specialist agents under `agents/AGENT_REGISTRY.md`. Validation used `git diff --check`, which passed with CRLF warnings only. No app code, schema, migrations, env files, DB writes/imports, source-system changes, deletes/moves, git remote changes, or production integrations occurred.

Status:
Approved.

---

## 2026-06-23

Decision:
`4ed6ca2 Require automatic project brain closeout sync` is classified as the Last Implementation Commit. Codex must automatically sync Project Brain before the final report after every completed task.

Reason:
Session closeout must not leave completed work only in chat. The mandatory sync records what was completed, commit hash, validation results, current blocker or `none`, exact next task, approval gates, and project completion percentage in `project-brain/CURRENT_TASK.md`, `project-brain/TASK_BOARD.md`, `project-brain/DECISION_LOG.md` when decisions changed, and `PROJECT_INDEX.md` when status or structure changed. If validation proves a blocker resolved, it must be removed from current blocker state and final responses must not call it blocked.

Status:
Approved.

---

## 2026-06-23

Decision:
`45da4d0 Implement customers read-only module` is classified as the Last Implementation Commit.

Reason:
The commit added read-only Next.js Customers list/detail pages, a Customer Prisma adapter, search/filter handling, service-report links, future relation counts, and an active dashboard card. Validation used scoped TypeScript and read-only local HTTP route checks. It changed read-only app behavior only and did not change schema, migrations, env files, DB data, AppSheet, Maven, Apps Script, or production systems.

Status:
Approved.

---

## 2026-06-23

Decision:
Staging Prisma connectivity is resolved for diagnosis purposes; earlier `P1001` was a sandbox/runtime network limitation.

Reason:
A real read-only Prisma test outside the network sandbox succeeded with `customer.count() = 763`, and `npx.cmd prisma db pull --print` exited `0`. No DB writes or migrations were run.

Status:
Approved.

---

## 2026-06-23

Decision:
Staging Supabase Project ID is `mdlvxklufrchiabonafm`; local `.env.staging` matches that verified project id, and remaining Prisma failure is `P1001` connectivity, not wrong project id.

Reason:
The Supabase Project ID was verified visually from Supabase Project Settings. Earlier Project Brain references to a different staging ref were stale. Prisma CLI loads `.env` by default, not `.env.staging`; local Prisma validation must either create a temporary `.env` from `.env.staging` or explicitly load the staging env. After temporary `.env` creation, Prisma schema validation passed and Prisma moved to `P1001` connectivity against the Supabase pooler.

Status:
Approved.

---

## 2026-06-23

Decision:
The nested Git repository is the only active source of truth for this project.

Reason:
The parent folder `C:\Users\משתמש\Desktop\TalCompressors-ServiceReports-AI` contains stale duplicate Next.js files outside Git. VS Code and Codex must open the nested repository root only: `C:\Users\משתמש\Desktop\TalCompressors-ServiceReports-AI\TalCompressors-ServiceReports-AI`. No cleanup or deletion is approved yet. The parent duplicate should be quarantined later only after explicit approval.

Status:
Approved.

---

## 2026-06-22

Decision:
Wave 2 service workflow planning/discovery is approved.

Reason:
Wave 1 staging import, PostgreSQL read switch, and read/display mapping validation have passed. The next safe step is planning/discovery for Wave 2 service workflow data only: source export list, schema blockers, parent-link checks, enum/status mapping needs, dry-run report format, and next approval gate. This approval does not permit Wave 2 source export, dry-run execution, import, DB writes, schema changes, Maven actions, AppSheet changes, Google Sheets mutations, Apps Script changes, production shadow setup, or production cutover.

Status:
Approved for planning/discovery only.

---

## 2026-06-22

Decision:
`7f63193 Require project tree reporting` is classified as the Last Implementation Commit.

Reason:
The commit changed governance behavior by making Project Tree Position mandatory for every Reality Check, Approval Gate, Autonomous Completion Report, and `by codex` closeout. It also made Proof Requirement and Project Tree Position jointly mandatory for task completion. It is an implementation/governance commit, not closeout metadata. Last Closeout Commit remains `8114210 Sync project brain commit model state`.

Status:
Approved.

---

## 2026-06-22

Decision:
`fd76610 Fix Wave 1 service report display mapping` is classified as the Last Implementation Commit.

Reason:
The commit changed read-only Next.js Wave 1 service-report display behavior by deriving service dates from `raw_source` when `service_date` is null, mapping pending-signature source status to `Pending Signature`, replacing UI `UNKNOWN` status with `Status Missing` for missing source statuses, and adding sparse equipment display fallbacks. Validation used read-only staging queries and temporary read-only HTTP checks. It is an implementation/read-display commit, not closeout metadata. Last Closeout Commit remains `8114210 Sync project brain commit model state`.

Status:
Approved.

---

## 2026-06-22

Decision:
`a28da7b Create autonomous agent orchestration governance` is classified as the Last Implementation Commit.

Reason:
The commit changed project governance behavior by making Codex the main Orchestrator for safe scoped work, requiring task routing to existing agent owners, allowing AUTO_ALLOWED work to continue through validation and Project Brain update, and stopping only at APPROVAL_REQUIRED gates. It is an implementation/governance commit, not closeout metadata. Last Closeout Commit remains `8114210 Sync project brain commit model state`.

Status:
Approved.

---

## 2026-06-22

Decision:
`29331fb Read Wave 1 service reports from PostgreSQL` is classified as the Last Implementation Commit.

Reason:
The commit changed Next.js service report list/detail behavior from local snapshot JSON to read-only PostgreSQL staging reads for Wave 1 data. Post-import review passed with `/service-reports` HTTP 200, `/service-reports/acd1133d` HTTP 200, 63 service report links rendered, and counts `customers = 763`, `service_reports = 63`, `report_equipment_items = 75`. Display issues remain: all 63 `service_date` values are null so dates are missing, source status `ממתין חתימה` displays as `UNKNOWN`, and some equipment fields are sparse. It is an implementation commit, not closeout metadata. Last Closeout Commit remains `8114210 Sync project brain commit model state`.

Status:
Approved.

---

## 2026-06-22

Decision:
`3abf7d3 Record Wave 1 staging import pass` is classified as the Last Implementation Commit.

Reason:
The commit added the approved Wave 1 staging import script and recorded Wave 1 PostgreSQL staging validation PASS with `customers = 763`, `service_reports = 63`, `report_equipment_items = 75`, and 34 excluded legacy/test `ReportEquipmentItems` rows. It is an implementation/import commit, not closeout metadata. Last Closeout Commit remains `8114210 Sync project brain commit model state`.

Status:
Approved.

---

## 2026-06-22

Decision:
`9efa017 Refactor import planning and update Wave 1 baseline` is classified as the Last Implementation Commit.

Reason:
The commit changed approved migration planning by converting Import Waves into structured agent-readable `WAVE_ID` blocks, adding owner/blocker/success criteria fields for future automation, and updating Wave 1 baseline counts to `Customers_Final = 763`, `ServiceReports = 63`, and `ReportEquipmentItems = 109` after read-only export validation found legitimate new business data. It is an implementation/planning commit, not closeout metadata. Last Closeout Commit remains `8114210 Sync project brain commit model state`.

Status:
Approved.

---

## 2026-06-22

Decision:
`c11c460 Document import waves plan` is classified as the Last Implementation Commit.

Reason:
The commit changed approved migration planning by defining Import Waves 1-4, preserving Wave 1 as the service-report core gate, and recording that Wave 1 is required before Next.js can replace AppSheet for service reports. It is an implementation/planning commit, not closeout metadata. Last Closeout Commit remains `8114210 Sync project brain commit model state`.

Status:
Approved.

---

## 2026-06-22

Decision:
`b6b709b Reclassify ReportEquipmentItems exclusions` is classified as the Last Implementation Commit.

Reason:
The commit changed approved migration planning language and import classification for known excluded `ReportEquipmentItems` rows. The 9 rows missing `ReportID` and 25 rows with unmatched `ReportID` are historical test data, not business data, require no recovery, and are excluded by design. It is an implementation/planning commit, not closeout metadata. Last Closeout Commit remains `8114210 Sync project brain commit model state`.

Status:
Approved.

---

## 2026-06-22

Decision:
`9a81290 Reconcile Prisma schema for Supabase staging` is classified as the Last Implementation Commit.

Reason:
The commit changed executable Prisma schema by adding Supabase staging `DIRECT_URL` support and the approved `ReportEquipmentItem.reportCounter` field/index. It is an implementation/schema commit, not closeout metadata. Last Closeout Commit remains `8114210 Sync project brain commit model state`.

Status:
Approved.

---

## 2026-06-22

Decision:
`fc1dfa8 Prepare Supabase staging env placeholders` is classified as the Last Implementation Commit.

Reason:
The commit changed repository setup by adding staging env placeholders and secret ignore rules. It is an implementation/setup commit, not closeout metadata. Last Closeout Commit remains `8114210 Sync project brain commit model state`.

Status:
Approved.

---

## 2026-06-22

Decision:
Real Supabase staging secret values must remain outside git; repository may contain env example placeholders with names only.

Reason:
The staging gate needs `DATABASE_URL`, `DIRECT_URL`, and `NEXT_PUBLIC_APP_ENV`, but secret values must not be committed. `.env.staging.example` may document names only, and `.gitignore` must block real `.env` files while allowing example files.

Status:
Approved.

---

## 2026-06-22

Decision:
`d1d6f88 Document Supabase staging-first shadow plan` is classified as the Last Implementation Commit.

Reason:
The commit changed approved project governance and migration planning by making Supabase Staging the first shadow target and Supabase Production Shadow the second target after staging validation. It is an implementation/governance commit, not closeout metadata. Last Closeout Commit remains `8114210 Sync project brain commit model state`.

Status:
Approved.

---

## 2026-06-22

Decision:
Use Supabase Staging first, then Supabase Production Shadow. Do not use local PostgreSQL as the first target.

Reason:
The approved shadow environment path should validate the real hosted deployment target before production shadow setup. Staging project `talcompressors-next-staging` is first; production shadow project `talcompressors-next-prod` follows only after staging validation passes. Required env variable names are `DATABASE_URL`, `DIRECT_URL`, and `NEXT_PUBLIC_APP_ENV`; optional future Supabase env names are `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY`. Before any DB push, Prisma must reconcile `DIRECT_URL` and `ReportEquipmentItem.reportCounter`.

Status:
Approved.

---

## 2026-06-22

Decision:
`2963977 Add master map and agent routing` is classified as the Last Implementation Commit.

Reason:
The commit changed project governance/routing behavior by adding the master project map and routing future work to existing owner agents. It is an implementation/governance commit, not closeout metadata. Last Closeout Commit remains `8114210 Sync project brain commit model state`.

Status:
Approved.

---

## 2026-05-25

Decision:
Use AutomationCommands queue architecture.

Reason:
Avoid duplicate AppSheet Bot runs and row update conflicts.

Status:
Approved.

---

## 2026-06-08

Decision:
Apps Script is the main execution and validation layer.

Reason:
AppSheet should be UI/approval layer, not complex backend logic.

Status:
Approved.

---

## 2026-06-08

Decision:
Git + VS Code + Codex CLI are the primary development workflow.

Reason:
Need source control, rollback, traceability, and repeatable project memory.

Status:
Approved.

---

## 2026-06-09

Decision:
Create PROJECT_OPERATING_PROTOCOL.

Reason:
Codex must not start coding before reading project state, rules, flowchart, changelog, and git status.

Status:
Approved.

---

## 2026-06-09

Decision:
Create System Health Check concept.

Reason:
Regression discovered: report 5852 was signed and numbered but SignedHtmlFileUrl was not created automatically.

Status:
Approved for planning.

---

## 2026-06-22

Decision:
`PROJECT_INDEX.md` is the mandatory startup entrypoint for every Codex/ChatGPT project session.

Reason:
The project already has multiple startup, status, and Project Brain files. A single enforced entrypoint prevents future sessions from starting from stale state.

Status:
Approved.

---

## 2026-06-22

Decision:
`315b8cc Fix reality check commit model` is classified as the Last Implementation Commit.

Reason:
The commit changed governance behavior by introducing the two-commit Reality Check model. It is an implementation/governance commit, not closeout metadata. Last Closeout Commit remains `653f370 Sync project brain after reality check hardening`.

Status:
Approved.

---

## 2026-06-22

Decision:
`hey codex` must sync from GitHub before reading Project Brain when the working tree is clean, and Project Reality Check must compare live Git against Project Brain recorded commits.

Reason:
New sessions must start from the latest GitHub state instead of stale local Project Brain files. Commit mismatches must be visible before implementation, and closeout must sync canonical Project Brain state.

Status:
Approved.

---

## 2026-06-22

Decision:
`hey codex` is the official startup command and `by codex` is the official shutdown command.

Reason:
Startup and closeout need repeatable automation. Startup must begin from `PROJECT_INDEX.md`, and shutdown must run Project Reality Check, Git review, canonical state updates when needed, approved-file commit, push to `origin/main`, clean status confirmation, and the next startup point.

Status:
Approved.

---

## 2026-06-22

Decision:
Project Brain files win over ChatGPT/Codex memory when they conflict.

Reason:
Model memory can be stale, incomplete, or from a different phase. Project Brain files are the repository-owned source of project reality.

Status:
Approved.

---

## 2026-06-22

Decision:
Before creating any new planning file, map, dashboard, control center, protocol, agent, or roadmap, Codex must search existing files and prove no existing file already serves that purpose.

Reason:
The repo already contains governance, startup, status, roadmap, map, migration, and agent files. New planning/control files increase fragmentation unless an existing owner cannot serve the need.

Status:
Approved.

---

## 2026-06-22

Decision:
`project-brain/CURRENT_TASK.md` is the canonical current task, current phase, and next task file.

Reason:
The older `project-brain/current/CURRENT_TASK.md` is stale and has been retired as a compatibility stub.

Status:
Approved.

---

## 2026-06-22

Decision:
`PROJECT_INDEX.md` is the navigation and status map, not a giant source file.

Reason:
The index should show Project Reality Check and link to canonical owner files without duplicating full content from current task, task board, decisions, maps, migration scope, Prisma schema, or protocol.

Status:
Approved.

---

## 2026-06-25

Decision:
BusinessDocument internal approval/rejection workflow is implemented only through protected Next.js Server Actions on `/business-documents/[id]`.

Reason:
The internal BusinessDocument draft needs an auditable approval state before any Maven/Invoice4U or customer-facing action. Approval requires the exact phrase `APPROVE BUSINESS DOCUMENT`; unresolved pricing or quantity issues block approval unless an explicit override checkbox is selected. Return-to-review requires a reason. These actions may update only internal `BusinessDocument` status/approval fields and create `BusinessDocumentLog` audit rows.

Boundaries:
No Maven/Invoice4U call, no automatic AutomationCommand creation, no email/customer-facing action, no inventory deduction, no schema/env/migration change, no import, no source-system action, and no production action.

Status:
Approved and implemented in commit `b475f13 Add business document approval workflow`.

---

## 2026-06-25

Decision:
Legacy `CREATE_MAVEN_DRAFT` execution adapter is implemented first as a Next.js dry-run Server Action on `/automation-commands/[id]`.

Reason:
The project needs to validate the Maven document-generation payload shape and internal BusinessDocument draft readiness before any real Maven/Invoice4U execution. The dry-run reads the existing AutomationCommand payload, validates that the linked BusinessDocument is `APPROVED`, validates customer/document/line item readiness, stores what would be sent to Maven for document output, and preserves idempotency evidence without marking the command externally completed. `CREATE_MAVEN_DRAFT` is retained only as a Wave 2 legacy/internal compatibility name.

Boundaries:
No real Maven/Invoice4U call, no external document creation, no email/customer-facing action, no inventory action, no command execution completion, no schema/env/migration change, no import, no source-system action, and no production action. Dry-run state is recorded only on the internal `AutomationCommand`.

Status:
Approved and implemented in commit `1ff28a3 Add Maven draft dry-run adapter`; terminology corrected after implementation without renaming existing code or staging IDs.

---

## 2026-06-25

Decision:
BusinessDocument line blocker correction is implemented as an internal-only line resolution layer on `/business-documents/[id]`.

Reason:
Maven dry-run validation can identify line blockers, but users need a protected way to correct only the internal draft fields that are required before Maven readiness: quantity, unit price, pricing evidence, and approval-required state. Each correction must preserve audit history and must not imply Maven execution.

Boundaries:
Line resolution may update only `BusinessDocumentItem` quantity, unit price, total price, pricing evidence in `rawSource`, the item approval-required flag, and `BusinessDocumentLog`. It does not call Maven/Invoice4U, execute AutomationCommands, create external documents, send email, affect inventory, change schema/env, import data, touch source systems, or perform production actions. Maven dry-run is not re-run by line saves; it remains a separate explicit action.

Status:
Approved and implemented in commit `8538455 Add business document line resolution layer`.

---

## 2026-06-25

Decision:
Wave 2 Service Workflow Layer is complete, and real Maven execution is the next explicit approval gate.

Reason:
ServiceReport `5806` completed the full internal Wave 2 chain: AI Draft Preview, trusted pricing evidence display, protected internal BusinessDocument draft creation, BusinessDocument review and approval, protected Maven document-generation AutomationCommand creation, AutomationCommand queue/detail review, Maven dry-run, protected line resolution, and final Maven dry-run validation. The active command `NEXT-MAVEN-CMD-NEXT-AI-DRAFT-5806` is `PENDING` with `DRY_RUN_VALIDATED`, blocker count `0`, no warnings, `processedAt=null`, `completedAt=null`, and `externalStateChanged=false`.

Boundaries:
Wave 2 closeout does not approve real Maven/Invoice4U execution, AutomationCommand execution, external document creation, email/customer-facing action, inventory deduction, production action, schema/env/migration change, import, or source-system action. Real Maven execution requires a separate explicit Liad approval after the Maven Execution Readiness Checklist in `project-brain/CURRENT_TASK.md` is satisfied.

Status:
Approved as documentation/state closeout only. Wave 2 is complete at `15% / 15%`; project completion remains `65%`.

---

## 2026-06-25

Decision:
Wave 2 Architecture Audit is complete, and Wave 3 may start only as read-only Maven data discovery/import planning unless Liad separately approves real Maven execution.

Reason:
The audit reviewed every completed Wave 2 runtime against the original migration plan and current approved runtime scope. The ServiceReport `5806` chain is safe for its approved staging scope: internal writes use Server Actions, adapters mostly remain read/display boundaries, routes are consistent, BusinessDocument owns internal review/approval/line resolution, and AutomationCommand owns queue/dry-run review without external execution. The audit also found technical debt that should be resolved before broad rollout or real execution: report-5806-specific AI Draft logic, inline pricing evidence selection, duplicated UUID/JSON/decimal/blocker helpers, hard-coded phrases/default operator/fixed values, implicit JSON evidence contracts, and inline Maven dry-run validation/payload building.

Boundaries:
The audit changed Project Brain documentation only. No runtime behavior changed, no DB writes occurred, no Maven/Invoice4U action occurred, no AutomationCommand execution occurred, no email/customer-facing action occurred, no inventory action occurred, no schema/env/migration/import/source-system/production action occurred, and no new governance document was created.

Status:
Approved as documentation-only audit. Safe to start Wave 3 read-only discovery/import planning; real Maven execution remains `APPROVAL_REQUIRED`.

---

## 2026-06-25

Decision:
Wave 3 Maven Knowledge Layer starts as read-only discovery and payload mapping only.

Reason:
Wave 2 produced a validated internal BusinessDocument draft and pending legacy `CREATE_MAVEN_DRAFT` AutomationCommand with a dry-run payload, but real Maven execution still lacks primary evidence for the actual Maven document-generation API contract. Current checked Apps Script evidence shows `createMavenDraft(data)` logging the webhook payload and updating `BusinessDocuments` / `AutomationCommands` sheet status, but it does not prove a real external Maven document-generation request. Wave 3 must therefore first map the current BusinessDocument-to-Maven output payload, required Maven fields, source history tables, missing customer/document/item/tax/duplicate rules, and extraction plan for a reusable payload builder before any execution adapter is considered.

Boundaries:
Wave 2 is frozen except bug fixes. This Wave 3 start changed Project Brain documentation only. No runtime behavior changed, no DB writes occurred, no Maven/Invoice4U action occurred, no AutomationCommand execution occurred, no email/customer-facing action occurred, no inventory action occurred, no schema/env/migration/import/source-system/production action occurred, and no new standalone governance document was created.

Status:
Approved as read-only Wave 3 start. Real Maven execution remains `APPROVAL_REQUIRED`.

---

## 2026-06-25

Decision:
The Maven dry-run payload builder and validator are extracted into a reusable internal module.

Reason:
Wave 3 needs one canonical internal path for Maven document-generation payload validation before any real executor can be considered. The previous dry-run Server Action mixed phrase gating, command lookup, blocker validation, payload construction, persistence, revalidation, and redirects. The extracted module preserves the same blocker/warning logic and payload shape while allowing future dry-run, review, and approved execution code to reuse the same validation/building foundation.

Boundaries:
No real Maven/Invoice4U call, no external execution, no DB write during implementation/validation, no email/customer-facing action, no inventory action, no schema/env/migration/import/source-system/production action. The existing dry-run route behavior is intended to remain identical; only internal code organization changed.

Status:
Approved and implemented as Wave 3 internal refactor. Real Maven execution remains `APPROVAL_REQUIRED`.

---

## 2026-06-28

Decision:
TDOS is integrated into `PROJECT_OPERATING_PROTOCOL.md` as a risk-based operating model, not as a standalone constitution or duplicate governance layer.

Reason:
The project needs a long-term Development Operating System that can coordinate future projects and multiple AI implementation engines without forcing every task through the same heavyweight ceremony. Risk-based controls preserve architecture, business logic, source of truth, synchronization, validation, safety, and maintainability while keeping safe work autonomous.

Boundaries:
This decision changes documentation/governance only. `PROJECT_OPERATING_PROTOCOL.md` remains the highest authority. `hey codex` and `by codex` remain the startup and closeout commands. No standalone TDOS constitution, new governance file, new agent, runtime code change, DB write, schema change, package install, cloud change, Maven/Invoice4U action, email/customer-facing action, inventory action, import, source-system change, or production action is approved by this decision.

Status:
Approved by user request and implemented in commit `7dc51f9 Integrate TDOS risk operating model` as a protocol extension. TDOS task risk classes are `READ_ONLY_DISCOVERY`, `DOC_SYNC`, `SAFE_LOCAL_IMPLEMENTATION`, `SCHEMA_OR_DATA_CHANGE`, `EXTERNAL_SYSTEM_CHANGE`, `PRODUCTION_CHANGE`, and `ARCHITECTURE_CHANGE`. No required control for the task's risk class may be skipped.

---

## 2026-06-28

Decision:
The Universal Business Document Engine foundation is implemented as an internal configuration and view-model boundary without schema changes.

Reason:
Commercial document families should share one runtime instead of duplicating quote, invoice, receipt, purchase order, delivery note, and future custom document logic. The safe first step is to introduce `DocumentTypeConfig` and `BusinessDocumentViewModel` around the existing `BusinessDocument` source of truth, then let preview/PDF consume the view model while preserving current behavior.

Boundaries:
This implementation does not change Prisma schema, persisted data, document status, approval rules, PDF generation path, Maven/Invoice4U behavior, external APIs, customer send, inventory logic, package dependencies, source systems, or production. PDF still renders the existing preview route. BusinessDocument remains the internal source of truth. BusinessDocument `NEXT-AI-DRAFT-5806` / ServiceReport `5806` is used only as regression validation evidence and is not an architecture dependency.

Status:
Implemented as `SAFE_LOCAL_IMPLEMENTATION`. Validation passed for focused TypeScript on touched files, `/business-documents/NEXT-AI-DRAFT-5806`, `/business-documents/NEXT-AI-DRAFT-5806/preview`, and `/business-documents/NEXT-AI-DRAFT-5806/pdf`. Totals remained `1885.00 ILS`, `320.45 ILS`, and `2205.45 ILS`; preview did not expose manufacturer SKU `901165`; PDF returned valid `%PDF`.

---

## 2026-06-28

Decision:
Payment and receipt intake architecture must be the Financial Intake Engine, not a narrow PaymentEvidence design.

Reason:
Payment workflows will receive proof from checks, bank transfers, screenshots, PDFs, CSV/Excel exports, emails, future WhatsApp attachments, future bank APIs, and manual reconciliation. Treating payment handling as manual entry or check-image intake only would lose audit evidence and increase duplicate/incorrect receipt risk. The architecture must preserve original evidence, separate untrusted extraction suggestions from approved final data, match evidence to customers/documents/open balances, and require human approval before any Receipt or Tax Invoice / Receipt is created.

Design:
The durable flow is `Financial Intake Engine -> FinancialEvidence -> Extraction Draft -> Matching Engine -> Payment Suggestion -> User Approval -> Receipt / Tax Invoice Receipt creation later`. `FinancialEvidence` is the generic future evidence object/concept. `PaymentEvidence` may remain only as a subtype or legacy wording when evidence specifically supports payment/receipt decisions. Evidence source types include `CHECK_IMAGE`, `BANK_TRANSFER_PROOF`, `BANK_EXPORT`, `BANK_SCREENSHOT`, `PDF_PROOF`, `EMAIL_PROOF`, `MANUAL_ENTRY`, and `FUTURE_BANK_API`. Extraction must cover amount, currency, date, payer name, bank, branch/account when available, check number when relevant, transfer reference / asmachta, raw extracted text, confidence, and attachment ID. Matching must cover Customer match, BusinessDocument match, open-balance match, partial-payment match, and duplicate detection. OCR/AI extraction is suggestion-only and must not become trusted payment data without user review.

Boundary:
Architecture/design documentation only in `project-brain/DOCUMENT_ENGINE.md`. No runtime code change, Prisma schema change, DB write, package install, OCR implementation, bank API, external API, Maven/Invoice4U action, customer-facing action, inventory action, cloud change, source-system action, or production action occurred.

Status:
Added to the reusable Document Engine Knowledge Base. Future implementation requires separate approval for schema, attachment storage, privacy/retention, OCR/file/email/bank import adapters, matching workflow, payment suggestion workflow, receipt creation, and any external write.
