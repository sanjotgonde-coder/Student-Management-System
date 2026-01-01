import React, { useEffect, useState } from 'react';
import api from '../../services/api';

function StudentReport({ studentId }) {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await api.get(`/academics/${studentId}/`);
      setRecords(res.data);
    };
    if (studentId) {
      load();
    }
  }, [studentId]);

  if (!studentId) {
    return null;
  }

  return (
    <div>
      <h3>Academic Report</h3>
      <table border="1">
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
          {records.map((r) => (
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

export default StudentReport;
