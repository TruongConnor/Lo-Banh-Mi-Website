import React, { useState, useMemo, useEffect } from 'react';
import {
  ArrowLeft,
  Search,
  Sparkles,
  Phone,
  MapPin,
  Clock,
  LayoutGrid,
  List,
  CheckCircle2,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { LoBanhMiLogo } from './LoBanhMiLogo';
import { PhotoUploadSlot } from './PhotoUploadSlot';
import {
  BANH_MI_MORE_MENU,
  CategoryName,
  MenuItemData,
} from '../data/banhMiMoreData';

interface FullScreenMenuProps {
  onBackToHome: () => void;
  initialCategory?: CategoryName;
}

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
    description: 'Browse the complete daily bakery catalog (50+ items)',
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

interface CategorySliderProps {
  categories: CategoryTabMeta[];
  activeCategory: CategoryName;
  onSelectCategory: (cat: CategoryName) => void;
  totalItemCount: number;
}

const CategorySlider: React.FC<CategorySliderProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  totalItemCount,
}) => {
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    const el = sliderRef.current;
    if (el) {
      setCanScrollLeft(el.scrollLeft > 8);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
    }
  };

  useEffect(() => {
    checkScrollability();
    const el = sliderRef.current;
    if (el) {
      el.addEventListener('scroll', checkScrollability);
      window.addEventListener('resize', checkScrollability);
      return () => {
        el.removeEventListener('scroll', checkScrollability);
        window.removeEventListener('resize', checkScrollability);
      };
    }
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    const el = sliderRef.current;
    if (el) {
      const scrollDistance = direction === 'left' ? -260 : 260;
      el.scrollBy({ left: scrollDistance, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group/slider px-1 sm:px-2">
      {/* Left Slider Arrow Button */}
      <button
        type="button"
        onClick={() => handleScroll('left')}
        disabled={!canScrollLeft}
        aria-label="Previous menu categories"
        className={`absolute -left-2 sm:-left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0b192e] border border-white/25 text-white flex items-center justify-center shadow-lg transition-all duration-150 cursor-pointer ${
          canScrollLeft
            ? 'opacity-90 hover:opacity-100 hover:scale-110 hover:bg-slate-800'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      </button>

      {/* Horizontally Scrollable Slider Track (No Clumping) */}
      <div
        ref={sliderRef}
        className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto scroll-smooth py-2 px-1 scrollbar-none snap-x"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((tab) => {
          const isActive = activeCategory === tab.key;
          const count =
            tab.key === 'All'
              ? totalItemCount
              : (BANH_MI_MORE_MENU[tab.key] || []).length;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onSelectCategory(tab.key)}
              className={`shrink-0 snap-start flex items-center gap-2 px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer border whitespace-nowrap ${
                isActive
                  ? 'bg-white text-[#0B192E] border-white shadow-md font-semibold scale-[1.02]'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/15 hover:border-white/30'
              }`}
            >
              {tab.icon && <span className="text-sm select-none">{tab.icon}</span>}
              <span className="whitespace-nowrap">{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive
                    ? 'bg-[#0B192E] text-white'
                    : 'bg-white/15 text-slate-200'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Right Slider Arrow Button */}
      <button
        type="button"
        onClick={() => handleScroll('right')}
        disabled={!canScrollRight}
        aria-label="Next menu categories"
        className={`absolute -right-2 sm:-right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0b192e] border border-white/25 text-white flex items-center justify-center shadow-lg transition-all duration-150 cursor-pointer ${
          canScrollRight
            ? 'opacity-90 hover:opacity-100 hover:scale-110 hover:bg-slate-800'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      </button>
    </div>
  );
};

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

export const FullScreenMenu: React.FC<FullScreenMenuProps> = ({
  onBackToHome,
  initialCategory = 'Sandwiches',
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryName>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTag, setFilterTag] = useState<'all' | 'popular' | 'specials'>('all');
  const [viewMode, setViewMode] = useState<'chalkboard' | 'cards'>('chalkboard');

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Listen for Escape key to go back home
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onBackToHome();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBackToHome]);

  // Filter items - searches across all categories when a query is entered
  const filteredData = useMemo(() => {
    const rawQ = searchQuery.trim();
    const cleanQ = normalizeSearch(rawQ);
    const tokens = cleanQ ? cleanQ.split(/\s+/).filter(Boolean) : [];

    // If there is an active search query, inspect all categories so items are always found
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

  const activeTabMeta =
    CATEGORY_TABS.find((t) => t.key === activeCategory) || CATEGORY_TABS[0];

  return (
    <div className="min-h-screen bg-slate-50 text-[#0b192e] flex flex-col selection:bg-slate-700 selection:text-white">
      {/* Sticky Fullscreen Menu Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#0b192e]/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3">
          {/* Back to Home Button */}
          <button
            id="menu-back-home-btn"
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-[#0b192e] text-white hover:bg-slate-800 transition-colors text-xs sm:text-sm font-semibold shadow-xs cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
            <span className="hidden md:inline text-white/60 text-xs font-normal">(Trang Chủ)</span>
          </button>

          {/* Center Brand Logo */}
          <button
            type="button"
            onClick={onBackToHome}
            className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity"
            title="Return to Home"
          >
            <LoBanhMiLogo size="sm" variant="badge-rounded" showTextLockup={true} />
          </button>

          {/* Right Quick Actions */}
          <div className="flex items-center gap-2">
            <a
              href="tel:8172758868"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0b192e]/5 hover:bg-[#0b192e]/10 text-xs font-semibold text-[#0b192e] border border-[#0b192e]/10 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-slate-600" />
              <span>(817) 275-8868</span>
            </a>

            {/* View Mode Switcher */}
            <div className="flex items-center bg-[#0b192e]/5 p-1 rounded-full border border-[#0b192e]/10 text-xs">
              <button
                type="button"
                onClick={() => setViewMode('chalkboard')}
                className={`p-1.5 rounded-full transition-colors ${
                  viewMode === 'chalkboard'
                    ? 'bg-[#0b192e] text-white'
                    : 'text-[#0b192e]/70 hover:text-[#0b192e]'
                }`}
                title="Chalkboard Board View"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('cards')}
                className={`p-1.5 rounded-full transition-colors ${
                  viewMode === 'cards'
                    ? 'bg-[#0b192e] text-white'
                    : 'text-[#0b192e]/70 hover:text-[#0b192e]'
                }`}
                title="Photo Cards View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Menu Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 pt-3 sm:pt-5 pb-12">
        {/* Title & Info Banner */}
        <div className="text-center mb-3 max-w-2xl mx-auto">
          <h1 className="font-gotu text-2xl sm:text-3xl text-[#0b192e] font-normal mb-1">
            Lò Bánh Mì Menu
          </h1>
          <p className="text-xs sm:text-sm text-[#0b192e]/75 leading-relaxed">
            All items baked and prepared fresh daily for walk-in counter service at 6516 New York Ave, Arlington, TX.
          </p>
        </div>

        {/* Search Strip */}
        <div className="bg-white rounded-2xl p-2.5 sm:p-3 border border-[#0b192e]/10 shadow-xs mb-3 sm:mb-4">
          {/* Live Search */}
          <div className="relative w-full">
            <Search className="w-4 h-4 text-[#0b192e]/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search menu items (e.g. thit nuong, pate so, cafe, croissant)..."
              className="w-full bg-[#0b192e]/5 rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-[#0b192e] placeholder:text-[#0b192e]/40 border border-transparent focus:border-slate-500 focus:bg-white focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-xs text-[#0b192e]/50 hover:text-[#0b192e]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Search Result Status */}
          {searchQuery.trim() && (
            <div className="mt-2 pt-2 border-t border-[#0b192e]/5 flex items-center justify-between text-xs text-[#0b192e]/75 px-1">
              <span>
                Found <strong className="text-[#0b192e] font-semibold">{filteredData.reduce((sum, g) => sum + g.items.length, 0)}</strong> matching item(s) across all bakery categories
              </span>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-slate-600 hover:text-[#0b192e] font-semibold underline cursor-pointer"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

        {/* Content Mode 1: Classic Chalkboard Board View */}
        {viewMode === 'chalkboard' && (
          <div className="relative rounded-3xl overflow-hidden bg-[#0B192E] text-white shadow-2xl border border-white/10 mb-12">
            {/* Main Deep Navy Chalkboard Inner Board */}
            <div className="px-4 sm:px-8 md:px-12 pt-4 sm:pt-6 pb-8 sm:pb-12">
              {/* Category Options Inside the Blue Box */}
              <div className="mb-6 pb-4 border-b border-white/15">
                <CategorySlider
                  categories={CATEGORY_TABS}
                  activeCategory={activeCategory}
                  onSelectCategory={setActiveCategory}
                  totalItemCount={Object.values(BANH_MI_MORE_MENU).reduce((sum, arr) => sum + arr.length, 0)}
                />
              </div>

              {filteredData.length === 0 ? (
                <div className="text-center py-16 px-4">
                  <p className="text-slate-200 font-gotu text-xl mb-2">No items found</p>
                  <p className="text-sm text-white/70 mb-4">
                    Try adjusting your search query or reset filter tags.
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
                      <h3 className="font-gotu text-2xl sm:text-3xl text-white font-normal relative inline-block px-4">
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

              {/* Bakery Hours & Notice */}
              <div className="mt-12 pt-8 border-t border-white/15 text-center flex flex-col items-center justify-center gap-4">
                <p className="text-xs sm:text-sm text-white/80 max-w-xl">
                  Deck ovens start early daily at 7:00 AM. For large family trays, parties, or bulk baguette orders, please call ahead at <strong className="text-white">(817) 275-8868</strong>.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href="tel:8172758868"
                    className="px-5 py-2.5 rounded-full bg-white text-[#0b192e] hover:bg-slate-100 font-semibold text-xs transition-colors shadow-sm inline-flex items-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5 text-slate-600" />
                    <span>Call Bakery: (817) 275-8868</span>
                  </a>
                  <button
                    type="button"
                    onClick={onBackToHome}
                    className="px-5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white font-semibold text-xs transition-colors border border-white/20 inline-flex items-center gap-2 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Return to Home Page</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content Mode 2: Photo Cards View */}
        {viewMode === 'cards' && (
          <div className="space-y-10 mb-16">
            {/* Category Options Inside Blue Box for Cards View */}
            <div className="bg-[#0b192e] text-white rounded-3xl p-3 sm:p-4 shadow-lg border border-white/10">
              {/* Category Options Slider for Cards View */}
              <CategorySlider
                categories={CATEGORY_TABS}
                activeCategory={activeCategory}
                onSelectCategory={setActiveCategory}
                totalItemCount={Object.values(BANH_MI_MORE_MENU).reduce((sum, arr) => sum + arr.length, 0)}
              />
            </div>

            {filteredData.length === 0 ? (
              <div className="text-center py-16 px-4 bg-white rounded-3xl border border-[#0b192e]/10">
                <p className="text-[#0b192e] font-gotu text-xl mb-2">No items found</p>
                <p className="text-sm text-[#0b192e]/70 mb-4">
                  Try adjusting your search query or reset filter tags.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setFilterTag('all');
                  }}
                  className="px-4 py-2 rounded-full bg-[#0b192e] text-white hover:bg-slate-800 text-xs font-semibold transition-colors"
                >
                  Reset Search & Filters
                </button>
              </div>
            ) : (
              filteredData.map(({ category, items }) => (
                <div key={category} className="space-y-6">
                  <div className="flex items-center justify-between border-b border-[#0b192e]/10 pb-3">
                    <div>
                      <h3 className="font-gotu text-2xl text-[#0b192e] font-semibold">
                        {category}
                      </h3>
                      <p className="text-xs text-[#0b192e]/60">
                        {items.length} item{items.length > 1 ? 's' : ''} available
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-3xl overflow-hidden border border-[#0b192e]/10 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                      >
                        {/* Photo Slot Container */}
                        <div className="relative w-full bg-slate-100 overflow-hidden">
                          <PhotoUploadSlot
                            id={`menu_item_${item.id}`}
                            label={item.name}
                            sublabel="Upload photo"
                            aspectRatio="aspect-[16/10]"
                            initialImage={item.image || ''}
                            compact={true}
                            className="w-full max-w-full"
                          />
                          {item.popular && (
                            <div className="absolute top-3 left-3 z-20 pointer-events-none">
                              <span className="px-2.5 py-1 rounded-full bg-[#0b192e] text-white text-[10px] font-bold border border-white/20 shadow-xs">
                                ★ Popular
                              </span>
                            </div>
                          )}
                          <div className="absolute top-3 right-3 z-20 pointer-events-none">
                            <span className="px-2.5 py-1 rounded-full bg-white text-[#0b192e] text-xs font-bold shadow-xs border border-[#0b192e]/10">
                              ${item.price.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-5 flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="font-gotu text-lg text-[#0b192e] font-medium leading-tight mb-0.5">
                              {item.name}
                            </h4>
                            {item.vietnameseName && (
                              <p className="text-xs text-slate-500 font-semibold italic mb-2">
                                {item.vietnameseName}
                              </p>
                            )}
                            <p className="text-xs text-[#0b192e]/70 leading-relaxed font-light mb-3">
                              {item.description}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-[#0b192e]/5 text-xs text-[#0b192e]/60">
                            <span>Available Counter Service</span>
                            <span className="font-semibold text-[#0b192e]">${item.price.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>

      {/* Floating "Back to Home" Pill Button on Bottom Right */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          type="button"
          onClick={onBackToHome}
          className="px-5 py-3 rounded-full bg-[#0b192e] hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm shadow-xl flex items-center gap-2 cursor-pointer transition-all hover:scale-105 group border border-white/20"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>
      </div>
    </div>
  );
};
