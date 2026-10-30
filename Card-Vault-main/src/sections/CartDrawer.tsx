import { Plus, Minus, ShoppingBag, Trash2, ChevronRight, Terminal, Bitcoin, Loader2, Mail, MessageCircle, FileText, Upload, Copy, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetFooter, SheetTitle } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCart } from '@/context/CartContext';
import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { createPaymentDetails } from '@/lib/payment';
import { sendTelegramPhoto } from '@/lib/telegram';
import { useStore } from '@/context/StoreContext';

type DeliveryMethod = 'email' | 'telegram';

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeFromCart, updateQuantity, totalPrice, clearCart, cashoutInstructions, toggleCashoutInstructions, getCashoutPrice, usageTypes, setUsageType, getUsageTypeOptions } = useCart();
  const { reduceOptionStock, restoreOptionStock } = useStore();
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [proofOpen, setProofOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('telegram');
  const [deliveryInfo, setDeliveryInfo] = useState('');
  const [proofFile, setProofFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [copied, setCopied] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState<'pending' | 'approved' | 'rejected' | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<{ orderId: string; amountUsd: number; btcAddress: string } | null>(null);

  const itemList = items.map((item, i) => `${i + 1}. ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}`).join('\n');

  const handleCheckout = () => {
    const details = createPaymentDetails(totalPrice);
    setPaymentDetails(details);
    setIsOpen(false);
    setPaymentOpen(true);
  };

  const handleCopyAddress = () => {
    if (paymentDetails?.btcAddress) {
      navigator.clipboard.writeText(paymentDetails.btcAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSubmitProof = async () => {
    if (!proofFile || !paymentDetails || !deliveryInfo) return;

    setProcessing(true);

    const caption =
      `*Payment Proof Submitted*\n\n` +
      `🔖 *Order ID:* ${paymentDetails.orderId}\n` +
      `💵 *Amount:* $${paymentDetails.amountUsd.toFixed(2)} USD (pay in BTC)\n` +
      `₿ *BTC Address:* ${paymentDetails.btcAddress}\n` +
      `📬 *Delivery Method:* ${deliveryMethod === 'telegram' ? 'Telegram' : 'Email'}\n` +
      `📧 *Delivery To:* ${deliveryInfo}\n\n` +
      `🛒 *Items:*\n${itemList}\n\n` +
      `💵 *Total:* $${paymentDetails.amountUsd.toFixed(2)}\n` +
      `⏰ *Time:* ${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })}`;

    const sent = await sendTelegramPhoto(proofFile, caption);

    setProcessing(false);

    if (sent) {
      setProofOpen(false);
      setPaymentConfirmed('pending');
    } else {
      alert('Failed to send payment proof. Please try again or contact support.');
    }
  };

  const handleRestoreAndClear = () => {
    items.forEach((item) => {
      restoreOptionStock(item.id, item.price, item.quantity);
    });
    clearCart();
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

                      {(item.category === 'spamming-course' || item.category === 'hacking-course') ? (
                        <div className="mt-3 pt-3 border-t border-green-500/20">
                          <div className="text-green-600 font-mono text-xs mb-2">
                            📄 Course Delivery: PDF with Complete Materials
                          </div>
                          <div className="bg-green-500/5 border border-green-500/20 p-2">
                            <div className="text-green-400 font-mono text-xs">
                              {item.category === 'spamming-course'
                                ? 'Video Tutorials • Lab Sites • Scam Templates • Mailer Setups • Bot Configs • SMTP Guides • Automation Scripts • Success Studies • Money Strategies'
                                : 'Video Tutorials • Lab Sites • Exploit DB • Tool Configs • Malware Code • Anonymity Guides • C2 Setups • Zero-Days • Case Studies'}
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
                    onClick={handleCheckout}
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

      {/* Payment Details - Direct BTC Payment */}
      <Dialog open={paymentOpen} onOpenChange={setPaymentOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto bg-black border border-green-500/30 font-mono">
          <DialogHeader>
            <DialogTitle className="text-center text-green-400 flex items-center justify-center gap-2">
              <Bitcoin className="w-5 h-5" />
              Direct BTC Payment
            </DialogTitle>
            <DialogDescription className="text-center text-green-700">
              Send Bitcoin to the address below to complete your order
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="border border-green-500/30 p-4 bg-green-500/5 text-center">
              <div className="text-green-700 text-sm mb-2">Amount to Pay</div>
              <div className="text-green-400 text-2xl font-bold">${paymentDetails?.amountUsd.toFixed(2)}</div>
              <div className="text-green-600 text-xs mt-1">{items.length} item(s) in cart • Order: {paymentDetails?.orderId}</div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-green-700 text-sm">BTC Payment Address</div>
                <button
                  onClick={handleCopyAddress}
                  className="flex items-center gap-1 text-green-500 hover:text-green-400 text-xs"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span className="text-green-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <div className="p-3 border border-green-500/30 bg-green-500/5 break-all text-center">
                <code className="text-green-400 text-sm font-mono">{paymentDetails?.btcAddress}</code>
              </div>
            </div>

            <div className="p-3 border border-yellow-500/30 bg-yellow-500/5">
              <div className="text-yellow-500 text-xs">
                ⚠️ Send the equivalent of ${paymentDetails?.amountUsd.toFixed(2)} USD in BTC to the address above. Do not send other coins.
              </div>
            </div>

            <div className="p-3 border border-blue-500/30 bg-blue-500/5">
              <div className="text-blue-400 text-xs font-bold mb-1">📋 Next Step:</div>
              <div className="text-blue-300 text-xs">
                After sending payment, click "I have paid" to upload your proof and choose your delivery method (Email or Telegram).
              </div>
            </div>

            <div className="space-y-2 font-mono text-xs">
              <div className="flex justify-between text-green-700">
                <span>Order ID:</span>
                <span className="text-green-400">{paymentDetails?.orderId}</span>
              </div>
              <div className="flex justify-between text-green-700">
                <span>Payment Method:</span>
                <span className="text-green-400">Bitcoin (BTC)</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 border-green-500/30 text-green-600 hover:bg-green-500/10 font-mono"
              onClick={() => {
                handleRestoreAndClear();
                setPaymentOpen(false);
              }}
            >
              Close
            </Button>
            <Button
              className="flex-1 bg-green-500 text-black hover:bg-green-400 font-mono"
              onClick={() => {
                setPaymentOpen(false);
                setProofOpen(true);
              }}
            >
              I have paid
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Proof Upload */}
      <Dialog open={proofOpen} onOpenChange={setProofOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto bg-black border border-green-500/30 font-mono">
          <DialogHeader>
            <DialogTitle className="text-center text-green-400 flex items-center justify-center gap-2">
              <Upload className="w-5 h-5" />
              Upload Payment Proof
            </DialogTitle>
            <DialogDescription className="text-center text-green-700">
              Attach a screenshot of your BTC payment and choose how you want to receive your products
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Delivery Method */}
            <div className="space-y-2">
              <div className="text-green-700 text-sm">Delivery Method</div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setDeliveryMethod('telegram')}
                  className={`p-3 border flex items-center justify-center gap-2 transition-colors ${
                    deliveryMethod === 'telegram'
                      ? 'border-green-500 bg-green-500/20'
                      : 'border-green-500/30 hover:border-green-500/50'
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-green-400 text-sm">Telegram</span>
                </button>
                <button
                  onClick={() => setDeliveryMethod('email')}
                  className={`p-3 border flex items-center justify-center gap-2 transition-colors ${
                    deliveryMethod === 'email'
                      ? 'border-green-500 bg-green-500/20'
                      : 'border-green-500/30 hover:border-green-500/50'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  <span className="text-green-400 text-sm">Email</span>
                </button>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="space-y-2">
              <div className="text-green-700 text-sm">Delivery Information</div>
              <Input
                placeholder={deliveryMethod === 'telegram' ? '@username' : 'your@email.com'}
                value={deliveryInfo}
                onChange={(e) => setDeliveryInfo(e.target.value)}
                className="bg-black border-green-500/30 text-green-400 font-mono"
              />
              <div className="text-green-600 text-xs">
                Your products will be delivered to {deliveryMethod === 'telegram' ? '@' + deliveryInfo : deliveryInfo} after verification.
              </div>
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <div className="text-green-700 text-sm">Payment Proof (Image)</div>
              <div className="border border-green-500/30 bg-green-500/5 rounded p-4 flex flex-col items-center justify-center cursor-pointer hover:border-green-500/50 transition-colors" role="button" onClick={() => fileInputRef.current?.click()}>
                <Upload className="w-8 h-8 text-green-400 mb-2" />
                <div className="text-green-400 text-sm font-mono mb-1">Upload screenshot</div>
                <div className="text-green-600 text-xs">JPG, PNG or WEBP</div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null;
                    setProofFile(file);
                  }}
                />
              </div>
              {proofFile && (
                <div className="flex items-center gap-3 p-3 border border-green-500/30 bg-green-500/5 rounded">
                  <FileText className="w-5 h-5 text-green-400" />
                  <div className="text-green-400 font-mono text-sm truncate max-w-[200px]" title={proofFile.name}>{proofFile.name}</div>
                  <button
                    onClick={() => setProofFile(null)}
                    className="text-red-500 hover:text-red-400"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {!proofFile && (
              <div className="text-yellow-500 text-xs text-center">
                Please upload a payment proof screenshot
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 border-green-500/30 text-green-600 hover:bg-green-500/10 font-mono"
              onClick={() => {
                setProofOpen(false);
                setPaymentOpen(true);
              }}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-green-500 text-black hover:bg-green-400 font-mono"
              onClick={handleSubmitProof}
              disabled={processing || !proofFile || !deliveryInfo}
            >
              {processing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                  Sending...
                </>
              ) : (
                <>Submit Proof</>
              )}
            </Button>
            {(!proofFile || !deliveryInfo) && (
              <div className="text-yellow-500 text-xs text-center mt-2">
                Please complete delivery info and upload proof
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Confirmation Dialog */}
      <Dialog open={paymentConfirmed !== null} onOpenChange={(open) => {
        if (!open) {
          setPaymentConfirmed(null);
          setPaymentOpen(false);
          handleRestoreAndClear();
        }
      }}>
        <DialogContent className="bg-black border-green-500/50 text-green-400">
          <DialogHeader>
            <DialogTitle className="text-green-400">
              {paymentConfirmed === 'pending' ? '⏳ Proof Submitted' :
               paymentConfirmed === 'approved' ? '✅ Payment Received' :
               paymentConfirmed === 'rejected' ? '❌ Payment Not Received' : 'Payment Status'}
            </DialogTitle>
            <DialogDescription className="text-green-600">
              {paymentConfirmed === 'pending' && 'Your payment proof has been sent to our Telegram bot for review. Our team will verify and send your product to your chosen delivery method shortly.'}
              {paymentConfirmed === 'approved' && `Payment confirmed! Your product will be sent to ${deliveryMethod === 'telegram' ? '@' + deliveryInfo : deliveryInfo} shortly.`}
              {paymentConfirmed === 'rejected' && 'No valid payment received. Please complete your payment and submit proof again.'}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-between gap-3">
            <div className="text-xs text-green-600">
              Our team will verify your payment within 5-15 minutes.
            </div>
            <Button
              onClick={() => {
                setPaymentConfirmed(null);
                setPaymentOpen(false);
                handleRestoreAndClear();
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
