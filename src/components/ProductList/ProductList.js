import { FaStar } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ProductList.css";
import { motion } from "motion/react";
import coffee1 from "../../images/coffee/coffee1.jpg";
import coffee2 from "../../images/coffee/coffee2.jpg";
import coffee3 from "../../images/coffee/coffee3.jpg";
import coffee4 from "../../images/coffee/coffee4.jpg";
import coffee5 from "../../images/coffee/coffee5.jpg";
import coffee6 from "../../images/coffee/coffee6.jpg";
import coffee7 from "../../images/coffee/coffee7.jpg";
import coffee8 from "../../images/coffee/coffee8.jpg";
import coffee9 from "../../images/coffee/coffee9.jpg";
import coffee10 from "../../images/coffee/coffee10.jpg";

const coffeeImages = [
    coffee1,
    coffee2,
    coffee3,
    coffee4,
    coffee5,
    coffee6,
    coffee7,
    coffee8,
    coffee9,
    coffee10,
];
function ProductList() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("");

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

    const getRandomCoffeeImage = () => {
        const randomIndex = Math.floor(Math.random() * coffeeImages.length);
        return coffeeImages[randomIndex];
    };

    if (error) return <div>{error}</div>;

    return (
        <div className="products-page-container">
            <motion.div
                className="search-fields"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, transition: { duration: .75 } }}
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
                <motion.select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
              
                >
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
                exit={{ opacity: 0, x: -75, transition: { duration: .75 } }}
                transition={{ duration: 1, delay: 0.75 }}
            >
                {sortedProducts.length > 0 ? (
                    sortedProducts.map((product) => (
                        <motion.div
                            className="product-list-elements"
                            key={product.id}
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", bounce: 0.7 }}
                        >
                            <Link to={`/products/${product.id}`}>
                            <div
                                className="product-image"
                                style={{ backgroundImage: `url("${getRandomCoffeeImage()}")` }}
                            ></div>
                           
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
        </div>
    );
}

export default ProductList;
