import React, { useRef } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Reveal } from './Reveal';
import { useGoogleReviews } from '../hooks/useGoogleReviews';

export const ReviewsMarquee: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { reviews, rating, totalReviews, googleMapsUrl } = useGoogleReviews();

  const scrollFn = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -380 : 380, behavior: 'smooth' });
  };

  return (
    <section
      id="reviews"
      style={{
        backgroundColor: '#FFFDF5',
        padding: '110px 0 100px',
        overflow: 'hidden',
        position: 'relative',
        borderTop: '1px solid #E8D3B0',
      }}
    >
      {/* Background ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,233,168,0.5) 0%, rgba(232,211,176,0.15) 50%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 36px', position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '50px',
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          <div>
            <Reveal direction="left">
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 16px',
                  borderRadius: '50px',
                  border: '1.5px solid #D4A72C',
                  background: '#FFE9A8',
                  marginBottom: '14px',
                  boxShadow: '0 2px 8px rgba(212,167,44,0.15)',
                }}
              >
                <Star size={12} color="#D4A72C" fill="#D4A72C" />
                <span
                  style={{
                    fontFamily: '"Outfit", sans-serif',
                    fontSize: '10.5px',
                    fontWeight: 800,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#4A3325',
                  }}
                >
                  {rating.toFixed(1)} GOOGLE RATING · {totalReviews} REVIEWS
                </span>
              </div>
            </Reveal>

            <Reveal direction="left" delay={0.1}>
              <h2
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: 'clamp(38px, 5.5vw, 62px)',
                  fontWeight: 700,
                  color: '#4A3325',
                  margin: 0,
                  letterSpacing: '-0.02em',
                }}
              >
                Guests <span style={{ fontStyle: 'italic', fontWeight: 400, color: '#E8893A' }}>Love Us</span>
              </h2>
            </Reveal>
          </div>

          {/* Right Action: Leave Review link + Navigation arrow buttons */}
          <Reveal direction="right" delay={0.1}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 18px',
                  borderRadius: '50px',
                  background: '#FFFDF5',
                  border: '1px solid #E8D3B0',
                  color: '#4A3325',
                  fontFamily: '"Outfit", sans-serif',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  boxShadow: '0 2px 8px rgba(74, 51, 37, 0.05)',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#FFE9A8';
                  e.currentTarget.style.borderColor = '#D4A72C';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#FFFDF5';
                  e.currentTarget.style.borderColor = '#E8D3B0';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span>View on Google</span>
                <ExternalLink size={12} color="#E8893A" />
              </a>

              <div style={{ display: 'flex', gap: '8px' }}>
                {(['left', 'right'] as const).map(dir => (
                  <button
                    key={dir}
                    onClick={() => scrollFn(dir)}
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      background: '#FFFDF5',
                      border: '1px solid #E8D3B0',
                      color: '#4A3325',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.25s ease',
                      boxShadow: '0 2px 8px rgba(74, 51, 37, 0.05)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = '#FFE9A8';
                      e.currentTarget.style.borderColor = '#D4A72C';
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = '#FFFDF5';
                      e.currentTarget.style.borderColor = '#E8D3B0';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                    aria-label={`Scroll ${dir}`}
                  >
                    {dir === 'left' ? <ChevronLeft size={19} /> : <ChevronRight size={19} />}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── INFINITE MARQUEE TRACK ── */}
      <div
        ref={scrollRef}
        style={{
          overflowX: 'hidden',
          width: '100%',
          padding: '10px 0 20px',
          position: 'relative',
        }}
      >
        <div
          className="reviews-marquee-track"
          style={{
            display: 'flex',
            gap: '24px',
            width: 'max-content',
            animation: 'reviewsMarquee 38s linear infinite',
            userSelect: 'none',
          }}
        >
          {[...reviews, ...reviews, ...reviews].map((review, i) => (
            <div
              key={`${review.id}-${i}`}
              style={{
                flexShrink: 0,
                width: '360px',
                borderRadius: '24px',
                background: '#FFFDF5',
                border: '1.5px solid #E8D3B0',
                padding: '28px 26px',
                position: 'relative',
                transition: 'all 0.35s ease',
                boxShadow: '0 12px 35px rgba(74, 51, 37, 0.07)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#D4A72C';
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 20px 45px rgba(74, 51, 37, 0.12), 0 0 25px rgba(212, 167, 44, 0.15)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#E8D3B0';
                e.currentTarget.style.transform = 'translateY(0px)';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(74, 51, 37, 0.07)';
              }}
            >
              {/* Quote icon watermark */}
              <div style={{ position: 'absolute', top: '22px', right: '22px', opacity: 0.25 }}>
                <Quote size={40} color="#D4A72C" />
              </div>

              {/* Stars */}
              <div style={{ display: 'flex', gap: '3px', marginBottom: '16px' }}>
                {[...Array(Math.min(review.rating, 5))].map((_, j) => (
                  <Star key={j} size={14} color="#D4A72C" fill="#D4A72C" />
                ))}
              </div>

              {/* Review Text */}
              <p
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: '14px',
                  fontStyle: 'italic',
                  fontWeight: 500,
                  color: '#4A3325',
                  lineHeight: 1.75,
                  margin: '0 0 24px',
                  minHeight: '80px',
                  display: '-webkit-box',
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                "{review.text}"
              </p>

              {/* Author & Verification Footer */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  borderTop: '1px solid #E8D3B0',
                  paddingTop: '16px',
                }}
              >
                {/* Profile Photo or Circular Initial Avatar */}
                {review.profilePhotoUrl ? (
                  <img
                    src={review.profilePhotoUrl}
                    alt={review.author}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      flexShrink: 0,
                      objectFit: 'cover',
                      border: '1.5px solid #D4A72C',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      flexShrink: 0,
                      background: review.avatarColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      fontWeight: 700,
                      color: '#FFFDF5',
                      border: '1.5px solid rgba(255,255,255,0.4)',
                    }}
                  >
                    {review.author.charAt(0)}
                  </div>
                )}

                <div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: '13px',
                      fontWeight: 700,
                      color: '#4A3325',
                      fontFamily: '"Outfit", sans-serif',
                    }}
                  >
                    {review.author}
                  </p>
                  <p style={{ margin: 0, fontSize: '10px', color: '#7A5C43' }}>
                    {review.date} · Google Review
                  </p>
                </div>

                <div
                  style={{
                    marginLeft: 'auto',
                    fontSize: '9px',
                    fontWeight: 700,
                    color: '#4A3325',
                    background: '#FFE9A8',
                    padding: '3px 8px',
                    borderRadius: '50px',
                    border: '1px solid #D4A72C',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  Verified
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Stats Indicators */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 36px', position: 'relative', zIndex: 10 }}>
        <Reveal direction="up" delay={0.2}>
          <div
            style={{
              textAlign: 'center',
              marginTop: '44px',
              display: 'flex',
              justifyContent: 'center',
              gap: '48px',
              flexWrap: 'wrap',
            }}
          >
            {[
              { label: 'AVERAGE RATING', value: `${rating.toFixed(1)} ★` },
              { label: 'REVIEWS ON GOOGLE', value: `${totalReviews} Verified` },
              { label: 'NEIGHBORHOOD CAFÉ', value: 'Est. 2024' },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <p
                  style={{
                    margin: 0,
                    fontFamily: '"Playfair Display", serif',
                    fontSize: '26px',
                    fontWeight: 700,
                    color: '#D4A72C',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {item.value}
                </p>
                <p
                  style={{
                    margin: '4px 0 0',
                    fontSize: '10px',
                    fontWeight: 700,
                    color: '#7A5C43',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    fontFamily: '"Outfit", sans-serif',
                  }}
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <style>{`
        @keyframes reviewsMarquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.333%); }
        }
        .reviews-marquee-track:hover {
          animation-play-state: paused !important;
        }
      `}</style>
    </section>
  );
};
