// --- FILE: frontend/src/pages/Register.js ---
// This is the fully functional registration page

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // We need axios to make API calls

// --- Simple CSS-in-JS for styling ---
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
// --- End of styles ---

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '', // For password confirmation
  });
  const [error, setError] = useState(''); // To store error messages

  const { name, email, password, password2 } = formData;
  
  // useNavigate is the modern hook for redirecting
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    // --- Basic Validation ---
    if (password !== password2) {
      setError('Passwords do not match');
      return;
    }
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    // --- End Validation ---

    try {
      // Prepare the data to send to the backend
      const newUser = {
        name,
        email,
        password,
      };

      // We use /api/users/register because of the "proxy" we set in package.json
      const response = await axios.post('/api/users/register', newUser);

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
      <h1 style={{ textAlign: 'center', color: '#F4F4F4' }}>Create Account</h1>
      
      <form onSubmit={onSubmit}>
        <div style={formGroupStyle}>
          <label htmlFor="name" style={labelStyle}>Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={onChange}
            style={inputStyle}
            placeholder="Enter your name"
          />
        </div>
        
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

        <div style={formGroupStyle}>
          <label htmlFor="password2" style={labelStyle}>Confirm Password</label>
          <input
            type="password"
            id="password2"
            name="password2"
            value={password2}
            onChange={onChange}
            style={inputStyle}
            placeholder="Confirm your password"
          />
        </div>

        {error && <p style={errorStyle}>{error}</p>}

        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '15px' }}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;

