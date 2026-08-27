import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingBag, Trash2, Star, User, Phone, MapPin, MessageSquare, CheckCircle, ArrowLeft, Send } from 'lucide-react';
import type { MenuItem } from '../types/cafe';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  cartItems: MenuItem[];
  onToggleFavorite: (item: MenuItem) => void;
  onRemoveFromCart: (itemId: string) => void;
  onClearCart: () => void;
  allItems: MenuItem[];
}

type DrawerStep = 'tray' | 'details' | 'success';

const inputCls: React.CSSProperties = {
  width: '100%',
  padding: '11px 14px',
  borderRadius: '12px',
  border: '1.5px solid rgba(0,0,0,0.1)',
  background: '#F8FAFC',
  fontFamily: '"Outfit", sans-serif',
  fontSize: '13px',
  color: '#000',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
};

const labelCls: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#26658C',
  marginBottom: '6px',
  fontFamily: '"Outfit", sans-serif',
};

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen, onClose, favorites, cartItems, onToggleFavorite, onRemoveFromCart, onClearCart, allItems,
}) => {
  const [tab, setTab] = useState<'cart' | 'favorites'>('cart');
  const [step, setStep] = useState<DrawerStep>('tray');
  const [details, setDetails] = useState({ name: '', phone: '', address: '', note: '' });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const safeAllItems = allItems ?? [];
  const favoriteItems = safeAllItems.filter(item => favorites.includes(item.id));
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleSendOrder = () => {
    // Build a beautifully formatted WhatsApp message
    const divider = '━━━━━━━━━━━━━━━━━━━━━━';
    const itemLines = cartItems
      .map((item, i) => `  ${i + 1}. ${item.name} — ₹${item.price}`)
      .join('\n');

    const message =
      `🍽️ *NEW ORDER — The Aura Corner* 🍽️\n` +
      `${divider}\n\n` +
      `👤 *Customer Details*\n` +
      `   • Name: ${details.name}\n` +
      `   • Phone: ${details.phone}\n` +
      `   • Address: ${details.address}\n` +
      (details.note ? `   • Note: ${details.note}\n` : '') +
      `\n📋 *Order Items*\n` +
      `${itemLines}\n\n` +
      `${divider}\n` +
      `💰 *Total Amount: ₹${total}*\n` +
      `${divider}\n\n` +
      `Please confirm the order. Thank you! 🙏`;

    const waUrl = `https://wa.me/919790921125?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');

    // Clear cart & go to success
    onClearCart();
    setStep('success');
  };

  const handleClose = () => {
    onClose();
    // Reset state after animation
    setTimeout(() => {
      setStep('tray');
      setDetails({ name: '', phone: '', address: '', note: '' });
    }, 400);
  };

  const canProceed = cartItems.length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)', zIndex: 60 }}
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0,
              width: '420px', maxWidth: '100vw',
              background: '#fff', zIndex: 70,
              display: 'flex', flexDirection: 'column',
              boxShadow: '-20px 0 70px rgba(0,0,0,0.18)',
            }}
          >
            {/* ── HEADER ── */}
            <div style={{
              padding: '22px 24px', borderBottom: '1px solid rgba(0,0,0,0.07)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              background: '#000', flexShrink: 0,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {step === 'details' && (
                  <button
                    onClick={() => setStep('tray')}
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', flexShrink: 0 }}
                  >
                    <ArrowLeft size={15} />
                  </button>
                )}
                <div>
                  <p style={{ margin: 0, fontFamily: '"Playfair Display", serif', fontSize: '18px', fontWeight: 700, color: '#fff', lineHeight: 1 }}>
                    {step === 'tray' ? 'Your Picks' : step === 'details' ? 'Delivery Details' : 'Order Sent!'}
                  </p>
                  <p style={{ margin: '4px 0 0', fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>
                    {step === 'tray' ? `${cartItems.length} in order · ${favoriteItems.length} saved` :
                     step === 'details' ? 'Fill in your info to confirm' : 'WhatsApp opened for you'}
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#94a3b8', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
              >
                <X size={17} />
              </button>
            </div>

            {/* ── TABS (only on tray step) ── */}
            {step === 'tray' && (
              <div style={{ display: 'flex', background: '#F8F8F8', borderBottom: '1px solid rgba(0,0,0,0.07)', flexShrink: 0 }}>
                {([
                  ['cart', <ShoppingBag size={14} />, 'Order Tray'],
                  ['favorites', <Heart size={14} />, 'Saved'],
                ] as const).map(([t, icon, label]) => (
                  <button
                    key={t}
                    onClick={() => setTab(t as 'cart' | 'favorites')}
                    style={{
                      flex: 1, padding: '13px', border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                      fontFamily: '"Outfit", sans-serif', fontSize: '12px', fontWeight: 700,
                      borderBottom: tab === t ? '2px solid #000' : '2px solid transparent',
                      background: 'transparent', color: tab === t ? '#000' : '#94a3b8',
                      transition: 'all 0.25s',
                    }}
                  >
                    {icon}
                    <span>{label as string}</span>
                    {t === 'cart' && cartItems.length > 0 && (
                      <span style={{ background: '#000', color: '#A7EBF2', fontSize: '9px', fontWeight: 700, padding: '2px 7px', borderRadius: '50px', marginLeft: '2px' }}>
                        {cartItems.length}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* ── STEP: TRAY ── */}
            {step === 'tray' && (
              <>
                <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
                  {tab === 'cart' ? (
                    cartItems.length === 0 ? (
                      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                        <ShoppingBag size={40} color="#CBD5E1" style={{ margin: '0 auto 12px' }} />
                        <h4 style={{ fontFamily: '"Playfair Display", serif', fontSize: '18px', color: '#000', margin: '0 0 8px' }}>Your tray is empty</h4>
                        <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>Add items from the menu to build your order.</p>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {cartItems.map((item, i) => (
                          <motion.div
                            key={`${item.id}-${i}`}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            style={{ display: 'flex', gap: '12px', padding: '14px', borderRadius: '14px', background: '#F8F8F8', border: '1px solid rgba(0,0,0,0.06)', alignItems: 'center' }}
                          >
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                                <div style={{ width: '10px', height: '10px', borderRadius: '3px', border: `1.5px solid ${item.diet === 'veg' ? '#34d399' : '#f87171'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: item.diet === 'veg' ? '#34d399' : '#f87171' }} />
                                </div>
                                <span style={{ fontSize: '13px', fontWeight: 600, color: '#000', fontFamily: '"Outfit", sans-serif', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</span>
                              </div>
                              {item.description && (
                                <p style={{ margin: 0, fontSize: '11px', color: '#94a3b8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.description}</p>
                              )}
                            </div>
                            <span style={{ fontFamily: '"Playfair Display", serif', fontSize: '15px', fontWeight: 700, color: '#000', whiteSpace: 'nowrap' }}>₹{item.price}</span>
                            <button
                              onClick={() => onRemoveFromCart(item.id)}
                              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '4px', transition: 'color 0.2s', flexShrink: 0 }}
                              onMouseEnter={e => (e.currentTarget.style.color = '#f87171')}
                              onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}
                            >
                              <Trash2 size={14} />
                            </button>
                          </motion.div>
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
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {favoriteItems.map(item => (
                          <div key={item.id} style={{ display: 'flex', gap: '12px', padding: '14px', borderRadius: '14px', background: '#F8F8F8', border: '1px solid rgba(0,0,0,0.06)', alignItems: 'center' }}>
                            <div style={{ flex: 1 }}>
                              <span style={{ fontSize: '13px', fontWeight: 600, color: '#000', fontFamily: '"Outfit", sans-serif' }}>{item.name}</span>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '3px' }}>
                                <Star size={10} color="#fbbf24" fill="#fbbf24" />
                                <span style={{ fontSize: '11px', color: '#64748b' }}>Saved for later</span>
                              </div>
                            </div>
                            <span style={{ fontFamily: '"Playfair Display", serif', fontSize: '15px', fontWeight: 700, color: '#000' }}>₹{item.price}</span>
                            <button onClick={() => onToggleFavorite(item)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#f87171' }}>
                              <Heart size={15} fill="#f87171" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )
                  )}
                </div>

                {/* Cart Footer */}
                {tab === 'cart' && cartItems.length > 0 && (
                  <div style={{ padding: '18px 20px', borderTop: '1px solid rgba(0,0,0,0.07)', background: '#fff', flexShrink: 0 }}>
                    {/* Order summary strip */}
                    <div style={{ background: '#F0FDF4', borderRadius: '12px', padding: '12px 16px', marginBottom: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <p style={{ margin: 0, fontSize: '11px', color: '#64748b', fontFamily: '"Outfit", sans-serif' }}>{cartItems.length} items</p>
                        <p style={{ margin: 0, fontSize: '11px', color: '#64748b', fontFamily: '"Outfit", sans-serif', marginTop: '1px' }}>Delivery via WhatsApp confirmation</p>
                      </div>
                      <span style={{ fontFamily: '"Playfair Display", serif', fontSize: '22px', fontWeight: 700, color: '#000' }}>₹{total}</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      disabled={!canProceed}
                      onClick={() => setStep('details')}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                        width: '100%', padding: '14px', borderRadius: '50px',
                        background: '#25D366', color: '#fff',
                        fontFamily: '"Outfit", sans-serif', fontSize: '13px', fontWeight: 700,
                        letterSpacing: '0.04em', border: 'none', cursor: 'pointer',
                        boxShadow: '0 4px 18px rgba(37,211,102,0.4)',
                      }}
                    >
                      <ShoppingBag size={16} />
                      <span>Order via WhatsApp</span>
                    </motion.button>
                  </div>
                )}
              </>
            )}

            {/* ── STEP: DETAILS FORM ── */}
            {step === 'details' && (
              <>
                {/* Order mini-summary */}
                <div style={{ padding: '14px 20px', background: '#F0FDF4', borderBottom: '1px solid rgba(0,0,0,0.06)', flexShrink: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: '#64748b', fontFamily: '"Outfit", sans-serif' }}>
                      {cartItems.length} items ready to order
                    </span>
                    <span style={{ fontFamily: '"Playfair Display", serif', fontSize: '18px', fontWeight: 700, color: '#000' }}>₹{total}</span>
                  </div>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '22px 20px' }}>
                  <p style={{ margin: '0 0 20px', fontSize: '13px', color: '#64748b', lineHeight: 1.6, fontFamily: '"Outfit", sans-serif' }}>
                    We'll send your order directly to our WhatsApp with your details — just confirm and we'll get started! 🚀
                  </p>

                  {/* Name */}
                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelCls}>
                      <User size={11} />
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Arjun Kumar"
                      value={details.name}
                      onChange={e => setDetails(p => ({ ...p, name: e.target.value }))}
                      style={{
                        ...inputCls,
                        borderColor: focusedField === 'name' ? '#26658C' : 'rgba(0,0,0,0.1)',
                        boxShadow: focusedField === 'name' ? '0 0 0 3px rgba(38,101,140,0.1)' : 'none',
                      }}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>

                  {/* Phone */}
                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelCls}>
                      <Phone size={11} />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={details.phone}
                      onChange={e => setDetails(p => ({ ...p, phone: e.target.value }))}
                      style={{
                        ...inputCls,
                        borderColor: focusedField === 'phone' ? '#26658C' : 'rgba(0,0,0,0.1)',
                        boxShadow: focusedField === 'phone' ? '0 0 0 3px rgba(38,101,140,0.1)' : 'none',
                      }}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>

                  {/* Address */}
                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelCls}>
                      <MapPin size={11} />
                      Delivery Address *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="e.g. 12, Rose Nagar, Medavakkam, Chennai"
                      value={details.address}
                      onChange={e => setDetails(p => ({ ...p, address: e.target.value }))}
                      style={{
                        ...inputCls,
                        resize: 'none',
                        lineHeight: 1.5,
                        borderColor: focusedField === 'address' ? '#26658C' : 'rgba(0,0,0,0.1)',
                        boxShadow: focusedField === 'address' ? '0 0 0 3px rgba(38,101,140,0.1)' : 'none',
                      }}
                      onFocus={() => setFocusedField('address')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>

                  {/* Note */}
                  <div style={{ marginBottom: '8px' }}>
                    <label style={labelCls}>
                      <MessageSquare size={11} />
                      Special Instructions (optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Extra spicy, no onions..."
                      value={details.note}
                      onChange={e => setDetails(p => ({ ...p, note: e.target.value }))}
                      style={{
                        ...inputCls,
                        resize: 'none',
                        lineHeight: 1.5,
                        borderColor: focusedField === 'note' ? '#26658C' : 'rgba(0,0,0,0.1)',
                        boxShadow: focusedField === 'note' ? '0 0 0 3px rgba(38,101,140,0.1)' : 'none',
                      }}
                      onFocus={() => setFocusedField('note')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                </div>

                {/* Submit footer */}
                <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(0,0,0,0.07)', background: '#fff', flexShrink: 0 }}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleSendOrder}
                    disabled={!details.name.trim() || !details.phone.trim() || !details.address.trim()}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '9px',
                      width: '100%', padding: '15px', borderRadius: '50px',
                      background: details.name.trim() && details.phone.trim() && details.address.trim()
                        ? '#25D366' : '#CBD5E1',
                      color: '#fff',
                      fontFamily: '"Outfit", sans-serif', fontSize: '13px', fontWeight: 700,
                      letterSpacing: '0.04em', border: 'none',
                      cursor: details.name.trim() && details.phone.trim() && details.address.trim() ? 'pointer' : 'not-allowed',
                      boxShadow: details.name.trim() && details.phone.trim() && details.address.trim()
                        ? '0 4px 18px rgba(37,211,102,0.4)' : 'none',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <Send size={16} />
                    <span>Send Order to WhatsApp</span>
                  </motion.button>
                  <p style={{ textAlign: 'center', marginTop: '10px', fontSize: '11px', color: '#94a3b8', fontFamily: '"Outfit", sans-serif' }}>
                    Your order + details will be sent to +91 97909 21125
                  </p>
                </div>
              </>
            )}

            {/* ── STEP: SUCCESS ── */}
            {step === 'success' && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 28px', textAlign: 'center' }}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                >
                  <div style={{
                    width: '90px', height: '90px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #25D366, #128C7E)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 24px',
                    boxShadow: '0 0 40px rgba(37,211,102,0.5)',
                  }}>
                    <CheckCircle size={44} color="#fff" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 style={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: '24px', fontWeight: 700, color: '#000', margin: '0 0 10px',
                  }}>
                    Order Sent! 🎉
                  </h3>
                  <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.7, margin: '0 0 10px', fontFamily: '"Outfit", sans-serif' }}>
                    Your order has been sent to our WhatsApp. We'll confirm it shortly!
                  </p>
                  <div style={{ background: '#F0FDF4', borderRadius: '14px', padding: '14px 20px', marginBottom: '28px', border: '1px solid rgba(37,211,102,0.2)' }}>
                    <p style={{ margin: 0, fontSize: '12px', color: '#16a34a', fontWeight: 600, fontFamily: '"Outfit", sans-serif' }}>
                      📞 +91 97909 21125 — The Aura Corner
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleClose}
                    style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                      padding: '13px 36px', borderRadius: '50px',
                      background: '#000', color: '#fff',
                      fontFamily: '"Outfit", sans-serif', fontSize: '13px', fontWeight: 700,
                      letterSpacing: '0.05em', border: 'none', cursor: 'pointer',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                    }}
                  >
                    Done ✓
                  </motion.button>
                </motion.div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
