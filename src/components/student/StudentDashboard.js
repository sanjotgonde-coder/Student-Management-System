import React, { useEffect, useState } from 'react';
import api from '../../services/api';

function StudentDashboard({ studentId, onLogout }) {
  const [profile, setProfile] = useState(null);
  const [academics, setAcademics] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const p = await api.get(`/students/${studentId}/`);
      setProfile(p.data);

      const a = await api.get(`/academics/${studentId}/`);
      setAcademics(a.data);
    };
    loadData();
  }, [studentId]);

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <div className="dashboard-header">
        <h2>Student Dashboard</h2>
        <button onClick={onLogout}>Logout</button>
      </div>

      <h3 className="section-title">Profile</h3>
      <p><b>Name:</b> {profile.name}</p>
      <p><b>Roll No:</b> {profile.roll_no}</p>
      <p><b>Email:</b> {profile.email}</p>
      <p><b>Phone:</b> {profile.phone}</p>
      <p><b>Address:</b> {profile.address}</p>

      <h3 className="section-title">Academic Report</h3>
      <table>
        <thead>
          <tr>
            <th>Course</th>
            <th>Semester</th>
            <th>Year</th>
            <th>Marks</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {academics.map((r) => (
            <tr key={r.id}>
              <td>{r.course}</td>
              <td>{r.semester}</td>
              <td>{r.year}</td>
              <td>{r.marks}</td>
              <td>{r.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentDashboard;
