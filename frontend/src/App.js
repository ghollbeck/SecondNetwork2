// src/App.js

import React from 'react';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';

import './index.css'; // Tailwind CSS and custom styles

function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        {/* Navigation Bar */}
        <NavBar />

        {/* Main Content */}
        <main className="flex-grow">
          <Outlet /> {/* Renders the matched child route */}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
