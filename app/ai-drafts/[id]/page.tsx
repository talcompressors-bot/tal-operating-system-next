import Link from "next/link";
import { notFound } from "next/navigation";
import { getAiDraftById } from "../ai-draft-adapter";

export const dynamic = "force-dynamic";

type AiDraftDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AiDraftDetailPage({
  params,
}: AiDraftDetailPageProps) {
  const { id } = await params;
  const draft = await getAiDraftById(id);

  if (!draft) {
    notFound();
  }

  return (
    <section className="page-shell">
      <div className="detail-header">
        <div>
          <p className="eyebrow">AI Draft Suggestion</p>
          <h1>{draft.title}</h1>
          <p className="lede">
            Read-only AI draft detail with suggested document, approval, and
            future Maven lifecycle placeholders.
          </p>
        </div>
        <div className="actions">
          <Link className="button secondary" href="/ai-drafts">
            Back to AI drafts
          </Link>
          {draft.serviceReportId ? (
            <Link
              className="button secondary"
              href={`/service-reports/${draft.serviceReportId}`}
            >
              Service report
            </Link>
          ) : null}
        </div>
      </div>

      <div className="detail-grid">
        <article className="info-panel">
          <h2>Draft status</h2>
          <dl>
            <div>
              <dt>AppSheet suggestion ID</dt>
              <dd>{draft.id}</dd>
            </div>
            <div>
              <dt>Internal ID</dt>
              <dd>{draft.internalId}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>{draft.draftStatus}</dd>
            </div>
            <div>
              <dt>Confidence</dt>
              <dd>{draft.confidenceLevel}</dd>
            </div>
            <div>
              <dt>Priority</dt>
              <dd>{draft.suggestedPriority}</dd>
            </div>
          </dl>
        </article>

        <article className="info-panel">
          <h2>Suggested document</h2>
          <dl>
            <div>
              <dt>Document type</dt>
              <dd>{draft.suggestedDocumentType}</dd>
            </div>
            <div>
              <dt>Suggested total</dt>
              <dd>{draft.suggestedTotalAmount}</dd>
            </div>
            <div>
              <dt>Suggested notes</dt>
              <dd>{draft.suggestedNotes}</dd>
            </div>
          </dl>
        </article>

        <article className="info-panel wide">
          <h2>Suggested parts and labor</h2>
          <dl>
            <div>
              <dt>Suggested parts</dt>
              <dd>{draft.suggestedParts}</dd>
            </div>
            <div>
              <dt>Suggested labor</dt>
              <dd>{draft.suggestedLabor}</dd>
            </div>
            <div>
              <dt>Source summary</dt>
              <dd>{draft.sourceSummary}</dd>
            </div>
          </dl>
        </article>

        <article className="info-panel wide">
          <h2>Approval and Maven lifecycle</h2>
          <div className="lifecycle-list">
            <div className="lifecycle-item">{draft.approvalPlaceholder}</div>
            <div className="lifecycle-item">{draft.mavenLifecyclePlaceholder}</div>
            <div className="lifecycle-item">Customer not viewed</div>
          </div>
        </article>
      </div>
    </section>
  );
}
