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
    avatarColor: '#26658C',
  },
  {
    author: 'Arjun Krishnan',
    date: 'Jul 2025',
    rating: 5,
    text: 'Came here for a chill evening after work. The lofi music, the lighting, and the food — everything was perfect. Loaded fries with cheese sauce are a must-try!',
    avatarColor: '#54ACBF',
  },
  {
    author: 'Deepa Rajan',
    date: 'Jun 2025',
    rating: 5,
    text: 'What a gem! Premium food at absolutely pocket-friendly prices. The hot chocolate is smooth, rich, and soul-warming. The staff was kind and attentive.',
    avatarColor: '#023859',
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
    avatarColor: '#10b981',
  },
  {
    author: 'Ravi Shankar',
    date: 'Jan 2025',
    rating: 5,
    text: 'Very pleasant experience. The service was quick despite being busy on a weekend. The sandwich with mayo and grilled veggies was a solid choice.',
    avatarColor: '#0284c7',
  },
  {
    author: 'Vikram Nair',
    date: 'Mar 2025',
    rating: 5,
    text: 'Honestly the best café I’ve been to in Medavakkam. Value for money is outstanding. Tried the chicken burger and it was juicy and well-seasoned. Highly recommend!',
    avatarColor: '#84cc16',
  },
  {
    author: 'Ananya Suresh',
    date: 'Apr 2025',
    rating: 5,
    text: 'Discovered this place through a friend and I’m so glad I did. The boba was fresh and perfectly sweetened, milkshakes are incredibly creamy. Will be back soon!',
    avatarColor: '#06b6d4',
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
        backgroundColor: '#010e22',
        padding: '110px 0 100px',
        overflow: 'hidden',
        position: 'relative',
        borderTop: '1px solid rgba(167,235,242,0.06)',
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
          background: 'radial-gradient(circle, rgba(38,101,140,0.18) 0%, rgba(2,56,89,0.08) 50%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 36px', position: 'relative', zIndex: 10 }}>
        {/* Header (Matching Reference Image 2) */}
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
                  border: '1px solid rgba(167,235,242,0.2)',
                  background: 'rgba(167,235,242,0.04)',
                  marginBottom: '14px',
                }}
              >
                <Star size={11} color="#A7EBF2" fill="#A7EBF2" />
                <span
                  style={{
                    fontFamily: '"Outfit", sans-serif',
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#A7EBF2',
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
                  color: '#fff',
                  margin: 0,
                  letterSpacing: '-0.02em',
                }}
              >
                Guests <span style={{ fontStyle: 'italic', fontWeight: 400, color: '#A7EBF2' }}>Love Us</span>
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
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(167,235,242,0.2)',
                    color: '#A7EBF2',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#26658C';
                    e.currentTarget.style.borderColor = '#54ACBF';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                    e.currentTarget.style.borderColor = 'rgba(167,235,242,0.2)';
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

      {/* ── INFINITE MARQUEE TRACK (Right to Left with Hover Pause) ── */}
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
          {/* Tripled reviews list for seamless infinite looping */}
          {[...REVIEWS, ...REVIEWS, ...REVIEWS].map((review, i) => (
            <div
              key={i}
              style={{
                flexShrink: 0,
                width: '360px',
                borderRadius: '24px',
                background: 'rgba(4, 15, 33, 0.75)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(167,235,242,0.12)',
                padding: '28px 26px',
                position: 'relative',
                transition: 'all 0.35s ease',
                boxShadow: '0 12px 35px rgba(0,0,0,0.3)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(167,235,242,0.45)';
                e.currentTarget.style.background = 'rgba(4, 20, 45, 0.95)';
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 20px 45px rgba(0,0,0,0.5), 0 0 25px rgba(84,172,191,0.15)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(167,235,242,0.12)';
                e.currentTarget.style.background = 'rgba(4, 15, 33, 0.75)';
                e.currentTarget.style.transform = 'translateY(0px)';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(0,0,0,0.3)';
              }}
            >
              {/* Quote icon watermark */}
              <div style={{ position: 'absolute', top: '22px', right: '22px', opacity: 0.12 }}>
                <Quote size={40} color="#A7EBF2" />
              </div>

              {/* 5 Stars */}
              <div style={{ display: 'flex', gap: '3px', marginBottom: '16px' }}>
                {[...Array(review.rating)].map((_, j) => (
                  <Star key={j} size={14} color="#fbbf24" fill="#fbbf24" />
                ))}
              </div>

              {/* Review Text */}
              <p
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: '14px',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  color: 'rgba(255,255,255,0.85)',
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
                  borderTop: '1px solid rgba(255,255,255,0.06)',
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
                    color: '#fff',
                    border: '1.5px solid rgba(255,255,255,0.2)',
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
                      color: '#fff',
                      fontFamily: '"Outfit", sans-serif',
                    }}
                  >
                    {review.author}
                  </p>
                  <p style={{ margin: 0, fontSize: '10px', color: 'rgba(255,255,255,0.45)' }}>
                    {review.date} · Google Review
                  </p>
                </div>

                <div
                  style={{
                    marginLeft: 'auto',
                    fontSize: '9px',
                    fontWeight: 700,
                    color: '#A7EBF2',
                    background: 'rgba(167,235,242,0.08)',
                    padding: '3px 8px',
                    borderRadius: '50px',
                    border: '1px solid rgba(167,235,242,0.2)',
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

      {/* Trust Stats Indicators (Matching Reference Image 2 bottom) */}
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
                    color: '#A7EBF2',
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
                    color: 'rgba(255,255,255,0.4)',
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
