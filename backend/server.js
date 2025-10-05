const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000', // For local development
    'http://localhost:5000', // Frontend dev server
    // Render backend (for self-requests)
    'https://notenexus-backend.onrender.com',
    // Vercel frontend domains (update these with your actual Vercel URLs)
    'https://notenexus.vercel.app',
    'https://note-nexus.vercel.app',
    'https://notenexus-frontend.vercel.app',
    'https://notenexus-git-main-vermaaman02.vercel.app',
    'https://notenexus-vermaaman02.vercel.app',
    // Azure Web App domains (keep for backup)
    'https://notenexus-app.azurewebsites.net',
    'https://notenexus-backend.azurewebsites.net',
    'https://notenexus-frontend.azurestaticapps.net',
    // Legacy Vercel domains
    'https://frontend-cil5gigld-aman-vermas-projects-eb493b68.vercel.app',
    'https://note-nexus-git-main-aman-vermas-projects-eb493b68.vercel.app',
    'https://note-nexus-seven.vercel.app',
    'https://notenexus-eight.vercel.app',
    'https://notenexus-alpha.vercel.app',
    'https://notenexus-beta.vercel.app',
    'https://note-nexus-one.vercel.app'
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, {
    body: req.method === 'POST' ? req.body : undefined,
    headers: req.headers.authorization ? 'Auth header present' : 'No auth header'
  });
  next();
});

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));
app.use('/api/users', require('./routes/users'));

// Serve static files from React app build (for production deployment)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'public')));
}

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ message: 'NoteNexus Backend is running!', status: 'OK' });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  
  // Multer errors
  if (error.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ message: 'File too large. Maximum size is 10MB.' });
  }
  
  if (error.message && error.message.includes('Only PDF')) {
    return res.status(400).json({ message: error.message });
  }
  
  // JWT errors
  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ message: 'Invalid token' });
  }
  
  if (error.name === 'TokenExpiredError') {
    return res.status(401).json({ message: 'Token expired' });
  }
  
  // Default error
  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// Catch all handler: send back React's index.html file for production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
} else {
  // 404 handler for development
  app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
  });
}

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/notenexus', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
