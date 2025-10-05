# Vercel Frontend Deployment Configuration

## 🎯 **Vercel Settings for NoteNexus Frontend**

### **Repository Connection:**
- **GitHub Repository**: `vermaaman02/NoteNexus`
- **Branch**: `main`

### **Root Directory Setting:**
- **Root Directory**: `frontend`

### **Build Settings:**
- **Framework Preset**: `Create React App`
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `build` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

### **Environment Variables:**
```
REACT_APP_API_URL=https://your-render-backend-url.onrender.com/api
REACT_APP_SERVER_URL=https://your-render-backend-url.onrender.com
```

## 🚀 **Step-by-Step Vercel Setup:**

1. **Go to**: https://vercel.com
2. **New Project** → **Import from GitHub**
3. **Select**: `vermaaman02/NoteNexus`
4. **Set Root Directory**: `frontend`
5. **Framework**: Will auto-detect as Create React App
6. **Add Environment Variables** (after getting Render URL)
7. **Deploy**

## 🔗 **After Both Deployments:**

1. **Get your Render backend URL**: `https://your-app-name.onrender.com`
2. **Update Vercel environment variables** with the actual Render URL
3. **Update backend CORS** to include your Vercel URL

Your frontend will be live at: `https://your-app-name.vercel.app`