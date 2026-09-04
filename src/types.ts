export interface Product {
  id: string;
  name: string;
  origin: string;
  country: string;
  region: string;
  altitude: string;
  process: 'Washed' | 'Natural' | 'Honey' | 'Wet-Hulled';
  score: number;
  tastingNotes: string[];
  prices: {
    '1lb': number;
    '2lb': number;
    '5lb': number;
  };
  sealType: string;
  harvestDate: string;
  image: string;
  badge?: string;
  description: string;
  moistureContent: string;
  screenSize: string;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  weight: '1lb' | '2lb' | '5lb';
  quantity: number;
}

export interface TrustItem {
  icon: string;
  title: string;
  description: string;
}

export type PageView = 'home' | 'shop' | 'about' | 'blog' | 'contact' | 'checkout';

export interface OrderDetails {
  orderId: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    deliveryNotes?: string;
  };
  deliveryMethod: 'standard' | 'express';
  paymentMethod: 'paystack' | 'bank_transfer' | 'ussd' | 'pay_on_delivery';
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  createdAt: string;
}
