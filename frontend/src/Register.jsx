import React, { useState } from 'react';
import { register } from './api/api'; // Make sure you have a register function in your api.js

function Register({ onBack }) {
  const [userInfo, setUserInfo] = useState({ username: '', password: '', role: 'USER' });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(userInfo); // Ensure you have the register function in api.js
      setMessage('User registered successfully');
      setUserInfo({ username: '', password: '', role: 'USER' }); // Reset form
    } catch (error) {
      setMessage('Registration failed: ' + error.response.data);
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          name="username"
          value={userInfo.username}
          onChange={handleInputChange}
          placeholder="Username"
          required
        />
        <input
          type="password"
          name="password"
          value={userInfo.password}
          onChange={handleInputChange}
          placeholder="Password"
          required
        />
        <input type="hidden" name="role" value={userInfo.role} />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <span onClick={onBack} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>Back to Login</span>
      </p>
    </div>
  );
}

export default Register;
