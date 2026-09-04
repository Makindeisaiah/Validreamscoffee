import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, CheckCircle2, Wind, Eye } from 'lucide-react';
import heroBagImg from '../assets/images/validreams_hero_bag_1788388953311.jpg';

interface HeroProps {
  onShopClick: () => void;
  onLearnClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick, onLearnClick }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F5EFEB] via-[#FBF8F3] to-[#FBF8F3] pt-8 pb-16 md:pt-16 md:pb-24 lg:pt-20 lg:pb-32">
      {/* Decorative background warmth / subtle botanical radial glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D98246]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#2F4839]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Brand Message & Primary CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            
            {/* Seal Promise Eyebrow Pill */}
            <div 
              id="hero-freshness-pill"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#2F4839]/10 border border-[#2F4839]/20 text-[#2F4839] text-[11px] sm:text-xs font-semibold tracking-wide"
            >
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2F4839] shrink-0" />
              <span>Hermetically Sealed at Harvest • 100% Unroasted Raw</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1D1512] leading-[1.15] sm:leading-[1.12]">
              Raw & Sealed at the Source. <br className="hidden sm:inline" />
              <span className="text-[#9E5328] italic font-normal">Pure Origin Coffee</span>, Unaltered.
            </h1>

            {/* Subheadline explaining the raw & sealed difference */}
            <p className="text-base sm:text-xl text-[#524138] max-w-2xl font-normal leading-relaxed">
              Roasted coffee stales in 21 days. We capture fresh micro-lot green beans straight from farm drying beds and seal them in airtight, multi-ply barrier pouches with degassing valves. Experience unmatched vibrancy, zero oxidation, and living flavor notes when you roast on your terms.
            </p>

            {/* Value Checkpoints */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-2 text-xs sm:text-sm text-[#3F302A] w-full max-w-xl">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2F4839] shrink-0" />
                <span className="font-medium">100% Zero-Oxygen Hermetic Seal</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2F4839] shrink-0" />
                <span className="font-medium">SCA Grade 1 Specialty Reserve</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2F4839] shrink-0" />
                <span className="font-medium">Roast-Fresh in Small Home Batches</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2F4839] shrink-0" />
                <span className="font-medium">Direct Trade Smallholder Sourced</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-4 w-full sm:w-auto">
              <button
                id="hero-shop-cta-btn"
                type="button"
                onClick={onShopClick}
                className="inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#9E5328] hover:bg-[#85441E] text-[#FBF8F3] rounded-xl font-semibold text-base shadow-md hover:shadow-lg transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9E5328] min-h-[48px]"
              >
                <span>Shop Sealed Bags</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                id="hero-learn-story-btn"
                type="button"
                onClick={onLearnClick}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 bg-transparent hover:bg-[#EAE0D5]/60 text-[#2C221E] border border-[#2C221E]/25 rounded-xl font-semibold text-base transition-colors min-h-[48px]"
              >
                <Sparkles className="w-4 h-4 text-[#9E5328]" />
                <span>Why Raw & Sealed?</span>
              </button>
            </div>

            {/* Social Proof / Harvest Transparency Snippet */}
            <div className="pt-3 border-t border-[#2C221E]/10 flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-[#6B5A51] w-full">
              <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-ping shrink-0" />
              <span className="leading-snug">Current Batch: <strong>Lot #VR-2026B</strong> — Sealed at origin under vacuum</span>
              <span className="hidden sm:inline">•</span>
              <span className="font-medium text-[#2F4839]">Free US Shipping Over $50</span>
            </div>

          </div>

          {/* Right Column: Hero Visual Coffee Bag */}
          <div className="lg:col-span-5 relative flex items-center justify-center w-full mt-4 lg:mt-0">
            
            {/* Bag Frame Card */}
            <div className="relative w-full max-w-md mx-auto">
              
              {/* Decorative Backing shadow / border plate */}
              <div className="absolute inset-0 bg-[#2C221E] rounded-3xl transform rotate-1 sm:rotate-2 translate-x-1.5 sm:translate-x-2 translate-y-1.5 sm:translate-y-2 opacity-15" />
              
              <div className="relative rounded-3xl overflow-hidden bg-[#EAE0D5] border-2 border-[#2C221E]/10 shadow-2xl transition-transform duration-500 hover:scale-[1.01]">
                <img
                  src={heroBagImg}
                  alt="Validreams Single Origin Raw Coffee Sealed Bag"
                  className="w-full h-auto object-cover aspect-[4/3] sm:aspect-square"
                  loading="eager"
                />

                {/* Floating Seal Verification Stamp */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#FBF8F3]/95 backdrop-blur-md px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl border border-[#2C221E]/10 shadow-md flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0" />
                  <div className="text-[10px] sm:text-[11px] leading-tight">
                    <span className="font-bold text-[#1D1512] block">Hermetically Sealed</span>
                    <span className="text-[#6B5A51]">Residual O₂ &lt; 0.1%</span>
                  </div>
                </div>

                {/* Floating Freshness Badge bottom */}
                <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-[#2C221E]/90 text-[#FBF8F3] backdrop-blur-md px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl border border-[#F5EFEB]/20 shadow-lg flex items-center gap-2 sm:gap-3 max-w-[85%]">
                  <Wind className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D98246] shrink-0" />
                  <div className="text-[11px] sm:text-xs">
                    <div className="font-semibold text-white truncate">One-Way Aroma Valve</div>
                    <div className="text-[9px] sm:text-[10px] text-[#D98246] truncate">Locks in delicate terroir</div>
                  </div>
                </div>
              </div>

              {/* Quick Caption under image */}
              <div className="mt-3 sm:mt-4 flex items-center justify-between text-[11px] sm:text-xs text-[#6B5A51] px-1 sm:px-2">
                <span className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-[#9E5328] shrink-0" />
                  <span>Validreams Micro-Barrier Foil</span>
                </span>
                <span className="font-mono text-[10px] sm:text-[11px]">NET WT. 16oz (454g)</span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
