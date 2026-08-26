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
    <section id="picks" style={{ backgroundColor: '#050810', padding: '100px 0', overflow: 'hidden', position: 'relative' }}>
      {/* Subtle background accent */}
      <div style={{ position: 'absolute', top: '50%', left: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'rgba(38,101,140,0.12)', filter: 'blur(100px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(84,172,191,0.08)', filter: 'blur(80px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '56px', gap: '24px', flexWrap: 'wrap' }}>
          <div>
            <Reveal direction="left">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 14px', borderRadius: '50px', border: '1px solid rgba(167,235,242,0.2)', background: 'rgba(167,235,242,0.04)', marginBottom: '16px' }}>
                <Flame size={12} color="#A7EBF2" fill="#A7EBF2" />
                <span style={{ fontFamily: '"Outfit", sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A7EBF2' }}>Chef's Bestsellers</span>
              </div>
            </Reveal>
            <Reveal direction="left" delay={0.1}>
              <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 700, color: '#fff', margin: 0, letterSpacing: '-0.02em' }}>
                Signature{' '}
                <span style={{ fontStyle: 'italic', fontWeight: 400, color: '#A7EBF2' }}>Picks</span>
              </h2>
            </Reveal>
            <Reveal direction="left" delay={0.15}>
              <p style={{ fontFamily: '"Outfit", sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.45)', marginTop: '10px', maxWidth: '480px' }}>
                Handcrafted crowd favorites recommended by our patrons and local guides. Drag to explore.
              </p>
            </Reveal>
          </div>

          <Reveal direction="right" delay={0.1}>
            <div style={{ display: 'flex', gap: '10px' }}>
              {(['left', 'right'] as const).map(dir => (
                <button key={dir} onClick={() => scroll(dir)} style={{
                  width: '46px', height: '46px', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(167,235,242,0.18)',
                  color: '#A7EBF2', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.25s ease',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#26658C'; e.currentTarget.style.borderColor = '#54ACBF'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(167,235,242,0.18)'; }}
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
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  overflow: 'hidden',
                  scrollSnapAlign: 'start',
                  transition: 'all 0.4s ease',
                }}
                whileHover={{ y: -8, borderColor: 'rgba(167,235,242,0.3)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
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
                  <div className="img-overlay" />

                  {/* Category badge */}
                  <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', padding: '4px 12px', borderRadius: '50px', border: '1px solid rgba(167,235,242,0.2)' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#A7EBF2' }}>{item.category}</span>
                  </div>

                  {/* Veg indicator */}
                  <div style={{ position: 'absolute', top: '12px', right: '44px', width: '22px', height: '22px', borderRadius: '6px', background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: item.diet === 'veg' ? '#34d399' : '#f87171' }} />
                  </div>

                  {/* Heart */}
                  <button
                    onClick={() => onToggleFavorite(item)}
                    style={{
                      position: 'absolute', top: '8px', right: '8px',
                      width: '32px', height: '32px', borderRadius: '50%',
                      background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
                      border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: isFav ? '#f87171' : '#94a3b8',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <Heart size={14} fill={isFav ? '#f87171' : 'none'} />
                  </button>
                </div>

                {/* Content */}
                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#54ACBF' }}>{item.tagline}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(255,255,255,0.05)', padding: '3px 8px', borderRadius: '50px' }}>
                      <Star size={10} color="#fbbf24" fill="#fbbf24" />
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#fbbf24' }}>{item.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '18px', fontWeight: 700, color: '#fff', margin: '0 0 8px', lineHeight: 1.3 }}>
                    {item.name}
                  </h3>

                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, margin: '0 0 18px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {item.description}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '14px' }}>
                    <div>
                      <p style={{ margin: 0, fontSize: '9px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Price</p>
                      <p style={{ margin: 0, fontFamily: '"Playfair Display", serif', fontSize: '22px', fontWeight: 700, color: '#A7EBF2' }}>₹{item.price}</p>
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
          <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '11px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em' }}>
            ← drag or use arrows to scroll →
          </p>
        </Reveal>
      </div>
    </section>
  );
};
