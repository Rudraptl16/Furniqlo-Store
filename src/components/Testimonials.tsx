import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, MessageSquare, User, Plus, X } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
  location: string;
}

const INITIAL_REVIEWS: Review[] = [
  {
    id: 1,
    name: 'Clara Vance',
    rating: 5,
    comment: 'The craftsmanship of the Aurelius Oak Sideboard is outstanding. It is solid, heavier than expected, and has become the absolute center of gravity in our dining space.',
    date: 'June 14, 2026',
    location: 'Austin, TX'
  },
  {
    id: 2,
    name: 'Marcus Kael',
    rating: 5,
    comment: 'Weightless comfort is an understatement. The Minimalist Cloud Sofa feels incredibly soft but remains supportive. Performance fabric has already survived a coffee spill!',
    date: 'May 28, 2026',
    location: 'Seattle, WA'
  },
  {
    id: 3,
    name: 'Elena Rostova',
    rating: 5,
    comment: 'Pure excellence. From the live-edge walnut details to the white glove setup, the entire shopping experience felt premium. Worth every single cent.',
    date: 'April 19, 2026',
    location: 'Boston, MA'
  }
];

const Testimonials: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [newLoc, setNewLoc] = useState('');
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newComment) return;

    const addedReview: Review = {
      id: Date.now(),
      name: newName,
      rating: newRating,
      comment: newComment,
      date: 'Today',
      location: newLoc || 'Verified Purchaser'
    };

    setReviews([addedReview, ...reviews]);
    setActiveIndex(0);
    setIsFormOpen(false);

    // Reset Form
    setNewName('');
    setNewRating(5);
    setNewComment('');
    setNewLoc('');
  };

  return (
    <section className="section-padding reviews-section" id="reviews" style={{ background: 'var(--bg-sec)', color: 'var(--text-main)', overflow: 'hidden', transition: 'background-color 0.5s ease' }}>
      <div className="container" style={{ position: 'relative' }}>
        
        {/* Section Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '5rem' }}>
          <div>
            <span style={{ color: 'var(--accent)', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem', display: 'block' }}>
              Client Voices
            </span>
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: 'var(--font-serif)', lineHeight: '1.2', margin: 0 }}>
              What Our Clients Say
            </h2>
          </div>
          
          <button 
            onClick={() => setIsFormOpen(true)}
            className="btn-primary" 
            style={{ 
              padding: '1rem 2rem', 
              borderRadius: '50px', 
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              background: 'var(--primary)',
              color: 'var(--bg-main)',
              cursor: 'pointer'
            }}
          >
            <Plus size={16} /> Share Your Experience
          </button>
        </div>

        {/* Carousel Slider */}
        <div className="reviews-carousel-wrapper">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="review-card"
            >
              <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '1.5rem' }}>
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={20} 
                    fill={i < reviews[activeIndex].rating ? 'var(--accent)' : 'none'} 
                    color={i < reviews[activeIndex].rating ? 'var(--accent)' : 'rgba(0,0,0,0.1)'} 
                  />
                ))}
              </div>

              <p className="review-comment">
                "{reviews[activeIndex].comment}"
              </p>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(212, 163, 115, 0.1)', display: 'flex', alignItems: 'center', color: 'var(--accent)', justifyContent: 'center' }}>
                    <User size={20} />
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>{reviews[activeIndex].name}</h4>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>{reviews[activeIndex].location}</p>
                  </div>
                </div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{reviews[activeIndex].date}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav Controls */}
          <div className="carousel-controls">
            <button className="carousel-nav-btn" onClick={handlePrev} style={{ background: 'var(--bg-main)', color: 'var(--text-main)', border: '1px solid var(--border-color)' }}>
              <ChevronLeft size={20} />
            </button>
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>
              {activeIndex + 1} / {reviews.length}
            </span>
            <button className="carousel-nav-btn" onClick={handleNext} style={{ background: 'var(--bg-main)', color: 'var(--text-main)', border: '1px solid var(--border-color)' }}>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Modal form for new reviews */}
        <AnimatePresence>
          {isFormOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFormOpen(false)}
              className="modal-backdrop-custom"
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(8px)',
                zIndex: 5000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem'
              }}
            >
              <motion.div
                initial={{ y: 50, scale: 0.95, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                exit={{ y: 50, scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.4 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  background: 'var(--bg-main)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-main)',
                  borderRadius: '24px',
                  padding: '3rem',
                  maxWidth: '550px',
                  width: '100%',
                  boxShadow: 'var(--shadow-premium)',
                  position: 'relative'
                }}
              >
                <button 
                  onClick={() => setIsFormOpen(false)}
                  style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', cursor: 'pointer', background: 'var(--bg-tri)', border: '1px solid var(--border-color)', color: 'var(--text-main)', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <X size={18} />
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem', color: 'var(--accent)' }}>
                  <MessageSquare size={24} />
                  <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', margin: 0, color: 'var(--text-main)' }}>Write a Review</h3>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
                  Your feedback helps us continuously refine our artisanal collections.
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Rating</label>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(null)}
                          style={{ cursor: 'pointer' }}
                        >
                          <Star 
                            size={24} 
                            fill={(hoverRating !== null ? star <= hoverRating : star <= newRating) ? 'var(--accent)' : 'none'} 
                            color={(hoverRating !== null ? star <= hoverRating : star <= newRating) ? 'var(--accent)' : 'rgba(0,0,0,0.2)'} 
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label htmlFor="revName" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Name</label>
                      <input 
                        id="revName"
                        type="text" 
                        required
                        value={newName} 
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="John Doe" 
                        style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-tri)', color: 'var(--text-main)', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label htmlFor="revLoc" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Location</label>
                      <input 
                        id="revLoc"
                        type="text" 
                        value={newLoc} 
                        onChange={(e) => setNewLoc(e.target.value)}
                        placeholder="Los Angeles, CA" 
                        style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-tri)', color: 'var(--text-main)', outline: 'none' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="revComm" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Review Details</label>
                    <textarea 
                      id="revComm"
                      required
                      value={newComment} 
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Share details of your experience with the design, delivery, and craftsmanship..." 
                      rows={4}
                      style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-tri)', color: 'var(--text-main)', outline: 'none', resize: 'none', fontFamily: 'inherit' }}
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn-primary"
                    style={{ width: '100%', padding: '1.2rem', borderRadius: '12px', background: 'var(--primary)', color: 'var(--bg-main)', fontWeight: '600', cursor: 'pointer' }}
                  >
                    Submit Review
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      <style>{`
        .reviews-carousel-wrapper {
          position: relative;
          max-width: 850px;
          margin: 0 auto;
        }
        .review-card {
          background: var(--card-bg);
          color: var(--text-main);
          padding: 4rem;
          border-radius: 32px;
          box-shadow: var(--shadow-premium);
          border: 1px solid var(--border-color);
        }
        .review-comment {
          font-family: var(--font-serif);
          font-size: clamp(1.2rem, 3vw, 1.8rem);
          line-height: 1.6;
          color: var(--text-main);
          margin-bottom: 3rem;
          font-weight: 400;
        }
        .carousel-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          margin-top: 3rem;
        }
        .carousel-nav-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
        }
        .carousel-nav-btn:hover {
          background: var(--primary) !important;
          color: var(--bg-main) !important;
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.05);
        }
        
        @media (max-width: 768px) {
          .review-card {
            padding: 2.5rem;
          }
          .reviews-section button.btn-primary {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            z-index: 999;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          }
          .reviews-section div:first-child {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
