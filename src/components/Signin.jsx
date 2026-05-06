// Signin.jsx
import React, { useState } from 'react';

const Signin = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [email , setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!username || !password) {
      setError('Username and password are required.');
      return;
    }
    if (password.length < 4) {
      setError('Password must be at least 4 characters.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    // Save registered user locally (in localStorage)
    const registered = {
      username: username.trim(),
      password,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim()
      
    };
    try {
      localStorage.setItem('registeredUser', JSON.stringify(registered));
      setSuccess('Account created. Redirecting to login...');
      setTimeout(() => {
        window.location.href = '/login';
      }, 1200);
    } catch (err) {
      setError('Could not save account locally.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h2>Create Account</h2>
        <p>Sign up and then sign in with these details</p>
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="firstName">First name</label>
          <input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last name</label>
          <input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <div className="form-group">
          <label htmlFor="confirm">Confirm Password</label>
          <input id="confirm" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
        </div>

        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

        <button type="submit" className={`login-btn ${loading ? 'disabled' : ''}`} disabled={loading}>
          {loading ? 'Creating...' : 'Create account'}
        </button>
      </form>
    </div>
  );
};

export default Signin;
