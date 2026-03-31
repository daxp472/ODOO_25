# 🏗️ StackIt - System Architecture

## System Overview Diagram

```
┌─────────────────┐
│   Frontend      │ (React + TypeScript + Vite)
│  http://localhost:5173
│  └─ Components  │
│  └─ Pages       │
│  └─ Context     │
└────────┬────────┘
         │ HTTP & WebSocket
         │
┌────────▼────────┐
│   Nginx/CDN     │ (Production: Netlify/CDN)
└────────┬────────┘
         │
┌────────▼────────────────────────┐
│      Backend API Server         │ (Express.js)
│    http://localhost:5000        │
│  ┌─ Routes                      │
│  ├─ Controllers/Handlers        │
│  ├─ Middleware                  │
│  └─ Socket.io Server            │
└────────┬────────────────────────┘
         │
┌────────▼────────────────────────┐
│      MongoDB Atlas              │ (Production)
│   mongodb://localhost:27017     │ (Local Dev)
│  ┌─ Users Collection            │
│  ├─ Questions Collection        │
│  ├─ Answers Collection          │
│  ├─ Tags Collection             │
│  └─ Notifications Collection    │
└─────────────────────────────────┘
```

---

## Architecture Layers

### 1. Presentation Layer (Frontend)

**Location:** `frontend/src/`

**Responsibilities:**
- User interface rendering
- User interactions handling
- State management
- API communication

**Key Files:**
- `pages/` - Page components
- `components/` - Reusable UI components
- `context/` - Global state (Auth, Notifications)
- `App.tsx` - Main application component

**Technology Stack:**
- React 18 + TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Axios for HTTP requests
- Socket.io for real-time updates

### 2. Application Layer (Backend)

**Location:** `Backend/routes/`

**Responsibilities:**
- Business logic implementation
- Request validation
- Authentication/Authorization
- Data transformation

**Key Routes:**
- `/auth` - Authentication endpoints
- `/questions` - Question management
- `/answers` - Answer management
- `/users` - User profiles
- `/tags` - Tag management
- `/admin` - Admin operations
- `/notifications` - Notification delivery

**Technology Stack:**
- Express.js framework
- Express Validator for input validation
- JWT for authentication
- Bcrypt for password security

### 3. Data Access Layer

**Location:** `Backend/models/`

**Responsibilities:**
- Database schema definition
- Data validation rules
- Query methods

**Data Models:**
```
User
├─ username (unique)
├─ email (unique)
├─ password (hashed)
├─ reputation (default: 0)
├─ role (user|moderator|admin)
└─ profile data (avatar, bio, badges, etc.)

Question
├─ title
├─ content (rich HTML)
├─ author (ref: User)
├─ tags (array of strings)
├─ votes (up/down)
├─ answers (array ref: Answer)
├─ acceptedAnswer (ref: Answer)
├─ views (counter)
└─ status (open|closed|deleted)

Answer
├─ content (rich HTML)
├─ author (ref: User)
├─ question (ref: Question)
├─ votes (up/down)
├─ isAccepted (boolean)
├─ comments (nested array)
└─ edited (metadata)

Tag
├─ name (unique, lowercase)
├─ description
├─ color (hex code)
├─ questionCount
├─ followers (array ref: User)
└─ featured (boolean)

Notification
├─ recipient (ref: User)
├─ sender (ref: User)
├─ type (enum)
├─ title & message
├─ link & data
└─ isRead (boolean)
```

### 4. Persistence Layer

**Technology:** MongoDB with Mongoose ODM

**Collections:**
- users
- questions
- answers
- tags
- notifications

**Indexes:**
```javascript
// Questions
- title text search + content
- tags for filtering
- createdAt for sorting
- votes.up for ranking

// Users
- username (unique)
- email (unique)

// Answers
- question for finding answers
- author for user content
- createdAt for sorting
```

---

## Data Flow

### User Registration Flow
```
1. User fills registration form (Frontend)
   ↓
2. Frontend validates input (React Hook Form)
   ↓
3. POST /api/auth/register (Axios)
   ↓
4. Backend validates input (Express Validator)
   ↓
5. Check if user exists (MongoDB query)
   ↓
6. Hash password (Bcrypt)
   ↓
7. Create user document (MongoDB)
   ↓
8. Generate JWT token
   ↓
9. Return token + user data (Frontend storage)
   ↓
10. Redirect to dashboard (React Router)
```

### Question Creation Flow
```
1. User fills question form (Frontend)
   ↓
2. Rich text editor captures HTML (React Quill)
   ↓
3. Frontend validates form
   ↓
4. POST /api/questions with JWT token
   ↓
5. Backend validates JWT (protect middleware)
   ↓
6. Backend validates question data (Express Validator)
   ↓
7. Create question document with author (MongoDB)
   ↓
8. Return created question (with ID)
   ↓
9. Frontend shows success message
   ↓
10. Redirect to question detail page
```

### Real-time Notification Flow
```
1. Answer posted on question (User A)
   ↓
2. Backend creates Answer document
   ↓
3. Backend creates Notification for question author
   ↓
4. Socket.io emits 'new-notification' to recipient's socket
   ↓
5. Frontend receives notification (Socket.io listener)
   ↓
6. Update notification count
   ↓
7. Show toast notification to user (React Hot Toast)
```

---

## Authentication & Authorization

### JWT Authentication Flow
```
┌─────────────┐
│   User      │ Sends credentials
└──────┬──────┘
       │
       ▼
   ┌────────────────────────────┐
   │ Backend /auth/login        │
   │ 1. Validate credentials    │
   │ 2. Compare password hashes │
   │ 3. Generate JWT token      │
   └────────────┬───────────────┘
                │
                ▼
   ┌─────────────────────────────┐
   │ Token sent to Frontend      │
   │ Stored in localStorage      │
   └────────────┬────────────────┘
                │
                ▼
   ┌─────────────────────────────┐
   │ All API requests include    │
   │ Authorization: Bearer token │
   └────────────┬────────────────┘
                │
                ▼
   ┌─────────────────────────────┐
   │ Backend protect middleware  │
   │ 1. Extract token from header
   │ 2. Verify token signature   │
   │ 3. Check token expiration   │
   │ 4. Attach user to request   │
   │ 5. Call next() or reject    │
   └─────────────────────────────┘
```

### Role-Based Access Control
```
User Roles:
├─ user (default)
│  ├─ Can create/edit own questions
│  ├─ Can post answers
│  ├─ Can vote on answers
│  └─ Can browse content
│
├─ moderator
│  ├─ All user permissions
│  ├─ Can flag content
│  ├─ Can edit others' content
│  └─ Can manage comments
│
└─ admin
   ├─ All moderator permissions
   ├─ Can delete questions/answers
   ├─ Can manage users
   ├─ Can export statistics
   └─ Can configure settings
```

---

## Request/Response Cycle

### Standard Request Format
```javascript
// Frontend sends
{
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIs...',
    'Content-Type': 'application/json'
  },
  body: {
    // Request payload
  }
}
```

### Standard Response Format
```javascript
// Backend responds
{
  success: true,           // Request successful
  message: "Operation successful",
  data: {                  // Response payload
    id: "507f1f77bcf86cd799439011",
    // ... data fields
  },
  timestamp: "2025-03-31T10:30:00Z"
}

// Or error response
{
  success: false,
  message: "Error description",
  errors: [
    {
      field: "email",
      message: "Invalid email format"
    }
  ],
  statusCode: 400
}
```

---

## WebSocket (Real-time Features)

### Socket.io Architecture
```
Frontend Socket Connection:
const socket = io('http://localhost:5000', {
  auth: { token: JWT_TOKEN }
});

Socket Events:
├─ connection        - Client connects
├─ join-user        - User joins their notification room
├─ disconnect       - User disconnects
├─ new-notification - Receive notification (server → client)
├─ answer-posted    - New answer notification
├─ question-answered- Notification for question author
├─ user-mentioned   - Mention notification
└─ typing          - Real-time typing indicator (future)
```

### Real-time Notification Rooms
```
User-specific rooms: user_${userId}
- Only that user receives messages sent to their room
- Server joins user to room on connection
- Server leaves user on disconnect

Example:
socket.join(`user_507f1f77bcf86cd799439011`);
io.to(`user_507f1f77bcf86cd799439011`).emit('new-notification', notification);
```

---

## Error Handling Strategy

### Error Hierarchy
```
┌─ FrontendError (Handled by UI)
│  ├─ Validation errors → Show form errors
│  ├─ Network errors → Show retry toast
│  └─ Authentication errors → Redirect to login
│
└─ BackendError (Express middleware)
   ├─ ValidationError (400)
   │  └─ Express Validator catches
   ├─ AuthenticationError (401)
   │  └─ JWT verification fails
   ├─ AuthorizationError (403)
   │  └─ User lacks permissions
   ├─ NotFoundError (404)
   │  └─ Resource doesn't exist
   └─ ServerError (500)
      └─ Unexpected error
```

### Error Handler Middleware
```javascript
app.use(errorHandler) // Location: middleware/errorHandler.js
|
├─ Catches all thrown errors
├─ Logs error details
├─ Formats error response
└─ Sends appropriate status + message
```

---

## Security Implementation

### Input Validation
```
Frontend:
└─ React Hook Form validation
   ├─ Required fields
   ├─ Email format
   ├─ Password strength
   └─ Length constraints

Backend (Defense in Depth):
└─ Express Validator
   ├─ Sanitize inputs
   ├─ Validate format
   ├─ Check against schema
   └─ Prevent injection attacks
```

### Password Security
```
1. Frontend: Password sent over HTTPS only
2. Backend: Receive password
3. Hash with Bcrypt:
   - Salt rounds: 12
   - Cost factor: 2^12 iterations
   - Time: ~250ms per hash
4. Store hashed password (not plain text)
5. On login: Compare submitted password with stored hash
```

### Token Security
```
JWT Token Structure:
Header.Payload.Signature

Example:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJpZCI6IjVmN2YwZTU5MzY5YjIyMDAwYTdmZmIwYiIsImlhdCI6MTYwMjc2MDA1MiwiZXhwIjoxNjA1MzUyMDUyfQ.
A_5Y9pKqj5PxH_3kY0AhQ9X8oV0K7r2yX3Z5wL1m0N4

Token Claims:
- iss (issuer): Application name
- sub (subject): User ID
- aud (audience): Application
- iat (issued at): Timestamp
- exp (expiration): Timestamp
- role: User role
```

---

## Performance Optimization

### Database Optimization
```
1. Indexing
   ├─ Create index on frequently queried fields
   ├─ Indexes on: tags, createdAt, userId
   └─ Text indexes for search

2. Query Optimization
   ├─ Use projection to select only needed fields
   ├─ Use pagination instead of fetching all
   ├─ Populate references selectively
   └─ Lean queries for read-only operations

3. Caching (Future)
   ├─ Redis for session storage
   ├─ Cache popular questions
   └─ Cache tag frequencies
```

### Frontend Optimization
```
1. Code Splitting
   ├─ Lazy load pages with React.lazy()
   ├─ Separate bundles for different routes
   └─ Load only what's needed

2. Image Optimization
   ├─ Optimize image sizes
   ├─ Use WebP format
   └─ Lazy load images

3. Bundle Size
   ├─ Tree shaking unused code
   ├─ Minify and compress
   └─ Monitor with Webpack Analyzer
```

### API Optimization
```
1. Rate Limiting
   ├─ 100 requests per 15 minutes per IP
   ├─ Prevents DDoS and abuse
   └─ Returns 429 Too Many Requests

2. Response Compression
   ├─ Gzip compression enabled
   ├─ Reduces payload size 70%
   └─ Transparent to client

3. Pagination
   ├─ Default limit: 10 items
   ├─ Maximum limit: 100 items
   ├─ Cursor-based (future)
   └─ Reduces memory usage
```

---

## Scalability Considerations

### Vertical Scaling (Current)
- Single server deployment
- Suitable for < 100k users
- Easy to manage and debug

### Horizontal Scaling (Future)
```
Load Balancer
├─ Server 1 (API instance)
├─ Server 2 (API instance)
└─ Server 3 (API instance)
    │
    ▼
Shared MongoDB (cluster)
```

### Database Scaling
```
Current: Single MongoDB database
Future:
├─ Read replicas for queries
├─ Sharding by user/question ID
├─ Archive old data
└─ Backup strategy
```

---

## Deployment Architecture

### Development
```
Local Machine
├─ Frontend: http://localhost:5173
├─ Backend: http://localhost:5000
└─ MongoDB: localhost:27017
```

### Production
```
┌─────────────────────────────┐
│   GitHub Repository         │
│   (Source of truth)         │
└────────────┬────────────────┘
             │
    Push ────┴──── Auto-deploy
             │
┌────────────▼────────────────┐
│  Frontend (Netlify)         │
│  https://stackit-odoo...    │
└────────────────────────────┘

┌────────────────────────────┐
│  Backend (Render)          │
│  https://stackit-backend..│
└────────────┬───────────────┘
             │
┌────────────▼────────────────┐
│  MongoDB Atlas              │
│  (Managed cloud database)   │
└────────────────────────────┘
```

---

## Monitoring & Logging

### Application Logging
```
Levels (Backend):
├─ ERROR: Critical failures
├─ WARN: Potential issues
├─ INFO: Important events
└─ DEBUG: Detailed information

What to Log:
├─ API requests (method, path, status)
├─ Database queries
├─ Authentication events
├─ Errors and exceptions
└─ Performance metrics
```

### Error Tracking (Future)
```
Implement with Sentry:
├─ Capture frontend errors
├─ Capture backend errors
├─ Group similar errors
├─ Alert on critical errors
└─ Performance monitoring
```

---

## Disaster Recovery

### Backup Strategy
```
Database Backups:
├─ MongoDB Atlas automatic backups
├─ Daily incremental backups
├─ Point-in-time recovery
└─ 30-day retention

Code Backup:
├─ GitHub is source of truth
├─ All commits preserved
└─ Release tags for versions
```

### Availability
```
Current: Single instance
- Single point of failure
- Manual restart needed
- ~1 hour expected downtime

Future: High Availability
├─ Multiple backend instances
├─ Load balancer
├─ Auto-recovery
└─ < 5 minutes downtime target
```

---

## Future Architecture Improvements

### Short-term (3-6 months)
- [ ] Add caching layer (Redis)
- [ ] Implement database indexing optimization
- [ ] Add comprehensive logging
- [ ] Set up error tracking (Sentry)
- [ ] Performance monitoring & alerts

### Medium-term (6-12 months)
- [ ] Horizontal scaling (multiple instances)
- [ ] Database read replicas
- [ ] Message queue (for background jobs)
- [ ] Search engine (Elasticsearch)
- [ ] Image CDN integration

### Long-term (1-2 years)
- [ ] Microservices architecture
- [ ] Kubernetes deployment
- [ ] Global CDN
- [ ] Database sharding
- [ ] Real-time collaboration features

---

**System designed for scalability, security, and maintainability.**

Last Updated: March 31, 2026
