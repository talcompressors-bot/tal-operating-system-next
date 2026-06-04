# AI DRAFT AGENT TEST

## Test Goal

Validate AI Draft Agent without creating real Maven documents.

## Test Input

Use one existing ServiceReport.

## Expected Output

- Customer identified
- Equipment identified
- Service type identified
- Labor line calculated
- Visit line calculated
- Parts suggested
- Historical pricing checked
- NeedsPriceApproval marked when needed

## Forbidden During Test

- Do not create Maven document
- Do not send email
- Do not change payment status
- Do not deploy

## Success Criteria

AI produces one draft recommendation only.
User reviews and approves before any automation continues.
