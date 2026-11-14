import { useState, useEffect, useCallback } from 'react';
import { checkOrderStatus } from '@/lib/telegram';

export function useOrderNotification(orderId: string | null, pollInterval: number = 5000) {
  const [status, setStatus] = useState<'pending' | 'approved' | 'rejected' | null>(null);
  const [deliveryMethod, setDeliveryMethod] = useState<'email' | 'telegram' | undefined>(undefined);
  const [deliveryInfo, setDeliveryInfo] = useState<string | undefined>(undefined);
  const [timestamp, setTimestamp] = useState<string | undefined>(undefined);
  const [admin, setAdmin] = useState<string | undefined>(undefined);
  const [isPolling, setIsPolling] = useState(false);

  useEffect(() => {
    if (!orderId) return;

    let interval: ReturnType<typeof setInterval>;

    const poll = async () => {
      const result = await checkOrderStatus(orderId);
      if (result) {
        setStatus(result.status as any);
        if (result.delivery_method) setDeliveryMethod(result.delivery_method as any);
        if (result.delivery_info) setDeliveryInfo(result.delivery_info);
        if (result.timestamp) setTimestamp(result.timestamp);
        if (result.admin) setAdmin(result.admin);
        
        if (result.status === 'approved' || result.status === 'rejected') {
          setIsPolling(false);
          clearInterval(interval);
        }
      }
    };

    setIsPolling(true);
    poll();
    interval = setInterval(poll, pollInterval);

    return () => {
      clearInterval(interval);
      setIsPolling(false);
    };
  }, [orderId, pollInterval]);

  const clear = useCallback(() => {
    setStatus(null);
    setDeliveryMethod(undefined);
    setDeliveryInfo(undefined);
    setTimestamp(undefined);
    setAdmin(undefined);
    setIsPolling(false);
  }, []);

  return {
    status,
    deliveryMethod,
    deliveryInfo,
    timestamp,
    admin,
    isPolling,
    clear
  };
}