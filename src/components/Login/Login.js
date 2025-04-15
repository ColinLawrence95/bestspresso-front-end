import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "motion/react";

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/sign-in`, {
                username,
                password,
            });
            console.log("Login Response:", response.data);
            const token = response.data.token;
            if (!token) {
                setError("No token received from server");
                return;
            }
            localStorage.setItem("token", token);
            console.log("Stored Token:", localStorage.getItem("token"));
            navigate("/");
            if (onLogin) onLogin();
        } catch (err) {
            setError("Login failed - check your username or password");
            console.error("Login Error:", err.response ? err.response.data : err.message);
        }
    };
    const MotionLink = motion.create(Link);
    return (
        <motion.div className="sign-page-wrapper">
            <motion.div
                className="sign-elements"
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40, transition: { duration: .75 } }}
                transition={{ duration: 1, delay: 0.75 }}
            >
                <h2>Log In</h2>
                {error && <p>{error}</p>}
                <div className="sign-inputs">
                    <form onSubmit={handleLogin}>
                        <div>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                placeholder="Username"
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Password"
                            />
                        </div>
                        <motion.button type="submit"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", bounce: 0.7 }}>Log in</motion.button>
                    </form>
                </div>
                <p>Don't have an account?</p>
                <MotionLink
                    to="/signup"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", bounce: 0.7 }}
                >
                    Sign Up
                </MotionLink>
            </motion.div>
        </motion.div>
    );
}

export default Login;
