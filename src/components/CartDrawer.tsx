import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, CheckCircle2, Clock, MapPin, Coffee, Sparkles } from 'lucide-react';
import { CartItem } from '../types/cafe';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [pickupTime, setPickupTime] = useState('In 15 minutes');
  const [tipRate, setTipRate] = useState<number>(0.18);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  // Calculation
  const subtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const tax = subtotal * 0.0825;
  const tipAmount = subtotal * tipRate;
  const total = subtotal + tax + tipAmount;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      alert('Please provide your name and phone number for pickup alerts.');
      return;
    }
    const generatedOrderNum = `KOM-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderNumber(generatedOrderNum);
    setOrderConfirmed(true);
  };

  const handleStartNewOrder = () => {
    onClearCart();
    setOrderConfirmed(false);
    setCustomerName('');
    setCustomerPhone('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#E0D5C7] shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 border-b border-[#E8DFD5] flex items-center justify-between bg-[#F4ECE3]">
            <div className="flex items-center gap-2">
              <Coffee className="w-5 h-5 text-[#8A6342]" />
              <h2 className="text-xl font-serif font-bold text-[#24211E]">
                {orderConfirmed ? 'Order Confirmed' : 'Your Cafe Bag'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#5A5147] hover:text-[#24211E] hover:bg-[#EBE2D5] rounded-md transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          {orderConfirmed ? (
            /* Order Success View */
            <div className="flex-1 p-6 overflow-y-auto space-y-6 text-center">
              <div className="w-16 h-16 bg-[#24211E] text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8 text-[#D4A373]" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest font-mono text-[#8A6342] font-semibold">
                  Pickup Order Verified
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#24211E] mt-1">
                  We're Brewing Your Order
                </h3>
                <div className="inline-block mt-3 px-4 py-1.5 bg-[#F0EAE1] border border-[#DDD3C7] rounded-md font-mono text-sm font-bold text-[#24211E]">
                  Order #{orderNumber}
                </div>
              </div>

              {/* Status Stepper */}
              <div className="bg-[#FFFDF9] border border-[#E8DFD5] rounded-lg p-4 text-left space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-[#24211E]">
                  <span>Status: Preparing</span>
                  <span className="font-mono text-[#8A6342]">{pickupTime}</span>
                </div>
                <div className="w-full bg-[#EAE2D8] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#8A6342] h-full w-2/3 animate-pulse rounded-full" />
                </div>
                <div className="flex items-center gap-2 text-xs text-[#6E6153] pt-1">
                  <Clock className="w-3.5 h-3.5 text-[#8A6342]" />
                  <span>SMS alert sent to {customerPhone} when ready.</span>
                </div>
              </div>

              {/* Pickup location info */}
              <div className="bg-[#F4ECE3] rounded-lg p-4 text-left space-y-1 text-xs">
                <div className="font-semibold text-[#24211E] flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#8A6342]" />
                  <span>Pickup Counter Location</span>
                </div>
                <p className="text-[#5A5147] pl-5">
                  Komorebi Cafe & Roastery<br />
                  428 Sunburst Avenue, Arts District, Portland<br />
                  Show order #{orderNumber} to our barista.
                </p>
              </div>

              <button
                onClick={handleStartNewOrder}
                className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#24211E] rounded-md hover:bg-[#3D3732] transition-colors cursor-pointer"
              >
                Back to Menu
              </button>
            </div>
          ) : cartItems.length === 0 ? (
            /* Empty State */
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <Coffee className="w-12 h-12 text-[#C4B5A5] mb-3" />
              <h3 className="text-xl font-serif font-bold text-[#24211E]">Your bag is quiet</h3>
              <p className="text-xs text-[#7A6C5D] mt-1 max-w-xs leading-relaxed">
                Add an artisan flat white, fresh sourdough croissant, or a bag of single-origin roast.
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-2.5 bg-[#24211E] text-white text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-[#3D3732] transition-colors cursor-pointer"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            /* Order in Progress */
            <div className="flex-1 flex flex-col overflow-hidden">
              
              {/* Itemized List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-[#EDE5DB]">
                {cartItems.map((item) => (
                  <div key={item.id} className="pt-4 first:pt-0 flex gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2">
                        <h4 className="text-sm font-serif font-bold text-[#24211E] truncate">
                          {item.menuItem.name}
                        </h4>
                        <span className="text-xs font-mono font-bold text-[#24211E] tabular-nums shrink-0">
                          ${(item.unitPrice * item.quantity).toFixed(2)}
                        </span>
                      </div>

                      {/* Line customization notes */}
                      <div className="text-[11px] text-[#7A6C5D] mt-0.5 space-y-0.5">
                        {item.size && <div>Size: {item.size}</div>}
                        {item.milkOption && item.milkOption !== 'No Milk' && <div>Milk: {item.milkOption}</div>}
                        {item.temperature && <div>Temp: {item.temperature.split(' ')[0]}</div>}
                        {item.sweetness && item.sweetness !== 'Unsweetened (Standard)' && <div>Sweet: {item.sweetness}</div>}
                        {item.grind && <div>Grind: {item.grind}</div>}
                        {item.notes && <div className="italic text-[#8A6342]">Note: "{item.notes}"</div>}
                      </div>

                      {/* Quantity Stepper & Remove */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-[#D9CFC4] bg-white rounded-md">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1.5 text-[#5A5147] hover:text-[#24211E] hover:bg-[#F2ECE3] transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-mono font-bold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1.5 text-[#5A5147] hover:text-[#24211E] hover:bg-[#F2ECE3] transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-[11px] text-[#8A7B6E] hover:text-red-700 flex items-center gap-1 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pickup timing & Customer info form */}
              <form onSubmit={handleCheckout} className="p-5 bg-[#F4ECE3] border-t border-[#E8DFD5] space-y-4">
                
                {/* Pickup Time Selector */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#24211E] mb-1">
                    Pickup Time
                  </label>
                  <select
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-[#D9CFC4] rounded-md text-[#24211E] focus:outline-none focus:ring-1 focus:ring-[#8A6342]"
                  >
                    <option value="In 15 minutes">In 15 minutes (Standard)</option>
                    <option value="In 30 minutes">In 30 minutes</option>
                    <option value="In 45 minutes">In 45 minutes</option>
                    <option value="Today at 11:30 AM">Today at 11:30 AM</option>
                    <option value="Today at 2:00 PM">Today at 2:00 PM</option>
                  </select>
                </div>

                {/* Customer Details */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#24211E] mb-0.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jordan Miller"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#D9CFC4] rounded-md text-[#24211E] focus:outline-none focus:ring-1 focus:ring-[#8A6342]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#24211E] mb-0.5">
                      SMS Phone #
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(503) 555-0192"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#D9CFC4] rounded-md text-[#24211E] focus:outline-none focus:ring-1 focus:ring-[#8A6342]"
                    />
                  </div>
                </div>

                {/* Barista Tip selection */}
                <div>
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#24211E] mb-1">
                    <span>Barista Tip</span>
                    <span className="font-mono font-normal text-[#7A6C5D] tabular-nums">${tipAmount.toFixed(2)}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[
                      { rate: 0.15, label: '15%' },
                      { rate: 0.18, label: '18%' },
                      { rate: 0.20, label: '20%' },
                      { rate: 0.0, label: 'None' },
                    ].map((t) => (
                      <button
                        key={t.label}
                        type="button"
                        onClick={() => setTipRate(t.rate)}
                        className={`py-1 text-xs font-medium rounded-md border text-center transition-colors cursor-pointer ${
                          tipRate === t.rate
                            ? 'bg-[#24211E] text-white border-[#24211E]'
                            : 'bg-white text-[#5A5147] border-[#D9CFC4] hover:border-[#8A6342]'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Financial Math with Tabular Numerals */}
                <div className="space-y-1 text-xs text-[#5A5147] pt-2 border-t border-[#DDD3C7] font-mono tabular-nums">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>State & Local Tax (8.25%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  {tipAmount > 0 && (
                    <div className="flex justify-between">
                      <span>Barista Tip</span>
                      <span>${tipAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-sm text-[#24211E] pt-1 border-t border-[#DDD3C7]">
                    <span>Total Due for Pickup</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Primary Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#24211E] text-white text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-[#3D3732] active:translate-y-0.5 transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Place Pickup Order</span>
                  <span className="font-mono tabular-nums font-bold">· ${total.toFixed(2)}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
