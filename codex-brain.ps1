param(
  [string]$Command = "hello"
)

$RepoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $RepoRoot
$OutputEncoding = [Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

function Show-File($Title, $Path) {
  Write-Host ""
  Write-Host "=== $Title ==="
  Write-Host ""

  if (Test-Path $Path) {
    Get-Content -Encoding UTF8 $Path
  } else {
    Write-Host "Missing file: $Path"
  }
}

if ($Command -eq "hello") {
  Show-File "START CODEX" ".\START_CODEX.md"
  Show-File "PROJECT INDEX" ".\PROJECT_INDEX.md"
  Show-File "ACTIVE SESSION" ".\project-brain\checkpoints\ACTIVE_SESSION_STATE.md"
  Show-File "CURRENT TASK" ".\project-brain\CURRENT_TASK.md"
Show-File "NEXT SESSION" ".\project-brain\checkpoints\NEXT_SESSION.md"
  Show-File "CURRENT BUGS" ".\project-brain\bugs\CURRENT_BUGS.md"
  Show-File "SYSTEM MAP" ".\project-brain\maps\SYSTEM_MAP.md"
  Show-File "LESSONS LEARNED" ".\project-brain\lessons\LESSONS_LEARNED.md"
}
elseif ($Command -eq "status") {

  Write-Host ""
  Write-Host "=== PROJECT STATUS ==="
  Write-Host ""

  $activeSession = Get-Content ".\project-brain\checkpoints\ACTIVE_SESSION_STATE.md"
$bugs = Get-Content ".\project-brain\bugs\CURRENT_BUGS.md"
$currentTask = Get-Content ".\project-brain\CURRENT_TASK.md"
 $focusIndex = $activeSession.IndexOf("## Current Focus")
$focus = $activeSession[$focusIndex + 2]

$objectiveIndex = $activeSession.IndexOf("## Current Objective")
$objective = $activeSession[$objectiveIndex + 2]
 Write-Host "Focus:"
Write-Host $focus
Write-Host ""

Write-Host "Objective:"
Write-Host $objective
Write-Host ""

Write-Host "Open Bugs:"
Write-Host ""

$bugs | Select-String "## Bug"

Write-Host ""

  Write-Host "Git Status:"
  git status --short
}
elseif ($Command -eq "bye") {

  Write-Host ""
  Write-Host "=== SESSION SUMMARY ==="
  Write-Host ""

  Write-Host "Current Task:"
  Get-Content ".\project-brain\CURRENT_TASK.md" |
    Select-String "ReportCounter|Active Task"

  Write-Host ""
  Write-Host "Open Bugs:"
  Get-Content ".\project-brain\bugs\CURRENT_BUGS.md" |
    Select-String "## Bug"

  Write-Host ""
  Write-Host "Git Status:"
  git status --short

  Write-Host ""
  Write-Host "Suggested Commit:"
  Write-Host "Update Project Brain session state"
}
elseif ($Command -eq "dashboard") {

  Write-Host ""
  Write-Host "=== PROJECT DASHBOARD ==="
  Write-Host ""

  $activeSession = Get-Content ".\project-brain\checkpoints\ACTIVE_SESSION_STATE.md"
  $currentTask = Get-Content ".\project-brain\CURRENT_TASK.md"
  $bugs = Get-Content ".\project-brain\bugs\CURRENT_BUGS.md"

  $focusIndex = $activeSession.IndexOf("## Current Focus")
  $focus = $activeSession[$focusIndex + 2]

  Write-Host "Focus:"
  Write-Host $focus
  Write-Host ""

  Write-Host "Current Report:"
  ($currentTask | Select-String "ReportCounter")
  Write-Host ""

  Write-Host "Open Bugs:"
  ($bugs | Select-String "## Bug")
  Write-Host ""

  Write-Host "Git Status:"
  git status --short
}
else {
  Write-Host "Unknown command: $Command"
}
