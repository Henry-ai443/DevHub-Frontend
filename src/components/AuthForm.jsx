import React from 'react';
import '../styles/components/AuthForm.css';

export default function AuthForm({ title, children }) {
  return (
    <div className="auth-form-wrapper">
      <div className="glass-card">
        <h2 className="form-title">{title}</h2>
        {children}
      </div>
    </div>
  );
}
