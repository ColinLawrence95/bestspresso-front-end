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
        <Link to="/">Home</Link>
        <Link to="/products">Browse</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/purchases">Purchases</Link>
        <button onClick={handleLogout}>Logout</button>
        <label>Bestpresso Coffee</label>
        </>
      ) : (
        <>
        <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
        <Link to="/products" style={{ marginRight: '10px' }}>Browse</Link>
        <Link to="/login">Login</Link>
        </>
      )}
     
    </nav>
  );
}

export default NavBar;