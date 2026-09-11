import React, { useState } from 'react';
import {
  CROISSANT_ITEMS,
  SWEET_BREAD_ITEMS,
  BAKERY_GOODS_ITEMS,
} from '../data/menuData';
import { Sparkles, UtensilsCrossed, Cake, Croissant, Cookie } from 'lucide-react';
import { LotusIcon } from './VietnameseIcons';

type TabType = 'all' | 'croissants' | 'sweet-bread' | 'goods';

export const BakerySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('all');

  return (
    <section id="bakery" className="py-16 md:py-24 bg-[#F9FBFB] border-b border-[#121F3E]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121F3E]/5 text-[#121F3E] text-xs font-semibold uppercase tracking-widest">
            <LotusIcon className="w-4 h-4 text-[#121F3E]" />
            <span>Section 5 • The Bakery</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#121F3E] tracking-tight">
            Artisanal Pastries, Croissants & Sweet Breads
          </h2>
          <p className="text-sm sm:text-base text-[#121F3E]/80 font-normal leading-relaxed">
            Baked in small batches every morning using traditional butter lamination and Vietnamese specialty baking techniques. Sold throughout the day at our walk-in counter.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#0B0B26] text-white shadow-xs'
                : 'bg-white text-[#121F3E]/70 hover:text-[#121F3E] border border-[#121F3E]/15'
            }`}
          >
            All Bakery Items
          </button>
          <button
            onClick={() => setActiveTab('croissants')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'croissants'
                ? 'bg-[#0B0B26] text-white shadow-xs'
                : 'bg-white text-[#121F3E]/70 hover:text-[#121F3E] border border-[#121F3E]/15'
            }`}
          >
            <Croissant className="w-4 h-4" />
            <span>Bakery Croissants</span>
          </button>
          <button
            onClick={() => setActiveTab('sweet-bread')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'sweet-bread'
                ? 'bg-[#0B0B26] text-white shadow-xs'
                : 'bg-white text-[#121F3E]/70 hover:text-[#121F3E] border border-[#121F3E]/15'
            }`}
          >
            <Cake className="w-4 h-4" />
            <span>Sweet Breads</span>
          </button>
          <button
            onClick={() => setActiveTab('goods')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'goods'
                ? 'bg-[#0B0B26] text-white shadow-xs'
                : 'bg-white text-[#121F3E]/70 hover:text-[#121F3E] border border-[#121F3E]/15'
            }`}
          >
            <Cookie className="w-4 h-4" />
            <span>Pastries & Specialty Goods</span>
          </button>
        </div>

        {/* 1. Croissants Section */}
        {(activeTab === 'all' || activeTab === 'croissants') && (
          <div className="mb-14 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#121F3E]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#121F3E] text-white flex items-center justify-center">
                  <Croissant className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#121F3E]">
                    Bakery Croissants
                  </h3>
                  <p className="text-xs text-[#121F3E]/70">
                    All-butter laminated puff pastry (savory & sweet)
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#121F3E]/60 bg-[#121F3E]/5 px-2.5 py-1 rounded">
                {CROISSANT_ITEMS.length} Varieties
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CROISSANT_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-5 border border-[#121F3E]/10 hover:border-[#121F3E]/30 transition-all shadow-2xs hover:shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-start gap-2">
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
                      <span className="font-serif text-xl font-bold text-[#121F3E] shrink-0">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>

                    <p className="text-xs text-[#121F3E]/75 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {item.tags && (
                    <div className="flex flex-wrap gap-1 pt-3 mt-2 border-t border-[#121F3E]/5">
                      {item.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] px-2 py-0.5 rounded bg-[#F9FBFB] text-[#121F3E]/70 border border-[#121F3E]/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. Sweet Bread Section */}
        {(activeTab === 'all' || activeTab === 'sweet-bread') && (
          <div className="mb-14 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#121F3E]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#121F3E] text-white flex items-center justify-center">
                  <Cake className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#121F3E]">
                    Sweet Bread Selection
                  </h3>
                  <p className="text-xs text-[#121F3E]/70">
                    Traditional Vietnamese & Bavarian sweet breads (Small / Medium / Large)
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#121F3E]/60 bg-[#121F3E]/5 px-2.5 py-1 rounded">
                {SWEET_BREAD_ITEMS.length} Varieties
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SWEET_BREAD_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-5 border border-[#121F3E]/10 hover:border-[#121F3E]/30 transition-all shadow-2xs hover:shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-2">
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
                      {!item.sizes && (
                        <span className="font-serif text-xl font-bold text-[#121F3E] shrink-0">
                          ${item.price.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-[#121F3E]/75 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Multi-Size Badges */}
                    {item.sizes && (
                      <div className="pt-2 flex flex-wrap items-center gap-1.5">
                        {item.sizes.map((s, sIdx) => (
                          <div
                            key={sIdx}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#121F3E]/5 border border-[#121F3E]/10 text-xs text-[#121F3E]"
                          >
                            <span className="font-medium">{s.name}:</span>
                            <span className="font-bold">${s.price.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {item.tags && (
                    <div className="flex flex-wrap gap-1 pt-3 mt-3 border-t border-[#121F3E]/5">
                      {item.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] px-2 py-0.5 rounded bg-[#F9FBFB] text-[#121F3E]/70 border border-[#121F3E]/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Bakery Goods, Savory Rolls, Turnovers & Desserts */}
        {(activeTab === 'all' || activeTab === 'goods') && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#121F3E]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#121F3E] text-white flex items-center justify-center">
                  <Cookie className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#121F3E]">
                    Bakery Goods, Turnovers & Specialties
                  </h3>
                  <p className="text-xs text-[#121F3E]/70">
                    Pâté Sô, Bánh Bao, Spring Rolls, Turnovers, Bánh Bò & French Cookies
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#121F3E]/60 bg-[#121F3E]/5 px-2.5 py-1 rounded">
                {BAKERY_GOODS_ITEMS.length} Items
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {BAKERY_GOODS_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-5 border border-[#121F3E]/10 hover:border-[#121F3E]/30 transition-all shadow-2xs hover:shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif text-lg font-bold text-[#121F3E]">
                            {item.name}
                          </h4>
                          {item.signature && (
                            <span className="px-2 py-0.2 rounded text-[9px] font-semibold uppercase bg-[#121F3E] text-white">
                              Special
                            </span>
                          )}
                        </div>
                        {item.vietnameseName && (
                          <p className="text-xs font-serif italic text-[#121F3E]/60">
                            {item.vietnameseName}
                          </p>
                        )}
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-serif text-xl font-bold text-[#121F3E] block">
                          ${item.price.toFixed(2)}
                        </span>
                        {item.unitText && (
                          <span className="text-[10px] text-[#121F3E]/60 uppercase tracking-wider block">
                            {item.unitText}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-[#121F3E]/75 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {item.tags && (
                    <div className="flex flex-wrap gap-1 pt-3 mt-2 border-t border-[#121F3E]/5">
                      {item.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] px-2 py-0.5 rounded bg-[#F9FBFB] text-[#121F3E]/70 border border-[#121F3E]/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Counter Display Banner */}
        <div className="mt-14 p-6 rounded-2xl bg-white border border-[#121F3E]/15 text-center space-y-2 max-w-3xl mx-auto shadow-xs">
          <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-bold text-[#121F3E]">
            <Sparkles className="w-3.5 h-3.5" />
            Glass Display Case at Front Counter
          </span>
          <p className="text-xs sm:text-sm text-[#121F3E]/80 max-w-xl mx-auto leading-relaxed">
            All pastries and bakery goods are showcased fresh in our counter glass cases each morning. Pick up individual pieces or assorted party boxes to take home.
          </p>
        </div>
      </div>
    </section>
  );
};
