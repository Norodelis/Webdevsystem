import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext.jsx';

const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

const StudentDashboard = () => {
  const { user } = React.useContext(AuthContext);
  const [todaySchedules, setTodaySchedules] = useState([]);
  const [grades, setGrades] = useState([]);
  const [announcements] = useState([
    "Enrollment for next semester starts July 1.",
    "Final exams week: August 10-14.",
    "Check your profile to update your info."
  ]);

  useEffect(() => {
    // Get today's schedule
    const today = days[new Date().getDay()];
    axios.get('http://localhost:5000/api/student/schedules', {
      headers: { Authorization: `Bearer ${user.token}` }
    }).then(res => {
      setTodaySchedules(res.data.filter(s => s.day === today).slice(0, 3));
    });
    // Get grades
    axios.get('http://localhost:5000/api/student/grades', {
      headers: { Authorization: `Bearer ${user.token}` }
    }).then(res => setGrades(res.data));
  }, [user]);

  const avgGrade = grades.length
    ? (grades.reduce((sum, g) => sum + Number(g.final_grade), 0) / grades.length).toFixed(2)
    : 'N/A';

  return (
    <div className="page-container">
      <h2>Welcome, {user && user.full_name ? user.full_name : "Student"}!</h2>
      <div style={{ marginBottom: 24 }}>
        <strong>Today's Schedule:</strong>
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Start</th>
              <th>End</th>
              <th>Room</th>
            </tr>
          </thead>
          <tbody>
            {todaySchedules.length === 0 ? (
              <tr><td colSpan={4}>No classes today!</td></tr>
            ) : (
              todaySchedules.map((s, i) => (
                <tr key={i}>
                  <td>{s.subject_name}</td>
                  <td>{s.start_time}</td>
                  <td>{s.end_time}</td>
                  <td>{s.room}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div style={{ marginBottom: 24 }}>
        <strong>Average Grade:</strong> <span style={{ color: '#6366f1', fontWeight: 700 }}>{avgGrade}</span>
      </div>
      <div>
        <strong>Announcements:</strong>
        <ul>
          {announcements.map((a, i) => <li key={i}>{a}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default StudentDashboard;