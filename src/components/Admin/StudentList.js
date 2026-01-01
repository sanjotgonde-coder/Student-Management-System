import React from 'react';

function StudentList({ students, onSelectStudent }) {
  return (
    <div>
      <h3>All Students</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Id</th>
            <th>Roll No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr
              key={s.id}
              onClick={() => onSelectStudent && onSelectStudent(s.id)}
              style={{ cursor: 'pointer' }}
            >
              <td>{s.id}</td>
              <td>{s.roll_no}</td>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Click a student row to select it for adding academic records.</p>
    </div>
  );
}

export default StudentList;
