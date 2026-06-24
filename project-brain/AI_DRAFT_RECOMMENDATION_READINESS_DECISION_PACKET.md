# AI Draft Recommendation Readiness Decision Packet

Date: 2026-06-24
Mode: decision packet only
Scope: Service Report `5806` / `1e25bbb1`, SCR-40PM 2000h Small Service

No implementation, DB write, Prisma change, import, BusinessDocument creation, BusinessDocumentItem creation, Maven/Invoice4U action, inventory action, Google Sheets write, Apps Script change, or runtime workflow change is approved by this packet.

## Executive Answer

Current AI Draft Recommendation status:

`PARTIALLY`

Target status:

`READY_FOR_APPROVAL_BASED_DRAFTS`

The remaining blockers are not raw evidence blockers. They are approval-decision blockers.

The evidence is strong enough to support an approval-based AI Draft recommendation for Service Report `5806` if Liad approves six decision rules:

1. Kit Price Rule.
2. Default Service Component Evaluation Rule.
3. Labor Rule.
4. Technician Visit / Travel Rule.
5. Oil Quantity Rule.
6. Partial Serial Rule.

Global business document reasoning model correction:

This rule applies to all business documents, not only quotes:

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

Compressor service recommendations must evaluate:

1. Parts lines.
2. Oil handling line if needed.
3. Labor + Service.
4. Technician Visit / Travel.

Every generated or suggested document line must show `INCLUDED`, `EXCLUDED`, or `NEEDS_APPROVAL`. The document must explain why each line is included, excluded, or approval-required. Technical part evidence alone is not a complete compressor service recommendation.

Commercial line correction:

- Technician Visit / Travel is one line.
- Do not generate separate Technician Visit and Travel lines.
- Labor + Service is one line.
- Do not split Labor and Service unless Liad explicitly approves an exception.
- Do not double-charge travel.
- Do not double-charge technician visit.
- Do not double-charge service/labor.
- Historical bundled kit price must explain whether it covers parts only, parts + labor/service, or parts + labor/service + technician visit/travel.

Recommended readiness model:

```text
Evidence packet exists
-> approval decisions recorded
-> AI Draft may generate recommendation preview
-> every generated draft still requires user approval
-> no BusinessDocument/Maven/inventory action without later explicit approval
```

## Sources Used

- `project-brain/SERVICE_REPORT_5806_COMMERCIAL_EVIDENCE_PACKET.md`
- `AI_DRAFT_EVIDENCE_PACKET.md`
- `project-brain/PRICING_EVIDENCE_ENGINE_SPEC.md`
- `project-brain/MANUFACTURER_KNOWLEDGE_BASE.md`
- `project-brain/SERVICE_PATTERN_INTELLIGENCE_REGISTRY.md`
- `project-brain/maps/AI_DRAFT_FIELD_MAPPING.md`
- `agents/AI_DRAFT_AGENT.md`
- `agents/AI_DRAFT_EXECUTION_CHECKLIST.md`

## 1. Kit Price Rule

### Current Evidence

Service Report `5806` contains two exact `SCR-40PM` compressor equipment rows.

Both rows have small/2000h service evidence:

- `SCR-40PM`, serial `SW854751`, small-service text.
- `SCR-40PM`, serial `SW851838`, small-service text.

Liad-approved service pattern:

- `2000h / 2500h = Small Service`.
- Small Service expected lines: Air Filter, Oil Filter, Oil handling.

Direct Maven linked compressor documents:

| Document | Evidence | Kit line price |
|---|---|---:|
| `102451` | Report `5806`, customer match, `40PM`, full serial `SW854751` | `1213.38` ILS |
| `102452` | Report `5806`, customer match, `40PM`, partial serial `SW85183` | `1213.38` ILS |

Both linked compressor docs include a bundled small-service kit line containing:

- Oil Filter.
- Air Filter.
- Added synthetic oil.

### Historical Evidence

Same-customer / same-model SCR-40PM small-service kit history:

| Evidence type | Price range | Verified rows | Date range | Confidence |
|---|---:|---:|---|---|
| Bundled small-service kit | `1134.00-1213.38` ILS | 6 | `2025-01-27` to `2026-05-18` | `HIGH` for bundled kit |

Important boundary:

- Evidence is strong for a bundled small-service kit price.
- Evidence is weak for separate selling prices for Air Filter, Oil Filter, and Oil.
- Manufacturer part numbers are technical evidence, not selling-price evidence.

### Risks

| Risk | Level | Explanation |
|---|---|---|
| Splitting bundled kit into separate prices | High | Current Maven evidence prices the kit as one line, not individual filter/oil prices. |
| Treating repeated price as contract | Medium | Repeated price is strong evidence but not an approved customer contract. |
| Ignoring document type/status | Medium | Maven document type/status policy is not fully approved. |
| Using manufacturer cost as customer price | High | Explicitly forbidden by Pricing Evidence rules. |

### Recommended Decision

Approve this rule:

```text
For Service Report 5806 / SCR-40PM / 2000h Small Service,
AI Draft may recommend one bundled Small Service Kit line at 1213.38 ILS
as evidence-backed price, sourced from Maven docs 102451 and 102452.
```

Required flags:

- `priceSource = SAME_CUSTOMER_SAME_MODEL_MAVEN_HISTORY`
- `confidence = HIGH`
- `NeedsPriceApproval = true` until Liad approves a broader no-review reuse policy.
- Evidence rows must cite `102451` and `102452`.

Do not approve:

- splitting `1213.38` across Air Filter, Oil Filter, and Oil.
- using manufacturer cost as selling price.
- treating the price as a contract.
- applying this kit price to other customers/models automatically.

### What Happens If Approved

AI Draft can move from evidence-only to approval-based recommendation for the kit line:

| Draft line | Qty | Proposed unit price | Source | Required flag |
|---|---:|---:|---|---|
| SCR-40PM 2000h Small Service Kit | `2` or per-equipment line | `1213.38` ILS | Maven docs `102451`, `102452` | `NeedsPriceApproval = true` |

The draft can cite:

- exact report link.
- same customer.
- same model.
- matching service type.
- linked Maven item rows.

### What Happens If Not Approved

AI Draft can still list expected service lines but cannot recommend a price.

Result:

- `recommendedPrice = null`
- `NeedsPriceApproval = true`
- output remains `PARTIALLY`
- Liad must manually enter kit price.

## 1A. Default Service Component Evaluation Rule

### Current Evidence

The preview bug found that an AI Draft recommendation can look complete when it includes technical service parts but omits commercial service components.

For compressor service work, the default service pattern must evaluate:

| Standard line | Required evaluation |
|---|---|
| Parts lines | expected parts, observed replacements, manufacturer part evidence, SKU approval, price approval |
| Oil handling line if needed | whether oil is included in kit, needs separate action/quantity approval, or should be excluded as separate line |
| Labor + Service | whether labor/service is bundled, separate, missing, or approval-required; never split without explicit Liad exception |
| Technician Visit / Travel | whether visit/travel applies, is charged once, bundled, excluded, or approval-required; never split into two lines |

### Historical Evidence

Service Report `5806` proves why this matters:

- Parts and kit evidence exist in Maven docs `102451` and `102452`.
- Labor/service evidence exists in historical Maven rows and report-linked dryer/filter doc `102453`.
- Technician Visit / Travel has conflicting evidence: compressor docs show `0`, report-linked dryer/filter doc shows `250`, and fixed visit/travel rule says `300`.

### Risks

| Risk | Level | Explanation |
|---|---|---|
| Incomplete draft | High | Parts-only recommendations omit service business charges. |
| Hidden exclusions | High | If labor/service or visit/travel is omitted without explanation, Liad cannot review the decision. |
| Double billing | High | If labor/service or visit/travel is added without context, it may duplicate bundled kit or charged-once travel. |
| Pricing ambiguity | Medium | Labor/service and visit/travel have different historical and fixed-rule evidence. |

### Recommended Decision

Approve this global document-line rule:

```text
Every compressor service business document must evaluate Parts lines, Oil handling line if needed,
Labor + Service, and Technician Visit / Travel.
Each line must be marked INCLUDED, EXCLUDED, or NEEDS_APPROVAL,
with evidence and reasoning.
Technician Visit / Travel is one commercial line.
Labor + Service is one commercial line.
```

### What Happens If Approved

AI Draft previews and future generated customer-facing documents become complete business recommendations, not only technical parts recommendations.

For Service Report `5806`, the preview must explicitly show:

- Parts/kit included.
- Oil handling included in kit or approval-required as separate line.
- Labor + Service needs approval or is excluded if bundled.
- Technician Visit / Travel evaluated once, with conflict evidence.

### What Happens If Not Approved

AI Draft output can remain technically useful but commercially incomplete.

Result:

- recommendations may omit labor/service or visit/travel reasoning.
- Liad must manually detect missing business service lines.
- readiness should remain below `READY_FOR_APPROVAL_BASED_DRAFTS`.

## 2. Labor Rule

### Current Evidence

AI Draft governance already records a fixed labor rule:

- Technician labor: `275 NIS/hour`.

Service Report 5806 evidence:

- Compressor docs `102451` and `102452` price the compressor small service as a bundled kit line.
- No separate compressor labor line appears inside those two compressor kit docs.
- Maven doc `102453` is report-linked but dryer/filter work, not SCR-40PM compressor service-kit work.

### Historical Evidence

Same-customer SCR/40PM labor/service history:

| Document | Date | Description | Quantity | Unit price |
|---|---|---|---:|---:|
| `101611` | `2024-03-27` | Labor/service | `1.5` | `225.00` ILS |
| `101768` | `2024-09-05` | Labor/service | `1` | `225.00` ILS |
| `102338` | `2026-01-31` | Labor/service visit line | `3` | `250.00` ILS |
| `102453` | `2026-05-18` | Labor/service, report `5806`, dryer/filter context | `1.5` | `250.00` ILS |

Historical range:

- `225.00-250.00` ILS per labor/service unit.

Current fixed rule:

- `275.00` ILS/hour.

### Risks

| Risk | Level | Explanation |
|---|---|---|
| Double-charging labor | High | Compressor kit may already include service/labor; separate labor line could duplicate value. |
| Fixed rule conflicts with history | Medium | Current fixed rule is higher than observed same-customer history. |
| Unknown work time | Medium | Labor quantity must come from report/work-time evidence; if missing, quantity approval is required. |
| Dryer labor reused for compressor labor | Medium | `102453` is report-linked but not compressor-kit work. |

### Recommended Decision

Approve this rule:

```text
AI Draft may include labor only when technician work-time evidence exists
or when Liad explicitly wants labor shown separately from the kit.
Default labor unit price is 275 NIS/hour from the current fixed rule,
but Same-customer Maven history 225-250 ILS must be shown as conflict evidence.
```

Required flags:

- `NeedsPriceApproval = true` when using `275` against historical `225-250`.
- `NeedsQuantityApproval = true` when work time is missing or ambiguous.
- Add `possibleKitIncludesLabor = true` when kit line may already cover service labor.

### What Happens If Approved

AI Draft can include a labor line only with explicit evidence and approval flags:

| Draft line | Unit price | Source | Required flag |
|---|---:|---|---|
| Labor + Service | `275` ILS/hour | Fixed rule, with Maven conflict evidence | `NeedsPriceApproval = true` unless Liad approves current rule override |

The recommendation becomes usable but still approval-based.

### What Happens If Not Approved

AI Draft must omit separate labor from the recommendation or show it as unresolved:

- `recommendedPrice = null`
- `NeedsPriceApproval = true`
- `NeedsQuantityApproval = true`
- note: "Labor may be included in bundled small-service kit; Liad decision required."

## 3. Technician Visit / Travel Rule

### Current Evidence

AI Draft governance records a fixed visit rule:

- Technician visit / travel candidate: `300 NIS base visit`.

Direct Report 5806 compressor Maven docs show:

| Document | Travel evidence | Unit price |
|---|---|---:|
| `102451` | Travel charged once note | `0.00` ILS |
| `102452` | Travel line | `0.00` ILS |

Report-linked non-compressor doc:

| Document | Context | Travel price |
|---|---|---:|
| `102453` | Dryer/filter work tied to report `5806` | `250.00` ILS |

### Historical Evidence

Same-customer SCR/40PM paid travel history:

- `225.00-250.00` ILS.

Current rule:

- `300.00` ILS.

### Risks

| Risk | Level | Explanation |
|---|---|---|
| Charging travel twice | High | Report 5806 compressor docs indicate travel was charged once / zero on compressor rows. |
| Applying 300 over customer history | Medium | Same-customer history shows 225-250; fixed rule says 300. |
| Mixing compressor and dryer work | Medium | `102453` has 250 travel but belongs to dryer/filter work. |
| Hidden billing policy | Medium | Travel may be customer/location-specific or charged once per visit. |

### Recommended Decision

Approve this rule:

```text
For Service Report 5806, AI Draft must not auto-add 300 NIS travel
to each SCR-40PM compressor kit line.
Technician Visit / Travel should be represented as one approval-required commercial line.
AI Draft must not generate separate Technician Visit and Travel lines.
The recommendation must show direct evidence: compressor docs 102451/102452 = 0 ILS,
dryer/filter report doc 102453 = 250 ILS, current fixed rule = 300 ILS.
```

Recommended draft behavior:

- `recommendedPrice = null` or `300` only if Liad approves fixed rule override.
- `NeedsPriceApproval = true`.
- `NeedsQuantityApproval = false` only if one Technician Visit / Travel line is approved.

### What Happens If Approved

AI Draft can include one Technician Visit / Travel line with conflict evidence:

| Draft line | Qty | Proposed price | Source | Required flag |
|---|---:|---:|---|---|
| Technician Visit / Travel | `1` | `300` ILS if fixed rule approved, otherwise `null` | Fixed rule + Maven conflict evidence | `NeedsPriceApproval = true` |

The draft avoids duplicate per-compressor travel and avoids splitting visit/travel into two charges.

### What Happens If Not Approved

AI Draft cannot recommend Technician Visit / Travel price.

Result:

- Technician Visit / Travel appears as unresolved evidence only.
- `NeedsPriceApproval = true`.
- Liad must manually choose between `0`, `250`, `300`, or another price.

## 4. Oil Quantity Rule

### Current Evidence

Liad-approved Small Service rule:

- Small Service includes Air Filter, Oil Filter, Oil handling.

Oil handling governance:

- For SCR compressors, oil handling is often oil top-up / added oil.
- For ALUP or other compressor models, oil may be replacement.
- Do not assume oil action or quantity without model/service evidence.

Report 5806:

- Small-service kit line says added synthetic oil.
- Report equipment rows do not prove exact oil action or quantity.

Manufacturer technical candidate:

- `80000175-039` coolant/oil handling, compatible with `40PM`.
- Manufacturer evidence is technical/cost evidence only, not customer selling price.

### Historical Evidence

Oil evidence in packet:

| Evidence | Result | Confidence |
|---|---|---|
| Small-service kit includes added synthetic oil | Included in bundled kit price | `MEDIUM` for oil handling |
| Separate oil line in same customer/SCR40PM history | `80.00` ILS x `8`, doc `101611`, `2024-03-27` | `MEDIUM`, different service context |
| Manufacturer coolant part | technical candidate | not selling price |

### Risks

| Risk | Level | Explanation |
|---|---|---|
| Assuming full oil replacement | High | Small SCR service may be top-up, not replacement. |
| Assuming quantity | High | Quantity is not explicit in report 5806. |
| Pricing oil separately from bundled kit | Medium | Direct kit price already includes added synthetic oil. |
| Inventory misuse | High | Oil evidence does not approve stock deduction. |

### Recommended Decision

Approve this rule:

```text
For SCR-40PM 2000h Small Service in Report 5806,
oil handling may be included in the bundled kit description,
but AI Draft must not create a separate oil quantity or oil price line
unless Liad approves the quantity/action.
```

Required flags:

- `NeedsQuantityApproval = true` for any separate oil line.
- `NeedsPriceApproval = true` for any separate oil line.
- `oilAction = TOP_UP_OR_ADDED_OIL_UNCONFIRMED` unless Liad approves a specific action.

### What Happens If Approved

AI Draft can safely produce:

- one bundled kit line that mentions oil handling.
- no separate oil quantity line.
- evidence note: "small-service kit includes added synthetic oil; separate oil quantity not approved."

Optional separate oil line remains blocked until quantity/action approval.

### What Happens If Not Approved

AI Draft must mark oil handling unresolved:

- expected part/service line remains visible.
- no price.
- no quantity.
- `NeedsQuantityApproval = true`.
- output remains `PARTIALLY` for oil handling.

## 5. Partial Serial Rule

### Current Evidence

Service Report 5806 operational serials:

- `SW854751`
- `SW851838`

Maven linked compressor docs:

| Document | Serial evidence | Status |
|---|---|---|
| `102451` | `SW854751` | full match |
| `102452` | `SW85183` | partial serial, likely missing final digit |

`SERVICE_REPORT_5806_COMMERCIAL_EVIDENCE_PACKET.md` classifies:

- `102451`: `HIGH`.
- `102452`: `HIGH_WITH_REVIEW`.

### Historical Evidence

Same customer/model history contains repeated references to:

- `SW851838`
- `40PM`
- small-service and large-service evidence.

This supports the link but does not automatically normalize the partial serial.

### Risks

| Risk | Level | Explanation |
|---|---|---|
| Wrong equipment linkage | High | Partial serial alone cannot prove identity. |
| Unsafe normalization | High | `SW85183` must not be silently converted to `SW851838`. |
| Losing evidence traceability | Medium | Raw serial text must be preserved. |
| Blocking useful evidence unnecessarily | Medium | Report + customer + model + service evidence strongly supports the link, even with serial review. |

### Recommended Decision

Approve this rule:

```text
Partial serial can support a HIGH_WITH_REVIEW link when report number,
customer, exact model/approved alias, and service item evidence all match.
Partial serial must not be normalized to the full serial automatically.
AI Draft may use the linked Maven document as evidence only with a review flag.
```

For report `5806`:

- `102451` can be treated as `HIGH` link evidence.
- `102452` can be treated as `HIGH_WITH_REVIEW` link evidence.
- Raw partial serial `SW85183` must be preserved.
- Do not rewrite it to `SW851838` unless Liad approves that correction separately.

### What Happens If Approved

AI Draft can use both compressor Maven docs:

- `102451` as direct full-serial evidence.
- `102452` as direct report/customer/model/service evidence with serial review flag.

This allows the kit price evidence to cover both compressor rows while still exposing the serial risk.

Required field:

- `partialSerialReviewRequired = true` for the second row/document.

### What Happens If Not Approved

AI Draft can use only `102451` as full-serial high-confidence evidence.

Consequences:

- second compressor row remains pricing/evidence review only.
- kit evidence for `102452` cannot be used as high-confidence row-specific evidence.
- readiness stays `PARTIALLY`.

## Required Approvals To Move To READY_FOR_APPROVAL_BASED_DRAFTS

Exact approvals required:

| # | Approval | Recommended value | Required to reach readiness? |
|---:|---|---|---|
| 1 | Kit Price Rule | Approve bundled SCR-40PM 2000h Small Service Kit at `1213.38` ILS as evidence-backed recommendation price for Report 5806, with `NeedsPriceApproval = true` | Yes |
| 2 | Global Service Document Line Evaluation Rule | Require every compressor service business document to evaluate Parts lines, Oil handling line if needed, Labor + Service, and Technician Visit / Travel, with include/exclude/approval reasoning | Yes |
| 3 | Labor Rule | Approve labor as optional/separate only when work-time evidence exists; default `275` ILS/hour may be shown with conflict evidence and approval flag | Yes |
| 4 | Technician Visit / Travel Rule | Approve one Technician Visit / Travel line only, not per-compressor; show conflict between `0`, `250`, and fixed `300`; keep approval required unless Liad selects default | Yes |
| 5 | Oil Quantity Rule | Approve oil handling inside bundled kit; block separate oil quantity/price until Liad approves action and quantity | Yes |
| 6 | Partial Serial Rule | Approve `102452` as `HIGH_WITH_REVIEW` evidence, preserving raw `SW85183` and not auto-normalizing | Yes |

Minimum approval set:

```text
Approve bundled kit line at 1213.38 ILS as evidence-backed recommendation.
Approve mandatory evaluation of Parts lines, Oil handling line if needed, Labor + Service, and Technician Visit / Travel for all compressor service business documents.
Approve no automatic kit price splitting.
Approve no separate oil quantity line.
Approve Technician Visit / Travel as one approval-required line, not per compressor and not split into two lines.
Approve labor only with approval flag when separate from kit.
Approve partial serial use as HIGH_WITH_REVIEW, not normalization.
```

If these are approved, status becomes:

`READY_FOR_APPROVAL_BASED_DRAFTS`

Meaning:

- AI Draft may produce a recommendation preview.
- The draft title/header must include `SCR-40PM`.
- The draft may cite Maven docs `102451` and `102452`.
- The draft may include approval flags.
- The draft still requires user approval before any write/action.

It does not mean:

- automatic BusinessDocument creation.
- automatic BusinessDocumentItem creation.
- automatic Maven/Invoice4U creation.
- automatic price approval.
- automatic inventory deduction.
- automatic SKU/internal inventory approval.

## Recommended Approval-Based Draft Shape

If approved, the safest first AI Draft recommendation shape is:

| Line | Qty | Unit price | Source | Confidence | Approval flags |
|---|---:|---:|---|---|---|
| `SCR-40PM 2000h Small Service Kit` | `2` equipment rows, or separate one-per-serial display | `1213.38` ILS | Maven docs `102451`, `102452` | `HIGH` / `HIGH_WITH_REVIEW` | `NeedsPriceApproval = true`; partial serial review for `102452` |
| `Technician Visit / Travel` | `1` | Liad decision required; candidate `300` fixed rule or Maven evidence `0/250` | Fixed rule + Maven conflict evidence | `MEDIUM` | `NeedsPriceApproval = true` |
| `Labor + Service` | from work-time evidence only | `275` ILS/hour if fixed rule selected | Fixed rule + Maven conflict evidence `225-250` | `MEDIUM` | `NeedsPriceApproval = true`; `NeedsQuantityApproval` if time missing |
| `Oil handling` | included in kit | no separate price | Small Service rule + Maven kit text | `MEDIUM` | no separate line unless Liad approves quantity/action |

Recommended draft title/header:

```text
SCR-40PM - 2000h Small Service - Service Report 5806
```

## Final Decision Gate

Liad decision needed:

1. Approve the six rules above.
2. Record approved rules in Project Brain decision/governance files.
3. Only after that, select a separate implementation/spec task for an approval-based AI Draft recommendation preview.

Until these decisions are approved:

`AI Draft Recommendation = PARTIALLY`

After these decisions are approved:

`AI Draft Recommendation = READY_FOR_APPROVAL_BASED_DRAFTS`

No implementation was performed.
