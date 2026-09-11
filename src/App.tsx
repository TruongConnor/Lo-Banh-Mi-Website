import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroHeader } from './components/HeroHeader';
import { AboutSection } from './components/AboutSection';
import { MenuPreviewSection } from './components/MenuPreviewSection';
import { FullScreenMenu } from './components/FullScreenMenu';
import { BakeryVisitSection } from './components/BakeryVisitSection';
import { ReviewsBannerSection } from './components/ReviewsBannerSection';
import { FooterSection } from './components/FooterSection';
import { CategoryName } from './data/banhMiMoreData';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'menu'>('home');
  const [selectedCategory, setSelectedCategory] = useState<CategoryName>('Sandwiches');

  // Sync hash routing so browser Back/Forward works seamlessly
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#menu' || hash === '#/menu') {
        setCurrentView('menu');
      } else if (hash.startsWith('#/menu/')) {
        const cat = decodeURIComponent(hash.replace('#/menu/', '')) as CategoryName;
        setSelectedCategory(cat);
        setCurrentView('menu');
      } else {
        setCurrentView('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const openMenu = (category?: CategoryName) => {
    if (category) {
      setSelectedCategory(category);
    }
    setCurrentView('menu');
    window.location.hash = '#/menu';
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const closeMenu = () => {
    setCurrentView('home');
    window.location.hash = '#home';
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Dedicated Menu View
  if (currentView === 'menu') {
    return (
      <div className="min-h-screen flex flex-col bg-white text-[#0b192e] font-sans antialiased selection:bg-slate-700 selection:text-white overflow-x-hidden">
        <FullScreenMenu onBackToHome={closeMenu} initialCategory={selectedCategory} />
        <FooterSection onOpenMenu={() => openMenu()} />
      </div>
    );
  }

  // Homepage View with Picture Menu Preview
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0b192e] font-sans antialiased selection:bg-slate-700 selection:text-white overflow-x-hidden">
      {/* Floating Header Navigation */}
      <Navbar onOpenMenu={() => openMenu()} />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section (#home) */}
        <HeroHeader onOpenMenu={() => openMenu()} />

        {/* About Section (#about) */}
        <AboutSection />

        {/* Menu Visual Picture Preview Section (#menu-preview) */}
        <MenuPreviewSection onOpenMenu={openMenu} />

        {/* Visit Bakery & Hours Section (#visit) */}
        <BakeryVisitSection onOpenMenu={() => openMenu()} />

        {/* Customer Reviews Section (#reviews) */}
        <ReviewsBannerSection />
      </main>

      {/* Footer */}
      <FooterSection onOpenMenu={() => openMenu()} />
    </div>
  );
}
