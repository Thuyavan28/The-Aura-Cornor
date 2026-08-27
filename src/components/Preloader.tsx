import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Coffee, Flame, Heart } from 'lucide-react';
import auraLogo from '../assets/aura-logo.jpg';

interface PreloaderProps {
  onComplete?: () => void;
}

const BREW_STAGES = [
  { threshold: 0, text: 'Sourcing single-origin beans...', icon: Coffee },
  { threshold: 28, text: 'Extracting rich golden espresso...', icon: Flame },
  { threshold: 58, text: 'Frothing velvety warm microfoam...', icon: Sparkles },
  { threshold: 82, text: 'Crafting signature latte aura...', icon: Heart },
  { threshold: 96, text: 'Welcome to The Aura Corner ✨', icon: Sparkles },
];

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 2400; // 2.4 seconds rich cinematic entry

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setLoading(false);
          if (onComplete) onComplete();
        }, 500);
      }
    }, 35);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Current brewing stage
  const currentStage = [...BREW_STAGES].reverse().find(s => progress >= s.threshold) || BREW_STAGES[0];
  const StageIcon = currentStage.icon;

  // Floating background sparkles
  const backgroundSparks = [
    { x: '15%', y: '25%', size: 4, delay: 0 },
    { x: '85%', y: '20%', size: 5, delay: 0.4 },
    { x: '18%', y: '75%', size: 3, delay: 0.8 },
    { x: '82%', y: '72%', size: 6, delay: 0.2 },
    { x: '50%', y: '12%', size: 4, delay: 0.6 },
    { x: '30%', y: '88%', size: 5, delay: 1.0 },
    { x: '70%', y: '85%', size: 3, delay: 0.5 },
  ];

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.06,
            filter: 'blur(12px)',
          }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            backgroundColor: '#FFF8DC',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            userSelect: 'none',
          }}
        >
          {/* ── AMBIENT PULSING AURA ORBS ── */}
          <motion.div
            animate={{
              scale: [1, 1.35, 1],
              opacity: [0.45, 0.75, 0.45],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              width: '650px',
              height: '650px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(232, 137, 58, 0.3) 0%, rgba(212, 167, 44, 0.15) 45%, transparent 70%)',
              filter: 'blur(60px)',
              pointerEvents: 'none',
            }}
          />

          <motion.div
            animate={{
              scale: [1.2, 0.9, 1.2],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            style={{
              position: 'absolute',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 233, 168, 0.5) 0%, rgba(200, 100, 26, 0.15) 50%, transparent 70%)',
              filter: 'blur(50px)',
              pointerEvents: 'none',
            }}
          />

          {/* ── CONCENTRIC EXPANDING AURA RIPPLES ── */}
          {[0, 1.2, 2.4].map((delay, idx) => (
            <motion.div
              key={idx}
              initial={{ scale: 0.6, opacity: 0.8 }}
              animate={{
                scale: [0.6, 2.2],
                opacity: [0.7, 0],
              }}
              transition={{
                duration: 3.6,
                repeat: Infinity,
                ease: 'easeOut',
                delay,
              }}
              style={{
                position: 'absolute',
                width: '260px',
                height: '260px',
                borderRadius: '50%',
                border: '1.5px solid rgba(232, 137, 58, 0.4)',
                pointerEvents: 'none',
              }}
            />
          ))}

          {/* Floating Golden Sparks */}
          {backgroundSparks.map((spark, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.9, 0.2],
                scale: [0.8, 1.3, 0.8],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: spark.delay,
              }}
              style={{
                position: 'absolute',
                left: spark.x,
                top: spark.y,
                width: `${spark.size}px`,
                height: `${spark.size}px`,
                borderRadius: '50%',
                background: '#D4A72C',
                boxShadow: '0 0 12px rgba(232, 137, 58, 0.8)',
                pointerEvents: 'none',
              }}
            />
          ))}

          {/* ── MAIN CENTERPIECE: CELESTIAL AURA SEAL ── */}
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '0 24px',
              width: '100%',
              maxWidth: '420px',
            }}
          >
            {/* Centerpiece Emblem with Double Orbital Rings */}
            <div
              style={{
                position: 'relative',
                width: '190px',
                height: '190px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '28px',
              }}
            >
              {/* Outer Counter-Rotating Dashed Halo Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  border: '2px dashed #E8893A',
                  opacity: 0.65,
                }}
              />

              {/* Inner Reverse Rotating Golden Orbit Ring with Accent Nodes */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute',
                  inset: '8px',
                  borderRadius: '50%',
                  border: '1.5px solid #D4A72C',
                  opacity: 0.5,
                }}
              >
                {/* Node 1 */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#E8893A',
                    boxShadow: '0 0 8px #E8893A',
                  }}
                />
                {/* Node 2 */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-4px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#D4A72C',
                    boxShadow: '0 0 8px #D4A72C',
                  }}
                />
              </motion.div>

              {/* Glowing Center Logo Disc */}
              <motion.div
                animate={{ scale: [0.96, 1.04, 0.96] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  width: '136px',
                  height: '136px',
                  borderRadius: '50%',
                  padding: '5px',
                  background: 'linear-gradient(135deg, #E8893A, #D4A72C)',
                  boxShadow: '0 12px 40px rgba(232, 137, 58, 0.4), 0 0 50px rgba(212, 167, 44, 0.3)',
                  position: 'relative',
                  overflow: 'hidden',
                  zIndex: 2,
                }}
              >
                {/* Inner Image Container */}
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    background: '#FFFDF5',
                    position: 'relative',
                  }}
                >
                  <img
                    src={auraLogo}
                    alt="The Aura Corner"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />

                  {/* Shimmer Light Beam Effect */}
                  <motion.div
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      repeatDelay: 0.8,
                    }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)',
                      transform: 'skewX(-25deg)',
                      pointerEvents: 'none',
                    }}
                  />
                </div>
              </motion.div>
            </div>

            {/* ── BRAND HEADLINE & ESTD BADGE ── */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              style={{ textAlign: 'center', marginBottom: '22px' }}
            >
              {/* Estd Mini Pill */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 14px',
                  borderRadius: '50px',
                  background: '#FFE9A8',
                  border: '1px solid #D4A72C',
                  marginBottom: '10px',
                  boxShadow: '0 2px 8px rgba(74, 51, 37, 0.06)',
                }}
              >
                <Sparkles size={11} color="#E8893A" />
                <span
                  style={{
                    fontFamily: '"Outfit", sans-serif',
                    fontSize: '10px',
                    fontWeight: 800,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#4A3325',
                  }}
                >
                  Boutique Lounge &amp; Café
                </span>
              </div>

              {/* Title */}
              <h1
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: 'clamp(28px, 6vw, 36px)',
                  fontWeight: 700,
                  color: '#4A3325',
                  margin: '0 0 4px',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                }}
              >
                The Aura Corner
              </h1>

              {/* Sub-tagline */}
              <p
                style={{
                  fontFamily: '"Outfit", sans-serif',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#7A5C43',
                  margin: 0,
                }}
              >
                Medavakkam · Chennai
              </p>
            </motion.div>

            {/* ── LUXURY LIQUID PROGRESS CAPSULE BAR ── */}
            <div
              style={{
                width: '100%',
                maxWidth: '280px',
                background: '#FFFDF5',
                padding: '4px',
                borderRadius: '50px',
                border: '1.5px solid #E8D3B0',
                boxShadow: '0 4px 16px rgba(74, 51, 37, 0.08), inset 0 2px 4px rgba(74, 51, 37, 0.04)',
                marginBottom: '16px',
                position: 'relative',
              }}
            >
              <div
                style={{
                  height: '10px',
                  borderRadius: '50px',
                  background: 'rgba(74, 51, 37, 0.06)',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                {/* Glowing Liquid Fill */}
                <motion.div
                  style={{
                    height: '100%',
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #D4A72C 0%, #E8893A 60%, #C8641A 100%)',
                    borderRadius: '50px',
                    boxShadow: '0 0 14px rgba(232, 137, 58, 0.8)',
                    transition: 'width 0.12s linear',
                    position: 'relative',
                  }}
                >
                  {/* Leading Edge Spark Dot */}
                  <div
                    style={{
                      position: 'absolute',
                      right: '0px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#FFFDF5',
                      boxShadow: '0 0 8px #FFFDF5',
                    }}
                  />
                </motion.div>
              </div>
            </div>

            {/* ── DYNAMIC BREWING STORY TEXT & LIVE PERCENTAGE ── */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                maxWidth: '280px',
                padding: '0 4px',
              }}
            >
              {/* Dynamic Brewing Milestone Text */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStage.text}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <StageIcon size={13} color="#E8893A" />
                  <span
                    style={{
                      fontFamily: '"Outfit", sans-serif',
                      fontSize: '11.5px',
                      fontWeight: 600,
                      color: '#4A3325',
                    }}
                  >
                    {currentStage.text}
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* Percentage Number */}
              <span
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: '15px',
                  fontWeight: 700,
                  color: '#E8893A',
                  letterSpacing: '0.04em',
                }}
              >
                {progress}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
