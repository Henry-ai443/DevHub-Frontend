import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { FiSearch, FiStar, FiDollarSign, FiMapPin, FiCode } from 'react-icons/fi';
import '../styles/pages/browse-developers.css';

export default function BrowseDevelopers() {
  const navigate = useNavigate();
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    experienceLevel: '',
    minRate: '',
    maxRate: '',
    isRemote: false,
    skills: '',
  });

  useEffect(() => {
    loadDevelopers();
  }, [filters]);

  const loadDevelopers = async () => {
    try {
      setLoading(true);
      const query = {};
      if (filters.experienceLevel) query.experienceLevel = filters.experienceLevel;
      if (filters.minRate) query.minRate = filters.minRate;
      if (filters.maxRate) query.maxRate = filters.maxRate;
      if (filters.isRemote) query.isRemote = true;
      if (filters.skills) query.skills = filters.skills;

      const data = await api.browseDevelopers(query);
      setDevelopers(data.data || data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating, count) => {
    return (
      <div className="rating">
        {'★'.repeat(Math.round(rating))}{'☆'.repeat(5 - Math.round(rating))}
        <span>({count})</span>
      </div>
    );
  };

  if (loading) {
    return <div className="page-loading"><div className="spinner"></div></div>;
  }

  return (
    <div className="browse-developers-page">
      <header className="page-header">
        <h1>Find Talented Developers</h1>
        <p>Hire the best developers for your projects</p>
      </header>

      <div className="browse-container">
        {/* Filters Sidebar */}
        <aside className="filters-sidebar">
          <h2>Filters</h2>

          <div className="filter-group">
            <label>Experience Level</label>
            <select
              value={filters.experienceLevel}
              onChange={(e) => setFilters({ ...filters, experienceLevel: e.target.value })}
            >
              <option value="">Any</option>
              <option value="JUNIOR">Junior (0-2 years)</option>
              <option value="INTERMEDIATE">Intermediate (2-5 years)</option>
              <option value="SENIOR">Senior (5+ years)</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Hourly Rate</label>
            <div className="rate-range">
              <input
                type="number"
                placeholder="Min"
                value={filters.minRate}
                onChange={(e) => setFilters({ ...filters, minRate: e.target.value })}
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.maxRate}
                onChange={(e) => setFilters({ ...filters, maxRate: e.target.value })}
              />
            </div>
          </div>

          <div className="filter-group">
            <label>
              <input
                type="checkbox"
                checked={filters.isRemote}
                onChange={(e) => setFilters({ ...filters, isRemote: e.target.checked })}
              />
              Remote Only
            </label>
          </div>

          <div className="filter-group">
            <label>Skills</label>
            <input
              type="text"
              placeholder="e.g. React, Node.js"
              value={filters.skills}
              onChange={(e) => setFilters({ ...filters, skills: e.target.value })}
            />
          </div>

          <button onClick={loadDevelopers} className="filter-btn">
            <FiSearch size={18} /> Apply Filters
          </button>
        </aside>

        {/* Developers Grid */}
        <main className="developers-grid">
          {developers.length > 0 ? (
            developers.map(dev => (
              <div key={dev._id} className="developer-card">
                <div className="dev-header">
                  {dev.avatar && <img src={dev.avatar} alt={dev.title} className="dev-avatar" />}
                  <div className="dev-info">
                    <h3>{dev.title}</h3>
                    <p className="level-badge">{dev.experienceLevel}</p>
                  </div>
                </div>

                {dev.bio && <p className="dev-bio">{dev.bio}</p>}

                <div className="dev-stats">
                  {dev.rating && renderStars(dev.rating, dev.reviewCount)}
                  <div className="rate-info">
                    <FiDollarSign size={16} />
                    <span>${dev.hourlyRate}/hr</span>
                  </div>
                </div>

                {dev.skills && dev.skills.length > 0 && (
                  <div className="dev-skills">
                    {dev.skills.slice(0, 4).map((skill, idx) => (
                      <span key={idx} className="skill-badge">{skill}</span>
                    ))}
                    {dev.skills.length > 4 && <span className="more-skills">+{dev.skills.length - 4}</span>}
                  </div>
                )}

                <div className="dev-meta">
                  {dev.isRemote && (
                    <span className="remote-badge">
                      <FiMapPin size={14} /> Remote
                    </span>
                  )}
                </div>

                <div className="dev-actions">
                  <button onClick={() => navigate(`/developer/${dev._id}`)} className="btn btn-outline">
                    View Profile
                  </button>
                  <button onClick={() => navigate(`/hire/${dev._id}`)} className="btn btn-primary">
                    Hire Developer
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <FiSearch size={48} />
              <h2>No developers found</h2>
              <p>Try adjusting your filters</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
