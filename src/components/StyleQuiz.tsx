import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { Sparkles, HelpCircle, Check, ArrowRight, RotateCcw, ShoppingBag, Eye } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: {
    text: string;
    persona: 'Minimalist' | 'Vintage' | 'Modern' | 'Artisanal';
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "What color palette feels most inviting to you?",
    options: [
      { text: "Neutral sand, light ash wood, and warm whites", persona: "Minimalist" },
      { text: "Rich mustard, dark walnut, and deep olive greens", persona: "Vintage" },
      { text: "Carbon black, exposed iron, and concrete grey", persona: "Modern" },
      { text: "Organic cream, cognac leather, and natural oak", persona: "Artisanal" }
    ]
  },
  {
    id: 2,
    question: "Which lighting atmosphere attracts you most?",
    options: [
      { text: "Soft paper pendants casting warm, diffuse ambient glows", persona: "Minimalist" },
      { text: "Brass arcs or retro shades with warm filament bulbs", persona: "Vintage" },
      { text: "Sleek architectural profiles and spotlight fixtures", persona: "Modern" },
      { text: "Handwoven rattan domes throwing textured patterns", persona: "Artisanal" }
    ]
  },
  {
    id: 3,
    question: "Select your preferred design silhouettes:",
    options: [
      { text: "Low-profile platforms and flat, clean linear planes", persona: "Minimalist" },
      { text: "Tufted velvet curves and tapered organic legs", persona: "Vintage" },
      { text: "Sculpted steel framing and geometric glass surfaces", persona: "Modern" },
      { text: "Raw live-edges, tactile weaves, and hand-finished joints", persona: "Artisanal" }
    ]
  },
  {
    id: 4,
    question: "Describe the ideal layout flow of your space:",
    options: [
      { text: "Extremely tidy, sparse, and open with zero clutter", persona: "Minimalist" },
      { text: "A rich curatorial mix of vintage stories and statement pieces", persona: "Vintage" },
      { text: "An open-concept loft with high ceilings and industrial ductwork", persona: "Modern" },
      { text: "A cozy sanctuary highlighting handmade pottery and natural elements", persona: "Artisanal" }
    ]
  }
];

const PERSONA_DETAILS = {
  Minimalist: {
    title: "Japandi Minimalist",
    desc: "Your style blends Japanese design efficiency with Scandinavian warmth. You appreciate low-profile silhouettes, clean uncluttered lines, and natural ash/birch woods. You prioritize tranquility and function.",
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=600"
  },
  Vintage: {
    title: "Mid-Century Modern & Vintage",
    desc: "You are attracted to the timeless silhouettes of mid-century design. Curved woods, velvet tufting, rich walnut grains, and retro palettes make your space feel sophisticated and full of character.",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=600"
  },
  Modern: {
    title: "Industrial & Modern",
    desc: "You love industrial loft aesthetics, combining steel frames, matte black details, and clean geometric structures. Sleek glass coffee tables and chrome details appeal to your contemporary tastes.",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=600"
  },
  Artisanal: {
    title: "Organic Modern & Artisanal",
    desc: "You prioritize tactile warmth and local craftsmanship. Live-edge walnut tables, hand-thrown ceramics, woven rattan details, and textured cotton boucle make your home feel grounded, cozy, and unique.",
    image: "https://images.unsplash.com/photo-1617806118233-18e16737a798?auto=format&fit=crop&q=80&w=600"
  }
};

const StyleQuiz: React.FC = () => {
  const { addToCart, setSelectedProduct, currency, exchangeRate } = useCart();
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({
    Minimalist: 0,
    Vintage: 0,
    Modern: 0,
    Artisanal: 0
  });
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [result, setResult] = useState<'Minimalist' | 'Vintage' | 'Modern' | 'Artisanal' | null>(null);

  const formatPrice = (price: number) => {
    const symbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '₹';
    return `${symbol}${(price * exchangeRate).toFixed(0)}`;
  };

  const handleNext = () => {
    if (selectedOption === null) return;
    
    const selectedPersona = QUESTIONS[currentStep].options[selectedOption].persona;
    setScores((prev) => ({
      ...prev,
      [selectedPersona]: prev[selectedPersona] + 1
    }));

    setSelectedOption(null);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Calculate final winner
      const finalScores = { ...scores, [selectedPersona]: scores[selectedPersona] + 1 };
      let winner: 'Minimalist' | 'Vintage' | 'Modern' | 'Artisanal' = 'Minimalist';
      let maxScore = -1;

      Object.entries(finalScores).forEach(([persona, score]) => {
        if (score > maxScore) {
          maxScore = score;
          winner = persona as any;
        }
      });

      setResult(winner);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setScores({ Minimalist: 0, Vintage: 0, Modern: 0, Artisanal: 0 });
    setSelectedOption(null);
    setResult(null);
  };

  const getRecommendations = () => {
    if (!result) return [];
    return products.filter((p) => p.category === result).slice(0, 3);
  };

  return (
    <section 
      className="section-padding quiz-section" 
      id="quiz" 
      style={{ background: 'var(--bg-main)', borderBottom: '1px solid var(--border-color)' }}
    >
      <div className="container">
        
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ 
            fontSize: '0.8rem', 
            fontWeight: '700', 
            textTransform: 'uppercase', 
            color: 'var(--accent)', 
            letterSpacing: '2px', 
            display: 'block', 
            marginBottom: '1rem' 
          }}>
            Style Finder
          </span>
          <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontFamily: 'var(--font-serif)', color: 'var(--text-main)', marginBottom: '1rem' }}>
            Find Your Interior Persona
          </h2>
          <p style={{ maxWidth: '550px', margin: '0 auto', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Answer these 4 curated styling questions and our design algorithm will match you with custom layouts and recommended products.
          </p>
        </div>

        {/* Quiz Panel */}
        <div 
          style={{
            maxWidth: '850px',
            margin: '0 auto',
            background: 'var(--bg-sec)',
            border: '1px solid var(--border-color)',
            borderRadius: '24px',
            padding: '3rem',
            minHeight: '400px',
            boxShadow: 'var(--shadow-glass)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative'
          }}
        >
          <AnimatePresence mode="wait">
            {!result ? (
              // Quiz Question Flow
              <motion.div
                key={`q-${currentStep}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                style={{ width: '100%' }}
              >
                {/* Progress Indicators */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <HelpCircle size={14} /> Question {currentStep + 1} of {QUESTIONS.length}
                  </span>
                  
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {QUESTIONS.map((_, index) => (
                      <div 
                        key={index} 
                        style={{
                          width: '24px',
                          height: '4px',
                          borderRadius: '2px',
                          background: index <= currentStep ? 'var(--accent)' : 'var(--border-color)',
                          transition: 'background 0.3s'
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Question */}
                <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-serif)', color: 'var(--text-main)', marginBottom: '2rem' }}>
                  {QUESTIONS[currentStep].question}
                </h3>

                {/* Options List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
                  {QUESTIONS[currentStep].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedOption(idx)}
                      style={{
                        textAlign: 'left',
                        padding: '1.2rem 1.5rem',
                        borderRadius: '16px',
                        background: selectedOption === idx ? 'var(--bg-tri)' : 'var(--bg-main)',
                        border: '1px solid',
                        borderColor: selectedOption === idx ? 'var(--accent)' : 'var(--border-color)',
                        color: 'var(--text-main)',
                        fontSize: '0.95rem',
                        fontWeight: selectedOption === idx ? 600 : 400,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all 0.3s'
                      }}
                    >
                      <span>{option.text}</span>
                      {selectedOption === idx && (
                        <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Check size={12} />
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Action Row */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    onClick={handleNext}
                    disabled={selectedOption === null}
                    style={{
                      background: selectedOption !== null ? 'var(--primary)' : 'var(--border-color)',
                      color: selectedOption !== null ? 'var(--bg-main)' : 'var(--text-muted)',
                      padding: '1rem 2.5rem',
                      borderRadius: '12px',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      cursor: selectedOption !== null ? 'pointer' : 'not-allowed',
                      transition: 'all 0.3s'
                    }}
                  >
                    <span>{currentStep === QUESTIONS.length - 1 ? 'Calculate Result' : 'Next Question'}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            ) : (
              // Quiz Result Page
              <motion.div
                key="result-page"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{ width: '100%' }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem', alignItems: 'center' }}>
                  
                  {/* Left Result Info */}
                  <div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>
                      <Sparkles size={14} /> Style Profile Unlocked
                    </div>
                    <h3 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-serif)', color: 'var(--text-main)', marginBottom: '1.2rem' }}>
                      {PERSONA_DETAILS[result].title}
                    </h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                      {PERSONA_DETAILS[result].desc}
                    </p>

                    <button
                      onClick={handleRestart}
                      style={{
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-main)',
                        padding: '0.8rem 1.5rem',
                        borderRadius: '12px',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        cursor: 'pointer'
                      }}
                    >
                      <RotateCcw size={14} /> Retake Styling Quiz
                    </button>
                  </div>

                  {/* Right Profile Graphic */}
                  <div style={{ borderRadius: '16px', overflow: 'hidden', height: '240px', boxShadow: 'var(--shadow-glass)' }}>
                    <img 
                      src={PERSONA_DETAILS[result].image} 
                      alt={PERSONA_DETAILS[result].title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  </div>

                </div>

                {/* Recommendations Divider */}
                <div style={{ borderTop: '1px solid var(--border-color)', marginTop: '3rem', paddingTop: '2.5rem' }}>
                  <h4 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-serif)', color: 'var(--text-main)', marginBottom: '1.5rem' }}>
                    Recommended For Your Profile:
                  </h4>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                    {getRecommendations().map((product) => (
                      <div 
                        key={product.id}
                        style={{
                          background: 'var(--bg-main)',
                          border: '1px solid var(--border-color)',
                          borderRadius: '16px',
                          padding: '0.8rem',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.8rem',
                          position: 'relative'
                        }}
                      >
                        <div style={{ height: '120px', borderRadius: '10px', overflow: 'hidden' }}>
                          <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <h5 style={{ fontSize: '0.85rem', fontWeight: 600, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {product.name}
                          </h5>
                          <p style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 700, margin: '0.2rem 0 0 0' }}>
                            {formatPrice(product.price)}
                          </p>
                        </div>
                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                          <button
                            onClick={() => addToCart(product)}
                            style={{
                              flex: 1,
                              background: 'var(--primary)',
                              color: 'var(--bg-main)',
                              borderRadius: '8px',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              padding: '0.4rem 0',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '0.3rem',
                              cursor: 'pointer'
                            }}
                          >
                            <ShoppingBag size={10} /> Add
                          </button>
                          
                          <button
                            onClick={() => setSelectedProduct(product)}
                            style={{
                              background: 'var(--bg-tri)',
                              color: 'var(--text-main)',
                              borderRadius: '8px',
                              padding: '0.4rem 0.6rem',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center'
                            }}
                          >
                            <Eye size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default StyleQuiz;
