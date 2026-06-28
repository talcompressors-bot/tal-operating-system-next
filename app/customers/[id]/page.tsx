import Link from "next/link";
import { notFound } from "next/navigation";
import { getCustomer360ById } from "../customer-adapter";

export const dynamic = "force-dynamic";

type CustomerDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function CustomerDetailPage({
  params,
}: CustomerDetailPageProps) {
  const { id } = await params;
  const customer = await getCustomer360ById(id);

  if (!customer) {
    notFound();
  }

  return (
    <section className="page-shell customer-360-shell">
      <div className="detail-header">
        <div>
          <p className="eyebrow">Customer 360</p>
          <h1>What is happening with {customer.name}?</h1>
          <p className="lede">
            One customer journey workspace for current cases, affected
            equipment, commercial state, money, blockers, and the next action.
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

      <section className="info-panel wide">
        <h2>Runtime boundary</h2>
        <p>{customer.boundary}</p>
      </section>

      <div className="review-status-grid">
        <div className="review-status-item strong">
          <span>Open Business Cases</span>
          <strong>{customer.summary.activeBusinessCases}</strong>
        </div>
        <div className="review-status-item">
          <span>Affected assets</span>
          <strong>{customer.summary.affectedAssets}</strong>
        </div>
        <div className="review-status-item">
          <span>Open documents</span>
          <strong>{customer.summary.openCommercialDocuments}</strong>
        </div>
        <div className="review-status-item">
          <span>Current blockers</span>
          <strong>{customer.summary.blockerCount}</strong>
        </div>
      </div>

      <div className="detail-grid">
        <article className="info-panel">
          <h2>Customer Summary</h2>
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
          <h2>Recommended Next Action</h2>
          <dl>
            <div>
              <dt>Action</dt>
              <dd>
                {customer.recommendedNextAction.href ? (
                  <Link href={customer.recommendedNextAction.href}>
                    {customer.recommendedNextAction.label}
                  </Link>
                ) : (
                  customer.recommendedNextAction.label
                )}
              </dd>
            </div>
            <div>
              <dt>Why</dt>
              <dd>{customer.recommendedNextAction.reason}</dd>
            </div>
          </dl>
        </article>
      </div>

      <section className="info-panel wide customer-360-section">
        <h2>Assets</h2>
        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Asset</th>
                <th>Model</th>
                <th>Serial</th>
                <th>Status</th>
                <th>Open cases</th>
              </tr>
            </thead>
            <tbody>
              {customer.assets.map((asset) => (
                <tr key={asset.id}>
                  <td>
                    <Link href={asset.href}>{asset.label}</Link>
                  </td>
                  <td>{asset.model}</td>
                  <td>{asset.serialNumber}</td>
                  <td>{asset.status}</td>
                  <td>{asset.openCaseCount}</td>
                </tr>
              ))}
              {!customer.assets.length ? (
                <tr>
                  <td colSpan={5}>No affected equipment is visible yet.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>

      <section className="info-panel wide customer-360-section">
        <h2>Open Business Cases</h2>
        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>BusinessCase</th>
                <th>Service</th>
                <th>Commercial</th>
                <th>Financial</th>
                <th>Approval</th>
                <th>Automation</th>
                <th>Blocker</th>
                <th>Next Action</th>
              </tr>
            </thead>
            <tbody>
              {customer.openBusinessCases.map((businessCase) => (
                <tr key={businessCase.id}>
                  <td>
                    <Link href={businessCase.href}>{businessCase.title}</Link>
                  </td>
                  <td>{businessCase.serviceStatus}</td>
                  <td>{businessCase.commercialStatus}</td>
                  <td>{businessCase.financialStatus}</td>
                  <td>{businessCase.approvalStatus}</td>
                  <td>{businessCase.automationStatus}</td>
                  <td>{businessCase.currentBlocker}</td>
                  <td>{businessCase.nextAction}</td>
                </tr>
              ))}
              {!customer.openBusinessCases.length ? (
                <tr>
                  <td colSpan={8}>No open BusinessCases are visible.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>

      <div className="detail-grid">
        <section className="info-panel">
          <h2>Open Commercial Documents</h2>
          <ul className="warning-list neutral">
            {customer.openCommercialDocuments.map((document) => (
              <li key={document.id}>
                <Link href={document.href}>{document.title}</Link>
                <span className="table-note">
                  {document.stage} / {document.approvalStatus} /{" "}
                  {document.totalAmount}
                </span>
              </li>
            ))}
            {!customer.openCommercialDocuments.length ? (
              <li>No open commercial document is visible.</li>
            ) : null}
          </ul>
        </section>

        <section className="info-panel">
          <h2>Financial Status</h2>
          <dl>
            <div>
              <dt>Status</dt>
              <dd>{customer.financialStatus.status}</dd>
            </div>
            <div>
              <dt>Summary</dt>
              <dd>{customer.financialStatus.summary}</dd>
            </div>
          </dl>
          <ul className="warning-list neutral customer-360-list">
            {customer.financialStatus.openItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
                <span className="table-note">{item.amount}</span>
              </li>
            ))}
            {!customer.financialStatus.openItems.length ? (
              <li>No open money item is visible from current runtime.</li>
            ) : null}
          </ul>
        </section>
      </div>

      <section className="info-panel wide customer-360-section">
        <h2>Current Blockers</h2>
        <ul className="warning-list">
          {customer.currentBlockers.map((blocker, index) => (
            <li key={`${blocker.href}-${index}`}>
              <Link href={blocker.href}>{blocker.domain}</Link>:{" "}
              {blocker.message}
            </li>
          ))}
          {!customer.currentBlockers.length ? (
            <li>No current blocker is visible for this customer.</li>
          ) : null}
        </ul>
      </section>

      <div className="detail-grid">
        <section className="info-panel">
          <h2>Recent Timeline</h2>
          <ul className="warning-list neutral">
            {customer.recentTimeline.map((event, index) => (
              <li key={`${event.href}-${index}`}>
                <Link href={event.href}>{event.label}</Link>
                <span className="table-note">{event.status}</span>
              </li>
            ))}
            {!customer.recentTimeline.length ? (
              <li>No timeline events are visible.</li>
            ) : null}
          </ul>
        </section>

        <section className="info-panel">
          <h2>Future Opportunities</h2>
          <ul className="warning-list neutral">
            {customer.futureOpportunities.map((opportunity, index) => (
              <li key={`${opportunity.href}-${index}`}>
                {opportunity.href ? (
                  <Link href={opportunity.href}>{opportunity.label}</Link>
                ) : (
                  opportunity.label
                )}
                <span className="table-note">{opportunity.reason}</span>
              </li>
            ))}
            {!customer.futureOpportunities.length ? (
              <li>No future opportunity is visible from current runtime.</li>
            ) : null}
          </ul>
        </section>
      </div>
    </section>
  );
}
