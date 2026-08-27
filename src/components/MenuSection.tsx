import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, Plus, Check, Sparkles } from 'lucide-react';
import { MENU_CATEGORIES, ALL_MENU_ITEMS } from '../data/menuData';
import type { MenuItem } from '../types/cafe';

interface MenuSectionProps {
  favorites: string[];
  onToggleFavorite: (item: MenuItem) => void;
  onAddToCart: (item: MenuItem) => void;
}

// Category tabs for the navigation bar
const CATEGORY_TABS = [
  { id: 'all', label: 'ALL' },
  { id: 'starters', label: 'STARTERS' },
  { id: 'momos', label: 'MOMOS' },
  { id: 'maggie', label: 'MAGGIE' },
  { id: 'burgers', label: 'BURGERS' },
  { id: 'combos', label: 'COMBOS' },
  { id: 'pasta', label: 'PASTA' },
  { id: 'drinks', label: 'DRINKS' },
  { id: 'desserts', label: 'DESSERT' },
];

export const MenuSection: React.FC<MenuSectionProps> = ({
  favorites,
  onToggleFavorite,
  onAddToCart,
}) => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedId, setAddedId] = useState<string | null>(null);

  // Group items by category / subcategory
  const displayColumns = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (query) {
      const matched = ALL_MENU_ITEMS.filter(
        item =>
          item.name.toLowerCase().includes(query) ||
          (item.description && item.description.toLowerCase().includes(query)) ||
          item.category.toLowerCase().includes(query)
      );

      const mid = Math.ceil(matched.length / 2);
      return [
        { title: `SEARCH RESULTS (${matched.length})`, items: matched.slice(0, mid) },
        { title: 'MORE DISHES', items: matched.slice(mid) },
      ];
    }

    if (activeTab === 'all') {
      const bestsellers = ALL_MENU_ITEMS.filter(i => i.isBestseller);
      const chefPicks = ALL_MENU_ITEMS.filter(i => !i.isBestseller).slice(0, bestsellers.length);
      return [
        { title: 'FEATURED BESTSELLERS', items: bestsellers.slice(0, 7) },
        { title: 'CHEF PICKS & SPECIALS', items: chefPicks.slice(0, 7) },
      ];
    }

    if (activeTab === 'drinks') {
      const bobaCat = MENU_CATEGORIES.find(c => c.id === 'boba');
      const mojitoCat = MENU_CATEGORIES.find(c => c.id === 'mojito-smoothies');
      const hotCat = MENU_CATEGORIES.find(c => c.id === 'hot-beverages');
      return [
        { title: 'BOBA & COLD DRINKS', items: (bobaCat?.items || []).slice(0, 7) },
        { title: 'MOJITOS & HOT SPECIALS', items: [...(mojitoCat?.items || []).slice(0, 4), ...(hotCat?.items || []).slice(0, 3)] },
      ];
    }

    if (activeTab === 'desserts') {
      const dessertCat = MENU_CATEGORIES.find(c => c.id === 'desserts');
      const items = dessertCat?.items || [];
      const brownies = items.filter(i => i.id.startsWith('ds-'));
      const scoops = items.filter(i => i.id.startsWith('is-'));
      return [
        { title: 'DESSERT', items: brownies },
        { title: 'ICE SCOOPS', items: scoops },
      ];
    }

    if (activeTab === 'starters') {
      const cat = MENU_CATEGORIES.find(c => c.id === 'starters');
      const items = cat?.items || [];
      return [
        { title: 'VEGETARIAN STARTERS', items: items.filter(i => i.diet === 'veg').slice(0, 7) },
        { title: 'NON-VEGETARIAN STARTERS', items: items.filter(i => i.diet === 'non-veg').slice(0, 7) },
      ];
    }

    if (activeTab === 'momos') {
      const cat = MENU_CATEGORIES.find(c => c.id === 'momos');
      const items = cat?.items || [];
      return [
        { title: 'VEG MOMOS', items: items.filter(i => i.diet === 'veg') },
        { title: 'CHICKEN MOMOS', items: items.filter(i => i.diet === 'non-veg') },
      ];
    }

    if (activeTab === 'pasta') {
      const cat = MENU_CATEGORIES.find(c => c.id === 'pasta');
      const items = cat?.items || [];
      return [
        { title: 'VEG PENNE PASTA', items: items.filter(i => i.diet === 'veg') },
        { title: 'CHICKEN PENNE PASTA', items: items.filter(i => i.diet === 'non-veg') },
      ];
    }

    if (activeTab === 'burgers') {
      const cat = MENU_CATEGORIES.find(c => c.id === 'burgers');
      const items = cat?.items || [];
      return [
        { title: 'GOURMET BURGERS', items: items.slice(0, 5) },
        { title: 'CRUNCH SPECIALS', items: items.slice(5, 10) },
      ];
    }

    // Default category fallback
    const targetCat = MENU_CATEGORIES.find(c => c.id === activeTab);
    const items = targetCat?.items || [];
    const mid = Math.ceil(items.length / 2);
    return [
      { title: targetCat?.name.toUpperCase() || 'ITEMS', items: items.slice(0, mid) },
      { title: 'MORE SPECIALS', items: items.slice(mid) },
    ];
  }, [activeTab, searchQuery]);

  const handleAdd = (item: MenuItem) => {
    onAddToCart(item);
    setAddedId(item.id);
    setTimeout(() => {
      setAddedId(prev => (prev === item.id ? null : prev));
    }, 1000);
  };

  return (
    <section
      id="menu"
      style={{
        backgroundColor: '#011026',
        color: '#fff',
        padding: 'clamp(60px, 8vw, 100px) 0',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(167,235,242,0.06)',
        borderBottom: '1px solid rgba(167,235,242,0.06)',
      }}
    >
      {/* Background ambient radial gradients */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'clamp(300px, 60vw, 800px)',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(2,56,89,0.3) 0%, rgba(1,28,64,0.1) 60%, transparent 80%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 clamp(16px, 4vw, 36px)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* ── HEADER (Matching Reference) ────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '36px',
            gap: '24px',
            flexWrap: 'wrap',
          }}
        >
          <div>
            {/* Eyebrow */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '10px',
              }}
            >
              <div
                style={{
                  width: '24px',
                  height: '2px',
                  background: '#A7EBF2',
                  borderRadius: '2px',
                }}
              />
              <span
                style={{
                  fontFamily: '"Outfit", sans-serif',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: '#A7EBF2',
                }}
              >
                TAKE YOUR TIME
              </span>
            </div>

            {/* Title with Dot */}
            <h2
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 'clamp(38px, 6vw, 76px)',
                fontWeight: 700,
                color: '#fff',
                margin: 0,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
              }}
            >
              The menu<span style={{ color: '#54ACBF' }}>.</span>
            </h2>
          </div>

          {/* Right Tagline */}
          <div style={{ maxWidth: '380px', paddingTop: '8px' }}>
            <p
              style={{
                fontFamily: '"Outfit", sans-serif',
                fontSize: 'clamp(12px, 1.5vw, 13px)',
                fontWeight: 300,
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.6)',
                margin: 0,
              }}
            >
              Familiar favorites, little indulgences, and enough variety to make staying for one more thing feel like a good idea.
            </p>
          </div>
        </div>

        {/* ── CATEGORY TAB BAR + SEARCH ───────────────────────────────── */}
        <div
          className="menu-header-row"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '14px',
            paddingBottom: '18px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            marginBottom: '36px',
            flexWrap: 'wrap',
          }}
        >
          {/* Framed horizontal category tabs */}
          <div
            className="no-scrollbar"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              overflowX: 'auto',
              padding: '2px',
              maxWidth: '100%',
            }}
          >
            {CATEGORY_TABS.map(tab => {
              const isActive = activeTab === tab.id && !searchQuery;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSearchQuery('');
                  }}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '4px',
                    fontFamily: '"Outfit", sans-serif',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    border: isActive
                      ? '1.5px solid #54ACBF'
                      : '1px solid rgba(255,255,255,0.12)',
                    background: isActive
                      ? '#54ACBF'
                      : 'rgba(255,255,255,0.03)',
                    color: isActive ? '#011026' : 'rgba(255,255,255,0.7)',
                    boxShadow: isActive ? '0 0 16px rgba(84,172,191,0.35)' : 'none',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div
            className="menu-search-box"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '7px 16px',
              borderRadius: '4px',
              border: '1px solid rgba(255,255,255,0.14)',
              background: 'rgba(255,255,255,0.02)',
              minWidth: '180px',
              flex: '1 1 180px',
              maxWidth: '300px',
            }}
          >
            <Search size={14} color="#54ACBF" />
            <input
              type="text"
              placeholder="Search the menu..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                background: 'none',
                border: 'none',
                outline: 'none',
                fontFamily: '"Outfit", sans-serif',
                fontSize: '12px',
                color: '#fff',
                width: '100%',
              }}
            />
          </div>
        </div>

        {/* ── RESPONSIVE MENU DISPLAY (No image effects, pure clean typography) ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + searchQuery}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="menu-columns-grid"
            style={{ minHeight: '300px' }}
          >
            {displayColumns.map((col, colIdx) => (
              <div key={colIdx} style={{ display: 'flex', flexDirection: 'column' }}>
                {/* Column Section Title */}
                <div style={{ marginBottom: '18px' }}>
                  <h3
                    style={{
                      fontFamily: '"Outfit", sans-serif',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: '#A7EBF2',
                      margin: 0,
                    }}
                  >
                    {col.title}
                  </h3>
                </div>

                {/* Items in Column — Clean typography with diet dot, dotted leader line, price, actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  {col.items.length > 0 ? (
                    col.items.map(item => {
                      const isFav = favorites.includes(item.id);
                      const isJustAdded = addedId === item.id;

                      return (
                        <div
                          key={item.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '10px 8px',
                            borderBottom: '1px solid rgba(255,255,255,0.04)',
                            transition: 'all 0.2s ease',
                            borderRadius: '6px',
                            cursor: 'pointer',
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }}
                        >
                          {/* Vegetarian / Non-Veg Indicator Dot */}
                          <div
                            style={{
                              width: '7px',
                              height: '7px',
                              borderRadius: '50%',
                              backgroundColor: item.diet === 'veg' ? '#34d399' : '#f87171',
                              boxShadow: `0 0 6px ${item.diet === 'veg' ? 'rgba(52,211,153,0.6)' : 'rgba(248,113,113,0.6)'}`,
                              marginRight: '10px',
                              flexShrink: 0,
                            }}
                          />

                          {/* Dish Name */}
                          <span
                            style={{
                              fontFamily: '"Outfit", sans-serif',
                              fontSize: 'clamp(13px, 1.5vw, 14px)',
                              fontWeight: 500,
                              color: '#fff',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              maxWidth: 'clamp(140px, 30vw, 260px)',
                            }}
                          >
                            {item.name}
                          </span>

                          {/* Dotted Leader Line */}
                          <div
                            style={{
                              flex: 1,
                              borderBottom: '1px dotted rgba(255,255,255,0.15)',
                              margin: '0 10px',
                              minWidth: '12px',
                            }}
                          />

                          {/* Price */}
                          <span
                            style={{
                              fontFamily: '"Playfair Display", Georgia, serif',
                              fontSize: '15px',
                              fontWeight: 700,
                              color: '#A7EBF2',
                              marginRight: '10px',
                              whiteSpace: 'nowrap',
                              flexShrink: 0,
                            }}
                          >
                            ₹{item.price}
                          </span>

                          {/* Action Buttons */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                            <button
                              onClick={e => {
                                e.stopPropagation();
                                onToggleFavorite(item);
                              }}
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '4px',
                                color: isFav ? '#f87171' : 'rgba(255,255,255,0.2)',
                                transition: 'color 0.2s',
                              }}
                              aria-label="Save to favorites"
                            >
                              <Heart size={13} fill={isFav ? '#f87171' : 'none'} />
                            </button>

                            <button
                              onClick={e => {
                                e.stopPropagation();
                                handleAdd(item);
                              }}
                              style={{
                                padding: '4px 9px',
                                borderRadius: '50px',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '3px',
                                fontSize: '10px',
                                fontWeight: 700,
                                transition: 'all 0.2s ease',
                                background: isJustAdded ? '#34d399' : '#26658C',
                                color: isJustAdded ? '#000' : '#fff',
                              }}
                            >
                              {isJustAdded ? <Check size={11} /> : <Plus size={11} />}
                              <span>{isJustAdded ? 'Added' : 'Add'}</span>
                            </button>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px', padding: '16px 0' }}>
                      No items in this section.
                    </p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── BOTTOM LEGEND (Matching Reference) ──────────────────────── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginTop: '40px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#34d399',
                boxShadow: '0 0 6px rgba(52,211,153,0.6)',
              }}
            />
            <span
              style={{
                fontFamily: '"Outfit", sans-serif',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              VEGETARIAN
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#f87171',
                boxShadow: '0 0 6px rgba(248,113,113,0.6)',
              }}
            />
            <span
              style={{
                fontFamily: '"Outfit", sans-serif',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              NON-VEGETARIAN
            </span>
          </div>

          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={12} color="#54ACBF" />
            <span
              style={{
                fontFamily: '"Outfit", sans-serif',
                fontSize: '11px',
                color: 'rgba(255,255,255,0.4)',
              }}
            >
              All prices inclusive of taxes · Handcrafted fresh
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
