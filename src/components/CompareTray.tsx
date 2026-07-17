import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GitCompare, ArrowRight, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CompareTray: React.FC = () => {
  const { 
    compareList, 
    removeFromCompare, 
    clearCompare, 
    addToCart,
    currency,
    exchangeRate
  } = useCart();

  const [isOpen, setIsOpen] = useState(false);

  if (compareList.length === 0) return null;

  const formatPrice = (price: number) => {
    const symbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '₹';
    return `${symbol}${(price * exchangeRate).toFixed(0)}`;
  };

  const handleAddToCart = (product: any) => {
    addToCart(product);
  };

  return (
    <>
      {/* Floating Tray */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              bottom: '24px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1500,
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              padding: '1rem 2rem',
              borderRadius: '24px',
              boxShadow: 'var(--shadow-premium)',
              display: 'flex',
              alignItems: 'center',
              gap: '2rem',
              maxWidth: '90%',
              width: 'max-content',
              pointerEvents: 'auto'
            }}
          >
            {/* Header / Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexShrink: 0 }}>
              <GitCompare size={20} color="var(--accent)" />
              <div>
                <p style={{ margin: 0, fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-main)' }}>Compare Products</p>
                <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>{compareList.length} of 3 selected</p>
              </div>
            </div>

            {/* Product Thumbnails */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              {compareList.map((item) => (
                <div 
                  key={item.id}
                  style={{
                    position: 'relative',
                    width: '56px',
                    height: '56px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-sec)'
                  }}
                >
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                  <button
                    onClick={() => removeFromCompare(item.id)}
                    style={{
                      position: 'absolute',
                      top: '2px',
                      right: '2px',
                      background: 'rgba(0,0,0,0.5)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '50%',
                      width: '16px',
                      height: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <X size={10} />
                  </button>
                </div>
              ))}
              
              {/* Placeholders */}
              {[...Array(3 - compareList.length)].map((_, idx) => (
                <div
                  key={idx}
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '12px',
                    border: '2px dashed var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-muted)',
                    fontSize: '0.8rem',
                    opacity: 0.4
                  }}
                >
                  +
                </div>
              ))}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
              <button
                onClick={clearCompare}
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  cursor: 'pointer'
                }}
              >
                Clear
              </button>
              
              <button
                onClick={() => setIsOpen(true)}
                disabled={compareList.length < 2}
                style={{
                  background: compareList.length >= 2 ? 'var(--primary)' : 'rgba(0,0,0,0.05)',
                  color: compareList.length >= 2 ? 'var(--bg-main)' : 'var(--text-muted)',
                  padding: '0.6rem 1.2rem',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  cursor: compareList.length >= 2 ? 'pointer' : 'not-allowed',
                  transition: 'all 0.3s'
                }}
              >
                <span>Compare Now</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comparison Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.4)',
                backdropFilter: 'blur(8px)',
                zIndex: 2100
              }}
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              style={{
                position: 'fixed',
                top: '5%',
                left: '5%',
                right: '5%',
                bottom: '5%',
                background: 'var(--bg-main)',
                color: 'var(--text-main)',
                borderRadius: '24px',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-premium)',
                zIndex: 2101,
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <GitCompare size={24} color="var(--accent)" />
                  <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)' }}>Compare Products</h2>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  style={{ color: 'var(--text-main)', cursor: 'pointer' }}
                >
                  <X size={24} />
                </button>
              </div>

              {/* Table Body (Scrollable) */}
              <div style={{ flex: 1, overflow: 'auto', paddingRight: '0.5rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <th style={{ ...thStyle, width: '20%' }}>Spec</th>
                      {compareList.map((product) => (
                        <th key={product.id} style={{ ...thStyle, width: `${80 / compareList.length}%`, textAlign: 'center' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem' }}>
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '12px', boxShadow: 'var(--shadow-glass)' }} 
                            />
                            <div>
                              <h4 style={{ fontSize: '1rem', fontFamily: 'var(--font-sans)', fontWeight: 700, margin: 0 }}>{product.name}</h4>
                              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.2rem 0 0 0' }}>{product.brand || 'Furniqlo'}</p>
                            </div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={rowStyle}>
                      <td style={labelStyle}>Price</td>
                      {compareList.map((product) => (
                        <td key={product.id} style={valueStyle}>{formatPrice(product.price)}</td>
                      ))}
                    </tr>
                    <tr style={rowStyle}>
                      <td style={labelStyle}>Category</td>
                      {compareList.map((product) => (
                        <td key={product.id} style={valueStyle}>{product.category}</td>
                      ))}
                    </tr>
                    <tr style={rowStyle}>
                      <td style={labelStyle}>Rating</td>
                      {compareList.map((product) => (
                        <td key={product.id} style={valueStyle}>
                          {product.rating ? `${product.rating} / 5 (${product.reviews || 0} reviews)` : 'Not Rated'}
                        </td>
                      ))}
                    </tr>
                    <tr style={rowStyle}>
                      <td style={labelStyle}>Material</td>
                      {compareList.map((product) => (
                        <td key={product.id} style={valueStyle}>{product.specs?.Material || 'N/A'}</td>
                      ))}
                    </tr>
                    <tr style={rowStyle}>
                      <td style={labelStyle}>Dimensions</td>
                      {compareList.map((product) => (
                        <td key={product.id} style={valueStyle}>{product.specs?.Dimensions || 'N/A'}</td>
                      ))}
                    </tr>
                    <tr style={rowStyle}>
                      <td style={labelStyle}>Weight</td>
                      {compareList.map((product) => (
                        <td key={product.id} style={valueStyle}>{product.specs?.Weight || 'N/A'}</td>
                      ))}
                    </tr>
                    <tr style={rowStyle}>
                      <td style={labelStyle}>Key Features</td>
                      {compareList.map((product) => (
                        <td key={product.id} style={valueStyle}>
                          <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.3rem', alignItems: 'center' }}>
                            {product.features?.map((f: string, i: number) => (
                              <li key={i} style={{ fontSize: '0.8rem', opacity: 0.8 }}>• {f}</li>
                            )) || <li style={{ opacity: 0.5 }}>-</li>}
                          </ul>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td style={labelStyle}></td>
                      {compareList.map((product) => (
                        <td key={product.id} style={{ ...valueStyle, paddingTop: '2rem' }}>
                          <button
                            onClick={() => handleAddToCart(product)}
                            style={{
                              background: 'var(--primary)',
                              color: 'var(--bg-main)',
                              padding: '0.8rem 1.5rem',
                              borderRadius: '12px',
                              fontSize: '0.85rem',
                              fontWeight: 700,
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              cursor: 'pointer'
                            }}
                          >
                            <ShoppingCart size={14} /> Add to Cart
                          </button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const thStyle = { padding: '1rem', fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.9rem', borderBottom: '1px solid var(--border-color)' };
const rowStyle = { borderBottom: '1px solid var(--border-color)' };
const labelStyle = { padding: '1.2rem 1rem', fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-main)', textTransform: 'uppercase' as const, letterSpacing: '0.5px' };
const valueStyle = { padding: '1.2rem 1rem', fontSize: '0.9rem', color: 'var(--text-main)', textAlign: 'center' as const };

export default CompareTray;
