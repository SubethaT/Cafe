/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { RoasterySection } from './components/RoasterySection';
import { ReservationSection } from './components/ReservationSection';
import { SpaceAndLocationSection } from './components/SpaceAndLocationSection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ItemCustomizeModal } from './components/ItemCustomizeModal';
import { MenuItem, CartItem } from './types/cafe';
import { Check, ShoppingBag } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    // Initial delightful sample item to welcome user
    {
      id: 'initial-sample-flat-white',
      menuItem: {
        id: 'flat-white-signature',
        name: 'Artisan Flat White',
        category: 'espresso',
        price: 5.75,
        description: 'Double ristretto pulled on our custom Synesso MVP, textured with silky microfoam at 63°C.',
        image: '/src/assets/images/latte_art_ceramic_1791172474114.jpg',
        origin: 'Colombia Huila & Ethiopia Guji Blend',
        tastingNotes: ['Honeycomb', 'Dark Milk Chocolate', 'Orange Blossom'],
        dietary: ['nut-free'],
        roastLevel: 'Medium-Light',
      },
      size: 'Regular (8oz)',
      milkOption: 'Oatly Barista Edition',
      temperature: 'Hot (65°C Barista Standard)',
      sweetness: 'Unsweetened (Standard)',
      quantity: 1,
      unitPrice: 6.55,
    }
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAddToCart = (newItem: CartItem) => {
    setCartItems((prev) => {
      // Check if identical item configuration exists
      const existingIdx = prev.findIndex(
        (i) =>
          i.menuItem.id === newItem.menuItem.id &&
          i.size === newItem.size &&
          i.milkOption === newItem.milkOption &&
          i.sweetness === newItem.sweetness &&
          i.temperature === newItem.temperature &&
          i.grind === newItem.grind &&
          i.notes === newItem.notes
      );

      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx].quantity += newItem.quantity;
        return updated;
      }
      return [...prev, newItem];
    });

    // Show toast feedback
    setToastMessage(`Added "${newItem.menuItem.name}" to your bag`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#24211E] flex flex-col font-sans">
      
      {/* Top Banner Notice (Subtle, non-pill dismissible style) */}
      <div className="bg-[#24211E] text-[#D9CFC4] text-xs py-2 px-4 text-center font-mono tracking-wide">
        <span>Spring Micro-Lot Release: Panama Gesha & Anaerobic Costa Rica now on brew bar</span>
        <span className="hidden sm:inline mx-2 text-[#8A7B6E]">·</span>
        <button 
          onClick={() => scrollToSection('roastery')}
          className="text-[#D4A373] hover:underline font-semibold ml-1 cursor-pointer"
        >
          Explore Beans & Roast Dates →
        </button>
      </div>

      {/* Navigation */}
      <Navbar
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => scrollToSection('reservations')}
        activeSection="home"
      />

      {/* Main Content */}
      <main className="flex-1">
        <Hero
          onExploreMenu={() => scrollToSection('menu')}
          onBookTable={() => scrollToSection('reservations')}
        />

        <MenuSection
          onSelectItem={(item) => setSelectedItemForModal(item)}
        />

        <RoasterySection
          onSelectBean={(bean) => setSelectedItemForModal(bean)}
        />

        <ReservationSection />

        <SpaceAndLocationSection />

        <ReviewsSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Item Customization Modal */}
      <ItemCustomizeModal
        item={selectedItemForModal}
        isOpen={!!selectedItemForModal}
        onClose={() => setSelectedItemForModal(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Toast Feedback Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#24211E] text-white px-4 py-3 rounded-lg shadow-xl border border-[#4A423A] flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="w-5 h-5 rounded-full bg-[#D4A373] text-[#24211E] flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
          <span className="text-xs font-medium">{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="ml-2 text-xs font-semibold text-[#D4A373] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            View Bag
          </button>
        </div>
      )}

    </div>
  );
}
