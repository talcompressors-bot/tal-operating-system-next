import Link from "next/link";
import { notFound } from "next/navigation";
import { getEquipmentById } from "../equipment-adapter";

export const dynamic = "force-dynamic";

type EquipmentDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EquipmentDetailPage({
  params,
}: EquipmentDetailPageProps) {
  const { id } = await params;
  const equipment = await getEquipmentById(id);

  if (!equipment) {
    notFound();
  }

  const { assetIntelligence } = equipment;

  return (
    <section className="page-shell">
      <div className="detail-header">
        <div>
          <p className="eyebrow">Equipment</p>
          <h1>{equipment.equipmentNumber}</h1>
          <p className="lede">
            Read-only equipment card with linked service report work-screen context.
          </p>
        </div>
        <div className="actions">
          <Link className="button secondary" href="/equipment">
            Back to equipment
          </Link>
          {equipment.serviceReportId ? (
            <Link
              className="button secondary"
              href={`/service-reports/${equipment.serviceReportId}`}
            >
              Service report work screen
            </Link>
          ) : null}
        </div>
      </div>

      <div className="detail-grid">
        <article className="info-panel">
          <h2>Equipment</h2>
          <dl>
            <div>
              <dt>AppSheet item ID</dt>
              <dd>{equipment.id}</dd>
            </div>
            <div>
              <dt>Type</dt>
              <dd>{equipment.type}</dd>
            </div>
            <div>
              <dt>Subtype</dt>
              <dd>{equipment.subtype}</dd>
            </div>
            <div>
              <dt>Model</dt>
              <dd>{equipment.model}</dd>
            </div>
            <div>
              <dt>Serial number</dt>
              <dd>{equipment.serialNumber}</dd>
            </div>
            <div>
              <dt>Category</dt>
              <dd>{equipment.compressorCategory}</dd>
            </div>
          </dl>
        </article>

        <article className="info-panel">
          <h2>Status</h2>
          <dl>
            <div>
              <dt>System status</dt>
              <dd>{equipment.status}</dd>
            </div>
            <div>
              <dt>Current hours</dt>
              <dd>{equipment.currentHours}</dd>
            </div>
            <div>
              <dt>Next service</dt>
              <dd>{equipment.nextService}</dd>
            </div>
            <div>
              <dt>Report counter</dt>
              <dd>{equipment.reportCounter}</dd>
            </div>
            <div>
              <dt>Source report ID</dt>
              <dd>{equipment.sourceReportId}</dd>
            </div>
          </dl>
        </article>

        <article className="info-panel wide">
          <h2>Service report work-screen context</h2>
          <dl>
            <div>
              <dt>Service report work screen</dt>
              <dd>
                {equipment.serviceReportId ? (
                  <Link href={`/service-reports/${equipment.serviceReportId}`}>
                    {equipment.serviceReportNumber}
                  </Link>
                ) : (
                  equipment.serviceReportNumber
                )}
              </dd>
            </div>
            <div>
              <dt>Customer</dt>
              <dd>{equipment.customer}</dd>
            </div>
            <div>
              <dt>Service date</dt>
              <dd>{equipment.serviceReportDate}</dd>
            </div>
            <div>
              <dt>Technician</dt>
              <dd>{equipment.serviceReportTechnician}</dd>
            </div>
          </dl>
        </article>

        <article className="info-panel wide">
          <h2>Tal Intelligence Core - Asset Intelligence</h2>
          <p>{assetIntelligence.boundary}</p>
          <div className="review-status-grid" style={{ marginTop: 18 }}>
            <div className="review-status-item strong">
              <span>Objective</span>
              <strong>{assetIntelligence.businessObjective}</strong>
            </div>
            <div className="review-status-item">
              <span>Identity confidence</span>
              <strong>
                {assetIntelligence.identityConfidence.label} -{" "}
                {assetIntelligence.identityConfidence.score}%
              </strong>
              <small>{assetIntelligence.identityConfidence.reason}</small>
            </div>
            <div className="review-status-item">
              <span>Related reports</span>
              <strong>{assetIntelligence.summary.relatedServiceReports}</strong>
            </div>
            <div className="review-status-item">
              <span>Business documents</span>
              <strong>{assetIntelligence.summary.linkedBusinessDocuments}</strong>
            </div>
            <div className="review-status-item">
              <span>Recurring signals</span>
              <strong>{assetIntelligence.summary.recurringSignals}</strong>
            </div>
            <div className="review-status-item">
              <span>Data gaps</span>
              <strong>{assetIntelligence.summary.dataQualityGaps}</strong>
            </div>
          </div>
        </article>

        <article className="info-panel wide">
          <h2>Recommended next action</h2>
          <dl>
            <div>
              <dt>Action</dt>
              <dd>
                {assetIntelligence.nextBestAction.href ? (
                  <Link href={assetIntelligence.nextBestAction.href}>
                    {assetIntelligence.nextBestAction.label}
                  </Link>
                ) : (
                  assetIntelligence.nextBestAction.label
                )}
              </dd>
            </div>
            <div>
              <dt>Reason</dt>
              <dd>{assetIntelligence.nextBestAction.reason}</dd>
            </div>
          </dl>
        </article>

        <article className="info-panel wide">
          <h2>Sources searched</h2>
          <div className="evidence-grid">
            {assetIntelligence.sourcesSearched.map((source) => (
              <div className="evidence-item" key={source.source}>
                <span>{source.source}</span>
                <strong>{source.status}</strong>
                <p>{source.explanation}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="info-panel wide">
          <h2>Relationship evidence</h2>
          <ul className="warning-list neutral">
            {assetIntelligence.relationshipEvidence.map((evidence) => (
              <li key={evidence}>{evidence}</li>
            ))}
          </ul>
        </article>

        <article className="info-panel wide">
          <h2>Recurring service signals</h2>
          {assetIntelligence.recurringSignals.length ? (
            <div className="table-card">
              <table>
                <thead>
                  <tr>
                    <th>Signal</th>
                    <th>Matches</th>
                    <th>Evidence</th>
                  </tr>
                </thead>
                <tbody>
                  {assetIntelligence.recurringSignals.map((signal) => (
                    <tr key={signal.label}>
                      <td>{signal.label}</td>
                      <td>{signal.count}</td>
                      <td>{signal.evidence || "No report labels available"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No recurring service signal was detected from current evidence.</p>
          )}
        </article>

        <article className="info-panel wide">
          <h2>Data-quality gaps</h2>
          {assetIntelligence.dataQualityGaps.length ? (
            <ul className="warning-list">
              {assetIntelligence.dataQualityGaps.map((gap) => (
                <li key={gap}>{gap}</li>
              ))}
            </ul>
          ) : (
            <p>No asset data-quality gap was detected from current evidence.</p>
          )}
        </article>

        <article className="info-panel wide">
          <h2>Asset service timeline</h2>
          <div className="table-card">
            <table>
              <thead>
                <tr>
                  <th>Report</th>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Technician</th>
                  <th>Status</th>
                  <th>Relationship</th>
                  <th>Service evidence</th>
                  <th>Business documents</th>
                </tr>
              </thead>
              <tbody>
                {assetIntelligence.serviceTimeline.map((event) => (
                  <tr key={`${event.serviceReportId}-${event.relationship}`}>
                    <td>
                      {event.serviceReportId ? (
                        <Link href={`/service-reports/${event.serviceReportId}`}>
                          {event.serviceReportNumber}
                        </Link>
                      ) : (
                        event.serviceReportNumber
                      )}
                    </td>
                    <td>{event.serviceDate}</td>
                    <td>
                      {event.customerId ? (
                        <Link href={`/customers/${event.customerId}`}>
                          {event.customerName}
                        </Link>
                      ) : (
                        event.customerName
                      )}
                    </td>
                    <td>{event.technician}</td>
                    <td>{event.status}</td>
                    <td>{event.relationship}</td>
                    <td>
                      <strong>{event.serviceSummary}</strong>
                      <span className="table-note">{event.recommendation}</span>
                    </td>
                    <td>
                      {event.businessDocuments.length ? (
                        <ul className="pricing-evidence-list">
                          {event.businessDocuments.map((document) => (
                            <li key={document.id}>
                              <Link href={`/business-documents/${document.id}`}>
                                {document.title}
                              </Link>
                              <span>
                                {document.type} - {document.status} -{" "}
                                {document.approvalStatus} - {document.totalAmount}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        "No linked document"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="info-panel wide">
          <h2>Notes</h2>
          <dl>
            <div>
              <dt>Service description</dt>
              <dd>{equipment.serviceDescription}</dd>
            </div>
            <div>
              <dt>Technician recommendations</dt>
              <dd>{equipment.technicianRecommendations}</dd>
            </div>
          </dl>
        </article>
      </div>
    </section>
  );
}
