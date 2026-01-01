import React, { useState } from 'react';
import './App.css';
import AdminLogin from './components/Admin/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';
import StudentLogin from './components/student/StudentLogin';
import StudentDashboard from './components/student/StudentDashboard';

function App() {
  const [adminLogged, setAdminLogged] = useState(false);
  const [studentId, setStudentId] = useState(null);

  return (
    <div className="app-root">
      <div className="card-wrapper">
        {!adminLogged && !studentId && (
          <>
            <h1 className="mb-3">Student Management System</h1>
            <AdminLogin onLogin={() => setAdminLogged(true)} />
            <hr />
            <StudentLogin onLogin={(id) => setStudentId(id)} />
          </>
        )}

        {adminLogged && (
          <AdminDashboard onLogout={() => setAdminLogged(false)} />
        )}

        {studentId && !adminLogged && (
          <StudentDashboard
            studentId={studentId}
            onLogout={() => setStudentId(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;