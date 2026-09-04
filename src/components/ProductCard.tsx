import React, { useState } from 'react';
import { ShoppingBag, Eye, Check, Sparkles, MapPin } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, weight: '1lb' | '2lb' | '5lb') => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
}) => {
  const [selectedWeight, setSelectedWeight] = useState<'1lb' | '2lb' | '5lb'>('1lb');
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedWeight);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  const currentPrice = product.prices[selectedWeight];

  return (
    <div
      id={`product-card-${product.id}`}
      className="group flex flex-col bg-white rounded-2xl border border-[#2C221E]/10 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Top Image Container */}
      <div 
        className="relative aspect-[4/3] bg-[#F5EFEB] overflow-hidden cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-[#2C221E]/90 backdrop-blur-sm text-[#FBF8F3] text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
            {product.badge}
          </div>
        )}

        {/* Cup score badge */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-[#2F4839] text-xs font-bold px-2 py-0.5 rounded-lg border border-[#2F4839]/20 shadow-xs flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#9E5328]" />
          <span>SCA {product.score}</span>
        </div>

        {/* Quick View Overlay Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="absolute inset-x-4 bottom-3 py-2 bg-white/90 backdrop-blur-md hover:bg-white text-[#2C221E] text-xs font-semibold rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md flex items-center justify-center gap-1.5 transform translate-y-2 group-hover:translate-y-0"
          aria-label={`Quick inspect ${product.name}`}
        >
          <Eye className="w-3.5 h-3.5 text-[#9E5328]" />
          <span>Quick Inspect</span>
        </button>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
        <div>
          {/* Origin & Process line */}
          <div className="flex items-center justify-between text-xs text-[#6B5A51] mb-1.5">
            <span className="flex items-center gap-1 font-medium text-[#2F4839]">
              <MapPin className="w-3.5 h-3.5 text-[#9E5328]" />
              {product.country} • {product.region}
            </span>
            <span className="px-2 py-0.5 bg-[#F5EFEB] rounded text-[11px] font-medium text-[#524138]">
              {product.process}
            </span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onQuickView(product)}
            className="font-serif text-lg font-bold text-[#1D1512] group-hover:text-[#9E5328] transition-colors cursor-pointer leading-snug"
          >
            {product.name}
          </h3>

          {/* Tasting notes pills */}
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {product.tastingNotes.slice(0, 3).map((note) => (
              <span
                key={note}
                className="text-[11px] px-2 py-0.5 rounded-full bg-[#EAE0D5]/50 text-[#3F302A] font-medium"
              >
                {note}
              </span>
            ))}
          </div>

          {/* Sealed Guarantee Label */}
          <p className="text-[11px] text-[#8C7A70] mt-3 line-clamp-1 italic">
            🛡️ {product.sealType}
          </p>
        </div>

        {/* Footer Area: Weight selector & Add to cart */}
        <div className="pt-3 border-t border-[#2C221E]/10 space-y-3">
          
          {/* Weight selector pills */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#524138]">Pouch Size:</span>
            <div className="flex gap-1 bg-[#F5EFEB] p-1 rounded-lg">
              {(['1lb', '2lb', '5lb'] as const).map((w) => (
                <button
                  key={w}
                  type="button"
                  onClick={() => setSelectedWeight(w)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md min-h-[32px] transition-all ${
                    selectedWeight === w
                      ? 'bg-[#2C221E] text-white shadow-xs'
                      : 'text-[#6B5A51] hover:text-[#2C221E]'
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>

          {/* Price and Add button */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <div className="flex flex-col">
              <span className="text-[11px] text-[#8C7A70]">Price ({selectedWeight})</span>
              <span className="font-serif text-xl font-bold text-[#1D1512]">
                ${currentPrice.toFixed(2)}
              </span>
            </div>

            <button
              id={`add-to-cart-${product.id}`}
              type="button"
              onClick={handleAdd}
              disabled={isAdded}
              className={`flex-1 flex items-center justify-center gap-2 py-3 sm:py-2.5 px-4 rounded-xl text-xs font-bold min-h-[44px] transition-all duration-200 shadow-sm active:scale-95 ${
                isAdded
                  ? 'bg-[#2F4839] text-white'
                  : 'bg-[#9E5328] hover:bg-[#85441E] text-white hover:shadow-md'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
