import React from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

const Newsletter: React.FC = () => {
  return (
    <section className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Decorative Blur Background */}
      <div style={{ 
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '600px', height: '600px', background: 'var(--accent)', filter: 'blur(150px)',
        opacity: 0.1, zIndex: 0, borderRadius: '50%'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            background: 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            borderRadius: '40px',
            padding: '6rem 4rem',
            textAlign: 'center',
            maxWidth: '1000px',
            margin: '0 auto',
            boxShadow: '0 40px 100px rgba(0,0,0,0.05)'
          }}
        >
          <h2 style={{ fontSize: '3.5rem', fontFamily: 'var(--font-serif)', marginBottom: '1.5rem' }}>Join the <span className="text-gradient">Inner Circle</span></h2>
          <p style={{ maxWidth: '500px', margin: '0 auto 3rem', color: '#555', fontSize: '1.1rem' }}>
            Get early access to new collections, editorial styling tips, and exclusive seasonal offers.
          </p>

          <form style={{ 
            maxWidth: '500px', 
            margin: '0 auto', 
            display: 'flex', 
            gap: '1rem',
            padding: '0.5rem',
            background: '#fff',
            borderRadius: '50px',
            border: '1px solid #eee',
            boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
          }} onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your email address" 
              style={{ 
                flex: 1, border: 'none', padding: '0 2rem', outline: 'none', 
                fontSize: '1rem', borderRadius: '50px' 
              }} 
            />
            <button style={{ 
              background: '#1a1a1a', color: '#fff', width: '50px', height: '50px', 
              borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 0.3s'
            }} className="newsletter-btn-hover">
              <Send size={20} />
            </button>
          </form>

          <p style={{ marginTop: '2rem', fontSize: '0.8rem', opacity: 0.5 }}>By subscribing, you agree to our Privacy Policy and Terms of Service.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
