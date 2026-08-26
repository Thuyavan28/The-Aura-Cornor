import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import auraLogo from '../assets/aura-logo.jpg';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress counter animation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            if (onComplete) onComplete();
          }, 350);
          return 100;
        }
        return prev + Math.floor(Math.random() * 18) + 8;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            backgroundColor: '#010e22',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Animated Blue Glow Background Blobs */}
          <motion.div
            animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.6, 0.35] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(84,172,191,0.3) 0%, rgba(2,56,89,0.2) 50%, transparent 70%)',
              filter: 'blur(40px)',
              pointerEvents: 'none',
            }}
          />

          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.45, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            style={{
              position: 'absolute',
              width: '380px',
              height: '380px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(167,235,242,0.25) 0%, transparent 70%)',
              filter: 'blur(30px)',
              pointerEvents: 'none',
            }}
          />

          {/* Logo Center Container */}
          <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Pulsing Outer Rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                width: '180px',
                height: '180px',
                top: '-20px',
                borderRadius: '50%',
                border: '1.5px dashed rgba(167,235,242,0.35)',
                pointerEvents: 'none',
              }}
            />

            <motion.div
              animate={{ scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                overflow: 'hidden',
                boxShadow: '0 0 40px rgba(167,235,242,0.5), 0 0 80px rgba(84,172,191,0.3)',
                border: '2px solid rgba(167,235,242,0.5)',
                marginBottom: '24px',
                position: 'relative',
              }}
            >
              <img
                src={auraLogo}
                alt="The Aura Corner Logo"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </motion.div>

            {/* Brand Title */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ textAlign: 'center', marginBottom: '24px' }}
            >
              <h1
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: '28px',
                  fontWeight: 700,
                  color: '#fff',
                  margin: '0 0 6px',
                  letterSpacing: '-0.01em',
                  textShadow: '0 0 20px rgba(167,235,242,0.6)',
                }}
              >
                The Aura Corner
              </h1>
              <p
                style={{
                  fontFamily: '"Outfit", sans-serif',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  background: 'linear-gradient(90deg, #A7EBF2, #54ACBF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  margin: 0,
                }}
              >
                Boutique Lounge & Café · Chennai
              </p>
            </motion.div>

            {/* Progress Bar */}
            <div
              style={{
                width: '200px',
                height: '3px',
                borderRadius: '50px',
                background: 'rgba(255,255,255,0.08)',
                overflow: 'hidden',
                position: 'relative',
                marginBottom: '14px',
              }}
            >
              <motion.div
                style={{
                  height: '100%',
                  width: `${Math.min(progress, 100)}%`,
                  background: 'linear-gradient(90deg, #26658C, #54ACBF, #A7EBF2)',
                  boxShadow: '0 0 10px rgba(167,235,242,0.8)',
                  transition: 'width 0.15s ease-out',
                }}
              />
            </div>

            {/* Loading text with percentage */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={13} color="#A7EBF2" />
              <span
                style={{
                  fontFamily: '"Outfit", sans-serif',
                  fontSize: '11px',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.5)',
                  letterSpacing: '0.08em',
                }}
              >
                Brewing experience... {Math.min(progress, 100)}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
