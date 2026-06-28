import Link from "next/link";
import { notFound } from "next/navigation";
import { getBusinessDocumentById } from "../../business-document-adapter";

export const dynamic = "force-dynamic";

type BusinessDocumentPreviewPageProps = {
  params: Promise<{ id: string }>;
};

const itemNameHebrew: Record<string, string> = {
  "Air Filter": "מסנן אוויר",
  "Oil Filter": "מסנן שמן",
  "3L SKR oil top-up": "שמן SKR 3 ליטר",
  "Technician Visit / Travel": "ביקור טכנאי / נסיעה",
  "Labor + Service": "עבודה ושירות",
};

function toHebrewItemName(name: string) {
  return itemNameHebrew[name] || name;
}

function formatHebrewTaxLabel(tax: {
  label: string;
  rate: number;
  amountLabel: string;
}) {
  if (tax.label === "VAT") {
    return `מע"מ ${tax.amountLabel}`;
  }

  return `${tax.label} ${tax.amountLabel}`.trim();
}

export default async function BusinessDocumentPreviewPage({
  params,
}: BusinessDocumentPreviewPageProps) {
  const { id } = await params;
  const document = await getBusinessDocumentById(id);

  if (!document) {
    notFound();
  }

  const viewModel = document.viewModel;
  const showSalesSkuColumn = viewModel.preview.showSalesSkuColumn;

  return (
    <section className="document-preview-shell" dir="rtl">
      <div className="preview-toolbar">
        <Link className="button secondary" href={`/business-documents/${document.id}`}>
          חזרה לבדיקה פנימית
        </Link>
        <Link className="button secondary" href={`/business-documents/${document.id}/pdf`}>
          הורדת PDF
        </Link>
        <span>תצוגה מקדימה למסמך לקוח</span>
      </div>

      <article className="document-paper" aria-label="תצוגה מקדימה למסמך עסקי">
        <header className="document-preview-header">
          <div className="company-block">
            <div className="company-logo" aria-label="לוגו טל קומפרסורים">
              TAL
            </div>
            <div>
              <h1>טל קומפרסורים</h1>
              <p>שירות, חלפים ותחזוקת מדחסים</p>
            </div>
          </div>

          <div className="document-identity">
            <p>מסמך שירות</p>
            <h2>מסמך שירות</h2>
            <dl>
              <div>
                <dt>מספר מסמך</dt>
                <dd>{viewModel.header.documentId}</dd>
              </div>
              <div>
                <dt>תאריך</dt>
                <dd>{viewModel.header.issueDate}</dd>
              </div>
            </dl>
          </div>
        </header>

        <section className="document-preview-meta">
          <div className="preview-party-block">
            <h3>לכבוד</h3>
            <p>{viewModel.parties.primaryParty.name}</p>
            <dl>
              <div>
                <dt>מספר לקוח</dt>
                <dd>{viewModel.parties.primaryParty.id || "לא נרשם"}</dd>
              </div>
              <div>
                <dt>מספר קריאת שירות</dt>
                <dd>{viewModel.source.reference}</dd>
              </div>
            </dl>
          </div>

          <div className="preview-date-block">
            <dl>
              <div>
                <dt>תאריך מסמך</dt>
                <dd>{viewModel.header.issueDate}</dd>
              </div>
              <div>
                <dt>תאריך לתשלום</dt>
                <dd>לא צוין</dd>
              </div>
              <div>
                <dt>מטבע</dt>
                <dd>{viewModel.header.currency}</dd>
              </div>
              <div>
                <dt>יתרה לתשלום</dt>
                <dd>{viewModel.totals.balanceDue}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="document-subject">
          <h2>פירוט שירות וחלפים</h2>
        </section>

        <section className="document-line-table" aria-label="פריטי מסמך עסקי">
          <table>
            <colgroup>
              <col className="item-index-column" />
              <col />
              {showSalesSkuColumn ? <col className="item-sku-column" /> : null}
              <col className="item-quantity-column" />
              <col className="item-money-column" />
              <col className="item-money-column" />
            </colgroup>
            <thead>
              <tr>
                <th>מספר</th>
                <th>תיאור</th>
                {showSalesSkuColumn ? <th>מק&quot;ט</th> : null}
                <th>כמות</th>
                <th>מחיר</th>
                <th>סה&quot;כ</th>
              </tr>
            </thead>
            <tbody>
              {viewModel.lines.map((item) => (
                <tr key={item.id}>
                  <td>{item.index}</td>
                  <td>
                    <strong>{toHebrewItemName(item.name)}</strong>
                  </td>
                  {showSalesSkuColumn ? (
                    <td>{item.salesSku}</td>
                  ) : null}
                  <td>{item.quantity}</td>
                  <td>{item.unitPrice}</td>
                  <td>{item.totalPrice}</td>
                </tr>
              ))}
              {!viewModel.lines.length ? (
                <tr>
                  <td colSpan={showSalesSkuColumn ? 6 : 5}>לא נרשמו פריטים.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </section>

        <section className="document-totals-section">
          <div className="document-notes">
            <h3>הערות</h3>
            <p>תודה שבחרתם בטל קומפרסורים.</p>
            <p>המחירים מוצגים בשקלים חדשים וכוללים מע&quot;מ כמפורט.</p>
          </div>

          <dl className="document-totals-box">
            <div>
              <dt>סה&quot;כ</dt>
              <dd>{viewModel.totals.documentSubtotal}</dd>
            </div>
            <div>
              <dt>{formatHebrewTaxLabel(viewModel.tax)}</dt>
              <dd>{viewModel.totals.vatAmount}</dd>
            </div>
            <div className="strong-total">
              <dt>סה&quot;כ לתשלום</dt>
              <dd>{viewModel.totals.totalAmount}</dd>
            </div>
            <div>
              <dt>שולם</dt>
              <dd>{viewModel.totals.paymentAmount}</dd>
            </div>
            <div>
              <dt>יתרה לתשלום</dt>
              <dd>{viewModel.totals.balanceDue}</dd>
            </div>
          </dl>
        </section>

        <footer className="document-preview-footer">
          <div>
            <strong>חתימה</strong>
            <span>________________________</span>
          </div>
          <div>
            <strong>טל קומפרסורים</strong>
            <span>שירות מדחסים מקצועי</span>
          </div>
        </footer>
      </article>
    </section>
  );
}
