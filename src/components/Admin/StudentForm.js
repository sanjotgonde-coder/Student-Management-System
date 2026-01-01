import React, { useState } from 'react';
import api from '../../services/api';

function StudentForm({ onSaved }) {
  const [form, setForm] = useState({
    roll_no: '',
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(form).forEach((key) => {
        if (form[key] !== null && form[key] !== '') {
          data.append(key, form[key]);
        }
      });

      const res = await api.post('/students/', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Student saved:', res.data);
      alert('Student saved');

      if (onSaved) onSaved();

      setForm({
        roll_no: '',
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        photo: null,
      });
    } catch (err) {
      console.error('STUDENT FORM ERROR RAW:', err);
      if (err.response && err.response.data) {
        console.error('STUDENT FORM ERROR DATA:', err.response.data);
        alert('Backend error:\n' + JSON.stringify(err.response.data, null, 2));
      } else {
        alert('Error: ' + err.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Student</h3>

      <input
        name="roll_no"
        value={form.roll_no}
        onChange={handleChange}
        placeholder="Roll No"
      />
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Phone"
      />
      <textarea
        name="address"
        value={form.address}
        onChange={handleChange}
        placeholder="Address"
      />
      <input
        type="file"
        name="photo"
        onChange={handleChange}
      />

      <button type="submit">Save</button>
    </form>
  );
}

export default StudentForm;
