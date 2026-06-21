# TASK BOARD

Last updated: 2026-06-21
Mode: shutdown state, documentation only

## NOW

| Task | Goal | Test / Done | Approval Needed |
|---|---|---|---|
| Draft `POSTGRESQL_V1_SCOPE.md` | Define the full Tal Operating System PostgreSQL V1 boundary | Scope includes all major operating domains before Prisma work begins | No for documentation |
| Review full schema scope | Replace the rejected narrow Phase 1 Prisma subset with a complete V1 review | Open decisions and excluded/V2 areas are explicit | No for documentation |
| Preserve shadow-only safety rules | Keep Next.js separate from production AppSheet/Sheets | Docs clearly state no production writes or cutover | No |

## NEXT

| Task | Goal | Test / Done | Approval Needed |
|---|---|---|---|
| Map full Tal Operating System entities | Include service reports, customers, equipment, documents, automation, inventory, receipts/payments, users, logs, and governance | Entity list reviewed against migration docs and live source evidence | No for documentation |
| Decide PostgreSQL V1 included vs deferred scope | Avoid starting Prisma from an incomplete model set | Each domain marked V1, V1 read-only, V2, or excluded | No for documentation |
| Define snapshot adapter contract | Keep local JSON snapshot reads stable for shadow development | Adapter inputs, outputs, timestamp, and row-count checks documented | No |
| Document Hebrew RTL UI requirements | Preserve current Next.js UI direction | RTL, Hebrew labels, and status/source text preservation documented | No |

## DONE

| Task | Evidence |
|---|---|
| Next.js shadow app created | App exists as shadow/development implementation only |
| Hebrew RTL UI created | Next.js UI supports Hebrew RTL direction |
| ServiceReports list/detail created | Shadow app includes ServiceReports list and detail screens |
| Snapshot JSON adapter created | Adapter reads local snapshot JSON instead of production sources |
| Live read-only validation completed | `Customers_Final = 763`, `ServiceReports = 62`, `ReportEquipmentItems = 108` |
| GitHub push completed | Latest shadow-app/documentation work pushed |
| Production protected | AppSheet and Google Sheets untouched |
| Narrow Phase 1 Prisma subset rejected | Documented as too narrow for Tal Operating System V1 |

## BLOCKED / NOT STARTED

| Task | Blocker | Next Unblock Step |
|---|---|---|
| Prisma generation | Full PostgreSQL V1 scope not reviewed | Complete `POSTGRESQL_V1_SCOPE.md` first |
| Database setup/migration | Scope and schema not approved | Finish full schema review and receive approval |
| Production integration | Shadow app is not approved for production | Keep AppSheet/Sheets production until explicit cutover approval |
| Maven write flow | Not part of shutdown work | Requires separate design and approval |

## Rules

- Documentation only.
- No code.
- No Prisma.
- No database.
- No Google Sheets.
- No AppSheet.
- No Maven.
