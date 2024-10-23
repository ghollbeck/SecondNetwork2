// src/components/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import { getProfile } from './API';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // No token, no need to fetch profile
      return;
    }

    const fetchUser = async () => {
      try {
        const userData = await getProfile();
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        setUser(null);
        localStorage.removeItem('token'); // Remove invalid token
      }
    };

    fetchUser();
  }, []);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};
