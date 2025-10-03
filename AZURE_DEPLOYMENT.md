# Azure Deployment Guide for NoteNexus

## Prerequisites
- Azure account with active subscription
- Azure CLI installed on your machine
- Both backend and frontend ready for deployment

## Deployment Strategy
We'll deploy the backend and frontend as separate Azure Web Apps for better scalability and management.

## Backend Deployment (Azure Web App for Node.js)

### 1. Create Azure Web App for Backend
```bash
# Login to Azure
az login

# Create resource group
az group create --name notenexus-rg --location "East US"

# Create App Service Plan
az appservice plan create --name notenexus-plan --resource-group notenexus-rg --sku B1 --is-linux

# Create Web App for backend
az webapp create --resource-group notenexus-rg --plan notenexus-plan --name notenexus-backend --runtime "NODE|18-lts"
```

### 2. Configure Backend Environment Variables
```bash
az webapp config appsettings set --resource-group notenexus-rg --name notenexus-backend --settings \
  MONGODB_URI="your_mongodb_connection_string" \
  JWT_SECRET="your_jwt_secret_key" \
  NODE_ENV="production" \
  PORT="8000"
```

### 3. Deploy Backend Code
```bash
# From your project root
cd backend
zip -r ../backend.zip .
az webapp deployment source config-zip --resource-group notenexus-rg --name notenexus-backend --src ../backend.zip
```

## Frontend Deployment (Azure Static Web Apps)

### 1. Build Frontend for Production
```bash
cd frontend
npm run build:prod
```

### 2. Create Azure Static Web App
```bash
# Create Static Web App
az staticwebapp create --name notenexus-frontend --resource-group notenexus-rg --source https://github.com/vermaaman02/NoteNexus --branch main --app-location "frontend" --output-location "build"
```

### 3. Configure Frontend Environment Variables
In Azure Portal → Static Web Apps → Configuration:
```
REACT_APP_API_URL=https://notenexus-backend.azurewebsites.net/api
REACT_APP_SERVER_URL=https://notenexus-backend.azurewebsites.net
```

## Alternative: Single Web App Deployment

If you prefer to deploy both as a single application:

### 1. Build Frontend
```bash
cd frontend
npm run build:prod
```

### 2. Configure Backend to Serve Frontend
Add this to your backend server.js:
```javascript
// Serve static files from React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Catch all handler for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});
```

### 3. Deploy as Single App
```bash
az webapp create --resource-group notenexus-rg --plan notenexus-plan --name notenexus-app --runtime "NODE|18-lts"
zip -r notenexus-app.zip . --exclude="node_modules/*" "--exclude=frontend/node_modules/*"
az webapp deployment source config-zip --resource-group notenexus-rg --name notenexus-app --src notenexus-app.zip
```

## Post-Deployment Configuration

### 1. Update CORS in Backend
Add your Azure domain to CORS origins in server.js:
```javascript
origin: [
  'https://notenexus-frontend.azurestaticapps.net',
  'https://notenexus-app.azurewebsites.net',
  // ... other origins
]
```

### 2. Configure Custom Domain (Optional)
```bash
az webapp config hostname add --webapp-name notenexus-backend --resource-group notenexus-rg --hostname yourdomain.com
```

### 3. Enable HTTPS Only
```bash
az webapp update --resource-group notenexus-rg --name notenexus-backend --https-only true
```

## Environment Variables Needed

### Backend (.env):
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/notenexus
JWT_SECRET=your_very_long_secure_jwt_secret_key
NODE_ENV=production
PORT=8000
```

### Frontend (.env.production):
```
REACT_APP_API_URL=https://notenexus-backend.azurewebsites.net/api
REACT_APP_SERVER_URL=https://notenexus-backend.azurewebsites.net
```

## Troubleshooting

### Common Issues:
1. **502 Bad Gateway**: Check app settings and logs
2. **CORS errors**: Verify frontend URL in backend CORS config
3. **Database connection**: Ensure MongoDB Atlas allows Azure IPs
4. **File uploads**: Configure storage for uploads (Azure Blob Storage recommended)

### Useful Commands:
```bash
# View logs
az webapp log tail --resource-group notenexus-rg --name notenexus-backend

# Restart app
az webapp restart --resource-group notenexus-rg --name notenexus-backend

# Check app status
az webapp show --resource-group notenexus-rg --name notenexus-backend --query state
```