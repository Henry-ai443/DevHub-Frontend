import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import AuthForm from '../components/AuthForm';
import '../styles/pages/signup.css';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('DEVELOPER');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await signup(email, password, role);
      setSuccess(true);
      setTimeout(() => navigate('/setup-profile'), 2000);
    } catch (err) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };


  return (
    <AuthForm title="Sign Up">
      <div className="form-container">
        {loading && (
          <div className="form-spinner-overlay">
            <div className="spinner"></div>
          </div>
        )}

        {success && (
          <div className="success-overlay">
            <div className="checkmark-circle">
              <div className="checkmark" />
            </div>
          </div>
        )}

        <form onSubmit={handleSignup}>
          {error && <div className="error-message">{error}</div>}

          <input
            type="email"
            placeholder="Email Address"
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

          <div className="role-selector">
            <label className={`role-option ${role === 'DEVELOPER' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="role"
                value="DEVELOPER"
                checked={role === 'DEVELOPER'}
                onChange={(e) => setRole(e.target.value)}
              />
              <span>I'm a Developer</span>
            </label>
            <label className={`role-option ${role === 'CLIENT' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="role"
                value="CLIENT"
                checked={role === 'CLIENT'}
                onChange={(e) => setRole(e.target.value)}
              />
              <span>I'm a Client</span>
            </label>
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </AuthForm>
  );
}
 