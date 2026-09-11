import React from 'react';
import { MapPin, Phone, Sparkles } from 'lucide-react';
import { LoBanhMiLogo } from './LoBanhMiLogo';
import { PhotoUploadSlot } from './PhotoUploadSlot';
import { ScrollReveal } from './ScrollReveal';
import { resolveAssetUrl } from '../utils/photoStorage';

interface HeroHeaderProps {
  onOpenMenu?: () => void;
}

export const HeroHeader: React.FC<HeroHeaderProps> = ({ onOpenMenu }) => {
  return (
    <section id="home" className="pt-24 sm:pt-28 pb-4 px-3 sm:px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* The signature navy & warm white rounded container */}
        <div className="relative rounded-[24px] sm:rounded-[32px] bg-white overflow-hidden pt-8 sm:pt-12 md:pt-14 pb-0 border border-[#0b192e]/10 shadow-[0_10px_35px_rgba(11,25,46,0.05)]">
          {/* Authentic Neutral Bakery Doodle Pattern: Bánh Mì, Pâté Sô, Bánh Tiêu, Croissants, Cà Phê, Phin */}
          <div
            className="absolute inset-0 pointer-events-none select-none opacity-[0.14] sm:opacity-[0.16] mix-blend-multiply bg-repeat"
            style={{
              backgroundImage: `url('${resolveAssetUrl('bakery-goods-bg.svg')}')`,
              backgroundSize: '280px 248px',
              backgroundPosition: 'center top',
              maskImage: 'radial-gradient(ellipse 70% 60% at 50% 32%, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,1) 85%)',
              WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 32%, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,1) 85%)',
            }}
            aria-hidden="true"
          />

          {/* Soft central luminous gradient cushion to ensure pristine text readability */}
          <div
            className="absolute inset-0 pointer-events-none select-none bg-[radial-gradient(ellipse_75%_55%_at_50%_32%,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.5)_65%,transparent_100%)]"
            aria-hidden="true"
          />

          {/* Center Banner Content */}
          <ScrollReveal variant="pop" duration={0.65}>
            <div className="relative z-20 max-w-4xl mx-auto px-4 text-center flex flex-col items-center">
              {/* Prominent Authentic Brand Logo Badge */}
              <div className="mb-4 sm:mb-5 transition-transform hover:scale-105 drop-shadow-sm">
                <LoBanhMiLogo size="lg" variant="badge-rounded" />
              </div>

              {/* Main Headline with High Contrast Readability */}
              <h1
                id="hero-main-title"
                className="font-gotu text-3xl sm:text-4xl md:text-5xl lg:text-[56px] leading-[1.15] text-[#0b192e] font-medium tracking-tight mb-4 max-w-3xl drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]"
              >
                Lò Bánh Mì French Bakery
              </h1>

              {/* Bakery Slogan */}
              <p className="text-[#0b192e] text-lg sm:text-xl md:text-2xl max-w-2xl mb-7 italic font-normal tracking-wide drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                Banh with Mi
              </p>

              {/* Simple Bakery Visit Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4">
                {/* Visit Bakery CTA */}
                <a
                  id="hero-visit-bakery-btn"
                  href="#visit"
                  className="main-btn group shadow-lg shadow-[#0b192e]/20 !py-2.5 !px-4 sm:!py-3 sm:!px-6"
                >
                  <MapPin className="w-4 h-4 text-slate-300" />
                  <span className="font-medium text-white text-sm sm:text-base">Visit Our Bakery</span>
                  <img
                    src={resolveAssetUrl('banhmimore/arrow.aea40498.svg')}
                    alt="Arrow"
                    className="arrow-icon w-6 h-6 sm:w-8 sm:h-8 min-w-6 min-h-6 object-contain"
                  />
                </a>

                {/* View Menu CTA */}
                <a
                  id="hero-view-menu-btn"
                  href="#/menu"
                  onClick={(e) => {
                    if (onOpenMenu) {
                      e.preventDefault();
                      onOpenMenu();
                    }
                  }}
                  className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-white hover:bg-slate-100 text-[#0b192e] text-xs sm:text-base font-semibold border border-[#0b192e]/15 shadow-xs transition-all hover:scale-[1.02] flex items-center gap-1.5 sm:gap-2 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500" />
                  <span>Menu</span>
                </a>

                {/* Call Link */}
                <a
                  id="hero-call-btn"
                  href="tel:8172758868"
                  className="main-btn light hover:bg-white transition-all shadow-xs !py-2.5 !px-4 sm:!py-3 sm:!px-6"
                  title="Call Lò Bánh Mì Bakery"
                >
                  <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500" />
                  <span className="font-medium text-[#0b192e] text-sm sm:text-base">(817) 275-8868</span>
                </a>
              </div>

              {/* Quick Location & Schedule Strip */}
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-6 text-xs text-[#0b192e]/70 font-medium">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>6516 New York Ave, Arlington, TX 76018</span>
                </span>
                <span className="hidden sm:inline">•</span>
                <span>⏰ 7:00 AM – 5:00 PM (Closed Thursdays)</span>
                <span className="hidden sm:inline">•</span>
                <span>🚶 Walk-in Counter Service Always Welcome</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Hero Sandwich / Bakery Photo: Permanent Signature Image */}
          <ScrollReveal variant="pop" duration={0.7} delay={0.15}>
            <div className="relative z-20 max-w-4xl mx-auto mt-6 sm:mt-8 mb-4 sm:mb-8 px-2 sm:px-4 w-full">
              <PhotoUploadSlot
                id="hero-banner-main"
                label="Signature Bánh Mì Sandwich"
                sublabel="Signature Bánh Mì Sandwiches"
                aspectRatio="aspect-[4/3] sm:aspect-[16/10] md:aspect-[3/2]"
                objectPosition="object-[center_48%]"
                initialImage="/hero-main.jpg"
                fit="cover"
                className="w-full max-w-full"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
