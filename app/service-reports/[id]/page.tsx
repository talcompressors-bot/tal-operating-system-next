import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getServiceReportById,
  getServiceReportStaticParams,
} from "../service-report-adapter";

type ServiceReportDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return getServiceReportStaticParams();
}

export default async function ServiceReportDetailPage({
  params,
}: ServiceReportDetailPageProps) {
  const { id } = await params;
  const report = getServiceReportById(id);

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
        <Link className="button secondary" href="/service-reports">
          Back to list
        </Link>
      </div>

      <div className="detail-grid">
        <section className="info-panel">
          <h2>Report Details</h2>
          <dl>
            <div>
              <dt>Report Number</dt>
              <dd>{report.reportNumber}</dd>
            </div>
            <div>
              <dt>Customer</dt>
              <dd>{report.customer}</dd>
            </div>
            <div>
              <dt>Service Date</dt>
              <dd>{report.serviceDate}</dd>
            </div>
            <div>
              <dt>Technician</dt>
              <dd>{report.technician}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>
                <span className={`status ${report.status.toLowerCase()}`}>
                  {report.status}
                </span>
              </dd>
            </div>
          </dl>
        </section>

        <section className="info-panel wide">
          <h2>Description</h2>
          <p>{report.description}</p>
        </section>

        <section className="info-panel wide">
          <h2>Recommendations</h2>
          <p>{report.recommendations}</p>
        </section>

        <section className="info-panel wide">
          <h2>Equipment</h2>
          <div className="equipment-list">
            {report.equipment.map((item) => (
              <article key={item.id} className="equipment-item">
                <div>
                  <h3>
                    {item.equipmentNumber} · {item.type}
                  </h3>
                  <p>
                    {item.model} · Serial {item.serialNumber}
                  </p>
                </div>
                <span className="equipment-status">{item.status}</span>
                <p>{item.notes}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
