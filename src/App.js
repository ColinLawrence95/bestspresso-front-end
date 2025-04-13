// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import Footer from "./components/Footer/Footer"
import NavBar from "./components/NavBar/NavBar";
import ProductList from "./components/ProductList/ProductList";
import ProductDetail from "./components/ProductDetails/ProductDetail";
import PurchaseHistory from './components/PurchaseHistory/PurchaseHistory';
import Cart from "./components/Cart/Cart";
import Login from "./components/Login/Login";
import "./App.css";

function App() {
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        fetchBalance();
    }, []);

    const fetchBalance = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/balance`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const newBalance = response.data.balance;
                setBalance(typeof newBalance === "number" ? newBalance : null);
            } catch (err) {
                console.error("Failed to fetch balance:", err.response ? err.response.data : err.message);
                setBalance(null);
            }
        } else {
            setBalance(null);
        }
    };

    return (
        <div className="App">
          <NavBar balance={balance} onLogout={fetchBalance} />
            
            <Routes>
                <Route path="/" />
                <Route path="/products" element={<ProductList />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart onPurchase={fetchBalance} />} />
                <Route path="/login" element={<Login onLogin={fetchBalance} />} />
                <Route path="/purchases" element={<PurchaseHistory />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default function AppWithRouter() {
    return (
        <Router>
            <App />
        </Router>
    );
}
