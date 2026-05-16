import React from 'react';
import { motion } from 'framer-motion';

const BrandStory: React.FC = () => {
  return (
    <section className="section-padding" style={{ background: '#f9f7f2', overflow: 'hidden' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '6rem', alignItems: 'center' }}>
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 style={{ fontSize: '3.5rem', marginBottom: '2rem', fontFamily: 'var(--font-serif)' }}>Our Story of <br /> <span className="text-gradient">Pure Integrity</span></h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', marginBottom: '2rem' }}>
              Founded in 2026, Furniqlo was born out of a desire to bring back the "Art of Living". We believe that your home is a reflection of your soul, and every piece of furniture should tell a story of craftsmanship, sustainability, and timeless design.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
              Our artisans blend ancient woodworking techniques with modern ergonomics to create pieces that aren't just beautiful to look at, but a joy to live with.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            style={{ position: 'relative' }}
          >
            <div style={{ 
              borderRadius: '32px', 
              overflow: 'hidden', 
              aspectRatio: '4/3',
              boxShadow: '0 30px 60px rgba(0,0,0,0.1)'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200" 
                alt="Craftsmanship" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            
            {/* Overlay Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              style={{
                position: 'absolute',
                bottom: '-2rem',
                right: '2rem',
                background: '#1a1a1a',
                color: '#fff',
                padding: '2rem',
                borderRadius: '20px',
                maxWidth: '250px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
              }}
            >
              <p style={{ fontSize: '1.5rem', fontWeight: '800', margin: 0, color: 'var(--accent)' }}>100%</p>
              <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>Hand-finished in our local artisanal workshop.</p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default BrandStory;
