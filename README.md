# 📋 Mini Project Management App

A full-stack MERN application for managing projects and tasks. Built for the Enest SkillTech assignment.

## 🚀 Live Demo
- **Frontend:** https://your-app.vercel.app
- **Backend API:** https://your-api.onrender.com

---

## ✅ Features
- JWT Authentication (Register / Login / Logout)
- Protected Routes
- Create, view, delete Projects
- Add, edit, delete Tasks per project
- Change task status: **To Do → In Progress → Done**
- Search tasks by title
- Filter tasks by status
- Task count per project on Dashboard
- Loading & empty states
- Fully responsive UI
- Cascade delete (deleting a project deletes all its tasks)

---

## 🛠️ Tech Stack

| Layer     | Tech                        |
|-----------|-----------------------------|
| Frontend  | React.js, React Router v6   |
| Styling   | Plain CSS                   |
| HTTP      | Axios                       |
| Backend   | Node.js + Express.js v4     |
| Database  | MongoDB + Mongoose          |
| Auth      | JWT + bcryptjs              |
| Deploy    | Vercel (FE) + Render (BE)   |

---






## ⚙️ Local Setup

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/project-management-app.git
cd project-management-app
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=any_random_secret_string
PORT=5000
FRONTEND_URL=http://localhost:5173
```

Start backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` folder:
```
VITE_API_URL=http://localhost:5000
```

Start frontend:
```bash
npm run dev
```

### 4. Open in browser
```
http://localhost:5173
```

---

## 🌐 API Endpoints

| Method | Endpoint              | Description           | Auth |
|--------|-----------------------|-----------------------|------|
| POST   | /auth/register        | Register user         | ❌   |
| POST   | /auth/login           | Login user            | ❌   |
| GET    | /projects             | Get all projects      | ✅   |
| POST   | /projects             | Create project        | ✅   |
| GET    | /projects/:id         | Get project + tasks   | ✅   |
| PUT    | /projects/:id         | Update project        | ✅   |
| DELETE | /projects/:id         | Delete project        | ✅   |
| POST   | /projects/:id/tasks   | Create task           | ✅   |
| PUT    | /tasks/:id            | Update task           | ✅   |
| DELETE | /tasks/:id            | Delete task           | ✅   |

---

## 🚀 Deployment

### Backend → Render (free)
1. Push backend folder to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect GitHub repo → set root directory to `backend`
4. Build command: `npm install` | Start command: `node server.js`
5. Add environment variables: MONGO_URI, JWT_SECRET, PORT, FRONTEND_URL

### Frontend → Vercel (free)
1. Push frontend folder to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import repo → set root to `frontend`
4. Add env variable: `VITE_API_URL=https://your-render-url.onrender.com`
5. Deploy!

---

## 👨‍💻 Author
**Krishna Gupta** — Full Stack Developer (MERN Stack)  
📧 krishnagupta2402@gmail.com | 📱 +91-9651702076
