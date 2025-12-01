import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import CartSidebar from './components/CartSidebar';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';
import { PRODUCTS } from './constants';
import { Product, CartItem } from './types';

const App: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar 
        onCartClick={() => setIsCartOpen(true)} 
        cartCount={cartCount} 
      />
      
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
      />

      <main className="flex-grow">
        <Hero />
        
        {/* Product Section */}
        <section id="products" className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
                <h2 className="text-3xl font-serif font-bold tracking-tight text-gray-900">Latest Arrivals</h2>
                <p className="mt-2 text-gray-500">Thoughtfully designed for the season ahead.</p>
            </div>
            <a href="#" className="hidden sm:block text-sm font-medium text-mnr-gold hover:text-yellow-600 transition-colors">
                View all collection &rarr;
            </a>
          </div>

          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
            {PRODUCTS.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={handleAddToCart} 
              />
            ))}
          </div>
           
           <div className="mt-12 text-center sm:hidden">
            <a href="#" className="text-sm font-medium text-mnr-gold hover:text-yellow-600 transition-colors">
                View all collection &rarr;
            </a>
           </div>
        </section>

        {/* Feature Section */}
        <section id="features" className="bg-mnr-cream py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center mb-12">
                    <h2 className="text-base text-mnr-gold font-semibold tracking-wide uppercase">Why MNR</h2>
                    <p className="mt-2 text-3xl leading-8 font-serif font-bold tracking-tight text-gray-900 sm:text-4xl">
                        A better way to shop
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900">Sustainability First</h3>
                        <p className="mt-2 text-gray-500">We prioritize organic materials and ethical manufacturing processes in every garment.</p>
                    </div>
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900">Timeless Design</h3>
                        <p className="mt-2 text-gray-500">Trend-proof aesthetics meant to last a lifetime, not just a season.</p>
                    </div>
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900">Personalized Styling</h3>
                        <p className="mt-2 text-gray-500">Use "Aura", our AI assistant, to find the perfect look for your next event.</p>
                    </div>
                </div>
            </div>
        </section>
      </main>

      <div id="footer">
        <Footer />
      </div>
      
      {/* AI Assistant Widget */}
      <AIAssistant />
    </div>
  );
};

export default App;