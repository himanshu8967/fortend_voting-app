import React, { useState } from 'react';
import { NavLink, useRouteLoaderData } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaUserCircle, FaSignInAlt, FaBroadcastTower, FaUserTie, FaUsers } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const token = useRouteLoaderData('root');

  const activeClass = 'bg-white text-blue-600';
  const inactiveClass = 'text-white';

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-md fixed top-0 w-full z-20">
      <div className=" flex items-center justify-between px-4 py-3">

        {/* Left */}
        <div className="flex-shrink-0">
          <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
            Voting Portal
          </h1>
        </div>

        {/* Right: Navigation Links for Desktop */}
        <div className="hidden md:flex flex-grow ml-auto justify-end space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${isActive ? activeClass : inactiveClass} text-base md:text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 ease-in-out px-3 py-2 rounded-md flex items-center`
            }
          >
            <FaHome className="mr-2" /> Home
          </NavLink>
          <NavLink
            to="/livevoting"
            className={({ isActive }) =>
              `${isActive ? activeClass : inactiveClass} text-base md:text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 ease-in-out px-3 py-2 rounded-md flex items-center`
            }
          >
            <FaBroadcastTower className="mr-2" /> Live Voting
          </NavLink>
          {token && (
            <>
              <NavLink
                to="/candidatelist"
                className={({ isActive }) =>
                  `${isActive ? activeClass : inactiveClass} text-base md:text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 ease-in-out px-3 py-2 rounded-md flex items-center`
                }
              >
                <FaUsers className="mr-2" /> View Candidates
              </NavLink>
              <NavLink
                to="/candidateform"
                className={({ isActive }) =>
                  `${isActive ? activeClass : inactiveClass} text-base md:text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 ease-in-out px-3 py-2 rounded-md flex items-center`
                }
              >
                <FaUserTie className="mr-2" /> Candidate Form
              </NavLink>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `${isActive ? activeClass : inactiveClass} text-base md:text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 ease-in-out px-3 py-2 rounded-md flex items-center`
                }
              >
                <FaUserCircle className="mr-2" /> Profile
              </NavLink>
            </>
          )}
          {!token && (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `${isActive ? activeClass : inactiveClass} text-base md:text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 ease-in-out px-3 py-2 rounded-md flex items-center`
              }
            >
              <FaSignInAlt className="mr-2" /> Login
            </NavLink>
          )}
        </div>

        {/* Right: Hamburger Icon for Mobile */}
        <div className="md:hidden flex-shrink-0 ml-auto">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-b from-blue-600 via-indigo-600 to-purple-600 text-white py-4 px-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${isActive ? activeClass : inactiveClass} text-lg hover:bg-white hover:text-blue-600 py-2 px-4 rounded-md flex items-center`
            }
            onClick={() => setIsOpen(false)}
          >
            <FaHome className="mr-2" /> Home
          </NavLink>
          <NavLink
            to="/live-voting"
            className={({ isActive }) =>
              `${isActive ? activeClass : inactiveClass} text-lg hover:bg-white hover:text-blue-600 py-2 px-4 rounded-md flex items-center`
            }
            onClick={() => setIsOpen(false)}
          >
            <FaBroadcastTower className="mr-2" /> Live Voting
          </NavLink>
          {token && (
            <>
              <NavLink
                to="/candidateslist"
                className={({ isActive }) =>
                  `${isActive ? activeClass : inactiveClass} text-lg hover:bg-white hover:text-blue-600 py-2 px-4 rounded-md flex items-center`
                }
                onClick={() => setIsOpen(false)}
              >
                <FaUsers className="mr-2" /> View Candidates
              </NavLink>
              <NavLink
                to="/candidateform"
                className={({ isActive }) =>
                  `${isActive ? activeClass : inactiveClass} text-lg hover:bg-white hover:text-blue-600 py-2 px-4 rounded-md flex items-center`
                }
                onClick={() => setIsOpen(false)}
              >
                <FaUserTie className="mr-2" /> Candidate Form
              </NavLink>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `${isActive ? activeClass : inactiveClass} text-lg hover:bg-white hover:text-blue-600 py-2 px-4 rounded-md flex items-center`
                }
                onClick={() => setIsOpen(false)}
              >
                <FaUserCircle className="mr-2" /> Profile
              </NavLink>
            </>
          )}
          {!token && (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `${isActive ? activeClass : inactiveClass} text-lg hover:bg-white hover:text-blue-600 py-2 px-4 rounded-md flex items-center`
              }
              onClick={() => setIsOpen(false)}
            >
              <FaSignInAlt className="mr-2" /> Login
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
