import React, { useState } from 'react';
import { Coffee, ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#24211E] text-[#D9CFC4] pt-16 pb-12 border-t border-[#3D3732]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#3D3732]">
          
          {/* Brand & Story */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-2xl font-serif font-bold text-white tracking-tight">
              Komorebi Coffee Roasters
            </h3>
            <p className="text-xs text-[#A89C8F] leading-relaxed max-w-sm">
              Artisanal specialty coffee roasters, sourdough bakery, and architectural gathering space in Portland's Arts District.
            </p>
            <div className="text-xs text-[#A89C8F] pt-2 space-y-1">
              <div>428 Sunburst Avenue, Portland, OR 97209</div>
              <div>hello@komorebicoffee.com · (503) 555-0148</div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-[#D4A373] font-semibold">
              Explore
            </div>
            <ul className="text-xs space-y-2">
              <li><a href="#menu" className="hover:text-white transition-colors">Cafe Menu</a></li>
              <li><a href="#roastery" className="hover:text-white transition-colors">Micro-Batch Roastery</a></li>
              <li><a href="#reservations" className="hover:text-white transition-colors">Table Bookings</a></li>
              <li><a href="#space" className="hover:text-white transition-colors">Our Space & Wi-Fi</a></li>
              <li><a href="#hours" className="hover:text-white transition-colors">Hours & Directions</a></li>
            </ul>
          </div>

          {/* Service Hours Summary */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-[#D4A373] font-semibold">
              Daily Service
            </div>
            <div className="text-xs text-[#A89C8F] space-y-2">
              <div>
                <strong className="text-white block">Monday – Friday</strong>
                7:00 AM – 7:00 PM (Kitchen until 3:30 PM)
              </div>
              <div>
                <strong className="text-white block">Saturday & Sunday</strong>
                8:00 AM – 8:00 PM (Kitchen until 4:00 PM)
              </div>
            </div>
          </div>

          {/* Newsletter for Micro-Lots */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-[#D4A373] font-semibold">
              The Micro-Lot Dispatch
            </div>
            <p className="text-xs text-[#A89C8F]">
              Monthly release notices for rare single-origin drops, cupping classes, and seasonal viennoiserie.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#3D3732] rounded-md text-xs text-white flex items-center gap-2">
                <Check className="w-4 h-4 text-[#D4A373]" />
                <span>Thank you. You are on the dispatch list.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#302B26] border border-[#4A423A] rounded-md text-white placeholder:text-[#8A7B6E] focus:outline-none focus:border-[#D4A373]"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-[#D4A373] text-[#24211E] text-xs font-semibold rounded-md hover:bg-[#E0B285] transition-colors shrink-0 cursor-pointer"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Quiet copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8A7B6E] gap-4">
          <div>
            © {new Date().getFullYear()} Komorebi Coffee & Roastery. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#D9CFC4] cursor-pointer">SCA Member #8491</span>
            <span className="hover:text-[#D9CFC4] cursor-pointer">Direct Trade Verified</span>
            <span className="hover:text-[#D9CFC4] cursor-pointer">100% Compostable Packaging</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
