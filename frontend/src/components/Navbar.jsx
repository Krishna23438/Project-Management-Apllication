import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <a className="navbar-brand" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
        📋 ProjectHub
      </a>
      {user && (
        <div className="navbar-right">
          <span className="navbar-user">👋 {user.name}</span>
          <button className="btn-logout" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
