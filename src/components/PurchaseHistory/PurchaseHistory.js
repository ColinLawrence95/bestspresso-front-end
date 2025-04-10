// src/components/PurchaseHistory.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
            setError("Failed to load purchase history: " + (err.response ? err.response.data.error : err.message));
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (error)
        return (
            <div>
                <p>{error}</p>
                <Link to="/login">Login</Link> | <Link to="/">Back to Home</Link>
            </div>
        );
    if (loading) return <div>Loading purchase history...</div>;

    return (
        <div>
            <h2>Your Purchase History</h2>
            {purchases.length === 0 ? (
                <p>No purchases yet</p>
            ) : (
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {purchases.map((purchase) => (
                        <li key={purchase.id}>
                            <p>
                                <strong>Date:</strong> {new Date(purchase.date).toLocaleString()}
                            </p>
                            <p>
                                <strong>Total:</strong> ${purchase.total.toFixed(2)}
                            </p>
                            <ul>
                                {purchase.items.map((item) => (
                                    <li key={item.id}>
                                        {item.name} - ${item.price.toFixed(2)} x {item.quantity} = $
                                        {item.subtotal.toFixed(2)}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
            <Link to="/">Back to Home</Link>
        </div>
    );
}

export default PurchaseHistory;
