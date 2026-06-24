# Knowledge Graph Validation

Date: 2026-06-24

Mode: validation only.

Runtime impact: none. No implementation, DB write, Prisma change, import, inventory action, BusinessDocument creation, Maven/Invoice4U action, or runtime workflow change was performed.

## 1. Validation Scope

This report validates whether the discovered and approved intelligence layers connect correctly for future AI Draft recommendations.

Files used:

- `project-brain/MANUFACTURER_KNOWLEDGE_BASE.md`
- `project-brain/EQUIPMENT_IDENTITY_REGISTRY_DISCOVERY.md`
- `project-brain/PARTS_SKU_INTELLIGENCE_SPEC.md`
- `project-brain/PRICING_EVIDENCE_ENGINE_SPEC.md`
- `project-brain/SCR_40PM_SERVICE_KIT_EVIDENCE_PACKET.md`
- `project-brain/INTERNAL_MANUFACTURER_SKU_REGISTRY_SPEC.md`
- `project-brain/DECISION_LOG.md`

Service Pattern Intelligence status:

- No separate `SERVICE_PATTERN_INTELLIGENCE` report file currently exists in `project-brain`.
- Service pattern rules currently live in `MANUFACTURER_KNOWLEDGE_BASE.md`, `PARTS_SKU_INTELLIGENCE_SPEC.md`, and `DECISION_LOG.md`.

## 2. Knowledge Graph

```text
Equipment Identity
↓
Service Pattern
↓
Parts Evidence
↓
Manufacturer Evidence
↓
Pricing Evidence
↓
AI Draft Inputs
```

Current validation result:

- The graph is conceptually coherent.
- The strongest working example is `SCR-40PM`.
- The graph is not yet safe for automated AI Draft recommendations because pricing, quantity, alias persistence, and write approval gates are still missing.

## 3. Connection Validation

### Equipment Identity -> Service Pattern

| What is known | What is missing | Confidence | Risk |
|---|---|---|---|
| Exact raw equipment models exist, including `SCR-40PM`, `SCR20APM`, `SCR20EPM`, `SCR50EPM`, and others. Generic rows are separated as `UNKNOWN_MODEL` / `GENERIC_HP_CLASS`. | Approved persisted Equipment Identity registry does not exist yet. Alias governance is documented but not implemented. Some identities are still discovery candidates only. | Medium overall; High for exact observed rows inside one report; Low for generic descriptions. | Wrong model identity would cascade into wrong service-kit and SKU recommendations. |

Validation:

- Connection is valid only when exact model or Liad-approved alias exists.
- Generic compressor names must stop the graph and set `NeedsSkuApproval = true`.
- `MODEL_ALIAS != PART_COMPATIBILITY` is correctly represented.

### Service Pattern -> Parts Evidence

| What is known | What is missing | Confidence | Risk |
|---|---|---|---|
| Approved Small Service rule: `2000h` / `2500h` includes Air Filter, Oil Filter, Oil handling. Approved Large Service rule: `4000h` / `5000h` includes Air Filter, Oil Filter, Oil Separator, Oil. | A standalone Service Pattern Intelligence report is missing. Per-model service frequency and recurring labor evidence are not yet canonical. Oil action type and quantities are not approved. | High for approved service categories; Medium for applying them to a specific model/report; Low for quantities. | Service pattern can suggest expected categories but can overreach if treated as SKU, quantity, or price approval. |

Validation:

- Service pattern connects correctly to expected part categories.
- Service pattern does not approve SKU, price, quantity, inventory, or document creation.

### Parts Evidence -> Manufacturer Evidence

| What is known | What is missing | Confidence | Risk |
|---|---|---|---|
| Manufacturer workbooks are primary technical SKU/model evidence. One SKU may fit multiple models. Shared SKU is not duplicate/conflict. Part compatibility is separate from model alias. | Internal Manufacturer SKU Registry is a spec only. No imported registry table. Row-level workbook quantities are not normalized into an approved registry. Compatibility exceptions are documented but not executable. | High for documented manufacturer part compatibility in reports; Medium for future runtime use. | Treating alias as compatibility can produce wrong parts, especially `20APM` oil separator. |

Validation:

- Connection is valid when manufacturer evidence explicitly lists the compatible model or Liad-approved compatibility exception.
- `20APM = 20PM2` must not imply separator compatibility.
- `20APM Oil Separator = 30PM Oil Separator` is correctly stored as a separate compatibility exception.

### Manufacturer Evidence -> Pricing Evidence

| What is known | What is missing | Confidence | Risk |
|---|---|---|---|
| Manufacturer SKU cost is internal cost evidence only. Maven/Invoice history is customer price evidence. Pricing Evidence Engine separates SKU confidence from price confidence. | Usable Maven/Product/BusinessDocument selling-price history is not populated in staging. Currency, markup, VAT, stale-price policy, and customer-specific reuse policy are missing. | High for cost-not-selling-price rule; Low for actual customer price recommendation today. | Vendor cost could be accidentally treated as selling price without hard gates. |

Validation:

- Connection is intentionally weak today.
- Manufacturer evidence can identify a candidate part, but cannot produce approved customer price.
- All SCR-40PM candidate lines remain `NeedsPriceApproval = true`.

### Pricing Evidence -> AI Draft Inputs

| What is known | What is missing | Confidence | Risk |
|---|---|---|---|
| AI Draft input shape is defined conceptually: candidate SKU, part name, source model, compatible models, service pattern, quantity evidence, price source, confidence, approval flags, evidence rows. | No approved write workflow. No approved AI Draft recommendation engine. No populated pricing evidence tables in staging. No approval UI/workflow gate for SKU, quantity, and price decisions. | Medium for read-only preview/evidence packet; Low for automated draft creation. | A draft engine would be premature if it creates records, prices lines, or hides approval flags. |

Validation:

- The graph can support read-only evidence packets now.
- The graph cannot yet support safe automated AI Draft recommendation writes.

## 4. SCR-40PM End-to-End Validation

```text
SCR-40PM
↓
2000h Small Service
↓
Air Filter + Oil Filter + Oil handling
↓
40PM manufacturer workbook evidence
↓
25100043-071 / 25200007-005 / 80000175-039
↓
No approved selling price
↓
AI Draft evidence only with approval flags
```

Validated known facts:

- `SCR-40PM` has exact observed equipment identity evidence in report `5806`.
- `40PM = SCR-40PM` is Liad-approved knowledge in `MANUFACTURER_KNOWLEDGE_BASE.md`.
- Small Service expected parts are approved by Liad.
- Manufacturer evidence supports:
  - `25100043-071` Air Filter for `40PM`
  - `25200007-005` Oil Filter for `40PM`
  - `25300045-023` Oil Separator for `40PM`
  - `80000175-039` Coolant for `40PM`
- Vendor cost is not selling price.
- No usable Maven/Product/BusinessDocument selling price is available today.

SCR-40PM result:

| Layer | Status | Confidence | Risk |
|---|---|---|---|
| Equipment Identity | Connected | Medium | One report/customer only |
| Service Pattern | Connected | High for rule, Medium for report application | Oil handling quantity/action missing |
| Parts Evidence | Connected | High for Air/Oil filter, Medium for oil handling | Quantity approval missing |
| Manufacturer Evidence | Connected | High | Runtime registry not implemented |
| Pricing Evidence | Not complete | Needs approval | No selling price evidence |
| AI Draft Inputs | Evidence-only | Medium | Not safe for write automation |

## 5. Most Important Section: What Still Prevents A Safe AI Draft Recommendation Engine?

The biggest blocker is not one missing table. It is missing approval-grade connections between layers.

A safe AI Draft recommendation engine still needs:

1. Approved Equipment Identity registry with explicit alias status.
2. Separate Parts Compatibility registry, not derived from aliases.
3. Manufacturer SKU registry with row-level compatible models, categories, intervals, and exception rules.
4. Approved service interval quantity interpretation.
5. Approved oil handling action and quantity rules by model/service.
6. Usable customer price evidence from Maven/Product/BusinessDocument history.
7. Price policy for currency, markup, VAT, stale prices, and customer-specific reuse.
8. Approval gates for SKU, quantity, and price before draft write.
9. Evidence packet schema that records source rows and confidence.
10. A strict no-inventory-deduction boundary until invoice/document and inventory gates are approved.

Current safe capability:

- Read-only evidence packets and previews.

Current unsafe capability:

- Automatic AI Draft creation, automatic pricing, automatic BusinessDocument creation, Maven/Invoice4U action, or inventory deduction.

## 6. Top 10 Highest-Value Knowledge Gaps

| Rank | Gap | Why it matters | Blocking effect |
|---:|---|---|---|
| 1 | Approved Equipment Identity registry | AI Draft must know exact model vs generic class | Blocks automatic SKU selection |
| 2 | Parts Compatibility registry separate from aliases | Prevents wrong part selection from valid model aliases | Blocks safe service-kit automation |
| 3 | Row-level Manufacturer SKU registry | Needed for exact model/category/interval compatibility | Blocks scalable parts evidence |
| 4 | Service interval quantity semantics | Workbook quantities may be cumulative or per-service | Blocks quantity approval |
| 5 | Maven/Product/BusinessDocument price history | Needed for customer selling price evidence | Blocks price recommendation |
| 6 | Selling price policy | Vendor cost cannot become selling price | Blocks `NeedsPriceApproval=false` |
| 7 | Oil handling rules by model | Small/Large service says oil handling, but action/quantity varies | Blocks oil line automation |
| 8 | Approved alias table with status | Aliases exist in docs, not an operational registry | Blocks runtime confidence |
| 9 | Historical service pattern report | Current service rules exist, but recurring patterns are not canonicalized | Blocks model-specific maintenance intelligence |
| 10 | AI Draft approval gate design | Need separate SKU, quantity, and price approval states | Blocks safe write workflow |

## 7. Cross-Layer Risk Review

| Risk | Layer | Current mitigation |
|---|---|---|
| Generic equipment maps to wrong SKU | Equipment Identity -> Parts | Generic rows remain `UNKNOWN_MODEL` / `GENERIC_HP_CLASS` |
| Model alias implies wrong part | Identity -> Compatibility | `MODEL_ALIAS != PART_COMPATIBILITY` |
| Shared SKU treated as duplicate | Manufacturer Evidence | Shared SKU is valid evidence, not conflict |
| Vendor cost used as selling price | Manufacturer -> Pricing | Vendor cost is cost evidence only |
| Service pattern over-approves parts | Service Pattern -> Parts | Service rule suggests categories only |
| Missing quantity becomes invoice quantity | Parts -> AI Draft | `NeedsQuantityApproval` required |
| Missing price becomes line price | Pricing -> AI Draft | `NeedsPriceApproval` required |
| Draft causes stock movement | AI Draft -> Inventory | Inventory deduction forbidden without separate gate |

## 8. Validation Conclusion

The knowledge graph is structurally valid for read-only intelligence:

```text
exact/approved equipment identity
-> approved service pattern
-> part category expectation
-> manufacturer compatibility evidence
-> pricing evidence check
-> AI Draft evidence packet with approval flags
```

The graph is not yet safe for automatic AI Draft recommendation writes.

Recommended next task:

- Create a formal `PART_COMPATIBILITY_REGISTRY_SPEC.md` that separates part compatibility from model aliases and uses the `MANUFACTURER_KNOWLEDGE_BASE.md` approved exceptions as seed data.
