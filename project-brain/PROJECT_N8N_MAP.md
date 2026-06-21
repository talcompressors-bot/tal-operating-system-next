# PROJECT N8N MAP

Last updated: 2026-06-21

These Mermaid maps document current and target flows in an n8n-style format. Missing or unverified pieces are marked `UNKNOWN` or `MISSING`.

## A. Current Working Automation Flow

Trigger: AppSheet/user action creates or updates BusinessDocuments and AutomationCommands.  
Inputs: `ServiceReports`, `BusinessDocuments`, `AutomationCommands`, AppSheet Bot payload.  
Owner systems: AppSheet, Google Sheets, Apps Script, Maven.  
Output: internal draft request status update and AutomationCommands completion. Evidence does not prove real Maven document creation in current code.

```mermaid
flowchart TD
  A[ServiceReports] --> B[BusinessDocuments]
  B --> C[AutomationCommands]
  C --> D{AppSheet Bot sees Pending command}
  D -->|Webhook| E[Apps Script doPost]
  E --> F{Command == CreateMavenDraft}
  F -->|yes| G[claimAutomationCommand]
  F -->|no| Z[Unknown command response]
  G --> H{Command was Pending?}
  H -->|no| I[Return already handled]
  H -->|yes| J[claimBusinessDocumentForCommand]
  J --> K{BusinessDocument claim ok?}
  K -->|no duplicate| L[Mark command Completed duplicate skipped]
  K -->|no error| M[Mark command Error]
  K -->|yes| N[createMavenDraft current implementation]
  N --> O[Append BusinessDocumentLog]
  N --> P[Set BusinessDocuments.DocumentStatus = DraftRequestReceived]
  P --> Q[Update ServiceReports flags]
  Q --> R[AutomationCommands.Status = Completed]
  R --> S[ServiceReports status/flags updated]
```

Decision points:

- Command must be `CreateMavenDraft`.
- AutomationCommands status must be `Pending`.
- BusinessDocument must not already be claimed by another command.

Missing pieces:

- Confirmed live AppSheet Bot/action definitions.
- Real Maven create-document API call and response persistence.
- Full BusinessDocumentItems consumption.

## B. Target Phase 1 Flow: AI Service Report -> Draft Document

Trigger: User selects a Service Report for AI Draft recommendation.  
Inputs: `ServiceReports`, `ReportEquipmentItems`, `PartsUsed`, `Customers_Final`, `ProductsCatalog`, `InvoiceMavenDocuments`, `InvoiceMavenDocumentItems`.  
Owner systems: AI Draft Agent, Apps Script, AppSheet approval, Maven after approval.  
Output: approved internal draft and future Maven draft.

```mermaid
flowchart TD
  A[Service Report] --> B[AI Analysis]
  B --> C[Customer detection]
  B --> D[Equipment detection]
  C --> E{Customer usable?}
  D --> F{Equipment usable?}
  E -->|no| G[Mark MissingCustomerData]
  F -->|no| H[Mark MissingEquipmentRows]
  E -->|yes| I[SKU / catalog matching]
  F -->|yes| I
  I --> J{ProductsCatalog match?}
  J -->|yes| K[Use catalog price]
  J -->|no| L[Search Maven/customer/equipment history]
  L --> M{Reliable historical price?}
  M -->|yes| N[Use historical price with confidence]
  M -->|no| O[AI estimate / approval required]
  K --> P[Draft Items]
  N --> P
  O --> P
  P --> Q{User approval}
  Q -->|no| R[Stop; no writes]
  Q -->|yes internal draft| S[BusinessDocuments + BusinessDocumentItems]
  S --> T{Separate Maven approval}
  T -->|no| U[Wait for approval]
  T -->|yes| V[AutomationCommands Pending]
  V --> W[Apps Script queue]
  W --> X[Maven Draft]
  X --> Y[Inventory update - MISSING/PLANNED]
```

Missing pieces:

- Approved registry runtime for aliases/equipment/service kits.
- Approved write path to BusinessDocuments and BusinessDocumentItems.
- Maven payload builder and create-document call.
- Inventory update contract.

## C. Phase 2 Receipts Flow

Trigger: Payment evidence or payment record appears.  
Inputs: payment evidence/record, customer, related document, receipt policy.  
Owner systems: UNKNOWN future finance workflow, Maven/BusinessDocuments after approval.  
Output: receipt draft, duplicate prevention.

```mermaid
flowchart TD
  A[Payment evidence / record] --> B[Match customer/document]
  B --> C{Customer/document match found?}
  C -->|no| D[Review required: UNKNOWN match]
  C -->|yes| E[Detect missing receipt]
  E --> F{Receipt already exists?}
  F -->|yes| G[Prevent duplicate receipt]
  F -->|no| H[Create receipt draft]
  H --> I{User approval}
  I -->|no| J[Stop; no issue/send]
  I -->|yes| K[Maven / BusinessDocuments receipt flow]
  K --> L[Receipt identifiers persisted]
```

Missing pieces:

- Payment evidence source is UNKNOWN.
- Receipt table/model is MISSING.
- Maven receipt API contract is UNKNOWN.
- Duplicate receipt key is UNKNOWN.
- Approval UI is UNKNOWN.

## D. AppSheet -> Next.js Migration Flow

Trigger: Migration discovery mission and approved migration phase.  
Inputs: AppSheet views/actions/bots, Google Sheets schemas, Apps Script behavior, Playwright report.  
Owner systems: Codex, AppSheet, Next.js future app.  
Output: route/component/data-source migration map.

```mermaid
flowchart TD
  A[AppSheet Views / Actions / Bots] --> B[Playwright discovery]
  B --> C[Screen inventory]
  C --> D[Next.js route/component map]
  D --> E{Priority approved?}
  E -->|no| F[Keep planning only]
  E -->|yes| G[Rebuild screens]
  G --> H[Testing]
  H --> I{Parity verified?}
  I -->|no| J[Fix migration gaps]
  I -->|yes| K[Gradual migration]
```

Missing pieces:

- Live AppSheet UI scan is blocked by missing URL/session.
- No Next.js app currently exists.
- Data API/backend plan is UNKNOWN.
- Auth and role model are UNKNOWN.

## E. External Systems Map

Trigger: Business workflows and approved automation runs.  
Inputs: operational rows, reports, documents, emails, files, code, approvals.  
Owner systems: mixed.

```mermaid
flowchart LR
  GS[Google Sheets\nServiceApp_FIX] <--> AS[Apps Script]
  APP[AppSheet UI] <--> GS
  APP --> BOT[AppSheet Bots / Actions]
  BOT --> AS
  AS <--> MV[Maven API]
  AS <--> DR[Google Drive]
  AS --> GM[Gmail / Email]
  GH[GitHub / Git repo] --> CODEX[Codex]
  CODEX --> PB[Project Brain]
  PB --> MAPS[Maps / Roadmap / Gaps]
  NEXT[Next.js future app] -.planned.-> GS
  NEXT -.planned.-> AS
  NEXT -.planned.-> MV
  CODEX -.discovery.-> APP
```

Missing pieces:

- Next.js app and API integration.
- AppSheet screen/action/bot export.
- External credential handling policy for scanner/runtime.
- Production migration cutover and rollback plan.

