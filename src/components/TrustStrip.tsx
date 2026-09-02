import React from 'react';
import { PackageCheck, Sprout, Handshake, Truck, ShieldAlert } from 'lucide-react';
import { TRUST_FEATURES } from '../data/products';

export const TrustStrip: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'PackageCheck':
        return <PackageCheck className="w-7 h-7 text-[#9E5328]" />;
      case 'Sprout':
        return <Sprout className="w-7 h-7 text-[#2F4839]" />;
      case 'Handshake':
        return <Handshake className="w-7 h-7 text-[#9E5328]" />;
      case 'Truck':
        return <Truck className="w-7 h-7 text-[#2F4839]" />;
      default:
        return <ShieldAlert className="w-7 h-7 text-[#9E5328]" />;
    }
  };

  return (
    <section className="relative z-10 -mt-6 sm:-mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div 
        id="trust-value-strip"
        className="bg-white/90 backdrop-blur-md rounded-2xl border border-[#2C221E]/10 shadow-sm p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#2C221E]/10"
      >
        {TRUST_FEATURES.map((item, index) => (
          <div
            key={item.title}
            className={`flex items-start gap-4 ${
              index > 0 ? 'pt-6 sm:pt-0 sm:pl-6' : ''
            }`}
          >
            <div className="p-3 rounded-xl bg-[#F5EFEB] shrink-0 border border-[#2C221E]/5">
              {getIcon(item.icon)}
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-base font-bold text-[#1D1512] leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-[#524138] leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
