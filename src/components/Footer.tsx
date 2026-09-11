import React from 'react';
import { MapPin, Clock, Phone, Navigation, ArrowUpRight, Facebook, Instagram } from 'lucide-react';
import { OfficialLogo } from './OfficialLogo';
import { BAKERY_INFO } from '../data/menuData';

export const Footer: React.FC = () => {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('6516 New York Ave, Arlington, TX 76018')}`;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="visit" className="bg-[#0B0B26] text-white pt-16 pb-12 border-t-4 border-[#0B0B26] relative overflow-hidden">
      {/* Subtle Dot Grid Texture matching the logo background */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/15">
          {/* Column 1: Official Logo & Brand & Socials */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex flex-col items-start gap-3">
              <div className="w-48 sm:w-56">
                <OfficialLogo variant="light" size="md" />
              </div>
            </div>

            <p className="text-sm text-white/80 leading-relaxed max-w-sm">
              Artisanal French baguettes and authentic Vietnamese sandwiches baked with passion in Arlington, Texas. Proudly serving our local community with hot oven bakes daily.
            </p>

            {/* Quick Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-white text-[#0B0B26] text-xs font-bold shadow-md hover:bg-[#F9FBFB] transition-all"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions (Google Maps)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href={`tel:${BAKERY_INFO.phone}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-all border border-white/20"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Bakery</span>
              </a>
            </div>

            {/* Social Media Channels */}
            <div className="pt-4 space-y-2">
              <span className="text-xs uppercase tracking-widest font-semibold text-white/70 block">
                Connect With Us:
              </span>
              <div className="flex flex-wrap items-center gap-2.5">
                {BAKERY_INFO.socials?.facebook && (
                  <a
                    href={BAKERY_INFO.socials.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-[#1877F2] text-white text-xs font-medium border border-white/15 transition-all duration-200 shadow-2xs group"
                    aria-label="Visit our Facebook page"
                  >
                    <Facebook className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                    <span>Facebook</span>
                    <ArrowUpRight className="w-3 h-3 text-white/60 group-hover:text-white" />
                  </a>
                )}

                {BAKERY_INFO.socials?.instagram && (
                  <a
                    href={BAKERY_INFO.socials.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-gradient-to-r hover:from-[#833ab4] hover:via-[#fd1d1d] hover:to-[#fcb045] text-white text-xs font-medium border border-white/15 transition-all duration-200 shadow-2xs group"
                    aria-label="Visit our Instagram page"
                  >
                    <Instagram className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                    <span>Instagram</span>
                    <ArrowUpRight className="w-3 h-3 text-white/60 group-hover:text-white" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Column 2: Location & Walk-In Information */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-serif text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-white/80" />
              <span>Bakery Location</span>
            </h4>

            <div className="space-y-2 text-sm text-white/85">
              <p className="font-semibold text-white text-base">
                6516 New York Ave
              </p>
              <p>Arlington, TX 76018</p>
              <p className="text-xs text-white/60">
                (Convenient parking directly in front of the bakery)
              </p>
            </div>

            <div className="pt-2 text-xs text-white/80 bg-white/5 p-3 rounded-lg border border-white/10 space-y-1">
              <span className="font-bold text-white block uppercase tracking-wider">
                Walk-In Bakery Only:
              </span>
              <p>
                No online ordering needed! Walk in to pick up hot fresh baguettes, customized sandwiches, warm sesame hollow donuts, and chilled iced coffee right at the counter.
              </p>
            </div>
          </div>

          {/* Column 3: Hours & Schedule */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-serif text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-white/80" />
              <span>Hours of Operation</span>
            </h4>

            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between items-center py-1 border-b border-white/10">
                <span className="text-white/80">Friday — Wednesday</span>
                <span className="font-bold text-white">{BAKERY_INFO.hours}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/10">
                <span className="text-rose-300 font-medium">Thursday</span>
                <span className="font-bold text-rose-300">CLOSED</span>
              </div>
            </div>

            <div className="pt-1">
              <p className="text-xs text-white/70 italic font-serif">
                *First hot batch of baguettes out of the stone oven every morning at 7:00 AM.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div>
            <span>
              © {new Date().getFullYear()} {BAKERY_INFO.name} French Bakery. All rights reserved.
            </span>
          </div>

          {/* Social icons in bottom bar */}
          <div className="flex items-center gap-4">
            {BAKERY_INFO.socials?.facebook && (
              <a
                href={BAKERY_INFO.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="text-white/70 hover:text-white transition-colors flex items-center gap-1"
                aria-label="Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
                <span>Facebook</span>
              </a>
            )}
            {BAKERY_INFO.socials?.instagram && (
              <a
                href={BAKERY_INFO.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="text-white/70 hover:text-white transition-colors flex items-center gap-1"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Instagram</span>
              </a>
            )}
          </div>

          <button
            onClick={scrollToTop}
            className="hover:text-white transition-colors cursor-pointer text-xs flex items-center gap-1.5"
          >
            <span>Back to top</span>
            <span>↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
