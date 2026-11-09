<img width="2818" height="1515" alt="dashboard" src="https://github.com/user-attachments/assets/f050a5e0-342f-48ec-b4c2-7e02a232abb6" />

---

# CampusOS - University Management Platform

CampusOS is a centralized university management system designed for students, faculty members, and academic administrators. It provides role-based access control, real-time notifications, academic workflow management, attendance tracking, coursework submissions, examinations, hostel grievance triage, and analytics.

---

## Architecture and Key Features

- **Role-Based Access Control (RBAC):** Separate access layers for Students, Faculty, and Administrators with JWT verification and route-level authorization guards.
- **Real-Time Notification Bus:** Socket.io event distribution for coursework updates, grading alerts, attendance records, hostel complaint statuses, and university notices.
- **Attendance Management:** Subject-wise and cumulative attendance tracking with automated threshold detection below 75%.
- **Coursework and Assessments:** Faculty assignment distribution, student document uploads via Multer, submission review, inline grading, and feedback.
- **Examinations and Grading:** Exam scheduling, room allocations, marks entry, and student performance transcripts.
- **Hostel Grievance Triage:** Student maintenance requests (plumbing, electrical, cleanliness, networking), status workflows, and resolution notes.
- **Academic Discussion Forum:** Categorized academic discussion threads, subject tags, nested comments, and post upvotes.
- **Telemetry and Analytics:** Interactive dashboards for department densities, attendance distributions, and operational tickets.
- **Security:** bcrypt password hashing, Helmet HTTP security headers, CORS origin controls, rate limiting, and Zod request validation.

---

## Technology Stack

### Frontend
- **Framework:** React 18, Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Data Visualization:** Recharts
- **HTTP Client:** Axios with Bearer token interceptors
- **Routing:** React Router v6
- **WebSockets:** Socket.io-client

### Backend
- **Runtime:** Node.js (v18+)
- **Framework:** Express.js (MVC architecture)
- **Database ORM:** Prisma Client
- **Authentication:** JSON Web Tokens (JWT) and bcryptjs
- **Validation:** Zod
- **File Handling:** Multer
- **Mail Service:** Nodemailer
- **Real-Time:** Socket.io

### Databases
- **Primary Database:** PostgreSQL 16 (production and containerized local development)
- **Local Alternative:** SQLite (schema file provided for low-footprint offline testing)

---

## Repository Structure

```
CampusOS/
├── docker-compose.yml              # PostgreSQL, Backend, and Frontend orchestration
├── package.json                    # Monorepo scripts for client and server
├── index.html                      # Static development launcher page
│
├── server/                         # Express and Prisma API
│   ├── Dockerfile
│   ├── package.json
│   ├── .env.example                # Template environment variables
│   ├── prisma/
│   │   ├── schema.prisma           # PostgreSQL schema (20 models)
│   │   ├── schema.sqlite.prisma    # SQLite schema alternative
│   │   ├── seed.js                 # Institutional database seeder
│   │   └── dev.db                  # Local SQLite database file
│   ├── uploads/                    # File upload storage
│   ├── tests/                      # Vitest API test suite
│   └── src/
│       ├── config/                 # Database and Socket.io initialization
│       ├── controllers/            # Route controllers
│       ├── middleware/             # Auth, RBAC, file upload, validation
│       ├── routes/                 # API route aggregators
│       ├── validators/             # Zod validation schemas
│       ├── utils/                  # JWT helpers, formatters, email utilities
│       ├── app.js                  # Express application configuration
│       └── server.js               # HTTP and WebSocket server entry point
│
└── client/                         # React 18 and Vite frontend
    ├── Dockerfile
    ├── nginx.conf
    ├── package.json
    ├── tailwind.config.js
    ├── vite.config.js
    └── src/
        ├── components/             # Reusable UI and layout components
        ├── context/                # Auth, Socket, and Theme React contexts
        ├── pages/                  # Auth, Student, Faculty, and Admin views
        ├── services/               # Axios API client and endpoints
        ├── App.jsx                 # Application routes and guards
        └── main.jsx                # Application root entry
```

---

## Quick Start Guide (Local Development)

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- Docker (for PostgreSQL container) or an existing local PostgreSQL installation

---

### Step 1: Database Setup

Start a local PostgreSQL 16 container:

```bash
docker run --name campusos_pg \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=campusos_db \
  -p 5432:5432 \
  -d postgres:16-alpine
```

If you already have PostgreSQL installed locally, ensure a database named `campusos_db` is created and accessible.

---

### Step 2: Backend Setup

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create the environment configuration file:
   ```bash
   cp .env.example .env
   ```
   Verify that `DATABASE_URL` in `.env` matches your PostgreSQL connection string:
   ```env
   PORT=5000
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/campusos_db?schema=public"
   JWT_SECRET="campusos_super_secret_jwt_key_2026_production_grade"
   JWT_EXPIRES_IN="7d"
   UPLOAD_DIR="./uploads"
   ```

4. Push the Prisma schema to the database:
   ```bash
   npx prisma db push
   ```

5. Generate the Prisma Client:
   ```bash
   npx prisma generate
   ```

6. Seed initial test data (Admin, Faculty, Students, Departments, Courses):
   ```bash
   npm run prisma:seed
   ```

7. (Optional) Run automated tests:
   ```bash
   npm test
   ```

8. Start the backend development server:
   ```bash
   npm run dev
   ```
   The backend API will be available at `http://localhost:5000/api/v1`.

> **Note for SQLite usage:** If you want to run the backend without PostgreSQL, use the SQLite schema:
> ```bash
> npm run db:sqlite
> ```

---

### Step 3: Frontend Setup

1. Open a new terminal and navigate to the `client` directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`.
   
Requests to `/api/*` are automatically forwarded to `http://127.0.0.1:5000` via the Vite proxy configured in `client/vite.config.js`.

---

### Alternative: Root Monorepo Commands

From the root project directory, you can run:

```bash
# Start backend server
npm run server

# Start frontend client (in separate terminal)
npm run client

# Run database seed
npm run seed

# Build client for production
npm run build
```

---

## Seed Data and Demo Credentials

The database seeder (`server/prisma/seed.js`) provides pre-configured accounts for testing each role:

| Role | Username / Identifier | Email | Password | Pre-loaded Content |
| :--- | :--- | :--- | :--- | :--- |
| **Administrator** | `admin` | `admin@campusos.edu` | `Admin@123456` | Institution telemetry, department rosters, timetable scheduler, grievance queue |
| **Faculty Member** | `FAC-CSE-101` | `faculty.johnson@campusos.edu` | `Faculty@123456` | CS301 (Data Structures), CS304 (Web Dev), attendance roster, assignment manager |
| **Student (Primary)** | `EN2024CS042` | `rahul.kumar@campusos.edu` | `Student@123456` | B.Tech CSE Semester 5, subject enrollments, assignment submissions, hostel room B-204 |
| **Student (Peer)** | `EN2024CS043` | `student.sarah@campusos.edu` | `Student@123456` | Cohort peer student account |

*Note: The login page at `http://localhost:5173/login` includes quick-fill buttons for Student, Faculty, and Admin credentials.*

---

## API Overview

Base URL: `http://localhost:5000/api/v1`

| Prefix | Description | Primary Endpoints |
| :--- | :--- | :--- |
| `/auth` | Authentication and session recovery | `POST /login`, `POST /register`, `POST /forgot-password`, `GET /me` |
| `/users` | User profile and account management | `GET /profile`, `PUT /profile`, `GET /students`, `GET /faculty` |
| `/academic` | Curriculum and departmental structure | `GET /departments`, `GET /courses`, `GET /semesters`, `GET /subjects` |
| `/attendance` | Attendance tracking and roll call | `GET /subject/:id`, `POST /mark`, `GET /student/cumulative` |
| `/assignments` | Coursework distribution and grading | `GET /subject/:id`, `POST /create`, `POST /:id/submit`, `PUT /submission/:id/grade` |
| `/examinations` | Exam timetables and mark entry | `GET /`, `POST /`, `POST /marks`, `GET /student/:id` |
| `/timetable` | Weekly schedule slots | `GET /semester/:id`, `POST /slot`, `DELETE /slot/:id` |
| `/announcements`| Campus bulletins and notifications | `GET /`, `POST /create`, `DELETE /:id` |
| `/complaints` | Hostel maintenance issues | `GET /`, `POST /create`, `PUT /:id/status` |
| `/forum` | Academic discussions | `GET /posts`, `POST /posts`, `POST /posts/:id/comments`, `POST /posts/:id/like` |
| `/analytics` | System reports and telemetry | `GET /admin/stats`, `GET /faculty/stats` |
| `/notifications`| Real-time alerts inbox | `GET /`, `PUT /read-all`, `PUT /:id/read` |
| `/health` | API gateway health check | `GET /health` |

---

## UI Screenshots

**Time Table**

<img width="2815" height="1517" alt="timetable" src="https://github.com/user-attachments/assets/c097458f-4f87-4e20-8d43-f1db7427aecb" />

**Assignement Dashboard**

<img width="2818" height="1519" alt="assignemnt" src="https://github.com/user-attachments/assets/75601239-6ace-453a-b1e0-f7a8216e500e" />

**Home Page**

<img width="2818" height="1520" alt="home" src="https://github.com/user-attachments/assets/b371a32c-6254-4bc5-b356-51fe9abfd429" />

---


## Containerized Deployment (Docker Compose)

To spin up the entire application stack (PostgreSQL, Backend API, and Frontend web client) in production mode:

```bash
docker-compose up --build -d
```

### Published Ports
- **Frontend Web UI:** `http://localhost:5173`
- **Backend API:** `http://localhost:5000`
- **PostgreSQL Database:** `localhost:5432`

To shut down the stack:
```bash
docker-compose down
```

To shut down and wipe persistent volume storage:
```bash
docker-compose down -v
```
