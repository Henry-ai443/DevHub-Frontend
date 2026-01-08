import React, { useState, useEffect } from 'react';
import { FiUpload } from 'react-icons/fi';
import '../styles/pages/profile.css';

export default function ProfileForm({ token }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [skills, setSkills] = useState('');
  const [company, setCompany] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Load current profile if exists
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/profile/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) return;
        const data = await res.json();
        setFirstName(data.first_name || '');
        setLastName(data.last_name || '');
        setBio(data.bio || '');
        setWebsite(data.website_url || '');
        setSkills(data.skills || '');
        setCompany(data.company_name || '');
        setAvatarPreview(data.avatar_url || null);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, [token]);

  // Handle file selection
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('bio', bio);
    formData.append('website_url', website);
    formData.append('skills', skills);
    formData.append('company_name', company);
    if (avatarFile) formData.append('avatar', avatarFile);

    try {
      const res = await fetch('http://localhost:5000/api/profile/me', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Profile update failed');

      setMessage('Profile saved successfully!');
      if (data.avatarUrl) setAvatarPreview(data.avatarUrl);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-form-wrapper">
      <div className="glass-card profile-card">
        {message && <p className="form-message">{message}</p>}

        <form onSubmit={handleSubmit}>
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

          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />

          <textarea
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          <input
            type="text"
            placeholder="Website URL"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />

          <input
            type="text"
            placeholder="Skills (comma separated)"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />

          <input
            type="text"
            placeholder="Company Name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      </div>
    </div>
  );
}
