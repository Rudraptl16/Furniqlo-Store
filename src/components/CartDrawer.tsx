import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, totalPrice, setIsCheckoutOpen } = useCart();

  const handleCheckout = () => {
    if (cart.length > 0) {
      setIsCartOpen(false);
      setIsCheckoutOpen(true);
    }
  };

  return (
    <AnimatePresence>
      {/* ... rest of the component remains same, just update the button below ... */}
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
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
            className="cart-drawer"
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
              background: '#fff',
              zIndex: 2001,
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '-10px 0 30px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.8rem' }}>Your Cart</h2>
              <button onClick={() => setIsCartOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto' }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                  <ShoppingBag size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                  <p style={{ color: '#888' }}>Your cart is empty</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {cart.map((item) => (
                    <div key={item.id} style={{ display: 'flex', gap: '1rem' }}>
                      <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '1rem', marginBottom: '0.2rem' }}>{item.name}</h4>
                        <p style={{ fontSize: '0.9rem', color: '#888', marginBottom: '0.5rem' }}>${item.price}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #eee', borderRadius: '4px' }}>
                            <button onClick={() => updateQuantity(item.id, -1)} style={{ padding: '0.2rem 0.5rem' }}><Minus size={14} /></button>
                            <span style={{ fontSize: '0.9rem', width: '20px', textAlign: 'center' }}>{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} style={{ padding: '0.2rem 0.5rem' }}><Plus size={14} /></button>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} style={{ fontSize: '0.8rem', color: '#ff4444' }}>Remove</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ borderTop: '1px solid #eee', paddingTop: '2rem', marginTop: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <span style={{ fontWeight: '500' }}>Subtotal</span>
                <span style={{ fontWeight: '700', fontSize: '1.2rem' }}>${totalPrice}</span>
              </div>
              <button 
                className="btn-primary" 
                style={{ width: '100%', justifyContent: 'center', opacity: cart.length === 0 ? 0.5 : 1 }}
                disabled={cart.length === 0}
                onClick={handleCheckout}
              >
                Checkout Now
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
