import { useState, useCallback, useEffect } from 'react';
import type { Product } from '@/types';

export interface PriceAlert {
  productId: string;
  targetPrice: number;
  active: boolean;
}

const USE_LOCAL_STORAGE = true;

export function usePriceAlerts() {
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);

  useEffect(() => {
    if (USE_LOCAL_STORAGE) {
      const saved = localStorage.getItem('cardvault_price_alerts');
      if (saved) {
        setAlerts(JSON.parse(saved));
      }
    }
  }, []);

  const addAlert = useCallback((productId: string, targetPrice: number) => {
    setAlerts(prev => {
      const updated = [...prev.filter(a => a.productId !== productId), { productId, targetPrice, active: true }];
      if (USE_LOCAL_STORAGE) {
        localStorage.setItem('cardvault_price_alerts', JSON.stringify(updated));
      }
      return updated;
    });
  }, []);

  const removeAlert = useCallback((productId: string) => {
    setAlerts(prev => {
      const updated = prev.filter(a => a.productId !== productId);
      if (USE_LOCAL_STORAGE) {
        localStorage.setItem('cardvault_price_alerts', JSON.stringify(updated));
      }
      return updated;
    });
  }, []);

  const checkAlerts = useCallback((products: Product[]) => {
    const triggered: string[] = [];
    alerts.forEach(alert => {
      if (!alert.active) return;
      const product = products.find(p => p.id === alert.productId);
      if (product && product.price <= alert.targetPrice) {
        triggered.push(alert.productId);
        alert.active = false;
        if (USE_LOCAL_STORAGE) {
          localStorage.setItem('cardvault_price_alerts', JSON.stringify(alerts));
        }
        if (typeof window !== 'undefined' && (window as any).toast) {
          (window as any).toast(`Price alert! Product now at $${product.price}`);
        }
      }
    });
    return triggered;
  }, [alerts]);

  return { alerts, addAlert, removeAlert, checkAlerts };
}