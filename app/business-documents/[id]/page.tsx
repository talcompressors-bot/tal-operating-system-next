import Link from "next/link";
import { notFound } from "next/navigation";
import { getBusinessDocumentById } from "../business-document-adapter";
import { createMavenDraftAutomationCommand } from "./actions";

export const dynamic = "force-dynamic";

type BusinessDocumentDetailPageProps = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ commandStatus?: string }>;
};

function getCommandStatusMessage(status?: string) {
  switch (status) {
    case "created":
      return "Maven draft AutomationCommand was created as an internal pending command only.";
    case "approval-required":
      return "Exact approval phrase is required before creating a Maven draft AutomationCommand.";
    case "status-not-ready":
      return "BusinessDocument must be Approved or Ready To Send before a Maven draft command can be queued.";
    case "maven-exists":
      return "Maven fields are already populated; duplicate command creation is blocked.";
    case "missing-items":
      return "BusinessDocumentItems are required before command creation.";
    case "price-approval-required":
      return "All item price approval warnings must be resolved before command creation.";
    case "existing-command":
      return "A Maven draft AutomationCommand already exists for this BusinessDocument.";
    case "not-found":
      return "BusinessDocument was not found for command creation.";
    case "missing-document":
      return "Command creation was missing a BusinessDocument identifier.";
    default:
      return "";
  }
}

export default async function BusinessDocumentDetailPage({
  params,
  searchParams,
}: BusinessDocumentDetailPageProps) {
  const { id } = await params;
  const { commandStatus } = (await searchParams) || {};
  const document = await getBusinessDocumentById(id);
  const commandStatusMessage = getCommandStatusMessage(commandStatus);

  if (!document) {
    notFound();
  }

  return (
    <section className="page-shell">
      <div className="detail-header">
        <div>
          <p className="eyebrow">BusinessDocument Review</p>
          <h1>{document.title}</h1>
          <p className="lede">
            Internal draft review before Maven, Invoice4U, inventory, email, or
            customer-facing action. Review every line and pricing evidence
            before approving the next step.
          </p>
        </div>
        <div className="actions">
          <Link className="button secondary" href="/business-documents">
            Back to documents
          </Link>
          {document.serviceReportId ? (
            <Link
              className="button secondary"
              href={`/service-reports/${document.serviceReportId}`}
            >
              Service report
            </Link>
          ) : null}
        </div>
      </div>

      <div className="detail-grid">
        <article className="info-panel wide">
          <h2>Review status</h2>
          <div className="review-status-grid">
            <div className="review-status-item strong">
              <span>Draft state</span>
              <strong>{document.reviewStatus.internalDraft}</strong>
            </div>
            <div className="review-status-item">
              <span>Send state</span>
              <strong>{document.reviewStatus.sentState}</strong>
            </div>
            <div className="review-status-item">
              <span>Maven / Invoice4U</span>
              <strong>{document.reviewStatus.mavenState}</strong>
            </div>
            <div className="review-status-item">
              <span>Email / customer</span>
              <strong>{document.reviewStatus.emailState}</strong>
            </div>
            <div className="review-status-item">
              <span>Inventory</span>
              <strong>{document.reviewStatus.inventoryState}</strong>
            </div>
          </div>
        </article>

        <article className="info-panel wide">
          <h2>Approval-required warnings</h2>
          <ul className="warning-list">
            {document.reviewWarnings.map((warning) => (
              <li key={warning}>{warning}</li>
            ))}
          </ul>
        </article>

        <article className="info-panel wide">
          <h2>Maven draft command gate</h2>
          <div className="approval-panel">
            <p>
              This creates one internal AutomationCommand only. It does not call
              Maven/Invoice4U, send email, contact customers, or deduct
              inventory.
            </p>
            {commandStatusMessage ? (
              <p className="status-note">{commandStatusMessage}</p>
            ) : null}
            <dl>
              <div>
                <dt>Command readiness</dt>
                <dd>{document.commandReview.blockedReason}</dd>
              </div>
              <div>
                <dt>Latest command</dt>
                <dd>{document.commandReview.latestCommandId}</dd>
              </div>
              <div>
                <dt>Latest command status</dt>
                <dd>{document.commandReview.latestCommandStatus}</dd>
              </div>
            </dl>

            {document.commandReview.canCreateMavenCommand ? (
              <form
                action={createMavenDraftAutomationCommand}
                className="approval-form"
              >
                <input
                  name="businessDocumentId"
                  type="hidden"
                  value={document.id}
                />
                <label>
                  Requested by
                  <input name="requestedBy" type="text" defaultValue="Liad" />
                </label>
                <label>
                  Approval phrase
                  <input
                    name="approvalText"
                    type="text"
                    placeholder={document.commandReview.approvalPhrase}
                  />
                </label>
                <button className="button" type="submit">
                  Create internal Maven draft command
                </button>
              </form>
            ) : (
              <p className="status-note">
                Command creation is blocked until the readiness condition is
                satisfied.
              </p>
            )}
          </div>
        </article>

        <article className="info-panel wide">
          <h2>Automation command status</h2>
          <div className="table-card">
            <table>
              <thead>
                <tr>
                  <th>Command</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Requested by</th>
                  <th>Requested</th>
                  <th>Result</th>
                  <th>Error</th>
                </tr>
              </thead>
              <tbody>
                {document.automationCommands.map((command) => (
                  <tr key={command.id}>
                    <td>
                      <Link href={`/automation-commands/${command.id}`}>
                        {command.id}
                      </Link>
                    </td>
                    <td>{command.commandType}</td>
                    <td>{command.status}</td>
                    <td>{command.requestedBy}</td>
                    <td>{command.requestedAt}</td>
                    <td>{command.result}</td>
                    <td>{command.errorMessage}</td>
                  </tr>
                ))}
                {!document.automationCommands.length ? (
                  <tr>
                    <td colSpan={7}>No Maven draft AutomationCommand exists.</td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </article>

        <article className="info-panel">
          <h2>Document</h2>
          <dl>
            <div>
              <dt>AppSheet document ID</dt>
              <dd>{document.id}</dd>
            </div>
            <div>
              <dt>Internal ID</dt>
              <dd>{document.internalId}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>{document.status}</dd>
            </div>
            <div>
              <dt>Selected type</dt>
              <dd>{document.selectedDocumentType}</dd>
            </div>
            <div>
              <dt>Suggested type</dt>
              <dd>{document.suggestedDocumentType}</dd>
            </div>
          </dl>
        </article>

        <article className="info-panel">
          <h2>Amounts</h2>
          <dl>
            <div>
              <dt>Subtotal</dt>
              <dd>{document.subtotalAmount}</dd>
            </div>
            <div>
              <dt>VAT</dt>
              <dd>{document.vatAmount}</dd>
            </div>
            <div>
              <dt>Total</dt>
              <dd>{document.totalAmount}</dd>
            </div>
          </dl>
        </article>

        <article className="info-panel wide">
          <h2>Source links</h2>
          <dl>
            <div>
              <dt>Service Report</dt>
              <dd>
                {document.serviceReportId ? (
                  <Link href={`/service-reports/${document.serviceReportId}`}>
                    {document.serviceReportNumber}
                  </Link>
                ) : (
                  document.serviceReportNumber
                )}
              </dd>
            </div>
            <div>
              <dt>Source document ID</dt>
              <dd>{document.sourceDocumentId}</dd>
            </div>
            <div>
              <dt>Customer</dt>
              <dd>
                {document.customerId ? (
                  <Link href={`/customers/${document.customerId}`}>
                    {document.customerName}
                  </Link>
                ) : (
                  document.customerName
                )}
              </dd>
            </div>
            <div>
              <dt>AI Draft</dt>
              <dd>
                {document.aiDraftId ? (
                  <Link href={`/ai-drafts/${document.aiDraftId}`}>
                    {document.aiDraftTitle}
                  </Link>
                ) : (
                  document.aiDraftTitle
                )}
              </dd>
            </div>
            <div>
              <dt>Maven Document</dt>
              <dd>{document.reviewStatus.mavenState}</dd>
            </div>
          </dl>
        </article>

        <article className="info-panel wide">
          <h2>Document lifecycle</h2>
          <div className="lifecycle-list">
            <div className="lifecycle-item">{document.lifecycle.draft}</div>
            <div className="lifecycle-item">{document.lifecycle.approved}</div>
            <div className="lifecycle-item">{document.lifecycle.sentToMaven}</div>
            <div className="lifecycle-item">{document.lifecycle.mavenCreated}</div>
            <div className="lifecycle-item">{document.lifecycle.emailSent}</div>
            <div className="lifecycle-item">{document.lifecycle.customerViewed}</div>
          </div>
        </article>

        <article className="info-panel wide">
          <h2>Review line items</h2>
          <div className="table-card">
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Unit price</th>
                  <th>Total</th>
                  <th>Source</th>
                  <th>Price approval</th>
                  <th>Pricing evidence</th>
                </tr>
              </thead>
              <tbody>
                {document.items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <strong>{item.name}</strong>
                    </td>
                    <td>{item.quantity}</td>
                    <td>{item.unitPrice}</td>
                    <td>{item.totalPrice}</td>
                    <td>{item.source}</td>
                    <td>
                      {item.needsPriceApproval === "Required" ? (
                        <span className="warning-pill">Required</span>
                      ) : (
                        item.needsPriceApproval
                      )}
                    </td>
                    <td>
                      {item.pricingEvidence.length ? (
                        <ul className="pricing-evidence-list">
                          {item.pricingEvidence.map((evidence) => (
                            <li key={evidence}>
                              <span>{evidence}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        "No preserved pricing evidence"
                      )}
                    </td>
                  </tr>
                ))}
                {!document.items.length ? (
                  <tr>
                    <td colSpan={7}>No business document items linked.</td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </article>

        <article className="info-panel wide">
          <h2>Internal notes</h2>
          <dl>
            <div>
              <dt>Description</dt>
              <dd>{document.description}</dd>
            </div>
            <div>
              <dt>Notes</dt>
              <dd>{document.notes}</dd>
            </div>
            <div>
              <dt>Send status</dt>
              <dd>{document.reviewStatus.sentState}</dd>
            </div>
          </dl>
        </article>
      </div>
    </section>
  );
}
