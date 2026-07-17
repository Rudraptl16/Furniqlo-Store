import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Menu, Heart, Sun, Moon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTranslation } from 'react-i18next';
import MobileMenu from './MobileMenu';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  
  const { 
    totalItems, 
    setIsCartOpen, 
    searchQuery, 
    setSearchQuery,
    wishlist,
    setIsWishlistOpen,
    theme,
    toggleTheme,
    currency,
    setCurrency
  } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['home', 'shop', 'showroom', 'quiz', 'booking', 'faq', 'reviews', 'about'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
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
    { label: 'Showroom', id: 'showroom' },
    { label: 'Style Quiz', id: 'quiz' },
    { label: 'Consultation', id: 'booking' },
    { label: 'FAQ', id: 'faq' }
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled glass' : ''}`} style={{ transition: 'background-color 0.3s ease, border-bottom 0.3s ease' }}>
        <div className="container nav-container">
          
          {/* Logo */}
          <div
            className="logo"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              cursor: 'pointer',
              fontSize: scrolled ? '1.4rem' : '1.7rem',
              transition: 'var(--transition)',
              color: 'var(--text-main)'
            }}
          >
            Furniqlo<span style={{ color: 'var(--accent)' }}>.</span>
          </div>

          {/* Desktop Search Bar */}
          <div className="search-wrapper desktop-search" style={{ flex: 1, maxWidth: '300px', margin: '0 1.5rem', position: 'relative' }}>
            <Search size={15} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} />
            <input
              type="text"
              placeholder="Search premium furniture..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.6rem 1rem 0.6rem 2.8rem',
                borderRadius: '50px',
                border: '1px solid var(--border-color)',
                background: scrolled ? 'rgba(0,0,0,0.03)' : 'var(--bg-tri)',
                color: 'var(--text-main)',
                fontSize: '0.82rem',
                outline: 'none',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
              }}
            />
          </div>

          {/* Desktop Links */}
          <ul className="nav-links desktop-links" style={{ color: 'var(--text-main)' }}>
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
                    <motion.span 
                      layoutId="nav-underline"
                      style={{
                        position: 'absolute',
                        bottom: '-5px',
                        left: '0',
                        width: '100%',
                        height: '2px',
                        background: 'var(--accent)'
                      }} 
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Actions & Toggles */}
          <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', color: 'var(--text-main)' }}>
            
            {/* Currency Switcher */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as any)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-main)',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  outline: 'none',
                  cursor: 'pointer',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  borderRight: '1px solid var(--border-color)',
                  textTransform: 'uppercase'
                }}
              >
                <option value="USD" style={{ background: 'var(--bg-main)' }}>USD ($)</option>
                <option value="EUR" style={{ background: 'var(--bg-main)' }}>EUR (€)</option>
                <option value="INR" style={{ background: 'var(--bg-main)' }}>INR (₹)</option>
              </select>
            </div>

            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme} 
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-main)', display: 'flex', alignItems: 'center', padding: '4px' }}
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* Wishlist Toggle */}
            <button 
              onClick={() => setIsWishlistOpen(true)} 
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-main)', position: 'relative', display: 'flex', alignItems: 'center', padding: '4px' }}
              aria-label="Wishlist"
            >
              <Heart size={20} fill={wishlist.length > 0 ? 'var(--accent)' : 'none'} color={wishlist.length > 0 ? 'var(--accent)' : 'currentColor'} />
              {wishlist.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-7px',
                  background: 'var(--accent)',
                  color: '#fff',
                  fontSize: '0.6rem',
                  width: '15px',
                  height: '15px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700'
                }}>
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Mobile Search Toggle */}
            <button 
              className="mobile-search-toggle"
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              style={{ cursor: 'pointer', background: 'none', border: 'none', color: 'var(--text-main)' }}
            >
              <Search size={20} />
            </button>

            {/* Cart Drawer Toggle */}
            <button className="cart-btn" onClick={() => setIsCartOpen(true)} style={{ position: 'relative', cursor: 'pointer', background: 'none', border: 'none', color: 'var(--text-main)' }}>
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-10px',
                  background: 'var(--accent)',
                  color: '#fff',
                  fontSize: '0.65rem',
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

            {/* Mobile Menu Toggle */}
            <button 
              className="hamburger-toggle" 
              onClick={() => setIsMobileMenuOpen(true)}
              style={{ cursor: 'pointer', background: 'none', border: 'none', color: 'var(--text-main)' }}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>

        {/* Mobile Search Dropdown Slider */}
        <AnimatePresence>
          {isMobileSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mobile-search-bar"
              style={{
                background: 'var(--bg-main)',
                borderBottom: '1px solid var(--border-color)',
                padding: '1rem',
                overflow: 'hidden'
              }}
            >
              <div style={{ position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem 0.8rem 3rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(0,0,0,0.08)',
                    background: '#f8f8f8',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Slide-out Mobile Menu Drawer */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
};

export default Navbar;
