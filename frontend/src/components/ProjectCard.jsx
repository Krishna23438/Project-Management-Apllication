import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ project, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = (e) => {
    e.stopPropagation(); 
    if (window.confirm(`Delete project "${project.name}"? All its tasks will be deleted too.`)) {
      onDelete(project._id);
    }
  };

  return (
    <div className="project-card" onClick={() => navigate(`/projects/${project._id}`)}>
      <button className="btn-delete-proj" onClick={handleDelete} title="Delete project">✕</button>
      <h3>{project.name}</h3>
      <p>{project.description || 'No description provided.'}</p>
      <div className="project-card-footer">
        <span className="task-count">📝 {project.taskCount ?? 0} task{project.taskCount !== 1 ? 's' : ''}</span>
        <span className="project-date">
          {new Date(project.createdAt).toLocaleDateString('en-IN', {
            day: 'numeric', month: 'short', year: 'numeric'
          })}
        </span>
      </div>
    </div>
  );
};

export default ProjectCard;
