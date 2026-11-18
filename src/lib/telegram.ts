// Telegram Bot Integration
// This sends messages through a secure server-side backend (Render)
// The bot token is NEVER exposed to the browser

const RENDER_API_URL = import.meta.env.VITE_RENDER_API_URL;

if (!RENDER_API_URL) {
  console.warn('VITE_RENDER_API_URL is not set. Telegram notifications will be disabled.');
}

// Get device info
function getDeviceInfo(): string {
  const ua = navigator.userAgent;
  let device = 'Unknown Device';
  
  if (/mobile/i.test(ua)) {
    device = /iPhone|iPad|iPod/i.test(ua) ? 'iPhone/Mobile' : 'Android Phone';
  } else if (/tablet/i.test(ua)) {
    device = /iPad/i.test(ua) ? 'iPad' : 'Android Tablet';
  } else if (/Mac/i.test(ua)) {
    device = 'Mac';
  } else if (/Windows/i.test(ua)) {
    device = 'Windows PC';
  } else if (/Linux/i.test(ua)) {
    device = 'Linux PC';
  }
  
  return device;
}

// Get browser info
function getBrowserInfo(): string {
  const ua = navigator.userAgent;
  if (/Chrome/i.test(ua) && !/Edge/i.test(ua)) return 'Chrome';
  if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) return 'Safari';
  if (/Firefox/i.test(ua)) return 'Firefox';
  if (/Edge/i.test(ua)) return 'Edge';
  return 'Unknown Browser';
}

// Get OS info
function getOSInfo(): string {
  const ua = navigator.userAgent;
  if (/Windows NT 10/i.test(ua)) return 'Windows 10/11';
  if (/Mac/i.test(ua)) return 'macOS';
  if (/Android/i.test(ua)) return 'Android';
  if (/iPhone|iPad|iPod/i.test(ua)) return 'iOS';
  if (/Linux/i.test(ua)) return 'Linux';
  return 'Unknown OS';
}

// Get current timestamp
function getTimestamp(): string {
  return new Date().toLocaleString('en-US', { 
    timeZone: 'Africa/Nairobi',
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
}

// Get approximate location from timezone
function getLocation(): string {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return timezone || 'Unknown Location';
  } catch {
    return 'Unknown Location';
  }
}

// Activity types for better tracking
export type ActivityType = 
  | 'CART_ITEM_ADDED'
  | 'CHECKOUT_INITIATED'
  | 'CHECKOUT_COMPLETED'
  | 'CONTACT_FORM'
  | 'SEARCH_QUERY'
  | 'PRODUCT_VIEW';

// Send notification to Telegram
// Fetch with retry and timeout for Telegram API (handles 504 Gateway Timeout)
async function fetchWithRetry(
  url: string,
  init: RequestInit,
  maxRetries: number = 3,
  timeoutMs: number = 15000
): Promise<Response> {
  let lastError: unknown = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, { ...init, signal: controller.signal });
      clearTimeout(timeoutId);

      // Retry on gateway errors
      if (response.status === 502 || response.status === 503 || response.status === 504) {
        lastError = new Error(`Telegram API ${response.status}`);
        if (attempt < maxRetries) {
          await new Promise((resolve) => setTimeout(resolve, 1000 * (attempt + 1)));
          continue;
        }
      }

      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      lastError = error;
      if (attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, 1000 * (attempt + 1)));
        continue;
      }
    }
  }

  throw lastError;
}

export async function sendTelegramNotification(
  eventType: string,
  details: {
    email?: string;
    productName?: string;
    productPrice?: number;
    quantity?: number;
    total?: number;
    message?: string;
    cartItems?: Array<{name: string; price: number; quantity: number}>;
    paymentMethod?: string;
    cryptoCurrency?: string;
    walletAddress?: string;
    orderId?: string;
    customerName?: string;
    searchQuery?: string;
  }
): Promise<boolean> {
  try {
    const deviceInfo = getDeviceInfo();
    const browserInfo = getBrowserInfo();
    const osInfo = getOSInfo();
    const timestamp = getTimestamp();
    const location = getLocation();
    
    // Different emojis for different activity types
    const activityEmojis: Record<string, string> = {
      'CART_ITEM_ADDED': '🛒',
      'CHECKOUT_INITIATED': '💳',
      'CHECKOUT_COMPLETED': '✅',
      'CONTACT_FORM': '📝',
      'SEARCH_QUERY': '🔍',
      'PRODUCT_VIEW': '👁️'
    };
    
    const emoji = activityEmojis[eventType] || '🔔';
    const escapeHTML = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    
    let message = `${emoji} <b>${escapeHTML(eventType.replace(/_/g, ' '))}</b>\n\n`;
    message += `⏰ <b>Time:</b> ${escapeHTML(timestamp)}\n`;
    message += `📍 <b>Location:</b> ${escapeHTML(location)}\n`;
    message += `💻 <b>Device:</b> ${escapeHTML(deviceInfo)}\n`;
    message += `🌐 <b>Browser:</b> ${escapeHTML(browserInfo)}\n`;
    message += `⚙️ <b>OS:</b> ${escapeHTML(osInfo)}\n`;
    message += `📱 <b>User Agent:</b> ${escapeHTML(navigator.userAgent.substring(0, 50))}...\n\n`;
    
    if (details.customerName) {
      message += `👤 <b>Name:</b> ${escapeHTML(details.customerName)}\n`;
    }
    
    if (details.email) {
      message += `📧 <b>Email:</b> ${escapeHTML(details.email)}\n`;
    }
    
    if (details.productName) {
      message += `🎁 <b>Product:</b> ${escapeHTML(details.productName)}\n`;
      message += `💰 <b>Price:</b> ${details.productPrice}\n`;
    }
    
    if (details.quantity) {
      message += `📦 <b>Quantity:</b> ${details.quantity}\n`;
    }
    
    if (details.total) {
      message += `💵 <b>Total:</b> ${details.total}\n`;
    }
    
    // Payment details
    if (details.paymentMethod) {
      message += `💳 <b>Payment Method:</b> ${escapeHTML(details.paymentMethod)}\n`;
    }
    
    if (details.cryptoCurrency) {
      message += `₿ <b>Crypto:</b> ${escapeHTML(details.cryptoCurrency)}\n`;
    }
    
    if (details.walletAddress) {
      message += `🔗 <b>Wallet:</b> ${escapeHTML(details.walletAddress.substring(0, 20))}...\n`;
    }
    
    if (details.orderId) {
      message += `🔖 <b>Order ID:</b> ${escapeHTML(details.orderId)}\n`;
    }
    
    if (details.message) {
      message += `💬 <b>Message:</b> ${escapeHTML(details.message)}\n`;
    }
    
    if (details.searchQuery) {
      message += `🔎 <b>Search:</b> ${escapeHTML(details.searchQuery)}\n`;
    }
    
    if (details.cartItems && details.cartItems.length > 0) {
      message += `\n🛒 <b>Cart Items:</b>\n`;
      let cartTotal = 0;
      details.cartItems.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        cartTotal += itemTotal;
        message += `${index + 1}. ${escapeHTML(item.name)} - ${item.price} x ${item.quantity} = ${itemTotal}\n`;
      });
      message += `\n💵 <b>Cart Total:</b> ${cartTotal}\n`;
    }
    
    if (!RENDER_API_URL) {
      console.warn('VITE_RENDER_API_URL is not set. Skipping Telegram notification.');
      return false;
    }

    const response = await fetchWithRetry(
      `${RENDER_API_URL}/notify/text`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: message }),
      }
    );

    // Log response for debugging
    let responseData: unknown = null;
    try {
      responseData = await response.json();
    } catch {
      responseData = await response.text();
    }
    console.log('Telegram API Response:', responseData);

    return response.ok;
  } catch (error) {
    console.error('Telegram notification error:', error);
    return false;
  }
}

// Send a photo (file) to the Telegram bot - used for payment proof uploads
// The image is sent as a whole file, not as a URL
export async function sendTelegramPhoto(
  file: File,
  caption: string,
  orderDetails?: {
    orderId: string;
    deliveryMethod: string;
    deliveryInfo: string;
  }
): Promise<boolean> {
  try {
    const formData = new FormData();
    formData.append('photo', file);
    formData.append('caption', caption);

    if (orderDetails) {
      formData.append('order_id', orderDetails.orderId);
      formData.append('delivery_method', orderDetails.deliveryMethod);
      formData.append('delivery_info', orderDetails.deliveryInfo);
    }

    if (!RENDER_API_URL) {
      console.warn('VITE_RENDER_API_URL is not set. Skipping Telegram photo upload.');
      return false;
    }

    const response = await fetchWithRetry(
      `${RENDER_API_URL}/notify/photo`,
      {
        method: 'POST',
        body: formData,
      }
    );

    let responseData: unknown = null;
    try {
      responseData = await response.json();
    } catch {
      responseData = await response.text();
    }
    console.log('Telegram sendPhoto Response:', responseData, 'Status:', response.status);

    if (!response.ok) {
      console.error('Telegram sendPhoto failed:', responseData);
    }

    return response.ok;
  } catch (error) {
    console.error('Telegram photo upload error:', error);
    return false;
  }
}

// Poll the backend for order approval status (frontend calls this after proof upload)
export async function checkOrderStatus(orderId: string): Promise<{ status: string; delivery_method?: string; delivery_info?: string; timestamp?: string; admin?: string } | null> {
  if (!RENDER_API_URL) return null;
  try {
    const response = await fetch(`${RENDER_API_URL}/order-status/${orderId}`);
    if (response.status === 404) return { status: 'pending' };
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Order status check error:', error);
    return null;
  }
}

// Legacy function for backwards compatibility
export async function sendMessageToTelegram(message: string, userInfo?: string): Promise<boolean> {
  return sendTelegramNotification('New Message', {
    message: message,
    email: userInfo
  });
}

// For demo purposes - opens Telegram with pre-filled message
export function openTelegramChat(message: string): void {
  const encodedMessage = encodeURIComponent(message);
  window.open(`https://t.me/cardvaultstore?text=${encodedMessage}`, '_blank');
}

// Test function to verify bot is working - call this from browser console
export async function testTelegramBot() {
  console.log('Testing Telegram Bot...');
  const result = await sendTelegramNotification('🧪 Test Message', {
    message: 'Bot is working correctly! This is a test from Card Vault.'
  });
  console.log('Test result:', result);
  return result;
}
