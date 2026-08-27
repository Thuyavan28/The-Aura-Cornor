import { useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SignaturePicks } from './components/SignaturePicks';
import { AboutAmbience } from './components/AboutAmbience';
import { GallerySection } from './components/GallerySection';
import { MenuSection } from './components/MenuSection';
import { ReviewsMarquee } from './components/ReviewsMarquee';
import { ConnectSection } from './components/ConnectSection';
import { LocationMap } from './components/LocationMap';
import { Footer } from './components/Footer';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { ReservationModal } from './components/ReservationModal';
import { ALL_MENU_ITEMS } from './data/menuData';
import type { MenuItem } from './types/cafe';

function App() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('aura-favorites') || '[]'); }
    catch { return []; }
  });

  const [cartItems, setCartItems] = useState<MenuItem[]>(() => {
    try { return JSON.parse(localStorage.getItem('aura-cart') || '[]'); }
    catch { return []; }
  });

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [reservationOpen, setReservationOpen] = useState(false);

  // Persist
  useEffect(() => {
    localStorage.setItem('aura-favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('aura-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const toggleFavorite = useCallback((item: MenuItem) => {
    setFavorites(prev =>
      prev.includes(item.id) ? prev.filter(id => id !== item.id) : [...prev, item.id]
    );
  }, []);

  const addToCart = useCallback((item: MenuItem) => {
    setCartItems(prev => [...prev, item]);
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setCartItems(prev => {
      const idx = prev.findIndex(i => i.id === itemId);
      if (idx === -1) return prev;
      const next = [...prev];
      next.splice(idx, 1);
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    localStorage.removeItem('aura-cart');
  }, []);

  // Framer scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 30 });

  // Floating cart button pulse
  const cartTotal = cartItems.reduce((s, i) => s + i.price, 0);

  return (
    <>
      {/* Blue-themed Entrance Preloader */}
      <Preloader />

      {/* Scroll progress bar */}
      <motion.div
        className="progress-bar"
        style={{ scaleX, transformOrigin: 'left' }}
      />

      <Navbar
        favoriteCount={favorites.length + cartItems.length}
        onOpenFavorites={() => setDrawerOpen(true)}
        onOpenReservation={() => setReservationOpen(true)}
      />

      <main>
        <Hero onOpenReservation={() => setReservationOpen(true)} />
        <SignaturePicks
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onAddToCart={addToCart}
        />
        <AboutAmbience />
        <GallerySection />
        <MenuSection
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onAddToCart={addToCart}
        />
        <ReviewsMarquee />
        <ConnectSection />
        <LocationMap />
      </main>

      <Footer />

      {/* Floating Order Button */}
      {cartItems.length > 0 && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setDrawerOpen(true)}
          style={{
            position: 'fixed', bottom: '28px', right: '28px', zIndex: 40,
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '14px 24px', borderRadius: '50px',
            background: '#FFFDF5', color: '#4A3325',
            border: '1.5px solid #D4A72C',
            boxShadow: '0 8px 30px rgba(74,51,37,0.2), 0 0 20px rgba(212,167,44,0.25)',
            cursor: 'pointer',
            fontFamily: '"Outfit", sans-serif', fontSize: '13px', fontWeight: 700,
          }}
        >
          <span>🛒 {cartItems.length} items</span>
          <span style={{ color: '#7A5C43', fontWeight: 400 }}>·</span>
          <span style={{ fontFamily: '"Playfair Display", serif', fontSize: '16px', fontWeight: 700, color: '#E8893A' }}>₹{cartTotal}</span>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#E8893A', boxShadow: '0 0 8px #E8893A', animation: 'pulse 2s infinite' }} />
        </motion.button>
      )}

      <FavoritesDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        favorites={favorites}
        cartItems={cartItems}
        onToggleFavorite={toggleFavorite}
        onRemoveFromCart={removeFromCart}
        onClearCart={clearCart}
        allItems={ALL_MENU_ITEMS}
      />

      <ReservationModal
        isOpen={reservationOpen}
        onClose={() => setReservationOpen(false)}
      />

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.85); }
        }
      `}</style>
    </>
  );
}

export default App;
