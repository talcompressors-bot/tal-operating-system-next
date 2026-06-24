# SCR-40PM Service Kit Evidence Packet

Date: 2026-06-24

Scope: `SCR-40PM` only.

Mode: read-only evidence packet.

Runtime impact: none. No code, DB write, Prisma change, import, inventory action, BusinessDocument creation, Maven/Invoice4U action, or runtime workflow change was performed.

## 1. Equipment Identity Evidence

| Field | Evidence |
|---|---|
| Observed model | `SCR-40PM` |
| Equipment type | `מדחס אויר` |
| Equipment subtype | `בורגי` |
| Service report | `5806` / `1e25bbb1` |
| Customer | `18953` / `רמות מלונקס בע"מ` |
| Equipment rows | `2` |
| Serial numbers | `SW854751`; `SW851838` |
| Current hours | `23235`; `32327` |
| Next service text | `25230-4000`; `34320-4000` |
| Identity confidence | `MEDIUM` |

Reasoning:

- `SCR-40PM` is an exact raw model string in `ReportEquipmentItems.csv`.
- Both rows are the same equipment class and subtype.
- Both rows are from one service report/customer, so the evidence is strong for report-level use but not broad enough for global automatic identity rules.
- This packet treats `SCR-40PM` as an evidence bucket only, not a normalized master model.

## 2. Approved Aliases / Non-Approved Aliases

| Alias / model token | Status | Evidence | AI Draft use |
|---|---|---|---|
| `SCR-40PM` | Observed exact model | Service report `5806` has two exact rows | Safe as exact observed evidence |
| `40PM` | Manufacturer workbook model candidate | PM workbook covers `40PM`; existing source-of-truth report maps `40PM` as PM model | Allowed only as manufacturer lookup candidate after alias governance |
| `SCR40PM` | Candidate text-normalized alias | `SCR-40PM -> SCR40PM -> 40PM` appears in `SCR_MATCHING_PREVIEW.md` | Review/logic evidence only; not a persisted merge |
| `SCR40APM`, `40APM` | PM/APM alias family candidate | PM/APM family requires approved alias governance | Not approved for automatic merge |
| Generic `40PM` from free text | Not approved | Could be model text or generic fragment | Do not use without exact equipment/model evidence |
| Generic 40 HP compressor | Not approved | Horsepower is attribute only | Do not auto-match SKU |

## 3. 2000h Small Service Expected Parts

Liad-approved Small Service rule:

- `2000h` / `2500h` service = Small Service.
- Small Service always includes Air Filter, Oil Filter, and Oil handling.
- For SCR compressors, oil handling is often top-up / added oil, but action type must not be assumed without model/service evidence.

Observed `SCR-40PM` service rows:

| ItemID | Service text | Air filter | Oil filter | Oil separator | Oil handling |
|---|---|---|---|---|---|
| `e8c32b28` | `בוצע טיפול קטן-2000` | `הוחלף` | `הוחלף` | blank | blank |
| `6bb28e16` | `טיפול תקופתי קטן 2000` | `הוחלף` | `הוחלף` | blank | blank |

Small-service candidate lines:

| Part category | Manufacturer part number | Part description | Compatible manufacturer models | NeedsSkuApproval | NeedsPriceApproval | Confidence |
|---|---|---|---|---|---|---|
| Air Filter | `25100043-071` | air filter core | `25EPM, 30EPM, 30PM, 40PM` | `false` for exact `SCR-40PM -> 40PM` evidence packet; `true` if alias not approved in runtime | `true` | `HIGH` technical evidence, `LOW` price evidence |
| Oil Filter | `25200007-005` | Oil Filter | `10PM2, 15PM2, 20PM2, 25EPM, 30EPM, 30PM, 40PM, 50PM` | `false` for exact `SCR-40PM -> 40PM` evidence packet; `true` if alias not approved in runtime | `true` | `HIGH` technical evidence, `LOW` price evidence |
| Oil handling | `80000175-039` | Coolant | `100EPM, 100PM, 10PM2, 125EPM, 150EPM, 15PM2, 20PM2, 25EPM, 30EPM, 30PM, 40EPM, 40PM, 50EPM, 50PM, 60EPM, 60PM, 75EPM, 75PM, 90EPM` | `true` until quantity/action approved | `true` | `MEDIUM` technical evidence, `LOW` price evidence |

Conservative small-service AI Draft evidence:

- Air Filter and Oil Filter are the safest `2000h` evidence lines.
- Oil handling is expected by rule but needs action/quantity approval because the two observed `SCR-40PM` rows do not explicitly record oil added/replaced.

## 4. 4000h / 5000h Large Service Expected Parts

Liad-approved Large Service rule:

- `4000h` / `5000h` service = Large Service.
- Large Service always includes Air Filter, Oil Filter, Oil Separator, and Oil.

Manufacturer interval evidence:

- `PM_EPM_SPARE_PARTS_SOURCE_OF_TRUTH_REPORT.md` states model `40PM` has `4` candidate rows at `4000H`.
- The current markdown evidence does not expose every row-level `4000H` quantity for `40PM`; therefore exact quantities remain approval-required.

Large-service candidate lines:

| Part category | Manufacturer part number | Part description | Compatible manufacturer models | NeedsSkuApproval | NeedsPriceApproval | Confidence |
|---|---|---|---|---|---|---|
| Air Filter | `25100043-071` | air filter core | `25EPM, 30EPM, 30PM, 40PM` | `false` for exact packet evidence; `true` if runtime alias not approved | `true` | `HIGH` technical evidence, `LOW` price evidence |
| Oil Filter | `25200007-005` | Oil Filter | `10PM2, 15PM2, 20PM2, 25EPM, 30EPM, 30PM, 40PM, 50PM` | `false` for exact packet evidence; `true` if runtime alias not approved | `true` | `HIGH` technical evidence, `LOW` price evidence |
| Oil Separator | `25300045-023` | oil separator | `25EPM, 30EPM, 30PM, 40PM` | `false` for exact packet evidence; `true` if runtime alias not approved | `true` | `HIGH` technical evidence, `LOW` price evidence |
| Oil / Coolant | `80000175-039` | Coolant | all extracted PM/EPM models including `40PM` | `true` until action/quantity approved | `true` | `MEDIUM` technical evidence, `LOW` price evidence |

Large-service conclusion:

- The expected part categories are governed and approved.
- The compatible manufacturer part numbers are available as technical evidence.
- Exact quantity and selling price are not approved by this packet.

## 5. Manufacturer Part-Number Evidence

Manufacturer workbook evidence is technical SKU/model evidence only.

| Part number | Part description | Series | Shared models | Cost evidence status | Selling price status |
|---|---|---|---|---|---|
| `25100043-071` | air filter core | EPM, PM | `25EPM, 30EPM, 30PM, 40PM` | Vendor USD cost exists in source report | Not approved |
| `25200007-005` | Oil Filter | EPM, PM | `10PM2, 15PM2, 20PM2, 25EPM, 30EPM, 30PM, 40PM, 50PM` | Vendor USD cost exists in source report | Not approved |
| `25300045-023` | oil separator | EPM, PM | `25EPM, 30EPM, 30PM, 40PM` | Vendor USD cost exists in source report | Not approved |
| `80000175-039` | Coolant | EPM, PM | all extracted PM/EPM models including `40PM` | Vendor USD cost exists in source report | Not approved |
| `00080002-003` | Airend 8BAR | PM | `30PM, 40PM` | Vendor USD cost exists in source report | Not relevant to normal service kit |
| `00080003-412` | Shaft Seal of Airend | PM | `30PM, 40PM` | Vendor USD cost exists in source report | Not relevant to normal service kit |
| `02450001-419` | Bearing of Airend | PM | `30PM, 40PM` | Vendor USD cost exists in source report | Not relevant to normal service kit |

## 6. Shared SKU Evidence

Shared manufacturer SKU compatibility is valid and is not a duplicate/conflict.

| Part number | Shared-model evidence | Conflict? |
|---|---|---|
| `25100043-071` | Shared by `25EPM, 30EPM, 30PM, 40PM` | No |
| `25200007-005` | Shared by `10PM2, 15PM2, 20PM2, 25EPM, 30EPM, 30PM, 40PM, 50PM` | No |
| `25300045-023` | Shared by `25EPM, 30EPM, 30PM, 40PM` | No |
| `80000175-039` | Shared by every extracted PM/EPM model | No |

AI Draft should show all compatible models as evidence when presenting a candidate line.

## 7. Historical Service Evidence

Historical service data is operational evidence, not technical model truth and not price approval.

| Report | Customer | Equipment row | Model | Serial | Service type | Observed parts/service signals |
|---|---|---|---|---|---|---|
| `5806` | `18953` / `רמות מלונקס בע"מ` | `e8c32b28` | `SCR-40PM` | `SW854751` | `בוצע טיפול קטן-2000` | Air filter replaced; Oil filter replaced |
| `5806` | `18953` / `רמות מלונקס בע"מ` | `6bb28e16` | `SCR-40PM` | `SW851838` | `טיפול תקופתי קטן 2000` | Air filter replaced; Oil filter replaced |

Service pattern:

- Observed service is `2000h` / small service.
- Next service text points to `4000`, which supports future large-service expectation but does not prove a completed 4000h service for these rows.

## 8. Historical Pricing Evidence

Current usable historical selling-price evidence: not available.

| Source | Current status | Effect |
|---|---|---|
| `ProductsCatalog` in staging | No usable populated selling-price evidence for these SKUs | `NeedsPriceApproval = true` |
| `MavenDocumentItem` in staging | `0` rows in current staging evidence | no Maven historical selling price |
| `MavenItem` in staging | `0` rows in current staging evidence | no Maven item catalog price |
| `BusinessDocumentItem` in staging | `0` rows in current staging evidence | no internal historical selling price |
| Vendor workbook cost | Available as USD purchase/cost evidence | not customer selling price |

Pricing rule:

- Manufacturer SKU = technical evidence, not selling price.
- Maven history = selling price evidence, not technical model truth.
- Until Maven/Product/BusinessDocument price history is available and approved, every candidate line in this packet must keep `NeedsPriceApproval = true`.

## 9. Missing Manufacturer Evidence

Missing or unresolved:

- Approved persisted alias rule for `SCR-40PM -> 40PM`.
- Row-level manufacturer workbook extraction showing exact `40PM` quantities for each `2000H` / `4000H` candidate line inside this packet.
- Approved interpretation of service interval quantities: cumulative vs per-service.
- Approved selling-price policy.
- Approved inventory SKU mapping to internal stock items.
- Belt manufacturer SKU evidence for `SCR-40PM`; no belt line should be inferred from this packet.

## 10. NeedsSkuApproval Flags

| Scenario | NeedsSkuApproval | Reason |
|---|---|---|
| Exact observed `SCR-40PM` with governed `40PM` manufacturer lookup | `false` for evidence packet; runtime depends on alias approval implementation | Strong exact model + manufacturer model evidence |
| `SCR-40PM` without approved alias governance in runtime | `true` | Alias from observed model to manufacturer model must be governed |
| Generic `40 HP` / `מדחס 40 כ"ס` | `true` | Generic horsepower cannot auto-match SKU |
| Generic `מדחס בורגי` | `true` | Generic compressor description is not model identity |
| Oil/coolant line for 2000h service | `true` | Expected service pattern exists, but observed row does not prove action/quantity |
| Belt line | `true` | No manufacturer evidence in PM/EPM workbook extraction |

## 11. NeedsPriceApproval Flags

All candidate parts in this packet require price approval.

| Part number | NeedsPriceApproval | Reason |
|---|---|---|
| `25100043-071` | `true` | Vendor cost only; no Maven/Product/BusinessDocument selling price |
| `25200007-005` | `true` | Vendor cost only; no Maven/Product/BusinessDocument selling price |
| `25300045-023` | `true` | Vendor cost only; no Maven/Product/BusinessDocument selling price |
| `80000175-039` | `true` | Vendor cost only; action/quantity and selling price unresolved |

## 12. Confidence Per Part

| Service | Part category | Part number | Technical confidence | Price confidence | Overall AI Draft status |
|---|---|---|---|---|---|
| 2000h Small Service | Air Filter | `25100043-071` | `HIGH` | `NEEDS_APPROVAL` | Safe evidence line, not approved price |
| 2000h Small Service | Oil Filter | `25200007-005` | `HIGH` | `NEEDS_APPROVAL` | Safe evidence line, not approved price |
| 2000h Small Service | Oil handling | `80000175-039` | `MEDIUM` | `NEEDS_APPROVAL` | Review-only evidence line |
| 4000h / 5000h Large Service | Air Filter | `25100043-071` | `HIGH` | `NEEDS_APPROVAL` | Safe evidence line, not approved price |
| 4000h / 5000h Large Service | Oil Filter | `25200007-005` | `HIGH` | `NEEDS_APPROVAL` | Safe evidence line, not approved price |
| 4000h / 5000h Large Service | Oil Separator | `25300045-023` | `HIGH` | `NEEDS_APPROVAL` | Safe evidence line, not approved price |
| 4000h / 5000h Large Service | Oil / Coolant | `80000175-039` | `MEDIUM` | `NEEDS_APPROVAL` | Review-only evidence line |

## 13. What Must Not Be Inferred

Do not infer:

- generic `40 HP` compressor = `SCR-40PM`
- generic screw compressor = `SCR-40PM`
- `SCR-40PM` = `SCR40APM` without approved alias governance
- shared SKU = duplicate/conflict
- manufacturer USD cost = customer selling price
- service report evidence = manufacturer technical truth
- Maven price history = model compatibility truth
- next service `4000` text = completed 4000h service
- oil action type or oil quantity without explicit evidence
- belt SKU for `SCR-40PM` from the PM/EPM workbook evidence
- inventory deduction from this packet
- automatic BusinessDocument creation from this packet

## 14. What Is Safe For AI Draft Evidence

Safe evidence uses:

- exact observed model: `SCR-40PM`
- manufacturer lookup candidate: `40PM`
- exact service pattern: `2000h` / small service for report `5806`
- expected service pattern: `4000h` / large service for future review because next-service text includes `4000`
- manufacturer compatible SKU evidence:
  - `25100043-071` Air Filter
  - `25200007-005` Oil Filter
  - `25300045-023` Oil Separator
  - `80000175-039` Coolant/Oil evidence
- shared compatible models as displayed evidence
- `NeedsSkuApproval` and `NeedsPriceApproval` flags where required

## 15. What Is Not Safe For AI Draft Automation

Not safe:

- writing `AiDraftSuggestion`
- creating `BusinessDocument` or `BusinessDocumentItem`
- sending or creating Maven/Invoice4U documents
- deducting inventory
- assigning customer selling price from vendor cost
- using generic model text for SKU matching
- auto-approving `SCR-40PM -> 40PM` in runtime without alias governance
- auto-using oil/coolant quantity
- auto-using 4000h kit quantities before interval semantics are approved

## 16. Evidence Packet Conclusion

For `SCR-40PM`, AI Draft can safely show a read-only evidence recommendation:

- Small service `2000h`: Air Filter `25100043-071`, Oil Filter `25200007-005`, oil handling review.
- Large service `4000h` / `5000h`: Air Filter `25100043-071`, Oil Filter `25200007-005`, Oil Separator `25300045-023`, Oil/Coolant `80000175-039`.

Every line must remain evidence-only with approval flags until alias governance, quantity interpretation, selling price evidence, and write workflows are approved.

Recommended next task:

- Create the same read-only evidence packet for `SCR50EPM`, because the service history has exact `SCR50EPM` observations and the manufacturer workbook has exact `50EPM` coverage.
