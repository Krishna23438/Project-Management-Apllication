# 📋 ProjectHub — Full-Stack Project Management App

A full-stack MERN (MongoDB, Express, React, Node.js) project management app with JWT auth, deployable to Vercel.

---

## 🗂️ Project Structure

```
project-mgmt/
├── backend/          ← Express + MongoDB API
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── vercel.json   ← Vercel config for backend
│   └── .env.example
└── frontend/         ← React + Vite SPA
    ├── src/
    │   ├── api/axios.js     ← Axios instance (JWT interceptors)
    │   ├── context/         ← Auth context
    │   ├── components/
    │   └── pages/
    ├── vite.config.js
    ├── vercel.json   ← Vercel config for frontend
    └── .env.example
```

---

## ⚡ Local Development

### 1. Backend

```bash
cd backend
cp .env.example .env
# Fill in MONGO_URI and JWT_SECRET in .env
npm install
npm run dev        # runs on http://localhost:5000
```

### 2. Frontend

```bash
cd frontend
cp .env.example .env
# .env already points to http://localhost:5000/api for local dev
npm install
npm run dev        # runs on http://localhost:5173
```

The Vite proxy forwards all `/api` requests to `localhost:5000`, so no CORS issues locally.

---

## 🚀 Deploy to Vercel (Step-by-Step)

You deploy **backend** and **frontend** as **two separate Vercel projects**.

### Step 1 — Deploy the Backend

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your repo, set **Root Directory** to `backend`
4. Add these **Environment Variables** in Vercel dashboard:
   | Key | Value |
   |-----|-------|
   | `MONGO_URI` | `mongodb+srv://...` |
   | `JWT_SECRET` | your secret key |
   | `FRONTEND_URL` | *(leave blank for now, add after frontend deploy)* |
5. Click **Deploy** → copy your backend URL, e.g. `https://project-mgmt-backend.vercel.app`

### Step 2 — Deploy the Frontend

1. Go to Vercel → **New Project** again
2. Import the **same repo**, set **Root Directory** to `frontend`
3. Add this **Environment Variable**:
   | Key | Value |
   |-----|-------|
   | `VITE_API_URL` | `https://project-mgmt-backend.vercel.app/api` |
4. Click **Deploy** → copy your frontend URL, e.g. `https://project-mgmt.vercel.app`

### Step 3 — Update Backend CORS

1. Go to your **backend Vercel project** → Settings → Environment Variables
2. Set `FRONTEND_URL` = `https://project-mgmt.vercel.app`
3. **Redeploy** the backend (Deployments tab → Redeploy)

✅ Your app is now fully live!

---

## 🔌 API Endpoints

All routes are prefixed with `/api`.

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` |  Login user |
| GET | `/api/projects` |Get all projects |
| POST | `/api/projects` | Create project |
| GET | `/api/projects/:id`  | Get project + tasks |
| PUT | `/api/projects/:id` | Update project |
| DELETE | `/api/projects/:id` | Delete project + tasks |
| POST | `/api/projects/:id/tasks` | Add task to project |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id`  | Delete task |

---

##  How Auth Works

1. User logs in → backend returns a JWT token
2. Frontend stores token in `localStorage`
3. `axios.js` attaches `Authorization: Bearer <token>` to every request automatically
4. On 401 responses, user is redirected to `/login` automatically
