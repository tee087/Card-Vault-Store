import { Plus, Minus, ShoppingBag, Trash2, ChevronRight, Terminal, Bitcoin, Loader2, Mail, MessageCircle, FileText, Upload, Copy, Check, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetFooter, SheetTitle } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCart } from '@/context/CartContext';
import { useState, useRef, useMemo } from 'react';
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
  const [copied, setCopied] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState<'pending' | 'approved' | 'rejected' | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<{ orderId: string; amountUsd: number; btcAddress: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const itemList = items.map((item, i) => `${i + 1}. ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}`).join('\n');

  // Validation: checkout requires usage type for cards/ccs and cashout checkbox for applicable items
  const requiresUsageType = useMemo(() => items.some(i => i.category === 'cards' || i.category === 'ccs'), [items]);
  const requiresCashout = useMemo(() => items.some(i => i.category !== 'spamming-course' && i.category !== 'hacking-course'), [items]);

  const usageTypeComplete = useMemo(() => {
    if (!requiresUsageType) return true;
    return items.every(item => {
      if (item.category === 'cards' || item.category === 'ccs') {
        return Boolean(usageTypes[item.id]);
      }
      return true;
    });
  }, [items, usageTypes, requiresUsageType]);

  const cashoutComplete = useMemo(() => {
    if (!requiresCashout) return true;
    return items.every(item => {
      if (item.category !== 'spamming-course' && item.category !== 'hacking-course') {
        return Boolean(cashoutInstructions[item.id]);
      }
      return true;
    });
  }, [items, cashoutInstructions, requiresCashout]);

  const canCheckout = usageTypeComplete && cashoutComplete;

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
        <SheetContent className="w-full sm:max-w-lg bg-black border-l border-green-500/50 flex flex-col font-mono shadow-2xl shadow-green-900/40">
          <SheetHeader className="border-b border-green-500/40 pb-4">
            <SheetTitle className="flex items-center gap-2 text-green-400">
              <Terminal className="w-5 h-5" />
              <span>cart</span>
              <span className="text-green-700 text-sm border border-green-500/30 px-2 py-0.5 rounded">items={items.length}</span>
            </SheetTitle>
          </SheetHeader>

          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
              <div className="w-20 h-20 border border-green-500/30 flex items-center justify-center mb-4 bg-green-500/5">
                <ShoppingBag className="w-10 h-10 text-green-700" />
              </div>
              <p className="text-green-700 font-mono mb-2 text-lg">Cart is empty</p>
              <p className="text-green-600 font-mono text-sm mb-8">Add products to continue</p>

              <div className="border border-green-500/30 bg-green-500/5 p-6 mb-8 max-w-xs rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 font-mono text-sm font-bold">Cashout Instructions</span>
                </div>
                <p className="text-green-600 font-mono text-xs leading-relaxed">
                  Would you like your product to include Cashout Instructions?
                </p>
              </div>

              <Button
                onClick={() => setIsOpen(false)}
                variant="outline"
                className="border-green-500/30 text-green-600 hover:bg-green-500/10 font-mono font-bold py-3"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              <ScrollArea className="flex-1 -mx-6 px-6">
                <div className="space-y-4 py-4">
                  {items.map((item) => {
                    const isCourse = item.category === 'spamming-course' || item.category === 'hacking-course';
                    const needsUsageType = item.category === 'cards' || item.category === 'ccs';

                    return (
                      <div
                        key={item.id}
                        className="border border-green-500/30 bg-green-500/5 p-5 rounded-xl relative overflow-hidden group"
                      >
                        {/* Accent border on left */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-400" />

                        <div className="flex items-start justify-between gap-2 mb-3">
                          <div className="flex-1">
                            <div className="text-green-400 font-mono font-bold text-sm">{item.name}</div>
                            <div className="text-xs text-green-700 font-mono mt-0.5">{item.id}</div>
                          </div>
                          <button
                            onClick={() => {
                              restoreOptionStock(item.id, item.price, item.quantity);
                              removeFromCart(item.id);
                            }}
                            className="text-green-700 hover:text-red-500 transition-colors p-1.5 rounded hover:bg-red-500/10"
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
                              className="w-8 h-8 border border-green-500/30 flex items-center justify-center text-green-600 hover:bg-green-500/20 hover:border-green-400 transition-all rounded-lg"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center font-mono text-green-400 font-bold">{item.quantity}</span>
                            <button
                              onClick={() => {
                                reduceOptionStock(item.id, item.price, 1);
                                updateQuantity(item.id, item.quantity + 1);
                              }}
                              className="w-8 h-8 border border-green-500/30 flex items-center justify-center text-green-600 hover:bg-green-500/20 hover:border-green-400 transition-all rounded-lg"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="font-mono text-green-400 font-bold text-sm">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>

                        {/* Usage Type Selector for Cards and CCs */}
                        {needsUsageType && (
                          <div className="mt-4 pt-3 border-t border-green-500/20">
                            <div className="flex items-center gap-1 mb-2">
                              <span className="text-xs font-mono text-green-600 font-bold">Select Usage Type:</span>
                              <span className="text-xs font-mono text-red-400">required</span>
                            </div>
                            <Select
                              value={usageTypes[item.id] || ''}
                              onValueChange={(value) => setUsageType(item.id, value)}
                            >
                              <SelectTrigger className="bg-black border-green-500/40 text-green-400 font-mono text-sm rounded-lg focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-all">
                                <SelectValue placeholder={usageTypes[item.id] ? '' : 'Choose usage type...'} />
                              </SelectTrigger>
                              <SelectContent className="bg-black border-green-500/40 text-green-400 font-mono text-sm rounded-lg shadow-lg">
                                {getUsageTypeOptions(item.category).map((option) => (
                                  <SelectItem 
                                    key={option}
                                    value={option}
                                    className={`
                                      text-green-400 font-mono 
                                      focus:bg-green-500/20 focus:text-green-300
                                      ${usageTypes[item.id] === option ? 'bg-green-500/20 text-green-300 font-bold' : ''}
                                    `}
                                  >
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {!usageTypes[item.id] && (
                              <p className="text-red-400 text-xs font-mono mt-1">
                                Please select a usage type for {item.name}
                              </p>
                            )}
                          </div>
                        )}

                        {/* Cashout Instructions Checkbox or Course PDF Info */}
                        {isCourse ? (
                          <div className="mt-4 pt-3 border-t border-green-500/20">
                            <div className="text-green-600 font-mono text-xs mb-2">
                              📄 Course Delivery: PDF with Complete Materials
                            </div>
                            <div className="bg-green-500/5 border border-green-500/20 p-3 rounded-lg">
                              <div className="text-green-400 font-mono text-xs leading-relaxed">
                                {item.category === 'spamming-course'
                                  ? 'Video Tutorials • Lab Sites • Scam Templates • Mailer Setups • Bot Configs • SMTP Guides • Automation Scripts • Success Studies • Money Strategies'
                                  : 'Video Tutorials • Lab Sites • Exploit DB • Tool Configs • Malware Code • Anonymity Guides • C2 Setups • Zero-Days • Case Studies'}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="mt-4 pt-3 border-t border-green-500/20">
                            <div className="flex items-center gap-2 mb-2">
                              <Checkbox
                                checked={Boolean(cashoutInstructions[item.id])}
                                onCheckedChange={() => toggleCashoutInstructions(item.id)}
                                className="w-5 h-5 border-green-500/50 rounded data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 data-[state=checked]:text-black transition-all"
                              />
                              <div className="flex items-center gap-1 cursor-pointer select-none" onClick={() => toggleCashoutInstructions(item.id)}>
                                <FileText className="w-4 h-4 text-green-400" />
                                <span className={`text-xs font-mono font-medium ${cashoutInstructions[item.id] ? 'text-green-300' : 'text-green-400'}`}>
                                  {item.category === 'tools' ? 'Set up Instructions' : 'Cashout Instructions'}
                                </span>
                              </div>
                              <span className={`text-xs font-mono ${cashoutInstructions[item.id] ? 'text-green-400' : 'text-red-400'}`}>
                                {cashoutInstructions[item.id] ? '✓ required' : 'required'}
                              </span>
                            </div>
                            <span className="text-green-600 font-mono text-xs ml-auto block">
                              +${getCashoutPrice(item.category)}
                            </span>
                            {!cashoutInstructions[item.id] && (
                              <p className="text-red-400 text-xs font-mono mt-1">
                                Please check cashout instructions for {item.name}
                              </p>
                            )}
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-3 border-t border-green-500/20 mt-3">
                          <span className="text-green-700 font-mono text-xs">Line Total</span>
                          <span className="text-green-400 font-mono text-sm font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>

              <SheetFooter className="flex-col gap-4 border-t border-green-500/40 pt-6 pb-6 bg-black/50">
                <div className="w-full space-y-3 font-mono text-sm">
                  <div className="flex items-center justify-between text-green-700">
                    <span className="font-medium">subtotal:</span>
                    <span className="text-green-400 font-bold">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-green-700">
                    <span className="font-medium">shipping:</span>
                    <span className="text-green-400 font-bold">FREE</span>
                  </div>
                  <Separator className="bg-green-500/30" />
                  <div className="flex items-center justify-between text-green-400 font-bold text-lg">
                    <span className="font-bold">total:</span>
                    <span className="font-black">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                {/* Validation notice */}
                {!canCheckout && (
                  <div className="p-3 rounded-lg border border-red-500/30 bg-red-500/5">
                    <div className="flex items-start gap-2 mb-2">
                      <AlertCircle className="w-4 h-4 text-red-400 mt-0.5" />
                      <span className="text-red-400 font-mono text-xs font-bold">Complete required fields below before checkout</span>
                    </div>
                    {!usageTypeComplete && (
                      <p className="text-red-400 text-xs font-mono pl-6">Select usage type for all card/CC items</p>
                    )}
                    {!cashoutComplete && (
                      <p className="text-red-400 text-xs font-mono pl-6">Check cashout instructions for all items</p>
                    )}
                  </div>
                )}

                <div className="flex gap-3 w-full">
                  <Button
                    variant="outline"
                    className="flex-1 border-green-500/30 text-green-600 hover:bg-green-500/10 font-mono font-bold py-3"
                    onClick={() => setIsOpen(false)}
                  >
                    Exit
                  </Button>
                  <Button
                    className={`flex-1 font-mono font-bold py-3 rounded-lg shadow-lg transition-all ${
                      canCheckout
                        ? 'bg-green-500 text-black hover:bg-green-400 hover:shadow-[0_0_25px_rgba(0,255,0,0.5)]'
                        : 'bg-green-500/10 border border-green-500/20 text-green-500/40 cursor-not-allowed hover:shadow-none'
                    }`}
                    onClick={handleCheckout}
                    disabled={!canCheckout}
                  >
                    {processing ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <ChevronRight className="w-4 h-4 mr-2" />
                    )}
                    {!canCheckout ? 'Complete Required Fields' : 'Checkout'}
                  </Button>
                </div>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Payment Details - Direct BTC Payment */}
      <Dialog open={paymentOpen} onOpenChange={setPaymentOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto bg-black border border-green-500/50 font-mono shadow-2xl shadow-green-900/40 rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-center text-green-400 flex items-center justify-center gap-2 mb-2">
              <Bitcoin className="w-5 h-5" />
              Direct BTC Payment
            </DialogTitle>
            <DialogDescription className="text-center text-green-700 text-sm">
              Send Bitcoin to the address below to complete your order
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-5">
            <div className="border border-green-500/30 p-5 bg-green-500/5 rounded-xl text-center">
              <div className="text-green-700 text-xs font-bold mb-2 uppercase tracking-wider">Amount to Pay</div>
              <div className="text-green-400 text-3xl font-black">${paymentDetails?.amountUsd.toFixed(2)}</div>
              <div className="text-green-600 text-xs mt-2">{items.length} item(s) in cart • Order: {paymentDetails?.orderId}</div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-green-700 text-sm font-medium">BTC Payment Address</div>
                <button
                  onClick={handleCopyAddress}
                  className="flex items-center gap-1 text-green-400 hover:text-green-300 text-xs font-mono transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span className="text-green-400 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span className="font-bold">Copy Address</span>
                    </>
                  )}
                </button>
              </div>
              <div className="p-4 border border-green-500/30 bg-green-500/5 break-all text-center rounded-lg">
                <code className="text-green-400 text-sm font-mono font-bold break-all">{paymentDetails?.btcAddress}</code>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-yellow-500/30 bg-yellow-500/5">
              <div className="text-yellow-500 text-xs font-bold flex items-center gap-1">
                ⚠️ Send the equivalent of ${paymentDetails?.amountUsd.toFixed(2)} USD in BTC to the address above.
              </div>
              <div className="text-yellow-600 text-xs mt-1">Do not send other coins or amounts.</div>
            </div>

            <div className="p-4 rounded-xl border border-blue-500/30 bg-blue-500/5">
              <div className="text-blue-400 text-xs font-bold mb-1 flex items-center gap-1">📋 Next Step:</div>
              <div className="text-blue-300 text-xs">
                After sending payment, click "I have paid" to upload your proof and choose delivery by Email or Telegram.
              </div>
            </div>

            <div className="space-y-2 font-mono text-xs">
              <div className="flex justify-between text-green-700">
                <span>Order ID:</span>
                <span className="text-green-400 font-bold">{paymentDetails?.orderId}</span>
              </div>
              <div className="flex justify-between text-green-700">
                <span>Payment Method:</span>
                <span className="text-green-400 font-bold">Bitcoin (BTC)</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              className="flex-1 border-green-500/30 text-green-600 hover:bg-green-500/10 font-mono font-bold py-3"
              onClick={() => {
                handleRestoreAndClear();
                setPaymentOpen(false);
              }}
            >
              Close
            </Button>
            <Button
              className="flex-1 bg-green-500 text-black hover:bg-green-400 font-mono font-bold py-3 shadow-lg shadow-green-500/30"
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
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto bg-black border border-green-500/50 font-mono shadow-2xl shadow-green-900/40 rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-center text-green-400 flex items-center justify-center gap-2 mb-2">
              <Upload className="w-5 h-5" />
              Upload Payment Proof
            </DialogTitle>
            <DialogDescription className="text-center text-green-700 text-sm">
              Attach a screenshot of your BTC payment and choose how you want to receive your products
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-5">
            {/* Delivery Method */}
            <div className="space-y-2">
              <div className="text-green-700 text-sm font-bold">Delivery Method</div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setDeliveryMethod('telegram')}
                  className={`p-3 border rounded-lg flex items-center justify-center gap-2 transition-all ${
                    deliveryMethod === 'telegram'
                      ? 'border-green-400 bg-green-500/20 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                      : 'border-green-500/30 bg-green-500/5 text-green-600 hover:border-green-400'
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-green-400 text-sm font-bold">Telegram</span>
                </button>
                <button
                  onClick={() => setDeliveryMethod('email')}
                  className={`p-3 border rounded-lg flex items-center justify-center gap-2 transition-all ${
                    deliveryMethod === 'email'
                      ? 'border-green-400 bg-green-500/20 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                      : 'border-green-500/30 bg-green-500/5 text-green-600 hover:border-green-400'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  <span className="text-green-400 text-sm font-bold">Email</span>
                </button>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="space-y-2">
              <div className="text-green-700 text-sm font-bold">Delivery Information</div>
              <Input
                placeholder={deliveryMethod === 'telegram' ? '@username' : 'your@email.com'}
                value={deliveryInfo}
                onChange={(e) => setDeliveryInfo(e.target.value)}
                className="bg-black border-green-500/40 text-green-400 font-mono text-sm rounded-lg focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-all"
              />
              <div className="text-green-600 text-xs">
                Your products will be delivered to {deliveryMethod === 'telegram' ? '@' + deliveryInfo : deliveryInfo} after verification.
              </div>
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <div className="text-green-700 text-sm font-bold">Payment Proof (Image)</div>
              <div className="border border-green-500/30 bg-green-500/5 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-green-400 hover:bg-green-500/10 transition-all" role="button" onClick={() => fileInputRef.current?.click()}>
                <Upload className="w-10 h-10 text-green-400 mb-3" />
                <div className="text-green-400 text-sm font-mono font-bold mb-1">Upload screenshot</div>
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
                <div className="flex items-center gap-3 p-3 rounded-lg border border-green-500/30 bg-green-500/5">
                  <FileText className="w-5 h-5 text-green-400" />
                  <div className="text-green-400 font-mono text-sm truncate max-w-[200px]" title={proofFile.name}>{proofFile.name}</div>
                  <button
                    onClick={() => setProofFile(null)}
                    className="text-red-400 hover:text-red-300 font-mono text-xs"
                  >
                    Remove
                  </button>
                </div>
              )}
              {!proofFile && (
                <div className="text-red-400 text-xs text-center font-mono mt-1">
                  Please upload a payment proof screenshot
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              className="flex-1 border-green-500/30 text-green-600 hover:bg-green-500/10 font-mono font-bold py-3"
              onClick={() => {
                setProofOpen(false);
                setPaymentOpen(true);
              }}
            >
              Cancel
            </Button>
            <Button
              className={`flex-1 font-mono font-bold py-3 rounded-lg shadow-lg transition-all ${
                  (proofFile && deliveryInfo)
                    ? 'bg-green-500 text-black hover:bg-green-400 hover:shadow-[0_0_25px_rgba(0,255,0,0.5)]'
                    : 'bg-green-500/10 border border-green-500/20 text-green-500/40 cursor-not-allowed hover:shadow-none'
                }`}
              onClick={handleSubmitProof}
              disabled={processing || !proofFile || !deliveryInfo}
            >
              {processing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>Submit Proof</>
              )}
            </Button>
            {!proofFile || !deliveryInfo && (
              <div className="text-red-400 text-xs text-center font-mono mt-3">
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
        <DialogContent className="bg-black border-green-500/50 text-green-400 shadow-2xl shadow-green-900/40 rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-green-400">
              {paymentConfirmed === 'pending' ? '⏳ Proof Submitted' :
               paymentConfirmed === 'approved' ? '✅ Payment Received' :
               paymentConfirmed === 'rejected' ? '❌ Payment Not Received' : 'Payment Status'}
            </DialogTitle>
            <DialogDescription className="text-green-600 text-sm">
              {paymentConfirmed === 'pending' && 'Your payment proof has been sent to our Telegram bot for review. Our team will verify and send your product to your chosen delivery method shortly.'}
              {paymentConfirmed === 'approved' && `Payment confirmed! Your product will be sent to ${deliveryMethod === 'telegram' ? '@' + deliveryInfo : deliveryInfo} shortly.`}
              {paymentConfirmed === 'rejected' && 'No valid payment received. Please complete your payment and submit proof again.'}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-between gap-3 pt-4">
            <div className="text-xs text-green-600 font-mono">
              Our team will verify your payment within 5-15 minutes.
            </div>
            <Button
              onClick={() => {
                setPaymentConfirmed(null);
                setPaymentOpen(false);
                handleRestoreAndClear();
              }}
              className="bg-green-500 text-black hover:bg-green-400 font-bold py-2"
            >
              OK
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
