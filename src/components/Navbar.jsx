import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/components/navbar.css';
import { FiMenu, FiX, FiLogOut, FiHome, FiUser } from 'react-icons/fi';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, user, logout, isDeveloper, isClient } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">💻</span> DevHub
        </Link>

        {/* Desktop Links */}
        <div className="navbar-links">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="signup-btn">Sign Up</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="nav-link">
                <FiHome size={18} /> Dashboard
              </Link>
              
              {isDeveloper && (
                <>
                  <Link to="/developer/projects" className="nav-link">Projects</Link>
                  <Link to="/developer/hires" className="nav-link">Hires</Link>
                </>
              )}
              
              {isClient && (
                <>
                  <Link to="/client/projects" className="nav-link">My Projects</Link>
                  <Link to="/client/browse" className="nav-link">Find Developers</Link>
                  <Link to="/client/hires" className="nav-link">Hires</Link>
                </>
              )}
              
              <Link to="/messages" className="nav-link">Messages</Link>
              
              <div className="user-menu">
                <button className="user-btn">
                  <FiUser size={18} />
                  {user?.email?.split('@')[0]}
                </button>
                <div className="user-dropdown">
                  <Link to="/profile" className="dropdown-link">
                    <FiUser size={16} /> Profile
                  </Link>
                  <button onClick={handleLogout} className="dropdown-link logout">
                    <FiLogOut size={16} /> Logout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu open">
          {!isAuthenticated ? (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)} className="signup-btn">Sign Up</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
              {isDeveloper && (
                <>
                  <Link to="/developer/projects" onClick={() => setMenuOpen(false)}>Projects</Link>
                  <Link to="/developer/hires" onClick={() => setMenuOpen(false)}>Hires</Link>
                </>
              )}
              {isClient && (
                <>
                  <Link to="/client/projects" onClick={() => setMenuOpen(false)}>My Projects</Link>
                  <Link to="/client/browse" onClick={() => setMenuOpen(false)}>Find Developers</Link>
                  <Link to="/client/hires" onClick={() => setMenuOpen(false)}>Hires</Link>
                </>
              )}
              <Link to="/messages" onClick={() => setMenuOpen(false)}>Messages</Link>
              <Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
