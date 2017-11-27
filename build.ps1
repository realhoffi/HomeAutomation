Write-Host -ForegroundColor DarkGreen "Build Application..."
webpack
Write-Host -ForegroundColor DarkGreen "Copy Files..."
Copy-Item -Path "build" -Destination "Z:\HomeAutomation" -Force -Recurse 
Write-Host -ForegroundColor DarkGreen "Finished Task"

