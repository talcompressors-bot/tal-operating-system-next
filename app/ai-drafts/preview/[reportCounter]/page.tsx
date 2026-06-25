import Link from "next/link";
import { notFound } from "next/navigation";
import { getAiDraftPreviewByReportCounter } from "../../ai-draft-adapter";

export const dynamic = "force-dynamic";

type AiDraftPreviewPageProps = {
  params: Promise<{ reportCounter: string }>;
};

export default async function AiDraftPreviewPage({
  params,
}: AiDraftPreviewPageProps) {
  const { reportCounter } = await params;
  const preview = await getAiDraftPreviewByReportCounter(reportCounter);

  if (!preview) {
    notFound();
  }

  return (
    <section className="page-shell">
      <div className="detail-header">
        <div>
          <p className="eyebrow">AI Draft Recommendation Preview</p>
          <h1>Report #{preview.reportCounter}</h1>
          <p className="lede">
            Read-only recommendation preview for user approval. No draft rows,
            Maven documents, inventory actions, emails, or customer-facing
            documents are created here.
          </p>
        </div>
        <div className="actions">
          <Link
            className="button secondary"
            href={`/service-reports/${preview.reportId}`}
          >
            Service report
          </Link>
          <Link className="button secondary" href="/ai-drafts">
            AI drafts
          </Link>
        </div>
      </div>

      <div className="detail-grid">
        <article className="info-panel">
          <h2>Source report</h2>
          <dl>
            <div>
              <dt>Report ID</dt>
              <dd>{preview.reportId}</dd>
            </div>
            <div>
              <dt>Report counter</dt>
              <dd>{preview.reportCounter}</dd>
            </div>
            <div>
              <dt>Service date</dt>
              <dd>{preview.serviceDate}</dd>
            </div>
            <div>
              <dt>Technician</dt>
              <dd>{preview.technician}</dd>
            </div>
          </dl>
        </article>

        <article className="info-panel">
          <h2>Customer</h2>
          <dl>
            <div>
              <dt>Customer ID</dt>
              <dd>
                {preview.customerId ? (
                  <Link href={`/customers/${preview.customerId}`}>
                    {preview.customerId}
                  </Link>
                ) : (
                  "No customer ID"
                )}
              </dd>
            </div>
            <div>
              <dt>Customer name</dt>
              <dd>{preview.customerName}</dd>
            </div>
            <div>
              <dt>Approval status</dt>
              <dd>{preview.approvalStatus}</dd>
            </div>
          </dl>
        </article>

        <article className="info-panel">
          <h2>Equipment</h2>
          <dl>
            <div>
              <dt>Equipment type</dt>
              <dd>{preview.equipmentType}</dd>
            </div>
            <div>
              <dt>Model</dt>
              <dd>{preview.model}</dd>
            </div>
            <div>
              <dt>Serial</dt>
              <dd>{preview.serial}</dd>
            </div>
            <div>
              <dt>HP</dt>
              <dd>{preview.hp}</dd>
            </div>
            <div>
              <dt>Service type</dt>
              <dd>{preview.serviceType}</dd>
            </div>
          </dl>
        </article>

        <article className="info-panel">
          <h2>Work summary</h2>
          <dl>
            <div>
              <dt>Technician work time</dt>
              <dd>{preview.technicianWorkTime}</dd>
            </div>
            <div>
              <dt>Visit required</dt>
              <dd>{preview.visitRequired}</dd>
            </div>
            <div>
              <dt>Technician notes</dt>
              <dd>{preview.technicianNotes}</dd>
            </div>
          </dl>
        </article>

        <article className="info-panel wide">
          <h2>Suggested document</h2>
          <dl className="preview-summary">
            <div>
              <dt>Document type</dt>
              <dd>{preview.documentType}</dd>
            </div>
            <div>
              <dt>Reason</dt>
              <dd>{preview.documentReason}</dd>
            </div>
            <div>
              <dt>Known subtotal</dt>
              <dd>{preview.subtotal}</dd>
            </div>
          </dl>
        </article>

        <article className="info-panel wide">
          <h2>Suggested items</h2>
          {preview.lines.length ? (
            <div className="table-card preview-table">
              <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Unit price</th>
                    <th>Total</th>
                    <th>Source</th>
                    <th>Confidence</th>
                    <th>Approval</th>
                  </tr>
                </thead>
                <tbody>
                  {preview.lines.map((line) => (
                    <tr key={line.item}>
                      <td>
                        <strong>{line.item}</strong>
                        <span className="table-note">{line.reason}</span>
                      </td>
                      <td>{line.quantity}</td>
                      <td>{line.unitPrice}</td>
                      <td>{line.total}</td>
                      <td>{line.source}</td>
                      <td>{line.confidence}</td>
                      <td>{line.needsApproval}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="empty-state">
              No safe AI Draft recommendation can be generated from the current
              evidence. Manual review is required.
            </p>
          )}
        </article>

        <article className="info-panel wide">
          <h2>Evidence coverage</h2>
          <div className="evidence-grid">
            {preview.dataCoverage.map((item) => (
              <div className="evidence-item" key={item.source}>
                <span>{item.source}</span>
                <strong>{item.status}</strong>
              </div>
            ))}
          </div>
        </article>

        <article className="info-panel">
          <h2>Historical matches</h2>
          <dl>
            <div>
              <dt>Same equipment</dt>
              <dd>{preview.historicalMatches.sameEquipment}</dd>
            </div>
            <div>
              <dt>Same customer</dt>
              <dd>{preview.historicalMatches.sameCustomer}</dd>
            </div>
            <div>
              <dt>Similar service</dt>
              <dd>{preview.historicalMatches.similarService}</dd>
            </div>
          </dl>
        </article>

        <article className="info-panel">
          <h2>Risks</h2>
          <ul className="risk-list">
            {preview.risks.map((risk) => (
              <li key={risk}>{risk}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
