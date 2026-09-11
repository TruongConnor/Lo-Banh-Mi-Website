import React from 'react';
import { Mail, Phone, MapPin, Clock, ArrowUp } from 'lucide-react';
import { LoBanhMiLogo } from './LoBanhMiLogo';

interface FooterSectionProps {
  onOpenMenu?: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onOpenMenu }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="p-3 sm:p-4 md:p-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* The signature deep navy rounded container */}
        <div className="bg-[#0B192E] text-white rounded-[24px] sm:rounded-[32px] px-6 sm:px-10 lg:px-14 pt-12 sm:pt-16 pb-8 border border-white/10 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 pb-12 border-b border-white/15">
            {/* Column 1: Brand Logo & Mission */}
            <div className="md:col-span-5">
              <a href="#home" className="inline-block mb-4" aria-label="Lò Bánh Mì Home">
                <LoBanhMiLogo size="md" variant="badge-rounded" showTextLockup={true} className="text-white" />
              </a>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-md font-light mb-6">
                Lò Bánh Mì French Bakery brings you fresh deck-oven French baguettes, authentic Vietnamese bánh mì, buttery croissants, sweet breads, and traditional cà phê sữa đá.
              </p>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-white">
                <span className="w-2 h-2 rounded-full bg-slate-300" />
                <span>Baked Fresh Daily • Arlington, TX</span>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="md:col-span-3">
              <h4 className="font-gotu text-lg sm:text-xl text-white font-medium mb-4 tracking-wide">
                Quick Links
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a
                    href="#home"
                    className="text-white/75 hover:text-white transition-colors inline-block py-0.5"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="text-white/75 hover:text-white transition-colors inline-block py-0.5"
                  >
                    About Lò Bánh Mì
                  </a>
                </li>
                <li>
                  <a
                    href="#/menu"
                    onClick={(e) => {
                      if (onOpenMenu) {
                        e.preventDefault();
                        onOpenMenu();
                      }
                    }}
                    className="text-white/75 hover:text-white transition-colors inline-block py-0.5 cursor-pointer"
                  >
                    Menu
                  </a>
                </li>
                <li>
                  <a
                    href="#visit"
                    className="text-white/75 hover:text-white transition-colors inline-block py-0.5"
                  >
                    Visit Bakery & Hours
                  </a>
                </li>
                <li>
                  <a
                    href="#reviews"
                    className="text-white/75 hover:text-white transition-colors inline-block py-0.5"
                  >
                    Google & Yelp Reviews
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact Details */}
            <div className="md:col-span-4">
              <h4 className="font-gotu text-lg sm:text-xl text-white font-medium mb-4 tracking-wide">
                Visit & Order
              </h4>
              <ul className="space-y-3.5 text-sm text-white/80">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-slate-300 shrink-0 mt-1" />
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-white/60">
                      Location
                    </span>
                    <span className="text-white font-medium">6516 New York Ave, Arlington, TX 76018</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-slate-300 shrink-0 mt-1" />
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-white/60">
                      Call In
                    </span>
                    <a href="tel:8172758868" className="hover:text-slate-200 transition-colors text-white font-medium">
                      (817) 275-8868
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-slate-300 shrink-0 mt-1" />
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-white/60">
                      Baking Hours
                    </span>
                    <span>7:00 AM – 5:00 PM • Closed Every Thursday</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
            <p className="text-center sm:text-left">
              © 2025 Lò Bánh Mì French Bakery. All rights reserved.
            </p>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 hover:text-white text-white transition-colors cursor-pointer font-medium"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
