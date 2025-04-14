import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Cart/Cart.css";
import { motion } from "motion/react";

function Cart({ onPurchase }) {
    const [cart, setCart] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [tempQuantities, setTempQuantities] = useState({});

    useEffect(() => {
        fetchCart();
          document.title = "My Cart - Bestpresso";
    }, []);

    const fetchCart = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("Please log in to view your cart");
            return;
        }

        setLoading(true);
        axios
            .get(`${process.env.REACT_APP_API_URL}/cart`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                setCart(response.data);

                const initialQuantities = {};
                response.data.items.forEach((item) => {
                    initialQuantities[item.id] = item.quantity.toString();
                });
                setTempQuantities(initialQuantities);
                setError(null);
            })
            .catch((err) => {
                setError(
                    "Failed to load cart: " + (err.response ? err.response.data.error : err.message)
                );
                console.error(err);
            })
            .finally(() => setLoading(false));
    };

    const handleUpdateQuantity = (itemId, newQuantity) => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("Please log in to update cart");
            return;
        }

        setLoading(true);
        axios
            .put(
                `${process.env.REACT_APP_API_URL}/cart/item/${itemId}`,
                { quantity: newQuantity },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            )
            .then(() => {
                fetchCart();
            })
            .catch((err) => {
                setError(
                    "Failed to update quantity: " +
                        (err.response ? err.response.data.error : err.message)
                );
                console.error(err);
            })
            .finally(() => setLoading(false));
    };

    const handleRemoveItem = (itemId) => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("Please log in to remove items");
            return;
        }

        setLoading(true);
        axios
            .delete(`${process.env.REACT_APP_API_URL}/cart/item/${itemId}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
                fetchCart();
            })
            .catch((err) => {
                setError(
                    "Failed to remove item: " +
                        (err.response ? err.response.data.error : err.message)
                );
                console.error(err);
            })
            .finally(() => setLoading(false));
    };

    const handlePurchase = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("Please log in to purchase");
            return;
        }

        setLoading(true);
        axios
            .post(
                `${process.env.REACT_APP_API_URL}/cart/purchase`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {
                alert("Purchase successful! New balance: " + response.data.new_balance);
                fetchCart();
                if (onPurchase) onPurchase();
            })
            .catch((err) => {
                setError(
                    "Failed to purchase: " + (err.response ? err.response.data.error : err.message)
                );
                console.error(err);
            })
            .finally(() => setLoading(false));
    };

    const handleQuantitySubmit = (itemId, stock) => {
        const newQuantity = Number(tempQuantities[itemId]);
        if (isNaN(newQuantity) || newQuantity < 1 || newQuantity > stock) {
            setError(`Quantity for item ${itemId} must be between 1 and ${stock}`);
            return;
        }
        handleUpdateQuantity(itemId, newQuantity);
    };
    const MotionLink = motion.create(Link);
    if (error)
        return (
            <div>
                <p>{error}</p>
                <Link to="/login">Login</Link> | <Link to="/">Back to Products</Link>
            </div>
        );
    if (loading) return <div></div>;
    if (!cart) return <div></div>;

    return (
        <motion.div
            className="page-container"
            initial={{ opacity: 0, x: -75 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -75, transition: { duration: 0.75 } }}
            transition={{ duration: 1, delay: 0.75 }}
        >
            <motion.div
                className="cart-title-and-link-container"
                initial={{ opacity: 0, y: -75 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -75, transition: { duration: 0.75 } }}
                transition={{ duration: 1, delay: 0.75 }}
            >
                <MotionLink
                    to="/products"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", bounce: 0.7 }}
                >
                    Back to Products
                </MotionLink>
                <h2 id="cart-title">My Cart</h2>
            </motion.div>
            {cart.items.length === 0 ? (
                <p id="cart-empty">Your cart is empty</p>
            ) : (
                <div className="cart-container">
                    {cart.items.map((item) => (
                        <div id="cart-wrapper" key={item.id}>
                            <br />
                            <div className="cart-details">
                                <div
                                    className="cart-product-image"
                                    style={{
                                        backgroundImage: `url(${process.env.REACT_APP_API_URL}${item.photo_url})`,
                                    }}
                                    role="img"
                                    aria-label={item.name}
                                />

                                <div className="cart-name-and-price">
                                    <h1 id="cart-product-name">{item.name}</h1>$
                                    {item.subtotal.toFixed(2)}
                                </div>
                                <div className="cart-quantity">
                                    <div className="cart-quantity-input">
                                        <label>Amount</label>
                                        <input
                                            type="number"
                                            min="1"
                                            max={item.stock}
                                            value={tempQuantities[item.id] || item.quantity}
                                            onChange={(e) =>
                                                setTempQuantities({
                                                    ...tempQuantities,
                                                    [item.id]: e.target.value,
                                                })
                                            }
                                        />
                                        <motion.button
                                            onClick={() =>
                                                handleQuantitySubmit(item.id, item.stock)
                                            }
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ type: "spring", bounce: 0.7 }}
                                        >
                                            Update
                                        </motion.button>
                                    </div>
                                    <div className="cart-remove">
                                        <motion.h6
                                            onClick={() => handleRemoveItem(item.id)}
                                            whileHover={{ scale: 1.01 }}
                                            transition={{ type: "spring", bounce: 0.7 }}
                                        >
                                            Remove
                                        </motion.h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="total-and-purchase">
                <p>Total: ${cart.total.toFixed(2)}</p>
                <motion.button
                    onClick={handlePurchase}
                    disabled={cart.total === 0}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", bounce: 0.7 }}
                >
                    Purchase
                </motion.button>
            </div>
        </motion.div>
    );
}

export default Cart;
