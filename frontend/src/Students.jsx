import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext.jsx';

const Students = () => {
  const { user } = React.useContext(AuthContext);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/teacher/students/grouped', {
      headers: { Authorization: `Bearer ${user.token}` }
    }).then(res => setStudents(res.data));
  }, [user]);

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto' }}>
      <h2 style={{ color: '#fff' }}>My Students</h2>
      <table border="1" cellPadding="8" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Section</th>
            <th>Subjects</th>
            <th>Grade Level</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.student_id + '-' + s.section}>
              <td>{s.full_name}</td>
              <td>{s.section}</td>
              <td>{s.subjects}</td>
              <td>{s.grade_level}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Students;