import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Search, ChevronRight, ShieldCheck } from 'lucide-react';
import { PageView } from '../types';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  currentPage,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks: { label: string; page: PageView }[] = [
    { label: 'Shop Coffees', page: 'shop' },
    { label: 'About Our Origin', page: 'about' },
    { label: 'Brew & Roast Journal', page: 'blog' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 w-full bg-[#FBF8F3]/95 backdrop-blur-md border-b border-[#2C221E]/10 transition-colors shadow-xs">
      {/* Announcement Bar */}
      <div className="bg-[#2C221E] text-[#F5EFEB] text-[11px] sm:text-xs font-medium py-1.5 sm:py-2 px-3 sm:px-4 text-center tracking-normal sm:tracking-wide flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
        <span className="inline-flex items-center gap-1 text-[#D98246]">
          <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
          <span className="font-semibold whitespace-nowrap">Hermetically Sealed at Harvest:</span>
        </span>
        <span className="hidden sm:inline">Preserving living origin sugars & aroma.</span>
        <span className="text-[#D98246] font-semibold underline underline-offset-2 cursor-pointer whitespace-nowrap" onClick={() => onNavigate('shop')}>
          Free Shipping on ₦60,000+
        </span>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2">
        {/* Mobile menu trigger */}
        <button
          id="mobile-menu-toggle-btn"
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 -ml-1 text-[#2C221E] hover:text-[#9E5328] md:hidden focus:outline-none focus:ring-2 focus:ring-[#9E5328] min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Brand Logo */}
        <div 
          onClick={() => onNavigate('home')} 
          className="cursor-pointer flex items-center gap-2 sm:gap-3 group select-none min-w-0"
          id="brand-logo-container"
        >
          {/* Custom Artisanal Seal Mark */}
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#2C221E] text-[#FBF8F3] flex items-center justify-center font-serif text-lg sm:text-xl font-bold shadow-sm shrink-0 transition-transform duration-300 group-hover:rotate-12 border-2 border-[#D98246]">
            V
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-[#2C221E] leading-none group-hover:text-[#9E5328] transition-colors truncate">
              VALIDREAMS
            </span>
            <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.25em] text-[#6B5A51] font-semibold mt-0.5 whitespace-nowrap">
              Raw Sealed Coffee
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-[#3F302A]" id="desktop-nav">
          {navLinks.map((link) => (
            <button
              key={link.page}
              id={`nav-link-${link.page}`}
              onClick={() => handleNavClick(link.page)}
              className={`transition-colors py-1 relative hover:text-[#9E5328] ${
                currentPage === link.page
                  ? 'text-[#9E5328] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#9E5328]'
                  : ''
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Action icons (Search, Cart) */}
        <div className="flex items-center space-x-1 sm:space-x-3 shrink-0">
          {/* Quick Search trigger */}
          <button
            id="search-toggle-btn"
            type="button"
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 text-[#2C221E] hover:text-[#9E5328] rounded-full hover:bg-[#EAE0D5]/50 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            title="Search single origin coffees"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Cart Icon with badge */}
          <button
            id="header-cart-btn"
            type="button"
            onClick={onOpenCart}
            className="relative p-2.5 bg-[#2C221E] text-[#FBF8F3] hover:bg-[#3F302A] rounded-full transition-all duration-200 shadow-sm hover:scale-105 min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#9E5328]"
            aria-label={`View cart with ${cartCount} items`}
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#D98246] text-white text-[10px] sm:text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#FBF8F3] animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Inline Search Bar Dropdown */}
      {searchOpen && (
        <div className="border-t border-[#2C221E]/10 bg-[#F5EFEB] px-4 py-3 animate-in slide-in-from-top-2 duration-200">
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            <Search className="w-5 h-5 text-[#6B5A51] shrink-0" />
            <input
              id="header-search-input"
              type="text"
              placeholder="Search origin, process, notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none text-base sm:text-sm text-[#2C221E] placeholder-[#8C7A70] focus:outline-none focus:ring-0"
              autoFocus
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-xs text-[#6B5A51] hover:text-[#2C221E] px-2 py-1"
              >
                Clear
              </button>
            )}
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="p-1.5 text-[#6B5A51] hover:text-[#2C221E] rounded-md"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#2C221E]/10 bg-[#FBF8F3] px-4 py-5 space-y-4 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col divide-y divide-[#2C221E]/10">
            {navLinks.map((link) => (
              <button
                key={link.page}
                id={`mobile-nav-${link.page}`}
                onClick={() => handleNavClick(link.page)}
                className={`flex items-center justify-between py-3.5 px-2 text-base font-semibold text-left transition-colors min-h-[48px] ${
                  currentPage === link.page ? 'text-[#9E5328] bg-[#9E5328]/5 rounded-lg' : 'text-[#2C221E]'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-[#8C7A70]" />
              </button>
            ))}
          </div>
          <div className="pt-2">
            <button
              id="mobile-shop-now-btn"
              type="button"
              onClick={() => handleNavClick('shop')}
              className="w-full py-3.5 bg-[#9E5328] hover:bg-[#85441E] text-white rounded-xl font-semibold text-sm transition-colors text-center shadow-md min-h-[48px]"
            >
              Shop All Sealed Coffees
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
