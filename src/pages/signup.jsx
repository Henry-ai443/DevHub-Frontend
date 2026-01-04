import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/pages/signup.css';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('CLIENT');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Signup failed');

      localStorage.setItem('token', data.token);

      // Trigger success animation
      setSuccess(true);

      // Wait 1.5s before redirecting
      setTimeout(() => navigate('/dashboard'), 2000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm title="Sign Up">
      <div className="form-container">
        {/* Spinner overlay while loading */}
        {loading && (
          <div className="form-spinner-overlay">
            <div className="spinner"></div>
          </div>
        )}

        {/* Success checkmark overlay */}
        {success && (
          <div className="success-overlay">
            <div className="checkmark-circle">
              <div className="checkmark" />
            </div>
          </div>
        )}

        <form onSubmit={handleSignup}>
          {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="show-password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </span>
          </div>

          <div className="password-wrapper">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span
              className="show-password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </span>
          </div>

          <h4>SIGN UP AS:</h4>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="CLIENT">Client</option>
            <option value="DEVELOPER">Developer</option>
          </select>

          <button type="submit" disabled={loading || success}>Sign Up</button>

          <p style={{ textAlign: 'center', marginTop: '1rem' }}>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </AuthForm>
  );
}
