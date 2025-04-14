import { FaStar } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ProductList.css";
import { motion } from "motion/react";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    useEffect(() => {
        document.title = "Browse - Bestpresso";
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

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

    if (error) return <div>{error}</div>;
    return (
        <div className="products-page-container">
            <motion.div
                className="search-fields"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, transition: { duration: 0.75 } }}
                transition={{ duration: 1, delay: 0.75 }}
            >
                <h4 id="product-list-title">Our Products</h4>
                <div className="name-search">
                    <motion.input
                        type="text"
                        id="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by Name"
                    />
                </div>
                <motion.select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                    <option value="">Sort By</option>
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
                exit={{ opacity: 0, x: -75, transition: { duration: 0.75 } }}
                transition={{ duration: 1, delay: 0.75 }}
            >
                {paginatedProducts.length > 0 ? (
                    paginatedProducts.map((product) => (
                        <motion.div
                            className="product-list-elements"
                            key={product.id}
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", bounce: 0.7 }}
                        >
                            <Link to={`/products/${product.id}`}>
                                <div
                                    className="product-image"
                                    style={{
                                        backgroundImage: `url(${process.env.REACT_APP_API_URL}${product.photo_url})`,
                                    }}
                                    role="img"
                                    aria-label={product.name}
                                />

                                <div className="product-list-element">
                                    <div id="top-tile-row">
                                        <h3 id="product-name">{product.name}</h3>
                                        <h5 id="product-rating">
                                            <FaStar color="orange" style={{ marginRight: "4px" }} />
                                            {product.rating}
                                        </h5>
                                    </div>
                                    <h4 id="product-price">${product.price.toFixed(2)}</h4>
                                </div>
                            </Link>
                        </motion.div>
                    ))
                ) : (
                    <h1 id="products-no-match">No products match your search.</h1>
                )}
            </motion.div>

            <div className="pagination">
                {Array.from({ length: Math.ceil(sortedProducts.length / itemsPerPage) }, (_, index) => (
                    <button
                        key={index + 1}
                        className={currentPage === index + 1 ? "active-page" : ""}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ProductList;
