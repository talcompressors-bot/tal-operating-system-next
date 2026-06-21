# SNAPSHOT DATA SPEC

Created: 2026-06-21  
Phase: B.1 Snapshot Proof Of Concept  
Scope: Documentation only  
Rule: No code consumes snapshots yet.

## Goal

Define the local read-only snapshot format for replacing mock ServiceReports data later without connecting to Google Sheets, AppSheet, Maven, Prisma, or any production system.

The snapshot source scope is limited to:

- `Customers_Final`
- `ServiceReports`
- `ReportEquipmentItems`

---

# Expected JSON Structure

Recommended file shape for a future snapshot:

```json
{
  "metadata": {
    "snapshotName": "service-reports-snapshot",
    "createdAt": "2026-06-21T00:00:00.000Z",
    "source": "manual-read-only-export",
    "sourceSpreadsheet": "ServiceApp_FIX",
    "notes": "Static read-only development snapshot"
  },
  "customers": [],
  "serviceReports": [],
  "reportEquipmentItems": []
}
```

Recommended future filename:

```text
app/service-reports/snapshot/service-reports.snapshot.json
```

Do not add the JSON data file until a real read-only export is approved.

---

# Customers Snapshot Shape

Source sheet:

```text
Customers_Final
```

Required fields:

```json
{
  "CustomerID": "customer-source-id",
  "שם לקוח": "Customer display name"
}
```

Optional fields:

```json
{
  "איש קשר": "Contact name",
  "טלפון": "Primary phone",
  "אימייל": "Primary email",
  "כתובת / מתקן": "Address or facility",
  "ח.פ/ע.מ/ת.ז": "Business or tax ID",
  "פעיל": "Active flag"
}
```

Required for adapter:

| Snapshot Field | Adapter Use |
|---|---|
| `CustomerID` | Join to `ServiceReports.CustomerID` |
| `שם לקוח` | UI `customer` value |

---

# ServiceReports Snapshot Shape

Source sheet:

```text
ServiceReports
```

Required fields:

```json
{
  "ReportID": "report-source-id",
  "ReportCounter": "1048",
  "מספר דוח": "1048",
  "CustomerID": "customer-source-id",
  "שם לקוח": "Customer display name",
  "תאריך שירות": "2026-06-18",
  "טכנאי": "Technician name",
  "סטטוס דוח": "Signed",
  "תיאור השירות": "Service description",
  "המלצות ללקוח": "Recommendations"
}
```

Optional fields useful later:

```json
{
  "שעת שירות": "08:30",
  "סוג דוח": "Service report type",
  "סוג ציוד": "Equipment type",
  "סוג שירות": "Service type",
  "תיאור העבודה שבוצעה": "Work performed",
  "סיכום טכנאי": "Technician summary",
  "זמן עבודת טכנאי": "2.5",
  "SignedHtmlFileUrl": "https://example",
  "CustomerFolderId": "drive-folder-id",
  "ReportDriveFileId": "drive-file-id",
  "BusinessDraftCreated": "FALSE",
  "DraftDocumentType": "",
  "MavenDocumentCreated": "FALSE",
  "MavenSentToCustomer": "FALSE"
}
```

Required for adapter:

| Snapshot Field | Adapter Use |
|---|---|
| `ReportID` | Stable `id` and equipment join key |
| `ReportCounter` or `מספר דוח` | UI `reportNumber` |
| `CustomerID` | Join to customer snapshot |
| `שם לקוח` | Fallback UI `customer` value |
| `תאריך שירות` | UI `serviceDate` |
| `טכנאי` | UI `technician` |
| `סטטוס דוח` | UI `status` after normalization |
| `תיאור השירות` | UI `description` |
| `המלצות ללקוח` | UI `recommendations` |

---

# ReportEquipmentItems Snapshot Shape

Source sheet:

```text
ReportEquipmentItems
```

Required fields:

```json
{
  "ItemID": "equipment-row-source-id",
  "ReportID": "report-source-id",
  "מספר ציוד": "C-12",
  "סוג ציוד": "Screw Compressor",
  "דגם הציוד": "Atlas GA 37",
  "מס סידורי": "GA37-88421",
  "מצב מערכת": "Operational",
  "סיכום והמלצות טכנאי": "Technician notes"
}
```

Optional fields useful later:

```json
{
  "תת סוג ציוד": "Subtype",
  "מונה שעות נוכחי": "1200",
  "טיפול הבא": "Next service",
  "קטגוריית מדחס": "Compressor category",
  "תיאור השירות": "Equipment service description"
}
```

Required for adapter:

| Snapshot Field | Adapter Use |
|---|---|
| `ItemID` | Equipment row `id` |
| `ReportID` | Join to `ServiceReports.ReportID` |
| `מספר ציוד` | UI `equipmentNumber` |
| `סוג ציוד` | UI `type` |
| `דגם הציוד` | UI `model` |
| `מס סידורי` | UI `serialNumber` |
| `מצב מערכת` | UI `status` |
| `סיכום והמלצות טכנאי` | UI `notes` |

---

# Adapter Mapping: Snapshot To UI Model

## Current UI List Model

```ts
type ServiceReportListItem = {
  id: string;
  reportNumber: string;
  customer: string;
  serviceDate: string;
  technician: string;
  status: "Open" | "Signed" | "Sent" | "Closed" | "UNKNOWN";
};
```

Mapping:

| UI Field | Snapshot Source |
|---|---|
| `id` | `ServiceReports.ReportID` |
| `reportNumber` | `ServiceReports.ReportCounter` fallback `ServiceReports.מספר דוח` fallback `ServiceReports.ReportID` |
| `customer` | `Customers_Final.שם לקוח` via `CustomerID`, fallback `ServiceReports.שם לקוח`, fallback `UNKNOWN CUSTOMER` |
| `serviceDate` | normalized `ServiceReports.תאריך שירות` |
| `technician` | `ServiceReports.טכנאי`, fallback `UNKNOWN TECHNICIAN` |
| `status` | normalized `ServiceReports.סטטוס דוח` |

## Current UI Detail Model

```ts
type ServiceReportDetail = ServiceReportListItem & {
  description: string;
  recommendations: string;
  equipment: EquipmentRow[];
};
```

Mapping:

| UI Field | Snapshot Source |
|---|---|
| `description` | `ServiceReports.תיאור השירות`, fallback empty string |
| `recommendations` | `ServiceReports.המלצות ללקוח`, fallback `ServiceReports.סיכום טכנאי`, fallback empty string |
| `equipment` | all `ReportEquipmentItems` where `ReportID` equals `ServiceReports.ReportID` |

## Current UI Equipment Model

```ts
type EquipmentRow = {
  id: string;
  equipmentNumber: string;
  type: string;
  model: string;
  serialNumber: string;
  status: string;
  notes: string;
};
```

Mapping:

| UI Field | Snapshot Source |
|---|---|
| `id` | `ReportEquipmentItems.ItemID` |
| `equipmentNumber` | `ReportEquipmentItems.מספר ציוד`, fallback `UNKNOWN EQUIPMENT` |
| `type` | `ReportEquipmentItems.סוג ציוד`, fallback empty string |
| `model` | `ReportEquipmentItems.דגם הציוד`, fallback empty string |
| `serialNumber` | `ReportEquipmentItems.מס סידורי`, fallback empty string |
| `status` | `ReportEquipmentItems.מצב מערכת`, fallback `UNKNOWN` |
| `notes` | `ReportEquipmentItems.סיכום והמלצות טכנאי`, fallback `ReportEquipmentItems.תיאור השירות`, fallback empty string |

---

# Normalization Rules

## General

- Trim all string values.
- Convert blank strings to empty display strings or fallback labels.
- Do not mutate snapshot source objects.
- Preserve source row shape in snapshot; normalize only in adapter output.
- Unknown source fields must not block rendering.

## IDs

- `ServiceReports.ReportID` is the canonical report source ID.
- `Customers_Final.CustomerID` is the canonical customer source ID.
- `ReportEquipmentItems.ItemID` is the canonical equipment row source ID.
- `ReportEquipmentItems.ReportID` must match `ServiceReports.ReportID` exactly after trimming.
- Do not join equipment by `ReportCounter` or `מספר דוח`.

## Dates

- Prefer ISO-like `YYYY-MM-DD` for snapshot values where possible.
- If source date is a Google Sheets serial or localized text, normalize to display-safe string in adapter.
- If date cannot be parsed, display original trimmed value.

## Status

Allowed UI statuses:

```text
Open
Signed
Sent
Closed
UNKNOWN
```

Rules:

- Known source status values map to one of the allowed UI statuses.
- Unmapped values become `UNKNOWN`.
- Do not discard the original value in future adapter debug metadata.

## Missing Relations

If report customer is missing:

- show `UNKNOWN CUSTOMER`
- keep the report visible

If equipment parent report is missing:

- do not attach the equipment row to any unrelated report
- future adapter should report orphan count

---

# Required Fields Summary

Minimum viable snapshot must include:

## `customers`

- `CustomerID`
- `שם לקוח`

## `serviceReports`

- `ReportID`
- `CustomerID`
- `ReportCounter` or `מספר דוח`
- `תאריך שירות`
- `טכנאי`
- `סטטוס דוח`
- `תיאור השירות`
- `המלצות ללקוח`

## `reportEquipmentItems`

- `ItemID`
- `ReportID`
- `מספר ציוד`
- `סוג ציוד`
- `דגם הציוד`
- `מס סידורי`
- `מצב מערכת`
- `סיכום והמלצות טכנאי`

---

# Phase B.1 Boundary

This phase creates only this specification.

Not included:

- no snapshot JSON data file
- no adapter code changes
- no UI code changes
- no Google Sheets connection
- no AppSheet connection
- no Apps Script change
- no Prisma
- no database
- no API routes

