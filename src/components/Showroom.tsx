import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { Plus, ShoppingBag, ArrowUpRight } from 'lucide-react';

interface Hotspot {
  productId: number;
  top: string;
  left: string;
  name: string;
}

const HOTSPOTS: Hotspot[] = [
  { productId: 1, top: '48%', left: '16%', name: 'Aurelius Oak Sideboard' },
  { productId: 2, top: '65%', left: '55%', name: 'Minimalist Cloud Sofa' },
  { productId: 3, top: '78%', left: '38%', name: 'Zenith Glass Coffee Table' },
  { productId: 5, top: '35%', left: '72%', name: 'Lumière Floor Lamp' }
];

const Showroom: React.FC = () => {
  const { addToCart, setSelectedProduct, currency, exchangeRate } = useCart();
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  const formatPrice = (price: number) => {
    const symbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '₹';
    return `${symbol}${(price * exchangeRate).toFixed(0)}`;
  };

  const handleHotspotClick = (hotspot: Hotspot) => {
    if (activeHotspot?.productId === hotspot.productId) {
      setActiveHotspot(null);
    } else {
      setActiveHotspot(hotspot);
    }
  };

  const getProduct = (id: number) => products.find((p) => p.id === id);

  return (
    <section 
      className="section-padding showroom-section" 
      id="showroom"
      style={{ background: 'var(--bg-sec)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}
    >
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ 
            fontSize: '0.8rem', 
            fontWeight: '700', 
            textTransform: 'uppercase', 
            color: 'var(--accent)', 
            letterSpacing: '2px', 
            display: 'block', 
            marginBottom: '1rem' 
          }}>
            Virtual Tour
          </span>
          <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontFamily: 'var(--font-serif)', color: 'var(--text-main)', marginBottom: '1.5rem' }}>
            Explore Our Curated Space
          </h2>
          <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Interact directly with our signature pieces inside a modern architectural layout. Click the pulsing hotspots to reveal artisanal details.
          </p>
        </div>

        {/* Showroom Interactive Box */}
        <div 
          style={{
            position: 'relative',
            width: '100%',
            borderRadius: '24px',
            overflow: 'hidden',
            aspectRatio: '16/9',
            boxShadow: 'var(--shadow-premium)',
            background: 'var(--bg-tri)'
          }}
        >
          {/* Background Image */}
          <img 
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1600" 
            alt="Furniqlo Stylized Showroom Room" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          {/* Hotspots */}
          {HOTSPOTS.map((hotspot) => {
            const product = getProduct(hotspot.productId);
            if (!product) return null;

            const isActive = activeHotspot?.productId === hotspot.productId;

            return (
              <React.Fragment key={hotspot.productId}>
                {/* Hotspot Indicator */}
                <button
                  onClick={() => handleHotspotClick(hotspot)}
                  style={{
                    position: 'absolute',
                    top: hotspot.top,
                    left: hotspot.left,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10,
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: isActive ? '#fff' : 'var(--accent)',
                    color: isActive ? 'var(--primary)' : '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                    border: '2px solid #fff',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  <Plus 
                    size={16} 
                    style={{ 
                      transform: isActive ? 'rotate(45deg)' : 'none', 
                      transition: 'transform 0.3s ease' 
                    }} 
                  />

                  {/* Pulsing ring animation */}
                  {!isActive && (
                    <span 
                      style={{
                        position: 'absolute',
                        inset: '-6px',
                        border: '2px solid var(--accent)',
                        borderRadius: '50%',
                        animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
                        opacity: 0.75,
                        pointerEvents: 'none'
                      }}
                    />
                  )}
                </button>

                {/* Hotspot Hover Card */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 10 }}
                      transition={{ duration: 0.25 }}
                      style={{
                        position: 'absolute',
                        top: `calc(${hotspot.top} - 160px)`, // Position card above the hotspot
                        left: hotspot.left,
                        transform: 'translateX(-50%)',
                        zIndex: 20,
                        background: 'rgba(255, 255, 255, 0.92)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255, 255, 255, 0.6)',
                        borderRadius: '16px',
                        padding: '1rem',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                        width: '240px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.8rem',
                        color: '#1a1a1a'
                      }}
                    >
                      <div style={{ display: 'flex', gap: '0.8rem' }}>
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} 
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h4 style={{ fontSize: '0.88rem', fontWeight: 700, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {product.name}
                          </h4>
                          <p style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 700, margin: '0.2rem 0' }}>
                            {formatPrice(product.price)}
                          </p>
                          <p style={{ fontSize: '0.75rem', opacity: 0.6, margin: 0 }}>{product.category}</p>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '0.8rem' }}>
                        <button
                          onClick={() => { addToCart(product); setActiveHotspot(null); }}
                          style={{
                            flex: 1,
                            background: '#1a1a1a',
                            color: '#fff',
                            borderRadius: '8px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.4rem',
                            padding: '0.5rem 0',
                            cursor: 'pointer'
                          }}
                        >
                          <ShoppingBag size={12} /> Add
                        </button>
                        
                        <button
                          onClick={() => { setSelectedProduct(product); setActiveHotspot(null); }}
                          style={{
                            flex: 1,
                            background: '#fff',
                            color: '#1a1a1a',
                            borderRadius: '8px',
                            border: '1px solid rgba(0,0,0,0.1)',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.3rem',
                            padding: '0.5rem 0',
                            cursor: 'pointer'
                          }}
                        >
                          <span>Details</span>
                          <ArrowUpRight size={12} />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        @media (max-width: 768px) {
          .showroom-section .container > div:last-child {
            aspect-ratio: 4/3 !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Showroom;
