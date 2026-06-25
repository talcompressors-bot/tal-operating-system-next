# Manufacturer Service Kits

Status: Reusable Knowledge Base
Scope: service interval rules, expected service-kit lines, model/service matching behavior
Runtime impact: none

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
