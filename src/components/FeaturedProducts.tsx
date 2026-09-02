import React, { useState } from 'react';
import { Sparkles, ArrowRight, Filter } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface FeaturedProductsProps {
  products: Product[];
  onAddToCart: (product: Product, weight: '1lb' | '2lb' | '5lb') => void;
  onQuickView: (product: Product) => void;
  onViewAllShop: () => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
  onAddToCart,
  onQuickView,
  onViewAllShop,
}) => {
  const [activeProcessFilter, setActiveProcessFilter] = useState<string>('All');

  const filterTabs = ['All', 'Washed', 'Natural', 'Honey', 'Wet-Hulled'];

  const filteredProducts = activeProcessFilter === 'All'
    ? products
    : products.filter(p => p.process.toLowerCase() === activeProcessFilter.toLowerCase());

  return (
    <section id="featured-products-section" className="py-16 md:py-24 bg-[#FBF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#9E5328]/10 text-[#9E5328] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Current Season Reserves</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1D1512] tracking-tight">
              The Sealed Harvest Collection
            </h2>
            <p className="text-base text-[#524138]">
              Raw green single-origin beans, hermetically sealed at farm washing stations. Clean moisture retention, living enzymes, and zero oxidation until you fire up your roaster.
            </p>
          </div>

          {/* Process Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <Filter className="w-4 h-4 text-[#8C7A70] hidden sm:block mr-1" />
            {filterTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveProcessFilter(tab)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeProcessFilter === tab
                    ? 'bg-[#2C221E] text-[#FBF8F3] shadow-xs'
                    : 'bg-[#F5EFEB] text-[#524138] hover:bg-[#EAE0D5] hover:text-[#1D1512]'
                }`}
              >
                {tab === 'All' ? 'All Processes' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* 4-Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
            />
          ))}
        </div>

        {/* Section Footnote / Call to Action */}
        <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="view-all-shop-btn"
            type="button"
            onClick={onViewAllShop}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#2C221E] hover:bg-[#3F302A] text-[#FBF8F3] rounded-xl text-sm font-semibold transition-all duration-200 shadow-sm hover:gap-3"
          >
            <span>Explore All Single-Origin Lots</span>
            <ArrowRight className="w-4 h-4 text-[#D98246]" />
          </button>
          <span className="text-xs text-[#6B5A51]">
            All pouches include certified one-way degassing valves and harvest traceability codes.
          </span>
        </div>

      </div>
    </section>
  );
};
