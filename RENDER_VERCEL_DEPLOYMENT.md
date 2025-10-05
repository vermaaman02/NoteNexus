# 🚀 Complete Render + Vercel Deployment Guide

## 📋 **Quick Summary:**
- **Backend** → Render (Node.js)
- **Frontend** → Vercel (React)

## 1️⃣ **Deploy Backend to Render First**

### **Render Setup:**
1. Go to: https://render.com
2. **New Web Service**
3. **Connect GitHub**: `vermaaman02/NoteNexus`
4. **Root Directory**: `backend`
5. **Environment**: `Node`
6. **Build Command**: `npm install`
7. **Start Command**: `npm start`

### **Environment Variables for Render:**
```
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/notenexus
JWT_SECRET=your_secure_jwt_secret_key_minimum_32_characters
NODE_ENV=production
```

### **Result:**
Your backend will be live at: `https://your-backend-name.onrender.com`

## 2️⃣ **Deploy Frontend to Vercel Second**

### **Vercel Setup:**
1. Go to: https://vercel.com
2. **New Project**
3. **Import GitHub**: `vermaaman02/NoteNexus`
4. **Root Directory**: `frontend`
5. **Framework**: Create React App (auto-detected)

### **Environment Variables for Vercel:**
```
REACT_APP_API_URL=https://your-backend-name.onrender.com/api
REACT_APP_SERVER_URL=https://your-backend-name.onrender.com
```

### **Result:**
Your frontend will be live at: `https://your-frontend-name.vercel.app`

## 3️⃣ **After Both Deployments**

### **Update Backend CORS:**
1. Get your actual Vercel URL
2. Update the CORS origins in `backend/server.js` (already prepared)
3. Push the changes to trigger redeployment

### **Test Your App:**
1. Visit your Vercel frontend URL
2. Try registering/logging in
3. Test file upload functionality
4. Check admin access with ID: `11663645`, Password: `#aman@11`

## 🎯 **Root Directory Settings Summary:**
- **Render**: Root Directory = `backend`
- **Vercel**: Root Directory = `frontend`

This tells each platform which folder contains the code they should deploy!

## 🔧 **Troubleshooting:**
- **Backend 502 errors**: Check environment variables in Render
- **Frontend API errors**: Verify REACT_APP_API_URL points to your Render backend
- **CORS errors**: Ensure Vercel URL is added to backend CORS origins

Your NoteNexus will be fully deployed and functional! 🎉