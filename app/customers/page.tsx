import Link from "next/link";
import { getCustomerList, type CustomerListFilters } from "./customer-adapter";

export const dynamic = "force-dynamic";

type CustomersPageProps = {
  searchParams?: Promise<{
    q?: string;
    active?: string;
    hasReports?: string;
  }>;
};

function parseBooleanFilter(value: string | undefined) {
  if (value === "true") return true;
  if (value === "false") return false;
  return undefined;
}

export default async function CustomersPage({
  searchParams,
}: CustomersPageProps) {
  const params = await searchParams;
  const filters: CustomerListFilters = {
    query: params?.q?.trim() || undefined,
    active: parseBooleanFilter(params?.active),
    hasReports: parseBooleanFilter(params?.hasReports),
  };
  const customers = await getCustomerList(filters);

  return (
    <section className="page-shell">
      <div className="detail-header">
        <div>
          <p className="eyebrow">Customers</p>
          <h1>Customer records</h1>
          <p className="lede">
            Read-only customer list linked to service report history.
          </p>
        </div>
        <Link className="button secondary" href="/">
          Back to dashboard
        </Link>
      </div>

      <form className="info-panel" action="/customers">
        <div className="detail-grid">
          <label>
            <dt>Search</dt>
            <dd>
              <input
                defaultValue={filters.query}
                name="q"
                placeholder="Name, contact, phone, email, business ID"
                style={{ padding: 10, width: "100%" }}
              />
            </dd>
          </label>
          <label>
            <dt>Status</dt>
            <dd>
              <select
                defaultValue={params?.active ?? ""}
                name="active"
                style={{ padding: 10, width: "100%" }}
              >
                <option value="">All customers</option>
                <option value="true">Active only</option>
                <option value="false">Inactive only</option>
              </select>
            </dd>
          </label>
          <label>
            <dt>Service reports</dt>
            <dd>
              <select
                defaultValue={params?.hasReports ?? ""}
                name="hasReports"
                style={{ padding: 10, width: "100%" }}
              >
                <option value="">All customers</option>
                <option value="true">With service reports</option>
                <option value="false">Without service reports</option>
              </select>
            </dd>
          </label>
          <div className="actions" style={{ alignItems: "end" }}>
            <button className="button" type="submit">
              Apply filters
            </button>
            <Link className="button secondary" href="/customers">
              Clear
            </Link>
          </div>
        </div>
      </form>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Contact</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Business ID</th>
              <th>Status</th>
              <th>Reports</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>
                  <Link href={`/customers/${customer.id}`}>
                    {customer.name}
                  </Link>
                </td>
                <td>{customer.contactName}</td>
                <td>{customer.phonePrimary}</td>
                <td>{customer.emailPrimary}</td>
                <td>{customer.businessId}</td>
                <td>
                  <span className={`status ${customer.statusClassName}`}>
                    {customer.status}
                  </span>
                </td>
                <td>{customer.serviceReportCount}</td>
              </tr>
            ))}
            {!customers.length ? (
              <tr>
                <td colSpan={7}>No customers match the current filters.</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}
