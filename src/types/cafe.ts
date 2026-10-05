export interface MenuItem {
  id: string;
  name: string;
  category: 'espresso' | 'pourover' | 'cold_drinks' | 'bakery' | 'brunch';
  price: number;
  description: string;
  image: string;
  origin?: string;
  tastingNotes?: string[];
  dietary?: ('vegan' | 'gluten-free' | 'nut-free' | 'dairy-free')[];
  featured?: boolean;
  calories?: number;
  roastLevel?: 'Light' | 'Medium-Light' | 'Medium' | 'Omni-Roast';
  isBeanBag?: boolean;
  availableGrinds?: string[];
}

export interface CartItem {
  id: string; // unique item cart instance id
  menuItem: MenuItem;
  size?: 'Regular (8oz)' | 'Large (12oz)' | 'Carafe (16oz)';
  milkOption?: 'Whole Organic Milk' | 'Oatly Barista Edition' | 'House Almond-Cashew' | 'No Milk';
  sweetness?: 'Unsweetened (Standard)' | 'Subtle Demerara (1 Pump)' | 'Vanilla Bean Infusion';
  temperature?: 'Hot (65°C Barista Standard)' | 'Extra Hot (72°C)' | 'Iced (Over Clear Ice)';
  grind?: string;
  notes?: string;
  quantity: number;
  unitPrice: number;
}

export interface TableReservation {
  id: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  partySize: number;
  date: string;
  timeSlot: string;
  seatingArea: 'solarium' | 'brew_bar' | 'mezzanine' | 'courtyard';
  specialOccasion?: string;
  dietaryNotes?: string;
  status: 'confirmed';
  createdAt: string;
}

export interface CoffeeReview {
  id: string;
  author: string;
  role: string;
  organization?: string;
  comment: string;
  rating: number;
  favoriteItem: string;
  date: string;
}
