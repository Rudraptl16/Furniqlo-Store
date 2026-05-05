import React from 'react';
import { motion } from 'framer-motion';
import bedPromoImg from '../assets/tranquil_bedframe_1777993009387.png'; // Reusing bed for promo

const PromoSection: React.FC = () => {
  return (
    <section className="section-padding" style={{ backgroundColor: '#fff' }}>
      <div className="container">
        {/* Image 3 Banner Content */}
        <motion.div 
          className="all-products-header"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2>
            Elevate Every Room with 🛋️ Exquisite Furniture 🪵 Crafted to Reflect ⌨️ Your Persona Style, 🪵 Turning 🪵 Ordinary Spaces 🪑 into Extraordinary Sanctuaries
          </h2>
        </motion.div>

        {/* Image 4 Content */}
        <div className="promo-section section-padding">
          <motion.div 
            className="promo-image-wrapper"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img src={bedPromoImg} alt="Custom Furniture" />
          </motion.div>
          
          <motion.div 
            className="promo-content"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2>Transform Your Home with Furniq Furniture</h2>
            <p className="promo-text">
              Our skilled artisans create furniture that perfectly fits your lifestyle and space. 
              From concept to completion, we ensure each piece is crafted with precision and care.
            </p>
            
            <div className="promo-features">
              <div className="feature-item">
                <p>From concept to completion, we ensure each piece is crafted with precision and care, delivering beauty and functionality in every design.</p>
              </div>
              <div className="feature-item">
                <p>From concept to completion, we ensure each piece is crafted with precision and care, delivering beauty and functionality in every design.</p>
              </div>
            </div>

            <button className="btn-primary">
              View Our Custom Solutions
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
