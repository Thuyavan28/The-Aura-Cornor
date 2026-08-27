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

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ['hero', 'picks', 'about', 'gallery', 'menu', 'reviews', 'connect', 'location'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Home', href: '#hero', id: 'hero' },
    { label: 'Picks', href: '#picks', id: 'picks' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Gallery', href: '#gallery', id: 'gallery' },
    { label: 'Menu', href: '#menu', id: 'menu' },
    { label: 'Reviews', href: '#reviews', id: 'reviews' },
    { label: 'Connect', href: '#connect', id: 'connect' },
    { label: 'Visit', href: '#location', id: 'location' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: 'background 0.4s ease, box-shadow 0.4s ease, padding 0.3s ease',
          padding: scrolled ? '10px 0' : '16px 0',
          background: scrolled
            ? 'rgba(0,0,0,0.97)'
            : 'rgba(1,14,34,0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: scrolled
            ? '1px solid rgba(167,235,242,0.1)'
            : '1px solid rgba(167,235,242,0.05)',
          boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.5)' : 'none',
        }}
      >
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 clamp(16px, 4vw, 32px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}>
          {/* Logo */}
          <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', flexShrink: 0 }}>
            <div style={{
              width: '38px', height: '38px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #26658C, #54ACBF)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 20px rgba(84,172,191,0.35)',
              flexShrink: 0,
            }}>
              <Coffee size={18} color="#011026" strokeWidth={2.5} />
            </div>
            <div>
              <div style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 'clamp(15px, 2vw, 18px)',
                fontWeight: 700,
                color: '#fff',
                lineHeight: 1,
                whiteSpace: 'nowrap',
              }}>
                The Aura Corner
              </div>
              <div style={{
                fontFamily: '"Outfit", sans-serif',
                fontSize: '9px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#54ACBF',
                marginTop: '2px',
                whiteSpace: 'nowrap',
              }}>
                Boutique Lounge &amp; Café
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav
            className="navbar-desktop-nav"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(12px)',
              padding: '5px 10px',
              borderRadius: '50px',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            {links.map(link => (
              <a
                key={link.id}
                href={link.href}
                style={{
                  padding: '7px 15px',
                  borderRadius: '50px',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'all 0.25s ease',
                  background: activeSection === link.id ? '#A7EBF2' : 'transparent',
                  color: activeSection === link.id ? '#000' : 'rgba(255,255,255,0.72)',
                  boxShadow: activeSection === link.id ? '0 0 15px rgba(167,235,242,0.4)' : 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            {/* Favorites / Heart */}
            <button
              onClick={onOpenFavorites}
              style={{
                position: 'relative',
                width: '38px', height: '38px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(167,235,242,0.15)',
                color: '#A7EBF2',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                flexShrink: 0,
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(167,235,242,0.12)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
              aria-label="Favorites"
            >
              <Heart size={15} fill={favoriteCount > 0 ? '#A7EBF2' : 'none'} />
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

            {/* Book Table (desktop only) */}
            <button
              onClick={onOpenReservation}
              className="navbar-book-btn"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                padding: '9px 20px',
                borderRadius: '50px',
                background: 'linear-gradient(135deg, #26658C, #54ACBF)',
                border: '1px solid rgba(167,235,242,0.25)',
                color: '#fff',
                fontFamily: '"Outfit", sans-serif',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 18px rgba(38,101,140,0.45)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.04)';
                e.currentTarget.style.boxShadow = '0 6px 24px rgba(84,172,191,0.5)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 18px rgba(38,101,140,0.45)';
              }}
            >
              <MessageCircle size={13} />
              <span>Book Table</span>
            </button>

            {/* Hamburger (mobile only) */}
            <button
              onClick={() => setMobileOpen(true)}
              className="navbar-hamburger"
              style={{
                padding: '8px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px',
                color: '#fff',
                cursor: 'pointer',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Open menu"
            >
              <MenuIcon size={20} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              style={{
                position: 'fixed', inset: 0,
                background: 'rgba(0,0,0,0.75)',
                backdropFilter: 'blur(6px)',
                zIndex: 60,
              }}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              style={{
                position: 'fixed', top: 0, right: 0, bottom: 0, width: '280px',
                background: '#000',
                borderLeft: '1px solid rgba(167,235,242,0.12)',
                zIndex: 70,
                display: 'flex', flexDirection: 'column',
                padding: '24px',
              }}
            >
              {/* Drawer header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', paddingTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #26658C, #54ACBF)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Coffee size={15} color="#011026" strokeWidth={2.5} />
                  </div>
                  <span style={{ fontFamily: '"Playfair Display", serif', fontSize: '16px', fontWeight: 700, color: '#fff' }}>Menu</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
                >
                  <X size={22} />
                </button>
              </div>

              {/* Nav links */}
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
                      letterSpacing: '0.04em',
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

              {/* Footer info */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#64748b', marginBottom: '8px' }}>
                  <MapPin size={12} color="#54ACBF" />
                  <span>Medavakkam, Chennai</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#64748b', marginBottom: '16px' }}>
                  <Clock size={12} color="#54ACBF" />
                  <span>11 AM – 11 PM Daily</span>
                </div>
                <button
                  onClick={() => { setMobileOpen(false); onOpenReservation(); }}
                  style={{
                    width: '100%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: '8px',
                    padding: '13px 20px',
                    borderRadius: '50px',
                    background: 'linear-gradient(135deg, #26658C, #54ACBF)',
                    border: 'none',
                    color: '#fff',
                    fontFamily: '"Outfit", sans-serif',
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                  }}
                >
                  <MessageCircle size={14} />
                  <span>Book Table</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 868px) {
          .navbar-desktop-nav { display: none !important; }
          .navbar-book-btn { display: none !important; }
          .navbar-hamburger { display: flex !important; }
        }
        @media (min-width: 869px) {
          .navbar-hamburger { display: none !important; }
        }
      `}</style>
    </>
  );
};
