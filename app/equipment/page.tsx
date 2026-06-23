import Link from "next/link";
import { getEquipmentList, type EquipmentListFilters } from "./equipment-adapter";

export const dynamic = "force-dynamic";

type EquipmentPageProps = {
  searchParams?: Promise<{
    q?: string;
    type?: string;
    status?: string;
    linked?: string;
  }>;
};

function parseBooleanFilter(value: string | undefined) {
  if (value === "true") return true;
  if (value === "false") return false;
  return undefined;
}

export default async function EquipmentPage({
  searchParams,
}: EquipmentPageProps) {
  const params = await searchParams;
  const filters: EquipmentListFilters = {
    query: params?.q?.trim() || undefined,
    type: params?.type?.trim() || undefined,
    status: params?.status?.trim() || undefined,
    linked: parseBooleanFilter(params?.linked),
  };
  const equipment = await getEquipmentList(filters);

  return (
    <section className="page-shell">
      <div className="detail-header">
        <div>
          <p className="eyebrow">Equipment</p>
          <h1>Equipment records</h1>
          <p className="lede">
            Read-only equipment list linked to service report history.
          </p>
        </div>
        <Link className="button secondary" href="/">
          Back to dashboard
        </Link>
      </div>

      <form className="info-panel" action="/equipment">
        <div className="detail-grid">
          <label>
            <dt>Search</dt>
            <dd>
              <input
                defaultValue={filters.query}
                name="q"
                placeholder="Number, model, serial, category, report"
                style={{ padding: 10, width: "100%" }}
              />
            </dd>
          </label>
          <label>
            <dt>Type</dt>
            <dd>
              <input
                defaultValue={filters.type}
                name="type"
                placeholder="Compressor, dryer, tank"
                style={{ padding: 10, width: "100%" }}
              />
            </dd>
          </label>
          <label>
            <dt>Status</dt>
            <dd>
              <input
                defaultValue={filters.status}
                name="status"
                placeholder="System status"
                style={{ padding: 10, width: "100%" }}
              />
            </dd>
          </label>
          <label>
            <dt>Service report</dt>
            <dd>
              <select
                defaultValue={params?.linked ?? ""}
                name="linked"
                style={{ padding: 10, width: "100%" }}
              >
                <option value="">All equipment</option>
                <option value="true">Linked to report</option>
                <option value="false">Without report</option>
              </select>
            </dd>
          </label>
          <div className="actions">
            <button className="button" type="submit">
              Apply filters
            </button>
            <Link className="button secondary" href="/equipment">
              Clear
            </Link>
          </div>
        </div>
      </form>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Equipment</th>
              <th>Type</th>
              <th>Model</th>
              <th>Serial</th>
              <th>Status</th>
              <th>Hours</th>
              <th>Service report</th>
              <th>Customer</th>
            </tr>
          </thead>
          <tbody>
            {equipment.map((item) => (
              <tr key={item.id}>
                <td>
                  <Link href={`/equipment/${item.id}`}>
                    {item.equipmentNumber}
                  </Link>
                </td>
                <td>{item.type}</td>
                <td>{item.model}</td>
                <td>{item.serialNumber}</td>
                <td>{item.status}</td>
                <td>{item.currentHours}</td>
                <td>
                  {item.serviceReportId ? (
                    <Link href={`/service-reports/${item.serviceReportId}`}>
                      {item.serviceReportNumber}
                    </Link>
                  ) : (
                    item.serviceReportNumber
                  )}
                </td>
                <td>{item.customer}</td>
              </tr>
            ))}
            {!equipment.length ? (
              <tr>
                <td colSpan={8}>No equipment matches the current filters.</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}
