import React from 'react';
import '../styles/components/features.css';
import { FiUsers, FiLayers, FiShield } from 'react-icons/fi';

export default function Features() {
  return (
    <section className="features-section">
      <div className="features-container">

        <h2 className="features-title">
          Built for Developers. Trusted by Clients.
        </h2>

        <div className="features-grid">

          <div className="feature-card">
            <FiUsers size={36} />
            <h3>Discover Top Talent</h3>
            <p>
              Browse verified developer profiles, portfolios, and ratings
              before you hire.
            </p>
          </div>

          <div className="feature-card">
            <FiLayers size={36} />
            <h3>Collaborate Seamlessly</h3>
            <p>
              Developers can team up, invite collaborators, and build together
              on real projects.
            </p>
          </div>

          <div className="feature-card">
            <FiShield size={36} />
            <h3>Secure Hiring & Payments</h3>
            <p>
              Hire with confidence using built-in contracts, milestones, and
              platform-secured payments.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
