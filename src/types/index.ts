export interface StockOption {
  price: number;
  balance: number;
  stock: number;
  quality?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'cards' | 'ccs' | 'logs' | 'accounts' | 'tools' | 'fullz' | 'daily-drops' | 'spamming-course' | 'hacking-course';
  badge?: string;
  features: string[];
  stock: number;
  rating: number;
  reviews: number;
  image?: string;
  stockOptions?: StockOption[];
  location?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

export interface Order {
  id: string;
  productName: string;
  price: number;
  status: 'completed' | 'pending' | 'failed';
  createdAt: string;
  details?: string;
}

export type Category = 'all' | 'cards' | 'ccs' | 'logs' | 'accounts' | 'tools' | 'fullz' | 'daily-drops' | 'spamming-course' | 'hacking-course';
