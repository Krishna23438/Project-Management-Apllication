import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import TaskCard from '../components/TaskCard';

const STATUSES = ['todo', 'in-progress', 'done'];

const ProjectDetail = () => {
  const { id }    = useParams();
  const navigate  = useNavigate();

  const [project,  setProject]  = useState(null);
  const [tasks,    setTasks]    = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState('');

  
  const [title,      setTitle]      = useState('');
  const [taskDesc,   setTaskDesc]   = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [submitting, setSubmitting] = useState(false);

  
  const [search,       setSearch]       = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => { fetchData(); }, [id]);

  const fetchData = async () => {
    try {
      const { data } = await api.get(`/projects/${id}`);
      setProject(data.project);
      setTasks(data.tasks);
    } catch {
      setError('Project not found or you do not have access.');
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setSubmitting(true);
    try {
      const { data } = await api.post(`/projects/${id}/tasks`, {
        title:      title.trim(),
        description: taskDesc.trim(),
        assignedTo: assignedTo.trim(),
      });
      setTasks([data, ...tasks]);
      setTitle(''); setTaskDesc(''); setAssignedTo('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add task.');
    } finally {
      setSubmitting(false);
    }
  };

  const updateTask = async (taskId, updates) => {
    try {
      const { data } = await api.put(`/tasks/${taskId}`, updates);
      setTasks(tasks.map(t => t._id === taskId ? data : t));
    } catch {
      setError('Failed to update task.');
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter(t => t._id !== taskId));
    } catch {
      setError('Failed to delete task.');
    }
  };

  
  const filtered = tasks
    .filter(t => t.title.toLowerCase().includes(search.toLowerCase()))
    .filter(t => filterStatus === 'all' || t.status === filterStatus);

  const counts = {
    all:         tasks.length,
    todo:        tasks.filter(t => t.status === 'todo').length,
    'in-progress': tasks.filter(t => t.status === 'in-progress').length,
    done:        tasks.filter(t => t.status === 'done').length,
  };

  if (loading) return <div className="loading">⏳ Loading project...</div>;

  if (error && !project) return (
    <div className="page">
      <div className="empty-state">
        <div className="icon">⚠️</div>
        <p>{error}</p>
        <button className="back-btn" onClick={() => navigate('/dashboard')} style={{marginTop:'1rem'}}>
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );

  return (
    <div className="page">
      
      <button className="back-btn" onClick={() => navigate('/dashboard')}>
        ← Back to Dashboard
      </button>

      
      <div className="project-detail-header">
        <h1>{project.name}</h1>
        {project.description && <p>{project.description}</p>}
        <p style={{ fontSize: '0.8rem', color: '#aaa', marginTop: '0.4rem' }}>
          Created: {new Date(project.createdAt).toLocaleDateString('en-IN', {
            day: 'numeric', month: 'long', year: 'numeric'
          })}
        </p>
      </div>

      {error && <div className="error-msg" style={{marginBottom:'1rem'}}>⚠️ {error}</div>}

      {/* Add Task Form */}
      <div className="create-form">
        <h3>+ Add Task</h3>
        <form onSubmit={addTask}>
          <div className="form-row" style={{ marginBottom: '0.6rem' }}>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Task title *"
              required
            />
            <input
              value={assignedTo}
              onChange={e => setAssignedTo(e.target.value)}
              placeholder="Assigned to (optional)"
            />
          </div>
          <textarea
            value={taskDesc}
            onChange={e => setTaskDesc(e.target.value)}
            placeholder="Task description (optional)"
          />
          <button className="btn-add" type="submit" disabled={submitting}>
            {submitting ? 'Adding...' : '+ Add Task'}
          </button>
        </form>
      </div>

          
      <div style={{ display:'flex', gap:'0.6rem', marginBottom:'1rem', flexWrap:'wrap' }}>
        {['all','todo','in-progress','done'].map(s => (
          <span
            key={s}
            onClick={() => setFilterStatus(s)}
            style={{
              padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem',
              fontWeight: 600, cursor: 'pointer',
              background: filterStatus === s ? '#667eea' : '#ede9fe',
              color: filterStatus === s ? '#fff' : '#667eea',
              transition: 'all 0.15s'
            }}
          >
            {s === 'all' ? 'All' : s} ({counts[s] ?? 0})
          </span>
        ))}
      </div>

      
      <div className="controls">
        <input
          placeholder="🔍 Search tasks by title..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="all">All Status</option>
          {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      
      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="icon">{search ? '🔍' : '📝'}</div>
          <p>{search ? `No tasks matching "${search}"` : 'No tasks yet. Add your first task above!'}</p>
        </div>
      ) : (
        <div className="tasks-list">
          {filtered.map(task => (
            <TaskCard
              key={task._id}
              task={task}
              onUpdate={updateTask}
              onDelete={deleteTask}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
