import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Check, Pin } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { GalleryItem } from '../../data/galleryData';

interface PinMemoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMemory: (newItem: GalleryItem) => void;
}

const SAMPLE_PHOTO_PRESETS = [
  { label: 'Warm Latte', url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80', cat: 'coffee' as const },
  { label: 'Outdoor Garden', url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80', cat: 'outside' as const },
  { label: 'Cozy Table', url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80', cat: 'inside' as const },
  { label: 'Squad Smiles', url: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80', cat: 'moments' as const },
];

export const PinMemoryModal: React.FC<PinMemoryModalProps> = ({ isOpen, onClose, onAddMemory }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(SAMPLE_PHOTO_PRESETS[0].url);
  const [selectedCategory, setSelectedCategory] = useState<'inside' | 'outside' | 'coffee' | 'moments'>('coffee');
  const [caption, setCaption] = useState('My unforgettable Aura moment ✨');
  const [author, setAuthor] = useState('');
  const [washiColor, setWashiColor] = useState<'gold' | 'rose' | 'amber' | 'kraft'>('gold');
  const [customUrl, setCustomUrl] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const photoUrl = customUrl.trim() || selectedPhoto;

    const newItem: GalleryItem = {
      id: `custom-${Date.now()}`,
      title: author.trim() ? `${author}'s Memory` : 'Guest Memory Note',
      handwrittenCaption: caption || 'A serene moment at Aura Corner',
      category: selectedCategory,
      imageUrl: photoUrl,
      date: 'Just Now',
      location: 'The Aura Corner',
      likes: 1,
      tags: ['GuestMemory', 'AuraSquad', 'Scrapbook'],
      rotation: Math.floor(Math.random() * 6) - 3,
      backNote: `Pinned with love by ${author || 'Aura Guest'}. Thank you for being a part of our story!`,
    };

    onAddMemory(newItem);

    // Trigger celebration confetti
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4A72C', '#E8893A', '#FFE9A8', '#4A3325'],
    });

    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 110,
          backgroundColor: 'rgba(74, 51, 37, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(16px, 3vw, 32px)',
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={e => e.stopPropagation()}
          style={{
            maxWidth: '560px',
            width: '100%',
            background: '#FFFDF5',
            borderRadius: '24px',
            boxShadow: '0 20px 60px rgba(74, 51, 37, 0.35)',
            border: '2px solid #D4A72C',
            overflow: 'hidden',
            color: '#4A3325',
            position: 'relative',
          }}
        >
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #4A3325 0%, #7A5C43 100%)',
            padding: '24px 28px',
            color: '#FFFDF5',
            position: 'relative',
          }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(255,255,255,0.15)',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                color: '#FFFDF5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={16} />
            </button>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '50px', background: '#FFE9A8', color: '#4A3325', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px' }}>
              <Pin size={11} color="#E8893A" />
              <span>Digital Scrapbook</span>
            </div>

            <h3 style={{ margin: 0, fontFamily: '"Playfair Display", serif', fontSize: '24px', fontWeight: 700 }}>
              Pin Your Polaroid Memory
            </h3>
            <p style={{ margin: '6px 0 0', fontSize: '13px', color: '#E8D3B0', fontFamily: '"Outfit", sans-serif' }}>
              Add your handwritten note and photo to The Aura Corner digital memory wall!
            </p>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Pick a photo */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#4A3325', marginBottom: '8px' }}>
                1. Select a Cafe Scene
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                {SAMPLE_PHOTO_PRESETS.map((preset, idx) => (
                  <div
                    key={idx}
                    onClick={() => { setSelectedPhoto(preset.url); setSelectedCategory(preset.cat); setCustomUrl(''); }}
                    style={{
                      cursor: 'pointer',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      border: selectedPhoto === preset.url && !customUrl ? '3px solid #E8893A' : '2px solid transparent',
                      position: 'relative',
                      aspectRatio: '1/1',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 2px 8px rgba(74, 51, 37, 0.1)',
                    }}
                  >
                    <img src={preset.url} alt={preset.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    {selectedPhoto === preset.url && !customUrl && (
                      <div style={{ position: 'absolute', inset: 0, background: 'rgba(232, 137, 58, 0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                        <Check size={18} strokeWidth={3} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Image URL */}
            <div>
              <label style={{ display: 'block', fontSize: '11px', color: '#7A5C43', marginBottom: '4px', fontWeight: 600 }}>
                Or paste your own image URL:
              </label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={customUrl}
                onChange={e => setCustomUrl(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 14px',
                  borderRadius: '10px',
                  border: '1px solid #E8D3B0',
                  fontSize: '13px',
                  fontFamily: '"Outfit", sans-serif',
                  boxSizing: 'border-box',
                  background: '#FFFDF5',
                  color: '#4A3325',
                }}
              />
            </div>

            {/* Handwritten Note Input */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#4A3325', marginBottom: '8px' }}>
                2. Handwritten Caption
              </label>
              <input
                type="text"
                required
                maxLength={45}
                value={caption}
                onChange={e => setCaption(e.target.value)}
                placeholder="Write something sweet (e.g. Best boba date ever! ✨)"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1.5px solid #D4A72C',
                  fontSize: '18px',
                  fontFamily: '"Caveat", cursive',
                  color: '#4A3325',
                  boxSizing: 'border-box',
                  background: '#FAF3E0',
                }}
              />
            </div>

            {/* Washi Tape Color & Author */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#4A3325', marginBottom: '8px' }}>
                  Tape Accent
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {(['gold', 'rose', 'amber', 'kraft'] as const).map(color => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setWashiColor(color)}
                      style={{
                        flex: 1,
                        height: '28px',
                        borderRadius: '6px',
                        border: washiColor === color ? '2px solid #4A3325' : '1px solid rgba(74, 51, 37, 0.15)',
                        background:
                          color === 'gold' ? '#D4A72C' :
                          color === 'rose' ? '#ffd1dc' :
                          color === 'amber' ? '#FFE9A8' : '#E8D3B0',
                        cursor: 'pointer',
                        transform: washiColor === color ? 'scale(1.1)' : 'scale(1)',
                        transition: 'transform 0.15s ease',
                      }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#4A3325', marginBottom: '8px' }}>
                  Your Name / Tag
                </label>
                <input
                  type="text"
                  placeholder="@yourname"
                  value={author}
                  onChange={e => setAuthor(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #E8D3B0',
                    fontSize: '13px',
                    fontFamily: '"Outfit", sans-serif',
                    boxSizing: 'border-box',
                    background: '#FFFDF5',
                    color: '#4A3325',
                  }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                marginTop: '10px',
                width: '100%',
                padding: '14px',
                borderRadius: '50px',
                background: '#E8893A',
                color: '#FFFDF5',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 8px 24px rgba(232, 137, 58, 0.35)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#D4A72C'; e.currentTarget.style.color = '#4A3325'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#E8893A'; e.currentTarget.style.color = '#FFFDF5'; }}
            >
              <Sparkles size={16} />
              <span>Pin to Memory Wall</span>
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
