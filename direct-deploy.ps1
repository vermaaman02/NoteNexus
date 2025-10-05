# PowerShell Direct Deploy Script
# This script deploys directly to Azure without needing the portal

Write-Host "🚀 NoteNexus Direct Azure Deployment" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Green
Write-Host ""

# Check if Azure CLI is installed
$azureCliInstalled = $false
try {
    $azVersion = az --version 2>$null
    if ($azVersion) {
        $azureCliInstalled = $true
        Write-Host "✅ Azure CLI found" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Azure CLI not found" -ForegroundColor Red
}

if ($azureCliInstalled) {
    Write-Host "🔐 Logging into Azure..." -ForegroundColor Yellow
    az login
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Azure login successful" -ForegroundColor Green
        Write-Host "🚀 Deploying emergency-deploy.zip..." -ForegroundColor Yellow
        
        az webapp deployment source config-zip --resource-group notenexus-rg --name notenexus-gqc6afa2abdgczgh --src emergency-deploy.zip
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "🎉 Deployment successful!" -ForegroundColor Green
            Write-Host "🌐 Your app is live at:" -ForegroundColor Cyan
            Write-Host "https://notenexus-gqc6afa2abdgczgh.canadacentral-01.azurewebsites.net" -ForegroundColor Cyan
        } else {
            Write-Host "❌ Deployment failed" -ForegroundColor Red
        }
    } else {
        Write-Host "❌ Azure login failed" -ForegroundColor Red
    }
} else {
    Write-Host "💡 Installing Azure CLI..." -ForegroundColor Yellow
    Write-Host "This will download and install Azure CLI for you." -ForegroundColor White
    
    $choice = Read-Host "Install Azure CLI? (y/n)"
    if ($choice -eq 'y' -or $choice -eq 'Y') {
        # Download and install Azure CLI
        Write-Host "📥 Downloading Azure CLI installer..." -ForegroundColor Yellow
        
        $url = "https://aka.ms/installazurecliwindows"
        $output = "$env:TEMP\AzureCLI.msi"
        
        try {
            Invoke-WebRequest -Uri $url -OutFile $output
            Write-Host "🔧 Installing Azure CLI..." -ForegroundColor Yellow
            Start-Process msiexec.exe -Wait -ArgumentList "/I $output /quiet"
            Write-Host "✅ Azure CLI installed!" -ForegroundColor Green
            Write-Host "🔄 Please restart PowerShell and run this script again." -ForegroundColor Yellow
        } catch {
            Write-Host "❌ Failed to install Azure CLI" -ForegroundColor Red
            Write-Host "Please install manually from: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli" -ForegroundColor Yellow
        }
    } else {
        Write-Host "📋 Manual deployment options:" -ForegroundColor Yellow
        Write-Host "1. Install Azure CLI manually: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli" -ForegroundColor White
        Write-Host "2. Use Azure Portal - App Service - Deployment Center" -ForegroundColor White
        Write-Host "3. Use FTP upload (see FIND_ZIP_DEPLOY.md for details)" -ForegroundColor White
    }
}

Write-Host ""
Write-Host "Press any key to continue..."
$host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") | Out-Null