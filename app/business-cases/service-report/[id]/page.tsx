import Link from "next/link";
import { notFound } from "next/navigation";
import { getBusinessCaseByServiceReportId } from "../../business-case-runtime";

type BusinessCasePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export const dynamic = "force-dynamic";

function DomainPanel({
  title,
  status,
  summary,
  href,
}: {
  title: string;
  status: string;
  summary: string;
  href: string;
}) {
  return (
    <section className="info-panel">
      <h2>{title}</h2>
      <dl>
        <div>
          <dt>Status</dt>
          <dd>{status}</dd>
        </div>
        <div>
          <dt>Summary</dt>
          <dd>{summary}</dd>
        </div>
      </dl>
      {href ? (
        <Link className="button secondary" href={href}>
          Open
        </Link>
      ) : null}
    </section>
  );
}

export default async function BusinessCasePage({
  params,
}: BusinessCasePageProps) {
  const { id } = await params;
  const businessCase = await getBusinessCaseByServiceReportId(id);

  if (!businessCase) {
    notFound();
  }

  return (
    <section className="page-shell">
      <div className="detail-header">
        <div>
          <p className="eyebrow">BusinessCase Runtime</p>
          <h1>{businessCase.title}</h1>
          <p className="lede">
            Read-only operational context. BusinessCase orchestrates existing
            domain runtimes and does not own documents, approvals, financial
            intake, inventory, automation, or external adapters.
          </p>
        </div>
        <div className="actions">
          <Link className="button secondary" href={businessCase.source.href}>
            Service report
          </Link>
          <Link className="button secondary" href="/service-reports">
            Back to reports
          </Link>
        </div>
      </div>

      <div className="detail-grid">
        <section className="info-panel">
          <h2>Case summary</h2>
          <dl>
            <div>
              <dt>Case ID</dt>
              <dd>{businessCase.id}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>{businessCase.status}</dd>
            </div>
            <div>
              <dt>Source</dt>
              <dd>
                <Link href={businessCase.source.href}>
                  {businessCase.source.label}
                </Link>
              </dd>
            </div>
          </dl>
        </section>

        <section className="info-panel">
          <h2>Party</h2>
          <dl>
            <div>
              <dt>Customer</dt>
              <dd>
                {businessCase.party.href ? (
                  <Link href={businessCase.party.href}>
                    {businessCase.party.name}
                  </Link>
                ) : (
                  businessCase.party.name
                )}
              </dd>
            </div>
            <div>
              <dt>Contact</dt>
              <dd>{businessCase.party.contactName}</dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>{businessCase.party.phone}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{businessCase.party.email}</dd>
            </div>
          </dl>
        </section>

        <section className="info-panel wide">
          <h2>Assets</h2>
          <div className="equipment-list">
            {businessCase.assets.map((asset) => (
              <article key={asset.id} className="equipment-item">
                <div>
                  <h3>
                    <Link href={asset.href}>{asset.label}</Link>
                  </h3>
                  <p>
                    {asset.model} / Serial {asset.serialNumber}
                  </p>
                </div>
                <span className="equipment-status">{asset.status}</span>
              </article>
            ))}
            {!businessCase.assets.length ? (
              <p>No assets are linked to this BusinessCase.</p>
            ) : null}
          </div>
        </section>

        <DomainPanel title="Service Operations" {...businessCase.service} />
        <DomainPanel
          title="AI Recommendation"
          {...businessCase.aiRecommendation}
        />
        <DomainPanel title="Commercial" {...businessCase.commercial} />
        <DomainPanel title="Approval" {...businessCase.approval} />
        <DomainPanel title="Automation" {...businessCase.automation} />
        <DomainPanel title="Financial Intake" {...businessCase.financial} />
        <DomainPanel title="Inventory Impact" {...businessCase.inventory} />

        <section className="info-panel wide">
          <h2>Open blockers</h2>
          {businessCase.blockers.length ? (
            <ul className="warning-list">
              {businessCase.blockers.map((blocker) => (
                <li key={`${blocker.domain}-${blocker.message}`}>
                  <strong>{blocker.domain}:</strong> {blocker.message}
                </li>
              ))}
            </ul>
          ) : (
            <ul className="warning-list neutral">
              <li>No current blockers were found by the read-only runtime.</li>
            </ul>
          )}
        </section>

        <section className="info-panel wide">
          <h2>Closure readiness</h2>
          <p>{businessCase.closureReadiness.summary}</p>
        </section>

        <section className="info-panel wide">
          <h2>Business timeline</h2>
          <div className="lifecycle-list">
            {businessCase.timeline.map((event) => (
              <div key={`${event.label}-${event.href}`} className="lifecycle-item">
                <Link href={event.href}>{event.label}</Link>
                <span>{event.status}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
