import React, { useState } from 'react';
import { ArrowDown, Sparkles, Clock, Compass, Coffee } from 'lucide-react';
import { HERO_IMAGE } from '../data/cafeData';

interface HeroProps {
  onExploreMenu: () => void;
  onBookTable: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onBookTable }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <section id="home" className="relative pt-6 pb-16 lg:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top quiet status kicker (zero-pill rule: unboxed text with separators) */}
        <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-[#7A6C5D] mb-4 font-mono">
          <span className="flex items-center gap-1.5 font-semibold text-[#8A6342]">
            <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block animate-pulse" />
            Open Today
          </span>
          <span aria-hidden="true" className="text-[#C4B5A5]">·</span>
          <span>7:00 AM – 7:00 PM</span>
          <span aria-hidden="true" className="text-[#C4B5A5]">·</span>
          <span>Espresso & Brew Bar Active</span>
          <span aria-hidden="true" className="text-[#C4B5A5]">·</span>
          <span>Portland Arts District</span>
        </div>

        {/* Main Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-6 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#24211E] tracking-tight leading-[1.08] [text-wrap:balance]">
              Slow Crafted Specialty Coffee & Morning Viennoiserie
            </h1>

            <p className="text-base sm:text-lg text-[#5A5147] leading-relaxed max-w-xl font-normal">
              Direct-trade micro-lots roasted in small batches on a vintage cast-iron drum. 
              Pair single-origin pour-overs with 36-hour laminated butter croissants 
              in a tranquil sunlit sanctuary.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreMenu}
                className="px-7 py-3.5 bg-[#24211E] text-white text-sm font-semibold tracking-wide rounded-md hover:bg-[#3D3732] active:translate-y-0.5 transition-all shadow-sm cursor-pointer whitespace-nowrap"
              >
                Explore Menu & Order Ahead
              </button>

              <button
                onClick={onBookTable}
                className="px-7 py-3.5 bg-transparent text-[#24211E] border border-[#24211E]/30 text-sm font-semibold tracking-wide rounded-md hover:bg-[#F2ECE3] active:translate-y-0.5 transition-all cursor-pointer whitespace-nowrap"
              >
                Reserve a Tasting Table
              </button>
            </div>

            {/* Claim-to-Proof Adjacency */}
            <div className="pt-6 border-t border-[#E8DFD5] grid grid-cols-3 gap-4">
              <div>
                <div className="text-xl sm:text-2xl font-serif font-bold text-[#24211E] tabular-nums">88.5+</div>
                <div className="text-xs text-[#7A6C5D] mt-0.5">Average SCA cupping score</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-serif font-bold text-[#24211E] tabular-nums">48 Hrs</div>
                <div className="text-xs text-[#7A6C5D] mt-0.5">Roast-to-brew guarantee</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-serif font-bold text-[#24211E] tabular-nums">100%</div>
                <div className="text-xs text-[#7A6C5D] mt-0.5">Direct farm relationship</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Architectural Media */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-16/11 bg-[#EBE4DA] border border-[#E0D5C7]">
              {!imageError ? (
                <img
                  src={HERO_IMAGE}
                  alt="Modern sunlit interior of Komorebi Coffee Roastery with oak tables and artisan espresso bar"
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover transition-opacity duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-[#EBE4DA] text-[#6E6153]">
                  <Coffee className="w-12 h-12 mb-3 text-[#8A6342]" />
                  <p className="font-serif text-lg font-semibold text-[#24211E]">Komorebi Coffee Atelier</p>
                  <p className="text-xs text-[#7A6C5D]">Artisanal Space & Espresso Bar</p>
                </div>
              )}

              {/* Gentle caption overlay */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent p-5 text-white">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-medium text-white/90">Main Atrium & Brew Bar</span>
                    <span className="block text-white/70 text-[11px]">Architectural white oak & polished terrazzo</span>
                  </div>
                  <span className="text-[11px] font-mono tracking-wider uppercase text-white/80 bg-white/10 px-2 py-0.5 rounded-sm">
                    428 Sunburst Ave
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
