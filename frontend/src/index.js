// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import Home from './components/Home';
import Profile from './components/Profile';
import Search from './components/Search';
import Login from './components/Login';
import Register from './components/Register';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfUse from './TermsOfUse';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

import './index.css'; // Tailwind CSS and custom styles

// Define the router with nested routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Layout component
    children: [
      {
        index: true, // Default route ("/")
        element: <Home />,
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: 'search',
        element: <Search />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'privacy',
        element: <PrivacyPolicy />,
      },
      {
        path: 'terms',
        element: <TermsOfUse />,
      },
      {
        path: '*', // Catch-all for undefined routes
        element: <NotFound />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
