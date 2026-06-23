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
