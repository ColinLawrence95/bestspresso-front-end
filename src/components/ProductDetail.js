// src/components/ProductDetail.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/products/${id}`)
            .then((response) => {
                setProduct(response.data);
            })
            .catch((err) => {
                setError("Failed to load product details");
                console.error(err);
            });
    }, [id]);

    const handleAddToCart = () => {
        const token = localStorage.getItem("token");
        console.log("Token from localStorage:", token); // Debug
        if (!token) {
            setError("Please log in to add items to cart");
            return;
        }

        const payload = { product_id: Number(id), quantity };
        console.log("Sending to cart/add:", {
            url: `${process.env.REACT_APP_API_URL}/cart/add`,
            payload,
            headers: { Authorization: `Bearer ${token}` },
        });

        axios
            .post(`${process.env.REACT_APP_API_URL}/cart/add`, payload, {
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
            })
            .then(() => {
                alert(`${quantity} ${product.name}(s) added to cart!`);
            })
            .catch((err) => {
                setError("Failed to add to cart: " + (err.response ? err.response.data.error : err.message));
                console.error("Axios Error:", err.response ? err.response.data : err);
            });
    };

    if (error) return <div>{error}</div>;
    if (!product) return <div>Loading...</div>;

    return (
        <div>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
            <p>Stock: {product.stock}</p>
            <div>
                <label>Quantity: </label>
                <input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    style={{ width: "50px", marginRight: "10px" }}
                />
                <button onClick={handleAddToCart}>Add to Cart</button>
            </div>
            <Link to="/products">Back to Products</Link>
        </div>
    );
}

export default ProductDetail;
