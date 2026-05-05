import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { useCart } from '../context/CartContext';
import MobileMenu from './MobileMenu';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { totalItems, setIsCartOpen } = useCart();

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
