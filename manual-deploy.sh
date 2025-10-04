#!/bin/bash

# Simple Azure Deployment for NoteNexus
echo "🚀 Building and deploying NoteNexus to Azure..."

# Build frontend
echo "🔨 Building frontend..."
cd frontend
npm install
CI=false DISABLE_ESLINT_PLUGIN=true npm run build:prod
cd ..

# Prepare deployment
echo "📦 Preparing deployment package..."
mkdir -p backend/public
cp -r frontend/build/* backend/public/

# Create zip file
cd backend
zip -r ../notenexus-deployment.zip . -x "node_modules/*" ".env"
cd ..

echo "✅ Deployment package created: notenexus-deployment.zip"
echo ""
echo "📋 Next steps:"
echo "1. Go to Azure Portal → App Services → Your App"
echo "2. Go to Deployment Center"
echo "3. Upload notenexus-deployment.zip"
echo "4. Set environment variables in Configuration"
echo ""
echo "Environment variables needed:"
echo "- MONGODB_URI=your_mongodb_connection_string"
echo "- JWT_SECRET=your_jwt_secret_key" 
echo "- NODE_ENV=production"
echo "- PORT=8000"