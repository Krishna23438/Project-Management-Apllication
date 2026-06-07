
import Project from '../models/Project.js';

import Task from '../models/Task.js';

export const getProjects = async (req, res) => {
  const projects = await Project.find({ userId: req.user.id }).sort('-createdAt');

  const result = await Promise.all(projects.map(async (p) => {
    const taskCount = await Task.countDocuments({ projectId: p._id });
    return { ...p.toObject(), taskCount };
  }));
  res.json(result);
};

export const createProject = async (req, res) => {
  const { name, description } = req.body;
  if (!name) return res.status(400).json({ message: 'Project name required' });
  const project = await Project.create({ name, description, userId: req.user.id });
  res.status(201).json(project);
};

export const getProject = async (req, res) => {
  const project = await Project.findOne({ _id: req.params.id, userId: req.user.id });
  if (!project) return res.status(404).json({ message: 'Project not found' });
  const tasks = await Task.find({ projectId: project._id }).sort('-createdAt');
  res.json({ project, tasks });
};

export const updateProject = async (req, res) => {
  const project = await Project.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body, { new: true }
  );
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json(project);
};

export const deleteProject = async (req, res) => {
  const project = await Project.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  if (!project) return res.status(404).json({ message: 'Project not found' });
  await Task.deleteMany({ projectId: req.params.id }); 
  res.json({ message: 'Project deleted' });
};