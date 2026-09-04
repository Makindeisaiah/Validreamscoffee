import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  CreditCard, 
  Building2, 
  Smartphone, 
  Truck, 
  CheckCircle2, 
  Lock, 
  Printer, 
  ShoppingBag, 
  Sparkles,
  AlertCircle,
  Clock,
  ChevronRight,
  Plus,
  Minus,
  Trash2
} from 'lucide-react';
import { CartItem, PageView, OrderDetails } from '../types';
import { formatNaira } from '../utils';

interface CheckoutPageProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, weight: '1lb' | '2lb' | '5lb', quantity: number) => void;
  onRemoveItem: (productId: string, weight: '1lb' | '2lb' | '5lb') => void;
  onClearCart: () => void;
  onNavigate: (page: PageView) => void;
}

const NIGERIAN_STATES = [
  'Lagos',
  'FCT Abuja',
  'Rivers',
  'Oyo',
  'Ogun',
  'Kano',
  'Kaduna',
  'Edo',
  'Delta',
  'Enugu',
  'Anambra',
  'Kwara',
  'Plateau',
  'Akwa Ibom',
  'Ondo',
  'Osun',
  'Imo',
  'Abia',
  'Cross River',
  'Benue',
  'Bayelsa',
  'Niger',
  'Ekiti',
  'Kogi',
  'Sokoto',
  'Bauchi',
  'Gombe',
  'Nasarawa',
  'Adamawa',
  'Borno',
  'Taraba',
  'Yobe',
  'Kebbi',
  'Zamfara',
  'Jigawa',
  'Katsina',
  'Ebonyi'
];

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onNavigate,
}) => {
  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Lagos');
  const [state, setState] = useState('Lagos');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  // Shipping & Payment Method State
  const [shippingSpeed, setShippingSpeed] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer' | 'ussd' | 'delivery'>('card');

  // Card details state
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');

  // Transfer state
  const [transferConfirmed, setTransferConfirmed] = useState(false);

  // Flow State
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Financial calculations
  const subtotal = items.reduce((acc, item) => {
    return acc + item.product.prices[item.weight] * item.quantity;
  }, 0);

  const isFreeShipping = subtotal >= 60000;
  const standardShippingCost = isFreeShipping ? 0 : 3500;
  const expressShippingCost = isFreeShipping ? 2000 : 5500;
  const shippingFee = shippingSpeed === 'standard' ? standardShippingCost : expressShippingCost;
  const grandTotal = subtotal + shippingFee;

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.match(/.{1,4}/g)?.join(' ') || raw;
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 2) {
      setCardExpiry(`${raw.slice(0, 2)}/${raw.slice(2)}`);
    } else {
      setCardExpiry(raw);
    }
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Form validation
    if (!fullName.trim()) {
      setValidationError('Please enter your full recipient name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setValidationError('Please enter a valid email address for order tracking.');
      return;
    }
    if (!phone.trim() || phone.length < 10) {
      setValidationError('Please enter a valid phone number for dispatch verification.');
      return;
    }
    if (!address.trim()) {
      setValidationError('Please provide your complete delivery street address.');
      return;
    }

    if (items.length === 0) {
      setValidationError('Your cart is empty. Please add coffee before placing an order.');
      return;
    }

    if (paymentMethod === 'card') {
      if (!cardNumber || cardNumber.replace(/\s/g, '').length < 16) {
        setValidationError('Please enter a valid 16-digit debit card number.');
        return;
      }
      if (!cardExpiry || cardExpiry.length < 5) {
        setValidationError('Please enter your card expiry date (MM/YY).');
        return;
      }
      if (!cardCvv || cardCvv.length < 3) {
        setValidationError('Please enter the 3-digit CVV on the back of your card.');
        return;
      }
    }

    // Begin Simulated Secure Payment Processing
    setIsProcessing(true);

    setTimeout(() => {
      const generatedOrder: OrderDetails = {
        orderId: `VR-NG-${Math.floor(100000 + Math.random() * 900000)}`,
        customer: {
          fullName,
          email,
          phone,
          address,
          city,
          state,
          deliveryNotes,
        },
        deliveryMethod: shippingSpeed,
        paymentMethod: paymentMethod === 'card' ? 'paystack' : paymentMethod === 'transfer' ? 'bank_transfer' : paymentMethod === 'ussd' ? 'ussd' : 'pay_on_delivery',
        items: [...items],
        subtotal,
        shipping: shippingFee,
        total: grandTotal,
        createdAt: new Date().toLocaleDateString('en-NG', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setCompletedOrder(generatedOrder);
      setIsProcessing(false);
      onClearCart();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1800);
  };

  // SUCCESS SCREEN
  if (completedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div 
          id="order-confirmation-receipt"
          className="bg-white rounded-3xl border border-[#2C221E]/10 p-6 sm:p-10 shadow-xl space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-400"
        >
          {/* Header */}
          <div className="text-center space-y-3 pb-6 border-b border-[#2C221E]/10">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2F4839]/10 text-[#2F4839] text-xs font-bold uppercase tracking-wider">
              <span>Payment Verified & Confirmed</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#1D1512]">
              Thank You, {completedOrder.customer.fullName.split(' ')[0]}!
            </h1>
            <p className="text-sm text-[#524138] max-w-md mx-auto">
              Your unroasted hermetic coffee order has been secured and queued for origin-sealed dispatch.
            </p>
          </div>

          {/* Key Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#FBF8F3] p-5 rounded-2xl border border-[#2C221E]/10 text-xs">
            <div>
              <span className="text-[#8C7A70] uppercase font-semibold block text-[10px]">Order Reference</span>
              <span className="font-mono text-sm font-bold text-[#1D1512]">{completedOrder.orderId}</span>
            </div>
            <div>
              <span className="text-[#8C7A70] uppercase font-semibold block text-[10px]">Date & Time</span>
              <span className="font-medium text-[#1D1512]">{completedOrder.createdAt}</span>
            </div>
            <div>
              <span className="text-[#8C7A70] uppercase font-semibold block text-[10px]">Delivery Destination</span>
              <span className="font-medium text-[#1D1512] leading-snug">
                {completedOrder.customer.address}, {completedOrder.customer.city}, {completedOrder.customer.state} State
              </span>
            </div>
            <div>
              <span className="text-[#8C7A70] uppercase font-semibold block text-[10px]">Dispatch Notification</span>
              <span className="font-medium text-[#1D1512]">SMS & Email sent to {completedOrder.customer.email}</span>
            </div>
          </div>

          {/* Purchased Items Breakdown */}
          <div className="space-y-3">
            <h3 className="font-serif text-base font-bold text-[#1D1512]">Purchased Lots</h3>
            <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
              {completedOrder.items.map((item) => (
                <div key={`${item.product.id}-${item.weight}`} className="p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-14 h-14 object-cover rounded-xl bg-[#F5EFEB]"
                    />
                    <div>
                      <h4 className="font-serif text-sm font-bold text-[#1D1512]">{item.product.name}</h4>
                      <p className="text-xs text-[#6B5A51]">
                        {item.weight} Sealed Bag • Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-serif text-sm font-bold text-[#1D1512]">
                      {formatNaira(item.product.prices[item.weight] * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cost breakdown */}
          <div className="bg-[#F5EFEB] p-5 rounded-2xl space-y-2 text-xs text-[#524138]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-[#1D1512]">{formatNaira(completedOrder.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Nationwide Sealed Delivery ({completedOrder.deliveryMethod === 'express' ? 'Priority Express' : 'Standard'})</span>
              <span className="font-semibold text-[#1D1512]">
                {completedOrder.shipping === 0 ? 'Free' : formatNaira(completedOrder.shipping)}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-[#2C221E]/10 text-base font-serif font-bold text-[#1D1512]">
              <span>Total Paid</span>
              <span className="text-[#9E5328]">{formatNaira(completedOrder.total)}</span>
            </div>
          </div>

          {/* Hermetic Guarantee Pill */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-start gap-3 text-xs text-emerald-900">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-semibold">Origin Degas Valve & Seal Certification</strong>
              <p className="text-[11px] text-emerald-800 leading-relaxed mt-0.5">
                Every pouch inside this order is inspected before dispatch. If any foil seal fails during transit, we replace your green coffee lot free of charge.
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="flex-1 py-3 px-5 rounded-xl border border-[#2C221E]/20 text-[#2C221E] hover:bg-[#F5EFEB] text-xs font-bold transition-all flex items-center justify-center gap-2 min-h-[44px]"
            >
              <Printer className="w-4 h-4" />
              <span>Print Receipt</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onNavigate('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex-1 py-3 px-5 rounded-xl bg-[#9E5328] hover:bg-[#85441E] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm min-h-[44px]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Continue Shopping</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // EMPTY CART SCREEN ON CHECKOUT
  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center space-y-6">
        <div className="w-20 h-20 bg-[#F5EFEB] text-[#8C7A70] rounded-full flex items-center justify-center mx-auto">
          <ShoppingBag className="w-10 h-10 text-[#9E5328]" />
        </div>
        <div className="space-y-2">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1D1512]">Your Checkout Bag is Empty</h2>
          <p className="text-sm text-[#524138] max-w-md mx-auto">
            Select your unroasted green coffee lots first, then return here to complete your delivery details and secure payment.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('shop')}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#9E5328] hover:bg-[#85441E] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all min-h-[48px]"
        >
          <span>Browse Sealed Coffees</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Return button */}
      <button
        type="button"
        onClick={() => onNavigate('shop')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-[#9E5328] hover:text-[#85441E] mb-6 group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>Continue Shopping</span>
      </button>

      {/* Page Title & Trust Header */}
      <div className="mb-8 border-b border-[#2C221E]/10 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2F4839]/10 text-[#2F4839] text-xs font-bold uppercase tracking-wider mb-2">
            <Lock className="w-3.5 h-3.5" />
            <span>Secure 256-Bit Encrypted Checkout</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#1D1512]">
            Order & Delivery Details
          </h1>
          <p className="text-xs sm:text-sm text-[#524138] mt-1">
            Provide your recipient information and select your preferred payment method in Nigerian Naira (₦).
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border border-[#2C221E]/10 shadow-2xs self-start md:self-auto text-xs text-[#524138]">
          <Truck className="w-4 h-4 text-[#9E5328]" />
          <span>{isFreeShipping ? '🎉 Free Delivery Unlocked' : 'Free Delivery on ₦60,000+'}</span>
        </div>
      </div>

      {/* Validation Error Banner */}
      {validationError && (
        <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3 text-xs text-rose-800">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      {/* Main Checkout Grid: Left 7 cols (Form & Payment), Right 5 cols (Order Summary) */}
      <form onSubmit={handleOrderSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        
        {/* LEFT COLUMN: Customer Information, Delivery, Payment */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Section 1: Contact Information */}
          <div className="bg-white rounded-3xl border border-[#2C221E]/10 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#9E5328] text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h2 className="font-serif text-lg font-bold text-[#1D1512]">
                  Customer & Contact Details
                </h2>
              </div>
              <span className="text-[11px] text-[#8C7A70]">* Required</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#1D1512] mb-1.5">
                  Full Recipient Name *
                </label>
                <input
                  id="checkout-full-name"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Babatunde Adeleke"
                  className="w-full px-4 py-3 rounded-xl border border-[#2C221E]/20 text-base sm:text-xs focus:ring-2 focus:ring-[#9E5328] focus:outline-none min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1D1512] mb-1.5">
                  Email Address (for order receipt & tracking) *
                </label>
                <input
                  id="checkout-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="babatunde@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-[#2C221E]/20 text-base sm:text-xs focus:ring-2 focus:ring-[#9E5328] focus:outline-none min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1D1512] mb-1.5">
                  Phone Number (for courier contact) *
                </label>
                <input
                  id="checkout-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0803 123 4567 or +234..."
                  className="w-full px-4 py-3 rounded-xl border border-[#2C221E]/20 text-base sm:text-xs focus:ring-2 focus:ring-[#9E5328] focus:outline-none min-h-[44px]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Address */}
          <div className="bg-white rounded-3xl border border-[#2C221E]/10 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#9E5328] text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h2 className="font-serif text-lg font-bold text-[#1D1512]">
                  Delivery Address in Nigeria
                </h2>
              </div>
              <span className="text-[11px] text-[#2F4839] font-medium flex items-center gap-1">
                <Truck className="w-3.5 h-3.5" />
                Nationwide Dispatch
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1D1512] mb-1.5">
                  Street Address (House/Flat No., Street, Estate) *
                </label>
                <input
                  id="checkout-address"
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. 14 Admiralty Way, Lekki Phase 1"
                  className="w-full px-4 py-3 rounded-xl border border-[#2C221E]/20 text-base sm:text-xs focus:ring-2 focus:ring-[#9E5328] focus:outline-none min-h-[44px]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1D1512] mb-1.5">
                    City / Town *
                  </label>
                  <input
                    id="checkout-city"
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Lekki / Ikeja / Garki"
                    className="w-full px-4 py-3 rounded-xl border border-[#2C221E]/20 text-base sm:text-xs focus:ring-2 focus:ring-[#9E5328] focus:outline-none min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1D1512] mb-1.5">
                    State *
                  </label>
                  <select
                    id="checkout-state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#2C221E]/20 text-base sm:text-xs focus:ring-2 focus:ring-[#9E5328] focus:outline-none bg-white min-h-[44px]"
                  >
                    {NIGERIAN_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st} State
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1D1512] mb-1.5">
                  Delivery Notes / Landmark (Optional)
                </label>
                <input
                  id="checkout-notes"
                  type="text"
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  placeholder="e.g. Beside Zenith Bank, call on gate arrival"
                  className="w-full px-4 py-3 rounded-xl border border-[#2C221E]/20 text-base sm:text-xs focus:ring-2 focus:ring-[#9E5328] focus:outline-none min-h-[44px]"
                />
              </div>

              {/* Shipping Speed Selector */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-[#1D1512] mb-2">
                  Select Dispatch Method
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setShippingSpeed('standard')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      shippingSpeed === 'standard'
                        ? 'border-[#9E5328] bg-[#9E5328]/5 ring-1 ring-[#9E5328]'
                        : 'border-[#2C221E]/15 bg-white hover:border-[#2C221E]/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-[#1D1512]">Standard Dispatch</span>
                      <span className="font-bold text-xs text-[#9E5328]">
                        {standardShippingCost === 0 ? 'FREE' : formatNaira(standardShippingCost)}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#6B5A51] mt-1">2–3 business days across all states</p>
                  </div>

                  <div
                    onClick={() => setShippingSpeed('express')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      shippingSpeed === 'express'
                        ? 'border-[#9E5328] bg-[#9E5328]/5 ring-1 ring-[#9E5328]'
                        : 'border-[#2C221E]/15 bg-white hover:border-[#2C221E]/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-[#1D1512]">Priority Express</span>
                      <span className="font-bold text-xs text-[#9E5328]">
                        {formatNaira(expressShippingCost)}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#6B5A51] mt-1">Next-day direct courier (Lagos/Abuja)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Payment Method */}
          <div className="bg-white rounded-3xl border border-[#2C221E]/10 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#9E5328] text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h2 className="font-serif text-lg font-bold text-[#1D1512]">
                  Select Payment Option (₦ Naira)
                </h2>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-[#2F4839] font-medium">
                <Lock className="w-3 h-3" />
                <span>Instant Settlement</span>
              </div>
            </div>

            {/* Payment Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`py-3 px-2 rounded-xl text-xs font-semibold flex flex-col items-center gap-1.5 transition-all border ${
                  paymentMethod === 'card'
                    ? 'bg-[#2C221E] text-white border-[#2C221E] shadow-xs'
                    : 'bg-[#F5EFEB] text-[#6B5A51] border-transparent hover:text-[#1D1512]'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Debit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('transfer')}
                className={`py-3 px-2 rounded-xl text-xs font-semibold flex flex-col items-center gap-1.5 transition-all border ${
                  paymentMethod === 'transfer'
                    ? 'bg-[#2C221E] text-white border-[#2C221E] shadow-xs'
                    : 'bg-[#F5EFEB] text-[#6B5A51] border-transparent hover:text-[#1D1512]'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Bank Transfer</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('ussd')}
                className={`py-3 px-2 rounded-xl text-xs font-semibold flex flex-col items-center gap-1.5 transition-all border ${
                  paymentMethod === 'ussd'
                    ? 'bg-[#2C221E] text-white border-[#2C221E] shadow-xs'
                    : 'bg-[#F5EFEB] text-[#6B5A51] border-transparent hover:text-[#1D1512]'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>USSD Code</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('delivery')}
                className={`py-3 px-2 rounded-xl text-xs font-semibold flex flex-col items-center gap-1.5 transition-all border ${
                  paymentMethod === 'delivery'
                    ? 'bg-[#2C221E] text-white border-[#2C221E] shadow-xs'
                    : 'bg-[#F5EFEB] text-[#6B5A51] border-transparent hover:text-[#1D1512]'
                }`}
              >
                <Truck className="w-4 h-4" />
                <span>Pay on Arrival</span>
              </button>
            </div>

            {/* TAB CONTENT: DEBIT CARD (PAYSTACK) */}
            {paymentMethod === 'card' && (
              <div className="space-y-4 pt-2 animate-in fade-in duration-200">
                <div className="flex items-center justify-between text-[11px] text-[#6B5A51] pb-1">
                  <span>Pay with Mastercard, Visa, or Verve</span>
                  <span className="text-[#2F4839] font-semibold">256-Bit SSL Secured</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1D1512] mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="Name as it appears on card"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#2C221E]/20 text-base sm:text-xs focus:ring-2 focus:ring-[#9E5328] focus:outline-none min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1D1512] mb-1">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      maxLength={19}
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="0000 0000 0000 0000"
                      className="w-full pl-3.5 pr-12 py-2.5 rounded-xl border border-[#2C221E]/20 text-base sm:text-xs font-mono focus:ring-2 focus:ring-[#9E5328] focus:outline-none min-h-[44px]"
                    />
                    <CreditCard className="w-4 h-4 text-[#8C7A70] absolute right-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1D1512] mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      maxLength={5}
                      value={cardExpiry}
                      onChange={handleExpiryChange}
                      placeholder="MM/YY"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#2C221E]/20 text-base sm:text-xs font-mono focus:ring-2 focus:ring-[#9E5328] focus:outline-none min-h-[44px]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1D1512] mb-1">
                      CVV
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                      placeholder="123"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#2C221E]/20 text-base sm:text-xs font-mono focus:ring-2 focus:ring-[#9E5328] focus:outline-none min-h-[44px]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: INSTANT BANK TRANSFER */}
            {paymentMethod === 'transfer' && (
              <div className="space-y-4 pt-2 animate-in fade-in duration-200">
                <div className="bg-[#F5EFEB] p-5 rounded-2xl border border-[#2C221E]/10 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#8C7A70]">Designated Bank:</span>
                    <strong className="text-[#1D1512]">Wema Bank / Providus Bank</strong>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#8C7A70]">Account Name:</span>
                    <strong className="text-[#1D1512]">Validreams Specialty Coffee Ltd</strong>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-[#2C221E]/10">
                    <span className="text-[#8C7A70]">Virtual Account Number:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-base font-bold text-[#9E5328]">0289417852</span>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard?.writeText('0289417852');
                          alert('Account number copied to clipboard!');
                        }}
                        className="text-[10px] bg-white px-2 py-1 rounded border border-gray-300 font-semibold"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-[#6B5A51] leading-relaxed">
                  Transfer exact total of <strong>{formatNaira(grandTotal)}</strong> to the account above via your bank app or USSD. Confirmation is automated within 60 seconds.
                </p>

                <label className="flex items-center gap-2 text-xs text-[#1D1512] cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={transferConfirmed}
                    onChange={(e) => setTransferConfirmed(e.target.checked)}
                    className="rounded text-[#9E5328] focus:ring-[#9E5328]"
                  />
                  <span>I will transfer immediately after submitting order</span>
                </label>
              </div>
            )}

            {/* TAB CONTENT: USSD */}
            {paymentMethod === 'ussd' && (
              <div className="space-y-4 pt-2 animate-in fade-in duration-200">
                <div className="bg-[#F5EFEB] p-5 rounded-2xl border border-[#2C221E]/10 space-y-3 text-xs">
                  <span className="text-[#6B5A51] block">Dial directly on your registered phone:</span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-white p-2.5 rounded-xl border border-gray-200">
                      <strong>GTBank:</strong> <span className="font-mono text-[#9E5328]">*737*2*Amount#</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-gray-200">
                      <strong>Zenith Bank:</strong> <span className="font-mono text-[#9E5328]">*966*60#</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-gray-200">
                      <strong>Access Bank:</strong> <span className="font-mono text-[#9E5328]">*901*00#</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-gray-200">
                      <strong>First Bank:</strong> <span className="font-mono text-[#9E5328]">*894*00#</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: PAY ON ARRIVAL */}
            {paymentMethod === 'delivery' && (
              <div className="space-y-3 pt-2 animate-in fade-in duration-200">
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Clock className="w-4 h-4 text-amber-700" />
                    <span>Available in Lagos & Abuja</span>
                  </div>
                  <p className="text-[11px] text-amber-800 leading-relaxed">
                    You can pay with Cash or POS card terminal upon arrival of your hermetically sealed coffee parcel.
                  </p>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* RIGHT COLUMN: Order Summary & Pay Action Button */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-[#2C221E]/10 p-6 sm:p-8 space-y-6 shadow-sm sticky top-32">
            <h2 className="font-serif text-lg font-bold text-[#1D1512] border-b border-gray-100 pb-4">
              Your Coffee Order ({items.reduce((s, i) => s + i.quantity, 0)} items)
            </h2>

            {/* Cart Items List */}
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1 divide-y divide-gray-100">
              {items.map((item) => {
                const itemUnitPrice = item.product.prices[item.weight];
                const itemLineTotal = itemUnitPrice * item.quantity;

                return (
                  <div key={`${item.product.id}-${item.weight}`} className="pt-3 first:pt-0 flex gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-xl bg-[#F5EFEB] shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-serif text-xs font-bold text-[#1D1512] leading-tight">
                            {item.product.name}
                          </h4>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.product.id, item.weight)}
                            className="text-[#8C7A70] hover:text-rose-600 p-0.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="text-[11px] text-[#6B5A51] mt-0.5">
                          {item.weight} Sealed Pouch
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-[#2C221E]/20 rounded-md overflow-hidden bg-[#F5EFEB] text-xs">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.product.id, item.weight, item.quantity - 1)}
                            className="px-1.5 py-0.5 hover:bg-[#EAE0D5]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 font-bold">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.product.id, item.weight, item.quantity + 1)}
                            className="px-1.5 py-0.5 hover:bg-[#EAE0D5]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-serif text-xs font-bold text-[#1D1512]">
                          {formatNaira(itemLineTotal)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2.5 text-xs text-[#524138] border-t border-gray-100 pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#1D1512]">{formatNaira(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Hermetic Nitrogen Packaging</span>
                <span className="text-emerald-700 font-medium">Free</span>
              </div>
              <div className="flex justify-between">
                <span>Nationwide Shipping</span>
                <span className="font-semibold text-[#1D1512]">
                  {shippingFee === 0 ? 'FREE' : formatNaira(shippingFee)}
                </span>
              </div>
              <div className="flex justify-between pt-3 border-t border-[#2C221E]/10 text-lg font-serif font-bold text-[#1D1512]">
                <span>Total Due</span>
                <span className="text-[#9E5328]">{formatNaira(grandTotal)}</span>
              </div>
            </div>

            {/* Submit / Pay Button */}
            <button
              id="complete-order-pay-btn"
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 bg-[#9E5328] hover:bg-[#85441E] text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group min-h-[50px] active:scale-[0.99] disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing Payment via Gateway...</span>
                </>
              ) : (
                <>
                  <span>Complete Order • Pay {formatNaira(grandTotal)}</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>

            {/* Guarantee assurance */}
            <div className="pt-2 text-[11px] text-[#6B5A51] space-y-1.5 text-center">
              <div className="flex items-center justify-center gap-1.5 text-[#2F4839] font-medium">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Harvest-Sealed Quality Guarantee</span>
              </div>
              <p>Unroasted raw coffee delivered in certified vacuum valve pouches directly to your door in Nigeria.</p>
            </div>

          </div>
        </div>

      </form>
    </div>
  );
};
