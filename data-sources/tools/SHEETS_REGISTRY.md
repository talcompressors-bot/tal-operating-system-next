# SHEETS REGISTRY

Source spreadsheet: `ServiceApp_FIX`  
Spreadsheet ID: `1q6cCUJTNhhrUSok9rrZyFTN9BlrT6-4d7s9CUqrVHh4`  
Last live read: 2026-06-15  
Mode: read-only Google Sheets metadata/header inspection

## Status Values

- `ACTIVE`: used by known AppSheet, Apps Script, Maven, AI Draft, or System Health flows.
- `UNKNOWN`: exists in the live spreadsheet, but current use is not fully confirmed.
- `LEGACY`: appears to be older/reference/config documentation rather than active transactional data.
- `DUPLICATE_CANDIDATE`: overlaps another active table and should be reviewed before use.
- `EMPTY`: no meaningful header schema found in row 1.

## Registry Summary

### Existing Registry Tables

- `AutomationRegistry`
- `HealthCheckRegistry`
- `SystemHealthLog`

### Existing System-Health Tables

- `AutomationRegistry`
- `HealthCheckRegistry`
- `SystemHealthLog`
- `SyncLog`
- `ErrorLog`
- `SyncState`

### Existing AppSheet-Related Tables

- `Customers_Final`
- `ServiceReports`
- `InspectionItems`
- `PartsUsed`
- `EmailLog`
- `Lists`
- `SetupGuide`
- `PDF_Template`
- `AppSheet_Formulas`
- `ServiceReport_Form_View`
- `ReportEquipmentItems`
- `BusinessDocuments`
- `BusinessDocumentItems`
- `BusinessDocumentLog`
- `ApprovalsLog`
- `SecretAccessLog`
- `AutomationCommands`
- `AppMenu`

### Existing Maven-Related Tables

- `InvoiceMavenDocuments`
- `InvoiceMavenCustomers`
- `InvoiceMavenItems`
- `InvoiceMavenDocumentItems`
- `SyncLog`
- `ErrorLog`
- `SyncState`
- `BusinessDocuments`
- `BusinessDocumentItems`
- `AutomationCommands`

### Existing Service-Report Tables

- `ServiceReports`
- `ReportEquipmentItems`
- `Customers_Final`
- `InspectionItems`
- `PartsUsed`
- `EmailLog`
- `Lists`
- `PDF_Template`

### Empty Or Suspicious Sheets

- `InspectionItems`: only row-1 value observed: `InspectionItems`.
- `PartsUsed`: only row-1 value observed: `PartsUsed`.
- `EmailLog`: only row-1 value observed: `EmailLog`.
- `SetupGuide`: appears to be a guide/config sheet, not a normalized data table.
- `PDF_Template`: appears to be a template sheet, not a normalized data table.
- `ServiceReport_Form_View`: appears to be a mock/view guide sheet.
- `SyncLog`: first header cell is blank/space.
- `Customers2`: overlaps `Customers_Final`.

### Tables Overlapping Future 54-Phase Target Architecture

- Project Brain / Governance: `AutomationRegistry`, `HealthCheckRegistry`, `SystemHealthLog`, `ApprovalsLog`, `SecretAccessLog`
- Service Factory: `ServiceReports`, `ReportEquipmentItems`, `InspectionItems`, `PartsUsed`
- Finance Factory: `BusinessDocuments`, `BusinessDocumentItems`, `BusinessDocumentLog`, `InvoiceMavenDocuments`, `InvoiceMavenDocumentItems`
- Communication Factory: `EmailLog`, `AppMenu`
- Inventory & Procurement Factory: `ProductsCatalog`, `InventoryStock`, `SuppliersProducts`, `InvoiceMavenItems`
- AI Draft / Agent Factory: `AIDraftSuggestions`, `BusinessDocuments`, `BusinessDocumentItems`
- Observability: `SyncLog`, `ErrorLog`, `SyncState`, `SystemHealthLog`

## Sheets

### Customers2

- SheetName: `Customers2`
- Purpose, if known: customer master-like table; appears to overlap `Customers_Final`.
- Header row / columns: `CustomerID`, `שם לקוח`, `איש קשר`, `טלפון`, `טלפון1`, `טלפון2`, `טלפון3`, `טלפון4`, `אימייל`, `אימייל1`, `אימייל2`, `אימייל3`, `אימייל4`, `אימייל5`, `אימייל6`, `כתובת / מתקן`, `הערות`, `פעיל`, `ח.פ  ע.מ  ת.ז`
- Key column, if known: `CustomerID`
- Related Apps Script files/functions, if known: none confirmed; active code uses `Customers_Final`.
- Related AppSheet use, if known: possible legacy customer table.
- Risk level: Medium
- Status: `DUPLICATE_CANDIDATE`
- Notes: Review before use; likely duplicate or predecessor of `Customers_Final`.

### SystemHealthLog

- SheetName: `SystemHealthLog`
- Purpose, if known: stores System Health validation/log results.
- Header row / columns: `LogId`, `ParentLogId`, `RecordType`, `RunId`, `HealthCheckId`, `CheckName`, `Timestamp`, `SchemaTimestamp`, `Status`, `Severity`, `FailureCategory`, `BusinessImpact`, `AffectedObject`, `AffectedRecordId`, `Details`, `RootCause`, `ConfidenceScore`, `SuggestedFix`, `EscalationPolicy`, `RequiresApproval`, `AutoRepairAllowed`, `ExecutionMode`, `ValidationFunction`, `DurationMs`, `AgentName`, `SourceAttribution`, `RegistryVersion`, `LogSchemaVersion`, `RelatedAutomationRegistryId`, `DataSource`, `Environment`, `CorrelationId`, `ReviewedBy`, `ReviewedAt`, `ReviewStatus`, `ResolutionStatus`, `ResolvedAt`, `LearningEligible`
- Key column, if known: `LogId`
- Related Apps Script files/functions, if known: `SystemHealthSetup.js`, `SystemHealthLogValidation.js`, `setupSystemHealthLogSheet()`, `validateSystemHealthLogSchema()`
- Related AppSheet use, if known: future/read-only health reporting.
- Risk level: High
- Status: `ACTIVE`
- Notes: Existing live system-health table; writes should only happen through approved health workflows.

### HealthCheckRegistry

- SheetName: `HealthCheckRegistry`
- Purpose, if known: registry of System Health checks.
- Header row / columns: `HealthCheckId`, `Name`, `Description`, `SystemArea`, `Severity`, `RiskLevel`, `BusinessImpact`, `CheckType`, `ExecutionMode`, `Frequency`, `DependsOn`, `Enabled`, `ReadOnlyCheck`, `AutoRepairAllowed`, `RequiresApproval`, `TargetObject`, `TargetTable`, `TargetField`, `RelatedAutomationRegistryId`, `DataSource`, `ValidationFunction`, `ExpectedResult`, `FailureCondition`, `FailureCategory`, `SuggestedFix`, `ApprovalPolicy`, `EscalationPolicy`, `SafetyRules`, `LearningEligible`, `LastRun`, `LastStatus`, `LastFailureReason`, `LastRelatedId`, `LastRunBy`, `OutputLogTarget`, `AlertEligible`, `AlertThreshold`, `Owner`, `SourceAttribution`, `RegistryVersion`, `VersionStatus`, `CreatedAt`, `UpdatedAt`, `Notes`
- Key column, if known: `HealthCheckId`
- Related Apps Script files/functions, if known: `SystemHealthSetup.js`, `setupHealthCheckRegistrySheet()`
- Related AppSheet use, if known: future health-check governance.
- Risk level: High
- Status: `ACTIVE`
- Notes: Existing live registry table.

### AutomationRegistry

- SheetName: `AutomationRegistry`
- Purpose, if known: registry of automations, workflows, risk, approvals, inputs/outputs, and health mapping.
- Header row / columns: `RegistryId`, `RegistryVersion`, `VersionStatus`, `Enabled`, `LastChangedAt`, `LastChangedBy`, `SystemArea`, `BusinessProcess`, `BusinessObjectType`, `BusinessObjectIdField`, `LifecycleStage`, `SystemOfRecord`, `AutomationName`, `AutomationType`, `Description`, `Owner`, `RiskLevel`, `ProductionImpact`, `CustomerImpactLevel`, `FinancialImpactLevel`, `IntegrationType`, `ExternalSystemName`, `ExternalObjectType`, `ExternalObjectIdField`, `ExternalEndpointOrAction`, `ManualOrAutomaticTrigger`, `TriggerSource`, `TriggerCondition`, `TriggerSchedule`, `AppSheetTable`, `AppSheetActionName`, `AppSheetBotName`, `AutomationCommandName`, `AppsScriptFile`, `AppsScriptFunction`, `InputTables`, `OutputTables`, `KeyInputFields`, `KeyOutputFields`, `DriveEffectType`, `DriveExpectedResult`, `MavenEffectType`, `MavenExpectedResult`, `ExternalApiEffect`, `ExpectedResult`, `ExpectedStatusTransition`, `ExpectedMaxDurationMinutes`, `ExpectedBusinessOutcome`, `BusinessOutcomeCategory`, `PrimaryBusinessMetric`, `HealthCheckId`, `HealthCheckName`, `HealthCheckMode`, `HealthCheckQuery`, `FailureSignals`, `RootCauseHints`, `SuggestedFix`, `SuggestedFixRequiresApproval`, `ApprovalRequired`, `ApprovalPolicy`, `ApprovalRoleRequired`, `ApprovalBeforeAction`, `ApprovalEvidenceRequired`, `ApprovalStatus`, `RollbackSupported`, `RollbackStrategy`, `SafeRetryAllowed`, `RetryPolicy`, `IdempotencyKeyFields`, `DuplicateDetectionRule`, `BackupRequiredBeforeChange`, `DataSensitivity`, `AccessScopeRequired`, `McpEnabled`, `AllowedTools`, `ForbiddenTools`, `ProductionWriteAllowed`, `ExternalWriteAllowed`, `TestModeAvailable`, `DryRunSupported`, `LearningEnabled`, `LearningCategory`, `LearningDataAllowed`, `FeedbackSource`, `SuccessMetric`, `FailureMetric`, `SafetyRules`, `SourceAttribution`, `AuditLogTarget`, `DailyHealthReportInclude`, `DailyHealthReportPriority`, `LastVerifiedAt`, `LastVerifiedBy`, `LastHealthStatus`, `LastFailureAt`, `LastFailureDetails`, `RelatedIdsToReport`, `Notes`
- Key column, if known: `RegistryId`
- Related Apps Script files/functions, if known: `SystemHealthSetup.js`, `SystemHealthRegistryValidation.js`, `setupAutomationRegistrySheet()`, `validateAutomationRegistrySchema()`
- Related AppSheet use, if known: future automation governance and health reporting.
- Risk level: Critical
- Status: `ACTIVE`
- Notes: Central governance table for automation and health architecture.

### Customers_Final

- SheetName: `Customers_Final`
- Purpose, if known: active customer master table.
- Header row / columns: `CustomerID`, `שם לקוח`, `איש קשר`, `טלפון`, `טלפון1`, `טלפון2`, `טלפון3`, `טלפון4`, `אימייל`, `אימייל1`, `אימייל2`, `אימייל3`, `אימייל4`, `אימייל5`, `אימייל6`, `כתובת / מתקן`, `הערות`, `פעיל`, `ח.פ/ע.מ/ת.ז`
- Key column, if known: `CustomerID`
- Related Apps Script files/functions, if known: `טופס HTML דוחות שירות.js`, `getReportData()`, `getCustomerNameById()`
- Related AppSheet use, if known: customer reference for ServiceReports.
- Risk level: Critical
- Status: `ACTIVE`
- Notes: Active customer source used by report rendering and Drive folder naming.

### ServiceReports

- SheetName: `ServiceReports`
- Purpose, if known: main service report table.
- Header row / columns: `ReportID`, `ReportCounter`, `מספר דוח`, `סטטוס דוח`, `תאריך שירות`, `שעת שירות`, `שעת שליחת הדוח`, `CustomerID`, `שם לקוח`, `אימייל לקוח לתצוגה`, `טלפון לקוח לתצוגה`, `טכנאי`, `סוג דוח`, `סוג ציוד`, `סוג שירות`, `תיאור השירות`, `תיאור העבודה שבוצעה`, `מונה שעות`, `לחץ`, `טמפ׳`, `מתח`, `זרם עומס`, `זרם סרק`, `בקר`, `מצב שמן`, `שמן הוחלף`, `סוג שמן`, `שעות מאז החלפה`, `החלפה הבאה בעוד`, `רצועות קיימות`, `מצב רצועות`, `מצמד קיים`, `מצב מצמד`, `מצב מערכת`, `בדיקות כלליות`, `המלצות ללקוח`, `טיפול הבא`, `חלקים שהוחלפו`, `נדרש טיפול נוסף`, `סיכום טכנאי`, `ClientSign`, `חתימת טכנאי`, `קישור PDF`, `נשלח במייל`, `תאריך יצירה`, `[blank]`, `[blank]`, `SendToEmails`, `זמן עבודת טכנאי`, `SignedHtmlFileUrl`, `WhatsAppToSign`, `טלפון לשליחה`, `אימייל נוסף לשליחה`, `CustomerFolderId`, `ReportDriveFileId`, `BusinessDraftCreated`, `DraftDocumentType`, `MavenDocumentCreated`, `MavenSentToCustomer`
- Key column, if known: `ReportID`; human/report number: `ReportCounter` / `מספר דוח`
- Related Apps Script files/functions, if known: `טופס HTML דוחות שירות.js`, `getReportData()`, `saveClientSignature()`, `saveSignedHtmlFile()`, `assignReportCounter()`, `sendReportEmail()`; `MavenAPI.js`, `updateServiceReportAfterBusinessDraftCreated_()`
- Related AppSheet use, if known: main service report table.
- Risk level: Critical
- Status: `ACTIVE`
- Notes: Two blank headers observed between `תאריך יצירה` and `SendToEmails`; schema drift risk.

### InspectionItems

- SheetName: `InspectionItems`
- Purpose, if known: likely inspection item support table.
- Header row / columns: `InspectionItems`
- Key column, if known: unknown
- Related Apps Script files/functions, if known: none confirmed.
- Related AppSheet use, if known: listed in Project Brain as AppSheet table.
- Risk level: Medium
- Status: `UNKNOWN`
- Notes: Row-1 schema appears incomplete or non-normalized.

### PartsUsed

- SheetName: `PartsUsed`
- Purpose, if known: parts used during service.
- Header row / columns: `PartsUsed`
- Key column, if known: unknown
- Related Apps Script files/functions, if known: `AIDraftHistory.js`, `generateBusinessDocumentItemsPreview()`, `findPartsUsedForAIDraft_()`
- Related AppSheet use, if known: AppSheet service/parts support table.
- Risk level: High
- Status: `UNKNOWN`
- Notes: Row-1 schema appears incomplete, but AI Draft code expects part fields and ReportID references.

### EmailLog

- SheetName: `EmailLog`
- Purpose, if known: email event log.
- Header row / columns: `EmailLog`
- Key column, if known: unknown
- Related Apps Script files/functions, if known: `EmailSender.js` may be related, but no direct write confirmed from current read.
- Related AppSheet use, if known: listed as AppSheet table.
- Risk level: Medium
- Status: `UNKNOWN`
- Notes: Row-1 schema appears incomplete or non-normalized.

### Lists

- SheetName: `Lists`
- Purpose, if known: dropdown/reference list values.
- Header row / columns: `סוג דוח`, `סוג ציוד`, `סוג שירות`, `מצב מערכת`, `מצב שמן`, `סוג שמן`, `כן/לא`, `סטטוס דוח`, `תת סוג ציוד למדחסי אויר`, `קטגוריית מדחס`
- Key column, if known: none; list columns.
- Related Apps Script files/functions, if known: none confirmed.
- Related AppSheet use, if known: likely AppSheet enum/list source.
- Risk level: Medium
- Status: `ACTIVE`
- Notes: Reference data table.

### SetupGuide

- SheetName: `SetupGuide`
- Purpose, if known: setup instructions.
- Header row / columns: `מטרה`, `פתיחת אפליקציית ספר דוחות שירות ב-AppSheet עם מספר דוח רץ, בחירת לקוח, PDF ושליחה למייל.`
- Key column, if known: none.
- Related Apps Script files/functions, if known: none.
- Related AppSheet use, if known: setup documentation.
- Risk level: Low
- Status: `LEGACY`
- Notes: Not a normalized table.

### PDF_Template

- SheetName: `PDF_Template`
- Purpose, if known: PDF/report template content.
- Header row / columns: `[blank]`, `[blank]`, `טל מדחסים...`
- Key column, if known: none.
- Related Apps Script files/functions, if known: `Report.html` supersedes much of report rendering; legacy PDF flow possible.
- Related AppSheet use, if known: likely report/PDF template support.
- Risk level: Medium
- Status: `LEGACY`
- Notes: Template-like sheet, not table schema.

### AppSheet_Formulas

- SheetName: `AppSheet_Formulas`
- Purpose, if known: AppSheet formula guide.
- Header row / columns: `עמודה`, `סוג`, `הגדרה מומלצת ב-AppSheet`
- Key column, if known: `עמודה`
- Related Apps Script files/functions, if known: none.
- Related AppSheet use, if known: formula/config documentation.
- Risk level: Low
- Status: `LEGACY`
- Notes: Documentation/config support.

### ServiceReport_Form_View

- SheetName: `ServiceReport_Form_View`
- Purpose, if known: sample/view guide for service report form.
- Header row / columns: `ספר דוחות שירות - תצוגת טופס לדוגמה`
- Key column, if known: none.
- Related Apps Script files/functions, if known: none.
- Related AppSheet use, if known: form/view planning.
- Risk level: Low
- Status: `LEGACY`
- Notes: Not a normalized table.

### ReportEquipmentItems

- SheetName: `ReportEquipmentItems`
- Purpose, if known: equipment/items linked to service reports.
- Header row / columns: `ItemID`, `ReportID`, `מספר ציוד`, `סוג ציוד`, `תת סוג ציוד`, `דגם הציוד`, `מס סידורי`, `תיאור השירות`, `מונה שעות נוכחי`, `טיפול הבא`, `תאריך החלפה עתידי`, `מסנן אויר`, `מסנן שמן`, `מפריד שמן`, `שמן`, `רצועות`, `מצמד`, `חלפים נוספים`, `מצב מערכת`, `חיישן חום`, `חיישן לחץ`, `בקר`, `טמפ מדחס`, `מתח בהזנה`, `זרם חשמלי בעומס`, `הערות נוספות להזנת החשמל`, `מצב סביבת המדחס`, `סיכום והמלצות טכנאי`, `קטגוריית מדחס`, `סוג שמן`
- Key column, if known: `ItemID`; parent key: `ReportID`
- Related Apps Script files/functions, if known: `טופס HTML דוחות שירות.js`, `getReportData()`; `AIDraftHistory.js`
- Related AppSheet use, if known: service report child table.
- Risk level: Critical
- Status: `ACTIVE`
- Notes: Must match `ServiceReports` by exact `ReportID` only.

### BusinessDocuments

- SheetName: `BusinessDocuments`
- Purpose, if known: internal business document/draft staging table.
- Header row / columns: `BusinessDocumentId`, `CustomerId`, `CustomerName`, `SourceReportId`, `SourceReportCounter`, `SourceDocumentId`, `DocumentTypeSuggested`, `DocumentTypeSelected`, `AIReasoning`, `DocumentStatus`, `DraftTitle`, `DocumentDescription`, `ItemsJson`, `SubtotalAmount`, `VATAmount`, `TotalAmount`, `Currency`, `ApprovalStatus`, `ApprovedBy`, `ApprovedAt`, `MavenDocumentId`, `MavenDocumentNumber`, `MavenPdfLink`, `SendByEmail`, `SendByWhatsApp`, `SelectedEmails`, `SelectedPhones`, `SendStatus`, `SendApprovedBy`, `SendApprovedAt`, `LastActionBy`, `LastActionAt`, `CreatedAt`, `UpdatedAt`, `SourceSystem`, `Notes`, `ProcessingCommandId`, `ProcessingStartedAt`
- Key column, if known: `BusinessDocumentId`
- Related Apps Script files/functions, if known: `MavenAPI.js`, `claimBusinessDocumentForCommand()`, `createMavenDraft()`; `AIDraftHistory.js`
- Related AppSheet use, if known: BusinessDocuments workflow and user approval.
- Risk level: Critical
- Status: `ACTIVE`
- Notes: Core queue/Maven draft staging table; idempotency uses `ProcessingCommandId`.

### BusinessDocumentItems

- SheetName: `BusinessDocumentItems`
- Purpose, if known: line items for business documents.
- Header row / columns: `ItemID`, `DocumentID`, `ItemName`, `Description`, `Quantity`, `UnitPrice`, `TotalPrice`, `Source`, `ItemType`, `NeedsPriceApproval`
- Key column, if known: `ItemID`; parent key: `DocumentID`
- Related Apps Script files/functions, if known: `AIDraftHistory.js`; `MavenAPI.js` context.
- Related AppSheet use, if known: line items for BusinessDocuments.
- Risk level: High
- Status: `ACTIVE`
- Notes: AI Draft output target after approval.

### BusinessDocumentLog

- SheetName: `BusinessDocumentLog`
- Purpose, if known: execution/audit log for business document processing.
- Header row / columns: `LogID`, `DateTime`, `Action`, `DocumentID`, `PerformedBy`, `Result`, `Notes`, `RawData`
- Key column, if known: `LogID`
- Related Apps Script files/functions, if known: `MavenAPI.js`, `doPost()`, `createMavenDraft()`
- Related AppSheet use, if known: audit/support.
- Risk level: High
- Status: `ACTIVE`
- Notes: Used for traceability of Maven/business-document flow.

### ApprovalsLog

- SheetName: `ApprovalsLog`
- Purpose, if known: approval event log.
- Header row / columns: `ApprovalID`, `DateTime`, `ActionType`, `RelatedID`, `Status`, `ApprovedBy`, `Notes`
- Key column, if known: `ApprovalID`
- Related Apps Script files/functions, if known: none confirmed.
- Related AppSheet use, if known: approval tracking.
- Risk level: High
- Status: `ACTIVE`
- Notes: Supports governance and human-control requirements.

### SecretAccessLog

- SheetName: `SecretAccessLog`
- Purpose, if known: secret/API credential access audit.
- Header row / columns: `LogID`, `DateTime`, `RequestedBy`, `SecretName`, `SystemName`, `Reason`, `ApprovalStatus`, `Result`
- Key column, if known: `LogID`
- Related Apps Script files/functions, if known: none confirmed.
- Related AppSheet use, if known: governance/security support.
- Risk level: High
- Status: `ACTIVE`
- Notes: Sensitive governance table; avoid exposing secrets.

### InvoiceMavenDocuments

- SheetName: `InvoiceMavenDocuments`
- Purpose, if known: imported Maven document headers/history.
- Header row / columns: `InvoiceMavenDocumentId`, `DocumentNumber`, `DocumentType`, `CustomerID`, `CustomerName`, `DocumentDate`, `TotalAmount`, `VAT`, `Status`, `PaymentStatus`, `PaymentMethod`, `PaidDate`, `PdfLink`, `RawJson`, `LastSyncDate`, `SyncStatus`, `Notes`, `LinkedBusinessDocumentID`, `DocumentYear`, `DocumentMonth`, `DocumentTypeText`, `CustomerNameClean`
- Key column, if known: `InvoiceMavenDocumentId`
- Related Apps Script files/functions, if known: `MavenAPI.js`, `syncMavenDocuments()`, `backfillMavenDocumentItemsFrom20230712Preview()`, `backfillMavenDocumentItemsFrom20230712Apply()`
- Related AppSheet use, if known: historical Maven data for AI/pricing/reference.
- Risk level: Critical
- Status: `ACTIVE`
- Notes: Large table; key source for historical pricing and Maven sync health.

### InvoiceMavenCustomers

- SheetName: `InvoiceMavenCustomers`
- Purpose, if known: imported Maven customer data.
- Header row / columns: `InvoiceMavenCustomerId`, `CustomerName`, `BusinessID`, `Phone`, `Email`, `Address`, `City`, `RawJson`, `LastSyncDate`, `SyncStatus`, `Notes`
- Key column, if known: `InvoiceMavenCustomerId`
- Related Apps Script files/functions, if known: Maven sync family; no direct function confirmed in local code read.
- Related AppSheet use, if known: Maven customer reference.
- Risk level: Medium
- Status: `ACTIVE`
- Notes: May overlap `Customers_Final`; review identity matching before use.

### ProductsCatalog

- SheetName: `ProductsCatalog`
- Purpose, if known: product/part catalog and pricing source.
- Header row / columns: `ProductID`, `SKU`, `ProductName`, `ProductDescription`, `Category`, `SubCategory`, `Brand`, `Supplier`, `PurchasePrice`, `SellingPrice`, `Currency`, `CompatibleEquipment`, `Status`, `SourceSystem`, `LastSyncDate`, `Notes`
- Key column, if known: `ProductID`; match key: `SKU`
- Related Apps Script files/functions, if known: `AIDraftHistory.js`, `findCatalogMatchForPart_()`
- Related AppSheet use, if known: product/catalog reference.
- Risk level: High
- Status: `ACTIVE`
- Notes: Primary AI Draft pricing source before historical fallback.

### InventoryStock

- SheetName: `InventoryStock`
- Purpose, if known: inventory stock state.
- Header row / columns: `StockID`, `ProductID`, `SKU`, `ProductName`, `CurrentQuantity`, `MinimumQuantity`, `ReservedQuantity`, `AvailableQuantity`, `WarehouseLocation`, `LastUpdate`, `Status`
- Key column, if known: `StockID`
- Related Apps Script files/functions, if known: none confirmed.
- Related AppSheet use, if known: future inventory/procurement.
- Risk level: Medium
- Status: `ACTIVE`
- Notes: Overlaps target Inventory & Procurement Factory.

### SuppliersProducts

- SheetName: `SuppliersProducts`
- Purpose, if known: supplier product and procurement data.
- Header row / columns: `SupplierProductID`, `SupplierName`, `SKU`, `SupplierSKU`, `PurchasePrice`, `LeadTimeDays`, `MOQ`, `LastPriceUpdate`, `Notes`
- Key column, if known: `SupplierProductID`
- Related Apps Script files/functions, if known: none confirmed.
- Related AppSheet use, if known: future procurement support.
- Risk level: Medium
- Status: `ACTIVE`
- Notes: Overlaps supplier/procurement future architecture.

### AIDraftSuggestions

- SheetName: `AIDraftSuggestions`
- Purpose, if known: AI suggestion staging table.
- Header row / columns: `SuggestionID`, `CreatedDate`, `CustomerID`, `SourceReportID`, `SourceType`, `SuggestedDocumentType`, `SuggestedTitle`, `SuggestedItems`, `SuggestedNotes`, `SourceSummary`, `ConfidenceLevel`, `RequiresApproval`, `ApprovalStatus`, `ApprovedBy`, `RelatedBusinessDocumentID`, `AIReasoning`, `SuggestedTotalAmount`, `SuggestedPriority`, `Status`, `CreatedBy`, `Notes`
- Key column, if known: `SuggestionID`
- Related Apps Script files/functions, if known: AI Draft family; current local `AIDraftHistory.js` returns preview rather than confirmed writes.
- Related AppSheet use, if known: AI recommendation approval/staging.
- Risk level: High
- Status: `ACTIVE`
- Notes: Could overlap with `BusinessDocuments` AI recommendation fields; review before expanding.

### InvoiceMavenItems

- SheetName: `InvoiceMavenItems`
- Purpose, if known: imported Maven item/product catalog.
- Header row / columns: `InvoiceMavenItemId`, `SKU`, `ExternalItemNumber`, `ItemName`, `ItemDescription`, `UnitPrice`, `PurchasePrice`, `Currency`, `StockQuantity`, `RawJson`, `LastSyncDate`, `SyncStatus`, `Notes`, `LinkedProductID`
- Key column, if known: `InvoiceMavenItemId`
- Related Apps Script files/functions, if known: Maven sync family.
- Related AppSheet use, if known: Maven item reference.
- Risk level: Medium
- Status: `ACTIVE`
- Notes: May overlap `ProductsCatalog`; useful for future catalog reconciliation.

### InvoiceMavenDocumentItems

- SheetName: `InvoiceMavenDocumentItems`
- Purpose, if known: imported Maven document line items/history.
- Header row / columns: `ItemRowId`, `MavenDocumentId`, `DocumentNumber`, `DocumentDate`, `CustomerId`, `CustomerName`, `DocumentType`, `ItemDescription`, `Quantity`, `UnitPrice`, `LineTotal`, `Currency`, `RawItem`, `ImportedAt`
- Key column, if known: `ItemRowId`; parent key: `MavenDocumentId`
- Related Apps Script files/functions, if known: `MavenAPI.js`, `syncMavenDocuments()`, backfill functions; `AIDraftHistory.js`, historical pricing search.
- Related AppSheet use, if known: historical line item reference.
- Risk level: Critical
- Status: `ACTIVE`
- Notes: Large table; important for AI Draft pricing and Maven sync bug.

### SyncLog

- SheetName: `SyncLog`
- Purpose, if known: sync execution log.
- Header row / columns: `[blank/space]`, `Source`, `Added`, `Skipped`, `Status`, `Notes`
- Key column, if known: none.
- Related Apps Script files/functions, if known: `MavenAPI.js`, `syncMavenDocuments()`, `syncMavenDocumentsDaily()`
- Related AppSheet use, if known: sync observability.
- Risk level: High
- Status: `ACTIVE`
- Notes: First header cell is blank/space; schema cleanup may be needed later with approval.

### ErrorLog

- SheetName: `ErrorLog`
- Purpose, if known: error logging.
- Header row / columns: `DateTime`, `Source`, `FunctionName`, `ErrorMessage`, `RawError`, `Status`
- Key column, if known: none.
- Related Apps Script files/functions, if known: `MavenAPI.js`, `syncMavenDocuments()` catch block.
- Related AppSheet use, if known: error observability.
- Risk level: High
- Status: `ACTIVE`
- Notes: Used for Maven sync errors.

### SyncState

- SheetName: `SyncState`
- Purpose, if known: sync checkpoints/state.
- Header row / columns: `Source`, `Key`, `Value`, `UpdatedAt`
- Key column, if known: composite `Source` + `Key`
- Related Apps Script files/functions, if known: `MavenAPI.js`, `syncMavenDocuments()`
- Related AppSheet use, if known: sync control.
- Risk level: Critical
- Status: `ACTIVE`
- Notes: Do not change without approval; Maven pagination depends on this table.

### AutomationCommands

- SheetName: `AutomationCommands`
- Purpose, if known: queue table for safe automation execution.
- Header row / columns: `CommandID`, `CommandName`, `CommandType`, `Status`, `RequestedBy`, `RequestedAt`, `Result`, `CompletedAt`, `Notes`, `BusinessDocumentId`, `Command`, `ProcessedAt`, `ErrorMessage`
- Key column, if known: `CommandID`
- Related Apps Script files/functions, if known: `MavenAPI.js`, `doPost()`, `claimAutomationCommand()`, `updateAutomationCommandStatus()`
- Related AppSheet use, if known: AppSheet Bot creates/handles queued commands.
- Risk level: Critical
- Status: `ACTIVE`
- Notes: Core safety architecture; protects against duplicate AppSheet Bot / Apps Script execution.

### AppMenu

- SheetName: `AppMenu`
- Purpose, if known: application menu/navigation configuration.
- Header row / columns: `MenuName`, `Icon`, `Order`, `Target`, `דוחות שירות`
- Key column, if known: `MenuName`
- Related Apps Script files/functions, if known: none confirmed.
- Related AppSheet use, if known: likely AppSheet menu/navigation source.
- Risk level: Low
- Status: `ACTIVE`
- Notes: App UI support table.
