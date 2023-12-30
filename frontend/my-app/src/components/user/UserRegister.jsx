// RegistrationForm.js
import React, { useState } from 'react';
import axios from 'axios';
import "./UserRegister.css";
const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState(null);

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:8080/api/users/register', {
        username,
        password,
      });
      setRegistrationStatus('success');
    } catch (error) {
      console.error('Error registering user', error.response.data);
      setRegistrationStatus('error');
    }
  };

  return (
    <div className="registration-container">
      <div className ="container">
      
      <h2>Registration</h2>
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
      <button onClick={handleRegister}>Register</button>
      
      {registrationStatus === 'success' && (
        <p style={{ color: 'green' }}>User registered successfully</p>
      )}
      
      {registrationStatus === 'error' && (
        <p style={{ color: 'red' }}>Error registering user</p>
      )}
      </div>
    </div>
  );
};

export default RegistrationForm;
