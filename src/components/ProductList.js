// src/components/ProductList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/products`)
            .then((response) => {
                setProducts(response.data.products);
            })
            .catch((err) => {
                setError("Failed to load Bestpresso products");
                console.error(err);
            });
    }, []);
    if (error) return <div>{error}</div>;
    if (!products.length) return <div>Loading...</div>;

    return (
        <div>
            <h2>Our Coffees</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <Link to={`/products/${product.id}`}>
                            {product.name} - ${product.price.toFixed(2)} (Stock: {product.stock})
                        </Link>
                    </li>
                ))}
            </ul>
            <Link to="/cart">View Cart</Link>
        </div>
    );
}
export default ProductList;
