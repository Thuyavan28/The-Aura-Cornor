import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Heart, Plus, Flame } from 'lucide-react';
import { SIGNATURE_PICKS } from '../data/menuData';
import type { SignaturePick } from '../types/cafe';
import { Reveal } from './Reveal';

interface SignaturePicksProps {
  favorites: string[];
  onToggleFavorite: (item: any) => void;
  onAddToCart: (item: any) => void;
}

export const SignaturePicks: React.FC<SignaturePicksProps> = ({ favorites, onToggleFavorite, onAddToCart }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScroll, setStartScroll] = useState(0);

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -370 : 370, behavior: 'smooth' });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setStartScroll(scrollRef.current.scrollLeft);
  };
  const onMouseUp = () => setDragging(false);
  const onMouseLeave = () => setDragging(false);
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft = startScroll - (x - startX) * 1.4;
  };

  return (
    <section id="picks" style={{ backgroundColor: '#FFFDF5', padding: '100px 0', overflow: 'hidden', position: 'relative' }}>
      {/* Subtle background accents */}
      <div style={{ position: 'absolute', top: '50%', left: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'rgba(232, 137, 58, 0.08)', filter: 'blur(100px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(212, 167, 44, 0.08)', filter: 'blur(80px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '56px', gap: '24px', flexWrap: 'wrap' }}>
          <div>
            <Reveal direction="left">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 14px', borderRadius: '50px', border: '1px solid #D4A72C', background: '#FFE9A8', marginBottom: '16px' }}>
                <Flame size={12} color="#E8893A" fill="#E8893A" />
                <span style={{ fontFamily: '"Outfit", sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#4A3325' }}>Chef's Bestsellers</span>
              </div>
            </Reveal>
            <Reveal direction="left" delay={0.1}>
              <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 700, color: '#4A3325', margin: 0, letterSpacing: '-0.02em' }}>
                Signature{' '}
                <span style={{ fontStyle: 'italic', fontWeight: 400, color: '#D4A72C' }}>Picks</span>
              </h2>
            </Reveal>
            <Reveal direction="left" delay={0.15}>
              <p style={{ fontFamily: '"Outfit", sans-serif', fontSize: '14px', color: '#7A5C43', marginTop: '10px', maxWidth: '480px' }}>
                Handcrafted crowd favorites recommended by our patrons and local guides. Drag to explore.
              </p>
            </Reveal>
          </div>

          <Reveal direction="right" delay={0.1}>
            <div style={{ display: 'flex', gap: '10px' }}>
              {(['left', 'right'] as const).map(dir => (
                <button key={dir} onClick={() => scroll(dir)} style={{
                  width: '46px', height: '46px', borderRadius: '50%',
                  background: '#FFFDF5',
                  border: '1px solid #E8D3B0',
                  color: '#4A3325', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.25s ease',
                  boxShadow: '0 2px 8px rgba(74, 51, 37, 0.05)',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#FFE9A8'; e.currentTarget.style.borderColor = '#D4A72C'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#FFFDF5'; e.currentTarget.style.borderColor = '#E8D3B0'; }}
                  aria-label={`Scroll ${dir}`}
                >
                  {dir === 'left' ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          onMouseMove={onMouseMove}
          className="no-scrollbar"
          style={{
            display: 'flex', gap: '24px', overflowX: 'auto', paddingBottom: '12px', paddingTop: '4px',
            cursor: dragging ? 'grabbing' : 'grab',
            scrollSnapType: 'x mandatory',
            userSelect: 'none',
          }}
        >
          {SIGNATURE_PICKS.map((item: SignaturePick, i) => {
            const isFav = favorites.includes(item.id);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{
                  flexShrink: 0, width: '300px',
                  borderRadius: '24px',
                  background: '#FFFDF5',
                  border: '1px solid #E8D3B0',
                  overflow: 'hidden',
                  scrollSnapAlign: 'start',
                  transition: 'all 0.4s ease',
                  boxShadow: '0 4px 20px rgba(74, 51, 37, 0.06)',
                }}
                whileHover={{ y: -8, borderColor: '#D4A72C', boxShadow: '0 20px 40px rgba(74, 51, 37, 0.12)' }}
              >
                {/* Image */}
                <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease' }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  />

                  {/* Category badge */}
                  <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(255,253,245,0.92)', backdropFilter: 'blur(8px)', padding: '4px 12px', borderRadius: '50px', border: '1px solid #D4A72C' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#4A3325' }}>{item.category}</span>
                  </div>

                  {/* Veg indicator */}
                  <div style={{ position: 'absolute', top: '12px', right: '44px', width: '22px', height: '22px', borderRadius: '6px', background: 'rgba(255,253,245,0.92)', border: '1px solid #E8D3B0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: item.diet === 'veg' ? '#16a34a' : '#dc2626' }} />
                  </div>

                  {/* Heart */}
                  <button
                    onClick={() => onToggleFavorite(item)}
                    style={{
                      position: 'absolute', top: '8px', right: '8px',
                      width: '32px', height: '32px', borderRadius: '50%',
                      background: 'rgba(255,253,245,0.92)', backdropFilter: 'blur(8px)',
                      border: '1px solid #E8D3B0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: isFav ? '#dc2626' : '#7A5C43',
                      transition: 'all 0.2s ease',
                    }}
                    aria-label="Save to favorites"
                  >
                    <Heart size={14} fill={isFav ? '#dc2626' : 'none'} />
                  </button>
                </div>

                {/* Content */}
                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#E8893A' }}>{item.tagline}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#FFE9A8', padding: '3px 8px', borderRadius: '50px' }}>
                      <Star size={10} color="#D4A72C" fill="#D4A72C" />
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#4A3325' }}>{item.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '18px', fontWeight: 700, color: '#4A3325', margin: '0 0 8px', lineHeight: 1.3 }}>
                    {item.name}
                  </h3>

                  <p style={{ fontSize: '12px', color: '#7A5C43', lineHeight: 1.6, margin: '0 0 18px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {item.description}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E8D3B0', paddingTop: '14px' }}>
                    <div>
                      <p style={{ margin: 0, fontSize: '9px', color: '#7A5C43', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>Price</p>
                      <p style={{ margin: 0, fontFamily: '"Playfair Display", serif', fontSize: '22px', fontWeight: 700, color: '#D4A72C' }}>₹{item.price}</p>
                    </div>
                    <button
                      onClick={() => onAddToCart(item)}
                      className="btn-primary"
                      style={{ padding: '9px 18px', fontSize: '10px' }}
                    >
                      <Plus size={13} />
                      <span>Order</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <Reveal direction="up" delay={0.2}>
          <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '11px', color: '#7A5C43', letterSpacing: '0.1em' }}>
            ← drag or use arrows to scroll →
          </p>
        </Reveal>
      </div>
    </section>
  );
};
