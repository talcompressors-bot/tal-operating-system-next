function validateSystemHealthLogSchema() {
  const sheetName = 'SystemHealthLog';
  const expectedHeaders = getSystemHealthLogExpectedHeaders_();
  const report = createSystemHealthLogValidationReport_(sheetName, expectedHeaders);
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    addSystemHealthLogFinding_(report, {
      checkId: 'SHL-SCHEMA-001',
      status: 'FAIL',
      severity: 'Critical',
      title: 'SystemHealthLog sheet missing',
      description: 'SystemHealthLog sheet was not found.',
      recommendedAction: 'Run setupSystemHealthLogSheet() only after approval.'
    });
    return finalizeSystemHealthLogValidationStatus_(report);
  }

  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();
  report.summary.rowCount = lastRow;
  report.summary.columnCount = lastColumn;
  report.schema.actualHeaderCount = lastColumn;

  if (lastRow < 1 || lastColumn < 1) {
    addSystemHealthLogFinding_(report, {
      checkId: 'SHL-SCHEMA-002',
      status: 'FAIL',
      severity: 'Critical',
      title: 'SystemHealthLog header row missing',
      description: 'SystemHealthLog exists, but it has no readable header row.',
      recommendedAction: 'Plan an approved SystemHealthLog schema migration.'
    });
    return finalizeSystemHealthLogValidationStatus_(report);
  }

  const headers = sheet.getRange(1, 1, 1, lastColumn).getDisplayValues()[0]
    .map(function(header) {
      return String(header || '').trim();
    });
  const values = lastRow > 1
    ? sheet.getRange(2, 1, lastRow - 1, lastColumn).getDisplayValues()
    : [];
  const headerMap = buildSystemHealthLogHeaderMap_(headers);
  const rows = rowsToSystemHealthLogObjects_(headers, values);

  validateSystemHealthLogHeaders_(report, headers, expectedHeaders);
  validateSystemHealthLogDuplicateLogIds_(report, rows);
  validateSystemHealthLogSchemaRow_(report, rows);
  validateSystemHealthLogRequiredFields_(report, rows, headerMap);
  validateSystemHealthLogDropdownValues_(report, rows, headerMap);
  validateSystemHealthLogConfidenceScores_(report, rows, headerMap);
  validateSystemHealthLogStatusSeverity_(report, rows, headerMap);
  validateSystemHealthLogCorrelationIds_(report, rows, headerMap);

  return finalizeSystemHealthLogValidationStatus_(report);
}

function getSystemHealthLogExpectedHeaders_() {
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

function getSystemHealthLogRequiredFields_() {
  return [
    'LogId',
    'RecordType',
    'HealthCheckId',
    'CheckName',
    'Status',
    'Severity',
    'ConfidenceScore',
    'RequiresApproval',
    'AutoRepairAllowed',
    'ExecutionMode',
    'AgentName',
    'SourceAttribution',
    'RegistryVersion',
    'LogSchemaVersion',
    'Environment',
    'LearningEligible'
  ];
}

function getSystemHealthLogExecutionRequiredFields_() {
  return [
    'RunId',
    'Timestamp',
    'ValidationFunction'
  ];
}

function getSystemHealthLogFailureRequiredFields_() {
  return [
    'FailureCategory',
    'Details',
    'SuggestedFix',
    'EscalationPolicy'
  ];
}

function getSystemHealthLogDropdownAllowedValues_() {
  return {
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
}

function getSystemHealthLogSupportedVersions_() {
  return ['1.0.0'];
}

function createSystemHealthLogValidationReport_(sheetName, expectedHeaders) {
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
      supportedVersions: getSystemHealthLogSupportedVersions_(),
      schemaRowExists: false,
      expectedHeaderCount: expectedHeaders.length,
      actualHeaderCount: 0
    },
    findings: [],
    details: {
      missingHeaders: [],
      duplicateHeaders: [],
      extraHeaders: [],
      headerOrderDifferences: [],
      duplicateLogIds: [],
      schemaRowIssues: [],
      emptyRequiredFields: [],
      invalidDropdownValues: [],
      invalidConfidenceScores: [],
      statusSeverityIssues: [],
      correlationIdIssues: []
    }
  };
}

function buildSystemHealthLogHeaderMap_(headers) {
  const headerMap = {};
  headers.forEach(function(header, index) {
    if (!header) return;
    if (!Object.prototype.hasOwnProperty.call(headerMap, header)) {
      headerMap[header] = index;
    }
  });
  return headerMap;
}

function rowsToSystemHealthLogObjects_(headers, values) {
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

function validateSystemHealthLogHeaders_(report, headers, expectedHeaders) {
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

  addSystemHealthLogFinding_(report, {
    checkId: 'SHL-SCHEMA-002',
    status: missingHeaders.length > 0 ? 'FAIL' : 'PASS',
    severity: missingHeaders.length > 0 ? 'Critical' : 'Info',
    title: 'Required headers present',
    description: missingHeaders.length > 0
      ? 'Missing required headers: ' + missingHeaders.join(', ')
      : 'All approved SystemHealthLog v1.0 headers are present.',
    affectedColumns: missingHeaders,
    recommendedAction: missingHeaders.length > 0
      ? 'Run a future approved schema migration plan.'
      : ''
  });

  addSystemHealthLogFinding_(report, {
    checkId: 'SHL-SCHEMA-003',
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

  addSystemHealthLogFinding_(report, {
    checkId: 'SHL-SCHEMA-004',
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

function validateSystemHealthLogDuplicateLogIds_(report, rows) {
  const seen = {};
  const duplicates = [];

  rows.forEach(function(row) {
    if (row.isEmpty) return;
    const logId = row.values.LogId;
    if (!logId) return;

    if (seen[logId]) {
      duplicates.push({
        logId: logId,
        firstRow: seen[logId],
        duplicateRow: row.rowNumber
      });
    } else {
      seen[logId] = row.rowNumber;
    }
  });

  report.details.duplicateLogIds = duplicates;

  addSystemHealthLogFinding_(report, {
    checkId: 'SHL-DATA-001',
    status: duplicates.length > 0 ? 'FAIL' : 'PASS',
    severity: duplicates.length > 0 ? 'Critical' : 'Info',
    title: 'LogId values are unique',
    description: duplicates.length > 0
      ? 'Duplicate LogId values were found.'
      : 'No duplicate LogId values were found.',
    affectedRows: duplicates,
    recommendedAction: duplicates.length > 0
      ? 'Manually resolve duplicate LogId rows before using SystemHealthLog for audit history.'
      : ''
  });
}

function validateSystemHealthLogSchemaRow_(report, rows) {
  const schemaRows = rows.filter(function(row) {
    return !row.isEmpty && row.values.LogId === 'SHL_REGISTRY_SCHEMA';
  });
  const issues = [];

  report.schema.schemaRowExists = schemaRows.length > 0;

  if (schemaRows.length === 0) {
    issues.push({
      field: 'LogId',
      expected: 'SHL_REGISTRY_SCHEMA',
      actual: 'Missing'
    });
  }

  if (schemaRows.length > 1) {
    issues.push({
      field: 'LogId',
      expected: 'One SHL_REGISTRY_SCHEMA row',
      actual: String(schemaRows.length)
    });
  }

  if (schemaRows.length > 0) {
    const schemaRow = schemaRows[0];
    report.schema.detectedVersion = schemaRow.values.LogSchemaVersion || '';

    [
      { field: 'RecordType', expected: 'SchemaDefinition' },
      { field: 'HealthCheckId', expected: 'HC-SYSTEM-LOG-SCHEMA' },
      { field: 'CheckName', expected: 'SystemHealthLog Schema' },
      { field: 'Status', expected: 'Pass' },
      { field: 'Severity', expected: 'Info' },
      { field: 'ConfidenceScore', expected: '100' },
      { field: 'ResolutionStatus', expected: 'NotApplicable' },
      { field: 'CorrelationId', expected: 'SYSTEM_SCHEMA' },
      { field: 'LogSchemaVersion', expected: '1.0.0' },
      { field: 'LearningEligible', expected: 'false' }
    ].forEach(function(rule) {
      const actual = String(schemaRow.values[rule.field] || '').trim();
      const normalizedActual = rule.field === 'LearningEligible' ? actual.toLowerCase() : actual;
      if (normalizedActual === rule.expected) return;

      issues.push({
        rowNumber: schemaRow.rowNumber,
        field: rule.field,
        expected: rule.expected,
        actual: actual
      });
    });

    if (!schemaRow.values.SchemaTimestamp) {
      issues.push({
        rowNumber: schemaRow.rowNumber,
        field: 'SchemaTimestamp',
        expected: 'Non-empty schema timestamp',
        actual: ''
      });
    }
  }

  report.details.schemaRowIssues = issues;

  addSystemHealthLogFinding_(report, {
    checkId: 'SHL-SCHEMA-005',
    status: issues.length > 0 ? 'FAIL' : 'PASS',
    severity: issues.length > 0 ? 'Critical' : 'Info',
    title: 'SHL_REGISTRY_SCHEMA row is valid',
    description: issues.length > 0
      ? 'SHL_REGISTRY_SCHEMA row is missing, duplicated, or has invalid key fields.'
      : 'SHL_REGISTRY_SCHEMA row exists exactly once and key fields are valid.',
    affectedRows: issues,
    recommendedAction: issues.length > 0
      ? 'Fix SHL_REGISTRY_SCHEMA only through an approved migration or seed flow.'
      : ''
  });
}

function validateSystemHealthLogRequiredFields_(report, rows, headerMap) {
  const requiredFields = getSystemHealthLogRequiredFields_();
  const executionRequiredFields = getSystemHealthLogExecutionRequiredFields_();
  const failureRequiredFields = getSystemHealthLogFailureRequiredFields_();
  const emptyRequiredFields = [];
  const missingRequiredHeaders = requiredFields.filter(function(field) {
    return !Object.prototype.hasOwnProperty.call(headerMap, field);
  });

  if (missingRequiredHeaders.length > 0) {
    addSystemHealthLogFinding_(report, {
      checkId: 'SHL-DATA-002',
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

    requiredFields.forEach(function(field) {
      if (!row.values[field]) {
        emptyRequiredFields.push({
          rowNumber: row.rowNumber,
          logId: row.values.LogId || '',
          field: field,
          severity: 'Critical'
        });
      }
    });

    if (row.values.RecordType === 'ExecutionResult') {
      executionRequiredFields.forEach(function(field) {
        if (!Object.prototype.hasOwnProperty.call(headerMap, field)) return;
        if (!row.values[field]) {
          emptyRequiredFields.push({
            rowNumber: row.rowNumber,
            logId: row.values.LogId || '',
            field: field,
            severity: 'Critical'
          });
        }
      });
    }

    if (['Warning', 'Critical', 'Error'].indexOf(row.values.Status) !== -1) {
      failureRequiredFields.forEach(function(field) {
        if (!Object.prototype.hasOwnProperty.call(headerMap, field)) return;
        if (!row.values[field]) {
          emptyRequiredFields.push({
            rowNumber: row.rowNumber,
            logId: row.values.LogId || '',
            field: field,
            severity: 'Critical'
          });
        }
      });
    }

    if ((row.values.AffectedObject && !row.values.AffectedRecordId)
      || (!row.values.AffectedObject && row.values.AffectedRecordId)) {
      emptyRequiredFields.push({
        rowNumber: row.rowNumber,
        logId: row.values.LogId || '',
        field: 'AffectedObject/AffectedRecordId',
        severity: 'Warning'
      });
    }
  });

  report.details.emptyRequiredFields = emptyRequiredFields;

  const hasCritical = emptyRequiredFields.some(function(item) {
    return item.severity === 'Critical';
  });

  addSystemHealthLogFinding_(report, {
    checkId: 'SHL-DATA-002',
    status: hasCritical ? 'FAIL' : (emptyRequiredFields.length > 0 ? 'WARNING' : 'PASS'),
    severity: hasCritical ? 'Critical' : (emptyRequiredFields.length > 0 ? 'Warning' : 'Info'),
    title: 'Required fields populated',
    description: emptyRequiredFields.length > 0
      ? 'Some required fields are empty or paired affected-object fields are incomplete.'
      : 'All required fields are populated.',
    affectedRows: emptyRequiredFields,
    recommendedAction: emptyRequiredFields.length > 0
      ? 'Review empty fields. Use an approved edit or migration flow if changes are required.'
      : ''
  });
}

function validateSystemHealthLogDropdownValues_(report, rows, headerMap) {
  const allowedValues = getSystemHealthLogDropdownAllowedValues_();
  const requiredDropdownFields = [
    'RecordType',
    'Status',
    'Severity',
    'ExecutionMode',
    'Environment'
  ];
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
        logId: row.values.LogId || '',
        field: field,
        value: value,
        severity: requiredDropdownFields.indexOf(field) !== -1 ? 'Critical' : 'Warning'
      });
    });
  });

  report.details.invalidDropdownValues = invalidDropdownValues;
  const hasCritical = invalidDropdownValues.some(function(item) {
    return item.severity === 'Critical';
  });

  addSystemHealthLogFinding_(report, {
    checkId: 'SHL-DATA-003',
    status: hasCritical ? 'FAIL' : (invalidDropdownValues.length > 0 ? 'WARNING' : 'PASS'),
    severity: hasCritical ? 'Critical' : (invalidDropdownValues.length > 0 ? 'Warning' : 'Info'),
    title: 'Dropdown values are valid',
    description: invalidDropdownValues.length > 0
      ? 'Invalid dropdown values were found.'
      : 'All populated dropdown values are valid.',
    affectedRows: invalidDropdownValues,
    recommendedAction: invalidDropdownValues.length > 0
      ? 'Review values against the approved SystemHealthLog dropdown contract.'
      : ''
  });
}

function validateSystemHealthLogConfidenceScores_(report, rows, headerMap) {
  const invalidConfidenceScores = [];
  if (!Object.prototype.hasOwnProperty.call(headerMap, 'ConfidenceScore')) {
    addSystemHealthLogFinding_(report, {
      checkId: 'SHL-DATA-004',
      status: 'FAIL',
      severity: 'Critical',
      title: 'ConfidenceScore validation skipped',
      description: 'Cannot validate ConfidenceScore because the header is missing.',
      affectedColumns: ['ConfidenceScore'],
      recommendedAction: 'Fix missing headers through an approved migration plan.'
    });
    return;
  }

  rows.forEach(function(row) {
    if (row.isEmpty) return;
    const rawValue = row.values.ConfidenceScore;
    const score = Number(rawValue);

    if (!rawValue || isNaN(score) || score < 0 || score > 100) {
      invalidConfidenceScores.push({
        rowNumber: row.rowNumber,
        logId: row.values.LogId || '',
        value: rawValue
      });
    }
  });

  report.details.invalidConfidenceScores = invalidConfidenceScores;

  addSystemHealthLogFinding_(report, {
    checkId: 'SHL-DATA-004',
    status: invalidConfidenceScores.length > 0 ? 'FAIL' : 'PASS',
    severity: invalidConfidenceScores.length > 0 ? 'Critical' : 'Info',
    title: 'ConfidenceScore values are valid',
    description: invalidConfidenceScores.length > 0
      ? 'ConfidenceScore must be numeric and between 0 and 100.'
      : 'All ConfidenceScore values are numeric and within 0-100.',
    affectedRows: invalidConfidenceScores,
    recommendedAction: invalidConfidenceScores.length > 0
      ? 'Review ConfidenceScore values against the approved 0-100 scale.'
      : ''
  });
}

function validateSystemHealthLogStatusSeverity_(report, rows, headerMap) {
  const statusSeverityIssues = [];
  const missingHeaders = ['Status', 'Severity'].filter(function(field) {
    return !Object.prototype.hasOwnProperty.call(headerMap, field);
  });

  if (missingHeaders.length > 0) {
    addSystemHealthLogFinding_(report, {
      checkId: 'SHL-DATA-005',
      status: 'FAIL',
      severity: 'Critical',
      title: 'Status and Severity consistency skipped',
      description: 'Cannot validate Status and Severity consistency because required headers are missing.',
      affectedColumns: missingHeaders,
      recommendedAction: 'Fix missing headers through an approved migration plan.'
    });
    return;
  }

  rows.forEach(function(row) {
    if (row.isEmpty) return;
    const status = row.values.Status;
    const severity = row.values.Severity;

    if (status === 'Warning' && severity === 'Info') {
      statusSeverityIssues.push({
        rowNumber: row.rowNumber,
        logId: row.values.LogId || '',
        status: status,
        severity: severity,
        issue: 'Warning status should not use Info severity.'
      });
    }

    if (status === 'Critical' && severity !== 'Critical') {
      statusSeverityIssues.push({
        rowNumber: row.rowNumber,
        logId: row.values.LogId || '',
        status: status,
        severity: severity,
        issue: 'Critical status should use Critical severity.'
      });
    }

    if (status === 'Error' && severity !== 'Critical') {
      statusSeverityIssues.push({
        rowNumber: row.rowNumber,
        logId: row.values.LogId || '',
        status: status,
        severity: severity,
        issue: 'Error status should use Critical severity.'
      });
    }
  });

  report.details.statusSeverityIssues = statusSeverityIssues;

  addSystemHealthLogFinding_(report, {
    checkId: 'SHL-DATA-005',
    status: statusSeverityIssues.length > 0 ? 'WARNING' : 'PASS',
    severity: statusSeverityIssues.length > 0 ? 'Warning' : 'Info',
    title: 'Status and Severity are consistent',
    description: statusSeverityIssues.length > 0
      ? 'Some Status and Severity combinations look inconsistent.'
      : 'Status and Severity combinations are consistent.',
    affectedRows: statusSeverityIssues,
    recommendedAction: statusSeverityIssues.length > 0
      ? 'Review severity mapping. A passing critical check may remain Pass/Critical, but failing critical results should be Critical/Critical.'
      : ''
  });
}

function validateSystemHealthLogCorrelationIds_(report, rows, headerMap) {
  const correlationIdIssues = [];
  if (!Object.prototype.hasOwnProperty.call(headerMap, 'CorrelationId')) {
    addSystemHealthLogFinding_(report, {
      checkId: 'SHL-DATA-006',
      status: 'WARNING',
      severity: 'Warning',
      title: 'CorrelationId validation skipped',
      description: 'Cannot validate CorrelationId quality because the header is missing.',
      affectedColumns: ['CorrelationId'],
      recommendedAction: 'Include CorrelationId in a future approved schema migration.'
    });
    return;
  }

  rows.forEach(function(row) {
    if (row.isEmpty) return;
    const correlationId = row.values.CorrelationId || '';

    if (row.values.LogId === 'SHL_REGISTRY_SCHEMA') {
      if (correlationId !== 'SYSTEM_SCHEMA') {
        correlationIdIssues.push({
          rowNumber: row.rowNumber,
          logId: row.values.LogId || '',
          severity: 'Critical',
          correlationId: correlationId,
          issue: 'SHL_REGISTRY_SCHEMA must use CorrelationId SYSTEM_SCHEMA.'
        });
      }
      return;
    }

    if (row.values.RecordType === 'ExecutionResult'
      && (row.values.AffectedObject || row.values.AffectedRecordId || row.values.RelatedAutomationRegistryId)
      && !correlationId) {
      correlationIdIssues.push({
        rowNumber: row.rowNumber,
        logId: row.values.LogId || '',
        severity: 'Warning',
        correlationId: correlationId,
        issue: 'ExecutionResult with affected object or related automation should include CorrelationId.'
      });
    }

    if (correlationId && correlationId !== correlationId.trim()) {
      correlationIdIssues.push({
        rowNumber: row.rowNumber,
        logId: row.values.LogId || '',
        severity: 'Warning',
        correlationId: correlationId,
        issue: 'CorrelationId contains leading or trailing whitespace.'
      });
    }

    if (correlationId && /[\r\n]/.test(correlationId)) {
      correlationIdIssues.push({
        rowNumber: row.rowNumber,
        logId: row.values.LogId || '',
        severity: 'Warning',
        correlationId: correlationId,
        issue: 'CorrelationId contains line breaks.'
      });
    }

    if (correlationId.length > 120) {
      correlationIdIssues.push({
        rowNumber: row.rowNumber,
        logId: row.values.LogId || '',
        severity: 'Warning',
        correlationId: correlationId,
        issue: 'CorrelationId is unusually long.'
      });
    }

    if (correlationId && !isSystemHealthLogRecognizedCorrelationId_(correlationId)) {
      correlationIdIssues.push({
        rowNumber: row.rowNumber,
        logId: row.values.LogId || '',
        severity: 'Warning',
        correlationId: correlationId,
        issue: 'CorrelationId format is not recognized yet.'
      });
    }
  });

  report.details.correlationIdIssues = correlationIdIssues;

  const hasCritical = correlationIdIssues.some(function(issue) {
    return issue.severity === 'Critical';
  });

  addSystemHealthLogFinding_(report, {
    checkId: 'SHL-DATA-006',
    status: hasCritical ? 'FAIL' : (correlationIdIssues.length > 0 ? 'WARNING' : 'PASS'),
    severity: hasCritical ? 'Critical' : (correlationIdIssues.length > 0 ? 'Warning' : 'Info'),
    title: 'CorrelationId values are traceable',
    description: correlationIdIssues.length > 0
      ? 'CorrelationId quality issues were found.'
      : 'CorrelationId values are acceptable.',
    affectedRows: correlationIdIssues,
    recommendedAction: correlationIdIssues.length > 0
      ? 'Review CorrelationId values for traceability. Do not modify log rows without approval.'
      : ''
  });
}

function isSystemHealthLogRecognizedCorrelationId_(correlationId) {
  return correlationId === 'SYSTEM_SCHEMA'
    || /^RUN-\d{8}-\d{6}$/.test(correlationId)
    || /^CMD-.+/.test(correlationId)
    || /^BD-.+/.test(correlationId)
    || /^REPORT-.+/.test(correlationId)
    || /^MAVEN-.+/.test(correlationId)
    || /^DRIVE-.+/.test(correlationId)
    || /^MCP-.+/.test(correlationId);
}

function addSystemHealthLogFinding_(report, finding) {
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

function finalizeSystemHealthLogValidationStatus_(report) {
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
