import { useEffect, useState, useCallback } from 'react';
import { ShoppingCart, X, MapPin } from 'lucide-react';

interface SoldNotificationProps {
  productName: string;
  price: number;
  location: string;
  balance: number;
  onClose: () => void;
}

export function SoldNotification({ productName, price, location, onClose }: SoldNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for animation to complete
  }, [onClose]);

  useEffect(() => {
    // Trigger animation after mount using requestAnimationFrame for smoother animation
    const animationFrame = requestAnimationFrame(() => {
      setIsVisible(true);
    });

    // Auto-close after 5 seconds
    const autoCloseTimer = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(autoCloseTimer);
    };
  }, [handleClose]);

  return (
    <div
      className={`fixed top-20 left-4 z-50 transition-all duration-500 ease-out ${
        isVisible
          ? 'translate-x-0 opacity-100'
          : '-translate-x-full opacity-0'
      }`}
    >
      {/* Compact popup with all text visible */}
      <div className="bg-[#1A1B26] border border-[#7928CA]/50 rounded-lg shadow-lg shadow-[#7928CA]/20 w-[300px] overflow-hidden backdrop-blur-sm">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-[#7928CA]/20 to-[#FF0080]/20 px-3 py-2 flex items-center justify-between border-b border-[#7928CA]/30">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-[#7928CA] to-[#FF0080] flex items-center justify-center">
              <ShoppingCart className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-white text-xs font-semibold">New Purchase</span>
          </div>
          <button 
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-200 text-xs font-medium">{productName}</span>
            <span className="text-[#00FF88] font-bold text-sm">${price.toFixed(2)}</span>
          </div>
          
          <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
            <MapPin className="w-3 h-3 text-[#FFD700]" />
            <span className="text-gray-400">{location}</span>
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse ml-auto" />
            <span className="text-gray-500">Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
}
