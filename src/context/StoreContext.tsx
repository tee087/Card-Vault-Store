import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { Product, Order } from '@/types';
import { products as initialProducts } from '@/data/products';

interface ProductStore {
  products: Product[];
  orders: Order[];
  reduceStock: (productId: string, quantity: number) => void;
  restoreStock: (productId: string, quantity: number) => void;
  reduceOptionStock: (productId: string, price: number, quantity: number) => void;
  restoreOptionStock: (productId: string, price: number, quantity: number) => void;
  getProductStock: (productId: string) => number;
  refreshProducts: () => void;
  logout: () => void;
  createOrder: (product: Product, price: number) => void;
}

const StoreContext = createContext<ProductStore | undefined>(undefined);

// Generate random stock for products (10-50)
const generateRandomStock = () => Math.floor(Math.random() * 41) + 10;

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => 
    initialProducts.map(p => ({
      ...p,
      stock: generateRandomStock()
    }))
  );
  
  const [orders, setOrders] = useState<Order[]>([]);

  // Auto generate anonymous user
  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');

    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const logout = useCallback(() => {
    // No logout needed for anonymous system
  }, []);

  const createOrder = useCallback((product: Product, price: number) => {
    const newOrder: Order = {
      id: Date.now().toString(),
      productName: product.name,
      price,
      status: 'completed',
      createdAt: new Date().toISOString()
    };
    setOrders(prev => [newOrder, ...prev]);
  }, []);

  const reduceStock = useCallback((productId: string, quantity: number) => {
    setProducts(prev => 
      prev.map(p => {
        if (p.id === productId) {
          const newStock = Math.max(0, p.stock - quantity);
          return { ...p, stock: newStock };
        }
        return p;
      })
    );
  }, []);

  const restoreStock = useCallback((productId: string, quantity: number) => {
    setProducts(prev => 
      prev.map(p => {
        if (p.id === productId) {
          return { ...p, stock: p.stock + quantity };
        }
        return p;
      })
    );
  }, []);

  // Reduce stock for a specific price option
  const reduceOptionStock = useCallback((productId: string, price: number, quantity: number) => {
    setProducts(prev => 
      prev.map(p => {
        if (p.id === productId && p.stockOptions) {
          const newOptions = p.stockOptions.map(opt => {
            if (opt.price === price) {
              return { ...opt, stock: Math.max(0, opt.stock - quantity) };
            }
            return opt;
          });
          // Also reduce total stock
          const totalOptionStock = newOptions.reduce((sum, opt) => sum + opt.stock, 0);
          return { ...p, stockOptions: newOptions, stock: totalOptionStock };
        }
        return p;
      })
    );
  }, []);

  // Restore stock for a specific price option
  const restoreOptionStock = useCallback((productId: string, price: number, quantity: number) => {
    setProducts(prev => 
      prev.map(p => {
        if (p.id === productId && p.stockOptions) {
          const newOptions = p.stockOptions.map(opt => {
            if (opt.price === price) {
              return { ...opt, stock: opt.stock + quantity };
            }
            return opt;
          });
          // Also restore total stock
          const totalOptionStock = newOptions.reduce((sum, opt) => sum + opt.stock, 0);
          return { ...p, stockOptions: newOptions, stock: totalOptionStock };
        }
        return p;
      })
    );
  }, []);

  const getProductStock = useCallback((productId: string) => {
    const product = products.find(p => p.id === productId);
    return product?.stock ?? 0;
  }, [products]);

  const refreshProducts = useCallback(() => {
    setProducts(prev => 
      prev.map(p => ({
        ...p,
        stock: p.stock === 0 ? generateRandomStock() : p.stock
      }))
    );
  }, []);

  return (
    <StoreContext.Provider value={{
      products,
      orders,
      reduceStock,
      restoreStock,
      reduceOptionStock,
      restoreOptionStock,
      getProductStock,
      refreshProducts,
      logout,
      createOrder
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
