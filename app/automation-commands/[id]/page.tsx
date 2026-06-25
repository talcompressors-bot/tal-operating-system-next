import Link from "next/link";
import { notFound } from "next/navigation";
import { getAutomationCommandById } from "../automation-command-adapter";
import { runMavenDraftDryRun } from "./actions";

export const dynamic = "force-dynamic";

type AutomationCommandDetailPageProps = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ dryRunStatus?: string }>;
};

function getDryRunStatusMessage(status?: string) {
  switch (status) {
    case "dry-run-validated":
      return "Maven draft dry-run validation completed. No Maven/Invoice4U call, external document, email, or inventory action occurred.";
    case "dry-run-blocked":
      return "Maven draft dry-run found validation blockers. No external action occurred.";
    case "approval-required":
      return "Exact dry-run approval phrase is required before validating the Maven payload.";
    case "missing-command":
      return "Dry-run request was missing an AutomationCommand identifier.";
    case "not-found":
      return "AutomationCommand was not found for dry-run validation.";
    default:
      return "";
  }
}

export default async function AutomationCommandDetailPage({
  params,
  searchParams,
}: AutomationCommandDetailPageProps) {
  const { id } = await params;
  const { dryRunStatus } = (await searchParams) || {};
  const command = await getAutomationCommandById(id);
  const dryRunStatusMessage = getDryRunStatusMessage(dryRunStatus);

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

        {command.canRunMavenDryRun ? (
          <article className="info-panel wide">
            <h2>Maven execution adapter dry run</h2>
            <div className="approval-panel">
              <p>{command.dryRunReview.boundary}</p>
              {dryRunStatusMessage ? (
                <p className="status-note">{dryRunStatusMessage}</p>
              ) : null}
              <dl>
                <div>
                  <dt>Dry-run status</dt>
                  <dd>{command.dryRunReview.status}</dd>
                </div>
                <div>
                  <dt>Validated at</dt>
                  <dd>{command.dryRunReview.validatedAt}</dd>
                </div>
                <div>
                  <dt>Requested by</dt>
                  <dd>{command.dryRunReview.requestedBy}</dd>
                </div>
              </dl>

              {command.dryRunReview.blockers.length ? (
                <ul className="warning-list">
                  {command.dryRunReview.blockers.map((blocker) => (
                    <li key={blocker}>{blocker}</li>
                  ))}
                </ul>
              ) : null}

              {command.dryRunReview.warnings.length ? (
                <ul className="warning-list neutral">
                  {command.dryRunReview.warnings.map((warning) => (
                    <li key={warning}>{warning}</li>
                  ))}
                </ul>
              ) : null}

              {command.dryRunReview.wouldSendSummary.length ? (
                <div>
                  <h3>Would send to Maven</h3>
                  <ul className="warning-list neutral">
                    {command.dryRunReview.wouldSendSummary.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>No dry-run Maven payload has been generated yet.</p>
              )}

              <form action={runMavenDraftDryRun} className="approval-form">
                <input name="commandId" type="hidden" value={command.id} />
                <label>
                  Requested by
                  <input name="requestedBy" type="text" defaultValue="Liad" />
                </label>
                <label>
                  Dry-run phrase
                  <input
                    name="approvalText"
                    type="text"
                    placeholder={command.dryRunPhrase}
                  />
                </label>
                <button className="button" type="submit">
                  Validate Maven draft dry run
                </button>
              </form>
            </div>
          </article>
        ) : null}

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
