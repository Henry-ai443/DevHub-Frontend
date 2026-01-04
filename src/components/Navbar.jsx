import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/navbar.css';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          DevHub
        </Link>

        {/* Desktop Links */}
        <div className="navbar-links">
          <Link to="/profiles">Explore</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup" className="signup-btn">Sign Up</Link>
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
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <Link to="/profiles" onClick={() => setMenuOpen(false)}>Explore</Link>
        <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
        <Link to="/signup" onClick={() => setMenuOpen(false)}>Sign Up</Link>
      </div>
    </nav>
  );
}
