# Part Compatibility Registry

Date: 2026-06-24

Mode: documentation only.

Runtime impact: none. No implementation, DB write, Prisma change, import, BusinessDocument creation, inventory action, Maven/Invoice4U action, or runtime workflow change was performed.

## Scope

This registry stores part compatibility knowledge separately from equipment identity aliases.

Core rule:

```text
MODEL_ALIAS != PART_COMPATIBILITY
```

Compatibility evidence can support AI Draft recommendations, but it does not approve price, quantity, inventory deduction, BusinessDocument creation, Maven/Invoice4U action, or automatic AI Draft approval.

Sources used:

- `project-brain/MANUFACTURER_KNOWLEDGE_BASE.md`
- `project-brain/MANUFACTURER_PARTS_REGISTRY_DISCOVERY.md`
- `project-brain/INTERNAL_MANUFACTURER_SKU_REGISTRY_SPEC.md`
- `project-brain/SERVICE_PATTERN_INTELLIGENCE_REGISTRY.md`
- `project-brain/PARTS_SKU_INTELLIGENCE_SPEC.md`
- `project-brain/INVENTORY_LEARNING_LOOP_SPEC.md`
- `project-brain/DECISION_LOG.md`

## 1. Approved Compatibility Rules

These rules are Liad-approved and outrank manufacturer-row inference or historical evidence.

### 20APM Oil Separator

| Model | Part category | Compatible part family | Evidence source | Confidence | Notes |
|---|---|---|---|---|---|
| `20APM` | Oil Separator | `30PM` Oil Separator | Liad Approved / `MANUFACTURER_KNOWLEDGE_BASE.md` | `APPROVED_BY_LIAD` | Compatibility exception; store separately from model alias |

## 2. Approved Incompatibility Rules

These rules explicitly block automatic compatibility.

| Model | Part category | Not compatible with | Evidence source | Confidence | Required behavior |
|---|---|---|---|---|---|
| `20APM` | Oil Separator | `20PM2` Oil Separator | Liad Approved / `MANUFACTURER_KNOWLEDGE_BASE.md` | `APPROVED_BY_LIAD` | Do not assign `20PM2` separator to `20APM` from alias alone |

## 3. Shared Part Compatibility

Shared part compatibility is valid evidence. A shared part is not a duplicate or conflict by itself.

| Part | Compatible models | Evidence source | Confidence |
|---|---|---|---|
| `80000175-039` / Coolant | `100EPM, 100PM, 10PM2, 125EPM, 150EPM, 15PM2, 20PM2, 25EPM, 30EPM, 30PM, 40EPM, 40PM, 50EPM, 50PM, 60EPM, 60PM, 75EPM, 75PM, 90EPM` | Manufacturer spare-parts workbook extraction / `MANUFACTURER_PARTS_REGISTRY_DISCOVERY.md` | `MANUFACTURER_EVIDENCE` |
| `50725016-006` / Pressure Sensor | `100EPM, 100PM, 10PM2, 125EPM, 150EPM, 15PM2, 20PM2, 25EPM, 30EPM, 30PM, 40EPM, 40PM, 50EPM, 50PM, 60EPM, 60PM, 75EPM, 75PM, 90EPM` | Manufacturer spare-parts workbook extraction | `MANUFACTURER_EVIDENCE` |
| `50740008-314` / Oil Return Check Valve | `100EPM, 100PM, 10PM2, 125EPM, 150EPM, 15PM2, 20PM2, 25EPM, 30EPM, 30PM, 40EPM, 40PM, 50EPM, 50PM, 60EPM, 60PM, 75EPM, 75PM, 90EPM` | Manufacturer spare-parts workbook extraction | `MANUFACTURER_EVIDENCE` |
| `25200007-005` / Oil Filter | `10PM2, 15PM2, 20PM2, 25EPM, 30EPM, 30PM, 40PM, 50PM` | Manufacturer spare-parts workbook extraction | `MANUFACTURER_EVIDENCE` |
| `25200018-005` / Oil Filter | `100EPM, 100PM, 125EPM, 150EPM, 40EPM, 50EPM, 60EPM, 60PM, 75EPM, 75PM, 90EPM` | Manufacturer spare-parts workbook extraction | `MANUFACTURER_EVIDENCE` |
| `25100043-071` / air filter core | `25EPM, 30EPM, 30PM, 40PM` | Manufacturer spare-parts workbook extraction | `MANUFACTURER_EVIDENCE` |
| `25100075-071` / air filter core | `40EPM, 50EPM, 50PM, 60PM` | Manufacturer spare-parts workbook extraction | `MANUFACTURER_EVIDENCE` |
| `25300045-023` / oil separator | `25EPM, 30EPM, 30PM, 40PM` | Manufacturer spare-parts workbook extraction | `MANUFACTURER_EVIDENCE` |
| `25300065-031` / oil separator | `40EPM, 50EPM, 50PM, 60PM` | Manufacturer spare-parts workbook extraction | `MANUFACTURER_EVIDENCE` |
| `25100020-001` / air filter core | `10PM2, 15PM2, 20PM2` | Manufacturer spare-parts workbook extraction | `MANUFACTURER_EVIDENCE` |
| `22150023-011P1` / air filter core | `100EPM, 125EPM, 150EPM` | Manufacturer spare-parts workbook extraction | `MANUFACTURER_EVIDENCE` |
| `22150023-011P2` / Safety Filter Core | `100EPM, 125EPM, 150EPM` | Manufacturer spare-parts workbook extraction | `MANUFACTURER_EVIDENCE` |
| `25100015-002P1` / air filter core | `100PM, 60EPM, 75EPM, 75PM, 90EPM` | Manufacturer spare-parts workbook extraction | `MANUFACTURER_EVIDENCE` |
| `26015001-000` / Oil Level Sightglass | `100EPM, 125EPM, 150EPM, 75EPM, 90EPM` | Manufacturer spare-parts workbook extraction | `MANUFACTURER_EVIDENCE` |
| `26015001-010` / Oil Level Sightglass | `100PM, 25EPM, 30EPM, 30PM, 40EPM, 40PM, 50EPM, 50PM, 60EPM, 60PM, 75PM` | Manufacturer spare-parts workbook extraction | `MANUFACTURER_EVIDENCE` |
| `35350065-002` / Oil Level Sightglass | `10PM2, 15PM2, 20PM2` | Manufacturer spare-parts workbook extraction | `MANUFACTURER_EVIDENCE` |

## 4. Model-Specific Parts

These are narrow or model-specific compatibility records from manufacturer evidence.

| Part | Model | Evidence | Confidence |
|---|---|---|---|
| `25350020-021` / oil separator | `10PM2` | Manufacturer spare-parts workbook extraction | `MANUFACTURER_EVIDENCE` |
| `25350030-021` / oil separator | `15PM2, 20PM2` | Manufacturer spare-parts workbook extraction | `MANUFACTURER_EVIDENCE` |
| `25300065-036` / oil separator | `60EPM` | Manufacturer spare-parts workbook extraction | `MANUFACTURER_EVIDENCE` |
| `25300220-022` / oil separator | `100EPM, 125EPM, 150EPM` | Manufacturer spare-parts workbook extraction | `MANUFACTURER_EVIDENCE` |
| `00060002-002` / Airend 8BAR | `10PM2` | Manufacturer spare-parts workbook extraction | `MANUFACTURER_EVIDENCE` |
| `00075001-009` / Airend 8BAR | `15PM2, 20PM2` | Manufacturer spare-parts workbook extraction | `MANUFACTURER_EVIDENCE` |
| `00080002-003` / Airend 8BAR | `30PM, 40PM` | Manufacturer spare-parts workbook extraction | `MANUFACTURER_EVIDENCE` |
| `00090002-013` / Airend 8BAR | `100PM` | Manufacturer spare-parts workbook extraction | `MANUFACTURER_EVIDENCE` |
| `00270002-001` / Airend 8BAR | `100EPM` | Manufacturer spare-parts workbook extraction | `MANUFACTURER_EVIDENCE` |
| `00280002-002` / Airend 8BAR | `125EPM, 150EPM` | Manufacturer spare-parts workbook extraction | `MANUFACTURER_EVIDENCE` |

## 5. Compatibility Confidence

| Confidence | Meaning | Can support AI Draft evidence? | Can approve automatically? |
|---|---|---|---|
| `APPROVED_BY_LIAD` | Explicitly approved by Liad | Yes | No, still must respect price/quantity/write gates |
| `MANUFACTURER_EVIDENCE` | Present in manufacturer spare-parts workbook evidence | Yes | No, still requires model identity, service pattern, quantity, and price gates |
| `HISTORICAL_EVIDENCE` | Observed in service history or invoice/item history | Review-only support | No |
| `AI_INFERENCE` | AI-derived suggestion without explicit approved/manufacturer evidence | No automatic use | No |

Rules:

- `APPROVED_BY_LIAD` outranks conflicting inference.
- `MANUFACTURER_EVIDENCE` outranks historical service guesses.
- `HISTORICAL_EVIDENCE` can support review but cannot override manufacturer evidence.
- `AI_INFERENCE` must be approval-required and must not create documents or inventory actions.

## 6. Safety Rules

Compatibility boundaries:

```text
Compatibility != Price
Compatibility != Inventory Deduction
Compatibility != BusinessDocument Creation
Compatibility != Automatic AI Draft Approval
Compatibility != Quantity Approval
Compatibility != Model Alias
```

Required behavior:

- Do not use compatibility as selling-price evidence.
- Do not use compatibility to deduct inventory.
- Do not use compatibility as proof of quantity in stock.
- Do not use compatibility as proof that a purchase order was received.
- Do not use compatibility to create BusinessDocuments.
- Do not use compatibility to auto-approve AI Draft lines.
- Do not infer compatibility from generic model names.
- Do not infer compatibility from model alias alone.
- Show compatible models as evidence when a shared part is suggested.
- Set `NeedsSkuApproval = true` when compatibility is historical, inferred, generic, missing, or exception-based without an approved runtime rule.
- Set `NeedsQuantityApproval = true` when quantity is missing or service interval semantics are unclear.
- Set `NeedsPriceApproval = true` unless pricing evidence is approved separately.
- Enrich internal SKU compatibility only through the Inventory Learning Loop when manufacturer part number, internal SKU, source evidence, and approval status are tracked separately.

## Missing Evidence

- No implemented/persisted compatibility table.
- No row-level manufacturer SKU registry import.
- No approved service interval quantity interpretation.
- No approved runtime representation for Liad exceptions.
- No approved compatibility evidence for `SCR20EPM` because EPM workbook starts at `25EPM`.
- No manufacturer belt SKU evidence from the PM/EPM workbook extraction.
- No approved compatibility mapping for generic equipment descriptions.
- No implemented inventory learning table or approved stock-movement transaction workflow.

## Risks

- Treating `20APM = 20PM2` as full parts compatibility would assign the wrong oil separator.
- Treating shared SKU rows as duplicates would damage valid manufacturer compatibility.
- Treating compatibility as price evidence would produce unsafe customer pricing.
- Treating compatibility as inventory approval would bypass inventory gates.
- Treating purchase/order evidence as received stock would overstate inventory.
- Treating historical service observations as manufacturer truth could overfit one customer/report.
- Treating generic horsepower classes as exact models could produce wrong SKUs.
