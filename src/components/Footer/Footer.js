import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

import "./Footer.css";

function Footer() {
    return (
        <motion.footer
            className="footer"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            eexit={{ opacity: 0, y: -40, transition: { duration: 0.75 } }}
            transition={{ duration: 1, delay: 4 }}
        >
            <div className="footer-container">
                <div className="footer-links">
                    <h3>Explore</h3>
                    <ul>
                        <li>
                            <Link to="/products">Products</Link>
                        </li>
                        <li>
                            <Link to="/cart">Cart</Link>
                        </li>
                    </ul>
                </div>
                <div className="footer-contact">
                    <h3>Contact Us</h3>
                    <p>Email: support@bestpressocoffee.com</p>
                    <p>Phone: (123) 456-7890</p>
                </div>
                <div className="footer-social">
                    <h3>Follow Us</h3>
                    <ul>
                        <li>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Twitter"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="#1DA1F2"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.4.36a9.32 9.32 0 0 1-2.89 1.1A4.52 4.52 0 0 0 16.14 0c-2.63 0-4.78 2.14-4.78 4.78 0 .37.04.73.12 1.07A12.94 12.94 0 0 1 1.67.89a4.75 4.75 0 0 0-.65 2.4c0 1.65.84 3.1 2.13 3.95a4.49 4.49 0 0 1-2.16-.6v.06c0 2.3 1.64 4.22 3.81 4.66a4.53 4.53 0 0 1-2.15.08c.61 1.9 2.39 3.28 4.5 3.33A9.06 9.06 0 0 1 0 19.54a12.85 12.85 0 0 0 6.95 2.04c8.34 0 12.9-6.91 12.9-12.9l-.01-.59A9.18 9.18 0 0 0 23 3z" />
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="#1877F2"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.407.593 24 1.324 24h11.495V14.708h-3.13v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24h-1.918c-1.504 0-1.796.715-1.796 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.407 24 24 23.407 24 22.676V1.324C24 .593 23.407 0 22.676 0z" />
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="#E1306C"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 2.2c3.2 0 3.6.012 4.849.07 1.17.056 1.97.243 2.43.407a4.9 4.9 0 0 1 1.72 1.02 4.9 4.9 0 0 1 1.02 1.72c.164.46.351 1.26.407 2.43.058 1.249.07 1.649.07 4.849s-.012 3.6-.07 4.849c-.056 1.17-.243 1.97-.407 2.43a4.9 4.9 0 0 1-1.02 1.72 4.9 4.9 0 0 1-1.72 1.02c-.46.164-1.26.351-2.43.407-1.249.058-1.649.07-4.849.07s-3.6-.012-4.849-.07c-1.17-.056-1.97-.243-2.43-.407a4.9 4.9 0 0 1-1.72-1.02 4.9 4.9 0 0 1-1.02-1.72c-.164-.46-.351-1.26-.407-2.43C2.212 15.6 2.2 15.2 2.2 12s.012-3.6.07-4.849c.056-1.17.243-1.97.407-2.43a4.9 4.9 0 0 1 1.02-1.72 4.9 4.9 0 0 1 1.72-1.02c.46-.164 1.26-.351 2.43-.407C8.4 2.212 8.8 2.2 12 2.2m0-2.2C8.735 0 8.332.012 7.052.07 5.768.128 4.642.312 3.681.637a7.085 7.085 0 0 0-2.542 1.648A7.086 7.086 0 0 0 .637 4.829C.312 5.79.128 6.917.07 8.201.012 9.481 0 9.884 0 12s.012 2.519.07 3.799c.058 1.284.242 2.411.567 3.372a7.086 7.086 0 0 0 1.648 2.542 7.086 7.086 0 0 0 2.542 1.648c.961.325 2.088.509 3.372.567C9.481 23.988 9.884 24 12 24s2.519-.012 3.799-.07c1.284-.058 2.411-.242 3.372-.567a7.086 7.086 0 0 0 2.542-1.648 7.086 7.086 0 0 0 1.648-2.542c.325-.961.509-2.088.567-3.372.058-1.28.07-1.683.07-3.799s-.012-2.519-.07-3.799c-.058-1.284-.242-2.411-.567-3.372a7.086 7.086 0 0 0-1.648-2.542A7.086 7.086 0 0 0 19.171.637c-.961-.325-2.088-.509-3.372-.567C14.519.012 14.116 0 12 0z" />
                                    <path d="M12 5.838A6.162 6.162 0 1 0 18.162 12 6.17 6.17 0 0 0 12 5.838zm0 10.162A3.999 3.999 0 1 1 16 12a3.999 3.999 0 0 1-4 4z" />
                                    <circle cx="18.406" cy="5.594" r="1.44" />
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Bestpresso Coffee. All rights reserved.</p>
            </div>
        </motion.footer>
    );
}

export default Footer;
