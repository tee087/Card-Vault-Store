import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { Product } from '@/types';

interface RecentlyViewedContextType {
  recentlyViewed: Product[];
  addViewed: (product: Product) => void;
  clearViews: () => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined);

export function RecentlyViewedProvider({ children }: { children: React.ReactNode }) {
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('cardvault_recently_viewed');
    if (saved) {
      setRecentlyViewed(JSON.parse(saved));
    }
  }, []);

  const addViewed = useCallback((product: Product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      const updated = [product, ...filtered].slice(0, 20);
      localStorage.setItem('cardvault_recently_viewed', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearViews = useCallback(() => {
    setRecentlyViewed([]);
    localStorage.removeItem('cardvault_recently_viewed');
  }, []);

  return (
    <RecentlyViewedContext.Provider value={{ recentlyViewed, addViewed, clearViews }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext);
  if (context === undefined) {
    throw new Error('useRecentlyViewed must be used within a RecentlyViewedProvider');
  }
  return context;
}