import Task from '../models/Task.js';

import Project from '../models/Project.js'

export const createTask = async (req, res) => {
  const project = await Project.findOne({ _id: req.params.id, userId: req.user.id });
  if (!project) return res.status(404).json({ message: 'Project not found' });

  const { title, description, assignedTo, status } = req.body;
  if (!title) return res.status(400).json({ message: 'Task title required' });

  const task = await Task.create({ 
    title, description, assignedTo, status, projectId: project._id 
  });
  res.status(201).json(task);
};

export const updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
};

export const deleteTask = async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json({ message: 'Task deleted' });
};