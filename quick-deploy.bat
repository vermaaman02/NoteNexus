@echo off
echo.
echo 🚀 NoteNexus Quick Deploy to Azure
echo ===================================
echo.
echo Current deployment options:
echo.
echo [1] Try Azure CLI deployment (if installed)
echo [2] Open Advanced Tools (Kudu) for ZIP upload
echo [3] Get FTP credentials for manual upload
echo [4] Download Azure CLI and deploy
echo.
set /p choice="Choose option (1-4): "

if "%choice%"=="1" (
    echo.
    echo 🔍 Checking Azure CLI...
    az --version >nul 2>&1
    if %errorlevel%==0 (
        echo ✅ Azure CLI found
        echo 🔐 Please login to Azure...
        az login
        if %errorlevel%==0 (
            echo 🚀 Deploying...
            az webapp deployment source config-zip --resource-group notenexus-rg --name notenexus-gqc6afa2abdgczgh --src emergency-deploy.zip
            if %errorlevel%==0 (
                echo.
                echo 🎉 Deployment successful!
                echo 🌐 Your app: https://notenexus-gqc6afa2abdgczgh.canadacentral-01.azurewebsites.net
            ) else (
                echo ❌ Deployment failed
            )
        )
    ) else (
        echo ❌ Azure CLI not found
        echo 💡 Choose option 4 to download and install Azure CLI
    )
) else if "%choice%"=="2" (
    echo.
    echo 🌐 Opening Advanced Tools (Kudu)...
    echo Look for "Tools" menu → "Zip Push Deploy"
    start https://notenexus-gqc6afa2abdgczgh.scm.canadacentral-01.azurewebsites.net
) else if "%choice%"=="3" (
    echo.
    echo 📁 Opening Azure Portal for FTP credentials...
    echo Go to: Deployment Center → FTPS Credentials
    start https://portal.azure.com/#@amity.edu/resource/subscriptions/YOUR_SUBSCRIPTION/resourceGroups/notenexus-rg/providers/Microsoft.Web/sites/notenexus-gqc6afa2abdgczgh/deploymentCenter
) else if "%choice%"=="4" (
    echo.
    echo 📥 Downloading Azure CLI...
    start https://aka.ms/installazurecliwindows
    echo After installation, restart this script and choose option 1
) else (
    echo Invalid choice
)

echo.
pause