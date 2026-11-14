import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { Product } from '@/types';

interface FavoritesContextType {
  favorites: Product[];
  addFav: (product: Product) => void;
  removeFav: (productId: string) => void;
  isFav: (productId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('cardvault_favorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const addFav = useCallback((product: Product) => {
    setFavorites(prev => {
      if (prev.find(p => p.id === product.id)) return prev;
      const updated = [...prev, product];
      localStorage.setItem('cardvault_favorites', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeFav = useCallback((productId: string) => {
    setFavorites(prev => {
      const updated = prev.filter(p => p.id !== productId);
      localStorage.setItem('cardvault_favorites', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const isFav = useCallback((productId: string) => {
    return favorites.some(p => p.id === productId);
  }, [favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, addFav, removeFav, isFav }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}