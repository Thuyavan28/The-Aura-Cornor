import React from 'react';
import { Sparkles, MapPin, Clock, UtensilsCrossed, Heart, MessageCircle } from 'lucide-react';
import { Reveal } from './Reveal';

// Inline Instagram SVG since lucide-react may not export it
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
    <footer style={{ backgroundColor: '#000', color: '#fff', position: 'relative', overflow: 'hidden' }}>
      {/* Top gradient blob */}
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '700px', height: '300px', borderRadius: '50%', background: 'rgba(38,101,140,0.1)', filter: 'blur(100px)', pointerEvents: 'none' }} />

      {/* CTA Banner */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', padding: 'clamp(48px, 8vw, 80px) clamp(20px, 4vw, 32px)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <Reveal direction="up">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 16px', borderRadius: '50px', border: '1px solid rgba(167,235,242,0.2)', background: 'rgba(167,235,242,0.04)', marginBottom: '20px' }}>
              <Sparkles size={12} color="#A7EBF2" />
              <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A7EBF2', fontFamily: '"Outfit", sans-serif' }}>Your Next Visit Awaits</span>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(28px, 5vw, 64px)', fontWeight: 700, color: '#fff', margin: '0 0 16px', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
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
              {/* Explore Menu — inline hover to keep text light */}
              <a
                href="#menu"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '14px 28px', borderRadius: '50px',
                  background: '#26658C', color: '#fff',
                  fontFamily: '"Outfit", sans-serif', fontSize: '12px',
                  fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
                  textDecoration: 'none', cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 16px rgba(38,101,140,0.4)',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = '#54ACBF';
                  el.style.color = '#011026';
                  el.style.transform = 'scale(1.04)';
                  el.style.boxShadow = '0 8px 24px rgba(84,172,191,0.5)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = '#26658C';
                  el.style.color = '#fff';
                  el.style.transform = 'scale(1)';
                  el.style.boxShadow = '0 4px 16px rgba(38,101,140,0.4)';
                }}
              >
                <UtensilsCrossed size={15} />
                <span>Explore Menu</span>
              </a>

              {/* WhatsApp Book — goes to 9790921125 */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '14px 28px', borderRadius: '50px',
                  background: 'transparent', color: 'rgba(255,255,255,0.7)',
                  fontFamily: '"Outfit", sans-serif', fontSize: '12px',
                  fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
                  textDecoration: 'none', cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(255,255,255,0.18)',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.color = '#A7EBF2';
                  el.style.borderColor = 'rgba(167,235,242,0.45)';
                  el.style.background = 'rgba(167,235,242,0.06)';
                  el.style.transform = 'scale(1.03)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.color = 'rgba(255,255,255,0.7)';
                  el.style.borderColor = 'rgba(255,255,255,0.18)';
                  el.style.background = 'transparent';
                  el.style.transform = 'scale(1)';
                }}
              >
                <MessageCircle size={15} />
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
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #26658C, #54ACBF)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(84,172,191,0.25)', flexShrink: 0 }}>
                    <Sparkles size={16} color="#A7EBF2" />
                  </div>
                  <div>
                    <p style={{ margin: 0, fontFamily: '"Playfair Display", serif', fontSize: '18px', fontWeight: 700, color: '#fff', lineHeight: 1 }}>The Aura Corner</p>
                    <p style={{ margin: 0, fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#54ACBF', marginTop: '2px' }}>Boutique Lounge &amp; Café</p>
                  </div>
                </div>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, margin: '0 0 20px', maxWidth: '280px' }}>
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
                <h4 style={{ margin: '0 0 20px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#54ACBF', fontFamily: '"Outfit", sans-serif' }}>Navigation</h4>
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
                      style={{ textDecoration: 'none', fontSize: '13px', color: 'rgba(255,255,255,0.45)', transition: 'color 0.25s ease', fontFamily: '"Outfit", sans-serif' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#A7EBF2')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
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
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                      fontSize: '12px', fontWeight: 600,
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
