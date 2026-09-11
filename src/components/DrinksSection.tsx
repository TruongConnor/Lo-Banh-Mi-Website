import React from 'react';
import { COFFEE_ITEMS, COFFEE_ADDONS, DRINKS_ITEMS } from '../data/menuData';
import { CoffeeDripIcon } from './VietnameseIcons';
import { Sparkles, PlusCircle, Check } from 'lucide-react';

export const DrinksSection: React.FC = () => {
  return (
    <section id="drinks" className="py-16 md:py-24 bg-[#F9FBFB] border-b border-[#121F3E]/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121F3E]/5 text-[#121F3E] text-xs font-semibold uppercase tracking-widest">
            <CoffeeDripIcon className="w-4 h-4 text-[#121F3E]" />
            <span>Section 7 • Coffee & Refreshments</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#121F3E] tracking-tight">
            Coffee & Chilled Drinks
          </h2>
          <p className="text-sm sm:text-base text-[#121F3E]/80 font-normal leading-relaxed">
            Slow-dripped Vietnamese dark roast coffee with condensed milk, house-brewed Thai tea, fresh brewed teas, and cold refreshments.
          </p>
        </div>

        {/* 1. Coffee Specialty Cards */}
        <div className="mb-10 space-y-4">
          <h3 className="font-serif text-2xl font-bold text-[#121F3E] border-b-2 border-[#121F3E] pb-2 flex items-center gap-2">
            <CoffeeDripIcon className="w-5 h-5" />
            <span>Vietnamese Slow-Drip Coffee</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {COFFEE_ITEMS.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-5 sm:p-6 border border-[#121F3E]/12 hover:border-[#121F3E]/30 transition-all shadow-2xs hover:shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif text-xl font-bold text-[#121F3E]">
                          {item.name}
                        </h4>
                        {item.popular && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-[#121F3E] text-white">
                            #1 Coffee
                          </span>
                        )}
                      </div>
                      {item.vietnameseName && (
                        <p className="text-xs font-serif italic text-[#121F3E]/60">
                          {item.vietnameseName}
                        </p>
                      )}
                    </div>
                    <span className="font-serif text-2xl font-bold text-[#121F3E]">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#121F3E]/75 leading-relaxed">
                    {item.description}
                  </p>

                  {item.tags && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {item.tags.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded bg-[#F9FBFB] text-[#121F3E]/70 border border-[#121F3E]/10"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Coffee Toppings / Add-ons */}
          <div className="p-4 bg-white rounded-xl border border-[#121F3E]/12 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-[#121F3E]">
            <div className="flex items-center gap-2">
              <PlusCircle className="w-4 h-4 text-[#121F3E]" />
              <span className="font-bold">Coffee Customization & Toppings:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {COFFEE_ADDONS.map((addon, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#121F3E]/5 text-xs font-medium text-[#121F3E]"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{addon.name}</span>
                  <span className="font-bold">+${addon.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Chilled Drinks Grid */}
        <div className="space-y-4">
          <h3 className="font-serif text-2xl font-bold text-[#121F3E] border-b-2 border-[#121F3E] pb-2">
            Teas & Refreshing Drinks
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DRINKS_ITEMS.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-5 border border-[#121F3E]/10 hover:border-[#121F3E]/30 transition-all flex flex-col justify-between shadow-2xs hover:shadow-xs group"
              >
                <div className="space-y-2">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-[#121F3E]">
                      {item.name}
                    </h4>
                    {item.vietnameseName && (
                      <p className="text-xs font-serif italic text-[#121F3E]/60">
                        {item.vietnameseName}
                      </p>
                    )}
                  </div>

                  <p className="text-xs text-[#121F3E]/75 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Price */}
                <div className="pt-3 mt-3 border-t border-[#121F3E]/10 flex items-center justify-between">
                  <span className="font-serif text-xl font-bold text-[#121F3E]">
                    ${item.price.toFixed(2)}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-[#121F3E]/50 font-bold bg-[#F9FBFB] px-2 py-0.5 rounded">
                    Chilled
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
