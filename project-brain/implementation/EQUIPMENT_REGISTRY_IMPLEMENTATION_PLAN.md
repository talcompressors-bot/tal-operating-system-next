# EQUIPMENT REGISTRY IMPLEMENTATION PLAN

Status: Proposed implementation plan  
Mission: EQUIPMENT-REGISTRY-IMPLEMENTATION-PLAN  
Date: 2026-06-17  
Mode: Documentation only  
Production impact: None  

## Pre-Mission Review Output

Mission Name: EQUIPMENT-REGISTRY-IMPLEMENTATION-PLAN

Phase: PHASE 1 - Digital Twin Foundation

Objective: Create a governed implementation plan for turning Equipment Registry POC results into a real `EquipmentRegistry`.

Builder Agent: AI_DRAFT_AGENT

Auditor Agent: FACTORY_CONTROL_CENTER_AGENT

Discovery Required: No for this documentation plan. Yes before production creation, because the Equipment Registry POC is referenced in `project-brain/checkpoints/NEXT_SESSION.md` but was not found as a separate repository artifact during the prior Alias Registry plan.

Existing Assets Found:

- `ReportEquipmentItems` is the active service-report child table containing equipment details.
- `ServiceReports` contains service-level equipment, service type, customer, and report context.
- `ProductsCatalog` includes `CompatibleEquipment`, which can support product-to-equipment compatibility.
- `InvoiceMavenDocumentItems` and `InvoiceMavenDocuments` provide historical pricing and service context.
- `AliasRegistry` is now planned in `project-brain/implementation/ALIAS_REGISTRY_IMPLEMENTATION_PLAN.md` and should normalize model/type aliases before equipment matching.
- No live `EquipmentRegistry` table is documented in `data-sources/tools/SHEETS_REGISTRY.md`.

Reuse Decision: Create New, after explicit approval. Existing tables provide evidence and source data but do not provide a governed canonical equipment model registry.

Affected Tables:

- Proposed new table: `EquipmentRegistry`
- Related proposed table: `AliasRegistry`
- Future related table: `ServiceKitRegistry`
- Read-only source/consumer tables: `ServiceReports`, `ReportEquipmentItems`, `ProductsCatalog`, `InvoiceMavenDocuments`, `InvoiceMavenDocumentItems`, `BusinessDocuments`, `BusinessDocumentItems`, `AIDraftSuggestions`

Affected Agents:

- `AI_DRAFT_AGENT`
- `FACTORY_CONTROL_CENTER_AGENT`
- `INFRASTRUCTURE_MANAGER_AGENT`
- future QA/System Health agent

Affected Workflows:

- AI Draft equipment matching
- Historical pricing by equipment model/family
- Future service-kit selection
- Future equipment registry maintenance and audit

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

- Existing table and header evidence from `SHEETS_REGISTRY.md`
- AI Draft source mapping from `AI_DRAFT_FIELD_MAPPING.md`
- AI Draft matching and approval rules from `AI_DRAFT_AGENT.md`
- Equipment POC status from `NEXT_SESSION.md`
- AliasRegistry relationship from `ALIAS_REGISTRY_IMPLEMENTATION_PLAN.md`

Validation Tests:

- Confirm this plan includes every requested section.
- Confirm no runtime files or production systems were modified.
- Confirm `EquipmentRegistry` is documented as proposed, not created.
- Confirm future writes remain approval-gated.

Practical Verification:

- A future implementer can create an approved `EquipmentRegistry` sheet from this plan.
- A future auditor can verify schema, primary keys, family rules, AliasRegistry links, ServiceKitRegistry links, and AI Draft usage.

Brain Updates Required:

- After approved implementation, update `SHEETS_REGISTRY.md`, `FACTORY_ASSET_REGISTRY.md`, `PROJECT_BRAIN_MASTER.md`, roadmap/checkpoint, and relevant AI Draft maps. This planning mission does not update those files.

Infrastructure Manager Decision: CREATE_NEW as documentation-only plan. Production implementation remains blocked by human approval.

Next Safe Step: Review this plan, locate or reconstruct the Equipment Registry POC candidate evidence, then run an approval-gated readiness review before creating any sheet or AppSheet table.

## 1. Purpose

`EquipmentRegistry` will be the governed canonical source for equipment families, equipment types, model names, model variants, technical attributes, and AI Draft matching metadata.

Its job is to turn inconsistent service-report equipment entries into stable equipment identities that can support:

- better AI Draft recommendations
- historical pricing by exact model and family
- future service-kit matching
- safer product compatibility checks
- auditability for equipment assumptions

## 2. Why EquipmentRegistry Is Needed

Current equipment evidence is spread across multiple sources:

- `ReportEquipmentItems` stores equipment type, subtype, model, serial number, compressor category, service description, and next-service details.
- `ServiceReports` stores service type, customer, report context, and some equipment/service fields.
- `ProductsCatalog` stores `CompatibleEquipment`, but does not act as a canonical equipment model registry.
- `InvoiceMavenDocumentItems` stores historical item descriptions and pricing, but not reliable structured equipment identities.
- `NEXT_SESSION.md` records that Equipment Registry POC work exists, while also stating it is not implemented as a table.

The latest checkpoint reports useful AI Draft recommendation coverage but 0/20 production-ready drafts. One open risk is that models such as `GA26FF` still lack exact catalog and Maven service-kit matches. A governed equipment registry reduces that uncertainty by separating equipment identity from raw report text.

## 3. Exact Storage Location Recommendation

Recommended canonical storage:

- Spreadsheet: existing `ServiceApp_FIX`
- New Google Sheets tab: `EquipmentRegistry`
- Future AppSheet table name: `EquipmentRegistry`
- Repository plan: `project-brain/implementation/EQUIPMENT_REGISTRY_IMPLEMENTATION_PLAN.md`

This is a recommendation only. Creating the tab or AppSheet table is a production schema change and requires explicit human approval.

Reason:

- `ServiceApp_FIX` already contains the active service-report, catalog, Maven history, and AI Draft staging tables.
- AI Draft needs equipment lookup near the existing operational data boundary.
- AppSheet can later provide a controlled review/maintenance UX without adding a separate data store.

Not recommended:

- Markdown-only canonical registry, because AI Draft and AppSheet cannot reliably use it as operational lookup data.
- Apps Script constants, because equipment updates would require code changes and deploys.
- Separate spreadsheet, because it increases permission, sync, and source-of-truth risk.

## 4. Exact Google Sheets Table Structure

Sheet name: `EquipmentRegistry`

Header row:

```text
EquipmentId, RegistryVersion, VersionStatus, Enabled, EquipmentFamily, EquipmentType, EquipmentSubType, CanonicalManufacturer, CanonicalModel, NormalizedModel, DisplayName, ModelSeries, PowerHP, PowerKW, CompressorCategory, DryerIntegrated, OilType, Voltage, ControllerType, SupportedServiceTypes, DefaultServiceIntervalHours, DefaultServiceIntervalMonths, AliasRegistryIds, PrimaryAliasId, ServiceKitRegistryIds, ProductsCatalogIds, SourceTables, EvidenceSource, EvidenceRecordIds, ConfidenceScore, ApprovalStatus, ApprovedBy, ApprovedAt, RejectedReason, FirstSeenAt, LastSeenAt, LastMatchedAt, CreatedAt, CreatedBy, UpdatedAt, UpdatedBy, Notes
```

Recommended row semantics:

- One row represents one canonical equipment model or approved equipment-family entry.
- Model-specific rows should be preferred over vague family-only rows.
- Family-only rows are allowed when exact model evidence is unavailable, but they must stay lower confidence and must not suppress price approval.
- `AliasRegistryIds` links raw model/type variants to the canonical equipment row.
- `ServiceKitRegistryIds` links approved service-kit mappings when that future registry exists.

## 5. Exact AppSheet Table Structure

AppSheet table name: `EquipmentRegistry`

Recommended AppSheet configuration:

| Setting | Recommendation |
|---|---|
| Source | Google Sheets tab `EquipmentRegistry` in `ServiceApp_FIX` |
| Key | `EquipmentId` |
| Label | `DisplayName` |
| Adds | Allowed only for approved maintainer role after rollout approval |
| Updates | Allowed only for approved maintainer role after rollout approval |
| Deletes | Disabled |
| Initial imported status | `NEEDS_REVIEW` |
| Active status | `APPROVED` |
| Bot behavior | No production Bot in first rollout |
| Slices | `EquipmentRegistry_ReviewQueue`, `EquipmentRegistry_Approved`, `EquipmentRegistry_ByFamily`, `EquipmentRegistry_Duplicates`, `EquipmentRegistry_Deprecated` |
| Initial UX | Internal maintenance only |

Recommended enum values:

- `VersionStatus`: `DRAFT`, `ACTIVE`, `DEPRECATED`
- `EquipmentFamily`: `COMPRESSOR`, `DRYER`, `FILTER`, `VACUUM`, `OTHER`, `UNKNOWN`
- `EquipmentType`: `SCREW_COMPRESSOR`, `PISTON_COMPRESSOR`, `DRYER`, `ACCESSORY`, `OTHER`, `UNKNOWN`
- `CompressorCategory`: `SMALL`, `MEDIUM`, `LARGE`, `UNKNOWN`
- `ApprovalStatus`: `NEEDS_REVIEW`, `APPROVED`, `REJECTED`, `DEPRECATED`

## 6. Column List With Type, Required, Example, Validation Rule, Used By Agent

| Column name | Type | Required? | Example | Validation rule | Used by agent |
|---|---|---:|---|---|---|
| EquipmentId | Text key | Yes | `EQ-GA26FF` | Unique; starts with `EQ-`; immutable | AI_DRAFT_AGENT, FACTORY_CONTROL_CENTER_AGENT |
| RegistryVersion | Text | Yes | `v1` | Required; default `v1` | FACTORY_CONTROL_CENTER_AGENT |
| VersionStatus | Enum | Yes | `ACTIVE` | `DRAFT`, `ACTIVE`, or `DEPRECATED` | AI_DRAFT_AGENT, FACTORY_CONTROL_CENTER_AGENT |
| Enabled | Yes/No | Yes | `TRUE` | Must be TRUE for AI use | AI_DRAFT_AGENT |
| EquipmentFamily | Enum | Yes | `COMPRESSOR` | Approved enum only | AI_DRAFT_AGENT, FACTORY_CONTROL_CENTER_AGENT |
| EquipmentType | Enum | Yes | `SCREW_COMPRESSOR` | Approved enum only | AI_DRAFT_AGENT |
| EquipmentSubType | Text | No | `Oil injected screw` | Free text or `UNKNOWN` | AI_DRAFT_AGENT |
| CanonicalManufacturer | Text | Conditional | `Atlas Copco` | Required when known; otherwise `UNKNOWN` | AI_DRAFT_AGENT |
| CanonicalModel | Text | Yes | `GA26FF` | Required; no raw punctuation-only values | AI_DRAFT_AGENT |
| NormalizedModel | Text | Yes | `GA26FF` | Uppercase normalized model; unique within manufacturer/family where possible | AI_DRAFT_AGENT, FACTORY_CONTROL_CENTER_AGENT |
| DisplayName | Text | Yes | `Atlas Copco GA26FF` | Required label | AI_DRAFT_AGENT |
| ModelSeries | Text | No | `GA` | Optional; use `UNKNOWN` if unresolved | AI_DRAFT_AGENT |
| PowerHP | Decimal | No | `35` | Positive number or blank | AI_DRAFT_AGENT |
| PowerKW | Decimal | No | `26` | Positive number or blank | AI_DRAFT_AGENT |
| CompressorCategory | Enum | Conditional | `SMALL` | Required for compressors; otherwise `UNKNOWN` | AI_DRAFT_AGENT |
| DryerIntegrated | Yes/No | No | `TRUE` | Boolean; blank allowed until verified | AI_DRAFT_AGENT |
| OilType | Text | No | `Synthetic` | Use catalog/list value when available; otherwise `UNKNOWN` | AI_DRAFT_AGENT |
| Voltage | Text | No | `400V` | Free text; do not infer without evidence | AI_DRAFT_AGENT |
| ControllerType | Text | No | `Elektronikon` | Free text; do not infer without evidence | AI_DRAFT_AGENT |
| SupportedServiceTypes | EnumList/Text | No | `Small Service,Major Service` | Must use known service labels or `UNKNOWN` | AI_DRAFT_AGENT |
| DefaultServiceIntervalHours | Number | No | `2000` | Positive integer or blank | AI_DRAFT_AGENT |
| DefaultServiceIntervalMonths | Number | No | `12` | Positive integer or blank | AI_DRAFT_AGENT |
| AliasRegistryIds | EnumList/Text | No | `ALIAS-20260617-000001` | IDs must exist after AliasRegistry implementation; otherwise `UNKNOWN` | AI_DRAFT_AGENT, FACTORY_CONTROL_CENTER_AGENT |
| PrimaryAliasId | Text | Conditional | `ALIAS-20260617-000001` | Must be included in `AliasRegistryIds` when populated | AI_DRAFT_AGENT |
| ServiceKitRegistryIds | EnumList/Text | No | `KIT-GA26FF-SMALL` | Future IDs; use `UNKNOWN` until ServiceKitRegistry exists | AI_DRAFT_AGENT |
| ProductsCatalogIds | EnumList/Text | No | `PROD-123` | Must reference known products when verified | AI_DRAFT_AGENT |
| SourceTables | EnumList/Text | Yes | `ReportEquipmentItems,ProductsCatalog` | Must reference known source tables or approved future registries | FACTORY_CONTROL_CENTER_AGENT |
| EvidenceSource | EnumList/Text | Yes | `Equipment Registry POC` | Must cite source name or checkpoint | FACTORY_CONTROL_CENTER_AGENT |
| EvidenceRecordIds | LongText | Conditional | `ItemID=abc; ReportID=xyz` | Use verified IDs or `UNKNOWN` | FACTORY_CONTROL_CENTER_AGENT |
| ConfidenceScore | Decimal | Yes | `0.84` | 0.00 to 1.00 | AI_DRAFT_AGENT, FACTORY_CONTROL_CENTER_AGENT |
| ApprovalStatus | Enum | Yes | `NEEDS_REVIEW` | `NEEDS_REVIEW`, `APPROVED`, `REJECTED`, `DEPRECATED` | AI_DRAFT_AGENT, FACTORY_CONTROL_CENTER_AGENT |
| ApprovedBy | Text | Conditional | `Tal` | Required when approved | FACTORY_CONTROL_CENTER_AGENT |
| ApprovedAt | DateTime | Conditional | `2026-06-17T12:00:00+03:00` | Required when approved | FACTORY_CONTROL_CENTER_AGENT |
| RejectedReason | LongText | Conditional | `Duplicate model` | Required when rejected | FACTORY_CONTROL_CENTER_AGENT |
| FirstSeenAt | DateTime | No | `2026-06-16T18:00:00+03:00` | First observed date/time or blank | FACTORY_CONTROL_CENTER_AGENT |
| LastSeenAt | DateTime | No | `2026-06-16T18:00:00+03:00` | Must be same or later than `FirstSeenAt` when both exist | FACTORY_CONTROL_CENTER_AGENT |
| LastMatchedAt | DateTime | No | `2026-06-17T12:30:00+03:00` | Updated only by approved workflow | AI_DRAFT_AGENT |
| CreatedAt | DateTime | Yes | `2026-06-17T12:00:00+03:00` | Required on creation | FACTORY_CONTROL_CENTER_AGENT |
| CreatedBy | Text | Yes | `CodexPlan` | Required | FACTORY_CONTROL_CENTER_AGENT |
| UpdatedAt | DateTime | No | `2026-06-17T12:10:00+03:00` | Required on update | FACTORY_CONTROL_CENTER_AGENT |
| UpdatedBy | Text | No | `Tal` | Required when `UpdatedAt` exists | FACTORY_CONTROL_CENTER_AGENT |
| Notes | LongText | No | `POC candidate; needs kit mapping` | Must not contain secrets | FACTORY_CONTROL_CENTER_AGENT |

## 7. Primary Key Strategy

Primary key: `EquipmentId`

Preferred format for model-level rows:

```text
EQ-{NORMALIZED_MODEL}
```

Example:

```text
EQ-GA26FF
```

Fallback format when manufacturer/model collision exists:

```text
EQ-{MANUFACTURER_CODE}-{NORMALIZED_MODEL}
```

Rules:

- `EquipmentId` is immutable.
- Do not use raw report model text as the key.
- Do not use serial number as the key; serial numbers belong to customer assets, not canonical model definitions.
- If two manufacturers share a normalized model string, add manufacturer code.
- If the model is unknown, use a temporary review key only after approval of an import process, such as `EQ-REVIEW-YYYYMMDD-NNNNNN`.

## 8. Relationship To AliasRegistry

`AliasRegistry` normalizes raw text. `EquipmentRegistry` owns canonical equipment identity.

Flow:

```text
Raw equipment model/type from ReportEquipmentItems
-> AliasRegistry lookup
-> EquipmentRegistry canonical row
-> ServiceKitRegistry / ProductsCatalog / history lookup
```

Rules:

- `EquipmentRegistry.NormalizedModel` should match the canonical normalized model.
- Raw variants such as spacing, punctuation, language, or historical labels belong in `AliasRegistry`.
- `AliasRegistry.CanonicalEntityType=EquipmentRegistry` should point to `EquipmentRegistry.EquipmentId`.
- AI Draft may use EquipmentRegistry only through approved aliases or exact approved canonical matches.
- If AliasRegistry and EquipmentRegistry disagree, AI Draft must mark the match as `NeedsReview` and must not increase confidence from that match.

## 9. Relationship To ServiceKitRegistry

`ServiceKitRegistry` is the future governed source for service packages, parts, labor assumptions, and kit-to-model compatibility.

Relationship:

- `EquipmentRegistry` identifies the equipment.
- `ServiceKitRegistry` identifies the recommended service kit for that equipment and service type.
- `ProductsCatalog` identifies individual products/parts and prices.

Recommended future relationship:

```text
EquipmentRegistry.EquipmentId
-> ServiceKitRegistry.CompatibleEquipmentIds
-> ServiceKitRegistry line items
-> ProductsCatalog / historical pricing
```

Rules:

- `EquipmentRegistry` must not duplicate service-kit line items.
- `EquipmentRegistry.ServiceKitRegistryIds` may store approved compatible kit IDs after ServiceKitRegistry exists.
- Dryer-specific repairs should not be forced into compressor service kits; they may require separate dryer service-kit rows.
- If no approved service kit exists, AI Draft can still use equipment history but must keep approval flags.

## 10. Equipment Family Rules

Initial families:

| Family | Rule | Notes |
|---|---|---|
| `COMPRESSOR` | Equipment that compresses air or gas | Main current focus |
| `DRYER` | Dryer or air-treatment equipment | Needs separate service/repair logic from compressor service kits |
| `FILTER` | Standalone filtration equipment | Often linked to system, not model-specific compressor |
| `VACUUM` | Vacuum equipment | Future/unknown current use |
| `OTHER` | Known equipment outside approved families | Requires notes |
| `UNKNOWN` | Insufficient evidence | Cannot be approved for automated matching |

Compressor category rules:

- `SMALL`: use only when supported by model, HP/kW, service-kit POC, or approved maintainer decision.
- `MEDIUM`: use only when supported by evidence.
- `LARGE`: use only when supported by evidence.
- `UNKNOWN`: default when evidence is insufficient.

Model rules:

- Use exact model when available, for example `GA26FF`.
- Keep model series separately, for example `GA`.
- Do not infer manufacturer, HP, kW, oil type, or controller from model string unless the source evidence supports it.
- Integrated dryer indicators such as `FF` may set `DryerIntegrated=TRUE` only after approval or source evidence.

## 11. Approval Workflow

Proposed workflow:

1. Import Equipment Registry POC candidates as `NEEDS_REVIEW`, `Enabled=FALSE`, `VersionStatus=DRAFT`.
2. Reviewer verifies source evidence, canonical model, family, equipment type, duplicate status, and AliasRegistry relationship.
3. Reviewer either rejects, keeps in review, or approves.
4. On approval, set `ApprovalStatus=APPROVED`, `Enabled=TRUE`, `VersionStatus=ACTIVE`, `ApprovedBy`, and `ApprovedAt`.
5. AI Draft may use only active approved enabled equipment rows.
6. Deprecated or corrected rows must be retained for audit and marked inactive.

No automatic approval is allowed from POC confidence alone.

## 12. Data Ownership

| Area | Owner | Responsibility |
|---|---|---|
| Registry structure | INFRASTRUCTURE_MANAGER_AGENT | Approves schema and protected-system boundaries |
| Equipment content | Human owner / assigned technical maintainer | Approves canonical equipment rows |
| Alias linkage | AI_DRAFT_AGENT with human approval | Uses and recommends alias-to-equipment mapping |
| Service-kit linkage | Future service-kit owner | Links approved kits after ServiceKitRegistry exists |
| Audit | FACTORY_CONTROL_CENTER_AGENT | Validates schema, duplicates, approvals, evidence, and usage |
| Runtime implementation | Not approved yet | Requires separate approval |

## 13. Maintenance Workflow

Recommended cadence:

- Weekly during AI Draft pilot.
- After new service report batches are analyzed.
- After AliasRegistry updates that affect equipment model/type aliases.
- Before ServiceKitRegistry rollout.

Maintenance steps:

1. Review `NEEDS_REVIEW` equipment rows.
2. Confirm model/family/type from evidence.
3. Check duplicates by manufacturer, normalized model, and family.
4. Link approved AliasRegistry rows.
5. Link approved ProductCatalog IDs only when compatibility is verified.
6. Defer service-kit links until ServiceKitRegistry exists.
7. Deprecate stale rows instead of deleting them.
8. Run a Factory Control Center audit after meaningful changes.

## 14. How AI_DRAFT_AGENT Uses It

AI_DRAFT_AGENT may use `EquipmentRegistry` as read-only lookup after approved implementation.

Lookup flow:

```text
ReportEquipmentItems model/type/category
-> normalize through AliasRegistry
-> resolve EquipmentRegistry row
-> find same equipment model history
-> find same family/type history
-> find compatible service kits when approved
-> find compatible catalog products
-> produce recommendation with confidence and approval flags
```

Allowed use:

- Improve same-equipment historical pricing.
- Improve same-equipment service pattern detection.
- Distinguish compressor, dryer, and other equipment families.
- Support future service-kit lookup.
- Explain equipment evidence in `AIReasoning`.

Forbidden use:

- Do not use unapproved, disabled, rejected, or deprecated equipment rows.
- Do not treat family-only matches as exact model matches.
- Do not create `BusinessDocuments` or `BusinessDocumentItems` without separate AI Draft write approval.
- Do not create Maven documents.
- Do not remove `NeedsPriceApproval` when equipment match is low-confidence, family-only, or missing service-kit/product evidence.

## 15. How FACTORY_CONTROL_CENTER_AGENT Audits It

Audit checks:

| Check | Pass condition |
|---|---|
| Schema | Header matches approved plan after implementation |
| Primary keys | Every `EquipmentId` is unique and immutable |
| Required fields | Required columns are populated |
| Duplicate models | No active approved duplicate for same manufacturer, normalized model, and family |
| Approval integrity | Approved rows have approver and timestamp |
| Evidence | Rows cite source tables and evidence source |
| Alias links | `PrimaryAliasId` exists in `AliasRegistryIds` when populated |
| Service-kit links | Kit IDs are `UNKNOWN` or point to approved future ServiceKitRegistry rows |
| Family rules | Family/type/category values follow section 10 |
| AI safety | AI Draft uses only active approved enabled rows |
| Protected systems | No Apps Script, Google Sheets, AppSheet, Maven, Drive, deploy, or AutomationCommands change occurred without approval |

Audit statuses:

- `PASS`
- `PASS_WITH_GAPS`
- `NEEDS_DISCOVERY`
- `FAIL`
- `BLOCKED_BY_APPROVAL`

## 16. Safe Rollout Plan

Phase 0 - Plan review:

- Review this document.
- Confirm storage location and schema.
- Confirm content owner and approver.
- Do not create sheets or AppSheet tables.

Phase 1 - Evidence readiness:

- Locate or reconstruct Equipment Registry POC candidate output.
- Confirm candidate source records from `ReportEquipmentItems`, `ProductsCatalog`, and Maven history.
- Confirm no existing `EquipmentRegistry` sheet exists through approved read-only metadata check.

Phase 2 - Approved sheet creation:

- After explicit approval, create the `EquipmentRegistry` tab with the exact header row.
- Do not add Apps Script automation.
- Do not call Maven.
- Do not deploy.

Phase 3 - Candidate import:

- Import candidates as `NEEDS_REVIEW`, `Enabled=FALSE`, `VersionStatus=DRAFT`.
- Use `UNKNOWN` for unverified attributes.
- Do not auto-approve rows.

Phase 4 - Alias linkage:

- Link only approved AliasRegistry rows.
- Keep unresolved alias relationships as `UNKNOWN`.

Phase 5 - AppSheet review UX:

- After separate approval, add AppSheet table and internal review slices.
- Disable deletes.
- Keep bots disabled in first rollout.

Phase 6 - Read-only AI Draft use:

- Allow AI Draft to read active approved enabled equipment rows.
- Keep recommendation writes and Maven actions separately approval-gated.

Phase 7 - Audit and brain update:

- Factory Control Center audits schema, duplicates, approvals, and usage.
- Project Brain and registries are updated only after approved implementation.

## 17. Backout Plan

If implementation creates unsafe or confusing matches:

1. Disable AI Draft use of `EquipmentRegistry`.
2. Set affected rows to `Enabled=FALSE` or `VersionStatus=DEPRECATED`.
3. Preserve rows for audit; do not delete by default.
4. Hide or disable AppSheet slices/table after approval if needed.
5. Restore AI Draft to previous matching logic: direct catalog match, same equipment text history, same customer history, similar service history, and approval-gated AI estimate.
6. Keep `AliasRegistry` active only if its mappings are unaffected.
7. Record the backout reason in a checkpoint after approval.

## 18. Validation Tests

Documentation validation:

- File exists at `project-brain/implementation/EQUIPMENT_REGISTRY_IMPLEMENTATION_PLAN.md`.
- All 20 requested sections are present.
- No Apps Script, Google Sheets, AppSheet, Maven, Drive, deploy, or commit action occurred.
- `git diff --stat` shows only documentation scope.

Schema validation after approved implementation:

- Header row exactly matches section 4.
- `EquipmentId` is unique and nonblank.
- Required fields are populated.
- Enum values match approved lists.
- `ConfidenceScore` is between 0 and 1.
- Approved rows have `ApprovedBy` and `ApprovedAt`.
- Rejected rows have `RejectedReason`.

Relationship validation:

- Any populated `PrimaryAliasId` appears inside `AliasRegistryIds`.
- Any populated AliasRegistry ID exists and points back to `EquipmentRegistry`.
- Service-kit IDs remain `UNKNOWN` until ServiceKitRegistry exists.
- `ProductsCatalogIds` are populated only when verified.

AI Draft validation after approved read-only use:

- Exact model match has higher confidence than family-only match.
- Family-only match does not suppress `NeedsPriceApproval`.
- Rejected/deprecated equipment rows are ignored.
- Dryer rows do not use compressor service-kit assumptions unless explicitly approved.

Factory Control Center validation:

- Audit detects duplicate active approved normalized model rows.
- Audit detects approved rows missing evidence.
- Audit detects unapproved service-kit links.
- Audit reports unresolved POC evidence as `UNKNOWN`, not invented IDs.

## 19. Definition of Done

This planning mission is done when:

- `project-brain/implementation/EQUIPMENT_REGISTRY_IMPLEMENTATION_PLAN.md` exists.
- The document includes all 20 requested sections.
- It clearly states that `EquipmentRegistry` is proposed, not created.
- It defines storage, schema, AppSheet structure, columns, key strategy, relationships, family rules, approval workflow, ownership, maintenance, AI usage, audit, rollout, backout, validation, and next step.
- No runtime or production system was modified.
- No commit was made.
- `git diff --stat` was shown.

Future implementation is done only when:

- Human approval is recorded.
- The Google Sheets tab exists with approved schema.
- AppSheet table settings are reviewed and approved.
- Candidates are imported as review-only first.
- Factory Control Center audit passes or lists controlled gaps.
- Project Brain and `SHEETS_REGISTRY.md` are updated after approved schema creation.

## 20. Next Safe Implementation Step

Run an approval-gated readiness review:

```text
EQUIPMENT-REGISTRY-READINESS-REVIEW
-> confirm storage decision
-> locate or reconstruct Equipment Registry POC candidates
-> confirm owner and approver
-> confirm relationship to AliasRegistry
-> confirm ServiceKitRegistry dependency remains future-only
-> request explicit approval to create Google Sheets tab EquipmentRegistry
```

Until that approval exists, `EquipmentRegistry` remains a proposed design only.

## Evidence Notes

Direct evidence used:

- `agents/PRE_MISSION_REVIEW_SYSTEM.md`: mission review requirements.
- `project-brain/checkpoints/NEXT_SESSION.md`: current state, Equipment Registry POC status, risks, and next mission sequence.
- `project-brain/implementation/ALIAS_REGISTRY_IMPLEMENTATION_PLAN.md`: approved documentation plan for alias-to-canonical mapping relationship.
- `project-brain/registries/FACTORY_ASSET_REGISTRY.md`: current assets, protected systems, and relevant table/agent status.
- `agents/FACTORY_CONTROL_CENTER_AGENT.md`: audit requirements and forbidden production actions.
- `agents/AI_DRAFT_AGENT.md`: AI Draft inputs, matching priority, recommendation-only status, and approval rules.
- `project-brain/maps/AI_DRAFT_FIELD_MAPPING.md`: source table fields and historical matching context.
- `data-sources/tools/SHEETS_REGISTRY.md`: existing table list and current absence of a documented `EquipmentRegistry` table.

Evidence not independently found as a separate file:

- Equipment Registry POC output

The POC is treated as checkpoint-referenced evidence until a separate source artifact is provided or reconstructed.
