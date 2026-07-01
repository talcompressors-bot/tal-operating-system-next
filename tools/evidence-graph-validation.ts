import {
  BusinessKnowledgeEngine,
  type BusinessKnowledgeProvider,
  evaluateEvidenceGraphRecommendationGate,
  getBusinessKnowledgeEngine,
  type KnowledgeEvidence,
  type KnowledgeGraph,
  validateKnowledgeGraph,
} from "../lib/business-knowledge-engine";

function assertCondition(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function baseEvidence(overrides: Partial<KnowledgeEvidence>): KnowledgeEvidence {
  return {
    id: "fixture:base",
    providerId: "fixture",
    sourceType: "prisma",
    sourceName: "Fixture",
    entityType: "source-document",
    title: "Fixture evidence",
    summary: "Fixture evidence",
    authorityLevel: 3,
    score: 50,
    data: {},
    trace: {
      location: "fixture",
      matchedFields: ["fixture"],
    },
    status: {
      exists: true,
      parsed: true,
      indexed: true,
      runtimeSearchable: true,
      usedByTalIntelligenceCore: true,
    },
    dataQualityGaps: [],
    ...overrides,
  };
}

function buildKnownFixtureEvidence() {
  const equipmentEvidence = baseEvidence({
    id: "fixture:equipment:asset-1",
    providerId: "fixture-prisma",
    sourceType: "prisma",
    sourceName: "Fixture Prisma",
    entityType: "equipment",
    title: "SCR 30XA / SN-100 / EQ-7 / 5802",
    summary: "Known fixture equipment evidence.",
    authorityLevel: 3,
    score: 100,
    data: {
      appsheetItemId: "asset-1",
      sourceReportId: "9981b978",
      reportCounter: "5802",
      equipmentNumber: "EQ-7",
      equipmentType: "Compressor",
      equipmentSubtype: "Screw",
      equipmentModel: "SCR 30XA",
      serialNumber: "SN-100",
      compressorCategory: "SCR",
      serviceDescription: "Temperature sensor replaced.",
      currentHours: "4100",
      nextService: "4500",
      systemStatus: "Working",
      technicianRecommendations: "Preventive separator check.",
      serviceReport: {
        appsheetReportId: "9981b978",
        reportCounter: 5802,
        reportNumberText: "5802",
        serviceDate: new Date("2026-06-01T00:00:00.000Z"),
        technicianName: "David",
        reportType: "Service",
        serviceType: "Repair",
        serviceDescription: "Overheating and temperature fault.",
        workPerformed: "Replaced temperature sensor.",
        technicianSummary: "Compressor restored.",
        recommendations: "Schedule preventive maintenance.",
        status: "SIGNED",
        sourceStatusText: "Signed",
        rawSource: {},
        customer: {
          appsheetCustomerId: "customer-x",
          name: "Customer X",
        },
        businessDocuments: [
          {
            appsheetBusinessDocumentId: "BD-1",
            draftTitle: "Repair quote",
            documentTypeSelected: "QUOTE",
            status: "APPROVED",
            approvalStatus: "APPROVED",
            totalAmount: "650",
            currency: "ILS",
            description: "Approved repair quote.",
            items: [
              {
                itemName: "Temperature sensor",
                description: "SCR 30XA temperature sensor",
                quantity: "1",
                unitPrice: "350",
                totalPrice: "350",
                source: "SAME_EQUIPMENT_HISTORY",
                needsPriceApproval: false,
                matchConfidence: 92,
              },
            ],
          },
        ],
        partsUsed: [
          {
            partName: "Temperature sensor",
            partSku: "TS-30XA",
            quantity: "1",
            equipmentReference: "EQ-7",
            matchSource: "PRODUCTS_CATALOG",
            matchConfidence: 88,
            needsUserApproval: false,
            product: {
              name: "SCR 30XA temperature sensor",
              category: "Sensor",
              subcategory: "Temperature",
              compatibleEquipment: "SCR 30XA",
            },
          },
        ],
      },
    },
  });

  const officialCatalogEvidence = baseEvidence({
    id: "fixture:official:scr30xa:TS-30XA",
    providerId: "fixture-official",
    sourceType: "json_fixture",
    sourceName: "Official Model Parts Catalog Fixture",
    entityType: "official-model-parts-catalog",
    title: "SCR 30XA Temperature sensor TS-30XA",
    summary: "Official temperature sensor row.",
    authorityLevel: 1,
    score: 95,
    data: {
      model: "SCR 30XA",
      normalizedModel: "SCR30XA",
      partCategory: "Temperature sensor",
      manufacturerSku: "TS-30XA",
      manufacturerPartName: "Temperature sensor",
      sourceSheet: "SCR",
    },
  });

  const csvEquipmentEvidence = baseEvidence({
    id: "fixture:csv:equipment:2",
    providerId: "fixture-csv",
    sourceType: "csv",
    sourceName: "ReportEquipmentItems",
    entityType: "equipment",
    title: "ReportEquipmentItems row 2",
    summary: "CSV equipment snapshot.",
    authorityLevel: 3,
    score: 65,
    data: {
      ItemID: "asset-1",
      EquipmentNumber: "EQ-7",
      EquipmentModel: "SCR 30XA",
      SerialNumber: "SN-100",
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

  const negativeEquipmentEvidence = baseEvidence({
    id: "fixture:equipment:missing-model",
    providerId: "fixture-prisma",
    sourceType: "prisma",
    sourceName: "Fixture Prisma",
    entityType: "equipment",
    title: "Missing model equipment",
    summary: "Negative fixture equipment evidence.",
    authorityLevel: 3,
    score: 80,
    data: {
      appsheetItemId: "asset-missing-model",
      sourceReportId: "negative-report",
      reportCounter: "9999",
      equipmentNumber: "EQ-MISSING",
      equipmentType: "Compressor",
      equipmentSubtype: "Screw",
      equipmentModel: "",
      serialNumber: "",
      compressorCategory: "",
      serviceDescription: "",
      currentHours: null,
      nextService: "",
      systemStatus: "",
      technicianRecommendations: "",
      serviceReport: null,
    },
    dataQualityGaps: ["Missing serial number.", "Missing equipment model."],
  });

  return [
    equipmentEvidence,
    officialCatalogEvidence,
    csvEquipmentEvidence,
    negativeEquipmentEvidence,
  ];
}

function findNode(graph: KnowledgeGraph, type: string, labelIncludes: string) {
  return graph.nodes.find(
    (node) =>
      node.type === type &&
      `${node.label} ${node.identity}`.toLowerCase().includes(labelIncludes.toLowerCase()),
  );
}

function assertEdge(graph: KnowledgeGraph, type: string) {
  assertCondition(
    graph.edges.some((edge) => edge.type === type),
    `Expected graph edge ${type}`,
  );
}

class FixtureProvider implements BusinessKnowledgeProvider {
  id = "fixture-provider";
  sourceType = "prisma" as const;

  constructor(private readonly evidence: KnowledgeEvidence[]) {}

  async search() {
    return this.evidence;
  }
}

async function validateFixtureCorrelation() {
  const evidence = buildKnownFixtureEvidence();
  const engine = new BusinessKnowledgeEngine([new FixtureProvider(evidence)]);
  const graph = engine.correlateEvidence(evidence);
  const validation = validateKnowledgeGraph(graph);

  assertCondition(validation.passed, `Graph contract validation failed: ${JSON.stringify(validation.errors)}`);
  assertCondition(findNode(graph, "customer", "Customer X"), "Expected customer node.");
  assertCondition(findNode(graph, "equipment", "SCR 30XA"), "Expected equipment node.");
  assertCondition(findNode(graph, "equipment-model", "SCR 30XA"), "Expected equipment model node.");
  assertCondition(findNode(graph, "equipment-series", "SCR"), "Expected equipment series node.");
  assertCondition(findNode(graph, "service-report", "5802"), "Expected service report node.");
  assertCondition(findNode(graph, "business-document", "Repair quote"), "Expected business document node.");
  assertCondition(findNode(graph, "business-document-item", "Temperature sensor"), "Expected document item node.");
  assertCondition(findNode(graph, "part-used", "Temperature sensor"), "Expected parts used node.");
  assertCondition(findNode(graph, "products-catalog", "SCR 30XA temperature sensor"), "Expected product node.");
  assertCondition(findNode(graph, "official-model-parts-catalog", "TS-30XA"), "Expected official catalog node.");

  assertEdge(graph, "CUSTOMER_HAS_EQUIPMENT");
  assertEdge(graph, "CUSTOMER_HAS_SERVICE_REPORT");
  assertEdge(graph, "EQUIPMENT_HAS_MODEL");
  assertEdge(graph, "EQUIPMENT_BELONGS_TO_SERIES");
  assertEdge(graph, "EQUIPMENT_APPEARS_IN_SERVICE_REPORT");
  assertEdge(graph, "SERVICE_REPORT_HAS_BUSINESS_DOCUMENT");
  assertEdge(graph, "BUSINESS_DOCUMENT_HAS_ITEM");
  assertEdge(graph, "BUSINESS_DOCUMENT_ITEM_HAS_PRICING_HISTORY");
  assertEdge(graph, "SERVICE_REPORT_USED_PART");
  assertEdge(graph, "PART_USED_REFERENCES_PRODUCT");
  assertEdge(graph, "EQUIPMENT_MODEL_HAS_OFFICIAL_PART");
  assertEdge(graph, "SUPPLIER_PROVIDES_PART");

  const modelNode = findNode(graph, "equipment-model", "SCR 30XA");
  assertCondition(modelNode?.authorityLevel === 1, "Official catalog authority should strengthen merged model node.");
  assertCondition(
    graph.dataQualityGaps.some((gap) => gap.includes("Missing equipment model")),
    "Expected negative missing-model gap.",
  );
  assertCondition(
    graph.dataQualityGaps.some((gap) => gap.includes("CSV evidence is a local export snapshot")),
    "Expected CSV snapshot gap.",
  );

  const gate = evaluateEvidenceGraphRecommendationGate({
    graph,
    businessObjective: "Validate graph before recommendation consumers.",
    requiredNodeTypes: ["customer", "equipment", "service-report", "business-document"],
    requiredRelationshipTypes: [
      "CUSTOMER_HAS_EQUIPMENT",
      "SERVICE_REPORT_HAS_BUSINESS_DOCUMENT",
      "BUSINESS_DOCUMENT_HAS_ITEM",
    ],
    requiredSourceTypes: ["prisma", "json_fixture"],
  });

  assertCondition(gate.allowed, `Recommendation gate should allow complete fixture graph: ${gate.blockers.join("; ")}`);
  assertCondition(
    gate.missingEvidenceSources.length > 0,
    "Recommendation gate must list data-quality gaps even when allowing use.",
  );

  const blockedGate = evaluateEvidenceGraphRecommendationGate({
    graph,
    businessObjective: "Block incomplete recommendation graph.",
    requiredNodeTypes: ["inventory"],
    requiredRelationshipTypes: ["PRODUCT_HAS_INVENTORY"],
    requiredSourceTypes: ["excel"],
  });

  assertCondition(!blockedGate.allowed, "Recommendation gate should block missing required graph coverage.");
  assertCondition(
    blockedGate.missingEvidenceSources.some((source) => source.includes("excel")),
    "Blocked gate should list missing required evidence source.",
  );

  const builtGraph = await engine.buildEvidenceGraph({ entityTypes: ["equipment"], limit: 10 });
  const builtValidation = validateKnowledgeGraph(builtGraph);
  assertCondition(builtValidation.passed, "buildEvidenceGraph() should produce a valid graph.");

  return {
    fixtureNodes: graph.nodes.length,
    fixtureEdges: graph.edges.length,
    fixtureSources: graph.trace.sourcesSearched.length,
    fixtureGaps: graph.dataQualityGaps.length,
  };
}

async function validateRuntimeSmoke() {
  const graph = await getBusinessKnowledgeEngine().getAssetEvidenceGraph("bd479b2c");

  assertCondition(graph, "Runtime smoke graph for equipment bd479b2c was not found.");

  const validation = validateKnowledgeGraph(graph);
  assertCondition(
    validation.passed,
    `Runtime smoke graph contract validation failed: ${JSON.stringify(validation.errors)}`,
  );
  assertCondition(graph.nodes.length > 0, "Runtime smoke graph has no nodes.");
  assertCondition(graph.edges.length > 0, "Runtime smoke graph has no edges.");
  assertCondition(
    graph.trace.sourcesSearched.some((source) => source.includes("prisma")),
    "Runtime smoke graph should include Prisma evidence.",
  );

  const gate = evaluateEvidenceGraphRecommendationGate({
    graph,
    businessObjective: "Runtime smoke only; do not generate recommendations.",
    requiredNodeTypes: ["equipment", "service-report"],
    requiredRelationshipTypes: ["EQUIPMENT_APPEARS_IN_SERVICE_REPORT"],
    requiredSourceTypes: ["prisma"],
  });

  assertCondition(gate.allowed, `Runtime smoke recommendation gate failed: ${gate.blockers.join("; ")}`);

  return {
    runtimeNodes: graph.nodes.length,
    runtimeEdges: graph.edges.length,
    runtimeSources: graph.trace.sourcesSearched.length,
    runtimeGaps: graph.dataQualityGaps.length,
  };
}

async function main() {
  const fixture = await validateFixtureCorrelation();
  const runtime = await validateRuntimeSmoke();

  console.log(
    JSON.stringify(
      {
        status: "PASS",
        fixture,
        runtime,
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
