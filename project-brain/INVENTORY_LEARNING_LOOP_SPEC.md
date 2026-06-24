# Inventory Learning Loop Spec

Date: 2026-06-24
Mode: documentation only.
Runtime impact: none.

No code, DB write, Prisma change, import, inventory action, BusinessDocument creation, Maven/Invoice4U action, Apps Script change, Google Sheets change, or runtime workflow change is approved by this spec.

## Goal

Define how manufacturer part numbers and Tal internal inventory SKUs should improve over time through evidence-backed learning.

The inventory learning loop connects technical part identity, internal SKU identity, compatibility evidence, stock movement evidence, and Liad-approved corrections without allowing AI Draft or recommendations to change stock.

## 1. Core Identity Rules

| Concept | Meaning | Authority |
|---|---|---|
| Manufacturer part number | Technical part identity from manufacturer evidence | Manufacturer workbook / approved manufacturer evidence |
| Internal SKU | Tal inventory identity used for stock and operations | Tal inventory governance |
| Compatible compressor models | Evidence-backed model compatibility list | Manufacturer evidence, approved compatibility rules, Liad corrections |
| Quantity in stock | Current stock quantity | Approved stock movement, purchase receipt, or inventory transaction only |

Rules:

- Manufacturer part number is technical identity.
- Internal SKU is Tal inventory identity.
- One manufacturer part number may match multiple compressor models.
- One internal SKU may represent one manufacturer part number or an approved equivalent.
- Compatible models must be stored as evidence-backed mappings.
- Compatibility is not price evidence.
- Compatibility is not inventory quantity.
- Compatibility is not automatic AI Draft approval.

## 2. Learning Sources

The system should learn gradually from these sources, in this order:

1. SCR spare-parts workbooks.
2. Foreign purchase orders.
3. Received stock.
4. Invoice history.
5. Liad corrections.
6. Approved service-kit evidence.

Source meanings:

| Source | What it can teach | What it cannot approve alone |
|---|---|---|
| SCR spare-parts workbooks | Manufacturer part number, compatible models, technical category | Selling price, inventory quantity, BusinessDocument creation |
| Foreign purchase orders | Ordered manufacturer part, vendor/source evidence, cost evidence | Received quantity unless receipt confirms it |
| Received stock | Stock arrival evidence, candidate internal SKU enrichment | Stock deduction or customer price |
| Invoice history | Historical selling-price and service usage evidence | Manufacturer compatibility truth |
| Liad corrections | Approved learning and exception rules | Runtime implementation without separate approval |
| Approved service-kit evidence | Expected service lines and repeated package evidence | Inventory deduction or automatic document creation |

## 3. Inventory Item Enrichment Fields

Future inventory item records should be enriched with:

| Field | Purpose | Required evidence |
|---|---|---|
| `manufacturerPartNumber` | Technical manufacturer identity | Manufacturer workbook, purchase order, received-stock label, or Liad approval |
| `internalSku` | Tal inventory identity | Existing inventory SKU or approved new SKU governance |
| `compatibleCompressorModels` | Evidence-backed compatible models | Manufacturer registry, compatibility registry, or Liad-approved correction |
| `partCategory` | Air filter, oil filter, oil separator, oil/coolant, belt, valve, sensor, etc. | Manufacturer description, catalog, or approved correction |
| `serviceTypeRelevance` | Small service, large service, repair, installation, etc. | Service pattern registry or approved service-kit evidence |
| `quantityInStock` | Available inventory quantity | Approved stock movement, purchase receipt, or inventory transaction |
| `sourceOrderEvidence` | Purchase/order/receipt source | Foreign purchase order, receipt, supplier document, or inventory audit |
| `approvalStatus` | Review state | Liad approval, manufacturer evidence, or pending review |
| `learningSource` | How the row was learned | Workbook, PO, receipt, invoice history, Liad correction, service-kit evidence |
| `lastReviewedBy` | Human/system review owner | Liad or approved future review role |
| `needsSkuApproval` | SKU identity requires approval | True when mapping is inferred, generic, partial, or equivalent-based |
| `needsCompatibilityApproval` | Model compatibility requires approval | True when not manufacturer-backed or Liad-approved |
| `needsQuantityApproval` | Quantity is not approved | True unless stock movement evidence exists |

## 4. Learning Confidence

| Confidence | Meaning | Allowed use |
|---|---|---|
| `APPROVED_BY_LIAD` | Explicit Liad correction or approval | Strong evidence; still does not bypass write gates |
| `MANUFACTURER_EVIDENCE` | Manufacturer workbook or approved manufacturer source | Strong technical compatibility evidence |
| `PURCHASE_ORDER_EVIDENCE` | Ordered part evidence | Cost/source evidence; not stock quantity until received |
| `RECEIVED_STOCK_EVIDENCE` | Stock receipt evidence | Can support inventory quantity after approved transaction gate |
| `HISTORICAL_INVOICE_EVIDENCE` | Historical sale/service evidence | Pricing/usage support only |
| `SERVICE_KIT_EVIDENCE` | Approved service-kit or repeated package evidence | Service recommendation support only |
| `AI_INFERENCE` | Suggested mapping without approval | Review only; cannot auto-assign, deduct, or create documents |

## 5. Inventory Quantity Rule

Inventory quantity must only be updated from:

- approved stock movement
- approved purchase receipt
- approved inventory transaction

Inventory quantity must not be updated from:

- AI Draft
- pricing evidence
- manufacturer SKU evidence alone
- service report alone
- recommendation alone
- invoice history alone
- purchase order alone without received-stock evidence

## 6. AI Draft Boundary

AI Draft may suggest a part or internal SKU only as evidence.

AI Draft must not:

- deduct inventory
- create inventory movement
- create BusinessDocument automatically
- create Maven/Invoice4U document
- treat manufacturer cost as selling price
- treat generic model identity as a SKU match
- hide missing approval flags

AI Draft must set approval flags when evidence is incomplete:

- `NeedsSkuApproval = true` when internal SKU or manufacturer part mapping is not exact/approved.
- `NeedsCompatibilityApproval = true` when compatible model evidence is not manufacturer-backed or Liad-approved.
- `NeedsQuantityApproval = true` when quantity is not approved by a stock movement / purchase receipt / inventory transaction.
- `NeedsPriceApproval = true` when customer selling price is not separately supported by pricing evidence.

## 7. Stock Deduction Gate

Stock deduction is allowed only after all of these are true:

1. Approved BusinessDocument / invoice workflow.
2. Confirmed internal SKU.
3. Confirmed manufacturer part number or approved equivalent.
4. Confirmed compatible compressor model where relevant.
5. Approved quantity.
6. Audit evidence.
7. Separate inventory transaction gate.

This gate is separate from:

- AI Draft
- Pricing Evidence Engine
- Parts / SKU Intelligence
- Part Compatibility Registry
- Manufacturer SKU Registry
- Service Pattern Intelligence

## 8. Liad Corrections As Approved Learning

Liad corrections must be stored as approved learning.

Required correction fields:

| Field | Meaning |
|---|---|
| `correctionType` | Alias, compatibility, incompatibility, internal SKU mapping, service kit, quantity rule, or category correction |
| `approvedFact` | Exact approved rule |
| `source` | `Liad Approved` |
| `confidence` | `APPROVED_BY_LIAD` |
| `affectedManufacturerPartNumbers` | Part numbers affected, or `UNKNOWN` |
| `affectedInternalSkus` | Internal SKUs affected, or `UNKNOWN` |
| `affectedModels` | Models affected |
| `forbiddenInference` | What must not be inferred from the correction |
| `createdAt` | Date recorded |

Correction examples already approved elsewhere:

- `MODEL_ALIAS != PART_COMPATIBILITY`.
- `20APM Oil Separator = 30PM Oil Separator`.
- `20APM Oil Separator != 20PM2 Oil Separator`.

## 9. Relationship To Existing Intelligence Layers

| Layer | Role in inventory learning |
|---|---|
| `MANUFACTURER_KNOWLEDGE_BASE.md` | Stores only Liad-approved manufacturer knowledge and corrections |
| `INTERNAL_MANUFACTURER_SKU_REGISTRY_SPEC.md` | Defines manufacturer part-number evidence and compatible model representation |
| `PART_COMPATIBILITY_REGISTRY.md` | Stores compatibility/incompatibility evidence separate from model alias |
| `PARTS_SKU_INTELLIGENCE_SPEC.md` | Uses model, service, compatibility, and SKU evidence to suggest draft lines |
| `SERVICE_PATTERN_INTELLIGENCE_REGISTRY.md` | Defines expected service parts by service type |
| `PRICING_EVIDENCE_ENGINE_SPEC.md` | Separates customer selling price evidence from manufacturer cost |

## 10. Reuse Before Create

Reuse these existing registries before creating any implementation table or workflow:

- Manufacturer knowledge: `project-brain/MANUFACTURER_KNOWLEDGE_BASE.md`.
- Manufacturer SKU evidence: `project-brain/INTERNAL_MANUFACTURER_SKU_REGISTRY_SPEC.md`.
- Compatibility evidence: `project-brain/PART_COMPATIBILITY_REGISTRY.md`.
- Parts recommendation behavior: `project-brain/PARTS_SKU_INTELLIGENCE_SPEC.md`.
- Pricing evidence boundaries: `project-brain/PRICING_EVIDENCE_ENGINE_SPEC.md`.
- Durable approved decisions: `project-brain/DECISION_LOG.md`.

## 11. Forbidden Actions

This spec does not approve:

- code changes
- DB writes
- imports
- Prisma changes
- schema changes
- inventory deduction
- inventory movement creation
- stock quantity updates
- BusinessDocument creation
- BusinessDocumentItem creation
- Maven/Invoice4U action
- Apps Script changes
- Google Sheets changes
- source-system writes
- production actions

## 12. Recommended Future Implementation Path

Phase 1: Documentation and registry alignment.

- Keep learning rules in Project Brain.
- Cross-link manufacturer SKU, part compatibility, and parts intelligence specs.
- Record Liad corrections in `MANUFACTURER_KNOWLEDGE_BASE.md` and `DECISION_LOG.md`.

Phase 2: Read-only inventory evidence prototype.

- For one real part/service packet, show manufacturer part number, internal SKU candidate, compatible models, evidence source, approval flags, and no stock action.

Phase 3: Approved inventory transaction design.

- Design a separate inventory transaction gate before any stock updates.
- Require explicit approval before schema, DB writes, imports, or runtime implementation.

## 13. Risks

- Mixing manufacturer technical identity with Tal internal SKU identity can cause wrong stock movement.
- Treating purchase orders as received stock can overstate inventory.
- Treating AI Draft recommendations as inventory decisions can deduct stock without approval.
- Treating shared manufacturer SKUs as duplicates can damage valid compatibility evidence.
- Treating historical invoice items as manufacturer truth can assign wrong parts.
- Treating Liad corrections as informal notes instead of approved learning can lose critical exceptions.
