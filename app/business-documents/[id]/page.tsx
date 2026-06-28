import Link from "next/link";
import { notFound } from "next/navigation";
import { getBusinessDocumentById } from "../business-document-adapter";
import {
  approveBusinessDocument,
  createMavenDraftAutomationCommand,
  resolveBusinessDocumentLine,
  returnBusinessDocumentToReview,
} from "./actions";

export const dynamic = "force-dynamic";

type BusinessDocumentDetailPageProps = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{
    approvalStatus?: string;
    commandStatus?: string;
    lineStatus?: string;
  }>;
};

function getCommandStatusMessage(status?: string) {
  switch (status) {
    case "created":
      return "Maven document-generation AutomationCommand was created as an internal pending command only.";
    case "approval-required":
      return "Exact approval phrase is required before creating a Maven document-generation AutomationCommand.";
    case "status-not-ready":
      return "BusinessDocument must be Approved or Ready To Send before a Maven document-generation command can be queued.";
    case "maven-exists":
      return "Maven fields are already populated; duplicate command creation is blocked.";
    case "missing-items":
      return "BusinessDocumentItems are required before command creation.";
    case "price-approval-required":
      return "All item price approval warnings must be resolved before command creation.";
    case "existing-command":
      return "A Maven document-generation AutomationCommand already exists for this BusinessDocument.";
    case "not-found":
      return "BusinessDocument was not found for command creation.";
    case "missing-document":
      return "Command creation was missing a BusinessDocument identifier.";
    default:
      return "";
  }
}

function getApprovalStatusMessage(status?: string) {
  switch (status) {
    case "approved":
      return "BusinessDocument was approved internally. No Maven/Invoice4U, AutomationCommand, email, or inventory action was performed.";
    case "returned":
      return "BusinessDocument was returned to review with an audit reason.";
    case "approval-required":
      return "Exact approval phrase is required before internal approval.";
    case "override-required":
      return "Pricing or quantity issues remain. Confirm the explicit override before approval.";
    case "reason-required":
      return "A review reason is required before returning the BusinessDocument to review.";
    case "not-found":
      return "BusinessDocument was not found for approval workflow.";
    case "missing-document":
      return "Approval workflow was missing a BusinessDocument identifier.";
    default:
      return "";
  }
}

function getLineStatusMessage(status?: string) {
  switch (status) {
    case "line-saved":
      return "BusinessDocument line was updated internally and audit history was preserved. Maven dry-run was not re-run.";
    case "invalid-quantity":
      return "Quantity must be greater than zero before the line can be saved.";
    case "invalid-price":
      return "Unit price is required before the line can be saved.";
    case "missing-evidence":
      return "Pricing evidence source and note are required before saving a line correction.";
    case "missing-item":
      return "Line correction was missing an item identifier.";
    case "item-not-found":
      return "BusinessDocument line was not found for correction.";
    case "not-found":
      return "BusinessDocument was not found for line correction.";
    case "missing-document":
      return "Line correction was missing a BusinessDocument identifier.";
    default:
      return "";
  }
}

export default async function BusinessDocumentDetailPage({
  params,
  searchParams,
}: BusinessDocumentDetailPageProps) {
  const { id } = await params;
  const { approvalStatus, commandStatus, lineStatus } = (await searchParams) || {};
  const document = await getBusinessDocumentById(id);
  const approvalStatusMessage = getApprovalStatusMessage(approvalStatus);
  const commandStatusMessage = getCommandStatusMessage(commandStatus);
  const lineStatusMessage = getLineStatusMessage(lineStatus);

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
          <Link
            className="button secondary"
            href={`/business-documents/${document.id}/preview`}
          >
            HTML preview
          </Link>
          <Link
            className="button secondary"
            href={`/business-documents/${document.id}/pdf`}
          >
            Download PDF
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
          <h2>Internal document and payment engine</h2>
          <div className="review-status-grid">
            <div className="review-status-item strong">
              <span>Engine document type</span>
              <strong>
                {document.engineReview.documentType.code} /{" "}
                {document.engineReview.documentType.label}
              </strong>
            </div>
            <div className="review-status-item">
              <span>Line subtotal</span>
              <strong>{document.engineReview.totals.lineSubtotal}</strong>
            </div>
            <div className="review-status-item">
              <span>VAT</span>
              <strong>{document.engineReview.totals.vatAmount}</strong>
            </div>
            <div className="review-status-item">
              <span>Total</span>
              <strong>{document.engineReview.totals.totalAmount}</strong>
            </div>
            <div className="review-status-item">
              <span>Payment amount</span>
              <strong>{document.engineReview.totals.paymentAmount}</strong>
            </div>
            <div className="review-status-item">
              <span>Balance due</span>
              <strong>{document.engineReview.totals.balanceDue}</strong>
            </div>
          </div>

          <div className="approval-panel">
            <p>{document.engineReview.exportReadiness.boundary}</p>
            <dl>
              <div>
                <dt>External export allowed</dt>
                <dd>
                  {document.engineReview.exportReadiness.externalExportAllowed
                    ? "Allowed"
                    : "Blocked until explicit approval"}
                </dd>
              </div>
              <div>
                <dt>Payment required</dt>
                <dd>{document.engineReview.payment.required ? "Yes" : "No"}</dd>
              </div>
              <div>
                <dt>Detected payment sources</dt>
                <dd>
                  {document.engineReview.payment.detectedSources.length
                    ? document.engineReview.payment.detectedSources.join(", ")
                    : "No internal payment evidence recorded"}
                </dd>
              </div>
              <div>
                <dt>Future attachments</dt>
                <dd>{document.engineReview.payment.attachmentReadiness}</dd>
              </div>
            </dl>

            {document.engineReview.exportReadiness.blockers.length ? (
              <ul className="warning-list">
                {document.engineReview.exportReadiness.blockers.map((blocker) => (
                  <li key={blocker}>{blocker}</li>
                ))}
              </ul>
            ) : (
              <ul className="warning-list neutral">
                <li>Internal engine has no current blockers. Export still requires explicit approval.</li>
              </ul>
            )}

            {document.engineReview.exportReadiness.warnings.length ? (
              <ul className="warning-list neutral">
                {document.engineReview.exportReadiness.warnings.map((warning) => (
                  <li key={warning}>{warning}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </article>

        <article className="info-panel wide">
          <h2>Supported document and payment types</h2>
          <div className="split-list-grid">
            <div>
              <h3>Business documents</h3>
              <ul className="pricing-evidence-list">
                {document.engineReview.supportedDocumentTypes.map((type) => (
                  <li key={type}>
                    <span>{type}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Payment sources</h3>
              <ul className="pricing-evidence-list">
                {document.engineReview.supportedPaymentSources.map((source) => (
                  <li key={source}>
                    <span>{source}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>

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
          <h2>BusinessDocument approval workflow</h2>
          <div className="approval-panel">
            <p>{document.approvalReview.boundary}</p>
            {approvalStatusMessage ? (
              <p className="status-note">{approvalStatusMessage}</p>
            ) : null}
            {document.approvalReview.blockers.length ? (
              <ul className="warning-list">
                {document.approvalReview.blockers.map((blocker) => (
                  <li key={blocker}>{blocker}</li>
                ))}
              </ul>
            ) : (
              <ul className="warning-list neutral">
                <li>No pricing or quantity blockers are currently detected.</li>
              </ul>
            )}

            <form action={approveBusinessDocument} className="approval-form">
              <input
                name="businessDocumentId"
                type="hidden"
                value={document.id}
              />
              <label>
                Approved by
                <input name="approvedBy" type="text" defaultValue="Liad" />
              </label>
              <label>
                Approval phrase
                <input
                  name="approvalText"
                  type="text"
                  placeholder={document.approvalReview.approvalPhrase}
                />
              </label>
              {document.approvalReview.blockers.length ? (
                <label className="checkbox-row">
                  <input name="overrideReviewBlockers" type="checkbox" />
                  Approve with explicit pricing or quantity override; unresolved
                  issues stay visible in the audit trail.
                </label>
              ) : null}
              <button className="button" type="submit">
                Approve BusinessDocument
              </button>
            </form>

            <form
              action={returnBusinessDocumentToReview}
              className="approval-form"
            >
              <input
                name="businessDocumentId"
                type="hidden"
                value={document.id}
              />
              <label>
                Reviewed by
                <input name="reviewedBy" type="text" defaultValue="Liad" />
              </label>
              <label>
                Return reason
                <textarea
                  name="reason"
                  placeholder="Explain what needs to be fixed before approval"
                />
              </label>
              <button className="button secondary" type="submit">
                Return to review
              </button>
            </form>
          </div>
        </article>

        <article className="info-panel wide">
          <h2>Maven document-generation command gate</h2>
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
                  Create internal Maven document command
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
                    <td colSpan={7}>No Maven document-generation AutomationCommand exists.</td>
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
          <h2>Commercial lifecycle</h2>
          <div className="approval-panel">
            <p>{document.commercialLifecycle.boundary}</p>
            <dl>
              <div>
                <dt>Current stage</dt>
                <dd>{document.commercialLifecycle.currentStage.label}</dd>
              </div>
              <div>
                <dt>Stage summary</dt>
                <dd>{document.commercialLifecycle.currentStage.summary}</dd>
              </div>
              <div>
                <dt>Next transition</dt>
                <dd>{document.commercialLifecycle.nextTransition}</dd>
              </div>
            </dl>
            {document.commercialLifecycle.blockers.length ? (
              <ul className="warning-list">
                {document.commercialLifecycle.blockers.map((blocker) => (
                  <li key={blocker}>{blocker}</li>
                ))}
              </ul>
            ) : (
              <ul className="warning-list neutral">
                <li>No commercial lifecycle blockers are currently detected.</li>
              </ul>
            )}
          </div>
          <div className="lifecycle-list">
            {document.commercialLifecycle.stages.map((stage) => (
              <div className="lifecycle-item" key={stage.code}>
                <strong>{stage.label}</strong>
                <span>{stage.state}</span>
                <small>{stage.summary}</small>
              </div>
            ))}
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
                  <th>Sales SKU</th>
                  <th>Manufacturer SKU</th>
                  <th>SKU evidence</th>
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
                      {item.manufacturerSkuMatch.salesSku ? (
                        <strong>{item.manufacturerSkuMatch.salesSku}</strong>
                      ) : (
                        <span className="warning-pill">Needs sales SKU mapping</span>
                      )}
                    </td>
                    <td>
                      {item.manufacturerSkuMatch.trusted ? (
                        <strong>{item.manufacturerSkuMatch.manufacturerSku}</strong>
                      ) : (
                        <span className="warning-pill">Manufacturer SKU review required</span>
                      )}
                    </td>
                    <td>
                      <ul className="pricing-evidence-list">
                        <li>
                          <span>
                            {item.manufacturerSkuMatch.manufacturer} /{" "}
                            {item.manufacturerSkuMatch.confidence} /{" "}
                            {item.manufacturerSkuMatch.partCategory}
                          </span>
                        </li>
                        <li>
                          <span>{item.manufacturerSkuMatch.reason}</span>
                        </li>
                        <li>
                          <span>
                            {item.manufacturerSkuMatch.sourceFile} / sheet{" "}
                            {item.manufacturerSkuMatch.sourceSheet}
                            {item.manufacturerSkuMatch.sourceRow
                              ? ` / row ${item.manufacturerSkuMatch.sourceRow}`
                              : " / row review required"}
                          </span>
                        </li>
                        <li>
                          <span>
                            Compatible models:{" "}
                            {item.manufacturerSkuMatch.compatibleModels.join(", ")}
                          </span>
                        </li>
                        <li>
                          <span>
                            Needs review:{" "}
                            {item.manufacturerSkuMatch.needsReview ? "Yes" : "No"}
                          </span>
                        </li>
                        <li>
                          <span>
                            Needs sales SKU mapping:{" "}
                            {item.manufacturerSkuMatch.needsSalesSkuMapping
                              ? "Yes"
                              : "No"}
                          </span>
                        </li>
                      </ul>
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
                    <td colSpan={10}>No business document items linked.</td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </article>

        <article className="info-panel wide">
          <h2>BusinessDocument line resolution</h2>
          <div className="approval-panel">
            <p>
              Internal corrections only. Saving a line updates quantity, unit
              price, pricing evidence, and approval-required state with an
              audit log. It does not call Maven/Invoice4U, execute
              AutomationCommands, send email, or deduct inventory. Maven
              dry-run is not re-run after line saves unless explicitly
              triggered from the AutomationCommand page.
            </p>
            {lineStatusMessage ? (
              <p className="status-note">{lineStatusMessage}</p>
            ) : null}
          </div>
          <div className="line-resolution-list">
            {document.items.map((item) => (
              <form
                action={resolveBusinessDocumentLine}
                className="line-resolution-form"
                key={item.internalId}
              >
                <input name="businessDocumentId" type="hidden" value={document.id} />
                <input name="itemId" type="hidden" value={item.internalId} />
                <div className="line-resolution-heading">
                  <strong>{item.name}</strong>
                  <span>{item.needsPriceApproval}</span>
                </div>
                <label>
                  Quantity
                  <input
                    name="quantity"
                    type="number"
                    min="0.001"
                    step="0.001"
                    defaultValue={item.editableQuantity}
                  />
                </label>
                <label>
                  Unit price
                  <input
                    name="unitPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    defaultValue={item.editableUnitPrice}
                  />
                </label>
                <label>
                  Evidence source
                  <input
                    name="pricingEvidenceSource"
                    type="text"
                    placeholder="ProductCatalog, BusinessDocument history, Maven history, or manual approval"
                  />
                </label>
                <label>
                  Evidence note
                  <textarea
                    name="pricingEvidenceNote"
                    placeholder="Record the trusted source, approval note, or correction reason"
                  />
                </label>
                <label>
                  Resolved by
                  <input name="resolvedBy" type="text" defaultValue="Liad" />
                </label>
                <label className="checkbox-row">
                  <input
                    name="needsPriceApproval"
                    type="checkbox"
                    defaultChecked={item.needsPriceApprovalChecked}
                  />
                  Keep approval required for this line
                </label>
                <button className="button secondary" type="submit">
                  Save line correction
                </button>
              </form>
            ))}
            {!document.items.length ? (
              <p className="empty-state">No line items are available to resolve.</p>
            ) : null}
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

        <article className="info-panel wide">
          <h2>Status history</h2>
          <div className="table-card">
            <table>
              <thead>
                <tr>
                  <th>Action</th>
                  <th>Result</th>
                  <th>User</th>
                  <th>Date</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {document.logs.map((log) => (
                  <tr key={log.id}>
                    <td>{log.action}</td>
                    <td>{log.result}</td>
                    <td>{log.performedBy}</td>
                    <td>{log.createdAt}</td>
                    <td>{log.notes}</td>
                  </tr>
                ))}
                {!document.logs.length ? (
                  <tr>
                    <td colSpan={5}>No BusinessDocument status history yet.</td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </article>
      </div>
    </section>
  );
}
