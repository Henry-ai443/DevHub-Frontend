import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/hero.css';

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-overlay"></div>

      <div className="hero-container">
        {/* Left: Text */}
        <div className="hero-content glass-card">
          <h1 className="hero-title">Connect. Collaborate. Create.</h1>
          <p className="hero-subtitle">
            Discover developers, showcase your skills, and work together on projects globally.
          </p>
          <div className="hero-buttons">
            <Link to="/profiles" className="btn-primary">Explore Developers</Link>
            <Link to="/signup" className="btn-secondary">Sign Up Now</Link>
          </div>
        </div>

        {/* Right: Image */}
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1593642532973-d31b6557fa68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
            alt="People greeting each other"
          />
        </div>
      </div>
    </section>
  );
}
