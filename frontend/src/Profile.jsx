import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext.jsx';

const Profile = () => {
  const { user } = React.useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({});
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/profile', {
      headers: { Authorization: `Bearer ${user.token}` }
    }).then(res => {
      setProfile(res.data);
      setForm(res.data);
    });
  }, [user]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    await axios.put('http://localhost:5000/api/profile', form, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    setMsg('Profile updated!');
    setEdit(false);
  };

  const handlePassword = async () => {
    if (!password) return;
    await axios.put('http://localhost:5000/api/profile/password', { password }, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    setMsg('Password changed!');
    setPassword('');
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="profile-card page-container" style={{ minHeight: '60vh' }}>
      <div className="profile-title">Profile</div>
      <div className="profile-detail">
        <span className="profile-label">Full Name:</span>
        <span className="profile-value"> {profile.full_name}</span>
      </div>
      {user.role === 'Student' && (
        <>
          <div className="profile-detail">
            <span className="profile-label">Grade Level:</span>
            <span className="profile-value"> {profile.grade_level}</span>
          </div>
          <div className="profile-detail">
            <span className="profile-label">Section:</span>
            <span className="profile-value"> {profile.section}</span>
          </div>
        </>
      )}
      {user.role === 'Teacher' && (
        <div className="profile-detail">
          <span className="profile-label">Department:</span>
          <span className="profile-value"> {profile.department}</span>
        </div>
      )}
      {edit && (
        <form style={{ marginTop: 20 }}>
          <input name="full_name" value={form.full_name || ''} onChange={handleChange} placeholder="Full Name" />
          {user.role === 'Student' && (
            <>
              <input name="grade_level" value={form.grade_level || ''} onChange={handleChange} placeholder="Grade Level" />
              <input name="section" value={form.section || ''} onChange={handleChange} placeholder="Section" />
            </>
          )}
          {user.role === 'Teacher' && (
            <input name="department" value={form.department || ''} onChange={handleChange} placeholder="Department" />
          )}
          <div className="profile-actions">
            <button type="button" onClick={handleSave}>Save</button>
            <button type="button" onClick={() => setEdit(false)}>Cancel</button>
          </div>
        </form>
      )}
      {!edit && (
        <div className="profile-actions">
          <button type="button" onClick={() => setEdit(true)}>Edit Profile</button>
        </div>
      )}
      <form style={{ marginTop: 20 }}>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="New password" />
        <button type="button" onClick={handlePassword}>Change Password</button>
      </form>
      {msg && <div className="success">{msg}</div>}
    </div>
  );
};

export default Profile;