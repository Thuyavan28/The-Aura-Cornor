import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  MessageCircle, Star, MapPin, Clock,
  ArrowRight
} from 'lucide-react';
import heroCupImg from '../assets/hero-cup-clean.png';

interface HeroProps {
  onOpenReservation: () => void;
}

/* ─── Signature Coffee Art Cup ──────────────────────────────────────────── */
const HERO_COFFEE_IMG = heroCupImg;

/* ─── Floating glow dot ─────────────────────────────────────────────────── */
const GlowDot: React.FC<{ x: string; y: string; size: number; delay: number }> = ({
  x, y, size, delay,
}) => (
  <motion.div
    style={{
      position: 'absolute', left: x, top: y,
      width: size, height: size, borderRadius: '50%',
      background: 'rgba(255, 233, 168, 0.9)',
      boxShadow: `0 0 ${size * 3}px rgba(232, 137, 58, 0.8)`,
      pointerEvents: 'none', zIndex: 4,
    }}
    animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], y: [0, -50] }}
    transition={{ duration: 3.5, delay, repeat: Infinity, repeatDelay: Math.random() * 3 + 1 }}
  />
);

/* ─── Wave SVG Background with Dark Orange / Warm Orange Wave ─────────────── */
const WaveBg: React.FC = () => (
  <svg
    viewBox="0 0 1440 900"
    preserveAspectRatio="xMidYMid slice"
    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
  >
    <defs>
      {/* Primary Rich Dark Orange Gradient for the right wave */}
      <linearGradient id="heroDarkOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F2994A" stopOpacity="0.95" />
        <stop offset="35%" stopColor="#E8893A" stopOpacity="0.95" />
        <stop offset="70%" stopColor="#D47225" stopOpacity="0.98" />
        <stop offset="100%" stopColor="#C8641A" stopOpacity="1" />
      </linearGradient>

      {/* Layer 2: Deeper Accent Orange */}
      <linearGradient id="heroDeepOrangeLayer" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E8893A" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#B85310" stopOpacity="0.95" />
      </linearGradient>

      {/* Golden Highlight Rim */}
      <linearGradient id="heroGoldGlow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFE9A8" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#D4A72C" stopOpacity="0.4" />
      </linearGradient>

      {/* Soft ambient radial in the center */}
      <radialGradient id="heroCenterRadial" cx="80%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFE9A8" stopOpacity="0.4" />
        <stop offset="100%" stopColor="transparent" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Ambient radial glow under cup */}
    <ellipse cx="1120" cy="460" rx="420" ry="380" fill="url(#heroCenterRadial)" />

    {/* Secondary flowing wave layer */}
    <path
      d="M 940 0 C 1040 160, 860 360, 990 520 C 1100 660, 1260 740, 1440 820 L 1440 0 Z"
      fill="url(#heroDeepOrangeLayer)"
      opacity="0.6"
    />

    {/* Main Organic Curved Right Section (Marked with red line by user) */}
    <path
      d="M 820 0 C 930 170, 750 350, 880 520 C 970 650, 1160 670, 1370 740 C 1410 755, 1440 840, 1440 900 L 1440 0 Z"
      fill="url(#heroDarkOrangeGrad)"
    />

    {/* Elegant Gold Accent Outline Curve */}
    <path
      d="M 820 0 C 930 170, 750 350, 880 520 C 970 650, 1160 670, 1370 740 C 1410 755, 1440 840, 1440 900"
      fill="none"
      stroke="#FFE9A8"
      strokeWidth="3"
      strokeOpacity="0.65"
    />
  </svg>
);

/* ─── Stat pill ─────────────────────────────────────────────────────────── */
const StatPill: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: '7px',
    padding: '8px 16px', borderRadius: '50px',
    background: '#FFFDF5',
    border: '1.5px solid #E8D3B0',
    boxShadow: '0 2px 10px rgba(74, 51, 37, 0.06)',
  }}>
    {icon}
    <span style={{ fontFamily: '"Outfit", sans-serif', fontSize: '11px', fontWeight: 600, color: '#4A3325' }}>{text}</span>
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
      background: 'linear-gradient(140deg, #FFF8DC 0%, #FFFDF5 45%, #F7EEDB 100%)',
      overflow: 'hidden', display: 'flex', flexDirection: 'column',
    }}>
      <WaveBg />
      {dots.map((d, i) => <GlowDot key={i} {...d} />)}

      {/* Spacer for fixed navbar height */}
      <div style={{ height: '70px', flexShrink: 0 }} />

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
            <div style={{ width: '28px', height: '3px', background: 'linear-gradient(90deg, #E8893A, #D4A72C)', borderRadius: '2px' }} />
            <span style={{
              fontFamily: '"Outfit", sans-serif',
              fontSize: '11px', fontWeight: 800, letterSpacing: '0.25em',
              textTransform: 'uppercase', color: '#E8893A',
            }}>
              Chennai's Finest Lounge Café
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
              fontWeight: 700, color: '#4A3325', lineHeight: 0.95,
              margin: '0 0 4px', letterSpacing: '-0.025em',
            }}>
              The Aura
            </h1>
            <h1 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(42px, 7.5vw, 92px)',
              fontWeight: 400, fontStyle: 'italic', lineHeight: 0.95,
              margin: '0 0 20px', letterSpacing: '-0.025em',
              background: 'linear-gradient(135deg, #E8893A 0%, #D47225 50%, #C8641A 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Corner
            </h1>
          </motion.div>

          {/* Tagline — from BOTTOM */}
          <motion.p
            variants={fromBottom} initial="hidden" animate="show"
            transition={{ duration: 0.65, delay: 0.35, ease }}
            style={{
              fontFamily: '"Outfit", sans-serif',
              fontSize: 'clamp(13px, 1.6vw, 15px)', fontWeight: 400, lineHeight: 1.8,
              color: '#7A5C43', maxWidth: '490px', margin: '0 0 24px',
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
              icon={<>{[1,2,3,4,5].map(i => <Star key={i} size={11} color="#D4A72C" fill="#D4A72C" />)}</>}
              text="5.0 (8 Google reviews)"
            />
            <StatPill icon={<MapPin size={13} color="#E8893A" />} text="Medavakkam, Chennai" />
            <StatPill icon={<Clock size={13} color="#E8893A" />} text="11 AM – 11 PM Daily" />
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
                padding: '14px 32px', borderRadius: '50px',
                background: 'linear-gradient(135deg, #E8893A 0%, #C8641A 100%)',
                border: 'none',
                color: '#FFFDF5', fontFamily: '"Outfit", sans-serif',
                fontSize: '12px', fontWeight: 800, letterSpacing: '0.08em',
                cursor: 'pointer',
                boxShadow: '0 8px 30px rgba(232,137,58,0.45), 0 0 20px rgba(200,100,26,0.25)',
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
                background: '#FFFDF5',
                border: '1.5px solid #D4A72C',
                color: '#4A3325',
                fontFamily: '"Outfit", sans-serif', fontSize: '12px', fontWeight: 700,
                textDecoration: 'none', cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 10px rgba(74,51,37,0.06)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = '#FFE9A8';
                (e.currentTarget as HTMLElement).style.borderColor = '#E8893A';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = '#FFFDF5';
                (e.currentTarget as HTMLElement).style.borderColor = '#D4A72C';
              }}
            >
              <span>Explore Menu</span>
              <ArrowRight size={14} color="#E8893A" />
            </motion.a>
          </motion.div>
        </div>

        {/* ─ RIGHT COLUMN: Cup Illustration + Brand Quote on Dark Orange Backdrop ─ */}
        <div style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {/* Ambient lighting glow */}
          <div style={{
            position: 'absolute',
            width: 'clamp(280px, 40vw, 460px)',
            height: 'clamp(280px, 40vw, 460px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,233,168,0.4) 0%, rgba(232,137,58,0.2) 60%, transparent 80%)',
            pointerEvents: 'none',
          }} />

          {/* Cup image with smooth parallax */}
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
                alt="The Aura Corner Signature Warm Coffee Art"
                style={{
                  width: 'clamp(210px, 32vw, 360px)',
                  maxHeight: '460px',
                  objectFit: 'contain',
                  display: 'block',
                  filter: 'drop-shadow(0 20px 40px rgba(74,51,37,0.35)) drop-shadow(0 0 25px rgba(255,233,168,0.4))',
                }}
              />
            </motion.div>

            {/* Quote below image */}
            <motion.div
              variants={fromBottom}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.7, delay: 0.6 }}
              style={{
                marginTop: '18px',
                textAlign: 'center',
                padding: '12px 26px',
                borderRadius: '50px',
                background: '#FFFDF5',
                border: '1.5px solid #D4A72C',
                boxShadow: '0 12px 35px rgba(74, 51, 37, 0.16), 0 0 25px rgba(212,167,44,0.2)',
                maxWidth: '340px',
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontStyle: 'italic',
                  fontSize: 'clamp(13px, 1.8vw, 15px)',
                  fontWeight: 700,
                  color: '#4A3325',
                  lineHeight: 1.5,
                }}
              >
                "Where coffee meets calm<br />
                And hearts find a home"
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── INFINITE MOVING TICKER (Vibrant Warm Orange Theme) ── */}
      <motion.div
        variants={fromBottom} initial="hidden" animate="show"
        transition={{ duration: 0.6, delay: 0.7, ease }}
        style={{
          position: 'relative',
          zIndex: 20,
          overflow: 'hidden',
          borderTop: '1px solid #C8641A',
          borderBottom: '1px solid #C8641A',
          background: 'linear-gradient(90deg, #E8893A 0%, #C8641A 50%, #E8893A 100%)',
          padding: '13px 0',
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0 4px 15px rgba(200, 100, 26, 0.25)',
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
                  fontWeight: 700,
                  color: '#FFFDF5',
                  letterSpacing: '0.03em',
                }}
              >
                {text}
              </span>
              <span style={{ color: '#FFE9A8', fontSize: '13px' }}>✦</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
