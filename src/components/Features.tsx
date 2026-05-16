import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Recycle, Award } from 'lucide-react';

const featureList = [
  {
    icon: ShieldCheck,
    title: "10 Year Warranty",
    desc: "Built to last generations with premium materials and construction."
  },
  {
    icon: Truck,
    title: "White Glove Delivery",
    desc: "Free professional assembly and placement in your room of choice."
  },
  {
    icon: Recycle,
    title: "Sustainable Sourcing",
    desc: "Every piece of wood is FSC certified and sustainably harvested."
  },
  {
    icon: Award,
    title: "Award Winning Design",
    desc: "Recognized globally for our fusion of form and function."
  }
];

const Features: React.FC = () => {
  return (
    <section className="section-padding">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ fontSize: '3rem', fontFamily: 'var(--font-serif)', marginBottom: '1.5rem' }}>The Furniqlo <span className="text-gradient">Standard</span></h2>
          <p style={{ maxWidth: '600px', margin: '0 auto', color: '#555' }}>We don't just sell furniture; we provide a lifetime of comfort and peace of mind through our uncompromising standards.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
          {featureList.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              style={{
                padding: '3rem 2rem',
                borderRadius: '24px',
                background: '#fcfcfc',
                border: '1px solid #eee',
                textAlign: 'center',
                transition: 'all 0.3s'
              }}
              whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}
            >
              <div style={{ 
                width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(212, 163, 115, 0.1)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem',
                color: 'var(--accent)'
              }}>
                <feature.icon size={28} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', fontFamily: 'var(--font-sans)', fontWeight: '700' }}>{feature.title}</h3>
              <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: '1.6' }}>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
