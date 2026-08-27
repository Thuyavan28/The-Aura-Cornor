import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Sparkles } from 'lucide-react';
import { Reveal } from './Reveal';
import { PolaroidCard } from './gallery/PolaroidCard';
import { GALLERY_ITEMS } from '../data/galleryData';

export const GallerySection: React.FC = () => {
  // Track liked items in localStorage
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>(() => {
    try {
      return JSON.parse(localStorage.getItem('aura-gallery-likes') || '{}');
    } catch {
      return {};
    }
  });

  const toggleLike = (id: string) => {
    setLikedMap(prev => {
      const next = { ...prev, [id]: !prev[id] };
      localStorage.setItem('aura-gallery-likes', JSON.stringify(next));
      return next;
    });
  };

  return (
    <section
      id="gallery"
      style={{
        backgroundColor: '#FFFFFF',
        position: 'relative',
        padding: 'clamp(70px, 8vw, 110px) 0',
        overflow: 'hidden',
        borderTop: '1px solid #E8D3B0',
        borderBottom: '1px solid #E8D3B0',
      }}
    >
      {/* Subtle warm ambient background glow on pure white */}
      <div style={{
        position: 'absolute',
        top: '-120px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '750px',
        height: '350px',
        background: 'radial-gradient(circle, rgba(255,233,168,0.45) 0%, rgba(232,137,58,0.1) 60%, transparent 80%)',
        filter: 'blur(90px)',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 clamp(16px, 4vw, 32px)',
        position: 'relative',
        zIndex: 10,
      }}>
        {/* ── CLEAN HEADER ── */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <Reveal direction="up">
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 18px',
              borderRadius: '50px',
              border: '1.5px solid #D4A72C',
              background: '#FFE9A8',
              marginBottom: '14px',
              boxShadow: '0 2px 8px rgba(212,167,44,0.15)',
            }}>
              <Camera size={13} color="#E8893A" />
              <span style={{
                fontFamily: '"Outfit", sans-serif',
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#4A3325',
              }}>
                Polaroid Memories &amp; Ambience
              </span>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(28px, 4.5vw, 52px)',
              fontWeight: 700,
              color: '#4A3325',
              lineHeight: 1.15,
              margin: '0 0 12px',
              letterSpacing: '-0.02em',
            }}>
              Scrapbook of <span style={{ fontStyle: 'italic', fontWeight: 400, color: '#E8893A' }}>The Aura Corner</span>
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.15}>
            <p style={{
              fontSize: 'clamp(13px, 1.6vw, 15px)',
              color: '#7A5C43',
              maxWidth: '580px',
              margin: '0 auto',
              lineHeight: 1.6,
              fontWeight: 400,
            }}>
              Glimpses into our cozy inside corners, open-air patio breezes, handcrafted brews, and unforgettable memories.
            </p>
          </Reveal>
        </div>

        {/* ── THE WIRE GRID WALL WITH 8 COMPACT POLAROIDS ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="wire-grid-bg"
          style={{
            position: 'relative',
            borderRadius: '28px',
            padding: 'clamp(32px, 5vw, 48px) clamp(16px, 3vw, 32px)',
            border: '2px solid #D4A72C',
            boxShadow: '0 20px 60px rgba(74, 51, 37, 0.12), inset 0 0 40px rgba(255, 248, 220, 0.4)',
            overflow: 'hidden',
          }}
        >
          {/* Subtle Window Shadow Sunbeams */}
          <div className="window-shadow-overlay" />

          {/* Plaque Badge on Grid */}
          <div style={{
            textAlign: 'center',
            marginBottom: '32px',
            position: 'relative',
            zIndex: 2,
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#FFFDF5',
              border: '1.5px solid #D4A72C',
              borderRadius: '50px',
              padding: '7px 20px',
              boxShadow: '0 4px 18px rgba(74, 51, 37, 0.08)',
            }}>
              <Sparkles size={12} color="#E8893A" />
              <p style={{
                margin: 0,
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#4A3325',
                fontFamily: '"Outfit", sans-serif',
              }}>
                📎 Suspended Polaroid Photo Display • Tap to Flip
              </p>
            </div>
          </div>

          {/* 8 Polaroids in a clean responsive grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: 'clamp(20px, 3vw, 32px)',
            position: 'relative',
            zIndex: 2,
            justifyItems: 'center',
          }}>
            {GALLERY_ITEMS.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.92, rotate: item.rotation }}
                whileInView={{ opacity: 1, scale: 1, rotate: item.rotation }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                style={{
                  transform: `rotate(${item.rotation}deg)`,
                  transformOrigin: 'top center',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <PolaroidCard
                  item={item}
                  isLiked={!!likedMap[item.id]}
                  onToggleLike={toggleLike}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
