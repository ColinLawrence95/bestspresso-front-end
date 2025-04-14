import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
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

    const MotionLink = motion.create(Link);

    return (
        <motion.div
            className="nav-bar-wrapper"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
        >
            <motion.nav
                className="nav-bar-container"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <div className="nav-bar-header">
                    <motion.h1
                        className="hamburger"
                        onClick={toggleMenu}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", bounce: 0.7 }}
                    >
                        {isMenuOpen ? "✖ " : "c☰"}
                    </motion.h1>
                    <h2 className="title" onClick={() => navigate("/")}>
                        Bestpresso Coffee
                    </h2>
                    <h4 id="balance"> {typeof balance === "number" ? `🪙${balance.toFixed(2)}` : "🪙"}</h4>
                   
                </div>
            </motion.nav>
            <div className="nav-hero">
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
                            <h3 id="greeting-username">
                                Welcome {isLoggedIn ? username : "guest"}{" "}
                               
                            </h3>

                            <MotionLink
                                to="/"
                                onClick={() => setIsMenuOpen(false)}
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", bounce: 0.7 }}
                            >
                                Home
                            </MotionLink>
                            <MotionLink
                                to="/products"
                                onClick={() => setIsMenuOpen(false)}
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", bounce: 0.7 }}
                            >
                                Browse
                            </MotionLink>
                            <MotionLink
                                to="/cart"
                                onClick={() => setIsMenuOpen(false)}
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", bounce: 0.7 }}
                            >
                                Cart
                            </MotionLink>
                            <MotionLink
                                to="/purchases"
                                onClick={() => setIsMenuOpen(false)}
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", bounce: 0.7 }}
                            >
                                Purchases
                            </MotionLink>
                            <MotionLink
                                onClick={handleLogout}
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", bounce: 0.7 }}
                            >
                                Logout
                            </MotionLink>
                        </>
                    ) : (
                        <>
                            <MotionLink to="/" onClick={() => setIsMenuOpen(false)}>
                                Home
                            </MotionLink>
                            <MotionLink to="/products" onClick={() => setIsMenuOpen(false)}>
                                Browse
                            </MotionLink>
                            <MotionLink to="/login" onClick={() => setIsMenuOpen(false)}>
                                Login
                            </MotionLink>
                            <MotionLink to="/signup" onClick={() => setIsMenuOpen(false)}>
                                Sign Up
                            </MotionLink>
                        </>
                    )}
                </motion.div>
                <h1 id="flavor-text">
                    "Crafted for Coffee Lovers, by Coffee Lovers.
                    <br />
                    Join the Bestpresso family—where passion brews in every cup."
                    <br />
                    <span id="team-sign">- The Bestpresso Team</span>
                </h1>
            </div>
        </motion.div>
    );
}

export default NavBar;
