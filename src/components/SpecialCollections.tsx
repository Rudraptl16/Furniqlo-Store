import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import sofaImg from '../assets/serenity_sofa_1777992962262.png';
import chairImg from '../assets/armchair_aura_1777995490497.png';
import bedImg from '../assets/tranquil_bedframe_1777993009387.png';

const collections = {
  'Special Price': [
    { id: 1, image: sofaImg },
    { id: 2, image: chairImg },
    { id: 3, image: bedImg }
  ],
  'New Product': [
    { id: 4, image: bedImg },
    { id: 5, image: sofaImg },
    { id: 6, image: chairImg }
  ],
  'Best Sellers': [
    { id: 7, image: chairImg },
    { id: 8, image: bedImg },
    { id: 9, image: sofaImg }
  ]
};

type TabName = keyof typeof collections;

const SpecialCollections: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabName>('Special Price');

  return (
    <section className="section-padding" style={{ backgroundColor: '#fafafa' }}>
      <div className="container">
        <div className="tabs-header">
          <h2 style={{ fontSize: '3rem' }}>Best Choose Our Furniture</h2>
          <div className="tabs-nav">
            {(Object.keys(collections) as TabName[]).map((tab) => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '4rem', overflow: 'hidden' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="featured-grid"
            >
              {collections[activeTab].map((item) => (
                <div key={item.id} className="product-image-wrapper" style={{ marginBottom: 0 }}>
                  <img src={item.image} alt="Collection Item" className="product-image" />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default SpecialCollections;
