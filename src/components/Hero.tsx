import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import heroImg from '../assets/hero_furniture_sideboard_1777992938434.png';

const Hero: React.FC = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section className="hero" ref={ref}>
      <div className="container">
        <motion.div 
          className="hero-content"
          style={{ opacity }}
        >
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Elevate Your Space <br /> with Our Furniture
          </motion.h1>
          
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Discover luxurious, high-quality furniture crafted for comfort and style.
          </motion.p>
          
          <motion.div 
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <button className="btn-primary">
              Shop Now
            </button>
            <span className="promo-text">Free Shipping on Order $600+</span>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div 
        className="hero-image-container"
        style={{ y }}
      >
        <motion.img 
          src={heroImg} 
          alt="Modern Sideboard" 
          className="hero-image"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <motion.div 
          className="badge-float"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 10, delay: 1 }}
        >
          <span>$0</span>
          <span>Free Return</span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
