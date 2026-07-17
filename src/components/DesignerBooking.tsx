import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Calendar, User, Mail, Clipboard, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';

const ROOMS = ["Living Room", "Bedroom", "Dining Room & Kitchen", "Home Office"];
const VIBES = ["Minimalist & Serene", "Retro & Character", "Sleek & Contemporary", "Handcrafted & Raw"];
const TIMES = ["09:00 AM", "11:30 AM", "02:00 PM", "04:30 PM"];

const DesignerBooking: React.FC = () => {
  const { addToast } = useCart();
  const [step, setStep] = useState(1);
  
  // Form states
  const [room, setRoom] = useState(ROOMS[0]);
  const [vibe, setVibe] = useState(VIBES[0]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState(TIMES[0]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');

  const handleNext = () => {
    if (step === 3 && (!date || !time)) {
      addToast('Please select date and time', 'error');
      return;
    }
    if (step < 4) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      addToast('Please fill out name and email', 'error');
      return;
    }
    // Final submit actions
    addToast('Consultation Booked Successfully!', 'success');
    setStep(5);
  };

  const handleReset = () => {
    setStep(1);
    setRoom(ROOMS[0]);
    setVibe(VIBES[0]);
    setDate('');
    setTime(TIMES[0]);
    setName('');
    setEmail('');
    setNotes('');
  };

  return (
    <section 
      className="section-padding booking-section" 
      id="booking" 
      style={{ background: 'var(--bg-cream)', borderBottom: '1px solid var(--border-color)' }}
    >
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: '5rem', alignItems: 'center' }}>
          
          {/* Left Column: Context Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <span style={{ 
              fontSize: '0.8rem', 
              fontWeight: '700', 
              textTransform: 'uppercase', 
              color: 'var(--accent)', 
              letterSpacing: '2px'
            }}>
              Private Studio
            </span>
            <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontFamily: 'var(--font-serif)', color: 'var(--text-main)', margin: 0 }}>
              Virtual Space Styling
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.02rem', lineHeight: '1.7', margin: 0 }}>
              Book a complimentary 30-minute design session with one of our lead interior consultants. We will review your layouts, suggest material finishes, and assemble a bespoke mood board.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                  1
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 0.2rem 0' }}>Select Your Scope</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>Define the room type and stylistic ambitions.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                  2
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 0.2rem 0' }}>Pick Your Consultant Time</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>Reserve a convenient calendar slot.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                  3
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 0.2rem 0' }}>Receive Tailored Moodboard</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>Get a personalized layout and links via email.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Multi-step Booking Widget */}
          <div 
            style={{
              background: 'var(--bg-main)',
              borderRadius: '24px',
              border: '1px solid var(--border-color)',
              padding: '3rem',
              boxShadow: 'var(--shadow-premium)',
              minHeight: '440px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative'
            }}
          >
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
                >
                  <span style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>
                    Step 1: Choose Space Scope
                  </span>
                  <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', marginBottom: '1.5rem' }}>Which room are we styling?</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                    {ROOMS.map((r) => (
                      <button
                        key={r}
                        onClick={() => setRoom(r)}
                        style={{
                          padding: '1.2rem',
                          borderRadius: '16px',
                          border: room === r ? '2px solid var(--accent)' : '1px solid var(--border-color)',
                          background: room === r ? 'var(--bg-tri)' : 'transparent',
                          color: 'var(--text-main)',
                          fontWeight: 600,
                          cursor: 'pointer',
                          textAlign: 'center',
                          transition: 'all 0.3s'
                        }}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto' }}>
                    <button className="btn-primary" onClick={handleNext} style={{ background: 'var(--primary)', color: 'var(--bg-main)', padding: '0.8rem 2rem', fontSize: '0.85rem' }}>
                      Continue <ChevronRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
                >
                  <span style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>
                    Step 2: Define Aesthetic Ambition
                  </span>
                  <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', marginBottom: '1.5rem' }}>What aesthetic direction matches your vision?</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                    {VIBES.map((v) => (
                      <button
                        key={v}
                        onClick={() => setVibe(v)}
                        style={{
                          padding: '1.2rem',
                          borderRadius: '16px',
                          border: vibe === v ? '2px solid var(--accent)' : '1px solid var(--border-color)',
                          background: vibe === v ? 'var(--bg-tri)' : 'transparent',
                          color: 'var(--text-main)',
                          fontWeight: 600,
                          cursor: 'pointer',
                          textAlign: 'center',
                          transition: 'all 0.3s'
                        }}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto' }}>
                    <button onClick={handleBack} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, color: 'var(--text-muted)', cursor: 'pointer' }}>
                      <ChevronLeft size={16} /> Back
                    </button>
                    <button className="btn-primary" onClick={handleNext} style={{ background: 'var(--primary)', color: 'var(--bg-main)', padding: '0.8rem 2rem', fontSize: '0.85rem' }}>
                      Continue <ChevronRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
                >
                  <span style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>
                    Step 3: Scheduling
                  </span>
                  <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', marginBottom: '1.5rem' }}>Select a Date & Time</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '2rem' }}>
                    {/* Date Input */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Choose Date</label>
                      <input 
                        type="date"
                        value={date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setDate(e.target.value)}
                        style={{
                          padding: '0.8rem',
                          borderRadius: '8px',
                          border: '1px solid var(--border-color)',
                          background: 'var(--bg-main)',
                          color: 'var(--text-main)',
                          outline: 'none',
                          fontSize: '0.9rem'
                        }}
                      />
                    </div>

                    {/* Time Options */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Choose Time Slot</label>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                        {TIMES.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setTime(t)}
                            style={{
                              padding: '0.6rem 0',
                              borderRadius: '8px',
                              border: time === t ? '1.5px solid var(--accent)' : '1px solid var(--border-color)',
                              background: time === t ? 'var(--bg-tri)' : 'transparent',
                              color: 'var(--text-main)',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              textAlign: 'center'
                            }}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto' }}>
                    <button onClick={handleBack} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, color: 'var(--text-muted)', cursor: 'pointer' }}>
                      <ChevronLeft size={16} /> Back
                    </button>
                    <button className="btn-primary" onClick={handleNext} style={{ background: 'var(--primary)', color: 'var(--bg-main)', padding: '0.8rem 2rem', fontSize: '0.85rem' }}>
                      Continue <ChevronRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
                >
                  <span style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>
                    Step 4: Contact Details
                  </span>
                  <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', marginBottom: '1.5rem' }}>Confirm Reservation details</h3>
                  
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Full Name</label>
                        <div style={{ position: 'relative' }}>
                          <User size={14} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} />
                          <input 
                            type="text" 
                            required
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.5rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-main)', color: 'var(--text-main)', outline: 'none' }}
                          />
                        </div>
                      </div>
                      
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Email Address</label>
                        <div style={{ position: 'relative' }}>
                          <Mail size={14} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} />
                          <input 
                            type="email" 
                            required
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.5rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-main)', color: 'var(--text-main)', outline: 'none' }}
                          />
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Project Notes (Optional)</label>
                      <textarea 
                        placeholder="Tell us about your space sizes, goals, or lighting..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        style={{ width: '100%', height: '80px', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-main)', color: 'var(--text-main)', outline: 'none', resize: 'none' }}
                      />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
                      <button type="button" onClick={handleBack} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, color: 'var(--text-muted)', cursor: 'pointer' }}>
                        <ChevronLeft size={16} /> Back
                      </button>
                      <button type="submit" className="btn-primary" style={{ background: 'var(--primary)', color: 'var(--bg-main)', padding: '0.8rem 2.5rem', fontSize: '0.85rem' }}>
                        Book Appointment
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {step === 5 && (
                <motion.div
                  key="success-booking"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                    style={{ color: '#10b981', marginBottom: '0.5rem' }}
                  >
                    <CheckCircle2 size={54} />
                  </motion.div>
                  
                  <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)' }}>Consultation Booked!</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '380px', margin: '0 auto 1.5rem auto', lineHeight: '1.6' }}>
                    Thank you, <strong>{name}</strong>. A styling invitation for your <strong>{room}</strong> ({vibe}) has been dispatched to <strong>{email}</strong> for:
                  </p>

                  <div style={{ background: 'var(--bg-tri)', padding: '1rem 2rem', borderRadius: '16px', display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <Calendar size={18} color="var(--accent)" />
                    <div style={{ textAlign: 'left' }}>
                      <p style={{ margin: 0, fontWeight: 700, fontSize: '0.85rem' }}>{date}</p>
                      <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.6 }}>{time}</p>
                    </div>
                  </div>

                  <button
                    onClick={handleReset}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--accent)',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <Clipboard size={14} /> Schedule Another Session
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DesignerBooking;
