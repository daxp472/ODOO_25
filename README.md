# 🧠 StackIt – Q&A Platform

A modern, full-stack Q&A platform built with MERN stack. Features user authentication, real-time notifications, voting system, and admin dashboard.

## 🚀 Quick Start

**Windows:**
```bash
quick-start.bat
```

**macOS/Linux:**
```bash
chmod +x quick-start.sh
./quick-start.sh
```

**Manual Setup:**
```bash
# Terminal 1: Backend
cd Backend && npm run seed && npm run dev

# Terminal 2: Frontend
cd frontend && npm run dev

# Open http://localhost:5173
```

## 🔐 Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@stackit.dev | password |
| User | user@stackit.dev | password |

## 🌟 Features

✅ User Authentication (JWT + Bcrypt)  
✅ Ask Questions with Rich Text Editor  
✅ Answer System with Voting  
✅ Real-time Notifications (Socket.io)  
✅ Tagging & Filtering  
✅ Reputation System  
✅ Admin Dashboard  
✅ Fully Responsive Design  

## 📦 Tech Stack

**Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Socket.io  
**Backend:** Node.js, Express, MongoDB, JWT, Bcrypt  

## 📚 Documentation

- [Setup Guide](SETUP_GUIDE.md) - Complete installation & deployment
- [API Documentation](API_DOCS.md) - All endpoints with examples
- [Architecture](ARCHITECTURE.md) - System design & data flow
- [Portfolio Checklist](PORTFOLIO_CHECKLIST.md) - Pre-launch verification

## 🌐 Live Links

- **Frontend:** https://stackit-odoo.netlify.app
- **Backend:** https://stackit-backend-0vzt.onrender.com/api/health
- **Design:** https://www.figma.com/design/YKYLqPwlaGQUoMtKWWCjoZ/ODOO_2025

## 📁 Project Structure

```
ODOO_25/
├── Backend/          # Node.js + Express API
├── frontend/         # React + TypeScript UI
├── SETUP_GUIDE.md    # Installation guide
├── API_DOCS.md       # API reference
└── quick-start.bat   # One-click setup
```

## 🔒 Security

✅ JWT authentication  
✅ Bcrypt password hashing (12 rounds)  
✅ Rate limiting & CORS protection  
✅ Helmet.js security headers  
✅ Input validation  
✅ Role-based access control  

## 📊 API Overview

**Auth:** /auth/register, /auth/login  
**Questions:** /questions, /questions/:id  
**Answers:** /answers, /answers/:id/vote  
**Admin:** /admin/users, /admin/stats  

See [API_DOCS.md](API_DOCS.md) for full reference.

## 🚀 Deployment

**Frontend:** Netlify (auto-deploy from GitHub)  
**Backend:** Render (auto-deploy from GitHub)  
**Database:** MongoDB Atlas  

See [SETUP_GUIDE.md](SETUP_GUIDE.md#deployment) for details.

## 📝 License

MIT License - Use freely for portfolio & personal projects

---

Built with ❤️ for Web Developers | March 2026
