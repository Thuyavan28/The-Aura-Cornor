import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Search, MessageCircle, Star, MapPin, Clock,
  Coffee, ArrowRight
} from 'lucide-react';
import heroCupImg from '../assets/hero-cup-clean.png';

interface HeroProps {
  onOpenReservation: () => void;
}

/* ─── User-provided Signature Blue Coffee Art Cup ───────────────────────── */
const HERO_COFFEE_IMG = heroCupImg;

/* ─── Floating glow dot ─────────────────────────────────────────────────── */
const GlowDot: React.FC<{ x: string; y: string; size: number; delay: number }> = ({
  x, y, size, delay,
}) => (
  <motion.div
    style={{
      position: 'absolute', left: x, top: y,
      width: size, height: size, borderRadius: '50%',
      background: 'rgba(167,235,242,0.85)',
      boxShadow: `0 0 ${size * 3}px rgba(167,235,242,0.6)`,
      pointerEvents: 'none', zIndex: 4,
    }}
    animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], y: [0, -50] }}
    transition={{ duration: 3.5, delay, repeat: Infinity, repeatDelay: Math.random() * 3 + 1 }}
  />
);

/* ─── Wave SVG ──────────────────────────────────────────────────────────── */
const WaveBg: React.FC = () => (
  <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice"
    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
    <defs>
      <radialGradient id="rg1" cx="75%" cy="50%" r="55%">
        <stop offset="0%" stopColor="#023859" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#011C40" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="rg2" cx="90%" cy="70%" r="45%">
        <stop offset="0%" stopColor="#26658C" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#011C40" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="rg3" cx="95%" cy="90%" r="35%">
        <stop offset="0%" stopColor="#54ACBF" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#011C40" stopOpacity="0" />
      </radialGradient>
    </defs>
    <ellipse cx="1120" cy="420" rx="460" ry="420" fill="url(#rg1)" />
    <ellipse cx="1320" cy="620" rx="320" ry="300" fill="url(#rg2)" />
    <ellipse cx="1400" cy="800" rx="200" ry="180" fill="url(#rg3)" />

    <path d="M880 0 C 980 140 840 300 960 420 C 1080 540 1240 420 1340 580 C 1420 700 1380 840 1440 900 L1440 0Z"
      fill="#023859" fillOpacity="0.45" />
    <path d="M1020 0 C 1120 120 1000 260 1100 380 C 1200 500 1360 400 1420 560 L1440 560 1440 0Z"
      fill="#26658C" fillOpacity="0.22" />
  </svg>
);

/* ─── Stat pill ─────────────────────────────────────────────────────────── */
const StatPill: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: '7px',
    padding: '8px 16px', borderRadius: '50px',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.08)',
    backdropFilter: 'blur(8px)',
  }}>
    {icon}
    <span style={{ fontFamily: '"Outfit", sans-serif', fontSize: '11px', fontWeight: 500, color: 'rgba(255,255,255,0.85)' }}>{text}</span>
  </div>
);

/* ─── Ticker Items (Infinite Left-to-Right Marquee) ─────────────────────── */
const TICKER_ITEMS = [
  'Ready in Minutes',
  'Safe Packaging',
  'Fast Delivery',
  'Great Taste',
  'Artisanal Coffee',
  'Handcrafted Boba',
  'Sizzling Loaded Fries',
  'Gourmet Bowls',
  'Freshly Crafted Daily',
  '100% Quality Ingredients',
  'Peaceful Ambience',
];

/* ─── Hero ──────────────────────────────────────────────────────────────── */
export const Hero: React.FC<HeroProps> = ({ onOpenReservation }) => {
  const imgRef = useRef<HTMLDivElement>(null);

  /* Mouse parallax on coffee image */
  useEffect(() => {
    const el = imgRef.current; if (!el) return;
    const move = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 14;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      el.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);

  const dots = [
    { x: '6%', y: '78%', size: 5, delay: 0 }, { x: '14%', y: '60%', size: 4, delay: 0.7 },
    { x: '22%', y: '42%', size: 6, delay: 1.4 }, { x: '38%', y: '72%', size: 3, delay: 0.3 },
    { x: '58%', y: '82%', size: 5, delay: 1.9 }, { x: '72%', y: '28%', size: 4, delay: 0.9 },
    { x: '84%', y: '62%', size: 6, delay: 2.2 }, { x: '92%', y: '48%', size: 3, delay: 1.1 },
  ];

  /* Animation variants */
  const fromTop    = { hidden: { y: -60, opacity: 0 }, show: { y: 0, opacity: 1 } };
  const fromBottom = { hidden: { y: 60, opacity: 0  }, show: { y: 0, opacity: 1 } };
  const fromLeft   = { hidden: { x: -70, opacity: 0 }, show: { x: 0, opacity: 1 } };
  const fromRight  = { hidden: { x: 70, opacity: 0  }, show: { x: 0, opacity: 1 } };

  const ease = [0.25, 0.46, 0.45, 0.94] as const;

  return (
    <section id="hero" style={{
      position: 'relative', minHeight: '100vh',
      background: 'linear-gradient(140deg, #010e22 0%, #011830 45%, #011C40 100%)',
      overflow: 'hidden', display: 'flex', flexDirection: 'column',
    }}>
      <WaveBg />
      {dots.map((d, i) => <GlowDot key={i} {...d} />)}

      {/* ── INTEGRATED NAVBAR ─────────────────────────────────────────── */}
      <motion.div
        variants={fromTop}
        initial="hidden"
        animate="show"
        transition={{ duration: 0.6, ease }}
        style={{
          position: 'relative', zIndex: 20,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px clamp(20px, 4vw, 64px)',
          borderBottom: '1px solid rgba(167,235,242,0.06)',
        }}
      >
        {/* Logo with Coffee Cup Icon */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '42px', height: '42px', borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, #26658C 0%, #54ACBF 60%, #A7EBF2 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 24px rgba(167,235,242,0.6), 0 0 60px rgba(84,172,191,0.3)',
          }}>
            <Coffee size={20} color="#011026" strokeWidth={2.5} />
          </div>
          <div>
            <div style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(17px, 2.5vw, 20px)', fontWeight: 700, color: '#fff',
              lineHeight: 1, letterSpacing: '-0.01em',
              textShadow: '0 0 20px rgba(167,235,242,0.5)',
            }}>
              The Aura Corner
            </div>
            <div style={{
              fontFamily: '"Outfit", sans-serif',
              fontSize: '9px', fontWeight: 600, letterSpacing: '0.22em',
              textTransform: 'uppercase',
              background: 'linear-gradient(90deg, #A7EBF2, #54ACBF)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginTop: '3px',
            }}>
              Boutique Lounge & Café
            </div>
          </div>
        </div>

        {/* Desktop Nav Links (Hidden on Mobile) */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="hide-mobile">
          {['Home', 'Menu', 'About', 'Reviews', 'Connect', 'Visit'].map((l, i) => (
            <a key={l} href={`#${l === 'Home' ? 'hero' : l.toLowerCase()}`} style={{
              padding: '8px 18px', borderRadius: '50px',
              fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em',
              textDecoration: 'none',
              color: i === 0 ? '#A7EBF2' : 'rgba(255,255,255,0.6)',
              background: i === 0 ? 'rgba(167,235,242,0.08)' : 'transparent',
              border: i === 0 ? '1px solid rgba(167,235,242,0.25)' : '1px solid transparent',
              transition: 'all 0.25s ease',
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = '#A7EBF2';
                (e.currentTarget as HTMLElement).style.background = 'rgba(167,235,242,0.06)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = i === 0 ? '#A7EBF2' : 'rgba(255,255,255,0.6)';
                (e.currentTarget as HTMLElement).style.background = i === 0 ? 'rgba(167,235,242,0.08)' : 'transparent';
              }}
            >
              {l}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <a
            href="#menu"
            className="hide-mobile"
            style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: '8px',
              color: 'rgba(255,255,255,0.5)', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              textDecoration: 'none',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#A7EBF2'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.background = 'none'; }}
          >
            <Search size={17} />
          </a>
          <button onClick={onOpenReservation} style={{
            padding: '9px 20px', borderRadius: '50px',
            background: 'linear-gradient(135deg, #26658C, #54ACBF)',
            border: '1px solid rgba(167,235,242,0.3)',
            color: '#fff', fontFamily: '"Outfit", sans-serif',
            fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em',
            cursor: 'pointer', transition: 'all 0.3s ease',
            boxShadow: '0 4px 20px rgba(38,101,140,0.5)',
            whiteSpace: 'nowrap',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(84,172,191,0.55)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(38,101,140,0.5)'; }}>
            Book Table
          </button>
        </div>
      </motion.div>

      {/* ── HERO BODY (Responsive Grid) ────────────────────────────────── */}
      <div
        className="hero-body-grid"
        style={{
          flex: 1,
          padding: '24px clamp(20px, 4vw, 64px) 36px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* ─ LEFT COLUMN: Text shifted toward center & left-bottom ─ */}
        <div className="hero-left-col" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {/* Eyebrow — from TOP */}
          <motion.div
            variants={fromTop} initial="hidden" animate="show"
            transition={{ duration: 0.6, delay: 0.15, ease }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}
          >
            <div style={{ width: '28px', height: '2px', background: 'linear-gradient(90deg, #A7EBF2, transparent)', borderRadius: '2px' }} />
            <span style={{
              fontFamily: '"Outfit", sans-serif',
              fontSize: '11px', fontWeight: 700, letterSpacing: '0.25em',
              textTransform: 'uppercase', color: '#A7EBF2',
              textShadow: '0 0 14px rgba(167,235,242,0.6)',
            }}>
              Chennai’s Finest Lounge Café
            </span>
          </motion.div>

          {/* H1 — from LEFT */}
          <motion.div
            variants={fromLeft} initial="hidden" animate="show"
            transition={{ duration: 0.75, delay: 0.25, ease }}
          >
            <h1 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(42px, 7.5vw, 92px)',
              fontWeight: 700, color: '#fff', lineHeight: 0.95,
              margin: '0 0 4px', letterSpacing: '-0.025em',
              textShadow: '0 4px 40px rgba(0,0,0,0.5)',
            }}>
              The Aura
            </h1>
            <h1 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(42px, 7.5vw, 92px)',
              fontWeight: 400, fontStyle: 'italic', lineHeight: 0.95,
              margin: '0 0 20px', letterSpacing: '-0.025em',
              background: 'linear-gradient(135deg, #A7EBF2 0%, #54ACBF 55%, #26658C 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              filter: 'drop-shadow(0 0 20px rgba(167,235,242,0.45))',
            }}>
              Corner
            </h1>
          </motion.div>

          {/* Updated Tagline Wordings — from BOTTOM */}
          <motion.p
            variants={fromBottom} initial="hidden" animate="show"
            transition={{ duration: 0.65, delay: 0.35, ease }}
            style={{
              fontFamily: '"Outfit", sans-serif',
              fontSize: 'clamp(13px, 1.6vw, 15px)', fontWeight: 300, lineHeight: 1.8,
              color: 'rgba(255,255,255,0.7)', maxWidth: '490px', margin: '0 0 24px',
            }}
          >
            A stylish café where great taste meets a relaxing atmosphere. Enjoy artisanal coffee, handcrafted boba, sizzling loaded fries, gourmet bowls, and delicious pasta, all served in a warm and inviting setting.
          </motion.p>

          {/* Stats row — from LEFT */}
          <motion.div
            variants={fromLeft} initial="hidden" animate="show"
            transition={{ duration: 0.6, delay: 0.45, ease }}
            className="hero-stats-row"
            style={{ display: 'flex', gap: '8px', marginBottom: '28px', flexWrap: 'wrap' }}
          >
            <StatPill
              icon={<>{[1,2,3,4,5].map(i => <Star key={i} size={10} color="#fbbf24" fill="#fbbf24" />)}</>}
              text="5.0 (8 Google reviews)"
            />
            <StatPill icon={<MapPin size={12} color="#54ACBF" />} text="Medavakkam, Chennai" />
            <StatPill icon={<Clock size={12} color="#54ACBF" />} text="11 AM – 11 PM Daily" />
          </motion.div>

          {/* CTA Buttons — from BOTTOM */}
          <motion.div
            variants={fromBottom} initial="hidden" animate="show"
            transition={{ duration: 0.6, delay: 0.55, ease }}
            className="hero-cta-row"
            style={{ display: 'flex', gap: '12px', alignItems: 'center' }}
          >
            <motion.button
              onClick={onOpenReservation}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '13px 30px', borderRadius: '50px',
                background: 'linear-gradient(135deg, #26658C 0%, #54ACBF 100%)',
                border: '1px solid rgba(167,235,242,0.3)',
                color: '#fff', fontFamily: '"Outfit", sans-serif',
                fontSize: '12px', fontWeight: 700, letterSpacing: '0.07em',
                cursor: 'pointer',
                boxShadow: '0 8px 30px rgba(38,101,140,0.55), 0 0 20px rgba(167,235,242,0.15)',
              }}
            >
              <MessageCircle size={15} />
              <span>Book Your Table</span>
            </motion.button>

            <motion.a
              href="#menu"
              whileHover={{ scale: 1.04, x: 4 }}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '13px 26px', borderRadius: '50px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(167,235,242,0.22)',
                color: 'rgba(255,255,255,0.75)',
                fontFamily: '"Outfit", sans-serif', fontSize: '12px', fontWeight: 600,
                textDecoration: 'none', cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = '#A7EBF2';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(167,235,242,0.5)';
                (e.currentTarget as HTMLElement).style.background = 'rgba(167,235,242,0.08)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.75)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(167,235,242,0.22)';
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
              }}
            >
              <span>Explore Menu</span>
              <ArrowRight size={14} />
            </motion.a>
          </motion.div>
        </div>

        {/* ─ RIGHT COLUMN: Cup Illustration + Brand Quote ─ */}
        <div style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {/* Ambient lighting glow tuned to the image's blue tone */}
          <div style={{
            position: 'absolute',
            width: 'clamp(280px, 40vw, 450px)',
            height: 'clamp(280px, 40vw, 450px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(84,172,191,0.25) 0%, rgba(2,56,89,0.12) 50%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Pure clean image with smooth parallax */}
          <motion.div
            ref={imgRef}
            variants={fromRight} initial="hidden" animate="show"
            transition={{ duration: 0.85, delay: 0.3, ease }}
            style={{
              position: 'relative',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              transition: 'transform 0.6s ease-out',
            }}
          >
            {/* Cup Image with floating animation */}
            <motion.div
              animate={{ y: [0, -14, 0], rotate: [0, 1.5, -1.5, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
            >
              <img
                src={HERO_COFFEE_IMG}
                alt="The Aura Corner Signature Blue Coffee Art"
                style={{
                  width: 'clamp(220px, 30vw, 320px)',
                  maxHeight: '440px',
                  objectFit: 'contain',
                  display: 'block',
                  filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.65)) drop-shadow(0 0 35px rgba(84,172,191,0.35))',
                }}
              />
            </motion.div>

            {/* ── QUOTE BELOW IMAGE (Requested by User) ── */}
            <motion.div
              variants={fromBottom}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.7, delay: 0.6 }}
              style={{
                marginTop: '16px',
                textAlign: 'center',
                padding: '12px 24px',
                borderRadius: '50px',
                background: 'rgba(1, 28, 64, 0.45)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(167,235,242,0.18)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.35), 0 0 20px rgba(84,172,191,0.1)',
                maxWidth: '340px',
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontStyle: 'italic',
                  fontSize: 'clamp(13px, 1.8vw, 15px)',
                  fontWeight: 500,
                  color: '#A7EBF2',
                  lineHeight: 1.5,
                  textShadow: '0 0 16px rgba(167,235,242,0.4)',
                }}
              >
                "Where coffee meets calm<br />
                And hearts find a home"
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── INFINITE MOVING TICKER (Left to Right, Matching Reference Image 1) ── */}
      <motion.div
        variants={fromBottom} initial="hidden" animate="show"
        transition={{ duration: 0.6, delay: 0.7, ease }}
        style={{
          position: 'relative',
          zIndex: 20,
          overflow: 'hidden',
          borderTop: '1px solid rgba(167,235,242,0.12)',
          background: 'linear-gradient(90deg, #010a18 0%, #01142a 50%, #010a18 100%)',
          padding: '12px 0',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: 'max-content',
            animation: 'marqueeLeftToRight 28s linear infinite',
            userSelect: 'none',
          }}
        >
          {/* Repeat list for seamless infinite looping */}
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((text, idx) => (
            <div
              key={idx}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '14px',
                padding: '0 20px',
                whiteSpace: 'nowrap',
              }}
            >
              <span
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontStyle: 'italic',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.92)',
                  letterSpacing: '0.02em',
                }}
              >
                {text}
              </span>
              <span style={{ color: '#54ACBF', fontSize: '12px', opacity: 0.75 }}>✦</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
