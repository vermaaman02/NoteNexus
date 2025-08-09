# NoteNexus - College Note Sharing Platform

A MERN stack application that allows college students to share, upload, and access notes with fellow students.

## Features

### For Students:
- **User Authentication**: Secure registration and login system
- **Note Upload**: Upload notes in various formats (PDF, DOC, DOCX, PPT, PPTX, TXT, images)
- **Note Discovery**: Browse and search notes by subject, course, semester, and college
- **Download Notes**: Access notes uploaded by other students
- **Like & Save**: Like notes and save them for quick access later
- **Personal Dashboard**: Track your uploads, downloads, likes, and saved notes
- **Profile Management**: Update your college and course information

### Platform Features:
- **Advanced Search**: Filter notes by multiple criteria
- **File Management**: Secure file upload with validation
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Statistics**: Track engagement with your uploaded notes

## Tech Stack

### Frontend:
- **React 18** with JSX
- **React Router** for navigation
- **Styled Components** for styling
- **Axios** for API calls
- **React Hook Form** for form handling
- **React Hot Toast** for notifications
- **Lucide React** for icons

### Backend:
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Multer** for file uploads
- **Express Validator** for input validation
- **CORS** for cross-origin requests

## Installation & Setup

### Prerequisites:
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Git

### Backend Setup:

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following variables:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/notenexus
JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_secure
NODE_ENV=development
```

4. Start the development server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup:

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following variables:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SERVER_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication Routes (`/api/auth`):
- `POST /register` - Register a new user
- `POST /login` - Login user
- `GET /me` - Get current user info

### Notes Routes (`/api/notes`):
- `GET /` - Get all notes with filters
- `GET /:id` - Get single note
- `POST /upload` - Upload a new note
- `POST /:id/download` - Download note
- `POST /:id/like` - Like/unlike note
- `GET /my/uploads` - Get user's uploaded notes
- `DELETE /:id` - Delete note

### User Routes (`/api/users`):
- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile
- `POST /save-note/:noteId` - Save/unsave note
- `GET /saved-notes` - Get saved notes
- `GET /stats` - Get user statistics

## Project Structure

```
NoteNexus/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   │   ├── auth.js
│   │   └── upload.js
│   ├── models/
│   │   ├── User.js
│   │   └── Note.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── notes.js
│   │   └── users.js
│   ├── uploads/
│   ├── .env
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Upload.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── NoteDetail.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── index.jsx
│   │   └── index.css
│   ├── .env
│   └── package.json
└── README.md
```

## Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Browse Notes**: Visit the home page to browse available notes
3. **Upload Notes**: Go to the upload page to share your notes
4. **Dashboard**: View your statistics and manage your uploads
5. **Profile**: Update your college and course information

## Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- File type validation for uploads
- File size limits (10MB max)
- Input validation and sanitization
- Protected routes for authenticated users

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support or questions, please create an issue in the GitHub repository.
