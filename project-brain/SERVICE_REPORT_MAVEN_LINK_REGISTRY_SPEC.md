# Service Report Maven Link Registry Spec

Date: 2026-06-24
Mode: specification only.
Runtime impact: none.

No implementation, DB write, Prisma change, import, Maven action, BusinessDocument creation, AI Draft write, inventory action, Apps Script change, Google Sheets change, or production workflow change is approved by this spec.

## Goal

Define how the system should safely link `ServiceReports` / `ReportEquipmentItems` to historical Maven documents and Maven document items.

The registry is an evidence layer. It should explain why a Maven document or item is likely connected to a service report, and what confidence level is safe to use for future AI Draft pricing evidence.

## Sources Used

- `Equipment_Commercial_Link_Discovery.md`
- `Commercial_Intelligence_Verification.md`
- `project-brain/PRICING_EVIDENCE_ENGINE_SPEC.md`
- `AI_DRAFT_RUNTIME_BLUEPRINT.md`

Requested but missing:

- `AI_DRAFT_BUSINESS_REASONING_FLOW.md` was not found in the workspace during this specification pass. No rules were inferred from it.

## 1. Registry Purpose

The Service Report Maven Link Registry should answer:

- Which Maven document may belong to a Service Report?
- Which Maven item rows may belong to a specific service/equipment line?
- What evidence supports the link?
- What confidence level does the link have?
- Can the linked rows support AI Draft pricing evidence?
- What approval flags are required?

The registry must not decide equipment identity by itself. It must use operational evidence from `ServiceReports` and `ReportEquipmentItems`, then attach Maven commercial evidence when the link is strong enough.

## 2. Data Sources

### Operational Sources

| Source | Link evidence |
|---|---|
| `ServiceReports` | `ReportID`, `ReportCounter`, customer ID/name, service date, service type |
| `ReportEquipmentItems` | `ReportID`, equipment model text, serial number, service description, current hours, next service |

### Maven Commercial Sources

| Source | Link evidence |
|---|---|
| `InvoiceMavenDocuments` | document number, document type, customer ID/name, document date, document description, `RawJson`, totals, status/closed fields |
| `InvoiceMavenDocumentItems` | document number, document date, customer ID/name, item description, quantity, unit price, line total, raw item |

### Future/Internal Sources

| Source | Link evidence |
|---|---|
| `BusinessDocuments` | future internal workflow link from service report to Maven document |
| `BusinessDocumentItems` | future internal item-level link |
| AI Draft outputs | future recommendation evidence only after approved implementation |

Current caveat:

`Commercial_Intelligence_Verification.md` found rich Maven document/item coverage, but equipment-model-specific pricing is not safe without this link registry because Maven item rows do not reliably carry normalized `ServiceReportID`, `ReportEquipmentItemID`, model, or serial fields.

## 3. Evidence Inputs

Link confidence must be based on evidence from these signals:

1. Report number.
2. Customer match.
3. Document date proximity.
4. Equipment model text.
5. Serial number.
6. Maven document description / raw JSON.
7. Maven item descriptions.

Each link candidate must preserve the raw supporting evidence. Do not normalize away the original wording.

## 4. Confidence Levels

### HIGH

Use `HIGH` only when evidence includes:

- report number in Maven document description or raw JSON
- customer match
- model evidence or serial evidence

Preferred `HIGH` pattern:

```text
report number + customer + model + full serial
```

Allowed `HIGH` pattern:

```text
report number + customer + exact model evidence
```

only when the Maven item/service text aligns with the report service type and no conflict exists.

Example evidence from current discovery:

- Service Report `5806`.
- Maven docs `102451` / `102452`.
- Customer `רמות מלונקס בע"מ`.
- Model text `40PM` / SCR context.
- Serial evidence `SW854751` and partial `SW85183`.
- Item price evidence for small-service kit.

Partial serial caveat:

If serial is partial, `HIGH` requires report number + customer + model + service/item alignment. The partial serial supports the link but does not alone prove it.

### MEDIUM

Use `MEDIUM` when evidence includes:

- customer match
- document date proximity
- similar service/item evidence

Optional supporting evidence:

- model text without serial
- serial without report number
- report-like language without exact report number
- repeated customer/model/service history

`MEDIUM` can support pricing evidence with `NeedsPriceApproval = true`, but should not auto-approve line pricing.

### LOW

Use `LOW` when evidence includes only:

- customer match, or
- text similarity only, or
- generic equipment/service wording, or
- model family text without report/date/customer alignment

`LOW` is discovery evidence only. It must not drive automatic AI Draft pricing, SKU selection, BusinessDocument creation, or inventory action.

## 5. Partial Serial Handling

Rules:

- Partial serial can support a link.
- Partial serial cannot alone prove a link.
- Partial serial must preserve the raw token exactly as written.
- Partial serial should set `needsReview = true` unless Liad approves a correction.
- Partial serial can move confidence upward only when report number, customer, model, and service/item context also match.
- Partial serial must not become a normalized serial automatically.

Example:

`SW85183` may support a link to operational serial `SW851838` for Service Report `5806` only because the same Maven document also includes report number, customer, model, and service evidence. It still requires review or Liad-approved correction before being treated as a full serial match.

## 6. Maven History Boundary

Maven history is selling-price evidence.

It is not equipment truth unless model, serial, or report link evidence proves the relationship.

Rules:

- Maven item price may support customer pricing evidence after link confidence is assigned.
- Maven document text may support equipment/service identity only when it aligns with operational data.
- Maven model text alone cannot override `ReportEquipmentItems`.
- Maven generic equipment text cannot create a model identity.
- Maven repeated prices are not contracts.
- Maven document type/status must be considered before price use.

Document types/statuses must remain visible:

- quote/offer
- invoice or tax invoice
- receipt
- credit/cancellation
- closed/open
- closed by another document

Do not mix these as equivalent price proof without a future approved document-type policy.

## 7. AI Draft Pricing Use

Linked Maven items may influence future AI Draft pricing evidence.

Global business document line rule:

- Applies to quotes, invoices, proforma invoices, delivery notes if relevant, service draft documents, `BusinessDocuments`, `BusinessDocumentItems`, AI Draft outputs, Maven document drafts, and any future customer-facing document.
- For compressor service documents, `Technician Visit / Travel` is one commercial line.
- Do not generate both `Technician Visit` and `Travel` as separate lines.
- `Labor + Service` is one commercial line.
- Do not split `Labor` and `Service` unless Liad explicitly approves an exception.
- Standard compressor service document structure is: Parts lines, Oil handling line if needed, Labor + Service, Technician Visit / Travel.
- Every generated or suggested document line must show `INCLUDED`, `EXCLUDED`, or `NEEDS_APPROVAL`.
- Historical bundled Maven prices must explain whether they include parts only, parts + labor/service, or parts + labor/service + technician visit/travel.
- Do not double-charge travel, technician visit, labor, or service.

They cannot:

- auto-create `BusinessDocument`
- auto-create `BusinessDocumentItem`
- auto-create invoice
- create Maven/Invoice4U document
- deduct inventory
- approve SKU
- approve quantity
- override missing model evidence

Required AI Draft behavior:

- show linked Maven document/item rows as evidence
- show confidence level
- show report/customer/model/serial evidence
- show document type/status
- set `NeedsPriceApproval = true` unless pricing policy and confidence allow reuse
- keep `NeedsSkuApproval = true` when SKU evidence is missing or model identity is weak
- keep `NeedsQuantityApproval = true` when quantity is not independently approved

## 8. Registry Output Fields

Future registry rows should be evidence-first.

| Field | Meaning |
|---|---|
| `linkCandidateId` | Registry row ID or generated evidence packet ID |
| `serviceReportId` | `ServiceReports.ReportID` when known |
| `serviceReportCounter` | Human report number |
| `reportCustomerId` | Operational customer ID |
| `reportCustomerName` | Operational customer name |
| `serviceDate` | Operational service date |
| `reportEquipmentItemId` | Equipment row ID when item-level link is possible |
| `equipmentModelRaw` | Raw model text from `ReportEquipmentItems` |
| `equipmentSerialRaw` | Raw serial from `ReportEquipmentItems` |
| `mavenDocumentId` | Maven document ID if available |
| `mavenDocumentNumber` | Maven document number |
| `mavenDocumentType` | Maven doc type/type text |
| `mavenDocumentDate` | Maven document date |
| `mavenCustomerId` | Maven customer ID |
| `mavenCustomerName` | Maven customer name |
| `mavenDescriptionEvidence` | Description/raw JSON evidence summary |
| `mavenItemRowIds` | Linked item rows, if available |
| `mavenItemDescriptions` | Item descriptions used for support |
| `priceEvidenceRows` | Quantity/unit price/currency rows relevant to Pricing Evidence Engine |
| `reportNumberMatch` | `EXACT`, `NONE`, or `AMBIGUOUS` |
| `customerMatch` | `EXACT`, `NORMALIZED`, `SIMILAR`, `NONE`, or `CONFLICT` |
| `dateProximity` | Exact date delta or range |
| `modelTextMatch` | `EXACT`, `ALIAS`, `TEXT_ONLY`, `GENERIC`, `NONE`, or `CONFLICT` |
| `serialMatch` | `FULL`, `PARTIAL`, `NONE`, or `CONFLICT` |
| `serviceItemSimilarity` | Service/item text similarity explanation |
| `confidence` | `HIGH`, `MEDIUM`, or `LOW` |
| `needsReview` | Boolean |
| `needsLiadCorrection` | Boolean |
| `safeForPricingEvidence` | Boolean |
| `unsafeForAutomationReason` | Reason writes/actions are blocked |
| `evidenceSources` | Source files/tables/ranges used |

## 9. Liad Corrections And Link Learning

Liad corrections must be stored as approved link-learning.

Examples:

- partial serial correction
- customer name correction
- report-to-Maven document confirmation
- Maven document type interpretation
- item row classification
- false-positive link rejection

Required correction fields:

| Field | Meaning |
|---|---|
| `correctionType` | `SERIAL`, `CUSTOMER`, `REPORT_LINK`, `ITEM_LINK`, `DOCUMENT_TYPE`, `FALSE_POSITIVE`, or `OTHER` |
| `approvedFact` | Exact Liad-approved correction |
| `source` | `Liad Approved` |
| `confidence` | `APPROVED_BY_LIAD` |
| `affectedReportCounter` | Report number, or `UNKNOWN` |
| `affectedReportId` | Report ID, or `UNKNOWN` |
| `affectedMavenDocumentNumber` | Maven document number, or `UNKNOWN` |
| `affectedItemRows` | Maven item rows, or `UNKNOWN` |
| `forbiddenInference` | What must not be inferred |
| `createdAt` | Date recorded |

Approved corrections may raise confidence, but they still do not authorize BusinessDocument creation, Maven action, inventory deduction, or DB writes without separate approval.

## 10. Safety Rules

Hard rules:

- Do not create or update DB rows from this registry spec.
- Do not import Maven data.
- Do not call Maven/Invoice4U.
- Do not create BusinessDocuments.
- Do not deduct inventory.
- Do not treat low-confidence links as pricing authority.
- Do not treat partial serial as full serial without approval.
- Do not treat customer-only match as report link proof.
- Do not treat text similarity as equipment truth.
- Do not hide document type/status.

Separation rules:

```text
Maven Link Evidence != Equipment Truth
Maven Link Evidence != Price Approval
Maven Link Evidence != SKU Approval
Maven Link Evidence != Quantity Approval
Maven Link Evidence != Inventory Deduction
Maven Link Evidence != BusinessDocument Creation
```

## 11. Validation Requirements Before Implementation

Before any implementation is approved, validate:

- exact available columns in Maven documents/items
- parent link between `InvoiceMavenDocumentItems.MavenDocumentId` and `InvoiceMavenDocuments`
- customer ID/name matching behavior
- report number search behavior in `RawJson` and descriptions
- model/serial token extraction behavior
- document type/status interpretation
- duplicate/canceled/credit document handling
- date proximity policy
- partial serial policy
- Liad correction storage location

## 12. Known Current Evidence

From `Equipment_Commercial_Link_Discovery.md`:

- Service Report `5806` has operational `ReportID = 1e25bbb1`.
- It has two `SCR-40PM` equipment rows.
- Serials: `SW854751` and `SW851838`.
- Maven docs `102451` and `102452` reference report `5806`, customer, `40PM`, and small-service commercial rows.
- Doc `102451` has full serial `SW854751`.
- Doc `102452` has partial serial `SW85183`; this supports but does not alone prove the `SW851838` link.
- BusinessDocuments and AI Draft data did not currently preserve this link.

Conclusion:

The data exists. The missing layer is a governed link registry and confidence model.

## 13. Recommended Next Gate

Create a read-only Service Report Maven Link Evidence Packet for one report:

- target: Service Report `5806`
- output: candidate Maven documents/items, link confidence, pricing evidence rows, approval flags
- no writes
- no imports
- no Maven action
- no BusinessDocument creation
- no inventory action
