/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Product, CartItem, PageView } from './types';
import { FEATURED_PRODUCTS } from './data/products';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { FeaturedProducts } from './components/FeaturedProducts';
import { BrandStoryTeaser } from './components/BrandStoryTeaser';
import { SealedComparison } from './components/SealedComparison';
import { NewsletterSignup } from './components/NewsletterSignup';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { ExtendedViews } from './components/ExtendedViews';
import { Check, ShoppingBag, X } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize with 1 item so the user can immediately observe the cart functionality
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: FEATURED_PRODUCTS[0],
      weight: '1lb',
      quantity: 1,
    },
  ]);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleAddToCart = (product: Product, weight: '1lb' | '2lb' | '5lb') => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (i) => i.product.id === product.id && i.weight === weight
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        return updated;
      } else {
        return [...prevItems, { product, weight, quantity: 1 }];
      }
    });

    showToast(`Added ${weight} ${product.name} to cart`);
  };

  const handleUpdateQuantity = (
    productId: string,
    weight: '1lb' | '2lb' | '5lb',
    quantity: number
  ) => {
    if (quantity <= 0) {
      handleRemoveItem(productId, weight);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.weight === weight
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: string, weight: '1lb' | '2lb' | '5lb') => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.weight === weight)
      )
    );
  };

  const scrollToSection = (sectionId: string) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F3] text-[#2C221E] antialiased selection:bg-[#9E5328]/20 selection:text-[#2C221E]">
      
      {/* 1. Header / Navigation */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setCartDrawerOpen(true)}
        currentPage={currentPage}
        onNavigate={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Content: Home Page vs. Reusable Extended Pages */}
      <main className="flex-1">
        {currentPage === 'home' ? (
          <>
            {/* 2. Hero Section */}
            <Hero
              onShopClick={() => scrollToSection('featured-products-section')}
              onLearnClick={() => scrollToSection('brand-story-section')}
            />

            {/* 5. Trust / Value Strip */}
            <TrustStrip />

            {/* 3. Featured Products Grid */}
            <FeaturedProducts
              products={FEATURED_PRODUCTS}
              onAddToCart={handleAddToCart}
              onQuickView={(product) => setQuickViewProduct(product)}
              onViewAllShop={() => {
                setCurrentPage('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* 4. Brand Story Teaser */}
            <BrandStoryTeaser
              onLearnMore={() => {
                setCurrentPage('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Freshness Science Comparison (Why Sealed Matters) */}
            <SealedComparison />

            {/* 6. Newsletter Signup */}
            <NewsletterSignup />
          </>
        ) : (
          <ExtendedViews
            page={currentPage}
            products={FEATURED_PRODUCTS}
            onNavigate={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onAddToCart={handleAddToCart}
            onQuickView={(product) => setQuickViewProduct(product)}
          />
        )}
      </main>

      {/* 7. Footer */}
      <Footer
        onNavigate={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Interactive Cart Slide-Over Drawer */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          showToast('Proceeding to secure checkout...');
        }}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Floating Add-to-Cart Toast Notification */}
      {toastMessage && (
        <div 
          id="cart-notification-toast"
          className="fixed bottom-6 right-6 z-50 bg-[#2C221E] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-[#D98246]/40 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-semibold">{toastMessage}</span>
          <button
            type="button"
            onClick={() => {
              setToastMessage(null);
              setCartDrawerOpen(true);
            }}
            className="ml-2 px-3 py-1 bg-[#9E5328] hover:bg-[#85441E] text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1"
          >
            <ShoppingBag className="w-3 h-3" />
            <span>View Cart</span>
          </button>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-gray-400 hover:text-white ml-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

    </div>
  );
}
