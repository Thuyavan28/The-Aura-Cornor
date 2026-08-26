import React from 'react';
import { ShieldCheck, Coffee, HeartHandshake, Compass } from 'lucide-react';
import { Reveal } from './Reveal';

export const AboutAmbience: React.FC = () => (
  <section id="about" style={{ backgroundColor: '#fff', padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
    {/* Subtle dot pattern */}
    <div className="organic-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.5, pointerEvents: 'none' }} />

    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>

        {/* ── Left: Image ── */}
        <Reveal direction="left">
          <div style={{ position: 'relative' }}>
            {/* Glowing frame accent */}
            <div style={{
              position: 'absolute', inset: '-12px',
              borderRadius: '28px',
              background: 'linear-gradient(135deg, rgba(84,172,191,0.2), rgba(38,101,140,0.1))',
              filter: 'blur(12px)',
              pointerEvents: 'none',
            }} />

            <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', border: '2px solid rgba(84,172,191,0.25)' }}>
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80"
                alt="The Aura Corner Café Ambience"
                loading="lazy"
                style={{ width: '100%', height: '480px', objectFit: 'cover', display: 'block' }}
              />
              {/* Overlay info card */}
              <div style={{
                position: 'absolute', bottom: '20px', left: '20px', right: '20px',
                background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(16px)',
                borderRadius: '16px', padding: '16px 20px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                border: '1px solid rgba(84,172,191,0.2)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Coffee size={18} color="#A7EBF2" />
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: '12px', fontWeight: 700, color: '#000', fontFamily: '"Outfit", sans-serif' }}>Peaceful Haven</p>
                    <p style={{ margin: 0, fontSize: '11px', color: '#64748b' }}>Medavakkam, Chennai</p>
                  </div>
                </div>
                <div style={{ padding: '6px 12px', borderRadius: '50px', background: '#000', color: '#A7EBF2', fontSize: '11px', fontWeight: 700, letterSpacing: '0.05em' }}>
                  5.0 ⭐ Rating
                </div>
              </div>
            </div>

            {/* Floating mini card */}
            <div className="float-badge" style={{
              position: 'absolute', top: '-16px', right: '-20px',
              background: '#fff', borderRadius: '16px', padding: '14px 18px',
              boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
              border: '1px solid rgba(84,172,191,0.2)',
              display: 'flex', alignItems: 'center', gap: '10px',
              zIndex: 20,
            }}>
              <Coffee size={20} color="#26658C" />
              <div>
                <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, color: '#000', fontFamily: '"Playfair Display", serif' }}>Crafted Daily</p>
                <p style={{ margin: 0, fontSize: '10px', color: '#64748b' }}>Fresh to order</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── Right: Copy ── */}
        <div>
          <Reveal direction="right" delay={0.05}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 14px', borderRadius: '50px', border: '1px solid rgba(38,101,140,0.25)', background: 'rgba(38,101,140,0.06)', marginBottom: '20px' }}>
              <Compass size={12} color="#26658C" />
              <span style={{ fontFamily: '"Outfit", sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#26658C' }}>Our Story</span>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.1}>
            <h2 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(30px, 4vw, 50px)',
              fontWeight: 700, color: '#000',
              lineHeight: 1.15, margin: '0 0 24px', letterSpacing: '-0.02em',
            }}>
              Where Calm Meets<br />
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: '#26658C' }}>Exceptional Taste</span>
            </h2>
          </Reveal>

          <Reveal direction="right" delay={0.15}>
            <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.8, margin: '0 0 16px', fontWeight: 300 }}>
              <strong style={{ fontWeight: 600, color: '#000' }}>The Aura Corner</strong> was born with a single vision: to create a peaceful, unhurried space where friends can linger, remote workers can recharge, and food lovers can enjoy gourmet meals without paying exorbitant prices.
            </p>
          </Reveal>

          <Reveal direction="right" delay={0.2}>
            <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.8, margin: '0 0 32px', fontWeight: 300 }}>
              From our signature Peri Peri Maggi and crispy loaded chicken fries to velvety hot chocolates and handcrafted boba blends — everything is cooked to order with uncompromised quality.
            </p>
          </Reveal>

          {/* Value Props */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '36px' }}>
            {[
              { icon: <ShieldCheck size={18} color="#26658C" />, title: 'Pure Quality', desc: 'Top-tier ingredients, cooked fresh every order.' },
              { icon: <HeartHandshake size={18} color="#26658C" />, title: 'Pocket-Friendly', desc: '₹200–400 avg with generous portions.' },
            ].map((item, i) => (
              <Reveal key={i} direction={i % 2 === 0 ? 'left' : 'right'} delay={0.25 + i * 0.1}>
                <div style={{
                  padding: '20px', borderRadius: '18px', background: '#fff',
                  border: '1px solid rgba(0,0,0,0.07)',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                  display: 'flex', gap: '14px', alignItems: 'flex-start',
                  transition: 'all 0.3s ease',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(84,172,191,0.35)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(38,101,140,0.08)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.07)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'; }}
                >
                  <div style={{ padding: '10px', borderRadius: '12px', background: 'rgba(38,101,140,0.07)', flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 4px', fontSize: '13px', fontWeight: 700, color: '#000', fontFamily: '"Outfit", sans-serif' }}>{item.title}</h4>
                    <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8', lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal direction="right" delay={0.35}>
            <a href="#menu" className="btn-primary" style={{ background: '#000', display: 'inline-flex' }}>
              <span>Explore Full Menu</span>
              <span style={{ fontSize: '18px', lineHeight: 1 }}>↓</span>
            </a>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);
