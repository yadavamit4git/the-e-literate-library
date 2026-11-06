
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Login from './Login';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  const navLink =
    "text-gray-700 font-medium hover:text-blue-600 transition duration-200";

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md border-b border-gray-100">

      <div className="max-w-7xl mx-auto px-5 lg:px-10">

        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link to="/" className="text-xl md:text-2xl font-bold text-blue-700">
            <span className="text-gray-800">The</span> E-Literate Library
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">

            <Link to="/" className={navLink}>Home</Link>

            <Link to="/course" className={navLink}>Courses</Link>

            <Link to="/contact" className={navLink}>Contact</Link>

            <Link to="/about" className={navLink}>About</Link>

          </nav>

          {/* Login / Logout */}
          <div className="hidden md:flex items-center gap-4">

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-6 py-2 rounded-full font-medium hover:bg-red-600 transition"
              >
                Logout
              </button>
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} />
            )}

          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-800 text-3xl"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? '✕' : '☰'}
          </button>

        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t py-5">

            <nav className="flex flex-col gap-5">

              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className={navLink}
              >
                Home
              </Link>

              <Link
                to="/course"
                onClick={() => setMenuOpen(false)}
                className={navLink}
              >
                Courses
              </Link>

              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className={navLink}
              >
                Contact
              </Link>

              <Link
                to="/about"
                onClick={() => setMenuOpen(false)}
                className={navLink}
              >
                About
              </Link>

              {isLoggedIn ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="bg-red-500 text-white px-5 py-2 rounded-lg w-fit"
                >
                  Logout
                </button>
              ) : (
                <Login setIsLoggedIn={setIsLoggedIn} />
              )}

            </nav>

          </div>
        )}

      </div>

    </header>
  );
}

export default Navbar;
