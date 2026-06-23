import Link from "next/link";
import { getAutomationCommandList } from "./automation-command-adapter";

export const dynamic = "force-dynamic";

export default async function AutomationCommandsPage() {
  const commands = await getAutomationCommandList();

  return (
    <section className="page-shell">
      <div className="detail-header">
        <div>
          <p className="eyebrow">Automation Commands</p>
          <h1>Automation command shell</h1>
          <p className="lede">
            Read-only command queue shell for command status, target lifecycle,
            retry placeholders, and source-object traceability.
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
              <th>Command</th>
              <th>Status</th>
              <th>Type / action</th>
              <th>Source object</th>
              <th>External target</th>
              <th>Requested by</th>
              <th>Requested</th>
            </tr>
          </thead>
          <tbody>
            {commands.map((command) => (
              <tr key={command.id}>
                <td>
                  <Link href={`/automation-commands/${command.id}`}>
                    {command.title}
                  </Link>
                </td>
                <td>{command.status}</td>
                <td>{command.commandType}</td>
                <td>
                  {command.sourceObjectId ? (
                    <Link
                      href={`/business-documents/${command.sourceObjectId}`}
                    >
                      {command.sourceObjectLabel}
                    </Link>
                  ) : (
                    command.sourceObjectLabel
                  )}
                </td>
                <td>{command.externalTarget}</td>
                <td>{command.requestedBy}</td>
                <td>{command.requestedAt}</td>
              </tr>
            ))}
            {!commands.length ? (
              <tr>
                <td colSpan={7}>
                  No automation commands are available yet. This read-only shell
                  is ready for future command queue rows without executing any
                  Maven, Invoice4U, email, or database write action.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}
