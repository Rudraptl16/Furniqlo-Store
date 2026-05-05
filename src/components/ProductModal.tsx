import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductModal: React.FC = () => {
  const { selectedProduct, setSelectedProduct, addToCart, setIsCartOpen } = useCart();

  if (!selectedProduct) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setSelectedProduct(null)}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(8px)',
          zIndex: 3000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem'
        }}
      >
        <motion.div
          className="modal-content"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: '#fff',
            borderRadius: '24px',
            maxWidth: '1000px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr',
            position: 'relative'
          }}
        >
          <button 
            onClick={() => setSelectedProduct(null)}
            style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', zIndex: 10, background: '#fff', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          >
            <X size={20} />
          </button>

          <div style={{ background: '#f8f8f8', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img 
              src={selectedProduct.image} 
              alt={selectedProduct.name} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>

          <div style={{ padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ color: 'var(--accent)', fontWeight: '600', fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
              {selectedProduct.brand}
            </span>
            <h2 style={{ fontSize: '2.5rem', margin: '0.5rem 0 1rem 0' }}>{selectedProduct.name}</h2>
            <p style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>${selectedProduct.price}</p>
            
            <p style={{ color: 'var(--text-light)', marginBottom: '2rem', lineHeight: '1.8' }}>
              Experience unparalleled comfort and sophisticated design with our {selectedProduct.name}. 
              Crafted with premium materials and attention to every detail, this piece is designed to elevate 
              your living space while providing lasting durability. Perfect for modern homes that value both 
              style and substance.
            </p>

            <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
              <button 
                className="btn-primary" 
                style={{ flex: 1, justifyContent: 'center' }}
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                  setIsCartOpen(true);
                }}
              >
                Add to Cart
              </button>
              <button 
                style={{ 
                  flex: 1, 
                  border: '1px solid #ddd', 
                  borderRadius: '4px', 
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
                onClick={() => {
                  // Simulate buy now
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                  setIsCartOpen(true);
                }}
              >
                Buy Now
              </button>
              <button style={{ border: '1px solid #ddd', width: '56px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Heart size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductModal;
