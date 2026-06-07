param(
  [string]$Command = "hello"
)

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
  Show-File "ACTIVE SESSION" ".\project-brain\checkpoints\ACTIVE_SESSION_STATE.md"
  Show-File "PROJECT INDEX" ".\PROJECT_INDEX.md"
  Show-File "PROJECT BRAIN MASTER" ".\project-brain\PROJECT_BRAIN_MASTER.md"
  Show-File "CURRENT BUGS" ".\project-brain\bugs\CURRENT_BUGS.md"
  Show-File "SYSTEM MAP" ".\project-brain\maps\SYSTEM_MAP.md"
  Show-File "LESSONS LEARNED" ".\project-brain\lessons\LESSONS_LEARNED.md"
}
else {
  Write-Host "Unknown command: $Command"
}