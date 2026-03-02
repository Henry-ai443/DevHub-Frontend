import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { FiUpload, FiArrowLeft } from 'react-icons/fi';
import '../styles/pages/profile.css';

export default function ProfileForm() {
  const { user, updateProfile, isDeveloper, isClient } = useAuth();
  const navigate = useNavigate();
  
  // Common fields
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Developer profile fields
  const [title, setTitle] = useState('');
  const [bio, setBio] = useState('');
  const [skillsInput, setSkillsInput] = useState('');
  const [skills, setSkills] = useState([]);
  const [hourlyRate, setHourlyRate] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('INTERMEDIATE');
  const [website, setWebsite] = useState('');
  const [isRemote, setIsRemote] = useState(true);

  // Client profile fields
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const data = await api.getMyProfile();
      const profile = data.data || data;

      if (isDeveloper) {
        setTitle(profile.title || '');
        setBio(profile.bio || '');
        setSkills(profile.skills || []);
        setSkillsInput((profile.skills || []).join(', '));
        setHourlyRate(profile.hourlyRate || '');
        setExperienceLevel(profile.experienceLevel || 'INTERMEDIATE');
        setWebsite(profile.website || '');
        setIsRemote(profile.isRemote !== false);
      } else if (isClient) {
        setCompanyName(profile.companyName || '');
        setIndustry(profile.industry || '');
        setCompanySize(profile.companySize || '');
        setDescription(profile.description || '');
      }

      setAvatarPreview(profile.avatar || null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSkillsChange = (e) => {
    const input = e.target.value;
    setSkillsInput(input);
    setSkills(input.split(',').map(s => s.trim()).filter(s => s));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');
    setError('');

    try {
      const profileData = new FormData();

      if (avatarFile) {
        profileData.append('avatar', avatarFile);
      }

      if (isDeveloper) {
        profileData.append('title', title);
        profileData.append('bio', bio);
        profileData.append('skills', JSON.stringify(skills));
        profileData.append('hourlyRate', hourlyRate);
        profileData.append('experienceLevel', experienceLevel);
        profileData.append('website', website);
        profileData.append('isRemote', isRemote);
      } else if (isClient) {
        profileData.append('companyName', companyName);
        profileData.append('industry', industry);
        profileData.append('companySize', companySize);
        profileData.append('description', description);
      }

      await updateProfile(profileData);
      setMessage('Profile updated successfully!');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <button onClick={() => navigate(-1)} className="back-btn">
        <FiArrowLeft size={20} /> Back
      </button>

      <div className="profile-form-wrapper">
        <div className="glass-card profile-card">
          <h1>
            {isDeveloper ? 'Developer Profile' : 'Client Profile'}
          </h1>

          {message && <div className="success-message">{message}</div>}
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            {/* Avatar Section */}
            <div className="avatar-section">
              <div className="avatar-preview">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar Preview" />
                ) : (
                  <div className="avatar-placeholder">No Avatar</div>
                )}
              </div>

              <label className="avatar-upload">
                <FiUpload size={20} />
                <span>Upload Avatar</span>
                <input type="file" accept="image/*" onChange={handleAvatarChange} />
              </label>
            </div>

            {/* Developer Profile Fields */}
            {isDeveloper && (
              <>
                <div className="form-group">
                  <label>Professional Title *</label>
                  <input
                    type="text"
                    placeholder="e.g., Full Stack Developer, React Specialist"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Bio</label>
                  <textarea
                    placeholder="Tell clients about yourself, your experience, and what you offer..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={5}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Hourly Rate ($)</label>
                    <input
                      type="number"
                      placeholder="50"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(e.target.value)}
                      min="0"
                    />
                  </div>

                  <div className="form-group">
                    <label>Experience Level *</label>
                    <select
                      value={experienceLevel}
                      onChange={(e) => setExperienceLevel(e.target.value)}
                    >
                      <option value="JUNIOR">Junior (0-2 years)</option>
                      <option value="INTERMEDIATE">Intermediate (2-5 years)</option>
                      <option value="SENIOR">Senior (5+ years)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Skills (comma separated) *</label>
                  <input
                    type="text"
                    placeholder="React, Node.js, MongoDB, Python"
                    value={skillsInput}
                    onChange={handleSkillsChange}
                    required
                  />
                  <div className="skills-tags">
                    {skills.map((skill, idx) => (
                      <span key={idx} className="skill-tag">
                        {skill}
                        <button
                          type="button"
                          onClick={() => {
                            const newSkills = skills.filter((_, i) => i !== idx);
                            setSkills(newSkills);
                            setSkillsInput(newSkills.join(', '));
                          }}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>Website / Portfolio</label>
                  <input
                    type="url"
                    placeholder="https://yourportfolio.com"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>

                <div className="form-group checkbox">
                  <label>
                    <input
                      type="checkbox"
                      checked={isRemote}
                      onChange={(e) => setIsRemote(e.target.checked)}
                    />
                    <span>Available for remote work</span>
                  </label>
                </div>
              </>
            )}

            {/* Client Profile Fields */}
            {isClient && (
              <>
                <div className="form-group">
                  <label>Company Name *</label>
                  <input
                    type="text"
                    placeholder="Your company name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Industry</label>
                    <input
                      type="text"
                      placeholder="Tech, Finance, etc."
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Company Size</label>
                    <select
                      value={companySize}
                      onChange={(e) => setCompanySize(e.target.value)}
                    >
                      <option value="">Select size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="200+">200+ employees</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>About Your Company</label>
                  <textarea
                    placeholder="Tell developers about your company, your projects, and what you're looking for..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                  />
                </div>
              </>
            )}

            <button type="submit" disabled={submitting} className="submit-btn">
              {submitting ? 'Saving...' : 'Save Profile'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
