import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, RotateCw, MapPin, Calendar, Coffee, User } from 'lucide-react';
import type { GalleryItem } from '../../data/galleryData';
import confetti from 'canvas-confetti';

interface PolaroidCardProps {
  item: GalleryItem;
  isLiked?: boolean;
  onToggleLike?: (id: string) => void;
}

export const PolaroidCard: React.FC<PolaroidCardProps> = ({
  item,
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
        particleCount: 28,
        spread: 50,
        origin: { x, y },
        colors: ['#A7EBF2', '#54ACBF', '#ff6b8b', '#ffd166'],
        disableForReducedMotion: true,
      });
    }
  };

  const handleFlip = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsFlipped(prev => !prev);
  };

  return (
    <motion.div
      layout
      whileHover={{
        scale: 1.04,
        rotate: 0,
        zIndex: 35,
        transition: { duration: 0.25, ease: 'easeOut' },
      }}
      whileTap={{ scale: 0.98 }}
      style={{
        position: 'relative',
        cursor: 'pointer',
        width: '100%',
        maxWidth: '265px',
        margin: '0 auto',
        height: '385px',
      }}
      className="polaroid-flip-container group"
      onClick={() => setIsFlipped(prev => !prev)}
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
          height: '100%',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* ══════════════════ FRONT FACE (Polaroid Photo) ══════════════════ */}
        <div
          className="polaroid-face polaroid-front"
          style={{
            background: '#ffffff',
            padding: '10px 10px 12px 10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: '1px solid rgba(0,0,0,0.08)',
            boxSizing: 'border-box',
          }}
        >
          {/* Photo Frame */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '240px',
            borderRadius: '6px',
            overflow: 'hidden',
            backgroundColor: '#071526',
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.25)',
            flexShrink: 0,
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

            {/* Subtle vintage glare overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 50%, rgba(0,0,0,0.12) 100%)',
              pointerEvents: 'none',
            }} />

            {/* Tap to Flip badge overlay on photo */}
            <div
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                padding: '3px 8px',
                borderRadius: '50px',
                background: 'rgba(0, 0, 0, 0.65)',
                backdropFilter: 'blur(6px)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                color: '#A7EBF2',
                fontSize: '9px',
                fontWeight: 700,
                letterSpacing: '0.04em',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                transition: 'all 0.2s ease',
              }}
            >
              <RotateCw size={10} />
              <span>Tap to Flip</span>
            </div>
          </div>

          {/* Polaroid Bottom Margin with Handwritten Notes */}
          <div style={{ paddingTop: '8px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{
                fontFamily: '"Caveat", cursive',
                fontSize: '18px',
                fontWeight: 700,
                color: '#0f172a',
                lineHeight: 1.25,
                marginBottom: '2px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
                {item.handwrittenCaption}
              </div>

              <div style={{
                fontSize: '10.5px',
                color: '#64748b',
                fontFamily: '"Outfit", sans-serif',
                fontWeight: 500,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
                📍 {item.location}
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '6px',
              borderTop: '1px dashed rgba(0,0,0,0.12)',
            }}>
              <div style={{
                fontFamily: '"Outfit", sans-serif',
                fontSize: '10px',
                color: '#64748b',
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
                fontWeight: 500,
              }}>
                <Calendar size={10} />
                <span>{item.date}</span>
              </div>

              {/* Action Buttons: Flip Button & Like Button */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <button
                  type="button"
                  title="Flip memory note"
                  onClick={handleFlip}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3px',
                    padding: '2px 8px',
                    borderRadius: '50px',
                    background: 'rgba(38,101,140,0.08)',
                    border: '1px solid rgba(38,101,140,0.2)',
                    color: '#26658C',
                    fontSize: '10px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#26658C'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(38,101,140,0.08)'; e.currentTarget.style.color = '#26658C'; }}
                >
                  <RotateCw size={9} />
                  <span>Read Note</span>
                </button>

                <button
                  type="button"
                  title="Like this memory"
                  onClick={handleLike}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3px',
                    padding: '2px 8px',
                    borderRadius: '50px',
                    background: hasLiked ? 'rgba(255, 107, 139, 0.14)' : 'rgba(0,0,0,0.05)',
                    border: hasLiked ? '1px solid rgba(255, 107, 139, 0.4)' : '1px solid rgba(0,0,0,0.1)',
                    color: hasLiked ? '#e11d48' : '#64748b',
                    fontSize: '10px',
                    fontWeight: 700,
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

        {/* ══════════════════ BACK FACE (Full Memory Journal) ══════════════════ */}
        <div
          className="polaroid-face polaroid-back"
          style={{
            padding: '16px 14px 12px 14px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: '#fdfbf7',
            backgroundImage: 'radial-gradient(rgba(0,0,0,0.05) 1px, transparent 1px)',
            backgroundSize: '14px 14px',
            border: '1px solid rgba(0,0,0,0.09)',
            boxSizing: 'border-box',
          }}
        >
          {/* Top Stamp & Memory Journal Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '8px',
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '10px',
              fontWeight: 800,
              color: '#26658C',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontFamily: '"Outfit", sans-serif',
              background: 'rgba(38,101,140,0.08)',
              padding: '3px 8px',
              borderRadius: '50px',
              border: '1px solid rgba(38,101,140,0.2)',
            }}>
              <Coffee size={11} color="#26658C" />
              <span>Memory Journal</span>
            </div>

            {/* Vintage Rubber Stamp */}
            <div style={{
              border: '1.5px dashed #26658C',
              borderRadius: '4px',
              padding: '2px 7px',
              color: '#26658C',
              fontSize: '8.5px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              transform: 'rotate(4deg)',
              background: 'rgba(38, 101, 140, 0.05)',
              fontFamily: '"Outfit", sans-serif',
            }}>
              AURA • CHENNAI
            </div>
          </div>

          {/* Main Story Content */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '6px' }}>
            <h4 style={{
              margin: '0',
              fontFamily: '"Playfair Display", serif',
              fontSize: '15px',
              fontWeight: 700,
              color: '#0f172a',
              lineHeight: 1.25,
            }}>
              {item.title}
            </h4>

            {/* Handwritten Note Quote */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.75)',
              borderLeft: '3px solid #54ACBF',
              padding: '7px 10px',
              borderRadius: '0 8px 8px 0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}>
              <p style={{
                fontFamily: '"Caveat", cursive',
                fontSize: '16.5px',
                lineHeight: 1.35,
                color: '#1e293b',
                margin: 0,
                fontWeight: 600,
              }}>
                "{item.backNote}"
              </p>
            </div>

            {/* Additional Story Details if available */}
            {item.storyDetails && (
              <p style={{
                fontFamily: '"Outfit", sans-serif',
                fontSize: '11px',
                lineHeight: 1.45,
                color: '#64748b',
                margin: 0,
              }}>
                {item.storyDetails}
              </p>
            )}

            {/* Tags Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '2px' }}>
              {item.tags.map((tag, idx) => (
                <span
                  key={idx}
                  style={{
                    fontSize: '9px',
                    padding: '2px 7px',
                    borderRadius: '4px',
                    background: 'rgba(38,101,140,0.08)',
                    color: '#26658C',
                    fontWeight: 700,
                    fontFamily: '"Outfit", sans-serif',
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Details & Footer Bar */}
          <div style={{
            borderTop: '1px solid rgba(0,0,0,0.08)',
            paddingTop: '8px',
            marginTop: '6px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}>
            {/* Location & Photographer metadata */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '9.5px',
              color: '#64748b',
              fontFamily: '"Outfit", sans-serif',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <MapPin size={10} color="#54ACBF" />
                <span style={{ fontWeight: 600 }}>{item.location}</span>
              </div>
              {item.photographer && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#94a3b8' }}>
                  <User size={9} />
                  <span>{item.photographer}</span>
                </div>
              )}
            </div>

            {/* Interactive Bottom Buttons */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <button
                type="button"
                onClick={handleFlip}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '4px 10px',
                  borderRadius: '50px',
                  background: '#011026',
                  color: '#A7EBF2',
                  fontSize: '9.5px',
                  fontWeight: 700,
                  border: '1px solid rgba(167,235,242,0.3)',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#26658C'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#011026'; e.currentTarget.style.color = '#A7EBF2'; }}
              >
                <RotateCw size={9} />
                <span>Flip Photo</span>
              </button>

              <button
                type="button"
                title="Like this memory"
                onClick={handleLike}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                  padding: '3px 8px',
                  borderRadius: '50px',
                  background: hasLiked ? 'rgba(255, 107, 139, 0.14)' : 'rgba(0,0,0,0.05)',
                  border: hasLiked ? '1px solid rgba(255, 107, 139, 0.4)' : '1px solid rgba(0,0,0,0.1)',
                  color: hasLiked ? '#e11d48' : '#64748b',
                  fontSize: '10px',
                  fontWeight: 700,
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
    </motion.div>
  );
};
