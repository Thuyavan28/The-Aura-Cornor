import React, { useRef } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Reveal } from './Reveal';

interface Review {
  author: string;
  date: string;
  rating: number;
  text: string;
  avatarColor: string;
}

const REVIEWS: Review[] = [
  {
    author: 'Priya Menon',
    date: 'Aug 2025',
    rating: 5,
    text: 'Absolutely loved the ambience! The Peri Peri Maggi was insanely delicious and the boba drinks were so refreshing. Found my new favourite hangout spot in Chennai.',
    avatarColor: '#D4A72C',
  },
  {
    author: 'Arjun Krishnan',
    date: 'Jul 2025',
    rating: 5,
    text: 'Came here for a chill evening after work. The lofi music, the lighting, and the food — everything was perfect. Loaded fries with cheese sauce are a must-try!',
    avatarColor: '#E8893A',
  },
  {
    author: 'Deepa Rajan',
    date: 'Jun 2025',
    rating: 5,
    text: 'What a gem! Premium food at absolutely pocket-friendly prices. The hot chocolate is smooth, rich, and soul-warming. The staff was kind and attentive.',
    avatarColor: '#7A5C43',
  },
  {
    author: 'Karthik Selvam',
    date: 'May 2025',
    rating: 5,
    text: '5 stars all the way. The café has this calm and cozy vibe that makes you want to stay for hours. Gourmet bowls were filling and beautifully plated.',
    avatarColor: '#16a34a',
  },
  {
    author: 'Shalini Bala',
    date: 'Feb 2025',
    rating: 5,
    text: 'Perfect place to study or just chill with friends. Great food, great vibes, great prices. The corner seating is super aesthetic for photos too!',
    avatarColor: '#E8893A',
  },
  {
    author: 'Ravi Shankar',
    date: 'Jan 2025',
    rating: 5,
    text: 'Very pleasant experience. The service was quick despite being busy on a weekend. The sandwich with mayo and grilled veggies was a solid choice.',
    avatarColor: '#4A3325',
  },
  {
    author: 'Vikram Nair',
    date: 'Mar 2025',
    rating: 5,
    text: 'Honestly the best café I’ve been to in Medavakkam. Value for money is outstanding. Tried the chicken burger and it was juicy and well-seasoned. Highly recommend!',
    avatarColor: '#D4A72C',
  },
  {
    author: 'Ananya Suresh',
    date: 'Apr 2025',
    rating: 5,
    text: 'Discovered this place through a friend and I’m so glad I did. The boba was fresh and perfectly sweetened, milkshakes are incredibly creamy. Will be back soon!',
    avatarColor: '#E8893A',
  },
];

export const ReviewsMarquee: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

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
                  padding: '5px 14px',
                  borderRadius: '50px',
                  border: '1px solid #D4A72C',
                  background: '#FFE9A8',
                  marginBottom: '14px',
                }}
              >
                <Star size={11} color="#D4A72C" fill="#D4A72C" />
                <span
                  style={{
                    fontFamily: '"Outfit", sans-serif',
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#4A3325',
                  }}
                >
                  5.0 RATING · 8 REVIEWS
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
                Guests <span style={{ fontStyle: 'italic', fontWeight: 400, color: '#D4A72C' }}>Love Us</span>
              </h2>
            </Reveal>
          </div>

          {/* Navigation arrow buttons */}
          <Reveal direction="right" delay={0.1}>
            <div style={{ display: 'flex', gap: '10px' }}>
              {(['left', 'right'] as const).map(dir => (
                <button
                  key={dir}
                  onClick={() => scrollFn(dir)}
                  style={{
                    width: '46px',
                    height: '46px',
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
          {[...REVIEWS, ...REVIEWS, ...REVIEWS].map((review, i) => (
            <div
              key={i}
              style={{
                flexShrink: 0,
                width: '360px',
                borderRadius: '24px',
                background: '#FFFDF5',
                border: '1px solid #E8D3B0',
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

              {/* 5 Stars */}
              <div style={{ display: 'flex', gap: '3px', marginBottom: '16px' }}>
                {[...Array(review.rating)].map((_, j) => (
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
                {/* Circular Initial Avatar */}
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
              { label: 'AVERAGE RATING', value: '5.0 ★' },
              { label: 'REVIEWS ON GOOGLE', value: '8 Verified' },
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
