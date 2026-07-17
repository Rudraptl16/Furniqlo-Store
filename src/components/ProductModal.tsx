import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Star, GitCompare } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductModal: React.FC = () => {
  const { 
    selectedProduct, 
    setSelectedProduct, 
    addToCart, 
    setIsCartOpen,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    isInCompare,
    addToCompare,
    removeFromCompare,
    currency,
    exchangeRate
  } = useCart();

  if (!selectedProduct) return null;

  const reviews = [
    { id: 1, user: 'Sarah M.', rating: 5, comment: 'Absolutely beautiful piece! The quality is even better than in the photos.' },
    { id: 2, user: 'John D.', rating: 4, comment: 'Very comfortable and fits perfectly in my living room. Fast delivery.' }
  ];

  const formatPrice = (price: number) => {
    const symbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '₹';
    return `${symbol}${(price * exchangeRate).toFixed(0)}`;
  };

  const toggleWishlist = () => {
    if (isInWishlist(selectedProduct.id)) {
      removeFromWishlist(selectedProduct.id);
    } else {
      addToWishlist(selectedProduct);
    }
  };

  const toggleCompare = () => {
    if (isInCompare(selectedProduct.id)) {
      removeFromCompare(selectedProduct.id);
    } else {
      addToCompare(selectedProduct);
    }
  };

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
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(8px)',
          zIndex: 3000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem'
        }}
      >
        <motion.div
          className="modal-content modal-content-inner"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: 'var(--bg-main)',
            color: 'var(--text-main)',
            border: '1px solid var(--border-color)',
            borderRadius: '24px',
            maxWidth: '1000px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <button 
            onClick={() => setSelectedProduct(null)}
            style={{ 
              position: 'absolute', 
              right: '1.5rem', 
              top: '1.5rem', 
              zIndex: 10, 
              background: 'var(--bg-main)', 
              color: 'var(--text-main)',
              border: '1px solid var(--border-color)',
              borderRadius: '50%', 
              width: '40px', 
              height: '40px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              boxShadow: 'var(--shadow-glass)',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>

          <div style={{ background: 'var(--bg-tri)', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img 
              src={selectedProduct.image} 
              alt={selectedProduct.name} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>

          <div style={{ padding: '3rem', display: 'flex', flexDirection: 'column', maxHeight: '90vh', overflowY: 'auto' }}>
            <span style={{ color: 'var(--accent)', fontWeight: '600', fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
              {selectedProduct.brand}
            </span>
            <h2 style={{ fontSize: '2.5rem', margin: '0.5rem 0 1rem 0', fontFamily: 'var(--font-serif)' }}>{selectedProduct.name}</h2>
            <p style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--accent)' }}>{formatPrice(selectedProduct.price)}</p>
            
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.8' }}>
              {selectedProduct.description || `Experience unparalleled comfort and sophisticated design with our ${selectedProduct.name}. Crafted with premium materials and attention to every detail, this piece is designed to elevate your living space while providing lasting durability.`}
            </p>

            <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', marginBottom: '2rem' }}>
              <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontFamily: 'var(--font-serif)' }}>Customer Reviews</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {reviews.map(review => (
                  <div key={review.id} style={{ background: 'var(--bg-sec)', border: '1px solid var(--border-color)', padding: '1rem', borderRadius: '12px' }}>
                    <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '0.4rem' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} fill={i < review.rating ? "#ffc107" : "none"} color={i < review.rating ? "#ffc107" : "#ddd"} />
                      ))}
                    </div>
                    <p style={{ fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.1rem' }}>{review.user}</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.8rem', marginTop: 'auto' }}>
              <button 
                className="btn-primary" 
                style={{ flex: 1, justifyContent: 'center', cursor: 'pointer' }}
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                  setIsCartOpen(true);
                }}
              >
                Add to Cart
              </button>
              
              <button 
                onClick={toggleCompare}
                style={{ 
                  border: '1px solid var(--border-color)', 
                  background: isInCompare(selectedProduct.id) ? 'var(--accent)' : 'transparent',
                  color: isInCompare(selectedProduct.id) ? '#fff' : 'var(--text-main)',
                  width: '56px', 
                  borderRadius: '12px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                aria-label="Compare Product"
              >
                <GitCompare size={20} />
              </button>

              <button 
                onClick={toggleWishlist}
                style={{ 
                  border: '1px solid var(--border-color)', 
                  background: 'transparent',
                  color: isInWishlist(selectedProduct.id) ? '#ff4d4d' : 'var(--text-main)',
                  width: '56px', 
                  borderRadius: '12px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                aria-label="Wishlist Product"
              >
                <Heart size={20} fill={isInWishlist(selectedProduct.id) ? '#ff4d4d' : 'none'} />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductModal;
