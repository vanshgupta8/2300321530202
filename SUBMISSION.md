# Submission Checklist

Use this list before filling the evaluation form. Every item below is mentioned in the task guidelines.

## Repository

- [ ] Code pushed to: https://github.com/vanshgupta8/2300321530202
- [ ] Folder layout matches the required structure
- [ ] Multiple commits pushed (not one single final commit)
- [ ] `.gitignore` includes `node_modules`

## Required folders and files

```
logging_middleware/
notification_app_be/
notification_app_fe/
notification_system_design.md
submission/
  screenshots/
    stage1/
    api/
    frontend-desktop/
    frontend-mobile/
  demo/
  postman/
.gitignore
```

## Stage 1 deliverables

- [ ] Working priority inbox code in `notification_app_be`
- [ ] `notification_system_design.md` explains ranking and top-10 efficiency
- [ ] Screenshot saved in `submission/screenshots/stage1/`
  - Must show terminal JSON output with top 10 priority notifications
  - Label the response heading as **Stage 1**

### Run Stage 1

```bash
cd logging_middleware && npm install && npm run build
cd ../notification_app_be && npm install
copy .env.example .env
npm run stage1
```

## Local deployment (required)

The frontend must run on **http://localhost:3000**.

### Terminal 1 — backend

```bash
cd logging_middleware && npm run build
cd ../notification_app_be
copy .env.example .env
npm install
npm run dev
```

Backend runs on `http://localhost:4000`.

### Terminal 2 — frontend

```bash
cd notification_app_fe
copy .env.example .env
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`.

## API screenshots (Postman or Insomnia)

Save screenshots in `submission/screenshots/api/`.

Each screenshot must clearly show:

1. Request URL
2. Request method
3. Request body or query params (if used)
4. Full response body
5. Response time

### Backend routes to capture

| Request | URL |
|---------|-----|
| Health check | `GET http://localhost:4000/health` |
| All notifications | `GET http://localhost:4000/api/notifications?limit=10&page=1` |
| Filter by type | `GET http://localhost:4000/api/notifications?notification_type=Placement` |
| Priority inbox | `GET http://localhost:4000/api/notifications/priority?top=10` |

Import `submission/postman/campus-notifications.postman_collection.json` to test faster.

## Stage 2 frontend screenshots

Save files in:

- `submission/screenshots/frontend-desktop/`
- `submission/screenshots/frontend-mobile/`

### Desktop screenshots

- [ ] All notifications page (`/`)
- [ ] Priority inbox page (`/priority`)
- [ ] Type filter applied (Placement / Result / Event)
- [ ] New vs viewed notification state visible

### Mobile screenshots

Use browser dev tools device mode or a real phone on the same network.

- [ ] All notifications page on mobile width
- [ ] Priority inbox page on mobile width
- [ ] Navigation buttons visible and readable

## Demo video (Stage 2)

Save the recording in `submission/demo/` or upload to Drive/YouTube and note the link in your form.

The video must show:

1. App opening at `http://localhost:3000`
2. All notifications page
3. Priority inbox page
4. Type filter working
5. Marking a notification as viewed
6. Same flow on mobile view
7. Both desktop and mobile layouts

Suggested length: 2–4 minutes.

## Logging middleware proof

The evaluators check that `Log(stack, level, package, message)` is used instead of `console.log`.

Optional extra proof:

- [ ] Screenshot of a successful log API response (status 200) from the test server

## Environment variables

Create `.env` in both backend and frontend using `.env.example`:

```
EVALUATION_EMAIL=
EVALUATION_NAME=
EVALUATION_ROLL_NO=
EVALUATION_CLIENT_ID=
EVALUATION_CLIENT_SECRET=
```

## Final form checklist

- [ ] GitHub username matches registration username
- [ ] Roll number and email match college records
- [ ] Stage 1 screenshot attached
- [ ] API screenshots attached
- [ ] Desktop screenshots attached
- [ ] Mobile screenshots attached
- [ ] Demo video link or file attached
- [ ] All services tested locally before submit
