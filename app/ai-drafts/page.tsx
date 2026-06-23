import Link from "next/link";
import { getAiDraftList } from "./ai-draft-adapter";

export const dynamic = "force-dynamic";

export default async function AiDraftsPage() {
  const drafts = await getAiDraftList();

  return (
    <section className="page-shell">
      <div className="detail-header">
        <div>
          <p className="eyebrow">AI Draft Suggestions</p>
          <h1>AI draft shell</h1>
          <p className="lede">
            Read-only shell for future AI draft suggestions, approvals, and
            Maven draft lifecycle review.
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
              <th>Draft</th>
              <th>Status</th>
              <th>Document type</th>
              <th>Approval</th>
              <th>Customer</th>
              <th>Service report</th>
              <th>Suggested total</th>
            </tr>
          </thead>
          <tbody>
            {drafts.map((draft) => (
              <tr key={draft.id}>
                <td>
                  <Link href={`/ai-drafts/${draft.id}`}>{draft.title}</Link>
                </td>
                <td>{draft.draftStatus}</td>
                <td>{draft.suggestedDocumentType}</td>
                <td>{draft.approvalStatus}</td>
                <td>
                  {draft.customerId ? (
                    <Link href={`/customers/${draft.customerId}`}>
                      {draft.customerName}
                    </Link>
                  ) : (
                    draft.customerName
                  )}
                </td>
                <td>
                  {draft.serviceReportId ? (
                    <Link href={`/service-reports/${draft.serviceReportId}`}>
                      {draft.serviceReportNumber}
                    </Link>
                  ) : (
                    draft.serviceReportNumber
                  )}
                </td>
                <td>{draft.suggestedTotalAmount}</td>
              </tr>
            ))}
            {!drafts.length ? (
              <tr>
                <td colSpan={7}>
                  No AI draft suggestions are available yet. This read-only
                  shell is ready for future imported or generated draft rows.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}
