import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Sparkles, ShoppingBag, Check } from 'lucide-react';

const WOODS = [
  { id: 'oak', name: 'Sustain Oak', color: '#e6c8a8', price: 0, desc: 'Light, clean-grained sustainable white oak' },
  { id: 'walnut', name: 'Royal Walnut', color: '#5c4033', price: 150, desc: 'Deep, rich American black walnut' },
  { id: 'charcoal', name: 'Charcoal Ash', color: '#2b2b2b', price: 100, desc: 'Sleek, textured dark carbonized ash' }
];

const FABRICS = [
  { id: 'boucle', name: 'Boucle Cream', color: '#f3ece0', price: 0, desc: 'Cozy, highly-textured organic cotton boucle' },
  { id: 'velvet', name: 'Forest Velvet', color: '#1b4d3e', price: 120, desc: 'Dense, luxurious matte velvet' },
  { id: 'leather', name: 'Cognac Leather', color: '#b87333', price: 240, desc: 'Top-grain aniline Italian leather' }
];

// Mapping for images
const IMAGE_MAP: Record<string, string> = {
  'oak-boucle': 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=800',
  'oak-velvet': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800',
  'oak-leather': 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800',
  'walnut-boucle': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800',
  'walnut-velvet': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
  'walnut-leather': 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=800',
  'charcoal-boucle': 'https://images.unsplash.com/photo-1505797149-35ebcb05a6fd?auto=format&fit=crop&q=80&w=800',
  'charcoal-velvet': 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&q=80&w=800',
  'charcoal-leather': 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&q=80&w=800',
};

const InteractiveVisualizer: React.FC = () => {
  const { addToCart, setIsCartOpen, currency, exchangeRate } = useCart();
  const [selectedWood, setSelectedWood] = useState(WOODS[0]);
  const [selectedFabric, setSelectedFabric] = useState(FABRICS[0]);
  const [added, setAdded] = useState(false);

  const basePrice = 650;
  const totalPrice = basePrice + selectedWood.price + selectedFabric.price;

  const formatPrice = (price: number) => {
    const symbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '₹';
    return `${symbol}${(price * exchangeRate).toFixed(0)}`;
  };

  const currentCombinationKey = `${selectedWood.id}-${selectedFabric.id}`;
  const displayImage = IMAGE_MAP[currentCombinationKey] || IMAGE_MAP['oak-boucle'];

  const handleAddToCart = () => {
    const customProduct = {
      id: 9999 + Date.now(), // Unique ID
      name: `Aurelius Custom Chair (${selectedWood.name} / ${selectedFabric.name})`,
      price: totalPrice,
      image: displayImage,
      category: 'Artisanal',
      brand: 'Furniqlo Custom Studio',
      specs: {
        'Wood Frame': selectedWood.name,
        'Upholstery': selectedFabric.name,
        'Lead Time': '4-6 weeks'
      }
    };
    addToCart(customProduct);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setIsCartOpen(true);
    }, 1200);
  };

  return (
    <section className="section-padding visualizer-section" style={{ background: '#fcfcfc', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.6rem', 
              background: 'rgba(212, 163, 115, 0.1)', 
              padding: '0.4rem 1.2rem', 
              borderRadius: '50px',
              color: 'var(--accent)',
              fontSize: '0.8rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '1.5rem'
            }}
          >
            <Sparkles size={13} />
            <span>Furniqlo Atelier</span>
          </motion.div>
          
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: 'var(--font-serif)', lineHeight: '1.1', color: '#1a1a1a', marginBottom: '1.5rem' }}>
            Design Your Own Masterpiece
          </h2>
          <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-light)', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Choose from sustainably harvested premium hardwoods and artisanal fabric blends to configure a bespoke lounge chair tailored to your layout.
          </p>
        </div>

        {/* Configurator Grid */}
        <div className="visualizer-grid">
          
          {/* Left Column: Visual Showcase */}
          <div className="visualizer-display">
            <div className="visualizer-image-box">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentCombinationKey}
                  src={displayImage}
                  alt="Custom Furniture Preview"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.4 }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </AnimatePresence>
            </div>
            
            {/* Live Specs Card */}
            <div className="visualizer-spec-card">
              <div>
                <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.5 }}>Selected Frame</p>
                <p style={{ fontWeight: '600', fontSize: '0.95rem' }}>{selectedWood.name}</p>
              </div>
              <div style={{ borderLeft: '1px solid rgba(0,0,0,0.1)', paddingLeft: '1.5rem' }}>
                <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.5 }}>Upholstery</p>
                <p style={{ fontWeight: '600', fontSize: '0.95rem' }}>{selectedFabric.name}</p>
              </div>
              <div style={{ borderLeft: '1px solid rgba(0,0,0,0.1)', paddingLeft: '1.5rem' }}>
                <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.5 }}>Estimated Delivery</p>
                <p style={{ fontWeight: '600', fontSize: '0.95rem', color: 'var(--accent)' }}>4-6 Weeks</p>
              </div>
            </div>
          </div>

          {/* Right Column: Customization Controls */}
          <div className="visualizer-controls">
            
            {/* Wood Selector */}
            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', marginBottom: '0.5rem', color: '#1a1a1a' }}>1. Frame Hardwood</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '1.5rem' }}>{selectedWood.desc}</p>
              
              <div style={{ display: 'flex', gap: '1.2rem' }}>
                {WOODS.map(wood => (
                  <button
                    key={wood.id}
                    onClick={() => setSelectedWood(wood)}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.8rem',
                      padding: '1rem',
                      borderRadius: '16px',
                      border: selectedWood.id === wood.id ? '2px solid #1a1a1a' : '1px solid rgba(0,0,0,0.1)',
                      background: '#fff',
                      boxShadow: selectedWood.id === wood.id ? '0 10px 25px rgba(0,0,0,0.05)' : 'none',
                      textAlign: 'left',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      cursor: 'pointer'
                    }}
                  >
                    <span 
                      style={{ 
                        width: '24px', 
                        height: '24px', 
                        borderRadius: '50%', 
                        background: wood.color,
                        border: '1px solid rgba(0,0,0,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {selectedWood.id === wood.id && <Check size={12} color="#fff" style={{ mixBlendMode: 'difference' }} />}
                    </span>
                    <div>
                      <p style={{ fontSize: '0.85rem', fontWeight: '700', margin: 0 }}>{wood.name}</p>
                      <p style={{ fontSize: '0.75rem', opacity: 0.6, margin: 0 }}>
                        {wood.price === 0 ? 'Included' : `+${formatPrice(wood.price)}`}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Fabric Selector */}
            <div style={{ marginBottom: '4rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', marginBottom: '0.5rem', color: '#1a1a1a' }}>2. Premium Upholstery</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '1.5rem' }}>{selectedFabric.desc}</p>
              
              <div style={{ display: 'flex', gap: '1.2rem' }}>
                {FABRICS.map(fabric => (
                  <button
                    key={fabric.id}
                    onClick={() => setSelectedFabric(fabric)}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.8rem',
                      padding: '1rem',
                      borderRadius: '16px',
                      border: selectedFabric.id === fabric.id ? '2px solid #1a1a1a' : '1px solid rgba(0,0,0,0.1)',
                      background: '#fff',
                      boxShadow: selectedFabric.id === fabric.id ? '0 10px 25px rgba(0,0,0,0.05)' : 'none',
                      textAlign: 'left',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      cursor: 'pointer'
                    }}
                  >
                    <span 
                      style={{ 
                        width: '24px', 
                        height: '24px', 
                        borderRadius: '50%', 
                        background: fabric.color,
                        border: '1px solid rgba(0,0,0,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {selectedFabric.id === fabric.id && <Check size={12} color="#fff" style={{ mixBlendMode: 'difference' }} />}
                    </span>
                    <div>
                      <p style={{ fontSize: '0.85rem', fontWeight: '700', margin: 0 }}>{fabric.name}</p>
                      <p style={{ fontSize: '0.75rem', opacity: 0.6, margin: 0 }}>
                        {fabric.price === 0 ? 'Included' : `+${formatPrice(fabric.price)}`}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Checkout Pricing Panel */}
            <div style={{
              background: 'var(--primary)',
              color: '#fff',
              padding: '2.5rem',
              borderRadius: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              boxShadow: '0 20px 45px rgba(0,0,0,0.15)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <h4 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', margin: 0 }}>Your Bespoke Config</h4>
                  <p style={{ fontSize: '0.8rem', opacity: 0.6, margin: '0.2rem 0 0 0' }}>Crafted on demand in California</p>
                </div>
                <div style={{ fontSize: '2rem', fontWeight: '700' }}>
                  {formatPrice(totalPrice)}
                </div>
              </div>
              
              <button
                onClick={handleAddToCart}
                disabled={added}
                style={{
                  width: '100%',
                  background: added ? 'var(--accent)' : '#fff',
                  color: added ? '#fff' : 'var(--primary)',
                  padding: '1.2rem',
                  borderRadius: '12px',
                  fontWeight: '700',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.8rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                {added ? (
                  <>
                    <Check size={18} /> Config Added!
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} /> Order Custom Build
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>

      <style>{`
        .visualizer-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 5rem;
          align-items: flex-start;
        }
        .visualizer-display {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .visualizer-image-box {
          width: 100%;
          aspect-ratio: 4/3;
          background: #f8f8f8;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: var(--shadow-premium);
        }
        .visualizer-spec-card {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          background: #fff;
          padding: 1.5rem 2rem;
          border-radius: 16px;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: var(--shadow-glass);
        }
        .visualizer-controls {
          display: flex;
          flex-direction: column;
        }
        
        @media (max-width: 992px) {
          .visualizer-grid {
            grid-template-columns: 1fr;
            gap: 4rem;
          }
        }
        
        @media (max-width: 576px) {
          .visualizer-controls button {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 0.5rem !important;
          }
          .visualizer-spec-card {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .visualizer-spec-card div {
            border-left: none !important;
            padding-left: 0 !important;
          }
        }
      `}</style>
    </section>
  );
};

export default InteractiveVisualizer;
