import Link from "next/link";
import { getBusinessDocumentList } from "./business-document-adapter";

export const dynamic = "force-dynamic";

export default async function BusinessDocumentsPage() {
  const documents = await getBusinessDocumentList();

  return (
    <section className="page-shell">
      <div className="detail-header">
        <div>
          <p className="eyebrow">Business Documents</p>
          <h1>Business document draft shell</h1>
          <p className="lede">
            Read-only shell for draft documents, approval state, Maven lifecycle,
            and customer delivery status.
          </p>
        </div>
        <Link className="button secondary" href="/">
          Back to dashboard
        </Link>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Document</th>
              <th>Status</th>
              <th>Type</th>
              <th>Approval</th>
              <th>Customer</th>
              <th>Service report</th>
              <th>AI draft</th>
              <th>Maven document</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((document) => (
              <tr key={document.id}>
                <td>
                  <Link href={`/business-documents/${document.id}`}>
                    {document.title}
                  </Link>
                </td>
                <td>{document.status}</td>
                <td>{document.selectedDocumentType}</td>
                <td>{document.approvalStatus}</td>
                <td>
                  {document.customerId ? (
                    <Link href={`/customers/${document.customerId}`}>
                      {document.customerName}
                    </Link>
                  ) : (
                    document.customerName
                  )}
                </td>
                <td>
                  {document.serviceReportId ? (
                    <Link href={`/service-reports/${document.serviceReportId}`}>
                      {document.serviceReportNumber}
                    </Link>
                  ) : (
                    document.serviceReportNumber
                  )}
                </td>
                <td>
                  {document.aiDraftId ? (
                    <Link href={`/ai-drafts/${document.aiDraftId}`}>
                      {document.aiDraftTitle}
                    </Link>
                  ) : (
                    document.aiDraftTitle
                  )}
                </td>
                <td>{document.mavenDocumentNumber}</td>
                <td>{document.totalAmount}</td>
              </tr>
            ))}
            {!documents.length ? (
              <tr>
                <td colSpan={9}>
                  No business documents are available yet. This read-only shell
                  is ready for future draft, approval, Maven, and delivery rows.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}
