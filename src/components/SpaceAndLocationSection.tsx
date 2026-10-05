import React, { useState } from 'react';
import { Clock, MapPin, Navigation, Wifi, Heart, Bike, ShieldCheck, Coffee } from 'lucide-react';
import { OPENING_HOURS, PASTRY_IMAGE } from '../data/cafeData';

export const SpaceAndLocationSection: React.FC = () => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [pastryImgError, setPastryImgError] = useState(false);

  const address = '428 Sunburst Avenue, Arts District, Portland, OR 97209';

  const handleCopyAddress = () => {
    navigator.clipboard?.writeText(address);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const amenities = [
    { icon: Wifi, title: 'Fiber Gigabit Wi-Fi', desc: 'Symmetrical 500Mbps connection on the Mezzanine' },
    { icon: Heart, title: 'Dog-Friendly Courtyard', desc: 'Heated open-air terrace with spring water bowls' },
    { icon: Coffee, title: 'Oat Milk on Tap', desc: 'Fresh Oatly Barista drafted from kegs for zero carton waste' },
    { icon: Bike, title: 'Secured Bike Corral', desc: '14 outdoor bike lock racks monitored by reception' },
  ];

  return (
    <section id="space" className="py-16 sm:py-24 bg-[#FAF8F5] border-t border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase tracking-widest text-[#8A6342] font-mono font-semibold mb-2">
            The Gathering Space · Arts District
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#24211E] tracking-tight">
            Designed for Slow Mornings & Quiet Focus
          </h2>
          <p className="text-sm text-[#5C544D] mt-3 leading-relaxed">
            Constructed with reclaimed Douglas fir and acoustic felt ceilings to maintain conversational tranquility 
            even during peak morning rush.
          </p>
        </div>

        {/* Split Grid: Space Imagery + Hours & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-16">
          
          {/* Left Column: Visual Highlight */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="relative rounded-2xl overflow-hidden aspect-4/3 bg-[#EBE4DA] border border-[#DDD3C7] shadow-lg">
              {!pastryImgError ? (
                <img
                  src={PASTRY_IMAGE}
                  alt="Artisanal sourdough croissants and cardamom knots at Komorebi Bakery counter"
                  referrerPolicy="no-referrer"
                  onError={() => setPastryImgError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center p-6 text-center text-[#6E6153]">
                  Artisan Bakery Counter & Pastry Case
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 text-white">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#D4A373]">
                  5:00 AM Daily Bake
                </span>
                <h4 className="text-lg font-serif font-bold text-white mt-0.5">
                  Hand-Laminated Viennoiserie
                </h4>
                <p className="text-xs text-white/80">
                  Baked in limited daily batches until sold out.
                </p>
              </div>
            </div>

            {/* Amenities Grid */}
            <div className="grid grid-cols-2 gap-3">
              {amenities.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div key={item.title} className="p-3.5 bg-[#FFFDF9] border border-[#E8DFD5] rounded-xl space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#24211E]">
                      <IconComponent className="w-4 h-4 text-[#8A6342] shrink-0" />
                      <span>{item.title}</span>
                    </div>
                    <p className="text-[11px] text-[#7A6C5D] leading-normal">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Schedule & Location Details */}
          <div id="hours" className="lg:col-span-6 bg-[#FFFDF9] border border-[#E8DFD5] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xs space-y-6">
            
            {/* Hours breakdown */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#E8DFD5]">
                <Clock className="w-5 h-5 text-[#8A6342]" />
                <h3 className="text-xl font-serif font-bold text-[#24211E]">
                  Operating Hours & Service Times
                </h3>
              </div>

              <div className="space-y-4">
                {OPENING_HOURS.map((oh) => (
                  <div key={oh.day} className="p-4 bg-[#F5EFEB] rounded-xl border border-[#E8DFD5]">
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="font-serif font-bold text-base text-[#24211E]">{oh.day}</span>
                      <span className="font-mono font-bold text-sm text-[#8A6342]">{oh.hours}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-[#5C544D] pt-2 border-t border-[#DDD3C7]">
                      <div>
                        <span className="block text-[#7A6C5D] text-[10px] uppercase font-mono">Espresso & Brew Bar</span>
                        <span>{oh.brewBar}</span>
                      </div>
                      <div>
                        <span className="block text-[#7A6C5D] text-[10px] uppercase font-mono">Kitchen & Tartines</span>
                        <span>{oh.kitchen}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Address & Interactive Map Card */}
            <div className="pt-4 border-t border-[#E8DFD5] space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#8A6342] font-semibold flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    Visit Our Roastery
                  </div>
                  <div className="text-base font-medium text-[#24211E] mt-0.5">
                    {address}
                  </div>
                  <div className="text-xs text-[#7A6C5D] mt-1">
                    Portland Arts District · 2 min from Streetcar NW 11th & Johnson
                  </div>
                </div>

                <div className="flex flex-col gap-2 shrink-0">
                  <a
                    href="https://maps.google.com/?q=428+Sunburst+Avenue+Portland+OR"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 text-xs font-semibold bg-[#24211E] text-white rounded-md hover:bg-[#3D3732] flex items-center gap-1.5 transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    Directions
                  </a>
                  <button
                    onClick={handleCopyAddress}
                    className="px-3.5 py-1.5 text-[11px] font-medium border border-[#D9CFC4] rounded-md text-[#5C544D] hover:text-[#24211E] hover:bg-[#F2ECE3] transition-colors cursor-pointer"
                  >
                    {copySuccess ? 'Copied to Clipboard!' : 'Copy Address'}
                  </button>
                </div>
              </div>

              {/* Styled Vector Map Representation */}
              <div className="relative h-44 rounded-xl overflow-hidden border border-[#D9CFC4] bg-[#E8E2D9] flex items-center justify-center">
                {/* Stylized map grid */}
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#8A6342_1px,transparent_1px)] [background-size:16px_16px]" />
                
                {/* Mock streets */}
                <div className="absolute w-full h-3 bg-[#D9D0C3] top-1/2 -translate-y-1/2 -rotate-6" />
                <div className="absolute h-full w-3 bg-[#D9D0C3] left-1/3 -translate-x-1/2" />
                <div className="absolute h-full w-2.5 bg-[#D9D0C3] right-1/4 -translate-x-1/2" />

                {/* Central Pin */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-[#24211E] text-white flex items-center justify-center shadow-lg ring-4 ring-[#8A6342]/30 animate-bounce">
                    <Coffee className="w-4 h-4 text-[#D4A373]" />
                  </div>
                  <div className="mt-1 bg-white/95 px-2.5 py-0.5 rounded shadow-xs text-[11px] font-bold text-[#24211E]">
                    Komorebi Atelier
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
