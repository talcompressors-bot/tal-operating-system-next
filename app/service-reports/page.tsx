import Link from "next/link";
import { getServiceReportList } from "./service-report-adapter";

export const dynamic = "force-dynamic";

export default async function ServiceReportsPage() {
  const serviceReports = await getServiceReportList();

  return (
    <section className="page-shell">
      <div>
        <p className="eyebrow">תצוגת פיתוח - נתוני דוגמה</p>
        <h1>דוחות שירות</h1>
        <p className="lede">
          טבלת דוחות שירות לקריאה בלבד עבור גרסת הפיתוח הראשונה של מערכת טל.
          כל שורה פותחת דף פירוט לדוח.
        </p>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>מספר דוח</th>
              <th>לקוח</th>
              <th>תאריך</th>
              <th>טכנאי</th>
              <th>סטטוס</th>
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
                  <span className={`status ${report.statusClassName}`}>
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
