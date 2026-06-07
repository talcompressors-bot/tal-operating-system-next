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
  Show-File "END CODEX" ".\END_CODEX.md"
  Show-File "ACTIVE SESSION" ".\project-brain\checkpoints\ACTIVE_SESSION_STATE.md"
  git status
}
else {
  Write-Host "Unknown command: $Command"
}
