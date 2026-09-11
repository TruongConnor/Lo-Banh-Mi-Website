import React from 'react';
import { MEATS_VEGGIES_ITEMS } from '../data/menuData';
import { ShoppingBag, Scale, Utensils, PackageCheck } from 'lucide-react';

export const MeatsSection: React.FC = () => {
  return (
    <section id="meats-deli" className="py-16 md:py-24 bg-white border-b border-[#121F3E]/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121F3E]/5 text-[#121F3E] text-xs font-semibold uppercase tracking-widest">
            <Scale className="w-4 h-4 text-[#121F3E]" />
            <span>Section 6 • Deli & Meats By The Pound</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#121F3E] tracking-tight">
            Meats & Veggies By The Pound (To-Go)
          </h2>
          <p className="text-sm sm:text-base text-[#121F3E]/80 font-normal max-w-2xl mx-auto leading-relaxed">
            Take home our signature marinated meats, house liver pâté, traditional chả lụa pork rolls, and crisp pickled carrots by the pound for home cooking, party platters, and family gatherings.
          </p>
        </div>

        {/* Grid of Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {MEATS_VEGGIES_ITEMS.map((item) => (
            <div
              key={item.id}
              className="bg-[#F9FBFB] hover:bg-white rounded-xl p-5 border border-[#121F3E]/10 hover:border-[#121F3E]/30 transition-all shadow-2xs hover:shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#121F3E]">
                      {item.name}
                    </h3>
                    {item.vietnameseName && (
                      <p className="text-xs font-serif italic text-[#121F3E]/60">
                        {item.vietnameseName}
                      </p>
                    )}
                  </div>
                </div>

                <p className="text-xs text-[#121F3E]/75 leading-relaxed pt-1">
                  {item.description}
                </p>
              </div>

              {/* Price & Unit */}
              <div className="pt-4 mt-3 border-t border-[#121F3E]/10 flex items-baseline justify-between">
                <div>
                  <span className="font-serif text-2xl font-bold text-[#121F3E]">
                    ${item.price.toFixed(2)}
                  </span>
                  <span className="text-[11px] text-[#121F3E]/60 uppercase ml-1.5 font-medium">
                    {item.unitText?.replace(`$${item.price.toFixed(2)} `, '') || 'each'}
                  </span>
                </div>
                <span className="text-[10px] uppercase font-bold text-[#121F3E]/50 bg-white px-2 py-0.5 rounded border border-[#121F3E]/10">
                  Counter To-Go
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* To-Go Catering Note */}
        <div className="mt-8 p-5 bg-[#121F3E]/5 rounded-xl border border-[#121F3E]/12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#121F3E]">
          <div className="flex items-center gap-3">
            <PackageCheck className="w-5 h-5 text-[#121F3E] shrink-0" />
            <p>
              <strong>Walk-in Deli Counter:</strong> All meats and pickled vegetables are freshly packaged and weighed to order in food-safe containers.
            </p>
          </div>
          <span className="font-serif italic text-xs text-[#121F3E]/80 shrink-0">
            Great for party catering & home dining
          </span>
        </div>
      </div>
    </section>
  );
};
