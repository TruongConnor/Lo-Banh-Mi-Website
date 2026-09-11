import React, { useState } from 'react';
import { Menu as MenuIcon, X, Clock, MapPin, Phone, Compass } from 'lucide-react';
import { OfficialLogo } from './OfficialLogo';
import { BAKERY_INFO } from '../data/menuData';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F9FBFB]/95 backdrop-blur-md border-b border-[#121F3E]/10 transition-all duration-300">
      {/* Top Banner (Address & Daily Hours) */}
      <div className="bg-[#0B0B26] text-[#F9FBFB] text-[11px] sm:text-xs py-1.5 px-4 border-b border-[#0B0B26]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium text-white">
              <MapPin className="w-3.5 h-3.5 text-white/80" />
              <span>{BAKERY_INFO.address}</span>
            </span>
            <span className="hidden md:inline-block text-white/30">•</span>
            <span className="hidden md:flex items-center gap-1.5 text-white/90">
              <Clock className="w-3.5 h-3.5 text-white/80" />
              <span>Open Daily: {BAKERY_INFO.hours} ({BAKERY_INFO.closedDay})</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${BAKERY_INFO.phone}`}
              className="flex items-center gap-1 text-white hover:text-white/80 font-medium transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span>{BAKERY_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-22 flex items-center justify-between">
        {/* Left: Official Logo */}
        <a
          href="#"
          className="group flex items-center gap-2 text-left focus:outline-none py-1"
          id="brand-logo"
        >
          <div className="w-24 sm:w-28 flex items-center justify-center">
            <OfficialLogo variant="dark" size="sm" />
          </div>
          <div className="hidden sm:block pl-2 border-l border-[#121F3E]/15">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#121F3E]/60 font-bold">
              ARLINGTON, TX
            </p>
            <p className="text-[11px] text-[#121F3E]/80 font-medium">
              Morning Bakes
            </p>
          </div>
        </a>

        {/* Center Navigation Links */}
        <nav className="hidden xl:flex items-center gap-7 text-sm font-medium">
          <button
            onClick={() => scrollToSection('oven')}
            className="text-[#121F3E]/80 hover:text-[#121F3E] transition-colors cursor-pointer py-1"
          >
            Plain Bread
          </button>

          <button
            onClick={() => scrollToSection('sandwiches')}
            className="text-[#121F3E]/80 hover:text-[#121F3E] transition-colors cursor-pointer py-1 font-semibold"
          >
            Sandwiches
          </button>

          <button
            onClick={() => scrollToSection('featured-treat')}
            className="text-[#121F3E]/80 hover:text-[#121F3E] transition-colors cursor-pointer py-1"
          >
            Bánh Tiêu
          </button>

          <button
            onClick={() => scrollToSection('bakery')}
            className="text-[#121F3E]/80 hover:text-[#121F3E] transition-colors cursor-pointer py-1"
          >
            The Bakery
          </button>

          <button
            onClick={() => scrollToSection('meats-deli')}
            className="text-[#121F3E]/80 hover:text-[#121F3E] transition-colors cursor-pointer py-1"
          >
            Meats By The Pound
          </button>

          <button
            onClick={() => scrollToSection('drinks')}
            className="text-[#121F3E]/80 hover:text-[#121F3E] transition-colors cursor-pointer py-1"
          >
            Coffee & Drinks
          </button>

          <button
            onClick={() => scrollToSection('visit')}
            className="text-[#121F3E]/80 hover:text-[#121F3E] transition-colors cursor-pointer py-1"
          >
            Location & Hours
          </button>
        </nav>

        {/* Right CTA: [VISIT BAKERY] */}
        <div className="flex items-center gap-3">
          <button
            id="header-visit-btn"
            onClick={() => scrollToSection('visit')}
            className="hidden sm:inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-[#0B0B26] text-[#F9FBFB] font-semibold text-sm tracking-wide shadow-sm hover:bg-[#18184a] transition-all cursor-pointer border border-[#0B0B26]"
          >
            <Compass className="w-4 h-4 text-white" />
            <span>VISIT BAKERY</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2.5 rounded-md text-[#121F3E] hover:bg-[#121F3E]/5 cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#F9FBFB] border-b border-[#121F3E]/10 px-4 pt-2 pb-6 shadow-xl">
          <div className="flex flex-col gap-2 text-base">
            <button
              onClick={() => scrollToSection('oven')}
              className="text-left py-2 px-3 rounded hover:bg-[#121F3E]/5 text-[#121F3E] font-medium"
            >
              Plain Bread ($1 for 4 / $1 for 2 / $1.75)
            </button>
            <button
              onClick={() => scrollToSection('sandwiches')}
              className="text-left py-2 px-3 rounded hover:bg-[#121F3E]/5 text-[#121F3E] font-medium"
            >
              Sandwich Selection (Bánh Mì)
            </button>
            <button
              onClick={() => scrollToSection('featured-treat')}
              className="text-left py-2 px-3 rounded hover:bg-[#121F3E]/5 text-[#121F3E] font-medium"
            >
              Bánh Tiêu (Fri, Sat & Sun)
            </button>
            <button
              onClick={() => scrollToSection('bakery')}
              className="text-left py-2 px-3 rounded hover:bg-[#121F3E]/5 text-[#121F3E] font-medium"
            >
              The Bakery (Croissants, Sweet Breads & Pastries)
            </button>
            <button
              onClick={() => scrollToSection('meats-deli')}
              className="text-left py-2 px-3 rounded hover:bg-[#121F3E]/5 text-[#121F3E] font-medium"
            >
              Meats & Veggies By The Pound
            </button>
            <button
              onClick={() => scrollToSection('drinks')}
              className="text-left py-2 px-3 rounded hover:bg-[#121F3E]/5 text-[#121F3E] font-medium"
            >
              Coffee & Beverages
            </button>
            <button
              onClick={() => scrollToSection('visit')}
              className="text-left py-2 px-3 rounded hover:bg-[#121F3E]/5 text-[#121F3E] font-medium"
            >
              Location & Hours (Arlington, TX)
            </button>
            <div className="pt-3 border-t border-[#121F3E]/10">
              <button
                onClick={() => scrollToSection('visit')}
                className="w-full py-3 rounded-md bg-[#0B0B26] text-[#F9FBFB] font-semibold text-center flex items-center justify-center gap-2 shadow-sm"
              >
                <MapPin className="w-4 h-4 text-white" />
                <span>VISIT OUR BAKERY</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
