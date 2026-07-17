import React from 'react';
import { motion } from 'framer-motion';
import shelfImg from '../assets/wooden_bookshelf_1777999487629.png';

const Craftsmanship: React.FC = () => {
  return (
    <section className="section-padding" style={{ background: 'var(--primary)', color: 'var(--bg-main)', overflow: 'hidden', transition: 'background-color 0.5s ease' }}>
      <div className="container">
        <div className="craftsmanship-grid" style={{ gap: '6rem', alignItems: 'center' }}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span style={{ color: 'var(--accent)', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1.5rem', display: 'block' }}>
              The Art of Making
            </span>
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '2rem', lineHeight: '1.2' }}>
              Crafted with Precision, <br /> Born from Nature.
            </h2>
            <p style={{ opacity: 0.7, fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '3rem', maxWidth: '500px' }}>
              Every piece in our collection is a testament to the beauty of natural materials. 
              Our master artisans combine centuries-old techniques with modern engineering 
              to create furniture that isn't just functional—it's an heirloom.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
              <div>
                <h4 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>100%</h4>
                <p style={{ opacity: 0.5, fontSize: '0.9rem' }}>Sustainably Sourced Wood</p>
              </div>
              <div>
                <h4 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>25 Years</h4>
                <p style={{ opacity: 0.5, fontSize: '0.9rem' }}>Craftmanship Warranty</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="craft-image-wrapper"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'relative' }}
          >
            <div style={{ 
              position: 'absolute', 
              inset: '-20px', 
              border: '1px solid rgba(184, 157, 126, 0.3)', 
              zIndex: 0,
              borderRadius: '20px'
            }} />
            <img 
              src={shelfImg} 
              alt="Craftsmanship" 
              style={{ width: '100%', height: 'auto', borderRadius: '20px', position: 'relative', zIndex: 1, boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }} 
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Craftsmanship;
