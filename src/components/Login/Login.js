// src/components/Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/sign-in`, { username, password });
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

    return (
        <div>
            <h2>Login to Bestpresso</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username: </label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div>
                    <label>Password: </label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Login</button>
            </form>
            <Link to="/">Back to Products</Link>
        </div>
    );
}

export default Login;
