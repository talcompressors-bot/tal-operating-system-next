# AI Draft Recommendation Preview 5806

Date: 2026-06-24
Mode: read-only recommendation preview
Source service report: `5806` / `1e25bbb1`

No BusinessDocument, BusinessDocumentItem, AI Draft row, DB write, Prisma action, inventory action, Maven/Invoice4U action, Google Sheets write, Apps Script change, or runtime workflow change was performed.

## Preview Status

This is the recommendation exactly as the future AI Draft engine can generate it today from available evidence.

Status:

`PREVIEW_ONLY`

Readiness:

`READY_FOR_APPROVAL_BASED_DRAFTS`

Current behavior:

- Generate evidence-backed preview.
- Show approval flags.
- Do not create a document.
- Do not approve pricing automatically.
- Do not deduct inventory.
- Do not call Maven.

## 1. Draft Title

```text
SCR-40PM - 2000h Small Service - Service Report 5806
```

Reason:

Compressor service drafts must show the equipment model in the title/header. The model connects service type, expected parts, manufacturer part numbers, historical pricing evidence, and future inventory matching.

## 2. Equipment Model

| Field | Value |
|---|---|
| Equipment model | `SCR-40PM` |
| Manufacturer lookup alias | `40PM = SCR-40PM` |
| Equipment type | Air compressor |
| Equipment subtype | Screw compressor |
| Serials | `SW854751`; `SW851838` |
| Equipment rows | `2` |
| Identity confidence | `MEDIUM` |

Evidence:

- `AI_DRAFT_EVIDENCE_PACKET.md`: two exact `SCR-40PM` rows in Service Report `5806`.
- `project-brain/MANUFACTURER_KNOWLEDGE_BASE.md`: Liad-approved model identity / manufacturer lookup alias `40PM = SCR-40PM`.
- `project-brain/EQUIPMENT_IDENTITY_REGISTRY_DISCOVERY.md`: `SCR-40PM` is an exact compressor model evidence bucket and not a generic horsepower class.

Boundary:

- Generic `40 HP`, generic compressor, or generic screw-compressor descriptions must not be used as `SCR-40PM`.
- `40PM = SCR-40PM` is model lookup evidence only; it does not approve pricing, quantity, inventory deduction, or BusinessDocument creation.

## 3. Service Type

| Field | Value |
|---|---|
| Detected service type | `2000h Small Service` |
| Confidence | `HIGH` |
| Service report evidence | both SCR-40PM rows include small/2000 service text |
| Liad-approved rule | `2000h / 2500h = Small Service` |

Expected Small Service lines:

- Air Filter.
- Oil Filter.
- 3L SKR oil top-up for SCR Small Service.
- Labor + Service.
- Technician Visit / Travel.

Default compressor service evaluation:

The global compressor service document-line rule applies to quotes, invoices, proforma invoices, delivery notes if relevant, service draft documents, `BusinessDocuments`, `BusinessDocumentItems`, AI Draft outputs, Maven document drafts, and any future customer-facing document.

AI Draft must evaluate the standard compressor service document structure:

1. Parts lines.
2. Oil handling line if needed.
3. Labor + Service.
4. Technician Visit / Travel.

Each line must be marked `INCLUDED`, `EXCLUDED`, or `NEEDS_APPROVAL`. Missing evidence is not allowed to silently remove a commercial service component.

Commercial line rules:

- Technician Visit / Travel is one line.
- Do not generate separate Technician Visit and Travel lines.
- Labor + Service is one line.
- Do not split Labor and Service unless Liad explicitly approves an exception.
- Do not double-charge travel.
- Do not double-charge technician visit.
- Do not double-charge service/labor.
- Historical bundled kit price must explain whether it includes parts only, parts + labor/service, or parts + labor/service + technician visit/travel.

Source:

- `project-brain/SERVICE_PATTERN_INTELLIGENCE_REGISTRY.md`
- `project-brain/MANUFACTURER_KNOWLEDGE_BASE.md`
- `AI_DRAFT_EVIDENCE_PACKET.md`

## 4. Suggested Service Lines

### Required Component Evaluation

| Standard line | Status in this preview | Reason | Approval state |
|---|---|---|---|
| Parts lines | `INCLUDED` | Small Service requires Air Filter and Oil Filter; report rows show Air/Oil filter replaced; Maven kit line includes Air Filter and Oil Filter | Kit price remains approval-based |
| 3L SKR oil top-up | `INCLUDED` | Liad approved SCR Small Service kit content: Air Filter, Oil Filter, and 3L SKR oil top-up | Included inside kit; do not create separate oil price line |
| Labor + Service | `NEEDS_APPROVAL` | Liad approved Labor + Service as a separate commercial line; historical labor/service exists at `225-250` ILS; fixed rule is `275` ILS/hour; quantity/work-time still needs evidence review | Separate line by default unless explicit historical evidence says it was bundled |
| Technician Visit / Travel | `NEEDS_APPROVAL` | One service visit occurred; default suggested price is `300` ILS, but direct compressor docs show `0` and report-linked dryer/filter work shows `250` | One line only; approval required because evidence conflicts and customer-specific history exists |

### Recommendation Table

| Line | Status | Description | Qty | Manufacturer part number | Suggested unit price | Confidence | Evidence source | NeedsSkuApproval | NeedsPriceApproval |
|---|---|---|---:|---|---:|---|---|---|---|
| 1 | `NEEDS_APPROVAL` | SCR-40PM 2000h Small Service Kit, bundled line including Oil Filter, Air Filter, and 3L SKR oil top-up | `2` equipment rows or one line per serial | bundle uses `25200007-005`, `25100043-071`, oil handling evidence | `1213.38` ILS per linked kit line | `HIGH` for full serial; `NEEDS_MANUAL_CONFIRMATION` for second serial | Maven docs `102451`, `102452`; Service Report `5806`; Small Service rule | `false` for Air/Oil Filter evidence; `false` for approved 3L SKR top-up inside kit | `true` |
| 2 | `INCLUDED` | Air Filter technical evidence line, if the UI displays parts separately under the bundled kit | `2` | `25100043-071` | included in bundled kit; no separate price | `HIGH` technical, `LOW` separate price | Part Compatibility Registry; manufacturer workbook; report replacement flags | `false` for exact `SCR-40PM -> 40PM` evidence packet | `true` |
| 3 | `INCLUDED` | Oil Filter technical evidence line, if the UI displays parts separately under the bundled kit | `2` | `25200007-005` | included in bundled kit; no separate price | `HIGH` technical, `LOW` separate price | Part Compatibility Registry; manufacturer workbook; report replacement flags | `false` for exact `SCR-40PM -> 40PM` evidence packet | `true` |
| 4 | `INCLUDED` | 3L SKR oil top-up, included in SCR Small Service kit only | included in kit | `80000175-039` candidate coolant/oil evidence | included in bundled kit; no separate price | `HIGH` for approved kit content | Small Service rule; Maven kit text; Part Compatibility Registry | `false` inside kit | `true` |
| 5 | `NEEDS_APPROVAL` | Labor + Service, separate commercial line unless explicit historical evidence says bundled | work-time evidence required | N/A | candidate `275` ILS/hour fixed rule; historical conflict `225-250` | `MEDIUM` | Fixed labor rule; Maven labor/service history | N/A | `true` |
| 6 | `NEEDS_APPROVAL` | Technician Visit / Travel, one commercial line only | `1` service visit event | N/A | default suggested `300` ILS; conflict evidence `0` and `250` | `MEDIUM` | Maven docs `102451`, `102452`, `102453`; fixed visit/travel rule; Service Report `5806` | N/A | `true` |

### Engine Interpretation Today

The safest generated recommendation today is a bundled kit-first preview:

```text
Line 1:
SCR-40PM 2000h Small Service Kit
Quantity: 2 equipment rows, or one line per serial if the approval UI requires per-equipment evidence
Unit price evidence: 1213.38 ILS
Price source: Maven docs 102451 and 102452
NeedsPriceApproval: true
NeedsSkuApproval: false for Air/Oil Filter technical evidence and approved 3L SKR top-up inside the kit
```

Parts can be displayed underneath the bundled kit as evidence, but should not be priced separately without Liad approval.

## 5. Line Details

### 5.1 SCR-40PM 2000h Small Service Kit

Description:

Bundled SCR-40PM small-service kit including Oil Filter, Air Filter, and 3L SKR oil top-up.

Manufacturer part evidence:

- `25200007-005` Oil Filter.
- `25100043-071` Air Filter.
- `80000175-039` oil/coolant handling candidate for approved 3L SKR oil top-up inside the kit.

Historical price:

- `1213.38` ILS per kit line.

Evidence source:

- Maven doc `102451`, item `fcd78410-f07d-4446-b2aa-003b43af7f01_0`.
- Maven doc `102452`, item `ddd005be-13be-4077-b92f-adda55c811ce_0`.
- Same customer, same report, same model text `40PM`, same service type.

Confidence:

- `HIGH` for doc `102451`.
- `NEEDS_MANUAL_CONFIRMATION` for doc `102452` because Maven serial is partial: `SW85183`.

NeedsSkuApproval:

- `false` for Air Filter and Oil Filter technical evidence in this preview because exact `SCR-40PM` plus approved `40PM = SCR-40PM` maps to manufacturer compatibility.
- `false` for approved 3L SKR oil top-up inside the SCR Small Service kit.

NeedsPriceApproval:

- `true`.

Reason:

Pricing evidence is strong enough for an approval-based recommendation. Repeated price is not a contract, and the partial serial row still requires manual confirmation.

### 5.2 Air Filter

Description:

Air Filter for SCR-40PM 2000h Small Service.

Manufacturer part number:

`25100043-071`

Compatible models:

`25EPM, 30EPM, 30PM, 40PM`

Evidence source:

- `project-brain/PART_COMPATIBILITY_REGISTRY.md`
- `project-brain/SCR_40PM_SERVICE_KIT_EVIDENCE_PACKET.md`
- Report `5806` replacement flags: Air Filter replaced on both SCR-40PM equipment rows.

Confidence:

- Technical compatibility: `HIGH`.
- Separate customer selling price: `LOW`.

NeedsSkuApproval:

- `false` for this evidence preview.
- Runtime should keep approval-sensitive if alias governance is not implemented.

NeedsPriceApproval:

- `true`.

Price behavior:

Do not assign a separate Air Filter price. It is included in the bundled kit price evidence.

### 5.3 Oil Filter

Description:

Oil Filter for SCR-40PM 2000h Small Service.

Manufacturer part number:

`25200007-005`

Compatible models:

`10PM2, 15PM2, 20PM2, 25EPM, 30EPM, 30PM, 40PM, 50PM`

Evidence source:

- `project-brain/PART_COMPATIBILITY_REGISTRY.md`
- `project-brain/SCR_40PM_SERVICE_KIT_EVIDENCE_PACKET.md`
- Report `5806` replacement flags: Oil Filter replaced on both SCR-40PM equipment rows.

Confidence:

- Technical compatibility: `HIGH`.
- Separate customer selling price: `LOW`.

NeedsSkuApproval:

- `false` for this evidence preview.
- Runtime should keep approval-sensitive if alias governance is not implemented.

NeedsPriceApproval:

- `true`.

Price behavior:

Do not assign a separate Oil Filter price. It is included in the bundled kit price evidence.

### 5.4 Oil Handling

Description:

3L SKR oil top-up for SCR-40PM Small Service.

Manufacturer part number:

`80000175-039` candidate coolant/oil evidence.

Compatible models:

Shared PM/EPM evidence includes `40PM`.

Evidence source:

- Small Service rule: SCR Small Service kit includes 3L SKR oil top-up.
- Maven kit text: bundled kit includes added synthetic oil.
- `project-brain/PART_COMPATIBILITY_REGISTRY.md`.
- `project-brain/MANUFACTURER_KNOWLEDGE_BASE.md`: SCR 2000h / 2500h Small Service includes 3L SKR oil top-up.

Confidence:

- Service expectation and approved kit content: `HIGH`.
- Separate oil charge confidence: `LOW`.

NeedsSkuApproval:

- `false` inside the approved SCR Small Service kit.

NeedsPriceApproval:

- `true`.

Price behavior:

Do not create a separate oil line today. Oil handling is included in the bundled kit description until Liad approves oil action and quantity.
For Large Service `4000h` / `5000h`, oil must be treated as full oil replacement, not top-up.

### 5.5 Labor + Service

Description:

Labor + Service is a separate commercial line. It is not included in the small service kit unless explicit historical evidence says otherwise.

Manufacturer part number:

N/A

Evidence source:

- Fixed AI Draft rule: Technician labor = `275` NIS/hour.
- Same-customer SCR/40PM history: `225.00-250.00` ILS per labor/service unit.
- Liad-approved rule: Labor + Service is separate from SCR Small Service kit by default.
- Direct compressor kit docs `102451` and `102452`: no separate compressor labor line, which is conflict/approval evidence rather than proof that labor is bundled.
- Maven doc `102453`: report-linked dryer/filter labor, not compressor-kit evidence.

Confidence:

- `MEDIUM`.

NeedsSkuApproval:

- N/A.

NeedsPriceApproval:

- `true`.

Include / exclude reasoning:

- Status: `NEEDS_APPROVAL`.
- Include as a separate commercial line when work-time evidence supports quantity.
- Exclude only if explicit historical evidence says Labor + Service was included in the kit for the specific customer/document.
- Do not auto-add separate labor if it duplicates bundled kit work.

Price behavior:

If displayed, use approval flag and show conflict between fixed `275` and historical `225-250`.

### 5.6 Technician Visit / Travel

Description:

Technician Visit / Travel line for the service event. This is one commercial line and must not be split into separate Technician Visit and Travel charges.

Manufacturer part number:

N/A

Evidence source:

- Liad-approved rule: Technician Visit / Travel default suggested price = `300` ILS.
- Service Report `5806` proves a service event occurred.
- Maven direct compressor docs show travel/no-charge evidence, so visit/travel pricing must be reviewed rather than auto-added.
- Maven doc `102453` shows report-linked dryer/filter visit/travel evidence at `250.00` ILS.
- Nearby customers may be waived, so customer-specific conflict evidence keeps approval required.

Confidence:

- `MEDIUM`.

NeedsSkuApproval:

- N/A.

NeedsPriceApproval:

- `true`.

Include / exclude reasoning:

- Status: `NEEDS_APPROVAL`.
- Include because a technician visit/travel event occurred.
- Suggest `300` ILS as the default price, but keep approval required because Report 5806 has conflicting/customer-specific evidence.
- Do not split this into separate Technician Visit and Travel lines.
- Never add Technician Visit / Travel per compressor row.

Price behavior:

Show `300` ILS as the default suggested price. The engine should present one approval-required Technician Visit / Travel line with conflict evidence: `0`, `250`, and fixed rule `300`.

## 6. Historical Pricing Evidence

### Small-Service Kit

| Evidence | Price | Dates | Confidence |
|---|---:|---|---|
| Direct report 5806 compressor kit docs `102451`, `102452` | `1213.38` ILS | `2026-05-18` | `HIGH` / `NEEDS_MANUAL_CONFIRMATION` |
| Same-customer SCR/40PM kit history | `1134.00-1213.38` ILS | `2025-01-27` to `2026-05-18` | `HIGH` for bundled kit |

AI Draft use:

- Safe to recommend as bundled kit price evidence.
- Requires Liad approval before becoming an approval-based draft recommendation.
- Not safe to split into separate part prices.

### Air Filter / Oil Filter Separate Prices

| Item | Separate selling price evidence | Confidence |
|---|---|---|
| Air Filter | Not found in linked SCR-40PM packet | `LOW` |
| Oil Filter | Not found in linked SCR-40PM packet | `LOW` |

AI Draft use:

- Display as technical evidence only under the bundled kit.
- Do not price separately.

### Oil / Coolant

| Evidence | Price | Confidence |
|---|---:|---|
| Included in bundled kit text | included in `1213.38` kit | `MEDIUM` |
| Separate oil row, doc `101611` | `80.00` ILS x `8` | `MEDIUM`, different service context |

AI Draft use:

- SCR Small Service kit includes 3L SKR oil top-up.
- Do not create a separate oil price/quantity line without Liad approval.
- For Large Service `4000h` / `5000h`, treat oil as full oil replacement, not top-up.

### Labor + Service

| Evidence | Price range | Confidence |
|---|---:|---|
| Same-customer SCR/40PM labor/service history | `225.00-250.00` ILS per unit/hour | `MEDIUM_HIGH` |
| Fixed AI Draft rule | `275.00` ILS/hour | `MEDIUM`, conflict with history |

AI Draft use:

- Labor + Service is a separate commercial line by default.
- Approval-required because quantity and customer-specific price evidence must be reviewed.
- Do not split Labor and Service unless Liad explicitly approves an exception.

### Technician Visit / Travel

| Evidence | Price | Confidence |
|---|---:|---|
| Direct compressor docs `102451`, `102452` | `0.00` ILS | `HIGH` for report-specific no-charge/charged-once evidence |
| Same-customer SCR/40PM history | `225.00-250.00` ILS | `MEDIUM_HIGH` |
| Fixed AI Draft rule | `300.00` ILS | `MEDIUM`, conflict with history |

AI Draft use:

- Use `300` ILS as the default suggested one-line Technician Visit / Travel price.
- Approval-required when evidence conflicts or customer-specific history exists.
- Do not generate separate Technician Visit and Travel lines.
- Do not charge per compressor row.

## 7. Historical Service Evidence

| Source | Evidence | AI Draft impact |
|---|---|---|
| Service Report `5806` | two exact `SCR-40PM` equipment rows | supports exact model preview |
| Report equipment row `e8c32b28` | serial `SW854751`, small/2000 service, Air/Oil filter replaced | supports kit and technical parts |
| Report equipment row `6bb28e16` | serial `SW851838`, small/2000 service, Air/Oil filter replaced | supports kit and technical parts |
| Maven doc `102451` | report `5806`, customer, `40PM`, full serial `SW854751`, small-service kit | high-confidence commercial link |
| Maven doc `102452` | report `5806`, customer, `40PM`, partial serial `SW85183`, small-service kit | `NEEDS_MANUAL_CONFIRMATION`; partial serial is not high-with-review |
| Maven doc `102453` | report `5806`, dryer/filter work | report-linked but not compressor-kit evidence |

## 8. Missing Information

Resolved for approval-based AI Draft readiness:

- SCR Small Service kit content: Air Filter, Oil Filter, 3L SKR oil top-up.
- Labor + Service is separate by default unless explicit historical evidence says otherwise.
- Technician Visit / Travel is one line with default suggested price `300` ILS.
- Large Service oil is full oil replacement, not top-up.
- Partial serial remains `NEEDS_MANUAL_CONFIRMATION`, not `HIGH_WITH_REVIEW`.

Still unresolved before real draft automation:

- Approved document-type/status policy for Maven rows.
- Approved stale-price/date-window policy.
- Approved VAT/tax display policy.
- Implemented runtime registries for identity, compatibility, and pricing.
- Approval workflow for writing `BusinessDocuments` / `BusinessDocumentItems`.
- No inventory transaction gate.
- No Maven/Invoice4U creation approval.

## 9. What Still Requires Liad Approval

Still required before any write/action:

1. Liad approval of the generated recommendation instance.
2. Manual confirmation for Maven doc `102452` partial serial `SW85183` before treating that row as confirmed equipment identity.
3. Approval for any customer-specific price conflict, including Labor + Service and Technician Visit / Travel.
4. Approval of the future write path separately before any `BusinessDocument`, `BusinessDocumentItem`, Maven, inventory, or DB action.

## 10. Final Preview Output

If the future AI Draft engine ran today, it should generate this preview:

```text
Draft title:
SCR-40PM - 2000h Small Service - Service Report 5806

Customer:
18953 / Ramot Mellonox source customer evidence

Equipment:
SCR-40PM
Serials: SW854751, SW851838

Service type:
2000h Small Service

Suggested primary line:
SCR-40PM 2000h Small Service Kit
Qty: 2 equipment rows or one line per serial
Unit price evidence: 1213.38 ILS
Evidence: Maven docs 102451 and 102452
Confidence: HIGH / NEEDS_MANUAL_CONFIRMATION for partial serial row
NeedsSkuApproval: false for Air/Oil Filter evidence and approved 3L SKR oil top-up inside kit
NeedsPriceApproval: true

Parts:
- Air Filter: 25100043-071
- Oil Filter: 25200007-005
- 3L SKR oil top-up: 80000175-039 candidate evidence, included inside kit
Status: Included as technical/service evidence; price remains approval-required.

Labor + Service:
Separate commercial line by default unless explicit historical evidence says otherwise.
Evidence conflict: 225-250 ILS history, 275 ILS fixed rule.
NeedsPriceApproval: true

Technician Visit / Travel:
One commercial line only.
Evidence conflict: 0 ILS direct compressor docs, 250 ILS report-linked dryer work, 300 ILS fixed rule.
Default suggested price: 300 ILS.
Status: Needs approval because evidence conflicts/customer-specific history exists; do not split into separate visit/travel lines; do not add per compressor.
NeedsPriceApproval: true

Final rule:
Recommendation preview only.
Do not create BusinessDocument.
Do not create Maven document.
Do not write DB.
Do not deduct inventory.
```

## 11. Final Boundary

This file is a preview artifact only.

It proves that the current knowledge graph can generate a useful AI Draft recommendation preview for Service Report `5806`, but it does not approve any write, automation, customer-facing action, inventory action, or Maven/Invoice4U action.
