import React from 'react';
import { ArrowRight, ShieldCheck, MapPin, Sparkles, CheckCircle } from 'lucide-react';
import brandStoryFarmImg from '../assets/images/brand_story_farm_1788388967997.jpg';

interface BrandStoryTeaserProps {
  onLearnMore: () => void;
}

export const BrandStoryTeaser: React.FC<BrandStoryTeaserProps> = ({ onLearnMore }) => {
  return (
    <section id="brand-story-section" className="py-20 bg-[#F5EFEB] relative overflow-hidden">
      {/* Subtle organic background accents */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Authentic Photography & Origin Badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#2C221E]/10 bg-[#EAE0D5]">
              <img
                src={brandStoryFarmImg}
                alt="Validreams origin farm inspection and hermetic sealing of raw green beans"
                className="w-full h-auto aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              
              {/* Origin badge overlay */}
              <div className="absolute top-4 right-4 bg-[#2C221E]/90 text-[#FBF8F3] px-3.5 py-2 rounded-xl backdrop-blur-md text-xs font-semibold flex items-center gap-2 border border-white/10 shadow-lg">
                <MapPin className="w-4 h-4 text-[#D98246]" />
                <span>Direct From Origin Stations</span>
              </div>

              {/* Bottom transparency stamp */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#FBF8F3]/95 backdrop-blur-md p-4 rounded-2xl border border-[#2C221E]/10 shadow-md">
                <div className="flex items-center justify-between text-xs text-[#2C221E]">
                  <div>
                    <span className="font-bold block text-sm font-serif">The Seal of Origin</span>
                    <span className="text-[#6B5A51]">Guaranteed oxygen barrier &lt; 0.1%</span>
                  </div>
                  <div className="text-right font-mono text-[11px] text-[#9E5328] font-bold">
                    HARVEST #2026-M
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Offset Border */}
            <div className="absolute -bottom-4 -right-4 w-full h-full rounded-3xl border-2 border-[#9E5328]/30 -z-10 hidden sm:block pointer-events-none" />
          </div>

          {/* Right Column: Story Copy & Why Sealed Matters */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2F4839]/10 text-[#2F4839] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Our Philosophy & Craft</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1D1512] leading-tight">
              Why We Seal at the Farm Gate
            </h2>

            <p className="text-base sm:text-lg text-[#524138] leading-relaxed">
              Every coffee enthusiast knows that once coffee is roasted, its volatile aromatics degrade in days. But few realize that unroasted green coffee is a living agricultural seed. When left in porous burlap sacks across ocean freighters, it absorbs ambient humidity, losing its terroir and crisp fruit acids.
            </p>

            <p className="text-sm sm:text-base text-[#524138] leading-relaxed">
              At <span className="font-semibold text-[#1D1512]">Validreams</span>, we partner directly with independent washing stations in Ethiopia, Colombia, Costa Rica, and Sumatra. The moment sorting and drying ends, our beans are hermetically sealed in multi-layer barrier foil with one-way degassing valves. 
            </p>

            {/* Key Pillars */}
            <div className="space-y-3 pt-2 w-full">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#2F4839] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#1D1512]">Living Cell Preservation</h4>
                  <p className="text-xs text-[#6B5A51]">Prevents enzymatic oxidation so green beans stay harvest-fresh for up to 3 years.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#2F4839] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#1D1512]">True Farm Traceability</h4>
                  <p className="text-xs text-[#6B5A51]">Direct farm premiums mean smallholders earn sustainable livelihoods without middlemen skimming.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#2F4839] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#1D1512]">The Purest Home Roast</h4>
                  <p className="text-xs text-[#6B5A51]">Roast small batches at home on your schedule for aromas you simply cannot buy off a supermarket shelf.</p>
                </div>
              </div>
            </div>

            {/* Learn More Link to About */}
            <div className="pt-4">
              <button
                id="brand-story-learn-more-btn"
                type="button"
                onClick={onLearnMore}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#2C221E] hover:bg-[#3F302A] text-[#FBF8F3] rounded-xl text-sm font-semibold transition-all duration-200 shadow-sm hover:gap-3.5 group"
              >
                <span>Read the Full Validreams Story</span>
                <ArrowRight className="w-4 h-4 text-[#D98246] transition-transform group-hover:translate-x-1" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
