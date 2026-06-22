import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { PrismaClient, ServiceReportStatus, SourceSystem } from "@prisma/client";

type Row = Record<string, string>;

type ImportManifest = {
  generatedAt: string;
  mode: "staging-import";
  sourceFiles: string[];
  baseline: {
    customers: number;
    serviceReports: number;
    reportEquipmentItems: number;
    missingReportIdExcluded: number;
    unmatchedReportIdExcluded: number;
  };
  preImportCounts: TableCounts;
  inserted: {
    customerIds: string[];
    serviceReportIds: string[];
    reportEquipmentItemIds: string[];
  };
  excludedReportEquipmentItems: {
    missingReportId: string[];
    unmatchedReportId: Array<{ itemId: string; reportId: string }>;
  };
  postImportCounts?: TableCounts;
  validation?: ValidationResult;
};

type TableCounts = {
  customers: number;
  serviceReports: number;
  reportEquipmentItems: number;
};

type ValidationResult = {
  status: "PASS" | "FAIL";
  checks: Array<{ name: string; status: "PASS" | "FAIL"; details: Record<string, unknown> }>;
};

const SOURCE_DIR = path.join(process.cwd(), "data-sources", "exports");
const OUTPUT_DIR = path.join(SOURCE_DIR, "import-runs");
const ENV_FILE = path.join(process.cwd(), ".env.staging");
const STAGING_PROJECT_ID = "mdlxxxklufrchiabonafm";

const BASELINE = {
  customers: 763,
  serviceReports: 63,
  reportEquipmentItems: 109,
  missingReportIdExcluded: 9,
  unmatchedReportIdExcluded: 25,
};

const SOURCE_FILES = [
  path.join(SOURCE_DIR, "Customers_Final.csv"),
  path.join(SOURCE_DIR, "ServiceReports.csv"),
  path.join(SOURCE_DIR, "ReportEquipmentItems.csv"),
];

async function main(): Promise<void> {
  loadStagingEnv();
  assertStagingOnly();

  const prisma = new PrismaClient();
  const manifest: ImportManifest = {
    generatedAt: new Date().toISOString(),
    mode: "staging-import",
    sourceFiles: SOURCE_FILES,
    baseline: BASELINE,
    preImportCounts: { customers: 0, serviceReports: 0, reportEquipmentItems: 0 },
    inserted: {
      customerIds: [],
      serviceReportIds: [],
      reportEquipmentItemIds: [],
    },
    excludedReportEquipmentItems: {
      missingReportId: [],
      unmatchedReportId: [],
    },
  };

  try {
    const customers = await readCsv(SOURCE_FILES[0]);
    const serviceReports = await readCsv(SOURCE_FILES[1]);
    const equipmentItems = await readCsv(SOURCE_FILES[2]);

    validateSourceBaseline(customers, serviceReports, equipmentItems);
    validateSourceUniqueness(customers, serviceReports, equipmentItems);

    manifest.preImportCounts = await countTables(prisma);
    assertEmptyTargetTables(manifest.preImportCounts);

    await prisma.$transaction(
      async (tx) => {
        await tx.customer.createMany({ data: customers.map(mapCustomerRow) });

        const createdCustomers = await tx.customer.findMany({
          where: { appsheetCustomerId: { in: customers.map((row) => required(row, "CustomerID")) } },
          select: { id: true, appsheetCustomerId: true },
        });
        const customerIdBySourceId = new Map(createdCustomers.map((customer) => [customer.appsheetCustomerId, customer.id]));
        manifest.inserted.customerIds = createdCustomers.map((customer) => customer.id);

        await tx.serviceReport.createMany({
          data: serviceReports.map((row) => mapServiceReportRow(row, customerIdBySourceId)),
        });

        const createdReports = await tx.serviceReport.findMany({
          where: { appsheetReportId: { in: serviceReports.map((row) => required(row, "ReportID")) } },
          select: { id: true, appsheetReportId: true, reportCounter: true },
        });
        const reportBySourceId = new Map(createdReports.map((report) => [report.appsheetReportId, { id: report.id, reportCounter: report.reportCounter }]));
        const reportSourceIds = new Set(serviceReports.map((row) => required(row, "ReportID")));
        manifest.inserted.serviceReportIds = createdReports.map((report) => report.id);

        const equipmentData = [];
        for (const row of equipmentItems) {
          const sourceReportId = text(row.ReportID);
          if (!sourceReportId) {
            manifest.excludedReportEquipmentItems.missingReportId.push(required(row, "ItemID"));
            continue;
          }

          const report = reportBySourceId.get(sourceReportId);
          if (!report || !reportSourceIds.has(sourceReportId)) {
            manifest.excludedReportEquipmentItems.unmatchedReportId.push({
              itemId: required(row, "ItemID"),
              reportId: sourceReportId,
            });
            continue;
          }

          equipmentData.push(mapReportEquipmentItemRow(row, sourceReportId, report));
        }

        await tx.reportEquipmentItem.createMany({ data: equipmentData });

        const createdEquipment = await tx.reportEquipmentItem.findMany({
          where: { appsheetItemId: { in: equipmentData.map((row) => row.appsheetItemId) } },
          select: { id: true },
        });
        manifest.inserted.reportEquipmentItemIds = createdEquipment.map((item) => item.id);
      },
      { timeout: 180_000 },
    );

    manifest.postImportCounts = await countTables(prisma);
    manifest.validation = validatePostImport(manifest);

    await writeOutputs(manifest);
    process.stdout.write(buildConsoleSummary(manifest));

    if (manifest.validation.status === "FAIL") {
      process.exitCode = 1;
    }
  } catch (error) {
    await writeOutputs(manifest, error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

function loadStagingEnv(): void {
  const content = readTextFileSync(ENV_FILE);
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }
    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) {
      continue;
    }
    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim().replace(/^["']|["']$/g, "");
    process.env[key] = value;
  }
}

function readTextFileSync(filePath: string): string {
  // Keep env loading dependency-free for a one-off controlled import script.
  return require("node:fs").readFileSync(filePath, "utf8") as string;
}

function assertStagingOnly(): void {
  const databaseUrl = process.env.DATABASE_URL ?? "";
  const directUrl = process.env.DIRECT_URL ?? "";
  const appEnv = process.env.NEXT_PUBLIC_APP_ENV ?? "";
  const combined = `${databaseUrl}\n${directUrl}\n${appEnv}`.toLowerCase();

  if (!databaseUrl || !directUrl) {
    throw new Error("DATABASE_URL and DIRECT_URL are required in .env.staging.");
  }
  const hasProjectId = databaseUrl.includes(STAGING_PROJECT_ID) && directUrl.includes(STAGING_PROJECT_ID);
  const hasStagingEnv = appEnv.toLowerCase() === "staging";
  const usesSupabasePooler = databaseUrl.includes("pooler.supabase.com") && directUrl.includes("pooler.supabase.com");

  if (!hasProjectId && !(hasStagingEnv && usesSupabasePooler)) {
    throw new Error("Refusing import: .env.staging must use the approved project id or staging Supabase pooler URLs with NEXT_PUBLIC_APP_ENV=staging.");
  }
  if (combined.includes("prod") || combined.includes("production")) {
    throw new Error("Refusing import: staging env appears to contain production markers.");
  }
}

async function readCsv(filePath: string): Promise<Row[]> {
  const content = await readFile(filePath, "utf8");
  const records = parseCsvRecords(content);
  if (records.length === 0) {
    return [];
  }

  const [headers, ...rows] = records;
  const normalizedHeaders = headers.map((header) => header.trim());
  return rows
    .filter((row) => row.some((cell) => cell.trim() !== ""))
    .map((row) => Object.fromEntries(normalizedHeaders.map((header, index) => [header, (row[index] ?? "").trim()])));
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

function validateSourceBaseline(customers: Row[], serviceReports: Row[], equipmentItems: Row[]): void {
  const checks = [
    ["Customers_Final", customers.length, BASELINE.customers],
    ["ServiceReports", serviceReports.length, BASELINE.serviceReports],
    ["ReportEquipmentItems", equipmentItems.length, BASELINE.reportEquipmentItems],
  ] as const;

  const failed = checks.filter(([, observed, expected]) => observed !== expected);
  if (failed.length > 0) {
    throw new Error(`Source baseline mismatch: ${failed.map(([name, observed, expected]) => `${name} ${observed}/${expected}`).join(", ")}`);
  }
}

function validateSourceUniqueness(customers: Row[], serviceReports: Row[], equipmentItems: Row[]): void {
  assertNoDuplicates("Customers_Final.CustomerID", customers.map((row) => required(row, "CustomerID")));
  assertNoDuplicates("ServiceReports.ReportID", serviceReports.map((row) => required(row, "ReportID")));
  assertNoDuplicates("ServiceReports.ReportCounter", serviceReports.map((row) => required(row, "ReportCounter")));
  assertNoDuplicates("ReportEquipmentItems.ItemID", equipmentItems.map((row) => required(row, "ItemID")));
}

function assertNoDuplicates(name: string, values: string[]): void {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) {
      duplicates.add(value);
    }
    seen.add(value);
  }
  if (duplicates.size > 0) {
    throw new Error(`${name} has duplicate values: ${[...duplicates].slice(0, 20).join(", ")}`);
  }
}

async function countTables(prisma: PrismaClient): Promise<TableCounts> {
  const [customers, serviceReports, reportEquipmentItems] = await Promise.all([
    prisma.customer.count(),
    prisma.serviceReport.count(),
    prisma.reportEquipmentItem.count(),
  ]);
  return { customers, serviceReports, reportEquipmentItems };
}

function assertEmptyTargetTables(counts: TableCounts): void {
  if (counts.customers !== 0 || counts.serviceReports !== 0 || counts.reportEquipmentItems !== 0) {
    throw new Error(
      `Refusing first Wave 1 import because target tables are not empty: customers=${counts.customers}, service_reports=${counts.serviceReports}, report_equipment_items=${counts.reportEquipmentItems}`,
    );
  }
}

function mapCustomerRow(row: Row) {
  return {
    appsheetCustomerId: required(row, "CustomerID"),
    name: text(row["שם לקוח"]) ?? required(row, "CustomerID"),
    contactName: text(row["איש קשר"]),
    phonePrimary: firstText(row["טלפון"], row["טלפון1"], row["טלפון2"], row["טלפון3"], row["טלפון4"]),
    emailPrimary: firstText(row["אימייל"], row["אימייל1"], row["אימייל2"], row["אימייל3"], row["אימייל4"], row["אימייל5"], row["אימייל6"]),
    address: text(row["כתובת / מתקן"]),
    businessId: text(row["ח.פ/ע.מ/ת.ז"]),
    isActive: parseBoolean(row["פעיל"], true),
    sourceSystem: SourceSystem.GOOGLE_SHEETS,
    rawSource: row,
  };
}

function mapServiceReportRow(row: Row, customerIdBySourceId: Map<string, string>) {
  return {
    appsheetReportId: required(row, "ReportID"),
    reportCounter: parseInteger(row.ReportCounter),
    reportNumberText: text(row["מספר דוח"]),
    customerId: optionalLookup(customerIdBySourceId, row.CustomerID),
    serviceDate: parseDate(row["תאריך שירות"]),
    serviceTime: parseTime(row["שעת שירות"]),
    technicianName: text(row["טכנאי"]),
    reportType: text(row["סוג דוח"]),
    equipmentType: text(row["סוג ציוד"]),
    serviceType: text(row["סוג שירות"]),
    serviceDescription: text(row["תיאור השירות"]),
    workPerformed: text(row["תיאור העבודה שבוצעה"]),
    technicianSummary: text(row["סיכום טכנאי"]),
    recommendations: text(row["המלצות ללקוח"]),
    technicianWorkHours: parseDecimal(row["זמן עבודת טכנאי"]),
    status: mapServiceReportStatus(row["סטטוס דוח"]),
    sourceStatusText: text(row["סטטוס דוח"]),
    clientSignatureData: text(row.ClientSign),
    technicianSignatureData: text(row["חתימת טכנאי"]),
    signedHtmlFileUrl: text(row.SignedHtmlFileUrl),
    customerFolderId: text(row.CustomerFolderId),
    reportDriveFileId: text(row.ReportDriveFileId),
    businessDraftCreated: parseBoolean(row.BusinessDraftCreated, false),
    draftDocumentType: text(row.DraftDocumentType),
    mavenDocumentCreated: parseBoolean(row.MavenDocumentCreated, false),
    mavenSentToCustomer: parseBoolean(row.MavenSentToCustomer, false),
    rawSource: row,
  };
}

function mapReportEquipmentItemRow(row: Row, sourceReportId: string, report: { id: string; reportCounter: number | null }) {
  return {
    appsheetItemId: required(row, "ItemID"),
    serviceReportId: report.id,
    sourceReportId,
    reportCounter: report.reportCounter == null ? null : String(report.reportCounter),
    equipmentNumber: text(row["מספר ציוד"]),
    equipmentType: text(row["סוג ציוד"]),
    equipmentSubtype: text(row["תת סוג ציוד"]),
    equipmentModel: text(row["דגם הציוד"]),
    serialNumber: text(row["מס סידורי"]),
    compressorCategory: text(row["קטגוריית מדחס"]),
    serviceDescription: text(row["תיאור השירות"]),
    currentHours: parseDecimal(row["מונה שעות נוכחי"]),
    nextService: text(row["טיפול הבא"]),
    systemStatus: text(row["מצב מערכת"]),
    technicianRecommendations: text(row["סיכום והמלצות טכנאי"]),
    rawSource: row,
  };
}

function validatePostImport(manifest: ImportManifest): ValidationResult {
  const post = manifest.postImportCounts ?? { customers: -1, serviceReports: -1, reportEquipmentItems: -1 };
  const importableEquipment = BASELINE.reportEquipmentItems - BASELINE.missingReportIdExcluded - BASELINE.unmatchedReportIdExcluded;
  const checks = [
    check("customers inserted", post.customers === BASELINE.customers, { expected: BASELINE.customers, observed: post.customers }),
    check("service_reports inserted", post.serviceReports === BASELINE.serviceReports, { expected: BASELINE.serviceReports, observed: post.serviceReports }),
    check("report_equipment_items inserted", post.reportEquipmentItems === importableEquipment, { expected: importableEquipment, observed: post.reportEquipmentItems }),
    check("missing ReportID excluded", manifest.excludedReportEquipmentItems.missingReportId.length === BASELINE.missingReportIdExcluded, {
      expected: BASELINE.missingReportIdExcluded,
      observed: manifest.excludedReportEquipmentItems.missingReportId.length,
    }),
    check("unmatched ReportID excluded", manifest.excludedReportEquipmentItems.unmatchedReportId.length === BASELINE.unmatchedReportIdExcluded, {
      expected: BASELINE.unmatchedReportIdExcluded,
      observed: manifest.excludedReportEquipmentItems.unmatchedReportId.length,
    }),
  ];

  return {
    status: checks.every((entry) => entry.status === "PASS") ? "PASS" : "FAIL",
    checks,
  };
}

function check(name: string, passed: boolean, details: Record<string, unknown>): ValidationResult["checks"][number] {
  return { name, status: passed ? "PASS" : "FAIL", details };
}

async function writeOutputs(manifest: ImportManifest, error?: unknown): Promise<void> {
  await mkdir(OUTPUT_DIR, { recursive: true });
  const timestamp = manifest.generatedAt.replace(/[:.]/g, "-");
  const manifestPath = path.join(OUTPUT_DIR, `wave1-import-manifest-${timestamp}.json`);
  const reportPath = path.join(OUTPUT_DIR, `wave1-import-report-${timestamp}.md`);
  const output = error ? { ...manifest, error: error instanceof Error ? error.message : String(error) } : manifest;
  await writeFile(manifestPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");
  await writeFile(reportPath, buildMarkdownReport(output), "utf8");
}

function buildMarkdownReport(manifest: ImportManifest & { error?: string }): string {
  const validationStatus = manifest.validation?.status ?? "FAIL";
  const post = manifest.postImportCounts;
  return [
    "# Wave 1 Staging Import Report",
    "",
    `Generated: ${manifest.generatedAt}`,
    "Environment: Supabase staging",
    "Production actions: none",
    "Schema changes: none",
    "Prisma migration/db push/seed: none",
    "",
    "## Counts",
    "",
    `- Customers imported: ${post?.customers ?? 0}`,
    `- Service reports imported: ${post?.serviceReports ?? 0}`,
    `- Report equipment items imported: ${post?.reportEquipmentItems ?? 0}`,
    `- Report equipment items excluded, missing ReportID: ${manifest.excludedReportEquipmentItems.missingReportId.length}`,
    `- Report equipment items excluded, unmatched ReportID: ${manifest.excludedReportEquipmentItems.unmatchedReportId.length}`,
    "",
    "## Validation",
    "",
    `Status: ${validationStatus}`,
    ...(manifest.validation?.checks ?? []).map((entry) => `- ${entry.status}: ${entry.name} ${JSON.stringify(entry.details)}`),
    "",
    "## Closed-Loop Requirement",
    "",
    "- Source CSV files read from `data-sources/exports/`.",
    "- Supabase staging receives only approved Wave 1 data.",
    "- Prisma Client reads back inserted counts.",
    "- Excluded legacy/test ReportEquipmentItems are reported.",
    "- Validation report is generated.",
    "- Import manifest is generated.",
    "- Project Brain must be updated with import date/time, source counts, DB counts, excluded counts, PASS/FAIL result, and next task.",
    "- Git status must be reviewed.",
    "- Only approved files may be committed/pushed.",
    "- Google Sheets, AppSheet, Maven, Apps Script, and production systems must remain untouched.",
    "- If any item fails, stop and do not continue to Wave 2.",
    ...(manifest.error ? ["", "## Error", "", manifest.error] : []),
    "",
  ].join("\n");
}

function buildConsoleSummary(manifest: ImportManifest): string {
  const validationStatus = manifest.validation?.status ?? "FAIL";
  const post = manifest.postImportCounts;
  return [
    "Wave 1 staging import completed.",
    `customers=${post?.customers ?? 0}`,
    `service_reports=${post?.serviceReports ?? 0}`,
    `report_equipment_items=${post?.reportEquipmentItems ?? 0}`,
    `excluded_missing_report_id=${manifest.excludedReportEquipmentItems.missingReportId.length}`,
    `excluded_unmatched_report_id=${manifest.excludedReportEquipmentItems.unmatchedReportId.length}`,
    `validation=${validationStatus}`,
    "",
  ].join("\n");
}

function required(row: Row, field: string): string {
  const value = text(row[field]);
  if (!value) {
    throw new Error(`Required field is missing: ${field}`);
  }
  return value;
}

function optionalLookup(map: Map<string, string>, key: string | undefined): string | null {
  const normalized = text(key);
  if (!normalized) {
    return null;
  }
  return map.get(normalized) ?? null;
}

function text(value: string | undefined): string | null {
  const normalized = value?.trim();
  return normalized ? normalized : null;
}

function firstText(...values: Array<string | undefined>): string | null {
  for (const value of values) {
    const normalized = text(value);
    if (normalized) {
      return normalized;
    }
  }
  return null;
}

function parseBoolean(value: string | undefined, fallback: boolean): boolean {
  const normalized = text(value)?.toLowerCase();
  if (!normalized) {
    return fallback;
  }
  return ["true", "yes", "y", "1", "כן", "פעיל"].includes(normalized);
}

function parseInteger(value: string | undefined): number | null {
  const normalized = text(value);
  if (!normalized) {
    return null;
  }
  const numeric = Number(normalized.replace(/,/g, ""));
  if (!Number.isFinite(numeric)) {
    return null;
  }
  return Math.trunc(numeric);
}

function parseDecimal(value: string | undefined): string | null {
  const normalized = text(value);
  if (!normalized) {
    return null;
  }
  const numeric = Number(normalized.replace(/,/g, ""));
  return Number.isFinite(numeric) ? String(numeric) : null;
}

function parseDate(value: string | undefined): Date | null {
  const normalized = text(value);
  if (!normalized) {
    return null;
  }
  const parsed = parseDateParts(normalized);
  return parsed ? new Date(Date.UTC(parsed.year, parsed.month - 1, parsed.day)) : null;
}

function parseDateParts(value: string): { year: number; month: number; day: number } | null {
  const dateOnly = value.split(/\s+/)[0];
  const slashMatch = dateOnly.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/);
  if (slashMatch) {
    const day = Number(slashMatch[1]);
    const month = Number(slashMatch[2]);
    const rawYear = Number(slashMatch[3]);
    return { day, month, year: rawYear < 100 ? 2000 + rawYear : rawYear };
  }

  const isoMatch = dateOnly.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (isoMatch) {
    return { year: Number(isoMatch[1]), month: Number(isoMatch[2]), day: Number(isoMatch[3]) };
  }

  return null;
}

function parseTime(value: string | undefined): Date | null {
  const normalized = text(value);
  if (!normalized) {
    return null;
  }
  const timeMatch = normalized.match(/(\d{1,2}):(\d{2})(?::(\d{2}))?/);
  if (!timeMatch) {
    return null;
  }
  return new Date(Date.UTC(1970, 0, 1, Number(timeMatch[1]), Number(timeMatch[2]), Number(timeMatch[3] ?? "0")));
}

function mapServiceReportStatus(value: string | undefined): ServiceReportStatus {
  const normalized = text(value)?.toLowerCase();
  if (!normalized) {
    return ServiceReportStatus.UNKNOWN;
  }
  if (normalized.includes("חתום") || normalized.includes("signed")) {
    return ServiceReportStatus.SIGNED;
  }
  if (normalized.includes("נשלח") || normalized.includes("sent")) {
    return ServiceReportStatus.SENT;
  }
  if (normalized.includes("סגור") || normalized.includes("closed")) {
    return ServiceReportStatus.CLOSED;
  }
  if (normalized.includes("בוטל") || normalized.includes("cancel")) {
    return ServiceReportStatus.CANCELLED;
  }
  if (normalized.includes("פתוח") || normalized.includes("open")) {
    return ServiceReportStatus.OPEN;
  }
  if (normalized.includes("טיוט") || normalized.includes("draft")) {
    return ServiceReportStatus.DRAFT;
  }
  return ServiceReportStatus.UNKNOWN;
}

void main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
