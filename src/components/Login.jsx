
// Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showHints, setShowHints] = useState({ username: false, password: false });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Check for a locally registered user first
      const registered = localStorage.getItem('registeredUser');
      if (registered) {
        const parsed = JSON.parse(registered);
        if (username === parsed.username && password === parsed.password) {
          const userObj = {
            username: parsed.username,
            firstName: parsed.firstName || parsed.username,
            lastName: parsed.lastName || ''
          };
          setSuccess(`Welcome ${userObj.firstName}! Redirecting...`);
            sessionStorage.setItem('user', JSON.stringify(userObj));
            setTimeout(() => navigate('/success'), 1000);
          setLoading(false);
          return;
        }
        setError('Credentials do not match the registered account.');
        setLoading(false);
        return;
      }

      // Fallback: remote dummy auth
      const response = await fetch('http://localhost:8082/products', {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, expiresInMins: 30 }),
        credentials: 'include'
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess(`Welcome ${data.firstName}! Redirecting...`);
        sessionStorage.setItem('user', JSON.stringify(data));
        setTimeout(() => navigate('/success'), 1200);
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h2>Login</h2>
        <p>Enter your credentials to continue</p>
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={() => setShowHints(prev => ({ ...prev, username: true }))}
            onBlur={() => setTimeout(() => setShowHints(prev => ({ ...prev, username: false })), 200)}
            required
          />
          {showHints.username && (
            <div className="password-match">Username</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setShowHints(prev => ({ ...prev, password: true }))}
            onBlur={() => setTimeout(() => setShowHints(prev => ({ ...prev, password: false })), 200)}
            required
          />
          {showHints.password && (
            <div className="password-match">Password</div>
          )}
        </div>

        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

        <button
          type="submit"
          className={`login-btn ${loading ? 'disabled' : ''}`}
          disabled={loading}
        >
          {loading ? 'Signing In...' : 'Log In'}
        </button>

        <div className="small-actions">
          <button type="button" className="small-btn" onClick={() => navigate('/forgot')}>Forgot</button>
          <button type="button" className="small-btn" onClick={() => navigate('/signin')}>Sign in</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
