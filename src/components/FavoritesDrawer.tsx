import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingBag, Trash2, ExternalLink, Star } from 'lucide-react';
import type { MenuItem } from '../types/cafe';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  cartItems: MenuItem[];
  onToggleFavorite: (item: MenuItem) => void;
  onRemoveFromCart: (itemId: string) => void;
  allItems: MenuItem[];
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen, onClose, favorites, cartItems, onToggleFavorite, onRemoveFromCart, allItems
}) => {
  const [tab, setTab] = React.useState<'favorites' | 'cart'>('cart');

  const safeAllItems = allItems ?? [];
  const favoriteItems = safeAllItems.filter(item => favorites.includes(item.id));
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const waOrderText = cartItems
    .map(item => `• ${item.name} - ₹${item.price}`)
    .join('\n');
  const waUrl = `https://wa.me/?text=Hi! I'd like to order from The Aura Corner:%0A${encodeURIComponent(waOrderText)}%0A%0ATotal: ₹${total}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 60 }}
          />
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 250 }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0, width: '400px', maxWidth: '100vw',
              background: '#fff', zIndex: 70, display: 'flex', flexDirection: 'column',
              boxShadow: '-20px 0 60px rgba(0,0,0,0.15)',
            }}
          >
            {/* Header */}
            <div style={{ padding: '24px', borderBottom: '1px solid rgba(0,0,0,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#000' }}>
              <div>
                <p style={{ margin: 0, fontFamily: '"Playfair Display", serif', fontSize: '20px', fontWeight: 700, color: '#fff', lineHeight: 1 }}>Your Picks</p>
                <p style={{ margin: '4px 0 0', fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{cartItems.length} in order · {favoriteItems.length} saved</p>
              </div>
              <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#94a3b8', transition: 'all 0.2s ease' }}>
                <X size={18} />
              </button>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', background: '#F8F8F8', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
              {([['cart', <ShoppingBag size={14} />, 'Order Tray'], ['favorites', <Heart size={14} />, 'Saved']] as const).map(([t, icon, label]) => (
                <button
                  key={t}
                  onClick={() => setTab(t as 'cart' | 'favorites')}
                  style={{
                    flex: 1, padding: '14px', border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                    fontFamily: '"Outfit", sans-serif', fontSize: '12px', fontWeight: 700, letterSpacing: '0.05em',
                    transition: 'all 0.25s ease',
                    borderBottom: tab === t ? '2px solid #000' : '2px solid transparent',
                    background: 'transparent',
                    color: tab === t ? '#000' : '#94a3b8',
                  }}
                >
                  {icon}
                  <span>{label as string}</span>
                  {t === 'cart' && cartItems.length > 0 && (
                    <span style={{ background: '#000', color: '#A7EBF2', fontSize: '9px', fontWeight: 700, padding: '2px 7px', borderRadius: '50px', marginLeft: '4px' }}>
                      {cartItems.length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
              {tab === 'cart' ? (
                cartItems.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                    <ShoppingBag size={40} color="#CBD5E1" style={{ margin: '0 auto 12px' }} />
                    <h4 style={{ fontFamily: '"Playfair Display", serif', fontSize: '18px', color: '#000', margin: '0 0 8px' }}>Your tray is empty</h4>
                    <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>Add items from the menu to build your order.</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {cartItems.map((item, i) => (
                      <div key={`${item.id}-${i}`} style={{ display: 'flex', gap: '12px', padding: '14px', borderRadius: '14px', background: '#F8F8F8', border: '1px solid rgba(0,0,0,0.06)', alignItems: 'center' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                            <div style={{ width: '10px', height: '10px', borderRadius: '3px', border: `1.5px solid ${item.diet === 'veg' ? '#34d399' : '#f87171'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: item.diet === 'veg' ? '#34d399' : '#f87171' }} />
                            </div>
                            <span style={{ fontSize: '13px', fontWeight: 600, color: '#000', fontFamily: '"Outfit", sans-serif' }}>{item.name}</span>
                          </div>
                          {item.description && <p style={{ margin: 0, fontSize: '11px', color: '#94a3b8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '220px' }}>{item.description}</p>}
                        </div>
                        <span style={{ fontFamily: '"Playfair Display", serif', fontSize: '16px', fontWeight: 700, color: '#000', whiteSpace: 'nowrap' }}>₹{item.price}</span>
                        <button onClick={() => onRemoveFromCart(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '4px', transition: 'color 0.2s' }}
                          onMouseEnter={e => (e.currentTarget.style.color = '#f87171')}
                          onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}>
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                favoriteItems.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                    <Heart size={40} color="#CBD5E1" style={{ margin: '0 auto 12px' }} />
                    <h4 style={{ fontFamily: '"Playfair Display", serif', fontSize: '18px', color: '#000', margin: '0 0 8px' }}>Nothing saved yet</h4>
                    <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>Tap the heart icon on any item to save it here.</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {favoriteItems.map(item => (
                      <div key={item.id} style={{ display: 'flex', gap: '12px', padding: '14px', borderRadius: '14px', background: '#F8F8F8', border: '1px solid rgba(0,0,0,0.06)', alignItems: 'center' }}>
                        <div style={{ flex: 1 }}>
                          <span style={{ fontSize: '13px', fontWeight: 600, color: '#000', fontFamily: '"Outfit", sans-serif' }}>{item.name}</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '3px' }}>
                            <Star size={10} color="#fbbf24" fill="#fbbf24" />
                            <span style={{ fontSize: '11px', color: '#64748b' }}>Saved for later</span>
                          </div>
                        </div>
                        <span style={{ fontFamily: '"Playfair Display", serif', fontSize: '16px', fontWeight: 700, color: '#000' }}>₹{item.price}</span>
                        <button onClick={() => onToggleFavorite(item)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#f87171' }}>
                          <Heart size={15} fill="#f87171" />
                        </button>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>

            {/* Footer */}
            {tab === 'cart' && cartItems.length > 0 && (
              <div style={{ padding: '20px', borderTop: '1px solid rgba(0,0,0,0.07)', background: '#fff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '14px', color: '#64748b' }}>Total</span>
                  <span style={{ fontFamily: '"Playfair Display", serif', fontSize: '24px', fontWeight: 700, color: '#000' }}>₹{total}</span>
                </div>
                <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ background: '#000', width: '100%', justifyContent: 'center', display: 'flex' }}>
                  <ExternalLink size={15} />
                  <span>Order via WhatsApp</span>
                </a>
                <p style={{ textAlign: 'center', marginTop: '10px', fontSize: '11px', color: '#94a3b8' }}>
                  Opens WhatsApp with your order details pre-filled
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
