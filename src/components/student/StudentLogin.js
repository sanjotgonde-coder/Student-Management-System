import React, { useState } from 'react';
import api from '../../services/api';

function StudentLogin({ onLogin }) {
  const [roll_no, setRoll_No] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/student/login/', { roll_no, password });
      onLogin(res.data.student_id);
    } catch {
      alert('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Student Login</h2>
      <input value={roll_no} onChange={e => setRoll_No(e.target.value)} placeholder="Roll No" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}

export default StudentLogin;
