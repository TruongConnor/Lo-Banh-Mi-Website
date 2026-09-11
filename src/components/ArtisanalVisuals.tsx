import React from 'react';
import { motion } from 'motion/react';

// Hero Top-Down Sandwich on Traditional Blue & White Ceramic Plate
export const HeroPlateVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-[480px] sm:max-w-[540px] aspect-square mx-auto flex items-center justify-center p-4">
      {/* Soft shadow */}
      <div className="absolute inset-4 rounded-full bg-[#121F3E]/8 blur-2xl transform -rotate-6" />

      {/* Ceramic Plate */}
      <div className="relative w-full h-full rounded-full bg-[#FDFEFE] shadow-[0_20px_50px_rgba(18,31,62,0.12),0_4px_12px_rgba(18,31,62,0.06)] border border-[#E2E8F0] p-6 sm:p-8 flex items-center justify-center overflow-hidden">
        {/* Porcelain Outer Rim with Crisp Navy Rings (No gold) */}
        <div className="absolute inset-2 sm:inset-3 rounded-full border-[3px] border-[#121F3E]/20 pointer-events-none" />
        <div className="absolute inset-3 sm:inset-4 rounded-full border border-[#121F3E]/10 pointer-events-none" />
        
        {/* Blue Floral Ceramic Motifs around rim */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none text-[#121F3E]/25" viewBox="0 0 400 400" fill="none">
          <circle cx="200" cy="200" r="186" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 6" />
          <circle cx="200" cy="200" r="172" stroke="currentColor" strokeWidth="1" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <g key={i} transform={`rotate(${angle} 200 200)`}>
              <path d="M200 16 C195 24, 195 32, 200 38 C205 32, 205 24, 200 16 Z" fill="currentColor" opacity="0.8" />
              <path d="M190 28 C194 30, 198 30, 200 28 C202 30, 206 30, 210 28" stroke="currentColor" strokeWidth="1.2" />
              <circle cx="200" cy="28" r="2.5" fill="#121F3E" fillOpacity="0.8" />
            </g>
          ))}
          <circle cx="200" cy="200" r="148" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
        </svg>

        {/* Center Plate Indent */}
        <div className="absolute inset-10 sm:inset-12 rounded-full bg-gradient-to-b from-[#FAFBFB] to-[#F2F5F8] shadow-inner opacity-70" />

        {/* Artisanal Sandwich Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -18 }}
          animate={{ opacity: 1, scale: 1, rotate: -14 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-[88%] h-[56%] max-w-[380px] filter drop-shadow-[0_12px_24px_rgba(18,31,62,0.22)]"
        >
          <svg viewBox="0 0 340 180" fill="none" className="w-full h-full">
            {/* Baguette Golden Crust Base */}
            <path
              d="M20 90 C15 50, 45 25, 110 20 C180 15, 270 25, 315 55 C335 70, 335 110, 310 135 C265 165, 170 170, 100 165 C40 160, 15 130, 20 90 Z"
              fill="url(#bread-crust-gradient)"
            />
            {/* Flour dusting & artisanal scoring */}
            <path d="M60 40 Q100 35 140 45" stroke="#FFF8EE" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
            <path d="M160 38 Q205 35 250 48" stroke="#FFF8EE" strokeWidth="4" strokeLinecap="round" opacity="0.6" />

            {/* Split Baguette Opening */}
            <path
              d="M35 88 C40 60, 90 50, 170 52 C250 54, 295 72, 305 92 C295 125, 240 138, 165 135 C95 132, 40 120, 35 88 Z"
              fill="#FDF8EE"
            />

            {/* Rich Liver Pâté Layer */}
            <path
              d="M45 92 C65 80, 120 75, 185 78 C250 81, 285 90, 290 102 C270 115, 200 122, 140 120 C85 118, 48 108, 45 92 Z"
              fill="#5A3828"
              opacity="0.9"
            />

            {/* Ham & Pork Roll Slices */}
            <path d="M55 86 C85 76, 140 76, 195 82 C160 98, 100 98, 55 86 Z" fill="#E8A598" />
            <path d="M120 80 C175 75, 230 78, 275 88 C240 100, 180 102, 120 80 Z" fill="#F4C2BA" />
            <path d="M160 85 C210 82, 260 86, 292 98 C255 108, 205 106, 160 85 Z" fill="#DF8A7E" />

            {/* Cucumber Ribbons */}
            <path d="M60 88 Q130 82 210 94" stroke="#7CB342" strokeWidth="5" strokeLinecap="round" />
            <path d="M130 92 Q200 86 280 100" stroke="#8BC34A" strokeWidth="5" strokeLinecap="round" />

            {/* Pickled Carrots & Daikon */}
            <g stroke="#FF7043" strokeWidth="2.5" strokeLinecap="round">
              <path d="M70 82 L105 86" />
              <path d="M90 78 L125 84" />
              <path d="M140 82 L180 88" />
              <path d="M175 80 L215 88" />
              <path d="M210 84 L250 94" />
              <path d="M245 88 L285 96" />
            </g>
            <g stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.95">
              <path d="M80 84 L115 88" />
              <path d="M125 80 L160 86" />
              <path d="M160 84 L195 90" />
              <path d="M195 82 L230 90" />
              <path d="M230 86 L265 96" />
            </g>

            {/* Cilantro */}
            <g fill="#33691E" stroke="#2E7D32" strokeWidth="0.8">
              <circle cx="95" cy="85" r="5" />
              <circle cx="102" cy="82" r="4.5" />
              <circle cx="150" cy="88" r="6" />
              <circle cx="160" cy="84" r="5" />
              <circle cx="215" cy="92" r="5.5" />
              <circle cx="225" cy="88" r="5" />
              <circle cx="260" cy="95" r="5" />
            </g>

            {/* Sliced Jalapeño & Chili */}
            <circle cx="115" cy="86" r="4.5" fill="#D32F2F" stroke="#B71C1C" strokeWidth="1" />
            <circle cx="115" cy="86" r="2" fill="#FFE082" />
            <circle cx="185" cy="90" r="5" fill="#D32F2F" stroke="#B71C1C" strokeWidth="1" />
            <circle cx="185" cy="90" r="2.2" fill="#FFE082" />
            <circle cx="240" cy="95" r="4" fill="#388E3C" stroke="#1B5E20" strokeWidth="1" />
            <circle cx="240" cy="95" r="1.8" fill="#FFF59D" />

            <defs>
              <linearGradient id="bread-crust-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C47E35" />
                <stop offset="35%" stopColor="#E29A44" />
                <stop offset="70%" stopColor="#C97828" />
                <stop offset="100%" stopColor="#8C4610" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Small Brand Stamp on Plate Rim */}
        <div className="absolute bottom-5 sm:bottom-6 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#121F3E] text-white text-[10px] font-medium tracking-wider uppercase shadow-sm">
          <span>Fresh Daily</span>
          <span className="w-1 h-1 rounded-full bg-white/40" />
          <span>Since 7:00 AM</span>
        </div>
      </div>
    </div>
  );
};

// Rattan Basket with Plain Baguettes
export const RattanBasketVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-[360px] sm:max-w-[420px] aspect-[4/3] mx-auto flex items-center justify-center p-2">
      <div className="absolute inset-x-6 bottom-2 h-12 bg-[#121F3E]/12 rounded-full blur-xl" />

      {/* Rattan Tray */}
      <div className="relative w-full h-full rounded-[40px] bg-[#EFE3D3] border-4 border-[#8C6D4F] p-4 sm:p-6 shadow-md flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-rattan-pattern opacity-60 pointer-events-none" />
        <div className="absolute inset-2 rounded-[32px] border border-[#121F3E]/15 pointer-events-none" />

        {/* Leaf Liner */}
        <div className="absolute inset-4 rounded-[28px] bg-gradient-to-tr from-[#33691E] via-[#558B2F] to-[#689F38] opacity-85 shadow-inner transform -rotate-1">
          <svg className="w-full h-full opacity-25" viewBox="0 0 200 150" fill="none">
            <line x1="10" y1="75" x2="190" y2="75" stroke="#FFFFFF" strokeWidth="2" />
            {[20, 50, 80, 110, 140, 170].map((x, i) => (
              <React.Fragment key={i}>
                <line x1={x} y1="75" x2={x + 25} y2="15" stroke="#FFFFFF" strokeWidth="1" />
                <line x1={x} y1="75" x2={x + 25} y2="135" stroke="#FFFFFF" strokeWidth="1" />
              </React.Fragment>
            ))}
          </svg>
        </div>

        {/* Baguettes */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <svg viewBox="0 0 320 200" fill="none" className="w-full h-full filter drop-shadow-[0_8px_16px_rgba(18,31,62,0.25)]">
            <g transform="rotate(18 160 100)">
              <path
                d="M40 95 C30 85, 50 65, 110 65 C170 65, 230 75, 275 88 C290 95, 285 115, 240 120 C180 125, 100 120, 50 112 C35 108, 35 100, 40 95 Z"
                fill="#C67D32"
              />
              <path d="M90 75 L115 105" stroke="#FFF2DF" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
              <path d="M145 75 L170 105" stroke="#FFF2DF" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
              <path d="M200 78 L225 105" stroke="#FFF2DF" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
            </g>

            <g transform="rotate(-15 160 100)">
              <path
                d="M45 92 C35 82, 55 62, 115 62 C175 62, 235 72, 280 85 C295 92, 290 112, 245 118 C185 122, 105 118, 55 110 C40 105, 40 98, 45 92 Z"
                fill="#D48B3B"
              />
              <path d="M95 72 L120 102" stroke="#FFF2DF" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
              <path d="M150 72 L175 102" stroke="#FFF2DF" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
              <path d="M205 75 L230 102" stroke="#FFF2DF" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
            </g>

            <g transform="rotate(2 160 100)">
              <path
                d="M30 100 C20 85, 45 68, 110 66 C175 64, 245 72, 290 90 C305 98, 300 120, 255 128 C190 134, 105 132, 45 120 C25 112, 25 105, 30 100 Z"
                fill="url(#front-baguette-gradient-plain)"
              />
              <path d="M80 80 Q95 95 110 110" stroke="#FFECCC" strokeWidth="4" strokeLinecap="round" opacity="0.75" />
              <path d="M135 78 Q150 95 165 112" stroke="#FFECCC" strokeWidth="4" strokeLinecap="round" opacity="0.75" />
              <path d="M190 80 Q205 95 220 112" stroke="#FFECCC" strokeWidth="4" strokeLinecap="round" opacity="0.75" />
              <path d="M245 84 Q255 96 265 110" stroke="#FFECCC" strokeWidth="4" strokeLinecap="round" opacity="0.75" />
            </g>

            <defs>
              <linearGradient id="front-baguette-gradient-plain" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D98A36" />
                <stop offset="45%" stopColor="#F5B358" />
                <stop offset="85%" stopColor="#C87627" />
                <stop offset="100%" stopColor="#964C12" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Badge */}
        <div className="absolute top-3 left-3 bg-[#121F3E] text-[#F9FBFB] text-[11px] font-semibold px-3 py-1 rounded-full border border-white/20 flex items-center gap-1.5 shadow">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Hot Out of The Oven</span>
        </div>
      </div>
    </div>
  );
};

// Hollow Sesame Donut (Banh Tieu) Visual
export const BanhTieuVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-[420px] aspect-[4/3] mx-auto flex items-center justify-center p-2">
      {/* Animated Steam */}
      <div className="absolute top-0 inset-x-0 h-28 flex justify-center items-center gap-6 pointer-events-none z-20">
        {[0, 1, 2].map((idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15, scaleX: 0.8 }}
            animate={{ opacity: [0, 0.7, 0], y: [-5, -35, -60], scaleX: [0.8, 1.2, 1.6] }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              delay: idx * 0.8,
              ease: 'easeOut',
            }}
            className="w-4 h-16 rounded-full bg-gradient-to-t from-white/30 to-transparent blur-sm"
          />
        ))}
      </div>

      <div className="absolute inset-8 rounded-full bg-[#1C2C54] shadow-[0_0_60px_rgba(255,255,255,0.05)]" />

      {/* Donut Vector */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <svg viewBox="0 0 340 240" fill="none" className="w-full h-full filter drop-shadow-[0_16px_32px_rgba(0,0,0,0.5)]">
          <g transform="rotate(-8 140 130)">
            <path
              d="M40 130 C30 80, 80 50, 140 60 C155 62, 160 80, 155 105 C145 135, 150 155, 140 180 C80 195, 35 170, 40 130 Z"
              fill="url(#tieu-left-clean)"
            />
            <path
              d="M75 125 C70 95, 100 80, 138 82 C142 105, 136 130, 135 155 C100 162, 75 145, 75 125 Z"
              fill="#543315"
              opacity="0.8"
            />
            <path d="M138 88 Q115 100 135 125" stroke="#FFEBB7" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
            <path d="M135 128 Q110 140 132 155" stroke="#FFEBB7" strokeWidth="2" strokeLinecap="round" opacity="0.8" />

            <g fill="#FFFDF0" opacity="0.95">
              {[
                { cx: 55, cy: 95 }, { cx: 70, cy: 80 }, { cx: 88, cy: 68 }, { cx: 110, cy: 64 },
                { cx: 50, cy: 120 }, { cx: 62, cy: 145 }, { cx: 78, cy: 168 }, { cx: 105, cy: 180 },
                { cx: 65, cy: 110 }, { cx: 80, cy: 135 }, { cx: 98, cy: 155 }, { cx: 125, cy: 172 },
                { cx: 90, cy: 95 }, { cx: 115, cy: 85 }, { cx: 128, cy: 75 }
              ].map((seed, sIdx) => (
                <ellipse key={sIdx} cx={seed.cx} cy={seed.cy} rx="2.5" ry="1.4" transform={`rotate(${sIdx * 25} ${seed.cx} ${seed.cy})`} />
              ))}
            </g>
          </g>

          <g transform="rotate(10 200 130)">
            <path
              d="M300 130 C310 80, 260 50, 200 60 C185 62, 180 80, 185 105 C195 135, 190 155, 200 180 C260 195, 305 170, 300 130 Z"
              fill="url(#tieu-right-clean)"
            />
            <path
              d="M265 125 C270 95, 240 80, 202 82 C198 105, 204 130, 205 155 C240 162, 265 145, 265 125 Z"
              fill="#543315"
              opacity="0.8"
            />
            <path d="M202 88 Q225 100 205 125" stroke="#FFEBB7" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
            <path d="M205 128 Q230 140 208 155" stroke="#FFEBB7" strokeWidth="2" strokeLinecap="round" opacity="0.8" />

            <g fill="#FFFDF0" opacity="0.95">
              {[
                { cx: 285, cy: 95 }, { cx: 270, cy: 80 }, { cx: 252, cy: 68 }, { cx: 230, cy: 64 },
                { cx: 290, cy: 120 }, { cx: 278, cy: 145 }, { cx: 262, cy: 168 }, { cx: 235, cy: 180 },
                { cx: 275, cy: 110 }, { cx: 260, cy: 135 }, { cx: 242, cy: 155 }, { cx: 215, cy: 172 },
                { cx: 250, cy: 95 }, { cx: 225, cy: 85 }, { cx: 212, cy: 75 }
              ].map((seed, sIdx) => (
                <ellipse key={sIdx} cx={seed.cx} cy={seed.cy} rx="2.5" ry="1.4" transform={`rotate(${-sIdx * 25} ${seed.cx} ${seed.cy})`} />
              ))}
            </g>
          </g>

          <defs>
            <linearGradient id="tieu-left-clean" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5B041" />
              <stop offset="40%" stopColor="#E67E22" />
              <stop offset="100%" stopColor="#A04000" />
            </linearGradient>
            <linearGradient id="tieu-right-clean" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F5B041" />
              <stop offset="40%" stopColor="#E67E22" />
              <stop offset="100%" stopColor="#A04000" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Clean White & Navy Price Badge */}
      <div className="absolute bottom-2 bg-white text-[#121F3E] font-bold text-sm px-4 py-1.5 rounded-full shadow-lg border border-[#121F3E]/20 flex items-center gap-1.5">
        <span>$1.00</span>
        <span className="text-xs font-normal text-[#121F3E]/70">| Each (Warm In-Store)</span>
      </div>
    </div>
  );
};
