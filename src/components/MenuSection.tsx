import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Plus, Coffee, Info, SlidersHorizontal } from 'lucide-react';
import { MenuItem } from '../types/cafe';
import { MENU_ITEMS } from '../data/cafeData';

interface MenuSectionProps {
  onSelectItem: (item: MenuItem) => void;
}

type MenuCategory = 'all' | 'espresso' | 'pourover' | 'cold_drinks' | 'bakery' | 'brunch';
type DietaryFilter = 'all' | 'vegan' | 'gluten-free' | 'nut-free';

export const MenuSection: React.FC<MenuSectionProps> = ({ onSelectItem }) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('all');
  const [dietaryFilter, setDietaryFilter] = useState<DietaryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const categories: { id: MenuCategory; label: string }[] = [
    { id: 'all', label: 'Full Menu' },
    { id: 'espresso', label: 'Espresso & Milk' },
    { id: 'pourover', label: 'Single-Origin Pour-Overs' },
    { id: 'cold_drinks', label: 'Cold Brews & Tonics' },
    { id: 'bakery', label: 'Artisan Bakery' },
    { id: 'brunch', label: 'All-Day Kitchen' },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Dietary filter
      if (dietaryFilter !== 'all') {
        if (!item.dietary || !item.dietary.includes(dietaryFilter as any)) {
          return false;
        }
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesOrigin = item.origin?.toLowerCase().includes(query);
        const matchesNotes = item.tastingNotes?.some((n) => n.toLowerCase().includes(query));
        return matchesName || matchesDesc || matchesOrigin || matchesNotes;
      }
      return true;
    });
  }, [selectedCategory, dietaryFilter, searchQuery]);

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="menu" className="py-16 sm:py-24 bg-[#FAF8F5] border-t border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#E8DFD5] gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#8A6342] font-mono font-semibold mb-2">
              Daily Selection · Freshly Brewed & Baked
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#24211E] tracking-tight">
              Curated Cafe Menu
            </h2>
          </div>
          <p className="text-sm text-[#6E6153] max-w-md font-normal leading-relaxed">
            All drinks pulled on dialed-in mineral profiles. Bakery items baked every morning at 5:00 AM using stone-ground grains.
          </p>
        </div>

        {/* Filter Bar Controls */}
        <div className="space-y-4 mb-10">
          
          {/* Category Tabs (Functional segmented controls) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#24211E] text-white shadow-xs'
                    : 'bg-[#F2ECE3] text-[#5C544D] hover:text-[#24211E] hover:bg-[#EBE2D5]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search & Dietary Segment */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#8A7B6E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search coffee notes, pastries, ingredients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9.5 pr-4 py-2 text-xs bg-[#F2ECE3] border border-transparent focus:border-[#8A6342] rounded-md text-[#24211E] placeholder:text-[#8A7B6E] focus:outline-none focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8A7B6E] hover:text-[#24211E]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Dietary Filter Segmented buttons */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1">
              <span className="text-xs text-[#7A6C5D] font-mono mr-1 shrink-0">Dietary:</span>
              {(['all', 'vegan', 'gluten-free', 'nut-free'] as const).map((diet) => (
                <button
                  key={diet}
                  onClick={() => setDietaryFilter(diet)}
                  className={`px-2.5 py-1 text-[11px] font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer capitalize ${
                    dietaryFilter === diet
                      ? 'bg-[#8A6342] text-white'
                      : 'bg-[#F0EAE1] text-[#6E6153] hover:text-[#24211E]'
                  }`}
                >
                  {diet === 'all' ? 'All options' : diet}
                </button>
              ))}
            </div>

          </div>

        </div>

        {/* Product Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center bg-[#F4ECE3] rounded-xl border border-[#E0D5C7]">
            <Coffee className="w-8 h-8 text-[#8A6342] mx-auto mb-2 opacity-80" />
            <h3 className="text-lg font-serif font-bold text-[#24211E]">No items match your criteria</h3>
            <p className="text-xs text-[#6E6153] mt-1 max-w-sm mx-auto">
              Try adjusting your dietary filter or search query to browse our other seasonal offerings.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setDietaryFilter('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-1.5 text-xs font-semibold text-[#24211E] border border-[#24211E] rounded-md hover:bg-white transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => {
              const isImgFailed = failedImages[item.id];
              return (
                <article
                  key={item.id}
                  onClick={() => onSelectItem(item)}
                  className="group bg-[#FFFDF9] border border-[#E8DFD5] rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col cursor-pointer"
                >
                  {/* Lead with imagery */}
                  <div className="relative aspect-4/3 w-full bg-[#EBE4DA] overflow-hidden">
                    {!isImgFailed ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        onError={() => handleImageError(item.id)}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-[#EBE4DA] text-[#6E6153]">
                        <Coffee className="w-8 h-8 text-[#8A6342] mb-1" />
                        <span className="text-xs font-serif font-semibold text-[#24211E]">{item.name}</span>
                      </div>
                    )}

                    {/* Subtle roast or category label */}
                    {item.roastLevel && (
                      <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-xs text-[#24211E] text-[11px] font-mono px-2 py-0.5 rounded-sm">
                        {item.roastLevel} Roast
                      </div>
                    )}

                    {/* Quick Add overlay button */}
                    <div className="absolute bottom-3 right-3 opacity-90 group-hover:opacity-100 transition-opacity">
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#24211E] text-white text-xs font-medium rounded-md shadow-sm group-hover:bg-[#8A6342] transition-colors">
                        <Plus className="w-3.5 h-3.5" />
                        Customize
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      {/* Quiet unboxed metadata */}
                      {item.origin && (
                        <div className="text-[11px] font-mono uppercase tracking-wider text-[#8A6342] mb-1">
                          {item.origin}
                        </div>
                      )}

                      {/* Title & Price Header */}
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="text-lg font-serif font-bold text-[#24211E] group-hover:text-[#8A6342] transition-colors">
                          {item.name}
                        </h3>
                        <span className="text-sm font-bold font-mono text-[#24211E] tabular-nums shrink-0">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-[#5C544D] leading-relaxed line-clamp-2 mt-1.5">
                        {item.description}
                      </p>
                    </div>

                    {/* Footer metadata: tasting notes or dietary (zero pills) */}
                    <div className="pt-3 border-t border-[#F0EAE1] flex items-center justify-between text-[11px] text-[#7A6C5D]">
                      {item.tastingNotes && item.tastingNotes.length > 0 ? (
                        <div className="flex items-center gap-1.5 truncate">
                          {item.tastingNotes.slice(0, 3).map((note, idx) => (
                            <React.Fragment key={note}>
                              <span className="truncate">{note}</span>
                              {idx < Math.min(item.tastingNotes!.length - 1, 2) && (
                                <span aria-hidden="true" className="text-[#C4B5A5]">·</span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      ) : (
                        <span>Freshly baked daily</span>
                      )}

                      {item.calories && (
                        <span className="font-mono text-[#8A7B6E] tabular-nums shrink-0">
                          {item.calories} kcal
                        </span>
                      )}
                    </div>

                  </div>
                </article>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
