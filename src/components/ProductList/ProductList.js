// src/components/ProductList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ProductList.css"

function ProductList() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("name");

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/products`)
            .then((response) => {
                setProducts(response.data.products);
            })
            .catch((err) => {
                setError("Failed to load products");
                console.error(err);
            });
    }, []);

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedProducts = [...filteredProducts].sort(function (low, high) {
        switch (sortOption) {
            case "highP":
                return high.price - low.price;
            case "lowP":
                return low.price - high.price;
            case "highR":
                return high.rating - low.rating;
            case "name":
                return low.name.localeCompare(high.name);
            default:
                return 0;
        }
    });

    if (error) return <div>{error}</div>;

    return (
        <div className="page-container">
           
            <div className="search-fields">
                <label htmlFor="search">Search by name: </label>
                <input
                    type="text"
                    id="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Enter coffee name"
                />
                <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                    <option value="name">Name (A-Z)</option>
                    <option value="highP">Highest Price</option>
                    <option value="lowP">Lowest Price</option>
                    <option value="highR">Best rated</option>
                </select>
            </div>
            <div className="product-list">
                    {sortedProducts.length > 0 ? (
                        sortedProducts.map((product) => (
                            <div key={product.id} className="product-list-elements">
                             
                                    <Link to={`/products/${product.id}`}>
                                        <h3>{product.name}</h3> 
                                        <h4>${product.price.toFixed(2)}</h4> 
                                        <h5>(Rating: {product.rating}/5)</h5>
                                    </Link>
                               
                            </div>
                        ))
                    ) : (
                        <p>No products match your search.</p>
                    )}
            </div>
        </div>
    );
}

export default ProductList;
