import { useState } from 'react';

const STATUSES = ['todo', 'in-progress', 'done'];

const badgeClass = {
  'todo':        'badge-todo',
  'in-progress': 'badge-in-progress',
  'done':        'badge-done',
};

const TaskCard = ({ task, onUpdate, onDelete }) => {
  const [editing, setEditing]   = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDesc,  setEditDesc]  = useState(task.description || '');

  const handleSave = () => {
    if (!editTitle.trim()) return;
    onUpdate(task._id, { title: editTitle.trim(), description: editDesc.trim() });
    setEditing(false);
  };

  const handleStatusChange = (e) => {
    onUpdate(task._id, { status: e.target.value });
  };

  return (
    <div className={`task-card ${task.status}`}>
      <div className="task-body">
        {editing ? (
          <>
            <input
              className="edit-input"
              value={editTitle}
              onChange={e => setEditTitle(e.target.value)}
              placeholder="Task title"
              autoFocus
            />
            <input
              className="edit-input"
              value={editDesc}
              onChange={e => setEditDesc(e.target.value)}
              placeholder="Description (optional)"
            />
          </>
        ) : (
          <>
            <div className={`task-title ${task.status === 'done' ? 'done-title' : ''}`}>
              {task.title}
            </div>
            {task.description && <div className="task-desc">{task.description}</div>}
          </>
        )}
        <div className="task-meta">
          <span className={`status-badge ${badgeClass[task.status]}`}>
            {task.status}
          </span>
          {!editing && (
            <select
              className="status-select"
              value={task.status}
              onChange={handleStatusChange}
            >
              {STATUSES.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          )}
        </div>
      </div>

      <div className="task-actions">
        {editing ? (
          <>
            <button className="btn-icon save" onClick={handleSave}>Save</button>
            <button className="btn-icon" onClick={() => setEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            <button className="btn-icon edit" onClick={() => setEditing(true)}>Edit</button>
            <button className="btn-icon delete" onClick={() => {
              if (window.confirm('Delete this task?')) onDelete(task._id);
            }}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
