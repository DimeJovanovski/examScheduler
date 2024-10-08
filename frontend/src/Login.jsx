import React, { useState } from 'react';
import { login } from './api/api'; // Make sure you have a login function in your api.js

function Login({ setAuthenticated, onRegisterClick }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await login(credentials);
        localStorage.setItem('jwt', response.data.jwt);
        localStorage.setItem('role', response.data.role); // Store the user role
        console.log('Role: ', response.data.role);
        console.log('Token stored:', response.data.jwt);
        setAuthenticated(true);
    } catch (error) {
        setError('Invalid username or password');
        console.error("Login failed:", error);
    }
};

  

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleInputChange}
          placeholder="Username"
          required
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleInputChange}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?
        <span onClick={onRegisterClick} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
          Register here
        </span>
      </p>
    </div>
  );
}

export default Login;
