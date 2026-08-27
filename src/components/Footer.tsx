import React from 'react';
import { Sparkles, MapPin, Clock, UtensilsCrossed, Heart, MessageCircle } from 'lucide-react';
import { Reveal } from './Reveal';

// Inline Instagram SVG
const InstagramIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  const whatsappUrl = `https://wa.me/919790921125?text=${encodeURIComponent("Hi! I'd like to book a table at The Aura Corner.")}`;

  return (
    <footer style={{ backgroundColor: '#FAF3E0', color: '#4A3325', position: 'relative', overflow: 'hidden', borderTop: '1px solid #E8D3B0' }}>
      {/* Top gradient blob */}
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '700px', height: '300px', borderRadius: '50%', background: 'rgba(255,233,168,0.5)', filter: 'blur(100px)', pointerEvents: 'none' }} />

      {/* CTA Banner */}
      <div style={{ borderBottom: '1px solid #E8D3B0', padding: 'clamp(48px, 8vw, 80px) clamp(20px, 4vw, 32px)', background: '#FFF8DC' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <Reveal direction="up">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 16px', borderRadius: '50px', border: '1px solid #D4A72C', background: '#FFE9A8', marginBottom: '20px' }}>
              <Sparkles size={12} color="#E8893A" />
              <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#4A3325', fontFamily: '"Outfit", sans-serif' }}>Your Next Visit Awaits</span>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(28px, 5vw, 64px)', fontWeight: 700, color: '#4A3325', margin: '0 0 16px', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
              Ready to Experience the{' '}
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: '#D4A72C' }}>Aura?</span>
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <p style={{ fontSize: '14px', color: '#7A5C43', maxWidth: '480px', margin: '0 auto 36px', lineHeight: 1.7 }}>
              From that first sip of boba to the last bite of loaded fries — every moment at The Aura Corner is designed to be unforgettable.
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.3}>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {/* Explore Menu */}
              <a
                href="#menu"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '14px 28px', borderRadius: '50px',
                  background: '#E8893A', color: '#FFFDF5',
                  fontFamily: '"Outfit", sans-serif', fontSize: '12px',
                  fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
                  textDecoration: 'none', cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 16px rgba(232, 137, 58, 0.35)',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = '#D4A72C';
                  el.style.color = '#4A3325';
                  el.style.transform = 'scale(1.04)';
                  el.style.boxShadow = '0 8px 24px rgba(212, 167, 44, 0.45)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = '#E8893A';
                  el.style.color = '#FFFDF5';
                  el.style.transform = 'scale(1)';
                  el.style.boxShadow = '0 4px 16px rgba(232, 137, 58, 0.35)';
                }}
              >
                <UtensilsCrossed size={15} />
                <span>Explore Menu</span>
              </a>

              {/* WhatsApp Book */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '14px 28px', borderRadius: '50px',
                  background: '#FFFDF5', color: '#4A3325',
                  fontFamily: '"Outfit", sans-serif', fontSize: '12px',
                  fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
                  textDecoration: 'none', cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: '1px solid #E8D3B0',
                  boxShadow: '0 2px 10px rgba(74, 51, 37, 0.05)',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.color = '#4A3325';
                  el.style.borderColor = '#D4A72C';
                  el.style.background = '#FFE9A8';
                  el.style.transform = 'scale(1.03)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.color = '#4A3325';
                  el.style.borderColor = '#E8D3B0';
                  el.style.background = '#FFFDF5';
                  el.style.transform = 'scale(1)';
                }}
              >
                <MessageCircle size={15} color="#E8893A" />
                <span>Book on WhatsApp</span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Footer links */}
      <div style={{ padding: 'clamp(40px, 6vw, 60px) clamp(20px, 4vw, 32px) 32px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div className="footer-links-grid">

            {/* Brand */}
            <Reveal direction="left">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #D4A72C, #E8893A)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(212,167,44,0.25)', flexShrink: 0 }}>
                    <Sparkles size={16} color="#FFFDF5" />
                  </div>
                  <div>
                    <p style={{ margin: 0, fontFamily: '"Playfair Display", serif', fontSize: '18px', fontWeight: 700, color: '#4A3325', lineHeight: 1 }}>The Aura Corner</p>
                    <p style={{ margin: 0, fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#E8893A', marginTop: '2px', fontWeight: 700 }}>Boutique Lounge &amp; Café</p>
                  </div>
                </div>
                <p style={{ fontSize: '13px', color: '#7A5C43', lineHeight: 1.7, margin: '0 0 20px', maxWidth: '280px' }}>
                  A cozy lounge café in Medavakkam, Chennai, dedicated to crafting memorable moments through food, drink, and ambience.
                </p>
                {/* Social icons */}
                <div style={{ display: 'flex', gap: '10px' }}>
                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/the_aura_corner_2026/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-pill"
                    aria-label="Instagram"
                    title="Instagram @the_aura_corner_2026"
                  >
                    <InstagramIcon size={16} />
                  </a>
                  {/* WhatsApp */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-pill"
                    aria-label="WhatsApp"
                    title="Chat on WhatsApp"
                  >
                    <MessageCircle size={16} />
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Quick Links */}
            <Reveal direction="up" delay={0.1}>
              <div>
                <h4 style={{ margin: '0 0 20px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#E8893A', fontFamily: '"Outfit", sans-serif' }}>Navigation</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { label: 'Home', href: '#hero' },
                    { label: 'Signature Picks', href: '#picks' },
                    { label: 'About', href: '#about' },
                    { label: 'Polaroid Gallery', href: '#gallery' },
                    { label: 'Menu', href: '#menu' },
                    { label: 'Reviews', href: '#reviews' },
                    { label: 'Location', href: '#location' },
                  ].map(link => (
                    <a key={link.label} href={link.href}
                      style={{ textDecoration: 'none', fontSize: '13px', color: '#7A5C43', transition: 'color 0.25s ease', fontFamily: '"Outfit", sans-serif', fontWeight: 500 }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#E8893A')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#7A5C43')}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Menu cats */}
            <Reveal direction="up" delay={0.15}>
              <div>
                <h4 style={{ margin: '0 0 20px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#E8893A', fontFamily: '"Outfit", sans-serif' }}>Menu</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {['Coffee & Hot Drinks', 'Boba & Cold Drinks', 'Milkshakes', 'Loaded Fries', 'Burgers', 'Gourmet Bowls'].map(item => (
                    <a key={item} href="#menu"
                      style={{ textDecoration: 'none', fontSize: '13px', color: '#7A5C43', transition: 'color 0.25s ease', fontFamily: '"Outfit", sans-serif', fontWeight: 500 }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#E8893A')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#7A5C43')}
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
                <h4 style={{ margin: '0 0 20px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#E8893A', fontFamily: '"Outfit", sans-serif' }}>Visit Us</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <MapPin size={14} color="#E8893A" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <p style={{ margin: 0, fontSize: '12px', color: '#7A5C43', lineHeight: 1.6 }}>7/518, Velachery Main Rd<br />Medavakkam, Chennai 600100</p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <Clock size={14} color="#E8893A" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <p style={{ margin: 0, fontSize: '12px', color: '#7A5C43' }}>Mon–Sun: 11 AM – 11 PM</p>
                    </div>
                  </div>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                      fontSize: '12px', fontWeight: 700,
                      color: '#25D366', textDecoration: 'none',
                      fontFamily: '"Outfit", sans-serif',
                      transition: 'opacity 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                  >
                    <MessageCircle size={13} />
                    +91 97909 21125
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: '1px solid #E8D3B0', paddingTop: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <p style={{ margin: 0, fontSize: '12px', color: '#7A5C43' }}>
              © {year} The Aura Corner. All rights reserved.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#7A5C43' }}>
              <span>Crafted with</span>
              <Heart size={12} color="#E8893A" fill="#E8893A" />
              <span>in Chennai</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
