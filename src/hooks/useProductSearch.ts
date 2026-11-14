import { useMemo } from 'react';
import type { Product } from '@/types';

export interface SearchFilters {
  searchTerm: string;
  minPrice: number;
  maxPrice: number;
  minBalance: number;
  maxBalance: number;
  categories: string[];
  countries: string[];
  brands: string[];
  sortBy: 'price_asc' | 'price_desc' | 'stock_desc' | 'name';
}

export function useProductSearch(products: Product[], filters: SearchFilters) {
  const { searchTerm, minPrice, maxPrice, minBalance, maxBalance, categories, countries, brands, sortBy } = filters;

  const filteredProducts = useMemo(() => {
    return products
      .filter(product => {
        const matchesSearch = searchTerm === '' || 
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.bin?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesPrice = product.price >= minPrice && product.price <= maxPrice;

        const minProdBalance = Math.min(...(product.stockOptions?.map(o => o.balance) || [product.balance || 0]));
        const maxProdBalance = Math.max(...(product.stockOptions?.map(o => o.balance) || [product.balance || 0]));
        const matchesBalance = maxProdBalance >= minBalance && minProdBalance <= maxBalance;

        const matchesCategory = categories.length === 0 || categories.includes(product.category);

        const productCountry = product.country || product.description.includes('United States') ? 'United States' : 
                               product.description.includes('Europe') ? 'European Union' :
                               product.description.includes('United Kingdom') ? 'United Kingdom' :
                               product.description.includes('Canada') ? 'Canada' :
                               product.description.includes('Australia') ? 'Australia' : 'Global';
        const matchesCountry = countries.length === 0 || countries.includes(productCountry);

        const matchesBrand = brands.length === 0 || 
          product.name.split('|')[1]?.trim().split(' ')[0] || product.name.includes('Card');

        return matchesSearch && matchesPrice && matchesBalance && matchesCategory && matchesCountry && matchesBrand;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'price_asc': return a.price - b.price;
          case 'price_desc': return b.price - a.price;
          case 'stock_desc': {
            const aStock = a.stockOptions?.reduce((s, o) => s + o.stock, 0) || a.stock;
            const bStock = b.stockOptions?.reduce((s, o) => s + o.stock, 0) || b.stock;
            return bStock - aStock;
          }
          case 'name': return a.name.localeCompare(b.name);
          default: return 0;
        }
      });
  }, [products, searchTerm, minPrice, maxPrice, minBalance, maxBalance, categories, countries, brands, sortBy]);

  return filteredProducts;
}

export function extractBINFromProduct(product: Product): string {
  const binMatch = product.name.match(/(\d{6,16})/);
  return binMatch ? binMatch[0] : '';
}

export function extractBalanceFromString(str: string): number | null {
  const balanceMatch = str.match(/\$?(\d+(?:\.\d{1,2})?)/);
  return balanceMatch ? parseFloat(balanceMatch[1]) : null;
}