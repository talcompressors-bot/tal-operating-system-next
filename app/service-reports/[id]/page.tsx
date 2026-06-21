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
          <p className="eyebrow">דוח שירות</p>
          <h1>דוח #{report.reportNumber}</h1>
          <p className="lede">{report.customer}</p>
        </div>
        <Link className="button secondary" href="/service-reports">
          חזרה לרשימה
        </Link>
      </div>

      <div className="detail-grid">
        <section className="info-panel">
          <h2>פרטי הדוח</h2>
          <dl>
            <div>
              <dt>מספר דוח</dt>
              <dd>{report.reportNumber}</dd>
            </div>
            <div>
              <dt>לקוח</dt>
              <dd>{report.customer}</dd>
            </div>
            <div>
              <dt>תאריך שירות</dt>
              <dd>{report.serviceDate}</dd>
            </div>
            <div>
              <dt>טכנאי</dt>
              <dd>{report.technician}</dd>
            </div>
            <div>
              <dt>סטטוס</dt>
              <dd>
                <span className={`status ${report.status.toLowerCase()}`}>
                  {report.status}
                </span>
              </dd>
            </div>
          </dl>
        </section>

        <section className="info-panel wide">
          <h2>תיאור השירות</h2>
          <p>{report.description}</p>
        </section>

        <section className="info-panel wide">
          <h2>המלצות</h2>
          <p>{report.recommendations}</p>
        </section>

        <section className="info-panel wide">
          <h2>ציוד</h2>
          <div className="equipment-list">
            {report.equipment.map((item) => (
              <article key={item.id} className="equipment-item">
                <div>
                  <h3>
                    {item.equipmentNumber} · {item.type}
                  </h3>
                  <p>
                    {item.model} · מס סידורי {item.serialNumber}
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
