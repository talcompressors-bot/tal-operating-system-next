# CUSTOMERS MODULE IMPLEMENTATION PLAN

Date: 2026-06-23

Scope: plan only. No app code changes, no commits, no database writes, no production actions.

## Context

The Customers module should be a read-first Next.js shadow module built from the existing Prisma `Customer` model and the current ServiceReports page pattern.

Current evidence:

- Existing Prisma model: `Customer`
- Existing relationships:
  - `Customer.serviceReports`
  - `Customer.aiDraftSuggestions`
  - `Customer.businessDocuments`
  - `Customer.mavenCustomers`
  - `Customer.mavenDocuments`
  - `Customer.mavenDocumentItems`
- Existing implemented page pattern:
  - `/service-reports`
  - `/service-reports/[id]`
  - `app/service-reports/service-report-adapter.ts`
- Existing AppSheet-to-Next maps already identify `/customers` as the customer master target route.
- Server Actions are the default pattern for future internal mutations, but this first module should stay read-only.

## 1. Customers List Page

Target route:

- `/customers`

Purpose:

- Show the imported customer master from PostgreSQL staging.
- Provide a fast operational index for finding customer records before navigating into service history.

Primary list columns:

- Customer name
- Contact name
- Primary phone
- Primary email
- Business ID
- Active status
- Service report count

Initial behavior:

- Read-only.
- Server component page, matching the current `/service-reports` pattern.
- Use Prisma read queries through a dedicated customer adapter.
- Order by customer name ascending, with stable fallback by `appsheetCustomerId`.
- Link each customer row to `/customers/[id]`, using `appsheetCustomerId` for human/source continuity unless implementation finds internal UUID routing safer.

Suggested query shape:

- `prisma.customer.findMany`
- Select only fields needed for list rendering.
- Include `_count.serviceReports`.
- Do not include future workflow relations in the first list query.

## 2. Customer Detail Page

Target route:

- `/customers/[id]`

Purpose:

- Show one customer profile and its linked service-report history.

Primary detail sections:

- Customer summary:
  - Name
  - Contact name
  - Primary phone
  - Primary email
  - Address
  - Business ID
  - Active status
  - AppSheet customer id
- Service report history:
  - Report number
  - Service date
  - Technician
  - Status
  - Link to `/service-reports/[id]`
- Future relationship placeholders:
  - Business Documents
  - AI Drafts
  - Maven Documents

Initial behavior:

- Read-only.
- Use `notFound()` when no customer matches the route id.
- Reuse ServiceReports mapping logic where possible for status/date display.
- Keep detail page dense and operational, not a marketing-style profile.

Suggested query shape:

- `prisma.customer.findUnique`
- Lookup by `appsheetCustomerId` if route id uses source id.
- Include `serviceReports` ordered by `reportCounter desc`, then `appsheetReportId asc`.
- Select minimal service report fields needed for the linked history table.

## 3. Search / Filter Fields

Initial list search fields:

- Customer name
- Contact name
- Primary phone
- Primary email
- Business ID
- AppSheet customer id

Initial filters:

- Active customers only / all customers
- Has service reports / all customers

Implementation approach:

- Start with query-string based filters, for example:
  - `/customers?q=...`
  - `/customers?active=true`
  - `/customers?hasReports=true`
- Keep filtering server-side through Prisma.
- Avoid client-only filtering for the full dataset so behavior stays reliable as data grows.

Prisma search approach:

- Use `contains` filters with case-insensitive mode where supported.
- Search across safe text fields:
  - `name`
  - `contactName`
  - `phonePrimary`
  - `emailPrimary`
  - `businessId`
  - `appsheetCustomerId`

Risk note:

- Phone/email columns may contain inconsistent legacy formatting. Search should be tolerant and avoid assuming normalized phone or email values.

## 4. Link Customer To Service Reports

Current relation:

- `Customer` -> `ServiceReport[]`

Required links:

- From `/customers`:
  - each customer row links to `/customers/[id]`
- From `/customers/[id]`:
  - service report rows link to `/service-reports/[appsheetReportId]`
- Future enhancement:
  - make customer names in `/service-reports` link back to `/customers/[appsheetCustomerId]` after the Customers module is implemented.

Data integrity expectations:

- Wave 1 import already loaded `customers = 763`.
- Wave 1 import already loaded `service_reports = 63`.
- Customer-service report links should be validated read-only before claiming the module is complete.

Validation target:

- Customer detail pages must show linked service reports for customers with service history.
- Customers with no service reports must render a clear empty state.

## 5. Future Links

These should be planned in the UI structure but not implemented as active write workflows in the first Customers module.

### BusinessDocuments

Future route candidates:

- `/customers/[id]/business-documents`
- `/business-documents?customerId=...`

Purpose:

- Show quotes, invoices, service documents, approval state, send state, and Maven draft links.

Current status:

- Wave 2 workflow layer is current but import is blocked until explicit approval.
- Do not build write/approval flows yet.

### AI Drafts

Future route candidates:

- `/customers/[id]/ai-drafts`
- `/ai-drafts?customerId=...`

Purpose:

- Show AI recommendations connected to a customer and service reports.

Current status:

- Read-only planning only until Wave 2 blockers are resolved and import/approval gates are passed.

### Maven Documents

Future route candidates:

- `/customers/[id]/maven-documents`
- `/maven/documents?customerId=...`

Purpose:

- Show Maven document history and pricing context for customer operations.

Current status:

- Wave 3 Maven Knowledge Layer is pending.
- Do not create Maven documents or sync Maven from this module.

## 6. Files To Create / Change

Implementation files to create:

- `app/customers/page.tsx`
- `app/customers/[id]/page.tsx`
- `app/customers/customer-adapter.ts`

Implementation files likely to change:

- `app/page.tsx`
  - Activate the Customers module card and link it to `/customers`.
- `app/globals.css`
  - Only if existing table/detail styles are insufficient.

Optional later refactor:

- Extract shared table/status/detail utilities from `app/service-reports/service-report-adapter.ts` only if duplication becomes meaningful.
- Do not refactor ServiceReports during the first Customers implementation unless required.

Files not to change for the first read-only module:

- `prisma/schema.prisma`
- `apps-script/*`
- Google Sheets / AppSheet / Maven sources
- env files

## 7. Validation Steps

Read-only database validation:

1. Confirm `customer.count()` returns expected staging count.
2. Confirm customers with and without service reports both exist or document if one category is absent.
3. Confirm selected customer relation counts:
   - service reports
   - future relation counts only if already imported and safe to query.

Route validation:

1. Start Next.js locally with staging env loaded.
2. Validate HTTP 200 for:
   - `/`
   - `/customers`
   - `/customers/[knownCustomerId]`
   - `/service-reports`
   - `/service-reports/acd1133d`
3. Validate 404 behavior for an unknown customer id.

UI validation:

1. Customers list renders a table with customer name, contact, phone, email, business id, active status, and service report count.
2. Customer detail renders profile fields and linked service reports.
3. Service report links navigate to existing `/service-reports/[id]` pages.
4. Empty states render cleanly for missing contact fields and no service reports.
5. Hebrew RTL layout remains intact.

Regression checks:

1. Existing `/service-reports` list still renders.
2. Existing `/service-reports/[id]` detail still renders.
3. No DB writes, imports, migrations, schema changes, AppSheet changes, Google Sheets writes, Maven actions, Apps Script changes, Drive/email actions, production deployment, or production cutover occurred.

## 8. Risks / Assumptions

Risks:

- Customer identity may be ambiguous later when Maven customer records are joined.
- Customer contact fields may contain legacy formatting or multiple values.
- Some customers may have no service reports, so the UI must handle empty history.
- Using `appsheetCustomerId` in route URLs preserves source continuity but exposes legacy ids in the URL.
- Using internal UUID route ids would be cleaner internally but less traceable to source data.
- Activating the Customers card on the home page changes visible navigation and should be validated visually.
- Future BusinessDocuments, AI Drafts, and Maven Documents links must stay read-only until their import and workflow gates are approved.

Assumptions:

- The existing `Customer` Prisma model is sufficient for the first read-only Customers module.
- No Prisma schema change is needed.
- Supabase staging contains the Wave 1 customer data.
- The first Customers implementation should follow the existing ServiceReports server-component and adapter pattern.
- Server Actions are reserved for future customer mutations, approvals, or workflow actions; no Server Action is needed for the first read-only list/detail module.

Recommended first implementation sequence:

1. Create `customer-adapter.ts` with typed read-only view models.
2. Create `/customers` list page.
3. Create `/customers/[id]` detail page with linked service reports.
4. Activate the Customers card on the home page.
5. Run read-only DB, route, and UI validation.

