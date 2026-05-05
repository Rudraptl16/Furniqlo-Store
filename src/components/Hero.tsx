import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import heroImg from '../assets/hero_furniture_sideboard_1777992938434.png';

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section className="hero" ref={ref} style={{ perspective: '1000px' }}>
      <div className="container">
        <motion.div 
          className="hero-content"
          style={{ opacity }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{ color: 'var(--accent)', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem', fontSize: '0.9rem' }}
          >
            New Collection 2026
          </motion.div>

          <motion.h1 
            className="hero-title"
            style={{ fontSize: 'clamp(3.5rem, 8vw, 6rem)', lineHeight: '1.1', marginBottom: '2rem' }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {t('welcome')}
          </motion.h1>
          
          <motion.p 
            className="hero-subtitle"
            style={{ fontSize: '1.2rem', marginBottom: '3rem', maxWidth: '450px' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {t('hero_desc', 'Experience the harmony of traditional craftsmanship and contemporary aesthetics in every piece.')}
          </motion.p>
          
          <motion.div 
            className="hero-actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <button className="btn-primary" style={{ padding: '1.2rem 3.5rem', fontSize: '1rem' }}>
              {t('shop_now')}
            </button>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>4.9/5</span>
              <span style={{ opacity: 0.6, fontSize: '0.8rem' }}>Customer Rating</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div 
        className="hero-image-container"
        style={{ y, rotateY: rotate }}
      >
        <motion.img 
          src={heroImg} 
          alt="Modern Sideboard" 
          className="hero-image"
          initial={{ opacity: 0, scale: 1.1, x: 100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
        
        {/* Floating Decorative Elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: 'absolute', top: '10%', left: '0', width: '60px', height: '60px', border: '1px solid var(--accent)', borderRadius: '50%', opacity: 0.2 }}
        />
        <motion.div
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          style={{ position: 'absolute', bottom: '20%', right: '10%', width: '100px', height: '100px', background: 'var(--accent)', borderRadius: '50%', opacity: 0.05 }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;
