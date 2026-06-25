# Equipment Identity Registry Discovery

Date: 2026-06-24

Mode: read-only discovery.

Runtime impact: none. No merge, normalization, import, DB write, Prisma change, code change, Maven/Invoice4U action, inventory action, or workflow implementation was performed.

## 1. Executive Summary

The equipment evidence is rich enough to start an Equipment Identity Candidate Registry, but not safe enough for automatic identity merging.

The strongest current identity evidence is exact raw model text plus equipment type, serial number, customer/report history, and service pattern history. The safest current rule is:

- exact model text can identify an evidence bucket
- possible aliases can be suggested for review
- generic descriptions remain `UNKNOWN_MODEL` / `GENERIC_HP_CLASS`
- horsepower is an attribute only, not model identity
- dryer, line-filter, tank, oil, or part/filter model text must not be merged into compressor model records
- `MODEL_ALIAS` is not the same as `PART_COMPATIBILITY`

Most important finding: several rows contain `SCR` text but are not SCR compressor model identities. Examples include dryers (`SCR-0070NF`, `SCR=019NF`) and line filters (`SCR-0170(T/A/AA/H)`). These must remain separate from compressor models such as `SCR20APM`, `SCR20EPM`, `SCR-40PM`, `SCR50EPM`, and `SCR20XAמס2`.

## 2. Evidence Sources Inspected

- `data-sources/exports/ReportEquipmentItems.csv`
- `data-sources/exports/ServiceReports.csv`
- `project-brain/SERVICE_COMMERCIAL_RULES.md`
- `project-brain/SKU_MATCHING_RULES.md`
- `project-brain/DECISION_LOG.md`
- `project-brain/TASK_BOARD.md`
- `project-brain/implementation/EQUIPMENT_REGISTRY_IMPLEMENTATION_PLAN.md`

Evidence fields used from `ReportEquipmentItems.csv`:

- `ItemID`
- `ReportID`
- `סוג ציוד`
- `תת סוג ציוד`
- `דגם הציוד`
- `מס סידורי`
- `תיאור השירות`
- `מונה שעות נוכחי`
- `טיפול הבא`
- `קטגוריית מדחס`
- `סוג שמן`

Evidence fields used from `ServiceReports.csv`:

- `ReportID`
- `ReportCounter`
- `CustomerID`
- `שם לקוח`
- `סוג שירות`

## 3. Classification Model

### HIGH Confidence Identity

Use only when the raw candidate has repeated evidence and the same equipment class.

Signals:

- exact model text appears repeatedly
- equipment type is consistent
- serial evidence exists
- service report count is greater than one
- customer count is greater than one, or repeated serial/service evidence supports the identity bucket

### MEDIUM Confidence Alias

Use only as a review candidate, not a merge.

Signals:

- similar raw model strings exist
- model family appears likely from text
- serial evidence may overlap
- suffixes, punctuation, location text, or embedded Hebrew text prevent automatic merge

### LOW Confidence Generic Description

Use when model identity is missing, generic, malformed, or mixed with service/location text.

Signals:

- blank model
- horsepower-only model
- generic equipment description
- model text includes only type/class, not exact model
- text appears to describe a part, filter, dryer, oil, or location rather than a compressor model

## 3A. Model Alias vs Part Compatibility Rule

Approved Liad rule:

```text
MODEL_ALIAS != PART_COMPATIBILITY
```

Equipment Identity and Parts Compatibility are separate layers.

Approved model identity aliases:

- `10APM = 10PM2`
- `20APM = 20PM2`

Important boundary:

- A model alias does not automatically imply identical service kits.
- A model alias does not automatically imply identical spare parts.
- A model alias does not automatically approve oil separator matching.
- Compatibility must be stored separately from alias mappings.

Known approved compatibility exception:

- `20APM Oil Separator = 30PM Oil Separator`

Known non-compatibility:

- `20APM Oil Separator != 20PM2 Oil Separator`

This means `20APM <-> 20PM2` can be an approved model alias while `20APM` still uses a different oil separator compatibility rule.

Any future Equipment Identity registry must not store parts compatibility as a side effect of model aliasing.

## 4. Equipment Identity Candidate Registry

All `Canonical candidate model` values below are evidence bucket labels only. They are not approved normalized models.

| Canonical candidate model | Equipment type(s) | Observations | Service report count | Customer count | Serial numbers found | Service pattern count | Classification |
|---|---:|---:|---:|---:|---|---:|---|
| `SCR20APM` | מדחס אויר | 5 | 5 | 5 | `SW853345`; `SW-857656`; `SW857657`; `Sw857659`; `SW864086` | 5 | HIGH confidence exact identity |
| `SCR20EPM` | מדחס אויר | 2 | 2 | 2 | `SW848659` | 2 | MEDIUM confidence exact identity |
| `SCR-40PM` | מדחס אויר | 2 | 1 | 1 | `SW851838`; `SW854751` | 2 | MEDIUM confidence exact identity |
| `SCR50EPM` | מדחס אויר | 2 | 2 | 2 | `SW853119` | 2 | MEDIUM confidence exact identity |
| `SCR20XAמס2` | מדחס אויר | 2 | 2 | 1 | `S N:S1872142`; `SI872142` | 2 | MEDIUM confidence exact identity; oil-free scroll |
| `SCR10APM` | מדחס אויר | 2 | 2 | 2 | `Sw869881` | 2 | MEDIUM confidence exact identity |
| `10APM` | מדחס אויר | 2 | 2 | 1 | `SW3725623875`; `SW874365` | 2 | MEDIUM confidence possible alias family |
| `EL15` | מייבש אויר | 2 | 1 | 0 | none | 1 | LOW confidence dryer identity |
| `מייבש אוויר` | מייבש אויר | 2 | 2 | 2 | `חסר` | 2 | LOW confidence generic dryer description |
| `? SCR20APM` | מדחס אויר | 1 | 1 | 1 | `SW853346` | 1 | MEDIUM confidence possible alias; question mark blocks merge |
| `100APM-8` | מדחס אויר | 1 | 1 | 1 | `SW 885504` | 1 | MEDIUM confidence possible alias family |
| `SCR100APM` | מדחס אויר | 1 | 1 | 1 | `Sw885504.` | 1 | MEDIUM confidence possible alias family |
| `SCR-10APM` | מדחס אויר | 1 | 1 | 1 | `SW663997` | 1 | MEDIUM confidence possible alias family |
| `SCR10APMבניין /I.B.C` | מדחס אויר | 1 | 1 | 1 | none | 1 | MEDIUM confidence possible alias with location suffix |
| `מדחס אוויר דגם SCR10APMמס 2` | מדחס אויר | 1 | 1 | 1 | none | 1 | MEDIUM confidence possible alias; embedded description blocks merge |
| `מדחס אוויר דגםSCR20לחץ גבוה  מס:2` | מדחס אויר | 1 | 1 | 1 | none | 1 | LOW confidence SCR20 generic/high-pressure description |
| `SCR-0070NF` | מייבש אויר | 1 | 1 | 1 | none | 1 | LOW confidence dryer identity; must not merge with compressor SCR |
| `SCR=019NF` | מייבש אויר | 1 | 1 | 1 | `20220303L33` | 1 | LOW confidence dryer identity; must not merge with compressor SCR |
| `SCR-0170(T/A/AA/H)` | מסנני קו | 1 | 1 | 1 | none | 0 | LOW confidence line-filter identity; must not merge with compressor SCR |
| `GA-11VSD` | מדחס אויר | 1 | 1 | 1 | `CAI707512` | 1 | MEDIUM confidence exact identity |
| `GA18FF אטלס קופקו` | מדחס אויר | 1 | 1 | 1 | `S.N` | 1 | LOW confidence Atlas Copco model/manufacturer text |
| `GA-26 FF` | מדחס אויר | 1 | 1 | 1 | `API327308` | 1 | MEDIUM confidence exact identity |
| `BSD72` | מדחס אויר | 1 | 1 | 1 | none | 1 | LOW confidence exact identity candidate |
| `LG-11A` | מדחס אויר | 1 | 1 | 1 | `205211115906130` | 1 | MEDIUM confidence exact identity |
| `OH35` | מדחס אויר | 1 | 1 | 0 | `1411` | 1 | LOW confidence exact identity candidate |
| `Tal comp` | מדחס אויר | 1 | 1 | 1 | `22120068` | 1 | LOW confidence manufacturer/model ambiguous |
| `אירסטור10כס` | מדחס אויר | 1 | 1 | 1 | `1020010315` | 1 | LOW confidence manufacturer plus horsepower |
| `בוטרני50כס` | מדחס אויר | 1 | 1 | 1 | `חסר` | 1 | LOW confidence manufacturer plus horsepower |
| `טמסאן ?TVK1100E` | מדחס אויר | 1 | 1 | 1 | `3765` | 1 | LOW confidence exact identity candidate |
| `מדחס סיני 22KW/30כס RMC-30VSD` | מדחס אויר | 1 | 1 | 1 | `2108030481` | 1 | LOW confidence mixed description/model/hp |
| `מדחס קייזרSK22` | מדחס אויר | 1 | 1 | 1 | none | 1 | LOW confidence manufacturer/model text |
| `אטלס` | מדחס אויר | 1 | 1 | 1 | `חסר` | 0 | LOW confidence manufacturer-only |
| `וורגינטון` | מדחס אויר | 1 | 1 | 1 | `חסר` | 1 | LOW confidence manufacturer-only |
| `מדחס אוויר` | מדחס אויר | 1 | 1 | 1 | `SW854788` | 1 | LOW confidence generic compressor description |
| `מדחס בורגי` | מדחס אויר | 1 | 1 | 1 | `SW850394` | 1 | LOW confidence generic compressor description |
| `מדחס חדש ומדחס שייך לחברת נמל.` | מדחס אויר | 1 | 1 | 1 | none | 1 | LOW confidence narrative description |
| `7.5 כס` | מדחס אויר | 1 | 1 | 1 | none | 1 | LOW confidence horsepower-only |
| `הוסמן20כס` | מדחס אויר | 1 | 1 | 1 | none | 1 | LOW confidence manufacturer/hp, not model identity |
| `שמן סינטטי SEL46` | מדחס אויר | 1 | 1 | 1 | `חסר` | 1 | LOW confidence oil/product text, not equipment model |
| `150L` | מיכל לחץ | 1 | 1 | 0 | none | 0 | LOW confidence tank size |
| `SDLF-6` | מייבש אויר | 1 | 1 | 1 | `L-YJ172384` | 1 | MEDIUM confidence dryer identity |
| `SDLF-8` | מייבש אויר | 1 | 1 | 1 | `L-YJ172386` | 1 | MEDIUM confidence dryer identity |
| `מייבש אוויר דגם מיקוב` | מייבש אויר | 1 | 1 | 1 | none | 1 | LOW confidence dryer manufacturer/model text |
| `מייבש מיקרופור תוצרת טורקיה` | מייבש אויר | 1 | 1 | 1 | none | 1 | LOW confidence dryer manufacturer text |
| `מיקוב 2.6 ליטר/דקה` | מייבש אויר | 1 | 1 | 1 | none | 1 | LOW confidence dryer capacity text |
| `מיקוב2.6ליטר` | מייבש אויר | 1 | 1 | 1 | none | 1 | LOW confidence dryer capacity text |
| `D-200-A+H` | מסנני קו | 1 | 1 | 0 | none | 1 | LOW confidence line-filter model |
| `D200x3יחידות` | מסנני קו | 1 | 1 | 1 | none | 0 | LOW confidence line-filter/count text |
| `DA-400 אלמנט סינון 1 m` | מסנני קו | 1 | 1 | 1 | none | 0 | LOW confidence line-filter element text |
| `DD70+/DP70+הוחלפו שתי יחידות אלמנטים` | מסנני קו | 1 | 1 | 1 | none | 0 | LOW confidence line-filter/service text |
| `בתי אלמנט דגם אטלס-DD20+/DP20+` | מסנני קו | 1 | 1 | 1 | none | 0 | LOW confidence line-filter housing text |
| `מסנן מיקרופור X+Y` | מסנני קו | 1 | 1 | 0 | none | 1 | LOW confidence filter model text |
| `מיקרו X+X+Y` | מסנני קו | 1 | 1 | 0 | `אריארי` | 0 | LOW confidence filter text |
| `מיקרו` | מסנני קו | 1 | 1 | 0 | none | 0 | LOW confidence generic filter text |
| `מי3רטק` | מסנני קו | 1 | 1 | 0 | none | 1 | LOW confidence malformed filter text |
| `אנרקנקנ` | מסנני קו | 1 | 1 | 0 | none | 0 | LOW confidence malformed/test-like text |
| `215121` | מדחס אויר | 1 | 1 | 0 | none | 1 | LOW confidence numeric-only model |
| `אלאב` | מדחס אויר | 1 | 1 | 0 | none | 0 | LOW confidence malformed/test-like text |
| `אלאהב` | מדחס אויר | 1 | 1 | 0 | none | 1 | LOW confidence malformed/test-like text |
| `אללאב` | מדחס אויר | 1 | 1 | 0 | `1212121` | 1 | LOW confidence malformed/test-like text |
| `כעכעכי` | מדחס אויר | 1 | 1 | 0 | `כי55674` | 1 | LOW confidence malformed/test-like text |
| `רכרכרכ` | מדחס אויר | 1 | 1 | 0 | none | 1 | LOW confidence malformed/test-like text |
| `רעע` | מדחס אויר | 1 | 1 | 0 | none | 0 | LOW confidence malformed/test-like text |
| `חגצגמ` | מייבש אויר | 1 | 1 | 0 | `2737` | 1 | LOW confidence malformed/test-like dryer text |
| `לרררר` | מייבש אויר | 1 | 1 | 0 | `2525` | 1 | LOW confidence malformed/test-like dryer text |
| `[BLANK_MODEL]` | אחר; מדחס אויר; מייבש אויר; מיכל לחץ; מסנני קו | 32 | 20 | 14 | `100734.1`; `SW851890`; `Sw855287`; `SW864`; `אא5א`; `רנערנ` | 9 | LOW confidence unknown model |

## 5. SCR Models And Variants

### Likely Same Model Family, But Not Merged

These rows may represent the same model family or a manually approvable alias relationship. They must remain separate until Liad approves a mapping with evidence.

| Candidate family | Observed raw strings | Evidence | Current decision |
|---|---|---|---|
| `SCR20APM` family | `SCR20APM`; `? SCR20APM` | Same visible model token; one row has question mark; serials differ | Likely alias candidate; do not merge automatically |
| `SCR10APM` family | `SCR10APM`; `SCR-10APM`; `10APM`; `SCR10APMבניין /I.B.C`; `מדחס אוויר דגם SCR10APMמס 2` | Same/near model token appears, but punctuation, missing `SCR`, location suffix, and embedded description vary | Likely alias candidate; do not merge automatically |
| `SCR100APM` family | `SCR100APM`; `100APM-8` | Serial evidence appears related: `Sw885504.` vs `SW 885504`; raw model suffix differs | Strong review candidate; do not merge automatically |
| `SCR20XAמס2` | `SCR20XAמס2` | Repeated raw string; oil-free scroll subtype | Exact bucket only; keep separate from `SCR20APM` and `SCR20EPM` |

### Must Remain Separate SCR-Labeled Rows

| Raw string | Equipment type | Reason |
|---|---|---|
| `SCR20APM` | מדחס אויר / בורגי | Compressor model bucket; not the same as `SCR20EPM` or `SCR20XAמס2` |
| `SCR20EPM` | מדחס אויר / בורגי | Compressor model bucket; EPM is not APM |
| `SCR-40PM` | מדחס אויר / בורגי | Compressor model bucket; not a generic 40 HP record |
| `SCR50EPM` | מדחס אויר / בורגי | Compressor model bucket; not a generic 50 HP record |
| `SCR20XAמס2` | מדחס אויר / סקרול נטול שמן | Oil-free scroll; must not merge with oil-injected screw models |
| `SCR-0070NF` | מייבש אויר | Dryer; not a compressor |
| `SCR=019NF` | מייבש אויר | Dryer; not a compressor |
| `SCR-0170(T/A/AA/H)` | מסנני קו | Line filter; not a compressor |
| `מדחס אוויר דגםSCR20לחץ גבוה  מס:2` | מדחס אויר / בורגי | Generic/high-pressure SCR20 text; not enough evidence for APM/EPM/XA |

## 6. Generic Descriptions

The following descriptions must be treated as `UNKNOWN_MODEL` or `GENERIC_HP_CLASS` unless additional evidence exists:

- `מדחס אוויר`
- `מדחס בורגי`
- `מדחס חדש ומדחס שייך לחברת נמל.`
- `7.5 כס`
- `הוסמן20כס`
- `אירסטור10כס`
- `בוטרני50כס`
- `מדחס סיני 22KW/30כס RMC-30VSD`
- `מדחס אוויר דגםSCR20לחץ גבוה  מס:2`
- `[BLANK_MODEL]`

Generic equipment descriptions must not trigger automatic SKU matching or automatic model identity matching.

## 7. Manufacturers Observed

Manufacturer evidence is mostly embedded in free text and must remain evidence-only.

| Manufacturer hint | Evidence rows |
|---|---|
| Atlas / Atlas Copco | `GA18FF אטלס קופקו`; `אטלס`; `בתי אלמנט דגם אטלס-DD20+/DP20+` |
| Kaeser | `מדחס קייזרSK22` |
| Mikropor / Micro | `מסנן מיקרופור X+Y`; `מייבש מיקרופור תוצרת טורקיה`; `מיקרו X+X+Y`; `מיקרו` |
| Mikov | `מייבש אוויר דגם מיקוב`; `מיקוב 2.6 ליטר/דקה`; `מיקוב2.6ליטר` |
| Tamsan | `טמסאן ?TVK1100E` |
| Bottarini | `בוטרני50כס` |
| Airstore | `אירסטור10כס` |
| SCR | Present in many model strings, but manufacturer identity is not assumed in this report |

## 8. Equipment Types Observed

- `מדחס אויר`
- `מייבש אויר`
- `מסנני קו`
- `מיכל לחץ`
- `אחר`

Equipment type must be part of identity evaluation. Similar model text across different equipment types is not enough for a merge.

## 9. Must Never Merge List

### Generic Horsepower Descriptions

Never merge horsepower-only or horsepower-dominant descriptions into specific compressor models:

- `7.5 כס`
- `הוסמן20כס`
- `אירסטור10כס`
- `בוטרני50כס`
- generic `20 כ"ס`
- generic `30כס`
- generic `22KW`

Horsepower can be stored as an attribute only.

### Generic Compressor Descriptions

Never merge these into a specific model without exact model/serial/customer equipment evidence:

- `מדחס אוויר`
- `מדחס בורגי`
- `מדחס חדש ומדחס שייך לחברת נמל.`
- `[BLANK_MODEL]`

### Filter Models Mixed With Compressor Models

Never merge filter/line-filter rows into compressor models:

- `בתי אלמנט דגם אטלס-DD20+/DP20+`
- `DD70+/DP70+הוחלפו שתי יחידות אלמנטים`
- `D200x3יחידות`
- `DA-400 אלמנט סינון 1 m`
- `D-200-A+H`
- `מסנן מיקרופור X+Y`
- `מיקרו X+X+Y`
- `מיקרו`
- `SCR-0170(T/A/AA/H)`

### Dryer Models Mixed With Compressor Models

Never merge dryer rows into compressor models:

- `SCR-0070NF`
- `SCR=019NF`
- `SDLF-6`
- `SDLF-8`
- `EL15`
- `מייבש אוויר`
- `מייבש אוויר דגם מיקוב`
- `מייבש מיקרופור תוצרת טורקיה`
- `מיקוב 2.6 ליטר/דקה`
- `מיקוב2.6ליטר`

### Similar SCR Compressor Families

Never merge these without approved Liad mapping:

- `SCR20APM` with `SCR20EPM`
- `SCR20APM` with `SCR20XAמס2`
- `SCR20EPM` with `SCR20XAמס2`
- `SCR-40PM` with generic `40PM` or horsepower text
- `SCR50EPM` with generic `50 HP` / `50כס`
- `SCR10APM` with `10APM` or `SCR-10APM` before approval

## 10. Most Important Section: Likely Same vs Must Remain Separate

### Likely Same Model, Pending Approval

These are the strongest alias review candidates:

1. `SCR100APM` and `100APM-8`
   - Evidence: serial text appears to point to the same value family: `Sw885504.` and `SW 885504`.
   - Risk: suffix `-8`, punctuation, and one observation per raw string.
   - Recommendation: manual Liad mapping required before any merge.

2. `SCR20APM` and `? SCR20APM`
   - Evidence: exact model token appears; both are screw compressors.
   - Risk: question mark is explicit uncertainty in source text.
   - Recommendation: keep separate until serial/customer equipment registry confirms.

3. `SCR10APM`, `SCR-10APM`, `10APM`, `SCR10APMבניין /I.B.C`, and `מדחס אוויר דגם SCR10APMמס 2`
   - Evidence: repeated 10APM token family.
   - Risk: missing `SCR`, punctuation differences, location suffix, and embedded narrative text.
   - Recommendation: candidate alias group only; no automatic merge.

### Must Remain Separate

These must remain separate even though text appears similar:

1. `SCR20APM`, `SCR20EPM`, and `SCR20XAמס2`
   - Reason: APM, EPM, and XA are different model strings; `SCR20XAמס2` is `סקרול נטול שמן`.

2. `SCR-0070NF`, `SCR=019NF`, and SCR compressor models
   - Reason: equipment type is dryer, not compressor.

3. `SCR-0170(T/A/AA/H)` and SCR compressor models
   - Reason: equipment type is line filter, not compressor.

4. Generic horsepower rows and any exact SCR model
   - Reason: horsepower is not identity.

5. Filter or oil product text and any equipment model
   - Reason: part/product descriptions are not equipment model identities.

## 11. Risks

- Data risk: blank model rows exist across compressor, dryer, filter, tank, and other equipment types.
- Logic risk: model text contains free-form Hebrew, punctuation, location suffixes, serial-like values, and service notes.
- Architecture risk: a future registry could accidentally normalize too early and collapse distinct equipment types.
- SKU risk: generic model strings could incorrectly trigger parts/SKU recommendations.
- AI Draft risk: price or parts recommendations could look confident if the model identity layer is not explicit.
- Inventory risk: identity evidence must not create inventory deduction authority.
- Business risk: repeated service history is evidence, not a contract, not a mapping approval, and not approval to create BusinessDocuments.

## 12. Recommended Next Decision Gate

Before implementation, Liad should approve an Equipment Identity Governance Rule:

1. Exact raw model buckets are allowed for evidence display.
2. Alias candidates are allowed for review only.
3. Approved aliases require evidence packet plus Liad approval.
4. Generic rows stay `UNKNOWN_MODEL` / `GENERIC_HP_CLASS`.
5. Dryer/filter/tank/oil/product rows cannot merge into compressor models.
6. No SKU matching, pricing automation, BusinessDocument creation, Maven/Invoice4U action, or inventory deduction can use a generic identity.

Recommended next documentation task:

- Create an `EQUIPMENT_IDENTITY_GOVERNANCE_RULES.md` specification, or add these rules to the existing intelligence specs, before any implementation.
