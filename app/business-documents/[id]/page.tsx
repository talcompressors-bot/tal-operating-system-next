import Link from "next/link";
import { notFound } from "next/navigation";
import { getBusinessDocumentById } from "../business-document-adapter";

export const dynamic = "force-dynamic";

type BusinessDocumentDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function BusinessDocumentDetailPage({
  params,
}: BusinessDocumentDetailPageProps) {
  const { id } = await params;
  const document = await getBusinessDocumentById(id);

  if (!document) {
    notFound();
  }

  return (
    <section className="page-shell">
      <div className="detail-header">
        <div>
          <p className="eyebrow">Business Document</p>
          <h1>{document.title}</h1>
          <p className="lede">
            Read-only draft document detail with approval, Maven, and delivery
            lifecycle placeholders.
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
          <h2>Linked placeholders</h2>
          <dl>
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
              <dt>Maven Document</dt>
              <dd>{document.mavenDocumentNumber}</dd>
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
          <h2>Line items</h2>
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
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.unitPrice}</td>
                    <td>{item.totalPrice}</td>
                    <td>{item.source}</td>
                    <td>{item.needsPriceApproval}</td>
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
          <h2>Log placeholders</h2>
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
              <dd>{document.sendStatus}</dd>
            </div>
          </dl>
        </article>
      </div>
    </section>
  );
}
