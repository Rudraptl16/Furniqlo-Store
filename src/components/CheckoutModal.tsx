import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X, ArrowRight, CreditCard, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CheckoutModal: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const { clearCart, addToast } = useCart();

  const handleFinish = () => {
    clearCart();
    addToast('Your order has been placed!', 'success');
    onClose();
    setStep(1);
  };

  const inputStyle = {
    padding: '1rem',
    borderRadius: '12px',
    border: '1px solid var(--border-color)',
    background: 'var(--bg-tri)',
    color: 'var(--text-main)',
    width: '100%',
    outline: 'none',
    fontSize: '0.95rem'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(8px)',
            zIndex: 5000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            style={{
              background: 'var(--bg-main)',
              color: 'var(--text-main)',
              border: '1px solid var(--border-color)',
              borderRadius: '24px',
              maxWidth: '500px',
              width: '100%',
              padding: '2.5rem',
              position: 'relative'
            }}
          >
            {step < 3 && (
              <button 
                onClick={onClose}
                style={{ 
                  position: 'absolute', 
                  right: '1.5rem', 
                  top: '1.5rem',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-main)',
                  cursor: 'pointer'
                }}
              >
                <X size={20} />
              </button>
            )}

            {step === 1 && (
              <div>
                <Truck size={32} style={{ color: 'var(--accent)', marginBottom: '1rem' }} />
                <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)' }}>Shipping Details</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <input type="text" placeholder="Full Name" style={inputStyle} />
                  <input type="email" placeholder="Email Address" style={inputStyle} />
                  <input type="text" placeholder="Address" style={inputStyle} />
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <input type="text" placeholder="City" style={inputStyle} />
                    <input type="text" placeholder="ZIP" style={inputStyle} />
                  </div>
                </div>
                <button 
                  className="btn-primary" 
                  style={{ width: '100%', marginTop: '2rem', justifyContent: 'center', cursor: 'pointer' }}
                  onClick={() => setStep(2)}
                >
                  Continue to Payment <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                </button>
              </div>
            )}

            {step === 2 && (
              <div>
                <CreditCard size={32} style={{ color: 'var(--accent)', marginBottom: '1rem' }} />
                <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)' }}>Payment Details</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <input type="text" placeholder="Card Number" style={inputStyle} />
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <input type="text" placeholder="MM/YY" style={inputStyle} />
                    <input type="text" placeholder="CVC" style={inputStyle} />
                  </div>
                </div>
                <button 
                  className="btn-primary" 
                  style={{ width: '100%', marginTop: '2rem', justifyContent: 'center', cursor: 'pointer' }}
                  onClick={() => setStep(3)}
                >
                  Pay Now
                </button>
              </div>
            )}

            {step === 3 && (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 10, stiffness: 100 }}
                >
                  <CheckCircle size={80} style={{ color: '#10b981', marginBottom: '1.5rem' }} />
                </motion.div>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>Payment Successful!</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  Thank you for your purchase. Your furniture will be delivered within 5-7 business days.
                </p>
                <button 
                  className="btn-primary" 
                  style={{ width: '100%', justifyContent: 'center', cursor: 'pointer' }}
                  onClick={handleFinish}
                >
                  Back to Shop
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CheckoutModal;
