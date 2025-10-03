# 🚀 NoteNexus Team Setup Guide

Welcome to the NoteNexus project! Follow these steps to get the application running on your local machine.

## 📋 Prerequisites

Make sure you have these installed:
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)
- **MongoDB** account - [Sign up at MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

## 🔧 Step-by-Step Setup

### 1. Clone the Repository
```bash
git clone https://github.com/vermaaman02/NoteNexus.git
cd NoteNexus
```

### 2. Backend Setup

#### Navigate to backend folder:
```bash
cd backend
```

#### Install dependencies:
```bash
npm install
```

#### Configure Environment Variables:
1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` file and fill in your values:
   ```env
   PORT=5001
   MONGODB_URI=your_mongodb_connection_string_here
   JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_secure
   NODE_ENV=development
   ```

#### How to get your MongoDB URI:
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database password
6. Replace `<dbname>` with `notenexus`

Example: `mongodb+srv://username:password@cluster0.mongodb.net/notenexus?retryWrites=true&w=majority`

#### Generate JWT Secret:
You can use any long, random string. Here's how to generate one:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

#### Start the backend server:
```bash
npm start
```
✅ Backend should now be running on `http://localhost:5001`

### 3. Frontend Setup

#### Open a new terminal and navigate to frontend folder:
```bash
cd frontend
```

#### Install dependencies:
```bash
npm install
```

#### Start the frontend server:
```bash
npm start
```
✅ Frontend should now be running on `http://localhost:3000`

## 🎯 Verification

If everything is set up correctly:
1. Open `http://localhost:3000` in your browser
2. You should see the NoteNexus homepage
3. Try registering a new account
4. Try logging in

## 🔐 Admin Access

For admin features, use these credentials:
- **Admin ID:** `11663645`
- **Password:** `#aman@11`

## 🛠️ Development Scripts

### Backend:
```bash
cd backend
npm start          # Start the server
npm run dev        # Start with nodemon (auto-restart)
```

### Frontend:
```bash
cd frontend
npm start          # Start development server
npm run build      # Build for production
```

## 📁 Project Structure

```
NoteNexus/
├── backend/                 # Node.js + Express API
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── middleware/         # Authentication middleware
│   ├── .env               # Your environment variables
│   └── server.js          # Main server file
├── frontend/               # React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   └── services/      # API calls
│   └── public/
└── README.md
```

## 🚨 Troubleshooting

### Common Issues:

1. **Port already in use:**
   - Backend: Change `PORT=5001` to `PORT=5002` in `.env`
   - Frontend: It will ask to use a different port, press `Y`

2. **MongoDB connection error:**
   - Check your `MONGODB_URI` in `.env`
   - Make sure your IP is whitelisted in MongoDB Atlas
   - Verify your database password

3. **JWT token error:**
   - Make sure `JWT_SECRET` is set in `.env`
   - Use a long, secure string (at least 32 characters)

4. **Package installation fails:**
   ```bash
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

## 💡 Development Tips

- Always pull latest changes: `git pull origin main`
- Create feature branches: `git checkout -b feature/your-feature-name`
- Both servers support hot reload - changes will reflect automatically
- Check browser console and terminal for error messages

## 📞 Need Help?

If you encounter any issues:
1. Check the troubleshooting section above
2. Look at terminal error messages
3. Ask in the team chat
4. Create an issue in the GitHub repository

## 🎉 You're Ready!

Once both servers are running, you can start developing! The application includes:
- User authentication (register/login)
- File upload functionality
- Note sharing and discovery
- Admin panel access
- Responsive design

Happy coding! 🚀