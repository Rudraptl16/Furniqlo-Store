import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    id: 1,
    title: 'Artisanal',
    desc: 'Handcrafted integrity for your home.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800',
    size: 'large'
  },
  {
    id: 2,
    title: 'Modern',
    desc: 'Sleek lines & contemporary soul.',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=800',
    size: 'small'
  },
  {
    id: 3,
    title: 'Minimalist',
    desc: 'Less is more, but better.',
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=800',
    size: 'small'
  },
  {
    id: 4,
    title: 'Vintage',
    desc: 'Timeless stories, classic charm.',
    image: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&q=80&w=800',
    size: 'large'
  }
];

const CategoryShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('All Furniture');

  const tabs = ['All Furniture', 'New Product', 'Best Sellers'];

  return (
    <section className="section-padding" style={{ background: '#fff' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ 
              fontSize: 'clamp(3rem, 6vw, 5rem)', 
              fontFamily: 'var(--font-serif)', 
              lineHeight: '1.1',
              marginBottom: '3rem',
              color: '#1a1a1a'
            }}
          >
            Best Choose Our Furniture
          </motion.h2>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '1.5rem', 
            marginBottom: '4rem',
            alignItems: 'center'
          }}>
            {tabs.map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`category-tab ${activeTab === tab ? 'active' : ''}`}
                style={{}} // Removing inline styles handled by CSS class
              >
                {tab}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="category-bento">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className={`category-tile ${cat.size}`}
              style={{
                position: 'relative',
                borderRadius: '32px',
                overflow: 'hidden',
                cursor: 'pointer',
                height: cat.size === 'large' ? '600px' : '285px'
              }}
            >
              <img 
                src={cat.image} 
                alt={cat.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: '0.8s' }}
                className="category-img"
              />
              
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.6) 100%)',
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                color: '#fff'
              }}>
                <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)' }}>{cat.title}</h3>
                <p style={{ opacity: 0.8, fontSize: '1rem', marginBottom: '1.5rem', maxWidth: '250px' }}>{cat.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>
                  Explore Category <ArrowRight size={16} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .category-bento {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-auto-rows: min-content;
          gap: 30px;
        }
        .category-tile.large {
          grid-row: span 2;
        }
        .category-tile:hover .category-img {
          transform: scale(1.1);
        }
        @media (max-width: 768px) {
          .category-bento {
            grid-template-columns: 1fr;
          }
          .category-tile.large, .category-tile.small {
            height: 400px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default CategoryShowcase;
