# AI Draft Readiness Recheck

Date: 2026-06-24

Mode: documentation-only readiness recheck

Scope: AI Draft recommendation readiness after Liad-approved compressor service business-rule update.

No code, DB write, Prisma change, import, BusinessDocument creation, BusinessDocumentItem creation, Maven/Invoice4U action, inventory action, email runtime, Google Sheets write, Apps Script change, or production workflow change is approved by this recheck.

## 1. Inputs Reviewed

- `project-brain/AI_DRAFT_RECOMMENDATION_READINESS_DECISION_PACKET.md`
- `AI_DRAFT_RUNTIME_BLUEPRINT.md`
- `AI_DRAFT_RECOMMENDATION_PREVIEW_5806.md`
- `project-brain/SERVICE_PATTERN_INTELLIGENCE_REGISTRY.md`
- `project-brain/SERVICE_COMMERCIAL_RULES.md`
- `project-brain/MANUFACTURER_KNOWLEDGE_BASE.md`
- `project-brain/DECISION_LOG.md`

## 2. Approved Business Rules Applied

| Rule | Approved decision | Readiness effect |
|---|---|---|
| SCR Small Service Kit | SCR compressor 2000h / 2500h small service default kit includes Air Filter, Oil Filter, and 3L SKR oil top-up | Resolves kit-content and small-service oil quantity/action ambiguity |
| Labor + Service | Separate commercial line; not included in the small service kit unless explicit historical evidence says otherwise | Resolves labor-in-kit ambiguity |
| Technician Visit / Travel | One commercial line; default suggested price `300` ILS | Resolves default visit/travel suggestion rule |
| Nearby/customer-specific travel exception | Technician Visit / Travel may be waived for nearby customers | Keeps `NeedsApproval = true` when evidence conflicts or customer-specific history exists |
| Large Service Oil | 4000h / 5000h Large Service replaces the full oil content | Resolves large-service oil top-up vs replacement rule |
| Partial Serial | Partial serial remains `NEEDS_MANUAL_CONFIRMATION`; do not classify as `HIGH_WITH_REVIEW` | Resolves serial-confidence policy |

## 3. Blockers Resolved

Resolved blockers:

- Small-service kit content is now approved for SCR compressors.
- SCR Small Service oil handling is now defined as `3L SKR oil top-up`.
- Labor + Service is now a separate commercial line by default.
- Technician Visit / Travel has an approved default suggested price of `300` ILS.
- Large Service oil action is now full oil replacement, not top-up.
- Partial serial confidence is now governed as `NEEDS_MANUAL_CONFIRMATION`.
- Internal SKU naming remains deferred and does not block AI Draft readiness because manufacturer part numbers are sufficient technical evidence for the current AI Draft intelligence phase.

## 4. Blockers Remaining

Remaining blockers are execution/write blockers, not recommendation-readiness blockers:

- No implementation exists for runtime AI Draft generation from these rules.
- No approval exists to write `BusinessDocuments`.
- No approval exists to write `BusinessDocumentItems`.
- No approval exists to create Maven/Invoice4U documents.
- No approval exists to deduct inventory.
- No approval exists to send customer email.
- No DB write/import/migration approval exists.

Remaining per-recommendation review flags:

- Service Report `5806` Maven doc `102452` partial serial `SW85183` requires manual confirmation before treating it as confirmed equipment identity.
- Kit price `1213.38` ILS is evidence-backed, but repeated price is not a contract; generated drafts still need price approval.
- Labor + Service price has conflict evidence: historical `225-250` ILS vs fixed rule `275` ILS/hour.
- Technician Visit / Travel has conflict evidence: direct compressor docs `0` ILS, report-linked dryer/filter work `250` ILS, default suggested price `300` ILS.
- VAT/tax display policy, document type/status policy, stale-price/date-window policy, and runtime registry implementation remain future design/implementation gates.

## 5. Readiness Verdict

AI Draft is now:

```text
READY_FOR_APPROVAL_BASED_DRAFTS
```

Meaning:

- AI Draft may generate an evidence-backed recommendation preview.
- Draft title/header must identify the compressor model first.
- Service lines must evaluate Parts, oil handling, Labor + Service, and Technician Visit / Travel.
- Lines must show `INCLUDED`, `EXCLUDED`, or `NEEDS_APPROVAL`.
- Manufacturer part numbers may be used as technical evidence.
- Customer price evidence must come from Maven/history/pricing evidence, not manufacturer cost.
- Partial serial evidence must show `NEEDS_MANUAL_CONFIRMATION`.
- Every generated draft still requires Liad/user approval before any write or external action.

Not approved:

- automatic BusinessDocument creation
- automatic BusinessDocumentItem creation
- automatic Maven/Invoice4U action
- automatic price approval
- automatic inventory deduction
- automatic email/customer sending
- DB writes, imports, Prisma changes, or runtime workflow changes

## 6. Exact Decision Still Missing

No additional business-rule decision is required to move from `PARTIALLY` to `READY_FOR_APPROVAL_BASED_DRAFTS`.

The next missing decision is not a business-rule decision. It is an implementation approval decision:

```text
Should Codex build a read-only AI Draft Recommendation Preview runtime/shell for one service report,
using the approved readiness rules and no writes?
```

## 7. Recommended Next Task

Create an implementation mission packet for a read-only AI Draft Recommendation Preview shell for Service Report `5806`.

Required boundaries:

- read-only
- no DB writes
- no Prisma changes
- no Maven/Invoice4U action
- no BusinessDocument creation
- no inventory action
- no email runtime
- output preview only
