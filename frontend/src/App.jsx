import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login.jsx';
import Navbar from './Navbar.jsx';
import Profile from './Profile.jsx';
import Schedules from './Schedules.jsx';
import Grades from './Grades.jsx';
import Subjects from './Subjects.jsx';
import Students from './Students.jsx';
import { AuthContext } from './AuthContext.jsx';
import StudentDashboard from './StudentDashboard.jsx';

const ProfessorDashboard = () => (
  <div>
    <h2>Professor Dashboard</h2>
    <p>Welcome, Professor!</p>
  </div>
);

const ProtectedRoute = ({ children, role }) => {
  const { user } = React.useContext(AuthContext);
  if (!user) return <Navigate to="/" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

const App = () => {
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/student-dashboard" element={
            <ProtectedRoute role="Student"><StudentDashboard /></ProtectedRoute>
          } />
          <Route path="/professor-dashboard" element={
            <ProtectedRoute role="Teacher"><ProfessorDashboard /></ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute><Profile /></ProtectedRoute>
          } />
          <Route path="/schedules" element={
            <ProtectedRoute role="Student"><Schedules /></ProtectedRoute>
          } />
          <Route path="/grades" element={
            <ProtectedRoute><Grades /></ProtectedRoute>
          } />
          <Route path="/subjects" element={
            <ProtectedRoute role="Student"><Subjects /></ProtectedRoute>
          } />
          <Route path="/students" element={
            <ProtectedRoute role="Teacher"><Students /></ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
