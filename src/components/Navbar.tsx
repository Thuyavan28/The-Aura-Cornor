import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Menu as MenuIcon, X, MessageCircle, Heart, MapPin, Clock } from 'lucide-react';

interface NavbarProps {
  favoriteCount: number;
  onOpenFavorites: () => void;
  onOpenReservation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ favoriteCount, onOpenFavorites, onOpenReservation }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const heroHeight = document.getElementById('hero')?.offsetHeight ?? 900;
      setScrolled(window.scrollY > 50);
      setPastHero(window.scrollY > heroHeight - 80);
      const sections = ['hero', 'picks', 'about', 'menu', 'reviews', 'connect', 'location'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 160) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Home', href: '#hero', id: 'hero' },
    { label: 'Picks', href: '#picks', id: 'picks' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Menu', href: '#menu', id: 'menu' },
    { label: 'Reviews', href: '#reviews', id: 'reviews' },
    { label: 'Connect', href: '#connect', id: 'connect' },
    { label: 'Visit', href: '#location', id: 'location' },
  ];

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: 'all 0.4s ease',
          padding: scrolled ? '12px 0' : '20px 0',
          background: 'rgba(0,0,0,0.92)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(167,235,242,0.08)',
          transform: pastHero ? 'translateY(0)' : 'translateY(-100%)',
          opacity: pastHero ? 1 : 0,
          pointerEvents: pastHero ? 'all' : 'none',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <div style={{
              width: '38px', height: '38px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #26658C, #54ACBF)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 20px rgba(84,172,191,0.3)',
            }}>
              <Coffee size={18} color="#011026" strokeWidth={2.5} />
            </div>
            <div>
              <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '18px', fontWeight: 700, color: '#fff', lineHeight: 1 }}>
                The Aura Corner
              </div>
              <div style={{ fontFamily: '"Outfit", sans-serif', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#54ACBF', marginTop: '2px' }}>
                Boutique Lounge & Café
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)', padding: '6px 12px', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.06)' }} className="hide-mobile">
            {links.map(link => (
              <a
                key={link.id}
                href={link.href}
                style={{
                  padding: '7px 16px',
                  borderRadius: '50px',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'all 0.25s ease',
                  background: activeSection === link.id ? '#A7EBF2' : 'transparent',
                  color: activeSection === link.id ? '#000' : 'rgba(255,255,255,0.7)',
                  boxShadow: activeSection === link.id ? '0 0 15px rgba(167,235,242,0.4)' : 'none',
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={onOpenFavorites}
              style={{
                position: 'relative',
                width: '40px', height: '40px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(167,235,242,0.15)',
                color: '#A7EBF2',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(167,235,242,0.12)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
              aria-label="Favorites"
            >
              <Heart size={16} fill={favoriteCount > 0 ? '#A7EBF2' : 'none'} />
              {favoriteCount > 0 && (
                <span style={{
                  position: 'absolute', top: '-4px', right: '-4px',
                  background: '#54ACBF', color: '#000',
                  fontSize: '9px', fontWeight: 700,
                  width: '16px', height: '16px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {favoriteCount > 9 ? '9+' : favoriteCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenReservation}
              className="btn-primary hide-mobile"
              style={{ padding: '10px 22px', fontSize: '10px' }}
            >
              <MessageCircle size={13} />
              <span>Book Table</span>
            </button>

            <button
              onClick={() => setMobileOpen(true)}
              style={{
                padding: '8px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px',
                color: '#fff',
                cursor: 'pointer',
                display: 'none',
              }}
              className="show-mobile"
              aria-label="Open menu"
            >
              <MenuIcon size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', zIndex: 60 }}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 250 }}
              style={{
                position: 'fixed', top: 0, right: 0, bottom: 0, width: '280px',
                background: '#000', borderLeft: '1px solid rgba(167,235,242,0.12)',
                zIndex: 70, display: 'flex', flexDirection: 'column', padding: '24px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', paddingTop: '16px' }}>
                <span style={{ fontFamily: '"Playfair Display", serif', fontSize: '18px', fontWeight: 700, color: '#fff' }}>Menu</span>
                <button onClick={() => setMobileOpen(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                  <X size={22} />
                </button>
              </div>

              <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                {links.map(link => (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      padding: '13px 16px',
                      borderRadius: '12px',
                      textDecoration: 'none',
                      fontFamily: '"Outfit", sans-serif',
                      fontSize: '14px',
                      fontWeight: 500,
                      letterSpacing: '0.05em',
                      transition: 'all 0.25s ease',
                      background: activeSection === link.id ? 'rgba(167,235,242,0.08)' : 'transparent',
                      color: activeSection === link.id ? '#A7EBF2' : 'rgba(255,255,255,0.75)',
                      borderLeft: activeSection === link.id ? '2px solid #A7EBF2' : '2px solid transparent',
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#64748b', marginBottom: '8px' }}>
                  <MapPin size={12} color="#54ACBF" />
                  <span>Medavakkam, Chennai</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#64748b', marginBottom: '16px' }}>
                  <Clock size={12} color="#54ACBF" />
                  <span>11 AM – 11 PM Daily</span>
                </div>
                <button onClick={() => { setMobileOpen(false); onOpenReservation(); }} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  <MessageCircle size={14} />
                  <span>Book Table</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 1024px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </>
  );
};
