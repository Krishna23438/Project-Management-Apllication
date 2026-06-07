import express from 'express'
const projectrouter = express.Router()

import { protect } from '../middleware/authMiddleware.js';

import { getProjects ,createProject, updateProject, deleteProject,getProject} from '../controllers/projectController.js';
import { createTask } from '../controllers/taskController.js';


projectrouter.use(protect); 
projectrouter.get('/', getProjects);
projectrouter.post('/', createProject);
projectrouter.get('/:id', getProject);
projectrouter.put('/:id', updateProject);
projectrouter.delete('/:id', deleteProject);
projectrouter.post('/:id/tasks', createTask);

export default projectrouter;