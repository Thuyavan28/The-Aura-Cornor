import React from 'react';
import { MapPin, Clock, Phone, ExternalLink, Navigation } from 'lucide-react';
import { Reveal } from './Reveal';

export const LocationMap: React.FC = () => {
  const address = '7/518, Velachery Main Rd, Vijayanagaram, Santhosapuram, Medavakkam, Chennai, Tamil Nadu 600100';
  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(address)}`;
  const whatsappUrl = `https://wa.me/919363642701?text=${encodeURIComponent("Hi! I'd like to book a table at The Aura Corner, Medavakkam.")}`;

  return (
    <section id="location" style={{ backgroundColor: '#fff', padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
      <div className="organic-pattern" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.5 }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(20px, 4vw, 32px)', position: 'relative', zIndex: 10 }}>
        {/* ── Responsive grid: info left, map right on desktop; stacked on mobile ── */}
        <div className="location-grid">

          {/* ── Left: Info ── */}
          <div>
            <Reveal direction="left">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 14px', borderRadius: '50px', border: '1px solid rgba(38,101,140,0.25)', background: 'rgba(38,101,140,0.06)', marginBottom: '20px' }}>
                <Navigation size={12} color="#26658C" />
                <span style={{ fontFamily: '"Outfit", sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#26658C' }}>Find Us</span>
              </div>
            </Reveal>

            <Reveal direction="left" delay={0.1}>
              <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(28px, 4vw, 50px)', fontWeight: 700, color: '#000', margin: '0 0 32px', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                Come, Sit Down &<br />
                <span style={{ fontStyle: 'italic', fontWeight: 400, color: '#26658C' }}>Stay a While</span>
              </h2>
            </Reveal>

            {/* Info cards */}
            {[
              {
                icon: <MapPin size={18} color="#26658C" />,
                label: 'Address',
                value: '7/518, Velachery Main Rd, Vijayanagaram, Medavakkam',
                sub: 'Chennai, Tamil Nadu 600100',
              },
              {
                icon: <Clock size={18} color="#26658C" />,
                label: 'Hours',
                value: 'Monday – Sunday',
                sub: '11:00 AM – 11:00 PM (Daily)',
              },
              {
                icon: <Phone size={18} color="#26658C" />,
                label: 'Contact',
                value: 'Walk in or reserve via WhatsApp',
                sub: '+91 93636 42701',
              },
            ].map((info, i) => (
              <Reveal key={i} direction="left" delay={0.15 + i * 0.1}>
                <div style={{
                  display: 'flex', gap: '16px', alignItems: 'flex-start',
                  padding: '20px', borderRadius: '18px',
                  background: '#fff', border: '1px solid rgba(0,0,0,0.07)',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                  marginBottom: '12px',
                  transition: 'all 0.3s ease',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(84,172,191,0.35)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(38,101,140,0.08)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.07)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'; e.currentTarget.style.transform = 'translateX(0px)'; }}
                >
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(38,101,140,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {info.icon}
                  </div>
                  <div>
                    <p style={{ margin: '0 0 4px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#94a3b8', fontFamily: '"Outfit", sans-serif' }}>{info.label}</p>
                    <p style={{ margin: '0 0 2px', fontSize: '14px', fontWeight: 600, color: '#000', fontFamily: '"Outfit", sans-serif' }}>{info.value}</p>
                    <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>{info.sub}</p>
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal direction="left" delay={0.45}>
              <div style={{ display: 'flex', gap: '12px', marginTop: '24px', flexWrap: 'wrap' }}>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '13px 24px', borderRadius: '50px',
                    background: '#000', color: '#fff',
                    fontFamily: '"Outfit", sans-serif', fontSize: '12px',
                    fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                    textDecoration: 'none', cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#26658C'; e.currentTarget.style.transform = 'scale(1.03)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#000'; e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  <Navigation size={14} />
                  <span>Get Directions</span>
                  <ExternalLink size={12} />
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '13px 24px', borderRadius: '50px',
                    background: '#25D366', color: '#fff',
                    fontFamily: '"Outfit", sans-serif', fontSize: '12px',
                    fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                    textDecoration: 'none', cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 16px rgba(37,211,102,0.35)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(37,211,102,0.5)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(37,211,102,0.35)'; }}
                >
                  <span>📲 WhatsApp Book</span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* ── Right: Map embed ── */}
          <Reveal direction="right" delay={0.1}>
            <div style={{ position: 'relative' }}>
              {/* Accent border */}
              <div style={{
                position: 'absolute', inset: '-8px',
                borderRadius: '32px',
                background: 'linear-gradient(135deg, rgba(84,172,191,0.25), rgba(38,101,140,0.1))',
                filter: 'blur(10px)',
                pointerEvents: 'none',
              }} />

              <div style={{ borderRadius: '24px', overflow: 'hidden', border: '2px solid rgba(84,172,191,0.2)', position: 'relative', boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }}>
                <iframe
                  title="The Aura Corner Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.2!2d80.1897!3d12.9261!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sen!2sin!4v1698765432100!5m2!1sen!2sin"
                  width="100%"
                  height="420"
                  style={{ border: 0, display: 'block', filter: 'grayscale(20%) contrast(1.05)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Map overlay label */}
                <div style={{
                  position: 'absolute', top: '16px', left: '16px',
                  background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)',
                  borderRadius: '14px', padding: '10px 16px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                  border: '1px solid rgba(84,172,191,0.2)',
                  display: 'flex', alignItems: 'center', gap: '8px',
                }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#34d399', boxShadow: '0 0 8px #34d399' }} />
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#000', fontFamily: '"Outfit", sans-serif' }}>The Aura Corner</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
