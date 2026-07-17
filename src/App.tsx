import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import PromoSection from './components/PromoSection';
import ProductGrid from './components/ProductGrid';
import InteractiveVisualizer from './components/InteractiveVisualizer';
import Testimonials from './components/Testimonials';
import CartDrawer from './components/CartDrawer';
import ProductModal from './components/ProductModal';
import CheckoutModal from './components/CheckoutModal';
import Admin from './components/Admin';
import Craftsmanship from './components/Craftsmanship';
import BrandStory from './components/BrandStory';
import Features from './components/Features';
import Newsletter from './components/Newsletter';
import CategoryShowcase from './components/CategoryShowcase';
import { Analytics } from '@vercel/analytics/react';

// New Components
import Showroom from './components/Showroom';
import StyleQuiz from './components/StyleQuiz';
import DesignerBooking from './components/DesignerBooking';
import FaqSection from './components/FaqSection';
import WishlistDrawer from './components/WishlistDrawer';
import CompareTray from './components/CompareTray';
import Toast from './components/Toast';
import { useSeo } from './hooks/useSeo';
import './App.css';

const Home: React.FC = () => {
  const { isCheckoutOpen, setIsCheckoutOpen } = useCart();

  // Dynamic SEO Setup
  useSeo({
    title: "Furniqlo | Premium Handcrafted Furniture & Architectural Design",
    description: "Discover luxury, FSC-certified wooden furniture designed for modern residential spaces. Explore our interactive showroom, schedule free designer consults, and configure style matches online.",
    keywords: "luxury furniture, FSC oak furniture, interior design consultation, virtual showroom, minimalist sofas, walnut coffee table",
    image: "/brand-hero.jpg",
    url: window.location.href
  });
  
  return (
    <>
      <Navbar />
      <CartDrawer />
      <WishlistDrawer />
      <CompareTray />
      <ProductModal />
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
      
      <Toast />
      
      <main>
        <div id="home">
          <Hero />
        </div>
        <Features />
        <div id="featured">
          <FeaturedProducts />
        </div>
        <div id="about">
          <BrandStory />
          <Craftsmanship />
        </div>
        <PromoSection />
        
        {/* Modern Interactive Sections */}
        <div id="showroom">
          <Showroom />
        </div>
        
        <InteractiveVisualizer />
        
        <div id="quiz">
          <StyleQuiz />
        </div>
        
        <CategoryShowcase />
        
        <div id="booking">
          <DesignerBooking />
        </div>

        <Testimonials />

        <div id="faq">
          <FaqSection />
        </div>

        <div id="shop">
          <ProductGrid />
        </div>
        <Newsletter />
      </main>

      <footer id="contact" className="section-padding" style={{ backgroundColor: 'var(--primary)', color: 'var(--bg-main)', borderTop: '1px solid var(--border-color)', transition: 'background-color 0.5s ease' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
            <div>
              <div className="logo" style={{ marginBottom: '1.5rem', color: 'var(--bg-main)', fontSize: '1.6rem', fontWeight: 700 }}>
                Furniqlo<span style={{ color: 'var(--accent)' }}>.</span>
              </div>
              <p style={{ opacity: 0.6, fontSize: '0.9rem', lineHeight: '1.8' }}>
                Elevating spaces with premium handcrafted furniture designed for luxury living. FSC-certified sustainable timber built for generations.
              </p>
            </div>
            <div>
              <h4 style={{ marginBottom: '1.5rem', color: 'var(--bg-main)', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.85rem' }}>Project Code</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', opacity: 0.6, fontSize: '0.9rem', listStyle: 'none', padding: 0 }}>
                <li><a href="https://github.com/Rudraptl16/Furniqlo-Store" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>GitHub Repository</a></li>
                <li><a href="https://git-scm.com/" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Git Controls</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: '1.5rem', color: 'var(--bg-main)', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.85rem' }}>Quick Links</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', opacity: 0.6, fontSize: '0.9rem', listStyle: 'none', padding: 0 }}>
                <li><a href="#home" style={{ color: 'inherit', textDecoration: 'none' }}>Home</a></li>
                <li><a href="#shop" style={{ color: 'inherit', textDecoration: 'none' }}>Shop Catalog</a></li>
                <li><a href="#showroom" style={{ color: 'inherit', textDecoration: 'none' }}>Interactive Showroom</a></li>
                <li><a href="#quiz" style={{ color: 'inherit', textDecoration: 'none' }}>Style Quiz</a></li>
                <li><a href="#booking" style={{ color: 'inherit', textDecoration: 'none' }}>Styling Consults</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: '1.5rem', color: 'var(--bg-main)', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.85rem' }}>Subscribe</h4>
              <p style={{ opacity: 0.6, fontSize: '0.8rem', marginBottom: '1rem' }}>Get notification on exclusive collection releases.</p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input type="text" placeholder="Your email address" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.8rem 1rem', borderRadius: '8px', color: 'var(--bg-main)', width: '100%', outline: 'none' }} />
                <button className="btn-primary" style={{ background: 'var(--accent)', color: '#fff', padding: '0.8rem 1.5rem', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', border: 'none' }}>Join</button>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', textAlign: 'center' }}>
            <p style={{ opacity: 0.4, fontSize: '0.8rem' }}>
              © 2026 Furniqlo Furniture Store. Crafted with architectural excellence.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <CartProvider>
        <Analytics />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </CartProvider>
    </Router>
  );
};

export default App;
