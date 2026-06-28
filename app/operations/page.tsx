import Link from "next/link";
import { getOperationsCenter } from "./operations-center-runtime";

export const dynamic = "force-dynamic";

function OperationsTable({
  rows,
}: {
  rows: Awaited<ReturnType<typeof getOperationsCenter>>["queues"][number]["rows"];
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
            <th>Open Action</th>
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
              <td>
                <Link className="table-action-link" href={row.businessCase.href}>
                  Open
                </Link>
              </td>
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
          <p className="eyebrow">TAL Operations Command Center</p>
          <h1>Morning work queue</h1>
          <p className="lede">
            One action-driven workspace for open BusinessCases, blockers,
            ownership, waiting states, and the next recommended action.
            Recommendations are advisory only and do not execute workflow steps.
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
          <span>My work today</span>
          <strong>
            {
              operationsCenter.queues.find((queue) => queue.key === "myWorkToday")
                ?.rows.length
            }
          </strong>
        </div>
        <div className="review-status-item">
          <span>Immediate action</span>
          <strong>{operationsCenter.summary.immediateAction}</strong>
        </div>
        <div className="review-status-item">
          <span>High priority</span>
          <strong>{operationsCenter.summary.highPriority}</strong>
        </div>
        <div className="review-status-item">
          <span>Ready to close</span>
          <strong>{operationsCenter.summary.ready}</strong>
        </div>
      </div>

      {operationsCenter.queues.map((queue) => (
        <section key={queue.key} className="info-panel wide operations-section">
          <div className="operations-section-heading">
            <div>
              <h2>{queue.title}</h2>
              <p>{queue.description}</p>
            </div>
            <strong>{queue.rows.length}</strong>
          </div>
          <OperationsTable rows={queue.rows} />
        </section>
      ))}
    </section>
  );
}
