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
            Read-only command detail with lifecycle, source-object, external
            target, and retry/error placeholders.
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
          <h2>Source and external targets</h2>
          <dl>
            <div>
              <dt>Source object</dt>
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
              <dt>Maven</dt>
              <dd>{command.externalTarget.includes("Maven") ? command.externalTarget : "Maven placeholder"}</dd>
            </div>
            <div>
              <dt>Invoice4U</dt>
              <dd>{command.externalTarget.includes("Invoice4U") ? command.externalTarget : "Invoice4U placeholder"}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{command.externalTarget.includes("Email") ? command.externalTarget : "Email placeholder"}</dd>
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
              <dt>Notes</dt>
              <dd>{command.notes}</dd>
            </div>
          </dl>
        </article>
      </div>
    </section>
  );
}
