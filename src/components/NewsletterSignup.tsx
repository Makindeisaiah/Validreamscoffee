import React, { useState } from 'react';
import { Mail, CheckCircle, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubscribed(true);
  };

  return (
    <section id="newsletter-signup-section" className="py-20 bg-[#F5EFEB] relative overflow-hidden">
      {/* Decorative Warm Elements */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#2C221E] text-[#FBF8F3] rounded-3xl p-6 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl border border-[#D98246]/20">
          
          {/* Subtle warm rust ambient glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#9E5328]/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#2F4839]/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-5 sm:space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#D98246] text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>The Sealed Harvest Club</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Get First Access to Rare Micro-Lots
            </h2>

            <p className="text-xs sm:text-base text-[#D5C7BD] leading-relaxed">
              Join 4,800+ home roasters and coffee purists. We send harvest notifications the minute beans are vacuum-sealed at origin, along with roast profile recipes for pan, air, and drum.
            </p>

            {subscribed ? (
              <div className="bg-[#2F4839]/80 border border-emerald-500/30 p-5 sm:p-6 rounded-2xl animate-in fade-in zoom-in duration-300 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-white">Welcome to the Club!</h3>
                <p className="text-xs text-[#EAE0D5]">
                  Check your inbox for your 10% welcome voucher: <strong className="text-[#D98246] font-mono tracking-wider">SEALEDFRESH10</strong>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 pt-2">
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <div className="relative flex-1">
                    <Mail className="w-5 h-5 text-[#8C7A70] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="newsletter-email-input"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError('');
                      }}
                      placeholder="Enter your email address"
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-[#9C8B82] text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#D98246] focus:bg-white/15 transition-all min-h-[48px]"
                    />
                  </div>
                  <button
                    id="newsletter-subscribe-btn"
                    type="submit"
                    className="px-6 py-3.5 bg-[#9E5328] hover:bg-[#B86B35] text-white font-semibold text-sm rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 shrink-0 group min-h-[48px]"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
                {error && <p className="text-xs text-rose-300">{error}</p>}
              </form>
            )}

            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 pt-2 text-[11px] text-[#8C7A70]">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D98246] shrink-0" />
                Zero spam, harvest updates only
              </span>
              <span className="hidden sm:inline">•</span>
              <span>1-click unsubscribe anytime</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
