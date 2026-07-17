import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Star, Leaf, Award } from 'lucide-react';

const Hero: React.FC = () => {
  useTranslation();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section className="hero-editorial" ref={ref} style={{ minHeight: '120vh', background: 'var(--bg-main)', color: 'var(--text-main)', position: 'relative', overflow: 'hidden', paddingTop: '100px', transition: 'background-color 0.5s ease' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
        
        {/* Left Column: Content */}
        <motion.div 
          className="hero-content-editorial"
          style={{ y: textY, opacity, zIndex: 10 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.8rem', 
              background: 'rgba(212, 163, 115, 0.1)', 
              padding: '0.5rem 1.2rem', 
              borderRadius: '50px',
              color: 'var(--accent)',
              fontSize: '0.8rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '2rem'
            }}
          >
            <Star size={14} fill="currentColor" />
            <span>The 2026 Editorial Collection</span>
          </motion.div>

          <motion.h1 
            style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', lineHeight: '0.95', marginBottom: '2.5rem', fontFamily: 'var(--font-serif)', color: 'var(--text-main)' }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            Artisanal <br />
            <span className="text-gradient">Integrity</span> <br />
            Modern Soul
          </motion.h1>
          
          <motion.p 
            style={{ fontSize: '1.2rem', marginBottom: '3.5rem', maxWidth: '480px', lineHeight: '1.8', color: 'var(--text-muted)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Beyond furniture, we craft atmospheres. Discover pieces that balance traditional heritage with the bold simplicity of contemporary design.
          </motion.p>
          
          <motion.div 
            style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <button className="btn-primary" style={{ padding: '1.4rem 3.5rem', fontSize: '1rem', borderRadius: '50px', background: 'var(--primary)', color: 'var(--bg-main)', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
              Explore Now <ArrowRight size={18} />
            </button>
            
            <div style={{ display: 'flex', gap: '-10px' }}>
              {[1,2,3].map(i => (
                <div key={i} style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid var(--bg-main)', background: 'var(--bg-tri)', overflow: 'hidden' }}>
                  <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                </div>
              ))}
              <div style={{ marginLeft: '1rem', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ fontWeight: '700' }}>4.8k+</span>
                <span style={{ opacity: 0.5 }}>Happy Clients</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Visuals */}
        <motion.div 
          className="hero-visuals-editorial"
          style={{ y: imageY, position: 'relative' }}
        >
          {/* Main Image Layer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ 
              width: '100%', 
              aspectRatio: '4/5', 
              background: 'var(--bg-tri)', 
              borderRadius: '24px', 
              overflow: 'hidden',
              boxShadow: 'var(--shadow-premium)',
              border: '1px solid var(--border-color)'
            }}
          >
            <img 
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1200" 
              alt="Premium Furniture" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </motion.div>

          {/* Floating Badges */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ 
              position: 'absolute', top: '10%', right: '-10%', 
              background: 'var(--bg-main)', color: 'var(--text-main)', padding: '1.2rem', borderRadius: '20px', 
              boxShadow: 'var(--shadow-premium)',
              border: '1px solid var(--border-color)',
              display: 'flex', alignItems: 'center', gap: '1rem',
              zIndex: 20
            }}
          >
            <div style={{ background: 'rgba(212, 163, 115, 0.1)', padding: '0.8rem', borderRadius: '12px', color: 'var(--accent)' }}>
              <Leaf size={20} />
            </div>
            <div>
              <p style={{ fontSize: '0.8rem', fontWeight: '700', margin: 0 }}>Eco-Certified</p>
              <p style={{ fontSize: '0.6rem', opacity: 0.5, margin: 0 }}>Sustainable Wood</p>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            style={{ 
              position: 'absolute', bottom: '15%', left: '-15%', 
              background: 'var(--primary)', padding: '1.2rem', borderRadius: '20px', 
              boxShadow: 'var(--shadow-premium)',
              display: 'flex', alignItems: 'center', gap: '1rem',
              color: 'var(--bg-main)',
              zIndex: 20
            }}
          >
            <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '0.8rem', borderRadius: '12px' }}>
              <Award size={20} />
            </div>
            <div>
              <p style={{ fontSize: '0.8rem', fontWeight: '700', margin: 0 }}>Global Design Award</p>
              <p style={{ fontSize: '0.6rem', opacity: 0.5, margin: 0 }}>Winner 2026</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Background Decorative Text */}
      <div style={{ position: 'absolute', bottom: '-5%', right: '-5%', fontSize: '20vw', fontWeight: '900', color: 'rgba(0,0,0,0.02)', pointerEvents: 'none', fontFamily: 'var(--font-serif)' }}>
        CRAFT
      </div>
    </section>
  );
};

export default Hero;
