import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Menu as MenuIcon, X } from 'lucide-react';
import { LoBanhMiLogo } from './LoBanhMiLogo';

interface NavbarProps {
  onOpenMenu?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenMenu }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', shortName: 'Home', vnName: 'Trang Chủ', href: '#home', id: 'home' },
    { name: 'About', shortName: 'About', vnName: 'Về Tiệm', href: '#about', id: 'about' },
    { name: 'Menu', shortName: 'Menu', vnName: 'Thực Đơn', href: '#menu', id: 'menu' },
    { name: 'Visit Bakery', shortName: 'Visit', vnName: 'Ghé Tiệm', href: '#visit', id: 'visit' },
    { name: 'Reviews', shortName: 'Reviews', vnName: 'Đánh Giá', href: '#reviews', id: 'reviews' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 80);

      // If scrolled near the bottom of the page, highlight reviews
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 70) {
        setActiveSection('reviews');
        return;
      }

      // Determine active section using focal line below the sticky navbar
      const sections = [
        { id: 'home', el: document.getElementById('home') },
        { id: 'about', el: document.getElementById('about') },
        { id: 'menu', el: document.getElementById('menu') || document.getElementById('menu-preview') },
        { id: 'visit', el: document.getElementById('visit') },
        { id: 'reviews', el: document.getElementById('reviews') },
      ];

      const focalY = 160;
      let matched = false;

      for (const section of sections) {
        if (section.el) {
          const rect = section.el.getBoundingClientRect();
          if (rect.top <= focalY && rect.bottom > focalY) {
            setActiveSection(section.id);
            matched = true;
            break;
          }
        }
      }

      if (!matched && window.scrollY < 120) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        id="top-navbar"
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isSticky
            ? 'py-2 bg-white/95 backdrop-blur-md shadow-sm border-b border-[#0b192e]/10'
            : 'py-3.5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="bg-white/95 backdrop-blur-md border border-[#0b192e]/10 rounded-full px-2.5 sm:px-5 lg:px-6 py-1.5 sm:py-2 flex items-center justify-between gap-1.5 sm:gap-4 shadow-[0_4px_25px_rgba(11,25,46,0.06)]">
            {/* Left: Mobile Menu & Brand Logo */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Mobile Hamburger Button */}
              <button
                id="mobile-menu-toggle-btn"
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-1 rounded-full text-[#0b192e] hover:bg-[#0b192e]/5 transition-colors cursor-pointer"
                aria-label="Open Navigation Menu"
              >
                <MenuIcon className="w-5 h-5 text-[#0b192e]" />
              </button>

              {/* Brand Logo - shows logo badge on mobile, full text on sm+ */}
              <a
                id="nav-brand-logo"
                href="#home"
                className="flex items-center gap-2 group transition-transform hover:scale-[1.02] shrink-0"
                aria-label="Lò Bánh Mì French Bakery - Home"
              >
                <LoBanhMiLogo
                  size="sm"
                  variant="badge-rounded"
                  showTextLockup={true}
                  textLockupClassName="hidden sm:flex"
                />
              </a>
            </div>

            {/* Middle: Desktop Nav Pill Tabs */}
            <nav className="hidden lg:flex items-center gap-1 bg-[#0b192e]/5 p-1 rounded-full border border-[#0b192e]/10 shrink-0">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    id={`nav-link-${link.id}`}
                    href={link.href}
                    onClick={(e) => {
                      if (link.href.startsWith('#')) {
                        const targetId = link.href.slice(1);
                        const targetEl = document.getElementById(targetId) || (targetId === 'menu' ? document.getElementById('menu-preview') : null);
                        if (targetEl) {
                          e.preventDefault();
                          targetEl.scrollIntoView({ behavior: 'smooth' });
                          setActiveSection(link.id);
                        }
                      }
                    }}
                    className={`px-3 xl:px-4 py-1.5 rounded-full text-xs xl:text-sm font-medium whitespace-nowrap shrink-0 transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-[#0b192e] text-white font-semibold shadow-xs'
                        : 'text-[#0b192e]/75 hover:text-[#0b192e] hover:bg-white/80'
                    }`}
                  >
                    <span className="hidden xl:inline">{link.name}</span>
                    <span className="xl:hidden">{link.shortName || link.name}</span>
                  </a>
                );
              })}
            </nav>

            {/* Right: Quick Bakery Actions - Always fits Phone and Visit Bakery on Mobile & Desktop */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0 ml-auto lg:ml-0">
              {/* Phone Call Link */}
              <a
                href="tel:8172758868"
                className="inline-flex items-center gap-1 sm:gap-1.5 text-xs font-semibold px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full text-[#0b192e] bg-[#0b192e]/5 hover:bg-white border border-[#0b192e]/10 transition-all whitespace-nowrap shrink-0 shadow-2xs active:scale-95"
                title="Call Lò Bánh Mì Bakery"
              >
                <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-600" />
                <span>(817) 275-8868</span>
              </a>

              {/* Visit Bakery CTA */}
              <a
                id="nav-visit-btn"
                href="#visit"
                className="inline-flex items-center gap-1 sm:gap-1.5 xl:gap-2 bg-[#0b192e] text-white px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs xl:text-sm font-semibold hover:bg-slate-800 transition-all duration-200 shadow-sm group whitespace-nowrap shrink-0 active:scale-95"
              >
                <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-300 group-hover:scale-110 transition-transform" />
                <span>Visit Bakery</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Drawer */}
      <div
        id="mobile-nav-drawer"
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-[#0b192e]/80 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Modal Container */}
        <div
          className={`absolute top-4 left-4 right-4 bottom-4 bg-[#0b192e] rounded-3xl p-6 flex flex-col justify-between text-white transition-all duration-300 shadow-2xl ${
            mobileMenuOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
          }`}
        >
          {/* Top Bar inside Drawer */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <LoBanhMiLogo size="sm" variant="badge-rounded" showTextLockup={true} className="text-white" />
            </div>
            <button
              id="mobile-menu-close-btn"
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close Navigation Menu"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center justify-center gap-5 my-auto">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (link.href.startsWith('#')) {
                    const targetId = link.href.slice(1);
                    const targetEl = document.getElementById(targetId) || (targetId === 'menu' ? document.getElementById('menu-preview') : null);
                    if (targetEl) {
                      e.preventDefault();
                      targetEl.scrollIntoView({ behavior: 'smooth' });
                      setActiveSection(link.id);
                    }
                  }
                }}
                className="text-xl sm:text-2xl font-gotu text-white hover:text-slate-300 transition-colors tracking-wide py-1 text-center cursor-pointer"
              >
                <div>{link.name}</div>
                <span className="text-xs text-white/50 font-sans tracking-normal">{link.vnName}</span>
              </a>
            ))}
          </div>

          {/* Bottom Drawer Visit Actions */}
          <div className="border-t border-white/10 pt-4 flex flex-col gap-3 text-center">
            <a
              href="#visit"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 bg-white hover:bg-slate-100 text-[#0b192e] font-semibold rounded-full flex items-center justify-center gap-2 transition-colors text-sm"
            >
              <MapPin className="w-4 h-4 text-slate-600" />
              <span>Visit Us: 6516 New York Ave, Arlington</span>
            </a>
            <a
              href="tel:8172758868"
              className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-full flex items-center justify-center gap-2 transition-colors text-sm"
            >
              <Phone className="w-4 h-4 text-slate-300" />
              <span>Call: (817) 275-8868</span>
            </a>
            <p className="text-[11px] text-white/50">
              Open Daily 7:00 AM – 5:00 PM • Closed Thursdays
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
