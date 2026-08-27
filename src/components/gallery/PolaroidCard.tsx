import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, RotateCw, Maximize2, MapPin, Calendar, Coffee } from 'lucide-react';
import type { GalleryItem } from '../../data/galleryData';
import confetti from 'canvas-confetti';

interface PolaroidCardProps {
  item: GalleryItem;
  onOpenLightbox: (item: GalleryItem) => void;
  isLiked?: boolean;
  onToggleLike?: (id: string) => void;
}

export const PolaroidCard: React.FC<PolaroidCardProps> = ({
  item,
  onOpenLightbox,
  isLiked = false,
  onToggleLike,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [likesCount, setLikesCount] = useState(item.likes + (isLiked ? 1 : 0));
  const [hasLiked, setHasLiked] = useState(isLiked);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !hasLiked;
    setHasLiked(next);
    setLikesCount(prev => (next ? prev + 1 : prev - 1));
    if (onToggleLike) onToggleLike(item.id);

    if (next) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      confetti({
        particleCount: 24,
        spread: 45,
        origin: { x, y },
        colors: ['#A7EBF2', '#54ACBF', '#ff6b8b', '#ffd166'],
        disableForReducedMotion: true,
      });
    }
  };

  const handleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(prev => !prev);
  };

  return (
    <motion.div
      layout
      whileHover={{
        scale: 1.05,
        rotate: 0,
        zIndex: 35,
        transition: { duration: 0.25, ease: 'easeOut' },
      }}
      style={{
        position: 'relative',
        cursor: 'pointer',
        width: '100%',
        maxWidth: '255px',
        margin: '0 auto',
      }}
      className="polaroid-flip-container group"
      onClick={() => onOpenLightbox(item)}
    >
      {/* Sleek Metallic Binder Clip */}
      <div className="binder-clip-top">
        <div className="binder-clip-handle" />
        <div className="binder-clip-body" />
      </div>

      {/* 3D Flip Card Container */}
      <div
        className={`polaroid-flip-card ${isFlipped ? 'is-flipped' : ''}`}
        style={{
          width: '100%',
          minHeight: '335px',
          borderRadius: '10px',
          boxShadow: '0 14px 30px rgba(0,0,0,0.45), 0 3px 10px rgba(0,0,0,0.25)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* ── FRONT FACE ── */}
        <div
          className="polaroid-face polaroid-front"
          style={{
            background: '#ffffff',
            padding: '10px 10px 14px 10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: '1px solid rgba(0,0,0,0.06)',
            boxShadow: 'inset 0 0 10px rgba(0,0,0,0.02)',
          }}
        >
          {/* Photo Frame */}
          <div style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '1 / 1',
            borderRadius: '5px',
            overflow: 'hidden',
            backgroundColor: '#071526',
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
          }}>
            <img
              src={item.imageUrl}
              alt={item.title}
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transition: 'transform 0.4s ease',
              }}
              className="group-hover:scale-105"
            />

            {/* Subtle vintage glare */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)',
              pointerEvents: 'none',
            }} />

            {/* Hover Expand Icon */}
            <div style={{
              position: 'absolute',
              top: '6px',
              right: '6px',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: 'rgba(0, 0, 0, 0.65)',
              backdropFilter: 'blur(6px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              opacity: 0.85,
            }}>
              <Maximize2 size={11} />
            </div>
          </div>

          {/* Polaroid Bottom Margin with Handwritten Notes */}
          <div style={{ paddingTop: '8px' }}>
            <div style={{
              fontFamily: '"Caveat", cursive',
              fontSize: '17px',
              fontWeight: 700,
              color: '#0f172a',
              lineHeight: 1.2,
              marginBottom: '3px',
              minHeight: '22px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              {item.handwrittenCaption}
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '5px',
              borderTop: '1px dashed rgba(0,0,0,0.1)',
            }}>
              <div style={{
                fontFamily: '"Outfit", sans-serif',
                fontSize: '10px',
                color: '#64748b',
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
              }}>
                <Calendar size={10} />
                <span>{item.date}</span>
              </div>

              {/* Action Buttons: Flip & Like */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <button
                  type="button"
                  title="Flip photo memory"
                  onClick={handleFlip}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: 'rgba(0,0,0,0.05)',
                    border: '1px solid rgba(0,0,0,0.08)',
                    color: '#475569',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#26658C'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.05)'; e.currentTarget.style.color = '#475569'; }}
                >
                  <RotateCw size={10} />
                </button>

                <button
                  type="button"
                  title="Like this memory"
                  onClick={handleLike}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3px',
                    padding: '2px 7px',
                    borderRadius: '50px',
                    background: hasLiked ? 'rgba(255, 107, 139, 0.12)' : 'rgba(0,0,0,0.05)',
                    border: hasLiked ? '1px solid rgba(255, 107, 139, 0.35)' : '1px solid rgba(0,0,0,0.08)',
                    color: hasLiked ? '#e11d48' : '#64748b',
                    fontSize: '10px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Heart size={10} fill={hasLiked ? '#e11d48' : 'transparent'} />
                  <span>{likesCount}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── BACK FACE (Memory Journal Note) ── */}
        <div
          className="polaroid-face polaroid-back"
          style={{
            padding: '16px 14px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: '#fcfaf6',
            border: '1px solid rgba(0,0,0,0.08)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Small Stamp Badge */}
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            border: '1.5px dashed #26658C',
            borderRadius: '4px',
            padding: '2px 6px',
            color: '#26658C',
            fontSize: '8px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            transform: 'rotate(6deg)',
            background: 'rgba(38, 101, 140, 0.05)',
          }}>
            AURA • CHENNAI
          </div>

          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '10px',
              fontWeight: 700,
              color: '#54ACBF',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '6px',
              fontFamily: '"Outfit", sans-serif',
            }}>
              <Coffee size={11} />
              <span>Memory Journal</span>
            </div>

            <h4 style={{
              margin: '0 0 6px',
              fontFamily: '"Playfair Display", serif',
              fontSize: '14px',
              fontWeight: 700,
              color: '#0f172a',
              lineHeight: 1.2,
            }}>
              {item.title}
            </h4>

            {/* Handwritten Note Body */}
            <p style={{
              fontFamily: '"Caveat", cursive',
              fontSize: '16px',
              lineHeight: 1.35,
              color: '#334155',
              margin: '0 0 8px',
            }}>
              "{item.backNote}"
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {item.tags.slice(0, 2).map((tag, idx) => (
                <span
                  key={idx}
                  style={{
                    fontSize: '9px',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: 'rgba(38,101,140,0.08)',
                    color: '#26658C',
                    fontWeight: 600,
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div style={{
            borderTop: '1px solid rgba(0,0,0,0.08)',
            paddingTop: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div style={{ fontSize: '10px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '3px' }}>
              <MapPin size={10} />
              <span>{item.location}</span>
            </div>

            <button
              type="button"
              onClick={handleFlip}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '3px',
                padding: '3px 8px',
                borderRadius: '50px',
                background: '#000',
                color: '#A7EBF2',
                fontSize: '9px',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <RotateCw size={9} />
              <span>Front</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
