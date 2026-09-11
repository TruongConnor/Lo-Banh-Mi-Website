import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, MapPin, Flame, Award, Clock, ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { OfficialLogo } from './OfficialLogo';
import { BAKERY_INFO } from '../data/menuData';
import { resolveAssetUrl } from '../utils/photoStorage';

interface HeroSectionProps {
  onExploreMenu: () => void;
  onVisitBakery: () => void;
}

export interface HeroPhotoItem {
  id: string;
  name: string;
  vietnameseName: string;
  description: string;
  price: number;
  sources: string[];
}

const HERO_SANDWICH_PHOTOS: HeroPhotoItem[] = [
  {
    id: 'bm-thit-nuong',
    name: 'Grilled Pork Bánh Mì',
    vietnameseName: 'Bánh Mì Thịt Nướng',
    description: 'Char-grilled lemongrass pork on fresh French baguette with house pâté, creamy mayo, pickled daikon & carrots, and cilantro.',
    price: 5.50,
    sources: [
      '/14081170-9BF8-4CF4-B732-B8E7A552652F.jpeg',
      '/images/thit-nuong.jpg',
      '/thit-nuong.jpg',
      'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'bm-ham-gio-thu',
    name: 'Ham Head Cheese & Pâté',
    vietnameseName: 'Bánh Mì Dăm Bông Giò Thủ Patê (Thịt Nguội)',
    description: 'Traditional deli combination of artisanal head cheese, French ham, rich liver pâté, and crisp pickled vegetables.',
    price: 5.50,
    sources: [
      '/9832E2D8-428A-4417-BF21-C79B318D4087.jpeg',
      '/images/thit-nguoi.jpg',
      '/thit-nguoi.jpg',
      'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'bm-ga',
    name: 'Roasted Chicken Bánh Mì',
    vietnameseName: 'Bánh Mì Gà Xé',
    description: 'Hand-shredded chicken breast roasted in savory five-spice aromatic glaze, topped with crisp golden shallots and cilantro.',
    price: 5.50,
    sources: [
      '/BA2EB963-6C66-499E-92F8-4B51128AE6ED.jpeg',
      '/images/ga.jpg',
      '/ga.jpg',
      'https://images.unsplash.com/photo-1600454309261-3dc9b7597637?auto=format&fit=crop&w=1200&q=80',
    ],
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreMenu,
  onVisitBakery,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customPhotos, setCustomPhotos] = useState<Record<string, string>>({});
  const [srcIndexMap, setSrcIndexMap] = useState<Record<string, number>>({});

  const currentItem = HERO_SANDWICH_PHOTOS[activeIndex];
  const customSrc = customPhotos[currentItem.id];
  const currentSrcIndex = srcIndexMap[currentItem.id] || 0;
  const rawImageSrc = customSrc || currentItem.sources[currentSrcIndex] || currentItem.sources[0];
  const activeImageSrc = resolveAssetUrl(rawImageSrc);

  // Auto cycle smoothly every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_SANDWICH_PHOTOS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % HERO_SANDWICH_PHOTOS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + HERO_SANDWICH_PHOTOS.length) % HERO_SANDWICH_PHOTOS.length);
  };

  const handleImageError = () => {
    const nextIndex = currentSrcIndex + 1;
    if (nextIndex < currentItem.sources.length) {
      setSrcIndexMap((prev) => ({ ...prev, [currentItem.id]: nextIndex }));
    }
  };

  return (
    <section className="relative overflow-hidden bg-encaustic-subtle pt-8 pb-16 md:pt-14 md:pb-24 border-b border-[#121F3E]/10">
      {/* Faded Picture in Background: Atmospheric Wash on Right Half */}
      <div
        className="absolute top-0 right-0 bottom-0 w-full lg:w-3/5 pointer-events-none overflow-hidden transition-opacity duration-1000"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 opacity-20 filter blur-3xl scale-110 transition-all duration-1000"
          style={{
            backgroundImage: `url(${activeImageSrc})`,
            backgroundPosition: 'center 40%',
            backgroundSize: 'cover',
          }}
        />
        {/* Soft feather gradient fading into the words side */}
        <div className="absolute inset-0 bg-gradient-to-r from-encaustic-subtle via-encaustic-subtle/85 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-encaustic-subtle via-transparent to-encaustic-subtle/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-encaustic-subtle via-transparent to-encaustic-subtle/70 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Half Words, Half Picture 50/50 Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Half Words */}
          <div className="space-y-6 text-center lg:text-left">
            {/* Official Logo Banner */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center lg:justify-start"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white/90 backdrop-blur-xs border border-[#121F3E]/15 shadow-xs">
                <div className="w-16">
                  <OfficialLogo variant="dark" size="sm" showText={false} />
                </div>
                <div className="text-left border-l border-[#121F3E]/15 pl-3">
                  <span className="font-serif italic font-bold text-[#121F3E] text-xs block">
                    Authentic French Bakery
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-[#121F3E]/70 font-semibold">
                    6516 New York Ave, Arlington, TX
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Main Slogan Heading */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-2"
            >
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#121F3E] leading-[1.12]">
                {BAKERY_INFO.slogan}
              </h1>
            </motion.div>

            {/* Subheading Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-[#121F3E]/85 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal"
            >
              {BAKERY_INFO.subheading}
            </motion.p>

            {/* Highlight Badges */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1 text-xs sm:text-sm text-[#121F3E]/90"
            >
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/95 border border-[#121F3E]/10 shadow-xs">
                <Flame className="w-4 h-4 text-[#121F3E]" />
                <span className="font-medium">Baked Fresh Daily</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/95 border border-[#121F3E]/10 shadow-xs">
                <Award className="w-4 h-4 text-[#121F3E]" />
                <span className="font-medium">Savory Banh Mi</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/95 border border-[#121F3E]/10 shadow-xs">
                <MapPin className="w-4 h-4 text-[#121F3E]" />
                <span className="font-medium">Arlington, Texas</span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <button
                id="hero-view-menu-btn"
                onClick={onExploreMenu}
                className="w-full sm:w-auto px-8 py-3.5 rounded-md bg-[#0B0B26] text-[#F9FBFB] font-semibold text-base shadow-md hover:bg-[#18184a] transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
              >
                <span>View Menu</span>
                <ChevronDown className="w-4 h-4 text-white/80 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                id="hero-visit-btn"
                onClick={onVisitBakery}
                className="w-full sm:w-auto px-7 py-3.5 rounded-md bg-white/95 text-[#121F3E] font-semibold text-base border-2 border-[#121F3E]/20 hover:border-[#121F3E] hover:bg-[#F9FBFB] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Clock className="w-4 h-4 text-[#121F3E]" />
                <span>Visit Our Bakery</span>
              </button>
            </motion.div>

            {/* Sandwich Photo Switcher Pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="pt-2 border-t border-[#121F3E]/10"
            >
              <p className="text-[11px] font-semibold text-[#121F3E]/60 uppercase tracking-wider mb-2">
                Featured Signature Sandwiches:
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                {HERO_SANDWICH_PHOTOS.map((item, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveIndex(idx)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-[#121F3E] text-white shadow-sm ring-2 ring-[#121F3E]/20'
                          : 'bg-white/80 hover:bg-white text-[#121F3E]/80 border border-[#121F3E]/15 hover:border-[#121F3E]/30'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
                      <span>{item.vietnameseName.split(' ')[2] ? item.vietnameseName.split('(')[0].trim() : item.name}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Half Picture Faded in the Background */}
          <div className="relative w-full flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[540px] aspect-[4/3] sm:aspect-[16/11]">
              {/* Diffuse Warm Ambient Glow behind photo */}
              <div className="absolute -inset-4 bg-slate-400/15 rounded-3xl blur-2xl pointer-events-none" />

              {/* Faded Photo Container */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-[#121F3E]/15 bg-white/40 group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentItem.id + activeImageSrc}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="relative w-full h-full"
                  >
                    <img
                      src={activeImageSrc}
                      alt={currentItem.name}
                      onError={handleImageError}
                      className="w-full h-full object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Fading Edge Overlays (blends picture seamlessly into background) */}
                {/* Left Edge Fade into the words column */}
                <div className="absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-encaustic-subtle/70 via-encaustic-subtle/20 to-transparent pointer-events-none" />
                {/* Bottom Edge Fade with gradient backdrop for text caption */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#121F3E]/90 via-[#121F3E]/40 to-transparent pointer-events-none" />
                {/* Top Subtle Edge Fade */}
                <div className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-black/25 to-transparent pointer-events-none" />

                {/* Top Control Bar: Expand */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 z-20">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="p-2 rounded-lg bg-black/40 hover:bg-black/60 text-white/90 backdrop-blur-xs transition-colors cursor-pointer border border-white/10"
                    title="View full picture"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Top Left Badge: Authentic Baguette Sandwich */}
                <div className="absolute top-3 left-3 z-20">
                  <div className="px-2.5 py-1 rounded-md bg-white/95 text-[#121F3E] text-[11px] font-bold tracking-wide shadow-xs border border-[#121F3E]/15">
                    Authentic House Specialty
                  </div>
                </div>

                {/* Bottom Caption Pill */}
                <div className="absolute bottom-3 inset-x-3 z-20 flex items-end justify-between gap-3 text-white">
                  <div className="space-y-0.5 max-w-[70%]">
                    <h3 className="font-serif text-base sm:text-lg font-bold text-white tracking-tight drop-shadow-sm leading-snug">
                      {currentItem.name}
                    </h3>
                    <p className="font-serif italic text-xs text-white/80 truncate">
                      {currentItem.vietnameseName}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-serif text-lg sm:text-xl font-bold text-slate-100 drop-shadow-sm">
                      ${currentItem.price.toFixed(2)}
                    </span>

                    {/* Navigation Arrows */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={handlePrev}
                        className="p-1.5 rounded-md bg-white/20 hover:bg-white/30 text-white backdrop-blur-xs transition-colors cursor-pointer"
                        aria-label="Previous sandwich photo"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleNext}
                        className="p-1.5 rounded-md bg-white/20 hover:bg-white/30 text-white backdrop-blur-xs transition-colors cursor-pointer"
                        aria-label="Next sandwich photo"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Dots */}
              <div className="flex items-center justify-center gap-1.5 mt-3">
                {HERO_SANDWICH_PHOTOS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      idx === activeIndex
                        ? 'w-6 bg-[#121F3E]'
                        : 'w-1.5 bg-[#121F3E]/25 hover:bg-[#121F3E]/50'
                    }`}
                    aria-label={`Go to photo ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121F3E]/80 backdrop-blur-xs"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full p-5 shadow-2xl border border-[#121F3E]/20 relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 p-2 rounded-full bg-[#121F3E]/10 hover:bg-[#121F3E]/20 text-[#121F3E] transition-colors cursor-pointer z-10"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-3">
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#121F3E]">
                  {currentItem.name}
                </h3>
                <p className="font-serif italic text-sm text-[#121F3E]/70">
                  {currentItem.vietnameseName}
                </p>
              </div>

              <div className="w-full rounded-xl overflow-hidden border border-[#121F3E]/15 bg-[#121F3E]/5">
                <img
                  src={activeImageSrc}
                  alt={currentItem.name}
                  className="w-full max-h-[460px] object-contain mx-auto"
                  referrerPolicy="no-referrer"
                />
              </div>

              <p className="text-xs text-[#121F3E]/80 leading-relaxed">
                {currentItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

