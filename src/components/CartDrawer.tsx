import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, weight: '1lb' | '2lb' | '5lb', quantity: number) => void;
  onRemoveItem: (productId: string, weight: '1lb' | '2lb' | '5lb') => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => {
    return acc + item.product.prices[item.weight] * item.quantity;
  }, 0);

  const freeShippingThreshold = 50;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FBF8F3] shadow-2xl flex flex-col border-l border-[#2C221E]/10 animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-[#2C221E]/10 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#9E5328]" />
              <h2 className="font-serif text-lg font-bold text-[#1D1512]">
                Your Sealed Order ({items.reduce((sum, i) => sum + i.quantity, 0)})
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-[#6B5A51] hover:text-[#1D1512] rounded-full hover:bg-[#F5EFEB]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="px-6 py-3 bg-[#F5EFEB] border-b border-[#2C221E]/5 text-xs text-[#524138]">
            <div className="flex items-center justify-between mb-1 font-medium">
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-[#2F4839]" />
                {remainingForFreeShipping > 0 ? (
                  <>Add <strong className="text-[#9E5328]">${remainingForFreeShipping.toFixed(2)}</strong> for Free US Shipping</>
                ) : (
                  <span className="text-emerald-700 font-bold">🎉 You unlocked FREE Shipping!</span>
                )}
              </span>
              <span>{Math.round(progressToFreeShipping)}%</span>
            </div>
            <div className="w-full bg-[#EAE0D5] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#2F4839] h-full transition-all duration-300"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F5EFEB] text-[#8C7A70] flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8 text-[#9E5328]" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1D1512]">Your bag is empty</h3>
                <p className="text-xs text-[#6B5A51] max-w-xs mx-auto">
                  Explore our farm-gate sealed raw green coffee beans and taste pure unroasted terroir.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#2C221E] text-white rounded-xl text-xs font-semibold hover:bg-[#3F302A]"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => {
                const itemPrice = item.product.prices[item.weight];
                const totalItemPrice = itemPrice * item.quantity;

                return (
                  <div
                    key={`${item.product.id}-${item.weight}`}
                    className="flex gap-4 p-4 bg-white rounded-2xl border border-[#2C221E]/10 shadow-xs"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-xl bg-[#F5EFEB] shrink-0"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif text-sm font-bold text-[#1D1512] leading-tight">
                            {item.product.name}
                          </h4>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.product.id, item.weight)}
                            className="text-[#8C7A70] hover:text-rose-600 transition-colors p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-xs text-[#6B5A51] mt-0.5">
                          Size: <span className="font-bold text-[#1D1512]">{item.weight} Sealed Bag</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
                        {/* Quantity controls */}
                        <div className="flex items-center border border-[#2C221E]/20 rounded-lg overflow-hidden bg-[#F5EFEB]">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.product.id, item.weight, item.quantity - 1)}
                            className="p-1 hover:bg-[#EAE0D5] text-[#2C221E]"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2 text-xs font-bold text-[#2C221E]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.product.id, item.weight, item.quantity + 1)}
                            className="p-1 hover:bg-[#EAE0D5] text-[#2C221E]"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="font-serif text-sm font-bold text-[#1D1512]">
                          ${totalItemPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-6 bg-white border-t border-[#2C221E]/10 space-y-4">
              <div className="space-y-1.5 text-xs text-[#524138]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#1D1512]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Hermetic Packaging & Handling</span>
                  <span className="text-emerald-700 font-medium">Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{remainingForFreeShipping === 0 ? 'Free' : '$5.99'}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-100 text-base font-serif font-bold text-[#1D1512]">
                  <span>Total</span>
                  <span>
                    ${(subtotal + (remainingForFreeShipping === 0 ? 0 : 5.99)).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                id="cart-checkout-btn"
                type="button"
                onClick={onCheckout}
                className="w-full py-3.5 bg-[#9E5328] hover:bg-[#85441E] text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#6B5A51]">
                <ShieldCheck className="w-4 h-4 text-[#2F4839]" />
                <span>Harvest-sealed guarantee • Safe 256-bit SSL checkout</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
