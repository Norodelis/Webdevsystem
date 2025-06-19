import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext.jsx';

const Navbar = () => {
  const { user, setUser } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <nav style={{
      background: '#6366f1',
      padding: '1rem',
      marginBottom: '2rem',
      color: '#fff',
      display: 'flex',
      gap: '1.5rem',
      alignItems: 'center'
    }}>
      <img src="/logo.png" alt="Logo" style={{ height: 40, marginRight: 16, borderRadius: 8 }} />
      <Link to={user.role === 'Student' ? "/student-dashboard" : "/professor-dashboard"} style={{ color: '#fff', fontWeight: 'bold' }}>Dashboard</Link>
      <Link to="/profile" style={{ color: '#fff' }}>Profile</Link>
      {user.role === 'Student' && (
        <>
          <Link to="/schedules" style={{ color: '#fff' }}>Schedules</Link>
          <Link to="/grades" style={{ color: '#fff' }}>Grades</Link>
          <Link to="/subjects" style={{ color: '#fff' }}>Subjects</Link>
        </>
      )}
      {user.role === 'Teacher' && (
        <>
          <Link to="/students" style={{ color: '#fff' }}>Students</Link>
          <Link to="/grades" style={{ color: '#fff' }}>Grades</Link>
        </>
      )}
      <button onClick={handleLogout} style={{ marginLeft: 'auto', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '5px', padding: '0.5rem 1rem' }}>Logout</button>
    </nav>
  );
};

export default Navbar;