import Link from "next/link";
import {
  getServiceReportList,
  type ServiceReportListFilters,
} from "./service-report-adapter";

export const dynamic = "force-dynamic";

type ServiceReportsPageProps = {
  searchParams?: Promise<{
    q?: string;
    status?: string;
    customer?: string;
    hasEquipment?: string;
  }>;
};

function parseBooleanFilter(value: string | undefined) {
  if (value === "true") return true;
  if (value === "false") return false;
  return undefined;
}

export default async function ServiceReportsPage({
  searchParams,
}: ServiceReportsPageProps) {
  const params = await searchParams;
  const filters: ServiceReportListFilters = {
    query: params?.q?.trim() || undefined,
    status: params?.status?.trim() || undefined,
    customer: params?.customer?.trim() || undefined,
    hasEquipment: parseBooleanFilter(params?.hasEquipment),
  };
  const { serviceReports, filterOptions } =
    await getServiceReportList(filters);

  return (
    <section className="page-shell">
      <div className="detail-header">
        <div>
          <p className="eyebrow">Development view - read-only staging data</p>
          <h1>Service reports</h1>
          <p className="lede">
            Read-only service report list with customer and equipment context.
            Each report opens the central work screen.
          </p>
        </div>
        <Link className="button secondary" href="/">
          Back to dashboard
        </Link>
      </div>

      <form className="info-panel" action="/service-reports">
        <div className="detail-grid">
          <label>
            <dt>Search</dt>
            <dd>
              <input
                defaultValue={filters.query}
                name="q"
                placeholder="Report, customer, technician, equipment, model"
                style={{ padding: 10, width: "100%" }}
              />
            </dd>
          </label>
          <label>
            <dt>Status</dt>
            <dd>
              <select
                defaultValue={filters.status ?? ""}
                name="status"
                style={{ padding: 10, width: "100%" }}
              >
                <option value="">All statuses</option>
                {filterOptions.statuses.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </dd>
          </label>
          <label>
            <dt>Customer</dt>
            <dd>
              <select
                defaultValue={filters.customer ?? ""}
                name="customer"
                style={{ padding: 10, width: "100%" }}
              >
                <option value="">All customers</option>
                {filterOptions.customers.map((customer) => (
                  <option key={customer.value} value={customer.value}>
                    {customer.label}
                  </option>
                ))}
              </select>
            </dd>
          </label>
          <label>
            <dt>Equipment</dt>
            <dd>
              <select
                defaultValue={params?.hasEquipment ?? ""}
                name="hasEquipment"
                style={{ padding: 10, width: "100%" }}
              >
                <option value="">All reports</option>
                <option value="true">With equipment</option>
                <option value="false">Without equipment</option>
              </select>
            </dd>
          </label>
          <div className="actions">
            <button className="button" type="submit">
              Apply filters
            </button>
            <Link className="button secondary" href="/service-reports">
              Clear
            </Link>
          </div>
        </div>
      </form>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Report</th>
              <th>Customer cue</th>
              <th>Equipment / model cue</th>
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
                <td>
                  {report.customerSummary.id ? (
                    <Link href={`/customers/${report.customerSummary.id}`}>
                      {report.customer}
                    </Link>
                  ) : (
                    report.customer
                  )}
                </td>
                <td>{report.equipmentCue}</td>
                <td>{report.serviceDate}</td>
                <td>{report.technician}</td>
                <td>
                  <span className={`status ${report.statusClassName}`}>
                    {report.status}
                  </span>
                </td>
              </tr>
            ))}
            {!serviceReports.length ? (
              <tr>
                <td colSpan={6}>No service reports match the current filters.</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}
