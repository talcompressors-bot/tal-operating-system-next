# ALIAS REGISTRY IMPLEMENTATION PLAN

Status: Proposed implementation plan  
Mission: ALIAS-REGISTRY-IMPLEMENTATION-PLAN  
Date: 2026-06-17  
Mode: Documentation only  
Production impact: None  

## Pre-Mission Review Output

Mission Name: ALIAS-REGISTRY-IMPLEMENTATION-PLAN

Phase: PHASE 1 - Digital Twin Foundation

Objective: Create a governed implementation plan for turning validated alias candidates into a real `AliasRegistry`.

Builder Agent: AI_DRAFT_AGENT

Auditor Agent: FACTORY_CONTROL_CENTER_AGENT

Discovery Required: No for this documentation plan. Yes before production creation, because the completed Product Matching Audit, Alias Registry Design, Alias Registry Build Report, Equipment Registry POC, Service Kit Registry Build, Pricing Intelligence Model, and AI Draft Pricing POC are referenced in `project-brain/checkpoints/NEXT_SESSION.md` but were not found as separate repository files.

Existing Assets Found:

- `data-sources/tools/SHEETS_REGISTRY.md` documents existing live sheets and confirms no `AliasRegistry` sheet exists in the current registry.
- `project-brain/maps/AI_DRAFT_FIELD_MAPPING.md` documents AI Draft source tables and matching needs.
- `agents/AI_DRAFT_AGENT.md` documents recommendation-only behavior and historical pricing requirements.
- `project-brain/registries/FACTORY_ASSET_REGISTRY.md` documents current assets and protected systems.
- `project-brain/checkpoints/NEXT_SESSION.md` documents the latest alias, equipment, service-kit, pricing, and AI Draft POC results.

Reuse Decision: Create New, after approval, because no existing live table is documented as the governed alias source. Existing assets are reused as evidence and consumers, not as the alias storage location.

Affected Tables:

- Proposed new table: `AliasRegistry`
- Read-only consumers/sources: `ServiceReports`, `ReportEquipmentItems`, `PartsUsed`, `ProductsCatalog`, `InvoiceMavenItems`, `InvoiceMavenDocumentItems`, `BusinessDocuments`, `BusinessDocumentItems`, `AIDraftSuggestions`

Affected Agents:

- `AI_DRAFT_AGENT`
- `FACTORY_CONTROL_CENTER_AGENT`
- `INFRASTRUCTURE_MANAGER_AGENT`
- future QA/System Health agent

Affected Workflows:

- AI Draft recommendation matching
- Product/catalog matching
- Equipment/service-kit matching
- Future audit and approval workflow for alias promotion

Protected Systems:

- Apps Script
- Google Sheets live data
- AppSheet production
- Maven
- Drive
- AutomationCommands
- BusinessDocuments workflow
- Report counter and Drive folder logic

Required Evidence:

- Existing table list from `SHEETS_REGISTRY.md`
- AI Draft source and output mapping from `AI_DRAFT_FIELD_MAPPING.md`
- AI Draft pricing and approval rules from `AI_DRAFT_AGENT.md`
- Production protection rules from `PROJECT_OPERATING_PROTOCOL.md`, `CURRENT_TASK.md`, and `ROADMAP.md`
- Latest POC status from `NEXT_SESSION.md`

Validation Tests:

- Confirm the plan covers every requested section.
- Confirm no production files or runtime code were modified.
- Confirm `AliasRegistry` is documented as proposed, not created.
- Confirm all production writes remain approval-gated.

Practical Verification:

- A future implementer can create the sheet/AppSheet table from this plan after explicit approval.
- A future auditor can test duplicate prevention, approval status, and AI Draft consumption rules.

Brain Updates Required:

- After approval/adoption, update `SHEETS_REGISTRY.md`, `FACTORY_ASSET_REGISTRY.md`, `PROJECT_BRAIN_MASTER.md`, roadmap/checkpoint, and relevant maps. This mission does not update those files unless separately approved.

Infrastructure Manager Decision: CREATE_NEW as documentation-only plan. Production implementation remains blocked by human approval.

Next Safe Step: Review and approve or revise this plan. If approved, run a read-only implementation readiness review before creating the `AliasRegistry` sheet.

## 1. Purpose

`AliasRegistry` will be the governed source for mapping messy field values, historical item names, product descriptions, equipment model variants, and service-kit aliases to canonical entities used by AI Draft recommendations.

The registry is needed because current AI Draft evidence shows useful recommendation coverage but no production-ready automatic drafts. `NEXT_SESSION.md` records 20/20 simulated recommendations, average confidence of 56.8%, and 0/20 production-ready drafts. The documented blocker is knowledge registry maturity.

## 2. Why AliasRegistry Is Needed

The current data sources contain useful but inconsistent matching signals:

- `ProductsCatalog` is the primary pricing source but matching depends on product names, SKUs, descriptions, and compatible equipment.
- `InvoiceMavenItems` and `InvoiceMavenDocumentItems` contain historical item names that may not equal catalog names.
- `ReportEquipmentItems` contains equipment model and service descriptions that require normalization before reliable equipment/service-kit matching.
- `PartsUsed` exists but its live row-1 schema is incomplete in `SHEETS_REGISTRY.md`, so AI Draft cannot rely on it as a clean source without discovery.
- `NEXT_SESSION.md` records that alias, equipment, service-kit, and pricing POC work exists but is not implemented as governed runtime tables.

Without a governed alias layer, AI Draft must repeatedly infer whether values such as model variants, Hebrew/English item names, historical Maven line descriptions, and catalog names refer to the same thing. That keeps confidence low and forces every recommendation into manual approval.

## 3. Exact Storage Location Recommendation

Recommended canonical storage:

- Spreadsheet: existing `ServiceApp_FIX`
- New Google Sheets tab: `AliasRegistry`
- Future AppSheet table name: `AliasRegistry`
- Repository documentation plan: `project-brain/implementation/ALIAS_REGISTRY_IMPLEMENTATION_PLAN.md`

This plan recommends the location only. Creating the Google Sheets tab or AppSheet table is a schema change and requires explicit human approval under `PROJECT_OPERATING_PROTOCOL.md`.

Recommended reason:

- `ServiceApp_FIX` already contains `ProductsCatalog`, `InvoiceMavenItems`, `InvoiceMavenDocumentItems`, `AIDraftSuggestions`, `BusinessDocuments`, and `BusinessDocumentItems`.
- AI Draft matching needs to use the same operational data boundary as the existing service-report and business-document workflow.
- AppSheet can later expose an approval/maintenance UX over the same table without adding another external store.

Not recommended as canonical storage:

- Markdown only: useful for design, but not enough for AppSheet approvals or AI Draft runtime lookup.
- Separate spreadsheet: increases sync, permission, and source-of-truth risk.
- Apps Script constants: unsafe for governed maintenance and requires code deploys for normal alias updates.

## 4. Exact Google Sheets Table Structure

Sheet name: `AliasRegistry`

Header row:

```text
AliasId, RegistryVersion, VersionStatus, Enabled, AliasType, SourceText, NormalizedText, CanonicalEntityType, CanonicalEntityId, CanonicalName, TargetTable, TargetKeyField, SourceTables, MatchScope, MatchMethod, ConfidenceScore, ApprovalStatus, ApprovedBy, ApprovedAt, RejectedReason, EvidenceSource, EvidenceRecordIds, FirstSeenAt, LastSeenAt, LastMatchedAt, CreatedAt, CreatedBy, UpdatedAt, UpdatedBy, Notes
```

Recommended row semantics:

- One row represents one approved, rejected, or review-pending alias mapping.
- `SourceText` preserves the raw observed value.
- `NormalizedText` stores deterministic normalization used for duplicate detection.
- `CanonicalEntityId` points to the approved target entity when a stable target exists.
- `ApprovalStatus` controls whether AI Draft can use the row.

## 5. Exact AppSheet Table Structure

AppSheet table name: `AliasRegistry`

Recommended AppSheet configuration:

| Setting | Recommendation |
|---|---|
| Source | Google Sheets tab `AliasRegistry` in `ServiceApp_FIX` |
| Key | `AliasId` |
| Label | `SourceText` |
| Adds | Allowed only for approved maintainer role after rollout approval |
| Updates | Allowed only for approved maintainer role after rollout approval |
| Deletes | Disabled |
| Are updates allowed before production approval? | No |
| Initial status for imported candidates | `NEEDS_REVIEW` |
| Valid active status | `APPROVED` |
| Bot behavior | No production Bot in first rollout |
| Security filter | Optional later; not required for first internal governance table |
| Slices | `AliasRegistry_ReviewQueue`, `AliasRegistry_Approved`, `AliasRegistry_Rejected`, `AliasRegistry_Duplicates` |

Recommended enum values:

- `VersionStatus`: `DRAFT`, `ACTIVE`, `DEPRECATED`
- `AliasType`: `PRODUCT`, `PART`, `EQUIPMENT_MODEL`, `EQUIPMENT_TYPE`, `SERVICE_TYPE`, `SERVICE_KIT`, `CUSTOMER_NAME`, `MAVEN_ITEM`, `OTHER`
- `CanonicalEntityType`: `ProductsCatalog`, `InvoiceMavenItems`, `EquipmentRegistry`, `ServiceKitRegistry`, `Customer`, `BusinessDocumentItemTemplate`, `UNKNOWN`
- `MatchScope`: `GLOBAL`, `CUSTOMER`, `EQUIPMENT_MODEL`, `EQUIPMENT_TYPE`, `SERVICE_TYPE`
- `MatchMethod`: `MANUAL`, `POC_CANDIDATE`, `HISTORICAL_MATCH`, `CATALOG_MATCH`, `AI_SUGGESTED`
- `ApprovalStatus`: `NEEDS_REVIEW`, `APPROVED`, `REJECTED`, `DEPRECATED`

## 6. Column List

| Column name | Type | Required? | Example | Validation rule | Used by agent |
|---|---|---:|---|---|---|
| AliasId | Text key | Yes | `ALIAS-20260617-000001` | Unique; must start with `ALIAS-`; never reused | AI_DRAFT_AGENT, FACTORY_CONTROL_CENTER_AGENT |
| RegistryVersion | Text | Yes | `v1` | Required; default `v1` for first rollout | FACTORY_CONTROL_CENTER_AGENT |
| VersionStatus | Enum | Yes | `ACTIVE` | One of `DRAFT`, `ACTIVE`, `DEPRECATED` | AI_DRAFT_AGENT, FACTORY_CONTROL_CENTER_AGENT |
| Enabled | Yes/No | Yes | `TRUE` | Must be TRUE for AI use | AI_DRAFT_AGENT |
| AliasType | Enum | Yes | `EQUIPMENT_MODEL` | Must match approved enum list | AI_DRAFT_AGENT, FACTORY_CONTROL_CENTER_AGENT |
| SourceText | Text | Yes | `GA 26 FF` | Trimmed length greater than 0; preserve raw value | AI_DRAFT_AGENT |
| NormalizedText | Text | Yes | `GA26FF` | Uppercase; no spaces or punctuation except approved separators | AI_DRAFT_AGENT, FACTORY_CONTROL_CENTER_AGENT |
| CanonicalEntityType | Enum | Yes | `EquipmentRegistry` | Must match approved enum list; use `UNKNOWN` only for review candidates | AI_DRAFT_AGENT |
| CanonicalEntityId | Text | Conditional | `EQ-GA26FF` | Required when `ApprovalStatus=APPROVED` unless target is name-only and documented in `Notes` | AI_DRAFT_AGENT |
| CanonicalName | Text | Yes | `Atlas Copco GA26FF` | Required for all statuses | AI_DRAFT_AGENT |
| TargetTable | Text | Conditional | `ProductsCatalog` | Required when canonical entity lives in a current or future table | AI_DRAFT_AGENT, FACTORY_CONTROL_CENTER_AGENT |
| TargetKeyField | Text | Conditional | `ProductID` | Required when `TargetTable` is populated | FACTORY_CONTROL_CENTER_AGENT |
| SourceTables | EnumList | Yes | `ReportEquipmentItems,InvoiceMavenDocumentItems` | Must reference known tables or future-approved registry names | AI_DRAFT_AGENT, FACTORY_CONTROL_CENTER_AGENT |
| MatchScope | Enum | Yes | `GLOBAL` | Must match approved enum list | AI_DRAFT_AGENT |
| MatchMethod | Enum | Yes | `POC_CANDIDATE` | Must match approved enum list | FACTORY_CONTROL_CENTER_AGENT |
| ConfidenceScore | Decimal | Yes | `0.82` | Number from 0.00 to 1.00 | AI_DRAFT_AGENT, FACTORY_CONTROL_CENTER_AGENT |
| ApprovalStatus | Enum | Yes | `NEEDS_REVIEW` | One of `NEEDS_REVIEW`, `APPROVED`, `REJECTED`, `DEPRECATED` | AI_DRAFT_AGENT, FACTORY_CONTROL_CENTER_AGENT |
| ApprovedBy | Text | Conditional | `Tal` | Required when `ApprovalStatus=APPROVED` | FACTORY_CONTROL_CENTER_AGENT |
| ApprovedAt | DateTime | Conditional | `2026-06-17T10:30:00+03:00` | Required when `ApprovalStatus=APPROVED` | FACTORY_CONTROL_CENTER_AGENT |
| RejectedReason | LongText | Conditional | `Wrong product family` | Required when `ApprovalStatus=REJECTED` | FACTORY_CONTROL_CENTER_AGENT |
| EvidenceSource | EnumList | Yes | `Alias Registry Build,Equipment Registry POC` | Must name source evidence or checkpoint if source file is missing | FACTORY_CONTROL_CENTER_AGENT |
| EvidenceRecordIds | LongText | Conditional | `ReportID=abc; ItemRowId=xyz` | Use source record IDs where verified; otherwise `UNKNOWN` | AI_DRAFT_AGENT, FACTORY_CONTROL_CENTER_AGENT |
| FirstSeenAt | DateTime | No | `2026-06-16T18:00:00+03:00` | Date/time when candidate was first observed; `UNKNOWN` allowed before import | FACTORY_CONTROL_CENTER_AGENT |
| LastSeenAt | DateTime | No | `2026-06-16T18:00:00+03:00` | Must be same or later than `FirstSeenAt` when both exist | FACTORY_CONTROL_CENTER_AGENT |
| LastMatchedAt | DateTime | No | `2026-06-17T11:00:00+03:00` | Updated by future approved read/write workflow only | AI_DRAFT_AGENT |
| CreatedAt | DateTime | Yes | `2026-06-17T10:00:00+03:00` | Required on row creation | FACTORY_CONTROL_CENTER_AGENT |
| CreatedBy | Text | Yes | `CodexPlan` | Required; use actor or import process name | FACTORY_CONTROL_CENTER_AGENT |
| UpdatedAt | DateTime | No | `2026-06-17T10:15:00+03:00` | Required on update | FACTORY_CONTROL_CENTER_AGENT |
| UpdatedBy | Text | No | `Tal` | Required when `UpdatedAt` exists | FACTORY_CONTROL_CENTER_AGENT |
| Notes | LongText | No | `Candidate from latest POC` | Free text; must not contain secrets | FACTORY_CONTROL_CENTER_AGENT |

## 7. Primary Key Strategy

Primary key: `AliasId`

Recommended format:

```text
ALIAS-YYYYMMDD-NNNNNN
```

Example:

```text
ALIAS-20260617-000001
```

Rules:

- `AliasId` is immutable after creation.
- Do not use `SourceText` or `NormalizedText` as the primary key because aliases can be corrected, deprecated, or scoped.
- Use a generated unique ID in AppSheet when implementation is approved.
- Preserve deprecated rows for audit; do not delete and recreate keys.

## 8. Duplicate Prevention Rules

Logical duplicate key:

```text
AliasType + NormalizedText + CanonicalEntityType + CanonicalEntityId + MatchScope
```

Duplicate prevention rules:

- Only one row with the same logical duplicate key may have `ApprovalStatus=APPROVED` and `Enabled=TRUE`.
- `NormalizedText` must be generated by the same deterministic rule for every row.
- `SourceText` variants can exist only when their `NormalizedText` differs or their `MatchScope` is intentionally different.
- Rejected duplicates must stay as `REJECTED` for audit history.
- Deprecated active rows must be changed to `DEPRECATED` before a replacement alias is approved.
- If `CanonicalEntityId` is `UNKNOWN`, the row cannot be `APPROVED`.

Suggested normalization rule for first rollout:

```text
UPPER(TRIM(SourceText)), remove spaces, hyphens, underscores, periods, quotes, and duplicate whitespace.
```

Examples:

| SourceText | NormalizedText |
|---|---|
| `GA 26 FF` | `GA26FF` |
| `GA-26FF` | `GA26FF` |
| `ga26 ff` | `GA26FF` |

## 9. Approval Workflow

Proposed workflow:

1. Import or manually enter alias candidates with `ApprovalStatus=NEEDS_REVIEW`, `Enabled=FALSE`, `VersionStatus=DRAFT`.
2. Reviewer checks source evidence, canonical target, duplicate key, and confidence score.
3. Reviewer either rejects, keeps in review, or approves.
4. On approval, set `ApprovalStatus=APPROVED`, `Enabled=TRUE`, `VersionStatus=ACTIVE`, `ApprovedBy`, and `ApprovedAt`.
5. AI Draft may use only rows where `ApprovalStatus=APPROVED`, `Enabled=TRUE`, and `VersionStatus=ACTIVE`.
6. If a mapping becomes wrong or stale, set `ApprovalStatus=DEPRECATED` or `VersionStatus=DEPRECATED`; do not delete the row.

Human approval is required before any production write, sheet creation, AppSheet table creation, bot creation, or Apps Script implementation.

## 10. Data Ownership

| Area | Owner | Responsibility |
|---|---|---|
| Registry governance | INFRASTRUCTURE_MANAGER_AGENT | Approves structure and protects production boundaries |
| Alias content | Human owner / assigned maintainer | Approves or rejects alias mappings |
| AI consumption rules | AI_DRAFT_AGENT | Uses only approved rows and explains match source |
| Audit | FACTORY_CONTROL_CENTER_AGENT | Checks completeness, duplicates, stale rows, and approval compliance |
| Future validation | QA/System Health agent | Runs read-only validation checks after approval |

## 11. Maintenance Workflow

Recommended maintenance cadence:

- Weekly during AI Draft pilot.
- Before each AI Draft rollout milestone.
- After any Product Matching Audit, Equipment Registry POC, Service Kit Registry Build, or Pricing POC update.

Maintenance steps:

1. Review `NEEDS_REVIEW` rows.
2. Reject low-quality or unsupported rows.
3. Approve only rows with clear canonical targets and evidence.
4. Deprecate stale mappings instead of deleting them.
5. Run duplicate checks.
6. Run sample AI Draft recommendations and confirm alias evidence appears in reasoning.
7. Record meaningful registry changes in Project Brain or a checkpoint after approval.

## 12. How AI_DRAFT_AGENT Uses It

AI_DRAFT_AGENT may use `AliasRegistry` only as a read-only lookup until a separate write workflow is approved.

Lookup flow:

```text
Raw input value
-> normalize value
-> filter AliasRegistry where Enabled=TRUE, VersionStatus=ACTIVE, ApprovalStatus=APPROVED
-> match by AliasType and NormalizedText
-> resolve CanonicalEntityType and CanonicalEntityId
-> use canonical target for catalog/history/service-kit search
-> include alias evidence in AIReasoning
```

Allowed use:

- Normalize equipment models from `ReportEquipmentItems`.
- Normalize product, part, and Maven item names from `ProductsCatalog`, `InvoiceMavenItems`, and `InvoiceMavenDocumentItems`.
- Improve historical pricing lookups.
- Increase confidence when canonical matches are approved and supported by evidence.

Forbidden use:

- Do not use `NEEDS_REVIEW`, `REJECTED`, `DEPRECATED`, or disabled rows for pricing decisions.
- Do not create Maven documents based on aliases.
- Do not write `BusinessDocuments` or `BusinessDocumentItems` without a separately approved AI Draft write stage.
- Do not suppress `NeedsPriceApproval` when price evidence remains weak.

## 13. How FACTORY_CONTROL_CENTER_AGENT Audits It

Factory Control Center audit checks:

| Check | Pass condition |
|---|---|
| Schema exists | Header matches this plan after approved implementation |
| No hidden production change | Implementation was approved and documented |
| Primary keys | Every row has unique `AliasId` |
| Duplicate key | No two active approved rows share the logical duplicate key |
| Approval integrity | Approved rows have `ApprovedBy` and `ApprovedAt` |
| Target integrity | Approved rows have `CanonicalEntityId` unless documented as name-only |
| Evidence integrity | Rows cite evidence source and record IDs or `UNKNOWN` |
| AI safety | AI Draft uses only active approved enabled rows |
| Stale rows | Deprecated mappings are not active |
| Protected systems | No Apps Script, Maven, Drive, AppSheet production, or AutomationCommands change occurred without approval |

Audit output should classify findings as `PASS`, `PASS_WITH_GAPS`, `NEEDS_DISCOVERY`, or `FAIL`.

## 14. Safe Rollout Plan

Phase 0 - Plan review:

- Review this document.
- Confirm whether the recommended storage location is accepted.
- Decide who owns alias approval.
- Do not create any sheet or AppSheet table.

Phase 1 - Read-only readiness:

- Re-run `SHEETS_REGISTRY.md` read-only metadata check or equivalent approved read-only inspection.
- Confirm no existing `AliasRegistry` sheet was added outside governance.
- Locate or reconstruct the latest alias candidate evidence from POC outputs.

Phase 2 - Approved sheet creation:

- After explicit approval, create `AliasRegistry` tab with the exact header row.
- Do not add Apps Script automation.
- Do not create Maven actions.
- Do not connect AI Draft runtime writes.

Phase 3 - Candidate import:

- Import candidates as `NEEDS_REVIEW`, `Enabled=FALSE`, `VersionStatus=DRAFT`.
- Preserve evidence source names and record IDs where known.
- Do not approve automatically.

Phase 4 - AppSheet review UX:

- After separate approval, add AppSheet table and review slices.
- Disable deletes.
- Keep bots disabled unless separately approved.

Phase 5 - Read-only AI Draft lookup:

- After validation, allow AI Draft to read approved aliases.
- Output match evidence in recommendation reasoning.
- Keep `NeedsPriceApproval` true when price evidence is still weak.

Phase 6 - Audit and checkpoint:

- Factory Control Center audits schema, duplicates, approval integrity, and usage.
- Project Brain updates are proposed or applied only with approval.

## 15. Backout Plan

If implementation causes confusion or unsafe matching:

1. Disable AI Draft use of `AliasRegistry`.
2. Set affected rows to `Enabled=FALSE` or `VersionStatus=DEPRECATED`.
3. Do not delete rows; preserve audit history.
4. If AppSheet table was added, hide or disable the table/slices after approval.
5. If no production workflow depends on the table, leave the sheet as inactive documentation data.
6. Restore AI Draft to previous matching behavior: catalog direct match, same equipment history, same customer history, similar service history, and approval-gated AI estimate.
7. Record backout reason in a checkpoint.

## 16. Validation Tests

Documentation validation:

- Confirm this file contains all 18 requested sections.
- Confirm no Apps Script files changed.
- Confirm no Google Sheets/AppSheet/Maven/Drive action occurred.
- Confirm `git diff --stat` includes only documentation scope.

Schema validation after approved implementation:

- Header row exactly matches section 4.
- `AliasId` is unique and nonblank.
- Required fields are populated.
- Enum values match approved lists.
- Active approved duplicate-key conflicts count is zero.
- `ConfidenceScore` is between 0 and 1.
- Approved rows have `ApprovedBy` and `ApprovedAt`.
- Rejected rows have `RejectedReason`.

AI Draft validation after approved read-only lookup:

- Given `GA 26 FF`, lookup resolves to the same canonical mapping as `GA26FF` if an approved row exists.
- Given a rejected alias, AI Draft does not use it.
- Given an approved alias with weak price history, AI Draft still sets `NeedsPriceApproval=TRUE`.
- Recommendation output includes alias source evidence in `AIReasoning`.

Factory Control Center validation:

- Audit detects duplicate active approved aliases.
- Audit detects approved rows with missing evidence.
- Audit detects use of disabled aliases.
- Audit reports unknown POC evidence as `UNKNOWN` rather than inventing IDs.

## 17. Definition of Done

This planning mission is done when:

- `project-brain/implementation/ALIAS_REGISTRY_IMPLEMENTATION_PLAN.md` exists.
- The plan includes purpose, storage, Google Sheets structure, AppSheet structure, columns, key strategy, duplicate rules, approval workflow, ownership, maintenance, agent usage, audit, rollout, backout, validation, definition of done, and next step.
- The plan clearly states that production creation is not approved.
- No Apps Script, Google Sheets, AppSheet, Maven, Drive, AutomationCommands, deployment, or commit action occurred.
- `git diff --stat` was reviewed.

Future implementation is done only when:

- Human approval is recorded.
- The sheet exists with the approved schema.
- AppSheet table settings are reviewed and approved.
- Initial candidates are imported as `NEEDS_REVIEW`, not active.
- Factory Control Center audit passes or lists controlled gaps.
- Project Brain and `SHEETS_REGISTRY.md` are updated after approved schema creation.

## 18. Next Safe Implementation Step

Run an approval-gated readiness review before creating the table:

```text
ALIAS-REGISTRY-READINESS-REVIEW
-> confirm storage decision
-> locate or reconstruct alias candidate evidence
-> confirm approver and maintainer
-> confirm exact schema
-> request explicit approval to create Google Sheets tab AliasRegistry
```

Until that approval exists, the registry remains a proposed design only.

## Evidence Notes

Evidence directly available in the repository:

- `PROJECT_OPERATING_PROTOCOL.md`: source-of-truth, approval, reuse, and schema-change rules.
- `PROJECT_INDEX.md`: current phase and stable systems.
- `project-brain/CURRENT_TASK.md`: Phase 1 read-only mapping and protected systems.
- `project-brain/roadmap/ROADMAP.md`: Digital Twin read-only phase and AI Draft approval gates.
- `agents/PRE_MISSION_REVIEW_SYSTEM.md`: mandatory review and output requirements.
- `agents/INFRASTRUCTURE_MANAGER_AGENT.md`: review requirements for new registries/tables.
- `agents/FACTORY_CONTROL_CENTER_AGENT.md`: audit requirements and forbidden production actions.
- `agents/AI_DRAFT_AGENT.md`: AI Draft inputs, pricing priority, approval rules, and forbidden actions.
- `project-brain/maps/AI_DRAFT_FIELD_MAPPING.md`: AI Draft source tables, pricing priority, and approval flags.
- `data-sources/tools/SHEETS_REGISTRY.md`: current live sheet headers and absence of an existing `AliasRegistry` entry.
- `project-brain/checkpoints/NEXT_SESSION.md`: latest checkpoint listing Product Matching Audit, Alias Registry Design, Alias Registry Build, Equipment Registry POC, Service Kit Registry Build, Pricing Intelligence Model, and AI Draft Pricing POC results.

Evidence not found as separate files:

- Product Matching Audit
- Alias Registry Design
- Alias Registry Build Report
- Equipment Registry POC
- Service Kit Registry Build
- Pricing Intelligence Model
- AI Draft Pricing POC

These names are treated as checkpoint-referenced evidence, not independently verified artifacts, until their source files or outputs are provided or reconstructed.
