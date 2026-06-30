# PROJECT SYNC AUTHORITY

Purpose
(single authority matrix separating Agent from Authority)

## Core Rule
(how to separate worker roles from truth sources)

Agent
(the role/tool that performs work)
An agent executes, reviews, validates, advises, or records.

Authority
(the source allowed to define truth)
An authority is the canonical source for a class of facts.

Rule
(how to avoid confusion)
Do not treat an agent as truth unless it cites the authority source.

## Authority Matrix
(which source defines each category of truth)

Git
(authority for commits and repository history)
Defines latest commit hash, branch state, staged/uncommitted changes, diffs, pushed/unpushed status.

Project Brain
(authority for project state)
Defines current phase, current task, blockers, next task, decisions, project tree, completion model, active IDs when recorded.

Runtime Validation
(authority for whether behavior works)
Defines whether routes, previews, PDFs, recommendation functions, type checks, and generated outputs actually pass.

Database
(authority for persisted business data)
Defines persisted Customers, ServiceReports, BusinessDocuments, BusinessDocumentItems, AutomationCommands, side-effect counts, and imported rows.

Human Owner
(authority for business decisions)
Defines business priority, acceptance, pricing/business judgment, protected action approval, production/customer/external decisions.

Codex
(executor and evidence reporter)
Defines what commands it ran, what files it changed, and what validation evidence it observed; does not automatically define business truth.

ChatGPT
(advisor and synthesis tool)
Defines recommendations or reasoning from uploaded sources; does not override Git, Project Brain, runtime validation, database, or human owner.

Project Source Sync Files
(compact Project Sources layer)
Summarize current state for ChatGPT; they are not deeper authority than Project Brain.

## Information Ownership
(which authority owns each information type)

Current Project State
(phase, wave, current task, next task)
Authority: Project Brain.

Commit Hashes
(latest commit, implementation commit, closeout commit)
Authority: Git, recorded into Project Brain during closeout.

Completion Percentage
(evidence-based project progress)
Authority: Project Brain completion model.

Task Priority
(what should happen next)
Authority: Human owner and Project Brain task board.

Runtime Behavior
(whether the app/recommendation/route works)
Authority: Runtime validation evidence.

Persisted Business Rows
(actual data in Supabase/PostgreSQL)
Authority: Database readback.

Business Acceptance
(whether a draft is good enough for TAL)
Authority: Human owner.

External Action Permission
(Maven, Invoice4U, email, production, inventory)
Authority: Human owner explicit approval.

Agent Inventory
(which agents exist and their status)
Authority: `agents/AGENT_REGISTRY.md`.

Skill Behavior
(how startup/closeout/AI draft skills operate)
Authority: `.agents/skills/*/SKILL.md`.

Schema Shape
(Prisma models, enums, relationships)
Authority: `prisma/schema.prisma`; changes require explicit approval.

Legacy Production Workflow
(AppSheet, Apps Script, Google Sheets, Maven current production)
Authority: Project Brain maps plus live source/system evidence.

## Update Permissions
(which worker may update which information after authority is checked)

Codex
(who may edit files)
May update files only inside approved/AUTO_ALLOWED scope and must validate/report evidence.

Project Brain Agent
(who may update project state)
May update Project Brain after completed safe work or approved state changes.

Git Agent
(who may commit)
May commit scoped approved/AUTO_ALLOWED changes after diff review and validation.

QA / Reviewer
(who may verify)
May validate and review; they do not approve protected actions.

Human Owner
(who may approve)
May approve protected actions, priorities, business acceptance, and production/external decisions.
