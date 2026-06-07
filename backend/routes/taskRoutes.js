import express from 'express';

import { protect } from '../middleware/authMiddleware.js';

import { updateTask ,deleteTask} from '../controllers/taskController.js';


const taskrouter = express.Router()

taskrouter.use(protect);
taskrouter.put('/:id', updateTask);
taskrouter.delete('/:id', deleteTask);

export default taskrouter;