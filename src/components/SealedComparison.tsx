import React, { useState } from 'react';
import { Clock, ShieldCheck, Flame, Award, AlertCircle, CheckCircle2 } from 'lucide-react';

export const SealedComparison: React.FC = () => {
  const [selectedTimeline, setSelectedTimeline] = useState<'day1' | 'month3' | 'year1'>('month3');

  const comparisonData = {
    day1: {
      label: 'Arrival Day',
      conventional: {
        status: 'Already Degassing',
        aroma: '85% volatile compounds',
        cup: 'Roasted 2-6 weeks ago in a warehouse. Peak sweetness has already begun sloping downward.',
      },
      validreams: {
        status: '100% Dormant Freshness',
        aroma: '100% preserved cellular integrity',
        cup: 'Raw beans held in zero-oxygen barrier. Unaltered organic acids await your first home roast.',
      },
    },
    month3: {
      label: '3 Months Post-Harvest',
      conventional: {
        status: 'Oxidized & Flat',
        aroma: '40% volatiles remaining',
        cup: 'Lipids in roasted bean surfaces have gone rancid. Delicate citrus and floral notes are lost.',
      },
      validreams: {
        status: 'Identical to Harvest Day',
        aroma: '99.5% enzyme stability',
        cup: 'One-way degassing barrier locks out ambient air and humidity. Roasts as vibrant as the day it was picked.',
      },
    },
    year1: {
      label: '1 Year Later',
      conventional: {
        status: 'Past Crop / Stale Cardboard',
        aroma: 'Under 15% original notes',
        cup: 'Bitter, astringent, flat woody taste. No origin terroir can be discerned.',
      },
      validreams: {
        status: 'Pristine Cell Structure',
        aroma: '98%+ terroir retention',
        cup: 'Still in living dormancy. Roast a single cup and experience sparkling acidity and floral sweetness.',
      },
    },
  };

  const active = comparisonData[selectedTimeline];

  return (
    <section className="py-16 md:py-24 bg-[#FBF8F3] border-t border-[#2C221E]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9E5328]/10 text-[#9E5328] text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>The Science of Freshness</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1D1512]">
            Ordinary Roasted Bags vs. Validreams Raw Sealed
          </h2>
          <p className="text-sm sm:text-base text-[#524138]">
            See how hermetic foil sealing preserves volatile aromatic compounds compared to supermarket roasted coffee.
          </p>

          {/* Timeline Selector */}
          <div className="inline-flex items-center p-1 bg-[#F5EFEB] rounded-xl border border-[#2C221E]/10 mt-4">
            <button
              type="button"
              onClick={() => setSelectedTimeline('day1')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                selectedTimeline === 'day1'
                  ? 'bg-[#2C221E] text-white shadow-xs'
                  : 'text-[#6B5A51] hover:text-[#1D1512]'
              }`}
            >
              Day 1
            </button>
            <button
              type="button"
              onClick={() => setSelectedTimeline('month3')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                selectedTimeline === 'month3'
                  ? 'bg-[#2C221E] text-white shadow-xs'
                  : 'text-[#6B5A51] hover:text-[#1D1512]'
              }`}
            >
              3 Months
            </button>
            <button
              type="button"
              onClick={() => setSelectedTimeline('year1')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                selectedTimeline === 'year1'
                  ? 'bg-[#2C221E] text-white shadow-xs'
                  : 'text-[#6B5A51] hover:text-[#1D1512]'
              }`}
            >
              1 Year Later
            </button>
          </div>
        </div>

        {/* 2-Column Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Column A: Conventional Roasted Bags */}
          <div className="bg-white rounded-2xl border border-red-200/60 p-6 sm:p-8 space-y-6 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-700" />
                <h3 className="font-serif text-lg font-bold text-gray-800">
                  Conventional Pre-Roasted Coffee
                </h3>
              </div>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-800">
                Loses 60%+ Aroma Fast
              </span>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <span className="text-xs text-gray-500 block uppercase font-medium">Degassing & Volatiles:</span>
                <span className="font-semibold text-gray-800">{active.conventional.aroma}</span>
              </div>
              <div>
                <span className="text-xs text-gray-500 block uppercase font-medium">Condition at {active.label}:</span>
                <span className="font-medium text-amber-900">{active.conventional.status}</span>
              </div>
              <div>
                <span className="text-xs text-gray-500 block uppercase font-medium">Cup Profile:</span>
                <p className="text-xs text-gray-600 leading-relaxed mt-1">{active.conventional.cup}</p>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs text-amber-900 font-medium bg-amber-50/70 p-3 rounded-xl">
              <span>⚠️ Must be consumed within 14–21 days of roast date or quality drops sharply.</span>
            </div>
          </div>

          {/* Column B: Validreams Sealed Raw Coffee */}
          <div className="bg-[#2C221E] text-[#FBF8F3] rounded-2xl border-2 border-[#D98246] p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#3F302A] pb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#D98246]" />
                <h3 className="font-serif text-lg font-bold text-white">
                  Validreams Raw Sealed Bag
                </h3>
              </div>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#2F4839] text-emerald-200">
                Peak Terroir Locked
              </span>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <span className="text-xs text-[#8C7A70] block uppercase font-medium">Degassing & Volatiles:</span>
                <span className="font-semibold text-[#D98246]">{active.validreams.aroma}</span>
              </div>
              <div>
                <span className="text-xs text-[#8C7A70] block uppercase font-medium">Condition at {active.label}:</span>
                <span className="font-medium text-white">{active.validreams.status}</span>
              </div>
              <div>
                <span className="text-xs text-[#8C7A70] block uppercase font-medium">Cup Profile:</span>
                <p className="text-xs text-[#D5C7BD] leading-relaxed mt-1">{active.validreams.cup}</p>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-300 font-medium bg-[#2F4839]/60 border border-emerald-500/20 p-3 rounded-xl">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>Dormancy sealed at origin. Roast whenever you are ready for a truly fresh brew.</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
