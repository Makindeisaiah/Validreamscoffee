import React, { useState } from 'react';
import { ArrowLeft, Sparkles, MapPin, CheckCircle, Mail, Phone, Clock, Send, ShieldCheck, Flame } from 'lucide-react';
import { Product, PageView } from '../types';
import { ProductCard } from './ProductCard';
import brandStoryFarmImg from '../assets/images/brand_story_farm_1788388967997.jpg';

interface ExtendedViewsProps {
  page: PageView;
  products: Product[];
  onNavigate: (page: PageView) => void;
  onAddToCart: (product: Product, weight: '1lb' | '2lb' | '5lb') => void;
  onQuickView: (product: Product) => void;
}

export const ExtendedViews: React.FC<ExtendedViewsProps> = ({
  page,
  products,
  onNavigate,
  onAddToCart,
  onQuickView,
}) => {
  const [contactSubmitted, setContactSubmitted] = useState(false);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[70vh]">
      {/* Return to Home link */}
      <button
        type="button"
        onClick={() => onNavigate('home')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-[#9E5328] hover:text-[#85441E] mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>Back to Home</span>
      </button>

      {/* SHOP VIEW */}
      {page === 'shop' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="border-b border-[#2C221E]/10 pb-6">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1D1512]">
              The Full Sealed Collection
            </h1>
            <p className="text-sm text-[#524138] mt-2 max-w-2xl">
              All micro-lots are delivered in certified airtight barrier foil pouches with one-way degassing valves. Sealed at origin drying yards for optimum enzymatic vitality.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        </div>
      )}

      {/* ABOUT VIEW */}
      {page === 'about' && (
        <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-300">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2F4839]/10 text-[#2F4839] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Our Mission</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1D1512]">
              Rethinking Coffee at the Source
            </h1>
            <p className="text-base sm:text-lg text-[#524138] leading-relaxed">
              Validreams Coffee was founded with a singular conviction: the standard coffee supply chain roasts coffee thousands of miles away, months before you drink it. We believe the future belongs to freshly roasted coffee in your own kitchen, started from pristine, hermetically sealed green beans.
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-xl border border-[#2C221E]/10">
            <img
              src={brandStoryFarmImg}
              alt="Validreams Farm Partner inspecting green coffee"
              className="w-full h-80 sm:h-96 object-cover"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="bg-white p-6 rounded-2xl border border-[#2C221E]/10 space-y-2">
              <ShieldCheck className="w-6 h-6 text-[#9E5328]" />
              <h3 className="font-serif text-base font-bold text-[#1D1512]">Zero Oxidation</h3>
              <p className="text-xs text-[#524138] leading-relaxed">
                By packaging green beans in multi-layer barrier films at harvest, organic oils never go rancid.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-[#2C221E]/10 space-y-2">
              <MapPin className="w-6 h-6 text-[#2F4839]" />
              <h3 className="font-serif text-base font-bold text-[#1D1512]">Transparent Trade</h3>
              <p className="text-xs text-[#524138] leading-relaxed">
                We work directly with smallholder grower co-ops, returning higher margins to farming families.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-[#2C221E]/10 space-y-2">
              <Flame className="w-6 h-6 text-[#9E5328]" />
              <h3 className="font-serif text-base font-bold text-[#1D1512]">Home Roasting Freedom</h3>
              <p className="text-xs text-[#524138] leading-relaxed">
                Roast 100g or 500g whenever you want. Experience aromas of fresh roasted coffee that supermarket bags can never match.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* BLOG VIEW */}
      {page === 'blog' && (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
          <div className="border-b border-[#2C221E]/10 pb-6">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1D1512]">
              Brew & Roast Journal
            </h1>
            <p className="text-sm text-[#524138] mt-2">
              Guides, origin dispatch stories, and roasting recipes from the Validreams tasting lab.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <article className="bg-white rounded-2xl border border-[#2C221E]/10 overflow-hidden shadow-xs hover:shadow-md transition-shadow">
              <div className="p-6 space-y-3">
                <span className="text-[11px] font-bold text-[#9E5328] uppercase tracking-wider">Home Roasting Guide</span>
                <h3 className="font-serif text-xl font-bold text-[#1D1512]">
                  How to Roast Raw Green Coffee in a Cast Iron Skillet
                </h3>
                <p className="text-xs text-[#524138] leading-relaxed">
                  No high-tech equipment required. Learn how constant heat distribution, crack listening, and quick chaff cooling yield artisanal results on your stovetop.
                </p>
                <div className="pt-2 text-xs font-semibold text-[#2C221E]">5 min read • By Head Roaster Marcus</div>
              </div>
            </article>

            <article className="bg-white rounded-2xl border border-[#2C221E]/10 overflow-hidden shadow-xs hover:shadow-md transition-shadow">
              <div className="p-6 space-y-3">
                <span className="text-[11px] font-bold text-[#2F4839] uppercase tracking-wider">Storage Science</span>
                <h3 className="font-serif text-xl font-bold text-[#1D1512]">
                  The Chemistry of Hermetic Barriers: Why Oxygen Kills Coffee
                </h3>
                <p className="text-xs text-[#524138] leading-relaxed">
                  Explore how barrier films with one-way valves keep moisture levels at optimal 10.5%–11.5% for years without degradation.
                </p>
                <div className="pt-2 text-xs font-semibold text-[#2C221E]">7 min read • By Quality Lab</div>
              </div>
            </article>
          </div>
        </div>
      )}

      {/* CONTACT VIEW */}
      {page === 'contact' && (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
          <div className="border-b border-[#2C221E]/10 pb-6">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1D1512]">
              Contact the Concierge
            </h1>
            <p className="text-sm text-[#524138] mt-2">
              Have questions regarding origin lots, moisture specs, home roaster compatibility, or bulk sealed bags? We're here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-[#F5EFEB] p-6 rounded-2xl border border-[#2C221E]/10 space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#1D1512]">Reach Our Lab</h3>
                <div className="space-y-3 text-xs text-[#524138]">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#9E5328]" />
                    <span>concierge@validreams.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#9E5328]" />
                    <span>+1 (800) 555-SEAL</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#9E5328]" />
                    <span>Mon - Fri: 8:00 AM - 5:00 PM PST</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-[#2C221E]/10 space-y-2">
                <h4 className="font-serif text-sm font-bold text-[#1D1512]">100% Seal Guarantee</h4>
                <p className="text-xs text-[#6B5A51]">
                  If any bag arrives with compromised barrier integrity or valve defect, we will replace your lot immediately free of charge.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#2C221E]/10 shadow-xs">
              {contactSubmitted ? (
                <div className="text-center py-8 space-y-3">
                  <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-serif text-lg font-bold text-[#1D1512]">Message Received!</h4>
                  <p className="text-xs text-[#524138]">
                    Our green coffee curator will respond to your inquiry within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setContactSubmitted(false)}
                    className="mt-4 px-4 py-2 bg-[#2C221E] text-white text-xs font-semibold rounded-xl"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setContactSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-semibold text-[#1D1512] mb-1">Your Name</label>
                    <input
                      required
                      type="text"
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#2C221E]/20 text-xs focus:ring-2 focus:ring-[#9E5328] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1D1512] mb-1">Email Address</label>
                    <input
                      required
                      type="email"
                      placeholder="jane@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#2C221E]/20 text-xs focus:ring-2 focus:ring-[#9E5328] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1D1512] mb-1">Inquiry Topic</label>
                    <select className="w-full px-3.5 py-2.5 rounded-xl border border-[#2C221E]/20 text-xs focus:ring-2 focus:ring-[#9E5328] focus:outline-none bg-white">
                      <option>Home Roasting Advice</option>
                      <option>Current Harvest Availability</option>
                      <option>Wholesale (25lb / 50lb bags)</option>
                      <option>Order & Tracking</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1D1512] mb-1">Message</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us about your roasting setup or coffee preferences..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#2C221E]/20 text-xs focus:ring-2 focus:ring-[#9E5328] focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#9E5328] hover:bg-[#85441E] text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                  >
                    <span>Send Inquiry</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
