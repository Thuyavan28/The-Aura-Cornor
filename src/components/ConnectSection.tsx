import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Globe, MapPin, MessageCircle, Sparkles, ArrowUpRight } from 'lucide-react';
import auraLogo from '../assets/aura-logo.jpg';
import { Reveal } from './Reveal';

export const ConnectSection: React.FC = () => {
  const address = '7/518, Velachery Main Rd, Vijayanagaram, Santhosapuram, Medavakkam, Chennai, Tamil Nadu 600100';
  const whatsappUrl = `https://wa.me/919444012345?text=${encodeURIComponent("Hi! I'd like to connect with The Aura Corner in Medavakkam, Chennai.")}`;

  // Floating background emojis from the reference
  const floatingIcons = [
    { emoji: '🍔', top: '15%', left: '4%', size: '28px', delay: 0 },
    { emoji: '🍟', bottom: '18%', left: '5%', size: '26px', delay: 1 },
    { emoji: '🥤', top: '35%', right: '4%', size: '26px', delay: 1.5 },
    { emoji: '🥟', bottom: '32%', right: '7%', size: '24px', delay: 0.5 },
    { emoji: '☕', top: '10%', right: '35%', size: '22px', delay: 2 },
  ];

  return (
    <section
      id="connect"
      style={{
        backgroundColor: '#010e22',
        color: '#fff',
        padding: 'clamp(60px, 8vw, 110px) 0',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(167,235,242,0.06)',
      }}
    >
      {/* Background ambient lighting */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          right: '15%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(84,172,191,0.18) 0%, rgba(2,56,89,0.1) 50%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Floating subtle food icons matching reference */}
      {floatingIcons.map((item, idx) => (
        <motion.div
          key={idx}
          animate={{ y: [0, -12, 0], rotate: [0, 6, -6, 0] }}
          transition={{ duration: 5 + idx, repeat: Infinity, ease: 'easeInOut', delay: item.delay }}
          style={{
            position: 'absolute',
            top: item.top,
            bottom: item.bottom,
            left: item.left,
            right: item.right,
            fontSize: item.size,
            opacity: 0.22,
            filter: 'drop-shadow(0 0 10px rgba(167,235,242,0.2))',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        >
          {item.emoji}
        </motion.div>
      ))}

      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '0 clamp(20px, 4vw, 40px)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div className="connect-body-grid">
          {/* ── LEFT COLUMN: Text & Info ── */}
          <div>
            <Reveal direction="left">
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 16px',
                  borderRadius: '50px',
                  background: 'rgba(167,235,242,0.06)',
                  border: '1px solid rgba(167,235,242,0.2)',
                  marginBottom: '18px',
                }}
              >
                <Sparkles size={13} color="#A7EBF2" />
                <span
                  style={{
                    fontFamily: '"Outfit", sans-serif',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#A7EBF2',
                  }}
                >
                  GET IN TOUCH
                </span>
              </div>
            </Reveal>

            {/* Big Headline */}
            <Reveal direction="left" delay={0.1}>
              <h2
                style={{
                  fontFamily: '"Outfit", sans-serif',
                  fontSize: 'clamp(36px, 5.5vw, 68px)',
                  fontWeight: 800,
                  color: '#fff',
                  lineHeight: 1.05,
                  margin: '0 0 18px',
                  letterSpacing: '-0.02em',
                  textTransform: 'uppercase',
                }}
              >
                LET'S CONNECT
              </h2>
            </Reveal>

            {/* Description */}
            <Reveal direction="left" delay={0.2}>
              <p
                style={{
                  fontFamily: '"Outfit", sans-serif',
                  fontSize: 'clamp(13px, 1.6vw, 15px)',
                  fontWeight: 300,
                  lineHeight: 1.8,
                  color: 'rgba(255,255,255,0.65)',
                  maxWidth: '480px',
                  margin: '0 0 32px',
                }}
              >
                We're always delighted to welcome you to our cozy corner. Have a question, table reservation, or special occasion? Scan the logo or message us directly on WhatsApp.
              </p>
            </Reveal>

            {/* Contact Rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
              {/* Phone */}
              <Reveal direction="left" delay={0.25}>
                <a
                  href="tel:+919444012345"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    textDecoration: 'none',
                    color: '#fff',
                    transition: 'transform 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'translateX(4px)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'translateX(0)')}
                >
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      background: 'rgba(239,68,68,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Phone size={17} color="#ef4444" />
                  </div>
                  <span
                    style={{
                      fontFamily: '"Outfit", sans-serif',
                      fontSize: 'clamp(14px, 1.8vw, 16px)',
                      fontWeight: 600,
                      color: 'rgba(255,255,255,0.9)',
                    }}
                  >
                    +91 94440 12345
                  </span>
                </a>
              </Reveal>

              {/* Website */}
              <Reveal direction="left" delay={0.3}>
                <a
                  href="#hero"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    textDecoration: 'none',
                    color: '#fff',
                    transition: 'transform 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'translateX(4px)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'translateX(0)')}
                >
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      background: 'rgba(239,68,68,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Globe size={17} color="#ef4444" />
                  </div>
                  <span
                    style={{
                      fontFamily: '"Outfit", sans-serif',
                      fontSize: 'clamp(14px, 1.8vw, 16px)',
                      fontWeight: 600,
                      color: 'rgba(255,255,255,0.9)',
                    }}
                  >
                    theauracorner.cafe
                  </span>
                </a>
              </Reveal>

              {/* Address */}
              <Reveal direction="left" delay={0.35}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      background: 'rgba(239,68,68,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px',
                    }}
                  >
                    <MapPin size={17} color="#ef4444" />
                  </div>
                  <span
                    style={{
                      fontFamily: '"Outfit", sans-serif',
                      fontSize: 'clamp(13px, 1.5vw, 14px)',
                      fontWeight: 400,
                      color: 'rgba(255,255,255,0.75)',
                      lineHeight: 1.6,
                      maxWidth: '420px',
                    }}
                  >
                    {address}
                  </span>
                </div>
              </Reveal>
            </div>

            {/* WhatsApp CTA Button */}
            <Reveal direction="left" delay={0.4}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '15px 32px',
                  borderRadius: '50px',
                  background: '#25D366',
                  color: '#fff',
                  fontFamily: '"Outfit", sans-serif',
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  textDecoration: 'none',
                  boxShadow: '0 8px 30px rgba(37,211,102,0.4)',
                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'scale(1.04) translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 36px rgba(37,211,102,0.55)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'scale(1) translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(37,211,102,0.4)';
                }}
              >
                <MessageCircle size={17} />
                <span>Chat on WhatsApp</span>
                <ArrowUpRight size={15} />
              </a>
            </Reveal>
          </div>

          {/* ── RIGHT COLUMN: Framed Logo Card ── */}
          <Reveal direction="right" delay={0.2}>
            <div
              style={{
                borderRadius: '28px',
                background: '#040b17',
                border: '1px solid rgba(255,255,255,0.08)',
                padding: 'clamp(28px, 4vw, 44px) clamp(20px, 3vw, 36px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                boxShadow: '0 24px 60px rgba(0,0,0,0.6), 0 0 40px rgba(84,172,191,0.1)',
                position: 'relative',
              }}
            >
              {/* Card Title */}
              <h3
                style={{
                  fontFamily: '"Outfit", sans-serif',
                  fontSize: 'clamp(15px, 2vw, 18px)',
                  fontWeight: 800,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#fff',
                  margin: '0 0 24px',
                }}
              >
                CONNECT WITH US
              </h3>

              {/* Circular Logo Visual with Gold/Teal Aura Ring */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{
                    position: 'relative',
                    width: 'clamp(180px, 25vw, 240px)',
                    height: 'clamp(180px, 25vw, 240px)',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    background: '#fff',
                    padding: '6px',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.5), 0 0 40px rgba(167,235,242,0.3)',
                    border: '2px solid rgba(167,235,242,0.4)',
                    cursor: 'pointer',
                    marginBottom: '24px',
                  }}
                >
                  <img
                    src={auraLogo}
                    alt="The Aura Corner Logo"
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </motion.div>
              </a>

              {/* Caption */}
              <p
                style={{
                  fontFamily: '"Outfit", sans-serif',
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.5)',
                  margin: 0,
                  maxWidth: '280px',
                  lineHeight: 1.5,
                }}
              >
                Scan or tap with your phone to instantly chat with us on WhatsApp.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
