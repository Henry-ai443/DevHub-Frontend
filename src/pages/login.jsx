import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/pages/login.css';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Login failed');

      if (rememberMe) localStorage.setItem('token', data.token);
      else sessionStorage.setItem('token', data.token);

      // ✅ Trigger success animation
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
    <AuthForm title="Login">
      <div className="form-container">
        {/* Spinner overlay while loading */}
        {loading && (
          <div className="form-spinner-overlay">
            <div className="spinner"></div>
          </div>
        )}

        {/* ✅ Success checkmark overlay */}
        {success && (
          <div className="success-overlay">
            <div className="checkmark-circle">
              <div className="checkmark" />
            </div>
          </div>
        )}

        <form onSubmit={handleLogin}>
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

          <div className="remember-me-wrapper">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember Me
            </label>
          </div>

          <button type="submit" disabled={loading || success}>Login</button>

          <p style={{ textAlign: 'center', marginTop: '1rem' }}>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </AuthForm>
  );
}
