# 📚 StackIt API Documentation

## Base URL
```
Development: http://localhost:5000/api
Production: https://stackit-backend-0vzt.onrender.com/api
```

## Authentication
Most endpoints require JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 🔐 Authentication Endpoints

### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "username": "john_dev",
  "email": "john@example.com",
  "password": "Password123"
}
```
**Response:** 
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "john_dev",
    "email": "john@example.com",
    "avatar": "",
    "reputation": 0,
    "role": "user"
  }
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Password123"
}
```

### Get Current User
```http
GET /auth/me
Authorization: Bearer <token>
```

### Update Profile
```http
PUT /auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "bio": "Full-stack developer",
  "location": "San Francisco",
  "website": "https://example.com",
  "avatar": "https://example.com/avatar.jpg"
}
```

---

## ❓ Questions Endpoints

### Get All Questions
```http
GET /questions?page=1&limit=10&tag=javascript&sort=-createdAt
```

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `tag` (string): Filter by tag
- `sort` (string): Sort field (-createdAt, voteScore, views)
- `search` (string): Search in title/content

**Response:**
```json
{
  "success": true,
  "count": 10,
  "total": 25,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "How to use React Hooks?",
      "content": "<p>Rich HTML content...</p>",
      "author": {
        "id": "507f1f77bcf86cd799439012",
        "username": "john_dev",
        "avatar": "https://..."
      },
      "tags": ["react", "javascript"],
      "voteScore": 5,
      "answerCount": 2,
      "views": 145,
      "createdAt": "2025-03-31T10:00:00Z"
    }
  ]
}
```

### Get Single Question
```http
GET /questions/:id
```

### Create Question
```http
POST /questions
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "How to implement authentication?",
  "content": "<p>Need help with JWT...</p>",
  "tags": ["javascript", "nodejs", "security"]
}
```

### Update Question
```http
PUT /questions/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated title",
  "content": "Updated content",
  "tags": ["nodejs"]
}
```

### Delete Question
```http
DELETE /questions/:id
Authorization: Bearer <token>
```

### Vote on Question
```http
POST /questions/:id/vote
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "up"  // "up" or "down"
}
```

---

## 💬 Answers Endpoints

### Get Answers for Question
```http
GET /answers?questionId=507f1f77bcf86cd799439011&sort=-voteScore
```

### Create Answer
```http
POST /answers
Authorization: Bearer <token>
Content-Type: application/json

{
  "questionId": "507f1f77bcf86cd799439011",
  "content": "<p>Here's the solution...</p>"
}
```

### Update Answer
```http
PUT /answers/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "Updated answer content"
}
```

### Delete Answer
```http
DELETE /answers/:id
Authorization: Bearer <token>
```

### Vote on Answer
```http
POST /answers/:id/vote
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "up"  // "up" or "down"
}
```

### Mark Answer as Accepted
```http
POST /answers/:id/accept
Authorization: Bearer <token>
```
*Only question author can mark answers as accepted*

---

## 🏷️ Tags Endpoints

### Get All Tags
```http
GET /tags?page=1&limit=20
```

**Response:**
```json
{
  "success": true,
  "count": 20,
  "total": 50,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "javascript",
      "description": "For questions about JavaScript and ECMAScript",
      "color": "#F7DF1E",
      "questionCount": 245,
      "followers": 1200
    }
  ]
}
```

### Get Questions by Tag
```http
GET /tags/:tagName
```

### Create Tag (Admin only)
```http
POST /tags
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "nodejs",
  "description": "Node.js runtime and packages",
  "color": "#68A063"
}
```

### Follow/Unfollow Tag
```http
POST /tags/:tagName/follow
Authorization: Bearer <token>
```

---

## 👤 Users Endpoints

### Get User Profile
```http
GET /users/:username
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "john_dev",
    "email": "john@example.com",
    "avatar": "https://...",
    "bio": "Full-stack developer",
    "reputation": 450,
    "badges": [],
    "location": "San Francisco",
    "website": "https://johndeveloper.com",
    "joinedAt": "2025-01-15T00:00:00Z"
  }
}
```

### Get Current User Stats
```http
GET /users/me/stats
Authorization: Bearer <token>
```

### Get User's Questions
```http
GET /users/:username/questions
```

### Get User's Answers
```http
GET /users/:username/answers
```

---

## 🔔 Notifications Endpoints

### Get Notifications
```http
GET /notifications?unread=true&limit=10
Authorization: Bearer <token>
```

### Mark as Read
```http
PUT /notifications/:id/read
Authorization: Bearer <token>
```

### Delete Notification
```http
DELETE /notifications/:id
Authorization: Bearer <token>
```

### Get Unread Count
```http
GET /notifications/unread/count
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "unreadCount": 5
}
```

---

## 👨‍⚖️ Admin Endpoints

### Get All Users
```http
GET /admin/users?search=john&role=user&limit=20
Authorization: Bearer <admin_token>
```

### Update User Role
```http
PUT /admin/users/:userId/role
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "role": "moderator"  // "user", "moderator", "admin"
}
```

### Toggle User Status
```http
PUT /admin/users/:userId/status
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "isActive": false
}
```

### Get All Flagged Questions
```http
GET /admin/flagged-questions
Authorization: Bearer <admin_token>
```

### Delete Question (Moderation)
```http
DELETE /admin/questions/:questionId
Authorization: Bearer <admin_token>
```

### Get Statistics
```http
GET /admin/stats
Authorization: Bearer <admin_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalUsers": 150,
    "totalQuestions": 320,
    "totalAnswers": 890,
    "totalTags": 45,
    "activeToday": 25,
    "registeredThisMonth": 12
  }
}
```

---

## ⚠️ Error Responses

### 400 Bad Request
```json
{
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "message": "Not authorized, token failed"
}
```

### 403 Forbidden
```json
{
  "message": "User role user is not authorized to access this route"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Server Error
```json
{
  "message": "Server error during operation"
}
```

---

## 🔄 WebSocket Events (Socket.io)

### Connect
```javascript
socket.on('connect', () => {
  // Socket connected
  socket.emit('join-user', userId);
});
```

### Receive Notification
```javascript
socket.on('new-notification', (notification) => {
  console.log('New notification:', notification);
});
```

### Handle Disconnect
```javascript
socket.on('disconnect', () => {
  console.log('Socket disconnected');
});
```

---

## 📋 HTTP Status Codes

| Status | Meaning |
|--------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 409 | Conflict - Resource already exists |
| 500 | Server Error - Unexpected error |

---

## 🧪 Testing with Postman

1. **Create Collection** named "StackIt API"
2. **Setup Environment Variables:**
   - `base_url`: http://localhost:5000/api
   - `token`: (will be filled after login)
3. **Organize requests** by categories (Auth, Questions, Answers, etc.)
4. **Use Pre-request Scripts** to set token automatically:
   ```javascript
   pm.request.headers.add({
     key: 'Authorization',
     value: 'Bearer ' + pm.environment.get('token')
   });
   ```

---

## 🚀 Pagination

All list endpoints support pagination:
```http
GET /questions?page=2&limit=10
```

**Response includes:**
```json
{
  "data": [...],
  "count": 10,
  "total": 245,
  "page": 2,
  "pages": 25
}
```

---

**Last Updated:** March 31, 2026
