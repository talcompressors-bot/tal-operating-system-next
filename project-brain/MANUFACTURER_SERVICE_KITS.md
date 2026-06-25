# Manufacturer Service Kits

Status: Reusable Knowledge Base
Scope: service interval rules, expected service-kit lines, model/service matching behavior
Runtime impact: none

Latest intelligence MVP: `data-sources/vendor-spare-parts/generated/service-kit-intelligence.sample.json`

This knowledge base replaces permanent use of per-model service-kit evidence packets. Case-specific research belongs in `project-brain/archive/research/`.

## Core Service Rules

Approved service rules remain owned by `project-brain/MANUFACTURER_KNOWLEDGE_BASE.md`; this file organizes them for reusable service-kit matching.

| Service rule | Interval evidence | Expected lines | Approval boundary |
|---|---|---|---|
| Small Service | `2000h` / `2500h` | Air Filter; Oil Filter; SCR oil top-up / oil handling | Does not approve price, inventory, Maven, or DB write |
| Large Service | `4000h` / `5000h` | Air Filter; Oil Filter; Oil Separator; full oil replacement | Does not approve price, inventory, Maven, or DB write |

Oil handling:

- SCR 2000h / 2500h Small Service: 3L SKR oil top-up when SCR model/service evidence is present.
- 4000h / 5000h Large Service: replace full oil content.
- ALUP or other models: oil handling may be oil replacement, but action type must not be assumed without model/service evidence.

## Current Reusable 40PM / SCR-40PM Kit Evidence

`40PM = SCR-40PM` is an approved manufacturer lookup alias in `MANUFACTURER_KNOWLEDGE_BASE.md`. It is an identity/lookup alias only; part compatibility still comes from `MANUFACTURER_PARTS_REGISTRY.md`.

| Manufacturer model | Observed model alias | Service type | Expected part category | Manufacturer part number | Source |
|---|---|---|---|---|---|
| `40PM` | `SCR-40PM` | Small Service | Air filter | `25100043-071` | PM Series sheet `40PM`, row 6 |
| `40PM` | `SCR-40PM` | Small Service | Oil filter | `25200007-005` | PM Series sheet `40PM`, row 7 |
| `40PM` | `SCR-40PM` | Small Service | Oil/coolant top-up | `80000175-039` | PM Series sheet `40PM`, row 9; action/quantity review |
| `40PM` | `SCR-40PM` | Large Service | Air filter | `25100043-071` | PM Series sheet `40PM`, row 6 |
| `40PM` | `SCR-40PM` | Large Service | Oil filter | `25200007-005` | PM Series sheet `40PM`, row 7 |
| `40PM` | `SCR-40PM` | Large Service | Oil separator | `25300045-023` | PM Series sheet `40PM`, row 8 |
| `40PM` | `SCR-40PM` | Large Service | Oil/coolant | `80000175-039` | PM Series sheet `40PM`, row 9; action/quantity review |

## Quantity Rules

- Service report equipment count may support draft quantity review.
- Service report evidence cannot update stock or deduct inventory.
- Oil quantity/action must remain approval-required unless explicit model/service/oil evidence exists.
- Manufacturer interval quantities require reviewed workbook row semantics before automation.

## Service Kit Intelligence MVP

The current MVP derives interval kit candidates from the PM Series manufacturer workbook fixture. It does not approve inventory, sales bundles, customer-facing SKU display, Maven export, or automatic service-kit ordering.

Model-to-kit matrix:

| Model | Kit candidates | Observed intervals | Current promotion status |
|---|---:|---|---|
| `10PM2` | 8 | 2000H, 4000H, 8000H, 12000H, 16000H, 20000H, 24000H, 30000H | No final standard kit promoted; needs review |
| `15PM2` | 8 | 2000H, 4000H, 8000H, 12000H, 16000H, 20000H, 24000H, 30000H | No final standard kit promoted; needs review |
| `20PM2` | 8 | 2000H, 4000H, 8000H, 12000H, 16000H, 20000H, 24000H, 30000H | No final standard kit promoted; needs review |
| `30PM` | 8 | 2000H, 4000H, 8000H, 12000H, 16000H, 20000H, 24000H, 30000H | No final standard kit promoted; needs review |
| `40PM` | 8 | 2000H, 4000H, 8000H, 12000H, 16000H, 20000H, 24000H, 30000H | No final standard kit promoted; needs review |
| `50PM` | 8 | 2000H, 4000H, 8000H, 12000H, 16000H, 20000H, 24000H, 30000H | No final standard kit promoted; needs review |
| `60PM` | 8 | 2000H, 4000H, 8000H, 12000H, 16000H, 20000H, 24000H, 30000H | No final standard kit promoted; needs review |
| `75PM` | 8 | 2000H, 4000H, 8000H, 12000H, 16000H, 20000H, 24000H, 30000H | No final standard kit promoted; needs review |
| `100PM` | 8 | 2000H, 4000H, 8000H, 12000H, 16000H, 20000H, 24000H, 30000H | No final standard kit promoted; needs review |

Example candidate kits:

| Model | Interval | Candidate type | Included reviewed sample parts | Needs review reason |
|---|---|---|---|---|
| `10PM2` | 2000H | Small service candidate | Air filter `25100020-001`; Oil filter `25200007-005` | Oil top-up action/quantity remains service-rule review |
| `40PM` | 4000H | Large service candidate | Air filter `25100043-071`; Oil filter `25200007-005`; Oil separator `25300045-023`; Coolant `80000175-039` | Coolant action/quantity remains service-rule review |
| `100PM` | 4000H | Large service candidate | Air filter `25100015-002P1`; Oil filter `25200018-005`; Oil separator `25300160-121`; Coolant `80000175-039` | Coolant action/quantity remains service-rule review |

Shared SKU overlap highlights from `shared-sku-overlap.sample.json`:

| Manufacturer SKU | Model count | Models | Category |
|---|---:|---|---|
| `80000175-039` | 9 | `10PM2`, `15PM2`, `20PM2`, `30PM`, `40PM`, `50PM`, `60PM`, `75PM`, `100PM` | `OIL_COOLANT` |
| `50725016-006` | 9 | `10PM2`, `15PM2`, `20PM2`, `30PM`, `40PM`, `50PM`, `60PM`, `75PM`, `100PM` | `SENSOR` |
| `50740008-314` | 9 | `10PM2`, `15PM2`, `20PM2`, `30PM`, `40PM`, `50PM`, `60PM`, `75PM`, `100PM` | `OIL_COOLANT` |
| `25200007-005` | 6 | `10PM2`, `15PM2`, `20PM2`, `30PM`, `40PM`, `50PM` | `OIL_FILTER` |

Service Kit Registry plan:

1. Keep manufacturer interval kit candidates separate from approved Tal sales/service kit SKUs.
2. Derive candidate kits by model + interval + source row quantities.
3. Mark kit membership as review-required when rows have `NEEDS_REVIEW`, `NEEDS_OIL_ACTION_REVIEW`, unknown extra columns, or ambiguous service action.
4. Add approved internal service-kit identity only after a future schema/import task is explicitly approved.
5. Reuse this same kit registry for AI Draft, BusinessDocument review, inventory planning, and future purchase orders.

## AI Draft / BusinessDocument Use

Allowed read/review use:

- Suggest expected service lines with source evidence.
- Show manufacturer part number and compatible models.
- Mark missing/ambiguous SKU, quantity, or price as approval-required.
- Keep customer preview/PDF SKU hidden unless trusted.

Forbidden use:

- Automatic AI Draft write without approved runtime.
- BusinessDocument creation without protected approval.
- Inventory deduction or reservation.
- Maven/Invoice4U action.
- Selling price from manufacturer cost.

## Case Evidence Now Archived

Historical source packets preserved in archive:

- `project-brain/archive/research/SCR_40PM_SERVICE_KIT_EVIDENCE_PACKET.md`
- `project-brain/archive/research/SCR_40PM_INVENTORY_EVIDENCE_PACKET.md`
