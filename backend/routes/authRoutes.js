
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
const authrouter = express.Router()

import { register,login } from '../controllers/authController.js';

authrouter.post('/register', register);
authrouter.post('/login', login);


export default authrouter;