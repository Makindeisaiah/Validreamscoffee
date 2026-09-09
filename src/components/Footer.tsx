import React from 'react';
import { ShieldCheck, Mail, Phone, MapPin, Instagram, Twitter, Youtube, Compass, ArrowUpRight } from 'lucide-react';
import { PageView } from '../types';

interface FooterProps {
  onNavigate: (page: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#1D1512] text-[#F5EFEB] border-t border-[#3F302A] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid: Brand info & Nav links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#2C221E]">
          
          {/* Brand Col (spans 2) */}
          <div className="lg:col-span-2 space-y-5">
            <div 
              onClick={() => onNavigate('home')} 
              className="cursor-pointer flex items-center gap-3 group inline-flex"
            >
              <div className="w-9 h-9 rounded-full bg-[#2C221E] text-[#FBF8F3] flex items-center justify-center font-serif text-lg font-bold border border-[#D98246]">
                V
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold tracking-tight text-white leading-none">
                  VALIDREAMS
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#D98246] font-semibold mt-0.5">
                  Raw Sealed Coffee
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#A8988E] max-w-sm leading-relaxed">
              Pioneering pure, unroasted green coffee hermetically sealed at origin washing stations. We preserve harvest freshness, volatile floral aromatics, and natural sugars until you roast at home.
            </p>

            <div className="space-y-2 text-xs text-[#A8988E]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D98246] shrink-0" />
                <span>Harvest Lab & Origin Sorting: Mambilla Highland Mills, Taraba State & Lagos, Nigeria</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D98246] shrink-0" />
                <span>concierge@validreams.com</span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="#instagram"
                className="w-9 h-9 rounded-full bg-[#2C221E] hover:bg-[#9E5328] text-[#F5EFEB] flex items-center justify-center transition-colors border border-[#3F302A]"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#twitter"
                className="w-9 h-9 rounded-full bg-[#2C221E] hover:bg-[#9E5328] text-[#F5EFEB] flex items-center justify-center transition-colors border border-[#3F302A]"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#youtube"
                className="w-9 h-9 rounded-full bg-[#2C221E] hover:bg-[#9E5328] text-[#F5EFEB] flex items-center justify-center transition-colors border border-[#3F302A]"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="#roasting-club"
                className="w-9 h-9 rounded-full bg-[#2C221E] hover:bg-[#9E5328] text-[#F5EFEB] flex items-center justify-center transition-colors border border-[#3F302A]"
                aria-label="Roasting Guide"
              >
                <Compass className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Nav Col 1: Shop */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Shop Coffees
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A8988E]">
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-[#D98246] transition-colors">
                  All Nigerian Origins
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-[#D98246] transition-colors">
                  Mambilla Plateau Arabica
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-[#D98246] transition-colors">
                  Jos Plateau Sun-Dried Lots
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-[#D98246] transition-colors">
                  Obudu Cloud Forest Honey
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-[#D98246] transition-colors flex items-center gap-1">
                  <span>Nigerian Highland Sampler</span>
                  <span className="text-[10px] bg-[#9E5328] text-white px-1.5 py-0.2 rounded font-semibold">New</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Nav Col 2: Learn */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Learn & Brew
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A8988E]">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#D98246] transition-colors">
                  Why Sealed Bags Matter
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-[#D98246] transition-colors">
                  Nigerian Coffee Revival & Terroir
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-[#D98246] transition-colors">
                  Skillet & Stovetop Roasting Guide
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#D98246] transition-colors">
                  Mambilla Smallholder Direct Trade
                </button>
              </li>
            </ul>
          </div>

          {/* Nav Col 3: Company & Help */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Assurance & Support
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A8988E]">
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#D98246] transition-colors">
                  Contact Concierge
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#D98246] transition-colors">
                  100% Freshness Guarantee
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#D98246] transition-colors">
                  Shipping & Free Delivery Info
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#D98246] transition-colors">
                  Wholesale & Roaster Bags (50lb)
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Policy Links & Payment Badges */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs text-[#8C7A70]">
          
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p>© {new Date().getFullYear()} Validreams Coffee Inc.</p>
            <a href="#privacy" className="hover:text-[#D98246] transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-[#D98246] transition-colors">Terms of Service</a>
            <a href="#traceability" className="hover:text-[#D98246] transition-colors">Traceability Chain</a>
          </div>

          {/* Payment Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-[#A8988E] mr-1 w-full sm:w-auto">Secured Payments:</span>
            <div className="px-2 py-1 bg-[#2C221E] border border-[#3F302A] rounded text-[10px] font-bold text-[#D98246]">
              PAYSTACK
            </div>
            <div className="px-2 py-1 bg-[#2C221E] border border-[#3F302A] rounded text-[10px] font-bold text-[#EAE0D5]">
              VERVE
            </div>
            <div className="px-2 py-1 bg-[#2C221E] border border-[#3F302A] rounded text-[10px] font-bold text-[#EAE0D5]">
              MASTERCARD
            </div>
            <div className="px-2 py-1 bg-[#2C221E] border border-[#3F302A] rounded text-[10px] font-bold text-[#EAE0D5]">
              VISA
            </div>
            <div className="px-2 py-1 bg-[#2C221E] border border-[#3F302A] rounded text-[10px] font-bold text-[#EAE0D5]">
              BANK TRANSFER
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
};
