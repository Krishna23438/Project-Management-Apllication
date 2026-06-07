
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
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());



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