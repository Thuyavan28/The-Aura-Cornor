import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Heart, MapPin, Calendar, Camera, Share2, Sparkles, Tag } from 'lucide-react';
import type { GalleryItem } from '../../data/galleryData';
import confetti from 'canvas-confetti';

interface GalleryLightboxProps {
  item: GalleryItem | null;
  allItems: GalleryItem[];
  onClose: () => void;
  onSelect: (item: GalleryItem) => void;
  isLiked?: boolean;
  onToggleLike?: (id: string) => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  item,
  allItems,
  onClose,
  onSelect,
  isLiked = false,
  onToggleLike,
}) => {
  const currentIndex = item ? allItems.findIndex(i => i.id === item.id) : -1;

  const handleNext = useCallback(() => {
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % allItems.length;
    onSelect(allItems[nextIndex]);
  }, [currentIndex, allItems, onSelect]);

  const handlePrev = useCallback(() => {
    if (currentIndex === -1) return;
    const prevIndex = (currentIndex - 1 + allItems.length) % allItems.length;
    onSelect(allItems[prevIndex]);
  }, [currentIndex, allItems, onSelect]);

  // Keyboard navigation
  useEffect(() => {
    if (!item) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose, handleNext, handlePrev]);

  if (!item) return null;

  const triggerLikeConfetti = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    confetti({
      particleCount: 36,
      spread: 60,
      origin: { x, y },
      colors: ['#A7EBF2', '#54ACBF', '#ff4d6d', '#ffd166'],
      disableForReducedMotion: true,
    });
    if (onToggleLike) onToggleLike(item.id);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `The Aura Corner — ${item.title}`,
        text: `Look at this memory from The Aura Corner: ${item.handwrittenCaption}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 100,
          backgroundColor: 'rgba(1, 14, 34, 0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(16px, 3vw, 40px)',
        }}
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Lightbox"
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 110,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#A7EBF2'; e.currentTarget.style.color = '#000'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'; e.currentTarget.style.color = '#fff'; }}
        >
          <X size={20} />
        </button>

        {/* Previous Button */}
        <button
          type="button"
          onClick={e => { e.stopPropagation(); handlePrev(); }}
          aria-label="Previous Photo"
          style={{
            position: 'absolute',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'rgba(0, 0, 0, 0.65)',
            border: '1px solid rgba(167, 235, 242, 0.25)',
            color: '#A7EBF2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 110,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#26658C'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0, 0, 0, 0.65)'; e.currentTarget.style.color = '#A7EBF2'; }}
        >
          <ChevronLeft size={24} />
        </button>

        {/* Next Button */}
        <button
          type="button"
          onClick={e => { e.stopPropagation(); handleNext(); }}
          aria-label="Next Photo"
          style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'rgba(0, 0, 0, 0.65)',
            border: '1px solid rgba(167, 235, 242, 0.25)',
            color: '#A7EBF2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 110,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#26658C'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0, 0, 0, 0.65)'; e.currentTarget.style.color = '#A7EBF2'; }}
        >
          <ChevronRight size={24} />
        </button>

        {/* Lightbox Content Container */}
        <motion.div
          key={item.id}
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          onClick={e => e.stopPropagation()}
          style={{
            maxWidth: '1020px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            background: '#ffffff',
            borderRadius: '24px',
            boxShadow: '0 25px 70px rgba(0,0,0,0.6), 0 0 40px rgba(84, 172, 191, 0.2)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            color: '#0f172a',
            position: 'relative',
            border: '2px solid rgba(167, 235, 242, 0.4)',
          }}
        >
          {/* Top Washi Tape Decoration */}
          <div className="washi-tape-accent washi-tape-teal" style={{ top: '-13px' }} />

          {/* Left Column: Big Image inside authentic polaroid frame */}
          <div style={{
            padding: '24px',
            background: '#f8fafc',
            borderRight: '1px solid rgba(0,0,0,0.06)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <div style={{
              width: '100%',
              maxWidth: '460px',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 12px 30px rgba(0,0,0,0.18)',
              position: 'relative',
              backgroundColor: '#000',
            }}>
              <img
                src={item.imageUrl}
                alt={item.title}
                style={{
                  width: '100%',
                  height: '100%',
                  maxHeight: '440px',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <div style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                padding: '4px 10px',
                borderRadius: '50px',
                background: 'rgba(0,0,0,0.7)',
                backdropFilter: 'blur(8px)',
                color: '#A7EBF2',
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}>
                <Sparkles size={12} />
                <span>{item.category || 'Aura Corner'}</span>
              </div>
            </div>

            {/* Photo Counter */}
            <div style={{
              marginTop: '16px',
              fontSize: '12px',
              color: '#64748b',
              fontWeight: 600,
              fontFamily: '"Outfit", sans-serif',
            }}>
              Memory {currentIndex + 1} of {allItems.length}
            </div>
          </div>

          {/* Right Column: Story & Scrapbook Details */}
          <div style={{
            padding: 'clamp(24px, 4vw, 36px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
            <div>
              {/* Header meta */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '14px',
              }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 12px',
                  borderRadius: '50px',
                  background: 'rgba(38,101,140,0.08)',
                  color: '#26658C',
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}>
                  <Camera size={13} />
                  <span>The Aura Corner Memory Wall</span>
                </div>

                <div style={{
                  border: '1.5px dashed #54ACBF',
                  borderRadius: '4px',
                  padding: '3px 8px',
                  fontSize: '10px',
                  fontWeight: 800,
                  color: '#54ACBF',
                  letterSpacing: '0.08em',
                  transform: 'rotate(2deg)',
                }}>
                  CHENNAI • 5.0 ⭐
                </div>
              </div>

              {/* Title */}
              <h3 style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 'clamp(22px, 3vw, 30px)',
                fontWeight: 700,
                color: '#0f172a',
                lineHeight: 1.2,
                margin: '0 0 10px',
              }}>
                {item.title}
              </h3>

              {/* Handwritten Note Highlight */}
              <div style={{
                background: '#fefce8',
                borderLeft: '4px solid #eab308',
                padding: '14px 16px',
                borderRadius: '0 12px 12px 0',
                margin: '0 0 18px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}>
                <p style={{
                  fontFamily: '"Caveat", cursive',
                  fontSize: '22px',
                  lineHeight: 1.35,
                  color: '#1e293b',
                  margin: 0,
                }}>
                  "{item.handwrittenCaption}"
                </p>
              </div>

              {/* Story Narrative */}
              <p style={{
                fontSize: '14px',
                lineHeight: 1.7,
                color: '#475569',
                margin: '0 0 20px',
                fontFamily: '"Outfit", sans-serif',
              }}>
                {item.storyDetails || item.backNote}
              </p>

              {/* Metadata Pills */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#64748b' }}>
                  <Calendar size={14} color="#26658C" />
                  <span>{item.date} {item.time && `• ${item.time}`}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#64748b' }}>
                  <MapPin size={14} color="#26658C" />
                  <span>{item.location}</span>
                </div>
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
                {item.tags.map((tag, i) => (
                  <span
                    key={i}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 10px',
                      borderRadius: '50px',
                      background: '#f1f5f9',
                      color: '#334155',
                      fontSize: '11px',
                      fontWeight: 600,
                    }}
                  >
                    <Tag size={10} />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '16px',
              borderTop: '1px solid rgba(0,0,0,0.08)',
              gap: '12px',
            }}>
              <button
                type="button"
                onClick={triggerLikeConfetti}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  borderRadius: '50px',
                  background: isLiked ? 'rgba(255, 77, 109, 0.12)' : '#000',
                  border: isLiked ? '1.5px solid #ff4d6d' : 'none',
                  color: isLiked ? '#ff4d6d' : '#A7EBF2',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <Heart size={16} fill={isLiked ? '#ff4d6d' : 'currentColor'} />
                <span>{item.likes + (isLiked ? 1 : 0)} Likes</span>
              </button>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={handleShare}
                  title="Share this memory"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '10px 16px',
                    borderRadius: '50px',
                    background: '#f1f5f9',
                    border: '1px solid rgba(0,0,0,0.08)',
                    color: '#334155',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  <Share2 size={14} />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
