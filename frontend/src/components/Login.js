// src/components/Login.js

import React, { useState, useContext } from 'react';
import { loginUser, registerUser, getProfile } from './API';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    bio: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      if (isLogin) {
        await loginUser(formData.email, formData.password);
        const userData = await getProfile();
        setUser(userData);
        setMessage('Login successful!');
        navigate('/profile');
      } else {
        if (formData.password !== formData.confirmPassword) {
          setMessage('Passwords do not match.');
          return;
        }
        await registerUser(formData.username, formData.email, formData.password, formData.bio);
        setMessage('Registration successful! Please log in.');
        setIsLogin(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage(error.message);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setMessage('');
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      bio: '',
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white/60 rounded-xl p-8 w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">{isLogin ? 'Login' : 'Register'}</h2>
        {message && <p className="text-red-500 text-center mb-4">{message}</p>}

        {!isLogin && (
          <div className="mb-4">
            <label className="block text-gray-700">Username:</label>
            <input
              type="text"
              required
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full p-2 border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-2 border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password:</label>
          <input
            type="password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full p-2 border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {!isLogin && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700">Confirm Password:</label>
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full p-2 border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Bio:</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full p-2 border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Tell us about yourself..."
              />
            </div>
          </>
        )}

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-xl w-full hover:bg-blue-600 transition duration-200">
          {isLogin ? 'Login' : 'Register'}
        </button>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={toggleForm}
            className="text-blue-500 hover:underline"
          >
            {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
