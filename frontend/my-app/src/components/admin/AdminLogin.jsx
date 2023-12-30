// LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./AdminLogin.css";

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await axios.post('http://localhost:8080/api/users/login', {
        username,
        password,
      });
      setLoginStatus('success');
      // Navigate to admin/home on successful login
      navigate('/admin/home');
    } catch (error) {
      console.error('Error logging in', error.response.data);
      setLoginStatus('error');
    }
  };

  return (
    <div className='login-container'>
      <div className='container'>
      <h2>Login</h2>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleLogin}>Login</button>
      
      {loginStatus === 'success' && (
        <p style={{ color: 'green' }}>Login successful. Redirecting...</p>
      )}
      
      {loginStatus === 'error' && (
        <p style={{ color: 'red' }}>Invalid username or password</p>
      )}
      </div>
    </div>
  );
};

export default LoginForm;
