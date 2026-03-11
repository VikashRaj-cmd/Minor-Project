# 🎓 Alumni Connect - Minor Project Setup Guide

## ✅ What You Already Have
- ✅ Node.js installed
- ✅ MongoDB installed
- ✅ VS Code with terminal

## ❓ Why Run `npm install`?

Even though you have Node.js installed, **each project needs its own packages**.

**Example:**
- Your project needs: `express`, `mongoose`, `react`, `axios`, `tailwindcss`, etc.
- These packages are **NOT installed yet** in your project
- `npm install` reads `package.json` and downloads all required packages into `node_modules` folder

**Think of it as:**
- Node.js = Car Engine (already have ✅)
- npm install = Installing specific parts this car needs (tires, seats, steering wheel)

---

## 🚀 Step-by-Step Setup

### **Step 1: Open Project in VS Code**
```bash
cd "e:\Alumni Connect"
code .
```

### **Step 2: Install Backend Dependencies**

Open VS Code terminal (Ctrl + `) and run:

```bash
cd Backend
npm install
```

**What this does:**
- Reads `Backend/package.json`
- Downloads: express, mongoose, jsonwebtoken, bcryptjs, cors, dotenv, nodemon, etc.
- Creates `node_modules` folder with all packages
- Takes 1-2 minutes

### **Step 3: Start MongoDB**

**Option A - MongoDB Compass (GUI App):**
- Open MongoDB Compass app
- Click "Connect" (default: localhost:27017)
- Keep it running

**Option B - Command Line:**
```bash
mongod
```

### **Step 4: Start Backend Server**

In same terminal:
```bash
npm run dev
```

**You should see:**
```
Server running on port 5000
MongoDB Connected
```

✅ Backend is now running on: `http://localhost:5000`

---

### **Step 5: Install Frontend Dependencies**

Open **NEW terminal** in VS Code (Ctrl + Shift + `):

```bash
cd Frontend
npm install
```

**What this does:**
- Reads `Frontend/package.json`
- Downloads: react, react-dom, react-router-dom, axios, tailwindcss, vite, etc.
- Creates `node_modules` folder
- Takes 1-2 minutes

### **Step 6: Start Frontend**

In same terminal:
```bash
npm run dev
```

**You should see:**
```
VITE ready in 500ms
Local: http://localhost:3000
```

✅ Frontend is now running on: `http://localhost:3000`

---

## 🎯 Testing Your Application

### **Open Browser:**
Go to: `http://localhost:3000`

### **Test 1: Register New User**
1. You'll see Login page
2. Click "Register" link at bottom
3. Fill the form:
   - **Name:** John Doe
   - **Email:** john@example.com
   - **Password:** password123
   - **Role:** Select "Alumni"
   - **Batch:** 2020
   - **Department:** Computer Science
4. Click "Register" button
5. You'll be redirected to Dashboard

### **Test 2: Login**
1. Logout from dashboard
2. Login with:
   - Email: john@example.com
   - Password: password123
3. You'll see Dashboard

### **Test 3: Explore All Pages**
- ✅ **Dashboard** - Click on cards to navigate
- ✅ **Profile** - Click "Edit Profile" to update details
- ✅ **Alumni** - See all registered alumni
- ✅ **Events** - View events (empty initially)
- ✅ **Jobs** - View jobs (empty initially)

---

## 📦 Adding Sample Data (Optional)

To show events and jobs in your presentation, add sample data:

### **Method 1: Using Postman/Thunder Client**

**Add Event:**
- Method: POST
- URL: `http://localhost:5000/api/events`
- Headers: 
  - Authorization: `Bearer YOUR_TOKEN` (copy from browser localStorage)
  - Content-Type: `application/json`
- Body:
```json
{
  "title": "Alumni Meetup 2024",
  "description": "Annual alumni gathering and networking event",
  "date": "2024-12-25",
  "location": "College Auditorium"
}
```

**Add Job:**
- Method: POST
- URL: `http://localhost:5000/api/internships`
- Headers: Same as above
- Body:
```json
{
  "title": "Software Developer",
  "company": "Tech Corp",
  "description": "Full-stack developer position for freshers",
  "location": "Remote",
  "type": "job"
}
```

### **Method 2: Create Multiple Alumni Accounts**
- Register 3-4 users with role "Alumni"
- Add their company and designation in Profile
- This will populate Alumni Directory page

---

## 🎨 Features Implemented

### ✅ GUI Screens
1. ✅ Login Page
2. ✅ Register Page
3. ✅ Dashboard
4. ✅ Alumni Profile Page
5. ✅ Events Page
6. ✅ Job Portal

### ✅ Basic Functionality
- User Authentication (JWT)
- Profile Management
- Alumni Directory
- Event Registration
- Job Applications

---

## 🛠 Tech Stack Used

**Frontend:**
- React.js with Vite
- Tailwind CSS
- React Router
- Axios
- Context API

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcrypt for password hashing

---

## 📝 Project Structure

```
Alumni Connect/
├── Frontend/          # React frontend
│   ├── src/
│   │   ├── pages/    # All page components
│   │   ├── context/  # State management
│   │   └── services/ # API calls
│   └── package.json
│
└── Backend/          # Node.js backend
    ├── models/       # Database schemas
    ├── controllers/  # Business logic
    ├── routes/       # API routes
    └── package.json
```

---

## 🎓 For Minor Project Presentation (25-28 Feb 2026)

### What to Show:
1. **Login/Register Flow** - User authentication
2. **Dashboard** - Main navigation hub
3. **Profile Management** - Edit user details
4. **Alumni Directory** - Browse alumni profiles
5. **Events** - View and register for events
6. **Job Portal** - Browse and apply for jobs

### Key Points to Mention:
- Full-stack MERN application
- JWT-based authentication
- RESTful API architecture
- Responsive UI with Tailwind CSS
- MongoDB for data persistence

---

## 🔧 Troubleshooting

### **Problem 1: MongoDB Connection Error**
**Error:** `MongooseServerSelectionError: connect ECONNREFUSED`

**Solution:**
- Open MongoDB Compass app and click Connect
- OR run `mongod` in terminal
- Make sure MongoDB is running before starting backend

### **Problem 2: Port Already in Use**
**Error:** `Port 5000 is already in use`

**Solution:**
- Kill the process using that port
- OR change port in `Backend/.env` file:
  ```
  PORT=5001
  ```

### **Problem 3: npm install fails**
**Error:** `npm ERR!`

**Solution:**
```bash
npm cache clean --force
npm install
```

### **Problem 4: Frontend not loading**
**Solution:**
- Check if backend is running (http://localhost:5000)
- Check browser console for errors (F12)
- Make sure both terminals are open and running

### **Problem 5: Login not working**
**Solution:**
- Check MongoDB is connected (see backend terminal)
- Register a new user first
- Check email/password are correct

---

## 📱 Quick Commands Reference

**Check if Node.js installed:**
```bash
node --version
```

**Check if MongoDB installed:**
```bash
mongod --version
```

**Stop running servers:**
- Press `Ctrl + C` in terminal

**Restart servers:**
```bash
# Backend
cd Backend
npm run dev

# Frontend (new terminal)
cd Frontend
npm run dev
```

---

**Good luck with your Minor Project presentation! 🎉**



https://www.duac.duf.du.ac.in/feed?cat=all