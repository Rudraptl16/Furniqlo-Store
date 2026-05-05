import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X, ArrowRight, CreditCard, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CheckoutModal: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const { clearCart } = useCart();

  const handleFinish = () => {
    clearCart();
    onClose();
    setStep(1);
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
            background: 'rgba(0,0,0,0.6)',
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
              background: '#fff',
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
                style={{ position: 'absolute', right: '1.5rem', top: '1.5rem' }}
              >
                <X size={20} />
              </button>
            )}

            {step === 1 && (
              <div>
                <Truck size={32} style={{ color: 'var(--accent)', marginBottom: '1rem' }} />
                <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Shipping Details</h2>
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
                  style={{ width: '100%', marginTop: '2rem', justifyContent: 'center' }}
                  onClick={() => setStep(2)}
                >
                  Continue to Payment <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                </button>
              </div>
            )}

            {step === 2 && (
              <div>
                <CreditCard size={32} style={{ color: 'var(--accent)', marginBottom: '1rem' }} />
                <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Payment Details</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <input type="text" placeholder="Card Number" style={inputStyle} />
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <input type="text" placeholder="MM/YY" style={inputStyle} />
                    <input type="text" placeholder="CVC" style={inputStyle} />
                  </div>
                </div>
                <button 
                  className="btn-primary" 
                  style={{ width: '100%', marginTop: '2rem', justifyContent: 'center' }}
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
                  <CheckCircle size={80} style={{ color: '#4caf50', marginBottom: '1.5rem' }} />
                </motion.div>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Payment Successful!</h2>
                <p style={{ color: '#888', marginBottom: '2rem' }}>
                  Thank you for your purchase. Your furniture will be delivered within 5-7 business days.
                </p>
                <button 
                  className="btn-primary" 
                  style={{ width: '100%', justifyContent: 'center' }}
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

const inputStyle = {
  padding: '1rem',
  borderRadius: '8px',
  border: '1px solid #eee',
  width: '100%',
  outline: 'none',
  fontSize: '1rem'
};

export default CheckoutModal;
