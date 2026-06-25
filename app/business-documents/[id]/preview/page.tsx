import Link from "next/link";
import { notFound } from "next/navigation";
import { getBusinessDocumentById } from "../../business-document-adapter";

export const dynamic = "force-dynamic";

type BusinessDocumentPreviewPageProps = {
  params: Promise<{ id: string }>;
};

export default async function BusinessDocumentPreviewPage({
  params,
}: BusinessDocumentPreviewPageProps) {
  const { id } = await params;
  const document = await getBusinessDocumentById(id);

  if (!document) {
    notFound();
  }

  return (
    <section className="document-preview-shell" dir="rtl">
      <div className="preview-toolbar">
        <Link className="button secondary" href={`/business-documents/${document.id}`}>
          Back to review
        </Link>
        <span>HTML preview only. No PDF generation, Maven call, email, or inventory action.</span>
      </div>

      <article className="document-paper" aria-label="BusinessDocument HTML preview">
        <header className="document-preview-header">
          <div className="company-block">
            <div className="company-logo" aria-label="Tal Compressors logo placeholder">
              TAL
            </div>
            <div>
              <h1>טל קומפרסורים</h1>
              <p>Tal Compressors</p>
              <p>מסמך פנימי לבדיקה בלבד</p>
            </div>
          </div>

          <div className="document-identity">
            <p>{document.engineReview.documentType.label}</p>
            <h2>{document.engineReview.documentType.code}</h2>
            <dl>
              <div>
                <dt>Document number</dt>
                <dd>{document.id}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>{document.reviewStatus.internalDraft}</dd>
              </div>
            </dl>
          </div>
        </header>

        <section className="document-preview-meta">
          <div className="preview-party-block">
            <h3>לקוח</h3>
            <p>{document.customerName}</p>
            <dl>
              <div>
                <dt>Customer ID</dt>
                <dd>{document.customerId || "Not recorded"}</dd>
              </div>
              <div>
                <dt>Source ServiceReport</dt>
                <dd>
                  {document.serviceReportId ? (
                    <Link href={`/service-reports/${document.serviceReportId}`}>
                      {document.serviceReportNumber}
                    </Link>
                  ) : (
                    "No linked report"
                  )}
                </dd>
              </div>
            </dl>
          </div>

          <div className="preview-date-block">
            <dl>
              <div>
                <dt>Document date</dt>
                <dd>{document.createdAt}</dd>
              </div>
              <div>
                <dt>Due date</dt>
                <dd>Not recorded</dd>
              </div>
              <div>
                <dt>Currency</dt>
                <dd>{document.totalAmount.replace(/[0-9.,\s]/g, "") || "ILS"}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="preview-title-band">
          <p>{document.title}</p>
          <span>{document.description}</span>
        </section>

        <section className="document-line-table" aria-label="Business document items">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>תיאור</th>
                <th>מקור</th>
                <th>כמות</th>
                <th>מחיר יחידה</th>
                <th>סה״כ</th>
              </tr>
            </thead>
            <tbody>
              {document.items.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>
                    <strong>{item.name}</strong>
                    <span>
                      {item.pricingEvidence.length
                        ? item.pricingEvidence.join(" | ")
                        : "No pricing evidence recorded"}
                    </span>
                  </td>
                  <td>{item.source}</td>
                  <td>{item.quantity}</td>
                  <td>{item.unitPrice}</td>
                  <td>{item.totalPrice}</td>
                </tr>
              ))}
              {!document.items.length ? (
                <tr>
                  <td colSpan={6}>No line items recorded.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </section>

        <section className="document-totals-section">
          <div className="document-notes">
            <h3>הערות</h3>
            <p>{document.notes}</p>
            <p>{document.engineReview.exportReadiness.boundary}</p>
          </div>

          <dl className="document-totals-box">
            <div>
              <dt>Subtotal</dt>
              <dd>{document.engineReview.totals.documentSubtotal}</dd>
            </div>
            <div>
              <dt>VAT</dt>
              <dd>{document.engineReview.totals.vatAmount}</dd>
            </div>
            <div className="strong-total">
              <dt>Total</dt>
              <dd>{document.engineReview.totals.totalAmount}</dd>
            </div>
            <div>
              <dt>Payment amount</dt>
              <dd>{document.engineReview.totals.paymentAmount}</dd>
            </div>
            <div>
              <dt>Balance due</dt>
              <dd>{document.engineReview.totals.balanceDue}</dd>
            </div>
          </dl>
        </section>

        <footer className="document-preview-footer">
          <div>
            <strong>Digital signature area</strong>
            <span>Not signed. Internal preview only.</span>
          </div>
          <div>
            <strong>External boundary</strong>
            <span>No Maven/Invoice4U action. No email. No inventory deduction.</span>
          </div>
        </footer>
      </article>
    </section>
  );
}
