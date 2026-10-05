import React, { useState } from 'react';
import { ShoppingBag, Menu as MenuIcon, X, Calendar, MapPin, Clock } from 'lucide-react';
import { CartItem } from '../types/cafe';

interface NavbarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  onOpenReservation: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItems,
  onOpenCart,
  onOpenReservation,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8DFD5] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Zone 1: Single element brand wordmark */}
        <a 
          href="#home" 
          className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-[#24211E] hover:text-[#7A583A] transition-colors"
        >
          Komorebi Coffee Roasters
        </a>

        {/* Zone 2: 4-6 nav links, 1-2 word labels, single-line text */}
        <nav className="hidden lg:flex items-center gap-8 text-[14px] font-medium text-[#5C544D]">
          <a href="#menu" className="hover:text-[#24211E] transition-colors py-1 relative hover:underline underline-offset-8">
            Menu
          </a>
          <a href="#roastery" className="hover:text-[#24211E] transition-colors py-1 relative hover:underline underline-offset-8">
            Roastery & Beans
          </a>
          <a href="#reservations" className="hover:text-[#24211E] transition-colors py-1 relative hover:underline underline-offset-8">
            Reserve Table
          </a>
          <a href="#space" className="hover:text-[#24211E] transition-colors py-1 relative hover:underline underline-offset-8">
            Our Space
          </a>
          <a href="#hours" className="hover:text-[#24211E] transition-colors py-1 relative hover:underline underline-offset-8">
            Hours & Location
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenReservation}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#24211E] border border-[#C8B8A6] rounded-md hover:bg-[#F2ECE3] transition-colors whitespace-nowrap cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[#8A6342]" />
            Reserve Table
          </button>

          <button
            onClick={onOpenCart}
            aria-label="Shopping bag"
            className="relative p-2.5 text-[#24211E] hover:text-[#7A583A] hover:bg-[#F2ECE3] rounded-md transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#8A6342] text-white text-[11px] font-mono tabular-nums font-semibold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#24211E] hover:bg-[#F2ECE3] rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8DFD5] bg-[#FAF8F5] px-6 py-6 space-y-4 shadow-lg animate-in slide-in-from-top duration-150">
          <div className="flex flex-col space-y-3 text-base font-medium text-[#5C544D]">
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#24211E] border-b border-[#F0EAE1]"
            >
              Curated Menu & Ordering
            </a>
            <a
              href="#roastery"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#24211E] border-b border-[#F0EAE1]"
            >
              Roastery & Single-Origin Beans
            </a>
            <a
              href="#reservations"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="py-2 hover:text-[#24211E] border-b border-[#F0EAE1]"
            >
              Table & Tasting Reservations
            </a>
            <a
              href="#space"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#24211E] border-b border-[#F0EAE1]"
            >
              Our Architectural Space
            </a>
            <a
              href="#hours"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#24211E]"
            >
              Hours, Location & Map
            </a>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full py-3 text-sm font-semibold uppercase tracking-wider text-white bg-[#24211E] rounded-md hover:bg-[#3D3732] transition-colors"
            >
              Book a Tasting Table
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
