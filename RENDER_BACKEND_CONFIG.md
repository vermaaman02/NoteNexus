# Render Backend Deployment Configuration

## 🎯 **Render Settings for NoteNexus Backend**

### **Repository Connection:**
- **GitHub Repository**: `vermaaman02/NoteNexus`
- **Branch**: `main`

### **Root Directory Setting:**
- **Root Directory**: `backend`

### **Build & Deploy Settings:**
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### **Environment Variables:**
```
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/notenexus
JWT_SECRET=your_secure_jwt_secret_key_minimum_32_characters
NODE_ENV=production
```

### **Auto-Deploy:**
- **Enable**: Yes (will deploy automatically when you push to main branch)

## 📁 **Why Root Directory = `backend`?**

Your project structure:
```
NoteNexus/
├── backend/          ← This is what Render should deploy
│   ├── server.js
│   ├── package.json
│   └── ...
├── frontend/         ← This goes to Vercel
└── ...
```

Since Render needs to find `package.json` and `server.js`, you must set the root directory to `backend` so Render looks inside the backend folder for these files.

## 🚀 **Step-by-Step Render Setup:**

1. **Go to**: https://render.com
2. **New Web Service** → **Connect GitHub**
3. **Select**: `vermaaman02/NoteNexus`
4. **Set Root Directory**: `backend`
5. **Runtime**: `Node`
6. **Build Command**: `npm install`
7. **Start Command**: `npm start`
8. **Add Environment Variables** (listed above)
9. **Create Web Service**

Your backend will be live at: `https://your-app-name.onrender.com`