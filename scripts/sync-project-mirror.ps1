param(
  [string]$MirrorRoot
)

$ErrorActionPreference = "Stop"

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
Set-Location -LiteralPath $repoRoot

function Resolve-GoogleDriveRoot {
  param([string]$RequestedRoot)

  if ($RequestedRoot) {
    if (-not (Test-Path -LiteralPath $RequestedRoot)) {
      throw "Requested mirror root does not exist: $RequestedRoot"
    }
    return (Resolve-Path -LiteralPath $RequestedRoot).Path
  }

  $candidates = @(
    "G:\My Drive",
    "G:\Shared drives",
    "C:\Users\$env:USERNAME\Google Drive",
    "C:\Users\$env:USERNAME\My Drive",
    "C:\Users\$env:USERNAME\Google Drive\My Drive"
  )

  foreach ($candidate in $candidates) {
    if (Test-Path -LiteralPath $candidate) {
      return (Resolve-Path -LiteralPath $candidate).Path
    }
  }

  $drive = Get-PSDrive -Name "G" -PSProvider FileSystem -ErrorAction SilentlyContinue
  if ($drive -and $drive.Description -match "Google Drive") {
    $driveRoot = $drive.Root
    $preferredNames = @("My Drive")
    foreach ($name in $preferredNames) {
      $path = Join-Path $driveRoot $name
      if (Test-Path -LiteralPath $path) {
        return (Resolve-Path -LiteralPath $path).Path
      }
    }

    $firstDirectory = Get-ChildItem -LiteralPath $driveRoot -Force -Directory |
      Where-Object { $_.Name -notmatch '^\.' -and $_.Name -ne '$RECYCLE.BIN' } |
      Select-Object -First 1

    if ($firstDirectory) {
      return $firstDirectory.FullName
    }
  }

  throw "Google Drive Desktop path was not found."
}

function Ensure-Directory {
  param([string]$Path)
  if (-not (Test-Path -LiteralPath $Path)) {
    New-Item -ItemType Directory -Path $Path | Out-Null
  }
}

function Copy-FileIfExists {
  param(
    [string]$Source,
    [string]$DestinationDirectory
  )

  if (Test-Path -LiteralPath $Source -PathType Leaf) {
    Ensure-Directory $DestinationDirectory
    Copy-Item -LiteralPath $Source -Destination $DestinationDirectory -Force
  }
}

function Copy-DirectoryIfExists {
  param(
    [string]$Source,
    [string]$Destination
  )

  if (Test-Path -LiteralPath $Source -PathType Container) {
    Ensure-Directory (Split-Path -Parent $Destination)
    Copy-Item -LiteralPath $Source -Destination $Destination -Recurse -Force
  }
}

function Copy-SkillFiles {
  param([string]$DestinationRoot)

  $skillsRoot = Join-Path $repoRoot ".agents\skills"
  if (-not (Test-Path -LiteralPath $skillsRoot)) {
    return
  }

  Get-ChildItem -LiteralPath $skillsRoot -Recurse -Filter "SKILL.md" | ForEach-Object {
    $relative = $_.DirectoryName.Substring($skillsRoot.Length).TrimStart('\')
    $destination = Join-Path $DestinationRoot (Join-Path ".agents\skills" $relative)
    Ensure-Directory $destination
    Copy-Item -LiteralPath $_.FullName -Destination $destination -Force
  }
}

$driveRoot = Resolve-GoogleDriveRoot -RequestedRoot $MirrorRoot
$mirrorRootPath = Join-Path $driveRoot "Tal Operating System Sync"

$projectSources = Join-Path $mirrorRootPath "01_Project_Sources"
$projectBrain = Join-Path $mirrorRootPath "02_Project_Brain"
$agents = Join-Path $mirrorRootPath "03_Agents"
$evidence = Join-Path $mirrorRootPath "04_Evidence"
$generated = Join-Path $mirrorRootPath "05_Generated"

@($mirrorRootPath, $projectSources, $projectBrain, $agents, $evidence, $generated) | ForEach-Object {
  Ensure-Directory $_
}

Get-ChildItem -LiteralPath $repoRoot -Filter "PROJECT_SYNC*.md" -File | ForEach-Object {
  Copy-Item -LiteralPath $_.FullName -Destination $projectSources -Force
}

$rootGovernanceDocs = @(
  "START_CODEX.md",
  "PROJECT_INDEX.md",
  "PROJECT_OPERATING_PROTOCOL.md",
  "PROJECT_SOURCES.md",
  "PROJECT_MASTER_CONTEXT.md",
  "AI_RULES.md",
  "AGENTS.md"
)

foreach ($doc in $rootGovernanceDocs) {
  Copy-FileIfExists -Source (Join-Path $repoRoot $doc) -DestinationDirectory $projectSources
}

Copy-DirectoryIfExists -Source (Join-Path $repoRoot "project-brain") -Destination $projectBrain
Copy-DirectoryIfExists -Source (Join-Path $repoRoot "agents") -Destination $agents
Copy-SkillFiles -DestinationRoot $agents

$evidenceDocs = @(
  "Commercial_Intelligence_Source_Audit.md",
  "Commercial_Intelligence_Verification.md",
  "Customer_Pricing_Intelligence_Discovery.md",
  "Equipment_Commercial_Link_Discovery.md",
  "SCR_PRICING_INTELLIGENCE_AUDIT.md",
  "SCR_SKU_TO_DOCUMENT_DRAFT_ANALYSIS.md",
  "AI_DRAFT_RECOMMENDATION_PREVIEW_5806.md",
  "AI_DRAFT_EVIDENCE_PACKET.md",
  "SCR_MATCHING_PREVIEW.md",
  "PM_EPM_SPARE_PARTS_SOURCE_OF_TRUTH_REPORT.md"
)

foreach ($doc in $evidenceDocs) {
  Copy-FileIfExists -Source (Join-Path $repoRoot $doc) -DestinationDirectory $evidence
}

$generatedDocs = @(
  "NEXT_PHASE_STATUS.md",
  "ROOT_CAUSE_SUMMARY.md"
)

foreach ($doc in $generatedDocs) {
  Copy-FileIfExists -Source (Join-Path $repoRoot $doc) -DestinationDirectory $generated
}

$referenceAsset = Join-Path $repoRoot "project-brain\reference\maven-samples\document_102488.pdf"
Copy-FileIfExists -Source $referenceAsset -DestinationDirectory (Join-Path $generated "reference\maven-samples")

[pscustomobject]@{
  DriveRoot = $driveRoot
  MirrorRoot = $mirrorRootPath
  ProjectSources = $projectSources
  ProjectBrain = $projectBrain
  Agents = $agents
  Evidence = $evidence
  Generated = $generated
}
