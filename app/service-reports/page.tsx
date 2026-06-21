import Link from "next/link";
import { getServiceReportList } from "./service-report-adapter";

export default function ServiceReportsPage() {
  const serviceReports = getServiceReportList();

  return (
    <section className="page-shell">
      <div>
        <p className="eyebrow">Read-only mock data</p>
        <h1>Service Reports</h1>
        <p className="lede">
          Realistic service report table for the first visible Tal Operating
          System slice. Rows open mock detail pages.
        </p>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Report Number</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Technician</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {serviceReports.map((report) => (
              <tr key={report.id}>
                <td>
                  <Link href={`/service-reports/${report.id}`}>
                    #{report.reportNumber}
                  </Link>
                </td>
                <td>{report.customer}</td>
                <td>{report.serviceDate}</td>
                <td>{report.technician}</td>
                <td>
                  <span className={`status ${report.status.toLowerCase()}`}>
                    {report.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
