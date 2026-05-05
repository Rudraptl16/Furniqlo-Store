import React, { useState, useEffect } from 'react';
import { Menu, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import MobileMenu from './MobileMenu';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <div className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ cursor: 'pointer' }}>
            Furniqlo
          </div>

          <div className="search-wrapper" style={{ flex: 1, maxWidth: '300px', margin: '0 2rem', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} />
            <input 
              type="text" 
              placeholder="Search furniture..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.6rem 1rem 0.6rem 2.8rem',
                borderRadius: '50px',
                border: '1px solid #eee',
                background: scrolled ? '#f8f8f8' : '#fff',
                fontSize: '0.9rem',
                outline: 'none',
                transition: 'all 0.3s'
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
            <button className="cart-btn" onClick={() => setIsCartOpen(true)}>
              Cart ({totalItems})
            </button>
            <button className="menu-toggle" onClick={() => setMobileMenuOpen(true)}>
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
};

export default Navbar;
