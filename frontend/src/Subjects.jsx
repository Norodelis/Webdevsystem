import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext.jsx';

const Subjects = () => {
  const { user } = React.useContext(AuthContext);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/student/subjects', {
      headers: { Authorization: `Bearer ${user.token}` }
    }).then(res => setSubjects(res.data));
  }, [user]);

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', minHeight: '75vh' }}>
      <h2 style={{ color: '#fff' }}>My Subjects</h2>
      <table border="1" cellPadding="8" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Subject Name</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map(s => (
            <tr key={s.subject_id}>
              <td>{s.subject_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Subjects;