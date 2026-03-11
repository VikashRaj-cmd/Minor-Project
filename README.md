# Alumni Connect Platform

Digital Platform for Centralized Alumni Data Management and Engagement

---

## 📋 What is This Project?

A **full-stack web application** that connects college alumni with current students. Alumni can share job opportunities, mentor students, and participate in events.

---

## 🎯 Minor Project (6th Semester)

**Timeline:** 25 February – 28 February 2026

**Objective:** Working project with GUI and basic functionality

### ✅ Features Implemented:
1. **User Authentication** - Register and Login
2. **Dashboard** - Central hub for navigation
3. **Profile Management** - View and edit user profiles
4. **Alumni Directory** - Browse all alumni profiles
5. **Events System** - View and register for events
6. **Job Portal** - Browse and apply for jobs/internships

---

## 🛠 Tech Stack

### Frontend
- **React.js** - UI library
- **Vite** - Build tool (faster than Create React App)
- **Tailwind CSS** - Styling
- **React Router** - Page navigation
- **Axios** - API calls
- **Context API** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password encryption

### Tools
- **VS Code** - Code editor
- **MongoDB Compass** - Database GUI
- **Postman/Thunder Client** - API testing (optional)

---

## 📁 Project Structure

```
Alumni Connect/
│
├── Frontend/                    # React Application
│   ├── src/
│   │   ├── pages/              # All page components
│   │   │   ├── auth/           # Login, Register
│   │   │   ├── alumni/         # Alumni Directory
│   │   │   ├── events/         # Events Page
│   │   │   └── internships/    # Job Portal
│   │   ├── context/            # AuthContext for state
│   │   ├── services/           # API calls (axios)
│   │   ├── App.js              # Main app with routes
│   │   └── main.jsx            # Entry point
│   ├── package.json            # Frontend dependencies
│   └── vite.config.js          # Vite configuration
│
├── Backend/                     # Node.js API
│   ├── models/                 # Database schemas
│   │   ├── User.js             # User model
│   │   ├── Event.js            # Event model
│   │   └── Internship.js       # Job model
│   ├── controllers/            # Business logic
│   │   ├── authController.js   # Register/Login
│   │   ├── userController.js   # Profile operations
│   │   ├── eventController.js  # Event operations
│   │   └── internshipController.js
│   ├── routes/                 # API endpoints
│   │   ├── authRoutes.js       # /api/auth/*
│   │   ├── userRoutes.js       # /api/users/*
│   │   ├── eventRoutes.js      # /api/events/*
│   │   └── internshipRoutes.js # /api/internships/*
│   ├── middleware/             # Auth middleware
│   ├── config/                 # Database config
│   ├── .env                    # Environment variables
│   ├── package.json            # Backend dependencies
│   └── server.js               # Main server file
│
├── README.md                    # This file
└── SETUP_GUIDE.md              # Detailed setup instructions
```

---

## 🚀 Quick Start

### Prerequisites:
- ✅ Node.js installed
- ✅ MongoDB installed
- ✅ VS Code

### Setup (First Time Only):

**1. Install Backend Packages:**
```bash
cd Backend
npm install
```
*This downloads: express, mongoose, jwt, bcrypt, etc.*

**2. Install Frontend Packages:**
```bash
cd Frontend
npm install
```
*This downloads: react, tailwindcss, axios, etc.*

### Running the Project:

**1. Start MongoDB:**
- Open MongoDB Compass → Click Connect

**2. Start Backend (Terminal 1):**
```bash
cd Backend
npm run dev
```
*Runs on: http://localhost:5000*

**3. Start Frontend (Terminal 2):**
```bash
cd Frontend
npm run dev
```
*Runs on: http://localhost:3000*

**4. Open Browser:**
- Go to: `http://localhost:3000`
- Register a new user
- Explore the application

---

## 📖 Detailed Setup Guide

For step-by-step instructions with explanations, see: **[SETUP_GUIDE.md](./SETUP_GUIDE.md)**

---

## 🎓 For Minor Project Presentation

### Demo Flow:
1. **Show Login Page** → Clean UI with email/password
2. **Show Register Page** → Form with all fields
3. **Register New User** → Create alumni account
4. **Show Dashboard** → Cards for all modules
5. **Show Profile** → Edit profile with company details
6. **Show Alumni Directory** → List of all alumni
7. **Show Events Page** → Event cards with register button
8. **Show Job Portal** → Job listings with apply button

### Key Points to Mention:
- ✅ Full-stack MERN application
- ✅ JWT-based secure authentication
- ✅ RESTful API architecture
- ✅ Responsive design with Tailwind CSS
- ✅ MongoDB for data persistence
- ✅ Password encryption with bcrypt
- ✅ Protected routes (login required)

---

## 🔮 Future Enhancements (Major Project - 7th Semester)

- Real-time chat (Socket.io)
- Email notifications (Nodemailer)
- Donation system (Razorpay)
- Advanced mentorship matching
- File uploads (profile pictures, resumes)
- Admin dashboard
- Analytics and reports

---

## 📞 Need Help?

**Common Issues:**
- MongoDB not connecting → Check if MongoDB Compass is running
- Port already in use → Change port in `.env` file
- npm install errors → Run `npm cache clean --force`

See **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** for detailed troubleshooting.

---

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/profile` - Get current user profile
- `GET /api/users/alumni` - Get all alumni
- `PUT /api/users/profile` - Update profile

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create event
- `POST /api/events/:id/register` - Register for event

### Jobs/Internships
- `GET /api/internships` - Get all jobs
- `POST /api/internships` - Create job posting
- `POST /api/internships/:id/apply` - Apply for job

---

## 👥 Team

*Add your team member names here*

---

## 📅 Project Timeline

- **Minor Project (6th Semester)**: Basic functionality and GUI ✅
- **Major Project (7th Semester)**: Advanced features and enhancements

---

**Good luck with your presentation! 🎉**
