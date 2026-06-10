# Deploy NexMind React build into Flask `frontend` static folder
# Run this from the workspace root (project-va)

param(
  [string]$ReactDir = "frontend-react",
  [string]$FrontendDir = "frontend",
  [switch]$BackupExisting
)

Set-StrictMode -Version Latest

Write-Host "1) Building React app..."
Push-Location $ReactDir
if (-Not (Test-Path "package.json")) { Write-Error "package.json not found in $ReactDir"; Pop-Location; exit 1 }
npm install
npm run build
if ($LASTEXITCODE -ne 0) { Write-Error "npm build failed"; Pop-Location; exit 1 }
Pop-Location

if ($BackupExisting) {
  $bak = "${FrontendDir}_backup_$(Get-Date -Format yyyyMMddHHmmss)"
  Write-Host "2) Backing up existing frontend to $bak"
  if (Test-Path $FrontendDir) { Rename-Item -Path $FrontendDir -NewName $bak }
}

Write-Host "3) Copying build output into $FrontendDir"
if (Test-Path "$ReactDir/dist") {
  # ensure destination exists
  if (-Not (Test-Path $FrontendDir)) { New-Item -ItemType Directory -Path $FrontendDir | Out-Null }
  Copy-Item -Path "$ReactDir/dist/*" -Destination $FrontendDir -Recurse -Force
  Write-Host "Copy completed."
} else {
  Write-Error "Build output not found at $ReactDir/dist"
  exit 1
}

Write-Host "4) Finished. Restart your Flask backend and open http://YOUR_PC_IP:5000"

# End of script
