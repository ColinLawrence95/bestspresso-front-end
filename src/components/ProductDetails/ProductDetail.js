import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./ProductDetail.css";
import { FaStar } from "react-icons/fa";
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
function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [newRating, setNewRating] = useState("");

    const fetchProduct = useCallback(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/products/${id}`)
            .then((response) => {
                setProduct(response.data);
                setNewRating(response.data.rating.toString());
            })
            .catch((err) => {
                setError("Failed to load product details");
                console.error(err);
            });
    }, [id]);

    useEffect(() => {
        fetchProduct();
    }, [id, fetchProduct]);

    const handleAddToCart = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("Please log in to add items to cart");
            return;
        }

        const payload = { product_id: Number(id), quantity };
        axios
            .post(`${process.env.REACT_APP_API_URL}/cart/add`, payload, {
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
            })
            .then(() => {
                alert(`${quantity} ${product.name}(s) added to cart!`);
            })
            .catch((err) => {
                setError(
                    "Failed to add to cart: " +
                        (err.response ? err.response.data.error : err.message)
                );
                console.error(err);
            });
    };

    const handleRateProduct = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("Please log in to rate this product");
            return;
        }

        const ratingValue = parseFloat(newRating);
        if (isNaN(ratingValue) || ratingValue < 0 || ratingValue > 5) {
            setError("Rating must be a number between 0 and 5");
            return;
        }

        axios
            .post(
                `${process.env.REACT_APP_API_URL}/products/${id}/rate`,
                { rating: ratingValue },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            )
            .then(() => {
                setError(null);
                fetchProduct();
                alert("Rating updated successfully!");
            })
            .catch((err) => {
                setError(
                    "Failed to update rating: " +
                        (err.response ? err.response.data.error : err.message)
                );
                console.error(err);
            });
    };

    const getRandomCoffeeImage = () => {
        const randomIndex = Math.floor(Math.random() * coffeeImages.length);
        return coffeeImages[randomIndex];
    };

    if (error) return <div>{error}</div>;
    if (!product) return <div></div>;

    return (
        <motion.div
            className="details-page-container"
            initial={{ opacity: 0, x: -75 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -75, transition: { duration: 0.75 } }}
            transition={{ duration: 1, delay: 0.75 }}
        >
            <div
                className="details-product-image"
                style={{ backgroundImage: `url("${getRandomCoffeeImage()}")` }}
            ></div>
            <div>
                <h2 className="details-product-name">{product.name}</h2>
                <h2 className="details-product-desc">{product.description}.</h2>
                <h4 className="details-product-price">Price: ${product.price.toFixed(2)}</h4>

                <div className="rating">
                    <h4>
                        <FaStar color="orange" />
                    </h4>{" "}
                    <input
                        type="number"
                        min="0"
                        max="5"
                        step="1"
                        value={newRating}
                        onChange={(e) => setNewRating(e.target.value)}
                    />
                    <button onClick={handleRateProduct}>Rate!</button>
                </div>
                <h4 className="details-product-stock">{product.stock} in Stock</h4>
                <div className="quantity">
                    <h4>Quantity </h4>
                    <input
                        type="number"
                        min="1"
                        max={product.stock}
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                    />
                    <button onClick={handleAddToCart}>Add to Cart</button>
                </div>
                <motion.div
                    className="products-link"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 1 }}
                >
                    <Link to="/products">Back to Products</Link>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default ProductDetail;
