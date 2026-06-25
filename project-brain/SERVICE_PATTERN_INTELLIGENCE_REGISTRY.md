# Service Pattern Intelligence Registry

Date: 2026-06-24

Mode: documentation / registry only.

Runtime impact: none. No code, DB write, Prisma change, import, BusinessDocument creation, inventory action, Maven/Invoice4U action, or runtime workflow change was performed.

## Scope

This registry stores approved service pattern rules and observed model-specific service evidence.

Important boundary:

- Service pattern suggests expected lines only.
- Service pattern does not approve SKU.
- Service pattern does not approve price.
- Service pattern does not approve quantity.
- Service pattern does not approve inventory deduction.
- Service pattern does not approve BusinessDocument creation.
- Service pattern does not approve Maven/Invoice4U action.
- For compressor service drafts, the equipment model must appear clearly in the draft title/header before service lines are interpreted.

Evidence sources:

- `project-brain/MANUFACTURER_KNOWLEDGE_BASE.md`
- `project-brain/MANUFACTURER_SERVICE_KITS.md`
- `project-brain/SKU_MATCHING_RULES.md`
- `project-brain/DECISION_LOG.md`
- `data-sources/exports/ReportEquipmentItems.csv`
- prior service pattern and parts intelligence findings recorded in Project Brain tasks

## 1. Liad-Approved Service Pattern Rules

| Service rule | Definition | Source | Confidence | AI inference | Historical guess |
|---|---|---|---|---|---|
| Small Service | `2000h` / `2500h` service | Liad Approved | Approved | No | No |
| Large Service | `4000h` / `5000h` service | Liad Approved | Approved | No | No |

Approved service-specific oil rules:

- SCR Small Service kit includes Air Filter, Oil Filter, and `3L SKR oil top-up`.
- Labor + Service is a separate commercial line. It is not included in the small service kit unless explicit historical evidence says otherwise.
- Technician Visit / Travel is one commercial line with default suggested price `300` ILS. Keep `NeedsApproval = true` when evidence conflicts or customer-specific history exists.
- Large Service `4000h` / `5000h` replaces the full oil content. Do not treat Large Service oil as top-up.

## 2. Expected Parts By Service Type

Approved global compressor service document structure rule:

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

- Always identify the compressor model first.
- The model connects service type, expected parts, manufacturer part numbers, future internal SKUs, historical pricing evidence, and inventory matching.
- Generic horsepower is not model identity.
- Service pattern expected lines remain evidence only.
- Compressor service documents must evaluate both technical service parts and commercial service components.
- Any generated or suggested document line must explain why it is included or excluded.

### Default Compressor Service Evaluation

For every compressor service document, the system must evaluate these standard structure blocks:

1. Parts lines.
2. Oil handling line if needed.
3. Labor + Service.
4. Technician Visit / Travel.

Required behavior:

- Parts lines are evaluated from service pattern, equipment model, observed replacement flags, part compatibility, manufacturer evidence, and historical service evidence.
- Oil handling is evaluated as its own service-structure block when the service type expects oil handling or oil evidence exists.
- Labor + Service is one commercial line. Do not split it into separate Labor and Service lines unless Liad explicitly approves an exception.
- Technician Visit / Travel is one commercial line. Do not split it into separate Technician Visit and Travel lines.
- Each line must show `included`, `excluded`, or `needs approval`.
- Each line must cite evidence and approval flags.
- Excluded lines must explain the exclusion reason.
- Missing evidence must not silently remove a line; it must produce `needs approval` or `excluded due to missing evidence`.
- Historical bundled kit price must explain whether it covers parts only, parts + labor/service, or parts + labor/service + technician visit/travel.
- Do not double-charge travel.
- Do not double-charge technician visit.
- Do not double-charge service/labor.

Boundary:

- Service pattern can require evaluation of these components, but it does not approve price, quantity, inventory deduction, BusinessDocument creation, Maven/Invoice4U action, or any write workflow.

### Small Service

Expected lines:

- Air Filter
- Oil Filter
- `3L SKR oil top-up` for SCR compressors
- Labor + Service as a separate commercial line unless explicit historical evidence says otherwise
- Technician Visit / Travel as one commercial line with default suggested price `300` ILS, approval-required when evidence conflicts or customer-specific history exists

### Large Service

Expected lines:

- Air Filter
- Oil Filter
- Oil Separator
- Full oil replacement
- Labor + Service as a separate commercial line unless explicit historical evidence says otherwise
- Technician Visit / Travel as one commercial line with default suggested price `300` ILS, approval-required when evidence conflicts or customer-specific history exists

## 3. Model-Specific Evidence

Confidence model:

- `HIGH`: repeated model/service observations with recurring part signals.
- `MEDIUM`: repeated observations or exact model with useful service pattern, but limited scope or missing parts/quantity.
- `LOW`: single observation, generic model, non-compressor equipment, malformed/test-like model, or missing parts evidence.

| Model | Observations | Service type / text evidence | Observed parts | Confidence | Evidence source |
|---|---:|---|---|---|---|
| `SCR20APM` | 5 | `טיפול 2000שע`; `טיפול קטן`; `טיפול ראשוני`; `טיפול תקופתי`; `טיפול2000שע` | Air Filter x5; Oil Filter x5 | HIGH | `ReportEquipmentItems.csv`; prior Parts Intelligence findings |
| `SCR20EPM` | 2 | `טיפול 2000שע`; `טיפול קטן 2000שע` | Air Filter x2; Oil Filter x2 | MEDIUM | `ReportEquipmentItems.csv`; prior Parts Intelligence findings |
| `SCR-40PM` | 2 | `בוצע טיפול קטן-2000`; `טיפול תקופתי קטן 2000` | Air Filter x2; Oil Filter x2 | MEDIUM | `ReportEquipmentItems.csv`; `MANUFACTURER_SERVICE_KITS.md`; archived source `archive/research/SCR_40PM_SERVICE_KIT_EVIDENCE_PACKET.md` |
| `SCR50EPM` | 2 | `טיפול קטן`; `טיפול קטן/2000` | Air Filter x2; Oil Filter x2 | MEDIUM | `ReportEquipmentItems.csv`; prior Parts Intelligence findings |
| `SCR20XAמס2` | 2 | belt + air-filter service; `5000` hour oil-free scroll service text | Air Filter x2; Belts x2 | MEDIUM | `ReportEquipmentItems.csv`; `MANUFACTURER_PARTS_REGISTRY.md`; legacy discovery `MANUFACTURER_PARTS_REGISTRY_DISCOVERY.md` |
| `10APM` | 2 | installation; periodic large service | Air Filter x2; Oil Filter x2; Oil Separator x2 | MEDIUM | `ReportEquipmentItems.csv` |
| `SCR10APM` | 2 | installation/plumbing; large service | none observed in replacement flags | LOW | `ReportEquipmentItems.csv` |
| `SCR10APMבניין /I.B.C` | 1 | small/2000 service | none observed in replacement flags | LOW | `ReportEquipmentItems.csv` |
| `SCR-10APM` | 1 | periodic large service | none observed in replacement flags | LOW | `ReportEquipmentItems.csv` |
| `SCR100APM` | 1 | initial service | none observed in replacement flags | LOW | `ReportEquipmentItems.csv` |
| `100APM-8` | 1 | compressor installation | none observed | LOW | `ReportEquipmentItems.csv` |
| `? SCR20APM` | 1 | periodic service with fan fault | none observed | LOW | `ReportEquipmentItems.csv`; identity uncertainty |
| `GA-11VSD` | 1 | large periodic service by quote | none observed in replacement flags | LOW | `ReportEquipmentItems.csv` |
| `GA18FF אטלס קופקו` | 1 | large service | none observed in replacement flags | LOW | `ReportEquipmentItems.csv` |
| `GA-26 FF` | 1 | large periodic service by quote | none observed in replacement flags | LOW | `ReportEquipmentItems.csv` |
| `LG-11A` | 1 | `4000` large service | none observed in replacement flags | LOW | `ReportEquipmentItems.csv` |
| `OH35` | 1 | periodic service | none observed | LOW | `ReportEquipmentItems.csv` |
| `Tal comp` | 1 | large/4000 service | none observed | LOW | `ReportEquipmentItems.csv` |
| `אירסטור10כס` | 1 | small/2000 service | none observed | LOW | `ReportEquipmentItems.csv`; horsepower/generic risk |
| `בוטרני50כס` | 1 | small/2000 service | none observed | LOW | `ReportEquipmentItems.csv`; horsepower/generic risk |
| `טמסאן ?TVK1100E` | 1 | small/2000 service | none observed | LOW | `ReportEquipmentItems.csv` |
| `מדחס קייזרSK22` | 1 | `4000` service | none observed | LOW | `ReportEquipmentItems.csv` |
| `מדחס סיני 22KW/30כס RMC-30VSD` | 1 | large/4000 service | none observed | LOW | `ReportEquipmentItems.csv`; mixed model/hp description |
| `מדחס אוויר דגםSCR20לחץ גבוה  מס:2` | 1 | large/4000 service | none observed | LOW | `ReportEquipmentItems.csv`; generic SCR20 text |
| `מדחס אוויר` | 1 | large/5000 service | none observed | LOW | `ReportEquipmentItems.csv`; generic compressor |
| `מדחס בורגי` | 1 | large/4000 service | none observed | LOW | `ReportEquipmentItems.csv`; generic compressor |
| `מדחס אוויר דגם SCR10APMמס 2` | 1 | filter replacement in housing | none observed in replacement flags | LOW | `ReportEquipmentItems.csv`; embedded model text |
| `שמן סינטטי SEL46` | 1 | small/2000 service | none observed | LOW | `ReportEquipmentItems.csv`; oil/product text, not model |
| `7.5 כס` | 1 | pressure switch/gauge repair | none observed | LOW | `ReportEquipmentItems.csv`; horsepower-only |
| `BSD72` | 1 | fault/cleaning service | none observed | LOW | `ReportEquipmentItems.csv` |
| `215121` | 1 | replacement text | none observed | LOW | `ReportEquipmentItems.csv`; numeric-only |
| `אללאב` | 1 | large service | none observed | LOW | `ReportEquipmentItems.csv`; malformed/test-like |
| `אלאהב` | 1 | partial service text | none observed | LOW | `ReportEquipmentItems.csv`; malformed/test-like |
| `כעכעכי` | 1 | small service | none observed | LOW | `ReportEquipmentItems.csv`; malformed/test-like |
| `רכרכרכ` | 1 | installation | none observed | LOW | `ReportEquipmentItems.csv`; malformed/test-like |
| `אלאב` | 1 | blank service text | none observed | LOW | `ReportEquipmentItems.csv`; malformed/test-like |
| `רעע` | 1 | blank service text | none observed | LOW | `ReportEquipmentItems.csv`; malformed/test-like |
| `150L` | 1 | blank service text | none observed | LOW | `ReportEquipmentItems.csv`; pressure tank |
| `EL15` | 2 | condenser cleaning / fan replacement | none observed | LOW | `ReportEquipmentItems.csv`; dryer |
| `SCR-0070NF` | 1 | dryer replacement | none observed | LOW | `ReportEquipmentItems.csv`; dryer, not compressor |
| `SCR=019NF` | 1 | quote-based dryer work | none observed | LOW | `ReportEquipmentItems.csv`; dryer, not compressor |
| `SDLF-6` | 1 | dryer installation | none observed | LOW | `ReportEquipmentItems.csv`; dryer |
| `SDLF-8` | 1 | additional dryer supply | none observed | LOW | `ReportEquipmentItems.csv`; dryer |
| `מייבש אוויר` | 2 | dryer fault/repair | none observed | LOW | `ReportEquipmentItems.csv`; generic dryer |
| `מייבש אוויר דגם מיקוב` | 1 | cover opening and radiator cleaning | none observed | LOW | `ReportEquipmentItems.csv`; dryer |
| `מייבש מיקרופור תוצרת טורקיה` | 1 | service reset | none observed | LOW | `ReportEquipmentItems.csv`; dryer |
| `מיקוב 2.6 ליטר/דקה` | 1 | drain valve issue | none observed | LOW | `ReportEquipmentItems.csv`; dryer/capacity text |
| `מיקוב2.6ליטר` | 1 | valve disassembly/cleaning | none observed | LOW | `ReportEquipmentItems.csv`; dryer/capacity text |
| `חגצגמ` | 1 | inspection/cleaning by air pressure | none observed | LOW | `ReportEquipmentItems.csv`; malformed/test-like dryer |
| `לרררר` | 1 | dryer repair | none observed | LOW | `ReportEquipmentItems.csv`; malformed/test-like dryer |
| `D-200-A+H` | 1 | replacement | none observed | LOW | `ReportEquipmentItems.csv`; line filter |
| `D200x3יחידות` | 1 | blank service text | none observed | LOW | `ReportEquipmentItems.csv`; line filter/count text |
| `DA-400 אלמנט סינון 1 m` | 1 | blank service text | none observed | LOW | `ReportEquipmentItems.csv`; line-filter element |
| `DD70+/DP70+הוחלפו שתי יחידות אלמנטים` | 1 | blank service text | none observed | LOW | `ReportEquipmentItems.csv`; line-filter service text |
| `בתי אלמנט דגם אטלס-DD20+/DP20+` | 1 | blank service text | none observed | LOW | `ReportEquipmentItems.csv`; filter housing |
| `מסנן מיקרופור X+Y` | 1 | internal elements replacement | none observed | LOW | `ReportEquipmentItems.csv`; filter |
| `מיקרו X+X+Y` | 1 | blank service text | none observed | LOW | `ReportEquipmentItems.csv`; filter |
| `מיקרו` | 1 | blank service text | none observed | LOW | `ReportEquipmentItems.csv`; generic filter |
| `מי3רטק` | 1 | replacement | none observed | LOW | `ReportEquipmentItems.csv`; malformed filter |
| `אנרקנקנ` | 1 | blank service text | none observed | LOW | `ReportEquipmentItems.csv`; malformed/test-like filter |

## 4. Oil Handling Rules

Approved oil handling rules:

- For SCR compressor 2000h / 2500h Small Service, oil handling is `3L SKR oil top-up`.
- For 4000h / 5000h Large Service, oil handling is full oil replacement. Do not treat Large Service oil as top-up.
- For ALUP or other compressor models, oil handling may be oil replacement.
- Do not infer exact oil action without model/service evidence.
- Do not infer oil quantity without explicit evidence.

Interpretation:

- SCR Small Service has approved `3L SKR oil top-up` when model/service evidence is present.
- Large Service has approved full-oil-replacement action when service interval evidence is present.
- Non-SCR models, unclear intervals, and separate oil charges still require model/service evidence and approval flags.

## 5. Safety Rules

Service pattern intelligence may:

- suggest expected line categories
- explain why a line should be considered
- support an AI Draft evidence packet
- raise confidence when observed service text and replaced-part flags match

Service pattern intelligence must not:

- approve SKU
- approve price
- approve quantity
- deduct inventory
- create BusinessDocuments
- create BusinessDocumentItems
- trigger Maven/Invoice4U
- override Equipment Identity rules
- override Parts Compatibility rules
- treat generic equipment descriptions as exact model identities
- use manufacturer cost as selling price
- allow AI Draft to hide or omit the compressor model from the draft title/header

Required approval flags:

- `NeedsSkuApproval = true` when model identity, alias, or part compatibility is weak.
- `NeedsQuantityApproval = true` when quantity is missing or interval semantics are unclear.
- `NeedsPriceApproval = true` unless pricing evidence is approved separately.

## 6. Gaps

Known gaps:

- Missing model-specific quantities.
- Missing approved aliases in a persisted registry.
- Missing row-level manufacturer SKU linkage.
- Missing explicit part compatibility registry.
- Missing oil action and oil quantity rules by model.
- Missing labor pattern registry.
- Missing interval semantics for manufacturer workbook quantities.
- Missing Maven/Product/BusinessDocument selling price history in staging.
- Missing approved inventory transaction gate.
- Missing BusinessDocument approval workflow.

## 7. Recommended Next Registry

Recommended next registry:

- `project-brain/PART_COMPATIBILITY_REGISTRY_SPEC.md`

Reason:

- The knowledge graph validation found the highest-risk separation is Equipment Identity vs Parts Compatibility.
- The Manufacturer Knowledge Base already contains seed facts such as `20APM Oil Separator = 30PM Oil Separator` and `20APM Oil Separator != 20PM2 Oil Separator`.
- A dedicated part compatibility registry should store model + part category + compatible SKU/model evidence separately from model aliases.
