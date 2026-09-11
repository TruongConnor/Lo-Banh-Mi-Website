import React from 'react';
import { RattanBasketVisual } from './ArtisanalVisuals';
import { OVEN_ITEMS } from '../data/menuData';
import { Sparkles, Check, Clock } from 'lucide-react';
import { BaguetteIcon } from './VietnameseIcons';

export const OvenSection: React.FC = () => {
  return (
    <section id="oven" className="py-16 md:py-24 bg-[#F9FBFB] border-b border-[#121F3E]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121F3E]/5 text-[#121F3E] text-xs font-semibold uppercase tracking-widest">
            <BaguetteIcon className="w-4 h-4 text-[#121F3E]" />
            <span>Section 2 • From The Oven</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#121F3E] tracking-tight">
            Plain Bread
          </h2>
          <p className="text-sm sm:text-base text-[#121F3E]/80 font-normal leading-relaxed">
            Baked fresh every morning starting at 7:00 AM and sold throughout the day. Featherweight, crackling crust with a light, airy crumb. Sold by the bundle for home meals, dipping, or breakfast.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Visual */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <RattanBasketVisual />
            <div className="mt-3 text-center space-y-1">
              <span className="inline-flex items-center gap-1.5 text-xs text-[#121F3E] font-medium bg-[#121F3E]/5 px-3 py-1 rounded-full">
                <Clock className="w-3.5 h-3.5 text-[#121F3E]" />
                Morning bake • Sold throughout the day
              </span>
            </div>
          </div>

          {/* Right Column: Pricing & Bundle Cards */}
          <div className="lg:col-span-7 space-y-4">
            {OVEN_ITEMS.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-xl p-5 sm:p-6 border border-[#121F3E]/12 shadow-xs hover:shadow-md hover:border-[#121F3E]/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#121F3E] tracking-tight">
                      {item.name}
                    </h3>
                    {item.vietnameseName && (
                      <span className="text-xs text-[#121F3E]/60 italic font-serif">
                        ({item.vietnameseName})
                      </span>
                    )}
                    {item.popular && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-[#121F3E] text-white">
                        Best Value
                      </span>
                    )}
                    {item.signature && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-[#121F3E]/10 text-[#121F3E]">
                        Artisanal Loaf
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-[#121F3E]/75 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-[#121F3E]/60 pt-1">
                    <span className="flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      Baked fresh every morning
                    </span>
                    <span className="flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      Available at walk-in counter
                    </span>
                  </div>
                </div>

                {/* Price Display */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 border-[#121F3E]/10 pt-3 sm:pt-0 sm:pl-4">
                  <div className="text-left sm:text-right">
                    <span className="font-serif text-2xl sm:text-3xl font-bold text-[#121F3E] tracking-tight block">
                      {item.unitText}
                    </span>
                    <span className="text-[11px] text-[#121F3E]/60 uppercase tracking-wider font-medium">
                      In-Store Bakery Price
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* In-Store Baking Note Banner */}
            <div className="bg-[#121F3E] text-white p-4 rounded-xl flex items-center gap-3.5 text-xs sm:text-sm">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <p className="leading-snug text-white/90">
                <strong className="text-white">Walk-in counter pickup:</strong> Fresh morning batches packaged for take-home throughout the day while daily supplies last.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
