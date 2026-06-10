function setupAutomationRegistrySheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheetName = 'AutomationRegistry';
  const existingSheet = ss.getSheetByName(sheetName);

  if (existingSheet) {
    return {
      success: true,
      created: false,
      modified: false,
      sheetName: sheetName,
      existingRows: existingSheet.getLastRow(),
      existingColumns: existingSheet.getLastColumn(),
      message: 'AutomationRegistry already exists. No changes applied.'
    };
  }

  const sheet = ss.insertSheet(sheetName);

  const headers = [
    'RegistryId',
    'RegistryVersion',
    'VersionStatus',
    'Enabled',
    'LastChangedAt',
    'LastChangedBy',
    'SystemArea',
    'BusinessProcess',
    'BusinessObjectType',
    'BusinessObjectIdField',
    'LifecycleStage',
    'SystemOfRecord',
    'AutomationName',
    'AutomationType',
    'Description',
    'Owner',
    'RiskLevel',
    'ProductionImpact',
    'CustomerImpactLevel',
    'FinancialImpactLevel',
    'IntegrationType',
    'ExternalSystemName',
    'ExternalObjectType',
    'ExternalObjectIdField',
    'ExternalEndpointOrAction',
    'ManualOrAutomaticTrigger',
    'TriggerSource',
    'TriggerCondition',
    'TriggerSchedule',
    'AppSheetTable',
    'AppSheetActionName',
    'AppSheetBotName',
    'AutomationCommandName',
    'AppsScriptFile',
    'AppsScriptFunction',
    'InputTables',
    'OutputTables',
    'KeyInputFields',
    'KeyOutputFields',
    'DriveEffectType',
    'DriveExpectedResult',
    'MavenEffectType',
    'MavenExpectedResult',
    'ExternalApiEffect',
    'ExpectedResult',
    'ExpectedStatusTransition',
    'ExpectedMaxDurationMinutes',
    'ExpectedBusinessOutcome',
    'BusinessOutcomeCategory',
    'PrimaryBusinessMetric',
    'HealthCheckId',
    'HealthCheckName',
    'HealthCheckMode',
    'HealthCheckQuery',
    'FailureSignals',
    'RootCauseHints',
    'SuggestedFix',
    'SuggestedFixRequiresApproval',
    'ApprovalRequired',
    'ApprovalPolicy',
    'ApprovalRoleRequired',
    'ApprovalBeforeAction',
    'ApprovalEvidenceRequired',
    'ApprovalStatus',
    'RollbackSupported',
    'RollbackStrategy',
    'SafeRetryAllowed',
    'RetryPolicy',
    'IdempotencyKeyFields',
    'DuplicateDetectionRule',
    'BackupRequiredBeforeChange',
    'DataSensitivity',
    'AccessScopeRequired',
    'McpEnabled',
    'AllowedTools',
    'ForbiddenTools',
    'ProductionWriteAllowed',
    'ExternalWriteAllowed',
    'TestModeAvailable',
    'DryRunSupported',
    'LearningEnabled',
    'LearningCategory',
    'LearningDataAllowed',
    'FeedbackSource',
    'SuccessMetric',
    'FailureMetric',
    'SafetyRules',
    'SourceAttribution',
    'AuditLogTarget',
    'DailyHealthReportInclude',
    'DailyHealthReportPriority',
    'LastVerifiedAt',
    'LastVerifiedBy',
    'LastHealthStatus',
    'LastFailureAt',
    'LastFailureDetails',
    'RelatedIdsToReport',
    'Notes'
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#1f4e78')
    .setFontColor('#ffffff')
    .setHorizontalAlignment('center')
    .setWrap(true);
  sheet.getRange(1, 1, Math.max(sheet.getMaxRows(), 2), headers.length).setWrap(true);
  sheet.autoResizeColumns(1, headers.length);

  applyAutomationRegistryDropdowns_(sheet, headers);
  applyAutomationRegistryConditionalFormatting_(sheet, headers);
  const seedRowCount = seedAutomationRegistryRows_(sheet, headers);

  return {
    success: true,
    created: true,
    modified: true,
    sheetName: sheetName,
    headerCount: headers.length,
    seedRowCount: seedRowCount,
    message: 'AutomationRegistry created with v1.0 headers, formatting, validations, conditional formatting, and seed rows.'
  };
}

function applyAutomationRegistryDropdowns_(sheet, headers) {
  const dropdowns = {
    RiskLevel: ['Low', 'Medium', 'High', 'Critical'],
    VersionStatus: ['Draft', 'Active', 'Deprecated', 'Archived'],
    AutomationType: [
      'AppSheetAction',
      'AppSheetBot',
      'AutomationCommand',
      'AppsScriptFunction',
      'SchemaDefinition',
      'HealthCheck',
      'ExternalApi',
      'CompositeFlow'
    ],
    ApprovalStatus: ['NotRequired', 'Pending', 'Approved', 'Rejected', 'Expired'],
    LastHealthStatus: ['Unknown', 'Pass', 'Warning', 'Critical', 'Skipped'],
    IntegrationType: [
      'GoogleSheets',
      'GoogleDrive',
      'AppSheet',
      'AppsScript',
      'Maven',
      'Invoice4u',
      'Gmail',
      'GoogleCalendar',
      'ExcelImport',
      'Inventory',
      'MCP',
      'AIAgent'
    ],
    ManualOrAutomaticTrigger: [
      'Manual',
      'Automatic',
      'Scheduled',
      'Webhook',
      'Queue',
      'ReadOnlyHealthCheck'
    ]
  };

  Object.keys(dropdowns).forEach(function(header) {
    const column = headers.indexOf(header) + 1;
    if (column < 1) return;

    const rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(dropdowns[header], true)
      .setAllowInvalid(false)
      .build();

    sheet.getRange(2, column, sheet.getMaxRows() - 1, 1).setDataValidation(rule);
  });
}

function applyAutomationRegistryConditionalFormatting_(sheet, headers) {
  const lastHealthStatusColumn = headers.indexOf('LastHealthStatus') + 1;
  const riskLevelColumn = headers.indexOf('RiskLevel') + 1;
  const dataRows = sheet.getMaxRows() - 1;
  const ranges = [];

  if (riskLevelColumn > 0) {
    ranges.push(sheet.getRange(2, riskLevelColumn, dataRows, 1));
  }

  if (lastHealthStatusColumn > 0) {
    ranges.push(sheet.getRange(2, lastHealthStatusColumn, dataRows, 1));
  }

  const rules = [
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Critical')
      .setBackground('#f4cccc')
      .setFontColor('#990000')
      .setRanges(ranges)
      .build(),
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Warning')
      .setBackground('#fff2cc')
      .setFontColor('#7f6000')
      .setRanges(ranges)
      .build(),
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Pass')
      .setBackground('#d9ead3')
      .setFontColor('#274e13')
      .setRanges(ranges)
      .build()
  ];

  sheet.setConditionalFormatRules(rules);
}

function seedAutomationRegistryRows_(sheet, headers) {
  const rows = [
    {
      RegistryId: 'REGISTRY_SCHEMA',
      RegistryVersion: '1.0.0',
      VersionStatus: 'Active',
      Enabled: true,
      SystemArea: 'System Health',
      BusinessProcess: 'Automation registry governance',
      BusinessObjectType: 'AutomationRegistry',
      BusinessObjectIdField: 'RegistryId',
      LifecycleStage: 'Governance',
      SystemOfRecord: 'GoogleSheets',
      AutomationName: 'AutomationRegistry Schema',
      AutomationType: 'SchemaDefinition',
      Description: 'Defines the AutomationRegistry v1.0 schema contract.',
      Owner: 'Liad / System Health Agent',
      RiskLevel: 'Critical',
      ProductionImpact: false,
      IntegrationType: 'GoogleSheets',
      ManualOrAutomaticTrigger: 'ReadOnlyHealthCheck',
      ExpectedResult: 'AutomationRegistry schema v1.0 exists and can be validated.',
      SafetyRules: 'Do not modify registry schema without approved migration.',
      SourceAttribution: 'Safe Setup Strategy; validateAutomationRegistrySchema design.',
      LastHealthStatus: 'Unknown'
    },
    {
      RegistryId: 'AR-SR-DRIVE-001',
      RegistryVersion: '1.0.0',
      VersionStatus: 'Active',
      Enabled: true,
      SystemArea: 'ServiceReports',
      BusinessProcess: 'Service report file generation',
      BusinessObjectType: 'ServiceReport',
      BusinessObjectIdField: 'ReportID, ReportCounter',
      LifecycleStage: 'Delivery',
      SystemOfRecord: 'GoogleSheets',
      AutomationName: 'SaveReportToDrive',
      AutomationType: 'CompositeFlow',
      Description: 'Creates or updates the signed service report HTML file in the customer Drive folder and writes file references back to ServiceReports.',
      Owner: 'Liad / Apps Script',
      RiskLevel: 'Critical',
      ProductionImpact: true,
      CustomerImpactLevel: 'High',
      FinancialImpactLevel: 'Medium',
      IntegrationType: 'GoogleDrive',
      ExternalSystemName: 'Google Drive',
      ExternalObjectType: 'HTML file / customer folder',
      ManualOrAutomaticTrigger: 'Manual',
      TriggerSource: 'AppSheet Save Report To Drive action or related Apps Script call',
      AppSheetTable: 'ServiceReports',
      AppSheetActionName: 'Save Report To Drive',
      AppsScriptFile: 'טופס HTML דוחות שירות.js',
      AppsScriptFunction: 'saveSignedHtmlFile(reportId), createReportFile(reportId)',
      InputTables: 'ServiceReports, Customers_Final',
      OutputTables: 'ServiceReports',
      KeyInputFields: 'ReportID, ReportCounter, CustomerID, ClientSign',
      KeyOutputFields: 'SignedHtmlFileUrl, ReportDriveFileId',
      DriveEffectType: 'FindFolder/CreateFile/UpdateFile',
      DriveExpectedResult: 'One customer folder and one active HTML service report file for the ReportID.',
      MavenEffectType: 'None',
      ExpectedResult: 'SignedHtmlFileUrl and ReportDriveFileId point to one existing Drive HTML file.',
      ExpectedBusinessOutcome: 'Signed service report can be opened and shared from Drive.',
      BusinessOutcomeCategory: 'Customer service',
      PrimaryBusinessMetric: 'Signed report file availability',
      HealthCheckId: 'HC-001, HC-007, HC-008, HC-020',
      HealthCheckName: 'Signed report Drive output health',
      HealthCheckMode: 'ScheduledReadOnly',
      HealthCheckQuery: 'Signed reports must have valid SignedHtmlFileUrl and exactly one active Drive HTML file.',
      FailureSignals: 'Signed report with empty SignedHtmlFileUrl; broken Drive URL; duplicate HTML files for the same ReportID.',
      RootCauseHints: 'AppSheet bot condition, webhook URL, missing ReportCounter timing, customer folder lookup, duplicate protection.',
      SuggestedFix: 'Inspect one ReportID, verify folder/file lookup, then approve a targeted repair.',
      SuggestedFixRequiresApproval: true,
      ApprovalRequired: true,
      ApprovalPolicy: 'Approval required before changing Drive save logic or repairing production records.',
      ApprovalRoleRequired: 'Liad',
      ApprovalBeforeAction: 'Any production write or duplicate-file cleanup',
      ApprovalEvidenceRequired: 'Affected ReportID, current Drive file state, proposed repair action',
      ApprovalStatus: 'NotRequired',
      RollbackSupported: true,
      RollbackStrategy: 'Revert Apps Script change or restore previous file/link values from audit evidence.',
      SafeRetryAllowed: true,
      RetryPolicy: 'Manual only after duplicate check',
      IdempotencyKeyFields: 'ReportID, ReportCounter, ReportDriveFileId',
      DuplicateDetectionRule: 'One active HTML file per ReportID and one customer folder per customer.',
      BackupRequiredBeforeChange: true,
      DataSensitivity: 'CustomerPII',
      AccessScopeRequired: 'Drive metadata/read/write for approved setup only',
      McpEnabled: false,
      AllowedTools: 'Apps Script, Google Sheets, Google Drive metadata',
      ForbiddenTools: 'Maven, Invoice4u, Gmail',
      ProductionWriteAllowed: false,
      ExternalWriteAllowed: false,
      TestModeAvailable: true,
      DryRunSupported: true,
      LearningEnabled: true,
      LearningCategory: 'Drive reliability',
      LearningDataAllowed: true,
      FeedbackSource: 'SystemHealthLog, manual review',
      SuccessMetric: 'Signed reports with valid Drive file links',
      FailureMetric: 'Signed reports missing or duplicating Drive files',
      SafetyRules: 'Do not break manual save, existing folder links, ReportCounter, or report rendering.',
      SourceAttribution: 'CURRENT_BUGS Bug 1; SYSTEM_HEALTH_AGENT_PLAN HC-001/007/008/020; APPS_SCRIPT_MAP.',
      AuditLogTarget: 'SystemHealthLog',
      DailyHealthReportInclude: true,
      DailyHealthReportPriority: 10,
      LastHealthStatus: 'Unknown',
      RelatedIdsToReport: 'ReportID, ReportCounter, SignedHtmlFileUrl',
      Notes: 'Setup row only. Function must not be run or deployed without approval.'
    },
    {
      RegistryId: 'AR-BD-MAVEN-001',
      RegistryVersion: '1.0.0',
      VersionStatus: 'Active',
      Enabled: true,
      SystemArea: 'BusinessDocuments',
      BusinessProcess: 'Business document draft creation',
      BusinessObjectType: 'BusinessDocument',
      BusinessObjectIdField: 'BusinessDocumentId, AutomationCommandId, MavenDocumentId',
      LifecycleStage: 'Execution',
      SystemOfRecord: 'GoogleSheets',
      AutomationName: 'CreateMavenDraft',
      AutomationType: 'AutomationCommand',
      Description: 'Processes queued CreateMavenDraft commands through Apps Script and updates BusinessDocuments / AutomationCommands status.',
      Owner: 'Liad / Apps Script',
      RiskLevel: 'Critical',
      ProductionImpact: true,
      CustomerImpactLevel: 'High',
      FinancialImpactLevel: 'High',
      IntegrationType: 'Maven',
      ExternalSystemName: 'Maven',
      ExternalObjectType: 'Draft document',
      ManualOrAutomaticTrigger: 'Queue',
      TriggerSource: 'AutomationCommands row with Command = CreateMavenDraft',
      AppSheetTable: 'AutomationCommands',
      AppSheetBotName: 'AutomationCommands Bot',
      AutomationCommandName: 'CreateMavenDraft',
      AppsScriptFile: 'MavenAPI.js',
      AppsScriptFunction: 'doPost(e), claimAutomationCommand(commandId), claimBusinessDocumentForCommand(businessDocumentId, commandId), createMavenDraft(data)',
      InputTables: 'AutomationCommands, BusinessDocuments, BusinessDocumentItems',
      OutputTables: 'AutomationCommands, BusinessDocuments, BusinessDocumentLog, ServiceReports',
      KeyInputFields: 'CommandID, BusinessDocumentId, Command, Status',
      KeyOutputFields: 'AutomationCommands.Status, BusinessDocuments.DocumentStatus, ProcessingCommandId, ProcessingStartedAt, MavenDocumentId',
      DriveEffectType: 'None',
      MavenEffectType: 'CreateDraft',
      MavenExpectedResult: 'One approved BusinessDocument creates no more than one Maven draft after user approval.',
      ExpectedResult: 'Each command is processed once and reaches Completed, Error, or Cancelled with traceable log evidence.',
      ExpectedStatusTransition: 'Pending -> Running -> Completed',
      ExpectedMaxDurationMinutes: 30,
      ExpectedBusinessOutcome: 'Approved business document is converted to one controlled Maven draft.',
      BusinessOutcomeCategory: 'Revenue operations',
      PrimaryBusinessMetric: 'Draft creation success without duplicates',
      HealthCheckId: 'HC-011, HC-012, HC-013, HC-014, HC-015',
      HealthCheckName: 'Maven draft queue health',
      HealthCheckMode: 'ScheduledReadOnly',
      HealthCheckQuery: 'AutomationCommands must not stay Pending/Running over 30 minutes and must not process duplicates.',
      FailureSignals: 'Stuck Pending/Running command; duplicate command processing; duplicated MavenDocumentId; BusinessDocument stuck in draft request.',
      RootCauseHints: 'Bot webhook failure, Apps Script error, idempotency guard claim, manual recovery required after failed claim.',
      SuggestedFix: 'Review BusinessDocumentLog and AutomationCommands status before approving retry or manual recovery.',
      SuggestedFixRequiresApproval: true,
      ApprovalRequired: true,
      ApprovalPolicy: 'Approval required before creating Maven documents, retrying claimed commands, or clearing ProcessingCommandId.',
      ApprovalRoleRequired: 'Liad',
      ApprovalBeforeAction: 'Maven creation, queue retry, manual recovery',
      ApprovalEvidenceRequired: 'BusinessDocumentId, AutomationCommandId, current statuses, log evidence',
      ApprovalStatus: 'NotRequired',
      RollbackSupported: false,
      RollbackStrategy: 'No automatic rollback for external Maven side effects; use manual recovery procedure.',
      SafeRetryAllowed: false,
      RetryPolicy: 'Manual only after idempotency and Maven duplicate check',
      IdempotencyKeyFields: 'BusinessDocumentId, ProcessingCommandId, MavenDocumentId',
      DuplicateDetectionRule: 'One BusinessDocumentId may create one MavenDocumentId only.',
      BackupRequiredBeforeChange: true,
      DataSensitivity: 'FinancialData',
      AccessScopeRequired: 'Google Sheets read/write; Maven API only after approval',
      McpEnabled: false,
      AllowedTools: 'Apps Script, Google Sheets',
      ForbiddenTools: 'Gmail, Calendar, Invoice4u',
      ProductionWriteAllowed: false,
      ExternalWriteAllowed: false,
      TestModeAvailable: true,
      DryRunSupported: false,
      LearningEnabled: true,
      LearningCategory: 'Queue reliability and draft creation',
      LearningDataAllowed: true,
      FeedbackSource: 'BusinessDocumentLog, AutomationCommands, SystemHealthLog',
      SuccessMetric: 'Commands completed once without duplicate drafts',
      FailureMetric: 'Stuck commands, duplicate processing, duplicate Maven drafts',
      SafetyRules: 'Preserve AutomationCommands queue architecture; do not let AppSheet Bot and Apps Script update the same row; no Maven creation without approval.',
      SourceAttribution: 'DECISION_LOG 2026-05-25/2026-06-08; SYSTEM_MAP; SYSTEM_HEALTH_RULES; PROJECT_BRAIN_MASTER.',
      AuditLogTarget: 'BusinessDocumentLog, SystemHealthLog',
      DailyHealthReportInclude: true,
      DailyHealthReportPriority: 20,
      LastHealthStatus: 'Unknown',
      RelatedIdsToReport: 'BusinessDocumentId, AutomationCommandId, MavenDocumentId',
      Notes: 'Setup row only. Does not run Maven logic.'
    },
    {
      RegistryId: 'AR-AI-PREVIEW-001',
      RegistryVersion: '1.0.0',
      VersionStatus: 'Active',
      Enabled: true,
      SystemArea: 'AI Draft',
      BusinessProcess: 'AI draft recommendation',
      BusinessObjectType: 'ServiceReport',
      BusinessObjectIdField: 'ReportCounter, ReportID',
      LifecycleStage: 'Recommendation',
      SystemOfRecord: 'GoogleSheets',
      AutomationName: 'GenerateBusinessDocumentItemsPreview',
      AutomationType: 'AppsScriptFunction',
      Description: 'Generates preview-only BusinessDocumentItems recommendations from one ServiceReport without writing production rows.',
      Owner: 'Liad / AI Draft Agent',
      RiskLevel: 'Medium',
      ProductionImpact: false,
      CustomerImpactLevel: 'Low',
      FinancialImpactLevel: 'Medium',
      IntegrationType: 'AIAgent',
      ExternalSystemName: 'AI Draft Agent',
      ExternalObjectType: 'Preview recommendation',
      ManualOrAutomaticTrigger: 'Manual',
      TriggerSource: 'Manual one-report AI Draft preview request',
      AppsScriptFile: 'AIDraftHistory.js',
      AppsScriptFunction: 'generateBusinessDocumentItemsPreview(reportCounter)',
      InputTables: 'ServiceReports, ReportEquipmentItems, PartsUsed, ProductsCatalog, InvoiceMavenDocumentItems',
      OutputTables: 'None',
      KeyInputFields: 'ReportCounter, ReportID',
      KeyOutputFields: 'None',
      DriveEffectType: 'None',
      MavenEffectType: 'ValidateOnly',
      MavenExpectedResult: 'No Maven call and no Maven document creation.',
      ExpectedResult: 'Returns preview_only suggested items, approval summary, warnings, and no created rows.',
      ExpectedBusinessOutcome: 'User receives a draft recommendation for review before any production action.',
      BusinessOutcomeCategory: 'Revenue operations',
      PrimaryBusinessMetric: 'Recommendation completeness and approval readiness',
      HealthCheckId: '',
      HealthCheckName: 'AI Draft preview safety',
      HealthCheckMode: 'Manual',
      HealthCheckQuery: 'Preview function must remain read-only and return approval-required output.',
      FailureSignals: 'Missing report; missing parts; missing pricing sources; unexpected writes; Maven/email/status side effects.',
      RootCauseHints: 'Report matching fields, PartsUsed linkage, ProductsCatalog coverage, historical Maven item availability.',
      SuggestedFix: 'Review source data and pricing sources before approving any draft-row creation.',
      SuggestedFixRequiresApproval: true,
      ApprovalRequired: true,
      ApprovalPolicy: 'Approval required before creating internal draft rows or sending anything to Maven.',
      ApprovalRoleRequired: 'Liad',
      ApprovalBeforeAction: 'BusinessDocuments write, BusinessDocumentItems write, Maven creation, email sending',
      ApprovalEvidenceRequired: 'Preview output, pricing reasoning, NeedsPriceApproval flags',
      ApprovalStatus: 'NotRequired',
      RollbackSupported: true,
      RollbackStrategy: 'Preview-only function has no production side effects; revert code if behavior changes.',
      SafeRetryAllowed: true,
      RetryPolicy: 'Manual retry allowed',
      IdempotencyKeyFields: 'ReportCounter, ReportID',
      DuplicateDetectionRule: 'Preview must not create persistent rows.',
      BackupRequiredBeforeChange: false,
      DataSensitivity: 'CustomerPII, FinancialData',
      AccessScopeRequired: 'Google Sheets read-only for preview',
      McpEnabled: false,
      AllowedTools: 'Apps Script, Google Sheets',
      ForbiddenTools: 'Maven, Invoice4u, Gmail, Calendar',
      ProductionWriteAllowed: false,
      ExternalWriteAllowed: false,
      TestModeAvailable: true,
      DryRunSupported: true,
      LearningEnabled: true,
      LearningCategory: 'Pricing recommendation quality',
      LearningDataAllowed: true,
      FeedbackSource: 'Human approval, manual correction, future recommendation review',
      SuccessMetric: 'Preview contains complete items and clear approval flags',
      FailureMetric: 'Missing source data, missing prices, incorrect confidence, unexpected side effects',
      SafetyRules: 'No Maven creation, no email, no production status update, no payment update.',
      SourceAttribution: 'AIDraftHistory.js; RUN_AI_DRAFT_AGENT.md; AI_DRAFT_EXECUTION_CHECKLIST.md.',
      AuditLogTarget: 'SystemHealthLog',
      DailyHealthReportInclude: false,
      DailyHealthReportPriority: 90,
      LastHealthStatus: 'Unknown',
      RelatedIdsToReport: 'ReportCounter, ReportID',
      Notes: 'Setup row only. Preview remains dry-run only.'
    }
  ];

  const existingIds = getAutomationRegistryExistingIds_(sheet);
  const values = rows
    .filter(function(row) {
      return existingIds.indexOf(row.RegistryId) === -1;
    })
    .map(function(row) {
      return headers.map(function(header) {
        return Object.prototype.hasOwnProperty.call(row, header) ? row[header] : '';
      });
    });

  if (values.length > 0) {
    sheet.getRange(sheet.getLastRow() + 1, 1, values.length, headers.length).setValues(values);
  }

  return values.length;
}

function getAutomationRegistryExistingIds_(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];

  return sheet.getRange(2, 1, lastRow - 1, 1)
    .getValues()
    .map(function(row) {
      return String(row[0] || '').trim();
    })
    .filter(Boolean);
}

function setupHealthCheckRegistrySheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheetName = 'HealthCheckRegistry';
  const existingSheet = ss.getSheetByName(sheetName);

  if (existingSheet) {
    return {
      success: true,
      created: false,
      modified: false,
      sheetName: sheetName,
      existingRows: existingSheet.getLastRow(),
      existingColumns: existingSheet.getLastColumn(),
      message: 'HealthCheckRegistry already exists. No changes applied.'
    };
  }

  const sheet = ss.insertSheet(sheetName);
  const headers = getHealthCheckRegistryHeaders_();

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#1f4e78')
    .setFontColor('#ffffff')
    .setHorizontalAlignment('center')
    .setWrap(true);
  sheet.getRange(1, 1, Math.max(sheet.getMaxRows(), 2), headers.length).setWrap(true);
  sheet.autoResizeColumns(1, headers.length);

  applyHealthCheckRegistryDropdowns_(sheet, headers);
  applyHealthCheckRegistryConditionalFormatting_(sheet, headers);
  const seedRowCount = seedHealthCheckRegistryRows_(sheet, headers);

  return {
    success: true,
    created: true,
    modified: true,
    sheetName: sheetName,
    headerCount: headers.length,
    seedRowCount: seedRowCount,
    message: 'HealthCheckRegistry created with v1.0 headers, formatting, validations, conditional formatting, and seed rows.'
  };
}

function getHealthCheckRegistryHeaders_() {
  return [
    'HealthCheckId',
    'Name',
    'Description',
    'SystemArea',
    'Severity',
    'RiskLevel',
    'BusinessImpact',
    'CheckType',
    'ExecutionMode',
    'Frequency',
    'DependsOn',
    'Enabled',
    'ReadOnlyCheck',
    'AutoRepairAllowed',
    'RequiresApproval',
    'TargetObject',
    'TargetTable',
    'TargetField',
    'RelatedAutomationRegistryId',
    'DataSource',
    'ValidationFunction',
    'ExpectedResult',
    'FailureCondition',
    'FailureCategory',
    'SuggestedFix',
    'ApprovalPolicy',
    'EscalationPolicy',
    'SafetyRules',
    'LearningEligible',
    'LastRun',
    'LastStatus',
    'LastFailureReason',
    'LastRelatedId',
    'LastRunBy',
    'OutputLogTarget',
    'AlertEligible',
    'AlertThreshold',
    'Owner',
    'SourceAttribution',
    'RegistryVersion',
    'VersionStatus',
    'CreatedAt',
    'UpdatedAt',
    'Notes'
  ];
}

function applyHealthCheckRegistryDropdowns_(sheet, headers) {
  const dropdowns = {
    SystemArea: [
      'ServiceReports',
      'Drive',
      'AutomationCommands',
      'BusinessDocuments',
      'BusinessDocumentLog',
      'Maven',
      'AppsScript',
      'AppSheet',
      'AI Draft',
      'Registry',
      'System Health'
    ],
    Severity: ['Info', 'Warning', 'Critical'],
    RiskLevel: ['Low', 'Medium', 'High', 'Critical'],
    BusinessImpact: [
      'None',
      'Operational',
      'CustomerService',
      'Revenue',
      'CashCollection',
      'FinancialAccuracy',
      'Compliance',
      'Inventory',
      'SupplierOperations',
      'DataQuality',
      'SystemReliability'
    ],
    CheckType: [
      'Existence',
      'Uniqueness',
      'StatusFlow',
      'QueueHealth',
      'DriveFileAccess',
      'DriveFolderAccess',
      'Permission',
      'FieldIntegrity',
      'LogErrorScan',
      'ApiState',
      'RegistrySchema',
      'IndirectBotHealth'
    ],
    ExecutionMode: ['ReadOnly', 'Diagnostic', 'Simulation', 'ApprovedRepair', 'Disabled'],
    Frequency: ['Manual', 'EveryRun', 'DailyMorning', 'DailyNight', 'Scheduled', 'OnDemand', 'FutureSimulation'],
    FailureCategory: [
      'MissingData',
      'DuplicateData',
      'BrokenLink',
      'MissingDriveObject',
      'DrivePermission',
      'QueueStuck',
      'StatusFlowBroken',
      'DuplicateExecution',
      'ApiFailure',
      'RateLimit',
      'SchemaDrift',
      'FieldDrift',
      'LogError',
      'TimingDelay',
      'ConfigurationError',
      'ApprovalBlocked',
      'Unknown'
    ],
    EscalationPolicy: [
      'None',
      'DailyReportOnly',
      'NotifyOwner',
      'NotifyOwnerCriticalOnly',
      'ManualReview',
      'BlockDependentChecks',
      'FutureAlertWorkflow'
    ],
    LastStatus: ['Unknown', 'Pass', 'Warning', 'Critical', 'Skipped', 'Error'],
    DataSource: ['GoogleSheets', 'GoogleDrive', 'AppsScriptLog', 'Maven', 'AppSheetDerived', 'Registry', 'Mixed'],
    VersionStatus: ['Draft', 'Active', 'Deprecated', 'Archived']
  };

  Object.keys(dropdowns).forEach(function(header) {
    const column = headers.indexOf(header) + 1;
    if (column < 1) return;

    const rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(dropdowns[header], true)
      .setAllowInvalid(false)
      .build();

    sheet.getRange(2, column, sheet.getMaxRows() - 1, 1).setDataValidation(rule);
  });
}

function applyHealthCheckRegistryConditionalFormatting_(sheet, headers) {
  const severityColumn = headers.indexOf('Severity') + 1;
  const lastStatusColumn = headers.indexOf('LastStatus') + 1;
  const enabledColumn = headers.indexOf('Enabled') + 1;
  const executionModeColumn = headers.indexOf('ExecutionMode') + 1;
  const dataRows = sheet.getMaxRows() - 1;
  const severityRanges = [];
  const statusRanges = [];
  const disabledRanges = [];

  if (severityColumn > 0) {
    severityRanges.push(sheet.getRange(2, severityColumn, dataRows, 1));
  }

  if (lastStatusColumn > 0) {
    statusRanges.push(sheet.getRange(2, lastStatusColumn, dataRows, 1));
  }

  if (enabledColumn > 0) {
    disabledRanges.push(sheet.getRange(2, enabledColumn, dataRows, 1));
  }

  if (executionModeColumn > 0) {
    disabledRanges.push(sheet.getRange(2, executionModeColumn, dataRows, 1));
  }

  const rules = [
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Critical')
      .setBackground('#f4cccc')
      .setFontColor('#990000')
      .setRanges(severityRanges.concat(statusRanges))
      .build(),
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Warning')
      .setBackground('#fff2cc')
      .setFontColor('#7f6000')
      .setRanges(severityRanges.concat(statusRanges))
      .build(),
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Pass')
      .setBackground('#d9ead3')
      .setFontColor('#274e13')
      .setRanges(statusRanges)
      .build(),
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('false')
      .setBackground('#eeeeee')
      .setFontColor('#666666')
      .setRanges(disabledRanges)
      .build(),
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Disabled')
      .setBackground('#eeeeee')
      .setFontColor('#666666')
      .setRanges(disabledRanges)
      .build()
  ];

  sheet.setConditionalFormatRules(rules);
}

function seedHealthCheckRegistryRows_(sheet, headers) {
  const rows = [
    {
      HealthCheckId: 'HC_REGISTRY_SCHEMA',
      Name: 'HealthCheckRegistry Schema',
      Description: 'Defines the HealthCheckRegistry v1.0 schema contract.',
      SystemArea: 'System Health',
      Severity: 'Critical',
      RiskLevel: 'Critical',
      BusinessImpact: 'SystemReliability',
      CheckType: 'RegistrySchema',
      ExecutionMode: 'ReadOnly',
      Frequency: 'EveryRun',
      DependsOn: '',
      TargetObject: 'HealthCheckRegistry',
      TargetTable: 'HealthCheckRegistry',
      TargetField: 'HealthCheckId',
      RelatedAutomationRegistryId: 'REGISTRY_SCHEMA',
      DataSource: 'Registry',
      ValidationFunction: 'validateHealthCheckRegistrySchema',
      ExpectedResult: 'HealthCheckRegistry schema v1.0 exists and can be validated.',
      FailureCondition: 'HealthCheckRegistry schema row is missing, invalid, duplicated, or version-incompatible.',
      FailureCategory: 'SchemaDrift',
      SuggestedFix: 'Review schema differences and use an approved HealthCheckRegistry migration plan.',
      ApprovalPolicy: 'Approval required before schema changes or migration.',
      EscalationPolicy: 'BlockDependentChecks',
      SafetyRules: 'Do not modify HealthCheckRegistry schema without approved migration.',
      SourceAttribution: 'HealthCheckRegistry v1 design; Safe Setup Strategy',
      AlertThreshold: 'Any Critical',
      Notes: 'Schema control row. Health agent should validate this before running dependent checks.'
    },
    {
      HealthCheckId: 'HC-SYSTEM-001',
      Name: 'VerifyAutomationRegistrySchema',
      Description: 'Verifies that AutomationRegistry exists, contains required v1.0 headers, seed rows, and a compatible schema version row.',
      SystemArea: 'System Health',
      Severity: 'Critical',
      RiskLevel: 'Critical',
      BusinessImpact: 'SystemReliability',
      CheckType: 'RegistrySchema',
      ExecutionMode: 'ReadOnly',
      Frequency: 'EveryRun',
      DependsOn: 'HC_REGISTRY_SCHEMA',
      TargetObject: 'AutomationRegistry',
      TargetTable: 'AutomationRegistry',
      TargetField: 'RegistryId',
      RelatedAutomationRegistryId: 'REGISTRY_SCHEMA',
      DataSource: 'Registry',
      ValidationFunction: 'validateAutomationRegistrySchema',
      ExpectedResult: 'AutomationRegistry schema v1.0 exists and can be validated.',
      FailureCondition: 'AutomationRegistry is missing, invalid, duplicated, or version-incompatible.',
      FailureCategory: 'SchemaDrift',
      SuggestedFix: 'Review AutomationRegistry validation findings and use an approved migration or seed flow.',
      ApprovalPolicy: 'Approval required before AutomationRegistry schema changes or migration.',
      EscalationPolicy: 'BlockDependentChecks',
      SafetyRules: 'Do not modify AutomationRegistry from this health check.',
      SourceAttribution: 'AutomationRegistry validation layer; HealthCheckRegistry v1 design',
      AlertThreshold: 'Any Critical',
      Notes: 'Runs as a registry health definition only; setup does not execute this check.'
    },
    {
      HealthCheckId: 'HC-DRIVE-001',
      Name: 'VerifyHtmlFileExists',
      Description: 'Verifies that signed service reports have a valid SignedHtmlFileUrl and the Drive file can be opened.',
      SystemArea: 'Drive',
      Severity: 'Critical',
      RiskLevel: 'Critical',
      BusinessImpact: 'CustomerService',
      CheckType: 'DriveFileAccess',
      ExecutionMode: 'ReadOnly',
      Frequency: 'DailyMorning',
      DependsOn: 'HC_REGISTRY_SCHEMA, HC-DRIVE-004',
      TargetObject: 'ServiceReports.SignedHtmlFileUrl',
      TargetTable: 'ServiceReports',
      TargetField: 'SignedHtmlFileUrl',
      RelatedAutomationRegistryId: 'AR-SR-DRIVE-001',
      DataSource: 'Mixed',
      ValidationFunction: 'checkSignedReportsHtmlFileExists',
      ExpectedResult: 'Signed reports have one accessible HTML file.',
      FailureCondition: 'SignedHtmlFileUrl is empty or points to a missing/inaccessible Drive file.',
      FailureCategory: 'BrokenLink',
      SuggestedFix: 'Inspect the report file link and approve targeted Drive save repair if needed.',
      ApprovalPolicy: 'Approval required before any Drive file creation or link update.',
      EscalationPolicy: 'NotifyOwnerCriticalOnly',
      SafetyRules: 'Do not create or modify Drive files during this check.',
      SourceAttribution: 'SYSTEM_HEALTH_AGENT_PLAN HC-001, HC-007',
      AlertThreshold: 'Any Critical'
    },
    {
      HealthCheckId: 'HC-DRIVE-002',
      Name: 'VerifyCustomerFolderExists',
      Description: 'Verifies that customer Drive folder exists for customer-linked reports.',
      SystemArea: 'Drive',
      Severity: 'Critical',
      RiskLevel: 'High',
      BusinessImpact: 'Operational',
      CheckType: 'DriveFolderAccess',
      ExecutionMode: 'ReadOnly',
      Frequency: 'DailyMorning',
      DependsOn: 'HC_REGISTRY_SCHEMA, HC-DRIVE-004',
      TargetObject: 'Customer Drive folder',
      TargetTable: 'Customers_Final',
      TargetField: 'CustomerFolderId',
      RelatedAutomationRegistryId: 'AR-SR-DRIVE-001',
      DataSource: 'Mixed',
      ValidationFunction: 'checkCustomerFolderExists',
      ExpectedResult: 'Customer folder exists and is accessible.',
      FailureCondition: 'CustomerFolderId is empty or Drive folder cannot be opened.',
      FailureCategory: 'MissingDriveObject',
      SuggestedFix: 'Review customer folder mapping and approve manual folder repair if required.',
      ApprovalPolicy: 'Approval required before creating or changing customer folders.',
      EscalationPolicy: 'NotifyOwnerCriticalOnly',
      SafetyRules: 'Do not create customer folders during read-only health check.',
      SourceAttribution: 'SYSTEM_HEALTH_RULES Drive',
      AlertThreshold: 'Any Critical'
    },
    {
      HealthCheckId: 'HC-DRIVE-003',
      Name: 'VerifyNoDuplicateCustomerFolder',
      Description: 'Detects duplicate active Drive folders for the same customer.',
      SystemArea: 'Drive',
      Severity: 'Warning',
      RiskLevel: 'High',
      BusinessImpact: 'DataQuality',
      CheckType: 'Uniqueness',
      ExecutionMode: 'ReadOnly',
      Frequency: 'DailyNight',
      DependsOn: 'HC_REGISTRY_SCHEMA, HC-DRIVE-004',
      TargetObject: 'Customer Drive folders',
      TargetTable: 'Customers_Final',
      TargetField: 'CustomerFolderId',
      RelatedAutomationRegistryId: 'AR-SR-DRIVE-001',
      DataSource: 'GoogleDrive',
      ValidationFunction: 'checkDuplicateCustomerFolders',
      ExpectedResult: 'One active customer folder per customer.',
      FailureCondition: 'More than one folder exists for the same customer name or customer ID.',
      FailureCategory: 'DuplicateData',
      SuggestedFix: 'Review duplicate folders and approve manual consolidation plan.',
      ApprovalPolicy: 'Approval required before deleting, moving, renaming, or merging folders.',
      EscalationPolicy: 'ManualReview',
      SafetyRules: 'Do not delete, move, rename, or merge folders automatically.',
      SourceAttribution: 'SYSTEM_HEALTH_AGENT_PLAN HC-009',
      AlertThreshold: 'More than 5 Warning'
    },
    {
      HealthCheckId: 'HC-MAVEN-001',
      Name: 'VerifyMavenDraftCreated',
      Description: 'Verifies approved BusinessDocuments create no more than one Maven draft.',
      SystemArea: 'Maven',
      Severity: 'Critical',
      RiskLevel: 'Critical',
      BusinessImpact: 'Revenue',
      CheckType: 'ApiState',
      ExecutionMode: 'ReadOnly',
      Frequency: 'DailyMorning',
      DependsOn: 'HC_REGISTRY_SCHEMA, HC-AUTO-001, HC-BD-001',
      TargetObject: 'BusinessDocuments.MavenDocumentId',
      TargetTable: 'BusinessDocuments',
      TargetField: 'MavenDocumentId',
      RelatedAutomationRegistryId: 'AR-BD-MAVEN-001',
      DataSource: 'GoogleSheets',
      ValidationFunction: 'checkMavenDraftCreated',
      ExpectedResult: 'One approved BusinessDocument maps to one Maven draft.',
      FailureCondition: 'Missing MavenDocumentId after expected flow or duplicated Maven draft evidence.',
      FailureCategory: 'ApiFailure',
      SuggestedFix: 'Review BusinessDocumentLog and AutomationCommands before approving retry/manual recovery.',
      ApprovalPolicy: 'Approval required before Maven document creation, queue retry, or manual recovery.',
      EscalationPolicy: 'NotifyOwnerCriticalOnly',
      SafetyRules: 'Do not create Maven documents from health check.',
      SourceAttribution: 'SYSTEM_HEALTH_AGENT_PLAN HC-015; DECISION_LOG queue architecture',
      AlertThreshold: 'Any Critical'
    },
    {
      HealthCheckId: 'HC-AUTO-001',
      Name: 'VerifyCommandQueueHealthy',
      Description: 'Detects AutomationCommands stuck in Pending or Running.',
      SystemArea: 'AutomationCommands',
      Severity: 'Critical',
      RiskLevel: 'Critical',
      BusinessImpact: 'SystemReliability',
      CheckType: 'QueueHealth',
      ExecutionMode: 'ReadOnly',
      Frequency: 'EveryRun',
      DependsOn: 'HC_REGISTRY_SCHEMA',
      TargetObject: 'AutomationCommands',
      TargetTable: 'AutomationCommands',
      TargetField: 'Status',
      RelatedAutomationRegistryId: 'AR-BD-MAVEN-001',
      DataSource: 'GoogleSheets',
      ValidationFunction: 'checkAutomationCommandsStuck',
      ExpectedResult: 'Pending becomes Running; Running becomes Completed, Error, or Cancelled.',
      FailureCondition: 'Pending or Running longer than 30 minutes.',
      FailureCategory: 'QueueStuck',
      SuggestedFix: 'Inspect command payload, Apps Script execution, and logs before approving manual recovery.',
      ApprovalPolicy: 'Approval required before changing command status or retrying a command.',
      EscalationPolicy: 'NotifyOwnerCriticalOnly',
      SafetyRules: 'Do not change AutomationCommands status from health check.',
      SourceAttribution: 'SYSTEM_HEALTH_AGENT_PLAN HC-011, HC-012',
      AlertThreshold: 'Any Critical'
    },
    {
      HealthCheckId: 'HC-BD-001',
      Name: 'VerifyBusinessDocumentStatusFlow',
      Description: 'Detects BusinessDocuments stuck in draft request statuses.',
      SystemArea: 'BusinessDocuments',
      Severity: 'Critical',
      RiskLevel: 'Critical',
      BusinessImpact: 'Revenue',
      CheckType: 'StatusFlow',
      ExecutionMode: 'ReadOnly',
      Frequency: 'EveryRun',
      DependsOn: 'HC_REGISTRY_SCHEMA, HC-AUTO-001',
      TargetObject: 'BusinessDocuments.DocumentStatus',
      TargetTable: 'BusinessDocuments',
      TargetField: 'DocumentStatus',
      RelatedAutomationRegistryId: 'AR-BD-MAVEN-001',
      DataSource: 'GoogleSheets',
      ValidationFunction: 'checkBusinessDocumentsStuck',
      ExpectedResult: 'Draft request statuses continue through the approved queue flow.',
      FailureCondition: 'CreateDraftRequested or DraftRequestReceived remains unchanged longer than 30 minutes.',
      FailureCategory: 'StatusFlowBroken',
      SuggestedFix: 'Review related AutomationCommand and BusinessDocumentLog before approving recovery.',
      ApprovalPolicy: 'Approval required before changing BusinessDocuments status or queue state.',
      EscalationPolicy: 'NotifyOwnerCriticalOnly',
      SafetyRules: 'Do not update BusinessDocuments status from health check.',
      SourceAttribution: 'SYSTEM_HEALTH_AGENT_PLAN HC-014',
      AlertThreshold: 'Any Critical'
    },
    {
      HealthCheckId: 'HC-DRIVE-004',
      Name: 'VerifyDrivePermissions',
      Description: 'Verifies health agent can read required Drive file/folder metadata.',
      SystemArea: 'Drive',
      Severity: 'Critical',
      RiskLevel: 'Critical',
      BusinessImpact: 'Operational',
      CheckType: 'Permission',
      ExecutionMode: 'ReadOnly',
      Frequency: 'DailyMorning',
      DependsOn: 'HC_REGISTRY_SCHEMA',
      TargetObject: 'Drive files and folders',
      TargetTable: 'ServiceReports, Customers_Final',
      TargetField: 'SignedHtmlFileUrl, CustomerFolderId',
      RelatedAutomationRegistryId: 'AR-SR-DRIVE-001',
      DataSource: 'GoogleDrive',
      ValidationFunction: 'checkDrivePermissions',
      ExpectedResult: 'Required Drive objects are accessible to the authorized script account.',
      FailureCondition: 'Drive metadata cannot be opened due to missing permission or missing object.',
      FailureCategory: 'DrivePermission',
      SuggestedFix: 'Review Drive permissions and ownership before approving access correction.',
      ApprovalPolicy: 'Approval required before changing Drive sharing permissions.',
      EscalationPolicy: 'NotifyOwnerCriticalOnly',
      SafetyRules: 'Do not change Drive sharing permissions automatically.',
      SourceAttribution: 'SYSTEM_HEALTH_RULES Drive; SYSTEM_HEALTH_AGENT_PLAN HC-007',
      AlertThreshold: 'Any Critical'
    },
    {
      HealthCheckId: 'HC-AUTO-002',
      Name: 'VerifyAutomationCommandCompletion',
      Description: 'Verifies AutomationCommands complete exactly once and do not loop or remain unresolved.',
      SystemArea: 'AutomationCommands',
      Severity: 'Critical',
      RiskLevel: 'Critical',
      BusinessImpact: 'SystemReliability',
      CheckType: 'StatusFlow',
      ExecutionMode: 'ReadOnly',
      Frequency: 'EveryRun',
      DependsOn: 'HC_REGISTRY_SCHEMA, HC-AUTO-001',
      TargetObject: 'AutomationCommands.Status',
      TargetTable: 'AutomationCommands',
      TargetField: 'Status',
      RelatedAutomationRegistryId: 'AR-BD-MAVEN-001',
      DataSource: 'GoogleSheets',
      ValidationFunction: 'checkAutomationCommandCompletion',
      ExpectedResult: 'Each command is processed once and reaches a terminal status.',
      FailureCondition: 'Command is processed more than once, stuck, or lacks terminal status after expected duration.',
      FailureCategory: 'DuplicateExecution',
      SuggestedFix: 'Review command log and idempotency markers before approving retry or manual cancellation.',
      ApprovalPolicy: 'Approval required before retrying, cancelling, or updating command status.',
      EscalationPolicy: 'NotifyOwnerCriticalOnly',
      SafetyRules: 'Do not retry, cancel, or update command status automatically.',
      SourceAttribution: 'SYSTEM_HEALTH_AGENT_PLAN HC-011, HC-012, HC-013',
      AlertThreshold: 'Any Critical'
    }
  ];

  const values = rows.map(function(row) {
    return headers.map(function(header) {
      if (Object.prototype.hasOwnProperty.call(row, header)) return row[header];
      if (header === 'Enabled') return true;
      if (header === 'ReadOnlyCheck') return true;
      if (header === 'AutoRepairAllowed') return false;
      if (header === 'RequiresApproval') return true;
      if (header === 'LearningEligible') return true;
      if (header === 'LastStatus') return 'Unknown';
      if (header === 'OutputLogTarget') return 'SystemHealthLog';
      if (header === 'AlertEligible') return true;
      if (header === 'Owner') return 'Liad / System Health Agent';
      if (header === 'RegistryVersion') return '1.0.0';
      if (header === 'VersionStatus') return 'Active';
      return '';
    });
  });

  if (values.length > 0) {
    sheet.getRange(sheet.getLastRow() + 1, 1, values.length, headers.length).setValues(values);
  }

  return values.length;
}

function setupSystemHealthLogSheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const existingSheet = ss.getSheetByName('SystemHealthLog');

  if (existingSheet) {
    return {
      success: true,
      created: false,
      modified: false,
      sheetName: 'SystemHealthLog',
      existingRows: existingSheet.getLastRow(),
      existingColumns: existingSheet.getLastColumn(),
      message: 'SystemHealthLog already exists. No changes applied.'
    };
  }

  const sheet = ss.insertSheet('SystemHealthLog');
  const headers = getSystemHealthLogHeaders_();

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.setFrozenRows(1);

  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange
    .setFontWeight('bold')
    .setBackground('#1f4e79')
    .setFontColor('#ffffff')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setWrap(true);

  sheet.getRange(1, 1, Math.max(sheet.getMaxRows(), 2), headers.length).setVerticalAlignment('top');
  sheet.autoResizeColumns(1, headers.length);

  applySystemHealthLogDropdowns_(sheet, headers);
  applySystemHealthLogBooleanValidations_(sheet, headers);
  applySystemHealthLogConditionalFormatting_(sheet, headers);
  const seedRowCount = seedSystemHealthLogRows_(sheet, headers);

  return {
    success: true,
    created: true,
    modified: true,
    sheetName: 'SystemHealthLog',
    headerCount: headers.length,
    seedRowCount: seedRowCount,
    message: 'SystemHealthLog created with v1 headers, validations, formatting, conditional formatting, and seed rows.'
  };
}

function getSystemHealthLogHeaders_() {
  return [
    'LogId',
    'ParentLogId',
    'RecordType',
    'RunId',
    'HealthCheckId',
    'CheckName',
    'Timestamp',
    'SchemaTimestamp',
    'Status',
    'Severity',
    'FailureCategory',
    'BusinessImpact',
    'AffectedObject',
    'AffectedRecordId',
    'Details',
    'RootCause',
    'ConfidenceScore',
    'SuggestedFix',
    'EscalationPolicy',
    'RequiresApproval',
    'AutoRepairAllowed',
    'ExecutionMode',
    'ValidationFunction',
    'DurationMs',
    'AgentName',
    'SourceAttribution',
    'RegistryVersion',
    'LogSchemaVersion',
    'RelatedAutomationRegistryId',
    'DataSource',
    'Environment',
    'CorrelationId',
    'ReviewedBy',
    'ReviewedAt',
    'ReviewStatus',
    'ResolutionStatus',
    'ResolvedAt',
    'LearningEligible'
  ];
}

function applySystemHealthLogDropdowns_(sheet, headers) {
  const dropdowns = {
    RecordType: ['SchemaDefinition', 'ExecutionResult', 'Summary', 'MigrationNote'],
    Status: ['Pass', 'Warning', 'Critical', 'Skipped', 'Error'],
    Severity: ['Info', 'Warning', 'Critical'],
    FailureCategory: [
      'MissingData',
      'DuplicateData',
      'BrokenLink',
      'MissingDriveObject',
      'DrivePermission',
      'QueueStuck',
      'StatusFlowBroken',
      'DuplicateExecution',
      'ApiFailure',
      'RateLimit',
      'SchemaDrift',
      'FieldDrift',
      'LogError',
      'TimingDelay',
      'ConfigurationError',
      'ApprovalBlocked',
      'Unknown'
    ],
    BusinessImpact: [
      'None',
      'Operational',
      'CustomerService',
      'Revenue',
      'CashCollection',
      'FinancialAccuracy',
      'Compliance',
      'Inventory',
      'SupplierOperations',
      'DataQuality',
      'SystemReliability'
    ],
    EscalationPolicy: [
      'None',
      'DailyReportOnly',
      'NotifyOwner',
      'NotifyOwnerCriticalOnly',
      'ManualReview',
      'BlockDependentChecks',
      'FutureAlertWorkflow'
    ],
    ExecutionMode: ['ReadOnly', 'Diagnostic', 'Simulation', 'ApprovedRepair', 'Disabled'],
    DataSource: [
      'GoogleSheets',
      'GoogleDrive',
      'AppsScriptLog',
      'Maven',
      'AppSheetDerived',
      'Registry',
      'Mixed',
      'MCP',
      'Gmail',
      'GoogleCalendar',
      'Invoice4u'
    ],
    Environment: ['Production', 'Test', 'Sandbox', 'LocalDesign'],
    ReviewStatus: ['NotReviewed', 'Reviewed', 'Approved', 'Rejected', 'NeedsMoreInfo'],
    ResolutionStatus: ['Open', 'Resolved', 'Ignored', 'FalsePositive', 'Deferred', 'Blocked', 'NotApplicable']
  };

  Object.keys(dropdowns).forEach(function(header) {
    const columnIndex = headers.indexOf(header) + 1;
    if (columnIndex <= 0) return;

    const rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(dropdowns[header], true)
      .setAllowInvalid(false)
      .build();

    sheet.getRange(2, columnIndex, sheet.getMaxRows() - 1, 1).setDataValidation(rule);
  });
}

function applySystemHealthLogBooleanValidations_(sheet, headers) {
  const booleanHeaders = [
    'RequiresApproval',
    'AutoRepairAllowed',
    'LearningEligible'
  ];

  const rule = SpreadsheetApp.newDataValidation()
    .requireCheckbox()
    .build();

  booleanHeaders.forEach(function(header) {
    const columnIndex = headers.indexOf(header) + 1;
    if (columnIndex <= 0) return;

    sheet.getRange(2, columnIndex, sheet.getMaxRows() - 1, 1).setDataValidation(rule);
  });
}

function applySystemHealthLogConditionalFormatting_(sheet, headers) {
  const rules = [];
  const maxRows = sheet.getMaxRows();
  const statusColumn = headers.indexOf('Status') + 1;
  const severityColumn = headers.indexOf('Severity') + 1;
  const confidenceColumn = headers.indexOf('ConfidenceScore') + 1;
  const resolutionColumn = headers.indexOf('ResolutionStatus') + 1;

  if (statusColumn > 0) {
    const statusRange = sheet.getRange(2, statusColumn, maxRows - 1, 1);
    rules.push(
      SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo('Critical')
        .setBackground('#f4cccc')
        .setFontColor('#990000')
        .setRanges([statusRange])
        .build()
    );
    rules.push(
      SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo('Warning')
        .setBackground('#fff2cc')
        .setFontColor('#7f6000')
        .setRanges([statusRange])
        .build()
    );
    rules.push(
      SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo('Pass')
        .setBackground('#d9ead3')
        .setFontColor('#274e13')
        .setRanges([statusRange])
        .build()
    );
    rules.push(
      SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo('Error')
        .setBackground('#cc0000')
        .setFontColor('#ffffff')
        .setRanges([statusRange])
        .build()
    );
  }

  if (severityColumn > 0) {
    const severityRange = sheet.getRange(2, severityColumn, maxRows - 1, 1);
    rules.push(
      SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo('Critical')
        .setBackground('#f4cccc')
        .setFontColor('#990000')
        .setRanges([severityRange])
        .build()
    );
    rules.push(
      SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo('Warning')
        .setBackground('#fff2cc')
        .setFontColor('#7f6000')
        .setRanges([severityRange])
        .build()
    );
  }

  if (confidenceColumn > 0) {
    const confidenceRange = sheet.getRange(2, confidenceColumn, maxRows - 1, 1);
    rules.push(
      SpreadsheetApp.newConditionalFormatRule()
        .whenNumberLessThan(50)
        .setBackground('#f4cccc')
        .setFontColor('#990000')
        .setRanges([confidenceRange])
        .build()
    );
    rules.push(
      SpreadsheetApp.newConditionalFormatRule()
        .whenNumberBetween(50, 79)
        .setBackground('#fff2cc')
        .setFontColor('#7f6000')
        .setRanges([confidenceRange])
        .build()
    );
    rules.push(
      SpreadsheetApp.newConditionalFormatRule()
        .whenNumberGreaterThanOrEqualTo(80)
        .setBackground('#d9ead3')
        .setFontColor('#274e13')
        .setRanges([confidenceRange])
        .build()
    );
  }

  if (resolutionColumn > 0) {
    const resolutionRange = sheet.getRange(2, resolutionColumn, maxRows - 1, 1);
    rules.push(
      SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo('Open')
        .setBackground('#fce5cd')
        .setFontColor('#783f04')
        .setRanges([resolutionRange])
        .build()
    );
    rules.push(
      SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo('Resolved')
        .setBackground('#d9ead3')
        .setFontColor('#274e13')
        .setRanges([resolutionRange])
        .build()
    );
  }

  sheet.setConditionalFormatRules(rules);
}

function seedSystemHealthLogRows_(sheet, headers) {
  const rows = [
    {
      LogId: 'SHL_REGISTRY_SCHEMA',
      ParentLogId: '',
      RecordType: 'SchemaDefinition',
      RunId: 'SYSTEM_SCHEMA',
      HealthCheckId: 'HC-SYSTEM-LOG-SCHEMA',
      CheckName: 'SystemHealthLog Schema',
      Timestamp: '',
      SchemaTimestamp: '2026-06-10T00:00:00+03:00',
      Status: 'Pass',
      Severity: 'Info',
      FailureCategory: '',
      BusinessImpact: 'SystemReliability',
      AffectedObject: 'SystemHealthLog',
      AffectedRecordId: 'SHL_REGISTRY_SCHEMA',
      Details: 'Defines the SystemHealthLog v1.0 schema contract.',
      RootCause: '',
      ConfidenceScore: 100,
      SuggestedFix: 'Do not modify SystemHealthLog schema without approved migration.',
      EscalationPolicy: 'BlockDependentChecks',
      RequiresApproval: true,
      AutoRepairAllowed: false,
      ExecutionMode: 'ReadOnly',
      ValidationFunction: 'validateSystemHealthLogSchema',
      DurationMs: '',
      AgentName: 'System Health Agent',
      SourceAttribution: 'SystemHealthLog v1 approved design',
      RegistryVersion: '1.0.0',
      LogSchemaVersion: '1.0.0',
      RelatedAutomationRegistryId: '',
      DataSource: 'Registry',
      Environment: 'Production',
      CorrelationId: 'SYSTEM_SCHEMA',
      ReviewedBy: '',
      ReviewedAt: '',
      ReviewStatus: 'NotReviewed',
      ResolutionStatus: 'NotApplicable',
      ResolvedAt: '',
      LearningEligible: false
    }
  ];

  const values = rows.map(function(row) {
    return headers.map(function(header) {
      if (Object.prototype.hasOwnProperty.call(row, header)) return row[header];
      return '';
    });
  });

  if (values.length > 0) {
    sheet.getRange(sheet.getLastRow() + 1, 1, values.length, headers.length).setValues(values);
  }

  return values.length;
}
