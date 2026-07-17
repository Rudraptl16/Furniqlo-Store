
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Plus, ChevronDown, Filter, Heart, Star, Grid, List, X, GitCompare } from 'lucide-react';
import { products } from '../data/products';

const SORT_OPTIONS = [
  { id: 'default', label: 'Recommended' },
  { id: 'priceAsc', label: 'Price: Low to High' },
  { id: 'priceDesc', label: 'Price: High to Low' },
  { id: 'rating', label: 'Top Rated' },
  { id: 'reviews', label: 'Most Reviewed' }
];

const PRICE_RANGES = [
  { id: 'All', label: 'All Prices' },
  { id: 'under500', label: 'Under $500' },
  { id: '500to1500', label: '$500 - $1500' },
  { id: 'over1500', label: 'Over $1500' }
];

const ProductGrid: React.FC = () => {
  const { 
    addToCart, 
    setSelectedProduct, 
    searchQuery, 
    setSearchQuery, 
    isInWishlist, 
    addToWishlist, 
    removeFromWishlist, 
    currency, 
    exchangeRate,
    addToCompare,
    removeFromCompare,
    isInCompare
  } = useCart();

  const [filter, setFilter] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');
  const [visibleCount, setVisibleCount] = useState(8);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const toggleWishlist = (e: React.MouseEvent, product: any) => {
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesCategory = filter === 'All' ? true : p.category === filter;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (p.brand && p.brand.toLowerCase().includes(searchQuery.toLowerCase()));
    
    let matchesPrice = true;
    if (priceRange === 'under500') {
      matchesPrice = p.price < 500;
    } else if (priceRange === '500to1500') {
      matchesPrice = p.price >= 500 && p.price <= 1500;
    } else if (priceRange === 'over1500') {
      matchesPrice = p.price > 1500;
    }
    
    return matchesCategory && matchesSearch && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'priceAsc') return a.price - b.price;
    if (sortBy === 'priceDesc') return b.price - a.price;
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    if (sortBy === 'reviews') return (b.reviews || 0) - (a.reviews || 0);
    return 0;
  });

  const visibleProducts = sortedProducts.slice(0, visibleCount);

  const formatPrice = (price: number) => {
    const symbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '₹';
    return `${symbol}${(price * exchangeRate).toFixed(0)}`;
  };

  const activeSortLabel = SORT_OPTIONS.find(o => o.id === sortBy)?.label || 'Sort';

  const resetAllFilters = () => {
    setFilter('All');
    setPriceRange('All');
    setSortBy('default');
    setSearchQuery('');
    setVisibleCount(8);
  };

  const isFiltered = filter !== 'All' || priceRange !== 'All' || searchQuery !== '' || sortBy !== 'default';

  return (
    <section className="section-padding shop-section" id="shop" style={{ background: 'var(--bg-main)', color: 'var(--text-main)', transition: 'background-color 0.5s ease' }}>
      <div className="container">
        
        {/* Title and Top Options */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontFamily: 'var(--font-serif)', margin: 0, color: 'var(--text-main)' }}>All Products</h2>
            
            {/* Layout Toggles */}
            <div style={{ display: 'flex', gap: '0.8rem', background: 'var(--bg-tri)', padding: '0.4rem', borderRadius: '8px' }}>
              <button 
                onClick={() => setLayoutMode('grid')}
                style={{
                  padding: '0.5rem',
                  borderRadius: '6px',
                  background: layoutMode === 'grid' ? 'var(--card-bg)' : 'transparent',
                  boxShadow: layoutMode === 'grid' ? 'var(--shadow-glass)' : 'none',
                  cursor: 'pointer',
                  border: 'none',
                  color: 'var(--text-main)'
                }}
              >
                <Grid size={16} />
              </button>
              <button 
                onClick={() => setLayoutMode('list')}
                style={{
                  padding: '0.5rem',
                  borderRadius: '6px',
                  background: layoutMode === 'list' ? 'var(--card-bg)' : 'transparent',
                  boxShadow: layoutMode === 'list' ? 'var(--shadow-glass)' : 'none',
                  cursor: 'pointer',
                  border: 'none',
                  color: 'var(--text-main)'
                }}
              >
                <List size={16} />
              </button>
            </div>
          </div>
          
          {/* Filter Toolbar */}
          <div className="filter-toolbar" style={{ borderColor: 'var(--border-color)' }}>
            
            {/* Categories */}
            <div className="filter-group">
              {['All', 'Artisanal', 'Modern', 'Minimalist', 'Vintage'].map((cat) => (
                <button 
                  key={cat}
                  onClick={() => { setFilter(cat); setVisibleCount(8); }}
                  style={{ 
                    fontSize: '0.95rem', 
                    fontWeight: filter === cat ? '700' : '400',
                    color: filter === cat ? 'var(--text-main)' : 'var(--text-muted)',
                    position: 'relative',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    background: 'none',
                    border: 'none',
                    padding: '0.5rem 0'
                  }}
                >
                  {cat}
                  {filter === cat && (
                    <motion.div 
                      layoutId="filter-underline"
                      style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: 'var(--text-main)', borderRadius: '2px' }} 
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Price Ranges */}
            <div className="filter-group price-filter-group">
              {PRICE_RANGES.map((range) => (
                <button
                  key={range.id}
                  onClick={() => { setPriceRange(range.id); setVisibleCount(8); }}
                  style={{
                    fontSize: '0.85rem',
                    padding: '0.4rem 1rem',
                    borderRadius: '50px',
                    border: '1px solid var(--border-color)',
                    background: priceRange === range.id ? 'var(--text-main)' : 'transparent',
                    color: priceRange === range.id ? 'var(--bg-main)' : 'var(--text-muted)',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.3s'
                  }}
                >
                  {range.label}
                </button>
              ))}
            </div>

            {/* Sorting Dropdown */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <button 
                onClick={() => setIsSortOpen(!isSortOpen)}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  fontSize: '0.9rem', 
                  fontWeight: 600,
                  border: '1px solid var(--border-color)',
                  padding: '0.5rem 1.2rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  color: 'var(--text-main)',
                  background: 'var(--bg-main)'
                }}
              >
                <Filter size={14} />
                <span>Sort: {activeSortLabel}</span>
                <ChevronDown size={14} style={{ transform: isSortOpen ? 'rotate(180deg)' : 'none', transition: '0.3s' }} />
              </button>

              <AnimatePresence>
                {isSortOpen && (
                  <>
                    <div style={{ position: 'fixed', inset: 0, zIndex: 99 }} onClick={() => setIsSortOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      style={{
                        position: 'absolute',
                        right: 0,
                        top: '110%',
                        background: 'var(--bg-main)',
                        borderRadius: '12px',
                        border: '1px solid var(--border-color)',
                        boxShadow: 'var(--shadow-premium)',
                        zIndex: 100,
                        padding: '0.5rem 0',
                        minWidth: '180px'
                      }}
                    >
                      {SORT_OPTIONS.map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => { setSortBy(opt.id); setIsSortOpen(false); setVisibleCount(8); }}
                          style={{
                            width: '100%',
                            textAlign: 'left',
                            padding: '0.8rem 1.2rem',
                            fontSize: '0.85rem',
                            background: sortBy === opt.id ? 'var(--bg-tri)' : 'transparent',
                            fontWeight: sortBy === opt.id ? 700 : 400,
                            color: sortBy === opt.id ? 'var(--text-main)' : 'var(--text-muted)',
                            cursor: 'pointer',
                            border: 'none',
                            display: 'block'
                          }}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* Filtering Status Tag Bar */}
          {isFiltered && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap', marginTop: '1.5rem', background: 'var(--bg-sec)', padding: '0.8rem 1.2rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}
            >
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Active Filters:</span>
              
              {filter !== 'All' && (
                <span className="filter-badge">
                  Category: {filter}
                  <X size={12} onClick={() => setFilter('All')} style={{ cursor: 'pointer', marginLeft: '6px' }} />
                </span>
              )}
              {priceRange !== 'All' && (
                <span className="filter-badge">
                  Price: {PRICE_RANGES.find(r => r.id === priceRange)?.label}
                  <X size={12} onClick={() => setPriceRange('All')} style={{ cursor: 'pointer', marginLeft: '6px' }} />
                </span>
              )}
              {searchQuery !== '' && (
                <span className="filter-badge">
                  Search: "{searchQuery}"
                  <X size={12} onClick={() => setSearchQuery('')} style={{ cursor: 'pointer', marginLeft: '6px' }} />
                </span>
              )}
              {sortBy !== 'default' && (
                <span className="filter-badge">
                  Sort: {SORT_OPTIONS.find(o => o.id === sortBy)?.label}
                  <X size={12} onClick={() => setSortBy('default')} style={{ cursor: 'pointer', marginLeft: '6px' }} />
                </span>
              )}
              
              <button 
                onClick={resetAllFilters}
                style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 600, marginLeft: 'auto', cursor: 'pointer', background: 'none', border: 'none' }}
              >
                Reset All Filters
              </button>
            </motion.div>
          )}
        </div>

        {/* Products Grid / List */}
        {visibleProducts.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            style={{ textAlign: 'center', padding: '5rem 0' }}
          >
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>No products match your current filtering criteria.</p>
            <button className="btn-primary" onClick={resetAllFilters}>Clear Filters</button>
          </motion.div>
        ) : (
          <div className={layoutMode === 'grid' ? 'product-grid-main' : 'product-list-main'}>
            <AnimatePresence mode="popLayout">
              {visibleProducts.map((product, index) => (
                <motion.div 
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: (index % 4) * 0.05 }}
                  className={layoutMode === 'grid' ? 'product-card' : 'product-list-card'}
                  onClick={() => setSelectedProduct(product)}
                  style={{ cursor: 'pointer', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '16px', overflow: 'hidden' }}
                >
                  <div className="product-image-wrapper">
                    <img src={product.image} alt={product.name} className="product-image" />

                    {/* Badge */}
                    {product.badge && (
                      <span className="product-badge">{product.badge}</span>
                    )}

                    {/* Compare Button */}
                    <motion.button 
                      className="compare-btn"
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        if (isInCompare(product.id)) {
                          removeFromCompare(product.id);
                        } else {
                          addToCompare(product);
                        }
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      style={{
                        position: 'absolute',
                        left: '0.75rem',
                        top: '0.75rem',
                        background: isInCompare(product.id) ? 'var(--accent)' : 'var(--bg-main)',
                        color: isInCompare(product.id) ? '#fff' : 'var(--text-main)',
                        width: '34px',
                        height: '34px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        zIndex: 3,
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <GitCompare size={15} />
                    </motion.button>

                    {/* Wishlist */}
                    <motion.button 
                      className="wishlist-btn"
                      onClick={(e) => toggleWishlist(e, product)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      style={{
                        position: 'absolute',
                        right: '0.75rem',
                        top: '0.75rem',
                        background: 'var(--bg-main)',
                        width: '34px',
                        height: '34px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        color: isInWishlist(product.id) ? '#ff4d4d' : 'var(--text-main)',
                        zIndex: 3,
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <Heart size={16} fill={isInWishlist(product.id) ? '#ff4d4d' : 'none'} />
                    </motion.button>

                    {/* Quick Add (Only shown overlay on grid view) */}
                    {layoutMode === 'grid' && (
                      <motion.button 
                        className="add-to-cart-quick"
                        onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        style={{
                          position: 'absolute',
                          right: '0.75rem',
                          bottom: '0.75rem',
                          background: 'var(--bg-main)',
                          color: 'var(--text-main)',
                          width: '38px',
                          height: '38px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                          zIndex: 3,
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        <Plus size={18} />
                      </motion.button>
                    )}
                  </div>

                  {/* Product Info (Grid Mode) */}
                  {layoutMode === 'grid' ? (
                    <div className="product-info" style={{ background: 'transparent', padding: '1.2rem' }}>
                      <div className="product-info-row">
                        <h4 style={{ fontSize: '1rem', margin: 0, color: 'var(--text-main)' }}>{product.name}</h4>
                        <span className="product-price" style={{ color: 'var(--accent)', fontWeight: 700 }}>{formatPrice(product.price)}</span>
                      </div>
                      <div className="product-info-row" style={{ alignItems: 'center', marginTop: '0.5rem' }}>
                        <p className="product-meta" style={{ color: 'var(--text-muted)' }}>{product.brand}</p>
                        {product.rating && (
                          <div className="product-rating">
                            <Star size={12} className="rating-stars" fill="#f59e0b" color="#f59e0b" />
                            <span style={{ fontWeight: 600, color: 'var(--text-main)', marginLeft: '4px' }}>{product.rating}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* Detailed Product Info (List Mode) */
                    <div className="product-list-info" style={{ padding: '2rem' }}>
                      <div>
                        <span style={{ fontSize: '0.8rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>{product.brand}</span>
                        <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-serif)', margin: '0.2rem 0 0.8rem 0', color: 'var(--text-main)' }}>{product.name}</h3>
                        
                        {product.rating && (
                          <div className="product-rating" style={{ marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', gap: '2px', marginRight: '0.5rem' }}>
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={13} fill={i < Math.floor(product.rating || 0) ? '#f59e0b' : 'none'} color={i < Math.floor(product.rating || 0) ? '#f59e0b' : '#ddd'} />
                              ))}
                            </div>
                            <span style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.9rem' }}>{product.rating}</span>
                            {product.reviews && <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}> ({product.reviews} reviews)</span>}
                          </div>
                        )}
                        
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem', maxWidth: '600px' }}>
                          {product.description}
                        </p>

                        {product.features && (
                          <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem', padding: 0, listStyle: 'none' }}>
                            {product.features.map((feat, fi) => (
                              <li key={fi} style={{ background: 'var(--bg-tri)', color: 'var(--text-main)', fontSize: '0.8rem', padding: '0.3rem 0.8rem', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                                <span style={{ width: '4px', height: '4px', background: 'var(--accent)', borderRadius: '50%' }} />
                                {feat}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                        <span style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--text-main)' }}>{formatPrice(product.price)}</span>
                        
                        <div style={{ display: 'flex', gap: '1rem' }}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (isInCompare(product.id)) {
                                removeFromCompare(product.id);
                              } else {
                                addToCompare(product);
                              }
                            }}
                            style={{
                              padding: '0.8rem 1.5rem',
                              borderRadius: '12px',
                              border: '1px solid var(--border-color)',
                              background: isInCompare(product.id) ? 'var(--accent)' : 'transparent',
                              color: isInCompare(product.id) ? '#fff' : 'var(--text-main)',
                              fontWeight: 600,
                              fontSize: '0.9rem',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.4rem'
                            }}
                          >
                            <GitCompare size={14} />
                            {isInCompare(product.id) ? 'Compared' : 'Compare'}
                          </button>
                          
                          <button 
                            className="btn-primary" 
                            onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                            style={{ padding: '0.8rem 2rem', fontSize: '0.9rem', cursor: 'pointer' }}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {visibleCount < sortedProducts.length && (
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
