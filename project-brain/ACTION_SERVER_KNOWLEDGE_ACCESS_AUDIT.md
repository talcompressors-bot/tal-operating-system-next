# Action Server Knowledge Access Audit

Date: 2026-06-24
Mode: audit only
Runtime impact: none

No implementation, DB write, Prisma change, import, Maven action, Google Sheets write, Apps Script change, runtime workflow change, BusinessDocument creation, inventory action, or production action was performed.

## 1. Executive Answer

Does Action Server already exist in the project?

**No, not as a named or implemented runtime layer.**

The project does not currently contain an `Action Server` / `ActionServer` component, directory, service, registry, or explicit AI-facing knowledge access layer.

What does exist:

- A canonical architecture rule that future internal Next.js write flows must use Server Actions.
- Read-only Next.js route adapters that query Prisma directly for current UI screens.
- Project Brain intelligence specs and evidence packets for AI Draft, pricing evidence, parts/SKU evidence, equipment identity, service patterns, Maven linkage, and inventory evidence.
- Verified Google Sheets/Maven commercial data availability through previous read-only audits.
- A roadmap dependency for Wave 3 Maven Knowledge Layer and future knowledge graph work.

Current reality:

The project has the **ingredients** for an Action Server / knowledge access layer, but not the implemented layer itself.

Recommended interpretation:

Google Sheets and Maven remain the source/reference systems. A future Action Server should become the AI-facing knowledge access layer that serves curated, cached, evidence-backed responses to agents and AI Draft workflows so agents do not repeatedly scan Google Sheets, Maven raw JSON, or large Project Brain reports.

## 2. Evidence Inspected

Searches performed:

| Search target | Result |
|---|---|
| `action server` / `actionserver` | No exact repository matches found. |
| `server actions` / `server action` / `use server` | Governance and roadmap references found; no actual `use server` runtime actions found in `app` or `lib`. |
| `knowledge access` / `knowledge layer` / `knowledge graph` | Knowledge graph/spec references found in Project Brain; no runtime access layer found. |
| `pricing evidence` / `commercial intelligence` / `maven link` | Multiple Project Brain specs and evidence reports found. |
| `cache` / `cached` / `token` / `api calls` | No implemented AI cache/token-reduction layer found; evidence exists for why one is needed. |

Files inspected:

- `PROJECT_OPERATING_PROTOCOL.md`
- `PROJECT_INDEX.md`
- `project-brain/TASK_BOARD.md`
- `project-brain/roadmap/ROADMAP.md`
- `AI_DRAFT_RUNTIME_BLUEPRINT.md`
- `Commercial_Intelligence_Source_Audit.md`
- `Commercial_Intelligence_Verification.md`
- `Equipment_Commercial_Link_Discovery.md`
- `project-brain/PRICING_EVIDENCE_ENGINE_SPEC.md`
- `project-brain/SERVICE_REPORT_MAVEN_LINK_REGISTRY_SPEC.md`
- `project-brain/KNOWLEDGE_GRAPH_VALIDATION.md`
- `project-brain/SERVICE_REPORT_5806_COMMERCIAL_EVIDENCE_PACKET.md`
- `app/service-reports/service-report-adapter.ts`
- `app/ai-drafts/ai-draft-adapter.ts`
- `app/business-documents/business-document-adapter.ts`
- `app/customers/customer-adapter.ts`
- `app/equipment/equipment-adapter.ts`
- `app/parts-used/parts-used-adapter.ts`
- `app/automation-commands/automation-command-adapter.ts`
- `lib/prisma.ts`

## 3. Existing Action Server References

No exact references were found for:

- `Action Server`
- `ActionServer`
- `action server`
- `actionserver`

Conclusion:

There is no named Action Server concept currently documented as an existing component.

Important distinction:

The absence of the name does not mean the architecture is unrelated. The project already has Server Actions-first governance, evidence-engine specs, and read-only data adapters that can become foundations for an Action Server.

## 4. Existing Server Actions

### Governance References

`PROJECT_OPERATING_PROTOCOL.md` defines the official Server Actions-first rule:

- All internal Next.js write flows must use Server Actions by default.
- This includes approvals, AI Draft approval, BusinessDocument creation, ServiceReport shadow updates, import review actions, user-triggered queue commands, PostgreSQL mutations, and offline sync actions.
- API routes are reserved for external webhooks, Maven callbacks, public endpoints, and third-party integrations.
- Server Actions do not grant permission to write production AppSheet, Google Sheets, Maven, Drive, email, or Apps Script state.

Supporting references:

- `project-brain/migration/POSTGRESQL_V1_SCOPE.md`
- `project-brain/migration/DATA_MIGRATION_PLAN.md`
- `project-brain/migration/DATABASE_SCHEMA_V1.md`
- `project-brain/migration/PRISMA_SCHEMA_V1.md`
- `project-brain/TASK_BOARD.md`
- `PROJECT_INDEX.md`

### Implemented Runtime Server Actions

No implemented Server Action functions were found in `app` or `lib`.

Search result:

- No `use server` directive found in `app` or `lib`.
- Existing async functions in `app/*/*-adapter.ts` are read-only data loader functions, not Server Actions.

Conclusion:

Server Actions are an approved future architecture rule, not an implemented Action Server or knowledge access layer.

## 5. Existing Knowledge / Cache / API Access Pattern

### Implemented Read Pattern

The current Next.js app reads data through module-level Prisma adapters:

| Module | Current access pattern | Runtime role |
|---|---|---|
| `app/service-reports/service-report-adapter.ts` | Prisma `serviceReport.findMany/findUnique` with customer/equipment relations | Read-only service report list/detail and SCR preview |
| `app/customers/customer-adapter.ts` | Prisma `customer.findMany/findUnique` | Read-only customer list/detail |
| `app/equipment/equipment-adapter.ts` | Prisma `reportEquipmentItem.findMany/findUnique` | Read-only equipment list/detail |
| `app/parts-used/parts-used-adapter.ts` | Prisma `partUsed.findMany/findFirst` | Read-only parts-used shell |
| `app/ai-drafts/ai-draft-adapter.ts` | Prisma `aiDraftSuggestion.findMany/findFirst` | Read-only AI Draft Suggestions shell |
| `app/business-documents/business-document-adapter.ts` | Prisma `businessDocument.findMany/findFirst` with items/logs | Read-only BusinessDocuments shell |
| `app/automation-commands/automation-command-adapter.ts` | Prisma `automationCommand.findMany/findFirst` | Read-only AutomationCommands shell |
| `lib/prisma.ts` | Shared Prisma client | DB client reuse |

### Cache Pattern

No explicit runtime cache layer was found for AI knowledge access.

Not found:

- `unstable_cache`
- `revalidateTag`
- `revalidatePath`
- AI evidence cache tables
- centralized read API
- precomputed knowledge packet store
- token-aware summarization service

### Current Practical Pattern

The project currently relies on:

1. Prisma adapters for populated staging tables.
2. Project Brain Markdown specs/reports for intelligence rules and evidence.
3. Google Sheets connector/live reads for commercial data that is not in staging.
4. Maven data as source/reference through Google Sheets/App Script history.

This works for audits and discovery, but it is not yet a stable AI-facing knowledge access layer.

## 6. Existing AI Draft Data Access Plan

`AI_DRAFT_RUNTIME_BLUEPRINT.md` defines the intended AI Draft data sources.

Current documented inputs:

| Source | Role |
|---|---|
| `ServiceReports` | Source report, customer, date, technician, service context |
| `ReportEquipmentItems` | Equipment model, serial, service description, current/next service |
| `Customers_Final` | Customer identity and context |
| `PartsUsed` | Parts evidence |
| `ProductsCatalog` | Product identity, SKU, selling price, compatible equipment |
| `InvoiceMavenDocuments` | Maven document/customer/date/history context |
| `InvoiceMavenDocumentItems` | Historical item/pricing source |
| `BusinessDocuments` | Future internal draft header target |
| `BusinessDocumentItems` | Future internal draft item target |
| `AIDraftSuggestions` | Optional future review layer |
| `AutomationCommands` | Future approved queue trigger |

Current status:

- AI Draft is validated for read-only recommendation simulations only.
- Internal draft writes are not approved.
- Maven creation is not approved.
- Pricing and model/equipment linkage require evidence and approval flags.
- Planned registries remain specs or discovery outputs, not runtime tables.

Related Project Brain layers:

- `project-brain/PRICING_EVIDENCE_ENGINE_SPEC.md`
- `project-brain/SERVICE_REPORT_MAVEN_LINK_REGISTRY_SPEC.md`
- `project-brain/PARTS_SKU_INTELLIGENCE_SPEC.md`
- `project-brain/SERVICE_PATTERN_INTELLIGENCE_REGISTRY.md`
- `project-brain/PART_COMPATIBILITY_REGISTRY.md`
- `project-brain/MANUFACTURER_KNOWLEDGE_BASE.md`
- `project-brain/KNOWLEDGE_GRAPH_VALIDATION.md`
- `project-brain/SERVICE_REPORT_5806_COMMERCIAL_EVIDENCE_PACKET.md`

Conclusion:

The AI Draft access plan exists as documentation and evidence packets. It has not been converted into a centralized service that agents can query.

## 7. Existing Notes About Reducing Sheets / Maven / API / Token Usage

No explicit implemented token/API reduction mechanism was found.

Evidence that the need exists:

- `Commercial_Intelligence_Source_Audit.md` states commercial intelligence data is not locally exported and not populated in Supabase staging.
- `Commercial_Intelligence_Verification.md` verified rich Maven history in Google Sheets: `InvoiceMavenDocuments = 8,358` rows and `InvoiceMavenDocumentItems = 20,678` rows.
- `Equipment_Commercial_Link_Discovery.md` shows Service Report 5806 linkage requires searching Maven `RawJson`, descriptions, item rows, report numbers, customer names, model text, and serial text.
- `SERVICE_REPORT_MAVEN_LINK_REGISTRY_SPEC.md` defines an evidence-first registry precisely because Maven links are embedded in free text and raw JSON rather than normalized relationships.
- `PRICING_EVIDENCE_ENGINE_SPEC.md` defines a future engine so AI Draft pricing can cite ranked evidence instead of ad hoc source scans.

Practical implication:

Repeated AI/agent reads against Google Sheets, Maven raw JSON, or long Markdown evidence packets will waste tokens and increase connector/API usage unless the project introduces an AI-facing knowledge access layer that returns compact, filtered evidence packets.

## 8. Existing Roadmap Items Related To DB Knowledge Layer

Relevant roadmap/state references:

| Roadmap item | Status | Meaning for Action Server |
|---|---|---|
| Wave 3 Maven Knowledge Layer | Pending | Commercial/Maven history is expected to become structured knowledge. |
| AI Draft Pilot | Planned/future | Requires ServiceReports, ReportEquipmentItems, PartsUsed, Customers, ProductsCatalog, InvoiceMavenDocuments, InvoiceMavenDocumentItems. |
| Global Knowledge Graph | Future target architecture | Long-term connection between customers, equipment, documents, service events, products, workflows, decisions, and outcomes. |
| Server Actions architecture | Future architecture dependency | Internal writes should use Server Actions when approved. |
| Offline-first sync | Future architecture dependency | Server Actions become sync target for approved internal mutations. |

Important current mismatch:

The roadmap expects Maven/commercial knowledge and AI Draft evidence, but the current app only has read-only UI adapters and empty Supabase staging commercial tables. The knowledge layer is documented, not implemented.

## 9. What Can It Already Serve?

Because no Action Server exists, the answer is: **nothing through an Action Server today**.

However, existing code and docs can already serve or support the following through their current mechanisms:

### Through Prisma Adapters

- Service report list/detail.
- Customer list/detail.
- Equipment list/detail.
- PartsUsed list/detail.
- AI Draft Suggestions shell.
- BusinessDocuments shell.
- AutomationCommands shell.
- SCR-40PM small-service preview on the Service Report detail screen.

Limit:

These are screen-specific read adapters, not reusable agent knowledge endpoints.

### Through Project Brain Evidence Files

- Equipment identity rules.
- Manufacturer knowledge and part compatibility.
- Service pattern rules.
- Pricing evidence rules.
- Maven link confidence rules.
- Service Report 5806 commercial evidence.
- SCR-40PM service kit and inventory evidence.

Limit:

These are Markdown evidence sources, not machine-queryable runtime packets.

### Through Google Sheets / Maven Source History

- InvoiceMavenDocuments history.
- InvoiceMavenDocumentItems line pricing history.
- BusinessDocuments source row.
- BusinessDocumentItems emptiness.

Limit:

These remain source/reference reads and should not be repeatedly scanned by agents if an internal knowledge layer can serve the same curated evidence.

## 10. What Should Be Served Through It First?

The first Action Server / knowledge access candidates should be read-only and evidence-packet oriented.

Recommended first served capabilities:

1. `getServiceReportEvidence(reportCounterOrId)`
   - ServiceReports summary.
   - ReportEquipmentItems.
   - customer identity.
   - equipment model/serial evidence.
   - detected service pattern.

2. `getMavenLinkEvidence(reportCounterOrId)`
   - candidate Maven documents/items.
   - report/customer/model/serial/date evidence.
   - confidence.
   - unsafe automation reasons.

3. `getPricingEvidence(reportCounterOrId, itemOrServiceLine)`
   - relevant Maven item prices.
   - customer match.
   - equipment/model match.
   - item similarity.
   - date range.
   - confidence.
   - `NeedsPriceApproval`.

4. `getPartsEvidence(model, serviceType)`
   - expected service lines.
   - manufacturer part numbers.
   - compatibility evidence.
   - `NeedsSkuApproval`.
   - `NeedsQuantityApproval`.

5. `getAiDraftReadiness(reportCounterOrId)`
   - compact summary of what is safe for recommendation.
   - blockers from evidence to draft recommendation.
   - approval gates.

Why these first:

They directly reduce repeated Google Sheets/Maven/Markdown scanning and align with the current AI Draft readiness priority:

1. Equipment to Maven linkage.
2. Historical pricing evidence.
3. AI Draft recommendation readiness.

## 11. Which Sheets / Maven Data Should Move Behind It?

Move behind the AI-facing knowledge access layer first:

| Source data | Why it should move behind Action Server first |
|---|---|
| `InvoiceMavenDocuments` | Large document history; source for report references, customer/date/document status, RawJson evidence. |
| `InvoiceMavenDocumentItems` | Largest/richest price memory; source for item, labor, travel, service package, and historical selling prices. |
| `ServiceReports` | Operational trigger context for AI Draft. |
| `ReportEquipmentItems` | Equipment identity and service-pattern evidence. |
| `ProductsCatalog` | SKU/product/selling-price reference when populated/approved. |
| `BusinessDocuments` | Future internal workflow context; currently only one source row and empty staging. |
| `BusinessDocumentItems` | Keep behind layer as empty/limited until real rows exist. |

Keep as source/reference, not AI-facing raw scan targets:

- Google Sheets `ServiceApp_FIX`.
- Maven API/search history.
- Apps Script Maven sync outputs.
- Raw Maven JSON.

## 12. How It Would Reduce Tokens / API Calls

An Action Server knowledge layer would reduce overhead by:

1. Returning compact evidence packets instead of full sheet ranges or long Markdown reports.
2. Reusing precomputed link candidates for ServiceReport-to-Maven matches.
3. Centralizing parsing of Maven `RawJson`, item descriptions, report references, model text, and serial text.
4. Serving filtered pricing rows by report/customer/model/service line instead of scanning 20,678 Maven item rows repeatedly.
5. Preserving evidence row IDs, source dates, document numbers, and confidence so agents do not re-derive them each time.
6. Separating source reads from AI reasoning: Google Sheets/Maven remain source/reference; Action Server provides normalized read-only evidence views.
7. Enforcing approval flags and protected-system boundaries consistently in one layer.

Expected immediate token/API reduction:

- Fewer repeated Google Sheets connector reads.
- Fewer repeated Maven history scans.
- Smaller prompt context for AI Draft tests.
- Less need to paste full evidence packet files into every PM/AI review.
- Lower risk of agents inventing or reinterpreting evidence from incomplete context.

## 13. What Is Missing

Missing runtime components:

- No named Action Server component.
- No `use server` action files.
- No AI-facing read API.
- No centralized evidence-query service.
- No Maven link registry table or runtime index.
- No pricing evidence runtime function.
- No customer pricing evidence runtime function.
- No service report evidence packet endpoint.
- No cache/materialized evidence store.
- No token/API usage metric.
- No approved data freshness policy.
- No approved source sync/export schedule.
- No read-only local export pipeline for commercial data.
- No Supabase staging population for Maven commercial tables.

Missing governance decisions:

- Whether Action Server is a documentation name for Server Actions or a distinct internal service layer.
- Whether AI-facing reads should be implemented as Server Actions, route handlers, plain server-only modules, or a hybrid.
- Which data can be cached, for how long, and where.
- Whether Google Sheets commercial data should be imported into staging read models or accessed by controlled export.
- How to store Liad-approved corrections as link-learning without allowing automatic writes.
- What evidence packet shape becomes canonical for AI Draft recommendation readiness.

## 14. Risks

| Risk | Level | Explanation |
|---|---|---|
| Repeated raw source reads | Medium | Agents may repeatedly scan Google Sheets/Maven history, increasing token/API use and inconsistency. |
| Premature implementation | Medium | Building an Action Server before deciding read-only scope, cache policy, and evidence packet shape could duplicate existing specs. |
| Source/reference confusion | High | Maven and Google Sheets must remain source/reference; Action Server must not become unapproved source-of-truth mutation layer. |
| Pricing misuse | High | Maven history is selling-price evidence, not contract proof; manufacturer cost is not customer price. |
| Equipment identity misuse | High | Generic model descriptions must not drive SKU or pricing automation. |
| Hidden write path | High | Server Actions-first is for approved internal writes only; it must not bypass DB/Maven/Sheets approval gates. |
| Duplication | Medium | Current Project Brain specs could be duplicated into new services without a registry-backed reuse plan. |
| Stale cache | Medium | Cached Maven/pricing evidence must show freshness/source date to avoid stale recommendations. |

## 15. Recommended Next Task

Create a documentation-only specification:

`project-brain/ACTION_SERVER_KNOWLEDGE_ACCESS_SPEC.md`

Recommended scope:

- Define Action Server as the AI-facing read-only knowledge access layer.
- Confirm Google Sheets/Maven remain source/reference.
- Define first read-only endpoints/functions:
  - service report evidence
  - Maven link evidence
  - pricing evidence
  - parts/service-pattern evidence
  - AI Draft readiness packet
- Define evidence packet schema.
- Define cache/freshness policy.
- Define forbidden actions.
- Define approval gates before any implementation.

Do not implement until Liad approves the spec.

## 16. Final Conclusion

Action Server does not exist today.

The project already has:

- Server Actions-first governance.
- Read-only Prisma adapters.
- AI Draft runtime blueprint.
- Pricing Evidence Engine spec.
- Service Report to Maven Link Registry spec.
- verified Maven/Google Sheets commercial data.
- a clear business need to reduce repeated Sheets/Maven/token usage.

The safest next move is not implementation. It is to specify the Action Server as a read-only AI-facing knowledge access layer that reuses existing Project Brain intelligence and serves compact, evidence-backed packets for AI Draft readiness.
