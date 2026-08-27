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
  border: '1.5px solid #E8D3B0',
  background: '#FFFDF5',
  fontFamily: '"Outfit", sans-serif',
  fontSize: '13px',
  color: '#4A3325',
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
  color: '#4A3325',
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

    onClearCart();
    setStep('success');
  };

  const handleClose = () => {
    onClose();
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
            style={{ position: 'fixed', inset: 0, background: 'rgba(74, 51, 37, 0.45)', backdropFilter: 'blur(4px)', zIndex: 60 }}
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
              background: '#FFFDF5', zIndex: 70,
              display: 'flex', flexDirection: 'column',
              boxShadow: '-20px 0 70px rgba(74, 51, 37, 0.15)',
            }}
          >
            {/* ── HEADER ── */}
            <div style={{
              padding: '22px 24px', borderBottom: '1px solid #E8D3B0',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              background: 'linear-gradient(135deg, #4A3325 0%, #7A5C43 100%)', flexShrink: 0,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {step === 'details' && (
                  <button
                    onClick={() => setStep('tray')}
                    style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#FFFDF5', flexShrink: 0 }}
                  >
                    <ArrowLeft size={15} />
                  </button>
                )}
                <div>
                  <p style={{ margin: 0, fontFamily: '"Playfair Display", serif', fontSize: '18px', fontWeight: 700, color: '#FFFDF5', lineHeight: 1 }}>
                    {step === 'tray' ? 'Your Picks' : step === 'details' ? 'Delivery Details' : 'Order Sent!'}
                  </p>
                  <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#E8D3B0' }}>
                    {step === 'tray' ? `${cartItems.length} in order · ${favoriteItems.length} saved` :
                     step === 'details' ? 'Fill in your info to confirm' : 'WhatsApp opened for you'}
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#E8D3B0', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#FFFDF5'; e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#E8D3B0'; e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}
              >
                <X size={17} />
              </button>
            </div>

            {/* ── TABS (only on tray step) ── */}
            {step === 'tray' && (
              <div style={{ display: 'flex', background: '#FAF3E0', borderBottom: '1px solid #E8D3B0', flexShrink: 0 }}>
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
                      borderBottom: tab === t ? '2px solid #E8893A' : '2px solid transparent',
                      background: tab === t ? '#FFFDF5' : 'transparent',
                      color: tab === t ? '#4A3325' : '#7A5C43',
                      transition: 'all 0.25s',
                    }}
                  >
                    {icon}
                    <span>{label as string}</span>
                    {t === 'cart' && cartItems.length > 0 && (
                      <span style={{ background: '#E8893A', color: '#FFFDF5', fontSize: '9px', fontWeight: 700, padding: '2px 7px', borderRadius: '50px', marginLeft: '2px' }}>
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
                        <ShoppingBag size={40} color="#D4A72C" style={{ margin: '0 auto 12px' }} />
                        <h4 style={{ fontFamily: '"Playfair Display", serif', fontSize: '18px', color: '#4A3325', margin: '0 0 8px' }}>Your tray is empty</h4>
                        <p style={{ fontSize: '13px', color: '#7A5C43', margin: 0 }}>Add items from the menu to build your order.</p>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {cartItems.map((item, i) => (
                          <motion.div
                            key={`${item.id}-${i}`}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            style={{ display: 'flex', gap: '12px', padding: '14px', borderRadius: '14px', background: '#FAF3E0', border: '1px solid #E8D3B0', alignItems: 'center' }}
                          >
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                                <div style={{ width: '10px', height: '10px', borderRadius: '3px', border: `1.5px solid ${item.diet === 'veg' ? '#16a34a' : '#dc2626'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: item.diet === 'veg' ? '#16a34a' : '#dc2626' }} />
                                </div>
                                <span style={{ fontSize: '13px', fontWeight: 700, color: '#4A3325', fontFamily: '"Outfit", sans-serif', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</span>
                              </div>
                              {item.description && (
                                <p style={{ margin: 0, fontSize: '11px', color: '#7A5C43', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.description}</p>
                              )}
                            </div>
                            <span style={{ fontFamily: '"Playfair Display", serif', fontSize: '15px', fontWeight: 700, color: '#D4A72C', whiteSpace: 'nowrap' }}>₹{item.price}</span>
                            <button
                              onClick={() => onRemoveFromCart(item.id)}
                              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#7A5C43', padding: '4px', transition: 'color 0.2s', flexShrink: 0 }}
                              onMouseEnter={e => (e.currentTarget.style.color = '#dc2626')}
                              onMouseLeave={e => (e.currentTarget.style.color = '#7A5C43')}
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
                        <Heart size={40} color="#D4A72C" style={{ margin: '0 auto 12px' }} />
                        <h4 style={{ fontFamily: '"Playfair Display", serif', fontSize: '18px', color: '#4A3325', margin: '0 0 8px' }}>Nothing saved yet</h4>
                        <p style={{ fontSize: '13px', color: '#7A5C43', margin: 0 }}>Tap the heart icon on any item to save it here.</p>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {favoriteItems.map(item => (
                          <div key={item.id} style={{ display: 'flex', gap: '12px', padding: '14px', borderRadius: '14px', background: '#FAF3E0', border: '1px solid #E8D3B0', alignItems: 'center' }}>
                            <div style={{ flex: 1 }}>
                              <span style={{ fontSize: '13px', fontWeight: 700, color: '#4A3325', fontFamily: '"Outfit", sans-serif' }}>{item.name}</span>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '3px' }}>
                                <Star size={10} color="#D4A72C" fill="#D4A72C" />
                                <span style={{ fontSize: '11px', color: '#7A5C43' }}>Saved for later</span>
                              </div>
                            </div>
                            <span style={{ fontFamily: '"Playfair Display", serif', fontSize: '15px', fontWeight: 700, color: '#D4A72C' }}>₹{item.price}</span>
                            <button onClick={() => onToggleFavorite(item)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dc2626' }}>
                              <Heart size={15} fill="#dc2626" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )
                  )}
                </div>

                {/* Cart Footer */}
                {tab === 'cart' && cartItems.length > 0 && (
                  <div style={{ padding: '18px 20px', borderTop: '1px solid #E8D3B0', background: '#FFFDF5', flexShrink: 0 }}>
                    {/* Order summary strip */}
                    <div style={{ background: '#FFE9A8', borderRadius: '12px', padding: '12px 16px', marginBottom: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #D4A72C' }}>
                      <div>
                        <p style={{ margin: 0, fontSize: '11px', color: '#7A5C43', fontFamily: '"Outfit", sans-serif', fontWeight: 600 }}>{cartItems.length} items</p>
                        <p style={{ margin: 0, fontSize: '11px', color: '#4A3325', fontFamily: '"Outfit", sans-serif', marginTop: '1px', fontWeight: 600 }}>Delivery via WhatsApp confirmation</p>
                      </div>
                      <span style={{ fontFamily: '"Playfair Display", serif', fontSize: '22px', fontWeight: 700, color: '#4A3325' }}>₹{total}</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      disabled={!canProceed}
                      onClick={() => setStep('details')}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                        width: '100%', padding: '14px', borderRadius: '50px',
                        background: '#25D366', color: '#FFFDF5',
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
                <div style={{ padding: '14px 20px', background: '#FFE9A8', borderBottom: '1px solid #D4A72C', flexShrink: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: '#4A3325', fontFamily: '"Outfit", sans-serif', fontWeight: 600 }}>
                      {cartItems.length} items ready to order
                    </span>
                    <span style={{ fontFamily: '"Playfair Display", serif', fontSize: '18px', fontWeight: 700, color: '#4A3325' }}>₹{total}</span>
                  </div>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '22px 20px' }}>
                  <p style={{ margin: '0 0 20px', fontSize: '13px', color: '#7A5C43', lineHeight: 1.6, fontFamily: '"Outfit", sans-serif' }}>
                    We'll send your order directly to our WhatsApp with your details — just confirm and we'll get started! 🚀
                  </p>

                  {/* Name */}
                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelCls}>
                      <User size={11} color="#E8893A" />
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
                        borderColor: focusedField === 'name' ? '#D4A72C' : '#E8D3B0',
                        boxShadow: focusedField === 'name' ? '0 0 0 3px rgba(212,167,44,0.15)' : 'none',
                      }}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>

                  {/* Phone */}
                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelCls}>
                      <Phone size={11} color="#E8893A" />
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
                        borderColor: focusedField === 'phone' ? '#D4A72C' : '#E8D3B0',
                        boxShadow: focusedField === 'phone' ? '0 0 0 3px rgba(212,167,44,0.15)' : 'none',
                      }}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>

                  {/* Address */}
                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelCls}>
                      <MapPin size={11} color="#E8893A" />
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
                        borderColor: focusedField === 'address' ? '#D4A72C' : '#E8D3B0',
                        boxShadow: focusedField === 'address' ? '0 0 0 3px rgba(212,167,44,0.15)' : 'none',
                      }}
                      onFocus={() => setFocusedField('address')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>

                  {/* Note */}
                  <div style={{ marginBottom: '8px' }}>
                    <label style={labelCls}>
                      <MessageSquare size={11} color="#E8893A" />
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
                        borderColor: focusedField === 'note' ? '#D4A72C' : '#E8D3B0',
                        boxShadow: focusedField === 'note' ? '0 0 0 3px rgba(212,167,44,0.15)' : 'none',
                      }}
                      onFocus={() => setFocusedField('note')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                </div>

                {/* Submit footer */}
                <div style={{ padding: '16px 20px', borderTop: '1px solid #E8D3B0', background: '#FFFDF5', flexShrink: 0 }}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleSendOrder}
                    disabled={!details.name.trim() || !details.phone.trim() || !details.address.trim()}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '9px',
                      width: '100%', padding: '15px', borderRadius: '50px',
                      background: details.name.trim() && details.phone.trim() && details.address.trim()
                        ? '#25D366' : '#E8D3B0',
                      color: '#FFFDF5',
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
                  <p style={{ textAlign: 'center', marginTop: '10px', fontSize: '11px', color: '#7A5C43', fontFamily: '"Outfit", sans-serif' }}>
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
                    <CheckCircle size={44} color="#FFFDF5" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 style={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: '24px', fontWeight: 700, color: '#4A3325', margin: '0 0 10px',
                  }}>
                    Order Sent! 🎉
                  </h3>
                  <p style={{ fontSize: '14px', color: '#7A5C43', lineHeight: 1.7, margin: '0 0 10px', fontFamily: '"Outfit", sans-serif' }}>
                    Your order has been sent to our WhatsApp. We'll confirm it shortly!
                  </p>
                  <div style={{ background: '#FFE9A8', borderRadius: '14px', padding: '14px 20px', marginBottom: '28px', border: '1px solid #D4A72C' }}>
                    <p style={{ margin: 0, fontSize: '12px', color: '#4A3325', fontWeight: 700, fontFamily: '"Outfit", sans-serif' }}>
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
                      background: '#E8893A', color: '#FFFDF5',
                      fontFamily: '"Outfit", sans-serif', fontSize: '13px', fontWeight: 700,
                      letterSpacing: '0.05em', border: 'none', cursor: 'pointer',
                      boxShadow: '0 4px 16px rgba(232,137,58,0.3)',
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
