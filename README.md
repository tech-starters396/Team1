# InternPortal — Job Application Tracker

Professional full-stack job discovery and application tracking platform. Browse curated listings (**Discover**), save roles to a personal Kanban-style **Job Tracker**, upload resumes and cover letters, and monitor progress with lightweight **analytics**.

---

## Project Overview

InternPortal helps students and interns:

- **Explore** publicly posted jobs (Discover).
- **Track** applications across stages (Saved → Applied → Interview).
- **Persist** job details, notes, and documents securely.
- **Authenticate** via JWT sign-up/sign-in with separate admin (“staff”) workflows for managing Discover listings.

The repository is wired for **local development with Docker Compose** or **manual Python + Node installs**, and supports **PostgreSQL locally** or **AWS RDS** in staging/production patterns.

---

## Tech Stack

| Layer | Technologies |
|--------|----------------|
| **Frontend** | React 19, TypeScript, Vite |
| **Backend** | Python 3, **Django 5**, Django REST Framework, SimpleJWT |
| **Database** | PostgreSQL (local container or **AWS RDS**) |
| **File storage** | Local `media/` in dev; **AWS S3** via `django-storages` when `USE_S3=true` |
| **Email (optional)** | AWS SES-compatible settings for reminders after saving a job |
| **Containers** | Docker, Docker Compose |
| **API docs** | Swagger UI at `/swagger/`, ReDoc at `/redoc/` |

---

## Features

| Area | What it does |
|------|----------------|
| **CRUD — Discover listings** | Admins (`is_staff`) can create, read, update, and delete public job postings (`/api/companies/` …). Authenticated requests use JWT (`Authorization: Bearer …`). |
| **CRUD — Personal tracker** | Logged-in users manage their own job rows: list/create (`POST /api/tracker/`), update/delete (`PUT/PATCH/DELETE /api/tracker/<id>/`), including status and notes. |
| **Saving from Discover** | `POST /api/tracker/` with `{ "source_job": <discover_job_id> }` copies listing data into the user’s tracker (with reminder email hooks when SES is configured). |
| **File management (S3)** | Resume / cover letter `FileField` uploads route to S3 when `USE_S3` and bucket vars are set; otherwise files land under `backend/media/`. |
| **Analytics** | Dashboard-style summaries for tracked applications (counts, trends) in the React app (`JobTrackerAnalytics`). |
| **Search & filter** | Client-side filtering on Discover and the tracker (titles, companies, locations, salary ranges, filters, etc.). |

---

## Prerequisites

Choose **one** path:

### Option A — Docker (recommended)

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Compose v2 included)
- [Git](https://git-scm.com/)

### Option B — Local installs

- Python **3.11+**, `pip`, and a virtualenv
- Node.js **20+** and npm
- PostgreSQL **15** (or compatible) reachable from your machine

---

## Environment variables

Create a **`backend/.env`** (optional for Docker if you rely on Compose env) or export variables in your shell. Typical keys:

### Core Django

```env
SECRET_KEY=change-me-in-production-use-long-random-string
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
```

### Database (local Postgres — matches Compose defaults)

```env
DATABASE_NAME=jobtracker
DATABASE_USER=jobtracker
DATABASE_PASSWORD=jobtracker_password
DATABASE_HOST=localhost
DATABASE_PORT=5432
```

### Database (AWS RDS example)

Use the hostname, username, password, and DB name from the RDS console (same variable names — only values change):

```env
DATABASE_HOST=my-app.xxxxx.us-east-1.rds.amazonaws.com
DATABASE_PORT=5432
DATABASE_NAME=internportal_prod
DATABASE_USER=app_user
DATABASE_PASSWORD=super-secret-password-from-secrets-manager
```

### Frontend API base URL

Used by Axios (`frontend/src/api/client.ts`):

```env
VITE_API_BASE_URL=http://localhost:8000
```

In Docker Compose, this is injected for the frontend service as `http://localhost:8000` for browser-side calls from your machine.

### AWS S3 (optional — uploads)

Only required when storing resumes/cover letters in S3:

```env
USE_S3=true
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
AWS_STORAGE_BUCKET_NAME=your-bucket-name
AWS_S3_REGION_NAME=us-east-1
AWS_S3_CUSTOM_DOMAIN=          # optional CDN / CloudFront hostname
AWS_QUERYSTRING_EXPIRE=3600   # seconds for presigned URLs
```

Leave `USE_S3` unset or `false` to use **`backend/media/`** locally.

### AWS SES (optional — reminder emails)

```env
AWS_SES_REGION_NAME=us-east-1
AWS_SES_FROM_EMAIL=noreply@yourdomain.com
```

---

## Local setup & installation

### 1. Clone

```bash
git clone https://github.com/<your-org>/<your-repo>.git
cd <your-repo>
```

### 2. Run with Docker Compose

```bash
docker compose build
docker compose up -d
docker compose exec backend python manage.py migrate
docker compose exec backend python manage.py createsuperuser
```

Then open:

- **Frontend**: http://localhost:5173  
- **Backend home**: http://localhost:8000/  
- **Swagger**: http://localhost:8000/swagger/  
- **Admin**: http://localhost:8000/admin/  

Daily workflow:

```bash
docker compose up -d
# ... edit code ...
docker compose down
```

Rebuild after changing **`requirements.txt`** or **`frontend/package.json`**:

```bash
docker compose build backend frontend
docker compose up -d
```

### 3. Run without Docker (alternative)

**Backend**

```bash
cd backend
python -m venv .venv
# Windows PowerShell:
.venv\Scripts\Activate.ps1
# macOS/Linux:
source .venv/bin/activate

pip install -r requirements.txt
export DJANGO_SETTINGS_MODULE=config.settings
# plus DATABASE_* and SECRET_KEY for your Postgres instance — see above
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver 0.0.0.0:8000
```

**Frontend**

```bash
cd frontend
npm install
# Create frontend/.env if needed:
echo VITE_API_BASE_URL=http://localhost:8000 > .env
npm run dev
```

---

## Automated tests (Week 11)

### Frontend — Vitest + React Testing Library

This project uses **Vitest** (official test runner for Vite). It uses the **same style** as Jest: `describe`, `it`, `expect`, and mocks. React components are tested with **React Testing Library**.

**Files to know**

| File | Purpose |
|------|---------|
| `frontend/vite.config.ts` | Vite + Vitest config (`test.environment: 'jsdom'`, setup file). |
| `frontend/src/test/setup.ts` | Registers `@testing-library/jest-dom` matchers. |
| `frontend/src/components/JobList.test.tsx` | Discover list rendering + empty state. |
| `frontend/src/components/HealthCheck.test.tsx` | Health UI success + error paths. |

**Install & run**

```bash
cd frontend
npm install
npm run test:run       # CI-friendly (single pass)
npm test               # watch mode during development
```

### Backend — Pytest + Django

**Files to know**

| File | Purpose |
|------|---------|
| `backend/pytest.ini` | Sets `DJANGO_SETTINGS_MODULE=config.settings_test`. |
| `backend/config/settings_test.py` | In-memory **SQLite**, fast password hasher — no RDS/S3 needed. |
| `backend/api/tests/test_job_api_integration.py` | REST integration tests (`/api/health/`, Discover CRUD authorization, Tracker CRUD, save-from-discover with mocked mail). |

**Install & run (local venv)**

```bash
cd backend
pip install -r requirements.txt
pytest
pytest -v              # verbose
pytest api/tests/test_job_api_integration.py::test_health_check_returns_200
```

**Run inside Docker**

```bash
docker compose exec backend pip install -r requirements.txt
docker compose exec backend pytest
```

---

## Useful API endpoints (abbrev.)

| Endpoint | Methods | Notes |
|----------|---------|--------|
| `/api/health/` | GET | Public health check |
| `/api/companies/` | GET, POST | Discover jobs; POST requires staff |
| `/api/companies/<id>/` | PUT, PATCH, DELETE | Staff only for writes |
| `/api/tracker/` | GET, POST | Authenticated user’s jobs |
| `/api/tracker/<id>/` | PUT, PATCH, DELETE | Owner only |
| `/api/auth/signup/`, `/api/auth/login/` | POST | Auth flows |
| `/swagger/` | GET | Interactive API docs |

---

## Project structure (abbrev.)

```
.
├── docker-compose.yml
├── README.md
├── backend/
│   ├── api/                 # Models, views, serializers, urls, tests
│   ├── config/              # settings.py, settings_test.py, urls
│   ├── pytest.ini
│   ├── requirements.txt
│   └── manage.py
└── frontend/
    ├── src/
    │   ├── api/client.ts
    │   ├── components/      # *.test.tsx next to components
    │   └── test/setup.ts
    ├── package.json
    └── vite.config.ts
```

---

## Troubleshooting

- **Port in use**: change host ports in `docker-compose.yml` or stop conflicting services.
- **Migrations out of date**: `docker compose exec backend python manage.py migrate`
- **CORS errors**: ensure `VITE_API_BASE_URL` matches how the browser reaches the API and that `CORS_ALLOWED_ORIGINS` in `config/settings.py` includes your dev origin (e.g. `http://localhost:5173`).

---

## License / course use

Replace this section with your institution’s license or academic honesty note if required.

---

**Maintainer tip:** After pulling new changes, always `migrate` the database and reinstall dependencies when lockfiles or `requirements.txt` change.
