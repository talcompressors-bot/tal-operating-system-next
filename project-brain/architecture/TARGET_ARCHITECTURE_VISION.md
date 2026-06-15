# TAL AI ENTERPRISE FACTORY - TARGET ARCHITECTURE VISION

## Purpose

This document defines the long-term target architecture for Tal Compressors AI Enterprise Factory. It is not a build-now plan. It is the future-state map used for comparison, gap analysis, roadmap planning, and safe prioritization.

## Core Principle

Current system must be compared against this vision before creating new tables, workflows, agents, or platforms.

Do not recommend creating new components if existing files, tables, agents, workflows, or registries can be reused or extended.

## Target Platform

- GitHub as source of truth
- Project Brain as project memory
- Claude Code / Codex as development and architecture workers
- CLI as execution channel
- MCP as connection layer
- Supabase as future data platform
- Next.js as future application UI
- n8n as workflow and agent orchestration
- Google Sheets / AppSheet / Apps Script as current legacy production layer until safely migrated

## Main Governance

- AI Chairman
- AI CEOs per company
- Department Agents
- Worker Agents
- Infrastructure Manager
- System Health Agent
- Output Verification Agent
- AppSheet Digital Twin / Legacy Digital Twin
- Safe Sandbox Testing
- Human Approval before Production

## Required Comparison Status Values

- EXISTS
- PARTIAL
- MISSING
- DUPLICATE
- EXISTS_UNDER_DIFFERENT_NAME
- NOT_NEEDED_NOW
- FUTURE_ONLY
- SHOULD_EXTEND_EXISTING
- SHOULD_NOT_CREATE_NEW

## Critical Rule

Do not recommend creating new components if existing files, tables, agents, workflows, or registries can be reused or extended.

## Immediate Priority Principle

Before building the future architecture, stabilize:

1. Source of Truth hierarchy
2. PROJECT_OPERATING_PROTOCOL.md
3. PROJECT_BRAIN_MASTER.md
4. CURRENT_TASK.md
5. LIVE_OBJECTS.md
6. SHEETS_REGISTRY.md
7. System Health
8. Infrastructure Manager
9. Digital Twin
10. Migration Blueprint

## Target Architecture Phases

### Phase 0 - Project Discovery & Recovery

Recover the current system state, identify production flows, map files, map data sources, and prevent further work from depending on chat memory or undocumented assumptions.

### Phase 1 - Project Brain Foundation

Establish Project Brain as durable project memory with clear source-of-truth hierarchy, current task state, live object tracking, decision history, lessons, bugs, maps, and checkpoints.

### Phase 2 - Validation Foundation

Create repeatable validation rules for source files, schemas, active IDs, workflow contracts, and project documentation before implementing new automation.

### Phase 3 - System Health Platform

Build read-only health checks for service reports, Drive files, Maven sync, queue status, schema drift, duplicate records, and automation failures.

### Phase 4 - Output Verification Platform

Verify generated outputs before user delivery, including service reports, business documents, emails, PDFs, recommendations, and future invoices.

### Phase 5 - AppSheet Digital Twin

Map the current AppSheet application into a digital twin covering tables, columns, actions, bots, slices, UX views, security filters, automations, and dependencies.

### Phase 6 - Migration Blueprint

Define a safe migration path from Google Sheets / AppSheet / Apps Script into the future platform without breaking production operations.

### Phase 7 - Supabase Foundation

Design and later implement the future relational data layer, including tenants, companies, customers, service reports, documents, inventory, finance, users, permissions, audit logs, and integrations.

### Phase 8 - Next.js Platform

Build the future application UI for operations, approvals, service reports, dashboards, customers, documents, workflows, and internal admin tools.

### Phase 9 - n8n Orchestration Layer

Use n8n for workflow orchestration, scheduled processes, integration routing, approval workflows, event handling, and agent coordination where appropriate.

### Phase 9.5 - AI Runtime Layer / CLI / MCP

Define runtime execution through CLI and MCP connectors so AI workers can inspect, compare, test, and operate approved workflows with explicit permissions.

### Phase 10 - Agent Platform

Create the structured agent layer for AI Chairman, company CEOs, department agents, worker agents, verification agents, health agents, and infrastructure agents.

### Phase 11 - Office Automation Factory

Automate routine office operations including documents, emails, reminders, scheduling, approvals, filing, customer follow-ups, and internal task routing.

### Phase 12 - Service Factory

Automate service report lifecycle, technician workflows, equipment history, recommendations, follow-up actions, customer communication, and service quality checks.

### Phase 13 - Finance Factory

Automate quotes, invoices, receipts, payments, expense documents, collections, tax document routing, financial approvals, and audit trails.

### Phase 14 - Sales Factory

Automate lead tracking, quote preparation, customer history analysis, opportunity follow-up, pricing recommendations, and sales pipeline visibility.

### Phase 15 - Marketing Factory

Automate customer segmentation, campaigns, content planning, service reminders, renewal messaging, and performance feedback loops.

### Phase 16 - Communication Factory

Unify communication across email, messaging, customer notifications, internal alerts, document delivery, and future omnichannel workflows.

### Phase 17 - Inventory & Procurement Factory

Automate parts catalog management, stock tracking, supplier orders, purchase recommendations, consumption forecasting, and service-linked inventory updates.

### Phase 18 - HR Factory

Support employee records, technician assignments, onboarding, training, schedules, performance indicators, and role-based access.

### Phase 19 - Customer Portal

Provide customers with access to service reports, quotes, invoices, approvals, equipment history, maintenance schedules, and support requests.

### Phase 20 - AI Governance Factory

Define approval policies, permissions, audit logs, agent boundaries, risk scoring, escalation rules, and safe production controls.

### Phase 21 - AI Chairman Factory

Create the strategic AI governance layer that reviews cross-company status, risks, performance, priorities, and decisions.

### Phase 22 - Self Evolving Enterprise

Enable controlled improvement loops where agents identify gaps, propose upgrades, validate impacts, and request approval before implementation.

### Phase 23 - Knowledge & Memory Factory

Build durable organizational memory across customers, equipment, decisions, documents, lessons, incidents, pricing, and workflows.

### Phase 24 - Data Governance Factory

Govern data models, ownership, schema changes, retention, privacy, access control, lineage, backups, and migration rules.

### Phase 25 - Document Factory

Generate, verify, store, retrieve, and route all business documents including service reports, quotes, invoices, purchase orders, summaries, contracts, and internal reports.

### Phase 26 - AI Training Factory

Create safe training and feedback loops using approved business data, examples, evaluations, human review, and versioned prompt/model behavior.

### Phase 27 - MCP Ecosystem Factory

Standardize MCP connectors for GitHub, Google, Supabase, n8n, filesystem, browser, business APIs, observability, and future external platforms.

### Phase 28 - Sandbox & Testing Factory

Provide safe test environments, test data, simulations, dry runs, regression checks, and approval gates before production writes.

### Phase 29 - Business Intelligence Factory

Create dashboards, metrics, forecasts, anomaly detection, performance reports, service profitability, customer health, and executive summaries.

### Phase 30 - AI Enterprise Command Center

Create a central command interface for system status, approvals, agents, workflows, incidents, metrics, and company-level operations.

### Phase 31 - Digital Twin Factory

Model current and future business systems as digital twins for AppSheet, Google Sheets, workflows, data models, automations, customers, equipment, and operations.

### Phase 32 - Enterprise Observability Factory

Track logs, traces, workflow outcomes, agent actions, schema changes, integration failures, business incidents, and health signals.

### Phase 33 - Autonomous Discovery Factory

Allow approved agents to discover undocumented files, schemas, workflows, patterns, risks, and improvement opportunities.

### Phase 34 - Revenue Optimization Factory

Analyze pricing, service history, conversion patterns, customer segments, follow-up timing, and revenue leakage to recommend improvements.

### Phase 35 - AI Office Workers Factory

Create AI worker roles for administrative operations, document handling, customer follow-up, finance preparation, scheduling, and internal coordination.

### Phase 36 - AI Technician Factory

Support technicians with equipment knowledge, troubleshooting, service history, recommended parts, checklists, report assistance, and safety guidance.

### Phase 37 - Company Operating System

Unify operational modules into a company operating system with data, workflows, agents, dashboards, approvals, documents, and governance.

### Phase 38 - AI Factory of Factories

Create reusable patterns, templates, agents, workflows, schemas, and deployment models that can generate new business factories safely.

### Phase 39 - Enterprise Architecture Factory

Maintain architecture maps, dependency graphs, source-of-truth rules, target-state comparisons, migration plans, and technical decision records.

### Phase 40 - Business Process Factory

Map, optimize, automate, and monitor business processes across departments with versioned workflows and approval gates.

### Phase 41 - Customer Success Factory

Track customer health, service quality, open issues, communication, follow-ups, satisfaction, retention, and proactive maintenance opportunities.

### Phase 42 - Partner Ecosystem Factory

Manage suppliers, contractors, service partners, integrations, procurement relationships, and partner performance.

### Phase 43 - Product Factory

Manage products, service packages, parts, pricing, bundles, compatibility, lifecycle, and future productized offerings.

### Phase 44 - Compressor Expert Factory

Build a domain expert layer for compressor models, maintenance intervals, parts, service types, failure patterns, and technician guidance.

### Phase 45 - Tal AI Master Brain

Create the master knowledge system that connects project memory, business memory, architecture, agents, workflows, data, and decisions.

### Phase 46 - Platform Factory

Develop reusable platform capabilities for tenants, authentication, permissions, integrations, configuration, deployment, observability, and admin.

### Phase 47 - Template Factory

Create reusable templates for documents, workflows, agents, tables, dashboards, prompts, tests, reports, and deployment patterns.

### Phase 48 - Enterprise Marketplace

Enable reusable modules, agents, templates, integrations, workflows, and business capabilities to be selected and deployed across companies.

### Phase 49 - AI Research Factory

Experiment with new models, prompts, evaluation methods, automation patterns, agent workflows, and business intelligence methods in a safe sandbox.

### Phase 50 - Autonomous Business Factory

Move toward approved autonomous business operations where agents can recommend, simulate, validate, and execute bounded tasks under governance.

### Phase 51 - Global Knowledge Graph

Connect companies, customers, equipment, documents, service events, products, workflows, decisions, and outcomes into a governed knowledge graph.

### Phase 52 - Digital Board of Directors

Create a strategic advisory layer with AI board roles for finance, operations, risk, sales, customers, technology, and governance.

### Phase 53 - Enterprise Simulator

Simulate business decisions, workflow changes, pricing strategies, staffing, inventory, service load, and migration impact before execution.

### Phase 54 - Tal AI Operating System

Unify all factories into a full AI operating system for business management, automation, governance, knowledge, execution, and continuous improvement.

## Comparison Method

Before proposing any new component, compare the current system against the target architecture using this format:

| Target Component | Current Asset | Status | Reuse / Extend Decision | Notes |
|---|---|---|---|---|
| Example component | Existing file/table/agent/workflow | PARTIAL | SHOULD_EXTEND_EXISTING | Explain gap and safe next step |

Allowed status values are only the values listed in this document.

## Build-Now Boundary

This document is a target vision, not permission to build all phases now. Immediate work must remain focused on stabilization, visibility, reuse of existing assets, and safe comparison against the current production system.
