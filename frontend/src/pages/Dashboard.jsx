import { useEffect, useState } from 'react';
import api from '../api/axios';
import ProjectCard from '../components/ProjectCard';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [name, setName]   = useState('');
  const [desc, setDesc]   = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { fetchProjects(); }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await api.get('/projects');
      setProjects(data);
    } catch (err) {
      setError('Failed to load projects.');
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSubmitting(true);
    try {
      const { data } = await api.post('/projects', {
        name: name.trim(),
        description: desc.trim(),
      });
      setProjects([{ ...data, taskCount: 0 }, ...projects]);
      setName('');
      setDesc('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create project.');
    } finally {
      setSubmitting(false);
    }
  };

  const deleteProject = async (id) => {
    try {
      await api.delete(`/projects/${id}`);
      setProjects(projects.filter(p => p._id !== id));
    } catch {
      setError('Failed to delete project.');
    }
  };

  if (loading) return <div className="loading">⏳ Loading your projects...</div>;

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">My Projects</h1>
        <span style={{ color: '#888', fontSize: '0.9rem' }}>
          {projects.length} project{projects.length !== 1 ? 's' : ''}
        </span>
      </div>

      
      <div className="create-form">
        <h3>+ New Project</h3>
        {error && <div className="error-msg" style={{marginBottom:'0.8rem'}}>⚠️ {error}</div>}
        <form onSubmit={createProject}>
          <div className="form-row" style={{ marginBottom: '0.7rem' }}>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Project name *"
              required
            />
          </div>
          <textarea
            value={desc}
            onChange={e => setDesc(e.target.value)}
            placeholder="Project description (optional)"
          />
          <button className="btn-add" type="submit" disabled={submitting}>
            {submitting ? 'Creating...' : '+ Create Project'}
          </button>
        </form>
      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className="empty-state">
          <div className="icon">📂</div>
          <p>No projects yet. Create your first one above!</p>
        </div>
      ) : (
        <div className="projects-grid">
          {projects.map(p => (
            <ProjectCard key={p._id} project={p} onDelete={deleteProject} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
