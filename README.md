# CampusOS – Complete University Management Ecosystem

CampusOS is a production-quality, centralized university management SaaS platform engineered to seamlessly connect students, faculty members, and university administrators. Built with a modern, high-velocity design inspired by Linear, Notion, and Stripe Dashboard, CampusOS delivers real-time event distribution, role-based data isolation, and comprehensive academic operations.

---

## 🚀 Key Highlights & Architectural Features

- **Multi-Role Access Control (RBAC):** Dedicated workspaces for **Students**, **Faculty**, and **Administrators** with strict JWT claims verification and route guards.
- **Event-Driven Real-Time Bus:** Instant notifications powered by **Socket.io** for assignment releases, grades, roll-call attendance, hostel issue updates, and emergency bulletins.
- **Statutory Attendance Engine:** Automatic per-subject attendance percentages, cumulative attendance tracking, and threshold alerts for students falling below the mandatory 75% limit.
- **Coursework & Assessment Pipeline:** Faculty assignment authoring with document distribution, student submission with file uploads (Multer), inline grading, and feedback loops.
- **Formal Examinations & Results:** Examination timetabling, room assignment, faculty marks uploading, and student grade cards.
- **Facilities & Hostel Grievance Triage:** Student ticket logging by category (Plumbing, Wi-Fi, Electrical, Cleanliness), live status tracking, and administrator triage notes.
- **Peer Knowledge Forum:** Academic discussion threads, subject filters, nested responses, and upvoting.
- **Visual Analytics:** Interactive charts powered by **Recharts** displaying department-wise student density, attendance health, and maintenance ticket velocity.
- **Enterprise Security:** bcrypt password hashing, HTTP security headers (`Helmet`), CORS policies, express-rate-limiting, Zod schema validation, and SQL injection protection via Prisma ORM.

---

## 🛠️ Technology Stack

### Frontend
- **Framework:** React 18 + Vite
- **Styling & Design System:** Tailwind CSS (custom dark/light tokens)
- **Icons:** Lucide React
- **Charts & Telemetry:** Recharts
- **Networking:** Axios with Bearer token interceptors
- **Routing:** React Router v6
- **Real-Time Client:** Socket.io-client

### Backend
- **Runtime:** Node.js (v20+)
- **API Framework:** Express.js (Modular MVC architecture)
- **Authentication:** JWT (JSON Web Tokens) & bcryptjs
- **Validation Engine:** Zod
- **File Upload Subsystem:** Multer
- **Email Service:** Nodemailer (with development fallback)
- **Real-Time Engine:** Socket.io

### Database & ORM
- **Database Engine:** PostgreSQL 16
- **ORM:** Prisma Client with 20 relational models and automated migrations

### Infrastructure & DevOps
- **Containerization:** Docker & Docker Compose
- **Continuous Integration:** GitHub Actions CI/CD pipeline
- **Static Hosting:** Nginx / Vercel
- **API Hosting:** Render / Docker Runner

---

## 📂 Repository Directory Layout

```
campusos/
├── docker-compose.yml              # PostgreSQL + Backend + Frontend orchestration
├── .github/workflows/ci.yml        # GitHub Actions continuous integration
│
├── server/                         # Backend Application (Express + Prisma)
│   ├── Dockerfile
│   ├── package.json
│   ├── .env.example
│   ├── prisma/
│   │   ├── schema.prisma           # Complete 20-model PostgreSQL schema
│   │   └── seed.js                 # Institutional seed dataset
│   ├── uploads/                    # Local storage volume for attachments
│   └── src/
│       ├── config/                 # Prisma DB singleton & Socket.io server
│       ├── controllers/            # Module controllers (Auth, Academic, Attendance, etc.)
│       ├── middleware/             # Auth, RBAC, Zod, Multer, Error handlers
│       ├── routes/                 # Master and domain route aggregators
│       ├── validators/             # Zod schema definitions
│       ├── utils/                  # JWT token, response formatters, mailers
│       ├── app.js                  # Express application setup
│       └── server.js               # HTTP & Socket.io server entry
│
└── client/                         # Frontend Application (React 18 + Vite)
    ├── Dockerfile
    ├── nginx.conf
    ├── package.json
    ├── tailwind.config.js
    ├── vite.config.js
    └── src/
        ├── components/
        │   ├── common/             # Button, Card, Badge, Modal, Skeleton
        │   └── layout/             # Sidebar, Navbar, DashboardLayout
        ├── context/                # AuthContext, SocketContext, ThemeContext
        ├── pages/
        │   ├── auth/               # Login (with Demo buttons), Register, ForgotPassword
        │   ├── student/            # Dashboard, Attendance, Assignments, Exams, Hostel, Forum
        │   ├── faculty/            # Dashboard, RollCall, AssignmentManager, MarksUpload
        │   └── admin/              # Analytics Dashboard, Cohort, Faculty, Depts, Timetable
        ├── services/               # Axios API client
        ├── App.jsx                 # Route hierarchy & role guards
        └── main.jsx
```

---

## ⚡ Quick Start Guide (Local Development)

### Prerequisites
- Node.js (v18+)
- PostgreSQL (or run via Docker)

### 1. Database Setup
Ensure PostgreSQL is running locally or start it via Docker:
```bash
docker run --name campusos_pg -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=campusos_db -p 5432:5432 -d postgres:16-alpine
```

### 2. Backend Initialization
```bash
cd server
npm install

# Push database schema & generate Prisma client
npx prisma db push
npx prisma generate

# Populate sample university database (Students, Faculty, Courses, Attendance, Assignments)
npm run prisma:seed

# Start backend development server
npm run dev
# -> Running at http://localhost:5000/api/v1
```

### 3. Frontend Initialization
In a separate terminal:
```bash
cd client
npm install
npm run dev
# -> Running at http://localhost:5173
```

---

## 🔑 Demo Access Credentials

The database seed provides ready-to-test accounts with pre-loaded mock courses, attendance logs, and assignments:

| Role | Email | Password | Pre-loaded Workspaces |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@campusos.edu` | `Admin@123456` | Complete system telemetry, user directories, curriculum catalog, hostel triage |
| **Faculty Member** | `faculty.johnson@campusos.edu` | `Faculty@123456` | Data Structures (CS301), Web Dev (CS304), roll-call roster, grading drawer |
| **Student (Alex)** | `student.alex@campusos.edu` | `Student@123456` | B.Tech CSE Semester 5, active attendance charts, assignment submissions, hostel room |
| **Student (Sarah)** | `student.sarah@campusos.edu` | `Student@123456` | Peer student cohort member |

*Tip: You can click the one-click demo persona buttons directly on the `/login` screen to sign in instantly.*

---

## 🚢 Production Deployment

### Docker Compose
Run the entire ecosystem with a single command:
```bash
docker-compose up --build -d
```
- Frontend available at: `http://localhost:5173`
- Backend API available at: `http://localhost:5000`
- PostgreSQL available at: `localhost:5432`

### Vercel (Frontend)
- Build Command: `npm run build`
- Output Directory: `dist`
- Environment Variables:
  - `VITE_API_URL`: `https://your-backend-api.onrender.com/api/v1`
  - `VITE_SOCKET_URL`: `https://your-backend-api.onrender.com`

### Render / Fly.io (Backend)
- Build Command: `npm ci && npx prisma generate`
- Start Command: `node src/server.js`
- Environment Variables:
  - `DATABASE_URL`: `postgresql://user:pass@host:5432/campusos_db?schema=public`
  - `JWT_SECRET`: `<secure-random-token>`
  - `CLIENT_URL`: `https://your-frontend.vercel.app`

