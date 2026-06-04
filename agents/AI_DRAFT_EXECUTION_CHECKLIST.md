\# AI DRAFT EXECUTION CHECKLIST



\## Before Running



\* Read PROJECT\_BRAIN\_MASTER.md

\* Read LESSONS\_LEARNED.md

\* Read CURRENT\_BUGS.md

\* Read SYSTEM\_MAP.md

\* Read AI\_DRAFT\_FIELD\_MAPPING.md



\---



\## Data Validation



Must load:



\* ServiceReports

\* ReportEquipmentItems

\* PartsUsed

\* Customers\_Final

\* ProductsCatalog

\* InvoiceMavenDocuments

\* InvoiceMavenDocumentItems



If any table is unavailable:

Stop and report.



\---



\## Recommendation Validation



Verify:



\* Customer identified

\* Equipment identified

\* Service type identified

\* Labor calculated

\* Visit calculated

\* Parts identified

\* Historical pricing checked



\---



\## Approval Flags



Set NeedsPriceApproval when:



\* Missing catalog match

\* Missing historical match

\* AI estimated price

\* Conflicting pricing history



\---



\## Forbidden



\* No Maven creation

\* No Invoice creation

\* No Email sending

\* No Payment updates

\* No Status updates



\---



\## Success Definition



Produce one recommendation only.



Human approval required before next step.



