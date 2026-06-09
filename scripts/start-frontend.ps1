Set-Location "$PSScriptRoot\..\notification_app_fe"
if (-not (Test-Path ".env")) {
  Copy-Item ".env.example" ".env"
  Write-Host "Created notification_app_fe/.env — fill in your evaluation credentials."
}
npm install
npm run dev
