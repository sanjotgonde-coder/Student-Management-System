import React, { useState } from 'react';
import api from '../../services/api';

const COURSES = ['BCA', 'BSc CS', 'BCom', 'BA','B.Tech'];
const SEMESTERS = [1, 2, 3, 4, 5, 6];
const YEARS = [2023, 2024, 2025, 2026];
const GRADES = ['A+', 'A', 'B+', 'B', 'C'];

function AcademicForm() {
  const [studentId, setStudentId] = useState('');
  const [course, setCourse] = useState(COURSES[0]);
  const [semester, setSemester] = useState(SEMESTERS[0]);
  const [year, setYear] = useState(YEARS[0]);
  const [marks, setMarks] = useState('');
  const [grade, setGrade] = useState(GRADES[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!studentId) {
      alert('Please enter student ID (from All Students table).');
      return;
    }

    try {
      const body = {
        student: Number(studentId),
        course: course,
        semester: Number(semester),
        year: Number(year),
        marks: Number(marks),
        grade: grade,
      };

      const res = await api.post('/academics/', body);
      console.log('Saved academic:', res.data);
      alert('Academic record saved');

      // reset only marks; keep others for faster entry
      setMarks('');
    } catch (err) {
      console.error('Error data:', err.response?.data || err.message);
      alert('Error while saving academic record. Check console for details.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Academic Record</h3>

      <input
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        placeholder="Student ID (e.g. 1)"
      />

      <select value={course} onChange={(e) => setCourse(e.target.value)}>
        {COURSES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <select
        value={semester}
        onChange={(e) => setSemester(e.target.value)}
      >
        {SEMESTERS.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <select value={year} onChange={(e) => setYear(e.target.value)}>
        {YEARS.map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>

      <input
        value={marks}
        onChange={(e) => setMarks(e.target.value)}
        placeholder="Marks"
      />

      <select value={grade} onChange={(e) => setGrade(e.target.value)}>
        {GRADES.map((g) => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>

      <button type="submit">Save</button>
    </form>
  );
}

export default AcademicForm;
