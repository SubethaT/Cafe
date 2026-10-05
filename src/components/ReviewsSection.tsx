import React from 'react';
import { Star, Quote } from 'lucide-react';
import { CAFE_REVIEWS } from '../data/cafeData';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-[#F5EFEB] border-t border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-widest text-[#8A6342] font-mono font-semibold mb-2">
            Praise & Community Reflections
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#24211E] tracking-tight">
            Notes from Guests & Sensory Judges
          </h2>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CAFE_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#FFFDF9] border border-[#E8DFD5] rounded-xl p-6 flex flex-col justify-between shadow-xs hover:shadow-sm transition-shadow"
            >
              <div>
                {/* 5 star rating */}
                <div className="flex items-center gap-1 text-[#8A6342] mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                {/* Comment quote */}
                <p className="text-sm text-[#3D3732] leading-relaxed italic mb-6">
                  "{rev.comment}"
                </p>
              </div>

              {/* Attribution (Zero pills, clean typography) */}
              <div className="pt-4 border-t border-[#F0EAE1]">
                <div className="font-serif font-bold text-base text-[#24211E]">
                  {rev.author}
                </div>
                <div className="text-xs text-[#7A6C5D] mt-0.5">
                  <span>{rev.role}</span>
                  {rev.organization && (
                    <>
                      <span aria-hidden="true" className="mx-1 text-[#C4B5A5]">·</span>
                      <span>{rev.organization}</span>
                    </>
                  )}
                </div>
                <div className="text-[11px] text-[#8A7B6E] mt-1 font-mono">
                  Favorite: {rev.favoriteItem}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
