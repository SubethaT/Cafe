import React, { useState } from 'react';
import { Calendar, Users, Clock, CheckCircle2, MapPin, Sparkles, AlertCircle } from 'lucide-react';
import { SEATING_AREAS } from '../data/cafeData';
import { TableReservation } from '../types/cafe';

interface ReservationSectionProps {
  onReservationComplete?: (res: TableReservation) => void;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({ onReservationComplete }) => {
  const [partySize, setPartySize] = useState<number>(2);
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState<string>('10:00 AM');
  const [seatingArea, setSeatingArea] = useState<'solarium' | 'brew_bar' | 'mezzanine' | 'courtyard'>('solarium');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [dietaryNotes, setDietaryNotes] = useState('');
  const [confirmedReservation, setConfirmedReservation] = useState<TableReservation | null>(null);

  const timeSlots = [
    '8:30 AM', '9:30 AM', '10:30 AM', '11:30 AM',
    '12:30 PM', '1:30 PM', '2:30 PM', '3:30 PM', '4:30 PM', '5:30 PM'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail || !guestPhone) {
      alert('Please fill out all required contact fields.');
      return;
    }

    const newRes: TableReservation = {
      id: `KOM-RES-${Math.floor(1000 + Math.random() * 9000)}`,
      guestName,
      guestEmail,
      guestPhone,
      partySize,
      date: selectedDate,
      timeSlot,
      seatingArea,
      dietaryNotes: dietaryNotes.trim() || undefined,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    setConfirmedReservation(newRes);
    if (onReservationComplete) {
      onReservationComplete(newRes);
    }
  };

  const handleReset = () => {
    setConfirmedReservation(null);
    setGuestName('');
    setGuestEmail('');
    setGuestPhone('');
    setDietaryNotes('');
  };

  return (
    <section id="reservations" className="py-16 sm:py-24 bg-[#FAF8F5] border-t border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase tracking-widest text-[#8A6342] font-mono font-semibold mb-2">
            Table & Brew Tasting Bookings
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#24211E] tracking-tight">
            Reserve a Table or Cupping Flight
          </h2>
          <p className="text-sm text-[#5C544D] mt-3 leading-relaxed">
            While walk-ins are always welcomed at our standing espresso bar, we recommend reserving a seated table 
            for leisurely weekend brunch, quiet work sessions, or curated 3-origin pour-over flights.
          </p>
        </div>

        {confirmedReservation ? (
          /* Confirmed Reservation Ticket View */
          <div className="max-w-2xl mx-auto bg-[#FFFDF9] border border-[#D9CFC4] rounded-2xl p-8 shadow-xl text-center animate-in fade-in duration-200">
            <div className="w-14 h-14 bg-[#24211E] text-[#D4A373] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs font-mono uppercase tracking-widest text-[#8A6342] font-semibold">
              Reservation Confirmed
            </span>
            <h3 className="text-2xl font-serif font-bold text-[#24211E] mt-1">
              We Look Forward to Welcoming You
            </h3>

            {/* Ticket Card */}
            <div className="mt-6 bg-[#F4ECE3] border border-[#E0D5C7] rounded-xl p-6 text-left space-y-4">
              <div className="flex items-center justify-between border-b border-[#DDD3C7] pb-3">
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#7A6C5D]">Booking Reference</div>
                  <div className="text-lg font-mono font-bold text-[#24211E]">{confirmedReservation.id}</div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#7A6C5D]">Guest</div>
                  <div className="text-sm font-semibold text-[#24211E]">{confirmedReservation.guestName}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-[#7A6C5D] block">Date</span>
                  <span className="font-semibold text-[#24211E]">{confirmedReservation.date}</span>
                </div>
                <div>
                  <span className="text-[#7A6C5D] block">Time</span>
                  <span className="font-semibold text-[#24211E]">{confirmedReservation.timeSlot}</span>
                </div>
                <div>
                  <span className="text-[#7A6C5D] block">Party Size</span>
                  <span className="font-semibold text-[#24211E]">{confirmedReservation.partySize} Guests</span>
                </div>
                <div>
                  <span className="text-[#7A6C5D] block">Seating</span>
                  <span className="font-semibold text-[#24211E] capitalize">
                    {confirmedReservation.seatingArea.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {confirmedReservation.dietaryNotes && (
                <div className="pt-2 text-xs text-[#5C544D] border-t border-[#DDD3C7]">
                  <span className="font-semibold text-[#24211E]">Notes: </span>
                  {confirmedReservation.dietaryNotes}
                </div>
              )}
            </div>

            <p className="text-xs text-[#7A6C5D] mt-6">
              A calendar invitation and confirmation SMS have been dispatched to {confirmedReservation.guestPhone}. 
              Tables are held for 15 minutes past reservation time.
            </p>

            <button
              onClick={handleReset}
              className="mt-6 px-6 py-2.5 bg-[#24211E] text-white text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-[#3D3732] transition-colors cursor-pointer"
            >
              Book Another Reservation
            </button>
          </div>
        ) : (
          /* Interactive Booking Form */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Column: Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-7 bg-[#FFFDF9] border border-[#E8DFD5] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              
              {/* Step 1: Party Size */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#24211E] mb-2.5 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#8A6342]" />
                  1. Party Size
                </label>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5, 6, 8].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setPartySize(size)}
                      className={`w-12 h-10 rounded-md border text-xs font-mono font-bold transition-all cursor-pointer ${
                        partySize === size
                          ? 'bg-[#24211E] text-white border-[#24211E] shadow-xs'
                          : 'bg-white text-[#5C544D] border-[#D9CFC4] hover:border-[#8A6342]'
                      }`}
                    >
                      {size} {size === 1 ? 'Guest' : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#24211E] mb-2 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#8A6342]" />
                    2. Date
                  </label>
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#D9CFC4] rounded-md text-[#24211E] focus:outline-none focus:ring-1 focus:ring-[#8A6342]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#24211E] mb-2 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#8A6342]" />
                    3. Time Slot
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#D9CFC4] rounded-md text-[#24211E] focus:outline-none focus:ring-1 focus:ring-[#8A6342]"
                  >
                    {timeSlots.map((ts) => (
                      <option key={ts} value={ts}>{ts}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Step 3: Seating Atmosphere */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#24211E] mb-2.5 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#8A6342]" />
                  4. Preferred Seating Zone
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {SEATING_AREAS.map((area) => (
                    <button
                      key={area.id}
                      type="button"
                      onClick={() => setSeatingArea(area.id as any)}
                      className={`p-3 text-left rounded-lg border transition-all cursor-pointer ${
                        seatingArea === area.id
                          ? 'bg-[#F4ECE3] border-[#8A6342] ring-1 ring-[#8A6342]'
                          : 'bg-white border-[#D9CFC4] hover:border-[#8A6342]'
                      }`}
                    >
                      <div className="font-serif font-bold text-sm text-[#24211E]">
                        {area.name}
                      </div>
                      <div className="text-[11px] text-[#7A6C5D] mt-0.5">
                        {area.subtitle}
                      </div>
                      <div className="text-[10px] font-mono text-[#8A6342] mt-1">
                        {area.noiseLevel}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 4: Guest Contact Details */}
              <div className="space-y-3 pt-2 border-t border-[#E8DFD5]">
                <div className="text-xs font-bold uppercase tracking-wider text-[#24211E]">
                  5. Contact Information
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Full Name *"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#D9CFC4] rounded-md text-[#24211E] focus:outline-none focus:ring-1 focus:ring-[#8A6342]"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Email Address *"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#D9CFC4] rounded-md text-[#24211E] focus:outline-none focus:ring-1 focus:ring-[#8A6342]"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="Mobile Phone *"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#D9CFC4] rounded-md text-[#24211E] focus:outline-none focus:ring-1 focus:ring-[#8A6342]"
                    />
                  </div>
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Occasion or dietary requests (e.g. coffee tasting flight, high chair, wheelchair access)"
                    value={dietaryNotes}
                    onChange={(e) => setDietaryNotes(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#D9CFC4] rounded-md text-[#24211E] focus:outline-none focus:ring-1 focus:ring-[#8A6342]"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 bg-[#24211E] text-white text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-[#3D3732] active:translate-y-0.5 transition-all shadow-sm cursor-pointer"
              >
                Confirm Table Reservation
              </button>

            </form>

            {/* Right Column: Zone Preview & Policies */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Selected Seating Zone Spotlight */}
              {(() => {
                const currentArea = SEATING_AREAS.find((a) => a.id === seatingArea) || SEATING_AREAS[0];
                return (
                  <div className="bg-[#F4ECE3] border border-[#E0D5C7] rounded-2xl p-6 space-y-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#8A6342] font-semibold">
                      Zone Focus
                    </span>
                    <h3 className="text-xl font-serif font-bold text-[#24211E]">
                      {currentArea.name}
                    </h3>
                    <p className="text-xs text-[#5C544D] leading-relaxed">
                      {currentArea.description}
                    </p>
                    <div className="pt-3 border-t border-[#DDD3C7] space-y-1 text-xs text-[#7A6C5D]">
                      <div><strong className="text-[#24211E]">Capacity:</strong> {currentArea.capacity}</div>
                      <div><strong className="text-[#24211E]">Vibe:</strong> {currentArea.noiseLevel}</div>
                    </div>
                  </div>
                );
              })()}

              {/* Reservation Policies */}
              <div className="bg-[#FFFDF9] border border-[#E8DFD5] rounded-2xl p-6 space-y-3 text-xs text-[#5C544D]">
                <h4 className="font-serif font-bold text-sm text-[#24211E]">
                  Reservation Courtesy & Guidelines
                </h4>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Standard table duration is 90 minutes for parties under 4.</li>
                  <li>Brew Bar reservations include complimentary consultation with our sensory lead.</li>
                  <li>Cancellations are flexible with no fee up to 2 hours before booking.</li>
                  <li>Dog companions are warmly hosted in the Garden Courtyard with fresh water bowls.</li>
                </ul>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
