# POSTGRES SETUP

Created: 2026-06-21  
Status: Ready for implementation approval  
Scope: Database environment plan  
Rule: Planning only. No database changes yet.

## Goal

Prepare the Supabase staging-first PostgreSQL shadow environment for the first Next.js migration slice:

- `Customer`
- `ServiceReport`
- `ReportEquipmentItem`

No Maven, AI, inventory, receipts, import execution, schema push, migration, production cutover, or production workflow writes are included in this setup.

---

# 1. Recommended Supabase Project Structure

Use Supabase as the hosted PostgreSQL provider.

Approved architecture decision:

- Use Supabase Staging first.
- Use Supabase Production Shadow only after staging validation passes.
- Do not use local PostgreSQL as the first target.

Recommended projects:

| Environment | Supabase Project | Purpose | Access |
|---|---|---|---|
| Staging | `talcompressors-next-staging` | First shadow target for schema readiness, import validation, and UI verification | Restricted team access |
| Production Shadow | `talcompressors-next-prod` | Production shadow only after staging validation passes; no cutover | Strict owner/admin access |

## Project Rules

- Never point staging work at production shadow.
- Run first schema readiness and import validation against staging only after explicit approval.
- Production shadow receives schema/data only after staging validation and manual approval.
- No schema push, migration, import, production cutover, AppSheet/Sheets/Maven change, or production workflow write is approved by this plan.
- Supabase Row Level Security can stay disabled initially if the app uses only server-side access, but must be reviewed before exposing authenticated users.
- Keep service-role keys server-side only.

---

# 2. Environment Variables

## Required Variables

```text
DATABASE_URL=
DIRECT_URL=
NEXT_PUBLIC_APP_ENV=
```

## Optional Future Variables

```text
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Do not add optional Supabase API variables until the app actually uses Supabase client features.

## Staging `.env`

Example shape:

```text
NEXT_PUBLIC_APP_ENV=staging
DATABASE_URL="postgresql://postgres.[PROJECT_REF]:[PASSWORD]@[POOLER_HOST]:6543/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://postgres.[PROJECT_REF]:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres"
```

## Production `.env`

Example shape:

```text
NEXT_PUBLIC_APP_ENV=production
DATABASE_URL="postgresql://postgres.[PROJECT_REF]:[PASSWORD]@[POOLER_HOST]:6543/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://postgres.[PROJECT_REF]:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres"
```

---

# 3. Prisma Connection String Strategy

Use two connection strings:

| Variable | Used For | Strategy |
|---|---|---|
| `DATABASE_URL` | Prisma Client runtime queries | Use Supabase pooled connection in hosted environments. |
| `DIRECT_URL` | Prisma schema operations | Use direct database connection for `db push` or future migrations. |

Recommended Prisma datasource:

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

Current `schema.prisma` does not yet include `directUrl`. Add it during actual implementation before hosted schema operations.

## Command Safety

Allowed after approval:

```powershell
npx.cmd prisma validate --schema=prisma/schema.prisma
npx.cmd prisma generate --schema=prisma/schema.prisma
```

Local/staging only after approval:

```powershell
npx.cmd prisma db push --schema=prisma/schema.prisma
```

Not allowed yet:

```powershell
npx.cmd prisma migrate dev
npx.cmd prisma migrate deploy
```

Migrations should wait until the schema and import flow are stable.

---

# 4. Staging First Strategy

Approved staging-first flow:

1. Create Supabase staging project `talcompressors-next-staging` only after approval.
2. Store staging secrets outside git.
3. Configure required env variable names only: `DATABASE_URL`, `DIRECT_URL`, and `NEXT_PUBLIC_APP_ENV`.
4. Do not configure optional Supabase API env variables until Supabase client features require them.
5. Reconcile Prisma before any DB push:
   - add/use `DIRECT_URL` through `directUrl = env("DIRECT_URL")`
   - add nullable `ReportEquipmentItem.reportCounter` as display/search/audit metadata
6. Validate staging only after separate Prisma command approval.
7. Apply schema to staging only after separate DB push approval.
8. Run read-only staging import only after separate import approval.
9. Validate staging counts:
   - `Customers_Final` = 763
   - `ServiceReports` = 62
   - `ReportEquipmentItems` imports only rows linked to real `ServiceReports`
   - excluded orphan equipment rows are reported

## Staging Data Rules

- Use approved read-only source exports or approved read-only live reads.
- Import only after explicit read-only import approval.
- Store raw source rows in `rawSource`.
- Do not connect staging app to production AppSheet, Maven, Apps Script, Gmail, or Drive write paths.
- Do not execute imported `AutomationCommands`.

---

# 5. Production Strategy

Production shadow should be introduced only after staging validation passes.

## Production Promotion Steps

1. Create Supabase production shadow project `talcompressors-next-prod`.
2. Store production secrets outside git.
3. Confirm `schema.prisma` contains only approved models.
4. Apply schema using approved method only after staging validation and production shadow approval.
5. Run a dry-run import report first.
6. Run production import only after approval.
7. Verify row counts and sample records.
8. Deploy Next.js with production shadow `DATABASE_URL` only after explicit approval.

## Production Access Rules

- Only server-side app code can use database credentials.
- Do not expose `DATABASE_URL` to the browser.
- Do not use Supabase service role key in client components.
- Keep first production module read-only.
- No production cutover or production write workflows until explicitly approved.

---

# 6. Backup Strategy

## Supabase Managed Backups

Use Supabase automated backups for staging and production where available.

Production should have:

- automated daily backups
- point-in-time recovery if plan supports it
- manual backup before schema changes
- manual backup before production imports

## Manual Backup Before Imports

Before any production import:

1. Export current PostgreSQL database backup.
2. Save import source snapshot metadata.
3. Save row counts for source sheets.
4. Save import script version/commit hash when scripts exist.
5. Save post-import row count report.

## Restore Testing

Before production launch:

1. Restore a backup into staging.
2. Verify `Customer`, `ServiceReport`, and `ReportEquipmentItem` counts.
3. Open `/service-reports`.
4. Open several detail pages.
5. Confirm restored data is usable.

## Retention

Recommended minimum:

- Daily backups: 7-14 days
- Pre-import manual backups: keep indefinitely until migration is complete
- Pre-schema-change backups: keep indefinitely until schema is stable

---

# Implementation Readiness Checklist

Before actual implementation starts:

1. Approve Supabase staging project creation.
2. Create `talcompressors-next-staging`.
3. Store staging secrets outside git.
4. Configure required env variable names only: `DATABASE_URL`, `DIRECT_URL`, and `NEXT_PUBLIC_APP_ENV`.
5. Reconcile Prisma `DIRECT_URL`.
6. Reconcile `ReportEquipmentItem.reportCounter`.
7. Validate Prisma schema only after separate Prisma command approval.
8. Push schema to staging only after separate DB push approval.
9. Build and run read-only import only after separate import approval.

Stop here until implementation is explicitly approved.
