@echo off
REM NoteNexus Azure Deployment Script for Windows
REM Make sure you have Azure CLI installed and logged in

echo 🚀 Starting NoteNexus deployment to Azure...

REM Variables - Update these with your preferred names
set RESOURCE_GROUP=notenexus-rg
set LOCATION=East US
set APP_SERVICE_PLAN=notenexus-plan
set BACKEND_APP_NAME=notenexus-backend

REM Check if logged in to Azure
echo 📋 Checking Azure login status...
az account show >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Please login to Azure first: az login
    exit /b 1
)

echo ✅ Azure login confirmed

REM Create resource group
echo 📦 Creating resource group: %RESOURCE_GROUP%
az group create --name %RESOURCE_GROUP% --location "%LOCATION%"

REM Create App Service Plan
echo 📋 Creating App Service Plan: %APP_SERVICE_PLAN%
az appservice plan create --name %APP_SERVICE_PLAN% --resource-group %RESOURCE_GROUP% --sku B1 --is-linux

REM Create Web App for the full application
echo 🌐 Creating Web App: %BACKEND_APP_NAME%
az webapp create --resource-group %RESOURCE_GROUP% --plan %APP_SERVICE_PLAN% --name %BACKEND_APP_NAME% --runtime "NODE|18-lts"

REM Build frontend
echo 🔨 Building frontend...
cd frontend
call npm install
call npm run build:prod
cd ..

REM Create deployment package (using PowerShell for zip)
echo 📦 Creating deployment package...
powershell -Command "Compress-Archive -Path .\* -DestinationPath .\deployment.zip -Force -Exclude node_modules, frontend\node_modules, .git, *.md"

REM Deploy to Azure
echo 🚀 Deploying to Azure...
az webapp deployment source config-zip --resource-group %RESOURCE_GROUP% --name %BACKEND_APP_NAME% --src deployment.zip

REM Configure app settings message
echo ⚙️  Please set these environment variables in Azure Portal:
echo MONGODB_URI=your_mongodb_connection_string
echo JWT_SECRET=your_jwt_secret_key
echo NODE_ENV=production
echo PORT=8000

REM Enable HTTPS only
echo 🔒 Enabling HTTPS only...
az webapp update --resource-group %RESOURCE_GROUP% --name %BACKEND_APP_NAME% --https-only true

REM Get app URL
for /f "delims=" %%i in ('az webapp show --resource-group %RESOURCE_GROUP% --name %BACKEND_APP_NAME% --query defaultHostName -o tsv') do set APP_URL=%%i

echo 🎉 Deployment completed!
echo 🌐 Your app URL: https://%APP_URL%
echo.
echo ⚠️  Don't forget to:
echo 1. Set environment variables in Azure Portal
echo 2. Update MongoDB Atlas to allow Azure IPs
echo 3. Test your application

REM Clean up
del deployment.zip

echo ✅ Deployment script completed!
pause