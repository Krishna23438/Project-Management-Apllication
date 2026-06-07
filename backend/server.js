
import express from 'express';

import cors from 'cors'

import 'dotenv/config'

import connectDB from './config/db.js'
import router from './routes/authRoutes.js';
import authrouter from './routes/authRoutes.js';
import projectrouter from './routes/projectRoutes.js';
import taskrouter from './routes/taskRoutes.js';

await connectDB();

const app = express();
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',  // local dev
  'http://localhost:3000',
].filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error(`CORS blocked: ${origin}`));
  },
  credentials: true,
}));

app.use(express.json());

app.get('/api/health', (_, res) => res.json({ status: 'ok' }));

app.use('/api/user', router)

app.use('/auth', authrouter);
app.use('/projects', projectrouter);
app.use('/tasks', taskrouter);


app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({ 
    success: false, 
    message: err.message || 'Server Error' 
  });
});

app.listen(process.env.PORT || 5000, () => 
  console.log(`Server running on port ${process.env.PORT}`)
);

export default app;