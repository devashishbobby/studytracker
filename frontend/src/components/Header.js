// --- FILE: frontend/src/components/Header.js ---
// This is a new component for your site's navigation

import React from 'react';
import { Link } from 'react-router-dom';

// Simple CSS-in-JS for styling the header
const headerStyle = {
  background: '#1A3D64', // Dark Blue
  padding: '1rem 0',
  marginBottom: '2rem',
  borderBottom: '2px solid #1D546C',
};

const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '90%',
  maxWidth: '1200px',
  margin: '0 auto',
};

const logoStyle = {
  fontSize: '1.5rem',
  fontWeight: '700',
  color: '#F4F4F4',
  textDecoration: 'none',
};

const navLinksStyle = {
  display: 'flex',
  gap: '1rem',
};

const navLinkStyle = {
  color: '#F4F4F4',
  textDecoration: 'none',
  fontSize: '1rem',
  fontWeight: '500',
  padding: '8px 12px',
  borderRadius: '6px',
  transition: 'background-color 0.2s ease',
};

const Header = () => {
  // We'll add login/logout logic here later
  const isLoggedIn = false; 

  return (
    <header style={headerStyle}>
      <nav style={navStyle}>
        <Link to="/" style={logoStyle}>
          StudyPlanner
        </Link>
        <div style={navLinksStyle}>
          {isLoggedIn ? (
            <>
              <Link to="/" style={navLinkStyle} 
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#1D546C'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
                Dashboard
              </Link>
              <button className="btn" style={{padding: '8px 12px'}}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={navLinkStyle}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#1D546C'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
                Login
              </Link>
              <Link to="/register" style={navLinkStyle}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#1D546C'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
