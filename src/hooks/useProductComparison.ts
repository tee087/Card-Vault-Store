import { useState, useCallback } from 'react';
import type { Product } from '@/types';

export function useProductComparison() {
  const [products, setProducts] = useState<Product[]>([]);

  const addToComparison = useCallback((product: Product) => {
    setProducts(prev => {
      if (prev.find(p => p.id === product.id)) return prev;
      return [...prev, product].slice(0, 2);
    });
  }, []);

  const removeFromComparison = useCallback((productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  }, []);

  const clearComparison = useCallback(() => {
    setProducts([]);
  }, []);

  const isComparing = (productId: string) => {
    return products.some(p => p.id === productId);
  };

  return {
    products,
    addToComparison,
    removeFromComparison,
    clearComparison,
    isComparing
  };
}