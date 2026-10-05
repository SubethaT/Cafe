import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Check, Coffee } from 'lucide-react';
import { MenuItem, CartItem } from '../types/cafe';

interface ItemCustomizeModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
}

export const ItemCustomizeModal: React.FC<ItemCustomizeModalProps> = ({
  item,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  if (!isOpen || !item) return null;

  const isCoffeeDrink = item.category === 'espresso' || item.category === 'pourover' || item.category === 'cold_drinks';
  const isBeanBag = !!item.isBeanBag;

  // State
  const [size, setSize] = useState<'Regular (8oz)' | 'Large (12oz)' | 'Carafe (16oz)'>('Regular (8oz)');
  const [milkOption, setMilkOption] = useState<'Whole Organic Milk' | 'Oatly Barista Edition' | 'House Almond-Cashew' | 'No Milk'>(
    item.category === 'pourover' ? 'No Milk' : 'Whole Organic Milk'
  );
  const [sweetness, setSweetness] = useState<'Unsweetened (Standard)' | 'Subtle Demerara (1 Pump)' | 'Vanilla Bean Infusion'>('Unsweetened (Standard)');
  const [temperature, setTemperature] = useState<'Hot (65°C Barista Standard)' | 'Extra Hot (72°C)' | 'Iced (Over Clear Ice)'>(
    item.category === 'cold_drinks' ? 'Iced (Over Clear Ice)' : 'Hot (65°C Barista Standard)'
  );
  const [grind, setGrind] = useState<string>(item.availableGrinds?.[0] || 'Whole Bean (Recommended)');
  const [notes, setNotes] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Reset when item changes
  useEffect(() => {
    if (item) {
      setSize('Regular (8oz)');
      setMilkOption(item.category === 'pourover' ? 'No Milk' : 'Whole Organic Milk');
      setSweetness('Unsweetened (Standard)');
      setTemperature(item.category === 'cold_drinks' ? 'Iced (Over Clear Ice)' : 'Hot (65°C Barista Standard)');
      setGrind(item.availableGrinds?.[0] || 'Whole Bean (Recommended)');
      setNotes('');
      setQuantity(1);
    }
  }, [item]);

  // Compute unit price
  let unitPrice = item.price;
  if (size === 'Large (12oz)') unitPrice += 0.85;
  if (size === 'Carafe (16oz)') unitPrice += 1.75;
  if (milkOption === 'Oatly Barista Edition') unitPrice += 0.80;
  if (milkOption === 'House Almond-Cashew') unitPrice += 0.90;
  if (sweetness === 'Vanilla Bean Infusion') unitPrice += 0.75;

  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    const cartItem: CartItem = {
      id: `${item.id}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      menuItem: item,
      size: isCoffeeDrink ? size : undefined,
      milkOption: isCoffeeDrink ? milkOption : undefined,
      sweetness: isCoffeeDrink ? sweetness : undefined,
      temperature: isCoffeeDrink ? temperature : undefined,
      grind: isBeanBag ? grind : undefined,
      notes: notes.trim() || undefined,
      quantity,
      unitPrice,
    };
    onAddToCart(cartItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-[#FAF8F5] border border-[#E0D5C7] rounded-xl max-w-lg w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="relative p-6 pb-4 border-b border-[#E8DFD5] flex items-start justify-between bg-[#F4ECE3]">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#8A6342] font-semibold">
              {item.category.replace('_', ' ')}
            </div>
            <h3 id="modal-title" className="text-2xl font-serif font-bold text-[#24211E] mt-0.5">
              {item.name}
            </h3>
            <div className="text-sm font-semibold font-mono text-[#5A5147] mt-1 tabular-nums">
              ${item.price.toFixed(2)} Base
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#5A5147] hover:text-[#24211E] hover:bg-[#EBE2D5] rounded-md transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          <p className="text-sm text-[#5A5147] leading-relaxed">
            {item.description}
          </p>

          {item.tastingNotes && item.tastingNotes.length > 0 && (
            <div className="text-xs text-[#7A6C5D] flex flex-wrap items-center gap-1.5 font-medium">
              <span className="text-[#24211E] font-semibold">Profile:</span>
              {item.tastingNotes.map((note, idx) => (
                <React.Fragment key={note}>
                  <span>{note}</span>
                  {idx < item.tastingNotes!.length - 1 && <span aria-hidden="true">·</span>}
                </React.Fragment>
              ))}
            </div>
          )}

          {/* Drink Customization */}
          {isCoffeeDrink && (
            <>
              {/* Size selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#24211E] mb-2">
                  Serving Size
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Regular (8oz)', 'Large (12oz)', 'Carafe (16oz)'] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSize(s)}
                      className={`px-3 py-2 text-xs font-medium rounded-md border text-center transition-all cursor-pointer ${
                        size === s
                          ? 'border-[#24211E] bg-[#24211E] text-white shadow-xs'
                          : 'border-[#D9CFC4] bg-white text-[#5A5147] hover:border-[#8A6342]'
                      }`}
                    >
                      <span className="block truncate">{s.split(' ')[0]}</span>
                      <span className="text-[10px] block opacity-80">
                        {s === 'Regular (8oz)' ? 'Included' : s === 'Large (12oz)' ? '+$0.85' : '+$1.75'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Milk Option */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#24211E] mb-2">
                  Milk & Plant Craft
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {([
                    { id: 'Whole Organic Milk', label: 'Whole Milk', sub: 'Standard' },
                    { id: 'Oatly Barista Edition', label: 'Oatly Barista', sub: '+$0.80' },
                    { id: 'House Almond-Cashew', label: 'House Almond', sub: '+$0.90' },
                    { id: 'No Milk', label: 'Black / Neat', sub: 'Pure clarity' },
                  ] as const).map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMilkOption(m.id)}
                      className={`p-2.5 text-xs text-left rounded-md border transition-all cursor-pointer flex justify-between items-center ${
                        milkOption === m.id
                          ? 'border-[#24211E] bg-[#24211E] text-white shadow-xs'
                          : 'border-[#D9CFC4] bg-white text-[#5A5147] hover:border-[#8A6342]'
                      }`}
                    >
                      <div>
                        <div className="font-semibold">{m.label}</div>
                        <div className={`text-[10px] ${milkOption === m.id ? 'text-white/80' : 'text-[#7A6C5D]'}`}>
                          {m.sub}
                        </div>
                      </div>
                      {milkOption === m.id && <Check className="w-4 h-4 ml-1" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Temperature & Sweetness */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#24211E] mb-2">
                    Temperature
                  </label>
                  <select
                    value={temperature}
                    onChange={(e) => setTemperature(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#D9CFC4] rounded-md text-[#24211E] focus:outline-none focus:ring-1 focus:ring-[#8A6342]"
                  >
                    <option value="Hot (65°C Barista Standard)">Hot (65°C Standard)</option>
                    <option value="Extra Hot (72°C)">Extra Hot (72°C)</option>
                    <option value="Iced (Over Clear Ice)">Iced (Over Clear Ice)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#24211E] mb-2">
                    Sweetness
                  </label>
                  <select
                    value={sweetness}
                    onChange={(e) => setSweetness(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#D9CFC4] rounded-md text-[#24211E] focus:outline-none focus:ring-1 focus:ring-[#8A6342]"
                  >
                    <option value="Unsweetened (Standard)">Unsweetened (Standard)</option>
                    <option value="Subtle Demerara (1 Pump)">Subtle Demerara</option>
                    <option value="Vanilla Bean Infusion">Bourbon Vanilla (+$0.75)</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {/* Bean bag grind choice */}
          {isBeanBag && item.availableGrinds && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#24211E] mb-2">
                Grind Preference
              </label>
              <div className="space-y-2">
                {item.availableGrinds.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGrind(g)}
                    className={`w-full p-2.5 text-xs text-left rounded-md border transition-all cursor-pointer flex justify-between items-center ${
                      grind === g
                        ? 'border-[#24211E] bg-[#24211E] text-white'
                        : 'border-[#D9CFC4] bg-white text-[#5A5147] hover:border-[#8A6342]'
                    }`}
                  >
                    <span>{g}</span>
                    {grind === g && <Check className="w-4 h-4 ml-1" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Barista Notes */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#24211E] mb-1.5">
              Special Barista Instructions (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Extra hot, light ice, warm croissant..."
              maxLength={120}
              className="w-full px-3 py-2 text-xs bg-white border border-[#D9CFC4] rounded-md text-[#24211E] focus:outline-none focus:ring-1 focus:ring-[#8A6342]"
            />
          </div>
        </div>

        {/* Footer with quantity & add */}
        <div className="p-4 sm:p-6 bg-[#F4ECE3] border-t border-[#E8DFD5] flex items-center justify-between gap-4">
          <div className="flex items-center border border-[#D9CFC4] bg-white rounded-md">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 text-[#5A5147] hover:text-[#24211E] hover:bg-[#F2ECE3] transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-3 text-xs font-mono font-bold text-[#24211E] tabular-nums">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 text-[#5A5147] hover:text-[#24211E] hover:bg-[#F2ECE3] transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="flex-1 py-3 px-5 bg-[#24211E] text-white text-xs sm:text-sm font-semibold tracking-wide rounded-md hover:bg-[#3D3732] active:translate-y-0.5 transition-all shadow-sm flex items-center justify-between cursor-pointer"
          >
            <span>Add to Order</span>
            <span className="font-mono tabular-nums font-bold">${totalPrice.toFixed(2)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
