# AI Draft Evidence Packet

Date: 2026-06-24

Mode: read-only knowledge graph test.

Selected real service report: `5806` / `1e25bbb1`.

Selected equipment model: `SCR-40PM`.

Runtime impact: none. No code, DB write, Prisma change, BusinessDocument creation, inventory action, Maven/Invoice4U action, pricing generation, or AI Draft creation was performed.

## 1. Equipment Identity

| Field | Evidence |
|---|---|
| Report | `5806` / `1e25bbb1` |
| Customer | `18953` / `רמות מלונקס בע"מ` |
| Equipment model | `SCR-40PM` |
| Equipment type | `מדחס אויר` |
| Equipment subtype | `בורגי` |
| Serial numbers | `SW854751`; `SW851838` |
| Equipment rows | `2` |
| Identity confidence | `MEDIUM` |

Evidence:

- `ReportEquipmentItems.csv` has two exact `SCR-40PM` rows in service report `5806`.
- `MANUFACTURER_KNOWLEDGE_BASE.md` stores `40PM = SCR-40PM` as Liad-approved manufacturer lookup alias.
- `EQUIPMENT_IDENTITY_REGISTRY_DISCOVERY.md` classifies `SCR-40PM` as an exact model evidence bucket, not a generic horsepower class.

Boundary:

- This does not approve generic `40 HP` or generic screw compressor matching.
- This does not approve automatic model merge beyond the approved lookup alias.

## 2. Service Pattern Detected

Detected pattern: `2000h` Small Service.

| Equipment row | Service text | Current hours | Next service | Service pattern confidence |
|---|---|---:|---|---|
| `e8c32b28` | `בוצע טיפול קטן-2000` | `23235` | `25230-4000` | HIGH |
| `6bb28e16` | `טיפול תקופתי קטן 2000` | `32327` | `34320-4000` | HIGH |

Evidence:

- `SERVICE_PATTERN_INTELLIGENCE_REGISTRY.md` defines `2000h / 2500h = Small Service`.
- `MANUFACTURER_KNOWLEDGE_BASE.md` stores Small Service as Liad-approved.
- Both `SCR-40PM` rows explicitly include small/2000 service text.

## 3. Expected Parts

Small Service expected parts:

- Air Filter
- Oil Filter
- Oil handling

Observed service report parts:

| Part category | Observed in report `5806` | Evidence |
|---|---|---|
| Air Filter | Yes | `מסנן אויר = הוחלף` on both rows |
| Oil Filter | Yes | `מסנן שמן = הוחלף` on both rows |
| Oil handling | Not explicit | Small Service rule expects oil handling, but report rows do not prove action/quantity |
| Oil Separator | No for 2000h service | Not observed and not expected for conservative 2000h small-service packet |

## 4. Compatible Manufacturer Parts

Manufacturer evidence is technical compatibility evidence only.

| Expected part | Candidate manufacturer part | Compatible models | Evidence source | Compatibility confidence |
|---|---|---|---|---|
| Air Filter | `25100043-071` / air filter core | `25EPM, 30EPM, 30PM, 40PM` | `PART_COMPATIBILITY_REGISTRY.md`; manufacturer workbook extraction | `MANUFACTURER_EVIDENCE` |
| Oil Filter | `25200007-005` / Oil Filter | `10PM2, 15PM2, 20PM2, 25EPM, 30EPM, 30PM, 40PM, 50PM` | `PART_COMPATIBILITY_REGISTRY.md`; manufacturer workbook extraction | `MANUFACTURER_EVIDENCE` |
| Oil handling | `80000175-039` / Coolant | all extracted PM/EPM models including `40PM` | `PART_COMPATIBILITY_REGISTRY.md`; manufacturer workbook extraction | `MANUFACTURER_EVIDENCE`, but quantity/action unresolved |
| Oil Separator | `25300045-023` / oil separator | `25EPM, 30EPM, 30PM, 40PM` | `PART_COMPATIBILITY_REGISTRY.md`; manufacturer workbook extraction | `MANUFACTURER_EVIDENCE`, but not selected for 2000h small-service auto line |

## 5. Historical Parts Evidence

| Evidence | Result |
|---|---|
| `ReportEquipmentItems.csv` replacement flags | Air Filter and Oil Filter replaced on both `SCR-40PM` rows |
| Service report recurrence | Two compressor rows in the same report, same model, both small/2000 service |
| Historical recurring model pattern beyond report `5806` | Not enough; only one report/customer for `SCR-40PM` |
| PartsUsed staging history | No usable real parts-used history for this test |

Interpretation:

- Historical service evidence supports Air Filter and Oil Filter expected lines.
- Historical service evidence does not prove SKU by itself.
- Historical service evidence does not prove price.

## 6. Historical Pricing Evidence

Current usable historical selling price: not available.

| Pricing source | Status | Effect |
|---|---|---|
| Maven document item history | `MavenDocumentItem = 0` in staging evidence | No customer/equipment historical selling price |
| Maven item catalog | `MavenItem = 0` in staging evidence | No Maven catalog price |
| Product/catalog selling price | No usable populated selling price for these SKUs in staging | Cannot approve price |
| BusinessDocumentItem history | `0` rows in staging evidence | No internal historical selling price |
| Manufacturer workbook cost | Available as USD purchase/cost evidence | Not customer selling price |

Result:

- No generated pricing.
- Every candidate line requires `NeedsPriceApproval = true`.

## 7. Confidence

| Layer | Confidence | Reason |
|---|---|---|
| Equipment Identity | MEDIUM | Exact `SCR-40PM` rows and approved `40PM = SCR-40PM`, but only one report/customer |
| Service Pattern | HIGH | Both rows explicitly indicate small/2000 service |
| Expected parts | HIGH for Air/Oil filter; MEDIUM for oil handling | Air/Oil filter observed; oil handling expected but action not explicit |
| Manufacturer compatibility | HIGH for Air/Oil filter; MEDIUM for oil handling | Manufacturer evidence supports parts, but oil action/quantity unresolved |
| Historical parts evidence | MEDIUM | Good report-level evidence, limited cross-report recurrence |
| Historical pricing evidence | LOW / NEEDS_APPROVAL | No usable Maven/Product/BusinessDocument selling price |
| AI Draft readiness | PARTIAL | Evidence packet is strong; automation gates are missing |

## 8. NeedsSkuApproval

| Candidate | NeedsSkuApproval | Reason |
|---|---|---|
| `25100043-071` Air Filter | `false` for evidence packet; runtime depends on approved alias/registry implementation | Exact observed `SCR-40PM`, approved `40PM = SCR-40PM`, manufacturer compatibility includes `40PM` |
| `25200007-005` Oil Filter | `false` for evidence packet; runtime depends on approved alias/registry implementation | Exact observed `SCR-40PM`, approved `40PM = SCR-40PM`, manufacturer compatibility includes `40PM` |
| `80000175-039` Coolant / oil handling | `true` | Oil action and quantity are not explicit in report |
| `25300045-023` Oil Separator | `true` for 2000h small service | Compatible with `40PM`, but not expected/observed for conservative 2000h small-service line |

## 9. NeedsPriceApproval

All candidate parts require price approval.

| Candidate | NeedsPriceApproval | Reason |
|---|---|---|
| `25100043-071` Air Filter | `true` | Vendor cost only; no customer selling price evidence |
| `25200007-005` Oil Filter | `true` | Vendor cost only; no customer selling price evidence |
| `80000175-039` Coolant / oil handling | `true` | Vendor cost only; action/quantity unresolved |
| `25300045-023` Oil Separator | `true` | Vendor cost only; not selected for small service |

## 10. Missing Information

Missing before safe automation:

- Implemented/persisted Equipment Identity registry.
- Implemented/persisted Part Compatibility registry.
- Runtime rule for `40PM = SCR-40PM`.
- Row-level manufacturer registry with service-interval quantities.
- Approved interpretation of `2000H` and `4000H` quantity columns.
- Approved oil action and quantity rules.
- Usable Maven/Product/BusinessDocument historical selling price evidence.
- Selling price policy: currency, markup, VAT, stale-price rules.
- AI Draft approval gate for SKU, quantity, and price.
- Write workflow approval, which is explicitly out of scope.

## 11. What Prevented Automatic AI Draft Creation

Automatic AI Draft creation was blocked by:

1. Task scope: no draft creation allowed.
2. No approved AI Draft write workflow for this task.
3. No DB writes allowed.
4. No BusinessDocument creation allowed.
5. No approved runtime registry implementation.
6. No approved line quantities from manufacturer interval evidence.
7. No approved customer selling prices.
8. `NeedsPriceApproval = true` for every candidate.
9. `NeedsSkuApproval = true` for oil/coolant and oil separator in this 2000h context.
10. No Maven/Invoice4U action allowed.

## 12. Most Important Answer

Can the current knowledge graph support a future AI Draft recommendation engine?

Answer: `PARTIALLY`.

Why:

- YES for read-only reasoning: the graph can connect exact equipment identity, approved service pattern, compatible manufacturer parts, historical service evidence, and approval flags.
- YES for evidence packets: the `SCR-40PM` example can produce a clear recommendation explanation for Air Filter and Oil Filter.
- NO for automatic draft creation today: the graph lacks runtime registries, approved quantities, approved pricing, and write/approval gates.
- NO for automatic pricing: manufacturer cost is not selling price and Maven/Product/BusinessDocument pricing evidence is not usable in staging.
- NO for inventory or document automation: compatibility evidence does not approve inventory deduction or BusinessDocument creation.

Safe current output:

- Evidence-only AI Draft recommendation preview.

Unsafe current output:

- Created AI Draft record.
- Created BusinessDocument.
- Generated price.
- Inventory transaction.
- Maven/Invoice4U action.
