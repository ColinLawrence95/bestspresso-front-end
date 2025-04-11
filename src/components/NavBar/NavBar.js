import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react"; // Adjust if using framer-motion
import "./NavBar.css";

function NavBar({ balance, onLogout }) {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("token");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [username, setUsername] = useState("");

    useEffect(() => {
        if (isLoggedIn) {
            const token = localStorage.getItem("token");
            try {
                const payload = JSON.parse(atob(token.split(".")[1]));
                setUsername(payload.payload?.username);
            } catch (e) {
                console.error("Error decoding token:", e);
                setUsername("User");
            }
        }
    }, [isLoggedIn]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
        if (onLogout) onLogout();
        setIsMenuOpen(false);
        setUsername("");
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    return (
        <motion.div
            className="nav-bar-wrapper"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
        >
            <motion.nav
                className="nav-bar-container"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <div className="nav-bar-header">
                    <h1 className="hamburger" onClick={toggleMenu}>
                        {isMenuOpen ? "✖ " : "c☰"}
                    </h1>
                    <h2 className="title">Bestpresso Coffee</h2>
                </div>
            </motion.nav>
            <div className="hero">
                <motion.div
                    className="sidebar-menu"
                    initial={{ x: "-100%", opacity: 0 }}
                    animate={{
                        x: isMenuOpen ? 0 : "-102%",
                        opacity: isMenuOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.75, ease: "easeInOut" }}
                >
                    {isLoggedIn ? (
                        <>
                            <h3>👤 Welcome {isLoggedIn ? username : "guest"}</h3>

                            {typeof balance === "number"
                                ? `🪙${balance.toFixed(2)}`
                                : "🪙"}

                            <Link to="/" onClick={() => setIsMenuOpen(false)}>
                                Home
                            </Link>
                            <Link
                                to="/products"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Browse
                            </Link>
                            <Link
                                to="/cart"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Cart
                            </Link>
                            <Link
                                to="/purchases"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Purchases
                            </Link>
                            <Link onClick={handleLogout}>Logout</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/" onClick={() => setIsMenuOpen(false)}>
                                Home
                            </Link>
                            <Link
                                to="/products"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Browse
                            </Link>
                            <Link
                                to="/login"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Login
                            </Link>
                        </>
                    )}
                </motion.div>
            </div>
        </motion.div>
    );
}

export default NavBar;
