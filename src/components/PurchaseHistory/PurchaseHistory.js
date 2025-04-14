import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./PurchaseHistory.css";
import { motion } from "motion/react";

function PurchaseHistory() {
    const [purchases, setPurchases] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchPurchases();
    }, []);

    const fetchPurchases = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("Please log in to view your purchase history");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/purchases`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPurchases(response.data.purchases);
            setError(null);
        } catch (err) {
            setError(
                "Failed to load purchase history: " +
                    (err.response ? err.response.data.error : err.message)
            );
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    const MotionLink = motion.create(Link);
    if (error)
        return (
            <div>
                <p>{error}</p>
                <Link to="/login">Login</Link> | <Link to="/">Back to Home</Link>
            </div>
        );
    if (loading) return <div></div>;

    return (
        <motion.div
            className="history-page-container"
            initial={{ opacity: 0, x: -75 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -75, transition: { duration: 0.75 } }}
            transition={{ duration: 1, delay: 0.75 }}
        >
            <MotionLink
                to="/products"
                id="history-products-link"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", bounce: 0.7 }}
            >
                Back to Products
            </MotionLink>
            <h2 id="history-title">My Purchase History</h2>
            {purchases.length === 0 ? (
                <p id="history-empty">No purchases yet</p>
            ) : (
                <div className="history-wrapper">
                    {purchases.map((purchase) => (
                        <div className="history-element" key={purchase.id}>
                            <div className="history-element-top-row">
                                <label>
                                    <strong>Transaction #:</strong> {purchase.id}
                                </label>
                                <label>
                                    <strong>Date:</strong>{" "}
                                    {new Date(purchase.date).toLocaleString()}
                                </label>
                            </div>
                            <ul className="history-items">
                                {purchase.items.map((item) => (
                                    <li key={item.id}>
                                        {item.name} ${item.price.toFixed(2)} x {item.quantity} = $
                                        {item.subtotal.toFixed(2)}
                                    </li>
                                ))}
                            </ul>
                            <p id="history-total">
                                <strong>Total:</strong> ${purchase.total.toFixed(2)}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </motion.div>
    );
}

export default PurchaseHistory;
