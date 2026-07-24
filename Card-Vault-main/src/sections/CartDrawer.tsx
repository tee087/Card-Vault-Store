import { Plus, Minus, ShoppingBag, Trash2, ChevronRight, Terminal, Bitcoin, Loader2, Mail, MessageCircle, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { createPayment, generateOrderId, SUPPORTED_CRYPTOS, type PaymentResponse } from '@/lib/payment';
import { sendTelegramNotification } from '@/lib/telegram';
import { useStore } from '@/context/StoreContext';

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeFromCart, updateQuantity, totalPrice, clearCart, cashoutInstructions, toggleCashoutInstructions, getCashoutPrice, usageTypes, setUsageType, getUsageTypeOptions } = useCart();
  const { reduceOptionStock, restoreOptionStock } = useStore();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [cryptoOpen, setCryptoOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [paymentData, setPaymentData] = useState<PaymentResponse | null>(null);
  const [deliveryMethod, setDeliveryMethod] = useState<'email' | 'telegram'>('telegram');
  const [deliveryInfo, setDeliveryInfo] = useState('');
  const [copied, setCopied] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState<'pending' | 'approved' | 'rejected' | null>(null);

  const handleCheckout = async () => {
    setProcessing(true);
    
    const orderId = generateOrderId();
    
    const paymentRequest = {
      price_amount: totalPrice,
      price_currency: 'USD',
      pay_currency: selectedCrypto,
      order_id: orderId,
      order_description: `Card Vault Order - ${items.length} items`,
      ipn_callback_url: window.location.origin + '/ipn',
    };

    const response = await createPayment(paymentRequest);
    
    if (response) {
      setPaymentData(response);
      setCryptoOpen(false);
      setCheckoutOpen(true);
    } else {
      alert('Payment initialization failed. Please try again or contact support.');
    }
    
    setProcessing(false);
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="w-full sm:max-w-lg bg-black border-l border-green-500/30 flex flex-col font-mono">
          <SheetHeader className="border-b border-green-500/30 pb-4">
            <SheetTitle className="flex items-center gap-2 text-green-400">
              <Terminal className="w-5 h-5" />
              <span>cart</span>
              <span className="text-green-700 text-sm">items={items.length}</span>
            </SheetTitle>
          </SheetHeader>

          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
              <div className="w-20 h-20 border border-green-500/30 flex items-center justify-center mb-4">
                <ShoppingBag className="w-10 h-10 text-green-700" />
              </div>
              <p className="text-green-700 font-mono mb-2">Cart is empty</p>
              <p className="text-green-600 font-mono text-sm mb-6">Add products to continue</p>
              
              {/* Cashout Instructions Message */}
              <div className="border border-green-500/30 bg-green-500/5 p-4 mb-6 max-w-xs">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 font-mono text-sm">Cashout Instructions</span>
                </div>
                <p className="text-green-600 font-mono text-xs">
                  Would you like your product to include Cashout Instructions?
                </p>
              </div>
              
              <Button 
                onClick={() => setIsOpen(false)} 
                variant="outline"
                className="border-green-500/30 text-green-600 hover:bg-green-500/10"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              <ScrollArea className="flex-1 -mx-6 px-6">
                <div className="space-y-3 py-4">
                  {items.map((item) => (
                    <div 
                      key={item.id} 
                      className="border border-green-500/30 bg-green-500/5 p-4"
                    >
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div>
                          <div className="text-green-400 font-mono">{item.name}</div>
                          <div className="text-xs text-green-700 font-mono">{item.id}</div>
                        </div>
                        <button 
                          onClick={() => {
                            // Restore option-specific stock when removing from cart
                            restoreOptionStock(item.id, item.price, item.quantity);
                            removeFromCart(item.id);
                          }}
                          className="text-green-700 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              // Restore option stock when decreasing quantity
                              restoreOptionStock(item.id, item.price, 1);
                              updateQuantity(item.id, item.quantity - 1);
                            }}
                            className="w-7 h-7 border border-green-500/30 flex items-center justify-center text-green-600 hover:bg-green-500/20 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center font-mono text-green-400">{item.quantity}</span>
                          <button
                            onClick={() => {
                              // Reduce option stock when increasing quantity
                              reduceOptionStock(item.id, item.price, 1);
                              updateQuantity(item.id, item.quantity + 1);
                            }}
                            className="w-7 h-7 border border-green-500/30 flex items-center justify-center text-green-600 hover:bg-green-500/20 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-mono text-green-400">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      
                       {/* Usage Type Selector for Cards and CCs */}
                       {(item.category === 'cards' || item.category === 'ccs') && (
                         <div className="mt-3 pt-3 border-t border-green-500/20">
                           <div className="text-green-600 font-mono text-xs mb-2">
                             Select Usage Type:
                           </div>
                           <Select
                             value={usageTypes[item.id] || ''}
                             onValueChange={(value) => setUsageType(item.id, value)}
                           >
                             <SelectTrigger className="bg-black border-green-500/30 text-green-400 font-mono">
                               <SelectValue placeholder="Choose usage type..." />
                             </SelectTrigger>
                             <SelectContent className="bg-black border-green-500/30">
                               {getUsageTypeOptions(item.category).map((option) => (
                                 <SelectItem 
                                   key={option} 
                                   value={option}
                                   className="text-green-400 font-mono focus:bg-green-500/20 focus:text-green-300"
                                 >
                                   {option}
                                 </SelectItem>
                               ))}
                             </SelectContent>
                           </Select>
                         </div>
                       )}
                      
                       {/* Cashout Instructions Checkbox or Course PDF Info */}
                       {(item.category === 'spamming-course' || item.category === 'hacking-course') ? (
                         <div className="mt-3 pt-3 border-t border-green-500/20">
                           <div className="text-green-600 font-mono text-xs mb-2">
                             📄 Course Delivery: PDF with Complete Materials
                           </div>
                           <div className="bg-green-500/5 border border-green-500/20 p-2">
                             <div className="text-green-400 font-mono text-xs">
                               {item.category === 'spamming-course'
                                 ? 'Video Tutorials • Lab Sites • Scam Templates • Mailer Setups • Bot Configs • SMTP Guides • Automation Scripts • Success Studies • Money Strategies'
                                 : 'Video Tutorials • Lab Sites • Exploit DB • Tool Configs • Malware Code • Anonymity Guides • C2 Setups • Zero-Days • Case Studies'
                               }
                             </div>
                           </div>
                         </div>
                       ) : (
                         <div className="mt-3 pt-3 border-t border-green-500/20">
                           <div className="text-green-600 font-mono text-xs mb-2">
                             ✓ Check the box below if you need {item.category === 'tools' ? 'Set up Instructions' : 'Cashout Instructions'}
                           </div>
                           <label className="flex items-center gap-2 cursor-pointer">
                             <Checkbox
                               checked={cashoutInstructions[item.id] || false}
                               onCheckedChange={() => toggleCashoutInstructions(item.id)}
                               className="border-green-500/50 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                             />
                             <div className="flex items-center gap-1">
                               <FileText className="w-4 h-4 text-green-400" />
                               <span className="text-green-400 font-mono text-sm">
                                 {item.category === 'tools' ? 'Set up Instructions' : 'Cashout Instructions'}
                               </span>
                             </div>
                             <span className="text-green-600 font-mono text-xs ml-auto">
                               +${getCashoutPrice(item.category)}
                             </span>
                           </label>
                         </div>
                       )}
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <SheetFooter className="flex-col gap-4 border-t border-green-500/30 pt-4">
                <div className="w-full space-y-2 font-mono text-sm">
                  <div className="flex items-center justify-between text-green-700">
                    <span>subtotal:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-green-700">
                    <span>shipping:</span>
                    <span className="text-green-400">FREE</span>
                  </div>
                  <Separator className="bg-green-500/30" />
                  <div className="flex items-center justify-between text-green-400 font-bold">
                    <span>total:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex gap-3 w-full">
                  <Button 
                    variant="outline" 
                    className="flex-1 border-green-500/30 text-green-600 hover:bg-green-500/10 font-mono"
                    onClick={() => setIsOpen(false)}
                  >
                    Exit
                  </Button>
                  <Button 
                    className="flex-1 bg-green-500 text-black hover:bg-green-400 font-mono"
                    onClick={() => {
                      setIsOpen(false);
                      setCryptoOpen(true);
                    }}
                    disabled={processing}
                  >
                    {processing ? (
                      <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                    ) : (
                      <ChevronRight className="w-4 h-4 mr-1" />
                    )}
                    Checkout
                  </Button>
                </div>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>

      <Dialog open={cryptoOpen} onOpenChange={setCryptoOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto bg-black border border-green-500/30 font-mono">
          <DialogHeader>
            <DialogTitle className="text-center text-green-400 flex items-center justify-center gap-2">
              <Bitcoin className="w-5 h-5" />
              Select Payment Method
            </DialogTitle>
            <DialogDescription className="text-center text-green-700">
              Choose your preferred cryptocurrency
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="border border-green-500/30 p-4 bg-green-500/5">
              <div className="text-green-700 text-sm mb-2">Order Total</div>
              <div className="text-green-400 text-2xl font-bold">${totalPrice.toFixed(2)}</div>
              <div className="text-green-600 text-xs mt-1">{items.length} item(s) in cart</div>
            </div>

            <div className="space-y-2">
              <div className="text-green-700 text-sm">Select Cryptocurrency</div>
              <div className="grid grid-cols-2 gap-2">
                {SUPPORTED_CRYPTOS.map((crypto) => (
                  <button
                    key={crypto.id}
                    onClick={() => setSelectedCrypto(crypto.id)}
                    className={`p-3 border ${
                      selectedCrypto === crypto.id
                        ? 'border-green-500 bg-green-500/20'
                        : 'border-green-500/30 hover:border-green-500/50'
                    } transition-colors text-left`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{crypto.icon}</span>
                      <span className="text-green-400 text-sm">{crypto.symbol}</span>
                    </div>
                    <div className="text-green-700 text-xs">{crypto.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 border border-yellow-500/30 bg-yellow-500/5">
              <div className="text-yellow-500 text-xs">
                Warning: Payment will be calculated at current exchange rate
              </div>
            </div>

            {/* Delivery Info */}
            <div className="space-y-3">
              <div className="text-green-700 text-sm">Delivery Information</div>
              <div className="text-green-600 text-xs">
                Enter your Telegram username or email where you want to receive your products after payment.
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setDeliveryMethod('telegram')}
                  className={`flex-1 p-2 border ${deliveryMethod === 'telegram' ? 'border-green-500 bg-green-500/20' : 'border-green-500/30'} flex items-center justify-center gap-2`}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-green-400 text-sm">Telegram</span>
                </button>
                <button
                  onClick={() => setDeliveryMethod('email')}
                  className={`flex-1 p-2 border ${deliveryMethod === 'email' ? 'border-green-500 bg-green-500/20' : 'border-green-500/30'} flex items-center justify-center gap-2`}
                >
                  <Mail className="w-4 h-4" />
                  <span className="text-green-400 text-sm">Email</span>
                </button>
              </div>
              <Input
                placeholder={deliveryMethod === 'telegram' ? '@username' : 'your@email.com'}
                value={deliveryInfo}
                onChange={(e) => setDeliveryInfo(e.target.value)}
                className="bg-black border-green-500/30 text-green-400 font-mono"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1 border-green-500/30 text-green-600 hover:bg-green-500/10 font-mono"
              onClick={() => setCryptoOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              className="flex-1 bg-green-500 text-black hover:bg-green-400 font-mono"
              onClick={handleCheckout}
              disabled={processing || !deliveryInfo}
            >
              {processing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                  Processing...
                </>
              ) : (
                <>Pay with {selectedCrypto}</>
              )}
            </Button>
            {!deliveryInfo && cryptoOpen && (
              <div className="text-yellow-500 text-xs text-center mt-2">
                Please enter delivery info (Telegram or Email)
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto bg-black border border-green-500/30 font-mono">
          <DialogHeader>
            <DialogTitle className="text-center text-green-400 flex items-center justify-center gap-2">
              <Terminal className="w-5 h-5" />
              Payment Details
            </DialogTitle>
            <DialogDescription className="text-center text-green-700">
              Send payment and receive your products
            </DialogDescription>
          </DialogHeader>
          
          {paymentData && (
            <div className="space-y-4 py-4">
              <div className="border border-green-500/30 p-4 bg-green-500/5 text-center">
                <div className="text-green-700 text-sm mb-2">Amount to Pay</div>
                <div className="text-green-400 text-xl font-bold">
                  {paymentData.pay_amount} {paymentData.pay_currency}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-green-700 text-sm">Payment Address</div>
                  <button
                    onClick={() => {
                      if (paymentData?.pay_address) {
                        navigator.clipboard.writeText(paymentData.pay_address);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }
                    }}
                    className="flex items-center gap-1 text-green-500 hover:text-green-400 text-xs"
                  >
                    {copied ? (
                      <span className="text-green-400">✓ Copied!</span>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <div className="p-3 border border-green-500/30 bg-green-500/5 break-all">
                  <code className="text-green-400 text-sm">{paymentData.pay_address}</code>
                </div>
              </div>

              <div className="p-3 border border-yellow-500/30 bg-yellow-500/5">
                <div className="text-yellow-500 text-xs">
                  ⚠️ Send exactly {paymentData.pay_amount} {paymentData.pay_currency} to the address above. 
                  Do not send other amounts.
                </div>
              </div>

              <div className="p-3 border border-blue-500/30 bg-blue-500/5">
                <div className="text-blue-400 text-xs font-bold mb-1">📬 Delivery Instructions:</div>
                <div className="text-blue-300 text-xs">
                  • Digital products are sent instantly to your {deliveryMethod} ({deliveryInfo}) after payment confirmation<br/>
                  • Physical cards are shipped within 24-48 hours with tracking<br/>
                  • Contact @cardvaultstore on Telegram for any issues
                </div>
              </div>

              <div className="space-y-2 font-mono text-xs">
                <div className="flex justify-between text-green-700">
                  <span>Order ID:</span>
                  <span className="text-green-400">{paymentData.order_id}</span>
                </div>
                <div className="flex justify-between text-green-700">
                  <span>Status:</span>
                  <span className="text-yellow-400">{paymentData.status}</span>
                </div>
                <div className="flex justify-between text-green-700">
                  <span>Delivery via:</span>
                  <span className="text-green-400 capitalize">{deliveryMethod}</span>
                </div>
                <div className="flex justify-between text-green-700">
                  <span>Send to:</span>
                  <span className="text-green-400">{deliveryInfo}</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1 border-green-500/30 text-green-600 hover:bg-green-500/10 font-mono"
              onClick={() => {
                // Restore stock for each item when closing checkout
                items.forEach(item => {
                  restoreOptionStock(item.id, item.price, item.quantity);
                });
                setCheckoutOpen(false);
                clearCart();
              }}
            >
              Close
            </Button>
            <Button 
              className="flex-1 bg-green-500 text-black hover:bg-green-400 font-mono"
              onClick={async () => {
                // Send payment confirmation notification to Telegram
                if (items.length > 0 && deliveryInfo) {
                  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
                  const itemList = items.map((item, i) => `${i+1}. ${item.name} - ${item.price} x ${item.quantity}`).join('\n');
                  
                  await sendTelegramNotification('PAYMENT_SUBMITTED', {
                    email: deliveryInfo,
                    total: totalAmount,
                    cartItems: items.map(item => ({ name: item.name, price: item.price, quantity: item.quantity })),
                    message: `User confirmed payment for order.\n\nItems:\n${itemList}\n\nTotal: ${totalAmount}\nPayment Method: ${selectedCrypto}\nDelivery: ${deliveryMethod === 'telegram' ? '@' + deliveryInfo : deliveryInfo}`
                  });
                  
                  setPaymentConfirmed('pending');
                }
              }}
            >
              I have paid
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Confirmation Dialog */}
      <Dialog open={paymentConfirmed !== null} onOpenChange={(open) => {
        if (!open) {
          setPaymentConfirmed(null);
          setCheckoutOpen(false);
          clearCart();
        }
      }}>
        <DialogContent className="bg-black border-green-500/50 text-green-400">
          <DialogHeader>
            <DialogTitle className="text-green-400">
              {paymentConfirmed === 'pending' ? '⏳ Payment Submitted' : 
               paymentConfirmed === 'approved' ? '✅ Payment Received' : 
               paymentConfirmed === 'rejected' ? '❌ Payment Not Received' : 'Payment Status'}
            </DialogTitle>
            <DialogDescription className="text-green-600">
              {paymentConfirmed === 'pending' && 'Your payment has been submitted for review. Our team will verify and send your product within 5-15 minutes. Please wait patiently on Telegram for your order.'}
              {paymentConfirmed === 'approved' && `Payment confirmed! Your product will be sent to ${deliveryMethod === 'telegram' ? '@' + deliveryInfo : deliveryInfo} shortly.`}
              {paymentConfirmed === 'rejected' && 'No payment received. Please complete your payment and try again.'}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-between gap-3">
            <div className="text-xs text-green-600">
              Our team will verify and send your product within 5-15 minutes.
            </div>
            <Button 
              onClick={() => {
                setPaymentConfirmed(null);
                setCheckoutOpen(false);
                clearCart();
              }}
              className="bg-green-500 text-black hover:bg-green-400"
            >
              OK
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
