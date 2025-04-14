import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import "./LandingPage.css";
import coffee1 from "../../images/coffee/coffee1.jpg";
import coffee2 from "../../images/coffee/coffee2.jpg";
import coffee3 from "../../images/coffee/coffee3.jpg";

const featuredImages = [coffee1, coffee2, coffee3];

function LandingPage() {
  return (
    <div className="landing-page">
      <motion.section
        className="hero"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.75 }}
      >
        <h1>Welcome to Bestpresso </h1>
        <p>Discover the finest coffee blends crafted with passion.</p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/products" className="cta-button">
            Shop Now
          </Link>
        </motion.div>
      </motion.section>

      <motion.section
        className="featured"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.75 }}
      >
        <h2>Featured Coffees</h2>
        <div className="featured-grid">
          {featuredImages.map((image, index) => (
            <motion.div
              key={index}
              className="featured-item"
              whileHover={{ scale: 1.1, boxShadow: "0 8px 16px rgba(0,0,0,0.2)" }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <Link to="/products">
                <div
                  className="featured-image"
                  style={{ backgroundImage: `url("${image}")` }}
                ></div>
                <h3>Coffee Blend {index + 1}</h3>
                <p>Rich and aromatic, perfect for any time of day.</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="about"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h2>Our Story</h2>
        <p>
          At Bestpresso Coffee, we source the highest quality beans from around the world,
          roasted to perfection to bring you a cup full of flavor.
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/products" className="cta-button secondary">
            Explore Our Collection
          </Link>
        </motion.div>
      </motion.section>
    </div>
  );
}

export default LandingPage;