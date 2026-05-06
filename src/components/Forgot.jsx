// Forgot.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Forgot = () => {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="login-header">
        <h2>Forgot Password</h2>
        <p>If you forgot your password, you can reset it here email.</p>
      </div>

      <div className="login-form" style={{ textAlign: 'center' }}>
        <p className="password-match">This is a demo reset flow. For a real app, implement email reset.</p>
        <button className="login-btn" onClick={() => navigate('/login')}>Back to Login</button>
      </div>
    </div>
  );
};

export default Forgot;
