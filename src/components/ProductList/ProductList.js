// src/components/ProductList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ProductList.css";
import { motion } from "motion/react";

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
            <motion.div
                className="search-fields"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <div className="name-search">
                    <motion.input
                        type="text"
                        id="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 1.5 }}
                    />
                </div>
                <motion.select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 20 }}
                    transition={{ duration: 0.5, delay: 1.5 }}
                >
                    <option value="name">Name (A-Z)</option>
                    <option value="highP">Highest Price</option>
                    <option value="lowP">Lowest Price</option>
                    <option value="highR">Best Rated</option>
                </motion.select>
            </motion.div>
            <motion.div
                className="product-list"
                initial={{ opacity: 0, x: -75 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 1 }}
            >
                {sortedProducts.length > 0 ? (
                    sortedProducts.map((product) => (
                        <motion.div
                            className="product-list-elements"
                            key={product.id}
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", bounce: 0.7 }}
                        >
                            <div className="product-image"></div>
                            <Link to={`/products/${product.id}`}>
                                <h3 id="product-name">{product.name}</h3>
                                <h4 id="product-price">
                                    ${product.price.toFixed(2)}
                                </h4>
                                <h5 id="product-rating">✨{product.rating}</h5>
                            </Link>
                        </motion.div>
                    ))
                ) : (
                    <p>No products match your search.</p>
                )}
            </motion.div>
        </div>
    );
}

export default ProductList;
