Set-Location "$PSScriptRoot\..\logging_middleware"
npm run build

Set-Location "$PSScriptRoot\..\notification_app_be"
if (-not (Test-Path ".env")) {
  Copy-Item ".env.example" ".env"
  Write-Host "Created notification_app_be/.env — fill in your evaluation credentials."
}
npm install
npm run dev
