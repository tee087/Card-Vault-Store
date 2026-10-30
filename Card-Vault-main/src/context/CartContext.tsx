import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Product, CartItem } from '@/types';
import { sendTelegramNotification } from '@/lib/telegram';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  cashoutInstructions: Record<string, boolean>;
  toggleCashoutInstructions: (productId: string) => void;
  getCashoutPrice: (category: string) => number;
  usageTypes: Record<string, string>;
  setUsageType: (productId: string, usageType: string) => void;
  getUsageTypeOptions: (category: string) => string[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [cashoutInstructions, setCashoutInstructions] = useState<Record<string, boolean>>({});
  const [usageTypes, setUsageTypes] = useState<Record<string, string>>({});

  const addToCart = useCallback((product: Product) => {
    setItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsOpen(true);
    
    // Send Telegram notification
    sendTelegramNotification('CART_ITEM_ADDED', {
      productName: product.name,
      productPrice: product.price,
      quantity: 1
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setItems(prev => prev.filter(item => item.id !== productId));
    
    // Send Telegram notification
    sendTelegramNotification('CART_ITEM_REMOVED', {
      productName: productId
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    // Get cart items before clearing for notification
    const cartItems = items.map(item => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity
    }));
    
    if (cartItems.length > 0) {
      const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      
      // Send Telegram notification for checkout
      sendTelegramNotification('CHECKOUT_COMPLETED', {
        cartItems: cartItems,
        total: total
      });
    }
    
    setItems([]);
    setCashoutInstructions({});
    setUsageTypes({});
  }, [items]);

  const toggleCashoutInstructions = useCallback((productId: string) => {
    setCashoutInstructions(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  }, []);

  const getCashoutPrice = useCallback((category: string) => {
    return category === 'tools' ? 8 : 5;
  }, []);

  const setUsageType = useCallback((productId: string, usageType: string) => {
    setUsageTypes(prev => ({
      ...prev,
      [productId]: usageType
    }));
  }, []);

  const getUsageTypeOptions = useCallback((category: string) => {
    if (category === 'cards') {
      return [
        'Online Shopping',
        'Cashapp Linkable',
        'Paypal Linkable',
        'Venmo Linkable',
        'Zelle Linkable',
        'Skrill Linkable',
        'Apple Pay Linkable',
        'Google Pay Linkable',
        'In-Store Purchases',
        'International Transactions'
      ];
    }
    if (category === 'ccs') {
      return [
        'Online Shopping',
        'Cashapp Linkable',
        'Paypal Linkable',
        'Venmo Linkable',
        'Zelle Linkable',
        'Skrill Linkable',
        'Apple Pay Linkable',
        'Google Pay Linkable',
        'In-Store Purchases',
        'International Transactions'
      ];
    }
    return [];
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => {
    const itemTotal = item.price * item.quantity;
    const cashoutCost = cashoutInstructions[item.id] ? getCashoutPrice(item.category) : 0;
    return sum + itemTotal + cashoutCost;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isOpen,
        setIsOpen,
        cashoutInstructions,
        toggleCashoutInstructions,
        getCashoutPrice,
        usageTypes,
        setUsageType,
        getUsageTypeOptions
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
