function validateAutomationRegistrySchema() {
  const sheetName = 'AutomationRegistry';
  const expectedHeaders = getAutomationRegistryExpectedHeaders_();
  const report = createAutomationRegistryValidationReport_(sheetName, expectedHeaders);
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    addAutomationRegistryFinding_(report, {
      checkId: 'AR-SCHEMA-001',
      status: 'FAIL',
      severity: 'Critical',
      title: 'AutomationRegistry sheet missing',
      description: 'AutomationRegistry sheet was not found.',
      recommendedAction: 'Run setupAutomationRegistrySheet() only after approval.'
    });
    return finalizeAutomationRegistryValidationStatus_(report);
  }

  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();
  report.summary.rowCount = lastRow;
  report.summary.columnCount = lastColumn;
  report.schema.actualHeaderCount = lastColumn;

  if (lastRow < 1 || lastColumn < 1) {
    addAutomationRegistryFinding_(report, {
      checkId: 'AR-SCHEMA-002',
      status: 'FAIL',
      severity: 'Critical',
      title: 'AutomationRegistry header row missing',
      description: 'AutomationRegistry exists, but it has no readable header row.',
      recommendedAction: 'Plan an approved AutomationRegistry schema migration.'
    });
    return finalizeAutomationRegistryValidationStatus_(report);
  }

  const headers = sheet.getRange(1, 1, 1, lastColumn).getDisplayValues()[0]
    .map(function(header) {
      return String(header || '').trim();
    });
  const values = lastRow > 1
    ? sheet.getRange(2, 1, lastRow - 1, lastColumn).getDisplayValues()
    : [];
  const headerMap = buildAutomationRegistryHeaderMap_(headers);
  const rows = rowsToAutomationRegistryObjects_(headers, values);

  validateAutomationRegistryHeaders_(report, headers, expectedHeaders);
  validateAutomationRegistrySeedRows_(report, rows);
  validateAutomationRegistryDuplicateRegistryIds_(report, rows);
  validateAutomationRegistryRequiredFields_(report, rows, headerMap);
  validateAutomationRegistryDropdownValues_(report, rows, headerMap);
  validateAutomationRegistrySchemaVersionRow_(report, rows);
  validateAutomationRegistryVersionCompatibility_(report, rows);

  return finalizeAutomationRegistryValidationStatus_(report);
}

function getAutomationRegistryExpectedHeaders_() {
  return [
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
}

function getAutomationRegistryExpectedSeedIds_() {
  return [
    'REGISTRY_SCHEMA',
    'AR-SR-DRIVE-001',
    'AR-BD-MAVEN-001',
    'AR-AI-PREVIEW-001'
  ];
}

function getAutomationRegistryRequiredFields_() {
  return [
    'RegistryId',
    'RegistryVersion',
    'VersionStatus',
    'Enabled',
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
    'IntegrationType',
    'ManualOrAutomaticTrigger',
    'ExpectedResult',
    'SafetyRules',
    'SourceAttribution',
    'LastHealthStatus'
  ];
}

function getAutomationRegistryOperationalRecommendedFields_() {
  return [
    'ApprovalRequired',
    'SuggestedFixRequiresApproval',
    'ProductionWriteAllowed',
    'ExternalWriteAllowed',
    'DailyHealthReportInclude'
  ];
}

function getAutomationRegistryDropdownAllowedValues_() {
  return {
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
}

function getAutomationRegistrySupportedVersions_() {
  return ['1.0.0'];
}

function createAutomationRegistryValidationReport_(sheetName, expectedHeaders) {
  return {
    success: true,
    status: 'PASS',
    readOnly: true,
    sheetName: sheetName,
    checkedAt: new Date(),
    summary: {
      totalChecks: 0,
      passedChecks: 0,
      warningChecks: 0,
      failedChecks: 0,
      rowCount: 0,
      columnCount: 0
    },
    schema: {
      expectedVersion: '1.0.0',
      detectedVersion: '',
      supportedVersions: getAutomationRegistrySupportedVersions_(),
      schemaVersionRowExists: false,
      expectedHeaderCount: expectedHeaders.length,
      actualHeaderCount: 0
    },
    findings: [],
    details: {
      missingHeaders: [],
      duplicateHeaders: [],
      extraHeaders: [],
      headerOrderDifferences: [],
      missingSeedRows: [],
      duplicateRegistryIds: [],
      emptyRequiredFields: [],
      invalidDropdownValues: [],
      registryVersionIssues: []
    }
  };
}

function buildAutomationRegistryHeaderMap_(headers) {
  const headerMap = {};
  headers.forEach(function(header, index) {
    if (!header) return;
    if (!Object.prototype.hasOwnProperty.call(headerMap, header)) {
      headerMap[header] = index;
    }
  });
  return headerMap;
}

function rowsToAutomationRegistryObjects_(headers, values) {
  const rows = [];
  values.forEach(function(valueRow, index) {
    const rowObject = {
      rowNumber: index + 2,
      values: {},
      isEmpty: true
    };

    headers.forEach(function(header, columnIndex) {
      if (!header) return;
      const value = String(valueRow[columnIndex] || '').trim();
      rowObject.values[header] = value;
      if (value) rowObject.isEmpty = false;
    });

    rows.push(rowObject);
  });
  return rows;
}

function validateAutomationRegistryHeaders_(report, headers, expectedHeaders) {
  const actualSet = {};
  const duplicateHeaders = [];
  const extraHeaders = [];
  const missingHeaders = [];
  const headerOrderDifferences = [];

  headers.forEach(function(header, index) {
    if (!header) {
      extraHeaders.push({
        column: index + 1,
        header: ''
      });
      return;
    }

    if (actualSet[header]) {
      duplicateHeaders.push({
        header: header,
        column: index + 1
      });
    } else {
      actualSet[header] = true;
    }
  });

  expectedHeaders.forEach(function(header, index) {
    if (!actualSet[header]) {
      missingHeaders.push(header);
    }

    if (headers[index] !== header) {
      headerOrderDifferences.push({
        expectedColumn: index + 1,
        expectedHeader: header,
        actualHeader: headers[index] || ''
      });
    }
  });

  headers.forEach(function(header, index) {
    if (header && expectedHeaders.indexOf(header) === -1) {
      extraHeaders.push({
        column: index + 1,
        header: header
      });
    }
  });

  report.details.missingHeaders = missingHeaders;
  report.details.duplicateHeaders = duplicateHeaders;
  report.details.extraHeaders = extraHeaders;
  report.details.headerOrderDifferences = headerOrderDifferences;

  addAutomationRegistryFinding_(report, {
    checkId: 'AR-SCHEMA-002',
    status: missingHeaders.length > 0 ? 'FAIL' : 'PASS',
    severity: missingHeaders.length > 0 ? 'Critical' : 'Info',
    title: 'Required headers present',
    description: missingHeaders.length > 0
      ? 'Missing required headers: ' + missingHeaders.join(', ')
      : 'All approved v1.0 headers are present.',
    affectedColumns: missingHeaders,
    recommendedAction: missingHeaders.length > 0
      ? 'Run a future approved schema migration plan.'
      : ''
  });

  addAutomationRegistryFinding_(report, {
    checkId: 'AR-SCHEMA-003',
    status: duplicateHeaders.length > 0 ? 'FAIL' : 'PASS',
    severity: duplicateHeaders.length > 0 ? 'Critical' : 'Info',
    title: 'Duplicate headers absent',
    description: duplicateHeaders.length > 0
      ? 'Duplicate headers were found.'
      : 'No duplicate headers were found.',
    affectedColumns: duplicateHeaders,
    recommendedAction: duplicateHeaders.length > 0
      ? 'Manually review duplicate columns before migration.'
      : ''
  });

  addAutomationRegistryFinding_(report, {
    checkId: 'AR-SCHEMA-004',
    status: extraHeaders.length > 0 || headerOrderDifferences.length > 0 ? 'WARNING' : 'PASS',
    severity: extraHeaders.length > 0 || headerOrderDifferences.length > 0 ? 'Warning' : 'Info',
    title: 'Header order and extra headers',
    description: extraHeaders.length > 0 || headerOrderDifferences.length > 0
      ? 'Header order differs from v1.0 or extra/blank headers exist.'
      : 'Header order matches v1.0 and no extra headers were found.',
    affectedColumns: {
      extraHeaders: extraHeaders,
      headerOrderDifferences: headerOrderDifferences
    },
    recommendedAction: extraHeaders.length > 0 || headerOrderDifferences.length > 0
      ? 'Review before future migrations. Do not reorder automatically.'
      : ''
  });
}

function validateAutomationRegistrySeedRows_(report, rows) {
  const expectedSeedIds = getAutomationRegistryExpectedSeedIds_();
  const existingIds = {};
  const missingSeedRows = [];

  rows.forEach(function(row) {
    if (row.isEmpty) return;
    const registryId = row.values.RegistryId;
    if (registryId) existingIds[registryId] = true;
  });

  expectedSeedIds.forEach(function(seedId) {
    if (!existingIds[seedId]) missingSeedRows.push(seedId);
  });

  report.details.missingSeedRows = missingSeedRows;

  addAutomationRegistryFinding_(report, {
    checkId: 'AR-SEED-001',
    status: missingSeedRows.indexOf('REGISTRY_SCHEMA') !== -1
      ? 'FAIL'
      : (missingSeedRows.length > 0 ? 'WARNING' : 'PASS'),
    severity: missingSeedRows.indexOf('REGISTRY_SCHEMA') !== -1
      ? 'Critical'
      : (missingSeedRows.length > 0 ? 'Warning' : 'Info'),
    title: 'Required seed rows present',
    description: missingSeedRows.length > 0
      ? 'Missing seed rows: ' + missingSeedRows.join(', ')
      : 'All required seed rows exist.',
    affectedRows: missingSeedRows,
    recommendedAction: missingSeedRows.length > 0
      ? 'Use a future approved seed proposal/apply flow.'
      : ''
  });
}

function validateAutomationRegistryDuplicateRegistryIds_(report, rows) {
  const seen = {};
  const duplicates = [];

  rows.forEach(function(row) {
    if (row.isEmpty) return;
    const registryId = row.values.RegistryId;
    if (!registryId) return;

    if (seen[registryId]) {
      duplicates.push({
        registryId: registryId,
        firstRow: seen[registryId],
        duplicateRow: row.rowNumber
      });
    } else {
      seen[registryId] = row.rowNumber;
    }
  });

  report.details.duplicateRegistryIds = duplicates;

  addAutomationRegistryFinding_(report, {
    checkId: 'AR-DATA-001',
    status: duplicates.length > 0 ? 'FAIL' : 'PASS',
    severity: duplicates.length > 0 ? 'Critical' : 'Info',
    title: 'RegistryId values are unique',
    description: duplicates.length > 0
      ? 'Duplicate RegistryId values were found.'
      : 'No duplicate RegistryId values were found.',
    affectedRows: duplicates,
    recommendedAction: duplicates.length > 0
      ? 'Manually resolve duplicate RegistryId rows before running registry-driven health checks.'
      : ''
  });
}

function validateAutomationRegistryRequiredFields_(report, rows, headerMap) {
  const requiredFields = getAutomationRegistryRequiredFields_();
  const operationalRecommendedFields = getAutomationRegistryOperationalRecommendedFields_();
  const emptyRequiredFields = [];
  const missingRequiredHeaders = requiredFields.filter(function(field) {
    return !Object.prototype.hasOwnProperty.call(headerMap, field);
  });

  if (missingRequiredHeaders.length > 0) {
    addAutomationRegistryFinding_(report, {
      checkId: 'AR-DATA-002',
      status: 'FAIL',
      severity: 'Critical',
      title: 'Required field validation skipped',
      description: 'Cannot validate required fields because required headers are missing.',
      affectedColumns: missingRequiredHeaders,
      recommendedAction: 'Fix missing headers through an approved migration plan.'
    });
    return;
  }

  rows.forEach(function(row) {
    if (row.isEmpty) return;
    const versionStatus = row.values.VersionStatus;
    const isActive = versionStatus === 'Active';
    const isSchemaRow = row.values.RegistryId === 'REGISTRY_SCHEMA';

    requiredFields.forEach(function(field) {
      if (!row.values[field]) {
        emptyRequiredFields.push({
          rowNumber: row.rowNumber,
          registryId: row.values.RegistryId || '',
          field: field,
          severity: isActive ? 'Critical' : 'Warning'
        });
      }
    });

    if (isActive && !isSchemaRow) {
      operationalRecommendedFields.forEach(function(field) {
        if (!Object.prototype.hasOwnProperty.call(headerMap, field)) return;
        if (!row.values[field]) {
          emptyRequiredFields.push({
            rowNumber: row.rowNumber,
            registryId: row.values.RegistryId || '',
            field: field,
            severity: 'Warning'
          });
        }
      });
    }
  });

  report.details.emptyRequiredFields = emptyRequiredFields;

  const hasCritical = emptyRequiredFields.some(function(item) {
    return item.severity === 'Critical';
  });

  addAutomationRegistryFinding_(report, {
    checkId: 'AR-DATA-002',
    status: hasCritical ? 'FAIL' : (emptyRequiredFields.length > 0 ? 'WARNING' : 'PASS'),
    severity: hasCritical ? 'Critical' : (emptyRequiredFields.length > 0 ? 'Warning' : 'Info'),
    title: 'Required fields populated',
    description: emptyRequiredFields.length > 0
      ? 'Some required or recommended fields are empty.'
      : 'All required fields are populated.',
    affectedRows: emptyRequiredFields,
    recommendedAction: emptyRequiredFields.length > 0
      ? 'Review empty fields. Use an approved edit or migration flow if changes are required.'
      : ''
  });
}

function validateAutomationRegistryDropdownValues_(report, rows, headerMap) {
  const allowedValues = getAutomationRegistryDropdownAllowedValues_();
  const invalidDropdownValues = [];

  Object.keys(allowedValues).forEach(function(field) {
    if (!Object.prototype.hasOwnProperty.call(headerMap, field)) return;

    rows.forEach(function(row) {
      if (row.isEmpty) return;
      const value = row.values[field];
      if (!value) return;
      if (allowedValues[field].indexOf(value) !== -1) return;

      invalidDropdownValues.push({
        rowNumber: row.rowNumber,
        registryId: row.values.RegistryId || '',
        field: field,
        value: value
      });
    });
  });

  report.details.invalidDropdownValues = invalidDropdownValues;

  addAutomationRegistryFinding_(report, {
    checkId: 'AR-DATA-003',
    status: invalidDropdownValues.length > 0 ? 'WARNING' : 'PASS',
    severity: invalidDropdownValues.length > 0 ? 'Warning' : 'Info',
    title: 'Dropdown values are valid',
    description: invalidDropdownValues.length > 0
      ? 'Invalid dropdown values were found.'
      : 'All populated dropdown values are valid.',
    affectedRows: invalidDropdownValues,
    recommendedAction: invalidDropdownValues.length > 0
      ? 'Review values against the approved dropdown contract.'
      : ''
  });
}

function validateAutomationRegistrySchemaVersionRow_(report, rows) {
  const schemaRows = rows.filter(function(row) {
    return !row.isEmpty && row.values.RegistryId === 'REGISTRY_SCHEMA';
  });

  report.schema.schemaVersionRowExists = schemaRows.length > 0;

  if (schemaRows.length === 0) {
    addAutomationRegistryFinding_(report, {
      checkId: 'AR-SCHEMA-005',
      status: 'FAIL',
      severity: 'Critical',
      title: 'REGISTRY_SCHEMA row exists',
      description: 'REGISTRY_SCHEMA row was not found.',
      affectedRows: [],
      recommendedAction: 'Add REGISTRY_SCHEMA through an approved seed flow.'
    });
    return;
  }

  const schemaRow = schemaRows[0];
  report.schema.detectedVersion = schemaRow.values.RegistryVersion || '';
  const issues = [];

  [
    { field: 'RegistryVersion', expected: '1.0.0' },
    { field: 'VersionStatus', expected: 'Active' },
    { field: 'Enabled', expected: 'true' },
    { field: 'AutomationName', expected: 'AutomationRegistry Schema' },
    { field: 'AutomationType', expected: 'SchemaDefinition' }
  ].forEach(function(rule) {
    const actual = String(schemaRow.values[rule.field] || '').trim();
    if (rule.field === 'Enabled') {
      const normalized = actual.toLowerCase();
      if (normalized === 'true' || normalized === 'yes') return;
    } else if (actual === rule.expected) {
      return;
    }

    issues.push({
      rowNumber: schemaRow.rowNumber,
      field: rule.field,
      expected: rule.expected,
      actual: actual
    });
  });

  if (schemaRows.length > 1) {
    issues.push({
      field: 'RegistryId',
      expected: 'One REGISTRY_SCHEMA row',
      actual: String(schemaRows.length)
    });
  }

  addAutomationRegistryFinding_(report, {
    checkId: 'AR-SCHEMA-005',
    status: issues.length > 0 ? 'FAIL' : 'PASS',
    severity: issues.length > 0 ? 'Critical' : 'Info',
    title: 'REGISTRY_SCHEMA row is valid',
    description: issues.length > 0
      ? 'REGISTRY_SCHEMA row has invalid key fields.'
      : 'REGISTRY_SCHEMA row exists and key fields are valid.',
    affectedRows: issues,
    recommendedAction: issues.length > 0
      ? 'Fix REGISTRY_SCHEMA only through an approved migration or seed flow.'
      : ''
  });
}

function validateAutomationRegistryVersionCompatibility_(report, rows) {
  const supportedVersions = getAutomationRegistrySupportedVersions_();
  const versionIssues = [];

  rows.forEach(function(row) {
    if (row.isEmpty) return;
    const registryId = row.values.RegistryId || '';
    const version = row.values.RegistryVersion || '';

    if (!version) {
      versionIssues.push({
        rowNumber: row.rowNumber,
        registryId: registryId,
        version: version,
        severity: 'Critical',
        issue: 'Missing RegistryVersion'
      });
      return;
    }

    if (supportedVersions.indexOf(version) !== -1) return;

    const severity = getAutomationRegistryVersionIssueSeverity_(version, report.schema.expectedVersion);
    versionIssues.push({
      rowNumber: row.rowNumber,
      registryId: registryId,
      version: version,
      severity: severity,
      issue: 'Unsupported RegistryVersion'
    });
  });

  report.details.registryVersionIssues = versionIssues;

  const hasCritical = versionIssues.some(function(issue) {
    return issue.severity === 'Critical';
  });

  addAutomationRegistryFinding_(report, {
    checkId: 'AR-SCHEMA-006',
    status: hasCritical ? 'FAIL' : (versionIssues.length > 0 ? 'WARNING' : 'PASS'),
    severity: hasCritical ? 'Critical' : (versionIssues.length > 0 ? 'Warning' : 'Info'),
    title: 'RegistryVersion values are compatible',
    description: versionIssues.length > 0
      ? 'Unsupported RegistryVersion values were found.'
      : 'All RegistryVersion values are compatible.',
    affectedRows: versionIssues,
    recommendedAction: versionIssues.length > 0
      ? 'Plan a version-specific registry migration or validator update.'
      : ''
  });
}

function getAutomationRegistryVersionIssueSeverity_(version, expectedVersion) {
  const versionParts = String(version || '').split('.');
  const expectedParts = String(expectedVersion || '').split('.');

  if (versionParts.length < 1 || expectedParts.length < 1) return 'Critical';
  if (versionParts[0] !== expectedParts[0]) return 'Critical';

  return 'Warning';
}

function addAutomationRegistryFinding_(report, finding) {
  const normalizedFinding = {
    checkId: finding.checkId || '',
    status: finding.status || 'PASS',
    severity: finding.severity || 'Info',
    title: finding.title || '',
    description: finding.description || '',
    affectedRows: finding.affectedRows || [],
    affectedColumns: finding.affectedColumns || [],
    recommendedAction: finding.recommendedAction || ''
  };

  report.findings.push(normalizedFinding);
  report.summary.totalChecks += 1;

  if (normalizedFinding.status === 'FAIL') {
    report.summary.failedChecks += 1;
  } else if (normalizedFinding.status === 'WARNING') {
    report.summary.warningChecks += 1;
  } else {
    report.summary.passedChecks += 1;
  }
}

function finalizeAutomationRegistryValidationStatus_(report) {
  if (report.summary.failedChecks > 0) {
    report.status = 'FAIL';
    report.success = false;
  } else if (report.summary.warningChecks > 0) {
    report.status = 'WARNING';
    report.success = true;
  } else {
    report.status = 'PASS';
    report.success = true;
  }

  return report;
}
