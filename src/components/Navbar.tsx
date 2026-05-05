import React, { useState, useEffect } from 'react';
import { Menu, Search, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTranslation } from 'react-i18next';
import MobileMenu from './MobileMenu';
import Dropdown from './Dropdown';

const Navbar: React.FC = () => {
  const { i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { totalItems, setIsCartOpen, searchQuery, setSearchQuery, currency, setCurrency } = useCart();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

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
            <select 
              value={i18n.language} 
              onChange={(e) => changeLanguage(e.target.value)}
              style={{ background: 'none', border: 'none', fontSize: '0.8rem', opacity: 0.6 }}
            >
              <option value="en">EN</option>
              <option value="hi">HI</option>
            </select>

            <select 
              value={currency} 
              onChange={(e) => setCurrency(e.target.value as any)}
              style={{ background: 'none', border: 'none', fontSize: '0.8rem', opacity: 0.6 }}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="INR">INR</option>
            </select>

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
