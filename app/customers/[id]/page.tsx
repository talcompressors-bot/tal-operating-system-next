import Link from "next/link";
import { notFound } from "next/navigation";
import { getCustomerById } from "../customer-adapter";

export const dynamic = "force-dynamic";

type CustomerDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function CustomerDetailPage({
  params,
}: CustomerDetailPageProps) {
  const { id } = await params;
  const customer = await getCustomerById(id);

  if (!customer) {
    notFound();
  }

  return (
    <section className="page-shell">
      <div className="detail-header">
        <div>
          <p className="eyebrow">Customer</p>
          <h1>{customer.name}</h1>
          <p className="lede">
            Read-only customer card with linked service report history.
          </p>
        </div>
        <div className="actions">
          <Link className="button secondary" href="/customers">
            Back to customers
          </Link>
          <Link className="button secondary" href="/service-reports">
            Service reports
          </Link>
        </div>
      </div>

      <div className="detail-grid">
        <article className="info-panel">
          <h2>Contact</h2>
          <dl>
            <div>
              <dt>Primary contact</dt>
              <dd>{customer.contactName}</dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>{customer.phonePrimary}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{customer.emailPrimary}</dd>
            </div>
            <div>
              <dt>Address</dt>
              <dd>{customer.address}</dd>
            </div>
          </dl>
        </article>

        <article className="info-panel">
          <h2>Account</h2>
          <dl>
            <div>
              <dt>AppSheet customer ID</dt>
              <dd>{customer.id}</dd>
            </div>
            <div>
              <dt>Business ID</dt>
              <dd>{customer.businessId}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>
                <span className={`status ${customer.statusClassName}`}>
                  {customer.status}
                </span>
              </dd>
            </div>
            <div>
              <dt>Service reports</dt>
              <dd>{customer.serviceReportCount}</dd>
            </div>
          </dl>
        </article>

        <article className="info-panel wide">
          <h2>Future links</h2>
          <dl>
            <div>
              <dt>Business documents</dt>
              <dd>{customer.futureLinks.businessDocuments}</dd>
            </div>
            <div>
              <dt>AI drafts</dt>
              <dd>{customer.futureLinks.aiDrafts}</dd>
            </div>
            <div>
              <dt>Maven documents</dt>
              <dd>{customer.futureLinks.mavenDocuments}</dd>
            </div>
          </dl>
        </article>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Report</th>
              <th>Date</th>
              <th>Technician</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {customer.serviceReports.map((report) => (
              <tr key={report.id}>
                <td>
                  <Link href={`/service-reports/${report.id}`}>
                    {report.reportNumber}
                  </Link>
                </td>
                <td>{report.serviceDate}</td>
                <td>{report.technician}</td>
                <td>
                  <span className={`status ${report.statusClassName}`}>
                    {report.status}
                  </span>
                </td>
              </tr>
            ))}
            {!customer.serviceReports.length ? (
              <tr>
                <td colSpan={4}>No service reports linked to this customer.</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}
