# 🔍 How to Find ZIP Deploy in Azure Portal

## 📍 **Method 1: Through Deployment Center**

1. **Go to**: https://portal.azure.com
2. **Search**: Type "notenexus-gqc6afa2abdgczgh" in the search bar
3. **Click**: Your App Service
4. **Left Menu**: Look for "Deployment Center" (under Deployment section)
5. **Click**: "Deployment Center"
6. **In Deployment Center**: 
   - Click "Settings" tab (if not already selected)
   - Look for "Manual Deployment" or "Local Git/FTP" options
   - Click "Browse" or "Choose File" to upload ZIP

## 📍 **Method 2: Through Advanced Tools (Kudu)**

1. **In your App Service**: Look for "Advanced Tools" in left menu
2. **Click**: "Advanced Tools" → "Go"
3. **This opens Kudu**: New tab will open
4. **Top Menu**: Click "Tools" → "Zip Push Deploy"
5. **Drag and Drop**: Your `emergency-deploy.zip` file

## 📍 **Method 3: Through Development Tools**

1. **In App Service**: Look for "Console" or "SSH" in left menu
2. **Or look for**: "Development Tools" section
3. **Click**: "Advanced Tools" or "App Service Editor"

## 📍 **Method 4: Alternative Upload Methods**

### **A. Via FTP (Always Available)**
1. **App Service**: Go to "Deployment Center"
2. **Click**: "FTP" tab
3. **Get FTP credentials**: Copy FTP endpoint and credentials
4. **Use any FTP client**: Upload your files

### **B. Via Azure CLI (If you have it)**
```bash
az webapp deployment source config-zip --resource-group notenexus-rg --name notenexus-gqc6afa2abdgczgh --src emergency-deploy.zip
```

### **C. Via PowerShell (Direct)**
```powershell
# Install Azure PowerShell module first
Install-Module -Name Az -Force -AllowClobber
Connect-AzAccount
Publish-AzWebApp -ResourceGroupName "notenexus-rg" -Name "notenexus-gqc6afa2abdgczgh" -ArchivePath "emergency-deploy.zip"
```

## 🎯 **Visual Guide - What to Look For:**

In Azure Portal, look for these sections in your App Service:
- **Deployment** (section in left menu)
  - Deployment Center
  - Deployment slots
- **Development Tools** (section in left menu)
  - Advanced Tools (Kudu)
  - Console
  - App Service Editor

## 🔍 **Can't Find It? Try This:**

1. **In your App Service overview page**
2. **Look for a button**: "Browse" or "URL" at the top
3. **Or search**: Use Ctrl+F and search for "deploy" on the page

## 📞 **Screenshot Locations:**

Common places where "ZIP Deploy" appears:
- Deployment Center → Settings → Manual deployment
- Advanced Tools → Tools → Zip Push Deploy
- Development Tools → Console → Drag & Drop area

Would you like me to create a PowerShell script to deploy directly without using the portal?