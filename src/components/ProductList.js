// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/products`)
      .then(response => {
        setProducts(response.data.products);
      })
      .catch(err => {
        setError('Failed to load products');
        console.error(err);
      });
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Bestpresso Products</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {products.map(product => (
          <li key={product.id} style={{ margin: '10px 0' }}>
            <Link to={`/products/${product.id}`}>
              {product.name} - ${product.price.toFixed(2)} (Rating: {product.rating}/5)
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;