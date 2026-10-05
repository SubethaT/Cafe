import React, { useState } from 'react';
import { Flame, Wind, Globe, ShieldCheck, Plus, Check } from 'lucide-react';
import { RETAIL_BEANS, BEANS_IMAGE, POUROVER_IMAGE } from '../data/cafeData';
import { MenuItem } from '../types/cafe';

interface RoasterySectionProps {
  onSelectBean: (item: MenuItem) => void;
}

export const RoasterySection: React.FC<RoasterySectionProps> = ({ onSelectBean }) => {
  const [activeTab, setActiveTab] = useState<'beans' | 'philosophy'>('beans');
  const [imageError, setImageError] = useState(false);

  return (
    <section id="roastery" className="py-16 sm:py-24 bg-[#F5EFEB] border-t border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7">
            <div className="text-xs uppercase tracking-widest text-[#8A6342] font-mono font-semibold mb-2">
              Micro-Batch Roasting Atrium
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#24211E] tracking-tight">
              Single-Origin Terroir & Whole Bean Retail
            </h2>
          </div>
          <div className="lg:col-span-5 text-sm text-[#5C544D] leading-relaxed">
            Every green lot is ethically sourced directly from smallholder partner co-ops at 200%+ Fairtrade rates. 
            We profile each batch to showcase crisp florals, fruit sugars, and structural clarity.
          </div>
        </div>

        {/* Feature Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          
          {/* Left: Roastery Photo */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-4/3 bg-[#EBE4DA] border border-[#DDD3C7] shadow-lg">
            {!imageError ? (
              <img
                src={BEANS_IMAGE}
                alt="Freshly roasted specialty single-origin coffee beans in cupping dish"
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center p-6 text-center text-[#6E6153]">
                Komorebi Roastery Micro-Batch
              </div>
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#D4A373]">
                Cast-Iron Drum Roasting
              </span>
              <h3 className="text-xl font-serif font-bold text-white mt-0.5">
                Roasted Twice Weekly in Portland
              </h3>
              <p className="text-xs text-white/80 mt-1">
                Guaranteed peak degassing window between 5 to 21 days from roast date.
              </p>
            </div>
          </div>

          {/* Right: Craft Principles */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="p-5 bg-[#FFFDF9] border border-[#E8DFD5] rounded-xl space-y-2">
                <div className="w-8 h-8 rounded-md bg-[#F4ECE3] text-[#8A6342] flex items-center justify-center">
                  <Flame className="w-4 h-4" />
                </div>
                <h4 className="text-base font-serif font-bold text-[#24211E]">Gentle Convective Curves</h4>
                <p className="text-xs text-[#5C544D] leading-relaxed">
                  We avoid scorching and bitter baking notes by leveraging fluid convective airflow to develop delicate floral esters.
                </p>
              </div>

              <div className="p-5 bg-[#FFFDF9] border border-[#E8DFD5] rounded-xl space-y-2">
                <div className="w-8 h-8 rounded-md bg-[#F4ECE3] text-[#8A6342] flex items-center justify-center">
                  <Globe className="w-4 h-4" />
                </div>
                <h4 className="text-base font-serif font-bold text-[#24211E]">Farm-Direct Transparency</h4>
                <p className="text-xs text-[#5C544D] leading-relaxed">
                  We publish lot altitude, soil type, processing station, and farmer compensation on every 250g bag.
                </p>
              </div>

              <div className="p-5 bg-[#FFFDF9] border border-[#E8DFD5] rounded-xl space-y-2">
                <div className="w-8 h-8 rounded-md bg-[#F4ECE3] text-[#8A6342] flex items-center justify-center">
                  <Wind className="w-4 h-4" />
                </div>
                <h4 className="text-base font-serif font-bold text-[#24211E]">Nitrogen-Flushed Bags</h4>
                <p className="text-xs text-[#5C544D] leading-relaxed">
                  100% compostable plant-based valve packaging flushed with food-grade nitrogen to preserve aroma for up to 90 days.
                </p>
              </div>

              <div className="p-5 bg-[#FFFDF9] border border-[#E8DFD5] rounded-xl space-y-2">
                <div className="w-8 h-8 rounded-md bg-[#F4ECE3] text-[#8A6342] flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="text-base font-serif font-bold text-[#24211E]">Dialed Mineral Water</h4>
                <p className="text-xs text-[#5C544D] leading-relaxed">
                  Our tap water is remineralized to 125 ppm TDS with 3:1 magnesium-to-calcium ratio for optimal solvent extraction.
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Retail Bean Bag Showcase */}
        <div>
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#E8DFD5]">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#24211E]">
              Fresh Whole Bean Bags (Roast on Demand)
            </h3>
            <span className="text-xs font-mono text-[#7A6C5D]">
              Complimentary custom grinding available
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RETAIL_BEANS.map((bean) => (
              <div
                key={bean.id}
                className="bg-[#FFFDF9] border border-[#E8DFD5] rounded-xl p-5 flex flex-col justify-between hover:shadow-md transition-shadow duration-150"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#8A6342] mb-1">
                    <span>{bean.roastLevel} Roast</span>
                    <span className="text-[#7A6C5D] font-normal">{bean.origin}</span>
                  </div>

                  <h4 className="text-lg font-serif font-bold text-[#24211E] mb-1.5">
                    {bean.name}
                  </h4>

                  <p className="text-xs text-[#5C544D] leading-relaxed mb-4">
                    {bean.description}
                  </p>

                  {/* Flavor notes */}
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-[#7A6C5D] mb-4">
                    {bean.tastingNotes?.map((note, idx) => (
                      <React.Fragment key={note}>
                        <span>{note}</span>
                        {idx < bean.tastingNotes!.length - 1 && (
                          <span aria-hidden="true" className="text-[#C4B5A5]">·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#F0EAE1] flex items-center justify-between">
                  <span className="text-base font-mono font-bold text-[#24211E] tabular-nums">
                    ${bean.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => onSelectBean(bean)}
                    className="px-4 py-2 bg-[#24211E] text-white text-xs font-semibold rounded-md hover:bg-[#8A6342] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Select Grind & Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
