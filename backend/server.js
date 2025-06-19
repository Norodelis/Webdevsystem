// Basic Express server for login
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

const JWT_SECRET = 'your_secret_key'; // Change this in production

// MySQL connection pool
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // your MySQL password
  database: 'og_sys'
});

// JWT middleware
function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
}

// --- AUTH ---

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password, role } = req.body;
  const [rows] = await db.query(
    'SELECT * FROM users WHERE email = ? AND role = ?',
    [email, role === 'professor' ? 'Teacher' : 'Student']
  );
  if (rows.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

  const user = rows[0];
  // For demo: compare plain password, use bcrypt.compareSync in production
  // if (!bcrypt.compareSync(password, user.password)) return res.status(401).json({ message: 'Invalid credentials' });
  if (password !== user.password) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ userId: user.user_id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, role: user.role, userId: user.user_id });
});

// --- PROFILE ---

// Get profile
app.get('/api/profile', authenticateJWT, async (req, res) => {
  const { userId, role } = req.user;
  let profile;
  if (role === 'Student') {
    const [rows] = await db.query('SELECT * FROM student_profiles WHERE student_id = ?', [userId]);
    profile = rows[0];
  } else {
    const [rows] = await db.query('SELECT * FROM teacher_profiles WHERE teacher_id = ?', [userId]);
    profile = rows[0];
  }
  res.json(profile);
});

// Update profile
app.put('/api/profile', authenticateJWT, async (req, res) => {
  const { userId, role } = req.user;
  const { full_name, department, section, grade_level } = req.body;
  if (role === 'Student') {
    await db.query(
      'UPDATE student_profiles SET full_name = ?, grade_level = ?, section = ? WHERE student_id = ?',
      [full_name, grade_level, section, userId]
    );
  } else {
    await db.query(
      'UPDATE teacher_profiles SET full_name = ?, department = ? WHERE teacher_id = ?',
      [full_name, department, userId]
    );
  }
  res.json({ success: true });
});

// Change password
app.put('/api/profile/password', authenticateJWT, async (req, res) => {
  const { userId } = req.user;
  const { password } = req.body;
  // For demo: store plain, use bcrypt.hashSync(password, 10) in production
  await db.query('UPDATE users SET password = ? WHERE user_id = ?', [password, userId]);
  res.json({ success: true });
});

// --- STUDENT ENDPOINTS ---

// Get schedules
app.get('/api/student/schedules', authenticateJWT, async (req, res) => {
  const { userId } = req.user;
  // Get all schedules for the student's enrolled classes, ordered by day and time
  const [rows] = await db.query(`
    SELECT s.day, s.start_time, s.end_time, s.room, sub.subject_name
    FROM schedules s
    JOIN classes c ON s.class_id = c.class_id
    JOIN subjects sub ON c.subject_id = sub.subject_id
    JOIN enrollments e ON c.class_id = e.class_id
    WHERE e.student_id = ?
      AND s.day IN ('Monday','Tuesday','Wednesday','Thursday','Friday')
    ORDER BY FIELD(s.day, 'Monday','Tuesday','Wednesday','Thursday','Friday'), s.start_time, sub.subject_name
  `, [userId]);

  // Group by day and limit to 3 per day
  const grouped = {};
  for (const sched of rows) {
    if (!grouped[sched.day]) grouped[sched.day] = [];
    if (grouped[sched.day].length < 3) grouped[sched.day].push(sched);
  }
  // Flatten to array
  const limited = Object.values(grouped).flat();
  res.json(limited);
});

// Get grades
app.get('/api/student/grades', authenticateJWT, async (req, res) => {
  const { userId } = req.user;
  const [rows] = await db.query(`
    SELECT 
      sub.subject_name,
      c.section,
      g.perf_task_score,
      g.perf_task_max,
      g.written_score,
      g.written_max,
      g.exam_score,
      g.exam_max,
      g.final_grade
    FROM grades g
    JOIN enrollments e ON g.enrollment_id = e.enrollment_id
    JOIN classes c ON e.class_id = c.class_id
    JOIN subjects sub ON c.subject_id = sub.subject_id
    WHERE e.student_id = ?
    GROUP BY sub.subject_name, c.section, g.perf_task_score, g.perf_task_max, g.written_score, g.written_max, g.exam_score, g.exam_max, g.final_grade
    ORDER BY sub.subject_name
  `, [userId]);
  res.json(rows);
});

// Get subjects
app.get('/api/student/subjects', authenticateJWT, async (req, res) => {
  const { userId } = req.user;
  const [rows] = await db.query(`
    SELECT DISTINCT sub.subject_id, sub.subject_name
    FROM subjects sub
    JOIN classes c ON sub.subject_id = c.subject_id
    JOIN enrollments e ON c.class_id = e.class_id
    WHERE e.student_id = ?
  `, [userId]);
  res.json(rows);
});

// --- TEACHER ENDPOINTS ---

// Get students in teacher's classes (detailed, for grades page)
app.get('/api/teacher/students', authenticateJWT, async (req, res) => {
  const { userId } = req.user;
  const [rows] = await db.query(`
    SELECT DISTINCT sp.student_id, sp.full_name, sp.grade_level, c.section, sub.subject_name, e.enrollment_id, g.grade_id,
      g.perf_task_score, g.perf_task_max, g.written_score, g.written_max, g.exam_score, g.exam_max, g.final_grade
    FROM student_profiles sp
    JOIN enrollments e ON sp.student_id = e.student_id
    JOIN classes c ON e.class_id = c.class_id
    JOIN subjects sub ON c.subject_id = sub.subject_id
    LEFT JOIN grades g ON g.enrollment_id = e.enrollment_id
    WHERE c.teacher_id = ?
  `, [userId]);
  res.json(rows);
});

// Get grouped students (one row per student, all subjects merged, for student list)
app.get('/api/teacher/students/grouped', authenticateJWT, async (req, res) => {
  const { userId } = req.user;
  const [rows] = await db.query(`
    SELECT 
      sp.student_id, 
      sp.full_name, 
      sp.grade_level, 
      c.section, 
      GROUP_CONCAT(DISTINCT sub.subject_name ORDER BY sub.subject_name SEPARATOR ', ') AS subjects
    FROM student_profiles sp
    JOIN enrollments e ON sp.student_id = e.student_id
    JOIN classes c ON e.class_id = c.class_id
    JOIN subjects sub ON c.subject_id = sub.subject_id
    WHERE c.teacher_id = ?
    GROUP BY sp.student_id, sp.full_name, sp.grade_level, c.section
    ORDER BY sp.full_name
  `, [userId]);
  res.json(rows);
});

// Update student grade
app.put('/api/teacher/grades/:gradeId', authenticateJWT, async (req, res) => {
  const { gradeId } = req.params;
  const { perf_task_score, perf_task_max, written_score, written_max, exam_score, exam_max, final_grade } = req.body;
  await db.query(`
    UPDATE grades SET perf_task_score=?, perf_task_max=?, written_score=?, written_max=?, exam_score=?, exam_max=?, final_grade=?
    WHERE grade_id=?
  `, [perf_task_score, perf_task_max, written_score, written_max, exam_score, exam_max, final_grade, gradeId]);
  io.emit('gradeUpdate', { gradeId }); // Real-time update
  res.json({ success: true });
});

// Get schedules for teacher's classes
app.get('/api/teacher/schedules', authenticateJWT, async (req, res) => {
  const { userId } = req.user;
  const [rows] = await db.query(`
    SELECT s.day, s.start_time, s.end_time, s.room, sub.subject_name, c.section
    FROM schedules s
    JOIN classes c ON s.class_id = c.class_id
    JOIN subjects sub ON c.subject_id = sub.subject_id
    WHERE c.teacher_id = ?
    ORDER BY FIELD(s.day, 'Monday','Tuesday','Wednesday','Thursday','Friday'), s.start_time, sub.subject_name
  `, [userId]);
  res.json(rows);
});

// --- REAL-TIME SOCKET.IO ---

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// --- START SERVER ---

const PORT = 5000;
server.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
