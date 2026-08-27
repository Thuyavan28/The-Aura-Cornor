import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Sparkles } from 'lucide-react';
import { Reveal } from './Reveal';
import { PolaroidCard } from './gallery/PolaroidCard';
import { GalleryLightbox } from './gallery/GalleryLightbox';
import { GALLERY_ITEMS, type GalleryItem } from '../data/galleryData';

export const GallerySection: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

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
        backgroundColor: '#010e22',
        position: 'relative',
        padding: 'clamp(70px, 8vw, 110px) 0',
        overflow: 'hidden',
      }}
    >
      {/* Ambient background glow */}
      <div style={{
        position: 'absolute',
        top: '-120px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '700px',
        height: '350px',
        background: 'radial-gradient(circle, rgba(84,172,191,0.14) 0%, rgba(38,101,140,0.04) 60%, transparent 80%)',
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
              padding: '5px 16px',
              borderRadius: '50px',
              border: '1px solid rgba(167,235,242,0.25)',
              background: 'rgba(167,235,242,0.06)',
              marginBottom: '14px',
            }}>
              <Camera size={12} color="#A7EBF2" />
              <span style={{
                fontFamily: '"Outfit", sans-serif',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#A7EBF2',
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
              color: '#ffffff',
              lineHeight: 1.15,
              margin: '0 0 12px',
              letterSpacing: '-0.02em',
            }}>
              Scrapbook of <span style={{ fontStyle: 'italic', fontWeight: 400, color: '#A7EBF2' }}>The Aura Corner</span>
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.15}>
            <p style={{
              fontSize: 'clamp(13px, 1.6vw, 15px)',
              color: 'rgba(255,255,255,0.65)',
              maxWidth: '580px',
              margin: '0 auto',
              lineHeight: 1.6,
              fontWeight: 300,
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
            border: '1.5px solid rgba(167, 235, 242, 0.2)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.65), inset 0 0 40px rgba(0,0,0,0.5)',
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
              background: '#011026',
              border: '1px solid rgba(167,235,242,0.25)',
              borderRadius: '50px',
              padding: '6px 18px',
              boxShadow: '0 4px 18px rgba(0,0,0,0.4)',
            }}>
              <Sparkles size={11} color="#A7EBF2" />
              <p style={{
                margin: 0,
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#A7EBF2',
                fontFamily: '"Outfit", sans-serif',
              }}>
                📎 Suspended Polaroid Photo Display
              </p>
            </div>
          </div>

          {/* 8 Polaroids in a clean responsive grid (4 columns on desktop, 2 on mobile) */}
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
                  onOpenLightbox={setSelectedItem}
                  isLiked={!!likedMap[item.id]}
                  onToggleLike={toggleLike}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Fullscreen Scrapbook Lightbox Modal */}
      <GalleryLightbox
        item={selectedItem}
        allItems={GALLERY_ITEMS}
        onClose={() => setSelectedItem(null)}
        onSelect={setSelectedItem}
        isLiked={selectedItem ? !!likedMap[selectedItem.id] : false}
        onToggleLike={toggleLike}
      />
    </section>
  );
};
