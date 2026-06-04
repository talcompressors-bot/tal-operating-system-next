# AI DRAFT FIELD MAPPING

## Goal

Map AppSheet service report data into AI business document recommendations.

---

## Source Tables

### ServiceReports

Used for:
- ReportID
- ReportCounter
- CustomerID
- CustomerName
- Service Date
- Technician
- Service Type
- Technician Work Time
- Summary / Notes

Maps to:
- BusinessDocuments.SourceReportId
- BusinessDocuments.SourceReportCounter
- BusinessDocuments.CustomerId
- BusinessDocuments.CustomerName
- BusinessDocuments.DocumentDescription
- BusinessDocuments.AIReasoning

---

### ReportEquipmentItems

Used for:
- Equipment type
- Equipment model
- Serial number
- Compressor category
- Service description
- Technician recommendations
- Next service info

Maps to:
- BusinessDocuments.AIReasoning
- BusinessDocumentItems.Description
- Historical matching context

---

### PartsUsed

Used for:
- Part name
- Quantity
- Part SKU
- Equipment reference

Maps to:
- BusinessDocumentItems.ItemName
- BusinessDocumentItems.Quantity
- BusinessDocumentItems.SourceType = PartsUsed

---

### ProductsCatalog

Used for:
- Direct item match
- SKU match
- Price list
- Aliases

Maps to:
- BusinessDocumentItems.ItemId
- BusinessDocumentItems.UnitPrice
- BusinessDocumentItems.NeedsPriceApproval

---

### InvoiceMavenDocuments

Used for:
- Previous customer documents
- Previous document type
- Historical pricing context

---

### InvoiceMavenDocumentItems

Used for:
- Historical item prices
- Similar service pricing
- Same equipment pricing

Maps to:
- BusinessDocumentItems.UnitPrice
- BusinessDocuments.AIReasoning

---

## Pricing Priority

1. ProductsCatalog direct match
2. Same equipment/model/service history
3. Same customer previous documents
4. Similar customers/services
5. AI suggested price

---

## Fixed Pricing

Technician labor:
275 NIS per hour

Technician visit:
300 NIS base visit

---

## Approval Flags

NeedsPriceApproval = true when:

- No ProductsCatalog match
- No reliable Maven history
- Price came from AI estimation
- Conflicting historical prices
- Missing quantity

---

## Forbidden

- Do not create Maven document here.
- Do not send to customer.
- Do not update payment status.
- Do not finalize invoice.
