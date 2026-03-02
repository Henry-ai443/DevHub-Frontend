import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      
      if (token) {
        try {
          const data = await api.getMyProfile();
          setUser(data.data || data);
        } catch (err) {
          console.error('Auth check failed:', err);
          localStorage.removeItem('token');
          sessionStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const signup = async (email, password, role) => {
    setError(null);
    try {
      const data = await api.signup(email, password, role);
      localStorage.setItem('token', data.token || data.data.token);
      setUser(data.data || data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const login = async (email, password, rememberMe = false) => {
    setError(null);
    try {
      const data = await api.login(email, password);
      const token = data.token || data.data.token;
      
      if (rememberMe) {
        localStorage.setItem('token', token);
      } else {
        sessionStorage.setItem('token', token);
      }
      
      setUser(data.data || data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await api.logout();
    } catch (err) {
      console.error('Logout request failed:', err);
    } finally {
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      setUser(null);
    }
  };

  const updateProfile = async (data) => {
    try {
      const result = user?.role === 'DEVELOPER'
        ? await api.updateDeveloperProfile(data)
        : await api.updateClientProfile(data);
      
      setUser(result.data || result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    isDeveloper: user?.role === 'DEVELOPER',
    isClient: user?.role === 'CLIENT',
    isAdmin: user?.role === 'ADMIN',
    signup,
    login,
    logout,
    updateProfile,
    setUser,
    setError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
