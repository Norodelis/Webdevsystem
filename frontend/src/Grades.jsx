import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext.jsx';
import { io } from 'socket.io-client';

const Grades = () => {
  const { user } = React.useContext(AuthContext);
  const [grades, setGrades] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editGrade, setEditGrade] = useState({});
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetchGrades();
    // Real-time updates
    const socket = io('http://localhost:5000');
    socket.on('gradeUpdate', () => fetchGrades());
    return () => socket.disconnect();
  }, []);

  const fetchGrades = () => {
    const url = user.role === 'Teacher'
      ? 'http://localhost:5000/api/teacher/students'
      : 'http://localhost:5000/api/student/grades';
    axios.get(url, {
      headers: { Authorization: `Bearer ${user.token}` }
    }).then(res => setGrades(res.data));
  };

  const handleEdit = (g) => {
    setEditId(g.grade_id);
    setEditGrade(g);
  };

  const handleChange = e => setEditGrade({ ...editGrade, [e.target.name]: e.target.value });

  const handleSave = async () => {
    await axios.put(`http://localhost:5000/api/teacher/grades/${editGrade.grade_id}`, editGrade, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    setEditId(null);
    setMsg('Grade updated!');
    fetchGrades();
  };

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto', minHeight: '75vh' }}>
      <h2 style={{ color: '#fff' }}>Grades</h2>
      <table>
        <thead>
          <tr>
            {user.role === 'Teacher' && <th>Student</th>}
            <th>Subject</th>
            <th>Section</th>
            <th>Performance</th>
            <th>Written</th>
            <th>Exam</th>
            <th>Final Grade</th>
            <th>Status</th> {/* New column */}
            {user.role === 'Teacher' && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {grades.map(g => (
            <tr key={g.grade_id || g.enrollment_id}>
              {user.role === 'Teacher' && <td>{g.full_name}</td>}
              <td>{g.subject_name}</td>
              <td>{g.section}</td>
              <td>
                {editId === g.grade_id ? (
                  <>
                    <input name="perf_task_score" value={editGrade.perf_task_score || ''} onChange={handleChange} style={{ width: 40 }} /> /
                    <input name="perf_task_max" value={editGrade.perf_task_max || ''} onChange={handleChange} style={{ width: 40 }} />
                  </>
                ) : (
                  `${g.perf_task_score} / ${g.perf_task_max}`
                )}
              </td>
              <td>
                {editId === g.grade_id ? (
                  <>
                    <input name="written_score" value={editGrade.written_score || ''} onChange={handleChange} style={{ width: 40 }} /> /
                    <input name="written_max" value={editGrade.written_max || ''} onChange={handleChange} style={{ width: 40 }} />
                  </>
                ) : (
                  `${g.written_score} / ${g.written_max}`
                )}
              </td>
              <td>
                {editId === g.grade_id ? (
                  <>
                    <input name="exam_score" value={editGrade.exam_score || ''} onChange={handleChange} style={{ width: 40 }} /> /
                    <input name="exam_max" value={editGrade.exam_max || ''} onChange={handleChange} style={{ width: 40 }} />
                  </>
                ) : (
                  `${g.exam_score} / ${g.exam_max}`
                )}
              </td>
              <td>
                {editId === g.grade_id ? (
                  <input name="final_grade" value={editGrade.final_grade || ''} onChange={handleChange} style={{ width: 60 }} />
                ) : (
                  g.final_grade
                )}
              </td>
              <td>
                {g.final_grade >= 75 ? (
                  <span style={{ color: '#22c55e', fontWeight: 600 }}>Passed</span>
                ) : (
                  <span style={{ color: '#ef4444', fontWeight: 600 }}>Failed</span>
                )}
              </td>
              {user.role === 'Teacher' && (
                <td>
                  {editId === g.grade_id ? (
                    <button onClick={handleSave}>Save</button>
                  ) : (
                    <button onClick={() => handleEdit(g)}>Edit</button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {msg && <div style={{ color: 'green', marginTop: 10 }}>{msg}</div>}
    </div>
  );
};

export default Grades;