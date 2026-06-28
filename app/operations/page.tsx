import Link from "next/link";
import { getOperationsCenter } from "./operations-center-runtime";

export const dynamic = "force-dynamic";

function OperationsTable({
  rows,
}: {
  rows: Awaited<ReturnType<typeof getOperationsCenter>>["buckets"][number]["rows"];
}) {
  if (!rows.length) {
    return (
      <div className="empty-state">
        No cases are currently in this operational state.
      </div>
    );
  }

  return (
    <div className="table-card operations-table">
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Asset</th>
            <th>BusinessCase</th>
            <th>Current Stage</th>
            <th>Current Blocker</th>
            <th>Next Recommended Action</th>
            <th>Assigned Owner</th>
            <th>Priority</th>
            <th>Last Activity</th>
            <th>Financial Status</th>
            <th>Commercial Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>
                {row.customer.href ? (
                  <Link href={row.customer.href}>{row.customer.name}</Link>
                ) : (
                  row.customer.name
                )}
              </td>
              <td>
                {row.asset.href ? (
                  <Link href={row.asset.href}>{row.asset.label}</Link>
                ) : (
                  row.asset.label
                )}
              </td>
              <td>
                <Link href={row.businessCase.href}>{row.businessCase.title}</Link>
              </td>
              <td>{row.currentStage}</td>
              <td>{row.currentBlocker}</td>
              <td>{row.nextRecommendedAction}</td>
              <td>{row.assignedOwner}</td>
              <td>
                <span className={`priority-pill ${row.priority.toLowerCase()}`}>
                  {row.priority}
                </span>
              </td>
              <td>{row.lastActivity}</td>
              <td>{row.financialStatus}</td>
              <td>{row.commercialStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function OperationsCenterPage() {
  const operationsCenter = await getOperationsCenter();

  return (
    <section className="page-shell operations-shell">
      <div className="detail-header">
        <div>
          <p className="eyebrow">TAL Operations Center</p>
          <h1>Daily operational workspace</h1>
          <p className="lede">
            One morning view for open BusinessCases, blockers, readiness,
            ownership, and the next recommended action. Recommendations are
            advisory only and do not execute workflow steps.
          </p>
        </div>
        <div className="actions">
          <Link className="button secondary" href="/service-reports">
            Service reports
          </Link>
          <Link className="button secondary" href="/business-documents">
            Business documents
          </Link>
        </div>
      </div>

      <section className="info-panel wide">
        <h2>Runtime boundary</h2>
        <p>{operationsCenter.boundary}</p>
      </section>

      <div className="review-status-grid">
        <div className="review-status-item strong">
          <span>Total cases</span>
          <strong>{operationsCenter.summary.totalCases}</strong>
        </div>
        <div className="review-status-item">
          <span>Immediate action</span>
          <strong>{operationsCenter.summary.immediateAction}</strong>
        </div>
        <div className="review-status-item">
          <span>Blocked</span>
          <strong>{operationsCenter.summary.blocked}</strong>
        </div>
        <div className="review-status-item">
          <span>Ready to close</span>
          <strong>{operationsCenter.summary.ready}</strong>
        </div>
      </div>

      {operationsCenter.buckets.map((bucket) => (
        <section key={bucket.key} className="info-panel wide operations-section">
          <div className="operations-section-heading">
            <div>
              <h2>{bucket.title}</h2>
              <p>{bucket.description}</p>
            </div>
            <strong>{bucket.rows.length}</strong>
          </div>
          <OperationsTable rows={bucket.rows} />
        </section>
      ))}
    </section>
  );
}
