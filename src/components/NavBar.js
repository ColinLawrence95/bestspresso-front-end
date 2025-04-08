// src/components/NavBar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NavBar({ balance, onLogout }) {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    if (onLogout) onLogout(); 
  };

  return (
    <nav>
      {isLoggedIn ? (
        <>
         <span style={{ marginRight: '10px' }}>
            🪙${typeof balance === 'number' ? balance.toFixed(2) : 'Loading...'}
          </span>
        <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
        <Link to="/products" style={{ marginRight: '10px' }}>Browse</Link>
        <Link to="/cart" style={{ marginRight: '10px' }}>Cart</Link>
        <Link to="/purchases" style={{ marginRight: '10px' }}>Purchases</Link>
         
          <button onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</button>
        </>
      ) : (
        <>
        <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
        <Link to="/products" style={{ marginRight: '10px' }}>Browse</Link>
        <Link to="/login">Login</Link>
        </>
      )}
      <h1>Bestpresso Coffee</h1>
    </nav>
  );
}

export default NavBar;