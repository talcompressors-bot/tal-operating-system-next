# AI DRAFT RUNTIME BLUEPRINT

Status: Proposed runtime blueprint  
Mission: AI_DRAFT_RUNTIME_BLUEPRINT  
Date: 2026-06-17  
Mode: Documentation only  
Production impact: None  

## Runtime Boundary

This blueprint describes the full intended AI Draft runtime flow. It does not approve code changes, table creation, Maven calls, AppSheet changes, deployment, commits, or production writes.

Current checkpoint status:

- AI Draft is validated for read-only recommendation simulations only.
- AI Draft is not approved for production draft creation, Maven creation, customer sending, invoice finalization, or payment status changes.
- AliasRegistry, EquipmentRegistry, ServiceKitRegistry, and PricingRegistry are planned or POC/design outputs only, not approved runtime tables.

## 1. Every Input

Primary trigger inputs:

| Input | Source | Purpose | Required? |
|---|---|---|---|
| `ReportID` | User/AppSheet/AI Draft request | Stable service report lookup key | Yes |
| `ReportCounter` | `ServiceReports` or user input | Human report number and fallback lookup | Conditional |
| Requested document type | User or AI default | Quote/invoice recommendation type | Conditional |
| User identity | AppSheet/user context | Approval and audit attribution | Yes before writes |
| Approval action | AppSheet/user action | Allows internal draft creation or Maven queue execution | Yes before writes |

Service report inputs:

| Input | Table | Purpose |
|---|---|---|
| `ServiceReports.ReportID` | `ServiceReports` | Parent report key |
| `ServiceReports.ReportCounter` | `ServiceReports` | Human report number |
| `ServiceReports.CustomerID` | `ServiceReports` | Customer matching |
| `ServiceReports.CustomerName` | `ServiceReports` | Customer label and reasoning |
| Service date/time fields | `ServiceReports` | Timing context |
| Technician | `ServiceReports` | Work attribution |
| Service type | `ServiceReports` | Service-kit and document recommendation |
| Technician work time | `ServiceReports` | Labor estimate |
| Summary/notes/recommendations | `ServiceReports` | Reasoning and missing-data checks |

Equipment inputs:

| Input | Table | Purpose |
|---|---|---|
| `ReportEquipmentItems.ReportID` | `ReportEquipmentItems` | Link to report |
| Equipment type/subtype | `ReportEquipmentItems` | Equipment matching |
| Equipment model | `ReportEquipmentItems` | Exact/fuzzy model matching |
| Serial number | `ReportEquipmentItems` | Evidence only, not canonical model key |
| Compressor category | `ReportEquipmentItems` | Service-kit and family matching |
| Service description | `ReportEquipmentItems` | Kit and item inference |
| Technician recommendations | `ReportEquipmentItems` | Suggested items/risk notes |
| Next service info | `ReportEquipmentItems` | Service interval reasoning |

Parts and catalog inputs:

| Input | Table | Purpose |
|---|---|---|
| Part name | `PartsUsed` | Suggested item candidate |
| Quantity | `PartsUsed` | Item quantity candidate |
| Part SKU | `PartsUsed` | Catalog match candidate |
| `ProductsCatalog.ProductID` | `ProductsCatalog` | Product identity |
| `ProductsCatalog.SKU` | `ProductsCatalog` | Direct product match |
| `ProductsCatalog.ProductName` | `ProductsCatalog` | Item match |
| `ProductsCatalog.SellingPrice` | `ProductsCatalog` | Price source |
| `ProductsCatalog.CompatibleEquipment` | `ProductsCatalog` | Compatibility evidence |

Historical inputs:

| Input | Table | Purpose |
|---|---|---|
| Previous documents | `InvoiceMavenDocuments` | Customer/document history |
| Previous line items | `InvoiceMavenDocumentItems` | Historical item prices |
| Internal business docs | `BusinessDocuments` | Existing draft/history context |
| Internal line items | `BusinessDocumentItems` | Internal historical line items |

Planned registry inputs:

| Input | Planned table | Purpose |
|---|---|---|
| Alias mappings | `AliasRegistry` | Normalize raw text to canonical entities |
| Equipment models/families | `EquipmentRegistry` | Canonical equipment identity |
| Service kits | `ServiceKitRegistry` | Approved service package candidates |
| Pricing rules | `PricingRegistry` | Future approved pricing authority |

## 2. Every Table Used

Current documented tables:

| Table | Runtime role | Write allowed in this blueprint? |
|---|---|---|
| `ServiceReports` | Source report and final draft flags after approved execution | No |
| `ReportEquipmentItems` | Equipment/service context | No |
| `Customers_Final` | Customer identity and context | No |
| `PartsUsed` | Parts evidence; schema incomplete in registry | No |
| `ProductsCatalog` | Primary catalog and price source | No |
| `InvoiceMavenDocuments` | Maven document history | No |
| `InvoiceMavenDocumentItems` | Historical item/pricing source | No |
| `BusinessDocuments` | Future internal draft header target | Not until approved write phase |
| `BusinessDocumentItems` | Future internal draft item target | Not until approved write phase |
| `AIDraftSuggestions` | Optional future review layer | Not until approved |
| `AutomationCommands` | Approved queue trigger for Maven draft | Not until approved execution phase |
| `BusinessDocumentLog` | Future audit log for business doc processing | Not until approved |
| `ApprovalsLog` | Future approval evidence | Not until approved |
| `SyncLog` / `ErrorLog` / `SyncState` | Maven sync observability | No |

Planned tables:

| Table | Runtime role | Status |
|---|---|---|
| `AliasRegistry` | Approved alias lookup | Proposed |
| `EquipmentRegistry` | Approved equipment lookup | Proposed |
| `ServiceKitRegistry` | Approved kit lookup | Proposed |
| `PricingRegistry` | Future approved pricing rules | Not yet planned in this session |

## 3. Every Agent Involved

| Agent | Runtime responsibility |
|---|---|
| Human Owner | Approves production, financial, customer-facing, schema, and Maven actions |
| INFRASTRUCTURE_MANAGER_AGENT | Reviews architecture, registry, schema, approval, and production-boundary risk |
| AI_DRAFT_AGENT | Builds recommendation, explains reasoning, marks approval flags |
| FACTORY_CONTROL_CENTER_AGENT | Audits output, relationships, evidence, safety, and completion claims |
| APPS_SCRIPT_AGENT | Future owner for approved Apps Script implementation changes |
| MAVEN_AGENT | Future owner for Maven payload/API review |
| GIT_AGENT | Commits/pushes only when explicitly requested |
| Future QA/System Health Agent | Future validation and health checks |

## 4. Every Decision

Runtime decision sequence:

1. Is the input report identifiable?
   - If no `ReportID` or valid `ReportCounter`, stop with `MissingReportIdentifier`.

2. Does the report exist?
   - If no, stop with `ReportNotFound`.

3. Is the report eligible for AI Draft?
   - Check status/signature/completion evidence if available.
   - If not eligible, return recommendation blocked with reason.

4. Are customer fields usable?
   - If `CustomerID` or customer name is missing, continue only as preview with `MissingCustomerData`.

5. Are equipment rows available?
   - If no `ReportEquipmentItems`, continue only if `ServiceReports` has enough equipment/service context; mark `MissingEquipmentRows`.

6. Can raw text be normalized?
   - Use `AliasRegistry` only after approved implementation.
   - If not available, use raw text with lower confidence.

7. Can equipment be matched?
   - Exact approved EquipmentRegistry match: higher confidence.
   - Family/type-only match: lower confidence.
   - No match: keep `NeedsUserApproval` and risk note.
   - Generic equipment descriptions must stay separate from specific model records.
   - Examples such as `מדחס 20 כ"ס`, `מדחס בורגי 20 כ"ס`, and `20HP compressor` are classified as `UNKNOWN_MODEL` / `GENERIC_HP_CLASS` unless additional evidence exists.
   - Additional evidence means exact model name, serial number, customer equipment registry match, repeated service history match, manufacturer/model pair, or approved Liad mapping.
   - Horsepower is an attribute only, not model identity.
   - Generic equipment names must not be used for automatic SKU matching.

8. Can a service kit be selected?
   - Exact approved ServiceKitRegistry match: candidate line items.
   - Family-level kit: candidate only, keep price approval.
   - No kit: use parts/catalog/history fallback.

9. Can each item be matched to ProductsCatalog?
   - Direct SKU/ProductID match: preferred.
   - Alias/name match: allowed only with approved alias.
   - No match: item remains recommendation text with approval required.

10. Can price be determined?
   - Priority:
     1. ProductsCatalog direct match
     2. Same equipment model history
     3. Same customer history
     4. Similar equipment/customer/service history
     5. AI estimate with `NeedsPriceApproval=TRUE`

11. Are fixed charges applicable?
   - Labor: 275 NIS/hour when labor hours are known or approved.
   - Labor + Service is a separate commercial line. It is not included in SCR Small Service kit unless explicit historical evidence says otherwise.
   - Technician Visit / Travel: 300 NIS default suggested price when applicable.
   - Technician Visit / Travel may be waived for nearby customers; if evidence conflicts or customer-specific history exists, keep `NeedsApproval=TRUE`.
   - If inclusion is uncertain, mark approval required.

12. Is confidence high enough for prefill?
   - Threshold is not yet approved. Until approved, all AI Draft outputs require user review.

13. Should output go to `AIDraftSuggestions` or `BusinessDocuments`?
   - Open question in `NEXT_SESSION.md`.
   - Recommended runtime: preview first, then approved internal draft rows only after explicit approval.

14. Can internal draft rows be created?
   - Only after explicit user approval for internal draft write.

15. Can Maven queue command be created?
   - Only after separate user approval for Maven draft creation.

16. Can Maven document be created?
   - Only through approved `AutomationCommands` queue and approved Apps Script/Maven implementation.

17. Can customer send/finalization/payment update happen?
   - Not in AI Draft runtime. Requires separate explicit approval.

## 5. Every Output

Read-only recommendation output:

| Output | Meaning |
|---|---|
| `SourceReportId` | Source `ServiceReports.ReportID` |
| `SourceReportCounter` | Human report number |
| `CustomerId` / `CustomerName` | Customer context |
| `SuggestedDocumentType` | Recommended business document type |
| `SuggestedTitle` | Human-readable draft title |
| `SuggestedItems` | Proposed line items |
| `Quantity` | Item quantity |
| `UnitPrice` | Suggested unit price |
| `TotalPrice` | Quantity times unit price |
| `PriceSource` | Catalog/history/AI estimate |
| `ConfidenceLevel` | Recommendation confidence |
| `NeedsPriceApproval` | Price requires review |
| `NeedsUserApproval` | User must approve before write/execution |
| `MissingData` | Missing input list |
| `RiskNotes` | Safety and uncertainty notes |
| `AIReasoning` | Evidence-backed explanation |

### Global Compressor Service Document Structure

Liad-approved rule:

This rule applies to all business documents, not only quotes.

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

For compressor service documents, the equipment model must appear clearly in the draft title/header.

Reason:

The compressor model is the key that allows the system to connect:

- service type
- expected parts
- manufacturer part numbers
- future internal SKUs
- historical pricing evidence
- inventory matching

Required behavior:

- Always identify the compressor model first.
- Do not treat generic horsepower as model identity.
- Do not assign SKU without model evidence.
- Do not use manufacturer cost as customer price.
- Do not deduct inventory from AI Draft.
- Future internal SKU mapping will replace or extend manufacturer part numbers.
- Manufacturer part numbers are internal technical evidence.
- Customer price comes from Maven/history/pricing evidence, not from spare parts cost.

Standard compressor service document structure:

1. Parts lines.
2. Oil handling line if needed.
3. Labor + Service.
4. Technician Visit / Travel.

Commercial line rules:

- Technician Visit / Travel is one line.
- Do not generate separate `Technician Visit` and `Travel` lines.
- Default suggested Technician Visit / Travel price is `300` ILS.
- Nearby customers may have waived visit/travel; if evidence conflicts or customer-specific history exists, keep `NeedsApproval=TRUE`.
- Labor + Service is one line.
- Do not split `Labor` and `Service` unless Liad explicitly approves an exception.
- Labor + Service is separate from SCR Small Service kit by default. It is not included in the kit unless explicit historical evidence says otherwise.
- SCR Small Service kit includes Air Filter, Oil Filter, and 3L SKR oil top-up.
- Large Service `4000h` / `5000h` uses full oil replacement. Do not treat Large Service oil as top-up.
- Partial serial evidence remains `NEEDS_MANUAL_CONFIRMATION`; do not classify it as `HIGH_WITH_REVIEW`.
- Every line must show `INCLUDED`, `EXCLUDED`, or `NEEDS_APPROVAL`.
- Historical bundled kit price must explain whether it includes parts only, parts + labor/service, or parts + labor/service + technician visit/travel.
- Do not double-charge travel.
- Do not double-charge service/labor.
- Do not double-charge technician visit.
- Every generated or suggested document line must show `INCLUDED`, `EXCLUDED`, or `NEEDS_APPROVAL`.

Approved internal draft outputs, future only:

- `BusinessDocuments` row
- `BusinessDocumentItems` rows
- optional `AIDraftSuggestions` row
- status such as `DraftRecommended` / `WaitingUserApproval`, only after approved write design

Approved execution outputs, future only:

- `AutomationCommands` row with `Status=Pending`
- Apps Script queue processing result
- future Maven draft ID/number/PDF link when Maven creation is approved

Forbidden outputs without explicit approval:

- Real Maven document
- Customer email/WhatsApp send
- Final invoice
- Payment status update
- Drive permission or file changes
- production schema changes

## 6. Every Approval Point

| Approval point | Required before |
|---|---|
| Registry implementation approval | Creating AliasRegistry, EquipmentRegistry, ServiceKitRegistry, PricingRegistry |
| AI Draft recommendation approval | Treating recommendation as user-accepted |
| Internal draft write approval | Writing `BusinessDocuments` / `BusinessDocumentItems` / `AIDraftSuggestions` |
| Price approval | Using uncertain, historical, conflicting, or AI-estimated prices |
| Maven draft approval | Creating `AutomationCommands` / calling Maven draft flow |
| Customer send approval | Emailing, WhatsApp sending, or sharing documents |
| Invoice/finalization approval | Creating final tax invoice or changing payment status |
| Deployment approval | Any Apps Script/AppSheet deployment or schema change |

## 7. Every Validation Step

Pre-runtime validation:

1. Confirm request includes `ReportID` or `ReportCounter`.
2. Confirm source report exists.
3. Confirm related `ReportEquipmentItems` are loaded by exact `ReportID`.
4. Confirm customer context from `ServiceReports` and optionally `Customers_Final`.
5. Confirm data completeness checks include `ReportEquipmentItems`, `PartsUsed`, `ProductsCatalog`, `InvoiceMavenDocuments`, and `InvoiceMavenDocumentItems`.

Recommendation validation:

1. Validate every suggested item has source evidence.
2. Validate every catalog product match references `ProductsCatalog`.
3. Validate every historical price cites matching history.
4. Validate quantities are numeric and nonnegative.
5. Validate totals equal quantity times unit price.
6. Validate missing quantity triggers `NeedsPriceApproval`.
7. Validate conflicting historical prices trigger `NeedsPriceApproval`.
8. Validate AI-estimated prices always trigger `NeedsPriceApproval`.
9. Validate all output includes `NeedsUserApproval=TRUE`.

Future write validation:

1. Validate no existing `BusinessDocuments` row is overwritten.
2. Validate parent `BusinessDocuments.BusinessDocumentId` is unique.
3. Validate child `BusinessDocumentItems.DocumentID` points to the parent.
4. Validate approval fields exist before write.
5. Validate write does not trigger Maven automatically.

Future queue validation:

1. Validate `AutomationCommands.Status=Pending`.
2. Validate command is idempotent.
3. Validate `BusinessDocuments.ProcessingCommandId` is empty before claim.
4. Validate AppSheet Bot and Apps Script do not update the same row simultaneously.

Future Maven validation:

1. Validate `BusinessDocuments` and child items are complete.
2. Validate all required Maven payload fields.
3. Validate explicit Maven approval.
4. Validate no duplicate Maven document exists for the same approved draft.
5. Validate Maven response is stored only after success.

## 8. Failure Scenarios

| Failure | Detection | Required behavior |
|---|---|---|
| Missing report ID | No valid `ReportID`/`ReportCounter` | Stop |
| Report not found | No `ServiceReports` match | Stop |
| Missing equipment rows | No `ReportEquipmentItems` | Continue preview with risk note if enough context exists |
| Incomplete `PartsUsed` schema | Registry says row-1 schema incomplete | Do not rely on parts as complete source |
| No catalog match | No `ProductsCatalog` match | Use history fallback and require price approval |
| Conflicting catalog/history prices | Price range too wide or disagreement | Require price approval |
| Missing quantity | No reliable quantity | Require price approval/user approval |
| Unapproved alias/equipment/kit row | Registry row not approved/active/enabled | Ignore row |
| Dryer matched to compressor kit | Family mismatch | Block kit use |
| Existing draft found | Matching draft already exists | Do not overwrite; require user decision |
| Approval missing | No explicit approval | Do not write or queue |
| Queue duplicate | Command already claimed/running/completed | Skip duplicate |
| Maven API failure | Error response/exception | Mark command error; preserve manual recovery |
| Partial write | Parent created but items missing | Mark draft incomplete; block queue |
| Customer ID mismatch | ServiceReports vs Maven customer mismatch | Require user review |

## 9. Recovery Path

Read-only recommendation recovery:

1. Return structured failure reason.
2. Include missing/invalid source table and field.
3. Do not write any table.
4. Recommend smallest discovery step.

Internal draft recovery, future only:

1. Stop queue creation.
2. Mark draft as incomplete or review-needed.
3. Preserve created rows for audit.
4. Do not retry automatically.
5. Require user review before correction.

Queue/Maven recovery, future only:

1. Preserve `AutomationCommands` row.
2. If claim succeeded and later failed, keep `BusinessDocuments.ProcessingCommandId`.
3. Set command status to `Error`.
4. Store `ErrorMessage`.
5. Require manual recovery before retrying with a different command.
6. Do not clear idempotency fields automatically.

Registry recovery:

1. Disable unsafe alias/equipment/kit/pricing row.
2. Mark row `DEPRECATED` or `REJECTED`.
3. Preserve evidence and notes.
4. Re-run Factory Control Center audit.

## 10. Definition Of Successful Draft Creation

Read-only recommendation success:

- Source report is found.
- Related equipment/context tables are checked.
- Catalog/history/registry evidence is evaluated.
- Suggested document and line items are generated.
- Every price has a source or `NeedsPriceApproval=TRUE`.
- Output contains confidence, reasoning, missing data, risk notes, and approval flags.
- No production write occurs.

Internal draft creation success, future approved phase:

- User explicitly approves internal draft creation.
- One new `BusinessDocuments` parent row is created.
- Related `BusinessDocumentItems` rows are created.
- No existing draft is overwritten.
- Draft status clearly indicates user review or approval state.
- Maven is not called automatically.

Maven draft creation success, future approved phase:

- User separately approves Maven draft creation.
- `AutomationCommands` queue is used.
- Command is claimed idempotently.
- `BusinessDocuments` is claimed with `ProcessingCommandId`.
- Maven payload is validated.
- Maven draft is created successfully.
- Maven response identifiers are stored.
- `ServiceReports` flags are updated consistently.
- Command finishes `Completed`.
- No customer send, final invoice, or payment update occurs unless separately approved.

## Runtime Flow Summary

```text
User selects ReportID / ReportCounter
-> Load ServiceReports
-> Load ReportEquipmentItems
-> Load customer, parts, catalog, Maven history
-> Normalize with approved registries when available
-> Match equipment and service kit when available
-> Price by catalog/history/fallback
-> Validate data, quantities, pricing, confidence
-> Produce read-only recommendation
-> User approval point 1: internal draft write
-> Future: create BusinessDocuments and BusinessDocumentItems
-> User approval point 2: Maven draft
-> Future: create AutomationCommands row
-> Future: Apps Script queue execution
-> Future: Maven draft creation
-> Future: sync/health/audit
```

## Evidence Used

- `agents/AI_DRAFT_AGENT.md`
- `project-brain/maps/AI_DRAFT_FIELD_MAPPING.md`
- `AI_DRAFT_FLOW_MAP.md`
- `project-brain/checkpoints/NEXT_SESSION.md`
- `data-sources/tools/SHEETS_REGISTRY.md`
- `project-brain/implementation/ALIAS_REGISTRY_IMPLEMENTATION_PLAN.md`
- `project-brain/implementation/EQUIPMENT_REGISTRY_IMPLEMENTATION_PLAN.md`
- `project-brain/implementation/SERVICE_KIT_REGISTRY_IMPLEMENTATION_PLAN.md`
