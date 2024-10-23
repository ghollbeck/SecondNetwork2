// // src/components/NavBar.js
// import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import '../index.css';

// const NavBar = () => {
//   const [isOpen, setIsOpen] = useState(false); // For mobile menu toggle
//   const activeClassName = 'active'; // Use the active class for styling

//   return (
//     <nav className="bg-gray-500 bg-opacity-30 p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         {/* Logo or Brand Name */}
//         <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 font-bold text-2xl">
//           <NavLink to="/">SecondNetwork</NavLink>
//         </div>

//         {/* Hamburger Menu for Mobile */}
//         <div className="md:hidden">
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="text-white focus:outline-none"
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               {isOpen ? (
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M6 18L18 6M6 6l12 12"
//                 ></path>
//               ) : (
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M4 6h16M4 12h16M4 18h16"
//                 ></path>
//               )}
//             </svg>
//           </button>
//         </div>

//         {/* Navigation Links */}
//         <div className={`md:flex space-x-4 ${isOpen ? 'block' : 'hidden'}`}>
//           <NavLink
//             to="/"
//             end
//             className={({ isActive }) =>
//               `nav-button ${isActive ? activeClassName : ''} block md:inline-block`
//             }
//             onClick={() => setIsOpen(false)} // Close menu on link click
//           >
//             Home
//           </NavLink>
//           <NavLink
//             to="/profile"
//             className={({ isActive }) =>
//               `nav-button ${isActive ? activeClassName : ''} block md:inline-block`
//             }
//             onClick={() => setIsOpen(false)}
//           >
//             Profile
//           </NavLink>
//           <NavLink
//             to="/search"
//             className={({ isActive }) =>
//               `nav-button ${isActive ? activeClassName : ''} block md:inline-block`
//             }
//             onClick={() => setIsOpen(false)}
//           >
//             Search
//           </NavLink>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default NavBar;


// src/components/NavBar.js

import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import '../index.css';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false); // For mobile menu toggle
  const { user, setUser } = useContext(AuthContext); // Get user from AuthContext
  const activeClassName = 'active'; // Use the active class for styling

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <nav className="bg-gray-500 bg-opacity-30 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Brand Name */}
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 font-bold text-2xl">
          <NavLink to="/">SecondNetwork</NavLink>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              )}
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div className={`md:flex space-x-4 ${isOpen ? 'block' : 'hidden'}`}>
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `nav-button ${isActive ? activeClassName : ''} block md:inline-block`
        }
        onClick={() => setIsOpen(false)} // Close menu on link click
      >
        Home
      </NavLink>

      {user ? (
        <>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `nav-button ${isActive ? activeClassName : ''} block md:inline-block`
            }
            onClick={() => setIsOpen(false)}
          >
            Profile
          </NavLink>
          <button
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
            className="nav-button block md:inline-block"
          >
            Logout
          </button>
        </>
      ) : (
        <NavLink
          to="/login"
          className={({ isActive }) =>
            `nav-button ${isActive ? activeClassName : ''} block md:inline-block`
          }
          onClick={() => setIsOpen(false)}
        >
          Login
        </NavLink>
      )}

      <NavLink
        to="/search"
        className={({ isActive }) =>
          `nav-button ${isActive ? activeClassName : ''} block md:inline-block`
        }
        onClick={() => setIsOpen(false)}
      >
        Search
      </NavLink>
    </div>

      </div>
    </nav>
  );
};

export default NavBar;
