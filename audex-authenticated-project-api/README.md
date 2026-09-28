# Audex — Authenticated Project API

## Overview

**Audex** is a RESTful backend API built with **Node.js, TypeScript, Express, and MongoDB** that provides secure user authentication and **role-based project management**.

The API issues a **JWT stored in an httpOnly cookie** on login, and every protected route reads that cookie to determine the authenticated user's identity and role. Project data returned by the API is automatically scoped based on that role — this role-based data scoping is the core requirement validated throughout this documentation.

---

## Features

- User registration with role assignment (`ADMIN`, `MANAGER`, `USER`)
- Secure login with JWT authentication via httpOnly cookies
- Password hashing with bcryptjs
- Request validation using Joi
- Role-based access control (RBAC) for project data
- Global error handling middleware
- Database seeding script with pre-built test accounts
- Automated testing with Jest + ts-jest
- Verified end-to-end behavior via Postman

---

## Tech Stack

| Layer            | Technology            |
| ---------------- | --------------------- |
| Runtime          | Node.js               |
| Language         | TypeScript            |
| Framework        | Express v5            |
| Database         | MongoDB + Mongoose    |
| Authentication   | JWT (httpOnly cookie) |
| Password Hashing | bcryptjs              |
| Validation       | Joi                   |
| Testing          | Jest + ts-jest        |

---

## Project Structure

```text
src/
├── config/
│   └── db.ts                    # MongoDB connection
├── middlewares/
│   ├── auth.middleware.ts        # JWT verification
│   ├── error.middleware.ts       # Global error handler
│   └── validate.middleware.ts    # Joi request validation
├── modules/
│   ├── auth/
│   │   ├── auth.controller.ts    # Register & Login logic
│   │   ├── auth.model.ts         # User schema
│   │   ├── auth.routes.ts        # Auth routes
│   │   └── auth.validation.ts    # Joi schemas
│   └── project/
│       ├── project.controller.ts # Project logic
│       ├── project.model.ts      # Project schema
│       ├── project.routes.ts     # Project routes
│       └── project.test.ts       # Tests
├── seed/
│   └── seed.ts                   # Database seeder
├── app.ts                        # Express app setup
└── server.ts                     # Entry point
```

---

## Environment Variables

Create a `.env` file in the project root:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/task-one
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

| Variable     | Description                        |
| ------------ | ---------------------------------- |
| `PORT`       | Port the server runs on            |
| `MONGO_URI`  | MongoDB connection string          |
| `JWT_SECRET` | Secret key used to sign JWT tokens |
| `NODE_ENV`   | `development` or `production`      |

---

## Installation

```bash
# Clone the repository
git clone https://github.com/your-username/audex.git
cd audex

# Install dependencies
npm install
```

Configure your `.env` file as shown above, then optionally seed the database:

```bash
npm run seed
```

> ⚠️ The seed script **deletes all existing users and projects** before inserting new data.

**Seeded test accounts:**

| Name    | Email            | Password     | Role    |
| ------- | ---------------- | ------------ | ------- |
| Admin   | admin@test.com   | Password@123 | ADMIN   |
| Manager | manager@test.com | Password@123 | MANAGER |
| User    | user@test.com    | Password@123 | USER    |

Each seeded account has one associated project created automatically.

---

## Running the Application

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

The server runs at:

```text
http://localhost:5000
```

---

## API Endpoints

### Base URL: `http://localhost:5000`

| Method | Endpoint             | Auth Required | Description              |
| ------ | -------------------- | ------------- | ------------------------ |
| GET    | `/`                  | No            | API health check         |
| POST   | `/api/auth/register` | No            | Register a new user      |
| POST   | `/api/auth/login`    | No            | Login and get token      |
| GET    | `/api/projects`      | Yes           | Get role-scoped projects |

---

### Register

```http
POST /api/auth/register
```

**Request Body:**

```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "Admin@123456",
  "role": "ADMIN"
}
```

**Response `201`:**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "<user_id>",
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "ADMIN"
  }
}
```

**Status:** `201 Created` ✅ _(Verified in Postman — see Evidence section)_

---

### Login

```http
POST /api/auth/login
```

**Request Body:**

```json
{
  "email": "admin@example.com",
  "password": "Admin@123456"
}
```

**Response `200`:**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "id": "<user_id>",
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "ADMIN"
  }
}
```

**Login Flow:**

```text
Login
  ↓
Validate credentials
  ↓
Generate JWT
  ↓
Set httpOnly Cookie (accessToken)
```

On successful login, an `accessToken` cookie is set automatically. This cookie is:

- **httpOnly** — not accessible via JavaScript
- **secure** — sent over HTTPS only in production
- **sameSite: strict** — protected against CSRF
- Valid for **24 hours**

---

### Get Projects

```http
GET /api/projects
```

No `Authorization` header is required. Authentication is handled automatically via the **httpOnly `accessToken` cookie** set during login, and read by `auth.middleware.ts` on every protected request.

**Role-Based Response Behavior:**

| Role    | Data Returned     |
| ------- | ----------------- |
| ADMIN   | All projects (3)  |
| MANAGER | Own projects only |
| USER    | Own projects only |

This confirms the core requirement of the task: **the API returns role-appropriate project data.**

---

## Authentication

Authentication is implemented using **JWT (JSON Web Tokens)** combined with **httpOnly cookies**:

1. On login, the server validates the user's credentials (password checked via `bcryptjs`).
2. A signed JWT is generated containing the user's ID and role.
3. The JWT is set as an `accessToken` **httpOnly, secure, sameSite: strict** cookie — never exposed to client-side JavaScript.
4. Subsequent requests are authenticated automatically via this cookie through `auth.middleware.ts`, with no need to manually attach an `Authorization` header.
5. The cookie expires after **24 hours**.

---

## Role-Based Access

The system supports three roles, embedded in the JWT payload and verified on every protected request:

| Role      | Access                                  |
| --------- | --------------------------------------- |
| `ADMIN`   | Can view **all** projects in the system |
| `MANAGER` | Can view only their **own** projects    |
| `USER`    | Can view only their **own** projects    |

This logic is enforced at the controller/service layer in `project.controller.ts`, ensuring role checks cannot be bypassed by manipulating request parameters.

---

## Validation & Error Handling

- All incoming requests are validated using **Joi** schemas (`auth.validation.ts`) before reaching business logic, via `validate.middleware.ts`.
- Invalid or missing fields return structured error responses with appropriate HTTP status codes.
- Authentication failures (invalid credentials, missing/expired token) return `401 Unauthorized`.
- Unauthorized role access returns `403 Forbidden`.
- All errors are funneled through a centralized `error.middleware.ts` for consistent response formatting.

---

## Testing

Run the test suite with:

```bash
npm test
```

Tests are located in `src/modules/project/project.test.ts` and use **Jest** with **ts-jest** for TypeScript support.

```text
PASS  src/modules/project/project.test.ts

Project Role Access
  ✓ should allow ADMIN to access all projects

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
```

---

## Postman Evidence

The following results were manually verified using Postman:

### 1. Register

```text
POST /api/auth/register
Status: 201 Created ✅
```

### 2. ADMIN — Get Projects

```text
GET /api/projects
Status: 200 OK
count: 3 ✅
```

### 3. USER — Get Projects

```text
GET /api/projects
Status: 200 OK
count: 1 ✅
```

### 4. MANAGER — Get Projects

```text
GET /api/projects
Status: 200 OK
Own Projects ✅
```

---

## Summary

This documentation confirms the three pillars of the Audex API implementation:

```text
                 Audex API
                    │
        ┌───────────┼───────────┐
        ↓           ↓           ↓
      Code      Postman       Jest
        ✅          ✅           ✅
```

- **Code** — Implements authentication, JWT httpOnly cookie handling, and role-based access control.
- **Postman** — Confirms real API behavior for Register, Login, and role-scoped `GET /api/projects`.
- **Jest** — Confirms automated test coverage for role-based access logic.
