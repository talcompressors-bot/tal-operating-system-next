# Service Report 5806 Commercial Evidence Packet

Date: 2026-06-24
Mode: read-only evidence packet.
Scope: Service Report `5806` / `1e25bbb1`.

No code, DB write, Prisma change, import, inventory action, BusinessDocument creation, Maven/Invoice4U action, Apps Script change, Google Sheets change, or runtime workflow change is approved by this packet.

## Executive Answer

Service Report `5806` has proven commercial linkage to Maven history.

The strongest commercial proof is in `InvoiceMavenDocuments.RawJson` and `InvoiceMavenDocumentItems`:

- Maven docs `102451` and `102452` directly reference `דוח שירות 5806`, customer `רמות מלונקס בע"מ`, model `40PM`, and small-service compressor kit lines.
- Maven doc `102453` directly references `דוח שירות 5806`, but it is dryer/filter-element work, not SCR-40PM compressor-kit evidence.
- Historical same-customer / same-model Maven rows show repeated SCR/40PM small-service kit pricing, labor/service pricing, travel pricing, and oil evidence.

This packet can safely support future AI Draft evidence. It does not approve automatic AI Draft creation, BusinessDocument creation, Maven action, inventory action, or automatic price approval.

## 1. Service Report Summary

| Field | Evidence |
|---|---|
| Service report | `5806` |
| ReportID | `1e25bbb1` |
| Customer | `18953` / `רמות מלונקס בע"מ` |
| Service date | `10/05/2026` |
| Service type | `טיפול תקופתי` / Small Service evidence |
| Equipment model | `SCR-40PM` |
| Manufacturer lookup alias | `40PM = SCR-40PM` |
| Equipment serials | `SW854751`; `SW851838` |
| Equipment rows | `2` |

Equipment rows from prior evidence:

| Equipment row | Model | Serial | Service text | Parts identified |
|---|---|---|---|---|
| `e8c32b28` | `SCR-40PM` | `SW854751` | `בוצע טיפול קטן-2000` | Air filter replaced; Oil filter replaced |
| `6bb28e16` | `SCR-40PM` | `SW851838` | `טיפול תקופתי קטן 2000` | Air filter replaced; Oil filter replaced |

Expected service lines from service-pattern intelligence:

- Air Filter.
- Oil Filter.
- Oil handling.

Manufacturer technical candidates:

| Service line | Manufacturer part number | Technical status |
|---|---|---|
| Air Filter | `25100043-071` | Compatible with `40PM`; manufacturer evidence |
| Oil Filter | `25200007-005` | Compatible with `40PM`; manufacturer evidence |
| Oil / Coolant | `80000175-039` | Compatible with `40PM`; action/quantity unresolved |

## 2. Linked Maven Documents

Direct Maven documents found by searching `InvoiceMavenDocuments.RawJson` for `דוח שירות 5806`:

| Maven doc | MavenDocumentId | Date | Customer | Description evidence | Link confidence | Notes |
|---|---|---|---|---|---|---|
| `102451` | `fcd78410-f07d-4446-b2aa-003b43af7f01` | `2026-05-18` | `רמות מלונקס בע"מ` | `טיפול תקופתי קטן במדחס אוויר דגם 40PM ... [מס מדחס SW854751] ... (דוח שירות 5806)` | `HIGH` | Direct report + customer + model + full serial |
| `102452` | `ddd005be-13be-4077-b92f-adda55c811ce` | `2026-05-18` | `רמות מלונקס בע"מ` | `טיפול תקופתי קטן במדחס אוויר דגם 40PM ... [מס מדחס SW85183] ... (דוח שירות 5806)` | `HIGH_WITH_REVIEW` | Direct report + customer + model + partial serial; requires serial review |
| `102453` | `1a6f7c81-54d5-4cfb-a8d4-005f8cfbe03f` | `2026-05-18` | `רמות מלונקס בע"מ` | `החלפת אלמנטים במייבש אוויר ... (דוח שירות 5806)` | `HIGH_REPORT_LINK`, `LOW_COMPRESSOR_RELEVANCE` | Direct report link, but dryer/filter-element work, not SCR-40PM compressor service-kit evidence |

Direct linked item rows:

| Maven doc | Item row | Description | Qty | Unit price | Currency | AI Draft use |
|---|---|---|---:|---:|---|---|
| `102451` | `fcd78410-f07d-4446-b2aa-003b43af7f01_0` | `קיט טיפול קטן הכולל פילטר שמן, פילטר אוויר והוספת שמן סינטטי` | 1 | 1213.38 | ILS | Direct SCR-40PM small-service kit pricing evidence |
| `102451` | `fcd78410-f07d-4446-b2aa-003b43af7f01_2` | `נסיעה (חוייב פעם אחת)` | 1 | 0 | ILS | Direct travel/no-charge evidence; not general travel price |
| `102452` | `ddd005be-13be-4077-b92f-adda55c811ce_0` | `קיט טיפול קטן הכולל פילטר שמן, פילטר אוויר והוספת שמן סינטטי` | 1 | 1213.38 | ILS | Direct SCR-40PM small-service kit pricing evidence |
| `102452` | `ddd005be-13be-4077-b92f-adda55c811ce_2` | `נסיעה` | 1 | 0 | ILS | Direct travel/no-charge evidence; not general travel price |
| `102453` | `1a6f7c81-54d5-4cfb-a8d4-005f8cfbe03f_0` | `אלמנט קו סינון` | 2 | 500 | ILS | Report-linked dryer/filter element, not compressor service-kit part evidence |
| `102453` | `1a6f7c81-54d5-4cfb-a8d4-005f8cfbe03f_1` | `עבודה + שירות` | 1.5 | 250 | ILS | Report-linked labor/service evidence |
| `102453` | `1a6f7c81-54d5-4cfb-a8d4-005f8cfbe03f_2` | `נסיעה` | 1 | 250 | ILS | Report-linked travel evidence for dryer/filter work |

## 3. Link Evidence

| Evidence type | Result | Confidence impact |
|---|---|---|
| Report number | `דוח שירות 5806` appears in Maven docs `102451`, `102452`, `102453` | Strong direct link |
| Customer match | Maven customer is `רמות מלונקס בע"מ`, matching Service Report 5806 customer | Strong direct link |
| Date proximity | Service date `10/05/2026`; Maven docs dated `2026-05-18`, 8 days later | Strong enough for billing linkage when report number is present |
| Model evidence | Docs `102451` and `102452` include `40PM` and `SCR COMP` | Strong compressor link |
| Serial evidence | Doc `102451` includes full `SW854751`; doc `102452` includes partial `SW85183` | Full serial strong; partial serial supports but needs review |
| Service-pattern evidence | Docs `102451` and `102452` say small periodic service and include small-service kit line | Strong service-pattern link |
| Item descriptions | Small-service kit line explicitly includes oil filter, air filter, and added synthetic oil | Strong bundled part evidence; weak individual part-price evidence |

Conclusion:

- `102451`: `HIGH` commercial link to `SW854751`.
- `102452`: `HIGH_WITH_REVIEW` commercial link to the second SCR-40PM row because the serial is partial.
- `102453`: `HIGH` report link, but not compressor-kit evidence.

## 4. Historical Pricing Evidence

Important pricing boundary:

For the linked and same-customer SCR/40PM Maven history, Air Filter and Oil Filter are usually priced inside a bundled small-service kit line. The current evidence supports kit pricing strongly, but does not prove separate customer selling prices for each individual filter.

### Air Filter

| Evidence type | Historical price | Occurrences in this packet | Date range | Confidence |
|---|---:|---:|---|---|
| Bundled small-service kit including air filter | 1134.00 to 1213.38 ILS per kit | 6 verified rows | `2025-01-27` to `2026-05-18` | `HIGH` for bundled kit, `LOW` for separate air-filter price |
| Separate Air Filter line | Not found in linked SCR-40PM packet | 0 | N/A | `NO_DIRECT_PRICE` |

Verified bundled kit rows:

- `101920` on `2025-01-27`: 1134.00 ILS.
- `102132` on `2025-07-21`: 1134.00 ILS.
- `102227` on `2025-10-31`: 1134.00 ILS.
- `2833` on `2025-10-29`: 1213.38 ILS, quote/offer document type `10`.
- `102451` on `2026-05-18`: 1213.38 ILS, direct report `5806`.
- `102452` on `2026-05-18`: 1213.38 ILS, direct report `5806`.

AI Draft use:

- Safe to cite as `small-service kit price evidence`.
- Not safe to split into individual Air Filter price without a pricing allocation rule.

### Oil Filter

| Evidence type | Historical price | Occurrences in this packet | Date range | Confidence |
|---|---:|---:|---|---|
| Bundled small-service kit including oil filter | 1134.00 to 1213.38 ILS per kit | 6 verified rows | `2025-01-27` to `2026-05-18` | `HIGH` for bundled kit, `LOW` for separate oil-filter price |
| Separate Oil Filter line | Not found in linked SCR-40PM packet | 0 | N/A | `NO_DIRECT_PRICE` |

AI Draft use:

- Safe to cite as bundled kit evidence.
- Not safe to price Oil Filter separately from this packet.

### Oil / Coolant

| Evidence type | Historical price | Occurrences in this packet | Date range | Confidence |
|---|---:|---:|---|---|
| Bundled small-service kit includes added synthetic oil | 1134.00 to 1213.38 ILS per kit | 6 verified rows | `2025-01-27` to `2026-05-18` | `MEDIUM` for oil handling evidence, not separate oil price |
| Separate oil line in same customer/SCR40PM history | 80.00 ILS per unit/liter, quantity 8 | 1 verified row | `2024-03-27` | `MEDIUM` |
| Manufacturer coolant part `80000175-039` | Vendor cost only | Manufacturer evidence only | N/A | Not selling price |

Verified separate oil row:

- Maven doc `101611`, `2024-03-27`, `שמן`, qty `8`, unit price `80.00` ILS.

AI Draft use:

- Safe to cite oil handling as expected service evidence.
- Price for oil/coolant remains approval-required because action and quantity differ by service context.

### Labor / Service

| Evidence type | Historical price | Occurrences in this packet | Date range | Confidence |
|---|---:|---:|---|---|
| Same-customer SCR/40PM labor/service lines | 225.00 to 250.00 ILS per unit/hour | 4 verified rows | `2024-03-27` to `2026-05-18` | `MEDIUM_HIGH` |

Verified rows:

- `101611`, `2024-03-27`: `עבודה + שירות`, qty `1.5`, unit `225.00`.
- `101768`, `2024-09-05`: `עבודה + שירות`, qty `1`, unit `225.00`.
- `102338`, `2026-01-31`: labor/service visit line, qty `3`, unit `250.00`.
- `102453`, `2026-05-18`: `עבודה + שירות`, qty `1.5`, unit `250.00`, report `5806` dryer/filter work.

AI Draft use:

- Safe as labor/service pricing evidence with `NeedsPriceApproval = true`.
- Requires service-context check because labor may be bundled into kit in `102451` and `102452`.

### Technician Visit / Travel

| Evidence type | Historical price | Occurrences in this packet | Date range | Confidence |
|---|---:|---:|---|---|
| Direct report 5806 compressor travel rows | 0.00 ILS | 2 verified rows | `2026-05-18` | `HIGH` for report-specific no-charge/charged-once evidence |
| Same-customer SCR/40PM paid travel rows | 225.00 to 250.00 ILS | 6 verified rows | `2024-03-27` to `2026-01-31` | `MEDIUM_HIGH` |
| Report 5806 dryer/filter travel row | 250.00 ILS | 1 verified row | `2026-05-18` | `MEDIUM`, separate work context |

Verified rows:

- `102451`: travel `(חוייב פעם אחת)`, unit `0.00`.
- `102452`: travel, unit `0.00`.
- `101920`: travel, unit `225.00`.
- `102132`: travel, unit `225.00`.
- `102227`: travel, unit `225.00`.
- `101768`: travel, unit `225.00`.
- `101611`: travel, unit `225.00`.
- `102338`: travel, unit `250.00`.
- `102453`: travel, unit `250.00`, dryer/filter work tied to report `5806`.

AI Draft use:

- Direct report evidence says compressor travel was zero/charged once across the two compressor docs.
- Historical paid travel evidence supports a likely range of `225.00-250.00` ILS for this customer/model context.
- Travel remains approval-required if a current business rule says another value.

## 5. Pricing Conflicts

| Area | Historical evidence | Current / rule evidence | Conflict | Required behavior |
|---|---:|---:|---|---|
| Travel / visit | Direct compressor docs: `0.00`; same-customer history: `225.00-250.00` | SCR preview previously carried fixed visit rule `300 NIS` | Yes | Do not auto-price travel; show evidence and require approval |
| Small-service kit | Historical kit rows: `1134.00-1213.38` | Manufacturer part costs are not selling price | No direct conflict; source-type conflict if misused | Use Maven kit history for selling price; do not use vendor cost as customer price |
| Air Filter / Oil Filter separate prices | No direct separate line price in linked SCR-40PM packet | Manufacturer part numbers exist | Evidence gap | Do not split kit price into separate filter prices without approval |
| Oil / coolant | Kit includes oil handling; separate oil row `80.00` x8 in service-call history | Manufacturer coolant evidence exists | Context mismatch | Treat oil price/action/quantity as approval-required |
| Labor/service | Historical `225.00-250.00` | If current rule is `275 NIS/hour`, conflict exists | Yes | Require approval before applying current rule over history |

## 6. AI Draft Readiness Impact

Can this packet safely support pricing evidence?

Answer: `PARTIALLY`.

Why:

- YES for direct small-service kit pricing evidence: `1213.38` ILS in two report-5806 compressor docs.
- YES for historical kit range evidence: `1134.00-1213.38` ILS in same-customer SCR/40PM history.
- YES for labor/travel evidence ranges.
- NO for separate Air Filter and Oil Filter selling prices because Maven history bundles them into a kit line.
- NO for automatic price approval because travel/labor conflicts and document-type policy still require review.

Can this packet safely support service evidence?

Answer: `YES`.

Why:

- Report 5806 has exact SCR-40PM equipment rows.
- Both equipment rows show 2000h/small-service text.
- Maven docs `102451` and `102452` repeat small periodic service wording.
- Service pattern aligns with Liad-approved Small Service rule.

Can this packet safely support part evidence?

Answer: `PARTIALLY`.

Why:

- YES for Air Filter and Oil Filter expected lines.
- YES for manufacturer part candidates `25100043-071` and `25200007-005`.
- PARTIALLY for oil handling because action and quantity are not explicit.
- NO for inventory deduction or internal SKU approval.
- NO for separate customer selling prices for each individual part.

## 7. Remaining Blockers

What prevents:

```text
AI Draft Evidence
↓
AI Draft Recommendation
```

Exact blockers:

1. No approved AI Draft write/recommendation runtime for this packet.
2. No approved document-type policy for using Maven quote/invoice/receipt/credit rows.
3. Partial serial `SW85183` in Maven doc `102452` needs review before full serial normalization to `SW851838`.
4. Kit pricing cannot be automatically split into Air Filter, Oil Filter, and Oil lines.
5. Oil handling action and quantity are unresolved.
6. Travel pricing conflicts: direct report compressor rows are `0`, same-customer history is `225-250`, and existing rule evidence may be `300`.
7. Labor pricing conflicts: same-customer history is `225-250`, while current rule evidence may be `275`.
8. No approved stale-price / date-window policy.
9. No approved tax/VAT display policy for AI Draft pricing.
10. No BusinessDocument or Maven action is approved.
11. No inventory or internal SKU action is approved.

## 8. Shortest Path To Future Approval-Based AI Draft Recommendation

Shortest safe path:

1. Approve using Maven docs `102451` and `102452` as `HIGH` link evidence for report `5806`, with `102452` marked `partial serial review`.
2. Approve AI Draft recommendation output shape as evidence-only:
   - title/header includes `SCR-40PM`
   - service type `2000h Small Service`
   - line option A: one bundled small-service kit line
   - line option B: separate expected part lines with kit-price allocation blocked
3. Decide pricing behavior for the compressor small-service kit:
   - reuse linked report price `1213.38` as recommendation evidence, or
   - require Liad price approval every time.
4. Decide travel rule:
   - keep report-specific `0.00` travel for the second compressor row when charged once, or
   - apply fixed/current travel rule with approval flag.
5. Decide labor rule:
   - use historical `225-250` evidence, or
   - apply current rule with approval flag.
6. Keep oil handling as `NeedsQuantityApproval = true` until action/quantity rule is approved.
7. Implement nothing until a later approved runtime task; this packet only proves evidence readiness.

Minimum approval-ready recommendation that this packet supports:

- Draft title/header: `SCR-40PM - 2000h Small Service - Report 5806`.
- Suggested commercial line: bundled small-service kit including oil filter, air filter, and added synthetic oil.
- Suggested evidence price: `1213.38 ILS`, source Maven docs `102451` and `102452`.
- Travel: `0.00 ILS` on linked compressor docs, with note that travel was charged once; approval required if applying another rule.
- Labor: no separate labor line in compressor kit docs; historical labor range `225-250 ILS` if needed, approval required.
- Flags: `NeedsPriceApproval = true`, `NeedsQuantityApproval = true` for oil handling, no inventory action.

## 9. Evidence Sources

Local Project Brain / repository docs:

- `SCR_40PM_SERVICE_KIT_EVIDENCE_PACKET.md`
- `SERVICE_REPORT_MAVEN_LINK_REGISTRY_SPEC.md`
- `Commercial_Intelligence_Verification.md`
- `AI_DRAFT_EVIDENCE_PACKET.md`
- `SCR_MATCHING_PREVIEW.md`

Live read-only Google Sheets evidence:

- `ServiceApp_FIX` spreadsheet.
- `InvoiceMavenDocuments`, bounded search in `RawJson` for `דוח שירות 5806`.
- `InvoiceMavenDocumentItems`, bounded searches by `DocumentNumber` for `102451`, `102452`, `102453`, `101920`, `102132`, `102227`, `101768`, `101611`, `102338`, and `2833`.

## 10. Final Status

This packet proves commercial linkage and usable historical pricing evidence for Service Report `5806`.

Readiness:

- Service evidence: `YES`.
- Part evidence: `PARTIALLY`.
- Pricing evidence: `PARTIALLY`.
- Approval-based AI Draft recommendation readiness: `PARTIALLY`, close to `YES` after the pricing conflict decisions above.

No implementation was performed.
