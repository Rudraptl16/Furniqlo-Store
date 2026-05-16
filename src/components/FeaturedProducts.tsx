import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import MagneticButton from './MagneticButton';
import { products } from '../data/products';

const featuredProducts = products.slice(0, 3);


const FeaturedProducts: React.FC = () => {
  const { addToCart, setSelectedProduct } = useCart();

  return (
    <section className="section-padding" id="featured">
      <div className="container">
        <div className="featured-grid">
          {featuredProducts.map((product, index) => (
            <motion.div 
              key={product.id}
              className="product-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              onClick={() => setSelectedProduct(product)}
              style={{ cursor: 'pointer' }}
            >
              <div className="product-image-wrapper">
                <img src={product.image} alt={product.name} className="product-image" />
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p className="product-meta">{product.brand}</p>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    style={{ fontSize: '0.9rem', fontWeight: '600', textDecoration: 'underline' }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '6rem' }}>
          <MagneticButton className="btn-primary" onClick={() => {}}>
            <span style={{ position: 'relative' }}>
              Shop Our Collections
              <div className="badge-float" style={{ 
                position: 'absolute', 
                right: '-50px', 
                top: '-30px',
                width: '65px',
                height: '65px',
                fontSize: '0.6rem'
              }}>
                <span>$0 Free</span>
                <span>Return</span>
              </div>
            </span>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
