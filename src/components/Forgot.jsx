// Forgot.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../api';

const Forgot = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleReset = async () => {
    setError('');
    setMessage('');
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      const data = await forgotPassword({ email });
      setMessage(data.message || `If an account exists for ${email}, a reset link has been sent.`);
    } catch (err) {
      setError(err.message || 'Unable to send reset email.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h2>Forgot Password</h2>
        <p>If you forgot your password, enter your email to reset it.</p>
      </div>

      <form className="login-form" style={{ textAlign: 'center' }} onSubmit={(e) => { e.preventDefault(); handleReset(); }}>
        <div className="form-group">
          <label htmlFor="forgotEmail">Email</label>
          <input
            id="forgotEmail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {error && <div className="error">{error}</div>}
        {message && <div className="success">{message}</div>}

        <button type="submit" className="login-btn">Send reset email</button>
        <button type="button" className="login-btn" onClick={() => navigate('/login')} style={{ marginTop: '12px' }}>
          Back to Login
        </button>
      </form>
    </div>
  );
};

export default Forgot;
