import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: "Where is your furniture manufactured?",
    a: "Our signature pieces are designed in our California studio and handcrafted in partnership with family-run workshops in the USA, Italy, and Japan. We work exclusively with master builders who share our commitment to architectural details and heritage carpentry."
  },
  {
    q: "What is included in your White Glove Delivery service?",
    a: "Our complimentary White Glove Delivery (free on orders over $500) includes shipping, in-room placement in your room of choice, complete unpacking and structural assembly, and clean-up. Our delivery team will also remove all packaging boxes and materials so your space is immediately ready for living."
  },
  {
    q: "Can I order custom sizes or source my own fabrics?",
    a: "Yes! While our online configurator offers pre-selected oak/walnut and boucle/velvet combinations, our custom studio builds bespoke sizes. If you want to use custom dimensions or COM (Customer's Own Material) fabrics, please book a virtual styling session using our Booking portal above."
  },
  {
    q: "What is your product warranty and returns policy?",
    a: "We offer a 10-year structural warranty on all timber frames, springs, and joinery, testifying to our craftsmanship. We also offer a 30-day return policy for standard catalog items in original condition. Please note that custom configurations are built-to-order and cannot be refunded once construction begins."
  },
  {
    q: "Are the wood and upholstery fabrics eco-certified?",
    a: "Every piece of oak, ash, and walnut we use is certified by the Forest Stewardship Council (FSC), ensuring it is harvested from responsibly managed forests. Our premium boucle, cotton, and linen fabric lines are certified by OEKO-TEX® to be free of harmful chemical retardants and compounds."
  }
];

const FaqSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    // Inject FAQ Schema.org JSON-LD dynamically into the document
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': FAQS.map((faq) => ({
        '@type': 'Question',
        'name': faq.q,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.a
        }
      }))
    };

    const existingFaqScript = document.getElementById('furniqlo-seo-faq');
    if (existingFaqScript) {
      existingFaqScript.remove();
    }

    const script = document.createElement('script');
    script.id = 'furniqlo-seo-faq';
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(faqSchema);
    document.body.appendChild(script);

    return () => {
      if (script) script.remove();
    };
  }, []);

  const toggleFaq = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section 
      className="section-padding faq-section" 
      id="faq" 
      style={{ background: 'var(--bg-main)', borderBottom: '1px solid var(--border-color)' }}
    >
      <div className="container" style={{ maxWidth: '900px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span style={{ 
            fontSize: '0.8rem', 
            fontWeight: '700', 
            textTransform: 'uppercase', 
            color: 'var(--accent)', 
            letterSpacing: '2px', 
            display: 'block', 
            marginBottom: '1rem' 
          }}>
            FAQ
          </span>
          <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontFamily: 'var(--font-serif)', color: 'var(--text-main)', marginBottom: '1.5rem' }}>
            Frequently Asked Questions
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Everything you need to know about our materials, customization services, delivery logistics, and craftsmanship standards.
          </p>
        </div>

        {/* Accordion Wrapper */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {FAQS.map((faq, idx) => {
            const isOpen = activeIndex === idx;

            return (
              <div 
                key={idx}
                style={{
                  background: 'var(--bg-sec)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  transition: 'all 0.3s'
                }}
              >
                {/* Accordion Trigger Header */}
                <button
                  onClick={() => toggleFaq(idx)}
                  style={{
                    width: '100%',
                    padding: '1.5rem 2rem',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    color: 'var(--text-main)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <HelpCircle size={18} color="var(--accent)" style={{ flexShrink: 0 }} />
                    <span style={{ fontWeight: 700, fontSize: '1rem', lineHeight: '1.4' }}>{faq.q}</span>
                  </div>
                  <ChevronDown 
                    size={18} 
                    style={{ 
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', 
                      transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      color: 'var(--text-muted)',
                      flexShrink: 0
                    }} 
                  />
                </button>

                {/* Collapsible Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div 
                        style={{ 
                          padding: '0 2rem 1.8rem 3.8rem', 
                          color: 'var(--text-muted)', 
                          fontSize: '0.92rem', 
                          lineHeight: '1.7',
                          borderTop: '1px solid var(--border-color)',
                          paddingTop: '1rem'
                        }}
                      >
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FaqSection;
