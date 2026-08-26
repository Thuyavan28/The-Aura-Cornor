import React from 'react';
import { Sparkles, MapPin, Clock, UtensilsCrossed, Heart, Link, MessageCircle, AtSign } from 'lucide-react';
import { Reveal } from './Reveal';

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: '#000', color: '#fff', position: 'relative', overflow: 'hidden' }}>
      {/* Top gradient blob */}
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '700px', height: '300px', borderRadius: '50%', background: 'rgba(38,101,140,0.1)', filter: 'blur(100px)', pointerEvents: 'none' }} />

      {/* CTA Banner */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '80px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <Reveal direction="up">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 16px', borderRadius: '50px', border: '1px solid rgba(167,235,242,0.2)', background: 'rgba(167,235,242,0.04)', marginBottom: '20px' }}>
              <Sparkles size={12} color="#A7EBF2" />
              <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A7EBF2', fontFamily: '"Outfit", sans-serif' }}>Your Next Visit Awaits</span>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, color: '#fff', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
              Ready to Experience the{' '}
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: '#A7EBF2' }}>Aura?</span>
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', maxWidth: '480px', margin: '0 auto 36px', lineHeight: 1.7 }}>
              From that first sip of boba to the last bite of loaded fries — every moment at The Aura Corner is designed to be unforgettable.
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.3}>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#menu" className="btn-primary">
                <UtensilsCrossed size={15} />
                <span>Explore Menu</span>
              </a>
              <a
                href="https://maps.google.com/?q=7/518+Velachery+Main+Rd+Medavakkam+Chennai"
                target="_blank" rel="noopener noreferrer"
                className="btn-outline"
              >
                <MapPin size={15} />
                <span>Get Directions</span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Footer links */}
      <div style={{ padding: '60px 24px 32px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.2fr', gap: '48px', marginBottom: '48px' }}>

            {/* Brand */}
            <Reveal direction="left">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #26658C, #54ACBF)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(84,172,191,0.25)' }}>
                    <Sparkles size={16} color="#A7EBF2" />
                  </div>
                  <div>
                    <p style={{ margin: 0, fontFamily: '"Playfair Display", serif', fontSize: '18px', fontWeight: 700, color: '#fff', lineHeight: 1 }}>The Aura Corner</p>
                    <p style={{ margin: 0, fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#54ACBF', marginTop: '2px' }}>Boutique Lounge & Café</p>
                  </div>
                </div>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, margin: '0 0 20px', maxWidth: '280px' }}>
                  A cozy lounge café in Medavakkam, Chennai, dedicated to crafting memorable moments through food, drink, and ambience.
                </p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {[Link, MessageCircle, AtSign].map((Icon, i) => (
                    <a key={i} href="#" className="social-pill" aria-label="Social">
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Quick Links */}
            <Reveal direction="up" delay={0.1}>
              <div>
                <h4 style={{ margin: '0 0 20px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#54ACBF', fontFamily: '"Outfit", sans-serif' }}>Navigation</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {['Home', 'Signature Picks', 'About', 'Menu', 'Reviews', 'Location'].map(link => (
                    <a key={link} href={`#${link.toLowerCase().replace(/\s+/g, '')}`}
                      style={{ textDecoration: 'none', fontSize: '13px', color: 'rgba(255,255,255,0.45)', transition: 'color 0.25s ease', fontFamily: '"Outfit", sans-serif' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#A7EBF2')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Menu cats */}
            <Reveal direction="up" delay={0.15}>
              <div>
                <h4 style={{ margin: '0 0 20px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#54ACBF', fontFamily: '"Outfit", sans-serif' }}>Menu</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {['Coffee & Hot Drinks', 'Boba & Cold Drinks', 'Milkshakes', 'Loaded Fries', 'Burgers', 'Gourmet Bowls'].map(item => (
                    <a key={item} href="#menu"
                      style={{ textDecoration: 'none', fontSize: '13px', color: 'rgba(255,255,255,0.45)', transition: 'color 0.25s ease', fontFamily: '"Outfit", sans-serif' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#A7EBF2')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Visit info */}
            <Reveal direction="right" delay={0.2}>
              <div>
                <h4 style={{ margin: '0 0 20px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#54ACBF', fontFamily: '"Outfit", sans-serif' }}>Visit Us</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <MapPin size={14} color="#54ACBF" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <p style={{ margin: 0, fontSize: '12px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>7/518, Velachery Main Rd<br />Medavakkam, Chennai 600100</p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <Clock size={14} color="#54ACBF" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <p style={{ margin: 0, fontSize: '12px', color: 'rgba(255,255,255,0.45)' }}>Mon–Sun: 11 AM – 11 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <p style={{ margin: 0, fontSize: '12px', color: 'rgba(255,255,255,0.25)' }}>
              © {year} The Aura Corner. All rights reserved.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'rgba(255,255,255,0.25)' }}>
              <span>Crafted with</span>
              <Heart size={12} color="#f87171" fill="#f87171" />
              <span>in Chennai</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
