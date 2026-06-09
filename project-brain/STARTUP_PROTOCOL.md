# STARTUP PROTOCOL

## Purpose

This file defines the mandatory startup sequence for Codex.

Codex must follow this protocol before analyzing, modifying, or creating code.

---

## Step 1 - Load Project Brain

Read in the following order:

1. PROJECT_OPERATING_PROTOCOL.md
2. CURRENT_TASK.md
3. Latest checkpoint in checkpoints/
4. PROJECT_RULES.md
5. FLOWCHART.md
6. CHANGELOG.md
7. DECISION_LOG.md
8. SYSTEM_COMPONENTS.md
9. SYSTEM_HEALTH_RULES.md
10. TEST_SCENARIOS.md

---

## Step 2 - Git Status

Run:

git status

Review:

* modified files
* untracked files
* current branch

---

## Step 3 - Current State Summary

Summarize:

* current task
* active issue
* relevant IDs
* recent changes
* risks
* next step

Do not write code yet.

---

## Step 4 - Scope Validation

Explain:

* what area will be investigated
* what systems are affected
* what systems will NOT be modified

---

## Step 5 - Approval

Wait for Liad approval before:

* code changes
* deployments
* schema changes
* automation changes

---

## Rule

Never start coding immediately after opening the repository.

Understand first.
Modify second.
Test third.
Commit fourth.
Document fifth.
