import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext.jsx';

const Schedules = () => {
  const { user } = React.useContext(AuthContext);
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/student/schedules', {
      headers: { Authorization: `Bearer ${user.token}` }
    }).then(res => setSchedules(res.data));
  }, [user]);

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto' }}>
      <h2 style={{ color: '#fff' }}>My Schedules</h2>
      <table border="1" cellPadding="8" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Day</th>
            <th>Subject</th>
            <th>Start</th>
            <th>End</th>
            <th>Room</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((s, i) => (
            <tr key={i}>
              <td>{s.day}</td>
              <td>{s.subject_name}</td>
              <td>{s.start_time}</td>
              <td>{s.end_time}</td>
              <td>{s.room}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Schedules;