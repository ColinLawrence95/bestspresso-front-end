// src/components/Cart.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Cart({ onPurchase }) {
  const [cart, setCart] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to view your cart');
      return;
    }

    setLoading(true);
    axios.get(`${process.env.REACT_APP_API_URL}/cart`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setCart(response.data);
        setError(null);
      })
      .catch(err => {
        setError('Failed to load cart: ' + (err.response ? err.response.data.error : err.message));
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to update cart');
      return;
    }

    setLoading(true);
    axios.put(`${process.env.REACT_APP_API_URL}/cart/item/${itemId}`, 
      { quantity: newQuantity },
      { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
    )
      .then(() => {
        fetchCart(); 
      })
      .catch(err => {
        setError('Failed to update quantity: ' + (err.response ? err.response.data.error : err.message));
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  const handleRemoveItem = (itemId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to remove items');
      return;
    }

    setLoading(true);
    axios.delete(`${process.env.REACT_APP_API_URL}/cart/item/${itemId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        fetchCart(); 
      })
      .catch(err => {
        setError('Failed to remove item: ' + (err.response ? err.response.data.error : err.message));
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  const handlePurchase = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to purchase');
      return;
    }

    setLoading(true);
    axios.post(`${process.env.REACT_APP_API_URL}/cart/purchase`, {}, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    })
      .then(response => {
        alert('Purchase successful! New balance: ' + response.data.new_balance);
        fetchCart(); 
        if (onPurchase) onPurchase();
      })
      .catch(err => {
        setError('Failed to purchase: ' + (err.response ? err.response.data.error : err.message));
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  if (error) return (
    <div>
      <p>{error}</p>
      <Link to="/login">Login</Link> | <Link to="/">Back to Products</Link>
    </div>
  );
  if (loading) return <div>Loading...</div>;
  if (!cart) return <div>Loading cart...</div>;

  return (
    <div>
      <h2>Your Bestpresso Cart</h2>
      {cart.items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cart.items.map(item => (
              <li key={item.id} style={{ margin: '10px 0' }}>
                {item.name} - ${item.price.toFixed(2)} x 
                <input
                  type="number"
                  min="1"
                  max={item.stock}
                  value={item.quantity}
                  onChange={(e) => handleUpdateQuantity(item.id, Number(e.target.value))}
                  style={{ width: '50px', margin: '0 10px' }}
                />
                = ${item.subtotal.toFixed(2)}
                <button 
                  onClick={() => handleRemoveItem(item.id)} 
                  style={{ marginLeft: '10px' }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <p>Total: ${cart.total.toFixed(2)}</p>
          <p>Bestpresso Coins Balance: ${cart.balance.toFixed(2)}</p>
          <button onClick={handlePurchase} disabled={cart.total === 0}>
            Purchase
          </button>
        </div>
      )}
      <Link to="/" style={{ marginTop: '10px', display: 'block' }}>Back to Products</Link>
    </div>
  );
}

export default Cart;