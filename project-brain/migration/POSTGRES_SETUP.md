# POSTGRES SETUP

Created: 2026-06-21  
Status: Ready for implementation approval  
Scope: Database environment plan  
Rule: Planning only. No database changes yet.

## Goal

Prepare the real PostgreSQL environment for the first Next.js migration slice:

- `Customer`
- `ServiceReport`
- `ReportEquipmentItem`

No Maven, AI, inventory, receipts, or production workflow writes are included in this setup.

---

# 1. Recommended Supabase Project Structure

Use Supabase as the hosted PostgreSQL provider.

Recommended projects:

| Environment | Supabase Project | Purpose | Access |
|---|---|---|---|
| Local | Local PostgreSQL or Supabase local dev | Developer testing | Developer only |
| Staging | `talcompressors-next-staging` | Test imports, schema changes, UI verification | Restricted team access |
| Production | `talcompressors-next-prod` | Real migrated app data | Strict owner/admin access |

## Project Rules

- Never point local development at production.
- Run first imports into local or staging only.
- Production receives schema/data only after manual approval.
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

## Local `.env.local`

Example:

```text
NEXT_PUBLIC_APP_ENV=local
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/talcompressors_next_dev?schema=public"
DIRECT_URL="postgresql://postgres:postgres@localhost:5432/talcompressors_next_dev?schema=public"
```

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

# 4. Local Development Strategy

Recommended local flow:

1. Install PostgreSQL locally or use Docker/Supabase local dev.
2. Create database:

```text
talcompressors_next_dev
```

3. Add `.env.local` with local `DATABASE_URL` and `DIRECT_URL`.
4. Run Prisma validation.
5. Generate Prisma client.
6. Push the minimal schema locally.
7. Import only the three Phase 1 tables into local database.
8. Run the Next.js app against local data.

## Local Data Rules

- Use approved read-only source exports or approved read-only live reads.
- Import only `Customers_Final`, `ServiceReports`, and `ReportEquipmentItems`.
- Store raw source rows in `rawSource`.
- Do not connect local app to production AppSheet, Maven, Apps Script, Gmail, or Drive write paths.

---

# 5. Production Strategy

Production should be introduced only after local and staging pass.

## Production Promotion Steps

1. Create Supabase production project.
2. Store production secrets outside git.
3. Confirm `schema.prisma` contains only approved models.
4. Apply schema using approved method.
5. Run a dry-run import report first.
6. Run production import only after approval.
7. Verify row counts and sample records.
8. Deploy Next.js with production `DATABASE_URL`.

## Production Access Rules

- Only server-side app code can use database credentials.
- Do not expose `DATABASE_URL` to the browser.
- Do not use Supabase service role key in client components.
- Keep first production module read-only.
- No production write workflows until explicitly approved.

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

1. Choose local PostgreSQL method.
2. Create `.env.local`.
3. Install Prisma packages.
4. Add `directUrl` to `schema.prisma`.
5. Validate Prisma schema.
6. Generate Prisma client.
7. Push schema to local database only.
8. Build read-only import for three Phase 1 source tables.

Stop here until implementation is explicitly approved.

