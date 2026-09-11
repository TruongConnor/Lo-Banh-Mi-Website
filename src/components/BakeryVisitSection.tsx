import React from 'react';
import { MapPin, Clock, Phone, Navigation, CheckCircle, Car } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface BakeryVisitSectionProps {
  onOpenMenu?: () => void;
}

export const BakeryVisitSection: React.FC<BakeryVisitSectionProps> = ({ onOpenMenu }) => {
  const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=6516+New+York+Ave+Arlington+TX+76018';

  return (
    <section id="visit" className="py-16 sm:py-24 bg-white relative overflow-hidden border-t border-[#0b192e]/10">
      {/* Decorative Warm Ambient Circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-slate-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal variant="fade-up" duration={0.6}>
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="font-gotu text-3xl sm:text-4xl lg:text-5xl text-[#0b192e] font-normal tracking-tight mb-4">
              Visit Our Cozy Arlington Bakery
            </h2>
            
            <p className="text-sm sm:text-base md:text-lg text-[#0b192e]/75 leading-relaxed font-normal">
              There is nothing quite like walking through our doors in the morning: hearing the crackle of freshly baked deck-oven French baguettes, smelling rich Vietnamese coffee, and picking up your favorite warm bánh mì right at the counter.
            </p>
          </div>
        </ScrollReveal>

        {/* 3 Main Cozy Visit Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {/* Card 1: Location & Directions */}
          <ScrollReveal variant="pop" delay={0.05} duration={0.55} className="h-full">
            <div className="h-full bg-white rounded-3xl p-6 sm:p-8 border border-[#0b192e]/10 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="absolute top-0 right-0 w-24 h-24 bg-slate-300/20 rounded-bl-full pointer-events-none" />
              
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#0b192e]/5 text-slate-700 flex items-center justify-center mb-5">
                  <MapPin className="w-6 h-6" />
                </div>
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-600 block mb-1">
                  Store Location • Địa Chỉ
                </span>
                <h3 className="font-gotu text-2xl text-[#0b192e] font-medium mb-3">
                  6516 New York Ave
                </h3>
                <p className="text-sm text-[#0b192e]/70 leading-relaxed mb-4">
                  Arlington, Texas 76018. Conveniently located with ample free storefront parking. Easy in-and-out for morning commutes and family gatherings.
                </p>
                
                <div className="space-y-2 mb-6 text-xs text-[#0b192e]/80">
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4 text-slate-600 shrink-0" />
                    <span>Free dedicated parking right in front</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-slate-600 shrink-0" />
                    <span>Walk-in counter service with friendly family greeting</span>
                  </div>
                </div>
              </div>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-full bg-[#0b192e] text-white hover:bg-[#0b192e]/90 transition-colors text-sm font-semibold shadow-sm"
              >
                <Navigation className="w-4 h-4 text-slate-300" />
                <span>Get Directions on Google Maps</span>
              </a>
            </div>
          </ScrollReveal>

          {/* Card 2: Hours & Baking Schedule */}
          <ScrollReveal variant="pop" delay={0.15} duration={0.55} className="h-full">
            <div className="h-full bg-white rounded-3xl p-6 sm:p-8 border border-[#0b192e]/10 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="absolute top-0 right-0 w-24 h-24 bg-slate-300/20 rounded-bl-full pointer-events-none" />
              
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#0b192e]/5 text-slate-700 flex items-center justify-center mb-5">
                  <Clock className="w-6 h-6" />
                </div>
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-600 block mb-1">
                  Baking Hours • Giờ Mở Cửa
                </span>
                <h3 className="font-gotu text-2xl text-[#0b192e] font-medium mb-3">
                  7:00 AM – 5:00 PM
                </h3>
                <p className="text-sm text-[#0b192e]/70 leading-relaxed mb-6">
                  We fire up the ovens at dawn so the first batch of crispy baguettes and warm pâté sô are ready when we open at 7:00 AM.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#0b192e]/5 border border-[#0b192e]/10 space-y-2.5 text-xs">
                <div className="flex justify-between items-center gap-2 text-[#0b192e]">
                  <span className="font-semibold shrink-0">Mon, Tue, Wed:</span>
                  <span className="text-right">7:00 AM – 5:00 PM</span>
                </div>
                <div className="flex justify-between items-center gap-2 text-slate-800 font-semibold bg-slate-100 px-2.5 py-1.5 rounded-lg">
                  <span className="shrink-0">Thursday:</span>
                  <span className="text-right">CLOSED (Nghỉ Thứ Năm)</span>
                </div>
                <div className="flex justify-between items-center gap-2 text-[#0b192e]">
                  <span className="font-semibold shrink-0">Fri, Sat, Sun:</span>
                  <span className="text-right">7:00 AM – 5:00 PM (Bánh Tiêu specials!)</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 3: Call Ahead & Large Orders */}
          <ScrollReveal variant="pop" delay={0.25} duration={0.55} className="h-full">
            <div className="h-full bg-white rounded-3xl p-6 sm:p-8 border border-[#0b192e]/10 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="absolute top-0 right-0 w-24 h-24 bg-slate-300/20 rounded-bl-full pointer-events-none" />
              
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#0b192e]/5 text-slate-700 flex items-center justify-center mb-5">
                  <Phone className="w-6 h-6" />
                </div>
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-600 block mb-1">
                  Phone & Inquiries • Điện Thoại
                </span>
                <h3 className="font-gotu text-2xl text-[#0b192e] font-medium mb-3">
                  (817) 275-8868
                </h3>
                <p className="text-sm text-[#0b192e]/70 leading-relaxed mb-4">
                  No online accounts needed — simply stop by in person or call ahead if you need dozens of fresh baguettes, lunch boxes, or party catering platters.
                </p>

                <div className="space-y-2 mb-6 text-xs text-[#0b192e]/80">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-slate-600 shrink-0" />
                    <span>Call ahead to hold baguettes before they sell out</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-slate-600 shrink-0" />
                    <span>Custom orders for family gatherings & office lunches</span>
                  </div>
                </div>
              </div>

              <a
                href="tel:8172758868"
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-full bg-[#0b192e] text-white hover:bg-[#0b192e]/90 transition-colors text-sm font-semibold shadow-sm"
              >
                <Phone className="w-4 h-4 text-slate-300" />
                <span>Call Bakery: (817) 275-8868</span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

