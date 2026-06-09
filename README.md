# Campus Notifications Project

Logging middleware, backend API, and Next.js frontend for the campus notifications evaluation.

## Folder layout

| Folder / file | Purpose |
|---------------|---------|
| `logging_middleware/` | Reusable `Log(stack, level, package, message)` package |
| `notification_app_be/` | Backend with priority inbox and REST API |
| `notification_app_fe/` | Next.js + Material UI frontend |
| `notification_system_design.md` | Stage 1 design document |
| `submission/` | Screenshots, demo video, Postman collection |
| `SUBMISSION.md` | Full submission checklist |
| `scripts/` | Quick start scripts for local deployment |

## Quick start (local deployment)

> Frontend must run on **http://localhost:3000**  
> Backend runs on **http://localhost:4000**

### 1. Environment setup

Copy `.env.example` to `.env` in both `notification_app_be` and `notification_app_fe`, then fill in your evaluation credentials.

### 2. Stage 1 — priority inbox

```powershell
.\scripts\run-stage1.ps1
```

Save the terminal output screenshot to `submission/screenshots/stage1/`.

### 3. Start backend (Terminal 1)

```powershell
.\scripts\start-backend.ps1
```

### 4. Start frontend (Terminal 2)

```powershell
.\scripts\start-frontend.ps1
```

Open **http://localhost:3000**

## Pages

| URL | Description |
|-----|-------------|
| `/` | All notifications with type filter |
| `/priority` | Top 10 priority notifications |

## Backend API

| Method | Endpoint |
|--------|----------|
| GET | `/health` |
| GET | `/api/notifications?limit=10&page=1` |
| GET | `/api/notifications?notification_type=Placement` |
| GET | `/api/notifications/priority?top=10` |

Import `submission/postman/campus-notifications.postman_collection.json` into Postman or Insomnia for API testing.

## Submission deliverables

See **`SUBMISSION.md`** for the complete checklist. Summary:

| Deliverable | Location |
|-------------|----------|
| Stage 1 output screenshot | `submission/screenshots/stage1/` |
| API screenshots (request + response + time) | `submission/screenshots/api/` |
| Desktop UI screenshots | `submission/screenshots/frontend-desktop/` |
| Mobile UI screenshots | `submission/screenshots/frontend-mobile/` |
| Demo video (desktop + mobile) | `submission/demo/` |
| System design doc | `notification_system_design.md` |
| Source code | This GitHub repo |

## Notes

- Notifications are fetched live from the evaluation API only.
- No database storage and no hard-coded notification data.
- All logging goes through `logging_middleware` (no `console.log` for app events).
- Cloud deployment is **not required** — run locally on `localhost:3000`.
