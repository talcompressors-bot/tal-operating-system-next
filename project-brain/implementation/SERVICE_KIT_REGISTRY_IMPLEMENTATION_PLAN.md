# SERVICE KIT REGISTRY IMPLEMENTATION PLAN

Status: Proposed implementation plan  
Mission: SERVICE-KIT-REGISTRY-IMPLEMENTATION-PLAN  
Date: 2026-06-17  
Mode: Documentation only  
Production impact: None  

## Pre-Mission Review Output

Mission Name: SERVICE-KIT-REGISTRY-IMPLEMENTATION-PLAN

Phase: PHASE 1 - Digital Twin Foundation

Objective: Create a governed implementation plan for turning Service Kit Registry POC results into a real `ServiceKitRegistry`.

Builder Agent: AI_DRAFT_AGENT

Auditor Agent: FACTORY_CONTROL_CENTER_AGENT

Discovery Required: No for this documentation plan. Yes before production creation, because Service Kit Registry Build is referenced in `project-brain/checkpoints/NEXT_SESSION.md` but was not found as a separate repository artifact.

Existing Assets Found:

- `project-brain/implementation/ALIAS_REGISTRY_IMPLEMENTATION_PLAN.md` proposes alias normalization for raw product, equipment, service, and kit labels.
- `project-brain/implementation/EQUIPMENT_REGISTRY_IMPLEMENTATION_PLAN.md` proposes canonical equipment identities and future service-kit links.
- `ProductsCatalog` is the active product/part and pricing source.
- `InvoiceMavenDocumentItems` and `InvoiceMavenDocuments` provide historical service and pricing evidence.
- `ReportEquipmentItems` provides equipment model, service description, next service, and parts/service context.
- No live `ServiceKitRegistry` table is documented in `data-sources/tools/SHEETS_REGISTRY.md`.

Reuse Decision: Create New, after explicit approval. Existing tables provide source evidence and products, but not a governed registry for service-kit definitions and equipment compatibility.

Affected Tables:

- Proposed new table: `ServiceKitRegistry`
- Related proposed tables: `AliasRegistry`, `EquipmentRegistry`, future `PricingRegistry`
- Existing source/consumer tables: `ProductsCatalog`, `ReportEquipmentItems`, `ServiceReports`, `InvoiceMavenDocuments`, `InvoiceMavenDocumentItems`, `BusinessDocuments`, `BusinessDocumentItems`, `AIDraftSuggestions`

Affected Agents:

- `AI_DRAFT_AGENT`
- `FACTORY_CONTROL_CENTER_AGENT`
- `INFRASTRUCTURE_MANAGER_AGENT`
- future QA/System Health agent

Affected Workflows:

- AI Draft line-item recommendation
- Equipment-based service-kit selection
- Historical pricing comparison
- Future product/catalog compatibility review

Protected Systems:

- Apps Script
- Google Sheets live data
- AppSheet production
- Maven
- Drive
- AutomationCommands
- BusinessDocuments workflow
- Service report workflow

Required Evidence:

- Current live table list and headers from `SHEETS_REGISTRY.md`
- AI Draft matching and approval rules from `AI_DRAFT_AGENT.md`
- AI Draft source mapping from `AI_DRAFT_FIELD_MAPPING.md`
- Current checkpoint status and risks from `NEXT_SESSION.md`
- Relationship rules from AliasRegistry and EquipmentRegistry implementation plans

Validation Tests:

- Confirm all requested sections are present.
- Confirm no code or production system was modified.
- Confirm `ServiceKitRegistry` is proposed, not created.
- Confirm implementation is blocked until explicit approval.

Practical Verification:

- A future implementer can create a review-only `ServiceKitRegistry` table from this plan after approval.
- A future auditor can verify equipment links, product links, pricing dependencies, service intervals, approvals, and AI Draft usage.

Brain Updates Required:

- After approved implementation, update `SHEETS_REGISTRY.md`, `FACTORY_ASSET_REGISTRY.md`, `PROJECT_BRAIN_MASTER.md`, roadmap/checkpoint, and relevant AI Draft maps. This planning mission does not update those files.

Infrastructure Manager Decision: CREATE_NEW as documentation-only plan. Production implementation remains blocked by human approval.

Next Safe Step: Review this plan, locate or reconstruct Service Kit Registry POC candidates, then run an approval-gated readiness review before creating any sheet or AppSheet table.

## 1. Purpose

`ServiceKitRegistry` will be the governed source for approved service kits: reusable sets of service line items, compatible equipment, service intervals, product references, labor assumptions, visit assumptions, pricing dependencies, approval status, and audit evidence.

It is designed to help AI Draft recommend service-document line items from known service patterns without inventing parts, labor, prices, or Maven documents.

## 2. Why ServiceKitRegistry Is Needed

The current AI Draft process has useful service and pricing evidence, but not enough structured knowledge to create production-ready drafts. `NEXT_SESSION.md` records 20/20 simulated recommendations, 0/20 production-ready drafts, 20/20 requiring approval, and knowledge registry maturity as the main blocker.

Service kits are needed because:

- Historical Maven line items are useful but inconsistent and generic.
- `ProductsCatalog` stores products and prices, but not full service packages.
- `ReportEquipmentItems` stores equipment and service descriptions, but not approved billable kit definitions.
- Equipment models such as `GA26FF` still lack exact catalog and Maven service-kit matches.
- Dryer service/repair logic must remain separate from compressor service-kit assumptions.
- AI Draft must explain which parts, labor, visit charges, and service interval rules were used.

## 3. Exact Storage Location

Recommended canonical storage:

- Spreadsheet: existing `ServiceApp_FIX`
- New Google Sheets tab: `ServiceKitRegistry`
- Future AppSheet table name: `ServiceKitRegistry`
- Repository plan: `project-brain/implementation/SERVICE_KIT_REGISTRY_IMPLEMENTATION_PLAN.md`

This is a recommendation only. Creating the Google Sheets tab or AppSheet table is a schema change and requires explicit approval.

Reason:

- `ServiceApp_FIX` already contains service reports, equipment rows, products, Maven history, AI suggestions, and business document staging.
- AI Draft needs service-kit lookup near the same operational data boundary.
- AppSheet can later expose a governed internal review UX.

Not recommended:

- Markdown-only canonical storage, because runtime lookup and AppSheet review require table data.
- Apps Script constants, because kit maintenance should not require code deployments.
- Separate spreadsheet, because it creates source-of-truth and permission drift.

## 4. Google Sheets Structure

Sheet name: `ServiceKitRegistry`

Header row:

```text
ServiceKitId, RegistryVersion, VersionStatus, Enabled, KitName, NormalizedKitName, KitType, EquipmentFamily, EquipmentType, CompatibleEquipmentIds, CompatibleModelSeries, CompatibleManufacturer, ServiceType, ServiceIntervalHours, ServiceIntervalMonths, IncludesVisit, DefaultVisitQuantity, DefaultLaborHours, LaborRate, Currency, ProductLineItemsJson, RequiredProductIds, OptionalProductIds, ExcludedProductIds, PricingRegistryId, DefaultSubtotal, NeedsPriceApprovalDefault, AliasRegistryIds, PrimaryAliasId, SourceTables, EvidenceSource, EvidenceRecordIds, HistoricalSourceCount, ConfidenceScore, ApprovalStatus, ApprovedBy, ApprovedAt, RejectedReason, FirstSeenAt, LastSeenAt, LastMatchedAt, CreatedAt, CreatedBy, UpdatedAt, UpdatedBy, Notes
```

Recommended row semantics:

- One row represents one service kit definition for a service type and equipment compatibility scope.
- A kit may be exact-model, model-series, equipment-family, or generic, but the match precision must be explicit.
- Kit rows must not become active until approved.
- Product lists should reference `ProductsCatalog` IDs when verified.
- Pricing references should remain approval-gated until `PricingRegistry` exists.

## 5. AppSheet Structure

AppSheet table name: `ServiceKitRegistry`

Recommended AppSheet configuration:

| Setting | Recommendation |
|---|---|
| Source | Google Sheets tab `ServiceKitRegistry` in `ServiceApp_FIX` |
| Key | `ServiceKitId` |
| Label | `KitName` |
| Adds | Allowed only for approved maintainer role after rollout approval |
| Updates | Allowed only for approved maintainer role after rollout approval |
| Deletes | Disabled |
| Initial imported status | `NEEDS_REVIEW` |
| Active status | `APPROVED` |
| Bot behavior | No production Bot in first rollout |
| Slices | `ServiceKitRegistry_ReviewQueue`, `ServiceKitRegistry_Approved`, `ServiceKitRegistry_ByEquipment`, `ServiceKitRegistry_ByServiceType`, `ServiceKitRegistry_Duplicates`, `ServiceKitRegistry_Deprecated` |
| Initial UX | Internal maintenance only |

Recommended enum values:

- `VersionStatus`: `DRAFT`, `ACTIVE`, `DEPRECATED`
- `KitType`: `COMPRESSOR_SERVICE`, `DRYER_SERVICE`, `REPAIR`, `INSPECTION`, `OTHER`, `UNKNOWN`
- `EquipmentFamily`: `COMPRESSOR`, `DRYER`, `FILTER`, `VACUUM`, `OTHER`, `UNKNOWN`
- `ServiceType`: `SMALL_SERVICE`, `MAJOR_SERVICE`, `REPAIR`, `INSPECTION`, `OTHER`, `UNKNOWN`
- `ApprovalStatus`: `NEEDS_REVIEW`, `APPROVED`, `REJECTED`, `DEPRECATED`

## 6. Column Definitions

| Column name | Type | Required? | Example | Validation rule | Used by agent |
|---|---|---:|---|---|---|
| ServiceKitId | Text key | Yes | `KIT-GA26FF-SMALL-2000H` | Unique; starts with `KIT-`; immutable | AI_DRAFT_AGENT, FACTORY_CONTROL_CENTER_AGENT |
| RegistryVersion | Text | Yes | `v1` | Required; default `v1` | FACTORY_CONTROL_CENTER_AGENT |
| VersionStatus | Enum | Yes | `ACTIVE` | `DRAFT`, `ACTIVE`, or `DEPRECATED` | AI_DRAFT_AGENT, FACTORY_CONTROL_CENTER_AGENT |
| Enabled | Yes/No | Yes | `TRUE` | Must be TRUE for AI use | AI_DRAFT_AGENT |
| KitName | Text | Yes | `GA26FF Small Service 2000h` | Required label | AI_DRAFT_AGENT |
| NormalizedKitName | Text | Yes | `GA26FFSMALLSERVICE2000H` | Uppercase normalized value | FACTORY_CONTROL_CENTER_AGENT |
| KitType | Enum | Yes | `COMPRESSOR_SERVICE` | Approved enum only | AI_DRAFT_AGENT |
| EquipmentFamily | Enum | Yes | `COMPRESSOR` | Approved enum only | AI_DRAFT_AGENT |
| EquipmentType | Text/Enum | Conditional | `SCREW_COMPRESSOR` | Required when known; otherwise `UNKNOWN` | AI_DRAFT_AGENT |
| CompatibleEquipmentIds | EnumList/Text | Conditional | `EQ-GA26FF` | Required for exact/model kit; use `UNKNOWN` for generic review candidates | AI_DRAFT_AGENT |
| CompatibleModelSeries | EnumList/Text | No | `GA` | Optional; must not imply exact model match | AI_DRAFT_AGENT |
| CompatibleManufacturer | Text | No | `Atlas Copco` | Use `UNKNOWN` if not verified | AI_DRAFT_AGENT |
| ServiceType | Enum/Text | Yes | `SMALL_SERVICE` | Must use approved service labels or `UNKNOWN` | AI_DRAFT_AGENT |
| ServiceIntervalHours | Number | No | `2000` | Positive integer or blank | AI_DRAFT_AGENT |
| ServiceIntervalMonths | Number | No | `12` | Positive integer or blank | AI_DRAFT_AGENT |
| IncludesVisit | Yes/No | Yes | `TRUE` | Required boolean | AI_DRAFT_AGENT |
| DefaultVisitQuantity | Decimal | Conditional | `1` | Required when `IncludesVisit=TRUE` | AI_DRAFT_AGENT |
| DefaultLaborHours | Decimal | No | `2.5` | Positive number or blank; blank means approval needed | AI_DRAFT_AGENT |
| LaborRate | Decimal | Conditional | `275` | If populated, must match approved labor rule or approved override | AI_DRAFT_AGENT |
| Currency | Text/Enum | Yes | `NIS` | Required; default `NIS` | AI_DRAFT_AGENT |
| ProductLineItemsJson | LongText | Conditional | `[{"ProductID":"PROD-1","Qty":1}]` | Required for approved product kits; valid JSON-like structure or reviewed text | AI_DRAFT_AGENT |
| RequiredProductIds | EnumList/Text | No | `PROD-OILFILTER` | Must reference verified `ProductsCatalog.ProductID` values | AI_DRAFT_AGENT |
| OptionalProductIds | EnumList/Text | No | `PROD-AIRFILTER` | Must reference verified products when populated | AI_DRAFT_AGENT |
| ExcludedProductIds | EnumList/Text | No | `PROD-WRONGOIL` | Must reference verified products when populated | FACTORY_CONTROL_CENTER_AGENT |
| PricingRegistryId | Text | No | `PRICE-KIT-GA26FF-SMALL` | Future ID; use `UNKNOWN` until PricingRegistry exists | AI_DRAFT_AGENT |
| DefaultSubtotal | Decimal | No | `1250` | Must not be used as final price unless approved pricing evidence exists | AI_DRAFT_AGENT |
| NeedsPriceApprovalDefault | Yes/No | Yes | `TRUE` | Default TRUE unless approved price source exists | AI_DRAFT_AGENT |
| AliasRegistryIds | EnumList/Text | No | `ALIAS-20260617-000010` | IDs must exist after AliasRegistry implementation; otherwise `UNKNOWN` | AI_DRAFT_AGENT |
| PrimaryAliasId | Text | Conditional | `ALIAS-20260617-000010` | Must be included in `AliasRegistryIds` when populated | AI_DRAFT_AGENT |
| SourceTables | EnumList/Text | Yes | `InvoiceMavenDocumentItems,ProductsCatalog` | Must reference known source tables or approved future registries | FACTORY_CONTROL_CENTER_AGENT |
| EvidenceSource | EnumList/Text | Yes | `Service Kit Registry Build` | Must cite source name or checkpoint | FACTORY_CONTROL_CENTER_AGENT |
| EvidenceRecordIds | LongText | Conditional | `ItemRowId=abc; ProductID=xyz` | Use verified IDs or `UNKNOWN` | FACTORY_CONTROL_CENTER_AGENT |
| HistoricalSourceCount | Number | Yes | `14` | Nonnegative integer | AI_DRAFT_AGENT, FACTORY_CONTROL_CENTER_AGENT |
| ConfidenceScore | Decimal | Yes | `0.78` | 0.00 to 1.00 | AI_DRAFT_AGENT, FACTORY_CONTROL_CENTER_AGENT |
| ApprovalStatus | Enum | Yes | `NEEDS_REVIEW` | `NEEDS_REVIEW`, `APPROVED`, `REJECTED`, `DEPRECATED` | AI_DRAFT_AGENT, FACTORY_CONTROL_CENTER_AGENT |
| ApprovedBy | Text | Conditional | `Tal` | Required when approved | FACTORY_CONTROL_CENTER_AGENT |
| ApprovedAt | DateTime | Conditional | `2026-06-17T13:00:00+03:00` | Required when approved | FACTORY_CONTROL_CENTER_AGENT |
| RejectedReason | LongText | Conditional | `Wrong model compatibility` | Required when rejected | FACTORY_CONTROL_CENTER_AGENT |
| FirstSeenAt | DateTime | No | `2026-06-16T18:00:00+03:00` | First observed date/time or blank | FACTORY_CONTROL_CENTER_AGENT |
| LastSeenAt | DateTime | No | `2026-06-16T18:00:00+03:00` | Must be same or later than `FirstSeenAt` when both exist | FACTORY_CONTROL_CENTER_AGENT |
| LastMatchedAt | DateTime | No | `2026-06-17T13:30:00+03:00` | Updated only by approved workflow | AI_DRAFT_AGENT |
| CreatedAt | DateTime | Yes | `2026-06-17T13:00:00+03:00` | Required on creation | FACTORY_CONTROL_CENTER_AGENT |
| CreatedBy | Text | Yes | `CodexPlan` | Required | FACTORY_CONTROL_CENTER_AGENT |
| UpdatedAt | DateTime | No | `2026-06-17T13:10:00+03:00` | Required on update | FACTORY_CONTROL_CENTER_AGENT |
| UpdatedBy | Text | No | `Tal` | Required when `UpdatedAt` exists | FACTORY_CONTROL_CENTER_AGENT |
| Notes | LongText | No | `Candidate kit; price approval required` | Must not contain secrets | FACTORY_CONTROL_CENTER_AGENT |

## 7. Primary Key Strategy

Primary key: `ServiceKitId`

Preferred format for exact equipment model kits:

```text
KIT-{EQUIPMENT_MODEL}-{SERVICE_TYPE}-{INTERVAL}
```

Example:

```text
KIT-GA26FF-SMALL-2000H
```

Preferred format for family-level kits:

```text
KIT-{EQUIPMENT_FAMILY}-{SERVICE_TYPE}-{INTERVAL}
```

Rules:

- `ServiceKitId` is immutable.
- Do not use raw historical item description as the key.
- Do not include customer ID in the key; customer-specific pricing belongs in future PricingRegistry or approval notes.
- Family-level kit IDs must not be treated as exact model matches.
- If the kit is a review-only candidate with insufficient identity, use a temporary import key only after approval of the import process, such as `KIT-REVIEW-YYYYMMDD-NNNNNN`.

## 8. Relationship To EquipmentRegistry

`EquipmentRegistry` owns canonical equipment identity. `ServiceKitRegistry` owns approved service-kit definitions and equipment compatibility.

Flow:

```text
ReportEquipmentItems raw equipment
-> AliasRegistry
-> EquipmentRegistry
-> ServiceKitRegistry compatible kit
-> ProductsCatalog / PricingRegistry / historical pricing
```

Rules:

- Exact equipment matches require `CompatibleEquipmentIds`.
- Model-series matches use `CompatibleModelSeries` and must keep lower confidence than exact equipment matches.
- Family-level matches use `EquipmentFamily` and must keep `NeedsPriceApprovalDefault=TRUE` unless separately approved.
- Dryer kits must target dryer equipment and must not inherit compressor kit assumptions automatically.
- If EquipmentRegistry and ServiceKitRegistry compatibility conflict, AI Draft must mark the kit as review-only and not use it for automatic line-item confidence.

## 9. Relationship To ProductsCatalog

`ProductsCatalog` remains the source for product identity, SKU, product description, and catalog prices. `ServiceKitRegistry` references catalog products but does not replace the catalog.

Rules:

- `RequiredProductIds`, `OptionalProductIds`, and `ExcludedProductIds` should reference `ProductsCatalog.ProductID`.
- Kit product quantities belong in `ProductLineItemsJson`.
- Catalog prices may be used as pricing evidence, but malformed catalog rows must not be used for auto-pricing.
- Product substitutions require review and should be captured through AliasRegistry or a future product compatibility process.
- If a kit references a missing or inactive product, AI Draft must set `NeedsPriceApproval=TRUE` and include a risk note.

## 10. Relationship To PricingRegistry

`PricingRegistry` is future-only in this plan. It should become the governed source for approved kit prices, price ranges, historical confidence, labor price rules, travel/visit inclusion, and customer-specific exceptions.

Current rule:

- `ServiceKitRegistry` may store `DefaultSubtotal` and `NeedsPriceApprovalDefault`, but final pricing authority remains approval-gated.
- Technician labor remains 275 NIS/hour from `AI_DRAFT_AGENT.md`.
- Visit remains 300 NIS base visit from `AI_DRAFT_AGENT.md`.
- `PricingRegistryId` should remain `UNKNOWN` until the PricingRegistry implementation plan and approved table exist.

Future relationship:

```text
ServiceKitRegistry.ServiceKitId
-> PricingRegistry.ServiceKitId
-> approved pricing rule / range / confidence
```

## 11. Service Interval Rules

Service interval fields:

- `ServiceIntervalHours`
- `ServiceIntervalMonths`
- `ServiceType`

Rules:

- Use exact interval evidence from service reports, service-kit POC output, catalog/service documentation, or approved maintainer decision.
- If both hours and months are known, store both.
- If only one interval is known, store that one and leave the other blank or `UNKNOWN`.
- Do not infer interval solely from a generic item name.
- `Small Service 2000 Hours` may be represented as `ServiceType=SMALL_SERVICE` and `ServiceIntervalHours=2000` only when supported by evidence.
- Dryer repair/service intervals must remain separate from compressor service intervals.
- Missing interval does not block a review candidate, but it blocks automatic confidence increase.

## 12. Approval Workflow

Proposed workflow:

1. Import Service Kit Registry POC candidates as `NEEDS_REVIEW`, `Enabled=FALSE`, `VersionStatus=DRAFT`.
2. Reviewer verifies equipment compatibility, product references, quantities, service interval, evidence source, historical source count, and pricing status.
3. Reviewer rejects, keeps in review, or approves.
4. On approval, set `ApprovalStatus=APPROVED`, `Enabled=TRUE`, `VersionStatus=ACTIVE`, `ApprovedBy`, and `ApprovedAt`.
5. AI Draft may use only active approved enabled kit rows.
6. Price confidence remains separate from kit approval. A kit can be approved while still requiring price approval.
7. Deprecated or corrected rows must be retained for audit and marked inactive.

No automatic approval is allowed from POC confidence alone.

## 13. Ownership

| Area | Owner | Responsibility |
|---|---|---|
| Registry structure | INFRASTRUCTURE_MANAGER_AGENT | Approves schema and protected-system boundaries |
| Kit content | Human owner / assigned technical maintainer | Approves kit definitions and compatibility |
| Product linkage | Human owner / catalog maintainer | Approves ProductsCatalog references and substitutions |
| Equipment linkage | Equipment registry maintainer | Confirms compatible equipment IDs and family rules |
| Pricing linkage | Future PricingRegistry owner | Owns approved pricing rules |
| AI usage | AI_DRAFT_AGENT | Uses approved kits only in recommendation mode |
| Audit | FACTORY_CONTROL_CENTER_AGENT | Validates schema, evidence, approvals, relationships, and safety |

## 14. Maintenance Workflow

Recommended cadence:

- Weekly during AI Draft pilot.
- After new service reports are sampled.
- After EquipmentRegistry approval batches.
- After ProductsCatalog cleanup or Maven history audits.
- Before PricingRegistry rollout.

Maintenance steps:

1. Review `NEEDS_REVIEW` kit candidates.
2. Confirm compatible equipment and service interval evidence.
3. Validate required and optional product IDs.
4. Confirm labor and visit assumptions.
5. Keep price approval flags conservative.
6. Reject kits with unsupported product or equipment assumptions.
7. Deprecate stale kits instead of deleting them.
8. Run Factory Control Center audit after meaningful changes.

## 15. AI Draft Usage

AI_DRAFT_AGENT may use `ServiceKitRegistry` as read-only lookup after approved implementation.

Lookup flow:

```text
ServiceReport / ReportEquipmentItems
-> AliasRegistry normalization
-> EquipmentRegistry match
-> ServiceKitRegistry compatible kit
-> ProductsCatalog product references
-> PricingRegistry or historical pricing fallback
-> AI Draft recommendation with approval flags
```

Allowed use:

- Suggest service line items from approved service kits.
- Explain the selected kit in `AIReasoning`.
- Use kit products as structured recommendation candidates.
- Use service interval rules to improve confidence when the report context matches.

Forbidden use:

- Do not use unapproved, disabled, rejected, or deprecated kits.
- Do not use compressor kits for dryer repairs unless specifically approved.
- Do not create Maven documents.
- Do not write `BusinessDocuments` or `BusinessDocumentItems` without separate AI Draft write approval.
- Do not remove `NeedsPriceApproval` unless both kit and pricing evidence are approved.
- Do not invent products, quantities, labor hours, or visit charges.

## 16. Factory Control Center Audit

Audit checks:

| Check | Pass condition |
|---|---|
| Schema | Header matches approved plan after implementation |
| Primary keys | Every `ServiceKitId` is unique and immutable |
| Required fields | Required columns are populated |
| Duplicate kits | No active approved duplicate for same equipment scope, service type, and interval |
| Approval integrity | Approved rows have approver and timestamp |
| Equipment links | Compatible equipment IDs are approved or explicitly `UNKNOWN` |
| Product links | Product IDs exist in `ProductsCatalog` or are marked `UNKNOWN` |
| Pricing links | PricingRegistry IDs are `UNKNOWN` until future registry exists |
| Interval rules | Service intervals follow section 11 |
| Dryer/compressor separation | Dryer rows do not inherit compressor service kits |
| AI safety | AI Draft uses only active approved enabled rows |
| Protected systems | No Apps Script, Google Sheets, AppSheet, Maven, Drive, deploy, or AutomationCommands change occurred without approval |

Audit statuses:

- `PASS`
- `PASS_WITH_GAPS`
- `NEEDS_DISCOVERY`
- `FAIL`
- `BLOCKED_BY_APPROVAL`

## 17. Safe Rollout Plan

Phase 0 - Plan review:

- Review this document.
- Confirm storage location and schema.
- Confirm kit owner, product owner, and approver.
- Do not create sheets or AppSheet tables.

Phase 1 - Evidence readiness:

- Locate or reconstruct Service Kit Registry POC candidate output.
- Confirm source records from `ReportEquipmentItems`, `ProductsCatalog`, `InvoiceMavenDocuments`, and `InvoiceMavenDocumentItems`.
- Confirm no existing `ServiceKitRegistry` sheet exists through approved read-only metadata check.

Phase 2 - Approved sheet creation:

- After explicit approval, create the `ServiceKitRegistry` tab with the exact header row.
- Do not add Apps Script automation.
- Do not call Maven.
- Do not deploy.

Phase 3 - Candidate import:

- Import candidates as `NEEDS_REVIEW`, `Enabled=FALSE`, `VersionStatus=DRAFT`.
- Use `UNKNOWN` for unverified equipment, product, price, or interval attributes.
- Do not auto-approve rows.

Phase 4 - Relationship linking:

- Link approved EquipmentRegistry rows.
- Link verified ProductsCatalog rows.
- Keep PricingRegistry references as `UNKNOWN` until that registry exists.

Phase 5 - AppSheet review UX:

- After separate approval, add AppSheet table and internal review slices.
- Disable deletes.
- Keep bots disabled in first rollout.

Phase 6 - Read-only AI Draft use:

- Allow AI Draft to read active approved enabled service-kit rows.
- Keep recommendation writes and Maven actions separately approval-gated.

Phase 7 - Audit and brain update:

- Factory Control Center audits schema, duplicates, approvals, relationships, and usage.
- Project Brain and registries are updated only after approved implementation.

## 18. Backout Plan

If implementation creates unsafe or confusing recommendations:

1. Disable AI Draft use of `ServiceKitRegistry`.
2. Set affected rows to `Enabled=FALSE` or `VersionStatus=DEPRECATED`.
3. Preserve rows for audit; do not delete by default.
4. Hide or disable AppSheet slices/table after approval if needed.
5. Restore AI Draft to previous matching logic: ProductsCatalog direct match, same equipment history, same customer history, similar service history, and approval-gated AI estimate.
6. Keep AliasRegistry and EquipmentRegistry active only if their mappings are unaffected.
7. Record the backout reason in a checkpoint after approval.

## 19. Validation Tests

Documentation validation:

- File exists at `project-brain/implementation/SERVICE_KIT_REGISTRY_IMPLEMENTATION_PLAN.md`.
- All 21 requested sections are present.
- No code, Apps Script, Google Sheets, AppSheet, Maven, Drive, deploy, or commit action occurred.
- `git diff --stat` was shown.

Schema validation after approved implementation:

- Header row exactly matches section 4.
- `ServiceKitId` is unique and nonblank.
- Required fields are populated.
- Enum values match approved lists.
- `ConfidenceScore` is between 0 and 1.
- Approved rows have `ApprovedBy` and `ApprovedAt`.
- Rejected rows have `RejectedReason`.

Relationship validation:

- Compatible equipment IDs are approved EquipmentRegistry IDs or `UNKNOWN`.
- Required product IDs are valid ProductsCatalog IDs.
- PricingRegistry IDs remain `UNKNOWN` until PricingRegistry exists.
- Alias IDs exist in AliasRegistry after implementation.

AI Draft validation after approved read-only use:

- Exact equipment kit match has higher confidence than family-level kit match.
- Family-level kit match does not suppress `NeedsPriceApproval`.
- Rejected/deprecated kits are ignored.
- Dryer kits and compressor kits remain separated.
- Missing ProductsCatalog link triggers risk notes and price approval.

Factory Control Center validation:

- Audit detects duplicate active approved kits.
- Audit detects approved kits missing equipment or product evidence.
- Audit detects malformed product references.
- Audit detects premature PricingRegistry references.
- Audit reports unresolved POC evidence as `UNKNOWN`, not invented IDs.

## 20. Definition Of Done

This planning mission is done when:

- `project-brain/implementation/SERVICE_KIT_REGISTRY_IMPLEMENTATION_PLAN.md` exists.
- The document includes all 21 requested sections.
- It clearly states that `ServiceKitRegistry` is proposed, not created.
- It defines storage, schema, AppSheet structure, columns, key strategy, relationships, interval rules, approval workflow, ownership, maintenance, AI usage, audit, rollout, backout, validation, and next step.
- No code or production system was modified.
- No commit was made.
- `git diff --stat` was shown.

Future implementation is done only when:

- Human approval is recorded.
- The Google Sheets tab exists with approved schema.
- AppSheet table settings are reviewed and approved.
- Candidates are imported as review-only first.
- Factory Control Center audit passes or lists controlled gaps.
- Project Brain and `SHEETS_REGISTRY.md` are updated after approved schema creation.

## 21. Next Safe Implementation Step

Run an approval-gated readiness review:

```text
SERVICE-KIT-REGISTRY-READINESS-REVIEW
-> confirm storage decision
-> locate or reconstruct Service Kit Registry POC candidates
-> confirm owner and approver
-> confirm relationship to EquipmentRegistry
-> confirm ProductsCatalog references
-> confirm PricingRegistry dependency remains future-only
-> request explicit approval to create Google Sheets tab ServiceKitRegistry
```

Until that approval exists, `ServiceKitRegistry` remains a proposed design only.

## Evidence Notes

Direct evidence used:

- `agents/PRE_MISSION_REVIEW_SYSTEM.md`: mission review requirements.
- `project-brain/checkpoints/NEXT_SESSION.md`: current state, Service Kit Registry Build status, risks, and next mission sequence.
- `project-brain/implementation/ALIAS_REGISTRY_IMPLEMENTATION_PLAN.md`: planned alias normalization layer.
- `project-brain/implementation/EQUIPMENT_REGISTRY_IMPLEMENTATION_PLAN.md`: planned canonical equipment layer and service-kit dependency.
- `agents/FACTORY_CONTROL_CENTER_AGENT.md`: audit requirements and forbidden production actions.
- `agents/AI_DRAFT_AGENT.md`: AI Draft inputs, pricing priority, recommendation-only status, and approval rules.
- `project-brain/maps/AI_DRAFT_FIELD_MAPPING.md`: source table fields and historical matching context.
- `data-sources/tools/SHEETS_REGISTRY.md`: existing table list and current absence of a documented `ServiceKitRegistry` table.

Evidence not independently found as a separate file:

- Service Kit Registry Build output

The POC/build result is treated as checkpoint-referenced evidence until a separate source artifact is provided or reconstructed.
