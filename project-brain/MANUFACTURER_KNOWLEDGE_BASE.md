# Manufacturer Knowledge Base

Date: 2026-06-24

Mode: approved knowledge registry only.

Runtime impact: none. No implementation, discovery, inference, DB write, Prisma change, import, inventory action, BusinessDocument creation, or Maven/Invoice4U action was performed.

## Scope Rule

This file stores only Liad-approved manufacturer knowledge.

Every entry in this file has:

- Source: `Liad Approved`
- Confidence: `Approved`
- AI inference: `No`
- Historical guess: `No`

Do not add discovery findings, probable aliases, historical patterns, or AI guesses to this file.

Cross-references:

- Equipment Identity: `project-brain/EQUIPMENT_IDENTITY_REGISTRY_DISCOVERY.md`
- Parts SKU Intelligence: `project-brain/PARTS_SKU_INTELLIGENCE_SPEC.md`
- Manufacturer SKU Registry: `project-brain/INTERNAL_MANUFACTURER_SKU_REGISTRY_SPEC.md`
- Service Pattern Intelligence: `project-brain/PARTS_SKU_INTELLIGENCE_SPEC.md`
- Inventory Learning Loop: `project-brain/INVENTORY_LEARNING_LOOP_SPEC.md`
- Decision Log: `project-brain/DECISION_LOG.md`

## 1. Approved Model Aliases

Model aliases describe equipment identity only. They do not automatically approve part compatibility, service-kit equality, pricing, inventory deduction, or BusinessDocument creation.

| Approved alias | Meaning | Source | Confidence | AI inference | Historical guess | Notes |
|---|---|---|---|---|---|---|
| `10APM = 10PM2` | Approved model identity alias | Liad Approved | Approved | No | No | Alias only; parts compatibility must be checked separately |
| `20APM = 20PM2` | Approved model identity alias | Liad Approved | Approved | No | No | Alias only; does not approve oil separator matching |
| `40PM = SCR-40PM` | Approved model identity / manufacturer lookup alias | Liad Approved | Approved | No | No | Alias only; parts compatibility must be checked separately |

## 2. Approved Part Compatibility Rules

Part compatibility rules are separate from model aliases.

Core rule:

```text
MODEL_ALIAS != PART_COMPATIBILITY
```

| Model | Part category | Compatible with | Source | Confidence | AI inference | Historical guess | Notes |
|---|---|---|---|---|---|---|---|
| `20APM` | Oil Separator | `30PM` Oil Separator | Liad Approved | Approved | No | No | Approved compatibility exception |

## 3. Approved Part Incompatibility Rules

| Model | Part category | Not compatible with | Source | Confidence | AI inference | Historical guess | Notes |
|---|---|---|---|---|---|---|---|
| `20APM` | Oil Separator | `20PM2` Oil Separator | Liad Approved | Approved | No | No | Approved alias `20APM = 20PM2` does not allow automatic oil separator matching |

## 4. Approved Service Rules

These are service pattern rules only. They help AI Draft recommend expected service lines, but they do not approve pricing, inventory deduction, BusinessDocument creation, Maven/Invoice4U action, or any write workflow.

| Service rule | Definition | Expected parts / handling | Source | Confidence | AI inference | Historical guess | Notes |
|---|---|---|---|---|---|---|---|
| Large Service | `4000h` / `5000h` service | Air Filter; Oil Filter; Oil Separator; Oil | Liad Approved | Approved | No | No | Expected service lines only |
| Small Service | `2000h` / `2500h` service | Air Filter; Oil Filter; Oil handling | Liad Approved | Approved | No | No | Expected service lines only |

Oil handling rule:

| Context | Rule | Source | Confidence | AI inference | Historical guess | Notes |
|---|---|---|---|---|---|---|
| SCR compressors | Oil handling is often oil top-up / added oil | Liad Approved | Approved | No | No | Do not assume action type automatically without model/service evidence |
| ALUP or other compressor models | Oil handling may be oil replacement | Liad Approved | Approved | No | No | Do not assume action type automatically without model/service evidence |

## 5. Approved Manufacturer Exceptions

| Exception | Layer | Source | Confidence | AI inference | Historical guess | Required behavior |
|---|---|---|---|---|---|---|
| `MODEL_ALIAS != PART_COMPATIBILITY` | Governance | Liad Approved | Approved | No | No | Keep Equipment Identity and Parts Compatibility separate |
| `20APM Oil Separator = 30PM Oil Separator` | Parts Compatibility | Liad Approved | Approved | No | No | Store as explicit compatibility exception |
| `20APM Oil Separator != 20PM2 Oil Separator` | Parts Compatibility | Liad Approved | Approved | No | No | Do not auto-match separator from model alias |
| `20APM = 20PM2` but separator does not match | Identity + Parts Compatibility | Liad Approved | Approved | No | No | Alias may be true while specific part compatibility differs |

## 6. Approved Business Document Structure Rules

Scope:

These document-line rules apply to all business documents, not only quotes.

Applies to:

- Quotes.
- Invoices.
- Proforma invoices.
- Delivery notes if relevant.
- Service draft documents.
- `BusinessDocuments`.
- `BusinessDocumentItems`.
- AI Draft outputs.
- Maven document drafts.
- Any future customer-facing document.

| Rule | Source | Confidence | AI inference | Historical guess | Notes |
|---|---|---|---|---|---|
| Compressor service draft title/header must clearly show the equipment model | Liad Approved | Approved | No | No | Model connects service type, expected parts, manufacturer part numbers, future internal SKUs, historical pricing evidence, and inventory matching |
| Standard compressor service document structure is Parts lines, Oil handling line if needed, Labor + Service, and Technician Visit / Travel | Liad Approved | Approved | No | No | Oil action depends on oil type and model evidence |
| Technician Visit / Travel is one commercial line | Liad Approved | Approved | No | No | Do not generate separate Technician Visit and Travel lines; do not double-charge travel |
| Labor + Service is one commercial line | Liad Approved | Approved | No | No | Do not split Labor and Service unless Liad explicitly approves an exception; do not double-charge service/labor |
| Compressor service documents must mark every generated or suggested line as included, excluded, or approval-required | Liad Approved | Approved | No | No | Historical bundled price must explain whether it includes parts only, parts + labor/service, or parts + labor/service + technician visit/travel |

## 7. Approved Inventory Learning Rules

These rules define how manufacturer knowledge may enrich future inventory intelligence. They do not approve implementation, DB writes, imports, stock updates, BusinessDocument creation, or Maven/Invoice4U action.

| Rule | Source | Confidence | AI inference | Historical guess | Notes |
|---|---|---|---|---|---|
| Manufacturer part number is technical identity | Liad Approved | Approved | No | No | Used for manufacturer evidence and compatibility |
| Internal SKU is Tal inventory identity | Liad Approved | Approved | No | No | Used for inventory operations and stock tracking |
| One manufacturer part number may match multiple compressor models | Liad Approved | Approved | No | No | Shared compatibility is valid evidence |
| One internal SKU may represent one manufacturer part number or an approved equivalent | Liad Approved | Approved | No | No | Equivalent mappings require approval evidence |
| Compatible models must be stored as evidence-backed mappings | Liad Approved | Approved | No | No | Do not infer from generic model text |
| Quantity in stock may only update from approved stock movement, purchase receipt, or inventory transaction | Liad Approved | Approved | No | No | Purchase order alone is not received stock |
| AI Draft may suggest a part/SKU but cannot deduct stock | Liad Approved | Approved | No | No | Requires approval flags when evidence is incomplete |
| Stock deduction requires approved BusinessDocument/invoice workflow and separate inventory transaction gate | Liad Approved | Approved | No | No | Confirm SKU, quantity, and audit evidence first |
| Liad corrections must be stored as approved learning | Liad Approved | Approved | No | No | Corrections should record affected models, parts, internal SKUs, and forbidden inference |

## Forbidden Uses

This knowledge base does not approve:

- automatic SKU assignment from generic model names
- automatic part compatibility from model alias alone
- automatic service-kit equality from model alias alone
- manufacturer cost as selling price
- inventory deduction
- stock quantity updates from AI Draft, recommendation, purchase order alone, or compatibility evidence alone
- AI Draft writes
- BusinessDocument creation
- Maven/Invoice4U action
- DB writes
- Prisma changes
- imports
- hiding or omitting the compressor model from compressor service draft title/header

## Update Rule

Only add entries when Liad explicitly approves the manufacturer knowledge.

Each new entry must identify:

- the exact model or part rule
- whether it belongs to Equipment Identity, Parts Compatibility, Service Rules, or Manufacturer Exceptions
- Source = `Liad Approved`
- Confidence = `Approved`
- AI inference = `No`
- Historical guess = `No`
