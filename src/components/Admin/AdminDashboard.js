import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import StudentForm from './StudentForm';
import StudentList from './StudentList';
import AcademicForm from './AcademicForm';

function AdminDashboard({ onLogout }) {
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  const loadStudents = async () => {
    const res = await api.get('/students/');
    setStudents(res.data);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <div>
      <div className="dashboard-header">
        <h2>Admin Dashboard</h2>
        <button onClick={onLogout}>Logout</button>
      </div>

      <h3 className="section-title">Add Student</h3>
      <StudentForm onSaved={loadStudents} />

      <div className="dashboard-columns">
        <div>
          <h3 className="section-title">All Students</h3>
          <StudentList
            students={students}
            onSelectStudent={(id) => setSelectedStudentId(id)}
          />
        </div>

        <div>
          <h3 className="section-title">Add Academic Record</h3>
          <AcademicForm
            studentId={selectedStudentId}
            onSaved={() => {}}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
