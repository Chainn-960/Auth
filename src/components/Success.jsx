// Success.jsx
import React, { useEffect, useState } from 'react';

const Success = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    window.location.href = '/login';
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="success-container">
      <div className="checkmark">✅</div>
      <h1>Login Successful!</h1>
      <p>Welcome back, {user.firstName} {user.lastName}!</p>
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </div>
  );
};

export default Success;
