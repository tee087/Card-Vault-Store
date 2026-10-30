// Direct Bitcoin Payment
// BTC Address: 19QjFZbTzEd8VPvkVdr2KzTVzC3Zq2qR9M

export const BTC_ADDRESS = '19QjFZbTzEd8VPvkVdr2KzTVzC3Zq2qR9M';

export interface PaymentDetails {
  orderId: string;
  amountUsd: number;
  btcAddress: string;
}

export function generateOrderId(): string {
  return `CV-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
}

export function createPaymentDetails(amountUsd: number): PaymentDetails {
  return {
    orderId: generateOrderId(),
    amountUsd,
    btcAddress: BTC_ADDRESS,
  };
}
