# TrackIT - Backend Issue Tracking System

A RESTful backend API for issue and bug tracking, built with **Node.js**, **Express.js**, **MongoDB**, and **JWT authentication**. This project demonstrates clean backend architecture suitable for integration with any frontend framework.

---

## 📋 Project Overview

**TrackIT** is a backend-only issue tracking system designed to manage bugs and tasks efficiently. It provides secure authentication, CRUD operations for issues, issue assignment, and status tracking. The API is production-ready and can be integrated with React, Angular, Vue, or any other frontend framework.

---

## ✨ Features

- **User Authentication**: Secure registration and login with JWT-based authentication
- **Issue Management**: Create, read, update, and delete issues
- **Status Tracking**: Track issues with statuses: `open`, `in-progress`, `closed`
- **Priority Levels**: Assign priority levels: `low`, `medium`, `high`
- **Issue Assignment**: Assign issues to specific users
- **Clean Architecture**: Organized code structure with routes, controllers, and service layers
- **Input Validation**: Request validation and meaningful error messages
- **Secure**: JWT token-based authentication and password hashing with bcrypt

---

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcrypt
- **Environment Variables**: dotenv
- **Logging**: Morgan

---

## 📁 Project Folder Structure

```
TrackIT/
├── src/
│   ├── config/
│   │   └── db.js                 # MongoDB connection setup
│   ├── controllers/
│   │   ├── auth.controller.js    # Authentication logic (register, login)
│   │   └── issue.controller.js   # Issue CRUD and assignment logic
│   ├── middleware/
│   │   └── auth.middleware.js    # JWT verification middleware
│   ├── models/
│   │   ├── user.model.js         # User schema (name, email, password, role)
│   │   └── issue.model.js        # Issue schema (title, description, status, priority, etc.)
│   ├── routes/
│   │   ├── auth.routes.js        # Auth endpoints
│   │   └── issue.routes.js       # Issue endpoints
│   ├── services/
│   │   └── issue.service.js      # Business logic for issues
│   └── app.js                     # Main application entry point
├── .env                           # Environment variables (not committed)
├── .gitignore                     # Git ignore file
├── package.json                   # Project dependencies
└── README.md                      # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AnshS-GIT/TrackIT.git
   cd TrackIT
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/trackit
   JWT_SECRET=your_super_secret_jwt_key_here
   ```

   > ⚠️ **Important**: The `.env` file contains sensitive information and is **NOT committed to GitHub**. It is listed in `.gitignore` to prevent accidental exposure of secrets.

4. **Run the application**
   ```bash
   # Development mode (with auto-restart)
   npm run dev

   # Production mode
   npm start
   ```

5. **Verify the server is running**
   
   Visit: `http://localhost:3000/health`
   
   You should see:
   ```json
   {
     "status": "success",
     "message": "TrackIT backend is running"
   }
   ```

---

## 🔐 Environment Variables

This project uses **environment variables** to manage sensitive configuration:

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port number | `3000` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/trackit` |
| `JWT_SECRET` | Secret key for JWT signing | `mysecretkey123` |

### Security Best Practices

- ✅ The `.env` file is included in `.gitignore`
- ✅ Never commit `.env` to version control
- ✅ Use strong, random values for `JWT_SECRET`
- ✅ Share `.env.example` (without actual values) with team members

---

## 📡 API Documentation

### Base URL
```
http://localhost:3000
```

---

### **Authentication APIs**

#### 1. Register User
**POST** `/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "userId": "507f1f77bcf86cd799439011"
}
```

---

#### 2. Login User
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

> 💡 Use the returned `token` in the `Authorization` header for all protected routes:
> ```
> Authorization: Bearer <token>
> ```

---

### **Issue APIs** (Protected)

All issue endpoints require JWT authentication.

#### 3. Create Issue
**POST** `/issues`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Login page crashes",
  "description": "App crashes when wrong password is entered",
  "priority": "high"
}
```

**Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Login page crashes",
  "description": "App crashes when wrong password is entered",
  "status": "open",
  "priority": "high",
  "createdBy": "507f191e810c19729de860ea",
  "assignedTo": null,
  "createdAt": "2026-01-10T14:20:23.052Z",
  "updatedAt": "2026-01-10T14:20:23.052Z"
}
```

---

#### 4. Get All Issues
**GET** `/issues`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Login page crashes",
    "description": "App crashes when wrong password is entered",
    "status": "open",
    "priority": "high",
    "createdBy": {
      "_id": "507f191e810c19729de860ea",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "assignedTo": null,
    "createdAt": "2026-01-10T14:20:23.052Z",
    "updatedAt": "2026-01-10T14:20:23.052Z"
  }
]
```

---

#### 5. Get Issue by ID
**GET** `/issues/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Login page crashes",
  "status": "open",
  "priority": "high",
  ...
}
```

**Error (404):**
```json
{
  "message": "Issue not found"
}
```

---

#### 6. Update Issue
**PUT** `/issues/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "status": "closed",
  "priority": "low"
}
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "status": "closed",
  "priority": "low",
  ...
}
```

---

#### 7. Delete Issue
**DELETE** `/issues/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Issue deleted successfully"
}
```

---

#### 8. Assign Issue to User
**PUT** `/issues/:id/assign`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "assignedTo": "507f191e810c19729de860ea"
}
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Login page crashes",
  "assignedTo": {
    "_id": "507f191e810c19729de860ea",
    "name": "Jane Smith",
    "email": "jane@example.com"
  },
  ...
}
```

**Error (404):**
```json
{
  "message": "User not found"
}
```

---

## 🧪 Testing the API

### Using cURL

**Example 1: Register a user**
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

**Example 2: Login**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

**Example 3: Create an issue (use token from login)**
```bash
curl -X POST http://localhost:3000/issues \
  -H "Authorization: Bearer <your_token_here>" \
  -H "Content-Type: application/json" \
  -d '{"title":"Bug in homepage","description":"Fix navbar alignment","priority":"medium"}'
```

**Example 4: Get all issues**
```bash
curl -X GET http://localhost:3000/issues \
  -H "Authorization: Bearer <your_token_here>"
```

### Using Postman

1. **Import the following into Postman:**
   - Create a new collection called "TrackIT"
   - Add requests for each endpoint listed above

2. **Set up environment variables in Postman:**
   - `base_url`: `http://localhost:3000`
   - `token`: (obtained after login)

3. **Test workflow:**
   - Register a user → Login → Copy token
   - Use token in Authorization header (Bearer Token) for issue endpoints
   - Test CRUD operations and assignment

---

## 🔗 Frontend Integration

This backend is **frontend-ready** and can be integrated with:
- **React**, **Angular**, **Vue.js**, or any JavaScript framework
- **Mobile apps** (React Native, Flutter)
- **Desktop apps** (Electron)

Simply make HTTP requests to the API endpoints using `fetch`, `axios`, or any HTTP client.

---

## 🚧 Future Enhancements

Potential improvements for production use:

- **Role-Based Access Control (RBAC)**: Admin vs regular user permissions
- **Filtering & Pagination**: Query issues by status, priority, assignee
- **Email Notifications**: Notify users when assigned to issues
- **File Attachments**: Upload screenshots or documents to issues
- **Comments/Activity Log**: Track issue history and discussions
- **Search Functionality**: Full-text search across issues
- **Rate Limiting**: Prevent API abuse
- **Unit & Integration Tests**: Add test coverage with Jest/Mocha