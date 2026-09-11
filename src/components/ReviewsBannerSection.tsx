import React from 'react';
import { Star, ExternalLink, Sparkles } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const ReviewsBannerSection: React.FC = () => {
  const googleReviewUrl =
    'https://www.google.com/maps/search/?api=1&query=Lo+Banh+Mi+French+Bakery+6516+New+York+Ave+Arlington+TX+76018';
  const yelpReviewUrl =
    'https://www.yelp.com/search?find_desc=Lo+Banh+Mi+French+Bakery&find_loc=Arlington%2C+TX';

  return (
    <section id="reviews" className="py-12 sm:py-20 bg-slate-50/70 border-t border-[#0b192e]/10 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* White Box Container with Scroll Pop Animation */}
        <ScrollReveal variant="pop" duration={0.65}>
          <div className="bg-white text-[#0b192e] rounded-3xl p-8 sm:p-12 md:p-14 border border-[#0b192e]/10 shadow-xl relative overflow-hidden text-center">
            {/* Subtle Ambient Radial Glow */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-slate-400/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
              {/* Star Rating Graphic */}
              <div className="flex items-center justify-center gap-1.5 mb-5 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6 sm:w-7 sm:h-7 fill-amber-400 text-amber-400 drop-shadow-xs"
                  />
                ))}
              </div>

              {/* Main Headline Requested by User */}
              <h2 className="font-gotu text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#0b192e] font-normal tracking-tight leading-tight mb-4">
                Reviews on Google and Yelp are greatly appreciated
              </h2>

              {/* Warm Subtitle */}
              <p className="text-[#0b192e]/75 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-normal mb-8">
                As an independent, family-owned Vietnamese bakery in Arlington, your kind feedback and ratings help our neighbors discover hot deck-oven baguettes, authentic crispy bánh mì, and morning cà phê sữa đá.
              </p>

              {/* Review Action Buttons (Google & Yelp) */}
              <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-5 w-full">
                {/* Google Reviews Button */}
                <a
                  id="review-google-btn"
                  href={googleReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm sm:text-base border border-slate-200 shadow-sm hover:shadow hover:border-slate-300 transition-all duration-200 hover:scale-[1.02] cursor-pointer"
                >
                  {/* Google G Icon */}
                  <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.94 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                  <span>Review on Google</span>
                  <ExternalLink className="w-4 h-4 text-slate-500" />
                </a>

                {/* Yelp Reviews Button */}
                <a
                  id="review-yelp-btn"
                  href={yelpReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full bg-[#d32323] hover:bg-[#b81d1d] text-white font-semibold text-sm sm:text-base shadow-md transition-all duration-200 hover:scale-[1.02] cursor-pointer"
                >
                  {/* Yelp Star Icon */}
                  <Sparkles className="w-5 h-5 text-white" />
                  <span>Review on Yelp</span>
                  <ExternalLink className="w-4 h-4 text-white/80" />
                </a>
              </div>

              {/* Sincere Thank You Note */}
              <p className="mt-8 text-xs text-slate-500 tracking-wide font-medium">
                Lò Bánh Mì French Bakery • 6516 New York Ave, Arlington, TX • (817) 275-8868
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
