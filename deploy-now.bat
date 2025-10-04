@echo off
echo.
echo 🚀 NoteNexus Instant Deployment Helper
echo =====================================
echo.
echo The GitHub deployment failed because the publish profile secret is missing.
echo.
echo 🎯 FASTEST SOLUTION - Manual Upload:
echo.
echo 1. Open Azure Portal: https://portal.azure.com
echo 2. Go to: App Services → notenexus-gqc6afa2abdgczgh
echo 3. Go to: Deployment Center → ZIP Deploy
echo 4. Upload: emergency-deploy.zip (available in this folder)
echo 5. Click Deploy and wait 2-3 minutes
echo.
echo 🌐 Your app will be live at:
echo https://notenexus-gqc6afa2abdgczgh.canadacentral-01.azurewebsites.net
echo.
echo 🔧 Don't forget to set environment variables in Azure Portal:
echo - Configuration → Application settings
echo - Add: MONGODB_URI, JWT_SECRET, NODE_ENV=production, PORT=8000
echo.
echo Press any key to open Azure Portal...
pause >nul
start https://portal.azure.com
echo.
echo ✅ Azure Portal opened! Follow the steps above.
pause