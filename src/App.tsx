import React from 'react';
import { CartProvider, useCart } from './context/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import PromoSection from './components/PromoSection';
import ProductGrid from './components/ProductGrid';
import SpecialCollections from './components/SpecialCollections';
import CartDrawer from './components/CartDrawer';
import ProductModal from './components/ProductModal';
import CheckoutModal from './components/CheckoutModal';
import './App.css';

const AppContent: React.FC = () => {
  const { isCheckoutOpen, setIsCheckoutOpen } = useCart();
  
  return (
    <div className="app">
      <Navbar />
      <CartDrawer />
      <ProductModal />
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
      
      <main>
        <div id="home">
          <Hero />
        </div>
        <div id="featured">
          <FeaturedProducts />
        </div>
        <PromoSection />
        <div id="shop">
          <ProductGrid />
        </div>
        <div id="about">
          <SpecialCollections />
        </div>
      </main>
      
      <footer id="contact" className="section-padding" style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
            <div>
              <div className="logo" style={{ marginBottom: '1.5rem', color: '#fff' }}>Furniqlo</div>
              <p style={{ opacity: 0.6, fontSize: '0.9rem', lineHeight: '1.8' }}>
                Elevating spaces with premium furniture designed for modern living. Quality craftsmanship in every piece.
              </p>
            </div>
            <div>
              <h4 style={{ marginBottom: '1.5rem', color: '#fff' }}>Quick Links</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', opacity: 0.6, fontSize: '0.9rem' }}>
                <li><a href="#home">Home</a></li>
                <li><a href="#shop">Shop</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: '1.5rem', color: '#fff' }}>Socials</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', opacity: 0.6, fontSize: '0.9rem' }}>
                <li><a href="#">Instagram</a></li>
                <li><a href="#">Twitter</a></li>
                <li><a href="#">Facebook</a></li>
                <li><a href="#">Pinterest</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: '1.5rem', color: '#fff' }}>Newsletter</h4>
              <p style={{ opacity: 0.6, fontSize: '0.8rem', marginBottom: '1rem' }}>Subscribe to get the latest updates.</p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input type="text" placeholder="Email" style={{ background: '#333', border: 'none', padding: '0.8rem', borderRadius: '4px', color: '#fff', width: '100%' }} />
                <button style={{ background: 'var(--accent)', color: '#fff', padding: '0.8rem 1.2rem', borderRadius: '4px', fontWeight: '600' }}>Join</button>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', textAlign: 'center' }}>
            <p style={{ opacity: 0.4, fontSize: '0.8rem' }}>
              © 2026 Furniqlo Furniture Store. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
};

export default App;
