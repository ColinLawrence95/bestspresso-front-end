import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ProductDetail.css";
import { FaStar } from "react-icons/fa";
import { motion } from "motion/react";
import { toast } from "react-toastify";
import { FaCoffee } from "react-icons/fa";

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
                document.title = `${response.data.name} - Bestpresso`;
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
            toast.error("Please log in to add items to cart");
            return;
        }

        const payload = { product_id: Number(id), quantity };
        axios
            .post(`${process.env.REACT_APP_API_URL}/cart/add`, payload, {
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
            })
            .then(() => {
                toast.success(`${quantity} ${product.name}(s) added to cart!`);
            })
            .catch((err) => {
                toast.error(
                    "Failed to add to cart: " +
                        (err.response ? err.response.data.error : err.message)
                );
                console.error(err);
            });
    };

    const handleRateProduct = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please log in to rate this product");
            return;
        }

        const ratingValue = parseFloat(newRating);
        if (isNaN(ratingValue) || ratingValue < 0 || ratingValue > 5) {
            toast.error("Rating must be a number between 0 and 5");
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
                toast.success("Rating updated successfully!");
            })
            .catch((err) => {
                setError(
                    "Failed to update rating: " +
                        (err.response ? err.response.data.error : err.message)
                );
                console.error(err);
            });
    };

    if (error) return <div>{error}</div>;
    if (!product) return <div></div>;

    return (
        <motion.div
            className="details-page-container"
            initial={{ opacity: 0, x: -75 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -75, transition: { duration: 0.75 } }}
            transition={{ duration: 1, delay: .5 }}
        >
            <div
                className="details-product-image"
                style={{
                    backgroundImage: `url(${process.env.REACT_APP_API_URL}${product.photo_url})`,
                }}
                role="img"
                aria-label={product.name}
            />
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
                    <FaCoffee color="black" size="37"/>
                    <input
                        type="number"
                        min="1"
                        max={product.stock}
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                    />
                    <button onClick={handleAddToCart}>Add</button>
                </div>
            </div>
        </motion.div>
    );
}

export default ProductDetail;
