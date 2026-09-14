import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  UtensilsCrossed,
} from 'lucide-react';
import { PhotoUploadSlot } from './PhotoUploadSlot';
import { CategoryName } from '../data/banhMiMoreData';
import { ScrollReveal } from './ScrollReveal';

interface MenuPreviewSectionProps {
  onOpenMenu: (category?: CategoryName) => void;
}

interface PreviewCategoryCard {
  id: string;
  category: CategoryName;
  title: string;
  vnTitle: string;
  priceNote: string;
  defaultImage: string;
  shortDesc: string;
}

const PREVIEW_CATEGORIES: PreviewCategoryCard[] = [
  {
    id: 'preview-sandwiches',
    category: 'Sandwiches',
    title: 'Bánh Mì Sandwiches',
    vnTitle: 'Bánh Mì Truyền Thống',
    priceNote: 'From $5.25',
    defaultImage: '/preview-sandwiches.jpg',
    shortDesc: 'Crisp deck-oven baguettes filled with grilled meats, liver pâté, pickled daikon & fresh cilantro.',
  },
  {
    id: 'preview-baguettes',
    category: 'Plain Bread',
    title: 'Deck-Oven Baguettes',
    vnTitle: 'Bánh Mì Baguette Nóng Giòn',
    priceNote: '$1.75 ea • 2 for $1 regular • 4 for $1 mini',
    defaultImage: '/preview-baguettes.jpg',
    shortDesc: 'Pulled fresh and hot from stone deck ovens all morning. Crackling thin crust and airy crumb.',
  },
  {
    id: 'preview-croissants',
    category: 'Bakery Croissants',
    title: 'French Croissants',
    vnTitle: 'Bánh Sừng Bò',
    priceNote: 'From $2.50',
    defaultImage: '/preview-croissants.jpg',
    shortDesc: 'Multi-layered flaky butter croissants, sweet almond pastries, and savory BBQ croissants.',
  },
  {
    id: 'preview-pateso',
    category: 'Bakery Goods',
    title: 'Hot Pâté Sô & Bánh Bao',
    vnTitle: 'Bánh Pâté Sô & Bánh Bao',
    priceNote: 'From $2.50',
    defaultImage: '/preview-pateso.jpg',
    shortDesc: 'Warm buttery puff pastries with seasoned pork, and fluffy steamed buns with egg.',
  },
  {
    id: 'preview-coffee',
    category: 'Coffee',
    title: 'Vietnamese Coffee',
    vnTitle: 'Cà Phê Sữa Đá',
    priceNote: 'From $4.00',
    defaultImage: '/preview-coffee.jpg',
    shortDesc: 'Authentic slow-dripped Vietnamese dark roast with condensed milk over crushed ice.',
  },
  {
    id: 'preview-meats',
    category: 'Meats',
    title: 'Deli Meats by the Pound',
    vnTitle: 'Thịt Nguội & Chả Lụa',
    priceNote: 'Sold by the lb',
    defaultImage: '/preview-meats.jpg',
    shortDesc: 'Take-home lemongrass pork, Vietnamese steamed pork ham (chả lụa), and box of pickled veggies.',
  },
];

export const MenuPreviewSection: React.FC<MenuPreviewSectionProps> = ({ onOpenMenu }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScroll = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);

    // Calculate currently active card index
    const firstChild = sliderRef.current.firstElementChild as HTMLElement | null;
    if (firstChild) {
      const cardWidth = firstChild.getBoundingClientRect().width;
      const gap = 24; // 1.5rem (gap-6)
      const currentIndex = Math.round(scrollLeft / (cardWidth + gap));
      setActiveIndex(Math.min(Math.max(currentIndex, 0), PREVIEW_CATEGORIES.length - 1));
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  // Enable mouse wheel scrolling and click-and-drag when hovering over the horizontal slider
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleWheel = (e: WheelEvent) => {
      // If user is holding Shift, let browser handle native horizontal scroll
      if (e.shiftKey) {
        return;
      }

      // Determine delta: prioritize horizontal if trackpad horizontal swipe is larger, otherwise use deltaY
      let delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

      // Normalize deltaMode: 0 = pixels, 1 = lines (Firefox), 2 = pages
      if (e.deltaMode === 1) {
        delta *= 40;
      } else if (e.deltaMode === 2) {
        delta *= slider.clientWidth;
      }

      if (delta === 0) return;

      const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
      if (maxScrollLeft <= 0) return;

      const isScrollingRight = delta > 0;
      const isScrollingLeft = delta < 0;
      const canScrollRight = slider.scrollLeft < maxScrollLeft - 3;
      const canScrollLeft = slider.scrollLeft > 3;

      // Intercept wheel only when the slider can scroll horizontally in that direction
      if ((isScrollingRight && canScrollRight) || (isScrollingLeft && canScrollLeft)) {
        e.preventDefault();
        slider.scrollLeft += delta * 1.25;
        checkScroll();
      }
    };

    slider.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      slider.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Mouse Drag to Slide support
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);
  const hasDraggedRef = useRef(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeftStartRef.current = sliderRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !sliderRef.current) return;
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.4;
    if (Math.abs(walk) > 6) {
      hasDraggedRef.current = true;
    }
    sliderRef.current.scrollLeft = scrollLeftStartRef.current - walk;
    checkScroll();
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  const slide = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    const firstChild = sliderRef.current.firstElementChild as HTMLElement | null;
    const scrollAmount = firstChild
      ? (firstChild.getBoundingClientRect().width + 24) * 1.5
      : sliderRef.current.clientWidth * 0.75;

    sliderRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const slideToIndex = (index: number) => {
    if (!sliderRef.current) return;
    const cards = sliderRef.current.children;
    if (cards[index]) {
      (cards[index] as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
    }
  };

  return (
    <section id="menu" data-section="menu-preview" className="pt-6 pb-12 sm:pt-10 sm:pb-20 bg-white relative overflow-hidden scroll-mt-20">
      <div id="menu-preview" className="absolute -top-24 pointer-events-none" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal variant="fade-up" duration={0.6}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-10">
            <div className="max-w-2xl">
              <h2 className="font-gotu text-2xl sm:text-4xl text-[#0b192e] font-normal mb-1.5 sm:mb-3 tracking-tight">
                Fresh From Our Ovens
              </h2>
              <p className="text-[#0b192e]/75 text-xs sm:text-base leading-relaxed font-normal">
                A glimpse of what we bake fresh daily. Tap any item to explore our full offerings.
              </p>
            </div>

            {/* Action Buttons & Desktop Slider Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                id="open-full-menu-btn"
                type="button"
                onClick={() => onOpenMenu('Sandwiches')}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#0b192e] hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm transition-all duration-200 shadow-md hover:scale-[1.02] cursor-pointer"
              >
                <UtensilsCrossed className="w-3.5 h-3.5 text-slate-300" />
                <span>Full Menu</span>
                <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
              </button>

              {/* Slider Arrow Controls (Desktop/Tablet only) */}
              <div className="hidden sm:flex items-center gap-2 ml-1 pl-2 border-l border-slate-200">
                <button
                  type="button"
                  onClick={() => slide('left')}
                  disabled={!canScrollLeft}
                  aria-label="Previous slide"
                  className={`p-2.5 rounded-full border transition-all duration-200 cursor-pointer ${
                    canScrollLeft
                      ? 'border-slate-300 bg-white text-[#0b192e] hover:bg-slate-50 hover:border-slate-400 shadow-xs active:scale-95'
                      : 'border-slate-200 bg-slate-100/70 text-slate-300 cursor-not-allowed'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => slide('right')}
                  disabled={!canScrollRight}
                  aria-label="Next slide"
                  className={`p-2.5 rounded-full border transition-all duration-200 cursor-pointer ${
                    canScrollRight
                      ? 'border-slate-300 bg-white text-[#0b192e] hover:bg-slate-50 hover:border-slate-400 shadow-xs active:scale-95'
                      : 'border-slate-200 bg-slate-100/70 text-slate-300 cursor-not-allowed'
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ============================================================ */}
        {/* MOBILE VIEW (< sm): Compact 2-Column Grid (NO sliding left to right) */}
        {/* ============================================================ */}
        <div className="grid grid-cols-2 gap-2.5 xs:gap-3 sm:hidden">
          {PREVIEW_CATEGORIES.map((card, idx) => (
            <ScrollReveal
              key={`mobile-${card.id}`}
              variant="pop"
              delay={idx * 0.05}
              duration={0.45}
            >
              <div
                onClick={() => onOpenMenu(card.category)}
                className="bg-white rounded-xl overflow-hidden border border-[#0b192e]/10 shadow-xs hover:border-[#0b192e]/30 active:scale-[0.98] transition-all flex flex-col cursor-pointer h-full"
              >
                {/* Photo Area */}
                <div
                  className="relative w-full bg-slate-100 overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <PhotoUploadSlot
                    id={`preview_${card.id}`}
                    label={card.title}
                    aspectRatio="aspect-[4/3]"
                    initialImage={card.defaultImage}
                    compact={true}
                    className="w-full max-w-full"
                  />

                  {/* Compact Price Pill */}
                  <div className="absolute top-1.5 right-1.5 z-20 pointer-events-none max-w-[calc(100%-12px)]">
                    <span className="block px-1.5 py-0.5 rounded-full bg-white/95 backdrop-blur-xs text-[#0b192e] text-[8.5px] font-bold border border-[#0b192e]/10 shadow-xs truncate">
                      {card.priceNote}
                    </span>
                  </div>
                </div>

                {/* Compact Card Body */}
                <div className="p-2.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-gotu text-xs xs:text-sm font-medium text-[#0b192e] leading-snug line-clamp-1">
                      {card.title}
                    </h3>
                    <p className="text-[10px] font-medium text-slate-500 italic truncate mb-1">
                      {card.vnTitle}
                    </p>
                    <p className="text-[10px] xs:text-[11px] text-[#0b192e]/70 leading-snug line-clamp-2">
                      {card.shortDesc}
                    </p>
                  </div>

                  <div className="pt-2 mt-2 border-t border-[#0b192e]/5 flex items-center justify-between text-[10px] font-semibold text-[#0b192e]">
                    <span className="text-slate-500">Menu</span>
                    <span className="inline-flex items-center gap-0.5 text-amber-800 font-bold">
                      <span>View</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* ============================================================ */}
        {/* TABLET & DESKTOP VIEW (>= sm): Spacious Horizontal Slider */}
        {/* ============================================================ */}
        <ScrollReveal variant="pop" duration={0.6} delay={0.1} className="hidden sm:block">
          <div className="relative">
            <div
              ref={sliderRef}
              onScroll={checkScroll}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
              className="flex gap-5 sm:gap-6 overflow-x-auto py-4 px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing select-none"
            >
              {PREVIEW_CATEGORIES.map((card) => (
                <div
                  key={card.id}
                  onClick={() => {
                    if (hasDraggedRef.current) return;
                    onOpenMenu(card.category);
                  }}
                  className="w-[320px] sm:w-[340px] md:w-[370px] shrink-0 bg-white rounded-2xl overflow-hidden border border-[#0b192e]/10 shadow-xs hover:shadow-xl hover:border-[#0b192e]/25 transition-all duration-300 flex flex-col cursor-pointer group select-none"
                >
                  {/* Photo Area */}
                  <div
                    className="relative w-full bg-slate-100 overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <PhotoUploadSlot
                      id={`preview_${card.id}`}
                      label={card.title}
                      aspectRatio="aspect-[4/3]"
                      objectPosition={card.id === 'preview-sandwiches' ? 'object-[center_48%]' : 'object-center'}
                      initialImage={card.defaultImage}
                      compact={true}
                      className="w-full max-w-full group-hover:scale-[1.03] transition-transform duration-500"
                    />

                    {/* Price Note Tag */}
                    <div className="absolute top-3 right-3 z-20 pointer-events-none">
                      <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#0b192e] text-xs font-bold border border-[#0b192e]/10 shadow-xs">
                        {card.priceNote}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                    <div>
                      <h3 className="font-gotu text-lg sm:text-xl text-[#0b192e] font-medium leading-snug group-hover:text-amber-800 transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-xs font-semibold text-slate-500 italic mb-2">
                        {card.vnTitle}
                      </p>
                      <p className="text-xs sm:text-sm text-[#0b192e]/70 leading-relaxed line-clamp-3">
                        {card.shortDesc}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#0b192e]/5 flex items-center justify-between text-xs font-semibold text-[#0b192e]">
                      <span className="text-slate-500">Tap card to open</span>
                      <span className="inline-flex items-center gap-1.5 text-[#0b192e] font-bold group-hover:text-amber-700 group-hover:translate-x-1 transition-all">
                        <span>View items</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slider Navigation Dots & Link */}
          <div className="mt-6 flex items-center justify-between gap-4">
            {/* Pagination Indicators / Dots */}
            <div className="flex items-center gap-2">
              {PREVIEW_CATEGORIES.map((cat, idx) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => slideToIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}: ${cat.title}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    idx === activeIndex
                      ? 'w-8 h-2.5 bg-[#0b192e]'
                      : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>

            <div className="text-right">
              <button
                type="button"
                onClick={() => onOpenMenu('All')}
                className="inline-flex items-center gap-2 text-sm font-bold text-[#0b192e] hover:text-amber-800 transition-colors cursor-pointer"
              >
                <span>Explore all menu categories</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Mobile View Bottom Link */}
        <div className="mt-5 text-center sm:hidden">
          <button
            type="button"
            onClick={() => onOpenMenu('All')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0b192e] hover:text-amber-800 transition-colors cursor-pointer py-1"
          >
            <span>Explore all menu categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};

