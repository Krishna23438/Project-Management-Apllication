
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' ,trim: true},
  status:{ 
    type: String, 
    enum: ['todo', 'in-progress', 'done'], 
    default: 'todo' ,
  },
  projectId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  assignedTo:{ type: String, default: '' },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

export default Task;