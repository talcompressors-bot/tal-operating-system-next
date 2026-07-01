import { readdir, readFile, stat } from "fs/promises";
import path from "path";
import type {
  BusinessDocument,
  BusinessDocumentItem,
  Customer,
  PartUsed,
  Prisma,
  Product,
  ReportEquipmentItem,
  ServiceReport,
} from "@prisma/client";
import { prisma } from "./prisma";
import { manufacturerPartRegistryRows } from "./manufacturer-parts-registry";

export type KnowledgeSourceType =
  | "prisma"
  | "csv"
  | "excel"
  | "google_sheets"
  | "json_fixture"
  | "markdown"
  | "technical_catalog"
  | "pdf"
  | "image";

export type KnowledgeAuthorityLevel = 1 | 2 | 3 | 4;

export type KnowledgeQuery = {
  text?: string;
  providerIds?: string[];
  sourceTypes?: KnowledgeSourceType[];
  entityTypes?: string[];
  filters?: Record<string, unknown>;
  limit?: number;
};

export type KnowledgeEvidence = {
  id: string;
  providerId: string;
  sourceType: KnowledgeSourceType;
  sourceName: string;
  entityType: string;
  title: string;
  summary: string;
  authorityLevel: KnowledgeAuthorityLevel;
  score: number;
  data: unknown;
  trace: {
    location: string;
    matchedFields: string[];
  };
  status: {
    exists: boolean;
    parsed: boolean;
    indexed: boolean;
    runtimeSearchable: boolean;
    usedByTalIntelligenceCore: boolean;
  };
  dataQualityGaps: string[];
};

export type BusinessKnowledgeProvider = {
  id: string;
  sourceType: KnowledgeSourceType;
  search(query: KnowledgeQuery): Promise<KnowledgeEvidence[]>;
};

export type EquipmentServiceReportKnowledge = Pick<
  ServiceReport,
  | "appsheetReportId"
  | "reportCounter"
  | "reportNumberText"
  | "serviceDate"
  | "technicianName"
  | "reportType"
  | "serviceType"
  | "serviceDescription"
  | "workPerformed"
  | "technicianSummary"
  | "recommendations"
  | "status"
  | "sourceStatusText"
  | "rawSource"
> & {
  customer: Pick<Customer, "appsheetCustomerId" | "name"> | null;
  businessDocuments: Array<
    Pick<
      BusinessDocument,
      | "appsheetBusinessDocumentId"
      | "draftTitle"
      | "documentTypeSelected"
      | "status"
      | "approvalStatus"
      | "totalAmount"
      | "currency"
      | "description"
    > & {
      items: Array<
        Pick<
          BusinessDocumentItem,
          | "itemName"
          | "description"
          | "quantity"
          | "unitPrice"
          | "totalPrice"
          | "source"
          | "needsPriceApproval"
          | "matchConfidence"
        >
      >;
    }
  >;
  partsUsed: Array<
    Pick<
      PartUsed,
      | "partName"
      | "partSku"
      | "quantity"
      | "equipmentReference"
      | "matchSource"
      | "matchConfidence"
      | "needsUserApproval"
    > & {
      product: Pick<
        Product,
        "name" | "category" | "subcategory" | "compatibleEquipment"
      > | null;
    }
  >;
};

export type EquipmentKnowledgeRecord = Pick<
  ReportEquipmentItem,
  | "appsheetItemId"
  | "sourceReportId"
  | "reportCounter"
  | "equipmentNumber"
  | "equipmentType"
  | "equipmentSubtype"
  | "equipmentModel"
  | "serialNumber"
  | "compressorCategory"
  | "serviceDescription"
  | "currentHours"
  | "nextService"
  | "systemStatus"
  | "technicianRecommendations"
> & {
  serviceReport: EquipmentServiceReportKnowledge | null;
};

export type AssetKnowledgeContext = {
  current: EquipmentKnowledgeRecord;
  related: EquipmentKnowledgeRecord[];
  evidence: KnowledgeEvidence[];
};

export type EquipmentKnowledgeFilters = {
  query?: string;
  type?: string;
  status?: string;
  linked?: boolean;
};

const equipmentSelect = {
  appsheetItemId: true,
  sourceReportId: true,
  reportCounter: true,
  equipmentNumber: true,
  equipmentType: true,
  equipmentSubtype: true,
  equipmentModel: true,
  serialNumber: true,
  compressorCategory: true,
  serviceDescription: true,
  currentHours: true,
  nextService: true,
  systemStatus: true,
  technicianRecommendations: true,
  serviceReport: {
    select: {
      appsheetReportId: true,
      reportCounter: true,
      reportNumberText: true,
      serviceDate: true,
      technicianName: true,
      reportType: true,
      serviceType: true,
      serviceDescription: true,
      workPerformed: true,
      technicianSummary: true,
      recommendations: true,
      status: true,
      sourceStatusText: true,
      rawSource: true,
      customer: { select: { appsheetCustomerId: true, name: true } },
      businessDocuments: {
        orderBy: [{ createdAt: "desc" }, { appsheetBusinessDocumentId: "asc" }],
        select: {
          appsheetBusinessDocumentId: true,
          draftTitle: true,
          documentTypeSelected: true,
          status: true,
          approvalStatus: true,
          totalAmount: true,
          currency: true,
          description: true,
          items: {
            orderBy: [{ createdAt: "asc" }, { itemName: "asc" }],
            select: {
              itemName: true,
              description: true,
              quantity: true,
              unitPrice: true,
              totalPrice: true,
              source: true,
              needsPriceApproval: true,
              matchConfidence: true,
            },
          },
        },
      },
      partsUsed: {
        orderBy: [{ createdAt: "asc" }, { partName: "asc" }],
        select: {
          partName: true,
          partSku: true,
          quantity: true,
          equipmentReference: true,
          matchSource: true,
          matchConfidence: true,
          needsUserApproval: true,
          product: {
            select: {
              name: true,
              category: true,
              subcategory: true,
              compatibleEquipment: true,
            },
          },
        },
      },
    },
  },
} satisfies Prisma.ReportEquipmentItemSelect;

function readSearchText(value: unknown) {
  if (value === undefined || value === null) {
    return "";
  }

  return String(value).trim();
}

function hasSearchValue(value: unknown) {
  const text = readSearchText(value).toLowerCase();

  return Boolean(text) && !text.startsWith("no ");
}

function normalizeSearchIdentity(value: unknown) {
  return readSearchText(value).toLowerCase().replace(/[^a-z0-9\u0590-\u05ff]/g, "");
}

function buildEquipmentWhere(filters: EquipmentKnowledgeFilters) {
  const andFilters: Prisma.ReportEquipmentItemWhereInput[] = [];

  if (filters.query) {
    const query = filters.query;

    andFilters.push({
      OR: [
        { appsheetItemId: { contains: query, mode: "insensitive" } },
        { equipmentNumber: { contains: query, mode: "insensitive" } },
        { equipmentType: { contains: query, mode: "insensitive" } },
        { equipmentSubtype: { contains: query, mode: "insensitive" } },
        { equipmentModel: { contains: query, mode: "insensitive" } },
        { serialNumber: { contains: query, mode: "insensitive" } },
        { compressorCategory: { contains: query, mode: "insensitive" } },
        { systemStatus: { contains: query, mode: "insensitive" } },
        { sourceReportId: { contains: query, mode: "insensitive" } },
        { reportCounter: { contains: query, mode: "insensitive" } },
      ],
    });
  }

  if (filters.type) {
    andFilters.push({
      equipmentType: { contains: filters.type, mode: "insensitive" },
    });
  }

  if (filters.status) {
    andFilters.push({
      systemStatus: { contains: filters.status, mode: "insensitive" },
    });
  }

  if (filters.linked === true) {
    andFilters.push({ serviceReportId: { not: null } });
  }

  if (filters.linked === false) {
    andFilters.push({ serviceReportId: null });
  }

  return andFilters.length ? { AND: andFilters } : undefined;
}

function buildRelatedEquipmentWhere(
  item: EquipmentKnowledgeRecord,
): Prisma.ReportEquipmentItemWhereInput | undefined {
  const orFilters: Prisma.ReportEquipmentItemWhereInput[] = [];

  if (hasSearchValue(item.serialNumber)) {
    orFilters.push({ serialNumber: item.serialNumber });
  }

  if (hasSearchValue(item.equipmentNumber)) {
    orFilters.push({ equipmentNumber: item.equipmentNumber });
  }

  if (hasSearchValue(item.equipmentModel)) {
    orFilters.push({ equipmentModel: item.equipmentModel });
  }

  return orFilters.length ? { OR: orFilters } : undefined;
}

function equipmentTitle(item: EquipmentKnowledgeRecord) {
  return [
    item.equipmentModel,
    item.serialNumber,
    item.equipmentNumber,
    item.serviceReport?.reportCounter,
  ]
    .map(readSearchText)
    .filter(Boolean)
    .join(" / ");
}

function equipmentSummary(item: EquipmentKnowledgeRecord) {
  return [
    item.serviceDescription,
    item.technicianRecommendations,
    item.serviceReport?.serviceDescription,
    item.serviceReport?.workPerformed,
    item.serviceReport?.recommendations,
  ]
    .map(readSearchText)
    .filter(Boolean)
    .slice(0, 3)
    .join(" | ");
}

function buildEquipmentEvidence(
  providerId: string,
  item: EquipmentKnowledgeRecord,
  entityType: string,
  score: number,
): KnowledgeEvidence {
  const gaps = [];

  if (!hasSearchValue(item.serialNumber)) {
    gaps.push("Missing serial number.");
  }

  if (!hasSearchValue(item.equipmentModel)) {
    gaps.push("Missing equipment model.");
  }

  if (!item.serviceReport) {
    gaps.push("No linked ServiceReport.");
  }

  return {
    id: `${providerId}:${entityType}:${item.appsheetItemId}`,
    providerId,
    sourceType: "prisma",
    sourceName: "Supabase PostgreSQL / Prisma",
    entityType,
    title: equipmentTitle(item) || item.appsheetItemId,
    summary: equipmentSummary(item) || "Equipment row evidence.",
    authorityLevel: 3,
    score,
    data: item,
    trace: {
      location: `report_equipment_items.appsheet_item_id=${item.appsheetItemId}`,
      matchedFields: [
        "appsheetItemId",
        "serialNumber",
        "equipmentNumber",
        "equipmentModel",
      ],
    },
    status: {
      exists: true,
      parsed: true,
      indexed: true,
      runtimeSearchable: true,
      usedByTalIntelligenceCore: true,
    },
    dataQualityGaps: gaps,
  };
}

function queryMatchesProvider(
  provider: BusinessKnowledgeProvider,
  query: KnowledgeQuery,
) {
  return (
    (!query.providerIds || query.providerIds.includes(provider.id)) &&
    (!query.sourceTypes || query.sourceTypes.includes(provider.sourceType))
  );
}

class PrismaKnowledgeProvider implements BusinessKnowledgeProvider {
  id = "prisma";
  sourceType = "prisma" as const;

  async search(query: KnowledgeQuery): Promise<KnowledgeEvidence[]> {
    const entityTypes = query.entityTypes ?? [];

    if (entityTypes.includes("equipment-list")) {
      const filters = (query.filters ?? {}) as EquipmentKnowledgeFilters;
      const equipment = await prisma.reportEquipmentItem.findMany({
        where: buildEquipmentWhere(filters),
        select: equipmentSelect,
        orderBy: [
          { equipmentNumber: "asc" },
          { equipmentModel: "asc" },
          { appsheetItemId: "asc" },
        ],
        take: query.limit,
      });

      return equipment.map((item) =>
        buildEquipmentEvidence(this.id, item, "equipment", 80),
      );
    }

    if (entityTypes.includes("equipment") && query.filters?.appsheetItemId) {
      const item = await prisma.reportEquipmentItem.findUnique({
        where: { appsheetItemId: String(query.filters.appsheetItemId) },
        select: equipmentSelect,
      });

      return item ? [buildEquipmentEvidence(this.id, item, "equipment", 100)] : [];
    }

    if (entityTypes.includes("equipment-history") && query.filters?.equipment) {
      const item = query.filters.equipment as EquipmentKnowledgeRecord;
      const relatedWhere = buildRelatedEquipmentWhere(item);
      const relatedItems = relatedWhere
        ? await prisma.reportEquipmentItem.findMany({
            where: relatedWhere,
            select: equipmentSelect,
            orderBy: [
              { serviceReport: { serviceDate: "desc" } },
              { reportCounter: "desc" },
              { appsheetItemId: "asc" },
            ],
            take: query.limit,
          })
        : [item];

      return relatedItems.map((related) => {
        const sameSerial =
          normalizeSearchIdentity(item.serialNumber) &&
          normalizeSearchIdentity(item.serialNumber) ===
            normalizeSearchIdentity(related.serialNumber);
        const score = item.appsheetItemId === related.appsheetItemId
          ? 100
          : sameSerial
            ? 95
            : 75;

        return buildEquipmentEvidence(this.id, related, "equipment-history", score);
      });
    }

    return [];
  }
}

function parseCsvRows(text: string) {
  const rows: string[][] = [];
  let current = "";
  let row: string[] = [];
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '"' && quoted && next === '"') {
      current += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      quoted = !quoted;
      continue;
    }

    if (char === "," && !quoted) {
      row.push(current);
      current = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") {
        index += 1;
      }
      row.push(current);
      rows.push(row);
      row = [];
      current = "";
      continue;
    }

    current += char;
  }

  if (current || row.length) {
    row.push(current);
    rows.push(row);
  }

  const [headers = [], ...dataRows] = rows;

  return dataRows.map((values) =>
    Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""])),
  );
}

class CsvKnowledgeProvider implements BusinessKnowledgeProvider {
  id = "csv";
  sourceType = "csv" as const;

  private readonly files = [
    {
      name: "Customers_Final",
      entityType: "customer",
      location: "data-sources/exports/Customers_Final.csv",
    },
    {
      name: "ServiceReports",
      entityType: "service-report",
      location: "data-sources/exports/ServiceReports.csv",
    },
    {
      name: "ReportEquipmentItems",
      entityType: "equipment",
      location: "data-sources/exports/ReportEquipmentItems.csv",
    },
  ];

  async search(query: KnowledgeQuery): Promise<KnowledgeEvidence[]> {
    const text = query.text?.toLowerCase().trim();

    if (!text) {
      return [];
    }

    const evidence: KnowledgeEvidence[] = [];

    for (const file of this.files) {
      if (query.entityTypes && !query.entityTypes.includes(file.entityType)) {
        continue;
      }

      const location = path.join(process.cwd(), file.location);
      const rows = parseCsvRows(await readFile(location, "utf8"));

      rows.slice(0, 5000).forEach((row, index) => {
        const haystack = Object.values(row).join(" ").toLowerCase();

        if (!haystack.includes(text)) {
          return;
        }

        evidence.push({
          id: `${this.id}:${file.name}:${index + 2}`,
          providerId: this.id,
          sourceType: this.sourceType,
          sourceName: file.name,
          entityType: file.entityType,
          title: `${file.name} row ${index + 2}`,
          summary: Object.values(row).filter(Boolean).slice(0, 5).join(" | "),
          authorityLevel: 3,
          score: 65,
          data: row,
          trace: {
            location: `${file.location}:${index + 2}`,
            matchedFields: Object.entries(row)
              .filter(([, value]) => String(value).toLowerCase().includes(text))
              .map(([key]) => key),
          },
          status: {
            exists: true,
            parsed: true,
            indexed: false,
            runtimeSearchable: true,
            usedByTalIntelligenceCore: false,
          },
          dataQualityGaps: ["CSV evidence is a local export snapshot, not live source state."],
        });
      });
    }

    return evidence.slice(0, query.limit ?? 20);
  }
}

class ManufacturerJsonKnowledgeProvider implements BusinessKnowledgeProvider {
  id = "manufacturer-json-fixtures";
  sourceType = "json_fixture" as const;

  async search(query: KnowledgeQuery): Promise<KnowledgeEvidence[]> {
    const text = query.text?.toLowerCase().trim();

    if (!text) {
      return [];
    }

    return manufacturerPartRegistryRows
      .filter((row) =>
        [
          row.model,
          row.normalizedModel,
          row.partCategory,
          row.manufacturerSku,
          row.manufacturerPartName,
          row.englishDescription,
          row.sourceSheet,
        ]
          .join(" ")
          .toLowerCase()
          .includes(text),
      )
      .slice(0, query.limit ?? 20)
      .map((row) => ({
        id: `${this.id}:${row.sourceSheet}:${row.sourceRow}:${row.manufacturerSku}`,
        providerId: this.id,
        sourceType: this.sourceType,
        sourceName: "Manufacturer Parts Registry Fixture",
        entityType: "official-model-parts-catalog",
        title: `${row.model} ${row.partCategory} ${row.manufacturerSku}`,
        summary: row.manufacturerPartName,
        authorityLevel: 1,
        score: 95,
        data: row,
        trace: {
          location: `${row.sourceFile} / ${row.sourceSheet} / row ${row.sourceRow}`,
          matchedFields: [
            "model",
            "partCategory",
            "manufacturerSku",
            "manufacturerPartName",
          ],
        },
        status: {
          exists: true,
          parsed: true,
          indexed: true,
          runtimeSearchable: true,
          usedByTalIntelligenceCore: true,
        },
        dataQualityGaps: row.reviewStatus.includes("REVIEW")
          ? ["Registry row is available but still carries review status."]
          : [],
      }));
  }
}

async function listFiles(root: string, extensions: string[]) {
  const results: string[] = [];

  async function visit(directory: string) {
    const entries = await readdir(directory, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        await visit(fullPath);
      } else if (extensions.includes(path.extname(entry.name).toLowerCase())) {
        results.push(fullPath);
      }
    }
  }

  await visit(root);
  return results;
}

class MarkdownKnowledgeProvider implements BusinessKnowledgeProvider {
  id = "markdown-knowledge";
  sourceType = "markdown" as const;

  async search(query: KnowledgeQuery): Promise<KnowledgeEvidence[]> {
    const text = query.text?.toLowerCase().trim();

    if (!text) {
      return [];
    }

    const rootMarkdownFiles = (await readdir(process.cwd(), { withFileTypes: true }))
      .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
      .map((entry) => path.join(process.cwd(), entry.name));
    const files = [
      ...(await listFiles(path.join(process.cwd(), "project-brain"), [".md"])),
      ...rootMarkdownFiles,
    ];
    const evidence: KnowledgeEvidence[] = [];
    const seen = new Set<string>();

    for (const file of files) {
      if (seen.has(file)) {
        continue;
      }
      seen.add(file);

      const content = await readFile(file, "utf8");
      const lowerContent = content.toLowerCase();
      const matchIndex = lowerContent.indexOf(text);

      if (matchIndex === -1) {
        continue;
      }

      const relative = path.relative(process.cwd(), file);
      const snippet = content
        .slice(Math.max(0, matchIndex - 120), matchIndex + 240)
        .replace(/\s+/g, " ")
        .trim();

      evidence.push({
        id: `${this.id}:${relative}`,
        providerId: this.id,
        sourceType: this.sourceType,
        sourceName: "Project Markdown Knowledge",
        entityType: "project-knowledge",
        title: relative,
        summary: snippet,
        authorityLevel: relative.includes("TAL_INTELLIGENCE_CORE") ? 1 : 3,
        score: relative.includes("project-brain") ? 70 : 55,
        data: { path: relative, snippet },
        trace: {
          location: relative,
          matchedFields: ["content"],
        },
        status: {
          exists: true,
          parsed: true,
          indexed: false,
          runtimeSearchable: true,
          usedByTalIntelligenceCore: false,
        },
        dataQualityGaps: [
          "Markdown evidence is searchable at runtime but not yet normalized into structured business entities.",
        ],
      });
    }

    return evidence.slice(0, query.limit ?? 20);
  }
}

class GoogleSheetsRegistryKnowledgeProvider implements BusinessKnowledgeProvider {
  id = "google-sheets-registry";
  sourceType = "google_sheets" as const;

  async search(query: KnowledgeQuery): Promise<KnowledgeEvidence[]> {
    const text = query.text?.toLowerCase().trim();

    if (!text) {
      return [];
    }

    const location = "data-sources/tools/SHEETS_REGISTRY.md";
    const content = await readFile(path.join(process.cwd(), location), "utf8");
    const sections = content.split(/\n### /g);

    const evidence: KnowledgeEvidence[] = [];

    sections.forEach((section, index) => {
      const normalized = section.toLowerCase();

      if (!normalized.includes(text)) {
        return;
      }

      const title = index === 0
        ? "Sheets Registry Summary"
        : section.split(/\r?\n/, 1)[0]?.trim() ?? "Sheet registry section";
      const summary = section.replace(/\s+/g, " ").slice(0, 320);

      evidence.push({
        id: `${this.id}:${title}`,
        providerId: this.id,
        sourceType: this.sourceType,
        sourceName: "Google Sheets Registry",
        entityType: "google-sheet-source",
        title,
        summary,
        authorityLevel: 3,
        score: 60,
        data: { title, registryPath: location },
        trace: {
          location,
          matchedFields: ["sheet registry section"],
        },
        status: {
          exists: true,
          parsed: true,
          indexed: false,
          runtimeSearchable: true,
          usedByTalIntelligenceCore: false,
        },
        dataQualityGaps: [
          "Google Sheets source is registry-searchable only; live sheet rows require approved connector/export access.",
        ],
      });
    });

    return evidence.slice(0, query.limit ?? 20);
  }
}

class FileMetadataKnowledgeProvider implements BusinessKnowledgeProvider {
  id: string;
  sourceType: KnowledgeSourceType;

  constructor(
    id: string,
    sourceType: KnowledgeSourceType,
    private readonly root: string,
    private readonly extensions: string[],
    private readonly entityType: string,
    private readonly parserGap: string,
  ) {
    this.id = id;
    this.sourceType = sourceType;
  }

  async search(query: KnowledgeQuery): Promise<KnowledgeEvidence[]> {
    const text = query.text?.toLowerCase().trim() ?? "";
    const root = path.join(process.cwd(), this.root);
    const files = await listFiles(root, this.extensions);
    const evidence: KnowledgeEvidence[] = [];

    for (const file of files) {
      const relative = path.relative(process.cwd(), file);
      const fileStat = await stat(file);

      if (text && !relative.toLowerCase().includes(text)) {
        continue;
      }

      evidence.push({
        id: `${this.id}:${relative}`,
        providerId: this.id,
        sourceType: this.sourceType,
        sourceName: this.sourceType,
        entityType: this.entityType,
        title: relative,
        summary: `${relative} exists in the project (${fileStat.size} bytes).`,
        authorityLevel: this.sourceType === "excel" ? 1 : 3,
        score: 40,
        data: { path: relative, size: fileStat.size },
        trace: {
          location: relative,
          matchedFields: ["path"],
        },
        status: {
          exists: true,
          parsed: false,
          indexed: false,
          runtimeSearchable: true,
          usedByTalIntelligenceCore: false,
        },
        dataQualityGaps: [this.parserGap],
      });
    }

    return evidence.slice(0, query.limit ?? 20);
  }
}

export class BusinessKnowledgeEngine {
  constructor(private readonly providers: BusinessKnowledgeProvider[]) {}

  async search(query: KnowledgeQuery): Promise<KnowledgeEvidence[]> {
    const results = await Promise.all(
      this.providers
        .filter((provider) => queryMatchesProvider(provider, query))
        .map((provider) => provider.search(query)),
    );

    return results
      .flat()
      .sort((left, right) => {
        if (left.authorityLevel !== right.authorityLevel) {
          return left.authorityLevel - right.authorityLevel;
        }

        return right.score - left.score;
      })
      .slice(0, query.limit ?? 50);
  }

  async searchEquipmentList(filters: EquipmentKnowledgeFilters) {
    const evidence = await this.search({
      providerIds: ["prisma"],
      entityTypes: ["equipment-list"],
      filters,
      limit: 500,
    });

    return evidence.map((item) => item.data as EquipmentKnowledgeRecord);
  }

  async getAssetKnowledgeContext(id: string): Promise<AssetKnowledgeContext | null> {
    const currentEvidence = await this.search({
      providerIds: ["prisma"],
      entityTypes: ["equipment"],
      filters: { appsheetItemId: id },
      limit: 1,
    });
    const current = currentEvidence[0]?.data as EquipmentKnowledgeRecord | undefined;

    if (!current) {
      return null;
    }

    const relatedEvidence = await this.search({
      providerIds: ["prisma"],
      entityTypes: ["equipment-history"],
      filters: { equipment: current },
      limit: 50,
    });

    return {
      current,
      related: relatedEvidence.map((item) => item.data as EquipmentKnowledgeRecord),
      evidence: [...currentEvidence, ...relatedEvidence],
    };
  }
}

let singleton: BusinessKnowledgeEngine | null = null;

export function getBusinessKnowledgeEngine() {
  singleton ??= new BusinessKnowledgeEngine([
    new PrismaKnowledgeProvider(),
    new GoogleSheetsRegistryKnowledgeProvider(),
    new CsvKnowledgeProvider(),
    new ManufacturerJsonKnowledgeProvider(),
    new MarkdownKnowledgeProvider(),
    new FileMetadataKnowledgeProvider(
      "excel-catalog-files",
      "excel",
      "data-sources",
      [".xls", ".xlsx"],
      "technical-catalog",
      "Excel workbook exists, but direct workbook parsing is not enabled in runtime without an approved parser/conversion path.",
    ),
    new FileMetadataKnowledgeProvider(
      "pdf-files",
      "pdf",
      "project-brain",
      [".pdf"],
      "business-document-pdf",
      "PDF file exists, but text extraction/OCR is not enabled in the runtime knowledge engine yet.",
    ),
    new FileMetadataKnowledgeProvider(
      "image-files",
      "image",
      "project-brain",
      [".png", ".jpg", ".jpeg", ".webp"],
      "image-evidence",
      "Image file exists, but OCR/vision extraction is future-only and not enabled in the runtime knowledge engine yet.",
    ),
  ]);

  return singleton;
}
