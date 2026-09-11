import React from 'react';
import { BanhTieuVisual } from './ArtisanalVisuals';
import { FEATURED_TREAT } from '../data/menuData';
import { Calendar, Check, Clock, Sparkles } from 'lucide-react';
import { LotusIcon } from './VietnameseIcons';

export const FeaturedTreatSection: React.FC = () => {
  return (
    <section id="featured-treat" className="py-20 md:py-28 bg-[#121F3E] text-white relative overflow-hidden">
      {/* Subtle Porcelain Watermark in Background */}
      <div className="absolute inset-0 porcelain-pattern-band opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual of Hollow Donut */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center order-2 lg:order-1">
            <BanhTieuVisual />
            <span className="text-xs font-serif italic text-white/60 mt-3 text-center block">
              Golden, airy hollow donut fried fresh every morning (Fri, Sat & Sun)
            </span>
          </div>

          {/* Right Column: Narrative & Weekend Availability */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left order-1 lg:order-2">
            {/* Weekend Schedule Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-semibold uppercase tracking-widest border border-white/20">
              <Calendar className="w-3.5 h-3.5 text-white" />
              <span>Available Friday, Saturday & Sunday Only</span>
            </div>

            {/* Heading */}
            <div className="space-y-2">
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
                {FEATURED_TREAT.name}
              </h2>
              <p className="text-sm uppercase tracking-widest text-emerald-300 font-semibold font-serif flex items-center justify-center lg:justify-start gap-2">
                <Clock className="w-4 h-4" />
                <span>Made in the morning • Sold throughout the day</span>
              </p>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-white/85 leading-relaxed font-normal">
              {FEATURED_TREAT.description}
            </p>

            {/* Feature Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-white/90">
              <div className="flex items-center gap-2.5 bg-white/5 p-2.5 rounded-lg border border-white/10">
                <Check className="w-4 h-4 text-white shrink-0" />
                <span>Friday, Saturday & Sunday only</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/5 p-2.5 rounded-lg border border-white/10">
                <Check className="w-4 h-4 text-white shrink-0" />
                <span>Fried fresh each morning</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/5 p-2.5 rounded-lg border border-white/10">
                <Check className="w-4 h-4 text-white shrink-0" />
                <span>Toasted white sesame seed crust</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/5 p-2.5 rounded-lg border border-white/10">
                <Check className="w-4 h-4 text-white shrink-0" />
                <span>Perfect with Vietnamese iced coffee</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/15">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
                    $1.00
                  </span>
                  <span className="text-sm font-medium uppercase tracking-wider text-white/70">
                    / Each (In-Store Bakery)
                  </span>
                </div>
                <p className="text-xs text-white/60 font-serif italic mt-1">
                  Available at the counter while daily morning batch lasts!
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-[#121F3E] text-xs font-bold shadow-md">
                <Calendar className="w-4 h-4 text-[#121F3E]" />
                <span>Fri • Sat • Sun Weekend Special</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
