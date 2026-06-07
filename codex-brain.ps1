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

  Write-Host "Project: ServiceApp_FIX"
  Write-Host ""

  Write-Host "Current Focus:"
  Write-Host "Project Brain Runtime"
  Write-Host ""

  Write-Host "Stable Systems:"
  Write-Host "- Queue Architecture"
  Write-Host "- BusinessDocuments Workflow"
  Write-Host "- Maven Draft Creation"
  Write-Host "- Service Report HTML Generation"
  Write-Host ""

  Write-Host "Open Bugs:"
  Write-Host "1. Drive Auto Save"
  Write-Host "2. Maven Sync"
  Write-Host ""

  Write-Host "Current Report:"
  Write-Host "5824"
  Write-Host ""

  Write-Host "Recommended Next Step:"
  Write-Host "Build intelligent bye workflow"
  Write-Host ""

  Write-Host "Git Status:"
  git status
}
elseif ($Command -eq "bye") {
  Show-File "END CODEX" ".\END_CODEX.md"
  Show-File "ACTIVE SESSION" ".\project-brain\checkpoints\ACTIVE_SESSION_STATE.md"
  git status
}
else {
  Write-Host "Unknown command: $Command"
}
