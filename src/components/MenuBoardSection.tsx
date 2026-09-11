import React, { useState, useMemo } from 'react';
import { Search, Sparkles, MapPin, Phone, Coffee, Clock, Heart, ArrowRight } from 'lucide-react';
import {
  BANH_MI_MORE_CATEGORIES,
  BANH_MI_MORE_MENU,
  CategoryName,
  MenuItemData,
} from '../data/banhMiMoreData';

interface CategoryTabMeta {
  key: CategoryName;
  label: string;
  vnLabel: string;
  icon: string;
  description: string;
}

const CATEGORY_TABS: CategoryTabMeta[] = [
  {
    key: 'All',
    label: 'All Items',
    vnLabel: 'Tất Cả',
    icon: '',
    description: 'Browse the complete daily bakery catalog',
  },
  {
    key: 'Sandwiches',
    label: 'Sandwiches',
    vnLabel: 'Bánh Mì',
    icon: '🥪',
    description: 'Crispy deck-oven baguettes, savory grilled meats, house liver pâté & fresh herbs',
  },
  {
    key: 'Bakery Goods',
    label: 'Bakery Goods',
    vnLabel: 'Bánh Mặn & Ngọt',
    icon: '🥟',
    description: 'Hot pâté sô, steamed bánh bao, crispy spring rolls & French tea pastries',
  },
  {
    key: 'Bakery Croissants',
    label: 'Croissants',
    vnLabel: 'Bánh Sừng Bò',
    icon: '🥐',
    description: 'Flaky butter pastries, almond croissants & savory BBQ pork fills',
  },
  {
    key: 'Plain Bread',
    label: 'Plain Bread',
    vnLabel: 'Bánh Mì Không',
    icon: '🥖',
    description: 'Hot French baguettes ($1.75 ea / 2 for $1 regular / 4 for $1 mini) & rolls',
  },
  {
    key: 'Sweet Bread',
    label: 'Sweet Bread',
    vnLabel: 'Bánh Mì Ngọt',
    icon: '🍞',
    description: 'Fresh baked challah, sweet brioche, chocolate chip loaves & dinner rolls',
  },
  {
    key: 'Coffee',
    label: 'Coffee',
    vnLabel: 'Cà Phê',
    icon: '☕',
    description: 'Slow-dripped dark roast Vietnamese coffee with sweet condensed milk over ice',
  },
  {
    key: 'Drinks',
    label: 'Drinks',
    vnLabel: 'Nước Giải Khát',
    icon: '🧋',
    description: 'Chilled spiced Thai tea, fresh soybean milk, pennywort juice & refreshments',
  },
  {
    key: 'Meats',
    label: 'Meats by lb',
    vnLabel: 'Thịt & Chả',
    icon: '🥩',
    description: 'Char-grilled lemongrass pork, red char siu, head cheese & chả lụa whole rolls',
  },
  {
    key: 'Veggies',
    label: 'Pickled Veggies',
    vnLabel: 'Đồ Chua',
    icon: '🥕',
    description: 'Crunchy sweet & tangy pickled daikon radish and carrots by the pound jar',
  },
  {
    key: 'Miscellaneous',
    label: 'Misc',
    vnLabel: 'Khác',
    icon: '❄️',
    description: 'Food-grade bagged party ice and bakery pantry items',
  },
];

// Search normalizer to handle Vietnamese diacritics and accented characters
const normalizeSearch = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .trim();
};

export const MenuBoardSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryName>('Sandwiches');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTag, setFilterTag] = useState<'all' | 'popular' | 'specials'>('all');

  // Filter items based on activeCategory, searchQuery, and filterTag
  const filteredData = useMemo(() => {
    const rawQ = searchQuery.trim();
    const cleanQ = normalizeSearch(rawQ);
    const tokens = cleanQ ? cleanQ.split(/\s+/).filter(Boolean) : [];

    // When searching, inspect all categories so search finds items across the whole menu
    const categoriesToInspect =
      cleanQ || activeCategory === 'All'
        ? (Object.keys(BANH_MI_MORE_MENU) as CategoryName[])
        : [activeCategory];

    const result: { category: string; items: MenuItemData[] }[] = [];

    for (const cat of categoriesToInspect) {
      let items = BANH_MI_MORE_MENU[cat] || [];

      if (cleanQ) {
        items = items.filter((item) => {
          const normName = normalizeSearch(item.name);
          const normVnName = item.vietnameseName ? normalizeSearch(item.vietnameseName) : '';
          const normDesc = normalizeSearch(item.description);
          const normCat = normalizeSearch(cat);
          const normNotes = item.notes ? normalizeSearch(item.notes) : '';
          const normUnit = item.unitText ? normalizeSearch(item.unitText) : '';
          const normPrice = item.price ? item.price.toString() : '';

          const combined = `${normName} ${normVnName} ${normDesc} ${normCat} ${normNotes} ${normUnit} ${normPrice}`;
          return tokens.every((token) => combined.includes(token));
        });
      }

      if (filterTag === 'popular') {
        items = items.filter((item) => item.popular);
      } else if (filterTag === 'specials') {
        items = items.filter((item) => item.notes || item.unitText);
      }

      if (items.length > 0) {
        result.push({ category: cat, items });
      }
    }

    return result;
  }, [activeCategory, searchQuery, filterTag]);

  const activeTabMeta = CATEGORY_TABS.find((t) => t.key === activeCategory) || CATEGORY_TABS[0];

  return (
    <section id="menu" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0b192e] text-white text-xs sm:text-sm font-semibold mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-slate-400" />
            <span>Thực Đơn Tiệm Bánh • Authentic Bakery Menu</span>
          </div>
          <h2 className="font-gotu text-3xl sm:text-4xl md:text-5xl text-[#0b192e] font-normal mb-4 tracking-tight">
            Baked Fresh Every Day in Arlington
          </h2>
          <p className="text-[#0b192e]/75 text-sm sm:text-base md:text-lg leading-relaxed font-normal">
            Select a category tab below to explore our freshly baked French baguettes, savory bánh mì, buttery pastries, and authentic drinks. All items available for daily walk-in counter service!
          </p>
        </div>

        {/* Category Tabs Strip */}
        <div className="mb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none snap-x -mx-2 px-2 sm:mx-0 sm:px-0">
            {CATEGORY_TABS.map((tab) => {
              const isActive = activeCategory === tab.key;
              const count =
                tab.key === 'All'
                  ? Object.values(BANH_MI_MORE_MENU).reduce((sum, arr) => sum + arr.length, 0)
                  : (BANH_MI_MORE_MENU[tab.key] || []).length;

              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => {
                    setActiveCategory(tab.key);
                  }}
                  className={`shrink-0 flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer border ${
                    isActive
                      ? 'bg-[#0b192e] text-white border-[#0b192e] shadow-md shadow-[#0b192e]/15 scale-[1.02]'
                      : 'bg-white text-[#0b192e]/80 border-[#0b192e]/10 hover:bg-[#0b192e]/5 hover:text-[#0b192e]'
                  }`}
                >
                  {tab.icon && <span className="text-base sm:text-lg select-none">{tab.icon}</span>}
                  <div className="flex flex-col text-left leading-tight">
                    <span className="font-semibold whitespace-nowrap">{tab.label}</span>
                    <span
                      className={`text-[10px] font-normal ${
                        isActive ? 'text-slate-300' : 'text-[#0b192e]/60'
                      }`}
                    >
                      {tab.vnLabel}
                    </span>
                  </div>
                  <span
                    className={`ml-1 text-[11px] px-2 py-0.5 rounded-full font-bold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-[#0b192e]/5 text-[#0b192e]/70'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search & Quick Filter Bar */}
        <div className="bg-white rounded-2xl p-3 sm:p-4 border border-[#0b192e]/10 shadow-xs mb-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Live Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#0b192e]/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search items (e.g., pâté sô, cà phê, challah)..."
              className="w-full bg-[#0b192e]/5 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-[#0b192e] placeholder:text-[#0b192e]/40 border border-transparent focus:border-slate-500 focus:bg-white focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#0b192e]/50 hover:text-[#0b192e]"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Filter Chips */}
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
            <span className="text-xs text-[#0b192e]/60 font-medium whitespace-nowrap hidden md:inline">
              Filter:
            </span>
            <button
              type="button"
              onClick={() => setFilterTag('all')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                filterTag === 'all'
                  ? 'bg-[#0b192e] text-white'
                  : 'bg-[#0b192e]/5 text-[#0b192e]/70 hover:bg-[#0b192e]/10'
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setFilterTag('popular')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1 ${
                filterTag === 'popular'
                  ? 'bg-slate-700 text-white'
                  : 'bg-[#0b192e]/5 text-[#0b192e]/70 hover:bg-[#0b192e]/10'
              }`}
            >
              <span>⭐ Customer Favorites</span>
            </button>
            <button
              type="button"
              onClick={() => setFilterTag('specials')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1 ${
                filterTag === 'specials'
                  ? 'bg-[#0b192e] text-white'
                  : 'bg-[#0b192e]/5 text-[#0b192e]/70 hover:bg-[#0b192e]/10'
              }`}
            >
              <span>🏷️ By lb & Specials</span>
            </button>
          </div>
        </div>

        {/* Tab Context Banner */}
        <div className="bg-[#0b192e]/5 border border-[#0b192e]/10 rounded-2xl px-5 py-3.5 mb-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {activeTabMeta.icon && <span className="text-2xl">{activeTabMeta.icon}</span>}
            <div>
              <h3 className="font-gotu text-lg sm:text-xl text-[#0b192e] font-medium leading-tight">
                {activeTabMeta.label} <span className="text-sm font-sans text-slate-600">({activeTabMeta.vnLabel})</span>
              </h3>
              <p className="text-xs text-[#0b192e]/70">{activeTabMeta.description}</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-[#0b192e]/80 font-medium">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>Counter Ready: 7AM – 5PM</span>
          </div>
        </div>

        {/* The Iconic Deep Navy Chalkboard Board */}
        <div className="relative rounded-3xl overflow-hidden bg-[#0B192E] text-white shadow-2xl border border-white/10">
          {/* Main Deep Navy Menu Inner Board */}
          <div className="px-4 sm:px-8 md:px-12 pt-6 sm:pt-8 pb-8 sm:pb-12">
            {filteredData.length === 0 ? (
              <div className="text-center py-16 px-4">
                <p className="text-slate-200 font-gotu text-xl mb-2">No items found</p>
                <p className="text-sm text-white/70 mb-4">
                  Try adjusting your search query or filter tags.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setFilterTag('all');
                  }}
                  className="px-4 py-2 rounded-full bg-white/15 text-white hover:bg-white/25 text-xs font-semibold transition-colors"
                >
                  Reset Search & Filters
                </button>
              </div>
            ) : (
              <div className="space-y-10">
                {filteredData.map(({ category, items }) => (
                  <div key={category} className="menu-category-group">
                    {/* Category Title Heading */}
                    <div className="text-center mb-6">
                      <h3 className="font-gotu text-2xl sm:text-3xl text-white font-normal relative inline-block px-6">
                        {category}
                      </h3>
                    </div>

                    {/* Menu Item 2-Column Grid - evenly spaced, organized, unboxed */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-6">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="flex flex-col justify-start pb-5 border-b border-white/10"
                        >
                          {/* Top Row: Name and Price */}
                          <div className="flex items-baseline justify-between gap-4">
                            <div className="flex items-baseline gap-2 flex-wrap min-w-0">
                              <span className="font-gotu text-base sm:text-lg text-white font-medium">
                                {item.name}
                              </span>
                              {item.unitText && (
                                <span className="text-xs text-slate-300/75 font-normal">
                                  ({item.unitText})
                                </span>
                              )}
                              {item.notes && (
                                <span className="text-xs text-amber-200/85 font-normal">
                                  • {item.notes}
                                </span>
                              )}
                            </div>

                            {/* Price - clean text, no box */}
                            <div className="shrink-0 text-right">
                              <span className="font-gotu text-base sm:text-lg font-bold text-slate-100">
                                ${item.price.toFixed(2)}
                              </span>
                            </div>
                          </div>

                          {/* Vietnamese Name Subtitle */}
                          {item.vietnameseName && (
                            <p className="text-xs font-normal text-slate-400 tracking-wide mt-1 italic">
                              {item.vietnameseName}
                            </p>
                          )}

                          {/* Description */}
                          {item.description && (
                            <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light mt-1.5">
                              {item.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Sandwich Add-on Callout Strip */}
            {activeCategory === 'Sandwiches' && (
              <div className="mt-12 p-4 sm:p-5 rounded-2xl bg-white/10 border border-white/15 text-xs sm:text-sm text-white/90 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-slate-200 font-bold block mb-1">
                    🥪 Sandwich Add-ons Available at Counter:
                  </span>
                  <span className="text-white/80">
                    Extra Meat (+ $2.00) • Fried Egg (+ $1.50) • Extra Pickled Veggies (+ $0.50) • Extra Pâté or Mayo on request!
                  </span>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-white text-[#0b192e] font-bold">
                  Just ask our counter team
                </span>
              </div>
            )}

            {/* Warm Vietnamese Bakery Hospitality Notice at bottom of Chalkboard */}
            <div className="mt-12 pt-8 border-t border-white/15 text-center flex flex-col items-center justify-center gap-4">
              <div className="max-w-2xl text-center space-y-2">
                <p className="text-base sm:text-lg font-gotu text-slate-200 font-medium">
                  Kính Mời Quý Khách Ghé Thăm Tiệm Bánh
                </p>
                <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                  Every morning starting at 7:00 AM, our French baguettes come fresh out of the deck oven. We welcome you for walk-in counter service at <strong className="text-white">6516 New York Ave, Arlington, TX 76018</strong>.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <a
                  href="#visit"
                  className="px-6 py-2.5 rounded-full bg-white text-[#0b192e] hover:bg-slate-100 font-semibold text-xs sm:text-sm transition-colors shadow-sm inline-flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4 text-slate-600" />
                  <span>Visit Bakery & Directions</span>
                </a>
                <a
                  href="tel:8172758868"
                  className="px-6 py-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white font-semibold text-xs sm:text-sm transition-colors border border-white/20 inline-flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-slate-300" />
                  <span>Call to Reserve: (817) 275-8868</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
