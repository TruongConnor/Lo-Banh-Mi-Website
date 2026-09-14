import React from 'react';
import { Sparkles, UtensilsCrossed, Clock, HeartHandshake } from 'lucide-react';
import { PhotoUploadSlot } from './PhotoUploadSlot';
import { ScrollReveal } from './ScrollReveal';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="pt-14 pb-8 sm:pt-20 sm:pb-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Bakery Photo */}
          <div className="lg:col-span-5 w-full max-w-full">
            <ScrollReveal variant="pop" duration={0.65}>
              <PhotoUploadSlot
                id="about-story-photo"
                label="Our Bakery"
                sublabel="Traditional Stone Deck Ovens"
                aspectRatio="aspect-[4/3] sm:aspect-square"
                initialImage="/about-story.jpg"
                fit="cover"
                className="w-full max-w-full"
              />
            </ScrollReveal>
          </div>

          {/* Right Column: Copy */}
          <div className="lg:col-span-7 lg:pl-6">
            <ScrollReveal variant="fade-up" duration={0.6} delay={0.1}>
              {/* Sub-head */}
              <div className="sub-head mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                <span className="text-[#0b192e] font-semibold">About Lò Bánh Mì French Bakery</span>
              </div>

              {/* Section Head */}
              <h2
                id="about-headline"
                className="sec-head font-gotu text-3xl sm:text-4xl lg:text-5xl text-[#0b192e] mb-6 font-normal tracking-tight"
              >
                A Taste of Vietnamese Culture
              </h2>

              {/* Paragraphs */}
              <div className="space-y-4 text-base sm:text-lg text-[#0b192e]/80 leading-relaxed font-normal">
                <p>
                  At <strong className="text-[#0b192e] font-semibold">Lò Bánh Mì French Bakery</strong>, our hearths fire early every morning to bring you the true essence of French-Vietnamese baking. From crackling golden baguettes, sweet breads, and butter croissants to hearty sandwiches, every single item is made fresh from authentic family recipes.
                </p>
                <p>
                  Whether you stop by for our signature BBQ Pork Meatball Bánh Mì, warm Pâté Sô puff pastries, whole Bánh Bò honeycomb cakes, or slow-dripped Cà Phê Sữa Đá, you’ll find unbeatable quality, honest prices, and genuine warmth.
                </p>
              </div>
            </ScrollReveal>

            {/* 4 Value Pillars with Staggered Pop Up */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-[#0b192e]/15">
              {[
                { icon: Sparkles, title: 'Crispy Crust', desc: 'Airy, feather crumb' },
                { icon: UtensilsCrossed, title: 'Secret Pâté', desc: 'House liver spread' },
                { icon: Clock, title: 'Baked Daily', desc: 'Deck oven batches' },
                { icon: HeartHandshake, title: '100% Heart', desc: 'Vietnamese hospitality' },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <ScrollReveal
                    key={item.title}
                    variant="pop"
                    delay={0.15 + index * 0.08}
                    duration={0.5}
                  >
                    <div className="p-3.5 rounded-2xl bg-white border border-[#0b192e]/10 text-center transition-all hover:border-slate-400 hover:shadow-xs">
                      <Icon className="w-5 h-5 text-slate-600 mx-auto mb-1.5" />
                      <p className="font-semibold text-sm text-[#0b192e]">{item.title}</p>
                      <p className="text-xs text-[#0b192e]/70">{item.desc}</p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
