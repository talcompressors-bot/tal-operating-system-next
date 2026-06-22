import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

type Row = Record<string, string>;

type SourceConfig = {
  source: string;
  target: string;
  primaryKey?: string;
  expectedRows?: number;
  uniqueFields?: string[];
  parentLinks?: ParentLink[];
  statusFields?: string[];
  flexibleSchema?: boolean;
  platformCreated?: boolean;
};

type ParentLink = {
  field: string;
  parentSource: string;
  parentField: string;
  required?: boolean;
};

type SourceLoad = {
  config: SourceConfig;
  filePath?: string;
  rows: Row[];
  error?: string;
};

type CheckResult = {
  name: string;
  status: "PASS" | "WARN" | "FAIL";
  details: Record<string, unknown>;
};

const SOURCES: SourceConfig[] = [
  {
    source: "Customers_Final",
    target: "customers",
    primaryKey: "CustomerID",
    expectedRows: 763,
    uniqueFields: ["CustomerID"],
    statusFields: ["Status", "Active", "IsActive"],
  },
  {
    source: "ProductsCatalog",
    target: "products",
    primaryKey: "ProductID",
    uniqueFields: ["ProductID", "SKU"],
    statusFields: ["Status", "ProductStatus"],
  },
  {
    source: "InvoiceMavenCustomers",
    target: "maven_customers",
    primaryKey: "InvoiceMavenCustomerId",
    uniqueFields: ["InvoiceMavenCustomerId"],
    statusFields: ["SyncStatus", "Status"],
  },
  {
    source: "InvoiceMavenItems",
    target: "maven_items",
    primaryKey: "InvoiceMavenItemId",
    uniqueFields: ["InvoiceMavenItemId", "SKU"],
    statusFields: ["SyncStatus", "Status"],
  },
  {
    source: "ServiceReports",
    target: "service_reports",
    primaryKey: "ReportID",
    expectedRows: 62,
    uniqueFields: ["ReportID", "ReportCounter"],
    parentLinks: [{ field: "CustomerID", parentSource: "Customers_Final", parentField: "CustomerID" }],
    statusFields: ["Status", "ReportStatus"],
  },
  {
    source: "ReportEquipmentItems",
    target: "report_equipment_items",
    primaryKey: "ItemID",
    expectedRows: 108,
    uniqueFields: ["ItemID"],
    parentLinks: [{ field: "ReportID", parentSource: "ServiceReports", parentField: "ReportID" }],
    statusFields: ["SystemStatus", "Status"],
  },
  {
    source: "PartsUsed",
    target: "parts_used",
    uniqueFields: ["PartID", "ItemID"],
    parentLinks: [
      { field: "ReportID", parentSource: "ServiceReports", parentField: "ReportID" },
      { field: "ProductID", parentSource: "ProductsCatalog", parentField: "ProductID" },
    ],
    flexibleSchema: true,
  },
  {
    source: "InventoryStock",
    target: "inventory_stocks",
    primaryKey: "StockID",
    uniqueFields: ["StockID"],
    parentLinks: [{ field: "ProductID", parentSource: "ProductsCatalog", parentField: "ProductID", required: true }],
    statusFields: ["Status"],
  },
  {
    source: "AIDraftSuggestions",
    target: "ai_draft_suggestions",
    primaryKey: "SuggestionID",
    uniqueFields: ["SuggestionID"],
    parentLinks: [
      { field: "CustomerID", parentSource: "Customers_Final", parentField: "CustomerID" },
      { field: "ReportID", parentSource: "ServiceReports", parentField: "ReportID" },
      { field: "BusinessDocumentId", parentSource: "BusinessDocuments", parentField: "BusinessDocumentId" },
    ],
    statusFields: ["ApprovalStatus", "ConfidenceLevel", "Status"],
  },
  {
    source: "BusinessDocuments",
    target: "business_documents",
    primaryKey: "BusinessDocumentId",
    uniqueFields: ["BusinessDocumentId"],
    parentLinks: [
      { field: "CustomerID", parentSource: "Customers_Final", parentField: "CustomerID" },
      { field: "ReportID", parentSource: "ServiceReports", parentField: "ReportID" },
      { field: "SuggestionID", parentSource: "AIDraftSuggestions", parentField: "SuggestionID" },
    ],
    statusFields: ["DocumentStatus", "ApprovalStatus", "DocumentType", "Status"],
  },
  {
    source: "BusinessDocumentItems",
    target: "business_document_items",
    primaryKey: "ItemID",
    uniqueFields: ["ItemID"],
    parentLinks: [
      { field: "DocumentID", parentSource: "BusinessDocuments", parentField: "BusinessDocumentId", required: true },
      { field: "ProductID", parentSource: "ProductsCatalog", parentField: "ProductID" },
    ],
    statusFields: ["MatchSource", "Status"],
  },
  {
    source: "BusinessDocumentLog",
    target: "business_document_logs",
    primaryKey: "LogID",
    uniqueFields: ["LogID"],
    parentLinks: [{ field: "DocumentID", parentSource: "BusinessDocuments", parentField: "BusinessDocumentId" }],
    statusFields: ["Action", "Result", "Status"],
  },
  {
    source: "AutomationCommands",
    target: "automation_commands",
    primaryKey: "CommandID",
    uniqueFields: ["CommandID"],
    parentLinks: [{ field: "BusinessDocumentId", parentSource: "BusinessDocuments", parentField: "BusinessDocumentId" }],
    statusFields: ["CommandType", "CommandStatus", "Status"],
  },
  {
    source: "InvoiceMavenDocuments",
    target: "maven_documents",
    primaryKey: "InvoiceMavenDocumentId",
    uniqueFields: ["InvoiceMavenDocumentId"],
    parentLinks: [
      { field: "InvoiceMavenCustomerId", parentSource: "InvoiceMavenCustomers", parentField: "InvoiceMavenCustomerId" },
      { field: "CustomerID", parentSource: "Customers_Final", parentField: "CustomerID" },
      { field: "BusinessDocumentId", parentSource: "BusinessDocuments", parentField: "BusinessDocumentId" },
    ],
    statusFields: ["DocumentType", "PaymentStatus", "PaymentMethod", "SyncStatus", "Status"],
  },
  {
    source: "InvoiceMavenDocumentItems",
    target: "maven_document_items",
    primaryKey: "ItemRowId",
    uniqueFields: ["ItemRowId"],
    parentLinks: [
      { field: "MavenDocumentId", parentSource: "InvoiceMavenDocuments", parentField: "InvoiceMavenDocumentId", required: true },
      { field: "CustomerID", parentSource: "Customers_Final", parentField: "CustomerID" },
    ],
    statusFields: ["DocumentType", "Status"],
  },
  {
    source: "ApprovalsLog",
    target: "approvals",
    primaryKey: "ApprovalID",
    uniqueFields: ["ApprovalID"],
    statusFields: ["Status", "ApprovalStatus", "ActionType"],
  },
  {
    source: "EmailLog",
    target: "email_logs",
    parentLinks: [
      { field: "ReportID", parentSource: "ServiceReports", parentField: "ReportID" },
      { field: "BusinessDocumentId", parentSource: "BusinessDocuments", parentField: "BusinessDocumentId" },
    ],
    statusFields: ["Status", "EmailStatus"],
    flexibleSchema: true,
  },
  {
    source: "SyncState",
    target: "sync_states",
    uniqueFields: ["Source+Key"],
    statusFields: ["Source"],
  },
  {
    source: "SyncLog",
    target: "sync_logs",
    statusFields: ["Source", "Status"],
  },
  {
    source: "ErrorLog",
    target: "error_logs",
    statusFields: ["Source", "Status", "FunctionName"],
  },
  {
    source: "InventoryTransaction",
    target: "inventory_transactions",
    platformCreated: true,
  },
];

const JSON_FIELDS = [
  "RawJson",
  "RawJSON",
  "RawData",
  "RawError",
  "SuggestedItems",
  "ItemsJson",
  "RawSource",
  "RawItem",
];

const DATE_OR_TIME_FIELD = /(date|time|timestamp|created|updated|sent|approved|processed|completed|requested|imported)/i;
const DECIMAL_FIELD = /(amount|price|quantity|hours|total|vat|subtotal|count)/i;

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));
  const sourceDir = args["source-dir"] ?? process.env.IMPORT_DRY_RUN_SOURCE_DIR;

  if (!sourceDir) {
    throw new Error("Missing --source-dir or IMPORT_DRY_RUN_SOURCE_DIR. Use approved local JSON/CSV exports only.");
  }

  const loaded = await Promise.all(SOURCES.map((source) => loadSource(sourceDir, source)));
  const sourceMap = new Map(loaded.map((entry) => [entry.config.source, entry]));
  const checks = runChecks(loaded, sourceMap);
  const report = buildReport(sourceDir, loaded, checks);

  if (args.report) {
    await writeFile(args.report, report, "utf8");
  }

  process.stdout.write(report);

  if (checks.some((check) => check.status === "FAIL")) {
    process.exitCode = 1;
  }
}

function parseArgs(args: string[]): Record<string, string> {
  const parsed: Record<string, string> = {};

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (!arg.startsWith("--")) {
      continue;
    }

    const [key, inlineValue] = arg.slice(2).split("=", 2);
    const value = inlineValue ?? args[index + 1];
    if (!value || value.startsWith("--")) {
      parsed[key] = "true";
      continue;
    }

    parsed[key] = value;
    if (!inlineValue) {
      index += 1;
    }
  }

  return parsed;
}

async function loadSource(sourceDir: string, config: SourceConfig): Promise<SourceLoad> {
  if (config.platformCreated) {
    return { config, rows: [] };
  }

  const jsonPath = path.join(sourceDir, `${config.source}.json`);
  const csvPath = path.join(sourceDir, `${config.source}.csv`);

  try {
    if (existsSync(jsonPath)) {
      const content = await readFile(jsonPath, "utf8");
      return { config, filePath: jsonPath, rows: parseJsonRows(content) };
    }

    if (existsSync(csvPath)) {
      const content = await readFile(csvPath, "utf8");
      return { config, filePath: csvPath, rows: parseCsvRows(content) };
    }

    return { config, rows: [], error: `Missing ${config.source}.json or ${config.source}.csv` };
  } catch (error) {
    return { config, rows: [], error: error instanceof Error ? error.message : String(error) };
  }
}

function parseJsonRows(content: string): Row[] {
  const parsed = JSON.parse(content) as unknown;
  const rows = Array.isArray(parsed) ? parsed : getObjectProperty(parsed, "rows");

  if (!Array.isArray(rows)) {
    throw new Error("JSON export must be an array or an object with a rows array.");
  }

  return rows.map((row) => normalizeRow(row));
}

function getObjectProperty(value: unknown, key: string): unknown {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return undefined;
  }

  return (value as Record<string, unknown>)[key];
}

function normalizeRow(row: unknown): Row {
  if (!row || typeof row !== "object" || Array.isArray(row)) {
    throw new Error("Every source row must be an object.");
  }

  return Object.fromEntries(
    Object.entries(row).map(([key, value]) => [key.trim(), value == null ? "" : String(value).trim()]),
  );
}

function parseCsvRows(content: string): Row[] {
  const records = parseCsvRecords(content);
  if (records.length === 0) {
    return [];
  }

  const [headers, ...rows] = records;
  const normalizedHeaders = headers.map((header) => header.trim());

  return rows
    .filter((row) => row.some((cell) => cell.trim() !== ""))
    .map((row) =>
      Object.fromEntries(normalizedHeaders.map((header, index) => [header, (row[index] ?? "").trim()])),
    );
}

function parseCsvRecords(content: string): string[][] {
  const records: string[][] = [];
  let record: string[] = [];
  let cell = "";
  let inQuotes = false;

  for (let index = 0; index < content.length; index += 1) {
    const char = content[index];
    const next = content[index + 1];

    if (char === '"' && inQuotes && next === '"') {
      cell += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === "," && !inQuotes) {
      record.push(cell);
      cell = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") {
        index += 1;
      }
      record.push(cell);
      records.push(record);
      record = [];
      cell = "";
      continue;
    }

    cell += char;
  }

  if (cell.length > 0 || record.length > 0) {
    record.push(cell);
    records.push(record);
  }

  return records;
}

function runChecks(loads: SourceLoad[], sourceMap: Map<string, SourceLoad>): CheckResult[] {
  const checks: CheckResult[] = [];

  for (const load of loads) {
    checks.push(checkLoaded(load));

    if (load.error || load.config.platformCreated) {
      continue;
    }

    checks.push(checkRowCount(load));
    checks.push(...checkUniqueFields(load));
    checks.push(...checkParentLinks(load, sourceMap));
    checks.push(...checkStatusFields(load));
    checks.push(...checkJsonFields(load));
    checks.push(...checkParseableFields(load));
  }

  checks.push(checkReportEquipmentItems(sourceMap));
  return checks;
}

function checkLoaded(load: SourceLoad): CheckResult {
  if (load.config.platformCreated) {
    return {
      name: `${load.config.source}: platform-created`,
      status: "PASS",
      details: { target: load.config.target, expectedRows: 0, note: "No source import expected." },
    };
  }

  if (load.error) {
    return {
      name: `${load.config.source}: source file`,
      status: load.config.flexibleSchema ? "WARN" : "FAIL",
      details: { target: load.config.target, error: load.error },
    };
  }

  return {
    name: `${load.config.source}: source file`,
    status: "PASS",
    details: { target: load.config.target, file: load.filePath, rows: load.rows.length },
  };
}

function checkRowCount(load: SourceLoad): CheckResult {
  const expected = load.config.expectedRows;
  const observed = load.rows.length;
  const status = expected == null || expected === observed ? "PASS" : "FAIL";

  return {
    name: `${load.config.source}: row count`,
    status,
    details: { expected: expected ?? "UNKNOWN", observed },
  };
}

function checkUniqueFields(load: SourceLoad): CheckResult[] {
  return (load.config.uniqueFields ?? []).map((field) => {
    if (field === "Source+Key") {
      return checkCompositeUnique(load, ["Source", "Key"]);
    }

    const duplicateValues = getDuplicateValues(load.rows, field, field === "SKU");
    return {
      name: `${load.config.source}: unique ${field}`,
      status: duplicateValues.length === 0 ? "PASS" : "FAIL",
      details: { duplicates: duplicateValues.slice(0, 20), duplicateCount: duplicateValues.length },
    };
  });
}

function checkCompositeUnique(load: SourceLoad, fields: string[]): CheckResult {
  const duplicateValues = getDuplicateCompositeValues(load.rows, fields);

  return {
    name: `${load.config.source}: unique ${fields.join("+")}`,
    status: duplicateValues.length === 0 ? "PASS" : "FAIL",
    details: { duplicates: duplicateValues.slice(0, 20), duplicateCount: duplicateValues.length },
  };
}

function getDuplicateValues(rows: Row[], field: string, ignoreBlank: boolean): string[] {
  const counts = new Map<string, number>();

  for (const row of rows) {
    const value = row[field] ?? "";
    if (ignoreBlank && value === "") {
      continue;
    }
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  return [...counts.entries()].filter(([, count]) => count > 1).map(([value]) => value);
}

function getDuplicateCompositeValues(rows: Row[], fields: string[]): string[] {
  const counts = new Map<string, number>();

  for (const row of rows) {
    const value = fields.map((field) => row[field] ?? "").join("::");
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  return [...counts.entries()].filter(([, count]) => count > 1).map(([value]) => value);
}

function checkParentLinks(load: SourceLoad, sourceMap: Map<string, SourceLoad>): CheckResult[] {
  return (load.config.parentLinks ?? []).map((link) => {
    const parent = sourceMap.get(link.parentSource);
    if (!parent || parent.error) {
      return {
        name: `${load.config.source}: parent ${link.field} -> ${link.parentSource}.${link.parentField}`,
        status: link.required ? "FAIL" : "WARN",
        details: { error: "Parent source unavailable." },
      };
    }

    const parentValues = new Set(parent.rows.map((row) => row[link.parentField]).filter(Boolean));
    const checked = load.rows.filter((row) => (row[link.field] ?? "") !== "");
    const missing = checked
      .filter((row) => !parentValues.has(row[link.field]))
      .map((row) => row[load.config.primaryKey ?? "id"] ?? row[link.field])
      .slice(0, 50);

    return {
      name: `${load.config.source}: parent ${link.field} -> ${link.parentSource}.${link.parentField}`,
      status: missing.length === 0 ? "PASS" : link.required ? "FAIL" : "WARN",
      details: {
        checked: checked.length,
        valid: checked.length - missing.length,
        missingCount: missing.length,
        sampleRows: missing,
      },
    };
  });
}

function checkStatusFields(load: SourceLoad): CheckResult[] {
  return (load.config.statusFields ?? [])
    .filter((field) => load.rows.some((row) => field in row))
    .map((field) => {
      const values = distinctValues(load.rows, field);
      return {
        name: `${load.config.source}: observed ${field} values`,
        status: "WARN",
        details: { values, note: "Review mapping before real import." },
      };
    });
}

function distinctValues(rows: Row[], field: string): string[] {
  return [...new Set(rows.map((row) => row[field]).filter(Boolean))].sort();
}

function checkJsonFields(load: SourceLoad): CheckResult[] {
  const fields = JSON_FIELDS.filter((field) => load.rows.some((row) => (row[field] ?? "") !== ""));

  return fields.map((field) => {
    const invalid = load.rows
      .filter((row) => (row[field] ?? "") !== "")
      .filter((row) => !isValidJson(row[field]))
      .map((row) => row[load.config.primaryKey ?? "id"] ?? "")
      .slice(0, 50);

    return {
      name: `${load.config.source}: parse JSON ${field}`,
      status: invalid.length === 0 ? "PASS" : "WARN",
      details: { invalidCount: invalid.length, sampleRows: invalid },
    };
  });
}

function isValidJson(value: string): boolean {
  try {
    JSON.parse(value);
    return true;
  } catch {
    return false;
  }
}

function checkParseableFields(load: SourceLoad): CheckResult[] {
  const fields = new Set(load.rows.flatMap((row) => Object.keys(row)));
  const checks: CheckResult[] = [];

  for (const field of fields) {
    if (DECIMAL_FIELD.test(field)) {
      const invalid = invalidParseRows(load, field, (value) => Number.isFinite(Number(value.replace(/,/g, ""))));
      if (invalid.length > 0) {
        checks.push({
          name: `${load.config.source}: parse decimal ${field}`,
          status: "WARN",
          details: { invalidCount: invalid.length, sampleRows: invalid },
        });
      }
    }

    if (DATE_OR_TIME_FIELD.test(field)) {
      const invalid = invalidParseRows(load, field, (value) => !Number.isNaN(Date.parse(value)));
      if (invalid.length > 0) {
        checks.push({
          name: `${load.config.source}: parse date/time ${field}`,
          status: "WARN",
          details: { invalidCount: invalid.length, sampleRows: invalid },
        });
      }
    }
  }

  return checks;
}

function invalidParseRows(load: SourceLoad, field: string, predicate: (value: string) => boolean): string[] {
  return load.rows
    .filter((row) => (row[field] ?? "") !== "")
    .filter((row) => !predicate(row[field]))
    .map((row) => row[load.config.primaryKey ?? "id"] ?? "")
    .slice(0, 50);
}

function checkReportEquipmentItems(sourceMap: Map<string, SourceLoad>): CheckResult {
  const equipment = sourceMap.get("ReportEquipmentItems");
  const serviceReports = sourceMap.get("ServiceReports");

  if (!equipment || equipment.error || !serviceReports || serviceReports.error) {
    return {
      name: "ReportEquipmentItems: exclusion classification",
      status: "FAIL",
      details: { error: "ReportEquipmentItems and ServiceReports are both required." },
    };
  }

  const reportIds = new Set(serviceReports.rows.map((row) => row.ReportID).filter(Boolean));
  const missingReportId = equipment.rows.filter((row) => (row.ReportID ?? "") === "");
  const unmatchedReportId = equipment.rows.filter((row) => (row.ReportID ?? "") !== "" && !reportIds.has(row.ReportID));
  const importable = equipment.rows.length - missingReportId.length - unmatchedReportId.length;
  const matchesApprovedBaseline = missingReportId.length === 9 && unmatchedReportId.length === 25;

  return {
    name: "ReportEquipmentItems: exclusion classification",
    status: matchesApprovedBaseline ? "PASS" : "FAIL",
    details: {
      total: equipment.rows.length,
      importable,
      missingReportId: missingReportId.length,
      unmatchedReportId: unmatchedReportId.length,
      approvedMissingReportId: 9,
      approvedUnmatchedReportId: 25,
      classification: "historical test data; not business data; no recovery required; excluded by design",
      missingSamples: missingReportId.map((row) => row.ItemID).slice(0, 25),
      unmatchedSamples: unmatchedReportId.map((row) => `${row.ItemID}:${row.ReportID}`).slice(0, 25),
    },
  };
}

function buildReport(sourceDir: string, loads: SourceLoad[], checks: CheckResult[]): string {
  const status = checks.some((check) => check.status === "FAIL") ? "FAIL" : checks.some((check) => check.status === "WARN") ? "WARN" : "PASS";
  const lines = [
    "# Import Dry-Run Validation Report",
    "",
    `Generated: ${new Date().toISOString()}`,
    `Mode: read-only`,
    `Source directory: ${sourceDir}`,
    `DB writes: none`,
    `Import writes: none`,
    `Overall status: ${status}`,
    "",
    "## Source Counts",
    "",
    "| Source | Target | Rows | Expected | File | Status |",
    "|---|---|---:|---:|---|---|",
    ...loads.map((load) => {
      const expected = load.config.expectedRows ?? (load.config.platformCreated ? 0 : "UNKNOWN");
      const sourceStatus = load.error ? (load.config.flexibleSchema ? "WARN" : "FAIL") : "PASS";
      return `| ${load.config.source} | ${load.config.target} | ${load.rows.length} | ${expected} | ${load.filePath ?? "n/a"} | ${sourceStatus} |`;
    }),
    "",
    "## Checks",
    "",
    "| Status | Check | Details |",
    "|---|---|---|",
    ...checks.map((check) => `| ${check.status} | ${check.name} | ${escapeMarkdown(JSON.stringify(check.details))} |`),
    "",
    "## Approval Gate Before Real Import",
    "",
    "Real import requires explicit approval of this dry-run report. Approval must still forbid production actions, Prisma migrations, schema changes, AppSheet/Sheets/Maven changes, and importing excluded legacy/test ReportEquipmentItems rows.",
    "",
  ];

  return `${lines.join("\n")}\n`;
}

function escapeMarkdown(value: string): string {
  return value.replace(/\|/g, "\\|");
}

void main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
