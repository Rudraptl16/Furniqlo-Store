import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import MagneticButton from './MagneticButton';
import sofaImg from '../assets/serenity_sofa_1777992962262.png';
import chairImg from '../assets/parsons_chair_1777992987210.png';
import bedImg from '../assets/tranquil_bedframe_1777993009387.png';

const products = [
  { id: 1, name: 'Serenity Sofa', brand: 'Manufacture Hatil', price: 1200, image: sofaImg },
  { id: 2, name: 'Parsons Chair - 4', brand: 'Manufacture Regal', price: 450, image: chairImg },
  { id: 3, name: 'Tranquil Bedframe', brand: 'Manufacture Lxona', price: 850, image: bedImg }
];

const FeaturedProducts: React.FC = () => {
  const { addToCart, setSelectedProduct } = useCart();

  return (
    <section className="section-padding" id="featured">
      <div className="container">
        <div className="featured-grid">
          {products.map((product, index) => (
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
