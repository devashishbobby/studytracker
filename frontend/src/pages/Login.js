// --- FILE: frontend/src/pages/Login.js ---
// This is the fully functional login page

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import axios from 'axios';

// --- Reusing the same styles from Register.js ---
const formContainerStyle = {
  maxWidth: '500px',
  margin: '2rem auto',
  padding: '2rem',
  backgroundColor: '#1A3D64', // Dark Blue
  borderRadius: '8px',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
};

const formGroupStyle = {
  marginBottom: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
};

const labelStyle = {
  marginBottom: '0.5rem',
  fontSize: '0.9rem',
  fontWeight: '500',
  color: '#F4F4F4',
};

const inputStyle = {
  padding: '12px',
  fontSize: '1rem',
  border: '1px solid #1D546C',
  borderRadius: '6px',
  backgroundColor: '#0C2B4E',
  color: '#F4F4F4',
};

const errorStyle = {
  color: '#ff8a8a', // A light red for error messages
  marginTop: '1rem',
  textAlign: 'center',
};

const linkStyle = {
  color: '#F4F4F4',
  textAlign: 'center',
  display: 'block',
  marginTop: '1.5rem',
  textDecoration: 'none',
};
// --- End of styles ---

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const { email, password } = formData;
  
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // --- Basic Validation ---
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    // --- End Validation ---

    try {
      // Prepare the data to send to the backend
      const loginUser = {
        email,
        password,
      };

      // Call the login endpoint
      const response = await axios.post('/api/users/login', loginUser);

      if (response.data) {
        // --- SUCCESS ---
        // 1. Save user data (including token) to localStorage
        localStorage.setItem('user', JSON.stringify(response.data));
        
        // 2. Redirect to the main dashboard
        navigate('/');
      }
    } catch (err) {
      // --- ERROR ---
      // Set the error message from the backend response
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      setError(message);
    }
  };

  return (
    <div style={formContainerStyle}>
      <h1 style={{ textAlign: 'center', color: '#F4F4F4' }}>Welcome Back</h1>
      
      <form onSubmit={onSubmit}>
        <div style={formGroupStyle}>
          <label htmlFor="email" style={labelStyle}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            style={inputStyle}
            placeholder="Enter your email"
          />
        </div>

        <div style={formGroupStyle}>
          <label htmlFor="password" style={labelStyle}>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            style={inputStyle}
            placeholder="Enter your password"
          />
        </div>

        {error && <p style={errorStyle}>{error}</p>}

        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '15px' }}>
          Login
        </button>
      </form>
      
      <Link to="/register" style={linkStyle}
            onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
            onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>
        Don't have an account? Register
      </Link>
    </div>
  );
};

export default Login;

