import React, { useState } from 'react';
import { X, Check, ShoppingBag, Sparkles, MapPin, ShieldCheck, Gauge, Droplets } from 'lucide-react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, weight: '1lb' | '2lb' | '5lb') => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [selectedWeight, setSelectedWeight] = useState<'1lb' | '2lb' | '5lb'>('1lb');
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedWeight);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  const currentPrice = product.prices[selectedWeight];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Container */}
      <div className="relative bg-[#FBF8F3] rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#2C221E]/15 z-10 animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 bg-white/90 rounded-full text-[#2C221E] hover:bg-white shadow-sm z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Product Image */}
          <div className="relative bg-[#F5EFEB] aspect-square md:aspect-auto">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-[#2C221E] text-white text-xs font-semibold rounded-full uppercase tracking-wider">
                {product.badge}
              </span>
            )}
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-bold text-[#2F4839] border border-[#2F4839]/20 flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#9E5328]" />
              <span>SCA Score {product.score}</span>
            </div>
          </div>

          {/* Right: Technical Specs & Add Controls */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#2F4839] mb-1">
                <MapPin className="w-3.5 h-3.5 text-[#9E5328]" />
                <span>{product.country} • {product.origin}</span>
                <span>•</span>
                <span>{product.altitude}</span>
              </div>

              <h2 className="font-serif text-2xl font-bold text-[#1D1512] leading-tight">
                {product.name}
              </h2>

              <p className="text-xs sm:text-sm text-[#524138] mt-2.5 leading-relaxed">
                {product.description}
              </p>

              {/* Technical Specifications Strip */}
              <div className="grid grid-cols-2 gap-2.5 my-4 p-3.5 bg-white rounded-2xl border border-[#2C221E]/10 text-xs">
                <div className="flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-[#9E5328]" />
                  <div>
                    <span className="text-[10px] text-[#8C7A70] block uppercase">Process:</span>
                    <span className="font-semibold text-[#1D1512]">{product.process}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-[#2F4839]" />
                  <div>
                    <span className="text-[10px] text-[#8C7A70] block uppercase">Moisture:</span>
                    <span className="font-semibold text-[#1D1512]">{product.moistureContent}</span>
                  </div>
                </div>
              </div>

              {/* Tasting Notes */}
              <div>
                <span className="text-xs font-semibold text-[#524138] block mb-1.5">Aroma & Cup Notes:</span>
                <div className="flex flex-wrap gap-1.5">
                  {product.tastingNotes.map((note) => (
                    <span key={note} className="text-xs px-2.5 py-1 rounded-full bg-[#EAE0D5] text-[#2C221E] font-medium">
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Seal Guarantee */}
              <div className="mt-3 flex items-start gap-2 text-xs text-[#524138] bg-[#F5EFEB] p-2.5 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-[#2F4839] shrink-0 mt-0.5" />
                <span className="leading-snug">{product.sealType}</span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#2C221E]/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1D1512]">Select Pouch Size:</span>
                <div className="flex gap-1.5">
                  {(['1lb', '2lb', '5lb'] as const).map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setSelectedWeight(w)}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                        selectedWeight === w
                          ? 'bg-[#2C221E] text-white shadow-xs'
                          : 'bg-white text-[#524138] border border-[#2C221E]/10'
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 pt-1">
                <div>
                  <span className="text-xs text-[#8C7A70] block">Price</span>
                  <span className="font-serif text-2xl font-bold text-[#1D1512]">
                    ${currentPrice.toFixed(2)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleAdd}
                  disabled={added}
                  className={`flex-1 py-3 px-5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                    added ? 'bg-[#2F4839] text-white' : 'bg-[#9E5328] hover:bg-[#85441E] text-white shadow-md'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
