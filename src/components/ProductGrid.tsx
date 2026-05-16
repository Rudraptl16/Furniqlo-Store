import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Plus, ChevronDown, Filter, Heart } from 'lucide-react';
import { products } from '../data/products';


const ProductGrid: React.FC = () => {
  const { addToCart, setSelectedProduct, searchQuery, isInWishlist, addToWishlist, removeFromWishlist, currency, exchangeRate } = useCart();
  const [filter, setFilter] = useState('All');
  const [visibleCount, setVisibleCount] = useState(8);

  const toggleWishlist = (e: React.MouseEvent, product: any) => {
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesFilter = filter === 'All' ? true : p.category === filter;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  const formatPrice = (price: number) => {
    const symbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '₹';
    return `${symbol}${(price * exchangeRate).toFixed(0)}`;
  };

  return (
    <section className="section-padding" id="shop">
      <div className="container">
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '3.5rem', marginBottom: '2rem', fontFamily: 'var(--font-serif)' }}>All Products</h2>
          
          <div className="filter-bar" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', borderBottom: '1px solid #eee', paddingBottom: '1.5rem' }}>
            {['All', 'Artisanal', 'Modern', 'Minimalist', 'Vintage'].map((cat) => (
              <button 
                key={cat}
                onClick={() => { setFilter(cat); setVisibleCount(8); }}
                style={{ 
                  fontSize: '1rem', 
                  fontWeight: filter === cat ? '600' : '400',
                  color: filter === cat ? 'var(--text-dark)' : 'var(--text-light)',
                  position: 'relative'
                }}
              >
                {cat}
                {filter === cat && (
                  <motion.div 
                    layoutId="filter-underline"
                    style={{ position: 'absolute', bottom: '-1.6rem', left: 0, right: 0, height: '2px', background: 'var(--text-dark)' }} 
                  />
                )}
              </button>
            ))}
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', opacity: 0.6 }}>
              <Filter size={16} />
              <span>Sort by: Popularity <ChevronDown size={14} /></span>
            </div>
          </div>
        </div>

        <div className="product-grid-main">
          <AnimatePresence mode="popLayout">
            {visibleProducts.map((product, index) => (
              <motion.div 
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: (index % 4) * 0.05 }}
                className="product-card"
                onClick={() => setSelectedProduct(product)}
                style={{ cursor: 'pointer' }}
              >
                <div className="product-image-wrapper" style={{ position: 'relative' }}>
                  <img src={product.image} alt={product.name} className="product-image" />
                  
                  <motion.button 
                    className="wishlist-btn"
                    onClick={(e) => toggleWishlist(e, product)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      position: 'absolute',
                      right: '1rem',
                      top: '1rem',
                      background: '#fff',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      color: isInWishlist(product.id) ? '#ff4d4d' : 'inherit'
                    }}
                  >
                    <Heart size={18} fill={isInWishlist(product.id) ? '#ff4d4d' : 'none'} />
                  </motion.button>

                  <motion.button 
                    className="add-to-cart-quick"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      position: 'absolute',
                      right: '1rem',
                      bottom: '1rem',
                      background: '#fff',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                  >
                    <Plus size={20} />
                  </motion.button>
                </div>
                <div className="product-info" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', margin: '0' }}>{product.name}</h4>
                    <p className="product-meta">{product.brand}</p>
                  </div>
                  <span style={{ fontWeight: '600' }}>{formatPrice(product.price)}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {visibleCount < filteredProducts.length && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '6rem' }}>
            <button 
              className="btn-primary"
              style={{ padding: '1rem 4rem' }}
              onClick={() => setVisibleCount(prev => prev + 4)}
            >
              View More Products
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
