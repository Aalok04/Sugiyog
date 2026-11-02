# Sugiyog — Full-Stack Development & Operations Guide

## 1. Prerequisites

Before running the application locally, ensure you have:
1. **Node.js**: v18.0.0 or higher (Tested on Node v24.x)
2. **npm**: v9.0.0 or higher (Tested on npm 11.x)
3. **MySQL Server**: 8.0+ or MariaDB 10.4+ running locally on port `3306`
4. **Git**

---

## 2. Environment Configuration

### A. Backend (`backend/.env`)
Copy `backend/.env.example` to `backend/.env` and update credentials:
```ini
PORT=5000
NODE_ENV=development
DATABASE_URL="mysql://root:@127.0.0.1:3306/sugiyog_db"
JWT_SECRET=sugiyog_super_secret_jwt_key_development_2026_secure
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

> **Note on URL Encoding**: If your MySQL password contains special characters like `@`, `#`, `?`, or `:`, they must be percent-encoded (e.g. `@` becomes `%40`).

### B. Frontend (`frontend/.env`)
Copy `frontend/.env.example` to `frontend/.env`:
```ini
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

---

## 3. Database Initialization & Prisma Workflows

### Step 1: Create Database
In MySQL CLI or phpMyAdmin:
```sql
CREATE DATABASE IF NOT EXISTS sugiyog_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Step 2: Generate Prisma Client
```bash
cd backend
npm run prisma:generate
```

### Step 3: Run Database Migrations
```bash
npm run prisma:migrate
```
This applies all versioned migrations in `backend/prisma/migrations/`.

### Step 4: Seed Development Records
```bash
npm run db:seed
```
This creates:
- 6 Default Roles (`SUPER_ADMIN`, `ADMIN`, `ASSISTANT`, `BOOKING_MANAGER`, `FINANCE_MANAGER`, `CONTENT_MANAGER`)
- System Permissions
- Safe Seed Administrative Accounts:
  - **Super Admin**: `superadmin@sugiyog.org` / `SugiyogAdmin@2026`
  - **Swami Ji Assistant**: `assistant@sugiyog.org` / `AssistantSugiyog@2026`
- 4 Consultation Services (Kaanda 1 General Overview, Career & Prosperity, Family Compatibility, Health & Remedies)
- 1 Published Travel Visit (New Delhi Spiritual Tour)
- Associated availability slots for in-person and online sessions
- Default Site Metadata & Policies

### Optional: Prisma Studio GUI
To inspect records visually in your browser:
```bash
npm run prisma:studio
```

---

## 4. Running the Application

### Option A: Run Both Concurrently (Recommended)
From the root directory:
```bash
npm run dev
```
This boots:
- Backend REST API at `http://localhost:5000`
- Frontend React Client at `http://localhost:5173`

### Option B: Run Individually
In terminal 1 (Backend):
```bash
npm run dev:backend
```

In terminal 2 (Frontend):
```bash
npm run dev:frontend
```

---

## 5. Verifying the Setup

1. **Verify Backend Health**:
   Open `http://localhost:5000/api/v1/health` in your browser. You should receive:
   `"status": "HEALTHY", "database": { "status": "CONNECTED" }`.
2. **Access Public Frontend**:
   Open `http://localhost:5173` to explore the homepage, services, and upcoming visits.
3. **Access Admin Portal**:
   Navigate to `http://localhost:5173/admin/login` and authenticate with:
   - Email: `superadmin@sugiyog.org`
   - Password: `SugiyogAdmin@2026`
   or
   - Email: `assistant@sugiyog.org`
   - Password: `AssistantSugiyog@2026`
