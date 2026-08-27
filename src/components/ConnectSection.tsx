import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Globe, MapPin, MessageCircle, Sparkles, ArrowUpRight } from 'lucide-react';
import auraLogo from '../assets/aura-logo.jpg';
import { Reveal } from './Reveal';

export const ConnectSection: React.FC = () => {
  const address = '7/518, Velachery Main Rd, Vijayanagaram, Santhosapuram, Medavakkam, Chennai, Tamil Nadu 600100';
  const whatsappUrl = `https://wa.me/919790921125?text=${encodeURIComponent("Hi! I'd like to connect with The Aura Corner in Medavakkam, Chennai.")}`;

  // Floating background emojis
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
        backgroundColor: '#FFF8DC',
        color: '#4A3325',
        padding: 'clamp(60px, 8vw, 110px) 0',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid #E8D3B0',
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
          background: 'radial-gradient(circle, rgba(255,233,168,0.55) 0%, rgba(232,211,176,0.2) 50%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Floating subtle food icons */}
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
            opacity: 0.25,
            filter: 'drop-shadow(0 0 10px rgba(212,167,44,0.3))',
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
                  background: '#FFE9A8',
                  border: '1px solid #D4A72C',
                  marginBottom: '18px',
                }}
              >
                <Sparkles size={13} color="#E8893A" />
                <span
                  style={{
                    fontFamily: '"Outfit", sans-serif',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#4A3325',
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
                  color: '#4A3325',
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
                  fontWeight: 400,
                  lineHeight: 1.8,
                  color: '#7A5C43',
                  maxWidth: '480px',
                  margin: '0 0 32px',
                }}
              >
                We’re always delighted to welcome you. Have a question, table reservation, or a special occasion in mind? Message us directly on WhatsApp — we reply fast!
              </p>
            </Reveal>

            {/* Contact Rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
              {/* Phone */}
              <Reveal direction="left" delay={0.25}>
                <a
                  href="tel:+919790921125"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    textDecoration: 'none',
                    color: '#4A3325',
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
                      background: '#FFE9A8',
                      border: '1px solid #D4A72C',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Phone size={17} color="#E8893A" />
                  </div>
                  <span
                    style={{
                      fontFamily: '"Outfit", sans-serif',
                      fontSize: 'clamp(14px, 1.8vw, 16px)',
                      fontWeight: 700,
                      color: '#4A3325',
                    }}
                  >
                    +91 97909 21125
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
                    color: '#4A3325',
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
                      background: '#FFE9A8',
                      border: '1px solid #D4A72C',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Globe size={17} color="#E8893A" />
                  </div>
                  <span
                    style={{
                      fontFamily: '"Outfit", sans-serif',
                      fontSize: 'clamp(14px, 1.8vw, 16px)',
                      fontWeight: 700,
                      color: '#4A3325',
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
                      background: '#FFE9A8',
                      border: '1px solid #D4A72C',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px',
                    }}
                  >
                    <MapPin size={17} color="#E8893A" />
                  </div>
                  <span
                    style={{
                      fontFamily: '"Outfit", sans-serif',
                      fontSize: 'clamp(13px, 1.5vw, 14px)',
                      fontWeight: 500,
                      color: '#7A5C43',
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
                  color: '#FFFDF5',
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
                background: '#E8D3B0',
                border: '2px solid #D4A72C',
                padding: 'clamp(28px, 4vw, 44px) clamp(20px, 3vw, 36px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                boxShadow: '0 24px 60px rgba(74, 51, 37, 0.15)',
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
                  color: '#4A3325',
                  margin: '0 0 24px',
                }}
              >
                CONNECT WITH US
              </h3>

              {/* Decorative Circular Logo */}
              <motion.div
                animate={{ scale: [1, 1.02, 1], rotate: [0, 1, -1, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'relative',
                  width: 'clamp(160px, 22vw, 220px)',
                  height: 'clamp(160px, 22vw, 220px)',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  background: '#FFFDF5',
                  padding: '6px',
                  boxShadow: '0 12px 40px rgba(74, 51, 37, 0.2), 0 0 40px rgba(212,167,44,0.3)',
                  border: '3px solid #D4A72C',
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

              {/* Social handle / contact info */}
              <p
                style={{
                  fontFamily: '"Outfit", sans-serif',
                  fontSize: '13px',
                  color: '#E8893A',
                  margin: '0 0 6px',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                }}
              >
                @the_aura_corner_2026
              </p>
              <p
                style={{
                  fontFamily: '"Outfit", sans-serif',
                  fontSize: '11px',
                  color: '#7A5C43',
                  margin: 0,
                  lineHeight: 1.5,
                  fontWeight: 500,
                }}
              >
                Medavakkam, Chennai
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
