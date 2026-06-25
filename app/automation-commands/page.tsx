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
            Read-only queue review for pending commands before any execution.
            This page does not run commands, call Maven/Invoice4U, send email,
            or affect inventory.
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
              <th>Service report</th>
              <th>External target</th>
              <th>Boundary</th>
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
                <td>
                  {command.sourceServiceReportId ? (
                    <Link
                      href={`/service-reports/${command.sourceServiceReportId}`}
                    >
                      {command.sourceServiceReportLabel}
                    </Link>
                  ) : (
                    command.sourceServiceReportLabel
                  )}
                </td>
                <td>{command.externalTarget}</td>
                <td>{command.executionBoundary}</td>
                <td>{command.requestedBy}</td>
                <td>{command.requestedAt}</td>
              </tr>
            ))}
            {!commands.length ? (
              <tr>
                <td colSpan={9}>
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
