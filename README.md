# Sugiyog (सुगियोग)

> Global Nadi Shastra consultation and appointment-booking platform built around the personal brand of Swami Ji.

Sugiyog connects seekers worldwide with authentic Nadi Shastra wisdom through both in-person visits across global destinations and high-quality online consultations. Swami Ji's administrative team manages travel itineraries, city visit availability, time slots, inquiries, and booking workflows through a robust back-office system.

---

## Architecture Overview

- **Frontend**: React 18, Vite, React Router v6, Axios, Lucide React, Custom CSS Design System
- **Backend**: Node.js (ES Modules), Express.js, Prisma ORM, MySQL 8.0+ / MariaDB, JWT, bcryptjs, Helmet, CORS, Morgan, express-rate-limit
- **Database**: MySQL 8.0+ / MariaDB with Prisma ORM (all migrations & models versioned in `backend/prisma`)
- **Documentation**: Located in `docs/`

---

## Directory Layout

```
Sugiyog/
├── frontend/             # React + Vite client application
├── backend/              # Node.js + Express + Prisma REST API
├── docs/                 # Architecture, Schema, and Development guides
├── .gitignore            # Git exclusions
├── README.md             # Project overview
└── package.json          # Root scripts orchestrator
```

---

## Quick Start

### 1. Prerequisites
- Node.js >= 18.x (tested on v24.x)
- MySQL 8.0+ or MariaDB 10.4+ running on port `3306`

### 2. Install Dependencies
```bash
npm install
npm install --prefix backend
npm install --prefix frontend
```

### 3. Setup Backend Environment & Database
```bash
cd backend
cp .env.example .env
# Update .env with your MySQL credentials
npx prisma generate
npx prisma migrate dev --name init
npm run db:seed
```

### 4. Setup Frontend Environment
```bash
cd ../frontend
cp .env.example .env
```

### 5. Run Concurrently
From the root directory:
```bash
npm run dev
```

Frontend runs on: `http://localhost:5173`  
Backend API runs on: `http://localhost:5000` (API base: `http://localhost:5000/api/v1`)
