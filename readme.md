# Human Resource Management System (HRMS)

---

## Project Overview

The **Human Resource Management System (HRMS)** is a full‑stack web application built to manage employees, teams, organisations, authentication, and activity logs with audit‑ready tracking. The project follows industry‑standard architecture using **React (Frontend)**, **Node.js + Express (Backend)** and **MySQL (Database)**.

This repository is configured with:

* Database **migrations**
* **Seeders with preloaded demo data**
* Authentication with JWT
* Role‑ready organisation‑level isolation

> ⚠️ **Important for Evaluators:**
> After running migrations and seeders, the system will automatically load **demo users, employees, teams, and assignments** for testing.

---

## Tech Stack

### Backend

* Node.js
* Express.js
* Sequelize ORM
* MySQL Database
* JWT Authentication
* bcrypt Password Hashing
* dotenv for environment variables

### Frontend

* React (Vite)
* Axios
* Tailwind CSS

### Tools & Deployment

* Git + GitHub
* Render (Backend)
* Vercel (Frontend)
* Railway (MySQL)

---

## Core Features

* Organisation‑based user authentication
* Employee Management (Create, Read, Update, Delete)
* Team Management (Create, Read, Update, Delete)
* Many‑to‑Many Employee ⇄ Team Assignment
* Checkbox‑based Team Assignment inside Employee Modal
* Real‑time Team Visibility on Employee List
* Activity Logs with Timestamps
* Secure JWT‑based Access Control

---

## Database Tables

* Organisations
* Users
* Employees
* Teams
* Employee_Teams (Join Table)
* Logs (Audit Trail)

---

## API Modules

### Authentication

* Register Organisation
* Login User

### Employees

* Create Employee
* Update Employee
* Delete Employee
* View Employees

### Teams

* Create Team
* Update Team
* Delete Team
* Assign Employee to Team
* Unassign Employee from Team

### Logs

* Auto logging for:

  * Login
  * Logout
  * Create / Update / Delete Employees
  * Create / Update / Delete Teams
  * Assign / Unassign Employees

---

## Project Structure

```
hrms/
├─ backend/
│  ├─ src/
│  │  ├─ controllers/
│  │  ├─ routes/
│  │  ├─ models/
│  │  ├─ middlewares/
│  │  ├─ seed.js
│  │  ├─ db.js
│  │  └─ index.js
│  ├─ seeders/
│  ├─ migrations/
│  ├─ package.json
│  └─ .env
└─ frontend/
   ├─ src/
   ├─ services/
   ├─ components/
   └─ pages/
```

---

## How to Run Locally (Evaluator Instructions)

### 🔹 1. Backend Setup

```bash
cd backend
npm install
```

### 🔹 2. Configure `.env` File

Create a file named `.env` inside `backend/`:

```
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=yourpassword
DB_NAME=hrms_db
JWT_SECRET=hrms_secret
```

---

### 🔹 3. Run Migrations

```bash
npx sequelize-cli db:migrate
```

---

### 🔹 4. Run Seeders (IMPORTANT )

This will auto‑insert **organisation, admin user, employees, teams and assignments**.

```bash
npx sequelize-cli db:seed:all
```

After this step, the system is **preloaded with demo data**.

---

### 🔹 5. Start Backend Server

```bash
npm start
```

Backend runs on:

```
http://localhost:5000
```

---

### 🔹 6. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## Demo Login Credentials (From Seeders)

| Role  | Email                                   | Password |
| ----- | --------------------------------------- | -------- |
| Admin | admin@test.com                          | admin123 |

---

## Preloaded Sample Data (Seeder Content)

* 1 Organisation
* 1 Admin User
* 3 Employees
* 2 Teams
* Employees already assigned to Teams
* Activity logs auto‑generated

---

## Deployment Stack

* Backend: Render
* Frontend: Vercel
* Database: Railway MySQL

---

## Project Evaluation Readiness

| Criteria         | Status |
| ---------------- | ------ |
| Backend APIs     | Done   |
| Frontend UI      | Done   |
| Authentication   | Done   |
| CRUD Operations  | Done   |
| Team Assignments | Done   |
| Logs with Time   | Done   |
| Seed Data        | Done   |
| Migrations       | Done   |
| Deployment       | Ready  |

---
## 📸 Application Screenshots

> All screenshots are stored inside the `/screenshots` folder of this repository.

### 🔹 Employees Management
![Employees Page](./screenshots/Screenshot%20(913).png)
![Edit Employee](./screenshots/Screenshot%20(917).png)

### 🔹 Teams Management
![Teams Page](./screenshots/Screenshot%20(914).png)
![Assign / Unassign Employee](./screenshots/Screenshot%20(918).png)

### 🔹 Logs & Activity Tracking
![Logs Page](./screenshots/Screenshot%20(915).png)

### 🔹 Authentication & Dashboard
![Dashboard](./screenshots/Screenshot%20(912).png)
![Login](./screenshots/Screenshot%20(911).png)


## Conclusion

This HRMS project fully satisfies the assignment requirements including authentication, data integrity, relational mapping, logging, and deployment readiness. The system is preconfigured with seed data to enable instant evaluation and demo without manual setup.

---
