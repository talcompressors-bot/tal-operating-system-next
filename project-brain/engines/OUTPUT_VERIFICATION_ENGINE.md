# OUTPUT VERIFICATION ENGINE

## Purpose

Define mandatory final-output verification for bugs that can appear only in rendered UI, PDF, WebApp, or external artifact output.

This engine exists because of the Report 5840 incident. Code and raw data checks showed part of the truth, but the customer-visible `פתח דוח` WebApp output exposed a mismatch that AppSheet UI did not show in the same way.

## Core Rules

Data and code checks are not enough.

A bug is not resolved until the final user-visible output is verified.

If the user or customer consumes a rendered UI, PDF, WebApp page, Maven preview, or generated artifact, that final output is the verification target.

## ServiceReports Verification Flow

For ServiceReports bugs, verify each layer separately:

1. AppSheet UI
2. Google Sheet raw rows
3. WebApp `פתח דוח`
4. Neighboring reports

Required checks:

- Confirm what AppSheet UI displays for the target report.
- Confirm the raw `ServiceReports` row.
- Confirm the raw related rows, including `ReportEquipmentItems`.
- Open the WebApp `פתח דוח` output and verify rendered content.
- Compare the target report with the previous and next reports when possible.

## Maven Draft Verification Flow

For Maven draft bugs, verify each layer separately:

1. `BusinessDocuments`
2. Maven draft
3. PDF or preview output

Required checks:

- Confirm `BusinessDocuments` source values and status.
- Confirm related `BusinessDocumentItems`.
- Open the Maven draft or preview.
- Verify the final PDF or preview output matches the approved data.

## Automation Verification Flow

For automation bugs, verify each layer separately:

1. `AutomationCommands`
2. Status transitions
3. Final created artifact

Required checks:

- Confirm the command row and idempotency fields.
- Confirm expected status transitions.
- Confirm logs or status fields show the automation completed correctly.
- Open the final created artifact, such as a Drive file, Maven draft, PDF, or customer-visible report.

## Required Evidence Format

Every output verification must record:

- What was opened
- Expected result
- Actual result
- Pass/fail

Example:

```text
Opened: WebApp פתח דוח for ReportID=2b877f25
Expected: Report 5840 shows only corrected row 83 equipment
Actual: Rendered output shows corrected row 83 equipment and no report 5841 equipment
Result: Pass
```

## Regression Rule

Always test the target record plus the previous record and next record when possible.

For report `N`, verify:

- `N - 1`
- `N`
- `N + 1`

This catches index drift, row-neighbor contamination, copy/paste errors, and unsafe fallback matching.
