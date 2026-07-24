// NowPayments API Integration
// API Key: 6XQDG6M-WK54TG4-GWA8712-VA25NZW
// Public Key: e5316c80-15ed-4f30-be85-b0f7cc758988

const NOWPAYMENTS_API_KEY = '6XQDG6M-WK54TG4-GWA8712-VA25NZW';
const NOWPAYMENTS_API_URL = 'https://api.nowpayments.io/v1';

export interface PaymentRequest {
  price_amount: number;
  price_currency: string;
  pay_currency: string;
  order_id: string;
  order_description: string;
  ipn_callback_url: string;
}

export interface PaymentResponse {
  id: number;
  order_id: string;
  pay_address: string;
  pay_amount: string;
  pay_currency: string;
  price_amount: number;
  price_currency: string;
  status: string;
}

export async function createPayment(paymentRequest: PaymentRequest): Promise<PaymentResponse | null> {
  try {
    const response = await fetch(`${NOWPAYMENTS_API_URL}/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': NOWPAYMENTS_API_KEY,
      },
      body: JSON.stringify(paymentRequest),
    });

    if (!response.ok) {
      console.error('Payment creation failed:', response.statusText);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Payment error:', error);
    return null;
  }
}

export async function getPaymentStatus(paymentId: number): Promise<string | null> {
  try {
    const response = await fetch(`${NOWPAYMENTS_API_URL}/payment/${paymentId}`, {
      headers: {
        'x-api-key': NOWPAYMENTS_API_KEY,
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.payment_status;
  } catch (error) {
    console.error('Payment status error:', error);
    return null;
  }
}

export const SUPPORTED_CRYPTOS = [
  { id: 'BTC', name: 'Bitcoin', symbol: 'BTC', icon: '₿' },
  { id: 'ETH', name: 'Ethereum', symbol: 'ETH', icon: 'Ξ' },
  { id: 'USDT', name: 'Tether', symbol: 'USDT', icon: '₮' },
  { id: 'USDC', name: 'USD Coin', symbol: 'USDC', icon: '$' },
  { id: 'XMR', name: 'Monero', symbol: 'XMR', icon: 'M' },
  { id: 'LTC', name: 'Litecoin', symbol: 'LTC', icon: 'Ł' },
  { id: 'DOGE', name: 'Dogecoin', symbol: 'DOGE', icon: 'Ð' },
  { id: 'TRX', name: 'Tron', symbol: 'TRX', icon: 'T' },
];

export function generateOrderId(): string {
  return `CV-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
}
