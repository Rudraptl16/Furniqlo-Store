import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const Toast: React.FC = () => {
  const { toasts, removeToast } = useCart();

  return (
    <div
      style={{
        position: 'fixed',
        top: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: '380px',
        width: 'calc(100% - 48px)',
        pointerEvents: 'none'
      }}
    >
      <AnimatePresence>
        {toasts.map((toast) => {
          let Icon = Info;
          let iconColor = 'var(--accent)';
          let progressBg = 'var(--accent)';

          if (toast.type === 'success') {
            Icon = CheckCircle2;
            iconColor = '#10b981'; // emerald-500
            progressBg = '#10b981';
          } else if (toast.type === 'error') {
            Icon = AlertCircle;
            iconColor = '#ef4444'; // red-500
            progressBg = '#ef4444';
          }

          return (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderRadius: '16px',
                padding: '1.2rem',
                boxShadow: 'var(--shadow-premium)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                position: 'relative',
                overflow: 'hidden',
                pointerEvents: 'auto'
              }}
            >
              <div style={{ color: iconColor, flexShrink: 0 }}>
                <Icon size={20} />
              </div>
              <p
                style={{
                  fontSize: '0.88rem',
                  fontWeight: 500,
                  color: 'var(--text-main)',
                  margin: 0,
                  lineHeight: '1.4',
                  flexGrow: 1,
                  paddingRight: '0.5rem'
                }}
              >
                {toast.message}
              </p>
              <button
                onClick={() => removeToast(toast.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0.6,
                  transition: 'opacity 0.2s',
                  padding: '4px'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.6')}
              >
                <X size={14} />
              </button>

              {/* Countdown progress bar */}
              <motion.div
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 4, ease: 'linear' }}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  height: '3px',
                  background: progressBg,
                  borderRadius: '0 0 0 16px'
                }}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default Toast;
