# SCR-40PM Inventory Evidence Packet

Date: 2026-06-24
Mode: read-only evidence packet.
Scope: `SCR-40PM` 2000h Small Service.
Runtime impact: none.

No code, DB write, Prisma change, import, inventory quantity update, inventory deduction, BusinessDocument creation, Maven/Invoice4U action, Apps Script change, Google Sheets change, or runtime workflow change is approved by this packet.

## 1. Equipment Model

| Field | Evidence |
|---|---|
| Equipment model | `SCR-40PM` |
| Manufacturer lookup alias | `40PM = SCR-40PM` |
| Source report | `5806` / `1e25bbb1` |
| Customer | `18953` / `רמות מלונקס בע"מ` |
| Equipment rows | `2` |
| Serial numbers | `SW854751`; `SW851838` |
| Evidence source | `SCR_40PM_SERVICE_KIT_EVIDENCE_PACKET.md`; `AI_DRAFT_EVIDENCE_PACKET.md`; `MANUFACTURER_KNOWLEDGE_BASE.md` |

Identity status:

- `SCR-40PM` is an exact observed model in the service report evidence.
- `40PM = SCR-40PM` is Liad-approved manufacturer lookup knowledge.
- This does not approve generic `40 HP`, generic compressor descriptions, or other `40PM` free-text fragments as automatic model identity.

## 2. Service Type

Service type: `2000h Small Service`.

Evidence:

- `ReportEquipmentItems` rows for report `5806` include `בוצע טיפול קטן-2000` and `טיפול תקופתי קטן 2000`.
- Liad-approved service rule: `2000h` / `2500h` = `Small Service`.
- Small Service always includes Air Filter, Oil Filter, and Oil handling.

## 3. Expected Service Lines

| Service line | Expected by rule | Observed in report 5806 | Inventory meaning |
|---|---|---|---|
| Air Filter | Yes | Replaced on both equipment rows | Candidate part evidence only |
| Oil Filter | Yes | Replaced on both equipment rows | Candidate part evidence only |
| Oil handling | Yes | Not explicit; action/quantity unresolved | Review-only candidate evidence |

Not included for 2000h Small Service:

- Oil Separator is compatible with `40PM`, but it is not selected for the conservative 2000h small-service inventory packet.
- Belts are not included because no approved manufacturer belt evidence exists in the current PM/EPM workbook extraction.

## 4. Manufacturer Part Numbers

Manufacturer part number is technical identity. It is not Tal inventory identity, selling price, quantity approval, or stock action approval.

| Service line | Manufacturer part number | Manufacturer description | Compatible models | Compatibility evidence | Technical confidence |
|---|---|---|---|---|---|
| Air Filter | `25100043-071` | air filter core | `25EPM, 30EPM, 30PM, 40PM` | Manufacturer workbook extraction / `PART_COMPATIBILITY_REGISTRY.md` | `HIGH` |
| Oil Filter | `25200007-005` | Oil Filter | `10PM2, 15PM2, 20PM2, 25EPM, 30EPM, 30PM, 40PM, 50PM` | Manufacturer workbook extraction / `PART_COMPATIBILITY_REGISTRY.md` | `HIGH` |
| Oil handling | `80000175-039` | Coolant | `100EPM, 100PM, 10PM2, 125EPM, 150EPM, 15PM2, 20PM2, 25EPM, 30EPM, 30PM, 40EPM, 40PM, 50EPM, 50PM, 60EPM, 60PM, 75EPM, 75PM, 90EPM` | Manufacturer workbook extraction / `PART_COMPATIBILITY_REGISTRY.md` | `MEDIUM` because action/quantity unresolved |

## 5. Internal SKU Candidate

Internal SKU is Tal inventory identity.

No approved Tal internal inventory SKU was found for these manufacturer part numbers in the available documentation.

| Service line | Manufacturer part number | Internal SKU candidate | Status | Reason |
|---|---|---|---|---|
| Air Filter | `25100043-071` | `UNKNOWN` | Not approved | Manufacturer part number exists, but no Tal internal SKU mapping evidence was found |
| Oil Filter | `25200007-005` | `UNKNOWN` | Not approved | Manufacturer part number exists, but no Tal internal SKU mapping evidence was found |
| Oil handling | `80000175-039` | `UNKNOWN` | Not approved | Manufacturer part number exists, but no Tal internal SKU mapping and no oil action/quantity approval were found |

Important:

- The SCR preview and evidence packets use manufacturer part numbers as candidate SKU-like evidence.
- This packet does not treat those manufacturer part numbers as confirmed Tal internal SKUs.
- A future internal SKU may equal a manufacturer part number only if Tal approves that inventory identity mapping.

## 6. Compatible Models

Shared manufacturer compatibility is valid evidence and is not a duplicate/conflict.

| Manufacturer part number | Compatible models | Shared SKU? | Conflict? |
|---|---|---|---|
| `25100043-071` | `25EPM, 30EPM, 30PM, 40PM` | Yes | No |
| `25200007-005` | `10PM2, 15PM2, 20PM2, 25EPM, 30EPM, 30PM, 40PM, 50PM` | Yes | No |
| `80000175-039` | all extracted PM/EPM models including `40PM` | Yes | No |

Rule:

- One manufacturer part number may fit multiple compressor models.
- AI Draft should show all compatible models as evidence.
- Shared compatibility does not approve stock movement or inventory deduction.

## 7. NeedsSkuApproval

| Service line | Manufacturer technical match | Internal SKU exists? | NeedsSkuApproval | Reason |
|---|---|---|---|---|
| Air Filter | `HIGH` | No approved internal SKU found | `true` | Technical manufacturer part exists, but Tal internal SKU identity is not approved |
| Oil Filter | `HIGH` | No approved internal SKU found | `true` | Technical manufacturer part exists, but Tal internal SKU identity is not approved |
| Oil handling | `MEDIUM` | No approved internal SKU found | `true` | Internal SKU missing; oil action and quantity unresolved |

Interpretation:

- `NeedsSkuApproval = true` does not mean the manufacturer evidence is weak.
- It means Tal inventory identity is not approved yet.

## 8. NeedsQuantityApproval

| Service line | Service quantity evidence | Inventory quantity evidence | NeedsQuantityApproval | Reason |
|---|---|---|---|---|
| Air Filter | Report has 2 SCR-40PM equipment rows and both replaced air filter | No approved inventory transaction quantity | `true` | Candidate service quantity may be 2, but stock action quantity is not approved |
| Oil Filter | Report has 2 SCR-40PM equipment rows and both replaced oil filter | No approved inventory transaction quantity | `true` | Candidate service quantity may be 2, but stock action quantity is not approved |
| Oil handling | Expected by Small Service rule, not explicit in report | No approved oil action/quantity or stock transaction | `true` | Oil quantity/action unresolved |

Rule:

- Quantity in stock may only update from approved purchase receipt, approved stock movement, or approved inventory transaction.
- Service report evidence can support draft quantity review, but it cannot update stock or deduct inventory.

## 9. Stock Action Status

Stock action status: `NOT_ALLOWED`.

| Action | Status | Reason |
|---|---|---|
| Inventory quantity update | `NOT_ALLOWED` | No approved purchase receipt, stock movement, or inventory transaction |
| Inventory deduction | `NOT_ALLOWED` | No approved BusinessDocument/invoice workflow and no inventory transaction gate |
| Inventory reservation | `NOT_ALLOWED` | No approved inventory workflow |
| AI Draft suggestion | Evidence-only allowed | May suggest evidence with approval flags, but cannot alter stock |

## 10. What Would Be Needed Before Stock Update

Before stock quantity can be updated, the system needs:

1. Approved internal SKU mapping.
2. Manufacturer part number or approved equivalent linked to that internal SKU.
3. Purchase receipt, received-stock evidence, or approved stock movement.
4. Confirmed received quantity.
5. Audit evidence for source/order/receipt.
6. Approved inventory transaction gate.
7. Explicit approval for any DB/schema/import/runtime implementation if not already approved.

Not enough for stock update:

- manufacturer workbook row
- AI Draft recommendation
- service report evidence
- Maven invoice history
- pricing evidence
- purchase order without received-stock evidence

## 11. What Would Be Needed Before Stock Deduction

Before stock deduction can occur, the system needs:

1. Approved BusinessDocument / invoice workflow.
2. Confirmed internal SKU.
3. Confirmed manufacturer part number or approved equivalent.
4. Confirmed compatible compressor model.
5. Confirmed service quantity.
6. Approved quantity.
7. Audit evidence.
8. Separate inventory transaction gate.

Not enough for stock deduction:

- this evidence packet
- AI Draft
- service report alone
- compatibility evidence
- Pricing Evidence Engine output
- Maven history
- recommendation alone

## 12. No Price Approval From Inventory Evidence

Inventory evidence does not approve customer price.

Rules:

- Manufacturer workbook cost is internal cost evidence only.
- Internal SKU identity is not customer selling price.
- Compatible model evidence is not customer selling price.
- Stock quantity is not customer selling price.
- Customer price must come from Maven/history/pricing evidence and still follow `NeedsPriceApproval` rules.

## 13. Key Evidence Summary

| Evidence | Status |
|---|---|
| Exact equipment model `SCR-40PM` | Present |
| Liad-approved manufacturer lookup `40PM = SCR-40PM` | Present |
| Small Service `2000h` rule | Present |
| Air Filter manufacturer part `25100043-071` | Present |
| Oil Filter manufacturer part `25200007-005` | Present |
| Oil/Coolant manufacturer part `80000175-039` | Present but action/quantity unresolved |
| Tal internal SKU mapping | Missing |
| Approved stock quantity evidence | Missing |
| Approved stock movement / purchase receipt | Missing |
| Approved inventory transaction gate | Missing |
| Price approval | Not provided by this packet |

## 14. Missing Information

Missing before inventory automation:

- Approved Tal internal SKU for each manufacturer part number.
- Approved mapping for manufacturer part number to internal SKU or equivalent.
- Current quantity in stock from approved inventory source.
- Purchase receipt or stock movement evidence.
- Inventory transaction design.
- Runtime inventory gate approval.
- Approved service quantity policy for two equipment rows on one report.
- Oil handling action and quantity for SCR-40PM 2000h service.
- Any price approval source; pricing belongs to the Pricing Evidence Engine.

## 15. Risk Review

Risk level: `LOW` for this documentation packet.

Operational risks if misused:

- Treating manufacturer part number as internal SKU could deduct the wrong stock item.
- Treating service report quantity as stock deduction quantity could bypass approval.
- Treating shared compatibility as duplicate/conflict could damage manufacturer evidence.
- Treating purchase/order evidence as received stock could overstate inventory.
- Treating inventory evidence as customer price could produce unsafe pricing.
- Treating AI Draft evidence as stock action could bypass inventory governance.

## 16. Conclusion

For `SCR-40PM` 2000h Small Service, the current knowledge graph can support an inventory evidence preview:

- Air Filter: manufacturer part `25100043-071`.
- Oil Filter: manufacturer part `25200007-005`.
- Oil handling: manufacturer part `80000175-039`, review-only until action/quantity is approved.

The packet cannot support stock updates or stock deduction.

All inventory actions remain blocked until internal SKU mapping, quantity evidence, stock movement evidence, and the inventory transaction gate are approved.

## 17. Recommended Next Task

Create an `Internal SKU Mapping Decision Packet` for the two strongest SCR-40PM small-service parts:

- `25100043-071` Air Filter.
- `25200007-005` Oil Filter.

The packet should answer whether Tal wants the internal SKU to equal the manufacturer part number or use a separate Tal SKU, with no DB write or inventory action.
