const API_URL = process.env.REACT_APP_API_URL;

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    credentials: 'include',
    ...options
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.message || 'Server error.');
  }
  return data;
}

export function registerUser(payload) {
  return request('/api/register', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export function loginUser(payload) {
  return request('/api/login', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export function forgotPassword(payload) {
  return request('/api/forgot-password', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}
