// src/components/ProductDetail.js
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [newRating, setNewRating] = useState(''); // For user input

  const fetchProduct = useCallback(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/products/${id}`)
      .then(response => {
        setProduct(response.data);
        setNewRating(response.data.rating.toString());
      })
      .catch(err => {
        setError('Failed to load product details');
        console.error(err);
      });
  }, [id]); // Dependencies: id (setProduct and setNewRating are stable)

  useEffect(() => {
    fetchProduct();
  }, [id, fetchProduct]); // Include fetchProduct

  const handleAddToCart = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to add items to cart');
      return;
    }

    const payload = { product_id: Number(id), quantity };
    axios.post(`${process.env.REACT_APP_API_URL}/cart/add`, 
      payload,
      { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
    )
      .then(() => {
        alert(`${quantity} ${product.name}(s) added to cart!`);
      })
      .catch(err => {
        setError('Failed to add to cart: ' + (err.response ? err.response.data.error : err.message));
        console.error(err);
      });
  };

  const handleRateProduct = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to rate this product');
      return;
    }

    const ratingValue = parseFloat(newRating);
    if (isNaN(ratingValue) || ratingValue < 0 || ratingValue > 5) {
      setError('Rating must be a number between 0 and 5');
      return;
    }

    axios.post(`${process.env.REACT_APP_API_URL}/products/${id}/rate`, 
      { rating: ratingValue },
      { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
    )
      .then(() => {
        setError(null);
        fetchProduct(); // Refresh product data
        alert('Rating updated successfully!');
      })
      .catch(err => {
        setError('Failed to update rating: ' + (err.response ? err.response.data.error : err.message));
        console.error(err);
      });
  };

  if (error) return <div>{error}</div>;
  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price.toFixed(2)}</p>
      <p>Stock: {product.stock}</p>
      <p>Rating: {product.rating}/5</p>
      <div>
        <label>Rate this product (0-5): </label>
        <input
          type="number"
          min="0"
          max="5"
          step="1"
          value={newRating}
          onChange={(e) => setNewRating(e.target.value)}
        />
        <button onClick={handleRateProduct}>Submit Rating</button>
      </div>
      <div>
        <label>Quantity: </label>
        <input
          type="number"
          min="1"
          max={product.stock}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
      
      <Link to="/products">Back to Products</Link>
    </div>
  );
}

export default ProductDetail;