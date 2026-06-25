# Service Maven Mapping

Status: Reusable Knowledge Base
Scope: ServiceReport / ReportEquipmentItem to Maven document/item evidence mapping
Runtime impact: none

This knowledge base replaces permanent use of `SERVICE_REPORT_MAVEN_LINK_REGISTRY_SPEC.md`. Archived case/spec source is preserved at `project-brain/archive/research/SERVICE_REPORT_MAVEN_LINK_REGISTRY_SPEC.md`.

## Purpose

The mapping layer answers:

- Which Maven document may belong to a ServiceReport?
- Which Maven item rows may belong to a service/equipment line?
- What evidence supports the link?
- What confidence level is safe?
- Can linked rows support pricing evidence?
- What review/approval flags remain?

Maven mapping is an evidence layer. It is not equipment truth, price approval, SKU approval, quantity approval, inventory action, or BusinessDocument creation.

## Evidence Inputs

| Signal | Use |
|---|---|
| Report number | Strongest link when exact in Maven description/raw JSON |
| Customer match | Required support signal |
| Document date proximity | Supports commercial linkage |
| Equipment model text | Supports item/service relevance |
| Serial number | Strong support when full; partial requires review |
| Maven description/raw JSON | Preserves raw link wording |
| Maven item descriptions | Supports line-level relevance |
| Document type/status | Required before price evidence use |

## Confidence Levels

| Confidence | Required evidence | Safe use |
|---|---|---|
| HIGH | Report number + customer + model or full serial + aligned service/item text | Pricing evidence candidate, still approval-aware |
| HIGH_WITH_REVIEW | HIGH pattern with partial serial or minor unresolved evidence | Pricing evidence candidate with manual review flag |
| MEDIUM | Customer/date/service similarity plus optional model/serial support | Review-only pricing evidence; approval required |
| LOW | Customer-only, text-only, generic model, or weak similarity | Discovery only; no automation |

Partial serial rule:

- Partial serial can support a link.
- Partial serial cannot become a normalized full serial automatically.
- Partial serial must set review-required unless Liad approves correction.

## Output Fields

| Field | Meaning |
|---|---|
| `serviceReportId` | Internal report ID when known |
| `serviceReportCounter` | Human report number |
| `reportCustomerId` / `reportCustomerName` | Operational customer evidence |
| `reportEquipmentItemId` | Equipment row when line-level mapping exists |
| `equipmentModelRaw` | Raw model from operational source |
| `equipmentSerialRaw` | Raw serial from operational source |
| `mavenDocumentId` / `mavenDocumentNumber` | Maven document identity |
| `mavenDocumentType` / `mavenDocumentStatus` | Required for price use |
| `mavenDocumentDate` | Date evidence |
| `mavenCustomerId` / `mavenCustomerName` | Maven customer evidence |
| `mavenDescriptionEvidence` | Raw description/raw JSON summary |
| `mavenItemRows` | Linked rows and item descriptions |
| `priceEvidenceRows` | Qty/unit/currency rows for Pricing Evidence Engine |
| `reportNumberMatch` | EXACT, NONE, AMBIGUOUS |
| `customerMatch` | EXACT, NORMALIZED, SIMILAR, NONE, CONFLICT |
| `modelTextMatch` | EXACT, ALIAS, TEXT_ONLY, GENERIC, NONE, CONFLICT |
| `serialMatch` | FULL, PARTIAL, NONE, CONFLICT |
| `confidence` | HIGH, HIGH_WITH_REVIEW, MEDIUM, LOW |
| `needsReview` | Review flag |
| `safeForPricingEvidence` | Boolean |
| `unsafeForAutomationReason` | Boundary text |
| `evidenceSources` | Source files/tables/ranges used |

## Known Reusable Example: ServiceReport 5806

Archived source: `project-brain/archive/research/SERVICE_REPORT_5806_COMMERCIAL_EVIDENCE_PACKET.md`.

| Maven doc | Link status | Durable lesson |
|---|---|---|
| `102451` | HIGH | Report number + customer + model + full serial is strong evidence |
| `102452` | HIGH_WITH_REVIEW | Report number + customer + model + partial serial can support link, but serial remains review-required |
| `102453` | HIGH_REPORT_LINK / LOW_COMPRESSOR_RELEVANCE | Report link alone does not prove equipment/service-kit relevance |

## Safety Rules

```text
Maven Link Evidence != Equipment Truth
Maven Link Evidence != Price Approval
Maven Link Evidence != SKU Approval
Maven Link Evidence != Quantity Approval
Maven Link Evidence != Inventory Deduction
Maven Link Evidence != BusinessDocument Creation
```

Do not:

- Treat customer-only match as report proof.
- Treat text similarity as model truth.
- Hide document type/status.
- Use low-confidence links for automation.
- Create/update DB rows from mapping evidence without a separately approved runtime.
