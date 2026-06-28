import Link from "next/link";
import { notFound } from "next/navigation";
import { BusinessDocumentType } from "@prisma/client";
import {
  SUPPORTED_DRAFT_DOCUMENT_TYPES,
} from "../../../../lib/business-document-draft-gateway";
import { BUSINESS_INTENT_POLICIES } from "../../../../lib/business-intent-policy";
import { buildProductionDraftRecommendation } from "../../../../lib/business-document-production-draft";
import {
  buildBusinessSuggestionPolicy,
  buildDraftReviewPolicy,
  buildExternalActionPolicy,
  buildLearningEvidencePolicy,
  buildServiceReportDraftPolicy,
} from "../../../../lib/business-action-policy";
import { getBusinessCaseByServiceReportId } from "../../business-case-runtime";
import { createBusinessDocumentDraftFromBusinessCase } from "./actions";

type BusinessCasePageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams?: Promise<{
    draftGatewayStatus?: string;
  }>;
};

export const dynamic = "force-dynamic";

function DomainPanel({
  title,
  status,
  summary,
  href,
}: {
  title: string;
  status: string;
  summary: string;
  href: string;
}) {
  return (
    <section className="info-panel">
      <h2>{title}</h2>
      <dl>
        <div>
          <dt>Status</dt>
          <dd>{status}</dd>
        </div>
        <div>
          <dt>Summary</dt>
          <dd>{summary}</dd>
        </div>
      </dl>
      {href ? (
        <Link className="button secondary" href={href}>
          Open
        </Link>
      ) : null}
    </section>
  );
}

export default async function BusinessCasePage({
  params,
  searchParams,
}: BusinessCasePageProps) {
  const { id } = await params;
  const status = (await searchParams)?.draftGatewayStatus;
  const businessCase = await getBusinessCaseByServiceReportId(id);
  const productionDraftRecommendation =
    await buildProductionDraftRecommendation(id);

  if (!businessCase) {
    notFound();
  }

  const hasMissingEvidence =
    (productionDraftRecommendation?.missingEvidence.length ?? 0) > 0;
  const hasLowConfidence =
    productionDraftRecommendation?.lines.some((line) => line.confidence === "Low") ??
    false;
  const hasReviewRequiredLines =
    productionDraftRecommendation?.lines.some(
      (line) =>
        line.needsApproval ||
        line.unitPrice === "Needs approval" ||
        line.unitPrice === "Needs Price Review",
    ) ?? false;
  const actionPolicies = [
    buildServiceReportDraftPolicy({
      hasServiceReport: Boolean(businessCase.source.id),
      hasCustomer: Boolean(businessCase.party.id),
      businessIntentAllowed: true,
      selectedDocumentType: BusinessDocumentType.QUOTE,
      allowedDocumentTypes: [BusinessDocumentType.QUOTE],
      idempotencyProtected: true,
      externalSideEffectsBlocked: true,
      hasMissingEvidence,
      hasLowConfidence,
      hasReviewRequiredLines,
    }),
    buildBusinessSuggestionPolicy(),
    buildDraftReviewPolicy(hasReviewRequiredLines),
    buildLearningEvidencePolicy(),
    buildExternalActionPolicy(),
  ];

  return (
    <section className="page-shell">
      <div className="detail-header">
        <div>
          <p className="eyebrow">BusinessCase Runtime</p>
          <h1>{businessCase.title}</h1>
          <p className="lede">
            Read-only operational context. BusinessCase orchestrates existing
            domain runtimes and does not own documents, approvals, financial
            intake, inventory, automation, or external adapters.
          </p>
        </div>
        <div className="actions">
          <Link className="button secondary" href={businessCase.source.href}>
            Service report
          </Link>
          <Link className="button secondary" href="/service-reports">
            Back to reports
          </Link>
        </div>
      </div>

      <div className="detail-grid">
        <section className="info-panel wide">
          <h2>End-to-End Service Flow</h2>
          <p>{businessCase.serviceFlow.boundary}</p>
          <div className="lifecycle-list">
            {businessCase.serviceFlow.steps.map((step) => (
              <div key={step.label} className="lifecycle-item">
                <div>
                  {step.href ? (
                    <Link href={step.href}>{step.label}</Link>
                  ) : (
                    <strong>{step.label}</strong>
                  )}
                  <p>{step.summary}</p>
                </div>
                <span>{step.status}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="info-panel wide">
          <h2>Business Intelligence Analysis</h2>
          <div className="detail-grid compact">
            {businessCase.serviceFlow.intelligence.map((item) => (
              <article key={item.label} className="info-panel">
                <h3>{item.label}</h3>
                <p>{item.value}</p>
                <small>{item.explanation}</small>
              </article>
            ))}
          </div>
        </section>

        <section className="info-panel wide">
          <h2>Business Suggestions</h2>
          <div className="lifecycle-list">
            {businessCase.serviceFlow.suggestions.map((suggestion) => (
              <div
                key={`${suggestion.ownerDomain}-${suggestion.label}`}
                className="lifecycle-item"
              >
                <div>
                  {suggestion.href ? (
                    <Link href={suggestion.href}>{suggestion.label}</Link>
                  ) : (
                    <strong>{suggestion.label}</strong>
                  )}
                  <p>{suggestion.explanation}</p>
                  <small>{suggestion.ownerDomain}</small>
                </div>
                <span>{suggestion.status}</span>
              </div>
            ))}
          </div>
        </section>

        {productionDraftRecommendation ? (
          <section className="info-panel wide">
            <h2>המלצת טיוטה עסקית</h2>
            <p>{productionDraftRecommendation.qualitySummary}</p>
            <p>{productionDraftRecommendation.estimatedManualWorkReduction}</p>
            <div className="detail-grid compact">
              <article className="info-panel">
                <h3>ביטחון</h3>
                <p>{productionDraftRecommendation.confidenceSummary}</p>
              </article>
              <article className="info-panel">
                <h3>ידע קודם לפני שאלות</h3>
                <p>
                  המערכת מנצלת קודם היסטוריית לקוח, ציוד, ערכות שירות,
                  מסמכים מאושרים ותיקונים מאושרים לפני סימון מידע כחסר.
                </p>
              </article>
            </div>
            <div className="table-card preview-table">
              <table>
                <thead>
                  <tr>
                    <th>שורה</th>
                    <th>כמות</th>
                    <th>מחיר יחידה</th>
                    <th>סה"כ</th>
                    <th>ביטחון</th>
                    <th>בדיקה</th>
                  </tr>
                </thead>
                <tbody>
                  {productionDraftRecommendation.lines.map((line) => (
                    <tr key={`${line.itemName}-${line.quantity}`}>
                      <td>
                        <strong>{line.itemName}</strong>
                        <span className="table-note">
                          {line.explanation}
                        </span>
                      </td>
                      <td>{line.quantity}</td>
                      <td>{line.unitPrice}</td>
                      <td>{line.totalPrice}</td>
                      <td>{line.confidenceLabel}</td>
                      <td>{line.needsApproval ? "נדרשת" : "תקין"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="detail-grid compact">
              <article className="info-panel">
                <h3>ידע ששימש</h3>
                <ul className="warning-list neutral">
                  {productionDraftRecommendation.knowledgeUsed.map((item) => (
                    <li key={item.source}>
                      <strong>{item.source}:</strong>{" "}
                      {item.status === "Used"
                        ? "שימש"
                        : item.status === "Missing"
                          ? "חסר"
                          : "חסום"}{" "}
                      -{" "}
                      {item.explanation}
                    </li>
                  ))}
                </ul>
              </article>
              <article className="info-panel">
                <h3>עדות חסרה</h3>
                {productionDraftRecommendation.missingEvidence.length ? (
                  <ul className="warning-list">
                    {productionDraftRecommendation.missingEvidence
                      .slice(0, 8)
                      .map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                  </ul>
                ) : (
                  <p>לא זוהתה עדות חסרה לטיוטה זו.</p>
                )}
              </article>
            </div>
          </section>
        ) : null}

        <section className="info-panel wide">
          <h2>Approval Ready</h2>
          <dl>
            <div>
              <dt>Status</dt>
              <dd>{businessCase.serviceFlow.approvalReadiness.status}</dd>
            </div>
            <div>
              <dt>Summary</dt>
              <dd>{businessCase.serviceFlow.approvalReadiness.summary}</dd>
            </div>
          </dl>
          {businessCase.serviceFlow.approvalReadiness.href ? (
            <Link
              className="button secondary"
              href={businessCase.serviceFlow.approvalReadiness.href}
            >
              Open approval context
            </Link>
          ) : null}
        </section>

        <section className="info-panel wide">
          <h2>BusinessDocument Draft Gateway</h2>
          <p>
            Creates one internal BusinessDocument draft from this BusinessCase
            when product policy allows it. The gateway uses current
            schema-supported document types, applies ServiceReport + DocumentType
            idempotency, and does not execute Maven, Invoice4U, email,
            inventory, receipt issuing, OCR, bank API, or customer-facing
            actions. Internal drafts are created automatically when safe; review
            and approval are reserved for the actions that need them.
          </p>
          {status ? (
            <p className="status-note">
              {status === "approval-required"
                ? "Policy requires explicit approval before creating this draft."
                : null}
              {status === "policy-blocked"
                ? "Product policy blocked internal draft creation. Review the policy table below."
                : null}
              {status === "document-type-required"
                ? "Select a document type before creating a draft."
                : null}
              {status === "intent-required"
                ? "Select a Business Intent before creating a draft."
                : null}
              {status === "unsupported-intent"
                ? "The selected Business Intent is not supported."
                : null}
              {status === "document-type-not-allowed"
                ? "The selected document type is not allowed for this Business Intent."
                : null}
              {status === "intent-blocked"
                ? "This Business Intent is blocked by its domain policy. Review the policy table below."
                : null}
              {status === "unsupported-document-type"
                ? "The selected document type is not supported by the current schema."
                : null}
              {status === "intelligence-incomplete"
                ? "Complete Business Intelligence must be visible before creating a draft."
                : null}
              {status === "pricing-review-required"
                ? "Confirm pricing review before creating a draft."
                : null}
              {status === "confidence-review-required"
                ? "Confirm confidence visibility before creating a draft."
                : null}
              {status === "missing-evidence-review-required"
                ? "Confirm missing evidence visibility before creating a draft."
                : null}
              {status === "pricing-override-required"
                ? "Review-required or missing-price lines require the pricing override checkbox."
                : null}
              {status === "invalid-lines"
                ? "Draft creation is blocked because the generated draft line is invalid."
                : null}
              {status === "not-found"
                ? "The source BusinessCase was not found."
                : null}
            </p>
          ) : null}
          <form
            action={createBusinessDocumentDraftFromBusinessCase}
            className="approval-form"
          >
            <input
              name="serviceReportId"
              type="hidden"
              value={businessCase.source.id}
            />
            <label>
              Business Intent
              <select name="businessIntent" defaultValue="PROPOSE_WORK">
                {BUSINESS_INTENT_POLICIES.map((policy) => (
                  <option key={policy.intent} value={policy.intent}>
                    {policy.intent} / {policy.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Selected document type
              <select name="documentType" defaultValue="QUOTE">
                {SUPPORTED_DRAFT_DOCUMENT_TYPES.map((documentType) => (
                  <option key={documentType} value={documentType}>
                    {documentType}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Run by
              <input name="approvedBy" defaultValue="Policy Automation" />
            </label>
            <label className="checkbox-row">
              <input name="billableWorkConfirmed" type="checkbox" />
              Completed billable work is confirmed for invoice intent.
            </label>
            <label className="checkbox-row">
              <input name="internalOverrideConfirmed" type="checkbox" />
              Internal override is confirmed when required by policy; external
              action remains blocked.
            </label>
            <button className="button" type="submit">
              Generate policy-safe internal draft
            </button>
          </form>
          <div className="table-card preview-table">
            <table>
              <thead>
                <tr>
                  <th>Action</th>
                  <th>Policy</th>
                  <th>Automatic</th>
                  <th>Owner</th>
                  <th>Reason</th>
                </tr>
              </thead>
              <tbody>
                {actionPolicies.map((policy) => (
                  <tr key={policy.action}>
                    <td>{policy.action}</td>
                    <td>
                      <strong>{policy.state}</strong>
                    </td>
                    <td>{policy.automatic ? "Yes" : "No"}</td>
                    <td>{policy.ownerDomain}</td>
                    <td>
                      {[
                        policy.summary,
                        ...policy.blockers,
                        ...policy.reviewReasons,
                        ...policy.approvalReasons,
                      ].join(" ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="table-card preview-table">
            <table>
              <thead>
                <tr>
                  <th>Intent</th>
                  <th>Owner</th>
                  <th>Allowed Draft Types</th>
                  <th>Can Draft Now</th>
                  <th>Blocked Conditions</th>
                </tr>
              </thead>
              <tbody>
                {BUSINESS_INTENT_POLICIES.map((policy) => (
                  <tr key={policy.intent}>
                    <td>
                      <strong>{policy.intent}</strong>
                      <span className="table-note">{policy.label}</span>
                    </td>
                    <td>{policy.ownerDomain}</td>
                    <td>
                      {policy.allowedDocumentTypes.length
                        ? policy.allowedDocumentTypes.join(", ")
                        : "No BusinessDocument draft"}
                    </td>
                    <td>
                      {policy.canCreateBusinessDocumentDraftNow ? "Yes" : "No"}
                    </td>
                    <td>
                      {policy.blockedConditions.length
                        ? policy.blockedConditions.join("; ")
                        : "Policy validations apply"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="info-panel">
          <h2>Case summary</h2>
          <dl>
            <div>
              <dt>Case ID</dt>
              <dd>{businessCase.id}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>{businessCase.status}</dd>
            </div>
            <div>
              <dt>Source</dt>
              <dd>
                <Link href={businessCase.source.href}>
                  {businessCase.source.label}
                </Link>
              </dd>
            </div>
          </dl>
        </section>

        <section className="info-panel">
          <h2>Party</h2>
          <dl>
            <div>
              <dt>Customer</dt>
              <dd>
                {businessCase.party.href ? (
                  <Link href={businessCase.party.href}>
                    {businessCase.party.name}
                  </Link>
                ) : (
                  businessCase.party.name
                )}
              </dd>
            </div>
            <div>
              <dt>Contact</dt>
              <dd>{businessCase.party.contactName}</dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>{businessCase.party.phone}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{businessCase.party.email}</dd>
            </div>
          </dl>
        </section>

        <section className="info-panel wide">
          <h2>Assets</h2>
          <div className="equipment-list">
            {businessCase.assets.map((asset) => (
              <article key={asset.id} className="equipment-item">
                <div>
                  <h3>
                    <Link href={asset.href}>{asset.label}</Link>
                  </h3>
                  <p>
                    {asset.model} / Serial {asset.serialNumber}
                  </p>
                </div>
                <span className="equipment-status">{asset.status}</span>
              </article>
            ))}
            {!businessCase.assets.length ? (
              <p>No assets are linked to this BusinessCase.</p>
            ) : null}
          </div>
        </section>

        <DomainPanel title="Service Operations" {...businessCase.service} />
        <DomainPanel
          title="AI Recommendation"
          {...businessCase.aiRecommendation}
        />
        <DomainPanel title="Commercial" {...businessCase.commercial} />
        <DomainPanel title="Approval" {...businessCase.approval} />
        <DomainPanel title="Automation" {...businessCase.automation} />
        <DomainPanel title="Financial Intake" {...businessCase.financial} />
        <DomainPanel title="Inventory Impact" {...businessCase.inventory} />

        <section className="info-panel wide">
          <h2>Open blockers</h2>
          {businessCase.blockers.length ? (
            <ul className="warning-list">
              {businessCase.blockers.map((blocker) => (
                <li key={`${blocker.domain}-${blocker.message}`}>
                  <strong>{blocker.domain}:</strong> {blocker.message}
                </li>
              ))}
            </ul>
          ) : (
            <ul className="warning-list neutral">
              <li>No current blockers were found by the read-only runtime.</li>
            </ul>
          )}
        </section>

        <section className="info-panel wide">
          <h2>Closure readiness</h2>
          <p>{businessCase.closureReadiness.summary}</p>
        </section>

        <section className="info-panel wide">
          <h2>Business timeline</h2>
          <div className="lifecycle-list">
            {businessCase.timeline.map((event) => (
              <div key={`${event.label}-${event.href}`} className="lifecycle-item">
                <Link href={event.href}>{event.label}</Link>
                <span>{event.status}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
