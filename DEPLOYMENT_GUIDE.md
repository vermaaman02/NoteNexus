# 🚀 Quick Azure Deployment Guide for NoteNexus

## Step 1: Prerequisites ✅

1. **Install Azure CLI**: Download from [Azure CLI](https://docs.microsoft.com/cli/azure/install-azure-cli)
2. **Azure Account**: Make sure you have an active Azure subscription
3. **MongoDB Atlas**: Your database should be ready with connection string

## Step 2: Login to Azure 🔐

```bash
az login
```
This will open your browser to login to Azure.

## Step 3: Easy Deployment (Choose One Method)

### Method A: Automated Script (Recommended) 🤖

**For Windows (PowerShell):**
```powershell
.\deploy-azure.bat
```

**For Mac/Linux:**
```bash
chmod +x deploy-azure.sh
./deploy-azure.sh
```

### Method B: Manual Commands 💻

```bash
# 1. Create resource group
az group create --name notenexus-rg --location "East US"

# 2. Create App Service Plan
az appservice plan create --name notenexus-plan --resource-group notenexus-rg --sku B1 --is-linux

# 3. Create Web App
az webapp create --resource-group notenexus-rg --plan notenexus-plan --name notenexus-backend --runtime "NODE|18-lts"

# 4. Build frontend
cd frontend
npm install
npm run build:prod
cd ..

# 5. Create zip and deploy
# Windows PowerShell:
Compress-Archive -Path .\* -DestinationPath .\deployment.zip -Force
az webapp deployment source config-zip --resource-group notenexus-rg --name notenexus-backend --src deployment.zip

# Mac/Linux:
zip -r deployment.zip . -x "node_modules/*" "frontend/node_modules/*" ".git/*"
az webapp deployment source config-zip --resource-group notenexus-rg --name notenexus-backend --src deployment.zip
```

## Step 4: Configure Environment Variables 🔧

Go to Azure Portal → App Services → notenexus-backend → Configuration → Application settings

Add these variables:
```
MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/notenexus
JWT_SECRET = your_very_long_secure_jwt_secret_key
NODE_ENV = production
PORT = 8000
```

## Step 5: Update MongoDB Atlas 🗃️

In MongoDB Atlas:
1. Go to Network Access
2. Add IP Address: `0.0.0.0/0` (Allow access from anywhere)
3. Or add specific Azure datacenter IPs

## Step 6: Test Your Deployment 🧪

Your app will be available at:
```
https://notenexus-backend.azurewebsites.net
```

Test endpoints:
- Health check: `https://notenexus-backend.azurewebsites.net/api/health`
- Frontend: `https://notenexus-backend.azurewebsites.net`

## Step 7: Custom Domain (Optional) 🌐

```bash
# If you have a custom domain
az webapp config hostname add --webapp-name notenexus-backend --resource-group notenexus-rg --hostname yourdomain.com
```

## Troubleshooting 🔧

### View Logs:
```bash
az webapp log tail --resource-group notenexus-rg --name notenexus-backend
```

### Common Issues:
1. **502 Bad Gateway**: Check environment variables and logs
2. **Database connection error**: Verify MongoDB URI and network access
3. **Build failures**: Ensure Node.js version compatibility

### Useful Commands:
```bash
# Restart app
az webapp restart --resource-group notenexus-rg --name notenexus-backend

# View app info
az webapp show --resource-group notenexus-rg --name notenexus-backend

# Delete resources (if needed)
az group delete --name notenexus-rg --yes
```

## Expected Costs 💰

- **App Service Plan (B1)**: ~$13/month
- **Storage**: Minimal for code storage
- **Bandwidth**: Based on usage

## Post-Deployment Checklist ✅

- [ ] App loads successfully
- [ ] User registration works
- [ ] Login functionality works
- [ ] File upload works
- [ ] Database operations work
- [ ] Admin panel accessible
- [ ] All routes respond correctly

## Security Notes 🔒

- HTTPS is automatically enabled
- Environment variables are secure
- CORS is configured for your domain
- JWT tokens are properly secured

Your NoteNexus app is now live on Azure! 🎉