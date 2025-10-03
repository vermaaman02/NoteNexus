#!/bin/bash

# NoteNexus Azure Deployment Script
# Make sure you have Azure CLI installed and logged in

echo "🚀 Starting NoteNexus deployment to Azure..."

# Variables - Update these with your preferred names
RESOURCE_GROUP="notenexus-rg"
LOCATION="East US"
APP_SERVICE_PLAN="notenexus-plan"
BACKEND_APP_NAME="notenexus-backend"
FRONTEND_APP_NAME="notenexus-frontend"

# Check if logged in to Azure
echo "📋 Checking Azure login status..."
az account show > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "❌ Please login to Azure first: az login"
    exit 1
fi

echo "✅ Azure login confirmed"

# Create resource group
echo "📦 Creating resource group: $RESOURCE_GROUP"
az group create --name $RESOURCE_GROUP --location "$LOCATION"

# Create App Service Plan
echo "📋 Creating App Service Plan: $APP_SERVICE_PLAN"
az appservice plan create --name $APP_SERVICE_PLAN --resource-group $RESOURCE_GROUP --sku B1 --is-linux

# Create Web App for the full application
echo "🌐 Creating Web App: $BACKEND_APP_NAME"
az webapp create --resource-group $RESOURCE_GROUP --plan $APP_SERVICE_PLAN --name $BACKEND_APP_NAME --runtime "NODE|18-lts"

# Build frontend
echo "🔨 Building frontend..."
cd frontend
npm install
npm run build:prod
cd ..

# Create deployment package
echo "📦 Creating deployment package..."
zip -r deployment.zip . -x "node_modules/*" "frontend/node_modules/*" ".git/*" "*.md" "deployment.zip"

# Deploy to Azure
echo "🚀 Deploying to Azure..."
az webapp deployment source config-zip --resource-group $RESOURCE_GROUP --name $BACKEND_APP_NAME --src deployment.zip

# Configure app settings
echo "⚙️  Configuring app settings..."
echo "Please set these environment variables in Azure Portal:"
echo "MONGODB_URI=your_mongodb_connection_string"
echo "JWT_SECRET=your_jwt_secret_key"
echo "NODE_ENV=production"
echo "PORT=8000"

# Enable HTTPS only
echo "🔒 Enabling HTTPS only..."
az webapp update --resource-group $RESOURCE_GROUP --name $BACKEND_APP_NAME --https-only true

# Get app URL
APP_URL=$(az webapp show --resource-group $RESOURCE_GROUP --name $BACKEND_APP_NAME --query defaultHostName -o tsv)

echo "🎉 Deployment completed!"
echo "🌐 Your app URL: https://$APP_URL"
echo ""
echo "⚠️  Don't forget to:"
echo "1. Set environment variables in Azure Portal"
echo "2. Update MongoDB Atlas to allow Azure IPs"
echo "3. Test your application"

# Clean up
rm deployment.zip

echo "✅ Deployment script completed!"