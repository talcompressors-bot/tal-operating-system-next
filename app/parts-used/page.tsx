import Link from "next/link";
import {
  getPartsUsedList,
  type PartsUsedListFilters,
} from "./parts-used-adapter";

export const dynamic = "force-dynamic";

type PartsUsedPageProps = {
  searchParams?: Promise<{
    q?: string;
    matchSource?: string;
    approval?: string;
    linked?: string;
  }>;
};

function parseBooleanFilter(value: string | undefined) {
  if (value === "true") return true;
  if (value === "false") return false;
  return undefined;
}

export default async function PartsUsedPage({
  searchParams,
}: PartsUsedPageProps) {
  const params = await searchParams;
  const filters: PartsUsedListFilters = {
    query: params?.q?.trim() || undefined,
    matchSource: params?.matchSource?.trim() || undefined,
    approval: parseBooleanFilter(params?.approval),
    linked: parseBooleanFilter(params?.linked),
  };
  const parts = await getPartsUsedList(filters);

  return (
    <section className="page-shell">
      <div className="detail-header">
        <div>
          <p className="eyebrow">Parts Used</p>
          <h1>Parts used records</h1>
          <p className="lede">
            Read-only parts usage linked to service reports and product catalog
            records where available.
          </p>
        </div>
        <Link className="button secondary" href="/">
          Back to dashboard
        </Link>
      </div>

      <form className="info-panel" action="/parts-used">
        <div className="detail-grid">
          <label>
            <dt>Search</dt>
            <dd>
              <input
                defaultValue={filters.query}
                name="q"
                placeholder="Part, SKU, equipment, report, product"
                style={{ padding: 10, width: "100%" }}
              />
            </dd>
          </label>
          <label>
            <dt>Match source</dt>
            <dd>
              <select
                defaultValue={params?.matchSource ?? ""}
                name="matchSource"
                style={{ padding: 10, width: "100%" }}
              >
                <option value="">All match sources</option>
                <option value="UNKNOWN">Unknown</option>
                <option value="PRODUCTS_CATALOG">Products catalog</option>
                <option value="MAVEN_HISTORY">Maven history</option>
                <option value="SAME_CUSTOMER_HISTORY">
                  Same customer history
                </option>
                <option value="SAME_EQUIPMENT_HISTORY">
                  Same equipment history
                </option>
                <option value="SIMILAR_SERVICE_HISTORY">
                  Similar service history
                </option>
                <option value="AI_ESTIMATE">AI estimate</option>
                <option value="FIXED_RULE">Fixed rule</option>
                <option value="MANUAL">Manual</option>
              </select>
            </dd>
          </label>
          <label>
            <dt>Approval</dt>
            <dd>
              <select
                defaultValue={params?.approval ?? ""}
                name="approval"
                style={{ padding: 10, width: "100%" }}
              >
                <option value="">All records</option>
                <option value="true">Needs approval</option>
                <option value="false">Approved</option>
              </select>
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
                <option value="">All parts</option>
                <option value="true">Linked to report</option>
                <option value="false">Without report</option>
              </select>
            </dd>
          </label>
          <div className="actions">
            <button className="button" type="submit">
              Apply filters
            </button>
            <Link className="button secondary" href="/parts-used">
              Clear
            </Link>
          </div>
        </div>
      </form>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Part</th>
              <th>SKU</th>
              <th>Quantity</th>
              <th>Equipment</th>
              <th>Match</th>
              <th>Approval</th>
              <th>Service report</th>
              <th>Customer</th>
            </tr>
          </thead>
          <tbody>
            {parts.map((part) => (
              <tr key={part.id}>
                <td>
                  <Link href={`/parts-used/${part.id}`}>{part.partName}</Link>
                </td>
                <td>{part.partSku}</td>
                <td>{part.quantity}</td>
                <td>{part.equipmentReference}</td>
                <td>{part.matchSource}</td>
                <td>{part.needsUserApproval}</td>
                <td>
                  {part.serviceReportId ? (
                    <Link href={`/service-reports/${part.serviceReportId}`}>
                      {part.serviceReportNumber}
                    </Link>
                  ) : (
                    part.serviceReportNumber
                  )}
                </td>
                <td>{part.customer}</td>
              </tr>
            ))}
            {!parts.length ? (
              <tr>
                <td colSpan={8}>No parts used match the current filters.</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}
