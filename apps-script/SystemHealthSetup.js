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
