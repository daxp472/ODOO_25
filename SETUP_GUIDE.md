# 🚀 StackIt - Complete Setup & Deployment Guide

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Local Setup](#local-setup)
4. [Database Seeding](#database-seeding)
5. [Running the Application](#running-the-application)
6. [Troubleshooting](#troubleshooting)
7. [Deployment](#deployment)
8. [Demo Credentials](#demo-credentials)

---

## 📌 Project Overview

**StackIt** is a modern Q&A platform similar to Stack Overflow, built with:
- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express + MongoDB
- **Real-time**: Socket.io for notifications
- **Auth**: JWT + Bcrypt

### Key Features
✅ User Authentication (Register/Login)
✅ Ask Questions with Rich Text Editor
✅ Answer System with Voting
✅ Tag-based Categorization
✅ Real-time Notifications
✅ Admin Dashboard
✅ Reputation System
✅ AI-powered Assistant (Optional)

---

## 🔧 Prerequisites

Before starting, ensure you have:

- **Node.js**: v16+ (Download from [nodejs.org](https://nodejs.org))
- **MongoDB**: Local instance running on port 27017 OR MongoDB Atlas account
- **Git**: For version control
- **VS Code**: Recommended editor

### Verify Installation
```bash
node --version    # Should be v16 or higher
npm --version     # Should be v7 or higher
mongosh --version # MongoDB shell (optional)
```

---

## 📦 Local Setup

### Step 1: Clone or Extract Project
```bash
# If cloning from Git
git clone <repository-url>
cd ODOO_25

# OR if already extracted, navigate to folder
cd ODOO_25
```

### Step 2: Install Backend Dependencies
```bash
cd Backend
npm install
```

### Step 3: Setup Backend Environment
```bash
# Copy .env.example to .env
cp .env.example .env

# Edit .env file with your configuration
# For local development, default values should work fine
```

**Backend .env Configuration:**
```env
MONGODB_URI=mongodb://localhost:27017/stackit
PORT=5000
NODE_ENV=development
JWT_SECRET=stackit_super_secret_jwt_key_2025_change_in_production
JWT_EXPIRE=7d
```

### Step 4: Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

### Step 5: Setup Frontend Environment
```bash
# Create .env.local for development
echo "VITE_API_URL=http://localhost:5000/api" > .env.local
echo "VITE_SOCKET_URL=http://localhost:5000" >> .env.local
```

---

## 🌱 Database Seeding

### What Gets Seeded?
- **5 Demo Users** (including 1 admin account)
- **10 Tags** (JavaScript, React, Node.js, MongoDB, etc.)
- **6 Sample Questions** with realistic content
- **5 Sample Answers** with votes and accepted answers
- **3 Sample Notifications**

### Seed the Database

#### Option 1: Using npm script (Recommended)
```bash
cd Backend
npm run seed
```

#### Option 2: Manual seeding
```bash
cd Backend
node scripts/seedDatabase.js
```

### Expected Output
```
✅ Database cleared
✅ Created 5 users
✅ Created 10 tags
✅ Created 6 questions
✅ Created 5 answers
✅ Linked answers to questions
✅ Created 3 notifications

✅ Database seeding completed successfully!

📊 Summary:
   - Users: 5
   - Tags: 10
   - Questions: 6
   - Answers: 5

💡 Admin Credentials:
   Email: mike@example.com
   Password: Password123
```

---

## ▶️ Running the Application

### Terminal 1: Start MongoDB (if local)
```bash
# Windows
mongod

# macOS/Linux
mongod --dbpath /path/to/data
```

### Terminal 2: Start Backend Server
```bash
cd Backend
npm run dev
```

Expected output:
```
🍃 MongoDB Connected: localhost:27017
⚡ Server running on http://localhost:5000
```

### Terminal 3: Start Frontend Development Server
```bash
cd frontend
npm run dev
```

Expected output:
```
VITE v5.0.8  ready in 234 ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

### Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api
- **API Documentation**: Check route files in `Backend/routes/`

---

## 🧪 Testing the Application

### Test User Accounts (After Seeding)

#### Regular Users:
```
Username: john_developer
Email: john@example.com
Password: Password123

Username: sarah_devops
Email: sarah@example.com
Password: Password123
```

#### Admin Account:
```
Username: mike_admin
Email: mike@example.com
Password: Password123
Role: admin
```

### Test Scenarios

1. **User Registration**
   - Go to `/register`
   - Fill in username, email, password
   - Should redirect to login after success

2. **User Login**
   - Go to `/login`
   - Use any demo credentials above
   - Should redirect to dashboard

3. **Ask a Question**
   - Click "Ask Question" button
   - Fill in title, description (rich text), and tags
   - Should appear in questions list

4. **View Questions**
   - Navigate to `/questions`
   - Filter by tags
   - Click on question to view answers

5. **Post an Answer**
   - On a question detail page
   - Scroll to "Post Your Answer"
   - Write answer and submit

6. **Voting System**
   - Upvote/downvote answers
   - Check reputation increase for answer author

7. **Admin Dashboard**
   - Login as admin (mike_admin)
   - Access `/admin` routes
   - View user management and moderation

---

## 🐛 Troubleshooting

### MongoDB Connection Issues
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:**
- Ensure MongoDB is running: `mongod`
- Check MONGODB_URI in .env
- Try MongoDB Atlas: Update MONGODB_URI to your Atlas cluster

### Port 5000 Already in Use
```
Error: listen EADDRINUSE :::5000
```
**Solution:**
```bash
# Find process using port 5000
lsof -i :5000 # macOS/Linux
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess # Windows

# Kill process or use different port
PORT=5001 npm run dev
```

### Port 5173 Already in Use
```
VITE v5.0.8  error when starting dev server:
Error: listen EADDRINUSE: address already in use ...
```
**Solution:**
```bash
# Vite will automatically use next available port
# Or specify port
npm run dev -- --port 3000
```

### Frontend Can't Connect to API
```
Error: Network Error | ERR_NAME_NOT_RESOLVED
```
**Solution:**
- Verify backend is running: `http://localhost:5000/api`
- Check `.env.local` has correct API_URL
- Check CORS in backend: `allowedOrigins` includes frontend URL

### Seeding Script Fails
```
Error: ENOENT: no such file or directory
```
**Solution:**
```bash
# Ensure you're in Backend directory
cd Backend
node scripts/seedDatabase.js
```

### JWT Token Issues
```
Error: jwt malformed | jwt expired
```
**Solution:**
- Clear browser localStorage: Open DevTools → Application → Storage → Clear All
- Re-login to get fresh token

---

## 🚀 Deployment

### Deploy Backend to Render or Heroku

#### Using Render.com (Recommended for beginners)
1. Push code to GitHub
2. Create account on [render.com](https://render.com)
3. Click "New Web Service"
4. Connect GitHub repository
5. Configure:
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Environment Variables**:
     - MONGODB_URI: (Get from MongoDB Atlas)
     - JWT_SECRET: (Use strong, random value)
     - NODE_ENV: production

### Deploy Frontend to Netlify

1. Build frontend: `npm run build`
2. Deploy to [netlify.com](https://netlify.com)
3. Connect GitHub repo (auto-redeploy on push)
4. Configure Environment:
   - VITE_API_URL: Your deployed backend URL
   - VITE_SOCKET_URL: Your deployed backend URL

### Production Checklist
- [ ] Database backed up
- [ ] JWT_SECRET changed to strong random value
- [ ] NODE_ENV set to production
- [ ] CORS origins updated to production URLs
- [ ] Rate limiting configured
- [ ] SSL/HTTPS enabled
- [ ] Error logging configured
- [ ] Monitoring setup (optional)

---

## 📊 API Endpoints Overview

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Questions
- `GET /api/questions` - Get all questions
- `GET /api/questions/:id` - Get single question
- `POST /api/questions` - Create question
- `PUT /api/questions/:id` - Update question
- `DELETE /api/questions/:id` - Delete question

### Answers
- `GET /api/answers/:questionId` - Get answers for question
- `POST /api/answers` - Create answer
- `PUT /api/answers/:id` - Update answer
- `DELETE /api/answers/:id` - Delete answer
- `POST /api/answers/:id/vote` - Vote on answer

### Tags
- `GET /api/tags` - Get all tags
- `GET /api/tags/:name` - Get questions by tag
- `POST /api/tags` - Create tag

### Admin
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id/role` - Update user role
- `DELETE /api/admin/questions/:id` - Remove question

---

## 💡 Video Demo Tips

### Recording Your Demo Videos

**Recommended Flow:**
1. **Introduction** (30 sec)
   - Show login page
   - Explain what you built

2. **Registration** (45 sec)
   - Create new account
   - Show email validation

3. **Browse Questions** (1 min)
   - Show question list
   - Filter by tags
   - Demo search functionality

4. **Ask Question** (1 min)
   - Click "Ask Question"
   - Show rich text editor
   - Submit and see it appear in list

5. **Answer & Voting** (1 min)
   - View a question
   - Post an answer
   - Upvote/downvote answers
   - Show reputation changes

6. **Admin Features** (1 min)
   - Login as admin
   - Show user management
   - Show moderation features
   - Show user stats/CSV export

7. **Notifications** (30 sec)
   - Show real-time notifications
   - Demo mention system

**Recording Tools:**
- OBS Studio (Free)
- Loom (Easy, web-based)
- ScreenFlow (macOS)
- Camtasia (Professional)

**Audio Tips:**
- Use microphone with good quality
- Speak clearly and at moderate pace
- Add background music (royalty-free)
- Use screen recording without system sounds first, then add voiceover

---

## 📚 Project Structure

```
ODOO_25/
├── Backend/
│   ├── config/          # Database configuration
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth, error handling
│   ├── scripts/
│   │   └── seedDatabase.js
│   ├── server.js        # Main server file
│   ├── package.json
│   ├── .env             # Environment variables (local)
│   └── .env.example     # Template
│
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── context/     # State management
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── package.json
│   ├── .env.local       # Development env
│   └── .env.production  # Production env
│
└── README.md
```

---

## 🎯 Next Steps for Portfolio

1. **Document Your Code**
   - Add JSDoc comments
   - Create API documentation

2. **Add Tests**
   - Backend: Jest tests
   - Frontend: Vitest or Jest

3. **Optimize Performance**
   - Add caching
   - Optimize images
   - Code splitting

4. **Enhance Features**
   - Search functionality
   - Advanced filters
   - User profiles
   - Direct messaging (optional)

5. **Deploy & Share**
   - Deploy on Render/Heroku
   - Deploy on Netlify
   - Share GitHub repository
   - Make it open source

6. **Create Portfolio Content**
   - Write blog post about the project
   - Share demo video
   - Link GitHub repository
   - Mention tech stack used

---

## 📞 Support & Resources

### Useful Links
- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev/)
- [Socket.io Documentation](https://socket.io/docs/)

### Common Issues & Solutions
See **Troubleshooting** section above

### Ask for Help
- Check existing GitHub issues
- Read error messages carefully
- Check browser console for errors
- Use network tab in DevTools to debug API calls

---

**Happy Coding! 🎉**

> Last Updated: March 31, 2026
> For the latest updates, check the main README.md
