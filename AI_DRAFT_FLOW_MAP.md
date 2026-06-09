# AI Draft Flow Map

## Purpose

Document the current ServiceReports to AI Draft to Maven workflow based on existing repository implementation and Project Brain context.

Scope:
- Analysis only
- No code changes
- No new functions
- No production changes

## 1. Current Flow Map

### Service Report Flow

```text
AppSheet UI
-> ServiceReports row
-> ReportEquipmentItems rows
-> Apps Script doGet(e)
-> getReportData(reportId)
-> Report.html render
-> saveClientSignature(reportId, signatureData)
-> ServiceReports.ClientSign / report status update
```

Related service report actions:

```text
AppSheet / Web action
-> doGet(e?action=assignCounter)
-> assignReportCounter(reportId)
-> ServiceReports.ReportCounter
-> ServiceReports Hebrew report number field
-> saveSignedHtmlFile(reportId)
-> Google Drive customer folder / HTML report file
-> ServiceReports.SignedHtmlFileUrl
-> ServiceReports.ReportDriveFileId
```

```text
AppSheet / Web action
-> doGet(e?action=createReportFile or saveHtml)
-> saveSignedHtmlFile(reportId)
-> Google Drive customer folder / HTML report file
-> ServiceReports.SignedHtmlFileUrl
-> ServiceReports.ReportDriveFileId
```

### Existing Business Document Queue Flow

Project Brain defines the stable queue flow as:

```text
BusinessDocuments
-> AutomationCommands
-> AppSheet Bot
-> Apps Script Webhook
-> Maven Draft
```

The current implementation executes this path up to Apps Script status handling:

```text
AutomationCommands row with Command = CreateMavenDraft
-> AppSheet Bot calls Apps Script doPost(e)
-> doPost parses payload
-> claimAutomationCommand(CommandID)
-> AutomationCommands.Status = Running
-> claimBusinessDocumentForCommand(BusinessDocumentId, CommandID)
-> BusinessDocuments.ProcessingCommandId set
-> createMavenDraft(data)
-> BusinessDocuments.DocumentStatus = DraftRequestReceived
-> updateServiceReportAfterBusinessDraftCreated_(SourceReportId)
-> ServiceReports.BusinessDraftCreated = TRUE
-> ServiceReports.MavenDocumentCreated = FALSE
-> ServiceReports.MavenSentToCustomer = FALSE
-> AutomationCommands.Status = Completed
```

Important current behavior:
- `createMavenDraft(data)` currently updates internal sheets and logs.
- It does not build a Maven document payload from `BusinessDocumentItems`.
- It does not call a Maven document creation endpoint.
- It does not write a real `MavenDocumentId` back to `BusinessDocuments`.

### Maven Historical Sync Flow

```text
Apps Script syncMavenDocuments()
-> Maven searchDocuments API
-> InvoiceMavenDocuments
-> InvoiceMavenDocumentItems
-> SyncState / SyncLog / ErrorLog
```

Additional sync helpers exist:

```text
backfillMavenDocumentItems()
backfillMavenDocumentItemsFrom20230712Preview()
backfillMavenDocumentItemsFrom20230712Apply()
syncMavenDocumentsDaily()
```

These flows support historical pricing and data completeness. They are separate from creating new Maven drafts.

### Current AI Draft Support

```text
findHistoricalPricesForReport(reportCounter)
-> ServiceReports
-> ReportEquipmentItems
-> InvoiceMavenDocumentItems
-> returns historical price matches
```

Current AI Draft support is read-only and partial:
- It searches historical Maven item descriptions.
- It does not create `BusinessDocuments`.
- It does not create `BusinessDocumentItems`.
- It does not use `ProductsCatalog` yet.
- It does not trigger `AutomationCommands`.

## 2. Dependency Map

### ServiceReports

Depends on:
- AppSheet row creation and user actions
- `ReportEquipmentItems` for equipment details
- `Customers_Final` for customer identity and folder naming
- Apps Script for rendering, signing, counter assignment, and Drive save

Writes or updates:
- `ReportCounter`
- Hebrew report number field
- `ClientSign`
- report status field
- `CustomerFolderId`
- `ReportDriveFileId`
- `SignedHtmlFileUrl`
- `BusinessDraftCreated`
- `MavenDocumentCreated`
- `MavenSentToCustomer`

### ReportEquipmentItems

Depends on:
- `ServiceReports.ReportID` or report counter references

Used by:
- `getReportData(reportId)` for report rendering
- AI Draft context and pricing reasoning
- Historical price search term extraction

### PartsUsed

Intended dependency:
- AI Draft item recommendations

Current state:
- Defined in Project Brain as required AI Draft input
- No confirmed current Apps Script consumption in the AI-to-Maven execution path

### ProductsCatalog

Intended dependency:
- Direct SKU/item matching
- Catalog pricing
- `BusinessDocumentItems.ItemId`
- `BusinessDocumentItems.UnitPrice`
- `NeedsPriceApproval`

Current state:
- Defined in Project Brain field mapping
- Not used by current `AIDraftHistory.js`
- Not used by current `createMavenDraft(data)`

### InvoiceMavenDocuments

Depends on:
- Maven `searchDocuments` API
- `syncMavenDocuments()`

Used by:
- Historical pricing context
- Maven sync and backfill flows

### InvoiceMavenDocumentItems

Depends on:
- Maven document sync or backfill parsing of raw Maven JSON

Used by:
- Historical pricing search in `findHistoricalPricesForReport(reportCounter)`
- Intended AI Draft pricing logic

Known risk:
- Maven sync / item import has an open bug around `InvoiceMavenDocumentItems`.

### BusinessDocuments

Depends on:
- AI Draft recommendation output or AppSheet business document draft request
- User approval flow
- Source `ServiceReports` identifiers

Current implementation uses:
- `BusinessDocumentId`
- `DocumentStatus`
- `LastActionAt`
- `SourceReportId`
- `ProcessingCommandId`
- `ProcessingStartedAt`

Current Apps Script writes:
- `DocumentStatus = DraftRequestReceived`
- `LastActionAt`
- `ProcessingCommandId`
- `ProcessingStartedAt`

### BusinessDocumentItems

Depends on:
- `BusinessDocuments.BusinessDocumentId`
- AI Draft item recommendation
- `PartsUsed`
- `ProductsCatalog`
- historical Maven item pricing

Current state:
- Defined in Project Brain and AppSheet map
- Required for complete draft creation
- Not currently read by `createMavenDraft(data)`

### AutomationCommands

Depends on:
- AppSheet action/Bot creating a command row from an approved `BusinessDocuments` row

Current Apps Script uses:
- `CommandID`
- `Command`
- `Status`
- `Result`
- `CompletedAt`
- `ErrorMessage`

Queue behavior:
- `Pending` commands are claimed and changed to `Running`.
- Non-pending commands are skipped.
- Commands finish as `Completed` or `Error`.

### Apps Script

Responsibilities currently implemented:
- Service report rendering and data loading
- Signature save
- Report counter assignment
- Drive HTML save
- Email sending
- AutomationCommands webhook handling
- BusinessDocuments processing claim
- BusinessDocuments status update
- ServiceReports business draft flags update
- Maven historical sync

Responsibilities not yet implemented:
- Full AI Draft recommendation generation
- BusinessDocumentItems creation
- Maven draft payload construction
- Maven draft creation API call
- Maven response persistence

### Maven

Current role:
- Source of historical document and item data through `searchDocuments`

Intended role:
- Create approved draft business documents after user approval

Current gap:
- No implemented create-draft API call was found in the current Apps Script source.

## 3. Missing Links

1. Missing AI Draft recommendation writer

```text
ServiceReports / ReportEquipmentItems / PartsUsed / ProductsCatalog / Maven history
-> AI recommendation
-> BusinessDocuments
-> BusinessDocumentItems
```

Current repository has read-only historical search, not a complete recommendation writer.

2. Missing `BusinessDocumentItems` consumption

```text
BusinessDocumentItems
-> Apps Script Maven payload builder
```

`createMavenDraft(data)` does not read `BusinessDocumentItems`.

3. Missing Maven create-draft API call

```text
Apps Script payload
-> Maven create document endpoint
-> MavenDocumentId / document number
```

Current Maven API calls found are for `searchDocuments`, not creating a new document.

4. Missing final status transition

Current status reaches:

```text
DraftRequestReceived
```

Missing later states such as:

```text
MavenDraftCreated
MavenDocumentCreated
ReadyToSend
SentToCustomer
```

Exact status names should follow existing AppSheet values before implementation.

5. Missing Maven result persistence

Expected but not currently implemented:

```text
Maven API response
-> BusinessDocuments.MavenDocumentId
-> BusinessDocuments document number / URL fields
-> ServiceReports.MavenDocumentCreated = TRUE
```

6. Missing complete approval gate

Project Brain requires:

```text
AI recommends
-> user approves
-> Apps Script executes
```

The exact approved-status trigger into `AutomationCommands` needs to be confirmed in AppSheet.

7. Missing ProductsCatalog integration

Project Brain priority says catalog match comes before AI estimate or approval-required price. Current historical search does not use `ProductsCatalog`.

## 4. Bottlenecks

### Primary Bottleneck

The main bottleneck preventing a complete `AI Draft -> Maven` flow is the missing execution bridge between approved `BusinessDocuments` / `BusinessDocumentItems` and actual Maven draft creation.

Current stop point:

```text
AutomationCommands
-> Apps Script doPost
-> createMavenDraft(data)
-> BusinessDocuments.DocumentStatus = DraftRequestReceived
-> AutomationCommands.Status = Completed
```

Required next bridge:

```text
BusinessDocuments + BusinessDocumentItems
-> validate approval
-> build Maven payload
-> call Maven create document API
-> store Maven result
-> update statuses
```

### Secondary Bottlenecks

1. AI Draft is not yet writing internal draft rows.

The design exists, but implementation is not complete.

2. Historical pricing data may be incomplete.

`InvoiceMavenDocumentItems` has an open sync/backfill bug, which affects pricing confidence.

3. Duplicate function and responsibility boundaries are unclear.

Email sending and report file creation logic appear in more than one location. This increases risk when extending the flow.

4. Current `createMavenDraft` name is misleading.

The function name suggests real Maven creation, but current behavior is internal status/log update only.

5. AppSheet approval-to-command behavior is not represented in code.

The repository maps describe the AppSheet Bot/action responsibility, but exact AppSheet action definitions are not available as code in this repository.

## 5. Recommended Implementation Phases

### Phase 1 - Document and Verify Existing State

Goal:
Confirm actual columns, statuses, AppSheet actions, and Bot payload before implementation.

Tasks:
- Verify `BusinessDocuments` columns.
- Verify `BusinessDocumentItems` columns.
- Verify `AutomationCommands` payload fields.
- Verify AppSheet approval action and Bot condition.
- Verify allowed `DocumentStatus` values.
- Verify Maven create-document API requirements.

No code changes in this phase.

### Phase 2 - Complete Read-Only AI Draft Recommendation

Goal:
Produce a full recommendation from one `ServiceReport` without writing business document rows.

Inputs:
- `ServiceReports`
- `ReportEquipmentItems`
- `PartsUsed`
- `Customers_Final`
- `ProductsCatalog`
- `InvoiceMavenDocuments`
- `InvoiceMavenDocumentItems`

Output:
- Suggested document type
- Suggested line items
- Quantity
- Unit price
- Source of price
- Confidence
- `NeedsPriceApproval`
- `NeedsUserApproval`
- Risk notes

Safety:
- No Maven creation
- No customer email
- No payment updates

### Phase 3 - Write Internal Draft Rows Only

Goal:
After user approval, create internal draft rows.

Flow:

```text
AI recommendation approved
-> BusinessDocuments row
-> BusinessDocumentItems rows
-> DocumentStatus = WaitingUserApproval or DraftRecommended
```

Safety:
- Do not create Maven document.
- Do not trigger queue until user approval is explicit.
- Preserve existing `BusinessDocuments` rows.

### Phase 4 - Confirm User Approval and Queue Command

Goal:
Use the stable queue architecture for execution.

Flow:

```text
User approves BusinessDocument
-> AppSheet creates AutomationCommands row
-> Status = Pending
-> Command = CreateMavenDraft
-> Bot calls Apps Script webhook
```

Safety:
- Keep AppSheet as approval/UI layer.
- Keep Apps Script as execution layer.
- Do not let AppSheet and Apps Script update the same row at the same time.

### Phase 5 - Implement Maven Payload Builder

Goal:
Convert approved `BusinessDocuments` and `BusinessDocumentItems` into a Maven draft payload.

Required behavior:
- Read `BusinessDocuments` by `BusinessDocumentId`.
- Read child `BusinessDocumentItems`.
- Validate all required fields.
- Stop with clear error if required data is missing.
- Do not call Maven yet in the first test version.

Safety:
- One report/document test only.
- Log payload preview.
- No production deploy without approval.

### Phase 6 - Create Maven Draft After Approval

Goal:
Call Maven create-document API only after payload validation and user approval.

Flow:

```text
Validated payload
-> Maven create document API
-> Maven response
-> BusinessDocuments.MavenDocumentId / status fields
-> ServiceReports.MavenDocumentCreated = TRUE
-> AutomationCommands.Status = Completed
```

Safety:
- Use `ProcessingCommandId` idempotency guard.
- Keep duplicate-command skip behavior.
- On error, mark `AutomationCommands.Status = Error` and preserve manual recovery path.

### Phase 7 - Sync Back and Health Checks

Goal:
Verify the created Maven draft appears in local historical tables and detect stuck states.

Checks:
- `AutomationCommands` stuck `Pending`
- `AutomationCommands` stuck `Running`
- `BusinessDocuments` stuck `DraftRequestReceived`
- missing `BusinessDocumentItems`
- duplicate `MavenDocumentId`
- `ServiceReports` not updated after draft creation
- Maven sync stuck around `InvoiceMavenDocumentItems`

## Protected Systems

Do not break:
- AutomationCommands queue architecture
- BusinessDocuments workflow
- Maven draft creation path
- Report counter logic
- Drive folder logic
- Signed report / HTML file save logic
- AppSheet Bot and Apps Script row update boundaries

## Summary

The queue foundation exists and should be preserved. The current implementation safely claims commands and business documents, but it stops at internal status updates. The complete AI Draft to Maven flow requires a narrow bridge: approved `BusinessDocuments` plus `BusinessDocumentItems` must be converted into a validated Maven payload, sent to Maven through the proper create-document API, and written back to the local tables with idempotent status handling.
