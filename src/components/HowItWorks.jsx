import React from 'react';
import '../styles/components/howItworks.css';
import { FiSearch, FiUsers, FiCreditCard } from 'react-icons/fi';

export default function HowItWorks() {
  return (
    <section className="how-section">
      <div className="how-container">

        <h2 className="how-title">How It Works</h2>
        <p className="how-subtitle">
          From discovery to delivery — everything happens in one place.
        </p>

        <div className="how-steps">

          <div className="how-card">
            <div className="how-icon">
              <FiSearch size={32} />
            </div>
            <h3>Browse Developers</h3>
            <p>
              Explore developer profiles, portfolios, skills, and ratings
              before making contact.
            </p>
          </div>

          <div className="how-card">
            <div className="how-icon">
              <FiUsers size={32} />
            </div>
            <h3>Connect & Collaborate</h3>
            <p>
              Message developers, discuss requirements, or collaborate with
              teams on shared projects.
            </p>
          </div>

          <div className="how-card">
            <div className="how-icon">
              <FiCreditCard size={32} />
            </div>
            <h3>Hire & Pay Securely</h3>
            <p>
              Hire with confidence using platform-secured payments and clear
              project agreements.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
