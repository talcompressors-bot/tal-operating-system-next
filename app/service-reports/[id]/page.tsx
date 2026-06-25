import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceReportById } from "../service-report-adapter";

type ServiceReportDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export const dynamic = "force-dynamic";

export default async function ServiceReportDetailPage({
  params,
}: ServiceReportDetailPageProps) {
  const { id } = await params;
  const report = await getServiceReportById(id);

  if (!report) {
    notFound();
  }

  return (
    <section className="page-shell">
      <div className="detail-header">
        <div>
          <p className="eyebrow">Service Report</p>
          <h1>Report #{report.reportNumber}</h1>
          <p className="lede">{report.customer}</p>
        </div>
        <div className="actions">
          {report.aiDraftPreviewHref ? (
            <Link className="button" href={report.aiDraftPreviewHref}>
              Preview AI Draft
            </Link>
          ) : (
            <button className="button disabled" disabled type="button">
              Create AI Draft
            </button>
          )}
          <button className="button disabled" disabled type="button">
            Create Business Draft
          </button>
          <button className="button disabled" disabled type="button">
            Send to Maven
          </button>
          <Link className="button secondary" href="/service-reports">
            Back to reports
          </Link>
        </div>
      </div>

      <div className="detail-grid">
        <section className="info-panel">
          <h2>Customer summary</h2>
          <dl>
            <div>
              <dt>Customer</dt>
              <dd>
                {report.customerSummary.id ? (
                  <Link href={`/customers/${report.customerSummary.id}`}>
                    {report.customerSummary.name}
                  </Link>
                ) : (
                  report.customerSummary.name
                )}
              </dd>
            </div>
            <div>
              <dt>Primary contact</dt>
              <dd>{report.customerSummary.contactName}</dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>{report.customerSummary.phonePrimary}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{report.customerSummary.emailPrimary}</dd>
            </div>
            <div>
              <dt>Address</dt>
              <dd>{report.customerSummary.address}</dd>
            </div>
          </dl>
        </section>

        <section className="info-panel">
          <h2>Report details</h2>
          <dl>
            <div>
              <dt>Report number</dt>
              <dd>{report.reportNumber}</dd>
            </div>
            <div>
              <dt>Service date</dt>
              <dd>{report.serviceDate}</dd>
            </div>
            <div>
              <dt>Technician</dt>
              <dd>{report.technician}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>
                <span className={`status ${report.statusClassName}`}>
                  {report.status}
                </span>
              </dd>
            </div>
          </dl>
        </section>

        <section className="info-panel wide">
          <h2>Service description</h2>
          <p>{report.description}</p>
        </section>

        <section className="info-panel wide">
          <h2>Recommendations</h2>
          <p>{report.recommendations}</p>
        </section>

        <section className="info-panel wide">
          <h2>Lifecycle</h2>
          <div className="lifecycle-list">
            <div className="lifecycle-item">
              <span>{report.lifecycle.businessDraft}</span>
            </div>
            <div className="lifecycle-item">
              <span>{report.lifecycle.maven}</span>
            </div>
            <div className="lifecycle-item">
              <span>{report.lifecycle.customerViewed}</span>
            </div>
          </div>
        </section>

        <section className="info-panel wide">
          <h2>SCR matching preview</h2>
          <dl className="preview-summary">
            <div>
              <dt>Detected model</dt>
              <dd>{report.scrMatchingPreview.detectedModel}</dd>
            </div>
            <div>
              <dt>Service type</dt>
              <dd>{report.scrMatchingPreview.serviceType}</dd>
            </div>
            <div>
              <dt>Preview status</dt>
              <dd>{report.scrMatchingPreview.status}</dd>
            </div>
          </dl>

          {report.scrMatchingPreview.available ? (
            <div className="table-card preview-table">
              <table>
                <thead>
                  <tr>
                    <th>Line</th>
                    <th>SKU</th>
                    <th>Description</th>
                    <th>Qty</th>
                    <th>Confidence</th>
                    <th>Price source</th>
                    <th>Price approval</th>
                  </tr>
                </thead>
                <tbody>
                  {report.scrMatchingPreview.lines.map((line) => (
                    <tr key={`${line.lineType}-${line.suggestedSku}`}>
                      <td>{line.lineType}</td>
                      <td>{line.suggestedSku}</td>
                      <td>{line.description}</td>
                      <td>{line.quantity}</td>
                      <td>{line.confidence}</td>
                      <td>{line.priceSource}</td>
                      <td>
                        {line.needsPriceApproval ? "Required" : "Not required"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="empty-state">
              No SCR SKU preview is available for this report yet.
            </p>
          )}
        </section>

        <section className="info-panel wide">
          <h2>Equipment summary</h2>
          <div className="equipment-list">
            {report.equipment.map((item) => (
              <article key={item.id} className="equipment-item">
                <div>
                  <h3>
                    <Link href={`/equipment/${item.id}`}>
                      {item.equipmentNumber} - {item.type}
                    </Link>
                  </h3>
                  <p>{item.subtitle}</p>
                </div>
                <span className="equipment-status">{item.status}</span>
                <p>{item.notes}</p>
              </article>
            ))}
            {!report.equipment.length ? (
              <p>No equipment linked to this service report.</p>
            ) : null}
          </div>
        </section>
      </div>
    </section>
  );
}
