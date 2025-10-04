@echo off
echo 🚀 Building and deploying NoteNexus to Azure...

REM Build frontend
echo 🔨 Building frontend...
cd frontend
call npm install
set CI=false
set DISABLE_ESLINT_PLUGIN=true
call npm run build:prod
cd ..

REM Prepare deployment
echo 📦 Preparing deployment package...
if not exist "backend\public" mkdir backend\public
xcopy "frontend\build\*" "backend\public\" /E /I /Y

REM Create zip file
cd backend
powershell -Command "Compress-Archive -Path .\* -DestinationPath ..\notenexus-deployment.zip -Force -Exclude node_modules, .env"
cd ..

echo ✅ Deployment package created: notenexus-deployment.zip
echo.
echo 📋 Next steps:
echo 1. Go to Azure Portal → App Services → Your App
echo 2. Go to Deployment Center
echo 3. Upload notenexus-deployment.zip
echo 4. Set environment variables in Configuration
echo.
echo Environment variables needed:
echo - MONGODB_URI=your_mongodb_connection_string
echo - JWT_SECRET=your_jwt_secret_key
echo - NODE_ENV=production
echo - PORT=8000

pause