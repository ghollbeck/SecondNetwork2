// src/components/Register.js

import React, { useState, useContext } from 'react';
import { registerUser, loginUser, getProfile } from './API';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({ username: '', email: '', password: '', bio: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // For navigation after registration

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData.username, formData.email, formData.password, formData.bio);
      setMessage('Registration successful!');
      // Optionally, log in the user automatically
      await loginUser(formData.email, formData.password);
      const userData = await getProfile(); // Fetch user data after login
      setUser(userData);
      navigate('/profile'); // Redirect to profile page
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4">Register</h2>
        {message && <p className="text-red-500">{message}</p>}
        <div className="mb-4">
          <label className="block">Username:</label>
          <input
            type="text"
            required
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block">Email:</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block">Password:</label>
          <input
            type="password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block">Bio:</label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
