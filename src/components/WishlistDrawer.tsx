import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const WishlistDrawer: React.FC = () => {
  const { 
    wishlist, 
    isWishlistOpen, 
    setIsWishlistOpen, 
    removeFromWishlist, 
    addToCart,
    currency,
    exchangeRate
  } = useCart();

  const formatPrice = (price: number) => {
    const symbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '₹';
    return `${symbol}${(price * exchangeRate).toFixed(0)}`;
  };

  const handleMoveToCart = (item: any) => {
    addToCart(item);
    removeFromWishlist(item.id);
  };

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsWishlistOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.3)',
              backdropFilter: 'blur(4px)',
              zIndex: 2000
            }}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              right: 0,
              top: 0,
              bottom: 0,
              width: '100%',
              maxWidth: '450px',
              background: 'var(--bg-main)',
              color: 'var(--text-main)',
              borderLeft: '1px solid var(--border-color)',
              zIndex: 2001,
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--shadow-premium)'
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Heart size={22} fill="var(--accent)" color="var(--accent)" />
                <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)' }}>My Wishlist</h2>
              </div>
              <button 
                onClick={() => setIsWishlistOpen(false)}
                style={{ color: 'var(--text-main)', display: 'flex', alignItems: 'center' }}
              >
                <X size={24} />
              </button>
            </div>

            {/* Content Area */}
            <div style={{ flex: 1, overflowY: 'auto', paddingRight: '0.5rem' }}>
              {wishlist.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '6rem' }}>
                  <Heart size={48} style={{ opacity: 0.2, marginBottom: '1.5rem', color: 'var(--text-muted)' }} />
                  <p style={{ color: 'var(--text-muted)' }}>Your wishlist is empty</p>
                  <button 
                    className="btn-primary" 
                    onClick={() => { setIsWishlistOpen(false); const el = document.getElementById('shop'); el?.scrollIntoView({ behavior: 'smooth' }); }}
                    style={{ marginTop: '1.5rem', background: 'var(--primary)', color: 'var(--bg-main)', padding: '0.8rem 1.5rem', fontSize: '0.85rem', width: 'auto', margin: '1.5rem auto 0' }}
                  >
                    Browse Furniture
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {wishlist.map((item) => (
                    <motion.div 
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      style={{ 
                        display: 'flex', 
                        gap: '1rem', 
                        background: 'var(--bg-sec)', 
                        padding: '1rem', 
                        borderRadius: '12px',
                        border: '1px solid var(--border-color)',
                        alignItems: 'center'
                      }}
                    >
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '8px' }} 
                      />
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 600, margin: '0 0 0.2rem 0' }}>{item.name}</h4>
                        <p style={{ fontSize: '0.9rem', color: 'var(--accent)', fontWeight: 600, margin: '0 0 0.5rem 0' }}>
                          {formatPrice(item.price)}
                        </p>
                        
                        <div style={{ display: 'flex', gap: '0.8rem' }}>
                          <button
                            onClick={() => handleMoveToCart(item)}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.4rem',
                              background: 'var(--primary)',
                              color: 'var(--bg-main)',
                              padding: '0.4rem 0.8rem',
                              borderRadius: '6px',
                              fontSize: '0.75rem',
                              fontWeight: 600
                            }}
                          >
                            <ShoppingCart size={12} /> Add to Cart
                          </button>
                          
                          <button
                            onClick={() => removeFromWishlist(item.id)}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#ff4d4d',
                              padding: '0.4rem',
                              borderRadius: '6px',
                              border: '1px solid rgba(255, 77, 77, 0.15)',
                              background: 'rgba(255, 77, 77, 0.05)'
                            }}
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WishlistDrawer;
