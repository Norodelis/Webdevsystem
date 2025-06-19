import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext.jsx';

const Login = () => {
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = React.useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role })
      });
      const data = await res.json();
      if (data.token) {
        // Fetch profile to get full_name
        const profileRes = await fetch('http://localhost:5000/api/profile', {
          headers: { Authorization: `Bearer ${data.token}` }
        });
        const profile = await profileRes.json();
        setUser({ token: data.token, role: data.role, userId: data.userId, full_name: profile.full_name });
        if (data.role === 'Teacher') {
          navigate('/professor-dashboard');
        } else if (data.role === 'Student') {
          navigate('/student-dashboard');
        }
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    }
  };

  return (
    <div className="login-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="logohead" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
          <h2 style={{ margin: 0, marginRight: 16 }}>Welcome to OGS</h2>
          <img src="/logo.png" alt="Logo" style={{ height: 60, borderRadius: 12, boxShadow: '0 2px 12px rgba(99,102,241,0.08)' }} />
        </div>
        <div className="role-select">
          <label>
            <input
              type="radio"
              value="student"
              checked={role === 'student'}
              onChange={() => setRole('student')}
            />
            Student
          </label>
          <label>
            <input
              type="radio"
              value="professor"
              checked={role === 'professor'}
              onChange={() => setRole('professor')}
            />
            Professor
          </label>
        </div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className="error">{error}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
