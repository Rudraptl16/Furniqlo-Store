import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTranslation } from 'react-i18next';

const Navbar: React.FC = () => {
  useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { totalItems, setIsCartOpen, searchQuery, setSearchQuery } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Simple section tracking
      const sections = ['home', 'shop', 'reviews', 'about'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Shop', id: 'shop' },
    { label: 'Reviews', id: 'reviews' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' }
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled glass' : ''}`}>
      <div className="container nav-container">
        <div
          className="logo"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            cursor: 'pointer',
            fontSize: scrolled ? '1.5rem' : '1.8rem',
            transition: 'var(--transition)'
          }}
        >
          Furniqlo<span className="text-accent" style={{ color: 'var(--accent)' }}>.</span>
        </div>

        <div className="search-wrapper" style={{ flex: 1, maxWidth: '400px', margin: '0 3rem', position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} />
          <input
            type="text"
            placeholder="Search premium furniture..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.8rem 1rem 0.8rem 3.2rem',
              borderRadius: '50px',
              border: '1px solid rgba(0,0,0,0.05)',
              background: scrolled ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.8)',
              fontSize: '0.9rem',
              outline: 'none',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
            }}
          />
        </div>

        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                style={{
                  position: 'relative',
                  color: activeSection === item.id ? 'var(--accent)' : 'inherit'
                }}
              >
                {item.label}
                {activeSection === item.id && (
                  <span style={{
                    position: 'absolute',
                    bottom: '-5px',
                    left: '0',
                    width: '100%',
                    height: '2px',
                    background: 'var(--accent)'
                  }} />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button className="cart-btn" onClick={() => setIsCartOpen(true)} style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer' }}>
            <ShoppingCart size={22} />
            {totalItems > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-10px',
                background: 'var(--accent)',
                color: '#fff',
                fontSize: '0.7rem',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700'
              }}>
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
