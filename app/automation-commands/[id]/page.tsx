import Link from "next/link";
import { notFound } from "next/navigation";
import { getAutomationCommandById } from "../automation-command-adapter";

export const dynamic = "force-dynamic";

type AutomationCommandDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AutomationCommandDetailPage({
  params,
}: AutomationCommandDetailPageProps) {
  const { id } = await params;
  const command = await getAutomationCommandById(id);

  if (!command) {
    notFound();
  }

  return (
    <section className="page-shell">
      <div className="detail-header">
        <div>
          <p className="eyebrow">Automation Command</p>
          <h1>{command.title}</h1>
          <p className="lede">
            Read-only command detail for queue review before execution. This
            page does not run commands, call Maven/Invoice4U, send email, or
            affect inventory.
          </p>
        </div>
        <div className="actions">
          <Link className="button secondary" href="/automation-commands">
            Back to commands
          </Link>
          {command.sourceObjectId ? (
            <Link
              className="button secondary"
              href={`/business-documents/${command.sourceObjectId}`}
            >
              Source document
            </Link>
          ) : null}
        </div>
      </div>

      <div className="detail-grid">
        <article className="info-panel wide">
          <h2>Execution boundary</h2>
          <div className="review-status-grid">
            <div className="review-status-item strong">
              <span>Execution</span>
              <strong>{command.safetyBoundary.execution}</strong>
            </div>
            <div className="review-status-item">
              <span>Maven / Invoice4U</span>
              <strong>{command.safetyBoundary.maven}</strong>
            </div>
            <div className="review-status-item">
              <span>Email / customer</span>
              <strong>{command.safetyBoundary.email}</strong>
            </div>
            <div className="review-status-item">
              <span>Inventory</span>
              <strong>{command.safetyBoundary.inventory}</strong>
            </div>
          </div>
        </article>

        <article className="info-panel">
          <h2>Command status</h2>
          <dl>
            <div>
              <dt>AppSheet command ID</dt>
              <dd>{command.id}</dd>
            </div>
            <div>
              <dt>Internal ID</dt>
              <dd>{command.internalId}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>{command.status}</dd>
            </div>
            <div>
              <dt>Type / action</dt>
              <dd>{command.commandType}</dd>
            </div>
          </dl>
        </article>

        <article className="info-panel">
          <h2>Request</h2>
          <dl>
            <div>
              <dt>Requested by</dt>
              <dd>{command.requestedBy}</dd>
            </div>
            <div>
              <dt>Requested at</dt>
              <dd>{command.requestedAt}</dd>
            </div>
            <div>
              <dt>Processed at</dt>
              <dd>{command.processedAt}</dd>
            </div>
            <div>
              <dt>Completed at</dt>
              <dd>{command.completedAt}</dd>
            </div>
          </dl>
        </article>

        <article className="info-panel wide">
          <h2>Source documents</h2>
          <dl>
            <div>
              <dt>BusinessDocument</dt>
              <dd>
                {command.sourceObjectId ? (
                  <Link href={`/business-documents/${command.sourceObjectId}`}>
                    {command.sourceObjectLabel}
                  </Link>
                ) : (
                  command.sourceObjectLabel
                )}
              </dd>
            </div>
            <div>
              <dt>ServiceReport</dt>
              <dd>
                {command.sourceServiceReportId ? (
                  <Link href={`/service-reports/${command.sourceServiceReportId}`}>
                    {command.sourceServiceReportLabel}
                  </Link>
                ) : (
                  command.sourceServiceReportLabel
                )}
              </dd>
            </div>
            <div>
              <dt>External target</dt>
              <dd>{command.externalTarget}</dd>
            </div>
          </dl>
        </article>

        <article className="info-panel wide">
          <h2>Lifecycle view</h2>
          <div className="lifecycle-list">
            <div className="lifecycle-item">{command.lifecycle.pending}</div>
            <div className="lifecycle-item">{command.lifecycle.running}</div>
            <div className="lifecycle-item">{command.lifecycle.completed}</div>
            <div className="lifecycle-item">{command.lifecycle.failed}</div>
          </div>
        </article>

        <article className="info-panel wide">
          <h2>Retry and error placeholder</h2>
          <dl>
            <div>
              <dt>Retry / error</dt>
              <dd>{command.retryErrorPlaceholder}</dd>
            </div>
            <div>
              <dt>Result</dt>
              <dd>{command.result}</dd>
            </div>
            <div>
              <dt>Idempotency key</dt>
              <dd>{command.idempotencyKey}</dd>
            </div>
            <div>
              <dt>Duplicate protection</dt>
              <dd>{command.duplicateProtection}</dd>
            </div>
            <div>
              <dt>Notes</dt>
              <dd>{command.notes}</dd>
            </div>
          </dl>
        </article>

        <article className="info-panel wide">
          <h2>Payload summary</h2>
          {command.payloadSummary.length ? (
            <ul className="warning-list neutral">
              {command.payloadSummary.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>No payload summary available.</p>
          )}
        </article>

        <article className="info-panel wide">
          <h2>Raw source summary</h2>
          {command.rawSourceSummary.length ? (
            <ul className="warning-list neutral">
              {command.rawSourceSummary.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>No raw source summary available.</p>
          )}
        </article>
      </div>
    </section>
  );
}
