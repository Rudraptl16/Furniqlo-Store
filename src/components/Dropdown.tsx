import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface DropdownProps {
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: any) => void;
  style?: React.CSSProperties;
}

const Dropdown: React.FC<DropdownProps> = ({ value, options, onChange, style }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div ref={dropdownRef} style={{ position: 'relative', ...style }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'rgba(0, 0, 0, 0.03)',
          border: '1px solid rgba(0, 0, 0, 0.05)',
          padding: '0.6rem 1.2rem',
          borderRadius: '50px',
          fontSize: '0.8rem',
          fontWeight: '700',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'var(--text-dark)',
          transition: 'all 0.3s'
        }}
      >
        {selectedOption?.label}
        <ChevronDown size={14} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.3s' }} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 5, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#fff',
              borderRadius: '12px',
              padding: '0.5rem',
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
              zIndex: 100,
              minWidth: '100px',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              border: '1px solid #eee'
            }}
          >
            {options.map(opt => (
              <button
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                style={{
                  padding: '0.6rem 1rem',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  fontWeight: value === opt.value ? '700' : '500',
                  background: value === opt.value ? '#f8f8f8' : 'transparent',
                  color: value === opt.value ? 'var(--accent)' : 'inherit',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: '0.2s'
                }}
                className="dropdown-opt-hover"
              >
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
