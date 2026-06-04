# AI DRAFT SESSION CLOSE

## Purpose

Close every AI Draft test session properly.

## Required Summary

- Which ReportID was tested
- What customer was identified
- What equipment was identified
- What items were suggested
- Which prices came from fixed rules
- Which prices came from history
- Which prices need approval

## Update Project Brain

After each test, update:

- project-brain/checkpoints/
- project-brain/lessons/LESSONS_LEARNED.md
- project-brain/bugs/CURRENT_BUGS.md if a new issue was found
- project-brain/roadmap/ROADMAP.md if priorities changed

## Git Rule

Before commit:

1. git status
2. review changed files
3. commit with clear message
4. push after approval

## Forbidden

- Do not create Maven document during test
- Do not send customer email
- Do not update payment status
- Do not deploy
