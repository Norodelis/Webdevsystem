import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext.jsx';

const ProfessorDashboard = () => {
  const { user } = React.useContext(AuthContext);
  const [fullName, setFullName] = useState(user && user.full_name ? user.full_name : '');
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    if (!user.full_name) {
      axios.get('http://localhost:5000/api/profile', {
        headers: { Authorization: `Bearer ${user.token}` }
      }).then(res => {
        setFullName(res.data.full_name);
      });
    } else {
      setFullName(user.full_name);
    }
    // Fetch professor schedules
    axios.get('http://localhost:5000/api/teacher/schedules', {
      headers: { Authorization: `Bearer ${user.token}` }
    }).then(res => setSchedules(res.data));
  }, [user]);

  return (
    <div className="page-container">
      <h2>Welcome Professor {fullName}!</h2>
      <p>Behind every grade is a story of growth. Continue inspiring minds and guiding futures.</p>
      <div style={{ marginTop: 32 }}>
        <h3>My Class Schedules</h3>
        <table>
          <thead>
            <tr>
              <th>Day</th>
              <th>Subject</th>
              <th>Section</th>
              <th>Start</th>
              <th>End</th>
              <th>Room</th>
            </tr>
          </thead>
          <tbody>
            {schedules.length === 0 ? (
              <tr><td colSpan={6}>No schedules found.</td></tr>
            ) : (
              schedules.map((s, i) => (
                <tr key={i}>
                  <td>{s.day}</td>
                  <td>{s.subject_name}</td>
                  <td>{s.section}</td>
                  <td>{s.start_time}</td>
                  <td>{s.end_time}</td>
                  <td>{s.room}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfessorDashboard;
