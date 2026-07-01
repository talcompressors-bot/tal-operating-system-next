# TAL INTELLIGENCE CORE

Status: Binding architecture document
Owner: Tal Intelligence Core / Project Brain
Scope: Tal Operating System business intelligence, AI recommendations, drafts, service analysis, inventory logic, customer history, pricing logic, and knowledge learning

## Purpose

Tal Intelligence Core is the single owning architecture for all business intelligence, AI recommendations, drafts, service analysis, inventory logic, customer history, pricing logic, and knowledge learning in the Tal Operating System.

Tal Intelligence Core is the central intelligence layer of the Tal Operating System. Every new feature, service, database model, automation, AI workflow, API, background job, and business process must integrate with one or more Tal Intelligence Core capabilities.

No feature should exist in isolation. If a new capability is required, propose it before implementation. Do not create parallel intelligence systems. Tal Intelligence Core is the single source of operational intelligence.

This document does not approve implementation of all capabilities now. It documents the architecture and connects future work to it.

## Mission

Manage, organize, improve, and utilize all Tal Compressors business knowledge to assist every business process.

The AI is not a document generator. The AI is the operational intelligence layer of the Tal Operating System. Its responsibility is to help the company make better operational decisions by continuously collecting, organizing, validating, correlating, and improving business knowledge.

Every action should improve one or more of these:

- Service quality
- Technical accuracy
- Customer experience
- Response time
- Inventory accuracy
- Pricing consistency
- Knowledge quality
- Operational efficiency

The primary objective is to continuously transform all business activity into structured organizational knowledge. Every service report, quotation, repair, customer interaction, technician correction, approved document, and inventory transaction should enrich the Business Knowledge Base and make the system progressively more accurate, autonomous, and valuable.

## Implementation Rule

Do not implement all capabilities immediately.

For every new feature:

1. Identify which Tal Intelligence Core capability owns it.
2. Reuse existing business knowledge before creating new logic.
3. Store newly validated knowledge in the Business Knowledge Base.
4. Keep all capabilities modular and independently testable.
5. Every capability must expose reusable services that other capabilities can consume.

## Capability Registry Rule

No capability owns business knowledge exclusively.

Tal Intelligence Core owns the Business Knowledge Base.

Capabilities only analyze and act on shared knowledge. They may create evidence, recommendations, actions, drafts, alerts, or review packets, but validated knowledge belongs back in the shared Business Knowledge Base so other capabilities can reuse it.

Capabilities must not create isolated knowledge stores, private recommendation logic, or parallel source-of-truth systems. If capability-specific indexes, caches, views, or projections are needed, they must declare:

- source knowledge used
- refresh or validation method
- owner capability
- consumer capabilities
- limits and confidence rules
- path for validated learning to return to the Business Knowledge Base

## Knowledge Governance

Business knowledge has authority levels. Higher levels override lower levels when evidence conflicts.

### Level 1 - Official Sources

Highest authority.

Includes:

- Official manufacturer catalogs
- Official Model Parts Catalog
- Approved business rules

SKU selection must come only from the Official Model Parts Catalog. Never invent, estimate, or infer an SKU outside the official catalog.

### Level 2 - Validated Human Expertise

High authority.

Includes:

- Validated technician decisions
- Management approvals
- Approved corrections
- Repeated approved human decisions

Technician and management approvals are higher-quality business evidence than historical assumptions or previous AI recommendations.

### Level 3 - Historical Business Evidence

Supporting evidence.

Includes:

- Service Reports
- Business Documents
- Maven historical data
- Customer History
- Equipment History
- Inventory history
- Products Catalog history
- Historical PDFs, Excel files, Word documents, images, and technical notes

Historical evidence may support pricing, repair patterns, previous repairs, service behavior, and customer preferences. It must not override official SKU sources or validated human decisions.

### Level 4 - AI Hypotheses

Lowest authority.

Includes:

- AI-generated recommendations
- AI-generated fault mappings
- AI-generated compatibility hypotheses
- AI-generated pricing or quantity assumptions
- AI-generated knowledge-gap proposals

AI hypotheses never become permanent knowledge without validation. They must stay traceable, reviewable, and clearly marked until approved by a qualified human or confirmed by an official source.

## Explainability Rule

Every recommendation, draft, quotation, business document, service analysis, inventory recommendation, customer-history conclusion, pricing recommendation, or learning proposal must show:

- business objective
- sources searched
- sources matched
- sources ignored
- why ignored sources were ignored
- matched evidence
- historical documents that influenced the result
- service reports that matched
- rejected alternatives
- why each rejected alternative was rejected
- final recommendation
- why the final recommendation was selected
- confidence score based on business evidence
- contradictory evidence
- data-quality gaps

No recommendation may become a black box. Every recommendation must be reproducible from the cited business evidence.

## Evidence And Search Rules

Before generating any recommendation, determine the business objective, then search all available relevant business knowledge.

Search priority:

1. Same customer
2. Same equipment, using exact serial number when available
3. Same equipment model
4. Same equipment series
5. Same fault or service type
6. Similar equipment models
7. Similar repairs across all customers
8. Most recent historical records first

Business knowledge sources include:

- structured Business Knowledge Base
- Service Reports
- Business Documents
- Maven historical data
- Customer History
- Equipment History
- Official Model Parts Catalog
- Inventory
- Products Catalog
- Compressor specifications
- Project knowledge base
- PDFs
- Excel files
- Word documents
- technical manuals
- images when relevant

The AI must not stop after the first match. It must continue until all available relevant business knowledge sources have been evaluated, then base the final recommendation on the best overall evidence.

If confidence is low, expand the search automatically across additional customers, equipment, models, series, historical documents, and service reports before returning a recommendation.

## Confidence Rule

Recommendation confidence is based on business evidence, not language-model certainty.

Confidence may increase only when multiple independent business sources agree. Exact matches, recent evidence, official sources, and validated human approvals increase confidence more than older or similar-only evidence.

Confidence must decrease when:

- evidence conflicts
- official catalog evidence is missing
- pricing history is stale
- customer or equipment identity is uncertain
- part compatibility is uncertain
- model names are inconsistent
- duplicate customers, equipment, or SKUs are detected
- only AI hypotheses support the recommendation

Low confidence does not end the search. Low confidence requires more search or a clear explanation of the remaining gap.

## Business Knowledge Gap Management

Business knowledge gaps must be detected automatically.

When information is missing, inconsistent, duplicated, or outdated, the AI must identify the gap and propose how to improve the Business Knowledge Base. Missing business information must not be silently ignored.

The AI should identify and propose improvements for:

- duplicate equipment
- duplicate customers
- duplicate SKUs
- inconsistent compressor model names
- missing model relationships
- missing supplier information
- missing inventory mappings
- obsolete business knowledge
- missing official SKU mappings
- missing pricing history
- conflicting customer preferences
- missing repair procedure links
- missing service-report-to-business-document links

The AI may propose improvements, but it must not modify official business data automatically without approval.

## Relationship Model

Tal Intelligence Core continuously strengthens relationships between business entities.

Required relationships include:

- Customer <-> Equipment
- Equipment <-> Compressor Model
- Model <-> Spare Parts
- Part <-> SKU
- SKU <-> Inventory
- Equipment <-> Failures
- Failure <-> Repair Procedure
- Repair <-> Business Document
- Customer <-> Pricing History
- Supplier <-> Parts
- Technician <-> Service Reports
- Customer <-> Preferences
- Equipment <-> Service History
- Model <-> Compatibility Rules
- Business Document <-> Approved Corrections

Each validated recommendation, correction, service result, quotation, document approval, or inventory event should strengthen these relationships.

## Learning Rule

Every approved correction becomes business knowledge.

Approved corrections should store, when available:

- corrected SKU
- corrected description
- corrected pricing
- corrected quantities
- corrected service logic
- corrected fault mapping
- corrected compatibility rule
- corrected customer preference
- corrected supplier preference
- corrected pricing rationale

Future recommendations must prioritize approved corrections over previous AI assumptions.

Every approved correction must be evaluated globally. If the same correction appears repeatedly across customers, the AI should propose updating the official Business Knowledge Base.

## Core Capabilities

### 1. Business Knowledge Engine

Build and maintain the Business Knowledge Base.

Responsibilities:

- Convert unstructured information into structured knowledge.
- Detect knowledge gaps.
- Propose knowledge improvements.
- Maintain source traceability.
- Rank evidence by governance level.
- Convert validated learning into reusable business knowledge.

### 2. Service Intelligence

Analyze every service report.

Responsibilities:

- Find similar repairs.
- Detect recurring failures.
- Suggest root causes.
- Recommend preventive maintenance.
- Compare technician notes against historical outcomes.
- Identify follow-up opportunities after service.

### 3. Technical Intelligence

Understand equipment, models, series, and technical compatibility.

Responsibilities:

- Identify equipment.
- Understand compressor models and series.
- Recommend official spare parts.
- Cross-check technical catalogs.
- Detect incompatible parts.
- Preserve model, series, controller, and compatibility constraints.

### 4. Customer Intelligence

Build and maintain complete customer profiles.

Responsibilities:

- Learn customer preferences.
- Identify purchasing patterns.
- Identify customers at risk.
- Recommend follow-up opportunities.
- Preserve customer-specific language, quote-before-repair, pricing, technician, and part-preference rules.

### 5. Inventory Intelligence

Optimize parts availability and inventory decisions.

Responsibilities:

- Predict shortages.
- Recommend purchasing.
- Detect dead stock.
- Find substitute parts.
- Optimize inventory.
- Connect SKU demand to service patterns and customer commitments.

Inventory Intelligence does not approve inventory mutation by itself. Inventory actions remain approval-gated where project rules require approval.

### 6. Commercial Intelligence

Support pricing, quotations, and commercial consistency.

Responsibilities:

- Analyze historical pricing.
- Detect pricing anomalies.
- Suggest quotations.
- Detect upsell opportunities.
- Recommend service contracts.
- Explain price differences.
- Prefer the customer's latest approved prices when available.

Commercial Intelligence must never invent prices. If price evidence is insufficient, it must report the gap and keep the recommendation review-required.

### 7. Operational Intelligence

Monitor business activity and detect operational risk.

Responsibilities:

- Detect missing actions.
- Detect delayed quotations.
- Detect unfinished workflows.
- Detect business risks.
- Identify customers requiring follow-up.
- Identify safety risks.
- Identify warranty opportunities.
- Identify energy optimization opportunities.

Operational Intelligence must surface proactive findings when business evidence indicates risk or opportunity.

### 8. Continuous Learning Engine

Turn daily business activity into structured organizational learning.

Every day the AI should ask:

- What did I learn today?
- What became more certain?
- What became less certain?
- What business knowledge should become permanent?
- What should be reviewed by management?

Responsibilities:

- Collect validated corrections.
- Detect repeated human decisions.
- Promote approved learning candidates for management review.
- Prevent AI hypotheses from becoming permanent knowledge without validation.
- Improve future recommendations by reusing approved learning.

### 9. Business Strategy Intelligence

Analyze the business from operational knowledge.

Responsibilities:

- Analyze reliability by customer, equipment, model, series, part, supplier, and technician.
- Analyze profitability by customer, service type, equipment family, recurring repair pattern, and document history.
- Analyze suppliers for quality, lead time, repeat usage, price movement, and opportunity.
- Detect recurring failures that justify preventive campaigns or model-specific service rules.
- Identify customers likely to need replacement, service, upgrades, dryers, preventive maintenance, or service contracts.
- Support inventory planning from historical failures, upcoming service intervals, and customer commitments.
- Identify business opportunities from reliability patterns, pricing history, service history, and customer behavior.

Business Strategy Intelligence must use Tal Intelligence Core evidence and must not create a separate strategy data store.

## Proactive Operational Intelligence

Tal Intelligence Core should not only answer requests. It should continuously monitor business data and proactively identify:

- customers requiring follow-up
- recurring failures
- preventive maintenance opportunities
- inventory shortages
- abnormal pricing
- missing knowledge
- inconsistent technical information
- supplier opportunities
- warranty opportunities
- energy optimization opportunities
- safety risks

Proactive findings must include evidence, confidence, business impact, recommended next action, and approval gate.

## Business Objective First

Before generating any recommendation, determine the business objective.

Examples:

- Restore compressor operation.
- Minimize customer downtime.
- Minimize unnecessary inventory usage.
- Reduce service visits.
- Maximize first-time repair success.
- Preserve customer history and consistency.
- Improve pricing consistency.
- Protect warranty or customer trust.
- Improve inventory planning.

Recommendations must optimize for business outcomes, not only technical correctness.

## Pricing Rules

Never invent prices.

Pricing recommendation priority:

1. Customer's latest approved prices.
2. Recent approved prices for the same equipment.
3. Recent approved prices for the same model.
4. Recent approved prices for the same series.
5. Recent approved prices for the same service type.
6. Similar repairs across customers.
7. Review-required price gap.

If price evidence differs, explain the price difference using source, date, customer, model, service type, quantity, supplier, and approval status where available.

## SKU Rules

SKU must come only from the Official Model Parts Catalog.

Rules:

- Never invent SKU.
- Never estimate SKU from historical documents.
- Never use historical invoice items as official SKU authority.
- If multiple official SKUs exist, rank them by compatibility.
- If no official SKU is found, mark SKU as missing and review-required.
- Historical documents may support usage patterns, pricing, prior repairs, and customer behavior, but not official SKU identity.

## Human Expertise Authority

Technician and management approvals become the highest-quality business evidence below official source material.

Repeated human decisions should outweigh historical assumptions and previous AI recommendations.

The AI learns from validated expertise, not from repetition alone. Repetition is a signal for review; validation is required before permanent knowledge changes.

## Data Quality Rule

Every recommendation should identify relevant data-quality gaps and propose improvements. Data-quality proposals should be specific, scoped, and approval-gated.

Examples:

- Merge duplicate customer records after human review.
- Add missing equipment serial to customer history.
- Normalize inconsistent model names.
- Add missing supplier-to-part mapping.
- Link a recurring failure to a repair procedure.
- Promote repeated approved correction into official Business Knowledge Base review.

## Boundary Rules

This architecture document does not approve:

- schema changes
- migrations
- DB writes/imports
- Google Sheets changes
- AppSheet changes
- Maven/Invoice4U execution
- Apps Script changes
- Drive writes
- email or customer-facing sends
- inventory mutations
- production deployment
- automatic official data modification
- implementation of all listed capabilities

All implementation must follow `PROJECT_OPERATING_PROTOCOL.md`, `PROJECT_INDEX.md`, and the active Project Brain approval gates.
