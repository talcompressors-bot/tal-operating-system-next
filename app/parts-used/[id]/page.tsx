import Link from "next/link";
import { notFound } from "next/navigation";
import { getPartUsedById } from "../parts-used-adapter";

export const dynamic = "force-dynamic";

type PartUsedDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PartUsedDetailPage({
  params,
}: PartUsedDetailPageProps) {
  const { id } = await params;
  const part = await getPartUsedById(id);

  if (!part) {
    notFound();
  }

  return (
    <section className="page-shell">
      <div className="detail-header">
        <div>
          <p className="eyebrow">Parts Used</p>
          <h1>{part.partName}</h1>
          <p className="lede">
            Read-only parts usage card with service report and product context.
          </p>
        </div>
        <div className="actions">
          <Link className="button secondary" href="/parts-used">
            Back to parts used
          </Link>
          {part.serviceReportId ? (
            <Link
              className="button secondary"
              href={`/service-reports/${part.serviceReportId}`}
            >
              Service report
            </Link>
          ) : null}
        </div>
      </div>

      <div className="detail-grid">
        <article className="info-panel">
          <h2>Part</h2>
          <dl>
            <div>
              <dt>AppSheet part ID</dt>
              <dd>{part.id}</dd>
            </div>
            <div>
              <dt>Internal ID</dt>
              <dd>{part.internalId}</dd>
            </div>
            <div>
              <dt>Part SKU</dt>
              <dd>{part.partSku}</dd>
            </div>
            <div>
              <dt>Quantity</dt>
              <dd>{part.quantity}</dd>
            </div>
            <div>
              <dt>Equipment reference</dt>
              <dd>{part.equipmentReference}</dd>
            </div>
          </dl>
        </article>

        <article className="info-panel">
          <h2>Matching</h2>
          <dl>
            <div>
              <dt>Match source</dt>
              <dd>{part.matchSource}</dd>
            </div>
            <div>
              <dt>Match confidence</dt>
              <dd>{part.matchConfidence}</dd>
            </div>
            <div>
              <dt>Approval</dt>
              <dd>{part.needsUserApproval}</dd>
            </div>
          </dl>
        </article>

        <article className="info-panel wide">
          <h2>Service report context</h2>
          <dl>
            <div>
              <dt>Service report</dt>
              <dd>
                {part.serviceReportId ? (
                  <Link href={`/service-reports/${part.serviceReportId}`}>
                    {part.serviceReportNumber}
                  </Link>
                ) : (
                  part.serviceReportNumber
                )}
              </dd>
            </div>
            <div>
              <dt>Customer</dt>
              <dd>{part.customer}</dd>
            </div>
            <div>
              <dt>Technician</dt>
              <dd>{part.serviceReportTechnician}</dd>
            </div>
          </dl>
        </article>

        <article className="info-panel wide">
          <h2>Product catalog context</h2>
          <dl>
            <div>
              <dt>Product</dt>
              <dd>{part.productName}</dd>
            </div>
            <div>
              <dt>Product AppSheet ID</dt>
              <dd>{part.productId || "No product link"}</dd>
            </div>
            <div>
              <dt>Product SKU</dt>
              <dd>{part.productSku}</dd>
            </div>
            <div>
              <dt>Category</dt>
              <dd>{part.productCategory}</dd>
            </div>
          </dl>
        </article>
      </div>
    </section>
  );
}
