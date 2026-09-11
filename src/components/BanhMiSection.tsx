import React, { useState } from 'react';
import { BANH_MI_ITEMS, SANDWICH_ADDONS } from '../data/menuData';
import { MenuItem } from '../types';
import { PlusCircle, Check, X, Maximize2 } from 'lucide-react';
import { ConicalHatIcon } from './VietnameseIcons';
import { resolveAssetUrl } from '../utils/photoStorage';

const SandwichCardImage: React.FC<{ item: MenuItem; onOpenModal: (src: string, name: string, vietnameseName?: string) => void }> = ({ item, onOpenModal }) => {
  const [srcIndex, setSrcIndex] = useState(0);
  const [failed, setFailed] = useState(false);

  const sources = [item.image, ...(item.altImages || [])].filter(Boolean) as string[];
  const currentSrc = sources[srcIndex];

  if (failed || !currentSrc) return null;

  return (
    <div
      onClick={() => onOpenModal(currentSrc, item.name, item.vietnameseName)}
      className="relative shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden border border-[#121F3E]/15 bg-[#121F3E]/5 cursor-pointer group/img"
      title="Click to view full picture"
    >
      <img
        src={resolveAssetUrl(currentSrc)}
        alt={item.name}
        onError={() => {
          if (srcIndex + 1 < sources.length) {
            setSrcIndex(srcIndex + 1);
          } else {
            setFailed(true);
          }
        }}
        className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-[#121F3E]/0 group-hover/img:bg-[#121F3E]/20 transition-colors flex items-center justify-center">
        <Maximize2 className="w-4 h-4 text-white opacity-0 group-hover/img:opacity-100 drop-shadow-sm transition-opacity" />
      </div>
    </div>
  );
};

export const BanhMiSection: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<{ src: string; name: string; vietnameseName?: string } | null>(null);

  return (
    <section id="sandwiches" className="py-16 md:py-24 bg-white border-b border-[#121F3E]/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121F3E]/5 text-[#121F3E] text-xs font-semibold uppercase tracking-widest">
            <ConicalHatIcon className="w-4 h-4 text-[#121F3E]" />
            <span>Section 3 • Signature Sandwiches</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#121F3E] tracking-tight">
            Artisanal Baguette Sandwiches (Bánh Mì)
          </h2>
          <p className="text-sm sm:text-base text-[#121F3E]/80 font-normal max-w-2xl mx-auto leading-relaxed">
            Every sandwich is crafted to order on our morning-baked crusty baguettes with savory liver pâté, creamy mayonnaise, pickled carrots & daikon, crisp cucumber, cilantro, and jalapeños.
          </p>
        </div>

        {/* All Sandwich Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {BANH_MI_ITEMS.map((item, index) => {
            const hasPhoto = Boolean(item.image || (item.altImages && item.altImages.length > 0));

            return (
              <div
                key={item.id}
                className="group bg-[#F9FBFB] hover:bg-white rounded-xl p-5 border border-[#121F3E]/10 hover:border-[#121F3E]/30 transition-all shadow-2xs hover:shadow-sm relative overflow-hidden flex flex-col justify-between"
              >
                {/* Thin Navy Vertical Line on Left Accent */}
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#121F3E]/25 group-hover:bg-[#121F3E] transition-colors" />

                <div className="pl-3 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-0.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[#121F3E]/40">
                          #{index + 1}
                        </span>
                        <h3 className="font-serif text-lg sm:text-xl font-bold text-[#121F3E] tracking-tight">
                          {item.name}
                        </h3>
                        {item.signature && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-[#121F3E] text-white">
                            Special
                          </span>
                        )}
                        {item.popular && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-[#121F3E]/10 text-[#121F3E] border border-[#121F3E]/20">
                            Popular
                          </span>
                        )}
                      </div>
                      {item.vietnameseName && (
                        <p className="text-xs font-serif italic text-[#121F3E]/70">
                          {item.vietnameseName}
                        </p>
                      )}
                    </div>

                    {/* Price */}
                    <div className="text-right shrink-0">
                      <span className="font-serif text-xl sm:text-2xl font-bold text-[#121F3E] block">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Body: Picture + Description */}
                  <div className="flex gap-3.5 items-start">
                    {hasPhoto && (
                      <SandwichCardImage
                        item={item}
                        onOpenModal={(src, name, vietnameseName) => setActivePhoto({ src, name, vietnameseName })}
                      />
                    )}

                    <div className="flex-1 space-y-2">
                      <p className="text-xs text-[#121F3E]/80 leading-relaxed font-normal">
                        {item.description}
                      </p>

                      {/* Ingredient Tags */}
                      {item.ingredients && (
                        <div className="flex flex-wrap gap-1 pt-0.5">
                          {item.ingredients.map((ing, i) => (
                            <span
                              key={i}
                              className="text-[10px] px-2 py-0.5 rounded bg-white text-[#121F3E]/80 border border-[#121F3E]/10"
                            >
                              {ing}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add-ons & Customization Card */}
        <div className="mt-8 p-6 bg-[#F9FBFB] rounded-2xl border-2 border-[#121F3E]/15 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[#121F3E]">
                <PlusCircle className="w-5 h-5" />
                <h4 className="font-serif text-lg font-bold">
                  Sandwich Add-ons & Customization
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-[#121F3E]/75">
                Customize your sandwich at the counter to your taste.
              </p>
            </div>

            {/* Add-on Chips */}
            <div className="flex flex-wrap items-center gap-3">
              {SANDWICH_ADDONS.map((addon, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#121F3E]/15 shadow-2xs text-xs sm:text-sm text-[#121F3E] font-medium"
                >
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>{addon.name}</span>
                  <span className="font-bold text-[#121F3E] bg-[#121F3E]/10 px-2 py-0.5 rounded">
                    +${addon.price.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Full Photo Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121F3E]/80 backdrop-blur-xs"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-5 shadow-2xl border border-[#121F3E]/20 relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-3 right-3 p-2 rounded-full bg-[#121F3E]/10 hover:bg-[#121F3E]/20 text-[#121F3E] transition-colors cursor-pointer z-10"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-3">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#121F3E]">
                  {activePhoto.name}
                </h3>
                {activePhoto.vietnameseName && (
                  <p className="font-serif italic text-xs text-[#121F3E]/70">
                    {activePhoto.vietnameseName}
                  </p>
                )}
              </div>

              <div className="w-full rounded-xl overflow-hidden border border-[#121F3E]/15 bg-[#121F3E]/5">
                <img
                  src={resolveAssetUrl(activePhoto.src)}
                  alt={activePhoto.name}
                  className="w-full max-h-[400px] object-contain mx-auto"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};


