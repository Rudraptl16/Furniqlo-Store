import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe, Phone, Mail } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const menuItems = ['Shop', 'Reviews', 'About', 'Contact'];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#fff',
            zIndex: 4000,
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
            <div className="logo">Furniqlo</div>
            <button onClick={onClose}>
              <X size={28} />
            </button>
          </div>

          <nav style={{ flex: 1 }}>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {menuItems.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    onClick={onClose}
                    style={{ fontSize: '3rem', fontFamily: 'var(--font-serif)', fontWeight: '600' }}
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>

          <div style={{ display: 'flex', gap: '2rem', marginTop: 'auto', paddingBottom: '2rem' }}>
            <Globe size={24} />
            <Phone size={24} />
            <Mail size={24} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
