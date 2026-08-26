import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, Clock, MessageSquare, Check, Phone, User } from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Café Owner's WhatsApp Number
const OWNER_WHATSAPP_NUMBER = '919444012345';

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [form, setForm] = useState({
    name: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    time: '19:00',
    party: '2',
    note: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedMessage =
      `👋 *Table Reservation Request — The Aura Corner*\n\n` +
      `👤 *Name:* ${form.name}\n` +
      `📞 *Phone:* ${form.phone || 'Provided via WhatsApp'}\n` +
      `📅 *Date:* ${form.date}\n` +
      `⏰ *Time:* ${form.time}\n` +
      `👥 *Party Size:* ${form.party} Guests\n` +
      (form.note ? `📝 *Special Note:* ${form.note}\n\n` : `\n`) +
      `Please confirm my reservation. Thank you!`;

    const whatsappUrl = `https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${encodeURIComponent(formattedMessage)}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    setStep('success');
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '12px',
    border: '1px solid rgba(167,235,242,0.18)',
    background: 'rgba(255,255,255,0.04)',
    fontFamily: '"Outfit", sans-serif',
    fontSize: '13px',
    color: '#fff',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.25s ease, background 0.25s ease',
  };

  const labelStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    color: '#A7EBF2',
    marginBottom: '6px',
    fontFamily: '"Outfit", sans-serif',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              onClose();
              setStep('form');
            }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 7, 18, 0.82)',
              backdropFilter: 'blur(10px)',
              zIndex: 9000,
            }}
          />

          {/* Modal Container to guarantee exact viewport centering */}
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9001,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              pointerEvents: 'none',
            }}
          >
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 26, stiffness: 300 }}
              style={{
                pointerEvents: 'auto',
                width: '460px',
                maxWidth: '100%',
                maxHeight: '92vh',
                overflowY: 'auto',
                background: '#040d1e',
                border: '1px solid rgba(167,235,242,0.22)',
                borderRadius: '24px',
                boxShadow: '0 30px 80px rgba(0,0,0,0.8), 0 0 50px rgba(84,172,191,0.2)',
              }}
            >
            {/* Header */}
            <div
              style={{
                padding: '24px 28px 20px',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                background: 'linear-gradient(180deg, #021633 0%, #040d1e 100%)',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #26658C, #54ACBF)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 16px rgba(84,172,191,0.4)',
                  }}
                >
                  <Calendar size={18} color="#fff" />
                </div>
                <div>
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: '"Playfair Display", serif',
                      fontSize: '22px',
                      fontWeight: 700,
                      color: '#fff',
                      lineHeight: 1.1,
                    }}
                  >
                    Reserve a Table
                  </h3>
                  <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#54ACBF', fontFamily: '"Outfit", sans-serif' }}>
                    Connects directly to Café Owner via WhatsApp
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => {
                  onClose();
                  setStep('form');
                }}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '50%',
                  width: '34px',
                  height: '34px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'rgba(255,255,255,0.6)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                }}
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '24px 28px 28px' }}>
              {step === 'form' ? (
                <form onSubmit={handleSubmit}>
                  {/* Name & Phone Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                    <div>
                      <label style={labelStyle}>
                        <User size={11} /> Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={form.name}
                        onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                        style={inputStyle}
                        onFocus={e => {
                          e.target.style.borderColor = '#54ACBF';
                          e.target.style.background = 'rgba(84,172,191,0.08)';
                        }}
                        onBlur={e => {
                          e.target.style.borderColor = 'rgba(167,235,242,0.18)';
                          e.target.style.background = 'rgba(255,255,255,0.04)';
                        }}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>
                        <Phone size={11} /> Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                        style={inputStyle}
                        onFocus={e => {
                          e.target.style.borderColor = '#54ACBF';
                          e.target.style.background = 'rgba(84,172,191,0.08)';
                        }}
                        onBlur={e => {
                          e.target.style.borderColor = 'rgba(167,235,242,0.18)';
                          e.target.style.background = 'rgba(255,255,255,0.04)';
                        }}
                      />
                    </div>
                  </div>

                  {/* Date & Time Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '12px', marginBottom: '14px' }}>
                    <div>
                      <label style={labelStyle}>
                        <Calendar size={11} /> Date
                      </label>
                      <input
                        type="date"
                        required
                        min={new Date().toISOString().split('T')[0]}
                        value={form.date}
                        onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
                        style={{ ...inputStyle, colorScheme: 'dark' }}
                        onFocus={e => {
                          e.target.style.borderColor = '#54ACBF';
                          e.target.style.background = 'rgba(84,172,191,0.08)';
                        }}
                        onBlur={e => {
                          e.target.style.borderColor = 'rgba(167,235,242,0.18)';
                          e.target.style.background = 'rgba(255,255,255,0.04)';
                        }}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>
                        <Clock size={11} /> Time
                      </label>
                      <input
                        type="time"
                        required
                        value={form.time}
                        onChange={e => setForm(p => ({ ...p, time: e.target.value }))}
                        style={{ ...inputStyle, colorScheme: 'dark' }}
                        onFocus={e => {
                          e.target.style.borderColor = '#54ACBF';
                          e.target.style.background = 'rgba(84,172,191,0.08)';
                        }}
                        onBlur={e => {
                          e.target.style.borderColor = 'rgba(167,235,242,0.18)';
                          e.target.style.background = 'rgba(255,255,255,0.04)';
                        }}
                      />
                    </div>
                  </div>

                  {/* Party Size */}
                  <div style={{ marginBottom: '14px' }}>
                    <label style={labelStyle}>
                      <Users size={11} /> Party Size (Guests)
                    </label>
                    <select
                      value={form.party}
                      onChange={e => setForm(p => ({ ...p, party: e.target.value }))}
                      style={{
                        ...inputStyle,
                        cursor: 'pointer',
                        colorScheme: 'dark',
                      }}
                      onFocus={e => {
                        e.target.style.borderColor = '#54ACBF';
                        e.target.style.background = 'rgba(84,172,191,0.08)';
                      }}
                      onBlur={e => {
                        e.target.style.borderColor = 'rgba(167,235,242,0.18)';
                        e.target.style.background = 'rgba(255,255,255,0.04)';
                      }}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map(n => (
                        <option key={n} value={n} style={{ background: '#040d1e', color: '#fff' }}>
                          {n} {n === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Special Note */}
                  <div style={{ marginBottom: '22px' }}>
                    <label style={labelStyle}>
                      <MessageSquare size={11} /> Special Requests (Optional)
                    </label>
                    <textarea
                      placeholder="Birthday celebration, anniversary, corner booth..."
                      rows={2}
                      value={form.note}
                      onChange={e => setForm(p => ({ ...p, note: e.target.value }))}
                      style={{ ...inputStyle, resize: 'none', lineHeight: 1.5 }}
                      onFocus={e => {
                        e.target.style.borderColor = '#54ACBF';
                        e.target.style.background = 'rgba(84,172,191,0.08)';
                      }}
                      onBlur={e => {
                        e.target.style.borderColor = 'rgba(167,235,242,0.18)';
                        e.target.style.background = 'rgba(255,255,255,0.04)';
                      }}
                    />
                  </div>

                  {/* Submit WhatsApp Button */}
                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      padding: '14px',
                      borderRadius: '50px',
                      background: '#25D366',
                      border: 'none',
                      color: '#fff',
                      fontFamily: '"Outfit", sans-serif',
                      fontSize: '13px',
                      fontWeight: 700,
                      letterSpacing: '0.05em',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 8px 24px rgba(37,211,102,0.4)',
                      transition: 'all 0.25s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'scale(1.02) translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 12px 30px rgba(37,211,102,0.55)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'scale(1) translateY(0)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(37,211,102,0.4)';
                    }}
                  >
                    <span>Send Booking to Owner via WhatsApp</span>
                  </button>

                  <p
                    style={{
                      textAlign: 'center',
                      marginTop: '10px',
                      fontSize: '11px',
                      color: 'rgba(255,255,255,0.4)',
                      fontFamily: '"Outfit", sans-serif',
                    }}
                  >
                    Opens WhatsApp with your details pre-formatted for direct confirmation.
                  </p>
                </form>
              ) : (
                /* Success View */
                <div style={{ textAlign: 'center', padding: '16px 0 8px' }}>
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #26658C, #54ACBF)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 18px',
                      boxShadow: '0 0 30px rgba(167,235,242,0.4)',
                    }}
                  >
                    <Check size={28} color="#fff" />
                  </div>
                  <h3
                    style={{
                      fontFamily: '"Playfair Display", serif',
                      fontSize: '22px',
                      fontWeight: 700,
                      color: '#fff',
                      margin: '0 0 8px',
                    }}
                  >
                    Reservation Sent!
                  </h3>
                  <p
                    style={{
                      fontSize: '13px',
                      color: 'rgba(255,255,255,0.65)',
                      margin: '0 0 20px',
                      lineHeight: 1.6,
                      fontFamily: '"Outfit", sans-serif',
                    }}
                  >
                    Your table details have been transmitted directly to The Aura Corner management via WhatsApp. We will confirm shortly.
                  </p>

                  <button
                    onClick={() => {
                      onClose();
                      setStep('form');
                    }}
                    style={{
                      padding: '12px 32px',
                      borderRadius: '50px',
                      background: 'linear-gradient(135deg, #26658C, #54ACBF)',
                      border: '1px solid rgba(167,235,242,0.3)',
                      color: '#fff',
                      fontFamily: '"Outfit", sans-serif',
                      fontSize: '12px',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      cursor: 'pointer',
                    }}
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </>
    )}
  </AnimatePresence>
  );
};
