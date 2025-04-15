import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./SignUp.css";
import { motion } from "motion/react";

function SignUp({ onSignUp }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/sign-up`, {
                username,
                password,
            });
            const token = response.data.token;
            if (!token) {
                setError("No token received from server");
                return;
            }
            localStorage.setItem("token", token);
            navigate("/");
            if (onSignUp) onSignUp();
        } catch (err) {
            setError("Sign Up failed - check your username or password");
            console.error("Sign Up Error:", err.response ? err.response.data : err.message);
        }
    };
    const MotionLink = motion.create(Link);
    return (
        <div className="sign-page-wrapper">
            <motion.div
                className="sign-elements"
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40, transition: { duration: 0.75 } }}
                transition={{ duration: 1, delay: 0.75 }}
            >
                <h2>Sign Up</h2>
                {error && <p>{error}</p>}
                <div className="sign-inputs">
                    <form onSubmit={handleSignUp}>
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
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", bounce: 0.7 }}
                        >
                            Sign Up
                        </motion.button>
                    </form>
                </div>
                <p>Have an account?</p>
                <MotionLink
                    to="/login"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", bounce: 0.7 }}
                >
                    Log In
                </MotionLink>
            </motion.div>
        </div>
    );
}

export default SignUp;
